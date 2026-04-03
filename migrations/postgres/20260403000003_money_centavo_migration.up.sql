-- Migration: money_centavo_migration (up)
-- Dialect: postgres
-- Date: 2026-04-03
-- Description: Convert all money fields from DOUBLE PRECISION / NUMERIC to BIGINT (centavo representation).
--   Existing values are multiplied by 100 and rounded to avoid float precision issues.
--   NULL values remain NULL. DEFAULT values are converted accordingly (e.g., DEFAULT 0 stays DEFAULT 0).
--
-- Pattern per column:
--   1. Add temp column (BIGINT)
--   2. Migrate data: ROUND(old * 100)::BIGINT
--   3. Drop old column
--   4. Rename temp column to original name
--   5. Re-apply NOT NULL / DEFAULT constraints

BEGIN;

-- ============================================================================
-- TREASURY: treasury_collection
-- ============================================================================

ALTER TABLE "treasury_collection" ADD COLUMN "amount_new" BIGINT;
UPDATE "treasury_collection" SET "amount_new" = ROUND("amount" * 100)::BIGINT WHERE "amount" IS NOT NULL;
ALTER TABLE "treasury_collection" DROP COLUMN "amount";
ALTER TABLE "treasury_collection" RENAME COLUMN "amount_new" TO "amount";
ALTER TABLE "treasury_collection" ALTER COLUMN "amount" SET NOT NULL;

-- ============================================================================
-- TREASURY: treasury_disbursement
-- ============================================================================

ALTER TABLE "treasury_disbursement" ADD COLUMN "amount_new" BIGINT;
UPDATE "treasury_disbursement" SET "amount_new" = ROUND("amount" * 100)::BIGINT WHERE "amount" IS NOT NULL;
ALTER TABLE "treasury_disbursement" DROP COLUMN "amount";
ALTER TABLE "treasury_disbursement" RENAME COLUMN "amount_new" TO "amount";
ALTER TABLE "treasury_disbursement" ALTER COLUMN "amount" SET NOT NULL;

-- ============================================================================
-- TREASURY: loan
-- ============================================================================

-- loan.principal_amount
ALTER TABLE "loan" ADD COLUMN "principal_amount_new" BIGINT;
UPDATE "loan" SET "principal_amount_new" = ROUND("principal_amount" * 100)::BIGINT WHERE "principal_amount" IS NOT NULL;
ALTER TABLE "loan" DROP COLUMN "principal_amount";
ALTER TABLE "loan" RENAME COLUMN "principal_amount_new" TO "principal_amount";
ALTER TABLE "loan" ALTER COLUMN "principal_amount" SET NOT NULL;

-- loan.remaining_balance
ALTER TABLE "loan" ADD COLUMN "remaining_balance_new" BIGINT;
UPDATE "loan" SET "remaining_balance_new" = ROUND("remaining_balance" * 100)::BIGINT WHERE "remaining_balance" IS NOT NULL;
ALTER TABLE "loan" DROP COLUMN "remaining_balance";
ALTER TABLE "loan" RENAME COLUMN "remaining_balance_new" TO "remaining_balance";
ALTER TABLE "loan" ALTER COLUMN "remaining_balance" SET NOT NULL;

-- ============================================================================
-- TREASURY: loan_payment
-- ============================================================================

-- loan_payment.principal_amount
ALTER TABLE "loan_payment" ADD COLUMN "principal_amount_new" BIGINT;
UPDATE "loan_payment" SET "principal_amount_new" = ROUND("principal_amount" * 100)::BIGINT WHERE "principal_amount" IS NOT NULL;
ALTER TABLE "loan_payment" DROP COLUMN "principal_amount";
ALTER TABLE "loan_payment" RENAME COLUMN "principal_amount_new" TO "principal_amount";
ALTER TABLE "loan_payment" ALTER COLUMN "principal_amount" SET NOT NULL;

-- loan_payment.interest_amount
ALTER TABLE "loan_payment" ADD COLUMN "interest_amount_new" BIGINT;
UPDATE "loan_payment" SET "interest_amount_new" = ROUND("interest_amount" * 100)::BIGINT WHERE "interest_amount" IS NOT NULL;
ALTER TABLE "loan_payment" DROP COLUMN "interest_amount";
ALTER TABLE "loan_payment" RENAME COLUMN "interest_amount_new" TO "interest_amount";
ALTER TABLE "loan_payment" ALTER COLUMN "interest_amount" SET NOT NULL;

-- loan_payment.fee_amount
ALTER TABLE "loan_payment" ADD COLUMN "fee_amount_new" BIGINT;
UPDATE "loan_payment" SET "fee_amount_new" = ROUND("fee_amount" * 100)::BIGINT WHERE "fee_amount" IS NOT NULL;
ALTER TABLE "loan_payment" DROP COLUMN "fee_amount";
ALTER TABLE "loan_payment" RENAME COLUMN "fee_amount_new" TO "fee_amount";
ALTER TABLE "loan_payment" ALTER COLUMN "fee_amount" SET NOT NULL;
ALTER TABLE "loan_payment" ALTER COLUMN "fee_amount" SET DEFAULT 0;

-- loan_payment.total_amount
ALTER TABLE "loan_payment" ADD COLUMN "total_amount_new" BIGINT;
UPDATE "loan_payment" SET "total_amount_new" = ROUND("total_amount" * 100)::BIGINT WHERE "total_amount" IS NOT NULL;
ALTER TABLE "loan_payment" DROP COLUMN "total_amount";
ALTER TABLE "loan_payment" RENAME COLUMN "total_amount_new" TO "total_amount";
ALTER TABLE "loan_payment" ALTER COLUMN "total_amount" SET NOT NULL;

-- loan_payment.remaining_balance
ALTER TABLE "loan_payment" ADD COLUMN "remaining_balance_new" BIGINT;
UPDATE "loan_payment" SET "remaining_balance_new" = ROUND("remaining_balance" * 100)::BIGINT WHERE "remaining_balance" IS NOT NULL;
ALTER TABLE "loan_payment" DROP COLUMN "remaining_balance";
ALTER TABLE "loan_payment" RENAME COLUMN "remaining_balance_new" TO "remaining_balance";
ALTER TABLE "loan_payment" ALTER COLUMN "remaining_balance" SET NOT NULL;

-- ============================================================================
-- TREASURY: petty_cash_fund
-- ============================================================================

-- petty_cash_fund.authorized_amount
ALTER TABLE "petty_cash_fund" ADD COLUMN "authorized_amount_new" BIGINT;
UPDATE "petty_cash_fund" SET "authorized_amount_new" = ROUND("authorized_amount" * 100)::BIGINT WHERE "authorized_amount" IS NOT NULL;
ALTER TABLE "petty_cash_fund" DROP COLUMN "authorized_amount";
ALTER TABLE "petty_cash_fund" RENAME COLUMN "authorized_amount_new" TO "authorized_amount";
ALTER TABLE "petty_cash_fund" ALTER COLUMN "authorized_amount" SET NOT NULL;

-- petty_cash_fund.current_balance
ALTER TABLE "petty_cash_fund" ADD COLUMN "current_balance_new" BIGINT;
UPDATE "petty_cash_fund" SET "current_balance_new" = ROUND("current_balance" * 100)::BIGINT WHERE "current_balance" IS NOT NULL;
ALTER TABLE "petty_cash_fund" DROP COLUMN "current_balance";
ALTER TABLE "petty_cash_fund" RENAME COLUMN "current_balance_new" TO "current_balance";
ALTER TABLE "petty_cash_fund" ALTER COLUMN "current_balance" SET NOT NULL;
ALTER TABLE "petty_cash_fund" ALTER COLUMN "current_balance" SET DEFAULT 0;

