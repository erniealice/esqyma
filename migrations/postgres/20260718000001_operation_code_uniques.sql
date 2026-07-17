-- =============================================================================
-- Operation code uniqueness — the parent-scoped invariants that make the
-- template-hierarchy codes (job_template_phase.code / job_template_task.code /
-- outcome_criteria.code, added in 20260718000000) safe as document-template map
-- keys. Deferred out of the column migration until codes were backfilled and a
-- duplicate preflight proved zero collisions at every grain.
--
-- 2 parent-scoped UNIQUE constraints:
--   uq_job_template_phase_parent_code  (job_template_id, code)
--   uq_job_template_task_parent_code   (job_template_phase_id, code)
-- 4 partial UNIQUE indexes:
--   uq_outcome_criteria_published_group        one published version per group
--   uq_outcome_criteria_published_domain_code  one published code per domain
--   uq_job_category_workspace_code             one code per workspace category
--   uq_template_task_criteria_active_pair      one active binding per pair
--
-- NULL codes stay distinct under the composite UNIQUEs, so the many
-- intentionally-uncoded rows (unrelated tasks, uncoded phase twins) never
-- collide. The two code-gated indexes match zero rows where code is NULL. On a
-- database with no code data yet (the migration-tracked tier), every statement
-- is a trivially-satisfied no-op; the invariants engage as codes are populated.
--
-- Purely additive + existence-guarded (idempotent): pg_constraint-guarded ADD
-- CONSTRAINT, CREATE UNIQUE INDEX IF NOT EXISTS. No BEGIN/COMMIT (atlas wraps
-- each file, txmode=file). Authored directly into the sequence (NOT via db:diff)
-- for the replay reason documented in 20260716000000 / 20260718000000.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Parent-scoped code uniqueness (ADD CONSTRAINT has no IF NOT EXISTS, so
--    guard on pg_constraint).
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_job_template_phase_parent_code') THEN
    ALTER TABLE "job_template_phase"
      ADD CONSTRAINT "uq_job_template_phase_parent_code" UNIQUE ("job_template_id", "code");
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_job_template_task_parent_code') THEN
    ALTER TABLE "job_template_task"
      ADD CONSTRAINT "uq_job_template_task_parent_code" UNIQUE ("job_template_phase_id", "code");
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 2. outcome_criteria published-lineage uniqueness (partial unique indexes).
-- ---------------------------------------------------------------------------
CREATE UNIQUE INDEX IF NOT EXISTS "uq_outcome_criteria_published_group"
  ON "outcome_criteria" ("criteria_group_id")
  WHERE "active" AND "version_status" = 'VERSION_STATUS_PUBLISHED';

CREATE UNIQUE INDEX IF NOT EXISTS "uq_outcome_criteria_published_domain_code"
  ON "outcome_criteria" ("scope", COALESCE("workspace_id", ''), COALESCE("industry_code", ''), "code")
  WHERE "active" AND "version_status" = 'VERSION_STATUS_PUBLISHED' AND "code" IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 3. job_category workspace-code + template_task_criteria active-pair.
-- ---------------------------------------------------------------------------
CREATE UNIQUE INDEX IF NOT EXISTS "uq_job_category_workspace_code"
  ON "job_category" (COALESCE("workspace_id", ''), "code")
  WHERE "code" IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "uq_template_task_criteria_active_pair"
  ON "template_task_criteria" ("job_template_task_id", "outcome_criteria_id")
  WHERE "active";
