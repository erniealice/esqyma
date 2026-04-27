-- Migration: supplier_contracts (down)
-- Dialect: mysql
-- Created: 2026-04-27T13:00:00Z

ALTER TABLE `prepayment`
  DROP COLUMN IF EXISTS `expenditure_id`,
  DROP COLUMN IF EXISTS `supplier_contract_id`;

ALTER TABLE `expenditure_line_item`
  DROP COLUMN IF EXISTS `supplier_contract_line_id`;

ALTER TABLE `expenditure`
  DROP COLUMN IF EXISTS `petty_cash_fund_id`,
  DROP COLUMN IF EXISTS `supplier_contract_id`;

ALTER TABLE `purchase_order_line_item`
  DROP COLUMN IF EXISTS `procurement_request_line_id`,
  DROP COLUMN IF EXISTS `supplier_contract_line_id`;

ALTER TABLE `purchase_order`
  DROP COLUMN IF EXISTS `procurement_request_id`,
  DROP COLUMN IF EXISTS `supplier_contract_id`;

DROP TABLE IF EXISTS `procurement_request_line`;
DROP TABLE IF EXISTS `procurement_request`;
DROP TABLE IF EXISTS `supplier_contract_line`;
DROP TABLE IF EXISTS `supplier_contract`;
