-- Migration: plan_job_template_id (down)
-- Dialect: postgres
-- Created: 2026-04-29T12:01:00Z
-- Rationale: Reverses 20260429120100. Drops the index then the column.

BEGIN;

DROP INDEX IF EXISTS idx_plan_job_template_id;

ALTER TABLE plan
  DROP COLUMN IF EXISTS job_template_id;

COMMIT;
