-- =============================================================================
-- Phase-1b column invariants: NOT NULL DEFAULT false (B2 codex re-gate, MED).
--   Follow-up to 20260716000000. That revision created price_schedule.closed and
--   job_outcome_summary.is_authoritative as plain nullable columns (the
--   b2-live-ddl.sql capture recorded only their TYPES). The LIVE education1 DDL
--   is actually `boolean NOT NULL DEFAULT false` for both (verified via
--   information_schema on education1: is_nullable=NO, default=false), matching the
--   proto default + the adapter's fail-closed NULL reading. This file reconciles a
--   fresh/additive replay (and professional1, which applied the nullable variant)
--   to that live invariant. 20260716000000 is already applied + hashed, so its
--   history is NOT rewritten — this is a separate additive revision.
--
--   job_outcome_summary.source stays TEXT NULL (matches live — nullable, no default).
--
-- Idempotent: SET DEFAULT / SET NOT NULL are no-ops if already applied; the
-- backfill only touches NULL rows (so an already-frozen is_authoritative=true row
-- is never rewritten). No BEGIN/COMMIT — atlas wraps each file (txmode=file).
-- =============================================================================

-- price_schedule.closed → NOT NULL DEFAULT false
ALTER TABLE "price_schedule" ALTER COLUMN "closed" SET DEFAULT false;
UPDATE "price_schedule" SET "closed" = false WHERE "closed" IS NULL;
ALTER TABLE "price_schedule" ALTER COLUMN "closed" SET NOT NULL;

-- job_outcome_summary.is_authoritative → NOT NULL DEFAULT false
ALTER TABLE "job_outcome_summary" ALTER COLUMN "is_authoritative" SET DEFAULT false;
UPDATE "job_outcome_summary" SET "is_authoritative" = false WHERE "is_authoritative" IS NULL;
ALTER TABLE "job_outcome_summary" ALTER COLUMN "is_authoritative" SET NOT NULL;
