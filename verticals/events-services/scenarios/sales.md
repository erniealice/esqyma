# Events Services Scenarios: Sales (Billing & Revenue)

Sales scenarios cover the billing flow from booking through milestone payments to final delivery — including package billing, self-service checkout, and corporate retainer billing.

---

## Wedding Package Billing with Milestone Payments

Emily Smith books the "Complete Wedding — Premium ($10,500)" package. Payment is split across three milestones: retainer, progress, and final balance.

```
Booking confirmed (9 months before wedding):
  │
  ├── Total package price: $10,500
  │
  ├── Payment schedule (from subscription.metadata):
  │    ├── Retainer (30%): $3,150 — due at contract signing
  │    ├── Progress (35%): $3,675 — due 6 months before
  │    └── Final (35%): $3,675 — due 30 days before event
  │
  ▼  Milestone 1: Retainer
  ┌──────────────────────────────────────────────────────┐
  │  Invoice 1 "Retainer — Smith-Johnson Wedding"         │
  │    ├── RevenueLineItem:                               │
  │    │    ├── description: "Wedding Package Retainer"    │
  │    │    ├── total_price: $3,150                        │
  │    │    └── line_item_type: "item"                     │
  │    └── Invoice.total: $3,150                          │
  │                                                       │
  │  Payment 1:                                           │
  │    ├── amount: $3,150                                  │
  │    ├── method: Visa ****8821                           │
  │    └── type: "retainer"                                │
  │                                                       │
  │  Balance after: $7,350 outstanding                    │
  └──────────────────────────────────────────────────────┘
        │
        ▼  Milestone 2: Progress (6 months before)
  ┌──────────────────────────────────────────────────────┐
  │  Invoice 2 "Progress Payment — Smith-Johnson Wedding" │
  │    ├── RevenueLineItem:                               │
  │    │    ├── description: "Progress Payment (35%)"      │
  │    │    ├── total_price: $3,675                        │
  │    │    └── line_item_type: "item"                     │
  │    └── Invoice.total: $3,675                          │
  │                                                       │
  │  Payment 2:                                           │
  │    ├── amount: $3,675                                  │
  │    ├── method: ACH transfer                            │
  │    └── type: "progress"                                │
  │                                                       │
  │  Balance after: $3,675 outstanding                    │
  └──────────────────────────────────────────────────────┘
        │
        ▼  Milestone 3: Final balance (30 days before)
  ┌──────────────────────────────────────────────────────┐
  │  Invoice 3 "Final Balance — Smith-Johnson Wedding"    │
  │    ├── RevenueLineItem:                               │
  │    │    ├── description: "Final Balance (35%)"         │
  │    │    ├── total_price: $3,675                        │
  │    │    └── line_item_type: "item"                     │
  │    └── Invoice.total: $3,675                          │
  │                                                       │
  │  Payment 3:                                           │
  │    ├── amount: $3,675                                  │
  │    ├── method: Visa ****8821                           │
  │    └── type: "final_balance"                           │
  │                                                       │
  │  Balance after: $0.00 — FULLY PAID                    │
  └──────────────────────────────────────────────────────┘

Post-event add-on (2 weeks after delivery):
  ┌──────────────────────────────────────────────────────┐
  │  Emily adds a premium leather album ($1,200)          │
  │                                                       │
  │  Invoice 4 "Album Upgrade — Smith-Johnson"            │
  │    ├── RevenueLineItem:                               │
  │    │    ├── product: "Premium Leather Album"           │
  │    │    ├── quantity: 1                                 │
  │    │    ├── unit_price: $1,200                         │
  │    │    └── line_item_type: "item"                     │
  │    └── Invoice.total: $1,200                          │
  │                                                       │
  │  Payment 4: $1,200 via Visa                           │
  └──────────────────────────────────────────────────────┘

Total Revenue:
  ┌──────────────────────────────────────────────────────┐
  │  Revenue "Smith-Johnson Wedding"                      │
  │    ├── RevenueLineItem: Lead Photo 8hr = $3,500       │
  │    ├── RevenueLineItem: 2nd Shooter 8hr = $1,500      │
  │    ├── RevenueLineItem: Video 10hr = $4,000            │
  │    ├── RevenueLineItem: Full Venue Florals = $3,200    │
  │    ├── RevenueLineItem: Package discount = -$1,700     │
  │    │    └── line_item_type: "discount"                 │
  │    ├── RevenueLineItem: Album upgrade = $1,200         │
  │    └── Revenue.total_amount: $11,700                  │
  │                                                       │
  │  Payments: $3,150 + $3,675 + $3,675 + $1,200 = $11,700│
  │  Revenue category: "Weddings"                         │
  └──────────────────────────────────────────────────────┘
```

