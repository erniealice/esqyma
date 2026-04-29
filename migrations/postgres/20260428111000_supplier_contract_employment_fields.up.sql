-- Migration: supplier_contract_employment_fields (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:10:00Z
-- Rationale: Extends supplier_contract with employment-class facet columns so it
--            doubles as the EmploymentContract for Supplier(kind='employee').
--            kind column already exists from supplier_contracts migration; no
--            enum constraint — just text, extending the value space.

BEGIN;

ALTER TABLE supplier_contract ADD COLUMN IF NOT EXISTS pay_frequency    TEXT;
ALTER TABLE supplier_contract ADD COLUMN IF NOT EXISTS employment_class TEXT;
ALTER TABLE supplier_contract ADD COLUMN IF NOT EXISTS position         TEXT;
ALTER TABLE supplier_contract ADD COLUMN IF NOT EXISTS department       TEXT;

COMMIT;
