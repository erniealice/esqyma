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
