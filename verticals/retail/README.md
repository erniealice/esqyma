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

## Scenarios by Domain

### Sales Scenarios

#### Walk-in POS purchase

```
Customer ──▶ Store #1 (NYC)
             │
             ├── Staff (Sales Associate) assists
             ├── Product: Sony WH-1000XM5 (Black)
             ├── InventoryItem at Store #1: quantity_available = 42
             │
             ▼
         ┌─────────┐     ┌─────────────────┐     ┌─────────────┐
         │ PriceList│────▶│ PriceProduct    │────▶│ Revenue     │
         │ "Q4 2025│     │ Sony @ $299.99  │     │ LineItem    │
         │ East    │     │ (overrides base │     │ qty: 1      │
         │ Coast"  │     │  $349.99)       │     │ price: $299 │
         └─────────┘     └─────────────────┘     └──────┬──────┘
                                                        │
         ┌──────────────┐     ┌─────────┐              │
         │ Inventory    │     │ Invoice │◀─────────────┘
         │ Transaction  │     │ Receipt │
         │ status:      │     └────┬────┘
         │ "completed"  │          │
         │ qty: -1      │     ┌────▼────┐
         └──────────────┘     │ Payment │
                              │ Card tap│
                              │ $299.99 │
                              └─────────┘
```

**Entities involved**: `Client`, `Staff`, `Location`, `Product`, `InventoryItem`, `PriceList`, `PriceProduct`, `InventoryTransaction`, `Revenue`, `RevenueLineItem`, `Invoice`, `Payment`

#### Multi-item cart with mixed pricing

```
Customer adds 3 items to cart at Store #2 (LA):

Item 1: Sony WH-1000XM5
  ├── PriceList "Q4 West Coast" has PriceProduct → $289.99
  └── RevenueLineItem: qty 1, unit_price $289.99

Item 2: AirPods Pro (no PriceList override)
  ├── Falls back to Product.price → $249.00
  └── RevenueLineItem: qty 1, unit_price $249.00

Item 3: USB-C Cable × 3
  ├── PriceList "Q4 West Coast" has PriceProduct → $12.99
  └── RevenueLineItem: qty 3, unit_price $12.99

Revenue.total_amount = $289.99 + $249.00 + (3 × $12.99) = $577.96

Three InventoryTransactions created (one per InventoryItem, status: "completed")
Three RevenueLineItems created (one per line, all line_item_type: "item")
```

**Key insight**: `PriceProduct` overrides `Product.price` when a `PriceList` is active for the location. Items without a `PriceProduct` entry fall back to the base `Product.price`.

#### VIP member discount at checkout

```
Client (customer_type: "vip")
  └── Subscription → Plan "VIP Rewards"
       └── License → "10% off Electronics"
            │
            ▼
       collection_plan links Plan to Collection "Electronics"
            │
            ▼
       Product "Sony WH-1000XM5" is in Collection "Electronics"
            │
            ▼
       RevenueLineItem: qty 1, unit_price $299.99
       RevenueLineItem: qty 1, unit_price -$30.00 (line_item_type: "discount")
       ─────────────────────────────────────────
       Revenue.total_amount = $269.99
```

**Key insight**: Discounts are modeled as separate `RevenueLineItems` with `line_item_type: "discount"` and a negative amount, keeping the audit trail clean.

### Inventory Scenarios

#### Receiving new stock from supplier

```
Delivery truck arrives          ┌──────────┐
at Warehouse #3 (NJ) ────────▶ │ pending  │ InventoryTransaction created
                                └────┬─────┘   transaction_type: "receiving"
                                     │         reference_type: "purchase_order"
                                     │         reference_id: "PO-2025-789"
                                     │         quantity: 200
                                     ▼
                                ┌──────────┐
Staff counts & scans ─────────▶│completed │ quantity_on_hand += 200
                                └──────────┘

InventoryItem "Sony WH-1000XM5 - Black" at Warehouse #3:
  Before: quantity_on_hand = 12
  After:  quantity_on_hand = 212
```

