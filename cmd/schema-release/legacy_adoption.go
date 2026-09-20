package main

import (
	"context"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

const legacyAdoptionOperatorVersion = "ichizen-legacy-adoption/v1"

type legacyAdoptionOptions struct {
	Apply         bool
	Verify        bool
	ApprovedPlan  string
	ApprovalRef   string
	BackupReceipt string
	BackupSHA256  string
}

// A legacy adoption plan binds the exact existing effects to the exact
// immutable release files whose history is being recorded. It deliberately
// says that migration SQL was not executed: this operation is metadata-only.
type legacyAdoptionPlan struct {
	FormatVersion            int                 `json:"format_version"`
	Operation                string              `json:"operation"`
	CredentialProfileSHA256  string              `json:"credential_profile_sha256,omitempty"`
	FleetManifestSHA256      string              `json:"fleet_manifest_sha256"`
	TargetKey                string              `json:"target_key"`
	TargetManifestSHA256     string              `json:"target_manifest_sha256"`
	Database                 string              `json:"database"`
	Endpoint                 string              `json:"endpoint"`
	SchemaRelease            string              `json:"schema_release"`
	ReleaseManifestSHA256    string              `json:"release_manifest_sha256"`
	MigrationSQLExecuted     bool                `json:"migration_sql_executed"`
	PreTrackerRevisionCount  int                 `json:"pre_tracker_revision_count"`
	PreHead                  string              `json:"pre_head"`
	PreTrackerFingerprint    string              `json:"pre_tracker_fingerprint"`
	PostTrackerRevisionCount int                 `json:"post_tracker_revision_count"`
	PostHead                 string              `json:"post_head"`
	PostTrackerFingerprint   string              `json:"post_tracker_fingerprint"`
	BaseCatalogFingerprint   string              `json:"base_catalog_fingerprint"`
	OverlayID                string              `json:"overlay_id"`
	OverlayFingerprint       string              `json:"overlay_fingerprint"`
	Revisions                []adoptedRevision   `json:"revisions"`
	EffectOracles            []oracleObservation `json:"effect_oracles"`
}

func (plan legacyAdoptionPlan) digest() (string, error) {
	raw, err := json.Marshal(plan)
	if err != nil {
		return "", err
	}
	return sha256Hex(raw), nil
}

type legacyAdoptionState struct {
	TrackerRevisionCount   int
	Head                   string
	TrackerFingerprint     string
	BaseCatalogFingerprint string
	OverlayFingerprint     string
}

type legacyAdoptionOutput struct {
	Operation                string              `json:"operation"`
	TargetKey                string              `json:"target_key"`
	Database                 string              `json:"database"`
	Scope                    string              `json:"scope"`
	SchemaRelease            string              `json:"schema_release"`
	ObservedState            string              `json:"observed_state"`
	MigrationSQLExecuted     bool                `json:"migration_sql_executed"`
	DryRun                   string              `json:"dry_run,omitempty"`
	Plan                     *legacyAdoptionPlan `json:"plan,omitempty"`
	PlanSHA256               string              `json:"plan_sha256,omitempty"`
	BackupReceiptSHA256      string              `json:"backup_receipt_sha256,omitempty"`
	ApprovalRef              string              `json:"approval_ref,omitempty"`
	IntentSHA256             string              `json:"intent_sha256,omitempty"`
	BeforeTrackerFingerprint string              `json:"before_tracker_fingerprint,omitempty"`
	AfterTrackerFingerprint  string              `json:"after_tracker_fingerprint,omitempty"`
	BaseCatalogFingerprint   string              `json:"base_catalog_fingerprint,omitempty"`
	OverlayID                string              `json:"overlay_id,omitempty"`
	OverlayFingerprint       string              `json:"overlay_fingerprint,omitempty"`
	AdoptedRevisions         []adoptedRevision   `json:"adopted_revisions,omitempty"`
	EffectOracles            []oracleObservation `json:"effect_oracles,omitempty"`
	Actions                  []string            `json:"actions,omitempty"`
	ReceiptURI               string              `json:"receipt_uri,omitempty"`
	ReceiptDigest            string              `json:"receipt_digest,omitempty"`
}

func runLegacyAdoption(ctx context.Context, root, targetKey, release string, options legacyAdoptionOptions) error {
	if options.Apply && options.Verify {
		return errors.New("legacy adoption apply and verify are mutually exclusive")
	}
	if !options.Apply && (options.ApprovedPlan != "" || options.ApprovalRef != "" || options.BackupReceipt != "" || options.BackupSHA256 != "") {
		return errors.New("legacy adoption evidence requires --apply")
	}
	target, targetPath, err := loadTarget(root, targetKey)
	if err != nil {
		return err
	}
	if err := bindFleetTarget(root, &target, targetPath, options.Apply || (options.Verify && target.Scope == "remote")); err != nil {
		return err
	}
	if target.SchemaRelease != release {
		return errors.New("target and requested legacy adoption release differ")
	}
	if target.Adoption == nil {
		return errors.New("target has no legacy adoption contract")
	}
	manifest, manifestRaw, err := schemareleases.Load(release)
	if err != nil {
		return err
	}
	if !schemareleases.ProfileAllowed(manifest, target.SeedProfile) {
		return fmt.Errorf("release %s does not allow seed profile %s", release, target.SeedProfile)
	}
	if _, err := schemareleases.BootstrapBytes(manifest); err != nil {
		return err
	}
	snapshot, err := createMigrationSnapshot(ctx, root, manifest)
	if err != nil {
		return err
	}
	defer snapshot.Close()
	if err := validateLegacyAdoptionSources(manifest, *target.Adoption, snapshot); err != nil {
		return err
	}
	values, err := loadEnvironment(filepath.Join(root, target.Database.EnvFile))
	if err != nil {
		return fmt.Errorf("load target environment: %w", err)
	}
	operation := "migration"
	if options.Verify {
		operation = "runtime"
	}
	config, err := configForTarget(root, values, target, operation)
	if err != nil {
		return err
	}
	config.ReadOnly = !options.Apply
	if err := target.validateLegacyAdoption(release, config); err != nil {
		return err
	}
	targetDigest, err := targetSnapshotDigest(target, targetPath)
	if err != nil {
		return err
	}
	required, err := adoptionRequiredBundles(root, target, manifest)
	if err != nil {
		return err
	}
	db, err := openDatabase(config, config.Name)
	if err != nil {
		return errors.New("connect reviewed legacy adoption target failed")
	}
	defer db.Close()
	if options.Verify {
		if err := verifyRuntimeIdentity(ctx, db, target, config); err != nil {
			return err
		}
	} else if err := verifyUpgradeIdentity(ctx, db, target, config); err != nil {
		return err
	}
	state, err := readLegacyAdoptionState(ctx, db)
	if err != nil {
		return err
	}
	stateKind := legacyAdoptionStateKind(state, *target.Adoption)
	if options.Verify {
		if stateKind != "post" {
			return fmt.Errorf("legacy adoption verification requires the exact post-state; observed %s", stateKind)
		}
		verification, observations, err := verifyLegacyAdoptionPost(ctx, db, target, manifest, required)
		if err != nil {
			return err
		}
		return writeLegacyAdoptionOutput(legacyAdoptionOutput{
			Operation: "legacy_adoption", TargetKey: target.TargetKey, Database: config.Name,
			Scope: target.Scope, SchemaRelease: manifest.Release, ObservedState: "adopted",
			MigrationSQLExecuted: false, BeforeTrackerFingerprint: target.Adoption.PreTrackerFingerprint,
			AfterTrackerFingerprint: verification.TrackerFingerprint, BaseCatalogFingerprint: verification.BaseCatalogFingerprint,
			OverlayID: target.Adoption.OverlayID, OverlayFingerprint: verification.OverlayFingerprint,
			AdoptedRevisions: append([]adoptedRevision(nil), target.Adoption.Revisions...), EffectOracles: observations,
			Actions: []string{"verified exact adopted Atlas history", "verified base catalog and security overlay", "verified legacy effect oracles"},
		})
	}

	if options.Apply {
		return applyLegacyAdoption(ctx, root, values, target, targetPath, manifest, manifestRaw, required, config, db, state, stateKind, options, targetDigest)
	}
	if stateKind != "pre" {
		return fmt.Errorf("legacy adoption plan requires the exact pre-state; observed %s", stateKind)
	}
	observations, err := observeDataOracles(ctx, db, target.Adoption.EffectOracles, target.Workspace.ID)
	if err != nil {
		return err
	}
	plan := makeLegacyAdoptionPlan(target, targetDigest, manifest, manifestRaw, config, observations)
	digest, err := plan.digest()
	if err != nil {
		return err
	}
	return writeLegacyAdoptionOutput(legacyAdoptionOutput{
		Operation: "legacy_adoption", TargetKey: target.TargetKey, Database: config.Name, Scope: target.Scope,
		SchemaRelease: manifest.Release, ObservedState: "pre_adoption", MigrationSQLExecuted: false,
		DryRun: "passed", Plan: &plan, PlanSHA256: digest, BaseCatalogFingerprint: plan.BaseCatalogFingerprint,
		OverlayID: plan.OverlayID, OverlayFingerprint: plan.OverlayFingerprint, EffectOracles: observations,
		Actions: []string{"verified immutable migration bytes and Atlas hashes", "verified existing effects without executing migration SQL", "verified target pre-state"},
	})
}

func adoptionRequiredBundles(root string, target targetManifest, manifest schemareleases.Manifest) ([]schemareleases.RequiredBundle, error) {
	result := make([]schemareleases.RequiredBundle, 0, len(target.Bundles))
	for _, path := range target.Bundles {
		bundle, err := loadBundle(root, path)
		if err != nil {
			return nil, err
		}
		if err := bundle.validateForRelease(target, manifest); err != nil {
			return nil, err
		}
		result = append(result, schemareleases.RequiredBundle{
			TargetKey: target.TargetKey, ID: bundle.Metadata.ID, Version: bundle.Metadata.Version,
			Digest: bundle.Digest, SchemaRelease: bundle.Metadata.SchemaRelease,
		})
	}
	return result, nil
}

func validateLegacyAdoptionSources(manifest schemareleases.Manifest, adoption legacyAdoptionTarget, snapshot *migrationSnapshot) error {
	if adoption.PostHead != manifest.Atlas.Head {
		return errors.New("legacy adoption post head differs from the release head")
	}
	if !manifest.AcceptsTrackerState(adoption.PostTrackerRevisionCount, adoption.PostTrackerFingerprint) {
		return errors.New("legacy adoption post tracker is not an accepted release installation")
	}
	filesByVersion := map[string]migrationFile{}
	for _, file := range snapshot.Files {
		version := file.Name[:14]
		if _, exists := filesByVersion[version]; !exists {
			filesByVersion[version] = file
		}
	}
	atlasSums, err := readAtlasSums(filepath.Join(snapshot.Directory, "atlas.sum"))
	if err != nil {
		return err
	}
	for _, revision := range adoption.Revisions {
		file, ok := filesByVersion[revision.Version]
		if !ok || file.Name != revision.Version+"_"+revision.Description+".sql" {
			return fmt.Errorf("legacy adoption revision %s does not bind to the immutable migration prefix", revision.Version)
		}
		if file.SHA256 != revision.MigrationSHA256 {
			return fmt.Errorf("legacy adoption revision %s migration checksum mismatch", revision.Version)
		}
		if atlasSums[file.Name] != revision.AtlasHash {
			return fmt.Errorf("legacy adoption revision %s Atlas checksum mismatch", revision.Version)
		}
	}
	return nil
}

func readAtlasSums(path string) (map[string]string, error) {
	raw, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	result := map[string]string{}
	for _, line := range strings.Split(strings.TrimSpace(string(raw)), "\n") {
		fields := strings.Fields(line)
		if len(fields) == 1 || len(fields) != 2 {
			continue
		}
		if !strings.HasPrefix(fields[1], "h1:") {
			return nil, fmt.Errorf("invalid Atlas checksum line for %s", fields[0])
		}
		encoded := strings.TrimPrefix(fields[1], "h1:")
		if _, err := base64.StdEncoding.DecodeString(encoded); err != nil {
			return nil, fmt.Errorf("invalid Atlas checksum for %s", fields[0])
		}
		// atlas.sum uses the Go checksum-db h1: prefix; Atlas stores the
		// underlying base64 digest in atlas_schema_revisions.hash.
		result[fields[0]] = encoded
	}
	return result, nil
}

func readLegacyAdoptionState(ctx context.Context, db *sql.DB) (legacyAdoptionState, error) {
	var state legacyAdoptionState
	if err := db.QueryRowContext(ctx, `SELECT count(*), COALESCE(max(version), '') FROM atlas_schema_revisions.atlas_schema_revisions`).Scan(&state.TrackerRevisionCount, &state.Head); err != nil {
		return state, fmt.Errorf("read legacy adoption Atlas state: %w", err)
	}
	var err error
	if state.TrackerFingerprint, err = schemareleases.AtlasTrackerFingerprint(ctx, db); err != nil {
		return state, err
	}
	if state.BaseCatalogFingerprint, err = schemareleases.BaseCatalogFingerprint(ctx, db); err != nil {
		return state, err
	}
	if state.OverlayFingerprint, err = schemareleases.OverlayFingerprint(ctx, db); err != nil {
		return state, err
	}
	return state, nil
}

func legacyAdoptionStateKind(state legacyAdoptionState, adoption legacyAdoptionTarget) string {
	if state.TrackerRevisionCount == adoption.PreTrackerRevisionCount && state.Head == adoption.PreHead && state.TrackerFingerprint == adoption.PreTrackerFingerprint && state.BaseCatalogFingerprint == adoption.BaseCatalogFingerprint && state.OverlayFingerprint == adoption.OverlayFingerprint {
		return "pre"
	}
	if state.TrackerRevisionCount == adoption.PostTrackerRevisionCount && state.Head == adoption.PostHead && state.TrackerFingerprint == adoption.PostTrackerFingerprint && state.BaseCatalogFingerprint == adoption.BaseCatalogFingerprint && state.OverlayFingerprint == adoption.OverlayFingerprint {
		return "post"
	}
	return "unknown"
}

func makeLegacyAdoptionPlan(target targetManifest, targetDigest string, manifest schemareleases.Manifest, manifestRaw []byte, config databaseConfig, observations []oracleObservation) legacyAdoptionPlan {
	a := target.Adoption
	return legacyAdoptionPlan{
		FormatVersion: 1, Operation: "legacy_adoption", CredentialProfileSHA256: config.CredentialProfileSHA256,
		FleetManifestSHA256: target.fleetDigest, TargetKey: target.TargetKey, TargetManifestSHA256: targetDigest,
		Database: config.Name, Endpoint: target.Upgrade.Endpoint, SchemaRelease: manifest.Release,
		ReleaseManifestSHA256: sha256Hex(manifestRaw), MigrationSQLExecuted: false,
		PreTrackerRevisionCount: a.PreTrackerRevisionCount, PreHead: a.PreHead, PreTrackerFingerprint: a.PreTrackerFingerprint,
		PostTrackerRevisionCount: a.PostTrackerRevisionCount, PostHead: manifest.Atlas.Head, PostTrackerFingerprint: a.PostTrackerFingerprint,
		BaseCatalogFingerprint: a.BaseCatalogFingerprint, OverlayID: a.OverlayID, OverlayFingerprint: a.OverlayFingerprint,
		Revisions: append([]adoptedRevision(nil), a.Revisions...), EffectOracles: append([]oracleObservation(nil), observations...),
	}
}

func verifyLegacyAdoptionPost(ctx context.Context, db *sql.DB, target targetManifest, manifest schemareleases.Manifest, required []schemareleases.RequiredBundle) (schemareleases.Verification, []oracleObservation, error) {
	state, err := readLegacyAdoptionState(ctx, db)
	if err != nil {
		return schemareleases.Verification{}, nil, err
	}
	if legacyAdoptionStateKind(state, *target.Adoption) != "post" {
		return schemareleases.Verification{}, nil, errors.New("legacy adoption post-state changed during verification")
	}
	verification, err := schemareleases.VerifyDatabaseWithCatalogProof(ctx, db, manifest, required, target.Adoption.BaseCatalogFingerprint, target.Adoption.OverlayFingerprint)
	if err != nil {
		return schemareleases.Verification{}, nil, err
	}
	observations, err := observeDataOracles(ctx, db, target.Adoption.EffectOracles, target.Workspace.ID)
	if err != nil {
		return schemareleases.Verification{}, nil, err
	}
	return verification, observations, nil
}

func applyLegacyAdoption(ctx context.Context, root string, values map[string]string, target targetManifest, targetPath string, manifest schemareleases.Manifest, manifestRaw []byte, required []schemareleases.RequiredBundle, config databaseConfig, db *sql.DB, state legacyAdoptionState, stateKind string, options legacyAdoptionOptions, targetDigest string) error {
	lock, err := acquireUpgradeLock(ctx, db)
	if err != nil {
		return err
	}
	defer releaseInitializationLock(lock, target.Database.Name)
	state, err = readLegacyAdoptionState(ctx, db)
	if err != nil {
		return err
	}
	stateKind = legacyAdoptionStateKind(state, *target.Adoption)
	var plan legacyAdoptionPlan
	var planDigest string
	var intentDigest string
	if stateKind == "post" {
		intent, err := readLegacyAdoptionIntent(root, values, options.ApprovedPlan)
		if err != nil {
			return err
		}
		plan, planDigest, intentDigest = intent.Plan, intent.PlanSHA256, intent.Digest
		if err := validateLegacyAdoptionPlan(plan, target, targetDigest, manifest, manifestRaw); err != nil {
			return err
		}
		if err := requireLegacyAdoptionApproval(plan, options.ApprovedPlan, options.ApprovalRef); err != nil {
			return err
		}
		if err := verifyLegacyBackup(ctx, root, options.BackupReceipt, options.BackupSHA256, plan, target.Adoption, target.Upgrade.BackupMaxAgeHours); err != nil {
			return err
		}
		if _, _, err := verifyLegacyAdoptionPost(ctx, db, target, manifest, required); err != nil {
			return err
		}
		return finishLegacyAdoption(ctx, root, values, target, targetPath, manifest, manifestRaw, plan, planDigest, intentDigest, options, db, required, "reconciled completed metadata adoption without migration SQL")
	}
	if stateKind != "pre" {
		return errors.New("legacy adoption target is neither its exact pre-state nor post-state; preserve evidence and stop")
	}
	observations, err := observeDataOracles(ctx, db, target.Adoption.EffectOracles, target.Workspace.ID)
	if err != nil {
		return err
	}
	plan = makeLegacyAdoptionPlan(target, targetDigest, manifest, manifestRaw, config, observations)
	planDigest, err = plan.digest()
	if err != nil {
		return err
	}
	if err := requireLegacyAdoptionApproval(plan, options.ApprovedPlan, options.ApprovalRef); err != nil {
		return err
	}
	if err := verifyLegacyBackup(ctx, root, options.BackupReceipt, options.BackupSHA256, plan, target.Adoption, target.Upgrade.BackupMaxAgeHours); err != nil {
		return err
	}
	intentDigest, err = ensureLegacyAdoptionIntent(root, values, target, plan, options)
	if err != nil {
		return err
	}
	immediate, err := observeDataOracles(ctx, db, target.Adoption.EffectOracles, target.Workspace.ID)
	if err != nil {
		return err
	}
	if err := verifyDataObservations(target.Adoption.EffectOracles, plan.EffectOracles, immediate); err != nil {
		return err
	}
	if err := adoptLegacyTracker(ctx, lock, target.Adoption.Revisions); err != nil {
		return err
	}
	return finishLegacyAdoption(ctx, root, values, target, targetPath, manifest, manifestRaw, plan, planDigest, intentDigest, options, db, required, "adopted reviewed Atlas history without executing migration SQL")
}

func validateLegacyAdoptionPlan(plan legacyAdoptionPlan, target targetManifest, targetDigest string, manifest schemareleases.Manifest, manifestRaw []byte) error {
	digest, err := plan.digest()
	if err != nil || plan.Operation != "legacy_adoption" || plan.MigrationSQLExecuted || plan.TargetKey != target.TargetKey || plan.TargetManifestSHA256 != targetDigest || plan.SchemaRelease != manifest.Release || plan.ReleaseManifestSHA256 != sha256Hex(manifestRaw) || plan.PreTrackerRevisionCount != target.Adoption.PreTrackerRevisionCount || plan.PreHead != target.Adoption.PreHead || plan.PreTrackerFingerprint != target.Adoption.PreTrackerFingerprint || plan.PostTrackerRevisionCount != target.Adoption.PostTrackerRevisionCount || plan.PostHead != target.Adoption.PostHead || plan.PostTrackerFingerprint != target.Adoption.PostTrackerFingerprint || plan.BaseCatalogFingerprint != target.Adoption.BaseCatalogFingerprint || plan.OverlayID != target.Adoption.OverlayID || plan.OverlayFingerprint != target.Adoption.OverlayFingerprint || !sameAdoptedRevisions(plan.Revisions, target.Adoption.Revisions) || digest == "" {
		return errors.New("durable legacy adoption plan does not match the selected target and release")
	}
	return nil
}

func sameAdoptedRevisions(left, right []adoptedRevision) bool {
	if len(left) != len(right) {
		return false
	}
	for i := range left {
		if left[i] != right[i] {
			return false
		}
	}
	return true
}

func adoptLegacyTracker(ctx context.Context, conn *sql.Conn, revisions []adoptedRevision) error {
	tx, err := conn.BeginTx(ctx, nil)
	if err != nil {
		return errors.New("start legacy adoption metadata transaction failed")
	}
	defer tx.Rollback()
	for _, revision := range revisions {
		if _, err := tx.ExecContext(ctx, `INSERT INTO atlas_schema_revisions.atlas_schema_revisions
	  (version, description, type, applied, total, executed_at, execution_time, error, error_stmt, hash, partial_hashes, operator_version)
  VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, 0, NULL, NULL, $6, NULLIF($7, '')::jsonb, $8)`,
			revision.Version, revision.Description, revision.Type, revision.Applied, revision.Total, revision.AtlasHash, revision.PartialHashes, legacyAdoptionOperatorVersion); err != nil {
			return fmt.Errorf("adopt Atlas revision %s: %w", revision.Version, err)
		}
	}
	if err := tx.Commit(); err != nil {
		return errors.New("commit legacy adoption metadata transaction failed")
	}
	return nil
}

type legacyAdoptionBackupReceipt struct {
	FormatVersion          int    `json:"format_version"`
	Operation              string `json:"operation"`
	TargetKey              string `json:"target_key"`
	Database               string `json:"database"`
	Endpoint               string `json:"endpoint"`
	PlanSHA256             string `json:"plan_sha256"`
	PreTrackerFingerprint  string `json:"pre_tracker_fingerprint"`
	BaseCatalogFingerprint string `json:"base_catalog_fingerprint"`
	OverlayID              string `json:"overlay_id"`
	OverlayFingerprint     string `json:"overlay_fingerprint"`
	ArchivePath            string `json:"archive_path"`
	ArchiveSHA256          string `json:"archive_sha256"`
	ArchiveListSHA256      string `json:"archive_list_sha256"`
	CreatedAt              string `json:"created_at"`
	RestoreVerifiedAt      string `json:"restore_verified_at"`
	RestoreEvidenceRef     string `json:"restore_evidence_ref"`
}

func (receipt legacyAdoptionBackupReceipt) validate(plan legacyAdoptionPlan, adoption *legacyAdoptionTarget, maxAgeHours int, now time.Time) error {
	digest, err := plan.digest()
	if err != nil || receipt.FormatVersion != 1 || receipt.Operation != "legacy_adoption" || receipt.TargetKey != plan.TargetKey || receipt.Database != plan.Database || receipt.Endpoint != plan.Endpoint || receipt.PlanSHA256 != digest || receipt.PreTrackerFingerprint != plan.PreTrackerFingerprint || receipt.BaseCatalogFingerprint != plan.BaseCatalogFingerprint || receipt.OverlayID != adoption.OverlayID || receipt.OverlayFingerprint != plan.OverlayFingerprint {
		return errors.New("legacy adoption backup receipt does not match the exact reviewed plan")
	}
	if !evidenceDigestPattern.MatchString(receipt.ArchiveSHA256) || !evidenceDigestPattern.MatchString(receipt.ArchiveListSHA256) || !approvalReferencePattern.MatchString(receipt.RestoreEvidenceRef) {
		return errors.New("legacy adoption backup receipt requires archive/list digests and restore evidence")
	}
	created, err := time.Parse(time.RFC3339, receipt.CreatedAt)
	if err != nil {
		return errors.New("invalid legacy adoption backup timestamp")
	}
	restored, err := time.Parse(time.RFC3339, receipt.RestoreVerifiedAt)
	if err != nil {
		return errors.New("invalid legacy adoption restore timestamp")
	}
	if maxAgeHours < 1 || maxAgeHours > 168 || created.After(now) || now.Sub(created) > time.Duration(maxAgeHours)*time.Hour || restored.Before(created) || restored.After(now) {
		return errors.New("legacy adoption backup/restore evidence is stale or has invalid ordering")
	}
	return nil
}

func verifyLegacyBackup(ctx context.Context, root, path, digest string, plan legacyAdoptionPlan, adoption *legacyAdoptionTarget, maxAgeHours int) error {
	if !evidenceDigestPattern.MatchString(digest) {
		return errors.New("legacy adoption requires a backup receipt SHA-256")
	}
	if err := externalRegularFile(root, path); err != nil {
		return err
	}
	raw, err := os.ReadFile(path)
	if err != nil {
		return err
	}
	if sha256Hex(raw) != digest {
		return errors.New("legacy adoption backup receipt checksum mismatch")
	}
	var receipt legacyAdoptionBackupReceipt
	if err := decodeStrict(raw, &receipt); err != nil {
		return fmt.Errorf("decode legacy adoption backup receipt: %w", err)
	}
	if err := receipt.validate(plan, adoption, maxAgeHours, time.Now().UTC()); err != nil {
		return err
	}
	if err := externalRegularFile(root, receipt.ArchivePath); err != nil {
		return err
	}
	actual, err := fileSHA256(receipt.ArchivePath)
	if err != nil || actual != receipt.ArchiveSHA256 {
		return errors.New("legacy adoption backup archive checksum mismatch")
	}
	listing, err := exec.CommandContext(ctx, "pg_restore", "--list", receipt.ArchivePath).Output()
	if err != nil || sha256Hex(listing) != receipt.ArchiveListSHA256 {
		return errors.New("legacy adoption backup archive listing mismatch")
	}
	return nil
}

func requireLegacyAdoptionApproval(plan legacyAdoptionPlan, approvedDigest, approvalRef string) error {
	digest, err := plan.digest()
	if err != nil || !evidenceDigestPattern.MatchString(approvedDigest) || digest != approvedDigest {
		return errors.New("legacy adoption apply requires the exact current plan SHA-256")
	}
	if !approvalReferencePattern.MatchString(approvalRef) {
		return errors.New("legacy adoption apply requires an operator approval reference")
	}
	return nil
}

type legacyAdoptionIntent struct {
	FormatVersion int                `json:"format_version"`
	Plan          legacyAdoptionPlan `json:"plan"`
	PlanSHA256    string             `json:"plan_sha256"`
	BackupSHA256  string             `json:"backup_receipt_sha256"`
	ApprovalRef   string             `json:"approval_ref"`
	CreatedAt     string             `json:"created_at"`
}

type legacyAdoptionIntentRead struct {
	legacyAdoptionIntent
	Digest string
}

func adoptionReceiptDirectory(root string, values map[string]string, target targetManifest) (string, error) {
	if err := preflightUpgradeReceiptDirectory(root, values, target); err != nil {
		return "", err
	}
	directory := valueFor(values, "DB_INIT_RECEIPT_DIR", "")
	if directory == "" {
		directory = filepath.Join(os.TempDir(), "ichizen-db-init-receipts")
	}
	return directory, nil
}

func readLegacyAdoptionIntent(root string, values map[string]string, digest string) (legacyAdoptionIntentRead, error) {
	if !evidenceDigestPattern.MatchString(digest) {
		return legacyAdoptionIntentRead{}, errors.New("completed legacy adoption requires the original approved plan and durable intent")
	}
	directory := valueFor(values, "DB_INIT_RECEIPT_DIR", "")
	if directory == "" {
		directory = filepath.Join(os.TempDir(), "ichizen-db-init-receipts")
	}
	path := filepath.Join(directory, "legacy-adoption-intent-"+digest+".json")
	if err := externalRegularFile(root, path); err != nil {
		return legacyAdoptionIntentRead{}, errors.New("original legacy adoption intent is absent or invalid")
	}
	raw, err := os.ReadFile(path)
	if err != nil {
		return legacyAdoptionIntentRead{}, err
	}
	var intent legacyAdoptionIntent
	if err := decodeStrict(raw, &intent); err != nil {
		return legacyAdoptionIntentRead{}, errors.New("invalid original legacy adoption intent")
	}
	actual, err := intent.Plan.digest()
	if err != nil || intent.FormatVersion != 1 || intent.PlanSHA256 != digest || actual != digest || !intent.CreatedAtPresent() {
		return legacyAdoptionIntentRead{}, errors.New("original legacy adoption intent checksum mismatch")
	}
	return legacyAdoptionIntentRead{legacyAdoptionIntent: intent, Digest: sha256Hex(raw)}, nil
}

func (intent legacyAdoptionIntent) CreatedAtPresent() bool {
	_, err := time.Parse(time.RFC3339Nano, intent.CreatedAt)
	return err == nil
}

func ensureLegacyAdoptionIntent(root string, values map[string]string, target targetManifest, plan legacyAdoptionPlan, options legacyAdoptionOptions) (string, error) {
	directory, err := adoptionReceiptDirectory(root, values, target)
	if err != nil {
		return "", err
	}
	digest, err := plan.digest()
	if err != nil {
		return "", err
	}
	path := filepath.Join(directory, "legacy-adoption-intent-"+digest+".json")
	raw, err := os.ReadFile(path)
	if err == nil {
		var intent legacyAdoptionIntent
		if decodeErr := decodeStrict(raw, &intent); decodeErr != nil {
			return "", errors.New("invalid durable legacy adoption intent")
		}
		actual, digestErr := intent.Plan.digest()
		if digestErr != nil || intent.FormatVersion != 1 || actual != digest || intent.PlanSHA256 != digest || intent.BackupSHA256 != options.BackupSHA256 || intent.ApprovalRef != options.ApprovalRef || !intent.CreatedAtPresent() {
			return "", errors.New("durable legacy adoption intent does not match reviewed evidence")
		}
		return sha256Hex(raw), nil
	}
	if !os.IsNotExist(err) {
		return "", err
	}
	intent := legacyAdoptionIntent{FormatVersion: 1, Plan: plan, PlanSHA256: digest, BackupSHA256: options.BackupSHA256, ApprovalRef: options.ApprovalRef, CreatedAt: time.Now().UTC().Format(time.RFC3339Nano)}
	raw, err = json.MarshalIndent(intent, "", "  ")
	if err != nil {
		return "", err
	}
	raw = append(raw, '\n')
	file, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0o400)
	if err != nil {
		return "", err
	}
	if _, err := file.Write(raw); err != nil {
		_ = file.Close()
		return "", err
	}
	if err := file.Chmod(0o400); err != nil {
		_ = file.Close()
		return "", err
	}
	if err := file.Sync(); err != nil {
		_ = file.Close()
		return "", err
	}
	if err := file.Close(); err != nil {
		return "", err
	}
	dir, err := os.Open(directory)
	if err != nil {
		return "", err
	}
	syncErr := dir.Sync()
	closeErr := dir.Close()
	if err := errors.Join(syncErr, closeErr); err != nil {
		return "", err
	}
	fmt.Fprintf(os.Stderr, "durable legacy adoption intent: %s sha256=%s\n", path, sha256Hex(raw))
	return sha256Hex(raw), nil
}

