package schemareleases

import (
	"context"
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"regexp"
	"sort"
	"strings"
	"time"
)

var (
	releasePattern = regexp.MustCompile(`^postgres/[0-9]{4}\.[0-9]{2}\.[1-9][0-9]*$`)
	headPattern    = regexp.MustCompile(`^[0-9]{14}$`)
	namePattern    = regexp.MustCompile(`^[a-z0-9]+(?:-[a-z0-9]+)*$`)
	hexPattern     = regexp.MustCompile(`^[0-9a-f]{64}$`)
)

type Manifest struct {
	FormatVersion int               `json:"format_version"`
	Release       string            `json:"release"`
	Dialect       string            `json:"dialect"`
	CreatedAt     string            `json:"created_at"`
	Atlas         AtlasManifest     `json:"atlas"`
	Bootstrap     BootstrapManifest `json:"bootstrap"`
	SeedContract  SeedContract      `json:"seed_contract"`
}

type AtlasManifest struct {
	ToolVersion        string `json:"tool_version"`
	Head               string `json:"head"`
	RevisionCount      int    `json:"revision_count"`
	SumSHA256          string `json:"sum_sha256"`
	TrackerFingerprint string `json:"tracker_fingerprint"`
}

type BootstrapManifest struct {
	Path                        string `json:"path"`
	SHA256                      string `json:"sha256"`
	PGDumpVersion               string `json:"pg_dump_version"`
	RestrictKey                 string `json:"restrict_key"`
	NormalizedSchemaFingerprint string `json:"normalized_schema_fingerprint"`
	CatalogFingerprint          string `json:"catalog_fingerprint"`
}

type SeedContract struct {
	ID                    string   `json:"id"`
	BundleManifestVersion int      `json:"bundle_manifest_version"`
	AllowedProfiles       []string `json:"allowed_profiles"`
}

type RequiredBundle struct {
	TargetKey     string `json:"target_key"`
	ID            string `json:"id"`
	Version       string `json:"version"`
	Digest        string `json:"digest"`
	SchemaRelease string `json:"schema_release"`
}

type Verification struct {
	Release            string
	AtlasHead          string
	RevisionCount      int
	TrackerFingerprint string
	CatalogFingerprint string
	Bundles            int
}

func Load(release string) (Manifest, []byte, error) {
	if !releasePattern.MatchString(release) {
		return Manifest{}, nil, fmt.Errorf("invalid schema release %q", release)
	}
	path := release + "/manifest.json"
	raw, err := FS.ReadFile(path)
	if err != nil {
		return Manifest{}, nil, fmt.Errorf("read embedded release %q: %w", release, err)
	}
	var manifest Manifest
	decoder := json.NewDecoder(strings.NewReader(string(raw)))
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(&manifest); err != nil {
		return Manifest{}, nil, fmt.Errorf("decode release %q: %w", release, err)
	}
	if err := ensureJSONEOF(decoder); err != nil {
		return Manifest{}, nil, fmt.Errorf("decode release %q: %w", release, err)
	}
	if err := manifest.Validate(); err != nil {
		return Manifest{}, nil, err
	}
	if manifest.Release != release {
		return Manifest{}, nil, fmt.Errorf("release path %q disagrees with manifest %q", release, manifest.Release)
	}
	return manifest, raw, nil
}

func BootstrapBytes(manifest Manifest) ([]byte, error) {
	if err := manifest.Validate(); err != nil {
		return nil, err
	}
	raw, err := FS.ReadFile(manifest.Release + "/" + manifest.Bootstrap.Path)
	if err != nil {
		return nil, fmt.Errorf("read bootstrap for %s: %w", manifest.Release, err)
	}
	actual := SHA256(raw)
	if actual != manifest.Bootstrap.SHA256 {
		return nil, fmt.Errorf("bootstrap checksum mismatch for %s: got %s", manifest.Release, actual)
	}
	return raw, nil
}

