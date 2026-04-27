-- Migration: purchase_order (up)
-- Dialect: sqlserver
-- Created: 2026-04-27T14:00:00Z

IF OBJECT_ID(N'purchase_order', N'U') IS NULL
CREATE TABLE [purchase_order] (
  [id]                            NVARCHAR(255) NOT NULL PRIMARY KEY,
  [po_number]                     NVARCHAR(255) NOT NULL UNIQUE,
  [po_type]                       NVARCHAR(MAX) NOT NULL DEFAULT '',
  [status]                        NVARCHAR(MAX) NOT NULL DEFAULT '',
  [supplier_id]                   NVARCHAR(255) NOT NULL,
  [location_id]                   NVARCHAR(255) NULL,
  [order_date]                    BIGINT NULL,
  [order_date_string]             NVARCHAR(MAX) NULL,
  [expected_delivery_date]        BIGINT NULL,
  [expected_delivery_date_string] NVARCHAR(MAX) NULL,
  [currency]                      NVARCHAR(MAX) NOT NULL DEFAULT '',
  [subtotal]                      BIGINT NOT NULL DEFAULT 0,
  [tax_amount]                    BIGINT NOT NULL DEFAULT 0,
  [total_amount]                  BIGINT NOT NULL DEFAULT 0,
  [payment_terms]                 NVARCHAR(MAX) NULL,
  [shipping_terms]                NVARCHAR(MAX) NULL,
  [approved_by]                   NVARCHAR(MAX) NULL,
  [approved_date]                 BIGINT NULL,
  [approved_date_string]          NVARCHAR(MAX) NULL,
  [parent_po_id]                  NVARCHAR(255) NULL,
  [blanket_start_date]            NVARCHAR(MAX) NULL,
  [blanket_end_date]              NVARCHAR(MAX) NULL,
  [blanket_total_quantity]        FLOAT NOT NULL DEFAULT 0,
  [blanket_released_quantity]     FLOAT NOT NULL DEFAULT 0,
  [notes]                         NVARCHAR(MAX) NULL,
  [reference_number]              NVARCHAR(MAX) NULL,
  [payment_term_id]               NVARCHAR(255) NULL,
  [supplier_contract_id]          NVARCHAR(255) NULL,
  [procurement_request_id]        NVARCHAR(255) NULL,
  [active]                        BIT NOT NULL DEFAULT 1,
  [date_created]                  DATETIME2 DEFAULT GETDATE(),
  [date_modified]                 DATETIME2 DEFAULT GETDATE()
);

IF OBJECT_ID(N'purchase_order_line_item', N'U') IS NULL
CREATE TABLE [purchase_order_line_item] (
  [id]                            NVARCHAR(255) NOT NULL PRIMARY KEY,
  [purchase_order_id]             NVARCHAR(255) NOT NULL,
  [product_id]                    NVARCHAR(255) NULL,
  [description]                   NVARCHAR(MAX) NOT NULL DEFAULT '',
  [line_type]                     NVARCHAR(MAX) NOT NULL DEFAULT '',
  [quantity_ordered]              FLOAT NOT NULL DEFAULT 0,
  [quantity_received]             FLOAT NOT NULL DEFAULT 0,
  [quantity_billed]               FLOAT NOT NULL DEFAULT 0,
  [unit_price]                    BIGINT NOT NULL DEFAULT 0,
  [total_price]                   BIGINT NOT NULL DEFAULT 0,
  [location_id]                   NVARCHAR(255) NULL,
  [inventory_item_id]             NVARCHAR(255) NULL,
  [required_by_date]              BIGINT NULL,
  [required_by_date_string]       NVARCHAR(MAX) NULL,
  [notes]                         NVARCHAR(MAX) NULL,
  [line_number]                   INT NOT NULL DEFAULT 0,
  [supplier_contract_line_id]     NVARCHAR(255) NULL,
  [procurement_request_line_id]   NVARCHAR(255) NULL,
  [active]                        BIT NOT NULL DEFAULT 1,
  [date_created]                  DATETIME2 DEFAULT GETDATE(),
  [date_modified]                 DATETIME2 DEFAULT GETDATE()
);
