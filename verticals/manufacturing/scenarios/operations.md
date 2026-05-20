# Manufacturing Scenarios: Operations (Production Order Lifecycle)

This file shows the manufacturing rendering of the Operation domain. **All field names below are universal** — they are the actual proto fields. Manufacturing terminology (BOM, Routing, MO, WIP) appears only in display labels rendered from `packages/lyngua/translations/en/manufacturing/`.

> **Wave alignment.** Wave 1 of the Universal Job Model is complete locally (status enums, JobTemplate versioning, Job output-target fields). The scenarios below show how Waves 2–4 (`job_template_input`, `lot`, `job_input_plan`, `task_interruption`, `job_output`, `job_cost_ledger_entry`, `job_cost_snapshot`, `job_plan_deviation`) compose into the full manufacturing flow. Until Waves 2–4 ship, scenarios marked **(W2)**, **(W3)**, **(W4)** are forward-looking.

> ⚠ **Legacy enum names cited.** A few enum values cited in these scenarios (`COST_FLOW_TYPE_WIP`, `SETTLEMENT_TARGET_TYPE_WIP_ACCOUNT`) carry pre-existing manufacturing-jargon names from before UJM's C1 constraint landed. Per UJM C1's transition clause, existing legacy is grandfathered. A future cleanup pass will rename these to neutral values (likely `COST_FLOW_TYPE_IN_PROGRESS_ASSET` / `SETTLEMENT_TARGET_TYPE_IN_PROGRESS_COST_ACCOUNT`); the scenarios will update when that rename ships. See [decisions.md Q7](../../../../docs/plan/20260517-manufacturing-vertical/decisions.md) (forward-flag).

---

## Scenario 1: Make-to-Stock Production Order (MTS)

A drill-motor plant runs a recurring MTS production cycle on its DM-2200 line based on the rolling forecast. The MRP planner reviews demand on Monday morning, commits 100 units to the schedule, releases to the floor on Tuesday, runs the line Wed–Fri, and closes the MO on Monday after final QC.

```
JobTemplate "BOM-DM2200-rev5"  (PUBLISHED, effective 2026-04-01)
  ├── template_code: "BOM-DM2200"
  ├── revision: 5
  ├── version_status: VERSION_STATUS_PUBLISHED
  ├── output_product_id: FK → "Drill Motor DM-2200"
  ├── default_lot_size: 100
  ├── default_uom: "unit"
  ├── default_fulfillment_type: FULFILLMENT_TYPE_PRODUCTION
  ├── default_cost_flow_type: COST_FLOW_TYPE_WIP
  └── default_billing_rule_type: BILLING_RULE_TYPE_NON_BILLABLE  (MTS — no specific customer)
        │
        ├── JobTemplatePhase 1 "Stator Sub-Assembly"
        │     resource_id → "Assembly Cell A"
        │     setup_minutes: 15  run_minutes_per_unit: 2.4
        │
        ├── JobTemplatePhase 2 "Rotor Assembly"
        │     resource_id → "Assembly Cell B"
        │     predecessor_template_phase_id → Phase 1
        │
        └── JobTemplatePhase 3 "Final Assembly + Test"
              resource_id → "Test Bench 1"
              ├── JobTemplateTask 3.1 "Press rotor onto shaft"
              │     standard_machine_minutes: 1.0
              └── JobTemplateTask 3.2 "Functional test"
                    template_task_criteria → OutcomeCriteria "Motor No-Load Current"
                    standard_machine_minutes: 0.5

JobTemplateInput  (W2 — one row per expected input on the BOM-and-Routing)
  ├── input_kind=MATERIAL, product=Stator-Core SC-104,        quantity=1,    uom=piece
  ├── input_kind=MATERIAL, product=Copper-Wire-0.5mm,         quantity=0.45, uom=kg
  ├── input_kind=MATERIAL, product=Bearing-6004ZZ,            quantity=2,    uom=piece
  ├── input_kind=LABOR,    resource=Assembly Cell A operator, quantity=0.05, uom=hour
  ├── input_kind=EQUIPMENT,resource=Assembly Cell A,          quantity=0.04, uom=hour
  └── input_kind=SUBCONTRACT, product="Heat-treat service",   quantity=1,    uom=lot
```

### Monday — MRP plans the order

