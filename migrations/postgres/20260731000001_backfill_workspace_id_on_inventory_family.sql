-- Migration: backfill_workspace_id_on_inventory_family
-- Date: 2026-07-31
-- Plan: docs/plan/20260729-inventory-item-tenant-scope/plan.md §5.1 (Option B),
--       Q-FAMILY locked 2026-07-31 = all five inventory tables.
-- Follows: 20260731000000_add_workspace_id_to_inventory_family.sql
--
-- Purpose: Populate the tenant anchor added by the companion ADD migration, per row,
--          from each table's structural parent. No literal is ever assigned.
--
-- Backfill chain (order matters — step 1 feeds steps 2-5):
--   1. inventory_item.workspace_id           <- product.workspace_id
--                                               via inventory_item.product_id = product.id
--   2. inventory_attribute.workspace_id      <- inventory_item.workspace_id
--                                               via inventory_attribute.inventory_item_id
--   3. inventory_depreciation.workspace_id   <- inventory_item.workspace_id
--                                               via inventory_depreciation.inventory_item_id
--   4. inventory_serial.workspace_id         <- inventory_item.workspace_id
--                                               via inventory_serial.inventory_item_id
--   5. inventory_serial_history.workspace_id <- inventory_item.workspace_id
--                                               via inventory_serial_history.inventory_item_id
--
--      Steps 2-5 cascade from step 1, exactly like
--      20260510040000_backfill_workspace_id_on_asset_graph.sql steps 2-3. They are
--      NO-OPS on both live databases today (all four sibling tables hold 0 rows on
--      education1 and professional1, measured 2026-07-29) — the SQL is written to be
--      correct if rows appear, not because rows exist.
--
--      inventory_serial_history could alternatively anchor via inventory_serial_id ->
--      inventory_serial.workspace_id. inventory_item_id is used instead because it is
--      the SAME structural parent the other three siblings use (one uniform rule), it
--      is one hop rather than two, and it does not depend on step 4 having succeeded.
--      Both columns are nullable text with no FK, so neither is strictly stronger;
--      the direct-parent form has the shorter dependency chain.
--
-- Anchor decisions RE-STATED so this file stands alone (plan §1.1, §5.1):
--   * product IS the anchor for inventory_item — 110/110 product rows carry
--     workspace_id; 13/13 professional1 items reach one. Expected result:
--     professional1 13 rows -> 'default-workspace'; education1 0 rows (no-op).
--   * location is NOT a fallback anchor — 0 of the 13 items reach a workspace through
--     it (only 2 of 6 location rows carry workspace_id at all). Never join it here.
--   * NO flat 'default-workspace' literal. The 20260530 ledger backfill's literal
--     approach is explicitly superseded; derive per row or leave NULL.
--
-- Orphan semantics (deliberate, fail-closed):
--   inventory_item has NO foreign keys at all (baseline.sql:4532-4533 declares only
--   inventory_item_pkey), so product_id is a bare nullable text and may be NULL or
--   dangling. Such rows are LEFT NULL on purpose: a NULL workspace_id is excluded by
--   every "workspace_id = $N" predicate, so the row becomes invisible rather than
--   cross-tenant visible. Same for a sibling whose inventory_item_id is NULL/dangling,
--   or whose parent item is itself an orphan. Zero such rows exist today.
--
-- Deliberately NOT filtered on active: soft-deleted rows must carry the tenant anchor
-- too, or they resurface unscoped in any query that drops the active predicate.
--
-- Safety contract:
--   * Every UPDATE carries "AND <child>.workspace_id IS NULL" — re-runnable, only ever
--     fills gaps, never overwrites an already-set value.
--   * Every UPDATE carries "AND <parent>.workspace_id IS NOT NULL" — never overwrites
--     a set value with a NULL parent, and never writes a NULL over a NULL.
--   * Each step is a separate DO block for cleaner audit logs and readability, NOT for
--     transactional isolation. None of these DO blocks has an EXCEPTION handler, and
--     the whole file applies in a single transaction, so a failure in any step aborts
--     the entire migration — it does NOT roll back only the failing step.
--   * NOT NULL tightening is NOT performed here — Q-NOTNULL is a locked follow-up.
--
-- Ordering (pinned with the option lock, progress.md 2026-07-31):
--   the companion ADD migration must be applied AND both apps restarted BEFORE this
--   file runs (WorkspaceAwareOperations caches the has-workspace-column answer for the
--   process lifetime — workspace_operations.go:56-59). After this file, re-assert
--   SELECT count(*) FROM inventory_item WHERE workspace_id IS NULL  =>  0 on professional1.
--
-- Idempotency: applying this migration twice produces no changes.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. inventory_item.workspace_id <- product.workspace_id (via product_id)
--    THE anchor step. Expected: professional1 13 rows updated; education1 0 rows.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE inventory_item ii
       SET workspace_id = p.workspace_id
      FROM product p
     WHERE ii.product_id     = p.id
       AND ii.workspace_id   IS NULL          -- re-runnable: only fills NULLs
       AND p.workspace_id    IS NOT NULL;     -- never overwrite with a NULL parent
