-- =============================================================================
-- criteria_group domain claim — cross-group (workspace, scope, industry, code)
-- ownership backstop + migration-guard hardening. Follow-up to 20260718000003.
--
-- CONTRACT NOTE (supersedes the 20260718000003 headline wording): the enforced
-- lineage invariant is "every CODED version of a criteria_group carries the SAME
-- code". NULL-code versions are exempt BY DESIGN (composite FK, MATCH SIMPLE) and
-- remain permitted inside anchored groups — draft-first flows may version an
-- uncoded row alongside coded siblings. 20260718000003's "every row / all
-- versions" phrasing was imprecise; that file is hash-frozen (professional1
-- recorded its Atlas revision), so the correction is recorded here and in the
-- proto comment (outcome_criteria.proto, field `code`).
--
-- WHAT THIS FILE ADDS (codex wave1-q1 review, findings 2B/8A):
--   1. Domain columns on the anchor: scope, workspace_key, industry_key — the
--      NORMALIZED (COALESCE to '') copy of the owning lineage's code-uniqueness
--      domain, stamped at first claim by the trigger.
--   2. UNIQUE (scope, workspace_key, industry_key, code) on the anchor: ONE
--      criteria_group may own a code within a domain, across ALL version
--      statuses and both active states. This is the missing DB backstop for
--      concurrent DRAFT collisions across DIFFERENT groups (finding 2B): two
--      transactions claiming G1/x and G2/x in one domain now serialize on this
--      index — the loser gets a unique violation via the anchor trigger. It also
--      fail-closes coded-row re-homing to a fresh group (the old group's claim
--      blocks the new one).
--   3. Preflights (fail-loud, mirroring 20260718000003 §0): legacy cross-group
--      same-domain+code owners, and intra-group domain divergence among coded
--      rows. Verified clean on education1 (4 coded groups, 1 domain each, 0
--      cross-group collisions) and trivially on professional1 (0 coded rows).
--   4. Relation-/schema-qualified guard validation (finding 8A): 20260718000003
--      guarded its FK by pg_constraint.conname ONLY — a same-name constraint on
--      any other relation silently skips the authoritative FK. This file binds
--      the check to conrelid='public.outcome_criteria' + contype='f', validates
--      the expected definition (RAISE on drift), and ADDs the FK if the earlier
--      name-only guard mis-skipped it. The criteria_group anchor table's shape is
--      likewise validated instead of trusting any same-name table.
--   5. A btrim(id) <> '' CHECK on the anchor: an empty-string group id must not
--      silently pool unrelated "ungrouped" coded rows into one phantom lineage
--      (SQL NULL group ids already fail the trigger's NOT NULL insert).
--
-- APPLICATION / REPLAY: purely additive + idempotent (ADD COLUMN IF NOT EXISTS,
-- fill-NULL-only backfill, CREATE UNIQUE INDEX IF NOT EXISTS, CREATE OR REPLACE
-- FUNCTION, pg_constraint-guarded ADD CONSTRAINT). No explicit BEGIN/COMMIT
-- (atlas wraps each file, txmode=file). education1 is NOT atlas-tracked for
-- apply: run this file via psql --single-transaction -v ON_ERROR_STOP=1 (same as
-- 20260718000003); a later Atlas adoption will REPLAY both files before
-- recording revisions — every statement here (and there) is safe to re-run on a
-- database already in the target state. professional1 applies via Atlas
-- normally. Authored directly into the sequence (NOT via db:diff) for the replay
-- reason documented in 20260718000000..3.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 0. Guard validation (finding 8A) — relation-qualified, definition-checked.
--    (a) criteria_group must exist with the 20260718000003 shape: id/code TEXT
--        NOT NULL, PK(id), UNIQUE(id, code). A same-name table with a different
--        shape means 20260718000003's CREATE IF NOT EXISTS accepted an imposter
--        -> RAISE, do not build on it.
--    (b) fk_outcome_criteria_group_anchor must exist ON public.outcome_criteria
--        as a FOREIGN KEY with the expected definition. Missing (name-only guard
--        mis-skip on a drifted DB) -> ADD it. Present-but-different -> RAISE.
-- ---------------------------------------------------------------------------
DO $$
DECLARE
  pk_cols  text[];
  uq_cols  text[];
  fk_def   text;
BEGIN
  IF to_regclass('public.criteria_group') IS NULL THEN
    RAISE EXCEPTION 'criteria_group domain-claim guard FAILED: public.criteria_group does not exist (20260718000003 not applied?)';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'criteria_group'
      AND column_name = 'id' AND data_type = 'text' AND is_nullable = 'NO'
  ) OR NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'criteria_group'
      AND column_name = 'code' AND data_type = 'text' AND is_nullable = 'NO'
  ) THEN
    RAISE EXCEPTION 'criteria_group domain-claim guard FAILED: public.criteria_group id/code columns are not TEXT NOT NULL — a same-name table with a different shape was accepted by an earlier IF NOT EXISTS; reconcile before applying';
  END IF;

  SELECT array_agg(a.attname ORDER BY x.ord) INTO pk_cols
  FROM pg_constraint c
  CROSS JOIN LATERAL unnest(c.conkey) WITH ORDINALITY AS x(attnum, ord)
  JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = x.attnum
  WHERE c.conrelid = 'public.criteria_group'::regclass AND c.contype = 'p';
  IF pk_cols IS DISTINCT FROM ARRAY['id']::text[] THEN
    RAISE EXCEPTION 'criteria_group domain-claim guard FAILED: primary key is % (expected {id})', pk_cols;
  END IF;

  SELECT array_agg(a.attname ORDER BY x.ord) INTO uq_cols
  FROM pg_constraint c
  CROSS JOIN LATERAL unnest(c.conkey) WITH ORDINALITY AS x(attnum, ord)
  JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = x.attnum
  WHERE c.conrelid = 'public.criteria_group'::regclass AND c.contype = 'u'
    AND c.conname = 'uq_criteria_group_id_code';
  IF uq_cols IS DISTINCT FROM ARRAY['id','code']::text[] THEN
    RAISE EXCEPTION 'criteria_group domain-claim guard FAILED: uq_criteria_group_id_code covers % (expected {id,code})', uq_cols;
  END IF;

  SELECT pg_get_constraintdef(c.oid) INTO fk_def
  FROM pg_constraint c
  WHERE c.conname  = 'fk_outcome_criteria_group_anchor'
    AND c.conrelid = 'public.outcome_criteria'::regclass
    AND c.contype  = 'f';
  IF fk_def IS NULL THEN
    -- The 20260718000003 name-only guard can be satisfied by a same-name
    -- constraint on ANOTHER relation, silently skipping the authoritative FK.
    -- Repair: add it here (per-relation constraint names cannot collide).
    ALTER TABLE "public"."outcome_criteria"
      ADD CONSTRAINT "fk_outcome_criteria_group_anchor"
      FOREIGN KEY ("criteria_group_id", "code")
      REFERENCES "public"."criteria_group" ("id", "code");
  ELSIF fk_def NOT IN (
    'FOREIGN KEY (criteria_group_id, code) REFERENCES criteria_group(id, code)',
    'FOREIGN KEY (criteria_group_id, code) REFERENCES public.criteria_group(id, code)'
  ) THEN
    RAISE EXCEPTION 'criteria_group domain-claim guard FAILED: fk_outcome_criteria_group_anchor on public.outcome_criteria has unexpected definition: %', fk_def;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 1. Domain columns (normalized, '' = NULL/absent — matching the partial unique
--    indexes' COALESCE semantics and the app validators' normalization).
-- ---------------------------------------------------------------------------
ALTER TABLE "criteria_group" ADD COLUMN IF NOT EXISTS "scope"         TEXT;
ALTER TABLE "criteria_group" ADD COLUMN IF NOT EXISTS "workspace_key" TEXT;
ALTER TABLE "criteria_group" ADD COLUMN IF NOT EXISTS "industry_key"  TEXT;

