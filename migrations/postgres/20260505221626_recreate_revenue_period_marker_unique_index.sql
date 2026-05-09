-- atlas:txmode none

CREATE UNIQUE INDEX CONCURRENTLY idx_revenue_subscription_period_unique
  ON public.revenue USING btree (subscription_id, period_marker)
  WHERE status <> 'cancelled'::text
    AND subscription_id IS NOT NULL
    AND period_marker IS NOT NULL;
