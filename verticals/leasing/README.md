# Leasing Vertical - Proto Domain Mapping

This document maps the Esqyma proto domain model to **equipment and property leasing** terminology — businesses that own physical assets (excavators, forklifts, office suites, IT hardware, vehicles) and rent them to lessees under time-limited contracts.

The headline insight: **leasing requires ZERO new proto entities** because `domain/asset/` was already designed for it. `AssetType.RIGHT_OF_USE` (IFRS 16), the append-only `AssetTransaction` audit log with 17 lifecycle event types, and `AssetMaintenance` with `recurrence_interval_days` for scheduled service — all of leasing's domain concerns land on existing structures. The only proto change is 3 optional enum value additions to `AssetTransactionType` for audit clarity, and even those are backwards-compatible convenience additions rather than functional requirements.

The second headline insight: **multiple Jobs per Subscription is the natural cardinality in leasing**, unlike education (1 job per course-term) or professional services (1 job per matter). A 36-month equipment lease spawns: 1 deployment Job, approximately 12 quarterly maintenance Jobs (auto-spawned via recurring schedule), N ad-hoc repair Jobs (incident-driven), and 1 end-of-term return Job. Leasing is the most heterogeneous Job pattern in the vertical suite.

---

## Quick Reference

| Schema Term | Leasing Term | Notes |
|---|---|---|
| `client` | **Lessee** | The company or individual renting the asset |
| `staff` | **Account Manager / Field Service Tech / Yard Operator** | Firm employees managing contracts and service work |
| `delegate` | **Authorized User / Designated Operator** | Person at the lessee's site authorized to operate the asset |
| `admin` | **Fleet Manager / Operations Director** | Back-office and fleet management |
| `location` | **Yard / Depot / Customer Site / Maintenance Bay** | Physical location of assets or service operations |
| `group` | **Customer Tier / Service Region / Fleet Group** | Grouping of lessees or asset fleets |
| `product` | **Asset Class** | E.g., "Excavator", "Forklift", "Office Suite Type-A" |
| `product_variant` | **Specific Model** | E.g., "Excavator XJ-9000", "Suite #305" |
| `collection` | **Asset Category / Fleet Group** | E.g., "Heavy Machinery", "IT Hardware", "Commercial Real Estate" |
| `resource` | **Operator's Manual / Compliance Cert / Inspection Form** | Documentation templates attached to an asset class |
| `price_list` | **Lease Rate Card** | Location- and period-specific lease rates |
| `price_product` | **Lease Rate** | Per-day, per-month, per-mile, or per-sq-ft rate for an asset class |
| `inventory_item` | **Asset Pool** | One row per asset class per yard (count of units available) |
| `inventory_serial` | **The actual leased unit** | Serial number, VIN, or asset tag — the specific physical unit |
| `inventory_transaction` | **Asset Movement** | Out / return / yard transfer / write-off |
| `inventory_depreciation` | **Wear & aging / damage write-down** | Expected wear-and-tear or damage charge |
| `plan` | **Lease Program** | E.g., "12-Month Industrial", "24-Month IT", "5-Year Commercial RE" |
| `plan_location` | **Lease Program Availability per yard/depot** | Which depots offer which lease programs |
| `price_plan` | **Lease Pricing Tier** | Deposit + term rate + renewal terms |
| `subscription` | **Active Lease Contract** | The binding contract for a lessee × asset × term |
| `license` | **Pre-paid Service Credits / Mileage Allowance** | Optional entitlements within a lease (included service calls, mileage cap) |
| `invoice` | **Lease Invoice / Monthly Statement** | Periodic billing document sent to the lessee |
| `balance` | **Lessee Account / Security Deposit** | Outstanding balance or held deposit |
| `payment` | **Lease Payment / Deposit / End-of-term Charges** | Any payment received from the lessee |
| `event` | **Site Visit / Service Call / Pickup / Delivery** | Scheduled interaction at the customer site or yard |
| `event_client` | **Lessee Representative on Site** | The lessee's contact present at an event |
| `event_product` | **Asset Being Serviced** | Which asset class is the subject of the site visit |
| `revenue` | **Lease Revenue / Service Revenue / Damage Charges** | Any revenue recognized against a lease |
| `revenue_line_item` | **Lease Fee / Late Fee / Damage Fee / Mileage Overage** | Individual charge components |
| `revenue_category` | **Revenue Stream** | Lease / Service / Damages / Insurance Pass-through |
| `workflow` | **Lease Lifecycle** | Origination → deployment → operation → termination |
| `stage` | **Lease Stage** | Pending / Deployed / Active / Terminating / Closed |
| `activity` | **Service Activity** | Deploy, inspect, maintain, return |
| `job` | **Service Engagement** | Deployment / cyclic maintenance / ad-hoc repair / end-of-term return |
| `job_phase` | **Phase of a service engagement** | E.g., Mobilization → Service → Documentation → Sign-off |
| `job_task` | **Discrete task within a phase** | E.g., "Inspect hydraulic system", "Replace oil filter", "Record meter reading" |
| `job_activity` | **Cost capture for service work** | Tech hours + parts + 3rd-party fees for a service engagement |
| `activity_labor` | **Field tech / driver / yard operator hours** | Billable or internal labor on service work |
| `activity_material` | **Parts / consumables / fluids replaced** | Materials consumed during service |
| `activity_expense` | **3rd-party costs** | Towing, certification, environmental disposal fees |
| `job_template` | **Service SOP** | One per Job type (Deployment SOP, Quarterly Maintenance SOP, Return SOP) |
| `outcome_criteria` | **Inspection Criteria** | Condition standards evaluated at deployment, service, or return |
| `template_task_criteria` | **Criteria pinning per inspection task** | Which standards apply to a given task |
| `task_outcome` | **Inspection Result per criterion** | Pass / Fail / Needs Repair for each inspection point |
| `phase_outcome_summary` | **Service phase QA roll-up** | Aggregate result across all tasks in a phase |
| `job_outcome_summary` | **Service Engagement Quality Report** | Full service engagement quality score |
| `job_settlement` | **Damage / Overage Chargebacks** | Final financial settlement for end-of-term damage or overage |

