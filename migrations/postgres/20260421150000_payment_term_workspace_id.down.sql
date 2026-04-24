-- Revert workspace_id addition on payment_term.

BEGIN;

ALTER TABLE payment_term DROP CONSTRAINT IF EXISTS fk_payment_term_workspace_id;
DROP INDEX IF EXISTS idx_payment_term_workspace_id;
ALTER TABLE payment_term DROP COLUMN IF EXISTS workspace_id;

COMMIT;
