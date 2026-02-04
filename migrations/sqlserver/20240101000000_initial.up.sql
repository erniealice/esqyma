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

-- Table: client
CREATE TABLE [client] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [user_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [internal_id] NVARCHAR(MAX) NOT NULL UNIQUE,
  [category_id] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_client_user_id] FOREIGN KEY ([user_id]) REFERENCES [user]([id]),
  CONSTRAINT [fk_client_category_id] FOREIGN KEY ([category_id]) REFERENCES [client_category]([id])
);

CREATE INDEX [idx_client_user_id] ON [client] ([user_id]);

-- Table: event_product
CREATE TABLE [event_product] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [event_id] NVARCHAR(MAX) NOT NULL,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [quantity] INT NULL,
  [unit_price] FLOAT NULL,
  [currency] NVARCHAR(MAX) NULL,
  [total_price] FLOAT NULL,
  [notes] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_event_product_event_id] FOREIGN KEY ([event_id]) REFERENCES [event]([id]),
  CONSTRAINT [fk_event_product_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id]),
  CONSTRAINT [uq_event_product_1] UNIQUE ([event_id], [product_id])
);

CREATE INDEX [idx_event_product_event_id] ON [event_product] ([event_id]);
CREATE INDEX [idx_event_product_product_id] ON [event_product] ([product_id]);

-- Table: event_settings
CREATE TABLE [event_settings] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [event_id] NVARCHAR(MAX) NOT NULL,
  [start_date_time_utc] BIGINT NOT NULL,
  [end_date_time_utc] BIGINT NOT NULL,
  [timezone] NVARCHAR(MAX) NOT NULL,
  [event_recurrence_id] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_event_settings_event_id] FOREIGN KEY ([event_id]) REFERENCES [event]([id]),
  CONSTRAINT [fk_event_settings_event_recurrence_id] FOREIGN KEY ([event_recurrence_id]) REFERENCES [event_recurrence]([id])
);

CREATE INDEX [idx_event_settings_event_id] ON [event_settings] ([event_id]);
CREATE INDEX [idx_event_settings_event_recurrence_id] ON [event_settings] ([event_recurrence_id]);

-- Table: price_plan
CREATE TABLE [price_plan] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [plan_id] NVARCHAR(MAX) NOT NULL,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [amount] FLOAT NOT NULL,
  [currency] NVARCHAR(MAX) NOT NULL,
  [duration_value] INT NOT NULL,
  [duration_unit] NVARCHAR(MAX) NOT NULL,
  [confirmation_template] NVARCHAR(MAX) NULL,
  [receipt_template] NVARCHAR(MAX) NULL,
  CONSTRAINT [fk_price_plan_plan_id] FOREIGN KEY ([plan_id]) REFERENCES [plan]([id])
);

CREATE INDEX [idx_price_plan_plan_id] ON [price_plan] ([plan_id]);

-- Table: payment
CREATE TABLE [payment] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [subscription_id] NVARCHAR(MAX) NOT NULL,
  [amount] FLOAT NOT NULL,
  [status] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_payment_subscription_id] FOREIGN KEY ([subscription_id]) REFERENCES [subscription]([id])
);

CREATE INDEX [idx_payment_subscription_id] ON [payment] ([subscription_id]);

-- Table: payment_profile
CREATE TABLE [payment_profile] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [client_id] NVARCHAR(MAX) NOT NULL,
  [payment_method_id] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_payment_profile_client_id] FOREIGN KEY ([client_id]) REFERENCES [client]([id]),
  CONSTRAINT [fk_payment_profile_payment_method_id] FOREIGN KEY ([payment_method_id]) REFERENCES [payment_method]([id])
);

CREATE INDEX [idx_payment_profile_client_id] ON [payment_profile] ([client_id]);
CREATE INDEX [idx_payment_profile_payment_method_id] ON [payment_profile] ([payment_method_id]);

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
  CONSTRAINT [fk_permission_workspace_id] FOREIGN KEY ([workspace_id]) REFERENCES [workspace]([id]),
  CONSTRAINT [fk_permission_user_id] FOREIGN KEY ([user_id]) REFERENCES [user]([id]),
  CONSTRAINT [fk_permission_granted_by_user_id] FOREIGN KEY ([granted_by_user_id]) REFERENCES [user]([id])
);

CREATE INDEX [idx_permission_workspace_id] ON [permission] ([workspace_id]);
CREATE INDEX [idx_permission_user_id] ON [permission] ([user_id]);
CREATE INDEX [idx_permission_granted_by_user_id] ON [permission] ([granted_by_user_id]);

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

-- Table: group
CREATE TABLE [group] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true
);

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

-- Table: product
CREATE TABLE [product] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [price] FLOAT NOT NULL,
  [currency] NVARCHAR(MAX) NOT NULL
);

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
  [date_start] BIGINT NOT NULL,
  [date_end] BIGINT NULL,
  CONSTRAINT [fk_price_product_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id])
);

CREATE INDEX [idx_price_product_product_id] ON [price_product] ([product_id]);

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
  [timezone] NVARCHAR(MAX) NOT NULL
);

-- Table: product_attribute
CREATE TABLE [product_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [product_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  CONSTRAINT [fk_product_attribute_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id]),
  CONSTRAINT [fk_product_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_product_attribute_1] UNIQUE ([product_id], [attribute_id])
);

