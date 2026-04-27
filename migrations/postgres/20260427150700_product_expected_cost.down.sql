-- Migration: product_expected_cost (down)
-- Dialect: postgres
-- Created: 2026-04-27T15:07:00Z

BEGIN;

DROP INDEX IF EXISTS idx_product_default_template_id;

ALTER TABLE product
  DROP COLUMN IF EXISTS default_template_id,
  DROP COLUMN IF EXISTS expected_cost_currency,
  DROP COLUMN IF EXISTS expected_cost;

COMMIT;
