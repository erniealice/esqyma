-- =============================================================================
-- Performance Evaluation §E3 / §E8 Stage C — evaluation_template (+ item)
--   evaluation_template       — workspace-scoped reusable rubric definition
--   evaluation_template_item  — child (CASCADE); one row per rubric dimension
-- =============================================================================
--
-- 2 BRAND-NEW empty tables in ONE file (template FIRST — it is the FK target the
-- item references). Because both are empty at CREATE, NOT NULL columns + CHECK
-- constraints ship DIRECTLY in CREATE TABLE (the additive-only NOT VALID->VALIDATE
-- two-step only applies to ALTERs on POPULATED tables).
--
-- ENUM CHECK domain pins use the LOWERCASE short tokens, matching the established
-- same-session idiom (subscription_seat, conversation) that the downstream espyna
-- adapters translate to/from the proto SCREAMING enum names. UNSPECIFIED is
-- excluded from every CHECK. (The plan's §E3 sketch wrote the CHECK literals with
-- the full SCREAMING proto names as shorthand; the persisted token convention is
-- lowercase — see 20260607100000_create_subscription_seat.sql.)
--
-- Column conventions mirror the baseline (20260502000000_baseline.sql):
--   id text PK; date_created/date_modified timestamptz DEFAULT now();
--   active boolean DEFAULT true NOT NULL; int32 -> integer; proto-enum -> text+CHECK.
--
-- NOTE: authored directly into the sequence (not via db:diff) for the replay
-- reason documented in 20260607100000. Purely additive; runs cleanly at HEAD.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- evaluation_template (create first — FK target for evaluation_template_item)
-- -----------------------------------------------------------------------------
CREATE TABLE public.evaluation_template (
    id              text NOT NULL,
    workspace_id    text NOT NULL,                              -- IDOR anchor; FK -> workspace
    name            text NOT NULL,
    description     text,
    evaluation_type   text NOT NULL,                            -- EvaluationType (CHECK-pinned)
    relationship_type text NOT NULL,                            -- RelationshipType (CHECK-pinned)
    version         integer NOT NULL DEFAULT 1,
    status          text NOT NULL,                              -- EvaluationTemplateStatus (single lifecycle source of truth)
    visibility_type text NOT NULL,                              -- VisibilityType (CHECK-pinned)
    copied_from_id  text,                                       -- self FK
    active          boolean DEFAULT true NOT NULL,
    date_created    timestamp with time zone DEFAULT now(),
    date_modified   timestamp with time zone DEFAULT now(),
    CONSTRAINT evaluation_template_pkey PRIMARY KEY (id),
    CONSTRAINT evaluation_template_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
    CONSTRAINT evaluation_template_copied_from_id_fkey
        FOREIGN KEY (copied_from_id) REFERENCES public.evaluation_template (id),
    -- IDOR anchor must be non-empty
    CONSTRAINT evaluation_template_workspace_nonempty_chk
        CHECK (workspace_id <> ''),
    -- enum-domain pins (UNSPECIFIED excluded)
    CONSTRAINT evaluation_template_evaluation_type_chk
        CHECK (evaluation_type IN ('performance_review', 'csat', 'course_eval', 'vendor_scorecard')),
    CONSTRAINT evaluation_template_relationship_type_chk
        CHECK (relationship_type IN ('client_to_associate', 'staff_to_client', 'self', 'peer', 'manager')),
    CONSTRAINT evaluation_template_status_chk
        CHECK (status IN ('draft', 'active', 'deprecated')),
    CONSTRAINT evaluation_template_visibility_type_chk
        CHECK (visibility_type IN ('internal_only', 'visible_to_subject', 'visible_to_subject_anon')),
    -- lifecycle coupling: active = (status NOT IN {deprecated})
    CONSTRAINT evaluation_template_active_status_coupling_chk
        CHECK (active = (status <> 'deprecated'))
);

-- workspace-scoped active-template picker (status = 'active')
CREATE INDEX idx_evaluation_template_workspace_status
    ON public.evaluation_template (workspace_id, status);

-- -----------------------------------------------------------------------------
-- evaluation_template_item (child; CASCADE on evaluation_template_id)
-- -----------------------------------------------------------------------------
CREATE TABLE public.evaluation_template_item (
    id                     text NOT NULL,
    evaluation_template_id text NOT NULL,                       -- FK -> evaluation_template (CASCADE)
    workspace_id           text NOT NULL,                       -- COPIED from parent; IDOR anchor
    outcome_criteria_id    text NOT NULL,                       -- FK -> outcome_criteria
    sequence_order         integer NOT NULL DEFAULT 0,
    question_label         text,
    question_prompt        text,
    required_override      boolean,
    weight_override        double precision,
    active                 boolean DEFAULT true NOT NULL,
    date_created           timestamp with time zone DEFAULT now(),
    CONSTRAINT evaluation_template_item_pkey PRIMARY KEY (id),
    CONSTRAINT evaluation_template_item_template_id_fkey
        FOREIGN KEY (evaluation_template_id) REFERENCES public.evaluation_template (id) ON DELETE CASCADE,
    CONSTRAINT evaluation_template_item_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
    CONSTRAINT evaluation_template_item_outcome_criteria_id_fkey
        FOREIGN KEY (outcome_criteria_id) REFERENCES public.outcome_criteria (id),
    -- IDOR anchor must be non-empty
    CONSTRAINT evaluation_template_item_workspace_nonempty_chk
        CHECK (workspace_id <> '')
);

-- parent fan-out (ordered)
CREATE INDEX idx_evaluation_template_item_template
    ON public.evaluation_template_item (evaluation_template_id, sequence_order);
-- workspace scope
CREATE INDEX idx_evaluation_template_item_workspace
    ON public.evaluation_template_item (workspace_id);
