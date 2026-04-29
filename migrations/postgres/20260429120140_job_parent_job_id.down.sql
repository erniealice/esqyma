-- Migration: job_parent_job_id (down)
-- Dialect: postgres
-- Created: 2026-04-29T12:01:40Z
BEGIN;

DROP INDEX IF EXISTS idx_job_parent_job_id;
ALTER TABLE job DROP COLUMN IF EXISTS parent_job_id;

COMMIT;
