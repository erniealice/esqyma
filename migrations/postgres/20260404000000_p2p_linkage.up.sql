-- P2P Linkage: Add FK columns for procurement-to-payment cycle
-- Links expenditure (vendor bill) to purchase_order
-- Links expenditure_line_item to purchase_order_line_item for 3-way match

-- expenditure: add PO and supplier links
ALTER TABLE "expenditure"
  ADD COLUMN IF NOT EXISTS "purchase_order_id" TEXT,
  ADD COLUMN IF NOT EXISTS "supplier_id" TEXT;

-- expenditure_line_item: add PO line item, inventory, and location links
ALTER TABLE "expenditure_line_item"
  ADD COLUMN IF NOT EXISTS "purchase_order_line_item_id" TEXT,
  ADD COLUMN IF NOT EXISTS "inventory_item_id" TEXT,
  ADD COLUMN IF NOT EXISTS "location_id" TEXT;

-- FK constraints (use DO block for idempotency on older PG versions)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_expenditure_purchase_order_id') THEN
    ALTER TABLE "expenditure" ADD CONSTRAINT "fk_expenditure_purchase_order_id"
      FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_order" ("id");
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_expenditure_supplier_id') THEN
    ALTER TABLE "expenditure" ADD CONSTRAINT "fk_expenditure_supplier_id"
      FOREIGN KEY ("supplier_id") REFERENCES "supplier" ("id");
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_expenditure_line_item_po_line_id') THEN
    ALTER TABLE "expenditure_line_item" ADD CONSTRAINT "fk_expenditure_line_item_po_line_id"
      FOREIGN KEY ("purchase_order_line_item_id") REFERENCES "purchase_order_line_item" ("id");
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_expenditure_line_item_inventory_item_id') THEN
    ALTER TABLE "expenditure_line_item" ADD CONSTRAINT "fk_expenditure_line_item_inventory_item_id"
      FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item" ("id");
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_expenditure_line_item_location_id') THEN
    ALTER TABLE "expenditure_line_item" ADD CONSTRAINT "fk_expenditure_line_item_location_id"
      FOREIGN KEY ("location_id") REFERENCES "location" ("id");
  END IF;
END $$;

-- Indexes for FK lookups
CREATE INDEX IF NOT EXISTS "idx_expenditure_purchase_order_id"
  ON "expenditure" ("purchase_order_id");
CREATE INDEX IF NOT EXISTS "idx_expenditure_supplier_id"
  ON "expenditure" ("supplier_id");
CREATE INDEX IF NOT EXISTS "idx_expenditure_line_item_po_line_id"
  ON "expenditure_line_item" ("purchase_order_line_item_id");
CREATE INDEX IF NOT EXISTS "idx_expenditure_line_item_inventory_item_id"
  ON "expenditure_line_item" ("inventory_item_id");
