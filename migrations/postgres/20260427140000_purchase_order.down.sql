-- Migration: purchase_order (down)
-- Dialect: postgres
-- Created: 2026-04-27T14:00:00Z

BEGIN;

-- Remove the FK we wired onto procurement_request
ALTER TABLE procurement_request
  DROP CONSTRAINT IF EXISTS fk_procurement_request_purchase_order_id;

-- Drop in reverse dependency order
DROP TABLE IF EXISTS purchase_order_line_item;
DROP TABLE IF EXISTS purchase_order;

COMMIT;
