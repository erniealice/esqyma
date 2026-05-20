# Manufacturing Vertical — Proto Domain Mapping

This document maps the Esqyma proto domain model to **discrete-and-process manufacturing** terminology — businesses that **convert raw materials and components into work-in-progress, finished goods, by-products, reworks, and scraps**, then ship to wholesale or downstream customers. It also covers contract manufacturing, repair-and-overhaul shops, food/beverage co-packers, and any operation where a Job consumes lot-tracked inputs and emits lot-tracked outputs against a versioned recipe.

The core insight: **a Job is a Production Order, a JobTemplate is a BOM-and-Routing, JobTemplateInput rows are BOM lines, JobOutput rows are completions (FG + scrap + rework + by-product), and JobCostLedgerEntry rows are the WIP ledger** — but none of those manufacturing terms appear in proto. They appear only here and in `packages/lyngua/translations/en/manufacturing/`. This is the C1/C2 facade contract: the proto stays universal (service/project/maintenance/production all use the same shape), and the manufacturing terminology rides on top via tier-3 label overrides.

> **Reading this with code:** the universal-core entities below (`job_template_input`, `lot`, `job_output`, `job_cost_ledger_entry`, etc.) are scheduled to land in **Waves 2–4** of `docs/plan/20260427-universal-job-model/`. Wave 1 (already complete in working tree) shipped the enum extensions and Job/JobTemplate versioning + output-target fields that this vertical builds on.

---

## Quick Reference

| Schema Term | Manufacturing Term | Notes |
|---|---|---|
| `client` | **Customer** (B2B distributor, wholesaler, retail chain, end consumer) | Manufacturer ships to. May be internal ("inter-company") for vertically-integrated firms |
| `staff` | **Operator / Machine Operator / QC Inspector / Production Planner / Foreman** | Shop-floor and back-office personnel |
| `delegate` | **Buyer / Account Contact** | Customer-side contact authorising the PO |
| `admin` | **Plant Manager / Production Manager / Quality Manager** | Operations / quality oversight |
| `location` | **Plant / Production Line / Work Center / Warehouse (Raw / WIP / FG) / QC Lab** | Physical or logical site; raw-material, WIP, and finished-goods warehouses each get a row |
| `group` | **Production Cell / Customer Tier** | Cellular grouping of work centers OR customer tier (OEM vs aftermarket vs distributor) |
| `product` | **Item / Part / SKU** — finished good, sub-assembly, raw material, packaging, consumable | One `product` row per material master; `product_kind` distinguishes stocked_good vs consumable; the new `Product.expected_cost` field carries the **standard cost** |
| `product_variant` | **Item Configuration** — colour, size, grade, customer-specific configuration | Variant per configurable attribute |
| `collection` | **Item Category** — Raw Materials / Components / Sub-Assemblies / Finished Goods / By-Products / Packaging / MRO Supplies | Drives sidebar grouping and report filters |
| `resource` | **Work Center / Machine / Line / Crew / Tool / Mould / Fixture** | The capacity-managed thing a Routing Operation runs on. Until Resource strengthening lands (separate plan), this is a thin FK shared with Activity-Billing |
| `price_list` | **Customer Price Sheet / Distributor Tier** | Per-customer or per-channel pricing snapshot |
| `price_product` | **Sale Price per SKU per Customer** | Wholesale rate; tier-2 list price; volume break |
| `inventory_item` | **Material Master Stock Position** | One row per (product × location) tracking on-hand quantity |
| `inventory_serial` | **Lot-Tracked Unit / Serial-Tracked Unit** | Serial-tracked for engines / appliances / regulated parts; the `lot` entity (UJM Wave 2) carries supplier + received-date + expiry |
| `inventory_transaction` | **Material Movement** — receipt / issue / transfer / scrap / adjustment / completion | See `inventory_movement` proto + `MovementType` enum (already has ISSUE / COMPLETION / SCRAP / TRANSFER / ADJUSTMENT / RECEIPT / RETURN / SELL / EXPIRE) |
| `inventory_depreciation` | **Obsolete Stock Write-Down / Slow-Moving Reserve** | NRV / LCM adjustments on slow-moving raw material or aged FG |
| `plan` | **Manufacturing Programme** — toll-manufacturing contract, OEM supply agreement, blanket order schedule | The B2B subscription-style commitment the customer makes |
| `plan_location` | **Plant Eligibility** | Which plants can run this programme |
| `price_plan` | **Programme Pricing** — annual minimum quantity, pricing schedule, tooling amortisation, surcharge schedule | Carries the recurring commercial commitment |
| `subscription` | **Customer Supply Agreement / Blanket Order** | Active long-running B2B commitment that periodically spawns Production-Order Jobs |
| `license` | **Pre-paid Production Credits / Reserved Capacity** | Reserved-capacity entitlement (e.g., "guaranteed 50,000 units/quarter") |
| `invoice` | **Customer Invoice / Commercial Invoice** | Per-shipment or monthly statement; export invoices include incoterms |
| `balance` | **Customer A/R Balance / Deposit** | Receivable; deposits on custom builds |
| `payment` | **Customer Payment** | ACH / wire / cheque; export receipts |
| `event` | **Schedule Event** — production schedule slot, customer pickup, inbound material receipt, audit visit | Not the Job itself; the calendar entry |
| `event_client` | **Pickup / Audit Attendee** | Customer rep on a pickup; auditor on an audit |
| `event_product` | **Schedule Line** | Item-on-schedule for a given slot |
| `revenue` | **Sales Revenue** | Recognised on shipment (or per IFRS-15 over-time pattern for tolling) |
| `revenue_line_item` | **Shipment Line Item** | 1 row per shipped SKU × quantity × price |
| `revenue_category` | **Revenue Stream** — Direct / Distributor / OEM / Tolling / Scrap-Sale / Aftermarket | Drives revenue analytics |
| `workflow` | **Production Workflow** | Optional — links to the workflow domain for inspection-routing or approval routing |
| `stage` | **Workflow Stage** | Inspection stage, approval stage |
| `activity` | **Workflow Activity** | A workflow-engine action, not a shop-floor activity (see `job_activity` for that) |

