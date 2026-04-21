-- Migration: pricing_unification_data_migration (up)
-- Dialect: postgres
-- Created: 2026-04-21T14:00:00Z
--
-- ════════════════════════════════════════════════════════════════════════════
--                 TEMPLATE — REQUIRES PER-VERTICAL REVIEW
-- ════════════════════════════════════════════════════════════════════════════
--
-- Phase 1 of the pricing unification (see docs/plan/20260421-pricing-unification/plan.md).
-- Migrates data from the legacy retail pricing stack (price_list + price_product)
-- into the unified spine (price_schedule + plan + price_plan + product_price_plan),
-- and classifies every existing price_plan row with the new billing_kind / amount_basis /
-- billing_cycle_* / default_term_* fields added by Phase 0.
--
-- ⚠ BLOCKER: sections marked [[CLASSIFY]] require human vertical-reviewer input
-- before this migration can run. DO NOT apply this migration as-is.
--
-- Prerequisites:
--   1. Phase 0 DDL migration (20260421130000_pricing_unification_fields) must have
--      applied successfully — its columns (billing_kind, amount_basis, billing_cycle_*,
--      default_term_* on price_plan; billing_treatment, date_start, date_end on
--      product_price_plan) are referenced below.
--   2. All per-vertical [[CLASSIFY]] blocks must be filled in by the reviewer before
--      the invariant check at the end can be uncommented and run.
--
-- Idempotency: every INSERT uses WHERE NOT EXISTS guards. The migration is safe to
-- re-run if interrupted, but Steps 1-4 will skip already-migrated rows.
-- Step 5 (billing classification) UPDATEs are reviewer-provided and idempotent by
-- nature (SET x = constant WHERE id IN (...)).

BEGIN;

-- ────────────────────────────────────────────────────────────────────────────
-- TRAIL COLUMNS: migration provenance
-- ────────────────────────────────────────────────────────────────────────────
-- These columns record the legacy row ancestry so we can audit, trace, and
-- reverse the migration if needed. They are kept until Phase 4 (delete legacy tables).
-- Phase 3 drops legacy FK columns from revenue_line_item; these trail columns
-- stay until Phase 4 fully deletes price_list / price_product.

ALTER TABLE price_schedule
    ADD COLUMN IF NOT EXISTS legacy_price_list_id TEXT;
CREATE INDEX IF NOT EXISTS idx_price_schedule_legacy_price_list_id
    ON price_schedule(legacy_price_list_id)
    WHERE legacy_price_list_id IS NOT NULL;

ALTER TABLE plan
    ADD COLUMN IF NOT EXISTS legacy_price_list_id TEXT;
CREATE INDEX IF NOT EXISTS idx_plan_legacy_price_list_id
    ON plan(legacy_price_list_id)
    WHERE legacy_price_list_id IS NOT NULL;

ALTER TABLE price_plan
    ADD COLUMN IF NOT EXISTS legacy_price_list_id TEXT;
CREATE INDEX IF NOT EXISTS idx_price_plan_legacy_price_list_id
    ON price_plan(legacy_price_list_id)
    WHERE legacy_price_list_id IS NOT NULL;

-- ────────────────────────────────────────────────────────────────────────────
-- STEP 1: Mirror each price_list → price_schedule
-- ────────────────────────────────────────────────────────────────────────────
-- Every legacy price_list becomes a price_schedule with the same envelope
-- (name, description, location, date range, active).
--
-- NOTE: price_schedule in this DB carries a workspace_id column (added by the
-- 20260417190000_price_plan_schedule_fk migration) that is NOT on price_list.
-- We set workspace_id = NULL here — reviewers should backfill it from their
-- workspace context if workspace isolation is required.
-- [[CLASSIFY]] Set workspace_id per-environment if needed before running.
--
-- date_created / date_modified: price_list stores these as BIGINT (unix ms);
-- price_schedule uses the same type — values are copied directly.
-- date_created_string / date_modified_string: these are display-only columns
-- populated by the app layer on write. We leave them NULL here; the app will
-- populate them on first update after the migration.

INSERT INTO price_schedule (
    id,
    date_created,
    date_modified,
    active,
    name,
    description,
    date_start,
    date_end,
    location_id,
    legacy_price_list_id
)
SELECT
    -- Deterministic ID: 'ps-legacy-' + first 22 chars of md5(price_list.id)
    -- This ensures re-runs produce the same IDs (idempotent).
    -- [[CLASSIFY]] Replace with your ID-generation convention if preferred.
    'ps-legacy-' || substr(md5(pl.id), 1, 22),
    pl.date_created,
    pl.date_modified,
    pl.active,
    pl.name,
    pl.description,
    pl.date_start,
    pl.date_end,
    pl.location_id,
    pl.id
