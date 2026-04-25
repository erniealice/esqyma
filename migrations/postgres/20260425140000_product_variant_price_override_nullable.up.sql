-- Make product_variant.price_override nullable.
-- Rationale: "no override" is a meaningful state distinct from "override = 0".
-- The proto field was made `optional int64` on 2026-04-25; the column must follow.
-- Existing rows currently carry integer values which remain valid.

ALTER TABLE "product_variant" ALTER COLUMN "price_override" DROP NOT NULL;
