# Events Services Vertical - Proto Domain Mapping

This document maps the Esqyma proto domain model to **events services** terminology — businesses that provide creative and logistical services for events, such as photography, videography, floral design, DJ/music, event planning, and catering. This vertical supports both **solo creatives** (a freelance photographer) and **multi-staff agencies** (a studio with photographers, videographers, and florists under one roof).

The core insight: **the calendar is the inventory, time blocks are the product, and the event is the central revenue-generating entity.** Unlike professional services (ongoing engagements billed by hours worked), events services sells **reserved blocks of creative talent** tied to specific dates — a photographer's Saturday in June is a finite, perishable resource that can never be recovered if unbooked.

---

## Quick Reference

| Schema Term | Events Services Term | Notes |
|---|---|---|
| `client` | **Client** | Couple, corporate host, birthday celebrant — whoever books |
| `staff` | **Creative / Service Provider** | Photographer, videographer, florist, DJ, planner |
| `delegate` | **Event Contact / Day-of Coordinator** | On-site liaison, planner acting on client's behalf |
| `admin` | **Studio Owner / Agency Director** | Back-office, calendar management, proposals |
| `location` | **Studio / Service Area** | Home studio, agency office, or coverage zone |
| `group` | **Team / Vendor Category Pool** | "Photo Team", "Video Team", "Floral Team" |
| `product` | **Service Offering** | "Wedding Photography", "Event Videography", "Floral Design" |
| `product_variant` | **Duration Tier** | 4-hour, 8-hour, half-day, full-day, multi-day |
| `collection` | **Service Category** | Photography, Video, Florals, Music, Planning |
| `resource` | **Portfolio / Contract Template / Shot List** | Digital assets attached to a service offering |
| `inventory_item` | **Staff Availability Calendar** | Each creative's bookable time capacity |
| `inventory_serial` | **Named Creative** | Specific photographer/videographer (non-interchangeable) |
| `inventory_transaction` | **Calendar Booking / Time Block Reservation** | Reserves a slot on a creative's calendar |
| `inventory_depreciation` | **Lost Date / Cancelled Booking** | Unrecoverable revenue from cancelled or unbooked dates |
| `plan` | **Service Package Template** | "Complete Wedding Package", "Corporate Event Bundle" |
| `plan_location` | **Service Coverage Area** | City, radius, travel zone, destination surcharge rules |
| `price_plan` | **Package Pricing** | Complete Wedding: $8K, Elopement: $2K, Corporate Half-Day: $3K |
| `subscription` | **Active Event Booking / Contract** | One per event — not recurring, tied to a specific date |
| `license` | **Included Add-on / Session Credit** | "1 engagement shoot included", "2 revision rounds" |
| `price_list` | **Seasonal Price Menu** | Peak (May-Oct), off-peak (Nov-Apr), holiday surcharge |
| `price_product` | **Service Rate per Duration Tier** | $2,500 for 8-hour wedding photography, $400/hr portrait |
| `invoice` | **Client Invoice** | Retainer invoice, balance invoice, add-on invoice |
| `balance` | **Client Account Balance** | Retainer paid vs total due, outstanding amount |
| `payment` | **Payment** | Retainer, installment, final balance — multiple per booking |
| `event` | **The Event** | Wedding, corporate gala, portrait session, consultation |
| `event_client` | **Client at the Event** | The couple, the corporate host, the birthday person |
| `event_product` | **Services Booked for This Event** | Photo + Video + Florals for the Smith Wedding |
| `revenue` | **Booking Revenue** | Total revenue from an event contract |
| `revenue_line_item` | **Service Line Item** | 8hrs Photography @ $300/hr, Bridal Bouquet @ $250 |
| `revenue_category` | **Revenue Stream** | Weddings, Corporate, Portraits, Micro-Events |
| `workflow` | **Booking Lifecycle** | Inquiry → Proposal → Contract → Event → Delivery |
| `stage` | **Lifecycle Phase** | Consultation, Planning, Event Day, Post-Production, Delivery |
| `activity` | **Task** | Send proposal, collect retainer, review shot list, edit photos |

---

## Domain Deep Dive

### Entity Domain → People & Service Areas

```
┌──────────────────────────────────────────────────────────┐
│  THE BUSINESS                                             │
│                                                           │
│  Solo Creative Mode:                                      │
│    staff  = the owner (photographer who IS the business)  │
│    admin  = the owner (wears both hats)                   │
│    group  = N/A (team of one)                             │
│                                                           │
│  Multi-Staff Agency Mode:                                 │
│    staff  = Named creative (Jane - lead photographer,     │
│             Tom - videographer, Priya - floral designer)   │
│    admin  = Studio owner / agency director / office mgr   │
│    group  = "Photo Team", "Video Team", "Floral Team"     │
│                                                           │
│  THE CLIENT                                               │
│                                                           │
│  client          → Booking client (couple, corporate host)│
│  delegate        → Event planner acting on client's behalf│
│  delegate_client → Links planner to their client          │
│                                                           │
│  SERVICE AREAS                                            │
│                                                           │
│  location        → Studio (Portland), Service Area (PNW)  │
│                    NOT the event venue — venue is client's │
│  group           → Client segments: "Wedding", "Corporate"│
│                                                           │
│  ACCESS                                                   │
│                                                           │
│  role            → Lead Creative, Second Shooter, Asst.   │
│  permission      → can_manage_calendar, can_send_proposal,│
│                    can_approve_booking, can_view_financials│
└──────────────────────────────────────────────────────────┘
```

