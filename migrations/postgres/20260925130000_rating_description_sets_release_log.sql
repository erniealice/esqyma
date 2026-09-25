-- Durable rollback log for the rating-description-sets data scripts
-- (docs/plan/20260925-criterion-descriptors-by-program-year/sql-b4/*): each
-- separately reviewed data script records one row per changed row -- its
-- pre-image (prior_row) and post-image (post_row) -- so the paired revoke
-- script can restore exact bytes. The table belongs to the managed audit_trail
-- schema (outside the public-table RLS overlay) and is operator-only: the
-- post-schema ACL gate revokes runtime/platform roles before any data script
-- runs. Workspace-scoped composite primary key, as for the 2026.09.4 logs.
-- Additive only: one new table, no data.

CREATE TABLE audit_trail.zz_rds_release_log (
  workspace_id text NOT NULL,
  run_id text NOT NULL,
  step text NOT NULL,
  table_name text NOT NULL,
  row_id text NOT NULL,
  action text NOT NULL,
  prior_row jsonb,
  post_row jsonb,
  logged_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz,
  CONSTRAINT pk_zz_rds_release_log PRIMARY KEY (workspace_id, run_id, step, table_name, row_id, action),
  CONSTRAINT ck_zz_rds_release_log_action CHECK (action IN ('insert', 'update', 'delete'))
);

COMMENT ON TABLE audit_trail.zz_rds_release_log
  IS 'Operator-only rollback log for the rating-description-sets data scripts (pre/post images per changed row).';
