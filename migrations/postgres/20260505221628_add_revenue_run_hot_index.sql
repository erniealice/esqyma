-- atlas:txmode none

CREATE INDEX CONCURRENTLY idx_revenue_run_id
    ON public.revenue USING btree (run_id)
    WHERE run_id IS NOT NULL;