**Key insight**: Events services billing splits revenue across multiple invoices tied to milestones — unlike retail (single checkout) or professional services (monthly billing cycle). Each `Invoice` represents a payment milestone, while the `Revenue` record aggregates total booking value. Post-event add-ons like albums are additional `RevenueLineItems` that increase the total beyond the original package price.

---

## Portrait Session — Self-Service Checkout

Alex Davis books and pays for a family portrait in a single transaction. No milestones, no split payments.

```
Client selects "Extended Session 1hr ($400)" on booking page
  │
  ├── Payment collected at booking (full amount):
  │
  ▼
  ┌──────────────────────────────────────────────────────┐
  │  Revenue "Davis Family Portraits"                     │
  │    ├── client_id: FK to Alex Davis                     │
  │    ├── location_id: FK to Portland                     │
  │    │                                                  │
  │    ├── RevenueLineItem:                               │
  │    │    ├── product_id: FK to "Portrait Photography"   │
  │    │    ├── product_variant_id: FK to "1-Hour Extended"│
  │    │    ├── quantity: 1 (session)                       │
  │    │    ├── unit_price: $400.00                        │
  │    │    ├── total_price: $400.00                       │
  │    │    └── line_item_type: "item"                     │
  │    │                                                  │
  │    └── Revenue.total_amount: $400.00                  │
  └──────────────────────────────────────────────────────┘
        │
        ▼
  ┌──────────────────────────────────────────────────────┐
  │  Invoice "Portrait Session — Davis"                   │
  │    └── total: $400.00                                  │
  │                                                       │
  │  Payment:                                             │
  │    ├── amount: $400.00                                 │
  │    ├── method: Stripe (card)                           │
  │    └── Processed at booking time                       │
  └──────────────────────────────────────────────────────┘

  Balance: $0.00 (fully paid at booking)

Revenue recognition:
  ├── Full $400 recognized at booking (prepaid service)
  ├── If client cancels >24hr before: full refund
  ├── If client cancels <24hr before: 50% fee ($200 kept)
  └── If no-show: full amount retained
```

**Key insight**: Self-service portrait billing mirrors a retail POS transaction — single payment, instant revenue recognition. The key difference from retail is that the service hasn't been delivered yet (the session is in the future). Revenue is technically "deferred" until the session occurs, but for small-business accounting, most studios recognize it at booking.

---

## Corporate Event — Retainer + Overage Billing

Velocity Tech uses their Q3 event credit for a product launch party. The event runs 8 hours (2 hours over their 6-hour credit), generating overage charges.

```
Subscription "Velocity Tech — Annual Retainer"
  ├── Retainer: $15,000/year (billed $3,750/quarter)
  ├── Credits remaining: 2 (Q3 + Q4)
  └── metadata: {"overage_rate": "350", "max_hours_per_credit": "6"}

Marcus books: "Product Launch Party — Oct 3, 10am-6pm (8 hours)"
  ├── License 3 "Q3 Event Credit" redeemed
  └── Services: Photography (8hr) + Videography (8hr)

Revenue breakdown:
  ┌──────────────────────────────────────────────────────┐
  │  Invoice "Velocity Tech — Q3 Event"                   │
  │                                                       │
  │  Section 1: Covered by retainer credit                │
  │    ├── RevenueLineItem:                               │
  │    │    ├── "Q3 Event Credit — Photography (6hr)"     │
  │    │    ├── total_price: $0.00 (prepaid)              │
  │    │    └── line_item_type: "item"                     │
  │    └── RevenueLineItem:                               │
  │         ├── "Q3 Event Credit — Videography (6hr)"     │
  │         ├── total_price: $0.00 (prepaid)              │
  │         └── line_item_type: "item"                     │
  │                                                       │
  │  Section 2: Overage charges                           │
  │    ├── RevenueLineItem:                               │
  │    │    ├── "Photography overage: 2hr × $350"         │
  │    │    ├── quantity: 2                                 │
  │    │    ├── unit_price: $350.00                        │
  │    │    ├── total_price: $700.00                       │
  │    │    └── line_item_type: "item"                     │
  │    └── RevenueLineItem:                               │
  │         ├── "Videography overage: 2hr × $350"         │
  │         ├── quantity: 2                                 │
  │         ├── unit_price: $350.00                        │
  │         ├── total_price: $700.00                       │
  │         └── line_item_type: "item"                     │
  │                                                       │
  │  Invoice.total: $1,400 (overage only)                 │
  │  Payment terms: net 30                                │
  └──────────────────────────────────────────────────────┘

Quarterly retainer billing (separate):
  ┌──────────────────────────────────────────────────────┐
  │  Invoice "Velocity Tech — Q4 Retainer"                │
  │    ├── RevenueLineItem:                               │
  │    │    ├── "Annual Retainer Q4 installment"           │
  │    │    ├── total_price: $3,750                        │
  │    │    └── line_item_type: "item"                     │
  │    └── Invoice.total: $3,750                          │
  │                                                       │
  │  Payment: $3,750 via ACH (net 30)                     │
  └──────────────────────────────────────────────────────┘

Total Q3 revenue from Velocity Tech:
  ├── Retainer installment: $3,750 (recognized from subscription)
  ├── Overage: $1,400 (recognized at event completion)
  └── Q3 total: $5,150
```