---

## Domain Deep Dive

### Asset Domain — The Headline (Zero New Entities)

Leasing's full accounting lifecycle lives on existing `domain/asset/` entities. The IFRS 16 alignment is built in.

```
┌───────────────────────────────────────────────────────────────────────┐
│  ASSET DOMAIN — COVERS ALL OF LEASING'S ACCOUNTING NEEDS             │
│                                                                       │
│  Asset                                                                │
│    ├── asset_type = ASSET_TYPE_RIGHT_OF_USE (IFRS 16)                 │
│    │     Used when the LESSOR records the leased asset under IFRS 16  │
│    │     (finance lease or operating lease with recognition criteria)  │
│    ├── asset_type = ASSET_TYPE_PROPERTY_PLANT_EQUIPMENT (IAS 16)       │
│    │     Used when the lessor holds the asset on its own balance sheet │
│    │     (most equipment lessors)                                      │
│    ├── location_id → current yard/depot/customer-site                 │
│    ├── custodian_id → current responsible operator or lessee contact  │
│    ├── status → ASSET_STATUS_IN_SERVICE (while on lease)              │
│    └── book_value, accumulated_depreciation → IFRS-aligned values     │
│                                                                       │
│  AssetTransaction (append-only audit log — immutable once written)    │
│    ├── ACQUISITION   → asset enters the fleet                         │
│    ├── LEASE_OUT     → asset deployed to lessee (new, field 18)       │
│    ├── TRANSFER      → asset moved between yards (internal)           │
│    ├── LEASE_RETURN  → asset back from lessee (new, field 19)         │
│    ├── DEPRECIATION  → periodic depreciation run                      │
│    ├── REVALUATION_UP / _DOWN → fair-value revaluation                │
│    ├── MAINTENANCE   → major maintenance capitalised                  │
│    ├── DAMAGE_FOUND  → inspection finding post-return (new, field 20) │
│    ├── ADJUSTMENT    → miscellaneous book adjustment                  │
│    └── DISPOSAL_*    → end-of-life (sale / scrap / donation)          │
│                                                                       │
│  AssetMaintenance (recurring schedule anchor)                         │
│    ├── maintenance_type = PREVENTIVE / CORRECTIVE / INSPECTION        │
│    │   / CALIBRATION / OVERHAUL                                       │
│    ├── next_maintenance_date → auto-computed from last completion      │
│    ├── recurrence_interval_days → 90 for quarterly, 30 for monthly   │
│    └── work_order_number → links back to a Job via reference number   │
│                                                                       │
│  AssetLocation, AssetComponent, AssetDisposal,                        │
│  AssetRevaluation, AssetAttribute → full lifecycle covered            │
└───────────────────────────────────────────────────────────────────────┘
```

