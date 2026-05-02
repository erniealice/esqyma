BEGIN;
ALTER TABLE price_plan
  ADD COLUMN IF NOT EXISTS entitled_occurrences INTEGER;
ALTER TABLE subscription
  ADD COLUMN IF NOT EXISTS entitled_occurrences_override INTEGER;
COMMIT;
