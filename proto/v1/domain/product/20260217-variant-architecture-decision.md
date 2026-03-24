# Architecture Decision: Product Variant & Inventory Modeling

**Date:** 2026-02-17
**Status:** Decided — Option B (Normalized tables)
**Scope:** esqyma protos, storefront queries, future admin product management
**Blocks:** SKU fix, Phase 3 (variant images), Phase 8 (E2E tests)

---

## 1. Problem Background

### 1a. Immediate Blocker — SKU Column Error

The retail-client storefront is completely broken. Every request to `StorefrontService.ListProducts()` or `GetProduct()` returns:

```
pq: column p.sku does not exist
```

The product grid renders empty, and the product detail page returns a 500 error. This was discovered on 2026-02-15 (session 2) after completing the store selector fix. The root cause: `storefront_db.go` CTE queries reference `p.sku` on the `product` table, but **SKU has never been a product-level field** — it belongs on `product_variant`.

Six sites are affected across SQL queries (lines 39, 105, 195), Go scan logic (lines 249/266/298 and 334/349/381), and one template (`detail.html:49`).

### 1b. Deeper Question — How Should Variants Work?

Fixing the SKU error is trivial (remove `p.sku` references), but it surfaced a larger architectural question: **how should the storefront discover and filter by variant attributes like color and storage capacity?**

The current schema stores variant attributes as a JSONB map on `product_variant`:

```proto
// product_variant.proto (field 6)
map<string, string> variant_attributes = 6;
```

In the database:
```
product_variant.variant_attributes = '{"color": "Blue", "storage": "128GB"}'::jsonb
```

This raised the question: is JSONB sufficient for searching "all Blue products regardless of storage capacity", or do we need a normalized relational structure?

---

## 2. Findings

### 2a. Existing Schema (What We Have Today)

**Product level:**
| Proto | Key Fields | Purpose |
|-------|-----------|---------|
| `product.proto` | id, name, description, price, currency | Base product (e.g., "iPhone 16 Pro") |
| `product_collection.proto` | product_id, collection_id | Many-to-many: product belongs to collections |
| `product_attribute.proto` | product_id, attribute_id, value | Product-level attributes (brand, image, etc.) |

**Variant level:**
| Proto | Key Fields | Purpose |
|-------|-----------|---------|
| `product_variant.proto` | id, product_id, sku, price_override, **variant_attributes (JSONB map)** | Individual SKU with freeform attribute values |
| `product_variant_image.proto` | id, product_variant_id, image_url, sort_order | Variant-specific images |

**Inventory level:**
| Proto | Key Fields | Purpose |
|-------|-----------|---------|
| `inventory_item.proto` | id, **product_variant_id**, location_id, sku, quantity_on_hand/reserved/available | Stock per variant per location |
| `inventory_attribute.proto` | inventory_item_id, attribute_id, value | Inventory-specific attributes |
| `inventory_serial.proto` | inventory_item_id, serial_number, imei, status | Serialized unit tracking |
| `inventory_transaction.proto` | inventory_item_id, transaction_type, quantity | Stock movement history |

**Common:**
| Proto | Key Fields | Purpose |
|-------|-----------|---------|
| `attribute.proto` | id, name, code, data_type, module | Shared attribute definitions |

### 2b. How JSONB variant_attributes Works in Practice

**Storage:** Protobuf `map<string, string>` serializes to PostgreSQL `JSONB` via espyna's protojson pipeline:
```
Proto map[string]string → protojson.Marshal → JSON → lib/pq → JSONB column
```

**Seeder data (retail-admin):**
```sql
INSERT INTO "product_variant" (id, product_id, sku, variant_attributes, ...)
VALUES
  ('test-pv-iphone-blk-256', 'test-prod-001', 'IPH17PM-BLK-256', '{"color":"Black","storage":"256GB"}'::jsonb, ...),
  ('test-pv-iphone-blu-128', 'test-prod-001', 'IPH17PM-BLU-128', '{"color":"Blue","storage":"128GB"}'::jsonb, ...);
```

