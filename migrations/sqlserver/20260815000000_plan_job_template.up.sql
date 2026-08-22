-- Plan composition successor (SQL Server, additive).
IF OBJECT_ID(N'[plan_job_template]', N'U') IS NULL
BEGIN
  CREATE TABLE [plan_job_template] (
    [id] NVARCHAR(255) NOT NULL PRIMARY KEY,
    [date_created] BIGINT NULL,
    [date_modified] BIGINT NULL,
    [active] BIT NOT NULL CONSTRAINT [df_plan_job_template_active] DEFAULT 1,
    [plan_id] NVARCHAR(255) NOT NULL,
    [job_template_id] NVARCHAR(255) NOT NULL,
    [sequence_order] INT NOT NULL CONSTRAINT [df_plan_job_template_sequence] DEFAULT 0,
    [composition_entry_pattern] INT NOT NULL CONSTRAINT [df_plan_job_template_pattern] DEFAULT 0,
    [workspace_id] NVARCHAR(255) NOT NULL,
    CONSTRAINT [fk_plan_job_template_plan] FOREIGN KEY ([plan_id]) REFERENCES [plan]([id]),
    CONSTRAINT [fk_plan_job_template_job_template] FOREIGN KEY ([job_template_id]) REFERENCES [job_template]([id]),
    CONSTRAINT [fk_plan_job_template_workspace] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id]),
    CONSTRAINT [ck_plan_job_template_pattern] CHECK ([composition_entry_pattern] IN (0, 1, 2))
  );
END;

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'[plan_job_template]') AND name = N'uq_plan_job_template_plan_template')
  CREATE UNIQUE INDEX [uq_plan_job_template_plan_template] ON [plan_job_template]([workspace_id], [plan_id], [job_template_id]);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'[plan_job_template]') AND name = N'idx_plan_job_template_plan_order')
  CREATE INDEX [idx_plan_job_template_plan_order] ON [plan_job_template]([workspace_id], [plan_id], [sequence_order], [id]);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'[plan_job_template]') AND name = N'idx_plan_job_template_job_template_id')
  CREATE INDEX [idx_plan_job_template_job_template_id] ON [plan_job_template]([job_template_id]);
