-- Migration: activity_billing_fields (up)
-- Dialect: postgres
-- Created: 2026-04-14T12:00:00Z

-- Resource: add user_id for person-type resources
ALTER TABLE resource ADD COLUMN IF NOT EXISTS user_id TEXT REFERENCES "user"(id);
CREATE INDEX IF NOT EXISTS idx_resource_user_id ON resource(user_id);

-- JobActivity: add resource_id, bill_rate, bill_amount for billing
ALTER TABLE job_activity ADD COLUMN IF NOT EXISTS resource_id TEXT REFERENCES resource(id);
ALTER TABLE job_activity ADD COLUMN IF NOT EXISTS bill_rate BIGINT;
ALTER TABLE job_activity ADD COLUMN IF NOT EXISTS bill_amount BIGINT;
CREATE INDEX IF NOT EXISTS idx_job_activity_resource_id ON job_activity(resource_id);

-- RevenueLineItem: add job_activity_id to link line items to activities
ALTER TABLE revenue_line_item ADD COLUMN IF NOT EXISTS job_activity_id TEXT REFERENCES job_activity(id);
CREATE INDEX IF NOT EXISTS idx_revenue_line_item_job_activity_id ON revenue_line_item(job_activity_id);

-- JobSettlement: add billed_quantity and billed_amount for grouped billing
ALTER TABLE job_settlement ADD COLUMN IF NOT EXISTS billed_quantity DOUBLE PRECISION;
ALTER TABLE job_settlement ADD COLUMN IF NOT EXISTS billed_amount BIGINT;

-- ActivityExpense: add expense_category_id FK, payment_method, markup_pct_override
ALTER TABLE activity_expense ADD COLUMN IF NOT EXISTS expense_category_id TEXT REFERENCES expenditure_category(id);
ALTER TABLE activity_expense ADD COLUMN IF NOT EXISTS payment_method TEXT;
ALTER TABLE activity_expense ADD COLUMN IF NOT EXISTS markup_pct_override DOUBLE PRECISION;
CREATE INDEX IF NOT EXISTS idx_activity_expense_category_id ON activity_expense(expense_category_id);

-- ExpenditureCategory: add billing config fields
ALTER TABLE expenditure_category ADD COLUMN IF NOT EXISTS billing_mode TEXT;
ALTER TABLE expenditure_category ADD COLUMN IF NOT EXISTS markup_pct DOUBLE PRECISION;
ALTER TABLE expenditure_category ADD COLUMN IF NOT EXISTS default_rate BIGINT;
ALTER TABLE expenditure_category ADD COLUMN IF NOT EXISTS billable_by_default BOOLEAN;
