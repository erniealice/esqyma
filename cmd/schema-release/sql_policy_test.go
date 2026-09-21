package main

import (
	"os"
	"path/filepath"
	"testing"
)

func TestPendingMigrationRequiresUnchangedPolicyCheckedBytes(t *testing.T) {
	directory := t.TempDir()
	name := "20260918000000_probe.sql"
	body := []byte("ALTER TABLE public.probe ADD COLUMN extra integer;\n")
	path := filepath.Join(directory, name)
	if err := os.WriteFile(path, body, 0600); err != nil {
		t.Fatal(err)
	}
	files := []migrationFile{{Name: name, SHA256: sha256Hex(body)}}
	first, err := pendingSQLDigest(directory, files)
	if err != nil {
		t.Fatal(err)
	}
	second, err := pendingSQLDigest(directory, files)
	if err != nil || first != second {
		t.Fatal("stable approved bytes changed digest")
	}
	body = []byte("-- atlas:txmode\tnone\nALTER TABLE public.probe ADD COLUMN extra integer;\n")
	if err := os.WriteFile(path, body, 0600); err != nil {
		t.Fatal(err)
	}
	if _, err := pendingSQLDigest(directory, files); err == nil {
		t.Fatal("accepted changed staged bytes")
	}
	files[0].SHA256 = sha256Hex(body)
	if _, err := pendingSQLDigest(directory, files); err == nil {
		t.Fatal("accepted transaction override even with matching digest")
	}
}

func TestAtomicMigrationPolicy(t *testing.T) {
	for _, sql := range []string{
		"CREATE TABLE public.example(id integer PRIMARY KEY, note text DEFAULT 'COMMIT; DROP TABLE example');",
		"/* outer /* nested */ comment */ ALTER TABLE public.example ADD COLUMN extra integer;",
		"CREATE UNIQUE INDEX example_idx ON public.example(id); COMMENT ON TABLE public.example IS 'transaction control: BEGIN';",
		"CREATE TYPE public.probe AS ENUM ('new','done'); ALTER TYPE public.probe ADD VALUE 'later';",
		"CREATE TABLE public.child(id integer REFERENCES public.parent(id) ON DELETE NO ACTION);",
		"ALTER TABLE public.example VALIDATE CONSTRAINT example_check;",
		"ALTER TABLE example VALIDATE CONSTRAINT example_check;",
	} {
		if err := validateAtomicMigrationSQL(sql); err != nil {
			t.Errorf("valid additive SQL refused: %v", err)
		}
	}
	for _, sql := range []string{
		"-- atlas:txmode none\nCREATE TABLE probe(id integer);",
		"-- atlas:txmode\tnone\nCREATE TABLE probe(id integer);",
		"-- ATLAS:TXMODE file\nCREATE TABLE probe(id integer);",
		"/* atlas:txmode none */ CREATE TABLE probe(id integer);",
		"COMMIT; CREATE TABLE probe(id integer); BEGIN;",
		"END TRANSACTION;", "ROLLBACK;", "PREPARE TRANSACTION 'x';",
		"CREATE INDEX CONCURRENTLY probe_idx ON probe(id);",
		"DROP TABLE probe;", "TRUNCATE probe;", "DELETE FROM probe;",
		"ALTER TABLE probe ALTER COLUMN id TYPE bigint, ADD COLUMN extra integer;",
		"ALTER TABLE probe ADD COLUMN extra integer, DISABLE TRIGGER ALL;",
		"ALTER TABLE probe ADD COLUMN extra integer, VALIDATE CONSTRAINT probe_check;",
		"ALTER TABLE probe VALIDATE CONSTRAINT first, VALIDATE CONSTRAINT second;",
		"ALTER TABLE probe VALIDATE CONSTRAINT probe_check CASCADE;",
		"ALTER TABLE probe RENAME TO hidden;",
		"CREATE OR REPLACE FUNCTION probe() RETURNS void AS 'SELECT 1' LANGUAGE sql;",
		"DO $$ BEGIN EXECUTE 'DROP TABLE probe'; END $$;",
		"CALL probe();", "SELECT dangerous_function();", "SET standard_conforming_strings=off;",
		"INSERT INTO probe VALUES(1);", "UPDATE probe SET id=2;",
		"ALTER TABLE atlas_schema_revisions.atlas_schema_revisions ADD COLUMN x integer;",
		"ALTER TABLE \"ichizen_deploy\".\"data_bundle_receipts\" ADD COLUMN x integer;",
		"CREATE TABLE probe(note text DEFAULT E'a\\'; COMMIT;');",
		"/* incomplete", "COMMENT ON TABLE probe IS 'incomplete",
	} {
		if err := validateAtomicMigrationSQL(sql); err == nil {
			t.Errorf("unsafe/unclassified SQL accepted: %s", sql)
		}
	}
}

func TestReviewedMigrationPolicyIsExactAndNarrow(t *testing.T) {
	root := repositoryRootForTest(t)
	path := filepath.Join(root, "packages/esqyma/migrations/postgres/20260829000000_copya_bundle_receipt.sql")
	raw, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	if err := validateMigrationFileSQL(filepath.Base(path), string(raw)); err != nil {
		t.Fatalf("reviewed historical migration refused: %v", err)
	}
	if err := validateMigrationFileSQL(filepath.Base(path), string(raw)+"\n"); err == nil {
		t.Fatal("changed reviewed migration bytes were accepted")
	}
	if err := validateMigrationFileSQL("20260921000000_new_procedural.sql", "CREATE OR REPLACE FUNCTION probe() RETURNS void AS $$ BEGIN NULL; END $$ LANGUAGE plpgsql;"); err == nil {
		t.Fatal("new procedural migration bypassed atomic policy")
	}
}
