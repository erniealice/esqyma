-- Servicing-grant junctions (line / subscription_group / price_schedule _workspace_user):
-- Stage 4 — DROP the retired `scope` and `role` columns — of
-- docs/plan/20260721-servicing-grant-scope-role/ (Phase 3).
--
-- These two columns were superseded by the generic `capacity` axis added in
-- Stage 2 (20260723000000_servicing_grant_capacity.sql) and cut out of the
-- proto + all code in Stage 3 (2026-07-23: proto declares `reserved 10,11;` +
-- `reserved "scope","role";` on all 3 messages; `capacity = 13` kept). The drop
-- is safe because every junction adapter unmarshals with protojson
-- DiscardUnknown:true and never names these columns — a re-grep gate at HEAD
-- d5b9fea found ZERO live production readers of scope/role on the 3 junctions.
--
-- Scope is EXACTLY these 3 tables. `subscription_group_product_plan_staff` keeps
-- its own `role` column (it is NOT a target) and is deliberately untouched here.
-- The Stage-2 `capacity` column, its DEFAULT/NOT NULL, and both CHECK constraints
-- are all retained. `is_owner` is untouched.
--
-- IF EXISTS guards keep the file re-runnable and harmless on the non-atlas-tracked
-- education1 (already dropped there via direct psql on 2026-07-24).

ALTER TABLE "subscription_group_workspace_user" DROP COLUMN IF EXISTS "scope", DROP COLUMN IF EXISTS "role";
ALTER TABLE "line_workspace_user"               DROP COLUMN IF EXISTS "scope", DROP COLUMN IF EXISTS "role";
ALTER TABLE "price_schedule_workspace_user"     DROP COLUMN IF EXISTS "scope", DROP COLUMN IF EXISTS "role";
