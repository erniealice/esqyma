-- ============================================================
-- supplier_subscriptions P1 migration
-- Creates 6 new procurement domain tables + adds FK back-edges
-- to 5 existing expenditure domain tables.
-- ============================================================

-- ------------------------------------------------------------
-- 1. cost_schedule
-- ------------------------------------------------------------
CREATE TABLE public.cost_schedule (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text NOT NULL,
    description text,
    date_time_start timestamp with time zone NOT NULL,
    date_time_end timestamp with time zone,
    location_id text,
    workspace_id text
);

ALTER TABLE ONLY public.cost_schedule
    ADD CONSTRAINT cost_schedule_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.cost_schedule
    ADD CONSTRAINT cost_schedule_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);

ALTER TABLE ONLY public.cost_schedule
    ADD CONSTRAINT cost_schedule_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(id);

CREATE INDEX idx_cost_schedule_workspace_id ON public.cost_schedule USING btree (workspace_id);
CREATE INDEX idx_cost_schedule_location_id ON public.cost_schedule USING btree (location_id);

-- ------------------------------------------------------------
-- 2. supplier_plan
-- ------------------------------------------------------------
CREATE TABLE public.supplier_plan (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text NOT NULL,
    description text,
    supplier_id text NOT NULL,
    workspace_id text
);

ALTER TABLE ONLY public.supplier_plan
    ADD CONSTRAINT supplier_plan_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.supplier_plan
    ADD CONSTRAINT supplier_plan_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);

ALTER TABLE ONLY public.supplier_plan
    ADD CONSTRAINT supplier_plan_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);

CREATE INDEX idx_supplier_plan_supplier_id ON public.supplier_plan USING btree (supplier_id);
CREATE INDEX idx_supplier_plan_workspace_id ON public.supplier_plan USING btree (workspace_id);

-- ------------------------------------------------------------
-- 3. cost_plan
-- ------------------------------------------------------------
CREATE TABLE public.cost_plan (
    id text NOT NULL,
    supplier_plan_id text NOT NULL,
    name text,
    description text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    billing_amount bigint NOT NULL DEFAULT 0,
    billing_currency text NOT NULL,
    duration_value integer,
    duration_unit text,
    confirmation_template text,
    receipt_template text,
    cost_schedule_id text,
    billing_kind text DEFAULT 'one_time'::text NOT NULL,
    amount_basis text,
    billing_cycle_value integer,
    billing_cycle_unit text,
    default_term_value integer,
    default_term_unit text,
    supplier_id text,
    workspace_id text
);

ALTER TABLE ONLY public.cost_plan
    ADD CONSTRAINT cost_plan_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.cost_plan
    ADD CONSTRAINT cost_plan_supplier_plan_id_fkey FOREIGN KEY (supplier_plan_id) REFERENCES public.supplier_plan(id);

ALTER TABLE ONLY public.cost_plan
    ADD CONSTRAINT cost_plan_cost_schedule_id_fkey FOREIGN KEY (cost_schedule_id) REFERENCES public.cost_schedule(id);

ALTER TABLE ONLY public.cost_plan
    ADD CONSTRAINT cost_plan_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);

ALTER TABLE ONLY public.cost_plan
    ADD CONSTRAINT cost_plan_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);

CREATE INDEX idx_cost_plan_supplier_plan_id ON public.cost_plan USING btree (supplier_plan_id);
CREATE INDEX idx_cost_plan_cost_schedule_id ON public.cost_plan USING btree (cost_schedule_id);
CREATE INDEX idx_cost_plan_supplier_id ON public.cost_plan USING btree (supplier_id);
CREATE INDEX idx_cost_plan_workspace_id ON public.cost_plan USING btree (workspace_id);

-- ------------------------------------------------------------
-- 4. supplier_product_plan
-- ------------------------------------------------------------
CREATE TABLE public.supplier_product_plan (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text NOT NULL,
    description text,
    product_id text NOT NULL,
    supplier_plan_id text NOT NULL,
    product_variant_id text
);

