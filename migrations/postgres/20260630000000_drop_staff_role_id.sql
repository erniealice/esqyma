BEGIN;
-- 20260630 — revert the staff principal binding (Option E: staff.role_id removed).
-- Staff is an internal workspace_user facet: its roles come from workspace_user_role,
-- narrowed by permission.applicable_principal_types ⊇ {7}. The staff.role_id column
-- (added by 20260628000000_add_staff_role_id.sql) is no longer a role source.
-- Field number 15 and name "role_id" are reserved in staff.proto to prevent reuse.
-- Drop order: FK constraint first (depends on column), then index, then column.
ALTER TABLE staff DROP CONSTRAINT IF EXISTS staff_role_id_fkey;
DROP INDEX IF EXISTS idx_staff_role_id;
ALTER TABLE staff DROP COLUMN IF EXISTS role_id;
COMMIT;
