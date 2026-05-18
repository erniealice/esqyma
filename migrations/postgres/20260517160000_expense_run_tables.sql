-- Plan A Phase 0 — Expense Run (20260517-expense-run).
--
-- Mirror of selling-side Revenue Run on the buying side. Creates
-- expense_recognition_run + expense_recognition_run_attempt tables, adds
-- run_id back-edges on expense_recognition + expenditure, and emits the
-- supporting indexes.
--
-- Composes with Plan B Phase 0 (20260517150000_advance_cash_events.sql):
--   - expense_recognition.advance_disbursement_id (added by Plan B) is the
--     advance-branch FK; this migration adds the run_id only.
--   - treasury_disbursement table is the FK target for the advance branch
--     (already exists as a Plan B v1 schema; no rename needed since the DB
--     table name is `treasury_disbursement` already).
--
-- DESIGN DEVIATION from plan.md (documented in progress.md):
--   plan.md proposed a GENERATED period_marker column on expense_recognition
--   with a source-discriminated CASE expression. Live state: the existing
--   `idempotency_key` UNIQUE column already provides per-source idempotency
--   with a derived shape (`{workspace_id}:{source_type}:{source_id}:{period}`).
--   We do NOT add a separate period_marker column here; the run-attempt's
--   period_marker is stored on the attempt row only and matched against the
--   recognition's idempotency_key in application code. If a later phase needs
--   a strict source-discriminated DB constraint we can layer it then.
--
-- Preflight requirements:
--   - Plan B Phase 0 migration (20260517150000_advance_cash_events.sql) MUST
--     have been applied first — this migration references expense_recognition
--     columns that may be added by Plan B (no direct hard dep but advisory).
--   - treasury_disbursement table exists.
--
-- All statements idempotent.

SET search_path TO public;

-- ============================================================================
-- 1. expense_recognition_run — parent run entity
-- ============================================================================

CREATE TABLE IF NOT EXISTS expense_recognition_run (
    id                          text PRIMARY KEY,
    workspace_id                text NOT NULL,
    supplier_id                 text,
    supplier_subscription_id    text,
    scope                       integer NOT NULL DEFAULT 0,
    as_of_date                  text NOT NULL,
    selection_count             integer NOT NULL DEFAULT 0,
    created_count               integer NOT NULL DEFAULT 0,
    skipped_count               integer NOT NULL DEFAULT 0,
    errored_count               integer NOT NULL DEFAULT 0,
    status                      integer NOT NULL DEFAULT 0,
    initiated_by                text NOT NULL,
    initiated_at                bigint,
    completed_at                bigint,
    notes                       text,
    active                      boolean DEFAULT true,
    date_created                timestamp with time zone DEFAULT now(),
    date_modified               timestamp with time zone DEFAULT now(),
    CONSTRAINT expense_recognition_run_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES workspace(id),
    CONSTRAINT expense_recognition_run_supplier_id_fkey
        FOREIGN KEY (supplier_id) REFERENCES supplier(id),
    CONSTRAINT expense_recognition_run_supplier_subscription_id_fkey
        FOREIGN KEY (supplier_subscription_id) REFERENCES supplier_subscription(id),
    CONSTRAINT expense_recognition_run_initiated_by_fkey
        FOREIGN KEY (initiated_by) REFERENCES workspace_user(id)
);

CREATE INDEX IF NOT EXISTS idx_expense_recognition_run_workspace_id
    ON expense_recognition_run(workspace_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_run_supplier_id
    ON expense_recognition_run(supplier_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_run_supplier_subscription_id
    ON expense_recognition_run(supplier_subscription_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_run_status
    ON expense_recognition_run(status);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_run_as_of_date
    ON expense_recognition_run(as_of_date);

-- ============================================================================
-- 2. expense_recognition_run_attempt — per-selection outcome row
-- ============================================================================

CREATE TABLE IF NOT EXISTS expense_recognition_run_attempt (
    id                          text PRIMARY KEY,
    run_id                      text NOT NULL,
    source_kind                 integer NOT NULL DEFAULT 0,
    supplier_subscription_id    text,
    advance_disbursement_id     text,
    period_start                text NOT NULL,
    period_end                  text NOT NULL,
    period_marker               text NOT NULL,
    outcome                     integer NOT NULL DEFAULT 0,
    expense_recognition_id      text,
    expenditure_id              text,
    error_code                  text,
    error_message               text,
    attempted_at                bigint,
    active                      boolean DEFAULT true,
    date_created                timestamp with time zone DEFAULT now(),
    date_modified               timestamp with time zone DEFAULT now(),
    CONSTRAINT expense_recognition_run_attempt_run_id_fkey
        FOREIGN KEY (run_id) REFERENCES expense_recognition_run(id),
    CONSTRAINT expense_recognition_run_attempt_supplier_subscription_id_fkey
        FOREIGN KEY (supplier_subscription_id) REFERENCES supplier_subscription(id),
    CONSTRAINT expense_recognition_run_attempt_advance_disbursement_id_fkey
        FOREIGN KEY (advance_disbursement_id) REFERENCES treasury_disbursement(id),
    CONSTRAINT expense_recognition_run_attempt_expense_recognition_id_fkey
        FOREIGN KEY (expense_recognition_id) REFERENCES expense_recognition(id),
    CONSTRAINT expense_recognition_run_attempt_expenditure_id_fkey
        FOREIGN KEY (expenditure_id) REFERENCES expenditure(id)
);

CREATE INDEX IF NOT EXISTS idx_expense_recognition_run_attempt_run_id
    ON expense_recognition_run_attempt(run_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_run_attempt_outcome
    ON expense_recognition_run_attempt(outcome);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_run_attempt_supplier_subscription_id
    ON expense_recognition_run_attempt(supplier_subscription_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_run_attempt_advance_disbursement_id
    ON expense_recognition_run_attempt(advance_disbursement_id);

-- ============================================================================
-- 3. expense_recognition.run_id — FK back-edge
-- ============================================================================

ALTER TABLE expense_recognition
    ADD COLUMN IF NOT EXISTS run_id text;

ALTER TABLE expense_recognition
    ADD CONSTRAINT expense_recognition_run_id_fkey
    FOREIGN KEY (run_id) REFERENCES expense_recognition_run(id) NOT VALID;

CREATE INDEX IF NOT EXISTS idx_expense_recognition_run_id
    ON expense_recognition(run_id)
    WHERE run_id IS NOT NULL;

-- ============================================================================
-- 4. expenditure.run_id — FK back-edge for draft Expenditures
-- ============================================================================

ALTER TABLE expenditure
    ADD COLUMN IF NOT EXISTS run_id text;

ALTER TABLE expenditure
    ADD CONSTRAINT expenditure_run_id_fkey
    FOREIGN KEY (run_id) REFERENCES expense_recognition_run(id) NOT VALID;

CREATE INDEX IF NOT EXISTS idx_expenditure_run_id
    ON expenditure(run_id)
    WHERE run_id IS NOT NULL;
