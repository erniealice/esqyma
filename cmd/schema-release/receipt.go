package main

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

type receiptBundle struct {
	ID      string `json:"id"`
	Version string `json:"version"`
	Digest  string `json:"digest"`
}

type runReceipt struct {
	FormatVersion         int             `json:"format_version"`
	TargetKey             string          `json:"target_key"`
	TargetManifestDigest  string          `json:"target_manifest_digest"`
	Scope                 string          `json:"scope"`
	Database              string          `json:"database"`
	SchemaRelease         string          `json:"schema_release"`
	ReleaseManifestDigest string          `json:"release_manifest_digest"`
	AtlasHead             string          `json:"atlas_head"`
	CatalogFingerprint    string          `json:"catalog_fingerprint"`
	BusinessType          string          `json:"business_type"`
	SeedProfile           string          `json:"seed_profile"`
	WorkspaceID           string          `json:"workspace_id"`
	WorkspaceSlug         string          `json:"workspace_slug"`
	Bundles               []receiptBundle `json:"bundles"`
	Result                string          `json:"result"`
	CompletedAt           string          `json:"completed_at"`
}

func writeRunReceipt(root string, values map[string]string, target targetManifest, targetPath string, manifest schemareleases.Manifest, manifestRaw []byte, bundles []resolvedBundle, output commandOutput) (string, string, error) {
	directory := valueFor(values, "DB_INIT_RECEIPT_DIR", "")
	if directory == "" {
		if target.Scope == "remote" {
			return "", "", errors.New("DB_INIT_RECEIPT_DIR is required for a remote apply")
		}
		directory = filepath.Join(os.TempDir(), "ichizen-db-init-receipts")
	}
	if !filepath.IsAbs(directory) {
		return "", "", errors.New("DB_INIT_RECEIPT_DIR must be an absolute path outside the repository")
	}
	directory = filepath.Clean(directory)
	if insidePath(root, directory) {
		return "", "", errors.New("DB_INIT_RECEIPT_DIR must be outside the Git repository")
	}

	targetRaw, err := os.ReadFile(targetPath)
	if err != nil {
		return "", "", fmt.Errorf("read target for receipt: %w", err)
	}
	receipt := runReceipt{
		FormatVersion:         1,
		TargetKey:             target.TargetKey,
		TargetManifestDigest:  sha256Hex(targetRaw),
		Scope:                 target.Scope,
		Database:              target.Database.Name,
		SchemaRelease:         manifest.Release,
		ReleaseManifestDigest: schemareleases.ManifestDigest(manifestRaw),
		AtlasHead:             manifest.Atlas.Head,
		CatalogFingerprint:    output.CatalogFingerprint,
		BusinessType:          target.BusinessType,
		SeedProfile:           target.SeedProfile,
		WorkspaceID:           target.Workspace.ID,
		WorkspaceSlug:         target.Workspace.Slug,
		Result:                "applied_or_verified",
		CompletedAt:           time.Now().UTC().Format(time.RFC3339Nano),
	}
	for _, bundle := range bundles {
		receipt.Bundles = append(receipt.Bundles, receiptBundle{
			ID: bundle.Metadata.ID, Version: bundle.Metadata.Version, Digest: bundle.Digest,
		})
	}
	raw, err := json.MarshalIndent(receipt, "", "  ")
	if err != nil {
		return "", "", fmt.Errorf("encode run receipt: %w", err)
	}
	raw = append(raw, '\n')

	if err := os.MkdirAll(directory, 0o700); err != nil {
		return "", "", fmt.Errorf("create receipt directory: %w", err)
	}
	nonce := make([]byte, 12)
	if _, err := rand.Read(nonce); err != nil {
		return "", "", fmt.Errorf("generate receipt identity: %w", err)
	}
	name := fmt.Sprintf("%s_%s_%s.json",
		time.Now().UTC().Format("20060102T150405.000000000Z"),
		strings.NewReplacer("/", "_", "-", "_").Replace(target.TargetKey),
		hex.EncodeToString(nonce),
	)
	path := filepath.Join(directory, name)
	file, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0o444)
	if err != nil {
		return "", "", fmt.Errorf("create append-only receipt: %w", err)
	}
	removeOnError := true
	defer func() {
		if removeOnError {
			_ = os.Remove(path)
		}
	}()
	if _, err := file.Write(raw); err != nil {
		_ = file.Close()
		return "", "", fmt.Errorf("write run receipt: %w", err)
	}
	if err := file.Sync(); err != nil {
		_ = file.Close()
		return "", "", fmt.Errorf("sync run receipt: %w", err)
	}
	if err := file.Close(); err != nil {
		return "", "", fmt.Errorf("close run receipt: %w", err)
	}
	if err := os.Chmod(path, 0o444); err != nil {
		return "", "", fmt.Errorf("seal run receipt: %w", err)
	}
	removeOnError = false
	return "file://" + filepath.ToSlash(path), sha256Hex(raw), nil
}

func insidePath(root, candidate string) bool {
	relative, err := filepath.Rel(filepath.Clean(root), filepath.Clean(candidate))
	if err != nil {
		return false
	}
	return relative == "." || (relative != ".." && !strings.HasPrefix(relative, ".."+string(filepath.Separator)))
}
