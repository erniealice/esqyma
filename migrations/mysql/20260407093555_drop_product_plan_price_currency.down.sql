-- Migration: drop_product_plan_price_currency (down)
-- Dialect: mysql
-- Created: 2026-04-07T09:35:55Z

ALTER TABLE product_plan ADD COLUMN IF NOT EXISTS price BIGINT NOT NULL DEFAULT 0;
ALTER TABLE product_plan ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'PHP';
