-- Add workspace.slug — URL-canonical workspace identifier for /w/{slug}/* routing.
-- Phase P-1 of docs/plan/20260521-workspace-keyed-routing per Q-WS-1 → A and Q-WS-2 → A.
--
-- Pre-prod stage per Q-WS-5 → C; we do additive ADD COLUMN + backfill + UNIQUE
-- INDEX + CHECK in one migration. Future tightening to NOT NULL is a follow-up
-- (kept nullable for safety until application-layer code enforces non-null on
-- create — see espyna ValidateSlug use case).
--
-- Backfill rule (deterministic, idempotent under WHERE slug IS NULL):
--   1. Lowercase the existing workspace.name
--   2. Replace runs of non-[a-z0-9] characters with a single hyphen
--   3. Trim leading/trailing hyphens
--   4. Truncate to 30 characters
--   5. If the result is empty or shorter than 3 chars (e.g. all-symbol names),
--      fall back to the first 8 hex characters of the workspace id.
--
-- Constraints added after backfill:
--   * UNIQUE INDEX workspace_slug_unique — uniqueness across workspaces.
--   * CHECK workspace_slug_format — regex ^[a-z0-9]+(?:-[a-z0-9]+)*$ and length 3-30.
--   Slug stays nullable at the DB level so the deployed binary tolerates the
--   schema change (application layer enforces non-null on create going forward).
--
-- Safety profile: ADD COLUMN nullable + two idempotent UPDATEs guarded by
-- WHERE clauses + CREATE INDEX on a small table (5 rows on dev). No DROP, no
-- RENAME, no TYPE change. Lock profile: ACCESS EXCLUSIVE on workspace for the
-- duration of the ALTER + INDEX build, acceptable while workspace count is low.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. Add the column (nullable; backfill below).
-- ---------------------------------------------------------------------------
ALTER TABLE public.workspace
    ADD COLUMN slug VARCHAR(30);

-- ---------------------------------------------------------------------------
-- 2. Backfill from workspace.name via deterministic slugify.
--    Idempotent: re-applying with this WHERE clause is a no-op.
-- ---------------------------------------------------------------------------
UPDATE public.workspace
SET slug = LEFT(
    regexp_replace(
        regexp_replace(LOWER(name), '[^a-z0-9]+', '-', 'g'),
        '^-+|-+$', '', 'g'
    ),
    30
)
WHERE slug IS NULL;

-- ---------------------------------------------------------------------------
-- 3. Defensive fallback: if any row still has an unusable slug (all-symbol
--    name, or stripped to <3 chars), derive from id. Idempotent.
-- ---------------------------------------------------------------------------
UPDATE public.workspace
SET slug = LEFT(REPLACE(LOWER(id), '-', ''), 8)
WHERE slug IS NULL OR slug = '' OR length(slug) < 3;

-- ---------------------------------------------------------------------------
-- 4. Enforce uniqueness across workspaces.
-- ---------------------------------------------------------------------------
CREATE UNIQUE INDEX workspace_slug_unique ON public.workspace (slug);

-- ---------------------------------------------------------------------------
-- 5. Enforce format: lowercase alphanumeric + hyphens, 3-30 chars.
--    Applied after backfill so existing rows pass the check.
-- ---------------------------------------------------------------------------
ALTER TABLE public.workspace
    ADD CONSTRAINT workspace_slug_format CHECK (
        slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
        AND length(slug) BETWEEN 3 AND 30
    );
