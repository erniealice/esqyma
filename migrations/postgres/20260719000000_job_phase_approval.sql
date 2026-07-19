-- =============================================================================
-- job_phase per-phase approval ladder — additive schema foundation (P1).
-- Plan: docs/plan/20260718-phase-approval-workflow/plan.md §4.1 (fields resume at
-- 40); normative contract: codex-rereview.md ("Proto/wire inventory",
-- "enum/default", "18,900-row backfill"). Proto: job_phase.proto fields 40-53
-- (+ reserve 54-69) and the local PhaseApprovalStatus enum.
--
-- WHAT THIS ADDS (all additive; nothing existing is altered — PhaseStatus at
-- field 11 / column "status" is untouched):
--   * approval_status TEXT — the local PhaseApprovalStatus ladder persisted as the
--     enum NAME. Staged nullable -> backfill only-null -> quoted default -> NOT
--     NULL -> enum-token CHECK. Every historical row -> IN_PROGRESS (honest: no
--     row ever traversed this ladder). UNSPECIFIED is never persisted.
--   * Four server-owned audit pairs (actor TEXT / epoch-ms BIGINT), all nullable,
--     ALL historical audit left NULL: submitted_by/at, verified_by/at,
--     published_by/at, returned_by/at + a standalone return_reason TEXT NULL.
--     Each actor/time pair carries a null-or-nonnull-together CHECK.
--
-- STAGING mirrors 20260716000001_phase1b_not_null_defaults.sql (add nullable ->
-- backfill only-null -> set default -> set not null -> checks). GUARD posture
-- mirrors 20260718000004 (relation-qualified: to_regclass + conrelid::regclass,
-- never conname-only). The *_string proto mirrors (43/46/49/53) are db.ignore —
-- they are NOT columns here.
--
-- APPLICATION / REPLAY: purely additive + idempotent (ADD COLUMN IF NOT EXISTS,
-- fill-NULL-only backfill, SET DEFAULT/NOT NULL are no-ops when already applied,
-- pg_constraint-guarded ADD CONSTRAINT). No explicit BEGIN/COMMIT (atlas wraps
-- each file, txmode=file).
--   * professional1 (274 phases): applied via Atlas normally (db:apply / atlas
--     migrate apply). Recorded as a checksummed revision.
--   * education1 (18,900 phases): NOT atlas-tracked — apply directly:
--       psql -h 127.0.0.1 -U cradle -d education1 --single-transaction \
--            -v ON_ERROR_STOP=1 -f 20260719000000_job_phase_approval.sql
--     Every statement is safe to re-run on a DB already in the target state
--     (idempotency RERUN proof: a second run changes 0 rows and re-passes every
--     postcondition). A later Atlas adoption on education1 replays this file
--     before recording its revision.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 0. Guard (relation-qualified) — job_phase must exist with the expected shape:
--    id TEXT NOT NULL and a TEXT "status" column (the enum-name storage
--    convention this migration mirrors for approval_status). A same-name table
--    with a different shape means an earlier IF NOT EXISTS accepted an imposter
--    -> RAISE, do not build on it.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF to_regclass('public.job_phase') IS NULL THEN
    RAISE EXCEPTION 'job_phase approval guard FAILED: public.job_phase does not exist';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'job_phase'
      AND column_name = 'id' AND data_type = 'text' AND is_nullable = 'NO'
  ) THEN
    RAISE EXCEPTION 'job_phase approval guard FAILED: public.job_phase.id is not TEXT NOT NULL';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'job_phase'
      AND column_name = 'status' AND data_type = 'text'
  ) THEN
    RAISE EXCEPTION 'job_phase approval guard FAILED: public.job_phase.status is not the expected TEXT enum-name column';
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 1. Add columns (all nullable at first — the staged NOT NULL comes after the
--    backfill). approval_status is nullable here so the only-null backfill in
--    step 2 is the single writer of the initial state.
-- ---------------------------------------------------------------------------
ALTER TABLE "job_phase" ADD COLUMN IF NOT EXISTS "approval_status" TEXT;
ALTER TABLE "job_phase" ADD COLUMN IF NOT EXISTS "submitted_by"    TEXT;
ALTER TABLE "job_phase" ADD COLUMN IF NOT EXISTS "submitted_at"    BIGINT;
ALTER TABLE "job_phase" ADD COLUMN IF NOT EXISTS "verified_by"     TEXT;
ALTER TABLE "job_phase" ADD COLUMN IF NOT EXISTS "verified_at"     BIGINT;
ALTER TABLE "job_phase" ADD COLUMN IF NOT EXISTS "published_by"    TEXT;
ALTER TABLE "job_phase" ADD COLUMN IF NOT EXISTS "published_at"    BIGINT;
ALTER TABLE "job_phase" ADD COLUMN IF NOT EXISTS "return_reason"   TEXT;
ALTER TABLE "job_phase" ADD COLUMN IF NOT EXISTS "returned_by"     TEXT;
ALTER TABLE "job_phase" ADD COLUMN IF NOT EXISTS "returned_at"     BIGINT;

