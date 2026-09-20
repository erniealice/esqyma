package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"
	"time"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

const (
	remoteAdoptionPreFingerprint     = "4f3b11e94de8e7f1351eca05b3148ae2ed15e88cd656001f33ed13440e8bfa26"
	remoteAdoptionPostFingerprint    = "7cbfa83c39a99f75e4806cafa3996febc8239fd081fe409f5c0fa8950013b8ed"
	remoteAdoptionBaseFingerprint    = "41cbc1fabf2965091f759c9411a49c4f057241921c8ee793e367b93ca146318a"
	remoteAdoptionOverlayFingerprint = "97f513201c560b0613d782768e6f55c494c8bf75f0f3f6235796761355b1d4a0"
	remoteAdoptionWorkspaceID        = "019ecb8e-d83f-74ab-aa13-5a6c27afd112"
)

// These are deliberately the same bounded, workspace-parameterized effect
// checks that the production adoption contract will pin. They return only
// violations; the test never publishes the matching production rows.
func productionAdoptionEffectOracles() []schemareleases.DataOracle {
	oracles := []schemareleases.DataOracle{
		{
			ID: "plan-execution-strategy",
			SQL: `WITH violations AS (
  SELECT 'execution_strategy_shape'::text AS violation
  WHERE NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'plan'
      AND column_name = 'execution_strategy'
      AND data_type = 'text'
      AND is_nullable = 'YES'
  )
  UNION ALL
  SELECT 'execution_strategy_default'
  WHERE NOT EXISTS (
    SELECT 1
    FROM pg_catalog.pg_attribute AS a
    JOIN pg_catalog.pg_class AS c ON c.oid = a.attrelid
    JOIN pg_catalog.pg_namespace AS n ON n.oid = c.relnamespace
    JOIN pg_catalog.pg_attrdef AS d ON d.adrelid = a.attrelid AND d.adnum = a.attnum
    WHERE n.nspname = 'public'
      AND c.relname = 'plan'
      AND a.attname = 'execution_strategy'
      AND pg_catalog.pg_get_expr(d.adbin, d.adrelid) = '''template_driven''::text'
  )
  UNION ALL
  SELECT 'execution_strategy_value:' || p.id::text
  FROM public.plan AS p
  WHERE p.workspace_id = $1
    AND (
      p.execution_strategy IS NULL
      OR btrim(p.execution_strategy) = ''
      OR p.execution_strategy NOT IN ('template_driven', 'manual_or_task_driven', 'seat_or_assignment_driven')
    )
)
SELECT violation FROM violations ORDER BY violation`,
			Mode: "zero-rows", MaxRows: 32, TimeoutSeconds: 10,
		},
		{
			ID: "plan-job-template-shape",
			SQL: `WITH expected_columns(table_name, column_name, data_type, is_nullable) AS (
  VALUES
    ('plan_job_template', 'id', 'text', 'NO'),
    ('plan_job_template', 'date_created', 'bigint', 'YES'),
    ('plan_job_template', 'date_modified', 'bigint', 'YES'),
    ('plan_job_template', 'active', 'boolean', 'NO'),
    ('plan_job_template', 'plan_id', 'text', 'NO'),
    ('plan_job_template', 'job_template_id', 'text', 'NO'),
    ('plan_job_template', 'sequence_order', 'integer', 'NO'),
    ('plan_job_template', 'composition_entry_pattern', 'integer', 'NO'),
    ('plan_job_template', 'workspace_id', 'text', 'NO')
), expected_constraints(constraint_name) AS (
  VALUES
    ('plan_job_template_pkey'),
    ('plan_job_template_plan_id_fkey'),
    ('plan_job_template_job_template_id_fkey'),
    ('plan_job_template_workspace_id_fkey'),
    ('ck_plan_job_template_pattern')
), expected_indexes(index_name) AS (
  VALUES
    ('plan_job_template_pkey'),
    ('uq_plan_job_template_plan_template'),
    ('idx_plan_job_template_plan_order'),
    ('idx_plan_job_template_job_template_id')
), violations AS (
  SELECT ('column:' || e.column_name)::text AS violation
  FROM expected_columns AS e
  LEFT JOIN information_schema.columns AS c
    ON c.table_schema = 'public'
   AND c.table_name = e.table_name
   AND c.column_name = e.column_name
  WHERE c.column_name IS NULL
     OR c.data_type IS DISTINCT FROM e.data_type
     OR c.is_nullable IS DISTINCT FROM e.is_nullable
  UNION ALL
  SELECT 'constraint:' || e.constraint_name
  FROM expected_constraints AS e
  WHERE NOT EXISTS (
    SELECT 1
    FROM pg_catalog.pg_constraint AS c
    JOIN pg_catalog.pg_namespace AS n ON n.oid = c.connamespace
    WHERE n.nspname = 'public'
      AND c.conname = e.constraint_name
      AND c.convalidated
  )
  UNION ALL
  SELECT 'index:' || e.index_name
  FROM expected_indexes AS e
  WHERE NOT EXISTS (
    SELECT 1
    FROM pg_catalog.pg_class AS c
    JOIN pg_catalog.pg_namespace AS n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relname = e.index_name
      AND c.relkind = 'i'
  )
  UNION ALL
  SELECT 'invalid_row:' || t.id::text
  FROM public.plan_job_template AS t
  WHERE t.workspace_id = $1
    AND (t.active IS NULL OR t.composition_entry_pattern NOT IN (0, 1, 2))
)
SELECT violation FROM violations ORDER BY violation`,
			Mode: "zero-rows", MaxRows: 128, TimeoutSeconds: 10,
		},
		{
			ID: "descriptor-schema-alignment",
			SQL: `WITH expected_columns(table_name, column_name, type_name) AS (
  VALUES
    ('collection_method', 'date_created', 'bigint'),
    ('collection_method', 'date_modified', 'bigint'),
    ('disbursement_method', 'date_created', 'bigint'),
    ('disbursement_method', 'date_modified', 'bigint'),
    ('event_recurrence', 'rrule_string', 'text'),
    ('event_recurrence', 'exdate_string', 'text'),
    ('expenditure', 'fund_transaction_id', 'text'),
    ('expenditure_category', 'parent_category_id', 'text'),
    ('expenditure_category', 'billing_mode', 'text'),
    ('expenditure_category', 'markup_pct', 'double precision'),
    ('expenditure_category', 'default_rate', 'bigint'),
    ('expenditure_category', 'billable_by_default', 'boolean'),
    ('expenditure_line_item', 'total_price', 'bigint'),
    ('expenditure_line_item', 'line_item_type', 'text'),
    ('fulfillment', 'metadata', 'jsonb'),
    ('fulfillment_return', 'metadata', 'jsonb'),
    ('fulfillment_return', 'completed_at', 'timestamp with time zone'),
    ('fulfillment_status_event', 'occurred_at', 'timestamp with time zone'),
    ('integration_config', 'config_data', 'jsonb'),
    ('line', 'workspace_id', 'text'),
    ('product_option_value', 'metadata', 'jsonb'),
    ('revenue_category', 'parent_category_id', 'text')
), violations AS (
  SELECT ('column:' || e.table_name || '.' || e.column_name)::text AS violation
  FROM expected_columns AS e
  LEFT JOIN pg_catalog.pg_attribute AS a
    ON a.attrelid = to_regclass(format('public.%I', e.table_name))
   AND a.attname = e.column_name
   AND a.attnum > 0
   AND NOT a.attisdropped
  WHERE a.attname IS NULL
     OR pg_catalog.format_type(a.atttypid, a.atttypmod) IS DISTINCT FROM e.type_name
  UNION ALL
  SELECT 'index:idx_expenditure_fund_transaction_id'
  WHERE NOT EXISTS (
    SELECT 1
    FROM pg_catalog.pg_index AS i
    JOIN pg_catalog.pg_class AS c ON c.oid = i.indexrelid
    JOIN pg_catalog.pg_namespace AS n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relname = 'idx_expenditure_fund_transaction_id'
      AND i.indpred IS NOT NULL
  )
  UNION ALL
  SELECT 'index:idx_line_workspace_id'
  WHERE NOT EXISTS (
    SELECT 1
    FROM pg_catalog.pg_index AS i
    JOIN pg_catalog.pg_class AS c ON c.oid = i.indexrelid
    JOIN pg_catalog.pg_namespace AS n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relname = 'idx_line_workspace_id'
      AND i.indpred IS NOT NULL
  )
  UNION ALL
  SELECT 'fk:expenditure.fund_transaction_id'
  WHERE NOT EXISTS (
    SELECT 1
    FROM pg_catalog.pg_constraint AS c
    WHERE c.contype = 'f'
      AND c.convalidated
      AND c.conrelid = 'public.expenditure'::regclass
      AND c.confrelid = 'public.fund_transaction'::regclass
      AND c.conkey = ARRAY[(SELECT a.attnum FROM pg_catalog.pg_attribute AS a WHERE a.attrelid = 'public.expenditure'::regclass AND a.attname = 'fund_transaction_id')]::smallint[]
      AND c.confkey = ARRAY[(SELECT a.attnum FROM pg_catalog.pg_attribute AS a WHERE a.attrelid = 'public.fund_transaction'::regclass AND a.attname = 'id')]::smallint[]
  )
  UNION ALL
  SELECT 'fk:line.workspace_id'
  WHERE NOT EXISTS (
    SELECT 1
    FROM pg_catalog.pg_constraint AS c
    WHERE c.contype = 'f'
      AND c.convalidated
      AND c.conrelid = 'public.line'::regclass
      AND c.confrelid = 'public.workspace'::regclass
      AND c.conkey = ARRAY[(SELECT a.attnum FROM pg_catalog.pg_attribute AS a WHERE a.attrelid = 'public.line'::regclass AND a.attname = 'workspace_id')]::smallint[]
      AND c.confkey = ARRAY[(SELECT a.attnum FROM pg_catalog.pg_attribute AS a WHERE a.attrelid = 'public.workspace'::regclass AND a.attname = 'id')]::smallint[]
  )
  UNION ALL
  SELECT 'workspace:' || $1::text
  WHERE NOT EXISTS (SELECT 1 FROM public.workspace WHERE id = $1)
)
SELECT violation FROM violations ORDER BY violation`,
			Mode: "zero-rows", MaxRows: 64, TimeoutSeconds: 10,
		},
	}
	for i := range oracles {
		oracles[i].SQLSHA256 = sha256Hex([]byte(oracles[i].SQL))
	}
	return oracles
}