FROM price_list pl
WHERE NOT EXISTS (
    SELECT 1 FROM price_schedule ps
    WHERE ps.legacy_price_list_id = pl.id
);

-- ────────────────────────────────────────────────────────────────────────────
-- STEP 2: Create synthetic plan per legacy price_list
-- ────────────────────────────────────────────────────────────────────────────
-- Each legacy price_list becomes one synthetic "Retail — {name}" Plan.
-- The Plan is a catalog envelope only — billing semantics live on PricePlan below.
--
-- plan.fulfillment_type: column exists in the schema (legacy from before Phase 0).
-- We leave it NULL for synthetic retail plans; it may be dropped in Phase 4.

INSERT INTO plan (
    id,
    date_created,
    date_modified,
    active,
    name,
    description,
    legacy_price_list_id
)
SELECT
    'plan-legacy-' || substr(md5(pl.id), 1, 20),
    pl.date_created,
    pl.date_modified,
    pl.active,
    'Retail — ' || pl.name,
    COALESCE(
        pl.description,
        'Auto-generated during pricing unification from legacy price_list id=' || pl.id
    ),
    pl.id
FROM price_list pl
WHERE NOT EXISTS (
    SELECT 1 FROM plan p
    WHERE p.legacy_price_list_id = pl.id
);

-- ────────────────────────────────────────────────────────────────────────────
-- STEP 3: Create synthetic price_plan per legacy price_list
-- ────────────────────────────────────────────────────────────────────────────
-- Each synthetic Plan gets exactly one PricePlan.
-- Billing semantics for these synthetic rows:
--   billing_kind  = BILLING_KIND_ONE_TIME    (retail: single charge per sale)
--   amount_basis  = AMOUNT_BASIS_DERIVED_FROM_LINES  (price lives on the line items,
--                   not on the plan header — matches legacy price_product.amount)
--
-- price_plan.price_schedule_id FK: references the price_schedule we just created.
-- price_plan.duration_value / duration_unit: these legacy columns are kept in place
-- (not dropped until Phase 3). We set them to 0/'day' as neutral defaults for
-- these synthetic rows — they carry no billing cadence meaning under ONE_TIME.
--
-- NOTE: price_plan.name and price_plan.description are nullable as of
-- 20260419120000_price_plan_name_nullable. We copy them from price_list here;
-- the UI falls back to the parent Plan name when blank.
--
-- [[CLASSIFY]] currency default: 'PHP' is used below. Change per vertical if
-- your environment uses a different base currency.

INSERT INTO price_plan (
    id,
    plan_id,
    name,
    description,
    date_created,
    date_modified,
    active,
    amount,
    currency,
    duration_value,
    duration_unit,
    price_schedule_id,
    billing_kind,
    amount_basis,
    legacy_price_list_id
)
SELECT
    'pp-legacy-' || substr(md5(pl.id), 1, 22),
    p.id,
    pl.name,
    pl.description,
    pl.date_created,
    pl.date_modified,
    pl.active,
    0,                                      -- amount is 0: DERIVED_FROM_LINES ignores this field
    'PHP',                                  -- [[CLASSIFY]] default currency; adjust per vertical
    0,                                      -- duration_value: neutral default for ONE_TIME plans
    'day',                                  -- duration_unit: neutral default; Phase 3 drops both fields
    ps.id,
    'BILLING_KIND_ONE_TIME',
    'AMOUNT_BASIS_DERIVED_FROM_LINES',
    pl.id
FROM price_list pl
JOIN plan          p  ON p.legacy_price_list_id  = pl.id
JOIN price_schedule ps ON ps.legacy_price_list_id = pl.id
WHERE NOT EXISTS (
    SELECT 1 FROM price_plan pp
    WHERE pp.legacy_price_list_id = pl.id
);

