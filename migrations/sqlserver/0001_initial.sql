-- Table: account_template
CREATE TABLE [account_template] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [industry_type] NVARCHAR(MAX) NOT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL
);

-- Table: balance_attribute
CREATE TABLE [balance_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [balance_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_balance_attribute_balance_id] FOREIGN KEY ([balance_id]) REFERENCES [balance]([id]),
  CONSTRAINT [fk_balance_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_balance_attribute_1] UNIQUE ([balance_id], [attribute_id])
);

CREATE INDEX [idx_balance_attribute_balance_id] ON [balance_attribute] ([balance_id]);
CREATE INDEX [idx_balance_attribute_attribute_id] ON [balance_attribute] ([attribute_id]);

-- Table: stage
CREATE TABLE [stage] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [workflow_id] NVARCHAR(MAX) NOT NULL,
  [workflow_instance_id] NVARCHAR(MAX) NOT NULL,
  [stage_template_id] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [priority] NVARCHAR(MAX) NOT NULL,
  [assigned_to] NVARCHAR(MAX) NULL,
  [completed_by] NVARCHAR(MAX) NULL,
  [date_started] BIGINT NULL,
  [date_completed] BIGINT NULL,
  [date_due] BIGINT NULL,
  [result_json] NVARCHAR(MAX) NULL,
  [error_message] NVARCHAR(MAX) NULL,
  [created_by] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [completion_percentage] INT NULL,
  CONSTRAINT [fk_stage_workflow_id] FOREIGN KEY ([workflow_id]) REFERENCES [workflow]([id]),
  CONSTRAINT [fk_stage_stage_template_id] FOREIGN KEY ([stage_template_id]) REFERENCES [stage_template]([id])
);

CREATE INDEX [idx_stage_workflow_id] ON [stage] ([workflow_id]);
CREATE INDEX [idx_stage_stage_template_id] ON [stage] ([stage_template_id]);

-- Table: payroll_remittance
CREATE TABLE [payroll_remittance] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [payroll_run_id] NVARCHAR(MAX) NOT NULL,
  [remittance_type] NVARCHAR(MAX) NOT NULL,
  [amount] BIGINT NOT NULL,
  [due_date] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [filed_at] BIGINT NULL,
  [paid_at] BIGINT NULL,
  [reference_number] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  CONSTRAINT [fk_payroll_remittance_payroll_run_id] FOREIGN KEY ([payroll_run_id]) REFERENCES [payroll_run]([id])
);

CREATE INDEX [idx_payroll_remittance_payroll_run_id] ON [payroll_remittance] ([payroll_run_id]);

-- Table: criteria_threshold
CREATE TABLE [criteria_threshold] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [outcome_criteria_id] NVARCHAR(MAX) NOT NULL,
  [threshold_role] NVARCHAR(MAX) NOT NULL,
  [value] FLOAT NOT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_criteria_threshold_outcome_criteria_id] FOREIGN KEY ([outcome_criteria_id]) REFERENCES [outcome_criteria]([id])
);

CREATE INDEX [idx_criteria_threshold_outcome_criteria_id] ON [criteria_threshold] ([outcome_criteria_id]);

-- Table: security_deposit
CREATE TABLE [security_deposit] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [direction] NVARCHAR(MAX) NOT NULL,
  [counterparty_name] NVARCHAR(MAX) NOT NULL,
  [amount] BIGINT NOT NULL,
  [deposit_date] BIGINT NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [account_id] NVARCHAR(MAX) NULL,
  [notes] NVARCHAR(MAX) NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_security_deposit_account_id] FOREIGN KEY ([account_id]) REFERENCES [account]([id])
);

CREATE INDEX [idx_security_deposit_account_id] ON [security_deposit] ([account_id]);

-- Table: plan_settings
CREATE TABLE [plan_settings] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [plan_id] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_plan_settings_plan_id] FOREIGN KEY ([plan_id]) REFERENCES [plan]([id])
);

CREATE INDEX [idx_plan_settings_plan_id] ON [plan_settings] ([plan_id]);

-- Table: product_variant_option
CREATE TABLE [product_variant_option] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [product_variant_id] NVARCHAR(MAX) NOT NULL,
  [product_option_value_id] NVARCHAR(MAX) NOT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_product_variant_option_product_variant_id] FOREIGN KEY ([product_variant_id]) REFERENCES [product_variant]([id]),
  CONSTRAINT [fk_product_variant_option_product_option_value_id] FOREIGN KEY ([product_option_value_id]) REFERENCES [product_option_value]([id]),
  CONSTRAINT [uq_product_variant_option_1] UNIQUE ([product_variant_id], [product_option_value_id])
);

CREATE INDEX [idx_product_variant_option_product_variant_id] ON [product_variant_option] ([product_variant_id]);
CREATE INDEX [idx_product_variant_option_product_option_value_id] ON [product_variant_option] ([product_option_value_id]);

-- Table: plan_location
CREATE TABLE [plan_location] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [plan_id] NVARCHAR(MAX) NOT NULL,
  [location_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_plan_location_plan_id] FOREIGN KEY ([plan_id]) REFERENCES [plan]([id]),
  CONSTRAINT [fk_plan_location_location_id] FOREIGN KEY ([location_id]) REFERENCES [location]([id]),
  CONSTRAINT [uq_plan_location_1] UNIQUE ([plan_id], [location_id])
);

CREATE INDEX [idx_plan_location_plan_id] ON [plan_location] ([plan_id]);
CREATE INDEX [idx_plan_location_location_id] ON [plan_location] ([location_id]);

-- Table: phase_outcome_summary
CREATE TABLE [phase_outcome_summary] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [job_phase_id] NVARCHAR(MAX) NOT NULL,
  [job_id] NVARCHAR(MAX) NOT NULL,
  [summary_type] NVARCHAR(MAX) NOT NULL,
  [phase_determination] NVARCHAR(MAX) NOT NULL,
  [scoring_method] NVARCHAR(MAX) NOT NULL,
  [summary_score] FLOAT NULL,
  [total_criteria_count] INT NOT NULL,
  [pass_count] INT NOT NULL,
  [fail_count] INT NOT NULL,
  [conditional_count] INT NOT NULL,
  [deferred_count] INT NOT NULL,
  [na_count] INT NOT NULL,
  [narrative] NVARCHAR(MAX) NULL,
  [issued_by] NVARCHAR(MAX) NOT NULL,
  [issued_date] BIGINT NULL,
  [supersedes_id] NVARCHAR(MAX) NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_phase_outcome_summary_job_phase_id] FOREIGN KEY ([job_phase_id]) REFERENCES [job_phase]([id]),
  CONSTRAINT [fk_phase_outcome_summary_job_id] FOREIGN KEY ([job_id]) REFERENCES [job]([id]),
  CONSTRAINT [fk_phase_outcome_summary_issued_by] FOREIGN KEY ([issued_by]) REFERENCES [staff]([id]),
  CONSTRAINT [fk_phase_outcome_summary_supersedes_id] FOREIGN KEY ([supersedes_id]) REFERENCES [phase_outcome_summary]([id])
);

CREATE INDEX [idx_phase_outcome_summary_job_phase_id] ON [phase_outcome_summary] ([job_phase_id]);
CREATE INDEX [idx_phase_outcome_summary_job_id] ON [phase_outcome_summary] ([job_id]);

-- Table: price_list
CREATE TABLE [price_list] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [date_start] NVARCHAR(MAX) NOT NULL,
  [date_end] NVARCHAR(MAX) NULL,
  [location_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_price_list_location_id] FOREIGN KEY ([location_id]) REFERENCES [location]([id])
);

CREATE INDEX [idx_price_list_location_id] ON [price_list] ([location_id]);

-- Table: product_collection
CREATE TABLE [product_collection] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [collection_id] NVARCHAR(MAX) NOT NULL,
  [sort_order] INT NOT NULL,
  CONSTRAINT [fk_product_collection_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id]),
  CONSTRAINT [fk_product_collection_collection_id] FOREIGN KEY ([collection_id]) REFERENCES [collection]([id]),
  CONSTRAINT [uq_product_collection_1] UNIQUE ([product_id], [collection_id])
);

CREATE INDEX [idx_product_collection_product_id] ON [product_collection] ([product_id]);
CREATE INDEX [idx_product_collection_collection_id] ON [product_collection] ([collection_id]);

-- Table: account_group
CREATE TABLE [account_group] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [element] NVARCHAR(MAX) NOT NULL,
  [classification] NVARCHAR(MAX) NOT NULL,
  [display_order] INT NOT NULL DEFAULT 0,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL
);

-- Table: product_option
CREATE TABLE [product_option] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [code] NVARCHAR(MAX) NOT NULL,
  [data_type] NVARCHAR(MAX) NOT NULL DEFAULT 'text_list',
  [sort_order] INT NOT NULL DEFAULT 0,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [min_value] FLOAT NULL,
  [max_value] FLOAT NULL,
  [required] BIT NOT NULL DEFAULT false,
  CONSTRAINT [fk_product_option_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id])
);

CREATE INDEX [idx_product_option_product_id] ON [product_option] ([product_id]);

-- Table: attachment
CREATE TABLE [attachment] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [module_key] NVARCHAR(MAX) NOT NULL,
  [foreign_key] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [workspace_id] NVARCHAR(MAX) NULL,
  [storage_container] NVARCHAR(MAX) NULL,
  [storage_key] NVARCHAR(MAX) NULL,
  [content_type] NVARCHAR(MAX) NULL,
  [file_size_bytes] BIGINT NULL,
  [created_by] NVARCHAR(MAX) NULL,
  [status] NVARCHAR(MAX) NOT NULL DEFAULT 'active'
);

CREATE INDEX [idx_attachment_module_key] ON [attachment] ([module_key]);
CREATE INDEX [idx_attachment_foreign_key] ON [attachment] ([foreign_key]);

-- Table: user
CREATE TABLE [user] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [first_name] NVARCHAR(MAX) NOT NULL,
  [last_name] NVARCHAR(MAX) NOT NULL,
  [email_address] NVARCHAR(MAX) NOT NULL UNIQUE,
  [mobile_number] NVARCHAR(MAX) NOT NULL,
  [password_hash] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true
);

CREATE INDEX [idx_user_mobile_number] ON [user] ([mobile_number]);

-- Table: client
CREATE TABLE [client] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [user_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [internal_id] NVARCHAR(MAX) NOT NULL UNIQUE,
  [category_id] NVARCHAR(MAX) NULL,
  [name] NVARCHAR(MAX) NULL,
  [street_address] NVARCHAR(MAX) NULL,
  [city] NVARCHAR(MAX) NULL,
  [province] NVARCHAR(MAX) NULL,
  [postal_code] NVARCHAR(MAX) NULL,
  [notes] NVARCHAR(MAX) NULL,
  [payment_term_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_client_user_id] FOREIGN KEY ([user_id]) REFERENCES [user]([id]),
  CONSTRAINT [fk_client_category_id] FOREIGN KEY ([category_id]) REFERENCES [client_category]([id])
);

CREATE INDEX [idx_client_user_id] ON [client] ([user_id]);

-- Table: activity_execution_log
CREATE TABLE [activity_execution_log] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [workflow_id] NVARCHAR(MAX) NOT NULL,
  [activity_id] NVARCHAR(MAX) NOT NULL,
  [activity_template_id] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [start_time] NVARCHAR(MAX) NOT NULL,
  [end_time] NVARCHAR(MAX) NOT NULL,
  [input_snapshot_json] NVARCHAR(MAX) NOT NULL,
  [output_snapshot_json] NVARCHAR(MAX) NOT NULL,
  [error_message] NVARCHAR(MAX) NOT NULL,
  [created_by] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NOT NULL,
  [date_modified] BIGINT NOT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [workspace_id] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_activity_execution_log_workflow_id] FOREIGN KEY ([workflow_id]) REFERENCES [workflow]([id]),
  CONSTRAINT [fk_activity_execution_log_activity_id] FOREIGN KEY ([activity_id]) REFERENCES [activity]([id]),
  CONSTRAINT [fk_activity_execution_log_activity_template_id] FOREIGN KEY ([activity_template_id]) REFERENCES [activity_template]([id]),
  CONSTRAINT [fk_activity_execution_log_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id])
);

CREATE INDEX [idx_activity_execution_log_workflow_id] ON [activity_execution_log] ([workflow_id]);
CREATE INDEX [idx_activity_execution_log_activity_id] ON [activity_execution_log] ([activity_id]);
CREATE INDEX [idx_activity_execution_log_activity_template_id] ON [activity_execution_log] ([activity_template_id]);
CREATE INDEX [idx_activity_execution_log_workspace_id] ON [activity_execution_log] ([workspace_id]);

-- Table: petty_cash_voucher
CREATE TABLE [petty_cash_voucher] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [fund_id] NVARCHAR(MAX) NOT NULL,
  [voucher_number] NVARCHAR(MAX) NOT NULL UNIQUE,
  [payee] NVARCHAR(MAX) NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [total_amount] BIGINT NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [approved_by] NVARCHAR(MAX) NULL,
  [approved_at] BIGINT NULL,
  [date_created] BIGINT NULL,
  CONSTRAINT [fk_petty_cash_voucher_fund_id] FOREIGN KEY ([fund_id]) REFERENCES [petty_cash_fund]([id])
);

