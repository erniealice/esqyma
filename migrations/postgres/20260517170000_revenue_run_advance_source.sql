-- Plan B Phase 5a — Revenue Run advance-Collection source kind.
--
-- Adds source-discriminator + advance back-edge columns to
-- revenue_run_attempt so the Revenue Run engine can record per-attempt
-- whether the recognition was driven by a subscription cycle or an advance
-- Collection tranche (cf. revenue_run.proto §RevenueRunSourceKind).
--
-- Backward compatibility:
--   - source_kind defaults to 0 (UNSPECIFIED). The use-case treats UNSPECIFIED
--     as SUBSCRIPTION_CYCLE so pre-Plan-B rows (34 rows in production at the
--     time of writing) keep their existing semantics.
--   - advance_collection_id is nullable; only populated for ADVANCE_COLLECTION
--     attempts.
--
-- All statements idempotent (`ADD COLUMN IF NOT EXISTS`).

SET search_path TO public;

-- ============================================================================
-- revenue_run_attempt — source-kind discriminator + advance FK back-edge
-- ============================================================================

ALTER TABLE revenue_run_attempt
    ADD COLUMN IF NOT EXISTS source_kind           integer DEFAULT 0 NOT NULL,
    ADD COLUMN IF NOT EXISTS advance_collection_id text;

ALTER TABLE revenue_run_attempt
    ADD CONSTRAINT revenue_run_attempt_advance_collection_id_fkey
    FOREIGN KEY (advance_collection_id) REFERENCES treasury_collection(id) NOT VALID;

CREATE INDEX IF NOT EXISTS idx_revenue_run_attempt_source_kind
    ON revenue_run_attempt(source_kind);

CREATE INDEX IF NOT EXISTS idx_revenue_run_attempt_advance_collection_id
    ON revenue_run_attempt(advance_collection_id)
    WHERE advance_collection_id IS NOT NULL;
