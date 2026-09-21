package main

import (
	"context"
	"database/sql"
	"fmt"
	"net/url"
	"os"
	"testing"
	"time"
)

// Explicit fixture contract: create only unique loopback test databases/roles,
// assert authority using real PostgreSQL catalogs, then remove those fixtures.
// Never load an application's database name or a remote profile for mutations.
func TestUpgradeRuntimeAuthorityIntegration(t *testing.T) {
	raw := os.Getenv("ESQYMA_TEST_ADMIN_URL")
	if raw == "" {
		t.Skip("ESQYMA_TEST_ADMIN_URL is not set")
	}
	parsed, err := url.Parse(raw)
	if err != nil {
		t.Fatal("invalid integration connection")
	}
	if host := parsed.Hostname(); host != "127.0.0.1" && host != "localhost" && host != "::1" {
		t.Fatal("integration requires loopback")
	}
	name := fmt.Sprintf("ichizen_upgrade_role_%d", time.Now().UnixNano())
	runtime := name + "_rt"
	admin, err := sql.Open("pgx", raw)
	if err != nil {
		t.Fatal(err)
	}
	defer admin.Close()
	if err := observedLoopback(t.Context(), admin); err != nil {
		t.Fatal(err)
	}
	if _, err := admin.ExecContext(t.Context(), `CREATE DATABASE "`+name+`"`); err != nil {
		t.Fatal(err)
	}
	defer func() {
		ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()
		if _, err := admin.ExecContext(ctx, `DROP DATABASE "`+name+`" WITH (FORCE)`); err != nil {
			t.Error(err)
		}
		if _, err := admin.ExecContext(ctx, `DROP ROLE IF EXISTS "`+runtime+`"`); err != nil {
			t.Error(err)
		}
	}()
	if _, err := admin.ExecContext(t.Context(), `CREATE ROLE "`+runtime+`" NOLOGIN`); err != nil {
		t.Fatal(err)
	}
	parsed.Path = "/" + name
	db, err := sql.Open("pgx", parsed.String())
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	db.SetMaxOpenConns(2)
	var migrator string
	if err := db.QueryRowContext(t.Context(), "SELECT current_user").Scan(&migrator); err != nil {
		t.Fatal(err)
	}
	exec := func(q string) {
		t.Helper()
		if _, err := db.ExecContext(t.Context(), q); err != nil {
			t.Fatal(err)
		}
	}
	// A reviewed legacy predecessor can have Atlas history and the legacy
	// public.schema_migrations table without the newer Copya receipt ledger.
	// Authority verification must remain read-only and must not fail before the
	// candidate migration has a chance to create that ledger.
	exec(`CREATE SCHEMA atlas_schema_revisions; CREATE TABLE atlas_schema_revisions.atlas_schema_revisions(id integer); CREATE TABLE public.schema_migrations(id integer); CREATE TABLE public.application_probe(id integer)`)
	exec(`REVOKE CREATE ON SCHEMA public FROM PUBLIC`)
	check := func(wantSafe bool) {
		t.Helper()
		err := verifyRuntimeAuthority(t.Context(), db, runtime, migrator)
		if (err == nil) != wantSafe {
			t.Fatalf("safe=%t err=%v", wantSafe, err)
		}
	}
	check(true)
	exec(`CREATE SCHEMA ichizen_deploy; CREATE TABLE ichizen_deploy.data_bundle_receipts(id integer)`)
	check(true)

	t.Run("operator lock excludes a concurrent connection", func(t *testing.T) {
		first, err := acquireUpgradeLock(t.Context(), db)
		if err != nil {
			t.Fatal(err)
		}
		defer first.Close()
		if second, err := acquireUpgradeLock(t.Context(), db); err == nil {
			_ = second.Close()
			t.Fatal("concurrent operator acquired the same database lock")
		}
		if _, err := first.ExecContext(t.Context(), "SELECT pg_advisory_unlock(hashtextextended(current_database(), 736492))"); err != nil {
			t.Fatal(err)
		}
		_ = first.Close()
		next, err := acquireUpgradeLock(t.Context(), db)
		if err != nil {
			t.Fatal(err)
		}
		defer next.Close()
		if _, err := next.ExecContext(t.Context(), "SELECT pg_advisory_unlock(hashtextextended(current_database(), 736492))"); err != nil {
			t.Fatal(err)
		}
	})
	for _, table := range []string{"atlas_schema_revisions.atlas_schema_revisions", "ichizen_deploy.data_bundle_receipts", "public.schema_migrations"} {
		for _, privilege := range []string{"INSERT", "UPDATE", "DELETE", "TRUNCATE", "REFERENCES", "TRIGGER", "MAINTAIN"} {
			t.Run(table+"/"+privilege, func(t *testing.T) {
				exec(`GRANT ` + privilege + ` ON ` + table + ` TO "` + runtime + `"`)
				check(false)
				exec(`REVOKE ` + privilege + ` ON ` + table + ` FROM "` + runtime + `"`)
				check(true)
			})
		}
	}
	exec(`ALTER TABLE public.application_probe OWNER TO "` + runtime + `"`)
	check(false)
	exec(`ALTER TABLE public.application_probe OWNER TO "` + migrator + `"`)
	exec(`ALTER ROLE "` + runtime + `" REPLICATION`)
	check(false)
	exec(`ALTER ROLE "` + runtime + `" NOREPLICATION`)
	// Keep a real runtime-owned temporary row type alive on a separate connection.
	conn, err := db.Conn(t.Context())
	if err != nil {
		t.Fatal(err)
	}
	defer conn.Close()
	if _, err := conn.ExecContext(t.Context(), `SET ROLE "`+runtime+`"; CREATE TEMP TABLE runtime_temp_probe(id integer)`); err != nil {
		t.Fatal(err)
	}
	check(true)
}
