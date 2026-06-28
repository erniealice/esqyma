BEGIN;
-- 20260628 — staff principal binding (PRINCIPAL_TYPE_STAFF = 7).
-- staff.role_id mirrors client_portal_grant.role_id / supplier_portal_grant.role_id;
-- backs userRolesStaffCTE so a staff session resolves permissions via this one role.
-- Additive + nullable (entity/staff is a populated live table). role_id IS NULL ⇒
-- the staff row is an HR record only, not a switchable principal.
ALTER TABLE staff ADD COLUMN IF NOT EXISTS role_id TEXT;
CREATE INDEX IF NOT EXISTS idx_staff_role_id ON staff(role_id);
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'staff_role_id_fkey') THEN
    ALTER TABLE staff ADD CONSTRAINT staff_role_id_fkey FOREIGN KEY (role_id) REFERENCES role(id);
  END IF;
END $$;
COMMIT;
