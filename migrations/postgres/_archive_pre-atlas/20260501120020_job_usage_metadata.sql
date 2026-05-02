BEGIN;
ALTER TABLE job
  ADD COLUMN IF NOT EXISTS usage_request_date DATE,
  ADD COLUMN IF NOT EXISTS usage_ordinal INTEGER;
CREATE INDEX IF NOT EXISTS idx_job_usage_request_date
  ON job (origin_id, usage_request_date)
  WHERE usage_request_date IS NOT NULL;
COMMIT;
