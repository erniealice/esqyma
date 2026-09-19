package main

import (
	"context"
	"database/sql"
	"fmt"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"testing"
	"time"
)

// This fixture qualifies the pinned Atlas invocation, independently of release
// proof generation. No fixture migration becomes a published release artifact.
func TestUpgradeAtomicApplyIntegration(t *testing.T) {
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
	root, err := findRepositoryRoot()
	if err != nil {
		t.Fatal(err)
	}
	atlas, err := pinnedAtlas(root)
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
	name := fmt.Sprintf("ichizen_upgrade_atomic_%d", time.Now().UnixNano())
	if _, err := admin.ExecContext(t.Context(), `CREATE DATABASE "`+name+`"`); err != nil {
		t.Fatal(err)
	}
	defer func() {
		ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()
		if _, err := admin.ExecContext(ctx, `DROP DATABASE "`+name+`" WITH (FORCE)`); err != nil {
			t.Error(err)
		}
	}()
	parsed.Path = "/" + name
	db, err := sql.Open("pgx", parsed.String())
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	password, _ := parsed.User.Password()
	port := parsed.Port()
	if port == "" {
		port = "5432"
	}
	config := databaseConfig{Host: parsed.Hostname(), Port: port, User: parsed.User.Username(), Password: password, Name: name, SSLMode: parsed.Query().Get("sslmode")}
	if config.SSLMode == "" {
		config.SSLMode = "disable"
	}
	snapshot := &migrationSnapshot{Directory: t.TempDir()}
	first := filepath.Join(snapshot.Directory, "20260918000100_first.sql")
	second := filepath.Join(snapshot.Directory, "20260918000200_second.sql")
	write := func(path, body string) {
		t.Helper()
		if err := os.WriteFile(path, []byte(body), 0600); err != nil {
			t.Fatal(err)
		}
	}
	hash := func() {
		t.Helper()
		if _, err := exec.CommandContext(t.Context(), atlas, "migrate", "hash", "--dir", "file://"+snapshot.Directory).CombinedOutput(); err != nil {
			t.Fatal("fixture hash failed")
		}
	}
	write(filepath.Join(snapshot.Directory, "20260918000000_baseline.sql"), "CREATE TABLE public.predecessor_probe (id integer PRIMARY KEY);\nINSERT INTO public.predecessor_probe VALUES (1);\n")
	hash()
	if err := runAtlasUpgrade(t.Context(), root, snapshot, config, false); err != nil {
		t.Fatal(err)
	}
	write(first, "CREATE TABLE public.upgrade_probe (id integer PRIMARY KEY, note text NOT NULL);\nINSERT INTO public.upgrade_probe VALUES (1, 'retained');\n")
	write(second, "ALTER TABLE public.upgrade_probe ADD COLUMN extra integer;\nSELECT 1/0;\n")
	hash()
	// Upgrade dry-run inspects an existing managed predecessor and adds no effects.
	if err := runAtlasUpgrade(t.Context(), root, snapshot, config, true); err != nil {
		t.Fatal(err)
	}
	assertAbsent := func() {
		t.Helper()
		var exists bool
		if err := db.QueryRowContext(t.Context(), "SELECT to_regclass('public.upgrade_probe') IS NOT NULL").Scan(&exists); err != nil || exists {
			t.Fatalf("fixture effects survived: exists=%t err=%v", exists, err)
		}
	}
	assertAbsent()
	if err := runAtlasUpgrade(t.Context(), root, snapshot, config, false); err == nil {
		t.Fatal("invalid migration succeeded")
	}
	assertAbsent()
	var predecessorRows, sourceRevisions int
	if err := db.QueryRowContext(t.Context(), "SELECT count(*) FROM public.predecessor_probe").Scan(&predecessorRows); err != nil || predecessorRows != 1 {
		t.Fatalf("predecessor data changed: count=%d err=%v", predecessorRows, err)
	}
	if err := db.QueryRowContext(t.Context(), "SELECT count(*) FROM atlas_schema_revisions.atlas_schema_revisions").Scan(&sourceRevisions); err != nil || sourceRevisions != 1 {
		t.Fatalf("failed batch left revisions: count=%d err=%v", sourceRevisions, err)
	}
	// Fixture correction is allowed only because no published release or successful
	// history exists. Real released failures require the separate recovery policy.
	write(second, "ALTER TABLE public.upgrade_probe ADD COLUMN extra integer;\n")
	hash()
	if err := runAtlasUpgrade(t.Context(), root, snapshot, config, false); err != nil {
		t.Fatal(err)
	}
	var revisions, rows int
	var note string
	if err := db.QueryRowContext(t.Context(), "SELECT count(*) FROM atlas_schema_revisions.atlas_schema_revisions").Scan(&revisions); err != nil || revisions != 3 {
		t.Fatalf("revision count=%d err=%v", revisions, err)
	}
	if err := db.QueryRowContext(t.Context(), "SELECT count(*),min(note) FROM public.upgrade_probe").Scan(&rows, &note); err != nil || rows != 1 || note != "retained" {
		t.Fatalf("data oracle count=%d err=%v", rows, err)
	}
	if err := runAtlasUpgrade(t.Context(), root, snapshot, config, false); err != nil {
		t.Fatal(err)
	}
	if err := db.QueryRowContext(t.Context(), "SELECT count(*) FROM atlas_schema_revisions.atlas_schema_revisions").Scan(&revisions); err != nil || revisions != 3 {
		t.Fatalf("rerun revision count=%d err=%v", revisions, err)
	}
	if err := db.QueryRowContext(t.Context(), "SELECT count(*) FROM public.upgrade_probe").Scan(&rows); err != nil || rows != 1 {
		t.Fatalf("rerun rows=%d err=%v", rows, err)
	}
}