ALTER TABLE ONLY public.supplier_product_plan
    ADD CONSTRAINT supplier_product_plan_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.supplier_product_plan
    ADD CONSTRAINT supplier_product_plan_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);

ALTER TABLE ONLY public.supplier_product_plan
    ADD CONSTRAINT supplier_product_plan_supplier_plan_id_fkey FOREIGN KEY (supplier_plan_id) REFERENCES public.supplier_plan(id);

ALTER TABLE ONLY public.supplier_product_plan
    ADD CONSTRAINT supplier_product_plan_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES public.product_variant(id);

CREATE INDEX idx_supplier_product_plan_product_id ON public.supplier_product_plan USING btree (product_id);
CREATE INDEX idx_supplier_product_plan_supplier_plan_id ON public.supplier_product_plan USING btree (supplier_plan_id);
CREATE INDEX idx_supplier_product_plan_product_variant_id ON public.supplier_product_plan USING btree (product_variant_id);

-- ------------------------------------------------------------
-- 5. supplier_product_cost_plan
-- ------------------------------------------------------------
CREATE TABLE public.supplier_product_cost_plan (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    cost_plan_id text NOT NULL,
    supplier_product_plan_id text NOT NULL,
    billing_amount bigint NOT NULL DEFAULT 0,
    billing_currency text NOT NULL,
    billing_treatment text DEFAULT 'recurring'::text NOT NULL,
    date_start text,
    date_end text
);

ALTER TABLE ONLY public.supplier_product_cost_plan
    ADD CONSTRAINT supplier_product_cost_plan_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.supplier_product_cost_plan
    ADD CONSTRAINT supplier_product_cost_plan_cost_plan_id_fkey FOREIGN KEY (cost_plan_id) REFERENCES public.cost_plan(id);

ALTER TABLE ONLY public.supplier_product_cost_plan
    ADD CONSTRAINT supplier_product_cost_plan_supplier_product_plan_id_fkey FOREIGN KEY (supplier_product_plan_id) REFERENCES public.supplier_product_plan(id);

CREATE INDEX idx_supplier_product_cost_plan_cost_plan_id ON public.supplier_product_cost_plan USING btree (cost_plan_id);
CREATE INDEX idx_supplier_product_cost_plan_supplier_product_plan_id ON public.supplier_product_cost_plan USING btree (supplier_product_plan_id);

-- ------------------------------------------------------------
-- 6. supplier_subscription
-- ------------------------------------------------------------
CREATE TABLE public.supplier_subscription (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text NOT NULL,
    cost_plan_id text NOT NULL,
    supplier_id text NOT NULL,
    date_time_start timestamp with time zone,
    date_time_end timestamp with time zone,
    metadata jsonb DEFAULT '{}'::jsonb,
    code text,
    workspace_id text,
    procurement_request_id text,
    location_id text,
    auto_renew boolean DEFAULT false NOT NULL
);

ALTER TABLE ONLY public.supplier_subscription
    ADD CONSTRAINT supplier_subscription_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.supplier_subscription
    ADD CONSTRAINT supplier_subscription_cost_plan_id_fkey FOREIGN KEY (cost_plan_id) REFERENCES public.cost_plan(id);

ALTER TABLE ONLY public.supplier_subscription
    ADD CONSTRAINT supplier_subscription_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);

ALTER TABLE ONLY public.supplier_subscription
    ADD CONSTRAINT supplier_subscription_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);

ALTER TABLE ONLY public.supplier_subscription
    ADD CONSTRAINT supplier_subscription_procurement_request_id_fkey FOREIGN KEY (procurement_request_id) REFERENCES public.procurement_request(id);

ALTER TABLE ONLY public.supplier_subscription
    ADD CONSTRAINT supplier_subscription_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(id);