-- ---------------------------------------------------------------------------
-- 2. Preflight A (fail-loud) — a coded lineage must live in ONE normalized
--    domain, or its anchor's domain cannot be derived deterministically.
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
    HAVING count(DISTINCT (COALESCE("scope",''), COALESCE("workspace_id",''), COALESCE("industry_code",''))) > 1
  ) t;
  IF bad_count > 0 THEN
    RAISE EXCEPTION 'criteria_group domain-claim preflight FAILED: % criteria_group_id(s) hold coded versions in more than one normalized (scope, workspace, industry) domain; reconcile before claiming', bad_count;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 3. Preflight B (fail-loud) — legacy cross-group collisions: one normalized
--    (scope, workspace, industry, code) already owned by MULTIPLE groups would
--    make the unique claim below impossible. Reconcile the lineages first
--    (mirrors the 20260718000003 §0 posture: guard a dirty tier, never mask).
-- ---------------------------------------------------------------------------
DO $$
DECLARE
  bad_count integer;
BEGIN
  SELECT count(*) INTO bad_count FROM (
    SELECT COALESCE("scope",''), COALESCE("workspace_id",''), COALESCE("industry_code",''), "code"
    FROM "outcome_criteria"
    WHERE "code" IS NOT NULL
    GROUP BY 1, 2, 3, 4
    HAVING count(DISTINCT "criteria_group_id") > 1
  ) t;
  IF bad_count > 0 THEN
    RAISE EXCEPTION 'criteria_group domain-claim preflight FAILED: % normalized (scope, workspace, industry, code) domain-code pair(s) are held by more than one criteria_group; reconcile the lineages before adding the unique claim', bad_count;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 4. Backfill anchor domains from their coded rows (fill-NULL-only ->
--    idempotent; preflight A guarantees exactly one domain per group).
-- ---------------------------------------------------------------------------
UPDATE "criteria_group" cg
SET "scope"         = d.scope_key,
    "workspace_key" = d.ws_key,
    "industry_key"  = d.ind_key
