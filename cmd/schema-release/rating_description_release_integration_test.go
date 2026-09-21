package main

import (
	"context"
	"database/sql"
	"fmt"
	"net/url"
	"os"
	"testing"
	"time"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

// TestRatingDescriptionReleaseUpgradeIntegration exercises the actual
// postgres/2026.09.2 -> postgres/2026.09.3 artifacts on a disposable
// PostgreSQL server. The ordinary test suite skips this unless the caller
// supplies an explicit loopback ESQYMA_TEST_ADMIN_URL.
//
// It deliberately uses the same bootstrap/snapshot/Atlas helpers as the
// release operator, then checks an existing predecessor row, fresh-bootstrap
// parity, and a no-op retry after the three pending revisions complete.
func TestRatingDescriptionReleaseUpgradeIntegration(t *testing.T) {
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
	from, _, err := schemareleases.Load("postgres/2026.09.2")
	if err != nil {
		t.Fatal(err)
	}
	to, _, err := schemareleases.Load("postgres/2026.09.3")
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
		"20260829000000_copya_bundle_receipt.sql",
		"20260918000000_agreement_escalation_clauses.sql",
		"20260920000000_rating_description_mode.sql",
	}
	if len(pending) != len(wantPending) {
		t.Fatalf("pending migration count = %d, want %d", len(pending), len(wantPending))
	}
	for i, migration := range pending {
		if migration.Name != wantPending[i] {
			t.Fatalf("pending migration %d = %q, want %q", i, migration.Name, wantPending[i])
		}
	}

	stem := fmt.Sprintf("ichizen_rating_release_%d", time.Now().UnixNano())
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
		t.Fatalf("apply .2 bootstrap: %v", err)
	}
	if err := establishAtlasHead(root, sourceConfig, from); err != nil {
		t.Fatalf("establish .2 Atlas head: %v", err)
	}
	source, err := openDatabase(sourceConfig, sourceName)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = source.Close() })

	workspaceID := "rating-release-workspace"
	if _, err := source.ExecContext(t.Context(), `
		INSERT INTO public.workspace (id, name, active, slug)
		VALUES ($1, 'Rating release fixture', true, 'rating-release')`, workspaceID); err != nil {
		t.Fatalf("seed predecessor-preservation row: %v", err)
	}
	if _, err := source.ExecContext(t.Context(), `
		INSERT INTO public.template_task_criteria (id, active, workspace_id)
		VALUES ('rating-release-criteria', true, $1)`, workspaceID); err != nil {
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
		t.Fatalf("apply exact .2 -> .3 migration prefix: %v", err)
	}
	verified, err := schemareleases.VerifyDatabase(t.Context(), source, to, nil)
	if err != nil {
		t.Fatalf("verify upgraded .3 database: %v", err)
	}
	if verified.AtlasHead != "20260920000000" || verified.RevisionCount != to.Atlas.RevisionCount {
		t.Fatalf("upgraded Atlas state = %s/%d, want %s/%d", verified.AtlasHead, verified.RevisionCount, to.Atlas.Head, to.Atlas.RevisionCount)
	}
	var ratingMode, ratingScale sql.NullString
	if err := source.QueryRowContext(t.Context(), `SELECT rating_mode, rating_scale_id FROM public.template_task_criteria WHERE id='rating-release-criteria'`).Scan(&ratingMode, &ratingScale); err != nil {
		t.Fatal(err)
	}
	if ratingMode.Valid || ratingScale.Valid {
		t.Fatalf("legacy binding columns were not data-neutral: rating_mode=%v rating_scale_id=%v", ratingMode, ratingScale)
	}
	var afterCount, childCount int
	if err := source.QueryRowContext(t.Context(), `SELECT count(*) FROM public.template_task_criteria WHERE workspace_id=$1`, workspaceID).Scan(&afterCount); err != nil {
		t.Fatal(err)
	}
	if err := source.QueryRowContext(t.Context(), `SELECT count(*) FROM public.template_task_criteria_rating_description`).Scan(&childCount); err != nil {
		t.Fatal(err)
	}
	if afterCount != beforeCount || childCount != 0 {
		t.Fatalf("data-neutral migration changed rows: predecessor=%d after=%d child=%d", beforeCount, afterCount, childCount)
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
		t.Fatalf("apply fresh .3 bootstrap: %v", err)
	}
	if err := establishAtlasHead(root, freshConfig, to); err != nil {
		t.Fatalf("establish fresh .3 Atlas head: %v", err)
	}
	fresh, err := openDatabase(freshConfig, freshName)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = fresh.Close() })
	freshVerified, err := schemareleases.VerifyDatabase(t.Context(), fresh, to, nil)
	if err != nil {
		t.Fatalf("verify fresh .3 database: %v", err)
	}
	if verified.CatalogFingerprint != freshVerified.CatalogFingerprint {
		t.Fatalf("upgrade/fresh catalog fingerprints differ: %s != %s", verified.CatalogFingerprint, freshVerified.CatalogFingerprint)
	}
	if verified.TrackerFingerprint == freshVerified.TrackerFingerprint {
		t.Fatalf("upgrade/fresh tracker fingerprints unexpectedly match: %s", verified.TrackerFingerprint)
	}
}
