-- Migration: job_template_task_universal_fields (up)
-- Dialect: postgres
-- Created: 2026-04-27T15:06:00Z
-- Rationale: Adds 11 columns to job_template_task for resource assignment,
--            skill requirements, time-standard parameters (setup/run/teardown),
--            tooling, documentation linkage, and workflow integration. See
--            redesign-proto.md §2.6.

BEGIN;

ALTER TABLE job_template_task
  ADD COLUMN IF NOT EXISTS resource_id              TEXT REFERENCES resource(id),
  ADD COLUMN IF NOT EXISTS skill_required           TEXT,
  ADD COLUMN IF NOT EXISTS quantity_factor          DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS standard_labor_minutes   INTEGER,
  ADD COLUMN IF NOT EXISTS standard_machine_minutes INTEGER,
  ADD COLUMN IF NOT EXISTS setup_minutes            INTEGER,
  ADD COLUMN IF NOT EXISTS run_minutes_per_unit     DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS teardown_minutes         INTEGER,
  ADD COLUMN IF NOT EXISTS tool_required            TEXT,
  ADD COLUMN IF NOT EXISTS instruction_doc_id       TEXT,
  ADD COLUMN IF NOT EXISTS workflow_step_id         TEXT;

CREATE INDEX idx_job_template_task_resource_id
  ON job_template_task(resource_id) WHERE resource_id IS NOT NULL;
CREATE INDEX idx_job_template_task_instruction_doc_id
  ON job_template_task(instruction_doc_id) WHERE instruction_doc_id IS NOT NULL;
CREATE INDEX idx_job_template_task_workflow_step_id
  ON job_template_task(workflow_step_id) WHERE workflow_step_id IS NOT NULL;

COMMIT;
