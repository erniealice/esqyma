-- Migration: product_expected_cost (up)
-- Dialect: sqlserver
-- Created: 2026-04-27T15:07:00Z
-- Rationale: Adds expected_cost (centavos), expected_cost_currency, and
--            default_template_id to the product table. See redesign-proto.md §5.1.

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'expected_cost')
  ALTER TABLE [product] ADD [expected_cost] BIGINT NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'expected_cost_currency')
  ALTER TABLE [product] ADD [expected_cost_currency] NVARCHAR(MAX) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'default_template_id')
  ALTER TABLE [product] ADD [default_template_id] NVARCHAR(255) NULL;

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('product') AND name = 'idx_product_default_template_id')
  CREATE INDEX idx_product_default_template_id ON [product]([default_template_id]);
