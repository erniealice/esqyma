-- Migration: price_plan_name_nullable (down)
-- Dialect: postgres
-- Created: 2026-04-19T12:00:00Z
--
-- Restore NOT NULL on price_plan.name. Existing NULLs are coerced to empty
-- string first so the constraint addition never fails.

UPDATE price_plan SET name = '' WHERE name IS NULL;
ALTER TABLE price_plan ALTER COLUMN name SET NOT NULL;
