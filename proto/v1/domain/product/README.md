# Product Domain

The product domain models what a business **sells** and how it's **organized** and **priced**. It answers:

1. **What do we sell?** (Product, ProductVariant)
2. **What options does it come in?** (ProductOption, ProductOptionValue, ProductVariantOption)
3. **How is it organized?** (Collection, ProductCollection, CollectionParent)
4. **How much does it cost?** (PriceList, PriceProduct)
5. **What else do we know about it?** (ProductAttribute, Resource, ProductVariantImage)

---

## Entity Relationship

```
                    Collection ◄──── CollectionParent ────► Collection
                   (category)        (hierarchy: parent    (parent category)
                        │              → child)
                        │
                  ProductCollection
                  (many-to-many)         CollectionAttribute
                        │               (category metadata)
                        │
                     Product ─────────── ProductAttribute
                (catalog entry:          (brand, image URL,
                 "iPhone 16 Pro")         extensible metadata)
                   │       │
                   │    ProductPlan           PriceList
                   │    (plan/enrollment       (seasonal/
                   │     pricing)              location pricing)
                   │                              │
              ProductOption                  PriceProduct
             (configurable                   (product price
              dimension)                      in a list)
                   │
           ProductOptionValue
          (specific choice within
           an option)
                   │
           ProductVariantOption ───► ProductVariant ───► ProductVariantImage
          (links a variant to         (purchasable       (variant-specific
           its option values)          SKU unit)           photos)
                                          │
                                          │
                                    ┌─────┴─────┐
                                    │           │
                               (to inventory   (to revenue
                                domain)         domain)
```

---

## The Catalog Layer

### Product

`product.proto` is the **abstract catalog entry** — the thing a customer recognizes by name:

| Field | Purpose |
|-------|---------|
| `name` | Display name ("iPhone 16 Pro") |
| `description` | Marketing copy |
| `price` | Base/default price |
| `currency` | Price currency |

A Product is **not purchasable on its own** when variants exist. It's the parent concept. "iPhone 16 Pro" is a product; "iPhone 16 Pro Black 256GB" is a variant you actually buy.

### ProductVariant

`product_variant.proto` is the **purchasable SKU** — the specific combination of options:

| Field | Purpose |
|-------|---------|
| `product_id` | Parent product (FK) |
| `sku` | Stock-keeping unit code ("IPH16P-BLK-256") |
| `price_override` | Variant-specific price (0 = use product base price) |

**Why separate from Product?**
A single product like "iPhone 16 Pro" can have 16+ variants (4 colors x 4 storage capacities). Each variant has its own SKU, potentially its own price, its own images, and its own inventory. Flattening these into a single Product table would create massive duplication of the shared name, description, and catalog metadata.

### ProductVariantImage

`product_variant_image.proto` stores **variant-specific photos**:

| Field | Purpose |
|-------|---------|
| `product_variant_id` | Which variant (FK) |
| `image_url` | Image location |
| `sort_order` | Display order in gallery |
| `is_primary` | Hero image flag |

Separate from ProductVariant because a variant can have multiple images (front, back, side, lifestyle), and images need their own sort order and primary flag.

---

## The Options System

The options system was introduced to replace a JSONB `variant_attributes` map on ProductVariant. See `20260217-variant-architecture-decision.md` for the full rationale.

### The three-table normalized chain:

```
ProductOption: "Color" (sort_order: 1, required: true)
├── ProductOptionValue: "Black"    (sort_order: 1, metadata: {"hex": "#000"})
├── ProductOptionValue: "Blue"     (sort_order: 2, metadata: {"hex": "#00F"})
├── ProductOptionValue: "White"    (sort_order: 3, metadata: {"hex": "#FFF"})
└── ProductOptionValue: "Titanium" (sort_order: 4, metadata: {"hex": "#8B8"})

ProductOption: "Storage" (sort_order: 2, required: true)
├── ProductOptionValue: "128GB"  (sort_order: 1)
├── ProductOptionValue: "256GB"  (sort_order: 2)
├── ProductOptionValue: "512GB"  (sort_order: 3)
└── ProductOptionValue: "1TB"    (sort_order: 4)

ProductVariant: "IPH16P-BLK-256" (sku)
├── ProductVariantOption → Black
└── ProductVariantOption → 256GB

ProductVariant: "IPH16P-BLU-128" (sku)
├── ProductVariantOption → Blue
└── ProductVariantOption → 128GB
```

