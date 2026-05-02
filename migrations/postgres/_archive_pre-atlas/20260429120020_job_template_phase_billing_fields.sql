BEGIN;
ALTER TABLE job_template_phase ADD COLUMN IF NOT EXISTS triggers_billing    BOOLEAN;
ALTER TABLE job_template_phase ADD COLUMN IF NOT EXISTS billing_percent_bps INTEGER;
ALTER TABLE job_template_phase ADD COLUMN IF NOT EXISTS billing_amount      BIGINT;
ALTER TABLE job_template_phase ADD COLUMN IF NOT EXISTS billing_currency    TEXT;
COMMIT;
