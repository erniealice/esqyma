BEGIN;
ALTER TABLE supplier_contract_line ADD COLUMN IF NOT EXISTS kind TEXT;
CREATE INDEX IF NOT EXISTS idx_supplier_contract_line_kind ON supplier_contract_line(kind);
COMMIT;
