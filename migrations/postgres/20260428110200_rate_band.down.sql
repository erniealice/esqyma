-- Migration: rate_band (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:02:00Z
-- Rationale: Drops RateBand entity.

BEGIN;

DROP INDEX IF EXISTS idx_rate_band_rate_table_id_ordinal;
DROP INDEX IF EXISTS idx_rate_band_rate_table_id;
DROP TABLE IF EXISTS rate_band;

COMMIT;
