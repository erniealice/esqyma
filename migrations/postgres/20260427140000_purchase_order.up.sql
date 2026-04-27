-- Migration: purchase_order (up)
-- Dialect: postgres
-- Created: 2026-04-27T14:00:00Z
-- Rationale: Creates purchase_order and purchase_order_line_item tables that were
--            referenced but missing from the dev DB. Must run AFTER
--            20260427130000_supplier_contracts so FK back-edges
--            (supplier_contract_id, procurement_request_id) can be applied inline.

BEGIN;

-- ============================================================
-- CREATE TABLE purchase_order
-- ============================================================
CREATE TABLE IF NOT EXISTS purchase_order (
  id                        TEXT PRIMARY KEY,
  po_number                 TEXT NOT NULL UNIQUE,          -- Human-readable PO number
  po_type                   TEXT NOT NULL DEFAULT '',      -- "standard" | "blanket" | "contract"
  status                    TEXT NOT NULL DEFAULT '',      -- lifecycle state

  -- Vendor
  supplier_id               TEXT NOT NULL REFERENCES supplier(id),

  -- Location (receiving warehouse)
  location_id               TEXT REFERENCES location(id),

  -- Dates (unix epoch ms stored as BIGINT; _string columns are display-only ISO strings)
  order_date                BIGINT,
  order_date_string         TEXT,
  expected_delivery_date    BIGINT,
  expected_delivery_date_string TEXT,

  -- Amounts (centavos)
  currency                  TEXT NOT NULL DEFAULT '',
  subtotal                  BIGINT NOT NULL DEFAULT 0,
  tax_amount                BIGINT NOT NULL DEFAULT 0,
  total_amount              BIGINT NOT NULL DEFAULT 0,

  -- Terms
  payment_terms             TEXT,
  shipping_terms            TEXT,

  -- Approval
  approved_by               TEXT,
  approved_date             BIGINT,
  approved_date_string      TEXT,

  -- Blanket order fields
  parent_po_id              TEXT REFERENCES purchase_order(id),
  blanket_start_date        TEXT,                          -- ISO 8601 date (YYYY-MM-DD)
  blanket_end_date          TEXT,                          -- ISO 8601 date (YYYY-MM-DD)
  blanket_total_quantity    DOUBLE PRECISION NOT NULL DEFAULT 0,
  blanket_released_quantity DOUBLE PRECISION NOT NULL DEFAULT 0,

  -- Notes
  notes                     TEXT,
  reference_number          TEXT,

  -- Payment term
  payment_term_id           TEXT REFERENCES payment_term(id),

  -- Supplier commitment back-edges (populated once supplier_contract table exists)
  supplier_contract_id      TEXT REFERENCES supplier_contract(id),
  procurement_request_id    TEXT REFERENCES procurement_request(id),

  -- Audit
  active                    BOOLEAN NOT NULL DEFAULT true,
  date_created              TIMESTAMPTZ DEFAULT NOW(),
  date_modified             TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_purchase_order_po_number
  ON purchase_order(po_number);

CREATE INDEX IF NOT EXISTS idx_purchase_order_supplier_id
  ON purchase_order(supplier_id);

CREATE INDEX IF NOT EXISTS idx_purchase_order_location_id
  ON purchase_order(location_id);

CREATE INDEX IF NOT EXISTS idx_purchase_order_supplier_contract_id
  ON purchase_order(supplier_contract_id);

CREATE INDEX IF NOT EXISTS idx_purchase_order_procurement_request_id
  ON purchase_order(procurement_request_id);

-- ============================================================
-- CREATE TABLE purchase_order_line_item
-- ============================================================
CREATE TABLE IF NOT EXISTS purchase_order_line_item (
  id                         TEXT PRIMARY KEY,

  -- Parent PO
  purchase_order_id          TEXT NOT NULL REFERENCES purchase_order(id),

  -- Product (optional)
  product_id                 TEXT REFERENCES product(id),

  -- Line details
  description                TEXT NOT NULL DEFAULT '',
  line_type                  TEXT NOT NULL DEFAULT '',     -- "goods" | "service" | "expense"
  quantity_ordered           DOUBLE PRECISION NOT NULL DEFAULT 0,
  quantity_received          DOUBLE PRECISION NOT NULL DEFAULT 0,  -- Updated on goods receipt
  quantity_billed            DOUBLE PRECISION NOT NULL DEFAULT 0,  -- Updated on invoice match
  unit_price                 BIGINT NOT NULL DEFAULT 0,    -- centavos
  total_price                BIGINT NOT NULL DEFAULT 0,    -- centavos

  -- Receiving location
  location_id                TEXT REFERENCES location(id),
  inventory_item_id          TEXT REFERENCES inventory_item(id),

  -- Delivery date
  required_by_date           BIGINT,
  required_by_date_string    TEXT,

  -- Notes
  notes                      TEXT,
  line_number                INTEGER NOT NULL DEFAULT 0,   -- Display ordering

  -- Supplier commitment back-edges (no FK constraint per proto comments)
  supplier_contract_line_id  TEXT,
  procurement_request_line_id TEXT,

  -- Audit
  active                     BOOLEAN NOT NULL DEFAULT true,
  date_created               TIMESTAMPTZ DEFAULT NOW(),
  date_modified              TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_purchase_order_line_item_purchase_order_id
  ON purchase_order_line_item(purchase_order_id);

CREATE INDEX IF NOT EXISTS idx_purchase_order_line_item_product_id
  ON purchase_order_line_item(product_id);

CREATE INDEX IF NOT EXISTS idx_purchase_order_line_item_supplier_contract_line_id
  ON purchase_order_line_item(supplier_contract_line_id);

CREATE INDEX IF NOT EXISTS idx_purchase_order_line_item_procurement_request_line_id
  ON purchase_order_line_item(procurement_request_line_id);

-- ============================================================
-- Wire the FK on procurement_request.purchase_order_id now that
-- purchase_order exists. The supplier_contracts migration skipped
-- this with a DO $$ guard because the table was absent.
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'fk_procurement_request_purchase_order_id'
      AND table_name = 'procurement_request'
  ) THEN
    ALTER TABLE procurement_request
      ADD CONSTRAINT fk_procurement_request_purchase_order_id
      FOREIGN KEY (purchase_order_id) REFERENCES purchase_order(id);
  END IF;
END $$;

COMMIT;
