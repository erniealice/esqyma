-- Migration: job_template_phase_billing_fields (down)
-- Dialect: postgres
-- Created: 2026-04-29T12:00:20Z
-- Rationale: Drops the four milestone billing-weight columns from
--            job_template_phase in reverse order.

BEGIN;

ALTER TABLE job_template_phase DROP COLUMN IF EXISTS billing_currency;
ALTER TABLE job_template_phase DROP COLUMN IF EXISTS billing_amount;
ALTER TABLE job_template_phase DROP COLUMN IF EXISTS billing_percent_bps;
ALTER TABLE job_template_phase DROP COLUMN IF EXISTS triggers_billing;

COMMIT;
