# Laundry Services Vertical - Proto Domain Mapping

This document maps the Esqyma proto domain model to **laundry services** terminology — businesses that process textiles for consumers and commercial clients (wash-and-fold, dry cleaning, hotel/hospital linen services, uniform programs).

The core insight: **customer property flows through a processing pipeline, consumables are depleted per cycle, and B2B contracts drive recurring volume-based revenue.**

---

## Quick Reference

| Schema Term | Laundry Services Term | Notes |
|---|---|---|
| `client` | **Customer / Account** | Walk-in individual or B2B account (hotel, hospital, restaurant) |
| `staff` | **Plant Operator / Route Driver** | Processing staff, quality inspectors, delivery drivers |
| `delegate` | **Account Contact** | Hotel housekeeping director, hospital facilities manager |
| `admin` | **Plant Manager / Operations Director** | Back-office, route planning, compliance |
| `location` | **Processing Plant / Drop-Off Point** | Laundry facility, satellite drop-off location, pickup locker |
| `group` | **Customer Segment** | Residential, hospitality, healthcare, restaurant, industrial |
| `product` | **Service Type** | Wash-and-fold, dry cleaning, press only, specialty cleaning |
| `product_variant` | **Service Tier / Item Category** | Regular wash vs. delicates, standard dry clean vs. premium |
| `collection` | **Service Category** | Laundry, dry cleaning, specialty care, alterations |
| `resource` | **Care Guide / Processing Spec** | Fabric care instructions, chemical formulas per fabric type |
| `inventory_item` | **Tracked Garment / Linen** | RFID-tagged hotel sheet, customer's tagged coat, linen in rotation |
| `inventory_serial` | **RFID-Tagged Item** | Individual garment with RFID tag tracking its lifecycle |
| `inventory_transaction` | **Processing Cycle / Garment Movement** | Intake, wash, dry, press, package, deliver — each step tracked |
| `inventory_depreciation` | **Linen Replacement / Damage Write-Off** | Hotel linen worn past usable life, damaged garment claim |
| `plan` | **Service Program** | Residential subscription, hotel linen program, uniform rental program |
| `plan_location` | **Service Area / Coverage Zone** | Which neighborhoods or regions a pickup route covers |
| `price_plan` | **Program Pricing** | Monthly subscription fee, per-pound contract rate, per-piece pricing |
| `subscription` | **Active Service Contract / Subscription** | Hotel's ongoing linen contract, resident's weekly pickup plan |
| `license` | **Service Entitlement / Bag Allowance** | Bags per month, weight allowance, pickup frequency |
| `price_list` | **Rate Sheet** | Location-specific or tier-specific pricing (per-pound, per-piece) |
| `price_product` | **Service Rate** | Wash-and-fold @ $1.75/lb, dress shirt dry clean @ $6.50 |
| `invoice` | **Customer Invoice / Statement** | Per-visit receipt or monthly B2B statement |
| `balance` | **Account Balance / Prepaid Credit** | Prepaid subscription credit, B2B account receivable |
| `payment` | **Payment** | Card, auto-billing, ACH for B2B, cash for walk-in |
| `event` | **Pickup / Delivery / Processing Run** | Scheduled route pickup, delivery appointment, plant processing batch |
| `event_client` | **Pickup/Delivery Recipient** | Customer on the route, hotel receiving delivery |
| `event_product` | **Services on This Run** | Wash-and-fold + dry cleaning for this pickup |
| `revenue` | **Service Revenue** | Revenue per customer per billing period |
| `revenue_line_item` | **Service Line Item** | 32 lbs wash-and-fold @ $1.75/lb, 3 dress shirts @ $6.50 |
| `revenue_category` | **Revenue Stream** | Residential, hospitality, healthcare, industrial |
| `workflow` | **Garment Processing Pipeline** | Intake → sort → wash → dry → finish → QC → package → deliver |
| `stage` | **Processing Phase** | Sorting, washing, drying, finishing, quality control, packaging |
| `activity` | **Processing Task** | Stain pre-treat, load washer, press shirt, fold, bag |

