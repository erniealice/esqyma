BEGIN;
ALTER TABLE revenue
  ADD COLUMN IF NOT EXISTS job_phase_id     TEXT REFERENCES job_phase(id),
  ADD COLUMN IF NOT EXISTS billing_event_id TEXT REFERENCES billing_event(id);
CREATE INDEX IF NOT EXISTS idx_revenue_job_phase_id     ON revenue(job_phase_id);
CREATE INDEX IF NOT EXISTS idx_revenue_billing_event_id ON revenue(billing_event_id);
COMMIT;