### Universal Job Model entities — manufacturing rendering

These are the new entities scheduled for UJM Waves 2–4. They are universal in proto; this row shows the manufacturing facade. **Schema names never change**; only lyngua labels do.

| Schema Term (UJM) | Manufacturing Term | Wave |
|---|---|---|
| `job` | **Production Order** (MO / Work Order) | core (W1 hardened) |
| `job_template` | **BOM-and-Routing** (Recipe / Master Manufacturing Order) | core (W1 versioned) |
| `job_template_phase` | **Routing Operation** | core (W1 timing fields) |
| `job_template_task` | **Routing Step** | core (W1 timing fields) |
| `job_template_input` | **BOM Line** — one row per expected raw material / labour / equipment / subcontract | **W2** |
| `job_template_input_alternate` | **Approved Substitute** | **W2** |
| `lot` | **Lot / Batch** — supplier, received-date, expiry, certificate of analysis | **W2** |
| `job_phase` | **Active Operation** | core |
| `job_task` | **Work-Center Step** | core |
| `job_activity` | **Labour / Material / Equipment / Subcontract Ticket** | core (W1 EQUIPMENT + SUBCONTRACT enums) |
| `activity_labor` | **Labour Ticket** | core |
| `activity_material` | **Material Issue** (consumption against an Operation) | core; W3 adds substitution fields |
| `activity_expense` | **Subcontract / Outside-Process Charge** | core |
| `inventory_movement` | **Material Movement** (ISSUE / COMPLETION / SCRAP / RECEIPT / TRANSFER) | core; W4 adds lot+activity FKs |
| `job_input_plan` | **Frozen BOM Snapshot** at MO release | **W3** |
| `task_interruption` | **Downtime Event** | **W3** |
| `job_output` | **Completion Record** — FG, scrap, rework, by-product, QC certificate | **W4** |
| `job_cost_ledger_entry` | **WIP Ledger Entry** | **W4** |
| `job_cost_snapshot` | **WIP Snapshot** (period-end roll-up) | **W4** |
| `job_plan_deviation` | **Production Variance** (qty / cost / yield / time) | **W4** |
| `outcome_criteria` | **Quality Specification** | core |
| `criteria_threshold` | **Spec Limit** (LSL / USL / nominal / tolerance) | core |
| `template_task_criteria` | **Quality Pin** per Routing Step | core |
| `task_outcome` | **QC Result** | core |
| `phase_outcome_summary` | **Operation QC Roll-up** | core |
| `job_outcome_summary` | **Certificate of Conformance / Quality Report** | core |
| `job_settlement` | **Cost Settlement** (WIP relief → FG inventory + variance) | core |

---

## Domain Deep Dive

### Entity Domain → Plant People & Locations

```
┌──────────────────────────────────────────────────────────┐
│  THE PLANT                                                │
│                                                           │
│  staff           → Operator, Machine Operator, QC         │
│                    Inspector, Production Planner, Foreman │
│  admin           → Plant Manager, Production Manager,     │
│                    Quality Manager                        │
│  workspace       → The Manufacturing Company              │
│                                                           │
│  THE CUSTOMER                                             │
│                                                           │
│  client          → Distributor, OEM customer, retail      │
│                    chain, internal inter-company entity   │
│  delegate        → Buyer at customer; sourcing manager    │
│                                                           │
│  LOCATIONS  (one row per physical or logical site)        │
│                                                           │
│  location        → Plant A — Main Building                │
│                    Plant A — Production Line 1            │
│                    Plant A — Production Line 2            │
│                    Plant A — Raw Materials Warehouse      │
│                    Plant A — WIP Staging Area             │
│                    Plant A — Finished Goods Warehouse     │
│                    Plant A — Quarantine / QC Hold         │
│                    Plant A — Disposition Bin (scrap)      │
│                                                           │
│  group           → "OEM Customers", "Distributors",       │
│                    "Aftermarket", "Inter-company"         │
└──────────────────────────────────────────────────────────┘
```

