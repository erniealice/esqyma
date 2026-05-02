-- Migration: rate_table (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:01:00Z
-- Rationale: Drops RateTable entity.

BEGIN;

DROP INDEX IF EXISTS idx_rate_table_region_kind_status;
DROP INDEX IF EXISTS idx_rate_table_effective_from;
DROP INDEX IF EXISTS idx_rate_table_workspace_id;
DROP TABLE IF EXISTS rate_table;

COMMIT;
