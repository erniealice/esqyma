-- Migration: workspace_isolation (up)
-- Dialect: postgres
-- Date: 2026-04-06
-- Adds workspace_id TEXT NOT NULL DEFAULT 'default-workspace' to all 127 tables
-- that require workspace isolation for multi-tenant support.
--
-- Global tables (NO workspace_id): user, workspace, workspace_user,
--   workspace_user_role, admin
--
-- Already have workspace_id (SKIP): activity_execution_log, attachment, event,
--   event_attendee, event_occurrence, event_recurrence, event_resource,
--   fulfillment, integration_config, inventory_movement, job, job_activity,
--   job_settlement, job_template, outcome_criteria, permission, role, session,
--   workflow, workflow_template, workspace_user

BEGIN;

-- ============================================================
-- PART 1: ADD COLUMN workspace_id to 127 tables
-- ============================================================

ALTER TABLE "account"                        ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "account_group"                  ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "account_template"               ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "activity"                       ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "activity_expense"               ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "activity_labor"                 ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "activity_material"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "activity_template"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "asset"                          ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "asset_category"                 ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "asset_component"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "asset_disposal"                 ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "asset_location"                 ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "asset_maintenance"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "asset_revaluation"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "asset_transaction"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "attribute"                      ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "attribute_value"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "balance"                        ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "balance_attribute"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "category"                       ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "client"                         ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "client_attribute"               ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "client_category"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "collection"                     ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "collection_attribute"           ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "collection_method"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "collection_parent"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "collection_plan"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "collection_schedule"            ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "criteria_option"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "criteria_threshold"             ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "deferred_revenue"               ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "delegate"                       ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "delegate_attribute"             ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "delegate_client"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "depreciation_schedule"          ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "equity_account"                 ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "equity_transaction"             ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "event_attribute"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "event_client"                   ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "event_product"                  ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "event_settings"                 ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "expenditure"                    ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "expenditure_category"           ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "expenditure_line_item"          ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "fiscal_period"                  ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "fulfillment_item"               ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "fulfillment_return"             ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "fulfillment_return_item"        ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "fulfillment_status_event"       ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "group"                          ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "group_attribute"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "inventory_attribute"            ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "inventory_depreciation"         ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "inventory_item"                 ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "inventory_serial"               ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "inventory_serial_history"       ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "invoice"                        ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "invoice_attribute"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "job_outcome_summary"            ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "job_phase"                      ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "job_task"                       ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "job_template_phase"             ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "job_template_task"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "journal_entry"                  ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "journal_line"                   ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "license"                        ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "license_history"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "line"                           ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "loan"                           ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "loan_payment"                   ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "location"                       ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "location_area"                  ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "location_attribute"             ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "payment"                        ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "payment_attribute"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "payment_method"                 ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "payment_profile"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "payment_profile_payment_method" ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "payment_term"                   ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "payroll_remittance"             ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "payroll_run"                    ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "petty_cash_fund"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "petty_cash_replenishment"       ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "petty_cash_voucher"             ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "phase_outcome_summary"          ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "plan"                           ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "plan_attribute"                 ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "plan_location"                  ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "plan_settings"                  ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "prepayment"                     ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "price_list"                     ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "price_plan"                     ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "price_product"                  ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "product"                        ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "product_attribute"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "product_collection"             ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "product_line"                   ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "product_option"                 ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "product_option_value"           ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "product_plan"                   ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "product_price_plan"             ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "product_variant"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "product_variant_image"          ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "product_variant_option"         ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "recurring_journal_template"     ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "resource"                       ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "revenue"                        ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "revenue_category"               ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "revenue_line_item"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "revenue_payment"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "role_permission"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "security_deposit"               ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "staff"                          ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "staff_attribute"                ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "stage"                          ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "stage_template"                 ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "subscription"                   ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "subscription_attribute"         ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "supplier"                       ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "supplier_attribute"             ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "supplier_category"              ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "task_outcome"                   ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "task_outcome_check"             ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "template_task_criteria"         ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "treasury_collection"            ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
ALTER TABLE "treasury_disbursement"          ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';

-- purchase_order may not exist in all verticals
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'purchase_order') THEN
    ALTER TABLE "purchase_order" ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NOT NULL DEFAULT 'default-workspace';
  END IF;
END $$;

-- ============================================================
-- PART 2: CREATE INDEX idx_{table}_workspace_id (127 tables)
-- ============================================================