The `client.customer_type` field maps to client tiers: `"retail"` → individual client (couple, birthday), `"wholesale"` → corporate/recurring account (company events team), `"vip"` → high-value client (luxury weddings, annual corporate retainer).

### Product Domain → Service Catalog & Time-Unit Pricing

**The "product" is the service offering. The "variant" is the duration tier. Clients can select fixed packages OR build custom combos from time-unit rates.**

```
┌──────────────────────────────────────────────────────────┐
│  SERVICE CATALOG HIERARCHY                                │
│                                                           │
│  collection (parent)  → "Photography"                     │
│    └── product        → "Wedding Photography"             │
│         ├── product_variant → "4-Hour (Elopement)"       │
│         ├── product_variant → "8-Hour (Full Day)"        │
│         ├── product_variant → "12-Hour (Dawn to Dusk)"   │
│         └── resource → portfolio_wedding.pdf, contract.docx│
│                                                           │
│  collection           → "Videography"                     │
│    └── product        → "Wedding Videography"             │
│         ├── product_variant → "Ceremony Only (2hr)"      │
│         ├── product_variant → "Half Day (6hr)"           │
│         └── product_variant → "Full Day (10hr)"          │
│                                                           │
│  collection           → "Floral Design"                   │
│    └── product        → "Wedding Florals"                 │
│         ├── product_variant → "Bridal Package"           │
│         │    (bouquet + boutonnieres + corsages)           │
│         ├── product_variant → "Ceremony Florals"         │
│         └── product_variant → "Full Venue (ceremony +    │
│              reception + centerpieces + arch)"             │
│                                                           │
│  collection           → "Music & Entertainment"           │
│    └── product        → "DJ Services"                     │
│         ├── product_variant → "Ceremony + Reception"     │
│         └── product_variant → "Reception Only (4hr)"     │
│                                                           │
│  PRICING (time-unit rates from seasonal menu)             │
│                                                           │
│  price_list      → "2025 Peak Season (May-Oct)"           │
│    ├── price_product → Wedding Photo 8hr @ $3,500         │
│    ├── price_product → Wedding Photo 4hr @ $2,000         │
│    ├── price_product → Wedding Video Full Day @ $4,000    │
│    ├── price_product → Bridal Floral Package @ $800       │
│    ├── price_product → Portrait Session 1hr @ $350        │
│    └── price_product → DJ Reception 4hr @ $1,200          │
│                                                           │
│  price_list      → "2025 Off-Peak (Nov-Apr)"              │
│    ├── price_product → Wedding Photo 8hr @ $2,800 (-20%) │
│    ├── price_product → Portrait Session 1hr @ $275        │
│    └── price_product → DJ Reception 4hr @ $950            │
│                                                           │
│  price_list      → "2025 Holiday Surcharge"               │
│    └── price_product → (All services +25% on NYE, July 4)│
│                                                           │
│  product.price   → Base/list price (before seasonal adj.) │
│  product.currency → USD                                   │
└──────────────────────────────────────────────────────────┘
```

The `price_list.location_id` enables **market-specific pricing** — a Portland studio charges differently than its Seattle satellite. The `date_start` / `date_end` fields naturally support seasonal pricing (peak wedding season May-October vs off-peak November-April).

**Key reinterpretation of `product.item_type`:**

| Value | Events Services Use Case |
|---|---|
| `"serialized"` | Named creative — a specific photographer the client books by name (non-interchangeable) |
| `"non_serialized"` | Pooled team capacity — "any available second shooter" (interchangeable within skill level) |
| `"consumable"` | One-time event supplies — disposable decor, candles, custom signage (used once, gone) |

### Inventory Domain → Calendar as Inventory

The inventory model in events services tracks **staff availability** as the primary resource. Each creative's calendar is the inventory — their bookable time slots are the "stock on hand."

```
┌──────────────────────────────────────────────────────────┐
│  STAFF AVAILABILITY REGISTRY                              │
│                                                           │
│  inventory_item (one per creative per location)           │
│    ├── name              → "Jane Martinez - Lead Photo"  │
│    ├── product_id        → FK to "Wedding Photography"   │
│    ├── product_variant_id→ FK to "8-Hour (Full Day)"     │
│    ├── location_id       → FK to "Portland Studio"       │
│    ├── sku               → "PHOTO-001-JANE"              │
│    ├── quantity_on_hand  → Available working days/month   │
│    ├── quantity_reserved → Days with confirmed bookings   │
│    ├── quantity_available→ on_hand - reserved             │
│    ├── unit_of_measure   → "days" or "hours"             │
│    └── item_type         → "serialized" (named creative) │
│                                                           │
│  inventory_serial   → Named creative identity             │
│    ├── serial_number → "PHOTO-001-JANE"                  │
│    └── (tracks: certifications, portfolio, specialties)   │
│                                                           │
│  CALENDAR BOOKING (the core transaction)                  │
│                                                           │
│  inventory_transaction (when a date is booked)            │
│    ├── "Jane booked for Smith Wedding, Jun 14, 8hr"      │
│    ├── "Tom booked for Smith Wedding, Jun 14, 10hr"      │
│    └── "Priya — floral setup, Jun 14, 6hr"               │
│         │                                                 │
│         ▼                                                 │
│  revenue_line_item (derived from booking)                 │
│    ├── 8hr photography × $3,500 (peak season rate)       │
│    ├── 10hr videography × $4,000                         │
│    └── Full venue florals × $3,200                       │
│         priced from: price_list (seasonal) + plan (pkg)  │
│                                                           │
│  inventory_depreciation                                   │
│    └── Cancelled booking write-off (if retainer refunded)│
│        Lost date — unrecoverable Saturday in June         │
└──────────────────────────────────────────────────────────┘
```

