-- Migration: revenue_billing_event_unique (up)
-- Dialect: postgres
-- Created: 2026-05-01T12:00:10Z
-- Rationale: DB-enforced idempotency on Revenue.billing_event_id.
--            Previously only a non-unique index existed (20260429120050),
--            so milestone billing's idempotency relied on a read-time scan
--            that races. AD_HOC × PER_OCCURRENCE locks this down with a
--            partial unique index; status='cancelled' rows stay reusable.
--            Codex CRIT-3 fix.
--            See docs/plan/20260501-ad-hoc-subscription-billing/plan.md §4.2.

BEGIN;

CREATE UNIQUE INDEX IF NOT EXISTS uniq_revenue_billing_event_id_active
  ON revenue (billing_event_id)
  WHERE billing_event_id IS NOT NULL
    AND status <> 'cancelled';

COMMIT;
