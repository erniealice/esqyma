-- P2 migration: add supplier_subscription FK back-edges to expense_recognition
-- and expense_recognition_line.
--
-- Mirrors the selling-side shape:
--   revenue.subscription_id = 32
--   revenue_line_item.product_price_plan_id = 25
--   revenue_line_item.subscription_id = 29
--
-- FK constraints use NOT VALID so validation is deferred; column additions are
-- instant catalog-only changes. All statements are idempotent.

SET search_path TO public;

-- expense_recognition.supplier_subscription_id
ALTER TABLE expense_recognition
    ADD COLUMN IF NOT EXISTS supplier_subscription_id text;

ALTER TABLE expense_recognition
    ADD CONSTRAINT expense_recognition_supplier_subscription_id_fkey
    FOREIGN KEY (supplier_subscription_id)
    REFERENCES supplier_subscription(id)
    NOT VALID;

CREATE INDEX IF NOT EXISTS idx_expense_recognition_supplier_subscription_id
    ON expense_recognition(supplier_subscription_id);

-- expense_recognition_line.supplier_product_cost_plan_id
ALTER TABLE expense_recognition_line
    ADD COLUMN IF NOT EXISTS supplier_product_cost_plan_id text;

ALTER TABLE expense_recognition_line
    ADD CONSTRAINT expense_recognition_line_supplier_product_cost_plan_id_fkey
    FOREIGN KEY (supplier_product_cost_plan_id)
    REFERENCES supplier_product_cost_plan(id)
    NOT VALID;

CREATE INDEX IF NOT EXISTS idx_expense_recognition_line_supplier_product_cost_plan_id
    ON expense_recognition_line(supplier_product_cost_plan_id);

-- expense_recognition_line.supplier_subscription_id
ALTER TABLE expense_recognition_line
    ADD COLUMN IF NOT EXISTS supplier_subscription_id text;

ALTER TABLE expense_recognition_line
    ADD CONSTRAINT expense_recognition_line_supplier_subscription_id_fkey
    FOREIGN KEY (supplier_subscription_id)
    REFERENCES supplier_subscription(id)
    NOT VALID;

CREATE INDEX IF NOT EXISTS idx_expense_recognition_line_supplier_subscription_id
    ON expense_recognition_line(supplier_subscription_id);
