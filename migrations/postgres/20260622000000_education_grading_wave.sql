-- =============================================================================
-- Education Job-Grading Build-Out — the full additive wave (T1)
--   16 new tables (7 grading scoring-primitives + the plan_group taxonomy pair +
--   the subscription_group cohort triplet + the 3 R5 visibility/capacity mints +
--   line_workspace_user) + the additive columns on existing operation tables.
-- =============================================================================
--
-- Purely additive. Every CREATE/ALTER is IF NOT EXISTS so the file is idempotent
-- and safe to (re-)apply against a DB whose grading layer is partially present.
-- New tables are EMPTY at create, so NOT NULL / UNIQUE ship directly in CREATE
-- (the NOT VALID->VALIDATE two-step only applies when ALTERing a POPULATED table).
--
-- Enum-discriminator columns are plain TEXT (no CHECK domain pin): the postgres
-- adapters round-trip the protojson SCREAMING enum name (e.g. SCORING_METHOD_SUM,
-- CAPACITY_MODE_UNLIMITED) directly, so a lowercase-token CHECK would reject them.
--
-- FK-ordered: score_scale -> score_scale_band/scoring_scheme -> scoring_component
-- -> scoring_component_criteria; plan_group -> plan_group_plan; subscription_group
-- -> its member/grant/class-edge children. job_outcome_line lands after
-- score_scale_band (FK) and references the pre-existing job_outcome_summary.
--
-- DDL bodies generated from proto (cmd/generate-ddl) then hand-ordered + guarded.
-- Authored directly into the sequence (not via db:diff) for the replay reason
-- documented in 20260607100000. Runs cleanly at HEAD.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Grading scoring-primitives (operation domain)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "score_scale" (
  "id" TEXT PRIMARY KEY,
  "scale_group_id" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  "version_status" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "scale_kind" TEXT NOT NULL,
  "input_unit" TEXT NOT NULL,
  "input_min" DOUBLE PRECISION NULL,
  "input_max" DOUBLE PRECISION NULL,
  "output_unit" TEXT NOT NULL,
  "workspace_id" TEXT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "created_by" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_score_scale_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);

CREATE TABLE IF NOT EXISTS "score_scale_band" (
  "id" TEXT PRIMARY KEY,
  "workspace_id" TEXT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "score_scale_id" TEXT NOT NULL,
  "sequence_order" INTEGER NOT NULL,
  "input_min" DOUBLE PRECISION NULL,
  "input_max" DOUBLE PRECISION NULL,
  "input_match" TEXT NULL,
  "output_value" DOUBLE PRECISION NULL,
  "output_label" TEXT NOT NULL,
  "band_role" TEXT NULL,
  "determination" TEXT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_score_scale_band_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_score_scale_band_score_scale_id" FOREIGN KEY ("score_scale_id") REFERENCES "score_scale"("id")
);

CREATE TABLE IF NOT EXISTS "scoring_scheme" (
  "id" TEXT PRIMARY KEY,
  "workspace_id" TEXT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "scheme_group_id" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  "version_status" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "composite_method" TEXT NOT NULL,
  "score_scale_id" TEXT NULL,
  "weights_must_sum_to_one" BOOLEAN NOT NULL DEFAULT false,
  "rounding_mode" TEXT NULL,
  CONSTRAINT "fk_scoring_scheme_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_scoring_scheme_score_scale_id" FOREIGN KEY ("score_scale_id") REFERENCES "score_scale"("id")
);

CREATE TABLE IF NOT EXISTS "scoring_component" (
  "id" TEXT PRIMARY KEY,
  "scoring_scheme_id" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "weight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
  "sequence_order" INTEGER NOT NULL,
  "parent_component_id" TEXT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_scoring_component_scoring_scheme_id" FOREIGN KEY ("scoring_scheme_id") REFERENCES "scoring_scheme"("id"),
  CONSTRAINT "fk_scoring_component_parent_component_id" FOREIGN KEY ("parent_component_id") REFERENCES "scoring_component"("id")
);

