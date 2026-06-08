-- =============================================================================
-- Performance Evaluation §E4 / §E8 Stage E — evaluation_cycle (+ member)
--   evaluation_cycle         — the named review cycle (v1; Q-EVAL-CYCLE-1)
--   evaluation_cycle_member  — the frozen-denominator snapshot (v1; SR-1)
-- =============================================================================
--
-- 2 BRAND-NEW empty tables in ONE file (cycle FIRST — it is the FK target the
-- member references). This file precedes 20260607110003_create_evaluation.sql
-- because evaluation.evaluation_cycle_id FK targets evaluation_cycle(id).
--
-- Both empty at CREATE => NOT NULL + CHECK + UNIQUE ship inline. ENUM CHECK pins
-- use the lowercase short-token convention (see 20260607110001 header note).
--
-- NOTE: authored directly into the sequence (db:diff replay is broken — see
-- 20260607100000). Purely additive; runs cleanly at HEAD.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- evaluation_cycle (create first — FK target for evaluation_cycle_member + evaluation)
-- -----------------------------------------------------------------------------
CREATE TABLE public.evaluation_cycle (
    id                text NOT NULL,
    workspace_id      text NOT NULL,                            -- IDOR anchor; FK -> workspace
    subscription_id   text NOT NULL,                            -- DENOMINATOR SCOPE; FK -> subscription
    name              text NOT NULL,
    period_start      text NOT NULL,                            -- ISO 8601
    period_end        text NOT NULL,                            -- ISO 8601
    sign_off_due_date text,                                     -- ISO 8601 (!= close_date)
    close_date        text,                                     -- ISO 8601
    status            text NOT NULL,                            -- EvaluationCycleStatus (single lifecycle source of truth)
    active            boolean DEFAULT true NOT NULL,
    date_created      timestamp with time zone DEFAULT now(),
    date_modified     timestamp with time zone DEFAULT now(),
    CONSTRAINT evaluation_cycle_pkey PRIMARY KEY (id),
    CONSTRAINT evaluation_cycle_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
    CONSTRAINT evaluation_cycle_subscription_id_fkey
        FOREIGN KEY (subscription_id) REFERENCES public.subscription (id),
    -- IDOR anchors must be non-empty
    CONSTRAINT evaluation_cycle_anchors_nonempty_chk
        CHECK (workspace_id <> '' AND subscription_id <> ''),
    -- enum-domain pin (UNSPECIFIED excluded)
    CONSTRAINT evaluation_cycle_status_chk
        CHECK (status IN ('open', 'sign_off', 'closed')),
    -- lifecycle coupling: active = (status NOT IN {closed})
    CONSTRAINT evaluation_cycle_active_status_coupling_chk
        CHECK (active = (status <> 'closed'))
);

-- engagement-scoped cycle lookup
CREATE INDEX idx_evaluation_cycle_subscription_status
    ON public.evaluation_cycle (subscription_id, status);
-- workspace scope
CREATE INDEX idx_evaluation_cycle_workspace
    ON public.evaluation_cycle (workspace_id);

-- -----------------------------------------------------------------------------
-- evaluation_cycle_member (SR-1 frozen-denominator snapshot; per-STAFF grain)
-- -----------------------------------------------------------------------------
CREATE TABLE public.evaluation_cycle_member (
    id                  text NOT NULL,
    workspace_id        text NOT NULL,                          -- IDOR anchor; FK -> workspace
    evaluation_cycle_id text NOT NULL,                          -- FK -> evaluation_cycle (CASCADE)
    client_id           text NOT NULL,                          -- denormalized RLS anchor; FK -> client
    subject_staff_id    text NOT NULL,                          -- the reviewed human; FK -> staff (per-staff grain, SR-9)
    is_probation        boolean DEFAULT false NOT NULL,         -- fresh probation clock for a replacement seat in-cycle (SR-8)
    active              boolean DEFAULT true NOT NULL,
    date_added          bigint,
    CONSTRAINT evaluation_cycle_member_pkey PRIMARY KEY (id),
    CONSTRAINT evaluation_cycle_member_cycle_id_fkey
        FOREIGN KEY (evaluation_cycle_id) REFERENCES public.evaluation_cycle (id) ON DELETE CASCADE,
    CONSTRAINT evaluation_cycle_member_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
    CONSTRAINT evaluation_cycle_member_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES public.client (id),
    CONSTRAINT evaluation_cycle_member_subject_staff_id_fkey
        FOREIGN KEY (subject_staff_id) REFERENCES public.staff (id),
    -- IDOR anchors must be non-empty
    CONSTRAINT evaluation_cycle_member_anchors_nonempty_chk
        CHECK (workspace_id <> '' AND client_id <> '' AND subject_staff_id <> ''),
    -- SR-9: per-STAFF per-engagement membership; a dual-seat associate collapses to ONE obligation (MS-L1)
    CONSTRAINT evaluation_cycle_member_unique_obligation
        UNIQUE (evaluation_cycle_id, subject_staff_id, client_id)
);

-- denominator/progress read: members for a cycle (X joins this to a SUBMITTED eval)
CREATE INDEX idx_evaluation_cycle_member_cycle
    ON public.evaluation_cycle_member (evaluation_cycle_id);
-- per-staff lookup within workspace
CREATE INDEX idx_evaluation_cycle_member_workspace_staff
    ON public.evaluation_cycle_member (workspace_id, subject_staff_id);
