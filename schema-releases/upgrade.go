package schemareleases

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"reflect"
)

// Compatibility describes reviewed release transitions, not a database-owned
// version marker. Each proof binds an exact predecessor installation history to
// one exact resulting history. Fresh installation uses Atlas.TrackerFingerprint.
type Compatibility struct {
	DataOracles            []DataOracle         `json:"data_oracles,omitempty"`
	LegacyInstallations    []LegacyInstallation `json:"legacy_installations,omitempty"`
	Phase                  string               `json:"phase"`
	APIReference           string               `json:"api_reference"`
	MinimumOperatorVersion int                  `json:"minimum_operator_version"`
	Oracles                []string             `json:"oracles"`
	Upgrades               []UpgradeProof       `json:"upgrades"`
}

// LegacyInstallation is an explicit proof for a database whose schema matches
// this release but whose Atlas ledger was adopted from an older/partial
// history. It is intentionally bound to the exact tracker row count and
// fingerprint; an Atlas head by itself is never sufficient.
type LegacyInstallation struct {
	TrackerRevisionCount int    `json:"tracker_revision_count"`
	TrackerFingerprint   string `json:"tracker_fingerprint"`
}

type UpgradeProof struct {
	FromRelease            string `json:"from_release"`
	FromManifestSHA256     string `json:"from_manifest_sha256"`
	FromTrackerFingerprint string `json:"from_tracker_fingerprint"`
	TrackerRevisionCount   int    `json:"tracker_revision_count,omitempty"`
	TrackerFingerprint     string `json:"tracker_fingerprint"`
}

func (m Manifest) validateCompatibility() error {
	if m.FormatVersion == 1 {
		if m.Compatibility != nil || len(m.SeedContract.CompatibleSchemaReleases) != 0 {
			return errors.New("v1 release cannot declare v2 compatibility")
		}
		return nil
	}
	c := m.Compatibility
	if c == nil || (c.Phase != "expand" && c.Phase != "contract") || c.APIReference == "" || c.MinimumOperatorVersion < 2 {
		return errors.New("v2 release requires phase, API reference and minimum operator version")
	}
	if c.APIReference == m.Release || releasePattern.MatchString(c.APIReference) {
		return errors.New("API reference must not be a schema release identifier")
	}
	if len(c.Oracles) == 0 {
		return errors.New("v2 release requires verification oracles")
	}
	seen := map[string]bool{}
	for _, oracle := range c.Oracles {
		if !namePattern.MatchString(oracle) || seen[oracle] {
			return fmt.Errorf("invalid or duplicate oracle %q", oracle)
		}
		seen[oracle] = true
	}
	dataIDs := map[string]bool{}
	for _, oracle := range c.DataOracles {
		if err := oracle.Validate(); err != nil {
			return err
		}
		if dataIDs[oracle.ID] {
			return errors.New("duplicate data oracle ID")
		}
		dataIDs[oracle.ID] = true
	}
	trackerStates := map[string]int{m.Atlas.TrackerFingerprint: m.Atlas.RevisionCount}
	for _, installation := range c.LegacyInstallations {
		if installation.TrackerRevisionCount < 1 || installation.TrackerRevisionCount > m.Atlas.RevisionCount || !hexPattern.MatchString(installation.TrackerFingerprint) {
			return errors.New("invalid legacy installation proof")
		}
		if _, exists := trackerStates[installation.TrackerFingerprint]; exists {
			return errors.New("duplicate tracker installation proof")
		}
		trackerStates[installation.TrackerFingerprint] = installation.TrackerRevisionCount
	}
	sources := map[string]bool{}
	seen = map[string]bool{}
	for _, proof := range c.Upgrades {
		if !releasePattern.MatchString(proof.FromRelease) || proof.FromRelease == m.Release ||
			!hexPattern.MatchString(proof.FromManifestSHA256) || !hexPattern.MatchString(proof.FromTrackerFingerprint) || !hexPattern.MatchString(proof.TrackerFingerprint) {
			return errors.New("invalid upgrade installation proof")
		}
		if proof.TrackerRevisionCount < 0 || proof.TrackerRevisionCount > m.Atlas.RevisionCount {
			return errors.New("invalid upgraded tracker revision count")
		}
		countForProof := proof.TrackerRevisionCount
		if countForProof == 0 {
			countForProof = m.Atlas.RevisionCount
		}
		if _, exists := trackerStates[proof.TrackerFingerprint]; exists {
			return errors.New("duplicate tracker installation proof")
		}
		trackerStates[proof.TrackerFingerprint] = countForProof
		key := proof.FromRelease + ":" + proof.FromTrackerFingerprint
		if seen[key] {
			return fmt.Errorf("duplicate upgrade source proof %s", key)
		}
		seen[key], sources[proof.FromRelease] = true, true
	}
	seen = map[string]bool{}
	for _, release := range m.SeedContract.CompatibleSchemaReleases {
		if !sources[release] || seen[release] {
			return fmt.Errorf("seed compatibility requires a unique declared predecessor: %q", release)
		}
		seen[release] = true
	}
	return nil
}

