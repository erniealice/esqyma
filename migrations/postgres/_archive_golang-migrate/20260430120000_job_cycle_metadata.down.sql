-- Migration: job_cycle_metadata (down)
-- Dialect: postgres
-- Created: 2026-04-30T12:00:00Z

BEGIN;

ALTER TABLE job DROP COLUMN IF EXISTS cycle_period_end;
ALTER TABLE job DROP COLUMN IF EXISTS cycle_period_start;
ALTER TABLE job DROP COLUMN IF EXISTS cycle_index;

COMMIT;
