package main

import (
	"context"
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"time"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
	_ "github.com/jackc/pgx/v5/stdlib"
)

type commandOutput struct {
	FromSchemaCommit    string              `json:"from_schema_commit,omitempty"`
	DataOracles         []oracleObservation `json:"data_oracles,omitempty"`
	IntentSHA256        string              `json:"intent_sha256,omitempty"`
	FromRelease         string              `json:"from_release,omitempty"`
	PlanSHA256          string              `json:"plan_sha256,omitempty"`
	BackupReceiptSHA256 string              `json:"backup_receipt_sha256,omitempty"`
	ApprovalRef         string              `json:"approval_ref,omitempty"`
	Mode                string              `json:"mode"`
	TargetKey           string              `json:"target_key"`
	Database            string              `json:"database"`
	Scope               string              `json:"scope"`
	ObservedState       string              `json:"observed_state"`
	SchemaRelease       string              `json:"schema_release"`
	AtlasHead           string              `json:"atlas_head"`
	SeedProfile         string              `json:"seed_profile"`
	BusinessType        string              `json:"business_type"`
	WorkspaceSlug       string              `json:"workspace_slug"`
	Bundles             []string            `json:"bundles"`
	Actions             []string            `json:"actions"`
	CatalogFingerprint  string              `json:"catalog_fingerprint,omitempty"`
	ReceiptURI          string              `json:"receipt_uri,omitempty"`
	ReceiptDigest       string              `json:"receipt_digest,omitempty"`
}

func main() {
	arguments := os.Args[1:]
	if len(arguments) > 0 && arguments[0] == "--" {
		arguments = arguments[1:]
	}
	flags := flag.NewFlagSet("schema-release", flag.ContinueOnError)
	targetKey := flags.String("target", "", "tracked database target key")
	release := flags.String("schema-release", "", "explicit Esqyma calendar release assertion")
	apply := flags.Bool("apply", false, "apply the reviewed initialization plan")
	verify := flags.Bool("verify", false, "verify an existing exact release and required bundles without writes")
	deploymentEnv := flags.String("deployment-env-file", "", "bind verification to the exact runtime environment being deployed")
	deploymentCA := flags.String("deployment-ca-file", "", "operator-local CA bytes mapped to the deployed /app/certs path")
	fromRelease := flags.String("upgrade-from", "", "explicit predecessor for a reviewed forward upgrade")
	legacyAdoption := flags.Bool("legacy-adoption", false, "adopt an allow-listed legacy Atlas history without executing migration SQL")
	approvedPlan := flags.String("approve-plan", "", "SHA-256 of the exact reviewed upgrade plan")
	approvalRef := flags.String("approval-ref", "", "operator authorization reference")
	backup := flags.String("backup-receipt", "", "absolute external verified backup receipt path")
	backupDigest := flags.String("backup-sha256", "", "SHA-256 of the reviewed backup receipt")
	if err := flags.Parse(arguments); err != nil {
		fatalf("%v", err)
	}
	if *targetKey == "" || *release == "" || flags.NArg() != 0 || (*apply && *verify) {
		fatalf("usage: pnpm db:init -- --target CLIENT/TARGET --schema-release postgres/YYYY.MM.N [--apply | --verify] [--legacy-adoption]")
	}
	if *legacyAdoption && *fromRelease != "" {
		fatalf("--legacy-adoption and --upgrade-from are mutually exclusive")
	}
	if *deploymentCA != "" && *deploymentEnv == "" {
		fatalf("--deployment-ca-file requires --deployment-env-file")
	}
	if *deploymentEnv != "" && (!*verify || *fromRelease != "") {
		fatalf("deployment environment and CA binding requires destination-only --verify")
	}
	if *legacyAdoption {
		if *deploymentEnv != "" || *deploymentCA != "" {
			fatalf("legacy adoption does not use deployment environment binding")
		}
		root, err := findRepositoryRoot()
		if err != nil {
			fatalf("%v", err)
		}
		if err := runLegacyAdoption(context.Background(), root, *targetKey, *release, legacyAdoptionOptions{
			Apply: *apply, Verify: *verify, ApprovedPlan: *approvedPlan, ApprovalRef: *approvalRef,
			BackupReceipt: *backup, BackupSHA256: *backupDigest,
		}); err != nil {
			fatalf("%v", err)
		}
		return
	}
	if *fromRelease != "" {
		if *verify {
			fatalf("use --verify without --upgrade-from to verify the destination")
		}
		root, err := findRepositoryRoot()
		if err != nil {
			fatalf("%v", err)
		}
		if err := runUpgrade(context.Background(), root, *targetKey, *release, upgradeOptions{FromRelease: *fromRelease, Apply: *apply, ApprovedPlan: *approvedPlan, ApprovalRef: *approvalRef, BackupReceipt: *backup, BackupSHA256: *backupDigest}); err != nil {
			fatalf("%v", err)
		}
		return
	}
	if *approvedPlan != "" || *approvalRef != "" || *backup != "" || *backupDigest != "" {
		fatalf("upgrade evidence requires --upgrade-from")
	}
	if err := runWithDeploymentEnv(context.Background(), *targetKey, *release, *apply, *verify, *deploymentEnv, *deploymentCA); err != nil {
		fatalf("%v", err)
	}
}

