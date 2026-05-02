-- Migration: plan_job_template_id (up)
-- Dialect: postgres
-- Created: 2026-04-29T12:01:00Z
-- Rationale: Adds plan.job_template_id — the root JobTemplate FK for the
--            operational workflow that this Plan's engagements run. NULL
--            allowed: Plans with no operational tracking (advisory retainers,
--            R1 retail patterns) leave it NULL and the auto-spawn use case
--            skips silently. See auto-spawn-jobs-from-subscription plan §2.1
--            and §17 Decision 9 (data-model reframe — Plan owns the FK, not
--            Product or ProductPlan).

BEGIN;

ALTER TABLE plan
  ADD COLUMN IF NOT EXISTS job_template_id TEXT REFERENCES job_template(id);

CREATE INDEX IF NOT EXISTS idx_plan_job_template_id
  ON plan(job_template_id) WHERE job_template_id IS NOT NULL;

COMMIT;