**The availability computation (Calendly-like engine):**

```
Available Slots = Working Hours (inventory_item metadata)
               — Existing Bookings (inventory_transactions with active status)
               — External Calendar Blocks (synced Google/Outlook/iCal)
               — Buffer Before/After (setup, teardown, travel time)
               — Blocked Personal Time (vacations, personal days)
               — Daily/Weekly Booking Limits (from plan config)

Filtered by:
  — Service assignment (which staff ↔ which products)
  — Duration fit (does the remaining window fit the requested block?)
  — Min/max advance rules (plan config: "book at least 14 days ahead")
  — Location/travel zone (plan_location: "within 50mi of Portland")

Displayed as:
  — Available dates at configured intervals
  — In client's local time zone (stored UTC)
  — With staff names (serialized) or "any available" (non_serialized)
```

**Key reinterpretation of `inventory_transaction.transaction_type`:**

| Value | Events Services Use Case |
|---|---|
| `"reservation"` | Calendar booking — date reserved for client event |
| `"hold"` | Soft hold — date tentatively held during proposal phase |
| `"block"` | Personal block — vacation, personal day, external commitment |
| `"travel"` | Travel time block — buffer for driving to/from venue |
| `"setup"` | Setup time — floral installation, equipment setup before event |
| `"teardown"` | Teardown time — equipment breakdown, cleanup after event |

### Subscription Domain → Packages & Event Contracts

```
┌──────────────────────────────────────────────────────────┐
│  PACKAGES & BOOKING CONTRACTS                             │
│                                                           │
│  plan               → "Complete Wedding Package"          │
│    ├── description  → "Photo + Video + Florals bundle"   │
│    ├── fulfillment_type → "schedule" (date-based booking) │
│    ├── booking_mode → "proposal" (requires proposal flow) │
│    ├── plan_location→ Portland, Seattle, Bend             │
│    └── collection_plan → Links to Photography, Video,     │
│                          Florals collections               │
│                                                           │
│  plan               → "Portrait Session"                  │
│    ├── description  → "1-hour portrait at studio or park" │
│    ├── fulfillment_type → "schedule"                      │
│    ├── booking_mode → "self_service" (Calendly-like)      │
│    └── plan_location→ Portland metro area                 │
│                                                           │
│  plan               → "Corporate Events Retainer"         │
│    ├── description  → "Annual retainer for quarterly      │
│    │                   corporate event coverage"           │
│    ├── fulfillment_type → "license" (event credits)       │
│    └── plan_location→ Pacific Northwest                   │
│                                                           │
│  PACKAGE PRICING (mix-and-match)                          │
│                                                           │
│  price_plan "Complete Wedding - $10,500"                  │
│    ├── amount: 10500.00                                   │
│    ├── Includes:                                          │
│    │    ├── 8hr lead photographer                         │
│    │    ├── 8hr second shooter                            │
│    │    ├── 10hr videographer                             │
│    │    ├── Full venue florals                            │
│    │    ├── 1 engagement shoot (license credit)           │
│    │    └── Online gallery + highlight reel               │
│    └── duration_unit: "event" (one-time, not recurring)   │
│                                                           │
│  price_plan "Elopement - $3,200"                          │
│    ├── amount: 3200.00                                    │
│    ├── Includes:                                          │
│    │    ├── 4hr photographer                              │
│    │    ├── Bridal bouquet + boutonniere                  │
│    │    └── Online gallery                                │
│    └── duration_unit: "event"                             │
│                                                           │
│  price_plan "À La Carte Hourly Rates"                     │
│    ├── amount: 0.00 (priced from price_list per service)  │
│    └── (clients build custom combos from time-unit rates) │
│                                                           │
│  subscription       → Active event contract               │
│    ├── client_id     → FK to "Smith-Johnson" (couple)     │
│    ├── price_plan_id → FK to "Complete Wedding"           │
│    ├── date_start    → 2025-06-14 (event date)            │
│    ├── date_end      → 2025-08-14 (delivery deadline)     │
│    ├── quantity      → 4 (service slots in package)       │
│    ├── assigned_count→ 4 (Jane, Tom, Priya, DJ Marco)    │
│    └── metadata      → {"venue": "Timberline Lodge",      │
│                          "retainer_amount": "3150.00",     │
│                          "retainer_paid": "true",          │
│                          "balance_due_date": "2025-05-14", │
│                          "cancellation_policy": "non_refundable_retainer",│
│                          "booking_mode": "proposal"}       │
│                                                           │
│  license (included add-ons)                               │
│    ├── License 1: "Engagement Shoot" — available          │
│    ├── License 2: "1 Revision Round" — available          │
│    └── License 3: "Online Gallery (1yr)" — available      │
└──────────────────────────────────────────────────────────┘
```

