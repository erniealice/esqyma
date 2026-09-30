-- Usage & pass-through charges, Slice A: charge policy entities.
-- Adds 5 tables (charge_policy, charge_policy_version, charge_policy_component,
-- charge_policy_posting, charge_policy_version_editor) and 2 nullable columns on product_price_plan (charge_policy_id,
-- markup_bps). Additive only: no drops, no data, existing rows untouched (null = legacy path).
-- Enums are stored as their proto name strings (protojson bridge). Hand-authored, idempotent.
-- Spec: docs/plan/20260927-usage-and-pass-through-charges/build-spec.md section 2.

CREATE TABLE IF NOT EXISTS public.charge_policy (
  id text NOT NULL,
  workspace_id text NOT NULL,
  code text NOT NULL,
  name text NOT NULL,
  description text NULL,
  status text NOT NULL,
  retired_at bigint NULL,
  retired_by text NULL,
  created_by text NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT charge_policy_pkey PRIMARY KEY (id),
  CONSTRAINT charge_policy_workspace_id_fkey
    FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT charge_policy_name_nonblank_chk CHECK (btrim(name) <> ''),
  CONSTRAINT charge_policy_code_nonblank_chk CHECK (btrim(code) <> ''),
  CONSTRAINT charge_policy_status_chk
    CHECK (status IN ('CHARGE_POLICY_STATUS_ACTIVE', 'CHARGE_POLICY_STATUS_RETIRED'))
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_charge_policy_workspace_code
  ON public.charge_policy (workspace_id, code);

CREATE INDEX IF NOT EXISTS idx_charge_policy_workspace_id
  ON public.charge_policy (workspace_id);

CREATE TABLE IF NOT EXISTS public.charge_policy_version (
  id text NOT NULL,
  workspace_id text NOT NULL,
  charge_policy_id text NOT NULL,
  version_number integer NOT NULL,
  status text NOT NULL,
  accounting_role text NULL,
  book_presentation text NULL,
  tax_position text NULL,
  tax_treatment_id text NULL,
  assessment_scope text NULL,
  assessment_note text NULL,
  cloned_from_version_id text NULL,
  prepared_by text NULL,
  approved_by text NULL,
  approved_at bigint NULL,
  self_approved boolean NOT NULL DEFAULT false,
  superseded_at bigint NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT charge_policy_version_pkey PRIMARY KEY (id),
  CONSTRAINT charge_policy_version_workspace_id_fkey
    FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT charge_policy_version_charge_policy_id_fkey
    FOREIGN KEY (charge_policy_id) REFERENCES public.charge_policy (id),
  CONSTRAINT charge_policy_version_tax_treatment_id_fkey
    FOREIGN KEY (tax_treatment_id) REFERENCES public.tax_treatment (id),
  CONSTRAINT charge_policy_version_cloned_from_version_id_fkey
    FOREIGN KEY (cloned_from_version_id) REFERENCES public.charge_policy_version (id),
  CONSTRAINT charge_policy_version_number_positive_chk CHECK (version_number > 0),
  CONSTRAINT charge_policy_version_status_chk
    CHECK (status IN ('CHARGE_POLICY_VERSION_STATUS_DRAFT', 'CHARGE_POLICY_VERSION_STATUS_APPROVED', 'CHARGE_POLICY_VERSION_STATUS_SUPERSEDED')),
  CONSTRAINT charge_policy_version_accounting_role_chk
    CHECK (accounting_role IS NULL OR accounting_role IN ('ACCOUNTING_ROLE_PRINCIPAL', 'ACCOUNTING_ROLE_AGENT')),
  CONSTRAINT charge_policy_version_book_presentation_chk
    CHECK (book_presentation IS NULL OR book_presentation IN ('BOOK_PRESENTATION_REVENUE', 'BOOK_PRESENTATION_EXCLUDED_REIMBURSEMENT')),
  CONSTRAINT charge_policy_version_tax_position_chk
    CHECK (tax_position IS NULL OR tax_position IN ('TAX_POSITION_OWN_SUPPLY', 'TAX_POSITION_EXCLUDED_REIMBURSEMENT')),
  CONSTRAINT uq_charge_policy_version_policy_number UNIQUE (charge_policy_id, version_number)
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_charge_policy_version_one_draft
  ON public.charge_policy_version (charge_policy_id)
  WHERE status = 'CHARGE_POLICY_VERSION_STATUS_DRAFT';

CREATE INDEX IF NOT EXISTS idx_charge_policy_version_charge_policy_id
  ON public.charge_policy_version (charge_policy_id);

CREATE INDEX IF NOT EXISTS idx_charge_policy_version_workspace_id
  ON public.charge_policy_version (workspace_id);

CREATE INDEX IF NOT EXISTS idx_charge_policy_version_tax_treatment_id
  ON public.charge_policy_version (tax_treatment_id);

CREATE INDEX IF NOT EXISTS idx_charge_policy_version_cloned_from_version_id
  ON public.charge_policy_version (cloned_from_version_id)
  WHERE cloned_from_version_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS public.charge_policy_component (
  id text NOT NULL,
  workspace_id text NOT NULL,
  charge_policy_version_id text NOT NULL,
  component_role text NOT NULL,
  document_kind text NOT NULL,
  book_presentation text NOT NULL,
  sequence_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT charge_policy_component_pkey PRIMARY KEY (id),
  CONSTRAINT charge_policy_component_workspace_id_fkey
    FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT charge_policy_component_charge_policy_version_id_fkey
    FOREIGN KEY (charge_policy_version_id) REFERENCES public.charge_policy_version (id),
  CONSTRAINT charge_policy_component_role_chk
    CHECK (component_role IN ('CHARGE_COMPONENT_ROLE_OWN_REVENUE', 'CHARGE_COMPONENT_ROLE_RECOVERY_COST', 'CHARGE_COMPONENT_ROLE_FEE')),
  CONSTRAINT charge_policy_component_document_kind_chk
    CHECK (document_kind IN ('CHARGE_DOCUMENT_KIND_INVOICE', 'CHARGE_DOCUMENT_KIND_RECOVERY_DOCUMENT')),
  CONSTRAINT charge_policy_component_book_presentation_chk
    CHECK (book_presentation IN ('BOOK_PRESENTATION_REVENUE', 'BOOK_PRESENTATION_EXCLUDED_REIMBURSEMENT')),
  CONSTRAINT uq_charge_policy_component_version_role UNIQUE (charge_policy_version_id, component_role)
);

CREATE INDEX IF NOT EXISTS idx_charge_policy_component_charge_policy_version_id
  ON public.charge_policy_component (charge_policy_version_id);

CREATE INDEX IF NOT EXISTS idx_charge_policy_component_workspace_id
  ON public.charge_policy_component (workspace_id);

CREATE TABLE IF NOT EXISTS public.charge_policy_posting (
  id text NOT NULL,
  workspace_id text NOT NULL,
  charge_policy_version_id text NOT NULL,
  event text NOT NULL,
  posting_role text NOT NULL,
  account_id text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT charge_policy_posting_pkey PRIMARY KEY (id),
  CONSTRAINT charge_policy_posting_workspace_id_fkey
    FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT charge_policy_posting_charge_policy_version_id_fkey
    FOREIGN KEY (charge_policy_version_id) REFERENCES public.charge_policy_version (id),
  CONSTRAINT charge_policy_posting_account_id_fkey
    FOREIGN KEY (account_id) REFERENCES public.account (id),
  CONSTRAINT charge_policy_posting_event_chk
    CHECK (event IN ('CHARGE_POSTING_EVENT_ALLOCATION', 'CHARGE_POSTING_EVENT_ISSUE', 'CHARGE_POSTING_EVENT_APPLICATION', 'CHARGE_POSTING_EVENT_REVERSAL')),
  CONSTRAINT charge_policy_posting_role_chk
    CHECK (posting_role IN ('CHARGE_POSTING_ROLE_RECEIVABLE', 'CHARGE_POSTING_ROLE_CLEARING', 'CHARGE_POSTING_ROLE_REVENUE', 'CHARGE_POSTING_ROLE_REFUND_LIABILITY', 'CHARGE_POSTING_ROLE_EXPENSE', 'CHARGE_POSTING_ROLE_CASH')),
  CONSTRAINT uq_charge_policy_posting_version_event_role UNIQUE (charge_policy_version_id, event, posting_role)
);

CREATE INDEX IF NOT EXISTS idx_charge_policy_posting_charge_policy_version_id
  ON public.charge_policy_posting (charge_policy_version_id);

CREATE INDEX IF NOT EXISTS idx_charge_policy_posting_workspace_id
  ON public.charge_policy_posting (workspace_id);

CREATE INDEX IF NOT EXISTS idx_charge_policy_posting_account_id
  ON public.charge_policy_posting (account_id);

-- charge_policy_version_editor: every user who edited a DRAFT version (segregation of duties: the
-- approver is "self" when they are the preparer or any recorded editor).
CREATE TABLE IF NOT EXISTS public.charge_policy_version_editor (
  id text NOT NULL,
  workspace_id text NOT NULL,
  charge_policy_version_id text NOT NULL,
  user_id text NOT NULL,
  first_edited_at bigint NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT charge_policy_version_editor_pkey PRIMARY KEY (id),
  CONSTRAINT charge_policy_version_editor_workspace_id_fkey
    FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT charge_policy_version_editor_charge_policy_version_id_fkey
    FOREIGN KEY (charge_policy_version_id) REFERENCES public.charge_policy_version (id),
  CONSTRAINT charge_policy_version_editor_user_nonblank_chk CHECK (btrim(user_id) <> ''),
  CONSTRAINT uq_charge_policy_version_editor_version_user UNIQUE (charge_policy_version_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_charge_policy_version_editor_charge_policy_version_id
  ON public.charge_policy_version_editor (charge_policy_version_id);

CREATE INDEX IF NOT EXISTS idx_charge_policy_version_editor_workspace_id
  ON public.charge_policy_version_editor (workspace_id);

-- product_price_plan: opt-in charge policy + markup (both NULL = legacy behaviour). Each column
-- carries its own constraint so ADD COLUMN IF NOT EXISTS keeps the statement idempotent without
-- procedural blocks (the schema-release scanner accepts plain additive DDL only).
ALTER TABLE public.product_price_plan
  ADD COLUMN IF NOT EXISTS charge_policy_id text NULL
    CONSTRAINT product_price_plan_charge_policy_id_fkey REFERENCES public.charge_policy (id),
  ADD COLUMN IF NOT EXISTS markup_bps integer NULL
    CONSTRAINT product_price_plan_markup_bps_nonneg_chk CHECK (markup_bps IS NULL OR markup_bps >= 0);

CREATE INDEX IF NOT EXISTS idx_product_price_plan_charge_policy_id
  ON public.product_price_plan (charge_policy_id)
  WHERE charge_policy_id IS NOT NULL;
