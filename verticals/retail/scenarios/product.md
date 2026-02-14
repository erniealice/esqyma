# Retail Scenarios: Product (Catalog)

Product scenarios cover catalog management including variant creation, seasonal collections, pricing, and product lifecycle.

---

## Adding a New Product with Variants

```
Product "Nike Air Max 90"
  ├── name: "Nike Air Max 90"
  ├── description: "Classic running shoe"
  ├── price: 129.99 (base retail)
  ├── currency: "USD"
  │
  ├── product_collection → Collection "Footwear" → "Running Shoes"
  │
  ├── ProductVariant "White / Size 9"
  │    ├── sku: "NK-AM90-WHT-09"
  │    ├── variant_attributes: {"color": "White", "size": "9"}
  │    └── price_override: 0 (no override, use base $129.99)
  │
  ├── ProductVariant "White / Size 10"
  │    ├── sku: "NK-AM90-WHT-10"
  │    └── variant_attributes: {"color": "White", "size": "10"}
  │
  ├── ProductVariant "Black / Size 9" (limited edition)
  │    ├── sku: "NK-AM90-BLK-09-LE"
  │    ├── variant_attributes: {"color": "Black", "size": "9", "edition": "limited"}
  │    └── price_override: 159.99 (premium for limited edition)
  │
  ├── Resource "product_hero_image.jpg"
  └── Resource "size_guide.pdf"

Then create InventoryItems per variant per location:
  ├── InventoryItem: "NK-AM90-WHT-09" at Store #1, qty: 24, item_type: "non_serialized"
  ├── InventoryItem: "NK-AM90-WHT-09" at Store #2, qty: 18, item_type: "non_serialized"
  ├── InventoryItem: "NK-AM90-WHT-10" at Store #1, qty: 20, item_type: "non_serialized"
  └── ...
```

**Key insight**: `ProductVariant.variant_attributes` (map<string, string>) holds the dimension values (color, size). Each variant gets its own SKU and optional price override. `InventoryItem` is created per variant per location — it's the matrix of *what* x *where*.

---

## Seasonal Collection and Price List Launch

```
Step 1: Create collection hierarchy
  Collection "Holiday 2025"
    ├── Collection "Gift Sets"
    └── Collection "Stocking Stuffers"

Step 2: Assign products to collections
  product_collection → "Gift Set: Audio Bundle" in "Gift Sets"
  product_collection → "USB-C Cable 3-pack" in "Stocking Stuffers"

Step 3: Create regional price lists
  PriceList "Holiday 2025 - East Coast"
    ├── location_id: null (or FK to region group)
    ├── date_start: Nov 15, 2025
    ├── date_end: Jan 2, 2026
    ├── PriceProduct: "Audio Bundle" → $199.99 (was $249.99)
    └── PriceProduct: "USB-C 3-pack" → $9.99 (was $14.99)

Step 4: Link collection to loyalty plan
  collection_plan → "Holiday 2025" linked to "Gold Rewards"
  (Gold members get early access to holiday pricing via plan_location + event)
```

---

## Discontinuing a Product

```
Product "Old Model Headphones" → active: false

Impact:
  ├── InventoryItems remain (active: true) to sell through remaining stock
  ├── InventoryItem.quantity_on_hand still tracked
  ├── No new InventoryItems created at new locations
  ├── PriceProducts can be marked down via new PriceList
  │    └── PriceList "Clearance Q1 2026"
  │         └── PriceProduct: "Old Model" → $49.99 (was $149.99)
  └── Once quantity_on_hand = 0 at all locations:
       └── InventoryItems → active: false
```