---

## Domain Deep Dive

### Entity Domain → Plant People & Locations

```
┌──────────────────────────────────────────────────────────┐
│  THE PLANT                                                │
│                                                           │
│  staff           → Plant Operator, Presser, QC Inspector,│
│                    Route Driver                           │
│  admin           → Plant Manager, Operations Director     │
│  workspace       → The Laundry Business                   │
│                                                           │
│  THE CUSTOMER                                             │
│                                                           │
│  client          → Walk-in resident, hotel account,       │
│                    hospital, restaurant chain              │
│  delegate        → Housekeeping Director at the hotel,    │
│                    Facilities Manager at the hospital      │
│  delegate_client → Links contact(s) to their org          │
│                                                           │
│  LOCATIONS                                                │
│                                                           │
│  location        → Main Processing Plant,                 │
│                    Downtown Drop-Off, Airport Locker       │
│  group           → "Hospitality Accounts",                │
│                    "Healthcare Accounts", "Residential"    │
│                                                           │
│  ACCESS                                                   │
│                                                           │
│  role            → Plant Supervisor, Driver, Front Desk   │
│  permission      → can_process_healthcare, can_route,     │
│                    can_approve_claims                      │
└──────────────────────────────────────────────────────────┘
```

The `client.customer_type` field maps to account tiers: `"retail"` → walk-in/residential, `"wholesale"` → B2B volume contract (hotel, hospital), `"vip"` → premium service tier.

### Product Domain → Service Types & Pricing

**The "product" is the processing service. Garments are not owned inventory — they're customer property flowing through the pipeline.**

```
┌──────────────────────────────────────────────────────────┐
│  SERVICE CATALOG                                          │
│                                                           │
│  collection (parent)  → "Laundry"                         │
│    └── product        → "Wash and Fold"                   │
│         ├── product_variant → "Regular" (standard cycle)  │
│         ├── product_variant → "Delicates" (gentle cycle)  │
│         └── product_variant → "Heavy Soil" (industrial)   │
│                                                           │
│  collection           → "Dry Cleaning"                    │
│    └── product        → "Standard Dry Clean"              │
│         ├── product_variant → "Dress Shirt"               │
│         ├── product_variant → "Suit (2-piece)"            │
│         └── product_variant → "Wedding Dress (specialty)" │
│                                                           │
│  collection           → "Specialty Care"                  │
│    ├── product        → "Leather & Suede Cleaning"        │
│    └── product        → "Comforter / Duvet"               │
│                                                           │
│  collection           → "Add-On Services"                 │
│    ├── product        → "Stain Treatment"                 │
│    ├── product        → "Starching"                       │
│    └── product        → "Alterations & Repairs"           │
│                                                           │
│  PRICING                                                  │
│                                                           │
│  price_list      → "2025 Residential Rates"               │
│    ├── price_product → Wash & Fold @ $1.75/lb             │
│    ├── price_product → Dress Shirt Dry Clean @ $6.50      │
│    ├── price_product → Suit (2-piece) @ $18.00            │
│    └── price_product → Stain Treatment @ $3.00/spot       │
│                                                           │
│  price_list      → "2025 Hospitality Contract Rates"      │
│    ├── price_product → Bed Sheet @ $0.45/piece            │
│    ├── price_product → Bath Towel @ $0.35/piece           │
│    ├── price_product → Tablecloth @ $1.20/piece           │
│    └── price_product → Express Surcharge @ 30%            │
│                                                           │
│  price_list      → "2025 Healthcare Rates"                │
│    ├── price_product → Scrubs @ $0.60/piece               │
│    ├── price_product → Lab Coat @ $1.50/piece             │
│    └── price_product → Patient Gown @ $0.55/piece         │
└──────────────────────────────────────────────────────────┘
```

