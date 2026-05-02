-- Migration: pricing_unification_fields (up)
-- Dialect: postgres
-- Created: 2026-04-21T13:00:00Z
--
-- Phase 0 of the pricing unification (see docs/plan/20260421-pricing-unification/plan.md).
-- Adds the three orthogonal billing signals to price_plan (billing_kind, amount_basis,
-- split cycle/term durations) and per-line behavior + effective dates to product_price_plan.
--
-- Enum columns use plain TEXT and store the full protojson enum string name
-- (e.g. 'BILLING_KIND_UNSPECIFIED') — matching the adapter pattern: protojson.Marshal
-- serialises proto enum fields as their string name before writing to the DB.
--
-- Legacy duration_value/duration_unit on price_plan are kept in place — Phase 1
-- backfill reads them to classify rows; Phase 3 drops them.

BEGIN;

-- price_plan: three orthogonal billing signals
ALTER TABLE price_plan
    ADD COLUMN IF NOT EXISTS billing_kind        TEXT NOT NULL DEFAULT 'BILLING_KIND_UNSPECIFIED',
    ADD COLUMN IF NOT EXISTS amount_basis        TEXT NOT NULL DEFAULT 'AMOUNT_BASIS_UNSPECIFIED',
    ADD COLUMN IF NOT EXISTS billing_cycle_value INTEGER,
    ADD COLUMN IF NOT EXISTS billing_cycle_unit  TEXT,
    ADD COLUMN IF NOT EXISTS default_term_value  INTEGER,
    ADD COLUMN IF NOT EXISTS default_term_unit   TEXT;

-- product_price_plan: per-line cadence + effective dates
ALTER TABLE product_price_plan
    ADD COLUMN IF NOT EXISTS billing_treatment TEXT NOT NULL DEFAULT 'BILLING_TREATMENT_UNSPECIFIED',
    ADD COLUMN IF NOT EXISTS date_start        TEXT,
    ADD COLUMN IF NOT EXISTS date_end          TEXT;

-- Support indexes for Phase 1 backfill + invoice generator queries joining
-- revenue(subscription_id) ⟕ revenue_line_item(product_price_plan_id)
-- to detect "has this subscription already billed this PPP?"
CREATE INDEX IF NOT EXISTS idx_revenue_subscription_id
    ON revenue (subscription_id) WHERE subscription_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_revenue_line_item_product_price_plan_id
    ON revenue_line_item (product_price_plan_id) WHERE product_price_plan_id IS NOT NULL;

COMMIT;
