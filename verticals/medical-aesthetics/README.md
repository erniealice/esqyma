# Medical Aesthetics Vertical - Proto Domain Mapping

This document maps the Esqyma proto domain model to **medical aesthetics** terminology — clinics that deliver injectable treatments (Botox, fillers), laser procedures, and skin care services where **practitioner expertise and physical consumables are consumed in a single appointment**.

The core insight: **treatments are the product, injectables are the inventory, and the appointment is a multi-resource event that depletes both practitioner time and physical stock.**

---

## Quick Reference

| Schema Term | Medical Aesthetics Term | Notes |
|---|---|---|
| `client` | **Patient / Client** | The person receiving treatment |
| `staff` | **Practitioner / Injector** | RN, PA, NP, or physician performing treatments |
| `delegate` | **Corporate Contact / Event Organizer** | B2B liaison (hotel spa director, corporate wellness coordinator) |
| `admin` | **Clinic Director / Office Manager** | Back-office, compliance, scheduling |
| `location` | **Clinic / Med Spa Location** | Physical treatment facility |
| `group` | **Patient Segment** | VIP, member, walk-in, corporate wellness |
| `product` | **Treatment Type** | Botox, dermal filler, microneedling, IPL, chemical peel |
| `product_variant` | **Treatment Variation** | Botox by area (forehead, crow's feet), filler by zone (lips, cheeks) |
| `collection` | **Service Category / Menu Section** | Injectables, laser, skin care, body contouring |
| `resource` | **Consent Form / Before-After Photo** | Clinical documents and media attached to a treatment |
| `inventory_item` | **Clinical Supply** | Botox vial at a clinic, filler syringe in stock, laser cartridge |
| `inventory_serial` | **Lot-Tracked Unit** | Specific vial with lot number, expiration, and chain-of-custody |
| `inventory_transaction` | **Treatment Consumption / Stock Depletion** | Units consumed during an appointment; also receiving and transfers |
| `inventory_depreciation` | **Expired Product Write-Off** | Unused Botox past reconstitution window, expired filler syringes |
| `plan` | **Membership Program / Treatment Plan** | "Beauty Bank", "Glow Club", or multi-session treatment protocol |
| `plan_location` | **Program Availability** | Which clinic locations offer a membership |
| `price_plan` | **Membership Tier Pricing** | Monthly fee for beauty bank credits, package pricing |
| `subscription` | **Active Membership / Treatment Package** | Patient's enrolled membership or purchased package of sessions |
| `license` | **Package Session / Credit Allotment** | Individual sessions within a package (e.g., "session 3 of 6") |
| `price_list` | **Treatment Price Menu** | Clinic-specific or seasonal pricing (per-unit, per-area, per-session) |
| `price_product` | **Treatment Price** | Botox at $14/unit, microneedling at $300/session at this clinic |
| `invoice` | **Patient Invoice / Checkout Receipt** | Itemized bill for a visit |
| `balance` | **Patient Account / Beauty Bank Balance** | Prepaid credits, outstanding balance, package sessions remaining |
| `payment` | **Patient Payment** | Card, CareCredit, financing, cash, membership credit redemption |
| `event` | **Appointment / Consultation / Botox Party** | Scheduled treatment session or group event |
| `event_client` | **Appointment Attendee** | Patient booked for a treatment; group event guests |
| `event_product` | **Treatments Booked** | Which treatments are scheduled for the appointment |
| `revenue` | **Treatment Revenue** | Revenue from a patient visit (services + retail products) |
| `revenue_line_item` | **Treatment Line Item** | 40 units Botox @ $14/unit, 1 syringe Juvederm @ $650 |
| `revenue_category` | **Revenue Stream** | Injectables, laser, skin care, retail, membership fees |
| `workflow` | **Patient Journey** | Lead → consult → treat → follow-up → rebook |
| `stage` | **Journey Phase** | Intake, consultation, treatment, checkout, post-care |
| `activity` | **Clinical Task** | Consent form, before photo, injection, after photo, rebook |

---

## Domain Deep Dive

### Entity Domain → Clinic People & Places

```
┌──────────────────────────────────────────────────────────┐
│  THE CLINIC                                               │
│                                                           │
│  staff           → Injector (RN), Laser Tech, Esthetician│
│  admin           → Clinic Director, Office Manager        │
│  workspace       → The Med Spa / Aesthetics Practice      │
│                                                           │
│  THE PATIENT                                              │
│                                                           │
│  client          → Patient / Client (the person treated)  │
│  delegate        → Corporate wellness contact, event host │
│  delegate_client → Links organizer to their company       │
│                                                           │
│  LOCATIONS                                                │
│                                                           │
│  location        → Flagship Clinic (Beverly Hills),       │
│                    Satellite Clinic (Santa Monica)         │
│  group           → "VIP Members", "Corporate Wellness"    │
│                                                           │
│  ACCESS                                                   │
│                                                           │
│  role            → Injector, Esthetician, Front Desk      │
│  permission      → can_inject, can_operate_laser,         │
│                    can_approve_refund                      │
└──────────────────────────────────────────────────────────┘
```

The `client.customer_type` field maps to patient tiers: `"retail"` → walk-in/pay-per-visit, `"vip"` → beauty bank member, `"wholesale"` → corporate wellness account.

### Product Domain → Treatment Menu & Pricing

**The "product" is the treatment. The "variant" is the treatment zone or dosage option.**

```
┌──────────────────────────────────────────────────────────┐
│  SERVICE MENU HIERARCHY                                   │
│                                                           │
│  collection (parent)  → "Injectables"                     │
│    └── collection     → "Neurotoxins"                     │
│         └── product   → "Botox"                           │
│              ├── product_variant → "Botox - Forehead"     │
│              ├── product_variant → "Botox - Crow's Feet"  │
│              ├── product_variant → "Botox - Full Face"    │
│              └── resource → consent_form_botox.pdf         │
│                                                           │
│  collection           → "Dermal Fillers"                  │
│    └── product        → "Juvederm Ultra"                  │
│         ├── product_variant → "Lips (1 syringe)"         │
│         ├── product_variant → "Cheeks (2 syringes)"      │
│         └── resource → before_after_gallery.pdf           │
│                                                           │
│  collection           → "Laser & Energy"                  │
│    └── product        → "IPL Photofacial"                 │
│         └── product_variant → "Full Face"                 │
│                                                           │
│  PRICING                                                  │
│                                                           │
│  price_list      → "2025 Beverly Hills Menu"              │
│    ├── price_product → Botox @ $14/unit                   │
│    ├── price_product → Juvederm Ultra @ $650/syringe      │
│    ├── price_product → IPL Photofacial @ $350/session     │
│    └── price_product → Microneedling @ $300/session       │
│                                                           │
│  price_list      → "2025 Santa Monica Menu"               │
│    ├── price_product → Botox @ $12/unit (lower market)    │
│    └── price_product → IPL Photofacial @ $299/session     │
│                                                           │
│  product.price   → Base/list price (before location adj.) │
│  product.currency → USD                                   │
└──────────────────────────────────────────────────────────┘
```

The `price_list.location_id` field enables **location-specific menus** — a Beverly Hills clinic charges differently than a Santa Monica satellite. The `date_start` / `date_end` fields support seasonal promotions ("Summer Glow Special — microneedling $249 through August").

### Inventory Domain → Clinical Supplies & Consumption

The inventory model serves two purposes in medical aesthetics:
1. **Supply registry** — `InventoryItem` tracks what's in stock at each clinic (Botox vials, filler syringes, laser cartridges)
2. **Treatment consumption** — `InventoryTransaction` records what was used during each appointment, depleting stock and linking to revenue

```
┌──────────────────────────────────────────────────────────┐
│  CLINICAL SUPPLY REGISTRY                                 │
│                                                           │
│  inventory_item                                           │
│    ├── name              → "Botox 100-unit Vial"         │
│    ├── product_id        → FK to "Botox" treatment       │
│    ├── location_id       → FK to "Beverly Hills Clinic"  │
│    ├── sku               → "BTX-100-ALG" (Allergan)      │
│    ├── quantity_on_hand  → 12 vials                       │
│    ├── quantity_reserved → 2 (allocated to today's appts) │
│    ├── quantity_available→ 10                             │
│    ├── reorder_level     → 5 (trigger restock alert)     │
│    ├── unit_of_measure   → "units" (Botox) or "syringes" │
│    └── item_type         → "serialized" (lot-tracked)    │
│                                                           │
│  inventory_serial   → Individual lot tracking             │
│    ├── serial_number → "ALG-LOT-2025-0847"               │
│    └── (tracks: lot #, expiry, manufacturer, batch)       │
│                                                           │
│  TREATMENT CONSUMPTION                                    │
│                                                           │
│  inventory_transaction (during appointment)               │
│    ├── "40 units Botox consumed, lot ALG-2025-0847"      │
│    ├── "1 syringe Juvederm Ultra, lot JUV-2025-1203"     │
│    └── "1 microneedling cartridge consumed"               │
│         │                                                 │
│         ▼                                                 │
│  revenue_line_item (derived from consumption)             │
│    ├── 40 units × $14/unit = $560 (Botox)                │
│    ├── 1 syringe × $650 = $650 (Juvederm)                │
│    └── priced from: price_list + plan (if member)        │
│                                                           │
│  inventory_depreciation                                   │
│    └── Expired vial write-off (Botox past reconstitution │
│        window, filler past expiration date)               │
└──────────────────────────────────────────────────────────┘
```

**The consumption flow:**

```
Practitioner       InventoryTransaction    RevenueLineItem        Invoice
  treats patient → (units consumed,    →   (units × price from → (patient
                    lot # recorded)         PriceList/Plan)        checkout)
```

**Key reinterpretation of `item_type`:**

| Value | Medical Aesthetics Use Case |
|---|---|
| `"serialized"` | Lot-tracked injectables — each vial/syringe tracked by lot #, expiry, manufacturer |
| `"non_serialized"` | Bulk consumables — gloves, gauze, alcohol pads, numbing cream |
| `"consumable"` | Single-use disposables — microneedling cartridges, laser tips, cannulas |

### Subscription Domain → Memberships & Treatment Packages

```
┌──────────────────────────────────────────────────────────┐
│  MEMBERSHIP & PACKAGES                                    │
│                                                           │
│  plan               → "Beauty Bank Membership"            │
│    ├── description  → Monthly credits toward any treatment│
│    ├── plan_location→ Beverly Hills, Santa Monica         │
│    ├── fulfillment_type → "license" (credit-based)        │
│    └── collection_plan → Links to "All Treatments"        │
│                                                           │
│  price_plan          → "Beauty Bank - $150/month"         │
│    ├── amount        → 150.00 (monthly)                   │
│    ├── duration_unit → "month"                            │
│    └── duration_value→ 1                                  │
│                                                           │
│  plan               → "Laser Hair Removal Package"        │
│    ├── description  → "6-session course for full legs"    │
│    ├── fulfillment_type → "schedule" (session-based)      │
│    └── collection_plan → Links to "Laser" category        │
│                                                           │
│  price_plan          → "Full Legs 6-Session - $1,200"     │
│    ├── amount        → 1200.00                            │
│    ├── duration_unit → "month"                            │
│    └── duration_value→ 12 (use within 12 months)          │
│                                                           │
│  subscription        → Patient's active membership        │
│    ├── client_id     → FK to patient                      │
│    ├── price_plan_id → FK to chosen plan pricing          │
│    ├── quantity      → 6 (sessions in package)            │
│    ├── assigned_count→ 3 (sessions used)                  │
│    ├── available_count→ 3 (sessions remaining)            │
│    └── metadata      → {"balance": "450.00"} (bank)      │
└──────────────────────────────────────────────────────────┘
```

**Key reinterpretation of `plan.fulfillment_type`:**

| Value | Medical Aesthetics Use Case |
|---|---|
| `"license"` | Beauty bank / credit membership (monthly $ credits toward any treatment) |
| `"schedule"` | Multi-session package (6× laser, 3× microneedling — scheduled over time) |
| `"content"` | Skin care consultation plan (assessment + personalized regimen) |
| `"physical"` | Retail product subscription (monthly skincare box delivered) |

### Payment & Revenue → Patient Billing

```
┌──────────────────────────────────────────────────────────┐
│  CHECKOUT FLOW                                            │
│                                                           │
│  invoice         → Itemized visit receipt                 │
│  payment         → Card, CareCredit, Klarna, cash,       │
│                    membership credit redemption            │
│  balance         → Beauty bank balance / prepaid credits  │
│  revenue         → Visit revenue per patient per clinic   │
│  revenue_line_item → 40 units Botox @ $14/unit            │
│                      1 post-treatment serum @ $48          │
│  revenue_category  → Injectables / Laser / Retail / Memb. │
└──────────────────────────────────────────────────────────┘
```

### Event Domain → Appointments & Group Events

| Schema | Medical Aesthetics Example |
|---|---|
| `event` | "Sarah Chen — Botox + Filler Appointment" (Tue 2pm, Room 3) |
| `event_client` | Sarah Chen (the patient) |
| `event_product` | "Botox - Full Face" + "Juvederm - Lips" (treatments booked) |
| `event_settings` | Room: Treatment Room 3, Practitioner: Dr. Kim |
| `event_recurrence` | "Botox maintenance — every 3-4 months" |
| `event` (group) | "Bridal Botox Party — 8 guests" (Sat 4pm, Private Suite) |

### Workflow Domain → Patient Journey

```
┌──────────────────────────────────────────────────────────┐
│  PATIENT JOURNEY                                          │
│                                                           │
│  workflow_template   → "New Patient Injectable Journey"   │
│  workflow            → "Sarah Chen - First Visit" (live)  │
│                                                           │
│  stage 1: Intake                                          │
│    ├── activity: "Digital intake forms submitted"         │
│    ├── activity: "Medical history review"                 │
│    └── activity: "Insurance/payment verification"        │
│                                                           │
│  stage 2: Consultation                                    │
│    ├── activity: "Practitioner assessment"                │
│    ├── activity: "Treatment plan discussion"              │
│    ├── activity: "Before photos taken"                    │
│    └── activity: "Consent form signed"                    │
│                                                           │
│  stage 3: Treatment                                       │
│    ├── activity: "Numbing cream applied (15 min wait)"   │
│    ├── activity: "Botox injection — 40 units"            │
│    ├── activity: "Juvederm injection — 1 syringe"        │
│    ├── activity: "After photos taken"                     │
│    └── activity: "Lot numbers recorded in chart"         │
│                                                           │
│  stage 4: Checkout                                        │
│    ├── activity: "Invoice generated"                     │
│    ├── activity: "Payment processed"                      │
│    ├── activity: "Post-care instructions provided"       │
│    └── activity: "Follow-up appointment booked (14 days)"│
│                                                           │
│  stage 5: Post-Care                                       │
│    ├── activity: "24-hour check-in SMS sent"             │
│    ├── activity: "14-day follow-up visit"                │
│    ├── activity: "Before/after comparison reviewed"       │
│    └── activity: "Maintenance rebook (3-4 months)"       │
└──────────────────────────────────────────────────────────┘
```

---

## Key Field Mappings

### InventoryItem Fields for Clinical Supplies

| Field | Medical Aesthetics Meaning |
|---|---|
| `name` | Product name ("Botox 100-unit Vial", "Juvederm Ultra Syringe") |
| `product_id` | Links to treatment type ("Botox") |
| `product_variant_id` | Links to treatment variation ("Botox - Full Face") |
| `location_id` | Which clinic has this stock |
| `sku` | Manufacturer product code ("BTX-100-ALG") |
| `unit_of_measure` | `"units"` for Botox, `"syringes"` for fillers, `"cartridges"` for devices |
| `item_type` | `"serialized"` for lot-tracked injectables, `"consumable"` for single-use |
| `quantity_on_hand` | Vials/syringes in stock |
| `reorder_level` | Minimum stock before reorder alert triggers |
| `notes` | Storage requirements, reconstitution instructions |

### InventoryTransaction Fields for Treatment Consumption

| Field | Medical Aesthetics Meaning |
|---|---|
| `transaction_type` | `"consumption"` (treatment use), `"receiving"` (supplier delivery), `"transfer"` (between clinics) |
| `reference_type` | `"event"` (links to the appointment) |
| `reference_id` | FK to the specific appointment where consumption happened |
| `quantity` | Units consumed (40 Botox units, 1 syringe, 1 cartridge) |
| `serial_number` | Lot number of the specific vial/syringe used |
| `performed_by` | Practitioner who administered the treatment |
| `status` | Lifecycle state (see Status-Driven Flow below) |

### Subscription Fields for Memberships & Packages

| Field | Medical Aesthetics Meaning |
|---|---|
| `name` | Membership or package name ("Sarah's Beauty Bank", "Laser 6-Pack") |
| `client_id` | The patient |
| `price_plan_id` | Chosen tier/package pricing |
| `date_start` / `date_end` | Membership period or package validity window |
| `quantity` | Sessions in a package (6), or credit allotment |
| `assigned_count` | Sessions used / credits spent |
| `available_count` | Sessions remaining / credits available |
| `metadata` | `{"balance": "450.00", "tier": "gold", "auto_renew": "true"}` |

---

## Scenarios by Domain

Detailed scenarios are organized by domain category in separate files:

| Domain | File | Scenarios |
|---|---|---|
| **Sales** | [scenarios/sales.md](scenarios/sales.md) | Walk-in Botox appointment billing, beauty bank credit redemption, Botox party group billing |
| **Inventory** | [scenarios/inventory.md](scenarios/inventory.md) | Receiving injectable shipment, Botox vial consumption during treatment, expired product write-off, inter-clinic transfer |
| **Plan** | [scenarios/plan.md](scenarios/plan.md) | Beauty bank membership setup, multi-session laser package, corporate wellness program |
| **Subscription** | [scenarios/subscription.md](scenarios/subscription.md) | Patient joins beauty bank, package purchase and session tracking, membership upgrade |
| **Client** | [scenarios/client.md](scenarios/client.md) | New patient onboarding, VIP member upgrade, corporate wellness account setup |
| **Product** | [scenarios/product.md](scenarios/product.md) | Adding a new injectable to the menu, seasonal promotion pricing, launching a new treatment category |

---

## Status-Driven Flow: InventoryTransaction → RevenueLineItem

In medical aesthetics, inventory consumption happens **during the appointment** — the practitioner uses physical product on the patient, and that consumption is recorded, priced, and billed at checkout. The `InventoryTransaction.status` field governs the lifecycle from scheduled appointment through treatment to billing.

### Proto Fields That Enable This

```
InventoryTransaction                         RevenueLineItem
├── status           ← lifecycle state       ├── inventory_item_id  ← which supply
├── transaction_type ← "consumption"         ├── inventory_serial_id← lot number
├── reference_type   ← "event" (appointment) ├── quantity           ← units used
├── reference_id     ← FK to appointment     ├── unit_price         ← from PriceList
├── quantity         ← units consumed        ├── total_price        ← qty × price
├── performed_by     ← treating practitioner └── line_item_type     ← "item"/"discount"
└── serial_number    ← lot number
```

### InventoryTransaction.status Values for Medical Aesthetics

| Status | Meaning | Revenue Impact |
|---|---|---|
| `"reserved"` | Stock allocated for an upcoming appointment | No revenue yet |
| `"prepared"` | Product drawn up / room set up for treatment | No revenue yet |
| `"consumed"` | Product administered to patient during treatment | Revenue eligible |
| `"completed"` | Checkout done, payment processed | Revenue recognized |
| `"cancelled"` | Appointment cancelled, reserved stock released | No revenue |
| `"wasted"` | Product opened but not fully used (partial vial) | → `inventory_depreciation` |
| `"expired"` | Product past expiration or reconstitution window | → `inventory_depreciation` |
| `"returned"` | Defective product returned to supplier | No revenue, credit from supplier |
| `"adjusted"` | Post-treatment correction (touch-up, complaint) | RevenueLineItem adjusted |

### Typical Flow: Botox Appointment

```
Patient books         ┌──────────┐
appointment ────────▶ │ reserved │ InventoryTransaction created
                      └────┬─────┘   quantity: 40 (estimated units)
                           │         reference_type: "event"
                           │         reference_id: "APT-2025-1847"
                           ▼
                      ┌──────────┐
Practitioner draws    │ prepared │ Vial reconstituted, syringe loaded
up product ─────────▶ └────┬─────┘   serial_number: "ALG-LOT-2025-0847"
                           │
                           ▼
                      ┌──────────┐
Injection performed   │ consumed │ ◀── REVENUE ELIGIBLE
(40 units used) ────▶ └────┬─────┘     Actual units recorded
                           │           performed_by: "DR-KIM-001"
                           ▼
                      ┌──────────┐
Patient checks out    │completed │ ◀── REVENUE RECOGNIZED
and pays ───────────▶ └──────────┘     RevenueLineItem created:
                                       ├── quantity: 40
                                       ├── unit_price: $14 (PriceList)
                                       └── total_price: $560
```

**Revenue recognition point**: At checkout (`"consumed"` → `"completed"`). Unlike professional services where billing happens on a cycle, medical aesthetics bills at the point of service — similar to retail POS but with a clinical step in between.

### Partial Vial / Waste Scenario

```
100-unit vial opened        ┌──────────┐
for patient A (40 units) ──▶│ consumed │ 40 of 100 units used
                            └──────────┘
                                 │
Remaining 60 units ─────────────┤
used for patients B, C today    │
                                │
If 15 units remain at end   ┌──────────┐
of reconstitution window ──▶│  wasted  │ → inventory_depreciation
(can't use after 24 hrs)    └──────────┘   15 units × $7 cost = $105 write-off
```

### Comparison with Other Verticals

| Aspect | Retail (POS) | Professional Services | Medical Aesthetics |
|---|---|---|---|
| **What is consumed?** | Product sold | Practitioner hours | Product consumed on patient |
| **Lifecycle length** | Instant | Days to weeks | 30-90 minutes (during appointment) |
| **Statuses before revenue** | 0 | 2-3 | 2-3 (reserved → prepared → consumed) |
| **Human checkpoints** | 0 | 2 (submit + approve) | 1 (practitioner records usage) |
| **Revenue trigger** | Sale scan | Billing cycle | Patient checkout |
| **Waste/loss path** | Shrinkage | Unbillable hours | Expired or partially used product |
| **Serialized tracking** | Optional (electronics) | Optional (employee ID) | Required (lot # for regulatory) |

---

## Design Decisions

- **Patient = Client**: Each patient is a `Client` record. For group events (Botox parties), the host is also a client, and guests may be temporary clients or have their own records.
- **Treatments are Products, not services**: A "Botox" treatment is a `Product` because it has physical inventory backing. The practitioner time is implicit in the treatment price (blended), not billed separately.
- **Lot tracking is mandatory**: Unlike retail where serial tracking is optional for high-value items, medical aesthetics requires lot tracking for all injectables due to patient safety, recall compliance, and regulatory requirements.
- **Consumption is appointment-linked**: Every `InventoryTransaction` references the specific `Event` (appointment) where the product was used, creating a full audit trail from patient to lot number.
- **Price blends service + materials**: The per-unit Botox price ($14/unit) implicitly includes both the product cost ($3.50-$7/unit wholesale) and the injector's expertise. There is no separate "injector fee" line item — it's blended.

## Open Questions & Considerations

- **Practitioner-specific pricing**: Some clinics charge different rates based on injector level (MD vs NP vs RN). This could use `product_variant` per practitioner tier, or `price_list` per practitioner.
- **Manufacturer loyalty programs**: Allergan's Alle and Galderma's Aspire programs create B2B2C reward flows. The `subscription` model could track patient enrollment in these external programs via `metadata`.
- **Partial vial sharing**: When one Botox vial serves multiple patients in a day, the `InventoryTransaction` model needs to support multiple consumption records against the same `inventory_serial` (lot-tracked vial) until it's depleted.
- **Financing**: CareCredit and Klarna "buy now, pay later" transactions may need a `payment` status flow (authorized → captured → installment) beyond simple card processing.
