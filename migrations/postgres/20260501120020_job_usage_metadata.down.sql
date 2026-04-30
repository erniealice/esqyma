-- Migration: job_usage_metadata (down)
-- Dialect: postgres
-- Created: 2026-05-01T12:00:20Z

BEGIN;

DROP INDEX IF EXISTS idx_job_usage_request_date;

ALTER TABLE job
  DROP COLUMN IF EXISTS usage_ordinal,
  DROP COLUMN IF EXISTS usage_request_date;

COMMIT;
