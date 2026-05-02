-- Migration: job_cycle_unique_index (down)
-- Dialect: postgres
-- Created: 2026-04-30T12:00:10Z

BEGIN;

DROP INDEX IF EXISTS idx_job_subscription_cycle_period_unique;

COMMIT;
