-- Revert formalization of location / location_area tables.
-- Note: we do NOT re-add the bogus `location_area.location_id` column — its
-- existence was the bug, not the fix.

BEGIN;

-- Drop the location.location_area_id FK + index
ALTER TABLE location DROP CONSTRAINT IF EXISTS fk_location_location_area_id;
DROP INDEX IF EXISTS idx_location_location_area_id;

-- Drop workspace_id FK + index + column on location_area
ALTER TABLE location_area DROP CONSTRAINT IF EXISTS fk_location_area_workspace_id;
DROP INDEX IF EXISTS idx_location_area_workspace_id;
ALTER TABLE location_area DROP COLUMN IF EXISTS workspace_id;

-- Same on location
ALTER TABLE location DROP CONSTRAINT IF EXISTS fk_location_workspace_id;
DROP INDEX IF EXISTS idx_location_workspace_id;
ALTER TABLE location DROP COLUMN IF EXISTS workspace_id;

COMMIT;