CREATE INDEX [idx_petty_cash_voucher_fund_id] ON [petty_cash_voucher] ([fund_id]);
CREATE INDEX [idx_petty_cash_voucher_voucher_number] ON [petty_cash_voucher] ([voucher_number]);

-- Table: product_option_value
CREATE TABLE [product_option_value] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [product_option_id] NVARCHAR(MAX) NOT NULL,
  [label] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [sort_order] INT NOT NULL DEFAULT 0,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_product_option_value_product_option_id] FOREIGN KEY ([product_option_id]) REFERENCES [product_option]([id]),
  CONSTRAINT [uq_product_option_value_1] UNIQUE ([product_option_id], [value])
);

CREATE INDEX [idx_product_option_value_product_option_id] ON [product_option_value] ([product_option_id]);

-- Table: collection
CREATE TABLE [collection] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true
);

-- Table: group
CREATE TABLE [group] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true
);

-- Table: asset_disposal
CREATE TABLE [asset_disposal] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [asset_id] NVARCHAR(MAX) NOT NULL,
  [disposal_date] NVARCHAR(MAX) NOT NULL,
  [disposal_type] NVARCHAR(MAX) NOT NULL,
  [proceeds] BIGINT NOT NULL,
  [cost_at_disposal] BIGINT NOT NULL,
  [accumulated_depreciation_at_disposal] BIGINT NOT NULL,
  [book_value_at_disposal] BIGINT NOT NULL,
  [gain_or_loss] BIGINT NOT NULL,
  [buyer_name] NVARCHAR(MAX) NULL,
  [reason] NVARCHAR(MAX) NULL,
  [approval_status] NVARCHAR(MAX) NULL,
  [approved_by] NVARCHAR(MAX) NULL,
  [journal_entry_id] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_asset_disposal_asset_id] FOREIGN KEY ([asset_id]) REFERENCES [asset]([id])
);

CREATE INDEX [idx_asset_disposal_asset_id] ON [asset_disposal] ([asset_id]);

-- Table: plan
CREATE TABLE [plan] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [thumbnail_url] NVARCHAR(MAX) NULL,
  [fulfillment_type] NVARCHAR(MAX) NULL
);

-- Table: location
CREATE TABLE [location] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [address] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [description] NVARCHAR(MAX) NULL,
  [timezone] NVARCHAR(MAX) NULL DEFAULT Asia/Manila,
  [location_area_id] NVARCHAR(MAX) NULL
);

-- Table: job_phase
CREATE TABLE [job_phase] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL,
  [job_id] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [phase_order] INT NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_job_phase_job_id] FOREIGN KEY ([job_id]) REFERENCES [job]([id])
);

CREATE INDEX [idx_job_phase_job_id] ON [job_phase] ([job_id]);

-- Table: role
CREATE TABLE [role] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [workspace_id] NVARCHAR(MAX) NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [color] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_role_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id])
);

CREATE INDEX [idx_role_workspace_id] ON [role] ([workspace_id]);

-- Table: supplier_attribute
CREATE TABLE [supplier_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [supplier_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_supplier_attribute_supplier_id] FOREIGN KEY ([supplier_id]) REFERENCES [supplier]([id]),
  CONSTRAINT [fk_supplier_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_supplier_attribute_1] UNIQUE ([supplier_id], [attribute_id])
);

CREATE INDEX [idx_supplier_attribute_supplier_id] ON [supplier_attribute] ([supplier_id]);
CREATE INDEX [idx_supplier_attribute_attribute_id] ON [supplier_attribute] ([attribute_id]);

-- Table: product_variant
CREATE TABLE [product_variant] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [sku] NVARCHAR(MAX) NOT NULL,
  [price_override] BIGINT NOT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_product_variant_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id])
);

CREATE INDEX [idx_product_variant_product_id] ON [product_variant] ([product_id]);

-- Table: license
CREATE TABLE [license] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [subscription_id] NVARCHAR(MAX) NOT NULL,
  [plan_id] NVARCHAR(MAX) NOT NULL,
  [license_key] NVARCHAR(MAX) NOT NULL,
  [external_key] NVARCHAR(MAX) NULL,
  [license_type] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [date_valid_from] BIGINT NULL,
  [date_valid_until] BIGINT NULL,
  [assignee_id] NVARCHAR(MAX) NULL,
  [assignee_type] NVARCHAR(MAX) NULL,
  [assignee_name] NVARCHAR(MAX) NULL,
  [assigned_by] NVARCHAR(MAX) NULL,
  [date_assigned] BIGINT NULL,
  [sequence_number] INT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_license_subscription_id] FOREIGN KEY ([subscription_id]) REFERENCES [subscription]([id]),
  CONSTRAINT [fk_license_plan_id] FOREIGN KEY ([plan_id]) REFERENCES [plan]([id])
);

CREATE INDEX [idx_license_subscription_id] ON [license] ([subscription_id]);
CREATE INDEX [idx_license_plan_id] ON [license] ([plan_id]);

-- Table: equity_account
CREATE TABLE [equity_account] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [account_type] NVARCHAR(MAX) NOT NULL,
  [owner_name] NVARCHAR(MAX) NULL,
  [account_id] NVARCHAR(MAX) NOT NULL,
  [balance] BIGINT NOT NULL DEFAULT 0,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_equity_account_account_id] FOREIGN KEY ([account_id]) REFERENCES [account]([id])
);

CREATE INDEX [idx_equity_account_account_id] ON [equity_account] ([account_id]);

-- Table: job_task
CREATE TABLE [job_task] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL,
  [job_phase_id] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [step_order] INT NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [is_ad_hoc] BIT NOT NULL,
  [assigned_to] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_job_task_job_phase_id] FOREIGN KEY ([job_phase_id]) REFERENCES [job_phase]([id]),
  CONSTRAINT [fk_job_task_assigned_to] FOREIGN KEY ([assigned_to]) REFERENCES [staff]([id])
);

CREATE INDEX [idx_job_task_job_phase_id] ON [job_task] ([job_phase_id]);
CREATE INDEX [idx_job_task_assigned_to] ON [job_task] ([assigned_to]);

-- Table: product_line
CREATE TABLE [product_line] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [line_id] NVARCHAR(MAX) NOT NULL,
  [sort_order] INT NOT NULL,
  CONSTRAINT [fk_product_line_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id]),
  CONSTRAINT [fk_product_line_line_id] FOREIGN KEY ([line_id]) REFERENCES [line]([id]),
  CONSTRAINT [uq_product_line_1] UNIQUE ([product_id], [line_id])
);

CREATE INDEX [idx_product_line_product_id] ON [product_line] ([product_id]);
CREATE INDEX [idx_product_line_line_id] ON [product_line] ([line_id]);

-- Table: workflow_template
CREATE TABLE [workflow_template] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [workspace_id] NVARCHAR(MAX) NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [business_type] NVARCHAR(MAX) NOT NULL,
  [configuration_json] NVARCHAR(MAX) NULL,
  [version] INT NULL,
  [created_by] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [input_schema_json] NVARCHAR(MAX) NULL,
  [system_id] NVARCHAR(MAX) NULL,
  [is_system] BIT NULL,
  CONSTRAINT [fk_workflow_template_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id])
);

CREATE INDEX [idx_workflow_template_workspace_id] ON [workflow_template] ([workspace_id]);

-- Table: stage_template
CREATE TABLE [stage_template] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [workflow_template_id] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [stage_type] NVARCHAR(MAX) NOT NULL,
  [order_index] INT NULL,
  [is_required] BIT NULL,
  [condition_expression] NVARCHAR(MAX) NULL,
  [created_by] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_stage_template_workflow_template_id] FOREIGN KEY ([workflow_template_id]) REFERENCES [workflow_template]([id])
);

CREATE INDEX [idx_stage_template_workflow_template_id] ON [stage_template] ([workflow_template_id]);

-- Table: fulfillment_return
CREATE TABLE [fulfillment_return] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [fulfillment_id] NVARCHAR(MAX) NOT NULL,
  [reason] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [refund_amount] BIGINT NULL,
  [currency] NVARCHAR(MAX) NOT NULL,
  [processed_by_id] NVARCHAR(MAX) NULL,
  [notes] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_fulfillment_return_fulfillment_id] FOREIGN KEY ([fulfillment_id]) REFERENCES [fulfillment]([id])
);

CREATE INDEX [idx_fulfillment_return_fulfillment_id] ON [fulfillment_return] ([fulfillment_id]);

-- Table: group_attribute
CREATE TABLE [group_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [group_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_group_attribute_group_id] FOREIGN KEY ([group_id]) REFERENCES [group]([id]),
  CONSTRAINT [fk_group_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_group_attribute_1] UNIQUE ([group_id], [attribute_id])
);

CREATE INDEX [idx_group_attribute_group_id] ON [group_attribute] ([group_id]);
CREATE INDEX [idx_group_attribute_attribute_id] ON [group_attribute] ([attribute_id]);

-- Table: activity
CREATE TABLE [activity] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [stage_id] NVARCHAR(MAX) NOT NULL,
  [activity_template_id] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [priority] NVARCHAR(MAX) NOT NULL,
  [assigned_to] NVARCHAR(MAX) NULL,
  [completed_by] NVARCHAR(MAX) NULL,
  [date_assigned] BIGINT NULL,
  [date_started] BIGINT NULL,
  [date_completed] BIGINT NULL,
  [date_due] BIGINT NULL,
  [input_data_json] NVARCHAR(MAX) NULL,
  [output_data_json] NVARCHAR(MAX) NULL,
  [result_json] NVARCHAR(MAX) NULL,
  [error_message] NVARCHAR(MAX) NULL,
  [approval_comments] NVARCHAR(MAX) NULL,
  [rejection_reason] NVARCHAR(MAX) NULL,
  [estimated_duration_minutes] INT NULL,
  [actual_duration_minutes] INT NULL,
  [created_by] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [completion_percentage] INT NULL,
  [attachment_ids] NVARCHAR(MAX) NOT NULL,
  [order_index] INT NULL,
  [stage_order_index] INT NULL,
  CONSTRAINT [fk_activity_stage_id] FOREIGN KEY ([stage_id]) REFERENCES [stage]([id]),
  CONSTRAINT [fk_activity_activity_template_id] FOREIGN KEY ([activity_template_id]) REFERENCES [activity_template]([id])
);

CREATE INDEX [idx_activity_stage_id] ON [activity] ([stage_id]);
CREATE INDEX [idx_activity_activity_template_id] ON [activity] ([activity_template_id]);

-- Table: recurring_journal_template
CREATE TABLE [recurring_journal_template] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [frequency] NVARCHAR(MAX) NOT NULL,
  [next_run_date] BIGINT NOT NULL,
  [end_date] NVARCHAR(MAX) NULL,
  [template_description] NVARCHAR(MAX) NOT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL
);

-- Table: event_occurrence
CREATE TABLE [event_occurrence] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [event_id] NVARCHAR(MAX) NOT NULL,
  [start_date_time_utc] BIGINT NOT NULL,
  [end_date_time_utc] BIGINT NOT NULL,
  [is_exception] BIT NOT NULL,
  [is_cancelled] BIT NOT NULL,
  [exception_event_id] NVARCHAR(MAX) NULL,
  [workspace_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_event_occurrence_event_id] FOREIGN KEY ([event_id]) REFERENCES [event]([id]),
  CONSTRAINT [fk_event_occurrence_exception_event_id] FOREIGN KEY ([exception_event_id]) REFERENCES [event]([id]),
  CONSTRAINT [fk_event_occurrence_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id])
);

CREATE INDEX [idx_event_occurrence_event_id] ON [event_occurrence] ([event_id]);
CREATE INDEX [idx_event_occurrence_exception_event_id] ON [event_occurrence] ([exception_event_id]);
CREATE INDEX [idx_event_occurrence_workspace_id] ON [event_occurrence] ([workspace_id]);

-- Table: deferred_revenue
CREATE TABLE [deferred_revenue] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [description] NVARCHAR(MAX) NOT NULL,
  [customer_name] NVARCHAR(MAX) NULL,
  [total_amount] BIGINT NOT NULL,
  [recognized_amount] BIGINT NOT NULL DEFAULT 0,
  [remaining_amount] BIGINT NOT NULL,
  [start_date] NVARCHAR(MAX) NOT NULL,
  [end_date] NVARCHAR(MAX) NOT NULL,
  [recognition_months] INT NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [liability_account_id] NVARCHAR(MAX) NULL,
  [revenue_account_id] NVARCHAR(MAX) NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_deferred_revenue_liability_account_id] FOREIGN KEY ([liability_account_id]) REFERENCES [account]([id]),
  CONSTRAINT [fk_deferred_revenue_revenue_account_id] FOREIGN KEY ([revenue_account_id]) REFERENCES [account]([id])
);

CREATE INDEX [idx_deferred_revenue_liability_account_id] ON [deferred_revenue] ([liability_account_id]);
CREATE INDEX [idx_deferred_revenue_revenue_account_id] ON [deferred_revenue] ([revenue_account_id]);

-- Table: event_attribute
CREATE TABLE [event_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [event_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_event_attribute_event_id] FOREIGN KEY ([event_id]) REFERENCES [event]([id]),
  CONSTRAINT [fk_event_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id])
);

CREATE INDEX [idx_event_attribute_event_id] ON [event_attribute] ([event_id]);
CREATE INDEX [idx_event_attribute_attribute_id] ON [event_attribute] ([attribute_id]);

