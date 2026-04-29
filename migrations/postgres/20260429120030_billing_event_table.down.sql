-- Migration: billing_event_table (down)
-- Dialect: postgres
-- Created: 2026-04-29T12:00:30Z
-- Rationale: Drops the billing_event table and all its indexes. Note: any
--            FK back-edges from revenue.billing_event_id (added in 20260429120050)
--            must be rolled back first.

BEGIN;

DROP INDEX IF EXISTS idx_billing_event_status;
DROP INDEX IF EXISTS idx_billing_event_revenue_id;
DROP INDEX IF EXISTS idx_billing_event_product_price_plan_id;
DROP INDEX IF EXISTS idx_billing_event_job_template_phase_id;
DROP INDEX IF EXISTS idx_billing_event_job_phase_id;
DROP INDEX IF EXISTS idx_billing_event_job_id;
DROP INDEX IF EXISTS idx_billing_event_subscription_id;

DROP TABLE IF EXISTS billing_event;

COMMIT;
