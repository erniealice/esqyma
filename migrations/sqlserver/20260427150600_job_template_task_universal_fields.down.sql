-- Migration: job_template_task_universal_fields (down)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:06:00Z

IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_template_task') AND name = 'idx_job_template_task_resource_id')
  DROP INDEX idx_job_template_task_resource_id ON [job_template_task];

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'workflow_step_id')
  ALTER TABLE [job_template_task] DROP COLUMN [workflow_step_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'instruction_doc_id')
  ALTER TABLE [job_template_task] DROP COLUMN [instruction_doc_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'tool_required')
  ALTER TABLE [job_template_task] DROP COLUMN [tool_required];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'teardown_minutes')
  ALTER TABLE [job_template_task] DROP COLUMN [teardown_minutes];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'run_minutes_per_unit')
  ALTER TABLE [job_template_task] DROP COLUMN [run_minutes_per_unit];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'setup_minutes')
  ALTER TABLE [job_template_task] DROP COLUMN [setup_minutes];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'standard_machine_minutes')
  ALTER TABLE [job_template_task] DROP COLUMN [standard_machine_minutes];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'standard_labor_minutes')
  ALTER TABLE [job_template_task] DROP COLUMN [standard_labor_minutes];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'quantity_factor')
  ALTER TABLE [job_template_task] DROP COLUMN [quantity_factor];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'skill_required')
  ALTER TABLE [job_template_task] DROP COLUMN [skill_required];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'resource_id')
  ALTER TABLE [job_template_task] DROP COLUMN [resource_id];
