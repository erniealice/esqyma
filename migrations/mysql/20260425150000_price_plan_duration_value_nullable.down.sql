-- Migration: price_plan_duration_value_nullable (down)
-- Dialect: mysql
-- Created: 2026-04-25T15:00:00Z

UPDATE `price_plan` SET `duration_value` = 0 WHERE `duration_value` IS NULL;
UPDATE `price_plan` SET `duration_unit` = 'month' WHERE `duration_unit` IS NULL;
ALTER TABLE `price_plan` MODIFY COLUMN `duration_value` INT NOT NULL;
ALTER TABLE `price_plan` MODIFY COLUMN `duration_unit` VARCHAR(255) NOT NULL;
