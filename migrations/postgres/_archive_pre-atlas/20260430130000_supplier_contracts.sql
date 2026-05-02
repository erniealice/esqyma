BEGIN;
-- ============================================================================
-- Table: supplier_contract
-- Standing commitment / agreement with a supplier. Discriminated by `kind`
-- (SUBSCRIPTION / RETAINER / LEASE / UTILITY / FRAMEWORK / BLANKET / ONE_TIME /
-- OTHER + EMPLOYMENT / NDA / COI / SERVICE_AGREEMENT). Status enum drives
-- the lifecycle state machine (plan §3.3). Money fields are centavos.
-- ============================================================================
CREATE TABLE IF NOT EXISTS supplier_contract (
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
  reference_number         TEXT,

  -- Counterparty
  supplier_id              TEXT NOT NULL REFERENCES supplier(id),

  -- Discriminator + lifecycle (proto enum tags stored as INTEGER per the
  -- "enum for new entities" rule in entity-status-conventions.md)
  kind                     INTEGER NOT NULL DEFAULT 0,
  status                   INTEGER NOT NULL DEFAULT 0,

  -- Recurrence (subset used by SUBSCRIPTION/LEASE/UTILITY)
  billing_kind             TEXT,
  billing_cycle_value      INTEGER,
  billing_cycle_unit       TEXT,
  default_term_value       INTEGER,
  default_term_unit        TEXT,

  -- Validity window
  date_time_start          TEXT NOT NULL,
  date_time_end            TEXT,
  auto_renew               BOOLEAN NOT NULL DEFAULT false,
  renewal_notice_days      INTEGER,

  -- Money (centavos throughout)
  currency                 TEXT NOT NULL DEFAULT '',
  committed_amount         BIGINT,
  released_amount          BIGINT NOT NULL DEFAULT 0,
  billed_amount            BIGINT NOT NULL DEFAULT 0,
  remaining_amount         BIGINT NOT NULL DEFAULT 0,
  cycle_amount             BIGINT,
  payment_term_id          TEXT REFERENCES payment_term(id),

  -- Quantity (BLANKET kind)
  commitment_quantity      DOUBLE PRECISION,
  released_quantity        DOUBLE PRECISION NOT NULL DEFAULT 0,

  -- Approval workflow
  requested_by             TEXT,
  requested_date           BIGINT,
  requested_date_string    TEXT,
  approved_by              TEXT,
  approved_date            BIGINT,
  approved_date_string     TEXT,
  rejection_reason         TEXT,

  -- Location scoping
  location_id              TEXT REFERENCES location(id),

  -- GL mapping
  expense_account_id       TEXT REFERENCES account(id),
  accrual_account_id       TEXT REFERENCES account(id),

  -- Categorization
  expenditure_category_id  TEXT REFERENCES expenditure_category(id),

  -- Notes & metadata
  notes                    TEXT,
  metadata                 JSONB,

  -- Employment-specific (only populated when kind == EMPLOYMENT)
  pay_frequency            TEXT,
  employment_class         TEXT,
  position                 TEXT,
  department               TEXT
);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_workspace_id            ON supplier_contract(workspace_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_supplier_id             ON supplier_contract(supplier_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_kind                    ON supplier_contract(kind);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_status                  ON supplier_contract(status);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_location_id             ON supplier_contract(location_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_expense_account_id      ON supplier_contract(expense_account_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_payment_term_id         ON supplier_contract(payment_term_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_expenditure_category_id ON supplier_contract(expenditure_category_id);
-- ============================================================================
-- Table: supplier_contract_line
-- Per-product / per-service line within a contract. Mirrors ProductPricePlan
-- on the revenue side. Treatment enum (RECURRING / ONE_TIME / USAGE_BASED /
-- MINIMUM_COMMITMENT) drives accounting + billing.
-- ============================================================================
CREATE TABLE IF NOT EXISTS supplier_contract_line (
  id                       TEXT PRIMARY KEY,

  -- Parent contract
  supplier_contract_id     TEXT NOT NULL REFERENCES supplier_contract(id),

  -- Product (optional — bespoke lines need not map to a catalog product)
  product_id               TEXT REFERENCES product(id),

  -- Line details
  description              TEXT NOT NULL DEFAULT '',
  line_type                TEXT NOT NULL DEFAULT '',
  quantity                 DOUBLE PRECISION NOT NULL DEFAULT 0,
  unit_price               BIGINT NOT NULL DEFAULT 0,
  total_amount             BIGINT NOT NULL DEFAULT 0,

  -- Treatment (proto enum tag)
  treatment                INTEGER NOT NULL DEFAULT 0,

  -- Per-line date window
  start_date               TEXT,
  end_date                 TEXT,

  -- GL mapping (overrides header)
  expenditure_category_id  TEXT REFERENCES expenditure_category(id),
  expense_account_id       TEXT REFERENCES account(id),

  -- Receiving location
  location_id              TEXT REFERENCES location(id),

  -- Display ordering
  line_number              INTEGER NOT NULL DEFAULT 0,

  -- Audit
  active                   BOOLEAN NOT NULL DEFAULT true,
  date_created             BIGINT,
  date_created_string      TEXT,
  date_modified            BIGINT,
  date_modified_string     TEXT,

  -- Discriminator (drives payroll calculator routing on EMPLOYMENT contract
  -- lines; ignored for vendor contracts where line_type is sufficient)
  kind                     INTEGER
);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_line_supplier_contract_id    ON supplier_contract_line(supplier_contract_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_line_product_id              ON supplier_contract_line(product_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_line_kind                    ON supplier_contract_line(kind);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_line_expenditure_category_id ON supplier_contract_line(expenditure_category_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_line_expense_account_id      ON supplier_contract_line(expense_account_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_line_location_id             ON supplier_contract_line(location_id);
-- ============================================================================
-- Table: procurement_request
-- Internal purchase intent. supplier_id is nullable (RFQ flow may pre-date
-- supplier selection). On approval, SpawnPurchaseOrder creates a PO whose
-- procurement_request_id references this row.
-- ============================================================================
CREATE TABLE IF NOT EXISTS procurement_request (
  id                       TEXT PRIMARY KEY,
  workspace_id             TEXT NOT NULL REFERENCES workspace(id),

  -- Audit
  date_created             BIGINT,
  date_created_string      TEXT,
  date_modified            BIGINT,
  date_modified_string     TEXT,
  active                   BOOLEAN NOT NULL DEFAULT true,
  request_number           TEXT NOT NULL UNIQUE,

  -- Status (proto enum tag)
  status                   INTEGER NOT NULL DEFAULT 0,

  -- Requester
  requester_user_id        TEXT NOT NULL DEFAULT '',

  -- Counterparty (optional — RFQ may have no supplier yet)
  supplier_id              TEXT REFERENCES supplier(id),

  -- Scope
  location_id              TEXT REFERENCES location(id),

  -- Money
  currency                 TEXT NOT NULL DEFAULT '',
  estimated_total_amount   BIGINT NOT NULL DEFAULT 0,

  -- Needed-by
  needed_by_date           TEXT,

  -- Justification
  justification            TEXT,
  notes                    TEXT,

  -- Approval
  approved_by              TEXT,
  approved_at              BIGINT,
  approved_at_string       TEXT,
  rejection_reason         TEXT,

  -- Spawned artifacts (set after approval)
  purchase_order_id        TEXT REFERENCES purchase_order(id),

  -- GL / categorization
  expenditure_category_id  TEXT REFERENCES expenditure_category(id),
  expense_account_id       TEXT REFERENCES account(id)
);
CREATE INDEX IF NOT EXISTS idx_procurement_request_workspace_id            ON procurement_request(workspace_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_supplier_id             ON procurement_request(supplier_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_status                  ON procurement_request(status);
CREATE INDEX IF NOT EXISTS idx_procurement_request_location_id             ON procurement_request(location_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_purchase_order_id       ON procurement_request(purchase_order_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_expenditure_category_id ON procurement_request(expenditure_category_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_expense_account_id      ON procurement_request(expense_account_id);
-- ============================================================================
-- Table: procurement_request_line
-- Line item on a ProcurementRequest. May optionally pre-link to a contract
-- line via supplier_contract_line_id (no DB constraint per progress.md §P1.4
-- — application-level FK only).
-- ============================================================================
CREATE TABLE IF NOT EXISTS procurement_request_line (
  id                          TEXT PRIMARY KEY,

  -- Parent request
  procurement_request_id      TEXT NOT NULL REFERENCES procurement_request(id),

  -- Product (optional)
  product_id                  TEXT REFERENCES product(id),

  -- Line details
  description                 TEXT NOT NULL DEFAULT '',
  line_type                   TEXT NOT NULL DEFAULT '',
  quantity                    DOUBLE PRECISION NOT NULL DEFAULT 0,
  estimated_unit_price        BIGINT NOT NULL DEFAULT 0,
  estimated_total_price       BIGINT NOT NULL DEFAULT 0,

  -- Pre-link to a contract line (application-level FK; no DB constraint)
  supplier_contract_line_id   TEXT,

  -- GL / categorization
  expenditure_category_id     TEXT REFERENCES expenditure_category(id),
  expense_account_id          TEXT REFERENCES account(id),

  -- Receiving location
  location_id                 TEXT REFERENCES location(id),

  -- Display ordering
  line_number                 INTEGER NOT NULL DEFAULT 0,

  -- Audit
  active                      BOOLEAN NOT NULL DEFAULT true,
  date_created                BIGINT,
  date_created_string         TEXT,
  date_modified               BIGINT,
  date_modified_string        TEXT
);
CREATE INDEX IF NOT EXISTS idx_procurement_request_line_procurement_request_id   ON procurement_request_line(procurement_request_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_line_product_id               ON procurement_request_line(product_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_line_supplier_contract_line_id ON procurement_request_line(supplier_contract_line_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_line_expenditure_category_id  ON procurement_request_line(expenditure_category_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_line_expense_account_id       ON procurement_request_line(expense_account_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_line_location_id              ON procurement_request_line(location_id);
-- purchase_order: fields 38, 39
ALTER TABLE purchase_order
  ADD COLUMN IF NOT EXISTS supplier_contract_id   TEXT REFERENCES supplier_contract(id),
  ADD COLUMN IF NOT EXISTS procurement_request_id TEXT REFERENCES procurement_request(id);
CREATE INDEX IF NOT EXISTS idx_purchase_order_supplier_contract_id   ON purchase_order(supplier_contract_id);
CREATE INDEX IF NOT EXISTS idx_purchase_order_procurement_request_id ON purchase_order(procurement_request_id);
-- purchase_order_line_item: fields 24, 25 (no DB constraint per proto comments —
-- these are application-level FKs, indexed for query performance only)
ALTER TABLE purchase_order_line_item
  ADD COLUMN IF NOT EXISTS supplier_contract_line_id   TEXT,
  ADD COLUMN IF NOT EXISTS procurement_request_line_id TEXT;
CREATE INDEX IF NOT EXISTS idx_purchase_order_line_item_supplier_contract_line_id   ON purchase_order_line_item(supplier_contract_line_id);
CREATE INDEX IF NOT EXISTS idx_purchase_order_line_item_procurement_request_line_id ON purchase_order_line_item(procurement_request_line_id);
-- expenditure: fields 28, 29
ALTER TABLE expenditure
  ADD COLUMN IF NOT EXISTS supplier_contract_id TEXT REFERENCES supplier_contract(id),
  ADD COLUMN IF NOT EXISTS petty_cash_fund_id   TEXT REFERENCES petty_cash_fund(id);
CREATE INDEX IF NOT EXISTS idx_expenditure_supplier_contract_id ON expenditure(supplier_contract_id);
CREATE INDEX IF NOT EXISTS idx_expenditure_petty_cash_fund_id   ON expenditure(petty_cash_fund_id);
-- expenditure_line_item: field 21 (application-level FK only)
ALTER TABLE expenditure_line_item
  ADD COLUMN IF NOT EXISTS supplier_contract_line_id TEXT;
CREATE INDEX IF NOT EXISTS idx_expenditure_line_item_supplier_contract_line_id ON expenditure_line_item(supplier_contract_line_id);
-- prepayment: fields 19, 20 (plan §11.5 — adopted, not deferred per proto)
ALTER TABLE prepayment
  ADD COLUMN IF NOT EXISTS supplier_contract_id TEXT REFERENCES supplier_contract(id),
  ADD COLUMN IF NOT EXISTS expenditure_id       TEXT REFERENCES expenditure(id);
CREATE INDEX IF NOT EXISTS idx_prepayment_supplier_contract_id ON prepayment(supplier_contract_id);
CREATE INDEX IF NOT EXISTS idx_prepayment_expenditure_id       ON prepayment(expenditure_id);
COMMIT;
