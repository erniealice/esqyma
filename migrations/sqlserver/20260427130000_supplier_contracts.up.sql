-- Migration: supplier_contracts (up)
-- Dialect: sqlserver
-- Created: 2026-04-27T13:00:00Z

IF OBJECT_ID(N'supplier_contract', N'U') IS NULL
CREATE TABLE [supplier_contract] (
  [id]                      NVARCHAR(255) NOT NULL PRIMARY KEY,
  [workspace_id]            NVARCHAR(255) NOT NULL,
  [internal_id]             NVARCHAR(255) NOT NULL UNIQUE,
  [name]                    NVARCHAR(MAX) NOT NULL,
  [description]             NVARCHAR(MAX) NULL,
  [reference_number]        NVARCHAR(MAX) NULL,
  [supplier_id]             NVARCHAR(255) NOT NULL,
  [kind]                    NVARCHAR(MAX) NOT NULL DEFAULT '',
  [status]                  NVARCHAR(MAX) NOT NULL DEFAULT '',
  [billing_kind]            NVARCHAR(MAX) NULL,
  [billing_cycle_value]     INT NULL,
  [billing_cycle_unit]      NVARCHAR(MAX) NULL,
  [default_term_value]      INT NULL,
  [default_term_unit]       NVARCHAR(MAX) NULL,
  [date_time_start]         NVARCHAR(MAX) NOT NULL,
  [date_time_end]           NVARCHAR(MAX) NULL,
  [auto_renew]              BIT NOT NULL DEFAULT 0,
  [renewal_notice_days]     INT NULL,
  [currency]                NVARCHAR(MAX) NOT NULL,
  [committed_amount]        BIGINT NULL,
  [released_amount]         BIGINT NOT NULL DEFAULT 0,
  [billed_amount]           BIGINT NOT NULL DEFAULT 0,
  [remaining_amount]        BIGINT NOT NULL DEFAULT 0,
  [cycle_amount]            BIGINT NULL,
  [payment_term_id]         NVARCHAR(255) NULL,
  [commitment_quantity]     FLOAT NULL,
  [released_quantity]       FLOAT NOT NULL DEFAULT 0,
  [requested_by]            NVARCHAR(MAX) NULL,
  [requested_date]          BIGINT NULL,
  [requested_date_string]   NVARCHAR(MAX) NULL,
  [approved_by]             NVARCHAR(MAX) NULL,
  [approved_date]           BIGINT NULL,
  [approved_date_string]    NVARCHAR(MAX) NULL,
  [rejection_reason]        NVARCHAR(MAX) NULL,
  [location_id]             NVARCHAR(255) NULL,
  [expense_account_id]      NVARCHAR(255) NULL,
  [accrual_account_id]      NVARCHAR(255) NULL,
  [expenditure_category_id] NVARCHAR(255) NULL,
  [notes]                   NVARCHAR(MAX) NULL,
  [active]                  BIT NOT NULL DEFAULT 1,
  [date_created]            DATETIME2 DEFAULT GETDATE(),
  [date_modified]           DATETIME2 DEFAULT GETDATE()
);

IF OBJECT_ID(N'supplier_contract_line', N'U') IS NULL
CREATE TABLE [supplier_contract_line] (
  [id]                      NVARCHAR(255) NOT NULL PRIMARY KEY,
  [supplier_contract_id]    NVARCHAR(255) NOT NULL,
  [product_id]              NVARCHAR(255) NULL,
  [description]             NVARCHAR(MAX) NOT NULL DEFAULT '',
  [line_type]               NVARCHAR(MAX) NOT NULL DEFAULT '',
  [quantity]                FLOAT NOT NULL DEFAULT 0,
  [unit_price]              BIGINT NOT NULL DEFAULT 0,
  [total_amount]            BIGINT NOT NULL DEFAULT 0,
  [treatment]               NVARCHAR(MAX) NOT NULL DEFAULT '',
  [start_date]              NVARCHAR(MAX) NULL,
  [end_date]                NVARCHAR(MAX) NULL,
  [expenditure_category_id] NVARCHAR(255) NULL,
  [expense_account_id]      NVARCHAR(255) NULL,
  [location_id]             NVARCHAR(255) NULL,
  [line_number]             INT NOT NULL DEFAULT 0,
  [active]                  BIT NOT NULL DEFAULT 1,
  [date_created]            DATETIME2 DEFAULT GETDATE(),
  [date_modified]           DATETIME2 DEFAULT GETDATE()
);

