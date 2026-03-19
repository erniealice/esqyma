DROP INDEX IF EXISTS "idx_user_password_reset_token";
ALTER TABLE "user" DROP COLUMN IF EXISTS "password_reset_expires";
ALTER TABLE "user" DROP COLUMN IF EXISTS "password_reset_token";
ALTER TABLE "user" DROP COLUMN IF EXISTS "password_hash";
