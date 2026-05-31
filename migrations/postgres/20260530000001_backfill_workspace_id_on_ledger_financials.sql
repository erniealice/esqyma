-- Migration: backfill_workspace_id_on_ledger_financials
-- Date: 2026-05-30
-- Plan: docs/plan/20260530-authz-workspace-hardening (Q-AWS3-A migration leg, Plan 1 hotfix)
-- Follows: 20260530000000_add_workspace_id_to_ledger_financials.sql
--
-- Purpose: Backfill workspace_id on expenditure, journal_entry, and account by
-- PER-ROW DERIVATION from each table's structural parent — NOT a flat
-- 'default-workspace' literal. The prior revision of this file flat-collapsed all
-- rows to 'default-workspace' behind a single-workspace self-guard; that approach
-- is SUPERSEDED here. This DB is multi-tenant (4 active workspaces), so workspace_id
-- must be DERIVED from the tenant link on each row. (It happens that every ledger
-- row on THIS DB resolves to one workspace — default-workspace — but we arrive at
-- that by derivation, never by assumption.)
--
-- Derivation idiom (every join-derive block is re-runnable):
--     UPDATE child c SET workspace_id = p.workspace_id
--       FROM <parent> p
--      WHERE c.<fk> = p.id
--        AND c.workspace_id IS NULL          -- re-runnable: only fills NULLs
--        AND p.workspace_id IS NOT NULL;     -- never overwrite with a NULL parent
--
-- Apply order (PARENTS BEFORE CHILDREN — order is load-bearing):
--   1. expenditure              <- supplier
--   2. journal_entry REVENUE    <- revenue.client_id -> client   (client is authoritative)
--   3. journal_entry EXPENDITURE<- expenditure (now populated by step 1)
--   4. account                  <- GUARDED single-tenant fallback (no structural parent)
--
-- NOTE: journal_line is OUT OF SCOPE for this migration. The ADD leg
-- (20260530000000) only adds workspace_id to account/expenditure/journal_entry —
-- journal_line has NO workspace_id column, and the espyna adapter does NOT filter
-- journal_line by workspace_id. journal_line is scoped as a separate follow-up.
-- The account self-guard below (step 4) reaches workspace via
-- journal_line.account_id -> journal_entry.workspace_id, which needs no
-- journal_line.workspace_id column.
--
-- Orphans intentionally LEFT NULL (fail-closed; a NULL workspace_id is excluded
-- from every "WHERE workspace_id = $X" predicate, which is audit-safe):
--   * 3 NULL-supplier expenditure rows (step 1 cannot resolve a parent).
--   * 2 EXPENDITURE journal_entry rows (step 3) whose source expenditures are
--     those NULL-supplier orphans.
--   These remaining NULLs are why the NOT NULL tightening (20260530000002) is
--   DEFERRED and carries a 0-NULL precheck — it must not be applied until the
--   orphans are resolved.
--
-- Safety contract:
--   * Every block is idempotent (WHERE workspace_id IS NULL) — re-applying is a no-op.
--   * Each block is wrapped in DO $$ BEGIN ... END $$ for cleaner audit logs.
--   * Each block is independent; a failure in one does not corrupt the others.
--   * Step 4 (account) SELF-GUARDS: it derives the set of workspaces that actually
--     touch accounts and RAISEs rather than guess if that set is multi-workspace.
--   * NOT NULL tightening is NOT performed here — see 20260530000002 (deferred).
--
-- Idempotency: applying this migration twice produces no changes.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. expenditure.workspace_id <- supplier.workspace_id
--    Resolves 5/8 rows on this DB. The 3 NULL-supplier expenditures have no
--    parent to derive from and stay NULL (fail-closed orphans).
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE expenditure e
    SET workspace_id = s.workspace_id
    FROM supplier s
    WHERE e.supplier_id = s.id
      AND e.workspace_id IS NULL
      AND s.workspace_id IS NOT NULL;
END;
$$;

-- ---------------------------------------------------------------------------
-- 2. journal_entry (source_type='REVENUE') <- revenue.client_id -> client.workspace_id
--    Derive THROUGH revenue to client. We deliberately do NOT shortcut via
--    revenue.workspace_id: that column is only PARTIALLY populated on this DB,
--    so client is the authoritative tenant link for revenue-sourced entries.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE journal_entry je
    SET workspace_id = c.workspace_id
    FROM revenue r
    JOIN client c ON r.client_id = c.id
    WHERE je.source_type = 'REVENUE'
      AND je.source_id = r.id
      AND je.workspace_id IS NULL
      AND c.workspace_id IS NOT NULL;
END;
$$;

-- ---------------------------------------------------------------------------
-- 3. journal_entry (source_type='EXPENDITURE') <- expenditure.workspace_id
--    expenditure is now populated by step 1. The 2 EXPENDITURE entries whose
--    source expenditures are NULL-supplier orphans (step 1) stay NULL here.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE journal_entry je
    SET workspace_id = e.workspace_id
    FROM expenditure e
    WHERE je.source_type = 'EXPENDITURE'
      AND je.source_id = e.id
      AND je.workspace_id IS NULL
      AND e.workspace_id IS NOT NULL;
END;
$$;

-- ---------------------------------------------------------------------------
-- 4. account.workspace_id <- GUARDED single-tenant fallback
--    account has NO structural workspace parent (no FK to workspace/client/user/
--    supplier). On a DB whose ledger is single-tenant, fill every account so the
--    Chart-of-Accounts list works under the workspace_id filter.
--
--    SELF-GUARD: derive the set of workspaces that actually touch accounts, via
--    journal_line.account_id -> journal_entry.workspace_id (journal_entry is now
--    populated by steps 2-3). IF that set contains >1 workspace, RAISE and abort —
--    accounts genuinely span tenants and we must NOT guess a single fallback.
--    ELSE fill every NULL account.workspace_id to that single workspace.
--    Idempotent: WHERE workspace_id IS NULL.
-- ---------------------------------------------------------------------------
DO $$
DECLARE
    ws_count      int;
    target_ws     text;
BEGIN
    -- Distinct workspaces reachable from accounts through the journal graph.
    SELECT COUNT(DISTINCT je.workspace_id),
           MIN(je.workspace_id)
      INTO ws_count, target_ws
      FROM journal_line jl
      JOIN journal_entry je ON jl.journal_entry_id = je.id
     WHERE je.workspace_id IS NOT NULL;

    IF ws_count > 1 THEN
        RAISE EXCEPTION
            'account workspace_id self-guard: accounts are touched by % distinct workspaces via the journal graph. Refusing the single-tenant fallback — account has no structural workspace parent, so a per-row derivation must be designed before backfilling.',
            ws_count;
    END IF;

    -- ws_count is 0 (no journal coverage) or 1. Only fill when we have a single
    -- authoritative target workspace; if 0, leave accounts NULL (nothing to derive).
    IF target_ws IS NOT NULL THEN
        UPDATE account
        SET workspace_id = target_ws
        WHERE workspace_id IS NULL;
    END IF;
END;
$$;
