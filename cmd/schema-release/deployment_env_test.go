package main

import (
	schemareleases "github.com/erniealice/esqyma/schema-releases"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestDeploymentEnvironmentBindsVerifiedIdentity(t *testing.T) {
	root, err := filepath.EvalSymlinks(t.TempDir())
	if err != nil {
		t.Fatal(err)
	}
	path := filepath.Join(root, "runtime.env")
	certDir := filepath.Join(root, "certs")
	if err := os.Mkdir(certDir, 0700); err != nil {
		t.Fatal(err)
	}
	localCA := filepath.Join(certDir, "test-ca.pem")
	if err := os.WriteFile(localCA, []byte("test public CA bytes"), 0600); err != nil {
		t.Fatal(err)
	}
	target := targetManifest{TargetKey: "test/prod", SchemaRelease: "postgres/2026.08.1"}
	target.Database.EnvFile = "runtime.env"
	config := databaseConfig{Host: "test.invalid", Port: "5432", Name: "test", User: "runtime", SSLMode: "verify-full", SSLRootCert: localCA}
	required := []schemareleases.RequiredBundle{{TargetKey: "test/prod", ID: "base", Version: "1", Digest: "abc", SchemaRelease: target.SchemaRelease}}
	original := "CONFIG_DATABASE_PROVIDER=postgresql\nESQYMA_SCHEMA_RELEASE=postgres/2026.08.1\nCOPYA_TARGET_KEY=test/prod\nDATABASE_POSTGRES_HOST=test.invalid\nDATABASE_POSTGRES_PORT=5432\nDATABASE_POSTGRES_DBNAME=test\nDATABASE_POSTGRES_USER=runtime\nDATABASE_POSTGRES_SSLMODE=verify-full\nDATABASE_POSTGRES_SSLROOTCERT=/app/certs/test-ca.pem\nCOPYA_REQUIRED_BUNDLES_JSON=[{\"target_key\":\"test/prod\",\"id\":\"base\",\"version\":\"1\",\"digest\":\"abc\"}]\n"
	write := func(raw string) {
		t.Helper()
		if err := os.WriteFile(path, []byte(raw), 0600); err != nil {
			t.Fatal(err)
		}
	}
	write(original)
	if err := validateDeploymentEnvironment(root, path, target, config, required); err != nil {
		t.Fatal(err)
	}
	if got, err := deploymentTrustPath(path, localCA); err != nil || got != localCA {
		t.Fatalf("deployment CA mapping failed: got %q, err %v", got, err)
	}
	for _, pair := range [][2]string{{"test.invalid", "another.invalid"}, {"DBNAME=test", "DBNAME=other"}, {"USER=runtime", "USER=admin"}, {"test/prod", "other/prod"}, {"postgres/2026.08.1", "postgres/2026.09.1"}, {"abc", "changed"}, {"verify-full", "require"}, {"postgresql", "firestore"}, {"\"version\":\"1\"", "\"unknown\":\"1\""}} {
		write(strings.ReplaceAll(original, pair[0], pair[1]))
		if err := validateDeploymentEnvironment(root, path, target, config, required); err == nil {
			t.Fatalf("accepted drift %s", pair[0])
		}
	}
	for _, suffix := range []string{"[]", "null", "[] {}", "[{\"target_key\":\"test/prod\"}]"} {
		prefix := original[:strings.Index(original, "COPYA_REQUIRED_BUNDLES_JSON=")]
		write(prefix + "COPYA_REQUIRED_BUNDLES_JSON=" + suffix + "\n")
		if err := validateDeploymentEnvironment(root, path, target, config, required); err == nil {
			t.Fatal("accepted incomplete or malformed bundle contract")
		}
	}
	write(original + "DATABASE_POSTGRES_HOST=test.invalid\n")
	if err := validateDeploymentEnvironment(root, path, target, config, required); err == nil {
		t.Fatal("accepted duplicate key")
	}
	write(original)
	if err := validateDeploymentEnvironment(root, filepath.Join(root, "other.env"), target, config, required); err == nil {
		t.Fatal("accepted other file")
	}
	write(strings.ReplaceAll(original, "/app/certs/test-ca.pem", "/app/certs/other-ca.pem"))
	if _, err := deploymentTrustPath(path, localCA); err == nil {
		t.Fatal("accepted a different runtime CA basename")
	}
	write(original)
	symlink := filepath.Join(certDir, "linked-ca.pem")
	if err := os.Symlink(localCA, symlink); err != nil {
		t.Fatal(err)
	}
	write(strings.ReplaceAll(original, "test-ca.pem", "linked-ca.pem"))
	if _, err := deploymentTrustPath(path, symlink); err == nil {
		t.Fatal("accepted a symlinked deployment CA")
	}
}
