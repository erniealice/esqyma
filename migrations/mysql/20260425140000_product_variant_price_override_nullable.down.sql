-- Migration: product_variant_price_override_nullable (down)
-- Dialect: mysql
-- Created: 2026-04-25T14:00:00Z

UPDATE `product_variant` SET `price_override` = 0 WHERE `price_override` IS NULL;
ALTER TABLE `product_variant` MODIFY COLUMN `price_override` BIGINT NOT NULL;