-- ============================================================================
-- TREASURY: petty_cash_replenishment
-- ============================================================================

ALTER TABLE "petty_cash_replenishment" ADD COLUMN "amount_new" BIGINT;
UPDATE "petty_cash_replenishment" SET "amount_new" = ROUND("amount" * 100)::BIGINT WHERE "amount" IS NOT NULL;
ALTER TABLE "petty_cash_replenishment" DROP COLUMN "amount";
ALTER TABLE "petty_cash_replenishment" RENAME COLUMN "amount_new" TO "amount";
ALTER TABLE "petty_cash_replenishment" ALTER COLUMN "amount" SET NOT NULL;

-- ============================================================================
-- TREASURY: petty_cash_voucher
-- ============================================================================

ALTER TABLE "petty_cash_voucher" ADD COLUMN "total_amount_new" BIGINT;
UPDATE "petty_cash_voucher" SET "total_amount_new" = ROUND("total_amount" * 100)::BIGINT WHERE "total_amount" IS NOT NULL;
ALTER TABLE "petty_cash_voucher" DROP COLUMN "total_amount";
ALTER TABLE "petty_cash_voucher" RENAME COLUMN "total_amount_new" TO "total_amount";
ALTER TABLE "petty_cash_voucher" ALTER COLUMN "total_amount" SET NOT NULL;

-- ============================================================================
-- TREASURY: security_deposit
-- ============================================================================

ALTER TABLE "security_deposit" ADD COLUMN "amount_new" BIGINT;
UPDATE "security_deposit" SET "amount_new" = ROUND("amount" * 100)::BIGINT WHERE "amount" IS NOT NULL;
ALTER TABLE "security_deposit" DROP COLUMN "amount";
ALTER TABLE "security_deposit" RENAME COLUMN "amount_new" TO "amount";
ALTER TABLE "security_deposit" ALTER COLUMN "amount" SET NOT NULL;

-- ============================================================================
-- LEDGER: journal_line
-- ============================================================================

-- journal_line.debit_amount
ALTER TABLE "journal_line" ADD COLUMN "debit_amount_new" BIGINT;
UPDATE "journal_line" SET "debit_amount_new" = ROUND("debit_amount" * 100)::BIGINT WHERE "debit_amount" IS NOT NULL;
-- Set 0 for any NULLs (column has DEFAULT 0 semantics)
UPDATE "journal_line" SET "debit_amount_new" = 0 WHERE "debit_amount" IS NULL;
ALTER TABLE "journal_line" DROP COLUMN "debit_amount";
ALTER TABLE "journal_line" RENAME COLUMN "debit_amount_new" TO "debit_amount";
ALTER TABLE "journal_line" ALTER COLUMN "debit_amount" SET NOT NULL;
ALTER TABLE "journal_line" ALTER COLUMN "debit_amount" SET DEFAULT 0;

-- journal_line.credit_amount
ALTER TABLE "journal_line" ADD COLUMN "credit_amount_new" BIGINT;
UPDATE "journal_line" SET "credit_amount_new" = ROUND("credit_amount" * 100)::BIGINT WHERE "credit_amount" IS NOT NULL;
UPDATE "journal_line" SET "credit_amount_new" = 0 WHERE "credit_amount" IS NULL;
ALTER TABLE "journal_line" DROP COLUMN "credit_amount";
ALTER TABLE "journal_line" RENAME COLUMN "credit_amount_new" TO "credit_amount";
ALTER TABLE "journal_line" ALTER COLUMN "credit_amount" SET NOT NULL;
ALTER TABLE "journal_line" ALTER COLUMN "credit_amount" SET DEFAULT 0;

-- ============================================================================
-- LEDGER: journal_entry
-- ============================================================================

-- journal_entry.total_debit
ALTER TABLE "journal_entry" ADD COLUMN "total_debit_new" BIGINT;
UPDATE "journal_entry" SET "total_debit_new" = ROUND("total_debit" * 100)::BIGINT WHERE "total_debit" IS NOT NULL;
ALTER TABLE "journal_entry" DROP COLUMN "total_debit";
ALTER TABLE "journal_entry" RENAME COLUMN "total_debit_new" TO "total_debit";
ALTER TABLE "journal_entry" ALTER COLUMN "total_debit" SET NOT NULL;

-- journal_entry.total_credit
ALTER TABLE "journal_entry" ADD COLUMN "total_credit_new" BIGINT;
UPDATE "journal_entry" SET "total_credit_new" = ROUND("total_credit" * 100)::BIGINT WHERE "total_credit" IS NOT NULL;
ALTER TABLE "journal_entry" DROP COLUMN "total_credit";
ALTER TABLE "journal_entry" RENAME COLUMN "total_credit_new" TO "total_credit";
ALTER TABLE "journal_entry" ALTER COLUMN "total_credit" SET NOT NULL;

-- ============================================================================
-- LEDGER: equity_account
-- ============================================================================

ALTER TABLE "equity_account" ADD COLUMN "balance_new" BIGINT;
UPDATE "equity_account" SET "balance_new" = ROUND("balance" * 100)::BIGINT WHERE "balance" IS NOT NULL;
UPDATE "equity_account" SET "balance_new" = 0 WHERE "balance" IS NULL;
ALTER TABLE "equity_account" DROP COLUMN "balance";
ALTER TABLE "equity_account" RENAME COLUMN "balance_new" TO "balance";
ALTER TABLE "equity_account" ALTER COLUMN "balance" SET NOT NULL;
ALTER TABLE "equity_account" ALTER COLUMN "balance" SET DEFAULT 0;

-- ============================================================================
-- LEDGER: equity_transaction
-- ============================================================================

ALTER TABLE "equity_transaction" ADD COLUMN "amount_new" BIGINT;
UPDATE "equity_transaction" SET "amount_new" = ROUND("amount" * 100)::BIGINT WHERE "amount" IS NOT NULL;
ALTER TABLE "equity_transaction" DROP COLUMN "amount";
ALTER TABLE "equity_transaction" RENAME COLUMN "amount_new" TO "amount";
ALTER TABLE "equity_transaction" ALTER COLUMN "amount" SET NOT NULL;

-- ============================================================================
-- ASSET: asset
-- ============================================================================

-- asset.acquisition_cost
ALTER TABLE "asset" ADD COLUMN "acquisition_cost_new" BIGINT;
UPDATE "asset" SET "acquisition_cost_new" = ROUND("acquisition_cost" * 100)::BIGINT WHERE "acquisition_cost" IS NOT NULL;
ALTER TABLE "asset" DROP COLUMN "acquisition_cost";
ALTER TABLE "asset" RENAME COLUMN "acquisition_cost_new" TO "acquisition_cost";
ALTER TABLE "asset" ALTER COLUMN "acquisition_cost" SET NOT NULL;

-- asset.salvage_value
ALTER TABLE "asset" ADD COLUMN "salvage_value_new" BIGINT;
UPDATE "asset" SET "salvage_value_new" = ROUND("salvage_value" * 100)::BIGINT WHERE "salvage_value" IS NOT NULL;
ALTER TABLE "asset" DROP COLUMN "salvage_value";
ALTER TABLE "asset" RENAME COLUMN "salvage_value_new" TO "salvage_value";
ALTER TABLE "asset" ALTER COLUMN "salvage_value" SET NOT NULL;

