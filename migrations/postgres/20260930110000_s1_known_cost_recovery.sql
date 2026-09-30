-- Usage & pass-through charges, Slice B (S1 known-cost recovery): 11 new tables.
-- cost_source_component, allocation_batch, allocation_share, agreement_line_term, billable_charge,
-- charge_component, document_series, recovery_document, recovery_document_line, collection_application,
-- charge_effect. Additive only: no ALTER of existing tables, no data, no drops. Enums are stored as their
-- proto name strings (protojson bridge). Dates are ISO text (half-open [from,to)). Money = integer centavos.
-- Plain additive DDL (no DO blocks) so the schema-release scanner accepts it.
-- Spec: docs/plan/20260927-usage-and-pass-through-charges/build-spec.md section 6.2.

-- cost_source_component
CREATE TABLE IF NOT EXISTS public.cost_source_component (
  id text NOT NULL,
  workspace_id text NOT NULL,
  expenditure_id text NOT NULL,
  expenditure_line_item_id text NULL,
  component_kind text NOT NULL,
  description text NULL,
  basis_unit text NULL,
  basis_quantity_scaled bigint NULL,
  basis_scale integer NULL,
  amount bigint NOT NULL,
  currency text NOT NULL,
  tax_treatment_id text NULL,
  tax_fact text NULL,
  service_from text NULL,
  service_to text NULL,
  source_version integer NOT NULL DEFAULT 1,
  claim_kind text NULL,
  claim_ref_id text NULL,
  claimed_at bigint NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT cost_source_component_pkey PRIMARY KEY (id),
  CONSTRAINT cost_source_component_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT cost_source_component_expenditure_id_fkey FOREIGN KEY (expenditure_id) REFERENCES public.expenditure (id),
  CONSTRAINT cost_source_component_expenditure_line_item_id_fkey FOREIGN KEY (expenditure_line_item_id) REFERENCES public.expenditure_line_item (id),
  CONSTRAINT cost_source_component_component_kind_chk CHECK (component_kind IN ('COST_SOURCE_COMPONENT_KIND_ENERGY', 'COST_SOURCE_COMPONENT_KIND_WATER', 'COST_SOURCE_COMPONENT_KIND_SERVICE_FEE', 'COST_SOURCE_COMPONENT_KIND_OTHER')),
  CONSTRAINT cost_source_component_tax_treatment_id_fkey FOREIGN KEY (tax_treatment_id) REFERENCES public.tax_treatment (id),
  CONSTRAINT cost_source_component_tax_fact_chk CHECK (tax_fact IS NULL OR tax_fact IN ('COST_TAX_FACT_VATABLE', 'COST_TAX_FACT_EXEMPT', 'COST_TAX_FACT_ZERO_RATED', 'COST_TAX_FACT_NOT_APPLICABLE')),
  CONSTRAINT cost_source_component_claim_kind_chk CHECK (claim_kind IS NULL OR claim_kind IN ('SOURCE_CLAIM_KIND_ALLOCATION', 'SOURCE_CLAIM_KIND_RECOGNITION')),
  CONSTRAINT cost_source_component_amount_positive_chk CHECK (amount > 0),
  CONSTRAINT cost_source_component_service_interval_chk CHECK (service_from IS NULL OR service_to IS NULL OR service_from < service_to),
  CONSTRAINT cost_source_component_source_version_chk CHECK (source_version > 0)
);

CREATE INDEX IF NOT EXISTS idx_cost_source_component_workspace_id
  ON public.cost_source_component (workspace_id);

CREATE INDEX IF NOT EXISTS idx_cost_source_component_expenditure_id
  ON public.cost_source_component (expenditure_id);

CREATE INDEX IF NOT EXISTS idx_cost_source_component_expenditure_line_item_id
  ON public.cost_source_component (expenditure_line_item_id);

CREATE INDEX IF NOT EXISTS idx_cost_source_component_tax_treatment_id
  ON public.cost_source_component (tax_treatment_id);

