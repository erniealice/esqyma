-- Add workspace.timezone (IANA name) — single source of truth for billing-cycle
-- math, period boundaries, and "what calendar day is this?" computations.
--
-- Default + backfill to 'Asia/Manila' since current deployment is PH-only.
-- Future tenants in other regions: set their workspace.timezone explicitly at
-- create time. The column is NOT NULL to force the choice rather than letting
-- it silently fall through to UTC at the application layer.
ALTER TABLE public.workspace
    ADD COLUMN timezone text NOT NULL DEFAULT 'Asia/Manila';

-- Defensive: ensure all pre-existing rows carry the backfill value even if a
-- prior migration created the column without the default.
UPDATE public.workspace
   SET timezone = 'Asia/Manila'
 WHERE timezone IS NULL OR timezone = '';
