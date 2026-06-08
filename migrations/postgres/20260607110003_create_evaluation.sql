-- =============================================================================
-- Performance Evaluation §E3 / §E8 Stage D — evaluation (+ response)
--   evaluation           — the evaluation header aggregate (v1)
--   evaluation_response  — child (CASCADE); one row per answered rubric dimension
-- =============================================================================
--
-- 2 BRAND-NEW empty tables in ONE file (evaluation FIRST — it is the FK target the
-- response references). This file FOLLOWS:
--   * 20260607110001 (evaluation_template — FK target of evaluation.evaluation_template_id)
--   * 20260607110002 (evaluation_cycle    — FK target of evaluation.evaluation_cycle_id)
-- and the seat from 20260607100000 (subscription_seat — FK target of evaluation.subscription_seat_id).
--
-- Both empty at CREATE => ALL invariants ship INLINE (NOT NULL, empty-string CHECK,
-- exclusive-arc num_nonnulls()=1, drift CHECKs, anti-phantom-anchor CHECK,
-- template-required CHECK, sign-off status-coupling CHECKs, response one-of CHECK,
-- two NULLS NOT DISTINCT arc-disjoint partial uniques, the Rating cross-join index).
--
-- ENUM CHECK pins use the lowercase short-token convention (see 20260607110001
-- header note). The §E3 sketch wrote CHECK literals with full SCREAMING proto
-- names as shorthand; persisted tokens are lowercase (matches subscription_seat /
-- conversation, which the downstream espyna adapters translate to/from).
-- Token maps:
--   EvaluationType   : performance_review | csat | course_eval | vendor_scorecard
--   RelationshipType : client_to_associate | staff_to_client | self | peer | manager
--   EvaluatorType    : client | staff
--   SubjectType      : associate | client
--   EvaluationStatus : draft | submitted | archived | signed_off
--   VisibilityType   : internal_only | visible_to_subject | visible_to_subject_anon
--   CriteriaType     : numeric_range | numeric_score | pass_fail | categorical | text | multi_check
--
-- NULLS NOT DISTINCT requires PostgreSQL 15+ (dev DB is PG 18 — confirmed). The
-- §E3 COALESCE fallback is NOT used here; this DB supports NULLS NOT DISTINCT.
--
-- NOTE: authored directly into the sequence (db:diff replay is broken — see
-- 20260607100000). Purely additive; runs cleanly at HEAD.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- evaluation (create first — FK target for evaluation_response)
-- -----------------------------------------------------------------------------
CREATE TABLE public.evaluation (
    id                                   text NOT NULL,
    workspace_id                         text NOT NULL,         -- IDOR anchor; FK -> workspace
    client_id                            text NOT NULL,         -- denormalized IDOR anchor; stamped, never from form
    subscription_id                      text,                  -- servicing scope (CR-5); FK -> subscription
    subscription_seat_id                 text,                  -- anti-phantom ENGAGEMENT anchor (the seat); FK -> subscription_seat
    evaluation_template_id               text,                  -- FK -> evaluation_template (REQUIRED for performance_review)
    evaluation_type                      text NOT NULL,         -- EvaluationType
    relationship_type                    text NOT NULL,         -- RelationshipType
    evaluator_type                       text NOT NULL,         -- EvaluatorType
    evaluator_workspace_user_id          text,                  -- operator-side arc (CR-4); FK -> workspace_user
    evaluator_client_portal_grant_id     text,                  -- client arc; FK -> client_portal_grant
    subject_type                         text NOT NULL,         -- SubjectType
    subject_staff_id                     text,                  -- the HUMAN Identity; FK -> staff
    subject_client_id                    text,                  -- FK -> client
    period_start                         text NOT NULL,         -- ISO 8601
    period_end                           text NOT NULL,         -- ISO 8601
    status                               text NOT NULL,         -- EvaluationStatus (single lifecycle source of truth)
    visibility_type                      text NOT NULL,         -- VisibilityType
    overall_score                        double precision,      -- computed from criteria_weight snapshots
    narrative                            text,
    submitted_at                         bigint,                -- set at DRAFT->SUBMITTED
    active                               boolean DEFAULT true NOT NULL,
    date_created                         timestamp with time zone DEFAULT now(),
    date_modified                        timestamp with time zone DEFAULT now(),
    evaluation_cycle_id                  text,                  -- nullable v1 FK -> evaluation_cycle
    signed_off_by_workspace_user_id      text,                  -- operator-side (CR-4); FK -> workspace_user
    signed_off_by_client_portal_grant_id text,                  -- FK -> client_portal_grant
    signed_off_at                        bigint,
    CONSTRAINT evaluation_pkey PRIMARY KEY (id),
    -- FKs
    CONSTRAINT evaluation_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
    CONSTRAINT evaluation_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES public.client (id),
    CONSTRAINT evaluation_subscription_id_fkey
        FOREIGN KEY (subscription_id) REFERENCES public.subscription (id),
    CONSTRAINT evaluation_subscription_seat_id_fkey
        FOREIGN KEY (subscription_seat_id) REFERENCES public.subscription_seat (id),
    CONSTRAINT evaluation_evaluation_template_id_fkey
        FOREIGN KEY (evaluation_template_id) REFERENCES public.evaluation_template (id),
    CONSTRAINT evaluation_evaluation_cycle_id_fkey
        FOREIGN KEY (evaluation_cycle_id) REFERENCES public.evaluation_cycle (id),
    CONSTRAINT evaluation_evaluator_workspace_user_id_fkey
        FOREIGN KEY (evaluator_workspace_user_id) REFERENCES public.workspace_user (id),
    CONSTRAINT evaluation_evaluator_client_portal_grant_id_fkey
        FOREIGN KEY (evaluator_client_portal_grant_id) REFERENCES public.client_portal_grant (id),
    CONSTRAINT evaluation_subject_staff_id_fkey
        FOREIGN KEY (subject_staff_id) REFERENCES public.staff (id),
    CONSTRAINT evaluation_subject_client_id_fkey
        FOREIGN KEY (subject_client_id) REFERENCES public.client (id),
    CONSTRAINT evaluation_signed_off_by_workspace_user_id_fkey
        FOREIGN KEY (signed_off_by_workspace_user_id) REFERENCES public.workspace_user (id),
    CONSTRAINT evaluation_signed_off_by_client_portal_grant_id_fkey
        FOREIGN KEY (signed_off_by_client_portal_grant_id) REFERENCES public.client_portal_grant (id),

    -- IDOR anchors must be non-empty: reject empty-string sentinels
    CONSTRAINT evaluation_idor_anchors_nonempty_chk
        CHECK (client_id <> '' AND workspace_id <> ''),

    -- enum-domain pins (UNSPECIFIED excluded)
    CONSTRAINT evaluation_evaluation_type_chk
        CHECK (evaluation_type IN ('performance_review', 'csat', 'course_eval', 'vendor_scorecard')),
    CONSTRAINT evaluation_relationship_type_chk
        CHECK (relationship_type IN ('client_to_associate', 'staff_to_client', 'self', 'peer', 'manager')),
    CONSTRAINT evaluation_evaluator_type_chk
        CHECK (evaluator_type IN ('client', 'staff')),
    CONSTRAINT evaluation_subject_type_chk
        CHECK (subject_type IN ('associate', 'client')),
    CONSTRAINT evaluation_status_chk
        CHECK (status IN ('draft', 'submitted', 'archived', 'signed_off')),
    CONSTRAINT evaluation_visibility_type_chk
        CHECK (visibility_type IN ('internal_only', 'visible_to_subject', 'visible_to_subject_anon')),

    -- lifecycle coupling: active = (status NOT IN {archived})
    CONSTRAINT evaluation_active_status_coupling_chk
        CHECK (active = (status <> 'archived')),

    -- exclusive-arc CHECKs: exactly one evaluator leg, exactly one subject leg
    CONSTRAINT evaluation_evaluator_arc_chk
        CHECK (num_nonnulls(evaluator_workspace_user_id, evaluator_client_portal_grant_id) = 1),
    CONSTRAINT evaluation_subject_arc_chk
        CHECK (num_nonnulls(subject_staff_id, subject_client_id) = 1),

    -- drift CHECKs: the _type discriminator agrees with which arc column is set
    --   evaluator_type='client'  <=> the CLIENT arc is set (=> 'staff' <=> the operator arc, by num_nonnulls=1)
    CONSTRAINT evaluation_evaluator_drift_chk
        CHECK ((evaluator_type = 'client') = (evaluator_client_portal_grant_id IS NOT NULL)),
    --   subject_type='associate' <=> subject_staff_id is set
    CONSTRAINT evaluation_subject_drift_chk
        CHECK ((subject_type = 'associate') = (subject_staff_id IS NOT NULL)),

    -- anti-phantom anchor (Q-EVAL-IDOR-1 gate 4): CLIENT_TO_ASSOCIATE REQUIRES a seat anchor
    CONSTRAINT evaluation_anti_phantom_anchor_chk
        CHECK (relationship_type <> 'client_to_associate' OR subscription_seat_id IS NOT NULL),

    -- template required for performance_review (closes the NULL-template idempotency hole)
    CONSTRAINT evaluation_template_required_for_review_chk
        CHECK (evaluation_type <> 'performance_review' OR evaluation_template_id IS NOT NULL),

    -- sign-off status-coupling (Q-SIGNOFF-1): a SIGNED_OFF row has exactly one actor + a timestamp;
    -- a non-SIGNED_OFF row carries NO sign-off data
    CONSTRAINT evaluation_signed_off_present_chk
        CHECK (status <> 'signed_off'
               OR (signed_off_at IS NOT NULL
                   AND num_nonnulls(signed_off_by_workspace_user_id, signed_off_by_client_portal_grant_id) = 1)),
    CONSTRAINT evaluation_signed_off_absent_chk
        CHECK (status = 'signed_off'
               OR (signed_off_at IS NULL
                   AND signed_off_by_workspace_user_id IS NULL
                   AND signed_off_by_client_portal_grant_id IS NULL))
);

