BEGIN;
CREATE INDEX IF NOT EXISTS idx_job_origin_active_children
  ON job (origin_type, origin_id)
  WHERE parent_job_id IS NOT NULL AND active = true;
COMMIT;
