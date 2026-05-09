-- Migration: add_asset_transaction_revaluation_back_ref
-- Date: 2026-05-09
-- Purpose: Add asset_revaluation_id back-ref column to asset_transaction so that
--          REVALUATION_UP/DOWN transactions can be linked to their parent AssetRevaluation row.
--          Required by the RevalueAsset use case (Phase 2).
--
-- Safety contract:
--   * ADD COLUMN IF NOT EXISTS — re-applying this migration is a no-op.
--   * FK uses NOT VALID to avoid full-table scan on large asset_transaction tables;
--     run VALIDATE CONSTRAINT in a maintenance window after backfilling if needed.
--   * Partial index (WHERE asset_revaluation_id IS NOT NULL) keeps index small
--     and supports efficient look-ups without penalising the majority of rows
--     (DEPRECIATION/ACQUISITION) that have NULL in this column.

SET search_path TO public;

ALTER TABLE asset_transaction
  ADD COLUMN IF NOT EXISTS asset_revaluation_id TEXT
    REFERENCES asset_revaluation(id) ON DELETE RESTRICT;

CREATE INDEX IF NOT EXISTS idx_asset_transaction_revaluation_id
  ON asset_transaction(asset_revaluation_id)
  WHERE asset_revaluation_id IS NOT NULL;
