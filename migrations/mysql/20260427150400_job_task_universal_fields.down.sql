-- Migration: job_task_universal_fields (down)
-- Dialect: mysql
-- Created: 2026-04-27T15:04:00Z

DROP INDEX idx_job_task_resource_id      ON `job_task`;
DROP INDEX idx_job_task_template_task_id ON `job_task`;

ALTER TABLE `job_task`
  DROP COLUMN IF EXISTS `workflow_step_id`,
  DROP COLUMN IF EXISTS `allow_parallel`,
  DROP COLUMN IF EXISTS `predecessor_task_ids`,
  DROP COLUMN IF EXISTS `actual_end_string`,
  DROP COLUMN IF EXISTS `actual_end`,
  DROP COLUMN IF EXISTS `actual_start_string`,
  DROP COLUMN IF EXISTS `actual_start`,
  DROP COLUMN IF EXISTS `percent_complete`,
  DROP COLUMN IF EXISTS `completed_quantity`,
  DROP COLUMN IF EXISTS `planned_quantity`,
  DROP COLUMN IF EXISTS `resource_id`,
  DROP COLUMN IF EXISTS `template_task_id`;
