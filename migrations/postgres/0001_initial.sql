-- Table: asset_location
CREATE TABLE "asset_location" (
  "id" TEXT PRIMARY KEY,
  "asset_id" TEXT NOT NULL,
  "location_id" TEXT NOT NULL,
  "is_primary" BOOLEAN NOT NULL,
  "assignment_type" TEXT NOT NULL,
  "date_assigned" BIGINT NULL,
  "date_unassigned" BIGINT NULL,
  "notes" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_asset_location_asset_id" FOREIGN KEY ("asset_id") REFERENCES "asset"("id"),
  CONSTRAINT "fk_asset_location_location_id" FOREIGN KEY ("location_id") REFERENCES "location"("id"),
  CONSTRAINT "uq_asset_location_1" UNIQUE ("asset_id", "location_id")
);

CREATE INDEX "idx_asset_location_asset_id" ON "asset_location" ("asset_id");
CREATE INDEX "idx_asset_location_location_id" ON "asset_location" ("location_id");

-- Table: activity_expense
CREATE TABLE "activity_expense" (
  "activity_id" TEXT NOT NULL,
  "expense_category" TEXT NOT NULL,
  "vendor_ref" TEXT NULL,
  "receipt_url" TEXT NULL,
  "reimbursable" BOOLEAN NOT NULL,
  CONSTRAINT "fk_activity_expense_activity_id" FOREIGN KEY ("activity_id") REFERENCES "job_activity"("id")
);

-- Table: product_option_value
CREATE TABLE "product_option_value" (
  "id" TEXT PRIMARY KEY,
  "product_option_id" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_product_option_value_product_option_id" FOREIGN KEY ("product_option_id") REFERENCES "product_option"("id"),
  CONSTRAINT "uq_product_option_value_1" UNIQUE ("product_option_id", "value")
);

CREATE INDEX "idx_product_option_value_product_option_id" ON "product_option_value" ("product_option_id");

-- Table: invoice
CREATE TABLE "invoice" (
  "id" TEXT PRIMARY KEY,
  "invoice_number" TEXT NOT NULL,
  "amount" DOUBLE PRECISION NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "subscription_id" TEXT NOT NULL,
  CONSTRAINT "fk_invoice_subscription_id" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id")
);

CREATE INDEX "idx_invoice_subscription_id" ON "invoice" ("subscription_id");

-- Table: product_variant_option
CREATE TABLE "product_variant_option" (
  "id" TEXT PRIMARY KEY,
  "product_variant_id" TEXT NOT NULL,
  "product_option_value_id" TEXT NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_product_variant_option_product_variant_id" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id"),
  CONSTRAINT "fk_product_variant_option_product_option_value_id" FOREIGN KEY ("product_option_value_id") REFERENCES "product_option_value"("id"),
  CONSTRAINT "uq_product_variant_option_1" UNIQUE ("product_variant_id", "product_option_value_id")
);

CREATE INDEX "idx_product_variant_option_product_variant_id" ON "product_variant_option" ("product_variant_id");
CREATE INDEX "idx_product_variant_option_product_option_value_id" ON "product_variant_option" ("product_option_value_id");

-- Table: plan_settings
CREATE TABLE "plan_settings" (
  "id" TEXT PRIMARY KEY,
  "plan_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_plan_settings_plan_id" FOREIGN KEY ("plan_id") REFERENCES "plan"("id")
);

CREATE INDEX "idx_plan_settings_plan_id" ON "plan_settings" ("plan_id");

-- Table: collection_parent
CREATE TABLE "collection_parent" (
  "id" TEXT PRIMARY KEY,
  "collection_parent_id" TEXT NOT NULL,
  "collection_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_collection_parent_collection_parent_id" FOREIGN KEY ("collection_parent_id") REFERENCES "collection"("id"),
  CONSTRAINT "fk_collection_parent_collection_id" FOREIGN KEY ("collection_id") REFERENCES "collection"("id"),
  CONSTRAINT "uq_collection_parent_1" UNIQUE ("collection_parent_id", "collection_id")
);

CREATE INDEX "idx_collection_parent_collection_parent_id" ON "collection_parent" ("collection_parent_id");
CREATE INDEX "idx_collection_parent_collection_id" ON "collection_parent" ("collection_id");

-- Table: attachment
CREATE TABLE "attachment" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "module_key" TEXT NOT NULL,
  "foreign_key" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "workspace_id" TEXT NULL,
  "storage_container" TEXT NULL,
  "storage_key" TEXT NULL,
  "content_type" TEXT NULL,
  "file_size_bytes" BIGINT NULL,
  "created_by" TEXT NULL,
  "status" TEXT NOT NULL DEFAULT 'active'
);

CREATE INDEX "idx_attachment_module_key" ON "attachment" ("module_key");
CREATE INDEX "idx_attachment_foreign_key" ON "attachment" ("foreign_key");

-- Table: event_recurrence
CREATE TABLE "event_recurrence" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "recurrence_pattern" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true
);