```
Job "MO-DM2200-20260512-001"  (created from forecast)
  ├── id: "job-mo-20260512-001"
  ├── name: "Drill Motor DM-2200 — 100 units"
  ├── job_template_id: FK → BOM-DM2200-rev5
  ├── job_template_revision_snapshot: 5
  ├── output_product_id: FK → Drill Motor DM-2200
  ├── output_product_variant_id: FK → DM-2200-CORDED-220V
  ├── planned_quantity: 100
  ├── output_uom: "unit"
  ├── demand_type: DEMAND_TYPE_MTS
  ├── fulfillment_type: FULFILLMENT_TYPE_PRODUCTION
  ├── cost_flow_type: COST_FLOW_TYPE_WIP
  ├── billing_rule_type: BILLING_RULE_TYPE_NON_BILLABLE
  ├── status: JOB_STATUS_DRAFT       ← MRP suggestion
  ├── due_date: 2026-05-25
  ├── priority: 5
  └── client_id: NULL                ← MTS — no specific buyer
```

### Monday afternoon — planner commits

```
Job.status: JOB_STATUS_DRAFT → JOB_STATUS_PENDING
```

### Tuesday — scheduler books work centres

```
Job.status: JOB_STATUS_PENDING → JOB_STATUS_PLANNED
Job.planned_start: 2026-05-13 08:00
Job.planned_end:   2026-05-16 17:00
JobPhase rows created (one per JobTemplatePhase, copying resource_id + timing)
```

### Tuesday afternoon — release to floor

```
Job.status: JOB_STATUS_PLANNED → JOB_STATUS_RELEASED
Job.release_date: 2026-05-12

JobInputPlan rows materialised (W3) — one per JobTemplateInput, with frozen
expected quantities. The Job is now immune to later BOM revisions.
  ├── job_input_plan: input_kind=MATERIAL, product=Stator-Core SC-104, expected_qty=100
  ├── job_input_plan: input_kind=MATERIAL, product=Copper-Wire-0.5mm, expected_qty=45 kg
  └── … (one row per BOM line × planned_quantity)

Lots reserved (W2) for the planned consumption:
  ├── Stator-Core SC-104  → Lot L-SC-2026-05-01  (95 reserved, FIFO consumption)
  └── Copper-Wire-0.5mm   → Lot L-CW-2026-04-12  (60 kg available)
```

### Wednesday morning — first material issue → ACTIVE

```
Job.status: JOB_STATUS_RELEASED → JOB_STATUS_ACTIVE  (auto-flipped on first activity)
Job.actual_start: 2026-05-13 08:32

JobActivity (entry_type=MATERIAL, quantity=100, unit_cost=18000, total_cost=1800000)
  ├── job_phase_id → Phase 1 (Stator Sub-Assembly)
  ├── entry_date: 2026-05-13 08:32
  ├── ActivityMaterial: product=Stator-Core SC-104, lot=L-SC-2026-05-01, uom=piece
  └── InventoryMovement: movement_type=ISSUE, from=raw_warehouse, to=line_1, qty=100

JobActivity (entry_type=LABOR, quantity=5.5, unit_cost=80000)
  ├── job_phase_id → Phase 1
  └── ActivityLabor: staff=op-007, rate_type=STANDARD, hours=5.5
```

### Wednesday — interruption tracked (W3)

```
TaskInterruption  (W3)
  ├── job_task_id → JobTask "Wind coils" (Phase 1)
  ├── started_at: 2026-05-13 14:20
  ├── ended_at:   2026-05-13 15:05
  ├── reason: INTERRUPTION_REASON_MACHINE_BREAKDOWN
  └── notes: "Winding head misalignment, repaired in-line"

JobTask.status: TASK_STATUS_IN_PROGRESS → TASK_STATUS_HOLD → TASK_STATUS_IN_PROGRESS
```

### Friday — Final Assembly + Test phase produces outputs (W4)

