package main

import (
	"context"
	"os"
	"path/filepath"
	"testing"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

func TestMigrationSnapshotCapsReleaseHead(t *testing.T) {
	source, destination := t.TempDir(), t.TempDir()
	for _, name := range []string{"20260101000000_first.sql", "20260201000000_second.sql", "20260301000000_future.sql"} {
		if err := os.WriteFile(filepath.Join(source, name), []byte("SELECT 1;\n"), 0o600); err != nil {
			t.Fatal(err)
		}
	}
	files, err := stageMigrationFiles(source, destination, "20260201000000", 2)
	if err != nil {
		t.Fatal(err)
	}
	if len(files) != 2 {
		t.Fatal("incorrect migration prefix")
	}
	if _, err := os.Stat(filepath.Join(destination, "20260301000000_future.sql")); !os.IsNotExist(err) {
		t.Fatal("future migration copied into approved release")
	}
	if _, err := stageMigrationFiles(source, t.TempDir(), "20260201000000", 1); err == nil {
		t.Fatal("wrong revision count accepted")
	}
	if err := os.Symlink(filepath.Join(source, "20260101000000_first.sql"), filepath.Join(source, "20260102000000_link.sql")); err != nil {
		t.Fatal(err)
	}
	if _, err := stageMigrationFiles(source, t.TempDir(), "20260201000000", 3); err == nil {
		t.Fatal("symlink migration accepted")
	}
}

func TestPendingMigrationsPreservePrefix(t *testing.T) {
	old := migrationFile{Name: "20260101000000_first.sql", SHA256: "old"}
	addition := migrationFile{Name: "20260201000000_second.sql", SHA256: "new"}
	from := &migrationSnapshot{Files: []migrationFile{old}}
	to := &migrationSnapshot{Files: []migrationFile{old, addition}}
	pending, err := pendingMigrationFiles(from, to)
	if err != nil || len(pending) != 1 || pending[0] != addition {
		t.Fatalf("pending=%v err=%v", pending, err)
	}
	for _, tc := range []struct {
		name  string
		files []migrationFile
	}{
		{"changed prefix", []migrationFile{{Name: old.Name, SHA256: "tampered"}, addition}},
		{"same timestamp", []migrationFile{old, {Name: "20260101000000_collision.sql"}}},
		{"directional", []migrationFile{old, {Name: "20260201000000_second.up.sql"}}},
		{"downgrade", nil},
		{"already current", []migrationFile{old}},
	} {
		t.Run(tc.name, func(t *testing.T) {
			if _, err := pendingMigrationFiles(from, &migrationSnapshot{Files: tc.files}); err == nil {
				t.Fatal("unsafe migration sequence accepted")
			}
		})
	}
}

func TestPublishedMigrationPrefixIntegration(t *testing.T) {
	if os.Getenv("ESQYMA_TEST_ATLAS") != "1" {
		t.Skip("ESQYMA_TEST_ATLAS=1 enables pinned local Atlas; no database connection")
	}
	root, err := findRepositoryRoot()
	if err != nil {
		t.Fatal(err)
	}
	manifest, _, err := schemareleases.Load("postgres/2026.08.1")
	if err != nil {
		t.Fatal(err)
	}
	snapshot, err := createMigrationSnapshot(context.Background(), root, manifest)
	if err != nil {
		t.Fatal(err)
	}
	defer snapshot.Close()
	if len(snapshot.Files) != manifest.Atlas.RevisionCount+1 {
		t.Fatal("unexpected migration count")
	}
	manifest.Atlas.SumSHA256 = "0000000000000000000000000000000000000000000000000000000000000000"
	if snapshot, err := createMigrationSnapshot(context.Background(), root, manifest); err == nil {
		snapshot.Close()
		t.Fatal("incorrect published checksum accepted")
	}
}
