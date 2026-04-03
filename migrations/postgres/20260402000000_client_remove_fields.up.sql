-- Remove customer_type and date_of_birth columns, rename company_name to name
ALTER TABLE "client" DROP COLUMN IF EXISTS "customer_type";
ALTER TABLE "client" DROP COLUMN IF EXISTS "date_of_birth";
ALTER TABLE "client" RENAME COLUMN "company_name" TO "name";
