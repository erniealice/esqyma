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