-- allocation_batch
CREATE TABLE IF NOT EXISTS public.allocation_batch (
  id text NOT NULL,
  workspace_id text NOT NULL,
  cost_source_component_id text NOT NULL,
  revision integer NOT NULL,
  supersedes_id text NULL,
  status text NOT NULL,
  rule_code text NOT NULL DEFAULT 'LARGEST_REMAINDER',
  rule_version integer NOT NULL DEFAULT 1,
  total_amount bigint NULL,
  currency text NULL,
  published_at bigint NULL,
  published_by text NULL,
  prepared_by text NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT allocation_batch_pkey PRIMARY KEY (id),
  CONSTRAINT allocation_batch_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT allocation_batch_cost_source_component_id_fkey FOREIGN KEY (cost_source_component_id) REFERENCES public.cost_source_component (id),
  CONSTRAINT allocation_batch_supersedes_id_fkey FOREIGN KEY (supersedes_id) REFERENCES public.allocation_batch (id),
  CONSTRAINT allocation_batch_status_chk CHECK (status IN ('ALLOCATION_BATCH_STATUS_DRAFT', 'ALLOCATION_BATCH_STATUS_PUBLISHED', 'ALLOCATION_BATCH_STATUS_SUPERSEDED')),
  CONSTRAINT allocation_batch_revision_positive_chk CHECK (revision > 0),
  CONSTRAINT uq_allocation_batch_component_revision UNIQUE (cost_source_component_id, revision)
);

CREATE INDEX IF NOT EXISTS idx_allocation_batch_workspace_id
  ON public.allocation_batch (workspace_id);

CREATE INDEX IF NOT EXISTS idx_allocation_batch_cost_source_component_id
  ON public.allocation_batch (cost_source_component_id);

CREATE UNIQUE INDEX IF NOT EXISTS uq_allocation_batch_one_published ON public.allocation_batch (cost_source_component_id) WHERE status = 'ALLOCATION_BATCH_STATUS_PUBLISHED';

CREATE INDEX IF NOT EXISTS idx_allocation_batch_supersedes_id
  ON public.allocation_batch (supersedes_id)
  WHERE supersedes_id IS NOT NULL;

-- allocation_share
CREATE TABLE IF NOT EXISTS public.allocation_share (
  id text NOT NULL,
  workspace_id text NOT NULL,
  allocation_batch_id text NOT NULL,
  share_kind text NOT NULL,
  subscription_id text NULL,
  client_id text NULL,
  basis_numerator bigint NOT NULL DEFAULT 0,
  basis_denominator bigint NOT NULL,
  amount bigint NOT NULL DEFAULT 0,
  sequence_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT allocation_share_pkey PRIMARY KEY (id),
  CONSTRAINT allocation_share_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT allocation_share_allocation_batch_id_fkey FOREIGN KEY (allocation_batch_id) REFERENCES public.allocation_batch (id),
  CONSTRAINT allocation_share_share_kind_chk CHECK (share_kind IN ('ALLOCATION_SHARE_KIND_RECOVERABLE', 'ALLOCATION_SHARE_KIND_OWN_USE', 'ALLOCATION_SHARE_KIND_VACANCY', 'ALLOCATION_SHARE_KIND_COMMON_LOSS')),
  CONSTRAINT allocation_share_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription (id),
  CONSTRAINT allocation_share_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client (id),
  CONSTRAINT allocation_share_recoverable_target_chk CHECK (share_kind <> 'ALLOCATION_SHARE_KIND_RECOVERABLE' OR (subscription_id IS NOT NULL AND client_id IS NOT NULL)),
  CONSTRAINT allocation_share_numerator_nonneg_chk CHECK (basis_numerator >= 0),
  CONSTRAINT allocation_share_denominator_positive_chk CHECK (basis_denominator > 0),
  CONSTRAINT uq_allocation_share_batch_sequence UNIQUE (allocation_batch_id, sequence_order)
);

CREATE INDEX IF NOT EXISTS idx_allocation_share_workspace_id
  ON public.allocation_share (workspace_id);

CREATE INDEX IF NOT EXISTS idx_allocation_share_allocation_batch_id
  ON public.allocation_share (allocation_batch_id);

