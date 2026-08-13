-- =============================================================================
-- subscription_group_document_template
--
-- Additive, versioned binding between a generic subscription-group outcome
-- render profile and an immutable document_template. Applicability axes are
-- nullable schema buckets; the current eleven-column profile requires an exact
-- category in the application lifecycle. No existing table or row is changed.
--
-- Constraint names are deliberately short (well below PostgreSQL's 63-byte
-- identifier limit) and every post-create constraint is catalog-guarded so the
-- migration is safe to re-run against a partially provisioned target.
-- Atlas applies this file transactionally (txmode=file).
-- =============================================================================

CREATE TABLE IF NOT EXISTS "subscription_group_document_template" (
  "id"                    TEXT NOT NULL,
  "workspace_id"          TEXT NOT NULL,
  "document_template_id"  TEXT NOT NULL,
  "render_profile"        TEXT NOT NULL,
  "price_schedule_id"     TEXT NULL,
  "plan_id"               TEXT NULL,
  "job_category_id"       TEXT NULL,
  "version"               INTEGER NOT NULL DEFAULT 0,
  "version_status"        TEXT NOT NULL DEFAULT 'VERSION_STATUS_DRAFT',
  "validity_start"        TIMESTAMPTZ NULL,
  "validity_end"          TIMESTAMPTZ NULL,
  "supersedes_binding_id" TEXT NULL,
  "active"                BOOLEAN NOT NULL DEFAULT true,
  "created_by"            TEXT NULL,
  "published_at"          BIGINT NULL,
  "published_by"          TEXT NULL,
  "date_created"          BIGINT NULL,
  "date_modified"         BIGINT NULL
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'pk_sgdt'
      AND conrelid = 'subscription_group_document_template'::regclass
  ) THEN
    ALTER TABLE "subscription_group_document_template"
      ADD CONSTRAINT "pk_sgdt" PRIMARY KEY ("id");
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'ck_sgdt_required_ids'
      AND conrelid = 'subscription_group_document_template'::regclass
  ) THEN
    ALTER TABLE "subscription_group_document_template"
      ADD CONSTRAINT "ck_sgdt_required_ids" CHECK (
        btrim("id") <> ''
        AND btrim("workspace_id") <> ''
        AND btrim("document_template_id") <> ''
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'ck_sgdt_profile'
      AND conrelid = 'subscription_group_document_template'::regclass
  ) THEN
    ALTER TABLE "subscription_group_document_template"
      ADD CONSTRAINT "ck_sgdt_profile" CHECK (
        btrim("render_profile") <> ''
        AND "render_profile" <> 'RENDER_PROFILE_UNSPECIFIED'
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'ck_sgdt_optional_ids'
      AND conrelid = 'subscription_group_document_template'::regclass
  ) THEN
    ALTER TABLE "subscription_group_document_template"
      ADD CONSTRAINT "ck_sgdt_optional_ids" CHECK (
        ("price_schedule_id" IS NULL OR btrim("price_schedule_id") <> '')
        AND ("plan_id" IS NULL OR btrim("plan_id") <> '')
        AND ("job_category_id" IS NULL OR btrim("job_category_id") <> '')
        AND ("supersedes_binding_id" IS NULL OR btrim("supersedes_binding_id") <> '')
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'ck_sgdt_version'
      AND conrelid = 'subscription_group_document_template'::regclass
  ) THEN
    ALTER TABLE "subscription_group_document_template"
      ADD CONSTRAINT "ck_sgdt_version" CHECK ("version" >= 0);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'ck_sgdt_validity'
      AND conrelid = 'subscription_group_document_template'::regclass
  ) THEN
    ALTER TABLE "subscription_group_document_template"
      ADD CONSTRAINT "ck_sgdt_validity" CHECK (
        "validity_start" IS NULL
        OR "validity_end" IS NULL
        OR "validity_start" < "validity_end"
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'fk_sgdt_workspace'
      AND conrelid = 'subscription_group_document_template'::regclass
  ) THEN
    ALTER TABLE "subscription_group_document_template"
      ADD CONSTRAINT "fk_sgdt_workspace"
      FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id");
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'fk_sgdt_document_template'
      AND conrelid = 'subscription_group_document_template'::regclass
  ) THEN
    ALTER TABLE "subscription_group_document_template"
      ADD CONSTRAINT "fk_sgdt_document_template"
      FOREIGN KEY ("document_template_id") REFERENCES "document_template"("id");
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'fk_sgdt_price_schedule'
      AND conrelid = 'subscription_group_document_template'::regclass
  ) THEN
    ALTER TABLE "subscription_group_document_template"
      ADD CONSTRAINT "fk_sgdt_price_schedule"
      FOREIGN KEY ("price_schedule_id") REFERENCES "price_schedule"("id");
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'fk_sgdt_plan'
      AND conrelid = 'subscription_group_document_template'::regclass
  ) THEN
    ALTER TABLE "subscription_group_document_template"
      ADD CONSTRAINT "fk_sgdt_plan"
      FOREIGN KEY ("plan_id") REFERENCES "plan"("id");
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'fk_sgdt_job_category'
      AND conrelid = 'subscription_group_document_template'::regclass
  ) THEN
    ALTER TABLE "subscription_group_document_template"
      ADD CONSTRAINT "fk_sgdt_job_category"
      FOREIGN KEY ("job_category_id") REFERENCES "job_category"("id");
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'fk_sgdt_supersedes'
      AND conrelid = 'subscription_group_document_template'::regclass
  ) THEN
    ALTER TABLE "subscription_group_document_template"
      ADD CONSTRAINT "fk_sgdt_supersedes"
      FOREIGN KEY ("supersedes_binding_id")
      REFERENCES "subscription_group_document_template"("id");
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "idx_sgdt_workspace"
  ON "subscription_group_document_template" ("workspace_id");
CREATE INDEX IF NOT EXISTS "idx_sgdt_document_template"
  ON "subscription_group_document_template" ("document_template_id");
CREATE INDEX IF NOT EXISTS "idx_sgdt_render_profile"
  ON "subscription_group_document_template" ("render_profile");
CREATE INDEX IF NOT EXISTS "idx_sgdt_price_schedule"
  ON "subscription_group_document_template" ("price_schedule_id");
CREATE INDEX IF NOT EXISTS "idx_sgdt_plan"
  ON "subscription_group_document_template" ("plan_id");
CREATE INDEX IF NOT EXISTS "idx_sgdt_job_category"
  ON "subscription_group_document_template" ("job_category_id");
CREATE INDEX IF NOT EXISTS "idx_sgdt_supersedes"
  ON "subscription_group_document_template" ("supersedes_binding_id");

-- Hot path for validity-filtered, most-specific applicable-template lookup.
CREATE INDEX IF NOT EXISTS "idx_sgdt_resolve"
  ON "subscription_group_document_template" (
    "workspace_id",
    "render_profile",
    "job_category_id",
    "plan_id",
    "price_schedule_id",
    "version" DESC
  )
  WHERE "active" = true
    AND "version_status" = 'VERSION_STATUS_PUBLISHED';

-- Prevent duplicate version numbers while preserving multiple historical and
-- current PUBLISHED siblings with different versions in one normalized bucket.
CREATE UNIQUE INDEX IF NOT EXISTS "uq_sgdt_pub_version"
  ON "subscription_group_document_template" (
    "workspace_id",
    "render_profile",
    COALESCE("price_schedule_id", ''),
    COALESCE("plan_id", ''),
    COALESCE("job_category_id", ''),
    "version"
  )
  WHERE "active" = true
    AND "version_status" = 'VERSION_STATUS_PUBLISHED';
