-- Modify "product" table
ALTER TABLE "public"."product" ADD COLUMN "expected_cost" bigint NULL, ADD COLUMN "expected_cost_currency" text NULL;
-- Modify "job" table
ALTER TABLE "public"."job" ADD COLUMN "actual_end" bigint NULL, ADD COLUMN "actual_start" bigint NULL, ADD COLUMN "change_request_id" text NULL, ADD COLUMN "cost_account_id" text NULL, ADD COLUMN "currency" text NULL, ADD COLUMN "due_date" bigint NULL, ADD COLUMN "job_template_revision_id" text NULL, ADD COLUMN "job_template_revision_snapshot" integer NULL, ADD COLUMN "output_product_id" text NULL, ADD COLUMN "output_product_variant_id" text NULL, ADD COLUMN "output_uom" text NULL, ADD COLUMN "planned_end" bigint NULL, ADD COLUMN "planned_quantity" double precision NULL, ADD COLUMN "planned_start" bigint NULL, ADD COLUMN "priority" integer NULL, ADD COLUMN "release_date" bigint NULL, ADD COLUMN "resource_id" text NULL, ADD COLUMN "sales_order_line_id" text NULL, ADD COLUMN "workflow_instance_id" text NULL, ADD CONSTRAINT "job_cost_account_id_fkey" FOREIGN KEY ("cost_account_id") REFERENCES "public"."account" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT, ADD CONSTRAINT "job_output_product_id_fkey" FOREIGN KEY ("output_product_id") REFERENCES "public"."product" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT, ADD CONSTRAINT "job_output_product_variant_id_fkey" FOREIGN KEY ("output_product_variant_id") REFERENCES "public"."product_variant" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT, ADD CONSTRAINT "job_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resource" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT;
-- Create index "idx_job_change_request_id" to table: "job"
CREATE INDEX "idx_job_change_request_id" ON "public"."job" ("change_request_id") WHERE (change_request_id IS NOT NULL);
-- Create index "idx_job_cost_account_id" to table: "job"
CREATE INDEX "idx_job_cost_account_id" ON "public"."job" ("cost_account_id") WHERE (cost_account_id IS NOT NULL);
-- Create index "idx_job_job_template_revision_id" to table: "job"
CREATE INDEX "idx_job_job_template_revision_id" ON "public"."job" ("job_template_revision_id") WHERE (job_template_revision_id IS NOT NULL);
-- Create index "idx_job_output_product_id" to table: "job"
CREATE INDEX "idx_job_output_product_id" ON "public"."job" ("output_product_id") WHERE (output_product_id IS NOT NULL);
-- Create index "idx_job_output_product_variant_id" to table: "job"
CREATE INDEX "idx_job_output_product_variant_id" ON "public"."job" ("output_product_variant_id") WHERE (output_product_variant_id IS NOT NULL);
-- Create index "idx_job_resource_id" to table: "job"
CREATE INDEX "idx_job_resource_id" ON "public"."job" ("resource_id") WHERE (resource_id IS NOT NULL);
-- Create index "idx_job_sales_order_line_id" to table: "job"
CREATE INDEX "idx_job_sales_order_line_id" ON "public"."job" ("sales_order_line_id") WHERE (sales_order_line_id IS NOT NULL);
-- Create index "idx_job_workflow_instance_id" to table: "job"
CREATE INDEX "idx_job_workflow_instance_id" ON "public"."job" ("workflow_instance_id") WHERE (workflow_instance_id IS NOT NULL);
-- Modify "job_template_phase" table
ALTER TABLE "public"."job_template_phase" ADD COLUMN "predecessor_template_phase_id" text NULL, ADD COLUMN "resource_id" text NULL, ADD COLUMN "run_minutes_per_unit" double precision NULL, ADD COLUMN "setup_minutes" integer NULL, ADD COLUMN "teardown_minutes" integer NULL, ADD CONSTRAINT "job_template_phase_predecessor_template_phase_id_fkey" FOREIGN KEY ("predecessor_template_phase_id") REFERENCES "public"."job_template_phase" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT, ADD CONSTRAINT "job_template_phase_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resource" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT;
-- Create index "idx_job_template_phase_resource_id" to table: "job_template_phase"
CREATE INDEX "idx_job_template_phase_resource_id" ON "public"."job_template_phase" ("resource_id") WHERE (resource_id IS NOT NULL);
-- Modify "job_phase" table
ALTER TABLE "public"."job_phase" ADD COLUMN "actual_end" bigint NULL, ADD COLUMN "actual_start" bigint NULL, ADD COLUMN "planned_end" bigint NULL, ADD COLUMN "planned_start" bigint NULL, ADD COLUMN "predecessor_phase_id" text NULL, ADD COLUMN "resource_id" text NULL, ADD COLUMN "run_minutes_per_unit" double precision NULL, ADD COLUMN "setup_minutes" integer NULL, ADD COLUMN "template_phase_id" text NULL, ADD CONSTRAINT "job_phase_predecessor_phase_id_fkey" FOREIGN KEY ("predecessor_phase_id") REFERENCES "public"."job_phase" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT, ADD CONSTRAINT "job_phase_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resource" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT, ADD CONSTRAINT "job_phase_template_phase_id_fkey" FOREIGN KEY ("template_phase_id") REFERENCES "public"."job_template_phase" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT;
-- Create index "idx_job_phase_resource_id" to table: "job_phase"
CREATE INDEX "idx_job_phase_resource_id" ON "public"."job_phase" ("resource_id") WHERE (resource_id IS NOT NULL);
-- Create index "idx_job_phase_template_phase_id" to table: "job_phase"
CREATE INDEX "idx_job_phase_template_phase_id" ON "public"."job_phase" ("template_phase_id") WHERE (template_phase_id IS NOT NULL);
-- Modify "job_template_task" table
ALTER TABLE "public"."job_template_task" ADD COLUMN "instruction_doc_id" text NULL, ADD COLUMN "quantity_factor" double precision NULL, ADD COLUMN "resource_id" text NULL, ADD COLUMN "run_minutes_per_unit" double precision NULL, ADD COLUMN "setup_minutes" integer NULL, ADD COLUMN "skill_required" text NULL, ADD COLUMN "standard_labor_minutes" integer NULL, ADD COLUMN "standard_machine_minutes" integer NULL, ADD COLUMN "teardown_minutes" integer NULL, ADD COLUMN "tool_required" text NULL, ADD COLUMN "workflow_step_id" text NULL, ADD CONSTRAINT "job_template_task_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resource" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT;
-- Create index "idx_job_template_task_instruction_doc_id" to table: "job_template_task"
CREATE INDEX "idx_job_template_task_instruction_doc_id" ON "public"."job_template_task" ("instruction_doc_id") WHERE (instruction_doc_id IS NOT NULL);
-- Create index "idx_job_template_task_resource_id" to table: "job_template_task"
CREATE INDEX "idx_job_template_task_resource_id" ON "public"."job_template_task" ("resource_id") WHERE (resource_id IS NOT NULL);
-- Create index "idx_job_template_task_workflow_step_id" to table: "job_template_task"
CREATE INDEX "idx_job_template_task_workflow_step_id" ON "public"."job_template_task" ("workflow_step_id") WHERE (workflow_step_id IS NOT NULL);
-- Modify "job_task" table
ALTER TABLE "public"."job_task" ADD COLUMN "actual_end" bigint NULL, ADD COLUMN "actual_start" bigint NULL, ADD COLUMN "allow_parallel" boolean NULL DEFAULT false, ADD COLUMN "completed_quantity" double precision NULL, ADD COLUMN "percent_complete" double precision NULL, ADD COLUMN "planned_quantity" double precision NULL, ADD COLUMN "resource_id" text NULL, ADD COLUMN "template_task_id" text NULL, ADD COLUMN "workflow_step_id" text NULL, ADD CONSTRAINT "job_task_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resource" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT, ADD CONSTRAINT "job_task_template_task_id_fkey" FOREIGN KEY ("template_task_id") REFERENCES "public"."job_template_task" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT;
-- Create index "idx_job_task_resource_id" to table: "job_task"
CREATE INDEX "idx_job_task_resource_id" ON "public"."job_task" ("resource_id") WHERE (resource_id IS NOT NULL);
-- Create index "idx_job_task_template_task_id" to table: "job_task"
CREATE INDEX "idx_job_task_template_task_id" ON "public"."job_task" ("template_task_id") WHERE (template_task_id IS NOT NULL);
-- Create index "idx_job_task_workflow_step_id" to table: "job_task"
CREATE INDEX "idx_job_task_workflow_step_id" ON "public"."job_task" ("workflow_step_id") WHERE (workflow_step_id IS NOT NULL);
-- Modify "job_template" table
ALTER TABLE "public"."job_template" ADD COLUMN "change_request_id" text NULL, ADD COLUMN "default_lot_size" integer NULL, ADD COLUMN "default_uom" text NULL, ADD COLUMN "effective_from" bigint NULL, ADD COLUMN "effective_to" bigint NULL, ADD COLUMN "is_default" boolean NULL DEFAULT false, ADD COLUMN "output_product_id" text NULL, ADD COLUMN "output_product_variant_id" text NULL, ADD COLUMN "published_at" bigint NULL, ADD COLUMN "published_by" text NULL, ADD COLUMN "revision" integer NULL, ADD COLUMN "supersedes_template_id" text NULL, ADD COLUMN "template_code" text NULL, ADD COLUMN "version_status" text NULL, ADD COLUMN "workflow_template_id" text NULL, ADD CONSTRAINT "job_template_output_product_id_fkey" FOREIGN KEY ("output_product_id") REFERENCES "public"."product" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT, ADD CONSTRAINT "job_template_output_product_variant_id_fkey" FOREIGN KEY ("output_product_variant_id") REFERENCES "public"."product_variant" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT, ADD CONSTRAINT "job_template_supersedes_template_id_fkey" FOREIGN KEY ("supersedes_template_id") REFERENCES "public"."job_template" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT;
-- Create index "idx_job_template_change_request_id" to table: "job_template"
CREATE INDEX "idx_job_template_change_request_id" ON "public"."job_template" ("change_request_id") WHERE (change_request_id IS NOT NULL);
-- Create index "idx_job_template_output_product_id" to table: "job_template"
CREATE INDEX "idx_job_template_output_product_id" ON "public"."job_template" ("output_product_id") WHERE (output_product_id IS NOT NULL);
-- Create index "idx_job_template_output_product_variant_id" to table: "job_template"
CREATE INDEX "idx_job_template_output_product_variant_id" ON "public"."job_template" ("output_product_variant_id") WHERE (output_product_variant_id IS NOT NULL);
-- Create index "idx_job_template_template_code" to table: "job_template"
CREATE INDEX "idx_job_template_template_code" ON "public"."job_template" ("template_code") WHERE (template_code IS NOT NULL);
-- Create index "idx_job_template_workflow_template_id" to table: "job_template"
CREATE INDEX "idx_job_template_workflow_template_id" ON "public"."job_template" ("workflow_template_id") WHERE (workflow_template_id IS NOT NULL);
