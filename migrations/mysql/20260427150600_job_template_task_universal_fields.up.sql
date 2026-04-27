-- Migration: job_template_task_universal_fields (up)
-- Dialect: mysql
-- Created: 2026-04-27T15:06:00Z
-- Rationale: Adds 11 columns to job_template_task for resource assignment, skill
--            requirements, time-standard parameters, tooling, documentation linkage,
--            and workflow integration. See redesign-proto.md §2.6.

ALTER TABLE `job_template_task`
  ADD COLUMN IF NOT EXISTS `resource_id`              VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `skill_required`           TEXT NULL,
  ADD COLUMN IF NOT EXISTS `quantity_factor`          DOUBLE NULL,
  ADD COLUMN IF NOT EXISTS `standard_labor_minutes`   INT NULL,
  ADD COLUMN IF NOT EXISTS `standard_machine_minutes` INT NULL,
  ADD COLUMN IF NOT EXISTS `setup_minutes`            INT NULL,
  ADD COLUMN IF NOT EXISTS `run_minutes_per_unit`     DOUBLE NULL,
  ADD COLUMN IF NOT EXISTS `teardown_minutes`         INT NULL,
  ADD COLUMN IF NOT EXISTS `tool_required`            TEXT NULL,
  ADD COLUMN IF NOT EXISTS `instruction_doc_id`       TEXT NULL,
  ADD COLUMN IF NOT EXISTS `workflow_step_id`         TEXT NULL;

CREATE INDEX idx_job_template_task_resource_id ON `job_template_task`(`resource_id`);
