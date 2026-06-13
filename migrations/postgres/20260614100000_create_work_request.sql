-- =============================================================================
-- Requests & Workflow (OCID Plan 1, Phase 8a-1) — work_request_type + work_request
--   + workspace_request_counter (per-workspace sequential REQ-NNNN backing)
-- =============================================================================
--
-- 3 BRAND-NEW empty tables. Because they are empty at CREATE, NOT NULL columns,
-- CHECK constraints, generated columns, and partial unique indexes ship DIRECTLY
-- in CREATE TABLE — the additive-only "NOT VALID -> VALIDATE" two-step only
-- applies when ALTERing a POPULATED table (directive F).
--
-- Order: work_request_type FIRST (FK target for work_request.work_request_type_id),
-- then workspace_request_counter, then work_request.
--
-- ENUM CHECK domain pins use LOWERCASE short tokens, matching the established
-- convention (subscription_seat, evaluation_template). UNSPECIFIED is excluded.
--
-- Column conventions mirror the baseline (20260502000000_baseline.sql):
--   * id                         text NOT NULL  (PK)
--   * date_created/date_modified timestamp with time zone DEFAULT now()
--   * active                     boolean DEFAULT true NOT NULL
--   * int64 (non-date) fields    bigint
--   * int32 fields               integer
--   * proto-enum discriminators  text  (+ CHECK domain pin)
--
-- NOTE: authored directly into the sequence (not via db:diff) for the replay
-- reason documented in 20260607100000. Purely additive; runs cleanly at HEAD.
-- =============================================================================


-- =============================================================================
-- 1. work_request_type — the configurable type catalog (Q-REQ-TYPES)
-- =============================================================================
CREATE TABLE public.work_request_type (
    id                             text NOT NULL,
    workspace_id                   text NOT NULL,
    code                           text NOT NULL,                  -- stable key; UNIQUE per workspace
    label_key                      text NOT NULL DEFAULT '',
    description_key                text NOT NULL DEFAULT '',
    category                       text NOT NULL,                  -- WorkRequestTypeCategory
    requires_resource              boolean NOT NULL DEFAULT false, -- type names a roster seat?
    default_workflow_template_id   text,                           -- FK -> workflow_template; required when ACTIVE
    default_sla_hours              bigint NOT NULL DEFAULT 0,
    sort_order                     integer NOT NULL DEFAULT 0,
    icon_key                       text NOT NULL DEFAULT '',
    status                         text NOT NULL,                  -- WorkRequestTypeStatus
    active                         boolean DEFAULT true NOT NULL,
    date_created                   timestamp with time zone DEFAULT now(),
    date_modified                  timestamp with time zone DEFAULT now(),

    CONSTRAINT work_request_type_pkey PRIMARY KEY (id),

    -- FKs
    CONSTRAINT work_request_type_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
    CONSTRAINT work_request_type_default_workflow_template_id_fkey
        FOREIGN KEY (default_workflow_template_id) REFERENCES public.workflow_template (id),

    -- IDOR anchor must be non-empty
    CONSTRAINT work_request_type_nonempty_chk
        CHECK (workspace_id <> '' AND code <> ''),

    -- Unique code per workspace
    CONSTRAINT work_request_type_workspace_code_uq
        UNIQUE (workspace_id, code),

    -- Enum-domain pins (UNSPECIFIED excluded)
    CONSTRAINT work_request_type_category_chk
        CHECK (category IN ('person_scoped', 'account_scoped')),
    CONSTRAINT work_request_type_status_chk
        CHECK (status IN ('active', 'archived')),

    -- SLA must be non-negative
    CONSTRAINT work_request_type_sla_hours_chk
        CHECK (default_sla_hours >= 0),

    -- active <-> status coupling: active = (status = 'active')
    CONSTRAINT work_request_type_active_status_coupling_chk
        CHECK (active = (status = 'active')),

    -- codex-HIGH-2: an ACTIVE type MUST name a routing template
    CONSTRAINT work_request_type_active_must_have_template_chk
        CHECK (status <> 'active' OR default_workflow_template_id IS NOT NULL)
);

