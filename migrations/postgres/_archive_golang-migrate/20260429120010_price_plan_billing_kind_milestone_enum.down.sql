-- Migration: price_plan_billing_kind_milestone_enum (down)
-- Dialect: postgres
-- Created: 2026-04-29T12:00:10Z
-- Rationale: No-op rollback to match no-op up migration. price_plan.billing_kind
--            integer column is unchanged; rolling back the proto enum is a
--            wire-compatible operation handled outside the SQL layer.

BEGIN;

-- Intentionally empty.

COMMIT;
