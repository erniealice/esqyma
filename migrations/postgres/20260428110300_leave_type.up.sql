-- Migration: leave_type (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:03:00Z
-- Rationale: Introduces LeaveType — per-jurisdiction leave plan template
--            (VL, SL, ML, PL, BL, SOLO_PARENT, MAGNA_CARTA, etc.).

BEGIN;

CREATE TABLE IF NOT EXISTS leave_type (
  id                      TEXT PRIMARY KEY,
  workspace_id            TEXT REFERENCES workspace(id),

  compliance_region       TEXT NOT NULL,
  code                    TEXT NOT NULL,
  name                    TEXT NOT NULL DEFAULT '',
  paid                    BOOLEAN NOT NULL DEFAULT true,
  accrual_days_per_year   INTEGER NOT NULL DEFAULT 0,
  max_carryover_days      INTEGER NOT NULL DEFAULT 0,
  source_citation         TEXT,

  -- Audit
  active                  BOOLEAN NOT NULL DEFAULT true,
  date_created            TIMESTAMPTZ DEFAULT NOW(),
  date_modified           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leave_type_compliance_region    ON leave_type(compliance_region);
CREATE INDEX IF NOT EXISTS idx_leave_type_code                 ON leave_type(code);
CREATE INDEX IF NOT EXISTS idx_leave_type_workspace_id_code    ON leave_type(workspace_id, code);

COMMIT;
