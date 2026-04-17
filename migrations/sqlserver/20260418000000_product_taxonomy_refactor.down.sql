-- Migration: product_taxonomy_refactor (down)
-- Dialect: sqlserver
-- Created: 2026-04-18T00:00:00Z

-- Fulfillment: rename delivery_mode → fulfillment_method
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('fulfillment_item') AND name = 'delivery_mode')
    EXEC sp_rename 'dbo.fulfillment_item.delivery_mode', 'fulfillment_method', 'COLUMN';
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('fulfillment') AND name = 'delivery_mode')
    EXEC sp_rename 'dbo.fulfillment.delivery_mode', 'fulfillment_method', 'COLUMN';
GO

-- Product: re-add old columns, inverse-map from new values, drop new columns
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'item_type')
    ALTER TABLE product ADD item_type NVARCHAR(MAX);
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'fulfillment_method')
    ALTER TABLE product ADD fulfillment_method NVARCHAR(MAX);
GO

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
GO

ALTER TABLE product ALTER COLUMN item_type NVARCHAR(MAX) NOT NULL;
ALTER TABLE product ALTER COLUMN fulfillment_method NVARCHAR(MAX) NOT NULL;
GO

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'product_kind')
    ALTER TABLE product DROP COLUMN product_kind;
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'delivery_mode')
    ALTER TABLE product DROP COLUMN delivery_mode;
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'tracking_mode')
    ALTER TABLE product DROP COLUMN tracking_mode;
GO
