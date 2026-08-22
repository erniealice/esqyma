-- Plan composition successor: additive ordered Plan -> JobTemplate association.
-- Enum values are stored numerically to match protojson UseEnumNumbers adapters.
CREATE TABLE IF NOT EXISTS "plan_job_template" (
  "id"                        TEXT PRIMARY KEY,
  "date_created"              BIGINT NULL,
  "date_modified"             BIGINT NULL,
  "active"                    BOOLEAN NOT NULL DEFAULT true,
  "plan_id"                   TEXT NOT NULL,
  "job_template_id"           TEXT NOT NULL,
  "sequence_order"            INTEGER NOT NULL DEFAULT 0,
  "composition_entry_pattern" INTEGER NOT NULL DEFAULT 0,
  "workspace_id"              TEXT NOT NULL,
  CONSTRAINT "plan_job_template_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("id"),
  CONSTRAINT "plan_job_template_job_template_id_fkey" FOREIGN KEY ("job_template_id") REFERENCES "job_template"("id"),
  CONSTRAINT "plan_job_template_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "ck_plan_job_template_pattern" CHECK ("composition_entry_pattern" IN (0, 1, 2))
);

CREATE UNIQUE INDEX IF NOT EXISTS "uq_plan_job_template_plan_template"
  ON "plan_job_template" ("workspace_id", "plan_id", "job_template_id");
CREATE INDEX IF NOT EXISTS "idx_plan_job_template_plan_order"
  ON "plan_job_template" ("workspace_id", "plan_id", "sequence_order", "id")
  WHERE "active" = true;
CREATE INDEX IF NOT EXISTS "idx_plan_job_template_job_template_id"
  ON "plan_job_template" ("job_template_id");
