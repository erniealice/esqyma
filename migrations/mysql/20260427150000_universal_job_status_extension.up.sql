-- Migration: universal_job_status_extension (up)
-- Dialect: mysql
-- Created: 2026-04-27T15:00:00Z
-- Rationale: Documents the append-only enum extensions for the universal job model
--            (Wave 1). No DDL change required — job.status, job_task.status, and
--            job_phase.status are stored as TEXT in this schema. New enum values
--            are valid string values; no constraint update needed.
--
-- Extended enums (append-only):
--   JobStatus:  added JOB_STATUS_PLANNED (7), JOB_STATUS_RELEASED (8)
--   TaskStatus: added TASK_STATUS_HOLD (5), TASK_STATUS_REWORK (6)
--   EntryType:  added ENTRY_TYPE_EQUIPMENT (4), ENTRY_TYPE_SUBCONTRACT (5)

SELECT 1; -- no-op anchor