**Why so many location rows:** every distinct stock position needs its own `location` so `inventory_movement` rows can record a real `from_location_id` → `to_location_id`. A raw-material *issue* moves stock from the raw-storage location to the production line; a *completion* moves from the production line to the FG-storage location; a *scrap* (`MOVEMENT_TYPE_SCRAP`, a sanctioned exception per C1) moves to the disposition-bin location. The `location.category_id` FK (1:N to the existing `category` table, per the manufacturing-vertical plan) classifies each location as raw-storage / WIP / FG-storage / QC / scrap so inventory reports group by category without ambiguity.

### Product Domain → Material Master

**The product table is the material master. Every item — raw material, packaging, sub-assembly, finished good, by-product, MRO supply — gets one row.**

```
┌──────────────────────────────────────────────────────────┐
│  MATERIAL MASTER                                          │
│                                                           │
│  collection (parent)  → "Raw Materials"                   │
│    └── product        → "Steel Sheet 0.8mm Grade A"       │
│         ├── product_kind: stocked_good                    │
│         ├── tracking_mode: bulk (sometimes serialized)    │
│         ├── unit: "kg"                                    │
│         ├── expected_cost: 12000  (₱120.00/kg in centavos)│
│         └── default_template_id: NULL  (raw, not made)    │
│                                                           │
│  collection           → "Components"                      │
│    └── product        → "Bearing 6004ZZ"                  │
│         ├── tracking_mode: bulk                           │
│         └── unit: "piece"                                 │
│                                                           │
│  collection           → "Sub-Assemblies"                  │
│    └── product        → "Motor Stator Sub-Assembly"       │
│         ├── product_kind: stocked_good                    │
│         ├── tracking_mode: serialized                     │
│         └── default_template_id: FK → "MOTOR-STATOR-MR3"  │
│              (this sub-assembly is itself made-to-stock   │
│               via a BOM-and-Routing called MR3)           │
│                                                           │
│  collection           → "Finished Goods"                  │
│    └── product        → "Drill Motor Model DM-2200"       │
│         ├── product_kind: stocked_good                    │
│         ├── tracking_mode: serialized                     │
│         ├── variant_mode: configurable                    │
│         │     ├── variant: DM-2200-CORDED-220V            │
│         │     └── variant: DM-2200-CORDLESS-18V           │
│         ├── unit: "unit"                                  │
│         ├── expected_cost: 850000  (₱8,500/unit)          │
│         └── default_template_id: FK → "BOM-DM2200-rev5"   │
│                                                           │
│  collection           → "By-Products"                     │
│    └── product        → "Steel Sheet Drop Cuts"           │
│         ├── product_kind: stocked_good                    │
│         ├── unit: "kg"                                    │
│         └── (no default_template_id; emerges from job_output)│
│                                                           │
│  collection           → "MRO / Consumables"               │
│    └── product        → "Cutting Oil Type-G"              │
│         ├── product_kind: consumable                      │
│         └── unit: "litre"                                 │
└──────────────────────────────────────────────────────────┘
```

**Key field reinterpretations:**

| Field | Manufacturing Use |
|---|---|
| `Product.expected_cost` | **Standard cost** in centavos. Set on FG / sub-assembly / raw. Drives variance calculation when a Job's actual cost (`job_cost_ledger_entry`) differs from `expected_cost × output_quantity` |
| `Product.default_template_id` | **Default BOM-and-Routing** for this item. When a Production Order is created from a Customer Supply Agreement, this is the template auto-selected unless the operator picks a different revision |
| `Product.product_kind` | `stocked_good` for raw / WIP / FG / by-product; `consumable` for cutting oil / coolant / packaging tape; `service` only for outside-process services billed-through (e.g., heat-treat) |
| `Product.tracking_mode` | `serialized` for regulated / warranty-tracked finished goods (engines, white-goods, electronics); `bulk` for commodity raw and most consumables |
| `Product.variant_mode` | `configurable` for FG with customer options (colour, voltage, packaging spec); `none` for raw and most components |
| `Product.unit` | UoM for stocking and reporting. UoM master entity is **deferred** (out of scope of UJM Waves 1-4); for now this is free-text per the existing model |

### BOM-and-Routing → JobTemplate + JobTemplatePhase + JobTemplateTask + JobTemplateInput

