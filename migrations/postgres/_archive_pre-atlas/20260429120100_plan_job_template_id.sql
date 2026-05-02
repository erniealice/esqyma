BEGIN;
ALTER TABLE plan
  ADD COLUMN IF NOT EXISTS job_template_id TEXT REFERENCES job_template(id);
CREATE INDEX IF NOT EXISTS idx_plan_job_template_id
  ON plan(job_template_id) WHERE job_template_id IS NOT NULL;
COMMIT;
