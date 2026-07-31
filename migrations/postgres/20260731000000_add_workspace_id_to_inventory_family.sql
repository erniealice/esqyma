-- Migration: add_workspace_id_to_inventory_family
-- Date: 2026-07-31
-- Plan: docs/plan/20260729-inventory-item-tenant-scope/plan.md §5 W2 (Option B),
--       Q-FAMILY locked 2026-07-31 = ALL FIVE tables in one migration.
--
-- Purpose: Add a tenant anchor (workspace_id, NULLABLE) + FK + partial index to the
--          five column-less inventory tables:
--            inventory_item, inventory_attribute, inventory_depreciation,
--            inventory_serial, inventory_serial_history
--
--          These tables have NO workspace_id column, and none of them is registered
--          in WorkspaceAwareOperations' columnLessTenantTables. Consequence today
--          (espyna contrib/postgres/.../core/workspace_operations.go):
--            * List   (:413-433) — direct-column branch needs tableHasWorkspaceColumn
--                                  (false); shadow branch needs columnLessTenantTables
--                                  (false) => falls through UNFILTERED and UNLOGGED.
--            * Read   (:469-516) — no parent-JOIN probe.
--            * Update (:521-550) / Delete (:554-568) / HardDelete (:572-586) — the
--                                  ownership Read is skipped, so this is a WRITE-side
--                                  exposure too, not merely a disclosure.
--            * Create (:437-455) — stamps no tenant anchor, so new rows are ownerless.
--          i.e. a live cross-workspace IDOR on the postgres provider both apps run
--          (service-admin :8081/professional1, school-admin :8090/education1), gated
--          only by the VERB (inventory_item:list/:read), never by the ROW.
--
--          The moment the column exists, tableHasWorkspaceColumn flips true and the
--          decorator scopes List, Read, Create, Update, Delete and HardDelete for the
--          generic dbOps CRUD paths with no adapter edit at all. That is the whole
--          point of Option B for those paths.
--
--          NOT covered by the decorator: the two hand-written page-data CTE methods
--          (GetInventoryItemListPageData / GetInventoryItemItemPageData, espyna
--          inventory_item.go:243/:459, mirrored in the four sibling entities) build
--          their own SQL directly and bypass WorkspaceAwareOperations entirely. They
--          are verified dead code (owner lock Q-DEAD, 2026-07-31,
--          docs/plan/20260729-inventory-item-tenant-scope/progress.md) scheduled for
--          DELETION, with the sibling equivalents to be removed in the same wave.
--
-- Anchor decision (2026-07-29, measured on both live DBs — plan §1.1/§1.2):
--   * product IS the anchor for inventory_item: 110/110 products carry workspace_id,
--     and 13/13 professional1 items reach one via product_id.
--   * location is NOT an anchor: only 2 of 6 location rows carry workspace_id and
--     0 of the 13 items reach a workspace through it. Do NOT use it as a fallback.
--   * product_variant is a DEAD END (no workspace_id of its own; two hops).
--   * The four sibling tables anchor on their inventory_item parent (all four carry a
--     nullable inventory_item_id text column — baseline.sql:1589,1604,1676,1696).
--
-- Safety contract (mirrors 20260530000000_add_workspace_id_to_ledger_financials.sql):
--   * ADD COLUMN IF NOT EXISTS — re-applying this migration is a no-op.
--   * FK constraints created inside DO $$ ... $$ guards (ALTER ADD CONSTRAINT has no
--     IF NOT EXISTS). The guard matches on constraint SHAPE (conrelid + contype='f' +
--     conkey = the source column's attnum), NOT on a hand-typed conname literal —
--     the corrected house idiom per commit 8ac14c0 ("shape-based FK guards; the
--     name-based ones were dead code"). Shape guards cannot rot when a name is
--     truncated at NAMEDATALEN (63), renamed, or auto-generated. Constraint names
--     below still follow the baseline convention <table>_workspace_id_fkey (longest:
--     inventory_serial_history_workspace_id_fkey = 42 bytes, no truncation risk).
--   * FK uses NOT VALID so no full-table scan is taken on already-populated tables;
--     run VALIDATE CONSTRAINT in a maintenance window after the backfill reconciles.
--   * Indexes use IF NOT EXISTS and are PARTIAL (WHERE workspace_id IS NOT NULL), so
--     they impose no IO on existing rows until the backfill populates the column.
--   * Column is NULLABLE here. NOT NULL is a deliberately separate later step
--     (Q-NOTNULL locked 2026-07-31 = follow-up), per the documented 2-step tightening
--     and the ledger precedent (…0002_ledger_financials_workspace_id_not_null.sql).
--   * NO backfill here — see the companion 20260731000001_backfill_… migration.
--   * NO flat 'default-workspace' literal anywhere. The 20260530 backfill explicitly
--     superseded that approach; derive per row from the structural parent or leave NULL.
--
-- Apply-order amendment pinned with the option lock (progress.md, 2026-07-31):
--   ADD (this file) -> RESTART both apps (WorkspaceAwareOperations caches the
--   has-workspace-column answer for the process lifetime, workspace_operations.go:56-59)
--   -> BACKFILL (…0001) -> re-assert NULL count = 0. Do not run the two files
--   back-to-back without the restart in between.
--
-- Apply targets (plan §5.3): professional1 is atlas-tracked (pnpm db:hash && DIALECT=
--   postgres pnpm db:apply); education1 is NOT atlas-tracked — apply the same SQL by
--   direct psql, which is safe precisely because every statement is guarded.
--
-- Idempotency: applying this migration twice produces no changes.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. inventory_item.workspace_id   (the reported leak; 13 rows on professional1,
--    0 on education1 — all 13 derivable via product)
-- ---------------------------------------------------------------------------
ALTER TABLE inventory_item
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
DECLARE
    v_attnum smallint;
BEGIN
    SELECT attnum INTO v_attnum
      FROM pg_attribute
     WHERE attrelid = 'inventory_item'::regclass
       AND attname  = 'workspace_id';

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conrelid = 'inventory_item'::regclass
           AND contype  = 'f'
           AND conkey   = ARRAY[v_attnum]
    ) THEN
        ALTER TABLE inventory_item
            ADD CONSTRAINT inventory_item_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_inventory_item_workspace_id
    ON inventory_item USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 2. inventory_attribute.workspace_id   (0 rows on both DBs)
-- ---------------------------------------------------------------------------
ALTER TABLE inventory_attribute
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
DECLARE
    v_attnum smallint;
BEGIN
    SELECT attnum INTO v_attnum
      FROM pg_attribute
     WHERE attrelid = 'inventory_attribute'::regclass
       AND attname  = 'workspace_id';

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conrelid = 'inventory_attribute'::regclass
           AND contype  = 'f'
           AND conkey   = ARRAY[v_attnum]
    ) THEN
        ALTER TABLE inventory_attribute
            ADD CONSTRAINT inventory_attribute_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_inventory_attribute_workspace_id
    ON inventory_attribute USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 3. inventory_depreciation.workspace_id   (0 rows on both DBs)
