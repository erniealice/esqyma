ALTER TABLE plan DROP COLUMN parent_id;
DROP INDEX IF EXISTS idx_plan_parent_id;
