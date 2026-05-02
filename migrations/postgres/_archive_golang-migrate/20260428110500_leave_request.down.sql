-- Migration: leave_request (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:05:00Z
-- Rationale: Drops LeaveRequest entity.

BEGIN;

DROP INDEX IF EXISTS idx_leave_request_supplier_status;
DROP INDEX IF EXISTS idx_leave_request_status;
DROP INDEX IF EXISTS idx_leave_request_leave_type_id;
DROP INDEX IF EXISTS idx_leave_request_supplier_id;
DROP INDEX IF EXISTS idx_leave_request_workspace_id;
DROP TABLE IF EXISTS leave_request;

COMMIT;
