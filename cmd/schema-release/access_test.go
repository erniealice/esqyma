package main

import "testing"

func TestAccessSelectsOperationCredentials(t *testing.T) {
	target := targetManifest{Scope: "disposable", Database: targetDatabase{Name: "test_upgrade"}, Access: &databaseAccess{Endpoint: "127.0.0.1:5432", RuntimeRole: "runtime", MigrationRole: "migrator", Runtime: credentialReference{UserEnv: "TEST_RUNTIME_USER", PasswordEnv: "TEST_RUNTIME_PASSWORD", ConnectionUser: "runtime"}, Migration: credentialReference{UserEnv: "TEST_MIGRATION_USER", PasswordEnv: "TEST_MIGRATION_PASSWORD", ConnectionUser: "migrator"}}, Upgrade: &upgradeTarget{Endpoint: "127.0.0.1:5432", RuntimeRole: "runtime", MigrationRole: "migrator"}}
	values := map[string]string{"DATABASE_POSTGRES_HOST": "127.0.0.1", "DATABASE_POSTGRES_PORT": "5432", "TEST_RUNTIME_USER": "runtime", "TEST_RUNTIME_PASSWORD": "runtime-test-only", "TEST_MIGRATION_USER": "migrator", "TEST_MIGRATION_PASSWORD": "migration-test-only"}
	t.Setenv("DATABASE_POSTGRES_USER", "ambient-privileged")
	t.Setenv("DATABASE_POSTGRES_PASSWORD", "ambient-test-only")
	for _, operation := range []string{"runtime", "migration", "initialize"} {
		got, err := configForTarget("", values, target, operation)
		if err != nil {
			t.Fatal(err)
		}
		wantUser, wantPassword := "runtime", "runtime-test-only"
		if operation != "runtime" {
			wantUser, wantPassword = "migrator", "migration-test-only"
		}
		if got.User != wantUser || got.Password != wantPassword {
			t.Fatal("operation credential isolation failed")
		}
	}
	values["TEST_RUNTIME_USER"] = "migrator"
	if _, err := configForTarget("", values, target, "runtime"); err == nil {
		t.Fatal("accepted wrong runtime login")
	}
	target.Access = nil
	target.Scope = "remote"
	if _, err := configForTarget("", values, target, "runtime"); err == nil {
		t.Fatal("remote access policy missing")
	}
}

func TestRemoteAccessRefusesWeakOrUnboundConnection(t *testing.T) {
	target := targetManifest{Scope: "remote", Access: &databaseAccess{Endpoint: "database.example:5432"}}
	for _, mode := range []string{"disable", "require", "verify-ca", "verify-full"} {
		config := databaseConfig{Host: "database.example", Port: "5432", SSLMode: mode}
		if err := validateAccessConnection(target, config); err == nil {
			t.Fatalf("accepted %s without explicit trust", mode)
		}
	}
	config := databaseConfig{Host: "other.example", Port: "5432", SSLMode: "verify-full", SSLRootCert: "/nonexistent/ca.pem"}
	if err := validateAccessConnection(target, config); err == nil {
		t.Fatal("accepted unbound endpoint")
	}
}
