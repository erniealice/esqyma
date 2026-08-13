-- Plan execution strategy parity (20260813-current-section-export-plan-root-exclusion).
--
-- The reportability work tracks a per-plan strategy value. Existing environments already
-- have the proto field, but some lanes lack the persisted column and defaults.
--
-- Keep the migration additive and idempotent for environments where execution_strategy
-- already exists from earlier schema paths.

ALTER TABLE "plan" ADD COLUMN IF NOT EXISTS "execution_strategy" TEXT;

-- Backfill historical and newly created Plan rows to the default execution mode.
-- Keep existing explicit non-empty values unchanged.
UPDATE "plan"
SET "execution_strategy" = 'template_driven'
WHERE NULLIF(BTRIM("execution_strategy"), '') IS NULL
   OR "execution_strategy" NOT IN ('template_driven', 'manual_or_task_driven', 'seat_or_assignment_driven');

ALTER TABLE "plan" ALTER COLUMN "execution_strategy" SET DEFAULT 'template_driven';
