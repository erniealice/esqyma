-- Migration: job_parent_job_id (up)
-- Dialect: postgres
-- Created: 2026-04-29T12:01:40Z
-- Rationale: Adds Job.parent_job_id (proto field 43) to the job table. The
--            auto-spawn use case writes this column when spawning child
--            Jobs from JobTemplateRelation rows; the Operations tab on
--            Subscription detail (centymo) reads it to nest child Jobs
--            under their parent. Earlier auto-spawn migrations missed this
--            column, leaving children as flat siblings of their parent.
--            See docs/plan/20260429-auto-spawn-jobs-from-subscription/plan.md §4
--            (option C — parent-child Jobs).

BEGIN;

ALTER TABLE job ADD COLUMN IF NOT EXISTS parent_job_id TEXT REFERENCES job(id);
CREATE INDEX IF NOT EXISTS idx_job_parent_job_id ON job(parent_job_id);

COMMIT;