The `price_list` separates residential (per-pound, per-piece) from commercial (per-piece, volume-discounted) pricing. The `date_start` / `date_end` fields support contract renewal periods.

### Inventory Domain → Garment Tracking & Consumables

The inventory model serves three purposes in laundry services:
1. **Garment tracking** — `InventoryItem` + `InventorySerial` track individual RFID-tagged items through the processing pipeline
2. **Processing transactions** — `InventoryTransaction` records each step a garment goes through
3. **Consumable tracking** — separate `InventoryItems` for detergent, chemicals, packaging supplies

```
┌──────────────────────────────────────────────────────────┐
│  GARMENT TRACKING (customer property in the pipeline)     │
│                                                           │
│  inventory_item  (for rental/managed linen programs)      │
│    ├── name              → "King Sheet Set - White"       │
│    ├── product_id        → FK to "Bed Sheet"              │
│    ├── location_id       → FK to "Main Plant"             │
│    ├── sku               → "LINEN-KS-WHT"                │
│    ├── quantity_on_hand  → 3,000 (in rotation)            │
│    ├── unit_of_measure   → "pieces"                       │
│    └── item_type         → "serialized" (RFID-tracked)   │
│                                                           │
│  inventory_serial → Individual RFID-tagged garment        │
│    ├── serial_number → "RFID-KS-2025-00847"              │
│    └── (tracks: wash count, condition, assignment)        │
│                                                           │
│  CONSUMABLES (plant supplies)                             │
│                                                           │
│  inventory_item                                           │
│    ├── name              → "Industrial Detergent 55-gal"  │
│    ├── item_type         → "consumable"                   │
│    ├── quantity_on_hand  → 8 drums                        │
│    └── reorder_level     → 3 drums                        │
│                                                           │
│  PROCESSING TRANSACTIONS                                  │
│                                                           │
│  inventory_transaction (garment movement)                 │
│    ├── "Batch of 200 hotel sheets received from pickup"   │
│    ├── "Batch sorted, stain-treated, loaded into washer"  │
│    ├── "Batch washed, dried, pressed, folded"             │
│    └── "Batch packaged and loaded onto delivery truck"    │
│         │                                                 │
│         ▼                                                 │
│  revenue_line_item (derived from processing)              │
│    ├── 200 sheets × $0.45/piece = $90.00                  │
│    └── priced from: price_list (contract rate)            │
└──────────────────────────────────────────────────────────┘
```

**The processing flow:**

```
Garment         InventoryTransaction      RevenueLineItem        Invoice
  received  →   (processing pipeline  →   (pieces × rate from → (customer
                  tracked per stage)       contract PriceList)    billing)
```

**Key reinterpretation of `item_type`:**

| Value | Laundry Services Use Case |
|---|---|
| `"serialized"` | RFID-tagged linen — individual sheets, towels, uniforms tracked through lifecycle (wash count, condition) |
| `"non_serialized"` | Bulk customer drop-offs — residential bags tracked by weight, not individual items |
| `"consumable"` | Plant supplies — detergent, chemicals, hangers, poly bags (used and gone) |

### Subscription Domain → Service Contracts & Plans