-- workspace-scoped status filter
CREATE INDEX idx_work_request_type_workspace_status
    ON public.work_request_type (workspace_id, status);


-- =============================================================================
-- 2. workspace_request_counter — per-workspace sequential counter for Q-REQ-CODE
--    The create use case does SELECT ... FOR UPDATE + increment inside the txn.
--    UNIQUE(workspace_id, request_number) on work_request is the DB backstop.
-- =============================================================================
CREATE TABLE public.workspace_request_counter (
    workspace_id  text NOT NULL,
    seq           bigint NOT NULL DEFAULT 0,
    CONSTRAINT workspace_request_counter_pkey PRIMARY KEY (workspace_id),
    CONSTRAINT workspace_request_counter_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
    CONSTRAINT workspace_request_counter_workspace_nonempty_chk
        CHECK (workspace_id <> '')
);


-- =============================================================================
-- 3. work_request — the generalized work-request record (Q-REQ-NAME)
-- =============================================================================
CREATE TABLE public.work_request (
    id                              text NOT NULL,
    workspace_id                    text NOT NULL,
    client_id                       text,                          -- OPTIONAL; DB-gated by origin
    origin                          text NOT NULL,                 -- WorkRequestOrigin discriminator
    request_number                  text NOT NULL,                 -- "REQ-0104" per-workspace sequential
    work_request_type_id            text NOT NULL,                 -- FK -> work_request_type
    status                          text NOT NULL,                 -- WorkRequestStatus lifecycle
    title                           text NOT NULL DEFAULT '',
    description                     text NOT NULL DEFAULT '',
    payload_json                    text NOT NULL DEFAULT '{}',    -- JSONB semantics; stored as text for proto compat
    subscription_seat_id            text,                          -- optional FK -> subscription_seat
    requested_by_user_id            text NOT NULL,                 -- principal who submitted (client or staff)
    assigned_to_workspace_user_id   text,                          -- single triage/case owner (Q-REQ-ASSIGN)
    priority                        integer NOT NULL DEFAULT 0,    -- 0=normal, 1=high
    sla_target_hours                bigint NOT NULL DEFAULT 0,     -- snapshot from type at submit
    sla_due_at                      bigint,                        -- stored = date_submitted + sla_target_hours (unix millis)
    sla_breached_at                 bigint,                        -- idempotent stamp
    workflow_id                     text,                          -- optional engine FK (Q-REQ-ENGINE)
    resolution_note                 text,
    date_submitted                  bigint,
    date_resolved                   bigint,
    active                          boolean DEFAULT true NOT NULL, -- DB-coupled to status
    submission_idempotency_key      text NOT NULL,                 -- duplicate-submit guard
    job_id                          text,                          -- optional downstream FK -> job
    subscription_id                 text,                          -- optional project/engagement anchor
    date_created                    timestamp with time zone DEFAULT now(),
    date_modified                   timestamp with time zone DEFAULT now(),

    CONSTRAINT work_request_pkey PRIMARY KEY (id),

    -- FKs (NOT VALID + VALIDATE pattern for cross-domain refs on a NEW empty table
    -- is unnecessary, but we use it on the wider-graph FKs for consistency with
    -- the established migration convention; the VALIDATE runs immediately since
    -- the table is empty)
    CONSTRAINT work_request_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
    CONSTRAINT work_request_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES public.client (id),
    CONSTRAINT work_request_work_request_type_id_fkey
        FOREIGN KEY (work_request_type_id) REFERENCES public.work_request_type (id),
    CONSTRAINT work_request_requested_by_user_id_fkey
        FOREIGN KEY (requested_by_user_id) REFERENCES public."user" (id),
    CONSTRAINT work_request_assigned_to_workspace_user_id_fkey
        FOREIGN KEY (assigned_to_workspace_user_id) REFERENCES public.workspace_user (id),
    CONSTRAINT work_request_subscription_seat_id_fkey
        FOREIGN KEY (subscription_seat_id) REFERENCES public.subscription_seat (id),
    CONSTRAINT work_request_workflow_id_fkey
        FOREIGN KEY (workflow_id) REFERENCES public.workflow (id),
    CONSTRAINT work_request_job_id_fkey
        FOREIGN KEY (job_id) REFERENCES public.job (id),
    CONSTRAINT work_request_subscription_id_fkey
        FOREIGN KEY (subscription_id) REFERENCES public.subscription (id),

    -- IDOR anchor: workspace_id must be non-empty
    CONSTRAINT work_request_workspace_nonempty_chk
        CHECK (workspace_id <> ''),

    -- Origin-gate: client_id is NULL exactly when origin = INTERNAL (Q-REQ-ORIGIN)
    CONSTRAINT work_request_client_origin_gate_chk
        CHECK ((client_id IS NULL) = (origin = 'internal')),

    -- No empty-string sentinel on client_id
    CONSTRAINT work_request_client_id_nonempty_chk
        CHECK (client_id IS NULL OR client_id <> ''),

    -- Enum-domain pins (UNSPECIFIED excluded)
    CONSTRAINT work_request_origin_chk
        CHECK (origin IN ('client_originated', 'client_related_internal', 'internal')),
    CONSTRAINT work_request_status_chk
        CHECK (status IN (
            'new', 'submitted', 'in_review', 'approved', 'declined',
            'completed', 'cancelled', 'returned_for_info', 'on_hold',
            'escalated', 'pending_override'
        )),
    CONSTRAINT work_request_priority_chk
        CHECK (priority IN (0, 1)),

    -- active <-> status DB coupling (Q-REQ-STATUS / RT-3 / codex-HIGH-3):
    -- active = status NOT IN terminal set {declined, completed, cancelled}
    -- THE SINGLE PREDICATE used by active, breach stamp, breach KPI, and the
    -- partial SLA index -- no drift.
    CONSTRAINT work_request_active_status_coupling_chk
        CHECK (active = (status NOT IN ('declined', 'completed', 'cancelled'))),

    -- SLA target must be non-negative
    CONSTRAINT work_request_sla_target_hours_chk
        CHECK (sla_target_hours >= 0),

    -- Per-workspace sequential code backstop (Q-REQ-CODE)
    CONSTRAINT work_request_workspace_request_number_uq
        UNIQUE (workspace_id, request_number),

    -- Duplicate-submit guard (Q-REQ-CODE / RT-CODE / codex-MED-2)
    CONSTRAINT work_request_idempotency_uq
        UNIQUE (workspace_id, requested_by_user_id, submission_idempotency_key)
);

