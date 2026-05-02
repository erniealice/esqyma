-- Add workspace_id to payment_term so each workspace can curate its own
-- Net-30 / COD / proximate terms without bleeding into tenants. Mirrors the
-- pattern from 20260420200000_location_area_formalization (workspace_id +
-- btree index + FK to workspace(id)).
--
-- Use NOT NULL DEFAULT 'default-workspace' so existing rows backfill to the
-- bootstrap tenant; IF NOT EXISTS / pg_constraint guards make the migration
-- idempotent against environments that may already have the column.

BEGIN;

ALTER TABLE payment_term
    ADD COLUMN IF NOT EXISTS workspace_id TEXT NOT NULL DEFAULT 'default-workspace';

CREATE INDEX IF NOT EXISTS idx_payment_term_workspace_id
    ON payment_term (workspace_id);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'fk_payment_term_workspace_id'
    ) THEN
        ALTER TABLE payment_term
            ADD CONSTRAINT fk_payment_term_workspace_id
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END$$;

COMMIT;
