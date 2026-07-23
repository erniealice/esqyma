-- Servicing-grant junctions (line/subscription_group/price_schedule _workspace_user):
-- add DEFAULT '' to the NOT NULL scope/role TEXT columns.
--
-- Why: the generic create path serializes the proto via protojson, which OMITS
-- empty-string (zero-value) fields. Without a column default an unset scope/role
-- is absent from the INSERT and lands NULL, violating NOT NULL — which blocked
-- UI creation of servicing grants (e.g. AY2026-27 section advisers). Adding a
-- DEFAULT '' makes an omitted column fall back to '' (matching all existing rows).
--
-- Additive + reversible; mirrors the proto source of truth
-- (options.v1.db.default = "" on scope f10 / role f11 in the 3 protos).
-- These columns are slated for REMOVAL — see
-- docs/plan/20260721-servicing-grant-scope-role/ (generic capacity refactor).

ALTER TABLE "line_workspace_user"               ALTER COLUMN "scope" SET DEFAULT '';
ALTER TABLE "line_workspace_user"               ALTER COLUMN "role"  SET DEFAULT '';
ALTER TABLE "subscription_group_workspace_user" ALTER COLUMN "scope" SET DEFAULT '';
ALTER TABLE "subscription_group_workspace_user" ALTER COLUMN "role"  SET DEFAULT '';
ALTER TABLE "price_schedule_workspace_user"     ALTER COLUMN "scope" SET DEFAULT '';
ALTER TABLE "price_schedule_workspace_user"     ALTER COLUMN "role"  SET DEFAULT '';
