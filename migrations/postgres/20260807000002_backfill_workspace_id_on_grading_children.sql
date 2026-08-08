-- Migration: backfill_workspace_id_on_grading_children
-- Date: 2026-08-07
-- Plan: docs/plan/20260807-espyna-postgres-security-performance-profile
-- Follows: 20260807000000_add_workspace_id_to_grading_children.sql
--
-- Purpose: derive each new tenant anchor from structural ownership. This file
-- never assigns a literal/default workspace and never overwrites a non-NULL
-- anchor. Missing, dangling, or disagreeing ownership remains NULL and is
-- therefore excluded by direct workspace predicates.
--
-- The parent chain is intentionally ordered:
--   job -> job_phase -> job_task -> task_outcome -> task_outcome_check
--   job_template -> job_template_phase -> job_template_task
--   outcome_criteria -> criteria_option / criteria_threshold
--   job_template_task + outcome_criteria -> template_task_criteria
--   job_phase + job -> phase_outcome_summary
--   scoring_scheme -> scoring_component
--
-- Dual-parent rows are filled only when both independently meaningful parents
-- have the same non-NULL workspace. Any disagreement aborts the migration.
-- Existing non-NULL anchors that contradict structural ownership also abort.
--
-- Known pre-apply evidence (2026-08-07, read-only):
--   * education1: no missing/conflicting anchors across all twelve tables;
--   * professional1: no conflicts, but 3 job_phase and their 6 job_task rows
--     cannot reach a Job workspace. They deliberately remain NULL.
--
-- Writers must remain quiesced and applications must have restarted after both
-- ADD migrations (20260807000000 and 20260807000001) before this file is
-- applied, so no stale process can create another unanchored row.

SET search_path TO public;

-- ---------------------------------------------------------------------------
-- Preflight 1: independently meaningful parents must agree.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
          FROM job_template_relation r
          JOIN job_template parent_template ON parent_template.id = r.parent_template_id
          JOIN job_template child_template ON child_template.id = r.child_template_id
         WHERE parent_template.workspace_id IS NOT NULL
           AND child_template.workspace_id IS NOT NULL
           AND parent_template.workspace_id <> child_template.workspace_id
    ) THEN
        RAISE EXCEPTION 'job_template_relation has conflicting parent workspaces';
    END IF;

    IF EXISTS (
        SELECT 1
          FROM template_task_criteria ttc
          JOIN job_template_task jtt ON jtt.id = ttc.job_template_task_id
          JOIN job_template_phase jtp ON jtp.id = jtt.job_template_phase_id
          JOIN job_template template ON template.id = jtp.job_template_id
          JOIN outcome_criteria oc ON oc.id = ttc.outcome_criteria_id
         WHERE template.workspace_id IS NOT NULL
           AND oc.workspace_id IS NOT NULL
           AND template.workspace_id <> oc.workspace_id
    ) THEN
        RAISE EXCEPTION 'template_task_criteria has conflicting parent workspaces';
    END IF;

    IF EXISTS (
        SELECT 1
          FROM task_outcome outcome
          JOIN job_task task ON task.id = outcome.job_task_id
          JOIN job_phase phase ON phase.id = task.job_phase_id
          JOIN job job_row ON job_row.id = phase.job_id
          JOIN outcome_criteria criteria ON criteria.id = outcome.criteria_version_id
         WHERE job_row.workspace_id IS NOT NULL
           AND criteria.workspace_id IS NOT NULL
           AND job_row.workspace_id <> criteria.workspace_id
    ) THEN
        RAISE EXCEPTION 'task_outcome has conflicting parent workspaces';
    END IF;

    IF EXISTS (
        SELECT 1
          FROM task_outcome_check outcome_check
          JOIN task_outcome outcome ON outcome.id = outcome_check.task_outcome_id
          JOIN job_task task ON task.id = outcome.job_task_id
          JOIN job_phase phase ON phase.id = task.job_phase_id
          JOIN job job_row ON job_row.id = phase.job_id
          JOIN criteria_option option_row ON option_row.id = outcome_check.criteria_option_id
          JOIN outcome_criteria criteria ON criteria.id = option_row.outcome_criteria_id
         WHERE job_row.workspace_id IS NOT NULL
           AND criteria.workspace_id IS NOT NULL
           AND job_row.workspace_id <> criteria.workspace_id
    ) THEN
        RAISE EXCEPTION 'task_outcome_check has conflicting parent workspaces';
    END IF;

    IF EXISTS (
        SELECT 1
          FROM phase_outcome_summary summary
          JOIN job_phase phase ON phase.id = summary.job_phase_id
          JOIN job phase_job ON phase_job.id = phase.job_id
          JOIN job summary_job ON summary_job.id = summary.job_id
         WHERE (
             phase.job_id <> summary_job.id
             OR (
                 phase_job.workspace_id IS NOT NULL
                 AND summary_job.workspace_id IS NOT NULL
                 AND phase_job.workspace_id <> summary_job.workspace_id
             )
         )
    ) THEN
        RAISE EXCEPTION 'phase_outcome_summary has conflicting phase/job ownership';
    END IF;
