-- atlas:txmode none
-- Migration: add_workspace_indexes_concurrently
-- Date: 2026-08-07
-- Plan: docs/plan/20260807-espyna-postgres-security-performance-profile
--
-- Build the nullable direct-anchor indexes after structural backfill without
-- blocking writes for the duration of an ordinary CREATE INDEX build. Atlas
-- runs this file outside a transaction because PostgreSQL forbids CONCURRENTLY
-- inside a transaction block. IF NOT EXISTS makes a clean retry safe; the
-- plan-local catalog oracle must still verify key, predicate, validity, and
-- readiness before the application rollout is accepted.

SET search_path TO public;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_job_phase_workspace_id
    ON job_phase USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_job_task_workspace_id
    ON job_task USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_job_template_phase_workspace_id
    ON job_template_phase USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_job_template_task_workspace_id
    ON job_template_task USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_job_template_relation_workspace_id
    ON job_template_relation USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_criteria_option_workspace_id
    ON criteria_option USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_criteria_threshold_workspace_id
    ON criteria_threshold USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_template_task_criteria_workspace_id
    ON template_task_criteria USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_task_outcome_workspace_id
    ON task_outcome USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_task_outcome_check_workspace_id
    ON task_outcome_check USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_phase_outcome_summary_workspace_id
    ON phase_outcome_summary USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_scoring_component_workspace_id
    ON scoring_component USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_treasury_collection_workspace_id
    ON treasury_collection USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_treasury_disbursement_workspace_id
    ON treasury_disbursement USING btree (workspace_id) WHERE workspace_id IS NOT NULL;