FROM (
  SELECT DISTINCT
    "criteria_group_id",
    COALESCE("scope",'')         AS scope_key,
    COALESCE("workspace_id",'')  AS ws_key,
    COALESCE("industry_code",'') AS ind_key
  FROM "outcome_criteria"
  WHERE "code" IS NOT NULL
) d
WHERE cg."id" = d."criteria_group_id"
  AND (cg."scope" IS NULL OR cg."workspace_key" IS NULL OR cg."industry_key" IS NULL);

-- Orphan anchors (no coded referencing rows left — e.g. hard-deleted lineage)
-- cannot be domain-attributed and would hold a phantom reservation: drop them.
-- The composite FK guarantees this DELETE cannot strand a coded row.
DELETE FROM "criteria_group" cg
WHERE (cg."scope" IS NULL OR cg."workspace_key" IS NULL OR cg."industry_key" IS NULL)
  AND NOT EXISTS (
    SELECT 1 FROM "outcome_criteria" oc
    WHERE oc."criteria_group_id" = cg."id" AND oc."code" IS NOT NULL
  );

-- Fail-loud residue check: every surviving anchor must now be fully attributed.
DO $$
DECLARE
  bad_count integer;
BEGIN
  SELECT count(*) INTO bad_count
  FROM "criteria_group"
  WHERE "scope" IS NULL OR "workspace_key" IS NULL OR "industry_key" IS NULL;
  IF bad_count > 0 THEN
    RAISE EXCEPTION 'criteria_group domain-claim backfill FAILED: % anchor(s) still have NULL domain columns', bad_count;
  END IF;
END $$;

ALTER TABLE "criteria_group" ALTER COLUMN "scope"         SET NOT NULL;
ALTER TABLE "criteria_group" ALTER COLUMN "workspace_key" SET NOT NULL;
ALTER TABLE "criteria_group" ALTER COLUMN "industry_key"  SET NOT NULL;

-- ---------------------------------------------------------------------------
-- 5. THE CLAIM — one owning group per normalized domain+code, all versions.
--    Concurrent different-group writers serialize here: the second INSERT into
--    the anchor (via the trigger below) waits on the first's transaction, then
--    fails with unique_violation if it committed. First-write-wins, DB-owned.
-- ---------------------------------------------------------------------------
CREATE UNIQUE INDEX IF NOT EXISTS "uq_criteria_group_domain_code"
  ON "criteria_group" ("scope", "workspace_key", "industry_key", "code");

-- ---------------------------------------------------------------------------
-- 6. Empty-string group ids must not become a phantom shared lineage.
--    (SQL NULL ids already fail the trigger's NOT NULL insert.)
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.criteria_group'::regclass
      AND conname  = 'criteria_group_id_not_blank'
      AND contype  = 'c'
  ) THEN
    ALTER TABLE "criteria_group"
      ADD CONSTRAINT "criteria_group_id_not_blank" CHECK (btrim("id") <> '');
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 7. Trigger function v2 — also stamps the claimed domain at first anchor.
--    Same first-write-wins ON CONFLICT (id) DO NOTHING for the group id; a
--    DIFFERENT group claiming an already-owned domain+code passes the id
--    arbiter and trips uq_criteria_group_domain_code -> fails closed. The
--    trigger definition itself (BEFORE INSERT OR UPDATE OF code,
--    criteria_group_id) is unchanged from 20260718000003.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION "ensure_criteria_group_anchor"()
RETURNS trigger AS $$
BEGIN
  IF NEW."code" IS NOT NULL THEN
    INSERT INTO "criteria_group" ("id", "code", "scope", "workspace_key", "industry_key")
    VALUES (
      NEW."criteria_group_id",
      NEW."code",
      COALESCE(NEW."scope",''),
      COALESCE(NEW."workspace_id",''),
      COALESCE(NEW."industry_code",'')
    )
    ON CONFLICT ("id") DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
