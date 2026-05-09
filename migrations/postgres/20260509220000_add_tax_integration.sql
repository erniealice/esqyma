-- Phase 1: Tax Integration — new tables and ALTER TABLE additions
-- Generated 2026-05-09 for plan: docs/plan/20260509-tax-integration/plan.md
-- All ALTER TABLE additions are NULLable. All new tables are fresh CREATE TABLE.

-- ─────────────────────────────────────────────────────────────────────────────
-- NEW TABLES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE "public"."tax_authority" (
  "id" text NOT NULL,
  "code" text NOT NULL,
  "name" text NOT NULL,
  "country_code" text NOT NULL,
  "jurisdiction" text NOT NULL,
  "active" boolean NOT NULL DEFAULT true,
  "date_created" bigint,
  "date_modified" bigint,
  PRIMARY KEY ("id"),
  UNIQUE ("code")
);

CREATE TABLE "public"."tax_treatment" (
  "id" text NOT NULL,
  "code" text NOT NULL,
  "name" text NOT NULL,
  "description" text,
  "active" boolean NOT NULL DEFAULT true,
  "date_created" bigint,
  "date_modified" bigint,
  PRIMARY KEY ("id"),
  UNIQUE ("code")
);

CREATE TABLE "public"."tax_registration_kind" (
  "id" text NOT NULL,
  "code" text NOT NULL,
  "name" text NOT NULL,
  "tax_authority_id" text NOT NULL,
  "jurisdiction" text NOT NULL,
  "party_role" integer NOT NULL DEFAULT 0,
  "compute_path" integer NOT NULL DEFAULT 0,
  "default_rate_kind" text,
  "applicable_party_types" text[],
  "description" text,
  "active" boolean NOT NULL DEFAULT true,
  "date_created" bigint,
  "date_modified" bigint,
  PRIMARY KEY ("id"),
  UNIQUE ("code"),
  CONSTRAINT "tax_registration_kind_tax_authority_id_fkey"
    FOREIGN KEY ("tax_authority_id") REFERENCES "public"."tax_authority" ("id") ON DELETE RESTRICT
);

CREATE INDEX "idx_tax_registration_kind_authority" ON "public"."tax_registration_kind" ("tax_authority_id");

CREATE TABLE "public"."tax_class" (
  "id" text NOT NULL,
  "code" text NOT NULL,
  "name" text NOT NULL,
  "description" text,
  "direction" integer NOT NULL DEFAULT 0,
  "tax_authority_id" text NOT NULL,
  "regulator_code" text,
  "default_rate_kind" text,
  "requires_counterparty_role" integer,
  "jurisdiction" text,
  "recipient_type" text,
  "threshold_amount" bigint,
  "threshold_period" text,
  "rate_kind_above_threshold" text,
  "active" boolean NOT NULL DEFAULT true,
  "date_created" bigint,
  "date_modified" bigint,
  PRIMARY KEY ("id"),
  UNIQUE ("code"),
  CONSTRAINT "tax_class_tax_authority_id_fkey"
    FOREIGN KEY ("tax_authority_id") REFERENCES "public"."tax_authority" ("id") ON DELETE RESTRICT
);

CREATE INDEX "idx_tax_class_authority" ON "public"."tax_class" ("tax_authority_id");

CREATE TABLE "public"."tax_rate" (
  "id" text NOT NULL,
  "workspace_id" text,
  "jurisdiction" text NOT NULL,
  "authority_code" text NOT NULL,
  "regulator_code" text,
  "filing_form_code" text,
  "kind" text NOT NULL,
  "treatment_code" text,
  "direction" integer NOT NULL DEFAULT 0,
  "rate_basis_points" integer NOT NULL,
  "effective_from" text NOT NULL,
  "effective_to" text,
  "status" integer NOT NULL DEFAULT 0,
  "supersedes_id" text,
  "source_citation" text,
  "version_label" text,
  "active" boolean NOT NULL DEFAULT true,
  "date_created" bigint,
  "date_modified" bigint,
  PRIMARY KEY ("id"),
  CONSTRAINT "tax_rate_workspace_id_fkey"
    FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace" ("id") ON DELETE RESTRICT,
  CONSTRAINT "tax_rate_supersedes_id_fkey"
    FOREIGN KEY ("supersedes_id") REFERENCES "public"."tax_rate" ("id") ON DELETE RESTRICT
);

