BEGIN;
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
COMMIT;