CREATE INDEX IF NOT EXISTS idx_allocation_share_subscription_id
  ON public.allocation_share (subscription_id);

CREATE INDEX IF NOT EXISTS idx_allocation_share_client_id
  ON public.allocation_share (client_id);

-- agreement_line_term
CREATE TABLE IF NOT EXISTS public.agreement_line_term (
  id text NOT NULL,
  workspace_id text NOT NULL,
  subscription_id text NOT NULL,
  product_price_plan_id text NOT NULL,
  client_id text NOT NULL,
  charge_policy_version_id text NOT NULL,
  markup_bps integer NULL,
  effective_from text NOT NULL,
  effective_to text NULL,
  origin text NOT NULL,
  accepted_at bigint NULL,
  accepted_by text NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT agreement_line_term_pkey PRIMARY KEY (id),
  CONSTRAINT agreement_line_term_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT agreement_line_term_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription (id),
  CONSTRAINT agreement_line_term_product_price_plan_id_fkey FOREIGN KEY (product_price_plan_id) REFERENCES public.product_price_plan (id),
  CONSTRAINT agreement_line_term_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client (id),
  CONSTRAINT agreement_line_term_charge_policy_version_id_fkey FOREIGN KEY (charge_policy_version_id) REFERENCES public.charge_policy_version (id),
  CONSTRAINT agreement_line_term_origin_chk CHECK (origin IN ('AGREEMENT_LINE_TERM_ORIGIN_COPIED', 'AGREEMENT_LINE_TERM_ORIGIN_NEGOTIATED')),
  CONSTRAINT agreement_line_term_markup_nonneg_chk CHECK (markup_bps IS NULL OR markup_bps >= 0),
  CONSTRAINT uq_agreement_line_term_sub_ppp_from UNIQUE (subscription_id, product_price_plan_id, effective_from)
);

CREATE INDEX IF NOT EXISTS idx_agreement_line_term_workspace_id
  ON public.agreement_line_term (workspace_id);

CREATE INDEX IF NOT EXISTS idx_agreement_line_term_subscription_id
  ON public.agreement_line_term (subscription_id);

CREATE INDEX IF NOT EXISTS idx_agreement_line_term_product_price_plan_id
  ON public.agreement_line_term (product_price_plan_id);

CREATE INDEX IF NOT EXISTS idx_agreement_line_term_client_id
  ON public.agreement_line_term (client_id);

CREATE INDEX IF NOT EXISTS idx_agreement_line_term_charge_policy_version_id
  ON public.agreement_line_term (charge_policy_version_id);

-- billable_charge
CREATE TABLE IF NOT EXISTS public.billable_charge (
  id text NOT NULL,
  workspace_id text NOT NULL,
  obligation_key text NOT NULL,
  content_hash text NOT NULL,
  subscription_id text NULL,
  client_id text NULL,
  agreement_line_term_id text NULL,
  charge_policy_version_id text NULL,
  allocation_share_id text NULL,
  charge_kind text NOT NULL,
  predecessor_id text NULL,
  evidence_revision integer NOT NULL DEFAULT 1,
  rating_revision integer NOT NULL DEFAULT 1,
  amount bigint NOT NULL DEFAULT 0,
  currency text NOT NULL,
  service_from text NULL,
  service_to text NULL,
  accounting_date text NULL,
  status text NOT NULL,
  reason text NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT billable_charge_pkey PRIMARY KEY (id),
  CONSTRAINT billable_charge_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT billable_charge_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription (id),
  CONSTRAINT billable_charge_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client (id),
  CONSTRAINT billable_charge_agreement_line_term_id_fkey FOREIGN KEY (agreement_line_term_id) REFERENCES public.agreement_line_term (id),
  CONSTRAINT billable_charge_charge_policy_version_id_fkey FOREIGN KEY (charge_policy_version_id) REFERENCES public.charge_policy_version (id),
  CONSTRAINT billable_charge_allocation_share_id_fkey FOREIGN KEY (allocation_share_id) REFERENCES public.allocation_share (id),
  CONSTRAINT billable_charge_charge_kind_chk CHECK (charge_kind IN ('BILLABLE_CHARGE_KIND_ORIGINAL', 'BILLABLE_CHARGE_KIND_CORRECTION')),
  CONSTRAINT billable_charge_predecessor_id_fkey FOREIGN KEY (predecessor_id) REFERENCES public.billable_charge (id),
  CONSTRAINT billable_charge_status_chk CHECK (status IN ('BILLABLE_CHARGE_STATUS_OPEN', 'BILLABLE_CHARGE_STATUS_ISSUED', 'BILLABLE_CHARGE_STATUS_CANCELLED')),
  CONSTRAINT billable_charge_correction_predecessor_chk CHECK (charge_kind <> 'BILLABLE_CHARGE_KIND_CORRECTION' OR predecessor_id IS NOT NULL),
  CONSTRAINT billable_charge_obligation_key_nonblank_chk CHECK (btrim(obligation_key) <> ''),
  CONSTRAINT uq_billable_charge_workspace_obligation_key UNIQUE (workspace_id, obligation_key)
);

