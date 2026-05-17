-- ============================================================
-- Portal E2E — Multi-Principal Waves 1-4 Migration
--
-- Phase A of docs/plan/20260517-orchestration/goal-portal-e2e.md
--
-- Wave 1: New tables — client_portal_grant, supplier_portal_grant,
--         delegate_supplier  (principal_type is enum-only, no table)
-- Wave 2: New columns on session, delegate_client, permission, role
-- Wave 3: New tables — tenant_subscription, tenant_payment_method,
--         tenant_invoice, user_preference
-- Wave 4: New columns on subscription, supplier_contract,
--         supplier_subscription, expenditure, revenue, workspace,
--         disbursement_profile
--
-- All new columns are NULL-able. No existing column is renamed, dropped,
-- or had its type changed. All new FKs are nullable (no backfill needed).
-- ============================================================

-- ============================================================
-- WAVE 1 — New tables
-- ============================================================

-- ------------------------------------------------------------
-- 1. client_portal_grant
--    Anchors sessions for PRINCIPAL_TYPE_CLIENT.
--    Unique: (workspace_id, client_id, user_id)
-- ------------------------------------------------------------
CREATE TABLE public.client_portal_grant (
    id                  text        NOT NULL,
    workspace_id        text,
    user_id             text,
    client_id           text,
    role_id             text,
    granted_by_user_id  text,
    date_created        bigint,
    date_created_string text,
    date_modified       bigint,
    date_modified_string text,
    active              boolean     NOT NULL DEFAULT true
);

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT client_portal_grant_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT client_portal_grant_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT client_portal_grant_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES public."user"(id);

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT client_portal_grant_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES public.client(id);

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT client_portal_grant_role_id_fkey
        FOREIGN KEY (role_id) REFERENCES public.role(id);

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT client_portal_grant_granted_by_user_id_fkey
        FOREIGN KEY (granted_by_user_id) REFERENCES public."user"(id);

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT uq_client_portal_grant_workspace_client_user
        UNIQUE (workspace_id, client_id, user_id);

CREATE INDEX idx_client_portal_grant_workspace_id  ON public.client_portal_grant USING btree (workspace_id);
CREATE INDEX idx_client_portal_grant_user_id       ON public.client_portal_grant USING btree (user_id);
CREATE INDEX idx_client_portal_grant_client_id     ON public.client_portal_grant USING btree (client_id);
CREATE INDEX idx_client_portal_grant_role_id       ON public.client_portal_grant USING btree (role_id);

-- ------------------------------------------------------------
-- 2. supplier_portal_grant
--    Anchors sessions for PRINCIPAL_TYPE_SUPPLIER.
--    Unique: (workspace_id, supplier_id, user_id)
-- ------------------------------------------------------------
CREATE TABLE public.supplier_portal_grant (
    id                  text        NOT NULL,
    workspace_id        text,
    user_id             text,
    supplier_id         text,
    role_id             text,
    granted_by_user_id  text,
    date_created        bigint,
    date_created_string text,
    date_modified       bigint,
    date_modified_string text,
    active              boolean     NOT NULL DEFAULT true
);

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT supplier_portal_grant_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT supplier_portal_grant_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT supplier_portal_grant_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES public."user"(id);

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT supplier_portal_grant_supplier_id_fkey
        FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT supplier_portal_grant_role_id_fkey
        FOREIGN KEY (role_id) REFERENCES public.role(id);

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT supplier_portal_grant_granted_by_user_id_fkey
        FOREIGN KEY (granted_by_user_id) REFERENCES public."user"(id);

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT uq_supplier_portal_grant_workspace_supplier_user
        UNIQUE (workspace_id, supplier_id, user_id);

CREATE INDEX idx_supplier_portal_grant_workspace_id ON public.supplier_portal_grant USING btree (workspace_id);
CREATE INDEX idx_supplier_portal_grant_user_id      ON public.supplier_portal_grant USING btree (user_id);
CREATE INDEX idx_supplier_portal_grant_supplier_id  ON public.supplier_portal_grant USING btree (supplier_id);
CREATE INDEX idx_supplier_portal_grant_role_id      ON public.supplier_portal_grant USING btree (role_id);

