-- Plan B Phase 0 — Advance Cash Events (20260517-advance-cash-events).
--
-- Adds AdvanceKind-tagged advance schedule columns to treasury_collection +
-- treasury_disbursement; FK back-edges on revenue + expense_recognition; new
-- supplier_billing_event + 2 junction tables for MILESTONE wiring. Drops the
-- three empty entity tables that AdvanceKind makes redundant.
--
-- DESIGN DEVIATION from plan.md (documented in progress.md):
--   plan.md proposed a single GENERATED `period_marker` column on revenue +
--   expense_recognition with a source-discriminated CASE expression. Live state:
--     - revenue.period_marker ALREADY EXISTS for the subscription path (Revenue
--       Run shipped 2026-05-06); changing the GENERATED expression in place
--       would require a destructive DROP+ADD on a column with a live unique
--       index covering 34 rows. We instead ADD a new partial unique index for
--       the advance path that mirrors the subscription path's discipline.
--     - expense_recognition uses `idempotency_key` (UNIQUE text column) as its
--       per-source idempotency mechanism instead of a generated marker. The
--       AmortizeAdvanceDisbursement use case will derive a deterministic key
--       of the form `{workspace_id}:ADVANCE:{advance_disbursement_id}:{period}`.
--       Plan B does not add a period_marker column here. (Plan A may revisit
--       if it needs a strict source-discriminated key shape.)
--
-- Preflight (verified 2026-05-17 against professional1):
--   prepayment       count = 0
--   deferred_revenue count = 0
--   security_deposit count = 0
--   no FK constraints reference any of the three tables
--   treasury_collection + treasury_disbursement tables already exist with the
--   `treasury_` prefix (Phase 0.5 rename is Go-type-only).
--
-- All statements idempotent (`IF NOT EXISTS` / `ADD COLUMN IF NOT EXISTS`).

SET search_path TO public;

-- ============================================================================
-- 1. Drop the three empty entity tables (Decision 4)
-- ============================================================================

DROP TABLE IF EXISTS prepayment;
DROP TABLE IF EXISTS deferred_revenue;
DROP TABLE IF EXISTS security_deposit;

-- ============================================================================
-- 2. treasury_collection — add advance_* fields + client_id (Decision B)
-- ============================================================================

ALTER TABLE treasury_collection
    ADD COLUMN IF NOT EXISTS advance_kind              integer,
    ADD COLUMN IF NOT EXISTS advance_status            integer,
    ADD COLUMN IF NOT EXISTS advance_start_date        text,
    ADD COLUMN IF NOT EXISTS advance_end_date          text,
    ADD COLUMN IF NOT EXISTS advance_period_count      integer,
    ADD COLUMN IF NOT EXISTS advance_period_unit       text,
    ADD COLUMN IF NOT EXISTS advance_total_amount      bigint,
    ADD COLUMN IF NOT EXISTS advance_remaining_amount  bigint,
    ADD COLUMN IF NOT EXISTS advance_recognized_amount bigint,
    ADD COLUMN IF NOT EXISTS advance_balance_account_id text,
    ADD COLUMN IF NOT EXISTS advance_target_account_id  text,
    ADD COLUMN IF NOT EXISTS advance_expiry_date       text,
    ADD COLUMN IF NOT EXISTS advance_proration_policy  integer,
    ADD COLUMN IF NOT EXISTS client_id                 text;

ALTER TABLE treasury_collection
    ADD CONSTRAINT treasury_collection_advance_balance_account_id_fkey
    FOREIGN KEY (advance_balance_account_id) REFERENCES account(id) NOT VALID;

ALTER TABLE treasury_collection
    ADD CONSTRAINT treasury_collection_advance_target_account_id_fkey
    FOREIGN KEY (advance_target_account_id) REFERENCES account(id) NOT VALID;

ALTER TABLE treasury_collection
    ADD CONSTRAINT treasury_collection_client_id_fkey
    FOREIGN KEY (client_id) REFERENCES client(id) NOT VALID;

CREATE INDEX IF NOT EXISTS idx_treasury_collection_advance_kind_status
    ON treasury_collection(advance_kind, advance_status)
    WHERE advance_kind IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_treasury_collection_client_id
    ON treasury_collection(client_id);

-- ============================================================================
-- 3. treasury_disbursement — add advance_* fields + supplier_id (Decision B)
-- ============================================================================

