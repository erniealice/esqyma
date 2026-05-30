-- Migration: add_workspace_id_to_ledger_financials
-- Date: 2026-05-30
-- Plan: docs/plan/20260530-authz-workspace-hardening (Q-AWS3-A migration leg, Plan 1 hotfix)
-- Purpose: Add workspace_id (NULLABLE) + FK + index to the three ledger/financial
--          tables (account, expenditure, journal_entry) whose Postgres adapters
--          already filter a workspace_id column that does NOT exist on the table:
--            * espyna/contrib/postgres/.../ledger/account.go:131/341/527
--            * espyna/contrib/postgres/.../expenditure/expenditure.go:319
--            * espyna/contrib/postgres/.../ledger/journal_entry.go:281
--          Those filters currently raise SQLSTATE 42703 (undefined_column) at
--          runtime, surfacing as live 500s on list/get/create. Adding the column
--          makes the WorkspaceAwareOperations-style ($N = workspace_id) predicate
--          resolvable. This is the additive (ADD) leg; backfill + NOT NULL follow
--          in separate migrations.
--
-- Safety contract (mirrors 20260510030000_add_workspace_id_to_asset_graph.sql):
--   * ADD COLUMN IF NOT EXISTS — re-applying this migration is a no-op.
--   * FK constraints created via DO $$ IF NOT EXISTS $$ guards (idempotent).
--   * FK uses NOT VALID to avoid a full-table scan on populated tables; run
--     VALIDATE CONSTRAINT in a maintenance window after backfilling if needed
--     (see 20260530000002_ledger_financials_workspace_id_not_null.sql).
--   * Indexes use IF NOT EXISTS guards and are partial (WHERE workspace_id IS NOT NULL)
--     so they impose no IO on existing rows until backfill populates the column.
--   * Column is NULLABLE in this migration. The 2-step pattern documented in
--     docs/wiki/articles/schema-migrations.md "Strict rules now that users exist"
--     tightens to NOT NULL only after backfill is reconciled.
--
-- Backfill source decision (2026-05-30):
--   Unlike the asset graph (asset.vendor_id → client.workspace_id), these three
--   tables carry NO workspace-bearing parent FK that we can derive workspace_id
--   from. account, expenditure, and journal_entry have no column referencing
--   workspace/client/user with a usable workspace_id. The backfill is therefore a
--   flat literal 'default-workspace' (see the companion backfill migration), which
--   is correct ONLY because current deploys are single-workspace. The backfill
--   migration documents the guard query that must hold before it is applied.
--
-- Idempotency: applying this migration twice produces no changes.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. account.workspace_id
-- ---------------------------------------------------------------------------
ALTER TABLE account
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'account_workspace_id_fkey'
          AND table_name = 'account'
    ) THEN
        ALTER TABLE account
            ADD CONSTRAINT account_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) ON DELETE RESTRICT NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_account_workspace_id
    ON account USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 2. expenditure.workspace_id
-- ---------------------------------------------------------------------------
ALTER TABLE expenditure
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'expenditure_workspace_id_fkey'
          AND table_name = 'expenditure'
    ) THEN
        ALTER TABLE expenditure
            ADD CONSTRAINT expenditure_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) ON DELETE RESTRICT NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_expenditure_workspace_id
    ON expenditure USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 3. journal_entry.workspace_id
-- ---------------------------------------------------------------------------
ALTER TABLE journal_entry
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'journal_entry_workspace_id_fkey'
          AND table_name = 'journal_entry'
    ) THEN
        ALTER TABLE journal_entry
            ADD CONSTRAINT journal_entry_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) ON DELETE RESTRICT NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_journal_entry_workspace_id
    ON journal_entry USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 4. Backfill (intentionally NOT performed here — see the companion migration
--    20260530000001_backfill_workspace_id_on_ledger_financials.sql).
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- 5. NOT NULL tightening: NOT performed in this migration. See
--    20260530000002_ledger_financials_workspace_id_not_null.sql (deferred,
--    applied in a later window after backfill is verified). This is the second
--    step in the documented 2-step pattern.
-- ---------------------------------------------------------------------------
