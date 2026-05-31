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
--   attachment's module_key / foreign_key pair is a POLYMORPHIC text reference
--   (foreign_key holds the id of a row in the module named by module_key), NOT a
--   typed FK — so there is no single parent table to JOIN against. The backfill is
--   therefore a PER-ROW POLYMORPHIC DERIVATION: a CASE on module_key routes each
--   row to the correct parent table and copies that parent's workspace_id. This
--   mirrors the asset-graph JOIN case (20260510040000) generalized over a polymorphic
--   key — NOT the flat 'default-workspace' literal the prior revision used (that
--   approach is SUPERSEDED: attachments span 2 workspaces on this DB, so a flat
--   literal would wrongly collapse leapfor's attachments into default-workspace).
--
--   module_key branches enumerate every value PRESENT on this DB:
--       'product'      -> product.workspace_id      (via foreign_key = product.id)
--       'subscription' -> subscription.workspace_id (via foreign_key = subscription.id)
--   A module_key with no branch (e.g. a future module) leaves workspace_id NULL —
--   fail-closed, audit-safe, and surfaced by the deferred STEP 2's 0-NULL precheck.
--   Both parent tables are fully workspace_id-populated, so all present rows resolve.
--
--   NOTE: attachment.workspace_id is ALREADY 0-NULL on this DB (it was previously
--   flat-backfilled), so this polymorphic UPDATE is a correctness RE-COMPUTE that
--   is a no-op here (WHERE workspace_id IS NULL matches nothing). It exists so a
--   fresh/re-seeded DB derives the right tenant per row instead of a flat literal.
--
-- ⚠️ MULTI-WORKSPACE SELF-GUARD — retained from the prior revision
--   The polymorphic derivation is tenant-correct on a multi-workspace DB, so it does
--   NOT need a single-workspace precondition. The self-guard below is kept as a
--   defensive backstop: it RAISEs only if a NULL row REMAINS unresolved after the
--   CASE derivation AND the deploy is multi-workspace — i.e. a module_key with no
--   branch was hit on a multi-tenant DB, which must be designed for, not flat-filled.
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
--
-- Idempotency: applying this migration twice produces no changes.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. attachment.workspace_id ← POLYMORPHIC PER-ROW DERIVATION
--    CASE on module_key routes each row to its parent table and copies that
--    parent's workspace_id. Branches enumerate every module_key PRESENT on this
--    DB ('product', 'subscription'); a missing branch leaves the row NULL.
--    Idempotent (WHERE workspace_id IS NULL); no-op here (attachment is 0-NULL).
--
--    The trailing self-guard is the retained MULTI-WORKSPACE backstop: it RAISEs
--    only if a NULL row REMAINS after the CASE AND the deploy is multi-workspace
--    (an un-branched module_key on a multi-tenant DB), instead of leaving an
--    unresolved tenant silently NULL where a per-row derivation was expected.
-- ---------------------------------------------------------------------------
DO $$
DECLARE
    null_rows bigint;
    ws_count  int;
BEGIN
    UPDATE attachment a
    SET workspace_id = CASE a.module_key
        WHEN 'product'      THEN (SELECT p.workspace_id FROM product      p WHERE p.id = a.foreign_key)
        WHEN 'subscription' THEN (SELECT s.workspace_id FROM subscription s WHERE s.id = a.foreign_key)
        ELSE NULL
    END
    WHERE a.workspace_id IS NULL
      AND CASE a.module_key
            WHEN 'product'      THEN (SELECT p.workspace_id FROM product      p WHERE p.id = a.foreign_key)
            WHEN 'subscription' THEN (SELECT s.workspace_id FROM subscription s WHERE s.id = a.foreign_key)
            ELSE NULL
          END IS NOT NULL;

    -- Backstop: any NULL still remaining on a multi-workspace deploy means a
    -- module_key with no CASE branch (or an unresolvable foreign_key) was hit —
    -- that must be designed for, not silently left ambiguous.
    SELECT COUNT(*) INTO null_rows FROM attachment WHERE workspace_id IS NULL;
    IF null_rows > 0 THEN
        SELECT COUNT(DISTINCT workspace_id) INTO ws_count FROM workspace_user WHERE active;
        IF ws_count > 1 THEN
            RAISE EXCEPTION
                'workspace_id self-guard: % NULL attachment.workspace_id row(s) remain after polymorphic derivation in a MULTI-workspace deploy (% active workspaces). Add a module_key branch (or resolve the orphan foreign_key) before backfilling.',
                null_rows, ws_count;
        END IF;
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
