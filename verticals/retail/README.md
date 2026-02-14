# Retail Vertical - Proto Domain Mapping

This document maps the Esqyma proto domain model to **retail/e-commerce** terminology. Retail is the most natural fit for the schema since the core concepts (Product, Inventory, PriceList, Collection) were designed with retail patterns in mind.

---

## Quick Reference

| Schema Term | Retail Term | Notes |
|---|---|---|
| `client` | **Customer** | Walk-in or registered buyer |
| `staff` | **Store Employee / Sales Associate** | Floor staff, cashiers, managers |
| `delegate` | **Account Representative** | B2B buyer, purchasing agent on behalf of a company |
| `admin` | **Store Manager / Admin** | Back-office operations |
| `location` | **Store / Branch / Warehouse** | Physical retail or fulfillment location |
| `group` | **Customer Segment** | VIP, wholesale, loyalty tier groupings |
| `product` | **Product / SKU** | A sellable item in the catalog |
| `product_variant` | **Product Variant** | Size, color, material variations of a product |
| `collection` | **Product Category / Department** | Hierarchical groupings (e.g., Electronics > Audio > Headphones) |
| `resource` | **Digital Asset** | Product images, manuals, spec sheets attached to a product |
| `inventory_item` | **Stock Item** | A product tracked at a specific store/warehouse |
| `inventory_serial` | **Serial-Tracked Item** | Individual unit with unique serial (electronics, appliances) |
| `inventory_transaction` | **Stock Movement** | Receiving, transfers, adjustments, shrinkage |
| `inventory_depreciation` | **Markdown / Write-Down** | Value reduction for aging or damaged stock |
| `plan` | **Loyalty Program / Membership Tier** | E.g., "Gold Member", "Premium Rewards" |
| `plan_location` | **Program Availability** | Which stores offer a given loyalty program |
| `price_plan` | **Membership Pricing** | Cost to join a loyalty tier (monthly/annual fee) |
| `subscription` | **Customer Membership / Loyalty Enrollment** | A customer's active membership in a program |
| `license` | **Membership Benefit / Perk** | Individual entitlements within a membership (free shipping, discounts) |
| `price_list` | **Seasonal / Regional Price List** | Location-specific or time-bound pricing (holiday sale, regional pricing) |
| `price_product` | **Product Price Override** | Specific price for a product within a price list |
| `invoice` | **Sales Invoice / Receipt** | Transaction record for a purchase |
| `balance` | **Customer Account Balance** | Store credit, outstanding balance for B2B accounts |
| `payment` | **Payment Transaction** | Cash, card, or digital payment |
| `event` | **Promotion / Sale Event** | Flash sale, seasonal promotion, in-store event |
| `event_client` | **Event Participant / RSVP** | Customer registered for an event |
| `event_product` | **Promoted Product** | Products featured in a sale/promotion |
| `revenue` | **Sales Revenue** | Revenue record tied to a store and customer |
| `revenue_line_item` | **Receipt Line Item** | Individual item on a receipt |
| `revenue_category` | **Revenue Category** | In-store, online, wholesale, returns |
| `workflow` | **Order Fulfillment / Return Process** | End-to-end order or return handling |
| `stage` | **Fulfillment Step** | Picked, packed, shipped, delivered |
| `activity` | **Task** | Individual action within a step (print label, scan item) |

---

## Domain Deep Dive

### Entity Domain → People & Places

```
┌──────────────────────────────────────────────────────────┐
│  PEOPLE                                                   │
│                                                           │
│  client          → Customer (the person buying things)    │
│  staff           → Sales Associate / Store Employee       │
│  delegate        → B2B Purchasing Agent                   │
│  admin           → Store Manager                          │
│                                                           │
│  PLACES                                                   │
│                                                           │
│  location        → Store #1 (NYC), Warehouse #3 (NJ)     │
│  workspace       → Retail Brand / Company                 │
│                                                           │
│  ACCESS                                                   │
│                                                           │
│  role            → Cashier, Floor Manager, Stock Clerk    │
│  permission      → can_process_refund, can_view_reports   │
└──────────────────────────────────────────────────────────┘
```

The `client.customer_type` field maps directly: `"retail"`, `"wholesale"`, `"vip"` — these are literal retail customer tiers.

### Product Domain → The Catalog

