-- Migration: product_option_description (up)
-- Dialect: sqlserver
-- Created: 2026-04-25T13:00:00Z

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product_option') AND name = 'description')
    ALTER TABLE product_option ADD description NVARCHAR(MAX) NULL;
