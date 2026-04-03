-- Migration: Revenue Recognition — proto changes for pricing model + subscription linkage

-- Revenue: add subscription_id FK
ALTER TABLE "revenue" ADD COLUMN IF NOT EXISTS "subscription_id" TEXT NULL REFERENCES "subscription"("id");

-- ProductPlan: add plan_id FK
ALTER TABLE "product_plan" ADD COLUMN IF NOT EXISTS "plan_id" TEXT NULL REFERENCES "plan"("id");
CREATE INDEX IF NOT EXISTS "idx_product_plan_plan_id" ON "product_plan" ("plan_id");

-- PricePlan: add location_id FK
ALTER TABLE "price_plan" ADD COLUMN IF NOT EXISTS "location_id" TEXT NULL REFERENCES "location"("id");
CREATE INDEX IF NOT EXISTS "idx_price_plan_location_id" ON "price_plan" ("location_id");

-- ProductPricePlan: new table
CREATE TABLE IF NOT EXISTS "product_price_plan" (
    "id" TEXT PRIMARY KEY,
    "date_created" TIMESTAMPTZ NULL,
    "date_modified" TIMESTAMPTZ NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "price_plan_id" TEXT NOT NULL REFERENCES "price_plan"("id"),
    "product_id" TEXT NOT NULL REFERENCES "product"("id"),
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'PHP'
);
CREATE INDEX IF NOT EXISTS "idx_product_price_plan_price_plan_id" ON "product_price_plan" ("price_plan_id");
CREATE INDEX IF NOT EXISTS "idx_product_price_plan_product_id" ON "product_price_plan" ("product_id");