CREATE INDEX "idx_tax_rate_workspace" ON "public"."tax_rate" ("workspace_id") WHERE "workspace_id" IS NOT NULL;
CREATE INDEX "idx_tax_rate_supersedes" ON "public"."tax_rate" ("supersedes_id") WHERE "supersedes_id" IS NOT NULL;

-- Load-bearing partial index for asOf lookups
-- status 2=ACTIVE, 3=SUPERSEDED
CREATE INDEX "idx_tax_rate_lookup" ON "public"."tax_rate"
  ("workspace_id", "jurisdiction", "authority_code", "kind", "treatment_code", "direction", "effective_from")
  WHERE "status" IN (2, 3);

CREATE TABLE "public"."tax_registration" (
  "id" text NOT NULL,
  "party_type" integer NOT NULL DEFAULT 0,
  "party_id" text NOT NULL,
  "tax_authority_id" text NOT NULL,
  "tax_registration_kind_id" text NOT NULL,
  "compute_path_snapshot" integer NOT NULL DEFAULT 0,
  "party_role_snapshot" integer NOT NULL DEFAULT 0,
  "registration_number" text NOT NULL,
  "status" integer NOT NULL DEFAULT 0,
  "effective_from" text NOT NULL,
  "effective_to" text,
  "supersedes_id" text,
  "source_citation" text,
  "source_document_id" text,
  "workspace_id" text NOT NULL,
  "active" boolean NOT NULL DEFAULT true,
  "date_created" bigint,
  "date_modified" bigint,
  PRIMARY KEY ("id"),
  CONSTRAINT "tax_registration_tax_authority_id_fkey"
    FOREIGN KEY ("tax_authority_id") REFERENCES "public"."tax_authority" ("id") ON DELETE RESTRICT,
  CONSTRAINT "tax_registration_kind_id_fkey"
    FOREIGN KEY ("tax_registration_kind_id") REFERENCES "public"."tax_registration_kind" ("id") ON DELETE RESTRICT,
  CONSTRAINT "tax_registration_workspace_id_fkey"
    FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace" ("id") ON DELETE RESTRICT,
  CONSTRAINT "tax_registration_supersedes_id_fkey"
    FOREIGN KEY ("supersedes_id") REFERENCES "public"."tax_registration" ("id") ON DELETE RESTRICT
);

CREATE INDEX "idx_tax_registration_authority" ON "public"."tax_registration" ("tax_authority_id");
CREATE INDEX "idx_tax_registration_kind" ON "public"."tax_registration" ("tax_registration_kind_id");
CREATE INDEX "idx_tax_registration_workspace" ON "public"."tax_registration" ("workspace_id");
CREATE INDEX "idx_tax_registration_supersedes" ON "public"."tax_registration" ("supersedes_id") WHERE "supersedes_id" IS NOT NULL;

-- Load-bearing partial unique index: prevents two simultaneously ACTIVE
-- registrations of the same compute_path per (party, authority).
-- Eliminates the multi-OUTPUT contradiction from 20260505 at the schema level.
-- status 2=ACTIVE
CREATE UNIQUE INDEX "idx_tax_registration_active_role_unique"
  ON "public"."tax_registration" ("party_type", "party_id", "tax_authority_id", "compute_path_snapshot")
  WHERE "status" = 2;

CREATE TABLE "public"."revenue_tax_line" (
  "id" text NOT NULL,
  "workspace_id" text NOT NULL,
  "revenue_id" text NOT NULL,
  "tax_rate_id" text,
  "source_registration_id_snapshot" text NOT NULL,
  "authority_code_snapshot" text NOT NULL,
  "regulator_code_snapshot" text,
  "filing_form_code_snapshot" text,
  "tax_kind_snapshot" text NOT NULL,
  "direction" integer NOT NULL DEFAULT 0,
  "taxable_base" bigint NOT NULL,
  "tax_amount" bigint NOT NULL,
  "rate_basis_points_snapshot" integer NOT NULL,
  "applied_to_line_item_ids" text[],
  "computed_at" text,
  "active" boolean NOT NULL DEFAULT true,
  "date_created" bigint,
  "date_modified" bigint,
  PRIMARY KEY ("id"),
  CONSTRAINT "revenue_tax_line_workspace_id_fkey"
    FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace" ("id") ON DELETE RESTRICT,
  CONSTRAINT "revenue_tax_line_revenue_id_fkey"
    FOREIGN KEY ("revenue_id") REFERENCES "public"."revenue" ("id") ON DELETE CASCADE,
  CONSTRAINT "revenue_tax_line_tax_rate_id_fkey"
    FOREIGN KEY ("tax_rate_id") REFERENCES "public"."tax_rate" ("id") ON DELETE RESTRICT
);

