-- =============================================================================
-- communication domain — additive migration (secure messaging / ticketing)
-- Plan: docs/plan/20260603-secure-messaging-ticketing/ (entities.md D.8)
-- =============================================================================
--
-- 4 BRAND-NEW empty tables: conversation, conversation_post,
-- conversation_read_receipt, conversation_participant.
--
-- Because these tables are brand-new and empty at CREATE (directive F), NOT NULL
-- columns, CHECK constraints, and partial unique indexes ship DIRECTLY in the
-- CREATE TABLE — the additive-only "NOT VALID -> VALIDATE" two-step only applies
-- when ALTERing a POPULATED table.
--
-- Column-type conventions mirror the baseline (20260502000000_baseline.sql):
--   * id                         text NOT NULL  (PK)
--   * date_created/date_modified timestamp with time zone DEFAULT now()
--   * active                     boolean DEFAULT true NOT NULL
--   * int64 (non-date) fields    bigint
--   * proto-enum discriminators  text  (+ CHECK domain pin)
--
-- NOTE: authored directly into the sequence (not via `pnpm db:diff`) because the
-- current migration directory cannot be replayed from empty onto the atlas dev DB
-- (pre-existing: 20260509100000 alters expense_recognition_line before any file
-- creates it on a from-scratch replay), which blocks the db:diff path. The change
-- is purely additive with intra-migration FKs only, so `atlas migrate apply`
-- executes it cleanly against a DB already at HEAD.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- conversation (thread header / ticket aggregate) — D.1
-- -----------------------------------------------------------------------------
CREATE TABLE public.conversation (
    id                    text NOT NULL,
    date_created          timestamp with time zone DEFAULT now(),
    date_modified         timestamp with time zone DEFAULT now(),
    active                boolean DEFAULT true NOT NULL,
    workspace_id          text NOT NULL,                              -- IDOR anchor (directive F)
    client_id             text NOT NULL,                              -- IDOR anchor; stamped from session.acting_as_client_id (Q-MSG-5)
    subject               text NOT NULL,
    status                text NOT NULL,                              -- proto ConversationStatus enum domain (Q-MSG-6 / directive G)
    assigned_to_user_id   text,                                       -- "My queue" (Q-MSG-11)
    reference_entity_type text,                                       -- soft linkage type — allowlist CHECK (Q-MSG-14)
    reference_entity_id   text,                                       -- soft ref v1; hard FK when Plan-1 lands
    created_by_user_id    text NOT NULL,
    last_post_at          bigint,                                     -- denorm inbox sort; GREATEST(...) in post txn (M3)
    sla_due_at            bigint,                                     -- nullable; forward-compat response-SLA (v2)
    CONSTRAINT conversation_pkey PRIMARY KEY (id),
    -- IDOR anchors must be non-empty: reject empty-string sentinels (directive F)
    CONSTRAINT conversation_idor_anchors_nonempty_chk
        CHECK (client_id <> '' AND workspace_id <> ''),
    -- enum-domain pin: ConversationStatus (Q-MSG-6)
    CONSTRAINT conversation_status_chk
        CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    -- reference_entity_type allowlist (codex Q-MSG-14)
    CONSTRAINT conversation_reference_entity_type_chk
        CHECK (reference_entity_type IS NULL OR reference_entity_type IN ('request', 'invoice'))
);

-- client IDOR filter
CREATE INDEX idx_conversation_workspace_client ON public.conversation (workspace_id, client_id);
-- staff inbox status filter
CREATE INDEX idx_conversation_workspace_status ON public.conversation (workspace_id, status);
-- "My queue"
CREATE INDEX idx_conversation_assigned_to_user ON public.conversation (assigned_to_user_id);
-- inbox / thread-list sort
CREATE INDEX idx_conversation_last_post_at ON public.conversation (last_post_at);
-- soft-ref lookup
CREATE INDEX idx_conversation_reference_entity_id ON public.conversation (reference_entity_id);

