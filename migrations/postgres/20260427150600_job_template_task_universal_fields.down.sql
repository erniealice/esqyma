-- Migration: job_template_task_universal_fields (down)
-- Dialect: postgres
-- Created: 2026-04-27T15:06:00Z

BEGIN;

DROP INDEX IF EXISTS idx_job_template_task_workflow_step_id;
DROP INDEX IF EXISTS idx_job_template_task_instruction_doc_id;
DROP INDEX IF EXISTS idx_job_template_task_resource_id;

ALTER TABLE job_template_task
  DROP COLUMN IF EXISTS workflow_step_id,
  DROP COLUMN IF EXISTS instruction_doc_id,
  DROP COLUMN IF EXISTS tool_required,
  DROP COLUMN IF EXISTS teardown_minutes,
  DROP COLUMN IF EXISTS run_minutes_per_unit,
  DROP COLUMN IF EXISTS setup_minutes,
  DROP COLUMN IF EXISTS standard_machine_minutes,
  DROP COLUMN IF EXISTS standard_labor_minutes,
  DROP COLUMN IF EXISTS quantity_factor,
  DROP COLUMN IF EXISTS skill_required,
  DROP COLUMN IF EXISTS resource_id;

COMMIT;
