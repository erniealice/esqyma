# Events Services Scenarios: Plan (Packages & Service Programs)

Plan scenarios cover package template design — from full wedding bundles to self-service portrait sessions, corporate retainers, and à la carte mix-and-match pricing.

---

## Complete Wedding Package (Proposal Flow)

The studio designs its flagship wedding package that bundles multiple service categories at a package discount.

```
Plan "Complete Wedding Package"
  ├── name: "Complete Wedding Package"
  ├── description: "Your dream team — lead photographer,
  │    second shooter, videographer, and floral designer
  │    for seamless wedding day coverage."
  ├── fulfillment_type: "schedule" (date-based booking)
  ├── booking_mode: "proposal" (requires consultation +
  │    custom proposal before contract)
  ├── plan_location:
  │    ├── Portland (home base — no travel fee)
  │    ├── Seattle (travel fee: $300)
  │    └── Bend (travel fee: $150)
  └── collection_plan → Photography, Videography, Florals

PricePlan tiers:
  ┌──────────────────────────────────────────────────────┐
  │ PricePlan "Essentials ($7,500)"                       │
  │   ├── amount: 7500.00                                 │
  │   ├── duration_unit: "event"                          │
  │   ├── Included services:                              │
  │   │    ├── 8hr lead photographer                      │
  │   │    ├── 6hr videographer                           │
  │   │    ├── Bridal floral package                      │
  │   │    ├── Online gallery (1yr hosting)               │
  │   │    └── 3-min highlight video                      │
  │   ├── License entitlements: (none)                    │
  │   └── Savings: $1,300 vs à la carte total             │
  └──────────────────────────────────────────────────────┘
  ┌──────────────────────────────────────────────────────┐
  │ PricePlan "Premium ($10,500)"                         │
  │   ├── amount: 10500.00                                │
  │   ├── duration_unit: "event"                          │
  │   ├── Included services:                              │
  │   │    ├── 8hr lead photographer                      │
  │   │    ├── 8hr second shooter                         │
  │   │    ├── 10hr videographer (dawn-to-dusk)           │
  │   │    ├── Full venue florals                         │
  │   │    ├── Online gallery + USB delivery              │
  │   │    └── 8-min full wedding film + highlight        │
  │   ├── License entitlements:                           │
  │   │    ├── 1× engagement shoot (redeemable pre-wedding)│
  │   │    └── 2× revision rounds                         │
  │   └── Savings: $3,200 vs à la carte total             │
  └──────────────────────────────────────────────────────┘
  ┌──────────────────────────────────────────────────────┐
  │ PricePlan "Luxury ($16,000)"                          │
  │   ├── amount: 16000.00                                │
  │   ├── duration_unit: "event"                          │
  │   ├── Included services:                              │
  │   │    ├── 12hr lead photographer (dawn-to-dusk)      │
  │   │    ├── 12hr second shooter                        │
  │   │    ├── 12hr videographer                          │
  │   │    ├── Full venue florals + ceremony arch         │
  │   │    ├── DJ services (5hr reception)                │
  │   │    ├── Same-day edit preview (1-min teaser)       │
  │   │    └── Drone coverage                             │
  │   ├── License entitlements:                           │
  │   │    ├── 1× engagement shoot                        │
  │   │    ├── 1× rehearsal dinner coverage (2hr)         │
  │   │    ├── 3× revision rounds                         │
  │   │    ├── 1× premium leather album                   │
  │   │    └── 1× anniversary mini-session                │
  │   └── Savings: $5,500+ vs à la carte total            │
  └──────────────────────────────────────────────────────┘

BookingPolicy for this Plan:
  ├── booking_mode: "proposal"
  ├── min_advance_hours: 720 (30 days minimum)
  ├── max_advance_days: 730 (book up to 2 years ahead)
  ├── max_daily_bookings: 1 (no double-booking Saturdays)
  ├── cancellation_notice_hours: 720 (30 days)
  ├── cancellation_fee_type: "retainer_forfeit"
  └── reschedule_notice_hours: 336 (14 days)
```

**Key insight**: The `License` entitlements are what differentiate tiers beyond the event-day coverage. The Luxury tier includes 5 redeemable credits (engagement shoot, rehearsal coverage, revision rounds, album, anniversary session) — these are future bookable sessions that drive repeat engagement and lifetime value.

---

## Portrait Mini-Session (Self-Service Flow)

The studio offers 30-minute mini-sessions on select dates at a park. These are fully self-service — no consultation, no proposal.

