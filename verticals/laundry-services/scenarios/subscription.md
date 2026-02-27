# Laundry Services Scenarios: Subscription (Active Contracts)

Subscription scenarios cover active service contracts — how B2B deals are structured, residential plans managed, and contracts renewed.

---

## Hotel Signs a 5-Year Linen Contract

The Grand Hotel's facilities director, Maria Santos, negotiates a comprehensive linen service contract after their previous provider had quality issues. The 3-month onboarding involves par level setup, RFID tagging, and route integration.

```
Step 1: Client and delegate setup
  ├── Client: "Grand Hotel" (customer_type: "wholesale")
  ├── Delegate: "Maria Santos" (Facilities Director)
  │    └── delegate_client → links to Grand Hotel
  └── Delegate: "Tom Park" (Housekeeping Manager)
       └── delegate_client → links to Grand Hotel

Step 2: Select program and pricing
  ├── Plan: "Full-Service Hotel Linen Rental"
  └── PricePlan: "Grand Hotel - 200 Rooms - Monthly"
       ├── amount: ~$15,000/month (volume-dependent)
       └── duration: 5 years

Step 3: Create the contract
  ┌──────────────────────────────────────────────────────┐
  │  Subscription                                         │
  │    ├── name: "Grand Hotel Linen Program"               │
  │    ├── client_id: FK to Grand Hotel                    │
  │    ├── price_plan_id: FK to "Grand Hotel Monthly"      │
  │    ├── date_start: Mar 1, 2025                         │
  │    ├── date_end: Feb 28, 2030 (5 years)                │
  │    ├── quantity: 3000 (pieces in rotation — 3-par)     │
  │    ├── assigned_count: 0 (none delivered yet)          │
  │    ├── available_count: 3000                           │
  │    └── metadata: {                                      │
  │         "model": "rental",                              │
  │         "par_level": "3",                               │
  │         "rooms": "200",                                 │
  │         "pickup_schedule": "daily_7am",                 │
  │         "delivery_schedule": "daily_5pm",               │
  │         "payment_terms": "net-30",                      │
  │         "contract_ref": "CTR-2025-GRAND-001",           │
  │         "previous_provider": "CleanTex Corp",           │
  │         "escalation_clause": "3%_annual_cap"            │
  │       }                                                │
  └──────────────────────────────────────────────────────┘

Step 4: Onboarding workflow (90 days)
  Workflow "Hotel Linen Onboarding - Grand Hotel"
    ├── Stage 1: Inventory Setup (Week 1-2)
    │    ├── activity: "Survey hotel: room count, linen specs"
    │    ├── activity: "Order initial linen inventory (3-par)"
    │    └── activity: "RFID tag all 3,000 pieces"
    │
    ├── Stage 2: Route Integration (Week 3-4)
    │    ├── activity: "Add Grand Hotel to daily route MON-HOTEL-01"
    │    ├── activity: "Install RFID scanner at hotel loading dock"
    │    └── activity: "Driver training on hotel-specific procedures"
    │
    ├── Stage 3: Parallel Run (Week 5-8)
    │    ├── activity: "Process alongside old provider (transition)"
    │    └── activity: "Daily quality check with Maria Santos"
    │
    └── Stage 4: Full Cutover (Week 9-12)
         ├── activity: "Old provider terminated"
         ├── activity: "Full volume processing begins"
         └── activity: "First month invoice generated"
```

**Key insight**: The `metadata` field carries the full contract context — par levels, escalation clauses, payment terms, even the previous provider reference. The 90-day onboarding is modeled as a `Workflow` with stages, ensuring no step is missed during the complex transition.

---

## Resident Joins the Weekly Plan

Emma discovers the service through a neighborhood flyer and signs up for the Standard 4-bag plan via the mobile app.

