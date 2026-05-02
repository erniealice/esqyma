-- Add timestamp-precise window columns to subscription.
-- subscription.date_start / date_end are already TIMESTAMPTZ in this DB
-- (auto-generated DDL was already TIMESTAMPTZ for the legacy columns), so
-- the backfill is a direct copy. The semantic shift is "this is now the
-- canonical column"; the old columns are dropped in 20260425120010.
ALTER TABLE "subscription" ADD COLUMN IF NOT EXISTS "date_time_start" TIMESTAMPTZ NULL;
ALTER TABLE "subscription" ADD COLUMN IF NOT EXISTS "date_time_end" TIMESTAMPTZ NULL;

UPDATE "subscription"
   SET "date_time_start" = "date_start"
 WHERE "date_start" IS NOT NULL
   AND "date_time_start" IS NULL;

UPDATE "subscription"
   SET "date_time_end" = "date_end"
 WHERE "date_end" IS NOT NULL
   AND "date_time_end" IS NULL;
