-- Migration: product_expected_cost (down)
-- Dialect: mysql
-- Created: 2026-04-27T15:07:00Z

DROP INDEX idx_product_default_template_id ON `product`;

ALTER TABLE `product`
  DROP COLUMN IF EXISTS `default_template_id`,
  DROP COLUMN IF EXISTS `expected_cost_currency`,
  DROP COLUMN IF EXISTS `expected_cost`;
