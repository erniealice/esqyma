-- Migration: sales_domain (up)
-- Dialect: postgres
-- Date: 2026-02-12
-- Description: Schema changes for sales domain epic (T01-T05)
--   T01: Add location_id to revenue
--   T02: Extend revenue_line_item (line_item_type, inventory refs; drop discount_amount)
--   T03: Extend revenue_payment (collection fields)
--   T04: Create inventory_serial_history table
--   T05: Drop sold_reference from inventory_serial
--   D22: Create collection_method table + seed data

-- ============================================
-- T01: revenue — add location_id
-- ============================================

ALTER TABLE "revenue" ADD COLUMN IF NOT EXISTS "location_id" TEXT;
CREATE INDEX IF NOT EXISTS "idx_revenue_location_id" ON "revenue" ("location_id");

-- ============================================
-- T02: revenue_line_item — extend for inventory
-- ============================================

ALTER TABLE "revenue_line_item" ADD COLUMN IF NOT EXISTS "line_item_type" TEXT DEFAULT 'item';
ALTER TABLE "revenue_line_item" ADD COLUMN IF NOT EXISTS "inventory_item_id" TEXT;
ALTER TABLE "revenue_line_item" ADD COLUMN IF NOT EXISTS "inventory_serial_id" TEXT;
CREATE INDEX IF NOT EXISTS "idx_revenue_line_item_inventory_item_id" ON "revenue_line_item" ("inventory_item_id");
ALTER TABLE "revenue_line_item" DROP COLUMN IF EXISTS "discount_amount";

-- ============================================
-- T03: revenue_payment — add collection fields
-- ============================================

ALTER TABLE "revenue_payment" ADD COLUMN IF NOT EXISTS "collection_method_id" TEXT;
ALTER TABLE "revenue_payment" ADD COLUMN IF NOT EXISTS "currency" TEXT DEFAULT 'PHP';
ALTER TABLE "revenue_payment" ADD COLUMN IF NOT EXISTS "reference_number" TEXT;
ALTER TABLE "revenue_payment" ADD COLUMN IF NOT EXISTS "collection_type" TEXT DEFAULT 'sale';
ALTER TABLE "revenue_payment" ADD COLUMN IF NOT EXISTS "status" TEXT DEFAULT 'completed';
CREATE INDEX IF NOT EXISTS "idx_revenue_payment_revenue_id" ON "revenue_payment" ("revenue_id");

-- ============================================
-- D22: collection_method — new table + seed
-- ============================================

CREATE TABLE IF NOT EXISTS "collection_method" (
  "id" TEXT PRIMARY KEY,
  "date_created" TIMESTAMPTZ DEFAULT NOW(),
  "date_modified" TIMESTAMPTZ DEFAULT NOW(),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "provider_name" TEXT NULL
);

INSERT INTO "collection_method" ("id", "name", "active") VALUES
  ('cash', 'Cash', true),
  ('card', 'Credit/Debit Card', true),
  ('gcash', 'GCash', true),
  ('bank_transfer', 'Bank Transfer', true),
  ('other', 'Other', true)
ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- T04: inventory_serial_history — new table
-- ============================================

CREATE TABLE IF NOT EXISTS "inventory_serial_history" (
  "id" TEXT PRIMARY KEY,
  "date_created" TIMESTAMPTZ DEFAULT NOW(),
  "inventory_serial_id" TEXT NOT NULL,
  "inventory_item_id" TEXT NOT NULL,
  "from_status" TEXT NOT NULL DEFAULT '',
  "to_status" TEXT NOT NULL DEFAULT '',
  "reference_type" TEXT NOT NULL DEFAULT '',
  "reference_id" TEXT NOT NULL DEFAULT '',
  "notes" TEXT DEFAULT '',
  "changed_by" TEXT NOT NULL DEFAULT '',
  "changed_by_role" TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS "idx_inventory_serial_history_inventory_serial_id"
  ON "inventory_serial_history" ("inventory_serial_id");
CREATE INDEX IF NOT EXISTS "idx_inventory_serial_history_inventory_item_id"
  ON "inventory_serial_history" ("inventory_item_id");

-- ============================================
-- T05: inventory_serial — drop sold_reference
-- ============================================

ALTER TABLE "inventory_serial" DROP COLUMN IF EXISTS "sold_reference";