CREATE INDEX "idx_revenue_tax_line_workspace" ON "public"."revenue_tax_line" ("workspace_id");
CREATE INDEX "idx_revenue_tax_line_revenue" ON "public"."revenue_tax_line" ("revenue_id");
CREATE INDEX "idx_revenue_tax_line_tax_rate" ON "public"."revenue_tax_line" ("tax_rate_id") WHERE "tax_rate_id" IS NOT NULL;

CREATE TABLE "public"."withholding_certificate" (
  "id" text NOT NULL,
  "workspace_id" text NOT NULL,
  "revenue_id" text NOT NULL,
  "tax_authority_id" text,
  "regulator_code_snapshot" text,
  "certificate_number" text NOT NULL,
  "certificate_period" text,
  "issued_date" text,
  "received_date" text,
  "expected_amount" bigint NOT NULL,
  "actual_amount" bigint NOT NULL,
  "variance_amount" bigint NOT NULL DEFAULT 0,
  "buyer_tin_snapshot" text,
  "source_document_id" text,
  "status" integer NOT NULL DEFAULT 0,
  "notes" text,
  "active" boolean NOT NULL DEFAULT true,
  "date_created" bigint,
  "date_modified" bigint,
  PRIMARY KEY ("id"),
  UNIQUE ("revenue_id", "certificate_number"),
  CONSTRAINT "withholding_certificate_workspace_id_fkey"
    FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace" ("id") ON DELETE RESTRICT,
  CONSTRAINT "withholding_certificate_revenue_id_fkey"
    FOREIGN KEY ("revenue_id") REFERENCES "public"."revenue" ("id") ON DELETE RESTRICT,
  CONSTRAINT "withholding_certificate_tax_authority_id_fkey"
    FOREIGN KEY ("tax_authority_id") REFERENCES "public"."tax_authority" ("id") ON DELETE RESTRICT
);

CREATE INDEX "idx_wht_cert_workspace" ON "public"."withholding_certificate" ("workspace_id");
CREATE INDEX "idx_wht_cert_revenue" ON "public"."withholding_certificate" ("revenue_id");
CREATE INDEX "idx_wht_cert_authority" ON "public"."withholding_certificate" ("tax_authority_id") WHERE "tax_authority_id" IS NOT NULL;

CREATE TABLE "public"."forex_rate" (
  "id" text NOT NULL,
  "workspace_id" text NOT NULL,
  "from_currency" text NOT NULL,
  "to_currency" text NOT NULL,
  "rate_micro_units" bigint NOT NULL,
  "source" integer NOT NULL DEFAULT 0,
  "source_reference_date" text,
  "created_by_user_id" text,
  "status" integer NOT NULL DEFAULT 0,
  "effective_from" text NOT NULL,
  "effective_to" text,
  "supersedes_id" text,
  "notes" text,
  "active" boolean NOT NULL DEFAULT true,
  "date_created" bigint,
  "date_modified" bigint,
  PRIMARY KEY ("id"),
  CONSTRAINT "forex_rate_workspace_id_fkey"
    FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace" ("id") ON DELETE RESTRICT,
  CONSTRAINT "forex_rate_user_id_fkey"
    FOREIGN KEY ("created_by_user_id") REFERENCES "public"."user" ("id") ON DELETE RESTRICT,
  CONSTRAINT "forex_rate_supersedes_id_fkey"
    FOREIGN KEY ("supersedes_id") REFERENCES "public"."forex_rate" ("id") ON DELETE RESTRICT
);

CREATE INDEX "idx_forex_rate_workspace" ON "public"."forex_rate" ("workspace_id");
CREATE INDEX "idx_forex_rate_supersedes" ON "public"."forex_rate" ("supersedes_id") WHERE "supersedes_id" IS NOT NULL;
CREATE INDEX "idx_forex_rate_user" ON "public"."forex_rate" ("created_by_user_id") WHERE "created_by_user_id" IS NOT NULL;

-- Prevents two simultaneously ACTIVE rates for the same currency pair per workspace
-- status 2=ACTIVE
CREATE UNIQUE INDEX "idx_forex_rate_active_pair_unique"
  ON "public"."forex_rate" ("workspace_id", "from_currency", "to_currency")
  WHERE "status" = 2;

