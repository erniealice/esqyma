package main

import (
	"context"
	"fmt"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"testing"
	"time"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

// This test deliberately restores the protected local education2 backup into
// a disposable database, removes only the three tracker rows to model the
// observed legacy pre-state, and proves that adoption writes metadata only.
// It never touches education2, education1, or a remote database.
func TestLegacyAdoptionMetadataIntegration(t *testing.T) {
	adminURL := os.Getenv("ESQYMA_TEST_ADMIN_URL")
	archive := os.Getenv("ESQYMA_LEGACY_ADOPTION_FIXTURE_DUMP")
	if adminURL == "" || archive == "" {
		t.Skip("ESQYMA_TEST_ADMIN_URL and ESQYMA_LEGACY_ADOPTION_FIXTURE_DUMP are required")
	}
	if _, err := os.Stat(archive); err != nil {
		t.Skipf("legacy adoption fixture dump is unavailable: %v", err)
	}
	parsed, err := url.Parse(adminURL)
	if err != nil || parsed.User == nil {
		t.Fatal("invalid integration connection")
	}
	host := parsed.Hostname()
	if host != "127.0.0.1" && host != "localhost" && host != "::1" {
		t.Fatal("integration requires loopback")
	}
	port := parsed.Port()
	if port == "" {
		port = "5432"
	}
	password, _ := parsed.User.Password()
	adminConfig := databaseConfig{Host: host, Port: port, User: parsed.User.Username(), Password: password, SSLMode: parsed.Query().Get("sslmode")}
	if adminConfig.SSLMode == "" {
		adminConfig.SSLMode = "disable"
	}
	admin, err := openDatabase(adminConfig, "postgres")
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = admin.Close() })
	if err := observedLoopback(t.Context(), admin); err != nil {
		t.Fatal(err)
	}
	name := fmt.Sprintf("ichizen_adoption_%d", time.Now().UnixNano())
	if _, err := admin.ExecContext(t.Context(), `CREATE DATABASE "`+name+`"`); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() {
		ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
		defer cancel()
		if _, err := admin.ExecContext(ctx, `DROP DATABASE "`+name+`" WITH (FORCE)`); err != nil {
			t.Error(err)
		}
	})

	disposable := adminConfig
	disposable.Name = name
	restore := exec.CommandContext(t.Context(), "pg_restore", "--exit-on-error", "--no-owner", "--no-privileges", "--dbname", name, archive)
	restore.Env = disposable.postgresEnvironment(name)
	if output, err := restore.CombinedOutput(); err != nil {
		t.Fatalf("restore fixture: %v: %s", err, sanitizeCommandOutput(output))
	}
	db, err := openDatabase(disposable, name)
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	manifest, _, err := schemareleases.Load("postgres/2026.09.2")
	if err != nil {
		t.Fatal(err)
	}
	type trackerRow struct {
		Version       string
		Description   string
		Type          int64
		Applied       int64
		Total         int64
		Hash          string
		PartialHashes string
	}
	rows, err := db.QueryContext(t.Context(), `SELECT version, description, type, applied, total, hash, COALESCE(partial_hashes::text, '') FROM atlas_schema_revisions.atlas_schema_revisions ORDER BY version`)
	if err != nil {
		t.Fatal(err)
	}
	var all []trackerRow
	for rows.Next() {
		var row trackerRow
		if err := rows.Scan(&row.Version, &row.Description, &row.Type, &row.Applied, &row.Total, &row.Hash, &row.PartialHashes); err != nil {
			rows.Close()
			t.Fatal(err)
		}
		all = append(all, row)
	}
	if err := rows.Close(); err != nil {
		t.Fatal(err)
	}
	if len(all) != 10 {
		t.Fatalf("fixture tracker rows=%d, want 10", len(all))
	}
	base, err := schemareleases.BaseCatalogFingerprint(t.Context(), db)
	if err != nil {
		t.Fatal(err)
	}
	overlay, err := schemareleases.OverlayFingerprint(t.Context(), db)
	if err != nil {
		t.Fatal(err)
	}
	postFingerprint, err := schemareleases.AtlasTrackerFingerprint(t.Context(), db)
	if err != nil {
		t.Fatal(err)
	}
	if !manifest.AcceptsTrackerState(len(all), postFingerprint) {
		t.Fatalf("restored fixture is not the expected .2 legacy installation: %d/%s", len(all), postFingerprint)
	}

	removed := map[string]bool{
		"20260813000000": true,
		"20260815000000": true,
		"20260822213000": true,
	}
	var adopted []adoptedRevision
	root, err := findRepositoryRoot()
	if err != nil {
		t.Fatal(err)
	}
	for _, row := range all {
		if !removed[row.Version] {
			continue
		}
		name := row.Version + "_" + row.Description + ".sql"
		migrationSHA, err := fileSHA256(filepath.Join(root, "packages/esqyma/migrations/postgres", name))
		if err != nil {
			t.Fatal(err)
		}
		adopted = append(adopted, adoptedRevision{Version: row.Version, Description: row.Description, AtlasHash: row.Hash, PartialHashes: row.PartialHashes, Type: row.Type, Applied: row.Applied, Total: row.Total, MigrationSHA256: migrationSHA})
	}
	if _, err := db.ExecContext(t.Context(), `DELETE FROM atlas_schema_revisions.atlas_schema_revisions WHERE version IN ('20260813000000','20260815000000','20260822213000')`); err != nil {
		t.Fatal(err)
	}
	preFingerprint, err := schemareleases.AtlasTrackerFingerprint(t.Context(), db)
	if err != nil {
		t.Fatal(err)
	}
	if preFingerprint != "4f3b11e94de8e7f1351eca05b3148ae2ed15e88cd656001f33ed13440e8bfa26" {
		t.Fatalf("fixture pre fingerprint=%s, want remote legacy pre fingerprint", preFingerprint)
	}
	target := targetManifest{
		FormatVersion: 1, TargetKey: "mmis/disposable-adoption", Scope: "disposable", AllowCreate: false,
		ExpectedEmpty: false, SchemaRelease: manifest.Release, Database: targetDatabase{EnvFile: "fixture.env", Name: name},
		BusinessType: "education", Workspace: targetWorkspace{ID: "019ecb8e-d83f-74ab-aa13-5a6c27afd112", Slug: "mmis"}, SeedProfile: "client-minimal",
		Adoption: &legacyAdoptionTarget{
			Mode: "legacy_adoption", PreTrackerRevisionCount: 7, PreHead: "20260809230000", PreTrackerFingerprint: preFingerprint,
			PostTrackerRevisionCount: 10, PostHead: "20260822213000", PostTrackerFingerprint: postFingerprint,
			BaseCatalogFingerprint: base, OverlayID: "fixture-overlay", OverlayFingerprint: overlay, Revisions: adopted,
			EffectOracles: []schemareleases.DataOracle{{ID: "fixture-proof", SQL: "SELECT $1::text WHERE false", SQLSHA256: sha256Hex([]byte("SELECT $1::text WHERE false")), Mode: "zero-rows", MaxRows: 1, TimeoutSeconds: 5}},
		},
	}
	if err := target.validate(target.TargetKey); err != nil {
		t.Fatal(err)
	}
	snapshot, err := createMigrationSnapshot(t.Context(), root, manifest)
	if err != nil {
		t.Fatal(err)
	}
	defer snapshot.Close()
	if err := validateLegacyAdoptionSources(manifest, *target.Adoption, snapshot); err != nil {
		t.Fatal(err)
	}
	lock, err := acquireUpgradeLock(t.Context(), db)
	if err != nil {
		t.Fatal(err)
	}
	if err := adoptLegacyTracker(t.Context(), lock, adopted); err != nil {
		releaseInitializationLock(lock, name)
		t.Fatal(err)
	}
	releaseInitializationLock(lock, name)
	state, err := readLegacyAdoptionState(t.Context(), db)
	if err != nil {
		t.Fatal(err)
	}
	if got := legacyAdoptionStateKind(state, *target.Adoption); got != "post" {
		t.Fatalf("adopted state=%s: %+v", got, state)
	}
	if _, err := schemareleases.VerifyDatabaseWithCatalogProof(t.Context(), db, manifest, nil, base, overlay); err != nil {
		t.Fatal(err)
	}
	var operatorVersion string
	if err := db.QueryRowContext(t.Context(), `SELECT operator_version FROM atlas_schema_revisions.atlas_schema_revisions WHERE version='20260822213000'`).Scan(&operatorVersion); err != nil {
		t.Fatal(err)
	}
	if operatorVersion != legacyAdoptionOperatorVersion {
		t.Fatalf("operator_version=%q", operatorVersion)
	}
}
