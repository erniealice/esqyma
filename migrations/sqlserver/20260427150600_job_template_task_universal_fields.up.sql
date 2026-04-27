-- Migration: job_template_task_universal_fields (up)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:06:00Z
-- Rationale: Adds 11 columns to job_template_task for resource assignment, skill
--            requirements, time-standard parameters, tooling, documentation linkage,
--            and workflow integration. See redesign-proto.md §2.6.

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'resource_id')
  ALTER TABLE [job_template_task] ADD [resource_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'skill_required')
  ALTER TABLE [job_template_task] ADD [skill_required] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'quantity_factor')
  ALTER TABLE [job_template_task] ADD [quantity_factor] FLOAT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'standard_labor_minutes')
  ALTER TABLE [job_template_task] ADD [standard_labor_minutes] INT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'standard_machine_minutes')
  ALTER TABLE [job_template_task] ADD [standard_machine_minutes] INT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'setup_minutes')
  ALTER TABLE [job_template_task] ADD [setup_minutes] INT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'run_minutes_per_unit')
  ALTER TABLE [job_template_task] ADD [run_minutes_per_unit] FLOAT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'teardown_minutes')
  ALTER TABLE [job_template_task] ADD [teardown_minutes] INT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'tool_required')
  ALTER TABLE [job_template_task] ADD [tool_required] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'instruction_doc_id')
  ALTER TABLE [job_template_task] ADD [instruction_doc_id] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_task') AND name = 'workflow_step_id')
  ALTER TABLE [job_template_task] ADD [workflow_step_id] NVARCHAR(MAX) NULL;

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_template_task') AND name = 'idx_job_template_task_resource_id')
  CREATE INDEX idx_job_template_task_resource_id ON [job_template_task]([resource_id]);
