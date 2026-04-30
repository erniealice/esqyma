-- Migration: job_cycle_metadata (up)
-- Dialect: postgres
-- Created: 2026-04-30T12:00:00Z
-- Rationale: Adds cycle metadata fields to the job table for cyclic
--            subscriptions. cycle_index (proto field 53), cycle_period_start
--            (54), and cycle_period_end (55) are populated on cycle-instance
--            Jobs spawned by MaterializeCycleJobsForSubscription. NULL on
--            engagement (shell) Jobs and on lifetime non-cyclic Jobs.
--            See docs/plan/20260430-cyclic-subscription-jobs/plan.md §2.1.

BEGIN;

ALTER TABLE job ADD COLUMN IF NOT EXISTS cycle_index INTEGER;
ALTER TABLE job ADD COLUMN IF NOT EXISTS cycle_period_start TEXT;
ALTER TABLE job ADD COLUMN IF NOT EXISTS cycle_period_end TEXT;

COMMIT;