-- Table: activity_execution_log
CREATE TABLE "activity_execution_log" (
  "id" TEXT PRIMARY KEY,
  "workflow_id" TEXT NOT NULL,
  "activity_id" TEXT NOT NULL,
  "activity_template_id" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "start_time" TEXT NOT NULL,
  "end_time" TEXT NOT NULL,
  "input_snapshot_json" TEXT NOT NULL,
  "output_snapshot_json" TEXT NOT NULL,
  "error_message" TEXT NOT NULL,
  "created_by" TEXT NOT NULL,
  "date_created" BIGINT NOT NULL,
  "date_modified" BIGINT NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "workspace_id" TEXT NOT NULL,
  CONSTRAINT "fk_activity_execution_log_workflow_id" FOREIGN KEY ("workflow_id") REFERENCES "workflow"("id"),
  CONSTRAINT "fk_activity_execution_log_activity_id" FOREIGN KEY ("activity_id") REFERENCES "activity"("id"),
  CONSTRAINT "fk_activity_execution_log_activity_template_id" FOREIGN KEY ("activity_template_id") REFERENCES "activity_template"("id"),
  CONSTRAINT "fk_activity_execution_log_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);

CREATE INDEX "idx_activity_execution_log_workflow_id" ON "activity_execution_log" ("workflow_id");
CREATE INDEX "idx_activity_execution_log_activity_id" ON "activity_execution_log" ("activity_id");
CREATE INDEX "idx_activity_execution_log_activity_template_id" ON "activity_execution_log" ("activity_template_id");
CREATE INDEX "idx_activity_execution_log_workspace_id" ON "activity_execution_log" ("workspace_id");

-- Table: admin
CREATE TABLE "admin" (
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_admin_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id")
);

CREATE INDEX "idx_admin_user_id" ON "admin" ("user_id");

-- Table: inventory_movement
CREATE TABLE "inventory_movement" (
  "id" TEXT PRIMARY KEY,
  "movement_type" TEXT NOT NULL,
  "product_id" TEXT NOT NULL,
  "quantity" DOUBLE PRECISION NOT NULL,
  "unit_cost" DOUBLE PRECISION NOT NULL,
  "from_location_id" TEXT NULL,
  "to_location_id" TEXT NULL,
  "movement_date" BIGINT NULL,
  "created_by" TEXT NULL,
  "date_created" BIGINT NULL,
  "job_id" TEXT NULL,
  "job_activity_id" TEXT NULL,
  "inventory_item_id" TEXT NULL,
  "inventory_serial_id" TEXT NULL,
  "reference_type" TEXT NULL,
  "reference_id" TEXT NULL,
  "status" TEXT NULL,
  "notes" TEXT NULL,
  "performed_by" TEXT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "workspace_id" TEXT NULL,
  CONSTRAINT "fk_inventory_movement_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id"),
  CONSTRAINT "fk_inventory_movement_from_location_id" FOREIGN KEY ("from_location_id") REFERENCES "location"("id"),
  CONSTRAINT "fk_inventory_movement_to_location_id" FOREIGN KEY ("to_location_id") REFERENCES "location"("id"),
  CONSTRAINT "fk_inventory_movement_job_id" FOREIGN KEY ("job_id") REFERENCES "job"("id"),
  CONSTRAINT "fk_inventory_movement_job_activity_id" FOREIGN KEY ("job_activity_id") REFERENCES "job_activity"("id"),
  CONSTRAINT "fk_inventory_movement_inventory_item_id" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item"("id"),
  CONSTRAINT "fk_inventory_movement_inventory_serial_id" FOREIGN KEY ("inventory_serial_id") REFERENCES "inventory_serial"("id"),
  CONSTRAINT "fk_inventory_movement_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);

CREATE INDEX "idx_inventory_movement_product_id" ON "inventory_movement" ("product_id");
CREATE INDEX "idx_inventory_movement_job_id" ON "inventory_movement" ("job_id");
CREATE INDEX "idx_inventory_movement_job_activity_id" ON "inventory_movement" ("job_activity_id");
CREATE INDEX "idx_inventory_movement_inventory_item_id" ON "inventory_movement" ("inventory_item_id");
CREATE INDEX "idx_inventory_movement_inventory_serial_id" ON "inventory_movement" ("inventory_serial_id");
CREATE INDEX "idx_inventory_movement_workspace_id" ON "inventory_movement" ("workspace_id");

-- Table: balance
CREATE TABLE "balance" (
  "id" TEXT PRIMARY KEY,
  "amount" DOUBLE PRECISION NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "client_id" TEXT NOT NULL,
  "subscription_id" TEXT NOT NULL,
  "currency" TEXT NOT NULL,
  "balance_type" TEXT NOT NULL,
  CONSTRAINT "fk_balance_client_id" FOREIGN KEY ("client_id") REFERENCES "client"("id"),
  CONSTRAINT "fk_balance_subscription_id" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id")
);

CREATE INDEX "idx_balance_client_id" ON "balance" ("client_id");
CREATE INDEX "idx_balance_subscription_id" ON "balance" ("subscription_id");

-- Table: job_activity
CREATE TABLE "job_activity" (
  "id" TEXT PRIMARY KEY,
  "job_id" TEXT NOT NULL,
  "job_task_id" TEXT NULL,
  "entry_type" TEXT NOT NULL,
  "quantity" DOUBLE PRECISION NOT NULL,
  "unit_cost" DOUBLE PRECISION NOT NULL,
  "total_cost" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL,
  "entry_date" BIGINT NULL,
  "description" TEXT NULL,
  "billable_status" TEXT NOT NULL,
  "approval_status" TEXT NOT NULL,
  "posting_status" TEXT NOT NULL,
  "posted_by" TEXT NULL,
  "date_posted" BIGINT NULL,
  "reversal_of_id" TEXT NULL,
  "created_by" TEXT NULL,
  "date_created" BIGINT NULL,
  "active" BOOLEAN NOT NULL,
  "workspace_id" TEXT NULL,
  CONSTRAINT "fk_job_activity_job_id" FOREIGN KEY ("job_id") REFERENCES "job"("id"),
  CONSTRAINT "fk_job_activity_job_task_id" FOREIGN KEY ("job_task_id") REFERENCES "job_task"("id"),
  CONSTRAINT "fk_job_activity_reversal_of_id" FOREIGN KEY ("reversal_of_id") REFERENCES "job_activity"("id"),
  CONSTRAINT "fk_job_activity_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);

CREATE INDEX "idx_job_activity_job_id" ON "job_activity" ("job_id");
CREATE INDEX "idx_job_activity_job_task_id" ON "job_activity" ("job_task_id");
CREATE INDEX "idx_job_activity_workspace_id" ON "job_activity" ("workspace_id");

-- Table: delegate_attribute
CREATE TABLE "delegate_attribute" (
  "id" TEXT PRIMARY KEY,
  "delegate_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_delegate_attribute_delegate_id" FOREIGN KEY ("delegate_id") REFERENCES "delegate"("id"),
  CONSTRAINT "fk_delegate_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_delegate_attribute_1" UNIQUE ("delegate_id", "attribute_id")
);

CREATE INDEX "idx_delegate_attribute_delegate_id" ON "delegate_attribute" ("delegate_id");
CREATE INDEX "idx_delegate_attribute_attribute_id" ON "delegate_attribute" ("attribute_id");

-- Table: subscription
CREATE TABLE "subscription" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "price_plan_id" TEXT NOT NULL,
  "client_id" TEXT NOT NULL,
  "date_start" BIGINT NULL,
  "date_end" BIGINT NULL,
  "quantity" INTEGER NULL,
  "assigned_count" INTEGER NULL,
  "available_count" INTEGER NULL,
  "default_license_type" TEXT NULL,
  "auto_assign" BOOLEAN NULL,
  CONSTRAINT "fk_subscription_price_plan_id" FOREIGN KEY ("price_plan_id") REFERENCES "price_plan"("id"),
  CONSTRAINT "fk_subscription_client_id" FOREIGN KEY ("client_id") REFERENCES "client"("id")
);

CREATE INDEX "idx_subscription_price_plan_id" ON "subscription" ("price_plan_id");
CREATE INDEX "idx_subscription_client_id" ON "subscription" ("client_id");

-- Table: delegate
CREATE TABLE "delegate" (
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_delegate_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id")
);

CREATE INDEX "idx_delegate_user_id" ON "delegate" ("user_id");

-- Table: inventory_serial_history
CREATE TABLE "inventory_serial_history" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "inventory_serial_id" TEXT NOT NULL,
  "inventory_item_id" TEXT NOT NULL,
  "from_status" TEXT NOT NULL,
  "to_status" TEXT NOT NULL,
  "reference_type" TEXT NOT NULL,
  "reference_id" TEXT NOT NULL,
  "notes" TEXT NOT NULL,
  "changed_by" TEXT NOT NULL,
  "changed_by_role" TEXT NOT NULL,
  CONSTRAINT "fk_inventory_serial_history_inventory_serial_id" FOREIGN KEY ("inventory_serial_id") REFERENCES "inventory_serial"("id"),
  CONSTRAINT "fk_inventory_serial_history_inventory_item_id" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item"("id")
);

CREATE INDEX "idx_inventory_serial_history_inventory_serial_id" ON "inventory_serial_history" ("inventory_serial_id");
CREATE INDEX "idx_inventory_serial_history_inventory_item_id" ON "inventory_serial_history" ("inventory_item_id");

-- Table: job_template_task
CREATE TABLE "job_template_task" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "job_template_phase_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "step_order" INTEGER NOT NULL,
  "estimated_duration_minutes" INTEGER NULL,
  CONSTRAINT "fk_job_template_task_job_template_phase_id" FOREIGN KEY ("job_template_phase_id") REFERENCES "job_template_phase"("id")
);

CREATE INDEX "idx_job_template_task_job_template_phase_id" ON "job_template_task" ("job_template_phase_id");

-- Table: collection_attribute
CREATE TABLE "collection_attribute" (
  "id" TEXT PRIMARY KEY,
  "collection_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_collection_attribute_collection_id" FOREIGN KEY ("collection_id") REFERENCES "collection"("id"),
  CONSTRAINT "fk_collection_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_collection_attribute_1" UNIQUE ("collection_id", "attribute_id")
);

CREATE INDEX "idx_collection_attribute_collection_id" ON "collection_attribute" ("collection_id");
CREATE INDEX "idx_collection_attribute_attribute_id" ON "collection_attribute" ("attribute_id");