#### Inter-store transfer

```
Store #1 (NYC) has excess      ┌───────────┐
stock, Store #2 (LA) low ────▶ │ transfer  │ InventoryTransaction
                               └─────┬─────┘   from_location_id: Store #1
                                     │         to_location_id: Store #2
                                     │         quantity: 20
                                     │         performed_by: "stock-clerk-5"
                                     ▼
                Store #1 InventoryItem: quantity_on_hand -= 20
                Store #2 InventoryItem: quantity_on_hand += 20

No RevenueLineItem — transfers are internal movements, not sales.
```

#### Cycle count adjustment (shrinkage)

```
Annual stock count at          ┌────────────┐
Store #1 finds 3 missing ───▶ │ adjustment │ InventoryTransaction
                               └──────┬─────┘   transaction_type: "shrinkage"
                                      │         quantity: -3
                                      │         notes: "Annual cycle count
                                      │                 variance - Section B4"
                                      ▼
                  ┌──────────────────────────────────┐
                  │ inventory_depreciation            │
                  │ 3 × $299.99 = $899.97 write-down │
                  └──────────────────────────────────┘

No RevenueLineItem — shrinkage is never revenue.
quantity_on_hand adjusted: 45 → 42
```

#### Serialized item tracking

```
InventoryItem: "MacBook Pro 16-inch M4" at Store #1
  ├── item_type: "serialized"
  ├── quantity_on_hand: 8
  └── Each unit has an inventory_serial record:
       ├── serial_number: "FVFG20250001"
       ├── serial_number: "FVFG20250002"
       ├── ...
       └── serial_number: "FVFG20250008"

On sale:
  InventoryTransaction
    ├── serial_number: "FVFG20250003" ← specific unit sold
    └── status: "completed"
  RevenueLineItem
    ├── inventory_item_id: FK to "MacBook Pro at Store #1"
    └── inventory_serial_id: FK to serial "FVFG20250003"

On warranty return:
  New InventoryTransaction
    ├── serial_number: "FVFG20250003" ← same serial traced
    └── status: "return_received"
```

**Key insight**: `inventory_serial` provides full chain-of-custody for high-value items — from receiving through sale to warranty return, all linked by the same serial number.

### Plan Scenarios

#### Launch a new loyalty tier

```
Plan "Platinum Rewards"
  ├── name: "Platinum Rewards"
  ├── description: "Top-tier loyalty with exclusive perks"
  ├── fulfillment_type: "license" (benefit entitlements)
  ├── plan_location → Store #1 (NYC), Store #2 (LA)  ← available stores
  ├── collection_plan → Collection "Premium Products" ← eligible products
  └── thumbnail_url: "/images/platinum-badge.png"

PricePlan options:
  ├── "Platinum Annual" → amount: $199, duration: 1 year
  └── "Platinum Monthly" → amount: $19.99, duration: 1 month
```

#### Seasonal VIP early access plan

```
Plan "Holiday VIP Early Access 2025"
  ├── fulfillment_type: "schedule" ← time-based (reserved shopping hours)
  ├── plan_location → All stores
  └── collection_plan → Collection "Holiday 2025 Collection"

PricePlan "Early Access Pass"
  ├── amount: 0.00 (free for existing VIP members)
  ├── duration_unit: "day"
  └── duration_value: 3 (Nov 28-30)

Subscription created per customer:
  ├── client_id: FK to VIP customer
  ├── date_start: Nov 28
  └── date_end: Nov 30

Event "VIP Early Access Shopping"
  ├── start_date_time_utc: Nov 28, 6:00 AM
  ├── end_date_time_utc: Nov 28, 10:00 AM
  └── event_client → registered VIP members
```

### Subscription Scenarios

#### Customer joins loyalty program

