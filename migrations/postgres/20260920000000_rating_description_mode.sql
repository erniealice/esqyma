-- Rating description mode is an additive, data-neutral expand release.
-- Existing template_task_criteria rows remain NULL/legacy-standard. Wording is
-- intentionally not seeded here: it is binding-specific configuration and is
-- populated later through the reviewed authoring/data path.

ALTER TABLE public.template_task_criteria
  ADD COLUMN rating_mode text NULL,
  ADD COLUMN rating_scale_id text NULL,
  ADD CONSTRAINT template_task_criteria_rating_scale_id_fkey
    FOREIGN KEY (rating_scale_id) REFERENCES public.score_scale(id)
    ON DELETE NO ACTION NOT VALID;

ALTER TABLE public.template_task_criteria
  VALIDATE CONSTRAINT template_task_criteria_rating_scale_id_fkey;

CREATE TABLE public.template_task_criteria_rating_description (
  id text NOT NULL,
  template_task_criteria_id text NOT NULL,
  score_scale_band_id text NOT NULL,
  description text NOT NULL,
  sequence_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  workspace_id text NULL,
  date_created bigint NULL,
  date_modified bigint NULL,
  CONSTRAINT template_task_criteria_rating_description_pkey PRIMARY KEY (id),
  CONSTRAINT template_task_criteria_rating_description_ttc_fkey
    FOREIGN KEY (template_task_criteria_id)
    REFERENCES public.template_task_criteria(id)
    ON DELETE NO ACTION,
  CONSTRAINT template_task_criteria_rating_description_band_fkey
    FOREIGN KEY (score_scale_band_id)
    REFERENCES public.score_scale_band(id)
    ON DELETE NO ACTION,
  CONSTRAINT template_task_criteria_rating_description_workspace_fkey
    FOREIGN KEY (workspace_id)
    REFERENCES public.workspace(id)
    ON DELETE NO ACTION,
  CONSTRAINT template_task_criteria_rating_description_unique_band
    UNIQUE (template_task_criteria_id, score_scale_band_id),
  CONSTRAINT template_task_criteria_rating_description_nonblank
    CHECK (btrim(description) <> '')
);

CREATE INDEX idx_template_task_criteria_rating_description_ttc
  ON public.template_task_criteria_rating_description (template_task_criteria_id);

CREATE INDEX idx_template_task_criteria_rating_description_band
  ON public.template_task_criteria_rating_description (score_scale_band_id);

CREATE INDEX idx_template_task_criteria_rating_description_workspace
  ON public.template_task_criteria_rating_description (workspace_id)
  WHERE workspace_id IS NOT NULL;
