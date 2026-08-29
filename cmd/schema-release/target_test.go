package main

import (
	"os"
	"path/filepath"
	"testing"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

func TestTargetSafetyAndReleaseSelection(t *testing.T) {
	root := repositoryRootForTest(t)
	target, _, err := loadTarget(root, "gpagoda/local-leasing1")
	if err != nil {
		t.Fatal(err)
	}
	if target.SchemaRelease != "postgres/2026.08.1" || target.Database.Name != "leasing1" || target.SeedProfile != "client-minimal" {
		t.Fatalf("unexpected target: %+v", target)
	}
	if target.Scope != "local" || !target.AllowCreate || !target.ExpectedEmpty {
		t.Fatal("local target must explicitly authorize create-if-absent and expected-empty")
	}
}

func TestBusinessTypeSelectsBundleCompatibilityNotSchemaBytes(t *testing.T) {
	root := repositoryRootForTest(t)
	target, _, err := loadTarget(root, "gpagoda/local-leasing1")
	if err != nil {
		t.Fatal(err)
	}
	bundle, err := loadBundle(root, target.Bundles[0])
	if err != nil {
		t.Fatal(err)
	}
	if err := bundle.validateAgainst(target); err != nil {
		t.Fatal(err)
	}

	otherBusiness := target
	otherBusiness.BusinessType = "professional"
	if err := bundle.validateAgainst(otherBusiness); err == nil {
		t.Fatal("leasing bundle unexpectedly matched a professional target")
	}
	manifest, _, err := schemareleases.Load(target.SchemaRelease)
	if err != nil {
		t.Fatal(err)
	}
	bootstrap, err := schemareleases.BootstrapBytes(manifest)
	if err != nil {
		t.Fatal(err)
	}
	if sha256Hex(bootstrap) != manifest.Bootstrap.SHA256 {
		t.Fatal("schema bootstrap did not remain owned solely by the release manifest")
	}
}

func TestTargetRejectsTraversalAndRemoteCreate(t *testing.T) {
	if safeRelativePath("../secret") || safeRelativePath("/absolute") {
		t.Fatal("unsafe paths accepted")
	}
	target := targetManifest{
		FormatVersion: 1, TargetKey: "client/prod", Scope: "remote", AllowCreate: true, ExpectedEmpty: true,
		SchemaRelease: "postgres/2026.08.1", Database: targetDatabase{EnvFile: "app/.env", Name: "prod"},
		BusinessType: "leasing", Workspace: targetWorkspace{ID: "w", Slug: "client"}, SeedProfile: "client-minimal", Bundles: []string{"deploy/client/bundle.json"},
	}
	if err := target.validate("client/prod"); err == nil {
		t.Fatal("remote create target must fail")
	}
}

func TestEnvironmentFileDoesNotOverrideProcess(t *testing.T) {
	directory := t.TempDir()
	path := filepath.Join(directory, ".env")
	if err := os.WriteFile(path, []byte("DATABASE_POSTGRES_USER=file-user\n"), 0o600); err != nil {
		t.Fatal(err)
	}
	values, err := loadEnvironment(path)
	if err != nil {
		t.Fatal(err)
	}
	t.Setenv("DATABASE_POSTGRES_USER", "process-user")
	if got := valueFor(values, "DATABASE_POSTGRES_USER", ""); got != "process-user" {
		t.Fatalf("got %q", got)
	}
}

func repositoryRootForTest(t *testing.T) string {
	t.Helper()
	directory, err := os.Getwd()
	if err != nil {
		t.Fatal(err)
	}
	for {
		if _, err := os.Stat(filepath.Join(directory, "go.work")); err == nil {
			return directory
		}
		parent := filepath.Dir(directory)
		if parent == directory {
			t.Fatal("go.work not found")
		}
		directory = parent
	}
}