**Read-back gap:** Espyna's CTE queries in `product_variant.go` scan `variant_attributes` as `[]byte` but **do not deserialize it back** into the protobuf `map[string]string`. The field is scanned and discarded.

**Retail-client storefront:** Does not reference `product_variant` or `variant_attributes` at all. The storefront CTEs query `product`, `price_product`, `inventory_item`, and `product_attribute` — but skip variants entirely.

### 2c. JSONB Querying Capabilities

PostgreSQL JSONB supports variant filtering:

```sql
-- Find all Blue variants
WHERE pv.variant_attributes->>'color' = 'Blue'

-- Find Blue + 128GB (containment)
WHERE pv.variant_attributes @> '{"color": "Blue", "storage": "128GB"}'::jsonb

-- Get all distinct colors for a product
SELECT DISTINCT pv.variant_attributes->>'color'
FROM product_variant pv WHERE pv.product_id = ?

-- Indexable with GIN
CREATE INDEX idx_pv_attrs ON product_variant USING GIN (variant_attributes);
```

### 2d. JSONB Limitations Identified

| Concern | Impact |
|---------|--------|
| **No referential integrity** | Freeform text — "Blue", "blue", "Bleu" are all valid, no FK enforcement |
| **No structured option discovery** | "What colors exist for this product?" requires scanning all variant rows |
| **Admin UI difficulty** | Cannot build a "Manage Options" dropdown without scanning all existing values |
| **No sort order on options** | Cannot control the order color buttons appear (Blue before Black) |
| **No metadata on option values** | Cannot store `color_hex: "#0000FF"` alongside the value "Blue" |
| **Aggregation complexity** | Faceted search (e.g., "Colors available in this category") requires JSONB-specific aggregation |
| **Cross-database portability** | JSONB operators are PostgreSQL-specific |

---

## 3. Options Presented

### Option A: Keep JSONB, Add Indexes (Pragmatic)

**Effort:** Small (~1 hour)
**Schema change:** None

- Fix SKU by removing `p.sku` from storefront CTEs
- Join `product_variant` into storefront detail query using `->>`  operators
- Add GIN index on `variant_attributes` for search performance
- Derive option lists from `SELECT DISTINCT variant_attributes->>'color'`

**Pros:**
- No schema migration, no new protos
- JSONB queries work and are indexable
- Fastest path to unblocking the storefront

**Cons:**
- No referential integrity on option values
- Admin product management UI will be freeform text (typo-prone)
- No metadata on options (color swatches, sort order)
- Accumulates tech debt — must normalize later when admin product editing is built

### Option B: Normalize into Relational Option Tables (Future-Proof)

**Effort:** Medium (~4-6 hours for protos + seeders + query integration)
**Schema change:** 3 new protos/tables + remove `variant_attributes` field from `product_variant`

Introduce three new entities in esqyma:

```
product_option
├── id (PK)
├── product_id (FK → product)
├── name (e.g., "Color", "Storage Capacity")
├── sort_order
├── active
└── timestamps

product_option_value
├── id (PK)
├── product_option_id (FK → product_option)
├── value (e.g., "Blue", "128GB")
├── sort_order
├── metadata (JSONB, optional — for color_hex, icon, etc.)
├── active
└── timestamps

product_variant_option
├── id (PK)
├── product_variant_id (FK → product_variant)
├── product_option_value_id (FK → product_option_value)
├── active
└── timestamps
unique_together: product_variant_id, product_option_value_id
```

**Resulting data model:**