-- Table: location_attribute
CREATE TABLE [location_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [location_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_location_attribute_location_id] FOREIGN KEY ([location_id]) REFERENCES [location]([id]),
  CONSTRAINT [fk_location_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_location_attribute_1] UNIQUE ([location_id], [attribute_id])
);

CREATE INDEX [idx_location_attribute_location_id] ON [location_attribute] ([location_id]);
CREATE INDEX [idx_location_attribute_attribute_id] ON [location_attribute] ([attribute_id]);

-- Table: workspace
CREATE TABLE [workspace] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [private] BIT NOT NULL,
  [workflow_template_id] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_workspace_workflow_template_id] FOREIGN KEY ([workflow_template_id]) REFERENCES [workflow_template]([id])
);

CREATE INDEX [idx_workspace_workflow_template_id] ON [workspace] ([workflow_template_id]);

-- Table: asset_maintenance
CREATE TABLE [asset_maintenance] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [asset_id] NVARCHAR(MAX) NOT NULL,
  [maintenance_type] NVARCHAR(MAX) NOT NULL,
  [priority] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [scheduled_date] NVARCHAR(MAX) NULL,
  [start_date] NVARCHAR(MAX) NULL,
  [completion_date] NVARCHAR(MAX) NULL,
  [description] NVARCHAR(MAX) NULL,
  [cost] BIGINT NULL,
  [is_capitalized] BIT NOT NULL,
  [performed_by] NVARCHAR(MAX) NULL,
  [vendor_id] NVARCHAR(MAX) NULL,
  [work_order_number] NVARCHAR(MAX) NULL,
  [next_maintenance_date] NVARCHAR(MAX) NULL,
  [recurrence_interval_days] INT NULL,
  [notes] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_asset_maintenance_asset_id] FOREIGN KEY ([asset_id]) REFERENCES [asset]([id])
);

CREATE INDEX [idx_asset_maintenance_asset_id] ON [asset_maintenance] ([asset_id]);

-- Table: supplier
CREATE TABLE [supplier] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [user_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [internal_id] NVARCHAR(MAX) NOT NULL UNIQUE,
  [category_id] NVARCHAR(MAX) NULL,
  [supplier_type] NVARCHAR(MAX) NOT NULL,
  [company_name] NVARCHAR(MAX) NOT NULL,
  [tax_id] NVARCHAR(MAX) NULL,
  [registration_number] NVARCHAR(MAX) NULL,
  [street_address] NVARCHAR(MAX) NULL,
  [city] NVARCHAR(MAX) NULL,
  [province] NVARCHAR(MAX) NULL,
  [postal_code] NVARCHAR(MAX) NULL,
  [country] NVARCHAR(MAX) NULL,
  [default_currency] NVARCHAR(MAX) NULL,
  [payment_terms] NVARCHAR(MAX) NULL,
  [lead_time_days] INT NULL,
  [credit_limit] BIGINT NULL,
  [status] NVARCHAR(MAX) NULL,
  [client_id] NVARCHAR(MAX) NULL,
  [website] NVARCHAR(MAX) NULL,
  [notes] NVARCHAR(MAX) NULL,
  [payment_term_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_supplier_user_id] FOREIGN KEY ([user_id]) REFERENCES [user]([id]),
  CONSTRAINT [fk_supplier_category_id] FOREIGN KEY ([category_id]) REFERENCES [supplier_category]([id]),
  CONSTRAINT [fk_supplier_client_id] FOREIGN KEY ([client_id]) REFERENCES [client]([id]),
  CONSTRAINT [fk_supplier_payment_term_id] FOREIGN KEY ([payment_term_id]) REFERENCES [payment_term]([id])
);

CREATE INDEX [idx_supplier_user_id] ON [supplier] ([user_id]);
CREATE INDEX [idx_supplier_client_id] ON [supplier] ([client_id]);

-- Table: fulfillment
CREATE TABLE [fulfillment] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [workspace_id] NVARCHAR(MAX) NOT NULL,
  [revenue_id] NVARCHAR(MAX) NOT NULL,
  [supplier_id] NVARCHAR(MAX) NULL,
  [fulfillment_method] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [provider_status] NVARCHAR(MAX) NOT NULL,
  [provider_reference] NVARCHAR(MAX) NOT NULL,
  [delivery_cost] BIGINT NOT NULL,
  [currency] NVARCHAR(MAX) NOT NULL,
  [expenditure_id] NVARCHAR(MAX) NULL,
  [notes] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [created_by] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_fulfillment_revenue_id] FOREIGN KEY ([revenue_id]) REFERENCES [revenue]([id]),
  CONSTRAINT [fk_fulfillment_supplier_id] FOREIGN KEY ([supplier_id]) REFERENCES [supplier]([id]),
  CONSTRAINT [fk_fulfillment_expenditure_id] FOREIGN KEY ([expenditure_id]) REFERENCES [expenditure]([id])
);

CREATE INDEX [idx_fulfillment_workspace_id] ON [fulfillment] ([workspace_id]);
CREATE INDEX [idx_fulfillment_revenue_id] ON [fulfillment] ([revenue_id]);
CREATE INDEX [idx_fulfillment_status] ON [fulfillment] ([status]);

-- Table: event
CREATE TABLE [event] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [start_date_time_utc] BIGINT NOT NULL,
  [end_date_time_utc] BIGINT NOT NULL,
  [timezone] NVARCHAR(MAX) NOT NULL,
  [workspace_id] NVARCHAR(MAX) NOT NULL,
  [organizer_id] NVARCHAR(MAX) NULL,
  [location_id] NVARCHAR(MAX) NULL,
  [event_recurrence_id] NVARCHAR(MAX) NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [all_day] BIT NOT NULL,
  [parent_event_id] NVARCHAR(MAX) NULL,
  [original_occurrence_utc] BIGINT NULL,
  CONSTRAINT [fk_event_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id]),
  CONSTRAINT [fk_event_organizer_id] FOREIGN KEY ([organizer_id]) REFERENCES [workspace_user]([id]),
  CONSTRAINT [fk_event_location_id] FOREIGN KEY ([location_id]) REFERENCES [location]([id]),
  CONSTRAINT [fk_event_event_recurrence_id] FOREIGN KEY ([event_recurrence_id]) REFERENCES [event_recurrence]([id]),
  CONSTRAINT [fk_event_parent_event_id] FOREIGN KEY ([parent_event_id]) REFERENCES [event]([id])
);

CREATE INDEX [idx_event_workspace_id] ON [event] ([workspace_id]);
CREATE INDEX [idx_event_organizer_id] ON [event] ([organizer_id]);
CREATE INDEX [idx_event_location_id] ON [event] ([location_id]);
CREATE INDEX [idx_event_event_recurrence_id] ON [event] ([event_recurrence_id]);
CREATE INDEX [idx_event_parent_event_id] ON [event] ([parent_event_id]);

-- Table: price_plan
CREATE TABLE [price_plan] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [plan_id] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [amount] BIGINT NOT NULL,
  [currency] NVARCHAR(MAX) NOT NULL,
  [duration_value] INT NOT NULL,
  [duration_unit] NVARCHAR(MAX) NOT NULL,
  [confirmation_template] NVARCHAR(MAX) NULL,
  [receipt_template] NVARCHAR(MAX) NULL,
  [location_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_price_plan_plan_id] FOREIGN KEY ([plan_id]) REFERENCES [plan]([id]),
  CONSTRAINT [fk_price_plan_location_id] FOREIGN KEY ([location_id]) REFERENCES [location]([id])
);

CREATE INDEX [idx_price_plan_plan_id] ON [price_plan] ([plan_id]);
CREATE INDEX [idx_price_plan_location_id] ON [price_plan] ([location_id]);

-- Table: event_client
CREATE TABLE [event_client] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [event_id] NVARCHAR(MAX) NOT NULL,
  [client_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_event_client_event_id] FOREIGN KEY ([event_id]) REFERENCES [event]([id]),
  CONSTRAINT [fk_event_client_client_id] FOREIGN KEY ([client_id]) REFERENCES [client]([id]),
  CONSTRAINT [uq_event_client_1] UNIQUE ([event_id], [client_id])
);

CREATE INDEX [idx_event_client_event_id] ON [event_client] ([event_id]);
CREATE INDEX [idx_event_client_client_id] ON [event_client] ([client_id]);

-- Table: client_attribute
CREATE TABLE [client_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [client_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_client_attribute_client_id] FOREIGN KEY ([client_id]) REFERENCES [client]([id]),
  CONSTRAINT [fk_client_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_client_attribute_1] UNIQUE ([client_id], [attribute_id])
);

CREATE INDEX [idx_client_attribute_client_id] ON [client_attribute] ([client_id]);
CREATE INDEX [idx_client_attribute_attribute_id] ON [client_attribute] ([attribute_id]);

-- Table: staff
CREATE TABLE [staff] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [user_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_staff_user_id] FOREIGN KEY ([user_id]) REFERENCES [user]([id])
);

CREATE INDEX [idx_staff_user_id] ON [staff] ([user_id]);

-- Table: inventory_serial
CREATE TABLE [inventory_serial] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [inventory_item_id] NVARCHAR(MAX) NOT NULL,
  [serial_number] NVARCHAR(MAX) NOT NULL UNIQUE,
  [imei] NVARCHAR(MAX) NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [warranty_start] NVARCHAR(MAX) NULL,
  [warranty_end] NVARCHAR(MAX) NULL,
  [purchase_order] NVARCHAR(MAX) NULL,
  [notes] NVARCHAR(MAX) NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_inventory_serial_inventory_item_id] FOREIGN KEY ([inventory_item_id]) REFERENCES [inventory_item]([id])
);

CREATE INDEX [idx_inventory_serial_inventory_item_id] ON [inventory_serial] ([inventory_item_id]);

-- Table: client_category
CREATE TABLE [client_category] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [client_id] NVARCHAR(MAX) NOT NULL,
  [category_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_client_category_client_id] FOREIGN KEY ([client_id]) REFERENCES [client]([id]),
  CONSTRAINT [fk_client_category_category_id] FOREIGN KEY ([category_id]) REFERENCES [category]([id]),
  CONSTRAINT [uq_client_category_1] UNIQUE ([client_id], [category_id])
);

CREATE INDEX [idx_client_category_client_id] ON [client_category] ([client_id]);
CREATE INDEX [idx_client_category_category_id] ON [client_category] ([category_id]);

-- Table: attribute
CREATE TABLE [attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [code] NVARCHAR(MAX) NOT NULL,
  [data_type] NVARCHAR(MAX) NOT NULL,
  [module] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true
);

-- Table: permission
CREATE TABLE [permission] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [workspace_id] NVARCHAR(MAX) NOT NULL,
  [user_id] NVARCHAR(MAX) NOT NULL,
  [granted_by_user_id] NVARCHAR(MAX) NOT NULL,
  [permission_code] NVARCHAR(MAX) NOT NULL,
  [permission_type] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_permission_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id]),
  CONSTRAINT [fk_permission_user_id] FOREIGN KEY ([user_id]) REFERENCES [user]([id]),
  CONSTRAINT [fk_permission_granted_by_user_id] FOREIGN KEY ([granted_by_user_id]) REFERENCES [user]([id])
);

CREATE INDEX [idx_permission_workspace_id] ON [permission] ([workspace_id]);
CREATE INDEX [idx_permission_user_id] ON [permission] ([user_id]);
CREATE INDEX [idx_permission_granted_by_user_id] ON [permission] ([granted_by_user_id]);

-- Table: asset_transaction
CREATE TABLE [asset_transaction] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [asset_id] NVARCHAR(MAX) NOT NULL,
  [transaction_type] NVARCHAR(MAX) NOT NULL,
  [transaction_date] BIGINT NOT NULL,
  [amount] BIGINT NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [reference_number] NVARCHAR(MAX) NULL,
  [from_location_id] NVARCHAR(MAX) NULL,
  [to_location_id] NVARCHAR(MAX) NULL,
  [journal_entry_id] NVARCHAR(MAX) NULL,
  [performed_by] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_asset_transaction_asset_id] FOREIGN KEY ([asset_id]) REFERENCES [asset]([id])
);

CREATE INDEX [idx_asset_transaction_asset_id] ON [asset_transaction] ([asset_id]);

-- Table: fulfillment_status_event
CREATE TABLE [fulfillment_status_event] (
  [id] BIGINT PRIMARY KEY,
  [fulfillment_id] NVARCHAR(MAX) NOT NULL,
  [from_status] NVARCHAR(MAX) NULL,
  [to_status] NVARCHAR(MAX) NOT NULL,
  [provider_status] NVARCHAR(MAX) NOT NULL,
  [provider_reference] NVARCHAR(MAX) NOT NULL,
  [triggered_by_id] NVARCHAR(MAX) NULL,
  [reason] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_fulfillment_status_event_fulfillment_id] FOREIGN KEY ([fulfillment_id]) REFERENCES [fulfillment]([id])
);

CREATE INDEX [idx_fulfillment_status_event_fulfillment_id] ON [fulfillment_status_event] ([fulfillment_id]);