A **BOM-and-Routing** is one `JobTemplate` row plus its phases (operations), tasks (steps within operations), and inputs (BOM lines). The BOM lines arrive in UJM Wave 2 as `job_template_input` rows — one per expected material, labour, equipment, or subcontract.

```
JobTemplate "BOM-DM2200-rev5"
  ├── template_code: "BOM-DM2200"
  ├── revision: 5
  ├── version_status: PUBLISHED
  ├── effective_from: 2026-04-01
  ├── output_product_id: FK → "Drill Motor DM-2200"
  ├── default_lot_size: 100
  ├── default_uom: "unit"
  ├── supersedes_template_id: FK → revision 4
  ├── published_at: 2026-03-28
  └── published_by: "staff-planner-01"
        │
        ├── JobTemplatePhase 1: "Stator Sub-Assembly"  (phase_order: 1)
        │     ├── resource_id: FK → "Assembly Cell A"
        │     ├── setup_minutes: 15
        │     ├── run_minutes_per_unit: 2.4
        │     └── JobTemplateTask 1.1: "Press stator core" — standard_machine_minutes: 1.0
        │         JobTemplateTask 1.2: "Wind coils"        — standard_labor_minutes: 1.4
        │
        ├── JobTemplatePhase 2: "Rotor Assembly"        (phase_order: 2)
        │     ├── resource_id: FK → "Assembly Cell B"
        │     └── predecessor_template_phase_id: FK → Phase 1
        │
        ├── JobTemplatePhase 3: "Final Assembly + Test" (phase_order: 3)
        │     └── JobTemplateTask 3.1: "Functional test" — links via template_task_criteria to:
        │           OutcomeCriteria "Motor No-Load Current"  (NUMERIC_RANGE, A)
        │             CriteriaThreshold (PASS_MIN=0.2, PASS_MAX=0.6, NOMINAL=0.4)
        │
        ├── JobTemplateInput  (BOM lines — Wave 2)
        │     ├── input_kind: MATERIAL  product: "Stator Core SC-104"   quantity: 1   uom: piece
        │     ├── input_kind: MATERIAL  product: "Copper Wire 0.5mm"    quantity: 0.45 uom: kg
        │     ├── input_kind: MATERIAL  product: "Bearing 6004ZZ"       quantity: 2   uom: piece
        │     ├── input_kind: LABOR     resource: "Assembly Cell A op"  quantity: 0.05 uom: hour
        │     ├── input_kind: EQUIPMENT resource: "Assembly Cell A"     quantity: 0.04 uom: hour
        │     └── input_kind: SUBCONTRACT  product: "Heat-treat service" quantity: 1 uom: lot
        │
        └── JobTemplateInputAlternate (W2 — approved substitutes)
              └── for "Copper Wire 0.5mm": alternate "Copper Wire 0.5mm (Brand B)"
```

**Versioning and immutability (UJM Wave 2):** publishing a BOM-and-Routing locks the inputs. Editing requires cloning to revision+1 (DRAFT status, supersedes pointer set). In-flight Production Orders carry `job_template_revision_snapshot` + a frozen `job_input_plan` and are immune to later revisions.

**ECO (Engineering Change Order):** modelled as a free-string `change_request_id` field today. The field is on `JobTemplate`, `Job`, and `JobActivity`. The full `change_request` entity is deferred (see `verticals.md` Q2 in the UJM plan).

### Production Order Lifecycle → Job

A **Production Order** is one `Job` row. It moves through statuses:

```
JOB_STATUS_DRAFT      → MRP suggestion (planner has not committed)
JOB_STATUS_PENDING    → committed but not yet scheduled
JOB_STATUS_PLANNED    → scheduled (date + resource fixed)
JOB_STATUS_RELEASED   → released to shop floor; job_input_plan frozen
JOB_STATUS_ACTIVE     → first material issued or first labour ticket logged
JOB_STATUS_PAUSED     → temporarily halted; see task_interruption rows for reasons
JOB_STATUS_COMPLETED  → all required job_output rows posted
JOB_STATUS_CLOSED     → cost-settled; variances locked
```

The two new statuses **PLANNED** and **RELEASED** (Wave 1) carry the manufacturing meaning of "scheduled" vs "released to floor." Service jobs may skip them; production jobs must pass through.

