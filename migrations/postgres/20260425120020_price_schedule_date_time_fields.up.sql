-- Add timestamp-precise window columns to price_schedule.
-- date_start was NOT NULL on schedule, so the new column becomes NOT NULL after backfill.
ALTER TABLE "price_schedule" ADD COLUMN IF NOT EXISTS "date_time_start" TIMESTAMPTZ NULL;
ALTER TABLE "price_schedule" ADD COLUMN IF NOT EXISTS "date_time_end" TIMESTAMPTZ NULL;

UPDATE "price_schedule"
   SET "date_time_start" = ("date_start"::timestamp AT TIME ZONE 'Asia/Manila')
 WHERE "date_start" IS NOT NULL
   AND "date_start" <> ''
   AND "date_time_start" IS NULL;

UPDATE "price_schedule"
   SET "date_time_end" = ("date_end"::timestamp AT TIME ZONE 'Asia/Manila')
 WHERE "date_end" IS NOT NULL
   AND "date_end" <> ''
   AND "date_time_end" IS NULL;

ALTER TABLE "price_schedule" ALTER COLUMN "date_time_start" SET NOT NULL;
