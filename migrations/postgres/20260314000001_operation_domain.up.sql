-- Migration: operation_domain (up)
-- Dialect: postgres
-- Creates Layers 2-6 operation domain tables ordered by FK dependencies.
-- Referenced tables assumed to exist: workspace, client, location, product, staff, inventory_serial
-- Note: inventory_item FK in inventory_movement is commented out — table not found in any migration.

-- ============================================
-- LEVEL 0: Independent tables
-- ============================================

-- Table: job_template
CREATE TABLE IF NOT EXISTS "job_template" (
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

CREATE INDEX IF NOT EXISTS "idx_job_template_workspace_id" ON "job_template" ("workspace_id");

-- ============================================
-- LEVEL 1: Depends on job_template
-- ============================================

-- Table: job_template_phase
CREATE TABLE IF NOT EXISTS "job_template_phase" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "job_template_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "phase_order" INTEGER NOT NULL,
  CONSTRAINT "fk_job_template_phase_job_template_id" FOREIGN KEY ("job_template_id") REFERENCES "job_template"("id")
);

CREATE INDEX IF NOT EXISTS "idx_job_template_phase_job_template_id" ON "job_template_phase" ("job_template_id");

-- ============================================
-- LEVEL 2: Depends on job_template_phase
-- ============================================

-- Table: job_template_task
CREATE TABLE IF NOT EXISTS "job_template_task" (
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

CREATE INDEX IF NOT EXISTS "idx_job_template_task_job_template_phase_id" ON "job_template_task" ("job_template_phase_id");

-- ============================================
-- LEVEL 3: job (depends on job_template, client, location, workspace)
-- ============================================

-- Table: job
CREATE TABLE IF NOT EXISTS "job" (
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

CREATE INDEX IF NOT EXISTS "idx_job_job_template_id" ON "job" ("job_template_id");
CREATE INDEX IF NOT EXISTS "idx_job_client_id" ON "job" ("client_id");
CREATE INDEX IF NOT EXISTS "idx_job_location_id" ON "job" ("location_id");
CREATE INDEX IF NOT EXISTS "idx_job_workspace_id" ON "job" ("workspace_id");

-- ============================================
-- LEVEL 4: Depends on job
-- ============================================

-- Table: job_phase
CREATE TABLE IF NOT EXISTS "job_phase" (
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

CREATE INDEX IF NOT EXISTS "idx_job_phase_job_id" ON "job_phase" ("job_id");

-- ============================================
-- LEVEL 5: Depends on job_phase
-- ============================================

-- Table: job_task
CREATE TABLE IF NOT EXISTS "job_task" (
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

CREATE INDEX IF NOT EXISTS "idx_job_task_job_phase_id" ON "job_task" ("job_phase_id");
CREATE INDEX IF NOT EXISTS "idx_job_task_assigned_to" ON "job_task" ("assigned_to");

-- ============================================
-- LEVEL 6: job_activity (depends on job, job_task, workspace)
-- ============================================

-- Table: job_activity
CREATE TABLE IF NOT EXISTS "job_activity" (
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

CREATE INDEX IF NOT EXISTS "idx_job_activity_job_id" ON "job_activity" ("job_id");
CREATE INDEX IF NOT EXISTS "idx_job_activity_job_task_id" ON "job_activity" ("job_task_id");
CREATE INDEX IF NOT EXISTS "idx_job_activity_workspace_id" ON "job_activity" ("workspace_id");

-- ============================================
-- LEVEL 7: activity sub-tables (depend on job_activity)
-- ============================================

-- Table: activity_labor
CREATE TABLE IF NOT EXISTS "activity_labor" (
  "activity_id" TEXT NOT NULL,
  "staff_id" TEXT NOT NULL,
  "hours" DOUBLE PRECISION NOT NULL,
  "rate_type" TEXT NOT NULL,
  "time_start" BIGINT NULL,
  "time_end" BIGINT NULL,
  CONSTRAINT "fk_activity_labor_activity_id" FOREIGN KEY ("activity_id") REFERENCES "job_activity"("id"),
  CONSTRAINT "fk_activity_labor_staff_id" FOREIGN KEY ("staff_id") REFERENCES "staff"("id")
);

CREATE INDEX IF NOT EXISTS "idx_activity_labor_staff_id" ON "activity_labor" ("staff_id");

-- Table: activity_material
CREATE TABLE IF NOT EXISTS "activity_material" (
  "activity_id" TEXT NOT NULL,
  "product_id" TEXT NOT NULL,
  "unit_of_measure" TEXT NOT NULL,
  "lot_number" TEXT NULL,
  "location_id" TEXT NULL,
  CONSTRAINT "fk_activity_material_activity_id" FOREIGN KEY ("activity_id") REFERENCES "job_activity"("id"),
  CONSTRAINT "fk_activity_material_product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id"),
  CONSTRAINT "fk_activity_material_location_id" FOREIGN KEY ("location_id") REFERENCES "location"("id")
);

CREATE INDEX IF NOT EXISTS "idx_activity_material_product_id" ON "activity_material" ("product_id");
CREATE INDEX IF NOT EXISTS "idx_activity_material_location_id" ON "activity_material" ("location_id");

-- Table: activity_expense
CREATE TABLE IF NOT EXISTS "activity_expense" (
  "activity_id" TEXT NOT NULL,
  "expense_category" TEXT NOT NULL,
  "vendor_ref" TEXT NULL,
  "receipt_url" TEXT NULL,
  "reimbursable" BOOLEAN NOT NULL,
  CONSTRAINT "fk_activity_expense_activity_id" FOREIGN KEY ("activity_id") REFERENCES "job_activity"("id")
);

-- Table: job_settlement (depends on job_activity, workspace)
CREATE TABLE IF NOT EXISTS "job_settlement" (
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

CREATE INDEX IF NOT EXISTS "idx_job_settlement_job_activity_id" ON "job_settlement" ("job_activity_id");
CREATE INDEX IF NOT EXISTS "idx_job_settlement_workspace_id" ON "job_settlement" ("workspace_id");

-- ============================================
-- LEVEL 8: inventory_movement (depends on job, job_activity, product, location, workspace)
-- Note: inventory_item FK commented out — "inventory_item" table not found in any migration.
--       inventory_serial FK kept — table is defined in 0001_initial.sql (line 1588).
-- ============================================

-- Table: inventory_movement
CREATE TABLE IF NOT EXISTS "inventory_movement" (
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
  -- CONSTRAINT "fk_inventory_movement_inventory_item_id" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item"("id"),
  CONSTRAINT "fk_inventory_movement_inventory_serial_id" FOREIGN KEY ("inventory_serial_id") REFERENCES "inventory_serial"("id"),
  CONSTRAINT "fk_inventory_movement_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);

CREATE INDEX IF NOT EXISTS "idx_inventory_movement_product_id" ON "inventory_movement" ("product_id");
CREATE INDEX IF NOT EXISTS "idx_inventory_movement_job_id" ON "inventory_movement" ("job_id");
CREATE INDEX IF NOT EXISTS "idx_inventory_movement_job_activity_id" ON "inventory_movement" ("job_activity_id");
CREATE INDEX IF NOT EXISTS "idx_inventory_movement_inventory_item_id" ON "inventory_movement" ("inventory_item_id");
CREATE INDEX IF NOT EXISTS "idx_inventory_movement_inventory_serial_id" ON "inventory_movement" ("inventory_serial_id");
CREATE INDEX IF NOT EXISTS "idx_inventory_movement_workspace_id" ON "inventory_movement" ("workspace_id");
