-- Migration: pay_cycle (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:00:00Z
-- Rationale: Drops PayCycle entity.

BEGIN;

DROP INDEX IF EXISTS idx_pay_cycle_run_sequence;
DROP INDEX IF EXISTS idx_pay_cycle_status;
DROP INDEX IF EXISTS idx_pay_cycle_payroll_run_id;
DROP INDEX IF EXISTS idx_pay_cycle_workspace_id;
DROP TABLE IF EXISTS pay_cycle;

COMMIT;
