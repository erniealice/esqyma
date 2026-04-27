-- Migration: product_expected_cost (down)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:07:00Z

IF EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('product') AND name = 'idx_product_default_template_id')
  DROP INDEX idx_product_default_template_id ON [product];

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'default_template_id')
  ALTER TABLE [product] DROP COLUMN [default_template_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'expected_cost_currency')
  ALTER TABLE [product] DROP COLUMN [expected_cost_currency];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'expected_cost')
  ALTER TABLE [product] DROP COLUMN [expected_cost];
