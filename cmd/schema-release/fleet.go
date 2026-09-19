package main

import (
	"bytes"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

type fleetRegistry struct {
	FormatVersion int           `json:"format_version"`
	Targets       []fleetTarget `json:"targets"`
}

type fleetTarget struct {
	Key          string `json:"key"`
	Path         string `json:"path"`
	SHA256       string `json:"sha256"`
	Scope        string `json:"scope"`
	Environment  string `json:"environment"`
	RolloutBatch int    `json:"rollout_batch"`
}

func repositoryRegularBytes(root, path string) ([]byte, error) {
	info, err := os.Lstat(path)
	if err != nil || !info.Mode().IsRegular() {
		return nil, errors.New("fleet input must be a regular file")
	}
	actual, err := filepath.EvalSymlinks(path)
	if err != nil {
		return nil, err
	}
	actualRoot, err := filepath.EvalSymlinks(root)
	if err != nil {
		return nil, err
	}
	if !insidePath(actualRoot, actual) {
		return nil, errors.New("fleet input resolves outside repository")
	}
	return os.ReadFile(path)
}

func requireCommittedBytes(root, path string, raw []byte, revision string) error {
	top, err := exec.Command("git", "-C", root, "rev-parse", "--show-toplevel").Output()
	actualRoot, rootErr := filepath.EvalSymlinks(root)
	if err != nil || rootErr != nil {
		return errors.New("apply requires a committed repository checkout")
	}
	gitRoot, err := filepath.EvalSymlinks(string(bytes.TrimSpace(top)))
	if err != nil || gitRoot != actualRoot {
		return errors.New("target root is not the selected Git repository")
	}
	relative, err := filepath.Rel(root, path)
	if err != nil || !safeRelativePath(relative) {
		return errors.New("invalid committed fleet path")
	}
	committed, err := exec.Command("git", "-C", root, "show", revision+":"+filepath.ToSlash(relative)).Output()
	if err != nil || !bytes.Equal(committed, raw) {
		return errors.New("apply requires fleet, target and bundle bytes to match HEAD; commit through the authorized release workflow first")
	}
	return nil
}

// Planning may inspect a proposed registry; apply and remote deploy verification
// require the exact registry/target/bundle inputs already present in HEAD.
func bindFleetTarget(root string, target *targetManifest, targetPath string, committed bool) error {
	path := filepath.Join(root, "deploy/database-fleet.json")
	raw, err := repositoryRegularBytes(root, path)
	if err != nil {
		return err
	}
	var registry fleetRegistry
	if err := decodeStrict(raw, &registry); err != nil {
		return fmt.Errorf("decode fleet registry: %w", err)
	}
	if registry.FormatVersion != 1 || len(registry.Targets) == 0 {
		return errors.New("invalid or empty fleet registry")
	}
	seen := map[string]bool{}
	var selected *fleetTarget
	for i := range registry.Targets {
		entry := &registry.Targets[i]
		if !targetKeyPattern.MatchString(entry.Key) || seen[entry.Key] || !evidenceDigestPattern.MatchString(entry.SHA256) || entry.RolloutBatch < 0 {
			return errors.New("invalid/duplicate fleet target")
		}
		seen[entry.Key] = true
		parts := bytes.Split([]byte(entry.Key), []byte("/"))
		expected := fmt.Sprintf("deploy/%s/database/targets/%s.json", parts[0], parts[1])
		if entry.Path != expected {
			return errors.New("fleet target path is not canonical")
		}
		switch entry.Environment {
		case "local", "ci", "staging", "canary", "production":
		default:
			return errors.New("unknown fleet environment")
		}
		switch entry.Scope {
		case "local", "disposable", "remote":
		default:
			return errors.New("unknown fleet scope")
		}
		if (entry.Scope == "local" && entry.Environment != "local") || (entry.Scope == "disposable" && entry.Environment != "local" && entry.Environment != "ci") || (entry.Scope == "remote" && entry.Environment != "staging" && entry.Environment != "canary" && entry.Environment != "production") {
			return errors.New("fleet environment conflicts with target scope")
		}
		if entry.Key == target.TargetKey {
			selected = entry
		}
	}
	if selected == nil {
		return errors.New("target is not allow-listed in fleet registry")
	}
	if filepath.Clean(targetPath) != filepath.Join(root, filepath.FromSlash(selected.Path)) || selected.Scope != target.Scope {
		return errors.New("fleet target path/scope mismatch")
	}
	targetRaw, err := repositoryRegularBytes(root, targetPath)
	if err != nil {
		return err
	}
	if sha256Hex(targetRaw) != selected.SHA256 || target.rawDigest != selected.SHA256 {
		return errors.New("fleet target checksum mismatch; review registry and target together")
	}
	revision := ""
	if committed {
		value, err := exec.Command("git", "-C", root, "rev-parse", "--verify", "HEAD^{commit}").Output()
		if err != nil {
			return errors.New("apply requires a committed fleet checkout")
		}
		revision = string(bytes.TrimSpace(value))
		for _, input := range []struct {
			path string
			raw  []byte
		}{{path, raw}, {targetPath, targetRaw}} {
			if err := requireCommittedBytes(root, input.path, input.raw, revision); err != nil {
				return err
			}
		}
	}
	target.bundleDigests = make(map[string]string, len(target.Bundles))
	for _, bundlePath := range target.Bundles {
		absolute := filepath.Join(root, bundlePath)
		bundleRaw, err := repositoryRegularBytes(root, absolute)
		if err != nil {
			return err
		}
		if committed {
			if err := requireCommittedBytes(root, absolute, bundleRaw, revision); err != nil {
				return err
			}
		}
		target.bundleDigests[absolute] = sha256Hex(bundleRaw)
	}

	target.fleetDigest, target.fleetPath = sha256Hex(raw), path
	return nil
}