-- -----------------------------------------------------------------------------
-- Indexes
-- -----------------------------------------------------------------------------

-- Breach projection: open requests approaching/past SLA (Q-REQ-SLA / RT-3).
-- Uses the SAME terminal predicate as active coupling.
CREATE INDEX idx_work_request_open_sla
    ON public.work_request (workspace_id, sla_due_at)
    WHERE status NOT IN ('declined', 'completed', 'cancelled');

-- Client portal list + admin client-filter
CREATE INDEX idx_work_request_client
    ON public.work_request (workspace_id, client_id, status);

-- Admin inbox origin-filter chips + origin-aware client read predicate
CREATE INDEX idx_work_request_origin
    ON public.work_request (workspace_id, origin, status);

-- My-queue / Unassigned filters (Q-REQ-ASSIGN)
CREATE INDEX idx_work_request_assignee
    ON public.work_request (workspace_id, assigned_to_workspace_user_id);

-- Project-scoped inbox (Q-SERVICING)
CREATE INDEX idx_work_request_subscription
    ON public.work_request (workspace_id, subscription_id);

-- Type FK index
CREATE INDEX idx_work_request_type_id
    ON public.work_request (work_request_type_id);

-- Status filter within workspace
CREATE INDEX idx_work_request_workspace_status
    ON public.work_request (workspace_id, status);