```
┌──────────────────────────────────────────────────────────┐
│  CATALOG HIERARCHY                                        │
│                                                           │
│  collection (parent)   → Department: "Electronics"        │
│    └── collection      → Category: "Audio"                │
│         └── collection → Subcategory: "Headphones"        │
│              └── product → "Sony WH-1000XM5"              │
│                   ├── product_variant → Black / Large      │
│                   ├── product_variant → Silver / Medium    │
│                   └── resource → product_image.jpg         │
│                                                           │
│  PRICING                                                  │
│                                                           │
│  price_list      → "Holiday 2025 - East Coast Stores"     │
│    └── price_product → Sony WH-1000XM5 @ $299.99          │
│                        (overrides base product.price)      │
│                                                           │
│  product.price   → Base retail price ($349.99)            │
│  product.currency → USD                                   │
└──────────────────────────────────────────────────────────┘
```

The `collection_parent` proto enables the hierarchical Department > Category > Subcategory tree that every retail catalog needs. The `collection_plan` junction links collections to loyalty programs (e.g., "Gold members get 10% off all Audio").

### Inventory Domain → Stock Management

```
┌──────────────────────────────────────────────────────────┐
│  STOCK TRACKING                                           │
│                                                           │
│  inventory_item                                           │
│    ├── name              → "Sony WH-1000XM5 - Black"     │
│    ├── product_id        → FK to product catalog          │
│    ├── location_id       → FK to store/warehouse          │
│    ├── sku               → "SNY-WH1000XM5-BLK"           │
│    ├── quantity_on_hand  → 45 units                       │
│    ├── quantity_reserved → 3 units (pending orders)       │
│    ├── quantity_available→ 42 units                       │
│    ├── reorder_level     → 10 units (trigger restock)     │
│    ├── unit_of_measure   → "each"                         │
│    └── item_type                                          │
│         ├── "serialized"     → Electronics with serial #s │
│         ├── "non_serialized" → Bulk items (t-shirts)      │
│         └── "consumable"     → Packaging, bags, labels    │
│                                                           │
│  inventory_serial    → Individual serial # tracking       │
│  inventory_transaction → Receiving, transfer, adjustment  │
│  inventory_depreciation → Markdown for clearance items    │
└──────────────────────────────────────────────────────────┘
```

This is where the proto model shines for retail. The `InventoryItem` links a `Product` to a `Location` with real-time quantity tracking. The `item_type` enum covers all three retail inventory patterns: serialized high-value goods, bulk non-serialized stock, and consumable supplies.

### Subscription Domain → Loyalty & Memberships

```
┌──────────────────────────────────────────────────────────┐
│  LOYALTY PROGRAM                                          │
│                                                           │
│  plan               → "Gold Rewards Program"              │
│    ├── plan_location → Available at Store #1, Store #2    │
│    ├── fulfillment_type → "license" (benefit-based)       │
│    └── collection_plan → Linked to "Premium Products"     │
│                                                           │
│  price_plan          → "Gold Annual - $99/year"           │
│    ├── amount        → 99.00                              │
│    ├── duration_unit → "year"                             │
│    └── duration_value→ 1                                  │
│                                                           │
│  subscription        → Customer's active membership       │
│    ├── client_id     → FK to customer                     │
│    ├── price_plan_id → FK to chosen tier pricing          │
│    ├── quantity      → Number of benefit slots            │
│    └── license       → Individual perks (free shipping)   │
└──────────────────────────────────────────────────────────┘
```

### Payment & Revenue → Point of Sale

```
┌──────────────────────────────────────────────────────────┐
│  TRANSACTION FLOW                                         │
│                                                           │
│  invoice         → Sales receipt / order confirmation     │
│  payment         → Card tap, cash, digital wallet         │
│  balance         → Store credit / B2B account balance     │
│  revenue         → Daily sales record per store           │
│  revenue_line_item → Each item on the receipt             │
│  revenue_category  → In-store / Online / Returns          │
└──────────────────────────────────────────────────────────┘
```

### Event Domain → Promotions & Sales

| Schema | Retail Example |
|---|---|
| `event` | "Black Friday 2025 Sale" with start/end times |
| `event_client` | Customers who RSVP'd for early access |
| `event_product` | Products included in the promotion |
| `event_recurrence` | Weekly "Flash Friday" deals |

### Workflow Domain → Order & Return Processing

| Schema | Retail Example |
|---|---|
| `workflow_template` | "Standard Order Fulfillment" template |
| `workflow` | Order #12345 fulfillment instance |
| `stage` | Picked → Packed → Shipped → Delivered |
| `activity` | "Scan barcode", "Print shipping label", "Quality check" |
| `activity_execution_log` | Audit trail of who did what and when |

