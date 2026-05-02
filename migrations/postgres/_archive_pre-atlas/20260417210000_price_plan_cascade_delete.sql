ALTER TABLE product_price_plan DROP CONSTRAINT IF EXISTS product_price_plan_price_plan_id_fkey;
ALTER TABLE product_price_plan ADD CONSTRAINT product_price_plan_price_plan_id_fkey
    FOREIGN KEY (price_plan_id) REFERENCES price_plan(id) ON DELETE CASCADE;
