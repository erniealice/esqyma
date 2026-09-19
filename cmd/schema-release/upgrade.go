package main

import (
	"context"
	"crypto/x509"
	"database/sql"
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

const upgradeOperatorVersion = 2

type upgradeOptions struct {
	FromRelease   string
	Apply         bool
	ApprovedPlan  string
	ApprovalRef   string
	BackupReceipt string
	BackupSHA256  string
}

func validateUpgradeRelease(m schemareleases.Manifest) error {
	if err := m.Validate(); err != nil {
		return err
	}
	if m.Compatibility == nil || m.Compatibility.MinimumOperatorVersion > upgradeOperatorVersion {
		return errors.New("release requires an unsupported upgrade operator")
	}
	if m.Compatibility.Phase != "expand" {
		return errors.New("contract release requires a fleet compatibility fence; this operator cannot apply it")
	}
	if len(m.Compatibility.DataOracles) == 0 {
		return errors.New("upgrade release requires executable data oracles")
	}
	required := map[string]bool{"atlas-history": false, "catalog": false, "seed-receipts": false, "workspace": false, "runtime-role": false, "normalized-schema": false}
	for _, name := range m.Compatibility.Oracles {
		if _, ok := required[name]; !ok {
			return fmt.Errorf("unsupported release oracle %q", name)
		}
		required[name] = true
	}
	for name, found := range required {
		if !found {
			return fmt.Errorf("missing required release oracle %q", name)
		}
	}
	return nil
}

type upgradeReleaseCatalog struct {
	// Optional fault seam for disposable qualification; the CLI never sets it.
	AfterApply func() error
	Load       func(string) (schemareleases.Manifest, []byte, error)
	Bootstrap  func(schemareleases.Manifest) ([]byte, error)
}

func runUpgrade(ctx context.Context, root, targetKey, release string, options upgradeOptions) error {
	return runUpgradeWithCatalog(ctx, root, targetKey, release, options, upgradeReleaseCatalog{Load: schemareleases.Load, Bootstrap: schemareleases.BootstrapBytes})
}

// The catalog seam permits disposable synthetic successor qualification without
// publishing a fictional business-schema release. The CLI always uses embedded artifacts.
func runUpgradeWithCatalog(ctx context.Context, root, targetKey, release string, options upgradeOptions, catalog upgradeReleaseCatalog) error {
	target, targetPath, err := loadTarget(root, targetKey)
	if err != nil {
		return err
	}
	if err := bindFleetTarget(root, &target, targetPath, options.Apply); err != nil {
		return err
	}
	if target.SchemaRelease != release {
		return errors.New("target and requested upgrade destination differ")
	}
	to, toRaw, err := catalog.Load(release)
	if err != nil {
		return err
	}
	if err := validateUpgradeRelease(to); err != nil {
		return err
	}
	if _, err := catalog.Bootstrap(to); err != nil {
		return err
	}
	dumpVersion, err := exec.CommandContext(ctx, "pg_dump", "--version").Output()
	if err != nil || !strings.HasPrefix(string(dumpVersion), "pg_dump (PostgreSQL) "+to.Bootstrap.PGDumpVersion) {
		return errors.New("release-pinned pg_dump is required before upgrading")
	}
	from, fromRaw, err := catalog.Load(options.FromRelease)
	if err != nil {
		return err
	}
	values, err := loadEnvironment(filepath.Join(root, target.Database.EnvFile))
	if err != nil {
		return err
	}
	config, err := configForTarget(root, values, target, "migration")
	if err != nil {
		return err
	}
	if err := target.validateUpgrade(options.FromRelease, config); err != nil {
		return err
	}
	caDigest := ""
	if target.Scope == "remote" {
		if !filepath.IsAbs(config.SSLRootCert) {
			return errors.New("CA trust path must be absolute")
		}
		info, err := os.Lstat(config.SSLRootCert)
		if err != nil || !info.Mode().IsRegular() {
			return errors.New("CA trust must be a regular file")
		}
		ca, err := os.ReadFile(config.SSLRootCert)
		if err != nil || !x509.NewCertPool().AppendCertsFromPEM(ca) {
			return errors.New("configured remote CA trust is not a readable PEM certificate bundle")
		}
		caDigest = sha256Hex(ca)
	}

	if !schemareleases.ProfileAllowed(to, target.SeedProfile) || !schemareleases.ProfileAllowed(from, target.SeedProfile) {
		return errors.New("target profile is not permitted by both releases")
	}
	// No seed writes occur in upgrade mode. Existing receipts retain the release
	// under which their exact bundle bytes were originally applied.
	var bundles []resolvedBundle
	var required []schemareleases.RequiredBundle
	for _, path := range target.Bundles {
		bundle, err := loadBundle(root, path)
		if err != nil {
			return err
		}
		if !from.AcceptsSeedRelease(bundle.Metadata.SchemaRelease) || !to.AcceptsSeedRelease(bundle.Metadata.SchemaRelease) {
			return errors.New("bundle source release is not compatible with both ends of the upgrade")
		}
		bundleTarget := target
		bundleTarget.SchemaRelease = bundle.Metadata.SchemaRelease
		if err := bundle.validateAgainst(bundleTarget); err != nil {
			return err
		}
		if err := runCopya(root, bundleTarget, bundle, false, "", nil); err != nil {
			return err
		}
		bundles = append(bundles, bundle)
		required = append(required, schemareleases.RequiredBundle{TargetKey: target.TargetKey, ID: bundle.Metadata.ID, Version: bundle.Metadata.Version, Digest: bundle.Digest, SchemaRelease: bundle.Metadata.SchemaRelease})
	}
	oldFiles, err := createMigrationSnapshot(ctx, root, from)
	if err != nil {
		return err
	}
	defer oldFiles.Close()
	newFiles, err := createMigrationSnapshot(ctx, root, to)
	if err != nil {
		return err
	}
	defer newFiles.Close()
	fromCommit, toCommit := "", ""
	if target.Scope == "remote" {
		fromCommit, err = verifySchemaTag(root, from, fromRaw, oldFiles.Files)
		if err != nil {
			return err
		}
		toCommit, err = verifySchemaTag(root, to, toRaw, newFiles.Files)
		if err != nil {
			return err
		}
		target.schemaCommit = toCommit
	}
	pending, err := pendingMigrationFiles(oldFiles, newFiles)
	if err != nil {
		return err
	}
	sqlDigest, err := pendingSQLDigest(newFiles.Directory, pending)
	if err != nil {
		return err
	}
	targetDigest, err := targetSnapshotDigest(target, targetPath)
	if err != nil {
		return err
	}
	// Plan uses server-enforced read-only sessions. Apply connects to the same
	// target and rechecks every source proof after acquiring its advisory lock.
	connectionConfig := config
	connectionConfig.ReadOnly = !options.Apply
	db, err := openDatabase(connectionConfig, config.Name)
	if err != nil {
		return errors.New("connect reviewed upgrade target failed")
	}
	defer db.Close()
	if err := verifyUpgradeIdentity(ctx, db, target, config); err != nil {
		return err
	}
	var lock *sql.Conn
	if options.Apply {
		lock, err = acquireUpgradeLock(ctx, db)
		if err != nil {
			return err
		}
		defer func() {
			cleanup, cancel := context.WithTimeout(context.Background(), 5*time.Second)
			defer cancel()
			_, _ = lock.ExecContext(cleanup, "SELECT pg_advisory_unlock(hashtextextended(current_database(), 736492))")
			_ = lock.Close()
		}()
	}
	if err := verifyUpgradeIdentity(ctx, db, target, config); err != nil {
		return err
	}
	state, err := databaseState(ctx, db)
	if err != nil {
		return err
	}
	if state != "managed" {
		return errors.New("upgrade requires an existing managed database")
	}
	completed := false
	var proof schemareleases.UpgradeProof
	if current, verifyErr := schemareleases.VerifyDatabase(ctx, db, to, required); verifyErr == nil {
		proof, err = completedUpgradeProof(to, from, fromRaw, current.TrackerFingerprint)
		completed = true
	} else {
		before, verifyErr := schemareleases.VerifyDatabase(ctx, db, from, required)
		if verifyErr != nil {
			return fmt.Errorf("predecessor verification failed: %w", verifyErr)
		}
		proof, err = to.UpgradeFrom(from, fromRaw, before.TrackerFingerprint)
	}
	if err != nil {
		return err
	}
	plan := upgradePlan{FromSchemaCommit: fromCommit, ToSchemaCommit: toCommit, CredentialProfileSHA256: config.CredentialProfileSHA256, FleetManifestSHA256: target.fleetDigest, CATrustSHA256: caDigest, FormatVersion: 1, TargetKey: target.TargetKey, TargetManifestSHA256: targetDigest, Database: config.Name, Endpoint: target.Upgrade.Endpoint, FromRelease: from.Release, FromManifestSHA256: sha256Hex(fromRaw), ToRelease: to.Release, ToManifestSHA256: sha256Hex(toRaw), FromTracker: proof.FromTrackerFingerprint, ToTracker: proof.TrackerFingerprint, FromCatalog: from.Bootstrap.CatalogFingerprint, ToCatalog: to.Bootstrap.CatalogFingerprint, Migrations: pending, RequiredBundles: required, SQLSHA256: sqlDigest}
	if completed {
		intent, err := readUpgradeIntent(root, values, options.ApprovedPlan)
		if err != nil {
			return err
		}
		plan.DataOracles = intent.Plan.DataOracles
	} else {
		plan.DataOracles, err = observeDataOracles(ctx, db, to.Compatibility.DataOracles, target.Workspace.ID)
		if err != nil {
			return err
		}
	}
	digest, err := plan.digest()
	if err != nil {
		return err
	}
	if !completed {
		if err := runAtlasUpgrade(ctx, root, newFiles, config, true); err != nil {
			return err
		}
	}
	if !options.Apply {
		return json.NewEncoder(os.Stdout).Encode(struct {
			Plan   upgradePlan `json:"plan"`
			SHA256 string      `json:"sha256"`
			DryRun string      `json:"dry_run"`
		}{plan, digest, map[bool]string{false: "passed", true: "already_at_destination"}[completed]})
	}
	if err := requireUpgradeApproval(plan, options.ApprovedPlan, options.ApprovalRef); err != nil {
		return err
	}
	if err := verifyBackup(ctx, root, options.BackupReceipt, options.BackupSHA256, plan, target.Upgrade.BackupMaxAgeHours); err != nil {
		return err
	}
	if err := preflightUpgradeReceiptDirectory(root, values, target); err != nil {
		return err
	}

	intentDigest, err := ensureUpgradeIntent(root, values, target, plan, options, completed)
	if err != nil {
		return err
	}
	if !completed {
		if _, err := targetSnapshotDigest(target, targetPath); err != nil {
			return err
		}
		if caDigest != "" {
			actual, err := fileSHA256(config.SSLRootCert)
			if err != nil || actual != caDigest {
				return errors.New("CA trust changed; replan required")
			}
		}
		immediateData, err := observeDataOracles(ctx, db, to.Compatibility.DataOracles, target.Workspace.ID)
		if err != nil {
			return err
		}
		if err := verifyDataObservations(to.Compatibility.DataOracles, plan.DataOracles, immediateData); err != nil {
			return err
		}
		if err := runAtlasUpgrade(ctx, root, newFiles, config, false); err != nil {
			return err
		}
		if catalog.AfterApply != nil {
			if err := catalog.AfterApply(); err != nil {
				return err
			}
		}
	}

	after, err := schemareleases.VerifyDatabase(ctx, db, to, required)
	if err != nil {
		return fmt.Errorf("post-upgrade verification failed; preserve evidence and stop: %w", err)
	}
	if after.TrackerFingerprint != proof.TrackerFingerprint {
		return errors.New("result does not match the selected transition proof")
	}
	normalized, err := normalizedSchemaFingerprint(config, to)
	if err != nil {
		return err
	}
	if normalized != to.Bootstrap.NormalizedSchemaFingerprint {
		return errors.New("upgraded schema differs from complete fresh-install schema")
	}
	if err := verifyUpgradeIdentity(ctx, db, target, config); err != nil {
		return err
	}
	afterData, err := observeDataOracles(ctx, db, to.Compatibility.DataOracles, target.Workspace.ID)
	if err != nil {
		return err
	}
	if err := verifyDataObservations(to.Compatibility.DataOracles, plan.DataOracles, afterData); err != nil {
		return err
	}
	output := commandOutput{Mode: "upgrade", TargetKey: target.TargetKey, Database: config.Name, Scope: target.Scope, SchemaRelease: to.Release, AtlasHead: to.Atlas.Head, CatalogFingerprint: after.CatalogFingerprint, FromRelease: from.Release, PlanSHA256: digest, BackupReceiptSHA256: options.BackupSHA256, ApprovalRef: options.ApprovalRef, Actions: []string{"applied reviewed migration prefix", "verified upgraded history and complete-schema parity", "preserved required seed receipts"}}
	output.FromSchemaCommit = fromCommit
	output.DataOracles = afterData
	output.IntentSHA256 = intentDigest
	if completed {
		output.Actions = []string{"reconciled completed transition using durable pre-apply intent", "verified history and schema without migration or reseeding"}
	}
	uri, receiptDigest, err := writeRunReceipt(root, values, target, targetPath, to, toRaw, bundles, output)
	if err != nil {
		return err
	}
	output.ReceiptURI, output.ReceiptDigest = uri, receiptDigest
	return writeOutput(output)
}

func acquireUpgradeLock(ctx context.Context, db *sql.DB) (*sql.Conn, error) {
	conn, err := db.Conn(ctx)
	if err != nil {
		return nil, err
	}
	var locked bool
	if err := conn.QueryRowContext(ctx, "SELECT pg_try_advisory_lock(hashtextextended(current_database(), 736492))").Scan(&locked); err != nil || !locked {
		_ = conn.Close()
		return nil, errors.New("another schema operator holds this database; stop and retry after it finishes")
	}
	return conn, nil
}

func verifyUpgradeIdentity(ctx context.Context, db *sql.DB, target targetManifest, config databaseConfig) error {
	var database, role string
	if err := db.QueryRowContext(ctx, "SELECT current_database(), current_user").Scan(&database, &role); err != nil {
		return errors.New("database identity query failed")
	}
	if database != target.Database.Name || role != target.Upgrade.MigrationRole {
		return errors.New("observed database/migration role differs from target")
	}
	if target.Scope != "remote" {
		if err := observedLoopback(ctx, db); err != nil {
			return err
		}
	}
	var exists bool
	if err := db.QueryRowContext(ctx, "SELECT EXISTS (SELECT 1 FROM public.workspace WHERE id=$1 AND slug=$2)", target.Workspace.ID, target.Workspace.Slug).Scan(&exists); err != nil || !exists {
		return errors.New("target workspace identity is absent or mismatched")
	}
	return verifyRuntimeAuthority(ctx, db, target.Upgrade.RuntimeRole, target.Upgrade.MigrationRole)
}

func verifyRuntimeAuthority(ctx context.Context, db *sql.DB, runtimeRole, migrationRole string) error {
	var unsafe bool
	err := db.QueryRowContext(ctx, `SELECT r.rolsuper OR r.rolcreatedb OR r.rolcreaterole OR r.rolbypassrls OR r.rolreplication
	 OR pg_has_role(r.oid,(SELECT oid FROM pg_roles WHERE rolname=$2),'MEMBER')
	 OR has_database_privilege(r.oid,current_database(),'CREATE')
	 OR has_schema_privilege(r.oid,'public','CREATE')
	 OR has_table_privilege(r.oid,'atlas_schema_revisions.atlas_schema_revisions','INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER,MAINTAIN')
	 OR has_table_privilege(r.oid,'ichizen_deploy.data_bundle_receipts','INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER,MAINTAIN')
	 FROM pg_roles r WHERE r.rolname=$1`, runtimeRole, migrationRole).Scan(&unsafe)
	if err != nil || unsafe {
		return errors.New("runtime role missing or has forbidden schema/ledger authority")
	}
	var ownsObjects bool
	err = db.QueryRowContext(ctx, `SELECT EXISTS (
  SELECT 1 FROM pg_namespace n WHERE n.nspname NOT IN ('pg_catalog','information_schema') AND n.nspname NOT LIKE 'pg_toast%' AND n.nspname NOT LIKE 'pg_temp_%'
   AND (has_schema_privilege($1,n.oid,'CREATE') OR pg_has_role($1,n.nspowner,'MEMBER'))
  UNION ALL
  SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
   WHERE n.nspname NOT IN ('pg_catalog','information_schema') AND n.nspname NOT LIKE 'pg_toast%' AND n.nspname NOT LIKE 'pg_temp_%' AND pg_has_role($1,c.relowner,'MEMBER')
  UNION ALL
  SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
   WHERE n.nspname NOT IN ('pg_catalog','information_schema') AND n.nspname NOT LIKE 'pg_toast%' AND n.nspname NOT LIKE 'pg_temp_%' AND pg_has_role($1,p.proowner,'MEMBER')
  UNION ALL
  SELECT 1 FROM pg_type t JOIN pg_namespace n ON n.oid=t.typnamespace
   WHERE n.nspname NOT IN ('pg_catalog','information_schema') AND n.nspname NOT LIKE 'pg_toast%' AND n.nspname NOT LIKE 'pg_temp_%' AND pg_has_role($1,t.typowner,'MEMBER')
 )`, runtimeRole).Scan(&ownsObjects)
	if err != nil || ownsObjects {
		return errors.New("runtime role has application schema/object ownership or CREATE authority")
	}
	var legacyWritable bool
	err = db.QueryRowContext(ctx, `SELECT CASE WHEN to_regclass('public.schema_migrations') IS NULL THEN false ELSE has_table_privilege($1,'public.schema_migrations','INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER,MAINTAIN') END`, runtimeRole).Scan(&legacyWritable)
	if err != nil || legacyWritable {
		return errors.New("runtime role has legacy migration-ledger authority or cannot be verified")
	}
	return nil
}

func pendingSQLDigest(directory string, files []migrationFile) (string, error) {
	var raw []byte
	for _, file := range files {
		body, err := os.ReadFile(filepath.Join(directory, file.Name))
		if err != nil {
			return "", err
		}
		if sha256Hex(body) != file.SHA256 {
			return "", errors.New("staged migration bytes changed")
		}
		// This first operator supports atomic forward migrations. Nontransactional
		// steps need their own reviewed recovery protocol before being executable.
		if err := validateAtomicMigrationSQL(string(body)); err != nil {
			return "", fmt.Errorf("migration %s: %w", file.Name, err)
		}
		raw = append(raw, []byte(file.Name+"\x00")...)
		raw = append(raw, body...)
		raw = append(raw, 0)
	}
	return sha256Hex(raw), nil
}

func atlasSnapshotCommand(ctx context.Context, root string, snapshot *migrationSnapshot, config databaseConfig, args ...string) (*exec.Cmd, error) {
	atlas, err := pinnedAtlas(root)
	if err != nil {
		return nil, err
	}
	configuration := filepath.Join(snapshot.Directory, "operator.hcl")
	directory, _ := json.Marshal("file://" + snapshot.Directory)
	contents := fmt.Sprintf("env \"operator\" {\n url = getenv(\"ICHIZEN_MIGRATION_URL\")\n migration { dir = %s }\n}\n", directory)
	if err := os.WriteFile(configuration, []byte(contents), 0o600); err != nil {
		return nil, err
	}
	args = append(args, "--config", "file://"+configuration, "--env", "operator")
	command := exec.CommandContext(ctx, atlas, args...)
	command.Env = append(os.Environ(), "ICHIZEN_MIGRATION_URL="+config.databaseURL(config.Name))
	return command, nil
}

func runAtlasUpgrade(ctx context.Context, root string, snapshot *migrationSnapshot, config databaseConfig, dry bool) error {
	args := []string{"migrate", "apply", "--tx-mode", "all", "--lock-timeout", "10s"}
	if dry {
		args = append(args, "--dry-run")
		config.ReadOnly = true
	}
	command, err := atlasSnapshotCommand(ctx, root, snapshot, config, args...)
	if err != nil {
		return err
	}
	if _, err := command.CombinedOutput(); err != nil {
		return fmt.Errorf("Atlas upgrade dry_run=%t failed; no automatic recovery attempted", dry)
	}
	return nil
}

func preflightUpgradeReceiptDirectory(root string, values map[string]string, target targetManifest) error {
	directory := valueFor(values, "DB_INIT_RECEIPT_DIR", "")
	if directory == "" {
		if target.Scope == "remote" {
			return errors.New("remote apply requires external DB_INIT_RECEIPT_DIR")
		}
		directory = filepath.Join(os.TempDir(), "ichizen-db-init-receipts")
	}
	if !filepath.IsAbs(directory) || insidePath(root, directory) {
		return errors.New("receipt directory must be absolute and outside Git")
	}
	if err := os.MkdirAll(directory, 0o700); err != nil {
		return err
	}
	real, err := filepath.EvalSymlinks(directory)
	if err != nil {
		return err
	}
	if insidePath(root, real) {
		return errors.New("receipt directory resolves inside Git")
	}
	probe, err := os.CreateTemp(directory, ".upgrade-write-probe-*")
	if err != nil {
		return err
	}
	path := probe.Name()
	defer os.Remove(path)
	if err := probe.Close(); err != nil {
		return err
	}
	return nil
}
