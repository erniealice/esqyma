-- Migration: pricing_unification_fields (down)
-- Dialect: postgres
-- Created: 2026-04-21T13:00:00Z
--
-- Reverts Phase 0 pricing unification DDL: drops support indexes, then removes
-- the added columns from product_price_plan and price_plan in reverse order.

BEGIN;

-- Drop support indexes
DROP INDEX IF EXISTS idx_revenue_line_item_product_price_plan_id;
DROP INDEX IF EXISTS idx_revenue_subscription_id;

-- product_price_plan: remove per-line cadence + effective date columns
ALTER TABLE product_price_plan
    DROP COLUMN IF EXISTS date_end,
    DROP COLUMN IF EXISTS date_start,
    DROP COLUMN IF EXISTS billing_treatment;

-- price_plan: remove billing signal columns
ALTER TABLE price_plan
    DROP COLUMN IF EXISTS default_term_unit,
    DROP COLUMN IF EXISTS default_term_value,
    DROP COLUMN IF EXISTS billing_cycle_unit,
    DROP COLUMN IF EXISTS billing_cycle_value,
    DROP COLUMN IF EXISTS amount_basis,
    DROP COLUMN IF EXISTS billing_kind;

COMMIT;
