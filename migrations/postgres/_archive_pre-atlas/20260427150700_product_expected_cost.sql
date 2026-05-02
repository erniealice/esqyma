BEGIN;
ALTER TABLE product
  ADD COLUMN IF NOT EXISTS expected_cost          BIGINT,
  ADD COLUMN IF NOT EXISTS expected_cost_currency TEXT,
  ADD COLUMN IF NOT EXISTS default_template_id    TEXT REFERENCES job_template(id);
CREATE INDEX idx_product_default_template_id
  ON product(default_template_id) WHERE default_template_id IS NOT NULL;
COMMIT;
