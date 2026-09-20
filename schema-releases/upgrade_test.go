package schemareleases

import (
	"strings"
	"testing"
)

func upgradeFixture(t *testing.T) (Manifest, Manifest, []byte) {
	t.Helper()
	from, raw, err := Load("postgres/2026.08.1")
	if err != nil {
		t.Fatal(err)
	}
	to := from
	to.FormatVersion = 2
	to.Release = "postgres/2026.09.1"
	to.Atlas.Head = "20260918000000"
	to.Atlas.RevisionCount++
	to.Atlas.TrackerFingerprint = strings.Repeat("a", 64)
	to.Compatibility = &Compatibility{
		Phase: "expand", APIReference: "v0.1.0-alpha.1", MinimumOperatorVersion: 2,
		Oracles:  []string{"catalog", "atlas-history"},
		Upgrades: []UpgradeProof{{FromRelease: from.Release, FromManifestSHA256: SHA256(raw), FromTrackerFingerprint: from.Atlas.TrackerFingerprint, TrackerFingerprint: strings.Repeat("b", 64)}},
	}
	to.SeedContract.CompatibleSchemaReleases = []string{from.Release}
	return from, to, raw
}

func TestUpgradeInstallationProof(t *testing.T) {
	from, to, raw := upgradeFixture(t)
	proof, err := to.UpgradeFrom(from, raw, from.Atlas.TrackerFingerprint)
	if err != nil {
		t.Fatal(err)
	}
	if !to.AcceptsTrackerFingerprint(to.Atlas.TrackerFingerprint) || !to.AcceptsTrackerFingerprint(proof.TrackerFingerprint) {
		t.Fatal("fresh and upgraded installation histories must both verify")
	}
	if to.AcceptsTrackerFingerprint(from.Atlas.TrackerFingerprint) || to.AcceptsTrackerFingerprint(strings.Repeat("c", 64)) {
		t.Fatal("old or unknown history accepted at new release")
	}
	if !to.AcceptsSeedRelease(from.Release) || !to.AcceptsSeedRelease(to.Release) || to.AcceptsSeedRelease("postgres/2026.07.1") {
		t.Fatal("seed release compatibility not exact")
	}
	if from.AcceptsSeedRelease(to.Release) {
		t.Fatal("v1 seed compatibility weakened")
	}
}

func TestLegacyInstallationProofBindsExactTrackerState(t *testing.T) {
	manifest, _, err := Load("postgres/2026.09.2")
	if err != nil {
		t.Fatal(err)
	}
	legacy := manifest.Compatibility.LegacyInstallations[0]
	if !manifest.AcceptsTrackerFingerprint(legacy.TrackerFingerprint) {
		t.Fatal("declared legacy fingerprint was rejected")
	}
	if !manifest.AcceptsTrackerState(legacy.TrackerRevisionCount, legacy.TrackerFingerprint) {
		t.Fatal("declared legacy tracker state was rejected")
	}
	if manifest.AcceptsTrackerState(legacy.TrackerRevisionCount+1, legacy.TrackerFingerprint) {
		t.Fatal("legacy fingerprint accepted with the wrong row count")
	}
	if manifest.AcceptsTrackerState(legacy.TrackerRevisionCount, strings.Repeat("0", 64)) {
		t.Fatal("unknown legacy fingerprint accepted")
	}
}

func TestUpgradeRejectsUnprovenSource(t *testing.T) {
	for _, name := range []string{"manifest bytes", "history", "downgrade", "unlisted predecessor", "missing compatibility"} {
		t.Run(name, func(t *testing.T) {
			from, to, raw := upgradeFixture(t)
			tracker := from.Atlas.TrackerFingerprint
			switch name {
			case "manifest bytes":
				raw = append(raw, '\n')
			case "history":
				tracker = strings.Repeat("c", 64)
			case "downgrade":
				to.Atlas.Head = from.Atlas.Head
			case "unlisted predecessor":
				to.Compatibility.Upgrades[0].FromRelease = "postgres/2026.07.1"
				to.SeedContract.CompatibleSchemaReleases = nil
			case "missing compatibility":
				to.Compatibility = nil
			}
			if _, err := to.UpgradeFrom(from, raw, tracker); err == nil {
				t.Fatal("unproven transition accepted")
			}
		})
	}
}

func TestManifestV2RejectsAmbiguousProofs(t *testing.T) {
	for _, name := range []string{"v1 extension", "unknown format", "duplicate source", "missing digest", "seed without source", "duplicate oracle", "missing oracle", "API identity", "missing operator"} {
		t.Run(name, func(t *testing.T) {
			_, to, _ := upgradeFixture(t)
			switch name {
			case "v1 extension":
				to.FormatVersion = 1
			case "unknown format":
				to.FormatVersion = 3
			case "duplicate source":
				to.Compatibility.Upgrades = append(to.Compatibility.Upgrades, to.Compatibility.Upgrades[0])
			case "missing digest":
				to.Compatibility.Upgrades[0].FromManifestSHA256 = ""
			case "seed without source":
				to.SeedContract.CompatibleSchemaReleases = []string{"postgres/2026.07.1"}
			case "duplicate oracle":
				to.Compatibility.Oracles = []string{"catalog", "catalog"}
			case "missing oracle":
				to.Compatibility.Oracles = nil
			case "API identity":
				to.Compatibility.APIReference = to.Release
			case "missing operator":
				to.Compatibility.MinimumOperatorVersion = 0
			}
			if err := to.Validate(); err == nil {
				t.Fatal("invalid release accepted")
			}
			if to.AcceptsTrackerFingerprint(to.Atlas.TrackerFingerprint) || to.AcceptsSeedRelease(to.Release) {
				t.Fatal("invalid manifest used to authorize compatibility")
			}
		})
	}
}
