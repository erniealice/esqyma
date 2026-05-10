# Retail Scenarios: Operations (Job Lifecycle)

In retail, Jobs arise when a transaction involves more than just handing goods across a counter — delivery, installation, custom fabrication, or warranty service all require tracked multi-step work that links back to the originating sale or subscription (extended warranty).

---

## Scenario 1: Furniture Purchase + Assembly Service

A customer buys a dining set (6 chairs + table) and adds a paid assembly service. The sale is captured in a `Revenue` + `RevenueLineItem` pair; the assembly work is tracked as a `Job` whose `origin_id` points to the `Subscription` created for the order bundle.

```
Subscription "DIN-SUB-00441"
  ├── client_id: "clt-marcos-reyes"
  ├── price_plan_id: FK → "Furniture + Assembly Bundle"
  ├── origin_type: ORIGIN_TYPE_ORDER
  └── origin_id: "ord-00441"
        │
        │  CreateJob (triggered on subscription activation)
        ▼
  ┌────────────────────────────────────────────────────────────┐
  │  Job "Dining Set Assembly — Marcos Reyes"                  │
  │    ├── id: "job-00441-asm"                                 │
  │    ├── client_id: "clt-marcos-reyes"                       │
  │    ├── origin_type: ORIGIN_TYPE_SUBSCRIPTION               │
  │    ├── origin_id: "DIN-SUB-00441"                          │
  │    ├── job_template_id: "tmpl-furniture-assembly-v2"       │
  │    ├── fulfillment_type: FULFILLMENT_TYPE_SERVICE          │
  │    ├── billing_rule_type: BILLING_RULE_TYPE_INCLUDED       │
  │    └── status: JOB_STATUS_PENDING                          │
  └────────────────────────────────────────────────────────────┘
        │
        ├── JobPhase 1: "Scheduling"  (phase_order: 1)
        │     └── JobTask "Confirm delivery window"
        │           ├── step_order: 1
        │           ├── assigned_to: "staff-dispatch"
        │           └── status: TASK_STATUS_COMPLETED
        │
        ├── JobPhase 2: "Delivery"  (phase_order: 2)
        │     ├── JobTask "Load truck at warehouse"
        │     │     └── JobActivity (entry_type: ENTRY_TYPE_LABOR)
        │     │           ├── ActivityLabor.staff_id: "staff-warehouse-02"
        │     │           └── ActivityLabor.hours: 0.5
        │     └── JobTask "Deliver to customer address"
        │           └── JobActivity (entry_type: ENTRY_TYPE_LABOR)
        │                 ├── ActivityLabor.staff_id: "staff-driver-07"
        │                 └── ActivityLabor.hours: 1.5
        │
        ├── JobPhase 3: "Assembly"  (phase_order: 3)
        │     ├── JobTask "Assemble table"
        │     │     ├── step_order: 1
        │     │     └── JobActivity (entry_type: ENTRY_TYPE_LABOR)
        │     │           ├── ActivityLabor.staff_id: "staff-tech-04"
        │     │           ├── ActivityLabor.hours: 1.0
        │     │           └── JobActivity.billable_status: BILLABLE_STATUS_INCLUDED
        │     ├── JobTask "Assemble 6 chairs"
        │     │     └── JobActivity (entry_type: ENTRY_TYPE_LABOR)
        │     │           └── ActivityLabor.hours: 1.5
        │     └── JobTask "Consume assembly hardware"
        │           └── JobActivity (entry_type: ENTRY_TYPE_MATERIAL)
        │                 ├── ActivityMaterial.product_id: "prod-hardware-kit-type-b"
        │                 ├── ActivityMaterial.unit_of_measure: "kit"
        │                 └── JobActivity.quantity: 1
        │
        ├── JobPhase 4: "Walkthrough"  (phase_order: 4)
        │     └── JobTask "Customer acceptance walkthrough"
        │           └── TaskOutcome (criteria_type: CRITERIA_TYPE_PASS_FAIL)
        │                 ├── pass_fail_value: true
        │                 ├── determination: DETERMINATION_PASS
        │                 └── recorded_by: "staff-tech-04"
        │
        └── JobOutcomeSummary
              ├── summary_type: SUMMARY_TYPE_DELIVERY_ACCEPTANCE
              ├── overall_determination: OVERALL_DETERMINATION_ACCEPTED
              └── pass_count: 1 / total_criteria_count: 1
```

