-- 20260428100000_revenue_period_marker_unique
--
-- Add a generated `period_marker` column on `revenue` that extracts the
-- "Period: ..." prefix from `notes` (the canonical period encoding written
-- by RecognizeRevenueFromSubscriptionUseCase / buildPeriodMarker), then a
-- partial unique index that prevents two non-cancelled invoices from
-- claiming the same (subscription_id, period) pair.
--
-- v1 stores period bounds in `notes`; this migration is the database guard
-- against the concurrent-Generate race documented in
-- docs/plan/20260425-subscription-revenue-recognition/scenarios.md (E-12).
--
-- Requires PostgreSQL 12+ for STORED generated columns. Production is on 16.

BEGIN;

ALTER TABLE revenue
  ADD COLUMN period_marker TEXT GENERATED ALWAYS AS (
    CASE
      WHEN notes IS NULL THEN NULL
      WHEN notes ~ 'Period: ' THEN substring(notes FROM 'Period: [^\n]+')
      ELSE NULL
    END
  ) STORED;

CREATE UNIQUE INDEX idx_revenue_subscription_period_unique
  ON revenue (subscription_id, period_marker)
  WHERE status != 'cancelled'
    AND subscription_id IS NOT NULL
    AND period_marker IS NOT NULL;

COMMIT;
