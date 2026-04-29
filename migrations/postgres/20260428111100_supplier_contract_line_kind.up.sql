-- Migration: supplier_contract_line_kind (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:11:00Z
-- Rationale: Adds kind discriminator to supplier_contract_line so payroll
--            templates can carry per-line classifiers (BASIC | OT_PREMIUM |
--            STAT_DEDUCTION | etc.) alongside vendor goods/service lines.

BEGIN;

ALTER TABLE supplier_contract_line ADD COLUMN IF NOT EXISTS kind TEXT;

CREATE INDEX IF NOT EXISTS idx_supplier_contract_line_kind ON supplier_contract_line(kind);

COMMIT;
