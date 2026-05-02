BEGIN;
-- btree_gist is required to mix `=` predicates on TEXT supplier_contract_id
-- with the `&&` range predicate inside the same EXCLUDE USING gist clause.
CREATE EXTENSION IF NOT EXISTS btree_gist;
-- ============================================================================
-- Table: supplier_contract_price_schedule
-- Date-windowed pricing layer scoped to a single supplier_contract. Mirrors
-- subscription.PriceSchedule but contract-scoped.
-- ============================================================================
CREATE TABLE IF NOT EXISTS supplier_contract_price_schedule (
  id                      TEXT PRIMARY KEY,
  workspace_id            TEXT NOT NULL REFERENCES workspace(id),

  -- Audit
  date_created            BIGINT,
  date_created_string     TEXT,
  date_modified           BIGINT,
  date_modified_string    TEXT,
  active                  BOOLEAN NOT NULL DEFAULT true,
  internal_id             TEXT NOT NULL UNIQUE,

  -- Parent contract
  supplier_contract_id    TEXT NOT NULL REFERENCES supplier_contract(id),

  -- Identity
  name                    TEXT NOT NULL,
  description             TEXT,

  -- Validity window — UTC; half-open [date_time_start, date_time_end)
  date_time_start         TIMESTAMPTZ NOT NULL,
  date_time_end           TIMESTAMPTZ,

  -- Scoping
  location_id             TEXT REFERENCES location(id),
  currency                TEXT NOT NULL DEFAULT '',

  -- Lifecycle (proto enum stored as integer per the supplier_contracts
  -- migration convention)
  status                  INTEGER NOT NULL DEFAULT 0,
  sequence_number         INTEGER NOT NULL DEFAULT 1,

  -- Notes
  notes                   TEXT,
  metadata                JSONB
);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_price_schedule_workspace_id
  ON supplier_contract_price_schedule(workspace_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_price_schedule_supplier_contract_id
  ON supplier_contract_price_schedule(supplier_contract_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_price_schedule_status
  ON supplier_contract_price_schedule(status);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_price_schedule_location_id
  ON supplier_contract_price_schedule(location_id);
-- CRIT-1: GIST exclusion constraint — no two non-cancelled schedules on the
-- same contract may overlap on their half-open windows. status=4 = CANCELLED.
ALTER TABLE supplier_contract_price_schedule
  ADD CONSTRAINT supplier_contract_price_schedule_no_overlap
  EXCLUDE USING gist (
    supplier_contract_id WITH =,
    tstzrange(date_time_start, COALESCE(date_time_end, 'infinity'::timestamptz), '[)') WITH &&
  ) WHERE (status <> 4);
-- CRIT-2: at most one OPEN-ENDED non-cancelled row per contract.
CREATE UNIQUE INDEX IF NOT EXISTS supplier_contract_price_schedule_one_open_ended_per_contract
  ON supplier_contract_price_schedule (supplier_contract_id)
  WHERE date_time_end IS NULL AND status <> 4;
-- At most one ACTIVE schedule per contract at any moment. status=2 = ACTIVE.
CREATE UNIQUE INDEX IF NOT EXISTS supplier_contract_price_schedule_one_active_per_contract
  ON supplier_contract_price_schedule (supplier_contract_id)
  WHERE status = 2;
-- ============================================================================
-- Table: supplier_contract_price_schedule_line
-- Per-line, per-window pricing override. One row per
-- (SupplierContractLine × SupplierContractPriceSchedule).
-- ============================================================================
CREATE TABLE IF NOT EXISTS supplier_contract_price_schedule_line (
  id                                   TEXT PRIMARY KEY,
  workspace_id                         TEXT NOT NULL REFERENCES workspace(id),

  -- Audit
  date_created                         BIGINT,
  date_created_string                  TEXT,
  date_modified                        BIGINT,
  date_modified_string                 TEXT,
  active                               BOOLEAN NOT NULL DEFAULT true,

  -- Parents
  supplier_contract_price_schedule_id  TEXT NOT NULL REFERENCES supplier_contract_price_schedule(id),
  supplier_contract_line_id            TEXT NOT NULL REFERENCES supplier_contract_line(id),

  -- Money (centavos)
  currency                             TEXT NOT NULL DEFAULT '',
  unit_price                           BIGINT NOT NULL DEFAULT 0,
  minimum_amount                       BIGINT,
  quantity                             DOUBLE PRECISION,

  -- Cycle override
  cycle_value_override                 INTEGER,
  cycle_unit_override                  TEXT,

  -- Notes
  notes                                TEXT,
  metadata                             JSONB
);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_price_schedule_line_workspace_id
  ON supplier_contract_price_schedule_line(workspace_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_price_schedule_line_schedule_id
  ON supplier_contract_price_schedule_line(supplier_contract_price_schedule_id);
CREATE INDEX IF NOT EXISTS idx_supplier_contract_price_schedule_line_contract_line_id
  ON supplier_contract_price_schedule_line(supplier_contract_line_id);
-- One row per (schedule, contract_line) — the resolver always reads at most
-- one priced row for a given window/line tuple.
CREATE UNIQUE INDEX IF NOT EXISTS uq_supplier_contract_price_schedule_line_schedule_contract_line
  ON supplier_contract_price_schedule_line(supplier_contract_price_schedule_id, supplier_contract_line_id);
-- ============================================================================
-- FK back-edge: supplier_contract_line.supplier_contract_price_schedule_line_id
-- (proto field 24). Application-level FK; indexed for the recurrence engine
-- shortcut path. No DB constraint per the supplier-commitment line-FK
-- convention from 20260430130000.
-- ============================================================================
ALTER TABLE supplier_contract_line
  ADD COLUMN IF NOT EXISTS supplier_contract_price_schedule_line_id TEXT;
CREATE INDEX IF NOT EXISTS idx_supplier_contract_line_supplier_contract_price_schedule_line_id
  ON supplier_contract_line(supplier_contract_price_schedule_line_id);
COMMIT;
