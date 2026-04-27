-- Migration: universal_job_status_extension (up)
-- Dialect: postgres
-- Created: 2026-04-27T15:00:00Z
-- Rationale: Documents the append-only enum extensions introduced by the universal
--            job model redesign (Wave 1). No DDL change is required because all
--            enum-typed fields on job/job_task are stored as TEXT in this schema
--            (confirmed by 0001_initial.sql: "status" TEXT NOT NULL on job, job_task,
--            job_phase). New enum values are valid TEXT values; the database imposes
--            no CHECK constraint on them.
--
-- Extended enums (append-only — existing integer tags preserved):
--   JobStatus:  added JOB_STATUS_PLANNED (7), JOB_STATUS_RELEASED (8)
--   TaskStatus: added TASK_STATUS_HOLD (5), TASK_STATUS_REWORK (6)
--   EntryType:  added ENTRY_TYPE_EQUIPMENT (4), ENTRY_TYPE_SUBCONTRACT (5)
--
-- No-op migration: intentionally empty DDL body.
-- See redesign-proto.md §3 for full enum change manifest.

SELECT 1; -- no-op anchor so the migration runner records this version
