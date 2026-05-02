-- Migration: plan_visits_per_cycle (up)
-- Dialect: postgres
-- Created: 2026-04-30T12:00:20Z
-- Rationale: Adds Plan.visits_per_cycle (proto field 15) to support
--            multi-visit cyclic subscriptions (e.g., Pro Cleaning Biweekly
--            billed Monthly = 2 visits per cycle). NULL is treated
--            semantically as 1 by the spawn algorithm.
--            See docs/plan/20260430-cyclic-subscription-jobs/plan.md §2.4.

BEGIN;

ALTER TABLE plan ADD COLUMN IF NOT EXISTS visits_per_cycle INTEGER;

COMMIT;
