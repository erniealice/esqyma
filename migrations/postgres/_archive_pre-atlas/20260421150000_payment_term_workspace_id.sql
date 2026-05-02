BEGIN;
ALTER TABLE payment_term
    ADD COLUMN IF NOT EXISTS workspace_id TEXT NOT NULL DEFAULT 'default-workspace';
CREATE INDEX IF NOT EXISTS idx_payment_term_workspace_id
    ON payment_term (workspace_id);
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'fk_payment_term_workspace_id'
    ) THEN
        ALTER TABLE payment_term
            ADD CONSTRAINT fk_payment_term_workspace_id
            FOREIGN KEY (workspace_id) REFERENCES workspace(id);
    END IF;
END$$;
COMMIT;
