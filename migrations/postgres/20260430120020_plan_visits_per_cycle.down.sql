-- Migration: plan_visits_per_cycle (down)
-- Dialect: postgres
-- Created: 2026-04-30T12:00:20Z

BEGIN;

ALTER TABLE plan DROP COLUMN IF EXISTS visits_per_cycle;

COMMIT;
