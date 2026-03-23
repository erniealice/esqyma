-- Migration: 20260322_fulfillment.sql
-- Creates fulfillment domain tables: fulfillment, fulfillment_item, fulfillment_status_event, fulfillment_return, fulfillment_return_item

-- fulfillment: the top-level fulfillment record (1:N from revenue)
CREATE TABLE IF NOT EXISTS fulfillment (
  id                VARCHAR(64)  PRIMARY KEY,
  workspace_id      VARCHAR(64)  NOT NULL,
  revenue_id        VARCHAR(64)  NOT NULL,
  supplier_id       VARCHAR(64),
  fulfillment_method VARCHAR(32) NOT NULL DEFAULT 'physical',
  status            VARCHAR(32)  NOT NULL DEFAULT 'PENDING',
  provider_status   TEXT         NOT NULL DEFAULT '',
  provider_reference VARCHAR(128) NOT NULL DEFAULT '',
  delivery_cost     NUMERIC(12,4) NOT NULL DEFAULT 0,
  currency          VARCHAR(8)   NOT NULL DEFAULT '',
  expenditure_id    VARCHAR(64),
  scheduled_at      TIMESTAMPTZ,
  delivered_at      TIMESTAMPTZ,
  notes             TEXT         NOT NULL DEFAULT '',
  metadata          JSONB        NOT NULL DEFAULT '{}',
  date_created      BIGINT,
  date_modified     BIGINT,
  active            BOOLEAN      NOT NULL DEFAULT true,
  created_by        VARCHAR(64)  NOT NULL DEFAULT ''
);

-- fulfillment_item: per-product quantity tracking
CREATE TABLE IF NOT EXISTS fulfillment_item (
  id                    VARCHAR(64)  PRIMARY KEY,
  fulfillment_id        VARCHAR(64)  NOT NULL REFERENCES fulfillment(id) ON DELETE CASCADE,
  revenue_line_item_id  VARCHAR(64)  NOT NULL,
  product_id            VARCHAR(64),
  fulfillment_method    VARCHAR(32)  NOT NULL DEFAULT 'physical',
  source_type           VARCHAR(32),
  source_id             VARCHAR(64),
  quantity_ordered      DOUBLE PRECISION NOT NULL DEFAULT 0,
  quantity_delivered     DOUBLE PRECISION NOT NULL DEFAULT 0,
  quantity_remaining    DOUBLE PRECISION GENERATED ALWAYS AS (quantity_ordered - quantity_delivered) STORED,
  status                VARCHAR(32)  NOT NULL DEFAULT 'PENDING',
  notes                 TEXT         NOT NULL DEFAULT '',
  date_created          BIGINT
);

-- fulfillment_status_event: append-only event log (no UPDATE, no DELETE)
CREATE TABLE IF NOT EXISTS fulfillment_status_event (
  id                BIGSERIAL    PRIMARY KEY,
  fulfillment_id    VARCHAR(64)  NOT NULL REFERENCES fulfillment(id) ON DELETE CASCADE,
  from_status       VARCHAR(32),
  to_status         VARCHAR(32)  NOT NULL,
  provider_status   TEXT         NOT NULL DEFAULT '',
  provider_reference VARCHAR(128) NOT NULL DEFAULT '',
  triggered_by_id   VARCHAR(64),
  reason            TEXT         NOT NULL DEFAULT '',
  occurred_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- fulfillment_return: post-delivery return tracking
CREATE TABLE IF NOT EXISTS fulfillment_return (
  id                VARCHAR(64)  PRIMARY KEY,
  fulfillment_id    VARCHAR(64)  NOT NULL REFERENCES fulfillment(id) ON DELETE CASCADE,
  reason            TEXT         NOT NULL DEFAULT '',
  status            VARCHAR(32)  NOT NULL DEFAULT 'PENDING',
  refund_amount     NUMERIC(12,4),
  currency          VARCHAR(8)   NOT NULL DEFAULT '',
  processed_by_id   VARCHAR(64),
  notes             TEXT         NOT NULL DEFAULT '',
  metadata          JSONB        NOT NULL DEFAULT '{}',
  date_created      BIGINT,
  completed_at      TIMESTAMPTZ,
  active            BOOLEAN      NOT NULL DEFAULT true
);

-- fulfillment_return_item: per-item return detail
CREATE TABLE IF NOT EXISTS fulfillment_return_item (
  id                    VARCHAR(64)  PRIMARY KEY,
  fulfillment_return_id VARCHAR(64)  NOT NULL REFERENCES fulfillment_return(id) ON DELETE CASCADE,
  fulfillment_item_id   VARCHAR(64)  NOT NULL REFERENCES fulfillment_item(id),
  quantity_returned     DOUBLE PRECISION NOT NULL DEFAULT 0,
  reason                TEXT         NOT NULL DEFAULT '',
  date_created          BIGINT
);

-- Indexes for fulfillment
CREATE INDEX IF NOT EXISTS idx_fulfillment_workspace_id ON fulfillment(workspace_id);
CREATE INDEX IF NOT EXISTS idx_fulfillment_revenue_id ON fulfillment(revenue_id);
CREATE INDEX IF NOT EXISTS idx_fulfillment_status ON fulfillment(status);
CREATE INDEX IF NOT EXISTS idx_fulfillment_supplier_id ON fulfillment(supplier_id) WHERE supplier_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_fulfillment_scheduled_at ON fulfillment(scheduled_at) WHERE scheduled_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_fulfillment_active ON fulfillment(active) WHERE active = false;

-- Indexes for fulfillment_item
CREATE INDEX IF NOT EXISTS idx_fulfillment_item_fulfillment_id ON fulfillment_item(fulfillment_id);
CREATE INDEX IF NOT EXISTS idx_fulfillment_item_product_id ON fulfillment_item(product_id) WHERE product_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_fulfillment_item_source ON fulfillment_item(source_type, source_id) WHERE source_type IS NOT NULL;

-- Indexes for fulfillment_status_event
CREATE INDEX IF NOT EXISTS idx_fulfillment_status_event_fulfillment_id ON fulfillment_status_event(fulfillment_id);
CREATE INDEX IF NOT EXISTS idx_fulfillment_status_event_occurred_at ON fulfillment_status_event(occurred_at DESC);

-- Indexes for fulfillment_return
CREATE INDEX IF NOT EXISTS idx_fulfillment_return_fulfillment_id ON fulfillment_return(fulfillment_id);

-- Indexes for fulfillment_return_item
CREATE INDEX IF NOT EXISTS idx_fulfillment_return_item_return_id ON fulfillment_return_item(fulfillment_return_id);
