-- =============================================================================
-- Job-Category primitive + document-template lineage + Phase-1b columns (B2).
--   Versions/reproduces work already applied LIVE to education1 via direct psql
--   (the 20260714 job-category-primitive plan). Mirrors the live education1 DDL
--   captured in docs/plan/20260714-job-category-primitive/b2-live-ddl.sql
--   byte-faithfully. document_template was historically an Atlas orphan (absent
--   from every generated migration); this file is its first versioned creation,
--   paired with the proto `(options.v1.table).table = true` added in the same
--   commit so future db:diff no longer treats it as external.
--
-- 3 new tables:
--   document_template  (referenced by the binding)
--   job_category       (referenced by job / job_template)
--   job_outcome_summary_document_template  (the binding; self-ref + 3 FKs)
-- 5 additive columns:
--   job_template.job_category_id, job.job_category_id (denorm),
--   price_schedule.closed, job_outcome_summary.source, job_outcome_summary.is_authoritative
-- + all indexes / the partial resolve+publish indexes / the validity CHECK / the FKs.
--
-- Purely additive. Every CREATE/ALTER is IF NOT EXISTS; every ADD CONSTRAINT is
-- pg_constraint-guarded, so the file is idempotent and safe to (re-)apply against
-- a DB whose job-category layer is already partially present (professional1 has
-- the 3 tables + the 2 job_category_id columns from earlier parity psql; the
-- 3 Phase-1b columns are the net-new delta there).
--
-- New tables are EMPTY at create, so NOT NULL / DEFAULT / PK / FK / CHECK ship
-- directly in CREATE TABLE (the NOT VALID->VALIDATE two-step only applies when
-- ALTERing a POPULATED table). Enum-discriminator columns (version_status) are
-- plain TEXT: the postgres adapters round-trip the protojson SCREAMING enum name
-- (VERSION_STATUS_PUBLISHED) directly, so a lowercase CHECK would reject them.
--
-- No explicit BEGIN/COMMIT: atlas wraps each file in its own transaction
-- (txmode=file), matching the convention of every atlas-applied migration here.
-- Authored directly into the sequence (NOT via db:diff) for the replay reason
-- documented in 20260607100000 / 20260622000000.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. document_template — generic template artifact (document domain).
--    timestamptz date_created/date_modified (unlike the bigint-epoch tables).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "document_template" (
  "id"                TEXT PRIMARY KEY,
  "date_created"      TIMESTAMPTZ NULL DEFAULT now(),
  "date_modified"     TIMESTAMPTZ NULL DEFAULT now(),
  "active"            BOOLEAN NOT NULL DEFAULT true,
  "name"              TEXT NULL,
  "description"       TEXT NULL,
  "workspace_id"      TEXT NOT NULL,
  "template_type"     TEXT NULL,
  "document_purpose"  TEXT NULL,
  "storage_container" TEXT NULL,
  "storage_key"       TEXT NULL,
  "original_filename" TEXT NULL,
  "file_size_bytes"   BIGINT NULL,
  "is_default"        BOOLEAN NULL DEFAULT false,
  "created_by"        TEXT NULL,
  "status"            TEXT NOT NULL DEFAULT 'active',
  "module_key"        TEXT NULL,
  CONSTRAINT "document_template_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS "idx_document_template_document_purpose" ON "document_template" ("document_purpose");
CREATE INDEX IF NOT EXISTS "idx_document_template_module_key"       ON "document_template" ("module_key");
CREATE INDEX IF NOT EXISTS "idx_document_template_workspace_id"     ON "document_template" ("workspace_id") WHERE "workspace_id" IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 2. job_category — per-workspace generic taxonomy node (operation domain).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "job_category" (
  "id"            TEXT PRIMARY KEY,
  "name"          TEXT NOT NULL,
  "date_created"  BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active"        BOOLEAN NOT NULL DEFAULT true,
  "workspace_id"  TEXT NOT NULL,
  "code"          TEXT NULL,
  "sort_order"    INTEGER NULL,
  "status"        TEXT NULL,
  CONSTRAINT "fk_job_category_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);
CREATE INDEX IF NOT EXISTS "idx_job_category_code"         ON "job_category" ("code");
CREATE INDEX IF NOT EXISTS "idx_job_category_workspace_id" ON "job_category" ("workspace_id");

-- ---------------------------------------------------------------------------
-- 3. job_outcome_summary_document_template — versioned binding of the
--    job_outcome_summary outcome family to a document_template, scoped by
--    workspace + (optional) price_schedule. Self-ref supersession + validity
--    window + publish lifecycle.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "job_outcome_summary_document_template" (
  "id"                    TEXT PRIMARY KEY,
  "workspace_id"          TEXT NOT NULL,
  "document_template_id"  TEXT NOT NULL,
  "price_schedule_id"     TEXT NULL,
  "version"               INTEGER NOT NULL DEFAULT 1,
  "version_status"        TEXT NOT NULL DEFAULT 'VERSION_STATUS_DRAFT',
  "validity_start"        TIMESTAMPTZ NULL,
  "validity_end"          TIMESTAMPTZ NULL,
  "supersedes_binding_id" TEXT NULL,
  "active"                BOOLEAN NOT NULL DEFAULT true,
  "created_by"            TEXT NULL,
  "published_at"          BIGINT NULL,
  "published_by"          TEXT NULL,
  "date_created"          BIGINT NULL,
  "date_modified"         BIGINT NULL,
  CONSTRAINT "ck_jos_doc_tmpl_validity" CHECK ("validity_start" IS NULL OR "validity_end" IS NULL OR "validity_start" < "validity_end"),
  CONSTRAINT "job_outcome_summary_document_templat_supersedes_binding_id_fkey" FOREIGN KEY ("supersedes_binding_id") REFERENCES "job_outcome_summary_document_template"("id"),
  CONSTRAINT "job_outcome_summary_document_template_document_template_id_fkey"  FOREIGN KEY ("document_template_id") REFERENCES "document_template"("id"),
  CONSTRAINT "job_outcome_summary_document_template_price_schedule_id_fkey"     FOREIGN KEY ("price_schedule_id") REFERENCES "price_schedule"("id"),
  CONSTRAINT "job_outcome_summary_document_template_workspace_id_fkey"          FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);
-- Resolver hot path: newest published binding for (workspace, schedule).
CREATE INDEX IF NOT EXISTS "ix_jos_doc_tmpl_resolve"
  ON "job_outcome_summary_document_template" ("workspace_id", "price_schedule_id", "version" DESC)
  WHERE "active" = true AND "version_status" = 'VERSION_STATUS_PUBLISHED';
-- One published version per (workspace, schedule-or-fallback, version).
CREATE UNIQUE INDEX IF NOT EXISTS "uq_jos_doc_tmpl_pub_version"
  ON "job_outcome_summary_document_template" ("workspace_id", COALESCE("price_schedule_id", ''), "version")
  WHERE "version_status" = 'VERSION_STATUS_PUBLISHED';

-- ---------------------------------------------------------------------------
-- 4. Phase-1b additive columns on existing (populated) tables.
--    Denorm job_category_id (job, job_template) + price_schedule.closed +
--    job_outcome_summary.source / .is_authoritative. All nullable.
-- ---------------------------------------------------------------------------
ALTER TABLE "job_template"         ADD COLUMN IF NOT EXISTS "job_category_id" TEXT NULL;
ALTER TABLE "job"                  ADD COLUMN IF NOT EXISTS "job_category_id" TEXT NULL;
ALTER TABLE "price_schedule"       ADD COLUMN IF NOT EXISTS "closed"          BOOLEAN NULL;
ALTER TABLE "job_outcome_summary"  ADD COLUMN IF NOT EXISTS "source"          TEXT NULL;
ALTER TABLE "job_outcome_summary"  ADD COLUMN IF NOT EXISTS "is_authoritative" BOOLEAN NULL;

-- Denorm FKs (pg_constraint-guarded — ALTER ADD CONSTRAINT has no IF NOT EXISTS).
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_job_job_category_id') THEN
    ALTER TABLE "job" ADD CONSTRAINT "fk_job_job_category_id"
      FOREIGN KEY ("job_category_id") REFERENCES "job_category"("id");
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_job_template_job_category_id') THEN
    ALTER TABLE "job_template" ADD CONSTRAINT "fk_job_template_job_category_id"
      FOREIGN KEY ("job_category_id") REFERENCES "job_category"("id");
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "idx_job_job_category_id"          ON "job" ("job_category_id");
CREATE INDEX IF NOT EXISTS "idx_job_template_job_category_id" ON "job_template" ("job_category_id");
