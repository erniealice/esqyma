package main

import (
	"bytes"
	"errors"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"
)

var keychainReferencePattern = regexp.MustCompile(`^[A-Za-z0-9._/@:-]+$`)

func loadKeychainMigrationConfig(root string, target targetManifest, readSecret func(string, string) ([]byte, error)) (databaseConfig, error) {
	ref := target.Access.Migration
	if !safeRelativePath(ref.KeychainProfile) || ref.UserEnv != "" || ref.PasswordEnv != "" {
		return databaseConfig{}, errors.New("Keychain profile must be a target-bound repository-relative path without environment credential overrides")
	}
	path := filepath.Join(root, ref.KeychainProfile)
	raw, err := repositoryRegularBytes(root, path)
	if err != nil {
		return databaseConfig{}, err
	}
	info, err := os.Stat(path)
	if err != nil || info.Mode().Perm() != 0600 || !profileOwnedByCurrentUser(info) {
		return databaseConfig{}, errors.New("migration profile must be owned by the operator with mode 0600")
	}
	if err := exec.Command("git", "-C", root, "check-ignore", "-q", "--", path).Run(); err != nil {
		return databaseConfig{}, errors.New("migration profile must be Git-ignored")
	}
	values, err := parseKeychainMigrationProfile(raw)
	if err != nil {
		return databaseConfig{}, err
	}
	get := func(key string) string { return values["MIGRATION_POSTGRES_"+key] }
	if get("DBNAME") != target.Database.Name || get("USER") != ref.ConnectionUser || get("RUNTIME_ROLE") != target.Access.RuntimeRole || get("TARGET_OWNER") != target.Access.MigrationRole || get("ALLOW_ADMIN_RUNTIME_ROLE") != "0" {
		return databaseConfig{}, errors.New("migration profile identity differs from reviewed target or allows a privileged shared runtime")
	}
	if get("EXPECTED_DATABASE_OWNER") != target.Access.MigrationRole && get("EXPECTED_DATABASE_OWNER") != target.Access.RuntimeRole {
		return databaseConfig{}, errors.New("migration profile database owner is outside target roles")
	}
	if get("SSLMODE") != "verify-full" {
		return databaseConfig{}, errors.New("Keychain migration profile requires verify-full TLS")
	}
	config := databaseConfig{Host: get("HOST"), Port: get("PORT"), Name: get("DBNAME"), User: get("USER"), SSLMode: get("SSLMODE"), SSLRootCert: get("SSLROOTCERT")}
	if err := validateAccessConnection(target, config); err != nil {
		return databaseConfig{}, err
	}
	service, account := get("KEYCHAIN_SERVICE"), get("KEYCHAIN_ACCOUNT")
	if !keychainReferencePattern.MatchString(service) || !keychainReferencePattern.MatchString(account) || account != ref.ConnectionUser {
		return databaseConfig{}, errors.New("invalid or unbound Keychain reference")
	}
	secret, err := readSecret(service, account)
	if err != nil {
		return databaseConfig{}, errors.New("cannot read target migration credential from Keychain")
	}
	secret = bytes.TrimSuffix(secret, []byte("\n"))
	if len(secret) == 0 {
		return databaseConfig{}, errors.New("Keychain returned an empty migration credential")
	}
	config.CredentialProfileSHA256 = sha256Hex(raw)
	config.Password = string(secret)
	return config, nil
}

func parseKeychainMigrationProfile(raw []byte) (map[string]string, error) {
	required := []string{"HOST", "PORT", "DBNAME", "USER", "SSLMODE", "SSLROOTCERT", "KEYCHAIN_SERVICE", "KEYCHAIN_ACCOUNT", "RUNTIME_ROLE", "ALLOW_ADMIN_RUNTIME_ROLE", "EXPECTED_DATABASE_OWNER", "TARGET_OWNER"}
	allowed := map[string]bool{}
	for _, key := range required {
		allowed["MIGRATION_POSTGRES_"+key] = true
	}
	values := map[string]string{}
	for _, line := range strings.Split(string(raw), "\n") {
		line = strings.TrimSuffix(line, "\r")
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		key, value, ok := strings.Cut(line, "=")
		if !ok || !allowed[key] || values[key] != "" || value == "" || strings.ContainsAny(value, " \t\r\n\"'") {
			return nil, errors.New("migration profile requires unique known nonempty plain values; passwords and shell syntax are not accepted")
		}
		values[key] = value
	}
	for key := range allowed {
		if values[key] == "" {
			return nil, errors.New("migration profile is missing required configuration")
		}
	}
	return values, nil
}