type legacyAdoptionReceipt struct {
	FormatVersion            int                 `json:"format_version"`
	Operation                string              `json:"operation"`
	TargetKey                string              `json:"target_key"`
	TargetManifestDigest     string              `json:"target_manifest_digest"`
	Database                 string              `json:"database"`
	SchemaRelease            string              `json:"schema_release"`
	ReleaseManifestDigest    string              `json:"release_manifest_digest"`
	PreTrackerRevisionCount  int                 `json:"pre_tracker_revision_count"`
	PreHead                  string              `json:"pre_head"`
	PreTrackerFingerprint    string              `json:"pre_tracker_fingerprint"`
	PostTrackerRevisionCount int                 `json:"post_tracker_revision_count"`
	PostHead                 string              `json:"post_head"`
	PostTrackerFingerprint   string              `json:"post_tracker_fingerprint"`
	BaseCatalogFingerprint   string              `json:"base_catalog_fingerprint"`
	OverlayID                string              `json:"overlay_id"`
	OverlayFingerprint       string              `json:"overlay_fingerprint"`
	MigrationSQLExecuted     bool                `json:"migration_sql_executed"`
	AdoptedRevisions         []adoptedRevision   `json:"adopted_revisions"`
	EffectOracles            []oracleObservation `json:"effect_oracles"`
	PlanSHA256               string              `json:"plan_sha256"`
	BackupReceiptSHA256      string              `json:"backup_receipt_sha256"`
	ApprovalRef              string              `json:"approval_ref"`
	IntentSHA256             string              `json:"intent_sha256"`
	Result                   string              `json:"result"`
	CompletedAt              string              `json:"completed_at"`
}

