-- Fix revenue_run.initiated_by to reference workspace_user(id) instead of user(id).
--
-- The application stores the workspace-scoped audit identity (workspace_user.id)
-- in this column — that's the correct multi-tenant semantic, since the same
-- human can be a workspace_user in multiple workspaces. The original migration
-- (20260505221627_add_revenue_run_tables) pointed the FK at user(id), which
-- caused every GenerateRevenueRun call to fail with a foreign-key violation.
ALTER TABLE public.revenue_run
    DROP CONSTRAINT revenue_run_initiated_by_fkey;

ALTER TABLE public.revenue_run
    ADD CONSTRAINT revenue_run_initiated_by_fkey
    FOREIGN KEY (initiated_by) REFERENCES public.workspace_user(id);
