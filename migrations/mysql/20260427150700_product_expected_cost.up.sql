-- Migration: product_expected_cost (up)
-- Dialect: mysql
-- Created: 2026-04-27T15:07:00Z
-- Rationale: Adds expected_cost (centavos), expected_cost_currency, and
--            default_template_id to the product table. See redesign-proto.md §5.1.

ALTER TABLE `product`
  ADD COLUMN IF NOT EXISTS `expected_cost`          BIGINT NULL,
  ADD COLUMN IF NOT EXISTS `expected_cost_currency` TEXT NULL,
  ADD COLUMN IF NOT EXISTS `default_template_id`    VARCHAR(255) NULL;

CREATE INDEX idx_product_default_template_id ON `product`(`default_template_id`);
