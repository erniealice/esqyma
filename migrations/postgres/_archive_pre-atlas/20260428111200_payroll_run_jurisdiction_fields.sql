BEGIN;
ALTER TABLE payroll_run ADD COLUMN IF NOT EXISTS compliance_region  TEXT;
ALTER TABLE payroll_run ADD COLUMN IF NOT EXISTS calculator_version TEXT;
ALTER TABLE payroll_run ADD COLUMN IF NOT EXISTS workspace_id       TEXT REFERENCES workspace(id);
UPDATE payroll_run SET compliance_region = 'PH' WHERE compliance_region IS NULL;
CREATE INDEX IF NOT EXISTS idx_payroll_run_workspace_id ON payroll_run(workspace_id);
COMMIT;