**Key reinterpretation of `plan.fulfillment_type`:**

| Value | Events Services Use Case |
|---|---|
| `"schedule"` | Date-based event booking — the primary model (book a specific date for services) |
| `"license"` | Event credits — corporate retainer with X events/year, or session credits for portrait clients |
| `"content"` | Consultation/planning services — event planning advisory, design consultations |
| `"physical"` | Physical deliverable packages — printed albums, USB drives, framed prints mailed after event |

**Configurable booking mode (per plan):**

| Mode | Flow | Use Case |
|---|---|---|
| `"self_service"` | Client sees availability → selects slot → pays deposit → confirmed | Portrait sessions, headshots, mini-sessions |
| `"proposal"` | Client inquires → admin sends proposal → negotiate → contract → retainer → confirmed | Weddings, large corporate events, custom packages |
| `"hybrid"` | Self-service creates booking at `hold` → admin reviews → sends custom proposal → contract | Medium events, unknown scope until consultation |

### Payment & Revenue → Split-Timeline Billing

Events services has a unique payment pattern: **revenue is split across multiple payments tied to event milestones**, unlike retail (instant) or professional services (billing cycle).

```
┌──────────────────────────────────────────────────────────┐
│  PAYMENT TIMELINE (typical wedding)                       │
│                                                           │
│  Booking (9 months before)                                │
│    ├── invoice_1 (retainer): $3,150 (30% of $10,500)     │
│    ├── payment_1: card payment, non-refundable retainer   │
│    └── ► Secures date, calendar locked                    │
│                                                           │
│  6 months before                                          │
│    ├── invoice_2 (progress): $3,675 (35%)                 │
│    ├── payment_2: card or ACH                             │
│    └── ► Planning phase begins                            │
│                                                           │
│  30 days before event                                     │
│    ├── invoice_3 (final balance): $3,675 (35%)            │
│    ├── payment_3: card or ACH                             │
│    └── ► Final details confirmed                          │
│                                                           │
│  Post-event (add-ons)                                     │
│    ├── invoice_4 (optional): $450 (album upgrade add-on)  │
│    └── payment_4: card                                    │
│                                                           │
│  REVENUE RECOGNITION                                      │
│                                                           │
│  revenue         → Total booking: $10,950 ($10,500 + $450)│
│  revenue_line_item:                                       │
│    ├── 8hr lead photographer @ $3,500                     │
│    ├── 8hr second shooter @ $1,500                        │
│    ├── 10hr videography @ $4,000                          │
│    ├── Full venue florals @ $3,200                        │
│    ├── Package discount: -$1,700 (bundle savings)         │
│    └── Album upgrade: $450 (post-event add-on)            │
│  revenue_category → "Weddings"                            │
│                                                           │
│  balance          → Tracks outstanding amount:            │
│    After retainer: $7,350 remaining                       │
│    After progress: $3,675 remaining                       │
│    After final:    $0 (add-on invoiced separately)        │
│                                                           │
│  RETAINER vs DEPOSIT distinction (in metadata):           │
│    retainer = non-refundable, secures the date            │
│    deposit  = refundable, applied toward total            │
└──────────────────────────────────────────────────────────┘
```

### Event Domain → The Core Entity

In events services, `event` is the **central, first-class entity** — everything orbits around it. This is the fundamental difference from other verticals where `event` is secondary.

| Schema | Events Services Example |
|---|---|
| `event` | "Smith-Johnson Wedding" (Sat Jun 14, Timberline Lodge, 10am-10pm) |
| `event_client` | Emily Smith & Jordan Johnson (the couple) |
| `event_product` | Lead Photographer (Jane, 8hr) + Videographer (Tom, 10hr) + Florals (Priya, 6hr) + DJ (Marco, 5hr) |
| `event_settings` | Venue: Timberline Lodge, setup_time: 90min, travel_time: 60min, teardown: 30min |
| `event_recurrence` | N/A for weddings; "Monthly headshot day" for recurring portrait events |
| `event` (simple) | "Davis Family Portraits" (Sun Oct 5, 2pm-3pm, Washington Park) |
| `event` (consult) | "Smith Wedding Consultation" (Zoom, 30min, self-booked via Calendly-style) |

### Workflow Domain → Booking Lifecycle

The booking lifecycle is **configurable per service** — weddings go through full proposal flow, portraits are self-service.

