-- Migration: price_plan_entitled_occurrences (up)
-- Dialect: postgres
-- Created: 2026-05-01T12:00:00Z
-- Rationale: AD_HOC × TOTAL_PACKAGE prepaid pool entitlement.
--            PricePlan column = catalog/template default.
--            Subscription column = per-instance override (codex MAJ-1) so
--            "Extend pool" never mutates the shared catalog row.
--            See docs/plan/20260501-ad-hoc-subscription-billing/plan.md §2.3.

BEGIN;

ALTER TABLE price_plan
  ADD COLUMN IF NOT EXISTS entitled_occurrences INTEGER;

ALTER TABLE subscription
  ADD COLUMN IF NOT EXISTS entitled_occurrences_override INTEGER;

COMMIT;
