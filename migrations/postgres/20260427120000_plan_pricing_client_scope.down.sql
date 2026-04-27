ALTER TABLE plan           DROP COLUMN client_id;
ALTER TABLE price_plan     DROP COLUMN client_id;
ALTER TABLE price_schedule DROP COLUMN client_id;
DROP INDEX IF EXISTS idx_plan_client_id;
DROP INDEX IF EXISTS idx_price_plan_client_id;
DROP INDEX IF EXISTS idx_price_schedule_client_id;
