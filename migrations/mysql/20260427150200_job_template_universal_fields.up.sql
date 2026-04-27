-- Migration: job_template_universal_fields (up)
-- Dialect: mysql
-- Created: 2026-04-27T15:02:00Z
-- Rationale: Adds 18 columns to job_template for versioning, publication lifecycle,
--            output product linkage, and workflow integration. See redesign-proto.md §2.2.
--            Field 26 (default_backflush_policy) intentionally skipped — Wave 2.

ALTER TABLE `job_template`
  ADD COLUMN IF NOT EXISTS `template_code`              TEXT NULL,
  ADD COLUMN IF NOT EXISTS `revision`                   INT NULL,
  ADD COLUMN IF NOT EXISTS `version_status`             TEXT NULL,
  ADD COLUMN IF NOT EXISTS `effective_from`             BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `effective_from_string`      TEXT NULL,
  ADD COLUMN IF NOT EXISTS `effective_to`               BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `effective_to_string`        TEXT NULL,
  ADD COLUMN IF NOT EXISTS `supersedes_template_id`     VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `change_request_id`          TEXT NULL,
  ADD COLUMN IF NOT EXISTS `is_default`                 BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS `published_at`               BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `published_at_string`        TEXT NULL,
  ADD COLUMN IF NOT EXISTS `published_by`               TEXT NULL,
  ADD COLUMN IF NOT EXISTS `default_lot_size`           INT NULL,
  ADD COLUMN IF NOT EXISTS `default_uom`                TEXT NULL,
  ADD COLUMN IF NOT EXISTS `output_product_id`          VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `output_product_variant_id`  VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `workflow_template_id`       TEXT NULL;

CREATE INDEX idx_job_template_output_product_id         ON `job_template`(`output_product_id`);
CREATE INDEX idx_job_template_output_product_variant_id ON `job_template`(`output_product_variant_id`);
