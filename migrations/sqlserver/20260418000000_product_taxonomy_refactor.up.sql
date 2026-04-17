-- Migration: product_taxonomy_refactor (up)
-- Dialect: sqlserver
-- Created: 2026-04-18T00:00:00Z

-- Product: split item_type + fulfillment_method into product_kind + delivery_mode + tracking_mode
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'product_kind')
    ALTER TABLE product ADD product_kind NVARCHAR(MAX);
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'delivery_mode')
    ALTER TABLE product ADD delivery_mode NVARCHAR(MAX);
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'tracking_mode')
    ALTER TABLE product ADD tracking_mode NVARCHAR(MAX);
GO

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
GO

ALTER TABLE product ALTER COLUMN product_kind NVARCHAR(MAX) NOT NULL;
ALTER TABLE product ALTER COLUMN delivery_mode NVARCHAR(MAX) NOT NULL;
ALTER TABLE product ALTER COLUMN tracking_mode NVARCHAR(MAX) NOT NULL;
GO

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'fulfillment_method')
    ALTER TABLE product DROP COLUMN fulfillment_method;
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('product') AND name = 'item_type')
    ALTER TABLE product DROP COLUMN item_type;
GO

-- Fulfillment: rename fulfillment_method → delivery_mode (snapshot column)
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('fulfillment') AND name = 'fulfillment_method')
    EXEC sp_rename 'dbo.fulfillment.fulfillment_method', 'delivery_mode', 'COLUMN';
GO

-- FulfillmentItem: rename fulfillment_method → delivery_mode (snapshot column)
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('fulfillment_item') AND name = 'fulfillment_method')
    EXEC sp_rename 'dbo.fulfillment_item.fulfillment_method', 'delivery_mode', 'COLUMN';
GO
