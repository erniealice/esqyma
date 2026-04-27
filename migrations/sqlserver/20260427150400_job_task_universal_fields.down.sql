-- Migration: job_task_universal_fields (down)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:04:00Z

IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_task') AND name = 'idx_job_task_resource_id')
  DROP INDEX idx_job_task_resource_id ON [job_task];
IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_task') AND name = 'idx_job_task_template_task_id')
  DROP INDEX idx_job_task_template_task_id ON [job_task];

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'workflow_step_id')
  ALTER TABLE [job_task] DROP COLUMN [workflow_step_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'allow_parallel')
  ALTER TABLE [job_task] DROP COLUMN [allow_parallel];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'predecessor_task_ids')
  ALTER TABLE [job_task] DROP COLUMN [predecessor_task_ids];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'actual_end_string')
  ALTER TABLE [job_task] DROP COLUMN [actual_end_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'actual_end')
  ALTER TABLE [job_task] DROP COLUMN [actual_end];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'actual_start_string')
  ALTER TABLE [job_task] DROP COLUMN [actual_start_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'actual_start')
  ALTER TABLE [job_task] DROP COLUMN [actual_start];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'percent_complete')
  ALTER TABLE [job_task] DROP COLUMN [percent_complete];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'completed_quantity')
  ALTER TABLE [job_task] DROP COLUMN [completed_quantity];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'planned_quantity')
  ALTER TABLE [job_task] DROP COLUMN [planned_quantity];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'resource_id')
  ALTER TABLE [job_task] DROP COLUMN [resource_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_task') AND name = 'template_task_id')
  ALTER TABLE [job_task] DROP COLUMN [template_task_id];
