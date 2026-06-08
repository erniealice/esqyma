-- =============================================================================
-- subscription_seat — additive migration (OCID foundation Phase 0)
-- One billable/serviced headcount position on a subscription.
-- =============================================================================
--
-- BRAND-NEW empty table. Because it is empty at CREATE, NOT NULL columns, CHECK
-- constraints, and partial unique indexes ship DIRECTLY in CREATE TABLE — the
-- additive-only "NOT VALID -> VALIDATE" two-step only applies when ALTERing a
-- POPULATED table.
--
-- Column-type conventions mirror the baseline (20260502000000_baseline.sql):
--   * id                         text NOT NULL  (PK)
--   * date_created/date_modified timestamp with time zone DEFAULT now()
--   * active                     boolean DEFAULT true NOT NULL
--   * int64 (non-date) fields    bigint    (money in centavos)
--   * int32 fields               integer
--   * proto-enum discriminators  text  (+ CHECK domain pin)
--
-- NOTE: authored directly into the sequence (not via `pnpm db:diff`) because the
-- current migration directory cannot be replayed from empty onto the atlas dev
-- DB (pre-existing: 20260509100000 alters expense_recognition_line before any
-- file creates it on a from-scratch replay), which blocks the db:diff path. The
-- change is purely additive, so `atlas migrate apply` runs it cleanly at HEAD.
-- =============================================================================

CREATE TABLE public.subscription_seat (
    id                   text NOT NULL,
    date_created         timestamp with time zone DEFAULT now(),
    date_modified        timestamp with time zone DEFAULT now(),
    active               boolean DEFAULT true NOT NULL,
    workspace_id         text NOT NULL,                          -- IDOR anchor
    subscription_id      text NOT NULL,                          -- FK -> subscription
    staff_id             text NOT NULL,                          -- CR-1: FK -> entity/staff, NOT product/resource
    client_id            text NOT NULL,                          -- denormalized IDOR anchor; stamped, never from form
    product_plan_id      text NOT NULL,                          -- KEPT billing anchor; FK -> product_plan
    product_variant_id   text,                                   -- optional; FK -> product_variant
    contracted_amount    bigint,                                 -- centavos (int64 money convention)
    contracted_currency  text,
    role_title           text,
    seniority            text,
    date_start           bigint,
    date_end             bigint,
    status               text NOT NULL,                          -- proto SubscriptionSeatStatus enum (NOT string)
    review_cadence_value integer,
    review_cadence_unit  text,
    position             text,
    replaces_id          text,                                   -- self FK -> subscription_seat (SR-2 replacement chain)
    work_request_id      text,                                   -- soft-ref only; work_request table does not exist yet (NO FK)
    CONSTRAINT subscription_seat_pkey PRIMARY KEY (id),
    -- FKs
    CONSTRAINT subscription_seat_subscription_id_fkey
        FOREIGN KEY (subscription_id) REFERENCES public.subscription (id),
    CONSTRAINT subscription_seat_staff_id_fkey
        FOREIGN KEY (staff_id) REFERENCES public.staff (id),               -- CR-1
    CONSTRAINT subscription_seat_client_id_fkey
        FOREIGN KEY (client_id) REFERENCES public.client (id),
    CONSTRAINT subscription_seat_product_plan_id_fkey
        FOREIGN KEY (product_plan_id) REFERENCES public.product_plan (id),
    CONSTRAINT subscription_seat_replaces_id_fkey
        FOREIGN KEY (replaces_id) REFERENCES public.subscription_seat (id), -- self FK
    -- IDOR anchors must be non-empty: reject empty-string sentinels
    CONSTRAINT subscription_seat_idor_anchors_nonempty_chk
        CHECK (workspace_id <> '' AND client_id <> ''),
    -- enum-domain pin: SubscriptionSeatStatus (UNSPECIFIED excluded)
    CONSTRAINT subscription_seat_status_chk
        CHECK (status IN ('proposed', 'active', 'replaced', 'ended'))
);

-- client IDOR filter
CREATE INDEX idx_subscription_seat_workspace_client ON public.subscription_seat (workspace_id, client_id);
-- subscription roster
CREATE INDEX idx_subscription_seat_subscription_id ON public.subscription_seat (subscription_id);
-- person's seats (CR-1: staff, not resource)
CREATE INDEX idx_subscription_seat_staff_id ON public.subscription_seat (staff_id);
-- status filter within workspace
CREATE INDEX idx_subscription_seat_workspace_status ON public.subscription_seat (workspace_id, status);

-- SR-2: at most ONE active seat per headcount position on a subscription.
CREATE UNIQUE INDEX uq_subscription_seat_active_position
    ON public.subscription_seat (subscription_id, position)
    WHERE status = 'active';

-- -----------------------------------------------------------------------------
-- SR-3: contracted_amount is immutable while a seat is ACTIVE.
-- A change to the billed amount on a live seat must go through the
-- REPLACE flow (new seat), never an in-place UPDATE. Enforced by a BEFORE
-- UPDATE trigger that RAISEs if contracted_amount changes while status='active'.
-- (No prior trigger style exists in this migration dir, so this is the standard
--  CREATE FUNCTION ... RETURNS trigger + CREATE TRIGGER ... BEFORE UPDATE form.)
-- -----------------------------------------------------------------------------
CREATE FUNCTION public.subscription_seat_amount_immutable_active()
    RETURNS trigger
    LANGUAGE plpgsql
AS $$
BEGIN
    IF OLD.status = 'active'
       AND NEW.contracted_amount IS DISTINCT FROM OLD.contracted_amount THEN
        RAISE EXCEPTION
            'subscription_seat %: contracted_amount is immutable while status=''active'' (SR-3); use the replace flow',
            OLD.id;
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER subscription_seat_amount_immutable_active_trg
    BEFORE UPDATE ON public.subscription_seat
    FOR EACH ROW
    EXECUTE FUNCTION public.subscription_seat_amount_immutable_active();
