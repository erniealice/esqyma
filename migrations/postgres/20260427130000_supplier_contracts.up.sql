-- Migration: supplier_contracts (up)
-- Dialect: postgres
-- Created: 2026-04-27T13:00:00Z
-- Rationale: Introduces SupplierContract, SupplierContractLine, ProcurementRequest,
--            ProcurementRequestLine entities and wires FK back-edges from existing
--            purchase_order, purchase_order_line_item, expenditure, expenditure_line_item,
--            prepayment tables.

BEGIN;

-- ============================================================
-- CREATE TABLE supplier_contract
-- ============================================================
CREATE TABLE IF NOT EXISTS supplier_contract (
  id                      TEXT PRIMARY KEY,
  workspace_id            TEXT NOT NULL REFERENCES workspace(id),
  internal_id             TEXT NOT NULL UNIQUE,

  -- Identity
  name                    TEXT NOT NULL,
  description             TEXT,
  reference_number        TEXT,

  -- Counterparty
  supplier_id             TEXT NOT NULL REFERENCES supplier(id),

  -- Discriminator and lifecycle
  kind                    TEXT NOT NULL DEFAULT '',
  status                  TEXT NOT NULL DEFAULT '',

  -- Recurrence
  billing_kind            TEXT,
  billing_cycle_value     INTEGER,
  billing_cycle_unit      TEXT,
  default_term_value      INTEGER,
  default_term_unit       TEXT,

  -- Validity window
  date_time_start         TEXT NOT NULL,
  date_time_end           TEXT,
  auto_renew              BOOLEAN NOT NULL DEFAULT false,
  renewal_notice_days     INTEGER,

  -- Money (centavos)
  currency                TEXT NOT NULL,
  committed_amount        BIGINT,
  released_amount         BIGINT NOT NULL DEFAULT 0,
  billed_amount           BIGINT NOT NULL DEFAULT 0,
  remaining_amount        BIGINT NOT NULL DEFAULT 0,
  cycle_amount            BIGINT,
  payment_term_id         TEXT REFERENCES payment_term(id),

  -- Quantity (for blanket kind)
  commitment_quantity     DOUBLE PRECISION,
  released_quantity       DOUBLE PRECISION NOT NULL DEFAULT 0,

  -- Approval workflow
  requested_by            TEXT,
  requested_date          BIGINT,
  requested_date_string   TEXT,
  approved_by             TEXT,
  approved_date           BIGINT,
  approved_date_string    TEXT,
  rejection_reason        TEXT,

  -- Location
  location_id             TEXT REFERENCES location(id),

  -- GL mapping
  expense_account_id      TEXT REFERENCES account(id),
  accrual_account_id      TEXT REFERENCES account(id),

  -- Categorization
  expenditure_category_id TEXT REFERENCES expenditure_category(id),

  -- Notes
  notes                   TEXT,

  -- Audit
  active                  BOOLEAN NOT NULL DEFAULT true,
  date_created            TIMESTAMPTZ DEFAULT NOW(),
  date_modified           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_supplier_contract_workspace_id       ON supplier_contract(workspace_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_supplier_id        ON supplier_contract(supplier_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_status             ON supplier_contract(status);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_kind               ON supplier_contract(kind);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_location_id        ON supplier_contract(location_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_expense_account_id ON supplier_contract(expense_account_id);

-- ============================================================
-- CREATE TABLE supplier_contract_line
-- ============================================================
CREATE TABLE IF NOT EXISTS supplier_contract_line (
  id                      TEXT PRIMARY KEY,
  supplier_contract_id    TEXT NOT NULL REFERENCES supplier_contract(id),

  -- Product (optional)
  product_id              TEXT REFERENCES product(id),

  -- Line details
  description             TEXT NOT NULL DEFAULT '',
  line_type               TEXT NOT NULL DEFAULT '',   -- "goods" | "service" | "expense"
  quantity                DOUBLE PRECISION NOT NULL DEFAULT 0,
  unit_price              BIGINT NOT NULL DEFAULT 0,  -- centavos
  total_amount            BIGINT NOT NULL DEFAULT 0,  -- centavos

  -- Treatment
  treatment               TEXT NOT NULL DEFAULT '',

  -- Date window
  start_date              TEXT,
  end_date                TEXT,

  -- GL mapping
  expenditure_category_id TEXT REFERENCES expenditure_category(id),
  expense_account_id      TEXT REFERENCES account(id),

  -- Receiving location
  location_id             TEXT REFERENCES location(id),

  -- Display ordering
  line_number             INTEGER NOT NULL DEFAULT 0,

  -- Audit
  active                  BOOLEAN NOT NULL DEFAULT true,
  date_created            TIMESTAMPTZ DEFAULT NOW(),
  date_modified           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_supplier_contract_line_supplier_contract_id ON supplier_contract_line(supplier_contract_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_line_product_id           ON supplier_contract_line(product_id);

-- ============================================================
-- CREATE TABLE procurement_request
-- ============================================================
CREATE TABLE IF NOT EXISTS procurement_request (
  id                      TEXT PRIMARY KEY,
  workspace_id            TEXT NOT NULL REFERENCES workspace(id),
  request_number          TEXT NOT NULL UNIQUE,

  -- Status
  status                  TEXT NOT NULL DEFAULT '',

  -- Requester
  requester_user_id       TEXT NOT NULL,

  -- Counterparty (optional — may be null for RFQ pre-quote)
  supplier_id             TEXT REFERENCES supplier(id),

  -- Scope
  location_id             TEXT REFERENCES location(id),

  -- Money
  currency                TEXT NOT NULL,
  estimated_total_amount  BIGINT NOT NULL DEFAULT 0,  -- centavos

  -- Needed-by
  needed_by_date          TEXT,

  -- Justification
  justification           TEXT,
  notes                   TEXT,

  -- Approval
  approved_by             TEXT,
  approved_at             BIGINT,
  approved_at_string      TEXT,
  rejection_reason        TEXT,

  -- Spawned artifacts (FK to purchase_order added conditionally below if table exists)
  purchase_order_id       TEXT,

  -- GL / categorization
  expenditure_category_id TEXT REFERENCES expenditure_category(id),
  expense_account_id      TEXT REFERENCES account(id),

  -- Audit
  active                  BOOLEAN NOT NULL DEFAULT true,
  date_created            TIMESTAMPTZ DEFAULT NOW(),
  date_modified           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_procurement_request_workspace_id ON procurement_request(workspace_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_supplier_id  ON procurement_request(supplier_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_status       ON procurement_request(status);
CREATE INDEX IF NOT EXISTS idx_procurement_request_location_id  ON procurement_request(location_id);

-- Add FK constraint on procurement_request.purchase_order_id only when table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'purchase_order') THEN
    ALTER TABLE procurement_request
      ADD CONSTRAINT fk_procurement_request_purchase_order_id
      FOREIGN KEY (purchase_order_id) REFERENCES purchase_order(id);
  END IF;
END $$;

-- ============================================================
-- CREATE TABLE procurement_request_line
-- ============================================================
CREATE TABLE IF NOT EXISTS procurement_request_line (
  id                       TEXT PRIMARY KEY,
  procurement_request_id   TEXT NOT NULL REFERENCES procurement_request(id),

  -- Product (optional)
  product_id               TEXT REFERENCES product(id),

  -- Line details
  description              TEXT NOT NULL DEFAULT '',
  line_type                TEXT NOT NULL DEFAULT '',    -- "goods" | "service" | "expense"
  quantity                 DOUBLE PRECISION NOT NULL DEFAULT 0,
  estimated_unit_price     BIGINT NOT NULL DEFAULT 0,  -- centavos
  estimated_total_price    BIGINT NOT NULL DEFAULT 0,  -- centavos

  -- Pre-link to a contract line (no FK constraint — may be set before contract exists)
  supplier_contract_line_id TEXT,

  -- GL / categorization
  expenditure_category_id  TEXT REFERENCES expenditure_category(id),
  expense_account_id       TEXT REFERENCES account(id),

  -- Receiving location
  location_id              TEXT REFERENCES location(id),

  -- Display ordering
  line_number              INTEGER NOT NULL DEFAULT 0,

  -- Audit
  active                   BOOLEAN NOT NULL DEFAULT true,
  date_created             TIMESTAMPTZ DEFAULT NOW(),
  date_modified            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_procurement_request_line_procurement_request_id ON procurement_request_line(procurement_request_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_line_product_id             ON procurement_request_line(product_id);

-- ============================================================
-- FK back-edges: purchase_order (only if table exists)
-- ============================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'purchase_order') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'purchase_order' AND column_name = 'supplier_contract_id') THEN
      ALTER TABLE purchase_order ADD COLUMN supplier_contract_id TEXT REFERENCES supplier_contract(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'purchase_order' AND column_name = 'procurement_request_id') THEN
      ALTER TABLE purchase_order ADD COLUMN procurement_request_id TEXT REFERENCES procurement_request(id);
    END IF;
    CREATE INDEX IF NOT EXISTS idx_purchase_order_supplier_contract_id   ON purchase_order(supplier_contract_id);
    CREATE INDEX IF NOT EXISTS idx_purchase_order_procurement_request_id ON purchase_order(procurement_request_id);
  END IF;
END $$;

-- ============================================================
-- FK back-edges: purchase_order_line_item (only if table exists)
-- ============================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'purchase_order_line_item') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'purchase_order_line_item' AND column_name = 'supplier_contract_line_id') THEN
      ALTER TABLE purchase_order_line_item ADD COLUMN supplier_contract_line_id TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'purchase_order_line_item' AND column_name = 'procurement_request_line_id') THEN
      ALTER TABLE purchase_order_line_item ADD COLUMN procurement_request_line_id TEXT;
    END IF;
    CREATE INDEX IF NOT EXISTS idx_purchase_order_line_item_supplier_contract_line_id   ON purchase_order_line_item(supplier_contract_line_id);
    CREATE INDEX IF NOT EXISTS idx_purchase_order_line_item_procurement_request_line_id ON purchase_order_line_item(procurement_request_line_id);
  END IF;
END $$;

-- ============================================================
-- FK back-edges: expenditure
-- ============================================================
ALTER TABLE expenditure
  ADD COLUMN IF NOT EXISTS supplier_contract_id TEXT REFERENCES supplier_contract(id);
ALTER TABLE expenditure
  ADD COLUMN IF NOT EXISTS petty_cash_fund_id TEXT REFERENCES petty_cash_fund(id);

CREATE INDEX IF NOT EXISTS idx_expenditure_supplier_contract_id ON expenditure(supplier_contract_id);
CREATE INDEX IF NOT EXISTS idx_expenditure_petty_cash_fund_id   ON expenditure(petty_cash_fund_id);

-- ============================================================
-- FK back-edges: expenditure_line_item
-- ============================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'expenditure_line_item') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'expenditure_line_item' AND column_name = 'supplier_contract_line_id') THEN
      ALTER TABLE expenditure_line_item ADD COLUMN supplier_contract_line_id TEXT;
    END IF;
    CREATE INDEX IF NOT EXISTS idx_expenditure_line_item_supplier_contract_line_id ON expenditure_line_item(supplier_contract_line_id);
  END IF;
END $$;

-- ============================================================
-- FK back-edges: prepayment
-- ============================================================
ALTER TABLE prepayment
  ADD COLUMN IF NOT EXISTS supplier_contract_id TEXT REFERENCES supplier_contract(id);
ALTER TABLE prepayment
  ADD COLUMN IF NOT EXISTS expenditure_id TEXT REFERENCES expenditure(id);

CREATE INDEX IF NOT EXISTS idx_prepayment_supplier_contract_id ON prepayment(supplier_contract_id);
CREATE INDEX IF NOT EXISTS idx_prepayment_expenditure_id       ON prepayment(expenditure_id);

COMMIT;
