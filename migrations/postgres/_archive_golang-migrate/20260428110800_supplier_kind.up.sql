-- Migration: supplier_kind (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:08:00Z
-- Rationale: Adds employee-facet columns to supplier (kind discriminator,
--            position, department) for the universal Supplier-as-counterparty model.

BEGIN;

ALTER TABLE supplier ADD COLUMN IF NOT EXISTS kind       TEXT NOT NULL DEFAULT 'vendor';
ALTER TABLE supplier ADD COLUMN IF NOT EXISTS position   TEXT;
ALTER TABLE supplier ADD COLUMN IF NOT EXISTS department TEXT;

CREATE INDEX IF NOT EXISTS idx_supplier_kind ON supplier(kind);

COMMIT;