CREATE INDEX IF NOT EXISTS idx_billable_charge_workspace_id
  ON public.billable_charge (workspace_id);

CREATE INDEX IF NOT EXISTS idx_billable_charge_subscription_id
  ON public.billable_charge (subscription_id);

CREATE INDEX IF NOT EXISTS idx_billable_charge_client_id
  ON public.billable_charge (client_id);

CREATE INDEX IF NOT EXISTS idx_billable_charge_allocation_share_id
  ON public.billable_charge (allocation_share_id);

CREATE INDEX IF NOT EXISTS idx_billable_charge_agreement_line_term_id
  ON public.billable_charge (agreement_line_term_id)
  WHERE agreement_line_term_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_billable_charge_charge_policy_version_id
  ON public.billable_charge (charge_policy_version_id)
  WHERE charge_policy_version_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_billable_charge_predecessor_id
  ON public.billable_charge (predecessor_id)
  WHERE predecessor_id IS NOT NULL;

-- charge_component
CREATE TABLE IF NOT EXISTS public.charge_component (
  id text NOT NULL,
  workspace_id text NOT NULL,
  billable_charge_id text NOT NULL,
  component_role text NOT NULL,
  document_kind text NOT NULL,
  book_presentation text NOT NULL,
  tax_position text NOT NULL,
  amount bigint NOT NULL DEFAULT 0,
  currency text NOT NULL,
  cost_source_component_id text NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT charge_component_pkey PRIMARY KEY (id),
  CONSTRAINT charge_component_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT charge_component_billable_charge_id_fkey FOREIGN KEY (billable_charge_id) REFERENCES public.billable_charge (id),
  CONSTRAINT charge_component_component_role_chk CHECK (component_role IN ('CHARGE_COMPONENT_ROLE_OWN_REVENUE', 'CHARGE_COMPONENT_ROLE_RECOVERY_COST', 'CHARGE_COMPONENT_ROLE_FEE')),
  CONSTRAINT charge_component_document_kind_chk CHECK (document_kind IN ('CHARGE_DOCUMENT_KIND_INVOICE', 'CHARGE_DOCUMENT_KIND_RECOVERY_DOCUMENT')),
  CONSTRAINT charge_component_book_presentation_chk CHECK (book_presentation IN ('BOOK_PRESENTATION_REVENUE', 'BOOK_PRESENTATION_EXCLUDED_REIMBURSEMENT')),
  CONSTRAINT charge_component_tax_position_chk CHECK (tax_position IN ('TAX_POSITION_OWN_SUPPLY', 'TAX_POSITION_EXCLUDED_REIMBURSEMENT')),
  CONSTRAINT charge_component_cost_source_component_id_fkey FOREIGN KEY (cost_source_component_id) REFERENCES public.cost_source_component (id)
);

CREATE INDEX IF NOT EXISTS idx_charge_component_workspace_id
  ON public.charge_component (workspace_id);

CREATE INDEX IF NOT EXISTS idx_charge_component_billable_charge_id
  ON public.charge_component (billable_charge_id);

CREATE INDEX IF NOT EXISTS idx_charge_component_cost_source_component_id
  ON public.charge_component (cost_source_component_id);

