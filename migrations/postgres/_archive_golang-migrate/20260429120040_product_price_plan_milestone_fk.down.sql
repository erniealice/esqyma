-- Migration: product_price_plan_milestone_fk (down)
-- Dialect: postgres
-- Created: 2026-04-29T12:00:40Z
-- Rationale: Drops the milestone-phase FK column from product_price_plan.

BEGIN;

DROP INDEX IF EXISTS idx_product_price_plan_job_template_phase_id;

ALTER TABLE product_price_plan
  DROP COLUMN IF EXISTS job_template_phase_id;

COMMIT;
