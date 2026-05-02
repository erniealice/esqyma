-- Migration: revenue_milestone_fk (up)
-- Dialect: postgres
-- Created: 2026-04-29T12:00:50Z
-- Rationale: Adds revenue.job_phase_id and revenue.billing_event_id for
--            milestone-billing traceability. job_phase_id is denormalized at
--            create time from BillingEvent.job_phase_id for fast join-free
--            reporting; billing_event_id is the one-to-one link back to the
--            source event row, used as the idempotency key when the parent
--            PricePlan has billing_kind = MILESTONE. See plan §2.6.

BEGIN;

ALTER TABLE revenue
  ADD COLUMN IF NOT EXISTS job_phase_id     TEXT REFERENCES job_phase(id),
  ADD COLUMN IF NOT EXISTS billing_event_id TEXT REFERENCES billing_event(id);

CREATE INDEX IF NOT EXISTS idx_revenue_job_phase_id     ON revenue(job_phase_id);
CREATE INDEX IF NOT EXISTS idx_revenue_billing_event_id ON revenue(billing_event_id);

COMMIT;
