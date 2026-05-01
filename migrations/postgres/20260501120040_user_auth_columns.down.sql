-- Migration: user_auth_columns (down)
-- Dialect: postgres
-- Created: 2026-05-01T12:00:40Z
-- Rationale: Reverse of up migration — drops auth-related columns added in Phase 6.

BEGIN;

ALTER TABLE "user" DROP COLUMN IF EXISTS password_reset_token;
ALTER TABLE "user" DROP COLUMN IF EXISTS password_reset_expires;
ALTER TABLE "user" DROP COLUMN IF EXISTS failed_login_attempts;
ALTER TABLE "user" DROP COLUMN IF EXISTS locked_until;

COMMIT;