```
For each of 100 units, a TaskOutcome captures the functional-test result:
  TaskOutcome × 100 against OutcomeCriteria "Motor No-Load Current"
    ├── numeric_value: 0.42 A, determination: DETERMINATION_PASS         × 95
    ├── numeric_value: 0.71 A, determination: DETERMINATION_FAIL         × 3   (scrap)
    └── numeric_value: 0.18 A, determination: DETERMINATION_FAIL         × 2   (rework)

JobOutput rows (W4) posted by the floor lead at end-of-shift:

  JobOutput #1: output_kind=OUTPUT_KIND_INVENTORY_RECEIPT
    ├── product_id → Drill Motor DM-2200
    ├── completed_quantity: 95
    ├── scrap_quantity: 3
    ├── rework_quantity: 2
    ├── lot_id → Lot L-FG-MO-001  (new FG lot)
    ├── inventory_movement_id → COMPLETION line_1 → fg_warehouse, qty 95
    ├── (companion movement) SCRAP line_1 → disposition_bin, qty 3
    └── unit_cost: stamped at settlement, not here

  JobOutput #2: output_kind=OUTPUT_KIND_DELIVERABLE
    ├── deliverable_url: "blob://qc-reports/MO-DM2200-20260512-001-CoC.pdf"
    └── (auto-generated from job_outcome_summary)

The 2 rework units spawn a child Job:
  Job "MO-DM2200-20260512-001-REWORK"
    ├── parent_job_id → MO-DM2200-20260512-001
    ├── planned_quantity: 2
    ├── status: JOB_STATUS_ACTIVE  (skips DRAFT/PENDING; spawned directly)
    ├── job_template_id: FK → "REWORK-DM2200-rev2"  (rework SOP)
    └── (when child completes, its JobOutput row credits the parent's
         completed_quantity by 2)
```

### Friday end-of-shift — JobOutcomeSummary

```
JobOutcomeSummary  (Certificate of Conformance)
  ├── job_id → MO-DM2200-20260512-001
  ├── summary_type: SUMMARY_TYPE_QC_CERTIFICATE
  ├── overall_determination: OVERALL_DETERMINATION_ACCEPTED
  ├── scoring_method: SCORING_METHOD_PERCENTAGE_PASS
  ├── total_criteria_count: 100
  ├── pass_count: 95
  ├── fail_count: 5
  ├── issued_by: "staff-qc-04"
  └── attachment_ids: [signed-CoC.pdf]
```

### Monday following — settlement closes the order

```
JobActivity rows POSTED (status: UNPOSTED → POSTED)
  → Each post writes a job_cost_ledger_entry (W4) — append-only WIP log

JobOutput rows trigger cost relief:
  JobSettlement
    ├── job_activity_id (most recent or aggregated)
    ├── target_type: SETTLEMENT_TARGET_TYPE_INVENTORY_ASSET
    ├── target_id: fg-DM-2200
    └── allocated_amount: 95 × unit_cost (centavos)

  JobSettlement (variance)
    ├── target_type: SETTLEMENT_TARGET_TYPE_WIP_ACCOUNT
    └── allocated_amount: variance vs. (Product.expected_cost × 95)

  JobPlanDeviation (W4) row written for the over-issue of copper wire:
    ├── deviation_kind: DEVIATION_KIND_QUANTITY
    ├── job_input_plan_id → expected 45 kg copper
    ├── expected_value: 45.0
    ├── actual_value: 48.2
    └── note: "Higher-than-typical bobbin loss on coil winder 2"

Job.status: JOB_STATUS_ACTIVE → JOB_STATUS_COMPLETED → JOB_STATUS_CLOSED
```

---

## Scenario 2: Make-to-Order Production Order (MTO) tied to a Customer Supply Agreement

The plant has an annual blanket Customer Supply Agreement with Chevy for 12,000 DM-2200 units. Each monthly release becomes a Production Order MTO Job whose `client_id` and `sales_order_line_id` are populated.

```
Subscription "OEM-CHEVY-2026"  (Customer Supply Agreement)
  ├── client_id: "clt-oem-chevy"
  ├── price_plan_id: FK → "DM-2200 OEM Price Plan 2026"
  ├── origin_type: ORIGIN_TYPE_SUBSCRIPTION
  ├── quantity: 12000  (annual minimum)
  ├── assigned_count: 5400  (shipped year-to-date)
  └── metadata: {"po_number": "CHEVY-PO-2026-014",
                 "incoterms": "FOB Plant",
                 "release_cadence": "monthly"}
        │
        │  Monthly release scheduler fires on 2026-05-01
        ▼
  Job "MO-DM2200-20260512-002"
    ├── name: "Drill Motor DM-2200 — Chevy May release"
    ├── origin_type: ORIGIN_TYPE_SUBSCRIPTION
    ├── origin_id: "OEM-CHEVY-2026"
    ├── client_id: "clt-oem-chevy"
    ├── sales_order_line_id: "so-line-2026-05-chevy"
    ├── output_product_id: FK → Drill Motor DM-2200
    ├── output_product_variant_id: FK → DM-2200-CORDED-220V  (Chevy-specific config)
    ├── planned_quantity: 1000
    ├── demand_type: DEMAND_TYPE_MTO
    ├── fulfillment_type: FULFILLMENT_TYPE_PRODUCTION
    ├── cost_flow_type: COST_FLOW_TYPE_WIP
    ├── billing_rule_type: BILLING_RULE_TYPE_FIXED_FEE
    ├── status: JOB_STATUS_PENDING  (auto-released by scheduler at planned_start − 5d)
    ├── due_date: 2026-05-30  (Chevy delivery window)
    └── priority: 8  (OEM customer — higher than MTS)
```

