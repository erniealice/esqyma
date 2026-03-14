-- Migration: treasury_domain (up)
-- Dialect: postgres
-- Date: 2026-03-14
-- Description: Create treasury domain tables for collections and disbursements
--   treasury_collection: tracks inbound payments (sales, subscriptions, etc.)
--   treasury_disbursement: tracks outbound payments (purchases, expenses, etc.)

-- ============================================
-- Create treasury_collection table
-- ============================================

CREATE TABLE IF NOT EXISTS "treasury_collection" (
    "id" TEXT PRIMARY KEY,
    "date_created" BIGINT,
    "date_created_string" TEXT,
    "date_modified" BIGINT,
    "date_modified_string" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "subscription_id" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "revenue_id" TEXT,
    "collection_method_id" TEXT,
    "currency" TEXT DEFAULT 'PHP',
    "reference_number" TEXT,
    "payment_date" BIGINT,
    "received_by" TEXT,
    "received_role" TEXT,
    "collection_type" TEXT DEFAULT 'sale'
);

CREATE INDEX IF NOT EXISTS "idx_treasury_collection_subscription_id" ON "treasury_collection" ("subscription_id");
CREATE INDEX IF NOT EXISTS "idx_treasury_collection_revenue_id" ON "treasury_collection" ("revenue_id");
CREATE INDEX IF NOT EXISTS "idx_treasury_collection_collection_method_id" ON "treasury_collection" ("collection_method_id");
CREATE INDEX IF NOT EXISTS "idx_treasury_collection_status" ON "treasury_collection" ("status");

-- ============================================
-- Create treasury_disbursement table
-- ============================================

CREATE TABLE IF NOT EXISTS "treasury_disbursement" (
    "id" TEXT PRIMARY KEY,
    "date_created" BIGINT,
    "date_created_string" TEXT,
    "date_modified" BIGINT,
    "date_modified_string" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "subscription_id" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "expenditure_id" TEXT,
    "disbursement_type" TEXT,
    "disbursement_method_id" TEXT,
    "currency" TEXT DEFAULT 'PHP',
    "reference_number" TEXT,
    "payment_date" BIGINT,
    "approved_by" TEXT
);

CREATE INDEX IF NOT EXISTS "idx_treasury_disbursement_subscription_id" ON "treasury_disbursement" ("subscription_id");
CREATE INDEX IF NOT EXISTS "idx_treasury_disbursement_expenditure_id" ON "treasury_disbursement" ("expenditure_id");
CREATE INDEX IF NOT EXISTS "idx_treasury_disbursement_disbursement_method_id" ON "treasury_disbursement" ("disbursement_method_id");
CREATE INDEX IF NOT EXISTS "idx_treasury_disbursement_status" ON "treasury_disbursement" ("status");
