-- Migration: leave_type (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:03:00Z
-- Rationale: Drops LeaveType entity.

BEGIN;

DROP INDEX IF EXISTS idx_leave_type_workspace_id_code;
DROP INDEX IF EXISTS idx_leave_type_code;
DROP INDEX IF EXISTS idx_leave_type_compliance_region;
DROP TABLE IF EXISTS leave_type;

COMMIT;