-- ────────────────────────────────────────────────────────────────────────────
-- STEP 4: Migrate price_product → product_price_plan
-- ────────────────────────────────────────────────────────────────────────────
-- Each price_product row maps to a product_price_plan row under the synthetic
-- price_plan that was created for its parent price_list.
--
-- price: price_product.amount is in centavos (BIGINT) — copied directly.
--   See CLAUDE.md critical rule: "All monetary amounts in centavos (integer)."
-- billing_treatment: defaults to BILLING_TREATMENT_RECURRING as the schema
--   default. Under a ONE_TIME parent plan this field is ignored by the
--   invoice generator (per plan.md "Invoice generator rules"), but we still
--   set it explicitly for clarity.
-- date_start / date_end: copied from price_product to preserve per-item timing
--   (price_product carries its own date range for time-bounded overrides).
--   Phase 0 added these columns to product_price_plan; they are now populated.
--
-- Uniqueness guard: (price_plan_id, product_id) — one row per product per plan.
-- If price_product has duplicate (product_id, price_list_id) rows (shouldn't happen
-- but guard against it), only the first is inserted; duplicates are skipped.

INSERT INTO product_price_plan (
    id,
    date_created,
    date_modified,
    active,
    price_plan_id,
    product_id,
    price,
    currency,
    billing_treatment,
    date_start,
    date_end
)
SELECT DISTINCT ON (new_pp.id, pp.product_id)
    -- Deterministic ID derived from (price_product.id) for idempotency.
    'ppp-legacy-' || substr(md5(pp.id), 1, 21),
    pp.date_created,
    pp.date_modified,
    pp.active,
    new_pp.id,
    pp.product_id,
    pp.amount,       -- centavos; copied directly
    pp.currency,
    'BILLING_TREATMENT_RECURRING',  -- ignored under ONE_TIME parent; set for schema completeness
    pp.date_start,
    pp.date_end
FROM price_product pp
JOIN price_plan new_pp ON new_pp.legacy_price_list_id = pp.price_list_id
WHERE NOT EXISTS (
    SELECT 1 FROM product_price_plan x
    WHERE x.price_plan_id = new_pp.id
      AND x.product_id    = pp.product_id
);

-- ────────────────────────────────────────────────────────────────────────────
-- STEP 5: Backfill revenue_line_item.product_price_plan_id
-- ────────────────────────────────────────────────────────────────────────────
-- Every revenue_line_item that links to a legacy price_product must now also
-- reference the corresponding product_price_plan row, so that after Phase 3
-- drops price_product_id from revenue_line_item the invoice-line traceability
-- is preserved.
--
-- Join path:
--   revenue_line_item.price_product_id
--     → price_product.id
--     → price_product.price_list_id
--     → price_plan.legacy_price_list_id (the synthetic plan we just created)
--     → product_price_plan.price_plan_id + product_price_plan.product_id = price_product.product_id
--
-- We only update rows where product_price_plan_id IS NULL to avoid overwriting
-- any rows that were already correctly populated by the application.
--
-- After filling in the [[CLASSIFY]] blocks in Step 6, uncomment the invariant
-- check below to confirm 100% coverage before committing the migration.

UPDATE revenue_line_item rli
SET product_price_plan_id = ppp.id
FROM price_product pp
JOIN price_plan new_pp
    ON new_pp.legacy_price_list_id = pp.price_list_id
JOIN product_price_plan ppp
    ON ppp.price_plan_id = new_pp.id
   AND ppp.product_id   = pp.product_id
WHERE rli.price_product_id      = pp.id
  AND rli.product_price_plan_id IS NULL;

-- Invariant check — uncomment AFTER all [[CLASSIFY]] blocks in Step 5 (billing
-- classification) are filled in AND after the UPDATE above is confirmed to have
-- backfilled all rows:
--
-- DO $$ BEGIN
--   IF EXISTS (
--     SELECT 1 FROM revenue_line_item
--     WHERE price_product_id IS NOT NULL
--       AND product_price_plan_id IS NULL
--   ) THEN
--     RAISE EXCEPTION
--       'Migration aborted: % revenue_line_item row(s) have price_product_id set '
--       'but product_price_plan_id is still NULL — backfill incomplete.',
--       (SELECT count(*) FROM revenue_line_item
--        WHERE price_product_id IS NOT NULL AND product_price_plan_id IS NULL);
--   END IF;
-- END $$;

