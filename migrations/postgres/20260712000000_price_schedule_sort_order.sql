BEGIN;
-- 20260712 — price_schedule.sort_order (Q-SORT-3, report-cards navigation).
-- Additive + nullable: display-ordering key for price_schedule tabs.
-- Ordering contract wherever consumed: `sort_order NULLS LAST, name ASC`.
-- No default → an unset schedule sorts last rather than tying at 0.
-- price_schedule is a populated live table, so this is additive-only
-- (replay-from-empty is broken; never edit prior files).
ALTER TABLE price_schedule ADD COLUMN IF NOT EXISTS sort_order integer;
COMMIT;
