# Professional Services Vertical - Proto Domain Mapping

This document maps the Esqyma proto domain model to **professional services** terminology — firms that sell expertise by the hour (consulting, legal, accounting, IT services, marketing agencies, etc.).

The core insight: **people are the product, hours are the inventory, and rate cards are the price lists.**

---

## Quick Reference

| Schema Term | Professional Services Term | Notes |
|---|---|---|
| `client` | **Client / Client Company** | The organization or contact being served |
| `staff` | **Internal Team / Project Manager** | Firm employees managing engagements |
| `delegate` | **Client Sponsor / Client POC** | Client-side stakeholder or decision-maker |
| `admin` | **Practice Director / Firm Admin** | Back-office and firm management |
| `location` | **Office / Practice Location** | Physical office where resources are based |
| `group` | **Team / Resource Pool** | Grouping of resources by skill or department |
| `product` | **Resource Type / Role** | E.g., Senior Consultant, Junior Analyst, Executive Partner |
| `product_variant` | **Resource Specialization** | E.g., Senior Consultant - Cloud, Senior Consultant - Data |
| `collection` | **Practice Area / Service Line** | E.g., "Tax Advisory", "Cloud Migration", "Litigation" |
| `resource` | **Deliverable Template / Work Product** | SOW templates, report templates attached to a role |
| `inventory_item` | **Resource (Person)** | A specific consultant/professional at a specific office |
| `inventory_serial` | **Named Resource** | Individual person tracked by employee ID |
| `inventory_transaction` | **Time Allocation / Booking** | Hours booked, transferred, or adjusted |
| `inventory_depreciation` | **Utilization Write-Down** | Unbillable time, bench time |
| `plan` | **Engagement Type** | Type of service offering (e.g., "IT Consulting", "Tax Advisory", "Audit") |
| `plan_location` | **Engagement Availability** | Which offices can deliver this engagement type |
| `price_plan` | **Engagement Pricing / Fee Structure** | Fixed fee, T&M, or retainer pricing for an engagement type |
| `subscription` | **Active Engagement / Retainer** | A client's ongoing engagement or retainer contract |
| `license` | **Hour Block / Credit** | Individual hour allocations within a retainer |
| `price_list` | **Rate Card** | Billing rates per office/region, effective for a date range |
| `price_product` | **Rate** | Specific hourly/daily rate for a resource type on a rate card |
| `invoice` | **Client Invoice / Fee Note** | Billing document sent to the client |
| `balance` | **Client Account / Outstanding Balance** | What the client owes or has as credit |
| `payment` | **Client Payment** | Payment received against invoices |
| `event` | **Client Meeting / Workshop / Session** | Scheduled billable or non-billable time |
| `event_client` | **Meeting Attendee** | Client contacts attending a session |
| `event_product` | **Resources Booked for Session** | Which resource types are needed for a meeting |
| `revenue` | **Billed Revenue** | Revenue recognized for a client engagement |
| `revenue_line_item` | **Billable Line Item** | Hours × rate for a specific resource type |
| `revenue_category` | **Revenue Stream** | Consulting, advisory, managed services, training |
| `workflow` | **Engagement Lifecycle** | Proposal → onboarding → delivery → closure |
| `stage` | **Engagement Phase** | Discovery, planning, execution, review, closeout |
| `activity` | **Task / Deliverable** | Individual work item within a phase |

---

## Domain Deep Dive

### Entity Domain → People & Offices

```
┌──────────────────────────────────────────────────────────┐
│  THE FIRM                                                 │
│                                                           │
│  staff           → Project Manager, Engagement Lead       │
│  admin           → Practice Director, COO                 │
│  workspace       → The Firm / Practice Entity             │
│                                                           │
│  THE CLIENT                                               │
│                                                           │
│  client          → Acme Corp (the client company)         │
│  delegate        → VP of Engineering at Acme (sponsor)    │
│                                                           │
│  OFFICES                                                  │
│                                                           │
│  location        → NYC Office, London Office, Remote      │
│  group           → "Cloud Practice Team", "Tax Team"      │
│                                                           │
│  ACCESS                                                   │
│                                                           │
│  role            → Partner, Manager, Consultant, Analyst  │
│  permission      → can_approve_SOW, can_view_rates        │
└──────────────────────────────────────────────────────────┘
```

The `client.customer_type` field maps to engagement tiers: `"retail"` → ad-hoc/project-based, `"wholesale"` → managed services/volume, `"vip"` → strategic accounts.

### Product Domain → Resource Types & Service Lines

This is the key conceptual shift: **the "product" being sold is a person's expertise by the hour.**

