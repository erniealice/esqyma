-- Migration: supplier_dependent (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:06:00Z
-- Rationale: Drops SupplierDependent entity.

BEGIN;

DROP INDEX IF EXISTS idx_supplier_dependent_workspace_active;
DROP INDEX IF EXISTS idx_supplier_dependent_supplier_id;
DROP INDEX IF EXISTS idx_supplier_dependent_workspace_id;
DROP TABLE IF EXISTS supplier_dependent;

COMMIT;
