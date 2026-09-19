package main

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"sort"
	"strings"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

type migrationFile struct {
	Name   string `json:"name"`
	SHA256 string `json:"sha256"`
}

type migrationSnapshot struct {
	Directory string
	Files     []migrationFile
}

func fileSHA256(path string) (string, error) {
	file, err := os.Open(path)
	if err != nil {
		return "", err
	}
	defer file.Close()
	hash := sha256.New()
	if _, err := io.Copy(hash, file); err != nil {
		return "", err
	}
	return hex.EncodeToString(hash.Sum(nil)), nil
}

func pinnedAtlas(root string) (string, error) {
	expected := map[string]string{
		"darwin/amd64": "650981a024301775ec964e5134e2d5712b7ef1b25fec4b2ec54bad762b4bdf6f",
		"linux/amd64":  "10d7913e3dce43ab99b8d71534a4cbadaf11a16dc293adf3b91d10e83a0ac70b",
	}[runtime.GOOS+"/"+runtime.GOARCH]
	if expected == "" {
		return "", errors.New("unsupported Atlas platform")
	}
	path := filepath.Join(root, "packages/esqyma/.tools/atlas/v1.3.0/atlas")
	actual, err := fileSHA256(path)
	if err != nil {
		return "", fmt.Errorf("read pinned Atlas: %w", err)
	}
	if actual != expected {
		return "", errors.New("pinned Atlas binary checksum mismatch")
	}
	return path, nil
}

// stageMigrationFiles copies an exact release prefix into private local storage.
// It does not read connection settings or communicate with a database. Historical
// names are accepted only because the complete result must match a release hash.
func stageMigrationFiles(source, destination, head string, count int) ([]migrationFile, error) {
	entries, err := os.ReadDir(source)
	if err != nil {
		return nil, err
	}
	var files []migrationFile
	revisions := make(map[string][]migrationFile)
	for _, entry := range entries {
		name := entry.Name()
		if !strings.HasSuffix(name, ".sql") {
			continue
		}
		if len(name) < 19 || name[14] != '_' {
			return nil, fmt.Errorf("invalid migration filename %q", name)
		}
		for _, digit := range name[:14] {
			if digit < '0' || digit > '9' {
				return nil, fmt.Errorf("invalid migration timestamp %q", name)
			}
		}
		if name[:14] > head {
			continue
		}
		info, err := entry.Info()
		if err != nil {
			return nil, err
		}
		if !info.Mode().IsRegular() || entry.Type()&os.ModeSymlink != 0 {
			return nil, fmt.Errorf("migration must be a regular file: %s", name)
		}
		raw, err := os.ReadFile(filepath.Join(source, name))
		if err != nil {
			return nil, err
		}
		if err := os.WriteFile(filepath.Join(destination, name), raw, 0o600); err != nil {
			return nil, err
		}
		file := migrationFile{Name: name, SHA256: sha256Hex(raw)}
		files = append(files, file)
		revisions[name[:14]] = append(revisions[name[:14]], file)
	}
	sort.Slice(files, func(i, j int) bool { return files[i].Name < files[j].Name })
	if len(revisions) != count || len(files) == 0 || files[len(files)-1].Name[:14] != head {
		return nil, errors.New("migration prefix does not match release head/count")
	}
	for _, sameVersion := range revisions {
		if len(sameVersion) > 1 {
			if len(sameVersion) != 2 {
				return nil, errors.New("duplicate migration versions")
			}
			for _, file := range sameVersion {
				if legacyDirectionalHash(file.Name) != file.SHA256 {
					return nil, errors.New("unrecognized legacy migration pair")
				}
			}
		}
	}
	return files, nil
}

// The published v1 checksum includes this exact historical pair, while Atlas
// records one revision per timestamp. It is never a waiver for new migrations.
func legacyDirectionalHash(name string) string {
	return map[string]string{
		"20260509100000_expense_recognition_supplier_subscription_fks.down.sql": "934d30151de4d56aa991f8d44736549823fc7031801b917300676e6e7c50db7f",
		"20260509100000_expense_recognition_supplier_subscription_fks.up.sql":   "9f0416396941112b0c5dde8b72cd65bcb39dd2b8c05056dac4d8b64f2efc31ad",
	}[name]
}

func createMigrationSnapshot(ctx context.Context, root string, manifest schemareleases.Manifest) (*migrationSnapshot, error) {
	if err := manifest.Validate(); err != nil {
		return nil, err
	}
	atlas, err := pinnedAtlas(root)
	if err != nil {
		return nil, err
	}
	directory, err := os.MkdirTemp("", "ichizen-migration-prefix-*")
	if err != nil {
		return nil, err
	}
	keep := false
	defer func() {
		if !keep {
			_ = os.RemoveAll(directory)
		}
	}()
	files, err := stageMigrationFiles(filepath.Join(root, "packages/esqyma/migrations/postgres"), directory, manifest.Atlas.Head, manifest.Atlas.RevisionCount)
	if err != nil {
		return nil, err
	}
	// Reconstructing the checksum only in the private snapshot allows verification
	// of an older published prefix even when the checkout contains newer releases.
	command := exec.CommandContext(ctx, atlas, "migrate", "hash", "--dir", "file://"+directory)
	if err := command.Run(); err != nil {
		return nil, fmt.Errorf("hash release prefix: %w", err)
	}
	digest, err := fileSHA256(filepath.Join(directory, "atlas.sum"))
	if err != nil {
		return nil, err
	}
	if digest != manifest.Atlas.SumSHA256 {
		return nil, errors.New("migration bytes do not match immutable release checksum")
	}
	keep = true
	return &migrationSnapshot{Directory: directory, Files: files}, nil
}

func (snapshot *migrationSnapshot) Close() { _ = os.RemoveAll(snapshot.Directory) }

func pendingMigrationFiles(from, to *migrationSnapshot) ([]migrationFile, error) {
	if len(from.Files) == 0 || len(to.Files) <= len(from.Files) {
		return nil, errors.New("upgrade must append migrations to a nonempty predecessor")
	}
	for i, old := range from.Files {
		if old != to.Files[i] {
			return nil, errors.New("published migration prefix changed")
		}
	}
	pending := to.Files[len(from.Files):]
	last := from.Files[len(from.Files)-1].Name[:14]
	for _, file := range pending {
		if file.Name[:14] <= last || strings.HasSuffix(file.Name, ".up.sql") || strings.HasSuffix(file.Name, ".down.sql") {
			return nil, errors.New("new migrations must have unique increasing timestamps and no directional suffix")
		}
		last = file.Name[:14]
	}
	return append([]migrationFile(nil), pending...), nil
}
