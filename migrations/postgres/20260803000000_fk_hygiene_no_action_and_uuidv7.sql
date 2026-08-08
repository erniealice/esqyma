-- Migration: fk_hygiene_no_action_and_uuidv7
-- Date: 2026-08-03
--
-- Three FK/id hygiene policies, all additive and idempotent:
--
-- 1. COVERING INDEXES for every FK that lacks one.
--    Derived 2026-08-03 from the live education1 pg_constraint/pg_index catalog:
--    87 FKs had no covering index. Criterion: an FK is covered when a valid
--    index's leading column set equals the FK column set and the index is
--    either non-partial or partial with a "<col> IS NOT NULL" predicate over
--    FK columns only (RI checks are always `col = $1`, which implies the
--    predicate, so the house-style partial tenant indexes DO cover FK checks).
--    zz_* backup and _atlas_review_* scratch tables are excluded.
--    Naming follows the house convention idx_<table>_<col>[_<col>...]; all
--    names verified unique and <= 63 bytes (longest exactly 63:
--    idx_job_outcome_summary_document_template_supersedes_binding_id).
--
-- 2. DELETE-RULE NORMALIZATION: every FK whose delete rule is not NO ACTION
--    (8x ON DELETE CASCADE, 53x ON DELETE RESTRICT on education1, 2026-08-03)
--    is dropped and re-added with no ON DELETE clause (= NO ACTION).
--    * Policy: deletes must be decided at the use-case layer, never silently
--      fanned out (CASCADE) by the DB. NO ACTION still blocks parent deletes
--      while children exist -- the "FK safety net" that
--      contrib/postgres core operations.go (HardDelete comment) relies on is
--      preserved; only the CASCADE auto-fanout and the RESTRICT/NO ACTION
--      timing nuance (NO ACTION is deferrable-capable; all these FKs are
--      non-deferrable, so behavior is identical in practice) change.
--    * espyna check (2026-08-03): all CASCADE parents with delete flows
--      (evaluation, client_workspace_user, supplier, category, revenue) use
--      dbOps.Delete = SOFT delete (UPDATE active=false), which never fired DB
--      cascades; evaluation_cycle, evaluation_template and revenue_run have no
--      delete use cases; HardDelete is used only by catalog entities (product,
--      plan, price_* etc.), none of which are CASCADE parents. No use case
--      relied on DB cascade fanout.
--    * Guards match on conname + conrelid + confdeltype <> 'a', so the block
--      is a no-op on a DB already normalized (idempotent) and a no-op where
--      the constraint does not exist (drift-safe).
--    * The composite subscription_workspace_user (client_id, workspace_user_id)
--      FK keeps its exact column order.
--    * Constraints that are currently NOT VALID are re-added NOT VALID (their
--      existing rows were never validated; forcing validation here could fail).
--      All other re-adds validate instantly against data that already satisfied
--      the identical FK shape.
--
-- 3. DB-SIDE UUIDv7 DEFAULT for audit ids.
--    public.uuid_generate_v7() is a portable RFC 9562 UUIDv7 generator
--    (unix-epoch-milliseconds in the top 48 bits, version/variant bits
--    overlaid on gen_random_uuid() randomness). It needs only pgcrypto-free
--    core PG13+ (gen_random_uuid is core since PG13) and therefore works on
--    Supabase PG15/17 targets that lack native uuidv7().
--    audit_trail.audit_entry inserts omit id and use RETURNING id
--    (contrib/postgres audit_adapter.go), so the DB default mints every
--    postgres audit id: flip it from gen_random_uuid() (v4) to v7.
--    Live check 2026-08-03: every partition (audit_entry_2026_03..2026_12,
--    audit_entry_default) carries its OWN id default, so the partition tree is
--    walked via pg_inherits and each member is flipped too. (audit_field_change
--    also defaults to gen_random_uuid(); it is a separate table, out of this
--    migration's declared scope -- tracked as a follow-up.)
--
-- Idempotency: applying this migration twice produces no changes.
-- education1 is NOT atlas-tracked: apply this same file by direct psql.

SET search_path TO public;

-- ===========================================================================
-- Section 1 -- covering indexes for FKs without one (87)
-- ===========================================================================

CREATE INDEX IF NOT EXISTS "idx_activity_expense_activity_id"
    ON "activity_expense" ("activity_id");
CREATE INDEX IF NOT EXISTS "idx_activity_material_activity_id"
    ON "activity_material" ("activity_id");
CREATE INDEX IF NOT EXISTS "idx_billing_event_parent_event_id"
    ON "billing_event" ("parent_event_id");
CREATE INDEX IF NOT EXISTS "idx_client_category_id"
    ON "client" ("category_id");
CREATE INDEX IF NOT EXISTS "idx_client_portal_grant_granted_by_user_id"
    ON "client_portal_grant" ("granted_by_user_id");
CREATE INDEX IF NOT EXISTS "idx_conversation_created_by_user_id"
    ON "conversation" ("created_by_user_id");
CREATE INDEX IF NOT EXISTS "idx_conversation_participant_user_id"
    ON "conversation_participant" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_conversation_post_sender_user_id"
    ON "conversation_post" ("sender_user_id");
CREATE INDEX IF NOT EXISTS "idx_conversation_read_receipt_last_read_post_id"
    ON "conversation_read_receipt" ("last_read_post_id");
CREATE INDEX IF NOT EXISTS "idx_delegate_client_granted_by_user_id"
    ON "delegate_client" ("granted_by_user_id");
CREATE INDEX IF NOT EXISTS "idx_delegate_client_role_id"
    ON "delegate_client" ("role_id");
CREATE INDEX IF NOT EXISTS "idx_delegate_supplier_granted_by_user_id"
    ON "delegate_supplier" ("granted_by_user_id");
CREATE INDEX IF NOT EXISTS "idx_depreciation_run_initiator_id"
    ON "depreciation_run" ("initiator_id");
CREATE INDEX IF NOT EXISTS "idx_evaluation_signed_off_by_client_portal_grant_id"
    ON "evaluation" ("signed_off_by_client_portal_grant_id");
CREATE INDEX IF NOT EXISTS "idx_evaluation_signed_off_by_workspace_user_id"
    ON "evaluation" ("signed_off_by_workspace_user_id");
CREATE INDEX IF NOT EXISTS "idx_evaluation_response_criteria_version_id"
    ON "evaluation_response" ("criteria_version_id");
CREATE INDEX IF NOT EXISTS "idx_evaluation_template_copied_from_id"
    ON "evaluation_template" ("copied_from_id");
CREATE INDEX IF NOT EXISTS "idx_expenditure_purchase_order_id"
    ON "expenditure" ("purchase_order_id");
CREATE INDEX IF NOT EXISTS "idx_expenditure_supplier_id"
    ON "expenditure" ("supplier_id");
CREATE INDEX IF NOT EXISTS "idx_expenditure_line_item_inventory_item_id"
    ON "expenditure_line_item" ("inventory_item_id");
CREATE INDEX IF NOT EXISTS "idx_expenditure_line_item_location_id"
    ON "expenditure_line_item" ("location_id");
CREATE INDEX IF NOT EXISTS "idx_expenditure_line_item_purchase_order_line_item_id"
    ON "expenditure_line_item" ("purchase_order_line_item_id");
CREATE INDEX IF NOT EXISTS "idx_expense_recognition_accrual_account_id"
    ON "expense_recognition" ("accrual_account_id");
CREATE INDEX IF NOT EXISTS "idx_expense_recognition_expense_account_id"
    ON "expense_recognition" ("expense_account_id");
CREATE INDEX IF NOT EXISTS "idx_expense_recognition_run_initiated_by"
    ON "expense_recognition_run" ("initiated_by");
CREATE INDEX IF NOT EXISTS "idx_expense_recognition_run_attempt_expenditure_id"
    ON "expense_recognition_run_attempt" ("expenditure_id");
CREATE INDEX IF NOT EXISTS "idx_expense_recognition_run_attempt_expense_recognition_id"
    ON "expense_recognition_run_attempt" ("expense_recognition_id");
CREATE INDEX IF NOT EXISTS "idx_fulfillment_expenditure_id"
    ON "fulfillment" ("expenditure_id");
CREATE INDEX IF NOT EXISTS "idx_fulfillment_supplier_id"
    ON "fulfillment" ("supplier_id");
CREATE INDEX IF NOT EXISTS "idx_fulfillment_item_product_id"
    ON "fulfillment_item" ("product_id");
CREATE INDEX IF NOT EXISTS "idx_fulfillment_item_revenue_line_item_id"
    ON "fulfillment_item" ("revenue_line_item_id");
CREATE INDEX IF NOT EXISTS "idx_fulfillment_return_item_fulfillment_item_id"
    ON "fulfillment_return_item" ("fulfillment_item_id");
CREATE INDEX IF NOT EXISTS "idx_fund_allocation_approved_by_user_id"
    ON "fund_allocation" ("approved_by_user_id");
CREATE INDEX IF NOT EXISTS "idx_fund_transaction_collection_id"
    ON "fund_transaction" ("collection_id");
CREATE INDEX IF NOT EXISTS "idx_fund_transaction_created_by_user_id"
    ON "fund_transaction" ("created_by_user_id");
CREATE INDEX IF NOT EXISTS "idx_fund_transaction_disbursement_id"
    ON "fund_transaction" ("disbursement_id");
CREATE INDEX IF NOT EXISTS "idx_fund_transaction_expenditure_id"
    ON "fund_transaction" ("expenditure_id");
CREATE INDEX IF NOT EXISTS "idx_fund_transaction_reverses_id"
    ON "fund_transaction" ("reverses_id");
CREATE INDEX IF NOT EXISTS "idx_inventory_movement_from_location_id"
    ON "inventory_movement" ("from_location_id");
CREATE INDEX IF NOT EXISTS "idx_inventory_movement_to_location_id"
    ON "inventory_movement" ("to_location_id");
CREATE INDEX IF NOT EXISTS "idx_job_activity_reversal_of_id"
    ON "job_activity" ("reversal_of_id");
CREATE INDEX IF NOT EXISTS "idx_job_outcome_summary_issued_by"
    ON "job_outcome_summary" ("issued_by");
CREATE INDEX IF NOT EXISTS "idx_job_outcome_summary_supersedes_id"
    ON "job_outcome_summary" ("supersedes_id");
CREATE INDEX IF NOT EXISTS "idx_job_outcome_summary_document_template_supersedes_binding_id"
    ON "job_outcome_summary_document_template" ("supersedes_binding_id");
CREATE INDEX IF NOT EXISTS "idx_job_outcome_summary_document_template_document_template_id"
    ON "job_outcome_summary_document_template" ("document_template_id");
CREATE INDEX IF NOT EXISTS "idx_job_outcome_summary_document_template_price_schedule_id"
    ON "job_outcome_summary_document_template" ("price_schedule_id");
CREATE INDEX IF NOT EXISTS "idx_job_outcome_summary_document_template_workspace_id"
    ON "job_outcome_summary_document_template" ("workspace_id");
CREATE INDEX IF NOT EXISTS "idx_job_phase_scoring_scheme_id"
    ON "job_phase" ("scoring_scheme_id");
CREATE INDEX IF NOT EXISTS "idx_job_phase_predecessor_phase_id"
    ON "job_phase" ("predecessor_phase_id");
CREATE INDEX IF NOT EXISTS "idx_job_settlement_reversal_of_id"
    ON "job_settlement" ("reversal_of_id");
CREATE INDEX IF NOT EXISTS "idx_job_template_supersedes_template_id"
    ON "job_template" ("supersedes_template_id");
CREATE INDEX IF NOT EXISTS "idx_job_template_document_template_document_template_id"
    ON "job_template_document_template" ("document_template_id");
CREATE INDEX IF NOT EXISTS "idx_job_template_document_template_job_category_id"
    ON "job_template_document_template" ("job_category_id");
CREATE INDEX IF NOT EXISTS "idx_job_template_document_template_price_schedule_id"
    ON "job_template_document_template" ("price_schedule_id");
CREATE INDEX IF NOT EXISTS "idx_job_template_document_template_supersedes_binding_id"
    ON "job_template_document_template" ("supersedes_binding_id");
CREATE INDEX IF NOT EXISTS "idx_job_template_document_template_workspace_id"
    ON "job_template_document_template" ("workspace_id");
CREATE INDEX IF NOT EXISTS "idx_job_template_phase_scoring_scheme_id"
    ON "job_template_phase" ("scoring_scheme_id");
CREATE INDEX IF NOT EXISTS "idx_job_template_phase_predecessor_template_phase_id"
    ON "job_template_phase" ("predecessor_template_phase_id");
CREATE INDEX IF NOT EXISTS "idx_outcome_criteria_criteria_group_id_code"
    ON "outcome_criteria" ("criteria_group_id", "code");
CREATE INDEX IF NOT EXISTS "idx_outcome_criteria_overrides_id"
    ON "outcome_criteria" ("overrides_id");
CREATE INDEX IF NOT EXISTS "idx_outcome_criteria_supersedes_id"
    ON "outcome_criteria" ("supersedes_id");
CREATE INDEX IF NOT EXISTS "idx_outcome_criteria_workspace_id"
    ON "outcome_criteria" ("workspace_id");
CREATE INDEX IF NOT EXISTS "idx_phase_outcome_summary_issued_by"
    ON "phase_outcome_summary" ("issued_by");
CREATE INDEX IF NOT EXISTS "idx_phase_outcome_summary_supersedes_id"
    ON "phase_outcome_summary" ("supersedes_id");
CREATE INDEX IF NOT EXISTS "idx_purchase_order_parent_po_id"
    ON "purchase_order" ("parent_po_id");
CREATE INDEX IF NOT EXISTS "idx_purchase_order_payment_term_id"
    ON "purchase_order" ("payment_term_id");
CREATE INDEX IF NOT EXISTS "idx_purchase_order_line_item_inventory_item_id"
    ON "purchase_order_line_item" ("inventory_item_id");
CREATE INDEX IF NOT EXISTS "idx_purchase_order_line_item_location_id"
    ON "purchase_order_line_item" ("location_id");
CREATE INDEX IF NOT EXISTS "idx_revenue_run_initiated_by"
    ON "revenue_run" ("initiated_by");
CREATE INDEX IF NOT EXISTS "idx_revenue_run_attempt_revenue_id"
    ON "revenue_run_attempt" ("revenue_id");
CREATE INDEX IF NOT EXISTS "idx_score_scale_workspace_id"
    ON "score_scale" ("workspace_id");
CREATE INDEX IF NOT EXISTS "idx_scoring_scheme_workspace_id"
    ON "scoring_scheme" ("workspace_id");
CREATE INDEX IF NOT EXISTS "idx_session_acting_as_workspace_id"
    ON "session" ("acting_as_workspace_id");
CREATE INDEX IF NOT EXISTS "idx_subscription_seat_product_variant_id"
    ON "subscription_seat" ("product_variant_id");
CREATE INDEX IF NOT EXISTS "idx_subscription_seat_replaces_id"
    ON "subscription_seat" ("replaces_id");
CREATE INDEX IF NOT EXISTS "idx_subscription_workspace_user_client_id_workspace_user_id"
    ON "subscription_workspace_user" ("client_id", "workspace_user_id");
CREATE INDEX IF NOT EXISTS "idx_supplier_category_id"
    ON "supplier" ("category_id");
CREATE INDEX IF NOT EXISTS "idx_supplier_payment_term_id"
    ON "supplier" ("payment_term_id");
CREATE INDEX IF NOT EXISTS "idx_supplier_contract_accrual_account_id"
    ON "supplier_contract" ("accrual_account_id");
CREATE INDEX IF NOT EXISTS "idx_supplier_portal_grant_granted_by_user_id"
    ON "supplier_portal_grant" ("granted_by_user_id");
CREATE INDEX IF NOT EXISTS "idx_task_outcome_recorded_by"
    ON "task_outcome" ("recorded_by");
CREATE INDEX IF NOT EXISTS "idx_task_outcome_reviewed_by"
    ON "task_outcome" ("reviewed_by");
CREATE INDEX IF NOT EXISTS "idx_task_outcome_revision_of_id"
    ON "task_outcome" ("revision_of_id");
CREATE INDEX IF NOT EXISTS "idx_treasury_collection_advance_balance_account_id"
    ON "treasury_collection" ("advance_balance_account_id");
CREATE INDEX IF NOT EXISTS "idx_treasury_collection_advance_target_account_id"
    ON "treasury_collection" ("advance_target_account_id");
CREATE INDEX IF NOT EXISTS "idx_treasury_disbursement_advance_balance_account_id"
    ON "treasury_disbursement" ("advance_balance_account_id");
CREATE INDEX IF NOT EXISTS "idx_treasury_disbursement_advance_target_account_id"
    ON "treasury_disbursement" ("advance_target_account_id");

-- ===========================================================================
-- Section 2 -- normalize all non-NO-ACTION delete rules (8 CASCADE + 53 RESTRICT)
-- ===========================================================================

-- account.account_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'account_workspace_id_fkey'
           AND conrelid = 'public.account'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "account" DROP CONSTRAINT "account_workspace_id_fkey";
        ALTER TABLE "account" ADD CONSTRAINT "account_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END;
$$;

-- asset.asset_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'asset_workspace_id_fkey'
           AND conrelid = 'public.asset'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "asset" DROP CONSTRAINT "asset_workspace_id_fkey";
        ALTER TABLE "asset" ADD CONSTRAINT "asset_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

-- asset_category.asset_category_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'asset_category_workspace_id_fkey'
           AND conrelid = 'public.asset_category'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "asset_category" DROP CONSTRAINT "asset_category_workspace_id_fkey";
        ALTER TABLE "asset_category" ADD CONSTRAINT "asset_category_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

-- asset_transaction.asset_transaction_asset_revaluation_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'asset_transaction_asset_revaluation_id_fkey'
           AND conrelid = 'public.asset_transaction'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "asset_transaction" DROP CONSTRAINT "asset_transaction_asset_revaluation_id_fkey";
        ALTER TABLE "asset_transaction" ADD CONSTRAINT "asset_transaction_asset_revaluation_id_fkey"
            FOREIGN KEY (asset_revaluation_id) REFERENCES asset_revaluation(id);
    END IF;
END;
$$;

-- asset_transaction.asset_transaction_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'asset_transaction_workspace_id_fkey'
           AND conrelid = 'public.asset_transaction'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "asset_transaction" DROP CONSTRAINT "asset_transaction_workspace_id_fkey";
        ALTER TABLE "asset_transaction" ADD CONSTRAINT "asset_transaction_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

-- attachment.attachment_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'attachment_workspace_id_fkey'
           AND conrelid = 'public.attachment'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "attachment" DROP CONSTRAINT "attachment_workspace_id_fkey";
        ALTER TABLE "attachment" ADD CONSTRAINT "attachment_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END;
$$;

-- category.category_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'category_workspace_id_fkey'
           AND conrelid = 'public.category'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "category" DROP CONSTRAINT "category_workspace_id_fkey";
        ALTER TABLE "category" ADD CONSTRAINT "category_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END;
$$;

-- depreciation_schedule.depreciation_schedule_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'depreciation_schedule_workspace_id_fkey'
           AND conrelid = 'public.depreciation_schedule'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "depreciation_schedule" DROP CONSTRAINT "depreciation_schedule_workspace_id_fkey";
        ALTER TABLE "depreciation_schedule" ADD CONSTRAINT "depreciation_schedule_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

-- document_template.document_template_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'document_template_workspace_id_fkey'
           AND conrelid = 'public.document_template'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "document_template" DROP CONSTRAINT "document_template_workspace_id_fkey";
        ALTER TABLE "document_template" ADD CONSTRAINT "document_template_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END;
$$;

-- equity_account.equity_account_workspace_user_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'equity_account_workspace_user_id_fkey'
           AND conrelid = 'public.equity_account'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "equity_account" DROP CONSTRAINT "equity_account_workspace_user_id_fkey";
        ALTER TABLE "equity_account" ADD CONSTRAINT "equity_account_workspace_user_id_fkey"
            FOREIGN KEY (workspace_user_id) REFERENCES workspace_user(id) NOT VALID;
    END IF;
END;
$$;

-- evaluation_cycle_member.evaluation_cycle_member_cycle_id_fkey: ON DELETE CASCADE -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'evaluation_cycle_member_cycle_id_fkey'
           AND conrelid = 'public.evaluation_cycle_member'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "evaluation_cycle_member" DROP CONSTRAINT "evaluation_cycle_member_cycle_id_fkey";
        ALTER TABLE "evaluation_cycle_member" ADD CONSTRAINT "evaluation_cycle_member_cycle_id_fkey"
            FOREIGN KEY (evaluation_cycle_id) REFERENCES evaluation_cycle(id);
    END IF;
END;
$$;

-- evaluation_response.evaluation_response_evaluation_id_fkey: ON DELETE CASCADE -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'evaluation_response_evaluation_id_fkey'
           AND conrelid = 'public.evaluation_response'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "evaluation_response" DROP CONSTRAINT "evaluation_response_evaluation_id_fkey";
        ALTER TABLE "evaluation_response" ADD CONSTRAINT "evaluation_response_evaluation_id_fkey"
            FOREIGN KEY (evaluation_id) REFERENCES evaluation(id);
    END IF;
END;
$$;

-- evaluation_template_item.evaluation_template_item_template_id_fkey: ON DELETE CASCADE -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'evaluation_template_item_template_id_fkey'
           AND conrelid = 'public.evaluation_template_item'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "evaluation_template_item" DROP CONSTRAINT "evaluation_template_item_template_id_fkey";
        ALTER TABLE "evaluation_template_item" ADD CONSTRAINT "evaluation_template_item_template_id_fkey"
            FOREIGN KEY (evaluation_template_id) REFERENCES evaluation_template(id);
    END IF;
END;
$$;

-- expenditure.expenditure_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'expenditure_workspace_id_fkey'
           AND conrelid = 'public.expenditure'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "expenditure" DROP CONSTRAINT "expenditure_workspace_id_fkey";
        ALTER TABLE "expenditure" ADD CONSTRAINT "expenditure_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

-- forex_rate.forex_rate_supersedes_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'forex_rate_supersedes_id_fkey'
           AND conrelid = 'public.forex_rate'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "forex_rate" DROP CONSTRAINT "forex_rate_supersedes_id_fkey";
        ALTER TABLE "forex_rate" ADD CONSTRAINT "forex_rate_supersedes_id_fkey"
            FOREIGN KEY (supersedes_id) REFERENCES forex_rate(id);
    END IF;
END;
$$;

-- forex_rate.forex_rate_user_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'forex_rate_user_id_fkey'
           AND conrelid = 'public.forex_rate'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "forex_rate" DROP CONSTRAINT "forex_rate_user_id_fkey";
        ALTER TABLE "forex_rate" ADD CONSTRAINT "forex_rate_user_id_fkey"
            FOREIGN KEY (created_by_user_id) REFERENCES "user"(id);
    END IF;
END;
$$;

-- forex_rate.forex_rate_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'forex_rate_workspace_id_fkey'
           AND conrelid = 'public.forex_rate'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "forex_rate" DROP CONSTRAINT "forex_rate_workspace_id_fkey";
        ALTER TABLE "forex_rate" ADD CONSTRAINT "forex_rate_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END;
$$;

-- job.job_cost_account_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_cost_account_id_fkey'
           AND conrelid = 'public.job'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job" DROP CONSTRAINT "job_cost_account_id_fkey";
        ALTER TABLE "job" ADD CONSTRAINT "job_cost_account_id_fkey"
            FOREIGN KEY (cost_account_id) REFERENCES account(id);
    END IF;
END;
$$;

-- job.job_output_product_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_output_product_id_fkey'
           AND conrelid = 'public.job'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job" DROP CONSTRAINT "job_output_product_id_fkey";
        ALTER TABLE "job" ADD CONSTRAINT "job_output_product_id_fkey"
            FOREIGN KEY (output_product_id) REFERENCES product(id);
    END IF;
END;
$$;

-- job.job_output_product_variant_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_output_product_variant_id_fkey'
           AND conrelid = 'public.job'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job" DROP CONSTRAINT "job_output_product_variant_id_fkey";
        ALTER TABLE "job" ADD CONSTRAINT "job_output_product_variant_id_fkey"
            FOREIGN KEY (output_product_variant_id) REFERENCES product_variant(id);
    END IF;
END;
$$;

-- job.job_resource_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_resource_id_fkey'
           AND conrelid = 'public.job'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job" DROP CONSTRAINT "job_resource_id_fkey";
        ALTER TABLE "job" ADD CONSTRAINT "job_resource_id_fkey"
            FOREIGN KEY (resource_id) REFERENCES resource(id);
    END IF;
END;
$$;

-- job_phase.job_phase_predecessor_phase_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_phase_predecessor_phase_id_fkey'
           AND conrelid = 'public.job_phase'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job_phase" DROP CONSTRAINT "job_phase_predecessor_phase_id_fkey";
        ALTER TABLE "job_phase" ADD CONSTRAINT "job_phase_predecessor_phase_id_fkey"
            FOREIGN KEY (predecessor_phase_id) REFERENCES job_phase(id);
    END IF;
END;
$$;

-- job_phase.job_phase_resource_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_phase_resource_id_fkey'
           AND conrelid = 'public.job_phase'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job_phase" DROP CONSTRAINT "job_phase_resource_id_fkey";
        ALTER TABLE "job_phase" ADD CONSTRAINT "job_phase_resource_id_fkey"
            FOREIGN KEY (resource_id) REFERENCES resource(id);
    END IF;
END;
$$;

-- job_phase.job_phase_template_phase_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_phase_template_phase_id_fkey'
           AND conrelid = 'public.job_phase'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job_phase" DROP CONSTRAINT "job_phase_template_phase_id_fkey";
        ALTER TABLE "job_phase" ADD CONSTRAINT "job_phase_template_phase_id_fkey"
            FOREIGN KEY (template_phase_id) REFERENCES job_template_phase(id);
    END IF;
END;
$$;

-- job_task.job_task_resource_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_task_resource_id_fkey'
           AND conrelid = 'public.job_task'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job_task" DROP CONSTRAINT "job_task_resource_id_fkey";
        ALTER TABLE "job_task" ADD CONSTRAINT "job_task_resource_id_fkey"
            FOREIGN KEY (resource_id) REFERENCES resource(id);
    END IF;
END;
$$;

-- job_task.job_task_template_task_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_task_template_task_id_fkey'
           AND conrelid = 'public.job_task'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job_task" DROP CONSTRAINT "job_task_template_task_id_fkey";
        ALTER TABLE "job_task" ADD CONSTRAINT "job_task_template_task_id_fkey"
            FOREIGN KEY (template_task_id) REFERENCES job_template_task(id);
    END IF;
END;
$$;

-- job_template.job_template_output_product_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_template_output_product_id_fkey'
           AND conrelid = 'public.job_template'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job_template" DROP CONSTRAINT "job_template_output_product_id_fkey";
        ALTER TABLE "job_template" ADD CONSTRAINT "job_template_output_product_id_fkey"
            FOREIGN KEY (output_product_id) REFERENCES product(id);
    END IF;
END;
$$;

-- job_template.job_template_output_product_variant_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_template_output_product_variant_id_fkey'
           AND conrelid = 'public.job_template'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job_template" DROP CONSTRAINT "job_template_output_product_variant_id_fkey";
        ALTER TABLE "job_template" ADD CONSTRAINT "job_template_output_product_variant_id_fkey"
            FOREIGN KEY (output_product_variant_id) REFERENCES product_variant(id);
    END IF;
END;
$$;

-- job_template.job_template_supersedes_template_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_template_supersedes_template_id_fkey'
           AND conrelid = 'public.job_template'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job_template" DROP CONSTRAINT "job_template_supersedes_template_id_fkey";
        ALTER TABLE "job_template" ADD CONSTRAINT "job_template_supersedes_template_id_fkey"
            FOREIGN KEY (supersedes_template_id) REFERENCES job_template(id);
    END IF;
END;
$$;

-- job_template_phase.job_template_phase_predecessor_template_phase_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_template_phase_predecessor_template_phase_id_fkey'
           AND conrelid = 'public.job_template_phase'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job_template_phase" DROP CONSTRAINT "job_template_phase_predecessor_template_phase_id_fkey";
        ALTER TABLE "job_template_phase" ADD CONSTRAINT "job_template_phase_predecessor_template_phase_id_fkey"
            FOREIGN KEY (predecessor_template_phase_id) REFERENCES job_template_phase(id);
    END IF;
END;
$$;

-- job_template_phase.job_template_phase_resource_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_template_phase_resource_id_fkey'
           AND conrelid = 'public.job_template_phase'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job_template_phase" DROP CONSTRAINT "job_template_phase_resource_id_fkey";
        ALTER TABLE "job_template_phase" ADD CONSTRAINT "job_template_phase_resource_id_fkey"
            FOREIGN KEY (resource_id) REFERENCES resource(id);
    END IF;
END;
$$;

-- job_template_task.job_template_task_resource_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'job_template_task_resource_id_fkey'
           AND conrelid = 'public.job_template_task'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "job_template_task" DROP CONSTRAINT "job_template_task_resource_id_fkey";
        ALTER TABLE "job_template_task" ADD CONSTRAINT "job_template_task_resource_id_fkey"
            FOREIGN KEY (resource_id) REFERENCES resource(id);
    END IF;
END;
$$;

-- journal_entry.journal_entry_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'journal_entry_workspace_id_fkey'
           AND conrelid = 'public.journal_entry'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "journal_entry" DROP CONSTRAINT "journal_entry_workspace_id_fkey";
        ALTER TABLE "journal_entry" ADD CONSTRAINT "journal_entry_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID;
    END IF;
END;
$$;

-- plan.plan_client_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'plan_client_id_fkey'
           AND conrelid = 'public.plan'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "plan" DROP CONSTRAINT "plan_client_id_fkey";
        ALTER TABLE "plan" ADD CONSTRAINT "plan_client_id_fkey"
            FOREIGN KEY (client_id) REFERENCES client(id);
    END IF;
END;
$$;

-- plan.plan_parent_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'plan_parent_id_fkey'
           AND conrelid = 'public.plan'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "plan" DROP CONSTRAINT "plan_parent_id_fkey";
        ALTER TABLE "plan" ADD CONSTRAINT "plan_parent_id_fkey"
            FOREIGN KEY (parent_id) REFERENCES plan(id);
    END IF;
END;
$$;

-- price_plan.price_plan_client_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'price_plan_client_id_fkey'
           AND conrelid = 'public.price_plan'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "price_plan" DROP CONSTRAINT "price_plan_client_id_fkey";
        ALTER TABLE "price_plan" ADD CONSTRAINT "price_plan_client_id_fkey"
            FOREIGN KEY (client_id) REFERENCES client(id);
    END IF;
END;
$$;

-- price_schedule.price_schedule_client_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'price_schedule_client_id_fkey'
           AND conrelid = 'public.price_schedule'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "price_schedule" DROP CONSTRAINT "price_schedule_client_id_fkey";
        ALTER TABLE "price_schedule" ADD CONSTRAINT "price_schedule_client_id_fkey"
            FOREIGN KEY (client_id) REFERENCES client(id);
    END IF;
END;
$$;

-- product.product_tax_treatment_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'product_tax_treatment_id_fkey'
           AND conrelid = 'public.product'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "product" DROP CONSTRAINT "product_tax_treatment_id_fkey";
        ALTER TABLE "product" ADD CONSTRAINT "product_tax_treatment_id_fkey"
            FOREIGN KEY (tax_treatment_id) REFERENCES tax_treatment(id);
    END IF;
END;
$$;

-- product.product_withholding_class_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'product_withholding_class_id_fkey'
           AND conrelid = 'public.product'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "product" DROP CONSTRAINT "product_withholding_class_id_fkey";
        ALTER TABLE "product" ADD CONSTRAINT "product_withholding_class_id_fkey"
            FOREIGN KEY (withholding_class_id) REFERENCES tax_class(id);
    END IF;
END;
$$;

-- product_price_plan.product_price_plan_tax_treatment_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'product_price_plan_tax_treatment_id_fkey'
           AND conrelid = 'public.product_price_plan'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "product_price_plan" DROP CONSTRAINT "product_price_plan_tax_treatment_id_fkey";
        ALTER TABLE "product_price_plan" ADD CONSTRAINT "product_price_plan_tax_treatment_id_fkey"
            FOREIGN KEY (tax_treatment_id) REFERENCES tax_treatment(id);
    END IF;
END;
$$;

-- product_price_plan.product_price_plan_withholding_class_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'product_price_plan_withholding_class_id_fkey'
           AND conrelid = 'public.product_price_plan'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "product_price_plan" DROP CONSTRAINT "product_price_plan_withholding_class_id_fkey";
        ALTER TABLE "product_price_plan" ADD CONSTRAINT "product_price_plan_withholding_class_id_fkey"
            FOREIGN KEY (withholding_class_id) REFERENCES tax_class(id);
    END IF;
END;
$$;

-- revenue_run_attempt.revenue_run_attempt_run_id_fkey: ON DELETE CASCADE -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'revenue_run_attempt_run_id_fkey'
           AND conrelid = 'public.revenue_run_attempt'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "revenue_run_attempt" DROP CONSTRAINT "revenue_run_attempt_run_id_fkey";
        ALTER TABLE "revenue_run_attempt" ADD CONSTRAINT "revenue_run_attempt_run_id_fkey"
            FOREIGN KEY (run_id) REFERENCES revenue_run(id);
    END IF;
END;
$$;

-- revenue_tax_line.revenue_tax_line_revenue_id_fkey: ON DELETE CASCADE -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'revenue_tax_line_revenue_id_fkey'
           AND conrelid = 'public.revenue_tax_line'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "revenue_tax_line" DROP CONSTRAINT "revenue_tax_line_revenue_id_fkey";
        ALTER TABLE "revenue_tax_line" ADD CONSTRAINT "revenue_tax_line_revenue_id_fkey"
            FOREIGN KEY (revenue_id) REFERENCES revenue(id);
    END IF;
END;
$$;

-- revenue_tax_line.revenue_tax_line_source_registration_fk: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'revenue_tax_line_source_registration_fk'
           AND conrelid = 'public.revenue_tax_line'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "revenue_tax_line" DROP CONSTRAINT "revenue_tax_line_source_registration_fk";
        ALTER TABLE "revenue_tax_line" ADD CONSTRAINT "revenue_tax_line_source_registration_fk"
            FOREIGN KEY (source_registration_id_snapshot) REFERENCES tax_registration(id);
    END IF;
END;
$$;

-- revenue_tax_line.revenue_tax_line_tax_rate_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'revenue_tax_line_tax_rate_id_fkey'
           AND conrelid = 'public.revenue_tax_line'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "revenue_tax_line" DROP CONSTRAINT "revenue_tax_line_tax_rate_id_fkey";
        ALTER TABLE "revenue_tax_line" ADD CONSTRAINT "revenue_tax_line_tax_rate_id_fkey"
            FOREIGN KEY (tax_rate_id) REFERENCES tax_rate(id);
    END IF;
END;
$$;

-- revenue_tax_line.revenue_tax_line_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'revenue_tax_line_workspace_id_fkey'
           AND conrelid = 'public.revenue_tax_line'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "revenue_tax_line" DROP CONSTRAINT "revenue_tax_line_workspace_id_fkey";
        ALTER TABLE "revenue_tax_line" ADD CONSTRAINT "revenue_tax_line_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END;
$$;

-- subscription.subscription_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'subscription_workspace_id_fkey'
           AND conrelid = 'public.subscription'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "subscription" DROP CONSTRAINT "subscription_workspace_id_fkey";
        ALTER TABLE "subscription" ADD CONSTRAINT "subscription_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END;
$$;

-- subscription_workspace_user.subscription_workspace_user_account_team_fkey: ON DELETE CASCADE -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'subscription_workspace_user_account_team_fkey'
           AND conrelid = 'public.subscription_workspace_user'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "subscription_workspace_user" DROP CONSTRAINT "subscription_workspace_user_account_team_fkey";
        ALTER TABLE "subscription_workspace_user" ADD CONSTRAINT "subscription_workspace_user_account_team_fkey"
            FOREIGN KEY (client_id, workspace_user_id) REFERENCES client_workspace_user(client_id, workspace_user_id);
    END IF;
END;
$$;

-- supplier_category.supplier_category_category_id_fkey: ON DELETE CASCADE -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'supplier_category_category_id_fkey'
           AND conrelid = 'public.supplier_category'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "supplier_category" DROP CONSTRAINT "supplier_category_category_id_fkey";
        ALTER TABLE "supplier_category" ADD CONSTRAINT "supplier_category_category_id_fkey"
            FOREIGN KEY (category_id) REFERENCES category(id);
    END IF;
END;
$$;

-- supplier_category.supplier_category_supplier_id_fkey: ON DELETE CASCADE -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'supplier_category_supplier_id_fkey'
           AND conrelid = 'public.supplier_category'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "supplier_category" DROP CONSTRAINT "supplier_category_supplier_id_fkey";
        ALTER TABLE "supplier_category" ADD CONSTRAINT "supplier_category_supplier_id_fkey"
            FOREIGN KEY (supplier_id) REFERENCES supplier(id);
    END IF;
END;
$$;

-- tax_class.tax_class_tax_authority_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'tax_class_tax_authority_id_fkey'
           AND conrelid = 'public.tax_class'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "tax_class" DROP CONSTRAINT "tax_class_tax_authority_id_fkey";
        ALTER TABLE "tax_class" ADD CONSTRAINT "tax_class_tax_authority_id_fkey"
            FOREIGN KEY (tax_authority_id) REFERENCES tax_authority(id);
    END IF;
END;
$$;

-- tax_rate.tax_rate_supersedes_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'tax_rate_supersedes_id_fkey'
           AND conrelid = 'public.tax_rate'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "tax_rate" DROP CONSTRAINT "tax_rate_supersedes_id_fkey";
        ALTER TABLE "tax_rate" ADD CONSTRAINT "tax_rate_supersedes_id_fkey"
            FOREIGN KEY (supersedes_id) REFERENCES tax_rate(id);
    END IF;
END;
$$;

-- tax_rate.tax_rate_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'tax_rate_workspace_id_fkey'
           AND conrelid = 'public.tax_rate'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "tax_rate" DROP CONSTRAINT "tax_rate_workspace_id_fkey";
        ALTER TABLE "tax_rate" ADD CONSTRAINT "tax_rate_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END;
$$;

-- tax_registration.tax_registration_kind_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'tax_registration_kind_id_fkey'
           AND conrelid = 'public.tax_registration'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "tax_registration" DROP CONSTRAINT "tax_registration_kind_id_fkey";
        ALTER TABLE "tax_registration" ADD CONSTRAINT "tax_registration_kind_id_fkey"
            FOREIGN KEY (tax_registration_kind_id) REFERENCES tax_registration_kind(id);
    END IF;
END;
$$;

-- tax_registration.tax_registration_supersedes_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'tax_registration_supersedes_id_fkey'
           AND conrelid = 'public.tax_registration'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "tax_registration" DROP CONSTRAINT "tax_registration_supersedes_id_fkey";
        ALTER TABLE "tax_registration" ADD CONSTRAINT "tax_registration_supersedes_id_fkey"
            FOREIGN KEY (supersedes_id) REFERENCES tax_registration(id);
    END IF;
END;
$$;

-- tax_registration.tax_registration_tax_authority_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'tax_registration_tax_authority_id_fkey'
           AND conrelid = 'public.tax_registration'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "tax_registration" DROP CONSTRAINT "tax_registration_tax_authority_id_fkey";
        ALTER TABLE "tax_registration" ADD CONSTRAINT "tax_registration_tax_authority_id_fkey"
            FOREIGN KEY (tax_authority_id) REFERENCES tax_authority(id);
    END IF;
END;
$$;

-- tax_registration.tax_registration_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'tax_registration_workspace_id_fkey'
           AND conrelid = 'public.tax_registration'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "tax_registration" DROP CONSTRAINT "tax_registration_workspace_id_fkey";
        ALTER TABLE "tax_registration" ADD CONSTRAINT "tax_registration_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END;
$$;

-- tax_registration_kind.tax_registration_kind_tax_authority_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'tax_registration_kind_tax_authority_id_fkey'
           AND conrelid = 'public.tax_registration_kind'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "tax_registration_kind" DROP CONSTRAINT "tax_registration_kind_tax_authority_id_fkey";
        ALTER TABLE "tax_registration_kind" ADD CONSTRAINT "tax_registration_kind_tax_authority_id_fkey"
            FOREIGN KEY (tax_authority_id) REFERENCES tax_authority(id);
    END IF;
END;
$$;

-- withholding_certificate.withholding_certificate_revenue_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'withholding_certificate_revenue_id_fkey'
           AND conrelid = 'public.withholding_certificate'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "withholding_certificate" DROP CONSTRAINT "withholding_certificate_revenue_id_fkey";
        ALTER TABLE "withholding_certificate" ADD CONSTRAINT "withholding_certificate_revenue_id_fkey"
            FOREIGN KEY (revenue_id) REFERENCES revenue(id);
    END IF;
END;
$$;

-- withholding_certificate.withholding_certificate_tax_authority_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'withholding_certificate_tax_authority_id_fkey'
           AND conrelid = 'public.withholding_certificate'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "withholding_certificate" DROP CONSTRAINT "withholding_certificate_tax_authority_id_fkey";
        ALTER TABLE "withholding_certificate" ADD CONSTRAINT "withholding_certificate_tax_authority_id_fkey"
            FOREIGN KEY (tax_authority_id) REFERENCES tax_authority(id);
    END IF;
END;
$$;

-- withholding_certificate.withholding_certificate_workspace_id_fkey: ON DELETE RESTRICT -> NO ACTION
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
         WHERE conname  = 'withholding_certificate_workspace_id_fkey'
           AND conrelid = 'public.withholding_certificate'::regclass
           AND contype  = 'f'
           AND confdeltype <> 'a'
    ) THEN
        ALTER TABLE "withholding_certificate" DROP CONSTRAINT "withholding_certificate_workspace_id_fkey";
        ALTER TABLE "withholding_certificate" ADD CONSTRAINT "withholding_certificate_workspace_id_fkey"
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END;
$$;

