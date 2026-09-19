package main

import (
	"encoding/json"
	"os"
	"os/exec"
	"path/filepath"
	"testing"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

func TestSchemaTagIsSeparateAndPinsExactArtifacts(t *testing.T) {
	root := t.TempDir()
	repository := filepath.Join(root, "packages/esqyma")
	manifest, _, err := schemareleases.Load("postgres/2026.08.1")
	if err != nil {
		t.Fatal(err)
	}
	manifest.Release = "postgres/2099.01.1"
	manifest.Atlas.Head = "20990101000000"
	manifest.Atlas.RevisionCount = 1
	bootstrap := []byte("CREATE TABLE public.probe(id integer);\n")
	manifest.Bootstrap.SHA256 = sha256Hex(bootstrap)
	raw, _ := json.Marshal(manifest)
	path := "schema-releases/" + manifest.Release + "/"
	migration := "20990101000000_probe.sql"
	files := []migrationFile{{Name: migration, SHA256: sha256Hex(bootstrap)}}
	write := func(path string, body []byte) {
		t.Helper()
		path = filepath.Join(repository, path)
		if err := os.MkdirAll(filepath.Dir(path), 0700); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(path, body, 0600); err != nil {
			t.Fatal(err)
		}
	}
	write(path+"manifest.json", raw)
	write(path+"bootstrap.sql", bootstrap)
	write("migrations/postgres/"+migration, bootstrap)
	commitFleetFixture(t, repository, path+"manifest.json", path+"bootstrap.sql", "migrations/postgres/"+migration)
	tag := func(name string) {
		t.Helper()
		if _, err := exec.Command("git", "-C", repository, "-c", "tag.gpgsign=false", "tag", name).CombinedOutput(); err != nil {
			t.Fatal("fixture tag failed")
		}
	}
	tag("v2099.1.1")
	if _, err := verifySchemaTag(root, manifest, raw, files); err == nil {
		t.Fatal("API tag accepted as schema publication")
	}
	tag("schema/" + manifest.Release)
	commit, err := verifySchemaTag(root, manifest, raw, files)
	if err != nil || commit == "" {
		t.Fatal(err)
	}
	changed := append(append([]byte{}, raw...), '\n')
	if _, err := verifySchemaTag(root, manifest, changed, files); err == nil {
		t.Fatal("different manifest bytes accepted")
	}
	wrong := append([]migrationFile(nil), files...)
	wrong[0].SHA256 = sha256Hex([]byte("changed"))
	if _, err := verifySchemaTag(root, manifest, raw, wrong); err == nil {
		t.Fatal("different migration bytes accepted")
	}
	if _, err := verifySchemaTag(root, manifest, raw, nil); err == nil {
		t.Fatal("missing prefix accepted")
	}
	manifest.Bootstrap.SHA256 = sha256Hex([]byte("changed"))
	changed, _ = json.Marshal(manifest)
	write(path+"manifest.json", changed)
	commitFleetFixture(t, repository, path+"manifest.json")
	// Existing publication still resolves old bytes even though HEAD advanced.
	if _, err := verifySchemaTag(root, manifest, changed, files); err == nil {
		t.Fatal("HEAD edits replaced published tag identity")
	}
}
