-- =============================================================================
-- outcome_criteria group anchor — the ALL-VERSION code-lineage DB backstop.
--
-- Proto invariant: every outcome_criteria row sharing a criteria_group_id carries
-- the SAME code, across ALL version_statuses (DRAFT + PUBLISHED + DEPRECATED) and
-- both active states. The partial uniques from 20260718000001 constrain only
-- active+PUBLISHED rows, so (a) two concurrent DRAFT writers proposing different
-- codes for one new group have no DB backstop, and (b) a deprecated/soft-deleted
-- version could silently diverge from its lineage. This migration adds the
-- missing all-version anchor (the Q1 "DB-backed group anchor" remainder).
--
-- MECHANISM — declarative composite FK + populate-trigger, first-write-wins:
--   1. criteria_group (id PK, code NOT NULL, UNIQUE(id,code)) — a bare
--      INFRA-ONLY anchor table. It is deliberately NOT an esqyma proto entity
--      (no adapter, no use case, no views, no lyngua): it exists purely as the
--      composite-FK target that pins one canonical code per lineage. One row per
--      criteria_group_id that has ever carried a code.
--   2. Composite FK outcome_criteria(criteria_group_id, code) ->
--      criteria_group(id, code). MATCH SIMPLE (default): a row whose code IS NULL
--      is exempt (the many intentionally-uncoded criteria), a row WITH a code
--      MUST match the anchor's (id, code). Because id is the anchor PK (exactly
--      one code per group), this forces every coded version of a group to share
--      that one code — the all-version lineage invariant, enforced by the engine.
--   3. A BEFORE INSERT/UPDATE trigger that, for any coded row, INSERTs the anchor
--      ON CONFLICT (id) DO NOTHING (first-write-wins). It only POPULATES; the FK
--      does the ENFORCING. A second concurrent writer with a DIFFERENT code
--      leaves the first writer's anchor intact (DO NOTHING) and then trips the FK
--      -> fails closed. The trigger keeps every write path (generic API,
--      use cases, seeders, the grade-loader, this migration's backfill) mutually
--      consistent with ZERO application write-path plumbing.
--
-- PREFLIGHT (fail-loud): abort if any group already holds >1 distinct code across
-- all versions. The Wave-A backfill made education1 consistent (verified: 4 coded
-- groups, 0 conflicts); professional1 has 0 coded rows. This guards a dirty tier
-- rather than masking a violation behind first-write-wins.
--
-- Purely additive + idempotent: CREATE TABLE/TRIGGER guarded, CREATE OR REPLACE
-- FUNCTION, pg_constraint-guarded ADD CONSTRAINT, ON CONFLICT backfill. No
-- explicit BEGIN/COMMIT (atlas wraps each file, txmode=file). Authored directly
-- into the sequence (NOT via db:diff) for the replay reason documented in
-- 20260718000000..2.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 0. Preflight — fail loud on any pre-existing multi-code lineage.
-- ---------------------------------------------------------------------------
DO $$
DECLARE
  bad_count integer;
BEGIN
  SELECT count(*) INTO bad_count FROM (
    SELECT "criteria_group_id"
    FROM "outcome_criteria"
    WHERE "code" IS NOT NULL
    GROUP BY "criteria_group_id"
    HAVING count(DISTINCT "code") > 1
  ) t;
  IF bad_count > 0 THEN
    RAISE EXCEPTION 'outcome_criteria group-anchor preflight FAILED: % criteria_group_id(s) carry more than one distinct code across their versions; reconcile the lineage before adding the anchor', bad_count;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 1. Anchor table (infra-only; NOT a proto entity — constraint-only exemption).
--    UNIQUE(id, code) is the composite-FK target; the path CHECK mirrors the
--    outcome_criteria.code normalization so the anchor cannot hold a code the
--    referencing column could never produce.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "criteria_group" (
  "id"   TEXT NOT NULL,
  "code" TEXT NOT NULL,
  CONSTRAINT "criteria_group_pkey"      PRIMARY KEY ("id"),
  CONSTRAINT "uq_criteria_group_id_code" UNIQUE ("id", "code"),
  CONSTRAINT "criteria_group_code_path_chk"
    CHECK ("code" = lower(btrim("code")) AND "code" ~ '^[a-z][a-z0-9_]*$')
);

-- ---------------------------------------------------------------------------
-- 2. Backfill one anchor per existing coded lineage (post-preflight: 1:1).
--    Spans all version_statuses and both active states (no active filter).
-- ---------------------------------------------------------------------------
INSERT INTO "criteria_group" ("id", "code")
SELECT DISTINCT "criteria_group_id", "code"
FROM "outcome_criteria"
WHERE "code" IS NOT NULL
ON CONFLICT ("id") DO NOTHING;

-- ---------------------------------------------------------------------------
-- 3. Populate-trigger (first-write-wins; POPULATES only — the FK ENFORCES).
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION "ensure_criteria_group_anchor"()
RETURNS trigger AS $$
BEGIN
  IF NEW."code" IS NOT NULL THEN
    INSERT INTO "criteria_group" ("id", "code")
    VALUES (NEW."criteria_group_id", NEW."code")
    ON CONFLICT ("id") DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS "trg_ensure_criteria_group_anchor" ON "outcome_criteria";
CREATE TRIGGER "trg_ensure_criteria_group_anchor"
  BEFORE INSERT OR UPDATE OF "code", "criteria_group_id" ON "outcome_criteria"
  FOR EACH ROW
  EXECUTE FUNCTION "ensure_criteria_group_anchor"();

-- ---------------------------------------------------------------------------
-- 4. Composite FK — the declarative all-version enforcement. MATCH SIMPLE:
--    NULL code -> exempt; coded rows must match the anchor's (id, code).
--    pg_constraint-guarded (ADD CONSTRAINT has no IF NOT EXISTS).
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_outcome_criteria_group_anchor') THEN
    ALTER TABLE "outcome_criteria"
      ADD CONSTRAINT "fk_outcome_criteria_group_anchor"
      FOREIGN KEY ("criteria_group_id", "code")
      REFERENCES "criteria_group" ("id", "code");
  END IF;
END $$;
