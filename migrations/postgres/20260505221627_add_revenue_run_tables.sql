CREATE TABLE public.revenue_run (
    id text NOT NULL,
    workspace_id text NOT NULL,
    client_id text,
    subscription_id text,
    scope_kind text DEFAULT 'workspace'::text NOT NULL,
    as_of_date date NOT NULL,
    selection_count integer DEFAULT 0 NOT NULL,
    created_count integer DEFAULT 0 NOT NULL,
    skipped_count integer DEFAULT 0 NOT NULL,
    errored_count integer DEFAULT 0 NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    initiated_by text NOT NULL,
    initiated_at timestamp with time zone DEFAULT now() NOT NULL,
    completed_at timestamp with time zone,
    notes text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);

CREATE TABLE public.revenue_run_attempt (
    id text NOT NULL,
    run_id text NOT NULL,
    subscription_id text NOT NULL,
    period_start date NOT NULL,
    period_end date NOT NULL,
    period_marker text NOT NULL,
    outcome text NOT NULL,
    revenue_id text,
    error_code text,
    error_message text,
    attempted_at timestamp with time zone DEFAULT now() NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);

ALTER TABLE ONLY public.revenue_run
    ADD CONSTRAINT revenue_run_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.revenue_run_attempt
    ADD CONSTRAINT revenue_run_attempt_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.revenue_run
    ADD CONSTRAINT revenue_run_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);

ALTER TABLE ONLY public.revenue_run
    ADD CONSTRAINT revenue_run_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id);

ALTER TABLE ONLY public.revenue_run
    ADD CONSTRAINT revenue_run_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription(id);

ALTER TABLE ONLY public.revenue_run
    ADD CONSTRAINT revenue_run_initiated_by_fkey FOREIGN KEY (initiated_by) REFERENCES public."user"(id);

ALTER TABLE ONLY public.revenue_run_attempt
    ADD CONSTRAINT revenue_run_attempt_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.revenue_run(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.revenue_run_attempt
    ADD CONSTRAINT revenue_run_attempt_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription(id);

ALTER TABLE ONLY public.revenue_run_attempt
    ADD CONSTRAINT revenue_run_attempt_revenue_id_fkey FOREIGN KEY (revenue_id) REFERENCES public.revenue(id);

ALTER TABLE public.revenue
    ADD COLUMN run_id text;

ALTER TABLE ONLY public.revenue
    ADD CONSTRAINT revenue_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.revenue_run(id) NOT VALID;

CREATE INDEX idx_revenue_run_workspace_status_initiated
    ON public.revenue_run USING btree (workspace_id, status, initiated_at DESC);

CREATE INDEX idx_revenue_run_client_initiated
    ON public.revenue_run USING btree (client_id, initiated_at DESC);

CREATE INDEX idx_revenue_run_subscription_initiated
    ON public.revenue_run USING btree (subscription_id, initiated_at DESC);

CREATE INDEX idx_revenue_run_attempt_run_id
    ON public.revenue_run_attempt USING btree (run_id);

CREATE INDEX idx_revenue_run_attempt_subscription_attempted
    ON public.revenue_run_attempt USING btree (subscription_id, attempted_at DESC);
