-- Migration: initial (up)
-- Dialect: postgres
-- Tables ordered by foreign key dependencies (topological sort)

-- ============================================
-- LEVEL 0: Base tables (no foreign keys)
-- ============================================

-- Table: user
CREATE TABLE "user" (
  "id" TEXT PRIMARY KEY,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "email_address" TEXT NOT NULL UNIQUE,
  "mobile_number" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true
);
CREATE INDEX "idx_user_mobile_number" ON "user" ("mobile_number");

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

-- Table: group
CREATE TABLE "group" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true
);

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

-- Table: product
CREATE TABLE "product" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL
);

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

-- Table: collection
CREATE TABLE "collection" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true
);

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

-- Table: payment_method
CREATE TABLE "payment_method" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "provider_name" TEXT NULL
);

-- Table: category (self-referential, parent_id nullable)
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

-- Table: event_recurrence (referenced by event_settings but was missing)
CREATE TABLE "event_recurrence" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "recurrence_pattern" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true
);

-- ============================================
-- LEVEL 1: Tables depending only on Level 0
-- ============================================

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

-- Table: product_attribute
CREATE TABLE "product_attribute" (
  "id" TEXT PRIMARY KEY,
  "product_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_product_attribute_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id"),
  CONSTRAINT "fk_product_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_product_attribute_1" UNIQUE ("product_id", "attribute_id")
);
CREATE INDEX "idx_product_attribute_product_id" ON "product_attribute" ("product_id");
CREATE INDEX "idx_product_attribute_attribute_id" ON "product_attribute" ("attribute_id");

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
  CONSTRAINT "fk_price_product_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id")
);
CREATE INDEX "idx_price_product_product_id" ON "price_product" ("product_id");

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

-- ============================================
-- LEVEL 2: Workspace/Workflow (circular deps handled)
-- ============================================

-- Create workspace first WITHOUT FK to workflow_template
CREATE TABLE "workspace" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "private" BOOLEAN NOT NULL,
  "workflow_template_id" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true
);

-- Create workflow_template WITH FK to workspace
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

-- Now add FK from workspace to workflow_template
ALTER TABLE "workspace" ADD CONSTRAINT "fk_workspace_workflow_template_id" FOREIGN KEY ("workflow_template_id") REFERENCES "workflow_template"("id");
CREATE INDEX "idx_workspace_workflow_template_id" ON "workspace" ("workflow_template_id");

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
  CONSTRAINT "fk_permission_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_permission_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id"),
  CONSTRAINT "fk_permission_granted_by_user_id" FOREIGN KEY ("granted_by_user_id") REFERENCES "user"("id")
);
CREATE INDEX "idx_permission_workspace_id" ON "permission" ("workspace_id");
CREATE INDEX "idx_permission_user_id" ON "permission" ("user_id");
CREATE INDEX "idx_permission_granted_by_user_id" ON "permission" ("granted_by_user_id");

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

-- ============================================
-- LEVEL 3: Tables depending on Level 2
-- ============================================

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

-- ============================================
-- LEVEL 4: Tables depending on Level 3
-- ============================================

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

-- ============================================
-- LEVEL 5: Tables depending on Level 4
-- ============================================

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

-- ============================================
-- CLIENT/SUBSCRIPTION chain
-- ============================================

-- Table: client (depends on user, but client_category has circular dep)
-- Create client first WITHOUT FK to client_category
CREATE TABLE "client" (
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "internal_id" TEXT NOT NULL UNIQUE,
  "category_id" TEXT NULL,
  CONSTRAINT "fk_client_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id")
);
CREATE INDEX "idx_client_user_id" ON "client" ("user_id");

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

-- Add FK from client to client_category
ALTER TABLE "client" ADD CONSTRAINT "fk_client_category_id" FOREIGN KEY ("category_id") REFERENCES "client_category"("id");

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

-- Table: payment_profile
CREATE TABLE "payment_profile" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "client_id" TEXT NOT NULL,
  "payment_method_id" TEXT NOT NULL,
  CONSTRAINT "fk_payment_profile_client_id" FOREIGN KEY ("client_id") REFERENCES "client"("id"),
  CONSTRAINT "fk_payment_profile_payment_method_id" FOREIGN KEY ("payment_method_id") REFERENCES "payment_method"("id")
);
CREATE INDEX "idx_payment_profile_client_id" ON "payment_profile" ("client_id");
CREATE INDEX "idx_payment_profile_payment_method_id" ON "payment_profile" ("payment_method_id");

-- Table: payment_profile_payment_method
CREATE TABLE "payment_profile_payment_method" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "payment_profile_id" TEXT NOT NULL,
  "payment_method_id" TEXT NOT NULL,
  "primary" BOOLEAN NOT NULL,
  "notes" TEXT NULL,
  "display_order" INTEGER NULL,
  "payment_identifier" TEXT NOT NULL,
  "identifier_type" TEXT NOT NULL,
  "display_name" TEXT NULL,
  "masked" BOOLEAN NOT NULL,
  CONSTRAINT "fk_payment_profile_payment_method_payment_profile_id" FOREIGN KEY ("payment_profile_id") REFERENCES "payment_profile"("id"),
  CONSTRAINT "fk_payment_profile_payment_method_payment_method_id" FOREIGN KEY ("payment_method_id") REFERENCES "payment_method"("id"),
  CONSTRAINT "uq_payment_profile_payment_method_1" UNIQUE ("payment_profile_id", "payment_method_id")
);
CREATE INDEX "idx_payment_profile_payment_method_payment_profile_id" ON "payment_profile_payment_method" ("payment_profile_id");
CREATE INDEX "idx_payment_profile_payment_method_payment_method_id" ON "payment_profile_payment_method" ("payment_method_id");

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

-- Table: payment
CREATE TABLE "payment" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "subscription_id" TEXT NOT NULL,
  "amount" DOUBLE PRECISION NOT NULL,
  "status" TEXT NOT NULL,
  CONSTRAINT "fk_payment_subscription_id" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id")
);
CREATE INDEX "idx_payment_subscription_id" ON "payment" ("subscription_id");

-- Table: payment_attribute
CREATE TABLE "payment_attribute" (
  "id" TEXT PRIMARY KEY,
  "payment_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_payment_attribute_payment_id" FOREIGN KEY ("payment_id") REFERENCES "payment"("id"),
  CONSTRAINT "fk_payment_attribute_attribute_id" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id"),
  CONSTRAINT "uq_payment_attribute_1" UNIQUE ("payment_id", "attribute_id")
);
CREATE INDEX "idx_payment_attribute_payment_id" ON "payment_attribute" ("payment_id");
CREATE INDEX "idx_payment_attribute_attribute_id" ON "payment_attribute" ("attribute_id");

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
