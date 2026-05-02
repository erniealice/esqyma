-- Make price_plan.duration_value and price_plan.duration_unit nullable.
--
-- Rationale: these are deprecated dual-write fields kept around during the
-- pricing-unification migration (see docs/plan/20260421-pricing-unification/plan.md).
-- The price_plan add/edit drawer hides the legacy duration row when
-- billing_kind = BILLING_KIND_ONE_TIME, so the hidden duration_value input is
-- empty. The proto field is now `optional int32` (and `optional string` for the
-- unit), so protojson omits the field on Marshal and the INSERT lacks the
-- column, violating the original NOT NULL constraint.
--
-- Existing rows currently carry integer / text values which remain valid.
-- Phase 3 will eventually drop these columns entirely once all callers have
-- migrated to billing_cycle_* / default_term_*.

ALTER TABLE "price_plan" ALTER COLUMN "duration_value" DROP NOT NULL;
ALTER TABLE "price_plan" ALTER COLUMN "duration_unit" DROP NOT NULL;
