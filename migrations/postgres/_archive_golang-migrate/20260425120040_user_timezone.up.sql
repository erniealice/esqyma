ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "timezone" TEXT NULL DEFAULT 'Asia/Manila';

UPDATE "user"
   SET "timezone" = 'Asia/Manila'
 WHERE "timezone" IS NULL OR "timezone" = '';
