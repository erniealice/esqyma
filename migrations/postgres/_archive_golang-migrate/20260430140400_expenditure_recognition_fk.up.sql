-- Migration: expenditure_recognition_fk (up)
-- Dialect: postgres
-- Created: 2026-04-30T14:04:00Z
-- Plan: docs/plan/20260430-supplier-pricing-symmetry/plan.md (§6.5)
-- Rationale: Adds the four new optional columns on expenditure that link an
--            inbound bill to its accrual-basis recognition + accrual rows
--            and capture the recurrence-engine source metadata.
--
--            expense_recognition_id    — proto field 30 — primary recognition link
--            accrued_expense_id        — proto field 31 — settling-accrual link
--            cycle_date                — proto field 32 — YYYY-MM-DD bucket for recurrence idempotency
--            source                    — proto field 33 — free-text discriminator (manual|recurrence|po_match|import)
--
--            Must run AFTER expense_recognition + accrued_expense migrations
--            (140200, 140300) so the FK targets exist.

BEGIN;

ALTER TABLE expenditure
  ADD COLUMN IF NOT EXISTS expense_recognition_id TEXT REFERENCES expense_recognition(id),
  ADD COLUMN IF NOT EXISTS accrued_expense_id     TEXT REFERENCES accrued_expense(id),
  ADD COLUMN IF NOT EXISTS cycle_date             TEXT,
  ADD COLUMN IF NOT EXISTS source                 TEXT;

CREATE INDEX IF NOT EXISTS idx_expenditure_expense_recognition_id ON expenditure(expense_recognition_id);
CREATE INDEX IF NOT EXISTS idx_expenditure_accrued_expense_id     ON expenditure(accrued_expense_id);
CREATE INDEX IF NOT EXISTS idx_expenditure_cycle_date             ON expenditure(cycle_date);
CREATE INDEX IF NOT EXISTS idx_expenditure_source                 ON expenditure(source);

-- Recurrence-engine idempotency: at most one Expenditure draft per
-- (supplier_contract_id, cycle_date) when source='recurrence'. Manual /
-- po_match / import rows are excluded by the partial predicate.
CREATE UNIQUE INDEX IF NOT EXISTS uq_expenditure_recurrence_contract_cycle
  ON expenditure(supplier_contract_id, cycle_date)
  WHERE source = 'recurrence' AND supplier_contract_id IS NOT NULL AND cycle_date IS NOT NULL;

COMMIT;
