package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"time"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

func completedUpgradeProof(to, from schemareleases.Manifest, fromRaw []byte, tracker string) (schemareleases.UpgradeProof, error) {
	if to.Compatibility != nil {
		for _, candidate := range to.Compatibility.Upgrades {
			if candidate.TrackerFingerprint != tracker || candidate.FromRelease != from.Release {
				continue
			}
			proof, err := to.UpgradeFrom(from, fromRaw, candidate.FromTrackerFingerprint)
			if err == nil && proof == candidate {
				return proof, nil
			}
		}
	}
	return schemareleases.UpgradeProof{}, errors.New("destination history does not prove the selected predecessor transition; use --verify for readiness")
}

type upgradeIntent struct {
	FormatVersion int         `json:"format_version"`
	Plan          upgradePlan `json:"plan"`
	PlanSHA256    string      `json:"plan_sha256"`
	BackupSHA256  string      `json:"backup_receipt_sha256"`
	ApprovalRef   string      `json:"approval_ref"`
	CreatedAt     string      `json:"created_at"`
}

// Completed upgrades recover their pre-migration observations from the original
// intent, never from destination data. The reconstructed plan must still match
// the operator's approved digest before receipt reconciliation can proceed.
func readUpgradeIntent(root string, values map[string]string, digest string) (upgradeIntent, error) {
	if !evidenceDigestPattern.MatchString(digest) {
		return upgradeIntent{}, errors.New("completed upgrade requires the original approved plan and intent; use --verify for readiness")
	}
	directory := valueFor(values, "DB_INIT_RECEIPT_DIR", "")
	if directory == "" {
		directory = filepath.Join(os.TempDir(), "ichizen-db-init-receipts")
	}
	path := filepath.Join(directory, "upgrade-intent-"+digest+".json")
	if err := externalRegularFile(root, path); err != nil {
		return upgradeIntent{}, errors.New("original upgrade intent is absent or invalid")
	}
	raw, err := os.ReadFile(path)
	if err != nil {
		return upgradeIntent{}, err
	}
	var intent upgradeIntent
	if err := decodeStrict(raw, &intent); err != nil {
		return upgradeIntent{}, errors.New("invalid original upgrade intent")
	}
	actual, err := intent.Plan.digest()
	if err != nil || intent.FormatVersion != 1 || intent.PlanSHA256 != digest || actual != digest {
		return upgradeIntent{}, errors.New("original intent plan checksum mismatch")
	}
	return intent, nil
}

// An intent is persisted before Atlas can commit. Recovery requires the exact
// original plan and evidence; a destination fingerprint alone is not an audit
// record of an authorized migration. It never starts a migration during recovery.
func ensureUpgradeIntent(root string, values map[string]string, target targetManifest, plan upgradePlan, options upgradeOptions, completed bool) (string, error) {
	if err := preflightUpgradeReceiptDirectory(root, values, target); err != nil {
		return "", err
	}
	directory := valueFor(values, "DB_INIT_RECEIPT_DIR", "")
	if directory == "" {
		directory = filepath.Join(os.TempDir(), "ichizen-db-init-receipts")
	}
	digest, err := plan.digest()
	if err != nil {
		return "", err
	}
	path := filepath.Join(directory, "upgrade-intent-"+digest+".json")
	raw, err := os.ReadFile(path)
	if err == nil {
		if err := externalRegularFile(root, path); err != nil {
			return "", err
		}
		var intent upgradeIntent
		if err := decodeStrict(raw, &intent); err != nil {
			return "", errors.New("invalid durable upgrade intent")
		}
		actual, err := intent.Plan.digest()
		_, timeErr := time.Parse(time.RFC3339Nano, intent.CreatedAt)
		if err != nil || timeErr != nil || intent.FormatVersion != 1 || actual != digest || intent.PlanSHA256 != digest || intent.BackupSHA256 != options.BackupSHA256 || intent.ApprovalRef != options.ApprovalRef {
			return "", errors.New("durable intent does not match reviewed upgrade evidence")
		}
		return sha256Hex(raw), nil
	}
	if !os.IsNotExist(err) {
		return "", err
	}
	if completed {
		return "", errors.New("completed transition has no durable intent; preserve evidence and reconcile manually")
	}
	intent := upgradeIntent{1, plan, digest, options.BackupSHA256, options.ApprovalRef, time.Now().UTC().Format(time.RFC3339Nano)}
	raw, err = json.MarshalIndent(intent, "", "  ")
	if err != nil {
		return "", err
	}
	raw = append(raw, '\n')
	file, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0o400)
	if err != nil {
		return "", err
	}
	// On any persistence failure retain the partial record and refuse automatic
	// retry. Removing it could erase evidence after an ambiguous filesystem error.
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
	fmt.Fprintf(os.Stderr, "durable upgrade intent: %s sha256=%s\n", path, sha256Hex(raw))
	return sha256Hex(raw), nil
}