func run(ctx context.Context, targetKey, release string, apply, verify bool) error {
	return runWithDeploymentEnv(ctx, targetKey, release, apply, verify, "", "")
}

func runWithDeploymentEnv(ctx context.Context, targetKey, release string, apply, verify bool, deploymentEnv, deploymentCA string) error {
	if deploymentCA != "" && deploymentEnv == "" {
		return errors.New("deployment CA binding requires a deployment environment")
	}
	if deploymentEnv != "" && (!verify || apply) {
		return errors.New("deployment environment and CA binding requires read-only verification")
	}
	if apply && verify {
		return errors.New("apply and verify are mutually exclusive")
	}
	root, err := findRepositoryRoot()
	if err != nil {
		return err
	}
	target, targetPath, err := loadTarget(root, targetKey)
	if err != nil {
		return err
	}
	if err := bindFleetTarget(root, &target, targetPath, apply || (verify && target.Scope == "remote")); err != nil {
		return err
	}
	if target.SchemaRelease != release {
		return fmt.Errorf("CLI schema release %s does not match target %s", release, target.SchemaRelease)
	}
	manifest, manifestRaw, err := schemareleases.Load(release)
	if err != nil {
		return err
	}
	if !schemareleases.ProfileAllowed(manifest, target.SeedProfile) {
		return fmt.Errorf("release %s does not allow seed profile %s", release, target.SeedProfile)
	}
	if !verify {
		if err := validateLocalTools(root, manifest); err != nil {
			return err
		}
		if _, err := schemareleases.BootstrapBytes(manifest); err != nil {
			return err
		}
	}

	if target.Scope == "remote" && !verify {
		snapshot, err := createMigrationSnapshot(ctx, root, manifest)
		if err != nil {
			return err
		}
		commit, err := verifySchemaTag(root, manifest, manifestRaw, snapshot.Files)
		snapshot.Close()
		if err != nil {
			return err
		}
		target.schemaCommit = commit
	}

	bundles := make([]resolvedBundle, 0, len(target.Bundles))
	required := make([]schemareleases.RequiredBundle, 0, len(target.Bundles))
	for _, path := range target.Bundles {
		bundle, err := loadBundle(root, path)
		if err != nil {
			return err
		}
		if err := bundle.validateForRelease(target, manifest); err != nil {
			return err
		}
		if !verify {
			if err := runCopya(root, target, bundle, false, "", nil); err != nil {
				return fmt.Errorf("validate bundle %s: %w", path, err)
			}
		}
		bundles = append(bundles, bundle)
		required = append(required, schemareleases.RequiredBundle{
			TargetKey: target.TargetKey, ID: bundle.Metadata.ID, Version: bundle.Metadata.Version,
			Digest: bundle.Digest, SchemaRelease: bundle.Metadata.SchemaRelease,
		})
	}

	envPath := filepath.Join(root, filepath.FromSlash(target.Database.EnvFile))
	values, err := loadEnvironment(envPath)
	if err != nil {
		return fmt.Errorf("load target environment: %w", err)
	}
	operation := "initialize"
	if verify {
		operation = "runtime"
	}
	sslRootCert := ""
	if deploymentCA != "" {
		sslRootCert, err = deploymentTrustPath(deploymentEnv, deploymentCA)
		if err != nil {
			return err
		}
	}
	config, err := configForTargetWithTrust(root, values, target, operation, sslRootCert)
	if err != nil {
		return err
	}
	if (target.Scope == "local" || target.Scope == "disposable") && !config.loopback() {
		return errors.New("local/disposable target must configure a loopback database host")
	}

	if verify {
		if deploymentEnv != "" {
			if err := validateDeploymentEnvironment(root, deploymentEnv, target, config, required); err != nil {
				return err
			}
		}
		return runVerify(ctx, target, config, manifest, required)
	}
	admin, err := openDatabase(config, "postgres")
	if err != nil {
		return fmt.Errorf("connect PostgreSQL control database: %w", err)
	}
	defer admin.Close()
	if err := verifyInitializationIdentity(ctx, admin, target, config, "postgres"); err != nil {
		return err
	}
	if apply {
		lock, err := acquireInitializationLock(ctx, admin, target.Database.Name)
		if err != nil {
			return err
		}
		defer releaseInitializationLock(lock, target.Database.Name)
	}
	if target.Scope == "local" || target.Scope == "disposable" {
		if err := observedLoopback(ctx, admin); err != nil {
			return err
		}
	}
	exists, err := databaseExists(ctx, admin, target.Database.Name)
	if err != nil {
		return err
	}
	state := "absent"
	var targetDB *sql.DB
	if exists {
		targetDB, err = openDatabase(config, target.Database.Name)
		if err != nil {
			return err
		}
		defer targetDB.Close()
		if err := verifyInitializationIdentity(ctx, targetDB, target, config, target.Database.Name); err != nil {
			return err
		}
		if apply {
			lock, err := acquireUpgradeLock(ctx, targetDB)
			if err != nil {
				return err
			}
			defer releaseInitializationLock(lock, target.Database.Name)
		}
		state, err = databaseState(ctx, targetDB)
		if err != nil {
			return err
		}
		if state == "untracked-nonempty" {
			return errors.New("existing target is non-empty and has no Atlas tracker; refusing writes")
		}
	}

	output := commandOutput{
		Mode:          map[bool]string{false: "plan", true: "apply"}[apply],
		TargetKey:     target.TargetKey,
		Database:      target.Database.Name,
		Scope:         target.Scope,
		ObservedState: state,
		SchemaRelease: release,
		AtlasHead:     manifest.Atlas.Head,
		SeedProfile:   target.SeedProfile,
		BusinessType:  target.BusinessType,
		WorkspaceSlug: target.Workspace.Slug,
	}
	for _, bundle := range bundles {
		output.Bundles = append(output.Bundles, bundle.Metadata.ID+"/"+bundle.Metadata.Version+"@sha256:"+bundle.Digest)
	}

	if !apply {
		switch state {
		case "absent":
			if !target.AllowCreate {
				return errors.New("target database is absent and target does not allow create")
			}
			output.Actions = []string{"create database", "apply immutable bootstrap", "establish Atlas head", "verify release", "apply Copya bundles", "verify receipts"}
		case "empty":
			output.Actions = []string{"apply immutable bootstrap", "establish Atlas head", "verify release", "apply Copya bundles", "verify receipts"}
		case "managed":
			if _, err := schemareleases.VerifyDatabase(ctx, targetDB, manifest, nil); err != nil {
				return err
			}
			if _, err := schemareleases.VerifyDatabase(ctx, targetDB, manifest, required); err == nil {
				output.Actions = []string{"verify exact release and bundles (no-op)"}
			} else {
				output.Actions = []string{"verify exact release", "apply missing Copya bundles", "verify receipts"}
			}
		}
		return writeOutput(output)
	}

	if state == "absent" {
		if !target.AllowCreate || (target.Scope != "local" && target.Scope != "disposable") {
			return errors.New("target database creation is not authorized")
		}
		if err := createDatabase(ctx, admin, target.Database.Name); err != nil {
			return fmt.Errorf("create target database: %w", err)
		}
		targetDB, err = openDatabase(config, target.Database.Name)
		if err != nil {
			return err
		}
		defer targetDB.Close()
		if err := verifyInitializationIdentity(ctx, targetDB, target, config, target.Database.Name); err != nil {
			return err
		}
		lock, err := acquireUpgradeLock(ctx, targetDB)
		if err != nil {
			return err
		}
		defer releaseInitializationLock(lock, target.Database.Name)
		state = "empty"
		output.Actions = append(output.Actions, "created database")
	}
	if state == "empty" {
		bootstrap, err := schemareleases.BootstrapBytes(manifest)
		if err != nil {
			return err
		}
		if err := applyBootstrap(config, manifest, bootstrap); err != nil {
			return err
		}
		fingerprint, err := normalizedSchemaFingerprint(config, manifest)
		if err != nil {
			return err
		}
		if fingerprint != manifest.Bootstrap.NormalizedSchemaFingerprint {
			return fmt.Errorf("bootstrap normalized fingerprint got %s, want %s", fingerprint, manifest.Bootstrap.NormalizedSchemaFingerprint)
		}
		if err := establishAtlasHead(root, config, manifest); err != nil {
			return err
		}
		output.Actions = append(output.Actions, "applied immutable bootstrap", "established Atlas head")
	}
	verification, err := schemareleases.VerifyDatabase(ctx, targetDB, manifest, nil)
	if err != nil {
		return err
	}
	output.CatalogFingerprint = verification.CatalogFingerprint
	output.Actions = append(output.Actions, "verified exact schema release")
	for _, bundle := range bundles {
		if err := runCopya(root, target, bundle, true, config.databaseURL(config.Name), values); err != nil {
			return err
		}
	}
	if _, err := schemareleases.VerifyDatabase(ctx, targetDB, manifest, required); err != nil {
		return err
	}
	output.Actions = append(output.Actions, "applied or verified Copya bundles", "verified required bundle receipts")
	receiptURI, receiptDigest, err := writeRunReceipt(root, values, target, targetPath, manifest, manifestRaw, bundles, output)
	if err != nil {
		return err
	}
	output.ReceiptURI = receiptURI
	output.ReceiptDigest = receiptDigest
	output.Actions = append(output.Actions, "published sanitized append-only run receipt")
	return writeOutput(output)
}