### ProductOption

`product_option.proto` defines a **configurable dimension** of a product:

| Field | Purpose |
|-------|---------|
| `product_id` | Which product this option belongs to (FK) |
| `name` | Human-readable name ("Color", "Storage Capacity") |
| `code` | Machine-readable key ("color", "storage") |
| `data_type` | How values are entered (`"text_list"`, future: `"number_range"`, `"color_picker"`) |
| `sort_order` | Display order on the product page |
| `required` | Must a variant have a value for this option? |
| `min_value` / `max_value` | For numeric option types |

### ProductOptionValue

`product_option_value.proto` defines a **specific choice** within an option:

| Field | Purpose |
|-------|---------|
| `product_option_id` | Parent option (FK) |
| `label` | Display text ("Black") |
| `value` | Stored value ("black") |
| `sort_order` | Display order (buttons render in this sequence) |
| `metadata` | JSONB for extra display data (color hex, icon URL, etc.) |

Unique constraint: `(product_option_id, value)` prevents duplicate values per option.

### ProductVariantOption

`product_variant_option.proto` is the **junction table** linking a variant to its option values:

| Field | Purpose |
|-------|---------|
| `product_variant_id` | Which variant (FK) |
| `product_option_value_id` | Which option value (FK) |

Unique constraint: `(product_variant_id, product_option_value_id)` prevents duplicate assignments.

**Why three tables instead of a JSONB map?**
- Referential integrity (no typos: "Bleu" vs "Blue")
- Structured option discovery ("what colors exist?") without scanning variant rows
- Sort order control (buttons render in defined sequence)
- Metadata support (color swatches need hex codes)
- Admin UI can populate dropdowns from `product_option_value`
- Standard SQL JOINs instead of PostgreSQL-specific JSONB operators

---

## The Organization Layer

### Collection

`collection.proto` is a **category or grouping** for products:

| Field | Purpose |
|-------|---------|
| `name` | Category name ("Smartphones", "Accessories") |
| `description` | Category description |

### CollectionParent

`collection_parent.proto` creates a **hierarchy** between collections:

| Field | Purpose |
|-------|---------|
| `collection_parent_id` | Parent collection (FK) |
| `collection_id` | Child collection (FK) |

Unique constraint: `(collection_parent_id, collection_id)`.

This is a junction table (not a `parent_id` on Collection itself) because it supports **multiple parents** — a "Wireless Earbuds" collection could appear under both "Audio" and "Accessories".

### ProductCollection

`product_collection.proto` is the **many-to-many** link between products and collections:

| Field | Purpose |
|-------|---------|
| `product_id` | The product (FK) |
| `collection_id` | The collection (FK) |
| `sort_order` | Product's position within the collection |

Unique constraint: `(product_id, collection_id)`.

A product can belong to multiple collections ("iPhone 16 Pro" in both "Smartphones" and "New Arrivals"), and collections contain multiple products.

### CollectionAttribute

`collection_attribute.proto` provides **extensible metadata** on collections:

| Field | Purpose |
|-------|---------|
| `collection_id` | The collection (FK) |
| `attribute_id` | Shared attribute definition (FK to `common.Attribute`) |
| `value` | Attribute value |

Unique constraint: `(collection_id, attribute_id)`.

Used for things like collection banner images, SEO descriptions, or display settings without adding columns to the Collection table.

### CollectionPlan

`collection_plan.proto` links collections to **subscription plans**:

| Field | Purpose |
|-------|---------|
| `collection_id` | The collection (FK) |
| `plan_id` | The subscription plan (FK) |

This supports the educational use case where collections represent course categories and plans represent academic years/enrollment periods.

---

## The Pricing Layer

### PriceList

`price_list.proto` represents a **named pricing context**:

