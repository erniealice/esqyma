-- Backfill any existing NULL values to the proto3 zero before tightening the
-- column. Atlas's diff captures only the structural change (NOT NULL + default),
-- so this UPDATE is added by hand to prevent the SET NOT NULL from rejecting
-- pre-existing rows. atlas.sum is recomputed by `pnpm db:hash` after this edit.
UPDATE "public"."payment_term" SET "is_default" = false WHERE "is_default" IS NULL;

-- Modify "payment_term" table
ALTER TABLE "public"."payment_term" ALTER COLUMN "is_default" SET NOT NULL, ALTER COLUMN "is_default" SET DEFAULT false;
