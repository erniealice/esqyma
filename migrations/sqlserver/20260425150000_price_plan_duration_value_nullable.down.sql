-- Migration: price_plan_duration_value_nullable (down)
-- Dialect: sqlserver
-- Created: 2026-04-25T15:00:00Z

UPDATE [price_plan] SET [duration_value] = 0 WHERE [duration_value] IS NULL;
UPDATE [price_plan] SET [duration_unit] = 'month' WHERE [duration_unit] IS NULL;
ALTER TABLE [price_plan] ALTER COLUMN [duration_value] INT NOT NULL;
ALTER TABLE [price_plan] ALTER COLUMN [duration_unit] NVARCHAR(255) NOT NULL;
