-- Migration: payroll_run_jurisdiction_fields (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:12:00Z
-- Rationale: Drops payroll_run jurisdiction/calculator/workspace columns.

BEGIN;

DROP INDEX IF EXISTS idx_payroll_run_workspace_id;

ALTER TABLE payroll_run DROP COLUMN IF EXISTS workspace_id;
ALTER TABLE payroll_run DROP COLUMN IF EXISTS calculator_version;
ALTER TABLE payroll_run DROP COLUMN IF EXISTS compliance_region;

COMMIT;