```
Client (walk-in customer, customer_type: "retail")
  │
  ├── Selects Plan "Gold Rewards"
  ├── Chooses PricePlan "Gold Annual - $99/year"
  │
  ▼
Subscription created:
  ├── client_id: FK to customer
  ├── price_plan_id: FK to "Gold Annual"
  ├── date_start: today
  ├── date_end: today + 1 year
  ├── quantity: 3 (benefit slots)
  └── auto_assign: true

License records created:
  ├── License 1: "10% off Electronics"
  ├── License 2: "Free shipping on online orders"
  └── License 3: "Early access to sales"

Invoice generated: $99.00
Payment processed: card on file
```

#### Membership upgrade (Gold → Platinum)

```
Existing Subscription:
  ├── plan: "Gold Rewards"
  ├── price_plan: "Gold Annual - $99/year"
  ├── date_start: Mar 1, 2025
  └── date_end: Mar 1, 2026

Upgrade flow:
  1. Current Subscription.active → false (or date_end → today)
  2. New Subscription created:
     ├── plan: "Platinum Rewards"
     ├── price_plan: "Platinum Annual - $199/year"
     ├── date_start: today
     └── date_end: today + 1 year
  3. Prorated Invoice: $199 - ($99 × remaining_months/12) = prorated amount
  4. New License records for Platinum perks
  5. Old License records deactivated
```

#### B2B wholesale agreement

```
Client "Acme Corp" (customer_type: "wholesale")
  └── Delegate "John Smith" (Purchasing Agent)

Plan "Wholesale Buyer Program"
  ├── fulfillment_type: "physical"
  └── collection_plan → Collection "Wholesale Eligible Products"

PricePlan "Annual Wholesale - Net 30"
  ├── amount: 0.00 (no membership fee, volume-based pricing)
  ├── duration_unit: "year"
  └── duration_value: 1

Subscription:
  ├── client_id: FK to Acme Corp
  ├── metadata: {"payment_terms": "net-30", "credit_limit": "50000"}
  └── Purchases use wholesale PriceList instead of retail PriceList
```

### Client Scenarios

#### New walk-in customer registration

```
Client
  ├── user → User (first_name: "Sarah", last_name: "Chen",
  │          email: "sarah@email.com", mobile: "+1-555-0123")
  ├── customer_type: "retail"
  ├── category → ClientCategory: "Walk-in"
  └── client_attribute:
       ├── key: "preferred_store", value: "Store #1 NYC"
       └── key: "marketing_opt_in", value: "true"
```

#### Wholesale B2B customer onboarding

```
Client (the company)
  ├── company_name: "Acme Corp"
  ├── customer_type: "wholesale"
  ├── street_address, city, province, postal_code ← billing address
  ├── category → ClientCategory: "B2B", "Tier 1 Wholesale"
  │
  ├── Delegate 1 (Purchasing Agent)
  │    ├── user → User (first_name: "John", last_name: "Smith")
  │    └── delegate_client → links to Acme Corp
  │
  └── Delegate 2 (Finance Contact)
       ├── user → User (first_name: "Lisa", last_name: "Wong")
       └── delegate_client → links to Acme Corp

Workspace setup:
  └── WorkspaceUser for each delegate → roles: "buyer", "finance"
```

#### VIP upgrade based on spending

```
Client "Sarah Chen" (customer_type: "retail")
  │
  │ Total Revenue where client_id = Sarah, last 12 months = $5,200
  │ VIP threshold: $5,000
  │
  ▼
Client updated:
  ├── customer_type: "retail" → "vip"
  ├── client_attribute: key "vip_since", value "2025-11-15"
  └── client_category: add "VIP" category

New Subscription auto-created:
  └── Plan "VIP Rewards" → PricePlan "VIP Complimentary"
```

### Product Scenarios

#### Adding a new product with variants

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

**Key insight**: `ProductVariant.variant_attributes` (map<string, string>) holds the dimension values (color, size). Each variant gets its own SKU and optional price override. `InventoryItem` is created per variant per location — it's the matrix of *what* × *where*.

#### Seasonal collection and price list launch

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

#### Discontinuing a product

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
