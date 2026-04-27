-- Migration: job_template_universal_fields (down)
-- Dialect: postgres
-- Created: 2026-04-27T15:02:00Z

BEGIN;

DROP INDEX IF EXISTS idx_job_template_workflow_template_id;
DROP INDEX IF EXISTS idx_job_template_output_product_variant_id;
DROP INDEX IF EXISTS idx_job_template_output_product_id;
DROP INDEX IF EXISTS idx_job_template_change_request_id;
DROP INDEX IF EXISTS idx_job_template_template_code;

ALTER TABLE job_template
  DROP COLUMN IF EXISTS workflow_template_id,
  DROP COLUMN IF EXISTS output_product_variant_id,
  DROP COLUMN IF EXISTS output_product_id,
  DROP COLUMN IF EXISTS default_uom,
  DROP COLUMN IF EXISTS default_lot_size,
  DROP COLUMN IF EXISTS published_by,
  DROP COLUMN IF EXISTS published_at_string,
  DROP COLUMN IF EXISTS published_at,
  DROP COLUMN IF EXISTS is_default,
  DROP COLUMN IF EXISTS change_request_id,
  DROP COLUMN IF EXISTS supersedes_template_id,
  DROP COLUMN IF EXISTS effective_to_string,
  DROP COLUMN IF EXISTS effective_to,
  DROP COLUMN IF EXISTS effective_from_string,
  DROP COLUMN IF EXISTS effective_from,
  DROP COLUMN IF EXISTS version_status,
  DROP COLUMN IF EXISTS revision,
  DROP COLUMN IF EXISTS template_code;

COMMIT;
