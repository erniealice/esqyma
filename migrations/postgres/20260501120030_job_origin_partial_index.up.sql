-- Migration: job_origin_partial_index (up)
-- Dialect: postgres
-- Created: 2026-05-01T12:00:30Z
-- Rationale: AD_HOC entitlement counters do `COUNT(*) FROM job WHERE origin_id
--            = $sub_id AND parent_job_id IS NOT NULL AND active = true`. The
--            current Job proto indexes only `parent_job_id`, so a 1000-row
--            list page issues 1000 individual COUNTs.
--            Adding a partial composite index lets list-page builders batch
--            with a single `GROUP BY origin_id` query.
--            Codex MAJ-2 fix.
--            See docs/plan/20260501-ad-hoc-subscription-billing/plan.md §2.4.

BEGIN;

CREATE INDEX IF NOT EXISTS idx_job_origin_active_children
  ON job (origin_type, origin_id)
  WHERE parent_job_id IS NOT NULL AND active = true;

COMMIT;
