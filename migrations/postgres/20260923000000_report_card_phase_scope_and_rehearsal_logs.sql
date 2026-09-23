-- Add a nullable report-card binding period. NULL preserves the current
-- whole-year behavior; a code selects one job-template phase. Version numbers
-- remain unique per workspace/schedule across period codes under the existing
-- published-version index. This release makes no contract/index removal.
--
-- The two durable rollback logs belong to the managed audit_trail schema,
-- outside production's public-table RLS overlay. The separately reviewed
-- Education data scripts require these tables and write scoped preimages.

ALTER TABLE public.job_outcome_summary_document_template
  ADD COLUMN job_template_phase_code text NULL;

ALTER TABLE public.job_outcome_summary_document_template
  ADD CONSTRAINT ck_jos_doc_tmpl_phase_code
  CHECK (job_template_phase_code IS NULL OR
    (job_template_phase_code = lower(btrim(job_template_phase_code)) AND
     job_template_phase_code ~ '^[a-z][a-z0-9_]*$')) NOT VALID;

ALTER TABLE public.job_outcome_summary_document_template
  VALIDATE CONSTRAINT ck_jos_doc_tmpl_phase_code;

COMMENT ON COLUMN public.job_outcome_summary_document_template.job_template_phase_code
  IS 'Optional period scope (job_template_phase.code). NULL = whole-year report card; set = that period''s document.';

CREATE TABLE audit_trail.zz_term_rename_c1_log (
  workspace_id text NOT NULL,
  run_id text NOT NULL,
  phase_id text NOT NULL,
  prior_code text,
  prior_order integer,
  prior_active boolean,
  logged_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz,
  CONSTRAINT pk_zz_term_rename_c1_log PRIMARY KEY (workspace_id, run_id, phase_id)
);

CREATE TABLE audit_trail.zz_ay2627_staff_cleanup_log (
  workspace_id text NOT NULL,
  run_id text NOT NULL,
  step text NOT NULL,
  table_name text NOT NULL,
  row_id text NOT NULL,
  action text NOT NULL,
  prior_active boolean,
  prior_role text,
  prior_phase text,
  prior_class text,
  prior_pps text,
  logged_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz,
  CONSTRAINT pk_zz_ay2627_staff_cleanup_log PRIMARY KEY (workspace_id, run_id, step, table_name, row_id, action)
);
