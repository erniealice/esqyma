-- Allow NULL workspace_id on audit entries for system-scope actions.
--
-- The auth flow (login, password reset, attempt-counter resets) audits actions
-- on the public."user" table (no workspace_id column) and on session rows that
-- pre-date workspace selection. The baseline schema declared
-- audit_trail.audit_entry.workspace_id as `uuid NOT NULL`, which rejected those
-- inserts with `invalid input syntax for type uuid: ""`.
--
-- Adapter-side change in lockstep: packages/espyna-golang/contrib/postgres/
-- internal/adapter/audit/audit_adapter.go now wraps workspace_id in
-- nullableString() so empty strings become NULL.
--
-- Phase 0 verified audit_trail.audit_entry is empty on dev DB; safe to drop the
-- NOT NULL constraint without backfill.
--
-- The btree idx_entry_ws on (workspace_id, occurred_at DESC) tolerates NULLs.

ALTER TABLE audit_trail.audit_entry ALTER COLUMN workspace_id DROP NOT NULL;
