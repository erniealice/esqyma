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

	schemareleases "github.com/erniealice/esqyma/schema-releases"
	_ "github.com/jackc/pgx/v5/stdlib"
)

type commandOutput struct {
	Mode               string   `json:"mode"`
	TargetKey          string   `json:"target_key"`
	Database           string   `json:"database"`
	Scope              string   `json:"scope"`
	ObservedState      string   `json:"observed_state"`
	SchemaRelease      string   `json:"schema_release"`
	AtlasHead          string   `json:"atlas_head"`
	SeedProfile        string   `json:"seed_profile"`
	BusinessType       string   `json:"business_type"`
	WorkspaceSlug      string   `json:"workspace_slug"`
	Bundles            []string `json:"bundles"`
	Actions            []string `json:"actions"`
	CatalogFingerprint string   `json:"catalog_fingerprint,omitempty"`
	ReceiptURI         string   `json:"receipt_uri,omitempty"`
	ReceiptDigest      string   `json:"receipt_digest,omitempty"`
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
	if err := flags.Parse(arguments); err != nil {
		fatalf("%v", err)
	}
	if *targetKey == "" || *release == "" || flags.NArg() != 0 {
		fatalf("usage: pnpm db:init -- --target CLIENT/TARGET --schema-release postgres/YYYY.MM.N [--apply]")
	}
	if err := run(context.Background(), *targetKey, *release, *apply); err != nil {
		fatalf("%v", err)
	}
}

func run(ctx context.Context, targetKey, release string, apply bool) error {
	root, err := findRepositoryRoot()
	if err != nil {
		return err
	}
	target, targetPath, err := loadTarget(root, targetKey)
	if err != nil {
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
	if err := validateLocalTools(root, manifest); err != nil {
		return err
	}

	bundles := make([]resolvedBundle, 0, len(target.Bundles))
	required := make([]schemareleases.RequiredBundle, 0, len(target.Bundles))
	for _, path := range target.Bundles {
		bundle, err := loadBundle(root, path)
		if err != nil {
			return err
		}
		if err := bundle.validateAgainst(target); err != nil {
			return err
		}
		if err := runCopya(root, target, bundle, false, "", nil); err != nil {
			return fmt.Errorf("validate bundle %s: %w", path, err)
		}
		bundles = append(bundles, bundle)
		required = append(required, schemareleases.RequiredBundle{
			TargetKey: target.TargetKey, ID: bundle.Metadata.ID, Version: bundle.Metadata.Version,
			Digest: bundle.Digest, SchemaRelease: release,
		})
	}

	envPath := filepath.Join(root, filepath.FromSlash(target.Database.EnvFile))
	values, err := loadEnvironment(envPath)
	if err != nil {
		return fmt.Errorf("load target environment: %w", err)
	}
	config, err := configFromEnvironment(values, target.Database.Name)
	if err != nil {
		return err
	}
	if (target.Scope == "local" || target.Scope == "disposable") && !config.loopback() {
		return errors.New("local/disposable target must configure a loopback database host")
	}

	admin, err := openDatabase(config, "postgres")
	if err != nil {
		return fmt.Errorf("connect PostgreSQL control database: %w", err)
	}
	defer admin.Close()
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
	args := []string{"run", "./cmd/copya-bundle", "--manifest", bundle.Path, "--target", target.TargetKey, "--schema-release", target.SchemaRelease}
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