func runCopya(root string, target targetManifest, bundle resolvedBundle, apply bool, databaseURL string, values map[string]string) error {
	if target.bundleDigests != nil && target.bundleDigests[bundle.Path] != bundle.Digest {
		return errors.New("bundle differs from selected fleet snapshot")
	}
	raw := bundle.Raw
	if raw == nil {
		var err error
		raw, err = os.ReadFile(bundle.Path)
		if err != nil {
			return err
		}
	}
	if sha256Hex(raw) != bundle.Digest {
		return errors.New("bundle snapshot checksum mismatch")
	}
	snapshot, err := os.CreateTemp("", "ichizen-copya-bundle-*.json")
	if err != nil {
		return err
	}
	defer os.Remove(snapshot.Name())
	if _, err := snapshot.Write(raw); err != nil {
		snapshot.Close()
		return err
	}
	if err := snapshot.Chmod(0o400); err != nil {
		snapshot.Close()
		return err
	}
	if err := snapshot.Close(); err != nil {
		return err
	}

	args := []string{"run", "./cmd/copya-bundle", "--manifest", snapshot.Name(), "--target", target.TargetKey, "--schema-release", bundle.Metadata.SchemaRelease}
	if apply {
		args = append(args, "--apply")
	}
	command := exec.Command("go", args...)
	command.Dir = filepath.Join(root, "packages", "copya")
	command.Env = append(os.Environ(), "GOCACHE="+filepath.Join(os.TempDir(), "ichizen-go-cache"))
	if apply {
		password := valueFor(values, bundle.Metadata.User.PasswordEnv, "")
		command.Env = append(command.Env, "DATABASE_URL="+databaseURL, bundle.Metadata.User.PasswordEnv+"="+password)
	}
	output, err := command.CombinedOutput()
	if err != nil {
		return fmt.Errorf("Copya bundle %s/%s: %w: %s", bundle.Metadata.ID, bundle.Metadata.Version, err, sanitizeCommandOutput(output))
	}
	return nil
}

