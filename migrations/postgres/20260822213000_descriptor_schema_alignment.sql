-- Canonical additive alignment for columns already declared by current Esqyma
-- descriptors. The shape was reviewed with Atlas schema diff against the local
-- education1 predecessor schema. IF NOT EXISTS and catalog guards make this
-- migration safe to register later on databases that received the same schema
-- edges during a controlled production cutover.

SET lock_timeout = '5s';
SET statement_timeout = '60s';

-- Fail closed if a pre-existing column has a conflicting type. PostgreSQL's
-- ADD COLUMN IF NOT EXISTS alone would otherwise accept the wrong shape.
DO $$
DECLARE
  expected record;
  actual_type oid;
BEGIN
  FOR expected IN
    SELECT * FROM (VALUES
      ('collection_method', 'date_created', 'bigint'::regtype),
      ('collection_method', 'date_modified', 'bigint'::regtype),
      ('disbursement_method', 'date_created', 'bigint'::regtype),
      ('disbursement_method', 'date_modified', 'bigint'::regtype),
      ('event_recurrence', 'rrule_string', 'text'::regtype),
      ('event_recurrence', 'exdate_string', 'text'::regtype),
      ('expenditure', 'fund_transaction_id', 'text'::regtype),
      ('expenditure_category', 'parent_category_id', 'text'::regtype),
      ('expenditure_category', 'billing_mode', 'text'::regtype),
      ('expenditure_category', 'markup_pct', 'double precision'::regtype),
      ('expenditure_category', 'default_rate', 'bigint'::regtype),
      ('expenditure_category', 'billable_by_default', 'boolean'::regtype),
      ('expenditure_line_item', 'total_price', 'bigint'::regtype),
      ('expenditure_line_item', 'line_item_type', 'text'::regtype),
      ('fulfillment', 'metadata', 'jsonb'::regtype),
      ('fulfillment_return', 'metadata', 'jsonb'::regtype),
      ('fulfillment_return', 'completed_at', 'timestamp with time zone'::regtype),
      ('fulfillment_status_event', 'occurred_at', 'timestamp with time zone'::regtype),
      ('integration_config', 'config_data', 'jsonb'::regtype),
      ('line', 'workspace_id', 'text'::regtype),
      ('product_option_value', 'metadata', 'jsonb'::regtype),
      ('revenue_category', 'parent_category_id', 'text'::regtype)
    ) AS columns(table_name, column_name, expected_type)
  LOOP
    SELECT attribute.atttypid
      INTO actual_type
    FROM pg_attribute AS attribute
    WHERE attribute.attrelid = to_regclass(format('public.%I', expected.table_name))
      AND attribute.attname = expected.column_name
      AND attribute.attnum > 0
      AND NOT attribute.attisdropped;

    IF actual_type IS NOT NULL AND actual_type <> expected.expected_type THEN
      RAISE EXCEPTION
        'public.%.% has type %, expected %',
        expected.table_name,
        expected.column_name,
        actual_type::regtype,
        expected.expected_type::regtype;
    END IF;
  END LOOP;
END;
$$;

ALTER TABLE public.collection_method
  ADD COLUMN IF NOT EXISTS date_created BIGINT,
  ADD COLUMN IF NOT EXISTS date_modified BIGINT;

ALTER TABLE public.disbursement_method
  ADD COLUMN IF NOT EXISTS date_created BIGINT,
  ADD COLUMN IF NOT EXISTS date_modified BIGINT;

ALTER TABLE public.event_recurrence
  ADD COLUMN IF NOT EXISTS rrule_string TEXT,
  ADD COLUMN IF NOT EXISTS exdate_string TEXT;

ALTER TABLE public.expenditure
  ADD COLUMN IF NOT EXISTS fund_transaction_id TEXT;

ALTER TABLE public.expenditure_category
  ADD COLUMN IF NOT EXISTS parent_category_id TEXT,
  ADD COLUMN IF NOT EXISTS billing_mode TEXT,
  ADD COLUMN IF NOT EXISTS markup_pct DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS default_rate BIGINT,
  ADD COLUMN IF NOT EXISTS billable_by_default BOOLEAN;

ALTER TABLE public.expenditure_line_item
  ADD COLUMN IF NOT EXISTS total_price BIGINT,
  ADD COLUMN IF NOT EXISTS line_item_type TEXT;

ALTER TABLE public.fulfillment
  ADD COLUMN IF NOT EXISTS metadata JSONB;

ALTER TABLE public.fulfillment_return
  ADD COLUMN IF NOT EXISTS metadata JSONB,
  ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;