-- Table: user
CREATE TABLE "user" (
  "id" TEXT PRIMARY KEY,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "email_address" TEXT NOT NULL UNIQUE,
  "mobile_number" TEXT NOT NULL,
  "password_hash" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX "idx_user_mobile_number" ON "user" ("mobile_number");

-- Table: delegate_client
CREATE TABLE "delegate_client" (
  "id" TEXT PRIMARY KEY,
  "delegate_id" TEXT NOT NULL,
  "client_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_delegate_client_delegate_id" FOREIGN KEY ("delegate_id") REFERENCES "delegate"("id"),
  CONSTRAINT "fk_delegate_client_client_id" FOREIGN KEY ("client_id") REFERENCES "client"("id"),
  CONSTRAINT "uq_delegate_client_1" UNIQUE ("delegate_id", "client_id")
);

CREATE INDEX "idx_delegate_client_delegate_id" ON "delegate_client" ("delegate_id");
CREATE INDEX "idx_delegate_client_client_id" ON "delegate_client" ("client_id");

-- Table: product_variant
CREATE TABLE "product_variant" (
  "id" TEXT PRIMARY KEY,
  "product_id" TEXT NOT NULL,
  "sku" TEXT NOT NULL,
  "price_override" DOUBLE PRECISION NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_product_variant_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id")
);

CREATE INDEX "idx_product_variant_product_id" ON "product_variant" ("product_id");

-- Table: stage
CREATE TABLE "stage" (
  "id" TEXT PRIMARY KEY,
  "workflow_id" TEXT NOT NULL,
  "workflow_instance_id" TEXT NOT NULL,
  "stage_template_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "status" TEXT NOT NULL,
  "priority" TEXT NOT NULL,
  "assigned_to" TEXT NULL,
  "completed_by" TEXT NULL,
  "date_started" BIGINT NULL,
  "date_completed" BIGINT NULL,
  "date_due" BIGINT NULL,
  "result_json" TEXT NULL,
  "error_message" TEXT NULL,
  "created_by" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "completion_percentage" INTEGER NULL,
  CONSTRAINT "fk_stage_workflow_id" FOREIGN KEY ("workflow_id") REFERENCES "workflow"("id"),
  CONSTRAINT "fk_stage_stage_template_id" FOREIGN KEY ("stage_template_id") REFERENCES "stage_template"("id")
);

CREATE INDEX "idx_stage_workflow_id" ON "stage" ("workflow_id");
CREATE INDEX "idx_stage_stage_template_id" ON "stage" ("stage_template_id");

-- Table: activity_labor
CREATE TABLE "activity_labor" (
  "activity_id" TEXT NOT NULL,
  "staff_id" TEXT NOT NULL,
  "hours" DOUBLE PRECISION NOT NULL,
  "rate_type" TEXT NOT NULL,
  "time_start" BIGINT NULL,
  "time_end" BIGINT NULL,
  CONSTRAINT "fk_activity_labor_activity_id" FOREIGN KEY ("activity_id") REFERENCES "job_activity"("id"),
  CONSTRAINT "fk_activity_labor_staff_id" FOREIGN KEY ("staff_id") REFERENCES "staff"("id")
);

CREATE INDEX "idx_activity_labor_staff_id" ON "activity_labor" ("staff_id");

-- Table: category
CREATE TABLE "category" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "module" TEXT NOT NULL,
  "parent_id" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "display_order" INTEGER NULL,
  CONSTRAINT "fk_category_parent_id" FOREIGN KEY ("parent_id") REFERENCES "category"("id")
);

CREATE INDEX "idx_category_parent_id" ON "category" ("parent_id");

-- Table: asset_maintenance
CREATE TABLE "asset_maintenance" (
  "id" TEXT PRIMARY KEY,
  "asset_id" TEXT NOT NULL,
  "maintenance_type" TEXT NOT NULL,
  "priority" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "scheduled_date" BIGINT NULL,
  "start_date" BIGINT NULL,
  "completion_date" BIGINT NULL,
  "description" TEXT NULL,
  "cost" DOUBLE PRECISION NULL,
  "is_capitalized" BOOLEAN NOT NULL,
  "performed_by" TEXT NULL,
  "vendor_id" TEXT NULL,
  "work_order_number" TEXT NULL,
  "next_maintenance_date" BIGINT NULL,
  "recurrence_interval_days" INTEGER NULL,
  "notes" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_asset_maintenance_asset_id" FOREIGN KEY ("asset_id") REFERENCES "asset"("id")
);

CREATE INDEX "idx_asset_maintenance_asset_id" ON "asset_maintenance" ("asset_id");

-- Table: plan_location
CREATE TABLE "plan_location" (
  "id" TEXT PRIMARY KEY,
  "plan_id" TEXT NOT NULL,
  "location_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_plan_location_plan_id" FOREIGN KEY ("plan_id") REFERENCES "plan"("id"),
  CONSTRAINT "fk_plan_location_location_id" FOREIGN KEY ("location_id") REFERENCES "location"("id"),
  CONSTRAINT "uq_plan_location_1" UNIQUE ("plan_id", "location_id")
);

CREATE INDEX "idx_plan_location_plan_id" ON "plan_location" ("plan_id");
CREATE INDEX "idx_plan_location_location_id" ON "plan_location" ("location_id");

-- Table: permission
CREATE TABLE "permission" (
  "id" TEXT PRIMARY KEY,
  "workspace_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "granted_by_user_id" TEXT NOT NULL,
  "permission_code" TEXT NOT NULL,
  "permission_type" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  CONSTRAINT "fk_permission_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_permission_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id"),
  CONSTRAINT "fk_permission_granted_by_user_id" FOREIGN KEY ("granted_by_user_id") REFERENCES "user"("id")
);

CREATE INDEX "idx_permission_workspace_id" ON "permission" ("workspace_id");
CREATE INDEX "idx_permission_user_id" ON "permission" ("user_id");
CREATE INDEX "idx_permission_granted_by_user_id" ON "permission" ("granted_by_user_id");

-- Table: price_product
CREATE TABLE "price_product" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "product_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "amount" BIGINT NOT NULL,
  "currency" TEXT NOT NULL,
  "date_start" BIGINT NOT NULL,
  "date_end" BIGINT NULL,
  "price_list_id" TEXT NULL,
  CONSTRAINT "fk_price_product_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id"),
  CONSTRAINT "fk_price_product_price_list_id" FOREIGN KEY ("price_list_id") REFERENCES "price_list"("id")
);

CREATE INDEX "idx_price_product_product_id" ON "price_product" ("product_id");
CREATE INDEX "idx_price_product_price_list_id" ON "price_product" ("price_list_id");

-- Table: invoice_attribute
CREATE TABLE "invoice_attribute" (
  "id" TEXT PRIMARY KEY,
  "invoice_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_invoice_attribute_invoice_id" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id"),
  CONSTRAINT "fk_invoice_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_invoice_attribute_1" UNIQUE ("invoice_id", "attribute_id")
);

CREATE INDEX "idx_invoice_attribute_invoice_id" ON "invoice_attribute" ("invoice_id");
CREATE INDEX "idx_invoice_attribute_attribute_id" ON "invoice_attribute" ("attribute_id");

-- Table: asset_transaction
CREATE TABLE "asset_transaction" (
  "id" TEXT PRIMARY KEY,
  "asset_id" TEXT NOT NULL,
  "transaction_type" TEXT NOT NULL,
  "transaction_date" BIGINT NOT NULL,
  "amount" DOUBLE PRECISION NOT NULL,
  "description" TEXT NULL,
  "reference_number" TEXT NULL,
  "from_location_id" TEXT NULL,
  "to_location_id" TEXT NULL,
  "journal_entry_id" TEXT NULL,
  "performed_by" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_asset_transaction_asset_id" FOREIGN KEY ("asset_id") REFERENCES "asset"("id")
);

