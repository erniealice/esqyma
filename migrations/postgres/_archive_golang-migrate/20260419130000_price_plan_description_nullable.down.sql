-- Migration: price_plan_description_nullable (down)
-- Dialect: postgres
-- Created: 2026-04-19T13:00:00Z
--
-- Restore NOT NULL on price_plan.description. Existing NULLs are coerced to
-- empty string first so the constraint addition never fails.

UPDATE price_plan SET description = '' WHERE description IS NULL;
ALTER TABLE price_plan ALTER COLUMN description SET NOT NULL;
