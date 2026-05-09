-- Migration: add_depreciation_run
-- Date: 2026-05-09
-- Purpose: Introduce the DepreciationRun entity + extend depreciation_schedule and
--          asset_transaction for batch-run linkage + DB-level period-marker idempotency.
--
-- Safety contract:
--   * No existing DEPRECIATION rows are deleted. If pre-existing rows collide on the
--     new partial-unique index (idx_asset_transaction_depreciation_period), the index
--     creation will FAIL with a unique-violation error. The operator must then:
--       1. Run: SELECT * FROM _atlas_review_depreciation_period_collisions;
--       2. Triage the conflicting rows (duplicates from manual inserts or old migrations).
--       3. Resolve manually (correct the data, NOT delete audit rows) then re-apply.
--   * All statements use ADD COLUMN IF NOT EXISTS / CREATE TABLE IF NOT EXISTS /
--     CREATE INDEX IF NOT EXISTS so re-applying this migration is a no-op.
--   * FK constraints use NOT VALID to avoid full-table validation on large tables;
--     run VALIDATE CONSTRAINT in a maintenance window if needed.
--
-- Idempotency: applying this migration twice produces no changes.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. Safety table for triage of any pre-existing duplicate DEPRECIATION rows
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS _atlas_review_depreciation_period_collisions (
    id                  text        NOT NULL DEFAULT gen_random_uuid()::text,
    asset_id            text        NOT NULL,
    transaction_id      text        NOT NULL,
    transaction_date    bigint,
    conflict_reason     text        NOT NULL,
    created_at          timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (id)
);

-- ---------------------------------------------------------------------------
-- 2. Create depreciation_run table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS depreciation_run (
    id              text        NOT NULL,
    workspace_id    text        NOT NULL,
    scope_kind      text        NOT NULL DEFAULT 'DEPRECIATION_RUN_SCOPE_KIND_UNSPECIFIED',
    scope_id        text,                     -- asset_id | category_id | NULL for WORKSPACE
    as_of_date      date        NOT NULL,
    initiator_id    text        NOT NULL,      -- FK to "user"(id)
    initiated_at    timestamp with time zone DEFAULT now() NOT NULL,
    completed_at    timestamp with time zone,
    status          text        NOT NULL DEFAULT 'DEPRECIATION_RUN_STATUS_PENDING',
    created_count   integer     NOT NULL DEFAULT 0,
    skipped_count   integer     NOT NULL DEFAULT 0,
    errored_count   integer     NOT NULL DEFAULT 0,
    error_summary   text,
    notes           text,
    active          boolean     NOT NULL DEFAULT true,
    created_at      timestamp with time zone DEFAULT now(),
    updated_at      timestamp with time zone DEFAULT now(),
    PRIMARY KEY (id)
);

-- ---------------------------------------------------------------------------
-- 3. depreciation_run constraints and indexes
-- ---------------------------------------------------------------------------
ALTER TABLE ONLY depreciation_run
    ADD CONSTRAINT depreciation_run_workspace_id_fkey
    FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;

ALTER TABLE ONLY depreciation_run
    ADD CONSTRAINT depreciation_run_initiator_id_fkey
    FOREIGN KEY (initiator_id) REFERENCES "user"(id) NOT VALID;

CREATE INDEX IF NOT EXISTS idx_depreciation_run_workspace_id
    ON depreciation_run USING btree (workspace_id);

CREATE INDEX IF NOT EXISTS idx_depreciation_run_status
    ON depreciation_run USING btree (status);

CREATE INDEX IF NOT EXISTS idx_depreciation_run_initiated_at
    ON depreciation_run USING btree (initiated_at DESC);

-- ---------------------------------------------------------------------------
-- 4. Extend depreciation_schedule
--    New columns: depreciation_run_id, outcome, error_message
-- ---------------------------------------------------------------------------
ALTER TABLE depreciation_schedule
    ADD COLUMN IF NOT EXISTS depreciation_run_id text;

ALTER TABLE depreciation_schedule
    ADD COLUMN IF NOT EXISTS outcome text;

ALTER TABLE depreciation_schedule
    ADD COLUMN IF NOT EXISTS error_message text;

-- FK: depreciation_schedule.depreciation_run_id → depreciation_run
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'depreciation_schedule_depreciation_run_id_fkey'
          AND table_name = 'depreciation_schedule'
    ) THEN
        ALTER TABLE depreciation_schedule
            ADD CONSTRAINT depreciation_schedule_depreciation_run_id_fkey
            FOREIGN KEY (depreciation_run_id) REFERENCES depreciation_run(id) NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_depreciation_schedule_depreciation_run_id
    ON depreciation_schedule USING btree (depreciation_run_id)
    WHERE depreciation_run_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 5. Extend asset_transaction
