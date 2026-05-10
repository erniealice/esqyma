-- Migration: add_workspace_id_to_asset_graph
-- Date: 2026-05-10
-- Purpose: Add workspace_id (NULLABLE) + FK + index to the four asset-graph tables
--          (asset, asset_category, asset_transaction, depreciation_schedule) so that
--          every list/get/create query in the asset stack can be tenant-scoped via
--          the WorkspaceAwareOperations decorator (which auto-injects workspace_id
--          filters once the column exists). Codex finding C2 from
--          docs/plan/20260507-asset-lapsing-revaluation/codex-review.md.
--
-- Safety contract:
--   * ADD COLUMN IF NOT EXISTS — re-applying this migration is a no-op.
--   * FK constraints created via DO $$ IF NOT EXISTS $$ guards (idempotent).
--   * FK uses NOT VALID to avoid full-table scan on populated tables; run
--     VALIDATE CONSTRAINT in a maintenance window after backfilling if needed.
--   * Indexes use IF NOT EXISTS guards.
--   * Column is NULLABLE in this migration. A future 2-step migration will
--     SET NOT NULL after backfill is reconciled — per
--     docs/wiki/articles/schema-migrations.md "Strict rules now that users exist".
--
-- Backfill source decision (2026-05-10):
--   The asset graph carries no existing per-tenant link (asset has no
--   created_by_user_id, no client_id, no other column referencing user/workspace).
--   On a fresh dev DB the asset/asset_category tables are empty, so backfill is
--   trivially a no-op. On any non-empty DB, leaving workspace_id = NULL is the
--   only safe option until a follow-up plan reconciles the existing rows
--   (e.g., manual operator assignment, or a future plan adds the FK that lets
--   us derive workspace_id from a related entity).
--
--   asset_transaction.workspace_id and depreciation_schedule.workspace_id COULD
--   be backfilled from joined asset.workspace_id once asset is backfilled — but
--   since asset.workspace_id is NULL on legacy rows, the join would still leave
--   them NULL. Defer the cascade backfill to the same future plan.
--
--   This is intentional: NULL workspace_id means the WorkspaceAwareOperations
--   filter ($1 = workspace_id) will exclude legacy rows from list queries,
--   which is the correct multi-tenancy behavior — better than potentially
--   leaking cross-tenant data via an incorrect backfill.
--
-- Idempotency: applying this migration twice produces no changes.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. asset.workspace_id
-- ---------------------------------------------------------------------------
ALTER TABLE asset
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'asset_workspace_id_fkey'
          AND table_name = 'asset'
    ) THEN
        ALTER TABLE asset
            ADD CONSTRAINT asset_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) ON DELETE RESTRICT NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_asset_workspace_id
    ON asset USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 2. asset_category.workspace_id
-- ---------------------------------------------------------------------------
ALTER TABLE asset_category
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'asset_category_workspace_id_fkey'
          AND table_name = 'asset_category'
    ) THEN
        ALTER TABLE asset_category
            ADD CONSTRAINT asset_category_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) ON DELETE RESTRICT NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_asset_category_workspace_id
    ON asset_category USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 3. asset_transaction.workspace_id
-- ---------------------------------------------------------------------------
ALTER TABLE asset_transaction
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'asset_transaction_workspace_id_fkey'
          AND table_name = 'asset_transaction'
    ) THEN
        ALTER TABLE asset_transaction
            ADD CONSTRAINT asset_transaction_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) ON DELETE RESTRICT NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_asset_transaction_workspace_id
    ON asset_transaction USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 4. depreciation_schedule.workspace_id
-- ---------------------------------------------------------------------------
ALTER TABLE depreciation_schedule
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'depreciation_schedule_workspace_id_fkey'
          AND table_name = 'depreciation_schedule'
    ) THEN
        ALTER TABLE depreciation_schedule
            ADD CONSTRAINT depreciation_schedule_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) ON DELETE RESTRICT NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_depreciation_schedule_workspace_id
    ON depreciation_schedule USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 5. Backfill (intentionally NO-OP — see header comment for rationale).
--    A future plan will reconcile NULL workspace_id rows on populated DBs.
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- 6. NOT NULL tightening: NOT performed in this migration. See header comment;
--    that is the second step in the documented 2-step pattern.
-- ---------------------------------------------------------------------------
