-- Migration: product_expected_cost (up)
-- Dialect: postgres
-- Created: 2026-04-27T15:07:00Z
-- Rationale: Adds expected_cost (centavos), expected_cost_currency, and
--            default_template_id to the product table. expected_cost is the
--            flat standard-cost field for Wave 1; effectivity-windowing waits
--            for v2. default_template_id lets a product nominate its default
--            routing/recipe. See redesign-proto.md §5.1.

BEGIN;

ALTER TABLE product
  ADD COLUMN IF NOT EXISTS expected_cost          BIGINT,
  ADD COLUMN IF NOT EXISTS expected_cost_currency TEXT,
  ADD COLUMN IF NOT EXISTS default_template_id    TEXT REFERENCES job_template(id);

CREATE INDEX idx_product_default_template_id
  ON product(default_template_id) WHERE default_template_id IS NOT NULL;

COMMIT;
