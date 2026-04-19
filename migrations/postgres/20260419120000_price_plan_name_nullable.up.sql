-- Migration: price_plan_name_nullable (up)
-- Dialect: postgres
-- Created: 2026-04-19T12:00:00Z
--
-- PricePlan.name is now optional — when blank the UI falls back to the parent
-- Plan's name. Drop the NOT NULL constraint so the column accepts NULL values.

ALTER TABLE price_plan ALTER COLUMN name DROP NOT NULL;
