BEGIN;

DROP INDEX IF EXISTS idx_revenue_subscription_period_unique;
ALTER TABLE revenue DROP COLUMN IF EXISTS period_marker;

COMMIT;
