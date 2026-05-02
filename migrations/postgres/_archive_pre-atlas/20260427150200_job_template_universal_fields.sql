BEGIN;
ALTER TABLE job_template
  ADD COLUMN IF NOT EXISTS template_code              TEXT,
  ADD COLUMN IF NOT EXISTS revision                   INTEGER,
  ADD COLUMN IF NOT EXISTS version_status             TEXT,
  ADD COLUMN IF NOT EXISTS effective_from             BIGINT,
  ADD COLUMN IF NOT EXISTS effective_from_string      TEXT,
  ADD COLUMN IF NOT EXISTS effective_to               BIGINT,
  ADD COLUMN IF NOT EXISTS effective_to_string        TEXT,
  ADD COLUMN IF NOT EXISTS supersedes_template_id     TEXT REFERENCES job_template(id),
  ADD COLUMN IF NOT EXISTS change_request_id          TEXT,
  ADD COLUMN IF NOT EXISTS is_default                 BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS published_at               BIGINT,
  ADD COLUMN IF NOT EXISTS published_at_string        TEXT,
  ADD COLUMN IF NOT EXISTS published_by               TEXT,
  ADD COLUMN IF NOT EXISTS default_lot_size           INTEGER,
  ADD COLUMN IF NOT EXISTS default_uom                TEXT,
  ADD COLUMN IF NOT EXISTS output_product_id          TEXT REFERENCES product(id),
  ADD COLUMN IF NOT EXISTS output_product_variant_id  TEXT REFERENCES product_variant(id),
  ADD COLUMN IF NOT EXISTS workflow_template_id       TEXT;
CREATE INDEX idx_job_template_template_code
  ON job_template(template_code) WHERE template_code IS NOT NULL;
CREATE INDEX idx_job_template_change_request_id
  ON job_template(change_request_id) WHERE change_request_id IS NOT NULL;
CREATE INDEX idx_job_template_output_product_id
  ON job_template(output_product_id) WHERE output_product_id IS NOT NULL;
CREATE INDEX idx_job_template_output_product_variant_id
  ON job_template(output_product_variant_id) WHERE output_product_variant_id IS NOT NULL;
CREATE INDEX idx_job_template_workflow_template_id
  ON job_template(workflow_template_id) WHERE workflow_template_id IS NOT NULL;
COMMIT;
