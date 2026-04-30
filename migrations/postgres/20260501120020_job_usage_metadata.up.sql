-- Migration: job_usage_metadata (up)
-- Dialect: postgres
-- Created: 2026-05-01T12:00:20Z
-- Rationale: AD_HOC visit Jobs reuse the cyclic Job tier but multiple
--            legitimate occurrences can share a calendar day. The cyclic
--            unique index `(origin_id, cycle_period_start)` would collide.
--            Resolution: composite uniqueness key = `YYYY-MM-DD#NNNN` stored
--            in cycle_period_start; companion `usage_request_date` (DATE)
--            and `usage_ordinal` (INT) columns expose the parts for sort/query.
--            Vertical-neutral naming so field-services / dental / IT-retainer /
--            equipment-service tiers all map naturally onto the same shape.
--            Codex CRIT-4 fix.
--            See docs/plan/20260501-ad-hoc-subscription-billing/plan.md §3.2.

BEGIN;

ALTER TABLE job
  ADD COLUMN IF NOT EXISTS usage_request_date DATE,
  ADD COLUMN IF NOT EXISTS usage_ordinal INTEGER;

CREATE INDEX IF NOT EXISTS idx_job_usage_request_date
  ON job (origin_id, usage_request_date)
  WHERE usage_request_date IS NOT NULL;

COMMIT;
