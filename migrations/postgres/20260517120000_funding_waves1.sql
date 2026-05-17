-- ============================================================
-- Funding Waves 1 — Fund, FundAllocation, FundTransaction
--
-- Phase FS-B of docs/plan/20260517-orchestration/goal-fund-sources.md
--
-- Wave 1: fund            — global (NO workspace_id); first deliberate
--                           cross-workspace-boundary entity
-- Wave 2: fund_allocation — workspace-scoped junction bridging the boundary
-- Wave 3: fund_transaction — workspace-scoped event log (workspace_id nullable
--                            for fund-global events such as OPENING_BALANCE)
-- View:   fund_transaction_posted — filtered to status = 2 (POSTED)
--
-- Design notes:
-- * All enum columns stored as INTEGER (proto3 default numeric wire format).
-- * FundTransactionStatus: DRAFT=1, POSTED=2, VOIDED=3.
-- * owner_party_id intentionally has NO FK constraint (polymorphic; targets
--   user/workspace/admin depending on owner_party_type).
-- * transfer_id intentionally has NO FK constraint ("transfer" is not its own
--   entity row; it is a shared UUID pairing TRANSFER_OUT + TRANSFER_IN).
-- * All new tables + constraints + indexes use IF NOT EXISTS guards for safe
--   idempotent re-application.
-- * FK constraints use NOT VALID to avoid full-table validation on large DBs.
-- ============================================================

SET search_path TO public;

-- ============================================================
-- WAVE 1 — fund  (GLOBAL — no workspace_id)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.fund (
    -- Standard header
    id                          text        NOT NULL,
    date_created                bigint,
    date_created_string         text,
    date_modified               bigint,
    date_modified_string        text,
    active                      boolean     NOT NULL DEFAULT true,

    -- Identity
    name                        text        NOT NULL,
    description                 text,
    kind                        integer     NOT NULL DEFAULT 0,   -- FundKind enum

    -- Polymorphic owner (no FK constraint — see design note above)
    owner_party_type            integer     NOT NULL DEFAULT 0,   -- FundOwnerPartyType enum
    owner_party_id              text        NOT NULL,

    -- Currency + limit
    currency                    text        NOT NULL,             -- ISO 4217
    authorized_limit            bigint      NOT NULL DEFAULT 0,   -- centavos in source currency

    -- GL traceability
    gl_account_id               text,                             -- FK → account(id)

    -- Sharing flag
    shared                      boolean     NOT NULL DEFAULT false,

    -- Lifecycle
    status                      integer     NOT NULL DEFAULT 0,   -- FundStatus enum

    -- Audit + provider linkage
    external_ref                text,
    linked_by_user_id           text,                             -- FK → user(id)

    -- ── Kind-specific flat columns ──────────────────────────────────────
    -- Shared (BANK_ACCOUNT / CREDIT_LINE / CREDIT_CARD / PREPAID_CARD):
    institution_name            text,
    last_four                   text,

    -- BANK_ACCOUNT-specific:
    bank_account_number         text,
    bank_swift                  text,
    bank_iban                   text,
    bank_branch                 text,

    -- PETTY_CASH-specific:
    petty_custodian_user_id     text,                             -- FK → user(id)
    petty_float_ceiling         bigint,                           -- centavos; "replenish-to" target
    petty_source_fund_id        text,                             -- FK → fund(id)

    -- CREDIT_LINE / CREDIT_CARD-specific:
    credit_agreement_reference  text,
    statement_close_day         integer,                          -- 1-31

    -- CREDIT_CARD-specific:
    card_brand                  text,                             -- "Visa" | "Mastercard" | "Amex"
    card_expiry_month           integer,                          -- 1-12
    card_expiry_year            integer,                          -- 4-digit

    -- MOBILE_MONEY-specific:
    mobile_provider_name        text,                             -- "GCash" | "Maya" | "M-Pesa"
    mobile_masked_phone         text                              -- "+63 9XX XXX 1234"
);

ALTER TABLE ONLY public.fund
    ADD CONSTRAINT fund_pkey PRIMARY KEY (id);

-- GL account FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_gl_account_id_fkey'
          AND table_name = 'fund'
    ) THEN
        ALTER TABLE ONLY public.fund
            ADD CONSTRAINT fund_gl_account_id_fkey
                FOREIGN KEY (gl_account_id) REFERENCES public.account(id)
                NOT VALID;
    END IF;
END;
$$;

-- linked_by_user_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_linked_by_user_id_fkey'
          AND table_name = 'fund'
    ) THEN
        ALTER TABLE ONLY public.fund
            ADD CONSTRAINT fund_linked_by_user_id_fkey
                FOREIGN KEY (linked_by_user_id) REFERENCES public."user"(id)
                NOT VALID;
    END IF;
