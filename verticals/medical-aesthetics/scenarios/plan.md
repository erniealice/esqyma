# Medical Aesthetics Scenarios: Plan (Memberships & Programs)

Plan scenarios cover the design of membership programs and treatment packages — the recurring revenue models that transform a transactional clinic into a predictable business.

---

## Beauty Bank Membership ("Glow Club")

The clinic launches a tiered beauty bank where patients pay monthly and accumulate credits toward any treatment.

```
Plan "Glow Club Beauty Bank"
  ├── name: "Glow Club Beauty Bank"
  ├── description: "Monthly credits toward any treatment.
  │                 Members get exclusive pricing and perks."
  ├── fulfillment_type: "license" (credit-based entitlements)
  ├── plan_location:
  │    ├── Beverly Hills Clinic
  │    └── Santa Monica Clinic
  ├── collection_plan → Collection "All Treatments"
  └── thumbnail_url: "/images/glow-club-badge.png"

PricePlan tiers:
  ┌─────────────────────────────────────────────────┐
  │ PricePlan "Glow Club Silver - $100/month"        │
  │   ├── amount: 100.00                              │
  │   ├── duration_unit: "month"                      │
  │   ├── duration_value: 1                           │
  │   └── Perks: 5% off all treatments, priority book │
  └─────────────────────────────────────────────────┘
  ┌─────────────────────────────────────────────────┐
  │ PricePlan "Glow Club Gold - $200/month"          │
  │   ├── amount: 200.00                              │
  │   ├── duration_unit: "month"                      │
  │   └── Perks: 10% off, free annual skin assessment │
  └─────────────────────────────────────────────────┘
  ┌─────────────────────────────────────────────────┐
  │ PricePlan "Glow Club Platinum - $350/month"      │
  │   ├── amount: 350.00                              │
  │   ├── duration_unit: "month"                      │
  │   └── Perks: 15% off, complimentary birthday      │
  │              treatment, same-day appointments       │
  └─────────────────────────────────────────────────┘
```

**Key insight**: The beauty bank uses `fulfillment_type: "license"` because each month grants a credit allotment (like a license to use services). The `subscription.metadata.balance` field accumulates credits that roll over month to month — patients bank up for bigger treatments.

---

## Multi-Session Laser Package

The clinic offers laser hair removal in 6-session packages — the clinical standard since hair grows in cycles and requires multiple treatments for permanent reduction.

```
Plan "Laser Hair Removal Course"
  ├── name: "Laser Hair Removal Course"
  ├── description: "6-session protocol for permanent hair reduction.
  │                 Sessions spaced 4-6 weeks apart."
  ├── fulfillment_type: "schedule" (time-based, multi-session)
  ├── plan_location → All clinics
  └── collection_plan → Collection "Laser & Energy"

PricePlan options (per body area):
  ┌─────────────────────────────────────────────────┐
  │ PricePlan "Full Legs 6-Session - $1,200"         │
  │   ├── amount: 1200.00 (vs $250/session × 6 = $1,500)│
  │   ├── duration_unit: "month"                      │
  │   ├── duration_value: 12 (use within 12 months)   │
  │   └── Savings: 20% vs. pay-per-session             │
  └─────────────────────────────────────────────────┘
  ┌─────────────────────────────────────────────────┐
  │ PricePlan "Underarms 6-Session - $600"           │
  │   ├── amount: 600.00 (vs $120/session × 6 = $720)│
  │   ├── duration_unit: "month"                      │
  │   └── duration_value: 12                          │
  └─────────────────────────────────────────────────┘

When a patient purchases "Full Legs 6-Session":
  Subscription created:
    ├── client_id: FK to patient
    ├── price_plan_id: FK to "Full Legs 6-Session"
    ├── date_start: today
    ├── date_end: today + 12 months
    ├── quantity: 6 (total sessions)
    ├── assigned_count: 0 (none used yet)
    └── available_count: 6

  License records (one per session entitlement):
    ├── License 1: "Laser Session 1" — available
    ├── License 2: "Laser Session 2" — available
    ├── ...
    └── License 6: "Laser Session 6" — available

After session 3:
  Subscription:
    ├── assigned_count: 3
    └── available_count: 3
  License 1-3: redeemed (with appointment date recorded)
  License 4-6: still available
```

**Key insight**: `fulfillment_type: "schedule"` fits because laser sessions are spaced over time (every 4-6 weeks). Each `License` represents one redeemable session. When a patient checks in, the front desk redeems a license instead of processing a payment — the `RevenueLineItem` shows `$0.00 due today (package session 3 of 6)`.

---

## Corporate Wellness Program

A tech company (Nexus Labs, 200 employees) partners with the clinic to offer discounted aesthetic treatments as an employee wellness perk.

```
Plan "Corporate Wellness Partner"
  ├── name: "Corporate Wellness Partner"
  ├── description: "Employer-sponsored aesthetic treatment
  │                 access at preferred rates"
  ├── fulfillment_type: "content" (benefit access, not credits)
  ├── plan_location → Beverly Hills (nearest to Nexus HQ)
  └── collection_plan → Collection "Wellness Treatments"
       (subset: Botox, facials, skin assessments — excludes
        surgical procedures)

PricePlan "Nexus Labs Wellness Agreement"
  ├── amount: 0.00 (no membership fee — employer absorbs nothing,
  │                   employees pay at discounted rate)
  ├── duration_unit: "year"
  └── duration_value: 1

Special PriceList for corporate clients:
  PriceList "2025 Corporate Wellness Rates"
    ├── PriceProduct: Botox @ $11/unit (vs $14 standard)
    ├── PriceProduct: Microneedling @ $225/session (vs $300)
    └── PriceProduct: Skin Assessment @ $0 (complimentary)

Subscription per employee who opts in:
  ├── client_id: FK to employee (individual client record)
  ├── price_plan_id: FK to "Nexus Labs Wellness"
  └── metadata: {"employer": "Nexus Labs", "employee_id": "NX-1234"}

Delegate setup (B2B contact):
  ├── Delegate: "HR Director at Nexus Labs"
  └── delegate_client → links to Nexus Labs client record
```

**Key insight**: Corporate wellness uses `fulfillment_type: "content"` because it provides *access* to discounted services, not credits or sessions. Each employee creates their own `Client` record and `Subscription`, but they're all linked to the corporate `PriceList` for discounted rates. The employer's HR director is a `Delegate` for B2B communication.