IF OBJECT_ID(N'procurement_request', N'U') IS NULL
CREATE TABLE [procurement_request] (
  [id]                      NVARCHAR(255) NOT NULL PRIMARY KEY,
  [workspace_id]            NVARCHAR(255) NOT NULL,
  [request_number]          NVARCHAR(255) NOT NULL UNIQUE,
  [status]                  NVARCHAR(MAX) NOT NULL DEFAULT '',
  [requester_user_id]       NVARCHAR(MAX) NOT NULL,
  [supplier_id]             NVARCHAR(255) NULL,
  [location_id]             NVARCHAR(255) NULL,
  [currency]                NVARCHAR(MAX) NOT NULL,
  [estimated_total_amount]  BIGINT NOT NULL DEFAULT 0,
  [needed_by_date]          NVARCHAR(MAX) NULL,
  [justification]           NVARCHAR(MAX) NULL,
  [notes]                   NVARCHAR(MAX) NULL,
  [approved_by]             NVARCHAR(MAX) NULL,
  [approved_at]             BIGINT NULL,
  [approved_at_string]      NVARCHAR(MAX) NULL,
  [rejection_reason]        NVARCHAR(MAX) NULL,
  [purchase_order_id]       NVARCHAR(255) NULL,
  [expenditure_category_id] NVARCHAR(255) NULL,
  [expense_account_id]      NVARCHAR(255) NULL,
  [active]                  BIT NOT NULL DEFAULT 1,
  [date_created]            DATETIME2 DEFAULT GETDATE(),
  [date_modified]           DATETIME2 DEFAULT GETDATE()
);

IF OBJECT_ID(N'procurement_request_line', N'U') IS NULL
CREATE TABLE [procurement_request_line] (
  [id]                       NVARCHAR(255) NOT NULL PRIMARY KEY,
  [procurement_request_id]   NVARCHAR(255) NOT NULL,
  [product_id]               NVARCHAR(255) NULL,
  [description]              NVARCHAR(MAX) NOT NULL DEFAULT '',
  [line_type]                NVARCHAR(MAX) NOT NULL DEFAULT '',
  [quantity]                 FLOAT NOT NULL DEFAULT 0,
  [estimated_unit_price]     BIGINT NOT NULL DEFAULT 0,
  [estimated_total_price]    BIGINT NOT NULL DEFAULT 0,
  [supplier_contract_line_id] NVARCHAR(255) NULL,
  [expenditure_category_id]  NVARCHAR(255) NULL,
  [expense_account_id]       NVARCHAR(255) NULL,
  [location_id]              NVARCHAR(255) NULL,
  [line_number]              INT NOT NULL DEFAULT 0,
  [active]                   BIT NOT NULL DEFAULT 1,
  [date_created]             DATETIME2 DEFAULT GETDATE(),
  [date_modified]            DATETIME2 DEFAULT GETDATE()
);

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('purchase_order') AND name = 'supplier_contract_id')
  ALTER TABLE [purchase_order] ADD [supplier_contract_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('purchase_order') AND name = 'procurement_request_id')
  ALTER TABLE [purchase_order] ADD [procurement_request_id] NVARCHAR(255) NULL;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('purchase_order_line_item') AND name = 'supplier_contract_line_id')
  ALTER TABLE [purchase_order_line_item] ADD [supplier_contract_line_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('purchase_order_line_item') AND name = 'procurement_request_line_id')
  ALTER TABLE [purchase_order_line_item] ADD [procurement_request_line_id] NVARCHAR(255) NULL;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('expenditure') AND name = 'supplier_contract_id')
  ALTER TABLE [expenditure] ADD [supplier_contract_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('expenditure') AND name = 'petty_cash_fund_id')
  ALTER TABLE [expenditure] ADD [petty_cash_fund_id] NVARCHAR(255) NULL;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('expenditure_line_item') AND name = 'supplier_contract_line_id')
  ALTER TABLE [expenditure_line_item] ADD [supplier_contract_line_id] NVARCHAR(255) NULL;

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('prepayment') AND name = 'supplier_contract_id')
  ALTER TABLE [prepayment] ADD [supplier_contract_id] NVARCHAR(255) NULL;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('prepayment') AND name = 'expenditure_id')
  ALTER TABLE [prepayment] ADD [expenditure_id] NVARCHAR(255) NULL;
