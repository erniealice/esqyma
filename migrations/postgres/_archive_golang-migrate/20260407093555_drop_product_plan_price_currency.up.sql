-- Migration: drop_product_plan_price_currency (up)
-- Dialect: postgres
-- Created: 2026-04-07T09:35:55Z

ALTER TABLE product_plan DROP COLUMN IF EXISTS price;
ALTER TABLE product_plan DROP COLUMN IF EXISTS currency;
