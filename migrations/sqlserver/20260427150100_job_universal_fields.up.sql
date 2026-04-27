-- Migration: job_universal_fields (up)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:01:00Z
-- Rationale: Adds 27 columns to the job table for the universal job model (Wave 1).
--            See redesign-proto.md §2.1.
--            Note: predecessor_job_ids stored as NVARCHAR(MAX) containing a JSON
--            array (SQL Server has no native array type; use JSON_VALUE/OPENJSON
--            to query elements).
--            Note: cost_account_id renamed from wip_account_id per C1 decision.

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'output_product_id')
  ALTER TABLE [job] ADD [output_product_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'output_product_variant_id')
  ALTER TABLE [job] ADD [output_product_variant_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'planned_quantity')
  ALTER TABLE [job] ADD [planned_quantity] FLOAT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'output_uom')
  ALTER TABLE [job] ADD [output_uom] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'due_date')
  ALTER TABLE [job] ADD [due_date] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'due_date_string')
  ALTER TABLE [job] ADD [due_date_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'release_date')
  ALTER TABLE [job] ADD [release_date] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'release_date_string')
  ALTER TABLE [job] ADD [release_date_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'planned_start')
  ALTER TABLE [job] ADD [planned_start] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'planned_start_string')
  ALTER TABLE [job] ADD [planned_start_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'planned_end')
  ALTER TABLE [job] ADD [planned_end] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'planned_end_string')
  ALTER TABLE [job] ADD [planned_end_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'actual_start')
  ALTER TABLE [job] ADD [actual_start] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'actual_start_string')
  ALTER TABLE [job] ADD [actual_start_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'actual_end')
  ALTER TABLE [job] ADD [actual_end] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'actual_end_string')
  ALTER TABLE [job] ADD [actual_end_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'priority')
  ALTER TABLE [job] ADD [priority] INT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'parent_job_id')
  ALTER TABLE [job] ADD [parent_job_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'predecessor_job_ids')
  ALTER TABLE [job] ADD [predecessor_job_ids] NVARCHAR(MAX) NULL; -- JSON array; query with OPENJSON
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'sales_order_line_id')
  ALTER TABLE [job] ADD [sales_order_line_id] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'resource_id')
  ALTER TABLE [job] ADD [resource_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'currency')
  ALTER TABLE [job] ADD [currency] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'cost_account_id')
  ALTER TABLE [job] ADD [cost_account_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'job_template_revision_snapshot')
  ALTER TABLE [job] ADD [job_template_revision_snapshot] INT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'job_template_revision_id')
  ALTER TABLE [job] ADD [job_template_revision_id] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'change_request_id')
  ALTER TABLE [job] ADD [change_request_id] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'workflow_instance_id')
  ALTER TABLE [job] ADD [workflow_instance_id] NVARCHAR(MAX) NULL;

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job') AND name = 'idx_job_output_product_id')
  CREATE INDEX idx_job_output_product_id ON [job]([output_product_id]);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job') AND name = 'idx_job_output_product_variant_id')
  CREATE INDEX idx_job_output_product_variant_id ON [job]([output_product_variant_id]);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job') AND name = 'idx_job_parent_job_id')
  CREATE INDEX idx_job_parent_job_id ON [job]([parent_job_id]);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job') AND name = 'idx_job_resource_id')
  CREATE INDEX idx_job_resource_id ON [job]([resource_id]);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job') AND name = 'idx_job_cost_account_id')
  CREATE INDEX idx_job_cost_account_id ON [job]([cost_account_id]);
