-- Migration: ledger_financials_workspace_id_not_null
-- Date: 2026-05-30
-- Plan: docs/plan/20260530-authz-workspace-hardening (Q-AWS3-A migration leg, Plan 1 hotfix)
-- Follows: 20260530000001_backfill_workspace_id_on_ledger_financials.sql
--
-- ⚠️ DEFERRED — APPLIED IN A LATER WINDOW.
--   This is step 3 of the documented 2-step (here 3-step) NOT NULL pattern from
--   docs/wiki/articles/schema-migrations.md "Strict rules now that users exist".
--   It is authored now (so the sequence is complete and reviewable) but is
--   intended to be applied in a SEPARATE, LATER deployment window — only AFTER:
--     1. 20260530000000 (ADD COLUMN) has been applied, AND
--     2. 20260530000001 (backfill) has been applied, AND
--     3. it has been verified that no NULL workspace_id rows remain:
--          SELECT COUNT(*) FROM account        WHERE workspace_id IS NULL;  -- expect 0
--          SELECT COUNT(*) FROM expenditure    WHERE workspace_id IS NULL;  -- expect 0
--          SELECT COUNT(*) FROM journal_entry  WHERE workspace_id IS NULL;  -- expect 0
--
--   SET NOT NULL takes an ACCESS EXCLUSIVE lock and a full-table scan to verify
--   no NULLs; run it during a maintenance window. If any of the counts above is
--   non-zero, STOP — backfill is incomplete and this migration will fail.
--
-- Idempotency: SET NOT NULL on an already-NOT NULL column is a no-op in postgres,
-- and VALIDATE CONSTRAINT on an already-validated constraint is a no-op.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. account.workspace_id → NOT NULL + validate FK added NOT VALID in 20260530000000
-- ---------------------------------------------------------------------------
ALTER TABLE account
    ALTER COLUMN workspace_id SET NOT NULL;

ALTER TABLE account
    VALIDATE CONSTRAINT account_workspace_id_fkey;

-- ---------------------------------------------------------------------------
-- 2. expenditure.workspace_id → NOT NULL + validate FK
-- ---------------------------------------------------------------------------
ALTER TABLE expenditure
    ALTER COLUMN workspace_id SET NOT NULL;

ALTER TABLE expenditure
    VALIDATE CONSTRAINT expenditure_workspace_id_fkey;

-- ---------------------------------------------------------------------------
-- 3. journal_entry.workspace_id → NOT NULL + validate FK
-- ---------------------------------------------------------------------------
ALTER TABLE journal_entry
    ALTER COLUMN workspace_id SET NOT NULL;

ALTER TABLE journal_entry
    VALIDATE CONSTRAINT journal_entry_workspace_id_fkey;
