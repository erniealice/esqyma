-- Rating description sets: reusable rubric text (set header + per-criterion/band entry) linked to
-- an offering (product_plan) x academic year (price_schedule) via rating_description_set_product_plan.
-- Additive only: 3 new tables, no ALTER of existing tables, no data. version_status reuses the
-- VERSION_STATUS_DRAFT/PUBLISHED/DEPRECATED strings from packages/esqyma/proto/v1/domain/operation/
-- enums/enums.proto:213 (as stored by other VersionStatus-bearing tables, e.g. outcome_criteria).
-- See docs/plan/20260925-criterion-descriptors-by-program-year/schema-proposal.md §1-4, §9.2-9.3.

CREATE TABLE IF NOT EXISTS public.rating_description_set (
  id text NOT NULL,
  workspace_id text NOT NULL,
  code text NULL,
  version integer NOT NULL,
  version_status text NOT NULL,
  supersedes_id text NULL,
  name text NOT NULL,
  score_scale_id text NOT NULL,
  source_ref text NULL,
  source_sha256 text NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT rating_description_set_pkey PRIMARY KEY (id),
  CONSTRAINT rating_description_set_workspace_id_fkey
    FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT rating_description_set_score_scale_id_fkey
    FOREIGN KEY (score_scale_id) REFERENCES public.score_scale (id),
  CONSTRAINT rating_description_set_supersedes_id_fkey
    FOREIGN KEY (supersedes_id) REFERENCES public.rating_description_set (id),
  CONSTRAINT rating_description_set_version_positive_chk
    CHECK (version > 0),
  CONSTRAINT rating_description_set_name_nonblank_chk
    CHECK (btrim(name) <> '')
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_rating_description_set_supersedes_id
  ON public.rating_description_set (supersedes_id)
  WHERE supersedes_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_rating_description_set_workspace_code_version
  ON public.rating_description_set (workspace_id, code, version)
  WHERE code IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_rating_description_set_workspace_id
  ON public.rating_description_set (workspace_id);

CREATE INDEX IF NOT EXISTS idx_rating_description_set_score_scale_id
  ON public.rating_description_set (score_scale_id);

CREATE TABLE IF NOT EXISTS public.rating_description_set_entry (
  id text NOT NULL,
  workspace_id text NOT NULL,
  rating_description_set_id text NOT NULL,
  outcome_criteria_id text NOT NULL,
  score_scale_band_id text NOT NULL,
  description text NOT NULL,
  sequence_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT rating_description_set_entry_pkey PRIMARY KEY (id),
  CONSTRAINT rating_description_set_entry_workspace_id_fkey
    FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT rating_description_set_entry_rating_description_set_id_fkey
    FOREIGN KEY (rating_description_set_id) REFERENCES public.rating_description_set (id),
  CONSTRAINT rating_description_set_entry_outcome_criteria_id_fkey
    FOREIGN KEY (outcome_criteria_id) REFERENCES public.outcome_criteria (id),
  CONSTRAINT rating_description_set_entry_score_scale_band_id_fkey
    FOREIGN KEY (score_scale_band_id) REFERENCES public.score_scale_band (id),
  CONSTRAINT rating_description_set_entry_description_nonblank_chk
    CHECK (btrim(description) <> ''),
  CONSTRAINT uq_rating_description_set_entry_set_criterion_band
    UNIQUE (rating_description_set_id, outcome_criteria_id, score_scale_band_id)
);

CREATE INDEX IF NOT EXISTS idx_rating_description_set_entry_rating_description_set_id
  ON public.rating_description_set_entry (rating_description_set_id);

CREATE INDEX IF NOT EXISTS idx_rating_description_set_entry_workspace_id
  ON public.rating_description_set_entry (workspace_id);

CREATE INDEX IF NOT EXISTS idx_rating_description_set_entry_outcome_criteria_id
  ON public.rating_description_set_entry (outcome_criteria_id);

CREATE INDEX IF NOT EXISTS idx_rating_description_set_entry_score_scale_band_id
  ON public.rating_description_set_entry (score_scale_band_id);

CREATE TABLE IF NOT EXISTS public.rating_description_set_product_plan (
  id text NOT NULL,
  workspace_id text NOT NULL,
  rating_description_set_id text NOT NULL,
  product_plan_id text NOT NULL,
  price_schedule_id text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT rating_description_set_product_plan_pkey PRIMARY KEY (id),
  CONSTRAINT rating_description_set_product_plan_workspace_id_fkey
    FOREIGN KEY (workspace_id) REFERENCES public.workspace (id),
  CONSTRAINT rating_description_set_product_plan_rating_description_set_fkey
    FOREIGN KEY (rating_description_set_id) REFERENCES public.rating_description_set (id),
  CONSTRAINT rating_description_set_product_plan_product_plan_id_fkey
    FOREIGN KEY (product_plan_id) REFERENCES public.product_plan (id),
  CONSTRAINT rating_description_set_product_plan_price_schedule_id_fkey
    FOREIGN KEY (price_schedule_id) REFERENCES public.price_schedule (id)
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_rating_description_set_product_plan_active_pair
  ON public.rating_description_set_product_plan (product_plan_id, price_schedule_id)
  WHERE active;

CREATE INDEX IF NOT EXISTS idx_rating_description_set_product_plan_pair
  ON public.rating_description_set_product_plan (product_plan_id, price_schedule_id);

CREATE INDEX IF NOT EXISTS idx_rating_description_set_product_plan_set_id
  ON public.rating_description_set_product_plan (rating_description_set_id);

CREATE INDEX IF NOT EXISTS idx_rating_description_set_product_plan_workspace_id
  ON public.rating_description_set_product_plan (workspace_id);
