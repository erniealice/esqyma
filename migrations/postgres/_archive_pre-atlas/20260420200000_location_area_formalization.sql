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
