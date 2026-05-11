-- Add workspace.date_format and workspace.time_format — per-workspace UI
-- preferences for date/time rendering across the app.
--
-- Values are Go time-layout strings (e.g. "Jan 2, 2006" or "2006-01-02" for
-- date_format; "3:04 PM" or "15:04" for time_format). Nullable: when empty
-- the UI falls back to the locale default for the workspace's compliance_region.
ALTER TABLE public.workspace
    ADD COLUMN date_format text,
    ADD COLUMN time_format text;