**IFRS 16 alignment:** When a lessor carries assets as right-of-use (e.g., a sub-lease scenario or a sale-leaseback), `Asset.asset_type = ASSET_TYPE_RIGHT_OF_USE` is set. For the more common case where the lessor owns the asset outright and leases it out, `ASSET_TYPE_PROPERTY_PLANT_EQUIPMENT` is used and the asset simply has custody tracked via `AssetTransaction.LEASE_OUT` / `LEASE_RETURN`.

### Operations Domain — The Multi-Job Pattern

This is the critical structural difference from other verticals. One Subscription (lease contract) spawns multiple heterogeneous Jobs over its lifetime.

```
┌───────────────────────────────────────────────────────────────────────┐
│  ONE LEASE CONTRACT = MANY SERVICE ENGAGEMENTS                        │
│                                                                       │
│  subscription          → "Lessee Corp - Excavator XJ-9000 - 36mo"    │
│    ├── client_id       → FK to Lessee Corp                            │
│    ├── price_plan_id   → FK to "36-Month Industrial Lease Tier 2"     │
│    ├── date_start      → 2026-01-15                                   │
│    └── date_end        → 2029-01-14                                   │
│         │                                                             │
│         │  spawns 1 deployment Job at contract activation             │
│         ▼                                                             │
│  job (type: deployment)                                               │
│    ├── client_id: FK to Lessee Corp                                   │
│    ├── origin_id: FK to Subscription (lease contract)                 │
│    ├── job_template_id: FK to "Excavator Deployment SOP"              │
│    └── status: COMPLETED (one-shot)                                   │
│         │                                                             │
│         │  spawns ~12 maintenance Jobs via AssetMaintenance schedule  │
│         ▼                                                             │
│  job (type: cyclic maintenance — Q1 2026)                             │
│  job (type: cyclic maintenance — Q2 2026)     ←── auto-spawned        │
│  job (type: cyclic maintenance — Q3 2026)         per 90-day cycle    │
│  ...                                                                  │
│         │                                                             │
│         │  spawns N repair Jobs on incident reports                   │
│         ▼                                                             │
│  job (type: repair — hydraulic leak incident)  ←── ad-hoc            │
│  job (type: repair — undercarriage damage)         incident-driven    │
│         │                                                             │
│         │  spawns 1 return Job at contract termination                │
│         ▼                                                             │
│  job (type: end-of-term return)                                       │
│    ├── inspection phase → TaskOutcomes per criterion                  │
│    ├── ASSET_TRANSACTION_TYPE_LEASE_RETURN recorded                   │
│    ├── ASSET_TRANSACTION_TYPE_DAMAGE_FOUND (if damage found)          │
│    └── job_settlement → chargeback Revenue lines                      │
└───────────────────────────────────────────────────────────────────────┘
```

**The cardinality rule for leasing:** `Job.origin_id = Subscription.id` for ALL jobs spawned from a lease. Querying `WHERE job.origin_id = :subscription_id` returns the complete service history for a lease contract — deployment through return.

**JobActivity in leasing** captures all service work cost:

| Sub-entity | Leasing Use | Example |
|---|---|---|
| `activity_labor` | Field tech / driver hours | "4 hrs: hydraulic system inspection by Tech Garcia" |
| `activity_material` | Parts / consumables | "Hydraulic fluid 10L, oil filter #HTX-44 replaced" |
| `activity_expense` | 3rd-party costs | "Towing to maintenance bay $850", "Environmental disposal fee $120" |

### Inventory Domain — Asset Custody Chain