END;
$$;

-- petty_custodian_user_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_petty_custodian_user_id_fkey'
          AND table_name = 'fund'
    ) THEN
        ALTER TABLE ONLY public.fund
            ADD CONSTRAINT fund_petty_custodian_user_id_fkey
                FOREIGN KEY (petty_custodian_user_id) REFERENCES public."user"(id)
                NOT VALID;
    END IF;
END;
$$;

-- petty_source_fund_id self-FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_petty_source_fund_id_fkey'
          AND table_name = 'fund'
    ) THEN
        ALTER TABLE ONLY public.fund
            ADD CONSTRAINT fund_petty_source_fund_id_fkey
                FOREIGN KEY (petty_source_fund_id) REFERENCES public.fund(id)
                NOT VALID;
    END IF;
END;
$$;

-- Partial unique index: one non-archived name per owner
CREATE UNIQUE INDEX IF NOT EXISTS uq_fund_owner_name_active
    ON public.fund (owner_party_type, owner_party_id, name)
    WHERE status != 4;  -- 4 = FUND_STATUS_ARCHIVED

-- Single-column indexes
CREATE INDEX IF NOT EXISTS idx_fund_owner_party_type
    ON public.fund USING btree (owner_party_type);

CREATE INDEX IF NOT EXISTS idx_fund_owner_party_id
    ON public.fund USING btree (owner_party_id);

CREATE INDEX IF NOT EXISTS idx_fund_kind
    ON public.fund USING btree (kind);

CREATE INDEX IF NOT EXISTS idx_fund_status
    ON public.fund USING btree (status);

CREATE INDEX IF NOT EXISTS idx_fund_gl_account_id
    ON public.fund USING btree (gl_account_id)
    WHERE gl_account_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_fund_linked_by_user_id
    ON public.fund USING btree (linked_by_user_id)
    WHERE linked_by_user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_fund_petty_custodian_user_id
    ON public.fund USING btree (petty_custodian_user_id)
    WHERE petty_custodian_user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_fund_petty_source_fund_id
    ON public.fund USING btree (petty_source_fund_id)
    WHERE petty_source_fund_id IS NOT NULL;

-- ============================================================
-- WAVE 2 — fund_allocation  (workspace-scoped junction)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.fund_allocation (
    -- Standard header
    id                          text        NOT NULL,
    date_created                bigint,
    date_created_string         text,
    date_modified               bigint,
    date_modified_string        text,
    active                      boolean     NOT NULL DEFAULT true,

    -- Cross-boundary FKs
    fund_id                     text        NOT NULL,             -- FK → fund(id)
    workspace_id                text        NOT NULL,             -- FK → workspace(id)

    -- Allocation terms
    mode                        integer     NOT NULL DEFAULT 0,   -- FundAllocationMode enum
    allocated_limit             bigint      NOT NULL DEFAULT 0,   -- centavos in source currency

    -- GL account pointers (workspace-local CoA rows)
    payable_account_id          text,                             -- FK → account(id)
    default_cash_account_id     text,                             -- FK → account(id)

    -- Lifecycle
    status                      integer     NOT NULL DEFAULT 0,   -- FundAllocationStatus enum

    -- Audit
    approved_by_user_id         text                              -- FK → user(id)
);

ALTER TABLE ONLY public.fund_allocation
    ADD CONSTRAINT fund_allocation_pkey PRIMARY KEY (id);

-- fund_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_allocation_fund_id_fkey'
          AND table_name = 'fund_allocation'
    ) THEN
        ALTER TABLE ONLY public.fund_allocation
            ADD CONSTRAINT fund_allocation_fund_id_fkey
                FOREIGN KEY (fund_id) REFERENCES public.fund(id)
                NOT VALID;
    END IF;
END;
$$;

-- workspace_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_allocation_workspace_id_fkey'
          AND table_name = 'fund_allocation'
    ) THEN
        ALTER TABLE ONLY public.fund_allocation
            ADD CONSTRAINT fund_allocation_workspace_id_fkey
                FOREIGN KEY (workspace_id) REFERENCES public.workspace(id)
                NOT VALID;
    END IF;
END;
$$;

-- payable_account_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_allocation_payable_account_id_fkey'
          AND table_name = 'fund_allocation'
    ) THEN
        ALTER TABLE ONLY public.fund_allocation
            ADD CONSTRAINT fund_allocation_payable_account_id_fkey
                FOREIGN KEY (payable_account_id) REFERENCES public.account(id)
                NOT VALID;
    END IF;
END;
$$;

