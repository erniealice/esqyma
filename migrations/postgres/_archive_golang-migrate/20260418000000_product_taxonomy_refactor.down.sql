-- Migration: product_taxonomy_refactor (down)
-- Dialect: postgres
-- Created: 2026-04-18T00:00:00Z

-- Fulfillment: rename delivery_mode → fulfillment_method
ALTER TABLE fulfillment_item RENAME COLUMN delivery_mode TO fulfillment_method;
ALTER TABLE fulfillment RENAME COLUMN delivery_mode TO fulfillment_method;

-- Product: re-add old columns, inverse-map from new values, drop new columns
ALTER TABLE product ADD COLUMN IF NOT EXISTS item_type TEXT;
ALTER TABLE product ADD COLUMN IF NOT EXISTS fulfillment_method TEXT;

UPDATE product SET
    item_type = CASE
        WHEN product_kind = 'service' THEN 'non_serialized'
        WHEN product_kind = 'stocked_good' AND tracking_mode = 'serialized' THEN 'serialized'
        WHEN product_kind = 'stocked_good' THEN 'non_serialized'
        WHEN product_kind = 'consumable' THEN 'consumable'
        WHEN product_kind = 'non_stocked_good' THEN 'non_serialized'  -- data loss: non_stocked_good collapses to non_serialized
        ELSE 'non_serialized'
    END,
    fulfillment_method = CASE
        WHEN product_kind = 'non_stocked_good' THEN 'physical'  -- data loss: collapses to physical
        WHEN delivery_mode = 'shipped' THEN 'physical'
        WHEN delivery_mode = 'project' THEN 'make_to_order'
        WHEN delivery_mode = 'digital' THEN 'digital'
        ELSE 'service'
    END
WHERE item_type IS NULL OR fulfillment_method IS NULL;

ALTER TABLE product ALTER COLUMN item_type SET NOT NULL;
ALTER TABLE product ALTER COLUMN fulfillment_method SET NOT NULL;

ALTER TABLE product DROP COLUMN IF EXISTS product_kind;
ALTER TABLE product DROP COLUMN IF EXISTS delivery_mode;
ALTER TABLE product DROP COLUMN IF EXISTS tracking_mode;
