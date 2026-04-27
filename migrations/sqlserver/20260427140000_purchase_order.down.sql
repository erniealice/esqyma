-- Migration: purchase_order (down)
-- Dialect: sqlserver
-- Created: 2026-04-27T14:00:00Z

IF OBJECT_ID(N'purchase_order_line_item', N'U') IS NOT NULL DROP TABLE [purchase_order_line_item];
IF OBJECT_ID(N'purchase_order', N'U') IS NOT NULL DROP TABLE [purchase_order];