-- IDOR filter
CREATE INDEX idx_evaluation_workspace_client ON public.evaluation (workspace_id, client_id);
-- servicing scope
CREATE INDEX idx_evaluation_subscription_id ON public.evaluation (subscription_id) WHERE subscription_id IS NOT NULL;
-- engagement anchor lookup
CREATE INDEX idx_evaluation_subscription_seat_id ON public.evaluation (subscription_seat_id) WHERE subscription_seat_id IS NOT NULL;
-- cycle membership / progress join
CREATE INDEX idx_evaluation_cycle_id ON public.evaluation (evaluation_cycle_id) WHERE evaluation_cycle_id IS NOT NULL;
-- template usage
CREATE INDEX idx_evaluation_template_id ON public.evaluation (evaluation_template_id) WHERE evaluation_template_id IS NOT NULL;
-- Rating cross-join (Q-RATING-XJOIN-1): latest-rating-per-staff; trailing id DESC = deterministic tie-break
CREATE INDEX idx_evaluation_rating_xjoin
    ON public.evaluation (subject_staff_id, status, submitted_at DESC, id DESC);

-- dup-prevention: two arc-disjoint partial uniques, NULLS NOT DISTINCT so NULL collides.
-- Because performance_review REQUIRES a non-null evaluation_template_id (CHECK above),
-- NULLS NOT DISTINCT + that CHECK means a double-submit for the same
-- (person, type, template, period) collides.
CREATE UNIQUE INDEX uq_evaluation_associate_arc
    ON public.evaluation (client_id, subject_staff_id, evaluation_type, evaluation_template_id, period_start)
    NULLS NOT DISTINCT
    WHERE active AND subject_staff_id IS NOT NULL;
