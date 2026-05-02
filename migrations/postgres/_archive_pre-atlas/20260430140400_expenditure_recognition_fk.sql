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