-- default_cash_account_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_allocation_default_cash_account_id_fkey'
          AND table_name = 'fund_allocation'
    ) THEN
        ALTER TABLE ONLY public.fund_allocation
            ADD CONSTRAINT fund_allocation_default_cash_account_id_fkey
                FOREIGN KEY (default_cash_account_id) REFERENCES public.account(id)
                NOT VALID;
    END IF;
END;
$$;

-- approved_by_user_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_allocation_approved_by_user_id_fkey'
          AND table_name = 'fund_allocation'
    ) THEN
        ALTER TABLE ONLY public.fund_allocation
            ADD CONSTRAINT fund_allocation_approved_by_user_id_fkey
                FOREIGN KEY (approved_by_user_id) REFERENCES public."user"(id)
                NOT VALID;
    END IF;
END;
$$;

-- Partial unique: one ACTIVE allocation per (fund, workspace)
-- status = 1 → FUND_ALLOCATION_STATUS_ACTIVE
CREATE UNIQUE INDEX IF NOT EXISTS uq_fund_allocation_active_per_fund_workspace
    ON public.fund_allocation (fund_id, workspace_id)
    WHERE status = 1;

-- Standard FK indexes
CREATE INDEX IF NOT EXISTS idx_fund_allocation_fund_id
    ON public.fund_allocation USING btree (fund_id);

CREATE INDEX IF NOT EXISTS idx_fund_allocation_workspace_id
    ON public.fund_allocation USING btree (workspace_id);

CREATE INDEX IF NOT EXISTS idx_fund_allocation_payable_account_id
    ON public.fund_allocation USING btree (payable_account_id)
    WHERE payable_account_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_fund_allocation_default_cash_account_id
    ON public.fund_allocation USING btree (default_cash_account_id)
    WHERE default_cash_account_id IS NOT NULL;

-- ============================================================
-- WAVE 3 — fund_transaction  (append-only event log)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.fund_transaction (
    -- Standard header
    id                          text        NOT NULL,
    date_created                bigint,
    date_created_string         text,
    date_modified               bigint,
    date_modified_string        text,
    active                      boolean     NOT NULL DEFAULT true,

    -- Scope FKs
    fund_id                     text        NOT NULL,             -- FK → fund(id)
    allocation_id               text,                             -- FK → fund_allocation(id); nullable (fund-global events)
    workspace_id                text,                             -- FK → workspace(id);  nullable (OPENING_BALANCE / LIMIT_* events)

    -- Event payload
    kind                        integer     NOT NULL DEFAULT 0,   -- FundTransactionKind enum
    amount                      bigint      NOT NULL DEFAULT 0,   -- centavos, always positive; direction encoded in kind
    effective_at                bigint,                           -- operator-supplied event timestamp
    posted_at                   bigint,                           -- server insert time
    status                      integer     NOT NULL DEFAULT 0,   -- FundTransactionStatus enum

    -- Reversal linkage (self-FK; set for *_REVERSAL kinds)
    reverses_id                 text,                             -- FK → fund_transaction(id); nullable

    -- Idempotency
    idempotency_key             text        NOT NULL,             -- UNIQUE; "{caller_use_case}-{caller_entity_id}-{verb}"

    -- FX snapshot (present when amount currency differs from workspace functional currency)
    exchange_rate_snapshot      double precision,
    amount_functional_currency  bigint,
    functional_currency         text,

    -- Optional FK back-edges to spawning entities
    expenditure_id              text,                             -- FK → expenditure(id); nullable
    disbursement_id             text,                             -- FK → disbursement(id); nullable
    collection_id               text,                             -- FK → collection(id);  nullable
    transfer_id                 text,                             -- NOT an FK — "transfer" is not its own entity row
    journal_entry_id            text,                             -- FK → journal_entry(id); nullable

    -- Descriptive
    description                 text,
    reference_number            text,
    created_by_user_id          text                              -- FK → user(id); nullable
);

ALTER TABLE ONLY public.fund_transaction
    ADD CONSTRAINT fund_transaction_pkey PRIMARY KEY (id);

-- fund_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_transaction_fund_id_fkey'
          AND table_name = 'fund_transaction'
    ) THEN
        ALTER TABLE ONLY public.fund_transaction
            ADD CONSTRAINT fund_transaction_fund_id_fkey
                FOREIGN KEY (fund_id) REFERENCES public.fund(id)
                NOT VALID;
    END IF;
END;
$$;

-- allocation_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_transaction_allocation_id_fkey'
          AND table_name = 'fund_transaction'
    ) THEN
        ALTER TABLE ONLY public.fund_transaction
            ADD CONSTRAINT fund_transaction_allocation_id_fkey
                FOREIGN KEY (allocation_id) REFERENCES public.fund_allocation(id)
                NOT VALID;
    END IF;
END;
$$;

