-- Migration: product_taxonomy_refactor (up)
-- Dialect: mysql
-- Created: 2026-04-18T00:00:00Z

-- Product: split item_type + fulfillment_method into product_kind + delivery_mode + tracking_mode
ALTER TABLE product ADD COLUMN IF NOT EXISTS product_kind TEXT;
ALTER TABLE product ADD COLUMN IF NOT EXISTS delivery_mode TEXT;
ALTER TABLE product ADD COLUMN IF NOT EXISTS tracking_mode TEXT;

UPDATE product SET
    product_kind = CASE
        WHEN fulfillment_method = 'physical' AND item_type = 'consumable' THEN 'consumable'
        WHEN fulfillment_method = 'make_to_order' AND item_type = 'consumable' THEN 'consumable'
        WHEN fulfillment_method = 'physical' THEN 'stocked_good'
        WHEN fulfillment_method = 'make_to_order' THEN 'stocked_good'
        WHEN fulfillment_method IN ('service', 'digital') THEN 'service'
        WHEN item_type = 'service' THEN 'service'
        ELSE 'service'
    END,
    delivery_mode = CASE
        WHEN fulfillment_method = 'physical' THEN 'shipped'
        WHEN fulfillment_method = 'make_to_order' THEN 'project'
        WHEN fulfillment_method = 'digital' THEN 'digital'
        WHEN fulfillment_method = 'service' THEN 'scheduled'
        WHEN item_type = 'service' THEN 'scheduled'
        ELSE 'scheduled'
    END,
    tracking_mode = CASE
        WHEN fulfillment_method IN ('service', 'digital') THEN 'none'
        WHEN item_type = 'service' THEN 'none'
        WHEN item_type = 'serialized' THEN 'serialized'
        WHEN item_type IN ('non_serialized', 'consumable') THEN 'bulk'
        ELSE 'none'
    END
WHERE product_kind IS NULL;

ALTER TABLE product MODIFY COLUMN product_kind TEXT NOT NULL;
ALTER TABLE product MODIFY COLUMN delivery_mode TEXT NOT NULL;
ALTER TABLE product MODIFY COLUMN tracking_mode TEXT NOT NULL;

ALTER TABLE product DROP COLUMN IF EXISTS fulfillment_method;
ALTER TABLE product DROP COLUMN IF EXISTS item_type;

-- Fulfillment: rename fulfillment_method → delivery_mode (snapshot column)
ALTER TABLE fulfillment CHANGE COLUMN fulfillment_method delivery_mode TEXT NOT NULL;

-- FulfillmentItem: rename fulfillment_method → delivery_mode (snapshot column)
ALTER TABLE fulfillment_item CHANGE COLUMN fulfillment_method delivery_mode TEXT NOT NULL;
