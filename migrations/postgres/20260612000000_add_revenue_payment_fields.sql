-- =============================================================================
-- W4 revenue_payment — additive columns + centavo `amount` migration (Option A)
--   public.revenue_payment  +5 text cols (payment_method/received_by/received_role/
--                           notes/payment_date) + amount_centavos bigint (backfilled)
-- =============================================================================
--
-- CONTEXT (docs/plan/20260612-datasource-typed-path/w4-revenue-payment.md §3):
-- revenue_payment EXISTS at baseline (20260502000000_baseline.sql:3206) with 11
-- columns. The new typed proto/adapter (W4) writes 5 metadata columns that have
-- no column today (silently dropped on every write by PostgresOperations.Create),
-- and models the payment amount as `int64 // centavos` to align with the
-- schema-wide centavo convention (revenue.total_amount / revenue_line_item.* are
-- all bigint centavos). The live `amount` column is an outlier numeric(15,2).
--
-- This migration is STRICTLY ADDITIVE (schema-migrations.md "Strict rules now
-- that users exist" — live users since 2026-05-04):
--   * 5 new columns are all OPTIONAL / NULLable text — no NOT NULL, no default
--     that rewrites, no CHECK on the populated table. Precedent: treasury_collection
--     already carries payment_date/received_by/received_role as text
--     (baseline:3730-3746).
--   * amount_centavos is added NULLable + backfilled in place. The existing
--     `amount numeric(15,2)` column is LEFT IN PLACE and untouched. The
--     DESTRUCTIVE step (DROP `amount` / RENAME amount_centavos -> amount) is
--     DEFERRED to a SEPARATE later reader-gated migration — explicitly OUT OF
--     SCOPE here. See the commented Step-2 block at the bottom.
--
-- BACKFILL CORRECTNESS (verified against the local DB 127.0.0.1/professional1,
-- read-only SELECTs only — NO writes performed):
--   `amount` is PESOS-as-decimal (the numeric(15,2) outlier); revenue.total_amount
--   is bigint CENTAVOS. round(amount*100) converts pesos -> centavos. Verified on
--   professional1: all 7 seed rows (rpay-001..rpay-007, invoice/deposit) satisfy
--   round(amount*100) == parent revenue.total_amount exactly — e.g. rpay-001
--   amount=750000.00 -> 75000000 == rev-001.total_amount; the lone deposit
--   (rpay-007) is correctly a partial (450000.00 -> 45000000, half of rev-005's
--   90000000). So round(amount*100)::bigint is the CORRECT, LOAD-BEARING transform
--   (NOT the no-op the design doc assumed): it yields bigint centavos aligned with
--   revenue.total_amount. `amount` is NOT NULL DEFAULT 0, so no NULL rows exist; the
--   WHERE amount_centavos IS NULL guard makes the backfill idempotent.
--
-- CANONICAL-SOURCE NOTE (decided 2026-06-12, user): professional1 is the system of
--   record. Its bigint money columns are already correct centavos at ~PHP-750k scale
--   (populated by an app/off-tree path that x100'd pesos->centavos); revenue_payment.amount
--   is the lone un-migrated pesos outlier this column fixes. The copya seed CSVs are
--   OFF-SCALE (revenue.csv total_amount=750000, x100 smaller) and a verbatim `copya.Seed`
--   (no scaling) would NOT reproduce professional1 — so a review reading only the CSVs
--   will wrongly flag this backfill as a 100x error. It is correct vs the live DB.
--   Rescaling the CSVs to match + the line-item-sum != revenue.total_amount drift in
--   several seed rows are SEPARATE tracked cleanups, not blockers for this migration.
--
-- W5 NOTE: until the deferred Step-2 rename, the W4 adapter binds the proto
-- `amount` field to the `amount_centavos` COLUMN (column-name override). The
-- proto field number/name stays stable across both migration steps.
--
-- Authored directly into the sequence (hand-authored single-file Atlas format),
-- NOT via `pnpm db:diff` from empty — the migration dir cannot replay from empty
-- onto the atlas dev DB (pre-existing: 20260509100000 alters
-- expense_recognition_line before any file creates it), which breaks db:diff.
-- Purely additive; `atlas migrate apply` runs it cleanly at HEAD. Run
-- `pnpm db:hash` after editing this file. (Atlas computes rollbacks from
-- snapshots — no .down.sql; the inverse is DROP of the 6 added columns.)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 5 metadata columns — all OPTIONAL / NULLable text (populated table; additive)
--   payment_method : denormalized collection_method.name snapshot at pay time
--   received_by    : operator who recorded the payment
--   received_role  : operator's role snapshot
--   notes          : free-text note
--   payment_date   : ISO 8601 date string (mirrors treasury_collection.payment_date text)
-- -----------------------------------------------------------------------------
ALTER TABLE public.revenue_payment
    ADD COLUMN payment_method text,
    ADD COLUMN received_by    text,
    ADD COLUMN received_role  text,
    ADD COLUMN notes          text,
    ADD COLUMN payment_date   text;

-- -----------------------------------------------------------------------------
-- amount_centavos — typed bigint centavos (Option A, step 1 of 2)
--   Added NULLable, then backfilled from the legacy numeric `amount` column.
--   The legacy `amount numeric(15,2)` column is intentionally LEFT IN PLACE.
-- -----------------------------------------------------------------------------
ALTER TABLE public.revenue_payment
    ADD COLUMN amount_centavos bigint;

-- Backfill: numeric pesos/decimal-centavos -> integer centavos. round() guards
-- against float dust; the IS NULL predicate makes re-runs idempotent. On this
-- DB every existing row is backfilled to a real non-zero centavo value aligned
-- with the parent revenue.total_amount.
UPDATE public.revenue_payment
   SET amount_centavos = round(amount * 100)::bigint
 WHERE amount_centavos IS NULL;

-- =============================================================================
-- DEFERRED — DO NOT INCLUDE HERE. Step 2 (a SEPARATE later migration) once all
-- W5 readers have cut over from `amount` to `amount_centavos`:
--
--   ALTER TABLE public.revenue_payment DROP COLUMN amount;                       -- DESTRUCTIVE — drop-column playbook
--   ALTER TABLE public.revenue_payment RENAME COLUMN amount_centavos TO amount;  -- rename only with all readers updated
--
-- These are destructive / reader-breaking and require the written-plan + backup +
-- maintenance-window playbook (schema-migrations.md "What you must not do without
-- an explicit playbook"). EXPLICITLY OUT OF SCOPE for this migration.
-- =============================================================================
