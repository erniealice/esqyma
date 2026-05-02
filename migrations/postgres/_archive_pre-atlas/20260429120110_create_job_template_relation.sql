BEGIN;
CREATE TABLE IF NOT EXISTS job_template_relation (
  id                      TEXT PRIMARY KEY,

  -- Audit
  date_created            BIGINT,
  date_created_string     TEXT,
  date_modified           BIGINT,
  date_modified_string    TEXT,
  active                  BOOLEAN NOT NULL DEFAULT true,

  -- The relationship
  parent_template_id      TEXT NOT NULL REFERENCES job_template(id),
  child_template_id       TEXT NOT NULL REFERENCES job_template(id),

  -- Deterministic spawn order; ascending integer.
  sequence_order          INTEGER NOT NULL DEFAULT 0,

  -- Stored as integer proto enum tag; SUB_TEMPLATE = 1.
  relation_type           INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_job_template_relation_parent_template_id
  ON job_template_relation(parent_template_id);
CREATE INDEX IF NOT EXISTS idx_job_template_relation_child_template_id
  ON job_template_relation(child_template_id);
COMMIT;