func finishLegacyAdoption(ctx context.Context, root string, values map[string]string, target targetManifest, targetPath string, manifest schemareleases.Manifest, manifestRaw []byte, plan legacyAdoptionPlan, planDigest, intentDigest string, options legacyAdoptionOptions, db *sql.DB, required []schemareleases.RequiredBundle, action string) error {
	verification, observations, err := verifyLegacyAdoptionPost(ctx, db, target, manifest, required)
	if err != nil {
		return fmt.Errorf("post-adoption verification failed; preserve evidence and stop: %w", err)
	}
	if err := verifyDataObservations(target.Adoption.EffectOracles, plan.EffectOracles, observations); err != nil {
		return err
	}
	receiptURI, receiptDigest, err := writeLegacyAdoptionReceipt(root, values, target, targetPath, manifest, manifestRaw, plan, planDigest, options, intentDigest, observations)
	if err != nil {
		return err
	}
	return writeLegacyAdoptionOutput(legacyAdoptionOutput{
		Operation: "legacy_adoption", TargetKey: target.TargetKey, Database: target.Database.Name, Scope: target.Scope,
		SchemaRelease: manifest.Release, ObservedState: "adopted", MigrationSQLExecuted: false,
		PlanSHA256: planDigest, BackupReceiptSHA256: options.BackupSHA256, ApprovalRef: options.ApprovalRef,
		IntentSHA256: intentDigest, BeforeTrackerFingerprint: plan.PreTrackerFingerprint, AfterTrackerFingerprint: verification.TrackerFingerprint,
		BaseCatalogFingerprint: verification.BaseCatalogFingerprint, OverlayID: plan.OverlayID, OverlayFingerprint: verification.OverlayFingerprint,
		AdoptedRevisions: append([]adoptedRevision(nil), plan.Revisions...), EffectOracles: observations,
		Actions:    []string{action, "verified exact adopted Atlas history", "verified base catalog and security overlay", "verified legacy effect oracles"},
		ReceiptURI: receiptURI, ReceiptDigest: receiptDigest,
	})
}

