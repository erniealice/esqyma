BEGIN;
CREATE TABLE IF NOT EXISTS billing_event (
  id                      TEXT PRIMARY KEY,

  -- Audit
  date_created            BIGINT,
  date_created_string     TEXT,
  date_modified           BIGINT,
  date_modified_string    TEXT,
  active                  BOOLEAN NOT NULL DEFAULT true,

  -- Required parent
  subscription_id         TEXT NOT NULL REFERENCES subscription(id),

  -- Operational links (all nullable to support no-Job retainers)
  job_id                  TEXT REFERENCES job(id),
  job_phase_id            TEXT REFERENCES job_phase(id),
  job_template_phase_id   TEXT REFERENCES job_template_phase(id),
  product_price_plan_id   TEXT REFERENCES product_price_plan(id),

  -- Money (centavos)
  billable_amount         BIGINT NOT NULL DEFAULT 0,
  billing_currency        TEXT NOT NULL DEFAULT '',

  -- Lifecycle (stored as integer proto enum tags)
  status                  INTEGER NOT NULL DEFAULT 0,
  trigger                 INTEGER NOT NULL DEFAULT 0,

  -- Outcome
  revenue_id              TEXT REFERENCES revenue(id),
  triggered_at            BIGINT,
  billed_at               BIGINT,
  reason                  TEXT,

  -- Partial-billing chain
  parent_event_id         TEXT REFERENCES billing_event(id),
  sequence_label          TEXT
);
CREATE INDEX IF NOT EXISTS idx_billing_event_subscription_id       ON billing_event(subscription_id);
CREATE INDEX IF NOT EXISTS idx_billing_event_job_id                ON billing_event(job_id);
CREATE INDEX IF NOT EXISTS idx_billing_event_job_phase_id          ON billing_event(job_phase_id);
CREATE INDEX IF NOT EXISTS idx_billing_event_job_template_phase_id ON billing_event(job_template_phase_id);
CREATE INDEX IF NOT EXISTS idx_billing_event_product_price_plan_id ON billing_event(product_price_plan_id);
CREATE INDEX IF NOT EXISTS idx_billing_event_revenue_id            ON billing_event(revenue_id);
CREATE INDEX IF NOT EXISTS idx_billing_event_status                ON billing_event(status);
COMMIT;
