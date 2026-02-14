# Professional Services Scenarios: Subscription (Engagements & Retainers)

Subscription scenarios cover active client engagements — how they're set up, managed, renewed, and how retainer models work.

---

## New T&M Engagement Setup

```
Acme Corp wants cloud migration consulting (T&M model)
  │
  ▼
Step 1: Client & Delegate setup
  ├── Client: "Acme Corp" (customer_type: "retail" → project-based)
  ├── Delegate: "Sarah Park" (VP Engineering at Acme)
  └── delegate_client → links Sarah to Acme Corp

Step 2: Select engagement type and pricing
  ├── Plan: "Cloud Migration Consulting"
  │    └── fulfillment_type: "schedule" (T&M)
  └── PricePlan: "Cloud Migration - T&M Monthly"
       ├── amount: $25,000/month (retainer minimum)
       └── duration: 1 month (rolling)

Step 3: Select rate card
  └── PriceList: "2025 Rate Card - NYC Office"
       ├── PriceProduct: Sr. Consultant @ $275/hr
       ├── PriceProduct: Jr. Analyst @ $150/hr
       └── PriceProduct: Executive Partner @ $550/hr

Step 4: Create the engagement
  ┌──────────────────────────────────────────────────────┐
  │  Subscription                                         │
  │    ├── name: "Acme Corp - Cloud Migration"             │
  │    ├── client_id: FK to Acme Corp                      │
  │    ├── price_plan_id: FK to "T&M Monthly"              │
  │    ├── date_start: Jan 6, 2025                         │
  │    ├── date_end: Jun 30, 2025                          │
  │    ├── quantity: 4 (resource slots budgeted)            │
  │    ├── assigned_count: 2 (Jane Smith, Tom Lee)          │
  │    ├── available_count: 2 (room for 2 more)             │
  │    ├── auto_assign: false (manual resource assignment)  │
  │    └── metadata: {                                      │
  │         "sow_ref": "SOW-2025-042",                      │
  │         "cost_center": "ACME-CC-001",                   │
  │         "billing_contact": "accounts@acme.com",         │
  │         "engagement_lead": "EMP-1234"                   │
  │       }                                                │
  └──────────────────────────────────────────────────────┘

Step 5: Assign resources
  ├── Jane Smith → InventoryTransaction (assignment)
  │    ├── reference_type: "subscription"
  │    ├── reference_id: "SUB-ACME-001"
  │    └── status: "completed"
  └── Tom Lee → InventoryTransaction (assignment)
       └── (same pattern)

Step 6: Kick off workflow
  └── Workflow "Standard Consulting Engagement" created
       └── Stage 1 (Discovery) → activities begin
```

**Entities involved**: `Client`, `Delegate`, `DelegateClient`, `Plan`, `PricePlan`, `PriceList`, `PriceProduct`, `Subscription`, `InventoryItem`, `InventoryTransaction`, `Workflow`

---

## Retainer Contract with Hour Credits

```
MegaCo wants an ongoing advisory retainer:

Plan "Strategic Advisory"
  └── fulfillment_type: "license" ← credit-based (use-it-or-lose-it hours)

PricePlan "Advisory Retainer - Quarterly"
  ├── amount: $50,000 (per quarter)
  ├── duration_unit: "month"
  └── duration_value: 3

Subscription created:
  ┌──────────────────────────────────────────────────────┐
  │  Subscription                                         │
  │    ├── name: "MegaCo Advisory Retainer"                │
  │    ├── client_id: FK to MegaCo                         │
  │    ├── price_plan_id: FK to "Quarterly Retainer"       │
  │    ├── date_start: Jan 1, 2025                         │
  │    ├── date_end: Dec 31, 2025 (annual contract)        │
  │    ├── quantity: 200 (hours per quarter)                │
  │    ├── assigned_count: 45 (hours used so far in Q1)    │
  │    ├── available_count: 155 (hours remaining in Q1)    │
  │    └── metadata: {                                      │
  │         "retainer_type": "quarterly",                   │
  │         "rollover": "false",                            │
  │         "overage_rate": "$300/hr"                       │
  │       }                                                │
  └──────────────────────────────────────────────────────┘

License records (entitlements per quarter):
  ├── License "Q1 Advisory Hours" → 200 hrs
  ├── License "Q2 Advisory Hours" → 200 hrs
  ├── License "Q3 Advisory Hours" → 200 hrs
  └── License "Q4 Advisory Hours" → 200 hrs

Monthly check:
  ├── Hours used in Q1: 45 of 200
  ├── Billing: flat $50,000/quarter regardless of hours used
  └── If hours exceed 200: overage billed at $300/hr via RevenueLineItem

Overage example (Q1 ends at 220 hours):
  ├── RevenueLineItem: "Q1 Retainer" → $50,000 (flat fee)
  └── RevenueLineItem: "Q1 Overage - 20 hrs × $300" → $6,000
```

**Key insight**: Retainer engagements use `fulfillment_type: "license"` because the client is purchasing hour credits, not open-ended time. The `subscription.quantity` field tracks the hour block size, and `assigned_count` / `available_count` track consumption. This is the one case in professional services where hours *are* a constraint (unlike the standard record-then-bill model).

---

## Engagement Renewal and Extension

```
Existing engagement nearing completion:
  Subscription "Acme Corp - Cloud Migration"
    ├── date_start: Jan 6, 2025
    ├── date_end: Jun 30, 2025 ← approaching
    └── status: active

Option A: Extension (same terms)
  ┌──────────────────────────────────────────────────────┐
  │  Subscription updated:                                │
  │    ├── date_end: Jun 30 → Sep 30, 2025 (3-month ext) │
  │    └── metadata: {"extension_ref": "SOW-2025-042-A1"} │
  └──────────────────────────────────────────────────────┘

Option B: Renewal (new terms, potentially new rate card)
  ┌──────────────────────────────────────────────────────┐
  │  Step 1: Close current subscription                   │
  │    ├── Subscription.active → false                     │
  │    └── date_end → today (Jun 30)                       │
  │                                                       │
  │  Step 2: New subscription with updated terms           │
  │    ├── name: "Acme Corp - Cloud Optimization Phase 2"  │
  │    ├── price_plan_id: FK to new PricePlan              │
  │    │    └── "Cloud Optimization - T&M" @ $30,000/month │
  │    ├── date_start: Jul 1, 2025                         │
  │    ├── date_end: Dec 31, 2025                          │
  │    └── metadata: {"sow_ref": "SOW-2025-067",           │
  │                   "predecessor": "SUB-ACME-001"}       │
  │                                                       │
  │  Step 3: New PriceList may apply                       │
  │    └── "H2 2025 Rate Card - NYC" (if rates increased)  │
  └──────────────────────────────────────────────────────┘

Impact on resources:
  ├── Jane Smith: stays assigned (new InventoryTransaction referencing SUB-ACME-002)
  ├── Tom Lee: rolls off (no new assignment transaction)
  └── New resource: "Pat Chen" assigned to Phase 2
```

**Key insight**: Extensions update the existing subscription. Renewals create a new subscription with a `metadata.predecessor` link to the previous one, allowing the firm to track the full engagement lineage. Rate cards may also change at renewal boundaries, since `PriceList.date_end` may have expired.