CREATE INDEX "idx_asset_transaction_asset_id" ON "asset_transaction" ("asset_id");

-- Table: activity_template
CREATE TABLE "activity_template" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "stage_template_id" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "activity_type" TEXT NOT NULL,
  "order_index" INTEGER NULL,
  "is_required" BOOLEAN NULL,
  "condition_expression" TEXT NULL,
  "assignee_type" TEXT NULL,
  "default_assignee_id" TEXT NULL,
  "estimated_duration_minutes" INTEGER NULL,
  "configuration_json" TEXT NULL,
  "validation_rules_json" TEXT NULL,
  "created_by" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "input_schema_json" TEXT NULL,
  "output_schema_json" TEXT NULL,
  "use_case_code" TEXT NULL,
  "rollback_use_case_code" TEXT NULL,
  CONSTRAINT "fk_activity_template_stage_template_id" FOREIGN KEY ("stage_template_id") REFERENCES "stage_template"("id")
);

CREATE INDEX "idx_activity_template_stage_template_id" ON "activity_template" ("stage_template_id");

-- Table: workflow
CREATE TABLE "workflow" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "status" TEXT NOT NULL,
  "workspace_id" TEXT NULL,
  "created_by" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "version" INTEGER NULL,
  "workflow_template_id" TEXT NULL,
  "context_json" TEXT NULL,
  "current_stage_index" INTEGER NULL,
  CONSTRAINT "fk_workflow_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_workflow_workflow_template_id" FOREIGN KEY ("workflow_template_id") REFERENCES "workflow_template"("id")
);

CREATE INDEX "idx_workflow_workspace_id" ON "workflow" ("workspace_id");
CREATE INDEX "idx_workflow_workflow_template_id" ON "workflow" ("workflow_template_id");

-- Table: collection_plan
CREATE TABLE "collection_plan" (
  "id" TEXT PRIMARY KEY,
  "collection_id" TEXT NOT NULL,
  "plan_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_collection_plan_collection_id" FOREIGN KEY ("collection_id") REFERENCES "collection"("id"),
  CONSTRAINT "fk_collection_plan_plan_id" FOREIGN KEY ("plan_id") REFERENCES "plan"("id"),
  CONSTRAINT "uq_collection_plan_1" UNIQUE ("collection_id", "plan_id")
);

CREATE INDEX "idx_collection_plan_collection_id" ON "collection_plan" ("collection_id");
CREATE INDEX "idx_collection_plan_plan_id" ON "collection_plan" ("plan_id");

-- Table: activity_material
CREATE TABLE "activity_material" (
  "activity_id" TEXT NOT NULL,
  "product_id" TEXT NOT NULL,
  "unit_of_measure" TEXT NOT NULL,
  "lot_number" TEXT NULL,
  "location_id" TEXT NULL,
  CONSTRAINT "fk_activity_material_activity_id" FOREIGN KEY ("activity_id") REFERENCES "job_activity"("id"),
  CONSTRAINT "fk_activity_material_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id"),
  CONSTRAINT "fk_activity_material_location_id" FOREIGN KEY ("location_id") REFERENCES "location"("id")
);

CREATE INDEX "idx_activity_material_product_id" ON "activity_material" ("product_id");
CREATE INDEX "idx_activity_material_location_id" ON "activity_material" ("location_id");

-- Table: staff_attribute
CREATE TABLE "staff_attribute" (
  "id" TEXT PRIMARY KEY,
  "staff_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_staff_attribute_staff_id" FOREIGN KEY ("staff_id") REFERENCES "staff"("id"),
  CONSTRAINT "fk_staff_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_staff_attribute_1" UNIQUE ("staff_id", "attribute_id")
);

CREATE INDEX "idx_staff_attribute_staff_id" ON "staff_attribute" ("staff_id");
CREATE INDEX "idx_staff_attribute_attribute_id" ON "staff_attribute" ("attribute_id");

-- Table: job_settlement
CREATE TABLE "job_settlement" (
  "id" TEXT PRIMARY KEY,
  "job_activity_id" TEXT NOT NULL,
  "target_type" TEXT NOT NULL,
  "target_id" TEXT NOT NULL,
  "allocated_amount" DOUBLE PRECISION NOT NULL,
  "allocation_pct" DOUBLE PRECISION NULL,
  "settlement_date" BIGINT NULL,
  "status" TEXT NOT NULL,
  "reversal_of_id" TEXT NULL,
  "created_by" TEXT NULL,
  "date_created" BIGINT NULL,
  "active" BOOLEAN NOT NULL,
  "workspace_id" TEXT NULL,
  CONSTRAINT "fk_job_settlement_job_activity_id" FOREIGN KEY ("job_activity_id") REFERENCES "job_activity"("id"),
  CONSTRAINT "fk_job_settlement_reversal_of_id" FOREIGN KEY ("reversal_of_id") REFERENCES "job_settlement"("id"),
  CONSTRAINT "fk_job_settlement_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);

CREATE INDEX "idx_job_settlement_job_activity_id" ON "job_settlement" ("job_activity_id");
CREATE INDEX "idx_job_settlement_workspace_id" ON "job_settlement" ("workspace_id");

-- Table: product_plan
CREATE TABLE "product_plan" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL,
  "product_id" TEXT NOT NULL,
  CONSTRAINT "fk_product_plan_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id")
);

CREATE INDEX "idx_product_plan_product_id" ON "product_plan" ("product_id");

-- Table: supplier_category
CREATE TABLE "supplier_category" (
  "id" TEXT PRIMARY KEY,
  "supplier_id" TEXT NOT NULL,
  "category_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_supplier_category_supplier_id" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id"),
  CONSTRAINT "fk_supplier_category_category_id" FOREIGN KEY ("category_id") REFERENCES "category"("id"),
  CONSTRAINT "uq_supplier_category_1" UNIQUE ("supplier_id", "category_id")
);

CREATE INDEX "idx_supplier_category_supplier_id" ON "supplier_category" ("supplier_id");
CREATE INDEX "idx_supplier_category_category_id" ON "supplier_category" ("category_id");

-- Table: workflow_template
CREATE TABLE "workflow_template" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "workspace_id" TEXT NULL,
  "status" TEXT NOT NULL,
  "business_type" TEXT NOT NULL,
  "configuration_json" TEXT NULL,
  "version" INTEGER NULL,
  "created_by" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "input_schema_json" TEXT NULL,
  "system_id" TEXT NULL,
  "is_system" BOOLEAN NULL,
  CONSTRAINT "fk_workflow_template_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);

CREATE INDEX "idx_workflow_template_workspace_id" ON "workflow_template" ("workspace_id");

-- Table: role_permission
CREATE TABLE "role_permission" (
  "id" TEXT PRIMARY KEY,
  "role_id" TEXT NOT NULL,
  "permission_id" TEXT NOT NULL,
  "permission_type" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_role_permission_role_id" FOREIGN KEY ("role_id") REFERENCES "role"("id"),
  CONSTRAINT "fk_role_permission_permission_id" FOREIGN KEY ("permission_id") REFERENCES "permission"("id"),
  CONSTRAINT "uq_role_permission_1" UNIQUE ("role_id", "permission_id")
);

CREATE INDEX "idx_role_permission_role_id" ON "role_permission" ("role_id");
CREATE INDEX "idx_role_permission_permission_id" ON "role_permission" ("permission_id");

