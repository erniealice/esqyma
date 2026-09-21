package main

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"net"
	"regexp"
	"strconv"
	"strings"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

// Upgrade authority belongs to a reviewed target, separate from app defaults.
// Endpoint is a non-secret host:port assertion, not a free-form credential URL.
type upgradeTarget struct {
	ConnectionMode             string `json:"connection_mode"`
	FromRelease                string `json:"from_release"`
	Endpoint                   string `json:"endpoint"`
	ConnectionUser             string `json:"connection_user,omitempty"`
	MigrationRole              string `json:"migration_role"`
	RuntimeRole                string `json:"runtime_role"`
	BackupMaxAgeHours          int    `json:"backup_max_age_hours"`
	CatalogMode                string `json:"catalog_mode,omitempty"`
	FromBaseCatalogFingerprint string `json:"from_base_catalog_fingerprint,omitempty"`
	ToBaseCatalogFingerprint   string `json:"to_base_catalog_fingerprint,omitempty"`
	OverlayID                  string `json:"overlay_id,omitempty"`
	FromOverlayFingerprint     string `json:"from_overlay_fingerprint,omitempty"`
	ToOverlayFingerprint       string `json:"to_overlay_fingerprint,omitempty"`
}

type legacyAdoptionTarget struct {
	Mode                     string                      `json:"mode"`
	PreTrackerRevisionCount  int                         `json:"pre_tracker_revision_count"`
	PreTrackerFingerprint    string                      `json:"pre_tracker_fingerprint"`
	PreHead                  string                      `json:"pre_head"`
	PostTrackerRevisionCount int                         `json:"post_tracker_revision_count"`
	PostHead                 string                      `json:"post_head"`
	PostTrackerFingerprint   string                      `json:"post_tracker_fingerprint"`
	BaseCatalogFingerprint   string                      `json:"base_catalog_fingerprint"`
	OverlayID                string                      `json:"overlay_id"`
	OverlayFingerprint       string                      `json:"overlay_fingerprint"`
	Backup                   *legacyAdoptionBackupProof  `json:"backup,omitempty"`
	EffectOracles            []schemareleases.DataOracle `json:"effect_oracles"`
	Revisions                []adoptedRevision           `json:"revisions"`
}

// Backup proof is immutable, non-secret metadata about the archive used for
// restored-clone qualification. The apply-time receipt remains external and
// binds the exact backup to the final plan and approval.
type legacyAdoptionBackupProof struct {
	ArchiveArtifact        string `json:"archive_artifact"`
	ArchiveSHA256          string `json:"archive_sha256"`
	ArchiveListSHA256      string `json:"archive_list_sha256"`
	SourcePostgresVersion  string `json:"source_postgres_version"`
	RestorePostgresVersion string `json:"restore_postgres_version"`
	RestoreEvidenceRef     string `json:"restore_evidence_ref"`
}

type adoptedRevision struct {
	Version         string `json:"version"`
	Description     string `json:"description"`
	AtlasHash       string `json:"atlas_hash"`
	PartialHashes   string `json:"partial_hashes"`
	Type            int64  `json:"type"`
	Applied         int64  `json:"applied"`
	Total           int64  `json:"total"`
	MigrationSHA256 string `json:"migration_sha256"`
}

var adoptionHeadPattern = regexp.MustCompile(`^[0-9]{14}$`)

