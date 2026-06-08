-- =============================================================================
-- revenue_line_item.subscription_seat_id — ADDITIVE-ONLY (OCID foundation)
-- =============================================================================
--
-- revenue_line_item is a POPULATED, live table (defined in
-- 20260502000000_baseline.sql; extended additively in 20260509220000). Therefore
-- this migration is ADDITIVE ONLY:
--   * ADD COLUMN subscription_seat_id text  (NULLable — existing rows keep NULL)
--   * ADD the FK as NOT VALID, then VALIDATE it separately. NOT VALID skips the
--     full-table scan/lock at attach time; VALIDATE checks existing rows under a
--     weaker lock. Existing rows all have subscription_seat_id NULL, so VALIDATE
--     passes trivially (NULL FK values are not checked).
--   * CREATE INDEX on the new column.
--
-- SR-3 per-seat idempotency key {ws}:SEAT:{seat_id}:{period}:
--   revenue_line_item has NO existing idempotency_key / client_token column
--   (verified against baseline + all subsequent migrations). The key FORMAT is an
--   espyna USE-CASE concern, and adding a UNIQUE constraint over a populated table
--   risks violating existing rows. Therefore the idempotency key is DEFERRED to
--   the espyna use-case layer — this migration adds ONLY the subscription_seat_id
--   FK + supporting index. No new key column, no new UNIQUE constraint here.
--
-- NOTE: authored directly into the sequence (not via `pnpm db:diff`) for the same
-- replay reason documented in 20260607100000.
-- =============================================================================

-- additive NULLable column (PG 11+ rewrites in metadata; no table rewrite)
ALTER TABLE public.revenue_line_item
    ADD COLUMN subscription_seat_id text;

-- attach the FK without the up-front full-table validation scan/lock
ALTER TABLE public.revenue_line_item
    ADD CONSTRAINT revenue_line_item_subscription_seat_id_fkey
        FOREIGN KEY (subscription_seat_id)
        REFERENCES public.subscription_seat (id)
        NOT VALID;

-- validate existing rows under a weaker lock (all current rows are NULL -> passes)
ALTER TABLE public.revenue_line_item
    VALIDATE CONSTRAINT revenue_line_item_subscription_seat_id_fkey;

-- per-seat revenue lookup
CREATE INDEX idx_revenue_line_item_subscription_seat_id
    ON public.revenue_line_item (subscription_seat_id);
