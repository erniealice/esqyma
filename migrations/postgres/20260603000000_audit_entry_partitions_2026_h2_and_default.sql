-- Audit-entry monthly partitions for 2026 Jun..Dec + a permanent DEFAULT partition.
--
-- WHY: audit_trail.audit_entry is RANGE-partitioned on occurred_at. The baseline
-- (20260502000000_baseline.sql) hand-rolled ONLY _2026_03 / _2026_04 / _2026_05,
-- whose coverage ends at '2026-06-01 00:00:00+08'. With no partition for June+ and
-- no DEFAULT, every audit insert dated >= 2026-06-01 fails with
--   pq: no partition of relation "audit_entry" found for row
-- which breaks the password login flow (session-create + attempt-counter-reset both
-- audit-write) and in fact every audited /action/* mutation. Date-driven: worked in
-- May, broke at the month rollover on 2026-06-01. A live hotfix already created these
-- objects on the dev DB; this migration captures the fix in the tracked sequence so a
-- fresh/prod DB does not re-break.
--
-- SHAPE: follows the baseline convention exactly (same +08 monthly bounds, same
-- '<schema>.audit_entry_YYYY_MM' naming). The concise
--   CREATE TABLE ... PARTITION OF <parent> FOR VALUES FROM ... TO ...
-- form makes Postgres auto-create each child's PRIMARY KEY (occurred_at, id) and
-- auto-attach the six partitioned indexes the parent owns -- no hand-rolled
-- ALTER INDEX ... ATTACH PARTITION needed (verified on the live _2026_06 child).
--
-- IDEMPOTENT: CREATE TABLE IF NOT EXISTS ... PARTITION OF (valid on the PG 18 target)
-- emits a skip NOTICE instead of erroring when the child already exists, so this
-- applies cleanly on (a) a fresh DB that stops at May and (b) the live dev DB where the
-- hotfix already created these objects.
--
-- DEFAULT PARTITION: a permanent catch-all so a future month rollover can never again
-- hard-fail an audit insert (and therefore login). Created LAST so the explicit monthly
-- bounds take precedence; a row only lands in _default if no month matches. Keep _default
-- drained (provision the current month's named partition ahead of time) so future
-- ATTACHes stay cheap and partition pruning stays effective.

CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_2026_06
    PARTITION OF audit_trail.audit_entry
    FOR VALUES FROM ('2026-06-01 00:00:00+08') TO ('2026-07-01 00:00:00+08');

CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_2026_07
    PARTITION OF audit_trail.audit_entry
    FOR VALUES FROM ('2026-07-01 00:00:00+08') TO ('2026-08-01 00:00:00+08');

CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_2026_08
    PARTITION OF audit_trail.audit_entry
    FOR VALUES FROM ('2026-08-01 00:00:00+08') TO ('2026-09-01 00:00:00+08');

CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_2026_09
    PARTITION OF audit_trail.audit_entry
    FOR VALUES FROM ('2026-09-01 00:00:00+08') TO ('2026-10-01 00:00:00+08');

CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_2026_10
    PARTITION OF audit_trail.audit_entry
    FOR VALUES FROM ('2026-10-01 00:00:00+08') TO ('2026-11-01 00:00:00+08');

CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_2026_11
    PARTITION OF audit_trail.audit_entry
    FOR VALUES FROM ('2026-11-01 00:00:00+08') TO ('2026-12-01 00:00:00+08');

CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_2026_12
    PARTITION OF audit_trail.audit_entry
    FOR VALUES FROM ('2026-12-01 00:00:00+08') TO ('2027-01-01 00:00:00+08');

-- Permanent safety net: catch-all for any occurred_at with no explicit monthly partition.
CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_default
    PARTITION OF audit_trail.audit_entry DEFAULT;
