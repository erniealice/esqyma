-- Migration: workspace_isolation (down)
-- Dialect: postgres
-- Date: 2026-04-06
-- Reverses workspace_isolation.up.sql:
--   1. Restore original bare UNIQUE constraints / indexes
--   2. Drop composite UNIQUE indexes
--   3. Drop workspace_id indexes
--   4. Drop workspace_id columns (including purchase_order via IF EXISTS)

BEGIN;

-- ============================================================
-- PART 1: Restore original UNIQUE constraints
-- (Recreate bare single-column UNIQUEs before dropping composite indexes)
-- ============================================================

-- subscription.code — restore bare partial unique index
DROP INDEX IF EXISTS "uq_subscription_code_workspace";
CREATE UNIQUE INDEX IF NOT EXISTS "idx_subscription_code"
  ON "subscription" ("code") WHERE "code" IS NOT NULL;

-- inventory_serial.serial_number
DROP INDEX IF EXISTS "uq_inventory_serial_serial_number_workspace";
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'inventory_serial_serial_number_key' AND conrelid = 'inventory_serial'::regclass
  ) THEN
    ALTER TABLE "inventory_serial" ADD CONSTRAINT "inventory_serial_serial_number_key"
      UNIQUE (serial_number);
  END IF;
END $$;

-- asset.asset_number
DROP INDEX IF EXISTS "uq_asset_asset_number_workspace";
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'asset_asset_number_key' AND conrelid = 'asset'::regclass
  ) THEN
    ALTER TABLE "asset" ADD CONSTRAINT "asset_asset_number_key" UNIQUE (asset_number);
  END IF;
END $$;

-- loan.loan_number
DROP INDEX IF EXISTS "uq_loan_loan_number_workspace";
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'loan_loan_number_key' AND conrelid = 'loan'::regclass
  ) THEN
    ALTER TABLE "loan" ADD CONSTRAINT "loan_loan_number_key" UNIQUE (loan_number);
  END IF;
END $$;

-- purchase_order.po_number (conditional)
DROP INDEX IF EXISTS "uq_purchase_order_po_number_workspace";
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'purchase_order') THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint
      WHERE conname = 'purchase_order_po_number_key' AND conrelid = 'purchase_order'::regclass
    ) THEN
      ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_po_number_key" UNIQUE (po_number);
    END IF;
  END IF;
END $$;

-- journal_entry.entry_number
DROP INDEX IF EXISTS "uq_journal_entry_entry_number_workspace";
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'journal_entry_entry_number_key' AND conrelid = 'journal_entry'::regclass
  ) THEN
    ALTER TABLE "journal_entry" ADD CONSTRAINT "journal_entry_entry_number_key" UNIQUE (entry_number);
  END IF;
END $$;

-- asset_category.code
DROP INDEX IF EXISTS "uq_asset_category_code_workspace";
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'asset_category_code_key' AND conrelid = 'asset_category'::regclass
  ) THEN
    ALTER TABLE "asset_category" ADD CONSTRAINT "asset_category_code_key" UNIQUE (code);
  END IF;
END $$;

-- payment_term.code
DROP INDEX IF EXISTS "uq_payment_term_code_workspace";
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'payment_term_code_key' AND conrelid = 'payment_term'::regclass
  ) THEN
    ALTER TABLE "payment_term" ADD CONSTRAINT "payment_term_code_key" UNIQUE (code);
  END IF;
END $$;

-- account.code
DROP INDEX IF EXISTS "uq_account_code_workspace";
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'account_code_key' AND conrelid = 'account'::regclass
  ) THEN
    ALTER TABLE "account" ADD CONSTRAINT "account_code_key" UNIQUE (code);
  END IF;
END $$;

-- supplier.internal_id
DROP INDEX IF EXISTS "uq_supplier_internal_id_workspace";
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'supplier_internal_id_key' AND conrelid = 'supplier'::regclass
  ) THEN
    ALTER TABLE "supplier" ADD CONSTRAINT "supplier_internal_id_key" UNIQUE (internal_id);
  END IF;
END $$;

-- client.internal_id
DROP INDEX IF EXISTS "uq_client_internal_id_workspace";
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'client_internal_id_key' AND conrelid = 'client'::regclass
  ) THEN
    ALTER TABLE "client" ADD CONSTRAINT "client_internal_id_key" UNIQUE (internal_id);
  END IF;
