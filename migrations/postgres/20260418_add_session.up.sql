-- Migration: track the `session` table in the declarative schema.
-- The table already exists in running databases (created outside the tracked
-- migration system by an earlier session epic), so this is idempotent.
--
-- Column types are normalized to the rest of the entity domain:
--   - `created_at` TIMESTAMP TZ  →  `date_created`  BIGINT (unix ms)
--   - `expires_at` TIMESTAMP TZ  →  `expires_at`    BIGINT (unix ms)
--
-- On migration, in-flight sessions issued before this change are invalidated
-- (users re-login). Acceptable because sessions are ephemeral.

CREATE TABLE IF NOT EXISTS "session" (
  "id"                TEXT PRIMARY KEY,
  "user_id"           TEXT NOT NULL,
  "token"             TEXT NOT NULL,
  "workspace_user_id" TEXT NULL,
  "workspace_id"      TEXT NULL,
  "expires_at"        BIGINT NOT NULL,
  "active"            BOOLEAN NOT NULL DEFAULT true,
  "date_created"      BIGINT NULL,
  "date_modified"     BIGINT NULL,
  CONSTRAINT "uq_session_token" UNIQUE ("token"),
  CONSTRAINT "fk_session_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id")
);

CREATE INDEX IF NOT EXISTS "idx_session_token"   ON "session" ("token");
CREATE INDEX IF NOT EXISTS "idx_session_user_id" ON "session" ("user_id");

-- For databases that already have the legacy column shape, ALTER to BIGINT.
-- `ALTER COLUMN … USING` converts existing TIMESTAMPTZ rows to unix ms.
-- Wrapped in DO blocks so re-runs on an already-migrated DB are no-ops.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'session' AND column_name = 'created_at' AND data_type = 'timestamp with time zone'
  ) THEN
    ALTER TABLE "session" ADD COLUMN IF NOT EXISTS "date_created" BIGINT NULL;
    UPDATE "session" SET "date_created" = (EXTRACT(EPOCH FROM "created_at") * 1000)::BIGINT;
    ALTER TABLE "session" DROP COLUMN "created_at";
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'session' AND column_name = 'expires_at' AND data_type = 'timestamp with time zone'
  ) THEN
    -- Invalidate in-flight sessions rather than risk botched conversions.
    DELETE FROM "session";
    ALTER TABLE "session" ALTER COLUMN "expires_at" TYPE BIGINT USING (EXTRACT(EPOCH FROM "expires_at") * 1000)::BIGINT;
  END IF;

  -- Ensure date_modified column exists for newer rows
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'session' AND column_name = 'date_modified'
  ) THEN
    ALTER TABLE "session" ADD COLUMN "date_modified" BIGINT NULL;
  END IF;
END$$;
