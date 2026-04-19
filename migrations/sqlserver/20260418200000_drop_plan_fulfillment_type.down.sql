-- Migration: drop_plan_fulfillment_type (down)
-- Dialect: sqlserver
-- Created: 2026-04-18T20:00:00Z

ALTER TABLE [plan] ADD [fulfillment_type] NVARCHAR(MAX) NULL;
