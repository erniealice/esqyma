-- Migration: supplier_contracts (down)
-- Dialect: sqlserver
-- Created: 2026-04-27T13:00:00Z

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('prepayment') AND name = 'expenditure_id')
  ALTER TABLE [prepayment] DROP COLUMN [expenditure_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('prepayment') AND name = 'supplier_contract_id')
  ALTER TABLE [prepayment] DROP COLUMN [supplier_contract_id];

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('expenditure_line_item') AND name = 'supplier_contract_line_id')
  ALTER TABLE [expenditure_line_item] DROP COLUMN [supplier_contract_line_id];

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('expenditure') AND name = 'petty_cash_fund_id')
  ALTER TABLE [expenditure] DROP COLUMN [petty_cash_fund_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('expenditure') AND name = 'supplier_contract_id')
  ALTER TABLE [expenditure] DROP COLUMN [supplier_contract_id];

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('purchase_order_line_item') AND name = 'procurement_request_line_id')
  ALTER TABLE [purchase_order_line_item] DROP COLUMN [procurement_request_line_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('purchase_order_line_item') AND name = 'supplier_contract_line_id')
  ALTER TABLE [purchase_order_line_item] DROP COLUMN [supplier_contract_line_id];

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('purchase_order') AND name = 'procurement_request_id')
  ALTER TABLE [purchase_order] DROP COLUMN [procurement_request_id];
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('purchase_order') AND name = 'supplier_contract_id')
  ALTER TABLE [purchase_order] DROP COLUMN [supplier_contract_id];

IF OBJECT_ID(N'procurement_request_line', N'U') IS NOT NULL DROP TABLE [procurement_request_line];
IF OBJECT_ID(N'procurement_request', N'U') IS NOT NULL DROP TABLE [procurement_request];
IF OBJECT_ID(N'supplier_contract_line', N'U') IS NOT NULL DROP TABLE [supplier_contract_line];
IF OBJECT_ID(N'supplier_contract', N'U') IS NOT NULL DROP TABLE [supplier_contract];