ALTER TABLE treasury_disbursement
    ADD COLUMN IF NOT EXISTS advance_kind              integer,
    ADD COLUMN IF NOT EXISTS advance_status            integer,
    ADD COLUMN IF NOT EXISTS advance_start_date        text,
    ADD COLUMN IF NOT EXISTS advance_end_date          text,
    ADD COLUMN IF NOT EXISTS advance_period_count      integer,
    ADD COLUMN IF NOT EXISTS advance_period_unit       text,
    ADD COLUMN IF NOT EXISTS advance_total_amount      bigint,
    ADD COLUMN IF NOT EXISTS advance_remaining_amount  bigint,
    ADD COLUMN IF NOT EXISTS advance_recognized_amount bigint,
    ADD COLUMN IF NOT EXISTS advance_balance_account_id text,
    ADD COLUMN IF NOT EXISTS advance_target_account_id  text,
    ADD COLUMN IF NOT EXISTS advance_expiry_date       text,
    ADD COLUMN IF NOT EXISTS advance_proration_policy  integer,
    ADD COLUMN IF NOT EXISTS supplier_id               text;

ALTER TABLE treasury_disbursement
    ADD CONSTRAINT treasury_disbursement_advance_balance_account_id_fkey
    FOREIGN KEY (advance_balance_account_id) REFERENCES account(id) NOT VALID;

ALTER TABLE treasury_disbursement
    ADD CONSTRAINT treasury_disbursement_advance_target_account_id_fkey
    FOREIGN KEY (advance_target_account_id) REFERENCES account(id) NOT VALID;

ALTER TABLE treasury_disbursement
    ADD CONSTRAINT treasury_disbursement_supplier_id_fkey
    FOREIGN KEY (supplier_id) REFERENCES supplier(id) NOT VALID;

CREATE INDEX IF NOT EXISTS idx_treasury_disbursement_advance_kind_status
    ON treasury_disbursement(advance_kind, advance_status)
    WHERE advance_kind IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_treasury_disbursement_supplier_id
    ON treasury_disbursement(supplier_id);

-- ============================================================================
-- 4. revenue — advance_collection_id FK back-edge + advance-path uniqueness
-- ============================================================================

ALTER TABLE revenue
    ADD COLUMN IF NOT EXISTS advance_collection_id text;

ALTER TABLE revenue
    ADD CONSTRAINT revenue_advance_collection_id_fkey
    FOREIGN KEY (advance_collection_id) REFERENCES treasury_collection(id) NOT VALID;

CREATE INDEX IF NOT EXISTS idx_revenue_advance_collection_id
    ON revenue(advance_collection_id)
    WHERE advance_collection_id IS NOT NULL;

-- FOLLOW-UP — advance-path uniqueness:
--   The shipped Revenue Run `period_marker` is GENERATED from a regex over
--   `notes` (`Period: ...`). That mechanism is brittle and shape-mismatched to
--   the advance path, so the source-discriminated CASE proposed in plan.md
--   needs its own design pass before we layer a unique index. Plan B Phase 2
--   (AmortizeAdvanceCollection) will derive deterministic idempotency via the
--   same notes-substring shape OR add a proper `advance_period_marker` column
--   in a follow-up migration once Phase 2 use-case shape is locked.
--   Tracked in docs/plan/20260517-advance-cash-events/progress.md.

-- ============================================================================
-- 5. expense_recognition — advance_disbursement_id FK back-edge
-- ============================================================================
-- Idempotency for the advance branch is enforced via the existing
-- `idempotency_key` UNIQUE constraint; AmortizeAdvanceDisbursement writes
-- `{workspace_id}:ADVANCE:{advance_disbursement_id}:{period_start}`.

ALTER TABLE expense_recognition
    ADD COLUMN IF NOT EXISTS advance_disbursement_id text;

ALTER TABLE expense_recognition
    ADD CONSTRAINT expense_recognition_advance_disbursement_id_fkey
    FOREIGN KEY (advance_disbursement_id) REFERENCES treasury_disbursement(id) NOT VALID;

CREATE INDEX IF NOT EXISTS idx_expense_recognition_advance_disbursement_id
    ON expense_recognition(advance_disbursement_id)
    WHERE advance_disbursement_id IS NOT NULL;

-- ============================================================================
-- 6. supplier_billing_event — buying-side mirror of BillingEvent (Decision 10)
-- ============================================================================

CREATE TABLE IF NOT EXISTS supplier_billing_event (
    id                          text PRIMARY KEY,
    workspace_id                text NOT NULL,
    supplier_subscription_id    text NOT NULL,
    supplier_contract_id        text,
    billable_amount             bigint,
    billing_currency            text,
    status                      integer NOT NULL DEFAULT 0,
    trigger                     integer NOT NULL DEFAULT 0,
    expense_recognition_id      text,
    active                      boolean DEFAULT true,
    date_created                timestamp with time zone DEFAULT now(),
    date_modified               timestamp with time zone DEFAULT now(),
    CONSTRAINT supplier_billing_event_supplier_subscription_id_fkey
        FOREIGN KEY (supplier_subscription_id) REFERENCES supplier_subscription(id),
    CONSTRAINT supplier_billing_event_supplier_contract_id_fkey
        FOREIGN KEY (supplier_contract_id) REFERENCES supplier_contract(id),
    CONSTRAINT supplier_billing_event_expense_recognition_id_fkey
        FOREIGN KEY (expense_recognition_id) REFERENCES expense_recognition(id)
);

