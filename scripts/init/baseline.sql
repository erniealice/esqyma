--
-- PostgreSQL database dump
--


-- Dumped from database version 18.3 (Postgres.app)
-- Dumped by pg_dump version 18.3 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: audit_trail; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA audit_trail;


--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';


SET default_tablespace = '';

--
-- Name: audit_entry; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_entry (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    workspace_id uuid NOT NULL,
    actor_id text NOT NULL,
    actor_type smallint NOT NULL,
    actor_ip inet,
    actor_user_agent text,
    entity_type text NOT NULL,
    entity_id text NOT NULL,
    domain text NOT NULL,
    action smallint NOT NULL,
    permission_code text,
    use_case text,
    reason text,
    method_name text NOT NULL,
    request_id text,
    transaction_id bigint,
    field_count smallint DEFAULT 0 NOT NULL,
    occurred_at timestamp with time zone DEFAULT now() NOT NULL
)
PARTITION BY RANGE (occurred_at);


SET default_table_access_method = heap;

--
-- Name: audit_entry_2026_03; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_entry_2026_03 (
    id uuid DEFAULT gen_random_uuid() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid CONSTRAINT audit_entry_workspace_id_not_null NOT NULL,
    actor_id text CONSTRAINT audit_entry_actor_id_not_null NOT NULL,
    actor_type smallint CONSTRAINT audit_entry_actor_type_not_null NOT NULL,
    actor_ip inet,
    actor_user_agent text,
    entity_type text CONSTRAINT audit_entry_entity_type_not_null NOT NULL,
    entity_id text CONSTRAINT audit_entry_entity_id_not_null NOT NULL,
    domain text CONSTRAINT audit_entry_domain_not_null NOT NULL,
    action smallint CONSTRAINT audit_entry_action_not_null NOT NULL,
    permission_code text,
    use_case text,
    reason text,
    method_name text CONSTRAINT audit_entry_method_name_not_null NOT NULL,
    request_id text,
    transaction_id bigint,
    field_count smallint DEFAULT 0 CONSTRAINT audit_entry_field_count_not_null NOT NULL,
    occurred_at timestamp with time zone DEFAULT now() CONSTRAINT audit_entry_occurred_at_not_null NOT NULL
);


--
-- Name: audit_entry_2026_04; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_entry_2026_04 (
    id uuid DEFAULT gen_random_uuid() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid CONSTRAINT audit_entry_workspace_id_not_null NOT NULL,
    actor_id text CONSTRAINT audit_entry_actor_id_not_null NOT NULL,
    actor_type smallint CONSTRAINT audit_entry_actor_type_not_null NOT NULL,
    actor_ip inet,
    actor_user_agent text,
    entity_type text CONSTRAINT audit_entry_entity_type_not_null NOT NULL,
    entity_id text CONSTRAINT audit_entry_entity_id_not_null NOT NULL,
    domain text CONSTRAINT audit_entry_domain_not_null NOT NULL,
    action smallint CONSTRAINT audit_entry_action_not_null NOT NULL,
    permission_code text,
    use_case text,
    reason text,
    method_name text CONSTRAINT audit_entry_method_name_not_null NOT NULL,
    request_id text,
    transaction_id bigint,
    field_count smallint DEFAULT 0 CONSTRAINT audit_entry_field_count_not_null NOT NULL,
    occurred_at timestamp with time zone DEFAULT now() CONSTRAINT audit_entry_occurred_at_not_null NOT NULL
);


--
-- Name: audit_entry_2026_05; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_entry_2026_05 (
    id uuid DEFAULT gen_random_uuid() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid CONSTRAINT audit_entry_workspace_id_not_null NOT NULL,
    actor_id text CONSTRAINT audit_entry_actor_id_not_null NOT NULL,
    actor_type smallint CONSTRAINT audit_entry_actor_type_not_null NOT NULL,
    actor_ip inet,
    actor_user_agent text,
    entity_type text CONSTRAINT audit_entry_entity_type_not_null NOT NULL,
    entity_id text CONSTRAINT audit_entry_entity_id_not_null NOT NULL,
    domain text CONSTRAINT audit_entry_domain_not_null NOT NULL,
    action smallint CONSTRAINT audit_entry_action_not_null NOT NULL,
    permission_code text,
    use_case text,
    reason text,
    method_name text CONSTRAINT audit_entry_method_name_not_null NOT NULL,
    request_id text,
    transaction_id bigint,
    field_count smallint DEFAULT 0 CONSTRAINT audit_entry_field_count_not_null NOT NULL,
    occurred_at timestamp with time zone DEFAULT now() CONSTRAINT audit_entry_occurred_at_not_null NOT NULL
);


--
-- Name: audit_field_change; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_field_change (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    audit_entry_id uuid NOT NULL,
    field_name text NOT NULL,
    field_type smallint NOT NULL,
    old_value text,
    new_value text
);


