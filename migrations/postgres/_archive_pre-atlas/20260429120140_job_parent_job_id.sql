BEGIN;
ALTER TABLE job ADD COLUMN IF NOT EXISTS parent_job_id TEXT REFERENCES job(id);
CREATE INDEX IF NOT EXISTS idx_job_parent_job_id ON job(parent_job_id);
COMMIT;