-- ------------------------------------------------------------
-- 3. delegate_supplier
--    Links a Delegate (parent/guardian/procurement contact) to a Supplier
--    they may act on behalf of.
--    Unique: (delegate_id, supplier_id)
-- ------------------------------------------------------------
CREATE TABLE public.delegate_supplier (
    id                  text        NOT NULL,
    delegate_id         text,
    supplier_id         text,
    role_id             text,
    granted_by_user_id  text,
    workspace_id        text,
    date_created        bigint,
    date_created_string text,
    date_modified       bigint,
    date_modified_string text,
    active              boolean     NOT NULL DEFAULT true
);

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT delegate_supplier_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT delegate_supplier_delegate_id_fkey
        FOREIGN KEY (delegate_id) REFERENCES public.delegate(id);

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT delegate_supplier_supplier_id_fkey
        FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT delegate_supplier_role_id_fkey
        FOREIGN KEY (role_id) REFERENCES public.role(id);

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT delegate_supplier_granted_by_user_id_fkey
        FOREIGN KEY (granted_by_user_id) REFERENCES public."user"(id);

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT delegate_supplier_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT uq_delegate_supplier_delegate_supplier
        UNIQUE (delegate_id, supplier_id);

CREATE INDEX idx_delegate_supplier_delegate_id  ON public.delegate_supplier USING btree (delegate_id);
CREATE INDEX idx_delegate_supplier_supplier_id  ON public.delegate_supplier USING btree (supplier_id);
CREATE INDEX idx_delegate_supplier_role_id      ON public.delegate_supplier USING btree (role_id);
CREATE INDEX idx_delegate_supplier_workspace_id ON public.delegate_supplier USING btree (workspace_id);

-- ============================================================
-- WAVE 2 — New columns on existing tables
-- ============================================================

-- session: principal_type (integer enum), principal_id, acting_as_*
ALTER TABLE public.session
    ADD COLUMN IF NOT EXISTS principal_type         integer,
    ADD COLUMN IF NOT EXISTS principal_id           text,
    ADD COLUMN IF NOT EXISTS acting_as_client_id    text,
    ADD COLUMN IF NOT EXISTS acting_as_supplier_id  text,
    ADD COLUMN IF NOT EXISTS acting_as_workspace_id text;

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_acting_as_workspace_id_fkey
        FOREIGN KEY (acting_as_workspace_id) REFERENCES public.workspace(id)
        NOT VALID;

-- delegate_client: role_id, granted_by_user_id, workspace_id
ALTER TABLE public.delegate_client
    ADD COLUMN IF NOT EXISTS role_id            text,
    ADD COLUMN IF NOT EXISTS granted_by_user_id text,
    ADD COLUMN IF NOT EXISTS workspace_id       text;

ALTER TABLE ONLY public.delegate_client
    ADD CONSTRAINT delegate_client_role_id_fkey
        FOREIGN KEY (role_id) REFERENCES public.role(id)
        NOT VALID;

ALTER TABLE ONLY public.delegate_client
    ADD CONSTRAINT delegate_client_granted_by_user_id_fkey
        FOREIGN KEY (granted_by_user_id) REFERENCES public."user"(id)
        NOT VALID;

ALTER TABLE ONLY public.delegate_client
    ADD CONSTRAINT delegate_client_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace(id)
        NOT VALID;

CREATE INDEX IF NOT EXISTS idx_delegate_client_workspace_id
    ON public.delegate_client USING btree (workspace_id);

-- permission: applicable_principal_types (integer array — PrincipalType enum values)
ALTER TABLE public.permission
    ADD COLUMN IF NOT EXISTS applicable_principal_types integer[];

-- role: applicable_principal_types (integer array)
ALTER TABLE public.role
    ADD COLUMN IF NOT EXISTS applicable_principal_types integer[];

