-- Migration: workspace_compliance_region (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:09:00Z
-- Rationale: Drops workspace.compliance_region column.

BEGIN;

ALTER TABLE workspace DROP COLUMN IF EXISTS compliance_region;

COMMIT;
