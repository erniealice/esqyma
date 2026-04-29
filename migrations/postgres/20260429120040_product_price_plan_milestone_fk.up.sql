-- Migration: product_price_plan_milestone_fk (up)
-- Dialect: postgres
-- Created: 2026-04-29T12:00:40Z
-- Rationale: Adds product_price_plan.job_template_phase_id — the per-line
--            phase gate used by the MILESTONE branch of recognize-revenue.
--            When set on a MILESTONE PricePlan, the line bills only under
--            that phase's BillingEvent. NULL on a MILESTONE plan = falls
--            through to the first event. See plan §2.5.

BEGIN;

ALTER TABLE product_price_plan
  ADD COLUMN IF NOT EXISTS job_template_phase_id TEXT REFERENCES job_template_phase(id);

CREATE INDEX IF NOT EXISTS idx_product_price_plan_job_template_phase_id
  ON product_price_plan(job_template_phase_id);

COMMIT;
