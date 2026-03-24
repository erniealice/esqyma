-- Migration: add_client_id_to_revenue (up)
-- Dialect: postgres
-- Date: 2026-03-24
-- Description: Add client_id column to revenue table.
--   The revenue proto (field 9) references a client FK but the column was
--   missing from the DB, causing "pq: column rv.client_id does not exist"
--   on the /app/revenue/list/* pages.

ALTER TABLE "revenue" ADD COLUMN IF NOT EXISTS "client_id" TEXT;
CREATE INDEX IF NOT EXISTS "idx_revenue_client_id" ON "revenue" ("client_id");
