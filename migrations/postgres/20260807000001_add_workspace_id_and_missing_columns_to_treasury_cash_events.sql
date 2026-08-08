-- Migration: add_workspace_id_and_missing_columns_to_treasury_cash_events
-- Date: 2026-08-07
-- Plan: docs/plan/20260807-espyna-postgres-security-performance-profile (COR-02)
--
-- Purpose:
--   1. add a nullable immutable workspace_id anchor to treasury_collection and
--      treasury_disbursement so generic CRUD/list operations can be scoped;
--   2. add the proto-declared nullable columns that both live PostgreSQL lanes
--      lack and that the specialized list/item queries project.
--
-- Existing rows are never assigned a literal/default workspace. The companion
-- backfill (20260807000003) derives ownership from every available structural
-- anchor and leaves unresolved rows NULL/fail-closed. Apply both ADD migrations
-- (20260807000000 and this file) with writers quiesced, restart applications
-- while traffic remains disabled, then apply both backfills and the concurrent
-- indexes in 20260807000004 before re-enabling routes. This prevents a stale
-- catalog cache from creating rows after the one-time backfills.

SET search_path TO public;

ALTER TABLE treasury_collection
    ADD COLUMN IF NOT EXISTS subscription_id TEXT,
    ADD COLUMN IF NOT EXISTS journal_entry_id TEXT,
    ADD COLUMN IF NOT EXISTS fund_transaction_id TEXT,
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
DECLARE
    v_attnum smallint;
    v_workspace_attnum smallint;
BEGIN
    SELECT attnum INTO v_attnum
      FROM pg_attribute
     WHERE attrelid = 'treasury_collection'::regclass
       AND attname = 'workspace_id'
       AND NOT attisdropped;

    SELECT attnum INTO v_workspace_attnum
      FROM pg_attribute
     WHERE attrelid = 'workspace'::regclass
       AND attname = 'id'
       AND NOT attisdropped;

    IF v_attnum IS NULL OR v_workspace_attnum IS NULL THEN
        RAISE EXCEPTION 'treasury_collection workspace FK columns not found';
    END IF;

    IF NOT EXISTS (
        SELECT 1
          FROM pg_constraint
         WHERE conrelid = 'treasury_collection'::regclass
           AND contype = 'f'
           AND conkey = ARRAY[v_attnum]
           AND confrelid = 'workspace'::regclass
           AND confkey = ARRAY[v_workspace_attnum]
    ) THEN
        ALTER TABLE treasury_collection
            ADD CONSTRAINT treasury_collection_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

ALTER TABLE treasury_disbursement
    ADD COLUMN IF NOT EXISTS subscription_id TEXT,
    ADD COLUMN IF NOT EXISTS disbursement_method_id TEXT,
    ADD COLUMN IF NOT EXISTS journal_entry_id TEXT,
    ADD COLUMN IF NOT EXISTS fund_transaction_id TEXT,
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
DECLARE
    v_attnum smallint;
    v_workspace_attnum smallint;
BEGIN
    SELECT attnum INTO v_attnum
      FROM pg_attribute
     WHERE attrelid = 'treasury_disbursement'::regclass
       AND attname = 'workspace_id'
       AND NOT attisdropped;

    SELECT attnum INTO v_workspace_attnum
      FROM pg_attribute
     WHERE attrelid = 'workspace'::regclass
       AND attname = 'id'
       AND NOT attisdropped;

    IF v_attnum IS NULL OR v_workspace_attnum IS NULL THEN
        RAISE EXCEPTION 'treasury_disbursement workspace FK columns not found';
    END IF;

    IF NOT EXISTS (
        SELECT 1
          FROM pg_constraint
         WHERE conrelid = 'treasury_disbursement'::regclass
           AND contype = 'f'
           AND conkey = ARRAY[v_attnum]
           AND confrelid = 'workspace'::regclass
           AND confkey = ARRAY[v_workspace_attnum]
    ) THEN
        ALTER TABLE treasury_disbursement
            ADD CONSTRAINT treasury_disbursement_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

-- Backfill, concurrent indexes, FK validation, and NOT NULL tightening are
-- intentionally split into later rollout steps.
