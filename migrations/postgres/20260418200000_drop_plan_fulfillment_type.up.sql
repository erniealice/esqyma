-- Migration: drop_plan_fulfillment_type (up)
-- Dialect: postgres
-- Created: 2026-04-18T20:00:00Z

-- plan.fulfillment_type was vestigial: only display-only readers, no business logic
-- branched on it, and the badge color function (intervalVariant) switched on values
-- not in the field's own value set. Delivery semantics now live on Product.delivery_mode
-- per the 2026-04-18 product taxonomy refactor.
ALTER TABLE "plan" DROP COLUMN IF EXISTS "fulfillment_type";
