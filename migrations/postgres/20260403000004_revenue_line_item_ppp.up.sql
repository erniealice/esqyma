-- RevenueLineItem: add product_price_plan_id FK for subscription-derived revenue traceability
ALTER TABLE "revenue_line_item" ADD COLUMN IF NOT EXISTS "product_price_plan_id" TEXT NULL REFERENCES "product_price_plan"("id");
CREATE INDEX IF NOT EXISTS "idx_revenue_line_item_product_price_plan_id" ON "revenue_line_item" ("product_price_plan_id");
