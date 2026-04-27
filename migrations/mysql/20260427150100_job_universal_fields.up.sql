-- Migration: job_universal_fields (up)
-- Dialect: mysql
-- Created: 2026-04-27T15:01:00Z
-- Rationale: Adds 27 columns to the job table for the universal job model (Wave 1).
--            See redesign-proto.md §2.1.
--            Note: predecessor_job_ids stored as JSON (MySQL has no native array type).
--            Note: cost_account_id renamed from wip_account_id per C1 decision.

ALTER TABLE `job`
  ADD COLUMN IF NOT EXISTS `output_product_id`              VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `output_product_variant_id`      VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `planned_quantity`               DOUBLE NULL,
  ADD COLUMN IF NOT EXISTS `output_uom`                     TEXT NULL,
  ADD COLUMN IF NOT EXISTS `due_date`                       BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `due_date_string`                TEXT NULL,
  ADD COLUMN IF NOT EXISTS `release_date`                   BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `release_date_string`            TEXT NULL,
  ADD COLUMN IF NOT EXISTS `planned_start`                  BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `planned_start_string`           TEXT NULL,
  ADD COLUMN IF NOT EXISTS `planned_end`                    BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `planned_end_string`             TEXT NULL,
  ADD COLUMN IF NOT EXISTS `actual_start`                   BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `actual_start_string`            TEXT NULL,
  ADD COLUMN IF NOT EXISTS `actual_end`                     BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `actual_end_string`              TEXT NULL,
  ADD COLUMN IF NOT EXISTS `priority`                       INT NULL,
  ADD COLUMN IF NOT EXISTS `parent_job_id`                  VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `predecessor_job_ids`            JSON NULL,
  ADD COLUMN IF NOT EXISTS `sales_order_line_id`            TEXT NULL,
  ADD COLUMN IF NOT EXISTS `resource_id`                    VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `currency`                       TEXT NULL,
  ADD COLUMN IF NOT EXISTS `cost_account_id`                VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `job_template_revision_snapshot` INT NULL,
  ADD COLUMN IF NOT EXISTS `job_template_revision_id`       TEXT NULL,
  ADD COLUMN IF NOT EXISTS `change_request_id`              TEXT NULL,
  ADD COLUMN IF NOT EXISTS `workflow_instance_id`           TEXT NULL;

CREATE INDEX idx_job_output_product_id           ON `job`(`output_product_id`);
CREATE INDEX idx_job_output_product_variant_id   ON `job`(`output_product_variant_id`);
CREATE INDEX idx_job_parent_job_id               ON `job`(`parent_job_id`);
CREATE INDEX idx_job_resource_id                 ON `job`(`resource_id`);
CREATE INDEX idx_job_cost_account_id             ON `job`(`cost_account_id`);
