-- Model D refactor + variant_mode + unit + price optional
-- 1. Product: price nullable, variant_mode + unit columns
-- 2. ProductPlan: product_variant_id FK (catalog-level variant specificity)
-- 3. ProductPricePlan: product_plan_id FK replaces product_id (pricing joins through catalog line)

BEGIN;

-- ─────────────────────────────────────────────────────────────────────────────
-- Product: price optional, variant_mode, unit
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE "product" ALTER COLUMN "price" DROP NOT NULL;
ALTER TABLE "product" ADD COLUMN "variant_mode" TEXT NOT NULL DEFAULT 'none';
ALTER TABLE "product" ADD COLUMN "unit" TEXT NULL;

-- ─────────────────────────────────────────────────────────────────────────────
-- ProductPlan: variant_id FK
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE "product_plan"
  ADD COLUMN "product_variant_id" TEXT NULL;
ALTER TABLE "product_plan"
  ADD CONSTRAINT "fk_product_plan_product_variant_id"
  FOREIGN KEY ("product_variant_id") REFERENCES "product_variant"("id");
CREATE INDEX "idx_product_plan_product_variant_id" ON "product_plan" ("product_variant_id");

-- Variant-aware plan-membership uniqueness (one row per plan+product+variant)
CREATE UNIQUE INDEX "uq_product_plan_plan_product_variant"
  ON "product_plan" ("plan_id", "product_id", COALESCE("product_variant_id", ''));

-- ─────────────────────────────────────────────────────────────────────────────
-- ProductPricePlan: product_plan_id FK (backfill, then swap)
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE "product_price_plan"
  ADD COLUMN "product_plan_id" TEXT NULL;

-- Backfill: find the ProductPlan row matching this priced line via
--   ProductPricePlan.price_plan_id → PricePlan.plan_id → ProductPlan.plan_id
--   AND ProductPlan.product_id = ProductPricePlan.product_id
-- Assumes every PricePlan has a Plan and every priced product is in the Plan's catalog.
UPDATE "product_price_plan" ppp
SET "product_plan_id" = pp.id
FROM "price_plan" parent, "product_plan" pp
WHERE ppp.price_plan_id = parent.id
  AND pp.plan_id = parent.plan_id
  AND pp.product_id = ppp.product_id;

-- Fail loudly if any rows didn't backfill — these would orphan pricing data.
DO $$
DECLARE
  orphan_count INT;
BEGIN
  SELECT COUNT(*) INTO orphan_count FROM "product_price_plan" WHERE "product_plan_id" IS NULL;
  IF orphan_count > 0 THEN
    RAISE EXCEPTION
      'Model D backfill failed: % product_price_plan row(s) have no matching product_plan. '
      'Check that every PricePlan.plan_id has corresponding ProductPlan rows for each priced product.',
      orphan_count;
  END IF;
END $$;

ALTER TABLE "product_price_plan" ALTER COLUMN "product_plan_id" SET NOT NULL;
ALTER TABLE "product_price_plan"
  ADD CONSTRAINT "fk_product_price_plan_product_plan_id"
  FOREIGN KEY ("product_plan_id") REFERENCES "product_plan"("id")
  ON DELETE CASCADE;
CREATE INDEX "idx_product_price_plan_product_plan_id" ON "product_price_plan" ("product_plan_id");

-- Drop the legacy direct product_id FK + column
DROP INDEX IF EXISTS "idx_product_price_plan_product_id";
ALTER TABLE "product_price_plan" DROP CONSTRAINT IF EXISTS "fk_product_price_plan_product_id";
ALTER TABLE "product_price_plan" DROP COLUMN "product_id";

-- New uniqueness on the catalog-line scope
CREATE UNIQUE INDEX "uq_product_price_plan_price_plan_product_plan"
  ON "product_price_plan" ("price_plan_id", "product_plan_id");

COMMIT;
