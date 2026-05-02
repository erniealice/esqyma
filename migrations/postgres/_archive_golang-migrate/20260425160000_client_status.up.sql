ALTER TABLE "client" ADD COLUMN "status" TEXT NULL;

UPDATE "client" SET "status" = 'active' WHERE "active" = true AND "status" IS NULL;
UPDATE "client" SET "status" = 'inactive' WHERE "active" = false AND "status" IS NULL;