```
┌───────────────────────────────────────────────────────────────────────┐
│  INVENTORY MEETS ASSET (the dual-model custody chain)                 │
│                                                                       │
│  inventory_item         → "Excavator XJ-9000 Pool" (class-level)     │
│    ├── product_id       → FK to "Excavator" (asset class)             │
│    ├── product_variant_id → FK to "Excavator XJ-9000 model"           │
│    ├── location_id      → FK to "North Depot" (yard)                  │
│    └── quantity_on_hand → 3 (3 XJ-9000 units at this depot)          │
│                                                                       │
│  inventory_serial       → "XJ-9000 SN:EX-2024-0471" (unit-level)     │
│    ├── serial_number    → "EX-2024-0471"                              │
│    ├── inventory_item_id → FK to pool above                           │
│    └── notes            → "Tagged Asset: AST-0471"                   │
│         │                                                             │
│         │  joined to Asset record via asset.serial_number             │
│         ▼                                                             │
│  asset                  → "EX-2024-0471" (accounting record)          │
│    ├── asset_type       → PROPERTY_PLANT_EQUIPMENT                   │
│    ├── location_id      → FK to current location (moves on LEASE_OUT) │
│    ├── custodian_id     → FK to current responsible party             │
│    └── status           → IN_SERVICE                                  │
│                                                                       │
│  CUSTODY TRACKING (via AssetTransaction)                              │
│                                                                       │
│  AssetTransaction (LEASE_OUT)                                         │
│    ├── asset_id         → FK to EX-2024-0471                          │
│    ├── from_location_id → "North Depot" (yard)                        │
│    ├── to_location_id   → "Lessee Corp - Construction Site A"         │
│    └── reference_number → "LSE-2026-0047" (Subscription.id)          │
│                                                                       │
│  AssetTransaction (LEASE_RETURN)                                      │
│    ├── asset_id         → FK to EX-2024-0471                          │
│    ├── from_location_id → "Lessee Corp - Construction Site A"         │
│    └── to_location_id   → "North Depot - Intake Bay"                  │
└───────────────────────────────────────────────────────────────────────┘
```

The `inventory_serial` ↔ `asset` link is via matching `serial_number` / `asset.serial_number` — a natural join key already in the schema. No new FK is needed.

### Subscription Domain — The Lease Contract

```
┌───────────────────────────────────────────────────────────────────────┐
│  LEASE PROGRAM HIERARCHY                                              │
│                                                                       │
│  plan                   → "36-Month Industrial Lease"                 │
│    ├── description      → Heavy equipment, full-maintenance option    │
│    ├── plan_location    → Available at North Depot, South Depot       │
│    ├── fulfillment_type → "schedule" (term-based contract)            │
│    └── collection_plan  → Links to "Heavy Machinery" category         │
│                                                                       │
│  price_plan             → "36-Month Industrial Tier 2"               │
│    ├── plan_id          → FK to "36-Month Industrial Lease"           │
│    ├── amount           → 45000000 (centavos = $450,000 / 36 months) │
│    ├── duration_unit    → "month"                                     │
│    └── duration_value   → 36                                          │
│                                                                       │
│  subscription           → Lessee Corp's active lease contract         │
│    ├── client_id        → FK to Lessee Corp                           │
│    ├── price_plan_id    → FK to "36-Month Industrial Tier 2"          │
│    ├── date_start       → 2026-01-15                                  │
│    ├── date_end         → 2029-01-14                                  │
│    └── metadata         → {"asset_serial": "EX-2024-0471",           │
│                             "deposit_amount": 500000,                 │
│                             "mileage_cap": 1500}                      │
└───────────────────────────────────────────────────────────────────────┘
```

---

## Why No New Proto Entities

This section documents the design analysis explicitly because it is the headline finding for leasing.

The following entity-level gaps were considered during the leasing vertical design. Each resolved to an existing entity:

| Considered Gap | Resolved By | How |
|---|---|---|
| **asset_condition** (track wear state between leases) | `AssetTransaction.ADJUSTMENT` + `description` field | Condition notes written on AssetTransaction; DAMAGE_FOUND for post-return inspection findings |
| **maintenance_schedule** (recurring service obligation) | `AssetMaintenance.recurrence_interval_days` + `next_maintenance_date` | Already supports daily / weekly / monthly / quarterly / annual cycles; linked back to Job via `work_order_number` |
| **damage_report** (structured post-return assessment) | `AssetTransaction.DAMAGE_FOUND` + `TaskOutcome` records | DAMAGE_FOUND carries financial impact (`amount` centavos); TaskOutcome rows carry per-criterion inspection results; the pair covers both financial and narrative damage reporting |
| **parent_subscription_id** (link renewal to original lease) | `Subscription.metadata` or a new subscription with `origin_id` back-ref | Renewal is modeled as a new Subscription; cross-referencing via `metadata.predecessor_subscription_id` is sufficient for reporting. The subscription schema's existing FK graph does not need a recursive parent_subscription_id column. |
| **lease_event** (track lifecycle milestones: origination, deployment, renewal, termination) | `AssetTransaction` (for asset custody events) + `workflow` / `stage` / `activity` (for process milestones) | The two-domain split is clean: asset custody events belong in AssetTransaction; contract lifecycle events belong in the workflow domain |
| **chargeback_invoice** (damage-specific billing document) | `JobSettlement` → `Revenue` → `revenue_line_item` | End-of-term chargebacks flow through the standard revenue recognition path: JobSettlement triggers Revenue creation, line items tagged with `revenue_category = "Damages"` |
| **equipment_availability_calendar** (yard scheduling / availability) | `inventory_item.quantity_on_hand` + `AssetTransaction` log | Available units = `quantity_on_hand` minus assets currently in LEASE_OUT state (queryable from AssetTransaction log without a new entity) |

