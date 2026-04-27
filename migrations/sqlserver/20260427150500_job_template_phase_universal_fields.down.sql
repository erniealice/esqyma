-- Migration: job_template_phase_universal_fields (down)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:05:00Z

IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_template_phase') AND name = 'idx_job_template_phase_resource_id')
  DROP INDEX idx_job_template_phase_resource_id ON [job_template_phase];

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_phase') AND name = 'predecessor_template_phase_id')
  ALTER TABLE [job_template_phase] DROP COLUMN [predecessor_template_phase_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_phase') AND name = 'teardown_minutes')
  ALTER TABLE [job_template_phase] DROP COLUMN [teardown_minutes];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_phase') AND name = 'run_minutes_per_unit')
  ALTER TABLE [job_template_phase] DROP COLUMN [run_minutes_per_unit];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_phase') AND name = 'setup_minutes')
  ALTER TABLE [job_template_phase] DROP COLUMN [setup_minutes];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_phase') AND name = 'resource_id')
  ALTER TABLE [job_template_phase] DROP COLUMN [resource_id];
