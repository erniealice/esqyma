-- Audit Trail schema (WS6 Decision 18)
CREATE SCHEMA IF NOT EXISTS audit_trail;

-- Header: one row per mutation event
-- Composite PK (occurred_at, id) required for partitioned tables in PostgreSQL
CREATE TABLE audit_trail.audit_entry (
    id               UUID        NOT NULL DEFAULT gen_random_uuid(),
    workspace_id     UUID        NOT NULL,
    actor_id         TEXT        NOT NULL,
    actor_type       SMALLINT    NOT NULL,
    actor_ip         INET,
    actor_user_agent TEXT,
    entity_type      TEXT        NOT NULL,
    entity_id        TEXT        NOT NULL,
    domain           TEXT        NOT NULL,
    action           SMALLINT    NOT NULL,
    permission_code  TEXT,
    use_case         TEXT,
    reason           TEXT,
    method_name      TEXT        NOT NULL,
    request_id       TEXT,
    transaction_id   BIGINT,
    field_count      SMALLINT    NOT NULL DEFAULT 0,
    occurred_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (occurred_at, id)
) PARTITION BY RANGE (occurred_at);

-- Line items: one row per field changed
-- No FK to audit_entry — integrity enforced by write path (same transaction)
-- Decision 18: FK across partitioned tables requires partition key, adds complexity with no benefit for append-only tables
CREATE TABLE audit_trail.audit_field_change (
    id              UUID        NOT NULL DEFAULT gen_random_uuid(),
    audit_entry_id  UUID        NOT NULL,
    field_name      TEXT        NOT NULL,
    field_type      SMALLINT    NOT NULL,
    old_value       TEXT,
    new_value       TEXT
);

-- Monthly partitions (Decision 10)
CREATE TABLE audit_trail.audit_entry_2026_03
    PARTITION OF audit_trail.audit_entry
    FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');
CREATE TABLE audit_trail.audit_entry_2026_04
    PARTITION OF audit_trail.audit_entry
    FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');
CREATE TABLE audit_trail.audit_entry_2026_05
    PARTITION OF audit_trail.audit_entry
    FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');

-- Indexes on audit_entry
CREATE INDEX idx_entry_entity   ON audit_trail.audit_entry (entity_type, entity_id, occurred_at DESC);
CREATE INDEX idx_entry_actor    ON audit_trail.audit_entry (actor_id, occurred_at DESC);
CREATE INDEX idx_entry_permcode ON audit_trail.audit_entry (permission_code, occurred_at DESC);
CREATE INDEX idx_entry_usecase  ON audit_trail.audit_entry (use_case, occurred_at DESC);
CREATE INDEX idx_entry_ws       ON audit_trail.audit_entry (workspace_id, occurred_at DESC);
CREATE INDEX idx_entry_txid     ON audit_trail.audit_entry (transaction_id);

-- Indexes on audit_field_change
CREATE INDEX idx_field_entry    ON audit_trail.audit_field_change (audit_entry_id);
CREATE INDEX idx_field_name     ON audit_trail.audit_field_change (field_name, new_value);

-- App role grants (fail-safe for dev where app_role may not exist)
DO $$
BEGIN
    GRANT USAGE ON SCHEMA audit_trail TO app_role;
    GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA audit_trail TO app_role;
    GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA audit_trail TO app_role;
    ALTER DEFAULT PRIVILEGES IN SCHEMA audit_trail
        GRANT SELECT, INSERT ON TABLES TO app_role;
EXCEPTION WHEN undefined_object THEN
    RAISE NOTICE 'app_role does not exist — skipping grants (dev environment)';
END $$;
