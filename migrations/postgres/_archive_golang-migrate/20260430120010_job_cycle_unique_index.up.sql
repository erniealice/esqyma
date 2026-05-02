-- Migration: job_cycle_unique_index (up)
-- Dialect: postgres
-- Created: 2026-04-30T12:00:10Z
-- Rationale: Ensures idempotency for MaterializeCycleJobsForSubscription —
--            no two cycle Jobs may share the same (origin_id,
--            cycle_period_start) for SUBSCRIPTION-origin child Jobs. Partial
--            index scoped to subscription-origin children with non-NULL
--            cycle_period_start so engagement (shell) Jobs and non-cyclic
--            Jobs are unaffected.
--            See docs/plan/20260430-cyclic-subscription-jobs/plan.md §3.

BEGIN;

CREATE UNIQUE INDEX IF NOT EXISTS idx_job_subscription_cycle_period_unique
  ON job (origin_id, cycle_period_start)
  WHERE origin_type = 'SUBSCRIPTION'
    AND parent_job_id IS NOT NULL
    AND cycle_period_start IS NOT NULL;

COMMIT;
