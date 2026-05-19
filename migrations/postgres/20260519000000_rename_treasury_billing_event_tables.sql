-- Treasury billing-event junction rename: drop redundant `treasury_` prefix.
--
-- Plan: docs/plan/20260520-treasury-billing-event-rename/
-- Closes B1 rows 11-12 deferred from hexagonal-strict-adherence Phase 3.
--
-- Sibling protos (subscription/billing_event → BillingEvent,
-- expenditure/supplier_billing_event → SupplierBillingEvent) already follow the
-- clean convention. These two treasury junctions were the only outliers.
--
-- Phase 0 verified: both tables empty; audit_trail.audit_entry empty across
-- partitions; no `treasury_%_billing_event:%` permission codes in `permission`.
-- Safe single-phase ALTER on dev DB.
--
-- Postgres `RENAME TABLE` does NOT auto-rename FK constraint names or named
-- indexes; this migration renames table + constraints + indexes explicitly.

-- Collection junction
ALTER TABLE treasury_collection_billing_event RENAME TO collection_billing_event;
ALTER TABLE collection_billing_event RENAME CONSTRAINT treasury_collection_billing_event_pkey TO collection_billing_event_pkey;
ALTER TABLE collection_billing_event RENAME CONSTRAINT treasury_collection_billing_event_billing_event_id_fkey TO collection_billing_event_billing_event_id_fkey;
ALTER TABLE collection_billing_event RENAME CONSTRAINT treasury_collection_billing_event_revenue_id_fkey TO collection_billing_event_revenue_id_fkey;
ALTER TABLE collection_billing_event RENAME CONSTRAINT treasury_collection_billing_event_treasury_collection_id_fkey TO collection_billing_event_treasury_collection_id_fkey;
ALTER INDEX idx_treasury_collection_billing_event_billing_event_id RENAME TO idx_collection_billing_event_billing_event_id;
ALTER INDEX idx_treasury_collection_billing_event_collection_id RENAME TO idx_collection_billing_event_collection_id;
ALTER INDEX idx_treasury_collection_billing_event_revenue_id RENAME TO idx_collection_billing_event_revenue_id;
ALTER INDEX idx_treasury_collection_billing_event_workspace_id RENAME TO idx_collection_billing_event_workspace_id;

-- Disbursement junction (idx_tds_* short-alias indexes retained; only table + constraints renamed)
ALTER TABLE treasury_disbursement_supplier_billing_event RENAME TO disbursement_supplier_billing_event;
ALTER TABLE disbursement_supplier_billing_event RENAME CONSTRAINT treasury_disbursement_supplier_billing_event_pkey TO disbursement_supplier_billing_event_pkey;
ALTER TABLE disbursement_supplier_billing_event RENAME CONSTRAINT treasury_disbursement_supplier_billing_event_billing_event_fkey TO disbursement_supplier_billing_event_supplier_billing_event_fkey;
ALTER TABLE disbursement_supplier_billing_event RENAME CONSTRAINT treasury_disbursement_supplier_billing_event_disbursement_fkey TO disbursement_supplier_billing_event_treasury_disbursement_fkey;
ALTER TABLE disbursement_supplier_billing_event RENAME CONSTRAINT treasury_disbursement_supplier_billing_event_recognition_fkey TO disbursement_supplier_billing_event_expense_recognition_fkey;
