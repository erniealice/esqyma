-- Migration: supplier_lifecycle_event (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:07:00Z
-- Rationale: Introduces SupplierLifecycleEvent — append-only audit-log row for
--            status changes on a supplier counterparty. UI shows reverse-
--            chronological timeline. No date_modified — append-only entity.

BEGIN;

CREATE TABLE IF NOT EXISTS supplier_lifecycle_event (
  id                      TEXT PRIMARY KEY,
  workspace_id            TEXT NOT NULL REFERENCES workspace(id),
  supplier_id             TEXT NOT NULL REFERENCES supplier(id),

  -- Discriminator
  kind                    TEXT NOT NULL DEFAULT '',
  category                TEXT NOT NULL DEFAULT '',

  event_date              TEXT NOT NULL,
  supplier_contract_id    TEXT,
  actor_user_id           TEXT,
  reason                  TEXT,
  metadata                TEXT,

  -- Audit (creation only — append-only)
  active                  BOOLEAN NOT NULL DEFAULT true,
  date_created            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_supplier_lifecycle_event_workspace_id        ON supplier_lifecycle_event(workspace_id);
CREATE INDEX IF NOT EXISTS idx_supplier_lifecycle_event_supplier_event_desc ON supplier_lifecycle_event(supplier_id, event_date DESC);
CREATE INDEX IF NOT EXISTS idx_supplier_lifecycle_event_ws_category_kind   ON supplier_lifecycle_event(workspace_id, category, kind);

COMMIT;
