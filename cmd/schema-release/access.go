package main

import (
	"context"
	"crypto/x509"
	"database/sql"
	"errors"
	"net"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

type credentialReference struct {
	KeychainProfile string `json:"keychain_profile,omitempty"`
	UserEnv         string `json:"user_env,omitempty"`
	PasswordEnv     string `json:"password_env,omitempty"`
	ConnectionUser  string `json:"connection_user"`
}

type databaseAccess struct {
	Endpoint      string              `json:"endpoint"`
	RuntimeRole   string              `json:"runtime_role"`
	MigrationRole string              `json:"migration_role"`
	Runtime       credentialReference `json:"runtime"`
	Migration     credentialReference `json:"migration"`
}

var credentialKeyPattern = regexp.MustCompile(`^[A-Z][A-Z0-9_]*$`)

func configForTarget(root string, values map[string]string, target targetManifest, operation string) (databaseConfig, error) {
	return configForTargetWithTrust(root, values, target, operation, "")
}

func configForTargetWithKeychain(root string, values map[string]string, target targetManifest, operation string, readSecret func(string, string) ([]byte, error)) (databaseConfig, error) {
	return configForTargetWithTrustAndKeychain(root, values, target, operation, "", readSecret)
}

func configForTargetWithTrust(root string, values map[string]string, target targetManifest, operation, sslRootCert string) (databaseConfig, error) {
	return configForTargetWithTrustAndKeychain(root, values, target, operation, sslRootCert, readPlatformKeychain)
}

func configForTargetWithTrustAndKeychain(root string, values map[string]string, target targetManifest, operation, sslRootCert string, readSecret func(string, string) ([]byte, error)) (databaseConfig, error) {
	if operation != "initialize" && operation != "migration" && operation != "runtime" {
		return databaseConfig{}, errors.New("unknown credential operation")
	}
	access := target.Access
	if access == nil {
		if target.Scope == "remote" || operation == "migration" {
			return databaseConfig{}, errors.New("target must declare separate migration/runtime access references")
		}
		return configFromEnvironment(values, target.Database.Name)
	}
	if access.RuntimeRole == "" || access.MigrationRole == "" || access.RuntimeRole == access.MigrationRole || access.Runtime.KeychainProfile != "" {
		return databaseConfig{}, errors.New("target access requires separate migration/runtime identities; Keychain profile is migration-only")
	}
	if !credentialKeyPattern.MatchString(access.Runtime.UserEnv) || !credentialKeyPattern.MatchString(access.Runtime.PasswordEnv) || access.Runtime.ConnectionUser == "" || access.Migration.ConnectionUser == "" || access.Runtime.ConnectionUser == access.Migration.ConnectionUser {
		return databaseConfig{}, errors.New("access requires valid runtime references and distinct connection logins")
	}
	if access.Migration.KeychainProfile != "" && (!safeRelativePath(access.Migration.KeychainProfile) || access.Migration.UserEnv != "" || access.Migration.PasswordEnv != "") {
		return databaseConfig{}, errors.New("migration Keychain and environment references are mutually exclusive")
	}
	if access.Migration.KeychainProfile == "" && (access.Runtime.UserEnv == access.Migration.UserEnv || access.Runtime.PasswordEnv == access.Migration.PasswordEnv) {
		return databaseConfig{}, errors.New("target access requires distinct environment credential references")
	}
	if operation == "migration" && (target.Upgrade == nil || target.Upgrade.Endpoint != access.Endpoint || target.Upgrade.RuntimeRole != access.RuntimeRole || target.Upgrade.MigrationRole != access.MigrationRole) {
		return databaseConfig{}, errors.New("upgrade assertions differ from target access policy")
	}
	ref := access.Runtime
	if operation != "runtime" {
		ref = access.Migration
	}
	if ref.KeychainProfile != "" {
		if sslRootCert != "" {
			return databaseConfig{}, errors.New("explicit deployment CA is not valid for migration Keychain access")
		}
		return loadKeychainMigrationConfig(root, target, readSecret)
	}
	if !credentialKeyPattern.MatchString(ref.UserEnv) || !credentialKeyPattern.MatchString(ref.PasswordEnv) || ref.ConnectionUser == "" {
		return databaseConfig{}, errors.New("invalid target credential references")
	}
	user, password := valueFor(values, ref.UserEnv, ""), valueFor(values, ref.PasswordEnv, "")
	if user != ref.ConnectionUser || password == "" {
		return databaseConfig{}, errors.New("selected target credentials missing or login differs from reviewed identity")
	}
	copyValues := make(map[string]string, len(values)+1)
	for key, value := range values {
		copyValues[key] = value
	}
	copyValues["DATABASE_POSTGRES_USER"] = user
	config, err := configFromEnvironment(copyValues, target.Database.Name)
	if err != nil {
		return databaseConfig{}, err
	}
	if sslRootCert != "" {
		config.SSLRootCert = sslRootCert
	}
	config.User, config.Password = user, password
	if err := validateAccessConnection(target, config); err != nil {
		return databaseConfig{}, err
	}
	return config, nil
}

func validateAccessConnection(target targetManifest, config databaseConfig) error {
	if target.Access == nil {
		return errors.New("missing target access policy")
	}
	host, port, err := net.SplitHostPort(target.Access.Endpoint)
	if err != nil || host == "" || strings.ContainsAny(host, "/@?#\r\n\t") || !strings.EqualFold(strings.Trim(config.Host, "[]"), host) || config.Port != port {
		return errors.New("connection differs from reviewed access endpoint")
	}
	if target.Scope != "remote" {
		if !config.loopback() {
			return errors.New("local target access requires loopback")
		}
		return nil
	}
	if config.SSLMode != "verify-full" || !filepath.IsAbs(config.SSLRootCert) {
		return errors.New("remote access requires verify-full and absolute explicit CA trust")
	}
	info, err := os.Lstat(config.SSLRootCert)
	if err != nil || !info.Mode().IsRegular() {
		return errors.New("remote CA trust must be a regular file")
	}
	ca, err := os.ReadFile(config.SSLRootCert)
	if err != nil || !x509.NewCertPool().AppendCertsFromPEM(ca) {
		return errors.New("remote CA trust is not a readable PEM bundle")
	}
	return nil
}

func verifyRuntimeIdentity(ctx context.Context, db *sql.DB, target targetManifest, config databaseConfig) error {
	if target.Access == nil {
		if target.Scope == "remote" {
			return errors.New("remote verification requires target access policy")
		}
		return observedLoopback(ctx, db)
	}
	if err := validateAccessConnection(target, config); err != nil {
		return err
	}
	if config.User != target.Access.Runtime.ConnectionUser {
		return errors.New("verification requires selected runtime login")
	}
	var database, role string
	if err := db.QueryRowContext(ctx, "SELECT current_database(), current_user").Scan(&database, &role); err != nil || database != target.Database.Name || role != target.Access.RuntimeRole {
		return errors.New("observed runtime database/role differs from target")
	}
	if target.Scope != "remote" {
		if err := observedLoopback(ctx, db); err != nil {
			return err
		}
	}
	var exists bool
	if err := db.QueryRowContext(ctx, "SELECT EXISTS (SELECT 1 FROM public.workspace WHERE id=$1 AND slug=$2)", target.Workspace.ID, target.Workspace.Slug).Scan(&exists); err != nil || !exists {
		return errors.New("runtime workspace identity absent or mismatched")
	}
	return verifyRuntimeAuthority(ctx, db, target.Access.RuntimeRole, target.Access.MigrationRole)
}
