# Laundry Services Scenarios: Sales (Billing & Revenue)

Sales scenarios cover the billing flow from garment intake through processing to invoicing, across both walk-in and B2B models.

---

## Walk-in Customer Drop-Off

Marcus drops off a bag of laundry and two suits at the downtown drop-off location on his way to work Monday morning. He's not a subscriber — just needs clean clothes by Wednesday.

```
Marcus at the counter, 8:15 AM:
  │
  ├── Bag 1: Wash-and-fold (weighed at counter)
  │    └── Weight: 18 lbs
  │
  ├── Item 2: Navy suit (2-piece, dry clean)
  │
  └── Item 3: Grey suit (2-piece, dry clean)
  │
  ▼  Staff tags and weighs everything
  ┌──────────────────────────────────────────────────────┐
  │  InventoryTransaction (intake)                        │
  │    ├── transaction_type: "intake"                      │
  │    ├── from_location_id: null (walk-in customer)       │
  │    ├── to_location_id: FK to "Downtown Drop-Off"       │
  │    ├── quantity: 18 (lbs, wash-and-fold)               │
  │    ├── performed_by: "STAFF-COUNTER-JENNY"             │
  │    ├── reference_type: "order"                         │
  │    ├── reference_id: "ORD-2025-3847"                   │
  │    └── status: "received"                              │
  └──────────────────────────────────────────────────────┘
        │
        ▼  Processing pipeline (Mon-Wed)
        received → sorted → in_process → quality_check → completed
        │
        ▼  Wednesday: Marcus picks up
  ┌──────────────────────────────────────────────────────┐
  │  Revenue (Marcus, Order #3847)                        │
  │    ├── client_id: FK to Marcus                         │
  │    ├── location_id: FK to Downtown Drop-Off            │
  │    │                                                  │
  │    ├── RevenueLineItem 1                              │
  │    │    ├── product_id: FK to "Wash and Fold"          │
  │    │    ├── quantity: 18 (lbs)                          │
  │    │    ├── unit_price: $1.75/lb                        │
  │    │    ├── total_price: $31.50                         │
  │    │    └── line_item_type: "item"                      │
  │    │                                                  │
  │    ├── RevenueLineItem 2                              │
  │    │    ├── product_id: FK to "Suit Dry Clean 2-Piece" │
  │    │    ├── quantity: 2 (suits)                         │
  │    │    ├── unit_price: $18.00/suit                     │
  │    │    ├── total_price: $36.00                         │
  │    │    └── line_item_type: "item"                      │
  │    │                                                  │
  │    └── Revenue.total_amount: $67.50                   │
  └──────────────────────────────────────────────────────┘
        │
        ▼
  ┌──────────────┐
  │ Payment      │
  │ Card tap     │
  │ $67.50       │
  └──────────────┘
```

**Key insight**: Walk-in billing combines per-pound (wash-and-fold) and per-piece (dry cleaning) pricing on the same invoice. The `unit_of_measure` differs by product: pounds for laundry, pieces for dry cleaning. Both are resolved from the same `PriceList`.

---

## Monthly B2B Hotel Statement

The Grand Hotel has a 5-year linen service contract. At month-end, the laundry plant generates a detailed statement covering all pickups and deliveries for January.