--    New columns: depreciation_run_id, depreciation_period_start_date
-- ---------------------------------------------------------------------------
ALTER TABLE asset_transaction
    ADD COLUMN IF NOT EXISTS depreciation_run_id text;

-- Stored as text (ISO 8601 YYYY-MM-DD) to match the rest of the date-string
-- columns in this schema and to allow use in an IMMUTABLE GENERATED expression.
-- The date_out cast (date→text) is STABLE in Postgres, preventing GENERATED ALWAYS
-- AS STORED from working on a date-typed column. Plain text || text is IMMUTABLE.
ALTER TABLE asset_transaction
    ADD COLUMN IF NOT EXISTS depreciation_period_start_date text;

-- FK: asset_transaction.depreciation_run_id → depreciation_run
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'asset_transaction_depreciation_run_id_fkey'
          AND table_name = 'asset_transaction'
    ) THEN
        ALTER TABLE asset_transaction
            ADD CONSTRAINT asset_transaction_depreciation_run_id_fkey
            FOREIGN KEY (depreciation_run_id) REFERENCES depreciation_run(id) NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_asset_transaction_depreciation_run_id
    ON asset_transaction USING btree (depreciation_run_id)
    WHERE depreciation_run_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 6. GENERATED column: period_marker on asset_transaction
--    Computes asset_id || '|' || depreciation_period_start_date for DEPRECIATION
--    rows; NULL for all other transaction types.
-- ---------------------------------------------------------------------------
-- depreciation_period_start_date is stored as text (YYYY-MM-DD) so this
-- expression is pure text concatenation — all operators are IMMUTABLE.
ALTER TABLE asset_transaction
    ADD COLUMN IF NOT EXISTS period_marker text
    GENERATED ALWAYS AS (
        CASE
            WHEN transaction_type = 'ASSET_TRANSACTION_TYPE_DEPRECIATION'
                 AND depreciation_period_start_date IS NOT NULL
            THEN asset_id || '|' || depreciation_period_start_date
        END
    ) STORED;

-- ---------------------------------------------------------------------------
-- 7. Pre-existing collision check before creating unique index
--
--    Detect any duplicate (asset_id, period_marker) among existing DEPRECIATION
--    rows. If duplicates are found, populate the triage table and raise an error.
--    The unique index creation below will also fail if duplicates exist — this
--    block gives the operator a human-readable triage dump first.
-- ---------------------------------------------------------------------------
DO $$
DECLARE
    collision_count integer;
BEGIN
    -- Count duplicate (asset_id, period_marker) groups among existing DEPRECIATION rows
    SELECT COUNT(*) INTO collision_count
    FROM (
        SELECT asset_id, period_marker
        FROM asset_transaction
        WHERE transaction_type = 'ASSET_TRANSACTION_TYPE_DEPRECIATION'
          AND period_marker IS NOT NULL
        GROUP BY asset_id, period_marker
        HAVING COUNT(*) > 1
    ) dupes;

    IF collision_count > 0 THEN
        -- Populate triage table for operator inspection
        INSERT INTO _atlas_review_depreciation_period_collisions
            (asset_id, transaction_id, transaction_date, conflict_reason)
        SELECT
            at.asset_id,
            at.id,
            at.transaction_date,
            'Duplicate period_marker: ' || at.period_marker
        FROM asset_transaction at
        WHERE at.transaction_type = 'ASSET_TRANSACTION_TYPE_DEPRECIATION'
          AND at.period_marker IN (
              SELECT period_marker
              FROM asset_transaction
              WHERE transaction_type = 'ASSET_TRANSACTION_TYPE_DEPRECIATION'
                AND period_marker IS NOT NULL
              GROUP BY asset_id, period_marker
              HAVING COUNT(*) > 1
          );

        RAISE EXCEPTION
            'MIGRATION FAILED: % duplicate depreciation period(s) detected in asset_transaction. '
            'Conflicting rows have been written to _atlas_review_depreciation_period_collisions. '
            'Triage those rows (correct data, do NOT delete audit rows) then re-apply this migration.',
            collision_count;
    END IF;
END;
$$;

-- ---------------------------------------------------------------------------
-- 8. Partial-unique index for depreciation period idempotency
--    CONCURRENTLY requires txmode none — index created outside a transaction block.
--    Collision detection in step 7 ensures this will not fail on clean data.
-- ---------------------------------------------------------------------------
CREATE UNIQUE INDEX IF NOT EXISTS idx_asset_transaction_depreciation_period
    ON asset_transaction USING btree (asset_id, period_marker)
    WHERE transaction_type = 'ASSET_TRANSACTION_TYPE_DEPRECIATION'
      AND depreciation_period_start_date IS NOT NULL;