CREATE INDEX IF NOT EXISTS "idx_account_workspace_id"                        ON "account"                        (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_account_group_workspace_id"                  ON "account_group"                  (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_account_template_workspace_id"               ON "account_template"               (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_activity_workspace_id"                       ON "activity"                       (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_activity_expense_workspace_id"               ON "activity_expense"               (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_activity_labor_workspace_id"                 ON "activity_labor"                 (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_activity_material_workspace_id"              ON "activity_material"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_activity_template_workspace_id"              ON "activity_template"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_asset_workspace_id"                          ON "asset"                          (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_asset_category_workspace_id"                 ON "asset_category"                 (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_asset_component_workspace_id"                ON "asset_component"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_asset_disposal_workspace_id"                 ON "asset_disposal"                 (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_asset_location_workspace_id"                 ON "asset_location"                 (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_asset_maintenance_workspace_id"              ON "asset_maintenance"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_asset_revaluation_workspace_id"              ON "asset_revaluation"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_asset_transaction_workspace_id"              ON "asset_transaction"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_attribute_workspace_id"                      ON "attribute"                      (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_attribute_value_workspace_id"                ON "attribute_value"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_balance_workspace_id"                        ON "balance"                        (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_balance_attribute_workspace_id"              ON "balance_attribute"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_category_workspace_id"                       ON "category"                       (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_client_workspace_id"                         ON "client"                         (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_client_attribute_workspace_id"               ON "client_attribute"               (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_client_category_workspace_id"                ON "client_category"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_collection_workspace_id"                     ON "collection"                     (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_collection_attribute_workspace_id"           ON "collection_attribute"           (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_collection_method_workspace_id"              ON "collection_method"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_collection_parent_workspace_id"              ON "collection_parent"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_collection_plan_workspace_id"                ON "collection_plan"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_collection_schedule_workspace_id"            ON "collection_schedule"            (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_criteria_option_workspace_id"                ON "criteria_option"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_criteria_threshold_workspace_id"             ON "criteria_threshold"             (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_deferred_revenue_workspace_id"               ON "deferred_revenue"               (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_delegate_workspace_id"                       ON "delegate"                       (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_delegate_attribute_workspace_id"             ON "delegate_attribute"             (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_delegate_client_workspace_id"                ON "delegate_client"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_depreciation_schedule_workspace_id"          ON "depreciation_schedule"          (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_equity_account_workspace_id"                 ON "equity_account"                 (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_equity_transaction_workspace_id"             ON "equity_transaction"             (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_event_attribute_workspace_id"                ON "event_attribute"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_event_client_workspace_id"                   ON "event_client"                   (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_event_product_workspace_id"                  ON "event_product"                  (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_event_settings_workspace_id"                 ON "event_settings"                 (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_expenditure_workspace_id"                    ON "expenditure"                    (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_expenditure_category_workspace_id"           ON "expenditure_category"           (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_expenditure_line_item_workspace_id"          ON "expenditure_line_item"          (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_fiscal_period_workspace_id"                  ON "fiscal_period"                  (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_fulfillment_item_workspace_id"               ON "fulfillment_item"               (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_fulfillment_return_workspace_id"             ON "fulfillment_return"             (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_fulfillment_return_item_workspace_id"        ON "fulfillment_return_item"        (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_fulfillment_status_event_workspace_id"       ON "fulfillment_status_event"       (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_group_workspace_id"                          ON "group"                          (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_group_attribute_workspace_id"                ON "group_attribute"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_inventory_attribute_workspace_id"            ON "inventory_attribute"            (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_inventory_depreciation_workspace_id"         ON "inventory_depreciation"         (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_inventory_item_workspace_id"                 ON "inventory_item"                 (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_inventory_serial_workspace_id"               ON "inventory_serial"               (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_inventory_serial_history_workspace_id"       ON "inventory_serial_history"       (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_invoice_workspace_id"                        ON "invoice"                        (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_invoice_attribute_workspace_id"              ON "invoice_attribute"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_job_outcome_summary_workspace_id"            ON "job_outcome_summary"            (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_job_phase_workspace_id"                      ON "job_phase"                      (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_job_task_workspace_id"                       ON "job_task"                       (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_job_template_phase_workspace_id"             ON "job_template_phase"             (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_job_template_task_workspace_id"              ON "job_template_task"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_journal_entry_workspace_id"                  ON "journal_entry"                  (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_journal_line_workspace_id"                   ON "journal_line"                   (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_license_workspace_id"                        ON "license"                        (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_license_history_workspace_id"                ON "license_history"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_line_workspace_id"                           ON "line"                           (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_loan_workspace_id"                           ON "loan"                           (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_loan_payment_workspace_id"                   ON "loan_payment"                   (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_location_workspace_id"                       ON "location"                       (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_location_area_workspace_id"                  ON "location_area"                  (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_location_attribute_workspace_id"             ON "location_attribute"             (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_payment_workspace_id"                        ON "payment"                        (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_payment_attribute_workspace_id"              ON "payment_attribute"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_payment_method_workspace_id"                 ON "payment_method"                 (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_payment_profile_workspace_id"                ON "payment_profile"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_payment_profile_payment_method_workspace_id" ON "payment_profile_payment_method" (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_payment_term_workspace_id"                   ON "payment_term"                   (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_payroll_remittance_workspace_id"             ON "payroll_remittance"             (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_payroll_run_workspace_id"                    ON "payroll_run"                    (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_petty_cash_fund_workspace_id"                ON "petty_cash_fund"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_petty_cash_replenishment_workspace_id"       ON "petty_cash_replenishment"       (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_petty_cash_voucher_workspace_id"             ON "petty_cash_voucher"             (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_phase_outcome_summary_workspace_id"          ON "phase_outcome_summary"          (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_plan_workspace_id"                           ON "plan"                           (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_plan_attribute_workspace_id"                 ON "plan_attribute"                 (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_plan_location_workspace_id"                  ON "plan_location"                  (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_plan_settings_workspace_id"                  ON "plan_settings"                  (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_prepayment_workspace_id"                     ON "prepayment"                     (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_price_list_workspace_id"                     ON "price_list"                     (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_price_plan_workspace_id"                     ON "price_plan"                     (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_price_product_workspace_id"                  ON "price_product"                  (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_product_workspace_id"                        ON "product"                        (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_product_attribute_workspace_id"              ON "product_attribute"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_product_collection_workspace_id"             ON "product_collection"             (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_product_line_workspace_id"                   ON "product_line"                   (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_product_option_workspace_id"                 ON "product_option"                 (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_product_option_value_workspace_id"           ON "product_option_value"           (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_product_plan_workspace_id"                   ON "product_plan"                   (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_product_price_plan_workspace_id"             ON "product_price_plan"             (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_product_variant_workspace_id"                ON "product_variant"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_product_variant_image_workspace_id"          ON "product_variant_image"          (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_product_variant_option_workspace_id"         ON "product_variant_option"         (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_recurring_journal_template_workspace_id"     ON "recurring_journal_template"     (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_resource_workspace_id"                       ON "resource"                       (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_revenue_workspace_id"                        ON "revenue"                        (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_revenue_category_workspace_id"               ON "revenue_category"               (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_revenue_line_item_workspace_id"              ON "revenue_line_item"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_revenue_payment_workspace_id"                ON "revenue_payment"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_role_permission_workspace_id"                ON "role_permission"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_security_deposit_workspace_id"               ON "security_deposit"               (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_staff_workspace_id"                          ON "staff"                          (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_staff_attribute_workspace_id"                ON "staff_attribute"                (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_stage_workspace_id"                          ON "stage"                          (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_stage_template_workspace_id"                 ON "stage_template"                 (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_subscription_workspace_id"                   ON "subscription"                   (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_subscription_attribute_workspace_id"         ON "subscription_attribute"         (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_supplier_workspace_id"                       ON "supplier"                       (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_supplier_attribute_workspace_id"             ON "supplier_attribute"             (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_supplier_category_workspace_id"              ON "supplier_category"              (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_task_outcome_workspace_id"                   ON "task_outcome"                   (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_task_outcome_check_workspace_id"             ON "task_outcome_check"             (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_template_task_criteria_workspace_id"         ON "template_task_criteria"         (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_treasury_collection_workspace_id"            ON "treasury_collection"            (workspace_id);
CREATE INDEX IF NOT EXISTS "idx_treasury_disbursement_workspace_id"          ON "treasury_disbursement"          (workspace_id);

-- purchase_order index (conditional)
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'purchase_order') THEN
    CREATE INDEX IF NOT EXISTS "idx_purchase_order_workspace_id" ON "purchase_order" (workspace_id);
  END IF;
END $$;

-- ============================================================
-- PART 3: Fix UNIQUE constraints — make them composite with workspace_id
--
-- Bare UNIQUE constraints were defined inline (no explicit name), so PostgreSQL
-- auto-named them as "{table}_{col}_key". Drop by system name and recreate as
-- composite UNIQUE INDEX for idempotency.
-- ============================================================

-- client.internal_id → UNIQUE(internal_id, workspace_id)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'client_internal_id_key' AND conrelid = 'client'::regclass
  ) THEN
    ALTER TABLE "client" DROP CONSTRAINT "client_internal_id_key";
  END IF;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS "uq_client_internal_id_workspace"
  ON "client" (internal_id, workspace_id);

-- supplier.internal_id → UNIQUE(internal_id, workspace_id)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'supplier_internal_id_key' AND conrelid = 'supplier'::regclass
  ) THEN
    ALTER TABLE "supplier" DROP CONSTRAINT "supplier_internal_id_key";
  END IF;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS "uq_supplier_internal_id_workspace"
  ON "supplier" (internal_id, workspace_id);

-- account.code → UNIQUE(code, workspace_id)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'account_code_key' AND conrelid = 'account'::regclass
  ) THEN
    ALTER TABLE "account" DROP CONSTRAINT "account_code_key";
  END IF;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS "uq_account_code_workspace"
  ON "account" (code, workspace_id);

-- payment_term.code → UNIQUE(code, workspace_id)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'payment_term_code_key' AND conrelid = 'payment_term'::regclass
  ) THEN
    ALTER TABLE "payment_term" DROP CONSTRAINT "payment_term_code_key";
  END IF;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS "uq_payment_term_code_workspace"
  ON "payment_term" (code, workspace_id);

-- asset_category.code → UNIQUE(code, workspace_id)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'asset_category_code_key' AND conrelid = 'asset_category'::regclass
  ) THEN
    ALTER TABLE "asset_category" DROP CONSTRAINT "asset_category_code_key";
  END IF;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS "uq_asset_category_code_workspace"
  ON "asset_category" (code, workspace_id);

-- journal_entry.entry_number → UNIQUE(entry_number, workspace_id)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'journal_entry_entry_number_key' AND conrelid = 'journal_entry'::regclass
  ) THEN
    ALTER TABLE "journal_entry" DROP CONSTRAINT "journal_entry_entry_number_key";
  END IF;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS "uq_journal_entry_entry_number_workspace"
  ON "journal_entry" (entry_number, workspace_id);

-- loan.loan_number → UNIQUE(loan_number, workspace_id)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'loan_loan_number_key' AND conrelid = 'loan'::regclass
  ) THEN
    ALTER TABLE "loan" DROP CONSTRAINT "loan_loan_number_key";
  END IF;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS "uq_loan_loan_number_workspace"
  ON "loan" (loan_number, workspace_id);

-- asset.asset_number → UNIQUE(asset_number, workspace_id)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'asset_asset_number_key' AND conrelid = 'asset'::regclass
  ) THEN
    ALTER TABLE "asset" DROP CONSTRAINT "asset_asset_number_key";
  END IF;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS "uq_asset_asset_number_workspace"
  ON "asset" (asset_number, workspace_id);

-- inventory_serial.serial_number → UNIQUE(serial_number, workspace_id)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'inventory_serial_serial_number_key' AND conrelid = 'inventory_serial'::regclass
  ) THEN
    ALTER TABLE "inventory_serial" DROP CONSTRAINT "inventory_serial_serial_number_key";
  END IF;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS "uq_inventory_serial_serial_number_workspace"
  ON "inventory_serial" (serial_number, workspace_id);

-- subscription.code — partial unique index (WHERE code IS NOT NULL)
-- Drop the old bare partial index and recreate as composite partial.
DROP INDEX IF EXISTS "idx_subscription_code";
CREATE UNIQUE INDEX IF NOT EXISTS "uq_subscription_code_workspace"
  ON "subscription" (code, workspace_id) WHERE code IS NOT NULL;

-- purchase_order.po_number → UNIQUE(po_number, workspace_id)
-- Table may not exist in all verticals; check before operating.
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'purchase_order') THEN
    IF EXISTS (
      SELECT 1 FROM pg_constraint
      WHERE conname = 'purchase_order_po_number_key' AND conrelid = 'purchase_order'::regclass
    ) THEN
      ALTER TABLE "purchase_order" DROP CONSTRAINT "purchase_order_po_number_key";
    END IF;
    CREATE UNIQUE INDEX IF NOT EXISTS "uq_purchase_order_po_number_workspace"
      ON "purchase_order" (po_number, workspace_id);
  END IF;
END $$;

COMMIT;