**Conclusion:** Zero new proto entities. The asset domain's design anticipated equipment-custody businesses from inception.

---

## The 3 Optional Enum Additions

`AssetTransactionType` is being extended with 3 leasing-specific values for queryability and audit clarity. **These additions are optional** — the existing `TRANSFER` and `ADJUSTMENT` values can carry the same semantics using conventions on `description` / `from_location_id` / `to_location_id`. Explicit values are added because reading five years of audit log is more transparent when entries self-describe their meaning.

The enum values in the proto are at fields 18, 19, 20 of the `AssetTransactionType` enum (separate namespace from the `AssetTransaction` message fields, which are fully occupied up to field 21).

### `ASSET_TRANSACTION_TYPE_LEASE_OUT = 18`

Recorded when an asset is deployed to a lessee. Distinguishes from internal yard-to-yard `TRANSFER`.

Companion fields used:
- `from_location_id` = yard / depot
- `to_location_id` = customer site (a `Location` entity tagged as customer-owned)
- `reference_number` = lease contract number (`Subscription.id`)
- `description` = optional context (e.g., "Deployed to Lessee Corp Site A per LSE-2026-0047")

**Why not just use `TRANSFER`?** The same fields work — but reading five years of audit log, distinguishing "asset went to customer under a lease" from "asset moved between yards" requires inspecting the `to_location_id` entity to determine whether it is a customer site or an internal yard. With `LEASE_OUT` explicit, the audit trail self-describes. Reporting queries (`SELECT * FROM asset_transaction WHERE transaction_type = 'ASSET_TRANSACTION_TYPE_LEASE_OUT'`) return the complete deployment history without joins to location type.

### `ASSET_TRANSACTION_TYPE_LEASE_RETURN = 19`

Recorded when the asset is physically returned by the lessee. Mirror of `LEASE_OUT`.

Companion fields used:
- `from_location_id` = customer site
- `to_location_id` = yard intake bay
- `reference_number` = lease contract number (`Subscription.id`)

Together, `LEASE_OUT` and `LEASE_RETURN` pairs form a complete **customer custody window**: the asset was with Lessee Corp from transaction A to transaction B, verifiable from the append-only audit log without any mutable state field.

### `ASSET_TRANSACTION_TYPE_DAMAGE_FOUND = 20`

Recorded during end-of-term inspection when damage exceeds normal wear. Drives end-of-term chargeback Revenue lines via the `JobSettlement` path.

Companion fields used:
- `amount` = financial impact estimate (centavos) — may be updated after appraisal
- `description` = damage description (e.g., "Cracked boom arm, hydraulic seal failure, cab glass")
- `reference_number` = inspection report ID (Job.id of the End-of-Term Return job)

**Why not just use `ADJUSTMENT`?** `ADJUSTMENT` is generic — it covers book corrections, cost base updates, and any miscellaneous delta. `DAMAGE_FOUND` tells the audit reader (and any reporting query) that this is operator-attributable damage from lease return, a category often surfaced in customer dispute resolution, insurance reporting, and damage-recovery revenue analysis.

### Backwards Compatibility

These are pure enum value additions — no existing rows are affected, no existing code paths reference these values, and the `transaction_type` DB column is plain `text` with no CHECK constraint (confirmed in `20260502000000_baseline.sql`). No Atlas migration is required.

---

## Sample Data Scenarios Index

Detailed seed scenarios are in separate files under `scenarios/`:

