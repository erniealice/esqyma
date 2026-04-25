ALTER TABLE "subscription" ADD COLUMN IF NOT EXISTS "date_start" TIMESTAMPTZ NULL;
ALTER TABLE "subscription" ADD COLUMN IF NOT EXISTS "date_end" TIMESTAMPTZ NULL;

UPDATE "subscription"
   SET "date_start" = "date_time_start"
 WHERE "date_time_start" IS NOT NULL
   AND "date_start" IS NULL;

UPDATE "subscription"
   SET "date_end" = "date_time_end"
 WHERE "date_time_end" IS NOT NULL
   AND "date_end" IS NULL;
