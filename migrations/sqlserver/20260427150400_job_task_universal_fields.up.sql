-- Migration: job_task_universal_fields (up)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:04:00Z
-- Rationale: Adds 12 columns to job_task for template traceability, resource
--            assignment, progress tracking, task sequencing, and workflow
--            integration. See redesign-proto.md §2.4.
--            Note: predecessor_task_ids stored as NVARCHAR(MAX) containing a JSON
--            array (SQL Server has no native array type; use OPENJSON to query).

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'template_task_id')
  ALTER TABLE [job_task] ADD [template_task_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'resource_id')
  ALTER TABLE [job_task] ADD [resource_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'planned_quantity')
  ALTER TABLE [job_task] ADD [planned_quantity] FLOAT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'completed_quantity')
  ALTER TABLE [job_task] ADD [completed_quantity] FLOAT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'percent_complete')
  ALTER TABLE [job_task] ADD [percent_complete] FLOAT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'actual_start')
  ALTER TABLE [job_task] ADD [actual_start] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'actual_start_string')
  ALTER TABLE [job_task] ADD [actual_start_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'actual_end')
  ALTER TABLE [job_task] ADD [actual_end] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'actual_end_string')
  ALTER TABLE [job_task] ADD [actual_end_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'predecessor_task_ids')
  ALTER TABLE [job_task] ADD [predecessor_task_ids] NVARCHAR(MAX) NULL; -- JSON array; query with OPENJSON
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'allow_parallel')
  ALTER TABLE [job_task] ADD [allow_parallel] BIT NOT NULL DEFAULT 0;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'workflow_step_id')
  ALTER TABLE [job_task] ADD [workflow_step_id] NVARCHAR(MAX) NULL;

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_task') AND name = 'idx_job_task_template_task_id')
  CREATE INDEX idx_job_task_template_task_id ON [job_task]([template_task_id]);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_task') AND name = 'idx_job_task_resource_id')
  CREATE INDEX idx_job_task_resource_id ON [job_task]([resource_id]);
