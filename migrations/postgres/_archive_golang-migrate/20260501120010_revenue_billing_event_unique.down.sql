-- Migration: revenue_billing_event_unique (down)
-- Dialect: postgres
-- Created: 2026-05-01T12:00:10Z

BEGIN;

DROP INDEX IF EXISTS uniq_revenue_billing_event_id_active;

COMMIT;