CREATE UNIQUE INDEX uq_evaluation_client_arc
    ON public.evaluation (client_id, subject_client_id, evaluation_type, evaluation_template_id, period_start)
    NULLS NOT DISTINCT
    WHERE active AND subject_client_id IS NOT NULL;

-- -----------------------------------------------------------------------------
-- evaluation_response (child; CASCADE on evaluation_id)
-- -----------------------------------------------------------------------------
CREATE TABLE public.evaluation_response (
    id                  text NOT NULL,
    evaluation_id       text NOT NULL,                          -- FK -> evaluation (CASCADE)
    workspace_id        text NOT NULL,                          -- COPIED from parent; IDOR anchor
    outcome_criteria_id text NOT NULL,                          -- FK -> outcome_criteria
    criteria_version_id text,                                   -- version pin; FK -> outcome_criteria
    criteria_label      text NOT NULL,                          -- SNAPSHOT
    criteria_weight     double precision,                       -- SNAPSHOT
    criteria_type       text NOT NULL,                          -- SNAPSHOT; pins which answer column may be set
    numeric_value       double precision,
    text_value          text,
    categorical_value   text,
    pass_fail_value     boolean,
    comment             text,
    sequence_order      integer NOT NULL DEFAULT 0,
    active              boolean DEFAULT true NOT NULL,
    date_created        timestamp with time zone DEFAULT now(),
    CONSTRAINT evaluation_response_pkey PRIMARY KEY (id),
    CONSTRAINT evaluation_response_evaluation_id_fkey
        FOREIGN KEY (evaluation_id) REFERENCES public.evaluation (id) ON DELETE CASCADE,
    CONSTRAINT evaluation_response_workspace_id_fkey
        FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
    CONSTRAINT evaluation_response_outcome_criteria_id_fkey
        FOREIGN KEY (outcome_criteria_id) REFERENCES public.outcome_criteria (id),
    CONSTRAINT evaluation_response_criteria_version_id_fkey
        FOREIGN KEY (criteria_version_id) REFERENCES public.outcome_criteria (id),
    -- IDOR anchor must be non-empty
    CONSTRAINT evaluation_response_workspace_nonempty_chk
        CHECK (workspace_id <> ''),
    -- enum-domain pin on the snapshotted criteria_type (UNSPECIFIED excluded)
    CONSTRAINT evaluation_response_criteria_type_chk
        CHECK (criteria_type IN ('numeric_range', 'numeric_score', 'pass_fail', 'categorical', 'text', 'multi_check')),
    -- answer one-of: EXACTLY one answer value, matching the snapshotted criteria_type.
    -- Neither-set and multi-set are both rejected at the DB layer.
    CONSTRAINT evaluation_response_answer_oneof_chk
        CHECK (
            (criteria_type IN ('numeric_range', 'numeric_score')
                AND numeric_value IS NOT NULL
                AND text_value IS NULL AND categorical_value IS NULL AND pass_fail_value IS NULL)
            OR (criteria_type = 'pass_fail'
                AND pass_fail_value IS NOT NULL
                AND numeric_value IS NULL AND text_value IS NULL AND categorical_value IS NULL)
            OR (criteria_type = 'categorical'
                AND categorical_value IS NOT NULL
                AND numeric_value IS NULL AND text_value IS NULL AND pass_fail_value IS NULL)
            OR (criteria_type IN ('text', 'multi_check')
                AND text_value IS NOT NULL
                AND numeric_value IS NULL AND categorical_value IS NULL AND pass_fail_value IS NULL)
        )
);

-- parent fan-out (ordered)
CREATE INDEX idx_evaluation_response_evaluation
    ON public.evaluation_response (evaluation_id, sequence_order);
-- workspace scope
CREATE INDEX idx_evaluation_response_workspace
    ON public.evaluation_response (workspace_id);
