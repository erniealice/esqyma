-- Migration: leave_request (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:05:00Z
-- Rationale: Introduces LeaveRequest — per-employee leave request workflow
--            (Draft -> Submitted -> Approved/Rejected/Cancelled).

BEGIN;

CREATE TABLE IF NOT EXISTS leave_request (
  id                      TEXT PRIMARY KEY,
  workspace_id            TEXT NOT NULL REFERENCES workspace(id),
  supplier_id             TEXT NOT NULL REFERENCES supplier(id),
  leave_type_id           TEXT NOT NULL REFERENCES leave_type(id),

  start_date              TEXT NOT NULL,
  end_date                TEXT NOT NULL,
  days                    INTEGER NOT NULL DEFAULT 0,

  status                  TEXT NOT NULL DEFAULT '',
  approved_by_user_id     TEXT,
  reason                  TEXT,
  approved_on             TEXT,

  -- Audit
  active                  BOOLEAN NOT NULL DEFAULT true,
  date_created            TIMESTAMPTZ DEFAULT NOW(),
  date_modified           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leave_request_workspace_id        ON leave_request(workspace_id);
CREATE INDEX IF NOT EXISTS idx_leave_request_supplier_id         ON leave_request(supplier_id);
CREATE INDEX IF NOT EXISTS idx_leave_request_leave_type_id       ON leave_request(leave_type_id);
CREATE INDEX IF NOT EXISTS idx_leave_request_status              ON leave_request(status);
CREATE INDEX IF NOT EXISTS idx_leave_request_supplier_status     ON leave_request(supplier_id, status);

COMMIT;
