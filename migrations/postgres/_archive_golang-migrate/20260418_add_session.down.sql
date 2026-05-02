-- Down migration for add_session.
-- Drops the normalized session table. Does NOT restore the legacy
-- TIMESTAMP-typed columns (the up migration already discarded session rows
-- when converting expires_at), so rolling back loses session continuity.

DROP TABLE IF EXISTS "session";