END $$;

-- ============================================================
-- PART 2: Drop workspace_id indexes (127 tables + purchase_order)
-- ============================================================

DROP INDEX IF EXISTS "idx_account_workspace_id";
DROP INDEX IF EXISTS "idx_account_group_workspace_id";
DROP INDEX IF EXISTS "idx_account_template_workspace_id";
DROP INDEX IF EXISTS "idx_activity_workspace_id";
DROP INDEX IF EXISTS "idx_activity_expense_workspace_id";
DROP INDEX IF EXISTS "idx_activity_labor_workspace_id";
DROP INDEX IF EXISTS "idx_activity_material_workspace_id";
DROP INDEX IF EXISTS "idx_activity_template_workspace_id";
DROP INDEX IF EXISTS "idx_asset_workspace_id";
DROP INDEX IF EXISTS "idx_asset_category_workspace_id";
DROP INDEX IF EXISTS "idx_asset_component_workspace_id";
DROP INDEX IF EXISTS "idx_asset_disposal_workspace_id";
DROP INDEX IF EXISTS "idx_asset_location_workspace_id";
DROP INDEX IF EXISTS "idx_asset_maintenance_workspace_id";
DROP INDEX IF EXISTS "idx_asset_revaluation_workspace_id";
DROP INDEX IF EXISTS "idx_asset_transaction_workspace_id";
DROP INDEX IF EXISTS "idx_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_attribute_value_workspace_id";
DROP INDEX IF EXISTS "idx_balance_workspace_id";
DROP INDEX IF EXISTS "idx_balance_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_category_workspace_id";
DROP INDEX IF EXISTS "idx_client_workspace_id";
DROP INDEX IF EXISTS "idx_client_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_client_category_workspace_id";
DROP INDEX IF EXISTS "idx_collection_workspace_id";
DROP INDEX IF EXISTS "idx_collection_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_collection_method_workspace_id";
DROP INDEX IF EXISTS "idx_collection_parent_workspace_id";
DROP INDEX IF EXISTS "idx_collection_plan_workspace_id";
DROP INDEX IF EXISTS "idx_collection_schedule_workspace_id";
DROP INDEX IF EXISTS "idx_criteria_option_workspace_id";
DROP INDEX IF EXISTS "idx_criteria_threshold_workspace_id";
DROP INDEX IF EXISTS "idx_deferred_revenue_workspace_id";
DROP INDEX IF EXISTS "idx_delegate_workspace_id";
DROP INDEX IF EXISTS "idx_delegate_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_delegate_client_workspace_id";
DROP INDEX IF EXISTS "idx_depreciation_schedule_workspace_id";
DROP INDEX IF EXISTS "idx_equity_account_workspace_id";
DROP INDEX IF EXISTS "idx_equity_transaction_workspace_id";
DROP INDEX IF EXISTS "idx_event_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_event_client_workspace_id";
DROP INDEX IF EXISTS "idx_event_product_workspace_id";
DROP INDEX IF EXISTS "idx_event_settings_workspace_id";
DROP INDEX IF EXISTS "idx_expenditure_workspace_id";
DROP INDEX IF EXISTS "idx_expenditure_category_workspace_id";
DROP INDEX IF EXISTS "idx_expenditure_line_item_workspace_id";
DROP INDEX IF EXISTS "idx_fiscal_period_workspace_id";
DROP INDEX IF EXISTS "idx_fulfillment_item_workspace_id";
DROP INDEX IF EXISTS "idx_fulfillment_return_workspace_id";
DROP INDEX IF EXISTS "idx_fulfillment_return_item_workspace_id";
DROP INDEX IF EXISTS "idx_fulfillment_status_event_workspace_id";
DROP INDEX IF EXISTS "idx_group_workspace_id";
DROP INDEX IF EXISTS "idx_group_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_inventory_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_inventory_depreciation_workspace_id";
DROP INDEX IF EXISTS "idx_inventory_item_workspace_id";
DROP INDEX IF EXISTS "idx_inventory_serial_workspace_id";
DROP INDEX IF EXISTS "idx_inventory_serial_history_workspace_id";
DROP INDEX IF EXISTS "idx_invoice_workspace_id";
DROP INDEX IF EXISTS "idx_invoice_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_job_outcome_summary_workspace_id";
DROP INDEX IF EXISTS "idx_job_phase_workspace_id";
DROP INDEX IF EXISTS "idx_job_task_workspace_id";
DROP INDEX IF EXISTS "idx_job_template_phase_workspace_id";
DROP INDEX IF EXISTS "idx_job_template_task_workspace_id";
DROP INDEX IF EXISTS "idx_journal_entry_workspace_id";
DROP INDEX IF EXISTS "idx_journal_line_workspace_id";
DROP INDEX IF EXISTS "idx_license_workspace_id";
DROP INDEX IF EXISTS "idx_license_history_workspace_id";
DROP INDEX IF EXISTS "idx_line_workspace_id";
DROP INDEX IF EXISTS "idx_loan_workspace_id";
DROP INDEX IF EXISTS "idx_loan_payment_workspace_id";
DROP INDEX IF EXISTS "idx_location_workspace_id";
DROP INDEX IF EXISTS "idx_location_area_workspace_id";
DROP INDEX IF EXISTS "idx_location_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_payment_workspace_id";
DROP INDEX IF EXISTS "idx_payment_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_payment_method_workspace_id";
DROP INDEX IF EXISTS "idx_payment_profile_workspace_id";
DROP INDEX IF EXISTS "idx_payment_profile_payment_method_workspace_id";
DROP INDEX IF EXISTS "idx_payment_term_workspace_id";
DROP INDEX IF EXISTS "idx_payroll_remittance_workspace_id";
DROP INDEX IF EXISTS "idx_payroll_run_workspace_id";
DROP INDEX IF EXISTS "idx_petty_cash_fund_workspace_id";
DROP INDEX IF EXISTS "idx_petty_cash_replenishment_workspace_id";
DROP INDEX IF EXISTS "idx_petty_cash_voucher_workspace_id";
DROP INDEX IF EXISTS "idx_phase_outcome_summary_workspace_id";
DROP INDEX IF EXISTS "idx_plan_workspace_id";
DROP INDEX IF EXISTS "idx_plan_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_plan_location_workspace_id";
DROP INDEX IF EXISTS "idx_plan_settings_workspace_id";
DROP INDEX IF EXISTS "idx_prepayment_workspace_id";
DROP INDEX IF EXISTS "idx_price_list_workspace_id";
DROP INDEX IF EXISTS "idx_price_plan_workspace_id";
DROP INDEX IF EXISTS "idx_price_product_workspace_id";
DROP INDEX IF EXISTS "idx_product_workspace_id";
DROP INDEX IF EXISTS "idx_product_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_product_collection_workspace_id";
DROP INDEX IF EXISTS "idx_product_line_workspace_id";
DROP INDEX IF EXISTS "idx_product_option_workspace_id";
DROP INDEX IF EXISTS "idx_product_option_value_workspace_id";
DROP INDEX IF EXISTS "idx_product_plan_workspace_id";
DROP INDEX IF EXISTS "idx_product_price_plan_workspace_id";
DROP INDEX IF EXISTS "idx_product_variant_workspace_id";
DROP INDEX IF EXISTS "idx_product_variant_image_workspace_id";
DROP INDEX IF EXISTS "idx_product_variant_option_workspace_id";
DROP INDEX IF EXISTS "idx_recurring_journal_template_workspace_id";
DROP INDEX IF EXISTS "idx_resource_workspace_id";
DROP INDEX IF EXISTS "idx_revenue_workspace_id";
DROP INDEX IF EXISTS "idx_revenue_category_workspace_id";
DROP INDEX IF EXISTS "idx_revenue_line_item_workspace_id";
DROP INDEX IF EXISTS "idx_revenue_payment_workspace_id";
DROP INDEX IF EXISTS "idx_role_permission_workspace_id";
DROP INDEX IF EXISTS "idx_security_deposit_workspace_id";
DROP INDEX IF EXISTS "idx_staff_workspace_id";
DROP INDEX IF EXISTS "idx_staff_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_stage_workspace_id";
DROP INDEX IF EXISTS "idx_stage_template_workspace_id";
DROP INDEX IF EXISTS "idx_subscription_workspace_id";
DROP INDEX IF EXISTS "idx_subscription_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_supplier_workspace_id";
DROP INDEX IF EXISTS "idx_supplier_attribute_workspace_id";
DROP INDEX IF EXISTS "idx_supplier_category_workspace_id";
DROP INDEX IF EXISTS "idx_task_outcome_workspace_id";
DROP INDEX IF EXISTS "idx_task_outcome_check_workspace_id";
DROP INDEX IF EXISTS "idx_template_task_criteria_workspace_id";
DROP INDEX IF EXISTS "idx_treasury_collection_workspace_id";
DROP INDEX IF EXISTS "idx_treasury_disbursement_workspace_id";
DROP INDEX IF EXISTS "idx_purchase_order_workspace_id";

