-- Revert product_variant.price_override to NOT NULL.
-- Backfills any NULLs to 0 so the constraint can be restored.

UPDATE "product_variant" SET "price_override" = 0 WHERE "price_override" IS NULL;
ALTER TABLE "product_variant" ALTER COLUMN "price_override" SET NOT NULL;