-- Table: depreciation_schedule
CREATE TABLE [depreciation_schedule] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [asset_id] NVARCHAR(MAX) NOT NULL,
  [period_number] INT NOT NULL,
  [fiscal_year] INT NOT NULL,
  [fiscal_period] INT NOT NULL,
  [period_start_date] NVARCHAR(MAX) NOT NULL,
  [period_end_date] NVARCHAR(MAX) NOT NULL,
  [opening_book_value] BIGINT NOT NULL,
  [depreciation_amount] BIGINT NOT NULL,
  [accumulated_depreciation] BIGINT NOT NULL,
  [closing_book_value] BIGINT NOT NULL,
  [units_produced] BIGINT NULL,
  [is_posted] BIT NOT NULL,
  [journal_entry_id] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_depreciation_schedule_asset_id] FOREIGN KEY ([asset_id]) REFERENCES [asset]([id])
);

CREATE INDEX [idx_depreciation_schedule_asset_id] ON [depreciation_schedule] ([asset_id]);

-- Table: account
CREATE TABLE [account] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [code] NVARCHAR(MAX) NOT NULL UNIQUE,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [element] NVARCHAR(MAX) NOT NULL,
  [classification] NVARCHAR(MAX) NOT NULL,
  [group_id] NVARCHAR(MAX) NULL,
  [parent_id] NVARCHAR(MAX) NULL,
  [cash_flow_activity] NVARCHAR(MAX) NOT NULL,
  [normal_balance] NVARCHAR(MAX) NOT NULL,
  [is_system_account] BIT NOT NULL DEFAULT false,
  [is_contra] BIT NOT NULL DEFAULT false,
  [status] NVARCHAR(MAX) NOT NULL,
  [notes] NVARCHAR(MAX) NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_account_group_id] FOREIGN KEY ([group_id]) REFERENCES [account_group]([id]),
  CONSTRAINT [fk_account_parent_id] FOREIGN KEY ([parent_id]) REFERENCES [account]([id])
);

CREATE INDEX [idx_account_code] ON [account] ([code]);
CREATE INDEX [idx_account_group_id] ON [account] ([group_id]);
CREATE INDEX [idx_account_parent_id] ON [account] ([parent_id]);

-- Table: asset_location
CREATE TABLE [asset_location] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [asset_id] NVARCHAR(MAX) NOT NULL,
  [location_id] NVARCHAR(MAX) NOT NULL,
  [is_primary] BIT NOT NULL,
  [assignment_type] NVARCHAR(MAX) NOT NULL,
  [date_assigned] BIGINT NULL,
  [date_unassigned] BIGINT NULL,
  [notes] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_asset_location_asset_id] FOREIGN KEY ([asset_id]) REFERENCES [asset]([id]),
  CONSTRAINT [fk_asset_location_location_id] FOREIGN KEY ([location_id]) REFERENCES [location]([id]),
  CONSTRAINT [uq_asset_location_1] UNIQUE ([asset_id], [location_id])
);

CREATE INDEX [idx_asset_location_asset_id] ON [asset_location] ([asset_id]);
CREATE INDEX [idx_asset_location_location_id] ON [asset_location] ([location_id]);

-- Table: supplier_category
CREATE TABLE [supplier_category] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [supplier_id] NVARCHAR(MAX) NOT NULL,
  [category_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_supplier_category_supplier_id] FOREIGN KEY ([supplier_id]) REFERENCES [supplier]([id]),
  CONSTRAINT [fk_supplier_category_category_id] FOREIGN KEY ([category_id]) REFERENCES [category]([id]),
  CONSTRAINT [uq_supplier_category_1] UNIQUE ([supplier_id], [category_id])
);

CREATE INDEX [idx_supplier_category_supplier_id] ON [supplier_category] ([supplier_id]);
CREATE INDEX [idx_supplier_category_category_id] ON [supplier_category] ([category_id]);

-- Table: event_resource
CREATE TABLE [event_resource] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [event_id] NVARCHAR(MAX) NOT NULL,
  [resource_id] NVARCHAR(MAX) NOT NULL,
  [resource_type] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NULL,
  [workspace_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_event_resource_event_id] FOREIGN KEY ([event_id]) REFERENCES [event]([id]),
  CONSTRAINT [fk_event_resource_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id]),
  CONSTRAINT [uq_event_resource_1] UNIQUE ([event_id], [resource_id])
);

CREATE INDEX [idx_event_resource_event_id] ON [event_resource] ([event_id]);
CREATE INDEX [idx_event_resource_resource_id] ON [event_resource] ([resource_id]);
CREATE INDEX [idx_event_resource_workspace_id] ON [event_resource] ([workspace_id]);

-- Table: price_product
CREATE TABLE [price_product] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [amount] BIGINT NOT NULL,
  [currency] NVARCHAR(MAX) NOT NULL,
  [date_start] NVARCHAR(MAX) NOT NULL,
  [date_end] NVARCHAR(MAX) NULL,
  [price_list_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_price_product_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id]),
  CONSTRAINT [fk_price_product_price_list_id] FOREIGN KEY ([price_list_id]) REFERENCES [price_list]([id])
);

CREATE INDEX [idx_price_product_product_id] ON [price_product] ([product_id]);
CREATE INDEX [idx_price_product_price_list_id] ON [price_product] ([price_list_id]);

-- Table: attribute_value
CREATE TABLE [attribute_value] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [sort_order] INT NOT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_attribute_value_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id])
);

CREATE INDEX [idx_attribute_value_attribute_id] ON [attribute_value] ([attribute_id]);

-- Table: product_variant_image
CREATE TABLE [product_variant_image] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [product_variant_id] NVARCHAR(MAX) NOT NULL,
  [image_url] NVARCHAR(MAX) NOT NULL,
  [alt_text] NVARCHAR(MAX) NULL,
  [sort_order] INT NOT NULL,
  [is_primary] BIT NOT NULL,
  CONSTRAINT [fk_product_variant_image_product_variant_id] FOREIGN KEY ([product_variant_id]) REFERENCES [product_variant]([id])
);

CREATE INDEX [idx_product_variant_image_product_variant_id] ON [product_variant_image] ([product_variant_id]);

-- Table: category
CREATE TABLE [category] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [code] NVARCHAR(MAX) NOT NULL,
  [module] NVARCHAR(MAX) NOT NULL,
  [parent_id] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [display_order] INT NULL,
  CONSTRAINT [fk_category_parent_id] FOREIGN KEY ([parent_id]) REFERENCES [category]([id])
);

CREATE INDEX [idx_category_parent_id] ON [category] ([parent_id]);

-- Table: activity_expense
CREATE TABLE [activity_expense] (
  [activity_id] NVARCHAR(MAX) NOT NULL,
  [expense_category] NVARCHAR(MAX) NOT NULL,
  [vendor_ref] NVARCHAR(MAX) NULL,
  [receipt_url] NVARCHAR(MAX) NULL,
  [reimbursable] BIT NOT NULL,
  CONSTRAINT [fk_activity_expense_activity_id] FOREIGN KEY ([activity_id]) REFERENCES [job_activity]([id])
);

-- Table: balance
CREATE TABLE [balance] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [amount] BIGINT NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [client_id] NVARCHAR(MAX) NOT NULL,
  [subscription_id] NVARCHAR(MAX) NOT NULL,
  [currency] NVARCHAR(MAX) NOT NULL,
  [balance_type] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_balance_client_id] FOREIGN KEY ([client_id]) REFERENCES [client]([id]),
  CONSTRAINT [fk_balance_subscription_id] FOREIGN KEY ([subscription_id]) REFERENCES [subscription]([id])
);

CREATE INDEX [idx_balance_client_id] ON [balance] ([client_id]);
CREATE INDEX [idx_balance_subscription_id] ON [balance] ([subscription_id]);

-- Table: job_template_task
CREATE TABLE [job_template_task] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [job_template_phase_id] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [step_order] INT NOT NULL,
  [estimated_duration_minutes] INT NULL,
  CONSTRAINT [fk_job_template_task_job_template_phase_id] FOREIGN KEY ([job_template_phase_id]) REFERENCES [job_template_phase]([id])
);

CREATE INDEX [idx_job_template_task_job_template_phase_id] ON [job_template_task] ([job_template_phase_id]);

-- Table: collection_plan
CREATE TABLE [collection_plan] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [collection_id] NVARCHAR(MAX) NOT NULL,
  [plan_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_collection_plan_collection_id] FOREIGN KEY ([collection_id]) REFERENCES [collection]([id]),
  CONSTRAINT [fk_collection_plan_plan_id] FOREIGN KEY ([plan_id]) REFERENCES [plan]([id]),
  CONSTRAINT [uq_collection_plan_1] UNIQUE ([collection_id], [plan_id])
);

CREATE INDEX [idx_collection_plan_collection_id] ON [collection_plan] ([collection_id]);
CREATE INDEX [idx_collection_plan_plan_id] ON [collection_plan] ([plan_id]);

-- Table: template_task_criteria
CREATE TABLE [template_task_criteria] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [job_template_task_id] NVARCHAR(MAX) NOT NULL,
  [outcome_criteria_id] NVARCHAR(MAX) NOT NULL,
  [sequence_order] INT NOT NULL,
  [required_override] BIT NULL,
  [weight_override] FLOAT NULL,
  [aggregation_method_override] NVARCHAR(MAX) NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  CONSTRAINT [fk_template_task_criteria_job_template_task_id] FOREIGN KEY ([job_template_task_id]) REFERENCES [job_template_task]([id]),
  CONSTRAINT [fk_template_task_criteria_outcome_criteria_id] FOREIGN KEY ([outcome_criteria_id]) REFERENCES [outcome_criteria]([id])
);

CREATE INDEX [idx_template_task_criteria_job_template_task_id] ON [template_task_criteria] ([job_template_task_id]);
CREATE INDEX [idx_template_task_criteria_outcome_criteria_id] ON [template_task_criteria] ([outcome_criteria_id]);

-- Table: journal_line
CREATE TABLE [journal_line] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [journal_entry_id] NVARCHAR(MAX) NOT NULL,
  [account_id] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [debit_amount] BIGINT NOT NULL DEFAULT 0,
  [credit_amount] BIGINT NOT NULL DEFAULT 0,
  [line_order] INT NOT NULL DEFAULT 0,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  CONSTRAINT [fk_journal_line_journal_entry_id] FOREIGN KEY ([journal_entry_id]) REFERENCES [journal_entry]([id]),
  CONSTRAINT [fk_journal_line_account_id] FOREIGN KEY ([account_id]) REFERENCES [account]([id])
);

CREATE INDEX [idx_journal_line_journal_entry_id] ON [journal_line] ([journal_entry_id]);
CREATE INDEX [idx_journal_line_account_id] ON [journal_line] ([account_id]);

-- Table: petty_cash_replenishment
CREATE TABLE [petty_cash_replenishment] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [fund_id] NVARCHAR(MAX) NOT NULL,
  [replenishment_number] NVARCHAR(MAX) NOT NULL UNIQUE,
  [amount] BIGINT NOT NULL,
  [replenishment_date] BIGINT NOT NULL,
  [voucher_ids] NVARCHAR(MAX) NOT NULL,
  [posted_by] NVARCHAR(MAX) NULL,
  [notes] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  CONSTRAINT [fk_petty_cash_replenishment_fund_id] FOREIGN KEY ([fund_id]) REFERENCES [petty_cash_fund]([id])
);

CREATE INDEX [idx_petty_cash_replenishment_fund_id] ON [petty_cash_replenishment] ([fund_id]);
CREATE INDEX [idx_petty_cash_replenishment_replenishment_number] ON [petty_cash_replenishment] ([replenishment_number]);

-- Table: fulfillment_return_item
CREATE TABLE [fulfillment_return_item] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [fulfillment_return_id] NVARCHAR(MAX) NOT NULL,
  [fulfillment_item_id] NVARCHAR(MAX) NOT NULL,
  [quantity_returned] FLOAT NOT NULL,
  [reason] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  CONSTRAINT [fk_fulfillment_return_item_fulfillment_return_id] FOREIGN KEY ([fulfillment_return_id]) REFERENCES [fulfillment_return]([id]),
  CONSTRAINT [fk_fulfillment_return_item_fulfillment_item_id] FOREIGN KEY ([fulfillment_item_id]) REFERENCES [fulfillment_item]([id])
);

CREATE INDEX [idx_fulfillment_return_item_fulfillment_return_id] ON [fulfillment_return_item] ([fulfillment_return_id]);

-- Table: admin
CREATE TABLE [admin] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [user_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_admin_user_id] FOREIGN KEY ([user_id]) REFERENCES [user]([id])
);

CREATE INDEX [idx_admin_user_id] ON [admin] ([user_id]);

-- Table: revenue_line_item
CREATE TABLE [revenue_line_item] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL,
  [revenue_id] NVARCHAR(MAX) NOT NULL,
  [product_id] NVARCHAR(MAX) NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [quantity] FLOAT NOT NULL,
  [unit_price] BIGINT NOT NULL,
  [total_price] BIGINT NOT NULL,
  [notes] NVARCHAR(MAX) NULL,
  [line_item_type] NVARCHAR(MAX) NOT NULL,
  [inventory_item_id] NVARCHAR(MAX) NOT NULL,
  [inventory_serial_id] NVARCHAR(MAX) NOT NULL,
  [price_list_id] NVARCHAR(MAX) NULL,
  [variant_id] NVARCHAR(MAX) NULL,
  [variant_label] NVARCHAR(MAX) NULL,
  [location_id] NVARCHAR(MAX) NULL,
  [cost_price] BIGINT NULL,
  [product_price_plan_id] NVARCHAR(MAX) NULL,
  [price_product_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_revenue_line_item_product_price_plan_id] FOREIGN KEY ([product_price_plan_id]) REFERENCES [product_price_plan]([id]),
  CONSTRAINT [fk_revenue_line_item_price_product_id] FOREIGN KEY ([price_product_id]) REFERENCES [price_product]([id])
);

