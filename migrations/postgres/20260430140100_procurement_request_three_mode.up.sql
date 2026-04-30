-- Migration: procurement_request_three_mode (up)
-- Dialect: postgres
-- Created: 2026-04-30T14:01:00Z
-- Plan: docs/plan/20260430-supplier-pricing-symmetry/plan.md (P6 / §6.4b + flow.md F1/F2/F3)
-- Rationale: Adds the F1 fulfillment_mode discriminator, the F2 spawn back-FKs,
--            the F3 header strategy rollup, the RECURRING-mode parameters
--            (cycle / term), and the CRIT-3 spawn-lifecycle fields that drive
--            the approval cascade between APPROVED_PENDING_SPAWN and APPROVED.
--            Also adds the HIGH-5 policy_decision_log on the request header.
--
--            All ADD COLUMNs are nullable / defaulted so existing rows
--            remain valid. spawn_status defaults to 0 (UNSPECIFIED).
--            APPROVED_PENDING_SPAWN is a new integer value (8) on the
--            existing status column — no schema change required because
--            status is stored as INTEGER per the supplier_contracts
--            migration convention.

BEGIN;

-- ============================================================================
-- procurement_request: F3 strategy + HIGH-5 policy log
-- ============================================================================
ALTER TABLE procurement_request
  ADD COLUMN IF NOT EXISTS fulfillment_strategy INTEGER,
  ADD COLUMN IF NOT EXISTS policy_decision_log  TEXT;

CREATE INDEX IF NOT EXISTS idx_procurement_request_fulfillment_strategy
  ON procurement_request(fulfillment_strategy);

-- ============================================================================
-- procurement_request_line: F1 + F2 + RECURRING params + CRIT-3 spawn lifecycle
-- ============================================================================
ALTER TABLE procurement_request_line
  -- F1 fulfillment mode (proto enum stored as INTEGER)
  ADD COLUMN IF NOT EXISTS fulfillment_mode INTEGER,
  -- F2 spawn back-FKs (application-level FK; no DB constraint)
  ADD COLUMN IF NOT EXISTS spawned_supplier_contract_id        TEXT,
  ADD COLUMN IF NOT EXISTS spawned_purchase_order_line_item_id TEXT,
  ADD COLUMN IF NOT EXISTS spawned_expenditure_id              TEXT,
  -- RECURRING-mode parameters
  ADD COLUMN IF NOT EXISTS recurring_cycle_value INTEGER,
  ADD COLUMN IF NOT EXISTS recurring_cycle_unit  TEXT,
  ADD COLUMN IF NOT EXISTS recurring_term_value  INTEGER,
  ADD COLUMN IF NOT EXISTS recurring_term_unit   TEXT,
  -- CRIT-3 spawn lifecycle fields
  ADD COLUMN IF NOT EXISTS spawn_status          INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS spawn_error           TEXT,
  ADD COLUMN IF NOT EXISTS spawn_idempotency_key TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS spawn_attempted_at    BIGINT,
  ADD COLUMN IF NOT EXISTS spawn_completed_at    BIGINT;

CREATE INDEX IF NOT EXISTS idx_procurement_request_line_fulfillment_mode
  ON procurement_request_line(fulfillment_mode);
CREATE INDEX IF NOT EXISTS idx_procurement_request_line_spawn_status
  ON procurement_request_line(spawn_status);
CREATE INDEX IF NOT EXISTS idx_procurement_request_line_spawned_supplier_contract_id
  ON procurement_request_line(spawned_supplier_contract_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_line_spawned_purchase_order_line_item_id
  ON procurement_request_line(spawned_purchase_order_line_item_id);
CREATE INDEX IF NOT EXISTS idx_procurement_request_line_spawned_expenditure_id
  ON procurement_request_line(spawned_expenditure_id);

COMMIT;
