-- Migration: price_plan_schedule_fk (down)
-- Dialect: postgres
-- Created: 2026-04-17T19:00:00Z

-- 1. Re-add location_id + FK + index
ALTER TABLE price_plan ADD COLUMN location_id TEXT REFERENCES location(id);
CREATE INDEX idx_price_plan_location_id ON price_plan(location_id);

-- 2. Restore location_id from parent schedule (best-effort)
UPDATE price_plan pp
SET location_id = ps.location_id
FROM price_schedule ps
WHERE pp.price_schedule_id = ps.id;

-- 3. Drop the new FK + column
DROP INDEX IF EXISTS idx_price_plan_price_schedule_id;
ALTER TABLE price_plan DROP CONSTRAINT IF EXISTS price_plan_price_schedule_id_fkey;
ALTER TABLE price_plan DROP COLUMN IF EXISTS price_schedule_id;
