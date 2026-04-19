-- Migration: drop_plan_fulfillment_type (down)
-- Dialect: mysql
-- Created: 2026-04-18T20:00:00Z

ALTER TABLE `plan` ADD COLUMN `fulfillment_type` TEXT NULL;