CREATE TABLE IF NOT EXISTS "scoring_component_criteria" (
  "id" TEXT PRIMARY KEY,
  "scoring_scheme_id" TEXT NOT NULL,
  "scoring_component_id" TEXT NOT NULL,
  "outcome_criteria_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "workspace_id" TEXT NOT NULL,
  CONSTRAINT "fk_scoring_component_criteria_scoring_scheme_id" FOREIGN KEY ("scoring_scheme_id") REFERENCES "scoring_scheme"("id"),
  CONSTRAINT "fk_scoring_component_criteria_scoring_component_id" FOREIGN KEY ("scoring_component_id") REFERENCES "scoring_component"("id"),
  CONSTRAINT "fk_scoring_component_criteria_outcome_criteria_id" FOREIGN KEY ("outcome_criteria_id") REFERENCES "outcome_criteria"("id"),
  CONSTRAINT "fk_scoring_component_criteria_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "uq_scoring_component_criteria_1" UNIQUE ("scoring_scheme_id", "scoring_component_id", "outcome_criteria_id")
);

CREATE TABLE IF NOT EXISTS "reporting_checkpoint" (
  "id" TEXT PRIMARY KEY,
  "checkpoint_group_id" TEXT NOT NULL,
  "version" INTEGER NOT NULL,
  "version_status" TEXT NOT NULL,
  "workspace_id" TEXT NULL,
  "period_id" TEXT NULL,
  "sequence_order" INTEGER NOT NULL,
  "role_code" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "is_terminal" BOOLEAN NOT NULL DEFAULT false,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  CONSTRAINT "fk_reporting_checkpoint_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);

CREATE TABLE IF NOT EXISTS "job_outcome_line" (
  "id" TEXT PRIMARY KEY,
  "job_outcome_summary_id" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "weight_or_credits" DOUBLE PRECISION NULL,
  "output_value" DOUBLE PRECISION NULL,
  "output_label" TEXT NULL,
  "score_scale_band_id" TEXT NULL,
  "reporting_role" TEXT NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "workspace_id" TEXT NOT NULL,
  "client_id" TEXT NULL,
  CONSTRAINT "fk_job_outcome_line_job_outcome_summary_id" FOREIGN KEY ("job_outcome_summary_id") REFERENCES "job_outcome_summary"("id"),
  CONSTRAINT "fk_job_outcome_line_score_scale_band_id" FOREIGN KEY ("score_scale_band_id") REFERENCES "score_scale_band"("id"),
  CONSTRAINT "fk_job_outcome_line_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_job_outcome_line_client_id" FOREIGN KEY ("client_id") REFERENCES "client"("id")
);

-- ---------------------------------------------------------------------------
-- 2. plan_group taxonomy pair (product domain)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "plan_group" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "workspace_id" TEXT NULL,
  "code" TEXT NULL,
  "parent_id" TEXT NULL,
  CONSTRAINT "fk_plan_group_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_plan_group_parent_id" FOREIGN KEY ("parent_id") REFERENCES "plan_group"("id")
);

CREATE TABLE IF NOT EXISTS "plan_group_plan" (
  "id" TEXT PRIMARY KEY,
  "plan_group_id" TEXT NOT NULL,
  "plan_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "workspace_id" TEXT NOT NULL,
  "sequence_order" INTEGER NULL,
  CONSTRAINT "fk_plan_group_plan_plan_group_id" FOREIGN KEY ("plan_group_id") REFERENCES "plan_group"("id"),
  CONSTRAINT "fk_plan_group_plan_plan_id" FOREIGN KEY ("plan_id") REFERENCES "plan"("id"),
  CONSTRAINT "fk_plan_group_plan_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "uq_plan_group_plan_1" UNIQUE ("plan_group_id", "plan_id")
);

