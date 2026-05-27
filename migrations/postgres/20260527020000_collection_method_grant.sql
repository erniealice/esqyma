-- Migration: collection_method_grant
-- Date: 2026-05-27
-- Purpose: Stage 3 of the treasury-domain-rebuild. Create the NEW
--   collection_method_grant entity — audience-eligibility CONFIG binding a client
--   to a CollectionMethod TEMPLATE (never an instance).
--   Plan: docs/plan/20260524-treasury-domain-rebuild/ (entities.md §E-4, phases.md Stage 3)
--
-- Proto: proto/v1/domain/treasury/collection_method_grant/collection_method_grant.proto
--
-- Q6 CONFIG-ONLY CONTRACT (LOCKED — load-bearing):
--   This table is CONFIG, never an EVENT. It deliberately has NO usage_count,
--   NO last_used_at, NO redemption_count, and NO event-shaped counter column of
--   any kind. Usage events live on treasury_collection / revenue, NEVER here. The
--   column list below is exhaustive and mirrors the proto field set exactly. A
--   reflection test (espyna q6_no_event_fields_test.go) asserts the proto message
--   carries none of those fields; an information_schema check can assert the same
--   at the table level. Adding any such column here is a Q6 violation.
--
-- Grants do not mutate: the only state change is status ACTIVE → REVOKED (there is
-- no Update path). The status CHECK below enumerates the only permitted values.
--
-- Field → column mapping (proto field numbers in parentheses). Per the esqyma
-- generic protojson adapter convention (mirrors collection_method_eligibility_rule.go):
--   * scalar string / int64 / bool fields map to TEXT / BIGINT / BOOLEAN;
--   * enum fields persist as TEXT (the enum's string name, "" / NULL = UNSPECIFIED);
--   * *_string computed mirror fields (date_*_string) are NOT stored.
--
-- Safety contract (per docs/wiki/articles/schema-migrations.md "Live users exist
-- — additive-only"):
--   * CREATE TABLE IF NOT EXISTS — re-applying this migration is a no-op.
--   * NEW table only; no ALTER / DROP / RENAME of any existing object.
--   * FK collection_method_id → collection_method(id) (the TEMPLATE), added
--     NOT VALID to avoid a validation scan, guarded by IF NOT EXISTS.
--   * FK workspace_id → workspace(id) + FK client_id → client(id), same treatment.
--   * Indexes per §E-4: a partial ACTIVE-grant eligibility index and a
--     list-all-grants-for-program index.

SET search_path TO public;

-- ─────────────────────────────────────────────────────────────────────────────
-- collection_method_grant (entities.md §E-4)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS collection_method_grant (
    -- ----- identity / lifecycle (proto fields 1-7) -----
    id                   TEXT PRIMARY KEY,
    date_created         BIGINT,
    date_modified        BIGINT,
    active               BOOLEAN NOT NULL DEFAULT TRUE,
    workspace_id         TEXT,

    -- ----- audience binding (10-12) -----
    --   collection_method_id references the CollectionMethod TEMPLATE, NEVER an instance.
    --   subject enum as TEXT: "" / NULL = UNSPECIFIED, "CLIENT" ("SEGMENT" reserved v2).
    collection_method_id TEXT NOT NULL,
    subject              TEXT,
    client_id            TEXT,

    -- ----- grant status + audit (20-23) — status enum as TEXT -----
    --   "" / NULL = UNSPECIFIED, "ACTIVE", "REVOKED". Grants do not mutate; the
    --   only transition is ACTIVE → REVOKED.
    status               TEXT,
    granted_by_user_id   TEXT,
    revoked_by_user_id   TEXT,
    revoke_reason        TEXT

    -- Q6: NO usage_count / last_used_at / redemption_count / any event counter.
    -- This entity is CONFIG only. (see contract note in the header.)
);

-- status value guard — the only permitted grant states (ACTIVE / REVOKED), with
-- "" / NULL tolerated for UNSPECIFIED during create-before-enrich round-trips.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'collection_method_grant_status_check'
          AND table_name = 'collection_method_grant'
    ) THEN
        ALTER TABLE collection_method_grant
            ADD CONSTRAINT collection_method_grant_status_check
            CHECK (status IS NULL OR status IN ('', 'ACTIVE', 'REVOKED'));
    END IF;
END;
$$;

-- collection_method_id (10): FK to the CollectionMethod TEMPLATE, NOT VALID to keep
-- the add lock-light.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'collection_method_grant_collection_method_id_fkey'
          AND table_name = 'collection_method_grant'
    ) THEN
        ALTER TABLE collection_method_grant
            ADD CONSTRAINT collection_method_grant_collection_method_id_fkey
            FOREIGN KEY (collection_method_id) REFERENCES collection_method(id) NOT VALID;
    END IF;
END;
$$;

-- workspace_id (7): FK to the owning workspace, NOT VALID.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'collection_method_grant_workspace_id_fkey'
          AND table_name = 'collection_method_grant'
    ) THEN
        ALTER TABLE collection_method_grant
            ADD CONSTRAINT collection_method_grant_workspace_id_fkey
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

-- client_id (12): FK to the audience client, NOT VALID. Nullable because subject
-- may be UNSPECIFIED during round-trips; required-when-CLIENT is enforced in the
-- use-case layer.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'collection_method_grant_client_id_fkey'
          AND table_name = 'collection_method_grant'
    ) THEN
        ALTER TABLE collection_method_grant
            ADD CONSTRAINT collection_method_grant_client_id_fkey
            FOREIGN KEY (client_id) REFERENCES client(id) NOT VALID;
    END IF;
END;
$$;

-- Fast eligibility check: ACTIVE grants for a (workspace, method, client) — partial
-- index WHERE status = 'ACTIVE' per §E-4.
CREATE INDEX IF NOT EXISTS idx_collection_method_grant_active_eligibility
    ON collection_method_grant
    USING btree (workspace_id, collection_method_id, client_id)
    WHERE status = 'ACTIVE';

-- "list all grants for this program" per §E-4.
CREATE INDEX IF NOT EXISTS idx_collection_method_grant_by_method
    ON collection_method_grant
    USING btree (workspace_id, collection_method_id);
