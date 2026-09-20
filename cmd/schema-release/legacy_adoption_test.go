package main

import (
	"encoding/base64"
	"os"
	"path/filepath"
	"strings"
	"testing"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

func testLegacyAdoptionTarget() targetManifest {
	hash := base64.StdEncoding.EncodeToString([]byte(strings.Repeat("h", 32)))
	sha := strings.Repeat("a", 64)
	revisions := []adoptedRevision{
		{Version: "20260813000000", Description: "first", AtlasHash: hash, PartialHashes: "null", Type: 2, Applied: 3, Total: 3, MigrationSHA256: sha},
		{Version: "20260815000000", Description: "second", AtlasHash: hash, PartialHashes: "null", Type: 2, Applied: 4, Total: 4, MigrationSHA256: sha},
		{Version: "20260822213000", Description: "third", AtlasHash: hash, PartialHashes: "null", Type: 2, Applied: 21, Total: 21, MigrationSHA256: sha},
	}
	oracleSQL := "SELECT $1::text WHERE false"
	return targetManifest{
		FormatVersion: 1, TargetKey: "mmis/test-adoption", Scope: "disposable", SchemaRelease: "postgres/2026.09.2",
		Database: targetDatabase{EnvFile: "fixture.env", Name: "education_fixture"}, BusinessType: "education",
		Workspace: targetWorkspace{ID: "workspace-mmis", Slug: "mmis"}, SeedProfile: "client-minimal",
		Upgrade: &upgradeTarget{Endpoint: "127.0.0.1:5432", MigrationRole: "fixture_migrator", RuntimeRole: "fixture_runtime", BackupMaxAgeHours: 24},
		Adoption: &legacyAdoptionTarget{
			Mode: "legacy_adoption", PreTrackerRevisionCount: 7, PreHead: "20260809230000", PreTrackerFingerprint: strings.Repeat("b", 64),
			PostTrackerRevisionCount: 10, PostHead: "20260822213000", PostTrackerFingerprint: strings.Repeat("c", 64),
			BaseCatalogFingerprint: strings.Repeat("d", 64), OverlayID: "test-overlay", OverlayFingerprint: strings.Repeat("e", 64),
			Revisions: revisions, EffectOracles: []schemareleases.DataOracle{{ID: "effect-proof", SQL: oracleSQL, SQLSHA256: sha256Hex([]byte(oracleSQL)), Mode: "zero-rows", MaxRows: 1, TimeoutSeconds: 5}},
		},
	}
}

func TestLegacyAdoptionTargetValidation(t *testing.T) {
	target := testLegacyAdoptionTarget()
	if err := target.validate(target.TargetKey); err != nil {
		t.Fatal(err)
	}
	if err := target.Adoption.validate(target.SchemaRelease); err != nil {
		t.Fatal(err)
	}
	target.Adoption.Revisions[1].Version = target.Adoption.Revisions[0].Version
	if err := target.Adoption.validate(target.SchemaRelease); err == nil {
		t.Fatal("duplicate adoption revision accepted")
	}
}

func TestReadAtlasSumsNormalizesDatabaseHashRepresentation(t *testing.T) {
	hash := base64.StdEncoding.EncodeToString([]byte(strings.Repeat("h", 32)))
	path := filepath.Join(t.TempDir(), "atlas.sum")
	if err := os.WriteFile(path, []byte("20260813000000_first.sql h1:"+hash+"\n"), 0o600); err != nil {
		t.Fatal(err)
	}
	got, err := readAtlasSums(path)
	if err != nil {
		t.Fatal(err)
	}
	if got["20260813000000_first.sql"] != hash {
		t.Fatalf("normalized Atlas hash=%q, want %q", got["20260813000000_first.sql"], hash)
	}
}

func TestLegacyAdoptionStateKindRequiresAllPinnedProofs(t *testing.T) {
	target := testLegacyAdoptionTarget()
	pre := legacyAdoptionState{
		TrackerRevisionCount: 7, Head: target.Adoption.PreHead, TrackerFingerprint: target.Adoption.PreTrackerFingerprint,
		BaseCatalogFingerprint: target.Adoption.BaseCatalogFingerprint, OverlayFingerprint: target.Adoption.OverlayFingerprint,
	}
	if got := legacyAdoptionStateKind(pre, *target.Adoption); got != "pre" {
		t.Fatalf("pre state kind=%q", got)
	}
	pre.BaseCatalogFingerprint = strings.Repeat("f", 64)
	if got := legacyAdoptionStateKind(pre, *target.Adoption); got != "unknown" {
		t.Fatalf("drifted state kind=%q", got)
	}
}

func TestLegacyAdoptionPlanDigestPinsMetadataOnly(t *testing.T) {
	target := testLegacyAdoptionTarget()
	plan := makeLegacyAdoptionPlan(target, strings.Repeat("1", 64), schemareleases.Manifest{Release: target.SchemaRelease}, []byte(`{"release":"postgres/2026.09.2"}`), databaseConfig{Name: target.Database.Name}, []oracleObservation{{ID: "effect-proof", SQLSHA256: target.Adoption.EffectOracles[0].SQLSHA256, Rows: 0, Fingerprint: strings.Repeat("0", 64)}})
	digest, err := plan.digest()
	if err != nil || len(digest) != 64 {
		t.Fatalf("plan digest=%q err=%v", digest, err)
	}
	if plan.MigrationSQLExecuted {
		t.Fatal("adoption plan permits migration SQL")
	}
	plan.MigrationSQLExecuted = true
	changed, err := plan.digest()
	if err != nil || changed == digest {
		t.Fatal("migration execution flag is not bound to plan digest")
	}
}
