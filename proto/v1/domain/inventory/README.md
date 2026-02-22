# Inventory Domain

The inventory domain answers three questions at different levels of detail:

1. **How much do we have?** (InventoryItem)
2. **Which exact units do we have?** (InventorySerial)
3. **What happened?** (InventoryTransaction, InventorySerialHistory)

---

## Entity Relationship

```
                        ┌─── from product domain ───┐
                        │                            │
                   Product                    ProductVariant
                        │                            │
                        └──────────┬─────────────────┘
                                   │
                              InventoryItem ──────────── Location
                         (stock aggregate per           (from entity domain)
                          product+variant+location)
                                   │
                    ┌──────────────┼──────────────────┐
                    │              │                   │
             InventorySerial  InventoryTransaction  InventoryAttribute
             (individual      (stock movements:     (custom key-value
              physical unit)   receive, transfer,    metadata)
                    │           adjust, sell)
                    │                                  │
        InventorySerialHistory                  InventoryDepreciation
        (immutable audit trail                  (asset value tracking
         per serial lifecycle)                   over time)
```

---

## The Three Layers

### Layer 1: Stock Aggregate (InventoryItem)

`inventory_item.proto` is the **shelf label**. It represents a product at a specific location and tracks quantities:

| Field | Purpose |
|-------|---------|
| `product_id` | Which product (FK to product domain) |
| `product_variant_id` | Which specific SKU variant |
| `location_id` | Where it's stored (FK to entity domain) |
| `quantity_on_hand` | Total physical count |
| `quantity_reserved` | Committed to pending orders |
| `quantity_available` | `on_hand - reserved` (sellable right now) |
| `reorder_level` | When to reorder |
| `item_type` | `"serialized"`, `"non_serialized"`, or `"consumable"` |

One InventoryItem row = "We have 50 iPhone 15 Pro 256GB Black units at Warehouse A."

**Why this exists as a separate entity from Product:**
A product is a catalog concept ("iPhone 15 Pro exists and costs PHP 64,990"). An inventory item is a physical reality ("We have 50 of them in Warehouse A and 12 in Store B"). The same product has different inventory items at different locations, and the quantities change independently.

### Layer 2: Individual Units (InventorySerial)

`inventory_serial.proto` is the **barcode on each box**. It tracks one specific physical unit:

| Field | Purpose |
|-------|---------|
| `inventory_item_id` | Which stock aggregate this belongs to |
| `serial_number` | Globally unique identifier (DB unique constraint) |
| `imei` | For mobile devices |
| `status` | `"available"`, `"reserved"`, `"sold"`, `"damaged"`, `"returned"` |
| `warranty_start/end` | Warranty period tracking |
| `purchase_order` | Which PO brought this unit in |

One InventorySerial row = "Serial SN-ABC-123, IMEI 352456789012345, available, warranty until 2027-01-15."

**Why this is separate from InventoryItem:**

1. **Not all inventory is serialized.** `item_type` can be `"non_serialized"` (bolts, paper) or `"consumable"` (ink, tape). For these, only quantities matter. Embedding serials into the item would force a model that doesn't fit 2 out of 3 item types.

2. **Different read patterns.** The inventory list page needs 25 rows showing quantities. That's 1 query reading 25 InventoryItem rows. If serials were embedded, you'd either load thousands of serial records you don't need, or run COUNT subqueries for each row.

3. **Different write frequencies.** InventoryItem changes rarely (reorder level updates, location reassignment). InventorySerial changes on every sale, return, damage report, or warranty claim. Separating them prevents write contention on the parent row.

4. **Independent scaling.** A high-volume item might have 500+ serials. The serial table grows independently and is paginated via `GetInventorySerialListPageData`.

### Layer 3: History and Audit

Two separate audit trails serve different audiences:

#### InventoryTransaction (aggregate movements)

`inventory_transaction.proto` tracks **bulk stock movements**:

