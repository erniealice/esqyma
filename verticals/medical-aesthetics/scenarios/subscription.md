# Medical Aesthetics Scenarios: Subscription (Memberships & Packages)

Subscription scenarios cover active patient enrollments — how they join programs, track usage, and upgrade tiers.

---

## Patient Joins the Beauty Bank

Sarah Chen loved her first Botox experience and decides to join the Glow Club Gold tier. The front desk walks her through enrollment at checkout.

```
Step 1: Patient selects plan
  ├── Plan: "Glow Club Beauty Bank"
  └── PricePlan: "Glow Club Gold - $200/month"
       └── Perks: 10% off all treatments, free annual skin assessment

Step 2: Subscription created
  ┌──────────────────────────────────────────────────────┐
  │  Subscription                                         │
  │    ├── name: "Sarah Chen - Glow Club Gold"             │
  │    ├── client_id: FK to Sarah Chen                     │
  │    ├── price_plan_id: FK to "Glow Club Gold"           │
  │    ├── date_start: Jan 14, 2025                        │
  │    ├── date_end: null (ongoing, month-to-month)        │
  │    ├── quantity: 1 (one membership)                    │
  │    ├── auto_assign: true                               │
  │    └── metadata: {                                      │
  │         "balance": "200.00",                            │
  │         "tier": "gold",                                 │
  │         "auto_renew": "true",                           │
  │         "billing_day": "14",                            │
  │         "discount_pct": "10"                            │
  │       }                                                │
  └──────────────────────────────────────────────────────┘

Step 3: License records for perks
  ├── License 1: "10% Treatment Discount" (ongoing)
  └── License 2: "Annual Skin Assessment" (1× per year)

Step 4: First charge
  ├── Invoice: $200.00 (first month)
  ├── Payment: Card on file
  └── Balance after: $200.00 in beauty bank

Monthly cycle (Feb 14, Mar 14, ...):
  ├── Auto-charge: $200.00 to card on file
  └── Balance accumulates: $200 → $400 → $600 → ...
      (until she spends it on treatments)
```

---

## Package Purchase and Session Tracking

Amy Rivera purchases a 3-session microneedling package after her dermatologist recommended it for acne scarring. She wants to track her progress.

```
Step 1: Package purchased
  ┌──────────────────────────────────────────────────────┐
  │  Subscription                                         │
  │    ├── name: "Amy Rivera - Microneedling 3-Pack"       │
  │    ├── client_id: FK to Amy Rivera                     │
  │    ├── price_plan_id: FK to "Microneedling 3-Session"  │
  │    ├── date_start: Feb 1, 2025                         │
  │    ├── date_end: Feb 1, 2026 (12-month validity)       │
  │    ├── quantity: 3 (sessions)                          │
  │    ├── assigned_count: 0                               │
  │    ├── available_count: 3                              │
  │    └── metadata: {"package_price": "840.00"}           │
  └──────────────────────────────────────────────────────┘

  License records:
    ├── License 1: "Microneedling Session 1" — available
    ├── License 2: "Microneedling Session 2" — available
    └── License 3: "Microneedling Session 3" — available

  Payment: $840.00 upfront (vs $320/session × 3 = $960 à la carte)

Step 2: Session 1 — Feb 15
  ├── Event: "Amy Rivera - Microneedling" (45 min, Room 2)
  ├── InventoryTransaction:
  │    ├── "1 microneedling cartridge consumed"
  │    ├── "1 hyaluronic acid serum consumed"
  │    └── status: "consumed" → "completed"
  ├── License 1: redeemed
  │    └── metadata: {"session_date": "2025-02-15",
  │                   "practitioner": "ESTH-MARIA-002",
  │                   "notes": "Good tolerance, mild redness"}
  ├── RevenueLineItem: $0.00 due today (package session)
  ├── Subscription updated:
  │    ├── assigned_count: 0 → 1
  │    └── available_count: 3 → 2
  └── Before/after photos taken and stored

Step 3: Session 2 — Mar 22
  ├── License 2: redeemed
  ├── Subscription: assigned_count: 2, available_count: 1
  └── Notes: "Significant improvement in texture"

Step 4: Session 3 — May 3
  ├── License 3: redeemed
  ├── Subscription: assigned_count: 3, available_count: 0
  ├── Package complete — subscription.active → false
  └── Practitioner recommends maintenance: single sessions
      every 3-4 months going forward
```

**Key insight**: Each `License` within the subscription represents one redeemable session. The `assigned_count` / `available_count` pattern tracks consumption, and each license stores session metadata (date, practitioner, clinical notes) for the patient's treatment history.

---

## Membership Tier Upgrade

Sarah has been a Gold member for 6 months and her spending pattern shows she'd save more on Platinum. The clinic proactively recommends an upgrade.

```
Current Subscription:
  ├── plan: "Glow Club Beauty Bank"
  ├── price_plan: "Gold - $200/month"
  ├── metadata: {"balance": "150.00", "tier": "gold"}
  ├── Total spent on treatments in 6 months: $3,200
  └── If she'd been Platinum (15% off vs 10% off):
      savings delta = $160 more saved → upgrade pays for itself

Upgrade flow:
  ┌──────────────────────────────────────────────────────┐
  │  Step 1: Close Gold subscription                      │
  │    ├── Subscription.active → false                     │
  │    ├── date_end → today                                │
  │    └── Remaining balance: $150 carries forward         │
  │                                                       │
  │  Step 2: New Platinum subscription created             │
  │    ├── price_plan: "Platinum - $350/month"             │
  │    ├── date_start: today                               │
  │    ├── metadata: {                                      │
  │    │    "balance": "150.00",  ← carried from Gold      │
  │    │    "tier": "platinum",                             │
  │    │    "upgraded_from": "gold",                        │
  │    │    "discount_pct": "15"                            │
  │    │  }                                                │
  │    │                                                  │
  │    └── New License records:                            │
  │         ├── "15% Treatment Discount" (replaces 10%)    │
  │         ├── "Annual Skin Assessment"                    │
  │         ├── "Complimentary Birthday Treatment"          │
  │         └── "Same-Day Appointment Access"               │
  │                                                       │
  │  Step 3: First Platinum charge                         │
  │    ├── Prorated for remaining days in billing cycle     │
  │    └── Next full charge: $350 on next billing date     │
  └──────────────────────────────────────────────────────┘

Sarah's experience:
  ├── Balance carried over seamlessly ($150)
  ├── Discount on next Botox: 15% off instead of 10%
  ├── Birthday treatment (March): complimentary 20 units Botox
  └── Can now book same-day appointments (Platinum perk)
```

**Key insight**: The upgrade closes the old subscription and creates a new one, carrying the beauty bank balance forward via `metadata`. This preserves the audit trail (Gold subscription has its own history) while giving the patient a clean start on Platinum perks.
