-- Migration: add_client_id_to_revenue (down)
-- Dialect: postgres
-- Date: 2026-03-24

DROP INDEX IF EXISTS "idx_revenue_client_id";
ALTER TABLE "revenue" DROP COLUMN IF EXISTS "client_id";