-- document_series
CREATE TABLE IF NOT EXISTS public.document_series (
  id text NOT NULL,
  workspace_id text NOT NULL,
  code text NOT NULL,
  name text NULL,
  issuer_name text NOT NULL,
  issuer_tax_id text NULL,
  document_kind text NOT NULL,
  prefix text NULL,
  branch_code text NULL,
  fiscal_reset text NOT NULL,
  next_number bigint NOT NULL DEFAULT 1,
  number_padding integer NOT NULL DEFAULT 6,
  status text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT document_series_pkey PRIMARY KEY (id),
  CONSTRAINT document_series_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT document_series_document_kind_chk CHECK (document_kind IN ('CHARGE_DOCUMENT_KIND_INVOICE', 'CHARGE_DOCUMENT_KIND_RECOVERY_DOCUMENT')),
  CONSTRAINT document_series_fiscal_reset_chk CHECK (fiscal_reset IN ('DOCUMENT_SERIES_FISCAL_RESET_NONE', 'DOCUMENT_SERIES_FISCAL_RESET_YEARLY')),
  CONSTRAINT document_series_status_chk CHECK (status IN ('DOCUMENT_SERIES_STATUS_ACTIVE', 'DOCUMENT_SERIES_STATUS_RETIRED')),
  CONSTRAINT document_series_next_number_positive_chk CHECK (next_number > 0),
  CONSTRAINT document_series_code_nonblank_chk CHECK (btrim(code) <> ''),
  CONSTRAINT uq_document_series_workspace_code UNIQUE (workspace_id, code)
);

CREATE INDEX IF NOT EXISTS idx_document_series_workspace_id
  ON public.document_series (workspace_id);

-- recovery_document
CREATE TABLE IF NOT EXISTS public.recovery_document (
  id text NOT NULL,
  workspace_id text NOT NULL,
  document_series_id text NOT NULL,
  sequence_number bigint NOT NULL,
  document_number text NOT NULL,
  document_type text NOT NULL,
  corrects_document_id text NULL,
  client_id text NOT NULL,
  subscription_id text NULL,
  issue_date text NULL,
  due_date text NULL,
  total_amount bigint NOT NULL DEFAULT 0,
  currency text NOT NULL,
  status text NOT NULL,
  issuance_key text NOT NULL,
  issued_by text NULL,
  issued_at bigint NULL,
  void_reason text NULL,
  voided_at bigint NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT recovery_document_pkey PRIMARY KEY (id),
  CONSTRAINT recovery_document_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT recovery_document_document_series_id_fkey FOREIGN KEY (document_series_id) REFERENCES public.document_series (id),
  CONSTRAINT recovery_document_document_type_chk CHECK (document_type IN ('RECOVERY_DOCUMENT_TYPE_STATEMENT', 'RECOVERY_DOCUMENT_TYPE_CREDIT_NOTE')),
  CONSTRAINT recovery_document_corrects_document_id_fkey FOREIGN KEY (corrects_document_id) REFERENCES public.recovery_document (id),
  CONSTRAINT recovery_document_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client (id),
  CONSTRAINT recovery_document_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscription (id),
  CONSTRAINT recovery_document_status_chk CHECK (status IN ('RECOVERY_DOCUMENT_STATUS_ISSUED', 'RECOVERY_DOCUMENT_STATUS_VOID')),
  CONSTRAINT recovery_document_credit_note_corrects_chk CHECK (document_type <> 'RECOVERY_DOCUMENT_TYPE_CREDIT_NOTE' OR corrects_document_id IS NOT NULL),
  CONSTRAINT recovery_document_issuance_key_nonblank_chk CHECK (btrim(issuance_key) <> ''),
  CONSTRAINT uq_recovery_document_series_sequence UNIQUE (document_series_id, sequence_number),
  CONSTRAINT uq_recovery_document_series_number UNIQUE (document_series_id, document_number),
  CONSTRAINT uq_recovery_document_workspace_issuance_key UNIQUE (workspace_id, issuance_key)
);

