-- Rollback Model D refactor + variant_mode + unit + price optional
-- Inverse of 20260423140000_pricing_model_d.up.sql

BEGIN;

-- ─────────────────────────────────────────────────────────────────────────────
-- ProductPricePlan: restore product_id, drop product_plan_id
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE "product_price_plan" ADD COLUMN "product_id" TEXT NULL;

-- Recover product_id by joining through the restored path
UPDATE "product_price_plan" ppp
SET "product_id" = pp.product_id
FROM "product_plan" pp
WHERE ppp.product_plan_id = pp.id;

DO $$
DECLARE
  orphan_count INT;
BEGIN
  SELECT COUNT(*) INTO orphan_count FROM "product_price_plan" WHERE "product_id" IS NULL;
  IF orphan_count > 0 THEN
    RAISE EXCEPTION 'Model D rollback failed: % product_price_plan row(s) have no product_id', orphan_count;
  END IF;
END $$;

ALTER TABLE "product_price_plan" ALTER COLUMN "product_id" SET NOT NULL;
ALTER TABLE "product_price_plan"
  ADD CONSTRAINT "fk_product_price_plan_product_id"
  FOREIGN KEY ("product_id") REFERENCES "product"("id");
CREATE INDEX "idx_product_price_plan_product_id" ON "product_price_plan" ("product_id");

DROP INDEX IF EXISTS "uq_product_price_plan_price_plan_product_plan";
DROP INDEX IF EXISTS "idx_product_price_plan_product_plan_id";
ALTER TABLE "product_price_plan" DROP CONSTRAINT IF EXISTS "fk_product_price_plan_product_plan_id";
ALTER TABLE "product_price_plan" DROP COLUMN "product_plan_id";

-- ─────────────────────────────────────────────────────────────────────────────
-- ProductPlan: drop variant_id FK
-- ─────────────────────────────────────────────────────────────────────────────
DROP INDEX IF EXISTS "uq_product_plan_plan_product_variant";
DROP INDEX IF EXISTS "idx_product_plan_product_variant_id";
ALTER TABLE "product_plan" DROP CONSTRAINT IF EXISTS "fk_product_plan_product_variant_id";
ALTER TABLE "product_plan" DROP COLUMN "product_variant_id";

-- ─────────────────────────────────────────────────────────────────────────────
-- Product: drop variant_mode + unit, restore price NOT NULL
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE "product" DROP COLUMN "unit";
ALTER TABLE "product" DROP COLUMN "variant_mode";

-- Price NOT NULL restoration requires no null values; a safeguard:
UPDATE "product" SET "price" = 0 WHERE "price" IS NULL;
ALTER TABLE "product" ALTER COLUMN "price" SET NOT NULL;

COMMIT;