-- asset.book_value
ALTER TABLE "asset" ADD COLUMN "book_value_new" BIGINT;
UPDATE "asset" SET "book_value_new" = ROUND("book_value" * 100)::BIGINT WHERE "book_value" IS NOT NULL;
UPDATE "asset" SET "book_value_new" = 0 WHERE "book_value" IS NULL;
ALTER TABLE "asset" DROP COLUMN "book_value";
ALTER TABLE "asset" RENAME COLUMN "book_value_new" TO "book_value";
ALTER TABLE "asset" ALTER COLUMN "book_value" SET NOT NULL;
ALTER TABLE "asset" ALTER COLUMN "book_value" SET DEFAULT 0;

-- asset.fair_value (NULLable, no DEFAULT)
ALTER TABLE "asset" ADD COLUMN "fair_value_new" BIGINT;
UPDATE "asset" SET "fair_value_new" = ROUND("fair_value" * 100)::BIGINT WHERE "fair_value" IS NOT NULL;
ALTER TABLE "asset" DROP COLUMN "fair_value";
ALTER TABLE "asset" RENAME COLUMN "fair_value_new" TO "fair_value";

-- asset.accumulated_depreciation
ALTER TABLE "asset" ADD COLUMN "accumulated_depreciation_new" BIGINT;
UPDATE "asset" SET "accumulated_depreciation_new" = ROUND("accumulated_depreciation" * 100)::BIGINT WHERE "accumulated_depreciation" IS NOT NULL;
UPDATE "asset" SET "accumulated_depreciation_new" = 0 WHERE "accumulated_depreciation" IS NULL;
ALTER TABLE "asset" DROP COLUMN "accumulated_depreciation";
ALTER TABLE "asset" RENAME COLUMN "accumulated_depreciation_new" TO "accumulated_depreciation";
ALTER TABLE "asset" ALTER COLUMN "accumulated_depreciation" SET NOT NULL;
ALTER TABLE "asset" ALTER COLUMN "accumulated_depreciation" SET DEFAULT 0;

-- ============================================================================
-- ASSET: depreciation_schedule
-- ============================================================================

-- depreciation_schedule.opening_book_value
ALTER TABLE "depreciation_schedule" ADD COLUMN "opening_book_value_new" BIGINT;
UPDATE "depreciation_schedule" SET "opening_book_value_new" = ROUND("opening_book_value" * 100)::BIGINT WHERE "opening_book_value" IS NOT NULL;
ALTER TABLE "depreciation_schedule" DROP COLUMN "opening_book_value";
ALTER TABLE "depreciation_schedule" RENAME COLUMN "opening_book_value_new" TO "opening_book_value";
ALTER TABLE "depreciation_schedule" ALTER COLUMN "opening_book_value" SET NOT NULL;

-- depreciation_schedule.depreciation_amount
ALTER TABLE "depreciation_schedule" ADD COLUMN "depreciation_amount_new" BIGINT;
UPDATE "depreciation_schedule" SET "depreciation_amount_new" = ROUND("depreciation_amount" * 100)::BIGINT WHERE "depreciation_amount" IS NOT NULL;
ALTER TABLE "depreciation_schedule" DROP COLUMN "depreciation_amount";
ALTER TABLE "depreciation_schedule" RENAME COLUMN "depreciation_amount_new" TO "depreciation_amount";
ALTER TABLE "depreciation_schedule" ALTER COLUMN "depreciation_amount" SET NOT NULL;

-- depreciation_schedule.accumulated_depreciation
ALTER TABLE "depreciation_schedule" ADD COLUMN "accumulated_depreciation_new" BIGINT;
UPDATE "depreciation_schedule" SET "accumulated_depreciation_new" = ROUND("accumulated_depreciation" * 100)::BIGINT WHERE "accumulated_depreciation" IS NOT NULL;
ALTER TABLE "depreciation_schedule" DROP COLUMN "accumulated_depreciation";
ALTER TABLE "depreciation_schedule" RENAME COLUMN "accumulated_depreciation_new" TO "accumulated_depreciation";
ALTER TABLE "depreciation_schedule" ALTER COLUMN "accumulated_depreciation" SET NOT NULL;

-- depreciation_schedule.closing_book_value
ALTER TABLE "depreciation_schedule" ADD COLUMN "closing_book_value_new" BIGINT;
UPDATE "depreciation_schedule" SET "closing_book_value_new" = ROUND("closing_book_value" * 100)::BIGINT WHERE "closing_book_value" IS NOT NULL;
ALTER TABLE "depreciation_schedule" DROP COLUMN "closing_book_value";
ALTER TABLE "depreciation_schedule" RENAME COLUMN "closing_book_value_new" TO "closing_book_value";
ALTER TABLE "depreciation_schedule" ALTER COLUMN "closing_book_value" SET NOT NULL;

-- ============================================================================
-- ASSET: asset_disposal
-- ============================================================================

-- asset_disposal.proceeds
ALTER TABLE "asset_disposal" ADD COLUMN "proceeds_new" BIGINT;
UPDATE "asset_disposal" SET "proceeds_new" = ROUND("proceeds" * 100)::BIGINT WHERE "proceeds" IS NOT NULL;
ALTER TABLE "asset_disposal" DROP COLUMN "proceeds";
ALTER TABLE "asset_disposal" RENAME COLUMN "proceeds_new" TO "proceeds";
ALTER TABLE "asset_disposal" ALTER COLUMN "proceeds" SET NOT NULL;

-- asset_disposal.cost_at_disposal
ALTER TABLE "asset_disposal" ADD COLUMN "cost_at_disposal_new" BIGINT;
UPDATE "asset_disposal" SET "cost_at_disposal_new" = ROUND("cost_at_disposal" * 100)::BIGINT WHERE "cost_at_disposal" IS NOT NULL;
ALTER TABLE "asset_disposal" DROP COLUMN "cost_at_disposal";
ALTER TABLE "asset_disposal" RENAME COLUMN "cost_at_disposal_new" TO "cost_at_disposal";
ALTER TABLE "asset_disposal" ALTER COLUMN "cost_at_disposal" SET NOT NULL;

-- asset_disposal.accumulated_depreciation_at_disposal
ALTER TABLE "asset_disposal" ADD COLUMN "accumulated_depreciation_at_disposal_new" BIGINT;
UPDATE "asset_disposal" SET "accumulated_depreciation_at_disposal_new" = ROUND("accumulated_depreciation_at_disposal" * 100)::BIGINT WHERE "accumulated_depreciation_at_disposal" IS NOT NULL;
ALTER TABLE "asset_disposal" DROP COLUMN "accumulated_depreciation_at_disposal";
ALTER TABLE "asset_disposal" RENAME COLUMN "accumulated_depreciation_at_disposal_new" TO "accumulated_depreciation_at_disposal";
ALTER TABLE "asset_disposal" ALTER COLUMN "accumulated_depreciation_at_disposal" SET NOT NULL;

-- asset_disposal.book_value_at_disposal
ALTER TABLE "asset_disposal" ADD COLUMN "book_value_at_disposal_new" BIGINT;
UPDATE "asset_disposal" SET "book_value_at_disposal_new" = ROUND("book_value_at_disposal" * 100)::BIGINT WHERE "book_value_at_disposal" IS NOT NULL;
ALTER TABLE "asset_disposal" DROP COLUMN "book_value_at_disposal";
ALTER TABLE "asset_disposal" RENAME COLUMN "book_value_at_disposal_new" TO "book_value_at_disposal";
ALTER TABLE "asset_disposal" ALTER COLUMN "book_value_at_disposal" SET NOT NULL;

