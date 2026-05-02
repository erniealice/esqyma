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