```
Product: "iPhone 16 Pro"
│
├── ProductOption: "Color" (sort_order: 1)
│   ├── ProductOptionValue: "Black"    (sort_order: 1, metadata: {"hex": "#000"})
│   ├── ProductOptionValue: "Blue"     (sort_order: 2, metadata: {"hex": "#00F"})
│   ├── ProductOptionValue: "White"    (sort_order: 3, metadata: {"hex": "#FFF"})
│   └── ProductOptionValue: "Titanium" (sort_order: 4, metadata: {"hex": "#8B8"})
│
├── ProductOption: "Storage" (sort_order: 2)
│   ├── ProductOptionValue: "128GB"  (sort_order: 1)
│   ├── ProductOptionValue: "256GB"  (sort_order: 2)
│   ├── ProductOptionValue: "512GB"  (sort_order: 3)
│   └── ProductOptionValue: "1TB"    (sort_order: 4)
│
├── ProductVariant: "IPH17PM-BLK-256" (sku, price_override: 0)
│   ├── ProductVariantOption → "Black"
│   └── ProductVariantOption → "256GB"
│
├── ProductVariant: "IPH17PM-BLU-128" (sku, price_override: 64990)
│   ├── ProductVariantOption → "Blue"
│   └── ProductVariantOption → "128GB"
│
└── ... (more variants)
```

**Query example — "All Blue products":**
```sql
SELECT DISTINCT p.id, p.name
FROM product p
JOIN product_variant pv ON pv.product_id = p.id AND pv.active = true
JOIN product_variant_option pvo ON pvo.product_variant_id = pv.id
JOIN product_option_value pov ON pov.id = pvo.product_option_value_id
JOIN product_option po ON po.id = pov.product_option_id AND po.product_id = p.id
WHERE po.name = 'color' AND pov.value = 'Blue';
```

**Query example — "Available colors for product X":**
```sql
SELECT pov.value, pov.sort_order, pov.metadata
FROM product_option po
JOIN product_option_value pov ON pov.product_option_id = po.id AND pov.active = true
WHERE po.product_id = ? AND po.name = 'color'
ORDER BY pov.sort_order;
```

**Pros:**
- Full referential integrity — FK-enforced values, no typos
- Structured option discovery — `SELECT * FROM product_option_value` is fast and indexed
- Sort order control — color buttons render in defined order
- Metadata support — color hex codes, icons, display labels
- Clean aggregation — standard JOINs, no JSONB operators
- Admin UI ready — dropdowns populated from `product_option_value` table
- Cross-database portable — standard relational SQL

**Cons:**
- More tables and JOINs in queries
- Requires esqyma proto changes, espyna adapter generation, seeder updates
- Migration needed for existing data (retail-admin test seed)
- `variant_attributes` JSONB field removed from `product_variant` (breaking change to proto + DB)

### Option C: Inventory-Level Variants (User's Initial Proposal — Rejected)

Create `inventory_variant.proto` to hold attribute values at the inventory level.

**Rejected because:** Inventory tracks *quantities*, not *product characteristics*. "Blue" is a product variant attribute, not an inventory attribute. The existing `inventory_item.product_variant_id` FK already provides the link. Adding attribute values to inventory would duplicate product data and create sync issues.

---

## 4. Decision

**Selected: Option B — Normalized relational option tables.**

### Rationale

1. The retail-admin product management UI will need structured option editing — JSONB freeform text is insufficient
2. The storefront needs ordered, typed option selectors (color swatches with hex codes, storage capacity buttons in ascending order) — JSONB has no sort order or metadata
3. Faceted filtering ("show all Blue phones in this collection") is cleaner with standard JOINs than JSONB operators
4. The esqyma proto taxonomy already has the `domain/product/` namespace — three new protos fit naturally
5. Removing `variant_attributes` entirely avoids dual-source-of-truth confusion — the normalized tables become the single source of truth for variant attribute data

### What Happens to variant_attributes JSONB

- **Remove field 6** (`map<string, string> variant_attributes`) from `product_variant.proto`
- **Drop the column** (`variant_attributes JSONB`) from the `product_variant` database table
- **Update espyna adapter** — remove `variant_attributes` from CTE scans in `product_variant.go` (lines that scan `[]byte` for this field)
- **Update retail-admin seed SQL** — remove `variant_attributes` from INSERT statements and column lists
- **`product_variant` proto/table remains** — it still holds `id`, `product_id`, `sku`, `price_override`, `active`, and timestamps. It is the SKU entity (the purchasable unit). Only the freeform JSONB map is removed.
- **All attribute data** moves to the normalized chain: `product_variant` → `product_variant_option` → `product_option_value` → `product_option`

