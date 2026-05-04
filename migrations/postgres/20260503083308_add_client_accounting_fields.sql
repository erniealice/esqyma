-- Modify "client" table
ALTER TABLE "public"."client" ADD COLUMN "tax_id" text NULL, ADD COLUMN "registration_number" text NULL, ADD COLUMN "credit_limit" bigint NULL, ADD COLUMN "lead_time_days" integer NULL;