```
┌─────────────────────────────────────────────────────────────┐
│  Production Order  "MO-DM2200-20260512-001"                 │
│    ├── id: "job-mo-20260512-001"                            │
│    ├── name: "Drill Motor DM-2200 — 100 units"              │
│    ├── job_template_id: FK → "BOM-DM2200-rev5"              │
│    ├── job_template_revision_snapshot: 5                    │
│    ├── output_product_id: FK → "Drill Motor DM-2200"        │
│    ├── output_product_variant_id: FK → "DM-2200-CORDED-220V"│
│    ├── planned_quantity: 100                                │
│    ├── output_uom: "unit"                                   │
│    ├── demand_type: DEMAND_TYPE_MTS                         │
│    ├── fulfillment_type: FULFILLMENT_TYPE_PRODUCTION        │
│    ├── cost_flow_type: COST_FLOW_TYPE_WIP                   │
│    ├── billing_rule_type: BILLING_RULE_TYPE_NON_BILLABLE    │
│    ├── status: JOB_STATUS_RELEASED                          │
│    ├── due_date: 2026-05-25                                 │
│    ├── release_date: 2026-05-12                             │
│    ├── planned_start: 2026-05-13 08:00                      │
│    ├── planned_end: 2026-05-16 17:00                        │
│    ├── priority: 5                                          │
│    └── client_id: NULL  (made-to-stock; no specific buyer)  │
└─────────────────────────────────────────────────────────────┘
```

**`cost_flow_type=WIP`** is the structural difference between a production Job and a service Job. Service jobs use `DIRECT_EXPENSE` (cost hits P&L directly); production jobs use `WIP` (cost accumulates in WIP until completion). The new `job_cost_ledger_entry` (UJM Wave 4) is the append-only log of those postings.

### Materials Planning → from Customer Supply Agreement → MRP → Job

```
Subscription "OEM-CHEVY-2026"  (annual supply agreement)
  ├── client_id: "clt-oem-chevy"
  ├── price_plan_id: FK → "DM-2200 OEM Price Plan 2026"
  ├── origin_type: ORIGIN_TYPE_SUBSCRIPTION
  └── active: true
        │
        │  MRP planner ages forecast + on-hand + open POs
        │  → suggests Job (status=DRAFT)
        ▼
  Job (DRAFT, planned_quantity=100, due_date=2026-05-25, output_product_id=DM-2200)
        │
        │  Planner reviews + commits → status=PENDING
        │  Capacity scheduler assigns dates+resource → status=PLANNED
        │  Floor releases → status=RELEASED + job_input_plan snapshot frozen
        ▼
  Production Order RELEASED with:
    ├── job_input_plan rows (Wave 3): one per BOM line, expected qty frozen
    ├── lots reserved (Wave 2): specific lots earmarked from inventory
    └── routing operations sequenced on the schedule board
```

**Multi-level BOM** (sub-assembly that is itself made-to-stock): each level is a separate `Product` with its own `default_template_id`. When the planner commits to make 100 DM-2200 units, the MRP run sees that DM-2200 BOM has a `MATERIAL` input of "Motor Stator Sub-Assembly" — itself a `product_kind=stocked_good` with `default_template_id`. If on-hand is below need, a child Production Order Job for the stator is suggested (`parent_job_id` links the child to the parent), with its own BOM-and-Routing.

**Make-to-order vs make-to-stock:** the `Job.demand_type` enum distinguishes — `DEMAND_TYPE_MTO` carries a `client_id` and `sales_order_line_id`; `DEMAND_TYPE_MTS` leaves both NULL.

### Conversion Flow → Material Issues, Completions, Scrap, Rework, By-Product, Backflush

The conversion of raw → WIP → FG happens through three coordinated entity flows:

1. **Inputs (consumption):** `job_activity` rows of `entry_type=MATERIAL` paired with `activity_material` detail. Each writes an `inventory_movement` of `movement_type=ISSUE` (raw warehouse → production line).
2. **Outputs (production):** `job_output` rows (Wave 4) of `output_kind=INVENTORY_RECEIPT`. Each writes an `inventory_movement` of `movement_type=COMPLETION` (production line → FG warehouse). Optional `scrap_quantity` + `rework_quantity` carry by-line yield.
3. **Quality:** `task_outcome` rows pin clinical-style results against `outcome_criteria` for each `job_task` that has a `template_task_criteria` pin. A `phase_outcome_summary` rolls up an operation; a `job_outcome_summary` is the final Certificate of Conformance.