```
┌──────────────────────────────────────────────────────────┐
│  FULL PROPOSAL FLOW (weddings, large events)              │
│                                                           │
│  workflow  → "Smith-Johnson Wedding Booking"              │
│                                                           │
│  stage 1: Inquiry                                         │
│    ├── activity: "Contact form / referral received"      │
│    ├── activity: "Initial questionnaire sent"            │
│    ├── activity: "Review event details & date check"     │
│    └── activity: "Soft hold placed on calendar"          │
│                                                           │
│  stage 2: Consultation                                    │
│    ├── activity: "Discovery call / venue visit"          │
│    ├── activity: "Understand vision, style, budget"      │
│    └── activity: "Portfolio review with client"          │
│                                                           │
│  stage 3: Proposal                                        │
│    ├── activity: "Custom proposal drafted"               │
│    ├── activity: "Package options + add-ons presented"   │
│    ├── activity: "Client selects package / customizes"   │
│    └── activity: "Final quote confirmed"                 │
│                                                           │
│  stage 4: Contract & Retainer                             │
│    ├── activity: "Contract sent for e-signature"         │
│    ├── activity: "Contract signed by both parties"       │
│    ├── activity: "Retainer invoice generated"            │
│    ├── activity: "Retainer payment received"             │
│    └── activity: "Calendar confirmed (hold → confirmed)" │
│                                                           │
│  stage 5: Planning                                        │
│    ├── activity: "Detailed questionnaire sent"           │
│    ├── activity: "Timeline / shot list collaboration"    │
│    ├── activity: "Venue walkthrough (if applicable)"     │
│    ├── activity: "Progress payment collected"            │
│    ├── activity: "Final balance collected (30 days out)" │
│    └── activity: "Staff assignments finalized"           │
│                                                           │
│  stage 6: Event Day                                       │
│    ├── activity: "Setup / arrival at venue"              │
│    ├── activity: "Service delivery (shoot, perform)"     │
│    ├── activity: "Teardown / departure"                  │
│    └── activity: "Quick backup of files / wrap notes"    │
│                                                           │
│  stage 7: Post-Production                                 │
│    ├── activity: "Culling & editing (photography)"       │
│    ├── activity: "Video editing & color grading"         │
│    ├── activity: "Client preview / revision round"       │
│    └── activity: "Final edits applied"                   │
│                                                           │
│  stage 8: Delivery & Follow-Up                            │
│    ├── activity: "Gallery / video delivered"             │
│    ├── activity: "Album design & delivery (if add-on)"  │
│    ├── activity: "Review request sent"                   │
│    ├── activity: "Referral program invitation"           │
│    └── activity: "Anniversary reminder set (annual)"     │
│                                                           │
│  SELF-SERVICE FLOW (portraits, headshots, mini-sessions)  │
│                                                           │
│  workflow  → "Davis Family Portrait" (auto-created)       │
│                                                           │
│  stage 1: Booking (auto-advanced)                         │
│    ├── activity: "Client selects service & time slot"    │
│    ├── activity: "Terms accepted (auto-contract)"        │
│    ├── activity: "Payment collected (full or deposit)"   │
│    └── activity: "Calendar confirmed, confirmation sent" │
│                                                           │
│  stage 2: Event Day                                       │
│    └── activity: "Portrait session conducted"            │
│                                                           │
│  stage 3: Delivery                                        │
│    ├── activity: "Gallery delivered"                     │
│    └── activity: "Review request sent"                   │
└──────────────────────────────────────────────────────────┘
```

---

## Key Field Mappings

### InventoryItem Fields for Staff Availability

| Field | Events Services Meaning |
|---|---|
| `name` | Creative's name ("Jane Martinez - Lead Photographer") |
| `product_id` | Links to service offering ("Wedding Photography") |
| `product_variant_id` | Default duration tier ("8-Hour Full Day") |
| `location_id` | Home base / service area ("Portland Studio") |
| `sku` | Staff identifier ("PHOTO-001-JANE") |
| `unit_of_measure` | `"days"` for full-day creatives, `"hours"` for hourly services |
| `item_type` | `"serialized"` for named creatives, `"non_serialized"` for pooled team |
| `quantity_on_hand` | Bookable days/hours per month (working capacity) |
| `quantity_reserved` | Days/hours with confirmed bookings |
| `quantity_available` | on_hand − reserved |
| `reorder_level` | N/A (no restocking), but could trigger "low availability" alerts |
| `notes` | Specialties, certifications, equipment owned |

### InventoryTransaction Fields for Calendar Bookings

| Field | Events Services Meaning |
|---|---|
| `transaction_type` | `"reservation"` (confirmed booking), `"hold"` (soft hold), `"block"` (personal time), `"travel"`, `"setup"`, `"teardown"` |
| `reference_type` | `"subscription"` (links to event contract) or `"event"` (links to the event) |
| `reference_id` | FK to the specific event booking |
| `quantity` | Hours or days reserved (8 hours, 1 day) |
| `serial_number` | Staff identifier for the specific creative assigned |
| `performed_by` | Staff ID of the creative (same as serial_number for solo) |
| `status` | Lifecycle state (see Status-Driven Flow below) |
| `from_location_id` | Studio / home base |
| `to_location_id` | Event venue location |

### Subscription Fields for Event Contracts