-- asset_disposal.gain_or_loss
ALTER TABLE "asset_disposal" ADD COLUMN "gain_or_loss_new" BIGINT;
UPDATE "asset_disposal" SET "gain_or_loss_new" = ROUND("gain_or_loss" * 100)::BIGINT WHERE "gain_or_loss" IS NOT NULL;
ALTER TABLE "asset_disposal" DROP COLUMN "gain_or_loss";
ALTER TABLE "asset_disposal" RENAME COLUMN "gain_or_loss_new" TO "gain_or_loss";
ALTER TABLE "asset_disposal" ALTER COLUMN "gain_or_loss" SET NOT NULL;

-- ============================================================================
-- ASSET: asset_revaluation
-- ============================================================================

-- asset_revaluation.previous_carrying_amount
ALTER TABLE "asset_revaluation" ADD COLUMN "previous_carrying_amount_new" BIGINT;
UPDATE "asset_revaluation" SET "previous_carrying_amount_new" = ROUND("previous_carrying_amount" * 100)::BIGINT WHERE "previous_carrying_amount" IS NOT NULL;
ALTER TABLE "asset_revaluation" DROP COLUMN "previous_carrying_amount";
ALTER TABLE "asset_revaluation" RENAME COLUMN "previous_carrying_amount_new" TO "previous_carrying_amount";
ALTER TABLE "asset_revaluation" ALTER COLUMN "previous_carrying_amount" SET NOT NULL;

-- asset_revaluation.new_fair_value
ALTER TABLE "asset_revaluation" ADD COLUMN "new_fair_value_new" BIGINT;
UPDATE "asset_revaluation" SET "new_fair_value_new" = ROUND("new_fair_value" * 100)::BIGINT WHERE "new_fair_value" IS NOT NULL;
ALTER TABLE "asset_revaluation" DROP COLUMN "new_fair_value";
ALTER TABLE "asset_revaluation" RENAME COLUMN "new_fair_value_new" TO "new_fair_value";
ALTER TABLE "asset_revaluation" ALTER COLUMN "new_fair_value" SET NOT NULL;

-- asset_revaluation.revaluation_amount
ALTER TABLE "asset_revaluation" ADD COLUMN "revaluation_amount_new" BIGINT;
UPDATE "asset_revaluation" SET "revaluation_amount_new" = ROUND("revaluation_amount" * 100)::BIGINT WHERE "revaluation_amount" IS NOT NULL;
ALTER TABLE "asset_revaluation" DROP COLUMN "revaluation_amount";
ALTER TABLE "asset_revaluation" RENAME COLUMN "revaluation_amount_new" TO "revaluation_amount";
ALTER TABLE "asset_revaluation" ALTER COLUMN "revaluation_amount" SET NOT NULL;

-- asset_revaluation.recognized_in_pnl
ALTER TABLE "asset_revaluation" ADD COLUMN "recognized_in_pnl_new" BIGINT;
UPDATE "asset_revaluation" SET "recognized_in_pnl_new" = ROUND("recognized_in_pnl" * 100)::BIGINT WHERE "recognized_in_pnl" IS NOT NULL;
ALTER TABLE "asset_revaluation" DROP COLUMN "recognized_in_pnl";
ALTER TABLE "asset_revaluation" RENAME COLUMN "recognized_in_pnl_new" TO "recognized_in_pnl";
ALTER TABLE "asset_revaluation" ALTER COLUMN "recognized_in_pnl" SET NOT NULL;

-- asset_revaluation.recognized_in_oci
ALTER TABLE "asset_revaluation" ADD COLUMN "recognized_in_oci_new" BIGINT;
UPDATE "asset_revaluation" SET "recognized_in_oci_new" = ROUND("recognized_in_oci" * 100)::BIGINT WHERE "recognized_in_oci" IS NOT NULL;
ALTER TABLE "asset_revaluation" DROP COLUMN "recognized_in_oci";
ALTER TABLE "asset_revaluation" RENAME COLUMN "recognized_in_oci_new" TO "recognized_in_oci";
ALTER TABLE "asset_revaluation" ALTER COLUMN "recognized_in_oci" SET NOT NULL;

-- asset_revaluation.revaluation_surplus_balance
ALTER TABLE "asset_revaluation" ADD COLUMN "revaluation_surplus_balance_new" BIGINT;
UPDATE "asset_revaluation" SET "revaluation_surplus_balance_new" = ROUND("revaluation_surplus_balance" * 100)::BIGINT WHERE "revaluation_surplus_balance" IS NOT NULL;
ALTER TABLE "asset_revaluation" DROP COLUMN "revaluation_surplus_balance";
ALTER TABLE "asset_revaluation" RENAME COLUMN "revaluation_surplus_balance_new" TO "revaluation_surplus_balance";
ALTER TABLE "asset_revaluation" ALTER COLUMN "revaluation_surplus_balance" SET NOT NULL;

-- ============================================================================
-- ASSET: asset_component
-- ============================================================================

-- asset_component.cost
ALTER TABLE "asset_component" ADD COLUMN "cost_new" BIGINT;
UPDATE "asset_component" SET "cost_new" = ROUND("cost" * 100)::BIGINT WHERE "cost" IS NOT NULL;
ALTER TABLE "asset_component" DROP COLUMN "cost";
ALTER TABLE "asset_component" RENAME COLUMN "cost_new" TO "cost";
ALTER TABLE "asset_component" ALTER COLUMN "cost" SET NOT NULL;

-- asset_component.salvage_value
ALTER TABLE "asset_component" ADD COLUMN "salvage_value_new" BIGINT;
UPDATE "asset_component" SET "salvage_value_new" = ROUND("salvage_value" * 100)::BIGINT WHERE "salvage_value" IS NOT NULL;
ALTER TABLE "asset_component" DROP COLUMN "salvage_value";
ALTER TABLE "asset_component" RENAME COLUMN "salvage_value_new" TO "salvage_value";
ALTER TABLE "asset_component" ALTER COLUMN "salvage_value" SET NOT NULL;

-- asset_component.accumulated_depreciation
ALTER TABLE "asset_component" ADD COLUMN "accumulated_depreciation_new" BIGINT;
UPDATE "asset_component" SET "accumulated_depreciation_new" = ROUND("accumulated_depreciation" * 100)::BIGINT WHERE "accumulated_depreciation" IS NOT NULL;
ALTER TABLE "asset_component" DROP COLUMN "accumulated_depreciation";
ALTER TABLE "asset_component" RENAME COLUMN "accumulated_depreciation_new" TO "accumulated_depreciation";
ALTER TABLE "asset_component" ALTER COLUMN "accumulated_depreciation" SET NOT NULL;

-- asset_component.book_value
ALTER TABLE "asset_component" ADD COLUMN "book_value_new" BIGINT;
UPDATE "asset_component" SET "book_value_new" = ROUND("book_value" * 100)::BIGINT WHERE "book_value" IS NOT NULL;
ALTER TABLE "asset_component" DROP COLUMN "book_value";
ALTER TABLE "asset_component" RENAME COLUMN "book_value_new" TO "book_value";
ALTER TABLE "asset_component" ALTER COLUMN "book_value" SET NOT NULL;

-- ============================================================================
-- ASSET: asset_transaction
-- ============================================================================

ALTER TABLE "asset_transaction" ADD COLUMN "amount_new" BIGINT;
UPDATE "asset_transaction" SET "amount_new" = ROUND("amount" * 100)::BIGINT WHERE "amount" IS NOT NULL;
ALTER TABLE "asset_transaction" DROP COLUMN "amount";
ALTER TABLE "asset_transaction" RENAME COLUMN "amount_new" TO "amount";
ALTER TABLE "asset_transaction" ALTER COLUMN "amount" SET NOT NULL;

