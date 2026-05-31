-- Migration: backfill_workspace_id_on_ledger_financials
-- Date: 2026-05-30
-- Plan: docs/plan/20260530-authz-workspace-hardening (Q-AWS3-A migration leg, Plan 1 hotfix)
-- Follows: 20260530000000_add_workspace_id_to_ledger_financials.sql
--
-- Purpose: Backfill workspace_id on account, expenditure, and journal_entry with
-- the flat literal 'default-workspace'. Unlike the asset-graph backfill
-- (20260510040000_backfill_workspace_id_on_asset_graph.sql), these three tables
-- carry NO workspace-bearing parent FK from which workspace_id can be derived by
-- JOIN, so the backfill is a flat constant rather than a JOIN.
--
-- ⚠️ SINGLE-WORKSPACE GUARD — READ BEFORE APPLYING
--   The flat 'default-workspace' literal is correct ONLY because current deploys
--   are effectively single-workspace. Before applying this migration, confirm the
--   guard holds against the target DB:
--
--       SELECT COUNT(DISTINCT workspace_id) FROM workspace_user WHERE active;
--       -- expected: 1
--
--   If the count is > 1, DO NOT apply this flat backfill. The correct posture for
--   a multi-workspace DB is to LEAVE workspace_id NULL and derive it per row from
--   a tenant link in a follow-up plan (the fail-closed NULL excludes legacy rows
--   from "WHERE workspace_id = $X" predicates, which is audit-safe — see the
--   header of 20260510040000_backfill_workspace_id_on_asset_graph.sql). A flat
--   'default-workspace' on a multi-tenant DB would wrongly collapse every tenant's
--   ledger/financial rows into one workspace.
--
-- Safety contract:
--   * Every UPDATE uses WHERE workspace_id IS NULL — re-applying is a no-op.
--   * Wrapped in DO $$ BEGIN ... END $$ for cleaner audit logs.
--   * Each block is independent; a failure in one does not affect the others.
--   * 'default-workspace' is the canonical default workspace id used elsewhere in
--     the single-workspace deploy model.
--   * NOT NULL tightening is NOT performed here; that is the third step per
--     docs/wiki/articles/schema-migrations.md "Strict rules now that users exist"
--     (see 20260530000002_ledger_financials_workspace_id_not_null.sql).
--
-- Idempotency: applying this migration twice produces no changes.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 0. SELF-GUARD (2026-05-31): the header's single-workspace guard, ENFORCED.
--    If ANY of the three tables has a NULL workspace_id row AND the deploy is
--    multi-workspace, RAISE and abort — do NOT flat-collapse 26 accounts / 8
--    expenditures / 8 journal entries across tenants. Passes (no-op) only when
--    single-workspace or 0 NULL rows. A multi-tenant DB must derive workspace_id
--    per row from the tenant link before this migration can apply.
-- ---------------------------------------------------------------------------
DO $$
DECLARE
    null_rows bigint;
    ws_count  int;
BEGIN
    SELECT (SELECT COUNT(*) FROM account       WHERE workspace_id IS NULL)
         + (SELECT COUNT(*) FROM expenditure   WHERE workspace_id IS NULL)
         + (SELECT COUNT(*) FROM journal_entry WHERE workspace_id IS NULL)
      INTO null_rows;
    IF null_rows > 0 THEN
        SELECT COUNT(DISTINCT workspace_id) INTO ws_count FROM workspace_user WHERE active;
        IF ws_count > 1 THEN
            RAISE EXCEPTION
                'workspace_id self-guard: % NULL ledger-financial row(s) in a MULTI-workspace deploy (% active workspaces). Refusing flat ''default-workspace'' backfill — derive workspace_id per row from the tenant link first.',
                null_rows, ws_count;
        END IF;
    END IF;
END;
$$;

-- ---------------------------------------------------------------------------
-- 1. account.workspace_id ← 'default-workspace' (flat literal; no parent FK)
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE account
    SET workspace_id = 'default-workspace'
    WHERE workspace_id IS NULL;
END;
$$;

-- ---------------------------------------------------------------------------
-- 2. expenditure.workspace_id ← 'default-workspace' (flat literal; no parent FK)
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE expenditure
    SET workspace_id = 'default-workspace'
    WHERE workspace_id IS NULL;
END;
$$;

-- ---------------------------------------------------------------------------
-- 3. journal_entry.workspace_id ← 'default-workspace' (flat literal; no parent FK)
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE journal_entry
    SET workspace_id = 'default-workspace'
    WHERE workspace_id IS NULL;
END;
$$;
