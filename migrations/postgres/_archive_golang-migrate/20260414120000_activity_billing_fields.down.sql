-- Migration: activity_billing_fields (down)
-- Dialect: postgres
-- Created: 2026-04-14T12:00:00Z

-- ExpenditureCategory: remove billing config
ALTER TABLE expenditure_category DROP COLUMN IF EXISTS billable_by_default;
ALTER TABLE expenditure_category DROP COLUMN IF EXISTS default_rate;
ALTER TABLE expenditure_category DROP COLUMN IF EXISTS markup_pct;
ALTER TABLE expenditure_category DROP COLUMN IF EXISTS billing_mode;

-- ActivityExpense: remove new fields
DROP INDEX IF EXISTS idx_activity_expense_category_id;
ALTER TABLE activity_expense DROP COLUMN IF EXISTS markup_pct_override;
ALTER TABLE activity_expense DROP COLUMN IF EXISTS payment_method;
ALTER TABLE activity_expense DROP COLUMN IF EXISTS expense_category_id;

-- JobSettlement: remove billing fields
ALTER TABLE job_settlement DROP COLUMN IF EXISTS billed_amount;
ALTER TABLE job_settlement DROP COLUMN IF EXISTS billed_quantity;

-- RevenueLineItem: remove job_activity_id
DROP INDEX IF EXISTS idx_revenue_line_item_job_activity_id;
ALTER TABLE revenue_line_item DROP COLUMN IF EXISTS job_activity_id;

-- JobActivity: remove billing fields
DROP INDEX IF EXISTS idx_job_activity_resource_id;
ALTER TABLE job_activity DROP COLUMN IF EXISTS bill_amount;
ALTER TABLE job_activity DROP COLUMN IF EXISTS bill_rate;
ALTER TABLE job_activity DROP COLUMN IF EXISTS resource_id;

-- Resource: remove user_id
DROP INDEX IF EXISTS idx_resource_user_id;
ALTER TABLE resource DROP COLUMN IF EXISTS user_id;
