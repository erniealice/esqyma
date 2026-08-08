-- Migration: add_workspace_id_to_grading_children
-- Date: 2026-08-07
-- Plan: docs/plan/20260807-espyna-postgres-security-performance-profile
--
-- Purpose: add an immutable, nullable tenant anchor to the twelve mounted
-- grading children whose generic PostgreSQL CRUD paths cannot be safely scoped
-- through a one-hop parent policy:
--
--   job_phase, job_task, job_template_phase, job_template_task,
--   job_template_relation, criteria_option, criteria_threshold,
--   template_task_criteria, task_outcome, task_outcome_check,
--   phase_outcome_summary, scoring_component.
--
-- Safety contract:
--   * columns remain nullable throughout this rollout;
--   * no literal/default workspace is assigned;
--   * FK guards inspect constraint shape, not a fragile constraint name;
--   * FKs are NOT VALID to avoid an immediate full-table validation scan;
--   * indexes are built concurrently in migration 20260807000004 and remain
--     partial while unresolved/orphan rows are NULL;
--   * the structural backfill is a separate migration;
--   * writers remain quiesced while both ADD migrations are applied and apps
--     restart, because WorkspaceAwareOperations caches catalog shape.
--
-- Apply order:
--   quiesce writers -> grading ADD (this file) -> treasury ADD (20260807000001)
--   -> restart apps with traffic disabled -> grading BACKFILL (20260807000002)
--   -> treasury BACKFILL (20260807000003) -> concurrent indexes (00004) ->
--   reconciliation oracle -> enable traffic. NOT NULL/VALIDATE is later.

SET search_path TO public;

DO $$
DECLARE
    v_table text;
    v_attnum smallint;
    v_workspace_attnum smallint;
    v_constraint text;
BEGIN
    SELECT attnum
      INTO v_workspace_attnum
      FROM pg_attribute
     WHERE attrelid = 'workspace'::regclass
       AND attname = 'id'
       AND NOT attisdropped;

    IF v_workspace_attnum IS NULL THEN
        RAISE EXCEPTION 'workspace.id column not found';
    END IF;

    FOREACH v_table IN ARRAY ARRAY[
        'job_phase',
        'job_task',
        'job_template_phase',
        'job_template_task',
        'job_template_relation',
        'criteria_option',
        'criteria_threshold',
        'template_task_criteria',
        'task_outcome',
        'task_outcome_check',
        'phase_outcome_summary',
        'scoring_component'
    ]
    LOOP
        EXECUTE format(
            'ALTER TABLE %I ADD COLUMN IF NOT EXISTS workspace_id TEXT',
            v_table
        );

        SELECT attnum
          INTO v_attnum
          FROM pg_attribute
         WHERE attrelid = to_regclass(v_table)
           AND attname = 'workspace_id'
           AND NOT attisdropped;

        IF v_attnum IS NULL THEN
            RAISE EXCEPTION 'workspace_id column not found after ADD on %', v_table;
        END IF;

        IF NOT EXISTS (
            SELECT 1
             FROM pg_constraint
             WHERE conrelid = to_regclass(v_table)
               AND contype = 'f'
               AND conkey = ARRAY[v_attnum]
               AND confrelid = 'workspace'::regclass
               AND confkey = ARRAY[v_workspace_attnum]
        ) THEN
            v_constraint := v_table || '_workspace_id_fkey';
            EXECUTE format(
                'ALTER TABLE %I ADD CONSTRAINT %I FOREIGN KEY (workspace_id) REFERENCES workspace(id) NOT VALID',
                v_table,
                v_constraint
            );
        END IF;

    END LOOP;
END;
$$;

-- Backfill intentionally omitted. See 20260807000002.
-- Indexes intentionally omitted. See 20260807000004.
-- Constraint validation and NOT NULL tightening intentionally omitted.
