-- Migration: drop_plan_fulfillment_type (up)
-- Dialect: mysql
-- Created: 2026-04-18T20:00:00Z

ALTER TABLE `plan` DROP COLUMN `fulfillment_type`;
