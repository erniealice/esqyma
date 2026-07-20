-- =============================================================================
-- job_template_document_template — versioned binding of the job_template
--   rendering surface (the outcome-matrix "grade sheet") to a document_template,
--   scoped by workspace + (optional) price_schedule + (optional) job_category.
--
--   Versions/reproduces work already applied LIVE to education1 via direct psql
--   (the 20260720-grade-sheet-export-drawer plan, Wave B / P3). Mirrors the live
--   education1 DDL byte-faithfully. This is a clone of
--   job_outcome_summary_document_template (20260716000000:90-119, the JOSDT
--   precedent) with two locked deltas:
--     * a job_category_id axis (sheet COLUMN SHAPE is uniform per category; the
--       doctemplate engine bakes shape per artifact) — resolver + unique index
--       gain the category bucket.
--     * version DEFAULT 0 (not 1) — fixes the JOSDT DDL/create.go drift at birth;
--       0 while DRAFT, allocated MAX+1 per bucket at publish.
--
-- Purely additive. The CREATE TABLE is IF NOT EXISTS with all constraints inline
-- (new table = empty at create, so NOT NULL / DEFAULT / PK / FK / CHECK ship
-- directly; the NOT VALID->VALIDATE two-step only applies when ALTERing a
-- POPULATED table). Enum-discriminator version_status is plain TEXT: the postgres
-- adapters round-trip the protojson SCREAMING enum name (VERSION_STATUS_PUBLISHED)
-- directly, so a lowercase CHECK would reject them.
--
-- No explicit BEGIN/COMMIT: atlas wraps each file in its own transaction
-- (txmode=file). Authored directly into the sequence (education1-psql-first,
-- Atlas mirror second) for the replay reason documented in 20260607100000 /
-- 20260622000000 / 20260716000000.
-- =============================================================================
CREATE TABLE IF NOT EXISTS "job_template_document_template" (
  "id"                    TEXT PRIMARY KEY,
  "workspace_id"          TEXT NOT NULL,
  "document_template_id"  TEXT NOT NULL,
  "price_schedule_id"     TEXT NULL,
  "job_category_id"       TEXT NULL,
  "version"               INTEGER NOT NULL DEFAULT 0,
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
  CONSTRAINT "ck_jt_doc_tmpl_validity" CHECK ("validity_start" IS NULL OR "validity_end" IS NULL OR "validity_start" < "validity_end"),
  CONSTRAINT "job_template_document_template_supersedes_binding_id_fkey" FOREIGN KEY ("supersedes_binding_id") REFERENCES "job_template_document_template"("id"),
  CONSTRAINT "job_template_document_template_document_template_id_fkey"  FOREIGN KEY ("document_template_id") REFERENCES "document_template"("id"),
  CONSTRAINT "job_template_document_template_price_schedule_id_fkey"     FOREIGN KEY ("price_schedule_id") REFERENCES "price_schedule"("id"),
  CONSTRAINT "job_template_document_template_job_category_id_fkey"       FOREIGN KEY ("job_category_id") REFERENCES "job_category"("id"),
  CONSTRAINT "job_template_document_template_workspace_id_fkey"          FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);
-- Resolver hot path: newest published binding for (workspace, category, schedule).
CREATE INDEX IF NOT EXISTS "ix_jt_doc_tmpl_resolve"
  ON "job_template_document_template" ("workspace_id", "job_category_id", "price_schedule_id", "version" DESC)
  WHERE "active" = true AND "version_status" = 'VERSION_STATUS_PUBLISHED';
-- One published version per (workspace, schedule-or-fallback, category-or-fallback, version).
CREATE UNIQUE INDEX IF NOT EXISTS "uq_jt_doc_tmpl_pub_version"
  ON "job_template_document_template" ("workspace_id", COALESCE("price_schedule_id", ''), COALESCE("job_category_id", ''), "version")
  WHERE "active" = true AND "version_status" = 'VERSION_STATUS_PUBLISHED';
