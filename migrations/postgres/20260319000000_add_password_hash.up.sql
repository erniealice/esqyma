-- Add password authentication columns to user table
-- Nullable because existing users (Firebase/mock auth) won't have a local password
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "password_hash" TEXT;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "password_reset_token" TEXT;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "password_reset_expires" TIMESTAMPTZ;

-- Index for password reset token lookups
CREATE INDEX IF NOT EXISTS "idx_user_password_reset_token" ON "user" ("password_reset_token") WHERE "password_reset_token" IS NOT NULL;