CREATE INDEX idx_supplier_subscription_cost_plan_id ON public.supplier_subscription USING btree (cost_plan_id);
CREATE INDEX idx_supplier_subscription_supplier_id ON public.supplier_subscription USING btree (supplier_id);
CREATE INDEX idx_supplier_subscription_workspace_id ON public.supplier_subscription USING btree (workspace_id);
CREATE INDEX idx_supplier_subscription_procurement_request_id ON public.supplier_subscription USING btree (procurement_request_id);
CREATE INDEX idx_supplier_subscription_location_id ON public.supplier_subscription USING btree (location_id);
CREATE INDEX idx_supplier_subscription_active_workspace ON public.supplier_subscription USING btree (workspace_id, active);

-- ------------------------------------------------------------
-- 7. FK back-edges on existing tables
-- ------------------------------------------------------------

-- purchase_order: add supplier_subscription_id (field 40) + billing_kind (field 41)
ALTER TABLE public.purchase_order
    ADD COLUMN supplier_subscription_id text,
    ADD COLUMN billing_kind text;

ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT purchase_order_supplier_subscription_id_fkey
    FOREIGN KEY (supplier_subscription_id) REFERENCES public.supplier_subscription(id) NOT VALID;

CREATE INDEX idx_purchase_order_supplier_subscription_id ON public.purchase_order USING btree (supplier_subscription_id);

-- expenditure: add supplier_subscription_id (field 34) + cost_plan_id (field 35)
-- Note: spec proposed fields 30/31 but those are taken by expense_recognition_id/accrued_expense_id.
ALTER TABLE public.expenditure
    ADD COLUMN supplier_subscription_id text,
    ADD COLUMN cost_plan_id text;

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_supplier_subscription_id_fkey
    FOREIGN KEY (supplier_subscription_id) REFERENCES public.supplier_subscription(id) NOT VALID;

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_cost_plan_id_fkey
    FOREIGN KEY (cost_plan_id) REFERENCES public.cost_plan(id) NOT VALID;

CREATE INDEX idx_expenditure_supplier_subscription_id ON public.expenditure USING btree (supplier_subscription_id);
CREATE INDEX idx_expenditure_cost_plan_id ON public.expenditure USING btree (cost_plan_id);

-- expenditure_line_item: add supplier_product_cost_plan_id (field 28)
-- Note: spec proposed field 22 but that is taken by rate_table_id.
ALTER TABLE public.expenditure_line_item
    ADD COLUMN supplier_product_cost_plan_id text;

ALTER TABLE ONLY public.expenditure_line_item
    ADD CONSTRAINT expenditure_line_item_supplier_product_cost_plan_id_fkey
    FOREIGN KEY (supplier_product_cost_plan_id) REFERENCES public.supplier_product_cost_plan(id) NOT VALID;

CREATE INDEX idx_expenditure_line_item_supplier_product_cost_plan_id ON public.expenditure_line_item USING btree (supplier_product_cost_plan_id);

-- prepayment: add supplier_subscription_id (field 21)
ALTER TABLE public.prepayment
    ADD COLUMN supplier_subscription_id text;

ALTER TABLE ONLY public.prepayment
    ADD CONSTRAINT prepayment_supplier_subscription_id_fkey
    FOREIGN KEY (supplier_subscription_id) REFERENCES public.supplier_subscription(id) NOT VALID;

CREATE INDEX idx_prepayment_supplier_subscription_id ON public.prepayment USING btree (supplier_subscription_id);

-- procurement_request: add spawned_supplier_subscription_id (field 41)
-- Note: spec proposed field 22 but that is taken by needed_by_date. Placed at field 41 in the
-- spawned artifacts section (after purchase_order_id at field 40).
ALTER TABLE public.procurement_request
    ADD COLUMN spawned_supplier_subscription_id text;

ALTER TABLE ONLY public.procurement_request
    ADD CONSTRAINT procurement_request_spawned_supplier_subscription_id_fkey
    FOREIGN KEY (spawned_supplier_subscription_id) REFERENCES public.supplier_subscription(id) NOT VALID;

CREATE INDEX idx_procurement_request_spawned_supplier_subscription_id ON public.procurement_request USING btree (spawned_supplier_subscription_id);