func (manifest Manifest) Validate() error {
	if manifest.FormatVersion != 1 {
		return fmt.Errorf("unsupported schema release format_version %d", manifest.FormatVersion)
	}
	if !releasePattern.MatchString(manifest.Release) {
		return fmt.Errorf("invalid release %q", manifest.Release)
	}
	if manifest.Dialect != "postgres" {
		return fmt.Errorf("unsupported dialect %q", manifest.Dialect)
	}
	if _, err := time.Parse(time.RFC3339, manifest.CreatedAt); err != nil {
		return fmt.Errorf("invalid created_at: %w", err)
	}
	if manifest.Atlas.ToolVersion != "1.3.0" {
		return fmt.Errorf("unsupported Atlas version %q", manifest.Atlas.ToolVersion)
	}
	if !headPattern.MatchString(manifest.Atlas.Head) || manifest.Atlas.RevisionCount < 1 {
		return fmt.Errorf("invalid Atlas head/count")
	}
	for label, value := range map[string]string{
		"atlas.sum":         manifest.Atlas.SumSHA256,
		"Atlas tracker":     manifest.Atlas.TrackerFingerprint,
		"bootstrap":         manifest.Bootstrap.SHA256,
		"restrict key":      manifest.Bootstrap.RestrictKey,
		"normalized schema": manifest.Bootstrap.NormalizedSchemaFingerprint,
		"catalog":           manifest.Bootstrap.CatalogFingerprint,
	} {
		if !hexPattern.MatchString(value) {
			return fmt.Errorf("invalid %s SHA-256", label)
		}
	}
	if manifest.Bootstrap.Path != "bootstrap.sql" || manifest.Bootstrap.PGDumpVersion != "18.3" {
		return fmt.Errorf("unsupported bootstrap generator contract")
	}
	if manifest.SeedContract.ID != "copya/v1" || manifest.SeedContract.BundleManifestVersion != 1 {
		return fmt.Errorf("unsupported seed contract")
	}
	if len(manifest.SeedContract.AllowedProfiles) == 0 {
		return fmt.Errorf("seed contract must allow at least one profile")
	}
	seen := make(map[string]bool, len(manifest.SeedContract.AllowedProfiles))
	for _, profile := range manifest.SeedContract.AllowedProfiles {
		if !namePattern.MatchString(profile) || seen[profile] {
			return fmt.Errorf("invalid or duplicate seed profile %q", profile)
		}
		seen[profile] = true
	}
	return nil
}

func ManifestDigest(raw []byte) string { return SHA256(raw) }

func SHA256(raw []byte) string {
	sum := sha256.Sum256(raw)
	return hex.EncodeToString(sum[:])
}

func ProfileAllowed(manifest Manifest, profile string) bool {
	return sort.SearchStrings(sortedCopy(manifest.SeedContract.AllowedProfiles), profile) < len(manifest.SeedContract.AllowedProfiles) &&
		contains(manifest.SeedContract.AllowedProfiles, profile)
}

func VerifyDatabase(ctx context.Context, db *sql.DB, manifest Manifest, required []RequiredBundle) (Verification, error) {
	if db == nil {
		return Verification{}, errors.New("schema release verify: nil database")
	}
	if err := manifest.Validate(); err != nil {
		return Verification{}, err
	}

	var trackerExists bool
	if err := db.QueryRowContext(ctx, `SELECT to_regclass('atlas_schema_revisions.atlas_schema_revisions') IS NOT NULL`).Scan(&trackerExists); err != nil {
		return Verification{}, fmt.Errorf("schema release verify: Atlas tracker probe: %w", err)
	}
	if !trackerExists {
		return Verification{}, errors.New("schema release verify: Atlas tracker is absent")
	}

	var count int
	var head string
	if err := db.QueryRowContext(ctx, `SELECT count(*), COALESCE(max(version), '') FROM atlas_schema_revisions.atlas_schema_revisions`).Scan(&count, &head); err != nil {
		return Verification{}, fmt.Errorf("schema release verify: Atlas head: %w", err)
	}
	if count != manifest.Atlas.RevisionCount || head != manifest.Atlas.Head {
		return Verification{}, fmt.Errorf("schema release verify: Atlas state got head=%s count=%d, want head=%s count=%d", head, count, manifest.Atlas.Head, manifest.Atlas.RevisionCount)
	}

	trackerFingerprint, err := AtlasTrackerFingerprint(ctx, db)
	if err != nil {
		return Verification{}, err
	}
	if trackerFingerprint != manifest.Atlas.TrackerFingerprint {
		return Verification{}, fmt.Errorf("schema release verify: Atlas tracker fingerprint mismatch: got %s", trackerFingerprint)
	}

	catalogFingerprint, err := CatalogFingerprint(ctx, db)
	if err != nil {
		return Verification{}, err
	}
	if catalogFingerprint != manifest.Bootstrap.CatalogFingerprint {
		return Verification{}, fmt.Errorf("schema release verify: catalog fingerprint mismatch: got %s", catalogFingerprint)
	}

	for _, bundle := range required {
		if bundle.TargetKey == "" || bundle.ID == "" || bundle.Version == "" || !hexPattern.MatchString(bundle.Digest) || bundle.SchemaRelease != manifest.Release {
			return Verification{}, fmt.Errorf("schema release verify: invalid required bundle %+v", bundle)
		}
		var found bool
		err := db.QueryRowContext(ctx, `
			SELECT EXISTS (
				SELECT 1
				FROM ichizen_deploy.data_bundle_receipts
				WHERE target_key = $1 AND bundle_id = $2 AND bundle_version = $3
				  AND bundle_digest = $4 AND schema_release = $5
			)`, bundle.TargetKey, bundle.ID, bundle.Version, bundle.Digest, bundle.SchemaRelease).Scan(&found)
		if err != nil {
			return Verification{}, fmt.Errorf("schema release verify: bundle %s/%s: %w", bundle.ID, bundle.Version, err)
		}
		if !found {
			return Verification{}, fmt.Errorf("schema release verify: required bundle %s/%s is absent or mismatched", bundle.ID, bundle.Version)
		}
	}

	return Verification{
		Release:            manifest.Release,
		AtlasHead:          head,
		RevisionCount:      count,
		TrackerFingerprint: trackerFingerprint,
		CatalogFingerprint: catalogFingerprint,
		Bundles:            len(required),
	}, nil
}

