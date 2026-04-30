-- Migration: job_origin_partial_index (down)
-- Dialect: postgres
-- Created: 2026-05-01T12:00:30Z

BEGIN;

DROP INDEX IF EXISTS idx_job_origin_active_children;

COMMIT;
