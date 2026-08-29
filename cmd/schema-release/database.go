package main

import (
	"bufio"
	"bytes"
	"context"
	"database/sql"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

func openDatabase(config databaseConfig, name string) (*sql.DB, error) {
	db, err := sql.Open("pgx", config.databaseURL(name))
	if err != nil {
		return nil, err
	}
	if err := db.Ping(); err != nil {
		db.Close()
		return nil, err
	}
	return db, nil
}

func databaseExists(ctx context.Context, admin *sql.DB, name string) (bool, error) {
	var exists bool
	err := admin.QueryRowContext(ctx, `SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname=$1)`, name).Scan(&exists)
	return exists, err
}

func createDatabase(ctx context.Context, admin *sql.DB, name string) error {
	if !databasePattern.MatchString(name) {
		return fmt.Errorf("unsafe database name %q", name)
	}
	_, err := admin.ExecContext(ctx, `CREATE DATABASE "`+name+`"`)
	return err
}

func observedLoopback(ctx context.Context, admin *sql.DB) error {
	var observed string
	if err := admin.QueryRowContext(ctx, `SELECT COALESCE(inet_server_addr()::text, 'local-socket')`).Scan(&observed); err != nil {
		return err
	}
	if observed == "local-socket" {
		return nil
	}
	host := observed
	if address, _, found := strings.Cut(observed, "/"); found {
		host = address
	}
	config := databaseConfig{Host: host}
	if !config.loopback() {
		return fmt.Errorf("database server is not loopback (observed %s)", observed)
	}
	return nil
}

func databaseState(ctx context.Context, db *sql.DB) (string, error) {
	var tracker bool
	if err := db.QueryRowContext(ctx, `SELECT to_regclass('atlas_schema_revisions.atlas_schema_revisions') IS NOT NULL`).Scan(&tracker); err != nil {
		return "", err
	}
	var objects int
	if err := db.QueryRowContext(ctx, `
		SELECT count(*) FROM pg_class c
		JOIN pg_namespace n ON n.oid=c.relnamespace
		WHERE n.nspname NOT IN ('pg_catalog','information_schema','atlas_schema_revisions')
		  AND n.nspname NOT LIKE 'pg_toast%' AND n.nspname NOT LIKE 'pg_temp_%'
		  AND c.relkind IN ('r','p','v','m','S','f')`).Scan(&objects); err != nil {
		return "", err
	}
	if tracker {
		return "managed", nil
	}
	if objects == 0 {
		return "empty", nil
	}
	return "untracked-nonempty", nil
}

func applyBootstrap(config databaseConfig, manifest schemareleases.Manifest, raw []byte) error {
	temp, err := os.CreateTemp("", "ichizen-schema-bootstrap-*.sql")
	if err != nil {
		return err
	}
	path := temp.Name()
	defer os.Remove(path)
	if _, err := temp.Write(raw); err != nil {
		temp.Close()
		return err
	}
	if err := temp.Close(); err != nil {
		return err
	}
	command := exec.Command("psql", "-X", "-v", "ON_ERROR_STOP=1", "-f", path)
	command.Env = config.postgresEnvironment(config.Name)
	output, err := command.CombinedOutput()
	if err != nil {
		return fmt.Errorf("apply bootstrap: %w: %s", err, sanitizeCommandOutput(output))
	}
	return nil
}

func normalizedSchemaFingerprint(config databaseConfig, manifest schemareleases.Manifest) (string, error) {
	args := []string{
		"--schema-only", "--no-owner", "--no-privileges", "--no-comments",
		"--no-publications", "--no-security-labels", "--no-subscriptions",
		"--exclude-schema=atlas_schema_revisions", "--restrict-key=" + manifest.Bootstrap.RestrictKey,
	}
	command := exec.Command("pg_dump", args...)
	command.Env = config.postgresEnvironment(config.Name)
	output, err := command.Output()
	if err != nil {
		var exitError *exec.ExitError
		if errors.As(err, &exitError) {
			return "", fmt.Errorf("pg_dump: %w: %s", err, sanitizeCommandOutput(exitError.Stderr))
		}
		return "", err
	}
	hashInput := bytes.NewBuffer(nil)
	scanner := bufio.NewScanner(bytes.NewReader(output))
	scanner.Buffer(make([]byte, 64*1024), 16*1024*1024)
	for scanner.Scan() {
		line := scanner.Text()
		if strings.HasPrefix(line, "--") || strings.HasPrefix(line, `\restrict `) || strings.HasPrefix(line, `\unrestrict `) || len(strings.Fields(line)) == 0 {
			continue
		}
		hashInput.WriteString(line)
		hashInput.WriteByte('\n')
	}
	if err := scanner.Err(); err != nil {
		return "", err
	}
	return sha256Hex(hashInput.Bytes()), nil
}

func establishAtlasHead(root string, config databaseConfig, manifest schemareleases.Manifest) error {
	atlas := filepath.Join(root, "packages", "esqyma", ".tools", "atlas", "v1.3.0", "atlas")
	migrations := filepath.Join(root, "packages", "esqyma", "migrations", "postgres")
	command := exec.Command(atlas, "migrate", "set", manifest.Atlas.Head, "--dir", "file://"+migrations, "--url", config.databaseURL(config.Name))
	output, err := command.CombinedOutput()
	if err != nil {
		return fmt.Errorf("establish Atlas head: %w: %s", err, sanitizeCommandOutput(output))
	}
	return nil
}

func validateLocalTools(root string, manifest schemareleases.Manifest) error {
	atlas := filepath.Join(root, "packages", "esqyma", ".tools", "atlas", "v1.3.0", "atlas")
	output, err := exec.Command(atlas, "version").CombinedOutput()
	if err != nil || !strings.Contains(string(output), "v"+manifest.Atlas.ToolVersion) {
		return fmt.Errorf("pinned Atlas v%s is required; run pnpm atlas:install", manifest.Atlas.ToolVersion)
	}
	output, err = exec.Command("pg_dump", "--version").CombinedOutput()
	if err != nil || !strings.HasPrefix(string(output), "pg_dump (PostgreSQL) "+manifest.Bootstrap.PGDumpVersion) {
		return fmt.Errorf("pg_dump %s is required", manifest.Bootstrap.PGDumpVersion)
	}
	atlasSum, err := os.ReadFile(filepath.Join(root, "packages", "esqyma", "migrations", "postgres", "atlas.sum"))
	if err != nil {
		return err
	}
	if sha256Hex(atlasSum) != manifest.Atlas.SumSHA256 {
		return errors.New("checked-out atlas.sum does not match the release manifest")
	}
	return nil
}

func sanitizeCommandOutput(output []byte) string {
	text := strings.TrimSpace(string(output))
	if len(text) > 2000 {
		return text[:2000] + "…"
	}
	return text
}