-- Table: event_client
CREATE TABLE "event_client" (
  "id" TEXT PRIMARY KEY,
  "event_id" TEXT NOT NULL,
  "client_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_event_client_event_id" FOREIGN KEY ("event_id") REFERENCES "event"("id"),
  CONSTRAINT "fk_event_client_client_id" FOREIGN KEY ("client_id") REFERENCES "client"("id"),
  CONSTRAINT "uq_event_client_1" UNIQUE ("event_id", "client_id")
);

CREATE INDEX "idx_event_client_event_id" ON "event_client" ("event_id");
CREATE INDEX "idx_event_client_client_id" ON "event_client" ("client_id");

-- Table: subscription_attribute
CREATE TABLE "subscription_attribute" (
  "id" TEXT PRIMARY KEY,
  "subscription_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_subscription_attribute_subscription_id" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id"),
  CONSTRAINT "fk_subscription_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_subscription_attribute_1" UNIQUE ("subscription_id", "attribute_id")
);

CREATE INDEX "idx_subscription_attribute_subscription_id" ON "subscription_attribute" ("subscription_id");
CREATE INDEX "idx_subscription_attribute_attribute_id" ON "subscription_attribute" ("attribute_id");

-- Table: supplier_attribute
CREATE TABLE "supplier_attribute" (
  "id" TEXT PRIMARY KEY,
  "supplier_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_supplier_attribute_supplier_id" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id"),
  CONSTRAINT "fk_supplier_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_supplier_attribute_1" UNIQUE ("supplier_id", "attribute_id")
);

CREATE INDEX "idx_supplier_attribute_supplier_id" ON "supplier_attribute" ("supplier_id");
CREATE INDEX "idx_supplier_attribute_attribute_id" ON "supplier_attribute" ("attribute_id");

-- Table: event_attribute
CREATE TABLE "event_attribute" (
  "id" TEXT PRIMARY KEY,
  "event_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_event_attribute_event_id" FOREIGN KEY ("event_id") REFERENCES "event"("id"),
  CONSTRAINT "fk_event_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id")
);

CREATE INDEX "idx_event_attribute_event_id" ON "event_attribute" ("event_id");
CREATE INDEX "idx_event_attribute_attribute_id" ON "event_attribute" ("attribute_id");

-- Table: plan_attribute
CREATE TABLE "plan_attribute" (
  "id" TEXT PRIMARY KEY,
  "plan_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_plan_attribute_plan_id" FOREIGN KEY ("plan_id") REFERENCES "plan"("id"),
  CONSTRAINT "fk_plan_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_plan_attribute_1" UNIQUE ("plan_id", "attribute_id")
);

CREATE INDEX "idx_plan_attribute_plan_id" ON "plan_attribute" ("plan_id");
CREATE INDEX "idx_plan_attribute_attribute_id" ON "plan_attribute" ("attribute_id");

-- Table: inventory_serial
CREATE TABLE "inventory_serial" (
  "id" TEXT PRIMARY KEY,
  "inventory_item_id" TEXT NOT NULL,
  "serial_number" TEXT NOT NULL UNIQUE,
  "imei" TEXT NULL,
  "status" TEXT NOT NULL,
  "warranty_start" TEXT NULL,
  "warranty_end" TEXT NULL,
  "purchase_order" TEXT NULL,
  "notes" TEXT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_inventory_serial_inventory_item_id" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item"("id")
);

CREATE INDEX "idx_inventory_serial_inventory_item_id" ON "inventory_serial" ("inventory_item_id");

-- Table: license
CREATE TABLE "license" (
  "id" TEXT PRIMARY KEY,
  "subscription_id" TEXT NOT NULL,
  "plan_id" TEXT NOT NULL,
  "license_key" TEXT NOT NULL,
  "external_key" TEXT NULL,
  "license_type" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "date_valid_from" BIGINT NULL,
  "date_valid_until" BIGINT NULL,
  "assignee_id" TEXT NULL,
  "assignee_type" TEXT NULL,
  "assignee_name" TEXT NULL,
  "assigned_by" TEXT NULL,
  "date_assigned" BIGINT NULL,
  "sequence_number" INTEGER NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_license_subscription_id" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id"),
  CONSTRAINT "fk_license_plan_id" FOREIGN KEY ("plan_id") REFERENCES "plan"("id")
);

CREATE INDEX "idx_license_subscription_id" ON "license" ("subscription_id");
CREATE INDEX "idx_license_plan_id" ON "license" ("plan_id");

-- Table: license_history
CREATE TABLE "license_history" (
  "id" TEXT PRIMARY KEY,
  "license_id" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "assignee_id" TEXT NULL,
  "assignee_type" TEXT NULL,
  "assignee_name" TEXT NULL,
  "previous_assignee_id" TEXT NULL,
  "previous_assignee_type" TEXT NULL,
  "previous_assignee_name" TEXT NULL,
  "performed_by" TEXT NOT NULL,
  "reason" TEXT NULL,
  "notes" TEXT NULL,
  "license_status_before" TEXT NOT NULL,
  "license_status_after" TEXT NOT NULL,
  "date_created" BIGINT NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_license_history_license_id" FOREIGN KEY ("license_id") REFERENCES "license"("id")
);

CREATE INDEX "idx_license_history_license_id" ON "license_history" ("license_id");

-- Table: role
CREATE TABLE "role" (
  "id" TEXT PRIMARY KEY,
  "workspace_id" TEXT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "color" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_role_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);

CREATE INDEX "idx_role_workspace_id" ON "role" ("workspace_id");

-- Table: workspace_user_role
CREATE TABLE "workspace_user_role" (
  "id" TEXT PRIMARY KEY,
  "workspace_user_id" TEXT NOT NULL,
  "role_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_workspace_user_role_workspace_user_id" FOREIGN KEY ("workspace_user_id") REFERENCES "workspace_user"("id"),
  CONSTRAINT "fk_workspace_user_role_role_id" FOREIGN KEY ("role_id") REFERENCES "role"("id"),
  CONSTRAINT "uq_workspace_user_role_1" UNIQUE ("workspace_user_id", "role_id")
);

CREATE INDEX "idx_workspace_user_role_workspace_user_id" ON "workspace_user_role" ("workspace_user_id");
CREATE INDEX "idx_workspace_user_role_role_id" ON "workspace_user_role" ("role_id");

-- Table: product_collection
CREATE TABLE "product_collection" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "product_id" TEXT NOT NULL,
  "collection_id" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  CONSTRAINT "fk_product_collection_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id"),
  CONSTRAINT "fk_product_collection_collection_id" FOREIGN KEY ("collection_id") REFERENCES "collection"("id"),
  CONSTRAINT "uq_product_collection_1" UNIQUE ("product_id", "collection_id")
);

CREATE INDEX "idx_product_collection_product_id" ON "product_collection" ("product_id");
CREATE INDEX "idx_product_collection_collection_id" ON "product_collection" ("collection_id");

-- Table: job
CREATE TABLE "job" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "job_template_id" TEXT NULL,
  "origin_type" TEXT NOT NULL,
  "origin_id" TEXT NULL,
  "client_id" TEXT NULL,
  "demand_type" TEXT NOT NULL,
  "fulfillment_type" TEXT NOT NULL,
  "cost_flow_type" TEXT NOT NULL,
  "billing_rule_type" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "approval_status" TEXT NOT NULL,
  "posting_status" TEXT NOT NULL,
  "billing_status" TEXT NOT NULL,
  "location_id" TEXT NULL,
  "created_by" TEXT NULL,
  "workspace_id" TEXT NULL,
  CONSTRAINT "fk_job_job_template_id" FOREIGN KEY ("job_template_id") REFERENCES "job_template"("id"),
  CONSTRAINT "fk_job_client_id" FOREIGN KEY ("client_id") REFERENCES "client"("id"),
  CONSTRAINT "fk_job_location_id" FOREIGN KEY ("location_id") REFERENCES "location"("id"),
  CONSTRAINT "fk_job_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);