-- ============================================================================
-- ASSET: asset_maintenance
-- ============================================================================

-- asset_maintenance.cost (NULLable)
ALTER TABLE "asset_maintenance" ADD COLUMN "cost_new" BIGINT;
UPDATE "asset_maintenance" SET "cost_new" = ROUND("cost" * 100)::BIGINT WHERE "cost" IS NOT NULL;
ALTER TABLE "asset_maintenance" DROP COLUMN "cost";
ALTER TABLE "asset_maintenance" RENAME COLUMN "cost_new" TO "cost";

-- ============================================================================
-- INVENTORY: inventory_depreciation
-- ============================================================================

-- inventory_depreciation.cost_basis
ALTER TABLE "inventory_depreciation" ADD COLUMN "cost_basis_new" BIGINT;
UPDATE "inventory_depreciation" SET "cost_basis_new" = ROUND("cost_basis" * 100)::BIGINT WHERE "cost_basis" IS NOT NULL;
ALTER TABLE "inventory_depreciation" DROP COLUMN "cost_basis";
ALTER TABLE "inventory_depreciation" RENAME COLUMN "cost_basis_new" TO "cost_basis";
ALTER TABLE "inventory_depreciation" ALTER COLUMN "cost_basis" SET NOT NULL;

-- inventory_depreciation.salvage_value
ALTER TABLE "inventory_depreciation" ADD COLUMN "salvage_value_new" BIGINT;
UPDATE "inventory_depreciation" SET "salvage_value_new" = ROUND("salvage_value" * 100)::BIGINT WHERE "salvage_value" IS NOT NULL;
ALTER TABLE "inventory_depreciation" DROP COLUMN "salvage_value";
ALTER TABLE "inventory_depreciation" RENAME COLUMN "salvage_value_new" TO "salvage_value";
ALTER TABLE "inventory_depreciation" ALTER COLUMN "salvage_value" SET NOT NULL;

-- inventory_depreciation.accumulated_depreciation
ALTER TABLE "inventory_depreciation" ADD COLUMN "accumulated_depreciation_new" BIGINT;
UPDATE "inventory_depreciation" SET "accumulated_depreciation_new" = ROUND("accumulated_depreciation" * 100)::BIGINT WHERE "accumulated_depreciation" IS NOT NULL;
ALTER TABLE "inventory_depreciation" DROP COLUMN "accumulated_depreciation";
ALTER TABLE "inventory_depreciation" RENAME COLUMN "accumulated_depreciation_new" TO "accumulated_depreciation";
ALTER TABLE "inventory_depreciation" ALTER COLUMN "accumulated_depreciation" SET NOT NULL;

-- inventory_depreciation.book_value
ALTER TABLE "inventory_depreciation" ADD COLUMN "book_value_new" BIGINT;
UPDATE "inventory_depreciation" SET "book_value_new" = ROUND("book_value" * 100)::BIGINT WHERE "book_value" IS NOT NULL;
ALTER TABLE "inventory_depreciation" DROP COLUMN "book_value";
ALTER TABLE "inventory_depreciation" RENAME COLUMN "book_value_new" TO "book_value";
ALTER TABLE "inventory_depreciation" ALTER COLUMN "book_value" SET NOT NULL;

-- ============================================================================
-- INVENTORY: inventory_movement
-- ============================================================================

ALTER TABLE "inventory_movement" ADD COLUMN "unit_cost_new" BIGINT;
UPDATE "inventory_movement" SET "unit_cost_new" = ROUND("unit_cost" * 100)::BIGINT WHERE "unit_cost" IS NOT NULL;
ALTER TABLE "inventory_movement" DROP COLUMN "unit_cost";
ALTER TABLE "inventory_movement" RENAME COLUMN "unit_cost_new" TO "unit_cost";
ALTER TABLE "inventory_movement" ALTER COLUMN "unit_cost" SET NOT NULL;

-- ============================================================================
-- PRODUCTS/SUBSCRIPTIONS: product
-- ============================================================================

ALTER TABLE "product" ADD COLUMN "price_new" BIGINT;
UPDATE "product" SET "price_new" = ROUND("price" * 100)::BIGINT WHERE "price" IS NOT NULL;
ALTER TABLE "product" DROP COLUMN "price";
ALTER TABLE "product" RENAME COLUMN "price_new" TO "price";
ALTER TABLE "product" ALTER COLUMN "price" SET NOT NULL;

-- ============================================================================
-- PRODUCTS/SUBSCRIPTIONS: product_variant
-- ============================================================================

ALTER TABLE "product_variant" ADD COLUMN "price_override_new" BIGINT;
UPDATE "product_variant" SET "price_override_new" = ROUND("price_override" * 100)::BIGINT WHERE "price_override" IS NOT NULL;
ALTER TABLE "product_variant" DROP COLUMN "price_override";
ALTER TABLE "product_variant" RENAME COLUMN "price_override_new" TO "price_override";
ALTER TABLE "product_variant" ALTER COLUMN "price_override" SET NOT NULL;

-- ============================================================================
-- PRODUCTS/SUBSCRIPTIONS: product_plan
-- ============================================================================

ALTER TABLE "product_plan" ADD COLUMN "price_new" BIGINT;
UPDATE "product_plan" SET "price_new" = ROUND("price" * 100)::BIGINT WHERE "price" IS NOT NULL;
ALTER TABLE "product_plan" DROP COLUMN "price";
ALTER TABLE "product_plan" RENAME COLUMN "price_new" TO "price";
ALTER TABLE "product_plan" ALTER COLUMN "price" SET NOT NULL;

-- ============================================================================
-- PRODUCTS/SUBSCRIPTIONS: balance
-- ============================================================================

ALTER TABLE "balance" ADD COLUMN "amount_new" BIGINT;
UPDATE "balance" SET "amount_new" = ROUND("amount" * 100)::BIGINT WHERE "amount" IS NOT NULL;
ALTER TABLE "balance" DROP COLUMN "amount";
ALTER TABLE "balance" RENAME COLUMN "amount_new" TO "amount";
ALTER TABLE "balance" ALTER COLUMN "amount" SET NOT NULL;

-- ============================================================================
-- PRODUCTS/SUBSCRIPTIONS: invoice
-- ============================================================================

ALTER TABLE "invoice" ADD COLUMN "amount_new" BIGINT;
UPDATE "invoice" SET "amount_new" = ROUND("amount" * 100)::BIGINT WHERE "amount" IS NOT NULL;
ALTER TABLE "invoice" DROP COLUMN "amount";
ALTER TABLE "invoice" RENAME COLUMN "amount_new" TO "amount";
ALTER TABLE "invoice" ALTER COLUMN "amount" SET NOT NULL;

-- ============================================================================
-- PRODUCTS/SUBSCRIPTIONS: price_plan
-- ============================================================================

ALTER TABLE "price_plan" ADD COLUMN "amount_new" BIGINT;
UPDATE "price_plan" SET "amount_new" = ROUND("amount" * 100)::BIGINT WHERE "amount" IS NOT NULL;
ALTER TABLE "price_plan" DROP COLUMN "amount";
ALTER TABLE "price_plan" RENAME COLUMN "amount_new" TO "amount";
ALTER TABLE "price_plan" ALTER COLUMN "amount" SET NOT NULL;

-- ============================================================================
-- PRODUCTS/SUBSCRIPTIONS: product_price_plan
-- ============================================================================

