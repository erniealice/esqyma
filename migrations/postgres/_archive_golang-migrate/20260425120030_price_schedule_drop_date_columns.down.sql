ALTER TABLE "price_schedule" ADD COLUMN IF NOT EXISTS "date_start" TEXT NULL;
ALTER TABLE "price_schedule" ADD COLUMN IF NOT EXISTS "date_end" TEXT NULL;

UPDATE "price_schedule"
   SET "date_start" = to_char(("date_time_start" AT TIME ZONE 'Asia/Manila')::date, 'YYYY-MM-DD')
 WHERE "date_time_start" IS NOT NULL
   AND ("date_start" IS NULL OR "date_start" = '');

UPDATE "price_schedule"
   SET "date_end" = to_char(("date_time_end" AT TIME ZONE 'Asia/Manila')::date, 'YYYY-MM-DD')
 WHERE "date_time_end" IS NOT NULL
   AND ("date_end" IS NULL OR "date_end" = '');

ALTER TABLE "price_schedule" ALTER COLUMN "date_start" SET NOT NULL;
