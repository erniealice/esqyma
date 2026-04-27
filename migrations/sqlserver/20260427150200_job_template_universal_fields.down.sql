-- Migration: job_template_universal_fields (down)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:02:00Z

IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_template') AND name = 'idx_job_template_output_product_variant_id')
  DROP INDEX idx_job_template_output_product_variant_id ON [job_template];
IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_template') AND name = 'idx_job_template_output_product_id')
  DROP INDEX idx_job_template_output_product_id ON [job_template];

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'workflow_template_id')
  ALTER TABLE [job_template] DROP COLUMN [workflow_template_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'output_product_variant_id')
  ALTER TABLE [job_template] DROP COLUMN [output_product_variant_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'output_product_id')
  ALTER TABLE [job_template] DROP COLUMN [output_product_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'default_uom')
  ALTER TABLE [job_template] DROP COLUMN [default_uom];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'default_lot_size')
  ALTER TABLE [job_template] DROP COLUMN [default_lot_size];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'published_by')
  ALTER TABLE [job_template] DROP COLUMN [published_by];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'published_at_string')
  ALTER TABLE [job_template] DROP COLUMN [published_at_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'published_at')
  ALTER TABLE [job_template] DROP COLUMN [published_at];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'is_default')
  ALTER TABLE [job_template] DROP COLUMN [is_default];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'change_request_id')
  ALTER TABLE [job_template] DROP COLUMN [change_request_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'supersedes_template_id')
  ALTER TABLE [job_template] DROP COLUMN [supersedes_template_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'effective_to_string')
  ALTER TABLE [job_template] DROP COLUMN [effective_to_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'effective_to')
  ALTER TABLE [job_template] DROP COLUMN [effective_to];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'effective_from_string')
  ALTER TABLE [job_template] DROP COLUMN [effective_from_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'effective_from')
  ALTER TABLE [job_template] DROP COLUMN [effective_from];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'version_status')
  ALTER TABLE [job_template] DROP COLUMN [version_status];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'revision')
  ALTER TABLE [job_template] DROP COLUMN [revision];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'template_code')
  ALTER TABLE [job_template] DROP COLUMN [template_code];
