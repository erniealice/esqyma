-- Revert price_plan.duration_value and duration_unit to NOT NULL.
-- Backfills any NULLs to a neutral default (0 / 'month') so the constraint
-- can be restored — the same neutral pair the pricing-unification data
-- migration used for one-time plans.

UPDATE "price_plan" SET "duration_value" = 0 WHERE "duration_value" IS NULL;
UPDATE "price_plan" SET "duration_unit" = 'month' WHERE "duration_unit" IS NULL;
ALTER TABLE "price_plan" ALTER COLUMN "duration_value" SET NOT NULL;
ALTER TABLE "price_plan" ALTER COLUMN "duration_unit" SET NOT NULL;
