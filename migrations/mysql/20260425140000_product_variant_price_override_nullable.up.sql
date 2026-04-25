-- Migration: product_variant_price_override_nullable (up)
-- Dialect: mysql
-- Created: 2026-04-25T14:00:00Z
-- Rationale: "no override" is a meaningful state distinct from "override = 0".

ALTER TABLE `product_variant` MODIFY COLUMN `price_override` BIGINT NULL;