**Step-by-step walk-through:**

1. Customer pays at POS. `Revenue` + `RevenueLineItem` rows created. A `Subscription` (bundle) is activated with `origin_id = "ord-00441"`.
2. System calls `CreateJob` using template `tmpl-furniture-assembly-v2`. Job status: `JOB_STATUS_PENDING`.
3. Scheduling phase: dispatch staff confirms a 2-hour delivery window for Saturday 09:00–11:00.
4. Job transitions to `JOB_STATUS_ACTIVE` when delivery crew departs warehouse. Phase 2 activates; Phase 1 moves to `PHASE_STATUS_COMPLETED`.
5. Each labor event is logged as a `JobActivity` (ENTRY_TYPE_LABOR) with a typed `ActivityLabor` sub-row. Hardware consumption is a separate `JobActivity` (ENTRY_TYPE_MATERIAL) via `ActivityMaterial.product_id`.
6. Assembly phase completes. Walkthrough: tech and customer do a physical check. `TaskOutcome.pass_fail_value = true`, `determination = DETERMINATION_PASS`.
7. `JobOutcomeSummary` is issued. Job transitions to `JOB_STATUS_COMPLETED`. Since `billing_rule_type = BILLING_RULE_TYPE_INCLUDED`, no additional `RevenueLineItem` is generated — cost is absorbed in the bundle price.

**End state:** 3 `JobActivity` rows (2 labor + 1 material), 1 `TaskOutcome`, 1 `JobOutcomeSummary`. Revenue report shows one bundled line. Labor cost report shows 3.5 crew-hours.

---

## Scenario 2: Custom Kitchen Cabinet Build

A customer commissions a full custom kitchen: upper cabinets, base cabinets, island, and countertop. This is a long-running `Job` (8–12 weeks) with material consumption from warehouse stock, daily labor entries by the shop crew, and a subcontracted countertop installer.

