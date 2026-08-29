--
-- PostgreSQL database dump
--

\restrict 49f2a51a2bd7fa7c2c83fcc507482008322fa6b08886025f5245a91ff7a6b167

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
-- Name: ichizen_deploy; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA ichizen_deploy;


--
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- Name: reject_bundle_receipt_mutation(); Type: FUNCTION; Schema: ichizen_deploy; Owner: -
--

CREATE FUNCTION ichizen_deploy.reject_bundle_receipt_mutation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    RAISE EXCEPTION 'data bundle receipts are append-only';
END;
$$;


--
-- Name: ensure_criteria_group_anchor(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.ensure_criteria_group_anchor() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW."code" IS NOT NULL THEN
    INSERT INTO "criteria_group" ("id", "code", "scope", "workspace_key", "industry_key")
    VALUES (
      NEW."criteria_group_id",
      NEW."code",
      COALESCE(NEW."scope",''),
      COALESCE(NEW."workspace_id",''),
      COALESCE(NEW."industry_code",'')
    )
    ON CONFLICT ("id") DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;


--
-- Name: subscription_seat_amount_immutable_active(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.subscription_seat_amount_immutable_active() RETURNS trigger
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


--
-- Name: uuid_generate_v7(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.uuid_generate_v7() RETURNS uuid
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_bytes bytea;
BEGIN
    -- 16 random bytes with v4 version/variant bits from the core generator.
    v_bytes := uuid_send(gen_random_uuid());
    -- Overlay bytes 0-5 with the 48 low bits of unix epoch milliseconds.
    v_bytes := overlay(v_bytes
                       PLACING substring(int8send(floor(extract(epoch FROM clock_timestamp()) * 1000)::bigint) FROM 3 FOR 6)
                       FROM 1 FOR 6);
    -- Force the version nibble (high 4 bits of byte 6) to 0111 = 7,
    -- keeping the low nibble random. Variant bits in byte 8 are already 10.
    v_bytes := set_byte(v_bytes, 6, (get_byte(v_bytes, 6) & 15) | 112);
    RETURN encode(v_bytes, 'hex')::uuid;
END;
$$;


SET default_tablespace = '';

--
-- Name: audit_entry; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_entry (
    id uuid DEFAULT public.uuid_generate_v7() NOT NULL,
    workspace_id uuid,
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
    id uuid DEFAULT public.uuid_generate_v7() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid,
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
    id uuid DEFAULT public.uuid_generate_v7() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid,
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
    id uuid DEFAULT public.uuid_generate_v7() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid,
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
-- Name: audit_entry_2026_06; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_entry_2026_06 (
    id uuid DEFAULT public.uuid_generate_v7() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid,
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
-- Name: audit_entry_2026_07; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_entry_2026_07 (
    id uuid DEFAULT public.uuid_generate_v7() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid,
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
-- Name: audit_entry_2026_08; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_entry_2026_08 (
    id uuid DEFAULT public.uuid_generate_v7() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid,
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
-- Name: audit_entry_2026_09; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_entry_2026_09 (
    id uuid DEFAULT public.uuid_generate_v7() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid,
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
-- Name: audit_entry_2026_10; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_entry_2026_10 (
    id uuid DEFAULT public.uuid_generate_v7() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid,
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
-- Name: audit_entry_2026_11; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_entry_2026_11 (
    id uuid DEFAULT public.uuid_generate_v7() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid,
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
-- Name: audit_entry_2026_12; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_entry_2026_12 (
    id uuid DEFAULT public.uuid_generate_v7() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid,
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
-- Name: audit_entry_default; Type: TABLE; Schema: audit_trail; Owner: -
--

CREATE TABLE audit_trail.audit_entry_default (
    id uuid DEFAULT public.uuid_generate_v7() CONSTRAINT audit_entry_id_not_null NOT NULL,
    workspace_id uuid,
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
    id uuid DEFAULT public.uuid_generate_v7() NOT NULL,
    audit_entry_id uuid NOT NULL,
    field_name text NOT NULL,
    field_type smallint NOT NULL,
    old_value text,
    new_value text
);


--
-- Name: data_bundle_receipts; Type: TABLE; Schema: ichizen_deploy; Owner: -
--

CREATE TABLE ichizen_deploy.data_bundle_receipts (
    target_key text NOT NULL,
    bundle_id text NOT NULL,
    bundle_version text NOT NULL,
    bundle_digest character(64) NOT NULL,
    schema_release text NOT NULL,
    business_type text NOT NULL,
    workspace_id text NOT NULL,
    applied_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_by text DEFAULT CURRENT_USER NOT NULL,
    CONSTRAINT data_bundle_receipts_digest_format CHECK ((bundle_digest ~ '^[0-9a-f]{64}$'::text)),
    CONSTRAINT data_bundle_receipts_release_format CHECK ((schema_release ~ '^postgres/[0-9]{4}\.[0-9]{2}\.[1-9][0-9]*$'::text))
);


--
-- Name: _atlas_review_depreciation_period_collisions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._atlas_review_depreciation_period_collisions (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    asset_id text NOT NULL,
    transaction_id text CONSTRAINT _atlas_review_depreciation_period_colli_transaction_id_not_null NOT NULL,
    transaction_date bigint,
    conflict_reason text CONSTRAINT _atlas_review_depreciation_period_coll_conflict_reason_not_null NOT NULL,
    created_at timestamp with time zone DEFAULT now() CONSTRAINT _atlas_review_depreciation_period_collision_created_at_not_null NOT NULL
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
    date_modified timestamp with time zone DEFAULT now(),
    workspace_id text NOT NULL
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
    active boolean DEFAULT true NOT NULL,
    workspace_id text
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
    salvage_pct numeric(15,2),
    workspace_id text
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
    active boolean DEFAULT true NOT NULL,
    depreciation_run_id text,
    depreciation_period_start_date text,
    period_marker text GENERATED ALWAYS AS (
CASE
    WHEN ((transaction_type = 'ASSET_TRANSACTION_TYPE_DEPRECIATION'::text) AND (depreciation_period_start_date IS NOT NULL)) THEN ((asset_id || '|'::text) || depreciation_period_start_date)
    ELSE NULL::text
END) STORED,
    asset_revaluation_id text,
    workspace_id text
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
    workspace_id text NOT NULL,
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
    active boolean DEFAULT true NOT NULL,
    min_value numeric,
    max_value numeric,
    min_length integer,
    max_length integer,
    required boolean,
    CONSTRAINT ck_attribute_length_order CHECK (((min_length IS NULL) OR (max_length IS NULL) OR (min_length <= max_length))),
    CONSTRAINT ck_attribute_max_length_nonneg CHECK (((max_length IS NULL) OR (max_length >= 0))),
    CONSTRAINT ck_attribute_min_length_nonneg CHECK (((min_length IS NULL) OR (min_length >= 0))),
    CONSTRAINT ck_attribute_value_order CHECK (((min_value IS NULL) OR (max_value IS NULL) OR (min_value <= max_value)))
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
    date_modified timestamp with time zone DEFAULT now(),
    label text
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
    display_order integer,
    workspace_id text
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
    workspace_id text,
    country text,
    website text,
    tax_id text,
    registration_number text,
    credit_limit bigint,
    lead_time_days integer,
    tin text,
    country_code text
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
-- Name: client_portal_grant; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_portal_grant (
    id text NOT NULL,
    workspace_id text,
    user_id text,
    client_id text,
    role_id text,
    granted_by_user_id text,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL
);


--
-- Name: client_workspace_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_workspace_user (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL,
    client_id text NOT NULL,
    workspace_user_id text NOT NULL,
    is_owner boolean DEFAULT false NOT NULL,
    CONSTRAINT client_workspace_user_idor_anchors_nonempty_chk CHECK (((workspace_id <> ''::text) AND (client_id <> ''::text)))
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
-- Name: collection_billing_event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.collection_billing_event (
    id text CONSTRAINT treasury_collection_billing_event_id_not_null NOT NULL,
    workspace_id text CONSTRAINT treasury_collection_billing_event_workspace_id_not_null NOT NULL,
    treasury_collection_id text CONSTRAINT treasury_collection_billing_eve_treasury_collection_id_not_null NOT NULL,
    billing_event_id text CONSTRAINT treasury_collection_billing_event_billing_event_id_not_null NOT NULL,
    tranche_amount bigint,
    revenue_id text,
    active boolean DEFAULT true,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: collection_method; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.collection_method (
    id text NOT NULL,
    name text,
    provider_name text,
    active boolean DEFAULT true,
    date_created bigint,
    date_modified bigint
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
-- Name: conversation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.conversation (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL,
    client_id text NOT NULL,
    subject text NOT NULL,
    status text NOT NULL,
    assigned_to_user_id text,
    reference_entity_type text,
    reference_entity_id text,
    created_by_user_id text NOT NULL,
    last_post_at bigint,
    sla_due_at bigint,
    CONSTRAINT conversation_idor_anchors_nonempty_chk CHECK (((client_id <> ''::text) AND (workspace_id <> ''::text))),
    CONSTRAINT conversation_reference_entity_type_chk CHECK (((reference_entity_type IS NULL) OR (reference_entity_type = ANY (ARRAY['request'::text, 'invoice'::text])))),
    CONSTRAINT conversation_status_chk CHECK ((status = ANY (ARRAY['open'::text, 'in_progress'::text, 'resolved'::text, 'closed'::text])))
);


--
-- Name: conversation_participant; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.conversation_participant (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    conversation_id text NOT NULL,
    workspace_id text NOT NULL,
    user_id text,
    participant_principal_type text,
    participant_principal_id text,
    participant_type text NOT NULL,
    team_label text,
    CONSTRAINT conversation_participant_exclusive_arc_chk CHECK ((((participant_type = 'named_staff'::text) AND (user_id IS NOT NULL) AND (team_label IS NULL)) OR ((participant_type = 'team_inbox'::text) AND (team_label IS NOT NULL)))),
    CONSTRAINT conversation_participant_type_chk CHECK ((participant_type = ANY (ARRAY['named_staff'::text, 'team_inbox'::text]))),
    CONSTRAINT conversation_participant_workspace_nonempty_chk CHECK ((workspace_id <> ''::text))
);


--
-- Name: conversation_post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.conversation_post (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    conversation_id text NOT NULL,
    workspace_id text NOT NULL,
    client_id text NOT NULL,
    sender_principal_type text NOT NULL,
    sender_principal_id text NOT NULL,
    sender_user_id text NOT NULL,
    body text NOT NULL,
    source_type text NOT NULL,
    client_token text,
    sent_at bigint,
    CONSTRAINT conversation_post_idor_anchors_nonempty_chk CHECK (((client_id <> ''::text) AND (workspace_id <> ''::text))),
    CONSTRAINT conversation_post_sender_principal_type_chk CHECK ((sender_principal_type = ANY (ARRAY['client'::text, 'staff'::text]))),
    CONSTRAINT conversation_post_source_type_chk CHECK ((source_type = ANY (ARRAY['portal'::text, 'email'::text])))
);


--
-- Name: conversation_read_receipt; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.conversation_read_receipt (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    conversation_id text NOT NULL,
    reader_principal_type text NOT NULL,
    reader_principal_id text NOT NULL,
    user_id text NOT NULL,
    workspace_id text NOT NULL,
    last_read_post_id text,
    last_read_at bigint,
    CONSTRAINT conversation_read_receipt_workspace_nonempty_chk CHECK ((workspace_id <> ''::text))
);


--
-- Name: cost_plan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cost_plan (
    id text NOT NULL,
    supplier_plan_id text NOT NULL,
    name text,
    description text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    billing_amount bigint DEFAULT 0 NOT NULL,
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


--
-- Name: cost_schedule; Type: TABLE; Schema: public; Owner: -
--

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


--
-- Name: criteria_group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.criteria_group (
    id text NOT NULL,
    code text NOT NULL,
    scope text NOT NULL,
    workspace_key text NOT NULL,
    industry_key text NOT NULL,
    CONSTRAINT criteria_group_code_path_chk CHECK (((code = lower(btrim(code))) AND (code ~ '^[a-z][a-z0-9_]*$'::text))),
    CONSTRAINT criteria_group_id_not_blank CHECK ((btrim(id) <> ''::text))
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
    date_modified timestamp with time zone DEFAULT now(),
    workspace_id text
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
    date_modified timestamp with time zone DEFAULT now(),
    workspace_id text
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
    active boolean DEFAULT true NOT NULL,
    role_id text,
    granted_by_user_id text,
    workspace_id text
);


--
-- Name: delegate_supplier; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delegate_supplier (
    id text NOT NULL,
    delegate_id text,
    supplier_id text,
    role_id text,
    granted_by_user_id text,
    workspace_id text,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL
);


--
-- Name: depreciation_run; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.depreciation_run (
    id text NOT NULL,
    workspace_id text NOT NULL,
    scope_kind text DEFAULT 'DEPRECIATION_RUN_SCOPE_KIND_UNSPECIFIED'::text NOT NULL,
    scope_id text,
    as_of_date date NOT NULL,
    initiator_id text NOT NULL,
    initiated_at timestamp with time zone DEFAULT now() NOT NULL,
    completed_at timestamp with time zone,
    status text DEFAULT 'DEPRECIATION_RUN_STATUS_PENDING'::text NOT NULL,
    created_count integer DEFAULT 0 NOT NULL,
    skipped_count integer DEFAULT 0 NOT NULL,
    errored_count integer DEFAULT 0 NOT NULL,
    error_summary text,
    notes text,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
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
    active boolean DEFAULT true NOT NULL,
    depreciation_run_id text,
    outcome text,
    error_message text,
    workspace_id text
);


--
-- Name: disbursement_method; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.disbursement_method (
    id text NOT NULL,
    name text,
    provider_name text,
    active boolean DEFAULT true,
    date_created bigint,
    date_modified bigint
);


--
-- Name: disbursement_supplier_billing_event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.disbursement_supplier_billing_event (
    id text CONSTRAINT treasury_disbursement_supplier_billing_event_id_not_null NOT NULL,
    workspace_id text CONSTRAINT treasury_disbursement_supplier_billing_ev_workspace_id_not_null NOT NULL,
    treasury_disbursement_id text CONSTRAINT treasury_disbursement_supplie_treasury_disbursement_id_not_null NOT NULL,
    supplier_billing_event_id text CONSTRAINT treasury_disbursement_suppli_supplier_billing_event_id_not_null NOT NULL,
    tranche_amount bigint,
    expense_recognition_id text,
    active boolean DEFAULT true,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: document_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.document_template (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    name text,
    description text,
    workspace_id text NOT NULL,
    template_type text,
    document_purpose text,
    storage_container text,
    storage_key text,
    original_filename text,
    file_size_bytes bigint,
    is_default boolean DEFAULT false,
    created_by text,
    status text DEFAULT 'active'::text NOT NULL,
    module_key text
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
    date_modified timestamp with time zone DEFAULT now(),
    workspace_user_id text,
    patronage_basis text
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
-- Name: evaluation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.evaluation (
    id text NOT NULL,
    workspace_id text NOT NULL,
    client_id text NOT NULL,
    subscription_id text,
    subscription_seat_id text,
    evaluation_template_id text,
    evaluation_type text NOT NULL,
    relationship_type text NOT NULL,
    evaluator_type text NOT NULL,
    evaluator_workspace_user_id text,
    evaluator_client_portal_grant_id text,
    subject_type text NOT NULL,
    subject_staff_id text,
    subject_client_id text,
    period_start text NOT NULL,
    period_end text NOT NULL,
    status text NOT NULL,
    visibility_type text NOT NULL,
    overall_score double precision,
    narrative text,
    submitted_at bigint,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    evaluation_cycle_id text,
    signed_off_by_workspace_user_id text,
    signed_off_by_client_portal_grant_id text,
    signed_off_at bigint,
    CONSTRAINT evaluation_active_status_coupling_chk CHECK ((active = (status <> 'archived'::text))),
    CONSTRAINT evaluation_anti_phantom_anchor_chk CHECK (((relationship_type <> 'client_to_associate'::text) OR (subscription_seat_id IS NOT NULL))),
    CONSTRAINT evaluation_evaluation_type_chk CHECK ((evaluation_type = ANY (ARRAY['performance_review'::text, 'csat'::text, 'course_eval'::text, 'vendor_scorecard'::text]))),
    CONSTRAINT evaluation_evaluator_arc_chk CHECK ((num_nonnulls(evaluator_workspace_user_id, evaluator_client_portal_grant_id) = 1)),
    CONSTRAINT evaluation_evaluator_drift_chk CHECK (((evaluator_type = 'client'::text) = (evaluator_client_portal_grant_id IS NOT NULL))),
    CONSTRAINT evaluation_evaluator_type_chk CHECK ((evaluator_type = ANY (ARRAY['client'::text, 'staff'::text]))),
    CONSTRAINT evaluation_idor_anchors_nonempty_chk CHECK (((client_id <> ''::text) AND (workspace_id <> ''::text))),
    CONSTRAINT evaluation_relationship_type_chk CHECK ((relationship_type = ANY (ARRAY['client_to_associate'::text, 'staff_to_client'::text, 'self'::text, 'peer'::text, 'manager'::text]))),
    CONSTRAINT evaluation_signed_off_absent_chk CHECK (((status = 'signed_off'::text) OR ((signed_off_at IS NULL) AND (signed_off_by_workspace_user_id IS NULL) AND (signed_off_by_client_portal_grant_id IS NULL)))),
    CONSTRAINT evaluation_signed_off_present_chk CHECK (((status <> 'signed_off'::text) OR ((signed_off_at IS NOT NULL) AND (num_nonnulls(signed_off_by_workspace_user_id, signed_off_by_client_portal_grant_id) = 1)))),
    CONSTRAINT evaluation_status_chk CHECK ((status = ANY (ARRAY['draft'::text, 'submitted'::text, 'archived'::text, 'signed_off'::text]))),
    CONSTRAINT evaluation_subject_arc_chk CHECK ((num_nonnulls(subject_staff_id, subject_client_id) = 1)),
    CONSTRAINT evaluation_subject_drift_chk CHECK (((subject_type = 'associate'::text) = (subject_staff_id IS NOT NULL))),
    CONSTRAINT evaluation_subject_type_chk CHECK ((subject_type = ANY (ARRAY['associate'::text, 'client'::text]))),
    CONSTRAINT evaluation_template_required_for_review_chk CHECK (((evaluation_type <> 'performance_review'::text) OR (evaluation_template_id IS NOT NULL))),
    CONSTRAINT evaluation_visibility_type_chk CHECK ((visibility_type = ANY (ARRAY['internal_only'::text, 'visible_to_subject'::text, 'visible_to_subject_anon'::text])))
);


--
-- Name: evaluation_cycle; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.evaluation_cycle (
    id text NOT NULL,
    workspace_id text NOT NULL,
    subscription_id text NOT NULL,
    name text NOT NULL,
    period_start text NOT NULL,
    period_end text NOT NULL,
    sign_off_due_date text,
    close_date text,
    status text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    CONSTRAINT evaluation_cycle_active_status_coupling_chk CHECK ((active = (status <> 'closed'::text))),
    CONSTRAINT evaluation_cycle_anchors_nonempty_chk CHECK (((workspace_id <> ''::text) AND (subscription_id <> ''::text))),
    CONSTRAINT evaluation_cycle_status_chk CHECK ((status = ANY (ARRAY['open'::text, 'sign_off'::text, 'closed'::text])))
);


--
-- Name: evaluation_cycle_member; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.evaluation_cycle_member (
    id text NOT NULL,
    workspace_id text NOT NULL,
    evaluation_cycle_id text NOT NULL,
    client_id text NOT NULL,
    subject_staff_id text NOT NULL,
    is_probation boolean DEFAULT false NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_added bigint,
    CONSTRAINT evaluation_cycle_member_anchors_nonempty_chk CHECK (((workspace_id <> ''::text) AND (client_id <> ''::text) AND (subject_staff_id <> ''::text)))
);


--
-- Name: evaluation_response; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.evaluation_response (
    id text NOT NULL,
    evaluation_id text NOT NULL,
    workspace_id text NOT NULL,
    outcome_criteria_id text NOT NULL,
    criteria_version_id text,
    criteria_label text NOT NULL,
    criteria_weight double precision,
    criteria_type text NOT NULL,
    numeric_value double precision,
    text_value text,
    categorical_value text,
    pass_fail_value boolean,
    comment text,
    sequence_order integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    CONSTRAINT evaluation_response_answer_oneof_chk CHECK ((((criteria_type = ANY (ARRAY['numeric_range'::text, 'numeric_score'::text])) AND (numeric_value IS NOT NULL) AND (text_value IS NULL) AND (categorical_value IS NULL) AND (pass_fail_value IS NULL)) OR ((criteria_type = 'pass_fail'::text) AND (pass_fail_value IS NOT NULL) AND (numeric_value IS NULL) AND (text_value IS NULL) AND (categorical_value IS NULL)) OR ((criteria_type = 'categorical'::text) AND (categorical_value IS NOT NULL) AND (numeric_value IS NULL) AND (text_value IS NULL) AND (pass_fail_value IS NULL)) OR ((criteria_type = ANY (ARRAY['text'::text, 'multi_check'::text])) AND (text_value IS NOT NULL) AND (numeric_value IS NULL) AND (categorical_value IS NULL) AND (pass_fail_value IS NULL)))),
    CONSTRAINT evaluation_response_criteria_type_chk CHECK ((criteria_type = ANY (ARRAY['numeric_range'::text, 'numeric_score'::text, 'pass_fail'::text, 'categorical'::text, 'text'::text, 'multi_check'::text]))),
    CONSTRAINT evaluation_response_workspace_nonempty_chk CHECK ((workspace_id <> ''::text))
);


--
-- Name: evaluation_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.evaluation_template (
    id text NOT NULL,
    workspace_id text NOT NULL,
    name text NOT NULL,
    description text,
    evaluation_type text NOT NULL,
    relationship_type text NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    status text NOT NULL,
    visibility_type text NOT NULL,
    copied_from_id text,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    CONSTRAINT evaluation_template_active_status_coupling_chk CHECK ((active = (status <> 'deprecated'::text))),
    CONSTRAINT evaluation_template_evaluation_type_chk CHECK ((evaluation_type = ANY (ARRAY['performance_review'::text, 'csat'::text, 'course_eval'::text, 'vendor_scorecard'::text]))),
    CONSTRAINT evaluation_template_relationship_type_chk CHECK ((relationship_type = ANY (ARRAY['client_to_associate'::text, 'staff_to_client'::text, 'self'::text, 'peer'::text, 'manager'::text]))),
    CONSTRAINT evaluation_template_status_chk CHECK ((status = ANY (ARRAY['draft'::text, 'active'::text, 'deprecated'::text]))),
    CONSTRAINT evaluation_template_visibility_type_chk CHECK ((visibility_type = ANY (ARRAY['internal_only'::text, 'visible_to_subject'::text, 'visible_to_subject_anon'::text]))),
    CONSTRAINT evaluation_template_workspace_nonempty_chk CHECK ((workspace_id <> ''::text))
);


--
-- Name: evaluation_template_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.evaluation_template_item (
    id text NOT NULL,
    evaluation_template_id text NOT NULL,
    workspace_id text NOT NULL,
    outcome_criteria_id text NOT NULL,
    sequence_order integer DEFAULT 0 NOT NULL,
    question_label text,
    question_prompt text,
    required_override boolean,
    weight_override double precision,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    CONSTRAINT evaluation_template_item_workspace_nonempty_chk CHECK ((workspace_id <> ''::text))
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
    original_occurrence_utc bigint,
    kind text
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
    active boolean DEFAULT true NOT NULL,
    vote_choice text,
    vote_weight integer,
    vote_cast_at bigint,
    eligible_to_vote boolean
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
    by_month_day text,
    rrule_string text,
    exdate_string text
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
    source text,
    supplier_subscription_id text,
    cost_plan_id text,
    disbursement_profile_id_snapshot text,
    run_id text,
    workspace_id text NOT NULL,
    fund_transaction_id text
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
    description text,
    parent_category_id text,
    billing_mode text,
    markup_pct double precision,
    default_rate bigint,
    billable_by_default boolean
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
    location_id text,
    supplier_product_cost_plan_id text,
    total_price bigint,
    line_item_type text
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
    metadata jsonb,
    supplier_subscription_id text,
    advance_disbursement_id text,
    run_id text
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
    job_activity_id text,
    supplier_product_cost_plan_id text,
    supplier_subscription_id text
);


--
-- Name: expense_recognition_run; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.expense_recognition_run (
    id text NOT NULL,
    workspace_id text NOT NULL,
    supplier_id text,
    supplier_subscription_id text,
    scope integer DEFAULT 0 NOT NULL,
    as_of_date text NOT NULL,
    selection_count integer DEFAULT 0 NOT NULL,
    created_count integer DEFAULT 0 NOT NULL,
    skipped_count integer DEFAULT 0 NOT NULL,
    errored_count integer DEFAULT 0 NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    initiated_by text NOT NULL,
    initiated_at bigint,
    completed_at bigint,
    notes text,
    active boolean DEFAULT true,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
);


--
-- Name: expense_recognition_run_attempt; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.expense_recognition_run_attempt (
    id text NOT NULL,
    run_id text NOT NULL,
    source_kind integer DEFAULT 0 NOT NULL,
    supplier_subscription_id text,
    advance_disbursement_id text,
    period_start text NOT NULL,
    period_end text NOT NULL,
    period_marker text NOT NULL,
    outcome integer DEFAULT 0 NOT NULL,
    expense_recognition_id text,
    expenditure_id text,
    error_code text,
    error_message text,
    attempted_at bigint,
    active boolean DEFAULT true,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
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
-- Name: forex_rate; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forex_rate (
    id text NOT NULL,
    workspace_id text NOT NULL,
    from_currency text NOT NULL,
    to_currency text NOT NULL,
    rate_micro_units bigint NOT NULL,
    source integer DEFAULT 0 NOT NULL,
    source_reference_date text,
    created_by_user_id text,
    status integer DEFAULT 0 NOT NULL,
    effective_from text NOT NULL,
    effective_to text,
    supersedes_id text,
    notes text,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint
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
    delivered_at text,
    metadata jsonb
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
    active boolean DEFAULT true NOT NULL,
    metadata jsonb,
    completed_at timestamp with time zone
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
    reason text,
    occurred_at timestamp with time zone
);


--
-- Name: fund; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fund (
    id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    name text NOT NULL,
    description text,
    kind integer DEFAULT 0 NOT NULL,
    owner_party_type integer DEFAULT 0 NOT NULL,
    owner_party_id text NOT NULL,
    currency text NOT NULL,
    authorized_limit bigint DEFAULT 0 NOT NULL,
    gl_account_id text,
    shared boolean DEFAULT false NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    external_ref text,
    linked_by_user_id text,
    institution_name text,
    last_four text,
    bank_account_number text,
    bank_swift text,
    bank_iban text,
    bank_branch text,
    petty_custodian_user_id text,
    petty_float_ceiling bigint,
    petty_source_fund_id text,
    credit_agreement_reference text,
    statement_close_day integer,
    card_brand text,
    card_expiry_month integer,
    card_expiry_year integer,
    mobile_provider_name text,
    mobile_masked_phone text
);


--
-- Name: fund_allocation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fund_allocation (
    id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    fund_id text NOT NULL,
    workspace_id text NOT NULL,
    mode integer DEFAULT 0 NOT NULL,
    allocated_limit bigint DEFAULT 0 NOT NULL,
    payable_account_id text,
    default_cash_account_id text,
    status integer DEFAULT 0 NOT NULL,
    approved_by_user_id text
);


--
-- Name: fund_transaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fund_transaction (
    id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    fund_id text NOT NULL,
    allocation_id text,
    workspace_id text,
    kind integer DEFAULT 0 NOT NULL,
    amount bigint DEFAULT 0 NOT NULL,
    effective_at bigint,
    posted_at bigint,
    status integer DEFAULT 0 NOT NULL,
    reverses_id text,
    idempotency_key text NOT NULL,
    exchange_rate_snapshot double precision,
    amount_functional_currency bigint,
    functional_currency text,
    expenditure_id text,
    disbursement_id text,
    collection_id text,
    transfer_id text,
    journal_entry_id text,
    description text,
    reference_number text,
    created_by_user_id text
);


--
-- Name: fund_transaction_posted; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.fund_transaction_posted AS
 SELECT id,
    date_created,
    date_created_string,
    date_modified,
    date_modified_string,
    active,
    fund_id,
    allocation_id,
    workspace_id,
    kind,
    amount,
    effective_at,
    posted_at,
    status,
    reverses_id,
    idempotency_key,
    exchange_rate_snapshot,
    amount_functional_currency,
    functional_currency,
    expenditure_id,
    disbursement_id,
    collection_id,
    transfer_id,
    journal_entry_id,
    description,
    reference_number,
    created_by_user_id
   FROM public.fund_transaction
  WHERE (status = 2);


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
    active boolean DEFAULT true NOT NULL,
    config_data jsonb
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
    value text,
    workspace_id text
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
    date_modified timestamp with time zone DEFAULT now(),
    workspace_id text
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
    product_variant_id text,
    workspace_id text
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
    date_modified timestamp with time zone DEFAULT now(),
    workspace_id text
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
    changed_by_role text,
    workspace_id text
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
    usage_ordinal integer,
    actual_end bigint,
    actual_start bigint,
    change_request_id text,
    cost_account_id text,
    currency text,
    due_date bigint,
    job_template_revision_id text,
    job_template_revision_snapshot integer,
    output_product_id text,
    output_product_variant_id text,
    output_uom text,
    planned_end bigint,
    planned_quantity double precision,
    planned_start bigint,
    priority integer,
    release_date bigint,
    resource_id text,
    sales_order_line_id text,
    workflow_instance_id text,
    is_synthesized boolean DEFAULT false NOT NULL,
    job_category_id text
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
-- Name: job_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_category (
    id text NOT NULL,
    name text NOT NULL,
    date_created bigint,
    date_modified bigint,
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL,
    code text,
    sort_order integer,
    status text
);


--
-- Name: job_outcome_line; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_outcome_line (
    id text NOT NULL,
    job_outcome_summary_id text NOT NULL,
    label text NOT NULL,
    weight_or_credits double precision,
    output_value double precision,
    output_label text,
    score_scale_band_id text,
    reporting_role text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint,
    workspace_id text NOT NULL,
    client_id text
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
    date_modified timestamp with time zone DEFAULT now(),
    scoring_scheme_id text,
    scaled_score double precision,
    scaled_label text,
    workspace_id text,
    client_id text,
    source text,
    is_authoritative boolean DEFAULT false NOT NULL
);


--
-- Name: job_outcome_summary_document_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_outcome_summary_document_template (
    id text NOT NULL,
    workspace_id text NOT NULL,
    document_template_id text CONSTRAINT job_outcome_summary_document_temp_document_template_id_not_null NOT NULL,
    price_schedule_id text,
    version integer DEFAULT 1 NOT NULL,
    version_status text DEFAULT 'VERSION_STATUS_DRAFT'::text NOT NULL,
    validity_start timestamp with time zone,
    validity_end timestamp with time zone,
    supersedes_binding_id text,
    active boolean DEFAULT true NOT NULL,
    created_by text,
    published_at bigint,
    published_by text,
    date_created bigint,
    date_modified bigint,
    CONSTRAINT ck_jos_doc_tmpl_validity CHECK (((validity_start IS NULL) OR (validity_end IS NULL) OR (validity_start < validity_end)))
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
    status text,
    actual_end bigint,
    actual_start bigint,
    planned_end bigint,
    planned_start bigint,
    predecessor_phase_id text,
    resource_id text,
    run_minutes_per_unit double precision,
    setup_minutes integer,
    template_phase_id text,
    scoring_scheme_id text,
    is_synthesized boolean DEFAULT false NOT NULL,
    approval_status text DEFAULT 'PHASE_APPROVAL_STATUS_IN_PROGRESS'::text NOT NULL,
    submitted_by text,
    submitted_at bigint,
    verified_by text,
    verified_at bigint,
    published_by text,
    published_at bigint,
    return_reason text,
    returned_by text,
    returned_at bigint,
    workspace_id text,
    CONSTRAINT job_phase_approval_status_check CHECK ((approval_status = ANY (ARRAY['PHASE_APPROVAL_STATUS_IN_PROGRESS'::text, 'PHASE_APPROVAL_STATUS_FOR_REVIEW'::text, 'PHASE_APPROVAL_STATUS_VERIFIED'::text, 'PHASE_APPROVAL_STATUS_PUBLISHED'::text]))),
    CONSTRAINT job_phase_published_pair_check CHECK (((published_by IS NULL) = (published_at IS NULL))),
    CONSTRAINT job_phase_returned_pair_check CHECK (((returned_by IS NULL) = (returned_at IS NULL))),
    CONSTRAINT job_phase_submitted_pair_check CHECK (((submitted_by IS NULL) = (submitted_at IS NULL))),
    CONSTRAINT job_phase_verified_pair_check CHECK (((verified_by IS NULL) = (verified_at IS NULL)))
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
    assigned_to text,
    actual_end bigint,
    actual_start bigint,
    allow_parallel boolean DEFAULT false,
    completed_quantity double precision,
    percent_complete double precision,
    planned_quantity double precision,
    resource_id text,
    template_task_id text,
    workflow_step_id text,
    is_synthesized boolean DEFAULT false NOT NULL,
    workspace_id text
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
    workspace_id text,
    change_request_id text,
    default_lot_size integer,
    default_uom text,
    effective_from bigint,
    effective_to bigint,
    is_default boolean DEFAULT false,
    output_product_id text,
    output_product_variant_id text,
    published_at bigint,
    published_by text,
    revision integer,
    supersedes_template_id text,
    template_code text,
    version_status text,
    workflow_template_id text,
    job_category_id text,
    initial_status text
);


--
-- Name: job_template_document_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_template_document_template (
    id text NOT NULL,
    workspace_id text NOT NULL,
    document_template_id text NOT NULL,
    price_schedule_id text,
    job_category_id text,
    version integer DEFAULT 0 NOT NULL,
    version_status text DEFAULT 'VERSION_STATUS_DRAFT'::text NOT NULL,
    validity_start timestamp with time zone,
    validity_end timestamp with time zone,
    supersedes_binding_id text,
    active boolean DEFAULT true NOT NULL,
    created_by text,
    published_at bigint,
    published_by text,
    date_created bigint,
    date_modified bigint,
    CONSTRAINT ck_jt_doc_tmpl_validity CHECK (((validity_start IS NULL) OR (validity_end IS NULL) OR (validity_start < validity_end)))
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
    billing_currency text,
    predecessor_template_phase_id text,
    resource_id text,
    run_minutes_per_unit double precision,
    setup_minutes integer,
    teardown_minutes integer,
    scoring_scheme_id text,
    code text,
    workspace_id text,
    CONSTRAINT job_template_phase_code_path_chk CHECK (((code IS NULL) OR ((code = lower(btrim(code))) AND (code ~ '^[a-z][a-z0-9_]*$'::text))))
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
    relation_type integer DEFAULT 0 NOT NULL,
    workspace_id text
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
    estimated_duration_minutes integer,
    instruction_doc_id text,
    quantity_factor double precision,
    resource_id text,
    run_minutes_per_unit double precision,
    setup_minutes integer,
    skill_required text,
    standard_labor_minutes integer,
    standard_machine_minutes integer,
    teardown_minutes integer,
    tool_required text,
    workflow_step_id text,
    code text,
    workspace_id text,
    CONSTRAINT job_template_task_code_path_chk CHECK (((code IS NULL) OR ((code = lower(btrim(code))) AND (code ~ '^[a-z][a-z0-9_]*$'::text))))
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
    date_modified timestamp with time zone DEFAULT now(),
    workspace_id text NOT NULL
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
    active boolean DEFAULT true NOT NULL,
    workspace_id text
);


--
-- Name: line_workspace_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.line_workspace_user (
    id text NOT NULL,
    date_created bigint,
    date_modified bigint,
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL,
    line_id text NOT NULL,
    workspace_user_id text NOT NULL,
    is_owner boolean DEFAULT false NOT NULL,
    capacity text DEFAULT 'access'::text NOT NULL,
    CONSTRAINT line_workspace_user_capacity_domain_check CHECK ((capacity = ANY (ARRAY['primary'::text, 'access'::text]))),
    CONSTRAINT line_workspace_user_capacity_owner_check CHECK ((NOT ((capacity = 'access'::text) AND is_owner)))
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
    date_modified timestamp with time zone DEFAULT now(),
    min_text_length integer,
    code text,
    CONSTRAINT outcome_criteria_code_path_chk CHECK (((code IS NULL) OR ((code = lower(btrim(code))) AND (code ~ '^[a-z][a-z0-9_]*$'::text))))
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
    is_default boolean DEFAULT false NOT NULL,
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
    description text DEFAULT ''::text NOT NULL,
    applicable_principal_types integer[]
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
    date_modified timestamp with time zone DEFAULT now(),
    reporting_checkpoint_id text,
    scaled_score double precision,
    scaled_label text,
    workspace_id text
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
    parent_id text,
    execution_strategy text DEFAULT 'template_driven'::text
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
-- Name: plan_group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.plan_group (
    id text NOT NULL,
    name text NOT NULL,
    date_created bigint,
    date_modified bigint,
    active boolean DEFAULT true NOT NULL,
    workspace_id text,
    code text,
    parent_id text
);


--
-- Name: plan_group_plan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.plan_group_plan (
    id text NOT NULL,
    plan_group_id text NOT NULL,
    plan_id text NOT NULL,
    date_created bigint,
    date_modified bigint,
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL,
    sequence_order integer
);


--
-- Name: plan_job_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.plan_job_template (
    id text NOT NULL,
    date_created bigint,
    date_modified bigint,
    active boolean DEFAULT true NOT NULL,
    plan_id text NOT NULL,
    job_template_id text NOT NULL,
    sequence_order integer DEFAULT 0 NOT NULL,
    composition_entry_pattern integer DEFAULT 0 NOT NULL,
    workspace_id text NOT NULL,
    CONSTRAINT ck_plan_job_template_pattern CHECK ((composition_entry_pattern = ANY (ARRAY[0, 1, 2])))
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
    workspace_id text,
    client_id text,
    sort_order integer,
    closed boolean DEFAULT false NOT NULL
);


--
-- Name: price_schedule_workspace_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.price_schedule_workspace_user (
    id text NOT NULL,
    date_created bigint,
    date_modified bigint,
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL,
    price_schedule_id text NOT NULL,
    workspace_user_id text NOT NULL,
    is_owner boolean DEFAULT false NOT NULL,
    capacity text DEFAULT 'access'::text NOT NULL,
    CONSTRAINT price_schedule_workspace_user_capacity_domain_check CHECK ((capacity = ANY (ARRAY['primary'::text, 'access'::text]))),
    CONSTRAINT price_schedule_workspace_user_capacity_owner_check CHECK ((NOT ((capacity = 'access'::text) AND is_owner)))
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
    policy_decision_log text,
    spawned_supplier_subscription_id text
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
    workspace_id text,
    expected_cost bigint,
    expected_cost_currency text,
    tax_treatment_id text,
    withholding_class_id text
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
    date_modified timestamp with time zone DEFAULT now(),
    metadata jsonb
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
-- Name: product_plan_staff; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_plan_staff (
    id text NOT NULL,
    date_created bigint,
    date_modified bigint,
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL,
    product_plan_id text NOT NULL,
    staff_id text NOT NULL,
    role text NOT NULL
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
    job_template_phase_id text,
    tax_treatment_id text,
    withholding_class_id text,
    billing_amount_min bigint,
    billing_amount_max bigint
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
    procurement_request_id text,
    supplier_subscription_id text,
    billing_kind text
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
-- Name: reporting_checkpoint; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reporting_checkpoint (
    id text NOT NULL,
    checkpoint_group_id text NOT NULL,
    version integer NOT NULL,
    version_status text NOT NULL,
    workspace_id text,
    period_id text,
    sequence_order integer NOT NULL,
    role_code text NOT NULL,
    label text NOT NULL,
    is_terminal boolean DEFAULT false NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint
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
    workspace_id text,
    job_phase_id text,
    billing_event_id text,
    period_marker text GENERATED ALWAYS AS (
CASE
    WHEN (notes IS NULL) THEN NULL::text
    WHEN (notes ~ 'Period: '::text) THEN "substring"(notes, 'Period: [^\n]+'::text)
    ELSE NULL::text
END) STORED,
    run_id text,
    cash_amount_expected bigint,
    wht_amount_expected bigint,
    wht_amount_certified bigint,
    wht_amount_variance bigint,
    settlement_status text,
    tax_inclusive_pricing_snapshot boolean,
    billing_currency text,
    billing_amount bigint,
    forex_rate_micro_units bigint,
    forex_rate_source text,
    tax_computation_enabled_snapshot boolean,
    collection_profile_id_snapshot text,
    advance_collection_id text
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
    description text,
    parent_category_id text
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
    subscription_id text,
    tax_treatment_snapshot text,
    withholding_class_snapshot text,
    billing_amount bigint,
    subscription_seat_id text
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
    status text DEFAULT 'completed'::text,
    payment_method text,
    received_by text,
    received_role text,
    notes text,
    payment_date text,
    amount_centavos bigint
);


--
-- Name: revenue_run; Type: TABLE; Schema: public; Owner: -
--

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


--
-- Name: revenue_run_attempt; Type: TABLE; Schema: public; Owner: -
--

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
    date_modified timestamp with time zone DEFAULT now(),
    source_kind integer DEFAULT 0 NOT NULL,
    advance_collection_id text
);


--
-- Name: revenue_tax_line; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.revenue_tax_line (
    id text NOT NULL,
    workspace_id text NOT NULL,
    revenue_id text NOT NULL,
    tax_rate_id text,
    source_registration_id_snapshot text NOT NULL,
    authority_code_snapshot text NOT NULL,
    regulator_code_snapshot text,
    filing_form_code_snapshot text,
    tax_kind_snapshot text NOT NULL,
    direction integer DEFAULT 0 NOT NULL,
    taxable_base bigint NOT NULL,
    tax_amount bigint NOT NULL,
    rate_basis_points_snapshot integer NOT NULL,
    applied_to_line_item_ids text[],
    computed_at text,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint
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
    active boolean DEFAULT true NOT NULL,
    applicable_principal_types integer[]
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
-- Name: score_scale; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.score_scale (
    id text NOT NULL,
    scale_group_id text NOT NULL,
    version integer NOT NULL,
    version_status text NOT NULL,
    name text NOT NULL,
    scale_kind text NOT NULL,
    input_unit text NOT NULL,
    input_min double precision,
    input_max double precision,
    output_unit text NOT NULL,
    workspace_id text,
    active boolean DEFAULT true NOT NULL,
    created_by text NOT NULL,
    date_created bigint,
    date_modified bigint
);


--
-- Name: score_scale_band; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.score_scale_band (
    id text NOT NULL,
    workspace_id text,
    active boolean DEFAULT true NOT NULL,
    score_scale_id text NOT NULL,
    sequence_order integer NOT NULL,
    input_min double precision,
    input_max double precision,
    input_match text,
    output_value double precision,
    output_label text NOT NULL,
    band_role text,
    determination text,
    date_created bigint,
    date_modified bigint
);


--
-- Name: scoring_component; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scoring_component (
    id text NOT NULL,
    scoring_scheme_id text NOT NULL,
    code text NOT NULL,
    label text NOT NULL,
    weight double precision DEFAULT 1.0 NOT NULL,
    sequence_order integer NOT NULL,
    parent_component_id text,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint,
    workspace_id text
);


--
-- Name: scoring_component_criteria; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scoring_component_criteria (
    id text NOT NULL,
    scoring_scheme_id text NOT NULL,
    scoring_component_id text NOT NULL,
    outcome_criteria_id text NOT NULL,
    date_created bigint,
    date_modified bigint,
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL
);


--
-- Name: scoring_scheme; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scoring_scheme (
    id text NOT NULL,
    workspace_id text,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint,
    scheme_group_id text NOT NULL,
    version integer NOT NULL,
    version_status text NOT NULL,
    name text NOT NULL,
    composite_method text NOT NULL,
    score_scale_id text,
    weights_must_sum_to_one boolean DEFAULT false NOT NULL,
    rounding_mode text
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
    date_modified bigint,
    principal_type integer,
    principal_id text,
    acting_as_client_id text,
    acting_as_supplier_id text,
    acting_as_workspace_id text
);


--
-- Name: staff; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.staff (
    id text NOT NULL,
    user_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    workspace_id text,
    status text,
    employment_type text,
    seniority text,
    employment_start text,
    employment_end text
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
    entitled_occurrences_override integer,
    workspace_id text,
    collection_profile_id_snapshot text,
    collection_method_id_snapshot text
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
-- Name: subscription_group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscription_group (
    id text NOT NULL,
    date_created bigint,
    date_modified bigint,
    active boolean DEFAULT true NOT NULL,
    name text NOT NULL,
    kind text NOT NULL,
    price_schedule_id text,
    workspace_id text,
    plan_id text,
    capacity_mode text NOT NULL,
    max_capacity integer,
    status text
);


--
-- Name: subscription_group_document_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscription_group_document_template (
    id text NOT NULL,
    workspace_id text NOT NULL,
    document_template_id text CONSTRAINT subscription_group_document_templ_document_template_id_not_null NOT NULL,
    render_profile text NOT NULL,
    price_schedule_id text,
    plan_id text,
    job_category_id text,
    version integer DEFAULT 0 NOT NULL,
    version_status text DEFAULT 'VERSION_STATUS_DRAFT'::text NOT NULL,
    validity_start timestamp with time zone,
    validity_end timestamp with time zone,
    supersedes_binding_id text,
    active boolean DEFAULT true NOT NULL,
    created_by text,
    published_at bigint,
    published_by text,
    date_created bigint,
    date_modified bigint,
    CONSTRAINT ck_sgdt_optional_ids CHECK ((((price_schedule_id IS NULL) OR (btrim(price_schedule_id) <> ''::text)) AND ((plan_id IS NULL) OR (btrim(plan_id) <> ''::text)) AND ((job_category_id IS NULL) OR (btrim(job_category_id) <> ''::text)) AND ((supersedes_binding_id IS NULL) OR (btrim(supersedes_binding_id) <> ''::text)))),
    CONSTRAINT ck_sgdt_profile CHECK (((btrim(render_profile) <> ''::text) AND (render_profile <> 'RENDER_PROFILE_UNSPECIFIED'::text))),
    CONSTRAINT ck_sgdt_required_ids CHECK (((btrim(id) <> ''::text) AND (btrim(workspace_id) <> ''::text) AND (btrim(document_template_id) <> ''::text))),
    CONSTRAINT ck_sgdt_validity CHECK (((validity_start IS NULL) OR (validity_end IS NULL) OR (validity_start < validity_end))),
    CONSTRAINT ck_sgdt_version CHECK ((version >= 0))
);


--
-- Name: subscription_group_member; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscription_group_member (
    id text NOT NULL,
    subscription_group_id text NOT NULL,
    subscription_id text NOT NULL,
    client_id text NOT NULL,
    date_created bigint,
    date_modified bigint,
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL
);


--
-- Name: subscription_group_product_plan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscription_group_product_plan (
    id text NOT NULL,
    date_created bigint,
    date_modified bigint,
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL,
    subscription_group_id text NOT NULL,
    product_plan_id text NOT NULL,
    job_template_id text NOT NULL,
    status text NOT NULL
);


--
-- Name: subscription_group_product_plan_staff; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscription_group_product_plan_staff (
    id text NOT NULL,
    date_created bigint,
    date_modified bigint,
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL,
    subscription_group_id text CONSTRAINT subscription_group_product_plan__subscription_group_id_not_null NOT NULL,
    product_plan_id text NOT NULL,
    staff_id text NOT NULL,
    role text NOT NULL,
    subscription_group_product_plan_id text,
    product_plan_staff_id text,
    job_template_phase_id text
);


--
-- Name: subscription_group_workspace_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscription_group_workspace_user (
    id text NOT NULL,
    date_created bigint,
    date_modified bigint,
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL,
    subscription_group_id text CONSTRAINT subscription_group_workspace_use_subscription_group_id_not_null NOT NULL,
    workspace_user_id text NOT NULL,
    is_owner boolean DEFAULT false NOT NULL,
    capacity text DEFAULT 'access'::text NOT NULL,
    CONSTRAINT subscription_group_workspace_user_capacity_domain_check CHECK ((capacity = ANY (ARRAY['primary'::text, 'access'::text]))),
    CONSTRAINT subscription_group_workspace_user_capacity_owner_check CHECK ((NOT ((capacity = 'access'::text) AND is_owner)))
);


--
-- Name: subscription_seat; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscription_seat (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL,
    subscription_id text NOT NULL,
    staff_id text NOT NULL,
    client_id text NOT NULL,
    product_plan_id text NOT NULL,
    product_variant_id text,
    contracted_amount bigint,
    contracted_currency text,
    role_title text,
    seniority text,
    date_start bigint,
    date_end bigint,
    status text NOT NULL,
    review_cadence_value integer,
    review_cadence_unit text,
    "position" text,
    replaces_id text,
    work_request_id text,
    CONSTRAINT subscription_seat_idor_anchors_nonempty_chk CHECK (((workspace_id <> ''::text) AND (client_id <> ''::text))),
    CONSTRAINT subscription_seat_status_chk CHECK ((status = ANY (ARRAY['proposed'::text, 'active'::text, 'replaced'::text, 'ended'::text])))
);


--
-- Name: subscription_workspace_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subscription_workspace_user (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    workspace_id text NOT NULL,
    subscription_id text NOT NULL,
    client_id text NOT NULL,
    workspace_user_id text NOT NULL,
    is_owner boolean DEFAULT false NOT NULL,
    CONSTRAINT subscription_workspace_user_idor_anchors_nonempty_chk CHECK (((workspace_id <> ''::text) AND (client_id <> ''::text)))
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
-- Name: supplier_billing_event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier_billing_event (
    id text NOT NULL,
    workspace_id text NOT NULL,
    supplier_subscription_id text NOT NULL,
    supplier_contract_id text,
    billable_amount bigint,
    billing_currency text,
    status integer DEFAULT 0 NOT NULL,
    trigger integer DEFAULT 0 NOT NULL,
    expense_recognition_id text,
    active boolean DEFAULT true,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now()
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
    description text,
    supplier_id text NOT NULL,
    category_id text NOT NULL
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
    department text,
    disbursement_profile_id_snapshot text
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
-- Name: supplier_plan; Type: TABLE; Schema: public; Owner: -
--

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


--
-- Name: supplier_portal_grant; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier_portal_grant (
    id text NOT NULL,
    workspace_id text,
    user_id text,
    supplier_id text,
    role_id text,
    granted_by_user_id text,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL
);


--
-- Name: supplier_product_cost_plan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supplier_product_cost_plan (
    id text NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    active boolean DEFAULT true NOT NULL,
    cost_plan_id text NOT NULL,
    supplier_product_plan_id text NOT NULL,
    billing_amount bigint DEFAULT 0 NOT NULL,
    billing_currency text NOT NULL,
    billing_treatment text DEFAULT 'recurring'::text NOT NULL,
    date_start text,
    date_end text
);


--
-- Name: supplier_product_plan; Type: TABLE; Schema: public; Owner: -
--

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


--
-- Name: supplier_subscription; Type: TABLE; Schema: public; Owner: -
--

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
    auto_renew boolean DEFAULT false NOT NULL,
    disbursement_profile_id_snapshot text
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
    date_modified timestamp with time zone DEFAULT now(),
    is_synthesized boolean DEFAULT false NOT NULL,
    workspace_id text
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
    date_created timestamp with time zone DEFAULT now(),
    workspace_id text
);


--
-- Name: tax_authority; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tax_authority (
    id text NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    country_code text NOT NULL,
    jurisdiction text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint
);


--
-- Name: tax_class; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tax_class (
    id text NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    description text,
    direction integer DEFAULT 0 NOT NULL,
    tax_authority_id text NOT NULL,
    regulator_code text,
    default_rate_kind text,
    requires_counterparty_role integer,
    jurisdiction text,
    recipient_type text,
    threshold_amount bigint,
    threshold_period text,
    rate_kind_above_threshold text,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint
);


--
-- Name: tax_rate; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tax_rate (
    id text NOT NULL,
    workspace_id text,
    jurisdiction text NOT NULL,
    authority_code text NOT NULL,
    regulator_code text,
    filing_form_code text,
    kind text NOT NULL,
    treatment_code text,
    direction integer DEFAULT 0 NOT NULL,
    rate_basis_points integer NOT NULL,
    effective_from text NOT NULL,
    effective_to text,
    status integer DEFAULT 0 NOT NULL,
    supersedes_id text,
    source_citation text,
    version_label text,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint
);


--
-- Name: tax_registration; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tax_registration (
    id text NOT NULL,
    party_type integer DEFAULT 0 NOT NULL,
    party_id text NOT NULL,
    tax_authority_id text NOT NULL,
    tax_registration_kind_id text NOT NULL,
    compute_path_snapshot integer DEFAULT 0 NOT NULL,
    party_role_snapshot integer DEFAULT 0 NOT NULL,
    registration_number text NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    effective_from text NOT NULL,
    effective_to text,
    supersedes_id text,
    source_citation text,
    source_document_id text,
    workspace_id text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint
);


--
-- Name: tax_registration_kind; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tax_registration_kind (
    id text NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    tax_authority_id text NOT NULL,
    jurisdiction text NOT NULL,
    party_role integer DEFAULT 0 NOT NULL,
    compute_path integer DEFAULT 0 NOT NULL,
    default_rate_kind text,
    applicable_party_types text[],
    description text,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint
);


--
-- Name: tax_treatment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tax_treatment (
    id text NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    description text,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint
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
    date_created timestamp with time zone DEFAULT now(),
    workspace_id text
);


--
-- Name: tenant_invoice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenant_invoice (
    id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    workspace_id text,
    tenant_subscription_id text,
    number text,
    status integer,
    amount bigint,
    currency text,
    issued_at text,
    paid_at text,
    due_at text,
    download_url text,
    external_ref text
);


--
-- Name: tenant_payment_method; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenant_payment_method (
    id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    workspace_id text,
    display_label text,
    card_brand text,
    card_last4 text,
    card_exp_month integer,
    card_exp_year integer,
    bank_name text,
    bank_account_number_last4 text,
    bank_routing_number text,
    provider_name text,
    provider_token text,
    is_default boolean DEFAULT false NOT NULL
);


--
-- Name: tenant_subscription; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenant_subscription (
    id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    workspace_id text,
    plan_code text,
    plan_display_name text,
    status integer,
    billing_cycle text,
    cycle_amount bigint,
    currency text,
    period_start text,
    period_end text,
    trial_end text,
    cancelled_at text,
    default_payment_method_id text,
    external_ref text
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
    date_modified timestamp with time zone DEFAULT now(),
    advance_kind integer,
    advance_status integer,
    advance_start_date text,
    advance_end_date text,
    advance_period_count integer,
    advance_period_unit text,
    advance_total_amount bigint,
    advance_remaining_amount bigint,
    advance_recognized_amount bigint,
    advance_balance_account_id text,
    advance_target_account_id text,
    advance_expiry_date text,
    advance_proration_policy integer,
    client_id text,
    subscription_id text,
    journal_entry_id text,
    fund_transaction_id text,
    workspace_id text
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
    date_modified timestamp with time zone DEFAULT now(),
    advance_kind integer,
    advance_status integer,
    advance_start_date text,
    advance_end_date text,
    advance_period_count integer,
    advance_period_unit text,
    advance_total_amount bigint,
    advance_remaining_amount bigint,
    advance_recognized_amount bigint,
    advance_balance_account_id text,
    advance_target_account_id text,
    advance_expiry_date text,
    advance_proration_policy integer,
    supplier_id text,
    subscription_id text,
    disbursement_method_id text,
    journal_entry_id text,
    fund_transaction_id text,
    workspace_id text
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
-- Name: user_preference; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_preference (
    id text NOT NULL,
    date_created bigint,
    date_created_string text,
    date_modified bigint,
    date_modified_string text,
    active boolean DEFAULT true NOT NULL,
    user_id text,
    workspace_id text,
    theme text,
    density text,
    font text,
    radius text,
    border text,
    language text,
    region text,
    timezone text,
    notify_email_billing boolean,
    notify_email_account boolean,
    notify_inapp_mentions boolean
);


--
-- Name: withholding_certificate; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.withholding_certificate (
    id text NOT NULL,
    workspace_id text NOT NULL,
    revenue_id text NOT NULL,
    tax_authority_id text,
    regulator_code_snapshot text,
    certificate_number text NOT NULL,
    certificate_period text,
    issued_date text,
    received_date text,
    expected_amount bigint NOT NULL,
    actual_amount bigint NOT NULL,
    variance_amount bigint DEFAULT 0 NOT NULL,
    buyer_tin_snapshot text,
    source_document_id text,
    status integer DEFAULT 0 NOT NULL,
    notes text,
    active boolean DEFAULT true NOT NULL,
    date_created bigint,
    date_modified bigint
);


--
-- Name: work_request; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.work_request (
    id text NOT NULL,
    workspace_id text NOT NULL,
    client_id text,
    origin text NOT NULL,
    request_number text NOT NULL,
    work_request_type_id text NOT NULL,
    status text NOT NULL,
    title text DEFAULT ''::text NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    payload_json text DEFAULT '{}'::text NOT NULL,
    subscription_seat_id text,
    requested_by_user_id text NOT NULL,
    assigned_to_workspace_user_id text,
    priority integer DEFAULT 0 NOT NULL,
    sla_target_hours bigint DEFAULT 0 NOT NULL,
    sla_due_at bigint,
    sla_breached_at bigint,
    workflow_id text,
    resolution_note text,
    date_submitted bigint,
    date_resolved bigint,
    active boolean DEFAULT true NOT NULL,
    submission_idempotency_key text NOT NULL,
    job_id text,
    subscription_id text,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    CONSTRAINT work_request_active_status_coupling_chk CHECK ((active = (status <> ALL (ARRAY['declined'::text, 'completed'::text, 'cancelled'::text])))),
    CONSTRAINT work_request_client_id_nonempty_chk CHECK (((client_id IS NULL) OR (client_id <> ''::text))),
    CONSTRAINT work_request_client_origin_gate_chk CHECK (((client_id IS NULL) = (origin = 'internal'::text))),
    CONSTRAINT work_request_origin_chk CHECK ((origin = ANY (ARRAY['client_originated'::text, 'client_related_internal'::text, 'internal'::text]))),
    CONSTRAINT work_request_priority_chk CHECK ((priority = ANY (ARRAY[0, 1]))),
    CONSTRAINT work_request_sla_target_hours_chk CHECK ((sla_target_hours >= 0)),
    CONSTRAINT work_request_status_chk CHECK ((status = ANY (ARRAY['new'::text, 'submitted'::text, 'in_review'::text, 'approved'::text, 'declined'::text, 'completed'::text, 'cancelled'::text, 'returned_for_info'::text, 'on_hold'::text, 'escalated'::text, 'pending_override'::text]))),
    CONSTRAINT work_request_workspace_nonempty_chk CHECK ((workspace_id <> ''::text))
);


--
-- Name: work_request_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.work_request_type (
    id text NOT NULL,
    workspace_id text NOT NULL,
    code text NOT NULL,
    label_key text DEFAULT ''::text NOT NULL,
    description_key text DEFAULT ''::text NOT NULL,
    category text NOT NULL,
    requires_resource boolean DEFAULT false NOT NULL,
    default_workflow_template_id text,
    default_sla_hours bigint DEFAULT 0 NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    icon_key text DEFAULT ''::text NOT NULL,
    status text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_modified timestamp with time zone DEFAULT now(),
    CONSTRAINT work_request_type_active_must_have_template_chk CHECK (((status <> 'active'::text) OR (default_workflow_template_id IS NOT NULL))),
    CONSTRAINT work_request_type_active_status_coupling_chk CHECK ((active = (status = 'active'::text))),
    CONSTRAINT work_request_type_category_chk CHECK ((category = ANY (ARRAY['person_scoped'::text, 'account_scoped'::text]))),
    CONSTRAINT work_request_type_nonempty_chk CHECK (((workspace_id <> ''::text) AND (code <> ''::text))),
    CONSTRAINT work_request_type_sla_hours_chk CHECK ((default_sla_hours >= 0)),
    CONSTRAINT work_request_type_status_chk CHECK ((status = ANY (ARRAY['active'::text, 'archived'::text])))
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
    compliance_region text,
    timezone text DEFAULT 'Asia/Manila'::text NOT NULL,
    tin text,
    tax_inclusive_pricing boolean,
    tax_computation_enabled boolean,
    home_jurisdiction text,
    date_format text,
    time_format text,
    tenant_subscription_id text,
    slug character varying(30),
    CONSTRAINT workspace_slug_format CHECK ((((slug)::text ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'::text) AND ((length((slug)::text) >= 3) AND (length((slug)::text) <= 30))))
);


--
-- Name: workspace_request_counter; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workspace_request_counter (
    workspace_id text NOT NULL,
    seq bigint DEFAULT 0 NOT NULL,
    CONSTRAINT workspace_request_counter_workspace_nonempty_chk CHECK ((workspace_id <> ''::text))
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
    active boolean DEFAULT true NOT NULL,
    member_number text,
    member_status text,
    member_since bigint,
    member_until bigint
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
-- Name: audit_entry_2026_06; Type: TABLE ATTACH; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry ATTACH PARTITION audit_trail.audit_entry_2026_06 FOR VALUES FROM ('2026-06-01 00:00:00+08') TO ('2026-07-01 00:00:00+08');


--
-- Name: audit_entry_2026_07; Type: TABLE ATTACH; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry ATTACH PARTITION audit_trail.audit_entry_2026_07 FOR VALUES FROM ('2026-07-01 00:00:00+08') TO ('2026-08-01 00:00:00+08');


--
-- Name: audit_entry_2026_08; Type: TABLE ATTACH; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry ATTACH PARTITION audit_trail.audit_entry_2026_08 FOR VALUES FROM ('2026-08-01 00:00:00+08') TO ('2026-09-01 00:00:00+08');


--
-- Name: audit_entry_2026_09; Type: TABLE ATTACH; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry ATTACH PARTITION audit_trail.audit_entry_2026_09 FOR VALUES FROM ('2026-09-01 00:00:00+08') TO ('2026-10-01 00:00:00+08');


--
-- Name: audit_entry_2026_10; Type: TABLE ATTACH; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry ATTACH PARTITION audit_trail.audit_entry_2026_10 FOR VALUES FROM ('2026-10-01 00:00:00+08') TO ('2026-11-01 00:00:00+08');


--
-- Name: audit_entry_2026_11; Type: TABLE ATTACH; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry ATTACH PARTITION audit_trail.audit_entry_2026_11 FOR VALUES FROM ('2026-11-01 00:00:00+08') TO ('2026-12-01 00:00:00+08');


--
-- Name: audit_entry_2026_12; Type: TABLE ATTACH; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry ATTACH PARTITION audit_trail.audit_entry_2026_12 FOR VALUES FROM ('2026-12-01 00:00:00+08') TO ('2027-01-01 00:00:00+08');


--
-- Name: audit_entry_default; Type: TABLE ATTACH; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry ATTACH PARTITION audit_trail.audit_entry_default DEFAULT;


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
-- Name: audit_entry_2026_06 audit_entry_2026_06_pkey; Type: CONSTRAINT; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry_2026_06
    ADD CONSTRAINT audit_entry_2026_06_pkey PRIMARY KEY (occurred_at, id);


--
-- Name: audit_entry_2026_07 audit_entry_2026_07_pkey; Type: CONSTRAINT; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry_2026_07
    ADD CONSTRAINT audit_entry_2026_07_pkey PRIMARY KEY (occurred_at, id);


--
-- Name: audit_entry_2026_08 audit_entry_2026_08_pkey; Type: CONSTRAINT; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry_2026_08
    ADD CONSTRAINT audit_entry_2026_08_pkey PRIMARY KEY (occurred_at, id);


--
-- Name: audit_entry_2026_09 audit_entry_2026_09_pkey; Type: CONSTRAINT; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry_2026_09
    ADD CONSTRAINT audit_entry_2026_09_pkey PRIMARY KEY (occurred_at, id);


--
-- Name: audit_entry_2026_10 audit_entry_2026_10_pkey; Type: CONSTRAINT; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry_2026_10
    ADD CONSTRAINT audit_entry_2026_10_pkey PRIMARY KEY (occurred_at, id);


--
-- Name: audit_entry_2026_11 audit_entry_2026_11_pkey; Type: CONSTRAINT; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry_2026_11
    ADD CONSTRAINT audit_entry_2026_11_pkey PRIMARY KEY (occurred_at, id);


--
-- Name: audit_entry_2026_12 audit_entry_2026_12_pkey; Type: CONSTRAINT; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry_2026_12
    ADD CONSTRAINT audit_entry_2026_12_pkey PRIMARY KEY (occurred_at, id);


--
-- Name: audit_entry_default audit_entry_default_pkey; Type: CONSTRAINT; Schema: audit_trail; Owner: -
--

ALTER TABLE ONLY audit_trail.audit_entry_default
    ADD CONSTRAINT audit_entry_default_pkey PRIMARY KEY (occurred_at, id);


--
-- Name: data_bundle_receipts data_bundle_receipts_pkey; Type: CONSTRAINT; Schema: ichizen_deploy; Owner: -
--

ALTER TABLE ONLY ichizen_deploy.data_bundle_receipts
    ADD CONSTRAINT data_bundle_receipts_pkey PRIMARY KEY (target_key, bundle_id, bundle_version);


--
-- Name: _atlas_review_depreciation_period_collisions _atlas_review_depreciation_period_collisions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._atlas_review_depreciation_period_collisions
    ADD CONSTRAINT _atlas_review_depreciation_period_collisions_pkey PRIMARY KEY (id);


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
-- Name: client_portal_grant client_portal_grant_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT client_portal_grant_pkey PRIMARY KEY (id);


--
-- Name: client_workspace_user client_workspace_user_client_user_uq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_workspace_user
    ADD CONSTRAINT client_workspace_user_client_user_uq UNIQUE (client_id, workspace_user_id);


--
-- Name: client_workspace_user client_workspace_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_workspace_user
    ADD CONSTRAINT client_workspace_user_pkey PRIMARY KEY (id);


--
-- Name: collection_attribute collection_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_attribute
    ADD CONSTRAINT collection_attribute_pkey PRIMARY KEY (id);


--
-- Name: collection_billing_event collection_billing_event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_billing_event
    ADD CONSTRAINT collection_billing_event_pkey PRIMARY KEY (id);


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
-- Name: conversation_participant conversation_participant_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversation_participant
    ADD CONSTRAINT conversation_participant_pkey PRIMARY KEY (id);


--
-- Name: conversation conversation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT conversation_pkey PRIMARY KEY (id);


--
-- Name: conversation_post conversation_post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversation_post
    ADD CONSTRAINT conversation_post_pkey PRIMARY KEY (id);


--
-- Name: conversation_read_receipt conversation_read_receipt_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversation_read_receipt
    ADD CONSTRAINT conversation_read_receipt_pkey PRIMARY KEY (id);


--
-- Name: cost_plan cost_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cost_plan
    ADD CONSTRAINT cost_plan_pkey PRIMARY KEY (id);


--
-- Name: cost_schedule cost_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cost_schedule
    ADD CONSTRAINT cost_schedule_pkey PRIMARY KEY (id);


--
-- Name: criteria_group criteria_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.criteria_group
    ADD CONSTRAINT criteria_group_pkey PRIMARY KEY (id);


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
-- Name: delegate_supplier delegate_supplier_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT delegate_supplier_pkey PRIMARY KEY (id);


--
-- Name: depreciation_run depreciation_run_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.depreciation_run
    ADD CONSTRAINT depreciation_run_pkey PRIMARY KEY (id);


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
-- Name: disbursement_supplier_billing_event disbursement_supplier_billing_event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.disbursement_supplier_billing_event
    ADD CONSTRAINT disbursement_supplier_billing_event_pkey PRIMARY KEY (id);


--
-- Name: document_template document_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.document_template
    ADD CONSTRAINT document_template_pkey PRIMARY KEY (id);


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
-- Name: evaluation_cycle_member evaluation_cycle_member_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_cycle_member
    ADD CONSTRAINT evaluation_cycle_member_pkey PRIMARY KEY (id);


--
-- Name: evaluation_cycle_member evaluation_cycle_member_unique_obligation; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_cycle_member
    ADD CONSTRAINT evaluation_cycle_member_unique_obligation UNIQUE (evaluation_cycle_id, subject_staff_id, client_id);


--
-- Name: evaluation_cycle evaluation_cycle_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_cycle
    ADD CONSTRAINT evaluation_cycle_pkey PRIMARY KEY (id);


--
-- Name: evaluation evaluation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_pkey PRIMARY KEY (id);


--
-- Name: evaluation_response evaluation_response_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_response
    ADD CONSTRAINT evaluation_response_pkey PRIMARY KEY (id);


--
-- Name: evaluation_template_item evaluation_template_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_template_item
    ADD CONSTRAINT evaluation_template_item_pkey PRIMARY KEY (id);


--
-- Name: evaluation_template evaluation_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_template
    ADD CONSTRAINT evaluation_template_pkey PRIMARY KEY (id);


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
-- Name: expense_recognition_run_attempt expense_recognition_run_attempt_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_run_attempt
    ADD CONSTRAINT expense_recognition_run_attempt_pkey PRIMARY KEY (id);


--
-- Name: expense_recognition_run expense_recognition_run_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_run
    ADD CONSTRAINT expense_recognition_run_pkey PRIMARY KEY (id);


--
-- Name: fiscal_period fiscal_period_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fiscal_period
    ADD CONSTRAINT fiscal_period_pkey PRIMARY KEY (id);


--
-- Name: forex_rate forex_rate_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forex_rate
    ADD CONSTRAINT forex_rate_pkey PRIMARY KEY (id);


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
-- Name: fund_allocation fund_allocation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_allocation
    ADD CONSTRAINT fund_allocation_pkey PRIMARY KEY (id);


--
-- Name: fund fund_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund
    ADD CONSTRAINT fund_pkey PRIMARY KEY (id);


--
-- Name: fund_transaction fund_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_transaction
    ADD CONSTRAINT fund_transaction_pkey PRIMARY KEY (id);


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
-- Name: job_category job_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_category
    ADD CONSTRAINT job_category_pkey PRIMARY KEY (id);


--
-- Name: job_outcome_line job_outcome_line_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_outcome_line
    ADD CONSTRAINT job_outcome_line_pkey PRIMARY KEY (id);


--
-- Name: job_outcome_summary_document_template job_outcome_summary_document_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_outcome_summary_document_template
    ADD CONSTRAINT job_outcome_summary_document_template_pkey PRIMARY KEY (id);


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
-- Name: job_template_document_template job_template_document_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_document_template
    ADD CONSTRAINT job_template_document_template_pkey PRIMARY KEY (id);


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
-- Name: line_workspace_user line_workspace_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.line_workspace_user
    ADD CONSTRAINT line_workspace_user_pkey PRIMARY KEY (id);


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
-- Name: payment_term payment_term_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_term
    ADD CONSTRAINT payment_term_pkey PRIMARY KEY (id);


--
-- Name: payment_term payment_term_workspace_id_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_term
    ADD CONSTRAINT payment_term_workspace_id_code_key UNIQUE (workspace_id, code);


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
-- Name: subscription_group_document_template pk_sgdt; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_document_template
    ADD CONSTRAINT pk_sgdt PRIMARY KEY (id);


--
-- Name: plan_attribute plan_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_attribute
    ADD CONSTRAINT plan_attribute_pkey PRIMARY KEY (id);


--
-- Name: plan_group plan_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_group
    ADD CONSTRAINT plan_group_pkey PRIMARY KEY (id);


--
-- Name: plan_group_plan plan_group_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_group_plan
    ADD CONSTRAINT plan_group_plan_pkey PRIMARY KEY (id);


--
-- Name: plan_job_template plan_job_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_job_template
    ADD CONSTRAINT plan_job_template_pkey PRIMARY KEY (id);


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
-- Name: price_schedule_workspace_user price_schedule_workspace_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_schedule_workspace_user
    ADD CONSTRAINT price_schedule_workspace_user_pkey PRIMARY KEY (id);


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
-- Name: product_plan_staff product_plan_staff_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_plan_staff
    ADD CONSTRAINT product_plan_staff_pkey PRIMARY KEY (id);


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
-- Name: reporting_checkpoint reporting_checkpoint_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reporting_checkpoint
    ADD CONSTRAINT reporting_checkpoint_pkey PRIMARY KEY (id);


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
-- Name: revenue_run_attempt revenue_run_attempt_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_run_attempt
    ADD CONSTRAINT revenue_run_attempt_pkey PRIMARY KEY (id);


--
-- Name: revenue_run revenue_run_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_run
    ADD CONSTRAINT revenue_run_pkey PRIMARY KEY (id);


--
-- Name: revenue_tax_line revenue_tax_line_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_tax_line
    ADD CONSTRAINT revenue_tax_line_pkey PRIMARY KEY (id);


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
-- Name: score_scale_band score_scale_band_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.score_scale_band
    ADD CONSTRAINT score_scale_band_pkey PRIMARY KEY (id);


--
-- Name: score_scale score_scale_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.score_scale
    ADD CONSTRAINT score_scale_pkey PRIMARY KEY (id);


--
-- Name: scoring_component_criteria scoring_component_criteria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_component_criteria
    ADD CONSTRAINT scoring_component_criteria_pkey PRIMARY KEY (id);


--
-- Name: scoring_component scoring_component_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_component
    ADD CONSTRAINT scoring_component_pkey PRIMARY KEY (id);


--
-- Name: scoring_scheme scoring_scheme_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_scheme
    ADD CONSTRAINT scoring_scheme_pkey PRIMARY KEY (id);


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
-- Name: subscription_group_member subscription_group_member_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_member
    ADD CONSTRAINT subscription_group_member_pkey PRIMARY KEY (id);


--
-- Name: subscription_group subscription_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group
    ADD CONSTRAINT subscription_group_pkey PRIMARY KEY (id);


--
-- Name: subscription_group_product_plan subscription_group_product_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan
    ADD CONSTRAINT subscription_group_product_plan_pkey PRIMARY KEY (id);


--
-- Name: subscription_group_product_plan_staff subscription_group_product_plan_staff_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan_staff
    ADD CONSTRAINT subscription_group_product_plan_staff_pkey PRIMARY KEY (id);


--
-- Name: subscription_group_workspace_user subscription_group_workspace_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_workspace_user
    ADD CONSTRAINT subscription_group_workspace_user_pkey PRIMARY KEY (id);


--
-- Name: subscription subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription
    ADD CONSTRAINT subscription_pkey PRIMARY KEY (id);


--
-- Name: subscription_seat subscription_seat_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_seat
    ADD CONSTRAINT subscription_seat_pkey PRIMARY KEY (id);


--
-- Name: subscription_workspace_user subscription_workspace_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_workspace_user
    ADD CONSTRAINT subscription_workspace_user_pkey PRIMARY KEY (id);


--
-- Name: supplier_attribute supplier_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_attribute
    ADD CONSTRAINT supplier_attribute_pkey PRIMARY KEY (id);


--
-- Name: supplier_billing_event supplier_billing_event_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_billing_event
    ADD CONSTRAINT supplier_billing_event_pkey PRIMARY KEY (id);


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
-- Name: supplier_plan supplier_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_plan
    ADD CONSTRAINT supplier_plan_pkey PRIMARY KEY (id);


--
-- Name: supplier_portal_grant supplier_portal_grant_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT supplier_portal_grant_pkey PRIMARY KEY (id);


--
-- Name: supplier_product_cost_plan supplier_product_cost_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_product_cost_plan
    ADD CONSTRAINT supplier_product_cost_plan_pkey PRIMARY KEY (id);


--
-- Name: supplier_product_plan supplier_product_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_product_plan
    ADD CONSTRAINT supplier_product_plan_pkey PRIMARY KEY (id);


--
-- Name: supplier_subscription supplier_subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_subscription
    ADD CONSTRAINT supplier_subscription_pkey PRIMARY KEY (id);


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
-- Name: tax_authority tax_authority_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_authority
    ADD CONSTRAINT tax_authority_code_key UNIQUE (code);


--
-- Name: tax_authority tax_authority_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_authority
    ADD CONSTRAINT tax_authority_pkey PRIMARY KEY (id);


--
-- Name: tax_class tax_class_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_class
    ADD CONSTRAINT tax_class_code_key UNIQUE (code);


--
-- Name: tax_class tax_class_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_class
    ADD CONSTRAINT tax_class_pkey PRIMARY KEY (id);


--
-- Name: tax_rate tax_rate_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_rate
    ADD CONSTRAINT tax_rate_pkey PRIMARY KEY (id);


--
-- Name: tax_registration_kind tax_registration_kind_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_registration_kind
    ADD CONSTRAINT tax_registration_kind_code_key UNIQUE (code);


--
-- Name: tax_registration_kind tax_registration_kind_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_registration_kind
    ADD CONSTRAINT tax_registration_kind_pkey PRIMARY KEY (id);


--
-- Name: tax_registration tax_registration_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_registration
    ADD CONSTRAINT tax_registration_pkey PRIMARY KEY (id);


--
-- Name: tax_treatment tax_treatment_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_treatment
    ADD CONSTRAINT tax_treatment_code_key UNIQUE (code);


--
-- Name: tax_treatment tax_treatment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_treatment
    ADD CONSTRAINT tax_treatment_pkey PRIMARY KEY (id);


--
-- Name: template_task_criteria template_task_criteria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.template_task_criteria
    ADD CONSTRAINT template_task_criteria_pkey PRIMARY KEY (id);


--
-- Name: tenant_invoice tenant_invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_invoice
    ADD CONSTRAINT tenant_invoice_pkey PRIMARY KEY (id);


--
-- Name: tenant_payment_method tenant_payment_method_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_payment_method
    ADD CONSTRAINT tenant_payment_method_pkey PRIMARY KEY (id);


--
-- Name: tenant_subscription tenant_subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_subscription
    ADD CONSTRAINT tenant_subscription_pkey PRIMARY KEY (id);


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
-- Name: client_portal_grant uq_client_portal_grant_workspace_client_user; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT uq_client_portal_grant_workspace_client_user UNIQUE (workspace_id, client_id, user_id);


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
-- Name: criteria_group uq_criteria_group_id_code; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.criteria_group
    ADD CONSTRAINT uq_criteria_group_id_code UNIQUE (id, code);


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
-- Name: delegate_supplier uq_delegate_supplier_delegate_supplier; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT uq_delegate_supplier_delegate_supplier UNIQUE (delegate_id, supplier_id);


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
-- Name: job_template_phase uq_job_template_phase_parent_code; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_phase
    ADD CONSTRAINT uq_job_template_phase_parent_code UNIQUE (job_template_id, code);


--
-- Name: job_template_task uq_job_template_task_parent_code; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_task
    ADD CONSTRAINT uq_job_template_task_parent_code UNIQUE (job_template_phase_id, code);


--
-- Name: line_workspace_user uq_line_workspace_user_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.line_workspace_user
    ADD CONSTRAINT uq_line_workspace_user_1 UNIQUE (line_id, workspace_user_id);


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
-- Name: plan_group_plan uq_plan_group_plan_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_group_plan
    ADD CONSTRAINT uq_plan_group_plan_1 UNIQUE (plan_group_id, plan_id);


--
-- Name: plan_location uq_plan_location_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_location
    ADD CONSTRAINT uq_plan_location_1 UNIQUE (plan_id, location_id);


--
-- Name: price_schedule_workspace_user uq_price_schedule_workspace_user_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_schedule_workspace_user
    ADD CONSTRAINT uq_price_schedule_workspace_user_1 UNIQUE (price_schedule_id, workspace_user_id);


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
-- Name: product_plan_staff uq_product_plan_staff_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_plan_staff
    ADD CONSTRAINT uq_product_plan_staff_1 UNIQUE (product_plan_id, staff_id);


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
-- Name: scoring_component_criteria uq_scoring_component_criteria_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_component_criteria
    ADD CONSTRAINT uq_scoring_component_criteria_1 UNIQUE (scoring_scheme_id, scoring_component_id, outcome_criteria_id);


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
-- Name: subscription_group_member uq_subscription_group_member_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_member
    ADD CONSTRAINT uq_subscription_group_member_1 UNIQUE (subscription_group_id, subscription_id);


--
-- Name: subscription_group_product_plan uq_subscription_group_product_plan_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan
    ADD CONSTRAINT uq_subscription_group_product_plan_1 UNIQUE (subscription_group_id, product_plan_id);


--
-- Name: subscription_group_product_plan_staff uq_subscription_group_product_plan_staff_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan_staff
    ADD CONSTRAINT uq_subscription_group_product_plan_staff_1 UNIQUE (subscription_group_id, product_plan_id, staff_id);


--
-- Name: subscription_group_workspace_user uq_subscription_group_workspace_user_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_workspace_user
    ADD CONSTRAINT uq_subscription_group_workspace_user_1 UNIQUE (subscription_group_id, workspace_user_id);


--
-- Name: supplier_attribute uq_supplier_attribute_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_attribute
    ADD CONSTRAINT uq_supplier_attribute_1 UNIQUE (supplier_id, attribute_id);


--
-- Name: supplier_portal_grant uq_supplier_portal_grant_workspace_supplier_user; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT uq_supplier_portal_grant_workspace_supplier_user UNIQUE (workspace_id, supplier_id, user_id);


--
-- Name: user_preference uq_user_preference_user_workspace; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_preference
    ADD CONSTRAINT uq_user_preference_user_workspace UNIQUE (user_id, workspace_id);


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
-- Name: user_preference user_preference_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_preference
    ADD CONSTRAINT user_preference_pkey PRIMARY KEY (id);


--
-- Name: withholding_certificate withholding_certificate_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.withholding_certificate
    ADD CONSTRAINT withholding_certificate_pkey PRIMARY KEY (id);


--
-- Name: withholding_certificate withholding_certificate_revenue_id_certificate_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.withholding_certificate
    ADD CONSTRAINT withholding_certificate_revenue_id_certificate_number_key UNIQUE (revenue_id, certificate_number);


--
-- Name: work_request work_request_idempotency_uq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request
    ADD CONSTRAINT work_request_idempotency_uq UNIQUE (workspace_id, requested_by_user_id, submission_idempotency_key);


--
-- Name: work_request work_request_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request
    ADD CONSTRAINT work_request_pkey PRIMARY KEY (id);


--
-- Name: work_request_type work_request_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request_type
    ADD CONSTRAINT work_request_type_pkey PRIMARY KEY (id);


--
-- Name: work_request_type work_request_type_workspace_code_uq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request_type
    ADD CONSTRAINT work_request_type_workspace_code_uq UNIQUE (workspace_id, code);


--
-- Name: work_request work_request_workspace_request_number_uq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request
    ADD CONSTRAINT work_request_workspace_request_number_uq UNIQUE (workspace_id, request_number);


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
-- Name: workspace_request_counter workspace_request_counter_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workspace_request_counter
    ADD CONSTRAINT workspace_request_counter_pkey PRIMARY KEY (workspace_id);


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
-- Name: audit_entry_2026_06_actor_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_06_actor_id_occurred_at_idx ON audit_trail.audit_entry_2026_06 USING btree (actor_id, occurred_at DESC);


--
-- Name: audit_entry_2026_06_entity_type_entity_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_06_entity_type_entity_id_occurred_at_idx ON audit_trail.audit_entry_2026_06 USING btree (entity_type, entity_id, occurred_at DESC);


--
-- Name: audit_entry_2026_06_permission_code_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_06_permission_code_occurred_at_idx ON audit_trail.audit_entry_2026_06 USING btree (permission_code, occurred_at DESC);


--
-- Name: audit_entry_2026_06_transaction_id_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_06_transaction_id_idx ON audit_trail.audit_entry_2026_06 USING btree (transaction_id);


--
-- Name: audit_entry_2026_06_use_case_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_06_use_case_occurred_at_idx ON audit_trail.audit_entry_2026_06 USING btree (use_case, occurred_at DESC);


--
-- Name: audit_entry_2026_06_workspace_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_06_workspace_id_occurred_at_idx ON audit_trail.audit_entry_2026_06 USING btree (workspace_id, occurred_at DESC);


--
-- Name: audit_entry_2026_07_actor_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_07_actor_id_occurred_at_idx ON audit_trail.audit_entry_2026_07 USING btree (actor_id, occurred_at DESC);


--
-- Name: audit_entry_2026_07_entity_type_entity_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_07_entity_type_entity_id_occurred_at_idx ON audit_trail.audit_entry_2026_07 USING btree (entity_type, entity_id, occurred_at DESC);


--
-- Name: audit_entry_2026_07_permission_code_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_07_permission_code_occurred_at_idx ON audit_trail.audit_entry_2026_07 USING btree (permission_code, occurred_at DESC);


--
-- Name: audit_entry_2026_07_transaction_id_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_07_transaction_id_idx ON audit_trail.audit_entry_2026_07 USING btree (transaction_id);


--
-- Name: audit_entry_2026_07_use_case_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_07_use_case_occurred_at_idx ON audit_trail.audit_entry_2026_07 USING btree (use_case, occurred_at DESC);


--
-- Name: audit_entry_2026_07_workspace_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_07_workspace_id_occurred_at_idx ON audit_trail.audit_entry_2026_07 USING btree (workspace_id, occurred_at DESC);


--
-- Name: audit_entry_2026_08_actor_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_08_actor_id_occurred_at_idx ON audit_trail.audit_entry_2026_08 USING btree (actor_id, occurred_at DESC);


--
-- Name: audit_entry_2026_08_entity_type_entity_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_08_entity_type_entity_id_occurred_at_idx ON audit_trail.audit_entry_2026_08 USING btree (entity_type, entity_id, occurred_at DESC);


--
-- Name: audit_entry_2026_08_permission_code_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_08_permission_code_occurred_at_idx ON audit_trail.audit_entry_2026_08 USING btree (permission_code, occurred_at DESC);


--
-- Name: audit_entry_2026_08_transaction_id_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_08_transaction_id_idx ON audit_trail.audit_entry_2026_08 USING btree (transaction_id);


--
-- Name: audit_entry_2026_08_use_case_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_08_use_case_occurred_at_idx ON audit_trail.audit_entry_2026_08 USING btree (use_case, occurred_at DESC);


--
-- Name: audit_entry_2026_08_workspace_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_08_workspace_id_occurred_at_idx ON audit_trail.audit_entry_2026_08 USING btree (workspace_id, occurred_at DESC);


--
-- Name: audit_entry_2026_09_actor_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_09_actor_id_occurred_at_idx ON audit_trail.audit_entry_2026_09 USING btree (actor_id, occurred_at DESC);


--
-- Name: audit_entry_2026_09_entity_type_entity_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_09_entity_type_entity_id_occurred_at_idx ON audit_trail.audit_entry_2026_09 USING btree (entity_type, entity_id, occurred_at DESC);


--
-- Name: audit_entry_2026_09_permission_code_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_09_permission_code_occurred_at_idx ON audit_trail.audit_entry_2026_09 USING btree (permission_code, occurred_at DESC);


--
-- Name: audit_entry_2026_09_transaction_id_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_09_transaction_id_idx ON audit_trail.audit_entry_2026_09 USING btree (transaction_id);


--
-- Name: audit_entry_2026_09_use_case_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_09_use_case_occurred_at_idx ON audit_trail.audit_entry_2026_09 USING btree (use_case, occurred_at DESC);


--
-- Name: audit_entry_2026_09_workspace_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_09_workspace_id_occurred_at_idx ON audit_trail.audit_entry_2026_09 USING btree (workspace_id, occurred_at DESC);


--
-- Name: audit_entry_2026_10_actor_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_10_actor_id_occurred_at_idx ON audit_trail.audit_entry_2026_10 USING btree (actor_id, occurred_at DESC);


--
-- Name: audit_entry_2026_10_entity_type_entity_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_10_entity_type_entity_id_occurred_at_idx ON audit_trail.audit_entry_2026_10 USING btree (entity_type, entity_id, occurred_at DESC);


--
-- Name: audit_entry_2026_10_permission_code_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_10_permission_code_occurred_at_idx ON audit_trail.audit_entry_2026_10 USING btree (permission_code, occurred_at DESC);


--
-- Name: audit_entry_2026_10_transaction_id_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_10_transaction_id_idx ON audit_trail.audit_entry_2026_10 USING btree (transaction_id);


--
-- Name: audit_entry_2026_10_use_case_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_10_use_case_occurred_at_idx ON audit_trail.audit_entry_2026_10 USING btree (use_case, occurred_at DESC);


--
-- Name: audit_entry_2026_10_workspace_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_10_workspace_id_occurred_at_idx ON audit_trail.audit_entry_2026_10 USING btree (workspace_id, occurred_at DESC);


--
-- Name: audit_entry_2026_11_actor_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_11_actor_id_occurred_at_idx ON audit_trail.audit_entry_2026_11 USING btree (actor_id, occurred_at DESC);


--
-- Name: audit_entry_2026_11_entity_type_entity_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_11_entity_type_entity_id_occurred_at_idx ON audit_trail.audit_entry_2026_11 USING btree (entity_type, entity_id, occurred_at DESC);


--
-- Name: audit_entry_2026_11_permission_code_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_11_permission_code_occurred_at_idx ON audit_trail.audit_entry_2026_11 USING btree (permission_code, occurred_at DESC);


--
-- Name: audit_entry_2026_11_transaction_id_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_11_transaction_id_idx ON audit_trail.audit_entry_2026_11 USING btree (transaction_id);


--
-- Name: audit_entry_2026_11_use_case_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_11_use_case_occurred_at_idx ON audit_trail.audit_entry_2026_11 USING btree (use_case, occurred_at DESC);


--
-- Name: audit_entry_2026_11_workspace_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_11_workspace_id_occurred_at_idx ON audit_trail.audit_entry_2026_11 USING btree (workspace_id, occurred_at DESC);


--
-- Name: audit_entry_2026_12_actor_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_12_actor_id_occurred_at_idx ON audit_trail.audit_entry_2026_12 USING btree (actor_id, occurred_at DESC);


--
-- Name: audit_entry_2026_12_entity_type_entity_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_12_entity_type_entity_id_occurred_at_idx ON audit_trail.audit_entry_2026_12 USING btree (entity_type, entity_id, occurred_at DESC);


--
-- Name: audit_entry_2026_12_permission_code_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_12_permission_code_occurred_at_idx ON audit_trail.audit_entry_2026_12 USING btree (permission_code, occurred_at DESC);


--
-- Name: audit_entry_2026_12_transaction_id_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_12_transaction_id_idx ON audit_trail.audit_entry_2026_12 USING btree (transaction_id);


--
-- Name: audit_entry_2026_12_use_case_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_12_use_case_occurred_at_idx ON audit_trail.audit_entry_2026_12 USING btree (use_case, occurred_at DESC);


--
-- Name: audit_entry_2026_12_workspace_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_2026_12_workspace_id_occurred_at_idx ON audit_trail.audit_entry_2026_12 USING btree (workspace_id, occurred_at DESC);


--
-- Name: audit_entry_default_actor_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_default_actor_id_occurred_at_idx ON audit_trail.audit_entry_default USING btree (actor_id, occurred_at DESC);


--
-- Name: audit_entry_default_entity_type_entity_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_default_entity_type_entity_id_occurred_at_idx ON audit_trail.audit_entry_default USING btree (entity_type, entity_id, occurred_at DESC);


--
-- Name: audit_entry_default_permission_code_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_default_permission_code_occurred_at_idx ON audit_trail.audit_entry_default USING btree (permission_code, occurred_at DESC);


--
-- Name: audit_entry_default_transaction_id_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_default_transaction_id_idx ON audit_trail.audit_entry_default USING btree (transaction_id);


--
-- Name: audit_entry_default_use_case_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_default_use_case_occurred_at_idx ON audit_trail.audit_entry_default USING btree (use_case, occurred_at DESC);


--
-- Name: audit_entry_default_workspace_id_occurred_at_idx; Type: INDEX; Schema: audit_trail; Owner: -
--

CREATE INDEX audit_entry_default_workspace_id_occurred_at_idx ON audit_trail.audit_entry_default USING btree (workspace_id, occurred_at DESC);


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
-- Name: idx_account_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_account_workspace_id ON public.account USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


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
-- Name: idx_activity_expense_activity_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_expense_activity_id ON public.activity_expense USING btree (activity_id);


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
-- Name: idx_activity_material_activity_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_material_activity_id ON public.activity_material USING btree (activity_id);


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
-- Name: idx_asset_category_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_category_workspace_id ON public.asset_category USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


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
-- Name: idx_asset_transaction_depreciation_period; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_asset_transaction_depreciation_period ON public.asset_transaction USING btree (asset_id, period_marker) WHERE ((transaction_type = 'ASSET_TRANSACTION_TYPE_DEPRECIATION'::text) AND (depreciation_period_start_date IS NOT NULL));


--
-- Name: idx_asset_transaction_depreciation_run_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_transaction_depreciation_run_id ON public.asset_transaction USING btree (depreciation_run_id) WHERE (depreciation_run_id IS NOT NULL);


--
-- Name: idx_asset_transaction_revaluation_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_transaction_revaluation_id ON public.asset_transaction USING btree (asset_revaluation_id) WHERE (asset_revaluation_id IS NOT NULL);


--
-- Name: idx_asset_transaction_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_transaction_workspace_id ON public.asset_transaction USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_asset_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asset_workspace_id ON public.asset USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_attachment_foreign_key; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_attachment_foreign_key ON public.attachment USING btree (foreign_key);


--
-- Name: idx_attachment_module_key; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_attachment_module_key ON public.attachment USING btree (module_key);


--
-- Name: idx_attachment_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_attachment_workspace_id ON public.attachment USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


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
-- Name: idx_billing_event_parent_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_billing_event_parent_event_id ON public.billing_event USING btree (parent_event_id);


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
-- Name: idx_category_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_category_workspace_id ON public.category USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


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
-- Name: idx_client_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_category_id ON public.client USING btree (category_id);


--
-- Name: idx_client_portal_grant_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_portal_grant_client_id ON public.client_portal_grant USING btree (client_id);


--
-- Name: idx_client_portal_grant_granted_by_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_portal_grant_granted_by_user_id ON public.client_portal_grant USING btree (granted_by_user_id);


--
-- Name: idx_client_portal_grant_role_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_portal_grant_role_id ON public.client_portal_grant USING btree (role_id);


--
-- Name: idx_client_portal_grant_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_portal_grant_user_id ON public.client_portal_grant USING btree (user_id);


--
-- Name: idx_client_portal_grant_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_portal_grant_workspace_id ON public.client_portal_grant USING btree (workspace_id);


--
-- Name: idx_client_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_user_id ON public.client USING btree (user_id);


--
-- Name: idx_client_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_workspace_id ON public.client USING btree (workspace_id);


--
-- Name: idx_client_workspace_user_ws_user_active; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_client_workspace_user_ws_user_active ON public.client_workspace_user USING btree (workspace_id, workspace_user_id, active);


--
-- Name: idx_collection_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_collection_attribute_attribute_id ON public.collection_attribute USING btree (attribute_id);


--
-- Name: idx_collection_attribute_collection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_collection_attribute_collection_id ON public.collection_attribute USING btree (collection_id);


--
-- Name: idx_collection_billing_event_billing_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_collection_billing_event_billing_event_id ON public.collection_billing_event USING btree (billing_event_id);


--
-- Name: idx_collection_billing_event_collection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_collection_billing_event_collection_id ON public.collection_billing_event USING btree (treasury_collection_id);


--
-- Name: idx_collection_billing_event_revenue_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_collection_billing_event_revenue_id ON public.collection_billing_event USING btree (revenue_id);


--
-- Name: idx_collection_billing_event_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_collection_billing_event_workspace_id ON public.collection_billing_event USING btree (workspace_id);


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
-- Name: idx_conversation_assigned_to_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_assigned_to_user ON public.conversation USING btree (assigned_to_user_id);


--
-- Name: idx_conversation_created_by_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_created_by_user_id ON public.conversation USING btree (created_by_user_id);


--
-- Name: idx_conversation_last_post_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_last_post_at ON public.conversation USING btree (last_post_at);


--
-- Name: idx_conversation_participant_conversation_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_participant_conversation_id ON public.conversation_participant USING btree (conversation_id);


--
-- Name: idx_conversation_participant_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_participant_user_id ON public.conversation_participant USING btree (user_id);


--
-- Name: idx_conversation_participant_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_participant_workspace_id ON public.conversation_participant USING btree (workspace_id);


--
-- Name: idx_conversation_post_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_post_client_id ON public.conversation_post USING btree (client_id);


--
-- Name: idx_conversation_post_client_token; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_post_client_token ON public.conversation_post USING btree (client_token);


--
-- Name: idx_conversation_post_conversation_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_post_conversation_id ON public.conversation_post USING btree (conversation_id);


--
-- Name: idx_conversation_post_conversation_sent_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_post_conversation_sent_at ON public.conversation_post USING btree (conversation_id, sent_at);


--
-- Name: idx_conversation_post_sender_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_post_sender_user_id ON public.conversation_post USING btree (sender_user_id);


--
-- Name: idx_conversation_post_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_post_workspace_id ON public.conversation_post USING btree (workspace_id);


--
-- Name: idx_conversation_read_receipt_conversation_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_read_receipt_conversation_id ON public.conversation_read_receipt USING btree (conversation_id);


--
-- Name: idx_conversation_read_receipt_last_read_post_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_read_receipt_last_read_post_id ON public.conversation_read_receipt USING btree (last_read_post_id);


--
-- Name: idx_conversation_read_receipt_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_read_receipt_user_id ON public.conversation_read_receipt USING btree (user_id);


--
-- Name: idx_conversation_read_receipt_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_read_receipt_workspace_id ON public.conversation_read_receipt USING btree (workspace_id);


--
-- Name: idx_conversation_reference_entity_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_reference_entity_id ON public.conversation USING btree (reference_entity_id);


--
-- Name: idx_conversation_workspace_client; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_workspace_client ON public.conversation USING btree (workspace_id, client_id);


--
-- Name: idx_conversation_workspace_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversation_workspace_status ON public.conversation USING btree (workspace_id, status);


--
-- Name: idx_cost_plan_cost_schedule_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_cost_plan_cost_schedule_id ON public.cost_plan USING btree (cost_schedule_id);


--
-- Name: idx_cost_plan_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_cost_plan_supplier_id ON public.cost_plan USING btree (supplier_id);


--
-- Name: idx_cost_plan_supplier_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_cost_plan_supplier_plan_id ON public.cost_plan USING btree (supplier_plan_id);


--
-- Name: idx_cost_plan_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_cost_plan_workspace_id ON public.cost_plan USING btree (workspace_id);


--
-- Name: idx_cost_schedule_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_cost_schedule_location_id ON public.cost_schedule USING btree (location_id);


--
-- Name: idx_cost_schedule_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_cost_schedule_workspace_id ON public.cost_schedule USING btree (workspace_id);


--
-- Name: idx_criteria_option_outcome_criteria_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_criteria_option_outcome_criteria_id ON public.criteria_option USING btree (outcome_criteria_id);


--
-- Name: idx_criteria_option_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_criteria_option_workspace_id ON public.criteria_option USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_criteria_threshold_outcome_criteria_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_criteria_threshold_outcome_criteria_id ON public.criteria_threshold USING btree (outcome_criteria_id);


--
-- Name: idx_criteria_threshold_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_criteria_threshold_workspace_id ON public.criteria_threshold USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


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
-- Name: idx_delegate_client_granted_by_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_client_granted_by_user_id ON public.delegate_client USING btree (granted_by_user_id);


--
-- Name: idx_delegate_client_role_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_client_role_id ON public.delegate_client USING btree (role_id);


--
-- Name: idx_delegate_client_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_client_workspace_id ON public.delegate_client USING btree (workspace_id);


--
-- Name: idx_delegate_supplier_delegate_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_supplier_delegate_id ON public.delegate_supplier USING btree (delegate_id);


--
-- Name: idx_delegate_supplier_granted_by_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_supplier_granted_by_user_id ON public.delegate_supplier USING btree (granted_by_user_id);


--
-- Name: idx_delegate_supplier_role_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_supplier_role_id ON public.delegate_supplier USING btree (role_id);


--
-- Name: idx_delegate_supplier_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_supplier_supplier_id ON public.delegate_supplier USING btree (supplier_id);


--
-- Name: idx_delegate_supplier_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_supplier_workspace_id ON public.delegate_supplier USING btree (workspace_id);


--
-- Name: idx_delegate_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_delegate_user_id ON public.delegate USING btree (user_id);


--
-- Name: idx_depreciation_run_initiated_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_depreciation_run_initiated_at ON public.depreciation_run USING btree (initiated_at DESC);


--
-- Name: idx_depreciation_run_initiator_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_depreciation_run_initiator_id ON public.depreciation_run USING btree (initiator_id);


--
-- Name: idx_depreciation_run_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_depreciation_run_status ON public.depreciation_run USING btree (status);


--
-- Name: idx_depreciation_run_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_depreciation_run_workspace_id ON public.depreciation_run USING btree (workspace_id);


--
-- Name: idx_depreciation_schedule_asset_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_depreciation_schedule_asset_id ON public.depreciation_schedule USING btree (asset_id);


--
-- Name: idx_depreciation_schedule_depreciation_run_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_depreciation_schedule_depreciation_run_id ON public.depreciation_schedule USING btree (depreciation_run_id) WHERE (depreciation_run_id IS NOT NULL);


--
-- Name: idx_depreciation_schedule_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_depreciation_schedule_workspace_id ON public.depreciation_schedule USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_document_template_document_purpose; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_document_template_document_purpose ON public.document_template USING btree (document_purpose);


--
-- Name: idx_document_template_module_key; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_document_template_module_key ON public.document_template USING btree (module_key);


--
-- Name: idx_document_template_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_document_template_workspace_id ON public.document_template USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_equity_account_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_equity_account_account_id ON public.equity_account USING btree (account_id);


--
-- Name: idx_equity_account_workspace_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_equity_account_workspace_user_id ON public.equity_account USING btree (workspace_user_id) WHERE (workspace_user_id IS NOT NULL);


--
-- Name: idx_equity_transaction_equity_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_equity_transaction_equity_account_id ON public.equity_transaction USING btree (equity_account_id);


--
-- Name: idx_equity_transaction_journal_entry_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_equity_transaction_journal_entry_id ON public.equity_transaction USING btree (journal_entry_id);


--
-- Name: idx_evaluation_cycle_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_cycle_id ON public.evaluation USING btree (evaluation_cycle_id) WHERE (evaluation_cycle_id IS NOT NULL);


--
-- Name: idx_evaluation_cycle_member_cycle; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_cycle_member_cycle ON public.evaluation_cycle_member USING btree (evaluation_cycle_id);


--
-- Name: idx_evaluation_cycle_member_workspace_staff; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_cycle_member_workspace_staff ON public.evaluation_cycle_member USING btree (workspace_id, subject_staff_id);


--
-- Name: idx_evaluation_cycle_subscription_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_cycle_subscription_status ON public.evaluation_cycle USING btree (subscription_id, status);


--
-- Name: idx_evaluation_cycle_workspace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_cycle_workspace ON public.evaluation_cycle USING btree (workspace_id);


--
-- Name: idx_evaluation_rating_xjoin; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_rating_xjoin ON public.evaluation USING btree (subject_staff_id, status, submitted_at DESC, id DESC);


--
-- Name: idx_evaluation_response_criteria_version_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_response_criteria_version_id ON public.evaluation_response USING btree (criteria_version_id);


--
-- Name: idx_evaluation_response_evaluation; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_response_evaluation ON public.evaluation_response USING btree (evaluation_id, sequence_order);


--
-- Name: idx_evaluation_response_workspace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_response_workspace ON public.evaluation_response USING btree (workspace_id);


--
-- Name: idx_evaluation_signed_off_by_client_portal_grant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_signed_off_by_client_portal_grant_id ON public.evaluation USING btree (signed_off_by_client_portal_grant_id);


--
-- Name: idx_evaluation_signed_off_by_workspace_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_signed_off_by_workspace_user_id ON public.evaluation USING btree (signed_off_by_workspace_user_id);


--
-- Name: idx_evaluation_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_subscription_id ON public.evaluation USING btree (subscription_id) WHERE (subscription_id IS NOT NULL);


--
-- Name: idx_evaluation_subscription_seat_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_subscription_seat_id ON public.evaluation USING btree (subscription_seat_id) WHERE (subscription_seat_id IS NOT NULL);


--
-- Name: idx_evaluation_template_copied_from_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_template_copied_from_id ON public.evaluation_template USING btree (copied_from_id);


--
-- Name: idx_evaluation_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_template_id ON public.evaluation USING btree (evaluation_template_id) WHERE (evaluation_template_id IS NOT NULL);


--
-- Name: idx_evaluation_template_item_template; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_template_item_template ON public.evaluation_template_item USING btree (evaluation_template_id, sequence_order);


--
-- Name: idx_evaluation_template_item_workspace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_template_item_workspace ON public.evaluation_template_item USING btree (workspace_id);


--
-- Name: idx_evaluation_template_workspace_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_template_workspace_status ON public.evaluation_template USING btree (workspace_id, status);


--
-- Name: idx_evaluation_workspace_client; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_evaluation_workspace_client ON public.evaluation USING btree (workspace_id, client_id);


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
-- Name: idx_expenditure_cost_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_cost_plan_id ON public.expenditure USING btree (cost_plan_id);


--
-- Name: idx_expenditure_cycle_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_cycle_date ON public.expenditure USING btree (cycle_date);


--
-- Name: idx_expenditure_expense_recognition_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_expense_recognition_id ON public.expenditure USING btree (expense_recognition_id);


--
-- Name: idx_expenditure_fund_transaction_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_fund_transaction_id ON public.expenditure USING btree (fund_transaction_id) WHERE (fund_transaction_id IS NOT NULL);


--
-- Name: idx_expenditure_line_item_expenditure_line_kind; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_line_item_expenditure_line_kind ON public.expenditure_line_item USING btree (expenditure_id, line_kind);


--
-- Name: idx_expenditure_line_item_inventory_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_line_item_inventory_item_id ON public.expenditure_line_item USING btree (inventory_item_id);


--
-- Name: idx_expenditure_line_item_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_line_item_location_id ON public.expenditure_line_item USING btree (location_id);


--
-- Name: idx_expenditure_line_item_pay_cycle_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_line_item_pay_cycle_id ON public.expenditure_line_item USING btree (pay_cycle_id);


--
-- Name: idx_expenditure_line_item_purchase_order_line_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_line_item_purchase_order_line_item_id ON public.expenditure_line_item USING btree (purchase_order_line_item_id);


--
-- Name: idx_expenditure_line_item_supplier_contract_line_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_line_item_supplier_contract_line_id ON public.expenditure_line_item USING btree (supplier_contract_line_id);


--
-- Name: idx_expenditure_line_item_supplier_product_cost_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_line_item_supplier_product_cost_plan_id ON public.expenditure_line_item USING btree (supplier_product_cost_plan_id);


--
-- Name: idx_expenditure_petty_cash_fund_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_petty_cash_fund_id ON public.expenditure USING btree (petty_cash_fund_id);


--
-- Name: idx_expenditure_purchase_order_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_purchase_order_id ON public.expenditure USING btree (purchase_order_id);


--
-- Name: idx_expenditure_run_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_run_id ON public.expenditure USING btree (run_id) WHERE (run_id IS NOT NULL);


--
-- Name: idx_expenditure_source; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_source ON public.expenditure USING btree (source);


--
-- Name: idx_expenditure_supplier_contract_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_supplier_contract_id ON public.expenditure USING btree (supplier_contract_id);


--
-- Name: idx_expenditure_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_supplier_id ON public.expenditure USING btree (supplier_id);


--
-- Name: idx_expenditure_supplier_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_supplier_subscription_id ON public.expenditure USING btree (supplier_subscription_id);


--
-- Name: idx_expenditure_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expenditure_workspace_id ON public.expenditure USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_expense_recognition_accrual_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_accrual_account_id ON public.expense_recognition USING btree (accrual_account_id);


--
-- Name: idx_expense_recognition_accrued_expense_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_accrued_expense_id ON public.expense_recognition USING btree (accrued_expense_id);


--
-- Name: idx_expense_recognition_advance_disbursement_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_advance_disbursement_id ON public.expense_recognition USING btree (advance_disbursement_id) WHERE (advance_disbursement_id IS NOT NULL);


--
-- Name: idx_expense_recognition_expenditure_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_expenditure_category_id ON public.expense_recognition USING btree (expenditure_category_id);


--
-- Name: idx_expense_recognition_expenditure_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_expenditure_id ON public.expense_recognition USING btree (expenditure_id);


--
-- Name: idx_expense_recognition_expense_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_expense_account_id ON public.expense_recognition USING btree (expense_account_id);


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
-- Name: idx_expense_recognition_line_supplier_product_cost_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_line_supplier_product_cost_plan_id ON public.expense_recognition_line USING btree (supplier_product_cost_plan_id);


--
-- Name: idx_expense_recognition_line_supplier_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_line_supplier_subscription_id ON public.expense_recognition_line USING btree (supplier_subscription_id);


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
-- Name: idx_expense_recognition_run_as_of_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_run_as_of_date ON public.expense_recognition_run USING btree (as_of_date);


--
-- Name: idx_expense_recognition_run_attempt_advance_disbursement_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_run_attempt_advance_disbursement_id ON public.expense_recognition_run_attempt USING btree (advance_disbursement_id);


--
-- Name: idx_expense_recognition_run_attempt_expenditure_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_run_attempt_expenditure_id ON public.expense_recognition_run_attempt USING btree (expenditure_id);


--
-- Name: idx_expense_recognition_run_attempt_expense_recognition_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_run_attempt_expense_recognition_id ON public.expense_recognition_run_attempt USING btree (expense_recognition_id);


--
-- Name: idx_expense_recognition_run_attempt_outcome; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_run_attempt_outcome ON public.expense_recognition_run_attempt USING btree (outcome);


--
-- Name: idx_expense_recognition_run_attempt_run_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_run_attempt_run_id ON public.expense_recognition_run_attempt USING btree (run_id);


--
-- Name: idx_expense_recognition_run_attempt_supplier_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_run_attempt_supplier_subscription_id ON public.expense_recognition_run_attempt USING btree (supplier_subscription_id);


--
-- Name: idx_expense_recognition_run_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_run_id ON public.expense_recognition USING btree (run_id) WHERE (run_id IS NOT NULL);


--
-- Name: idx_expense_recognition_run_initiated_by; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_run_initiated_by ON public.expense_recognition_run USING btree (initiated_by);


--
-- Name: idx_expense_recognition_run_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_run_status ON public.expense_recognition_run USING btree (status);


--
-- Name: idx_expense_recognition_run_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_run_supplier_id ON public.expense_recognition_run USING btree (supplier_id);


--
-- Name: idx_expense_recognition_run_supplier_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_run_supplier_subscription_id ON public.expense_recognition_run USING btree (supplier_subscription_id);


--
-- Name: idx_expense_recognition_run_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_run_workspace_id ON public.expense_recognition_run USING btree (workspace_id);


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
-- Name: idx_expense_recognition_supplier_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_supplier_subscription_id ON public.expense_recognition USING btree (supplier_subscription_id);


--
-- Name: idx_expense_recognition_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_recognition_workspace_id ON public.expense_recognition USING btree (workspace_id);


--
-- Name: idx_fiscal_period_fiscal_year; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fiscal_period_fiscal_year ON public.fiscal_period USING btree (fiscal_year);


--
-- Name: idx_forex_rate_active_pair_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_forex_rate_active_pair_unique ON public.forex_rate USING btree (workspace_id, from_currency, to_currency) WHERE (status = 2);


--
-- Name: idx_forex_rate_pair_lookup; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_forex_rate_pair_lookup ON public.forex_rate USING btree (workspace_id, from_currency, to_currency, effective_from) WHERE (status = ANY (ARRAY[2, 3]));


--
-- Name: idx_forex_rate_supersedes; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_forex_rate_supersedes ON public.forex_rate USING btree (supersedes_id) WHERE (supersedes_id IS NOT NULL);


--
-- Name: idx_forex_rate_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_forex_rate_user ON public.forex_rate USING btree (created_by_user_id) WHERE (created_by_user_id IS NOT NULL);


--
-- Name: idx_forex_rate_workspace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_forex_rate_workspace ON public.forex_rate USING btree (workspace_id);


--
-- Name: idx_fulfillment_expenditure_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_expenditure_id ON public.fulfillment USING btree (expenditure_id);


--
-- Name: idx_fulfillment_item_fulfillment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_item_fulfillment_id ON public.fulfillment_item USING btree (fulfillment_id);


--
-- Name: idx_fulfillment_item_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_item_product_id ON public.fulfillment_item USING btree (product_id);


--
-- Name: idx_fulfillment_item_revenue_line_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_item_revenue_line_item_id ON public.fulfillment_item USING btree (revenue_line_item_id);


--
-- Name: idx_fulfillment_return_fulfillment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_return_fulfillment_id ON public.fulfillment_return USING btree (fulfillment_id);


--
-- Name: idx_fulfillment_return_item_fulfillment_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_return_item_fulfillment_item_id ON public.fulfillment_return_item USING btree (fulfillment_item_id);


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
-- Name: idx_fulfillment_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_supplier_id ON public.fulfillment USING btree (supplier_id);


--
-- Name: idx_fulfillment_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fulfillment_workspace_id ON public.fulfillment USING btree (workspace_id);


--
-- Name: idx_fund_allocation_approved_by_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_allocation_approved_by_user_id ON public.fund_allocation USING btree (approved_by_user_id);


--
-- Name: idx_fund_allocation_default_cash_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_allocation_default_cash_account_id ON public.fund_allocation USING btree (default_cash_account_id) WHERE (default_cash_account_id IS NOT NULL);


--
-- Name: idx_fund_allocation_fund_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_allocation_fund_id ON public.fund_allocation USING btree (fund_id);


--
-- Name: idx_fund_allocation_payable_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_allocation_payable_account_id ON public.fund_allocation USING btree (payable_account_id) WHERE (payable_account_id IS NOT NULL);


--
-- Name: idx_fund_allocation_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_allocation_workspace_id ON public.fund_allocation USING btree (workspace_id);


--
-- Name: idx_fund_gl_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_gl_account_id ON public.fund USING btree (gl_account_id) WHERE (gl_account_id IS NOT NULL);


--
-- Name: idx_fund_kind; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_kind ON public.fund USING btree (kind);


--
-- Name: idx_fund_linked_by_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_linked_by_user_id ON public.fund USING btree (linked_by_user_id) WHERE (linked_by_user_id IS NOT NULL);


--
-- Name: idx_fund_owner_party_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_owner_party_id ON public.fund USING btree (owner_party_id);


--
-- Name: idx_fund_owner_party_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_owner_party_type ON public.fund USING btree (owner_party_type);


--
-- Name: idx_fund_petty_custodian_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_petty_custodian_user_id ON public.fund USING btree (petty_custodian_user_id) WHERE (petty_custodian_user_id IS NOT NULL);


--
-- Name: idx_fund_petty_source_fund_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_petty_source_fund_id ON public.fund USING btree (petty_source_fund_id) WHERE (petty_source_fund_id IS NOT NULL);


--
-- Name: idx_fund_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_status ON public.fund USING btree (status);


--
-- Name: idx_fund_transaction_allocation_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_transaction_allocation_id ON public.fund_transaction USING btree (allocation_id) WHERE (allocation_id IS NOT NULL);


--
-- Name: idx_fund_transaction_allocation_status_posted; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_transaction_allocation_status_posted ON public.fund_transaction USING btree (allocation_id, status, posted_at) WHERE (allocation_id IS NOT NULL);


--
-- Name: idx_fund_transaction_collection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_transaction_collection_id ON public.fund_transaction USING btree (collection_id);


--
-- Name: idx_fund_transaction_created_by_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_transaction_created_by_user_id ON public.fund_transaction USING btree (created_by_user_id);


--
-- Name: idx_fund_transaction_disbursement_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_transaction_disbursement_id ON public.fund_transaction USING btree (disbursement_id);


--
-- Name: idx_fund_transaction_expenditure_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_transaction_expenditure_id ON public.fund_transaction USING btree (expenditure_id);


--
-- Name: idx_fund_transaction_fund_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_transaction_fund_id ON public.fund_transaction USING btree (fund_id);


--
-- Name: idx_fund_transaction_fund_status_posted; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_transaction_fund_status_posted ON public.fund_transaction USING btree (fund_id, status, posted_at);


--
-- Name: idx_fund_transaction_journal_entry_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_transaction_journal_entry_id ON public.fund_transaction USING btree (journal_entry_id) WHERE (journal_entry_id IS NOT NULL);


--
-- Name: idx_fund_transaction_reverses_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_transaction_reverses_id ON public.fund_transaction USING btree (reverses_id);


--
-- Name: idx_fund_transaction_transfer_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_transaction_transfer_id ON public.fund_transaction USING btree (transfer_id) WHERE (transfer_id IS NOT NULL);


--
-- Name: idx_fund_transaction_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fund_transaction_workspace_id ON public.fund_transaction USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


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
-- Name: idx_inventory_attribute_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_attribute_workspace_id ON public.inventory_attribute USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_inventory_depreciation_inventory_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_depreciation_inventory_item_id ON public.inventory_depreciation USING btree (inventory_item_id);


--
-- Name: idx_inventory_depreciation_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_depreciation_workspace_id ON public.inventory_depreciation USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_inventory_item_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_item_workspace_id ON public.inventory_item USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_inventory_movement_from_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_movement_from_location_id ON public.inventory_movement USING btree (from_location_id);


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
-- Name: idx_inventory_movement_to_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_movement_to_location_id ON public.inventory_movement USING btree (to_location_id);


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
-- Name: idx_inventory_serial_history_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_serial_history_workspace_id ON public.inventory_serial_history USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_inventory_serial_inventory_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_serial_inventory_item_id ON public.inventory_serial USING btree (inventory_item_id);


--
-- Name: idx_inventory_serial_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_inventory_serial_workspace_id ON public.inventory_serial USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


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
-- Name: idx_job_activity_reversal_of_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_activity_reversal_of_id ON public.job_activity USING btree (reversal_of_id);


--
-- Name: idx_job_activity_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_activity_workspace_id ON public.job_activity USING btree (workspace_id);


--
-- Name: idx_job_category_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_category_code ON public.job_category USING btree (code);


--
-- Name: idx_job_category_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_category_workspace_id ON public.job_category USING btree (workspace_id);


--
-- Name: idx_job_change_request_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_change_request_id ON public.job USING btree (change_request_id) WHERE (change_request_id IS NOT NULL);


--
-- Name: idx_job_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_client_id ON public.job USING btree (client_id);


--
-- Name: idx_job_cost_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_cost_account_id ON public.job USING btree (cost_account_id) WHERE (cost_account_id IS NOT NULL);


--
-- Name: idx_job_job_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_job_category_id ON public.job USING btree (job_category_id);


--
-- Name: idx_job_job_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_job_template_id ON public.job USING btree (job_template_id);


--
-- Name: idx_job_job_template_revision_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_job_template_revision_id ON public.job USING btree (job_template_revision_id) WHERE (job_template_revision_id IS NOT NULL);


--
-- Name: idx_job_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_location_id ON public.job USING btree (location_id);


--
-- Name: idx_job_origin_active_children; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_origin_active_children ON public.job USING btree (origin_type, origin_id) WHERE ((parent_job_id IS NOT NULL) AND (active = true));


--
-- Name: idx_job_outcome_summary_document_template_document_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_outcome_summary_document_template_document_template_id ON public.job_outcome_summary_document_template USING btree (document_template_id);


--
-- Name: idx_job_outcome_summary_document_template_price_schedule_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_outcome_summary_document_template_price_schedule_id ON public.job_outcome_summary_document_template USING btree (price_schedule_id);


--
-- Name: idx_job_outcome_summary_document_template_supersedes_binding_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_outcome_summary_document_template_supersedes_binding_id ON public.job_outcome_summary_document_template USING btree (supersedes_binding_id);


--
-- Name: idx_job_outcome_summary_document_template_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_outcome_summary_document_template_workspace_id ON public.job_outcome_summary_document_template USING btree (workspace_id);


--
-- Name: idx_job_outcome_summary_issued_by; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_outcome_summary_issued_by ON public.job_outcome_summary USING btree (issued_by);


--
-- Name: idx_job_outcome_summary_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_outcome_summary_job_id ON public.job_outcome_summary USING btree (job_id);


--
-- Name: idx_job_outcome_summary_supersedes_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_outcome_summary_supersedes_id ON public.job_outcome_summary USING btree (supersedes_id);


--
-- Name: idx_job_output_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_output_product_id ON public.job USING btree (output_product_id) WHERE (output_product_id IS NOT NULL);


--
-- Name: idx_job_output_product_variant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_output_product_variant_id ON public.job USING btree (output_product_variant_id) WHERE (output_product_variant_id IS NOT NULL);


--
-- Name: idx_job_parent_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_parent_job_id ON public.job USING btree (parent_job_id);


--
-- Name: idx_job_phase_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_phase_job_id ON public.job_phase USING btree (job_id);


--
-- Name: idx_job_phase_predecessor_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_phase_predecessor_phase_id ON public.job_phase USING btree (predecessor_phase_id);


--
-- Name: idx_job_phase_resource_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_phase_resource_id ON public.job_phase USING btree (resource_id) WHERE (resource_id IS NOT NULL);


--
-- Name: idx_job_phase_scoring_scheme_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_phase_scoring_scheme_id ON public.job_phase USING btree (scoring_scheme_id);


--
-- Name: idx_job_phase_template_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_phase_template_phase_id ON public.job_phase USING btree (template_phase_id) WHERE (template_phase_id IS NOT NULL);


--
-- Name: idx_job_phase_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_phase_workspace_id ON public.job_phase USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_job_resource_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_resource_id ON public.job USING btree (resource_id) WHERE (resource_id IS NOT NULL);


--
-- Name: idx_job_sales_order_line_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_sales_order_line_id ON public.job USING btree (sales_order_line_id) WHERE (sales_order_line_id IS NOT NULL);


--
-- Name: idx_job_settlement_job_activity_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_settlement_job_activity_id ON public.job_settlement USING btree (job_activity_id);


--
-- Name: idx_job_settlement_reversal_of_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_settlement_reversal_of_id ON public.job_settlement USING btree (reversal_of_id);


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
-- Name: idx_job_task_resource_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_task_resource_id ON public.job_task USING btree (resource_id) WHERE (resource_id IS NOT NULL);


--
-- Name: idx_job_task_template_task_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_task_template_task_id ON public.job_task USING btree (template_task_id) WHERE (template_task_id IS NOT NULL);


--
-- Name: idx_job_task_workflow_step_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_task_workflow_step_id ON public.job_task USING btree (workflow_step_id) WHERE (workflow_step_id IS NOT NULL);


--
-- Name: idx_job_task_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_task_workspace_id ON public.job_task USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_job_template_change_request_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_change_request_id ON public.job_template USING btree (change_request_id) WHERE (change_request_id IS NOT NULL);


--
-- Name: idx_job_template_document_template_document_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_document_template_document_template_id ON public.job_template_document_template USING btree (document_template_id);


--
-- Name: idx_job_template_document_template_job_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_document_template_job_category_id ON public.job_template_document_template USING btree (job_category_id);


--
-- Name: idx_job_template_document_template_price_schedule_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_document_template_price_schedule_id ON public.job_template_document_template USING btree (price_schedule_id);


--
-- Name: idx_job_template_document_template_supersedes_binding_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_document_template_supersedes_binding_id ON public.job_template_document_template USING btree (supersedes_binding_id);


--
-- Name: idx_job_template_document_template_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_document_template_workspace_id ON public.job_template_document_template USING btree (workspace_id);


--
-- Name: idx_job_template_job_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_job_category_id ON public.job_template USING btree (job_category_id);


--
-- Name: idx_job_template_output_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_output_product_id ON public.job_template USING btree (output_product_id) WHERE (output_product_id IS NOT NULL);


--
-- Name: idx_job_template_output_product_variant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_output_product_variant_id ON public.job_template USING btree (output_product_variant_id) WHERE (output_product_variant_id IS NOT NULL);


--
-- Name: idx_job_template_phase_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_phase_code ON public.job_template_phase USING btree (code);


--
-- Name: idx_job_template_phase_job_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_phase_job_template_id ON public.job_template_phase USING btree (job_template_id);


--
-- Name: idx_job_template_phase_predecessor_template_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_phase_predecessor_template_phase_id ON public.job_template_phase USING btree (predecessor_template_phase_id);


--
-- Name: idx_job_template_phase_resource_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_phase_resource_id ON public.job_template_phase USING btree (resource_id) WHERE (resource_id IS NOT NULL);


--
-- Name: idx_job_template_phase_scoring_scheme_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_phase_scoring_scheme_id ON public.job_template_phase USING btree (scoring_scheme_id);


--
-- Name: idx_job_template_phase_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_phase_workspace_id ON public.job_template_phase USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_job_template_relation_child_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_relation_child_template_id ON public.job_template_relation USING btree (child_template_id);


--
-- Name: idx_job_template_relation_parent_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_relation_parent_template_id ON public.job_template_relation USING btree (parent_template_id);


--
-- Name: idx_job_template_relation_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_relation_workspace_id ON public.job_template_relation USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_job_template_supersedes_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_supersedes_template_id ON public.job_template USING btree (supersedes_template_id);


--
-- Name: idx_job_template_task_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_task_code ON public.job_template_task USING btree (code);


--
-- Name: idx_job_template_task_instruction_doc_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_task_instruction_doc_id ON public.job_template_task USING btree (instruction_doc_id) WHERE (instruction_doc_id IS NOT NULL);


--
-- Name: idx_job_template_task_job_template_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_task_job_template_phase_id ON public.job_template_task USING btree (job_template_phase_id);


--
-- Name: idx_job_template_task_resource_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_task_resource_id ON public.job_template_task USING btree (resource_id) WHERE (resource_id IS NOT NULL);


--
-- Name: idx_job_template_task_workflow_step_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_task_workflow_step_id ON public.job_template_task USING btree (workflow_step_id) WHERE (workflow_step_id IS NOT NULL);


--
-- Name: idx_job_template_task_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_task_workspace_id ON public.job_template_task USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_job_template_template_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_template_code ON public.job_template USING btree (template_code) WHERE (template_code IS NOT NULL);


--
-- Name: idx_job_template_workflow_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_workflow_template_id ON public.job_template USING btree (workflow_template_id) WHERE (workflow_template_id IS NOT NULL);


--
-- Name: idx_job_template_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_template_workspace_id ON public.job_template USING btree (workspace_id);


--
-- Name: idx_job_usage_request_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_usage_request_date ON public.job USING btree (origin_id, usage_request_date) WHERE (usage_request_date IS NOT NULL);


--
-- Name: idx_job_workflow_instance_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_job_workflow_instance_id ON public.job USING btree (workflow_instance_id) WHERE (workflow_instance_id IS NOT NULL);


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
-- Name: idx_journal_entry_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_journal_entry_workspace_id ON public.journal_entry USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


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
-- Name: idx_line_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_line_workspace_id ON public.line USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


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
-- Name: idx_outcome_criteria_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_outcome_criteria_code ON public.outcome_criteria USING btree (code);


--
-- Name: idx_outcome_criteria_code_domain; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_outcome_criteria_code_domain ON public.outcome_criteria USING btree (scope, COALESCE(workspace_id, ''::text), COALESCE(industry_code, ''::text), code) WHERE (code IS NOT NULL);


--
-- Name: idx_outcome_criteria_criteria_group_id_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_outcome_criteria_criteria_group_id_code ON public.outcome_criteria USING btree (criteria_group_id, code);


--
-- Name: idx_outcome_criteria_overrides_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_outcome_criteria_overrides_id ON public.outcome_criteria USING btree (overrides_id);


--
-- Name: idx_outcome_criteria_supersedes_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_outcome_criteria_supersedes_id ON public.outcome_criteria USING btree (supersedes_id);


--
-- Name: idx_outcome_criteria_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_outcome_criteria_workspace_id ON public.outcome_criteria USING btree (workspace_id);


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
-- Name: idx_phase_outcome_summary_issued_by; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_phase_outcome_summary_issued_by ON public.phase_outcome_summary USING btree (issued_by);


--
-- Name: idx_phase_outcome_summary_job_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_phase_outcome_summary_job_id ON public.phase_outcome_summary USING btree (job_id);


--
-- Name: idx_phase_outcome_summary_job_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_phase_outcome_summary_job_phase_id ON public.phase_outcome_summary USING btree (job_phase_id);


--
-- Name: idx_phase_outcome_summary_supersedes_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_phase_outcome_summary_supersedes_id ON public.phase_outcome_summary USING btree (supersedes_id);


--
-- Name: idx_phase_outcome_summary_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_phase_outcome_summary_workspace_id ON public.phase_outcome_summary USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


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
-- Name: idx_plan_job_template_job_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_plan_job_template_job_template_id ON public.plan_job_template USING btree (job_template_id);


--
-- Name: idx_plan_job_template_plan_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_plan_job_template_plan_order ON public.plan_job_template USING btree (workspace_id, plan_id, sequence_order, id) WHERE (active = true);


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
-- Name: idx_ppp_tax_treatment; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_ppp_tax_treatment ON public.product_price_plan USING btree (tax_treatment_id) WHERE (tax_treatment_id IS NOT NULL);


--
-- Name: idx_ppp_withholding_class; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_ppp_withholding_class ON public.product_price_plan USING btree (withholding_class_id) WHERE (withholding_class_id IS NOT NULL);


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
-- Name: idx_procurement_request_spawned_supplier_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_procurement_request_spawned_supplier_subscription_id ON public.procurement_request USING btree (spawned_supplier_subscription_id);


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
-- Name: idx_product_tax_treatment; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_tax_treatment ON public.product USING btree (tax_treatment_id) WHERE (tax_treatment_id IS NOT NULL);


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
-- Name: idx_product_withholding_class; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_withholding_class ON public.product USING btree (withholding_class_id) WHERE (withholding_class_id IS NOT NULL);


--
-- Name: idx_product_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_workspace_id ON public.product USING btree (workspace_id);


--
-- Name: idx_purchase_order_line_item_inventory_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_purchase_order_line_item_inventory_item_id ON public.purchase_order_line_item USING btree (inventory_item_id);


--
-- Name: idx_purchase_order_line_item_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_purchase_order_line_item_location_id ON public.purchase_order_line_item USING btree (location_id);


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
-- Name: idx_purchase_order_parent_po_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_purchase_order_parent_po_id ON public.purchase_order USING btree (parent_po_id);


--
-- Name: idx_purchase_order_payment_term_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_purchase_order_payment_term_id ON public.purchase_order USING btree (payment_term_id);


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
-- Name: idx_purchase_order_supplier_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_purchase_order_supplier_subscription_id ON public.purchase_order USING btree (supplier_subscription_id);


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
-- Name: idx_revenue_advance_collection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_advance_collection_id ON public.revenue USING btree (advance_collection_id) WHERE (advance_collection_id IS NOT NULL);


--
-- Name: idx_revenue_advance_period_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_revenue_advance_period_unique ON public.revenue USING btree (advance_collection_id, period_marker) WHERE ((advance_collection_id IS NOT NULL) AND (period_marker IS NOT NULL) AND (status <> 'cancelled'::text));


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
-- Name: idx_revenue_line_item_subscription_seat_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_line_item_subscription_seat_id ON public.revenue_line_item USING btree (subscription_seat_id);


--
-- Name: idx_revenue_run_attempt_advance_collection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_run_attempt_advance_collection_id ON public.revenue_run_attempt USING btree (advance_collection_id) WHERE (advance_collection_id IS NOT NULL);


--
-- Name: idx_revenue_run_attempt_revenue_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_run_attempt_revenue_id ON public.revenue_run_attempt USING btree (revenue_id);


--
-- Name: idx_revenue_run_attempt_run_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_run_attempt_run_id ON public.revenue_run_attempt USING btree (run_id);


--
-- Name: idx_revenue_run_attempt_source_kind; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_run_attempt_source_kind ON public.revenue_run_attempt USING btree (source_kind);


--
-- Name: idx_revenue_run_attempt_subscription_attempted; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_run_attempt_subscription_attempted ON public.revenue_run_attempt USING btree (subscription_id, attempted_at DESC);


--
-- Name: idx_revenue_run_client_initiated; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_run_client_initiated ON public.revenue_run USING btree (client_id, initiated_at DESC);


--
-- Name: idx_revenue_run_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_run_id ON public.revenue USING btree (run_id) WHERE (run_id IS NOT NULL);


--
-- Name: idx_revenue_run_initiated_by; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_run_initiated_by ON public.revenue_run USING btree (initiated_by);


--
-- Name: idx_revenue_run_subscription_initiated; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_run_subscription_initiated ON public.revenue_run USING btree (subscription_id, initiated_at DESC);


--
-- Name: idx_revenue_run_workspace_status_initiated; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_run_workspace_status_initiated ON public.revenue_run USING btree (workspace_id, status, initiated_at DESC);


--
-- Name: idx_revenue_subscription_period_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_revenue_subscription_period_unique ON public.revenue USING btree (subscription_id, period_marker) WHERE ((status <> 'cancelled'::text) AND (subscription_id IS NOT NULL) AND (period_marker IS NOT NULL));


--
-- Name: idx_revenue_tax_line_revenue; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_tax_line_revenue ON public.revenue_tax_line USING btree (revenue_id);


--
-- Name: idx_revenue_tax_line_source_registration; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_tax_line_source_registration ON public.revenue_tax_line USING btree (source_registration_id_snapshot);


--
-- Name: idx_revenue_tax_line_tax_rate; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_tax_line_tax_rate ON public.revenue_tax_line USING btree (tax_rate_id) WHERE (tax_rate_id IS NOT NULL);


--
-- Name: idx_revenue_tax_line_workspace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_revenue_tax_line_workspace ON public.revenue_tax_line USING btree (workspace_id);


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
-- Name: idx_score_scale_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_score_scale_workspace_id ON public.score_scale USING btree (workspace_id);


--
-- Name: idx_scoring_component_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scoring_component_workspace_id ON public.scoring_component USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_scoring_scheme_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scoring_scheme_workspace_id ON public.scoring_scheme USING btree (workspace_id);


--
-- Name: idx_session_acting_as_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_session_acting_as_workspace_id ON public.session USING btree (acting_as_workspace_id);


--
-- Name: idx_session_token; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_session_token ON public.session USING btree (token);


--
-- Name: idx_session_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_session_user_id ON public.session USING btree (user_id);


--
-- Name: idx_sgdt_document_template; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sgdt_document_template ON public.subscription_group_document_template USING btree (document_template_id);


--
-- Name: idx_sgdt_job_category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sgdt_job_category ON public.subscription_group_document_template USING btree (job_category_id);


--
-- Name: idx_sgdt_plan; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sgdt_plan ON public.subscription_group_document_template USING btree (plan_id);


--
-- Name: idx_sgdt_price_schedule; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sgdt_price_schedule ON public.subscription_group_document_template USING btree (price_schedule_id);


--
-- Name: idx_sgdt_render_profile; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sgdt_render_profile ON public.subscription_group_document_template USING btree (render_profile);


--
-- Name: idx_sgdt_resolve; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sgdt_resolve ON public.subscription_group_document_template USING btree (workspace_id, render_profile, job_category_id, plan_id, price_schedule_id, version DESC) WHERE ((active = true) AND (version_status = 'VERSION_STATUS_PUBLISHED'::text));


--
-- Name: idx_sgdt_supersedes; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sgdt_supersedes ON public.subscription_group_document_template USING btree (supersedes_binding_id);


--
-- Name: idx_sgdt_workspace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sgdt_workspace ON public.subscription_group_document_template USING btree (workspace_id);


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
-- Name: idx_staff_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_staff_workspace_id ON public.staff USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


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
-- Name: idx_subscription_group_product_plan_job_template_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_group_product_plan_job_template_id ON public.subscription_group_product_plan USING btree (job_template_id);


--
-- Name: idx_subscription_group_product_plan_product_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_group_product_plan_product_plan_id ON public.subscription_group_product_plan USING btree (product_plan_id);


--
-- Name: idx_subscription_group_product_plan_staff_job_template_phase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_group_product_plan_staff_job_template_phase_id ON public.subscription_group_product_plan_staff USING btree (job_template_phase_id);


--
-- Name: idx_subscription_group_product_plan_staff_product_plan_staff_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_group_product_plan_staff_product_plan_staff_id ON public.subscription_group_product_plan_staff USING btree (product_plan_staff_id);


--
-- Name: idx_subscription_group_product_plan_staff_subscription_group_pr; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_group_product_plan_staff_subscription_group_pr ON public.subscription_group_product_plan_staff USING btree (subscription_group_product_plan_id);


--
-- Name: idx_subscription_group_product_plan_subscription_group_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_group_product_plan_subscription_group_id ON public.subscription_group_product_plan USING btree (subscription_group_id);


--
-- Name: idx_subscription_group_product_plan_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_group_product_plan_workspace_id ON public.subscription_group_product_plan USING btree (workspace_id);


--
-- Name: idx_subscription_price_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_price_plan_id ON public.subscription USING btree (price_plan_id);


--
-- Name: idx_subscription_seat_product_variant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_seat_product_variant_id ON public.subscription_seat USING btree (product_variant_id);


--
-- Name: idx_subscription_seat_replaces_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_seat_replaces_id ON public.subscription_seat USING btree (replaces_id);


--
-- Name: idx_subscription_seat_staff_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_seat_staff_id ON public.subscription_seat USING btree (staff_id);


--
-- Name: idx_subscription_seat_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_seat_subscription_id ON public.subscription_seat USING btree (subscription_id);


--
-- Name: idx_subscription_seat_workspace_client; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_seat_workspace_client ON public.subscription_seat USING btree (workspace_id, client_id);


--
-- Name: idx_subscription_seat_workspace_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_seat_workspace_status ON public.subscription_seat USING btree (workspace_id, status);


--
-- Name: idx_subscription_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_workspace_id ON public.subscription USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_subscription_workspace_user_client_id_workspace_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_workspace_user_client_id_workspace_user_id ON public.subscription_workspace_user USING btree (client_id, workspace_user_id);


--
-- Name: idx_subscription_workspace_user_subscription_active; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_workspace_user_subscription_active ON public.subscription_workspace_user USING btree (subscription_id, active);


--
-- Name: idx_subscription_workspace_user_ws_user_active; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_subscription_workspace_user_ws_user_active ON public.subscription_workspace_user USING btree (workspace_id, workspace_user_id, active);


--
-- Name: idx_supplier_attribute_attribute_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_attribute_attribute_id ON public.supplier_attribute USING btree (attribute_id);


--
-- Name: idx_supplier_attribute_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_attribute_supplier_id ON public.supplier_attribute USING btree (supplier_id);


--
-- Name: idx_supplier_billing_event_expense_recognition_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_billing_event_expense_recognition_id ON public.supplier_billing_event USING btree (expense_recognition_id);


--
-- Name: idx_supplier_billing_event_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_billing_event_status ON public.supplier_billing_event USING btree (status);


--
-- Name: idx_supplier_billing_event_supplier_contract_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_billing_event_supplier_contract_id ON public.supplier_billing_event USING btree (supplier_contract_id);


--
-- Name: idx_supplier_billing_event_supplier_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_billing_event_supplier_subscription_id ON public.supplier_billing_event USING btree (supplier_subscription_id);


--
-- Name: idx_supplier_billing_event_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_billing_event_workspace_id ON public.supplier_billing_event USING btree (workspace_id);


--
-- Name: idx_supplier_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_category_id ON public.supplier USING btree (category_id);


--
-- Name: idx_supplier_category_pair; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_supplier_category_pair ON public.supplier_category USING btree (supplier_id, category_id);


--
-- Name: idx_supplier_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_client_id ON public.supplier USING btree (client_id);


--
-- Name: idx_supplier_contract_accrual_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_contract_accrual_account_id ON public.supplier_contract USING btree (accrual_account_id);


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
-- Name: idx_supplier_payment_term_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_payment_term_id ON public.supplier USING btree (payment_term_id);


--
-- Name: idx_supplier_plan_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_plan_supplier_id ON public.supplier_plan USING btree (supplier_id);


--
-- Name: idx_supplier_plan_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_plan_workspace_id ON public.supplier_plan USING btree (workspace_id);


--
-- Name: idx_supplier_portal_grant_granted_by_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_portal_grant_granted_by_user_id ON public.supplier_portal_grant USING btree (granted_by_user_id);


--
-- Name: idx_supplier_portal_grant_role_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_portal_grant_role_id ON public.supplier_portal_grant USING btree (role_id);


--
-- Name: idx_supplier_portal_grant_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_portal_grant_supplier_id ON public.supplier_portal_grant USING btree (supplier_id);


--
-- Name: idx_supplier_portal_grant_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_portal_grant_user_id ON public.supplier_portal_grant USING btree (user_id);


--
-- Name: idx_supplier_portal_grant_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_portal_grant_workspace_id ON public.supplier_portal_grant USING btree (workspace_id);


--
-- Name: idx_supplier_product_cost_plan_cost_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_product_cost_plan_cost_plan_id ON public.supplier_product_cost_plan USING btree (cost_plan_id);


--
-- Name: idx_supplier_product_cost_plan_supplier_product_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_product_cost_plan_supplier_product_plan_id ON public.supplier_product_cost_plan USING btree (supplier_product_plan_id);


--
-- Name: idx_supplier_product_plan_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_product_plan_product_id ON public.supplier_product_plan USING btree (product_id);


--
-- Name: idx_supplier_product_plan_product_variant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_product_plan_product_variant_id ON public.supplier_product_plan USING btree (product_variant_id);


--
-- Name: idx_supplier_product_plan_supplier_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_product_plan_supplier_plan_id ON public.supplier_product_plan USING btree (supplier_plan_id);


--
-- Name: idx_supplier_subscription_active_workspace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_subscription_active_workspace ON public.supplier_subscription USING btree (workspace_id, active);


--
-- Name: idx_supplier_subscription_cost_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_subscription_cost_plan_id ON public.supplier_subscription USING btree (cost_plan_id);


--
-- Name: idx_supplier_subscription_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_subscription_location_id ON public.supplier_subscription USING btree (location_id);


--
-- Name: idx_supplier_subscription_procurement_request_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_subscription_procurement_request_id ON public.supplier_subscription USING btree (procurement_request_id);


--
-- Name: idx_supplier_subscription_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_subscription_supplier_id ON public.supplier_subscription USING btree (supplier_id);


--
-- Name: idx_supplier_subscription_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_supplier_subscription_workspace_id ON public.supplier_subscription USING btree (workspace_id);


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
-- Name: idx_task_outcome_check_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_task_outcome_check_workspace_id ON public.task_outcome_check USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_task_outcome_criteria_version_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_task_outcome_criteria_version_id ON public.task_outcome USING btree (criteria_version_id);


--
-- Name: idx_task_outcome_job_task_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_task_outcome_job_task_id ON public.task_outcome USING btree (job_task_id);


--
-- Name: idx_task_outcome_recorded_by; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_task_outcome_recorded_by ON public.task_outcome USING btree (recorded_by);


--
-- Name: idx_task_outcome_reviewed_by; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_task_outcome_reviewed_by ON public.task_outcome USING btree (reviewed_by);


--
-- Name: idx_task_outcome_revision_of_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_task_outcome_revision_of_id ON public.task_outcome USING btree (revision_of_id);


--
-- Name: idx_task_outcome_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_task_outcome_workspace_id ON public.task_outcome USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_tax_class_authority; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tax_class_authority ON public.tax_class USING btree (tax_authority_id);


--
-- Name: idx_tax_rate_lookup; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tax_rate_lookup ON public.tax_rate USING btree (workspace_id, jurisdiction, authority_code, kind, treatment_code, direction, effective_from) WHERE (status = ANY (ARRAY[2, 3]));


--
-- Name: idx_tax_rate_supersedes; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tax_rate_supersedes ON public.tax_rate USING btree (supersedes_id) WHERE (supersedes_id IS NOT NULL);


--
-- Name: idx_tax_rate_workspace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tax_rate_workspace ON public.tax_rate USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_tax_registration_active_role_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_tax_registration_active_role_unique ON public.tax_registration USING btree (party_type, party_id, tax_authority_id, compute_path_snapshot) WHERE (status = 2);


--
-- Name: idx_tax_registration_authority; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tax_registration_authority ON public.tax_registration USING btree (tax_authority_id);


--
-- Name: idx_tax_registration_kind; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tax_registration_kind ON public.tax_registration USING btree (tax_registration_kind_id);


--
-- Name: idx_tax_registration_kind_authority; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tax_registration_kind_authority ON public.tax_registration_kind USING btree (tax_authority_id);


--
-- Name: idx_tax_registration_supersedes; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tax_registration_supersedes ON public.tax_registration USING btree (supersedes_id) WHERE (supersedes_id IS NOT NULL);


--
-- Name: idx_tax_registration_workspace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tax_registration_workspace ON public.tax_registration USING btree (workspace_id);


--
-- Name: idx_tds_billing_event_disbursement_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tds_billing_event_disbursement_id ON public.disbursement_supplier_billing_event USING btree (treasury_disbursement_id);


--
-- Name: idx_tds_billing_event_recognition_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tds_billing_event_recognition_id ON public.disbursement_supplier_billing_event USING btree (expense_recognition_id);


--
-- Name: idx_tds_billing_event_supplier_billing_event_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tds_billing_event_supplier_billing_event_id ON public.disbursement_supplier_billing_event USING btree (supplier_billing_event_id);


--
-- Name: idx_tds_billing_event_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tds_billing_event_workspace_id ON public.disbursement_supplier_billing_event USING btree (workspace_id);


--
-- Name: idx_template_task_criteria_job_template_task_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_template_task_criteria_job_template_task_id ON public.template_task_criteria USING btree (job_template_task_id);


--
-- Name: idx_template_task_criteria_outcome_criteria_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_template_task_criteria_outcome_criteria_id ON public.template_task_criteria USING btree (outcome_criteria_id);


--
-- Name: idx_template_task_criteria_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_template_task_criteria_workspace_id ON public.template_task_criteria USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_tenant_invoice_tenant_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tenant_invoice_tenant_subscription_id ON public.tenant_invoice USING btree (tenant_subscription_id);


--
-- Name: idx_tenant_invoice_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tenant_invoice_workspace_id ON public.tenant_invoice USING btree (workspace_id);


--
-- Name: idx_tenant_payment_method_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tenant_payment_method_workspace_id ON public.tenant_payment_method USING btree (workspace_id);


--
-- Name: idx_tenant_subscription_default_payment_method_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tenant_subscription_default_payment_method_id ON public.tenant_subscription USING btree (default_payment_method_id);


--
-- Name: idx_tenant_subscription_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tenant_subscription_workspace_id ON public.tenant_subscription USING btree (workspace_id);


--
-- Name: idx_treasury_collection_advance_balance_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_treasury_collection_advance_balance_account_id ON public.treasury_collection USING btree (advance_balance_account_id);


--
-- Name: idx_treasury_collection_advance_kind_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_treasury_collection_advance_kind_status ON public.treasury_collection USING btree (advance_kind, advance_status) WHERE (advance_kind IS NOT NULL);


--
-- Name: idx_treasury_collection_advance_target_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_treasury_collection_advance_target_account_id ON public.treasury_collection USING btree (advance_target_account_id);


--
-- Name: idx_treasury_collection_client_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_treasury_collection_client_id ON public.treasury_collection USING btree (client_id);


--
-- Name: idx_treasury_collection_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_treasury_collection_workspace_id ON public.treasury_collection USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_treasury_disbursement_advance_balance_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_treasury_disbursement_advance_balance_account_id ON public.treasury_disbursement USING btree (advance_balance_account_id);


--
-- Name: idx_treasury_disbursement_advance_kind_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_treasury_disbursement_advance_kind_status ON public.treasury_disbursement USING btree (advance_kind, advance_status) WHERE (advance_kind IS NOT NULL);


--
-- Name: idx_treasury_disbursement_advance_target_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_treasury_disbursement_advance_target_account_id ON public.treasury_disbursement USING btree (advance_target_account_id);


--
-- Name: idx_treasury_disbursement_supplier_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_treasury_disbursement_supplier_id ON public.treasury_disbursement USING btree (supplier_id);


--
-- Name: idx_treasury_disbursement_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_treasury_disbursement_workspace_id ON public.treasury_disbursement USING btree (workspace_id) WHERE (workspace_id IS NOT NULL);


--
-- Name: idx_user_mobile_number; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_mobile_number ON public."user" USING btree (mobile_number);


--
-- Name: idx_user_preference_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_preference_user_id ON public.user_preference USING btree (user_id);


--
-- Name: idx_user_preference_workspace_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_preference_workspace_id ON public.user_preference USING btree (workspace_id);


--
-- Name: idx_wht_cert_authority; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_wht_cert_authority ON public.withholding_certificate USING btree (tax_authority_id) WHERE (tax_authority_id IS NOT NULL);


--
-- Name: idx_wht_cert_revenue; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_wht_cert_revenue ON public.withholding_certificate USING btree (revenue_id);


--
-- Name: idx_wht_cert_workspace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_wht_cert_workspace ON public.withholding_certificate USING btree (workspace_id);


--
-- Name: idx_work_request_assignee; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_work_request_assignee ON public.work_request USING btree (workspace_id, assigned_to_workspace_user_id);


--
-- Name: idx_work_request_client; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_work_request_client ON public.work_request USING btree (workspace_id, client_id, status);


--
-- Name: idx_work_request_open_sla; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_work_request_open_sla ON public.work_request USING btree (workspace_id, sla_due_at) WHERE (status <> ALL (ARRAY['declined'::text, 'completed'::text, 'cancelled'::text]));


--
-- Name: idx_work_request_origin; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_work_request_origin ON public.work_request USING btree (workspace_id, origin, status);


--
-- Name: idx_work_request_subscription; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_work_request_subscription ON public.work_request USING btree (workspace_id, subscription_id);


--
-- Name: idx_work_request_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_work_request_type_id ON public.work_request USING btree (work_request_type_id);


--
-- Name: idx_work_request_type_workspace_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_work_request_type_workspace_status ON public.work_request_type USING btree (workspace_id, status);


--
-- Name: idx_work_request_workspace_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_work_request_workspace_status ON public.work_request USING btree (workspace_id, status);


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
-- Name: idx_workspace_tenant_subscription_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_workspace_tenant_subscription_id ON public.workspace USING btree (tenant_subscription_id);


--
-- Name: idx_workspace_user_member_number; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_workspace_user_member_number ON public.workspace_user USING btree (member_number) WHERE (member_number IS NOT NULL);


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
-- Name: ix_jos_doc_tmpl_resolve; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_jos_doc_tmpl_resolve ON public.job_outcome_summary_document_template USING btree (workspace_id, price_schedule_id, version DESC) WHERE ((active = true) AND (version_status = 'VERSION_STATUS_PUBLISHED'::text));


--
-- Name: ix_jt_doc_tmpl_resolve; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_jt_doc_tmpl_resolve ON public.job_template_document_template USING btree (workspace_id, job_category_id, price_schedule_id, version DESC) WHERE ((active = true) AND (version_status = 'VERSION_STATUS_PUBLISHED'::text));


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
-- Name: uq_client_workspace_user_single_owner; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_client_workspace_user_single_owner ON public.client_workspace_user USING btree (client_id) WHERE is_owner;


--
-- Name: uq_conversation_participant_named_staff; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_conversation_participant_named_staff ON public.conversation_participant USING btree (conversation_id, user_id) WHERE (active AND (participant_type = 'named_staff'::text));


--
-- Name: uq_conversation_participant_team_inbox; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_conversation_participant_team_inbox ON public.conversation_participant USING btree (conversation_id, team_label) WHERE (active AND (participant_type = 'team_inbox'::text));


--
-- Name: uq_conversation_post_conversation_client_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_conversation_post_conversation_client_token ON public.conversation_post USING btree (conversation_id, client_token) WHERE (client_token IS NOT NULL);


--
-- Name: uq_conversation_read_receipt_principal; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_conversation_read_receipt_principal ON public.conversation_read_receipt USING btree (conversation_id, reader_principal_type, reader_principal_id);


--
-- Name: uq_criteria_group_domain_code; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_criteria_group_domain_code ON public.criteria_group USING btree (scope, workspace_key, industry_key, code);


--
-- Name: uq_evaluation_associate_arc; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_evaluation_associate_arc ON public.evaluation USING btree (client_id, subject_staff_id, evaluation_type, evaluation_template_id, period_start) NULLS NOT DISTINCT WHERE (active AND (subject_staff_id IS NOT NULL));


--
-- Name: uq_evaluation_client_arc; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_evaluation_client_arc ON public.evaluation USING btree (client_id, subject_client_id, evaluation_type, evaluation_template_id, period_start) NULLS NOT DISTINCT WHERE (active AND (subject_client_id IS NOT NULL));


--
-- Name: uq_expenditure_recurrence_contract_cycle; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_expenditure_recurrence_contract_cycle ON public.expenditure USING btree (supplier_contract_id, cycle_date) WHERE ((source = 'recurrence'::text) AND (supplier_contract_id IS NOT NULL) AND (cycle_date IS NOT NULL));


--
-- Name: uq_expense_recognition_idempotency; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_expense_recognition_idempotency ON public.expense_recognition USING btree (idempotency_key);


--
-- Name: uq_fund_allocation_active_per_fund_workspace; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_fund_allocation_active_per_fund_workspace ON public.fund_allocation USING btree (fund_id, workspace_id) WHERE (status = 1);


--
-- Name: uq_fund_owner_name_active; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_fund_owner_name_active ON public.fund USING btree (owner_party_type, owner_party_id, name) WHERE (status <> 4);


--
-- Name: uq_fund_transaction_idempotency_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_fund_transaction_idempotency_key ON public.fund_transaction USING btree (idempotency_key);


--
-- Name: uq_job_category_workspace_code; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_job_category_workspace_code ON public.job_category USING btree (COALESCE(workspace_id, ''::text), code) WHERE (code IS NOT NULL);


--
-- Name: uq_jos_doc_tmpl_pub_version; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_jos_doc_tmpl_pub_version ON public.job_outcome_summary_document_template USING btree (workspace_id, COALESCE(price_schedule_id, ''::text), version) WHERE (version_status = 'VERSION_STATUS_PUBLISHED'::text);


--
-- Name: uq_jt_doc_tmpl_pub_version; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_jt_doc_tmpl_pub_version ON public.job_template_document_template USING btree (workspace_id, COALESCE(price_schedule_id, ''::text), COALESCE(job_category_id, ''::text), version) WHERE ((active = true) AND (version_status = 'VERSION_STATUS_PUBLISHED'::text));


--
-- Name: uq_outcome_criteria_published_domain_code; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_outcome_criteria_published_domain_code ON public.outcome_criteria USING btree (scope, COALESCE(workspace_id, ''::text), COALESCE(industry_code, ''::text), code) WHERE (active AND (version_status = 'VERSION_STATUS_PUBLISHED'::text) AND (code IS NOT NULL));


--
-- Name: uq_outcome_criteria_published_group; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_outcome_criteria_published_group ON public.outcome_criteria USING btree (criteria_group_id) WHERE (active AND (version_status = 'VERSION_STATUS_PUBLISHED'::text));


--
-- Name: uq_plan_job_template_plan_template; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_plan_job_template_plan_template ON public.plan_job_template USING btree (workspace_id, plan_id, job_template_id);


--
-- Name: uq_product_plan_plan_product_variant; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_product_plan_plan_product_variant ON public.product_plan USING btree (plan_id, product_id, COALESCE(product_variant_id, ''::text));


--
-- Name: uq_product_price_plan_price_plan_product_plan; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_product_price_plan_price_plan_product_plan ON public.product_price_plan USING btree (price_plan_id, product_plan_id);


--
-- Name: uq_sgdt_pub_version; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_sgdt_pub_version ON public.subscription_group_document_template USING btree (workspace_id, render_profile, COALESCE(price_schedule_id, ''::text), COALESCE(plan_id, ''::text), COALESCE(job_category_id, ''::text), version) WHERE ((active = true) AND (version_status = 'VERSION_STATUS_PUBLISHED'::text));


--
-- Name: uq_sgpps_class_pps_phase; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_sgpps_class_pps_phase ON public.subscription_group_product_plan_staff USING btree (subscription_group_product_plan_id, product_plan_staff_id, COALESCE(job_template_phase_id, ''::text));


--
-- Name: uq_subscription_seat_active_position; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_subscription_seat_active_position ON public.subscription_seat USING btree (subscription_id, "position") WHERE (status = 'active'::text);


--
-- Name: uq_subscription_workspace_user_active; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_subscription_workspace_user_active ON public.subscription_workspace_user USING btree (subscription_id, workspace_user_id) WHERE active;


--
-- Name: uq_supplier_contract_price_schedule_line_schedule_contract_line; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_supplier_contract_price_schedule_line_schedule_contract_line ON public.supplier_contract_price_schedule_line USING btree (supplier_contract_price_schedule_id, supplier_contract_line_id);


--
-- Name: uq_template_task_criteria_active_pair; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_template_task_criteria_active_pair ON public.template_task_criteria USING btree (job_template_task_id, outcome_criteria_id) WHERE active;


--
-- Name: uq_tenant_payment_method_default_per_workspace; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_tenant_payment_method_default_per_workspace ON public.tenant_payment_method USING btree (workspace_id) WHERE (is_default = true);


--
-- Name: workspace_slug_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX workspace_slug_unique ON public.workspace USING btree (slug);


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
-- Name: audit_entry_2026_06_actor_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_actor ATTACH PARTITION audit_trail.audit_entry_2026_06_actor_id_occurred_at_idx;


--
-- Name: audit_entry_2026_06_entity_type_entity_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_entity ATTACH PARTITION audit_trail.audit_entry_2026_06_entity_type_entity_id_occurred_at_idx;


--
-- Name: audit_entry_2026_06_permission_code_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_permcode ATTACH PARTITION audit_trail.audit_entry_2026_06_permission_code_occurred_at_idx;


--
-- Name: audit_entry_2026_06_pkey; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.audit_entry_pkey ATTACH PARTITION audit_trail.audit_entry_2026_06_pkey;


--
-- Name: audit_entry_2026_06_transaction_id_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_txid ATTACH PARTITION audit_trail.audit_entry_2026_06_transaction_id_idx;


--
-- Name: audit_entry_2026_06_use_case_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_usecase ATTACH PARTITION audit_trail.audit_entry_2026_06_use_case_occurred_at_idx;


--
-- Name: audit_entry_2026_06_workspace_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_ws ATTACH PARTITION audit_trail.audit_entry_2026_06_workspace_id_occurred_at_idx;


--
-- Name: audit_entry_2026_07_actor_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_actor ATTACH PARTITION audit_trail.audit_entry_2026_07_actor_id_occurred_at_idx;


--
-- Name: audit_entry_2026_07_entity_type_entity_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_entity ATTACH PARTITION audit_trail.audit_entry_2026_07_entity_type_entity_id_occurred_at_idx;


--
-- Name: audit_entry_2026_07_permission_code_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_permcode ATTACH PARTITION audit_trail.audit_entry_2026_07_permission_code_occurred_at_idx;


--
-- Name: audit_entry_2026_07_pkey; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.audit_entry_pkey ATTACH PARTITION audit_trail.audit_entry_2026_07_pkey;


--
-- Name: audit_entry_2026_07_transaction_id_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_txid ATTACH PARTITION audit_trail.audit_entry_2026_07_transaction_id_idx;


--
-- Name: audit_entry_2026_07_use_case_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_usecase ATTACH PARTITION audit_trail.audit_entry_2026_07_use_case_occurred_at_idx;


--
-- Name: audit_entry_2026_07_workspace_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_ws ATTACH PARTITION audit_trail.audit_entry_2026_07_workspace_id_occurred_at_idx;


--
-- Name: audit_entry_2026_08_actor_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_actor ATTACH PARTITION audit_trail.audit_entry_2026_08_actor_id_occurred_at_idx;


--
-- Name: audit_entry_2026_08_entity_type_entity_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_entity ATTACH PARTITION audit_trail.audit_entry_2026_08_entity_type_entity_id_occurred_at_idx;


--
-- Name: audit_entry_2026_08_permission_code_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_permcode ATTACH PARTITION audit_trail.audit_entry_2026_08_permission_code_occurred_at_idx;


--
-- Name: audit_entry_2026_08_pkey; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.audit_entry_pkey ATTACH PARTITION audit_trail.audit_entry_2026_08_pkey;


--
-- Name: audit_entry_2026_08_transaction_id_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_txid ATTACH PARTITION audit_trail.audit_entry_2026_08_transaction_id_idx;


--
-- Name: audit_entry_2026_08_use_case_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_usecase ATTACH PARTITION audit_trail.audit_entry_2026_08_use_case_occurred_at_idx;


--
-- Name: audit_entry_2026_08_workspace_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_ws ATTACH PARTITION audit_trail.audit_entry_2026_08_workspace_id_occurred_at_idx;


--
-- Name: audit_entry_2026_09_actor_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_actor ATTACH PARTITION audit_trail.audit_entry_2026_09_actor_id_occurred_at_idx;


--
-- Name: audit_entry_2026_09_entity_type_entity_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_entity ATTACH PARTITION audit_trail.audit_entry_2026_09_entity_type_entity_id_occurred_at_idx;


--
-- Name: audit_entry_2026_09_permission_code_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_permcode ATTACH PARTITION audit_trail.audit_entry_2026_09_permission_code_occurred_at_idx;


--
-- Name: audit_entry_2026_09_pkey; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.audit_entry_pkey ATTACH PARTITION audit_trail.audit_entry_2026_09_pkey;


--
-- Name: audit_entry_2026_09_transaction_id_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_txid ATTACH PARTITION audit_trail.audit_entry_2026_09_transaction_id_idx;


--
-- Name: audit_entry_2026_09_use_case_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_usecase ATTACH PARTITION audit_trail.audit_entry_2026_09_use_case_occurred_at_idx;


--
-- Name: audit_entry_2026_09_workspace_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_ws ATTACH PARTITION audit_trail.audit_entry_2026_09_workspace_id_occurred_at_idx;


--
-- Name: audit_entry_2026_10_actor_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_actor ATTACH PARTITION audit_trail.audit_entry_2026_10_actor_id_occurred_at_idx;


--
-- Name: audit_entry_2026_10_entity_type_entity_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_entity ATTACH PARTITION audit_trail.audit_entry_2026_10_entity_type_entity_id_occurred_at_idx;


--
-- Name: audit_entry_2026_10_permission_code_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_permcode ATTACH PARTITION audit_trail.audit_entry_2026_10_permission_code_occurred_at_idx;


--
-- Name: audit_entry_2026_10_pkey; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.audit_entry_pkey ATTACH PARTITION audit_trail.audit_entry_2026_10_pkey;


--
-- Name: audit_entry_2026_10_transaction_id_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_txid ATTACH PARTITION audit_trail.audit_entry_2026_10_transaction_id_idx;


--
-- Name: audit_entry_2026_10_use_case_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_usecase ATTACH PARTITION audit_trail.audit_entry_2026_10_use_case_occurred_at_idx;


--
-- Name: audit_entry_2026_10_workspace_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_ws ATTACH PARTITION audit_trail.audit_entry_2026_10_workspace_id_occurred_at_idx;


--
-- Name: audit_entry_2026_11_actor_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_actor ATTACH PARTITION audit_trail.audit_entry_2026_11_actor_id_occurred_at_idx;


--
-- Name: audit_entry_2026_11_entity_type_entity_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_entity ATTACH PARTITION audit_trail.audit_entry_2026_11_entity_type_entity_id_occurred_at_idx;


--
-- Name: audit_entry_2026_11_permission_code_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_permcode ATTACH PARTITION audit_trail.audit_entry_2026_11_permission_code_occurred_at_idx;


--
-- Name: audit_entry_2026_11_pkey; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.audit_entry_pkey ATTACH PARTITION audit_trail.audit_entry_2026_11_pkey;


--
-- Name: audit_entry_2026_11_transaction_id_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_txid ATTACH PARTITION audit_trail.audit_entry_2026_11_transaction_id_idx;


--
-- Name: audit_entry_2026_11_use_case_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_usecase ATTACH PARTITION audit_trail.audit_entry_2026_11_use_case_occurred_at_idx;


--
-- Name: audit_entry_2026_11_workspace_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_ws ATTACH PARTITION audit_trail.audit_entry_2026_11_workspace_id_occurred_at_idx;


--
-- Name: audit_entry_2026_12_actor_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_actor ATTACH PARTITION audit_trail.audit_entry_2026_12_actor_id_occurred_at_idx;


--
-- Name: audit_entry_2026_12_entity_type_entity_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_entity ATTACH PARTITION audit_trail.audit_entry_2026_12_entity_type_entity_id_occurred_at_idx;


--
-- Name: audit_entry_2026_12_permission_code_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_permcode ATTACH PARTITION audit_trail.audit_entry_2026_12_permission_code_occurred_at_idx;


--
-- Name: audit_entry_2026_12_pkey; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.audit_entry_pkey ATTACH PARTITION audit_trail.audit_entry_2026_12_pkey;


--
-- Name: audit_entry_2026_12_transaction_id_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_txid ATTACH PARTITION audit_trail.audit_entry_2026_12_transaction_id_idx;


--
-- Name: audit_entry_2026_12_use_case_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_usecase ATTACH PARTITION audit_trail.audit_entry_2026_12_use_case_occurred_at_idx;


--
-- Name: audit_entry_2026_12_workspace_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_ws ATTACH PARTITION audit_trail.audit_entry_2026_12_workspace_id_occurred_at_idx;


--
-- Name: audit_entry_default_actor_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_actor ATTACH PARTITION audit_trail.audit_entry_default_actor_id_occurred_at_idx;


--
-- Name: audit_entry_default_entity_type_entity_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_entity ATTACH PARTITION audit_trail.audit_entry_default_entity_type_entity_id_occurred_at_idx;


--
-- Name: audit_entry_default_permission_code_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_permcode ATTACH PARTITION audit_trail.audit_entry_default_permission_code_occurred_at_idx;


--
-- Name: audit_entry_default_pkey; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.audit_entry_pkey ATTACH PARTITION audit_trail.audit_entry_default_pkey;


--
-- Name: audit_entry_default_transaction_id_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_txid ATTACH PARTITION audit_trail.audit_entry_default_transaction_id_idx;


--
-- Name: audit_entry_default_use_case_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_usecase ATTACH PARTITION audit_trail.audit_entry_default_use_case_occurred_at_idx;


--
-- Name: audit_entry_default_workspace_id_occurred_at_idx; Type: INDEX ATTACH; Schema: audit_trail; Owner: -
--

ALTER INDEX audit_trail.idx_entry_ws ATTACH PARTITION audit_trail.audit_entry_default_workspace_id_occurred_at_idx;


--
-- Name: data_bundle_receipts data_bundle_receipts_append_only; Type: TRIGGER; Schema: ichizen_deploy; Owner: -
--

CREATE TRIGGER data_bundle_receipts_append_only BEFORE DELETE OR UPDATE OR TRUNCATE ON ichizen_deploy.data_bundle_receipts FOR EACH STATEMENT EXECUTE FUNCTION ichizen_deploy.reject_bundle_receipt_mutation();


--
-- Name: subscription_seat subscription_seat_amount_immutable_active_trg; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER subscription_seat_amount_immutable_active_trg BEFORE UPDATE ON public.subscription_seat FOR EACH ROW EXECUTE FUNCTION public.subscription_seat_amount_immutable_active();


--
-- Name: outcome_criteria trg_ensure_criteria_group_anchor; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_ensure_criteria_group_anchor BEFORE INSERT OR UPDATE OF code, criteria_group_id ON public.outcome_criteria FOR EACH ROW EXECUTE FUNCTION public.ensure_criteria_group_anchor();


--
-- Name: account account_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


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
-- Name: asset_category asset_category_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_category
    ADD CONSTRAINT asset_category_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: asset_transaction asset_transaction_asset_revaluation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_transaction
    ADD CONSTRAINT asset_transaction_asset_revaluation_id_fkey FOREIGN KEY (asset_revaluation_id) REFERENCES public.asset_revaluation(id);


--
-- Name: asset_transaction asset_transaction_depreciation_run_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_transaction
    ADD CONSTRAINT asset_transaction_depreciation_run_id_fkey FOREIGN KEY (depreciation_run_id) REFERENCES public.depreciation_run(id) NOT VALID;


--
-- Name: asset_transaction asset_transaction_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset_transaction
    ADD CONSTRAINT asset_transaction_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: asset asset_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asset
    ADD CONSTRAINT asset_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: attachment attachment_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.attachment
    ADD CONSTRAINT attachment_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


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
-- Name: category category_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: client_portal_grant client_portal_grant_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT client_portal_grant_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: client_portal_grant client_portal_grant_granted_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT client_portal_grant_granted_by_user_id_fkey FOREIGN KEY (granted_by_user_id) REFERENCES public."user"(id);


--
-- Name: client_portal_grant client_portal_grant_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT client_portal_grant_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: client_portal_grant client_portal_grant_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT client_portal_grant_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: client_portal_grant client_portal_grant_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_portal_grant
    ADD CONSTRAINT client_portal_grant_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: client client_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: client_workspace_user client_workspace_user_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_workspace_user
    ADD CONSTRAINT client_workspace_user_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: client_workspace_user client_workspace_user_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_workspace_user
    ADD CONSTRAINT client_workspace_user_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: client_workspace_user client_workspace_user_workspace_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_workspace_user
    ADD CONSTRAINT client_workspace_user_workspace_user_id_fkey FOREIGN KEY (workspace_user_id) REFERENCES public.workspace_user(id);


--
-- Name: collection_billing_event collection_billing_event_billing_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_billing_event
    ADD CONSTRAINT collection_billing_event_billing_event_id_fkey FOREIGN KEY (billing_event_id) REFERENCES public.billing_event(id);


--
-- Name: collection_billing_event collection_billing_event_revenue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_billing_event
    ADD CONSTRAINT collection_billing_event_revenue_id_fkey FOREIGN KEY (revenue_id) REFERENCES public.revenue(id);


--
-- Name: collection_billing_event collection_billing_event_treasury_collection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_billing_event
    ADD CONSTRAINT collection_billing_event_treasury_collection_id_fkey FOREIGN KEY (treasury_collection_id) REFERENCES public.treasury_collection(id);


--
-- Name: conversation_participant conversation_participant_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversation_participant
    ADD CONSTRAINT conversation_participant_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversation(id);


--
-- Name: conversation_post conversation_post_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversation_post
    ADD CONSTRAINT conversation_post_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversation(id);


--
-- Name: conversation_read_receipt conversation_read_receipt_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversation_read_receipt
    ADD CONSTRAINT conversation_read_receipt_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversation(id);


--
-- Name: conversation_read_receipt conversation_read_receipt_last_read_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversation_read_receipt
    ADD CONSTRAINT conversation_read_receipt_last_read_post_id_fkey FOREIGN KEY (last_read_post_id) REFERENCES public.conversation_post(id);


--
-- Name: cost_plan cost_plan_cost_schedule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cost_plan
    ADD CONSTRAINT cost_plan_cost_schedule_id_fkey FOREIGN KEY (cost_schedule_id) REFERENCES public.cost_schedule(id);


--
-- Name: cost_plan cost_plan_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cost_plan
    ADD CONSTRAINT cost_plan_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: cost_plan cost_plan_supplier_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cost_plan
    ADD CONSTRAINT cost_plan_supplier_plan_id_fkey FOREIGN KEY (supplier_plan_id) REFERENCES public.supplier_plan(id);


--
-- Name: cost_plan cost_plan_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cost_plan
    ADD CONSTRAINT cost_plan_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: cost_schedule cost_schedule_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cost_schedule
    ADD CONSTRAINT cost_schedule_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(id);


--
-- Name: cost_schedule cost_schedule_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cost_schedule
    ADD CONSTRAINT cost_schedule_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: criteria_option criteria_option_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.criteria_option
    ADD CONSTRAINT criteria_option_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: criteria_threshold criteria_threshold_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.criteria_threshold
    ADD CONSTRAINT criteria_threshold_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: delegate_client delegate_client_granted_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_client
    ADD CONSTRAINT delegate_client_granted_by_user_id_fkey FOREIGN KEY (granted_by_user_id) REFERENCES public."user"(id) NOT VALID;


--
-- Name: delegate_client delegate_client_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_client
    ADD CONSTRAINT delegate_client_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id) NOT VALID;


--
-- Name: delegate_client delegate_client_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_client
    ADD CONSTRAINT delegate_client_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: delegate_supplier delegate_supplier_delegate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT delegate_supplier_delegate_id_fkey FOREIGN KEY (delegate_id) REFERENCES public.delegate(id);


--
-- Name: delegate_supplier delegate_supplier_granted_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT delegate_supplier_granted_by_user_id_fkey FOREIGN KEY (granted_by_user_id) REFERENCES public."user"(id);


--
-- Name: delegate_supplier delegate_supplier_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT delegate_supplier_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: delegate_supplier delegate_supplier_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT delegate_supplier_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: delegate_supplier delegate_supplier_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delegate_supplier
    ADD CONSTRAINT delegate_supplier_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: depreciation_run depreciation_run_initiator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.depreciation_run
    ADD CONSTRAINT depreciation_run_initiator_id_fkey FOREIGN KEY (initiator_id) REFERENCES public."user"(id) NOT VALID;


--
-- Name: depreciation_run depreciation_run_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.depreciation_run
    ADD CONSTRAINT depreciation_run_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: depreciation_schedule depreciation_schedule_depreciation_run_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.depreciation_schedule
    ADD CONSTRAINT depreciation_schedule_depreciation_run_id_fkey FOREIGN KEY (depreciation_run_id) REFERENCES public.depreciation_run(id) NOT VALID;


--
-- Name: depreciation_schedule depreciation_schedule_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.depreciation_schedule
    ADD CONSTRAINT depreciation_schedule_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: disbursement_supplier_billing_event disbursement_supplier_billing_event_expense_recognition_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.disbursement_supplier_billing_event
    ADD CONSTRAINT disbursement_supplier_billing_event_expense_recognition_fkey FOREIGN KEY (expense_recognition_id) REFERENCES public.expense_recognition(id);


--
-- Name: disbursement_supplier_billing_event disbursement_supplier_billing_event_supplier_billing_event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.disbursement_supplier_billing_event
    ADD CONSTRAINT disbursement_supplier_billing_event_supplier_billing_event_fkey FOREIGN KEY (supplier_billing_event_id) REFERENCES public.supplier_billing_event(id);


--
-- Name: disbursement_supplier_billing_event disbursement_supplier_billing_event_treasury_disbursement_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.disbursement_supplier_billing_event
    ADD CONSTRAINT disbursement_supplier_billing_event_treasury_disbursement_fkey FOREIGN KEY (treasury_disbursement_id) REFERENCES public.treasury_disbursement(id);


--
-- Name: document_template document_template_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.document_template
    ADD CONSTRAINT document_template_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: equity_account equity_account_workspace_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equity_account
    ADD CONSTRAINT equity_account_workspace_user_id_fkey FOREIGN KEY (workspace_user_id) REFERENCES public.workspace_user(id) NOT VALID;


--
-- Name: evaluation evaluation_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: evaluation_cycle_member evaluation_cycle_member_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_cycle_member
    ADD CONSTRAINT evaluation_cycle_member_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: evaluation_cycle_member evaluation_cycle_member_cycle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_cycle_member
    ADD CONSTRAINT evaluation_cycle_member_cycle_id_fkey FOREIGN KEY (evaluation_cycle_id) REFERENCES public.evaluation_cycle(id);


--
-- Name: evaluation_cycle_member evaluation_cycle_member_subject_staff_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_cycle_member
    ADD CONSTRAINT evaluation_cycle_member_subject_staff_id_fkey FOREIGN KEY (subject_staff_id) REFERENCES public.staff(id);


--
-- Name: evaluation_cycle_member evaluation_cycle_member_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_cycle_member
    ADD CONSTRAINT evaluation_cycle_member_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: evaluation_cycle evaluation_cycle_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_cycle
    ADD CONSTRAINT evaluation_cycle_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription(id);


--
-- Name: evaluation_cycle evaluation_cycle_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_cycle
    ADD CONSTRAINT evaluation_cycle_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: evaluation evaluation_evaluation_cycle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_evaluation_cycle_id_fkey FOREIGN KEY (evaluation_cycle_id) REFERENCES public.evaluation_cycle(id);


--
-- Name: evaluation evaluation_evaluation_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_evaluation_template_id_fkey FOREIGN KEY (evaluation_template_id) REFERENCES public.evaluation_template(id);


--
-- Name: evaluation evaluation_evaluator_client_portal_grant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_evaluator_client_portal_grant_id_fkey FOREIGN KEY (evaluator_client_portal_grant_id) REFERENCES public.client_portal_grant(id);


--
-- Name: evaluation evaluation_evaluator_workspace_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_evaluator_workspace_user_id_fkey FOREIGN KEY (evaluator_workspace_user_id) REFERENCES public.workspace_user(id);


--
-- Name: evaluation_response evaluation_response_criteria_version_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_response
    ADD CONSTRAINT evaluation_response_criteria_version_id_fkey FOREIGN KEY (criteria_version_id) REFERENCES public.outcome_criteria(id);


--
-- Name: evaluation_response evaluation_response_evaluation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_response
    ADD CONSTRAINT evaluation_response_evaluation_id_fkey FOREIGN KEY (evaluation_id) REFERENCES public.evaluation(id);


--
-- Name: evaluation_response evaluation_response_outcome_criteria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_response
    ADD CONSTRAINT evaluation_response_outcome_criteria_id_fkey FOREIGN KEY (outcome_criteria_id) REFERENCES public.outcome_criteria(id);


--
-- Name: evaluation_response evaluation_response_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_response
    ADD CONSTRAINT evaluation_response_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: evaluation evaluation_signed_off_by_client_portal_grant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_signed_off_by_client_portal_grant_id_fkey FOREIGN KEY (signed_off_by_client_portal_grant_id) REFERENCES public.client_portal_grant(id);


--
-- Name: evaluation evaluation_signed_off_by_workspace_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_signed_off_by_workspace_user_id_fkey FOREIGN KEY (signed_off_by_workspace_user_id) REFERENCES public.workspace_user(id);


--
-- Name: evaluation evaluation_subject_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_subject_client_id_fkey FOREIGN KEY (subject_client_id) REFERENCES public.client(id);


--
-- Name: evaluation evaluation_subject_staff_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_subject_staff_id_fkey FOREIGN KEY (subject_staff_id) REFERENCES public.staff(id);


--
-- Name: evaluation evaluation_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription(id);


--
-- Name: evaluation evaluation_subscription_seat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_subscription_seat_id_fkey FOREIGN KEY (subscription_seat_id) REFERENCES public.subscription_seat(id);


--
-- Name: evaluation_template evaluation_template_copied_from_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_template
    ADD CONSTRAINT evaluation_template_copied_from_id_fkey FOREIGN KEY (copied_from_id) REFERENCES public.evaluation_template(id);


--
-- Name: evaluation_template_item evaluation_template_item_outcome_criteria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_template_item
    ADD CONSTRAINT evaluation_template_item_outcome_criteria_id_fkey FOREIGN KEY (outcome_criteria_id) REFERENCES public.outcome_criteria(id);


--
-- Name: evaluation_template_item evaluation_template_item_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_template_item
    ADD CONSTRAINT evaluation_template_item_template_id_fkey FOREIGN KEY (evaluation_template_id) REFERENCES public.evaluation_template(id);


--
-- Name: evaluation_template_item evaluation_template_item_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_template_item
    ADD CONSTRAINT evaluation_template_item_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: evaluation_template evaluation_template_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation_template
    ADD CONSTRAINT evaluation_template_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: evaluation evaluation_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: expenditure expenditure_accrued_expense_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_accrued_expense_id_fkey FOREIGN KEY (accrued_expense_id) REFERENCES public.accrued_expense(id);


--
-- Name: expenditure expenditure_cost_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_cost_plan_id_fkey FOREIGN KEY (cost_plan_id) REFERENCES public.cost_plan(id) NOT VALID;


--
-- Name: expenditure expenditure_expense_recognition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_expense_recognition_id_fkey FOREIGN KEY (expense_recognition_id) REFERENCES public.expense_recognition(id);


--
-- Name: expenditure expenditure_fund_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_fund_transaction_id_fkey FOREIGN KEY (fund_transaction_id) REFERENCES public.fund_transaction(id);


--
-- Name: expenditure_line_item expenditure_line_item_supplier_product_cost_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure_line_item
    ADD CONSTRAINT expenditure_line_item_supplier_product_cost_plan_id_fkey FOREIGN KEY (supplier_product_cost_plan_id) REFERENCES public.supplier_product_cost_plan(id) NOT VALID;


--
-- Name: expenditure expenditure_petty_cash_fund_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_petty_cash_fund_id_fkey FOREIGN KEY (petty_cash_fund_id) REFERENCES public.petty_cash_fund(id);


--
-- Name: expenditure expenditure_run_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.expense_recognition_run(id) NOT VALID;


--
-- Name: expenditure expenditure_supplier_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_supplier_contract_id_fkey FOREIGN KEY (supplier_contract_id) REFERENCES public.supplier_contract(id);


--
-- Name: expenditure expenditure_supplier_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_supplier_subscription_id_fkey FOREIGN KEY (supplier_subscription_id) REFERENCES public.supplier_subscription(id) NOT VALID;


--
-- Name: expenditure expenditure_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expenditure
    ADD CONSTRAINT expenditure_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: expense_recognition expense_recognition_accrual_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_accrual_account_id_fkey FOREIGN KEY (accrual_account_id) REFERENCES public.account(id);


--
-- Name: expense_recognition expense_recognition_advance_disbursement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_advance_disbursement_id_fkey FOREIGN KEY (advance_disbursement_id) REFERENCES public.treasury_disbursement(id) NOT VALID;


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
-- Name: expense_recognition_line expense_recognition_line_supplier_product_cost_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_line
    ADD CONSTRAINT expense_recognition_line_supplier_product_cost_plan_id_fkey FOREIGN KEY (supplier_product_cost_plan_id) REFERENCES public.supplier_product_cost_plan(id) NOT VALID;


--
-- Name: expense_recognition_line expense_recognition_line_supplier_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_line
    ADD CONSTRAINT expense_recognition_line_supplier_subscription_id_fkey FOREIGN KEY (supplier_subscription_id) REFERENCES public.supplier_subscription(id) NOT VALID;


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
-- Name: expense_recognition_run_attempt expense_recognition_run_attempt_advance_disbursement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_run_attempt
    ADD CONSTRAINT expense_recognition_run_attempt_advance_disbursement_id_fkey FOREIGN KEY (advance_disbursement_id) REFERENCES public.treasury_disbursement(id);


--
-- Name: expense_recognition_run_attempt expense_recognition_run_attempt_expenditure_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_run_attempt
    ADD CONSTRAINT expense_recognition_run_attempt_expenditure_id_fkey FOREIGN KEY (expenditure_id) REFERENCES public.expenditure(id);


--
-- Name: expense_recognition_run_attempt expense_recognition_run_attempt_expense_recognition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_run_attempt
    ADD CONSTRAINT expense_recognition_run_attempt_expense_recognition_id_fkey FOREIGN KEY (expense_recognition_id) REFERENCES public.expense_recognition(id);


--
-- Name: expense_recognition_run_attempt expense_recognition_run_attempt_run_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_run_attempt
    ADD CONSTRAINT expense_recognition_run_attempt_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.expense_recognition_run(id);


--
-- Name: expense_recognition_run_attempt expense_recognition_run_attempt_supplier_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_run_attempt
    ADD CONSTRAINT expense_recognition_run_attempt_supplier_subscription_id_fkey FOREIGN KEY (supplier_subscription_id) REFERENCES public.supplier_subscription(id);


--
-- Name: expense_recognition expense_recognition_run_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.expense_recognition_run(id) NOT VALID;


--
-- Name: expense_recognition_run expense_recognition_run_initiated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_run
    ADD CONSTRAINT expense_recognition_run_initiated_by_fkey FOREIGN KEY (initiated_by) REFERENCES public.workspace_user(id);


--
-- Name: expense_recognition_run expense_recognition_run_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_run
    ADD CONSTRAINT expense_recognition_run_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: expense_recognition_run expense_recognition_run_supplier_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_run
    ADD CONSTRAINT expense_recognition_run_supplier_subscription_id_fkey FOREIGN KEY (supplier_subscription_id) REFERENCES public.supplier_subscription(id);


--
-- Name: expense_recognition_run expense_recognition_run_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition_run
    ADD CONSTRAINT expense_recognition_run_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


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
-- Name: expense_recognition expense_recognition_supplier_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_supplier_subscription_id_fkey FOREIGN KEY (supplier_subscription_id) REFERENCES public.supplier_subscription(id) NOT VALID;


--
-- Name: expense_recognition expense_recognition_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense_recognition
    ADD CONSTRAINT expense_recognition_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: job_category fk_job_category_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_category
    ADD CONSTRAINT fk_job_category_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: job fk_job_job_category_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT fk_job_job_category_id FOREIGN KEY (job_category_id) REFERENCES public.job_category(id);


--
-- Name: job_outcome_line fk_job_outcome_line_client_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_outcome_line
    ADD CONSTRAINT fk_job_outcome_line_client_id FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: job_outcome_line fk_job_outcome_line_job_outcome_summary_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_outcome_line
    ADD CONSTRAINT fk_job_outcome_line_job_outcome_summary_id FOREIGN KEY (job_outcome_summary_id) REFERENCES public.job_outcome_summary(id);


--
-- Name: job_outcome_line fk_job_outcome_line_score_scale_band_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_outcome_line
    ADD CONSTRAINT fk_job_outcome_line_score_scale_band_id FOREIGN KEY (score_scale_band_id) REFERENCES public.score_scale_band(id);


--
-- Name: job_outcome_line fk_job_outcome_line_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_outcome_line
    ADD CONSTRAINT fk_job_outcome_line_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: job_template fk_job_template_job_category_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template
    ADD CONSTRAINT fk_job_template_job_category_id FOREIGN KEY (job_category_id) REFERENCES public.job_category(id);


--
-- Name: line_workspace_user fk_line_workspace_user_line_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.line_workspace_user
    ADD CONSTRAINT fk_line_workspace_user_line_id FOREIGN KEY (line_id) REFERENCES public.line(id);


--
-- Name: line_workspace_user fk_line_workspace_user_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.line_workspace_user
    ADD CONSTRAINT fk_line_workspace_user_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: line_workspace_user fk_line_workspace_user_workspace_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.line_workspace_user
    ADD CONSTRAINT fk_line_workspace_user_workspace_user_id FOREIGN KEY (workspace_user_id) REFERENCES public.workspace_user(id);


--
-- Name: outcome_criteria fk_outcome_criteria_group_anchor; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.outcome_criteria
    ADD CONSTRAINT fk_outcome_criteria_group_anchor FOREIGN KEY (criteria_group_id, code) REFERENCES public.criteria_group(id, code);


--
-- Name: plan_group fk_plan_group_parent_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_group
    ADD CONSTRAINT fk_plan_group_parent_id FOREIGN KEY (parent_id) REFERENCES public.plan_group(id);


--
-- Name: plan_group_plan fk_plan_group_plan_plan_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_group_plan
    ADD CONSTRAINT fk_plan_group_plan_plan_group_id FOREIGN KEY (plan_group_id) REFERENCES public.plan_group(id);


--
-- Name: plan_group_plan fk_plan_group_plan_plan_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_group_plan
    ADD CONSTRAINT fk_plan_group_plan_plan_id FOREIGN KEY (plan_id) REFERENCES public.plan(id);


--
-- Name: plan_group_plan fk_plan_group_plan_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_group_plan
    ADD CONSTRAINT fk_plan_group_plan_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: plan_group fk_plan_group_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_group
    ADD CONSTRAINT fk_plan_group_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: price_schedule_workspace_user fk_price_schedule_workspace_user_price_schedule_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_schedule_workspace_user
    ADD CONSTRAINT fk_price_schedule_workspace_user_price_schedule_id FOREIGN KEY (price_schedule_id) REFERENCES public.price_schedule(id);


--
-- Name: price_schedule_workspace_user fk_price_schedule_workspace_user_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_schedule_workspace_user
    ADD CONSTRAINT fk_price_schedule_workspace_user_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: price_schedule_workspace_user fk_price_schedule_workspace_user_workspace_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_schedule_workspace_user
    ADD CONSTRAINT fk_price_schedule_workspace_user_workspace_user_id FOREIGN KEY (workspace_user_id) REFERENCES public.workspace_user(id);


--
-- Name: procurement_request fk_procurement_request_purchase_order_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request
    ADD CONSTRAINT fk_procurement_request_purchase_order_id FOREIGN KEY (purchase_order_id) REFERENCES public.purchase_order(id);


--
-- Name: product_plan_staff fk_product_plan_staff_product_plan_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_plan_staff
    ADD CONSTRAINT fk_product_plan_staff_product_plan_id FOREIGN KEY (product_plan_id) REFERENCES public.product_plan(id);


--
-- Name: product_plan_staff fk_product_plan_staff_staff_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_plan_staff
    ADD CONSTRAINT fk_product_plan_staff_staff_id FOREIGN KEY (staff_id) REFERENCES public.staff(id);


--
-- Name: product_plan_staff fk_product_plan_staff_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_plan_staff
    ADD CONSTRAINT fk_product_plan_staff_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: reporting_checkpoint fk_reporting_checkpoint_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reporting_checkpoint
    ADD CONSTRAINT fk_reporting_checkpoint_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: score_scale_band fk_score_scale_band_score_scale_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.score_scale_band
    ADD CONSTRAINT fk_score_scale_band_score_scale_id FOREIGN KEY (score_scale_id) REFERENCES public.score_scale(id);


--
-- Name: score_scale_band fk_score_scale_band_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.score_scale_band
    ADD CONSTRAINT fk_score_scale_band_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: score_scale fk_score_scale_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.score_scale
    ADD CONSTRAINT fk_score_scale_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: scoring_component_criteria fk_scoring_component_criteria_outcome_criteria_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_component_criteria
    ADD CONSTRAINT fk_scoring_component_criteria_outcome_criteria_id FOREIGN KEY (outcome_criteria_id) REFERENCES public.outcome_criteria(id);


--
-- Name: scoring_component_criteria fk_scoring_component_criteria_scoring_component_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_component_criteria
    ADD CONSTRAINT fk_scoring_component_criteria_scoring_component_id FOREIGN KEY (scoring_component_id) REFERENCES public.scoring_component(id);


--
-- Name: scoring_component_criteria fk_scoring_component_criteria_scoring_scheme_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_component_criteria
    ADD CONSTRAINT fk_scoring_component_criteria_scoring_scheme_id FOREIGN KEY (scoring_scheme_id) REFERENCES public.scoring_scheme(id);


--
-- Name: scoring_component_criteria fk_scoring_component_criteria_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_component_criteria
    ADD CONSTRAINT fk_scoring_component_criteria_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: scoring_component fk_scoring_component_parent_component_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_component
    ADD CONSTRAINT fk_scoring_component_parent_component_id FOREIGN KEY (parent_component_id) REFERENCES public.scoring_component(id);


--
-- Name: scoring_component fk_scoring_component_scoring_scheme_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_component
    ADD CONSTRAINT fk_scoring_component_scoring_scheme_id FOREIGN KEY (scoring_scheme_id) REFERENCES public.scoring_scheme(id);


--
-- Name: scoring_scheme fk_scoring_scheme_score_scale_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_scheme
    ADD CONSTRAINT fk_scoring_scheme_score_scale_id FOREIGN KEY (score_scale_id) REFERENCES public.score_scale(id);


--
-- Name: scoring_scheme fk_scoring_scheme_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_scheme
    ADD CONSTRAINT fk_scoring_scheme_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: subscription_group_document_template fk_sgdt_document_template; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_document_template
    ADD CONSTRAINT fk_sgdt_document_template FOREIGN KEY (document_template_id) REFERENCES public.document_template(id);


--
-- Name: subscription_group_document_template fk_sgdt_job_category; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_document_template
    ADD CONSTRAINT fk_sgdt_job_category FOREIGN KEY (job_category_id) REFERENCES public.job_category(id);


--
-- Name: subscription_group_document_template fk_sgdt_plan; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_document_template
    ADD CONSTRAINT fk_sgdt_plan FOREIGN KEY (plan_id) REFERENCES public.plan(id);


--
-- Name: subscription_group_document_template fk_sgdt_price_schedule; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_document_template
    ADD CONSTRAINT fk_sgdt_price_schedule FOREIGN KEY (price_schedule_id) REFERENCES public.price_schedule(id);


--
-- Name: subscription_group_document_template fk_sgdt_supersedes; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_document_template
    ADD CONSTRAINT fk_sgdt_supersedes FOREIGN KEY (supersedes_binding_id) REFERENCES public.subscription_group_document_template(id);


--
-- Name: subscription_group_document_template fk_sgdt_workspace; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_document_template
    ADD CONSTRAINT fk_sgdt_workspace FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: subscription_group_member fk_subscription_group_member_subscription_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_member
    ADD CONSTRAINT fk_subscription_group_member_subscription_group_id FOREIGN KEY (subscription_group_id) REFERENCES public.subscription_group(id);


--
-- Name: subscription_group_member fk_subscription_group_member_subscription_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_member
    ADD CONSTRAINT fk_subscription_group_member_subscription_id FOREIGN KEY (subscription_id) REFERENCES public.subscription(id);


--
-- Name: subscription_group_member fk_subscription_group_member_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_member
    ADD CONSTRAINT fk_subscription_group_member_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: subscription_group fk_subscription_group_plan_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group
    ADD CONSTRAINT fk_subscription_group_plan_id FOREIGN KEY (plan_id) REFERENCES public.plan(id);


--
-- Name: subscription_group fk_subscription_group_price_schedule_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group
    ADD CONSTRAINT fk_subscription_group_price_schedule_id FOREIGN KEY (price_schedule_id) REFERENCES public.price_schedule(id);


--
-- Name: subscription_group_product_plan fk_subscription_group_product_plan_job_template_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan
    ADD CONSTRAINT fk_subscription_group_product_plan_job_template_id FOREIGN KEY (job_template_id) REFERENCES public.job_template(id);


--
-- Name: subscription_group_product_plan fk_subscription_group_product_plan_product_plan_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan
    ADD CONSTRAINT fk_subscription_group_product_plan_product_plan_id FOREIGN KEY (product_plan_id) REFERENCES public.product_plan(id);


--
-- Name: subscription_group_product_plan_staff fk_subscription_group_product_plan_staff_job_template_phase_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan_staff
    ADD CONSTRAINT fk_subscription_group_product_plan_staff_job_template_phase_id FOREIGN KEY (job_template_phase_id) REFERENCES public.job_template_phase(id);


--
-- Name: subscription_group_product_plan_staff fk_subscription_group_product_plan_staff_product_plan_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan_staff
    ADD CONSTRAINT fk_subscription_group_product_plan_staff_product_plan_id FOREIGN KEY (product_plan_id) REFERENCES public.product_plan(id);


--
-- Name: subscription_group_product_plan_staff fk_subscription_group_product_plan_staff_product_plan_staff_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan_staff
    ADD CONSTRAINT fk_subscription_group_product_plan_staff_product_plan_staff_id FOREIGN KEY (product_plan_staff_id) REFERENCES public.product_plan_staff(id);


--
-- Name: subscription_group_product_plan_staff fk_subscription_group_product_plan_staff_staff_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan_staff
    ADD CONSTRAINT fk_subscription_group_product_plan_staff_staff_id FOREIGN KEY (staff_id) REFERENCES public.staff(id);


--
-- Name: subscription_group_product_plan_staff fk_subscription_group_product_plan_staff_subscription_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan_staff
    ADD CONSTRAINT fk_subscription_group_product_plan_staff_subscription_group_id FOREIGN KEY (subscription_group_id) REFERENCES public.subscription_group(id);


--
-- Name: subscription_group_product_plan_staff fk_subscription_group_product_plan_staff_subscription_group_pro; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan_staff
    ADD CONSTRAINT fk_subscription_group_product_plan_staff_subscription_group_pro FOREIGN KEY (subscription_group_product_plan_id) REFERENCES public.subscription_group_product_plan(id);


--
-- Name: subscription_group_product_plan_staff fk_subscription_group_product_plan_staff_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan_staff
    ADD CONSTRAINT fk_subscription_group_product_plan_staff_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: subscription_group_product_plan fk_subscription_group_product_plan_subscription_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan
    ADD CONSTRAINT fk_subscription_group_product_plan_subscription_group_id FOREIGN KEY (subscription_group_id) REFERENCES public.subscription_group(id);


--
-- Name: subscription_group_product_plan fk_subscription_group_product_plan_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_product_plan
    ADD CONSTRAINT fk_subscription_group_product_plan_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: subscription_group fk_subscription_group_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group
    ADD CONSTRAINT fk_subscription_group_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: subscription_group_workspace_user fk_subscription_group_workspace_user_subscription_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_workspace_user
    ADD CONSTRAINT fk_subscription_group_workspace_user_subscription_group_id FOREIGN KEY (subscription_group_id) REFERENCES public.subscription_group(id);


--
-- Name: subscription_group_workspace_user fk_subscription_group_workspace_user_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_workspace_user
    ADD CONSTRAINT fk_subscription_group_workspace_user_workspace_id FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: subscription_group_workspace_user fk_subscription_group_workspace_user_workspace_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_group_workspace_user
    ADD CONSTRAINT fk_subscription_group_workspace_user_workspace_user_id FOREIGN KEY (workspace_user_id) REFERENCES public.workspace_user(id);


--
-- Name: forex_rate forex_rate_supersedes_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forex_rate
    ADD CONSTRAINT forex_rate_supersedes_id_fkey FOREIGN KEY (supersedes_id) REFERENCES public.forex_rate(id);


--
-- Name: forex_rate forex_rate_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forex_rate
    ADD CONSTRAINT forex_rate_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public."user"(id);


--
-- Name: forex_rate forex_rate_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forex_rate
    ADD CONSTRAINT forex_rate_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: fund_allocation fund_allocation_approved_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_allocation
    ADD CONSTRAINT fund_allocation_approved_by_user_id_fkey FOREIGN KEY (approved_by_user_id) REFERENCES public."user"(id) NOT VALID;


--
-- Name: fund_allocation fund_allocation_default_cash_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_allocation
    ADD CONSTRAINT fund_allocation_default_cash_account_id_fkey FOREIGN KEY (default_cash_account_id) REFERENCES public.account(id) NOT VALID;


--
-- Name: fund_allocation fund_allocation_fund_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_allocation
    ADD CONSTRAINT fund_allocation_fund_id_fkey FOREIGN KEY (fund_id) REFERENCES public.fund(id) NOT VALID;


--
-- Name: fund_allocation fund_allocation_payable_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_allocation
    ADD CONSTRAINT fund_allocation_payable_account_id_fkey FOREIGN KEY (payable_account_id) REFERENCES public.account(id) NOT VALID;


--
-- Name: fund_allocation fund_allocation_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_allocation
    ADD CONSTRAINT fund_allocation_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: fund fund_gl_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund
    ADD CONSTRAINT fund_gl_account_id_fkey FOREIGN KEY (gl_account_id) REFERENCES public.account(id) NOT VALID;


--
-- Name: fund fund_linked_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund
    ADD CONSTRAINT fund_linked_by_user_id_fkey FOREIGN KEY (linked_by_user_id) REFERENCES public."user"(id) NOT VALID;


--
-- Name: fund fund_petty_custodian_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund
    ADD CONSTRAINT fund_petty_custodian_user_id_fkey FOREIGN KEY (petty_custodian_user_id) REFERENCES public."user"(id) NOT VALID;


--
-- Name: fund fund_petty_source_fund_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund
    ADD CONSTRAINT fund_petty_source_fund_id_fkey FOREIGN KEY (petty_source_fund_id) REFERENCES public.fund(id) NOT VALID;


--
-- Name: fund_transaction fund_transaction_allocation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_transaction
    ADD CONSTRAINT fund_transaction_allocation_id_fkey FOREIGN KEY (allocation_id) REFERENCES public.fund_allocation(id) NOT VALID;


--
-- Name: fund_transaction fund_transaction_collection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_transaction
    ADD CONSTRAINT fund_transaction_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES public.collection(id) NOT VALID;


--
-- Name: fund_transaction fund_transaction_created_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_transaction
    ADD CONSTRAINT fund_transaction_created_by_user_id_fkey FOREIGN KEY (created_by_user_id) REFERENCES public."user"(id) NOT VALID;


--
-- Name: fund_transaction fund_transaction_expenditure_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_transaction
    ADD CONSTRAINT fund_transaction_expenditure_id_fkey FOREIGN KEY (expenditure_id) REFERENCES public.expenditure(id) NOT VALID;


--
-- Name: fund_transaction fund_transaction_fund_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_transaction
    ADD CONSTRAINT fund_transaction_fund_id_fkey FOREIGN KEY (fund_id) REFERENCES public.fund(id) NOT VALID;


--
-- Name: fund_transaction fund_transaction_journal_entry_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_transaction
    ADD CONSTRAINT fund_transaction_journal_entry_id_fkey FOREIGN KEY (journal_entry_id) REFERENCES public.journal_entry(id) NOT VALID;


--
-- Name: fund_transaction fund_transaction_reverses_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_transaction
    ADD CONSTRAINT fund_transaction_reverses_id_fkey FOREIGN KEY (reverses_id) REFERENCES public.fund_transaction(id) NOT VALID;


--
-- Name: fund_transaction fund_transaction_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fund_transaction
    ADD CONSTRAINT fund_transaction_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: inventory_attribute inventory_attribute_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_attribute
    ADD CONSTRAINT inventory_attribute_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: inventory_depreciation inventory_depreciation_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_depreciation
    ADD CONSTRAINT inventory_depreciation_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: inventory_item inventory_item_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_item
    ADD CONSTRAINT inventory_item_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: inventory_serial_history inventory_serial_history_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_serial_history
    ADD CONSTRAINT inventory_serial_history_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: inventory_serial inventory_serial_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_serial
    ADD CONSTRAINT inventory_serial_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: job job_cost_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_cost_account_id_fkey FOREIGN KEY (cost_account_id) REFERENCES public.account(id);


--
-- Name: job_outcome_summary_document_template job_outcome_summary_document_templat_supersedes_binding_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_outcome_summary_document_template
    ADD CONSTRAINT job_outcome_summary_document_templat_supersedes_binding_id_fkey FOREIGN KEY (supersedes_binding_id) REFERENCES public.job_outcome_summary_document_template(id);


--
-- Name: job_outcome_summary_document_template job_outcome_summary_document_template_document_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_outcome_summary_document_template
    ADD CONSTRAINT job_outcome_summary_document_template_document_template_id_fkey FOREIGN KEY (document_template_id) REFERENCES public.document_template(id);


--
-- Name: job_outcome_summary_document_template job_outcome_summary_document_template_price_schedule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_outcome_summary_document_template
    ADD CONSTRAINT job_outcome_summary_document_template_price_schedule_id_fkey FOREIGN KEY (price_schedule_id) REFERENCES public.price_schedule(id);


--
-- Name: job_outcome_summary_document_template job_outcome_summary_document_template_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_outcome_summary_document_template
    ADD CONSTRAINT job_outcome_summary_document_template_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: job job_output_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_output_product_id_fkey FOREIGN KEY (output_product_id) REFERENCES public.product(id);


--
-- Name: job job_output_product_variant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_output_product_variant_id_fkey FOREIGN KEY (output_product_variant_id) REFERENCES public.product_variant(id);


--
-- Name: job job_parent_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_parent_job_id_fkey FOREIGN KEY (parent_job_id) REFERENCES public.job(id);


--
-- Name: job_phase job_phase_predecessor_phase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_phase
    ADD CONSTRAINT job_phase_predecessor_phase_id_fkey FOREIGN KEY (predecessor_phase_id) REFERENCES public.job_phase(id);


--
-- Name: job_phase job_phase_resource_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_phase
    ADD CONSTRAINT job_phase_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES public.resource(id);


--
-- Name: job_phase job_phase_template_phase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_phase
    ADD CONSTRAINT job_phase_template_phase_id_fkey FOREIGN KEY (template_phase_id) REFERENCES public.job_template_phase(id);


--
-- Name: job_phase job_phase_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_phase
    ADD CONSTRAINT job_phase_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: job job_resource_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES public.resource(id);


--
-- Name: job_task job_task_resource_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_task
    ADD CONSTRAINT job_task_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES public.resource(id);


--
-- Name: job_task job_task_template_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_task
    ADD CONSTRAINT job_task_template_task_id_fkey FOREIGN KEY (template_task_id) REFERENCES public.job_template_task(id);


--
-- Name: job_task job_task_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_task
    ADD CONSTRAINT job_task_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: job_template_document_template job_template_document_template_document_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_document_template
    ADD CONSTRAINT job_template_document_template_document_template_id_fkey FOREIGN KEY (document_template_id) REFERENCES public.document_template(id);


--
-- Name: job_template_document_template job_template_document_template_job_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_document_template
    ADD CONSTRAINT job_template_document_template_job_category_id_fkey FOREIGN KEY (job_category_id) REFERENCES public.job_category(id);


--
-- Name: job_template_document_template job_template_document_template_price_schedule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_document_template
    ADD CONSTRAINT job_template_document_template_price_schedule_id_fkey FOREIGN KEY (price_schedule_id) REFERENCES public.price_schedule(id);


--
-- Name: job_template_document_template job_template_document_template_supersedes_binding_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_document_template
    ADD CONSTRAINT job_template_document_template_supersedes_binding_id_fkey FOREIGN KEY (supersedes_binding_id) REFERENCES public.job_template_document_template(id);


--
-- Name: job_template_document_template job_template_document_template_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_document_template
    ADD CONSTRAINT job_template_document_template_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: job_template job_template_output_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template
    ADD CONSTRAINT job_template_output_product_id_fkey FOREIGN KEY (output_product_id) REFERENCES public.product(id);


--
-- Name: job_template job_template_output_product_variant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template
    ADD CONSTRAINT job_template_output_product_variant_id_fkey FOREIGN KEY (output_product_variant_id) REFERENCES public.product_variant(id);


--
-- Name: job_template_phase job_template_phase_predecessor_template_phase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_phase
    ADD CONSTRAINT job_template_phase_predecessor_template_phase_id_fkey FOREIGN KEY (predecessor_template_phase_id) REFERENCES public.job_template_phase(id);


--
-- Name: job_template_phase job_template_phase_resource_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_phase
    ADD CONSTRAINT job_template_phase_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES public.resource(id);


--
-- Name: job_template_phase job_template_phase_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_phase
    ADD CONSTRAINT job_template_phase_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


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
-- Name: job_template_relation job_template_relation_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_relation
    ADD CONSTRAINT job_template_relation_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: job_template job_template_supersedes_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template
    ADD CONSTRAINT job_template_supersedes_template_id_fkey FOREIGN KEY (supersedes_template_id) REFERENCES public.job_template(id);


--
-- Name: job_template_task job_template_task_resource_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_task
    ADD CONSTRAINT job_template_task_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES public.resource(id);


--
-- Name: job_template_task job_template_task_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_template_task
    ADD CONSTRAINT job_template_task_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: journal_entry journal_entry_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.journal_entry
    ADD CONSTRAINT journal_entry_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


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
-- Name: line line_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.line
    ADD CONSTRAINT line_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


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
-- Name: phase_outcome_summary phase_outcome_summary_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.phase_outcome_summary
    ADD CONSTRAINT phase_outcome_summary_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: plan plan_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: plan plan_job_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_job_template_id_fkey FOREIGN KEY (job_template_id) REFERENCES public.job_template(id);


--
-- Name: plan_job_template plan_job_template_job_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_job_template
    ADD CONSTRAINT plan_job_template_job_template_id_fkey FOREIGN KEY (job_template_id) REFERENCES public.job_template(id);


--
-- Name: plan_job_template plan_job_template_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_job_template
    ADD CONSTRAINT plan_job_template_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plan(id);


--
-- Name: plan_job_template plan_job_template_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan_job_template
    ADD CONSTRAINT plan_job_template_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: plan plan_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.plan(id);


--
-- Name: plan plan_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: price_plan price_plan_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_plan
    ADD CONSTRAINT price_plan_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: price_schedule price_schedule_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.price_schedule
    ADD CONSTRAINT price_schedule_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id);


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
-- Name: procurement_request procurement_request_spawned_supplier_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.procurement_request
    ADD CONSTRAINT procurement_request_spawned_supplier_subscription_id_fkey FOREIGN KEY (spawned_supplier_subscription_id) REFERENCES public.supplier_subscription(id) NOT VALID;


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
-- Name: product_price_plan product_price_plan_tax_treatment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_price_plan
    ADD CONSTRAINT product_price_plan_tax_treatment_id_fkey FOREIGN KEY (tax_treatment_id) REFERENCES public.tax_treatment(id);


--
-- Name: product_price_plan product_price_plan_withholding_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_price_plan
    ADD CONSTRAINT product_price_plan_withholding_class_id_fkey FOREIGN KEY (withholding_class_id) REFERENCES public.tax_class(id);


--
-- Name: product product_tax_treatment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_tax_treatment_id_fkey FOREIGN KEY (tax_treatment_id) REFERENCES public.tax_treatment(id);


--
-- Name: product product_withholding_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_withholding_class_id_fkey FOREIGN KEY (withholding_class_id) REFERENCES public.tax_class(id);


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
-- Name: purchase_order purchase_order_supplier_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_order
    ADD CONSTRAINT purchase_order_supplier_subscription_id_fkey FOREIGN KEY (supplier_subscription_id) REFERENCES public.supplier_subscription(id) NOT VALID;


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
-- Name: revenue revenue_advance_collection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue
    ADD CONSTRAINT revenue_advance_collection_id_fkey FOREIGN KEY (advance_collection_id) REFERENCES public.treasury_collection(id) NOT VALID;


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
-- Name: revenue_line_item revenue_line_item_subscription_seat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_line_item
    ADD CONSTRAINT revenue_line_item_subscription_seat_id_fkey FOREIGN KEY (subscription_seat_id) REFERENCES public.subscription_seat(id);


--
-- Name: revenue_run_attempt revenue_run_attempt_advance_collection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_run_attempt
    ADD CONSTRAINT revenue_run_attempt_advance_collection_id_fkey FOREIGN KEY (advance_collection_id) REFERENCES public.treasury_collection(id) NOT VALID;


--
-- Name: revenue_run_attempt revenue_run_attempt_revenue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_run_attempt
    ADD CONSTRAINT revenue_run_attempt_revenue_id_fkey FOREIGN KEY (revenue_id) REFERENCES public.revenue(id);


--
-- Name: revenue_run_attempt revenue_run_attempt_run_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_run_attempt
    ADD CONSTRAINT revenue_run_attempt_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.revenue_run(id);


--
-- Name: revenue_run_attempt revenue_run_attempt_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_run_attempt
    ADD CONSTRAINT revenue_run_attempt_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription(id);


--
-- Name: revenue_run revenue_run_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_run
    ADD CONSTRAINT revenue_run_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: revenue revenue_run_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue
    ADD CONSTRAINT revenue_run_id_fkey FOREIGN KEY (run_id) REFERENCES public.revenue_run(id) NOT VALID;


--
-- Name: revenue_run revenue_run_initiated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_run
    ADD CONSTRAINT revenue_run_initiated_by_fkey FOREIGN KEY (initiated_by) REFERENCES public.workspace_user(id);


--
-- Name: revenue_run revenue_run_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_run
    ADD CONSTRAINT revenue_run_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription(id);


--
-- Name: revenue_run revenue_run_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_run
    ADD CONSTRAINT revenue_run_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: revenue_tax_line revenue_tax_line_revenue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_tax_line
    ADD CONSTRAINT revenue_tax_line_revenue_id_fkey FOREIGN KEY (revenue_id) REFERENCES public.revenue(id);


--
-- Name: revenue_tax_line revenue_tax_line_source_registration_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_tax_line
    ADD CONSTRAINT revenue_tax_line_source_registration_fk FOREIGN KEY (source_registration_id_snapshot) REFERENCES public.tax_registration(id);


--
-- Name: revenue_tax_line revenue_tax_line_tax_rate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_tax_line
    ADD CONSTRAINT revenue_tax_line_tax_rate_id_fkey FOREIGN KEY (tax_rate_id) REFERENCES public.tax_rate(id);


--
-- Name: revenue_tax_line revenue_tax_line_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.revenue_tax_line
    ADD CONSTRAINT revenue_tax_line_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: scoring_component scoring_component_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scoring_component
    ADD CONSTRAINT scoring_component_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: session session_acting_as_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_acting_as_workspace_id_fkey FOREIGN KEY (acting_as_workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: staff staff_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: subscription_seat subscription_seat_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_seat
    ADD CONSTRAINT subscription_seat_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: subscription_seat subscription_seat_product_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_seat
    ADD CONSTRAINT subscription_seat_product_plan_id_fkey FOREIGN KEY (product_plan_id) REFERENCES public.product_plan(id);


--
-- Name: subscription_seat subscription_seat_replaces_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_seat
    ADD CONSTRAINT subscription_seat_replaces_id_fkey FOREIGN KEY (replaces_id) REFERENCES public.subscription_seat(id);


--
-- Name: subscription_seat subscription_seat_staff_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_seat
    ADD CONSTRAINT subscription_seat_staff_id_fkey FOREIGN KEY (staff_id) REFERENCES public.staff(id);


--
-- Name: subscription_seat subscription_seat_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_seat
    ADD CONSTRAINT subscription_seat_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription(id);


--
-- Name: subscription subscription_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription
    ADD CONSTRAINT subscription_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: subscription_workspace_user subscription_workspace_user_account_team_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_workspace_user
    ADD CONSTRAINT subscription_workspace_user_account_team_fkey FOREIGN KEY (client_id, workspace_user_id) REFERENCES public.client_workspace_user(client_id, workspace_user_id);


--
-- Name: subscription_workspace_user subscription_workspace_user_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_workspace_user
    ADD CONSTRAINT subscription_workspace_user_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription(id);


--
-- Name: subscription_workspace_user subscription_workspace_user_workspace_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subscription_workspace_user
    ADD CONSTRAINT subscription_workspace_user_workspace_user_id_fkey FOREIGN KEY (workspace_user_id) REFERENCES public.workspace_user(id);


--
-- Name: supplier_billing_event supplier_billing_event_expense_recognition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_billing_event
    ADD CONSTRAINT supplier_billing_event_expense_recognition_id_fkey FOREIGN KEY (expense_recognition_id) REFERENCES public.expense_recognition(id);


--
-- Name: supplier_billing_event supplier_billing_event_supplier_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_billing_event
    ADD CONSTRAINT supplier_billing_event_supplier_contract_id_fkey FOREIGN KEY (supplier_contract_id) REFERENCES public.supplier_contract(id);


--
-- Name: supplier_billing_event supplier_billing_event_supplier_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_billing_event
    ADD CONSTRAINT supplier_billing_event_supplier_subscription_id_fkey FOREIGN KEY (supplier_subscription_id) REFERENCES public.supplier_subscription(id);


--
-- Name: supplier_category supplier_category_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_category
    ADD CONSTRAINT supplier_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: supplier_category supplier_category_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_category
    ADD CONSTRAINT supplier_category_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


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
-- Name: supplier_plan supplier_plan_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_plan
    ADD CONSTRAINT supplier_plan_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: supplier_plan supplier_plan_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_plan
    ADD CONSTRAINT supplier_plan_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: supplier_portal_grant supplier_portal_grant_granted_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT supplier_portal_grant_granted_by_user_id_fkey FOREIGN KEY (granted_by_user_id) REFERENCES public."user"(id);


--
-- Name: supplier_portal_grant supplier_portal_grant_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT supplier_portal_grant_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: supplier_portal_grant supplier_portal_grant_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT supplier_portal_grant_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: supplier_portal_grant supplier_portal_grant_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT supplier_portal_grant_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: supplier_portal_grant supplier_portal_grant_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_portal_grant
    ADD CONSTRAINT supplier_portal_grant_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: supplier_product_cost_plan supplier_product_cost_plan_cost_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_product_cost_plan
    ADD CONSTRAINT supplier_product_cost_plan_cost_plan_id_fkey FOREIGN KEY (cost_plan_id) REFERENCES public.cost_plan(id);


--
-- Name: supplier_product_cost_plan supplier_product_cost_plan_supplier_product_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_product_cost_plan
    ADD CONSTRAINT supplier_product_cost_plan_supplier_product_plan_id_fkey FOREIGN KEY (supplier_product_plan_id) REFERENCES public.supplier_product_plan(id);


--
-- Name: supplier_product_plan supplier_product_plan_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_product_plan
    ADD CONSTRAINT supplier_product_plan_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: supplier_product_plan supplier_product_plan_product_variant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_product_plan
    ADD CONSTRAINT supplier_product_plan_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES public.product_variant(id);


--
-- Name: supplier_product_plan supplier_product_plan_supplier_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_product_plan
    ADD CONSTRAINT supplier_product_plan_supplier_plan_id_fkey FOREIGN KEY (supplier_plan_id) REFERENCES public.supplier_plan(id);


--
-- Name: supplier_subscription supplier_subscription_cost_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_subscription
    ADD CONSTRAINT supplier_subscription_cost_plan_id_fkey FOREIGN KEY (cost_plan_id) REFERENCES public.cost_plan(id);


--
-- Name: supplier_subscription supplier_subscription_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_subscription
    ADD CONSTRAINT supplier_subscription_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(id);


--
-- Name: supplier_subscription supplier_subscription_procurement_request_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_subscription
    ADD CONSTRAINT supplier_subscription_procurement_request_id_fkey FOREIGN KEY (procurement_request_id) REFERENCES public.procurement_request(id);


--
-- Name: supplier_subscription supplier_subscription_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_subscription
    ADD CONSTRAINT supplier_subscription_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id);


--
-- Name: supplier_subscription supplier_subscription_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier_subscription
    ADD CONSTRAINT supplier_subscription_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: supplier supplier_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT supplier_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: task_outcome_check task_outcome_check_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_outcome_check
    ADD CONSTRAINT task_outcome_check_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: task_outcome task_outcome_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_outcome
    ADD CONSTRAINT task_outcome_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: tax_class tax_class_tax_authority_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_class
    ADD CONSTRAINT tax_class_tax_authority_id_fkey FOREIGN KEY (tax_authority_id) REFERENCES public.tax_authority(id);


--
-- Name: tax_rate tax_rate_supersedes_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_rate
    ADD CONSTRAINT tax_rate_supersedes_id_fkey FOREIGN KEY (supersedes_id) REFERENCES public.tax_rate(id);


--
-- Name: tax_rate tax_rate_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_rate
    ADD CONSTRAINT tax_rate_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: tax_registration tax_registration_kind_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_registration
    ADD CONSTRAINT tax_registration_kind_id_fkey FOREIGN KEY (tax_registration_kind_id) REFERENCES public.tax_registration_kind(id);


--
-- Name: tax_registration_kind tax_registration_kind_tax_authority_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_registration_kind
    ADD CONSTRAINT tax_registration_kind_tax_authority_id_fkey FOREIGN KEY (tax_authority_id) REFERENCES public.tax_authority(id);


--
-- Name: tax_registration tax_registration_supersedes_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_registration
    ADD CONSTRAINT tax_registration_supersedes_id_fkey FOREIGN KEY (supersedes_id) REFERENCES public.tax_registration(id);


--
-- Name: tax_registration tax_registration_tax_authority_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_registration
    ADD CONSTRAINT tax_registration_tax_authority_id_fkey FOREIGN KEY (tax_authority_id) REFERENCES public.tax_authority(id);


--
-- Name: tax_registration tax_registration_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tax_registration
    ADD CONSTRAINT tax_registration_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: template_task_criteria template_task_criteria_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.template_task_criteria
    ADD CONSTRAINT template_task_criteria_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: tenant_invoice tenant_invoice_tenant_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_invoice
    ADD CONSTRAINT tenant_invoice_tenant_subscription_id_fkey FOREIGN KEY (tenant_subscription_id) REFERENCES public.tenant_subscription(id);


--
-- Name: tenant_invoice tenant_invoice_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_invoice
    ADD CONSTRAINT tenant_invoice_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: tenant_payment_method tenant_payment_method_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_payment_method
    ADD CONSTRAINT tenant_payment_method_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: tenant_subscription tenant_subscription_default_payment_method_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_subscription
    ADD CONSTRAINT tenant_subscription_default_payment_method_id_fkey FOREIGN KEY (default_payment_method_id) REFERENCES public.tenant_payment_method(id) NOT VALID;


--
-- Name: tenant_subscription tenant_subscription_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_subscription
    ADD CONSTRAINT tenant_subscription_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: treasury_collection treasury_collection_advance_balance_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treasury_collection
    ADD CONSTRAINT treasury_collection_advance_balance_account_id_fkey FOREIGN KEY (advance_balance_account_id) REFERENCES public.account(id) NOT VALID;


--
-- Name: treasury_collection treasury_collection_advance_target_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treasury_collection
    ADD CONSTRAINT treasury_collection_advance_target_account_id_fkey FOREIGN KEY (advance_target_account_id) REFERENCES public.account(id) NOT VALID;


--
-- Name: treasury_collection treasury_collection_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treasury_collection
    ADD CONSTRAINT treasury_collection_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id) NOT VALID;


--
-- Name: treasury_collection treasury_collection_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treasury_collection
    ADD CONSTRAINT treasury_collection_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: treasury_disbursement treasury_disbursement_advance_balance_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treasury_disbursement
    ADD CONSTRAINT treasury_disbursement_advance_balance_account_id_fkey FOREIGN KEY (advance_balance_account_id) REFERENCES public.account(id) NOT VALID;


--
-- Name: treasury_disbursement treasury_disbursement_advance_target_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treasury_disbursement
    ADD CONSTRAINT treasury_disbursement_advance_target_account_id_fkey FOREIGN KEY (advance_target_account_id) REFERENCES public.account(id) NOT VALID;


--
-- Name: treasury_disbursement treasury_disbursement_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treasury_disbursement
    ADD CONSTRAINT treasury_disbursement_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier(id) NOT VALID;


--
-- Name: treasury_disbursement treasury_disbursement_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treasury_disbursement
    ADD CONSTRAINT treasury_disbursement_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id) NOT VALID;


--
-- Name: user_preference user_preference_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_preference
    ADD CONSTRAINT user_preference_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: user_preference user_preference_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_preference
    ADD CONSTRAINT user_preference_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: withholding_certificate withholding_certificate_revenue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.withholding_certificate
    ADD CONSTRAINT withholding_certificate_revenue_id_fkey FOREIGN KEY (revenue_id) REFERENCES public.revenue(id);


--
-- Name: withholding_certificate withholding_certificate_tax_authority_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.withholding_certificate
    ADD CONSTRAINT withholding_certificate_tax_authority_id_fkey FOREIGN KEY (tax_authority_id) REFERENCES public.tax_authority(id);


--
-- Name: withholding_certificate withholding_certificate_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.withholding_certificate
    ADD CONSTRAINT withholding_certificate_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: work_request work_request_assigned_to_workspace_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request
    ADD CONSTRAINT work_request_assigned_to_workspace_user_id_fkey FOREIGN KEY (assigned_to_workspace_user_id) REFERENCES public.workspace_user(id);


--
-- Name: work_request work_request_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request
    ADD CONSTRAINT work_request_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client(id);


--
-- Name: work_request work_request_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request
    ADD CONSTRAINT work_request_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.job(id);


--
-- Name: work_request work_request_requested_by_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request
    ADD CONSTRAINT work_request_requested_by_user_id_fkey FOREIGN KEY (requested_by_user_id) REFERENCES public."user"(id);


--
-- Name: work_request work_request_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request
    ADD CONSTRAINT work_request_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription(id);


--
-- Name: work_request work_request_subscription_seat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request
    ADD CONSTRAINT work_request_subscription_seat_id_fkey FOREIGN KEY (subscription_seat_id) REFERENCES public.subscription_seat(id);


--
-- Name: work_request_type work_request_type_default_workflow_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request_type
    ADD CONSTRAINT work_request_type_default_workflow_template_id_fkey FOREIGN KEY (default_workflow_template_id) REFERENCES public.workflow_template(id);


--
-- Name: work_request_type work_request_type_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request_type
    ADD CONSTRAINT work_request_type_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: work_request work_request_work_request_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request
    ADD CONSTRAINT work_request_work_request_type_id_fkey FOREIGN KEY (work_request_type_id) REFERENCES public.work_request_type(id);


--
-- Name: work_request work_request_workflow_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request
    ADD CONSTRAINT work_request_workflow_id_fkey FOREIGN KEY (workflow_id) REFERENCES public.workflow(id);


--
-- Name: work_request work_request_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.work_request
    ADD CONSTRAINT work_request_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: workspace_request_counter workspace_request_counter_workspace_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workspace_request_counter
    ADD CONSTRAINT workspace_request_counter_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);


--
-- Name: workspace workspace_tenant_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workspace
    ADD CONSTRAINT workspace_tenant_subscription_id_fkey FOREIGN KEY (tenant_subscription_id) REFERENCES public.tenant_subscription(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

\unrestrict 49f2a51a2bd7fa7c2c83fcc507482008322fa6b08886025f5245a91ff7a6b167
