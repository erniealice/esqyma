-- Migration: job_phase_universal_fields (down)
-- Dialect: postgres
-- Created: 2026-04-27T15:03:00Z

BEGIN;

DROP INDEX IF EXISTS idx_job_phase_resource_id;
DROP INDEX IF EXISTS idx_job_phase_template_phase_id;

ALTER TABLE job_phase
  DROP COLUMN IF EXISTS predecessor_phase_id,
  DROP COLUMN IF EXISTS run_minutes_per_unit,
  DROP COLUMN IF EXISTS setup_minutes,
  DROP COLUMN IF EXISTS actual_end_string,
  DROP COLUMN IF EXISTS actual_end,
  DROP COLUMN IF EXISTS actual_start_string,
  DROP COLUMN IF EXISTS actual_start,
  DROP COLUMN IF EXISTS planned_end_string,
  DROP COLUMN IF EXISTS planned_end,
  DROP COLUMN IF EXISTS planned_start_string,
  DROP COLUMN IF EXISTS planned_start,
  DROP COLUMN IF EXISTS resource_id,
  DROP COLUMN IF EXISTS template_phase_id;

COMMIT;
