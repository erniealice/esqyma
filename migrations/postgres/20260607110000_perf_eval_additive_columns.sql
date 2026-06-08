-- =============================================================================
-- Performance Evaluation §E1 / §E8 Stage A — additive columns on POPULATED tables
--   entity/staff         +6 columns (Identity = the leased human)
--   product_price_plan   +2 columns (the Offering's advertised rate band)
-- =============================================================================
--
-- BOTH tables are POPULATED live tables. Per the additive-only invariant
-- (schema-migrations.md "Strict rules now that users exist"), every column added
-- here is OPTIONAL / NULLable — NO NOT NULL, NO default that rewrites, NO CHECK
-- on the populated table. The proto fields are likewise `optional`.
--
-- staff occupied field numbers before this change: 1..8 (no reserved). The proto
-- adds fields 9..14; the columns below are their snake_case mirrors. `status` and
-- `employment_type` stay TEXT (existing-entity convention — staff keeps string
-- status + active; employment_type values come from the EmploymentType enum but
-- are persisted as free text, NOT a CHECK-pinned column, to remain additive-safe).
--
-- NOTE: authored directly into the sequence (not via `pnpm db:diff`) — the
-- migration dir cannot be replayed from empty onto the atlas dev DB
-- (pre-existing: 20260509100000 alters expense_recognition_line before any file
-- creates it), which blocks db:diff. Purely additive; `atlas migrate apply` runs
-- it cleanly at HEAD. Run `pnpm db:hash` after editing.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- entity/staff +6 (all OPTIONAL / NULLable — populated table)
-- -----------------------------------------------------------------------------
ALTER TABLE public.staff
    ADD COLUMN workspace_id     text,   -- FK -> workspace (multi-tenant scope); indexed below
    ADD COLUMN status           text,   -- AVAILABILITY: available|assigned|bench|offboarded (active = status NOT IN {offboarded})
    ADD COLUMN employment_type  text,   -- EMPLOYMENT model (EmploymentType values): EMPLOYED|CONTRACTOR|EXTERNAL|PARTNER|RETAINED|SUBCONTRACTOR
    ADD COLUMN seniority        text,   -- display snapshot; canonical rank lives on ProductVariant/ProductOption
    ADD COLUMN employment_start text,   -- ISO 8601
    ADD COLUMN employment_end   text;   -- ISO 8601 (NULL = active)

-- FK for the new workspace scope. NOT VALID so it does not scan/lock the populated
-- table; existing rows (workspace_id NULL) are exempt from the constraint. A later
-- migration may VALIDATE after backfill.
ALTER TABLE public.staff
    ADD CONSTRAINT staff_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace (id) NOT VALID;

-- partial index on the new tenant scope (only non-null rows)
CREATE INDEX idx_staff_workspace_id ON public.staff (workspace_id) WHERE workspace_id IS NOT NULL;

-- -----------------------------------------------------------------------------
-- product_price_plan +2 (centavos band; OPTIONAL — populated table)
-- -----------------------------------------------------------------------------
ALTER TABLE public.product_price_plan
    ADD COLUMN billing_amount_min bigint,   -- centavos — advertised band floor
    ADD COLUMN billing_amount_max bigint;   -- centavos — advertised band ceiling