func AtlasTrackerFingerprint(ctx context.Context, db *sql.DB) (string, error) {
	rows, err := db.QueryContext(ctx, `
		SELECT version, hash, type, applied, total,
		       COALESCE(error, ''), COALESCE(error_stmt, ''), COALESCE(partial_hashes::text, '')
		FROM atlas_schema_revisions.atlas_schema_revisions
		ORDER BY version`)
	if err != nil {
		return "", fmt.Errorf("schema release verify: read Atlas revisions: %w", err)
	}
	defer rows.Close()

	hash := sha256.New()
	for rows.Next() {
		var version, revisionHash, revisionError, errorStatement, partialHashes string
		var revisionType, applied, total int64
		if err := rows.Scan(&version, &revisionHash, &revisionType, &applied, &total, &revisionError, &errorStatement, &partialHashes); err != nil {
			return "", fmt.Errorf("schema release verify: scan Atlas revision: %w", err)
		}
		fmt.Fprintf(hash, "%s|%s|%d|%d|%d|%s|%s|%s\n", version, revisionHash, revisionType, applied, total, revisionError, errorStatement, partialHashes)
	}
	if err := rows.Err(); err != nil {
		return "", fmt.Errorf("schema release verify: iterate Atlas revisions: %w", err)
	}
	return hex.EncodeToString(hash.Sum(nil)), nil
}

func CatalogFingerprint(ctx context.Context, db *sql.DB) (string, error) {
	rows, err := db.QueryContext(ctx, catalogFingerprintQuery)
	if err != nil {
		return "", fmt.Errorf("schema release verify: catalog query: %w", err)
	}
	defer rows.Close()

	hash := sha256.New()
	for rows.Next() {
		var kind, schemaName, objectName, detail string
		if err := rows.Scan(&kind, &schemaName, &objectName, &detail); err != nil {
			return "", fmt.Errorf("schema release verify: catalog scan: %w", err)
		}
		writeFingerprintField(hash, kind)
		writeFingerprintField(hash, schemaName)
		writeFingerprintField(hash, objectName)
		writeFingerprintField(hash, detail)
	}
	if err := rows.Err(); err != nil {
		return "", fmt.Errorf("schema release verify: catalog iterate: %w", err)
	}
	return hex.EncodeToString(hash.Sum(nil)), nil
}

func writeFingerprintField(writer io.Writer, value string) {
	fmt.Fprintf(writer, "%d:", len(value))
	_, _ = io.WriteString(writer, value)
}

func sortedCopy(values []string) []string {
	out := append([]string(nil), values...)
	sort.Strings(out)
	return out
}

func contains(values []string, want string) bool {
	for _, value := range values {
		if value == want {
			return true
		}
	}
	return false
}

func ensureJSONEOF(decoder *json.Decoder) error {
	var extra any
	if err := decoder.Decode(&extra); !errors.Is(err, io.EOF) {
		if err == nil {
			return errors.New("multiple JSON values")
		}
		return err
	}
	return nil
}

