# Professional Services Vertical - Proto Domain Mapping

This document maps the Esqyma proto domain model to **professional services** terminology — firms that sell expertise by the hour (consulting, legal, accounting, IT services, marketing agencies, etc.).

The core insight: **people are the product, hours are the inventory, and rate cards are the price lists.**

---

## Quick Reference

| Schema Term | Professional Services Term | Notes |
|---|---|---|
| `client` | **Client Company** | The organization being served (Acme Corp, not a person) |
| `staff` | **Internal Team / Project Manager** | Firm employees managing engagements |
| `delegate` | **Client Representative** | The person at the client company (VP Engineering, CTO, project sponsor) |
| `admin` | **Practice Director / Firm Admin** | Back-office and firm management |
| `location` | **Office / Practice Location** | Physical office where resources are based |
| `group` | **Team / Resource Pool** | Grouping of resources by skill or department |
| `product` | **Resource Type / Role** | E.g., Senior Consultant, Junior Analyst, Executive Partner |
| `product_variant` | **Resource Specialization** | E.g., Senior Consultant - Cloud, Senior Consultant - Data |
| `collection` | **Practice Area / Service Line** | E.g., "Tax Advisory", "Cloud Migration", "Litigation" |
| `resource` | **Deliverable Template / Work Product** | SOW templates, report templates attached to a role |
| `inventory_item` | **Resource (Person)** | A specific consultant/professional registered at an office |
| `inventory_serial` | **Named Resource** | Individual person tracked by employee ID |
| `inventory_transaction` | **Hours Submitted / Time Entry** | Staff submits hours worked → flows to billing |
| `inventory_depreciation` | **Utilization Write-Down** | Unbillable time, bench time |
| `plan` | **Engagement Type** | Type of service offering (e.g., "IT Consulting", "Tax Advisory", "Audit") |
| `plan_location` | **Engagement Availability** | Which offices can deliver this engagement type |
| `price_plan` | **Engagement Pricing / Fee Structure** | Fixed fee, T&M, or retainer pricing for an engagement type |
| `subscription` | **Active Engagement / Retainer** | A client company's ongoing engagement or retainer contract |
| `license` | **Entitlement / Credit** | Optional: individual entitlements within an engagement |
| `price_list` | **Rate Card** | Blended billing rates per office/region, effective for a date range |
| `price_product` | **Rate** | Blended or per-resource-type rate on a rate card |
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
│  THE CLIENT (Company + Representatives)                   │
│                                                           │
│  client          → Acme Corp (the company, not a person)  │
│  delegate        → VP of Engineering at Acme (the person) │
│  delegate_client → Links representative(s) to company     │
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
│  PRICING (blended rates on the rate card)                 │
│                                                           │
│  price_list           → "2025 Rate Card - NYC Office"     │
│    ├── price_product  → Sr. Consultant @ $275/hr          │
│    ├── price_product  → Jr. Analyst @ $150/hr             │
│    ├── price_product  → Executive Partner @ $550/hr       │
│    └── price_product  → Blended Consulting @ $225/hr      │
│                                                           │
│  price_list           → "2025 Rate Card - Remote"         │
│    ├── price_product  → Sr. Consultant @ $225/hr          │
│    ├── price_product  → Jr. Analyst @ $110/hr             │
│    └── price_product  → Blended Consulting @ $185/hr      │
└──────────────────────────────────────────────────────────┘
```

The `price_list.location_id` field is critical here — it ties a rate card to a specific office, enabling location-based pricing. The `date_start` / `date_end` fields on both `PriceList` and `PriceProduct` support annual rate card renewals.

### Inventory Domain → Resource Registry & Time Submission

The inventory model serves two purposes in professional services:
1. **Resource registry** — `InventoryItem` registers who is available and where
2. **Time entry** — `InventoryTransaction` records hours submitted by staff, which flow to billing

Hours are **not** tracked as a constraint (no decrementing pool). Instead, staff submit hours worked, and those hours become `RevenueLineItems` priced from the applicable `PriceList` and `Plan`.

```
┌──────────────────────────────────────────────────────────┐
│  RESOURCE REGISTRY (who is where, doing what)             │
│                                                           │
│  inventory_item                                           │
│    ├── name              → "Jane Smith"                   │
│    ├── product_id        → FK to "Senior Consultant"      │
│    ├── product_variant_id→ FK to "Sr. Consultant - AWS"   │
│    ├── location_id       → FK to "NYC Office"             │
│    ├── sku               → "EMP-2847" (employee ID)       │
│    ├── unit_of_measure   → "hours"                        │
│    └── item_type         → "serialized" (named person)    │
│                                                           │
│  inventory_serial   → Individual person identity          │
│    └── serial_number → "EMP-2847-NYC"                     │
│                                                           │
│  HOURS SUBMISSION (record-then-bill flow)                 │
│                                                           │
│  inventory_transaction (staff submits hours)              │
│    ├── "40 hrs on Acme engagement, week of Jan 6"         │
│    ├── "8 hrs internal training (non-billable)"           │
│    └── "16 hrs PTO (non-billable)"                        │
│         │                                                 │
│         ▼                                                 │
│  revenue_line_item (derived from time entry)              │
│    ├── 40 hrs × rate from PriceList → billable            │
│    └── rate determined by: plan + price_list + location   │
│                                                           │
│  inventory_depreciation                                   │
│    └── Non-billable hours write-down (bench, training)    │
└──────────────────────────────────────────────────────────┘
```

**The billing flow:**

```
Staff submits     InventoryTransaction     RevenueLineItem        Invoice
  hours       →   (time entry record)  →   (hrs × rate from  →   (client
                                            PriceList/Plan)       billing)
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
│    ├── client_id     → FK to Acme Corp (the company)      │
│    ├── price_plan_id → FK to chosen fee structure         │
│    ├── date_start    → Engagement start date              │
│    ├── date_end      → Engagement end date                │
│    └── metadata      → {"sow_ref": "SOW-2025-042"}       │
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