func writeLegacyAdoptionReceipt(root string, values map[string]string, target targetManifest, targetPath string, manifest schemareleases.Manifest, manifestRaw []byte, plan legacyAdoptionPlan, planDigest string, options legacyAdoptionOptions, intentDigest string, observations []oracleObservation) (string, string, error) {
	directory, err := adoptionReceiptDirectory(root, values, target)
	if err != nil {
		return "", "", err
	}
	targetDigest, err := targetSnapshotDigest(target, targetPath)
	if err != nil {
		return "", "", err
	}
	receipt := legacyAdoptionReceipt{
		FormatVersion: 1, Operation: "legacy_adoption", TargetKey: target.TargetKey, TargetManifestDigest: targetDigest,
		Database: target.Database.Name, SchemaRelease: manifest.Release, ReleaseManifestDigest: schemareleases.ManifestDigest(manifestRaw),
		PreTrackerRevisionCount: plan.PreTrackerRevisionCount, PreHead: plan.PreHead, PreTrackerFingerprint: plan.PreTrackerFingerprint,
		PostTrackerRevisionCount: plan.PostTrackerRevisionCount, PostHead: plan.PostHead, PostTrackerFingerprint: plan.PostTrackerFingerprint,
		BaseCatalogFingerprint: plan.BaseCatalogFingerprint, OverlayID: plan.OverlayID, OverlayFingerprint: plan.OverlayFingerprint,
		MigrationSQLExecuted: false, AdoptedRevisions: append([]adoptedRevision(nil), plan.Revisions...), EffectOracles: observations,
		PlanSHA256: planDigest, BackupReceiptSHA256: options.BackupSHA256, ApprovalRef: options.ApprovalRef, IntentSHA256: intentDigest,
		Result: "metadata_adopted", CompletedAt: time.Now().UTC().Format(time.RFC3339Nano),
	}
	raw, err := json.MarshalIndent(receipt, "", "  ")
	if err != nil {
		return "", "", err
	}
	raw = append(raw, '\n')
	nonce := fmt.Sprintf("%d", time.Now().UTC().UnixNano())
	path := filepath.Join(directory, time.Now().UTC().Format("20060102T150405.000000000Z")+"_legacy-adoption_"+nonce+".json")
	file, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0o444)
	if err != nil {
		return "", "", err
	}
	if _, err := file.Write(raw); err != nil {
		_ = file.Close()
		return "", "", err
	}
	if err := file.Chmod(0o444); err != nil {
		_ = file.Close()
		return "", "", err
	}
	if err := file.Sync(); err != nil {
		_ = file.Close()
		return "", "", err
	}
	if err := file.Close(); err != nil {
		return "", "", err
	}
	dir, err := os.Open(directory)
	if err != nil {
		return "", "", err
	}
	syncErr := dir.Sync()
	closeErr := dir.Close()
	if err := errors.Join(syncErr, closeErr); err != nil {
		return "", "", err
	}
	return "file://" + filepath.ToSlash(path), sha256Hex(raw), nil
}

func writeLegacyAdoptionOutput(output legacyAdoptionOutput) error {
	encoder := json.NewEncoder(os.Stdout)
	encoder.SetIndent("", "  ")
	return encoder.Encode(output)
}
