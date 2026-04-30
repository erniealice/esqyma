-- Migration: supplier_contracts (down)
-- Dialect: postgres
-- Created: 2026-04-30T13:00:00Z
-- Plan: docs/plan/20260427-supplier-commitments/plan.md (P1.6)
-- Rationale: Reverses 20260430130000_supplier_contracts.up.sql.
--            Order: drop FK back-edges first (so the parent tables can be
--            dropped without orphan REFERENCES), then drop the four new
--            tables in reverse-dependency order
--            (procurement_request_line → procurement_request →
--             supplier_contract_line → supplier_contract).
--
--            All operations are IF EXISTS / DROP COLUMN IF EXISTS only.
--            Never run destructive operations in up.sql.

BEGIN;

-- ============================================================================
-- FK back-edge rollback (drop in reverse of up order)
-- ============================================================================

-- prepayment
DROP INDEX IF EXISTS idx_prepayment_expenditure_id;
DROP INDEX IF EXISTS idx_prepayment_supplier_contract_id;
ALTER TABLE prepayment
  DROP COLUMN IF EXISTS expenditure_id,
  DROP COLUMN IF EXISTS supplier_contract_id;

-- expenditure_line_item
DROP INDEX IF EXISTS idx_expenditure_line_item_supplier_contract_line_id;
ALTER TABLE expenditure_line_item
  DROP COLUMN IF EXISTS supplier_contract_line_id;

-- expenditure
DROP INDEX IF EXISTS idx_expenditure_petty_cash_fund_id;
DROP INDEX IF EXISTS idx_expenditure_supplier_contract_id;
ALTER TABLE expenditure
  DROP COLUMN IF EXISTS petty_cash_fund_id,
  DROP COLUMN IF EXISTS supplier_contract_id;

-- purchase_order_line_item
DROP INDEX IF EXISTS idx_purchase_order_line_item_procurement_request_line_id;
DROP INDEX IF EXISTS idx_purchase_order_line_item_supplier_contract_line_id;
ALTER TABLE purchase_order_line_item
  DROP COLUMN IF EXISTS procurement_request_line_id,
  DROP COLUMN IF EXISTS supplier_contract_line_id;

-- purchase_order
DROP INDEX IF EXISTS idx_purchase_order_procurement_request_id;
DROP INDEX IF EXISTS idx_purchase_order_supplier_contract_id;
ALTER TABLE purchase_order
  DROP COLUMN IF EXISTS procurement_request_id,
  DROP COLUMN IF EXISTS supplier_contract_id;

-- ============================================================================
-- Drop the four new tables in reverse-dependency order
-- ============================================================================

-- procurement_request_line (depends on procurement_request)
DROP INDEX IF EXISTS idx_procurement_request_line_location_id;
DROP INDEX IF EXISTS idx_procurement_request_line_expense_account_id;
DROP INDEX IF EXISTS idx_procurement_request_line_expenditure_category_id;
DROP INDEX IF EXISTS idx_procurement_request_line_supplier_contract_line_id;
DROP INDEX IF EXISTS idx_procurement_request_line_product_id;
DROP INDEX IF EXISTS idx_procurement_request_line_procurement_request_id;
DROP TABLE IF EXISTS procurement_request_line;

-- procurement_request (depends on purchase_order via spawned_purchase_order_id)
DROP INDEX IF EXISTS idx_procurement_request_expense_account_id;
DROP INDEX IF EXISTS idx_procurement_request_expenditure_category_id;
DROP INDEX IF EXISTS idx_procurement_request_purchase_order_id;
DROP INDEX IF EXISTS idx_procurement_request_location_id;
DROP INDEX IF EXISTS idx_procurement_request_status;
DROP INDEX IF EXISTS idx_procurement_request_supplier_id;
DROP INDEX IF EXISTS idx_procurement_request_workspace_id;
DROP TABLE IF EXISTS procurement_request;

-- supplier_contract_line (depends on supplier_contract)
DROP INDEX IF EXISTS idx_supplier_contract_line_location_id;
DROP INDEX IF EXISTS idx_supplier_contract_line_expense_account_id;
DROP INDEX IF EXISTS idx_supplier_contract_line_expenditure_category_id;
DROP INDEX IF EXISTS idx_supplier_contract_line_kind;
DROP INDEX IF EXISTS idx_supplier_contract_line_product_id;
DROP INDEX IF EXISTS idx_supplier_contract_line_supplier_contract_id;
DROP TABLE IF EXISTS supplier_contract_line;

-- supplier_contract
DROP INDEX IF EXISTS idx_supplier_contract_expenditure_category_id;
DROP INDEX IF EXISTS idx_supplier_contract_payment_term_id;
DROP INDEX IF EXISTS idx_supplier_contract_expense_account_id;
DROP INDEX IF EXISTS idx_supplier_contract_location_id;
DROP INDEX IF EXISTS idx_supplier_contract_status;
DROP INDEX IF EXISTS idx_supplier_contract_kind;
DROP INDEX IF EXISTS idx_supplier_contract_supplier_id;
DROP INDEX IF EXISTS idx_supplier_contract_workspace_id;
DROP TABLE IF EXISTS supplier_contract;

COMMIT;
