-- Migration: job_template_phase_universal_fields (down)
-- Dialect: mysql
-- Created: 2026-04-27T15:05:00Z

DROP INDEX idx_job_template_phase_resource_id ON `job_template_phase`;

ALTER TABLE `job_template_phase`
  DROP COLUMN IF EXISTS `predecessor_template_phase_id`,
  DROP COLUMN IF EXISTS `teardown_minutes`,
  DROP COLUMN IF EXISTS `run_minutes_per_unit`,
  DROP COLUMN IF EXISTS `setup_minutes`,
  DROP COLUMN IF EXISTS `resource_id`;
