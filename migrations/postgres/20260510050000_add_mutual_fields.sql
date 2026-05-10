-- Migration: add_mutual_fields
-- Date: 2026-05-10
-- Purpose: Add Mutual / Cooperative vertical schema extensions across 4 tables.
--   Plan: docs/plan/20260510-mutual-vertical/ (vertical README)
--   Codex audit: docs/plan/20260510-job-activity-phase-review/codex-mutual-review.md
--
-- Changes in this migration:
--   1. workspace_user  — 4 member-registry columns + index on member_number
--   2. equity_account  — workspace_user_id FK + patronage_basis column + index
--   3. event           — kind column (EventKind enum stored as TEXT)
--   4. event_attendee  — 4 voting columns
--
-- equity_transaction: no structural change required — the two new enum values
--   (PATRONAGE_RETENTION=5, PATRONAGE_DISTRIBUTION=6) are stored in the
--   existing `transaction_type` INTEGER column; no ALTER needed.
--
-- Safety contract:
--   * All ADD COLUMN IF NOT EXISTS — applying this migration twice is a no-op.
--   * All new columns are NULLABLE (no NOT NULL constraint). If NOT NULL is
--     required in future, use the documented 2-step pattern: add NULLABLE,
--     backfill, then SET NOT NULL in a second migration.
--   * FK constraints use IF NOT EXISTS guards and NOT VALID to avoid full-table
--     scans on populated tables.
--   * Indexes use IF NOT EXISTS guards.
--
-- Per docs/wiki/articles/schema-migrations.md "Live users exist — additive-only":
--   no DROP, no RENAME, no new NOT NULL on existing rows, no destructive ops.

SET search_path TO public;

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. workspace_user — member registry fields
-- ─────────────────────────────────────────────────────────────────────────────

-- member_number: unique registry ID within this workspace (e.g. "M-00042")
ALTER TABLE workspace_user
    ADD COLUMN IF NOT EXISTS member_number TEXT;

-- member_status: admission lifecycle state
--   expected values: "applicant" | "active" | "suspended" | "withdrawn" | "expelled"
ALTER TABLE workspace_user
    ADD COLUMN IF NOT EXISTS member_status TEXT;

-- member_since: admission date (epoch ms); NULL = not yet admitted
ALTER TABLE workspace_user
    ADD COLUMN IF NOT EXISTS member_since BIGINT;

-- member_until: withdrawal or termination date (epoch ms); NULL = still a member
ALTER TABLE workspace_user
    ADD COLUMN IF NOT EXISTS member_until BIGINT;

-- Index on member_number for registry lookups (sparse — most rows are NULL)
CREATE INDEX IF NOT EXISTS idx_workspace_user_member_number
    ON workspace_user USING btree (member_number)
    WHERE member_number IS NOT NULL;

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. equity_account — member-equity FK + patronage basis
-- ─────────────────────────────────────────────────────────────────────────────

-- workspace_user_id: FK to the member this equity account belongs to
--   Scoped to workspace because membership is per-co-op, not global.
ALTER TABLE equity_account
    ADD COLUMN IF NOT EXISTS workspace_user_id TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'equity_account_workspace_user_id_fkey'
          AND table_name = 'equity_account'
    ) THEN
        ALTER TABLE equity_account
            ADD CONSTRAINT equity_account_workspace_user_id_fkey
            FOREIGN KEY (workspace_user_id) REFERENCES workspace_user(id)
            ON DELETE RESTRICT NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_equity_account_workspace_user_id
    ON equity_account USING btree (workspace_user_id)
    WHERE workspace_user_id IS NOT NULL;

-- patronage_basis: what activity drives the patronage allocation calculation
--   expected values: "PURCHASES" | "HOURS" | "DELIVERIES" | "DEPOSITS"
ALTER TABLE equity_account
    ADD COLUMN IF NOT EXISTS patronage_basis TEXT;

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. event — EventKind field
-- ─────────────────────────────────────────────────────────────────────────────

-- kind: classifies the event purpose for governance-vote branching
--   expected values (EventKind enum stored as TEXT):
--     "" / NULL = UNSPECIFIED, "MEETING", "GOVERNANCE_VOTE"
--   Stored as TEXT to match the convention for other string-backed enum fields.
ALTER TABLE event
    ADD COLUMN IF NOT EXISTS kind TEXT;

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. event_attendee — voting fields
-- ─────────────────────────────────────────────────────────────────────────────

-- vote_choice: the member's recorded vote
--   expected values: "yes" | "no" | "abstain"
ALTER TABLE event_attendee
    ADD COLUMN IF NOT EXISTS vote_choice TEXT;

-- vote_weight: multiplier for weighted voting
--   default 1 (application layer); 0 = ineligible; >1 = bylaw-defined weighted
ALTER TABLE event_attendee
    ADD COLUMN IF NOT EXISTS vote_weight INTEGER;

-- vote_cast_at: epoch ms when the vote was recorded
ALTER TABLE event_attendee
    ADD COLUMN IF NOT EXISTS vote_cast_at BIGINT;

-- eligible_to_vote: pre-check — was this attendee eligible to vote at event time?
ALTER TABLE event_attendee
    ADD COLUMN IF NOT EXISTS eligible_to_vote BOOLEAN;
