-- Migration: job_template_phase_universal_fields (up)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:05:00Z
-- Rationale: Adds 5 columns to job_template_phase for resource assignment,
--            time-standard parameters, and phase sequencing. See
--            redesign-proto.md §2.5.

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_phase') AND name = 'resource_id')
  ALTER TABLE [job_template_phase] ADD [resource_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_phase') AND name = 'setup_minutes')
  ALTER TABLE [job_template_phase] ADD [setup_minutes] INT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_phase') AND name = 'run_minutes_per_unit')
  ALTER TABLE [job_template_phase] ADD [run_minutes_per_unit] FLOAT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_phase') AND name = 'teardown_minutes')
  ALTER TABLE [job_template_phase] ADD [teardown_minutes] INT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_template_phase') AND name = 'predecessor_template_phase_id')
  ALTER TABLE [job_template_phase] ADD [predecessor_template_phase_id] NVARCHAR(255) NULL;

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_template_phase') AND name = 'idx_job_template_phase_resource_id')
  CREATE INDEX idx_job_template_phase_resource_id ON [job_template_phase]([resource_id]);
