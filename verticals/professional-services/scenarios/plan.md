# Professional Services Scenarios: Plan (Engagement Types)

Plan scenarios cover the configuration of engagement types — the service offerings a firm provides, including T&M consulting, advisory, and staff augmentation models.

---

## Creating a New Engagement Type (T&M Consulting)

```
Plan "Cloud Migration Consulting"
  ├── name: "Cloud Migration Consulting"
  ├── description: "End-to-end cloud migration services including
  │                 assessment, planning, migration, and optimization"
  ├── fulfillment_type: "schedule" ← time-based (T&M)
  │
  ├── plan_location:
  │    ├── NYC Office ← can deliver from here
  │    ├── London Office ← can deliver from here
  │    └── (Remote not listed — in-person engagement only)
  │
  ├── collection_plan → Collection "Technology" → "Cloud Migration"
  │    (links engagement type to the service line hierarchy)
  │
  └── thumbnail_url: "/images/cloud-migration-badge.png"

PricePlan options for this engagement type:
  ┌─────────────────────────────────────────────────┐
  │ PricePlan "Cloud Migration - T&M Monthly"        │
  │   ├── amount: 25,000 (monthly retainer minimum)  │
  │   ├── duration_unit: "month"                      │
  │   └── duration_value: 1                           │
  └─────────────────────────────────────────────────┘
  ┌─────────────────────────────────────────────────┐
  │ PricePlan "Cloud Migration - Fixed 6-Month"      │
  │   ├── amount: 150,000 (project total)             │
  │   ├── duration_unit: "month"                      │
  │   └── duration_value: 6                           │
  └─────────────────────────────────────────────────┘
```

**Key insight**: The `Plan` defines *what* the firm offers (service type, scope, availability), while `PricePlan` defines *how* it's priced (T&M vs fixed fee, duration). Multiple `PricePlans` can exist for the same `Plan`, giving sales flexibility to propose different commercial models.

---

## Advisory Engagement Type (Deliverable-Based)

```
Plan "Tax Advisory"
  ├── name: "Tax Advisory"
  ├── description: "Tax planning, compliance review, and advisory services"
  ├── fulfillment_type: "content" ← deliverable-based (reports, assessments)
  │
  ├── plan_location:
  │    ├── NYC Office
  │    ├── London Office
  │    └── Remote ← can be delivered remotely
  │
  ├── collection_plan → Collection "Professional Services" → "Tax Advisory"
  │
  └── Resources attached via product:
       ├── Product "Tax Partner" → resource: "Tax Opinion Template"
       ├── Product "Tax Manager" → resource: "Compliance Checklist"
       └── Product "Tax Analyst" → resource: "Data Collection Form"

PricePlan "Tax Advisory - Per Deliverable"
  ├── amount: 0 (priced per deliverable, not per period)
  ├── duration_unit: "month"
  └── duration_value: 12 (annual engagement window)

Actual pricing per deliverable:
  ├── PriceList "2025 Advisory Rate Card"
  │    ├── PriceProduct: "Tax Opinion" → $15,000 (flat fee per deliverable)
  │    ├── PriceProduct: "Compliance Review" → $8,000
  │    └── PriceProduct: "Quarterly Tax Planning" → $5,000
```

**Key insight**: For `fulfillment_type: "content"`, the "products" are deliverables rather than hourly roles. The `PriceList` carries per-deliverable pricing instead of hourly rates. Time entries are still tracked (for cost/utilization) but billing is per-deliverable.

---

## Staff Augmentation Engagement

```
Plan "IT Staff Augmentation"
  ├── name: "IT Staff Augmentation"
  ├── description: "Dedicated resources embedded in client teams"
  ├── fulfillment_type: "physical" ← on-site body-shop model
  │
  ├── plan_location → All offices
  └── collection_plan → Collection "Technology"

PricePlan "Staff Aug - Monthly Per Resource"
  ├── amount: 18,000 (per resource per month)
  ├── duration_unit: "month"
  └── duration_value: 1

Subscription "BetaCo Staff Augmentation"
  ├── client_id: FK to BetaCo
  ├── price_plan_id: FK to "Monthly Per Resource"
  ├── quantity: 3 (three dedicated resources)
  ├── assigned_count: 3
  ├── available_count: 0
  ├── date_start: Feb 1, 2025
  ├── date_end: Jul 31, 2025
  └── metadata: {"site": "BetaCo HQ, SF", "manager": "BetaCo CTO"}

Assigned InventoryItems (resources):
  ├── InventoryItem 1: "Alex Kim" (Sr. Developer)
  ├── InventoryItem 2: "Maria Santos" (DevOps Engineer)
  └── InventoryItem 3: "David Park" (QA Lead)

Monthly billing (simplified):
  Revenue:
    ├── RevenueLineItem: 3 resources × $18,000 = $54,000
    └── line_item_type: "item"
```

**Key insight**: Staff augmentation uses `fulfillment_type: "physical"` — the firm is providing physical presence, not just hours or deliverables. The `subscription.quantity` tracks the number of dedicated resources, and `assigned_count` / `available_count` track allocation. Billing is per-resource-per-month, not per-hour.
