-- Migration: revenue_milestone_fk (down)
-- Dialect: postgres
-- Created: 2026-04-29T12:00:50Z
-- Rationale: Drops the milestone traceability FK columns from revenue. Run
--            BEFORE rolling back 20260429120030_billing_event_table because
--            revenue.billing_event_id references billing_event.id.

BEGIN;

DROP INDEX IF EXISTS idx_revenue_billing_event_id;
DROP INDEX IF EXISTS idx_revenue_job_phase_id;

ALTER TABLE revenue
  DROP COLUMN IF EXISTS billing_event_id,
  DROP COLUMN IF EXISTS job_phase_id;

COMMIT;
