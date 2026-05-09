DROP INDEX IF EXISTS public.idx_revenue_subscription_period_unique;

ALTER TABLE public.revenue
  DROP COLUMN IF EXISTS period_marker;

ALTER TABLE public.revenue
  ADD COLUMN period_marker text GENERATED ALWAYS AS (
    CASE
      WHEN notes IS NULL THEN NULL::text
      WHEN notes ~ 'Period: '::text THEN substring(notes FROM 'Period: [^\n]+'::text)
      ELSE NULL::text
    END
  ) STORED;
