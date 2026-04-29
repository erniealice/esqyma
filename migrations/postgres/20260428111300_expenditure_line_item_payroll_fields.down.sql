-- Migration: expenditure_line_item_payroll_fields (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:13:00Z
-- Rationale: Drops expenditure_line_item payroll-calculation provenance columns.

BEGIN;

DROP INDEX IF EXISTS idx_expenditure_line_item_expenditure_line_kind;
DROP INDEX IF EXISTS idx_expenditure_line_item_pay_cycle_id;

ALTER TABLE expenditure_line_item DROP COLUMN IF EXISTS line_kind;
ALTER TABLE expenditure_line_item DROP COLUMN IF EXISTS calc_metadata;
ALTER TABLE expenditure_line_item DROP COLUMN IF EXISTS proration_factor;
ALTER TABLE expenditure_line_item DROP COLUMN IF EXISTS applied_basis_amount;
ALTER TABLE expenditure_line_item DROP COLUMN IF EXISTS pay_cycle_id;
ALTER TABLE expenditure_line_item DROP COLUMN IF EXISTS rate_table_id;

COMMIT;