| Field | Purpose |
|-------|---------|
| `inventory_item_id` | Which stock aggregate |
| `transaction_type` | `"receive"`, `"sell"`, `"transfer"`, `"adjust"`, `"return"` |
| `quantity` | How many units moved |
| `from_location_id` | Source location (for transfers) |
| `to_location_id` | Destination location (for transfers) |
| `serial_number` | Optional: which specific serial, if applicable |
| `performed_by` | Who did this |

Audience: **warehouse manager**. "What stock movements happened today?"

#### InventorySerialHistory (per-unit lifecycle)

`serial_history/inventory_serial_history.proto` is an **immutable event log** per serial:

| Field | Purpose |
|-------|---------|
| `inventory_serial_id` | Which specific unit |
| `from_status` / `to_status` | The state transition (`"available"` -> `"sold"`) |
| `reference_type` | What caused it (`"sale"`, `"return"`, `"damage"`, `"manual"`) |
| `reference_id` | Link to the causing record (e.g., revenue_id) |
| `changed_by` | Who made this change |
| `changed_by_role` | Their role at the time |

Audience: **customer service / auditor**. "What happened to serial SN-ABC-123? Who sold it, and was it ever returned?"

This is append-only by design (no Update RPC in the service definition). Records are never modified, only appended, creating a complete chain of custody.

**Why two separate audit trails:**
A single bulk transfer creates 1 InventoryTransaction ("moved 50 units from Warehouse A to Store B") but could affect 50 InventorySerialHistory records (each serial transitioning from one location context to another). These serve fundamentally different query patterns.

---

## Supporting Entities

### InventoryAttribute

`inventory_attribute.proto` provides **extensible metadata** for inventory items without schema changes:

```
InventoryItem: "iPhone 15 Pro at Warehouse A"
  ├── InventoryAttribute: bin_location = "A-12-3"
  ├── InventoryAttribute: shelf_life_days = "365"
  └── InventoryAttribute: handling_instructions = "Fragile"
```

Uses the shared `common.Attribute` definition for the attribute key, making attributes discoverable and typed across the system.

### InventoryDepreciation

`inventory_depreciation.proto` tracks **asset value over time** for fixed-asset inventory:

| Field | Purpose |
|-------|---------|
| `method` | Depreciation method (straight-line, declining balance, etc.) |
| `cost_basis` | Original purchase cost |
| `salvage_value` | Expected value at end of useful life |
| `useful_life_months` | How long before fully depreciated |
| `accumulated_depreciation` | Total depreciation to date |
| `book_value` | Current book value (`cost_basis - accumulated_depreciation`) |

This is relevant for businesses tracking asset value for accounting (linking to the fycha/ledger domain for financial reporting).

---

## Cross-Domain Boundaries

The inventory domain deliberately does **not** own product definitions or entity/location data. Instead, it references them through foreign keys:

| FK Field | Points To | Domain |
|----------|-----------|--------|
| `product_id` | `Product` | product |
| `product_variant_id` | `ProductVariant` | product |
| `location_id` | `Location` | entity |

This separation means:
- Renaming a product doesn't require updating inventory records
- A product can exist in the catalog without any inventory (pre-launch)
- Inventory can be tracked at locations defined by the entity domain
- The inventory domain stays focused on quantities, units, and movements

---

## Real-World Analogy

Think of a retail electronics store:

| Concept | Entity | Example |
|---------|--------|---------|
| Shelf label | InventoryItem | "iPhone 15 Pro 256GB Black - Qty: 50 - Reorder at: 10" |
| Barcode on each box | InventorySerial | "SN-ABC-123, warranty 2027-01-15, status: available" |
| Receiving log | InventoryTransaction | "Received 50 units from supplier on 2026-02-01" |
| Unit history card | InventorySerialHistory | "SN-ABC-123: available -> sold (sale #R-001, by staff-42)" |
| Bin location sticker | InventoryAttribute | "Bin A-12-3, handle with care" |
| Asset register | InventoryDepreciation | "Cost: PHP 50,000, book value: PHP 35,000 after 12 months" |

The warehouse manager reads the shelf label (InventoryItem). The customer service agent scans the barcode (InventorySerial). The accountant checks the asset register (InventoryDepreciation). Each entity serves a different person asking a different question about the same physical goods.
