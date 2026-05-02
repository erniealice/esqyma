-- Event management epic (docs/plan/20260424-event-management-epic).
-- Adds two tables: event_tag (per-workspace master list) and
-- event_tag_assignment (many-to-many join with event).

CREATE TABLE "event_tag" (
  "id" TEXT PRIMARY KEY,
  "workspace_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL DEFAULT '',
  "color" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_event_tag_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id")
);

CREATE INDEX "idx_event_tag_workspace_id" ON "event_tag" ("workspace_id");

CREATE TABLE "event_tag_assignment" (
  "id" TEXT PRIMARY KEY,
  "event_id" TEXT NOT NULL,
  "event_tag_id" TEXT NOT NULL,
  "position" INTEGER NOT NULL DEFAULT 0,
  "workspace_id" TEXT NOT NULL,
  "date_created" BIGINT NULL,
  "date_modified" BIGINT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "fk_event_tag_assignment_event_id" FOREIGN KEY ("event_id") REFERENCES "event"("id"),
  CONSTRAINT "fk_event_tag_assignment_event_tag_id" FOREIGN KEY ("event_tag_id") REFERENCES "event_tag"("id"),
  CONSTRAINT "fk_event_tag_assignment_workspace_id" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id"),
  CONSTRAINT "uq_event_tag_assignment_event_id_event_tag_id" UNIQUE ("event_id", "event_tag_id")
);

CREATE INDEX "idx_event_tag_assignment_event_id" ON "event_tag_assignment" ("event_id");
CREATE INDEX "idx_event_tag_assignment_event_tag_id" ON "event_tag_assignment" ("event_tag_id");
CREATE INDEX "idx_event_tag_assignment_workspace_id" ON "event_tag_assignment" ("workspace_id");