CREATE INDEX [idx_revenue_line_item_product_price_plan_id] ON [revenue_line_item] ([product_price_plan_id]);
CREATE INDEX [idx_revenue_line_item_price_product_id] ON [revenue_line_item] ([price_product_id]);

-- Table: integration_config
CREATE TABLE [integration_config] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [workspace_id] NVARCHAR(MAX) NOT NULL,
  [integration_type] NVARCHAR(MAX) NOT NULL,
  [provider_id] NVARCHAR(MAX) NOT NULL,
  [display_name] NVARCHAR(MAX) NOT NULL,
  [enabled] BIT NOT NULL DEFAULT false,
  [webhook_url] NVARCHAR(MAX) NULL,
  [webhook_secret] NVARCHAR(MAX) NULL,
  [health_status] NVARCHAR(MAX) NOT NULL,
  [last_health_check] BIGINT NULL,
  [health_message] NVARCHAR(MAX) NULL,
  [created_by] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true
);

CREATE INDEX [idx_integration_config_workspace_id] ON [integration_config] ([workspace_id]);
CREATE INDEX [idx_integration_config_integration_type] ON [integration_config] ([integration_type]);
CREATE INDEX [idx_integration_config_provider_id] ON [integration_config] ([provider_id]);

-- Table: job_template_phase
CREATE TABLE [job_template_phase] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [job_template_id] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [phase_order] INT NOT NULL,
  CONSTRAINT [fk_job_template_phase_job_template_id] FOREIGN KEY ([job_template_id]) REFERENCES [job_template]([id])
);

CREATE INDEX [idx_job_template_phase_job_template_id] ON [job_template_phase] ([job_template_id]);

-- Table: role_permission
CREATE TABLE [role_permission] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [role_id] NVARCHAR(MAX) NOT NULL,
  [permission_id] NVARCHAR(MAX) NOT NULL,
  [permission_type] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_role_permission_role_id] FOREIGN KEY ([role_id]) REFERENCES [role]([id]),
  CONSTRAINT [fk_role_permission_permission_id] FOREIGN KEY ([permission_id]) REFERENCES [permission]([id]),
  CONSTRAINT [uq_role_permission_1] UNIQUE ([role_id], [permission_id])
);

CREATE INDEX [idx_role_permission_role_id] ON [role_permission] ([role_id]);
CREATE INDEX [idx_role_permission_permission_id] ON [role_permission] ([permission_id]);

-- Table: prepayment
CREATE TABLE [prepayment] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [description] NVARCHAR(MAX) NOT NULL,
  [vendor_name] NVARCHAR(MAX) NULL,
  [total_amount] BIGINT NOT NULL,
  [remaining_amount] BIGINT NOT NULL,
  [start_date] NVARCHAR(MAX) NOT NULL,
  [end_date] NVARCHAR(MAX) NOT NULL,
  [amortization_months] INT NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [account_id] NVARCHAR(MAX) NULL,
  [expense_account_id] NVARCHAR(MAX) NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_prepayment_account_id] FOREIGN KEY ([account_id]) REFERENCES [account]([id]),
  CONSTRAINT [fk_prepayment_expense_account_id] FOREIGN KEY ([expense_account_id]) REFERENCES [account]([id])
);

CREATE INDEX [idx_prepayment_account_id] ON [prepayment] ([account_id]);
CREATE INDEX [idx_prepayment_expense_account_id] ON [prepayment] ([expense_account_id]);

-- Table: asset
CREATE TABLE [asset] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [asset_number] NVARCHAR(MAX) NOT NULL UNIQUE,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [asset_type] NVARCHAR(MAX) NOT NULL,
  [asset_category_id] NVARCHAR(MAX) NOT NULL,
  [serial_number] NVARCHAR(MAX) NULL,
  [tag_number] NVARCHAR(MAX) NULL,
  [manufacturer] NVARCHAR(MAX) NULL,
  [model] NVARCHAR(MAX) NULL,
  [location_id] NVARCHAR(MAX) NULL,
  [custodian_id] NVARCHAR(MAX) NULL,
  [vendor_id] NVARCHAR(MAX) NULL,
  [product_id] NVARCHAR(MAX) NULL,
  [purchase_order_number] NVARCHAR(MAX) NULL,
  [invoice_number] NVARCHAR(MAX) NULL,
  [acquisition_date] NVARCHAR(MAX) NULL,
  [date_placed_in_service] BIGINT NULL,
  [acquisition_cost] BIGINT NOT NULL,
  [currency] NVARCHAR(MAX) NOT NULL,
  [salvage_value] BIGINT NOT NULL,
  [book_value] BIGINT NOT NULL,
  [fair_value] BIGINT NULL,
  [useful_life_months] INT NOT NULL,
  [useful_life_units] BIGINT NULL,
  [depreciation_method] NVARCHAR(MAX) NOT NULL,
  [depreciation_rate] FLOAT NULL,
  [depreciation_start_date] NVARCHAR(MAX) NULL,
  [accumulated_depreciation] BIGINT NOT NULL,
  [measurement_model] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [warranty_expiry_date] BIGINT NULL,
  [notes] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_asset_asset_category_id] FOREIGN KEY ([asset_category_id]) REFERENCES [asset_category]([id]),
  CONSTRAINT [fk_asset_location_id] FOREIGN KEY ([location_id]) REFERENCES [location]([id])
);

CREATE INDEX [idx_asset_asset_category_id] ON [asset] ([asset_category_id]);
CREATE INDEX [idx_asset_location_id] ON [asset] ([location_id]);

-- Table: product_price_plan
CREATE TABLE [product_price_plan] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [price_plan_id] NVARCHAR(MAX) NOT NULL,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [price] BIGINT NOT NULL,
  [currency] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_product_price_plan_price_plan_id] FOREIGN KEY ([price_plan_id]) REFERENCES [price_plan]([id]),
  CONSTRAINT [fk_product_price_plan_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id])
);

CREATE INDEX [idx_product_price_plan_price_plan_id] ON [product_price_plan] ([price_plan_id]);
CREATE INDEX [idx_product_price_plan_product_id] ON [product_price_plan] ([product_id]);

-- Table: payment_term
CREATE TABLE [payment_term] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [code] NVARCHAR(MAX) NOT NULL UNIQUE,
  [type] NVARCHAR(MAX) NOT NULL,
  [net_days] INT NOT NULL,
  [discount_days] INT NULL,
  [discount_percent_bps] INT NULL,
  [entity_scope] NVARCHAR(MAX) NOT NULL,
  [is_default] BIT NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [display_order] INT NULL,
  [proximate_day] INT NULL
);

-- Table: delegate
CREATE TABLE [delegate] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [user_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_delegate_user_id] FOREIGN KEY ([user_id]) REFERENCES [user]([id])
);

CREATE INDEX [idx_delegate_user_id] ON [delegate] ([user_id]);

-- Table: resource
CREATE TABLE [resource] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [product_id] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_resource_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id])
);

CREATE INDEX [idx_resource_product_id] ON [resource] ([product_id]);

-- Table: event_attendee
CREATE TABLE [event_attendee] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [event_id] NVARCHAR(MAX) NOT NULL,
  [client_id] NVARCHAR(MAX) NULL,
  [workspace_user_id] NVARCHAR(MAX) NULL,
  [role] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [is_organizer] BIT NOT NULL,
  [display_name] NVARCHAR(MAX) NULL,
  [workspace_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_event_attendee_event_id] FOREIGN KEY ([event_id]) REFERENCES [event]([id]),
  CONSTRAINT [fk_event_attendee_client_id] FOREIGN KEY ([client_id]) REFERENCES [client]([id]),
  CONSTRAINT [fk_event_attendee_workspace_user_id] FOREIGN KEY ([workspace_user_id]) REFERENCES [workspace_user]([id]),
  CONSTRAINT [fk_event_attendee_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id]),
  CONSTRAINT [uq_event_attendee_1] UNIQUE ([event_id], [client_id])
);

CREATE INDEX [idx_event_attendee_event_id] ON [event_attendee] ([event_id]);
CREATE INDEX [idx_event_attendee_client_id] ON [event_attendee] ([client_id]);
CREATE INDEX [idx_event_attendee_workspace_user_id] ON [event_attendee] ([workspace_user_id]);
CREATE INDEX [idx_event_attendee_workspace_id] ON [event_attendee] ([workspace_id]);

-- Table: criteria_option
CREATE TABLE [criteria_option] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [outcome_criteria_id] NVARCHAR(MAX) NOT NULL,
  [option_key] NVARCHAR(MAX) NOT NULL,
  [option_label] NVARCHAR(MAX) NOT NULL,
  [display_order] INT NOT NULL,
  [severity] INT NULL,
  [maps_to_determination] NVARCHAR(MAX) NULL,
  [required] BIT NOT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_criteria_option_outcome_criteria_id] FOREIGN KEY ([outcome_criteria_id]) REFERENCES [outcome_criteria]([id])
);

CREATE INDEX [idx_criteria_option_outcome_criteria_id] ON [criteria_option] ([outcome_criteria_id]);

-- Table: workflow
CREATE TABLE [workflow] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [workspace_id] NVARCHAR(MAX) NULL,
  [created_by] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [version] INT NULL,
  [workflow_template_id] NVARCHAR(MAX) NULL,
  [context_json] NVARCHAR(MAX) NULL,
  [current_stage_index] INT NULL,
  CONSTRAINT [fk_workflow_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id]),
  CONSTRAINT [fk_workflow_workflow_template_id] FOREIGN KEY ([workflow_template_id]) REFERENCES [workflow_template]([id])
);

CREATE INDEX [idx_workflow_workspace_id] ON [workflow] ([workspace_id]);
CREATE INDEX [idx_workflow_workflow_template_id] ON [workflow] ([workflow_template_id]);

-- Table: job_settlement
CREATE TABLE [job_settlement] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [job_activity_id] NVARCHAR(MAX) NOT NULL,
  [target_type] NVARCHAR(MAX) NOT NULL,
  [target_id] NVARCHAR(MAX) NOT NULL,
  [allocated_amount] BIGINT NOT NULL,
  [allocation_pct] FLOAT NULL,
  [settlement_date] BIGINT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [reversal_of_id] NVARCHAR(MAX) NULL,
  [created_by] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [active] BIT NOT NULL,
  [workspace_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_job_settlement_job_activity_id] FOREIGN KEY ([job_activity_id]) REFERENCES [job_activity]([id]),
  CONSTRAINT [fk_job_settlement_reversal_of_id] FOREIGN KEY ([reversal_of_id]) REFERENCES [job_settlement]([id]),
  CONSTRAINT [fk_job_settlement_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id])
);

CREATE INDEX [idx_job_settlement_job_activity_id] ON [job_settlement] ([job_activity_id]);
CREATE INDEX [idx_job_settlement_workspace_id] ON [job_settlement] ([workspace_id]);

-- Table: subscription_attribute
CREATE TABLE [subscription_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [subscription_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_subscription_attribute_subscription_id] FOREIGN KEY ([subscription_id]) REFERENCES [subscription]([id]),
  CONSTRAINT [fk_subscription_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_subscription_attribute_1] UNIQUE ([subscription_id], [attribute_id])
);

CREATE INDEX [idx_subscription_attribute_subscription_id] ON [subscription_attribute] ([subscription_id]);
CREATE INDEX [idx_subscription_attribute_attribute_id] ON [subscription_attribute] ([attribute_id]);

-- Table: inventory_serial_history
CREATE TABLE [inventory_serial_history] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [inventory_serial_id] NVARCHAR(MAX) NOT NULL,
  [inventory_item_id] NVARCHAR(MAX) NOT NULL,
  [from_status] NVARCHAR(MAX) NOT NULL,
  [to_status] NVARCHAR(MAX) NOT NULL,
  [reference_type] NVARCHAR(MAX) NOT NULL,
  [reference_id] NVARCHAR(MAX) NOT NULL,
  [notes] NVARCHAR(MAX) NOT NULL,
  [changed_by] NVARCHAR(MAX) NOT NULL,
  [changed_by_role] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_inventory_serial_history_inventory_serial_id] FOREIGN KEY ([inventory_serial_id]) REFERENCES [inventory_serial]([id]),
  CONSTRAINT [fk_inventory_serial_history_inventory_item_id] FOREIGN KEY ([inventory_item_id]) REFERENCES [inventory_item]([id])
);

CREATE INDEX [idx_inventory_serial_history_inventory_serial_id] ON [inventory_serial_history] ([inventory_serial_id]);
CREATE INDEX [idx_inventory_serial_history_inventory_item_id] ON [inventory_serial_history] ([inventory_item_id]);

