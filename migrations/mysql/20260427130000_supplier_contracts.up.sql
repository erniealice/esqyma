-- Migration: supplier_contracts (up)
-- Dialect: mysql
-- Created: 2026-04-27T13:00:00Z

CREATE TABLE IF NOT EXISTS `supplier_contract` (
  `id`                      VARCHAR(255) PRIMARY KEY,
  `workspace_id`            VARCHAR(255) NOT NULL,
  `internal_id`             VARCHAR(255) NOT NULL UNIQUE,
  `name`                    TEXT NOT NULL,
  `description`             TEXT,
  `reference_number`        TEXT,
  `supplier_id`             VARCHAR(255) NOT NULL,
  `kind`                    TEXT NOT NULL DEFAULT '',
  `status`                  TEXT NOT NULL DEFAULT '',
  `billing_kind`            TEXT,
  `billing_cycle_value`     INT,
  `billing_cycle_unit`      TEXT,
  `default_term_value`      INT,
  `default_term_unit`       TEXT,
  `date_time_start`         TEXT NOT NULL,
  `date_time_end`           TEXT,
  `auto_renew`              BOOLEAN NOT NULL DEFAULT false,
  `renewal_notice_days`     INT,
  `currency`                TEXT NOT NULL,
  `committed_amount`        BIGINT,
  `released_amount`         BIGINT NOT NULL DEFAULT 0,
  `billed_amount`           BIGINT NOT NULL DEFAULT 0,
  `remaining_amount`        BIGINT NOT NULL DEFAULT 0,
  `cycle_amount`            BIGINT,
  `payment_term_id`         VARCHAR(255),
  `commitment_quantity`     DOUBLE,
  `released_quantity`       DOUBLE NOT NULL DEFAULT 0,
  `requested_by`            TEXT,
  `requested_date`          BIGINT,
  `requested_date_string`   TEXT,
  `approved_by`             TEXT,
  `approved_date`           BIGINT,
  `approved_date_string`    TEXT,
  `rejection_reason`        TEXT,
  `location_id`             VARCHAR(255),
  `expense_account_id`      VARCHAR(255),
  `accrual_account_id`      VARCHAR(255),
  `expenditure_category_id` VARCHAR(255),
  `notes`                   TEXT,
  `active`                  BOOLEAN NOT NULL DEFAULT true,
  `date_created`            DATETIME DEFAULT NOW(),
  `date_modified`           DATETIME DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS `supplier_contract_line` (
  `id`                      VARCHAR(255) PRIMARY KEY,
  `supplier_contract_id`    VARCHAR(255) NOT NULL,
  `product_id`              VARCHAR(255),
  `description`             TEXT NOT NULL DEFAULT '',
  `line_type`               TEXT NOT NULL DEFAULT '',
  `quantity`                DOUBLE NOT NULL DEFAULT 0,
  `unit_price`              BIGINT NOT NULL DEFAULT 0,
  `total_amount`            BIGINT NOT NULL DEFAULT 0,
  `treatment`               TEXT NOT NULL DEFAULT '',
  `start_date`              TEXT,
  `end_date`                TEXT,
  `expenditure_category_id` VARCHAR(255),
  `expense_account_id`      VARCHAR(255),
  `location_id`             VARCHAR(255),
  `line_number`             INT NOT NULL DEFAULT 0,
  `active`                  BOOLEAN NOT NULL DEFAULT true,
  `date_created`            DATETIME DEFAULT NOW(),
  `date_modified`           DATETIME DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS `procurement_request` (
  `id`                      VARCHAR(255) PRIMARY KEY,
  `workspace_id`            VARCHAR(255) NOT NULL,
  `request_number`          VARCHAR(255) NOT NULL UNIQUE,
  `status`                  TEXT NOT NULL DEFAULT '',
  `requester_user_id`       TEXT NOT NULL,
  `supplier_id`             VARCHAR(255),
  `location_id`             VARCHAR(255),
  `currency`                TEXT NOT NULL,
  `estimated_total_amount`  BIGINT NOT NULL DEFAULT 0,
  `needed_by_date`          TEXT,
  `justification`           TEXT,
  `notes`                   TEXT,
  `approved_by`             TEXT,
  `approved_at`             BIGINT,
  `approved_at_string`      TEXT,
  `rejection_reason`        TEXT,
  `purchase_order_id`       VARCHAR(255),
  `expenditure_category_id` VARCHAR(255),
  `expense_account_id`      VARCHAR(255),
  `active`                  BOOLEAN NOT NULL DEFAULT true,
  `date_created`            DATETIME DEFAULT NOW(),
  `date_modified`           DATETIME DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS `procurement_request_line` (
  `id`                       VARCHAR(255) PRIMARY KEY,
  `procurement_request_id`   VARCHAR(255) NOT NULL,
  `product_id`               VARCHAR(255),
  `description`              TEXT NOT NULL DEFAULT '',
  `line_type`                TEXT NOT NULL DEFAULT '',
  `quantity`                 DOUBLE NOT NULL DEFAULT 0,
  `estimated_unit_price`     BIGINT NOT NULL DEFAULT 0,
  `estimated_total_price`    BIGINT NOT NULL DEFAULT 0,
  `supplier_contract_line_id` VARCHAR(255),
  `expenditure_category_id`  VARCHAR(255),
  `expense_account_id`       VARCHAR(255),
  `location_id`              VARCHAR(255),
  `line_number`              INT NOT NULL DEFAULT 0,
  `active`                   BOOLEAN NOT NULL DEFAULT true,
  `date_created`             DATETIME DEFAULT NOW(),
  `date_modified`            DATETIME DEFAULT NOW()
);

ALTER TABLE `purchase_order`
  ADD COLUMN IF NOT EXISTS `supplier_contract_id` VARCHAR(255),
  ADD COLUMN IF NOT EXISTS `procurement_request_id` VARCHAR(255);

ALTER TABLE `purchase_order_line_item`
  ADD COLUMN IF NOT EXISTS `supplier_contract_line_id` VARCHAR(255),
  ADD COLUMN IF NOT EXISTS `procurement_request_line_id` VARCHAR(255);

ALTER TABLE `expenditure`
  ADD COLUMN IF NOT EXISTS `supplier_contract_id` VARCHAR(255),
  ADD COLUMN IF NOT EXISTS `petty_cash_fund_id` VARCHAR(255);

ALTER TABLE `expenditure_line_item`
  ADD COLUMN IF NOT EXISTS `supplier_contract_line_id` VARCHAR(255);

ALTER TABLE `prepayment`
  ADD COLUMN IF NOT EXISTS `supplier_contract_id` VARCHAR(255),
  ADD COLUMN IF NOT EXISTS `expenditure_id` VARCHAR(255);
