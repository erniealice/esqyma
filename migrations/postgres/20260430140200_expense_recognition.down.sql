-- Migration: expense_recognition (down)
-- Dialect: postgres
-- Created: 2026-04-30T14:02:00Z
-- Plan: docs/plan/20260430-supplier-pricing-symmetry/plan.md (P8 / §6.3)
-- Rationale: Reverses 20260430140200_expense_recognition.up.sql.

BEGIN;

-- expense_recognition_line indexes + table
DROP INDEX IF EXISTS idx_expense_recognition_line_job_activity_id;
DROP INDEX IF EXISTS idx_expense_recognition_line_expense_account_id;
DROP INDEX IF EXISTS idx_expense_recognition_line_product_id;
DROP INDEX IF EXISTS idx_expense_recognition_line_expenditure_line_item_id;
DROP INDEX IF EXISTS idx_expense_recognition_line_supplier_contract_line_id;
DROP INDEX IF EXISTS idx_expense_recognition_line_expense_recognition_id;
DROP INDEX IF EXISTS idx_expense_recognition_line_workspace_id;
DROP TABLE IF EXISTS expense_recognition_line;

-- expense_recognition indexes + table
DROP INDEX IF EXISTS uq_expense_recognition_idempotency;
DROP INDEX IF EXISTS idx_expense_recognition_accrued_expense_id;
DROP INDEX IF EXISTS idx_expense_recognition_reversal_of;
DROP INDEX IF EXISTS idx_expense_recognition_job_phase_id;
DROP INDEX IF EXISTS idx_expense_recognition_journal_entry_id;
DROP INDEX IF EXISTS idx_expense_recognition_expenditure_category_id;
DROP INDEX IF EXISTS idx_expense_recognition_location_id;
DROP INDEX IF EXISTS idx_expense_recognition_supplier_id;
DROP INDEX IF EXISTS idx_expense_recognition_status;
DROP INDEX IF EXISTS idx_expense_recognition_expenditure_id;
DROP INDEX IF EXISTS idx_expense_recognition_supplier_contract_id;
DROP INDEX IF EXISTS idx_expense_recognition_workspace_id;
DROP TABLE IF EXISTS expense_recognition;

COMMIT;
