-- Migration: universal_job_status_extension (down)
-- Dialect: postgres
-- Created: 2026-04-27T15:00:00Z
-- Rationale: No DDL was applied in the up migration; nothing to revert.
--            Enum values are stored as TEXT — removing them from application
--            code is sufficient; no database change required.

SELECT 1; -- no-op anchor
