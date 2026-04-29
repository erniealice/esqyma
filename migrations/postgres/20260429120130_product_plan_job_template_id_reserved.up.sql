-- Migration: product_plan_job_template_id_reserved (up)
-- Dialect: postgres
-- Created: 2026-04-29T12:01:30Z
-- Rationale: Drops the never-populated `job_template_id` column from
--            product_plan. ProductPlan is a catalog-membership row, not a
--            process anchor — the JobTemplate FK now lives on Plan
--            (Plan.job_template_id, plan §2.1). Field tag 14 + name are
--            reserved in proto (product_plan.proto). Idempotent via
--            IF EXISTS so re-runs and environments without the column
--            are no-ops. See plan §8 migration table.

BEGIN;

DROP INDEX IF EXISTS idx_product_plan_job_template_id;

ALTER TABLE product_plan DROP CONSTRAINT IF EXISTS fk_product_plan_job_template_id;

ALTER TABLE product_plan DROP COLUMN IF EXISTS job_template_id;

COMMIT;
