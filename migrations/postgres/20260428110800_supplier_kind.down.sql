-- Migration: supplier_kind (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:08:00Z
-- Rationale: Drops supplier kind/position/department columns.

BEGIN;

DROP INDEX IF EXISTS idx_supplier_kind;

ALTER TABLE supplier DROP COLUMN IF EXISTS department;
ALTER TABLE supplier DROP COLUMN IF EXISTS position;
ALTER TABLE supplier DROP COLUMN IF EXISTS kind;

COMMIT;
