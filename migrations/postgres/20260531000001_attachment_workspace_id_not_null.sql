-- Migration: attachment_workspace_id_not_null
-- Date: 2026-05-31
-- Plan: docs/plan/20260530-storage-attachments-hardening (Q-ST-WSSCOPE = C, Plan 5)
-- Follows: 20260531000000_backfill_workspace_id_on_attachment.sql
--
-- ⚠️ DEFERRED — NOT APPLIED THIS ROUND.
--   This is STEP 2 of the documented 2-step NOT NULL pattern from
--   docs/wiki/articles/schema-migrations.md "Strict rules now that users exist".
--   It is authored now (so the sequence is complete and reviewable) but the
--   orchestrator will NOT apply it this round. This migration is SELF-GATING: it
--   tightens attachment to NOT NULL iff attachment has 0 NULL workspace_id rows,
--   and otherwise SKIPS (emits a NOTICE, leaves the column nullable). It NEVER
--   aborts. The actual tightening only happens once:
--     1. 20260531000000 (polymorphic backfill + FK NOT VALID + partial index) has
--        been applied, AND
--     2. no NULL workspace_id rows remain (the conditional check below tightens
--        only in that clean state, else skips with a NOTICE).
--
--   SET NOT NULL takes an ACCESS EXCLUSIVE lock and a full-table scan to verify
--   no NULLs remain; run it during a maintenance window. VALIDATE CONSTRAINT also
--   scans the table to validate the FK that 20260531000000 added NOT VALID.
--
-- Idempotency: SET NOT NULL on an already-NOT NULL column is a no-op in postgres,
-- and VALIDATE CONSTRAINT on an already-validated constraint is a no-op.
--
-- Tightening policy: this migration TIGHTENS iff attachment has 0 NULL
-- workspace_id rows; otherwise it SKIPS (with a NOTICE) and leaves the column
-- nullable. It NEVER aborts, so it is safe to leave in the linear Atlas apply
-- order after the backfill.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. attachment.workspace_id → CONDITIONAL TIGHTEN (iff 0 NULL rows, else skip)
--    If the polymorphic derivation (20260531000000) resolved every row, tighten
--    to NOT NULL and validate the FK (added NOT VALID in 20260531000000). If any
--    NULL remains — a module_key with no CASE branch or an unresolvable
--    foreign_key — RAISE NOTICE and leave the column nullable (deferred until the
--    orphan is resolved). Never abort.
-- ---------------------------------------------------------------------------
DO $$
DECLARE
    null_rows bigint;
BEGIN
    SELECT COUNT(*) INTO null_rows FROM attachment WHERE workspace_id IS NULL;
    IF null_rows = 0 THEN
        ALTER TABLE attachment
            ALTER COLUMN workspace_id SET NOT NULL;
        ALTER TABLE attachment
            VALIDATE CONSTRAINT attachment_workspace_id_fkey;
    ELSE
        RAISE NOTICE
            '% NULL workspace_id row(s) remain in attachment — SET NOT NULL skipped (deferred until orphans resolved)',
            null_rows;
    END IF;
END;
$$;

-- NOTE: The W2 cross-workspace use-case assertion (ReadAttachmentByEntity /
-- DeleteAttachmentByEntity perform the live workspace check) is ALREADY LIVE.
-- This migration is the durable SCHEMA BACKSTOP for that guard — not the live
-- guard itself.