```
┌──────────────────────────────────────────────────────────┐
│  SERVICE PROGRAMS                                         │
│                                                           │
│  plan               → "Weekly Residential Pickup"         │
│    ├── description  → Weekly doorstep pickup & delivery   │
│    ├── plan_location→ Downtown zone, Midtown zone         │
│    ├── fulfillment_type → "schedule" (recurring pickups)  │
│    └── collection_plan → Links to "Laundry" services      │
│                                                           │
│  price_plan          → "Residential Weekly - $99/month"   │
│    ├── amount        → 99.00                              │
│    ├── duration_unit → "month"                            │
│    └── duration_value→ 1                                  │
│                                                           │
│  plan               → "Hotel Linen Program"               │
│    ├── description  → Full-service linen rental & laundry │
│    ├── fulfillment_type → "physical" (linen rental)       │
│    └── collection_plan → Links to "Hospitality" services  │
│                                                           │
│  price_plan          → "Grand Hotel - 5-Year Contract"    │
│    ├── amount        → 12000.00 (monthly estimate)        │
│    ├── duration_unit → "year"                             │
│    └── duration_value→ 5                                  │
│                                                           │
│  subscription        → Active service contract            │
│    ├── client_id     → FK to customer/account             │
│    ├── price_plan_id → FK to chosen program pricing       │
│    ├── quantity      → 4 (bags/month for residential)     │
│    ├── assigned_count→ 3 (bags used this month)           │
│    ├── available_count→ 1 (bags remaining)                │
│    └── metadata      → {"route": "MON-DT-01",            │
│                         "pickup_day": "monday",           │
│                         "delivery_day": "wednesday"}      │
└──────────────────────────────────────────────────────────┘
```

**Key reinterpretation of `plan.fulfillment_type`:**

| Value | Laundry Services Use Case |
|---|---|
| `"schedule"` | Recurring pickup/delivery plan (weekly residential, 3x/week hotel) |
| `"physical"` | Linen rental program (plant owns the textiles, provides and launders them) |
| `"license"` | Prepaid bag/weight credits (buy 10 bags, use as needed) |
| `"content"` | Self-service laundromat membership (access to premium machines, loyalty perks) |

### Payment & Revenue → Billing

```
┌──────────────────────────────────────────────────────────┐
│  BILLING MODELS                                           │
│                                                           │
│  Residential (B2C):                                       │
│    invoice         → Per-visit receipt or monthly summary │
│    payment         → Card on file, auto-billed monthly    │
│    balance         → Prepaid bag credits remaining        │
│                                                           │
│  Commercial (B2B):                                        │
│    invoice         → Monthly statement with line items    │
│    payment         → Net-30 ACH, PO-referenced           │
│    balance         → Account receivable / credit balance  │
│                                                           │
│  revenue           → Revenue per account per period       │
│  revenue_line_item → 1,200 sheets × $0.45 = $540         │
│                      800 towels × $0.35 = $280            │
│                      Express surcharge = $120              │
│  revenue_category  → Residential / Hospitality /          │
│                      Healthcare / Industrial              │
└──────────────────────────────────────────────────────────┘
```

### Event Domain → Pickups, Deliveries & Processing

| Schema | Laundry Services Example |
|---|---|
| `event` | "Monday Downtown Route — Pickup Run" (6am-11am) |
| `event_client` | 12 residential customers on Monday route |
| `event_product` | Wash-and-fold (8 stops), dry cleaning (4 stops) |
| `event_settings` | Driver: Carlos, Vehicle: Van #3, Route: MON-DT-01 |
| `event_recurrence` | Every Monday (weekly residential route) |
| `event` (B2B) | "Grand Hotel — Daily Linen Exchange" (7am) |

### Workflow Domain → Garment Processing Pipeline

