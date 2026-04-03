ALTER TABLE "subscription" ADD COLUMN IF NOT EXISTS "code" TEXT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "idx_subscription_code" ON "subscription" ("code") WHERE "code" IS NOT NULL;
