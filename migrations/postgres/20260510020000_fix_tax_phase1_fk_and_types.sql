-- Fix Phase 1 codex-review findings:
--   (HIGH) Add missing FK on revenue_tax_line.source_registration_id_snapshot → tax_registration(id)
--          (the load-bearing audit primitive per plan.md "RevenueTaxLine.source_registration_id_snapshot is the audit record")
--   (MED)  Change revenue.tax_computation_enabled_snapshot from TEXT to BOOLEAN to match
--          the source field type on workspace.tax_computation_enabled.
--
-- Both columns were added in 20260509220000_add_tax_integration.sql with no data.

-- Add audit FK to tax_registration
ALTER TABLE "public"."revenue_tax_line"
  ADD CONSTRAINT "revenue_tax_line_source_registration_fk"
  FOREIGN KEY ("source_registration_id_snapshot")
  REFERENCES "public"."tax_registration" ("id")
  ON DELETE RESTRICT;

-- Add the supporting index for the FK
CREATE INDEX IF NOT EXISTS "idx_revenue_tax_line_source_registration"
  ON "public"."revenue_tax_line" ("source_registration_id_snapshot");

-- Drop and re-add tax_computation_enabled_snapshot as BOOLEAN
-- Safe: column was just added in the prior migration with no data.
ALTER TABLE "public"."revenue"
  DROP COLUMN "tax_computation_enabled_snapshot";

ALTER TABLE "public"."revenue"
  ADD COLUMN "tax_computation_enabled_snapshot" boolean NULL;