-- ────────────────────────────────────────────────────────────────────────────
-- STEP 6: [[CLASSIFY]] — Backfill billing classification on existing price_plan
-- ────────────────────────────────────────────────────────────────────────────
-- ⚠ STOP HERE. Every pre-existing price_plan row (NOT the synthetic ones created
-- above — those are already classified) needs per-vertical reviewer classification.
-- The 4 detection patterns and their target field values are documented in
-- docs/plan/20260421-pricing-unification/plan.md, "Phase 1: Data migration".
--
-- Replace the stub UPDATE blocks below with one UPDATE per classified batch.
-- Each UPDATE assigns billing_kind, amount_basis, and the appropriate duration
-- split fields (billing_cycle_* or default_term_*).
--
-- Duration unit note: the legacy duration_unit column stored PLURAL units
-- (days/weeks/months/years). The new billing_cycle_unit and default_term_unit
-- fields use SINGULAR (day/week/month/year) to match proto enum conventions.
-- The REGEXP_REPLACE(duration_unit, 's$', '') expression handles the de-pluralisation
-- for common cases. Review edge cases: "weeks" → "week" is fine; confirm your
-- data doesn't contain non-standard values before relying on the regex.
--
-- The synthetic rows inserted in Step 3 already have billing_kind = ONE_TIME
-- and amount_basis = DERIVED_FROM_LINES; exclude them from the classification
-- UPDATEs below by adding: AND legacy_price_list_id IS NULL.
--
-- ── Pattern A: Simple RECURRING ────────────────────────────────────────────
-- Scenario: Glow Club Silver $100/mo, Residential laundry $59/mo, Staff Aug $18k/mo
-- Detection: duration ≤ 12 and unit is month/week/day; name often contains "/mo" or "monthly"
-- Result: billing_kind=RECURRING, amount_basis=PER_CYCLE
--         billing_cycle_value = legacy duration_value
--         billing_cycle_unit  = de-pluralised legacy duration_unit
--         default_term_value  = NULL (open-ended subscription, customer cancels anytime)
--         default_term_unit   = NULL
--
-- [[CLASSIFY]] Pattern A — reviewer fills in the id list:
-- UPDATE price_plan SET
--     billing_kind        = 'BILLING_KIND_RECURRING',
--     amount_basis        = 'AMOUNT_BASIS_PER_CYCLE',
--     billing_cycle_value = duration_value,
--     billing_cycle_unit  = REGEXP_REPLACE(duration_unit, 's$', ''),
--     default_term_value  = NULL,
--     default_term_unit   = NULL
-- WHERE legacy_price_list_id IS NULL
--   AND id IN (
--     -- ⬇ verified list of PricePlan IDs for Pattern A
--     -- 'abc123', 'def456', ...
-- );

-- ── Pattern B: Prepaid package ─────────────────────────────────────────────
-- Scenario: Laser 6-Session $1,200 / 12-month validity; Early Access Pass (free, 3-day)
-- Detection: duration represents validity window, not billing cadence;
--            name includes "session", "package", "pass", "validity", or contains
--            "use within N months"; amount is the full package price (not per-cycle).
-- Result: billing_kind=ONE_TIME, amount_basis=TOTAL_PACKAGE
--         billing_cycle_value = NULL (no recurring billing cycles)
--         billing_cycle_unit  = NULL
--         default_term_value  = legacy duration_value
--         default_term_unit   = de-pluralised legacy duration_unit
--
-- [[CLASSIFY]] Pattern B — reviewer fills in the id list:
-- UPDATE price_plan SET
--     billing_kind        = 'BILLING_KIND_ONE_TIME',
--     amount_basis        = 'AMOUNT_BASIS_TOTAL_PACKAGE',
--     billing_cycle_value = NULL,
--     billing_cycle_unit  = NULL,
--     default_term_value  = duration_value,
--     default_term_unit   = REGEXP_REPLACE(duration_unit, 's$', '')
-- WHERE legacy_price_list_id IS NULL
--   AND id IN (
--     -- 'xyz789', ...
-- );

-- ── Pattern C: Fixed-term contract ─────────────────────────────────────────
-- Scenario: Hotel Linen $15k/mo, 5-year commitment; Fixed Consulting $150k / 6-month engagement
-- Detection: multi-year duration; context indicates periodic billing within a fixed term;
--            may have an explicit contract / engagement document.
-- Result: billing_kind=CONTRACT, amount_basis=PER_CYCLE (or TOTAL_PACKAGE if lump-sum)
--         billing_cycle_value = 1  (monthly billing cycle hardcoded — adjust if not monthly)
--         billing_cycle_unit  = 'month'
--         default_term_value  = legacy duration_value
--         default_term_unit   = de-pluralised legacy duration_unit
--
-- Note for TOTAL_PACKAGE contracts (e.g. "Fixed Consulting $150k for 6 months"):
--   Set billing_cycle_value = NULL, billing_cycle_unit = NULL, amount_basis = TOTAL_PACKAGE.
--
-- [[CLASSIFY]] Pattern C — reviewer fills in the id list:
-- UPDATE price_plan SET
--     billing_kind        = 'BILLING_KIND_CONTRACT',
--     amount_basis        = 'AMOUNT_BASIS_PER_CYCLE',  -- or TOTAL_PACKAGE for lump-sum contracts
--     billing_cycle_value = 1,
--     billing_cycle_unit  = 'month',
--     default_term_value  = duration_value,
--     default_term_unit   = REGEXP_REPLACE(duration_unit, 's$', '')
-- WHERE legacy_price_list_id IS NULL
--   AND id IN (
--     -- 'contract-001', ...
-- );

