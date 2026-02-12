-- Migration: sales_domain (down)
-- Dialect: postgres
-- Date: 2026-02-12
-- Reverses all sales domain schema changes

-- T05: Restore sold_reference to inventory_serial
ALTER TABLE "inventory_serial" ADD COLUMN IF NOT EXISTS "sold_reference" TEXT;

-- T04: Drop inventory_serial_history table
DROP INDEX IF EXISTS "idx_inventory_serial_history_inventory_item_id";
DROP INDEX IF EXISTS "idx_inventory_serial_history_inventory_serial_id";
DROP TABLE IF EXISTS "inventory_serial_history";

-- D22: Drop collection_method table and seed data
DROP TABLE IF EXISTS "collection_method";

-- T03: Remove collection fields from revenue_payment
DROP INDEX IF EXISTS "idx_revenue_payment_revenue_id";
ALTER TABLE "revenue_payment" DROP COLUMN IF EXISTS "status";
ALTER TABLE "revenue_payment" DROP COLUMN IF EXISTS "collection_type";
ALTER TABLE "revenue_payment" DROP COLUMN IF EXISTS "reference_number";
ALTER TABLE "revenue_payment" DROP COLUMN IF EXISTS "currency";
ALTER TABLE "revenue_payment" DROP COLUMN IF EXISTS "collection_method_id";

-- T02: Remove inventory fields from revenue_line_item, restore discount_amount
ALTER TABLE "revenue_line_item" DROP COLUMN IF EXISTS "inventory_serial_id";
DROP INDEX IF EXISTS "idx_revenue_line_item_inventory_item_id";
ALTER TABLE "revenue_line_item" DROP COLUMN IF EXISTS "inventory_item_id";
ALTER TABLE "revenue_line_item" DROP COLUMN IF EXISTS "line_item_type";
ALTER TABLE "revenue_line_item" ADD COLUMN IF NOT EXISTS "discount_amount" DOUBLE PRECISION DEFAULT 0;

-- T01: Remove location_id from revenue
DROP INDEX IF EXISTS "idx_revenue_location_id";
ALTER TABLE "revenue" DROP COLUMN IF EXISTS "location_id";