| Field | Events Services Meaning |
|---|---|
| `name` | Event contract name ("Smith-Johnson Wedding — Jun 14") |
| `client_id` | The booking client |
| `price_plan_id` | Selected package or à la carte pricing |
| `date_start` | Event date |
| `date_end` | Delivery deadline (event date + post-production time) |
| `quantity` | Number of service slots in the package (4 = photo + video + florals + DJ) |
| `assigned_count` | Currently assigned staff (4 = Jane + Tom + Priya + Marco) |
| `available_count` | Unassigned slots (0 = fully staffed) |
| `metadata` | `{"venue": "...", "retainer_amount": "3150", "retainer_paid": "true", "balance_due_date": "2025-05-14", "cancellation_policy": "non_refundable_retainer", "booking_mode": "proposal", "timeline_url": "..."}` |

---

## Scenarios by Domain

Detailed scenarios are organized by domain category in separate files:

| Domain | File | Scenarios |
|---|---|---|
| **Sales** | [scenarios/sales.md](scenarios/sales.md) | Wedding package billing with milestone payments, portrait session self-service checkout, corporate event retainer billing |
| **Inventory** | [scenarios/inventory.md](scenarios/inventory.md) | Checking availability across staff calendars, booking a date with buffer/travel time, staff holiday/time-off blocking (studio-wide + individual), handling a cancellation and releasing the date, seasonal availability management |
| **Plan** | [scenarios/plan.md](scenarios/plan.md) | Complete wedding package setup, portrait mini-session (self-service) setup, corporate events retainer program, à la carte mix-and-match pricing |
| **Subscription** | [scenarios/subscription.md](scenarios/subscription.md) | Full wedding booking lifecycle, self-service portrait booking, corporate retainer with event credits, rescheduling an event |
| **Client** | [scenarios/client.md](scenarios/client.md) | Wedding couple onboarding, corporate account setup with delegate planner, referral-based VIP upgrade |
| **Product** | [scenarios/product.md](scenarios/product.md) | Adding a new service category, seasonal price menu rotation, package bundle design, staff-to-service assignment |

---

## Status-Driven Flow: InventoryTransaction → RevenueLineItem

In events services, the calendar booking progresses through a lifecycle from initial inquiry through event delivery. The `InventoryTransaction.status` field governs when the date is soft-held, confirmed, and when revenue is recognized. The booking mode (self-service vs proposal) determines which stages are traversed.

### Proto Fields That Enable This

```
InventoryTransaction                         RevenueLineItem
├── status           ← lifecycle state       ├── inventory_item_id  ← which creative
├── transaction_type ← "reservation"         ├── inventory_serial_id← specific creative
├── reference_type   ← "subscription"/event  ├── quantity           ← hours/days booked
├── reference_id     ← FK to event contract  ├── unit_price         ← from PriceList/Plan
├── quantity         ← hours/days reserved   ├── total_price        ← qty × price or pkg
├── performed_by     ← assigned creative     └── line_item_type     ← "item"/"discount"
└── serial_number    ← creative identifier
```

### InventoryTransaction.status Values for Events Services

| Status | Meaning | Revenue Impact | Calendar Impact |
|---|---|---|---|
| `"hold"` | Soft hold during inquiry/proposal phase | No revenue yet | Date tentatively blocked (with expiry) |
| `"proposed"` | Proposal sent, awaiting client response | No revenue yet | Date held until proposal expiry |
| `"contracted"` | Contract signed, awaiting retainer | No revenue yet | Date firmly held |
| `"confirmed"` | Retainer paid, date locked | **Retainer revenue recognized** | Date locked, no double-booking |
| `"in_progress"` | Event day — service being delivered | No additional revenue | Calendar slot consumed |
| `"completed"` | Event delivered, post-production in progress | Revenue eligible for balance | Event done |
| `"delivered"` | All deliverables sent to client | **Full revenue recognized** | Calendar freed |
| `"cancelled"` | Booking cancelled | Retainer may be forfeit or refunded | Date released back to availability |
| `"rescheduled"` | Date changed — creates new transaction for new date | No change (same contract) | Old date released, new date booked |
| `"expired"` | Soft hold expired without conversion | No revenue | Date released |
| `"no_show"` | Client no-show on event day | Revenue per cancellation policy | Calendar slot consumed |

### Typical Flow: Wedding Booking (Proposal Mode)

```
Client inquires          ┌──────────┐
via contact form ──────▶ │   hold   │ InventoryTransaction created
                         └────┬─────┘   quantity: 8 (hours)
                              │         transaction_type: "hold"
                              │         serial_number: "PHOTO-001-JANE"
                              ▼         (expires in 7 days if no response)
                         ┌──────────┐
Admin sends custom       │ proposed │ Proposal with package options
proposal ──────────────▶ └────┬─────┘   Hold extended to proposal expiry
                              │
                              ▼
                         ┌──────────┐
Client signs contract    │contracted│ Contract executed, awaiting retainer
                    ────▶└────┬─────┘   transaction_type updated: "reservation"
                              │
                              ▼
                         ┌──────────┐
Retainer payment         │confirmed │ ◀── RETAINER REVENUE RECOGNIZED
received ($3,150) ─────▶ └────┬─────┘     Calendar locked, staff assigned
                              │           RevenueLineItem: retainer
                              ▼
                         ┌───────────┐
Event day — service      │in_progress│ Creative on-site, delivering service
being delivered ────────▶└────┬──────┘
                              │
                              ▼
                         ┌──────────┐
Event wrapped up,        │completed │ Final balance collected
post-production ───────▶ └────┬─────┘   RevenueLineItem: balance payment
starts                        │
                              ▼
                         ┌──────────┐
Gallery/video            │delivered │ ◀── FULL REVENUE RECOGNIZED
delivered to client ───▶ └──────────┘     All deliverables sent
```

