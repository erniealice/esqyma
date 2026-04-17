-- Migration: add_job_template_id_to_product_plan (up)
-- Dialect: postgres
-- Created: 2026-04-13T10:00:00Z

ALTER TABLE product_plan ADD COLUMN job_template_id TEXT REFERENCES job_template(id);
CREATE INDEX idx_product_plan_job_template_id ON product_plan(job_template_id);
