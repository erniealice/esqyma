-- Migration: price_plan_duration_value_nullable (up)
-- Dialect: sqlserver
-- Created: 2026-04-25T15:00:00Z
-- Rationale: legacy dual-write proto fields (duration_value/duration_unit) are
-- now `optional` — BILLING_KIND_ONE_TIME plans no longer carry them. Column
-- nullability must follow the proto so protojson-derived INSERTs succeed.

ALTER TABLE [price_plan] ALTER COLUMN [duration_value] INT NULL;
ALTER TABLE [price_plan] ALTER COLUMN [duration_unit] NVARCHAR(255) NULL;