The rest of the lifecycle is the same as Scenario 1, except:
- Settlement posts `cost_flow_type=WIP` to the WIP ledger AND drives the shipment revenue recognition pipeline (existing centymo revenue path).
- The shipment event (`inventory_movement` of `movement_type=SELL`) creates the `revenue` row referencing this Job via `revenue_line_item.job_id` link.

---

## Scenario 3: Multi-Level BOM — sub-assembly child Job

The Stator Sub-Assembly is itself a `Product` with `default_template_id` pointing to its own BOM. When the parent MO is released, MRP detects insufficient on-hand stator stock and auto-spawns a child Job.

```
Parent Job: MO-DM2200-20260512-001 (planned_quantity=100)
            └── JobTemplateInput: 100 × Stator-Core SC-104

MRP run sees on-hand Stator stock = 12 (< 100 needed)
  → spawns child Job:

Child Job: MO-STATOR-20260512-099
  ├── parent_job_id → MO-DM2200-20260512-001
  ├── output_product_id → Stator-Core SC-104  (sub-assembly is a Product too)
  ├── job_template_id → "MOTOR-STATOR-MR3"  (the stator's own BOM-and-Routing)
  ├── planned_quantity: 88  (the deficit)
  ├── demand_type: DEMAND_TYPE_INTERNAL  (not a customer order)
  ├── due_date: 2026-05-12  (must complete BEFORE parent's start)
  └── status: JOB_STATUS_PLANNED

  predecessor_job_ids on parent Job is updated to include child:
  Parent Job.predecessor_job_ids: ["MO-STATOR-20260512-099"]

When child completes, its JobOutput row of kind INVENTORY_RECEIPT credits the
stator inventory; parent Job's first MATERIAL issue then draws from that lot.
```

---

## Scenario 4: Backflush — material auto-consumed at completion (W2 + W4)

For a fast-moving repetitive product, the BOM-and-Routing carries `backflush_policy=BACKFLUSH_ON_OUTPUT`. The shop floor does not log per-step `JobActivity(MATERIAL)` rows; instead, when a `JobOutput` of kind `INVENTORY_RECEIPT` is posted, the system retrospectively emits `JobActivity` + `InventoryMovement(ISSUE)` rows for every `JobInputPlan` row, in lot-FIFO order.

```
JobTemplate "BOM-WIDGET-A-rev2"
  └── backflush_policy: BACKFLUSH_POLICY_ON_OUTPUT  (W2 enum)

Job runs WITHOUT per-step material activities.

At end-of-shift, floor lead posts:
  JobOutput  output_kind=INVENTORY_RECEIPT, completed_quantity=500

System backflush hook (W4 posting trigger):
  → For each JobInputPlan row (input_kind=MATERIAL):
       emit JobActivity(MATERIAL, qty = expected × output_qty)
       emit InventoryMovement(ISSUE)
       consume the reserved lot

  All emitted rows carry an audit tag `{is_auto_issued: true}` so reconciliation
  reports can distinguish auto-issued (backflushed) vs hand-issued materials.
  ("backflush" is the manufacturing display label; the audit-tag identifier
  is neutral per C1.)
```

If a backflushed material is found to be wrong after the fact (e.g., a lot recall), the operator issues a reversing `JobActivity` via `ReverseActivity` RPC, which writes a negating `InventoryMovement` and a corrective `JobPlanDeviation`.

---

## Scenario 5: Engineering Change Order ramps a new BOM revision

Plant Quality discovers a defective bearing batch and approves a switch to Brand B. A change request is logged (string `change_request_id` until the entity ships) and the BOM revision is bumped.

