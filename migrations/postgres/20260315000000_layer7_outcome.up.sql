-- Layer 7: Outcome Capture & Assessment
-- 8 new tables for operational outcome recording and evaluation

-- 1. outcome_criteria (independent - versioned criteria library)
CREATE TABLE IF NOT EXISTS "outcome_criteria" (
  "id" TEXT PRIMARY KEY,
  "criteria_group_id" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  "version_status" TEXT NOT NULL,
  "supersedes_id" TEXT NULL,
  "scope" TEXT NOT NULL,
  "industry_code" TEXT NULL,
  "workspace_id" TEXT NULL,
  "overrides_id" TEXT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NULL,
  "criteria_type" TEXT NOT NULL,
  "unit" TEXT NULL,
  "decimal_places" INTEGER NULL,
  "min_score" INTEGER NULL,
  "max_score" INTEGER NULL,
  "score_increment" DOUBLE PRECISION NULL,
  "pass_label" TEXT NULL,
  "fail_label" TEXT NULL,
  "max_text_length" INTEGER NULL,
  "text_prompt" TEXT NULL,
  "pass_rule" TEXT NULL,
  "min_pass_count" INTEGER NULL,
  "determination_mode" TEXT NOT NULL,
  "allowed_determinations" TEXT NOT NULL,
  "aggregation_method" TEXT NOT NULL,
  "aggregation_pass_pct" DOUBLE PRECISION NULL,
  "weight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
  "tags" TEXT NOT NULL,
  "required" BOOLEAN NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "created_by" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_outcome_criteria_supersedes_id" FOREIGN KEY ("supersedes_id") REFERENCES "outcome_criteria"("id"),
  CONSTRAINT "fk_outcome_criteria_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_outcome_criteria_overrides_id" FOREIGN KEY ("overrides_id") REFERENCES "outcome_criteria"("id")
);

-- 2. criteria_threshold (child of outcome_criteria)
CREATE TABLE IF NOT EXISTS "criteria_threshold" (
  "id" TEXT PRIMARY KEY,
  "outcome_criteria_id" TEXT NOT NULL,
  "threshold_role" TEXT NOT NULL,
  "value" DOUBLE PRECISION NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_criteria_threshold_outcome_criteria_id" FOREIGN KEY ("outcome_criteria_id") REFERENCES "outcome_criteria"("id")
);

CREATE INDEX IF NOT EXISTS "idx_criteria_threshold_outcome_criteria_id" ON "criteria_threshold" ("outcome_criteria_id");

-- 3. criteria_option (child of outcome_criteria)
CREATE TABLE IF NOT EXISTS "criteria_option" (
  "id" TEXT PRIMARY KEY,
  "outcome_criteria_id" TEXT NOT NULL,
  "option_key" TEXT NOT NULL,
  "option_label" TEXT NOT NULL,
  "display_order" INTEGER NOT NULL,
  "severity" INTEGER NULL,
  "maps_to_determination" TEXT NULL,
  "required" BOOLEAN NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_criteria_option_outcome_criteria_id" FOREIGN KEY ("outcome_criteria_id") REFERENCES "outcome_criteria"("id")
);

CREATE INDEX IF NOT EXISTS "idx_criteria_option_outcome_criteria_id" ON "criteria_option" ("outcome_criteria_id");

-- 4. template_task_criteria (junction: job_template_task <-> outcome_criteria)
CREATE TABLE IF NOT EXISTS "template_task_criteria" (
  "id" TEXT PRIMARY KEY,
  "job_template_task_id" TEXT NOT NULL,
  "outcome_criteria_id" TEXT NOT NULL,
  "sequence_order" INTEGER NOT NULL,
  "required_override" BOOLEAN NULL,
  "weight_override" DOUBLE PRECISION NULL,
  "aggregation_method_override" TEXT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  CONSTRAINT "fk_template_task_criteria_job_template_task_id" FOREIGN KEY ("job_template_task_id") REFERENCES "job_template_task"("id"),
  CONSTRAINT "fk_template_task_criteria_outcome_criteria_id" FOREIGN KEY ("outcome_criteria_id") REFERENCES "outcome_criteria"("id")
);

CREATE INDEX IF NOT EXISTS "idx_template_task_criteria_job_template_task_id" ON "template_task_criteria" ("job_template_task_id");
CREATE INDEX IF NOT EXISTS "idx_template_task_criteria_outcome_criteria_id" ON "template_task_criteria" ("outcome_criteria_id");

-- 5. task_outcome (recorded observations on active job tasks)
CREATE TABLE IF NOT EXISTS "task_outcome" (
  "id" TEXT PRIMARY KEY,
  "job_task_id" TEXT NOT NULL,
  "criteria_version_id" TEXT NOT NULL,
  "criteria_type" TEXT NOT NULL,
  "is_ad_hoc" BOOLEAN NOT NULL,
  "numeric_value" DOUBLE PRECISION NULL,
  "text_value" TEXT NULL,
  "categorical_value" TEXT NULL,
  "pass_fail_value" BOOLEAN NULL,
  "determination" TEXT NOT NULL,
  "determination_source" TEXT NOT NULL,
  "determination_note" TEXT NULL,
  "auto_proposed_determination" TEXT NULL,
  "recorded_by" TEXT NOT NULL,
  "recorded_date" BIGINT NULL,
  "recorded_by_name" TEXT NULL,
  "reviewed_by" TEXT NULL,
  "reviewed_date" BIGINT NULL,
  "attachment_ids" TEXT NOT NULL,
  "revision_of_id" TEXT NULL,
  "revision_number" INTEGER NOT NULL DEFAULT 1,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_task_outcome_job_task_id" FOREIGN KEY ("job_task_id") REFERENCES "job_task"("id"),
  CONSTRAINT "fk_task_outcome_criteria_version_id" FOREIGN KEY ("criteria_version_id") REFERENCES "outcome_criteria"("id"),
  CONSTRAINT "fk_task_outcome_recorded_by" FOREIGN KEY ("recorded_by") REFERENCES "staff"("id"),
  CONSTRAINT "fk_task_outcome_reviewed_by" FOREIGN KEY ("reviewed_by") REFERENCES "staff"("id"),
  CONSTRAINT "fk_task_outcome_revision_of_id" FOREIGN KEY ("revision_of_id") REFERENCES "task_outcome"("id")
);

