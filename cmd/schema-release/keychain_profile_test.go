package main

import (
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestKeychainProfileIsBoundAndNeverUsedForRuntime(t *testing.T) {
	root := t.TempDir()
	profile := "deploy/test/.env.postgres-admin.local"
	if err := os.MkdirAll(filepath.Dir(filepath.Join(root, profile)), 0700); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(root, ".gitignore"), []byte(".env.postgres-admin.local\n"), 0600); err != nil {
		t.Fatal(err)
	}
	commitFleetFixture(t, root, ".gitignore")
	body := `MIGRATION_POSTGRES_HOST=127.0.0.1
MIGRATION_POSTGRES_PORT=5432
MIGRATION_POSTGRES_DBNAME=fixture
MIGRATION_POSTGRES_USER=migrator
MIGRATION_POSTGRES_SSLMODE=verify-full
MIGRATION_POSTGRES_SSLROOTCERT=/fixture/ca.pem
MIGRATION_POSTGRES_KEYCHAIN_SERVICE=ichizen/test/migration
MIGRATION_POSTGRES_KEYCHAIN_ACCOUNT=migrator
MIGRATION_POSTGRES_RUNTIME_ROLE=runtime
MIGRATION_POSTGRES_ALLOW_ADMIN_RUNTIME_ROLE=0
MIGRATION_POSTGRES_EXPECTED_DATABASE_OWNER=migrator
MIGRATION_POSTGRES_TARGET_OWNER=migrator
`
	write := func(raw string) {
		t.Helper()
		if err := os.WriteFile(filepath.Join(root, profile), []byte(raw), 0600); err != nil {
			t.Fatal(err)
		}
	}
	write(body)
	target := targetManifest{Scope: "disposable", Database: targetDatabase{Name: "fixture"}, Access: &databaseAccess{Endpoint: "127.0.0.1:5432", RuntimeRole: "runtime", MigrationRole: "migrator", Runtime: credentialReference{UserEnv: "FIXTURE_RUNTIME_USER", PasswordEnv: "FIXTURE_RUNTIME_PASSWORD", ConnectionUser: "runtime"}, Migration: credentialReference{KeychainProfile: profile, ConnectionUser: "migrator"}}, Upgrade: &upgradeTarget{Endpoint: "127.0.0.1:5432", RuntimeRole: "runtime", MigrationRole: "migrator"}}
	calls := 0
	reader := func(service, account string) ([]byte, error) {
		calls++
		if service != "ichizen/test/migration" || account != "migrator" {
			t.Fatal("wrong Keychain identity")
		}
		return []byte("fixture-keychain-secret\n"), nil
	}
	values := map[string]string{"DATABASE_POSTGRES_HOST": "127.0.0.1", "DATABASE_POSTGRES_PORT": "5432", "FIXTURE_RUNTIME_USER": "runtime", "FIXTURE_RUNTIME_PASSWORD": "fixture-runtime-secret"}
	t.Setenv("DATABASE_POSTGRES_USER", "ambient-user")
	t.Setenv("DATABASE_POSTGRES_PASSWORD", "ambient-password")
	got, err := configForTargetWithKeychain(root, values, target, "migration", reader)
	if err != nil {
		t.Fatal(err)
	}
	if got.User != "migrator" || got.Password != "fixture-keychain-secret" || got.CredentialProfileSHA256 != sha256Hex([]byte(body)) || calls != 1 {
		t.Fatal("profile selection/fingerprint failed")
	}
	got, err = configForTargetWithKeychain(root, values, target, "runtime", reader)
	if err != nil || got.User != "runtime" || got.Password != "fixture-runtime-secret" || calls != 1 {
		t.Fatal("runtime accessed or adopted migration credential")
	}
	for _, change := range []struct{ old, new string }{{"ALLOW_ADMIN_RUNTIME_ROLE=0", "ALLOW_ADMIN_RUNTIME_ROLE=1"}, {"DBNAME=fixture", "DBNAME=wrong"}, {"PORT=5432", "PORT=5433"}, {"KEYCHAIN_ACCOUNT=migrator", "KEYCHAIN_ACCOUNT=another"}} {
		write(strings.Replace(body, change.old, change.new, 1))
		if _, err := configForTargetWithKeychain(root, values, target, "migration", reader); err == nil {
			t.Fatal("unbound profile accepted")
		}
		if calls != 1 {
			t.Fatal("secret read before profile validation")
		}
	}
	write(body + "MIGRATION_POSTGRES_PASSWORD=forbidden\n")
	if _, err := configForTargetWithKeychain(root, values, target, "migration", reader); err == nil {
		t.Fatal("plaintext password profile accepted")
	}
	write(body)
	if err := os.Chmod(filepath.Join(root, profile), 0644); err != nil {
		t.Fatal(err)
	}
	if _, err := configForTargetWithKeychain(root, values, target, "migration", reader); err == nil {
		t.Fatal("readable profile accepted")
	}
	if err := os.Chmod(filepath.Join(root, profile), 0600); err != nil {
		t.Fatal(err)
	}
	_, err = configForTargetWithKeychain(root, values, target, "migration", func(string, string) ([]byte, error) { return nil, errors.New("secret-value-should-not-leak") })
	if err == nil || strings.Contains(err.Error(), "secret-value") {
		t.Fatal("credential retrieval error leaked backend detail")
	}
}

func TestKeychainProfileParserRefusesShellAndDuplicateKeys(t *testing.T) {
	for _, raw := range []string{"MIGRATION_POSTGRES_HOST=a\nMIGRATION_POSTGRES_HOST=b\n", "export MIGRATION_POSTGRES_HOST=a\n", "MIGRATION_POSTGRES_PASSWORD=secret\n", "MIGRATION_POSTGRES_HOST='quoted'\n"} {
		if _, err := parseKeychainMigrationProfile([]byte(raw)); err == nil {
			t.Fatal("invalid profile accepted")
		}
	}
}