```
Plan "Portrait Mini-Session"
  ├── name: "Portrait Mini-Session"
  ├── description: "Quick 30-minute portrait session at a
  │    curated park location. Perfect for families,
  │    couples, or professional headshots."
  ├── fulfillment_type: "schedule" (date-based booking)
  ├── booking_mode: "self_service" (Calendly-like)
  ├── plan_location → Portland (in-studio + select parks)
  └── collection_plan → "Portrait Photography"

PricePlan options:
  ┌──────────────────────────────────────────────────────┐
  │ PricePlan "Mini-Session 30min ($250)"                  │
  │   ├── amount: 250.00                                   │
  │   ├── duration_unit: "event"                           │
  │   ├── Included:                                       │
  │   │    ├── 30-min portrait session                    │
  │   │    ├── 15 edited digital images                   │
  │   │    └── Online gallery (6 months hosting)          │
  │   └── Payment: full amount at booking (no retainer)   │
  └──────────────────────────────────────────────────────┘
  ┌──────────────────────────────────────────────────────┐
  │ PricePlan "Extended Session 1hr ($400)"                │
  │   ├── amount: 400.00                                   │
  │   ├── Included:                                       │
  │   │    ├── 60-min portrait session                    │
  │   │    ├── 30 edited digital images                   │
  │   │    ├── Online gallery (1 year hosting)            │
  │   │    └── 1 outfit change                            │
  │   └── Payment: full amount at booking                 │
  └──────────────────────────────────────────────────────┘

BookingPolicy:
  ├── booking_mode: "self_service"
  ├── min_advance_hours: 24 (book by yesterday for tomorrow)
  ├── max_advance_days: 90 (rolling 3-month window)
  ├── max_daily_bookings: 4 (stacked back-to-back for
  │    mini-session events)
  ├── scheduling_interval_minutes: 45 (30min session +
  │    15min buffer for next client)
  ├── cancellation_notice_hours: 24
  ├── cancellation_fee_type: "percentage"
  └── cancellation_fee_amount: 50 (50% fee if <24hr)

BufferConfig:
  ├── buffer_before_minutes: 10 (arrive, greet client)
  ├── buffer_after_minutes: 5 (quick goodbye, notes)
  ├── setup_minutes: 0 (natural light, no setup)
  └── teardown_minutes: 0

Self-service booking flow:
  Client visits booking page
    ├── Sees calendar with available 45-min slots
    │    (30min session + 15min buffer = 45min intervals)
    ├── Selects: "Sunday Oct 12, 2:00 PM"
    ├── Fills in: name, email, phone, session type
    ├── Accepts terms (auto-contract)
    ├── Pays $250 via Stripe
    └── Confirmation email sent with:
         ├── Date, time, location
         ├── What to wear guide
         ├── "What to expect" FAQ
         └── Cancellation/reschedule link
```

**Key insight**: Self-service plans use `booking_mode: "self_service"` which auto-advances through hold → proposed → contracted → confirmed in a single transaction. The `scheduling_interval_minutes: 45` includes buffer time — clients see slots every 45 minutes even though the session is only 30 minutes. This mirrors Calendly's interval + buffer behavior exactly.

---

## Corporate Events Retainer

Velocity Tech signs an annual retainer for quarterly event coverage — photography, videography, and DJ for their all-hands meetings.