```
┌──────────────────────────────────────────────────────────┐
│  PROCESSING PIPELINE                                      │
│                                                           │
│  workflow_template   → "Standard Wash-and-Fold"           │
│  workflow            → "Batch #2025-0847" (live)          │
│                                                           │
│  stage 1: Intake                                          │
│    ├── activity: "Garments received and weighed"          │
│    ├── activity: "RFID scan (if tagged)"                  │
│    └── activity: "Condition noted, pockets checked"       │
│                                                           │
│  stage 2: Sorting                                         │
│    ├── activity: "Sort by color"                          │
│    ├── activity: "Sort by fabric type"                    │
│    └── activity: "Flag items needing stain pre-treatment" │
│                                                           │
│  stage 3: Pre-Treatment                                   │
│    └── activity: "Stain treatment applied"                │
│                                                           │
│  stage 4: Washing                                         │
│    ├── activity: "Load washer (machine #12)"              │
│    ├── activity: "Select cycle (heavy soil, 160°F)"       │
│    └── activity: "Detergent auto-dispensed"               │
│                                                           │
│  stage 5: Drying                                          │
│    └── activity: "Dryer cycle complete"                   │
│                                                           │
│  stage 6: Finishing                                       │
│    ├── activity: "Press/iron"                             │
│    ├── activity: "Fold (per customer preference)"         │
│    └── activity: "Hang on hangers (dry clean items)"      │
│                                                           │
│  stage 7: Quality Control                                 │
│    ├── activity: "Visual inspection"                      │
│    └── activity: "Re-process if failed QC"                │
│                                                           │
│  stage 8: Packaging & Dispatch                            │
│    ├── activity: "Bag and label per customer"             │
│    ├── activity: "Load onto route truck"                  │
│    └── activity: "Deliver to customer / ready for pickup" │
└──────────────────────────────────────────────────────────┘
```

---

## Key Field Mappings

### InventoryItem Fields for Garment & Supply Tracking

| Field | Laundry Services Meaning |
|---|---|
| `name` | Item description ("King Sheet Set - White", "Industrial Detergent") |
| `product_id` | Links to service type ("Bed Sheet") or supply type ("Detergent") |
| `product_variant_id` | Links to variant ("King" vs "Queen", "Regular" vs "Heavy Soil") |
| `location_id` | Which plant or drop-off point |
| `sku` | Item code ("LINEN-KS-WHT") or supply code ("DET-55G-ECO") |
| `unit_of_measure` | `"pieces"` for linen, `"pounds"` for bulk, `"drums"` for chemicals |
| `item_type` | `"serialized"` for RFID-tracked linen, `"consumable"` for chemicals |
| `quantity_on_hand` | Pieces in rotation / drums in stock |
| `reorder_level` | Minimum before reorder (supplies) or replacement threshold (linen wear) |

### InventoryTransaction Fields for Processing

| Field | Laundry Services Meaning |
|---|---|
| `transaction_type` | `"intake"` (customer drop-off), `"processing"` (wash/dry/press), `"delivery"` (returned to customer) |
| `reference_type` | `"subscription"` (B2B contract) or `"event"` (pickup/delivery run) |
| `reference_id` | FK to the contract or pickup event |
| `quantity` | Pieces processed or pounds weighed |
| `from_location_id` | Customer site (pickup) or plant (delivery) |
| `to_location_id` | Plant (intake) or customer site (delivery) |
| `performed_by` | Driver (pickup/delivery) or operator (processing) |
| `status` | Lifecycle state (see Status-Driven Flow below) |

### Subscription Fields for Service Contracts

| Field | Laundry Services Meaning |
|---|---|
| `name` | Contract name ("Grand Hotel Linen Program", "Sarah's Weekly Pickup") |
| `client_id` | The customer or B2B account |
| `price_plan_id` | Chosen program and pricing tier |
| `date_start` / `date_end` | Contract period (5 years for hotel, month-to-month for residential) |
| `quantity` | Bags per month (residential) or estimated pieces per week (B2B) |
| `metadata` | `{"route": "MON-DT-01", "pickup_day": "monday", "par_level": "3"}` |

---

## Scenarios by Domain

Detailed scenarios are organized by domain category in separate files:

