-- Migration: payroll_run_jurisdiction_fields (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:12:00Z
-- Rationale: Adds jurisdiction routing + calculator versioning + workspace
--            scoping to payroll_run. Backfills existing rows to compliance_region='PH'.

BEGIN;

ALTER TABLE payroll_run ADD COLUMN IF NOT EXISTS compliance_region  TEXT;
ALTER TABLE payroll_run ADD COLUMN IF NOT EXISTS calculator_version TEXT;
ALTER TABLE payroll_run ADD COLUMN IF NOT EXISTS workspace_id       TEXT REFERENCES workspace(id);

UPDATE payroll_run SET compliance_region = 'PH' WHERE compliance_region IS NULL;

CREATE INDEX IF NOT EXISTS idx_payroll_run_workspace_id ON payroll_run(workspace_id);

COMMIT;
