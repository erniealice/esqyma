package main

import (
	"errors"
	"net"
	"strconv"
	"strings"
)

// Upgrade authority belongs to a reviewed target, separate from app defaults.
// Endpoint is a non-secret host:port assertion, not a free-form credential URL.
type upgradeTarget struct {
	ConnectionMode    string `json:"connection_mode"`
	FromRelease       string `json:"from_release"`
	Endpoint          string `json:"endpoint"`
	ConnectionUser    string `json:"connection_user,omitempty"`
	MigrationRole     string `json:"migration_role"`
	RuntimeRole       string `json:"runtime_role"`
	BackupMaxAgeHours int    `json:"backup_max_age_hours"`
}

func (target targetManifest) validateUpgrade(from string, config databaseConfig) error {
	u := target.Upgrade
	if u == nil || u.FromRelease != from || from == target.SchemaRelease {
		return errors.New("upgrade requires a target-bound predecessor release")
	}
	if u.ConnectionMode != "direct" && u.ConnectionMode != "session" {
		return errors.New("upgrade requires a reviewed direct or session-pooling connection; transaction pooling is unsupported")
	}
	if target.AllowCreate || target.ExpectedEmpty {
		return errors.New("upgrade target cannot allow creation or expect an empty database")
	}
	if u.BackupMaxAgeHours < 1 || u.BackupMaxAgeHours > 168 {
		return errors.New("upgrade backup age must be 1..168 hours")
	}
	connectionUser := u.ConnectionUser
	if connectionUser == "" {
		connectionUser = u.MigrationRole
	}
	if u.MigrationRole == "" || u.RuntimeRole == "" || u.MigrationRole == u.RuntimeRole || config.User != connectionUser {
		return errors.New("upgrade requires distinct target-bound migration and runtime roles")
	}
	host, port, err := net.SplitHostPort(u.Endpoint)
	if err != nil || host == "" || strings.ContainsAny(host, "/@?#\n\r\t") {
		return errors.New("upgrade endpoint must be a host:port assertion")
	}
	n, err := strconv.Atoi(port)
	if err != nil || n < 1 || n > 65535 || !strings.EqualFold(strings.Trim(config.Host, "[]"), host) || config.Port != port {
		return errors.New("configured database endpoint differs from reviewed target")
	}
	if strings.HasSuffix(strings.ToLower(host), ".pooler.supabase.com") && port == "6543" {
		return errors.New("Supabase transaction-pooling endpoint cannot run migrations")
	}
	if target.Scope == "remote" {
		if config.SSLMode != "verify-full" || config.SSLRootCert == "" {
			return errors.New("remote upgrade requires verify-full TLS with explicit CA trust")
		}
	} else if !config.loopback() {
		return errors.New("local/disposable upgrade must use loopback")
	}
	return nil
}