-- Lookup index for asOf queries on a currency pair
-- status 2=ACTIVE, 3=SUPERSEDED
CREATE INDEX "idx_forex_rate_pair_lookup"
  ON "public"."forex_rate" ("workspace_id", "from_currency", "to_currency", "effective_from")
  WHERE "status" IN (2, 3);

-- ─────────────────────────────────────────────────────────────────────────────
-- ALTER TABLE — all NULLable additions only
-- ─────────────────────────────────────────────────────────────────────────────

-- client: add TIN and country_code
ALTER TABLE "public"."client"
  ADD COLUMN "tin" text NULL,
  ADD COLUMN "country_code" text NULL;

-- workspace: add tax identity + compute gate fields
ALTER TABLE "public"."workspace"
  ADD COLUMN "tin" text NULL,
  ADD COLUMN "tax_inclusive_pricing" boolean NULL,
  ADD COLUMN "tax_computation_enabled" boolean NULL,
  ADD COLUMN "home_jurisdiction" text NULL;

-- product: add tax classification FKs
ALTER TABLE "public"."product"
  ADD COLUMN "tax_treatment_id" text NULL,
  ADD COLUMN "withholding_class_id" text NULL;

ALTER TABLE "public"."product"
  ADD CONSTRAINT "product_tax_treatment_id_fkey"
    FOREIGN KEY ("tax_treatment_id") REFERENCES "public"."tax_treatment" ("id") ON DELETE RESTRICT;

ALTER TABLE "public"."product"
  ADD CONSTRAINT "product_withholding_class_id_fkey"
    FOREIGN KEY ("withholding_class_id") REFERENCES "public"."tax_class" ("id") ON DELETE RESTRICT;

CREATE INDEX "idx_product_tax_treatment" ON "public"."product" ("tax_treatment_id") WHERE "tax_treatment_id" IS NOT NULL;
CREATE INDEX "idx_product_withholding_class" ON "public"."product" ("withholding_class_id") WHERE "withholding_class_id" IS NOT NULL;

-- product_price_plan: add tax override FKs
ALTER TABLE "public"."product_price_plan"
  ADD COLUMN "tax_treatment_id" text NULL,
  ADD COLUMN "withholding_class_id" text NULL;

ALTER TABLE "public"."product_price_plan"
  ADD CONSTRAINT "product_price_plan_tax_treatment_id_fkey"
    FOREIGN KEY ("tax_treatment_id") REFERENCES "public"."tax_treatment" ("id") ON DELETE RESTRICT;

ALTER TABLE "public"."product_price_plan"
  ADD CONSTRAINT "product_price_plan_withholding_class_id_fkey"
    FOREIGN KEY ("withholding_class_id") REFERENCES "public"."tax_class" ("id") ON DELETE RESTRICT;

CREATE INDEX "idx_ppp_tax_treatment" ON "public"."product_price_plan" ("tax_treatment_id") WHERE "tax_treatment_id" IS NOT NULL;
CREATE INDEX "idx_ppp_withholding_class" ON "public"."product_price_plan" ("withholding_class_id") WHERE "withholding_class_id" IS NOT NULL;

-- revenue: add tax denorm fields + FX fields (all NULLable)
ALTER TABLE "public"."revenue"
  ADD COLUMN "cash_amount_expected" bigint NULL,
  ADD COLUMN "wht_amount_expected" bigint NULL,
  ADD COLUMN "wht_amount_certified" bigint NULL,
  ADD COLUMN "wht_amount_variance" bigint NULL,
  ADD COLUMN "settlement_status" text NULL,
  ADD COLUMN "tax_inclusive_pricing_snapshot" boolean NULL,
  ADD COLUMN "tax_computation_enabled_snapshot" text NULL,
  ADD COLUMN "billing_currency" text NULL,
  ADD COLUMN "billing_amount" bigint NULL,
  ADD COLUMN "forex_rate_micro_units" bigint NULL,
  ADD COLUMN "forex_rate_source" text NULL;

-- revenue_line_item: add tax snapshot fields + billing amount (all NULLable)
ALTER TABLE "public"."revenue_line_item"
  ADD COLUMN "tax_treatment_snapshot" text NULL,
  ADD COLUMN "withholding_class_snapshot" text NULL,
  ADD COLUMN "billing_amount" bigint NULL;