```
Subscription "KIT-SUB-00812"
  ├── client_id: "clt-santos-family"
  ├── price_plan_id: FK → "Custom Kitchen — Fixed Fee"
  ├── origin_type: ORIGIN_TYPE_ORDER
  └── origin_id: "ord-00812"
        │
        ▼
  ┌────────────────────────────────────────────────────────────┐
  │  Job "Custom Kitchen — Santos Residence"                   │
  │    ├── id: "job-00812-kit"                                 │
  │    ├── client_id: "clt-santos-family"                      │
  │    ├── origin_type: ORIGIN_TYPE_SUBSCRIPTION               │
  │    ├── origin_id: "KIT-SUB-00812"                          │
  │    ├── job_template_id: "tmpl-custom-kitchen-v4"           │
  │    ├── fulfillment_type: FULFILLMENT_TYPE_PROJECT          │
  │    ├── billing_rule_type: BILLING_RULE_TYPE_FIXED_FEE      │
  │    ├── planned_start: 2026-03-01                           │
  │    ├── planned_end: 2026-04-30                             │
  │    └── status: JOB_STATUS_RELEASED                         │
  └────────────────────────────────────────────────────────────┘
        │
        ├── JobPhase 1: "Design & Material Sourcing"  (phase_order: 1)
        │     ├── JobTask "Finalize design drawings"
        │     │     └── JobActivity (ENTRY_TYPE_LABOR)
        │     │           ├── ActivityLabor.staff_id: "staff-designer-01"
        │     │           └── ActivityLabor.hours: 12.0
        │     └── JobTask "Issue materials from warehouse"
        │           ├── JobActivity (ENTRY_TYPE_MATERIAL)
        │           │     ├── ActivityMaterial.product_id: "prod-oak-plywood-18mm"
        │           │     ├── ActivityMaterial.lot_number: "LOT-PLY-2026-003"
        │           │     ├── ActivityMaterial.unit_of_measure: "sheet"
        │           │     └── JobActivity.quantity: 40
        │           └── JobActivity (ENTRY_TYPE_MATERIAL)
        │                 ├── ActivityMaterial.product_id: "prod-cabinet-hinges-soft-close"
        │                 ├── ActivityMaterial.unit_of_measure: "pair"
        │                 └── JobActivity.quantity: 80
        │
        ├── JobPhase 2: "Fabrication"  (phase_order: 2)
        │     ├── JobTask "Cut and edge-band panels" (5 days)
        │     │     └── JobActivity (ENTRY_TYPE_LABOR) × daily entries
        │     │           ├── ActivityLabor.staff_id: "staff-carpenter-03"
        │     │           └── ActivityLabor.hours: 8.0  (per day × 5)
        │     └── JobTask "Assemble cabinet carcasses"
        │           └── JobActivity (ENTRY_TYPE_LABOR)
        │                 ├── ActivityLabor.staff_id: "staff-carpenter-03"
        │                 └── ActivityLabor.hours: 16.0
        │
        ├── JobPhase 3: "Site Installation"  (phase_order: 3)
        │     ├── JobTask "Install upper & base cabinets"
        │     │     └── JobActivity (ENTRY_TYPE_LABOR)
        │     │           └── ActivityLabor.hours: 14.0
        │     └── JobTask "Countertop installation (subcontract)"
        │           └── JobActivity (ENTRY_TYPE_EXPENSE)
        │                 ├── ActivityExpense.expense_category_id: "expcat-subcontract"
        │                 ├── ActivityExpense.vendor_ref: "VENDOR-STONE-CO"
        │                 ├── ActivityExpense.payment_method: "vendor_bill"
        │                 └── JobActivity.total_cost: 4500000  (centavos = PHP 45,000)
        │
        └── JobPhase 4: "Punch-list & Closeout"  (phase_order: 4)
              ├── JobTask "Client walkthrough — snag items"
              │     └── TaskOutcome (criteria_type: CRITERIA_TYPE_TEXT)
              │           ├── text_value: "2 doors need adjustment, handle alignment OK"
              │           └── determination: DETERMINATION_PASS_WITH_CONDITION
              └── JobTask "Final sign-off"
                    └── TaskOutcome (criteria_type: CRITERIA_TYPE_PASS_FAIL)
                          ├── pass_fail_value: true
                          └── determination: DETERMINATION_PASS
```

**Step-by-step walk-through:**

1. Contract signed. `Subscription` created, `Job` instantiated with `JOB_STATUS_RELEASED` (template revision snapshot frozen at revision 4).
2. Designer logs 12 hours across 3 days — each day is a separate `JobActivity` row with `ActivityLabor.staff_id = "staff-designer-01"`. `unit_cost` is resolved from the designer's `Resource → PriceProduct` rate.
3. Material issuance: plywood and hinges are pulled from warehouse stock. Each `ActivityMaterial` row carries `lot_number` for traceability.
4. Fabrication: carpenter's daily labor entries accumulate. `GetJobActivityRollup` can be called at any point to see total cost vs. the fixed-fee budget.
5. Countertop is subcontracted. A single `JobActivity` (ENTRY_TYPE_EXPENSE) with an `ActivityExpense` captures the vendor bill amount in centavos. `expense_category_id` links to the "Subcontract" expenditure category.
6. Snag walkthrough produces a `DETERMINATION_PASS_WITH_CONDITION` outcome (minor door adjustment noted). Crew fixes items; final `TaskOutcome` records `DETERMINATION_PASS`.
7. `JobOutcomeSummary` issued. Revenue: one fixed-fee `RevenueLineItem` was recognized at contract activation — no additional billing event required.

**End state:** Multiple `JobActivity` rows across labor, material, expense types. Two `TaskOutcome` rows at closeout. One `JobOutcomeSummary` with `overall_determination = OVERALL_DETERMINATION_CONDITIONALLY_ACCEPTED` → updated to `ACCEPTED` after punch-list resolved.

---

## Scenario 3: Warranty Repair Service (Subscription-Spawned)

A customer who purchased an extended warranty `Subscription` brings in a 2-year-old sofa for a structural repair. The warranty triggers a `Job` via `origin_type = ORIGIN_TYPE_WARRANTY`.

