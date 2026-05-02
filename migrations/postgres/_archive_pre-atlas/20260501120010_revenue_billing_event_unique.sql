BEGIN;
CREATE UNIQUE INDEX IF NOT EXISTS uniq_revenue_billing_event_id_active
  ON revenue (billing_event_id)
  WHERE billing_event_id IS NOT NULL
    AND status <> 'cancelled';
COMMIT;
