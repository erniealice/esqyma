-- Migration: job_phase_universal_fields (up)
-- Dialect: postgres
-- Created: 2026-04-27T15:03:00Z
-- Rationale: Adds 13 columns to job_phase for template traceability, resource
--            assignment, scheduling dates, and phase sequencing. See
--            redesign-proto.md §2.3.

BEGIN;

ALTER TABLE job_phase
  ADD COLUMN IF NOT EXISTS template_phase_id       TEXT REFERENCES job_template_phase(id),
  ADD COLUMN IF NOT EXISTS resource_id             TEXT REFERENCES resource(id),
  ADD COLUMN IF NOT EXISTS planned_start           BIGINT,
  ADD COLUMN IF NOT EXISTS planned_start_string    TEXT,
  ADD COLUMN IF NOT EXISTS planned_end             BIGINT,
  ADD COLUMN IF NOT EXISTS planned_end_string      TEXT,
  ADD COLUMN IF NOT EXISTS actual_start            BIGINT,
  ADD COLUMN IF NOT EXISTS actual_start_string     TEXT,
  ADD COLUMN IF NOT EXISTS actual_end              BIGINT,
  ADD COLUMN IF NOT EXISTS actual_end_string       TEXT,
  ADD COLUMN IF NOT EXISTS setup_minutes           INTEGER,
  ADD COLUMN IF NOT EXISTS run_minutes_per_unit    DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS predecessor_phase_id    TEXT REFERENCES job_phase(id);

CREATE INDEX idx_job_phase_template_phase_id
  ON job_phase(template_phase_id) WHERE template_phase_id IS NOT NULL;
CREATE INDEX idx_job_phase_resource_id
  ON job_phase(resource_id) WHERE resource_id IS NOT NULL;

COMMIT;