```
1. Planner CLONES BOM-DM2200-rev5 → BOM-DM2200-rev6 (DRAFT)
   CloneJobTemplate RPC (W2):
     ├── source_template_id: BOM-DM2200-rev5
     ├── new template: revision=6, version_status=DRAFT,
     │   supersedes_template_id=rev5.id, change_request_id="CR-2026-05-09"
     └── All JobTemplatePhase / JobTemplateTask / JobTemplateInput rows
         copied into the new template as DRAFT children

2. Planner edits the JobTemplateInput row for Bearing-6004ZZ:
   - product_id: Bearing-6004ZZ-BrandB
   - quality_manager confirms via JobTemplateInputAlternate set update

3. Plant Manager publishes:
   PublishJobTemplate RPC:
     ├── BOM-DM2200-rev6: version_status=DRAFT → PUBLISHED
     ├── effective_from: 2026-05-15
     ├── published_by: "staff-plant-mgr-01"
     └── BOM-DM2200-rev5: version_status=PUBLISHED → DEPRECATED, effective_to=2026-05-14

4. In-flight Jobs (status RELEASED/ACTIVE) against rev5 are IMMUNE — they carry
   job_template_revision_snapshot=5 and a frozen job_input_plan. They continue
   to consume from the rev5 BOM.

5. New Jobs created from 2026-05-15 onward auto-bind to rev6.
```

---

## Scenario 6: Rework loop with TaskStatus.REWORK

During functional test, 2 of 100 units fail the no-load-current spec but are repairable. The QC inspector flags the offending JobTasks for rework.

```
JobTask "Functional test — unit 47"
  TaskOutcome: numeric_value=0.18 A, determination=DETERMINATION_FAIL

QC inspector triggers SetTaskStatus(task_id, TASK_STATUS_REWORK)  (W1 enum)

The view layer:
  → spawns child Job "MO-DM2200-20260512-001-REWORK-047"
    ├── parent_job_id → MO-DM2200-20260512-001
    ├── job_template_id → "REWORK-DM2200-COIL-RESEAT-rev1"  (rework SOP)
    ├── planned_quantity: 1
    ├── status: JOB_STATUS_ACTIVE
    └── (the failed unit's serial is carried via attachment metadata)

When the rework child completes:
  JobOutput  output_kind=INVENTORY_RECEIPT, completed_quantity=1
  → credits the parent Job's effective good-output count
  → the rework cost (parts + labour on the child Job) settles to the parent's
    cost ledger as a deviation
```

---

## Scenario 7: By-product capture

A stamping operation produces a finished bracket plus reusable steel-drop scrap. The bracket goes to FG; the drops go to a separate by-product inventory item.

```
Job "MO-BRACKET-20260512-007" (planned_quantity=2000)

At end-of-shift, the operator posts TWO JobOutput rows:

  JobOutput #1: output_kind=INVENTORY_RECEIPT
    ├── product_id → Steel Bracket B-104
    ├── completed_quantity: 2000
    └── inventory_movement: COMPLETION line_press → fg_warehouse

  JobOutput #2: output_kind=INVENTORY_RECEIPT
    ├── product_id → Steel Sheet Drop Cuts  (a different Product, kind=by-product)
    ├── completed_quantity: 87  (kg of usable drops)
    └── inventory_movement: COMPLETION line_press → byproduct_warehouse

JobSettlement allocates the Job's total cost across both outputs by the
operator-set allocation_pct (or default 100%/0% if drops are valued at zero).
```

---

## Status diagram summary

```
JOB_STATUS_DRAFT ──┐  (MRP suggestion)
                   ▼
JOB_STATUS_PENDING ──┐ (commit; in backlog)
                     ▼
JOB_STATUS_PLANNED ──┐  (scheduled; dates + resource fixed)
                     ▼
JOB_STATUS_RELEASED ──┐  (on the floor; job_input_plan frozen)
                      ▼
JOB_STATUS_ACTIVE ──┬─→ JOB_STATUS_PAUSED ──→ JOB_STATUS_ACTIVE
                    │       ↑   (task_interruption rows carry reason)
                    ▼
JOB_STATUS_COMPLETED  (all required outputs posted)
                    │
                    ▼
JOB_STATUS_CLOSED  (settlement done; WIP relieved; variances locked)
```

Rollback transitions are gated by `validTransitions` at `espyna/usecases/operation/job/usecases.go`. Wave 1 added DRAFT→PLANNED, PENDING→PLANNED, PLANNED→DRAFT, PLANNED→PENDING, PLANNED→RELEASED, RELEASED→PLANNED, RELEASED→ACTIVE, RELEASED→PAUSED.