ALTER TABLE "product_price_plan" ADD COLUMN "price_new" BIGINT;
UPDATE "product_price_plan" SET "price_new" = ROUND("price" * 100)::BIGINT WHERE "price" IS NOT NULL;
ALTER TABLE "product_price_plan" DROP COLUMN "price";
ALTER TABLE "product_price_plan" RENAME COLUMN "price_new" TO "price";
ALTER TABLE "product_price_plan" ALTER COLUMN "price" SET NOT NULL;
ALTER TABLE "product_price_plan" ALTER COLUMN "price" SET DEFAULT 0;

-- ============================================================================
-- REVENUE/EXPENDITURE: revenue
-- ============================================================================

ALTER TABLE "revenue" ADD COLUMN "total_amount_new" BIGINT;
UPDATE "revenue" SET "total_amount_new" = ROUND("total_amount" * 100)::BIGINT WHERE "total_amount" IS NOT NULL;
UPDATE "revenue" SET "total_amount_new" = 0 WHERE "total_amount" IS NULL;
ALTER TABLE "revenue" DROP COLUMN "total_amount";
ALTER TABLE "revenue" RENAME COLUMN "total_amount_new" TO "total_amount";
ALTER TABLE "revenue" ALTER COLUMN "total_amount" SET NOT NULL;
ALTER TABLE "revenue" ALTER COLUMN "total_amount" SET DEFAULT 0;

-- ============================================================================
-- REVENUE/EXPENDITURE: revenue_line_item
-- ============================================================================

-- revenue_line_item.unit_price
ALTER TABLE "revenue_line_item" ADD COLUMN "unit_price_new" BIGINT;
UPDATE "revenue_line_item" SET "unit_price_new" = ROUND("unit_price" * 100)::BIGINT WHERE "unit_price" IS NOT NULL;
UPDATE "revenue_line_item" SET "unit_price_new" = 0 WHERE "unit_price" IS NULL;
ALTER TABLE "revenue_line_item" DROP COLUMN "unit_price";
ALTER TABLE "revenue_line_item" RENAME COLUMN "unit_price_new" TO "unit_price";
ALTER TABLE "revenue_line_item" ALTER COLUMN "unit_price" SET NOT NULL;
ALTER TABLE "revenue_line_item" ALTER COLUMN "unit_price" SET DEFAULT 0;

-- revenue_line_item.total_price
ALTER TABLE "revenue_line_item" ADD COLUMN "total_price_new" BIGINT;
UPDATE "revenue_line_item" SET "total_price_new" = ROUND("total_price" * 100)::BIGINT WHERE "total_price" IS NOT NULL;
UPDATE "revenue_line_item" SET "total_price_new" = 0 WHERE "total_price" IS NULL;
ALTER TABLE "revenue_line_item" DROP COLUMN "total_price";
ALTER TABLE "revenue_line_item" RENAME COLUMN "total_price_new" TO "total_price";
ALTER TABLE "revenue_line_item" ALTER COLUMN "total_price" SET NOT NULL;
ALTER TABLE "revenue_line_item" ALTER COLUMN "total_price" SET DEFAULT 0;

-- revenue_line_item.cost_price (NULLable)
ALTER TABLE "revenue_line_item" ADD COLUMN "cost_price_new" BIGINT;
UPDATE "revenue_line_item" SET "cost_price_new" = ROUND("cost_price" * 100)::BIGINT WHERE "cost_price" IS NOT NULL;
ALTER TABLE "revenue_line_item" DROP COLUMN "cost_price";
ALTER TABLE "revenue_line_item" RENAME COLUMN "cost_price_new" TO "cost_price";

-- revenue_line_item.line_amount
ALTER TABLE "revenue_line_item" ADD COLUMN "line_amount_new" BIGINT;
UPDATE "revenue_line_item" SET "line_amount_new" = ROUND("line_amount" * 100)::BIGINT WHERE "line_amount" IS NOT NULL;
UPDATE "revenue_line_item" SET "line_amount_new" = 0 WHERE "line_amount" IS NULL;
ALTER TABLE "revenue_line_item" DROP COLUMN "line_amount";
ALTER TABLE "revenue_line_item" RENAME COLUMN "line_amount_new" TO "line_amount";
ALTER TABLE "revenue_line_item" ALTER COLUMN "line_amount" SET NOT NULL;
ALTER TABLE "revenue_line_item" ALTER COLUMN "line_amount" SET DEFAULT 0;

-- ============================================================================
-- REVENUE/EXPENDITURE: deferred_revenue
-- ============================================================================

-- deferred_revenue.total_amount
ALTER TABLE "deferred_revenue" ADD COLUMN "total_amount_new" BIGINT;
UPDATE "deferred_revenue" SET "total_amount_new" = ROUND("total_amount" * 100)::BIGINT WHERE "total_amount" IS NOT NULL;
ALTER TABLE "deferred_revenue" DROP COLUMN "total_amount";
ALTER TABLE "deferred_revenue" RENAME COLUMN "total_amount_new" TO "total_amount";
ALTER TABLE "deferred_revenue" ALTER COLUMN "total_amount" SET NOT NULL;

-- deferred_revenue.recognized_amount
ALTER TABLE "deferred_revenue" ADD COLUMN "recognized_amount_new" BIGINT;
UPDATE "deferred_revenue" SET "recognized_amount_new" = ROUND("recognized_amount" * 100)::BIGINT WHERE "recognized_amount" IS NOT NULL;
UPDATE "deferred_revenue" SET "recognized_amount_new" = 0 WHERE "recognized_amount" IS NULL;
ALTER TABLE "deferred_revenue" DROP COLUMN "recognized_amount";
ALTER TABLE "deferred_revenue" RENAME COLUMN "recognized_amount_new" TO "recognized_amount";
ALTER TABLE "deferred_revenue" ALTER COLUMN "recognized_amount" SET NOT NULL;
ALTER TABLE "deferred_revenue" ALTER COLUMN "recognized_amount" SET DEFAULT 0;

-- deferred_revenue.remaining_amount
ALTER TABLE "deferred_revenue" ADD COLUMN "remaining_amount_new" BIGINT;
UPDATE "deferred_revenue" SET "remaining_amount_new" = ROUND("remaining_amount" * 100)::BIGINT WHERE "remaining_amount" IS NOT NULL;
ALTER TABLE "deferred_revenue" DROP COLUMN "remaining_amount";
ALTER TABLE "deferred_revenue" RENAME COLUMN "remaining_amount_new" TO "remaining_amount";
ALTER TABLE "deferred_revenue" ALTER COLUMN "remaining_amount" SET NOT NULL;

-- ============================================================================
-- REVENUE/EXPENDITURE: expenditure
-- ============================================================================

ALTER TABLE "expenditure" ADD COLUMN "total_amount_new" BIGINT;
UPDATE "expenditure" SET "total_amount_new" = ROUND("total_amount" * 100)::BIGINT WHERE "total_amount" IS NOT NULL;
UPDATE "expenditure" SET "total_amount_new" = 0 WHERE "total_amount" IS NULL;
ALTER TABLE "expenditure" DROP COLUMN "total_amount";
ALTER TABLE "expenditure" RENAME COLUMN "total_amount_new" TO "total_amount";
ALTER TABLE "expenditure" ALTER COLUMN "total_amount" SET NOT NULL;
ALTER TABLE "expenditure" ALTER COLUMN "total_amount" SET DEFAULT 0;

-- ============================================================================
-- REVENUE/EXPENDITURE: purchase_order
-- ============================================================================

