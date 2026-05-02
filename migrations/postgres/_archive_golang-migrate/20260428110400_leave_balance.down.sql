-- Migration: leave_balance (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:04:00Z
-- Rationale: Drops LeaveBalance entity.

BEGIN;

DROP INDEX IF EXISTS idx_leave_balance_supplier_type_year;
DROP INDEX IF EXISTS idx_leave_balance_leave_type_id;
DROP INDEX IF EXISTS idx_leave_balance_supplier_id;
DROP INDEX IF EXISTS idx_leave_balance_workspace_id;
DROP TABLE IF EXISTS leave_balance;

COMMIT;
