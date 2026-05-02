ALTER TABLE product_plan ADD COLUMN job_template_id TEXT REFERENCES job_template(id);
CREATE INDEX idx_product_plan_job_template_id ON product_plan(job_template_id);
