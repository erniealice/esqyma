package main

import (
	"context"
	"database/sql"
	"fmt"
	"net/url"
	"os"
	"testing"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func TestDatabaseStateRejectsUntrackedNonemptyIntegration(t *testing.T) {
	adminURL := os.Getenv("ESQYMA_TEST_ADMIN_URL")
	if adminURL == "" {
		t.Skip("ESQYMA_TEST_ADMIN_URL is not set")
	}
	parsed, err := url.Parse(adminURL)
	if err != nil {
		t.Fatal(err)
	}
	if host := parsed.Hostname(); host != "127.0.0.1" && host != "localhost" && host != "::1" {
		t.Fatalf("refusing non-loopback integration database %q", host)
	}
	name := fmt.Sprintf("ichizen_dbinit_state_%d", time.Now().UTC().UnixNano())
	if !databasePattern.MatchString(name) || len(name) > 63 {
		t.Fatalf("unsafe disposable database name %q", name)
	}
	admin, err := sql.Open("pgx", adminURL)
	if err != nil {
		t.Fatal(err)
	}
	defer admin.Close()
	if _, err := admin.ExecContext(t.Context(), `CREATE DATABASE "`+name+`"`); err != nil {
		t.Fatal(err)
	}
	defer func() {
		_, _ = admin.ExecContext(context.Background(), `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname=$1 AND pid <> pg_backend_pid()`, name)
		_, _ = admin.ExecContext(context.Background(), `DROP DATABASE IF EXISTS "`+name+`"`)
	}()

	parsed.Path = "/" + name
	db, err := sql.Open("pgx", parsed.String())
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	if err := db.PingContext(t.Context()); err != nil {
		t.Fatal(err)
	}
	if state, err := databaseState(t.Context(), db); err != nil || state != "empty" {
		t.Fatalf("new disposable database state=%q err=%v", state, err)
	}
	if _, err := db.ExecContext(t.Context(), `CREATE TABLE public.untracked_probe (id integer PRIMARY KEY)`); err != nil {
		t.Fatal(err)
	}
	if state, err := databaseState(t.Context(), db); err != nil || state != "untracked-nonempty" {
		t.Fatalf("untracked database state=%q err=%v", state, err)
	}
}