-- ============================================================
-- WAVE 3 — New tables: tenancy domain + user_preference
-- ============================================================

-- ------------------------------------------------------------
-- 4. tenant_subscription
-- ------------------------------------------------------------
CREATE TABLE public.tenant_subscription (
    id                         text        NOT NULL,
    date_created               bigint,
    date_created_string        text,
    date_modified              bigint,
    date_modified_string       text,
    active                     boolean     NOT NULL DEFAULT true,
    workspace_id               text,
    plan_code                  text,
    plan_display_name          text,
    status                     integer,
    billing_cycle              text,
    cycle_amount               bigint,
    currency                   text,
    period_start               text,
    period_end                 text,
    trial_end                  text,
    cancelled_at               text,
    default_payment_method_id  text,
    external_ref               text
);

ALTER TABLE ONLY public.tenant_subscription
    ADD CONSTRAINT tenant_subscription_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.tenant_subscription
    ADD CONSTRAINT tenant_subscription_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);

-- default_payment_method_id FK added after tenant_payment_method is created (below).

CREATE INDEX idx_tenant_subscription_workspace_id ON public.tenant_subscription USING btree (workspace_id);

-- ------------------------------------------------------------
-- 5. tenant_payment_method
-- ------------------------------------------------------------
CREATE TABLE public.tenant_payment_method (
    id                   text        NOT NULL,
    date_created         bigint,
    date_created_string  text,
    date_modified        bigint,
    date_modified_string text,
    active               boolean     NOT NULL DEFAULT true,
    workspace_id         text,
    display_label        text,
    -- oneof method_details stored as flat columns (card or bank_account details)
    -- card sub-message fields
    card_brand           text,
    card_last4           text,
    card_exp_month       integer,
    card_exp_year        integer,
    -- bank_account sub-message fields
    bank_name            text,
    bank_account_number_last4 text,
    bank_routing_number  text,
    provider_name        text,
    provider_token       text,
    is_default           boolean     NOT NULL DEFAULT false
);

ALTER TABLE ONLY public.tenant_payment_method
    ADD CONSTRAINT tenant_payment_method_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.tenant_payment_method
    ADD CONSTRAINT tenant_payment_method_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);

-- Partial unique: at most one default payment method per workspace.
CREATE UNIQUE INDEX uq_tenant_payment_method_default_per_workspace
    ON public.tenant_payment_method (workspace_id)
    WHERE is_default = true;

CREATE INDEX idx_tenant_payment_method_workspace_id ON public.tenant_payment_method USING btree (workspace_id);

-- Now wire the deferred FK on tenant_subscription.
ALTER TABLE ONLY public.tenant_subscription
    ADD CONSTRAINT tenant_subscription_default_payment_method_id_fkey
        FOREIGN KEY (default_payment_method_id) REFERENCES public.tenant_payment_method(id)
        NOT VALID;

CREATE INDEX idx_tenant_subscription_default_payment_method_id
    ON public.tenant_subscription USING btree (default_payment_method_id);

-- ------------------------------------------------------------
-- 6. tenant_invoice
-- ------------------------------------------------------------
CREATE TABLE public.tenant_invoice (
    id                      text        NOT NULL,
    date_created            bigint,
    date_created_string     text,
    date_modified           bigint,
    date_modified_string    text,
    active                  boolean     NOT NULL DEFAULT true,
    workspace_id            text,
    tenant_subscription_id  text,
    number                  text,
    status                  integer,
    amount                  bigint,
    currency                text,
    issued_at               text,
    paid_at                 text,
    due_at                  text,
    download_url            text,
    external_ref            text
);

ALTER TABLE ONLY public.tenant_invoice
    ADD CONSTRAINT tenant_invoice_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.tenant_invoice
    ADD CONSTRAINT tenant_invoice_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);

ALTER TABLE ONLY public.tenant_invoice
    ADD CONSTRAINT tenant_invoice_tenant_subscription_id_fkey
        FOREIGN KEY (tenant_subscription_id) REFERENCES public.tenant_subscription(id);