-- Table: journal_entry
CREATE TABLE [journal_entry] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [entry_number] NVARCHAR(MAX) NOT NULL UNIQUE,
  [description] NVARCHAR(MAX) NOT NULL,
  [entry_date] BIGINT NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [source_type] NVARCHAR(MAX) NOT NULL,
  [source_id] NVARCHAR(MAX) NULL,
  [fiscal_period_id] NVARCHAR(MAX) NULL,
  [total_debit] BIGINT NOT NULL,
  [total_credit] BIGINT NOT NULL,
  [posted_by] NVARCHAR(MAX) NULL,
  [posted_at] BIGINT NULL,
  [reversed_by] NVARCHAR(MAX) NULL,
  [reversed_at] BIGINT NULL,
  [reversal_entry_id] NVARCHAR(MAX) NULL,
  [notes] NVARCHAR(MAX) NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_journal_entry_fiscal_period_id] FOREIGN KEY ([fiscal_period_id]) REFERENCES [fiscal_period]([id]),
  CONSTRAINT [fk_journal_entry_reversal_entry_id] FOREIGN KEY ([reversal_entry_id]) REFERENCES [journal_entry]([id])
);

CREATE INDEX [idx_journal_entry_entry_number] ON [journal_entry] ([entry_number]);
CREATE INDEX [idx_journal_entry_source_id] ON [journal_entry] ([source_id]);
CREATE INDEX [idx_journal_entry_fiscal_period_id] ON [journal_entry] ([fiscal_period_id]);
CREATE INDEX [idx_journal_entry_reversal_entry_id] ON [journal_entry] ([reversal_entry_id]);

-- Table: product
CREATE TABLE [product] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [price] BIGINT NOT NULL,
  [currency] NVARCHAR(MAX) NOT NULL,
  [item_type] NVARCHAR(MAX) NOT NULL,
  [fulfillment_method] NVARCHAR(MAX) NOT NULL
);

-- Table: location_area
CREATE TABLE [location_area] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true
);

-- Table: activity_material
CREATE TABLE [activity_material] (
  [activity_id] NVARCHAR(MAX) NOT NULL,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [unit_of_measure] NVARCHAR(MAX) NOT NULL,
  [lot_number] NVARCHAR(MAX) NULL,
  [location_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_activity_material_activity_id] FOREIGN KEY ([activity_id]) REFERENCES [job_activity]([id]),
  CONSTRAINT [fk_activity_material_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id]),
  CONSTRAINT [fk_activity_material_location_id] FOREIGN KEY ([location_id]) REFERENCES [location]([id])
);

CREATE INDEX [idx_activity_material_product_id] ON [activity_material] ([product_id]);
CREATE INDEX [idx_activity_material_location_id] ON [activity_material] ([location_id]);

-- Table: loan
CREATE TABLE [loan] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [loan_number] NVARCHAR(MAX) NOT NULL UNIQUE,
  [description] NVARCHAR(MAX) NULL,
  [loan_type] NVARCHAR(MAX) NOT NULL,
  [lender_name] NVARCHAR(MAX) NOT NULL,
  [principal_amount] BIGINT NOT NULL,
  [interest_rate] FLOAT NOT NULL,
  [term_months] INT NOT NULL,
  [start_date] NVARCHAR(MAX) NOT NULL,
  [maturity_date] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [remaining_balance] BIGINT NOT NULL,
  [account_id] NVARCHAR(MAX) NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_loan_account_id] FOREIGN KEY ([account_id]) REFERENCES [account]([id])
);

CREATE INDEX [idx_loan_loan_number] ON [loan] ([loan_number]);
CREATE INDEX [idx_loan_account_id] ON [loan] ([account_id]);

-- Table: asset_category
CREATE TABLE [asset_category] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [code] NVARCHAR(MAX) NOT NULL UNIQUE,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [parent_category_id] NVARCHAR(MAX) NULL,
  [default_depreciation_method] NVARCHAR(MAX) NOT NULL,
  [default_useful_life_months] INT NOT NULL,
  [default_salvage_value_percent] FLOAT NOT NULL,
  [asset_cost_account] NVARCHAR(MAX) NULL,
  [accumulated_depreciation_account] NVARCHAR(MAX) NULL,
  [depreciation_expense_account] NVARCHAR(MAX) NULL,
  [gain_on_disposal_account] NVARCHAR(MAX) NULL,
  [loss_on_disposal_account] NVARCHAR(MAX) NULL,
  [impairment_loss_account] NVARCHAR(MAX) NULL,
  [revaluation_surplus_account] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_asset_category_parent_category_id] FOREIGN KEY ([parent_category_id]) REFERENCES [asset_category]([id])
);

CREATE INDEX [idx_asset_category_parent_category_id] ON [asset_category] ([parent_category_id]);

-- Table: job_activity
CREATE TABLE [job_activity] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [job_id] NVARCHAR(MAX) NOT NULL,
  [job_task_id] NVARCHAR(MAX) NULL,
  [entry_type] NVARCHAR(MAX) NOT NULL,
  [quantity] FLOAT NOT NULL,
  [unit_cost] BIGINT NOT NULL,
  [total_cost] BIGINT NOT NULL,
  [currency] NVARCHAR(MAX) NOT NULL,
  [entry_date] BIGINT NULL,
  [description] NVARCHAR(MAX) NULL,
  [billable_status] NVARCHAR(MAX) NOT NULL,
  [approval_status] NVARCHAR(MAX) NOT NULL,
  [posting_status] NVARCHAR(MAX) NOT NULL,
  [posted_by] NVARCHAR(MAX) NULL,
  [date_posted] BIGINT NULL,
  [reversal_of_id] NVARCHAR(MAX) NULL,
  [created_by] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [active] BIT NOT NULL,
  [workspace_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_job_activity_job_id] FOREIGN KEY ([job_id]) REFERENCES [job]([id]),
  CONSTRAINT [fk_job_activity_job_task_id] FOREIGN KEY ([job_task_id]) REFERENCES [job_task]([id]),
  CONSTRAINT [fk_job_activity_reversal_of_id] FOREIGN KEY ([reversal_of_id]) REFERENCES [job_activity]([id]),
  CONSTRAINT [fk_job_activity_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id])
);

CREATE INDEX [idx_job_activity_job_id] ON [job_activity] ([job_id]);
CREATE INDEX [idx_job_activity_job_task_id] ON [job_activity] ([job_task_id]);
CREATE INDEX [idx_job_activity_workspace_id] ON [job_activity] ([workspace_id]);

-- Table: event_recurrence
CREATE TABLE [event_recurrence] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [workspace_id] NVARCHAR(MAX) NOT NULL,
  [freq] NVARCHAR(MAX) NOT NULL,
  [interval] INT NOT NULL,
  [count] INT NULL,
  [until_utc] BIGINT NULL,
  [by_day] NVARCHAR(MAX) NULL,
  [by_month_day] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_event_recurrence_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id])
);

CREATE INDEX [idx_event_recurrence_workspace_id] ON [event_recurrence] ([workspace_id]);

-- Table: purchase_order
CREATE TABLE [purchase_order] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [po_number] NVARCHAR(MAX) NOT NULL UNIQUE,
  [po_type] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [supplier_id] NVARCHAR(MAX) NOT NULL,
  [location_id] NVARCHAR(MAX) NULL,
  [order_date] BIGINT NOT NULL,
  [expected_delivery_date] BIGINT NULL,
  [currency] NVARCHAR(MAX) NOT NULL,
  [subtotal] BIGINT NOT NULL,
  [tax_amount] BIGINT NOT NULL,
  [total_amount] BIGINT NOT NULL,
  [payment_terms] NVARCHAR(MAX) NULL,
  [shipping_terms] NVARCHAR(MAX) NULL,
  [approved_by] NVARCHAR(MAX) NULL,
  [approved_date] BIGINT NULL,
  [parent_po_id] NVARCHAR(MAX) NULL,
  [blanket_start_date] NVARCHAR(MAX) NULL,
  [blanket_end_date] NVARCHAR(MAX) NULL,
  [blanket_total_quantity] FLOAT NOT NULL,
  [blanket_released_quantity] FLOAT NOT NULL,
  [notes] NVARCHAR(MAX) NULL,
  [reference_number] NVARCHAR(MAX) NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [payment_term_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_purchase_order_supplier_id] FOREIGN KEY ([supplier_id]) REFERENCES [supplier]([id]),
  CONSTRAINT [fk_purchase_order_location_id] FOREIGN KEY ([location_id]) REFERENCES [location]([id]),
  CONSTRAINT [fk_purchase_order_parent_po_id] FOREIGN KEY ([parent_po_id]) REFERENCES [purchase_order]([id]),
  CONSTRAINT [fk_purchase_order_payment_term_id] FOREIGN KEY ([payment_term_id]) REFERENCES [payment_term]([id])
);

CREATE INDEX [idx_purchase_order_supplier_id] ON [purchase_order] ([supplier_id]);
CREATE INDEX [idx_purchase_order_location_id] ON [purchase_order] ([location_id]);

-- Table: purchase_order_line_item
CREATE TABLE [purchase_order_line_item] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [purchase_order_id] NVARCHAR(MAX) NOT NULL,
  [product_id] NVARCHAR(MAX) NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [line_type] NVARCHAR(MAX) NOT NULL,
  [quantity_ordered] FLOAT NOT NULL,
  [quantity_received] FLOAT NOT NULL,
  [quantity_billed] FLOAT NOT NULL,
  [unit_price] BIGINT NOT NULL,
  [total_price] BIGINT NOT NULL,
  [location_id] NVARCHAR(MAX) NULL,
  [inventory_item_id] NVARCHAR(MAX) NULL,
  [required_by_date] BIGINT NULL,
  [notes] NVARCHAR(MAX) NULL,
  [line_number] INT NOT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_purchase_order_line_item_purchase_order_id] FOREIGN KEY ([purchase_order_id]) REFERENCES [purchase_order]([id]),
  CONSTRAINT [fk_purchase_order_line_item_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id]),
  CONSTRAINT [fk_purchase_order_line_item_location_id] FOREIGN KEY ([location_id]) REFERENCES [location]([id]),
  CONSTRAINT [fk_purchase_order_line_item_inventory_item_id] FOREIGN KEY ([inventory_item_id]) REFERENCES [inventory_item]([id])
);

CREATE INDEX [idx_purchase_order_line_item_purchase_order_id] ON [purchase_order_line_item] ([purchase_order_id]);
CREATE INDEX [idx_purchase_order_line_item_product_id] ON [purchase_order_line_item] ([product_id]);

-- Table: delegate_client
CREATE TABLE [delegate_client] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [delegate_id] NVARCHAR(MAX) NOT NULL,
  [client_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_delegate_client_delegate_id] FOREIGN KEY ([delegate_id]) REFERENCES [delegate]([id]),
  CONSTRAINT [fk_delegate_client_client_id] FOREIGN KEY ([client_id]) REFERENCES [client]([id]),
  CONSTRAINT [uq_delegate_client_1] UNIQUE ([delegate_id], [client_id])
);

CREATE INDEX [idx_delegate_client_delegate_id] ON [delegate_client] ([delegate_id]);
CREATE INDEX [idx_delegate_client_client_id] ON [delegate_client] ([client_id]);

-- Table: job_outcome_summary
CREATE TABLE [job_outcome_summary] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [job_id] NVARCHAR(MAX) NOT NULL,
  [summary_type] NVARCHAR(MAX) NOT NULL,
  [overall_determination] NVARCHAR(MAX) NOT NULL,
  [scoring_method] NVARCHAR(MAX) NOT NULL,
  [summary_score] FLOAT NULL,
  [total_criteria_count] INT NOT NULL,
  [pass_count] INT NOT NULL,
  [fail_count] INT NOT NULL,
  [conditional_count] INT NOT NULL,
  [deferred_count] INT NOT NULL,
  [na_count] INT NOT NULL,
  [narrative] NVARCHAR(MAX) NULL,
  [issued_by] NVARCHAR(MAX) NOT NULL,
  [issued_date] BIGINT NULL,
  [valid_until_date] NVARCHAR(MAX) NULL,
  [supersedes_id] NVARCHAR(MAX) NULL,
  [attachment_ids] NVARCHAR(MAX) NOT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_job_outcome_summary_job_id] FOREIGN KEY ([job_id]) REFERENCES [job]([id]),
  CONSTRAINT [fk_job_outcome_summary_issued_by] FOREIGN KEY ([issued_by]) REFERENCES [staff]([id]),
  CONSTRAINT [fk_job_outcome_summary_supersedes_id] FOREIGN KEY ([supersedes_id]) REFERENCES [job_outcome_summary]([id])
);

CREATE INDEX [idx_job_outcome_summary_job_id] ON [job_outcome_summary] ([job_id]);

-- Table: fiscal_period
CREATE TABLE [fiscal_period] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [period_number] INT NOT NULL,
  [fiscal_year] INT NOT NULL,
  [start_date] NVARCHAR(MAX) NOT NULL,
  [end_date] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [closed_by] NVARCHAR(MAX) NULL,
  [closed_at] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL
);

CREATE INDEX [idx_fiscal_period_fiscal_year] ON [fiscal_period] ([fiscal_year]);

-- Table: event_product
CREATE TABLE [event_product] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [event_id] NVARCHAR(MAX) NOT NULL,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [quantity] INT NULL,
  [unit_price] BIGINT NULL,
  [currency] NVARCHAR(MAX) NULL,
  [total_price] BIGINT NULL,
  [notes] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_event_product_event_id] FOREIGN KEY ([event_id]) REFERENCES [event]([id]),
  CONSTRAINT [fk_event_product_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id]),
  CONSTRAINT [uq_event_product_1] UNIQUE ([event_id], [product_id])
);