```
┌──────────────────────────────────────────────────────────┐
│  SERVICE LINE HIERARCHY                                   │
│                                                           │
│  collection (parent)  → Service Line: "Technology"        │
│    └── collection     → Practice: "Cloud Migration"       │
│         └── collection → Specialty: "AWS Migration"       │
│                                                           │
│  RESOURCE TYPES (what you're selling)                     │
│                                                           │
│  product              → "Senior Consultant"               │
│    ├── product.price  → Base rate: $250/hr                │
│    ├── product.currency → USD                             │
│    ├── product_variant → "Sr. Consultant - AWS"           │
│    │    ├── sku       → "SC-AWS-001"                      │
│    │    └── price_override → $275/hr (specialist premium) │
│    ├── product_variant → "Sr. Consultant - Azure"         │
│    └── resource       → SOW template, deliverable template│
│                                                           │
│  product              → "Junior Analyst"                  │
│    ├── product.price  → Base rate: $125/hr                │
│    └── product_variant → "Jr. Analyst - Data"             │
│                                                           │
│  product              → "Executive Partner"               │
│    └── product.price  → Base rate: $500/hr                │
│                                                           │
│  PRICING                                                  │
│                                                           │
│  price_list           → "2025 Rate Card - NYC Office"     │
│    ├── price_product  → Sr. Consultant @ $275/hr          │
│    ├── price_product  → Jr. Analyst @ $150/hr             │
│    └── price_product  → Executive Partner @ $550/hr       │
│                                                           │
│  price_list           → "2025 Rate Card - Remote"         │
│    ├── price_product  → Sr. Consultant @ $225/hr          │
│    └── price_product  → Jr. Analyst @ $110/hr             │
└──────────────────────────────────────────────────────────┘
```

The `price_list.location_id` field is critical here — it ties a rate card to a specific office, enabling location-based pricing. The `date_start` / `date_end` fields on both `PriceList` and `PriceProduct` support annual rate card renewals.

### Inventory Domain → Resource (People) Management

This is where "inventory" gets reinterpreted: **the inventory is your bench of consultants.**

```
┌──────────────────────────────────────────────────────────┐
│  RESOURCE TRACKING                                        │
│                                                           │
│  inventory_item                                           │
│    ├── name              → "Jane Smith"                   │
│    ├── product_id        → FK to "Senior Consultant"      │
│    ├── product_variant_id→ FK to "Sr. Consultant - AWS"   │
│    ├── location_id       → FK to "NYC Office"             │
│    ├── sku               → "EMP-2847" (employee ID)       │
│    ├── quantity_on_hand  → 160 (total hrs/month)          │
│    ├── quantity_reserved → 120 (booked on engagements)    │
│    ├── quantity_available→ 40  (available for new work)   │
│    ├── reorder_level     → 20  (flag if under-utilized)   │
│    ├── unit_of_measure   → "hours"                        │
│    └── item_type         → "serialized" (named person)    │
│                                                           │
│  inventory_serial   → Individual person identity          │
│    └── serial_number → "EMP-2847-NYC"                     │
│                                                           │
│  inventory_transaction                                    │
│    ├── Booking     → 40 hrs allocated to Acme engagement  │
│    ├── Transfer    → Resource moved from NYC to London    │
│    ├── Adjustment  → PTO, training, bench time            │
│    └── Release     → Engagement ended, hours freed        │
│                                                           │
│  inventory_depreciation                                   │
│    └── Bench time / unbillable hours write-down           │
└──────────────────────────────────────────────────────────┘
```

**Key reinterpretation of `item_type`:**