CREATE INDEX IF NOT EXISTS idx_recovery_document_workspace_id
  ON public.recovery_document (workspace_id);

CREATE INDEX IF NOT EXISTS idx_recovery_document_document_series_id
  ON public.recovery_document (document_series_id);

CREATE INDEX IF NOT EXISTS idx_recovery_document_client_id
  ON public.recovery_document (client_id);

CREATE INDEX IF NOT EXISTS idx_recovery_document_subscription_id
  ON public.recovery_document (subscription_id);

CREATE INDEX IF NOT EXISTS idx_recovery_document_corrects_document_id
  ON public.recovery_document (corrects_document_id)
  WHERE corrects_document_id IS NOT NULL;

-- recovery_document_line
CREATE TABLE IF NOT EXISTS public.recovery_document_line (
  id text NOT NULL,
  workspace_id text NOT NULL,
  recovery_document_id text NOT NULL,
  charge_component_id text NOT NULL,
  description text NULL,
  amount bigint NOT NULL DEFAULT 0,
  currency text NOT NULL,
  service_from text NULL,
  service_to text NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT recovery_document_line_pkey PRIMARY KEY (id),
  CONSTRAINT recovery_document_line_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT recovery_document_line_recovery_document_id_fkey FOREIGN KEY (recovery_document_id) REFERENCES public.recovery_document (id),
  CONSTRAINT recovery_document_line_charge_component_id_fkey FOREIGN KEY (charge_component_id) REFERENCES public.charge_component (id),
  CONSTRAINT uq_recovery_document_line_component UNIQUE (charge_component_id)
);

CREATE INDEX IF NOT EXISTS idx_recovery_document_line_workspace_id
  ON public.recovery_document_line (workspace_id);

CREATE INDEX IF NOT EXISTS idx_recovery_document_line_recovery_document_id
  ON public.recovery_document_line (recovery_document_id);