CREATE INDEX [idx_event_product_event_id] ON [event_product] ([event_id]);
CREATE INDEX [idx_event_product_product_id] ON [event_product] ([product_id]);

-- Table: inventory_movement
CREATE TABLE [inventory_movement] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [movement_type] NVARCHAR(MAX) NOT NULL,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [quantity] FLOAT NOT NULL,
  [unit_cost] BIGINT NOT NULL,
  [from_location_id] NVARCHAR(MAX) NULL,
  [to_location_id] NVARCHAR(MAX) NULL,
  [movement_date] BIGINT NULL,
  [created_by] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [job_id] NVARCHAR(MAX) NULL,
  [job_activity_id] NVARCHAR(MAX) NULL,
  [inventory_item_id] NVARCHAR(MAX) NULL,
  [inventory_serial_id] NVARCHAR(MAX) NULL,
  [reference_type] NVARCHAR(MAX) NULL,
  [reference_id] NVARCHAR(MAX) NULL,
  [status] NVARCHAR(MAX) NULL,
  [notes] NVARCHAR(MAX) NULL,
  [performed_by] NVARCHAR(MAX) NULL,
  [active] BIT NOT NULL DEFAULT true,
  [workspace_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_inventory_movement_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id]),
  CONSTRAINT [fk_inventory_movement_from_location_id] FOREIGN KEY ([from_location_id]) REFERENCES [location]([id]),
  CONSTRAINT [fk_inventory_movement_to_location_id] FOREIGN KEY ([to_location_id]) REFERENCES [location]([id]),
  CONSTRAINT [fk_inventory_movement_job_id] FOREIGN KEY ([job_id]) REFERENCES [job]([id]),
  CONSTRAINT [fk_inventory_movement_job_activity_id] FOREIGN KEY ([job_activity_id]) REFERENCES [job_activity]([id]),
  CONSTRAINT [fk_inventory_movement_inventory_item_id] FOREIGN KEY ([inventory_item_id]) REFERENCES [inventory_item]([id]),
  CONSTRAINT [fk_inventory_movement_inventory_serial_id] FOREIGN KEY ([inventory_serial_id]) REFERENCES [inventory_serial]([id]),
  CONSTRAINT [fk_inventory_movement_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id])
);

CREATE INDEX [idx_inventory_movement_product_id] ON [inventory_movement] ([product_id]);
CREATE INDEX [idx_inventory_movement_job_id] ON [inventory_movement] ([job_id]);
CREATE INDEX [idx_inventory_movement_job_activity_id] ON [inventory_movement] ([job_activity_id]);
CREATE INDEX [idx_inventory_movement_inventory_item_id] ON [inventory_movement] ([inventory_item_id]);
CREATE INDEX [idx_inventory_movement_inventory_serial_id] ON [inventory_movement] ([inventory_serial_id]);
CREATE INDEX [idx_inventory_movement_workspace_id] ON [inventory_movement] ([workspace_id]);

-- Table: payroll_run
CREATE TABLE [payroll_run] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [run_number] NVARCHAR(MAX) NOT NULL UNIQUE,
  [pay_period_start] NVARCHAR(MAX) NOT NULL,
  [pay_period_end] NVARCHAR(MAX) NOT NULL,
  [total_gross] BIGINT NOT NULL DEFAULT 0,
  [total_deductions] BIGINT NOT NULL DEFAULT 0,
  [total_net] BIGINT NOT NULL DEFAULT 0,
  [employee_count] INT NOT NULL DEFAULT 0,
  [status] NVARCHAR(MAX) NOT NULL,
  [approved_by] NVARCHAR(MAX) NULL,
  [posted_at] BIGINT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL
);

CREATE INDEX [idx_payroll_run_run_number] ON [payroll_run] ([run_number]);

-- Table: job
CREATE TABLE [job] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [job_template_id] NVARCHAR(MAX) NULL,
  [origin_type] NVARCHAR(MAX) NOT NULL,
  [origin_id] NVARCHAR(MAX) NULL,
  [client_id] NVARCHAR(MAX) NULL,
  [demand_type] NVARCHAR(MAX) NOT NULL,
  [fulfillment_type] NVARCHAR(MAX) NOT NULL,
  [cost_flow_type] NVARCHAR(MAX) NOT NULL,
  [billing_rule_type] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [approval_status] NVARCHAR(MAX) NOT NULL,
  [posting_status] NVARCHAR(MAX) NOT NULL,
  [billing_status] NVARCHAR(MAX) NOT NULL,
  [location_id] NVARCHAR(MAX) NULL,
  [created_by] NVARCHAR(MAX) NULL,
  [workspace_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_job_job_template_id] FOREIGN KEY ([job_template_id]) REFERENCES [job_template]([id]),
  CONSTRAINT [fk_job_client_id] FOREIGN KEY ([client_id]) REFERENCES [client]([id]),
  CONSTRAINT [fk_job_location_id] FOREIGN KEY ([location_id]) REFERENCES [location]([id]),
  CONSTRAINT [fk_job_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id])
);

CREATE INDEX [idx_job_job_template_id] ON [job] ([job_template_id]);
CREATE INDEX [idx_job_client_id] ON [job] ([client_id]);
CREATE INDEX [idx_job_location_id] ON [job] ([location_id]);
CREATE INDEX [idx_job_workspace_id] ON [job] ([workspace_id]);

-- Table: invoice_attribute
CREATE TABLE [invoice_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [invoice_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_invoice_attribute_invoice_id] FOREIGN KEY ([invoice_id]) REFERENCES [invoice]([id]),
  CONSTRAINT [fk_invoice_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_invoice_attribute_1] UNIQUE ([invoice_id], [attribute_id])
);

CREATE INDEX [idx_invoice_attribute_invoice_id] ON [invoice_attribute] ([invoice_id]);
CREATE INDEX [idx_invoice_attribute_attribute_id] ON [invoice_attribute] ([attribute_id]);

-- Table: loan_payment
CREATE TABLE [loan_payment] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [loan_id] NVARCHAR(MAX) NOT NULL,
  [payment_number] NVARCHAR(MAX) NOT NULL UNIQUE,
  [payment_date] NVARCHAR(MAX) NOT NULL,
  [principal_amount] BIGINT NOT NULL,
  [interest_amount] BIGINT NOT NULL,
  [fee_amount] BIGINT NOT NULL DEFAULT 0,
  [total_amount] BIGINT NOT NULL,
  [remaining_balance] BIGINT NOT NULL,
  [notes] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  CONSTRAINT [fk_loan_payment_loan_id] FOREIGN KEY ([loan_id]) REFERENCES [loan]([id])
);

CREATE INDEX [idx_loan_payment_loan_id] ON [loan_payment] ([loan_id]);
CREATE INDEX [idx_loan_payment_payment_number] ON [loan_payment] ([payment_number]);

-- Table: workspace_user
CREATE TABLE [workspace_user] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [workspace_id] NVARCHAR(MAX) NOT NULL,
  [user_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_workspace_user_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id]),
  CONSTRAINT [fk_workspace_user_user_id] FOREIGN KEY ([user_id]) REFERENCES [user]([id]),
  CONSTRAINT [uq_workspace_user_1] UNIQUE ([workspace_id], [user_id])
);

CREATE INDEX [idx_workspace_user_workspace_id] ON [workspace_user] ([workspace_id]);
CREATE INDEX [idx_workspace_user_user_id] ON [workspace_user] ([user_id]);

-- Table: plan_attribute
CREATE TABLE [plan_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [plan_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_plan_attribute_plan_id] FOREIGN KEY ([plan_id]) REFERENCES [plan]([id]),
  CONSTRAINT [fk_plan_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_plan_attribute_1] UNIQUE ([plan_id], [attribute_id])
);

CREATE INDEX [idx_plan_attribute_plan_id] ON [plan_attribute] ([plan_id]);
CREATE INDEX [idx_plan_attribute_attribute_id] ON [plan_attribute] ([attribute_id]);

-- Table: product_attribute
CREATE TABLE [product_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [default_value] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_product_attribute_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id]),
  CONSTRAINT [fk_product_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_product_attribute_1] UNIQUE ([product_id], [attribute_id])
);

CREATE INDEX [idx_product_attribute_product_id] ON [product_attribute] ([product_id]);
CREATE INDEX [idx_product_attribute_attribute_id] ON [product_attribute] ([attribute_id]);

-- Table: equity_transaction
CREATE TABLE [equity_transaction] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [equity_account_id] NVARCHAR(MAX) NOT NULL,
  [transaction_type] NVARCHAR(MAX) NOT NULL,
  [amount] BIGINT NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [transaction_date] BIGINT NOT NULL,
  [journal_entry_id] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  CONSTRAINT [fk_equity_transaction_equity_account_id] FOREIGN KEY ([equity_account_id]) REFERENCES [equity_account]([id]),
  CONSTRAINT [fk_equity_transaction_journal_entry_id] FOREIGN KEY ([journal_entry_id]) REFERENCES [journal_entry]([id])
);

CREATE INDEX [idx_equity_transaction_equity_account_id] ON [equity_transaction] ([equity_account_id]);
CREATE INDEX [idx_equity_transaction_journal_entry_id] ON [equity_transaction] ([journal_entry_id]);

-- Table: outcome_criteria
CREATE TABLE [outcome_criteria] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [criteria_group_id] NVARCHAR(MAX) NOT NULL,
  [version] INT NOT NULL,
  [version_status] NVARCHAR(MAX) NOT NULL,
  [supersedes_id] NVARCHAR(MAX) NULL,
  [scope] NVARCHAR(MAX) NOT NULL,
  [industry_code] NVARCHAR(MAX) NULL,
  [workspace_id] NVARCHAR(MAX) NULL,
  [overrides_id] NVARCHAR(MAX) NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [criteria_type] NVARCHAR(MAX) NOT NULL,
  [unit] NVARCHAR(MAX) NULL,
  [decimal_places] INT NULL,
  [min_score] INT NULL,
  [max_score] INT NULL,
  [score_increment] FLOAT NULL,
  [pass_label] NVARCHAR(MAX) NULL,
  [fail_label] NVARCHAR(MAX) NULL,
  [max_text_length] INT NULL,
  [text_prompt] NVARCHAR(MAX) NULL,
  [pass_rule] NVARCHAR(MAX) NULL,
  [min_pass_count] INT NULL,
  [determination_mode] NVARCHAR(MAX) NOT NULL,
  [allowed_determinations] NVARCHAR(MAX) NOT NULL,
  [aggregation_method] NVARCHAR(MAX) NOT NULL,
  [aggregation_pass_pct] FLOAT NULL,
  [weight] FLOAT NOT NULL DEFAULT 1.0,
  [tags] NVARCHAR(MAX) NOT NULL,
  [required] BIT NOT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [created_by] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_outcome_criteria_supersedes_id] FOREIGN KEY ([supersedes_id]) REFERENCES [outcome_criteria]([id]),
  CONSTRAINT [fk_outcome_criteria_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id]),
  CONSTRAINT [fk_outcome_criteria_overrides_id] FOREIGN KEY ([overrides_id]) REFERENCES [outcome_criteria]([id])
);

-- Table: license_history
CREATE TABLE [license_history] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [license_id] NVARCHAR(MAX) NOT NULL,
  [action] NVARCHAR(MAX) NOT NULL,
  [assignee_id] NVARCHAR(MAX) NULL,
  [assignee_type] NVARCHAR(MAX) NULL,
  [assignee_name] NVARCHAR(MAX) NULL,
  [previous_assignee_id] NVARCHAR(MAX) NULL,
  [previous_assignee_type] NVARCHAR(MAX) NULL,
  [previous_assignee_name] NVARCHAR(MAX) NULL,
  [performed_by] NVARCHAR(MAX) NOT NULL,
  [reason] NVARCHAR(MAX) NULL,
  [notes] NVARCHAR(MAX) NULL,
  [license_status_before] NVARCHAR(MAX) NOT NULL,
  [license_status_after] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NOT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_license_history_license_id] FOREIGN KEY ([license_id]) REFERENCES [license]([id])
);

CREATE INDEX [idx_license_history_license_id] ON [license_history] ([license_id]);

-- Table: asset_revaluation
CREATE TABLE [asset_revaluation] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [asset_id] NVARCHAR(MAX) NOT NULL,
  [revaluation_date] NVARCHAR(MAX) NOT NULL,
  [previous_carrying_amount] BIGINT NOT NULL,
  [new_fair_value] BIGINT NOT NULL,
  [revaluation_amount] BIGINT NOT NULL,
  [is_increase] BIT NOT NULL,
  [recognized_in_pnl] BIGINT NOT NULL,
  [recognized_in_oci] BIGINT NOT NULL,
  [revaluation_surplus_balance] BIGINT NOT NULL,
  [appraiser_name] NVARCHAR(MAX) NULL,
  [valuation_method] NVARCHAR(MAX) NULL,
  [journal_entry_id] NVARCHAR(MAX) NULL,
  [notes] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_asset_revaluation_asset_id] FOREIGN KEY ([asset_id]) REFERENCES [asset]([id])
);

CREATE INDEX [idx_asset_revaluation_asset_id] ON [asset_revaluation] ([asset_id]);

