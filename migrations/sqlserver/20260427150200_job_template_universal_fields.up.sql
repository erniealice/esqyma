-- Migration: job_template_universal_fields (up)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:02:00Z
-- Rationale: Adds 18 columns to job_template for versioning, publication lifecycle,
--            output product linkage, and workflow integration. See redesign-proto.md §2.2.
--            Field 26 (default_backflush_policy) intentionally skipped — Wave 2.

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'template_code')
  ALTER TABLE [job_template] ADD [template_code] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'revision')
  ALTER TABLE [job_template] ADD [revision] INT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'version_status')
  ALTER TABLE [job_template] ADD [version_status] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'effective_from')
  ALTER TABLE [job_template] ADD [effective_from] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'effective_from_string')
  ALTER TABLE [job_template] ADD [effective_from_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'effective_to')
  ALTER TABLE [job_template] ADD [effective_to] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'effective_to_string')
  ALTER TABLE [job_template] ADD [effective_to_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'supersedes_template_id')
  ALTER TABLE [job_template] ADD [supersedes_template_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'change_request_id')
  ALTER TABLE [job_template] ADD [change_request_id] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'is_default')
  ALTER TABLE [job_template] ADD [is_default] BIT NOT NULL DEFAULT 0;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'published_at')
  ALTER TABLE [job_template] ADD [published_at] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'published_at_string')
  ALTER TABLE [job_template] ADD [published_at_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'published_by')
  ALTER TABLE [job_template] ADD [published_by] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'default_lot_size')
  ALTER TABLE [job_template] ADD [default_lot_size] INT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'default_uom')
  ALTER TABLE [job_template] ADD [default_uom] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'output_product_id')
  ALTER TABLE [job_template] ADD [output_product_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'output_product_variant_id')
  ALTER TABLE [job_template] ADD [output_product_variant_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template') AND name = 'workflow_template_id')
  ALTER TABLE [job_template] ADD [workflow_template_id] NVARCHAR(MAX) NULL;

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_template') AND name = 'idx_job_template_output_product_id')
  CREATE INDEX idx_job_template_output_product_id ON [job_template]([output_product_id]);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_template') AND name = 'idx_job_template_output_product_variant_id')
  CREATE INDEX idx_job_template_output_product_variant_id ON [job_template]([output_product_variant_id]);
