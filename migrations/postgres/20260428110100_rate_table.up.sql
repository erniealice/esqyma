-- Migration: rate_table (up)
-- Dialect: postgres
-- Created: 2026-04-28T11:01:00Z
-- Rationale: Introduces RateTable — versioned, jurisdiction-keyed bracket/rate set
--            consumed by statutory deduction and tax calculators. workspace_id is
--            nullable: empty/null = global default available to all workspaces in region.

BEGIN;

CREATE TABLE IF NOT EXISTS rate_table (
  id                      TEXT PRIMARY KEY,
  -- workspace_id nullable: null = global default for region
  workspace_id            TEXT REFERENCES workspace(id),

  -- Routing
  compliance_region       TEXT NOT NULL,
  kind                    TEXT NOT NULL,

  -- Effective dating
  effective_from          TEXT NOT NULL,
  effective_to            TEXT,
  version_label           TEXT NOT NULL DEFAULT '',
  supersedes_id           TEXT,

  -- Provenance
  source_citation         TEXT NOT NULL DEFAULT '',

  -- Lifecycle
  status                  TEXT NOT NULL DEFAULT '',

  -- Audit
  active                  BOOLEAN NOT NULL DEFAULT true,
  date_created            TIMESTAMPTZ DEFAULT NOW(),
  date_modified           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rate_table_workspace_id        ON rate_table(workspace_id);
CREATE INDEX IF NOT EXISTS idx_rate_table_effective_from      ON rate_table(effective_from);
CREATE INDEX IF NOT EXISTS idx_rate_table_region_kind_status  ON rate_table(compliance_region, kind, status);

COMMIT;
