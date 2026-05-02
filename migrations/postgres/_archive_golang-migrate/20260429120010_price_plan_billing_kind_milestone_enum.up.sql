-- Migration: price_plan_billing_kind_milestone_enum (up)
-- Dialect: postgres
-- Created: 2026-04-29T12:00:10Z
-- Rationale: Documents the addition of BILLING_KIND_MILESTONE = 4 to the
--            PricePlan.BillingKind proto enum. This is a no-op at the SQL
--            layer because billing_kind is stored as INTEGER (the proto enum
--            tag value) — there is no PG enum type to extend. This migration
--            exists to anchor the enum-extension date in the migration log
--            for cross-reference with the proto change.
-- See: docs/plan/20260429-milestone-billing/plan.md §2.2

BEGIN;

-- Intentionally empty. price_plan.billing_kind is stored as integer; the
-- proto enum addition (BILLING_KIND_MILESTONE = 4) is wire-compatible with
-- existing rows. No table or column changes are required.

COMMIT;
