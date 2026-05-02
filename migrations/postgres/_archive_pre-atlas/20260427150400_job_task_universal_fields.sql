BEGIN;
ALTER TABLE job_task
  ADD COLUMN IF NOT EXISTS template_task_id        TEXT REFERENCES job_template_task(id),
  ADD COLUMN IF NOT EXISTS resource_id             TEXT REFERENCES resource(id),
  ADD COLUMN IF NOT EXISTS planned_quantity        DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS completed_quantity      DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS percent_complete        DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS actual_start            BIGINT,
  ADD COLUMN IF NOT EXISTS actual_start_string     TEXT,
  ADD COLUMN IF NOT EXISTS actual_end              BIGINT,
  ADD COLUMN IF NOT EXISTS actual_end_string       TEXT,
  ADD COLUMN IF NOT EXISTS predecessor_task_ids    TEXT[],
  ADD COLUMN IF NOT EXISTS allow_parallel          BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS workflow_step_id        TEXT;
CREATE INDEX idx_job_task_template_task_id
  ON job_task(template_task_id) WHERE template_task_id IS NOT NULL;
CREATE INDEX idx_job_task_resource_id
  ON job_task(resource_id) WHERE resource_id IS NOT NULL;
CREATE INDEX idx_job_task_workflow_step_id
  ON job_task(workflow_step_id) WHERE workflow_step_id IS NOT NULL;
COMMIT;