// Serialize initializers before an absent database can be created. Once it exists,
// also acquire the target-database lock shared with the upgrade runner.
func verifyInitializationIdentity(ctx context.Context, db *sql.DB, target targetManifest, config databaseConfig, expectedDatabase string) error {
	expectedRole := config.User
	if target.Access != nil {
		expectedRole = target.Access.MigrationRole
	}
	var database, role string
	if err := db.QueryRowContext(ctx, "SELECT current_database(), current_user").Scan(&database, &role); err != nil {
		return errors.New("initializer identity query failed")
	}
	if database != expectedDatabase || role != expectedRole {
		return errors.New("observed initializer database/migration role differs from target")
	}
	return nil
}

func acquireInitializationLock(ctx context.Context, admin *sql.DB, name string) (*sql.Conn, error) {
	conn, err := admin.Conn(ctx)
	if err != nil {
		return nil, err
	}
	var locked bool
	if err := conn.QueryRowContext(ctx, "SELECT pg_try_advisory_lock(hashtextextended($1, 736492))", name).Scan(&locked); err != nil || !locked {
		_ = conn.Close()
		return nil, errors.New("another initializer holds this database; retry after it finishes")
	}
	return conn, nil
}

func releaseInitializationLock(conn *sql.Conn, name string) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, _ = conn.ExecContext(ctx, "SELECT pg_advisory_unlock(hashtextextended($1, 736492))", name)
	_ = conn.Close()
}

func findRepositoryRoot() (string, error) {
	directory, err := os.Getwd()
	if err != nil {
		return "", err
	}
	for {
		if info, err := os.Stat(filepath.Join(directory, "go.work")); err == nil && !info.IsDir() {
			return directory, nil
		}
		parent := filepath.Dir(directory)
		if parent == directory {
			return "", errors.New("repository root containing go.work not found")
		}
		directory = parent
	}
}

func sha256Hex(raw []byte) string {
	sum := sha256.Sum256(raw)
	return hex.EncodeToString(sum[:])
}

func writeOutput(output commandOutput) error {
	encoder := json.NewEncoder(os.Stdout)
	encoder.SetIndent("", "  ")
	return encoder.Encode(output)
}

func fatalf(format string, args ...any) {
	fmt.Fprintf(os.Stderr, "schema-release: "+format+"\n", args...)
	os.Exit(1)
}
