-- Migration: job_universal_fields (down)
-- Dialect: mysql
-- Created: 2026-04-27T15:01:00Z

DROP INDEX idx_job_cost_account_id              ON `job`;
DROP INDEX idx_job_resource_id                  ON `job`;
DROP INDEX idx_job_parent_job_id                ON `job`;
DROP INDEX idx_job_output_product_variant_id    ON `job`;
DROP INDEX idx_job_output_product_id            ON `job`;

ALTER TABLE `job`
  DROP COLUMN IF EXISTS `workflow_instance_id`,
  DROP COLUMN IF EXISTS `change_request_id`,
  DROP COLUMN IF EXISTS `job_template_revision_id`,
  DROP COLUMN IF EXISTS `job_template_revision_snapshot`,
  DROP COLUMN IF EXISTS `cost_account_id`,
  DROP COLUMN IF EXISTS `currency`,
  DROP COLUMN IF EXISTS `resource_id`,
  DROP COLUMN IF EXISTS `sales_order_line_id`,
  DROP COLUMN IF EXISTS `predecessor_job_ids`,
  DROP COLUMN IF EXISTS `parent_job_id`,
  DROP COLUMN IF EXISTS `priority`,
  DROP COLUMN IF EXISTS `actual_end_string`,
  DROP COLUMN IF EXISTS `actual_end`,
  DROP COLUMN IF EXISTS `actual_start_string`,
  DROP COLUMN IF EXISTS `actual_start`,
  DROP COLUMN IF EXISTS `planned_end_string`,
  DROP COLUMN IF EXISTS `planned_end`,
  DROP COLUMN IF EXISTS `planned_start_string`,
  DROP COLUMN IF EXISTS `planned_start`,
  DROP COLUMN IF EXISTS `release_date_string`,
  DROP COLUMN IF EXISTS `release_date`,
  DROP COLUMN IF EXISTS `due_date_string`,
  DROP COLUMN IF EXISTS `due_date`,
  DROP COLUMN IF EXISTS `output_uom`,
  DROP COLUMN IF EXISTS `planned_quantity`,
  DROP COLUMN IF EXISTS `output_product_variant_id`,
  DROP COLUMN IF EXISTS `output_product_id`;