---

## Key Field Mappings

### InventoryItem.item_type Values

| Value | Retail Use Case |
|---|---|
| `"serialized"` | Electronics, appliances, jewelry — each unit tracked by serial number |
| `"non_serialized"` | Apparel, groceries, household goods — tracked by quantity |
| `"consumable"` | Shopping bags, receipt paper, packaging materials |

### Plan.fulfillment_type Values

| Value | Retail Use Case |
|---|---|
| `"license"` | Loyalty membership with benefit entitlements |
| `"physical"` | Subscription box (monthly curated products) |
| `"content"` | Digital catalog access, exclusive content |
| `"schedule"` | Reserved shopping hours (VIP early access) |

### Client.customer_type Values

| Value | Retail Use Case |
|---|---|
| `"retail"` | Individual consumer |
| `"wholesale"` | Business buyer (bulk orders) |
| `"vip"` | High-value customer with special privileges |

---

## Example Scenarios

### Scenario: Customer buys headphones at Store #1

1. **Client** (Customer) walks into **Location** (Store #1 - NYC)
2. **Staff** (Sales Associate) helps them find a **Product** (Sony WH-1000XM5)
3. The **InventoryItem** at this location shows `quantity_available: 42`
4. **PriceList** ("Q4 2025 - East Coast") sets the price via **PriceProduct** ($299.99)
5. An **Invoice** is created, **Payment** is processed
6. **InventoryTransaction** records the sale, `quantity_on_hand` decrements
7. **Revenue** and **RevenueLineItem** are recorded for reporting

### Scenario: B2B wholesale order

1. **Delegate** (Purchasing Agent at Acme Corp) places bulk order
2. **Client** (Acme Corp, `customer_type: "wholesale"`) gets wholesale **PriceList** pricing
3. **Subscription** tracks their annual purchasing agreement
4. **Workflow** manages the fulfillment: Picked → Packed → Shipped → Delivered
5. **Invoice** generated, **Balance** updated for net-30 payment terms

---

## Status-Driven Flow: InventoryTransaction → RevenueLineItem

The `InventoryTransaction.status` field controls when and whether an inventory movement results in revenue recognition. In retail, the common path (POS sale) is near-instant, but several real scenarios require a **pending** state where inventory changes before revenue is recorded.

### Proto Fields That Enable This

```
InventoryTransaction                         RevenueLineItem
├── status           ← lifecycle state       ├── inventory_item_id  ← who/what
├── transaction_type ← what happened         ├── inventory_serial_id← which unit
├── reference_type   ← "order", "return"     ├── quantity           ← how many
├── reference_id     ← FK to order/sub       ├── unit_price         ← from PriceList
├── quantity         ← units moved           ├── total_price        ← qty × price
├── performed_by     ← who did it            └── line_item_type     ← "item"/"discount"
└── serial_number    ← for serialized items
```

### InventoryTransaction.status Values for Retail

| Status | Meaning | Revenue Impact |
|---|---|---|
| `"pending"` | Reserved for an order, not yet fulfilled | No revenue yet |
| `"picked"` | Item pulled from shelf/warehouse bin | No revenue yet |
| `"packed"` | Item packaged for shipment | No revenue yet |
| `"shipped"` | Item dispatched to customer | Revenue recognized (common policy) |
| `"delivered"` | Item received by customer | Revenue recognized (alt. policy) |
| `"completed"` | Transaction finalized | Revenue confirmed |
| `"cancelled"` | Order cancelled, inventory released | No revenue (or reversal) |
| `"return_received"` | Returned item back at warehouse | No credit yet |
| `"inspected"` | Returned item inspected | Credit/refund approved |
| `"restocked"` | Returned item back on shelf | Negative RevenueLineItem |
| `"written_off"` | Damaged/unsellable, removed from stock | → `inventory_depreciation` |
| `"adjustment"` | Shrinkage, count correction, damage | No revenue |
| `"transfer"` | Moved between locations | No revenue |

### Scenario A: E-Commerce Order Fulfillment

```
Customer places          ┌──────────┐
online order ──────────▶ │ pending  │ InventoryTransaction created
                         └────┬─────┘   quantity_reserved += 1
                              │         reference_type: "order"
                              ▼         reference_id: "ORD-5678"
                         ┌──────────┐
Staff pulls item ──────▶ │ picked   │ status updated
from warehouse           └────┬─────┘
                              │
                              ▼
                         ┌──────────┐
Boxed and labeled ─────▶ │ packed   │ status updated
                         └────┬─────┘
                              │
                              ▼
                         ┌──────────┐
Carrier picks up ──────▶ │ shipped  │ ◀── REVENUE RECOGNIZED HERE
                         └────┬─────┘     RevenueLineItem created
                              │           quantity_on_hand -= 1
                              ▼
                         ┌──────────┐
Customer receives ─────▶ │delivered │ status updated
                         └────┬─────┘
                              │
                              ▼
                         ┌──────────┐
No issues reported ────▶ │completed │ Transaction finalized
                         └──────────┘
```

**Revenue recognition point**: At `"shipped"` — this is the most common retail e-commerce policy. The `RevenueLineItem` is created with `unit_price` from the applicable `PriceList` and `inventory_item_id` linking back to the specific stock item.

**What if the order is cancelled at `"picked"`?**

```
                         ┌──────────┐
Cancel order ──────────▶ │cancelled │ quantity_reserved -= 1
at any pre-ship stage    └──────────┘ No RevenueLineItem created
                                      Item returned to available stock
```

### Scenario B: In-Store Return

```
Customer brings          ┌────────────────┐
item back ─────────────▶ │return_received │ InventoryTransaction created
                         └──────┬─────────┘   transaction_type: "return"
                                │              reference_type: "order"
                                │              reference_id: "ORD-5678"
                                ▼
                         ┌──────────┐
Staff checks item ─────▶ │inspected │ Quality check passed?
                         └────┬─────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
              ┌──────────┐        ┌───────────┐
Good shape    │restocked │        │written_off│  Damaged
              └────┬─────┘        └─────┬─────┘
                   │                    │
                   ▼                    ▼
          RevenueLineItem         inventory_depreciation
          (negative amount,       (write-down recorded,
           type: "discount"        no revenue impact)
           → refund to customer)
```

**Revenue recognition point**: At `"restocked"` — a negative `RevenueLineItem` (refund/credit) is created only after inspection confirms the item is resellable. If damaged, it flows to `inventory_depreciation` instead.

### Scenario C: In-Store POS Sale (Instant)

```
Customer at              ┌──────────┐
register ──────────────▶ │completed │ InventoryTransaction created
                         └────┬─────┘   status goes directly to "completed"
                              │         quantity_on_hand -= 1
                              │
                              ▼
                    RevenueLineItem created simultaneously
                    ├── quantity: 1
                    ├── unit_price: $299.99 (from PriceList)
                    ├── inventory_item_id: FK to stock item
                    └── inventory_serial_id: "SN-XM5-00847" (if serialized)
```

The POS sale is the **degenerate case** — `status` goes straight to `"completed"` with no intermediate steps. The `InventoryTransaction` and `RevenueLineItem` are created in the same operation.

### Cross-Vertical Comparison: How Long Does the Lifecycle Take?

The status-driven model is universal, but the **lifecycle length** varies dramatically by vertical and scenario:

```
                              InventoryTransaction Lifecycle
Vertical / Scenario          ◀─────────────────────────────────────▶
─────────────────────────────────────────────────────────────────────
Retail (POS sale)             ■ instant
Retail (e-commerce)           ■■■■■■■ hours to days
Retail (return)               ■■■■■■■■■■ days
Professional Services         ■■■■■■■■■■■■■■ days to weeks
Healthcare                    ■■■■■■■■■■■■■■■■■■■■ days to months
Construction                  ■■■■■■■■■■■■■■■■■■■■■■■■ weeks to months
─────────────────────────────────────────────────────────────────────
                              ▲                              ▲
                        Transaction                    Revenue
                         created                      recognized
```

| Vertical | What triggers the InventoryTransaction? | What triggers RevenueLineItem? |
|---|---|---|
| **Retail (POS)** | Item scanned at register | Same moment |
| **Retail (e-commerce)** | Item reserved for order | Shipment confirmed |
| **Retail (return)** | Item received at store | After inspection |
| **Professional Services** | Staff submits hours | Manager approves timesheet |
| **Healthcare** | Medication dispensed / supply used | Insurance claim approved |
| **Construction** | Materials delivered to job site | Project milestone accepted |
| **Hospitality** | Room reserved / minibar consumed | Guest checkout |

The longer the lifecycle, the more intermediate statuses matter, and the more important it is that the `InventoryTransaction` and `RevenueLineItem` are **separate events** rather than a single atomic operation.
