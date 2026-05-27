-- Migration: collection_method_eligibility_rule
-- Date: 2026-05-27
-- Purpose: Stage 2 of the treasury-domain-rebuild. Create the NEW
--   collection_method_eligibility_rule entity that CollectionMethod.
--   default_eligibility_rule_id (added W1, persisted W2 as plain TEXT) points to.
--   Plan: docs/plan/20260524-treasury-domain-rebuild/ (entities.md §E-3)
--
-- Proto: proto/v1/domain/treasury/collection_method_eligibility_rule/
--          collection_method_eligibility_rule.proto
--
-- Field → column mapping (proto field numbers in parentheses). Per the esqyma
-- generic protojson adapter convention (mirrors collection_method.go):
--   * scalar string / int64 / int32 / bool fields map to TEXT / BIGINT / INTEGER
--     / BOOLEAN;
--   * enum fields persist as TEXT (the enum's string name, "" / NULL = UNSPECIFIED);
--   * repeated string fields (applicable_product_ids 40, applicable_category_ids 41)
--     persist as JSONB — protojson marshals them to a JSON array (["a","b"]),
--     which the generic adapter round-trips faithfully;
--   * *_string computed mirror fields (date_*_string) are NOT stored.
--
-- Safety contract (per docs/wiki/articles/schema-migrations.md "Live users exist
-- — additive-only"):
--   * CREATE TABLE IF NOT EXISTS — re-applying this migration is a no-op.
--   * NEW table only; no ALTER / DROP / RENAME of any existing object.
--   * workspace_id (7) receives an FK to workspace (which exists), added NOT VALID
--     to avoid a validation scan, guarded by IF NOT EXISTS.
--   * The active-rule lookup index (workspace_id, active, valid_from_date,
--     valid_until_date) per §E-3.

SET search_path TO public;

-- ─────────────────────────────────────────────────────────────────────────────
-- collection_method_eligibility_rule (entities.md §E-3)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS collection_method_eligibility_rule (
    -- ----- identity / lifecycle (proto fields 1-8) -----
    id                          TEXT PRIMARY KEY,
    date_created                BIGINT,
    date_modified               BIGINT,
    active                      BOOLEAN NOT NULL DEFAULT TRUE,
    workspace_id                TEXT,
    name                        TEXT,

    -- ----- bearer mode default (10) — enum as TEXT -----
    --   "" / NULL = UNSPECIFIED, "HOLDER_BOUND", "HOLDER_TRANSFERABLE" ("BEARER" reserved v2)
    bearer_mode                 TEXT,

    -- ----- temporal scope (20-22) -----
    valid_from_date             TEXT,
    valid_until_date            TEXT,
    expiry_days_after_issuance  INTEGER,

    -- ----- amount scope (30-31) — centavos (integer convention) -----
    min_amount_centavos         BIGINT,
    max_amount_centavos         BIGINT,

    -- ----- product / category scope (40-41) — repeated string as JSONB arrays -----
    applicable_product_ids      JSONB,
    applicable_category_ids     JSONB,

    -- ----- stacking + jurisdiction (50-51) — stacking_policy enum as TEXT -----
    --   "" / NULL = UNSPECIFIED, "EXCLUSIVE", "STACKABLE", "FIRST_ONLY"
    stacking_policy             TEXT,
    jurisdiction_code           TEXT,

    -- ----- redemption limits (60-61) — NULL = unlimited -----
    max_redemptions_per_instance INTEGER,
    max_redemptions_per_client   INTEGER,

    -- ----- terms (70-71) -----
    terms_url                   TEXT,
    terms_summary               TEXT
);

-- workspace_id (7): FK to the owning workspace, NOT VALID to keep the add lock-light.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'collection_method_eligibility_rule_workspace_id_fkey'
          AND table_name = 'collection_method_eligibility_rule'
    ) THEN
        ALTER TABLE collection_method_eligibility_rule
            ADD CONSTRAINT collection_method_eligibility_rule_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

-- Active-rule lookup index per §E-3:
--   (workspace_id, active, valid_from_date, valid_until_date).
CREATE INDEX IF NOT EXISTS idx_collection_method_eligibility_rule_active_lookup
    ON collection_method_eligibility_rule
    USING btree (workspace_id, active, valid_from_date, valid_until_date);
