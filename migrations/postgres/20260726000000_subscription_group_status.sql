BEGIN;
-- 20260726 — subscription_group.status (cohort lifecycle CATEGORY).
-- Additive + nullable free-text, per the legacy status convention:
-- "current" | "completed" | "draft" (see subscription_group.proto field 16).
-- Orthogonal to `active`, which stays the visibility gate: pickers offer only
-- status='current' rows as selectable, non-current rows render disabled, and
-- display contexts show the name regardless of status.
-- No default → the create use case defaults it to 'current' in Go, matching the
-- entity-status convention (defaults live in Go, not SQL).
-- subscription_group is a populated live table, so this is additive-only
-- (replay-from-empty is broken; never edit prior files).
ALTER TABLE subscription_group ADD COLUMN IF NOT EXISTS status text;
COMMIT;