CREATE INDEX [idx_product_attribute_product_id] ON [product_attribute] ([product_id]);
CREATE INDEX [idx_product_attribute_attribute_id] ON [product_attribute] ([attribute_id]);

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

-- Table: user
CREATE TABLE [user] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [first_name] NVARCHAR(MAX) NOT NULL,
  [last_name] NVARCHAR(MAX) NOT NULL,
  [email_address] NVARCHAR(MAX) NOT NULL UNIQUE,
  [mobile_number] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true
);

CREATE INDEX [idx_user_mobile_number] ON [user] ([mobile_number]);

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

-- Table: subscription
CREATE TABLE [subscription] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [price_plan_id] NVARCHAR(MAX) NOT NULL,
  [client_id] NVARCHAR(MAX) NOT NULL,
  [date_start] BIGINT NULL,
  [date_end] BIGINT NULL,
  [quantity] INT NULL,
  [assigned_count] INT NULL,
  [available_count] INT NULL,
  [default_license_type] NVARCHAR(MAX) NULL,
  [auto_assign] BIT NULL,
  CONSTRAINT [fk_subscription_price_plan_id] FOREIGN KEY ([price_plan_id]) REFERENCES [price_plan]([id]),
  CONSTRAINT [fk_subscription_client_id] FOREIGN KEY ([client_id]) REFERENCES [client]([id])
);

CREATE INDEX [idx_subscription_price_plan_id] ON [subscription] ([price_plan_id]);
CREATE INDEX [idx_subscription_client_id] ON [subscription] ([client_id]);

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

-- Table: payment_method
CREATE TABLE [payment_method] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [provider_name] NVARCHAR(MAX) NULL
);

-- Table: product_plan
CREATE TABLE [product_plan] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NULL,
  [price] FLOAT NOT NULL,
  [currency] NVARCHAR(MAX) NOT NULL,
  [product_id] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_product_plan_product_id] FOREIGN KEY ([product_id]) REFERENCES [product]([id])
);

CREATE INDEX [idx_product_plan_product_id] ON [product_plan] ([product_id]);

-- Table: balance
CREATE TABLE [balance] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [amount] FLOAT NOT NULL,
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

-- Table: payment_attribute
CREATE TABLE [payment_attribute] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [payment_id] NVARCHAR(MAX) NOT NULL,
  [attribute_id] NVARCHAR(MAX) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  CONSTRAINT [fk_payment_attribute_payment_id] FOREIGN KEY ([payment_id]) REFERENCES [payment]([id]),
  CONSTRAINT [fk_payment_attribute_attribute_id] FOREIGN KEY ([attribute_id]) REFERENCES [attribute]([id]),
  CONSTRAINT [uq_payment_attribute_1] UNIQUE ([payment_id], [attribute_id])
);

CREATE INDEX [idx_payment_attribute_payment_id] ON [payment_attribute] ([payment_id]);
CREATE INDEX [idx_payment_attribute_attribute_id] ON [payment_attribute] ([attribute_id]);

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

-- Table: collection
CREATE TABLE [collection] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true
);

-- Table: location
CREATE TABLE [location] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [name] NVARCHAR(MAX) NOT NULL,
  [address] NVARCHAR(MAX) NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [description] NVARCHAR(MAX) NULL
);

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

-- Table: payment_profile_payment_method
CREATE TABLE [payment_profile_payment_method] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [payment_profile_id] NVARCHAR(MAX) NOT NULL,
  [payment_method_id] NVARCHAR(MAX) NOT NULL,
  [primary] BIT NOT NULL,
  [notes] NVARCHAR(MAX) NULL,
  [display_order] INT NULL,
  [payment_identifier] NVARCHAR(MAX) NOT NULL,
  [identifier_type] NVARCHAR(MAX) NOT NULL,
  [display_name] NVARCHAR(MAX) NULL,
  [masked] BIT NOT NULL,
  CONSTRAINT [fk_payment_profile_payment_method_payment_profile_id] FOREIGN KEY ([payment_profile_id]) REFERENCES [payment_profile]([id]),
  CONSTRAINT [fk_payment_profile_payment_method_payment_method_id] FOREIGN KEY ([payment_method_id]) REFERENCES [payment_method]([id]),
  CONSTRAINT [uq_payment_profile_payment_method_1] UNIQUE ([payment_profile_id], [payment_method_id])
);

CREATE INDEX [idx_payment_profile_payment_method_payment_profile_id] ON [payment_profile_payment_method] ([payment_profile_id]);
CREATE INDEX [idx_payment_profile_payment_method_payment_method_id] ON [payment_profile_payment_method] ([payment_method_id]);

-- Table: invoice
CREATE TABLE [invoice] (
  [id] NVARCHAR(MAX) PRIMARY KEY,
  [invoice_number] NVARCHAR(MAX) NOT NULL,
  [amount] FLOAT NOT NULL,
  [date_created] BIGINT NULL,
  [date_modified] BIGINT NULL,
  [active] BIT NOT NULL DEFAULT true,
  [subscription_id] NVARCHAR(MAX) NOT NULL,
  CONSTRAINT [fk_invoice_subscription_id] FOREIGN KEY ([subscription_id]) REFERENCES [subscription]([id])
);

CREATE INDEX [idx_invoice_subscription_id] ON [invoice] ([subscription_id]);

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
