package schemareleases

import (
	"context"
	"database/sql"
	"encoding/json"
	"os"
	"strings"
	"testing"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func TestLoadReleaseAndBootstrap(t *testing.T) {
	manifest, raw, err := Load("postgres/2026.08.1")
	if err != nil {
		t.Fatal(err)
	}
	if manifest.Release != "postgres/2026.08.1" || manifest.Atlas.Head != "20260829000000" {
		t.Fatalf("unexpected release: %+v", manifest)
	}
	if len(raw) == 0 || ManifestDigest(raw) == strings.Repeat("0", 64) {
		t.Fatal("manifest digest was not derived")
	}
	bootstrap, err := BootstrapBytes(manifest)
	if err != nil {
		t.Fatal(err)
	}
	if len(bootstrap) < 100_000 {
		t.Fatalf("bootstrap unexpectedly small: %d", len(bootstrap))
	}
}

func TestManifestRejectsUnknownAndInvalidState(t *testing.T) {
	_, _, err := Load("postgres/latest")
	if err == nil {
		t.Fatal("invalid release unexpectedly loaded")
	}

	manifest, _, err := Load("postgres/2026.08.1")
	if err != nil {
		t.Fatal(err)
	}
	manifest.Atlas.ToolVersion = "latest"
	if err := manifest.Validate(); err == nil {
		t.Fatal("unpinned Atlas version unexpectedly accepted")
	}
}

func TestReleaseStateOwnership(t *testing.T) {
	schema, err := FS.ReadFile("schema-release.schema.json")
	if err != nil {
		t.Fatal(err)
	}
	if !json.Valid(schema) {
		t.Fatal("manifest JSON schema is invalid JSON")
	}
	text := string(schema)
	for _, forbidden := range []string{"schema_release_revisions", "schema_migrations"} {
		if strings.Contains(text, forbidden) {
			t.Fatalf("release schema must not delegate ownership to %q", forbidden)
		}
	}
}

func TestCatalogFingerprintIntegration(t *testing.T) {
	databaseURL := os.Getenv("ESQYMA_TEST_DATABASE_URL")
	if databaseURL == "" {
		t.Skip("ESQYMA_TEST_DATABASE_URL is not set")
	}
	db, err := sql.Open("pgx", databaseURL)
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	fingerprint, err := CatalogFingerprint(context.Background(), db)
	if err != nil {
		t.Fatal(err)
	}
	t.Logf("catalog_fingerprint=%s", fingerprint)
}

func TestVerifyDatabaseRejectsReleaseStateMismatchIntegration(t *testing.T) {
	databaseURL := os.Getenv("ESQYMA_TEST_DATABASE_URL")
	if databaseURL == "" {
		t.Skip("ESQYMA_TEST_DATABASE_URL is not set")
	}
	db, err := sql.Open("pgx", databaseURL)
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	manifest, _, err := Load("postgres/2026.08.1")
	if err != nil {
		t.Fatal(err)
	}
	if _, err := VerifyDatabase(t.Context(), db, manifest, nil); err != nil {
		t.Fatalf("exact release should verify: %v", err)
	}

	tests := []struct {
		name     string
		mutate   func(*Manifest)
		required []RequiredBundle
	}{
		{name: "head", mutate: func(candidate *Manifest) { candidate.Atlas.Head = "20260830000000" }},
		{name: "tracker fingerprint", mutate: func(candidate *Manifest) { candidate.Atlas.TrackerFingerprint = strings.Repeat("0", 64) }},
		{name: "catalog fingerprint", mutate: func(candidate *Manifest) { candidate.Bootstrap.CatalogFingerprint = strings.Repeat("0", 64) }},
		{name: "bundle digest", required: []RequiredBundle{{
			TargetKey: "gpagoda/local-leasing1", ID: "gpagoda-base", Version: "2026.08.1",
			Digest: strings.Repeat("0", 64), SchemaRelease: "postgres/2026.08.1",
		}}},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			candidate := manifest
			if test.mutate != nil {
				test.mutate(&candidate)
			}
			if _, err := VerifyDatabase(t.Context(), db, candidate, test.required); err == nil {
				t.Fatal("mismatched database/release state unexpectedly verified")
			}
		})
	}
}

func TestProfileAllowed(t *testing.T) {
	manifest, _, err := Load("postgres/2026.08.1")
	if err != nil {
		t.Fatal(err)
	}
	if !ProfileAllowed(manifest, "client-minimal") || ProfileAllowed(manifest, "demo-everything") {
		t.Fatal("profile allowlist mismatch")
	}
}
