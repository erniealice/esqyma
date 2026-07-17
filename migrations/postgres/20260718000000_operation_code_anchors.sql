-- =============================================================================
-- Operation code anchors — stable machine keys on the template hierarchy.
--   Adds an optional `code` path-anchor to job_template_phase (30),
--   job_template_task (40) and outcome_criteria (38), paired with the proto
--   `optional string code` fields (index = true + path CHECK) added in the same
--   commit. These codes are the placeholder/path pivots consumed by generic
--   document templates (parity with job_category.code, migration 20260716000000).
--
-- 3 additive columns (all nullable):
--   job_template_phase.code, job_template_task.code, outcome_criteria.code
-- 3 path CHECK constraints (normalized codes: lower(btrim(code)) ~ ^[a-z][a-z0-9_]*$)
-- 3 single-column indexes (mirror the proto (options.v1.db).index = true)
--
-- Purely additive. Every ADD COLUMN is IF NOT EXISTS; every ADD CONSTRAINT is
-- pg_constraint-guarded; every CREATE INDEX is IF NOT EXISTS — idempotent and
-- safe to (re-)apply against a DB where the column layer is already partially
-- present. The columns are net-new and entirely NULL at create, so the CHECK
-- constraints validate against a trivially-satisfying (all-NULL) column set and
-- ship directly (no NOT VALID -> VALIDATE two-step needed).
--
-- DEFERRED TO A LATER MIGRATION (after code backfill + duplicate preflight):
--   the parent-scoped UNIQUE constraints
--     uq_job_template_phase_parent_code (job_template_id, code)
--     uq_job_template_task_parent_code  (job_template_phase_id, code)
--   the outcome_criteria partial unique indexes
--     uq_outcome_criteria_published_group        (criteria_group_id) WHERE active+published
--     uq_outcome_criteria_published_domain_code  (scope, workspace_id, industry_code, code) WHERE active+published
--   plus uq_job_category_workspace_code and uq_template_task_criteria_active_pair.
--   These uniqueness invariants (declared in the proto docs / message-level
--   unique_together) land ONLY once codes are backfilled and a preflight audit
--   has proven zero pre-existing collisions, so the constraint add fails loudly
--   against real data rather than masking a dup. This file establishes the
--   columns + normalization only.
--
-- No explicit BEGIN/COMMIT: atlas wraps each file in its own transaction
-- (txmode=file). Authored directly into the sequence (NOT via db:diff) for the
-- replay reason documented in 20260607100000 / 20260716000000.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Additive nullable code columns.
-- ---------------------------------------------------------------------------
ALTER TABLE "job_template_phase" ADD COLUMN IF NOT EXISTS "code" TEXT NULL;
ALTER TABLE "job_template_task"  ADD COLUMN IF NOT EXISTS "code" TEXT NULL;
ALTER TABLE "outcome_criteria"   ADD COLUMN IF NOT EXISTS "code" TEXT NULL;

-- ---------------------------------------------------------------------------
-- 2. Path-normalization CHECK constraints (pg_constraint-guarded — ALTER ADD
--    CONSTRAINT has no IF NOT EXISTS). Code is NULL or a normalized path
--    segment: lower(btrim(code)) matching ^[a-z][a-z0-9_]*$.
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'job_template_phase_code_path_chk') THEN
    ALTER TABLE "job_template_phase" ADD CONSTRAINT "job_template_phase_code_path_chk"
      CHECK ("code" IS NULL OR ("code" = lower(btrim("code")) AND "code" ~ '^[a-z][a-z0-9_]*$'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'job_template_task_code_path_chk') THEN
    ALTER TABLE "job_template_task" ADD CONSTRAINT "job_template_task_code_path_chk"
      CHECK ("code" IS NULL OR ("code" = lower(btrim("code")) AND "code" ~ '^[a-z][a-z0-9_]*$'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'outcome_criteria_code_path_chk') THEN
    ALTER TABLE "outcome_criteria" ADD CONSTRAINT "outcome_criteria_code_path_chk"
      CHECK ("code" IS NULL OR ("code" = lower(btrim("code")) AND "code" ~ '^[a-z][a-z0-9_]*$'));
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 3. Single-column code indexes (mirror the proto (options.v1.db).index = true;
--    parity with idx_job_category_code).
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS "idx_job_template_phase_code" ON "job_template_phase" ("code");
CREATE INDEX IF NOT EXISTS "idx_job_template_task_code"  ON "job_template_task"  ("code");
CREATE INDEX IF NOT EXISTS "idx_outcome_criteria_code"   ON "outcome_criteria"   ("code");
