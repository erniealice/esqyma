-- Migration: expenditure_recognition_fk (down)
-- Dialect: postgres
-- Created: 2026-04-30T14:04:00Z
-- Plan: docs/plan/20260430-supplier-pricing-symmetry/plan.md (§6.5)
-- Rationale: Reverses 20260430140400_expenditure_recognition_fk.up.sql.

BEGIN;

DROP INDEX IF EXISTS uq_expenditure_recurrence_contract_cycle;
DROP INDEX IF EXISTS idx_expenditure_source;
DROP INDEX IF EXISTS idx_expenditure_cycle_date;
DROP INDEX IF EXISTS idx_expenditure_accrued_expense_id;
DROP INDEX IF EXISTS idx_expenditure_expense_recognition_id;

ALTER TABLE expenditure
  DROP COLUMN IF EXISTS source,
  DROP COLUMN IF EXISTS cycle_date,
  DROP COLUMN IF EXISTS accrued_expense_id,
  DROP COLUMN IF EXISTS expense_recognition_id;

COMMIT;
