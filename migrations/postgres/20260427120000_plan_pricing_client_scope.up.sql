BEGIN;

ALTER TABLE plan
  ADD COLUMN client_id TEXT REFERENCES client(id) ON DELETE RESTRICT;
CREATE INDEX idx_plan_client_id ON plan(client_id) WHERE client_id IS NOT NULL;

ALTER TABLE price_plan
  ADD COLUMN client_id TEXT REFERENCES client(id) ON DELETE RESTRICT;
CREATE INDEX idx_price_plan_client_id ON price_plan(client_id) WHERE client_id IS NOT NULL;

ALTER TABLE price_schedule
  ADD COLUMN client_id TEXT REFERENCES client(id) ON DELETE RESTRICT;
CREATE INDEX idx_price_schedule_client_id ON price_schedule(client_id) WHERE client_id IS NOT NULL;

COMMIT;
