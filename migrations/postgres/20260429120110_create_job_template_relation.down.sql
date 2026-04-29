-- Migration: create_job_template_relation (down)
-- Dialect: postgres
-- Created: 2026-04-29T12:01:10Z
-- Rationale: Reverses 20260429120110. Drops indexes then the table.

BEGIN;

DROP INDEX IF EXISTS idx_job_template_relation_child_template_id;
DROP INDEX IF EXISTS idx_job_template_relation_parent_template_id;

DROP TABLE IF EXISTS job_template_relation;

COMMIT;
