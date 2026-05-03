-- Modify "category" table
ALTER TABLE "public"."category" ADD COLUMN "workspace_id" text NULL, ADD CONSTRAINT "category_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT;
-- Create index "idx_category_workspace_id" to table: "category"
CREATE INDEX "idx_category_workspace_id" ON "public"."category" ("workspace_id") WHERE (workspace_id IS NOT NULL);
-- Modify "subscription" table
ALTER TABLE "public"."subscription" ADD COLUMN "workspace_id" text NULL, ADD CONSTRAINT "subscription_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT;
-- Create index "idx_subscription_workspace_id" to table: "subscription"
CREATE INDEX "idx_subscription_workspace_id" ON "public"."subscription" ("workspace_id") WHERE (workspace_id IS NOT NULL);