--
-- Name: account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account (
    id text NOT NULL,
    code text,
    name text,
    description text,
    element text,
    classification text,
    group_id text,
    parent_id text,
    cash_flow_activity text,
    normal_balance text,
    is_system_account boolean DEFAULT false NOT NULL,
    is_contra boolean DEFAULT false NOT NULL,
    status text,
    notes text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: account_group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account_group (
    id text NOT NULL,
    name text,
    description text,
    element text DEFAULT ''::text NOT NULL,
    classification text DEFAULT ''::text NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: account_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account_template (
    id text NOT NULL,
    name text,
    description text,
    industry_type text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now()
);


--
-- Name: accrued_expense; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.accrued_expense (
    id text NOT NULL,
    workspace_id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    internal_id text NOT NULL,
    name text NOT NULL,
    description text,
    supplier_contract_id text NOT NULL,
    supplier_id text,
    period_start timestamp with time zone,
    period_end timestamp with time zone,
    recognition_date timestamp with time zone NOT NULL,
    cycle_date text,
    currency text DEFAULT ''::text NOT NULL,
    accrued_amount bigint DEFAULT 0 NOT NULL,
    settled_amount bigint DEFAULT 0 NOT NULL,
    remaining_amount bigint DEFAULT 0 NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    accrual_account_id text,
    expense_account_id text,
    notes text,
    metadata jsonb
);


--
-- Name: accrued_expense_settlement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.accrued_expense_settlement (
    id text NOT NULL,
    workspace_id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    accrued_expense_id text NOT NULL,
    expenditure_id text NOT NULL,
    expenditure_line_item_id text,
    amount_settled bigint DEFAULT 0 NOT NULL,
    currency text DEFAULT ''::text NOT NULL,
    fx_rate double precision,
    fx_adjustment_amount bigint,
    settled_at timestamp with time zone NOT NULL,
    reversed_by_settlement_id text,
    reversal_reason text
);


--
-- Name: activity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activity (
    id text NOT NULL,
    stage_id text,
    activity_template_id text,
    name text,
    description text,
    status text,
    priority text,
    assigned_to text,
    completed_by text,
    date_assigned bigint,
    date_started bigint,
    date_completed bigint,
    date_due bigint,
    input_data_json text,
    output_data_json text,
    result_json text,
    error_message text,
    approval_comments text,
    rejection_reason text,
    estimated_duration_minutes integer,
    actual_duration_minutes integer,
    created_by text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    completion_percentage integer,
    attachment_ids text,
    order_index integer,
    stage_order_index integer
);


--
-- Name: activity_execution_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activity_execution_log (
    id text NOT NULL,
    workflow_id text,
    activity_id text,
    activity_template_id text,
    status text,
    start_time text,
    end_time text,
    input_snapshot_json text,
    output_snapshot_json text,
    error_message text,
    created_by text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    workspace_id text
);


--
-- Name: activity_expense; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activity_expense (
    activity_id text,
    expense_category text,
    vendor_ref text,
    receipt_url text,
    reimbursable boolean,
    expense_category_id text,
    payment_method text,
    markup_pct_override double precision
);


--
-- Name: activity_labor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activity_labor (
    activity_id text,
    staff_id text,
    hours double precision,
    rate_type text,
    time_start bigint,
    time_end bigint
);


--
-- Name: activity_material; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activity_material (
    activity_id text,
    product_id text,
    unit_of_measure text,
    lot_number text,
    location_id text
);


--
-- Name: activity_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activity_template (
    id text NOT NULL,
    name text,
    description text,
    stage_template_id text,
    status text,
    activity_type text,
    order_index integer,
    is_required boolean,
    condition_expression text,
    assignee_type text,
    default_assignee_id text,
    estimated_duration_minutes integer,
    configuration_json text,
    validation_rules_json text,
    created_by text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    input_schema_json text,
    output_schema_json text,
    use_case_code text,
    rollback_use_case_code text
);


--
-- Name: admin; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin (
    id text NOT NULL,
    user_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: asset; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asset (
    id text NOT NULL,
    asset_number text,
    name text,
    description text,
    asset_type text,
    asset_category_id text,
    serial_number text,
    tag_number text,
    manufacturer text,
    model text,
    location_id text,
    custodian_id text,
    vendor_id text,
    product_id text,
    purchase_order_number text,
    invoice_number text,
    acquisition_date text,
    date_placed_in_service bigint,
    acquisition_cost bigint,
    currency text,
    salvage_value bigint,
    book_value double precision DEFAULT 0 NOT NULL,
    fair_value bigint,
    useful_life_months integer,
    useful_life_units bigint,
    depreciation_method text,
    depreciation_rate double precision,
    depreciation_start_date text,
    accumulated_depreciation double precision DEFAULT 0 NOT NULL,
    measurement_model text DEFAULT 'COST'::text NOT NULL,
    status text,
    warranty_expiry_date timestamp with time zone,
    notes text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: asset_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asset_category (
    id text NOT NULL,
    code text,
    name text,
    description text,
    parent_category_id text,
    default_depreciation_method text DEFAULT 'STRAIGHT_LINE'::text NOT NULL,
    default_useful_life_months integer DEFAULT 0 NOT NULL,
    default_salvage_value_percent double precision DEFAULT 0 NOT NULL,
    asset_cost_account text,
    accumulated_depreciation_account text,
    depreciation_expense_account text,
    gain_on_disposal_account text,
    loss_on_disposal_account text,
    impairment_loss_account text,
    revaluation_surplus_account text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    depreciation_method text,
    useful_life_months integer,
    salvage_pct numeric(15,2)
);


--
-- Name: asset_component; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asset_component (
    id text NOT NULL,
    asset_id text,
    name text,
    description text,
    cost bigint,
    salvage_value bigint,
    useful_life_months integer,
    depreciation_method text,
    accumulated_depreciation bigint,
    book_value bigint,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: asset_disposal; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asset_disposal (
    id text NOT NULL,
    asset_id text,
    disposal_date text,
    disposal_type text,
    proceeds bigint,
    cost_at_disposal bigint,
    accumulated_depreciation_at_disposal bigint,
    book_value_at_disposal bigint,
    gain_or_loss bigint,
    buyer_name text,
    reason text,
    approval_status text,
    approved_by text,
    journal_entry_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: asset_location; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asset_location (
    id text NOT NULL,
    asset_id text,
    location_id text,
    is_primary boolean,
    assignment_type text,
    date_assigned bigint,
    date_unassigned bigint,
    notes text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: asset_maintenance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asset_maintenance (
    id text NOT NULL,
    asset_id text,
    maintenance_type text,
    priority text,
    status text,
    scheduled_date text,
    start_date text,
    completion_date text,
    description text,
    cost bigint,
    is_capitalized boolean DEFAULT false NOT NULL,
    performed_by text,
    vendor_id text,
    work_order_number text,
    next_maintenance_date text,
    recurrence_interval_days integer,
    notes text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: asset_revaluation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asset_revaluation (
    id text NOT NULL,
    asset_id text,
    revaluation_date text,
    previous_carrying_amount bigint,
    new_fair_value bigint,
    revaluation_amount bigint,
    is_increase boolean,
    recognized_in_pnl bigint,
    recognized_in_oci bigint,
    revaluation_surplus_balance bigint,
    appraiser_name text,
    valuation_method text,
    journal_entry_id text,
    notes text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: asset_transaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asset_transaction (
    id text NOT NULL,
    asset_id text,
    transaction_type text,
    transaction_date timestamp with time zone,
    amount bigint,
    description text,
    reference_number text,
    from_location_id text,
    to_location_id text,
    journal_entry_id text,
    performed_by text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: attachment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.attachment (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    module_key text,
    foreign_key text,
    name text,
    description text,
    workspace_id text,
    storage_container text,
    storage_key text,
    content_type text,
    file_size_bytes bigint,
    created_by text,
    status text DEFAULT 'active'::text NOT NULL
);


--
-- Name: attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.attribute (
    id text NOT NULL,
    name text,
    description text,
    code text,
    data_type text,
    module text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: attribute_value; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.attribute_value (
    id text NOT NULL,
    attribute_id text,
    value text,
    sort_order integer,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: balance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.balance (
    id text NOT NULL,
    amount bigint,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    client_id text,
    subscription_id text,
    currency text,
    balance_type text
);


--
-- Name: balance_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.balance_attribute (
    id text NOT NULL,
    balance_id text,
    attribute_id text,
    value text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: billing_event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.billing_event (
    id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    subscription_id text NOT NULL,
    job_id text,
    job_phase_id text,
    job_template_phase_id text,
    product_price_plan_id text,
    billable_amount bigint DEFAULT 0 NOT NULL,
    billing_currency text DEFAULT ''::text NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    trigger integer DEFAULT 0 NOT NULL,
    revenue_id text,
    triggered_at bigint,
    billed_at bigint,
    reason text,
    parent_event_id text,
    sequence_label text
);


--
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.category (
    id text NOT NULL,
    name text,
    description text,
    code text,
    module text,
    parent_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    display_order integer
);


--
-- Name: client; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client (
    id text NOT NULL,
    user_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    internal_id text,
    category_id text,
    name text,
    street_address text,
    city text,
    province text,
    postal_code text,
    notes text,
    payment_term_id text,
    billing_currency text,
    status text,
    first_name text,
    last_name text,
    email text,
    workspace_id text
);


--
-- Name: client_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_attribute (
    id text NOT NULL,
    client_id text,
    attribute_id text,
    value text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: client_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_category (
    id text NOT NULL,
    client_id text,
    category_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: collection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.collection (
    id text NOT NULL,
    name text,
    description text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: collection_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.collection_attribute (
    id text NOT NULL,
    collection_id text,
    attribute_id text,
    value text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: collection_method; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.collection_method (
    id text NOT NULL,
    name text,
    provider_name text,
    active boolean DEFAULT true
);


--
-- Name: collection_parent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.collection_parent (
    id text NOT NULL,
    collection_parent_id text,
    collection_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: collection_plan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.collection_plan (
    id text NOT NULL,
    collection_id text,
    plan_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: criteria_option; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.criteria_option (
    id text NOT NULL,
    outcome_criteria_id text,
    option_key text,
    option_label text,
    display_order integer,
    severity integer,
    maps_to_determination text,
    required boolean,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: criteria_threshold; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.criteria_threshold (
    id text NOT NULL,
    outcome_criteria_id text,
    threshold_role text,
    value double precision,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: deferred_revenue; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deferred_revenue (
    id text NOT NULL,
    description text,
    customer_name text,
    total_amount bigint,
    recognized_amount bigint DEFAULT 0 NOT NULL,
    remaining_amount bigint,
    start_date text,
    end_date text,
    recognition_months integer,
    status text,
    liability_account_id text,
    revenue_account_id text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: delegate; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delegate (
    id text NOT NULL,
    user_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: delegate_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delegate_attribute (
    id text NOT NULL,
    delegate_id text,
    attribute_id text,
    value text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: delegate_client; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delegate_client (
    id text NOT NULL,
    delegate_id text,
    client_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: depreciation_schedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.depreciation_schedule (
    id text NOT NULL,
    asset_id text,
    period_number integer,
    fiscal_year integer,
    fiscal_period integer,
    period_start_date text,
    period_end_date text,
    opening_book_value bigint,
    depreciation_amount bigint,
    accumulated_depreciation bigint,
    closing_book_value bigint,
    units_produced bigint,
    is_posted boolean,
    journal_entry_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: disbursement_method; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.disbursement_method (
    id text NOT NULL,
    name text,
    provider_name text,
    active boolean DEFAULT true
);


--
-- Name: equity_account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.equity_account (
    id text NOT NULL,
    name text,
    account_type text,
    owner_name text,
    account_id text,
    balance bigint DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: equity_transaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.equity_transaction (
    id text NOT NULL,
    equity_account_id text,
    transaction_type text,
    amount bigint,
    description text,
    transaction_date timestamp with time zone,
    journal_entry_id text,
    date_created timestamp with time zone DEFAULT now()
);


--
-- Name: event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event (
    id text NOT NULL,
    name text,
    description text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    start_date_time_utc bigint,
    end_date_time_utc bigint,
    timezone text,
    workspace_id text,
    organizer_id text,
    location_id text,
    event_recurrence_id text,
    status text,
    all_day boolean,
    parent_event_id text,
    original_occurrence_utc bigint
);


--
-- Name: event_attendee; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_attendee (
    id text NOT NULL,
    event_id text,
    client_id text,
    workspace_user_id text,
    role text,
    status text,
    is_organizer boolean,
    display_name text,
    workspace_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: event_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_attribute (
    id text NOT NULL,
    event_id text,
    attribute_id text,
    value text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: event_client; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_client (
    id text NOT NULL,
    event_id text,
    client_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: event_occurrence; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_occurrence (
    id text NOT NULL,
    event_id text,
    start_date_time_utc bigint,
    end_date_time_utc bigint,
    is_exception boolean,
    is_cancelled boolean,
    exception_event_id text,
    workspace_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: event_product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_product (
    id text NOT NULL,
    event_id text,
    product_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    quantity integer,
    unit_price bigint,
    currency text,
    total_price bigint,
    notes text
);


--
-- Name: event_recurrence; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_recurrence (
    id text NOT NULL,
    name text,
    description text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    workspace_id text,
    freq text,
    "interval" integer,
    count integer,
    until_utc bigint,
    by_day text,
    by_month_day text
);


--
-- Name: event_resource; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_resource (
    id text NOT NULL,
    event_id text,
    resource_id text,
    resource_type text,
    status text,
    name text,
    workspace_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: event_tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_tag (
    id text NOT NULL,
    workspace_id text,
    name text,
    description text,
    color text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: event_tag_assignment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_tag_assignment (
    id text NOT NULL,
    event_id text,
    event_tag_id text,
    "position" integer,
    workspace_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: expenditure; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.expenditure (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text,
    expenditure_type text DEFAULT 'expense'::text NOT NULL,
    vendor_id text,
    expenditure_date timestamp with time zone,
    total_amount numeric(15,2) DEFAULT 0 NOT NULL,
    currency text DEFAULT 'PHP'::text NOT NULL,
    status text DEFAULT 'draft'::text NOT NULL,
    reference_number text,
    notes text,
    expenditure_category_id text,
    location_id text,
    payment_terms text,
    due_date timestamp with time zone,
    approved_by text,
    expenditure_date_string text,
    date_created_string text,
    date_modified_string text,
    supplier_contract_id text,
    petty_cash_fund_id text,
    supplier_id text,
    payment_term_id text,
    purchase_order_id text,
    expense_recognition_id text,
    accrued_expense_id text,
    cycle_date text,
    source text
);


--
-- Name: expenditure_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.expenditure_category (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    code text,
    name text,
    description text
);


--
-- Name: expenditure_line_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.expenditure_line_item (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    expenditure_id text,
    product_id text,
    description text,
    quantity numeric(15,2) DEFAULT 1 NOT NULL,
    unit_price numeric(15,2) DEFAULT 0 NOT NULL,
    line_amount numeric(15,2) DEFAULT 0 NOT NULL,
    notes text,
    supplier_contract_line_id text,
    rate_table_id text,
    pay_cycle_id text,
    applied_basis_amount bigint,
    proration_factor double precision,
    calc_metadata text,
    line_kind text,
    purchase_order_line_item_id text,
    inventory_item_id text,
    location_id text
);


--
-- Name: expense_recognition; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.expense_recognition (
    id text NOT NULL,
    workspace_id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    internal_id text NOT NULL,
    name text NOT NULL,
    description text,
    recognition_date timestamp with time zone NOT NULL,
    period_start timestamp with time zone,
    period_end timestamp with time zone,
    currency text DEFAULT ''::text NOT NULL,
    total_amount bigint DEFAULT 0 NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    supplier_contract_id text,
    expenditure_id text,
    deferred_expense_id text,
    accrued_expense_id text,
    cycle_date text,
    idempotency_key text NOT NULL,
    reversal_of_recognition_id text,
    expense_account_id text,
    accrual_account_id text,
    journal_entry_id text,
    supplier_id text,
    location_id text,
    expenditure_category_id text,
    job_phase_id text,
    notes text,
    metadata jsonb
);


--
-- Name: expense_recognition_line; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.expense_recognition_line (
    id text NOT NULL,
    workspace_id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    expense_recognition_id text NOT NULL,
    supplier_contract_line_id text,
    expenditure_line_item_id text,
    product_id text,
    description text DEFAULT ''::text NOT NULL,
    quantity double precision DEFAULT 0 NOT NULL,
    unit_amount bigint DEFAULT 0 NOT NULL,
    amount bigint DEFAULT 0 NOT NULL,
    currency text DEFAULT ''::text NOT NULL,
    expense_account_id text,
    job_activity_id text
);


--
-- Name: fiscal_period; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fiscal_period (
    id text NOT NULL,
    name text,
    period_number integer DEFAULT 0 NOT NULL,
    fiscal_year integer DEFAULT 0 NOT NULL,
    start_date text,
    end_date text,
    status text,
    closed_by text,
    closed_at timestamp with time zone,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: fulfillment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fulfillment (
    id text NOT NULL,
    workspace_id text,
    revenue_id text,
    supplier_id text,
    delivery_mode text,
    status text,
    provider_status text DEFAULT ''::text NOT NULL,
    provider_reference text DEFAULT ''::text NOT NULL,
    delivery_cost double precision DEFAULT 0 NOT NULL,
    currency text,
    expenditure_id text,
    notes text DEFAULT ''::text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    created_by text,
    scheduled_at text,
    delivered_at text
);


--
-- Name: fulfillment_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fulfillment_item (
    id text NOT NULL,
    fulfillment_id text,
    revenue_line_item_id text,
    product_id text,
    delivery_mode text,
    source_type text,
    source_id text,
    quantity_ordered double precision,
    quantity_delivered double precision,
    status text,
    notes text,
    date_created timestamp with time zone DEFAULT now()
);


--
-- Name: fulfillment_return; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fulfillment_return (
    id text NOT NULL,
    fulfillment_id text,
    reason text,
    status text,
    refund_amount bigint,
    currency text,
    processed_by_id text,
    notes text,
    date_created timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: fulfillment_return_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fulfillment_return_item (
    id text NOT NULL,
    fulfillment_return_id text,
    fulfillment_item_id text,
    quantity_returned double precision,
    reason text,
    date_created timestamp with time zone DEFAULT now()
);


--
-- Name: fulfillment_status_event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fulfillment_status_event (
    id bigint NOT NULL,
    fulfillment_id text,
    from_status text,
    to_status text,
    provider_status text,
    provider_reference text,
    triggered_by_id text,
    reason text
);


--
-- Name: group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."group" (
    id text NOT NULL,
    name text,
    description text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: group_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.group_attribute (
    id text NOT NULL,
    group_id text,
    attribute_id text,
    value text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: integration_config; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.integration_config (
    id text NOT NULL,
    workspace_id text,
    integration_type text,
    provider_id text,
    display_name text,
    enabled boolean DEFAULT false NOT NULL,
    webhook_url text,
    webhook_secret text,
    health_status text,
    last_health_check timestamp with time zone,
    health_message text,
    created_by text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: inventory_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inventory_attribute (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    inventory_item_id text,
    attribute_id text,
    value text
);


--
-- Name: inventory_depreciation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inventory_depreciation (
    id text NOT NULL,
    inventory_item_id text,
    method text,
    cost_basis bigint,
    salvage_value bigint,
    useful_life_months integer,
    start_date text,
    accumulated_depreciation bigint,
    book_value bigint,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: inventory_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inventory_item (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text,
    product_id text,
    location_id text,
    sku text,
    quantity_on_hand numeric(15,2) DEFAULT 0 NOT NULL,
    quantity_reserved numeric(15,2) DEFAULT 0 NOT NULL,
    quantity_available numeric(15,2) DEFAULT 0 NOT NULL,
    reorder_level numeric(15,2) DEFAULT 0,
    unit_of_measure text DEFAULT 'unit'::text NOT NULL,
    notes text,
    product_variant_id text
);


--
-- Name: inventory_movement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inventory_movement (
    id text NOT NULL,
    movement_type text,
    product_id text,
    quantity double precision,
    unit_cost bigint,
    from_location_id text,
    to_location_id text,
    movement_date timestamp with time zone,
    created_by text,
    date_created timestamp with time zone DEFAULT now(),
    job_id text,
    job_activity_id text,
    inventory_item_id text,
    inventory_serial_id text,
    reference_type text,
    reference_id text,
    status text,
    notes text,
    performed_by text,
    active boolean DEFAULT true NOT NULL,
    workspace_id text
);


--
-- Name: inventory_serial; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inventory_serial (
    id text NOT NULL,
    inventory_item_id text,
    serial_number text,
    imei text,
    status text,
    warranty_start text,
    warranty_end text,
    purchase_order text,
    notes text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: inventory_serial_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inventory_serial_history (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    inventory_serial_id text,
    inventory_item_id text,
    from_status text,
    to_status text,
    reference_type text,
    reference_id text,
    notes text,
    changed_by text,
    changed_by_role text
);


--
-- Name: invoice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.invoice (
    id text NOT NULL,
    invoice_number text,
    amount bigint,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    subscription_id text
);


--
-- Name: invoice_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.invoice_attribute (
    id text NOT NULL,
    invoice_id text,
    attribute_id text,
    value text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: job; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text DEFAULT ''::text NOT NULL,
    job_template_id text,
    origin_type text,
    origin_id text,
    client_id text,
    demand_type text,
    fulfillment_type text,
    cost_flow_type text,
    billing_rule_type text,
    status text,
    approval_status text DEFAULT ''::text NOT NULL,
    posting_status text DEFAULT ''::text NOT NULL,
    billing_status text DEFAULT ''::text NOT NULL,
    location_id text,
    created_by text,
    workspace_id text,
    parent_job_id text,
    cycle_index integer,
    cycle_period_start text,
    cycle_period_end text,
    usage_request_date date,
    usage_ordinal integer
);


--
-- Name: job_activity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_activity (
    id text NOT NULL,
    job_id text,
    job_task_id text,
    entry_type text,
    quantity double precision,
    unit_cost bigint,
    total_cost bigint,
    currency text,
    entry_date timestamp with time zone,
    description text,
    billable_status text,
    approval_status text,
    posting_status text,
    posted_by text,
    date_posted bigint,
    reversal_of_id text,
    created_by text,
    date_created timestamp with time zone DEFAULT now(),
    active boolean,
    workspace_id text,
    resource_id text,
    bill_rate bigint,
    bill_amount bigint
);


--
-- Name: job_outcome_summary; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_outcome_summary (
    id text NOT NULL,
    job_id text,
    summary_type text,
    overall_determination text,
    scoring_method text,
    summary_score double precision,
    total_criteria_count integer,
    pass_count integer,
    fail_count integer,
    conditional_count integer,
    deferred_count integer,
    na_count integer,
    narrative text,
    issued_by text,
    issued_date timestamp with time zone,
    valid_until_date text,
    supersedes_id text,
    attachment_ids text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: job_phase; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_phase (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean,
    job_id text,
    name text,
    phase_order integer,
    status text
);


--
-- Name: job_settlement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_settlement (
    id text NOT NULL,
    job_activity_id text,
    target_type text,
    target_id text,
    allocated_amount bigint,
    allocation_pct double precision,
    settlement_date timestamp with time zone,
    status text,
    reversal_of_id text,
    created_by text,
    date_created timestamp with time zone DEFAULT now(),
    active boolean,
    workspace_id text,
    billed_quantity double precision,
    billed_amount bigint
);


--
-- Name: job_task; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_task (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean,
    job_phase_id text,
    name text,
    step_order integer,
    status text,
    is_ad_hoc boolean DEFAULT false NOT NULL,
    assigned_to text
);


--
-- Name: job_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_template (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text,
    description text,
    default_fulfillment_type text,
    default_cost_flow_type text,
    default_billing_rule_type text,
    workspace_id text
);


--
-- Name: job_template_phase; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_template_phase (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    job_template_id text,
    name text,
    phase_order integer,
    triggers_billing boolean,
    billing_percent_bps integer,
    billing_amount bigint,
    billing_currency text
);


--
-- Name: job_template_relation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_template_relation (
    id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    parent_template_id text NOT NULL,
    child_template_id text NOT NULL,
    sequence_order integer DEFAULT 0 NOT NULL,
    relation_type integer DEFAULT 0 NOT NULL
);


--
-- Name: job_template_task; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_template_task (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    job_template_phase_id text,
    name text,
    step_order integer,
    estimated_duration_minutes integer
);


--
-- Name: journal_entry; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.journal_entry (
    id text NOT NULL,
    entry_number text,
    description text,
    entry_date timestamp with time zone,
    status text,
    source_type text,
    source_id text,
    fiscal_period_id text,
    total_debit bigint,
    total_credit bigint,
    posted_by text,
    posted_at timestamp with time zone,
    reversed_by text,
    reversed_at timestamp with time zone,
    reversal_entry_id text,
    notes text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: journal_line; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.journal_line (
    id text NOT NULL,
    journal_entry_id text,
    account_id text,
    description text,
    debit_amount bigint DEFAULT 0 NOT NULL,
    credit_amount bigint DEFAULT 0 NOT NULL,
    line_order integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now()
);


--
-- Name: leave_balance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.leave_balance (
    id text NOT NULL,
    workspace_id text,
    supplier_id text,
    leave_type_id text,
    year integer DEFAULT 0 NOT NULL,
    accrued_days integer DEFAULT 0 NOT NULL,
    used_days integer DEFAULT 0 NOT NULL,
    carryover_days integer DEFAULT 0 NOT NULL,
    last_accrued_on text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: leave_request; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.leave_request (
    id text NOT NULL,
    workspace_id text,
    supplier_id text,
    leave_type_id text,
    start_date text,
    end_date text,
    days integer DEFAULT 0 NOT NULL,
    status text DEFAULT ''::text NOT NULL,
    approved_by_user_id text,
    reason text,
    approved_on text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: leave_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.leave_type (
    id text NOT NULL,
    workspace_id text,
    compliance_region text,
    code text,
    name text DEFAULT ''::text NOT NULL,
    paid boolean DEFAULT true NOT NULL,
    accrual_days_per_year integer DEFAULT 0 NOT NULL,
    max_carryover_days integer DEFAULT 0 NOT NULL,
    source_citation text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: license; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.license (
    id text NOT NULL,
    subscription_id text,
    plan_id text,
    license_key text,
    external_key text,
    license_type text,
    status text,
    date_valid_from bigint,
    date_valid_until bigint,
    assignee_id text,
    assignee_type text,
    assignee_name text,
    assigned_by text,
    date_assigned bigint,
    sequence_number integer,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: license_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.license_history (
    id text NOT NULL,
    license_id text,
    action text,
    assignee_id text,
    assignee_type text,
    assignee_name text,
    previous_assignee_id text,
    previous_assignee_type text,
    previous_assignee_name text,
    performed_by text,
    reason text,
    notes text,
    license_status_before text,
    license_status_after text,
    date_created timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: line; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.line (
    id text NOT NULL,
    name text,
    description text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: loan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.loan (
    id text NOT NULL,
    loan_number text,
    description text,
    loan_type text,
    lender_name text,
    principal_amount bigint,
    interest_rate double precision,
    term_months integer,
    start_date text,
    maturity_date text,
    status text,
    remaining_balance bigint,
    account_id text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: loan_payment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.loan_payment (
    id text NOT NULL,
    loan_id text,
    payment_number text,
    payment_date text,
    principal_amount bigint,
    interest_amount bigint,
    fee_amount bigint DEFAULT 0 NOT NULL,
    total_amount bigint,
    remaining_balance bigint,
    notes text,
    date_created timestamp with time zone DEFAULT now()
);


--
-- Name: location; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.location (
    id text NOT NULL,
    name text,
    address text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    description text,
    timezone text DEFAULT 'Asia/Manila'::text,
    location_area_id text,
    workspace_id text
);


--
-- Name: location_area; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.location_area (
    id text NOT NULL,
    name text,
    description text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    workspace_id text
);


--
-- Name: location_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.location_attribute (
    id text NOT NULL,
    location_id text,
    attribute_id text,
    value text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: outcome_criteria; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.outcome_criteria (
    id text NOT NULL,
    criteria_group_id text,
    version integer,
    version_status text,
    supersedes_id text,
    scope text,
    industry_code text,
    workspace_id text,
    overrides_id text,
    name text,
    description text,
    criteria_type text,
    unit text,
    decimal_places integer,
    min_score integer,
    max_score integer,
    score_increment double precision,
    pass_label text,
    fail_label text,
    max_text_length integer,
    text_prompt text,
    pass_rule text,
    min_pass_count integer,
    determination_mode text,
    allowed_determinations text,
    aggregation_method text,
    aggregation_pass_pct double precision,
    weight double precision DEFAULT 1.0 NOT NULL,
    tags text,
    required boolean,
    active boolean DEFAULT true NOT NULL,
    created_by text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: pay_cycle; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pay_cycle (
    id text NOT NULL,
    workspace_id text,
    payroll_run_id text,
    cutoff_start text,
    cutoff_end text,
    pay_date text,
    half_index text DEFAULT ''::text NOT NULL,
    status text DEFAULT ''::text NOT NULL,
    sequence_no integer DEFAULT 0 NOT NULL,
    total_gross bigint DEFAULT 0 NOT NULL,
    total_deductions bigint DEFAULT 0 NOT NULL,
    total_net bigint DEFAULT 0 NOT NULL,
    employee_count integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: payment_method; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_method (
    id text NOT NULL,
    name text,
    provider_name text,
    active boolean DEFAULT true
);


--
-- Name: payment_term; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_term (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text,
    code text,
    type text,
    net_days integer,
    discount_days integer,
    discount_percent_bps integer,
    entity_scope text,
    is_default boolean,
    description text,
    display_order integer,
    proximate_day integer,
    workspace_id text
);


--
-- Name: payroll_remittance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payroll_remittance (
    id text NOT NULL,
    payroll_run_id text,
    remittance_type text,
    amount bigint,
    due_date text,
    status text,
    filed_at timestamp with time zone,
    paid_at timestamp with time zone,
    reference_number text,
    date_created timestamp with time zone DEFAULT now()
);


--
-- Name: payroll_run; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payroll_run (
    id text NOT NULL,
    run_number text,
    pay_period_start text,
    pay_period_end text,
    total_gross bigint DEFAULT 0 NOT NULL,
    total_deductions bigint DEFAULT 0 NOT NULL,
    total_net bigint DEFAULT 0 NOT NULL,
    employee_count integer DEFAULT 0 NOT NULL,
    status text,
    approved_by text,
    posted_at timestamp with time zone,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    compliance_region text,
    calculator_version text,
    workspace_id text,
    active boolean DEFAULT true
);


--
-- Name: permission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.permission (
    id text NOT NULL,
    workspace_id text,
    user_id text,
    granted_by_user_id text,
    permission_code text,
    permission_type text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text DEFAULT ''::text NOT NULL,
    description text DEFAULT ''::text NOT NULL
);


--
-- Name: petty_cash_fund; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.petty_cash_fund (
    id text NOT NULL,
    name text,
    authorized_amount bigint,
    current_balance bigint DEFAULT 0 NOT NULL,
    custodian_id text,
    location_id text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: petty_cash_replenishment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.petty_cash_replenishment (
    id text NOT NULL,
    fund_id text,
    replenishment_number text,
    amount bigint,
    replenishment_date timestamp with time zone,
    voucher_ids text,
    posted_by text,
    notes text,
    date_created timestamp with time zone DEFAULT now()
);


--
-- Name: petty_cash_voucher; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.petty_cash_voucher (
    id text NOT NULL,
    fund_id text,
    voucher_number text,
    payee text,
    description text,
    total_amount bigint,
    status text,
    approved_by text,
    approved_at timestamp with time zone,
    date_created timestamp with time zone DEFAULT now()
);


--
-- Name: phase_outcome_summary; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.phase_outcome_summary (
    id text NOT NULL,
    job_phase_id text,
    job_id text,
    summary_type text,
    phase_determination text,
    scoring_method text,
    summary_score double precision,
    total_criteria_count integer,
    pass_count integer,
    fail_count integer,
    conditional_count integer,
    deferred_count integer,
    na_count integer,
    narrative text,
    issued_by text,
    issued_date timestamp with time zone,
    supersedes_id text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: plan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.plan (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text,
    description text,
    thumbnail_url text,
    legacy_price_list_id text,
    workspace_id text,
    job_template_id text,
    visits_per_cycle integer,
    client_id text,
    parent_id text
);


--
-- Name: plan_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.plan_attribute (
    id text NOT NULL,
    plan_id text,
    attribute_id text,
    value text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: plan_location; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.plan_location (
    id text NOT NULL,
    plan_id text,
    location_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: plan_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.plan_settings (
    id text NOT NULL,
    plan_id text,
    name text,
    description text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: prepayment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.prepayment (
    id text NOT NULL,
    description text,
    vendor_name text,
    total_amount bigint,
    remaining_amount bigint,
    start_date text,
    end_date text,
    amortization_months integer,
    status text,
    account_id text,
    expense_account_id text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    supplier_contract_id text,
    expenditure_id text
);


--
-- Name: price_list; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.price_list (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text,
    description text,
    date_start text,
    date_end text,
    location_id text
);


--
-- Name: price_plan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.price_plan (
    id text NOT NULL,
    plan_id text,
    name text,
    description text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    billing_amount bigint,
    billing_currency text,
    duration_value integer,
    duration_unit text,
    confirmation_template text,
    receipt_template text,
    price_schedule_id text,
    billing_kind text DEFAULT 'one_time'::text,
    amount_basis text,
    billing_cycle_value integer,
    billing_cycle_unit text,
    default_term_value integer,
    default_term_unit text,
    legacy_price_list_id text,
    entitled_occurrences integer,
    client_id text
);


--
-- Name: price_product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.price_product (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    product_id text,
    name text,
    description text,
    amount bigint,
    currency text,
    date_start text,
    date_end text,
    price_list_id text
);


--
-- Name: price_schedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.price_schedule (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text,
    description text,
    location_id text,
    legacy_price_list_id text,
    date_time_start timestamp with time zone,
    date_time_end timestamp with time zone,
    date_start text,
    date_end text,
    workspace_id text,
    client_id text
);


--
-- Name: procurement_request; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.procurement_request (
    id text NOT NULL,
    workspace_id text,
    request_number text,
    status text DEFAULT ''::text NOT NULL,
    requester_user_id text,
    supplier_id text,
    location_id text,
    currency text,
    estimated_total_amount bigint DEFAULT 0 NOT NULL,
    needed_by_date text,
    justification text,
    notes text,
    approved_by text,
    approved_at bigint,
    approved_at_string text,
    rejection_reason text,
    purchase_order_id text,
    expenditure_category_id text,
    expense_account_id text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    fulfillment_strategy integer,
    policy_decision_log text
);


--
-- Name: procurement_request_line; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.procurement_request_line (
    id text NOT NULL,
    procurement_request_id text,
    product_id text,
    description text DEFAULT ''::text NOT NULL,
    line_type text DEFAULT ''::text NOT NULL,
    quantity double precision DEFAULT 0 NOT NULL,
    estimated_unit_price bigint DEFAULT 0 NOT NULL,
    estimated_total_price bigint DEFAULT 0 NOT NULL,
    supplier_contract_line_id text,
    expenditure_category_id text,
    expense_account_id text,
    location_id text,
    line_number integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    fulfillment_mode integer,
    spawned_supplier_contract_id text,
    spawned_purchase_order_line_item_id text,
    spawned_expenditure_id text,
    recurring_cycle_value integer,
    recurring_cycle_unit text,
    recurring_term_value integer,
    recurring_term_unit text,
    spawn_status integer DEFAULT 0 NOT NULL,
    spawn_error text,
    spawn_idempotency_key text DEFAULT ''::text NOT NULL,
    spawn_attempted_at bigint,
    spawn_completed_at bigint
);


--
-- Name: product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text,
    description text,
    price bigint,
    currency text,
    line_id text,
    product_kind text,
    delivery_mode text,
    tracking_mode text,
    unit text,
    variant_mode text DEFAULT 'none'::text NOT NULL,
    workspace_id text
);


--
-- Name: product_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_attribute (
    id text NOT NULL,
    product_id text,
    attribute_id text,
    value text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    default_value text
);


--
-- Name: product_collection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_collection (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    product_id text,
    collection_id text,
    sort_order integer
);


--
-- Name: product_line; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_line (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    product_id text,
    line_id text,
    sort_order integer
);


--
-- Name: product_option; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_option (
    id text NOT NULL,
    product_id text,
    name text,
    code text,
    data_type text DEFAULT 'text_list'::text NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    min_value double precision,
    max_value double precision,
    required boolean DEFAULT false NOT NULL,
    description text
);


--
-- Name: product_option_value; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_option_value (
    id text NOT NULL,
    product_option_id text,
    label text,
    value text,
    sort_order integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: product_plan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_plan (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text,
    description text,
    product_id text,
    plan_id text,
    product_variant_id text
);


--
-- Name: product_price_plan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_price_plan (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    price_plan_id text,
    product_plan_id text,
    billing_amount bigint,
    billing_currency text,
    billing_treatment text,
    date_start text,
    date_end text,
    job_template_phase_id text
);


--
-- Name: product_variant; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_variant (
    id text NOT NULL,
    product_id text,
    sku text,
    price_override bigint,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: product_variant_image; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_variant_image (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    product_variant_id text,
    image_url text,
    alt_text text,
    sort_order integer,
    is_primary boolean
);


--
-- Name: product_variant_option; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_variant_option (
    id text NOT NULL,
    product_variant_id text,
    product_option_value_id text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: purchase_order; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.purchase_order (
    id text NOT NULL,
    po_number text,
    po_type text,
    status text,
    supplier_id text,
    location_id text,
    order_date timestamp with time zone,
    expected_delivery_date timestamp with time zone,
    currency text,
    subtotal bigint,
    tax_amount bigint,
    total_amount bigint,
    payment_terms text,
    shipping_terms text,
    approved_by text,
    approved_date timestamp with time zone,
    parent_po_id text,
    blanket_start_date text,
    blanket_end_date text,
    blanket_total_quantity double precision,
    blanket_released_quantity double precision,
    notes text,
    reference_number text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    payment_term_id text,
    supplier_contract_id text,
    procurement_request_id text
);


--
-- Name: purchase_order_line_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.purchase_order_line_item (
    id text NOT NULL,
    purchase_order_id text,
    product_id text,
    description text,
    line_type text,
    quantity_ordered double precision,
    quantity_received double precision,
    quantity_billed double precision,
    unit_price bigint,
    total_price bigint,
    location_id text,
    inventory_item_id text,
    required_by_date timestamp with time zone,
    notes text,
    line_number integer,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    supplier_contract_line_id text,
    procurement_request_line_id text
);


--
-- Name: rate_band; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rate_band (
    id text NOT NULL,
    rate_table_id text,
    lower_bound_centavos bigint DEFAULT 0 NOT NULL,
    upper_bound_centavos bigint,
    rate_type text DEFAULT ''::text NOT NULL,
    rate_basis_points integer DEFAULT 0 NOT NULL,
    fixed_amount_centavos bigint DEFAULT 0 NOT NULL,
    formula_expression text,
    ordinal integer DEFAULT 0 NOT NULL,
    metadata text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: rate_table; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rate_table (
    id text NOT NULL,
    workspace_id text,
    compliance_region text,
    kind text,
    effective_from text,
    effective_to text,
    version_label text DEFAULT ''::text NOT NULL,
    supersedes_id text,
    source_citation text DEFAULT ''::text NOT NULL,
    status text DEFAULT ''::text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: recurring_journal_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recurring_journal_template (
    id text NOT NULL,
    name text,
    description text,
    frequency text,
    next_run_date timestamp with time zone,
    end_date text,
    template_description text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: resource; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.resource (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text,
    description text,
    product_id text,
    user_id text
);


--
-- Name: revenue; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.revenue (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text,
    client_id text,
    revenue_date timestamp with time zone,
    total_amount bigint DEFAULT 0 NOT NULL,
    currency text DEFAULT 'PHP'::text NOT NULL,
    status text DEFAULT 'draft'::text NOT NULL,
    reference_number text,
    notes text,
    revenue_category_id text,
    location_id text,
    checkout_session_id text,
    payment_provider text,
    fulfillment_type text,
    delivery_address text,
    revenue_account_id text,
    journal_entry_id text,
    fulfillment_status text,
    revenue_date_string text,
    date_created_string text,
    date_modified_string text,
    subscription_id text,
    payment_term_id text,
    due_date timestamp with time zone,
    due_date_string text,
    period_marker text,
    workspace_id text,
    job_phase_id text,
    billing_event_id text
);


--
-- Name: revenue_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.revenue_category (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    code text,
    name text,
    description text
);


--
-- Name: revenue_line_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.revenue_line_item (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean,
    revenue_id text,
    product_id text,
    description text,
    quantity double precision,
    unit_price bigint,
    total_price bigint,
    notes text,
    line_item_type text,
    inventory_item_id text,
    inventory_serial_id text,
    price_list_id text,
    variant_id text,
    variant_label text,
    location_id text,
    cost_price bigint,
    product_price_plan_id text,
    price_product_id text,
    job_activity_id text,
    line_amount bigint DEFAULT 0 NOT NULL,
    workspace_id text,
    subscription_id text
);


--
-- Name: revenue_payment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.revenue_payment (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    revenue_id text,
    collection_method_id text,
    amount numeric(15,2) DEFAULT 0 NOT NULL,
    currency text DEFAULT 'PHP'::text NOT NULL,
    reference_number text,
    collection_type text DEFAULT 'sale'::text,
    status text DEFAULT 'completed'::text
);


--
-- Name: role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role (
    id text NOT NULL,
    workspace_id text,
    name text,
    description text,
    color text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: role_permission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role_permission (
    id text NOT NULL,
    role_id text,
    permission_id text,
    permission_type text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: schema_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.schema_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: security_deposit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.security_deposit (
    id text NOT NULL,
    direction text,
    counterparty_name text,
    amount bigint,
    deposit_date timestamp with time zone,
    status text,
    account_id text,
    notes text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    id text NOT NULL,
    user_id text,
    token text,
    workspace_user_id text,
    workspace_id text,
    expires_at bigint,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint
);


--
-- Name: staff; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.staff (
    id text NOT NULL,
    user_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: staff_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.staff_attribute (
    id text NOT NULL,
    staff_id text,
    attribute_id text,
    value text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: stage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stage (
    id text NOT NULL,
    workflow_id text,
    workflow_instance_id text,
    stage_template_id text,
    name text,
    description text,
    status text,
    priority text,
    assigned_to text,
    completed_by text,
    date_started bigint,
    date_completed bigint,
    date_due bigint,
    result_json text,
    error_message text,
    created_by text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    completion_percentage integer
);


--
-- Name: stage_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stage_template (
    id text NOT NULL,
    name text,
    description text,
    workflow_template_id text,
    status text,
    stage_type text,
    order_index integer,
    is_required boolean,
    condition_expression text,
    created_by text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: subscription; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscription (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text,
    price_plan_id text,
    client_id text,
    quantity integer,
    assigned_count integer,
    available_count integer,
    default_license_type text,
    auto_assign boolean,
    code text,
    date_time_start timestamp with time zone,
    date_time_end timestamp with time zone,
    entitled_occurrences_override integer
);


--
-- Name: subscription_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscription_attribute (
    id text NOT NULL,
    subscription_id text,
    attribute_id text,
    value text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: supplier; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier (
    id text NOT NULL,
    user_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    internal_id text,
    category_id text,
    supplier_type text DEFAULT 'individual'::text,
    name text,
    tax_id text,
    registration_number text,
    street_address text,
    city text,
    province text,
    postal_code text,
    country text,
    billing_currency text,
    payment_terms text,
    lead_time_days integer,
    credit_limit bigint,
    status text,
    client_id text,
    website text,
    notes text,
    payment_term_id text,
    currency text DEFAULT 'PHP'::text,
    kind text DEFAULT 'vendor'::text NOT NULL,
    "position" text,
    department text,
    timezone text,
    workspace_id text
);


--
-- Name: supplier_attribute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier_attribute (
    id text NOT NULL,
    supplier_id text,
    attribute_id text,
    value text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: supplier_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier_category (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    code text DEFAULT ''::text NOT NULL,
    name text DEFAULT ''::text NOT NULL,
    description text
);


--
-- Name: supplier_contract; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier_contract (
    id text NOT NULL,
    workspace_id text,
    internal_id text,
    name text,
    description text,
    reference_number text,
    supplier_id text,
    kind text DEFAULT ''::text NOT NULL,
    status text DEFAULT ''::text NOT NULL,
    billing_kind text,
    billing_cycle_value integer,
    billing_cycle_unit text,
    default_term_value integer,
    default_term_unit text,
    date_time_start text,
    date_time_end text,
    auto_renew boolean DEFAULT false NOT NULL,
    renewal_notice_days integer,
    currency text,
    committed_amount bigint,
    released_amount bigint DEFAULT 0 NOT NULL,
    billed_amount bigint DEFAULT 0 NOT NULL,
    remaining_amount bigint DEFAULT 0 NOT NULL,
    cycle_amount bigint,
    payment_term_id text,
    commitment_quantity double precision,
    released_quantity double precision DEFAULT 0 NOT NULL,
    requested_by text,
    requested_date bigint,
    requested_date_string text,
    approved_by text,
    approved_date bigint,
    approved_date_string text,
    rejection_reason text,
    location_id text,
    expense_account_id text,
    accrual_account_id text,
    expenditure_category_id text,
    notes text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    pay_frequency text,
    employment_class text,
    "position" text,
    department text
);


--
-- Name: supplier_contract_line; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier_contract_line (
    id text NOT NULL,
    supplier_contract_id text,
    product_id text,
    description text DEFAULT ''::text NOT NULL,
    line_type text DEFAULT ''::text NOT NULL,
    quantity double precision DEFAULT 0 NOT NULL,
    unit_price bigint DEFAULT 0 NOT NULL,
    total_amount bigint DEFAULT 0 NOT NULL,
    treatment text DEFAULT ''::text NOT NULL,
    start_date text,
    end_date text,
    expenditure_category_id text,
    expense_account_id text,
    location_id text,
    line_number integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    kind text,
    supplier_contract_price_schedule_line_id text
);


--
-- Name: supplier_contract_price_schedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier_contract_price_schedule (
    id text NOT NULL,
    workspace_id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    internal_id text NOT NULL,
    supplier_contract_id text NOT NULL,
    name text NOT NULL,
    description text,
    date_time_start timestamp with time zone NOT NULL,
    date_time_end timestamp with time zone,
    location_id text,
    currency text DEFAULT ''::text NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    sequence_number integer DEFAULT 1 NOT NULL,
    notes text,
    metadata jsonb
);


--
-- Name: supplier_contract_price_schedule_line; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier_contract_price_schedule_line (
    id text NOT NULL,
    workspace_id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    supplier_contract_price_schedule_id text CONSTRAINT supplier_contract_price_sch_supplier_contract_price_sc_not_null NOT NULL,
    supplier_contract_line_id text CONSTRAINT supplier_contract_price_sche_supplier_contract_line_id_not_null NOT NULL,
    currency text DEFAULT ''::text NOT NULL,
    unit_price bigint DEFAULT 0 NOT NULL,
    minimum_amount bigint,
    quantity double precision,
    cycle_value_override integer,
    cycle_unit_override text,
    notes text,
    metadata jsonb
);


--
-- Name: supplier_dependent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier_dependent (
    id text NOT NULL,
    workspace_id text,
    supplier_id text,
    full_name text DEFAULT ''::text NOT NULL,
    relationship text DEFAULT ''::text NOT NULL,
    date_of_birth text,
    philhealth_enrolled boolean DEFAULT false NOT NULL,
    bir_dependent boolean DEFAULT false NOT NULL,
    metadata text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: supplier_lifecycle_event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier_lifecycle_event (
    id text NOT NULL,
    workspace_id text,
    supplier_id text,
    kind text DEFAULT ''::text NOT NULL,
    category text DEFAULT ''::text NOT NULL,
    event_date text,
    supplier_contract_id text,
    actor_user_id text,
    reason text,
    metadata text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now()
);


--
-- Name: task_outcome; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.task_outcome (
    id text NOT NULL,
    job_task_id text,
    criteria_version_id text,
    criteria_type text,
    is_ad_hoc boolean,
    numeric_value double precision,
    text_value text,
    categorical_value text,
    pass_fail_value boolean,
    determination text,
    determination_source text,
    determination_note text,
    auto_proposed_determination text,
    recorded_by text,
    recorded_date timestamp with time zone,
    recorded_by_name text,
    reviewed_by text,
    reviewed_date timestamp with time zone,
    attachment_ids text,
    revision_of_id text,
    revision_number integer DEFAULT 1 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: task_outcome_check; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.task_outcome_check (
    id text NOT NULL,
    task_outcome_id text,
    criteria_option_id text,
    checked boolean,
    note text,
    date_created timestamp with time zone DEFAULT now()
);


--
-- Name: template_task_criteria; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.template_task_criteria (
    id text NOT NULL,
    job_template_task_id text,
    outcome_criteria_id text,
    sequence_order integer,
    required_override boolean,
    weight_override double precision,
    aggregation_method_override text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now()
);


--
-- Name: treasury_collection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.treasury_collection (
    id text NOT NULL,
    name text,
    amount bigint,
    status text,
    revenue_id text,
    collection_method_id text,
    currency text,
    reference_number text,
    payment_date text,
    received_by text,
    received_role text,
    collection_type text,
    active boolean DEFAULT true,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: treasury_disbursement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.treasury_disbursement (
    id text NOT NULL,
    name text,
    amount bigint,
    status text,
    expenditure_id text,
    disbursement_type text,
    currency text,
    reference_number text,
    payment_date text,
    approved_by text,
    active boolean DEFAULT true,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id text NOT NULL,
    first_name text,
    last_name text,
    email_address text,
    mobile_number text,
    password_hash text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    timezone text DEFAULT 'Asia/Manila'::text,
    password_reset_token text,
    password_reset_expires timestamp with time zone,
    failed_login_attempts integer DEFAULT 0 NOT NULL,
    locked_until timestamp with time zone
);


--
-- Name: workflow; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workflow (
    id text NOT NULL,
    name text,
    description text,
    status text,
    workspace_id text,
    created_by text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    version integer,
    workflow_template_id text,
    context_json text,
    current_stage_index integer
);


--
-- Name: workflow_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workflow_template (
    id text NOT NULL,
    name text,
    description text,
    workspace_id text,
    status text,
    business_type text,
    configuration_json text,
    version integer,
    created_by text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    input_schema_json text,
    system_id text,
    is_system boolean
);


--
-- Name: workspace; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workspace (
    id text NOT NULL,
    name text,
    description text,
    private boolean,
    workflow_template_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    functional_currency text,
    default_currency text,
    compliance_region text
);


--
-- Name: workspace_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workspace_user (
    id text NOT NULL,
    workspace_id text,
    user_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: workspace_user_role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workspace_user_role (
    id text NOT NULL,
    workspace_user_id text,
    role_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL
);


--
-- Name: audit_entry_2026_03; Type: TABLE ATTACH; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry ATTACH PARTITION audit_trail.audit_entry_2026_03 FOR VALUES FROM ('2026-03-01 00:00:00+08') TO ('2026-04-01 00:00:00+08');


--
-- Name: audit_entry_2026_04; Type: TABLE ATTACH; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry ATTACH PARTITION audit_trail.audit_entry_2026_04 FOR VALUES FROM ('2026-04-01 00:00:00+08') TO ('2026-05-01 00:00:00+08');


--
-- Name: audit_entry_2026_05; Type: TABLE ATTACH; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry ATTACH PARTITION audit_trail.audit_entry_2026_05 FOR VALUES FROM ('2026-05-01 00:00:00+08') TO ('2026-06-01 00:00:00+08');


--
-- Name: audit_entry audit_entry_pkey; Type: CONSTRAINT; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry
    ADD CONSTRAINT audit_entry_pkey PRIMARY KEY (occurred_at, id);


--
-- Name: audit_entry_2026_03 audit_entry_2026_03_pkey; Type: CONSTRAINT; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry_2026_03
    ADD CONSTRAINT audit_entry_2026_03_pkey PRIMARY KEY (occurred_at, id);


--
-- Name: audit_entry_2026_04 audit_entry_2026_04_pkey; Type: CONSTRAINT; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry_2026_04
    ADD CONSTRAINT audit_entry_2026_04_pkey PRIMARY KEY (occurred_at, id);


--
-- Name: audit_entry_2026_05 audit_entry_2026_05_pkey; Type: CONSTRAINT; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry_2026_05
    ADD CONSTRAINT audit_entry_2026_05_pkey PRIMARY KEY (occurred_at, id);


--
-- Name: account account_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_code_key UNIQUE (code);


--
-- Name: account_group account_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_group
    ADD CONSTRAINT account_group_pkey PRIMARY KEY (id);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: account_template account_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account_template
    ADD CONSTRAINT account_template_pkey PRIMARY KEY (id);


--
-- Name: accrued_expense accrued_expense_internal_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accrued_expense
    ADD CONSTRAINT accrued_expense_internal_id_key UNIQUE (internal_id);


--
-- Name: accrued_expense accrued_expense_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accrued_expense
    ADD CONSTRAINT accrued_expense_pkey PRIMARY KEY (id);


--
-- Name: accrued_expense_settlement accrued_expense_settlement_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accrued_expense_settlement
    ADD CONSTRAINT accrued_expense_settlement_pkey PRIMARY KEY (id);


--
-- Name: activity_execution_log activity_execution_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity_execution_log
    ADD CONSTRAINT activity_execution_log_pkey PRIMARY KEY (id);


--
-- Name: activity activity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (id);


--
-- Name: activity_template activity_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity_template
    ADD CONSTRAINT activity_template_pkey PRIMARY KEY (id);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- Name: asset asset_asset_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset
    ADD CONSTRAINT asset_asset_number_key UNIQUE (asset_number);


--
-- Name: asset_category asset_category_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_category
    ADD CONSTRAINT asset_category_code_key UNIQUE (code);


--
-- Name: asset_category asset_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_category
    ADD CONSTRAINT asset_category_pkey PRIMARY KEY (id);


--
-- Name: asset_component asset_component_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_component
    ADD CONSTRAINT asset_component_pkey PRIMARY KEY (id);


--
-- Name: asset_disposal asset_disposal_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_disposal
    ADD CONSTRAINT asset_disposal_pkey PRIMARY KEY (id);


--
-- Name: asset_location asset_location_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_location
    ADD CONSTRAINT asset_location_pkey PRIMARY KEY (id);


--
-- Name: asset_maintenance asset_maintenance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_maintenance
    ADD CONSTRAINT asset_maintenance_pkey PRIMARY KEY (id);


--
-- Name: asset asset_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset
    ADD CONSTRAINT asset_pkey PRIMARY KEY (id);


--
-- Name: asset_revaluation asset_revaluation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_revaluation
    ADD CONSTRAINT asset_revaluation_pkey PRIMARY KEY (id);


--
-- Name: asset_transaction asset_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_transaction
    ADD CONSTRAINT asset_transaction_pkey PRIMARY KEY (id);


--
-- Name: attachment attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.attachment
    ADD CONSTRAINT attachment_pkey PRIMARY KEY (id);


--
-- Name: attribute attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.attribute
    ADD CONSTRAINT attribute_pkey PRIMARY KEY (id);


--
-- Name: attribute_value attribute_value_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.attribute_value
    ADD CONSTRAINT attribute_value_pkey PRIMARY KEY (id);


--
-- Name: balance_attribute balance_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.balance_attribute
    ADD CONSTRAINT balance_attribute_pkey PRIMARY KEY (id);


--
-- Name: balance balance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.balance
    ADD CONSTRAINT balance_pkey PRIMARY KEY (id);


--
-- Name: billing_event billing_event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.billing_event
    ADD CONSTRAINT billing_event_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: client_attribute client_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_attribute
    ADD CONSTRAINT client_attribute_pkey PRIMARY KEY (id);


--
-- Name: client_category client_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_category
    ADD CONSTRAINT client_category_pkey PRIMARY KEY (id);


--
-- Name: client client_internal_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_internal_id_key UNIQUE (internal_id);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- Name: collection_attribute collection_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_attribute
    ADD CONSTRAINT collection_attribute_pkey PRIMARY KEY (id);


--
-- Name: collection_method collection_method_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_method
    ADD CONSTRAINT collection_method_pkey PRIMARY KEY (id);


--
-- Name: collection_parent collection_parent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_parent
    ADD CONSTRAINT collection_parent_pkey PRIMARY KEY (id);


--
-- Name: collection collection_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection
    ADD CONSTRAINT collection_pkey PRIMARY KEY (id);


--
-- Name: collection_plan collection_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_plan
    ADD CONSTRAINT collection_plan_pkey PRIMARY KEY (id);


--
-- Name: criteria_option criteria_option_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.criteria_option
    ADD CONSTRAINT criteria_option_pkey PRIMARY KEY (id);


--
-- Name: criteria_threshold criteria_threshold_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.criteria_threshold
    ADD CONSTRAINT criteria_threshold_pkey PRIMARY KEY (id);


--
-- Name: deferred_revenue deferred_revenue_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deferred_revenue
    ADD CONSTRAINT deferred_revenue_pkey PRIMARY KEY (id);


--
-- Name: delegate_attribute delegate_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_attribute
    ADD CONSTRAINT delegate_attribute_pkey PRIMARY KEY (id);


--
-- Name: delegate_client delegate_client_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_client
    ADD CONSTRAINT delegate_client_pkey PRIMARY KEY (id);


--
-- Name: delegate delegate_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate
    ADD CONSTRAINT delegate_pkey PRIMARY KEY (id);


--
-- Name: depreciation_schedule depreciation_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.depreciation_schedule
    ADD CONSTRAINT depreciation_schedule_pkey PRIMARY KEY (id);


--
-- Name: disbursement_method disbursement_method_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.disbursement_method
    ADD CONSTRAINT disbursement_method_pkey PRIMARY KEY (id);


--
-- Name: equity_account equity_account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equity_account
    ADD CONSTRAINT equity_account_pkey PRIMARY KEY (id);


--
-- Name: equity_transaction equity_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equity_transaction
    ADD CONSTRAINT equity_transaction_pkey PRIMARY KEY (id);


--
-- Name: event_attendee event_attendee_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_attendee
    ADD CONSTRAINT event_attendee_pkey PRIMARY KEY (id);


--
-- Name: event_attribute event_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_attribute
    ADD CONSTRAINT event_attribute_pkey PRIMARY KEY (id);


--
-- Name: event_client event_client_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_client
    ADD CONSTRAINT event_client_pkey PRIMARY KEY (id);


--
-- Name: event_occurrence event_occurrence_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_occurrence
    ADD CONSTRAINT event_occurrence_pkey PRIMARY KEY (id);


--
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- Name: event_product event_product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_product
    ADD CONSTRAINT event_product_pkey PRIMARY KEY (id);


--
-- Name: event_recurrence event_recurrence_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_recurrence
    ADD CONSTRAINT event_recurrence_pkey PRIMARY KEY (id);


--
-- Name: event_resource event_resource_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_resource
    ADD CONSTRAINT event_resource_pkey PRIMARY KEY (id);


--
-- Name: event_tag_assignment event_tag_assignment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_tag_assignment
    ADD CONSTRAINT event_tag_assignment_pkey PRIMARY KEY (id);


--
-- Name: event_tag event_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_tag
    ADD CONSTRAINT event_tag_pkey PRIMARY KEY (id);


--
-- Name: expenditure_category expenditure_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure_category
    ADD CONSTRAINT expenditure_category_pkey PRIMARY KEY (id);


--
-- Name: expenditure_line_item expenditure_line_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure_line_item
    ADD CONSTRAINT expenditure_line_item_pkey PRIMARY KEY (id);


--
-- Name: expenditure expenditure_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_pkey PRIMARY KEY (id);


--
-- Name: expense_recognition expense_recognition_internal_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_internal_id_key UNIQUE (internal_id);


--
-- Name: expense_recognition_line expense_recognition_line_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_line
    ADD CONSTRAINT expense_recognition_line_pkey PRIMARY KEY (id);


--
-- Name: expense_recognition expense_recognition_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_pkey PRIMARY KEY (id);


--
-- Name: fiscal_period fiscal_period_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fiscal_period
    ADD CONSTRAINT fiscal_period_pkey PRIMARY KEY (id);


--
-- Name: fulfillment_item fulfillment_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fulfillment_item
    ADD CONSTRAINT fulfillment_item_pkey PRIMARY KEY (id);


--
-- Name: fulfillment fulfillment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fulfillment
    ADD CONSTRAINT fulfillment_pkey PRIMARY KEY (id);


--
-- Name: fulfillment_return_item fulfillment_return_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fulfillment_return_item
    ADD CONSTRAINT fulfillment_return_item_pkey PRIMARY KEY (id);


--
-- Name: fulfillment_return fulfillment_return_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fulfillment_return
    ADD CONSTRAINT fulfillment_return_pkey PRIMARY KEY (id);


--
-- Name: fulfillment_status_event fulfillment_status_event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fulfillment_status_event
    ADD CONSTRAINT fulfillment_status_event_pkey PRIMARY KEY (id);


--
-- Name: group_attribute group_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_attribute
    ADD CONSTRAINT group_attribute_pkey PRIMARY KEY (id);


--
-- Name: group group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (id);


--
-- Name: integration_config integration_config_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.integration_config
    ADD CONSTRAINT integration_config_pkey PRIMARY KEY (id);


--
-- Name: inventory_attribute inventory_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_attribute
    ADD CONSTRAINT inventory_attribute_pkey PRIMARY KEY (id);


--
-- Name: inventory_depreciation inventory_depreciation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_depreciation
    ADD CONSTRAINT inventory_depreciation_pkey PRIMARY KEY (id);


--
-- Name: inventory_item inventory_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_item
    ADD CONSTRAINT inventory_item_pkey PRIMARY KEY (id);


--
-- Name: inventory_movement inventory_movement_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_movement
    ADD CONSTRAINT inventory_movement_pkey PRIMARY KEY (id);


--
-- Name: inventory_serial_history inventory_serial_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_serial_history
    ADD CONSTRAINT inventory_serial_history_pkey PRIMARY KEY (id);


--
-- Name: inventory_serial inventory_serial_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_serial
    ADD CONSTRAINT inventory_serial_pkey PRIMARY KEY (id);


--
-- Name: inventory_serial inventory_serial_serial_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_serial
    ADD CONSTRAINT inventory_serial_serial_number_key UNIQUE (serial_number);


--
-- Name: invoice_attribute invoice_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoice_attribute
    ADD CONSTRAINT invoice_attribute_pkey PRIMARY KEY (id);


--
-- Name: invoice invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (id);


--
-- Name: job_activity job_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_activity
    ADD CONSTRAINT job_activity_pkey PRIMARY KEY (id);


--
-- Name: job_outcome_summary job_outcome_summary_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_outcome_summary
    ADD CONSTRAINT job_outcome_summary_pkey PRIMARY KEY (id);


--
-- Name: job_phase job_phase_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_phase
    ADD CONSTRAINT job_phase_pkey PRIMARY KEY (id);


--
-- Name: job job_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_pkey PRIMARY KEY (id);


--
-- Name: job_settlement job_settlement_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_settlement
    ADD CONSTRAINT job_settlement_pkey PRIMARY KEY (id);


--
-- Name: job_task job_task_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_task
    ADD CONSTRAINT job_task_pkey PRIMARY KEY (id);


--
-- Name: job_template_phase job_template_phase_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_phase
    ADD CONSTRAINT job_template_phase_pkey PRIMARY KEY (id);


--
-- Name: job_template job_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template
    ADD CONSTRAINT job_template_pkey PRIMARY KEY (id);


--
-- Name: job_template_relation job_template_relation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_relation
    ADD CONSTRAINT job_template_relation_pkey PRIMARY KEY (id);


--
-- Name: job_template_task job_template_task_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_task
    ADD CONSTRAINT job_template_task_pkey PRIMARY KEY (id);


--
-- Name: journal_entry journal_entry_entry_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.journal_entry
    ADD CONSTRAINT journal_entry_entry_number_key UNIQUE (entry_number);


--
-- Name: journal_entry journal_entry_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.journal_entry
    ADD CONSTRAINT journal_entry_pkey PRIMARY KEY (id);


--
-- Name: journal_line journal_line_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.journal_line
    ADD CONSTRAINT journal_line_pkey PRIMARY KEY (id);


--
-- Name: leave_balance leave_balance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leave_balance
    ADD CONSTRAINT leave_balance_pkey PRIMARY KEY (id);


--
-- Name: leave_request leave_request_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leave_request
    ADD CONSTRAINT leave_request_pkey PRIMARY KEY (id);


--
-- Name: leave_type leave_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leave_type
    ADD CONSTRAINT leave_type_pkey PRIMARY KEY (id);


--
-- Name: license_history license_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.license_history
    ADD CONSTRAINT license_history_pkey PRIMARY KEY (id);


--
-- Name: license license_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.license
    ADD CONSTRAINT license_pkey PRIMARY KEY (id);


--
-- Name: line line_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.line
    ADD CONSTRAINT line_pkey PRIMARY KEY (id);


--
-- Name: loan loan_loan_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.loan
    ADD CONSTRAINT loan_loan_number_key UNIQUE (loan_number);


--
-- Name: loan_payment loan_payment_payment_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.loan_payment
    ADD CONSTRAINT loan_payment_payment_number_key UNIQUE (payment_number);


--
-- Name: loan_payment loan_payment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.loan_payment
    ADD CONSTRAINT loan_payment_pkey PRIMARY KEY (id);


--
-- Name: loan loan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.loan
    ADD CONSTRAINT loan_pkey PRIMARY KEY (id);


--
-- Name: location_area location_area_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location_area
    ADD CONSTRAINT location_area_pkey PRIMARY KEY (id);


--
-- Name: location_attribute location_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location_attribute
    ADD CONSTRAINT location_attribute_pkey PRIMARY KEY (id);


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id);


--
-- Name: outcome_criteria outcome_criteria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.outcome_criteria
    ADD CONSTRAINT outcome_criteria_pkey PRIMARY KEY (id);


--
-- Name: pay_cycle pay_cycle_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pay_cycle
    ADD CONSTRAINT pay_cycle_pkey PRIMARY KEY (id);


--
-- Name: payment_method payment_method_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_method
    ADD CONSTRAINT payment_method_pkey PRIMARY KEY (id);


--
-- Name: payment_term payment_term_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_term
    ADD CONSTRAINT payment_term_code_key UNIQUE (code);


--
-- Name: payment_term payment_term_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_term
    ADD CONSTRAINT payment_term_pkey PRIMARY KEY (id);


--
-- Name: payroll_remittance payroll_remittance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payroll_remittance
    ADD CONSTRAINT payroll_remittance_pkey PRIMARY KEY (id);


--
-- Name: payroll_run payroll_run_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payroll_run
    ADD CONSTRAINT payroll_run_pkey PRIMARY KEY (id);


--
-- Name: payroll_run payroll_run_run_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payroll_run
    ADD CONSTRAINT payroll_run_run_number_key UNIQUE (run_number);


--
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- Name: petty_cash_fund petty_cash_fund_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petty_cash_fund
    ADD CONSTRAINT petty_cash_fund_pkey PRIMARY KEY (id);


--
-- Name: petty_cash_replenishment petty_cash_replenishment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petty_cash_replenishment
    ADD CONSTRAINT petty_cash_replenishment_pkey PRIMARY KEY (id);


--
-- Name: petty_cash_replenishment petty_cash_replenishment_replenishment_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petty_cash_replenishment
    ADD CONSTRAINT petty_cash_replenishment_replenishment_number_key UNIQUE (replenishment_number);


--
-- Name: petty_cash_voucher petty_cash_voucher_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petty_cash_voucher
    ADD CONSTRAINT petty_cash_voucher_pkey PRIMARY KEY (id);


--
-- Name: petty_cash_voucher petty_cash_voucher_voucher_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petty_cash_voucher
    ADD CONSTRAINT petty_cash_voucher_voucher_number_key UNIQUE (voucher_number);


--
-- Name: phase_outcome_summary phase_outcome_summary_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.phase_outcome_summary
    ADD CONSTRAINT phase_outcome_summary_pkey PRIMARY KEY (id);


--
-- Name: plan_attribute plan_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_attribute
    ADD CONSTRAINT plan_attribute_pkey PRIMARY KEY (id);


--
-- Name: plan_location plan_location_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_location
    ADD CONSTRAINT plan_location_pkey PRIMARY KEY (id);


--
-- Name: plan plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_pkey PRIMARY KEY (id);


--
-- Name: plan_settings plan_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_settings
    ADD CONSTRAINT plan_settings_pkey PRIMARY KEY (id);


--
-- Name: prepayment prepayment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prepayment
    ADD CONSTRAINT prepayment_pkey PRIMARY KEY (id);


--
-- Name: price_list price_list_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_list
    ADD CONSTRAINT price_list_pkey PRIMARY KEY (id);


--
-- Name: price_plan price_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_plan
    ADD CONSTRAINT price_plan_pkey PRIMARY KEY (id);


--
-- Name: price_product price_product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_product
    ADD CONSTRAINT price_product_pkey PRIMARY KEY (id);


--
-- Name: price_schedule price_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_schedule
    ADD CONSTRAINT price_schedule_pkey PRIMARY KEY (id);


--
-- Name: procurement_request_line procurement_request_line_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request_line
    ADD CONSTRAINT procurement_request_line_pkey PRIMARY KEY (id);


--
-- Name: procurement_request procurement_request_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request
    ADD CONSTRAINT procurement_request_pkey PRIMARY KEY (id);


--
-- Name: procurement_request procurement_request_request_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request
    ADD CONSTRAINT procurement_request_request_number_key UNIQUE (request_number);


--
-- Name: product_attribute product_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_attribute
    ADD CONSTRAINT product_attribute_pkey PRIMARY KEY (id);


--
-- Name: product_collection product_collection_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_collection
    ADD CONSTRAINT product_collection_pkey PRIMARY KEY (id);


--
-- Name: product_line product_line_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_line
    ADD CONSTRAINT product_line_pkey PRIMARY KEY (id);


--
-- Name: product_option product_option_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_option
    ADD CONSTRAINT product_option_pkey PRIMARY KEY (id);


--
-- Name: product_option_value product_option_value_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_option_value
    ADD CONSTRAINT product_option_value_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: product_plan product_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_plan
    ADD CONSTRAINT product_plan_pkey PRIMARY KEY (id);


--
-- Name: product_price_plan product_price_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_price_plan
    ADD CONSTRAINT product_price_plan_pkey PRIMARY KEY (id);


--
-- Name: product_variant_image product_variant_image_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_variant_image
    ADD CONSTRAINT product_variant_image_pkey PRIMARY KEY (id);


--
-- Name: product_variant_option product_variant_option_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_variant_option
    ADD CONSTRAINT product_variant_option_pkey PRIMARY KEY (id);


--
-- Name: product_variant product_variant_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_variant
    ADD CONSTRAINT product_variant_pkey PRIMARY KEY (id);


--
-- Name: purchase_order_line_item purchase_order_line_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_order_line_item
    ADD CONSTRAINT purchase_order_line_item_pkey PRIMARY KEY (id);


--
-- Name: purchase_order purchase_order_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT purchase_order_pkey PRIMARY KEY (id);


--
-- Name: purchase_order purchase_order_po_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT purchase_order_po_number_key UNIQUE (po_number);


--
-- Name: rate_band rate_band_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rate_band
    ADD CONSTRAINT rate_band_pkey PRIMARY KEY (id);


--
-- Name: rate_table rate_table_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rate_table
    ADD CONSTRAINT rate_table_pkey PRIMARY KEY (id);


--
-- Name: recurring_journal_template recurring_journal_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recurring_journal_template
    ADD CONSTRAINT recurring_journal_template_pkey PRIMARY KEY (id);


--
-- Name: resource resource_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resource
    ADD CONSTRAINT resource_pkey PRIMARY KEY (id);


--
-- Name: revenue_category revenue_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_category
    ADD CONSTRAINT revenue_category_pkey PRIMARY KEY (id);


--
-- Name: revenue_line_item revenue_line_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_line_item
    ADD CONSTRAINT revenue_line_item_pkey PRIMARY KEY (id);


--
-- Name: revenue_payment revenue_payment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_payment
    ADD CONSTRAINT revenue_payment_pkey PRIMARY KEY (id);


--
-- Name: revenue revenue_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue
    ADD CONSTRAINT revenue_pkey PRIMARY KEY (id);


--
-- Name: role_permission role_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT role_permission_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: security_deposit security_deposit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.security_deposit
    ADD CONSTRAINT security_deposit_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: staff_attribute staff_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.staff_attribute
    ADD CONSTRAINT staff_attribute_pkey PRIMARY KEY (id);


--
-- Name: staff staff_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (id);


--
-- Name: stage stage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage
    ADD CONSTRAINT stage_pkey PRIMARY KEY (id);


--
-- Name: stage_template stage_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_template
    ADD CONSTRAINT stage_template_pkey PRIMARY KEY (id);


--
-- Name: subscription_attribute subscription_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_attribute
    ADD CONSTRAINT subscription_attribute_pkey PRIMARY KEY (id);


--
-- Name: subscription subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription
    ADD CONSTRAINT subscription_pkey PRIMARY KEY (id);


--
-- Name: supplier_attribute supplier_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_attribute
    ADD CONSTRAINT supplier_attribute_pkey PRIMARY KEY (id);


--
-- Name: supplier_category supplier_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_category
    ADD CONSTRAINT supplier_category_pkey PRIMARY KEY (id);


--
-- Name: supplier_contract supplier_contract_internal_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract
    ADD CONSTRAINT supplier_contract_internal_id_key UNIQUE (internal_id);


--
-- Name: supplier_contract_line supplier_contract_line_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_line
    ADD CONSTRAINT supplier_contract_line_pkey PRIMARY KEY (id);


--
-- Name: supplier_contract supplier_contract_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract
    ADD CONSTRAINT supplier_contract_pkey PRIMARY KEY (id);


--
-- Name: supplier_contract_price_schedule supplier_contract_price_schedule_internal_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_price_schedule
    ADD CONSTRAINT supplier_contract_price_schedule_internal_id_key UNIQUE (internal_id);


--
-- Name: supplier_contract_price_schedule_line supplier_contract_price_schedule_line_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_price_schedule_line
    ADD CONSTRAINT supplier_contract_price_schedule_line_pkey PRIMARY KEY (id);


--
-- Name: supplier_contract_price_schedule supplier_contract_price_schedule_no_overlap; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_price_schedule
    ADD CONSTRAINT supplier_contract_price_schedule_no_overlap EXCLUDE USING gist (supplier_contract_id WITH =, tstzrange(date_time_start, COALESCE(date_time_end, 'infinity'::timestamp with time zone), '[)'::text) WITH &&) WHERE ((status <> 4));


--
-- Name: supplier_contract_price_schedule supplier_contract_price_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_price_schedule
    ADD CONSTRAINT supplier_contract_price_schedule_pkey PRIMARY KEY (id);


--
-- Name: supplier_dependent supplier_dependent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_dependent
    ADD CONSTRAINT supplier_dependent_pkey PRIMARY KEY (id);


--
-- Name: supplier supplier_internal_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT supplier_internal_id_key UNIQUE (internal_id);


--
-- Name: supplier_lifecycle_event supplier_lifecycle_event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_lifecycle_event
    ADD CONSTRAINT supplier_lifecycle_event_pkey PRIMARY KEY (id);


--
-- Name: supplier supplier_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT supplier_pkey PRIMARY KEY (id);


--
-- Name: task_outcome_check task_outcome_check_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_outcome_check
    ADD CONSTRAINT task_outcome_check_pkey PRIMARY KEY (id);


--
-- Name: task_outcome task_outcome_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_outcome
    ADD CONSTRAINT task_outcome_pkey PRIMARY KEY (id);


--
-- Name: template_task_criteria template_task_criteria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.template_task_criteria
    ADD CONSTRAINT template_task_criteria_pkey PRIMARY KEY (id);


--
-- Name: treasury_collection treasury_collection_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treasury_collection
    ADD CONSTRAINT treasury_collection_pkey PRIMARY KEY (id);


--
-- Name: treasury_disbursement treasury_disbursement_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treasury_disbursement
    ADD CONSTRAINT treasury_disbursement_pkey PRIMARY KEY (id);


--
-- Name: asset_location uq_asset_location_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_location
    ADD CONSTRAINT uq_asset_location_1 UNIQUE (asset_id, location_id);


--
-- Name: balance_attribute uq_balance_attribute_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.balance_attribute
    ADD CONSTRAINT uq_balance_attribute_1 UNIQUE (balance_id, attribute_id);


--
-- Name: client_attribute uq_client_attribute_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_attribute
    ADD CONSTRAINT uq_client_attribute_1 UNIQUE (client_id, attribute_id);


--
-- Name: client_category uq_client_category_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_category
    ADD CONSTRAINT uq_client_category_1 UNIQUE (client_id, category_id);


--
-- Name: collection_attribute uq_collection_attribute_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_attribute
    ADD CONSTRAINT uq_collection_attribute_1 UNIQUE (collection_id, attribute_id);


--
-- Name: collection_parent uq_collection_parent_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_parent
    ADD CONSTRAINT uq_collection_parent_1 UNIQUE (collection_parent_id, collection_id);


--
-- Name: collection_plan uq_collection_plan_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_plan
    ADD CONSTRAINT uq_collection_plan_1 UNIQUE (collection_id, plan_id);


--
-- Name: delegate_attribute uq_delegate_attribute_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_attribute
    ADD CONSTRAINT uq_delegate_attribute_1 UNIQUE (delegate_id, attribute_id);


--
-- Name: delegate_client uq_delegate_client_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_client
    ADD CONSTRAINT uq_delegate_client_1 UNIQUE (delegate_id, client_id);


--
-- Name: event_attendee uq_event_attendee_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_attendee
    ADD CONSTRAINT uq_event_attendee_1 UNIQUE (event_id, client_id);


--
-- Name: event_client uq_event_client_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_client
    ADD CONSTRAINT uq_event_client_1 UNIQUE (event_id, client_id);


--
-- Name: event_product uq_event_product_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_product
    ADD CONSTRAINT uq_event_product_1 UNIQUE (event_id, product_id);


--
-- Name: event_resource uq_event_resource_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_resource
    ADD CONSTRAINT uq_event_resource_1 UNIQUE (event_id, resource_id);


--
-- Name: event_tag_assignment uq_event_tag_assignment_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_tag_assignment
    ADD CONSTRAINT uq_event_tag_assignment_1 UNIQUE (event_id, event_tag_id);


--
-- Name: group_attribute uq_group_attribute_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_attribute
    ADD CONSTRAINT uq_group_attribute_1 UNIQUE (group_id, attribute_id);


--
-- Name: invoice_attribute uq_invoice_attribute_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoice_attribute
    ADD CONSTRAINT uq_invoice_attribute_1 UNIQUE (invoice_id, attribute_id);


--
-- Name: location_attribute uq_location_attribute_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location_attribute
    ADD CONSTRAINT uq_location_attribute_1 UNIQUE (location_id, attribute_id);


--
-- Name: plan_attribute uq_plan_attribute_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_attribute
    ADD CONSTRAINT uq_plan_attribute_1 UNIQUE (plan_id, attribute_id);


--
-- Name: plan_location uq_plan_location_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_location
    ADD CONSTRAINT uq_plan_location_1 UNIQUE (plan_id, location_id);


--
-- Name: product_attribute uq_product_attribute_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_attribute
    ADD CONSTRAINT uq_product_attribute_1 UNIQUE (product_id, attribute_id);


--
-- Name: product_collection uq_product_collection_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_collection
    ADD CONSTRAINT uq_product_collection_1 UNIQUE (product_id, collection_id);


--
-- Name: product_line uq_product_line_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_line
    ADD CONSTRAINT uq_product_line_1 UNIQUE (product_id, line_id);


--
-- Name: product_option_value uq_product_option_value_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_option_value
    ADD CONSTRAINT uq_product_option_value_1 UNIQUE (product_option_id, value);


--
-- Name: product_variant_option uq_product_variant_option_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_variant_option
    ADD CONSTRAINT uq_product_variant_option_1 UNIQUE (product_variant_id, product_option_value_id);


--
-- Name: role_permission uq_role_permission_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT uq_role_permission_1 UNIQUE (role_id, permission_id);


--
-- Name: session uq_session_token; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT uq_session_token UNIQUE (token);


--
-- Name: staff_attribute uq_staff_attribute_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.staff_attribute
    ADD CONSTRAINT uq_staff_attribute_1 UNIQUE (staff_id, attribute_id);


--
-- Name: subscription_attribute uq_subscription_attribute_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_attribute
    ADD CONSTRAINT uq_subscription_attribute_1 UNIQUE (subscription_id, attribute_id);


--
-- Name: supplier_attribute uq_supplier_attribute_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_attribute
    ADD CONSTRAINT uq_supplier_attribute_1 UNIQUE (supplier_id, attribute_id);


--
-- Name: workspace_user uq_workspace_user_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workspace_user
    ADD CONSTRAINT uq_workspace_user_1 UNIQUE (workspace_id, user_id);


--
-- Name: workspace_user_role uq_workspace_user_role_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workspace_user_role
    ADD CONSTRAINT uq_workspace_user_role_1 UNIQUE (workspace_user_id, role_id);


--
-- Name: user user_email_address_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_address_key UNIQUE (email_address);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: workflow workflow_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workflow
    ADD CONSTRAINT workflow_pkey PRIMARY KEY (id);


--
-- Name: workflow_template workflow_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workflow_template
    ADD CONSTRAINT workflow_template_pkey PRIMARY KEY (id);


--
-- Name: workspace workspace_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workspace
    ADD CONSTRAINT workspace_pkey PRIMARY KEY (id);


--
-- Name: workspace_user workspace_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workspace_user
    ADD CONSTRAINT workspace_user_pkey PRIMARY KEY (id);


--
-- Name: workspace_user_role workspace_user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workspace_user_role
    ADD CONSTRAINT workspace_user_role_pkey PRIMARY KEY (id);


--
-- Name: idx_entry_actor; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX idx_entry_actor ON ONLY audit_trail.audit_entry USING btree (actor_id, occurred_at DESC);


--
-- Name: audit_entry_2026_03_actor_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_03_actor_id_occurred_at_idx ON audit_trail.audit_entry_2026_03 USING btree (actor_id, occurred_at DESC);


--
-- Name: idx_entry_entity; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX idx_entry_entity ON ONLY audit_trail.audit_entry USING btree (entity_type, entity_id, occurred_at DESC);


--
-- Name: audit_entry_2026_03_entity_type_entity_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_03_entity_type_entity_id_occurred_at_idx ON audit_trail.audit_entry_2026_03 USING btree (entity_type, entity_id, occurred_at DESC);


--
-- Name: idx_entry_permcode; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX idx_entry_permcode ON ONLY audit_trail.audit_entry USING btree (permission_code, occurred_at DESC);


--
-- Name: audit_entry_2026_03_permission_code_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_03_permission_code_occurred_at_idx ON audit_trail.audit_entry_2026_03 USING btree (permission_code, occurred_at DESC);


--
-- Name: idx_entry_txid; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX idx_entry_txid ON ONLY audit_trail.audit_entry USING btree (transaction_id);


--
-- Name: audit_entry_2026_03_transaction_id_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_03_transaction_id_idx ON audit_trail.audit_entry_2026_03 USING btree (transaction_id);


--
-- Name: idx_entry_usecase; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX idx_entry_usecase ON ONLY audit_trail.audit_entry USING btree (use_case, occurred_at DESC);


--
-- Name: audit_entry_2026_03_use_case_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_03_use_case_occurred_at_idx ON audit_trail.audit_entry_2026_03 USING btree (use_case, occurred_at DESC);


--
-- Name: idx_entry_ws; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX idx_entry_ws ON ONLY audit_trail.audit_entry USING btree (workspace_id, occurred_at DESC);


--
-- Name: audit_entry_2026_03_workspace_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_03_workspace_id_occurred_at_idx ON audit_trail.audit_entry_2026_03 USING btree (workspace_id, occurred_at DESC);


--
-- Name: audit_entry_2026_04_actor_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_04_actor_id_occurred_at_idx ON audit_trail.audit_entry_2026_04 USING btree (actor_id, occurred_at DESC);


--
-- Name: audit_entry_2026_04_entity_type_entity_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_04_entity_type_entity_id_occurred_at_idx ON audit_trail.audit_entry_2026_04 USING btree (entity_type, entity_id, occurred_at DESC);


--
-- Name: audit_entry_2026_04_permission_code_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_04_permission_code_occurred_at_idx ON audit_trail.audit_entry_2026_04 USING btree (permission_code, occurred_at DESC);


--
-- Name: audit_entry_2026_04_transaction_id_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_04_transaction_id_idx ON audit_trail.audit_entry_2026_04 USING btree (transaction_id);


--
-- Name: audit_entry_2026_04_use_case_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_04_use_case_occurred_at_idx ON audit_trail.audit_entry_2026_04 USING btree (use_case, occurred_at DESC);


--
-- Name: audit_entry_2026_04_workspace_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_04_workspace_id_occurred_at_idx ON audit_trail.audit_entry_2026_04 USING btree (workspace_id, occurred_at DESC);


--
-- Name: audit_entry_2026_05_actor_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_05_actor_id_occurred_at_idx ON audit_trail.audit_entry_2026_05 USING btree (actor_id, occurred_at DESC);


--
-- Name: audit_entry_2026_05_entity_type_entity_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_05_entity_type_entity_id_occurred_at_idx ON audit_trail.audit_entry_2026_05 USING btree (entity_type, entity_id, occurred_at DESC);


--
-- Name: audit_entry_2026_05_permission_code_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_05_permission_code_occurred_at_idx ON audit_trail.audit_entry_2026_05 USING btree (permission_code, occurred_at DESC);


--
-- Name: audit_entry_2026_05_transaction_id_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_05_transaction_id_idx ON audit_trail.audit_entry_2026_05 USING btree (transaction_id);


--
-- Name: audit_entry_2026_05_use_case_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_05_use_case_occurred_at_idx ON audit_trail.audit_entry_2026_05 USING btree (use_case, occurred_at DESC);


--
-- Name: audit_entry_2026_05_workspace_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_05_workspace_id_occurred_at_idx ON audit_trail.audit_entry_2026_05 USING btree (workspace_id, occurred_at DESC);


--
-- Name: idx_field_entry; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX idx_field_entry ON audit_trail.audit_field_change USING btree (audit_entry_id);


--
-- Name: idx_field_name; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX idx_field_name ON audit_trail.audit_field_change USING btree (field_name, new_value);


--
-- Name: idx_account_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_account_code ON public.account USING btree (code);


--
-- Name: idx_account_group_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_account_group_id ON public.account USING btree (group_id);


--
-- Name: idx_account_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_account_parent_id ON public.account USING btree (parent_id);


--
-- Name: idx_accrued_expense_accrual_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_accrued_expense_accrual_account_id ON public.accrued_expense USING btree (accrual_account_id);


--
-- Name: idx_accrued_expense_expense_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_accrued_expense_expense_account_id ON public.accrued_expense USING btree (expense_account_id);


--
-- Name: idx_accrued_expense_settlement_accrued_expense_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_accrued_expense_settlement_accrued_expense_id ON public.accrued_expense_settlement USING btree (accrued_expense_id);


--
-- Name: idx_accrued_expense_settlement_expenditure_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_accrued_expense_settlement_expenditure_id ON public.accrued_expense_settlement USING btree (expenditure_id);


--
-- Name: idx_accrued_expense_settlement_expenditure_line_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_accrued_expense_settlement_expenditure_line_item_id ON public.accrued_expense_settlement USING btree (expenditure_line_item_id);


--
-- Name: idx_accrued_expense_settlement_reversed_by_settlement_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_accrued_expense_settlement_reversed_by_settlement_id ON public.accrued_expense_settlement USING btree (reversed_by_settlement_id);


--
-- Name: idx_accrued_expense_settlement_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_accrued_expense_settlement_workspace_id ON public.accrued_expense_settlement USING btree (workspace_id);


--
-- Name: idx_accrued_expense_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_accrued_expense_status ON public.accrued_expense USING btree (status);


--
-- Name: idx_accrued_expense_supplier_contract_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_accrued_expense_supplier_contract_id ON public.accrued_expense USING btree (supplier_contract_id);


--
-- Name: idx_accrued_expense_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_accrued_expense_supplier_id ON public.accrued_expense USING btree (supplier_id);


--
-- Name: idx_accrued_expense_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_accrued_expense_workspace_id ON public.accrued_expense USING btree (workspace_id);


--
-- Name: idx_activity_activity_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_activity_template_id ON public.activity USING btree (activity_template_id);


--
-- Name: idx_activity_execution_log_activity_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_execution_log_activity_id ON public.activity_execution_log USING btree (activity_id);


--
-- Name: idx_activity_execution_log_activity_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_execution_log_activity_template_id ON public.activity_execution_log USING btree (activity_template_id);


--
-- Name: idx_activity_execution_log_workflow_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_execution_log_workflow_id ON public.activity_execution_log USING btree (workflow_id);


--
-- Name: idx_activity_execution_log_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_execution_log_workspace_id ON public.activity_execution_log USING btree (workspace_id);


--
-- Name: idx_activity_expense_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_expense_category_id ON public.activity_expense USING btree (expense_category_id);


--
-- Name: idx_activity_expense_expense_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_expense_expense_category_id ON public.activity_expense USING btree (expense_category_id);


--
-- Name: idx_activity_labor_staff_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_labor_staff_id ON public.activity_labor USING btree (staff_id);


--
-- Name: idx_activity_material_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_material_location_id ON public.activity_material USING btree (location_id);


--
-- Name: idx_activity_material_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_material_product_id ON public.activity_material USING btree (product_id);


--
-- Name: idx_activity_stage_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_stage_id ON public.activity USING btree (stage_id);


--
-- Name: idx_activity_template_stage_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_template_stage_template_id ON public.activity_template USING btree (stage_template_id);


--
-- Name: idx_admin_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_admin_user_id ON public.admin USING btree (user_id);


--
-- Name: idx_asset_asset_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_asset_category_id ON public.asset USING btree (asset_category_id);


--
-- Name: idx_asset_category_parent_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_category_parent_category_id ON public.asset_category USING btree (parent_category_id);


--
-- Name: idx_asset_component_asset_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_component_asset_id ON public.asset_component USING btree (asset_id);


--
-- Name: idx_asset_disposal_asset_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_disposal_asset_id ON public.asset_disposal USING btree (asset_id);


--
-- Name: idx_asset_location_asset_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_location_asset_id ON public.asset_location USING btree (asset_id);


--
-- Name: idx_asset_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_location_id ON public.asset USING btree (location_id);


--
-- Name: idx_asset_location_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_location_location_id ON public.asset_location USING btree (location_id);


--
-- Name: idx_asset_maintenance_asset_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_maintenance_asset_id ON public.asset_maintenance USING btree (asset_id);


--
-- Name: idx_asset_revaluation_asset_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_revaluation_asset_id ON public.asset_revaluation USING btree (asset_id);


--
-- Name: idx_asset_transaction_asset_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_transaction_asset_id ON public.asset_transaction USING btree (asset_id);


--
-- Name: idx_attachment_foreign_key; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_attachment_foreign_key ON public.attachment USING btree (foreign_key);


--
-- Name: idx_attachment_module_key; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_attachment_module_key ON public.attachment USING btree (module_key);


--
-- Name: idx_attribute_value_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_attribute_value_attribute_id ON public.attribute_value USING btree (attribute_id);


--
-- Name: idx_balance_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_balance_attribute_attribute_id ON public.balance_attribute USING btree (attribute_id);


--
-- Name: idx_balance_attribute_balance_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_balance_attribute_balance_id ON public.balance_attribute USING btree (balance_id);


--
-- Name: idx_balance_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_balance_client_id ON public.balance USING btree (client_id);


--
-- Name: idx_balance_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_balance_subscription_id ON public.balance USING btree (subscription_id);


--
-- Name: idx_billing_event_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_billing_event_job_id ON public.billing_event USING btree (job_id);


--
-- Name: idx_billing_event_job_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_billing_event_job_phase_id ON public.billing_event USING btree (job_phase_id);


--
-- Name: idx_billing_event_job_template_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_billing_event_job_template_phase_id ON public.billing_event USING btree (job_template_phase_id);


--
-- Name: idx_billing_event_product_price_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_billing_event_product_price_plan_id ON public.billing_event USING btree (product_price_plan_id);


--
-- Name: idx_billing_event_revenue_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_billing_event_revenue_id ON public.billing_event USING btree (revenue_id);


--
-- Name: idx_billing_event_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_billing_event_status ON public.billing_event USING btree (status);


--
-- Name: idx_billing_event_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_billing_event_subscription_id ON public.billing_event USING btree (subscription_id);


--
-- Name: idx_category_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_category_parent_id ON public.category USING btree (parent_id);


--
-- Name: idx_client_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_attribute_attribute_id ON public.client_attribute USING btree (attribute_id);


--
-- Name: idx_client_attribute_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_attribute_client_id ON public.client_attribute USING btree (client_id);


--
-- Name: idx_client_category_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_category_category_id ON public.client_category USING btree (category_id);


--
-- Name: idx_client_category_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_category_client_id ON public.client_category USING btree (client_id);


--
-- Name: idx_client_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_user_id ON public.client USING btree (user_id);


--
-- Name: idx_client_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_workspace_id ON public.client USING btree (workspace_id);


--
-- Name: idx_collection_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_collection_attribute_attribute_id ON public.collection_attribute USING btree (attribute_id);


--
-- Name: idx_collection_attribute_collection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_collection_attribute_collection_id ON public.collection_attribute USING btree (collection_id);


--
-- Name: idx_collection_parent_collection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_collection_parent_collection_id ON public.collection_parent USING btree (collection_id);


--
-- Name: idx_collection_parent_collection_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_collection_parent_collection_parent_id ON public.collection_parent USING btree (collection_parent_id);


--
-- Name: idx_collection_plan_collection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_collection_plan_collection_id ON public.collection_plan USING btree (collection_id);


--
-- Name: idx_collection_plan_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_collection_plan_plan_id ON public.collection_plan USING btree (plan_id);


--
-- Name: idx_criteria_option_outcome_criteria_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_criteria_option_outcome_criteria_id ON public.criteria_option USING btree (outcome_criteria_id);


--
-- Name: idx_criteria_threshold_outcome_criteria_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_criteria_threshold_outcome_criteria_id ON public.criteria_threshold USING btree (outcome_criteria_id);


--
-- Name: idx_deferred_revenue_liability_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_deferred_revenue_liability_account_id ON public.deferred_revenue USING btree (liability_account_id);


--
-- Name: idx_deferred_revenue_revenue_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_deferred_revenue_revenue_account_id ON public.deferred_revenue USING btree (revenue_account_id);


--
-- Name: idx_delegate_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_attribute_attribute_id ON public.delegate_attribute USING btree (attribute_id);


--
-- Name: idx_delegate_attribute_delegate_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_attribute_delegate_id ON public.delegate_attribute USING btree (delegate_id);


--
-- Name: idx_delegate_client_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_client_client_id ON public.delegate_client USING btree (client_id);


--
-- Name: idx_delegate_client_delegate_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_client_delegate_id ON public.delegate_client USING btree (delegate_id);


--
-- Name: idx_delegate_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_user_id ON public.delegate USING btree (user_id);


--
-- Name: idx_depreciation_schedule_asset_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_depreciation_schedule_asset_id ON public.depreciation_schedule USING btree (asset_id);


--
-- Name: idx_equity_account_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_equity_account_account_id ON public.equity_account USING btree (account_id);


--
-- Name: idx_equity_transaction_equity_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_equity_transaction_equity_account_id ON public.equity_transaction USING btree (equity_account_id);


--
-- Name: idx_equity_transaction_journal_entry_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_equity_transaction_journal_entry_id ON public.equity_transaction USING btree (journal_entry_id);


--
-- Name: idx_event_attendee_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_attendee_client_id ON public.event_attendee USING btree (client_id);


--
-- Name: idx_event_attendee_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_attendee_event_id ON public.event_attendee USING btree (event_id);


--
-- Name: idx_event_attendee_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_attendee_workspace_id ON public.event_attendee USING btree (workspace_id);


--
-- Name: idx_event_attendee_workspace_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_attendee_workspace_user_id ON public.event_attendee USING btree (workspace_user_id);


--
-- Name: idx_event_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_attribute_attribute_id ON public.event_attribute USING btree (attribute_id);


--
-- Name: idx_event_attribute_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_attribute_event_id ON public.event_attribute USING btree (event_id);


--
-- Name: idx_event_client_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_client_client_id ON public.event_client USING btree (client_id);


--
-- Name: idx_event_client_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_client_event_id ON public.event_client USING btree (event_id);


--
-- Name: idx_event_event_recurrence_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_event_recurrence_id ON public.event USING btree (event_recurrence_id);


--
-- Name: idx_event_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_location_id ON public.event USING btree (location_id);


--
-- Name: idx_event_occurrence_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_occurrence_event_id ON public.event_occurrence USING btree (event_id);


--
-- Name: idx_event_occurrence_exception_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_occurrence_exception_event_id ON public.event_occurrence USING btree (exception_event_id);


--
-- Name: idx_event_occurrence_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_occurrence_workspace_id ON public.event_occurrence USING btree (workspace_id);


--
-- Name: idx_event_organizer_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_organizer_id ON public.event USING btree (organizer_id);


--
-- Name: idx_event_parent_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_parent_event_id ON public.event USING btree (parent_event_id);


--
-- Name: idx_event_product_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_product_event_id ON public.event_product USING btree (event_id);


--
-- Name: idx_event_product_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_product_product_id ON public.event_product USING btree (product_id);


--
-- Name: idx_event_recurrence_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_recurrence_workspace_id ON public.event_recurrence USING btree (workspace_id);


--
-- Name: idx_event_resource_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_resource_event_id ON public.event_resource USING btree (event_id);


--
-- Name: idx_event_resource_resource_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_resource_resource_id ON public.event_resource USING btree (resource_id);


--
-- Name: idx_event_resource_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_resource_workspace_id ON public.event_resource USING btree (workspace_id);


--
-- Name: idx_event_tag_assignment_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_tag_assignment_event_id ON public.event_tag_assignment USING btree (event_id);


--
-- Name: idx_event_tag_assignment_event_tag_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_tag_assignment_event_tag_id ON public.event_tag_assignment USING btree (event_tag_id);


--
-- Name: idx_event_tag_assignment_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_tag_assignment_workspace_id ON public.event_tag_assignment USING btree (workspace_id);


--
-- Name: idx_event_tag_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_tag_workspace_id ON public.event_tag USING btree (workspace_id);


--
-- Name: idx_event_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_event_workspace_id ON public.event USING btree (workspace_id);


--
-- Name: idx_expenditure_accrued_expense_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_accrued_expense_id ON public.expenditure USING btree (accrued_expense_id);


--
-- Name: idx_expenditure_cycle_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_cycle_date ON public.expenditure USING btree (cycle_date);


--
-- Name: idx_expenditure_expense_recognition_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_expense_recognition_id ON public.expenditure USING btree (expense_recognition_id);


--
-- Name: idx_expenditure_line_item_expenditure_line_kind; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_line_item_expenditure_line_kind ON public.expenditure_line_item USING btree (expenditure_id, line_kind);


--
-- Name: idx_expenditure_line_item_pay_cycle_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_line_item_pay_cycle_id ON public.expenditure_line_item USING btree (pay_cycle_id);


--
-- Name: idx_expenditure_line_item_supplier_contract_line_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_line_item_supplier_contract_line_id ON public.expenditure_line_item USING btree (supplier_contract_line_id);


--
-- Name: idx_expenditure_petty_cash_fund_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_petty_cash_fund_id ON public.expenditure USING btree (petty_cash_fund_id);


--
-- Name: idx_expenditure_source; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_source ON public.expenditure USING btree (source);


--
-- Name: idx_expenditure_supplier_contract_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_supplier_contract_id ON public.expenditure USING btree (supplier_contract_id);


--
-- Name: idx_expense_recognition_accrued_expense_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_accrued_expense_id ON public.expense_recognition USING btree (accrued_expense_id);


--
-- Name: idx_expense_recognition_expenditure_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_expenditure_category_id ON public.expense_recognition USING btree (expenditure_category_id);


--
-- Name: idx_expense_recognition_expenditure_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_expenditure_id ON public.expense_recognition USING btree (expenditure_id);


--
-- Name: idx_expense_recognition_job_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_job_phase_id ON public.expense_recognition USING btree (job_phase_id);


--
-- Name: idx_expense_recognition_journal_entry_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_journal_entry_id ON public.expense_recognition USING btree (journal_entry_id);


--
-- Name: idx_expense_recognition_line_expenditure_line_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_line_expenditure_line_item_id ON public.expense_recognition_line USING btree (expenditure_line_item_id);


--
-- Name: idx_expense_recognition_line_expense_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_line_expense_account_id ON public.expense_recognition_line USING btree (expense_account_id);


--
-- Name: idx_expense_recognition_line_expense_recognition_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_line_expense_recognition_id ON public.expense_recognition_line USING btree (expense_recognition_id);


--
-- Name: idx_expense_recognition_line_job_activity_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_line_job_activity_id ON public.expense_recognition_line USING btree (job_activity_id);


--
-- Name: idx_expense_recognition_line_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_line_product_id ON public.expense_recognition_line USING btree (product_id);


--
-- Name: idx_expense_recognition_line_supplier_contract_line_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_line_supplier_contract_line_id ON public.expense_recognition_line USING btree (supplier_contract_line_id);


--
-- Name: idx_expense_recognition_line_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_line_workspace_id ON public.expense_recognition_line USING btree (workspace_id);


--
-- Name: idx_expense_recognition_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_location_id ON public.expense_recognition USING btree (location_id);


--
-- Name: idx_expense_recognition_reversal_of; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_reversal_of ON public.expense_recognition USING btree (reversal_of_recognition_id);


--
-- Name: idx_expense_recognition_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_status ON public.expense_recognition USING btree (status);


--
-- Name: idx_expense_recognition_supplier_contract_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_supplier_contract_id ON public.expense_recognition USING btree (supplier_contract_id);


--
-- Name: idx_expense_recognition_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_supplier_id ON public.expense_recognition USING btree (supplier_id);


--
-- Name: idx_expense_recognition_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_workspace_id ON public.expense_recognition USING btree (workspace_id);


--
-- Name: idx_fiscal_period_fiscal_year; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fiscal_period_fiscal_year ON public.fiscal_period USING btree (fiscal_year);


--
-- Name: idx_fulfillment_item_fulfillment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_item_fulfillment_id ON public.fulfillment_item USING btree (fulfillment_id);


--
-- Name: idx_fulfillment_return_fulfillment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_return_fulfillment_id ON public.fulfillment_return USING btree (fulfillment_id);


--
-- Name: idx_fulfillment_return_item_fulfillment_return_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_return_item_fulfillment_return_id ON public.fulfillment_return_item USING btree (fulfillment_return_id);


--
-- Name: idx_fulfillment_revenue_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_revenue_id ON public.fulfillment USING btree (revenue_id);


--
-- Name: idx_fulfillment_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_status ON public.fulfillment USING btree (status);


--
-- Name: idx_fulfillment_status_event_fulfillment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_status_event_fulfillment_id ON public.fulfillment_status_event USING btree (fulfillment_id);


--
-- Name: idx_fulfillment_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_workspace_id ON public.fulfillment USING btree (workspace_id);


--
-- Name: idx_group_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_group_attribute_attribute_id ON public.group_attribute USING btree (attribute_id);


--
-- Name: idx_group_attribute_group_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_group_attribute_group_id ON public.group_attribute USING btree (group_id);


--
-- Name: idx_integration_config_integration_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_integration_config_integration_type ON public.integration_config USING btree (integration_type);


--
-- Name: idx_integration_config_provider_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_integration_config_provider_id ON public.integration_config USING btree (provider_id);


--
-- Name: idx_integration_config_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_integration_config_workspace_id ON public.integration_config USING btree (workspace_id);


--
-- Name: idx_inventory_depreciation_inventory_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_depreciation_inventory_item_id ON public.inventory_depreciation USING btree (inventory_item_id);


--
-- Name: idx_inventory_movement_inventory_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_movement_inventory_item_id ON public.inventory_movement USING btree (inventory_item_id);


--
-- Name: idx_inventory_movement_inventory_serial_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_movement_inventory_serial_id ON public.inventory_movement USING btree (inventory_serial_id);


--
-- Name: idx_inventory_movement_job_activity_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_movement_job_activity_id ON public.inventory_movement USING btree (job_activity_id);


--
-- Name: idx_inventory_movement_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_movement_job_id ON public.inventory_movement USING btree (job_id);


--
-- Name: idx_inventory_movement_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_movement_product_id ON public.inventory_movement USING btree (product_id);


--
-- Name: idx_inventory_movement_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_movement_workspace_id ON public.inventory_movement USING btree (workspace_id);


--
-- Name: idx_inventory_serial_history_inventory_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_serial_history_inventory_item_id ON public.inventory_serial_history USING btree (inventory_item_id);


--
-- Name: idx_inventory_serial_history_inventory_serial_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_serial_history_inventory_serial_id ON public.inventory_serial_history USING btree (inventory_serial_id);


--
-- Name: idx_inventory_serial_inventory_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_serial_inventory_item_id ON public.inventory_serial USING btree (inventory_item_id);


--
-- Name: idx_invoice_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_invoice_attribute_attribute_id ON public.invoice_attribute USING btree (attribute_id);


--
-- Name: idx_invoice_attribute_invoice_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_invoice_attribute_invoice_id ON public.invoice_attribute USING btree (invoice_id);


--
-- Name: idx_invoice_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_invoice_subscription_id ON public.invoice USING btree (subscription_id);


--
-- Name: idx_job_activity_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_activity_job_id ON public.job_activity USING btree (job_id);


--
-- Name: idx_job_activity_job_task_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_activity_job_task_id ON public.job_activity USING btree (job_task_id);


--
-- Name: idx_job_activity_resource_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_activity_resource_id ON public.job_activity USING btree (resource_id);


--
-- Name: idx_job_activity_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_activity_workspace_id ON public.job_activity USING btree (workspace_id);


--
-- Name: idx_job_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_client_id ON public.job USING btree (client_id);


--
-- Name: idx_job_job_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_job_template_id ON public.job USING btree (job_template_id);


--
-- Name: idx_job_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_location_id ON public.job USING btree (location_id);


--
-- Name: idx_job_origin_active_children; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_origin_active_children ON public.job USING btree (origin_type, origin_id) WHERE ((parent_job_id IS NOT NULL) AND (active = true));


--
-- Name: idx_job_outcome_summary_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_outcome_summary_job_id ON public.job_outcome_summary USING btree (job_id);


--
-- Name: idx_job_parent_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_parent_job_id ON public.job USING btree (parent_job_id);


--
-- Name: idx_job_phase_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_phase_job_id ON public.job_phase USING btree (job_id);


--
-- Name: idx_job_settlement_job_activity_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_settlement_job_activity_id ON public.job_settlement USING btree (job_activity_id);


--
-- Name: idx_job_settlement_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_settlement_workspace_id ON public.job_settlement USING btree (workspace_id);


--
-- Name: idx_job_subscription_cycle_period_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_job_subscription_cycle_period_unique ON public.job USING btree (origin_id, cycle_period_start) WHERE ((origin_type = 'SUBSCRIPTION'::text) AND (parent_job_id IS NOT NULL) AND (cycle_period_start IS NOT NULL));


--
-- Name: idx_job_task_assigned_to; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_task_assigned_to ON public.job_task USING btree (assigned_to);


--
-- Name: idx_job_task_job_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_task_job_phase_id ON public.job_task USING btree (job_phase_id);


--
-- Name: idx_job_template_phase_job_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_phase_job_template_id ON public.job_template_phase USING btree (job_template_id);


--
-- Name: idx_job_template_relation_child_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_relation_child_template_id ON public.job_template_relation USING btree (child_template_id);


--
-- Name: idx_job_template_relation_parent_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_relation_parent_template_id ON public.job_template_relation USING btree (parent_template_id);


--
-- Name: idx_job_template_task_job_template_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_task_job_template_phase_id ON public.job_template_task USING btree (job_template_phase_id);


--
-- Name: idx_job_template_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_workspace_id ON public.job_template USING btree (workspace_id);


--
-- Name: idx_job_usage_request_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_usage_request_date ON public.job USING btree (origin_id, usage_request_date) WHERE (usage_request_date IS NOT NULL);


--
-- Name: idx_job_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_workspace_id ON public.job USING btree (workspace_id);


--
-- Name: idx_journal_entry_entry_number; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_journal_entry_entry_number ON public.journal_entry USING btree (entry_number);


--
-- Name: idx_journal_entry_fiscal_period_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_journal_entry_fiscal_period_id ON public.journal_entry USING btree (fiscal_period_id);


--
-- Name: idx_journal_entry_reversal_entry_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_journal_entry_reversal_entry_id ON public.journal_entry USING btree (reversal_entry_id);


--
-- Name: idx_journal_entry_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_journal_entry_source_id ON public.journal_entry USING btree (source_id);


--
-- Name: idx_journal_line_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_journal_line_account_id ON public.journal_line USING btree (account_id);


--
-- Name: idx_journal_line_journal_entry_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_journal_line_journal_entry_id ON public.journal_line USING btree (journal_entry_id);


--
-- Name: idx_leave_balance_leave_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leave_balance_leave_type_id ON public.leave_balance USING btree (leave_type_id);


--
-- Name: idx_leave_balance_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leave_balance_supplier_id ON public.leave_balance USING btree (supplier_id);


--
-- Name: idx_leave_balance_supplier_type_year; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leave_balance_supplier_type_year ON public.leave_balance USING btree (supplier_id, leave_type_id, year);


--
-- Name: idx_leave_balance_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leave_balance_workspace_id ON public.leave_balance USING btree (workspace_id);


--
-- Name: idx_leave_request_leave_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leave_request_leave_type_id ON public.leave_request USING btree (leave_type_id);


--
-- Name: idx_leave_request_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leave_request_status ON public.leave_request USING btree (status);


--
-- Name: idx_leave_request_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leave_request_supplier_id ON public.leave_request USING btree (supplier_id);


--
-- Name: idx_leave_request_supplier_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leave_request_supplier_status ON public.leave_request USING btree (supplier_id, status);


--
-- Name: idx_leave_request_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leave_request_workspace_id ON public.leave_request USING btree (workspace_id);


--
-- Name: idx_leave_type_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leave_type_code ON public.leave_type USING btree (code);


--
-- Name: idx_leave_type_compliance_region; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leave_type_compliance_region ON public.leave_type USING btree (compliance_region);


--
-- Name: idx_leave_type_workspace_id_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_leave_type_workspace_id_code ON public.leave_type USING btree (workspace_id, code);


--
-- Name: idx_license_history_license_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_license_history_license_id ON public.license_history USING btree (license_id);


--
-- Name: idx_license_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_license_plan_id ON public.license USING btree (plan_id);


--
-- Name: idx_license_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_license_subscription_id ON public.license USING btree (subscription_id);


--
-- Name: idx_loan_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_loan_account_id ON public.loan USING btree (account_id);


--
-- Name: idx_loan_loan_number; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_loan_loan_number ON public.loan USING btree (loan_number);


--
-- Name: idx_loan_payment_loan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_loan_payment_loan_id ON public.loan_payment USING btree (loan_id);


--
-- Name: idx_loan_payment_payment_number; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_loan_payment_payment_number ON public.loan_payment USING btree (payment_number);


--
-- Name: idx_location_area_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_location_area_workspace_id ON public.location_area USING btree (workspace_id);


--
-- Name: idx_location_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_location_attribute_attribute_id ON public.location_attribute USING btree (attribute_id);


--
-- Name: idx_location_attribute_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_location_attribute_location_id ON public.location_attribute USING btree (location_id);


--
-- Name: idx_location_location_area_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_location_location_area_id ON public.location USING btree (location_area_id);


--
-- Name: idx_location_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_location_workspace_id ON public.location USING btree (workspace_id);


--
-- Name: idx_pay_cycle_payroll_run_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pay_cycle_payroll_run_id ON public.pay_cycle USING btree (payroll_run_id);


--
-- Name: idx_pay_cycle_run_sequence; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pay_cycle_run_sequence ON public.pay_cycle USING btree (workspace_id, payroll_run_id, sequence_no);


--
-- Name: idx_pay_cycle_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pay_cycle_status ON public.pay_cycle USING btree (status);


--
-- Name: idx_pay_cycle_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pay_cycle_workspace_id ON public.pay_cycle USING btree (workspace_id);


--
-- Name: idx_payment_term_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_payment_term_workspace_id ON public.payment_term USING btree (workspace_id);


--
-- Name: idx_payroll_remittance_payroll_run_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_payroll_remittance_payroll_run_id ON public.payroll_remittance USING btree (payroll_run_id);


--
-- Name: idx_payroll_run_run_number; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_payroll_run_run_number ON public.payroll_run USING btree (run_number);


--
-- Name: idx_payroll_run_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_payroll_run_workspace_id ON public.payroll_run USING btree (workspace_id);


--
-- Name: idx_permission_granted_by_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_permission_granted_by_user_id ON public.permission USING btree (granted_by_user_id);


--
-- Name: idx_permission_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_permission_user_id ON public.permission USING btree (user_id);


--
-- Name: idx_permission_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_permission_workspace_id ON public.permission USING btree (workspace_id);


--
-- Name: idx_petty_cash_fund_custodian_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_petty_cash_fund_custodian_id ON public.petty_cash_fund USING btree (custodian_id);


--
-- Name: idx_petty_cash_fund_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_petty_cash_fund_location_id ON public.petty_cash_fund USING btree (location_id);


--
-- Name: idx_petty_cash_replenishment_fund_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_petty_cash_replenishment_fund_id ON public.petty_cash_replenishment USING btree (fund_id);


--
-- Name: idx_petty_cash_replenishment_replenishment_number; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_petty_cash_replenishment_replenishment_number ON public.petty_cash_replenishment USING btree (replenishment_number);


--
-- Name: idx_petty_cash_voucher_fund_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_petty_cash_voucher_fund_id ON public.petty_cash_voucher USING btree (fund_id);


--
-- Name: idx_petty_cash_voucher_voucher_number; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_petty_cash_voucher_voucher_number ON public.petty_cash_voucher USING btree (voucher_number);


--
-- Name: idx_phase_outcome_summary_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_phase_outcome_summary_job_id ON public.phase_outcome_summary USING btree (job_id);


--
-- Name: idx_phase_outcome_summary_job_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_phase_outcome_summary_job_phase_id ON public.phase_outcome_summary USING btree (job_phase_id);


--
-- Name: idx_plan_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_plan_attribute_attribute_id ON public.plan_attribute USING btree (attribute_id);


--
-- Name: idx_plan_attribute_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_plan_attribute_plan_id ON public.plan_attribute USING btree (plan_id);


--
-- Name: idx_plan_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_plan_client_id ON public.plan USING btree (client_id) WHERE (client_id IS NOT NULL);


--
-- Name: idx_plan_job_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_plan_job_template_id ON public.plan USING btree (job_template_id) WHERE (job_template_id IS NOT NULL);


--
-- Name: idx_plan_legacy_price_list_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_plan_legacy_price_list_id ON public.plan USING btree (legacy_price_list_id) WHERE (legacy_price_list_id IS NOT NULL);


--
-- Name: idx_plan_location_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_plan_location_location_id ON public.plan_location USING btree (location_id);


--
-- Name: idx_plan_location_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_plan_location_plan_id ON public.plan_location USING btree (plan_id);


--
-- Name: idx_plan_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_plan_parent_id ON public.plan USING btree (parent_id) WHERE (parent_id IS NOT NULL);


--
-- Name: idx_plan_settings_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_plan_settings_plan_id ON public.plan_settings USING btree (plan_id);


--
-- Name: idx_plan_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_plan_workspace_id ON public.plan USING btree (workspace_id);


--
-- Name: idx_prepayment_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prepayment_account_id ON public.prepayment USING btree (account_id);


--
-- Name: idx_prepayment_expenditure_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prepayment_expenditure_id ON public.prepayment USING btree (expenditure_id);


--
-- Name: idx_prepayment_expense_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prepayment_expense_account_id ON public.prepayment USING btree (expense_account_id);


--
-- Name: idx_prepayment_supplier_contract_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prepayment_supplier_contract_id ON public.prepayment USING btree (supplier_contract_id);


--
-- Name: idx_price_list_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_price_list_location_id ON public.price_list USING btree (location_id);


--
-- Name: idx_price_plan_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_price_plan_client_id ON public.price_plan USING btree (client_id) WHERE (client_id IS NOT NULL);


--
-- Name: idx_price_plan_legacy_price_list_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_price_plan_legacy_price_list_id ON public.price_plan USING btree (legacy_price_list_id) WHERE (legacy_price_list_id IS NOT NULL);


--
-- Name: idx_price_plan_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_price_plan_plan_id ON public.price_plan USING btree (plan_id);


--
-- Name: idx_price_plan_price_schedule_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_price_plan_price_schedule_id ON public.price_plan USING btree (price_schedule_id);


--
-- Name: idx_price_product_price_list_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_price_product_price_list_id ON public.price_product USING btree (price_list_id);


--
-- Name: idx_price_product_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_price_product_product_id ON public.price_product USING btree (product_id);


--
-- Name: idx_price_schedule_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_price_schedule_client_id ON public.price_schedule USING btree (client_id) WHERE (client_id IS NOT NULL);


--
-- Name: idx_price_schedule_legacy_price_list_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_price_schedule_legacy_price_list_id ON public.price_schedule USING btree (legacy_price_list_id) WHERE (legacy_price_list_id IS NOT NULL);


--
-- Name: idx_price_schedule_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_price_schedule_location_id ON public.price_schedule USING btree (location_id);


--
-- Name: idx_price_schedule_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_price_schedule_workspace_id ON public.price_schedule USING btree (workspace_id);


--
-- Name: idx_procurement_request_expenditure_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_expenditure_category_id ON public.procurement_request USING btree (expenditure_category_id);


--
-- Name: idx_procurement_request_expense_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_expense_account_id ON public.procurement_request USING btree (expense_account_id);


--
-- Name: idx_procurement_request_fulfillment_strategy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_fulfillment_strategy ON public.procurement_request USING btree (fulfillment_strategy);


--
-- Name: idx_procurement_request_line_expenditure_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_line_expenditure_category_id ON public.procurement_request_line USING btree (expenditure_category_id);


--
-- Name: idx_procurement_request_line_expense_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_line_expense_account_id ON public.procurement_request_line USING btree (expense_account_id);


--
-- Name: idx_procurement_request_line_fulfillment_mode; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_line_fulfillment_mode ON public.procurement_request_line USING btree (fulfillment_mode);


--
-- Name: idx_procurement_request_line_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_line_location_id ON public.procurement_request_line USING btree (location_id);


--
-- Name: idx_procurement_request_line_procurement_request_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_line_procurement_request_id ON public.procurement_request_line USING btree (procurement_request_id);


--
-- Name: idx_procurement_request_line_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_line_product_id ON public.procurement_request_line USING btree (product_id);


--
-- Name: idx_procurement_request_line_spawn_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_line_spawn_status ON public.procurement_request_line USING btree (spawn_status);


--
-- Name: idx_procurement_request_line_spawned_expenditure_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_line_spawned_expenditure_id ON public.procurement_request_line USING btree (spawned_expenditure_id);


--
-- Name: idx_procurement_request_line_spawned_purchase_order_line_item_i; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_line_spawned_purchase_order_line_item_i ON public.procurement_request_line USING btree (spawned_purchase_order_line_item_id);


--
-- Name: idx_procurement_request_line_spawned_supplier_contract_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_line_spawned_supplier_contract_id ON public.procurement_request_line USING btree (spawned_supplier_contract_id);


--
-- Name: idx_procurement_request_line_supplier_contract_line_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_line_supplier_contract_line_id ON public.procurement_request_line USING btree (supplier_contract_line_id);


--
-- Name: idx_procurement_request_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_location_id ON public.procurement_request USING btree (location_id);


--
-- Name: idx_procurement_request_purchase_order_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_purchase_order_id ON public.procurement_request USING btree (purchase_order_id);


--
-- Name: idx_procurement_request_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_status ON public.procurement_request USING btree (status);


--
-- Name: idx_procurement_request_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_supplier_id ON public.procurement_request USING btree (supplier_id);


--
-- Name: idx_procurement_request_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_workspace_id ON public.procurement_request USING btree (workspace_id);


--
-- Name: idx_product_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_attribute_attribute_id ON public.product_attribute USING btree (attribute_id);


--
-- Name: idx_product_attribute_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_attribute_product_id ON public.product_attribute USING btree (product_id);


--
-- Name: idx_product_collection_collection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_collection_collection_id ON public.product_collection USING btree (collection_id);


--
-- Name: idx_product_collection_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_collection_product_id ON public.product_collection USING btree (product_id);


--
-- Name: idx_product_line_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_line_id ON public.product USING btree (line_id);


--
-- Name: idx_product_line_line_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_line_line_id ON public.product_line USING btree (line_id);


--
-- Name: idx_product_line_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_line_product_id ON public.product_line USING btree (product_id);


--
-- Name: idx_product_option_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_option_product_id ON public.product_option USING btree (product_id);


--
-- Name: idx_product_option_value_product_option_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_option_value_product_option_id ON public.product_option_value USING btree (product_option_id);


--
-- Name: idx_product_plan_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_plan_plan_id ON public.product_plan USING btree (plan_id);


--
-- Name: idx_product_plan_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_plan_product_id ON public.product_plan USING btree (product_id);


--
-- Name: idx_product_plan_product_variant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_plan_product_variant_id ON public.product_plan USING btree (product_variant_id);


--
-- Name: idx_product_price_plan_job_template_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_price_plan_job_template_phase_id ON public.product_price_plan USING btree (job_template_phase_id);


--
-- Name: idx_product_price_plan_price_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_price_plan_price_plan_id ON public.product_price_plan USING btree (price_plan_id);


--
-- Name: idx_product_price_plan_product_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_price_plan_product_plan_id ON public.product_price_plan USING btree (product_plan_id);


--
-- Name: idx_product_variant_image_product_variant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_variant_image_product_variant_id ON public.product_variant_image USING btree (product_variant_id);


--
-- Name: idx_product_variant_option_product_option_value_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_variant_option_product_option_value_id ON public.product_variant_option USING btree (product_option_value_id);


--
-- Name: idx_product_variant_option_product_variant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_variant_option_product_variant_id ON public.product_variant_option USING btree (product_variant_id);


--
-- Name: idx_product_variant_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_variant_product_id ON public.product_variant USING btree (product_id);


--
-- Name: idx_product_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_workspace_id ON public.product USING btree (workspace_id);


--
-- Name: idx_purchase_order_line_item_procurement_request_line_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_purchase_order_line_item_procurement_request_line_id ON public.purchase_order_line_item USING btree (procurement_request_line_id);


--
-- Name: idx_purchase_order_line_item_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_purchase_order_line_item_product_id ON public.purchase_order_line_item USING btree (product_id);


--
-- Name: idx_purchase_order_line_item_purchase_order_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_purchase_order_line_item_purchase_order_id ON public.purchase_order_line_item USING btree (purchase_order_id);


--
-- Name: idx_purchase_order_line_item_supplier_contract_line_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_purchase_order_line_item_supplier_contract_line_id ON public.purchase_order_line_item USING btree (supplier_contract_line_id);


--
-- Name: idx_purchase_order_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_purchase_order_location_id ON public.purchase_order USING btree (location_id);


--
-- Name: idx_purchase_order_procurement_request_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_purchase_order_procurement_request_id ON public.purchase_order USING btree (procurement_request_id);


--
-- Name: idx_purchase_order_supplier_contract_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_purchase_order_supplier_contract_id ON public.purchase_order USING btree (supplier_contract_id);


--
-- Name: idx_purchase_order_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_purchase_order_supplier_id ON public.purchase_order USING btree (supplier_id);


--
-- Name: idx_rate_band_rate_table_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_rate_band_rate_table_id ON public.rate_band USING btree (rate_table_id);


--
-- Name: idx_rate_band_rate_table_id_ordinal; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_rate_band_rate_table_id_ordinal ON public.rate_band USING btree (rate_table_id, ordinal);


--
-- Name: idx_rate_table_effective_from; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_rate_table_effective_from ON public.rate_table USING btree (effective_from);


--
-- Name: idx_rate_table_region_kind_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_rate_table_region_kind_status ON public.rate_table USING btree (compliance_region, kind, status);


--
-- Name: idx_rate_table_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_rate_table_workspace_id ON public.rate_table USING btree (workspace_id);


--
-- Name: idx_resource_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_resource_product_id ON public.resource USING btree (product_id);


--
-- Name: idx_resource_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_resource_user_id ON public.resource USING btree (user_id);


--
-- Name: idx_revenue_billing_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_billing_event_id ON public.revenue USING btree (billing_event_id);


--
-- Name: idx_revenue_job_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_job_phase_id ON public.revenue USING btree (job_phase_id);


--
-- Name: idx_revenue_line_item_job_activity_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_line_item_job_activity_id ON public.revenue_line_item USING btree (job_activity_id);


--
-- Name: idx_revenue_line_item_price_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_line_item_price_product_id ON public.revenue_line_item USING btree (price_product_id);


--
-- Name: idx_revenue_line_item_product_price_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_line_item_product_price_plan_id ON public.revenue_line_item USING btree (product_price_plan_id);


--
-- Name: idx_role_permission_permission_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_role_permission_permission_id ON public.role_permission USING btree (permission_id);


--
-- Name: idx_role_permission_role_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_role_permission_role_id ON public.role_permission USING btree (role_id);


--
-- Name: idx_role_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_role_workspace_id ON public.role USING btree (workspace_id);


--
-- Name: idx_security_deposit_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_security_deposit_account_id ON public.security_deposit USING btree (account_id);


--
-- Name: idx_session_token; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_session_token ON public.session USING btree (token);


--
-- Name: idx_session_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_session_user_id ON public.session USING btree (user_id);


--
-- Name: idx_staff_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_staff_attribute_attribute_id ON public.staff_attribute USING btree (attribute_id);


--
-- Name: idx_staff_attribute_staff_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_staff_attribute_staff_id ON public.staff_attribute USING btree (staff_id);


--
-- Name: idx_staff_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_staff_user_id ON public.staff USING btree (user_id);


--
-- Name: idx_stage_stage_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_stage_stage_template_id ON public.stage USING btree (stage_template_id);


--
-- Name: idx_stage_template_workflow_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_stage_template_workflow_template_id ON public.stage_template USING btree (workflow_template_id);


--
-- Name: idx_stage_workflow_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_stage_workflow_id ON public.stage USING btree (workflow_id);


--
-- Name: idx_subscription_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_attribute_attribute_id ON public.subscription_attribute USING btree (attribute_id);


--
-- Name: idx_subscription_attribute_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_attribute_subscription_id ON public.subscription_attribute USING btree (subscription_id);


--
-- Name: idx_subscription_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_client_id ON public.subscription USING btree (client_id);


--
-- Name: idx_subscription_price_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_price_plan_id ON public.subscription USING btree (price_plan_id);


--
-- Name: idx_supplier_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_attribute_attribute_id ON public.supplier_attribute USING btree (attribute_id);


--
-- Name: idx_supplier_attribute_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_attribute_supplier_id ON public.supplier_attribute USING btree (supplier_id);


--
-- Name: idx_supplier_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_client_id ON public.supplier USING btree (client_id);


--
-- Name: idx_supplier_contract_expenditure_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_expenditure_category_id ON public.supplier_contract USING btree (expenditure_category_id);


--
-- Name: idx_supplier_contract_expense_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_expense_account_id ON public.supplier_contract USING btree (expense_account_id);


--
-- Name: idx_supplier_contract_kind; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_kind ON public.supplier_contract USING btree (kind);


--
-- Name: idx_supplier_contract_line_expenditure_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_line_expenditure_category_id ON public.supplier_contract_line USING btree (expenditure_category_id);


--
-- Name: idx_supplier_contract_line_expense_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_line_expense_account_id ON public.supplier_contract_line USING btree (expense_account_id);


--
-- Name: idx_supplier_contract_line_kind; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_line_kind ON public.supplier_contract_line USING btree (kind);


--
-- Name: idx_supplier_contract_line_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_line_location_id ON public.supplier_contract_line USING btree (location_id);


--
-- Name: idx_supplier_contract_line_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_line_product_id ON public.supplier_contract_line USING btree (product_id);


--
-- Name: idx_supplier_contract_line_supplier_contract_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_line_supplier_contract_id ON public.supplier_contract_line USING btree (supplier_contract_id);


--
-- Name: idx_supplier_contract_line_supplier_contract_price_schedule_lin; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_line_supplier_contract_price_schedule_lin ON public.supplier_contract_line USING btree (supplier_contract_price_schedule_line_id);


--
-- Name: idx_supplier_contract_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_location_id ON public.supplier_contract USING btree (location_id);


--
-- Name: idx_supplier_contract_payment_term_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_payment_term_id ON public.supplier_contract USING btree (payment_term_id);


--
-- Name: idx_supplier_contract_price_schedule_line_contract_line_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_price_schedule_line_contract_line_id ON public.supplier_contract_price_schedule_line USING btree (supplier_contract_line_id);


--
-- Name: idx_supplier_contract_price_schedule_line_schedule_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_price_schedule_line_schedule_id ON public.supplier_contract_price_schedule_line USING btree (supplier_contract_price_schedule_id);


--
-- Name: idx_supplier_contract_price_schedule_line_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_price_schedule_line_workspace_id ON public.supplier_contract_price_schedule_line USING btree (workspace_id);


--
-- Name: idx_supplier_contract_price_schedule_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_price_schedule_location_id ON public.supplier_contract_price_schedule USING btree (location_id);


--
-- Name: idx_supplier_contract_price_schedule_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_price_schedule_status ON public.supplier_contract_price_schedule USING btree (status);


--
-- Name: idx_supplier_contract_price_schedule_supplier_contract_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_price_schedule_supplier_contract_id ON public.supplier_contract_price_schedule USING btree (supplier_contract_id);


--
-- Name: idx_supplier_contract_price_schedule_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_price_schedule_workspace_id ON public.supplier_contract_price_schedule USING btree (workspace_id);


--
-- Name: idx_supplier_contract_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_status ON public.supplier_contract USING btree (status);


--
-- Name: idx_supplier_contract_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_supplier_id ON public.supplier_contract USING btree (supplier_id);


--
-- Name: idx_supplier_contract_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_workspace_id ON public.supplier_contract USING btree (workspace_id);


--
-- Name: idx_supplier_dependent_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_dependent_supplier_id ON public.supplier_dependent USING btree (supplier_id);


--
-- Name: idx_supplier_dependent_workspace_active; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_dependent_workspace_active ON public.supplier_dependent USING btree (workspace_id, active);


--
-- Name: idx_supplier_dependent_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_dependent_workspace_id ON public.supplier_dependent USING btree (workspace_id);


--
-- Name: idx_supplier_kind; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_kind ON public.supplier USING btree (kind);


--
-- Name: idx_supplier_lifecycle_event_supplier_event_desc; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_lifecycle_event_supplier_event_desc ON public.supplier_lifecycle_event USING btree (supplier_id, event_date DESC);


--
-- Name: idx_supplier_lifecycle_event_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_lifecycle_event_workspace_id ON public.supplier_lifecycle_event USING btree (workspace_id);


--
-- Name: idx_supplier_lifecycle_event_ws_category_kind; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_lifecycle_event_ws_category_kind ON public.supplier_lifecycle_event USING btree (workspace_id, category, kind);


--
-- Name: idx_supplier_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_user_id ON public.supplier USING btree (user_id);


--
-- Name: idx_supplier_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_workspace_id ON public.supplier USING btree (workspace_id);


--
-- Name: idx_task_outcome_check_criteria_option_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_task_outcome_check_criteria_option_id ON public.task_outcome_check USING btree (criteria_option_id);


--
-- Name: idx_task_outcome_check_task_outcome_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_task_outcome_check_task_outcome_id ON public.task_outcome_check USING btree (task_outcome_id);


--
-- Name: idx_task_outcome_criteria_version_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_task_outcome_criteria_version_id ON public.task_outcome USING btree (criteria_version_id);


--
-- Name: idx_task_outcome_job_task_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_task_outcome_job_task_id ON public.task_outcome USING btree (job_task_id);


--
-- Name: idx_template_task_criteria_job_template_task_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_template_task_criteria_job_template_task_id ON public.template_task_criteria USING btree (job_template_task_id);


--
-- Name: idx_template_task_criteria_outcome_criteria_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_template_task_criteria_outcome_criteria_id ON public.template_task_criteria USING btree (outcome_criteria_id);


--
-- Name: idx_user_mobile_number; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_mobile_number ON public."user" USING btree (mobile_number);


--
-- Name: idx_workflow_template_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_workflow_template_workspace_id ON public.workflow_template USING btree (workspace_id);


--
-- Name: idx_workflow_workflow_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_workflow_workflow_template_id ON public.workflow USING btree (workflow_template_id);


--
-- Name: idx_workflow_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_workflow_workspace_id ON public.workflow USING btree (workspace_id);


--
-- Name: idx_workspace_user_role_role_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_workspace_user_role_role_id ON public.workspace_user_role USING btree (role_id);


--
-- Name: idx_workspace_user_role_workspace_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_workspace_user_role_workspace_user_id ON public.workspace_user_role USING btree (workspace_user_id);


--
-- Name: idx_workspace_user_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_workspace_user_user_id ON public.workspace_user USING btree (user_id);


--
-- Name: idx_workspace_user_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_workspace_user_workspace_id ON public.workspace_user USING btree (workspace_id);


--
-- Name: idx_workspace_workflow_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_workspace_workflow_template_id ON public.workspace USING btree (workflow_template_id);


--
-- Name: supplier_contract_price_schedule_one_active_per_contract; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX supplier_contract_price_schedule_one_active_per_contract ON public.supplier_contract_price_schedule USING btree (supplier_contract_id) WHERE (status = 2);


--
-- Name: supplier_contract_price_schedule_one_open_ended_per_contract; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX supplier_contract_price_schedule_one_open_ended_per_contract ON public.supplier_contract_price_schedule USING btree (supplier_contract_id) WHERE ((date_time_end IS NULL) AND (status <> 4));


--
-- Name: uniq_revenue_billing_event_id_active; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uniq_revenue_billing_event_id_active ON public.revenue USING btree (billing_event_id) WHERE ((billing_event_id IS NOT NULL) AND (status <> 'cancelled'::text));


--
-- Name: uq_accrued_expense_contract_cycle; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_accrued_expense_contract_cycle ON public.accrued_expense USING btree (supplier_contract_id, cycle_date) WHERE (cycle_date IS NOT NULL);


--
-- Name: uq_expenditure_recurrence_contract_cycle; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_expenditure_recurrence_contract_cycle ON public.expenditure USING btree (supplier_contract_id, cycle_date) WHERE ((source = 'recurrence'::text) AND (supplier_contract_id IS NOT NULL) AND (cycle_date IS NOT NULL));


--
-- Name: uq_expense_recognition_idempotency; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_expense_recognition_idempotency ON public.expense_recognition USING btree (idempotency_key);


--
-- Name: uq_product_plan_plan_product_variant; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_product_plan_plan_product_variant ON public.product_plan USING btree (plan_id, product_id, COALESCE(product_variant_id, ''::text));


--
-- Name: uq_product_price_plan_price_plan_product_plan; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_product_price_plan_price_plan_product_plan ON public.product_price_plan USING btree (price_plan_id, product_plan_id);


--
-- Name: uq_supplier_contract_price_schedule_line_schedule_contract_line; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_supplier_contract_price_schedule_line_schedule_contract_line ON public.supplier_contract_price_schedule_line USING btree (supplier_contract_price_schedule_id, supplier_contract_line_id);


--
-- Name: audit_entry_2026_03_actor_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_actor ATTACH PARTITION audit_trail.audit_entry_2026_03_actor_id_occurred_at_idx;


--
-- Name: audit_entry_2026_03_entity_type_entity_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_entity ATTACH PARTITION audit_trail.audit_entry_2026_03_entity_type_entity_id_occurred_at_idx;


--
-- Name: audit_entry_2026_03_permission_code_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_permcode ATTACH PARTITION audit_trail.audit_entry_2026_03_permission_code_occurred_at_idx;


--
-- Name: audit_entry_2026_03_pkey; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.audit_entry_pkey ATTACH PARTITION audit_trail.audit_entry_2026_03_pkey;


--
-- Name: audit_entry_2026_03_transaction_id_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_txid ATTACH PARTITION audit_trail.audit_entry_2026_03_transaction_id_idx;


--
-- Name: audit_entry_2026_03_use_case_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_usecase ATTACH PARTITION audit_trail.audit_entry_2026_03_use_case_occurred_at_idx;


--
-- Name: audit_entry_2026_03_workspace_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_ws ATTACH PARTITION audit_trail.audit_entry_2026_03_workspace_id_occurred_at_idx;


--
-- Name: audit_entry_2026_04_actor_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_actor ATTACH PARTITION audit_trail.audit_entry_2026_04_actor_id_occurred_at_idx;


--
-- Name: audit_entry_2026_04_entity_type_entity_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_entity ATTACH PARTITION audit_trail.audit_entry_2026_04_entity_type_entity_id_occurred_at_idx;


--
-- Name: audit_entry_2026_04_permission_code_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_permcode ATTACH PARTITION audit_trail.audit_entry_2026_04_permission_code_occurred_at_idx;


--
-- Name: audit_entry_2026_04_pkey; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.audit_entry_pkey ATTACH PARTITION audit_trail.audit_entry_2026_04_pkey;


--
-- Name: audit_entry_2026_04_transaction_id_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_txid ATTACH PARTITION audit_trail.audit_entry_2026_04_transaction_id_idx;


--
-- Name: audit_entry_2026_04_use_case_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_usecase ATTACH PARTITION audit_trail.audit_entry_2026_04_use_case_occurred_at_idx;


--
-- Name: audit_entry_2026_04_workspace_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_ws ATTACH PARTITION audit_trail.audit_entry_2026_04_workspace_id_occurred_at_idx;


--
-- Name: audit_entry_2026_05_actor_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_actor ATTACH PARTITION audit_trail.audit_entry_2026_05_actor_id_occurred_at_idx;


--
-- Name: audit_entry_2026_05_entity_type_entity_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_entity ATTACH PARTITION audit_trail.audit_entry_2026_05_entity_type_entity_id_occurred_at_idx;


--
-- Name: audit_entry_2026_05_permission_code_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_permcode ATTACH PARTITION audit_trail.audit_entry_2026_05_permission_code_occurred_at_idx;


--
-- Name: audit_entry_2026_05_pkey; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.audit_entry_pkey ATTACH PARTITION audit_trail.audit_entry_2026_05_pkey;


--
-- Name: audit_entry_2026_05_transaction_id_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_txid ATTACH PARTITION audit_trail.audit_entry_2026_05_transaction_id_idx;


--
-- Name: audit_entry_2026_05_use_case_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_usecase ATTACH PARTITION audit_trail.audit_entry_2026_05_use_case_occurred_at_idx;


--
-- Name: audit_entry_2026_05_workspace_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_ws ATTACH PARTITION audit_trail.audit_entry_2026_05_workspace_id_occurred_at_idx;


--
-- Name: accrued_expense accrued_expense_accrual_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accrued_expense
    ADD CONSTRAINT accrued_expense_accrual_account_id_fkey FOREIGN KEY (accrual_account_id) REFERENCES public.account(id);


--
-- Name: accrued_expense accrued_expense_expense_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accrued_expense
    ADD CONSTRAINT accrued_expense_expense_account_id_fkey FOREIGN KEY (expense_account_id) REFERENCES public.account(id);


--
-- Name: accrued_expense_settlement accrued_expense_settlement_accrued_expense_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accrued_expense_settlement
    ADD CONSTRAINT accrued_expense_settlement_accrued_expense_id_fkey FOREIGN KEY (accrued_expense_id) REFERENCES public.accrued_expense(id);


--
-- Name: accrued_expense_settlement accrued_expense_settlement_expenditure_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accrued_expense_settlement
    ADD CONSTRAINT accrued_expense_settlement_expenditure_id_fkey FOREIGN KEY (expenditure_id) REFERENCES public.expenditure(id);


--
-- Name: accrued_expense_settlement accrued_expense_settlement_expenditure_line_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accrued_expense_settlement
    ADD CONSTRAINT accrued_expense_settlement_expenditure_line_item_id_fkey FOREIGN KEY (expenditure_line_item_id) REFERENCES public.expenditure_line_item(id);


--
-- Name: accrued_expense_settlement accrued_expense_settlement_reversed_by_settlement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accrued_expense_settlement
    ADD CONSTRAINT accrued_expense_settlement_reversed_by_settlement_id_fkey FOREIGN KEY (reversed_by_settlement_id) REFERENCES public.accrued_expense_settlement(id);


--
-- Name: accrued_expense_settlement accrued_expense_settlement_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accrued_expense_settlement
    ADD CONSTRAINT accrued_expense_settlement_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: accrued_expense accrued_expense_supplier_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accrued_expense
    ADD CONSTRAINT accrued_expense_supplier_contract_id_fkey FOREIGN KEY (supplier_contract_id) REFERENCES public.supplier_contract(id);


--
-- Name: accrued_expense accrued_expense_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accrued_expense
    ADD CONSTRAINT accrued_expense_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: accrued_expense accrued_expense_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accrued_expense
    ADD CONSTRAINT accrued_expense_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: billing_event billing_event_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.billing_event
    ADD CONSTRAINT billing_event_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.job(id);


--
-- Name: billing_event billing_event_job_phase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.billing_event
    ADD CONSTRAINT billing_event_job_phase_id_fkey FOREIGN KEY (job_phase_id) REFERENCES public.job_phase(id);


--
-- Name: billing_event billing_event_job_template_phase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.billing_event
    ADD CONSTRAINT billing_event_job_template_phase_id_fkey FOREIGN KEY (job_template_phase_id) REFERENCES public.job_template_phase(id);


--
-- Name: billing_event billing_event_parent_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.billing_event
    ADD CONSTRAINT billing_event_parent_event_id_fkey FOREIGN KEY (parent_event_id) REFERENCES public.billing_event(id);


--
-- Name: billing_event billing_event_product_price_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.billing_event
    ADD CONSTRAINT billing_event_product_price_plan_id_fkey FOREIGN KEY (product_price_plan_id) REFERENCES public.product_price_plan(id);


--
-- Name: billing_event billing_event_revenue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.billing_event
    ADD CONSTRAINT billing_event_revenue_id_fkey FOREIGN KEY (revenue_id) REFERENCES public.revenue(id);


--
-- Name: billing_event billing_event_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.billing_event
    ADD CONSTRAINT billing_event_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription(id);


--
-- Name: client client_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: expenditure expenditure_accrued_expense_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_accrued_expense_id_fkey FOREIGN KEY (accrued_expense_id) REFERENCES public.accrued_expense(id);


--
-- Name: expenditure expenditure_expense_recognition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_expense_recognition_id_fkey FOREIGN KEY (expense_recognition_id) REFERENCES public.expense_recognition(id);


--
-- Name: expenditure expenditure_petty_cash_fund_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_petty_cash_fund_id_fkey FOREIGN KEY (petty_cash_fund_id) REFERENCES public.petty_cash_fund(id);


--
-- Name: expenditure expenditure_supplier_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_supplier_contract_id_fkey FOREIGN KEY (supplier_contract_id) REFERENCES public.supplier_contract(id);


--
-- Name: expense_recognition expense_recognition_accrual_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_accrual_account_id_fkey FOREIGN KEY (accrual_account_id) REFERENCES public.account(id);


--
-- Name: expense_recognition expense_recognition_expenditure_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_expenditure_category_id_fkey FOREIGN KEY (expenditure_category_id) REFERENCES public.expenditure_category(id);


--
-- Name: expense_recognition expense_recognition_expenditure_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_expenditure_id_fkey FOREIGN KEY (expenditure_id) REFERENCES public.expenditure(id);


--
-- Name: expense_recognition expense_recognition_expense_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_expense_account_id_fkey FOREIGN KEY (expense_account_id) REFERENCES public.account(id);


--
-- Name: expense_recognition expense_recognition_job_phase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_job_phase_id_fkey FOREIGN KEY (job_phase_id) REFERENCES public.job_phase(id);


--
-- Name: expense_recognition expense_recognition_journal_entry_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_journal_entry_id_fkey FOREIGN KEY (journal_entry_id) REFERENCES public.journal_entry(id);


--
-- Name: expense_recognition_line expense_recognition_line_expenditure_line_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_line
    ADD CONSTRAINT expense_recognition_line_expenditure_line_item_id_fkey FOREIGN KEY (expenditure_line_item_id) REFERENCES public.expenditure_line_item(id);


--
-- Name: expense_recognition_line expense_recognition_line_expense_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_line
    ADD CONSTRAINT expense_recognition_line_expense_account_id_fkey FOREIGN KEY (expense_account_id) REFERENCES public.account(id);


--
-- Name: expense_recognition_line expense_recognition_line_expense_recognition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_line
    ADD CONSTRAINT expense_recognition_line_expense_recognition_id_fkey FOREIGN KEY (expense_recognition_id) REFERENCES public.expense_recognition(id);


--
-- Name: expense_recognition_line expense_recognition_line_job_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_line
    ADD CONSTRAINT expense_recognition_line_job_activity_id_fkey FOREIGN KEY (job_activity_id) REFERENCES public.job_activity(id);


--
-- Name: expense_recognition_line expense_recognition_line_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_line
    ADD CONSTRAINT expense_recognition_line_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: expense_recognition_line expense_recognition_line_supplier_contract_line_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_line
    ADD CONSTRAINT expense_recognition_line_supplier_contract_line_id_fkey FOREIGN KEY (supplier_contract_line_id) REFERENCES public.supplier_contract_line(id);


--
-- Name: expense_recognition_line expense_recognition_line_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_line
    ADD CONSTRAINT expense_recognition_line_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: expense_recognition expense_recognition_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(id);


--
-- Name: expense_recognition expense_recognition_supplier_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_supplier_contract_id_fkey FOREIGN KEY (supplier_contract_id) REFERENCES public.supplier_contract(id);


--
-- Name: expense_recognition expense_recognition_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: expense_recognition expense_recognition_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: procurement_request fk_procurement_request_purchase_order_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request
    ADD CONSTRAINT fk_procurement_request_purchase_order_id FOREIGN KEY (purchase_order_id) REFERENCES public.purchase_order(id);


--
-- Name: job job_parent_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_parent_job_id_fkey FOREIGN KEY (parent_job_id) REFERENCES public.job(id);


--
-- Name: job_template_relation job_template_relation_child_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_relation
    ADD CONSTRAINT job_template_relation_child_template_id_fkey FOREIGN KEY (child_template_id) REFERENCES public.job_template(id);


--
-- Name: job_template_relation job_template_relation_parent_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_relation
    ADD CONSTRAINT job_template_relation_parent_template_id_fkey FOREIGN KEY (parent_template_id) REFERENCES public.job_template(id);


--
-- Name: leave_balance leave_balance_leave_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leave_balance
    ADD CONSTRAINT leave_balance_leave_type_id_fkey FOREIGN KEY (leave_type_id) REFERENCES public.leave_type(id);


--
-- Name: leave_balance leave_balance_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leave_balance
    ADD CONSTRAINT leave_balance_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: leave_balance leave_balance_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leave_balance
    ADD CONSTRAINT leave_balance_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: leave_request leave_request_leave_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leave_request
    ADD CONSTRAINT leave_request_leave_type_id_fkey FOREIGN KEY (leave_type_id) REFERENCES public.leave_type(id);


--
-- Name: leave_request leave_request_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leave_request
    ADD CONSTRAINT leave_request_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: leave_request leave_request_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leave_request
    ADD CONSTRAINT leave_request_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: leave_type leave_type_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leave_type
    ADD CONSTRAINT leave_type_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: pay_cycle pay_cycle_payroll_run_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pay_cycle
    ADD CONSTRAINT pay_cycle_payroll_run_id_fkey FOREIGN KEY (payroll_run_id) REFERENCES public.payroll_run(id);


--
-- Name: pay_cycle pay_cycle_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pay_cycle
    ADD CONSTRAINT pay_cycle_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: payroll_run payroll_run_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payroll_run
    ADD CONSTRAINT payroll_run_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: plan plan_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id) ON DELETE RESTRICT;


--
-- Name: plan plan_job_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_job_template_id_fkey FOREIGN KEY (job_template_id) REFERENCES public.job_template(id);


--
-- Name: plan plan_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.plan(id) ON DELETE RESTRICT;


--
-- Name: plan plan_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: prepayment prepayment_expenditure_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prepayment
    ADD CONSTRAINT prepayment_expenditure_id_fkey FOREIGN KEY (expenditure_id) REFERENCES public.expenditure(id);


--
-- Name: prepayment prepayment_supplier_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prepayment
    ADD CONSTRAINT prepayment_supplier_contract_id_fkey FOREIGN KEY (supplier_contract_id) REFERENCES public.supplier_contract(id);


--
-- Name: price_plan price_plan_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_plan
    ADD CONSTRAINT price_plan_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id) ON DELETE RESTRICT;


--
-- Name: price_schedule price_schedule_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_schedule
    ADD CONSTRAINT price_schedule_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id) ON DELETE RESTRICT;


--
-- Name: price_schedule price_schedule_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_schedule
    ADD CONSTRAINT price_schedule_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: procurement_request procurement_request_expenditure_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request
    ADD CONSTRAINT procurement_request_expenditure_category_id_fkey FOREIGN KEY (expenditure_category_id) REFERENCES public.expenditure_category(id);


--
-- Name: procurement_request procurement_request_expense_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request
    ADD CONSTRAINT procurement_request_expense_account_id_fkey FOREIGN KEY (expense_account_id) REFERENCES public.account(id);


--
-- Name: procurement_request_line procurement_request_line_expenditure_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request_line
    ADD CONSTRAINT procurement_request_line_expenditure_category_id_fkey FOREIGN KEY (expenditure_category_id) REFERENCES public.expenditure_category(id);


--
-- Name: procurement_request_line procurement_request_line_expense_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request_line
    ADD CONSTRAINT procurement_request_line_expense_account_id_fkey FOREIGN KEY (expense_account_id) REFERENCES public.account(id);


--
-- Name: procurement_request_line procurement_request_line_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request_line
    ADD CONSTRAINT procurement_request_line_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(id);


--
-- Name: procurement_request_line procurement_request_line_procurement_request_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request_line
    ADD CONSTRAINT procurement_request_line_procurement_request_id_fkey FOREIGN KEY (procurement_request_id) REFERENCES public.procurement_request(id);


--
-- Name: procurement_request_line procurement_request_line_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request_line
    ADD CONSTRAINT procurement_request_line_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: procurement_request procurement_request_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request
    ADD CONSTRAINT procurement_request_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(id);


--
-- Name: procurement_request procurement_request_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request
    ADD CONSTRAINT procurement_request_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: procurement_request procurement_request_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request
    ADD CONSTRAINT procurement_request_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: product_price_plan product_price_plan_job_template_phase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_price_plan
    ADD CONSTRAINT product_price_plan_job_template_phase_id_fkey FOREIGN KEY (job_template_phase_id) REFERENCES public.job_template_phase(id);


--
-- Name: product product_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: purchase_order purchase_order_procurement_request_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT purchase_order_procurement_request_id_fkey FOREIGN KEY (procurement_request_id) REFERENCES public.procurement_request(id);


--
-- Name: purchase_order purchase_order_supplier_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT purchase_order_supplier_contract_id_fkey FOREIGN KEY (supplier_contract_id) REFERENCES public.supplier_contract(id);


--
-- Name: rate_band rate_band_rate_table_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rate_band
    ADD CONSTRAINT rate_band_rate_table_id_fkey FOREIGN KEY (rate_table_id) REFERENCES public.rate_table(id);


--
-- Name: rate_table rate_table_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rate_table
    ADD CONSTRAINT rate_table_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: revenue revenue_billing_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue
    ADD CONSTRAINT revenue_billing_event_id_fkey FOREIGN KEY (billing_event_id) REFERENCES public.billing_event(id);


--
-- Name: revenue revenue_job_phase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue
    ADD CONSTRAINT revenue_job_phase_id_fkey FOREIGN KEY (job_phase_id) REFERENCES public.job_phase(id);


--
-- Name: supplier_contract supplier_contract_accrual_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract
    ADD CONSTRAINT supplier_contract_accrual_account_id_fkey FOREIGN KEY (accrual_account_id) REFERENCES public.account(id);


--
-- Name: supplier_contract supplier_contract_expenditure_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract
    ADD CONSTRAINT supplier_contract_expenditure_category_id_fkey FOREIGN KEY (expenditure_category_id) REFERENCES public.expenditure_category(id);


--
-- Name: supplier_contract supplier_contract_expense_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract
    ADD CONSTRAINT supplier_contract_expense_account_id_fkey FOREIGN KEY (expense_account_id) REFERENCES public.account(id);


--
-- Name: supplier_contract_line supplier_contract_line_expenditure_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_line
    ADD CONSTRAINT supplier_contract_line_expenditure_category_id_fkey FOREIGN KEY (expenditure_category_id) REFERENCES public.expenditure_category(id);


--
-- Name: supplier_contract_line supplier_contract_line_expense_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_line
    ADD CONSTRAINT supplier_contract_line_expense_account_id_fkey FOREIGN KEY (expense_account_id) REFERENCES public.account(id);


--
-- Name: supplier_contract_line supplier_contract_line_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_line
    ADD CONSTRAINT supplier_contract_line_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(id);


--
-- Name: supplier_contract_line supplier_contract_line_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_line
    ADD CONSTRAINT supplier_contract_line_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: supplier_contract_line supplier_contract_line_supplier_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_line
    ADD CONSTRAINT supplier_contract_line_supplier_contract_id_fkey FOREIGN KEY (supplier_contract_id) REFERENCES public.supplier_contract(id);


--
-- Name: supplier_contract supplier_contract_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract
    ADD CONSTRAINT supplier_contract_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(id);


--
-- Name: supplier_contract_price_schedule_line supplier_contract_price_sched_supplier_contract_price_sche_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_price_schedule_line
    ADD CONSTRAINT supplier_contract_price_sched_supplier_contract_price_sche_fkey FOREIGN KEY (supplier_contract_price_schedule_id) REFERENCES public.supplier_contract_price_schedule(id);


--
-- Name: supplier_contract_price_schedule_line supplier_contract_price_schedule_line_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_price_schedule_line
    ADD CONSTRAINT supplier_contract_price_schedule_line_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: supplier_contract_price_schedule supplier_contract_price_schedule_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_price_schedule
    ADD CONSTRAINT supplier_contract_price_schedule_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(id);


--
-- Name: supplier_contract_price_schedule supplier_contract_price_schedule_supplier_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_price_schedule
    ADD CONSTRAINT supplier_contract_price_schedule_supplier_contract_id_fkey FOREIGN KEY (supplier_contract_id) REFERENCES public.supplier_contract(id);


--
-- Name: supplier_contract_price_schedule_line supplier_contract_price_schedule_supplier_contract_line_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_price_schedule_line
    ADD CONSTRAINT supplier_contract_price_schedule_supplier_contract_line_id_fkey FOREIGN KEY (supplier_contract_line_id) REFERENCES public.supplier_contract_line(id);


--
-- Name: supplier_contract_price_schedule supplier_contract_price_schedule_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract_price_schedule
    ADD CONSTRAINT supplier_contract_price_schedule_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: supplier_contract supplier_contract_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract
    ADD CONSTRAINT supplier_contract_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: supplier_contract supplier_contract_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_contract
    ADD CONSTRAINT supplier_contract_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: supplier_dependent supplier_dependent_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_dependent
    ADD CONSTRAINT supplier_dependent_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: supplier_dependent supplier_dependent_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_dependent
    ADD CONSTRAINT supplier_dependent_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: supplier_lifecycle_event supplier_lifecycle_event_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_lifecycle_event
    ADD CONSTRAINT supplier_lifecycle_event_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: supplier_lifecycle_event supplier_lifecycle_event_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_lifecycle_event
    ADD CONSTRAINT supplier_lifecycle_event_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: supplier supplier_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT supplier_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- PostgreSQL database dump complete
--