The rate card is the pricing backbone of any professional services firm. **Blended rates live on the PriceList** — this means the rate card itself can carry either granular per-resource rates or a single blended engagement rate, depending on how the firm prices.

### Blended Rate Card (typical for professional services)

```
                    ┌─────────────────────┐
                    │   PriceList          │
                    │   "2025 Rate Card"   │
                    │   location: NYC      │
                    │   start: Jan 1       │
                    │   end: Dec 31        │
                    └────────┬────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼────┐  ┌─────▼──────┐  ┌───▼──────────────┐
     │ PriceProduct │  │PriceProduct│  │ PriceProduct      │
     │ Sr. Consult. │  │ Jr. Analyst│  │ Blended Consult.  │
     │ $275/hr      │  │ $150/hr    │  │ $225/hr           │
     └──────────────┘  └────────────┘  └──────────────────┘
```

The same `PriceList` can hold both granular rates (for detailed billing) and a blended rate (for engagements quoted at a single price per hour). The blended `PriceProduct` references a "Blended Consulting" `Product` that represents the team mix.

### Engagement Fee Structure (how it's billed)

`PricePlan` defines the billing structure — not the rate, but the cadence and commitment:

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

### How they work together

- **PriceList** (rate card) → _what it costs_ — blended or granular rates per location
- **PricePlan** (fee structure) → _how it's billed_ — retainer, T&M, fixed fee
- When staff submit hours via `InventoryTransaction`, the applicable `PriceList` rate determines the `RevenueLineItem` amount

---

## Key Field Mappings

### InventoryItem Fields for Resource Registry

| Field | Professional Services Meaning |
|---|---|
| `name` | Resource name (e.g., "Jane Smith") |
| `product_id` | Links to resource type ("Senior Consultant") |
| `product_variant_id` | Links to specialization ("Sr. Consultant - AWS") |
| `location_id` | Home office ("NYC Office") |
| `sku` | Employee ID ("EMP-2847") |
| `unit_of_measure` | `"hours"` |
| `item_type` | `"serialized"` for named resources, `"non_serialized"` for pooled |
| `quantity_on_hand` | Not used as a constraint (future: could track cumulative hours submitted) |
| `notes` | Resource bio, certifications, availability notes |

### InventoryTransaction Fields for Time Entry

| Field | Professional Services Meaning |
|---|---|
| Transaction record | Staff submitting hours worked on an engagement |
| Links to `inventory_item` | Which resource (person) submitted the hours |
| Quantity / amount | Number of hours rendered |
| Metadata / attributes | Engagement reference, billable vs non-billable flag, week/period |

