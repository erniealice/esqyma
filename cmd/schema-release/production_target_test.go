package main

import "testing"

func TestMMISProductionAdoptionTargetContract(t *testing.T) {
	root, err := findRepositoryRoot()
	if err != nil {
		t.Fatal(err)
	}
	target, path, err := loadTarget(root, "mmis/production")
	if err != nil {
		t.Fatal(err)
	}
	if target.Scope != "remote" || target.AllowCreate || target.ExpectedEmpty || target.Database.Name != "postgres" {
		t.Fatalf("unsafe MMIS production target %s: %+v", path, target)
	}
	if target.SchemaRelease != "postgres/2026.09.2" || target.Adoption == nil || target.Adoption.Backup == nil {
		t.Fatal("MMIS production target is not bound to the .2 adoption and backup proof")
	}
	if target.Adoption.PreTrackerRevisionCount != 7 || target.Adoption.PostTrackerRevisionCount != 10 || len(target.Adoption.Revisions) != 3 || len(target.Adoption.EffectOracles) != 3 {
		t.Fatalf("incomplete MMIS adoption contract: %+v", target.Adoption)
	}
	if target.Access == nil || target.Access.RuntimeRole == target.Access.MigrationRole || target.Access.Migration.KeychainProfile == "" {
		t.Fatal("MMIS production target does not declare distinct target-bound access references")
	}
}

func TestMMISForwardUpgradeTargetContract(t *testing.T) {
	root, err := findRepositoryRoot()
	if err != nil {
		t.Fatal(err)
	}
	target, path, err := loadTarget(root, "mmis/production-2026-09-3")
	if err != nil {
		t.Fatal(err)
	}
	if err := bindFleetTarget(root, &target, path, false); err != nil {
		t.Fatalf("forward target is not fleet-bound: %v", err)
	}
	if target.Scope != "remote" || target.AllowCreate || target.ExpectedEmpty || target.Database.Name != "postgres" {
		t.Fatalf("unsafe MMIS forward target %s: %+v", path, target)
	}
	if target.SchemaRelease != "postgres/2026.09.3" || target.Adoption != nil || target.Upgrade == nil {
		t.Fatalf("forward target is not an exact .3 upgrade profile: %+v", target)
	}
	u := target.Upgrade
	if u.FromRelease != "postgres/2026.09.2" || u.ConnectionMode != "session" || u.Endpoint != target.Access.Endpoint || u.MigrationRole != "postgres" || u.RuntimeRole != "mmis_runtime" {
		t.Fatalf("forward target upgrade identity is incomplete: %+v", u)
	}
	if u.CatalogMode != "base_overlay" || u.FromBaseCatalogFingerprint != "41cbc1fabf2965091f759c9411a49c4f057241921c8ee793e367b93ca146318a" || u.ToBaseCatalogFingerprint != "cdf99e2b4295ca8914831bad8f58b25e6c308ef1f5b7f37096375df1590b74e5" || u.FromOverlayFingerprint != "97f513201c560b0613d782768e6f55c494c8bf75f0f3f6235796761355b1d4a0" || u.ToOverlayFingerprint != "5ebeacb13c6653deb7d687ad88f0c9ee6f60c98b513070fa787162cae9668700" {
		t.Fatalf("forward target catalog/overlay proof is incomplete: %+v", u)
	}
}
