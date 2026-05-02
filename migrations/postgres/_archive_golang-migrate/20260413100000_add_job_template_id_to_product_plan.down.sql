-- Migration: add_job_template_id_to_product_plan (down)
-- Dialect: postgres
-- Created: 2026-04-13T10:00:00Z

DROP INDEX IF EXISTS idx_product_plan_job_template_id;
ALTER TABLE product_plan DROP COLUMN IF EXISTS job_template_id;
