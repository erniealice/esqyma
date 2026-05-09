-- Drop the unused price_schedule.date_start / date_end string columns.
--
-- These were drift-recovered into the proto in an earlier sweep but no view
-- ever read them — drawer + detail rendering go entirely through
-- date_time_start / date_time_end (timestamptz) projected through the
-- request-scoped *time.Location. Truth lives in the Timestamp; the strings
-- are dead weight.
--
-- Drop is safe because (verified at write time — 2026-05-07):
--   * No FK references either column (pg_constraint WHERE confrelid confirms 0 rows).
--   * No index uses either column (all 5 indexes use id, client_id, workspace_id,
--     location_id, or legacy_price_list_id only).
--   * No trigger references either column (information_schema.triggers returns 0 rows).
--   * No CHECK constraint references either column (only NOT NULL on id/active and
--     two FK constraints on workspace_id/client_id exist).
--   * 11 total rows; date_start populated in 2 rows, date_end populated in 0 rows.
--   * Both populated date_start values derive exactly from
--     date_time_start AT TIME ZONE 'Asia/Manila'::date — zero disagreements.
--     Data is fully recoverable from the Timestamp column.
--
-- DROP COLUMN on Postgres is fast (catalog-only metadata change). Wrapped in
-- the implicit DDL transaction Atlas applies, so a failure here rolls back
-- atomically.

ALTER TABLE public.price_schedule
    DROP COLUMN IF EXISTS date_start,
    DROP COLUMN IF EXISTS date_end;
