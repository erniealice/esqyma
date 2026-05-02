-- Migration: price_plan_entitled_occurrences (down)
-- Dialect: postgres
-- Created: 2026-05-01T12:00:00Z

BEGIN;

ALTER TABLE subscription
  DROP COLUMN IF EXISTS entitled_occurrences_override;

ALTER TABLE price_plan
  DROP COLUMN IF EXISTS entitled_occurrences;

COMMIT;
