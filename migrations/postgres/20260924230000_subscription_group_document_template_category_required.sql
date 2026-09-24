-- Every subscription-group document template binding names one job category:
-- the table binds only the group-matrix data source (one group × one job
-- category × one period). Additive: NOT VALID, then a separate VALIDATE.
-- Precondition: zero rows with job_category_id IS NULL.

ALTER TABLE public.subscription_group_document_template
  ADD CONSTRAINT ck_sgdt_job_category_required
  CHECK (job_category_id IS NOT NULL) NOT VALID;

ALTER TABLE public.subscription_group_document_template
  VALIDATE CONSTRAINT ck_sgdt_job_category_required;

COMMENT ON COLUMN public.subscription_group_document_template.job_category_id
  IS 'Required job category (job_category.id). A binding serves one job category of the group-matrix data source.';
