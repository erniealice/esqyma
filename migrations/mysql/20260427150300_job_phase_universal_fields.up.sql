-- Migration: job_phase_universal_fields (up)
-- Dialect: mysql
-- Created: 2026-04-27T15:03:00Z
-- Rationale: Adds 13 columns to job_phase for template traceability, resource
--            assignment, scheduling dates, and phase sequencing. See
--            redesign-proto.md §2.3.

ALTER TABLE `job_phase`
  ADD COLUMN IF NOT EXISTS `template_phase_id`       VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `resource_id`             VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `planned_start`           BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `planned_start_string`    TEXT NULL,
  ADD COLUMN IF NOT EXISTS `planned_end`             BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `planned_end_string`      TEXT NULL,
  ADD COLUMN IF NOT EXISTS `actual_start`            BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `actual_start_string`     TEXT NULL,
  ADD COLUMN IF NOT EXISTS `actual_end`              BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `actual_end_string`       TEXT NULL,
  ADD COLUMN IF NOT EXISTS `setup_minutes`           INT NULL,
  ADD COLUMN IF NOT EXISTS `run_minutes_per_unit`    DOUBLE NULL,
  ADD COLUMN IF NOT EXISTS `predecessor_phase_id`    VARCHAR(255) NULL;

CREATE INDEX idx_job_phase_template_phase_id ON `job_phase`(`template_phase_id`);
CREATE INDEX idx_job_phase_resource_id        ON `job_phase`(`resource_id`);
