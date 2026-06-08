-- =============================================================================
-- servicing junctions — additive migration (OCID foundation Phase 0.5)
--   client_workspace_user        — the account team (workspace_user x client)
--   subscription_workspace_user  — the project servicing team (workspace_user x
--                                  subscription), constrained to a subset of the
--                                  account team via a composite FK.
-- =============================================================================
--
-- 2 BRAND-NEW empty tables in ONE file. client_workspace_user is created FIRST
-- because it is the composite-FK target subscription_workspace_user references.
--
-- Because both tables are empty at CREATE, NOT NULL columns, CHECK constraints,
-- and partial unique indexes ship DIRECTLY in CREATE TABLE — the additive-only
-- "NOT VALID -> VALIDATE" two-step only applies when ALTERing a POPULATED table.
--
-- Column conventions mirror the baseline (20260502000000_baseline.sql).
--
-- NOTE: authored directly into the sequence (not via `pnpm db:diff`) for the same
-- replay reason documented in 20260607100000. Purely additive; runs cleanly at HEAD.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- client_workspace_user (the account team) — composite-FK target, create first
-- -----------------------------------------------------------------------------
CREATE TABLE public.client_workspace_user (
    id                text NOT NULL,
    date_created      timestamp with time zone DEFAULT now(),
    date_modified     timestamp with time zone DEFAULT now(),
    active            boolean DEFAULT true NOT NULL,
    workspace_id      text NOT NULL,                              -- IDOR anchor
    client_id         text NOT NULL,                              -- FK -> client; IDOR anchor
    workspace_user_id text NOT NULL,                              -- FK -> workspace_user
    is_owner          boolean DEFAULT false NOT NULL,
    CONSTRAINT client_workspace_user_pkey PRIMARY KEY (id),
    -- FKs
    CONSTRAINT client_workspace_user_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
    CONSTRAINT client_workspace_user_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES public.client (id),
    CONSTRAINT client_workspace_user_workspace_user_id_fkey
        FOREIGN KEY (workspace_user_id) REFERENCES public.workspace_user (id),
    -- natural key + composite-FK target for subscription_workspace_user
    CONSTRAINT client_workspace_user_client_user_uq
        UNIQUE (client_id, workspace_user_id),
    -- IDOR anchors must be non-empty
    CONSTRAINT client_workspace_user_idor_anchors_nonempty_chk
        CHECK (workspace_id <> '' AND client_id <> '')
);

-- membership lookup within workspace
CREATE INDEX idx_client_workspace_user_ws_user_active
    ON public.client_workspace_user (workspace_id, workspace_user_id, active);

-- single designated owner per client (backstop)
CREATE UNIQUE INDEX uq_client_workspace_user_single_owner
    ON public.client_workspace_user (client_id)
    WHERE is_owner;

-- -----------------------------------------------------------------------------
-- subscription_workspace_user (the project servicing team)
-- -----------------------------------------------------------------------------
CREATE TABLE public.subscription_workspace_user (
    id                text NOT NULL,
    date_created      timestamp with time zone DEFAULT now(),
    date_modified     timestamp with time zone DEFAULT now(),
    active            boolean DEFAULT true NOT NULL,
    workspace_id      text NOT NULL,                              -- IDOR anchor
    subscription_id   text NOT NULL,                              -- FK -> subscription
    client_id         text NOT NULL,                              -- denorm; part of composite FK (NO standalone FK)
    workspace_user_id text NOT NULL,                              -- FK -> workspace_user
    is_owner          boolean DEFAULT false NOT NULL,
    CONSTRAINT subscription_workspace_user_pkey PRIMARY KEY (id),
    -- FKs
    CONSTRAINT subscription_workspace_user_subscription_id_fkey
        FOREIGN KEY (subscription_id) REFERENCES public.subscription (id),
    CONSTRAINT subscription_workspace_user_workspace_user_id_fkey
        FOREIGN KEY (workspace_user_id) REFERENCES public.workspace_user (id),
    -- THE fail-closed rule: project servicers MUST be a subset of the account
    -- team. (client_id, workspace_user_id) must already exist in
    -- client_workspace_user; removing the account-team row cascades the servicer.
    CONSTRAINT subscription_workspace_user_account_team_fkey
        FOREIGN KEY (client_id, workspace_user_id)
        REFERENCES public.client_workspace_user (client_id, workspace_user_id)
        ON DELETE CASCADE,
    -- IDOR anchors must be non-empty
    CONSTRAINT subscription_workspace_user_idor_anchors_nonempty_chk
        CHECK (workspace_id <> '' AND client_id <> '')
);

-- subscription roster
CREATE INDEX idx_subscription_workspace_user_subscription_active
    ON public.subscription_workspace_user (subscription_id, active);
-- membership lookup within workspace
CREATE INDEX idx_subscription_workspace_user_ws_user_active
    ON public.subscription_workspace_user (workspace_id, workspace_user_id, active);

-- one ACTIVE servicer per (subscription, workspace_user)
CREATE UNIQUE INDEX uq_subscription_workspace_user_active
    ON public.subscription_workspace_user (subscription_id, workspace_user_id)
    WHERE active;