END;
$$;

-- ---------------------------------------------------------------------------
-- Preflight 2: never silently preserve an existing contradictory child anchor.
-- This matters when an idempotent migration resumes after a partial/manual run.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
          FROM (
              SELECT phase.workspace_id AS child_ws, job_row.workspace_id AS expected_ws
                FROM job_phase phase
                JOIN job job_row ON job_row.id = phase.job_id
              -- job_phase.workspace_id may still be NULL on a partial/manual
              -- run, so structural Job ownership is the actual expectation.
              UNION ALL
              SELECT task.workspace_id, job_row.workspace_id
                FROM job_task task
                JOIN job_phase phase ON phase.id = task.job_phase_id
                JOIN job job_row ON job_row.id = phase.job_id
              UNION ALL
              SELECT phase.workspace_id, template.workspace_id
                FROM job_template_phase phase
                JOIN job_template template ON template.id = phase.job_template_id
              UNION ALL
              SELECT task.workspace_id, template.workspace_id
                FROM job_template_task task
                JOIN job_template_phase phase ON phase.id = task.job_template_phase_id
                JOIN job_template template ON template.id = phase.job_template_id
              UNION ALL
              SELECT relation.workspace_id, parent_template.workspace_id
                FROM job_template_relation relation
                JOIN job_template parent_template ON parent_template.id = relation.parent_template_id
                JOIN job_template child_template ON child_template.id = relation.child_template_id
               WHERE parent_template.workspace_id = child_template.workspace_id
              UNION ALL
              SELECT option_row.workspace_id, criteria.workspace_id
                FROM criteria_option option_row
                JOIN outcome_criteria criteria ON criteria.id = option_row.outcome_criteria_id
              UNION ALL
              SELECT threshold.workspace_id, criteria.workspace_id
                FROM criteria_threshold threshold
                JOIN outcome_criteria criteria ON criteria.id = threshold.outcome_criteria_id
              UNION ALL
              SELECT link.workspace_id, template.workspace_id
                FROM template_task_criteria link
                JOIN job_template_task task ON task.id = link.job_template_task_id
                JOIN job_template_phase phase ON phase.id = task.job_template_phase_id
                JOIN job_template template ON template.id = phase.job_template_id
                JOIN outcome_criteria criteria ON criteria.id = link.outcome_criteria_id
               WHERE template.workspace_id = criteria.workspace_id
              UNION ALL
              SELECT outcome.workspace_id, job_row.workspace_id
                FROM task_outcome outcome
                JOIN job_task task ON task.id = outcome.job_task_id
                JOIN job_phase phase ON phase.id = task.job_phase_id
                JOIN job job_row ON job_row.id = phase.job_id
                JOIN outcome_criteria criteria ON criteria.id = outcome.criteria_version_id
               WHERE job_row.workspace_id = criteria.workspace_id
              UNION ALL
              SELECT outcome_check.workspace_id, job_row.workspace_id
                FROM task_outcome_check outcome_check
                JOIN task_outcome outcome ON outcome.id = outcome_check.task_outcome_id
                JOIN job_task task ON task.id = outcome.job_task_id
                JOIN job_phase phase ON phase.id = task.job_phase_id
                JOIN job job_row ON job_row.id = phase.job_id
                JOIN criteria_option option_row ON option_row.id = outcome_check.criteria_option_id
                JOIN outcome_criteria criteria ON criteria.id = option_row.outcome_criteria_id
               WHERE job_row.workspace_id = criteria.workspace_id
              UNION ALL
              SELECT summary.workspace_id, phase_job.workspace_id
                FROM phase_outcome_summary summary
                JOIN job_phase phase ON phase.id = summary.job_phase_id
                JOIN job phase_job ON phase_job.id = phase.job_id
                JOIN job summary_job ON summary_job.id = summary.job_id
               WHERE phase.job_id = summary_job.id
                 AND phase_job.workspace_id = summary_job.workspace_id
              UNION ALL
              SELECT component.workspace_id, scheme.workspace_id
                FROM scoring_component component
                JOIN scoring_scheme scheme ON scheme.id = component.scoring_scheme_id
          ) anchors
         WHERE child_ws IS NOT NULL
           AND expected_ws IS NOT NULL
           AND child_ws <> expected_ws
    ) THEN
        RAISE EXCEPTION 'existing grading workspace anchor contradicts structural ownership';
    END IF;
END;
$$;