-- Table: activity_labor
CREATE TABLE [activity_labor] (
  [activity_id] NVARCHAR(MAX) NOT NULL,
  [staff_id] NVARCHAR(MAX) NOT NULL,
  [hours] FLOAT NOT NULL,
  [rate_type] NVARCHAR(MAX) NOT NULL,
  [time_start] BIGINT NULL,
  [time_end] BIGINT NULL,
  CONSTRAINT [fk_activity_labor_activity_id] FOREIGN KEY ([activity_id]) REFERENCES [job_activity]([id]),
  CONSTRAINT [fk_activity_labor_staff_id] FOREIGN KEY ([staff_id]) REFERENCES [staff]([id])
);

CREATE INDEX [idx_activity_labor_staff_id] ON [activity_labor] ([staff_id]);

-- Table: staff_attribute
CREATE TABLE [staff_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [staff_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_staff_attribute_staff_id] FOREIGN KEY ([staff_id]) REFERENCES [staff]([id]),
  CONSTRAINT [fk_staff_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_staff_attribute_1] UNIQUE ([staff_id], [attribute_id])
);

CREATE INDEX [idx_staff_attribute_staff_id] ON [staff_attribute] ([staff_id]);
CREATE INDEX [idx_staff_attribute_attribute_id] ON [staff_attribute] ([attribute_id]);

-- Table: product_plan
CREATE TABLE [product_plan] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [price] BIGINT NOT NULL,
  [currency] NVARCHAR(MAX) NOT NULL,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [plan_id] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_product_plan_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id]),
  CONSTRAINT [fk_product_plan_plan_id] FOREIGN KEY ([plan_id]) REFERENCES [plan]([id])
);

CREATE INDEX [idx_product_plan_product_id] ON [product_plan] ([product_id]);
CREATE INDEX [idx_product_plan_plan_id] ON [product_plan] ([plan_id]);

-- Table: task_outcome
CREATE TABLE [task_outcome] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [job_task_id] NVARCHAR(MAX) NOT NULL,
  [criteria_version_id] NVARCHAR(MAX) NOT NULL,
  [criteria_type] NVARCHAR(MAX) NOT NULL,
  [is_ad_hoc] BIT NOT NULL,
  [numeric_value] FLOAT NULL,
  [text_value] NVARCHAR(MAX) NULL,
  [categorical_value] NVARCHAR(MAX) NULL,
  [pass_fail_value] BIT NULL,
  [determination] NVARCHAR(MAX) NOT NULL,
  [determination_source] NVARCHAR(MAX) NOT NULL,
  [determination_note] NVARCHAR(MAX) NULL,
  [auto_proposed_determination] NVARCHAR(MAX) NULL,
  [recorded_by] NVARCHAR(MAX) NOT NULL,
  [recorded_date] BIGINT NULL,
  [recorded_by_name] NVARCHAR(MAX) NULL,
  [reviewed_by] NVARCHAR(MAX) NULL,
  [reviewed_date] BIGINT NULL,
  [attachment_ids] NVARCHAR(MAX) NOT NULL,
  [revision_of_id] NVARCHAR(MAX) NULL,
  [revision_number] INT NOT NULL DEFAULT 1,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_task_outcome_job_task_id] FOREIGN KEY ([job_task_id]) REFERENCES [job_task]([id]),
  CONSTRAINT [fk_task_outcome_criteria_version_id] FOREIGN KEY ([criteria_version_id]) REFERENCES [outcome_criteria]([id]),
  CONSTRAINT [fk_task_outcome_recorded_by] FOREIGN KEY ([recorded_by]) REFERENCES [staff]([id]),
  CONSTRAINT [fk_task_outcome_reviewed_by] FOREIGN KEY ([reviewed_by]) REFERENCES [staff]([id]),
  CONSTRAINT [fk_task_outcome_revision_of_id] FOREIGN KEY ([revision_of_id]) REFERENCES [task_outcome]([id])
);

CREATE INDEX [idx_task_outcome_job_task_id] ON [task_outcome] ([job_task_id]);
CREATE INDEX [idx_task_outcome_criteria_version_id] ON [task_outcome] ([criteria_version_id]);

-- Table: delegate_attribute
CREATE TABLE [delegate_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [delegate_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_delegate_attribute_delegate_id] FOREIGN KEY ([delegate_id]) REFERENCES [delegate]([id]),
  CONSTRAINT [fk_delegate_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_delegate_attribute_1] UNIQUE ([delegate_id], [attribute_id])
);

CREATE INDEX [idx_delegate_attribute_delegate_id] ON [delegate_attribute] ([delegate_id]);
CREATE INDEX [idx_delegate_attribute_attribute_id] ON [delegate_attribute] ([attribute_id]);

-- Table: workspace_user_role
CREATE TABLE [workspace_user_role] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [workspace_user_id] NVARCHAR(MAX) NOT NULL,
  [role_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_workspace_user_role_workspace_user_id] FOREIGN KEY ([workspace_user_id]) REFERENCES [workspace_user]([id]),
  CONSTRAINT [fk_workspace_user_role_role_id] FOREIGN KEY ([role_id]) REFERENCES [role]([id]),
  CONSTRAINT [uq_workspace_user_role_1] UNIQUE ([workspace_user_id], [role_id])
);

CREATE INDEX [idx_workspace_user_role_workspace_user_id] ON [workspace_user_role] ([workspace_user_id]);
CREATE INDEX [idx_workspace_user_role_role_id] ON [workspace_user_role] ([role_id]);

-- Table: petty_cash_fund
CREATE TABLE [petty_cash_fund] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [authorized_amount] BIGINT NOT NULL,
  [current_balance] BIGINT NOT NULL DEFAULT 0,
  [custodian_id] NVARCHAR(MAX) NULL,
  [location_id] NVARCHAR(MAX) NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_petty_cash_fund_location_id] FOREIGN KEY ([location_id]) REFERENCES [location]([id])
);

CREATE INDEX [idx_petty_cash_fund_custodian_id] ON [petty_cash_fund] ([custodian_id]);
CREATE INDEX [idx_petty_cash_fund_location_id] ON [petty_cash_fund] ([location_id]);

-- Table: subscription
CREATE TABLE [subscription] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [price_plan_id] NVARCHAR(MAX) NOT NULL,
  [client_id] NVARCHAR(MAX) NOT NULL,
  [date_start] NVARCHAR(MAX) NULL,
  [date_end] NVARCHAR(MAX) NULL,
  [quantity] INT NULL,
  [assigned_count] INT NULL,
  [available_count] INT NULL,
  [default_license_type] NVARCHAR(MAX) NULL,
  [auto_assign] BIT NULL,
  [code] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_subscription_price_plan_id] FOREIGN KEY ([price_plan_id]) REFERENCES [price_plan]([id]),
  CONSTRAINT [fk_subscription_client_id] FOREIGN KEY ([client_id]) REFERENCES [client]([id])
);

CREATE INDEX [idx_subscription_price_plan_id] ON [subscription] ([price_plan_id]);
CREATE INDEX [idx_subscription_client_id] ON [subscription] ([client_id]);

-- Table: activity_template
CREATE TABLE [activity_template] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [stage_template_id] NVARCHAR(MAX) NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [activity_type] NVARCHAR(MAX) NOT NULL,
  [order_index] INT NULL,
  [is_required] BIT NULL,
  [condition_expression] NVARCHAR(MAX) NULL,
  [assignee_type] NVARCHAR(MAX) NULL,
  [default_assignee_id] NVARCHAR(MAX) NULL,
  [estimated_duration_minutes] INT NULL,
  [configuration_json] NVARCHAR(MAX) NULL,
  [validation_rules_json] NVARCHAR(MAX) NULL,
  [created_by] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [input_schema_json] NVARCHAR(MAX) NULL,
  [output_schema_json] NVARCHAR(MAX) NULL,
  [use_case_code] NVARCHAR(MAX) NULL,
  [rollback_use_case_code] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_activity_template_stage_template_id] FOREIGN KEY ([stage_template_id]) REFERENCES [stage_template]([id])
);

CREATE INDEX [idx_activity_template_stage_template_id] ON [activity_template] ([stage_template_id]);

-- Table: asset_component
CREATE TABLE [asset_component] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [asset_id] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [cost] BIGINT NOT NULL,
  [salvage_value] BIGINT NOT NULL,
  [useful_life_months] INT NOT NULL,
  [depreciation_method] NVARCHAR(MAX) NOT NULL,
  [accumulated_depreciation] BIGINT NOT NULL,
  [book_value] BIGINT NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_asset_component_asset_id] FOREIGN KEY ([asset_id]) REFERENCES [asset]([id])
);

CREATE INDEX [idx_asset_component_asset_id] ON [asset_component] ([asset_id]);

-- Table: collection_attribute
CREATE TABLE [collection_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [collection_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_collection_attribute_collection_id] FOREIGN KEY ([collection_id]) REFERENCES [collection]([id]),
  CONSTRAINT [fk_collection_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_collection_attribute_1] UNIQUE ([collection_id], [attribute_id])
);

CREATE INDEX [idx_collection_attribute_collection_id] ON [collection_attribute] ([collection_id]);
CREATE INDEX [idx_collection_attribute_attribute_id] ON [collection_attribute] ([attribute_id]);

-- Table: task_outcome_check
CREATE TABLE [task_outcome_check] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [task_outcome_id] NVARCHAR(MAX) NOT NULL,
  [criteria_option_id] NVARCHAR(MAX) NOT NULL,
  [checked] BIT NOT NULL,
  [note] NVARCHAR(MAX) NULL,
  [date_created] BIGINT NULL,
  CONSTRAINT [fk_task_outcome_check_task_outcome_id] FOREIGN KEY ([task_outcome_id]) REFERENCES [task_outcome]([id]),
  CONSTRAINT [fk_task_outcome_check_criteria_option_id] FOREIGN KEY ([criteria_option_id]) REFERENCES [criteria_option]([id])
);

CREATE INDEX [idx_task_outcome_check_task_outcome_id] ON [task_outcome_check] ([task_outcome_id]);
CREATE INDEX [idx_task_outcome_check_criteria_option_id] ON [task_outcome_check] ([criteria_option_id]);

-- Table: invoice
CREATE TABLE [invoice] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [invoice_number] NVARCHAR(MAX) NOT NULL,
  [amount] BIGINT NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [subscription_id] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_invoice_subscription_id] FOREIGN KEY ([subscription_id]) REFERENCES [subscription]([id])
);

CREATE INDEX [idx_invoice_subscription_id] ON [invoice] ([subscription_id]);

-- Table: collection_parent
CREATE TABLE [collection_parent] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [collection_parent_id] NVARCHAR(MAX) NOT NULL,
  [collection_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_collection_parent_collection_parent_id] FOREIGN KEY ([collection_parent_id]) REFERENCES [collection]([id]),
  CONSTRAINT [fk_collection_parent_collection_id] FOREIGN KEY ([collection_id]) REFERENCES [collection]([id]),
  CONSTRAINT [uq_collection_parent_1] UNIQUE ([collection_parent_id], [collection_id])
);

CREATE INDEX [idx_collection_parent_collection_parent_id] ON [collection_parent] ([collection_parent_id]);
CREATE INDEX [idx_collection_parent_collection_id] ON [collection_parent] ([collection_id]);

-- Table: job_template
CREATE TABLE [job_template] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [default_fulfillment_type] NVARCHAR(MAX) NULL,
  [default_cost_flow_type] NVARCHAR(MAX) NULL,
  [default_billing_rule_type] NVARCHAR(MAX) NULL,
  [workspace_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_job_template_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id])
);

CREATE INDEX [idx_job_template_workspace_id] ON [job_template] ([workspace_id]);

-- Table: fulfillment_item
CREATE TABLE [fulfillment_item] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [fulfillment_id] NVARCHAR(MAX) NOT NULL,
  [revenue_line_item_id] NVARCHAR(MAX) NOT NULL,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [fulfillment_method] NVARCHAR(MAX) NOT NULL,
  [source_type] NVARCHAR(MAX) NULL,
  [source_id] NVARCHAR(MAX) NULL,
  [quantity_ordered] FLOAT NOT NULL,
  [quantity_delivered] FLOAT NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  [notes] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  CONSTRAINT [fk_fulfillment_item_fulfillment_id] FOREIGN KEY ([fulfillment_id]) REFERENCES [fulfillment]([id]),
  CONSTRAINT [fk_fulfillment_item_revenue_line_item_id] FOREIGN KEY ([revenue_line_item_id]) REFERENCES [revenue_line_item]([id]),
  CONSTRAINT [fk_fulfillment_item_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id])
);

CREATE INDEX [idx_fulfillment_item_fulfillment_id] ON [fulfillment_item] ([fulfillment_id]);

-- Table: inventory_depreciation
CREATE TABLE [inventory_depreciation] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [inventory_item_id] NVARCHAR(MAX) NOT NULL,
  [method] NVARCHAR(MAX) NOT NULL,
  [cost_basis] BIGINT NOT NULL,
  [salvage_value] BIGINT NOT NULL,
  [useful_life_months] INT NOT NULL,
  [start_date] NVARCHAR(MAX) NOT NULL,
  [accumulated_depreciation] BIGINT NOT NULL,
  [book_value] BIGINT NOT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_inventory_depreciation_inventory_item_id] FOREIGN KEY ([inventory_item_id]) REFERENCES [inventory_item]([id])
);

CREATE INDEX [idx_inventory_depreciation_inventory_item_id] ON [inventory_depreciation] ([inventory_item_id]);

-- Table: line
CREATE TABLE [line] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true
);