| Field | Purpose |
|-------|---------|
| `name` | List name ("Summer Sale 2026", "Manila Store Prices") |
| `date_start` / `date_end` | Validity period |
| `location_id` | Optional: location-specific pricing (FK to entity domain) |

Price lists enable seasonal pricing, location-based pricing, and promotional campaigns without modifying the product's base price.

### PriceProduct

`price_product.proto` is a **product's price within a specific price list**:

| Field | Purpose |
|-------|---------|
| `product_id` | The product (FK) |
| `price_list_id` | Which price list (FK) |
| `name` | Price entry name ("Holiday Discount") |
| `amount` | Price in smallest currency unit |
| `currency` | Currency code |
| `date_start` / `date_end` | When this specific price is active |

**Why separate from Product.price?**
The base price on Product is the default. PriceProduct overrides it for specific contexts. A product might have a base price of PHP 64,990 but a "Summer Sale" PriceProduct of PHP 59,990 that's only active June-August at Manila stores. Multiple price lists can coexist, and the system resolves which one applies based on date and location.

---

## Supporting Entities

### ProductAttribute

`product_attribute.proto` provides **extensible metadata** for products:

| Field | Purpose |
|-------|---------|
| `product_id` | The product (FK) |
| `attribute_id` | Shared attribute definition (FK to `common.Attribute`) |
| `value` | Attribute value |

Unique constraint: `(product_id, attribute_id)`.

Used for things like brand name, hero image URL, weight, dimensions — anything that applies to the product as a whole (not variant-specific). These are surfaced in storefront queries and admin detail pages.

**Attributes vs Options:** Attributes describe the product ("brand: Apple", "image: hero.jpg"). Options define what a customer **chooses** ("Color: Black", "Storage: 256GB"). Attributes don't create variants; options do.

### ProductPlan

`product_plan.proto` links products to **subscription/enrollment plans**:

| Field | Purpose |
|-------|---------|
| `product_id` | The product (FK) |
| `name` | Plan entry name |
| `price` / `currency` | Plan-specific pricing |

This supports the educational use case where a product (course/subject) is included in an enrollment plan at a specific price.

### Resource

`resource.proto` represents **digital assets** attached to a product:

| Field | Purpose |
|-------|---------|
| `product_id` | The product (FK) |
| `name` | Resource name ("User Manual", "Getting Started Guide") |
| `description` | Resource description |

---

## Cross-Domain Boundaries

The product domain is a **dependency source** — other domains reference it, but it does not reference them:

| Consuming Domain | FK Field | Purpose |
|-----------------|----------|---------|
| inventory | `InventoryItem.product_id` | Stock tracking per product |
| inventory | `InventoryItem.product_variant_id` | Stock per variant |
| revenue | `Revenue.product_id` | Sales records |
| entity (via PriceList) | `PriceList.location_id` | Location-specific pricing |

This means:
- Products can exist without inventory (catalog-only, pre-launch)
- Products can exist without pricing overrides (use base price)
- Deleting inventory doesn't affect the product catalog
- The product domain stays focused on **what we sell** and **how it's configured**

---

## Real-World Analogy

Think of an electronics retailer's product catalog:

| Concept | Entity | Example |
|---------|--------|---------|
| Product page | Product | "iPhone 16 Pro" with description and base price |
| Color/storage selector | ProductOption + ProductOptionValue | Buttons: Black, Blue, White + 128GB, 256GB |
| Add-to-cart SKU | ProductVariant | "IPH16P-BLK-256" at PHP 64,990 |
| Product photos | ProductVariantImage | Black model front/back/side photos |
| Category page | Collection | "Smartphones" |
| Category tree | CollectionParent | Electronics > Mobile > Smartphones |
| Product in category | ProductCollection | iPhone 16 Pro listed in "Smartphones" |
| Sale tag | PriceList + PriceProduct | "Summer Sale" at PHP 59,990 (Jun-Aug) |
| Spec sheet | ProductAttribute | Brand: Apple, Weight: 199g |

The catalog manager creates Products and Options. The merchandiser assigns them to Collections. The pricing team creates PriceLists. The warehouse receives them as InventoryItems. Each entity serves a different role in the business.