-- ── Pattern D: Free promo / no-expiry prepaid ───────────────────────────────
-- Scenario: Bag Credits $70, no expiry; Welcome promo (free, indefinite)
-- Detection: duration_value >= 50 (magic "no-expiry" sentinel used in legacy data);
--            OR duration_value = 0; OR plan explicitly means "no expiration".
-- Result: billing_kind=ONE_TIME, amount_basis=TOTAL_PACKAGE
--         billing_cycle_value = NULL
--         billing_cycle_unit  = NULL
--         default_term_value  = NULL  (explicitly clear — no magic 99-year sentinel)
--         default_term_unit   = NULL
--
-- IMPORTANT: clearing default_term_value to NULL removes the magic sentinel.
-- After Phase 3 drops duration_value/duration_unit, the cleared value is the
-- authoritative signal for "open-ended / no expiration".
--
-- [[CLASSIFY]] Pattern D — reviewer fills in the id list:
-- UPDATE price_plan SET
--     billing_kind        = 'BILLING_KIND_ONE_TIME',
--     amount_basis        = 'AMOUNT_BASIS_TOTAL_PACKAGE',
--     billing_cycle_value = NULL,
--     billing_cycle_unit  = NULL,
--     default_term_value  = NULL,
--     default_term_unit   = NULL
-- WHERE legacy_price_list_id IS NULL
--   AND id IN (
--     -- include all rows where duration_value >= 50 (magic sentinel), e.g.:
--     -- SELECT id FROM price_plan WHERE duration_value >= 50 AND legacy_price_list_id IS NULL
-- );

-- ── Pattern E: Derived-from-lines (variable / per-deliverable) ──────────────
-- Scenario: Tax Advisory $0 header price, per-deliverable billing; Corporate Wellness
-- Detection: amount = 0 AND product_price_plan rows exist under this plan with non-zero prices
-- Result: billing_kind=CONTRACT, amount_basis=DERIVED_FROM_LINES
--         billing_cycle_value = NULL (or set per engagement contract)
--         billing_cycle_unit  = NULL
--         default_term_value  = legacy duration_value (engagement validity)
--         default_term_unit   = de-pluralised legacy duration_unit
--
-- [[CLASSIFY]] Pattern E — reviewer fills in the id list:
-- UPDATE price_plan SET
--     billing_kind        = 'BILLING_KIND_CONTRACT',
--     amount_basis        = 'AMOUNT_BASIS_DERIVED_FROM_LINES',
--     billing_cycle_value = NULL,
--     billing_cycle_unit  = NULL,
--     default_term_value  = duration_value,
--     default_term_unit   = REGEXP_REPLACE(duration_unit, 's$', '')
-- WHERE legacy_price_list_id IS NULL
--   AND id IN (
--     -- rows where amount = 0 and line items carry prices
-- );

-- ────────────────────────────────────────────────────────────────────────────
-- INVARIANT CHECK: all non-synthetic price_plan rows classified
-- ────────────────────────────────────────────────────────────────────────────
-- Uncomment ONLY after all [[CLASSIFY]] blocks above are filled in. This check
-- intentionally excludes the synthetic rows (legacy_price_list_id IS NOT NULL)
-- since those are already set to BILLING_KIND_ONE_TIME.
--
-- DO $$ BEGIN
--   IF EXISTS (
--     SELECT 1 FROM price_plan
--     WHERE billing_kind = 'BILLING_KIND_UNSPECIFIED'
--       AND legacy_price_list_id IS NULL
--   ) THEN
--     RAISE EXCEPTION
--       'Migration aborted: % pre-existing price_plan row(s) still have '
--       'BILLING_KIND_UNSPECIFIED — all must be classified before applying.',
--       (SELECT count(*) FROM price_plan
--        WHERE billing_kind = 'BILLING_KIND_UNSPECIFIED'
--          AND legacy_price_list_id IS NULL);
--   END IF;
-- END $$;

COMMIT;
