-- Formalize the location / location_area tables after out-of-band drift.
--
-- Two classes of drift being reconciled here:
--
--   1. workspace_id was added to both tables at some prior point (NOT NULL
--      DEFAULT 'default-workspace') plus btree indexes, without a migration
--      file. Fresh environments bootstrapped from 0001_initial.sql would be
--      missing these. This migration codifies what production/dev already has
--      using IF NOT EXISTS so it's a no-op on the current DB and corrective
--      on fresh ones.
--
--   2. `location_area.location_id` is a bogus column that contradicts the
--      domain model. LocationArea is a GROUP OF Locations — the FK points
--      Location.location_area_id → LocationArea(id), not the other way.
--      The proto never declared this column; it drifted in via direct DDL.
--      Dropped here.
--
--   3. location.location_area_id had no FK constraint despite the proto
--      intent. Proto updated in the same commit to add
--      (options.v1.db).references = "location_area"; this migration adds the
--      matching ADD CONSTRAINT so orphans are rejected at the DB layer going
--      forward.

BEGIN;

-- ── workspace_id on location ────────────────────────────────────────────────
ALTER TABLE location
    ADD COLUMN IF NOT EXISTS workspace_id TEXT NOT NULL DEFAULT 'default-workspace';

CREATE INDEX IF NOT EXISTS idx_location_workspace_id
    ON location (workspace_id);

-- FK to workspace(id). Skip if already present.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'fk_location_workspace_id'
    ) THEN
        ALTER TABLE location
            ADD CONSTRAINT fk_location_workspace_id
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END$$;

-- ── workspace_id on location_area ───────────────────────────────────────────
ALTER TABLE location_area
    ADD COLUMN IF NOT EXISTS workspace_id TEXT NOT NULL DEFAULT 'default-workspace';

CREATE INDEX IF NOT EXISTS idx_location_area_workspace_id
    ON location_area (workspace_id);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'fk_location_area_workspace_id'
    ) THEN
        ALTER TABLE location_area
            ADD CONSTRAINT fk_location_area_workspace_id
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END$$;

-- ── Remove bogus location_area.location_id column ───────────────────────────
ALTER TABLE location_area
    DROP COLUMN IF EXISTS location_id;

-- ── Formalize location.location_area_id FK ──────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_location_location_area_id
    ON location (location_area_id);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'fk_location_location_area_id'
    ) THEN
        ALTER TABLE location
            ADD CONSTRAINT fk_location_location_area_id
            FOREIGN KEY (location_area_id) REFERENCES location_area(id);
    END IF;
END$$;

COMMIT;