-- purchase_order.subtotal
ALTER TABLE "purchase_order" ADD COLUMN "subtotal_new" BIGINT;
UPDATE "purchase_order" SET "subtotal_new" = ROUND("subtotal" * 100)::BIGINT WHERE "subtotal" IS NOT NULL;
ALTER TABLE "purchase_order" DROP COLUMN "subtotal";
ALTER TABLE "purchase_order" RENAME COLUMN "subtotal_new" TO "subtotal";
ALTER TABLE "purchase_order" ALTER COLUMN "subtotal" SET NOT NULL;

-- purchase_order.tax_amount
ALTER TABLE "purchase_order" ADD COLUMN "tax_amount_new" BIGINT;
UPDATE "purchase_order" SET "tax_amount_new" = ROUND("tax_amount" * 100)::BIGINT WHERE "tax_amount" IS NOT NULL;
ALTER TABLE "purchase_order" DROP COLUMN "tax_amount";
ALTER TABLE "purchase_order" RENAME COLUMN "tax_amount_new" TO "tax_amount";
ALTER TABLE "purchase_order" ALTER COLUMN "tax_amount" SET NOT NULL;

-- purchase_order.total_amount
ALTER TABLE "purchase_order" ADD COLUMN "total_amount_new" BIGINT;
UPDATE "purchase_order" SET "total_amount_new" = ROUND("total_amount" * 100)::BIGINT WHERE "total_amount" IS NOT NULL;
ALTER TABLE "purchase_order" DROP COLUMN "total_amount";
ALTER TABLE "purchase_order" RENAME COLUMN "total_amount_new" TO "total_amount";
ALTER TABLE "purchase_order" ALTER COLUMN "total_amount" SET NOT NULL;

-- ============================================================================
-- REVENUE/EXPENDITURE: purchase_order_line_item
-- ============================================================================

-- purchase_order_line_item.unit_price
ALTER TABLE "purchase_order_line_item" ADD COLUMN "unit_price_new" BIGINT;
UPDATE "purchase_order_line_item" SET "unit_price_new" = ROUND("unit_price" * 100)::BIGINT WHERE "unit_price" IS NOT NULL;
ALTER TABLE "purchase_order_line_item" DROP COLUMN "unit_price";
ALTER TABLE "purchase_order_line_item" RENAME COLUMN "unit_price_new" TO "unit_price";
ALTER TABLE "purchase_order_line_item" ALTER COLUMN "unit_price" SET NOT NULL;

-- purchase_order_line_item.total_price
ALTER TABLE "purchase_order_line_item" ADD COLUMN "total_price_new" BIGINT;
UPDATE "purchase_order_line_item" SET "total_price_new" = ROUND("total_price" * 100)::BIGINT WHERE "total_price" IS NOT NULL;
ALTER TABLE "purchase_order_line_item" DROP COLUMN "total_price";
ALTER TABLE "purchase_order_line_item" RENAME COLUMN "total_price_new" TO "total_price";
ALTER TABLE "purchase_order_line_item" ALTER COLUMN "total_price" SET NOT NULL;

-- ============================================================================
-- REVENUE/EXPENDITURE: expenditure_line_item
-- ============================================================================

-- expenditure_line_item.unit_price
ALTER TABLE "expenditure_line_item" ADD COLUMN "unit_price_new" BIGINT;
UPDATE "expenditure_line_item" SET "unit_price_new" = ROUND("unit_price" * 100)::BIGINT WHERE "unit_price" IS NOT NULL;
UPDATE "expenditure_line_item" SET "unit_price_new" = 0 WHERE "unit_price" IS NULL;
ALTER TABLE "expenditure_line_item" DROP COLUMN "unit_price";
ALTER TABLE "expenditure_line_item" RENAME COLUMN "unit_price_new" TO "unit_price";
ALTER TABLE "expenditure_line_item" ALTER COLUMN "unit_price" SET NOT NULL;
ALTER TABLE "expenditure_line_item" ALTER COLUMN "unit_price" SET DEFAULT 0;

-- expenditure_line_item.line_amount
ALTER TABLE "expenditure_line_item" ADD COLUMN "line_amount_new" BIGINT;
UPDATE "expenditure_line_item" SET "line_amount_new" = ROUND("line_amount" * 100)::BIGINT WHERE "line_amount" IS NOT NULL;
UPDATE "expenditure_line_item" SET "line_amount_new" = 0 WHERE "line_amount" IS NULL;
ALTER TABLE "expenditure_line_item" DROP COLUMN "line_amount";
ALTER TABLE "expenditure_line_item" RENAME COLUMN "line_amount_new" TO "line_amount";
ALTER TABLE "expenditure_line_item" ALTER COLUMN "line_amount" SET NOT NULL;
ALTER TABLE "expenditure_line_item" ALTER COLUMN "line_amount" SET DEFAULT 0;

-- ============================================================================
-- REVENUE/EXPENDITURE: prepayment
-- ============================================================================

-- prepayment.total_amount
ALTER TABLE "prepayment" ADD COLUMN "total_amount_new" BIGINT;
UPDATE "prepayment" SET "total_amount_new" = ROUND("total_amount" * 100)::BIGINT WHERE "total_amount" IS NOT NULL;
ALTER TABLE "prepayment" DROP COLUMN "total_amount";
ALTER TABLE "prepayment" RENAME COLUMN "total_amount_new" TO "total_amount";
ALTER TABLE "prepayment" ALTER COLUMN "total_amount" SET NOT NULL;

-- prepayment.remaining_amount
ALTER TABLE "prepayment" ADD COLUMN "remaining_amount_new" BIGINT;
UPDATE "prepayment" SET "remaining_amount_new" = ROUND("remaining_amount" * 100)::BIGINT WHERE "remaining_amount" IS NOT NULL;
ALTER TABLE "prepayment" DROP COLUMN "remaining_amount";
ALTER TABLE "prepayment" RENAME COLUMN "remaining_amount_new" TO "remaining_amount";
ALTER TABLE "prepayment" ALTER COLUMN "remaining_amount" SET NOT NULL;

-- ============================================================================
-- PAYROLL: payroll_run
-- ============================================================================

-- payroll_run.total_gross
ALTER TABLE "payroll_run" ADD COLUMN "total_gross_new" BIGINT;
UPDATE "payroll_run" SET "total_gross_new" = ROUND("total_gross" * 100)::BIGINT WHERE "total_gross" IS NOT NULL;
UPDATE "payroll_run" SET "total_gross_new" = 0 WHERE "total_gross" IS NULL;
ALTER TABLE "payroll_run" DROP COLUMN "total_gross";
ALTER TABLE "payroll_run" RENAME COLUMN "total_gross_new" TO "total_gross";
ALTER TABLE "payroll_run" ALTER COLUMN "total_gross" SET NOT NULL;
ALTER TABLE "payroll_run" ALTER COLUMN "total_gross" SET DEFAULT 0;

-- payroll_run.total_deductions
ALTER TABLE "payroll_run" ADD COLUMN "total_deductions_new" BIGINT;
UPDATE "payroll_run" SET "total_deductions_new" = ROUND("total_deductions" * 100)::BIGINT WHERE "total_deductions" IS NOT NULL;
UPDATE "payroll_run" SET "total_deductions_new" = 0 WHERE "total_deductions" IS NULL;
ALTER TABLE "payroll_run" DROP COLUMN "total_deductions";
ALTER TABLE "payroll_run" RENAME COLUMN "total_deductions_new" TO "total_deductions";
ALTER TABLE "payroll_run" ALTER COLUMN "total_deductions" SET NOT NULL;
ALTER TABLE "payroll_run" ALTER COLUMN "total_deductions" SET DEFAULT 0;

