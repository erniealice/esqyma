-- Migration: supplier_dependent (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:06:00Z
-- Rationale: Introduces SupplierDependent — kind-agnostic relation table for
--            spouses, children, guarantors, beneficial owners, etc. For
--            Supplier(kind='employee') it carries PH dependent metadata.

BEGIN;

CREATE TABLE IF NOT EXISTS supplier_dependent (
  id                      TEXT PRIMARY KEY,
  workspace_id            TEXT NOT NULL REFERENCES workspace(id),
  supplier_id             TEXT NOT NULL REFERENCES supplier(id),

  full_name               TEXT NOT NULL DEFAULT '',
  relationship            TEXT NOT NULL DEFAULT '',
  date_of_birth           TEXT,

  -- Employee-specific (PH)
  philhealth_enrolled     BOOLEAN NOT NULL DEFAULT false,
  bir_dependent           BOOLEAN NOT NULL DEFAULT false,

  metadata                TEXT,

  -- Audit
  active                  BOOLEAN NOT NULL DEFAULT true,
  date_created            TIMESTAMPTZ DEFAULT NOW(),
  date_modified           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_supplier_dependent_workspace_id          ON supplier_dependent(workspace_id);
CREATE INDEX IF NOT EXISTS idx_supplier_dependent_supplier_id           ON supplier_dependent(supplier_id);
CREATE INDEX IF NOT EXISTS idx_supplier_dependent_workspace_active      ON supplier_dependent(workspace_id, active);

COMMIT;
