package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var (
	targetKeyPattern = regexp.MustCompile(`^[a-z0-9-]+/[a-z0-9-]+$`)
	databasePattern  = regexp.MustCompile(`^[a-z][a-z0-9_]*$`)
	slugPattern      = regexp.MustCompile(`^[a-z0-9]+(?:-[a-z0-9]+)*$`)
)

type targetManifest struct {
	FormatVersion int             `json:"format_version"`
	TargetKey     string          `json:"target_key"`
	Scope         string          `json:"scope"`
	AllowCreate   bool            `json:"allow_create"`
	ExpectedEmpty bool            `json:"expected_empty"`
	SchemaRelease string          `json:"schema_release"`
	Database      targetDatabase  `json:"database"`
	BusinessType  string          `json:"business_type"`
	Workspace     targetWorkspace `json:"workspace"`
	SeedProfile   string          `json:"seed_profile"`
	Bundles       []string        `json:"bundles"`
}

type targetDatabase struct {
	EnvFile string `json:"env_file"`
	Name    string `json:"name"`
}

type targetWorkspace struct {
	ID   string `json:"id"`
	Slug string `json:"slug"`
}

type bundleMetadata struct {
	FormatVersion int    `json:"format_version"`
	ID            string `json:"id"`
	Version       string `json:"version"`
	SchemaRelease string `json:"schema_release"`
	Profile       string `json:"profile"`
	BusinessType  string `json:"business_type"`
	Workspace     struct {
		ID   string `json:"id"`
		Slug string `json:"slug"`
	} `json:"workspace"`
	User struct {
		PasswordEnv string `json:"password_env"`
	} `json:"user"`
}

type resolvedBundle struct {
	Path     string
	Metadata bundleMetadata
	Digest   string
}

func loadTarget(root, targetKey string) (targetManifest, string, error) {
	if !targetKeyPattern.MatchString(targetKey) {
		return targetManifest{}, "", fmt.Errorf("invalid target key %q", targetKey)
	}
	parts := strings.Split(targetKey, "/")
	path := filepath.Join(root, "deploy", parts[0], "database", "targets", parts[1]+".json")
	raw, err := os.ReadFile(path)
	if err != nil {
		return targetManifest{}, "", fmt.Errorf("read target %s: %w", targetKey, err)
	}
	var target targetManifest
	if err := decodeStrict(raw, &target); err != nil {
		return targetManifest{}, "", fmt.Errorf("decode target %s: %w", targetKey, err)
	}
	if err := target.validate(targetKey); err != nil {
		return targetManifest{}, "", err
	}
	return target, path, nil
}

func (target targetManifest) validate(expectedKey string) error {
	if target.FormatVersion != 1 || target.TargetKey != expectedKey {
		return errors.New("target format/key mismatch")
	}
	if target.Scope != "local" && target.Scope != "disposable" && target.Scope != "remote" {
		return fmt.Errorf("unsupported target scope %q", target.Scope)
	}
	if target.AllowCreate && target.Scope != "local" && target.Scope != "disposable" {
		return errors.New("only local/disposable targets may allow create")
	}
	if target.AllowCreate && !target.ExpectedEmpty {
		return errors.New("create-if-absent requires expected_empty=true")
	}
	if !databasePattern.MatchString(target.Database.Name) || !safeRelativePath(target.Database.EnvFile) {
		return errors.New("invalid target database configuration")
	}
	if target.BusinessType == "" || target.SeedProfile == "" || target.Workspace.ID == "" || !slugPattern.MatchString(target.Workspace.Slug) {
		return errors.New("invalid target business/workspace/profile configuration")
	}
	if len(target.Bundles) == 0 {
		return errors.New("target must select at least one bundle")
	}
	seen := make(map[string]bool, len(target.Bundles))
	for _, path := range target.Bundles {
		if !safeRelativePath(path) || seen[path] {
			return fmt.Errorf("invalid or duplicate bundle path %q", path)
		}
		seen[path] = true
	}
	return nil
}

func loadBundle(root, path string) (resolvedBundle, error) {
	if !safeRelativePath(path) {
		return resolvedBundle{}, fmt.Errorf("unsafe bundle path %q", path)
	}
	absolute := filepath.Join(root, filepath.FromSlash(path))
	raw, err := os.ReadFile(absolute)
	if err != nil {
		return resolvedBundle{}, fmt.Errorf("read bundle %s: %w", path, err)
	}
	var metadata bundleMetadata
	if err := json.Unmarshal(raw, &metadata); err != nil {
		return resolvedBundle{}, fmt.Errorf("decode bundle metadata %s: %w", path, err)
	}
	return resolvedBundle{Path: absolute, Metadata: metadata, Digest: sha256Hex(raw)}, nil
}

func (bundle resolvedBundle) validateAgainst(target targetManifest) error {
	metadata := bundle.Metadata
	if metadata.FormatVersion != 1 || metadata.ID == "" || metadata.Version == "" {
		return fmt.Errorf("bundle %s has invalid identity", bundle.Path)
	}
	if metadata.SchemaRelease != target.SchemaRelease || metadata.Profile != target.SeedProfile || metadata.BusinessType != target.BusinessType {
		return fmt.Errorf("bundle %s is incompatible with target release/profile/business type", bundle.Path)
	}
	if metadata.Workspace.ID != target.Workspace.ID || metadata.Workspace.Slug != target.Workspace.Slug {
		return fmt.Errorf("bundle %s workspace does not match target", bundle.Path)
	}
	if metadata.User.PasswordEnv == "" {
		return fmt.Errorf("bundle %s has no password environment key", bundle.Path)
	}
	return nil
}

func safeRelativePath(path string) bool {
	if path == "" || filepath.IsAbs(path) || filepath.Clean(path) != path {
		return false
	}
	for _, part := range strings.Split(filepath.ToSlash(path), "/") {
		if part == ".." || part == "." || part == "" {
			return false
		}
	}
	return true
}

func decodeStrict(raw []byte, target any) error {
	decoder := json.NewDecoder(strings.NewReader(string(raw)))
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(target); err != nil {
		return err
	}
	var extra any
	if err := decoder.Decode(&extra); !errors.Is(err, io.EOF) {
		if err == nil {
			return errors.New("multiple JSON values")
		}
		return err
	}
	return nil
}