CREATE INDEX "idx_job_job_template_id" ON "job" ("job_template_id");
CREATE INDEX "idx_job_client_id" ON "job" ("client_id");
CREATE INDEX "idx_job_location_id" ON "job" ("location_id");
CREATE INDEX "idx_job_workspace_id" ON "job" ("workspace_id");

-- Table: product_variant_image
CREATE TABLE "product_variant_image" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "product_variant_id" TEXT NOT NULL,
  "image_url" TEXT NOT NULL,
  "alt_text" TEXT NULL,
  "sort_order" INTEGER NOT NULL,
  "is_primary" BOOLEAN NOT NULL,
  CONSTRAINT "fk_product_variant_image_product_variant_id" FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id")
);

CREATE INDEX "idx_product_variant_image_product_variant_id" ON "product_variant_image" ("product_variant_id");

-- Table: attribute_value
CREATE TABLE "attribute_value" (
  "id" TEXT PRIMARY KEY,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_attribute_value_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id")
);

CREATE INDEX "idx_attribute_value_attribute_id" ON "attribute_value" ("attribute_id");

-- Table: price_plan
CREATE TABLE "price_plan" (
  "id" TEXT PRIMARY KEY,
  "plan_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "amount" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL,
  "duration_value" INTEGER NOT NULL,
  "duration_unit" TEXT NOT NULL,
  "confirmation_template" TEXT NULL,
  "receipt_template" TEXT NULL,
  CONSTRAINT "fk_price_plan_plan_id" FOREIGN KEY ("plan_id") REFERENCES "plan"("id")
);

CREATE INDEX "idx_price_plan_plan_id" ON "price_plan" ("plan_id");

-- Table: group
CREATE TABLE "group" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true
);

-- Table: job_phase
CREATE TABLE "job_phase" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL,
  "job_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "phase_order" INTEGER NOT NULL,
  "status" TEXT NOT NULL,
  CONSTRAINT "fk_job_phase_job_id" FOREIGN KEY ("job_id") REFERENCES "job"("id")
);

CREATE INDEX "idx_job_phase_job_id" ON "job_phase" ("job_id");

-- Table: event_settings
CREATE TABLE "event_settings" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "event_id" TEXT NOT NULL,
  "start_date_time_utc" BIGINT NOT NULL,
  "end_date_time_utc" BIGINT NOT NULL,
  "timezone" TEXT NOT NULL,
  "event_recurrence_id" TEXT NOT NULL,
  CONSTRAINT "fk_event_settings_event_id" FOREIGN KEY ("event_id") REFERENCES "event"("id"),
  CONSTRAINT "fk_event_settings_event_recurrence_id" FOREIGN KEY ("event_recurrence_id") REFERENCES "event_recurrence"("id")
);

CREATE INDEX "idx_event_settings_event_id" ON "event_settings" ("event_id");
CREATE INDEX "idx_event_settings_event_recurrence_id" ON "event_settings" ("event_recurrence_id");

-- Table: attribute
CREATE TABLE "attribute" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "data_type" TEXT NOT NULL,
  "module" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true
);

-- Table: price_list
CREATE TABLE "price_list" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "date_start" BIGINT NOT NULL,
  "date_end" BIGINT NULL,
  "location_id" TEXT NULL,
  CONSTRAINT "fk_price_list_location_id" FOREIGN KEY ("location_id") REFERENCES "location"("id")
);

CREATE INDEX "idx_price_list_location_id" ON "price_list" ("location_id");

-- Table: collection
CREATE TABLE "collection" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true
);

-- Table: event_product
CREATE TABLE "event_product" (
  "id" TEXT PRIMARY KEY,
  "event_id" TEXT NOT NULL,
  "product_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "quantity" INTEGER NULL,
  "unit_price" DOUBLE PRECISION NULL,
  "currency" TEXT NULL,
  "total_price" DOUBLE PRECISION NULL,
  "notes" TEXT NULL,
  CONSTRAINT "fk_event_product_event_id" FOREIGN KEY ("event_id") REFERENCES "event"("id"),
  CONSTRAINT "fk_event_product_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id"),
  CONSTRAINT "uq_event_product_1" UNIQUE ("event_id", "product_id")
);

CREATE INDEX "idx_event_product_event_id" ON "event_product" ("event_id");
CREATE INDEX "idx_event_product_product_id" ON "event_product" ("product_id");

-- Table: activity
CREATE TABLE "activity" (
  "id" TEXT PRIMARY KEY,
  "stage_id" TEXT NOT NULL,
  "activity_template_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "status" TEXT NOT NULL,
  "priority" TEXT NOT NULL,
  "assigned_to" TEXT NULL,
  "completed_by" TEXT NULL,
  "date_assigned" BIGINT NULL,
  "date_started" BIGINT NULL,
  "date_completed" BIGINT NULL,
  "date_due" BIGINT NULL,
  "input_data_json" TEXT NULL,
  "output_data_json" TEXT NULL,
  "result_json" TEXT NULL,
  "error_message" TEXT NULL,
  "approval_comments" TEXT NULL,
  "rejection_reason" TEXT NULL,
  "estimated_duration_minutes" INTEGER NULL,
  "actual_duration_minutes" INTEGER NULL,
  "created_by" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "completion_percentage" INTEGER NULL,
  "attachment_ids" TEXT NOT NULL,
  "order_index" INTEGER NULL,
  "stage_order_index" INTEGER NULL,
  CONSTRAINT "fk_activity_stage_id" FOREIGN KEY ("stage_id") REFERENCES "stage"("id"),
  CONSTRAINT "fk_activity_activity_template_id" FOREIGN KEY ("activity_template_id") REFERENCES "activity_template"("id")
);

CREATE INDEX "idx_activity_stage_id" ON "activity" ("stage_id");
CREATE INDEX "idx_activity_activity_template_id" ON "activity" ("activity_template_id");

-- Table: group_attribute
CREATE TABLE "group_attribute" (
  "id" TEXT PRIMARY KEY,
  "group_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_group_attribute_group_id" FOREIGN KEY ("group_id") REFERENCES "group"("id"),
  CONSTRAINT "fk_group_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_group_attribute_1" UNIQUE ("group_id", "attribute_id")
);

CREATE INDEX "idx_group_attribute_group_id" ON "group_attribute" ("group_id");
CREATE INDEX "idx_group_attribute_attribute_id" ON "group_attribute" ("attribute_id");

-- Table: workspace_user
CREATE TABLE "workspace_user" (
  "id" TEXT PRIMARY KEY,
  "workspace_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_workspace_user_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_workspace_user_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id"),
  CONSTRAINT "uq_workspace_user_1" UNIQUE ("workspace_id", "user_id")
);

CREATE INDEX "idx_workspace_user_workspace_id" ON "workspace_user" ("workspace_id");
CREATE INDEX "idx_workspace_user_user_id" ON "workspace_user" ("user_id");

-- Table: job_template_phase
CREATE TABLE "job_template_phase" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "job_template_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "phase_order" INTEGER NOT NULL,
  CONSTRAINT "fk_job_template_phase_job_template_id" FOREIGN KEY ("job_template_id") REFERENCES "job_template"("id")
);

CREATE INDEX "idx_job_template_phase_job_template_id" ON "job_template_phase" ("job_template_id");

-- Table: location_attribute
CREATE TABLE "location_attribute" (
  "id" TEXT PRIMARY KEY,
  "location_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_location_attribute_location_id" FOREIGN KEY ("location_id") REFERENCES "location"("id"),
  CONSTRAINT "fk_location_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_location_attribute_1" UNIQUE ("location_id", "attribute_id")
);