CREATE TABLE IF NOT EXISTS "product_plan_staff" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "workspace_id" TEXT NOT NULL,
  "product_plan_id" TEXT NOT NULL,
  "staff_id" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  CONSTRAINT "fk_product_plan_staff_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_product_plan_staff_product_plan_id" FOREIGN KEY ("product_plan_id") REFERENCES "product_plan"("id"),
  CONSTRAINT "fk_product_plan_staff_staff_id" FOREIGN KEY ("staff_id") REFERENCES "staff"("id"),
  CONSTRAINT "uq_product_plan_staff_1" UNIQUE ("product_plan_id", "staff_id")
);

CREATE TABLE IF NOT EXISTS "line_workspace_user" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "workspace_id" TEXT NOT NULL,
  "line_id" TEXT NOT NULL,
  "workspace_user_id" TEXT NOT NULL,
  "scope" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "is_owner" BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT "fk_line_workspace_user_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_line_workspace_user_line_id" FOREIGN KEY ("line_id") REFERENCES "line"("id"),
  CONSTRAINT "fk_line_workspace_user_workspace_user_id" FOREIGN KEY ("workspace_user_id") REFERENCES "workspace_user"("id"),
  CONSTRAINT "uq_line_workspace_user_1" UNIQUE ("line_id", "workspace_user_id")
);

-- ---------------------------------------------------------------------------
-- 3. subscription_group cohort triplet + R5 class-edge / coordinator (subscription domain)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "subscription_group" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "kind" TEXT NOT NULL,
  "price_schedule_id" TEXT NULL,
  "workspace_id" TEXT NULL,
  "plan_id" TEXT NULL,
  "capacity_mode" TEXT NOT NULL,
  "max_capacity" INTEGER NULL,
  CONSTRAINT "fk_subscription_group_price_schedule_id" FOREIGN KEY ("price_schedule_id") REFERENCES "price_schedule"("id"),
  CONSTRAINT "fk_subscription_group_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_subscription_group_plan_id" FOREIGN KEY ("plan_id") REFERENCES "plan"("id")
);

CREATE TABLE IF NOT EXISTS "subscription_group_member" (
  "id" TEXT PRIMARY KEY,
  "subscription_group_id" TEXT NOT NULL,
  "subscription_id" TEXT NOT NULL,
  "client_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "workspace_id" TEXT NOT NULL,
  CONSTRAINT "fk_subscription_group_member_subscription_group_id" FOREIGN KEY ("subscription_group_id") REFERENCES "subscription_group"("id"),
  CONSTRAINT "fk_subscription_group_member_subscription_id" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id"),
  CONSTRAINT "fk_subscription_group_member_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "uq_subscription_group_member_1" UNIQUE ("subscription_group_id", "subscription_id")
);

CREATE TABLE IF NOT EXISTS "subscription_group_workspace_user" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "workspace_id" TEXT NOT NULL,
  "subscription_group_id" TEXT NOT NULL,
  "workspace_user_id" TEXT NOT NULL,
  "scope" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "is_owner" BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT "fk_subscription_group_workspace_user_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_subscription_group_workspace_user_subscription_group_id" FOREIGN KEY ("subscription_group_id") REFERENCES "subscription_group"("id"),
  CONSTRAINT "fk_subscription_group_workspace_user_workspace_user_id" FOREIGN KEY ("workspace_user_id") REFERENCES "workspace_user"("id"),
  CONSTRAINT "uq_subscription_group_workspace_user_1" UNIQUE ("subscription_group_id", "workspace_user_id")
);