-- ---------------------------------------------------------------------------
-- 2. Backfill only-null approval_status -> IN_PROGRESS. Every historical phase
--    is honestly IN_PROGRESS with null audit (no row ever traversed the ladder).
--    Fill-NULL-only -> a rerun (or an already-advanced row from a future cycle)
--    is never rewritten.
-- ---------------------------------------------------------------------------
UPDATE "job_phase" SET "approval_status" = 'PHASE_APPROVAL_STATUS_IN_PROGRESS'
WHERE "approval_status" IS NULL;

-- ---------------------------------------------------------------------------
-- 3. Set the quoted default (raw-SQL literal, matching the proto
--    (options.v1.db).default = "'PHASE_APPROVAL_STATUS_IN_PROGRESS'").
-- ---------------------------------------------------------------------------
ALTER TABLE "job_phase" ALTER COLUMN "approval_status" SET DEFAULT 'PHASE_APPROVAL_STATUS_IN_PROGRESS';

-- ---------------------------------------------------------------------------
-- 4. Now that no NULLs remain, enforce NOT NULL. (Audit columns stay nullable.)
-- ---------------------------------------------------------------------------
ALTER TABLE "job_phase" ALTER COLUMN "approval_status" SET NOT NULL;

-- ---------------------------------------------------------------------------
-- 5. CHECK constraints (pg_constraint-guarded, relation-qualified to
--    public.job_phase — never conname-only).
--    5a. Enum token check: only the four persisted PhaseApprovalStatus tokens.
--        UNSPECIFIED is intentionally excluded (it must never persist).
--    5b-5e. Each actor/time audit pair is null-or-nonnull TOGETHER. (IS NULL
--        never yields NULL, so the boolean equality is total — a half-set pair
--        fails closed.)
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.job_phase'::regclass AND contype = 'c'
      AND conname = 'job_phase_approval_status_check') THEN
    ALTER TABLE "job_phase" ADD CONSTRAINT "job_phase_approval_status_check"
      CHECK ("approval_status" IN (
        'PHASE_APPROVAL_STATUS_IN_PROGRESS',
        'PHASE_APPROVAL_STATUS_FOR_REVIEW',
        'PHASE_APPROVAL_STATUS_VERIFIED',
        'PHASE_APPROVAL_STATUS_PUBLISHED'
      ));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.job_phase'::regclass AND contype = 'c'
      AND conname = 'job_phase_submitted_pair_check') THEN
    ALTER TABLE "job_phase" ADD CONSTRAINT "job_phase_submitted_pair_check"
      CHECK (("submitted_by" IS NULL) = ("submitted_at" IS NULL));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.job_phase'::regclass AND contype = 'c'
      AND conname = 'job_phase_verified_pair_check') THEN
    ALTER TABLE "job_phase" ADD CONSTRAINT "job_phase_verified_pair_check"
      CHECK (("verified_by" IS NULL) = ("verified_at" IS NULL));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.job_phase'::regclass AND contype = 'c'
      AND conname = 'job_phase_published_pair_check') THEN
    ALTER TABLE "job_phase" ADD CONSTRAINT "job_phase_published_pair_check"
      CHECK (("published_by" IS NULL) = ("published_at" IS NULL));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.job_phase'::regclass AND contype = 'c'
      AND conname = 'job_phase_returned_pair_check') THEN
    ALTER TABLE "job_phase" ADD CONSTRAINT "job_phase_returned_pair_check"
      CHECK (("returned_by" IS NULL) = ("returned_at" IS NULL));
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 6. Fail-loud residue assertions (generic — safe on both DBs; the row-count
--    equality assertion is external, run per-DB against a pre-count).
--    (a) no NULL approval_status survived the backfill/NOT-NULL stage;
--    (b) no unknown token slipped past the enum CHECK.
-- ---------------------------------------------------------------------------
DO $$
DECLARE
  null_status  bigint;
  bad_token    bigint;
BEGIN
  SELECT count(*) INTO null_status FROM "job_phase" WHERE "approval_status" IS NULL;
  IF null_status > 0 THEN
    RAISE EXCEPTION 'job_phase approval postcondition FAILED: % row(s) still have NULL approval_status', null_status;
  END IF;

  SELECT count(*) INTO bad_token FROM "job_phase"
  WHERE "approval_status" NOT IN (
    'PHASE_APPROVAL_STATUS_IN_PROGRESS',
    'PHASE_APPROVAL_STATUS_FOR_REVIEW',
    'PHASE_APPROVAL_STATUS_VERIFIED',
    'PHASE_APPROVAL_STATUS_PUBLISHED'
  );
  IF bad_token > 0 THEN
    RAISE EXCEPTION 'job_phase approval postcondition FAILED: % row(s) hold an unrecognized approval_status token', bad_token;
  END IF;
END $$;
