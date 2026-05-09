-- Reverse of 20260509100000_expense_recognition_supplier_subscription_fks.up.sql

DROP INDEX IF EXISTS idx_expense_recognition_line_supplier_subscription_id;
ALTER TABLE expense_recognition_line
    DROP COLUMN IF EXISTS supplier_subscription_id;

DROP INDEX IF EXISTS idx_expense_recognition_line_supplier_product_cost_plan_id;
ALTER TABLE expense_recognition_line
    DROP COLUMN IF EXISTS supplier_product_cost_plan_id;

DROP INDEX IF EXISTS idx_expense_recognition_supplier_subscription_id;
ALTER TABLE expense_recognition
    DROP COLUMN IF EXISTS supplier_subscription_id;
