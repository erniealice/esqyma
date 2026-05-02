-- Migration: supplier_contract_employment_fields (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:10:00Z
-- Rationale: Drops supplier_contract employment-class facet columns.

BEGIN;

ALTER TABLE supplier_contract DROP COLUMN IF EXISTS department;
ALTER TABLE supplier_contract DROP COLUMN IF EXISTS position;
ALTER TABLE supplier_contract DROP COLUMN IF EXISTS employment_class;
ALTER TABLE supplier_contract DROP COLUMN IF EXISTS pay_frequency;

COMMIT;
