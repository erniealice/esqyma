-- Migration: add_treasury_method_template_fields
-- Date: 2026-05-27
-- Purpose: Stage 1 / Wave 2 of the treasury-domain-rebuild. Persist the new
--   template-level config fields promoted onto CollectionMethod and
--   DisbursementMethod in Wave 1 (proto commit ab3ff68).
--   Plan: docs/plan/20260524-treasury-domain-rebuild/ (entities.md §E-1 / §E-2)
--
-- Field → column mapping (proto field numbers in parentheses). Only persisted
-- scalar fields are added. Per the esqyma generate-ddl convention:
--   * enum fields persist as TEXT (the enum's string name, "" = UNSPECIFIED);
--   * message-typed oneof variants (method_details card=8/bank_account=9 and the
--     new template_details oneof, fields 30-32) are NOT columns — they are
--     skipped by parseMessage and live elsewhere (Stage 4 SLIM); no columns here;
--   * *_string computed mirror fields (date_*_string) are not stored.
--
-- collection_method gains (proto fields 11-24):
--   workspace_id (11) TEXT, posting_kind (12) TEXT, category (13) TEXT,
--   audience_mode (14) TEXT, tax_effect_kind (15) TEXT,
--   default_eligibility_rule_id (16) TEXT, balance_account_id (17) TEXT,
--   target_account_id (18) TEXT, lifecycle (19) TEXT, source (20) TEXT,
--   template_code (21) TEXT, revision (22) INTEGER, version_status (23) TEXT,
--   supersedes_collection_method_id (24) TEXT.
--
-- disbursement_method gains the same set MINUS audience_mode (D-4.9: buying-side
--   has no audience-grant model in v1 — proto field 14 is intentionally skipped),
--   and uses supersedes_disbursement_method_id (24) instead.
--
-- Safety contract (per docs/wiki/articles/schema-migrations.md "Live users exist
-- — additive-only"):
--   * All ADD COLUMN IF NOT EXISTS — re-applying this migration is a no-op.
--   * Every new column is NULLABLE with no default. No NOT NULL on existing rows.
--     A lagging binary that does not yet read these columns keeps working; the
--     new binary tolerates NULLs (proto zero-value = UNSPECIFIED / "" / 0).
--   * Only workspace_id receives an FK (to workspace, which exists), guarded by
--     IF NOT EXISTS + NOT VALID to avoid a full-table validation scan.
--   * The GL-default account refs (balance_account_id, target_account_id) and the
--     lineage / eligibility refs (default_eligibility_rule_id, supersedes_*) are
--     added as plain TEXT with NO FK — mirroring the existing convention for
--     account-id columns on deferred_revenue (liability_account_id /
--     revenue_account_id stored as plain TEXT). collection_method_eligibility_rule
--     does not exist yet (a later stage), so an FK there is intentionally omitted.
--   * No DROP, no RENAME, no type change to any existing column.

SET search_path TO public;

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. collection_method — template-level config (proto fields 11-24)
-- ─────────────────────────────────────────────────────────────────────────────

-- workspace_id (11): FK to the owning workspace.
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'collection_method_workspace_id_fkey'
          AND table_name = 'collection_method'
    ) THEN
        ALTER TABLE collection_method
            ADD CONSTRAINT collection_method_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_collection_method_workspace_id
    ON collection_method USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- posting_kind (12): CollectionMethodPostingKind enum as TEXT.
--   "" / NULL = UNSPECIFIED, "CASH", "ADVANCE_DRAWDOWN", "CLAIM_AR", "DEFERRED_RECEIVABLE"
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS posting_kind TEXT;

-- category (13): CollectionMethodCategory enum as TEXT.
--   "STANDARD" | "VOUCHER" | "ADVANCE" | "CARD"
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS category TEXT;

-- audience_mode (14): CollectionMethodAudienceMode enum as TEXT. CM-only (D-4.9).
--   "OPEN" | "RESTRICTED" | "SINGLE_CLIENT" ("SEGMENT_SCOPED" reserved v2)
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS audience_mode TEXT;

-- tax_effect_kind (15): CollectionMethodTaxEffectKind enum as TEXT (REQUIRED+STRICT per Q3).
--   "NONE" | "INCLUSIVE" | "EXCLUSIVE"
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS tax_effect_kind TEXT;

-- default_eligibility_rule_id (16): FK to collection_method_eligibility_rule (a
--   later-stage table; no DB FK yet). NULL for v1.
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS default_eligibility_rule_id TEXT;

-- balance_account_id (17): GL liability-side default (plain TEXT, no FK — matches
--   deferred_revenue.liability_account_id convention).
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS balance_account_id TEXT;

-- target_account_id (18): GL revenue-side default (plain TEXT, no FK).
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS target_account_id TEXT;

-- lifecycle (19): CollectionMethodLifecycle enum as TEXT (per Q7).
--   "DRAFT" | "ACTIVE" | "CLOSED" | "ARCHIVED"
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS lifecycle TEXT;

-- source (20): CollectionMethodSource enum as TEXT.
--   "SYSTEM" | "WORKSPACE" | "VENDOR_TEMPLATE"
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS source TEXT;

-- template_code (21): versioning lineage key.
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS template_code TEXT;

-- revision (22): int32 revision number within a template_code lineage.
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS revision INTEGER;

-- version_status (23): CollectionMethodVersionStatus enum as TEXT.
--   "DRAFT" | "PUBLISHED" | "SUPERSEDED"
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS version_status TEXT;

-- supersedes_collection_method_id (24): predecessor revision (self-lineage,
--   application-enforced; no DB FK to keep the add lock-light).
ALTER TABLE collection_method
    ADD COLUMN IF NOT EXISTS supersedes_collection_method_id TEXT;

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. disbursement_method — template-level config (mirror of CM minus audience_mode)
-- ─────────────────────────────────────────────────────────────────────────────

-- workspace_id (11): FK to the owning workspace.
ALTER TABLE disbursement_method
    ADD COLUMN IF NOT EXISTS workspace_id TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'disbursement_method_workspace_id_fkey'
          AND table_name = 'disbursement_method'
    ) THEN
        ALTER TABLE disbursement_method
            ADD CONSTRAINT disbursement_method_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_disbursement_method_workspace_id
    ON disbursement_method USING btree (workspace_id)
    WHERE workspace_id IS NOT NULL;

