package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"time"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

var evidenceDigestPattern = regexp.MustCompile(`^[0-9a-f]{64}$`)
var approvalReferencePattern = regexp.MustCompile(`^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,199}$`)

type upgradePlan struct {
	FromSchemaCommit        string                          `json:"from_schema_commit,omitempty"`
	ToSchemaCommit          string                          `json:"to_schema_commit,omitempty"`
	CredentialProfileSHA256 string                          `json:"credential_profile_sha256,omitempty"`
	FleetManifestSHA256     string                          `json:"fleet_manifest_sha256"`
	DataOracles             []oracleObservation             `json:"data_oracles"`
	CATrustSHA256           string                          `json:"ca_trust_sha256,omitempty"`
	FormatVersion           int                             `json:"format_version"`
	TargetKey               string                          `json:"target_key"`
	TargetManifestSHA256    string                          `json:"target_manifest_sha256"`
	Database                string                          `json:"database"`
	Endpoint                string                          `json:"endpoint"`
	FromRelease             string                          `json:"from_release"`
	FromManifestSHA256      string                          `json:"from_manifest_sha256"`
	ToRelease               string                          `json:"to_release"`
	ToManifestSHA256        string                          `json:"to_manifest_sha256"`
	FromTracker             string                          `json:"from_tracker_fingerprint"`
	ToTracker               string                          `json:"to_tracker_fingerprint"`
	FromCatalog             string                          `json:"from_catalog_fingerprint"`
	ToCatalog               string                          `json:"to_catalog_fingerprint"`
	Migrations              []migrationFile                 `json:"migrations"`
	RequiredBundles         []schemareleases.RequiredBundle `json:"required_bundles"`
	SQLSHA256               string                          `json:"sql_sha256"`
}

func (plan upgradePlan) digest() (string, error) {
	raw, err := json.Marshal(plan)
	if err != nil {
		return "", err
	}
	return sha256Hex(raw), nil
}

// Backup evidence is external to Git and bound to the reviewed target and plan.
// The operator's restore exercise reference is preserved, never fabricated by
// this runner. The local archive bytes and pg_restore listing are reverified.
type backupReceipt struct {
	FormatVersion      int    `json:"format_version"`
	TargetKey          string `json:"target_key"`
	Database           string `json:"database"`
	Endpoint           string `json:"endpoint"`
	FromRelease        string `json:"from_release"`
	PlanSHA256         string `json:"plan_sha256"`
	TrackerFingerprint string `json:"tracker_fingerprint"`
	CatalogFingerprint string `json:"catalog_fingerprint"`
	ArchivePath        string `json:"archive_path"`
	ArchiveSHA256      string `json:"archive_sha256"`
	ArchiveListSHA256  string `json:"archive_list_sha256"`
	CreatedAt          string `json:"created_at"`
	RestoreVerifiedAt  string `json:"restore_verified_at"`
	RestoreEvidenceRef string `json:"restore_evidence_ref"`
}

func (receipt backupReceipt) validate(plan upgradePlan, maxAgeHours int, now time.Time) error {
	digest, err := plan.digest()
	if err != nil {
		return err
	}
	if receipt.FormatVersion != 1 || receipt.TargetKey != plan.TargetKey || receipt.Database != plan.Database || receipt.Endpoint != plan.Endpoint || receipt.FromRelease != plan.FromRelease || receipt.PlanSHA256 != digest || receipt.TrackerFingerprint != plan.FromTracker || receipt.CatalogFingerprint != plan.FromCatalog {
		return errors.New("backup receipt does not match the exact reviewed upgrade")
	}
	if !evidenceDigestPattern.MatchString(receipt.ArchiveSHA256) || !evidenceDigestPattern.MatchString(receipt.ArchiveListSHA256) || !approvalReferencePattern.MatchString(receipt.RestoreEvidenceRef) {
		return errors.New("backup receipt requires archive/list digests and restore exercise evidence")
	}
	created, err := time.Parse(time.RFC3339, receipt.CreatedAt)
	if err != nil {
		return errors.New("invalid backup timestamp")
	}
	restored, err := time.Parse(time.RFC3339, receipt.RestoreVerifiedAt)
	if err != nil {
		return errors.New("invalid restore verification timestamp")
	}
	if maxAgeHours < 1 || maxAgeHours > 168 || created.After(now) || now.Sub(created) > time.Duration(maxAgeHours)*time.Hour || restored.Before(created) || restored.After(now) {
		return errors.New("backup/restore evidence is stale or has invalid ordering")
	}
	return nil
}

func externalRegularFile(root, path string) error {
	if !filepath.IsAbs(path) {
		return errors.New("evidence path must be absolute")
	}
	real, err := filepath.EvalSymlinks(path)
	if err != nil {
		return err
	}
	realRoot, err := filepath.EvalSymlinks(root)
	if err != nil {
		return err
	}
	if insidePath(realRoot, real) {
		return errors.New("backup evidence must remain outside Git")
	}
	info, err := os.Lstat(path)
	if err != nil {
		return err
	}
	if !info.Mode().IsRegular() {
		return errors.New("evidence must be a regular file")
	}
	return nil
}

func verifyBackup(ctx context.Context, root, path, digest string, plan upgradePlan, maxAgeHours int) error {
	if !evidenceDigestPattern.MatchString(digest) {
		return errors.New("backup receipt SHA-256 is required")
	}
	if err := externalRegularFile(root, path); err != nil {
		return err
	}
	raw, err := os.ReadFile(path)
	if err != nil {
		return err
	}
	if sha256Hex(raw) != digest {
		return errors.New("backup receipt checksum mismatch")
	}
	var receipt backupReceipt
	if err := decodeStrict(raw, &receipt); err != nil {
		return fmt.Errorf("decode backup receipt: %w", err)
	}
	if err := receipt.validate(plan, maxAgeHours, time.Now().UTC()); err != nil {
		return err
	}
	if err := externalRegularFile(root, receipt.ArchivePath); err != nil {
		return err
	}
	actual, err := fileSHA256(receipt.ArchivePath)
	if err != nil {
		return err
	}
	if actual != receipt.ArchiveSHA256 {
		return errors.New("backup archive checksum mismatch")
	}
	output, err := exec.CommandContext(ctx, "pg_restore", "--list", receipt.ArchivePath).Output()
	if err != nil {
		return errors.New("backup archive listing failed")
	}
	if sha256Hex(output) != receipt.ArchiveListSHA256 {
		return errors.New("backup archive listing checksum mismatch")
	}
	return nil
}

func requireUpgradeApproval(plan upgradePlan, approvedDigest, approvalRef string) error {
	digest, err := plan.digest()
	if err != nil {
		return err
	}
	if !evidenceDigestPattern.MatchString(approvedDigest) || digest != approvedDigest {
		return errors.New("apply requires the exact current plan SHA-256")
	}
	if !approvalReferencePattern.MatchString(approvalRef) {
		return errors.New("apply requires an operator approval reference")
	}
	return nil
}
