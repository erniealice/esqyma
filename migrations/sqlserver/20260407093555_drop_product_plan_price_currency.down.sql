-- Migration: drop_product_plan_price_currency (down)
-- Dialect: sqlserver
-- Created: 2026-04-07T09:35:55Z

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product_plan') AND name = 'price')
    ALTER TABLE product_plan ADD price BIGINT NOT NULL DEFAULT 0;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product_plan') AND name = 'currency')
    ALTER TABLE product_plan ADD currency NVARCHAR(MAX) NOT NULL DEFAULT 'PHP';
