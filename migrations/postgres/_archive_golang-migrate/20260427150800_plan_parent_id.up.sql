BEGIN;

ALTER TABLE plan
  ADD COLUMN parent_id TEXT REFERENCES plan(id) ON DELETE RESTRICT;
CREATE INDEX idx_plan_parent_id ON plan(parent_id) WHERE parent_id IS NOT NULL;

COMMIT;
