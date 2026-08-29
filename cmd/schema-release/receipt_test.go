package main

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
	"testing"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

func TestRunReceiptIsSanitizedAndAppendOnly(t *testing.T) {
	root := t.TempDir()
	receiptDirectory := t.TempDir()
	targetPath := filepath.Join(root, "target.json")
	targetRaw := []byte(`{"target_key":"gpagoda/local-leasing1"}`)
	if err := os.WriteFile(targetPath, targetRaw, 0o600); err != nil {
		t.Fatal(err)
	}
	manifest, manifestRaw, err := schemareleases.Load("postgres/2026.08.1")
	if err != nil {
		t.Fatal(err)
	}
	target := targetManifest{
		TargetKey: "gpagoda/local-leasing1", Scope: "local", SchemaRelease: manifest.Release,
		Database: targetDatabase{Name: "leasing1"}, BusinessType: "leasing", SeedProfile: "client-minimal",
		Workspace: targetWorkspace{ID: "workspace-gpagoda", Slug: "gpagoda"},
	}
	bundles := []resolvedBundle{{
		Metadata: bundleMetadata{ID: "gpagoda-base", Version: "2026.08.1"},
		Digest:   strings.Repeat("a", 64),
	}}
	output := commandOutput{CatalogFingerprint: manifest.Bootstrap.CatalogFingerprint}
	values := map[string]string{"DB_INIT_RECEIPT_DIR": receiptDirectory}

	uri, digest, err := writeRunReceipt(root, values, target, targetPath, manifest, manifestRaw, bundles, output)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.HasPrefix(uri, "file://") || len(digest) != 64 {
		t.Fatalf("unexpected receipt identity uri=%q digest=%q", uri, digest)
	}
	path := strings.TrimPrefix(uri, "file://")
	raw, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	if sha256Hex(raw) != digest {
		t.Fatal("receipt digest does not match immutable bytes")
	}
	info, err := os.Stat(path)
	if err != nil {
		t.Fatal(err)
	}
	if info.Mode().Perm()&0o222 != 0 {
		t.Fatalf("receipt remains writable: mode=%o", info.Mode().Perm())
	}
	for _, forbidden := range []string{"password", "email", "database_url", "host", "username"} {
		if strings.Contains(strings.ToLower(string(raw)), forbidden) {
			t.Fatalf("receipt contains forbidden field %q", forbidden)
		}
	}
	var receipt runReceipt
	if err := json.Unmarshal(raw, &receipt); err != nil {
		t.Fatal(err)
	}
	if receipt.TargetManifestDigest != sha256Hex(targetRaw) || receipt.ReleaseManifestDigest != schemareleases.ManifestDigest(manifestRaw) {
		t.Fatal("receipt did not pin its reviewed code manifests")
	}

	secondURI, _, err := writeRunReceipt(root, values, target, targetPath, manifest, manifestRaw, bundles, output)
	if err != nil {
		t.Fatal(err)
	}
	if secondURI == uri {
		t.Fatal("a later run must append a new receipt, not overwrite the prior receipt")
	}
}

func TestRunReceiptRefusesRepositoryStorageAndRemoteDefault(t *testing.T) {
	root := t.TempDir()
	targetPath := filepath.Join(root, "target.json")
	if err := os.WriteFile(targetPath, []byte(`{}`), 0o600); err != nil {
		t.Fatal(err)
	}
	manifest, manifestRaw, err := schemareleases.Load("postgres/2026.08.1")
	if err != nil {
		t.Fatal(err)
	}
	target := targetManifest{TargetKey: "client/prod", Scope: "remote"}
	if _, _, err := writeRunReceipt(root, nil, target, targetPath, manifest, manifestRaw, nil, commandOutput{}); err == nil {
		t.Fatal("remote apply without an external receipt directory was accepted")
	}
	values := map[string]string{"DB_INIT_RECEIPT_DIR": filepath.Join(root, "receipts")}
	if _, _, err := writeRunReceipt(root, values, target, targetPath, manifest, manifestRaw, nil, commandOutput{}); err == nil {
		t.Fatal("receipt storage inside the Git repository was accepted")
	}
}