```
Subscription "WAR-SUB-00120"  (Extended Warranty — 3 year)
  ├── client_id: "clt-dela-cruz"
  ├── price_plan_id: FK → "Extended Warranty 3Y"
  ├── origin_type: ORIGIN_TYPE_WARRANTY
  └── active: true
        │
        │  Warranty claim filed → CreateJob
        ▼
  ┌────────────────────────────────────────────────────────────┐
  │  Job "Sofa Frame Repair — Dela Cruz"                       │
  │    ├── id: "job-war-00120-01"                              │
  │    ├── client_id: "clt-dela-cruz"                          │
  │    ├── origin_type: ORIGIN_TYPE_WARRANTY                   │
  │    ├── origin_id: "WAR-SUB-00120"                          │
  │    ├── fulfillment_type: FULFILLMENT_TYPE_SERVICE          │
  │    ├── billing_rule_type: BILLING_RULE_TYPE_INCLUDED       │
  │    └── status: JOB_STATUS_ACTIVE                           │
  └────────────────────────────────────────────────────────────┘
        │
        ├── JobPhase 1: "Intake & Diagnosis"  (phase_order: 1)
        │     └── JobTask "Inspect frame damage"
        │           ├── TaskOutcome (criteria_type: CRITERIA_TYPE_CATEGORICAL)
        │           │     ├── categorical_value: "structural_frame_break"
        │           │     └── determination: DETERMINATION_PASS  (covered under warranty)
        │           └── status: TASK_STATUS_COMPLETED
        │
        └── JobPhase 2: "Repair & Return"  (phase_order: 2)
              ├── JobTask "Replace broken frame member"
              │     ├── JobActivity (ENTRY_TYPE_LABOR)
              │     │     ├── ActivityLabor.staff_id: "staff-upholstery-02"
              │     │     └── ActivityLabor.hours: 2.5
              │     └── JobActivity (ENTRY_TYPE_MATERIAL)
              │           ├── ActivityMaterial.product_id: "prod-hardwood-frame-300mm"
              │           ├── ActivityMaterial.unit_of_measure: "piece"
              │           └── JobActivity.quantity: 1
              └── JobTask "Quality check & return to client"
                    └── TaskOutcome (criteria_type: CRITERIA_TYPE_PASS_FAIL)
                          ├── pass_fail_value: true
                          └── determination: DETERMINATION_PASS
```

**Step-by-step walk-through:**

1. Customer calls service desk, references warranty. Staff looks up `WAR-SUB-00120`, confirms it is `active = true` and within the 3-year window.
2. `CreateJob` call sets `origin_type = ORIGIN_TYPE_WARRANTY`, `origin_id = "WAR-SUB-00120"`. `billing_rule_type = BILLING_RULE_TYPE_INCLUDED` — no charge to client; cost absorbed by the warranty pool.
3. Intake phase: tech records damage category via `TaskOutcome` (categorical type). `determination = DETERMINATION_PASS` means the damage qualifies for coverage.
4. Repair phase: 2.5 labor hours + one hardwood frame piece. Both are `JobActivity` rows tracked for internal cost reporting (warranty cost pool).
5. Quality check passes. Job moves to `JOB_STATUS_COMPLETED`. No new invoice or revenue line generated.

**End state:** 2 `JobActivity` rows, 2 `TaskOutcome` rows, job linked to warranty subscription. Warranty cost report can aggregate all jobs under `origin_id = "WAR-SUB-00120"` for actuarial review.

---

## What's NOT a Job

Not every retail transaction needs the Operations chain:

- **Pure buy-and-go transactions**: Customer picks product off the shelf and checks out. `Revenue + RevenueLineItem` is sufficient. No `Job`, `JobPhase`, or `JobActivity` needed.
- **Standard ship-from-warehouse orders**: If fulfillment is handled by a third-party logistics provider with no tracked in-house labor, a `fulfillment` entity is enough.
- **Returns and exchanges without service work**: Handled via a credit `Revenue` row (negative `RevenueLineItem`). No job unless the returned item requires inspection or repair.
- **Consumable add-ons at POS** (gift wrap, assembly fee charged flat): If the add-on has no multi-step tracking requirement, it remains a `RevenueLineItem` with no job counterpart.