CREATE INDEX IF NOT EXISTS "idx_task_outcome_job_task_id" ON "task_outcome" ("job_task_id");
CREATE INDEX IF NOT EXISTS "idx_task_outcome_criteria_version_id" ON "task_outcome" ("criteria_version_id");

-- 6. task_outcome_check (multi-check sub-item results)
CREATE TABLE IF NOT EXISTS "task_outcome_check" (
  "id" TEXT PRIMARY KEY,
  "task_outcome_id" TEXT NOT NULL,
  "criteria_option_id" TEXT NOT NULL,
  "checked" BOOLEAN NOT NULL,
  "note" TEXT NULL,
  "date_created" BIGINT NULL,
  CONSTRAINT "fk_task_outcome_check_task_outcome_id" FOREIGN KEY ("task_outcome_id") REFERENCES "task_outcome"("id"),
  CONSTRAINT "fk_task_outcome_check_criteria_option_id" FOREIGN KEY ("criteria_option_id") REFERENCES "criteria_option"("id")
);

CREATE INDEX IF NOT EXISTS "idx_task_outcome_check_task_outcome_id" ON "task_outcome_check" ("task_outcome_id");
CREATE INDEX IF NOT EXISTS "idx_task_outcome_check_criteria_option_id" ON "task_outcome_check" ("criteria_option_id");

-- 7. phase_outcome_summary (phase-level aggregated report)
CREATE TABLE IF NOT EXISTS "phase_outcome_summary" (
  "id" TEXT PRIMARY KEY,
  "job_phase_id" TEXT NOT NULL,
  "job_id" TEXT NOT NULL,
  "summary_type" TEXT NOT NULL,
  "phase_determination" TEXT NOT NULL,
  "scoring_method" TEXT NOT NULL,
  "summary_score" DOUBLE PRECISION NULL,
  "total_criteria_count" INTEGER NOT NULL,
  "pass_count" INTEGER NOT NULL,
  "fail_count" INTEGER NOT NULL,
  "conditional_count" INTEGER NOT NULL,
  "deferred_count" INTEGER NOT NULL,
  "na_count" INTEGER NOT NULL,
  "narrative" TEXT NULL,
  "issued_by" TEXT NOT NULL,
  "issued_date" BIGINT NULL,
  "supersedes_id" TEXT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_phase_outcome_summary_job_phase_id" FOREIGN KEY ("job_phase_id") REFERENCES "job_phase"("id"),
  CONSTRAINT "fk_phase_outcome_summary_job_id" FOREIGN KEY ("job_id") REFERENCES "job"("id"),
  CONSTRAINT "fk_phase_outcome_summary_issued_by" FOREIGN KEY ("issued_by") REFERENCES "staff"("id"),
  CONSTRAINT "fk_phase_outcome_summary_supersedes_id" FOREIGN KEY ("supersedes_id") REFERENCES "phase_outcome_summary"("id")
);

CREATE INDEX IF NOT EXISTS "idx_phase_outcome_summary_job_phase_id" ON "phase_outcome_summary" ("job_phase_id");
CREATE INDEX IF NOT EXISTS "idx_phase_outcome_summary_job_id" ON "phase_outcome_summary" ("job_id");

-- 8. job_outcome_summary (job-level aggregated report card)
CREATE TABLE IF NOT EXISTS "job_outcome_summary" (
  "id" TEXT PRIMARY KEY,
  "job_id" TEXT NOT NULL,
  "summary_type" TEXT NOT NULL,
  "overall_determination" TEXT NOT NULL,
  "scoring_method" TEXT NOT NULL,
  "summary_score" DOUBLE PRECISION NULL,
  "total_criteria_count" INTEGER NOT NULL,
  "pass_count" INTEGER NOT NULL,
  "fail_count" INTEGER NOT NULL,
  "conditional_count" INTEGER NOT NULL,
  "deferred_count" INTEGER NOT NULL,
  "na_count" INTEGER NOT NULL,
  "narrative" TEXT NULL,
  "issued_by" TEXT NOT NULL,
  "issued_date" BIGINT NULL,
  "valid_until_date" TEXT NULL,
  "supersedes_id" TEXT NULL,
  "attachment_ids" TEXT NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_job_outcome_summary_job_id" FOREIGN KEY ("job_id") REFERENCES "job"("id"),
  CONSTRAINT "fk_job_outcome_summary_issued_by" FOREIGN KEY ("issued_by") REFERENCES "staff"("id"),
  CONSTRAINT "fk_job_outcome_summary_supersedes_id" FOREIGN KEY ("supersedes_id") REFERENCES "job_outcome_summary"("id")
);

CREATE INDEX IF NOT EXISTS "idx_job_outcome_summary_job_id" ON "job_outcome_summary" ("job_id");