-- payroll_run.total_net
ALTER TABLE "payroll_run" ADD COLUMN "total_net_new" BIGINT;
UPDATE "payroll_run" SET "total_net_new" = ROUND("total_net" * 100)::BIGINT WHERE "total_net" IS NOT NULL;
UPDATE "payroll_run" SET "total_net_new" = 0 WHERE "total_net" IS NULL;
ALTER TABLE "payroll_run" DROP COLUMN "total_net";
ALTER TABLE "payroll_run" RENAME COLUMN "total_net_new" TO "total_net";
ALTER TABLE "payroll_run" ALTER COLUMN "total_net" SET NOT NULL;
ALTER TABLE "payroll_run" ALTER COLUMN "total_net" SET DEFAULT 0;

-- ============================================================================
-- PAYROLL: payroll_remittance
-- ============================================================================

ALTER TABLE "payroll_remittance" ADD COLUMN "amount_new" BIGINT;
UPDATE "payroll_remittance" SET "amount_new" = ROUND("amount" * 100)::BIGINT WHERE "amount" IS NOT NULL;
ALTER TABLE "payroll_remittance" DROP COLUMN "amount";
ALTER TABLE "payroll_remittance" RENAME COLUMN "amount_new" TO "amount";
ALTER TABLE "payroll_remittance" ALTER COLUMN "amount" SET NOT NULL;

-- ============================================================================
-- OPERATIONS: job_activity (line item equivalent)
-- ============================================================================

-- job_activity.unit_cost
ALTER TABLE "job_activity" ADD COLUMN "unit_cost_new" BIGINT;
UPDATE "job_activity" SET "unit_cost_new" = ROUND("unit_cost" * 100)::BIGINT WHERE "unit_cost" IS NOT NULL;
ALTER TABLE "job_activity" DROP COLUMN "unit_cost";
ALTER TABLE "job_activity" RENAME COLUMN "unit_cost_new" TO "unit_cost";
ALTER TABLE "job_activity" ALTER COLUMN "unit_cost" SET NOT NULL;

-- job_activity.total_cost
ALTER TABLE "job_activity" ADD COLUMN "total_cost_new" BIGINT;
UPDATE "job_activity" SET "total_cost_new" = ROUND("total_cost" * 100)::BIGINT WHERE "total_cost" IS NOT NULL;
ALTER TABLE "job_activity" DROP COLUMN "total_cost";
ALTER TABLE "job_activity" RENAME COLUMN "total_cost_new" TO "total_cost";
ALTER TABLE "job_activity" ALTER COLUMN "total_cost" SET NOT NULL;

-- ============================================================================
-- OPERATIONS: job_settlement (line item equivalent)
-- ============================================================================

ALTER TABLE "job_settlement" ADD COLUMN "allocated_amount_new" BIGINT;
UPDATE "job_settlement" SET "allocated_amount_new" = ROUND("allocated_amount" * 100)::BIGINT WHERE "allocated_amount" IS NOT NULL;
ALTER TABLE "job_settlement" DROP COLUMN "allocated_amount";
ALTER TABLE "job_settlement" RENAME COLUMN "allocated_amount_new" TO "allocated_amount";
ALTER TABLE "job_settlement" ALTER COLUMN "allocated_amount" SET NOT NULL;

-- ============================================================================
-- FULFILLMENT: fulfillment
-- ============================================================================

ALTER TABLE "fulfillment" ADD COLUMN "delivery_cost_new" BIGINT;
UPDATE "fulfillment" SET "delivery_cost_new" = ROUND("delivery_cost" * 100)::BIGINT WHERE "delivery_cost" IS NOT NULL;
UPDATE "fulfillment" SET "delivery_cost_new" = 0 WHERE "delivery_cost" IS NULL;
ALTER TABLE "fulfillment" DROP COLUMN "delivery_cost";
ALTER TABLE "fulfillment" RENAME COLUMN "delivery_cost_new" TO "delivery_cost";
ALTER TABLE "fulfillment" ALTER COLUMN "delivery_cost" SET NOT NULL;
ALTER TABLE "fulfillment" ALTER COLUMN "delivery_cost" SET DEFAULT 0;

-- ============================================================================
-- FULFILLMENT: fulfillment_return
-- ============================================================================

-- fulfillment_return.refund_amount (NULLable)
ALTER TABLE "fulfillment_return" ADD COLUMN "refund_amount_new" BIGINT;
UPDATE "fulfillment_return" SET "refund_amount_new" = ROUND("refund_amount" * 100)::BIGINT WHERE "refund_amount" IS NOT NULL;
ALTER TABLE "fulfillment_return" DROP COLUMN "refund_amount";
ALTER TABLE "fulfillment_return" RENAME COLUMN "refund_amount_new" TO "refund_amount";

-- ============================================================================
-- ENTITY: supplier
-- ============================================================================

-- supplier.credit_limit (NULLable)
ALTER TABLE "supplier" ADD COLUMN "credit_limit_new" BIGINT;
UPDATE "supplier" SET "credit_limit_new" = ROUND("credit_limit" * 100)::BIGINT WHERE "credit_limit" IS NOT NULL;
ALTER TABLE "supplier" DROP COLUMN "credit_limit";
ALTER TABLE "supplier" RENAME COLUMN "credit_limit_new" TO "credit_limit";

-- ============================================================================
-- EVENT: event_product
-- ============================================================================

-- event_product.unit_price (NULLable)
ALTER TABLE "event_product" ADD COLUMN "unit_price_new" BIGINT;
UPDATE "event_product" SET "unit_price_new" = ROUND("unit_price" * 100)::BIGINT WHERE "unit_price" IS NOT NULL;
ALTER TABLE "event_product" DROP COLUMN "unit_price";
ALTER TABLE "event_product" RENAME COLUMN "unit_price_new" TO "unit_price";

-- event_product.total_price (NULLable)
ALTER TABLE "event_product" ADD COLUMN "total_price_new" BIGINT;
UPDATE "event_product" SET "total_price_new" = ROUND("total_price" * 100)::BIGINT WHERE "total_price" IS NOT NULL;
ALTER TABLE "event_product" DROP COLUMN "total_price";
ALTER TABLE "event_product" RENAME COLUMN "total_price_new" TO "total_price";

-- ============================================================================
-- PAYMENT: payment
-- ============================================================================

ALTER TABLE "payment" ADD COLUMN "amount_new" BIGINT;
UPDATE "payment" SET "amount_new" = ROUND("amount" * 100)::BIGINT WHERE "amount" IS NOT NULL;
ALTER TABLE "payment" DROP COLUMN "amount";
ALTER TABLE "payment" RENAME COLUMN "amount_new" TO "amount";
ALTER TABLE "payment" ALTER COLUMN "amount" SET NOT NULL;

-- ============================================================================
-- PAYMENT: revenue_payment
-- ============================================================================

ALTER TABLE "revenue_payment" ADD COLUMN "amount_new" BIGINT;
UPDATE "revenue_payment" SET "amount_new" = ROUND("amount" * 100)::BIGINT WHERE "amount" IS NOT NULL;
UPDATE "revenue_payment" SET "amount_new" = 0 WHERE "amount" IS NULL;
ALTER TABLE "revenue_payment" DROP COLUMN "amount";
ALTER TABLE "revenue_payment" RENAME COLUMN "amount_new" TO "amount";
ALTER TABLE "revenue_payment" ALTER COLUMN "amount" SET NOT NULL;
ALTER TABLE "revenue_payment" ALTER COLUMN "amount" SET DEFAULT 0;

COMMIT;
