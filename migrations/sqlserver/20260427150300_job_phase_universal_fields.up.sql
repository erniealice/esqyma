-- Migration: job_phase_universal_fields (up)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:03:00Z
-- Rationale: Adds 13 columns to job_phase for template traceability, resource
--            assignment, scheduling dates, and phase sequencing. See
--            redesign-proto.md §2.3.

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'template_phase_id')
  ALTER TABLE [job_phase] ADD [template_phase_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'resource_id')
  ALTER TABLE [job_phase] ADD [resource_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'planned_start')
  ALTER TABLE [job_phase] ADD [planned_start] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'planned_start_string')
  ALTER TABLE [job_phase] ADD [planned_start_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'planned_end')
  ALTER TABLE [job_phase] ADD [planned_end] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'planned_end_string')
  ALTER TABLE [job_phase] ADD [planned_end_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'actual_start')
  ALTER TABLE [job_phase] ADD [actual_start] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'actual_start_string')
  ALTER TABLE [job_phase] ADD [actual_start_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'actual_end')
  ALTER TABLE [job_phase] ADD [actual_end] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'actual_end_string')
  ALTER TABLE [job_phase] ADD [actual_end_string] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'setup_minutes')
  ALTER TABLE [job_phase] ADD [setup_minutes] INT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'run_minutes_per_unit')
  ALTER TABLE [job_phase] ADD [run_minutes_per_unit] FLOAT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('job_phase') AND name = 'predecessor_phase_id')
  ALTER TABLE [job_phase] ADD [predecessor_phase_id] NVARCHAR(255) NULL;

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_phase') AND name = 'idx_job_phase_template_phase_id')
  CREATE INDEX idx_job_phase_template_phase_id ON [job_phase]([template_phase_id]);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('job_phase') AND name = 'idx_job_phase_resource_id')
  CREATE INDEX idx_job_phase_resource_id ON [job_phase]([resource_id]);
