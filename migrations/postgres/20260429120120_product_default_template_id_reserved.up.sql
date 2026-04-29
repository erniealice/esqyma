-- Migration: product_default_template_id_reserved (up)
-- Dialect: postgres
-- Created: 2026-04-29T12:01:20Z
-- Rationale: Drops product.default_template_id. The column was added in
--            20260427150700_product_expected_cost but never populated in
--            production seeds. Per auto-spawn-jobs-from-subscription plan §17
--            Decision 9 (data-model reframe), Products are value units and
--            cannot own a process anchor — Plan owns the JobTemplate FK
--            instead. Proto field 22 is now reserved. Idempotent via IF EXISTS
--            so this is a no-op on environments where the column is missing.

BEGIN;

DROP INDEX IF EXISTS idx_product_default_template_id;

ALTER TABLE product
  DROP COLUMN IF EXISTS default_template_id;

COMMIT;
