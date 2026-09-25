package main

import (
	"context"
	"fmt"
	"net/url"
	"os"
	"testing"
	"time"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

// TestRatingDescriptionSetReleaseUpgradeIntegration exercises the actual
// postgres/2026.09.5 -> postgres/2026.09.6 artifacts (rating description sets
// + the operator-only audit_trail.zz_rds_release_log) on a disposable
// PostgreSQL server. The ordinary test suite skips this unless the caller
// supplies an explicit loopback ESQYMA_TEST_ADMIN_URL.
//
// It deliberately uses the same bootstrap/snapshot/Atlas helpers as the
// release operator, then checks an existing predecessor row, fresh-bootstrap
// parity, and a no-op retry after the two pending revisions complete.
func TestRatingDescriptionSetReleaseUpgradeIntegration(t *testing.T) {
	raw := os.Getenv("ESQYMA_TEST_ADMIN_URL")
	if raw == "" {
		t.Skip("ESQYMA_TEST_ADMIN_URL is not set")
	}
	parsed, err := url.Parse(raw)
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
	adminConfig := databaseConfig{
		Host:     host,
		Port:     port,
		User:     parsed.User.Username(),
		Password: password,
		SSLMode:  parsed.Query().Get("sslmode"),
	}
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

	root, err := findRepositoryRoot()
	if err != nil {
		t.Fatal(err)
	}
	from, _, err := schemareleases.Load("postgres/2026.09.5")
	if err != nil {
		t.Fatal(err)
	}
	to, _, err := schemareleases.Load("postgres/2026.09.6")
	if err != nil {
		t.Fatal(err)
	}
	fromBootstrap, err := schemareleases.BootstrapBytes(from)
	if err != nil {
		t.Fatal(err)
	}
	toBootstrap, err := schemareleases.BootstrapBytes(to)
	if err != nil {
		t.Fatal(err)
	}
	fromSnapshot, err := createMigrationSnapshot(t.Context(), root, from)
	if err != nil {
		t.Fatal(err)
	}
	defer fromSnapshot.Close()
	toSnapshot, err := createMigrationSnapshot(t.Context(), root, to)
	if err != nil {
		t.Fatal(err)
	}
	defer toSnapshot.Close()

	pending, err := pendingMigrationFiles(fromSnapshot, toSnapshot)
	if err != nil {
		t.Fatal(err)
	}
	wantPending := []string{
		"20260925120000_rating_description_sets.sql",
		"20260925130000_rating_description_sets_release_log.sql",
	}
	if len(pending) != len(wantPending) {
		t.Fatalf("pending migration count = %d, want %d", len(pending), len(wantPending))
	}
	for i, migration := range pending {
		if migration.Name != wantPending[i] {
			t.Fatalf("pending migration %d = %q, want %q", i, migration.Name, wantPending[i])
		}
	}

	stem := fmt.Sprintf("ichizen_rds_release_%d", time.Now().UnixNano())
	sourceName := stem + "_source"
	freshName := stem + "_fresh"
	createDatabase := func(name string) databaseConfig {
		t.Helper()
		if _, err := admin.ExecContext(t.Context(), `CREATE DATABASE "`+name+`"`); err != nil {
			t.Fatal(err)
		}
		config := adminConfig
		config.Name = name
		t.Cleanup(func() {
			ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
			defer cancel()
			if _, err := admin.ExecContext(ctx, `DROP DATABASE "`+name+`" WITH (FORCE)`); err != nil {
				t.Error(err)
			}
		})
		return config
	}

	sourceConfig := createDatabase(sourceName)
	freshConfig := createDatabase(freshName)
	if err := applyBootstrap(sourceConfig, from, fromBootstrap); err != nil {
		t.Fatalf("apply .5 bootstrap: %v", err)
	}
	if err := establishAtlasHead(root, sourceConfig, from); err != nil {
		t.Fatalf("establish .5 Atlas head: %v", err)
	}
	source, err := openDatabase(sourceConfig, sourceName)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = source.Close() })

	workspaceID := "rds-release-workspace"
	if _, err := source.ExecContext(t.Context(), `
		INSERT INTO public.workspace (id, name, active, slug)
		VALUES ($1, 'Rating description set release fixture', true, 'rds-release')`, workspaceID); err != nil {
		t.Fatalf("seed predecessor-preservation row: %v", err)
	}
	if _, err := source.ExecContext(t.Context(), `
		INSERT INTO public.template_task_criteria (id, active, workspace_id)
		VALUES ('rds-release-criteria', true, $1)`, workspaceID); err != nil {
		t.Fatalf("seed predecessor binding row: %v", err)
	}
	var beforeCount int
	if err := source.QueryRowContext(t.Context(), `SELECT count(*) FROM public.template_task_criteria WHERE workspace_id=$1`, workspaceID).Scan(&beforeCount); err != nil {
		t.Fatal(err)
	}
	if beforeCount != 1 {
		t.Fatalf("predecessor fixture count = %d, want 1", beforeCount)
	}

	if err := runAtlasUpgrade(t.Context(), root, toSnapshot, sourceConfig, false); err != nil {
		t.Fatalf("apply exact .5 -> .6 migration prefix: %v", err)
	}
	verified, err := schemareleases.VerifyDatabase(t.Context(), source, to, nil)
	if err != nil {
		t.Fatalf("verify upgraded .6 database: %v", err)
	}
	if verified.AtlasHead != "20260925130000" || verified.RevisionCount != to.Atlas.RevisionCount {
		t.Fatalf("upgraded Atlas state = %s/%d, want %s/%d", verified.AtlasHead, verified.RevisionCount, to.Atlas.Head, to.Atlas.RevisionCount)
	}
	var afterCount int
	if err := source.QueryRowContext(t.Context(), `SELECT count(*) FROM public.template_task_criteria WHERE workspace_id=$1`, workspaceID).Scan(&afterCount); err != nil {
		t.Fatal(err)
	}
	if afterCount != beforeCount {
		t.Fatalf("data-neutral migration changed predecessor rows: before=%d after=%d", beforeCount, afterCount)
	}
	for _, relation := range []string{
		"public.rating_description_set",
		"public.rating_description_set_entry",
		"public.rating_description_set_product_plan",
		"audit_trail.zz_rds_release_log",
	} {
		var rows int
		if err := source.QueryRowContext(t.Context(), `SELECT count(*) FROM `+relation).Scan(&rows); err != nil {
			t.Fatalf("new relation %s: %v", relation, err)
		}
		if rows != 0 {
			t.Fatalf("expand-only release wrote %d rows into %s", rows, relation)
		}
	}
	var logKey string
	if err := source.QueryRowContext(t.Context(), `
		SELECT string_agg(a.attname, ',' ORDER BY k.ord)
		FROM pg_constraint c
		CROSS JOIN LATERAL unnest(c.conkey) WITH ORDINALITY k(attnum, ord)
		JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = k.attnum
		WHERE c.conrelid = 'audit_trail.zz_rds_release_log'::regclass AND c.contype = 'p'`).Scan(&logKey); err != nil {
		t.Fatal(err)
	}
	if logKey != "workspace_id,run_id,step,table_name,row_id,action" {
		t.Fatalf("rollback log primary key = %q, want workspace-scoped composite key", logKey)
	}

	// Re-running the exact operator prefix after the destination is reached is
	// the recovery/idempotency check: Atlas must not duplicate revisions or
	// recreate the additive table.
	if err := runAtlasUpgrade(t.Context(), root, toSnapshot, sourceConfig, false); err != nil {
		t.Fatalf("idempotent destination retry: %v", err)
	}
	var retryCount int
	if err := source.QueryRowContext(t.Context(), `SELECT count(*) FROM atlas_schema_revisions.atlas_schema_revisions`).Scan(&retryCount); err != nil {
		t.Fatal(err)
	}
	if retryCount != to.Atlas.RevisionCount {
		t.Fatalf("retry Atlas row count = %d, want %d", retryCount, to.Atlas.RevisionCount)
	}

	if err := applyBootstrap(freshConfig, to, toBootstrap); err != nil {
		t.Fatalf("apply fresh .6 bootstrap: %v", err)
	}
	if err := establishAtlasHead(root, freshConfig, to); err != nil {
		t.Fatalf("establish fresh .6 Atlas head: %v", err)
	}
	fresh, err := openDatabase(freshConfig, freshName)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = fresh.Close() })
	freshVerified, err := schemareleases.VerifyDatabase(t.Context(), fresh, to, nil)
	if err != nil {
		t.Fatalf("verify fresh .6 database: %v", err)
	}
	if verified.CatalogFingerprint != freshVerified.CatalogFingerprint {
		t.Fatalf("upgrade/fresh catalog fingerprints differ: %s != %s", verified.CatalogFingerprint, freshVerified.CatalogFingerprint)
	}
	if verified.TrackerFingerprint == freshVerified.TrackerFingerprint {
		t.Fatalf("upgrade/fresh tracker fingerprints unexpectedly match: %s", verified.TrackerFingerprint)
	}
}