-- workspace_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_transaction_workspace_id_fkey'
          AND table_name = 'fund_transaction'
    ) THEN
        ALTER TABLE ONLY public.fund_transaction
            ADD CONSTRAINT fund_transaction_workspace_id_fkey
                FOREIGN KEY (workspace_id) REFERENCES public.workspace(id)
                NOT VALID;
    END IF;
END;
$$;

-- reverses_id self-FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_transaction_reverses_id_fkey'
          AND table_name = 'fund_transaction'
    ) THEN
        ALTER TABLE ONLY public.fund_transaction
            ADD CONSTRAINT fund_transaction_reverses_id_fkey
                FOREIGN KEY (reverses_id) REFERENCES public.fund_transaction(id)
                NOT VALID;
    END IF;
END;
$$;

-- expenditure_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_transaction_expenditure_id_fkey'
          AND table_name = 'fund_transaction'
    ) THEN
        ALTER TABLE ONLY public.fund_transaction
            ADD CONSTRAINT fund_transaction_expenditure_id_fkey
                FOREIGN KEY (expenditure_id) REFERENCES public.expenditure(id)
                NOT VALID;
    END IF;
END;
$$;

-- disbursement_id FK — conditional: disbursement table may not exist yet
-- (a standalone `disbursement` table is not present in the current schema;
--  the FK will be wired once the table is created in a future migration)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'disbursement'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_transaction_disbursement_id_fkey'
          AND table_name = 'fund_transaction'
    ) THEN
        ALTER TABLE ONLY public.fund_transaction
            ADD CONSTRAINT fund_transaction_disbursement_id_fkey
                FOREIGN KEY (disbursement_id) REFERENCES public.disbursement(id)
                NOT VALID;
    END IF;
END;
$$;

-- collection_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_transaction_collection_id_fkey'
          AND table_name = 'fund_transaction'
    ) THEN
        ALTER TABLE ONLY public.fund_transaction
            ADD CONSTRAINT fund_transaction_collection_id_fkey
                FOREIGN KEY (collection_id) REFERENCES public.collection(id)
                NOT VALID;
    END IF;
END;
$$;

-- journal_entry_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_transaction_journal_entry_id_fkey'
          AND table_name = 'fund_transaction'
    ) THEN
        ALTER TABLE ONLY public.fund_transaction
            ADD CONSTRAINT fund_transaction_journal_entry_id_fkey
                FOREIGN KEY (journal_entry_id) REFERENCES public.journal_entry(id)
                NOT VALID;
    END IF;
END;
$$;

-- created_by_user_id FK
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fund_transaction_created_by_user_id_fkey'
          AND table_name = 'fund_transaction'
    ) THEN
        ALTER TABLE ONLY public.fund_transaction
            ADD CONSTRAINT fund_transaction_created_by_user_id_fkey
                FOREIGN KEY (created_by_user_id) REFERENCES public."user"(id)
                NOT VALID;
    END IF;
END;
$$;

-- Global idempotency key
CREATE UNIQUE INDEX IF NOT EXISTS uq_fund_transaction_idempotency_key
    ON public.fund_transaction (idempotency_key);

-- Composite index for projection queries (balance SUM by fund)
CREATE INDEX IF NOT EXISTS idx_fund_transaction_fund_status_posted
    ON public.fund_transaction USING btree (fund_id, status, posted_at);

-- Composite index for projection queries (balance SUM by allocation)
CREATE INDEX IF NOT EXISTS idx_fund_transaction_allocation_status_posted
    ON public.fund_transaction USING btree (allocation_id, status, posted_at)
    WHERE allocation_id IS NOT NULL;

-- Index for paired CASH_OUT + CASH_IN transfer lookup
CREATE INDEX IF NOT EXISTS idx_fund_transaction_transfer_id
    ON public.fund_transaction USING btree (transfer_id)
    WHERE transfer_id IS NOT NULL;

-- Standard FK indexes
CREATE INDEX IF NOT EXISTS idx_fund_transaction_fund_id
    ON public.fund_transaction USING btree (fund_id);

CREATE INDEX IF NOT EXISTS idx_fund_transaction_allocation_id
    ON public.fund_transaction USING btree (allocation_id)
    WHERE allocation_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_fund_transaction_workspace_id
    ON public.fund_transaction USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_fund_transaction_journal_entry_id
    ON public.fund_transaction USING btree (journal_entry_id)
    WHERE journal_entry_id IS NOT NULL;

-- ============================================================
-- VIEW — fund_transaction_posted
--
-- All projection (balance SUM) queries MUST read this view.
-- Direct table access in projection code is a review-time red flag.
-- status = 2 → FUND_TRANSACTION_STATUS_POSTED
-- ============================================================

CREATE OR REPLACE VIEW public.fund_transaction_posted AS
    SELECT * FROM public.fund_transaction WHERE status = 2;
