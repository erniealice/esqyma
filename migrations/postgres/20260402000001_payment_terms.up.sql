-- Migration: Payment Terms (configurable payment terms for supplier + client entities)

CREATE TABLE IF NOT EXISTS "payment_term" (
    "id" TEXT PRIMARY KEY,
    "date_created" TIMESTAMPTZ NULL,
    "date_modified" TIMESTAMPTZ NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL UNIQUE,
    "type" TEXT NOT NULL DEFAULT 'net',
    "net_days" INTEGER NOT NULL DEFAULT 30,
    "discount_days" INTEGER NULL,
    "discount_percent_bps" INTEGER NULL,
    "entity_scope" TEXT NOT NULL DEFAULT 'both',
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NULL,
    "display_order" INTEGER NULL
);

CREATE TABLE IF NOT EXISTS "collection_schedule" (
    "id" TEXT PRIMARY KEY,
    "date_created" TIMESTAMPTZ NULL,
    "date_modified" TIMESTAMPTZ NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "revenue_id" TEXT NOT NULL REFERENCES "revenue"("id"),
    "sequence" INTEGER NOT NULL,
    "amount" BIGINT NOT NULL,
    "due_date" BIGINT NULL,
    "due_date_string" TEXT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paid_amount" BIGINT NULL,
    "paid_date" BIGINT NULL,
    "collection_id" TEXT NULL REFERENCES "collection"("id"),
    "payment_term_id" TEXT NULL REFERENCES "payment_term"("id")
);

CREATE TABLE IF NOT EXISTS "disbursement_schedule" (
    "id" TEXT PRIMARY KEY,
    "date_created" TIMESTAMPTZ NULL,
    "date_modified" TIMESTAMPTZ NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "expenditure_id" TEXT NOT NULL REFERENCES "expenditure"("id"),
    "sequence" INTEGER NOT NULL,
    "amount" BIGINT NOT NULL,
    "due_date" BIGINT NULL,
    "due_date_string" TEXT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paid_amount" BIGINT NULL,
    "paid_date" BIGINT NULL,
    "disbursement_id" TEXT NULL REFERENCES "disbursement"("id"),
    "payment_term_id" TEXT NULL REFERENCES "payment_term"("id")
);

ALTER TABLE "client" ADD COLUMN IF NOT EXISTS "payment_term_id" TEXT NULL REFERENCES "payment_term"("id");
ALTER TABLE "supplier" ADD COLUMN IF NOT EXISTS "payment_term_id" TEXT NULL REFERENCES "payment_term"("id");
ALTER TABLE "revenue" ADD COLUMN IF NOT EXISTS "payment_term_id" TEXT NULL REFERENCES "payment_term"("id");
ALTER TABLE "revenue" ADD COLUMN IF NOT EXISTS "due_date" BIGINT NULL;
ALTER TABLE "revenue" ADD COLUMN IF NOT EXISTS "due_date_string" TEXT NULL;
ALTER TABLE "expenditure" ADD COLUMN IF NOT EXISTS "payment_term_id" TEXT NULL REFERENCES "payment_term"("id");
ALTER TABLE "purchase_order" ADD COLUMN IF NOT EXISTS "payment_term_id" TEXT NULL REFERENCES "payment_term"("id");