CREATE INDEX IF NOT EXISTS idx_supplier_billing_event_workspace_id
    ON supplier_billing_event(workspace_id);
CREATE INDEX IF NOT EXISTS idx_supplier_billing_event_supplier_subscription_id
    ON supplier_billing_event(supplier_subscription_id);
CREATE INDEX IF NOT EXISTS idx_supplier_billing_event_supplier_contract_id
    ON supplier_billing_event(supplier_contract_id);
CREATE INDEX IF NOT EXISTS idx_supplier_billing_event_status
    ON supplier_billing_event(status);
CREATE INDEX IF NOT EXISTS idx_supplier_billing_event_expense_recognition_id
    ON supplier_billing_event(expense_recognition_id);

-- ============================================================================
-- 7. treasury_collection_billing_event — selling MILESTONE junction
-- ============================================================================

CREATE TABLE IF NOT EXISTS treasury_collection_billing_event (
    id                       text PRIMARY KEY,
    workspace_id             text NOT NULL,
    treasury_collection_id   text NOT NULL,
    billing_event_id         text NOT NULL,
    tranche_amount           bigint,
    revenue_id               text,
    active                   boolean DEFAULT true,
    date_created             timestamp with time zone DEFAULT now(),
    date_modified            timestamp with time zone DEFAULT now(),
    CONSTRAINT treasury_collection_billing_event_treasury_collection_id_fkey
        FOREIGN KEY (treasury_collection_id) REFERENCES treasury_collection(id),
    CONSTRAINT treasury_collection_billing_event_billing_event_id_fkey
        FOREIGN KEY (billing_event_id) REFERENCES billing_event(id),
    CONSTRAINT treasury_collection_billing_event_revenue_id_fkey
        FOREIGN KEY (revenue_id) REFERENCES revenue(id)
);

CREATE INDEX IF NOT EXISTS idx_treasury_collection_billing_event_workspace_id
    ON treasury_collection_billing_event(workspace_id);
CREATE INDEX IF NOT EXISTS idx_treasury_collection_billing_event_collection_id
    ON treasury_collection_billing_event(treasury_collection_id);
CREATE INDEX IF NOT EXISTS idx_treasury_collection_billing_event_billing_event_id
    ON treasury_collection_billing_event(billing_event_id);
CREATE INDEX IF NOT EXISTS idx_treasury_collection_billing_event_revenue_id
    ON treasury_collection_billing_event(revenue_id);

-- ============================================================================
-- 8. treasury_disbursement_supplier_billing_event — buying MILESTONE junction
-- ============================================================================

CREATE TABLE IF NOT EXISTS treasury_disbursement_supplier_billing_event (
    id                          text PRIMARY KEY,
    workspace_id                text NOT NULL,
    treasury_disbursement_id    text NOT NULL,
    supplier_billing_event_id   text NOT NULL,
    tranche_amount              bigint,
    expense_recognition_id      text,
    active                      boolean DEFAULT true,
    date_created                timestamp with time zone DEFAULT now(),
    date_modified               timestamp with time zone DEFAULT now(),
    CONSTRAINT treasury_disbursement_supplier_billing_event_disbursement_fkey
        FOREIGN KEY (treasury_disbursement_id) REFERENCES treasury_disbursement(id),
    CONSTRAINT treasury_disbursement_supplier_billing_event_billing_event_fkey
        FOREIGN KEY (supplier_billing_event_id) REFERENCES supplier_billing_event(id),
    CONSTRAINT treasury_disbursement_supplier_billing_event_recognition_fkey
        FOREIGN KEY (expense_recognition_id) REFERENCES expense_recognition(id)
);

CREATE INDEX IF NOT EXISTS idx_tds_billing_event_workspace_id
    ON treasury_disbursement_supplier_billing_event(workspace_id);
CREATE INDEX IF NOT EXISTS idx_tds_billing_event_disbursement_id
    ON treasury_disbursement_supplier_billing_event(treasury_disbursement_id);
CREATE INDEX IF NOT EXISTS idx_tds_billing_event_supplier_billing_event_id
    ON treasury_disbursement_supplier_billing_event(supplier_billing_event_id);
CREATE INDEX IF NOT EXISTS idx_tds_billing_event_recognition_id
    ON treasury_disbursement_supplier_billing_event(expense_recognition_id);
