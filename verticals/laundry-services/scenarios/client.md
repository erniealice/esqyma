# Laundry Services Scenarios: Client (Customers & Accounts)

Client scenarios cover customer registration across walk-in, residential subscription, and B2B account models.

---

## Walk-in Customer Registration

Marcus walks into the downtown drop-off for the first time. He's in a rush — just wants to drop off laundry and get back to work. The counter staff creates his record in 2 minutes.

```
Client
  ├── user → User:
  │    ├── first_name: "Marcus"
  │    ├── last_name: "Johnson"
  │    ├── email: "marcus.j@email.com"
  │    └── mobile: "+1-212-555-0177"
  ├── customer_type: "retail" (walk-in, non-subscriber)
  ├── category → ClientCategory: "Walk-in"
  └── client_attribute:
       ├── key: "preferred_location", value: "Downtown Drop-Off"
       └── key: "detergent_pref", value: "standard"

First order created immediately:
  ├── Order #ORD-2025-3847
  ├── 18 lbs wash-and-fold + 2 suits dry clean
  └── Pickup: Wednesday (standard 48-hour turnaround)

After 3rd visit, system flags for subscription offer:
  └── "Marcus has visited 3 times in 6 weeks, spending $185.
       A Standard 4-bag plan ($99/month) would save him ~20%.
       Trigger conversion offer?"
```

---

## Hotel Account Onboarding

The Boutique Marina Hotel (45 rooms) just opened and needs a linen service provider. The general manager reaches out after a referral.

```
Step 1: Create the hotel client
  ┌──────────────────────────────────────────────────────┐
  │  Client                                               │
  │    ├── company_name: "Boutique Marina Hotel"           │
  │    ├── customer_type: "wholesale" (B2B account)        │
  │    ├── street_address: "88 Harbor View Drive"          │
  │    ├── city: "Marina del Rey"                          │
  │    ├── category → ClientCategory:                      │
  │    │    ├── "Hospitality"                               │
  │    │    └── "Boutique Hotel"                            │
  │    └── client_attribute:                               │
  │         ├── key: "rooms", value: "45"                  │
  │         ├── key: "star_rating", value: "4"             │
  │         ├── key: "opening_date", value: "2025-04-01"   │
  │         └── key: "linen_preference", value: "400tc_egyptian"│
  └──────────────────────────────────────────────────────┘

Step 2: Create delegates
  ┌──────────────────────────────────────────────────────┐
  │  Delegate 1 (General Manager — decision maker)        │
  │    ├── user → User:                                    │
  │    │    ├── first_name: "Rachel"                       │
  │    │    ├── last_name: "Kim"                            │
  │    │    └── email: "rachel@boutiquemarina.com"          │
  │    └── delegate_client → links to Boutique Marina       │
  │                                                       │
  │  Delegate 2 (Head of Housekeeping — day-to-day)       │
  │    ├── user → User:                                    │
  │    │    ├── first_name: "Carlos"                       │
  │    │    └── email: "housekeeping@boutiquemarina.com"    │
  │    └── delegate_client → links to Boutique Marina       │
  └──────────────────────────────────────────────────────┘

Step 3: Workspace access
  └── WorkspaceUser for both delegates:
       ├── Rachel Kim → role: "account_admin" (view invoices,
       │   approve orders, see inventory reports)
       └── Carlos → role: "operations" (report linen issues,
           request express pickups, view delivery schedule)

Step 4: Contract setup
  ├── Plan: "Full-Service Hotel Linen Rental"
  ├── PricePlan negotiated: $4,200/month (45 rooms, 3-par)
  └── Subscription created (see subscription scenarios for details)

Step 5: Initial linen delivery (before hotel opening)
  ├── 135 sheet sets (45 rooms × 3-par) delivered and RFID-tagged
  ├── 270 bath towel sets delivered and RFID-tagged
  ├── 45 bathrobe sets delivered
  └── All InventoryItems registered with location: Boutique Marina
```

---

## Multi-Property Hospitality Chain

Pacific Coast Hotels operates 5 properties across California. They want a single master contract with property-level billing and reporting.

```
Step 1: Create parent client
  ┌──────────────────────────────────────────────────────┐
  │  Client "Pacific Coast Hotels" (parent company)       │
  │    ├── company_name: "Pacific Coast Hotels Inc."       │
  │    ├── customer_type: "wholesale"                      │
  │    ├── category → ClientCategory:                      │
  │    │    ├── "Hospitality"                               │
  │    │    └── "Hotel Chain"                               │
  │    └── client_attribute:                               │
  │         ├── key: "structure", value: "parent"          │
  │         └── key: "properties", value: "5"              │
  └──────────────────────────────────────────────────────┘

Step 2: Create property-level clients
  ├── Client "PCH - Santa Monica" (150 rooms)
  │    ├── client_attribute: key "parent_client_id",
  │    │                     value: FK to Pacific Coast Hotels
  │    └── Subscription: "PCH Santa Monica Linen Program"
  │
  ├── Client "PCH - San Diego" (200 rooms)
  │    ├── client_attribute: key "parent_client_id", ...
  │    └── Subscription: "PCH San Diego Linen Program"
  │
  ├── Client "PCH - San Francisco" (120 rooms)
  ├── Client "PCH - Napa Valley" (80 rooms)
  └── Client "PCH - Palm Springs" (100 rooms)

Step 3: Delegates span the organization
  ├── Delegate "CFO at Pacific Coast Hotels"
  │    └── delegate_client → linked to ALL 6 client records
  │         (parent + 5 properties) for consolidated view
  │
  ├── Delegate "Regional Ops Director (SoCal)"
  │    └── delegate_client → linked to Santa Monica,
  │         San Diego, Palm Springs
  │
  └── Delegate "Property GM - Santa Monica"
       └── delegate_client → linked to Santa Monica only

Billing structure:
  ├── Each property has its own Subscription & monthly Invoice
  ├── Parent company receives consolidated monthly statement
  └── Volume discount applied across all properties:
       PriceList "2025 PCH Master Contract Rates"
         ├── PriceProduct: Bed Sheet @ $0.40/piece
         │    (vs $0.45 standard — 11% volume discount)
         └── Applied to all 5 property Subscriptions
```

**Key insight**: The multi-property chain uses the same parent-child `client_attribute` pattern as professional services multi-entity clients. The `delegate_client` junction allows the CFO to see all properties while property GMs only see their own. Volume discounts are applied via a single `PriceList` shared across all property `Subscriptions` — the chain's total volume (650 rooms) earns better rates than any single property could negotiate alone.