```
Step 1: Sign up via app
  ├── Client created:
  │    ├── first_name: "Emma", last_name: "Rodriguez"
  │    ├── customer_type: "retail"
  │    ├── address: "742 Maple St, Apt 3B" (for pickup)
  │    └── client_attribute:
  │         ├── key: "zone", value: "downtown"
  │         ├── key: "detergent_pref", value: "hypoallergenic"
  │         └── key: "fold_style", value: "marie_kondo"

Step 2: Select plan
  ├── Plan: "Weekly Pickup & Delivery"
  ├── PricePlan: "Standard - 4 Bags - $99/month"
  └── Pickup zone: Downtown (Monday pickup, Wednesday delivery)

Step 3: Subscription activated
  ┌──────────────────────────────────────────────────────┐
  │  Subscription                                         │
  │    ├── name: "Emma Rodriguez - Weekly Standard"        │
  │    ├── client_id: FK to Emma                           │
  │    ├── price_plan_id: FK to "Standard 4-Bag"           │
  │    ├── date_start: Jan 6, 2025                         │
  │    ├── date_end: null (month-to-month, auto-renew)     │
  │    ├── quantity: 4 (bags per month)                    │
  │    ├── assigned_count: 0                               │
  │    ├── available_count: 4                              │
  │    ├── auto_assign: true                               │
  │    └── metadata: {                                      │
  │         "route": "MON-DT-01",                           │
  │         "pickup_day": "monday",                         │
  │         "delivery_day": "wednesday",                    │
  │         "pickup_window": "7am-9am",                     │
  │         "delivery_window": "5pm-7pm",                   │
  │         "bag_location": "front_porch"                   │
  │       }                                                │
  └──────────────────────────────────────────────────────┘

Step 4: Added to Monday route
  ├── Event "Monday Downtown Route" (recurring weekly)
  │    └── event_client: Emma added to stop #7
  └── Driver Carlos gets updated route: ... → Stop 7: 742 Maple St → ...

Step 5: First pickup (Jan 6)
  ├── Driver scans Emma's bag: 24 lbs
  ├── InventoryTransaction (intake): status "received"
  ├── Subscription: assigned_count: 0 → 1, available_count: 4 → 3
  └── Emma notified: "Bag picked up! Expect delivery Wednesday 5-7pm."
```

---

## Contract Renewal with Rate Adjustment

The Grand Hotel's contract comes up for annual rate review (year 2 of 5). The contract includes a 3% annual escalation cap.

```
Current contract state (end of Year 1):
  Subscription "Grand Hotel Linen Program"
    ├── Total Year 1 revenue: $184,000
    ├── Average monthly volume: 15,200 pieces
    └── Current PriceList: "2025 Hospitality Contract Rates"

Annual review triggered:
  │
  ▼
  ┌──────────────────────────────────────────────────────┐
  │  Rate adjustment within contract bounds:              │
  │                                                       │
  │  Old PriceList "2025 Hospitality Contract Rates":     │
  │    ├── Bed Sheet: $0.45/piece                          │
  │    ├── Bath Towel: $0.35/piece                         │
  │    └── Tablecloth: $1.20/piece                         │
  │                                                       │
  │  New PriceList "2026 Hospitality Contract Rates":     │
  │    ├── date_start: Mar 1, 2026                         │
  │    ├── date_end: Feb 28, 2027                          │
  │    ├── Bed Sheet: $0.46/piece (+2.2%)                  │
  │    ├── Bath Towel: $0.36/piece (+2.9%)                 │
  │    └── Tablecloth: $1.23/piece (+2.5%)                 │
  │                                                       │
  │  All increases within 3% cap ✓                         │
  └──────────────────────────────────────────────────────┘

Subscription unchanged (same contract continues):
  ├── date_start: Mar 1, 2025 (unchanged)
  ├── date_end: Feb 28, 2030 (unchanged)
  └── Billing automatically picks up new PriceList based on
      date range match (2026 rates apply for Mar 2026+ processing)

Delegate notification:
  ├── Maria Santos receives rate adjustment letter
  └── 30-day notice period (as per contract terms)

Comparison with professional services:
  └── Same pattern as annual rate card renewal — old and new
      PriceLists coexist with non-overlapping date ranges.
      The system picks the applicable rate based on when
      the processing occurred.
```

**Key insight**: The subscription itself doesn't change at renewal — only the `PriceList` rotates. New date-bounded `PriceProducts` take effect automatically because the billing system resolves rates based on processing date vs. `PriceList.date_start/date_end`. This is identical to how professional services handle annual rate card renewals.