-- 1. job_phase.workspace_id <- job.workspace_id
UPDATE job_phase phase
   SET workspace_id = job_row.workspace_id
  FROM job job_row
 WHERE phase.job_id = job_row.id
   AND phase.workspace_id IS NULL
   AND job_row.workspace_id IS NOT NULL;

-- 2. job_task.workspace_id <- job_phase.workspace_id
UPDATE job_task task
   SET workspace_id = phase.workspace_id
  FROM job_phase phase
 WHERE task.job_phase_id = phase.id
   AND task.workspace_id IS NULL
   AND phase.workspace_id IS NOT NULL;

-- 3. job_template_phase.workspace_id <- job_template.workspace_id
UPDATE job_template_phase phase
   SET workspace_id = template.workspace_id
  FROM job_template template
 WHERE phase.job_template_id = template.id
   AND phase.workspace_id IS NULL
   AND template.workspace_id IS NOT NULL;

-- 4. job_template_task.workspace_id <- job_template_phase.workspace_id
UPDATE job_template_task task
   SET workspace_id = phase.workspace_id
  FROM job_template_phase phase
 WHERE task.job_template_phase_id = phase.id
   AND task.workspace_id IS NULL
   AND phase.workspace_id IS NOT NULL;

-- 5. job_template_relation.workspace_id <- agreeing parent/child templates
UPDATE job_template_relation relation
   SET workspace_id = parent_template.workspace_id
  FROM job_template parent_template,
       job_template child_template
 WHERE relation.parent_template_id = parent_template.id
   AND relation.child_template_id = child_template.id
   AND relation.workspace_id IS NULL
   AND parent_template.workspace_id IS NOT NULL
   AND child_template.workspace_id = parent_template.workspace_id;

-- 6. criteria_option.workspace_id <- outcome_criteria.workspace_id
UPDATE criteria_option option_row
   SET workspace_id = criteria.workspace_id
  FROM outcome_criteria criteria
 WHERE option_row.outcome_criteria_id = criteria.id
   AND option_row.workspace_id IS NULL
   AND criteria.workspace_id IS NOT NULL;

-- 7. criteria_threshold.workspace_id <- outcome_criteria.workspace_id
UPDATE criteria_threshold threshold
   SET workspace_id = criteria.workspace_id
  FROM outcome_criteria criteria
 WHERE threshold.outcome_criteria_id = criteria.id
   AND threshold.workspace_id IS NULL
   AND criteria.workspace_id IS NOT NULL;

-- 8. template_task_criteria.workspace_id <- agreeing task/criteria parents
UPDATE template_task_criteria link
   SET workspace_id = task.workspace_id
  FROM job_template_task task,
       outcome_criteria criteria
 WHERE link.job_template_task_id = task.id
   AND link.outcome_criteria_id = criteria.id
   AND link.workspace_id IS NULL
   AND task.workspace_id IS NOT NULL
   AND criteria.workspace_id = task.workspace_id;

-- 9. task_outcome.workspace_id <- agreeing task/criteria parents
UPDATE task_outcome outcome
   SET workspace_id = task.workspace_id
  FROM job_task task,
       outcome_criteria criteria
 WHERE outcome.job_task_id = task.id
   AND outcome.criteria_version_id = criteria.id
   AND outcome.workspace_id IS NULL
   AND task.workspace_id IS NOT NULL
   AND criteria.workspace_id = task.workspace_id;

-- 10. task_outcome_check.workspace_id <- agreeing outcome/option parents
UPDATE task_outcome_check outcome_check
   SET workspace_id = outcome.workspace_id
  FROM task_outcome outcome,
       criteria_option option_row
 WHERE outcome_check.task_outcome_id = outcome.id
   AND outcome_check.criteria_option_id = option_row.id
   AND outcome_check.workspace_id IS NULL
   AND outcome.workspace_id IS NOT NULL
   AND option_row.workspace_id = outcome.workspace_id;

-- 11. phase_outcome_summary.workspace_id <- agreeing phase/job parents
UPDATE phase_outcome_summary summary
   SET workspace_id = phase.workspace_id
  FROM job_phase phase,
       job job_row
 WHERE summary.job_phase_id = phase.id
   AND summary.job_id = job_row.id
   AND phase.job_id = job_row.id
   AND summary.workspace_id IS NULL
   AND phase.workspace_id IS NOT NULL
   AND job_row.workspace_id = phase.workspace_id;

-- 12. scoring_component.workspace_id <- scoring_scheme.workspace_id
UPDATE scoring_component component
   SET workspace_id = scheme.workspace_id
  FROM scoring_scheme scheme
 WHERE component.scoring_scheme_id = scheme.id
   AND component.workspace_id IS NULL
   AND scheme.workspace_id IS NOT NULL;

-- Constraint validation and NOT NULL tightening intentionally remain separate.
