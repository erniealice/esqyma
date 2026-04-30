-- Migration: procurement_request_three_mode (down)
-- Dialect: postgres
-- Created: 2026-04-30T14:01:00Z
-- Plan: docs/plan/20260430-supplier-pricing-symmetry/plan.md (P6 / §6.4b)
-- Rationale: Reverses 20260430140100_procurement_request_three_mode.up.sql.

BEGIN;

-- procurement_request_line indexes + columns
DROP INDEX IF EXISTS idx_procurement_request_line_spawned_expenditure_id;
DROP INDEX IF EXISTS idx_procurement_request_line_spawned_purchase_order_line_item_id;
DROP INDEX IF EXISTS idx_procurement_request_line_spawned_supplier_contract_id;
DROP INDEX IF EXISTS idx_procurement_request_line_spawn_status;
DROP INDEX IF EXISTS idx_procurement_request_line_fulfillment_mode;

ALTER TABLE procurement_request_line
  DROP COLUMN IF EXISTS spawn_completed_at,
  DROP COLUMN IF EXISTS spawn_attempted_at,
  DROP COLUMN IF EXISTS spawn_idempotency_key,
  DROP COLUMN IF EXISTS spawn_error,
  DROP COLUMN IF EXISTS spawn_status,
  DROP COLUMN IF EXISTS recurring_term_unit,
  DROP COLUMN IF EXISTS recurring_term_value,
  DROP COLUMN IF EXISTS recurring_cycle_unit,
  DROP COLUMN IF EXISTS recurring_cycle_value,
  DROP COLUMN IF EXISTS spawned_expenditure_id,
  DROP COLUMN IF EXISTS spawned_purchase_order_line_item_id,
  DROP COLUMN IF EXISTS spawned_supplier_contract_id,
  DROP COLUMN IF EXISTS fulfillment_mode;

-- procurement_request indexes + columns
DROP INDEX IF EXISTS idx_procurement_request_fulfillment_strategy;
ALTER TABLE procurement_request
  DROP COLUMN IF EXISTS policy_decision_log,
  DROP COLUMN IF EXISTS fulfillment_strategy;

COMMIT;