-- -----------------------------------------------------------------------------
-- conversation_post (thread child — NEVER "Message") — D.2
-- -----------------------------------------------------------------------------
CREATE TABLE public.conversation_post (
    id                    text NOT NULL,
    date_created          timestamp with time zone DEFAULT now(),
    date_modified         timestamp with time zone DEFAULT now(),
    active                boolean DEFAULT true NOT NULL,
    conversation_id       text NOT NULL,                              -- FK -> conversation
    workspace_id          text NOT NULL,                              -- denorm from parent (directive H)
    client_id             text NOT NULL,                              -- denorm from parent — IDOR belt-and-suspenders
    sender_principal_type text NOT NULL,                              -- proto SenderPrincipalType enum (Q-MSG-13 / directive G)
    sender_principal_id   text NOT NULL,                              -- principal/grant binding id (codex H1)
    sender_user_id        text NOT NULL,                              -- FK -> user
    body                  text NOT NULL,                              -- rendered TEXT-ONLY, NEVER template.HTML (XSS invariant; redteam N)
    source_type           text NOT NULL,                              -- proto ConversationSourceType enum (Q-MSG-10 / directive G)
    client_token          text,                                       -- idempotency key (Q-MSG-7); required non-empty at use case (codex H3)
    sent_at               bigint,
    CONSTRAINT conversation_post_pkey PRIMARY KEY (id),
    CONSTRAINT conversation_post_conversation_id_fkey
        FOREIGN KEY (conversation_id) REFERENCES public.conversation (id),
    -- IDOR anchors must be non-empty (directive F)
    CONSTRAINT conversation_post_idor_anchors_nonempty_chk
        CHECK (client_id <> '' AND workspace_id <> ''),
    -- enum-domain pins
    CONSTRAINT conversation_post_sender_principal_type_chk
        CHECK (sender_principal_type IN ('client', 'staff')),
    CONSTRAINT conversation_post_source_type_chk
        CHECK (source_type IN ('portal', 'email'))
);

-- FK index
CREATE INDEX idx_conversation_post_conversation_id ON public.conversation_post (conversation_id);
-- denorm workspace scope
CREATE INDEX idx_conversation_post_workspace_id ON public.conversation_post (workspace_id);
-- denorm client IDOR
CREATE INDEX idx_conversation_post_client_id ON public.conversation_post (client_id);
-- idempotency probe
CREATE INDEX idx_conversation_post_client_token ON public.conversation_post (client_token);
-- ordered thread render + unread cursor key (sent_at, id)
CREATE INDEX idx_conversation_post_conversation_sent_at ON public.conversation_post (conversation_id, sent_at);
-- idempotency: one row per (conversation, client_token) when a token is present (Q-MSG-7)
CREATE UNIQUE INDEX uq_conversation_post_conversation_client_token
    ON public.conversation_post (conversation_id, client_token)
    WHERE client_token IS NOT NULL;

-- -----------------------------------------------------------------------------
-- conversation_read_receipt (per-reader-principal unread high-water mark) — D.3
-- -----------------------------------------------------------------------------
CREATE TABLE public.conversation_read_receipt (
    id                    text NOT NULL,
    date_created          timestamp with time zone DEFAULT now(),
    date_modified         timestamp with time zone DEFAULT now(),
    active                boolean DEFAULT true NOT NULL,
    conversation_id       text NOT NULL,                              -- FK -> conversation
    reader_principal_type text NOT NULL,                              -- principal-scoped reader (Q-MSG-12 / codex H1)
    reader_principal_id   text NOT NULL,                              -- binding/grant id of the reader principal
    user_id               text NOT NULL,                              -- FK -> user
    workspace_id          text NOT NULL,                              -- denorm from parent (directive H)
    last_read_post_id     text,                                       -- THE single monotonic cursor (Q-MSG-12)
    last_read_at          bigint,                                     -- DISPLAY-ONLY denorm; NOT the unread comparison key
    CONSTRAINT conversation_read_receipt_pkey PRIMARY KEY (id),
    CONSTRAINT conversation_read_receipt_conversation_id_fkey
        FOREIGN KEY (conversation_id) REFERENCES public.conversation (id),
    CONSTRAINT conversation_read_receipt_last_read_post_id_fkey
        FOREIGN KEY (last_read_post_id) REFERENCES public.conversation_post (id),
    -- IDOR anchor must be non-empty (directive F)
    CONSTRAINT conversation_read_receipt_workspace_nonempty_chk
        CHECK (workspace_id <> '')
);

