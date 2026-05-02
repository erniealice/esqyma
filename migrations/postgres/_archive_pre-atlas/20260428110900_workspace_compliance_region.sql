BEGIN;
ALTER TABLE workspace ADD COLUMN IF NOT EXISTS compliance_region TEXT;
UPDATE workspace SET compliance_region = 'PH' WHERE compliance_region IS NULL;
COMMIT;
