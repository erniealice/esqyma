-- Migration: job_phase_universal_fields (down)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:03:00Z

IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_phase') AND name = 'idx_job_phase_resource_id')
  DROP INDEX idx_job_phase_resource_id ON [job_phase];
IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_phase') AND name = 'idx_job_phase_template_phase_id')
  DROP INDEX idx_job_phase_template_phase_id ON [job_phase];

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'predecessor_phase_id')
  ALTER TABLE [job_phase] DROP COLUMN [predecessor_phase_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'run_minutes_per_unit')
  ALTER TABLE [job_phase] DROP COLUMN [run_minutes_per_unit];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'setup_minutes')
  ALTER TABLE [job_phase] DROP COLUMN [setup_minutes];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'actual_end_string')
  ALTER TABLE [job_phase] DROP COLUMN [actual_end_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'actual_end')
  ALTER TABLE [job_phase] DROP COLUMN [actual_end];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'actual_start_string')
  ALTER TABLE [job_phase] DROP COLUMN [actual_start_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'actual_start')
  ALTER TABLE [job_phase] DROP COLUMN [actual_start];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'planned_end_string')
  ALTER TABLE [job_phase] DROP COLUMN [planned_end_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'planned_end')
  ALTER TABLE [job_phase] DROP COLUMN [planned_end];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'planned_start_string')
  ALTER TABLE [job_phase] DROP COLUMN [planned_start_string];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'planned_start')
  ALTER TABLE [job_phase] DROP COLUMN [planned_start];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'resource_id')
  ALTER TABLE [job_phase] DROP COLUMN [resource_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'template_phase_id')
  ALTER TABLE [job_phase] DROP COLUMN [template_phase_id];