### Typical Flow: Portrait Session (Self-Service Mode)

```
Client selects slot      ┌──────────┐
on booking page ───────▶ │confirmed │ ◀── AUTO-ADVANCED (skip hold/proposed/contracted)
and pays ───────────────▶└────┬─────┘     Full payment collected at booking
                              │           Calendar locked immediately
                              ▼
                         ┌───────────┐
Session conducted ──────▶│ completed │
                         └────┬──────┘
                              ▼
                         ┌──────────┐
Gallery delivered ──────▶│delivered │ ◀── FULL REVENUE RECOGNIZED
                         └──────────┘
```

### Comparison with Other Verticals

| Aspect | Retail (POS) | Professional Services | Medical Aesthetics | Events Services |
|---|---|---|---|---|
| **What is consumed?** | Product sold | Practitioner hours | Product on patient | Creative's time block |
| **Lifecycle length** | Instant | Days to weeks | 30-90 minutes | Weeks to months (inquiry → delivery) |
| **Statuses before revenue** | 0 | 2-3 | 2-3 | 3-4 (hold → proposed → contracted → confirmed) |
| **Revenue trigger** | Sale scan | Billing cycle | Patient checkout | Retainer + final balance |
| **Revenue timing** | Instant | Monthly | Same-day | Split: booking → event → delivery |
| **Inventory nature** | Finite goods | Infinite hours | Finite consumables | **Perishable dates** (cannot restock a past Saturday) |
| **Waste/loss path** | Shrinkage | Unbillable hours | Expired product | Cancelled bookings, unbooked peak dates |
| **Serialized tracking** | Optional | Optional | Required (lot #) | Common (named creatives) |
| **Calendar centrality** | Low | Medium | High | **Central** (the entire business revolves around it) |

---

## Scheduling Engine — Proposed Proto Extensions

The following concepts are **partially supported** by existing proto fields via metadata, but would benefit from dedicated proto messages for type safety, validation, and reusability across verticals.

### Proposed New Messages

#### 1. AvailabilitySchedule

Defines a staff member's recurring weekly availability — the "working hours" that form the base layer of the availability computation.

```
message AvailabilitySchedule {
  string id = 1;
  string inventory_item_id = 2;     // FK to the staff member's inventory_item
  string name = 3;                  // "Default Schedule", "Summer Hours"
  bool active = 4;
  repeated AvailabilityWindow windows = 5;
  repeated DateOverride overrides = 6;
}

message AvailabilityWindow {
  int32 day_of_week = 1;            // 0=Sun, 1=Mon, ..., 6=Sat
  string start_time = 2;            // "09:00" (local time)
  string end_time = 3;              // "17:00"
}

message DateOverride {
  string date = 1;                  // "2025-12-25" (specific date)
  bool available = 2;               // false = blocked, true = open
  string start_time = 3;            // Override start (if available=true)
  string end_time = 4;              // Override end
  string reason = 5;                // "Holiday", "Vacation", "Special event"
}
```

**Why not metadata?** Availability windows are queried constantly during booking — they need to be structured for efficient lookup, not parsed from JSON strings. Every scheduling platform (Calendly, Acuity, HoneyBook) treats these as first-class entities.

#### 2. BookingPolicy

Configures the rules that govern how clients can book a particular service — the constraints that filter available slots.

```
message BookingPolicy {
  string id = 1;
  string plan_id = 2;                // FK to plan (service package)
  string product_id = 3;             // FK to product (service offering) — optional override

  // Time boundaries
  int32 min_advance_hours = 4;       // "Book at least 48 hours ahead"
  int32 max_advance_days = 5;        // "Book up to 365 days ahead"

  // Capacity limits
  int32 max_daily_bookings = 6;      // "Max 2 events per day" (0 = unlimited)
  int32 max_weekly_bookings = 7;     // "Max 5 events per week"

  // Duration constraints
  int32 min_duration_minutes = 8;    // Minimum bookable block
  int32 max_duration_minutes = 9;    // Maximum bookable block
  int32 scheduling_interval_minutes = 10;  // Start times every 15/30/60 min

  // Booking mode
  string booking_mode = 11;          // "self_service", "proposal", "hybrid"

  // Cancellation & rescheduling
  int32 cancellation_notice_hours = 12;  // "Cancel at least 72 hours before"
  int32 reschedule_notice_hours = 13;
  string cancellation_fee_type = 14;     // "none", "flat", "percentage", "retainer_forfeit"
  double cancellation_fee_amount = 15;   // Flat fee or percentage

  bool active = 16;
}
```

**Why not metadata?** Booking policies are evaluated on every availability check — they need structured fields for efficient comparison. Storing `"min_advance_hours": "48"` in metadata requires parsing, type conversion, and offers no validation. These are also cross-vertical useful (medical aesthetics appointments, professional services workshops).

#### 3. BufferConfig

Defines setup, teardown, and travel time buffers around events — the invisible padding that prevents back-to-back overbooking.

```
message BufferConfig {
  string id = 1;
  string product_id = 2;            // FK to service offering (per-service buffers)

  int32 buffer_before_minutes = 3;  // Prep/travel time before event
  int32 buffer_after_minutes = 4;   // Teardown/travel time after event
  int32 setup_minutes = 5;          // On-site setup (separate from travel)
  int32 teardown_minutes = 6;       // On-site teardown

  bool sync_to_calendar = 7;        // Show buffers as blocked on synced calendars
  bool visible_to_client = 8;       // Client sees "Photographer arrives 30min early"

  bool active = 9;
}
```

**Why not metadata?** Buffers are computed during every availability slot calculation. They directly affect what times clients see as available. Keeping them as typed fields enables the scheduling engine to apply them consistently without parsing.

#### 4. CalendarSync

Tracks external calendar connections for checking busy/free status — the integration layer that prevents double-booking across platforms.

```
message CalendarSync {
  string id = 1;
  string inventory_item_id = 2;     // FK to staff member
  string provider = 3;              // "google", "outlook", "ical"
  string calendar_id = 4;           // External calendar identifier
  string sync_direction = 5;        // "read" (check busy), "write" (push bookings), "both"
  bool active = 6;
  string last_synced_at = 7;        // ISO 8601 timestamp
}
```

**Why not metadata?** Calendar syncs require operational tracking (last sync time, provider-specific IDs, connection health). This is infrastructure, not configuration.

### Fields That Work Fine in Metadata

Not everything needs a proto extension. These concepts work well as `metadata` on existing entities:

| Concept | Existing Entity | Metadata Key | Example Value |
|---|---|---|---|
| Venue details | `subscription.metadata` | `"venue"` | `"Timberline Lodge, Mt Hood"` |
| Retainer terms | `subscription.metadata` | `"retainer_amount"`, `"retainer_type"` | `"3150.00"`, `"non_refundable"` |
| Hold expiry | `inventory_transaction.notes` | (or metadata if added) | `"Hold expires 2025-03-15"` |
| Client preferences | `client_attribute` | `"style_preference"` | `"Moody, dark & editorial"` |
| Staff specialties | `inventory_item.notes` | N/A | `"Specializes in elopements, outdoor"` |
| Event timeline | `event_settings` | `"timeline_url"` | Link to shared timeline doc |

---

## Design Decisions

- **Calendar is perishable inventory**: A photographer's Saturday in June cannot be restocked. If it's unbooked, that revenue opportunity is permanently lost — more like an airline seat or hotel room than retail stock. This makes availability management the single most critical business function.
- **Event is the central entity**: Unlike all other verticals where `subscription` or `inventory_transaction` drives the business, events services revolves around `event`. The event date determines pricing (seasonal), availability (calendar), staffing, and revenue timing.
- **Package-first for multi-service**: When a client books photo + video + florals, they select a `plan` (package) first. The package defines which services are included. Individual `inventory_transactions` (calendar bookings) and staff assignments happen as operational steps after the contract is signed — not during the client-facing booking flow.
- **Configurable booking mode**: Each `plan` specifies whether clients self-book (Calendly-like fast-track for portraits) or go through a proposal flow (for weddings). This is stored in plan configuration/metadata and determines which workflow stages are active vs auto-advanced.
- **Split-timeline revenue**: Revenue recognition happens at multiple points — retainer at booking (recognized immediately as earned, since it secures the date), and final balance at/after event delivery. This is unique across all verticals.
- **Named creatives are the norm**: Unlike professional services where resources may be interchangeable, events clients typically book a specific photographer by name after seeing their portfolio. `item_type: "serialized"` is the default, not the exception.
- **Buffers are operational, not cosmetic**: Setup time, travel time, and teardown time directly affect what a client sees as available. A 90-minute setup buffer before a wedding means the photographer's calendar shows "unavailable" starting 90 minutes before the event start time. This is why `BufferConfig` is proposed as a dedicated proto message.

## Open Questions & Considerations

- **Destination events & travel fees**: When a Portland photographer is booked for a destination wedding in Hawaii, how should travel costs be handled? Options: surcharge in `price_list` per travel zone, flat travel fee as a `revenue_line_item` add-on, or a "destination" `product_variant` with its own pricing.
- **Second shooter / assistant staffing**: For weddings requiring a lead + second shooter, should the second shooter be a separate `event_product` entry, or a sub-allocation within the lead photographer's `inventory_transaction`?
- **Album / print fulfillment**: Physical products (albums, framed prints) ordered after the event follow a retail-like fulfillment model. Should these use `fulfillment_type: "physical"` as a separate `plan`, or be modeled as post-event `license` redemptions within the existing contract?
- **Multi-day events**: Festivals and multi-day corporate retreats span 2-5 days. Should these be modeled as a single `event` with multi-day duration, or as multiple linked `event` records (one per day)?
- **Subcontracting**: When a studio subcontracts a videographer from another company for a wedding, the subcontractor's cost vs billing rate creates a margin. Should this use `inventory_item.item_type: "consumable"` (like contractor hours in professional services)?