func productionAdoptionCloneTarget(databaseName string, oracles []schemareleases.DataOracle, revisions []adoptedRevision, base, overlay string) targetManifest {
	return targetManifest{
		FormatVersion: 1,
		TargetKey:     "mmis/production-restore-adoption",
		Scope:         "disposable",
		AllowCreate:   false,
		ExpectedEmpty: false,
		SchemaRelease: "postgres/2026.09.2",
		Database:      targetDatabase{EnvFile: "fixture.env", Name: databaseName},
		BusinessType:  "education",
		Workspace:     targetWorkspace{ID: remoteAdoptionWorkspaceID, Slug: "mmis"},
		SeedProfile:   "client-minimal",
		Upgrade:       &upgradeTarget{ConnectionMode: "direct", Endpoint: "127.0.0.1:5432", MigrationRole: "fixture_migrator", RuntimeRole: "fixture_runtime", BackupMaxAgeHours: 24},
		Adoption: &legacyAdoptionTarget{
			Mode:                     "legacy_adoption",
			PreTrackerRevisionCount:  7,
			PreTrackerFingerprint:    remoteAdoptionPreFingerprint,
			PreHead:                  "20260809230000",
			PostTrackerRevisionCount: 10,
			PostTrackerFingerprint:   remoteAdoptionPostFingerprint,
			PostHead:                 "20260822213000",
			BaseCatalogFingerprint:   base,
			OverlayID:                "supabase-mmis-rls-v1",
			OverlayFingerprint:       overlay,
			Backup: &legacyAdoptionBackupProof{
				ArchiveArtifact:        "production-postgres-pg17-20260920T100252Z.dump",
				ArchiveSHA256:          "f532c3d0956b5aec803458f1020f24161dff12818dbbb600c2c98f0f21f5611a",
				ArchiveListSHA256:      "797c87fe318f8e649a8418c23dda24c0577b645511344738bce23fc2ae3f9e8c",
				SourcePostgresVersion:  "17.6",
				RestorePostgresVersion: "17.11",
				RestoreEvidenceRef:     "production-clone-pg17-20260920",
			},
			EffectOracles: oracles,
			Revisions:     revisions,
		},
	}
}

