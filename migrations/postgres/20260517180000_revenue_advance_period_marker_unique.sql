-- Plan B Phase 2 follow-up — DB-level idempotency for the advance-amortization
-- Revenue path (selling-side).
--
-- Codex P0 review finding (docs/plan/20260517-advance-cash-events/codex-review-v3.md):
--   `revenue` has a partial unique index `(subscription_id, period_marker)`
--   gated on `subscription_id IS NOT NULL`. Advance-amortization rows set
--   `advance_collection_id` and leave `subscription_id` NULL, so they get NO
--   uniqueness protection. Concurrent `AmortizeAdvanceCollection` runs can
--   double-insert and double-decrement the advance counter.
--
-- This migration adds the mirror partial unique index for the advance path:
--   `(advance_collection_id, period_marker) WHERE advance_collection_id IS NOT NULL
--    AND period_marker IS NOT NULL AND status <> 'cancelled'`.
--
-- The shape mirrors `idx_revenue_subscription_period_unique` (Plan A
-- 20260505221626) and the use-case adapter is taught to translate violations
-- into the same `ErrPeriodAlreadyInvoiced` sentinel + a SKIPPED outcome.
--
-- `idx_revenue_advance_collection_id` already exists from
-- 20260517150000_advance_cash_events.sql (line 132-134), so no extra
-- non-unique index is added here.
--
-- All statements idempotent (`CREATE UNIQUE INDEX IF NOT EXISTS`).

SET search_path TO public;

CREATE UNIQUE INDEX IF NOT EXISTS idx_revenue_advance_period_unique
    ON revenue USING btree (advance_collection_id, period_marker)
    WHERE advance_collection_id IS NOT NULL
      AND period_marker IS NOT NULL
      AND status <> 'cancelled';
