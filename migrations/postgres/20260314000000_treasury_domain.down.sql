-- Migration: treasury_domain (down)
-- Dialect: postgres
-- Date: 2026-03-14
-- Reverses treasury domain table creation

-- Drop treasury_disbursement (reverse order)
DROP INDEX IF EXISTS "idx_treasury_disbursement_status";
DROP INDEX IF EXISTS "idx_treasury_disbursement_disbursement_method_id";
DROP INDEX IF EXISTS "idx_treasury_disbursement_expenditure_id";
DROP INDEX IF EXISTS "idx_treasury_disbursement_subscription_id";
DROP TABLE IF EXISTS "treasury_disbursement";

-- Drop treasury_collection
DROP INDEX IF EXISTS "idx_treasury_collection_status";
DROP INDEX IF EXISTS "idx_treasury_collection_collection_method_id";
DROP INDEX IF EXISTS "idx_treasury_collection_revenue_id";
DROP INDEX IF EXISTS "idx_treasury_collection_subscription_id";
DROP TABLE IF EXISTS "treasury_collection";