const catalogFingerprintQuery = `
WITH user_schemas AS (
  SELECT oid, nspname
  FROM pg_namespace
  WHERE nspname NOT IN ('pg_catalog', 'information_schema', 'atlas_schema_revisions')
    AND nspname NOT LIKE 'pg_toast%'
    AND nspname NOT LIKE 'pg_temp_%'
), objects AS (
  SELECT '00-schema'::text AS kind, s.nspname AS schema_name, s.nspname AS object_name, ''::text AS detail
  FROM user_schemas s
  UNION ALL
  SELECT '01-extension', n.nspname, e.extname, e.extversion
  FROM pg_extension e JOIN pg_namespace n ON n.oid = e.extnamespace JOIN user_schemas s ON s.oid = n.oid
  UNION ALL
  SELECT '02-relation', n.nspname, c.relname,
         concat_ws('|', c.relkind, c.relpersistence, COALESCE(array_to_string(c.reloptions, ','), ''),
                   COALESCE(pg_get_expr(c.relpartbound, c.oid, true), ''),
                   CASE WHEN c.relkind IN ('v','m') THEN pg_get_viewdef(c.oid, true) ELSE '' END)
  FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace JOIN user_schemas s ON s.oid = n.oid
  WHERE c.relkind IN ('r','p','v','m','S','f')
  UNION ALL
  SELECT '03-column', n.nspname, c.relname || '.' || a.attname,
         concat_ws('|', a.attnum::text, format_type(a.atttypid, a.atttypmod), a.attnotnull::text,
                   COALESCE(pg_get_expr(d.adbin, d.adrelid, true), ''), a.attidentity, a.attgenerated,
                   COALESCE(coll.collname, ''))
  FROM pg_attribute a
  JOIN pg_class c ON c.oid = a.attrelid
  JOIN pg_namespace n ON n.oid = c.relnamespace
  JOIN user_schemas s ON s.oid = n.oid
  LEFT JOIN pg_attrdef d ON d.adrelid = a.attrelid AND d.adnum = a.attnum
  LEFT JOIN pg_collation coll ON coll.oid = a.attcollation AND a.attcollation <> 0
  WHERE a.attnum > 0 AND NOT a.attisdropped AND c.relkind IN ('r','p','v','m','f')
  UNION ALL
  SELECT '04-constraint', n.nspname, c.relname || '.' || con.conname,
         concat_ws('|', con.contype, con.convalidated::text, con.condeferrable::text, con.condeferred::text,
                   pg_get_constraintdef(con.oid, true))
  FROM pg_constraint con JOIN pg_class c ON c.oid = con.conrelid
  JOIN pg_namespace n ON n.oid = c.relnamespace JOIN user_schemas s ON s.oid = n.oid
  UNION ALL
  SELECT '05-index', n.nspname, idx.relname, pg_get_indexdef(i.indexrelid, 0, true)
  FROM pg_index i JOIN pg_class idx ON idx.oid = i.indexrelid JOIN pg_namespace n ON n.oid = idx.relnamespace
  JOIN user_schemas s ON s.oid = n.oid
  UNION ALL
  SELECT '06-trigger', n.nspname, c.relname || '.' || t.tgname, pg_get_triggerdef(t.oid, true)
  FROM pg_trigger t JOIN pg_class c ON c.oid = t.tgrelid JOIN pg_namespace n ON n.oid = c.relnamespace
  JOIN user_schemas s ON s.oid = n.oid WHERE NOT t.tgisinternal
  UNION ALL
  SELECT '07-policy', n.nspname, c.relname || '.' || p.polname,
         concat_ws('|', p.polcmd, p.polpermissive::text, COALESCE(pg_get_expr(p.polqual, p.polrelid, true), ''),
                   COALESCE(pg_get_expr(p.polwithcheck, p.polrelid, true), ''))
  FROM pg_policy p JOIN pg_class c ON c.oid = p.polrelid JOIN pg_namespace n ON n.oid = c.relnamespace
  JOIN user_schemas s ON s.oid = n.oid
  UNION ALL
  SELECT '08-function', n.nspname, p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ')', pg_get_functiondef(p.oid)
  FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace JOIN user_schemas s ON s.oid = n.oid
  UNION ALL
  SELECT '09-enum', n.nspname, t.typname || '.' || e.enumsortorder::text, e.enumlabel
  FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid JOIN pg_namespace n ON n.oid = t.typnamespace
  JOIN user_schemas s ON s.oid = n.oid
  UNION ALL
  SELECT '10-sequence', n.nspname, c.relname,
         concat_ws('|', format_type(seq.seqtypid, NULL), seq.seqstart::text, seq.seqincrement::text,
                   seq.seqmax::text, seq.seqmin::text, seq.seqcache::text, seq.seqcycle::text)
  FROM pg_sequence seq JOIN pg_class c ON c.oid = seq.seqrelid JOIN pg_namespace n ON n.oid = c.relnamespace
  JOIN user_schemas s ON s.oid = n.oid
)
SELECT kind, schema_name, object_name, detail
FROM objects
ORDER BY kind, schema_name, object_name, detail`