func (adoption legacyAdoptionTarget) validate(release string) error {
	if adoption.Mode != "legacy_adoption" {
		return errors.New("target adoption mode must be legacy_adoption")
	}
	if adoption.PreTrackerRevisionCount < 1 || len(adoption.Revisions) == 0 || adoption.PostTrackerRevisionCount != adoption.PreTrackerRevisionCount+len(adoption.Revisions) {
		return errors.New("target adoption tracker counts do not describe the selected revisions")
	}
	for name, value := range map[string]string{
		"pre tracker":  adoption.PreTrackerFingerprint,
		"post tracker": adoption.PostTrackerFingerprint,
		"base catalog": adoption.BaseCatalogFingerprint,
		"overlay":      adoption.OverlayFingerprint,
	} {
		if !evidenceDigestPattern.MatchString(value) {
			return fmt.Errorf("target adoption %s fingerprint is invalid", name)
		}
	}
	if !adoptionHeadPattern.MatchString(adoption.PreHead) || !adoptionHeadPattern.MatchString(adoption.PostHead) || adoption.OverlayID == "" || release == "" {
		return errors.New("target adoption requires a release, pre/post heads, and overlay identity")
	}
	seenVersions := map[string]bool{}
	last := adoption.PreHead
	for _, revision := range adoption.Revisions {
		if !adoptionHeadPattern.MatchString(revision.Version) || revision.Version <= last || seenVersions[revision.Version] {
			return errors.New("target adoption revisions must be unique and strictly increasing")
		}
		if revision.Type != 2 || revision.Applied < 0 || revision.Total < 1 || revision.Applied != revision.Total ||
			revision.PartialHashes == "" || !json.Valid([]byte(revision.PartialHashes)) ||
			!evidenceDigestPattern.MatchString(revision.MigrationSHA256) || revision.Description == "" {
			return fmt.Errorf("target adoption revision %s is invalid", revision.Version)
		}
		decodedHash, err := base64.StdEncoding.DecodeString(revision.AtlasHash)
		if err != nil || len(decodedHash) != 32 {
			return fmt.Errorf("target adoption revision %s has invalid Atlas hash", revision.Version)
		}
		seenVersions[revision.Version] = true
		last = revision.Version
	}
	if last != adoption.PostHead {
		return errors.New("target adoption post head must be the last adopted revision")
	}
	if len(adoption.EffectOracles) == 0 {
		return errors.New("target adoption requires effect oracles")
	}
	if adoption.Backup != nil {
		if adoption.Backup.ArchiveArtifact == "" || !evidenceDigestPattern.MatchString(adoption.Backup.ArchiveSHA256) || !evidenceDigestPattern.MatchString(adoption.Backup.ArchiveListSHA256) || adoption.Backup.SourcePostgresVersion == "" || adoption.Backup.RestorePostgresVersion == "" || !approvalReferencePattern.MatchString(adoption.Backup.RestoreEvidenceRef) {
			return errors.New("target adoption backup proof is incomplete")
		}
	}
	seenOracles := map[string]bool{}
	for _, oracle := range adoption.EffectOracles {
		if err := oracle.Validate(); err != nil {
			return fmt.Errorf("target adoption effect oracle: %w", err)
		}
		if seenOracles[oracle.ID] {
			return fmt.Errorf("duplicate target adoption effect oracle %s", oracle.ID)
		}
		seenOracles[oracle.ID] = true
	}
	return nil
}

func (target targetManifest) validateUpgrade(from string, config databaseConfig) error {
	u := target.Upgrade
	if u == nil || u.FromRelease != from || from == target.SchemaRelease {
		return errors.New("upgrade requires a target-bound predecessor release")
	}
	if u.ConnectionMode != "direct" && u.ConnectionMode != "session" {
		return errors.New("upgrade requires a reviewed direct or session-pooling connection; transaction pooling is unsupported")
	}
	if target.AllowCreate || target.ExpectedEmpty {
		return errors.New("upgrade target cannot allow creation or expect an empty database")
	}
	if u.BackupMaxAgeHours < 1 || u.BackupMaxAgeHours > 168 {
		return errors.New("upgrade backup age must be 1..168 hours")
	}
	if err := u.validateCatalogProof(); err != nil {
		return err
	}
	connectionUser := u.ConnectionUser
	if connectionUser == "" {
		connectionUser = u.MigrationRole
	}
	if u.MigrationRole == "" || u.RuntimeRole == "" || u.MigrationRole == u.RuntimeRole || config.User != connectionUser {
		return errors.New("upgrade requires distinct target-bound migration and runtime roles")
	}
	host, port, err := net.SplitHostPort(u.Endpoint)
	if err != nil || host == "" || strings.ContainsAny(host, "/@?#\n\r\t") {
		return errors.New("upgrade endpoint must be a host:port assertion")
	}
	n, err := strconv.Atoi(port)
	if err != nil || n < 1 || n > 65535 || !strings.EqualFold(strings.Trim(config.Host, "[]"), host) || config.Port != port {
		return errors.New("configured database endpoint differs from reviewed target")
	}
	if strings.HasSuffix(strings.ToLower(host), ".pooler.supabase.com") && port == "6543" {
		return errors.New("Supabase transaction-pooling endpoint cannot run migrations")
	}
	if target.Scope == "remote" {
		if config.SSLMode != "verify-full" || config.SSLRootCert == "" {
			return errors.New("remote upgrade requires verify-full TLS with explicit CA trust")
		}
	} else if !config.loopback() {
		return errors.New("local/disposable upgrade must use loopback")
	}
	return nil
}

