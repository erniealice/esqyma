-- Migration: product_option_description (down)
-- Dialect: postgres
-- Created: 2026-04-25T13:00:00Z

ALTER TABLE "product_option" DROP COLUMN IF EXISTS "description";
