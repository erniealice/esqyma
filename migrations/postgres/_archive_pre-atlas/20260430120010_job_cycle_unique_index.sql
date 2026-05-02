BEGIN;
CREATE UNIQUE INDEX IF NOT EXISTS idx_job_subscription_cycle_period_unique
  ON job (origin_id, cycle_period_start)
  WHERE origin_type = 'SUBSCRIPTION'
    AND parent_job_id IS NOT NULL
    AND cycle_period_start IS NOT NULL;
COMMIT;