-- collection_application
CREATE TABLE IF NOT EXISTS public.collection_application (
  id text NOT NULL,
  workspace_id text NOT NULL,
  treasury_collection_id text NOT NULL,
  client_id text NOT NULL,
  target_kind text NOT NULL,
  revenue_id text NULL,
  recovery_document_id text NULL,
  application_kind text NOT NULL,
  withholding_certificate_id text NULL,
  charge_component_id text NULL,
  amount bigint NOT NULL,
  currency text NOT NULL,
  applied_at bigint NULL,
  applied_by text NULL,
  order_rank integer NULL,
  reverses_application_id text NULL,
  status text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT collection_application_pkey PRIMARY KEY (id),
  CONSTRAINT collection_application_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT collection_application_treasury_collection_id_fkey FOREIGN KEY (treasury_collection_id) REFERENCES public.treasury_collection (id),
  CONSTRAINT collection_application_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client (id),
  CONSTRAINT collection_application_target_kind_chk CHECK (target_kind IN ('APPLICATION_TARGET_KIND_REVENUE', 'APPLICATION_TARGET_KIND_RECOVERY_DOCUMENT')),
  CONSTRAINT collection_application_revenue_id_fkey FOREIGN KEY (revenue_id) REFERENCES public.revenue (id),
  CONSTRAINT collection_application_recovery_document_id_fkey FOREIGN KEY (recovery_document_id) REFERENCES public.recovery_document (id),
  CONSTRAINT collection_application_application_kind_chk CHECK (application_kind IN ('APPLICATION_KIND_CASH', 'APPLICATION_KIND_NON_CASH_SETTLEMENT')),
  CONSTRAINT collection_application_withholding_certificate_id_fkey FOREIGN KEY (withholding_certificate_id) REFERENCES public.withholding_certificate (id),
  CONSTRAINT collection_application_charge_component_id_fkey FOREIGN KEY (charge_component_id) REFERENCES public.charge_component (id),
  CONSTRAINT collection_application_reverses_application_id_fkey FOREIGN KEY (reverses_application_id) REFERENCES public.collection_application (id),
  CONSTRAINT collection_application_status_chk CHECK (status IN ('APPLICATION_STATUS_APPLIED', 'APPLICATION_STATUS_REVERSED')),
  CONSTRAINT collection_application_target_chk CHECK ((target_kind = 'APPLICATION_TARGET_KIND_REVENUE' AND revenue_id IS NOT NULL AND recovery_document_id IS NULL) OR (target_kind = 'APPLICATION_TARGET_KIND_RECOVERY_DOCUMENT' AND recovery_document_id IS NOT NULL AND revenue_id IS NULL)),
  CONSTRAINT collection_application_amount_positive_chk CHECK (amount > 0),
  CONSTRAINT collection_application_non_cash_certificate_chk CHECK (application_kind <> 'APPLICATION_KIND_NON_CASH_SETTLEMENT' OR withholding_certificate_id IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_collection_application_workspace_id
  ON public.collection_application (workspace_id);

CREATE INDEX IF NOT EXISTS idx_collection_application_treasury_collection_id
  ON public.collection_application (treasury_collection_id);

CREATE INDEX IF NOT EXISTS idx_collection_application_client_id
  ON public.collection_application (client_id);

CREATE INDEX IF NOT EXISTS idx_collection_application_revenue_id
  ON public.collection_application (revenue_id);

CREATE INDEX IF NOT EXISTS idx_collection_application_recovery_document_id
  ON public.collection_application (recovery_document_id);

CREATE INDEX IF NOT EXISTS idx_collection_application_charge_component_id ON public.collection_application (charge_component_id) WHERE charge_component_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_collection_application_withholding_certificate_id
  ON public.collection_application (withholding_certificate_id)
  WHERE withholding_certificate_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_collection_application_reverses_application_id
  ON public.collection_application (reverses_application_id)
  WHERE reverses_application_id IS NOT NULL;

-- charge_effect
CREATE TABLE IF NOT EXISTS public.charge_effect (
  id text NOT NULL,
  workspace_id text NOT NULL,
  event_kind text NOT NULL,
  event_id text NOT NULL,
  posting_role text NOT NULL,
  account_id text NOT NULL,
  direction text NOT NULL,
  amount bigint NOT NULL,
  currency text NOT NULL,
  event_date text NULL,
  charge_policy_version_id text NULL,
  rule_version integer NULL,
  source_ref text NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT charge_effect_pkey PRIMARY KEY (id),
  CONSTRAINT charge_effect_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT charge_effect_event_kind_chk CHECK (event_kind IN ('CHARGE_POSTING_EVENT_ALLOCATION', 'CHARGE_POSTING_EVENT_ISSUE', 'CHARGE_POSTING_EVENT_APPLICATION', 'CHARGE_POSTING_EVENT_REVERSAL')),
  CONSTRAINT charge_effect_posting_role_chk CHECK (posting_role IN ('CHARGE_POSTING_ROLE_RECEIVABLE', 'CHARGE_POSTING_ROLE_CLEARING', 'CHARGE_POSTING_ROLE_REVENUE', 'CHARGE_POSTING_ROLE_REFUND_LIABILITY', 'CHARGE_POSTING_ROLE_EXPENSE', 'CHARGE_POSTING_ROLE_CASH')),
  CONSTRAINT charge_effect_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account (id),
  CONSTRAINT charge_effect_direction_chk CHECK (direction IN ('EFFECT_DIRECTION_DEBIT', 'EFFECT_DIRECTION_CREDIT')),
  CONSTRAINT charge_effect_charge_policy_version_id_fkey FOREIGN KEY (charge_policy_version_id) REFERENCES public.charge_policy_version (id),
  CONSTRAINT charge_effect_amount_positive_chk CHECK (amount > 0),
  CONSTRAINT uq_charge_effect_event UNIQUE (event_kind, event_id, posting_role, direction)
);

CREATE INDEX IF NOT EXISTS idx_charge_effect_workspace_id
  ON public.charge_effect (workspace_id);

CREATE INDEX IF NOT EXISTS idx_charge_effect_account_id
  ON public.charge_effect (account_id);

CREATE INDEX IF NOT EXISTS idx_charge_effect_charge_policy_version_id
  ON public.charge_effect (charge_policy_version_id)
  WHERE charge_policy_version_id IS NOT NULL;
