# Professional Services Scenarios: Product (Resource Types & Service Lines)

Product scenarios cover how resource types (roles), specializations (variants), and service line hierarchies are managed in a professional services firm.

---

## Adding a New Resource Type with Specializations

```
Firm launches a new role level: "Managing Consultant"
  │
  ▼
Product "Managing Consultant"
  ├── name: "Managing Consultant"
  ├── description: "Mid-senior consultant leading workstreams,
  │                 5-8 years experience"
  ├── price: 325.00 (base hourly rate)
  ├── currency: "USD"
  │
  ├── product_collection:
  │    └── Collection "Technology" → "Cloud Migration"
  │         (this role is available for cloud engagements)
  │
  ├── ProductVariant "Managing Consultant - AWS"
  │    ├── sku: "MC-AWS"
  │    ├── variant_attributes: {
  │    │    "specialization": "AWS",
  │    │    "certifications": "AWS Solutions Architect Pro"
  │    │  }
  │    └── price_override: 350.00 (premium for AWS cert)
  │
  ├── ProductVariant "Managing Consultant - Azure"
  │    ├── sku: "MC-AZR"
  │    ├── variant_attributes: {
  │    │    "specialization": "Azure",
  │    │    "certifications": "Azure Solutions Architect"
  │    │  }
  │    └── price_override: 340.00
  │
  ├── ProductVariant "Managing Consultant - GCP"
  │    ├── sku: "MC-GCP"
  │    └── variant_attributes: {"specialization": "GCP"}
  │         (no price override — uses base $325)
  │
  └── Resource (templates attached to this role):
       ├── "Workstream Lead Checklist.pdf"
       └── "Technical Architecture Template.docx"

Then register people at this level:
  ├── InventoryItem: "Alex Kim"
  │    ├── product_id: FK to "Managing Consultant"
  │    ├── product_variant_id: FK to "MC-AWS"
  │    ├── location_id: FK to "NYC Office"
  │    ├── sku: "EMP-3102"
  │    ├── item_type: "serialized"
  │    └── unit_of_measure: "hours"
  │
  └── InventoryItem: "Priya Patel"
       ├── product_id: FK to "Managing Consultant"
       ├── product_variant_id: FK to "MC-AZR"
       └── location_id: FK to "London Office"
```

**Key insight**: `Product` = role level, `ProductVariant` = specialization within that role. `variant_attributes` holds certifications and skills as key-value pairs. This mirrors retail's color/size matrix — but instead of "Red / Large", it's "AWS / Solutions Architect Pro".

---

## Rate Card Renewal (Annual Rate Update)

```
Current rate card expiring:
  PriceList "2024 Rate Card - NYC Office"
    ├── date_start: Jan 1, 2024
    ├── date_end: Dec 31, 2024 ← expiring
    ├── PriceProduct: Executive Partner @ $500/hr
    ├── PriceProduct: Managing Consultant @ $300/hr
    ├── PriceProduct: Senior Consultant @ $250/hr
    ├── PriceProduct: Junior Analyst @ $140/hr
    └── PriceProduct: Blended Consulting @ $210/hr

New rate card creation:
  ┌──────────────────────────────────────────────────────┐
  │  PriceList "2025 Rate Card - NYC Office"              │
  │    ├── location_id: FK to NYC Office                   │
  │    ├── date_start: Jan 1, 2025                         │
  │    ├── date_end: Dec 31, 2025                          │
  │    │                                                  │
  │    ├── PriceProduct: Executive Partner @ $550/hr (+10%)│
  │    ├── PriceProduct: Managing Consultant @ $325/hr (+8%)│
  │    ├── PriceProduct: Senior Consultant @ $275/hr (+10%)│
  │    ├── PriceProduct: Junior Analyst @ $150/hr (+7%)    │
  │    └── PriceProduct: Blended Consulting @ $225/hr (+7%)│
  └──────────────────────────────────────────────────────┘

Impact on active engagements:
  ├── Engagements with date_start before Jan 1:
  │    └── May be rate-protected via subscription.metadata:
  │         {"rate_lock_until": "2025-06-30"}
  │
  ├── New engagements starting Jan 1+:
  │    └── Automatically use 2025 rate card (date range match)
  │
  └── Blended rate engagements:
       └── Single PriceProduct "Blended Consulting" updated
           (client sees one rate regardless of team mix)
```

**Key insight**: Rate cards are versioned by date — old and new `PriceLists` coexist with non-overlapping date ranges. The billing system picks the applicable rate card based on the `InventoryTransaction` date vs the `PriceList.date_start/date_end` range. Rate-locked engagements use `subscription.metadata` to override the standard lookup.

---

## Service Line Restructuring

```
Firm merges "Cloud Migration" and "DevOps" into unified "Cloud & Platform":
  │
  ▼
Before:
  Collection "Technology" (parent)
    ├── Collection "Cloud Migration"
    │    └── Products: Sr. Consultant - AWS, Sr. Consultant - Azure
    └── Collection "DevOps"
         └── Products: DevOps Engineer, Platform Engineer

After:
  Collection "Technology" (parent)
    └── Collection "Cloud & Platform" (merged)
         ├── Collection "Migration" (sub-practice)
         │    └── Products: Sr. Consultant - AWS, Sr. Consultant - Azure
         └── Collection "Platform Engineering" (sub-practice)
              └── Products: DevOps Engineer, Platform Engineer

Steps:
  1. Create new Collection "Cloud & Platform"
  2. Create sub-collections "Migration" and "Platform Engineering"
  3. Reassign product_collection links
  4. Update collection_plan links (engagement types reference new collections)
  5. Old collections "Cloud Migration" and "DevOps" → active: false

Impact:
  ├── Active engagements (Subscriptions) unaffected — they reference Plans, not Collections
  ├── New engagement proposals use updated service line hierarchy
  └── Reporting and utilization dashboards reflect new structure
```

---

## Discontinuing a Resource Type

```
Firm eliminates the "Associate Analyst" role (entry-level being cut):

Product "Associate Analyst" → active: false
  │
  ▼
Impact:
  ├── InventoryItems (people at this level) remain active
  │    └── Promoted to "Junior Analyst" → product_id updated
  │
  ├── Rate card updated:
  │    └── PriceList "2025 Rate Card": PriceProduct for Associate Analyst removed
  │         (no longer a billable role)
  │
  ├── Active engagements:
  │    └── InventoryTransactions submitted by former Associates
  │         now reference their new product_id ("Junior Analyst")
  │         and bill at the Junior Analyst rate
  │
  └── Historical data preserved:
       └── Past InventoryTransactions and RevenueLineItems
            still reference the old product_id for audit trail
```

**Key insight**: Discontinuing a resource type is like discontinuing a retail product — the `Product` becomes `active: false`, but existing inventory (people) gets reassigned to a new product (role). Historical transactions preserve the original reference for audit purposes.