END;
$$;

-- ---------------------------------------------------------------------------
-- 2. inventory_attribute.workspace_id <- inventory_item.workspace_id
--    Cascades from step 1. 0 rows on both DBs today.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE inventory_attribute ia
       SET workspace_id = ii.workspace_id
      FROM inventory_item ii
     WHERE ia.inventory_item_id = ii.id
       AND ia.workspace_id      IS NULL
       AND ii.workspace_id      IS NOT NULL;
END;
$$;

-- ---------------------------------------------------------------------------
-- 3. inventory_depreciation.workspace_id <- inventory_item.workspace_id
--    Cascades from step 1. 0 rows on both DBs today.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE inventory_depreciation idp
       SET workspace_id = ii.workspace_id
      FROM inventory_item ii
     WHERE idp.inventory_item_id = ii.id
       AND idp.workspace_id      IS NULL
       AND ii.workspace_id       IS NOT NULL;
END;
$$;

-- ---------------------------------------------------------------------------
-- 4. inventory_serial.workspace_id <- inventory_item.workspace_id
--    Cascades from step 1. 0 rows on both DBs today.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE inventory_serial isr
       SET workspace_id = ii.workspace_id
      FROM inventory_item ii
     WHERE isr.inventory_item_id = ii.id
       AND isr.workspace_id      IS NULL
       AND ii.workspace_id       IS NOT NULL;
END;
$$;

-- ---------------------------------------------------------------------------
-- 5. inventory_serial_history.workspace_id <- inventory_item.workspace_id
--    Cascades from step 1 (direct parent, not via inventory_serial — see header).
--    0 rows on both DBs today.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    UPDATE inventory_serial_history ish
       SET workspace_id = ii.workspace_id
      FROM inventory_item ii
     WHERE ish.inventory_item_id = ii.id
       AND ish.workspace_id      IS NULL
       AND ii.workspace_id       IS NOT NULL;
END;
$$;

-- ---------------------------------------------------------------------------
-- 6. Verification queries for the applying session (read-only; run per database):
--
--      SELECT workspace_id, count(*) FROM inventory_item GROUP BY 1;
--      -- professional1 must equal the pre-change derived distribution exactly
--      -- ('default-workspace' x 13) with ZERO NULLs; education1 stays empty.
--
--      SELECT count(*) FROM inventory_item ii
--       WHERE ii.workspace_id IS NULL
--         AND EXISTS (SELECT 1 FROM product p
--                      WHERE p.id = ii.product_id AND p.workspace_id IS NOT NULL);
--      -- must be 0: any remaining NULL is a genuine orphan, not a missed row.
-- ---------------------------------------------------------------------------
