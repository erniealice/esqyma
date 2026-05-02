-- Migration: supplier_contracts (down)
-- Dialect: postgres
-- Created: 2026-04-27T13:00:00Z

BEGIN;

-- ============================================================
-- Remove FK back-edges from existing tables (reverse order)
-- ============================================================

-- prepayment
ALTER TABLE prepayment DROP COLUMN IF EXISTS expenditure_id;
ALTER TABLE prepayment DROP COLUMN IF EXISTS supplier_contract_id;

-- expenditure_line_item
ALTER TABLE expenditure_line_item DROP COLUMN IF EXISTS supplier_contract_line_id;

-- expenditure
ALTER TABLE expenditure DROP COLUMN IF EXISTS petty_cash_fund_id;
ALTER TABLE expenditure DROP COLUMN IF EXISTS supplier_contract_id;

-- purchase_order_line_item
ALTER TABLE purchase_order_line_item DROP COLUMN IF EXISTS procurement_request_line_id;
ALTER TABLE purchase_order_line_item DROP COLUMN IF EXISTS supplier_contract_line_id;

-- purchase_order
ALTER TABLE purchase_order DROP COLUMN IF EXISTS procurement_request_id;
ALTER TABLE purchase_order DROP COLUMN IF EXISTS supplier_contract_id;

-- ============================================================
-- Drop new tables (reverse dependency order)
-- ============================================================
DROP TABLE IF EXISTS procurement_request_line;
DROP TABLE IF EXISTS procurement_request;
DROP TABLE IF EXISTS supplier_contract_line;
DROP TABLE IF EXISTS supplier_contract;

COMMIT;
