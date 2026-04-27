-- Migration: job_template_phase_universal_fields (up)
-- Dialect: mysql
-- Created: 2026-04-27T15:05:00Z
-- Rationale: Adds 5 columns to job_template_phase for resource assignment,
--            time-standard parameters, and phase sequencing. See
--            redesign-proto.md §2.5.

ALTER TABLE `job_template_phase`
  ADD COLUMN IF NOT EXISTS `resource_id`                    VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `setup_minutes`                  INT NULL,
  ADD COLUMN IF NOT EXISTS `run_minutes_per_unit`           DOUBLE NULL,
  ADD COLUMN IF NOT EXISTS `teardown_minutes`               INT NULL,
  ADD COLUMN IF NOT EXISTS `predecessor_template_phase_id`  VARCHAR(255) NULL;

CREATE INDEX idx_job_template_phase_resource_id ON `job_template_phase`(`resource_id`);