-- FK / lookup indexes
CREATE INDEX idx_conversation_read_receipt_conversation_id ON public.conversation_read_receipt (conversation_id);
CREATE INDEX idx_conversation_read_receipt_user_id ON public.conversation_read_receipt (user_id);
CREATE INDEX idx_conversation_read_receipt_workspace_id ON public.conversation_read_receipt (workspace_id);
-- one receipt per reader PRINCIPAL per conversation (codex H1 — principal-scoped, NOT user-scoped)
CREATE UNIQUE INDEX uq_conversation_read_receipt_principal
    ON public.conversation_read_receipt (conversation_id, reader_principal_type, reader_principal_id);

-- -----------------------------------------------------------------------------
-- conversation_participant (v2 seam — table shipped v1, queried v2) — D.4
-- -----------------------------------------------------------------------------
CREATE TABLE public.conversation_participant (
    id                         text NOT NULL,
    date_created               timestamp with time zone DEFAULT now(),
    active                     boolean DEFAULT true NOT NULL,
    conversation_id            text NOT NULL,                         -- FK -> conversation
    workspace_id               text NOT NULL,                         -- denorm from parent (directive H)
    user_id                    text,                                  -- NULL for a pure team label
    participant_principal_type text,                                  -- principal binding (codex H1)
    participant_principal_id   text,
    participant_type           text NOT NULL,                         -- proto ConversationParticipantType enum (directive G)
    team_label                 text,                                  -- "Finance team", ... (v2)
    CONSTRAINT conversation_participant_pkey PRIMARY KEY (id),
    CONSTRAINT conversation_participant_conversation_id_fkey
        FOREIGN KEY (conversation_id) REFERENCES public.conversation (id),
    -- IDOR anchor must be non-empty (directive F)
    CONSTRAINT conversation_participant_workspace_nonempty_chk
        CHECK (workspace_id <> ''),
    -- enum-domain pin
    CONSTRAINT conversation_participant_type_chk
        CHECK (participant_type IN ('named_staff', 'team_inbox')),
    -- exclusive-arc shape (codex M2): named_staff carries a user (no label); team_inbox carries a label
    CONSTRAINT conversation_participant_exclusive_arc_chk
        CHECK (
            (participant_type = 'named_staff' AND user_id IS NOT NULL AND team_label IS NULL)
            OR (participant_type = 'team_inbox' AND team_label IS NOT NULL)
        )
);

-- FK / lookup indexes
CREATE INDEX idx_conversation_participant_conversation_id ON public.conversation_participant (conversation_id);
CREATE INDEX idx_conversation_participant_workspace_id ON public.conversation_participant (workspace_id);
-- duplicate-prevention partial uniques (codex M2)
-- one active named-staff row per (conversation, user)
CREATE UNIQUE INDEX uq_conversation_participant_named_staff
    ON public.conversation_participant (conversation_id, user_id)
    WHERE active AND participant_type = 'named_staff';
-- one active team-label row per (conversation, team_label)
CREATE UNIQUE INDEX uq_conversation_participant_team_inbox
    ON public.conversation_participant (conversation_id, team_label)
    WHERE active AND participant_type = 'team_inbox';