**Key insight**: Corporate billing separates retainer invoices (recurring quarterly) from event-specific overage invoices. The retainer revenue is recognized on a schedule (quarterly), while overage is event-triggered. On the invoice, prepaid credits show as `$0.00` line items so the client sees exactly what their retainer covers vs. what's extra — this transparency reduces disputes.

---

## Cancelled Booking — Retainer Forfeit vs Refund

Two cancellation scenarios showing how the retainer policy affects revenue.

```
SCENARIO A: Non-refundable retainer (>30 days before event)
  ┌──────────────────────────────────────────────────────┐
  │  Martinez-Lopez Wedding — cancelled Jul 15            │
  │  Event was: Sep 20 (67 days away)                     │
  │  Cancellation policy: "non_refundable_retainer"       │
  │                                                       │
  │  Retainer: $3,000 (KEPT — non-refundable)             │
  │    ├── Revenue.status: "earned"                       │
  │    ├── RevenueLineItem: "Retainer - forfeited"         │
  │    │    total_price: $3,000                            │
  │    └── No refund issued                                │
  │                                                       │
  │  Remaining balance: $7,000 (CANCELLED — never invoiced)│
  │    └── No revenue, no invoice needed                   │
  │                                                       │
  │  Depreciation:                                        │
  │    ├── inventory_depreciation:                         │
  │    │    reason: "cancellation"                         │
  │    │    estimated_value: $7,000 (potential lost)       │
  │    └── If Sep 20 rebooks later: depreciation offset    │
  └──────────────────────────────────────────────────────┘

SCENARIO B: Late cancellation with penalty (<30 days)
  ┌──────────────────────────────────────────────────────┐
  │  Kim Corporate Event — cancelled Aug 10               │
  │  Event was: Aug 20 (10 days away)                     │
  │  Cancellation policy: "50_percent_within_30_days"      │
  │                                                       │
  │  Contract total: $4,000                               │
  │  Already paid: $2,000 (retainer)                       │
  │  Outstanding: $2,000                                   │
  │                                                       │
  │  Late cancellation fee: 50% of total = $2,000          │
  │    ├── $2,000 retainer covers the fee exactly          │
  │    ├── No additional charge, no refund                 │
  │    └── Revenue earned: $2,000                          │
  │                                                       │
  │  Revenue record:                                      │
  │    ├── RevenueLineItem: "Late cancellation fee"        │
  │    │    total_price: $2,000                            │
  │    └── line_item_type: "item"                          │
  │                                                       │
  │  Depreciation:                                        │
  │    ├── inventory_depreciation:                         │
  │    │    reason: "late_cancellation"                    │
  │    │    estimated_value: $2,000 (50% not earned)       │
  │    └── Peak Saturday in August — high rebook potential  │
  └──────────────────────────────────────────────────────┘
```

**Key insight**: Cancellation revenue flows through the same `RevenueLineItem` model — the forfeited retainer or cancellation fee becomes a revenue line item. The `inventory_depreciation` records the *unrealized potential* (what could have been earned if the event happened). This dual-tracking gives the business visibility into both actual revenue and lost opportunity cost, which is critical for understanding true peak-season utilization.
