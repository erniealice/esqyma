-- Modify "supplier_category" table
ALTER TABLE "public"."supplier_category" ADD COLUMN "supplier_id" text NOT NULL, ADD COLUMN "category_id" text NOT NULL, ADD CONSTRAINT "supplier_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, ADD CONSTRAINT "supplier_category_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "public"."supplier" ("id") ON UPDATE NO ACTION ON DELETE CASCADE;
-- Create index "idx_supplier_category_pair" to table: "supplier_category"
CREATE UNIQUE INDEX "idx_supplier_category_pair" ON "public"."supplier_category" ("supplier_id", "category_id");
