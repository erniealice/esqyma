-- Migration: leave_balance (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:04:00Z
-- Rationale: Introduces LeaveBalance — per-employee, per-leave-type, per-year
--            accrual ledger. Queried independently from LeaveRequest workflow.

BEGIN;

CREATE TABLE IF NOT EXISTS leave_balance (
  id                      TEXT PRIMARY KEY,
  workspace_id            TEXT NOT NULL REFERENCES workspace(id),
  supplier_id              TEXT NOT NULL REFERENCES supplier(id),
  leave_type_id           TEXT NOT NULL REFERENCES leave_type(id),

  year                    INTEGER NOT NULL DEFAULT 0,
  accrued_days            INTEGER NOT NULL DEFAULT 0,
  used_days               INTEGER NOT NULL DEFAULT 0,
  carryover_days          INTEGER NOT NULL DEFAULT 0,
  last_accrued_on         TEXT,

  -- Audit
  active                  BOOLEAN NOT NULL DEFAULT true,
  date_created            TIMESTAMPTZ DEFAULT NOW(),
  date_modified           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leave_balance_workspace_id              ON leave_balance(workspace_id);
CREATE INDEX IF NOT EXISTS idx_leave_balance_supplier_id               ON leave_balance(supplier_id);
CREATE INDEX IF NOT EXISTS idx_leave_balance_leave_type_id             ON leave_balance(leave_type_id);
CREATE INDEX IF NOT EXISTS idx_leave_balance_supplier_type_year        ON leave_balance(supplier_id, leave_type_id, year);

COMMIT;
