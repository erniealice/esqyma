-- Migration: job_template_phase_billing_fields (up)
-- Dialect: postgres
-- Created: 2026-04-29T12:00:20Z
-- Rationale: Adds milestone billing-weight columns to job_template_phase. Used
--            by the MILESTONE branch of recognize-revenue to materialize one
--            BillingEvent per phase that triggers billing, computing each
--            event's billable_amount from these weights. See plan §2.3.

BEGIN;

ALTER TABLE job_template_phase ADD COLUMN IF NOT EXISTS triggers_billing    BOOLEAN;
ALTER TABLE job_template_phase ADD COLUMN IF NOT EXISTS billing_percent_bps INTEGER;
ALTER TABLE job_template_phase ADD COLUMN IF NOT EXISTS billing_amount      BIGINT;
ALTER TABLE job_template_phase ADD COLUMN IF NOT EXISTS billing_currency    TEXT;

COMMIT;