| Domain | File | Scenarios |
|---|---|---|
| **Sales** | [scenarios/sales.md](scenarios/sales.md) | Walk-in drop-off billing, monthly B2B hotel statement, residential subscription overage billing |
| **Inventory** | [scenarios/inventory.md](scenarios/inventory.md) | Hotel linen lifecycle with RFID, residential bag intake and processing, chemical consumable reorder, damaged linen replacement |
| **Plan** | [scenarios/plan.md](scenarios/plan.md) | Residential weekly subscription plan, hotel linen rental program, prepaid bag credit plan |
| **Subscription** | [scenarios/subscription.md](scenarios/subscription.md) | Hotel signs 5-year linen contract, resident joins weekly plan, contract renewal with rate adjustment |
| **Client** | [scenarios/client.md](scenarios/client.md) | Walk-in customer registration, hotel account onboarding, multi-property hospitality chain setup |
| **Product** | [scenarios/product.md](scenarios/product.md) | Adding express service tier, healthcare-compliant service launch, seasonal pricing promotion |

---

## Status-Driven Flow: InventoryTransaction → RevenueLineItem

In laundry services, the garment flows through a **multi-stage processing pipeline**. Revenue is recognized when processing is complete and the garment is ready for return — the customer is paying for the transformation, not the item itself. The `InventoryTransaction.status` field tracks each stage.

### Proto Fields That Enable This

```
InventoryTransaction                         RevenueLineItem
├── status           ← pipeline stage        ├── inventory_item_id  ← garment/linen
├── transaction_type ← "intake","processing" ├── inventory_serial_id← RFID tag
├── reference_type   ← "subscription"        ├── quantity           ← pieces/lbs
├── reference_id     ← FK to contract        ├── unit_price         ← from PriceList
├── from_location_id ← pickup site           ├── total_price        ← qty × rate
├── to_location_id   ← plant / customer      └── line_item_type     ← "item"/"discount"
├── quantity         ← pieces or weight
└── performed_by     ← driver or operator
```

### InventoryTransaction.status Values for Laundry Services

