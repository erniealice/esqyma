BEGIN;
DROP INDEX IF EXISTS idx_product_plan_job_template_id;
ALTER TABLE product_plan DROP CONSTRAINT IF EXISTS fk_product_plan_job_template_id;
ALTER TABLE product_plan DROP COLUMN IF EXISTS job_template_id;
COMMIT;
