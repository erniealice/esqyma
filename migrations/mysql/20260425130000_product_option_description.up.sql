-- Migration: product_option_description (up)
-- Dialect: mysql
-- Created: 2026-04-25T13:00:00Z

ALTER TABLE product_option ADD COLUMN IF NOT EXISTS description TEXT NULL;
