-- Migration: account_workspace_id_not_null
-- Date: 2026-05-30
-- Plan: docs/plan/20260530-authz-workspace-hardening (Q-AWS3-A migration leg, Plan 1 hotfix)
-- Follows: 20260530000002_ledger_financials_workspace_id_not_null.sql
--
-- ⚠️ HELD — ACCOUNT CANNOT TIGHTEN IN PROD. NOT APPLIED THIS ROUND (or any round
--    until a deliberate, separately gated decision is made).
--
--   This is the account-only NOT-NULL leg, SPLIT OUT of 20260530000002 on purpose.
--   account has NO structural workspace parent (no FK to workspace/client/user/
--   supplier). Its backfill — 20260530000001 step 5 — is a GUARDED single-tenant
--   FALLBACK that fills accounts only when the journal graph proves they touch
--   exactly ONE workspace. That is a softer guarantee than the structural derivation
--   used for expenditure/journal_entry, so account's NOT-NULL must NOT ride along
--   with them; it gets its own held leg requiring an explicit operator decision.
--
--   This migration is SELF-GATING: it tightens account to NOT NULL iff account
--   has 0 NULL workspace_id rows, and otherwise SKIPS (emits a NOTICE, leaves the
--   column nullable). It NEVER aborts, so it is safe to leave in the linear Atlas
--   apply order between the backfills. The actual tightening only happens once:
--     1. 20260530000000 (ADD COLUMN) applied, AND
--     2. 20260530000001 (per-row backfill incl. step-4 account fallback) applied, AND
--     3. account has zero NULL workspace_id rows.
--
--   SET NOT NULL takes an ACCESS EXCLUSIVE lock and a full-table scan; run it in a
--   maintenance window. VALIDATE CONSTRAINT also scans to validate the FK that
--   20260530000000 added NOT VALID.
--
-- Idempotency: SET NOT NULL on an already-NOT NULL column is a no-op, and
-- VALIDATE CONSTRAINT on an already-validated constraint is a no-op.
--
-- Tightening policy: this migration TIGHTENS iff account has 0 NULL workspace_id
-- rows; otherwise it SKIPS (with a NOTICE) and leaves the column nullable. It
-- NEVER aborts. Because this migration sits in the linear Atlas order between the
-- backfills, a hard RAISE here would break a plain `db:apply`; the conditional
-- form lets `db:apply` proceed and tightens account only when the single-tenant
-- fallback (20260530000001 step 4) has already filled every row.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. account.workspace_id → CONDITIONAL TIGHTEN (iff 0 NULL rows, else skip)
--    account has no structural parent; its backfill (20260530000001 step 4) is a
--    GUARDED single-tenant fallback. If that fallback filled every row, tighten to
--    NOT NULL and validate the FK (added NOT VALID in 20260530000000). If any NULL
--    remains (deferred until orphans resolved), RAISE NOTICE and leave the column
--    nullable — never abort.
-- ---------------------------------------------------------------------------
DO $$
DECLARE
    null_rows bigint;
BEGIN
    SELECT COUNT(*) INTO null_rows FROM account WHERE workspace_id IS NULL;
    IF null_rows = 0 THEN
        ALTER TABLE account
            ALTER COLUMN workspace_id SET NOT NULL;
        ALTER TABLE account
            VALIDATE CONSTRAINT account_workspace_id_fkey;
    ELSE
        RAISE NOTICE
            '% NULL workspace_id row(s) remain in account — SET NOT NULL skipped (deferred until orphans resolved)',
            null_rows;
    END IF;
END;
$$;