```
┌─────────────────────────────────────────────────────────────────┐
│  CONVERSION FLOW for MO-DM2200-20260512-001 (100 units)          │
│                                                                  │
│  Phase 1: Stator Sub-Assembly                                    │
│    JobActivity (entry_type=MATERIAL, qty=100)                    │
│      ActivityMaterial: product=SC-104, lot=L-2026-04-15          │
│      InventoryMovement: ISSUE, raw_wh → line_1                   │
│    JobActivity (entry_type=MATERIAL, qty=45 kg)                  │
│      ActivityMaterial: product=Copper-Wire-0.5mm, lot=L-2026-03-20│
│      InventoryMovement: ISSUE                                    │
│    JobActivity (entry_type=LABOR, hours=5.0)                     │
│      ActivityLabor: staff=op-007, rate_type=STANDARD             │
│                                                                  │
│  Phase 2: Rotor Assembly  (skipped — same pattern)               │
│                                                                  │
│  Phase 3: Final Assembly + Test                                  │
│    JobActivity × 100 (one per unit functional test)              │
│      TaskOutcome: numeric_value=0.42 A, determination=PASS       │
│      TaskOutcome: numeric_value=0.71 A, determination=FAIL       │
│      TaskOutcome: numeric_value=0.39 A, determination=PASS       │
│                                                                  │
│  Phase 3 close: post job_output rows (Wave 4)                    │
│    JobOutput row 1: kind=INVENTORY_RECEIPT, qty=95,              │
│      scrap_quantity=3, rework_quantity=2,                        │
│      lot=L-FG-MO-001, to_location=fg_warehouse                   │
│      → InventoryMovement: COMPLETION, line_1 → fg_warehouse, 95  │
│      → InventoryMovement: SCRAP,      line_1 → disposition_bin,3 │
│      (the 2 rework units become a child Job with                 │
│       parent_job_id=MO-DM2200-20260512-001 and                   │
│       status_starts_in JOB_STATUS_ACTIVE +                       │
│       TaskStatus.REWORK on the offending task)                   │
│    JobOutput row 2: kind=DELIVERABLE,                            │
│      deliverable_url="…/quality-report-MO-001.pdf"               │
│      (Certificate of Conformance generated from                  │
│       job_outcome_summary)                                       │
│                                                                  │
│  Job CLOSE: post JobSettlement rows                              │
│    JobSettlement: target_type=INVENTORY_ASSET,                   │
│      target_id=fg-DM-2200, allocated_amount=cost of 95 units     │
│    JobSettlement: target_type=WIP_ACCOUNT (variance)             │
│    job_cost_ledger_entry: final reconciliation (Wave 4)          │
└─────────────────────────────────────────────────────────────────┘
```

**Backflush** is *not* a separate mechanism — it is a **JobTemplate-level policy** (`BackflushPolicy` enum, deferred to Wave 2) that says "auto-issue all expected inputs from the frozen `job_input_plan` when a `job_output` of kind INVENTORY_RECEIPT is posted." A backflush-enabled BOM-and-Routing skips per-step `JobActivity(MATERIAL)` rows and emits them retrospectively from the output post. The proto carries the policy enum; the use-case layer carries the logic.

**By-products** appear as separate `job_output` rows of `output_kind=INVENTORY_RECEIPT` with a different `product_id` than the parent template's `output_product_id`. Steel-cut drop scraps from a stamping operation become "Steel Sheet Drop Cuts" by-product rows that can later be sold as scrap revenue or recycled.

**Rework** uses `TaskStatus.REWORK` on the offending `job_task` (Wave 1 enum extension) and typically spawns a child Job via `parent_job_id`. A unit going through rework is *not* the same as a unit going through scrap; the rework Job carries its own labour and material consumption.

### Quality → Outcome Criteria, Thresholds, Pinning, Certificate of Conformance

The quality layer is **already in proto today** — no new entities needed for QC reporting. Mapping:

```
OutcomeCriteria  "Motor No-Load Current"
  ├── criteria_type: NUMERIC_RANGE
  ├── unit: "A"
  ├── decimal_places: 2
  └── version_status: PUBLISHED

CriteriaThreshold rows hanging off the above:
  ├── threshold_role: PASS_MIN, value: 0.2
  ├── threshold_role: PASS_MAX, value: 0.6
  ├── threshold_role: NOMINAL,  value: 0.4
  └── threshold_role: WARN_MAX, value: 0.55  (in-spec but flagged)

CriteriaOption (for CATEGORICAL types like "Visual Inspection Result"):
  ├── value: "no defects", maps_to_determination: PASS
  ├── value: "minor scratches", maps_to_determination: PASS_WITH_CONDITION
  └── value: "dent", maps_to_determination: FAIL

TemplateTaskCriteria pins OutcomeCriteria to a specific JobTemplateTask:
  └── job_template_task_id × outcome_criteria_id pairing

TaskOutcome captures the actual result per unit per task:
  └── numeric_value, categorical_value, pass_fail_value, determination

PhaseOutcomeSummary rolls up a JobPhase:
  └── overall_determination per phase, summary_score

JobOutcomeSummary is the final Certificate of Conformance:
  └── summary_type: QC_CERTIFICATE
  └── overall_determination: ACCEPTED / CONDITIONALLY_ACCEPTED / REJECTED
  └── total_criteria_count, pass_count, fail_count
  └── issued_by (staff), valid_until_date, attachment_ids (signed PDF)
```

The existing `SummaryType.QC_CERTIFICATE` and `OverallDetermination.{ACCEPTED, CONDITIONALLY_ACCEPTED, REJECTED}` enum values are already manufacturing-flavoured; no extension needed.

