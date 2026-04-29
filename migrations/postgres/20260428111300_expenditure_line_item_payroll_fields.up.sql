-- Migration: expenditure_line_item_payroll_fields (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:13:00Z
-- Rationale: Extends expenditure_line_item with payroll-calculation provenance:
--            rate_table_id, pay_cycle_id, applied_basis_amount (centavos),
--            proration_factor, calc_metadata (JSON), and line_kind discriminator
--            for component classification (BASIC | OT_PREMIUM | STAT_DEDUCTION | etc.).

BEGIN;

ALTER TABLE expenditure_line_item ADD COLUMN IF NOT EXISTS rate_table_id          TEXT;
ALTER TABLE expenditure_line_item ADD COLUMN IF NOT EXISTS pay_cycle_id           TEXT;
ALTER TABLE expenditure_line_item ADD COLUMN IF NOT EXISTS applied_basis_amount   BIGINT;
ALTER TABLE expenditure_line_item ADD COLUMN IF NOT EXISTS proration_factor       DOUBLE PRECISION;
ALTER TABLE expenditure_line_item ADD COLUMN IF NOT EXISTS calc_metadata          TEXT;
ALTER TABLE expenditure_line_item ADD COLUMN IF NOT EXISTS line_kind              TEXT;

CREATE INDEX IF NOT EXISTS idx_expenditure_line_item_pay_cycle_id           ON expenditure_line_item(pay_cycle_id);
CREATE INDEX IF NOT EXISTS idx_expenditure_line_item_expenditure_line_kind  ON expenditure_line_item(expenditure_id, line_kind);

COMMIT;
