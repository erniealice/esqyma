BEGIN;
-- ============================================================================
-- Table: expense_recognition
-- ============================================================================
CREATE TABLE IF NOT EXISTS expense_recognition (
  id                          TEXT PRIMARY KEY,
  workspace_id                TEXT NOT NULL REFERENCES workspace(id),

  -- Audit
  date_created                BIGINT,
  date_created_string         TEXT,
  date_modified               BIGINT,
  date_modified_string        TEXT,
  active                      BOOLEAN NOT NULL DEFAULT true,
  internal_id                 TEXT NOT NULL UNIQUE,

  -- Identity
  name                        TEXT NOT NULL,
  description                 TEXT,

  -- What was recognized
  recognition_date            TIMESTAMPTZ NOT NULL,
  period_start                TIMESTAMPTZ,
  period_end                  TIMESTAMPTZ,
  currency                    TEXT NOT NULL DEFAULT '',
  total_amount                BIGINT NOT NULL DEFAULT 0,
  status                      INTEGER NOT NULL DEFAULT 0,

  -- Source links (at most one of supplier_contract_id / expenditure_id)
  supplier_contract_id        TEXT REFERENCES supplier_contract(id),
  expenditure_id              TEXT REFERENCES expenditure(id),
  deferred_expense_id         TEXT,
  -- accrued_expense FK column added; the foreign key constraint is added by
  -- the accrued_expense migration once that table exists.
  accrued_expense_id          TEXT,
  cycle_date                  TEXT,

  -- HIGH-2: stable source-tuple idempotency key (mandatory)
  idempotency_key             TEXT NOT NULL,

  -- Reversal
  reversal_of_recognition_id  TEXT,

  -- GL
  expense_account_id          TEXT REFERENCES account(id),
  accrual_account_id          TEXT REFERENCES account(id),
  journal_entry_id            TEXT REFERENCES journal_entry(id),

  -- Costing dimensions
  supplier_id                 TEXT REFERENCES supplier(id),
  location_id                 TEXT REFERENCES location(id),
  expenditure_category_id     TEXT REFERENCES expenditure_category(id),
  job_phase_id                TEXT REFERENCES job_phase(id),

  -- Notes
  notes                       TEXT,
  metadata                    JSONB
);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_workspace_id            ON expense_recognition(workspace_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_supplier_contract_id    ON expense_recognition(supplier_contract_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_expenditure_id          ON expense_recognition(expenditure_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_status                  ON expense_recognition(status);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_supplier_id             ON expense_recognition(supplier_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_location_id             ON expense_recognition(location_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_expenditure_category_id ON expense_recognition(expenditure_category_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_journal_entry_id        ON expense_recognition(journal_entry_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_job_phase_id            ON expense_recognition(job_phase_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_reversal_of             ON expense_recognition(reversal_of_recognition_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_accrued_expense_id      ON expense_recognition(accrued_expense_id);
-- HIGH-2 / CRIT-3 idempotency: status-independent unique key.
CREATE UNIQUE INDEX IF NOT EXISTS uq_expense_recognition_idempotency
  ON expense_recognition(idempotency_key);
-- ============================================================================
-- Table: expense_recognition_line
-- ============================================================================
CREATE TABLE IF NOT EXISTS expense_recognition_line (
  id                        TEXT PRIMARY KEY,
  workspace_id              TEXT NOT NULL REFERENCES workspace(id),

  -- Audit
  date_created              BIGINT,
  date_created_string       TEXT,
  date_modified             BIGINT,
  date_modified_string      TEXT,
  active                    BOOLEAN NOT NULL DEFAULT true,

  -- Parent
  expense_recognition_id    TEXT NOT NULL REFERENCES expense_recognition(id),

  -- Source links
  supplier_contract_line_id TEXT REFERENCES supplier_contract_line(id),
  expenditure_line_item_id  TEXT REFERENCES expenditure_line_item(id),
  product_id                TEXT REFERENCES product(id),

  -- Line details
  description               TEXT NOT NULL DEFAULT '',
  quantity                  DOUBLE PRECISION NOT NULL DEFAULT 0,
  unit_amount               BIGINT NOT NULL DEFAULT 0,
  amount                    BIGINT NOT NULL DEFAULT 0,
  currency                  TEXT NOT NULL DEFAULT '',

  -- GL
  expense_account_id        TEXT REFERENCES account(id),
  job_activity_id           TEXT REFERENCES job_activity(id)
);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_line_workspace_id              ON expense_recognition_line(workspace_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_line_expense_recognition_id    ON expense_recognition_line(expense_recognition_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_line_supplier_contract_line_id ON expense_recognition_line(supplier_contract_line_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_line_expenditure_line_item_id  ON expense_recognition_line(expenditure_line_item_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_line_product_id                ON expense_recognition_line(product_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_line_expense_account_id        ON expense_recognition_line(expense_account_id);
CREATE INDEX IF NOT EXISTS idx_expense_recognition_line_job_activity_id           ON expense_recognition_line(job_activity_id);
COMMIT;