-- ============================================================
-- PART 3: Drop workspace_id columns (127 tables)
-- ============================================================

ALTER TABLE "treasury_disbursement"          DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "treasury_collection"            DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "template_task_criteria"         DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "task_outcome_check"             DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "task_outcome"                   DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "supplier_category"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "supplier_attribute"             DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "supplier"                       DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "subscription_attribute"         DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "subscription"                   DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "stage_template"                 DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "stage"                          DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "staff_attribute"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "staff"                          DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "security_deposit"               DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "role_permission"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "revenue_payment"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "revenue_line_item"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "revenue_category"               DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "revenue"                        DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "resource"                       DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "recurring_journal_template"     DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "product_variant_option"         DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "product_variant_image"          DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "product_variant"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "product_price_plan"             DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "product_plan"                   DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "product_option_value"           DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "product_option"                 DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "product_line"                   DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "product_collection"             DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "product_attribute"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "product"                        DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "price_product"                  DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "price_plan"                     DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "price_list"                     DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "prepayment"                     DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "plan_settings"                  DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "plan_location"                  DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "plan_attribute"                 DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "plan"                           DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "phase_outcome_summary"          DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "petty_cash_voucher"             DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "petty_cash_replenishment"       DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "petty_cash_fund"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "payroll_run"                    DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "payroll_remittance"             DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "payment_term"                   DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "payment_profile_payment_method" DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "payment_profile"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "payment_method"                 DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "payment_attribute"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "payment"                        DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "location_attribute"             DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "location_area"                  DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "location"                       DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "loan_payment"                   DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "loan"                           DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "line"                           DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "license_history"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "license"                        DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "journal_line"                   DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "journal_entry"                  DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "job_template_task"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "job_template_phase"             DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "job_task"                       DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "job_phase"                      DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "job_outcome_summary"            DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "invoice_attribute"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "invoice"                        DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "inventory_serial_history"       DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "inventory_serial"               DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "inventory_item"                 DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "inventory_depreciation"         DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "inventory_attribute"            DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "group_attribute"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "group"                          DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "fulfillment_status_event"       DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "fulfillment_return_item"        DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "fulfillment_return"             DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "fulfillment_item"               DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "fiscal_period"                  DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "expenditure_line_item"          DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "expenditure_category"           DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "expenditure"                    DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "event_settings"                 DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "event_product"                  DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "event_client"                   DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "event_attribute"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "equity_transaction"             DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "equity_account"                 DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "depreciation_schedule"          DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "delegate_client"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "delegate_attribute"             DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "delegate"                       DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "deferred_revenue"               DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "criteria_threshold"             DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "criteria_option"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "collection_schedule"            DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "collection_plan"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "collection_parent"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "collection_method"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "collection_attribute"           DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "collection"                     DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "client_category"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "client_attribute"               DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "client"                         DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "category"                       DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "balance_attribute"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "balance"                        DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "attribute_value"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "attribute"                      DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "asset_transaction"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "asset_revaluation"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "asset_maintenance"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "asset_location"                 DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "asset_disposal"                 DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "asset_component"                DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "asset_category"                 DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "asset"                          DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "activity_template"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "activity_material"              DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "activity_labor"                 DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "activity_expense"               DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "activity"                       DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "account_template"               DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "account_group"                  DROP COLUMN IF EXISTS "workspace_id";
ALTER TABLE "account"                        DROP COLUMN IF EXISTS "workspace_id";

-- purchase_order (conditional)
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'purchase_order') THEN
    ALTER TABLE "purchase_order" DROP COLUMN IF EXISTS "workspace_id";
  END IF;
END $$;

COMMIT;
