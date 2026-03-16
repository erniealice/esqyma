-- Layer 7: Outcome Capture & Assessment — Rollback
-- Drop in reverse dependency order

DROP TABLE IF EXISTS "job_outcome_summary";
DROP TABLE IF EXISTS "phase_outcome_summary";
DROP TABLE IF EXISTS "task_outcome_check";
DROP TABLE IF EXISTS "task_outcome";
DROP TABLE IF EXISTS "template_task_criteria";
DROP TABLE IF EXISTS "criteria_option";
DROP TABLE IF EXISTS "criteria_threshold";
DROP TABLE IF EXISTS "outcome_criteria";
