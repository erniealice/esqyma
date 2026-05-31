-- Migration: attachment_workspace_id_not_null
-- Date: 2026-05-31
-- Plan: docs/plan/20260530-storage-attachments-hardening (Q-ST-WSSCOPE = C, Plan 5)
-- Follows: 20260531000000_backfill_workspace_id_on_attachment.sql
--
-- ⚠️ DEFERRED — APPLIED IN A LATER WINDOW.
--   This is STEP 2 of the documented 2-step NOT NULL pattern from
--   docs/wiki/articles/schema-migrations.md "Strict rules now that users exist".
--   It is authored now (so the sequence is complete and reviewable) but is
--   intended to be applied in a SEPARATE, LATER deployment window — only AFTER:
--     1. 20260531000000 (backfill + FK NOT VALID + partial index) has been
--        applied, AND
--     2. it has been verified that no NULL workspace_id rows remain:
--
--          SELECT COUNT(*) FROM attachment WHERE workspace_id IS NULL;  -- expect 0
--
--   If that count is non-zero, STOP — the backfill is incomplete and this
--   migration's SET NOT NULL will fail.
--
--   SET NOT NULL takes an ACCESS EXCLUSIVE lock and a full-table scan to verify
--   no NULLs remain; run it during a maintenance window. VALIDATE CONSTRAINT also
--   scans the table to validate the FK that 20260531000000 added NOT VALID.
--
-- Idempotency: SET NOT NULL on an already-NOT NULL column is a no-op in postgres,
-- and VALIDATE CONSTRAINT on an already-validated constraint is a no-op.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. attachment.workspace_id → NOT NULL
-- ---------------------------------------------------------------------------
ALTER TABLE attachment
    ALTER COLUMN workspace_id SET NOT NULL;

-- ---------------------------------------------------------------------------
-- 2. attachment.workspace_id → validate the FK added NOT VALID in 20260531000000
-- ---------------------------------------------------------------------------
ALTER TABLE attachment
    VALIDATE CONSTRAINT attachment_workspace_id_fkey;

-- NOTE: The W2 cross-workspace use-case assertion (ReadAttachmentByEntity /
-- DeleteAttachmentByEntity perform the live workspace check) is ALREADY LIVE.
-- This migration is the durable SCHEMA BACKSTOP for that guard — not the live
-- guard itself.
