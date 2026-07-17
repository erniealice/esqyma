-- =============================================================================
-- outcome_criteria domain/code lookup index — the NON-unique, ALL-rows composite
-- that backs the use-case code-collision pre-check (create/update validation
-- reads active rows — draft OR published — by (scope, workspace_id, industry_code,
-- code)). The existing partial UNIQUE (uq_outcome_criteria_published_domain_code,
-- migration 20260718000001) constrains only active+PUBLISHED rows, so it cannot
-- serve a lookup that also spans active drafts; the single-column
-- idx_outcome_criteria_code (20260718000000) is too coarse for the domain grain.
--
-- 1 additive index:
--   idx_outcome_criteria_code_domain
--     (scope, COALESCE(workspace_id,''), COALESCE(industry_code,''), code)
--     WHERE code IS NOT NULL
--
-- Grain mirrors the partial unique's COALESCE key exactly so the two indexes
-- describe the same domain tuple (one enforces, one accelerates the read-side
-- pre-check). NOT unique — many active versions of one lineage legitimately share
-- the same (domain, code).
--
-- Purely additive + idempotent (CREATE INDEX IF NOT EXISTS). No explicit
-- BEGIN/COMMIT (atlas wraps each file, txmode=file). Authored directly into the
-- sequence (NOT via db:diff) for the replay reason documented in 20260718000000 /
-- 20260718000001.
-- =============================================================================

CREATE INDEX IF NOT EXISTS "idx_outcome_criteria_code_domain"
  ON "outcome_criteria" ("scope", COALESCE("workspace_id", ''), COALESCE("industry_code", ''), "code")
  WHERE "code" IS NOT NULL;
