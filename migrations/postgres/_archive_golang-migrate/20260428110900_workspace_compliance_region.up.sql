-- Migration: workspace_compliance_region (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:09:00Z
-- Rationale: Adds compliance_region to workspace for jurisdiction-keyed payroll
--            calculator routing. Backfills existing rows to 'PH'.

BEGIN;

ALTER TABLE workspace ADD COLUMN IF NOT EXISTS compliance_region TEXT;

UPDATE workspace SET compliance_region = 'PH' WHERE compliance_region IS NULL;

COMMIT;
