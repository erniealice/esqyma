-- =============================================================================
-- Grade-sheet edit-mode contracts (Wave 1 KEYSTONE) — additive nullable columns.
--   Pairs with the same-commit additive proto fields:
--     domain/common/attribute.proto        (min_value/max_value/min_length/
--                                            max_length/required)
--     domain/common/attribute_value.proto  (label)
--     domain/operation/job_template/…       (initial_status)
--   Backing plan: docs/plan/20260716-grade-sheet-edit-mode/ (Q-GSE-9, Q-GSE-10).
--
-- ATTRIBUTE FAN-OUT WARNING: the `attribute` table is the codebase's ONE generic
--   EAV definition. Every column added here is therefore GLOBAL across all 13
--   `*_attribute` consumers that FK `attribute`:
--     client · supplier · staff · delegate · group · location · plan ·
--     subscription · balance · invoice · event · collection · product _attribute
--   (D1 archaeology, research/D1-attribute-value-archaeology.md §1/§5). The
--   columns are additive + nullable (NULL = "no constraint", today's behaviour
--   for every existing row), so this is safe — but it is genuinely cross-cutting.
--   The real use-case validator that READS these columns ships in the same wave
--   (D1 rider 1: today's validateBusinessRules is a TODO stub).
--
-- NOT AUTO-APPLIED TO education1. This machine's `pnpm db:apply` targets
--   service-admin/.env=professional1; education1 is not Atlas-tracked and takes
--   additive migrations via direct psql (IF NOT EXISTS) as a separate,
--   owner-gated step (see project memory: education1-not-atlas-tracked). This
--   file is authored into the sequence for versioning + replay parity; applying
--   it to any live DB is a deliberate downstream action, not a side effect of
--   landing this wave.
--
-- Purely additive. Every ADD COLUMN is IF NOT EXISTS; every ADD CONSTRAINT is
--   pg_constraint-guarded (ALTER ADD CONSTRAINT has no IF NOT EXISTS), so the
--   file is idempotent and safe to (re-)apply. No fixture rows.
--
-- The CHECKs are added NOT VALID then VALIDATE'd (the two-step for a POPULATED
--   table): the new columns are all-NULL on existing rows so validation passes
--   trivially, but the NOT VALID → VALIDATE convention keeps the lock window
--   short and matches the populated-table pattern in sibling migrations.
--
-- No explicit BEGIN/COMMIT: atlas wraps each file in its own transaction
--   (txmode=file), matching every atlas-applied migration in this dir. Authored
--   directly into the sequence (NOT via db:diff) for the from-empty replay reason
--   documented in 20260607100000 / 20260622000000 / 20260716000000.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. attribute — typed constraint columns (Q-GSE-10). GLOBAL across 13 consumers.
--    min_value/max_value are NUMERIC (unbounded precision, matches the proto
--    `double` round-trip through the generic protojson adapter without float
--    surprises); min_length/max_length INTEGER; required BOOLEAN. All nullable.
-- ---------------------------------------------------------------------------
ALTER TABLE "attribute" ADD COLUMN IF NOT EXISTS "min_value"  NUMERIC NULL;
ALTER TABLE "attribute" ADD COLUMN IF NOT EXISTS "max_value"  NUMERIC NULL;
ALTER TABLE "attribute" ADD COLUMN IF NOT EXISTS "min_length" INTEGER NULL;
ALTER TABLE "attribute" ADD COLUMN IF NOT EXISTS "max_length" INTEGER NULL;
ALTER TABLE "attribute" ADD COLUMN IF NOT EXISTS "required"   BOOLEAN NULL;

-- Constraint columns are meaningless below zero / when inverted. NULL sides are
-- accepted (the constraint only bites when the relevant column(s) are present).
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_attribute_min_length_nonneg') THEN
    ALTER TABLE "attribute" ADD CONSTRAINT "ck_attribute_min_length_nonneg"
      CHECK ("min_length" IS NULL OR "min_length" >= 0) NOT VALID;
    ALTER TABLE "attribute" VALIDATE CONSTRAINT "ck_attribute_min_length_nonneg";
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_attribute_max_length_nonneg') THEN
    ALTER TABLE "attribute" ADD CONSTRAINT "ck_attribute_max_length_nonneg"
      CHECK ("max_length" IS NULL OR "max_length" >= 0) NOT VALID;
    ALTER TABLE "attribute" VALIDATE CONSTRAINT "ck_attribute_max_length_nonneg";
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_attribute_length_order') THEN
    ALTER TABLE "attribute" ADD CONSTRAINT "ck_attribute_length_order"
      CHECK ("min_length" IS NULL OR "max_length" IS NULL OR "min_length" <= "max_length") NOT VALID;
    ALTER TABLE "attribute" VALIDATE CONSTRAINT "ck_attribute_length_order";
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ck_attribute_value_order') THEN
    ALTER TABLE "attribute" ADD CONSTRAINT "ck_attribute_value_order"
      CHECK ("min_value" IS NULL OR "max_value" IS NULL OR "min_value" <= "max_value") NOT VALID;
    ALTER TABLE "attribute" VALIDATE CONSTRAINT "ck_attribute_value_order";
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 2. attribute_value — display label mirroring ProductOptionValue (Q-GSE-10).
--    `value` stays the stored value; `label` the display form. NULL ⇒ use value.
-- ---------------------------------------------------------------------------
ALTER TABLE "attribute_value" ADD COLUMN IF NOT EXISTS "label" TEXT NULL;

-- ---------------------------------------------------------------------------
-- 3. job_template — initial_status of spawned jobs (Q-GSE-9 inversion rider).
--    Generic TEXT carrying a JobStatus enum name (JOB_STATUS_PLANNED / _ACTIVE /
--    _RELEASED / …). NULL/empty ⇒ today's PLANNED default. Homed on the template
--    (operations side), NOT on plan — the template family owns spawned-job
--    lifecycle. Plain TEXT (no CHECK): enum-discriminator columns round-trip the
--    protojson SCREAMING enum name directly (same rationale as version_status in
--    20260716000000), so a value CHECK would fight the adapter.
-- ---------------------------------------------------------------------------
ALTER TABLE "job_template" ADD COLUMN IF NOT EXISTS "initial_status" TEXT NULL;