```
Subscription "Grand Hotel Linen Program"
  ├── price_plan: "Hospitality Volume Contract"
  ├── metadata: {"model": "cog", "pickup_schedule": "daily_7am",
  │              "par_level": "3", "payment_terms": "net-30"}
  │
  ▼  January processing summary:
  ┌──────────────────────────────────────────────────────┐
  │  31 daily pickups, 31 daily deliveries                │
  │                                                       │
  │  Week 1 (Jan 1-7):                                    │
  │    ├── 1,400 bed sheets processed                      │
  │    ├── 2,100 bath towels processed                     │
  │    ├── 350 tablecloths processed                       │
  │    └── 1 express run (New Year's surge): 200 sheets    │
  │                                                       │
  │  Week 2-4: similar volumes (occupancy-dependent)       │
  │                                                       │
  │  January totals:                                       │
  │    ├── Bed sheets: 5,800 pieces                        │
  │    ├── Bath towels: 8,400 pieces                       │
  │    ├── Tablecloths: 1,200 pieces                       │
  │    └── Express runs: 3 (surcharge applies)             │
  └──────────────────────────────────────────────────────┘
        │
        ▼  Rate lookup: PriceList "2025 Hospitality Contract Rates"
  ┌──────────────────────────────────────────────────────┐
  │  Revenue (Grand Hotel, January 2025)                  │
  │    ├── client_id: FK to Grand Hotel                    │
  │    │                                                  │
  │    ├── RevenueLineItem 1                              │
  │    │    ├── product_id: FK to "Bed Sheet Processing"   │
  │    │    ├── quantity: 5,800 (pieces)                    │
  │    │    ├── unit_price: $0.45/piece                     │
  │    │    ├── total_price: $2,610.00                      │
  │    │    └── line_item_type: "item"                      │
  │    │                                                  │
  │    ├── RevenueLineItem 2                              │
  │    │    ├── product_id: FK to "Bath Towel Processing"  │
  │    │    ├── quantity: 8,400 (pieces)                    │
  │    │    ├── unit_price: $0.35/piece                     │
  │    │    ├── total_price: $2,940.00                      │
  │    │    └── line_item_type: "item"                      │
  │    │                                                  │
  │    ├── RevenueLineItem 3                              │
  │    │    ├── product_id: FK to "Tablecloth Processing"  │
  │    │    ├── quantity: 1,200 (pieces)                    │
  │    │    ├── unit_price: $1.20/piece                     │
  │    │    └── total_price: $1,440.00                      │
  │    │                                                  │
  │    ├── RevenueLineItem 4 (express surcharge)          │
  │    │    ├── product_id: FK to "Express Surcharge"      │
  │    │    ├── quantity: 3 (runs)                          │
  │    │    ├── unit_price: $150.00/run                     │
  │    │    └── total_price: $450.00                        │
  │    │                                                  │
  │    └── Revenue.total_amount: $7,440.00                │
  └──────────────────────────────────────────────────────┘
        │
        ▼
  Invoice "INV-GRAND-2025-01" generated
  ├── Due date: Feb 28, 2025 (Net-30)
  └── Payment: ACH wire, PO# GH-2025-LINEN-01
```

**Key insight**: B2B hotel billing is volume-based with per-piece pricing. The `RevenueLineItem` aggregates an entire month of daily processing into line items by product type. Express surcharges are separate line items — the hotel pays a premium for unscheduled rush runs during high-occupancy periods.

---

## Residential Subscription Overage

Emma has a "Weekly Pickup" plan — $99/month for 4 bags (up to 30 lbs each). This month she's doing spring cleaning and exceeds her allowance.

```
Subscription "Emma's Weekly Pickup"
  ├── price_plan: "Residential Weekly - $99/month"
  ├── quantity: 4 (bags per month)
  ├── assigned_count: 4 (all 4 bags used by week 3)
  └── available_count: 0

Week 4: Emma has another bag ready
  │
  ├── Bag is picked up as usual (driver doesn't turn it away)
  ├── Weighed at plant: 28 lbs
  └── Flagged as overage: 5th bag, beyond plan allowance
  │
  ▼
  ┌──────────────────────────────────────────────────────┐
  │  Revenue (Emma, January 2025)                         │
  │    │                                                  │
  │    ├── RevenueLineItem 1 (subscription base)          │
  │    │    ├── description: "Weekly Pickup — Jan 2025"    │
  │    │    ├── quantity: 1                                 │
  │    │    ├── unit_price: $99.00                          │
  │    │    ├── total_price: $99.00                         │
  │    │    └── line_item_type: "item"                      │
  │    │                                                  │
  │    ├── RevenueLineItem 2 (overage)                    │
  │    │    ├── product_id: FK to "Wash and Fold"          │
  │    │    ├── description: "Overage — 1 bag (28 lbs)"    │
  │    │    ├── quantity: 28 (lbs)                          │
  │    │    ├── unit_price: $2.25/lb (standard walk-in rate)│
  │    │    ├── total_price: $63.00                         │
  │    │    └── line_item_type: "item"                      │
  │    │                                                  │
  │    └── Revenue.total_amount: $162.00                  │
  └──────────────────────────────────────────────────────┘

Auto-billed to Emma's card on file.
Subscription.assigned_count: 4 → 5 (overage tracked)

Notification sent:
  "Hi Emma! You used 5 of your 4 monthly bags. The extra bag
   (28 lbs) was billed at our standard rate of $2.25/lb ($63).
   Want to upgrade to our 6-bag plan ($139/month)? Reply YES."
```

**Key insight**: Overages bill at the standard walk-in rate, which is higher than the effective per-pound rate of the subscription. This creates a natural upgrade incentive — Emma's 5 bags would cost $139 on the 6-bag plan vs. $162 with overage. The proactive upgrade SMS drives retention.