| Domain | File | Scenarios |
|---|---|---|
| **Operations (headline)** | [scenarios/operations.md](scenarios/operations.md) | All 5 canonical service engagement types: deployment, cyclic maintenance, ad-hoc repair, end-of-term return, inter-lease refurbishment |
| **Client** | [scenarios/client.md](scenarios/client.md) | Lessee onboarding, credit check, contract signing, deposit |
| **Inventory** | [scenarios/inventory.md](scenarios/inventory.md) | Asset registry, inventory_serial / asset_transaction custody chain |
| **Plan** | [scenarios/plan.md](scenarios/plan.md) | Lease programs (12-mo industrial, 24-mo IT, residential RE) |
| **Product** | [scenarios/product.md](scenarios/product.md) | Asset class hierarchy (Excavator → XJ-9000 model with asset variants) |
| **Revenue** | [scenarios/revenue.md](scenarios/revenue.md) | Lease revenue: recurring fee billing, late fees, damage chargebacks |
| **Subscription** | [scenarios/subscription.md](scenarios/subscription.md) | Lease contract lifecycle (origination → activation → renewal → termination) |

---

## Status-Driven Flow: Lease Lifecycle

```
Origination              Deployment             Operation             Termination
    │                        │                      │                     │
    ▼                        ▼                      ▼                     ▼
┌──────────┐          ┌──────────┐          ┌──────────────┐       ┌──────────┐
│ PENDING  │─────────▶│DEPLOYED  │─────────▶│   ACTIVE     │──────▶│TERMINATING│
│(contract │  deploy  │(asset at │  service │(recurring    │  end- │(return   │
│ signed,  │  job     │ customer │  events  │ maintenance  │  of-  │ job      │
│ asset    │  created │ site,    │  ongoing)│ + ad-hoc     │  term │ created, │
│ staged)  │          │ LEASE_OUT│          │  repairs)    │  notice│ LEASE_   │
└──────────┘          │ recorded)│          └──────────────┘       │ RETURN   │
                      └──────────┘                                 │ recorded)│
                                                                   └────┬─────┘
                                                                        │
                                                                        ▼
                                                                   ┌──────────┐
                                                                   │  CLOSED  │
                                                                   │(settlement│
                                                                   │ done,    │
                                                                   │ asset back│
                                                                   │ in yard) │
                                                                   └──────────┘
```

### Subscription.status Values for Leasing

| Status | Meaning | Asset Custody |
|---|---|---|
| `"pending"` | Contract signed, asset being prepared | Asset at yard |
| `"deployed"` | Asset handed off, LEASE_OUT recorded | Asset at customer site |
| `"active"` | Lease in progress, billing running | Asset at customer site |
| `"terminating"` | Notice given, return job in progress | Asset in transit or customer site |
| `"closed"` | Return complete, settlement finalized | Asset back at yard |
| `"cancelled"` | Contract cancelled before deployment | Asset at yard (no LEASE_OUT recorded) |
| `"defaulted"` | Lessee in default (non-payment or breach) | Asset recovery in progress |

---

## Key Design Decisions

1. **Multiple Jobs per Subscription is the natural leasing cardinality.** Unlike education (1 job per course-term) or professional services (1 job per matter), a lease contract spawns a heterogeneous set of Jobs over its lifetime. The link is `Job.origin_id = Subscription.id` for every service engagement on that lease. This is not a polymorphic key — it is the standard subscription-origin pattern used across verticals, applied to all job types simultaneously.

2. **Asset custody is tracked via AssetTransaction, not a dedicated custody entity.** The `LEASE_OUT` / `LEASE_RETURN` pair on the immutable AssetTransaction log provides a complete, tamper-evident custody history. Customer custody window = time between LEASE_OUT and LEASE_RETURN with matching `reference_number`. No mutable "current_custody" field is needed.

3. **Recurring maintenance is scheduled via `AssetMaintenance.recurrence_interval_days`.** The existing `next_maintenance_date` + `recurrence_interval_days` fields on `AssetMaintenance` drive the cyclic job spawning cadence. When a maintenance Job completes, the system updates `AssetMaintenance.next_maintenance_date` and the next Job is auto-scheduled. No new scheduling entity is needed.