ALTER TABLE public.fulfillment_status_event
  ADD COLUMN IF NOT EXISTS occurred_at TIMESTAMPTZ;

ALTER TABLE public.integration_config
  ADD COLUMN IF NOT EXISTS config_data JSONB;

ALTER TABLE public.line
  ADD COLUMN IF NOT EXISTS workspace_id TEXT;

ALTER TABLE public.product_option_value
  ADD COLUMN IF NOT EXISTS metadata JSONB;

ALTER TABLE public.revenue_category
  ADD COLUMN IF NOT EXISTS parent_category_id TEXT;

CREATE INDEX IF NOT EXISTS idx_expenditure_fund_transaction_id
  ON public.expenditure (fund_transaction_id)
  WHERE fund_transaction_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_line_workspace_id
  ON public.line (workspace_id)
  WHERE workspace_id IS NOT NULL;

-- Match foreign keys by their actual catalog edge, not only by constraint name.
-- If an equivalent constraint already exists under another name, validate that
-- constraint instead of attempting duplicate DDL.
DO $$
DECLARE
  expected record;
  source_attnum smallint;
  referenced_attnum smallint;
  matching_constraint name;
  named_constraint_matches boolean;
BEGIN
  FOR expected IN
    SELECT * FROM (VALUES
      (
        'expenditure',
        'fund_transaction_id',
        'fund_transaction',
        'id',
        'expenditure_fund_transaction_id_fkey'
      ),
      (
        'line',
        'workspace_id',
        'workspace',
        'id',
        'line_workspace_id_fkey'
      )
    ) AS foreign_keys(
      source_table,
      source_column,
      referenced_table,
      referenced_column,
      preferred_name
    )
  LOOP
    SELECT attribute.attnum
      INTO source_attnum
    FROM pg_attribute AS attribute
    WHERE attribute.attrelid = to_regclass(format('public.%I', expected.source_table))
      AND attribute.attname = expected.source_column
      AND attribute.attnum > 0
      AND NOT attribute.attisdropped;

    SELECT attribute.attnum
      INTO referenced_attnum
    FROM pg_attribute AS attribute
    WHERE attribute.attrelid = to_regclass(format('public.%I', expected.referenced_table))
      AND attribute.attname = expected.referenced_column
      AND attribute.attnum > 0
      AND NOT attribute.attisdropped;

    IF source_attnum IS NULL OR referenced_attnum IS NULL THEN
      RAISE EXCEPTION
        'cannot create foreign key public.%(%) -> public.%(%) because a required column is absent',
        expected.source_table,
        expected.source_column,
        expected.referenced_table,
        expected.referenced_column;
    END IF;

    SELECT constraint_row.conname
      INTO matching_constraint
    FROM pg_constraint AS constraint_row
    WHERE constraint_row.conrelid = to_regclass(format('public.%I', expected.source_table))
      AND constraint_row.contype = 'f'
      AND constraint_row.conkey = ARRAY[source_attnum]
      AND constraint_row.confrelid = to_regclass(format('public.%I', expected.referenced_table))
      AND constraint_row.confkey = ARRAY[referenced_attnum]
      AND constraint_row.confupdtype = 'a'
      AND constraint_row.confdeltype = 'a'
    ORDER BY (constraint_row.conname = expected.preferred_name) DESC,
      constraint_row.conname
    LIMIT 1;

    IF matching_constraint IS NULL THEN
      SELECT EXISTS (
        SELECT 1
        FROM pg_constraint AS constraint_row
        WHERE constraint_row.conrelid = to_regclass(format('public.%I', expected.source_table))
          AND constraint_row.conname = expected.preferred_name
      ) INTO named_constraint_matches;

      IF named_constraint_matches THEN
        RAISE EXCEPTION
          'constraint public.%.% exists with a conflicting definition',
          expected.source_table,
          expected.preferred_name;
      END IF;

      EXECUTE format(
        'ALTER TABLE public.%I ADD CONSTRAINT %I FOREIGN KEY (%I) REFERENCES public.%I (%I) ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID',
        expected.source_table,
        expected.preferred_name,
        expected.source_column,
        expected.referenced_table,
        expected.referenced_column
      );
      matching_constraint := expected.preferred_name;
    END IF;

    EXECUTE format(
      'ALTER TABLE public.%I VALIDATE CONSTRAINT %I',
      expected.source_table,
      matching_constraint
    );
  END LOOP;
END;
$$;

RESET statement_timeout;
RESET lock_timeout;
