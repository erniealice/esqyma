BEGIN;
ALTER TABLE supplier_contract ADD COLUMN IF NOT EXISTS pay_frequency    TEXT;
ALTER TABLE supplier_contract ADD COLUMN IF NOT EXISTS employment_class TEXT;
ALTER TABLE supplier_contract ADD COLUMN IF NOT EXISTS position         TEXT;
ALTER TABLE supplier_contract ADD COLUMN IF NOT EXISTS department       TEXT;
COMMIT;
