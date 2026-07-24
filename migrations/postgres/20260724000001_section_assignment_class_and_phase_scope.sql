-- Migration: section_assignment_class_and_phase_scope
-- Date: 2026-07-24
-- Plan: docs/plan/20260724-section-assignment-merged/plan.md §1.1/§1.1b (esqyma
--   leg: docs/plan/20260724-section-assignment-merged/esqyma.md §1-2) — Stage M1.
--
-- ⚠️ NOT APPLIED — AUTHORED ONLY. This file rides M3's DB lane (universal
--   backfill), per plan.md §4 migration staging. M1 is proto-only ("zero
--   behavior change — nothing reads the new fields/entity yet"); this SQL is
--   authored now so the sequence is complete and reviewable, but it is NOT run
--   this round — not via `pnpm db:apply`, not via direct psql on education1.
--   Apply only alongside the M3 backfill CLI, after M2 (espyna UC + adapters)
--   lands and the owner confirms. Both new columns and the new table are
--   additive/nullable, so this file is safe to leave un-applied indefinitely
--   without blocking any other migration in the sequence.
--
-- Contents (mirrors the proto edits of the same plan stage, see esqyma.md §1-2):
--   1. NEW TABLE subscription_group_product_plan (sgpp) — THE CLASS: a
--      per-section, per-offering delivery instance anchored to its curriculum
--      job_template. unique (subscription_group_id, product_plan_id) per the
--      proto's `unique_together`.
--   2. subscription_group_product_plan_staff (sgpps) — THE ASSIGNMENT — gains
--      3 new nullable columns (f12/f13/f14): the class FK, the eligibility FK
--      (product_plan_staff), and the optional phase-scope FK. Legacy f8/f9/f10
--      (subscription_group_id/product_plan_id/staff_id) are UNTOUCHED and stay
--      populated (dual-write) through the migration — see D-8.
--   3. Partial unique index uq_sgpps_class_pps_phase — the v2 uniqueness
--      (class, eligibility, phase-or-whole) cannot be expressed by the proto's
--      `unique_together` option (COALESCE on a nullable column), so it lands
--      as a hand-authored index, same shape as the existing
--      uq_product_plan_plan_product_variant precedent (COALESCE(nullable, ''))
--      on product_plan. Only job_template_phase_id is COALESCE-wrapped: two
--      rows sharing (class, eligibility) with BOTH job_template_phase_id NULL
--      ("all phases") collide by design; class_id/pps_id are left raw because
--      Postgres already treats distinct NULLs as non-colliding, which is
--      exactly the desired backward-compatible behavior for legacy-only rows
--      (f12/f13 NULL) before the M3 link-up runs.
--
-- New table is EMPTY at create, so PK/FK/UNIQUE ship directly in CREATE TABLE
-- (the NOT VALID -> VALIDATE two-step only applies when ALTERing a POPULATED
-- table — see docs/wiki/articles/schema-migrations.md). The sgpps ADD COLUMNs
-- are nullable, so no backfill/NOT-NULL leg is required.
--
-- No explicit BEGIN/COMMIT: atlas wraps each file in its own transaction
-- (txmode=file), matching the convention of every atlas-applied migration
-- here. Authored directly into the sequence (NOT via db:diff) for the replay
-- reason documented in 20260607100000 / 20260622000000 (MEMORY: migration dir
-- can't replay from empty). education1 is not atlas-tracked (MEMORY): when
-- this rides M3, apply there via direct psql with IF NOT EXISTS, matching the
-- statements below verbatim.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. subscription_group_product_plan — THE CLASS (subscription domain).
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "subscription_group_product_plan" (
  "id"                    TEXT PRIMARY KEY,
  "date_created"          BIGINT NULL,
  "date_modified"         BIGINT NULL,
  "active"                BOOLEAN NOT NULL DEFAULT true,
  "workspace_id"          TEXT NOT NULL,
  "subscription_group_id" TEXT NOT NULL,
  "product_plan_id"       TEXT NOT NULL,
  "job_template_id"       TEXT NOT NULL,
  "status"                TEXT NOT NULL,
  CONSTRAINT "fk_subscription_group_product_plan_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_subscription_group_product_plan_subscription_group_id" FOREIGN KEY ("subscription_group_id") REFERENCES "subscription_group"("id"),
  CONSTRAINT "fk_subscription_group_product_plan_product_plan_id" FOREIGN KEY ("product_plan_id") REFERENCES "product_plan"("id"),
  CONSTRAINT "fk_subscription_group_product_plan_job_template_id" FOREIGN KEY ("job_template_id") REFERENCES "job_template"("id"),
  CONSTRAINT "uq_subscription_group_product_plan_1" UNIQUE ("subscription_group_id", "product_plan_id")
);
CREATE INDEX IF NOT EXISTS "idx_subscription_group_product_plan_workspace_id"          ON "subscription_group_product_plan" ("workspace_id");
CREATE INDEX IF NOT EXISTS "idx_subscription_group_product_plan_subscription_group_id" ON "subscription_group_product_plan" ("subscription_group_id");
CREATE INDEX IF NOT EXISTS "idx_subscription_group_product_plan_product_plan_id"       ON "subscription_group_product_plan" ("product_plan_id");
CREATE INDEX IF NOT EXISTS "idx_subscription_group_product_plan_job_template_id"       ON "subscription_group_product_plan" ("job_template_id");

-- ---------------------------------------------------------------------------
-- 2. subscription_group_product_plan_staff — additive columns (f12/f13/f14).
--    All nullable; legacy subscription_group_id/product_plan_id/staff_id
--    (f8/f9/f10) are untouched and keep being populated (dual-write, D-8).
-- ---------------------------------------------------------------------------
ALTER TABLE "subscription_group_product_plan_staff" ADD COLUMN IF NOT EXISTS "subscription_group_product_plan_id" TEXT NULL;
ALTER TABLE "subscription_group_product_plan_staff" ADD COLUMN IF NOT EXISTS "product_plan_staff_id"              TEXT NULL;
ALTER TABLE "subscription_group_product_plan_staff" ADD COLUMN IF NOT EXISTS "job_template_phase_id"              TEXT NULL;

-- FKs (pg_constraint-guarded — ALTER ADD CONSTRAINT has no IF NOT EXISTS).
--
-- Guard by constraint SHAPE (target table + contype='f' + source-column attnum),
-- NOT by hand-typed conname string. PostgreSQL's NAMEDATALEN is 63 bytes, so any
-- identifier longer than that is silently truncated at DDL time. The first FK's
-- natural name below is 75 bytes ("fk_subscription_group_product_plan_staff_
-- subscription_group_product_plan_id"), so it gets stored truncated to 63 bytes
-- ("fk_subscription_group_product_plan_staff_subscription_group_pro").
--
-- Note: a conname = '<75-byte literal>' comparison happens to still match here,
-- because pg_constraint.conname is of Postgres type `name` (also capped at 63
-- bytes) and the literal gets implicitly cast+truncated to `name` the same way
-- before the comparison runs — verified empirically by replaying the original
-- literal-comparison guard against the already-migrated education1 (wrapped in
-- BEGIN/ROLLBACK): all three checks correctly reported "already exists" and
-- skipped the ALTER, no error, FK count unchanged. So this is not fixing an
-- observed failure; it's removing a fragile *coincidence*. That match depends on
-- conname's underlying type and on the comparison going through the `name` input
-- cast — easy to break by accident (e.g. an explicit ::text cast on either side,
-- or the same string-literal pattern copied somewhere the column isn't type
-- `name`). Matching on (conrelid, contype, conkey) instead is correct regardless
-- of how any name gets truncated, and stays correct even if the constraint name
-- text is edited later — it cannot rot.
DO $$
DECLARE
  v_attnum smallint;
BEGIN
  SELECT attnum INTO v_attnum
    FROM pg_attribute
   WHERE attrelid = 'subscription_group_product_plan_staff'::regclass
     AND attname = 'subscription_group_product_plan_id';
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conrelid = 'subscription_group_product_plan_staff'::regclass
       AND contype = 'f'
       AND conkey = ARRAY[v_attnum]
  ) THEN
    ALTER TABLE "subscription_group_product_plan_staff" ADD CONSTRAINT "fk_subscription_group_product_plan_staff_subscription_group_product_plan_id"
      FOREIGN KEY ("subscription_group_product_plan_id") REFERENCES "subscription_group_product_plan"("id");
  END IF;

  SELECT attnum INTO v_attnum
    FROM pg_attribute
   WHERE attrelid = 'subscription_group_product_plan_staff'::regclass
     AND attname = 'product_plan_staff_id';
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conrelid = 'subscription_group_product_plan_staff'::regclass
       AND contype = 'f'
       AND conkey = ARRAY[v_attnum]
  ) THEN
    ALTER TABLE "subscription_group_product_plan_staff" ADD CONSTRAINT "fk_subscription_group_product_plan_staff_product_plan_staff_id"
      FOREIGN KEY ("product_plan_staff_id") REFERENCES "product_plan_staff"("id");
  END IF;

  SELECT attnum INTO v_attnum
    FROM pg_attribute
   WHERE attrelid = 'subscription_group_product_plan_staff'::regclass
     AND attname = 'job_template_phase_id';
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conrelid = 'subscription_group_product_plan_staff'::regclass
       AND contype = 'f'
       AND conkey = ARRAY[v_attnum]
  ) THEN
    ALTER TABLE "subscription_group_product_plan_staff" ADD CONSTRAINT "fk_subscription_group_product_plan_staff_job_template_phase_id"
      FOREIGN KEY ("job_template_phase_id") REFERENCES "job_template_phase"("id");
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "idx_subscription_group_product_plan_staff_subscription_group_product_plan_id" ON "subscription_group_product_plan_staff" ("subscription_group_product_plan_id");
CREATE INDEX IF NOT EXISTS "idx_subscription_group_product_plan_staff_product_plan_staff_id"              ON "subscription_group_product_plan_staff" ("product_plan_staff_id");
CREATE INDEX IF NOT EXISTS "idx_subscription_group_product_plan_staff_job_template_phase_id"              ON "subscription_group_product_plan_staff" ("job_template_phase_id");

-- ---------------------------------------------------------------------------
-- 3. Partial unique index — one row per (class, eligibility, phase-or-whole).
--    subscription_group_id/product_plan_id legacy unique_together (f8,f9,f10)
--    stays as-is; this is the NEW v2 uniqueness on (f12,f13,f14).
-- ---------------------------------------------------------------------------
CREATE UNIQUE INDEX IF NOT EXISTS "uq_sgpps_class_pps_phase"
  ON "subscription_group_product_plan_staff" (
    "subscription_group_product_plan_id",
    "product_plan_staff_id",
    COALESCE("job_template_phase_id", '')
  );
