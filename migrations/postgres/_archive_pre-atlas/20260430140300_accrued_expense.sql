BEGIN;
-- ============================================================================
-- Table: accrued_expense
-- ============================================================================
CREATE TABLE IF NOT EXISTS accrued_expense (
  id                       TEXT PRIMARY KEY,
  workspace_id             TEXT NOT NULL REFERENCES workspace(id),

  -- Audit
  date_created             BIGINT,
  date_created_string      TEXT,
  date_modified            BIGINT,
  date_modified_string     TEXT,
  active                   BOOLEAN NOT NULL DEFAULT true,
  internal_id              TEXT NOT NULL UNIQUE,

  -- Identity
  name                     TEXT NOT NULL,
  description              TEXT,

  -- Source contract / supplier
  supplier_contract_id     TEXT NOT NULL REFERENCES supplier_contract(id),
  supplier_id              TEXT REFERENCES supplier(id),

  -- Period
  period_start             TIMESTAMPTZ,
  period_end               TIMESTAMPTZ,
  recognition_date         TIMESTAMPTZ NOT NULL,
  cycle_date               TEXT,

  -- Money (centavos) — settled_amount / remaining_amount are single-write
  -- boundary; only the AccruedExpenseSettlementService use case updates them.
  currency                 TEXT NOT NULL DEFAULT '',
  accrued_amount           BIGINT NOT NULL DEFAULT 0,
  settled_amount           BIGINT NOT NULL DEFAULT 0,
  remaining_amount         BIGINT NOT NULL DEFAULT 0,

  -- Lifecycle
  status                   INTEGER NOT NULL DEFAULT 0,

  -- GL
  accrual_account_id       TEXT REFERENCES account(id),
  expense_account_id       TEXT REFERENCES account(id),

  -- Notes
  notes                    TEXT,
  metadata                 JSONB
);
CREATE INDEX IF NOT EXISTS idx_accrued_expense_workspace_id          ON accrued_expense(workspace_id);
CREATE INDEX IF NOT EXISTS idx_accrued_expense_supplier_contract_id  ON accrued_expense(supplier_contract_id);
CREATE INDEX IF NOT EXISTS idx_accrued_expense_supplier_id           ON accrued_expense(supplier_id);
CREATE INDEX IF NOT EXISTS idx_accrued_expense_status                ON accrued_expense(status);
CREATE INDEX IF NOT EXISTS idx_accrued_expense_accrual_account_id    ON accrued_expense(accrual_account_id);
CREATE INDEX IF NOT EXISTS idx_accrued_expense_expense_account_id    ON accrued_expense(expense_account_id);
-- Idempotency: one accrual per (supplier_contract_id, cycle_date) for
-- recurrence-engine driven accruals. Manual / one-off accruals leave
-- cycle_date NULL and the partial index excludes them.
CREATE UNIQUE INDEX IF NOT EXISTS uq_accrued_expense_contract_cycle
  ON accrued_expense(supplier_contract_id, cycle_date)
  WHERE cycle_date IS NOT NULL;
-- ============================================================================
-- Table: accrued_expense_settlement
-- Join table (HIGH-3) — N:M between accrued_expense and expenditure.
-- ============================================================================
CREATE TABLE IF NOT EXISTS accrued_expense_settlement (
  id                          TEXT PRIMARY KEY,
  workspace_id                TEXT NOT NULL REFERENCES workspace(id),

  -- Audit
  date_created                BIGINT,
  date_created_string         TEXT,
  date_modified               BIGINT,
  date_modified_string        TEXT,
  active                      BOOLEAN NOT NULL DEFAULT true,

  -- Parents
  accrued_expense_id          TEXT NOT NULL REFERENCES accrued_expense(id),
  expenditure_id              TEXT NOT NULL REFERENCES expenditure(id),
  expenditure_line_item_id    TEXT REFERENCES expenditure_line_item(id),

  -- Money (centavos) — amount of THIS expenditure settling THIS accrual
  amount_settled              BIGINT NOT NULL DEFAULT 0,
  currency                    TEXT NOT NULL DEFAULT '',

  -- FX revaluation
  fx_rate                     DOUBLE PRECISION,
  fx_adjustment_amount        BIGINT,

  -- Posted
  settled_at                  TIMESTAMPTZ NOT NULL,

  -- Reversal — self-FK to the row that reverses this one (or vice-versa).
  -- A reversal IS-A settlement with negative amount that nets to zero.
  reversed_by_settlement_id   TEXT REFERENCES accrued_expense_settlement(id),
  reversal_reason             TEXT
);
CREATE INDEX IF NOT EXISTS idx_accrued_expense_settlement_workspace_id              ON accrued_expense_settlement(workspace_id);
CREATE INDEX IF NOT EXISTS idx_accrued_expense_settlement_accrued_expense_id        ON accrued_expense_settlement(accrued_expense_id);
CREATE INDEX IF NOT EXISTS idx_accrued_expense_settlement_expenditure_id            ON accrued_expense_settlement(expenditure_id);
CREATE INDEX IF NOT EXISTS idx_accrued_expense_settlement_expenditure_line_item_id  ON accrued_expense_settlement(expenditure_line_item_id);
CREATE INDEX IF NOT EXISTS idx_accrued_expense_settlement_reversed_by_settlement_id ON accrued_expense_settlement(reversed_by_settlement_id);
COMMIT;
