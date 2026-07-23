-- Servicing-grant junctions (line / subscription_group / price_schedule _workspace_user):
-- add the generic `capacity` servicing axis — Stage 2 of
-- docs/plan/20260721-servicing-grant-scope-role/ (O-1/O-3 LOCKED 2026-07-23:
-- Option B closed-domain string code, vocabulary {'primary','access'}).
--
-- capacity replaces `role`'s information content (backfill: role='staff' → 'primary',
-- role='teacher' → 'access', ELSE 'access' as the least-privilege floor); `is_owner`
-- is unchanged. The domain CHECK closes the value set; the owner CHECK forbids the
-- nonsensical (capacity='access', is_owner=true) combination. DEFAULT 'access' backstops
-- the protojson zero-omission create path. NOT NULL is safe in the same migration
-- because the backfill guarantees 0 NULLs. `scope`/`role` are NOT touched here
-- (proto cutover = Stage 3; DROP COLUMN = Stage 4, playbook-gated).
-- Until Stage 3 lands, the DB carries `capacity` unknown to the proto — harmless:
-- all three junction adapters unmarshal with protojson DiscardUnknown:true
-- (descriptor/shadow column-set telemetry may log a disagreement; expected, transient).

ALTER TABLE "line_workspace_user"               ADD COLUMN IF NOT EXISTS "capacity" TEXT NULL;
ALTER TABLE "subscription_group_workspace_user" ADD COLUMN IF NOT EXISTS "capacity" TEXT NULL;
ALTER TABLE "price_schedule_workspace_user"     ADD COLUMN IF NOT EXISTS "capacity" TEXT NULL;

UPDATE "line_workspace_user"               SET "capacity" = CASE WHEN "role" = 'staff' THEN 'primary' WHEN "role" = 'teacher' THEN 'access' ELSE 'access' END WHERE "capacity" IS NULL;
UPDATE "subscription_group_workspace_user" SET "capacity" = CASE WHEN "role" = 'staff' THEN 'primary' WHEN "role" = 'teacher' THEN 'access' ELSE 'access' END WHERE "capacity" IS NULL;
UPDATE "price_schedule_workspace_user"     SET "capacity" = CASE WHEN "role" = 'staff' THEN 'primary' WHEN "role" = 'teacher' THEN 'access' ELSE 'access' END WHERE "capacity" IS NULL;

ALTER TABLE "line_workspace_user"               ALTER COLUMN "capacity" SET DEFAULT 'access';
ALTER TABLE "subscription_group_workspace_user" ALTER COLUMN "capacity" SET DEFAULT 'access';
ALTER TABLE "price_schedule_workspace_user"     ALTER COLUMN "capacity" SET DEFAULT 'access';

ALTER TABLE "line_workspace_user"               ALTER COLUMN "capacity" SET NOT NULL;
ALTER TABLE "subscription_group_workspace_user" ALTER COLUMN "capacity" SET NOT NULL;
ALTER TABLE "price_schedule_workspace_user"     ALTER COLUMN "capacity" SET NOT NULL;

-- Domain CHECK (NOT VALID → VALIDATE, per the 2-step convention; DROP-IF-EXISTS guards
-- keep the file re-runnable on the non-atlas-tracked education1).
ALTER TABLE "line_workspace_user"               DROP CONSTRAINT IF EXISTS "line_workspace_user_capacity_domain_check";
ALTER TABLE "line_workspace_user"               ADD CONSTRAINT "line_workspace_user_capacity_domain_check" CHECK ("capacity" IN ('primary','access')) NOT VALID;
ALTER TABLE "subscription_group_workspace_user" DROP CONSTRAINT IF EXISTS "subscription_group_workspace_user_capacity_domain_check";
ALTER TABLE "subscription_group_workspace_user" ADD CONSTRAINT "subscription_group_workspace_user_capacity_domain_check" CHECK ("capacity" IN ('primary','access')) NOT VALID;
ALTER TABLE "price_schedule_workspace_user"     DROP CONSTRAINT IF EXISTS "price_schedule_workspace_user_capacity_domain_check";
ALTER TABLE "price_schedule_workspace_user"     ADD CONSTRAINT "price_schedule_workspace_user_capacity_domain_check" CHECK ("capacity" IN ('primary','access')) NOT VALID;

-- Impossible-combo CHECK: an access-capacity member can never be the designated lead.
ALTER TABLE "line_workspace_user"               DROP CONSTRAINT IF EXISTS "line_workspace_user_capacity_owner_check";
ALTER TABLE "line_workspace_user"               ADD CONSTRAINT "line_workspace_user_capacity_owner_check" CHECK (NOT ("capacity" = 'access' AND "is_owner")) NOT VALID;
ALTER TABLE "subscription_group_workspace_user" DROP CONSTRAINT IF EXISTS "subscription_group_workspace_user_capacity_owner_check";
ALTER TABLE "subscription_group_workspace_user" ADD CONSTRAINT "subscription_group_workspace_user_capacity_owner_check" CHECK (NOT ("capacity" = 'access' AND "is_owner")) NOT VALID;
ALTER TABLE "price_schedule_workspace_user"     DROP CONSTRAINT IF EXISTS "price_schedule_workspace_user_capacity_owner_check";
ALTER TABLE "price_schedule_workspace_user"     ADD CONSTRAINT "price_schedule_workspace_user_capacity_owner_check" CHECK (NOT ("capacity" = 'access' AND "is_owner")) NOT VALID;

ALTER TABLE "line_workspace_user"               VALIDATE CONSTRAINT "line_workspace_user_capacity_domain_check";
ALTER TABLE "line_workspace_user"               VALIDATE CONSTRAINT "line_workspace_user_capacity_owner_check";
ALTER TABLE "subscription_group_workspace_user" VALIDATE CONSTRAINT "subscription_group_workspace_user_capacity_domain_check";
ALTER TABLE "subscription_group_workspace_user" VALIDATE CONSTRAINT "subscription_group_workspace_user_capacity_owner_check";
ALTER TABLE "price_schedule_workspace_user"     VALIDATE CONSTRAINT "price_schedule_workspace_user_capacity_domain_check";
ALTER TABLE "price_schedule_workspace_user"     VALIDATE CONSTRAINT "price_schedule_workspace_user_capacity_owner_check";
