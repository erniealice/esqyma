package main

import (
	"encoding/json"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"
)

// All Git writes are restricted to a fresh test temp repository. Never invoked
// with the application checkout as root; no real repository is committed.
func commitFleetFixture(t *testing.T, root string, paths ...string) {
	t.Helper()
	run := func(args ...string) {
		t.Helper()
		args = append([]string{"-C", root, "-c", "core.hooksPath=/dev/null", "-c", "commit.gpgsign=false", "-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid"}, args...)
		if _, err := exec.Command("git", args...).CombinedOutput(); err != nil {
			t.Fatal("fixture git command failed")
		}
	}
	if _, err := os.Stat(filepath.Join(root, ".git")); os.IsNotExist(err) {
		run("init", "--quiet")
	}
	run(append([]string{"add", "--"}, paths...)...)
	run("commit", "--quiet", "-m", "synthetic fleet fixture")
}

func TestFleetSelectionRequiresAllowListAndCommittedBytes(t *testing.T) {
	root := t.TempDir()
	path := filepath.Join(root, "deploy/test/database/targets/local.json")
	if err := os.MkdirAll(filepath.Dir(path), 0700); err != nil {
		t.Fatal(err)
	}
	raw := []byte(`{"target_key":"test/local"}`)
	if err := os.WriteFile(path, raw, 0600); err != nil {
		t.Fatal(err)
	}
	bundlePath := "deploy/test/database/fixture.json"
	if err := os.WriteFile(filepath.Join(root, bundlePath), []byte("{}"), 0600); err != nil {
		t.Fatal(err)
	}
	target := targetManifest{TargetKey: "test/local", Scope: "local", rawDigest: sha256Hex(raw), Bundles: []string{bundlePath}}
	entry := fleetTarget{Key: target.TargetKey, Path: "deploy/test/database/targets/local.json", SHA256: sha256Hex(raw), Scope: "local", Environment: "local", RolloutBatch: 0}
	fleetPath := filepath.Join(root, "deploy/database-fleet.json")
	writeFleet := func(entries []fleetTarget) {
		t.Helper()
		body, _ := json.Marshal(fleetRegistry{FormatVersion: 1, Targets: entries})
		if err := os.WriteFile(fleetPath, body, 0600); err != nil {
			t.Fatal(err)
		}
	}
	writeFleet([]fleetTarget{entry})
	if err := bindFleetTarget(root, &target, path, false); err != nil {
		t.Fatal(err)
	}
	if err := bindFleetTarget(root, &target, path, true); err == nil {
		t.Fatal("uncommitted apply accepted")
	}
	commitFleetFixture(t, root, "deploy/database-fleet.json", entry.Path, bundlePath)
	if err := bindFleetTarget(root, &target, path, true); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(root, bundlePath), []byte("{}\n"), 0600); err != nil {
		t.Fatal(err)
	}
	if err := bindFleetTarget(root, &target, path, true); err == nil {
		t.Fatal("uncommitted bundle accepted")
	}
	if err := os.WriteFile(filepath.Join(root, bundlePath), []byte("{}"), 0600); err != nil {
		t.Fatal(err)
	}
	if err := bindFleetTarget(root, &target, path, true); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(root, bundlePath), []byte("{}\n"), 0600); err != nil {
		t.Fatal(err)
	}
	changedBundle, err := loadBundle(root, bundlePath)
	if err != nil {
		t.Fatal(err)
	}
	if err := changedBundle.validateAgainst(target); err == nil || !strings.Contains(err.Error(), "bundle changed after fleet selection") {
		t.Fatalf("bundle snapshot drift not rejected: %v", err)
	}
	if err := os.WriteFile(filepath.Join(root, bundlePath), []byte("{}"), 0600); err != nil {
		t.Fatal(err)
	}
	for _, kind := range []string{"missing", "duplicate", "hash", "path", "scope", "environment", "uncommitted registry"} {
		t.Run(kind, func(t *testing.T) {
			changed := entry
			entries := []fleetTarget{entry}
			committed := false
			switch kind {
			case "missing":
				changed.Key = "test/other"
				changed.Path = "deploy/test/database/targets/other.json"
				entries = []fleetTarget{changed}
			case "duplicate":
				entries = append(entries, entry)
			case "hash":
				changed.SHA256 = sha256Hex([]byte("different"))
				entries = []fleetTarget{changed}
			case "path":
				changed.Path = "../external.json"
				entries = []fleetTarget{changed}
			case "scope":
				changed.Scope = "remote"
				entries = []fleetTarget{changed}
			case "environment":
				changed.Environment = "production"
				entries = []fleetTarget{changed}
			case "uncommitted registry":
				changed.RolloutBatch = 1
				entries = []fleetTarget{changed}
				committed = true
			}
			writeFleet(entries)
			if err := bindFleetTarget(root, &target, path, committed); err == nil {
				t.Fatal("invalid fleet selection accepted")
			}
		})
	}
	writeFleet([]fleetTarget{entry})
	if err := bindFleetTarget(root, &target, path, false); err != nil {
		t.Fatal(err)
	}
	changed := entry
	changed.RolloutBatch = 2
	writeFleet([]fleetTarget{changed})
	if _, err := targetSnapshotDigest(target, path); err == nil {
		t.Fatal("registry change after selection ignored")
	}
}
