package main

import (
	"bytes"
	"errors"
	"fmt"
	"os/exec"
	"path/filepath"
	"strings"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

// A schema tag is independent of API module tags. Its commit must contain the
// same manifest/bootstrap and complete migration prefix that this runner reviewed.
// This resolves local Git objects only; it never creates/fetches/moves a tag.
func verifySchemaTag(root string, manifest schemareleases.Manifest, manifestRaw []byte, files []migrationFile) (string, error) {
	if err := manifest.Validate(); err != nil {
		return "", err
	}
	repository := filepath.Join(root, "packages/esqyma")
	tag := "refs/tags/schema/" + manifest.Release
	git := func(args ...string) ([]byte, error) {
		return exec.Command("git", append([]string{"-C", repository}, args...)...).Output()
	}
	commitRaw, err := git("rev-parse", "--verify", tag+"^{commit}")
	if err != nil {
		return "", fmt.Errorf("published schema tag %s is unavailable; qualify and publish through the release workflow", tag)
	}
	commit := string(bytes.TrimSpace(commitRaw))
	path := "schema-releases/" + manifest.Release + "/"
	taggedManifest, err := git("show", commit+":"+path+"manifest.json")
	if err != nil || !bytes.Equal(taggedManifest, manifestRaw) {
		return "", errors.New("schema tag manifest differs from selected embedded release")
	}
	bootstrap, err := git("show", commit+":"+path+manifest.Bootstrap.Path)
	if err != nil || sha256Hex(bootstrap) != manifest.Bootstrap.SHA256 {
		return "", errors.New("schema tag bootstrap differs from release checksum")
	}
	namesRaw, err := git("ls-tree", "-r", "--name-only", "-z", commit, "--", "migrations/postgres")
	if err != nil {
		return "", errors.New("cannot inspect tagged migration prefix")
	}
	names := map[string]bool{}
	for _, path := range strings.Split(string(namesRaw), "\x00") {
		if filepath.ToSlash(filepath.Dir(path)) != "migrations/postgres" || !strings.HasSuffix(path, ".sql") {
			continue
		}
		name := filepath.Base(path)
		if len(name) < 14 {
			return "", errors.New("invalid tagged migration name")
		}
		if name[:14] <= manifest.Atlas.Head {
			names[name] = true
		}
	}
	if len(names) != len(files) {
		return "", errors.New("schema tag migration prefix count differs from reviewed release")
	}
	for _, file := range files {
		if !names[file.Name] {
			return "", errors.New("schema tag omits reviewed migration")
		}
		raw, err := git("show", commit+":migrations/postgres/"+file.Name)
		if err != nil || sha256Hex(raw) != file.SHA256 {
			return "", errors.New("schema tag migration bytes differ from reviewed release")
		}
	}
	return commit, nil
}
