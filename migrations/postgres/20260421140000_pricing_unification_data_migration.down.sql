-- Migration: pricing_unification_data_migration (down)
-- Dialect: postgres
-- Created: 2026-04-21T14:00:00Z
--
-- ════════════════════════════════════════════════════════════════════════════
--          ⚠ DESTRUCTIVE — DEV/STAGING RESET ONLY — READ BEFORE RUNNING ⚠
-- ════════════════════════════════════════════════════════════════════════════
--
-- This down migration reverses the Phase 1 data migration by DELETING all rows
-- that were synthesised from legacy price_list / price_product data and by
-- CLEARING the product_price_plan_id backfill on revenue_line_item.
--
-- ⚠ THIS IS NOT A SAFE ROLLBACK IN PRODUCTION.
--
-- In production, running this down migration will:
--   • Permanently delete all price_schedule, plan, price_plan, and
--     product_price_plan rows that were created from legacy price_list data.
--   • Clear product_price_plan_id on every revenue_line_item that was backfilled.
--     If price_product_id is also gone (Phase 3+), those line items lose
--     ALL pricing traceability — i.e. invoices become unresolvable.
--   • Drop the legacy_price_list_id trail columns, making the mapping
--     irreversible.
--
-- ONLY run this migration on a development or staging environment to reset
-- migration state. NEVER run it against a production database.
--
-- Prerequisite: Phase 2 code migration must NOT have been deployed. If any
-- application code has been switched to read product_price_plan_id as
-- authoritative (Phase 2+), running this down migration will break pricing
-- resolution for every invoice created after Phase 2 was deployed.

BEGIN;

-- ── 1. Clear revenue_line_item.product_price_plan_id where it was backfilled ──
-- Only clears rows where the product_price_plan_id FK points to a row that
-- carries a legacy_price_list_id (i.e. a synthetic row we created in the up
-- migration). Rows populated by the application itself are NOT touched.

UPDATE revenue_line_item rli
SET product_price_plan_id = NULL
FROM product_price_plan ppp
JOIN price_plan new_pp ON new_pp.id = ppp.price_plan_id
WHERE rli.product_price_plan_id = ppp.id
  AND new_pp.legacy_price_list_id IS NOT NULL;

-- ── 2. Delete product_price_plan rows migrated from price_product ─────────
DELETE FROM product_price_plan
WHERE price_plan_id IN (
    SELECT id FROM price_plan WHERE legacy_price_list_id IS NOT NULL
);

-- ── 3. Delete synthetic price_plan rows ───────────────────────────────────
DELETE FROM price_plan
WHERE legacy_price_list_id IS NOT NULL;

-- ── 4. Delete synthetic plan rows ─────────────────────────────────────────
DELETE FROM plan
WHERE legacy_price_list_id IS NOT NULL;

-- ── 5. Delete synthetic price_schedule rows ───────────────────────────────
DELETE FROM price_schedule
WHERE legacy_price_list_id IS NOT NULL;

-- ── 6. Drop trail columns and their indexes ───────────────────────────────
DROP INDEX IF EXISTS idx_price_schedule_legacy_price_list_id;
ALTER TABLE price_schedule DROP COLUMN IF EXISTS legacy_price_list_id;

DROP INDEX IF EXISTS idx_plan_legacy_price_list_id;
ALTER TABLE plan DROP COLUMN IF EXISTS legacy_price_list_id;

DROP INDEX IF EXISTS idx_price_plan_legacy_price_list_id;
ALTER TABLE price_plan DROP COLUMN IF EXISTS legacy_price_list_id;

-- Note: billing_kind, amount_basis, billing_cycle_*, default_term_* columns on
-- price_plan are NOT dropped here — they were added by the Phase 0 DDL migration
-- (20260421130000_pricing_unification_fields) and are reversed by that migration's
-- own down file. This down migration only reverses the DATA changes.

COMMIT;
