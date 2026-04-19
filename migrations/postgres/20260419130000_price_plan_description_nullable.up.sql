-- Migration: price_plan_description_nullable (up)
-- Dialect: postgres
-- Created: 2026-04-19T13:00:00Z
--
-- PricePlan.description is now optional — when blank the UI can omit notes.
-- Drop the NOT NULL constraint so the column accepts NULL values.

ALTER TABLE price_plan ALTER COLUMN description DROP NOT NULL;
