-- Migration: ledger_financials_workspace_id_not_null
-- Date: 2026-05-30
-- Plan: docs/plan/20260530-authz-workspace-hardening (Q-AWS3-A migration leg, Plan 1 hotfix)
-- Follows: 20260530000001_backfill_workspace_id_on_ledger_financials.sql
--
-- ⚠️ DEFERRED — NOT APPLIED THIS ROUND.
--   This is step 3 of the documented 2-step (here 3-step) NOT NULL pattern from
--   docs/wiki/articles/schema-migrations.md "Strict rules now that users exist".
--   It is authored now (so the sequence is complete and reviewable) but the
--   orchestrator will NOT apply it this round. It tightens ONLY expenditure and
--   journal_entry. account is SPLIT OUT into its own held leg below (it cannot
--   tighten in prod — see § account).
--
--   This migration is SELF-GATING PER TABLE: it tightens expenditure and/or
--   journal_entry to NOT NULL iff that table has 0 NULL workspace_id rows, and
--   otherwise SKIPS that table (emits a NOTICE, leaves its column nullable). It
--   NEVER aborts, so it is safe to leave in the linear Atlas apply order between
--   the backfills. The actual tightening of a given table only happens once:
--     1. 20260530000000 (ADD COLUMN) has been applied, AND
--     2. 20260530000001 (per-row backfill) has been applied, AND
--     3. the per-row derivation has resolved ALL of that table's orphans (the 3
--        NULL-supplier expenditures and the 2 EXPENDITURE journal_entry rows that
--        depend on them — see 20260530000001 header). Until a table's orphans are
--        resolved, this migration leaves that table nullable (NOTICE) and tightens
--        only the clean table(s); it never aborts mid-apply on the ACCESS
--        EXCLUSIVE SET NOT NULL scan.
--
--   SET NOT NULL takes an ACCESS EXCLUSIVE lock and a full-table scan to verify
--   no NULLs; run it during a maintenance window. VALIDATE CONSTRAINT also scans
--   the table to validate the FK that 20260530000000 added NOT VALID.
--
-- Idempotency: SET NOT NULL on an already-NOT NULL column is a no-op in postgres,
-- and VALIDATE CONSTRAINT on an already-validated constraint is a no-op.
--
-- Tightening policy: PER TABLE, this migration TIGHTENS iff that table has 0 NULL
-- workspace_id rows; otherwise it SKIPS that table (with a NOTICE) and leaves its
-- column nullable. It NEVER aborts. Because this migration sits in the linear
-- Atlas order between the backfills, a hard RAISE here would break a plain
-- `db:apply`; the conditional form lets `db:apply` proceed and tightens each table
-- independently only when its orphans are resolved.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- 1. expenditure.workspace_id → CONDITIONAL TIGHTEN (iff 0 NULL rows, else skip)
--    If every expenditure row was backfilled (20260530000001 step 1), tighten to
--    NOT NULL and validate the FK (added NOT VALID in 20260530000000). If any NULL
--    remains (the NULL-supplier orphans), RAISE NOTICE and leave it nullable.
-- ---------------------------------------------------------------------------
DO $$
DECLARE
    null_rows bigint;
BEGIN
    SELECT COUNT(*) INTO null_rows FROM expenditure WHERE workspace_id IS NULL;
    IF null_rows = 0 THEN
        ALTER TABLE expenditure
            ALTER COLUMN workspace_id SET NOT NULL;
        ALTER TABLE expenditure
            VALIDATE CONSTRAINT expenditure_workspace_id_fkey;
    ELSE
        RAISE NOTICE
            '% NULL workspace_id row(s) remain in expenditure — SET NOT NULL skipped (deferred until orphans resolved)',
            null_rows;
    END IF;
END;
$$;

-- ---------------------------------------------------------------------------
-- 2. journal_entry.workspace_id → CONDITIONAL TIGHTEN (iff 0 NULL rows, else skip)
--    If every journal_entry row was backfilled (20260530000001 steps 2-3), tighten
--    to NOT NULL and validate the FK. If any NULL remains (the EXPENDITURE entries
--    sourced from NULL-supplier orphans), RAISE NOTICE and leave it nullable.
-- ---------------------------------------------------------------------------
DO $$
DECLARE
    null_rows bigint;
BEGIN
    SELECT COUNT(*) INTO null_rows FROM journal_entry WHERE workspace_id IS NULL;
    IF null_rows = 0 THEN
        ALTER TABLE journal_entry
            ALTER COLUMN workspace_id SET NOT NULL;
        ALTER TABLE journal_entry
            VALIDATE CONSTRAINT journal_entry_workspace_id_fkey;
    ELSE
        RAISE NOTICE
            '% NULL workspace_id row(s) remain in journal_entry — SET NOT NULL skipped (deferred until orphans resolved)',
            null_rows;
    END IF;
END;
$$;

-- ---------------------------------------------------------------------------
-- § account — NOT-NULL tightening is SPLIT into its own held leg:
--   20260530000003_account_workspace_id_not_null.sql
--
--   Rationale: account has NO structural workspace parent. Its backfill
--   (20260530000001 step 5) is a GUARDED single-tenant fallback, valid only when
--   the journal graph proves accounts touch exactly one workspace. Tightening
--   account to NOT NULL is therefore higher-risk than expenditure/journal_entry
--   (whose values are structurally derived) and must be a deliberate, separately
--   gated decision — it MUST NOT ride along with the structurally-derived tables.
--   account is intentionally NOT tightened here.
-- ---------------------------------------------------------------------------
