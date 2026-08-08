-- Migration: backfill_workspace_id_on_treasury_cash_events
-- Date: 2026-08-07
-- Plan: docs/plan/20260807-espyna-postgres-security-performance-profile (COR-02)
-- Follows: 20260807000001_add_workspace_id_and_missing_columns_to_treasury_cash_events.sql
--
-- Available ownership evidence:
--   collection: revenue.workspace_id, revenue.client_id -> client.workspace_id,
--               direct client_id -> client.workspace_id, advance account owners;
--   disbursement: expenditure.workspace_id,
--                 expenditure.supplier_id -> supplier.workspace_id,
--                 direct supplier_id -> supplier.workspace_id, advance accounts.
--
-- Every non-NULL candidate must agree. Conflicts abort the migration. Rows with
-- zero candidates remain NULL and are excluded by direct workspace predicates.
-- Read-only evidence on 2026-08-07:
--   education1: both tables empty;
--   professional1: collection 9/9 derivable, no conflicts; disbursement 4/6
--   derivable, no conflicts, with 2 unresolved rows deliberately left NULL.
-- Writers remain quiesced and applications restart after both ADD migrations;
-- traffic stays disabled until both backfills, indexes, and reconciliation
-- oracles complete.

SET search_path TO public;

-- Collection: conflict and existing-anchor preflight.
DO $$
BEGIN
    IF EXISTS (
        WITH candidate_values AS (
            SELECT cash_event.id, candidate.workspace_id
              FROM treasury_collection cash_event
              LEFT JOIN revenue revenue_row ON revenue_row.id = cash_event.revenue_id
              LEFT JOIN client revenue_client ON revenue_client.id = revenue_row.client_id
              LEFT JOIN client direct_client ON direct_client.id = cash_event.client_id
              LEFT JOIN account balance_account ON balance_account.id = cash_event.advance_balance_account_id
              LEFT JOIN account target_account ON target_account.id = cash_event.advance_target_account_id
              CROSS JOIN LATERAL (
                  VALUES
                      (revenue_row.workspace_id),
                      (revenue_client.workspace_id),
                      (direct_client.workspace_id),
                      (balance_account.workspace_id),
                      (target_account.workspace_id)
              ) candidate(workspace_id)
             WHERE candidate.workspace_id IS NOT NULL
        ),
        resolved AS (
            SELECT id,
                   min(workspace_id) AS workspace_id,
                   count(DISTINCT workspace_id) AS anchor_count
              FROM candidate_values
             GROUP BY id
        )
        SELECT 1 FROM resolved WHERE anchor_count > 1
    ) THEN
        RAISE EXCEPTION 'treasury_collection has conflicting workspace anchors';
    END IF;

    IF EXISTS (
        WITH candidate_values AS (
            SELECT cash_event.id, cash_event.workspace_id AS current_workspace_id,
                   candidate.workspace_id
              FROM treasury_collection cash_event
              LEFT JOIN revenue revenue_row ON revenue_row.id = cash_event.revenue_id
              LEFT JOIN client revenue_client ON revenue_client.id = revenue_row.client_id
              LEFT JOIN client direct_client ON direct_client.id = cash_event.client_id
              LEFT JOIN account balance_account ON balance_account.id = cash_event.advance_balance_account_id
              LEFT JOIN account target_account ON target_account.id = cash_event.advance_target_account_id
              CROSS JOIN LATERAL (
                  VALUES
                      (revenue_row.workspace_id),
                      (revenue_client.workspace_id),
                      (direct_client.workspace_id),
                      (balance_account.workspace_id),
                      (target_account.workspace_id)
              ) candidate(workspace_id)
             WHERE candidate.workspace_id IS NOT NULL
        ),
        resolved AS (
            SELECT id, current_workspace_id,
                   min(workspace_id) AS workspace_id,
                   count(DISTINCT workspace_id) AS anchor_count
              FROM candidate_values
             GROUP BY id, current_workspace_id
        )
        SELECT 1
          FROM resolved
         WHERE anchor_count = 1
           AND current_workspace_id IS NOT NULL
           AND current_workspace_id <> workspace_id
    ) THEN
        RAISE EXCEPTION 'existing treasury_collection workspace anchor contradicts structural ownership';
    END IF;
END;
$$;

WITH candidate_values AS (
    SELECT cash_event.id, candidate.workspace_id
      FROM treasury_collection cash_event
      LEFT JOIN revenue revenue_row ON revenue_row.id = cash_event.revenue_id
      LEFT JOIN client revenue_client ON revenue_client.id = revenue_row.client_id
      LEFT JOIN client direct_client ON direct_client.id = cash_event.client_id
      LEFT JOIN account balance_account ON balance_account.id = cash_event.advance_balance_account_id
      LEFT JOIN account target_account ON target_account.id = cash_event.advance_target_account_id
      CROSS JOIN LATERAL (
          VALUES
              (revenue_row.workspace_id),
              (revenue_client.workspace_id),
              (direct_client.workspace_id),
              (balance_account.workspace_id),
              (target_account.workspace_id)
      ) candidate(workspace_id)
     WHERE candidate.workspace_id IS NOT NULL
),
resolved AS (
    SELECT id, min(workspace_id) AS workspace_id
      FROM candidate_values
     GROUP BY id
    HAVING count(DISTINCT workspace_id) = 1
)
UPDATE treasury_collection cash_event
   SET workspace_id = resolved.workspace_id
  FROM resolved
 WHERE cash_event.id = resolved.id
   AND cash_event.workspace_id IS NULL;