func TestLegacyAdoptionProductionArchiveIntegration(t *testing.T) {
	adminURL := os.Getenv("ESQYMA_TEST_ADMIN_URL")
	archive := os.Getenv("ESQYMA_LEGACY_ADOPTION_PRODUCTION_DUMP")
	if adminURL == "" || archive == "" {
		t.Skip("ESQYMA_TEST_ADMIN_URL and ESQYMA_LEGACY_ADOPTION_PRODUCTION_DUMP are required")
	}
	if _, err := os.Stat(archive); err != nil {
		t.Skipf("production adoption archive is unavailable: %v", err)
	}
	// Homebrew's PostgreSQL 17 binaries in the protected test toolchain use
	// external dylibs. Preserve the test-only loader path for child pg_restore
	// processes; production operators do not use this hook.
	if libraries := os.Getenv("ESQYMA_TEST_PG_DYLD_LIBRARY_PATH"); libraries != "" {
		if err := os.Setenv("DYLD_LIBRARY_PATH", libraries); err != nil {
			t.Fatal(err)
		}
		t.Cleanup(func() { _ = os.Unsetenv("DYLD_LIBRARY_PATH") })
	}
	parsed, err := url.Parse(adminURL)
	if err != nil || parsed.User == nil {
		t.Fatal("invalid integration connection")
	}
	host := parsed.Hostname()
	if host != "127.0.0.1" && host != "localhost" && host != "::1" {
		t.Fatal("production archive integration requires loopback")
	}
	port := parsed.Port()
	if port == "" {
		port = "5432"
	}
	password, _ := parsed.User.Password()
	adminConfig := databaseConfig{Host: host, Port: port, User: parsed.User.Username(), Password: password, SSLMode: parsed.Query().Get("sslmode")}
	if adminConfig.SSLMode == "" {
		adminConfig.SSLMode = "disable"
	}
	admin, err := openDatabase(adminConfig, "postgres")
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = admin.Close() })
	if err := observedLoopback(t.Context(), admin); err != nil {
		t.Fatal(err)
	}

	databaseName := fmt.Sprintf("ichizen_prod_adoption_%d", time.Now().UnixNano())
	if _, err := admin.ExecContext(t.Context(), `CREATE DATABASE "`+databaseName+`"`); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() {
		ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
		defer cancel()
		if _, err := admin.ExecContext(ctx, `DROP DATABASE "`+databaseName+`" WITH (FORCE)`); err != nil {
			t.Error(err)
		}
	})

	disposable := adminConfig
	disposable.Name = databaseName
	preRestoreDB, err := openDatabase(disposable, databaseName)
	if err != nil {
		t.Fatal(err)
	}
	if _, err := preRestoreDB.ExecContext(t.Context(), `CREATE EXTENSION IF NOT EXISTS btree_gist; CREATE SCHEMA "atlas_schema_revisions"; CREATE SCHEMA "audit_trail"; CREATE SCHEMA "extensions"`); err != nil {
		_ = preRestoreDB.Close()
		t.Fatal(err)
	}
	if err := preRestoreDB.Close(); err != nil {
		t.Fatal(err)
	}
	restore := exec.CommandContext(t.Context(), "pg_restore", "--exit-on-error", "--no-owner", "--no-privileges", "--schema=public", "--schema=atlas_schema_revisions", "--schema=audit_trail", "--dbname", databaseName, archive)
	restore.Env = disposable.postgresEnvironment(databaseName)
	if output, err := restore.CombinedOutput(); err != nil {
		t.Fatalf("restore production archive: %v: %s", err, sanitizeCommandOutput(output))
	}
	archiveListing, err := exec.CommandContext(t.Context(), "pg_restore", "--list", archive).Output()
	if err != nil {
		t.Fatal(err)
	}
	var overlayEntries []string
	for _, line := range strings.Split(string(archiveListing), "\n") {
		if strings.Contains(line, "FUNCTION public rls_auto_enable()") ||
			strings.Contains(line, "FUNCTION extensions grant_pg_cron_access()") ||
			strings.Contains(line, "FUNCTION extensions grant_pg_graphql_access()") ||
			strings.Contains(line, "FUNCTION extensions grant_pg_net_access()") ||
			strings.Contains(line, "FUNCTION extensions pgrst_ddl_watch()") ||
			strings.Contains(line, "FUNCTION extensions pgrst_drop_watch()") ||
			strings.Contains(line, "FUNCTION extensions set_graphql_placeholder()") ||
			strings.Contains(line, "EVENT TRIGGER - ") {
			overlayEntries = append(overlayEntries, line)
		}
	}
	if len(overlayEntries) != 14 {
		t.Fatalf("production archive overlay entries=%d, want 14", len(overlayEntries))
	}
	overlayList := filepath.Join(t.TempDir(), "overlay.list")
	if err := os.WriteFile(overlayList, []byte(strings.Join(overlayEntries, "\n")+"\n"), 0600); err != nil {
		t.Fatal(err)
	}
	overlayRestore := exec.CommandContext(t.Context(), "pg_restore", "--exit-on-error", "--clean", "--if-exists", "--no-owner", "--no-privileges", "--use-list", overlayList, "--dbname", databaseName, archive)
	overlayRestore.Env = disposable.postgresEnvironment(databaseName)
	if output, err := overlayRestore.CombinedOutput(); err != nil {
		t.Fatalf("restore production security overlay: %v: %s", err, sanitizeCommandOutput(output))
	}
	db, err := openDatabase(disposable, databaseName)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = db.Close() })
	migrationRole := fmt.Sprintf("ichizen_adoption_migrator_%d", time.Now().UnixNano())
	migrationPassword := fmt.Sprintf("test-adoption-%d", time.Now().UnixNano())
	migrationPasswordLiteral := strings.ReplaceAll(migrationPassword, "'", "''")
	if _, err := admin.ExecContext(t.Context(), fmt.Sprintf(`CREATE ROLE "%s" LOGIN BYPASSRLS PASSWORD '%s'`, migrationRole, migrationPasswordLiteral)); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() {
		ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
		defer cancel()
		_, _ = db.ExecContext(ctx, `DROP OWNED BY "`+migrationRole+`"`)
		if _, err := admin.ExecContext(ctx, `DROP ROLE IF EXISTS "`+migrationRole+`"`); err != nil {
			t.Error(err)
		}
	})
	if _, err := admin.ExecContext(t.Context(), `GRANT CONNECT ON DATABASE "`+databaseName+`" TO "`+migrationRole+`"`); err != nil {
		t.Fatalf("grant migration database access: %v", err)
	}
	for _, grant := range []string{
		`GRANT USAGE ON SCHEMA public, atlas_schema_revisions, audit_trail TO "` + migrationRole + `"`,
		`GRANT SELECT ON ALL TABLES IN SCHEMA public, audit_trail TO "` + migrationRole + `"`,
		`GRANT SELECT, INSERT ON atlas_schema_revisions.atlas_schema_revisions TO "` + migrationRole + `"`,
	} {
		if _, err := db.ExecContext(t.Context(), grant); err != nil {
			t.Fatalf("grant migration role: %v", err)
		}
	}
	migrationConfig := disposable
	migrationConfig.User = migrationRole
	migrationConfig.Password = migrationPassword
	migrationDB, err := openDatabase(migrationConfig, databaseName)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = migrationDB.Close() })
	var currentUser string
	var superuser, bypassRLS bool
	if err := migrationDB.QueryRowContext(t.Context(), `SELECT current_user, rolsuper, rolbypassrls FROM pg_roles WHERE rolname=current_user`).Scan(&currentUser, &superuser, &bypassRLS); err != nil {
		t.Fatal(err)
	}
	if currentUser != migrationRole || superuser || !bypassRLS {
		t.Fatalf("adoption did not use the reviewed non-superuser migration role: user=%q superuser=%t bypassrls=%t", currentUser, superuser, bypassRLS)
	}

	root, err := findRepositoryRoot()
	if err != nil {
		t.Fatal(err)
	}
	manifest, manifestRaw, err := schemareleases.Load("postgres/2026.09.2")
	if err != nil {
		t.Fatal(err)
	}
	snapshot, err := createMigrationSnapshot(t.Context(), root, manifest)
	if err != nil {
		t.Fatal(err)
	}
	defer snapshot.Close()
	atlasSums, err := readAtlasSums(filepath.Join(snapshot.Directory, "atlas.sum"))
	if err != nil {
		t.Fatal(err)
	}
	sourceFiles := make(map[string]migrationFile, len(snapshot.Files))
	for _, file := range snapshot.Files {
		sourceFiles[file.Name] = file
	}
	specs := []struct {
		version     string
		description string
		total       int64
	}{
		{version: "20260813000000", description: "add_plan_execution_strategy", total: 3},
		{version: "20260815000000", description: "plan_job_template", total: 4},
		{version: "20260822213000", description: "descriptor_schema_alignment", total: 21},
	}
	adopted := make([]adoptedRevision, 0, len(specs))
	for _, spec := range specs {
		name := spec.version + "_" + spec.description + ".sql"
		file, ok := sourceFiles[name]
		if !ok {
			t.Fatalf("missing immutable migration %s", name)
		}
		adopted = append(adopted, adoptedRevision{Version: spec.version, Description: spec.description, AtlasHash: atlasSums[name], PartialHashes: "null", Type: 2, Applied: spec.total, Total: spec.total, MigrationSHA256: file.SHA256})
	}
	oracles := productionAdoptionEffectOracles()
	for _, oracle := range oracles {
		if err := oracle.Validate(); err != nil {
			t.Fatalf("effect oracle %s: %v", oracle.ID, err)
		}
	}
	base, err := schemareleases.BaseCatalogFingerprint(t.Context(), migrationDB)
	if err != nil {
		t.Fatal(err)
	}
	overlay, err := schemareleases.OverlayFingerprint(t.Context(), migrationDB)
	if err != nil {
		t.Fatal(err)
	}
	if base != remoteAdoptionBaseFingerprint || overlay != remoteAdoptionOverlayFingerprint {
		t.Fatalf("restored production overlay/base=%s/%s, want %s/%s", base, overlay, remoteAdoptionBaseFingerprint, remoteAdoptionOverlayFingerprint)
	}
	target := productionAdoptionCloneTarget(databaseName, oracles, adopted, base, overlay)
	if err := target.validate(target.TargetKey); err != nil {
		t.Fatal(err)
	}
	if err := validateLegacyAdoptionSources(manifest, *target.Adoption, snapshot); err != nil {
		t.Fatal(err)
	}
	state, err := readLegacyAdoptionState(t.Context(), migrationDB)
	if err != nil {
		t.Fatal(err)
	}
	if got := legacyAdoptionStateKind(state, *target.Adoption); got != "pre" {
		t.Fatalf("restored production state=%s: %+v", got, state)
	}
	var auditBefore int64
	if err := migrationDB.QueryRowContext(t.Context(), "SELECT count(*) FROM audit_trail.audit_entry").Scan(&auditBefore); err != nil {
		t.Fatal(err)
	}
	observations, err := observeDataOracles(t.Context(), migrationDB, oracles, remoteAdoptionWorkspaceID)
	if err != nil {
		for _, oracle := range oracles {
			rows, queryErr := migrationDB.QueryContext(t.Context(), oracle.SQL, remoteAdoptionWorkspaceID)
			if queryErr != nil {
				t.Fatalf("raw effect oracle %s error: %v", oracle.ID, queryErr)
			}
			_ = rows.Close()
		}
		t.Fatal(err)
	}
	targetRaw, err := json.Marshal(target)
	if err != nil {
		t.Fatal(err)
	}
	targetPath := filepath.Join(t.TempDir(), "production-restore-adoption.json")
	if err := os.WriteFile(targetPath, targetRaw, 0600); err != nil {
		t.Fatal(err)
	}
	targetDigest := sha256Hex(targetRaw)
	plan := makeLegacyAdoptionPlan(target, targetDigest, manifest, manifestRaw, migrationConfig, observations)
	planDigest, err := plan.digest()
	if err != nil {
		t.Fatal(err)
	}
	archiveSHA, err := fileSHA256(archive)
	if err != nil {
		t.Fatal(err)
	}
	now := time.Now().UTC().Truncate(time.Second)
	receipt := legacyAdoptionBackupReceipt{
		FormatVersion: 1, Operation: "legacy_adoption", TargetKey: target.TargetKey, Database: databaseName,
		Endpoint: target.Upgrade.Endpoint, PlanSHA256: planDigest, PreTrackerFingerprint: plan.PreTrackerFingerprint,
		BaseCatalogFingerprint: plan.BaseCatalogFingerprint, OverlayID: plan.OverlayID, OverlayFingerprint: plan.OverlayFingerprint,
		ArchivePath: archive, ArchiveSHA256: archiveSHA, ArchiveListSHA256: sha256Hex(archiveListing), CreatedAt: now.Format(time.RFC3339), RestoreVerifiedAt: now.Format(time.RFC3339), RestoreEvidenceRef: "production-clone-pg17-20260920",
	}
	receiptRaw, err := json.MarshalIndent(receipt, "", "  ")
	if err != nil {
		t.Fatal(err)
	}
	receiptRaw = append(receiptRaw, '\n')
	receiptPath := filepath.Join(t.TempDir(), "adoption-backup.json")
	if err := os.WriteFile(receiptPath, receiptRaw, 0600); err != nil {
		t.Fatal(err)
	}
	values := map[string]string{"DB_INIT_RECEIPT_DIR": t.TempDir()}
	backupReceiptDigest := sha256Hex(receiptRaw)
	approvalRef := "production-clone-review-20260920"
	if err := applyLegacyAdoption(t.Context(), root, values, target, targetPath, manifest, manifestRaw, nil, migrationConfig, migrationDB, state, "pre", legacyAdoptionOptions{Apply: true, ApprovedPlan: planDigest, ApprovalRef: approvalRef, BackupReceipt: receiptPath, BackupSHA256: backupReceiptDigest}, targetDigest); err != nil {
		t.Fatal(err)
	}
	entries, err := os.ReadDir(values["DB_INIT_RECEIPT_DIR"])
	if err != nil {
		t.Fatal(err)
	}
	var adoptionReceipt legacyAdoptionReceipt
	foundReceipt := false
	for _, entry := range entries {
		if entry.IsDir() || !strings.Contains(entry.Name(), "_legacy-adoption_") {
			continue
		}
		raw, readErr := os.ReadFile(filepath.Join(values["DB_INIT_RECEIPT_DIR"], entry.Name()))
		if readErr != nil {
			t.Fatal(readErr)
		}
		if err := decodeStrict(raw, &adoptionReceipt); err != nil {
			t.Fatal(err)
		}
		foundReceipt = true
		break
	}
	if !foundReceipt || adoptionReceipt.MigrationSQLExecuted || adoptionReceipt.PlanSHA256 != planDigest || adoptionReceipt.BackupReceiptSHA256 != backupReceiptDigest || adoptionReceipt.ApprovalRef != approvalRef || adoptionReceipt.IntentSHA256 == "" || len(adoptionReceipt.AdoptedRevisions) != len(adopted) || len(adoptionReceipt.EffectOracles) != len(oracles) || adoptionReceipt.PreTrackerFingerprint != remoteAdoptionPreFingerprint || adoptionReceipt.PostTrackerFingerprint != remoteAdoptionPostFingerprint || adoptionReceipt.OverlayFingerprint != remoteAdoptionOverlayFingerprint || adoptionReceipt.Result != "metadata_adopted" {
		t.Fatalf("incomplete adoption receipt: %+v", adoptionReceipt)
	}
	if _, err := os.Stat(filepath.Join(values["DB_INIT_RECEIPT_DIR"], "legacy-adoption-intent-"+planDigest+".json")); err != nil {
		t.Fatalf("adoption intent missing: %v", err)
	}
	post, err := readLegacyAdoptionState(t.Context(), migrationDB)
	if err != nil {
		t.Fatal(err)
	}
	if got := legacyAdoptionStateKind(post, *target.Adoption); got != "post" {
		t.Fatalf("adopted production clone state=%s: %+v", got, post)
	}
	var auditAfter int64
	if err := migrationDB.QueryRowContext(t.Context(), "SELECT count(*) FROM audit_trail.audit_entry").Scan(&auditAfter); err != nil {
		t.Fatal(err)
	}
	if auditAfter != auditBefore {
		t.Fatalf("audit row count changed during metadata adoption: before=%d after=%d", auditBefore, auditAfter)
	}
	var operatorVersion string
	if err := migrationDB.QueryRowContext(t.Context(), `SELECT operator_version FROM atlas_schema_revisions.atlas_schema_revisions WHERE version='20260822213000'`).Scan(&operatorVersion); err != nil {
		t.Fatal(err)
	}
	if operatorVersion != legacyAdoptionOperatorVersion {
		t.Fatalf("operator_version=%q", operatorVersion)
	}
}
