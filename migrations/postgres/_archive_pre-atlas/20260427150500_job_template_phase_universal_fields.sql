BEGIN;
ALTER TABLE job_template_phase
  ADD COLUMN IF NOT EXISTS resource_id                    TEXT REFERENCES resource(id),
  ADD COLUMN IF NOT EXISTS setup_minutes                  INTEGER,
  ADD COLUMN IF NOT EXISTS run_minutes_per_unit           DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS teardown_minutes               INTEGER,
  ADD COLUMN IF NOT EXISTS predecessor_template_phase_id  TEXT REFERENCES job_template_phase(id);
CREATE INDEX idx_job_template_phase_resource_id
  ON job_template_phase(resource_id) WHERE resource_id IS NOT NULL;
COMMIT;
