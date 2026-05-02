-- Migration: price_plan_cascade_delete (up)
-- Dialect: postgres
-- Created: 2026-04-17T21:00:00Z
--
-- PricePlan now hard-deletes (active=false is the soft-delete slot, owned by
-- activate/deactivate). ProductPricePlan is purely a child breakdown — when
-- the parent plan is removed, its per-product prices should go with it.

ALTER TABLE product_price_plan DROP CONSTRAINT IF EXISTS product_price_plan_price_plan_id_fkey;
ALTER TABLE product_price_plan ADD CONSTRAINT product_price_plan_price_plan_id_fkey
    FOREIGN KEY (price_plan_id) REFERENCES price_plan(id) ON DELETE CASCADE;