### Subscription Domain → Customer Supply Agreements

```
┌──────────────────────────────────────────────────────────┐
│  CUSTOMER SUPPLY AGREEMENTS                               │
│                                                           │
│  plan               → "DM-2200 OEM Supply Programme 2026" │
│    ├── description  → Annual blanket purchase agreement   │
│    ├── plan_location→ Plant A                             │
│    ├── fulfillment_type → "physical" (goods delivered)    │
│    └── collection_plan → Links to "Finished Goods"        │
│                                                           │
│  price_plan          → "Chevy 2026 OEM rate — Q1"         │
│    ├── amount        → 750000  (₱7,500/unit)              │
│    ├── duration_unit → "year"                             │
│    ├── duration_value→ 1                                  │
│    └── (price scheduling per quarter via PriceSchedule)   │
│                                                           │
│  subscription        → Active blanket order               │
│    ├── client_id     → FK to OEM customer                 │
│    ├── price_plan_id → FK to OEM rate                     │
│    ├── quantity      → 12000  (annual minimum)            │
│    ├── assigned_count→ 5400  (shipped year-to-date)       │
│    ├── available_count→ 6600 (remaining)                  │
│    └── metadata      → {"po_number": "CHEVY-PO-2026-014", │
│                         "incoterms": "FOB Plant",         │
│                         "release_cadence": "monthly"}     │
└──────────────────────────────────────────────────────────┘
```

`SubscriptionLicense` (the `license` proto) carries pre-paid production credits or reserved-capacity entitlements — useful for tolling agreements where the customer reserves machine-hours and consumes them via Production Orders over the contract term.

### Pricing Domain → Customer Price Sheets

```
PriceSchedule "OEM Pricing — Chevy 2026"
  ├── effective_from: 2026-01-01
  ├── effective_to:   2026-12-31
  ├── location_id:    Plant A
  └── (binds to which customers via Subscription.price_plan_id chain)

PricePlan "DM-2200 OEM Q1 rate"
  ├── price_schedule_id: FK (location inherited from schedule)
  ├── amount: 750000  (₱7,500/unit when bundle mode)
  └── duration: 90 days (quarterly rate review)

ProductPricePlan rows (per-SKU breakdown):
  ├── product_plan_id: FK → ProductPlan(DM-2200 → OEM plan)
  ├── product_variant_id: NULL or specific variant
  └── price: per-unit centavos for that variant
```

Customer-specific pricing, volume breaks, and tier pricing all live in the existing centymo pricing graph (`PriceSchedule → PricePlan → ProductPricePlan` with optional `ProductPlan`). No manufacturing-specific extension required at the price entity level.

### Revenue Domain → Shipment Recognition

```
Job COMPLETED + JobOutput posted + Stock at FG warehouse
   ↓
Shipment event (event_kind / inventory_movement of type SELL)
   ↓
Revenue row created  (currently via subscription cycle materialisation or manual)
   ├── revenue_line_item × N (one per shipped SKU × qty × price)
   └── revenue_category: "OEM" / "Distributor" / "Aftermarket" / "Scrap"
```

For tolling / time-of-service revenue recognition: a Production Order with `cost_flow_type=CONTRACT_ASSET` and `billing_rule_type=T_AND_M` follows the activity-billing recognition path (existing fayna `bill_job_activities.go`), recognising revenue as `JobActivity` rows post. The contract-asset path is the existing IFRS-15-compatible mechanism — same one Professional Services uses for retainers.

For scrap sales: a separate sales Job (or a direct Revenue) referencing a by-product `product_id` records the scrap-sale revenue stream. The original Production Order's settlement does not need to know.

---

## Key Field Mappings

