package main

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

func TestCompletedUpgradeRequiresSelectedSource(t *testing.T) {
	from, raw, err := schemareleases.Load("postgres/2026.08.1")
	if err != nil {
		t.Fatal(err)
	}
	to := from
	to.FormatVersion = 2
	to.Release = "postgres/2026.09.1"
	to.Atlas.Head = "20260918000000"
	to.Atlas.RevisionCount++
	to.Atlas.TrackerFingerprint = strings.Repeat("a", 64)
	proof := schemareleases.UpgradeProof{FromRelease: from.Release, FromManifestSHA256: sha256Hex(raw), FromTrackerFingerprint: from.Atlas.TrackerFingerprint, TrackerFingerprint: strings.Repeat("b", 64)}
	to.Compatibility = &schemareleases.Compatibility{Phase: "expand", APIReference: "v0.1.0", MinimumOperatorVersion: 2, Oracles: []string{"catalog"}, Upgrades: []schemareleases.UpgradeProof{proof}}
	if _, err := completedUpgradeProof(to, from, raw, proof.TrackerFingerprint); err != nil {
		t.Fatal(err)
	}
	for _, tracker := range []string{to.Atlas.TrackerFingerprint, strings.Repeat("c", 64), from.Atlas.TrackerFingerprint} {
		if _, err := completedUpgradeProof(to, from, raw, tracker); err == nil {
			t.Fatal("accepted a history outside selected transition")
		}
	}
	to.Compatibility.Upgrades[0].FromRelease = "postgres/2026.07.1"
	if _, err := completedUpgradeProof(to, from, raw, proof.TrackerFingerprint); err == nil {
		t.Fatal("accepted another predecessor")
	}
}

func TestUpgradeIntentRecoveryRequiresOriginalEvidence(t *testing.T) {
	root, directory := t.TempDir(), t.TempDir()
	t.Setenv("DB_INIT_RECEIPT_DIR", directory)
	target := targetManifest{Scope: "local"}
	plan := upgradePlan{FormatVersion: 1, TargetKey: "test/disposable", FromRelease: "postgres/2026.08.1", ToRelease: "postgres/2026.09.1"}
	options := upgradeOptions{BackupSHA256: strings.Repeat("a", 64), ApprovalRef: "review-123"}
	if _, err := ensureUpgradeIntent(root, nil, target, plan, options, true); err == nil {
		t.Fatal("recovered without original intent")
	}
	digest, err := ensureUpgradeIntent(root, nil, target, plan, options, false)
	if err != nil {
		t.Fatal(err)
	}
	// Simulate loss of process state after commit: only the external intent and
	// original arguments remain. Recovery must not rewrite the intent.
	entries, err := os.ReadDir(directory)
	if err != nil || len(entries) != 1 {
		t.Fatalf("intent files: %v %v", entries, err)
	}
	path := filepath.Join(directory, entries[0].Name())
	before, _ := os.ReadFile(path)
	recovered, err := ensureUpgradeIntent(root, nil, target, plan, options, true)
	if err != nil || recovered != digest {
		t.Fatalf("recovery: %s %v", recovered, err)
	}
	after, _ := os.ReadFile(path)
	if string(before) != string(after) {
		t.Fatal("recovery rewrote intent")
	}
	options.ApprovalRef = "different-review"
	if _, err := ensureUpgradeIntent(root, nil, target, plan, options, true); err == nil {
		t.Fatal("accepted different authorization")
	}
	options.ApprovalRef = "review-123"
	options.BackupSHA256 = strings.Repeat("b", 64)
	if _, err := ensureUpgradeIntent(root, nil, target, plan, options, true); err == nil {
		t.Fatal("accepted different backup")
	}
}

func TestTargetSnapshotRejectsConcurrentEdit(t *testing.T) {
	path := filepath.Join(t.TempDir(), "target.json")
	original := []byte(`{"target_key":"test/one"}`)
	if err := os.WriteFile(path, original, 0600); err != nil {
		t.Fatal(err)
	}
	target := targetManifest{rawDigest: sha256Hex(original)}
	if _, err := targetSnapshotDigest(target, path); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(path, []byte(`{"target_key":"test/two"}`), 0600); err != nil {
		t.Fatal(err)
	}
	if _, err := targetSnapshotDigest(target, path); err == nil {
		t.Fatal("accepted changed target bytes")
	}
}
