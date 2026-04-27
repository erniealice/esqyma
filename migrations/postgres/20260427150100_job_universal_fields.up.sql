-- Migration: job_universal_fields (up)
-- Dialect: postgres
-- Created: 2026-04-27T15:01:00Z
-- Rationale: Adds 27 columns to the job table to support the universal job model
--            (Wave 1). Fields cover output product, scheduling dates, costing,
--            hierarchy linkage, and workflow integration. See redesign-proto.md §2.1.
--            All columns are nullable with no defaults unless noted.
--            Note: proto field 48 was wip_account_id in the redesign doc; it is
--            stored as cost_account_id here per the C1 rename decision.

BEGIN;

ALTER TABLE job
  ADD COLUMN IF NOT EXISTS output_product_id           TEXT REFERENCES product(id),
  ADD COLUMN IF NOT EXISTS output_product_variant_id   TEXT REFERENCES product_variant(id),
  ADD COLUMN IF NOT EXISTS planned_quantity             DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS output_uom                  TEXT,
  ADD COLUMN IF NOT EXISTS due_date                    BIGINT,
  ADD COLUMN IF NOT EXISTS due_date_string             TEXT,
  ADD COLUMN IF NOT EXISTS release_date                BIGINT,
  ADD COLUMN IF NOT EXISTS release_date_string         TEXT,
  ADD COLUMN IF NOT EXISTS planned_start               BIGINT,
  ADD COLUMN IF NOT EXISTS planned_start_string        TEXT,
  ADD COLUMN IF NOT EXISTS planned_end                 BIGINT,
  ADD COLUMN IF NOT EXISTS planned_end_string          TEXT,
  ADD COLUMN IF NOT EXISTS actual_start                BIGINT,
  ADD COLUMN IF NOT EXISTS actual_start_string         TEXT,
  ADD COLUMN IF NOT EXISTS actual_end                  BIGINT,
  ADD COLUMN IF NOT EXISTS actual_end_string           TEXT,
  ADD COLUMN IF NOT EXISTS priority                    INTEGER,
  ADD COLUMN IF NOT EXISTS parent_job_id               TEXT REFERENCES job(id),
  ADD COLUMN IF NOT EXISTS predecessor_job_ids         TEXT[],
  ADD COLUMN IF NOT EXISTS sales_order_line_id         TEXT,
  ADD COLUMN IF NOT EXISTS resource_id                 TEXT REFERENCES resource(id),
  ADD COLUMN IF NOT EXISTS currency                    TEXT,
  ADD COLUMN IF NOT EXISTS cost_account_id             TEXT REFERENCES account(id),
  ADD COLUMN IF NOT EXISTS job_template_revision_snapshot INTEGER,
  ADD COLUMN IF NOT EXISTS job_template_revision_id    TEXT,
  ADD COLUMN IF NOT EXISTS change_request_id           TEXT,
  ADD COLUMN IF NOT EXISTS workflow_instance_id        TEXT;

CREATE INDEX idx_job_output_product_id
  ON job(output_product_id) WHERE output_product_id IS NOT NULL;
CREATE INDEX idx_job_output_product_variant_id
  ON job(output_product_variant_id) WHERE output_product_variant_id IS NOT NULL;
CREATE INDEX idx_job_parent_job_id
  ON job(parent_job_id) WHERE parent_job_id IS NOT NULL;
CREATE INDEX idx_job_sales_order_line_id
  ON job(sales_order_line_id) WHERE sales_order_line_id IS NOT NULL;
CREATE INDEX idx_job_resource_id
  ON job(resource_id) WHERE resource_id IS NOT NULL;
CREATE INDEX idx_job_cost_account_id
  ON job(cost_account_id) WHERE cost_account_id IS NOT NULL;
CREATE INDEX idx_job_job_template_revision_id
  ON job(job_template_revision_id) WHERE job_template_revision_id IS NOT NULL;
CREATE INDEX idx_job_change_request_id
  ON job(change_request_id) WHERE change_request_id IS NOT NULL;
CREATE INDEX idx_job_workflow_instance_id
  ON job(workflow_instance_id) WHERE workflow_instance_id IS NOT NULL;

COMMIT;
