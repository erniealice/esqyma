package main

import (
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"
	"time"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

func captureUpgradeOutput(t *testing.T, run func() error) ([]byte, error) {
	t.Helper()
	reader, writer, err := os.Pipe()
	if err != nil {
		t.Fatal(err)
	}
	previous := os.Stdout
	os.Stdout = writer
	defer func() { os.Stdout = previous; reader.Close(); writer.Close() }()
	output := make(chan []byte, 1)
	go func() { raw, _ := io.ReadAll(reader); output <- raw }()
	runErr := run()
	writer.Close()
	os.Stdout = previous
	return <-output, runErr
}

// Complete operator fixture: synthetic private releases, four unique local DBs,
// real pinned Atlas, actual backup/restore proof, and post-commit fault recovery.
// No published artifacts, application databases, or remote targets are mutated.
func TestUpgradeLifecycleIntegration(t *testing.T) {
	raw := os.Getenv("ESQYMA_TEST_ADMIN_URL")
	if raw == "" {
		t.Skip("ESQYMA_TEST_ADMIN_URL is not set")
	}
	parsed, err := url.Parse(raw)
	if err != nil {
		t.Fatal("invalid integration connection")
	}
	if h := parsed.Hostname(); h != "127.0.0.1" && h != "localhost" && h != "::1" {
		t.Fatal("integration requires loopback")
	}
	realRoot, err := findRepositoryRoot()
	if err != nil {
		t.Fatal(err)
	}
	atlas, err := pinnedAtlas(realRoot)
	if err != nil {
		t.Fatal(err)
	}
	admin, err := sql.Open("pgx", raw)
	if err != nil {
		t.Fatal(err)
	}
	defer admin.Close()
	if err := observedLoopback(t.Context(), admin); err != nil {
		t.Fatal(err)
	}
	password, _ := parsed.User.Password()
	port := parsed.Port()
	if port == "" {
		port = "5432"
	}
	config := databaseConfig{Host: parsed.Hostname(), Port: port, User: parsed.User.Username(), Password: password, SSLMode: parsed.Query().Get("sslmode")}
	if config.SSLMode == "" {
		config.SSLMode = "disable"
	}
	stem := fmt.Sprintf("ichizen_lifecycle_%d", time.Now().UnixNano())
	runtimeRole := stem + "_rt"
	if _, err := admin.ExecContext(t.Context(), `CREATE ROLE "`+runtimeRole+`" NOLOGIN`); err != nil {
		t.Fatal(err)
	}
	defer func() {
		if _, err := admin.ExecContext(context.Background(), `DROP ROLE "`+runtimeRole+`"`); err != nil {
			t.Error(err)
		}
	}()
	create := func(t *testing.T, suffix string) (*sql.DB, databaseConfig) {
		t.Helper()
		c := config
		c.Name = stem + suffix
		if _, err := admin.ExecContext(t.Context(), `CREATE DATABASE "`+c.Name+`"`); err != nil {
			t.Fatal(err)
		}
		db, err := openDatabase(c, c.Name)
		if err != nil {
			t.Fatal(err)
		}
		t.Cleanup(func() {
			db.Close()
			ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
			defer cancel()
			if _, err := admin.ExecContext(ctx, `DROP DATABASE "`+c.Name+`" WITH (FORCE)`); err != nil {
				t.Error(err)
			}
		})
		return db, c
	}
	// Cleanup callbacks must run while the control connection/role still exist.
	t.Run("reviewed transition and recovery", func(t *testing.T) {
		// Register parent-created fixtures on this subtest so its cleanup precedes
		// the outer deferred role/control connection cleanup.
		source, sourceConfig := create(t, "_source")
		reference, referenceConfig := create(t, "_reference")
		fresh, freshConfig := create(t, "_fresh")
		restored, restoreConfig := create(t, "_restore")
		fixtureRoot := t.TempDir()
		receipts := t.TempDir()
		evidence := t.TempDir()
		write := func(path string, raw []byte) {
			t.Helper()
			if err := os.MkdirAll(filepath.Dir(path), 0700); err != nil {
				t.Fatal(err)
			}
			if err := os.WriteFile(path, raw, 0600); err != nil {
				t.Fatal(err)
			}
		}
		toolPath := filepath.Join(fixtureRoot, "packages/esqyma/.tools/atlas/v1.3.0/atlas")
		if err := os.MkdirAll(filepath.Dir(toolPath), 0700); err != nil {
			t.Fatal(err)
		}
		if err := os.Symlink(atlas, toolPath); err != nil {
			t.Fatal(err)
		}
		if err := os.Symlink(filepath.Join(realRoot, "packages/copya"), filepath.Join(fixtureRoot, "packages/copya")); err != nil {
			t.Fatal(err)
		}
		directory := filepath.Join(fixtureRoot, "packages/esqyma/migrations/postgres")
		baseline := []byte(`CREATE TABLE public.workspace (id text PRIMARY KEY, slug text NOT NULL);
CREATE TABLE public.lifecycle_probe (id integer PRIMARY KEY, note text NOT NULL);
CREATE SCHEMA ichizen_deploy;
CREATE TABLE ichizen_deploy.data_bundle_receipts (target_key text NOT NULL, bundle_id text NOT NULL, bundle_version text NOT NULL, bundle_digest text NOT NULL, schema_release text NOT NULL, PRIMARY KEY(target_key,bundle_id,bundle_version));
`)
		write(filepath.Join(directory, "20990101000000_baseline.sql"), baseline)
		hash := func() string {
			t.Helper()
			if _, err := exec.CommandContext(t.Context(), atlas, "migrate", "hash", "--dir", "file://"+directory).CombinedOutput(); err != nil {
				t.Fatal("fixture Atlas hash failed")
			}
			digest, err := fileSHA256(filepath.Join(directory, "atlas.sum"))
			if err != nil {
				t.Fatal(err)
			}
			return digest
		}
		sourceSum := hash()
		snapshot := &migrationSnapshot{Directory: directory}
		for _, c := range []databaseConfig{sourceConfig, referenceConfig} {
			if err := runAtlasUpgrade(t.Context(), fixtureRoot, snapshot, c, false); err != nil {
				t.Fatal(err)
			}
		}
		from, _, err := schemareleases.Load("postgres/2026.08.1")
		if err != nil {
			t.Fatal(err)
		}
		from.Release = "postgres/2099.01.1"
		from.Atlas.Head = "20990101000000"
		from.Atlas.RevisionCount = 1
		from.Atlas.SumSHA256 = sourceSum
		from.Bootstrap.SHA256 = sha256Hex(baseline)
		from.Atlas.TrackerFingerprint, err = schemareleases.AtlasTrackerFingerprint(t.Context(), source)
		if err != nil {
			t.Fatal(err)
		}
		from.Bootstrap.CatalogFingerprint, err = schemareleases.CatalogFingerprint(t.Context(), source)
		if err != nil {
			t.Fatal(err)
		}
		from.Bootstrap.NormalizedSchemaFingerprint, err = normalizedSchemaFingerprint(sourceConfig, from)
		if err != nil {
			t.Fatal(err)
		}
		fromRaw, err := json.Marshal(from)
		if err != nil {
			t.Fatal(err)
		}
		successor := []byte("ALTER TABLE public.lifecycle_probe ADD COLUMN extra integer;\n")
		write(filepath.Join(directory, "20990102000000_expand.sql"), successor)
		to := from
		to.Release = "postgres/2099.01.2"
		to.Atlas.Head = "20990102000000"
		to.Atlas.RevisionCount = 2
		to.Atlas.SumSHA256 = hash()
		if err := runAtlasUpgrade(t.Context(), fixtureRoot, snapshot, referenceConfig, false); err != nil {
			t.Fatal(err)
		}
		upgradedTracker, err := schemareleases.AtlasTrackerFingerprint(t.Context(), reference)
		if err != nil {
			t.Fatal(err)
		}
		to.Bootstrap.CatalogFingerprint, err = schemareleases.CatalogFingerprint(t.Context(), reference)
		if err != nil {
			t.Fatal(err)
		}
		to.Bootstrap.NormalizedSchemaFingerprint, err = normalizedSchemaFingerprint(referenceConfig, to)
		if err != nil {
			t.Fatal(err)
		}
		completeBootstrap := append(append([]byte{}, baseline...), successor...)
		to.Bootstrap.SHA256 = sha256Hex(completeBootstrap)
		if _, err := fresh.ExecContext(t.Context(), string(completeBootstrap)); err != nil {
			t.Fatal(err)
		}
		if err := establishAtlasHead(fixtureRoot, freshConfig, to); err != nil {
			t.Fatal(err)
		}
		to.Atlas.TrackerFingerprint, err = schemareleases.AtlasTrackerFingerprint(t.Context(), fresh)
		if err != nil {
			t.Fatal(err)
		}
		freshNormalized, err := normalizedSchemaFingerprint(freshConfig, to)
		if err != nil || freshNormalized != to.Bootstrap.NormalizedSchemaFingerprint {
			t.Fatalf("fresh/upgrade parity differs: %v", err)
		}
		to.FormatVersion = 2
		to.Compatibility = &schemareleases.Compatibility{Phase: "expand", APIReference: "fixture-v1", MinimumOperatorVersion: 2, Oracles: []string{"atlas-history", "catalog", "seed-receipts", "workspace", "runtime-role", "normalized-schema"}, Upgrades: []schemareleases.UpgradeProof{{FromRelease: from.Release, FromManifestSHA256: sha256Hex(fromRaw), FromTrackerFingerprint: from.Atlas.TrackerFingerprint, TrackerFingerprint: upgradedTracker}}}
		oracleSQL := "SELECT id, note FROM public.lifecycle_probe WHERE $1::text = 'workspace-gpagoda'"
		to.Compatibility.DataOracles = []schemareleases.DataOracle{{ID: "preserved-source-data", SQL: oracleSQL, SQLSHA256: sha256Hex([]byte(oracleSQL)), Mode: "unchanged", MaxRows: 10, TimeoutSeconds: 5}}
		to.SeedContract.CompatibleSchemaReleases = []string{from.Release}
		toRaw, err := json.Marshal(to)
		if err != nil {
			t.Fatal(err)
		}
		bundleRaw, err := os.ReadFile(filepath.Join(realRoot, "deploy/gpagoda/database/data/gpagoda-base/2026.08.1.json"))
		if err != nil {
			t.Fatal(err)
		}
		bundleRaw = bytes.ReplaceAll(bundleRaw, []byte("postgres/2026.08.1"), []byte(from.Release))
		bundlePath := "deploy/gpagoda/database/data/fixture.json"
		write(filepath.Join(fixtureRoot, bundlePath), bundleRaw)
		target := targetManifest{FormatVersion: 1, TargetKey: "gpagoda/lifecycle", Scope: "disposable", SchemaRelease: to.Release, Database: targetDatabase{EnvFile: "fixture.env", Name: sourceConfig.Name}, BusinessType: "leasing", Workspace: targetWorkspace{ID: "workspace-gpagoda", Slug: "gpagoda"}, SeedProfile: "client-minimal", Bundles: []string{bundlePath}}
		endpoint := net.JoinHostPort(config.Host, config.Port)
		target.Access = &databaseAccess{Endpoint: endpoint, RuntimeRole: runtimeRole, MigrationRole: config.User, Runtime: credentialReference{UserEnv: "FIXTURE_RUNTIME_USER", PasswordEnv: "FIXTURE_RUNTIME_PASSWORD", ConnectionUser: runtimeRole}, Migration: credentialReference{UserEnv: "FIXTURE_MIGRATION_USER", PasswordEnv: "FIXTURE_MIGRATION_PASSWORD", ConnectionUser: config.User}}
		target.Upgrade = &upgradeTarget{ConnectionMode: "direct", FromRelease: from.Release, Endpoint: endpoint, MigrationRole: config.User, RuntimeRole: runtimeRole, BackupMaxAgeHours: 24}
		targetRaw, _ := json.Marshal(target)
		write(filepath.Join(fixtureRoot, "deploy/gpagoda/database/targets/lifecycle.json"), targetRaw)
		fleetRaw, _ := json.Marshal(fleetRegistry{FormatVersion: 1, Targets: []fleetTarget{{Key: target.TargetKey, Path: "deploy/gpagoda/database/targets/lifecycle.json", SHA256: sha256Hex(targetRaw), Scope: "disposable", Environment: "ci", RolloutBatch: 0}}})
		write(filepath.Join(fixtureRoot, "deploy/database-fleet.json"), fleetRaw)
		commitFleetFixture(t, fixtureRoot, "deploy/database-fleet.json", "deploy/gpagoda/database/targets/lifecycle.json", bundlePath)
		write(filepath.Join(fixtureRoot, "fixture.env"), []byte(fmt.Sprintf("DATABASE_POSTGRES_HOST=%s\nDATABASE_POSTGRES_PORT=%s\nDATABASE_POSTGRES_SSLMODE=%s\n", config.Host, config.Port, config.SSLMode)))
		t.Setenv("FIXTURE_MIGRATION_USER", config.User)
		t.Setenv("FIXTURE_MIGRATION_PASSWORD", config.Password)
		t.Setenv("DB_INIT_RECEIPT_DIR", receipts)
		if _, err := source.ExecContext(t.Context(), "INSERT INTO public.workspace VALUES ('workspace-gpagoda','gpagoda'); INSERT INTO public.lifecycle_probe VALUES (1,'preserved');"); err != nil {
			t.Fatal(err)
		}
		if _, err := source.ExecContext(t.Context(), "INSERT INTO ichizen_deploy.data_bundle_receipts VALUES ($1,$2,$3,$4,$5)", target.TargetKey, "gpagoda-base", "2026.08.1", sha256Hex(bundleRaw), from.Release); err != nil {
			t.Fatal(err)
		}
		for _, query := range []string{
			"WITH changed AS (DELETE FROM public.lifecycle_probe RETURNING id) SELECT $1::text FROM changed",
			"SELECT $1::text UNION ALL SELECT $1::text",
		} {
			unsafe := schemareleases.DataOracle{ID: "refusal-probe", SQL: query, SQLSHA256: sha256Hex([]byte(query)), Mode: "unchanged", MaxRows: 1, TimeoutSeconds: 5}
			if _, err := observeDataOracle(t.Context(), source, unsafe, target.Workspace.ID); err == nil {
				t.Fatal("data oracle accepted write or row-bound violation")
			}
		}
		catalog := upgradeReleaseCatalog{Load: func(release string) (schemareleases.Manifest, []byte, error) {
			if release == from.Release {
				return from, fromRaw, nil
			}
			if release == to.Release {
				return to, toRaw, nil
			}
			return schemareleases.Manifest{}, nil, errors.New("unknown fixture release")
		}, Bootstrap: func(m schemareleases.Manifest) ([]byte, error) {
			if m.Bootstrap.SHA256 != sha256Hex(completeBootstrap) {
				return nil, errors.New("fixture bootstrap digest mismatch")
			}
			return completeBootstrap, nil
		}}
		options := upgradeOptions{FromRelease: from.Release}
		run := func() ([]byte, error) {
			return captureUpgradeOutput(t, func() error {
				return runUpgradeWithCatalog(t.Context(), fixtureRoot, target.TargetKey, to.Release, options, catalog)
			})
		}
		planRaw, err := run()
		if err != nil {
			t.Fatal(err)
		}
		var planned struct {
			Plan   upgradePlan `json:"plan"`
			SHA256 string      `json:"sha256"`
		}
		if err := json.Unmarshal(planRaw, &planned); err != nil {
			t.Fatal(err)
		}
		sourceTracker, err := schemareleases.AtlasTrackerFingerprint(t.Context(), source)
		if err != nil || sourceTracker != from.Atlas.TrackerFingerprint {
			t.Fatal("planning changed predecessor history")
		}
		archive := filepath.Join(evidence, "source.dump")
		dump := exec.CommandContext(t.Context(), "pg_dump", "--format=custom", "--file", archive)
		dump.Env = sourceConfig.postgresEnvironment(sourceConfig.Name)
		if err := dump.Run(); err != nil {
			t.Fatal("fixture backup failed")
		}
		restore := exec.CommandContext(t.Context(), "pg_restore", "--exit-on-error", "--no-owner", "--no-privileges", "--dbname", restoreConfig.Name, archive)
		restore.Env = restoreConfig.postgresEnvironment(restoreConfig.Name)
		if err := restore.Run(); err != nil {
			t.Fatal("fixture restore failed")
		}
		restoredTracker, err := schemareleases.AtlasTrackerFingerprint(t.Context(), restored)
		if err != nil || restoredTracker != from.Atlas.TrackerFingerprint {
			t.Fatal("restored backup history differs")
		}
		archiveHash, err := fileSHA256(archive)
		if err != nil {
			t.Fatal(err)
		}
		listing, err := exec.CommandContext(t.Context(), "pg_restore", "--list", archive).Output()
		if err != nil {
			t.Fatal(err)
		}
		now := time.Now().UTC().Format(time.RFC3339)
		backup := backupReceipt{FormatVersion: 1, TargetKey: target.TargetKey, Database: sourceConfig.Name, Endpoint: endpoint, FromRelease: from.Release, PlanSHA256: planned.SHA256, TrackerFingerprint: from.Atlas.TrackerFingerprint, CatalogFingerprint: from.Bootstrap.CatalogFingerprint, ArchivePath: archive, ArchiveSHA256: archiveHash, ArchiveListSHA256: sha256Hex(listing), CreatedAt: now, RestoreVerifiedAt: now, RestoreEvidenceRef: "fixture-restored-and-verified"}
		backupRaw, _ := json.Marshal(backup)
		backupPath := filepath.Join(evidence, "backup.json")
		write(backupPath, backupRaw)
		options = upgradeOptions{FromRelease: from.Release, Apply: true, ApprovedPlan: planned.SHA256, ApprovalRef: "fixture-review", BackupReceipt: backupPath, BackupSHA256: sha256Hex(backupRaw)}
		if _, err := source.ExecContext(t.Context(), "UPDATE public.lifecycle_probe SET note='changed-before-apply'"); err != nil {
			t.Fatal(err)
		}
		if _, err := run(); err == nil || !strings.Contains(err.Error(), "exact current plan") {
			t.Fatalf("data drift did not invalidate approval: %v", err)
		}
		if _, err := source.ExecContext(t.Context(), "UPDATE public.lifecycle_probe SET note='preserved'"); err != nil {
			t.Fatal(err)
		}
		interrupted := errors.New("injected process failure after Atlas commit")
		catalog.AfterApply = func() error { return interrupted }
		if _, err := run(); !errors.Is(err, interrupted) {
			t.Fatalf("expected post-commit fault, got %v", err)
		}
		afterTracker, err := schemareleases.AtlasTrackerFingerprint(t.Context(), source)
		if err != nil || afterTracker != upgradedTracker {
			t.Fatal("fault was not after exact committed transition")
		}
		entries, _ := os.ReadDir(receipts)
		if len(entries) != 1 || !strings.HasPrefix(entries[0].Name(), "upgrade-intent-") {
			t.Fatal("pre-commit intent missing or success receipt emitted after fault")
		}
		catalog.AfterApply = func() error { t.Fatal("recovery reran Atlas"); return nil }
		if _, err := source.ExecContext(t.Context(), "UPDATE public.lifecycle_probe SET note='changed-after-commit'"); err != nil {
			t.Fatal(err)
		}
		if _, err := run(); err == nil || !strings.Contains(err.Error(), "data oracle preserved-source-data changed") {
			t.Fatalf("recovery blessed changed data: %v", err)
		}
		if _, err := source.ExecContext(t.Context(), "UPDATE public.lifecycle_probe SET note='preserved'"); err != nil {
			t.Fatal(err)
		}
		resultRaw, err := run()
		if err != nil {
			t.Fatal(err)
		}
		var output commandOutput
		if err := json.Unmarshal(resultRaw, &output); err != nil {
			t.Fatal(err)
		}
		if output.IntentSHA256 == "" || output.ReceiptDigest == "" || output.FromRelease != from.Release || len(output.DataOracles) != 1 {
			t.Fatal("recovered receipt missing reviewed evidence")
		}
		var count int
		var note, seedRelease string
		if err := source.QueryRowContext(t.Context(), "SELECT count(*),min(note) FROM public.lifecycle_probe").Scan(&count, &note); err != nil || count != 1 || note != "preserved" {
			t.Fatal("upgrade lost/duplicated source data")
		}
		if err := source.QueryRowContext(t.Context(), "SELECT count(*),min(schema_release) FROM ichizen_deploy.data_bundle_receipts").Scan(&count, &seedRelease); err != nil || count != 1 || seedRelease != from.Release {
			t.Fatal("upgrade rewrote/duplicated original seed receipt")
		}
		if _, err := run(); err != nil {
			t.Fatal(err)
		}
	})
}
