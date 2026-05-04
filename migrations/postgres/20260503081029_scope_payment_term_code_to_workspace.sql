-- Modify "payment_term" table
ALTER TABLE "public"."payment_term" DROP CONSTRAINT "payment_term_code_key", ADD CONSTRAINT "payment_term_workspace_id_code_key" UNIQUE ("workspace_id", "code");
