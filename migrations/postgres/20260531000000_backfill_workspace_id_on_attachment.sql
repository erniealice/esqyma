-- Migration: backfill_workspace_id_on_attachment
-- Date: 2026-05-31
-- Plan: docs/plan/20260530-storage-attachments-hardening (Q-ST-WSSCOPE = C, Plan 5)
--
-- Purpose: attachment.workspace_id ALREADY EXISTS as a NULLABLE `text` column
-- (baseline.sql:665) with NO FK and NO index. This is therefore a 2-step
-- (NOT 3-step) hardening: there is NO ADD COLUMN leg. This file (STEP 1) does
-- two things, both idempotent:
--   (a) BACKFILL workspace_id with the flat literal 'default-workspace' on every
--       row where it is currently NULL, AND
--   (b) ADD the missing additive infrastructure that the ledger hotfix added in
--       its ADD leg (20260530000000): the workspace FK (NOT VALID) and the
--       partial index — neither of which exists on attachment today.
--
-- Backfill source decision (2026-05-31):
--   attachment carries NO workspace-bearing parent FK from which workspace_id
--   could be derived by JOIN. Its module_key / foreign_key pair is a POLYMORPHIC
--   text reference (it can point at any module's row), NOT a typed FK, so there
--   is no single parent table to JOIN against. The backfill is therefore a flat
--   constant 'default-workspace' — this mirrors the ledger-financials flat-literal
--   case (20260530000001), NOT the asset-graph JOIN case
--   (20260510040000_backfill_workspace_id_on_asset_graph.sql).
--
-- ⚠️ SINGLE-WORKSPACE GUARD — READ BEFORE APPLYING
--   The flat 'default-workspace' literal is correct ONLY because current deploys
--   are effectively single-workspace. Before applying this migration, confirm the
--   guard holds against the target DB:
--
--       SELECT COUNT(DISTINCT workspace_id) FROM workspace_user WHERE active;
--       -- expected: 1
--
--   STOP if the count is > 1: DO NOT apply this flat backfill. The correct posture
--   for a multi-workspace DB is to LEAVE workspace_id NULL (fail-closed: a NULL
--   workspace_id is excluded from every "WHERE workspace_id = $X" predicate, which
--   is audit-safe) and derive it per row from a tenant link in a follow-up plan. A
--   flat 'default-workspace' on a multi-tenant DB would wrongly collapse every
--   tenant's attachments into one workspace.
--
-- Safety contract (mirrors 20260530000000 + 20260530000001):
--   * The UPDATE uses WHERE workspace_id IS NULL — re-applying is a no-op.
--   * Wrapped in DO $$ BEGIN ... END $$ for cleaner audit logs.
--   * The FK is created via a DO $$ IF NOT EXISTS information_schema.table_constraints $$
--     guard (idempotent) and uses NOT VALID to avoid a full-table scan on the
--     populated attachment table; VALIDATE CONSTRAINT runs in the deferred STEP 2
--     (20260531000001_attachment_workspace_id_not_null.sql).
--   * The index uses IF NOT EXISTS and is partial (WHERE workspace_id IS NOT NULL).
--   * Column stays NULLABLE in this migration. The 2-step pattern documented in
--     docs/wiki/articles/schema-migrations.md "Strict rules now that users exist"
--     tightens to NOT NULL only in STEP 2, after this backfill is reconciled.
--   * 'default-workspace' is the canonical default workspace id used elsewhere in
--     the single-workspace deploy model (see 20260530000001 / 20260510040000).
--
-- Idempotency: applying this migration twice produces no changes.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. attachment.workspace_id ← 'default-workspace' (SELF-GUARDED flat backfill)
--    The single-workspace guard from the header is now ENFORCED in-SQL: if any
--    NULL row exists AND the deploy is multi-workspace, this RAISEs and aborts
--    the migration instead of silently collapsing tenants. Flat-backfills only
--    when single-workspace; a no-op when 0 NULLs (the current attachment state).
-- ---------------------------------------------------------------------------
DO $$
DECLARE
    null_rows bigint;
    ws_count  int;
BEGIN
    SELECT COUNT(*) INTO null_rows FROM attachment WHERE workspace_id IS NULL;
    IF null_rows > 0 THEN
        SELECT COUNT(DISTINCT workspace_id) INTO ws_count FROM workspace_user WHERE active;
        IF ws_count > 1 THEN
            RAISE EXCEPTION
                'workspace_id self-guard: % NULL attachment.workspace_id row(s) in a MULTI-workspace deploy (% active workspaces). Refusing flat ''default-workspace'' backfill — derive workspace_id per row (module_key/foreign_key -> parent) first.',
                null_rows, ws_count;
        END IF;
        UPDATE attachment
        SET workspace_id = 'default-workspace'
        WHERE workspace_id IS NULL;
    END IF;
END;
$$;

-- ---------------------------------------------------------------------------
-- 2. attachment.workspace_id → FK to workspace(id) (NOT VALID; idempotent guard)
--    This is the additive infra the ledger hotfix shipped in its ADD leg; the
--    attachment column predates that pattern, so the FK is added here.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'attachment_workspace_id_fkey'
          AND table_name = 'attachment'
    ) THEN
        ALTER TABLE attachment
            ADD CONSTRAINT attachment_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) ON DELETE RESTRICT NOT VALID;
    END IF;
END;
$$;

-- ---------------------------------------------------------------------------
-- 3. attachment.workspace_id → partial index (idempotent; no IO on NULL rows)
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_attachment_workspace_id
    ON attachment USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 4. NOT NULL tightening: NOT performed in this migration. See
--    20260531000001_attachment_workspace_id_not_null.sql (deferred STEP 2,
--    applied in a later window after this backfill is verified). That is the
--    second step in the documented 2-step pattern.
-- ---------------------------------------------------------------------------

-- NOTE: The W2 cross-workspace use-case assertion (ReadAttachmentByEntity /
-- DeleteAttachmentByEntity perform the live workspace check) is ALREADY LIVE.
-- This migration is the durable SCHEMA BACKSTOP for that guard — not the live
-- guard itself.