func (u upgradeTarget) validateCatalogProof() error {
	if u.CatalogMode == "" || u.CatalogMode == "fresh" {
		if u.FromBaseCatalogFingerprint != "" || u.ToBaseCatalogFingerprint != "" || u.OverlayID != "" || u.FromOverlayFingerprint != "" || u.ToOverlayFingerprint != "" {
			return errors.New("fresh catalog mode cannot declare target overlay fingerprints")
		}
		return nil
	}
	if u.CatalogMode != "base_overlay" {
		return errors.New("unsupported target catalog mode")
	}
	for name, value := range map[string]string{
		"from base catalog": u.FromBaseCatalogFingerprint,
		"to base catalog":   u.ToBaseCatalogFingerprint,
		"from overlay":      u.FromOverlayFingerprint,
		"to overlay":        u.ToOverlayFingerprint,
	} {
		if !evidenceDigestPattern.MatchString(value) {
			return fmt.Errorf("target %s fingerprint is invalid", name)
		}
	}
	if u.OverlayID == "" {
		return errors.New("target overlay identity is required for base_overlay catalog mode")
	}
	return nil
}

func (u upgradeTarget) catalogProof(phase string) (baseCatalog, overlay string, ok bool) {
	if u.CatalogMode != "base_overlay" {
		return "", "", false
	}
	if phase == "from" {
		return u.FromBaseCatalogFingerprint, u.FromOverlayFingerprint, true
	}
	if phase == "to" {
		return u.ToBaseCatalogFingerprint, u.ToOverlayFingerprint, true
	}
	return "", "", false
}

func (target targetManifest) validateLegacyAdoption(release string, config databaseConfig) error {
	if target.Adoption == nil {
		return errors.New("legacy adoption requires a target adoption contract")
	}
	if target.Scope != "remote" && target.Scope != "disposable" {
		return errors.New("legacy adoption is allowed only for remote or disposable targets")
	}
	if target.AllowCreate || target.ExpectedEmpty {
		return errors.New("legacy adoption target cannot allow creation or expect an empty database")
	}
	if err := target.Adoption.validate(release); err != nil {
		return err
	}
	if target.Upgrade == nil || target.Upgrade.ConnectionMode != "direct" && target.Upgrade.ConnectionMode != "session" {
		return errors.New("legacy adoption requires a reviewed direct or session connection")
	}
	if target.Upgrade.MigrationRole == "" || target.Upgrade.RuntimeRole == "" || target.Upgrade.MigrationRole == target.Upgrade.RuntimeRole {
		return errors.New("legacy adoption requires distinct migration and runtime roles")
	}
	if target.Upgrade.BackupMaxAgeHours < 1 || target.Upgrade.BackupMaxAgeHours > 168 {
		return errors.New("legacy adoption backup age must be 1..168 hours")
	}
	connectionUser := target.Upgrade.ConnectionUser
	if connectionUser == "" {
		connectionUser = target.Upgrade.MigrationRole
	}
	if config.User != connectionUser || target.Upgrade.Endpoint == "" {
		return errors.New("legacy adoption connection identity differs from target")
	}
	if err := validateTargetEndpoint(target, config); err != nil {
		return err
	}
	if target.Scope == "remote" && (config.SSLMode != "verify-full" || config.SSLRootCert == "") {
		return errors.New("remote legacy adoption requires verify-full TLS with explicit CA trust")
	}
	if target.Scope != "remote" && !config.loopback() {
		return errors.New("disposable legacy adoption must use loopback")
	}
	if target.Scope == "remote" && target.Adoption.Backup == nil {
		return errors.New("remote legacy adoption requires immutable backup/restore proof")
	}
	return nil
}

func validateTargetEndpoint(target targetManifest, config databaseConfig) error {
	host, port, err := net.SplitHostPort(target.Upgrade.Endpoint)
	if err != nil || host == "" || strings.ContainsAny(host, "/@?#\n\r\t") || !strings.EqualFold(strings.Trim(config.Host, "[]"), host) || config.Port != port {
		return errors.New("configured database endpoint differs from reviewed target")
	}
	if strings.HasSuffix(strings.ToLower(host), ".pooler.supabase.com") && port == "6543" {
		return errors.New("Supabase transaction-pooling endpoint cannot run legacy adoption")
	}
	return nil
}
