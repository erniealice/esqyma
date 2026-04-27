-- Migration: job_task_universal_fields (up)
-- Dialect: mysql
-- Created: 2026-04-27T15:04:00Z
-- Rationale: Adds 12 columns to job_task for template traceability, resource
--            assignment, progress tracking, task sequencing, and workflow
--            integration. See redesign-proto.md §2.4.
--            Note: predecessor_task_ids stored as JSON (MySQL has no native array type).

ALTER TABLE `job_task`
  ADD COLUMN IF NOT EXISTS `template_task_id`        VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `resource_id`             VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `planned_quantity`        DOUBLE NULL,
  ADD COLUMN IF NOT EXISTS `completed_quantity`      DOUBLE NULL,
  ADD COLUMN IF NOT EXISTS `percent_complete`        DOUBLE NULL,
  ADD COLUMN IF NOT EXISTS `actual_start`            BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `actual_start_string`     TEXT NULL,
  ADD COLUMN IF NOT EXISTS `actual_end`              BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `actual_end_string`       TEXT NULL,
  ADD COLUMN IF NOT EXISTS `predecessor_task_ids`    JSON NULL,
  ADD COLUMN IF NOT EXISTS `allow_parallel`          BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS `workflow_step_id`        TEXT NULL;

CREATE INDEX idx_job_task_template_task_id ON `job_task`(`template_task_id`);
CREATE INDEX idx_job_task_resource_id      ON `job_task`(`resource_id`);
