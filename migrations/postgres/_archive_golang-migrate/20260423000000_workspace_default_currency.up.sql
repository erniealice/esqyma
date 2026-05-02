ALTER TABLE "workspace" ADD COLUMN "default_currency" TEXT NULL;
UPDATE "workspace" SET "default_currency" = 'PHP' WHERE "default_currency" IS NULL;