-- Disbursement: conflict and existing-anchor preflight.
DO $$
BEGIN
    IF EXISTS (
        WITH candidate_values AS (
            SELECT cash_event.id, candidate.workspace_id
              FROM treasury_disbursement cash_event
              LEFT JOIN expenditure expenditure_row ON expenditure_row.id = cash_event.expenditure_id
              LEFT JOIN supplier expenditure_supplier ON expenditure_supplier.id = expenditure_row.supplier_id
              LEFT JOIN supplier direct_supplier ON direct_supplier.id = cash_event.supplier_id
              LEFT JOIN account balance_account ON balance_account.id = cash_event.advance_balance_account_id
              LEFT JOIN account target_account ON target_account.id = cash_event.advance_target_account_id
              CROSS JOIN LATERAL (
                  VALUES
                      (expenditure_row.workspace_id),
                      (expenditure_supplier.workspace_id),
                      (direct_supplier.workspace_id),
                      (balance_account.workspace_id),
                      (target_account.workspace_id)
              ) candidate(workspace_id)
             WHERE candidate.workspace_id IS NOT NULL
        ),
        resolved AS (
            SELECT id,
                   min(workspace_id) AS workspace_id,
                   count(DISTINCT workspace_id) AS anchor_count
              FROM candidate_values
             GROUP BY id
        )
        SELECT 1 FROM resolved WHERE anchor_count > 1
    ) THEN
        RAISE EXCEPTION 'treasury_disbursement has conflicting workspace anchors';
    END IF;

    IF EXISTS (
        WITH candidate_values AS (
            SELECT cash_event.id, cash_event.workspace_id AS current_workspace_id,
                   candidate.workspace_id
              FROM treasury_disbursement cash_event
              LEFT JOIN expenditure expenditure_row ON expenditure_row.id = cash_event.expenditure_id
              LEFT JOIN supplier expenditure_supplier ON expenditure_supplier.id = expenditure_row.supplier_id
              LEFT JOIN supplier direct_supplier ON direct_supplier.id = cash_event.supplier_id
              LEFT JOIN account balance_account ON balance_account.id = cash_event.advance_balance_account_id
              LEFT JOIN account target_account ON target_account.id = cash_event.advance_target_account_id
              CROSS JOIN LATERAL (
                  VALUES
                      (expenditure_row.workspace_id),
                      (expenditure_supplier.workspace_id),
                      (direct_supplier.workspace_id),
                      (balance_account.workspace_id),
                      (target_account.workspace_id)
              ) candidate(workspace_id)
             WHERE candidate.workspace_id IS NOT NULL
        ),
        resolved AS (
            SELECT id, current_workspace_id,
                   min(workspace_id) AS workspace_id,
                   count(DISTINCT workspace_id) AS anchor_count
              FROM candidate_values
             GROUP BY id, current_workspace_id
        )
        SELECT 1
          FROM resolved
         WHERE anchor_count = 1
           AND current_workspace_id IS NOT NULL
           AND current_workspace_id <> workspace_id
    ) THEN
        RAISE EXCEPTION 'existing treasury_disbursement workspace anchor contradicts structural ownership';
    END IF;
END;
$$;

WITH candidate_values AS (
    SELECT cash_event.id, candidate.workspace_id
      FROM treasury_disbursement cash_event
      LEFT JOIN expenditure expenditure_row ON expenditure_row.id = cash_event.expenditure_id
      LEFT JOIN supplier expenditure_supplier ON expenditure_supplier.id = expenditure_row.supplier_id
      LEFT JOIN supplier direct_supplier ON direct_supplier.id = cash_event.supplier_id
      LEFT JOIN account balance_account ON balance_account.id = cash_event.advance_balance_account_id
      LEFT JOIN account target_account ON target_account.id = cash_event.advance_target_account_id
      CROSS JOIN LATERAL (
          VALUES
              (expenditure_row.workspace_id),
              (expenditure_supplier.workspace_id),
              (direct_supplier.workspace_id),
              (balance_account.workspace_id),
              (target_account.workspace_id)
      ) candidate(workspace_id)
     WHERE candidate.workspace_id IS NOT NULL
),
resolved AS (
    SELECT id, min(workspace_id) AS workspace_id
      FROM candidate_values
     GROUP BY id
    HAVING count(DISTINCT workspace_id) = 1
)
UPDATE treasury_disbursement cash_event
   SET workspace_id = resolved.workspace_id
  FROM resolved
 WHERE cash_event.id = resolved.id
   AND cash_event.workspace_id IS NULL;

-- Constraint validation and NOT NULL tightening intentionally remain separate.