-- posting_kind (12): DisbursementMethodPostingKind enum as TEXT.
ALTER TABLE disbursement_method
    ADD COLUMN IF NOT EXISTS posting_kind TEXT;

-- category (13): DisbursementMethodCategory enum as TEXT.
ALTER TABLE disbursement_method
    ADD COLUMN IF NOT EXISTS category TEXT;

-- NOTE: proto field 14 (audience_mode) is intentionally NOT present on DM (D-4.9).

-- tax_effect_kind (15): DisbursementMethodTaxEffectKind enum as TEXT.
ALTER TABLE disbursement_method
    ADD COLUMN IF NOT EXISTS tax_effect_kind TEXT;

-- default_eligibility_rule_id (16): plain TEXT, no FK (likely NULL for v1 — DM
--   has no eligibility rule).
ALTER TABLE disbursement_method
    ADD COLUMN IF NOT EXISTS default_eligibility_rule_id TEXT;

-- balance_account_id (17): GL default (plain TEXT, no FK).
ALTER TABLE disbursement_method
    ADD COLUMN IF NOT EXISTS balance_account_id TEXT;

-- target_account_id (18): GL default (plain TEXT, no FK).
ALTER TABLE disbursement_method
    ADD COLUMN IF NOT EXISTS target_account_id TEXT;

-- lifecycle (19): DisbursementMethodLifecycle enum as TEXT.
ALTER TABLE disbursement_method
    ADD COLUMN IF NOT EXISTS lifecycle TEXT;

-- source (20): DisbursementMethodSource enum as TEXT.
ALTER TABLE disbursement_method
    ADD COLUMN IF NOT EXISTS source TEXT;

-- template_code (21): versioning lineage key.
ALTER TABLE disbursement_method
    ADD COLUMN IF NOT EXISTS template_code TEXT;

-- revision (22): int32 revision number within a template_code lineage.
ALTER TABLE disbursement_method
    ADD COLUMN IF NOT EXISTS revision INTEGER;

-- version_status (23): DisbursementMethodVersionStatus enum as TEXT.
ALTER TABLE disbursement_method
    ADD COLUMN IF NOT EXISTS version_status TEXT;

-- supersedes_disbursement_method_id (24): predecessor revision (application-enforced).
ALTER TABLE disbursement_method
    ADD COLUMN IF NOT EXISTS supersedes_disbursement_method_id TEXT;