| Value | Professional Services Use Case |
|---|---|
| `"serialized"` | Named resource — a specific person tracked individually (Jane Smith, EMP-2847) |
| `"non_serialized"` | Pooled capacity — generic headcount (e.g., "3 junior analysts needed", don't care which ones) |
| `"consumable"` | One-time resources — contractor hours, third-party specialist time (used and gone) |

### Subscription Domain → Engagements & Retainers

```
┌──────────────────────────────────────────────────────────┐
│  ENGAGEMENT STRUCTURE                                     │
│                                                           │
│  plan                → "IT Consulting Engagement"         │
│    ├── description   → Scope and deliverables overview    │
│    ├── plan_location → Deliverable from NYC, London       │
│    ├── fulfillment_type → "schedule" (time-based)         │
│    └── collection_plan → Links to "Cloud Migration" line  │
│                                                           │
│  price_plan          → "IT Consulting - T&M Monthly"      │
│    ├── plan_id       → FK to engagement type              │
│    ├── amount        → 25000.00 (monthly retainer)        │
│    ├── duration_unit → "month"                            │
│    ├── duration_value→ 1                                  │
│    └── templates     → SOW confirmation, monthly receipt  │
│                                                           │
│  price_plan          → "IT Consulting - Fixed Fee"        │
│    ├── amount        → 150000.00 (project total)          │
│    ├── duration_unit → "month"                            │
│    └── duration_value→ 6                                  │
│                                                           │
│  subscription        → Acme Corp's active engagement      │
│    ├── client_id     → FK to Acme Corp                    │
│    ├── price_plan_id → FK to chosen fee structure         │
│    ├── date_start    → Engagement start date              │
│    ├── date_end      → Engagement end date                │
│    ├── quantity      → 500 (contracted hours)             │
│    ├── assigned_count→ 320 (hours allocated)              │
│    ├── available_count→ 180 (hours remaining)             │
│    └── metadata      → {"sow_ref": "SOW-2025-042"}       │
│                                                           │
│  license             → Individual hour block              │
│    └── 40 hrs of Sr. Consultant time, week of Jan 6      │
└──────────────────────────────────────────────────────────┘
```

**Key reinterpretation of `plan.fulfillment_type`:**

| Value | Professional Services Use Case |
|---|---|
| `"schedule"` | Time & materials engagement (billed by hours worked) |
| `"license"` | Retainer with hour credits (use-it-or-lose-it blocks) |
| `"content"` | Advisory/deliverable-based (reports, assessments, audits) |
| `"physical"` | On-site staffing / staff augmentation (body-shop model) |

### Payment & Revenue → Billing

```
┌──────────────────────────────────────────────────────────┐
│  BILLING FLOW                                             │
│                                                           │
│  invoice             → Monthly fee note to Acme Corp      │
│  revenue_line_item   → 40 hrs × Sr. Consultant @ $275/hr │
│                        20 hrs × Jr. Analyst @ $150/hr     │
│  revenue_category    → Consulting / Advisory / Training   │
│  balance             → Acme Corp owes $14,000             │
│  payment             → Wire transfer received $14,000     │
└──────────────────────────────────────────────────────────┘
```

### Event Domain → Client Sessions & Meetings

| Schema | Professional Services Example |
|---|---|
| `event` | "Acme Corp - Cloud Architecture Workshop" (Jan 15, 9am-5pm) |
| `event_client` | Acme's CTO, VP Engineering (attendees) |
| `event_product` | "Executive Partner" + "2× Senior Consultants" (resources needed) |
| `event_settings` | Billable: yes, Location: Acme HQ |
| `event_recurrence` | Weekly status meeting, every Monday 10am |

### Workflow Domain → Engagement Lifecycle

```
┌──────────────────────────────────────────────────────────┐
│  ENGAGEMENT LIFECYCLE                                     │
│                                                           │
│  workflow_template   → "Standard Consulting Engagement"   │
│  workflow            → "Acme Corp Cloud Migration" (live) │
│                                                           │
│  stage 1: Discovery                                       │
│    ├── activity: "Stakeholder interviews"                 │
│    ├── activity: "Current state assessment"               │
│    └── activity: "Requirements gathering"                 │
│                                                           │
│  stage 2: Proposal & SOW                                  │
│    ├── activity: "Draft SOW"                              │
│    ├── activity: "Internal review" (approval workflow)    │
│    └── activity: "Client sign-off"                        │
│                                                           │
│  stage 3: Delivery                                        │
│    ├── activity: "Sprint 1 - Assessment"                  │
│    ├── activity: "Sprint 2 - Migration"                   │
│    └── activity: "Sprint 3 - Testing"                     │
│                                                           │
│  stage 4: Closeout                                        │
│    ├── activity: "Final deliverable handoff"              │
│    ├── activity: "Knowledge transfer sessions"            │
│    └── activity: "Client satisfaction review"             │
└──────────────────────────────────────────────────────────┘
```

The `activity.estimated_duration_minutes` and `activity.actual_duration_minutes` fields are essential here — they directly translate to billable time tracking.

---

## Rate Card Model (Detailed)

The rate card is the pricing backbone of any professional services firm. Here's how the proto model supports it:

```
                    ┌─────────────────┐
                    │   PriceList     │
                    │   "2025 Rates"  │
                    │   location: NYC │
                    │   start: Jan 1  │
                    │   end: Dec 31   │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼────┐  ┌─────▼──────┐  ┌───▼──────────┐
     │ PriceProduct │  │PriceProduct│  │ PriceProduct  │
     │ Sr. Consult. │  │ Jr. Analyst│  │ Exec Partner  │
     │ $275/hr      │  │ $150/hr    │  │ $550/hr       │
     └──────────────┘  └────────────┘  └───────────────┘
```

**Per-plan rate cards** use `PricePlan` to set engagement-level pricing:

```
     ┌──────────────────────┐
     │   Plan                │
     │   "IT Consulting"     │
     └──────────┬───────────┘
                │
     ┌──────────▼───────────┐       ┌───────────────────────┐
     │   PricePlan           │       │   PricePlan            │
     │   "T&M Monthly"      │       │   "Fixed Fee 6-Month"  │
     │   $25,000/month      │       │   $150,000/6 months    │
     │   duration: 1 month  │       │   duration: 6 months   │
     └──────────────────────┘       └───────────────────────┘
```

The combination of **PriceList** (rate card per location) and **PricePlan** (fee structure per engagement type) gives full pricing flexibility:
- Rate card sets _what each resource type costs per hour_ at a given office
- Price plan sets _how the engagement is billed_ (retainer, T&M, fixed)

---

## Key Field Mappings

### InventoryItem Fields for Resource Tracking

| Field | Professional Services Meaning |
|---|---|
| `name` | Resource name (e.g., "Jane Smith") |
| `product_id` | Links to resource type ("Senior Consultant") |
| `product_variant_id` | Links to specialization ("Sr. Consultant - AWS") |
| `location_id` | Home office ("NYC Office") |
| `sku` | Employee ID ("EMP-2847") |
| `quantity_on_hand` | Total available hours (e.g., 160 hrs/month) |
| `quantity_reserved` | Hours booked on engagements |
| `quantity_available` | Hours available for new work |
| `reorder_level` | Utilization alert threshold (flag if too much bench time) |
| `unit_of_measure` | `"hours"` |
| `item_type` | `"serialized"` for named resources, `"non_serialized"` for pooled |

### Subscription Fields for Engagement Tracking

| Field | Professional Services Meaning |
|---|---|
| `name` | Engagement name ("Acme Corp - Cloud Migration") |
| `client_id` | The client company |
| `price_plan_id` | Chosen fee structure (T&M, fixed, retainer) |
| `date_start` / `date_end` | Engagement period |
| `quantity` | Total contracted hours |
| `assigned_count` | Hours allocated to resources |
| `available_count` | Hours remaining in the contract |
| `metadata` | SOW reference, project codes, cost center |

---

## Example Scenarios

### Scenario: New consulting engagement with Acme Corp

1. **Delegate** (Acme's VP Engineering) reaches out to the firm
2. **Workflow** kicks off the "Standard Consulting Engagement" lifecycle
3. **Stage 1** (Discovery): **Activities** include stakeholder interviews
4. A **Plan** ("IT Consulting") is selected as the engagement type
5. **PricePlan** ("T&M Monthly @ $25,000/month") is chosen
6. **PriceList** ("2025 Rate Card - NYC Office") sets the rates
7. **Subscription** is created: Acme Corp engagement, 500 contracted hours
8. **InventoryItems** (Jane Smith - Sr. Consultant, Tom Lee - Jr. Analyst) are booked
9. **InventoryTransactions** record 120 hrs allocated to Acme
10. Monthly **Events** (status meetings) are scheduled with **EventClient** (Acme's CTO)
11. At month-end, **Invoice** is generated: `40 hrs × $275 + 20 hrs × $150 = $14,000`
12. **Revenue** and **RevenueLineItems** are recorded
13. **Payment** received, **Balance** updated

### Scenario: Rate card renewal

1. Current **PriceList** ("2024 Rate Card - NYC") has `date_end: Dec 31`
2. New **PriceList** ("2025 Rate Card - NYC") created with `date_start: Jan 1`
3. **PriceProducts** updated: Sr. Consultant $250 → $275, Jr. Analyst $140 → $150
4. Active **Subscriptions** continue — billing picks up new rates at renewal

---

## Open Questions & Considerations

- **Utilization tracking**: `quantity_on_hand` works for monthly capacity, but should this reset monthly? Could use `inventory_transaction` adjustments at period boundaries.
- **Blended rates**: When a retainer uses a mix of resource types, the blended rate calculation lives in the application layer, not the schema. The `PricePlan.amount` captures the blended monthly fee, while individual `RevenueLineItems` break it down.
- **Multi-resource engagements**: A single `Subscription` (engagement) may need multiple `InventoryItems` (resources). The link between them goes through `InventoryTransaction` bookings referencing the subscription via metadata or attributes.
- **Non-billable time**: Training, internal meetings, PTO — tracked as `InventoryTransactions` with a non-billable flag (via `inventory_attribute`), contributing to the `inventory_depreciation` (utilization write-down).