| Status | Meaning | Revenue Impact |
|---|---|---|
| `"received"` | Garments picked up from customer or dropped off | No revenue yet |
| `"sorted"` | Items sorted by color, fabric, wash requirements | No revenue yet |
| `"in_process"` | Currently being washed/dried/pressed | No revenue yet |
| `"quality_check"` | Post-processing inspection | No revenue yet |
| `"completed"` | Processing done, ready for delivery/pickup | Revenue eligible |
| `"delivered"` | Returned to customer | Revenue recognized |
| `"reprocess"` | Failed QC, sent back through pipeline | No revenue (cost absorbed) |
| `"damaged"` | Item damaged during processing | → claim / `inventory_depreciation` |
| `"lost"` | Item cannot be located | → claim / `inventory_depreciation` |
| `"held"` | Processing paused (stain won't come out, customer decision needed) | No revenue yet |

### Typical Flow: B2B Hotel Linen Processing

```
Driver picks up         ┌──────────┐
soiled linens ────────▶ │ received │ InventoryTransaction created
from Grand Hotel        └────┬─────┘   quantity: 200 (sheets)
                             │         reference_type: "subscription"
                             │         reference_id: "SUB-GRAND-001"
                             ▼
                        ┌──────────┐
Plant sorts by          │  sorted  │ Color, fabric, soil level
type and soil ────────▶ └────┬─────┘
                             │
                             ▼
                        ┌────────────┐
Washed, dried,          │in_process  │ Machine #12, heavy soil cycle
pressed ──────────────▶ └────┬───────┘   chemical consumption recorded
                             │
                             ▼
                        ┌──────────────┐
Inspector checks        │quality_check │ Stains out? Fabric intact?
cleanliness ──────────▶ └──────┬───────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
              ┌──────────┐         ┌───────────┐
Passes QC     │completed │         │ reprocess │  Failed QC
              └────┬─────┘         └───────────┘  (back to wash)
                   │
                   ▼
              ┌──────────┐
Driver returns│delivered │ ◀── REVENUE RECOGNIZED
clean linens ▶└──────────┘     RevenueLineItem created:
                               ├── quantity: 200
                               ├── unit_price: $0.45 (contract rate)
                               └── total_price: $90.00
```

**Revenue recognition point**: At `"delivered"` — the customer is paying for the round-trip transformation. Revenue is only recognized when clean textiles are returned. This is unique to laundry: the inventory item leaves the customer, passes through the plant, and comes back.

### Comparison with Other Verticals

| Aspect | Retail (POS) | Professional Services | Medical Aesthetics | Laundry Services |
|---|---|---|---|---|
| **What flows?** | Product sold (one-way) | Hours billed | Product consumed on patient | Customer property (round-trip) |
| **Lifecycle length** | Instant | Days to weeks | 30-90 min | 24-48 hours |
| **Pipeline stages** | 0 (instant) | 2-3 | 2-3 | 5-8 (full pipeline) |
| **Revenue trigger** | Sale scan | Billing cycle | Patient checkout | Delivery to customer |
| **Loss path** | Shrinkage | Unbillable hours | Expired product | Damaged/lost garment |
| **Tracking** | SKU/serial | Employee ID | Lot number | RFID tag |

---

## Two Service Models: Rental vs. COG

A unique dimension of laundry services is **who owns the textiles**:

### Linen Rental (plant owns the inventory)

```
Plant owns 3,000 king sheet sets
  ├── InventoryItem: "King Sheet Set - White"
  │    ├── item_type: "serialized" (RFID-tracked)
  │    ├── quantity_on_hand: 3,000 (total in rotation)
  │    └── location: cycles between plant and hotels
  │
  ├── Hotel A: 1-par at hotel, 1-par in transit, 1-par at plant
  ├── Hotel B: same par structure
  │
  └── Revenue includes: linen use + laundering + delivery + replacement
```

### Customer-Owned Goods (COG) (customer owns the inventory)

```
Grand Hotel owns its own branded sheets
  ├── InventoryItem belongs to the hotel (tracked at plant while processing)
  │    ├── item_type: "serialized" (RFID-tagged by plant for tracking)
  │    └── location_id changes: hotel → plant → hotel (round trip)
  │
  └── Revenue includes: laundering + delivery only (no linen use fee)
```

The `subscription.metadata` field distinguishes these: `{"model": "rental"}` vs. `{"model": "cog"}`.

---

## Design Decisions

- **Customer property is inventory in transit**: Unlike retail where inventory is owned and sold, laundry treats customer garments as temporary inventory passing through the pipeline. The `InventoryItem` represents something the plant is responsible for but doesn't own (in COG model).
- **Processing is the product**: Revenue comes from the transformation service, not from selling goods. A "wash-and-fold" `Product` has no physical backing — it's a processing service priced per pound or per piece.
- **RFID enables per-item lifecycle**: For B2B linen programs, each RFID-tagged item (`inventory_serial`) tracks wash count, condition, and assignment. When a sheet hits 200 washes, it triggers replacement — modeled as `inventory_depreciation`.
- **Route = Event**: Pickup and delivery runs are `Events` with recurring schedules. Each customer on a route is an `event_client`. The route driver is `performed_by` on the `InventoryTransaction`.
- **Two inventory worlds**: Garment tracking (customer property, round-trip) and consumable tracking (plant supplies, one-way depletion) coexist in the same `InventoryItem` model, distinguished by `item_type`.

## Open Questions & Considerations

- **Weight vs. piece tracking**: Residential orders are often weighed (per-pound pricing), while B2B is per-piece. The `unit_of_measure` field handles this, but billing aggregation logic differs.
- **Par level management**: Hotels maintain 3-par linen levels (1 in room, 1 in transit, 1 at plant). The `subscription.metadata` could track par configuration, but a dedicated field might be cleaner.
- **Damage claims**: When a garment is damaged during processing, the claim/replacement flow involves both `inventory_depreciation` (write-off) and a potential credit `RevenueLineItem` (refund to customer).
- **Machine utilization**: IoT data from washers/dryers (cycles, energy, water) doesn't map naturally to the current proto. `InventoryTransaction` metadata could carry machine ID and cycle data, but a dedicated equipment model might be needed.