---

## 5. Implementation Plan

### Phase A: Proto Definitions (esqyma)

1. Create `packages/esqyma/proto/v1/domain/product/product_option/product_option.proto`
2. Create `packages/esqyma/proto/v1/domain/product/product_option_value/product_option_value.proto`
3. Create `packages/esqyma/proto/v1/domain/product/product_variant_option/product_variant_option.proto`
4. **Remove** `variant_attributes` (field 6, `map<string, string>`) from `product_variant.proto`
5. Run protoc generation for Go structs
6. Verify generated `.pb.go` files compile (fix any references to `VariantAttributes` in Go code)

### Phase B: Database & Seeders

1. Add CREATE TABLE statements to retail-admin test seed SQL
2. Add CREATE TABLE statements to retail-client seeder or migration
3. Seed option data for existing products (iPhone: Color + Storage options)
4. Seed variant-option mappings (link each variant to its color + storage values)
5. Remove `variant_attributes` column from `product_variant` table (DROP COLUMN in seed/migration)
6. Remove `variant_attributes` from retail-admin seed SQL INSERT statements
7. Update espyna `product_variant.go` adapter — remove `variant_attributes` from CTE scans and Go scan variables

### Phase C: Espyna Adapters

1. Generate PostgreSQL repository adapters via espyna patterns (Create/Read/Update/Delete)
2. Register adapters in espyna's use case layer if needed
3. Verify CRUD operations work via espyna's generic `dbOps`

### Phase D: Storefront Query Fix (Unblocks SKU Issue)

1. Fix immediate SKU blocker: remove `p.sku` from storefront CTEs (Option A from SKU issue doc)
2. Join `product_variant` into the detail query for variant display
3. Join `product_option` + `product_option_value` for structured option selectors
4. Update `StorefrontProduct` struct to include variant/option data
5. Update `detail.html` template to render option selectors from structured data

### Phase E: Integration

1. Wire option data into retail-client `container.go` if use cases are needed
2. Update storefront list query to support variant-attribute filtering via JOINs
3. Update admin product management (future) to use option tables for dropdowns

---

## 6. Dependencies & Sequencing

```
Phase A (protos)
  └── Phase B (seeders) ──── can start once tables defined
        └── Phase C (adapters) ── can start once seeders verify schema
              └── Phase D (storefront fix) ── unblocks SKU issue + variant display
                    └── Phase E (integration) ── connects to existing epic phases
```

- **Unblocks:** SKU column error fix, Phase 3 (variant images), Phase 8 (E2E tests)
- **Parallel with:** Phase 2 (storefront UI polish), Phase 5 (order extras — already complete)
- **Does NOT block:** Phase 4 (payment methods), Phase 6 (checkout polish), Phase 9 (notifications)

---

## 7. Related Documents

| Document | Path |
|----------|------|
| SKU issue (original) | `03-progress/20260215-issue-sku-column.md` |
| Phase 5 progress | `03-progress/20260215-1630-phase5-store-selector.md` |
| Epic summary | `00-summary.md` |
| Product proto | `packages/esqyma/proto/v1/domain/product/product/product.proto` |
| Product variant proto | `packages/esqyma/proto/v1/domain/product/product_variant/product_variant.proto` |
| Inventory item proto | `packages/esqyma/proto/v1/domain/inventory/inventory_item/inventory_item.proto` |
| Storefront queries | `apps/retail-client/internal/domain/storefront_db.go` |
| Retail-admin seed SQL | `apps/retail-admin/tests/seed/products-inventory-seed.sql` |
| Espyna variant adapter | `packages/espyna-golang/internal/infrastructure/adapters/secondary/database/postgres/product_variant/product_variant.go` |
