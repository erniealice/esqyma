-- Migration: product_taxonomy_refactor (down)
-- Dialect: mysql
-- Created: 2026-04-18T00:00:00Z

-- Fulfillment: rename delivery_mode → fulfillment_method
ALTER TABLE fulfillment_item CHANGE COLUMN delivery_mode fulfillment_method TEXT NOT NULL;
ALTER TABLE fulfillment CHANGE COLUMN delivery_mode fulfillment_method TEXT NOT NULL;

-- Product: re-add old columns, inverse-map from new values, drop new columns
ALTER TABLE product ADD COLUMN IF NOT EXISTS item_type TEXT;
ALTER TABLE product ADD COLUMN IF NOT EXISTS fulfillment_method TEXT;

UPDATE product SET
    item_type = CASE
        WHEN product_kind = 'service' THEN 'non_serialized'
        WHEN product_kind = 'stocked_good' AND tracking_mode = 'serialized' THEN 'serialized'
        WHEN product_kind = 'stocked_good' THEN 'non_serialized'
        WHEN product_kind = 'consumable' THEN 'consumable'
        WHEN product_kind = 'non_stocked_good' THEN 'non_serialized'
        ELSE 'non_serialized'
    END,
    fulfillment_method = CASE
        WHEN product_kind = 'non_stocked_good' THEN 'physical'
        WHEN delivery_mode = 'shipped' THEN 'physical'
        WHEN delivery_mode = 'project' THEN 'make_to_order'
        WHEN delivery_mode = 'digital' THEN 'digital'
        ELSE 'service'
    END
WHERE item_type IS NULL OR fulfillment_method IS NULL;

ALTER TABLE product MODIFY COLUMN item_type TEXT NOT NULL;
ALTER TABLE product MODIFY COLUMN fulfillment_method TEXT NOT NULL;

ALTER TABLE product DROP COLUMN IF EXISTS product_kind;
ALTER TABLE product DROP COLUMN IF EXISTS delivery_mode;
ALTER TABLE product DROP COLUMN IF EXISTS tracking_mode;
