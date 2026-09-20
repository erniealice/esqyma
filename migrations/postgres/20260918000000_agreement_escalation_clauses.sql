-- Record reusable price-plan escalation defaults and independent agreement
-- clauses. All columns are nullable so existing rows remain "not recorded".
ALTER TABLE public.price_plan
  ADD COLUMN default_escalation_mode text NULL,
  ADD COLUMN default_escalation_scope text NULL,
  ADD COLUMN default_escalation_rate_bps integer NULL,
  ADD COLUMN default_escalation_first_after_months integer NULL,
  ADD COLUMN default_escalation_every_months integer NULL,
  ADD CONSTRAINT price_plan_escalation_clause_check CHECK (COALESCE((
    (default_escalation_mode IS NULL
      AND default_escalation_scope IS NULL
      AND default_escalation_rate_bps IS NULL
      AND default_escalation_first_after_months IS NULL
      AND default_escalation_every_months IS NULL)
    OR
    (default_escalation_mode = 'none'
      AND default_escalation_scope IS NULL
      AND default_escalation_rate_bps IS NULL
      AND default_escalation_first_after_months IS NULL
      AND default_escalation_every_months IS NULL)
    OR
    (default_escalation_mode = 'fixed_percentage'
      AND default_escalation_rate_bps BETWEEN 1 AND 10000
      AND default_escalation_scope = 'within_agreement'
      AND default_escalation_first_after_months BETWEEN 1 AND 1200
      AND default_escalation_every_months BETWEEN 1 AND 1200)
    OR
    (default_escalation_mode = 'fixed_percentage'
      AND default_escalation_rate_bps BETWEEN 1 AND 10000
      AND default_escalation_scope = 'on_renewal'
      AND default_escalation_first_after_months IS NULL
      AND default_escalation_every_months IS NULL)
  ), false)) NOT VALID;

ALTER TABLE public.price_plan
  VALIDATE CONSTRAINT price_plan_escalation_clause_check;

ALTER TABLE public.subscription
  ADD COLUMN escalation_mode text NULL,
  ADD COLUMN escalation_scope text NULL,
  ADD COLUMN escalation_rate_bps integer NULL,
  ADD COLUMN escalation_first_after_months integer NULL,
  ADD COLUMN escalation_every_months integer NULL,
  ADD CONSTRAINT subscription_escalation_clause_check CHECK (COALESCE((
    (escalation_mode IS NULL
      AND escalation_scope IS NULL
      AND escalation_rate_bps IS NULL
      AND escalation_first_after_months IS NULL
      AND escalation_every_months IS NULL)
    OR
    (escalation_mode = 'none'
      AND escalation_scope IS NULL
      AND escalation_rate_bps IS NULL
      AND escalation_first_after_months IS NULL
      AND escalation_every_months IS NULL)
    OR
    (escalation_mode = 'fixed_percentage'
      AND escalation_rate_bps BETWEEN 1 AND 10000
      AND escalation_scope = 'within_agreement'
      AND escalation_first_after_months BETWEEN 1 AND 1200
      AND escalation_every_months BETWEEN 1 AND 1200)
    OR
    (escalation_mode = 'fixed_percentage'
      AND escalation_rate_bps BETWEEN 1 AND 10000
      AND escalation_scope = 'on_renewal'
      AND escalation_first_after_months IS NULL
      AND escalation_every_months IS NULL)
  ), false)) NOT VALID;

ALTER TABLE public.subscription
  VALIDATE CONSTRAINT subscription_escalation_clause_check;
