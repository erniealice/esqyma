-- Migration: product_default_template_id_reserved (down)
-- Dialect: postgres
-- Created: 2026-04-29T12:01:20Z
-- Rationale: Reverses 20260429120120. Re-adds product.default_template_id
--            column and its index. Note: proto field 22 is permanently
--            reserved, so even if this rollback runs the field will not
--            be readable via proto. This down-migration exists only for
--            local-dev forward/back testing.

BEGIN;

ALTER TABLE product
  ADD COLUMN IF NOT EXISTS default_template_id TEXT REFERENCES job_template(id);

CREATE INDEX IF NOT EXISTS idx_product_default_template_id
  ON product(default_template_id) WHERE default_template_id IS NOT NULL;

COMMIT;
