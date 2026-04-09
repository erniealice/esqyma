-- Migration: drop_product_plan_price_currency (up)
-- Dialect: sqlserver
-- Created: 2026-04-07T09:35:55Z

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product_plan') AND name = 'price')
    ALTER TABLE product_plan DROP COLUMN price;
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product_plan') AND name = 'currency')
    ALTER TABLE product_plan DROP COLUMN currency;
