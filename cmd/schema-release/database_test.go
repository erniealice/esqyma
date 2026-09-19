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
	password, _ := parsed.User.Password()
	config := databaseConfig{Host: parsed.Hostname(), Port: parsed.Port(), User: parsed.User.Username(), Password: password, Name: name, SSLMode: parsed.Query().Get("sslmode")}
	if config.Port == "" {
		config.Port = "5432"
	}
	if config.SSLMode == "" {
		config.SSLMode = "disable"
	}
	target := targetManifest{Database: targetDatabase{Name: name}, Access: &databaseAccess{MigrationRole: config.User}}
	if err := verifyInitializationIdentity(t.Context(), db, target, config, name); err != nil {
		t.Fatal(err)
	}
	target.Access.MigrationRole = "not_the_selected_migrator"
	if err := verifyInitializationIdentity(t.Context(), db, target, config, name); err == nil {
		t.Fatal("accepted wrong migration role")
	}
	target.Access.MigrationRole = config.User
	if err := verifyInitializationIdentity(t.Context(), db, target, config, "another_database"); err == nil {
		t.Fatal("accepted wrong database")
	}
	lock, err := acquireInitializationLock(t.Context(), admin, name)
	if err != nil {
		t.Fatal(err)
	}
	if other, err := acquireInitializationLock(t.Context(), admin, name); err == nil {
		releaseInitializationLock(other, name)
		t.Fatal("concurrent initializer accepted")
	}
	releaseInitializationLock(lock, name)
	lock, err = acquireInitializationLock(t.Context(), db, name)
	if err != nil {
		t.Fatal(err)
	}
	if other, err := acquireUpgradeLock(t.Context(), db); err == nil {
		releaseInitializationLock(other, name)
		t.Fatal("upgrade overlaps initializer")
	}
	releaseInitializationLock(lock, name)
	lock, err = acquireUpgradeLock(t.Context(), db)
	if err != nil {
		t.Fatal("lock not released", err)
	}
	releaseInitializationLock(lock, name)
	if err := applyBootstrap(config, schemareleases.Manifest{}, []byte("CREATE TABLE public.atomic_probe(id int); SELECT missing_bootstrap_function();")); err == nil {
		t.Fatal("bad bootstrap unexpectedly succeeded")
	}
	if state, err := databaseState(t.Context(), db); err != nil || state != "empty" {
		t.Fatalf("failed bootstrap left partial state: %s %v", state, err)
	}
	if err := applyBootstrap(config, schemareleases.Manifest{}, []byte("CREATE TABLE public.untracked_probe(id integer PRIMARY KEY);")); err != nil {
		t.Fatal("bootstrap retry failed", err)
	}

	if state, err := databaseState(t.Context(), db); err != nil || state != "untracked-nonempty" {
		t.Fatalf("untracked database state=%q err=%v", state, err)
	}
}
