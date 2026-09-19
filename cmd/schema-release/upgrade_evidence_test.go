package main

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

func TestUpgradeTargetRequiresExactIdentity(t *testing.T) {
	base := targetManifest{Scope: "remote", SchemaRelease: "postgres/2026.09.1", Upgrade: &upgradeTarget{ConnectionMode: "session", FromRelease: "postgres/2026.08.1", Endpoint: "db.example.test:5432", MigrationRole: "migrator", RuntimeRole: "runtime", BackupMaxAgeHours: 24}}
	config := databaseConfig{Host: "db.example.test", Port: "5432", User: "migrator", SSLMode: "verify-full", SSLRootCert: "/reviewed/root-ca.crt"}
	if err := base.validateUpgrade(base.Upgrade.FromRelease, config); err != nil {
		t.Fatal(err)
	}
	for _, name := range []string{"host", "port", "TLS", "role", "same role", "empty", "create", "source", "backup age", "local remote host", "pooling", "trust"} {
		t.Run(name, func(t *testing.T) {
			target := base
			policy := *base.Upgrade
			target.Upgrade = &policy
			c := config
			switch name {
			case "pooling":
				target.Upgrade.ConnectionMode = "transaction"
			case "trust":
				c.SSLRootCert = ""
			case "host":
				c.Host = "other.example.test"
			case "port":
				c.Port = "6432"
			case "TLS":
				c.SSLMode = "require"
			case "role":
				c.User = "runtime"
			case "same role":
				target.Upgrade.RuntimeRole = "migrator"
			case "empty":
				target.ExpectedEmpty = true
			case "create":
				target.AllowCreate = true
			case "source":
				target.Upgrade.FromRelease = "postgres/2026.07.1"
			case "backup age":
				target.Upgrade.BackupMaxAgeHours = 0
			case "local remote host":
				target.Scope = "local"
			}
			if err := target.validateUpgrade("postgres/2026.08.1", c); err == nil {
				t.Fatal("unsafe target accepted")
			}
		})
	}
}

func TestBackupReceiptBindsExactPlanAndFreshEvidence(t *testing.T) {
	now := time.Date(2026, 9, 18, 0, 0, 0, 0, time.UTC)
	plan := upgradePlan{FormatVersion: 1, TargetKey: "client/staging", Database: "business", Endpoint: "db.example.test:5432", FromRelease: "postgres/2026.08.1", FromTracker: strings.Repeat("a", 64), FromCatalog: strings.Repeat("b", 64)}
	digest, _ := plan.digest()
	base := backupReceipt{FormatVersion: 1, TargetKey: plan.TargetKey, Database: plan.Database, Endpoint: plan.Endpoint, FromRelease: plan.FromRelease, PlanSHA256: digest, TrackerFingerprint: plan.FromTracker, CatalogFingerprint: plan.FromCatalog, ArchiveSHA256: strings.Repeat("c", 64), ArchiveListSHA256: strings.Repeat("d", 64), CreatedAt: now.Add(-time.Hour).Format(time.RFC3339), RestoreVerifiedAt: now.Add(-time.Minute).Format(time.RFC3339), RestoreEvidenceRef: "change-123/restore-1"}
	if err := base.validate(plan, 24, now); err != nil {
		t.Fatal(err)
	}
	for _, name := range []string{"target", "plan", "tracker", "catalog", "stale", "future", "restore ordering", "missing restore proof", "archive digest"} {
		t.Run(name, func(t *testing.T) {
			r := base
			switch name {
			case "target":
				r.Database = "another"
			case "plan":
				r.PlanSHA256 = strings.Repeat("e", 64)
			case "tracker":
				r.TrackerFingerprint = "unknown"
			case "catalog":
				r.CatalogFingerprint = "unknown"
			case "stale":
				r.CreatedAt = now.Add(-48 * time.Hour).Format(time.RFC3339)
			case "future":
				r.CreatedAt = now.Add(time.Hour).Format(time.RFC3339)
			case "restore ordering":
				r.RestoreVerifiedAt = now.Add(-2 * time.Hour).Format(time.RFC3339)
			case "missing restore proof":
				r.RestoreEvidenceRef = ""
			case "archive digest":
				r.ArchiveSHA256 = ""
			}
			if err := r.validate(plan, 24, now); err == nil {
				t.Fatal("unverified backup accepted")
			}
		})
	}
}

func TestUpgradeApprovalInvalidatedByPlanChanges(t *testing.T) {
	plan := upgradePlan{TargetKey: "client/prod", Migrations: []migrationFile{{Name: "20260918000000_add.sql", SHA256: strings.Repeat("a", 64)}}}
	digest, _ := plan.digest()
	if err := requireUpgradeApproval(plan, digest, "CHG-123"); err != nil {
		t.Fatal(err)
	}
	if err := requireUpgradeApproval(plan, digest, ""); err == nil {
		t.Fatal("missing operator approval accepted")
	}
	plan.Migrations[0].SHA256 = strings.Repeat("b", 64)
	if err := requireUpgradeApproval(plan, digest, "CHG-123"); err == nil {
		t.Fatal("stale approval accepted after SQL change")
	}
}

func TestBackupEvidenceCannotResolveInsideRepository(t *testing.T) {
	root, outside := t.TempDir(), t.TempDir()
	path := filepath.Join(root, "backup.dump")
	if err := os.WriteFile(path, []byte("private archive"), 0o600); err != nil {
		t.Fatal(err)
	}
	if err := externalRegularFile(root, path); err == nil {
		t.Fatal("archive in repository accepted")
	}
	link := filepath.Join(outside, "link.dump")
	if err := os.Symlink(path, link); err != nil {
		t.Fatal(err)
	}
	if err := externalRegularFile(root, link); err == nil {
		t.Fatal("symlink into repository accepted")
	}
}
