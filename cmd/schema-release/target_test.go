package main

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

func TestTargetSafetyAndReleaseSelection(t *testing.T) {
	root := repositoryRootForTest(t)
	target, _, err := loadTarget(root, "mmis/local-education2")
	if err != nil {
		t.Fatal(err)
	}
	if target.SchemaRelease != "postgres/2026.09.2" || target.Database.Name != "education2" || target.SeedProfile != "client-minimal" {
		t.Fatalf("unexpected target: %+v", target)
	}
	if target.Scope != "disposable" || !target.AllowCreate || !target.ExpectedEmpty {
		t.Fatal("disposable target must explicitly authorize create-if-absent and expected-empty")
	}
	if len(target.Bundles) != 0 {
		t.Fatalf("schema-only education target unexpectedly selects data bundles: %+v", target.Bundles)
	}
}

func TestTargetCatalogProofSeparatesCanonicalAndLegacyPaths(t *testing.T) {
	digestA := strings.Repeat("a", 64)
	digestB := strings.Repeat("b", 64)
	proof := upgradeTarget{
		CatalogMode:                "base_overlay",
		FromBaseCatalogFingerprint: digestA,
		ToBaseCatalogFingerprint:   digestB,
		OverlayID:                  "supabase-mmis-rls-v1",
		FromOverlayFingerprint:     strings.Repeat("c", 64),
		ToOverlayFingerprint:       strings.Repeat("d", 64),
	}
	if err := proof.validateCatalogProof(); err != nil {
		t.Fatal(err)
	}
	if base, overlay, ok := proof.catalogProof("from"); !ok || base != digestA || overlay != proof.FromOverlayFingerprint {
		t.Fatalf("from proof = %q/%q/%t", base, overlay, ok)
	}
	if base, overlay, ok := proof.catalogProof("to"); !ok || base != digestB || overlay != proof.ToOverlayFingerprint {
		t.Fatalf("to proof = %q/%q/%t", base, overlay, ok)
	}
	if _, _, ok := proof.catalogProof("other"); ok {
		t.Fatal("unknown catalog proof phase accepted")
	}

	for name, invalid := range map[string]upgradeTarget{
		"missing mode fields": {CatalogMode: "base_overlay", OverlayID: proof.OverlayID, FromBaseCatalogFingerprint: digestA, ToBaseCatalogFingerprint: digestB, FromOverlayFingerprint: proof.FromOverlayFingerprint},
		"fresh with overlay":  {CatalogMode: "fresh", OverlayID: proof.OverlayID},
		"unknown mode":        {CatalogMode: "platform", FromBaseCatalogFingerprint: digestA, ToBaseCatalogFingerprint: digestB, OverlayID: proof.OverlayID, FromOverlayFingerprint: proof.FromOverlayFingerprint, ToOverlayFingerprint: proof.ToOverlayFingerprint},
	} {
		t.Run(name, func(t *testing.T) {
			if err := invalid.validateCatalogProof(); err == nil {
				t.Fatal("invalid target catalog proof accepted")
			}
		})
	}
}

func TestMMISLegacyForwardUpgradeContractBindsReviewedProof(t *testing.T) {
	from, fromRaw, err := schemareleases.Load("postgres/2026.09.2")
	if err != nil {
		t.Fatal(err)
	}
	to, _, err := schemareleases.Load("postgres/2026.09.3")
	if err != nil {
		t.Fatal(err)
	}

	target := targetManifest{
		FormatVersion: 1,
		TargetKey:     "mmis/production",
		Scope:         "remote",
		SchemaRelease: to.Release,
		Database:      targetDatabase{EnvFile: "deploy/mmis/.env.postgres-production.local", Name: "postgres"},
		BusinessType:  "education",
		Workspace:     targetWorkspace{ID: "019ecb8e-d83f-74ab-aa13-5a6c27afd112", Slug: "mmis"},
		SeedProfile:   "client-minimal",
		Upgrade: &upgradeTarget{
			ConnectionMode:             "session",
			FromRelease:                from.Release,
			Endpoint:                   "aws-0-ap-southeast-1.pooler.supabase.com:5432",
			ConnectionUser:             "mmis_migrator",
			MigrationRole:              "mmis_migrator",
			RuntimeRole:                "mmis_runtime",
			BackupMaxAgeHours:          24,
			CatalogMode:                "base_overlay",
			FromBaseCatalogFingerprint: "41cbc1fabf2965091f759c9411a49c4f057241921c8ee793e367b93ca146318a",
			ToBaseCatalogFingerprint:   "cdf99e2b4295ca8914831bad8f58b25e6c308ef1f5b7f37096375df1590b74e5",
			OverlayID:                  "supabase-mmis-rls-v1",
			FromOverlayFingerprint:     "97f513201c560b0613d782768e6f55c494c8bf75f0f3f6235796761355b1d4a0",
			ToOverlayFingerprint:       "5ebeacb13c6653deb7d687ad88f0c9ee6f60c98b513070fa787162cae9668700",
		},
	}
	if err := target.validate(target.TargetKey); err != nil {
		t.Fatal(err)
	}
	config := databaseConfig{
		Host:        "aws-0-ap-southeast-1.pooler.supabase.com",
		Port:        "5432",
		User:        "mmis_migrator",
		SSLMode:     "verify-full",
		SSLRootCert: "/reviewed/supabase-ca.pem",
	}
	if err := target.validateUpgrade(from.Release, config); err != nil {
		t.Fatal(err)
	}
	proof, err := to.UpgradeFrom(from, fromRaw, "7cbfa83c39a99f75e4806cafa3996febc8239fd081fe409f5c0fa8950013b8ed")
	if err != nil {
		t.Fatal(err)
	}
	if proof.TrackerFingerprint != "26eb25b7a97a3b3433c2224594ae319da59f6b2d2b54387d9dcc8ad6b1b61b8c" || proof.TrackerRevisionCount != 13 {
		t.Fatalf("unexpected MMIS legacy destination proof: %+v", proof)
	}
	base, overlay, ok := target.Upgrade.catalogProof("to")
	if !ok || base != target.Upgrade.ToBaseCatalogFingerprint || overlay != target.Upgrade.ToOverlayFingerprint {
		t.Fatalf("destination catalog proof = %q/%q/%t", base, overlay, ok)
	}
}