CREATE INDEX "idx_location_attribute_location_id" ON "location_attribute" ("location_id");
CREATE INDEX "idx_location_attribute_attribute_id" ON "location_attribute" ("attribute_id");

-- Table: asset_disposal
CREATE TABLE "asset_disposal" (
  "id" TEXT PRIMARY KEY,
  "asset_id" TEXT NOT NULL,
  "disposal_date" BIGINT NOT NULL,
  "disposal_type" TEXT NOT NULL,
  "proceeds" DOUBLE PRECISION NOT NULL,
  "cost_at_disposal" DOUBLE PRECISION NOT NULL,
  "accumulated_depreciation_at_disposal" DOUBLE PRECISION NOT NULL,
  "book_value_at_disposal" DOUBLE PRECISION NOT NULL,
  "gain_or_loss" DOUBLE PRECISION NOT NULL,
  "buyer_name" TEXT NULL,
  "reason" TEXT NULL,
  "approval_status" TEXT NULL,
  "approved_by" TEXT NULL,
  "journal_entry_id" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_asset_disposal_asset_id" FOREIGN KEY ("asset_id") REFERENCES "asset"("id")
);

CREATE INDEX "idx_asset_disposal_asset_id" ON "asset_disposal" ("asset_id");

-- Table: client
CREATE TABLE "client" (
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "internal_id" TEXT NOT NULL UNIQUE,
  "category_id" TEXT NULL,
  "company_name" TEXT NULL,
  "customer_type" TEXT NULL,
  "date_of_birth" TEXT NULL,
  "street_address" TEXT NULL,
  "city" TEXT NULL,
  "province" TEXT NULL,
  "postal_code" TEXT NULL,
  "notes" TEXT NULL,
  CONSTRAINT "fk_client_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id"),
  CONSTRAINT "fk_client_category_id" FOREIGN KEY ("category_id") REFERENCES "client_category"("id")
);

CREATE INDEX "idx_client_user_id" ON "client" ("user_id");

-- Table: workspace
CREATE TABLE "workspace" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "private" BOOLEAN NOT NULL,
  "workflow_template_id" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_workspace_workflow_template_id" FOREIGN KEY ("workflow_template_id") REFERENCES "workflow_template"("id")
);

CREATE INDEX "idx_workspace_workflow_template_id" ON "workspace" ("workflow_template_id");

-- Table: product
CREATE TABLE "product" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL,
  "item_type" TEXT NOT NULL
);

-- Table: staff
CREATE TABLE "staff" (
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_staff_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id")
);

CREATE INDEX "idx_staff_user_id" ON "staff" ("user_id");

-- Table: job_template
CREATE TABLE "job_template" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "default_fulfillment_type" TEXT NULL,
  "default_cost_flow_type" TEXT NULL,
  "default_billing_rule_type" TEXT NULL,
  "workspace_id" TEXT NULL,
  CONSTRAINT "fk_job_template_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);

CREATE INDEX "idx_job_template_workspace_id" ON "job_template" ("workspace_id");

-- Table: product_option
CREATE TABLE "product_option" (
  "id" TEXT PRIMARY KEY,
  "product_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "data_type" TEXT NOT NULL DEFAULT 'text_list',
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "min_value" DOUBLE PRECISION NULL,
  "max_value" DOUBLE PRECISION NULL,
  "required" BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT "fk_product_option_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id")
);

CREATE INDEX "idx_product_option_product_id" ON "product_option" ("product_id");

-- Table: depreciation_schedule
CREATE TABLE "depreciation_schedule" (
  "id" TEXT PRIMARY KEY,
  "asset_id" TEXT NOT NULL,
  "period_number" INTEGER NOT NULL,
  "fiscal_year" INTEGER NOT NULL,
  "fiscal_period" INTEGER NOT NULL,
  "period_start_date" BIGINT NOT NULL,
  "period_end_date" BIGINT NOT NULL,
  "opening_book_value" DOUBLE PRECISION NOT NULL,
  "depreciation_amount" DOUBLE PRECISION NOT NULL,
  "accumulated_depreciation" DOUBLE PRECISION NOT NULL,
  "closing_book_value" DOUBLE PRECISION NOT NULL,
  "units_produced" BIGINT NULL,
  "is_posted" BOOLEAN NOT NULL,
  "journal_entry_id" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_depreciation_schedule_asset_id" FOREIGN KEY ("asset_id") REFERENCES "asset"("id")
);

CREATE INDEX "idx_depreciation_schedule_asset_id" ON "depreciation_schedule" ("asset_id");

-- Table: client_attribute
CREATE TABLE "client_attribute" (
  "id" TEXT PRIMARY KEY,
  "client_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_client_attribute_client_id" FOREIGN KEY ("client_id") REFERENCES "client"("id"),
  CONSTRAINT "fk_client_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_client_attribute_1" UNIQUE ("client_id", "attribute_id")
);

CREATE INDEX "idx_client_attribute_client_id" ON "client_attribute" ("client_id");
CREATE INDEX "idx_client_attribute_attribute_id" ON "client_attribute" ("attribute_id");

-- Table: balance_attribute
CREATE TABLE "balance_attribute" (
  "id" TEXT PRIMARY KEY,
  "balance_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_balance_attribute_balance_id" FOREIGN KEY ("balance_id") REFERENCES "balance"("id"),
  CONSTRAINT "fk_balance_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_balance_attribute_1" UNIQUE ("balance_id", "attribute_id")
);

CREATE INDEX "idx_balance_attribute_balance_id" ON "balance_attribute" ("balance_id");
CREATE INDEX "idx_balance_attribute_attribute_id" ON "balance_attribute" ("attribute_id");

-- Table: asset_component
CREATE TABLE "asset_component" (
  "id" TEXT PRIMARY KEY,
  "asset_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "cost" DOUBLE PRECISION NOT NULL,
  "salvage_value" DOUBLE PRECISION NOT NULL,
  "useful_life_months" INTEGER NOT NULL,
  "depreciation_method" TEXT NOT NULL,
  "accumulated_depreciation" DOUBLE PRECISION NOT NULL,
  "book_value" DOUBLE PRECISION NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_asset_component_asset_id" FOREIGN KEY ("asset_id") REFERENCES "asset"("id")
);

CREATE INDEX "idx_asset_component_asset_id" ON "asset_component" ("asset_id");

-- Table: job_task
CREATE TABLE "job_task" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL,
  "job_phase_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "step_order" INTEGER NOT NULL,
  "status" TEXT NOT NULL,
  "is_ad_hoc" BOOLEAN NOT NULL,
  "assigned_to" TEXT NULL,
  CONSTRAINT "fk_job_task_job_phase_id" FOREIGN KEY ("job_phase_id") REFERENCES "job_phase"("id"),
  CONSTRAINT "fk_job_task_assigned_to" FOREIGN KEY ("assigned_to") REFERENCES "staff"("id")
);

CREATE INDEX "idx_job_task_job_phase_id" ON "job_task" ("job_phase_id");
CREATE INDEX "idx_job_task_assigned_to" ON "job_task" ("assigned_to");

-- Table: asset_category
CREATE TABLE "asset_category" (
  "id" TEXT PRIMARY KEY,
  "code" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "parent_category_id" TEXT NULL,
  "default_depreciation_method" TEXT NOT NULL,
  "default_useful_life_months" INTEGER NOT NULL,
  "default_salvage_value_percent" DOUBLE PRECISION NOT NULL,
  "asset_cost_account" TEXT NULL,
  "accumulated_depreciation_account" TEXT NULL,
  "depreciation_expense_account" TEXT NULL,
  "gain_on_disposal_account" TEXT NULL,
  "loss_on_disposal_account" TEXT NULL,
  "impairment_loss_account" TEXT NULL,
  "revaluation_surplus_account" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_asset_category_parent_category_id" FOREIGN KEY ("parent_category_id") REFERENCES "asset_category"("id")
);

