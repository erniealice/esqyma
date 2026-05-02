-- Migration: rate_band (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:02:00Z
-- Rationale: Introduces RateBand — one bracket within a RateTable.

BEGIN;

CREATE TABLE IF NOT EXISTS rate_band (
  id                      TEXT PRIMARY KEY,
  rate_table_id           TEXT NOT NULL REFERENCES rate_table(id),

  -- Bracket window (centavos)
  lower_bound_centavos    BIGINT NOT NULL DEFAULT 0,
  upper_bound_centavos    BIGINT,

  -- Rate calculation
  rate_type               TEXT NOT NULL DEFAULT '',
  rate_basis_points       INTEGER NOT NULL DEFAULT 0,
  fixed_amount_centavos   BIGINT NOT NULL DEFAULT 0,
  formula_expression      TEXT,

  -- Display ordering
  ordinal                 INTEGER NOT NULL DEFAULT 0,

  -- Free-form metadata (JSON-encoded)
  metadata                TEXT,

  -- Audit
  active                  BOOLEAN NOT NULL DEFAULT true,
  date_created            TIMESTAMPTZ DEFAULT NOW(),
  date_modified           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rate_band_rate_table_id          ON rate_band(rate_table_id);
CREATE INDEX IF NOT EXISTS idx_rate_band_rate_table_id_ordinal  ON rate_band(rate_table_id, ordinal);

COMMIT;
