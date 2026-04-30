-- Migration: accrued_expense (down)
-- Dialect: postgres
-- Created: 2026-04-30T14:03:00Z
-- Plan: docs/plan/20260430-supplier-pricing-symmetry/plan.md (P9 / §6.4 + §6.4a)
-- Rationale: Reverses 20260430140300_accrued_expense.up.sql.

BEGIN;

-- accrued_expense_settlement (depends on accrued_expense + expenditure)
DROP INDEX IF EXISTS idx_accrued_expense_settlement_reversed_by_settlement_id;
DROP INDEX IF EXISTS idx_accrued_expense_settlement_expenditure_line_item_id;
DROP INDEX IF EXISTS idx_accrued_expense_settlement_expenditure_id;
DROP INDEX IF EXISTS idx_accrued_expense_settlement_accrued_expense_id;
DROP INDEX IF EXISTS idx_accrued_expense_settlement_workspace_id;
DROP TABLE IF EXISTS accrued_expense_settlement;

-- accrued_expense
DROP INDEX IF EXISTS uq_accrued_expense_contract_cycle;
DROP INDEX IF EXISTS idx_accrued_expense_expense_account_id;
DROP INDEX IF EXISTS idx_accrued_expense_accrual_account_id;
DROP INDEX IF EXISTS idx_accrued_expense_status;
DROP INDEX IF EXISTS idx_accrued_expense_supplier_id;
DROP INDEX IF EXISTS idx_accrued_expense_supplier_contract_id;
DROP INDEX IF EXISTS idx_accrued_expense_workspace_id;
DROP TABLE IF EXISTS accrued_expense;

COMMIT;
