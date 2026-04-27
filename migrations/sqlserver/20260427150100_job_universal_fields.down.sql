-- Migration: job_universal_fields (down)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:01:00Z

IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job') AND name = 'idx_job_cost_account_id')
  DROP INDEX idx_job_cost_account_id ON [job];
IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job') AND name = 'idx_job_resource_id')
  DROP INDEX idx_job_resource_id ON [job];
IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job') AND name = 'idx_job_parent_job_id')
  DROP INDEX idx_job_parent_job_id ON [job];
IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job') AND name = 'idx_job_output_product_variant_id')
  DROP INDEX idx_job_output_product_variant_id ON [job];
IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job') AND name = 'idx_job_output_product_id')
  DROP INDEX idx_job_output_product_id ON [job];

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'workflow_instance_id')
  ALTER TABLE [job] DROP COLUMN [workflow_instance_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'change_request_id')
  ALTER TABLE [job] DROP COLUMN [change_request_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'job_template_revision_id')
  ALTER TABLE [job] DROP COLUMN [job_template_revision_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'job_template_revision_snapshot')
  ALTER TABLE [job] DROP COLUMN [job_template_revision_snapshot];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'cost_account_id')
  ALTER TABLE [job] DROP COLUMN [cost_account_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'currency')
  ALTER TABLE [job] DROP COLUMN [currency];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'resource_id')
  ALTER TABLE [job] DROP COLUMN [resource_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'sales_order_line_id')
  ALTER TABLE [job] DROP COLUMN [sales_order_line_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'predecessor_job_ids')
  ALTER TABLE [job] DROP COLUMN [predecessor_job_ids];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'parent_job_id')
  ALTER TABLE [job] DROP COLUMN [parent_job_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'priority')
  ALTER TABLE [job] DROP COLUMN [priority];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'actual_end_string')
  ALTER TABLE [job] DROP COLUMN [actual_end_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'actual_end')
  ALTER TABLE [job] DROP COLUMN [actual_end];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'actual_start_string')
  ALTER TABLE [job] DROP COLUMN [actual_start_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'actual_start')
  ALTER TABLE [job] DROP COLUMN [actual_start];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'planned_end_string')
  ALTER TABLE [job] DROP COLUMN [planned_end_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'planned_end')
  ALTER TABLE [job] DROP COLUMN [planned_end];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'planned_start_string')
  ALTER TABLE [job] DROP COLUMN [planned_start_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'planned_start')
  ALTER TABLE [job] DROP COLUMN [planned_start];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'release_date_string')
  ALTER TABLE [job] DROP COLUMN [release_date_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'release_date')
  ALTER TABLE [job] DROP COLUMN [release_date];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'due_date_string')
  ALTER TABLE [job] DROP COLUMN [due_date_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'due_date')
  ALTER TABLE [job] DROP COLUMN [due_date];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'output_uom')
  ALTER TABLE [job] DROP COLUMN [output_uom];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'planned_quantity')
  ALTER TABLE [job] DROP COLUMN [planned_quantity];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'output_product_variant_id')
  ALTER TABLE [job] DROP COLUMN [output_product_variant_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job') AND name = 'output_product_id')
  ALTER TABLE [job] DROP COLUMN [output_product_id];
