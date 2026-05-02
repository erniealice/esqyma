-- Migration: price_plan_schedule_fk (up)
-- Dialect: postgres
-- Created: 2026-04-17T19:00:00Z
--
-- PricePlan.location_id → PricePlan.price_schedule_id.
-- Date range + location now live on PriceSchedule (the parent container).

-- 1. Add the new FK column (nullable so backfill can proceed)
ALTER TABLE price_plan ADD COLUMN price_schedule_id TEXT REFERENCES price_schedule(id);
CREATE INDEX idx_price_plan_price_schedule_id ON price_plan(price_schedule_id);

-- 2. For each (workspace_id, location_id) combo used by price_plan but missing
--    a matching schedule, create a default schedule so backfill always resolves.
INSERT INTO price_schedule (id, workspace_id, name, description, active, location_id, date_start, date_end, date_created, date_modified)
SELECT
    'auto-sched-' || substr(md5(pp.workspace_id || COALESCE(pp.location_id, '__global__')), 1, 24) AS id,
    pp.workspace_id,
    CASE
        WHEN pp.location_id IS NULL THEN 'Default Schedule (All Locations)'
        ELSE 'Default Schedule — ' || COALESCE(l.name, pp.location_id)
    END AS name,
    'Auto-created during price_schedule_id migration on 2026-04-17',
    true,
    pp.location_id,
    to_char(now(), 'YYYY-MM-DD'),
    NULL,
    now(),
    now()
FROM (
    SELECT DISTINCT workspace_id, location_id
    FROM price_plan
) pp
LEFT JOIN location l ON l.id = pp.location_id
WHERE NOT EXISTS (
    SELECT 1 FROM price_schedule ps
    WHERE ps.workspace_id = pp.workspace_id
      AND ps.active = true
      AND (
          (ps.location_id IS NULL AND pp.location_id IS NULL)
          OR ps.location_id = pp.location_id
      )
);

-- 3. Backfill price_plan.price_schedule_id by matching workspace + location.
--    Pick the most recently modified active schedule for that combo.
WITH chosen AS (
    SELECT DISTINCT ON (pp.id)
        pp.id AS plan_id,
        ps.id AS schedule_id
    FROM price_plan pp
    JOIN price_schedule ps
      ON ps.workspace_id = pp.workspace_id
     AND ps.active = true
     AND (
         (ps.location_id IS NULL AND pp.location_id IS NULL)
         OR ps.location_id = pp.location_id
     )
    ORDER BY pp.id, ps.date_modified DESC
)
UPDATE price_plan
SET price_schedule_id = chosen.schedule_id
FROM chosen
WHERE price_plan.id = chosen.plan_id;

-- 4. Drop the old location_id column and its FK/index
DROP INDEX IF EXISTS idx_price_plan_location_id;
ALTER TABLE price_plan DROP CONSTRAINT IF EXISTS price_plan_location_id_fkey;
ALTER TABLE price_plan DROP COLUMN IF EXISTS location_id;