// AcceptsTrackerFingerprint permits only the fresh proof or a declared exact
// legacy/upgraded installation proof. Callers must still verify the revision
// head/count and catalog when they have live database state.
func (m Manifest) AcceptsTrackerFingerprint(fingerprint string) bool {
	_, ok := m.trackerStateCount(fingerprint)
	return ok
}

// AcceptsTrackerState verifies the exact tracker row count and fingerprint for
// a fresh, legacy-adopted, or reviewed upgraded installation.
func (m Manifest) AcceptsTrackerState(count int, fingerprint string) bool {
	expected, ok := m.trackerStateCount(fingerprint)
	return ok && count == expected
}

func (m Manifest) trackerStateCount(fingerprint string) (int, bool) {
	if m.Validate() != nil || !hexPattern.MatchString(fingerprint) {
		return 0, false
	}
	if fingerprint == m.Atlas.TrackerFingerprint {
		return m.Atlas.RevisionCount, true
	}
	if m.Compatibility != nil {
		for _, installation := range m.Compatibility.LegacyInstallations {
			if fingerprint == installation.TrackerFingerprint {
				return installation.TrackerRevisionCount, true
			}
		}
		for _, proof := range m.Compatibility.Upgrades {
			if fingerprint == proof.TrackerFingerprint {
				count := proof.TrackerRevisionCount
				if count == 0 {
					count = m.Atlas.RevisionCount
				}
				return count, true
			}
		}
	}
	return 0, false
}

// AcceptsSeedRelease preserves the original receipt identity on an explicitly
// reviewed compatible upgrade; it never rewrites a receipt or relaxes its digest.
func (m Manifest) AcceptsSeedRelease(release string) bool {
	if m.Validate() != nil {
		return false
	}
	return release == m.Release || contains(m.SeedContract.CompatibleSchemaReleases, release)
}

// UpgradeFrom selects a source-bound proof only after verifying the caller's
// predecessor manifest bytes and observed predecessor tracker. The runner must
// additionally prove the migration prefix and the live predecessor catalog.
func (m Manifest) UpgradeFrom(from Manifest, manifestRaw []byte, tracker string) (UpgradeProof, error) {
	if err := m.Validate(); err != nil {
		return UpgradeProof{}, err
	}
	if err := from.Validate(); err != nil {
		return UpgradeProof{}, err
	}
	var decoded Manifest
	decoder := json.NewDecoder(bytes.NewReader(manifestRaw))
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(&decoded); err != nil {
		return UpgradeProof{}, fmt.Errorf("decode predecessor proof: %w", err)
	}
	if err := ensureJSONEOF(decoder); err != nil || !reflect.DeepEqual(decoded, from) {
		return UpgradeProof{}, errors.New("predecessor manifest does not match its proof bytes")
	}
	if m.Compatibility == nil || m.Atlas.Head <= from.Atlas.Head || m.Atlas.RevisionCount <= from.Atlas.RevisionCount {
		return UpgradeProof{}, errors.New("upgrade requires a declared forward transition")
	}
	if !from.AcceptsTrackerFingerprint(tracker) {
		return UpgradeProof{}, errors.New("predecessor installation history is not recognized")
	}
	for _, proof := range m.Compatibility.Upgrades {
		if proof.FromRelease == from.Release && proof.FromManifestSHA256 == SHA256(manifestRaw) && proof.FromTrackerFingerprint == tracker {
			return proof, nil
		}
	}
	return UpgradeProof{}, errors.New("no reviewed upgrade proof for this predecessor installation")
}