func TestSchemaOnlyTargetKeepsBundleCompatibilityOptional(t *testing.T) {
	root := repositoryRootForTest(t)
	target, _, err := loadTarget(root, "mmis/local-education2")
	if err != nil {
		t.Fatal(err)
	}
	manifest, _, err := schemareleases.Load(target.SchemaRelease)
	if err != nil {
		t.Fatal(err)
	}
	bootstrap, err := schemareleases.BootstrapBytes(manifest)
	if err != nil {
		t.Fatal(err)
	}
	if sha256Hex(bootstrap) != manifest.Bootstrap.SHA256 {
		t.Fatal("schema bootstrap did not remain owned solely by the release manifest")
	}
}

func TestLeasingTargetSafetyAndBundleSelection(t *testing.T) {
	root := repositoryRootForTest(t)
	target, _, err := loadTarget(root, "gpagoda/local-leasing1")
	if err != nil {
		t.Fatal(err)
	}
	if target.SchemaRelease != "postgres/2026.08.1" || target.Database.Name != "leasing1" || target.SeedProfile != "client-minimal" {
		t.Fatalf("unexpected target: %+v", target)
	}
	if target.Scope != "local" || !target.AllowCreate || !target.ExpectedEmpty {
		t.Fatal("local target must explicitly authorize create-if-absent and expected-empty")
	}
	if len(target.Bundles) == 0 {
		t.Fatal("leasing target must select a data bundle")
	}
	bundle, err := loadBundle(root, target.Bundles[0])
	if err != nil {
		t.Fatal(err)
	}
	if err := bundle.validateAgainst(target); err != nil {
		t.Fatal(err)
	}

	otherBusiness := target
	otherBusiness.BusinessType = "professional"
	if err := bundle.validateAgainst(otherBusiness); err == nil {
		t.Fatal("leasing bundle unexpectedly matched a professional target")
	}
}

func TestTargetRejectsTraversalAndRemoteCreate(t *testing.T) {
	if safeRelativePath("../secret") || safeRelativePath("/absolute") {
		t.Fatal("unsafe paths accepted")
	}
	target := targetManifest{
		FormatVersion: 1, TargetKey: "client/prod", Scope: "remote", AllowCreate: true, ExpectedEmpty: true,
		SchemaRelease: "postgres/2026.08.1", Database: targetDatabase{EnvFile: "app/.env", Name: "prod"},
		BusinessType: "leasing", Workspace: targetWorkspace{ID: "w", Slug: "client"}, SeedProfile: "client-minimal", Bundles: []string{"deploy/client/bundle.json"},
	}
	if err := target.validate("client/prod"); err == nil {
		t.Fatal("remote create target must fail")
	}
}

func TestEnvironmentFileDoesNotOverrideProcess(t *testing.T) {
	directory := t.TempDir()
	path := filepath.Join(directory, ".env")
	if err := os.WriteFile(path, []byte("DATABASE_POSTGRES_USER=file-user\n"), 0o600); err != nil {
		t.Fatal(err)
	}
	values, err := loadEnvironment(path)
	if err != nil {
		t.Fatal(err)
	}
	t.Setenv("DATABASE_POSTGRES_USER", "process-user")
	if got := valueFor(values, "DATABASE_POSTGRES_USER", ""); got != "process-user" {
		t.Fatalf("got %q", got)
	}
}

func repositoryRootForTest(t *testing.T) string {
	t.Helper()
	directory, err := os.Getwd()
	if err != nil {
		t.Fatal(err)
	}
	for {
		if _, err := os.Stat(filepath.Join(directory, "go.work")); err == nil {
			return directory
		}
		parent := filepath.Dir(directory)
		if parent == directory {
			t.Fatal("go.work not found")
		}
		directory = parent
	}
}
