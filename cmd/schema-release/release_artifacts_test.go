package main

import (
	"io/fs"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"testing"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

func TestEveryEmbeddedReleaseArtifact(t *testing.T) {
	count := 0
	err := fs.WalkDir(schemareleases.FS, "postgres", func(path string, entry fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if entry.IsDir() || !strings.HasSuffix(path, "/manifest.json") {
			return nil
		}
		count++
		release := strings.TrimSuffix(path, "/manifest.json")
		t.Run(release, func(t *testing.T) {
			manifest, _, err := schemareleases.Load(release)
			if err != nil {
				t.Fatal(err)
			}
			if _, err := schemareleases.BootstrapBytes(manifest); err != nil {
				t.Fatal(err)
			}
			if manifest.Compatibility != nil {
				for _, proof := range manifest.Compatibility.Upgrades {
					from, raw, err := schemareleases.Load(proof.FromRelease)
					if err != nil {
						t.Fatal(err)
					}
					if _, err := manifest.UpgradeFrom(from, raw, proof.FromTrackerFingerprint); err != nil {
						t.Fatal(err)
					}
				}
			}
			if os.Getenv("ESQYMA_TEST_ATLAS") == "1" {
				root, err := findRepositoryRoot()
				if err != nil {
					t.Fatal(err)
				}
				snapshot, err := createMigrationSnapshot(t.Context(), root, manifest)
				if err != nil {
					t.Fatal(err)
				}
				snapshot.Close()
			}
		})
		return nil
	})
	if err != nil {
		t.Fatal(err)
	}
	if count == 0 {
		t.Fatal("no embedded releases qualified")
	}
}

func TestPendingMigrationPolicyCI(t *testing.T) {
	head := os.Getenv("ESQYMA_MIGRATION_BASE_HEAD")
	if head == "" {
		t.Skip("CI supplies the reviewed base migration head")
	}
	if !regexp.MustCompile(`^[0-9]{14}$`).MatchString(head) {
		t.Fatal("invalid CI base head")
	}
	root, err := findRepositoryRoot()
	if err != nil {
		t.Fatal(err)
	}
	directory := filepath.Join(root, "packages/esqyma/migrations/postgres")
	entries, err := os.ReadDir(directory)
	if err != nil {
		t.Fatal(err)
	}
	for _, entry := range entries {
		name := entry.Name()
		if entry.IsDir() || !strings.HasSuffix(name, ".sql") || len(name) < 14 || name[:14] <= head {
			continue
		}
		t.Run(name, func(t *testing.T) {
			raw, err := os.ReadFile(filepath.Join(directory, name))
			if err != nil {
				t.Fatal(err)
			}
			if err := validateMigrationFileSQL(name, string(raw)); err != nil {
				t.Fatal(err)
			}
		})
	}
}