-- ===========================================================================
-- Section 3 -- portable UUIDv7 generator + audit_entry id defaults
-- ===========================================================================

-- RFC 9562 UUID version 7: 48-bit big-endian unix-epoch-milliseconds, then
-- version nibble 0111, then random bits with the 10 variant already supplied
-- by gen_random_uuid(). Core PG13+ only; no extension, no native uuidv7().
CREATE OR REPLACE FUNCTION public.uuid_generate_v7()
RETURNS uuid
LANGUAGE plpgsql
VOLATILE
AS $$
DECLARE
    v_bytes bytea;
BEGIN
    -- 16 random bytes with v4 version/variant bits from the core generator.
    v_bytes := uuid_send(gen_random_uuid());
    -- Overlay bytes 0-5 with the 48 low bits of unix epoch milliseconds.
    v_bytes := overlay(v_bytes
                       PLACING substring(int8send(floor(extract(epoch FROM clock_timestamp()) * 1000)::bigint) FROM 3 FOR 6)
                       FROM 1 FOR 6);
    -- Force the version nibble (high 4 bits of byte 6) to 0111 = 7,
    -- keeping the low nibble random. Variant bits in byte 8 are already 10.
    v_bytes := set_byte(v_bytes, 6, (get_byte(v_bytes, 6) & 15) | 112);
    RETURN encode(v_bytes, 'hex')::uuid;
END;
$$;

-- Parent default (used by INSERTs routed through the partitioned parent).
ALTER TABLE audit_trail.audit_entry
    ALTER COLUMN id SET DEFAULT public.uuid_generate_v7();

-- Every partition carries its own id default (verified live 2026-08-03);
-- flip each member of the partition tree so direct-partition INSERTs match.
DO $$
DECLARE
    part regclass;
BEGIN
    FOR part IN
        SELECT inhrelid::regclass
          FROM pg_inherits
         WHERE inhparent = 'audit_trail.audit_entry'::regclass
    LOOP
        EXECUTE format('ALTER TABLE %s ALTER COLUMN id SET DEFAULT public.uuid_generate_v7()', part);
    END LOOP;
END;
$$;

-- audit_field_change rows mint their ids DB-side too; same v7 policy.
ALTER TABLE audit_trail.audit_field_change
    ALTER COLUMN id SET DEFAULT public.uuid_generate_v7();