```
Plan "Corporate Events Retainer"
  ├── name: "Corporate Events Retainer"
  ├── description: "Annual retainer for recurring corporate
  │    events. Includes event credits redeemable for
  │    photography, videography, and DJ services."
  ├── fulfillment_type: "license" (event credits)
  ├── booking_mode: "proposal" (negotiated per client)
  ├── plan_location → Portland, Seattle
  └── collection_plan → Photography, Videography, Music

PricePlan "Quarterly Coverage ($15,000/yr)"
  ├── amount: 15000.00
  ├── duration_unit: "year"
  ├── duration_value: 1
  ├── Included:
  │    ├── 4 event credits per year
  │    ├── Each credit: up to 6 hours of coverage
  │    ├── Services: photo + video + DJ per event
  │    └── Overage rate: $350/hr beyond 6hr
  └── Payment: quarterly invoicing ($3,750/quarter)

When Velocity Tech signs:
  Subscription created:
    ├── client_id: FK to "Velocity Tech"
    ├── price_plan_id: FK to "Quarterly Coverage"
    ├── date_start: 2025-03-01
    ├── date_end: 2026-02-28
    ├── quantity: 4 (event credits)
    ├── assigned_count: 0
    ├── available_count: 4
    └── metadata: {"primary_contact": "Marcus Rivera",
                    "payment_terms": "net_30",
                    "overage_rate": "350",
                    "max_hours_per_credit": "6"}

  License records (one per event credit):
    ├── License 1: "Q1 Event Credit" — available
    ├── License 2: "Q2 Event Credit" — available
    ├── License 3: "Q3 Event Credit" — available
    └── License 4: "Q4 Event Credit" — available

When Velocity Tech books Q1 all-hands:
  ├── Marcus (delegate) contacts studio: "March 15, 200 ppl,
  │    10am-4pm, at our HQ conference center"
  ├── License 1 redeemed: "Q1 Event Credit"
  │    └── status: available → redeemed
  │
  ├── Event created: "Velocity Tech Q1 All-Hands"
  │    ├── event_client: Marcus Rivera (Velocity Tech)
  │    ├── event_product:
  │    │    ├── Event Photography (Jane, 6hr)
  │    │    ├── Event Videography (Tom, 6hr)
  │    │    └── DJ Services (Marco, 4hr)
  │    ├── start: Mar 15, 10:00 AM
  │    └── end: Mar 15, 4:00 PM
  │
  ├── InventoryTransactions:
  │    ├── Jane: "reservation", 6hr, confirmed
  │    ├── Tom: "reservation", 6hr, confirmed
  │    └── Marco: "reservation", 4hr, confirmed
  │
  └── Subscription updated:
       ├── assigned_count: 1
       └── available_count: 3

If event runs 7 hours (1 hour overage):
  └── Additional RevenueLineItem:
       ├── quantity: 1 (hour overage)
       ├── unit_price: $350 (overage rate from metadata)
       ├── total_price: $350
       └── line_item_type: "item"
```

**Key insight**: Corporate retainers use `fulfillment_type: "license"` — the same pattern medical aesthetics uses for beauty bank memberships. Each `License` represents one event credit. When Marcus books Q1, a license is redeemed and an event is created. This cleanly separates the *right to book* (license) from the *specific booking* (event + inventory transactions). Overages are billed as additional `RevenueLineItems` at the contract's overage rate.

---

## À La Carte Mix-and-Match

A client doesn't want a package — they want to pick individual services and build their own combination.

```
Plan "À La Carte Services"
  ├── name: "À La Carte Services"
  ├── description: "Build your own custom event coverage.
  │    Select individual services and durations."
  ├── fulfillment_type: "schedule"
  ├── booking_mode: "hybrid" (self-service for simple,
  │    proposal for complex combinations)
  └── collection_plan → All collections

PricePlan "À La Carte (from Price List)"
  ├── amount: 0.00 (no fixed package price)
  └── Pricing comes directly from active PriceList

Client builds custom combination:
  ┌──────────────────────────────────────────────────────┐
  │  Client: "I want a photographer for 6 hours and      │
  │   a DJ for the reception. No videography or florals." │
  │                                                       │
  │  Admin builds proposal:                               │
  │    ├── Product: "Wedding Photography"                 │
  │    │    ├── Variant: "6-Hour" (custom duration)       │
  │    │    └── Rate: $2,800 (from peak price list)       │
  │    │                                                  │
  │    ├── Product: "DJ Services"                         │
  │    │    ├── Variant: "Reception Only (4hr)"           │
  │    │    └── Rate: $1,200 (from peak price list)       │
  │    │                                                  │
  │    └── Total: $4,000                                  │
  │                                                       │
  │  Subscription created:                                │
  │    ├── price_plan_id: FK to "À La Carte"              │
  │    ├── quantity: 2 (service slots)                    │
  │    │                                                  │
  │    ├── RevenueLineItem 1:                             │
  │    │    ├── product: "Wedding Photography"            │
  │    │    ├── quantity: 6 (hours)                        │
  │    │    ├── unit_price: $466.67 (derived hourly)      │
  │    │    └── total_price: $2,800                       │
  │    │                                                  │
  │    └── RevenueLineItem 2:                             │
  │         ├── product: "DJ Services"                    │
  │         ├── quantity: 4 (hours)                        │
  │         ├── unit_price: $300 (derived hourly)          │
  │         └── total_price: $1,200                       │
  └──────────────────────────────────────────────────────┘

Client later wants to add florals:
  ├── Admin adds ProductVariant "Bridal Package" to booking
  ├── New RevenueLineItem: Bridal Florals @ $900 (peak)
  ├── Updated total: $4,900
  ├── Additional invoice sent for $900
  └── Priya assigned, InventoryTransaction created
```

**Key insight**: À la carte pricing has `amount: 0.00` on the `PricePlan` because each service is priced individually from the active `PriceList`. The `Subscription` becomes a container for multiple `RevenueLineItems` — each representing one service the client selected. This is the "mix-and-match" model where clients build exactly what they want without being constrained by predefined bundles.
