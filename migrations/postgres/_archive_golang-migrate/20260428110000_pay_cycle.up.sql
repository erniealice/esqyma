-- Migration: pay_cycle (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:00:00Z
-- Rationale: Introduces PayCycle entity — per-cutoff window inside a PayrollRun
--            that anchors rate-table lookup via pay_date.

BEGIN;

CREATE TABLE IF NOT EXISTS pay_cycle (
  id                      TEXT PRIMARY KEY,
  workspace_id            TEXT NOT NULL REFERENCES workspace(id),
  payroll_run_id          TEXT REFERENCES payroll_run(id),

  -- Cycle window
  cutoff_start            TEXT NOT NULL,
  cutoff_end              TEXT NOT NULL,
  pay_date                TEXT NOT NULL,
  half_index              TEXT NOT NULL DEFAULT '',

  -- Lifecycle
  status                  TEXT NOT NULL DEFAULT '',
  sequence_no             INTEGER NOT NULL DEFAULT 0,

  -- Aggregates (centavos)
  total_gross             BIGINT NOT NULL DEFAULT 0,
  total_deductions        BIGINT NOT NULL DEFAULT 0,
  total_net               BIGINT NOT NULL DEFAULT 0,
  employee_count          INTEGER NOT NULL DEFAULT 0,

  -- Audit
  active                  BOOLEAN NOT NULL DEFAULT true,
  date_created            TIMESTAMPTZ DEFAULT NOW(),
  date_modified           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pay_cycle_workspace_id    ON pay_cycle(workspace_id);
CREATE INDEX IF NOT EXISTS idx_pay_cycle_payroll_run_id  ON pay_cycle(payroll_run_id);
CREATE INDEX IF NOT EXISTS idx_pay_cycle_status          ON pay_cycle(status);
CREATE INDEX IF NOT EXISTS idx_pay_cycle_run_sequence    ON pay_cycle(workspace_id, payroll_run_id, sequence_no);

COMMIT;