CREATE TABLE IF NOT EXISTS "subscription_group_product_plan_staff" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "workspace_id" TEXT NOT NULL,
  "subscription_group_id" TEXT NOT NULL,
  "product_plan_id" TEXT NOT NULL,
  "staff_id" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  CONSTRAINT "fk_subscription_group_product_plan_staff_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_subscription_group_product_plan_staff_subscription_group_id" FOREIGN KEY ("subscription_group_id") REFERENCES "subscription_group"("id"),
  CONSTRAINT "fk_subscription_group_product_plan_staff_product_plan_id" FOREIGN KEY ("product_plan_id") REFERENCES "product_plan"("id"),
  CONSTRAINT "fk_subscription_group_product_plan_staff_staff_id" FOREIGN KEY ("staff_id") REFERENCES "staff"("id"),
  CONSTRAINT "uq_subscription_group_product_plan_staff_1" UNIQUE ("subscription_group_id", "product_plan_id", "staff_id")
);

CREATE TABLE IF NOT EXISTS "price_schedule_workspace_user" (
  "id" TEXT PRIMARY KEY,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "workspace_id" TEXT NOT NULL,
  "price_schedule_id" TEXT NOT NULL,
  "workspace_user_id" TEXT NOT NULL,
  "scope" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "is_owner" BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT "fk_price_schedule_workspace_user_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "fk_price_schedule_workspace_user_price_schedule_id" FOREIGN KEY ("price_schedule_id") REFERENCES "price_schedule"("id"),
  CONSTRAINT "fk_price_schedule_workspace_user_workspace_user_id" FOREIGN KEY ("workspace_user_id") REFERENCES "workspace_user"("id"),
  CONSTRAINT "uq_price_schedule_workspace_user_1" UNIQUE ("price_schedule_id", "workspace_user_id")
);

-- ---------------------------------------------------------------------------
-- 4. Additive columns on existing operation tables (the grading-wave fields).
--    All nullable / defaulted => safe on empty or populated tables.
-- ---------------------------------------------------------------------------

-- job_outcome_summary: resolved-scheme snapshot + scaled outputs + portal denorm.
ALTER TABLE "job_outcome_summary" ADD COLUMN IF NOT EXISTS "scoring_scheme_id" TEXT NULL;
ALTER TABLE "job_outcome_summary" ADD COLUMN IF NOT EXISTS "scaled_score" DOUBLE PRECISION NULL;
ALTER TABLE "job_outcome_summary" ADD COLUMN IF NOT EXISTS "scaled_label" TEXT NULL;
ALTER TABLE "job_outcome_summary" ADD COLUMN IF NOT EXISTS "workspace_id" TEXT NULL;
ALTER TABLE "job_outcome_summary" ADD COLUMN IF NOT EXISTS "client_id" TEXT NULL;

-- phase_outcome_summary: reporting-checkpoint FK + scaled outputs.
ALTER TABLE "phase_outcome_summary" ADD COLUMN IF NOT EXISTS "reporting_checkpoint_id" TEXT NULL;
ALTER TABLE "phase_outcome_summary" ADD COLUMN IF NOT EXISTS "scaled_score" DOUBLE PRECISION NULL;
ALTER TABLE "phase_outcome_summary" ADD COLUMN IF NOT EXISTS "scaled_label" TEXT NULL;

-- outcome_criteria: text-criterion minimum length (type-switched by criteria_type).
ALTER TABLE "outcome_criteria" ADD COLUMN IF NOT EXISTS "min_text_length" INTEGER NULL;

-- scoring-scheme resolution ladder anchors (NULL = inherit). Proto added these
-- only on job_phase + job_template_phase.
ALTER TABLE "job_template_phase" ADD COLUMN IF NOT EXISTS "scoring_scheme_id" TEXT NULL;
ALTER TABLE "job_phase" ADD COLUMN IF NOT EXISTS "scoring_scheme_id" TEXT NULL;

-- is_synthesized provenance — marks loader-materialized scaffold rows (Q7).
ALTER TABLE "job" ADD COLUMN IF NOT EXISTS "is_synthesized" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "job_phase" ADD COLUMN IF NOT EXISTS "is_synthesized" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "job_task" ADD COLUMN IF NOT EXISTS "is_synthesized" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "task_outcome" ADD COLUMN IF NOT EXISTS "is_synthesized" BOOLEAN NOT NULL DEFAULT false;
