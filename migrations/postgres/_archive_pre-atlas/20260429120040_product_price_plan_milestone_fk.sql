BEGIN;
ALTER TABLE product_price_plan
  ADD COLUMN IF NOT EXISTS job_template_phase_id TEXT REFERENCES job_template_phase(id);
CREATE INDEX IF NOT EXISTS idx_product_price_plan_job_template_phase_id
  ON product_price_plan(job_template_phase_id);
COMMIT;