-- ---------------------------------------------------------------------------
ALTER TABLE inventory_depreciation
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
DECLARE
    v_attnum smallint;
BEGIN
    SELECT attnum INTO v_attnum
      FROM pg_attribute
     WHERE attrelid = 'inventory_depreciation'::regclass
       AND attname  = 'workspace_id';

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conrelid = 'inventory_depreciation'::regclass
           AND contype  = 'f'
           AND conkey   = ARRAY[v_attnum]
    ) THEN
        ALTER TABLE inventory_depreciation
            ADD CONSTRAINT inventory_depreciation_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_inventory_depreciation_workspace_id
    ON inventory_depreciation USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 4. inventory_serial.workspace_id   (0 rows on both DBs)
-- ---------------------------------------------------------------------------
ALTER TABLE inventory_serial
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
DECLARE
    v_attnum smallint;
BEGIN
    SELECT attnum INTO v_attnum
      FROM pg_attribute
     WHERE attrelid = 'inventory_serial'::regclass
       AND attname  = 'workspace_id';

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conrelid = 'inventory_serial'::regclass
           AND contype  = 'f'
           AND conkey   = ARRAY[v_attnum]
    ) THEN
        ALTER TABLE inventory_serial
            ADD CONSTRAINT inventory_serial_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_inventory_serial_workspace_id
    ON inventory_serial USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 5. inventory_serial_history.workspace_id   (0 rows on both DBs)
-- ---------------------------------------------------------------------------
ALTER TABLE inventory_serial_history
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
DECLARE
    v_attnum smallint;
BEGIN
    SELECT attnum INTO v_attnum
      FROM pg_attribute
     WHERE attrelid = 'inventory_serial_history'::regclass
       AND attname  = 'workspace_id';

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conrelid = 'inventory_serial_history'::regclass
           AND contype  = 'f'
           AND conkey   = ARRAY[v_attnum]
    ) THEN
        ALTER TABLE inventory_serial_history
            ADD CONSTRAINT inventory_serial_history_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_inventory_serial_history_workspace_id
    ON inventory_serial_history USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- 6. Backfill — intentionally NOT performed here. See the companion migration
--    20260731000001_backfill_workspace_id_on_inventory_family.sql, and honour the
--    ADD -> restart -> BACKFILL ordering pinned in the header.
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- 7. NOT NULL tightening — NOT performed here. Q-NOTNULL is locked as a follow-up:
--    tighten only after the backfill is reconciled on BOTH databases and Create has
--    been observed stamping the anchor on new rows.
-- ---------------------------------------------------------------------------
