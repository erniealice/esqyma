-- Migration: supplier_contract_price_schedule (down)
-- Dialect: postgres
-- Created: 2026-04-30T14:00:00Z
-- Plan: docs/plan/20260430-supplier-pricing-symmetry/plan.md (P6 / §6.1 + §6.2)
-- Rationale: Reverses 20260430140000_supplier_contract_price_schedule.up.sql.
--            Drop FK back-edge first, then dependent table, then root table.

BEGIN;

-- FK back-edge on supplier_contract_line
DROP INDEX IF EXISTS idx_supplier_contract_line_supplier_contract_price_schedule_line_id;
ALTER TABLE supplier_contract_line
  DROP COLUMN IF EXISTS supplier_contract_price_schedule_line_id;

-- supplier_contract_price_schedule_line (depends on schedule + contract_line)
DROP INDEX IF EXISTS uq_supplier_contract_price_schedule_line_schedule_contract_line;
DROP INDEX IF EXISTS idx_supplier_contract_price_schedule_line_contract_line_id;
DROP INDEX IF EXISTS idx_supplier_contract_price_schedule_line_schedule_id;
DROP INDEX IF EXISTS idx_supplier_contract_price_schedule_line_workspace_id;
DROP TABLE IF EXISTS supplier_contract_price_schedule_line;

-- supplier_contract_price_schedule (root)
DROP INDEX IF EXISTS supplier_contract_price_schedule_one_active_per_contract;
DROP INDEX IF EXISTS supplier_contract_price_schedule_one_open_ended_per_contract;
ALTER TABLE supplier_contract_price_schedule
  DROP CONSTRAINT IF EXISTS supplier_contract_price_schedule_no_overlap;
DROP INDEX IF EXISTS idx_supplier_contract_price_schedule_location_id;
DROP INDEX IF EXISTS idx_supplier_contract_price_schedule_status;
DROP INDEX IF EXISTS idx_supplier_contract_price_schedule_supplier_contract_id;
DROP INDEX IF EXISTS idx_supplier_contract_price_schedule_workspace_id;
DROP TABLE IF EXISTS supplier_contract_price_schedule;

-- btree_gist extension is intentionally left in place; other migrations may
-- depend on it. Removing extensions is a workspace-wide concern.

COMMIT;
