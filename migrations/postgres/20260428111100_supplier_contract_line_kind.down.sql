-- Migration: supplier_contract_line_kind (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:11:00Z
-- Rationale: Drops supplier_contract_line.kind column.

BEGIN;

DROP INDEX IF EXISTS idx_supplier_contract_line_kind;

ALTER TABLE supplier_contract_line DROP COLUMN IF EXISTS kind;

COMMIT;
