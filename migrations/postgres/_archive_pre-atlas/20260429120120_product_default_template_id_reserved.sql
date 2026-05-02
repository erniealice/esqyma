BEGIN;
DROP INDEX IF EXISTS idx_product_default_template_id;
ALTER TABLE product
  DROP COLUMN IF EXISTS default_template_id;
COMMIT;
