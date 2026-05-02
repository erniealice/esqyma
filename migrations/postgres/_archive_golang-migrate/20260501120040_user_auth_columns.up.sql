-- Migration: user_auth_columns (up)
-- Dialect: postgres
-- Created: 2026-05-01T12:00:40Z
-- Rationale: Phase 6 bootstrap-auth — add 4 columns to support password reset token
--            tracking, rate-limit tracking, and account lockout.
--            Idempotent (IF NOT EXISTS) for safe re-runs.
--            See docs/plan/20260501-phase0-bootstrap-auth/plan.md §Phase 6.

BEGIN;

ALTER TABLE "user" ADD COLUMN IF NOT EXISTS password_reset_token TEXT;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMPTZ;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS failed_login_attempts INT NOT NULL DEFAULT 0;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS locked_until TIMESTAMPTZ;

COMMIT;
