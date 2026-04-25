-- Migration: product_option_description (down)
-- Dialect: sqlserver
-- Created: 2026-04-25T13:00:00Z

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product_option') AND name = 'description')
    ALTER TABLE product_option DROP COLUMN description;