Hours submitted via `InventoryTransaction` are the source of truth that drives:
- `RevenueLineItem` creation (hours × rate from applicable `PriceList`)
- `Invoice` generation (aggregated line items for a billing period)

### Subscription Fields for Engagement Tracking

| Field | Professional Services Meaning |
|---|---|
| `name` | Engagement name ("Acme Corp - Cloud Migration") |
| `client_id` | The client company (Acme Corp) |
| `price_plan_id` | Chosen fee structure (T&M, fixed, retainer) |
| `date_start` / `date_end` | Engagement period |
| `quantity` | Optional: contracted hours (if engagement is capped) |
| `metadata` | SOW reference, project codes, cost center |

---

## Example Scenarios

### Scenario: New consulting engagement with Acme Corp

1. **Delegate** (Acme's VP Engineering) reaches out to the firm
2. **Client** (Acme Corp) record is created — the company, not the person
3. **Workflow** kicks off the "Standard Consulting Engagement" lifecycle
4. **Stage 1** (Discovery): **Activities** include stakeholder interviews
5. A **Plan** ("IT Consulting") is selected as the engagement type
6. **PricePlan** ("T&M Monthly @ $25,000/month") is chosen as the fee structure
7. **PriceList** ("2025 Rate Card - NYC Office") sets the blended rate ($225/hr)
8. **Subscription** is created: Acme Corp engagement linked to plan + price plan
9. **InventoryItems** (Jane Smith, Tom Lee) are the assigned resources
10. Weekly: staff submit hours via **InventoryTransaction** ("40 hrs on Acme, week of Jan 6")
11. Each time entry creates a **RevenueLineItem** (40 hrs × $225/hr blended rate from PriceList)
12. Monthly **Events** (status meetings) are scheduled with **EventClient** (Acme's CTO via Delegate)
13. At month-end, **Invoice** is generated from aggregated **RevenueLineItems**
14. **Payment** received, **Balance** updated

### Scenario: Rate card renewal

1. Current **PriceList** ("2024 Rate Card - NYC") has `date_end: Dec 31`
2. New **PriceList** ("2025 Rate Card - NYC") created with `date_start: Jan 1`
3. **PriceProducts** updated: Sr. Consultant $250 → $275, Jr. Analyst $140 → $150
4. Active **Subscriptions** continue — billing picks up new rates at renewal

---

## Status-Driven Flow: InventoryTransaction → RevenueLineItem

In professional services, the inventory transaction (time entry) **always** precedes revenue recognition. Staff submit hours, those hours go through a lifecycle, and only approved billable hours generate `RevenueLineItems`. The `InventoryTransaction.status` field drives this lifecycle.

### Proto Fields That Enable This

```
InventoryTransaction                         RevenueLineItem
├── status           ← lifecycle state       ├── inventory_item_id  ← which resource
├── transaction_type ← "billable","internal" ├── inventory_serial_id← specific person
├── reference_type   ← "subscription"        ├── quantity           ← hours
├── reference_id     ← FK to engagement      ├── unit_price         ← rate from PriceList
├── quantity         ← hours submitted       ├── total_price        ← hrs × rate
├── performed_by     ← staff who worked      └── line_item_type     ← "item"/"discount"
└── serial_number    ← employee ID
```

### InventoryTransaction.status Values for Professional Services

| Status | Meaning | Revenue Impact |
|---|---|---|
| `"draft"` | Staff logging hours, not yet submitted | No revenue |
| `"submitted"` | Hours sent for approval | No revenue yet |
| `"approved"` | Manager approved for billing | Revenue eligible |
| `"billed"` | RevenueLineItem created, on an invoice | Revenue recognized |
| `"rejected"` | Manager rejected, needs correction | No revenue, resubmit |
| `"non_billable"` | Approved but intentionally not billed | → `inventory_depreciation` |
| `"disputed"` | Client disputes billed hours | Revenue on hold |
| `"adjusted"` | Hours corrected after billing | RevenueLineItem adjusted |
| `"written_off"` | Approved hours that will never be billed | → `inventory_depreciation` |

### Scenario A: Normal Billable Time Entry

```
Consultant works         ┌──────────┐
on engagement ─────────▶ │  draft   │ InventoryTransaction created
                         └────┬─────┘   performed_by: "EMP-2847"
                              │         reference_type: "subscription"
                              │         reference_id: "SUB-ACME-001"
                              ▼         quantity: 40 (hours)
                         ┌──────────┐
Staff submits ─────────▶ │submitted │ End of week submission
timesheet                └────┬─────┘
                              │
                              ▼
                         ┌──────────┐
Manager reviews ───────▶ │ approved │ ◀── REVENUE ELIGIBLE
                         └────┬─────┘     (not yet on an invoice)
                              │
                              ▼
                         ┌──────────┐
Billing cycle runs ────▶ │  billed  │ ◀── REVENUE RECOGNIZED
                         └────┬─────┘     RevenueLineItem created:
                              │           ├── quantity: 40
                              │           ├── unit_price: $225 (PriceList)
                              │           └── total_price: $9,000
                              ▼
                    Revenue record updated
                    Invoice generated at month-end
```

**Revenue recognition point**: At `"approved"` → `"billed"` transition. The billing cycle (monthly, bi-weekly, etc.) picks up all `"approved"` transactions, creates `RevenueLineItems` priced from the applicable `PriceList`, and flips status to `"billed"`.

**Key difference from retail**: There are always at least **two human checkpoints** (submit + approve) before revenue. In retail POS, it's zero.

### Scenario B: Non-Billable Time (Training, PTO, Internal)

```
Consultant attends       ┌──────────┐
internal training ─────▶ │  draft   │ InventoryTransaction created
                         └────┬─────┘   transaction_type: "internal"
                              │
                              ▼
                         ┌──────────┐
Staff submits ─────────▶ │submitted │
                         └────┬─────┘
                              │
                              ▼
                         ┌─────────────┐
Manager confirms ──────▶ │non_billable │ ◀── NO REVENUE
                         └──────┬──────┘     Hours are real, but
                                │            not charged to client
                                ▼
                    inventory_depreciation
                    (utilization write-down recorded)
                    └── Tracks bench time, training cost
```

**Revenue recognition point**: Never. The transaction terminates at `"non_billable"`. The hours still matter for utilization reporting — they flow to `inventory_depreciation` to track the cost of unbillable time.

### Scenario C: Disputed Hours

```
Normal flow completes    ┌──────────┐
through billing ───────▶ │  billed  │ RevenueLineItem exists
                         └────┬─────┘   on Invoice INV-2025-003
                              │
                              ▼
                         ┌──────────┐
Client disputes ───────▶ │ disputed │ Revenue on hold
"We didn't authorize     └────┬─────┘   Revenue.status → "disputed"
 40 hrs last week"            │
                    ┌─────────┴─────────┐
                    ▼                   ▼
              ┌──────────┐        ┌───────────┐
Resolved:     │  billed  │        │ adjusted  │  Agreed to reduce
no change     └──────────┘        └─────┬─────┘
                                        │
                                        ▼
                               RevenueLineItem adjusted
                               ├── Original: 40 hrs × $225
                               └── Adjusted: 32 hrs × $225
                                   (credit note for 8 hrs)
```

### Scenario D: Rejected Timesheet (Resubmission Loop)

```
Staff submits            ┌──────────┐
incorrect hours ───────▶ │submitted │
                         └────┬─────┘
                              │
                              ▼
                         ┌──────────┐
Manager rejects ───────▶ │ rejected │ "Wrong engagement code,
                         └────┬─────┘  resubmit against SUB-ACME-002"
                              │
                              ▼
                         ┌──────────┐
Staff corrects &         │submitted │ reference_id updated
resubmits ─────────────▶ └────┬─────┘
                              │
                              ▼
                         ┌──────────┐
Manager approves ──────▶ │ approved │ → normal billing flow continues
                         └──────────┘
```

### Full Lifecycle State Machine

```
                            ┌──────────────────────────────────────┐
                            │                                      │
                            ▼                                      │
    ┌───────┐         ┌───────────┐         ┌──────────┐          │
    │ draft │────────▶│ submitted │────────▶│ approved │──┐       │
    └───────┘         └─────┬─────┘         └────┬─────┘  │       │
                            │                    │        │       │
                            ▼                    │        ▼       │
                      ┌──────────┐               │  ┌───────────┐ │
                      │ rejected │───────────────┘  │non_billable│ │
                      └──────────┘  (resubmit)      └─────┬─────┘ │
                                                          │       │
                            ┌────────────────────────┐    ▼       │
                            │                        │  inventory │
                            ▼                        │  _deprec.  │
                      ┌──────────┐                   │            │
        approved ───▶ │  billed  │◀──────────────────┘            │
                      └────┬─────┘  (billing cycle)               │
                           │                                      │
                           ▼                                      │
                      ┌──────────┐         ┌──────────┐           │
                      │ disputed │────────▶│ adjusted │───────────┘
                      └────┬─────┘         └──────────┘
                           │                    ▲
                           └────────────────────┘
                             (resolved, no change → back to billed)
```

### Comparison with Retail

| Aspect | Retail (POS) | Retail (E-commerce) | Professional Services |
|---|---|---|---|
| **Lifecycle length** | Instant | Hours to days | Days to weeks |
| **Statuses before revenue** | 0 (direct to `completed`) | 3-4 (`pending` → `picked` → `packed` → `shipped`) | 2-3 (`draft` → `submitted` → `approved`) |
| **Human checkpoints** | 0 | 0-1 (pack verification) | 2 (submit + approve) |
| **Revenue trigger** | Sale scan | Shipment confirmed | Manager approval + billing cycle |
| **Non-revenue path** | Adjustment, shrinkage | Cancellation, return | Non-billable, training, PTO |
| **Dispute path** | Return → inspect → restock | Return → inspect → restock | Disputed → adjusted/resolved |

### Cross-Vertical Pattern

The status-driven `InventoryTransaction` → `RevenueLineItem` flow is universal. What changes per vertical is:

1. **How many statuses** exist between creation and revenue recognition
2. **Who triggers** the status transitions (automated vs human)
3. **What percentage** of transactions result in revenue (retail: ~95%, services: ~70-80%)
4. **How long** the gap is between inventory event and revenue event

```
                              InventoryTransaction Lifecycle
Vertical / Scenario          ◀─────────────────────────────────────▶
─────────────────────────────────────────────────────────────────────
Retail (POS sale)             ■ instant
Retail (e-commerce)           ■■■■■■■ hours to days
Retail (return)               ■■■■■■■■■■ days
Professional Services         ■■■■■■■■■■■■■■ days to weeks
Healthcare                    ■■■■■■■■■■■■■■■■■■■■ days to months
Construction                  ■■■■■■■■■■■■■■■■■■■■■■■■ weeks to months
─────────────────────────────────────────────────────────────────────
                              ▲                              ▲
                        Transaction                    Revenue
                         created                      recognized
```

---

## Design Decisions

- **Client = Company**: `Client` is always the organization (Acme Corp). Individual people at the client are `Delegate` records, linked via `delegate_client`. This matches how professional services firms track relationships — you bill the company, not the person.
- **Hours are not a constraint**: `InventoryItem` quantity fields are not used to cap or decrement available hours. Hours flow in one direction: staff submit → `InventoryTransaction` → `RevenueLineItem` → billing. This is a **record-then-bill** model, not a budget-and-decrement model.
- **Blended rates via PriceList**: The `PriceList` (rate card) carries blended rates as `PriceProduct` entries. A single rate card can hold both granular per-role rates and a blended engagement rate. The `PricePlan` defines the billing cadence (monthly retainer, fixed fee), not the rate itself.

## Open Questions & Considerations

- **InventoryTransaction schema**: The current `inventory_transaction` proto may need additional fields or attributes to capture time entry specifics — billable vs non-billable flag, engagement/subscription reference, period/week, and approval status.
- **Multi-resource engagements**: A single `Subscription` (engagement) may have multiple `InventoryItems` (resources) submitting hours. The link is implicit through `InventoryTransaction` records referencing the subscription via metadata or `inventory_attribute`.
- **Non-billable time**: Training, internal meetings, PTO — tracked as `InventoryTransactions` with a non-billable flag (via `inventory_attribute`), contributing to `inventory_depreciation` (utilization write-down).
- **Approval workflow**: Staff-submitted hours may need approval before flowing to billing. The `workflow` / `activity` system could model this: an `Activity` for "approve timesheet" with `ApproveActivity` / `RejectActivity` RPCs.
