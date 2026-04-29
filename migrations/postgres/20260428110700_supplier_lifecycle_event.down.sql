-- Migration: supplier_lifecycle_event (down)
-- Dialect: postgres
-- Created: 2026-04-28T11:07:00Z
-- Rationale: Drops SupplierLifecycleEvent entity.

BEGIN;

DROP INDEX IF EXISTS idx_supplier_lifecycle_event_ws_category_kind;
DROP INDEX IF EXISTS idx_supplier_lifecycle_event_supplier_event_desc;
DROP INDEX IF EXISTS idx_supplier_lifecycle_event_workspace_id;
DROP TABLE IF EXISTS supplier_lifecycle_event;

COMMIT;
