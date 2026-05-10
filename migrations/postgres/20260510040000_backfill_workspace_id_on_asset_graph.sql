-- Migration: backfill_workspace_id_on_asset_graph
-- Date: 2026-05-10
-- Phase: 1.5 — Tenancy hotfix (codex-review-phase1 finding H1)
-- Follows: 20260510030000_add_workspace_id_to_asset_graph.sql
--
-- Purpose: Backfill workspace_id on the four asset-graph tables using the
-- deterministic tenant link that Phase 1's migration incorrectly said did
-- not exist. codex-review-phase1.md H1 finding: asset.vendor_id → client
-- (a Client carries workspace_id since 20260502000000_baseline.sql:811).
--
-- Backfill chain:
--   1. asset.workspace_id ← client.workspace_id via asset.vendor_id = client.id
--      (vendor is always a Client record)
--   2. asset_transaction.workspace_id ← asset.workspace_id via asset_transaction.asset_id = asset.id
--      (cascade from step 1)
--   3. depreciation_schedule.workspace_id ← asset.workspace_id via depreciation_schedule.asset_id = asset.id
--      (cascade from step 1)
--   4. asset_category.workspace_id — NO deterministic link exists. asset_category rows
--      are workspace-neutral definitions (shared templates); leaving NULL is the correct
--      fail-closed posture: NULL rows are excluded from WHERE workspace_id = $X predicates,
--      which matches the audit-safe behavior documented in Phase 1's migration header.
--      A future plan that adds a per-workspace category model should backfill at that time.
--   5. asset.custodian_id — the user table has NO workspace_id column (confirmed in
--      20260502000000_baseline.sql:3774-3789). Cannot derive workspace from custodian.
--
-- Safety contract:
--   * Every UPDATE uses WHERE workspace_id IS NULL — re-applying is a no-op.
--   * Wrapped in DO $$ BEGIN ... END $$ for cleaner audit logs.
--   * Each block is independent; a failure in one does not affect the others.
--   * NOT NULL tightening is NOT performed here; that is the second step per
--     docs/wiki/articles/schema-migrations.md "Strict rules now that users exist".
--
-- Idempotency: applying this migration twice produces no changes.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. asset.workspace_id ← client.workspace_id (via asset.vendor_id)
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE asset a
    SET workspace_id = c.workspace_id
    FROM client c
    WHERE a.vendor_id = c.id
      AND a.workspace_id IS NULL
      AND c.workspace_id IS NOT NULL;
END;
$$;

-- ---------------------------------------------------------------------------
-- 2. asset_transaction.workspace_id ← asset.workspace_id (cascade by asset_id)
--    Runs after step 1 so asset.workspace_id is already populated where possible.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE asset_transaction at
    SET workspace_id = a.workspace_id
    FROM asset a
    WHERE at.asset_id = a.id
      AND at.workspace_id IS NULL
      AND a.workspace_id IS NOT NULL;
END;
$$;

-- ---------------------------------------------------------------------------
-- 3. depreciation_schedule.workspace_id ← asset.workspace_id (cascade by asset_id)
--    Runs after step 1 so asset.workspace_id is already populated where possible.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE depreciation_schedule ds
    SET workspace_id = a.workspace_id
    FROM asset a
    WHERE ds.asset_id = a.id
      AND ds.workspace_id IS NULL
      AND a.workspace_id IS NOT NULL;
END;
$$;

-- ---------------------------------------------------------------------------
-- 4. asset_category.workspace_id — intentionally NOT backfilled.
--    No deterministic per-tenant link exists on asset_category. Categories are
--    workspace-neutral policy definitions in the current model. NULL workspace_id
--    correctly excludes them from tenant-scoped list queries (fail-closed).
--    See header comment for rationale.
-- ---------------------------------------------------------------------------