4. **End-of-term damage flows through the standard revenue path.** Damage findings from inspection (`TaskOutcome` records on the return Job) drive `AssetTransaction.DAMAGE_FOUND` for the asset audit log and `JobSettlement` → `Revenue` for the financial path. The `revenue_category = "Damages"` tag distinguishes damage chargebacks from recurring lease fees in revenue reporting.

5. **The `asset` domain record and the `inventory_serial` record are joined by `serial_number`.** The lessor's accounting system (Asset) and the fleet management system (InventorySerial) reference the same physical unit via the serial number natural key. This dual-model approach avoids adding a new FK between domains while keeping the accounting and operational views clean.

---

## Universal Job Model — applicability to leasing

The `operation/` proto domain is being generalised under `docs/plan/20260427-universal-job-model/` to handle service / project / maintenance / production work from one schema. Wave 1 (already complete locally) added the enum values `PLANNED`, `RELEASED`, `EQUIPMENT`, `SUBCONTRACT`, `HOLD`, `REWORK`, plus JobTemplate versioning and Job output-target fields. Waves 2–4 add nine new entities. **Leasing is a heavy beneficiary** because the service-engagement side of a lease (deployment, maintenance, repair, return) is the most heterogeneous Job pattern in the system, and the new entities give it the same cost / output / variance fidelity that manufacturing gets.

| New entity (Wave) | Relevance to leasing | Example |
|---|---|---|
| `job_template_input` (W2) | 🟡 Medium — per-Job-type expected inputs | "Cyclic maintenance template (excavator XJ-9000) expects 1h field tech + 1 oil-and-filter kit + 0.5h truck slot." |
| `job_template_input_alternate` (W2) | 🟡 Medium — approved part substitutes per asset class | OEM oil filter ↔ approved aftermarket equivalent for low-priority maintenance, but OEM-only for warranty-covered units. |
| `lot` (W2) | ⚪ Low | (occasional — fluids tracked by batch for warranty traceability) |
| `job_input_plan` (W3) | 🟡 Medium — deployment / maintenance budget freeze | When a deployment Job is RELEASED, expected tech-hours + parts-kit cost are frozen; later replacements registered as deviations. |
| `task_interruption` (W3) | 🟢 High — field-service blocked | "Tech on-site, waiting for replacement part to be delivered" — captured with reason and resumption ETA. Drives SLA tracking. |
| `job_output` (W4) | 🟢 High — repair record, asset state change | `output_kind=ASSET_REPAIR` linking back to the leased asset; `output_kind=DELIVERABLE` for the customer-signed service report. |
| `job_cost_ledger_entry` (W4) | 🟢 High — service-engagement cost flow (contract asset) | Each service Job accumulates its own cost ledger; rolls up into the parent lease's profitability. |
| `job_cost_snapshot` (W4) | 🟢 High — period close | Open service-Job WIP at period close, separated by lease for revenue-recognition tagging. |
| `job_plan_deviation` (W4) | 🟢 High — service overrun variance | "Repair Job consumed 4h tech-time vs planned 1h" — drives root-cause analysis on chronic-overrun asset models. |

**Surface area for leasing UI:** the existing Service Engagements list per lease gains a "Cost summary" column (running cost from `job_cost_ledger_entry`); the Maintenance schedule view shows pending vs. planned inputs from `job_template_input`; the Asset Detail gains a "Service variance" tab summarising deviations across all Jobs touching this asset (drives the replace-vs-repair decision).

**End-of-term chargebacks:** the existing return-Job flow uses `TaskOutcome` to capture damage findings; Wave 4's `job_output` formalises the customer-facing damage record (signed photos, signed acknowledgement). This neatens the damage-chargeback evidence chain without adding new entities outside the universal core.

**Lyngua tier-3 keys to author** (under `packages/lyngua/translations/en/leasing/`):
- `job_template_input.json` → "Service kit" / "Deployment kit" / "Maintenance kit"
- `task_interruption.json` → "Service hold" / "Awaiting parts"
- `job_output.json` → "Service completion" (kinds: "Deployed", "Maintained", "Repaired", "Returned")
- `job_cost_ledger_entry.json` → "Service cost ledger"
- `job_plan_deviation.json` → "Service variance"

**See:** `packages/esqyma/verticals/manufacturing/README.md` for the canonical facade example. The same proto fields, rendered under `lyngua/translations/en/manufacturing/`, become BOM-and-Routing / WIP / Variance.