CREATE INDEX "idx_asset_category_parent_category_id" ON "asset_category" ("parent_category_id");

-- Table: product_attribute
CREATE TABLE "product_attribute" (
  "id" TEXT PRIMARY KEY,
  "product_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "default_value" TEXT NULL,
  CONSTRAINT "fk_product_attribute_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id"),
  CONSTRAINT "fk_product_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_product_attribute_1" UNIQUE ("product_id", "attribute_id")
);

CREATE INDEX "idx_product_attribute_product_id" ON "product_attribute" ("product_id");
CREATE INDEX "idx_product_attribute_attribute_id" ON "product_attribute" ("attribute_id");

-- Table: supplier
CREATE TABLE "supplier" (
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "internal_id" TEXT NOT NULL UNIQUE,
  "category_id" TEXT NULL,
  "supplier_type" TEXT NOT NULL,
  "company_name" TEXT NOT NULL,
  "tax_id" TEXT NULL,
  "registration_number" TEXT NULL,
  "street_address" TEXT NULL,
  "city" TEXT NULL,
  "province" TEXT NULL,
  "postal_code" TEXT NULL,
  "country" TEXT NULL,
  "default_currency" TEXT NULL,
  "payment_terms" TEXT NULL,
  "lead_time_days" INTEGER NULL,
  "credit_limit" DOUBLE PRECISION NULL,
  "status" TEXT NULL,
  "client_id" TEXT NULL,
  "website" TEXT NULL,
  "notes" TEXT NULL,
  CONSTRAINT "fk_supplier_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id"),
  CONSTRAINT "fk_supplier_category_id" FOREIGN KEY ("category_id") REFERENCES "supplier_category"("id"),
  CONSTRAINT "fk_supplier_client_id" FOREIGN KEY ("client_id") REFERENCES "client"("id")
);

CREATE INDEX "idx_supplier_user_id" ON "supplier" ("user_id");
CREATE INDEX "idx_supplier_client_id" ON "supplier" ("client_id");

-- Table: location
CREATE TABLE "location" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "description" TEXT NULL
);

-- Table: stage_template
CREATE TABLE "stage_template" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "workflow_template_id" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "stage_type" TEXT NOT NULL,
  "order_index" INTEGER NULL,
  "is_required" BOOLEAN NULL,
  "condition_expression" TEXT NULL,
  "created_by" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_stage_template_workflow_template_id" FOREIGN KEY ("workflow_template_id") REFERENCES "workflow_template"("id")
);

CREATE INDEX "idx_stage_template_workflow_template_id" ON "stage_template" ("workflow_template_id");

-- Table: asset
CREATE TABLE "asset" (
  "id" TEXT PRIMARY KEY,
  "asset_number" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "asset_type" TEXT NOT NULL,
  "asset_category_id" TEXT NOT NULL,
  "serial_number" TEXT NULL,
  "tag_number" TEXT NULL,
  "manufacturer" TEXT NULL,
  "model" TEXT NULL,
  "location_id" TEXT NULL,
  "custodian_id" TEXT NULL,
  "vendor_id" TEXT NULL,
  "product_id" TEXT NULL,
  "purchase_order_number" TEXT NULL,
  "invoice_number" TEXT NULL,
  "acquisition_date" BIGINT NULL,
  "date_placed_in_service" BIGINT NULL,
  "acquisition_cost" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL,
  "salvage_value" DOUBLE PRECISION NOT NULL,
  "book_value" DOUBLE PRECISION NOT NULL,
  "fair_value" DOUBLE PRECISION NULL,
  "useful_life_months" INTEGER NOT NULL,
  "useful_life_units" BIGINT NULL,
  "depreciation_method" TEXT NOT NULL,
  "depreciation_rate" DOUBLE PRECISION NULL,
  "depreciation_start_date" BIGINT NULL,
  "accumulated_depreciation" DOUBLE PRECISION NOT NULL,
  "measurement_model" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "warranty_expiry_date" BIGINT NULL,
  "notes" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_asset_asset_category_id" FOREIGN KEY ("asset_category_id") REFERENCES "asset_category"("id"),
  CONSTRAINT "fk_asset_location_id" FOREIGN KEY ("location_id") REFERENCES "location"("id")
);

CREATE INDEX "idx_asset_asset_category_id" ON "asset" ("asset_category_id");
CREATE INDEX "idx_asset_location_id" ON "asset" ("location_id");

-- Table: resource
CREATE TABLE "resource" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "product_id" TEXT NOT NULL,
  CONSTRAINT "fk_resource_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id")
);

CREATE INDEX "idx_resource_product_id" ON "resource" ("product_id");

-- Table: event
CREATE TABLE "event" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "start_date_time_utc" BIGINT NOT NULL,
  "end_date_time_utc" BIGINT NOT NULL,
  "timezone" TEXT NOT NULL
);

-- Table: inventory_depreciation
CREATE TABLE "inventory_depreciation" (
  "id" TEXT PRIMARY KEY,
  "inventory_item_id" TEXT NOT NULL,
  "method" TEXT NOT NULL,
  "cost_basis" DOUBLE PRECISION NOT NULL,
  "salvage_value" DOUBLE PRECISION NOT NULL,
  "useful_life_months" INTEGER NOT NULL,
  "start_date" TEXT NOT NULL,
  "accumulated_depreciation" DOUBLE PRECISION NOT NULL,
  "book_value" DOUBLE PRECISION NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_inventory_depreciation_inventory_item_id" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item"("id")
);

CREATE INDEX "idx_inventory_depreciation_inventory_item_id" ON "inventory_depreciation" ("inventory_item_id");

-- Table: asset_revaluation
CREATE TABLE "asset_revaluation" (
  "id" TEXT PRIMARY KEY,
  "asset_id" TEXT NOT NULL,
  "revaluation_date" BIGINT NOT NULL,
  "previous_carrying_amount" DOUBLE PRECISION NOT NULL,
  "new_fair_value" DOUBLE PRECISION NOT NULL,
  "revaluation_amount" DOUBLE PRECISION NOT NULL,
  "is_increase" BOOLEAN NOT NULL,
  "recognized_in_pnl" DOUBLE PRECISION NOT NULL,
  "recognized_in_oci" DOUBLE PRECISION NOT NULL,
  "revaluation_surplus_balance" DOUBLE PRECISION NOT NULL,
  "appraiser_name" TEXT NULL,
  "valuation_method" TEXT NULL,
  "journal_entry_id" TEXT NULL,
  "notes" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_asset_revaluation_asset_id" FOREIGN KEY ("asset_id") REFERENCES "asset"("id")
);

CREATE INDEX "idx_asset_revaluation_asset_id" ON "asset_revaluation" ("asset_id");

-- Table: plan
CREATE TABLE "plan" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "thumbnail_url" TEXT NULL,
  "fulfillment_type" TEXT NULL
);

-- Table: client_category
CREATE TABLE "client_category" (
  "id" TEXT PRIMARY KEY,
  "client_id" TEXT NOT NULL,
  "category_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_client_category_client_id" FOREIGN KEY ("client_id") REFERENCES "client"("id"),
  CONSTRAINT "fk_client_category_category_id" FOREIGN KEY ("category_id") REFERENCES "category"("id"),
  CONSTRAINT "uq_client_category_1" UNIQUE ("client_id", "category_id")
);

CREATE INDEX "idx_client_category_client_id" ON "client_category" ("client_id");
CREATE INDEX "idx_client_category_category_id" ON "client_category" ("category_id");