| Field | Manufacturing Use | Notes |
|---|---|---|
| `Job.demand_type` | MTO / MTS / INTERNAL / WARRANTY / AD_HOC | Drives MRP behaviour |
| `Job.fulfillment_type` | PRODUCTION (the default for MO Jobs) | Distinguishes from SERVICE / PROJECT / MAINTENANCE |
| `Job.cost_flow_type` | WIP for production; CONTRACT_ASSET for tolling | Drives accounting destination |
| `Job.billing_rule_type` | NON_BILLABLE (MTS) / FIXED_FEE (MTO firm price) / T_AND_M (tolling) | Drives revenue recognition path |
| `Job.output_product_id` + `output_product_variant_id` | The FG SKU being produced | Wave 1 fields |
| `Job.planned_quantity` + `output_uom` | Batch size | Wave 1 fields |
| `Job.parent_job_id` | Parent MO for sub-assembly child Jobs and rework children | Wave 1 |
| `Job.predecessor_job_ids` | Manufacturing dependencies (e.g., "ship after MO-099 completes") | Wave 1 |
| `Job.cost_account_id` | WIP control account | Wave 1 |
| `Job.job_template_revision_snapshot` | Frozen BOM revision number at release | Wave 1 |
| `Job.change_request_id` | ECO reference (free string today; entity later) | Wave 1 |
| `JobTemplate.template_code` + `revision` + `version_status` | BOM identity + revision lifecycle | Wave 1 |
| `JobTemplate.default_lot_size` + `default_uom` | Batch defaults inherited by new MOs | Wave 1 |
| `JobTemplate.output_product_id` | Default FG this BOM produces | Wave 1 |
| `JobTemplatePhase.resource_id` + `setup_minutes` + `run_minutes_per_unit` | Routing operation timing on a work centre | Wave 1 |
| `JobTemplateTask.standard_labor_minutes` + `standard_machine_minutes` | Step-level timing | Wave 1 |
| `JobPhase.predecessor_phase_id` | Sequential operation flow | Wave 1 |
| `JobTask.predecessor_task_ids` + `allow_parallel` | Step-level DAG | Wave 1 |
| `JobTask.is_critical_path` | Schedule-critical step flag | (planned) |
| `MovementType` | ISSUE / COMPLETION / SCRAP / TRANSFER / ADJUSTMENT / RECEIPT / RETURN / SELL / EXPIRE | Already covers manufacturing |
| `EntryType` | LABOR / MATERIAL / EXPENSE / EQUIPMENT / SUBCONTRACT | Wave 1 added EQUIPMENT + SUBCONTRACT |
| `JobStatus` | DRAFT / PENDING / PLANNED / RELEASED / ACTIVE / PAUSED / COMPLETED / CLOSED | Wave 1 added PLANNED + RELEASED |
| `TaskStatus` | PENDING / IN_PROGRESS / COMPLETED / SKIPPED / HOLD / REWORK | Wave 1 added HOLD + REWORK |
| `Product.expected_cost` | Standard cost in centavos | Wave 1 |
| `Product.default_template_id` | Default BOM-and-Routing | Wave 1 |

---

## Status-Driven Flow

A typical Production Order traverses these statuses; the activities and outputs against the Job evolve correspondingly:

```
DRAFT (MRP suggestion)
  ↓ planner commits
PENDING (sales/MRP backlog)
  ↓ scheduler assigns dates+resource
PLANNED (on schedule board)
  ↓ release to floor — freeze job_input_plan, reserve lots
RELEASED
  ↓ first MATERIAL issue or LABOR ticket
ACTIVE
  ↓ all required outputs posted (FG + scrap + rework + QC cert)
COMPLETED
  ↓ JobSettlement posted, WIP relieved, variances locked
CLOSED
```

Rollback transitions: ACTIVE → PAUSED (with `task_interruption` reason), PLANNED → PENDING, RELEASED → PAUSED, REWORK child Job spawned from a failed `task_outcome` chain on a parent ACTIVE Job.

---

## Adjacent extensions (out of scope for this vertical, tracked here)

The following are **not** part of the universal core and not required for the manufacturing facade to function. They are listed so they don't reappear as surprise asks.

- **MRP planned-order entity** — pre-Job demand intake (forecast + reorder-point + lot-sizing rules). Today, planner suggestions are modelled as `Job(status=DRAFT)`. A dedicated MRP entity is a future epic.
- **Engineering Change Order entity** — promoted from the current `change_request_id` string FK. Deferred per UJM `verticals.md` Q2.
- **Capacity scheduling / Resource strengthening** — capacity calendar, capability tags, concurrent-jobs-max. Deferred to a separate plan post-UJM-Wave-4.
- **Shift / crew master** — modelled as Resource with `resource_type=CREW` + `parent_resource_id` once Resource strengthening lands.
- **Quality Hold workflow** — already served by `TaskStatus.HOLD` + outcome layer; no additional entity needed.
- **Approved Manufacturers List (AML)** — manufacturer-side of the alternate-supplier relationship. Subset of `job_template_input_alternate`; defer until Wave 2 lands.
- **Tooling / mould management** — modelled as `Resource` with `resource_type=TOOL`; tool-life-tracking awaits the strengthening plan.

---

## References

- Universal Job Model — `docs/wiki/articles/universal-job-model.md`
- Universal Job Model plan — `docs/plan/20260427-universal-job-model/plan.md`
- Vertical Q&A — `docs/plan/20260427-universal-job-model/verticals.md`
- Manufacturing Vertical plan — `docs/plan/20260517-manufacturing-vertical/plan.md`
- Operation proto domain — `packages/esqyma/proto/v1/domain/operation/`
- Manufacturing lyngua tier-3 — `packages/lyngua/translations/en/manufacturing/`
- Verticals matrix — `packages/esqyma/verticals/README.md`
- Per-domain scenarios — `packages/esqyma/verticals/manufacturing/scenarios/`