CREATE INDEX idx_tenant_invoice_workspace_id         ON public.tenant_invoice USING btree (workspace_id);
CREATE INDEX idx_tenant_invoice_tenant_subscription_id ON public.tenant_invoice USING btree (tenant_subscription_id);

-- ------------------------------------------------------------
-- 7. user_preference
--    Unique: (user_id, workspace_id)
-- ------------------------------------------------------------
CREATE TABLE public.user_preference (
    id                    text        NOT NULL,
    date_created          bigint,
    date_created_string   text,
    date_modified         bigint,
    date_modified_string  text,
    active                boolean     NOT NULL DEFAULT true,
    user_id               text,
    workspace_id          text,
    -- Appearance
    theme                 text,
    density               text,
    font                  text,
    radius                text,
    border                text,
    -- Locale
    language              text,
    region                text,
    timezone              text,
    -- Notifications
    notify_email_billing  boolean,
    notify_email_account  boolean,
    notify_inapp_mentions boolean
);

ALTER TABLE ONLY public.user_preference
    ADD CONSTRAINT user_preference_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_preference
    ADD CONSTRAINT user_preference_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES public."user"(id);

ALTER TABLE ONLY public.user_preference
    ADD CONSTRAINT user_preference_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);

ALTER TABLE ONLY public.user_preference
    ADD CONSTRAINT uq_user_preference_user_workspace
        UNIQUE (user_id, workspace_id);

CREATE INDEX idx_user_preference_user_id      ON public.user_preference USING btree (user_id);
CREATE INDEX idx_user_preference_workspace_id ON public.user_preference USING btree (workspace_id);

-- ============================================================
-- WAVE 4 — Additive columns on existing tables (snapshot FK cols)
-- ============================================================

-- subscription: collection_profile_id_snapshot, collection_method_id_snapshot
-- (snapshot fields — no FK constraint; value is copied at creation time)
ALTER TABLE public.subscription
    ADD COLUMN IF NOT EXISTS collection_profile_id_snapshot text,
    ADD COLUMN IF NOT EXISTS collection_method_id_snapshot  text;

-- supplier_contract: disbursement_profile_id_snapshot
ALTER TABLE public.supplier_contract
    ADD COLUMN IF NOT EXISTS disbursement_profile_id_snapshot text;

-- supplier_subscription: disbursement_profile_id_snapshot
ALTER TABLE public.supplier_subscription
    ADD COLUMN IF NOT EXISTS disbursement_profile_id_snapshot text;

-- expenditure: disbursement_profile_id_snapshot
ALTER TABLE public.expenditure
    ADD COLUMN IF NOT EXISTS disbursement_profile_id_snapshot text;

-- revenue: collection_profile_id_snapshot
ALTER TABLE public.revenue
    ADD COLUMN IF NOT EXISTS collection_profile_id_snapshot text;

-- workspace: tenant_subscription_id (FK + index)
ALTER TABLE public.workspace
    ADD COLUMN IF NOT EXISTS tenant_subscription_id text;

ALTER TABLE ONLY public.workspace
    ADD CONSTRAINT workspace_tenant_subscription_id_fkey
        FOREIGN KEY (tenant_subscription_id) REFERENCES public.tenant_subscription(id)
        NOT VALID;

CREATE INDEX IF NOT EXISTS idx_workspace_tenant_subscription_id
    ON public.workspace USING btree (tenant_subscription_id);

-- disbursement_profile: supplier_id (FK + index)
-- NOTE: disbursement_profile does NOT have (options.v1.table).table = true in its
-- proto, and no corresponding SQL table exists in the live DB (confirmed by query).
-- The Wave-4 proto adds supplier_id to the message for future use when a table is
-- created. No DDL change needed here — this will be addressed in the full
-- DisbursementProfile table creation migration (Phase B or a follow-up plan).
-- SKIPPED: ALTER TABLE disbursement_profile ADD COLUMN supplier_id
