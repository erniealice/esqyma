# Laundry Services Scenarios: Operations (Job Lifecycle)

In laundry services, each pickup-and-return cycle is a Job spawned from a recurring Subscription. Phases map to the physical workflow stages (pickup → sort → wash → press → delivery); `InventorySerial` serial numbers track individual garments or linen bundles tagged with RFID, and `TaskOutcome` records stain-removal or quality verification results.

---

## Scenario 1: Hotel Daily Linen Run

A hotel has a standing contract for daily linen service. The `Subscription` is the hotel contract; each day a new Job is spawned. RFID-tagged linen sets are tracked via `InventorySerial.serial_number` linked through `JobActivity` to individual pickup/delivery events.

```
Subscription "HOTEL-SUB-00041"  (Hotel Grandview — Daily Linen)
  ├── client_id: "clt-hotel-grandview"
  ├── price_plan_id: FK → "Hotel Linen Service — Daily Cycle"
  ├── origin_type: ORIGIN_TYPE_SUBSCRIPTION
  └── active: true
        │
        │  MaterializeCycleJobs fires each morning
        ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Job "Hotel Grandview — Linen Run — 2026-05-10"            │
  │    ├── id: "job-hotel-gv-20260510"                          │
  │    ├── client_id: "clt-hotel-grandview"                     │
  │    ├── origin_type: ORIGIN_TYPE_SUBSCRIPTION                │
  │    ├── origin_id: "HOTEL-SUB-00041"                         │
  │    ├── cycle_index: 141  (day 141 of contract)              │
  │    ├── cycle_period_start: "2026-05-10"                     │
  │    ├── cycle_period_end: "2026-05-11"                       │
  │    ├── fulfillment_type: FULFILLMENT_TYPE_SERVICE           │
  │    ├── billing_rule_type: BILLING_RULE_TYPE_INCLUDED        │
  │    └── status: JOB_STATUS_ACTIVE                            │
  └─────────────────────────────────────────────────────────────┘
        │
        ├── JobPhase 1: "Pickup"  (phase_order: 1)
        │     └── JobTask "Collect linen from hotel — 07:00"
        │           ├── JobActivity (ENTRY_TYPE_LABOR)
        │           │     ├── ActivityLabor.staff_id: "staff-driver-02"
        │           │     └── ActivityLabor.hours: 0.75
        │           └── JobActivity (ENTRY_TYPE_MATERIAL) × per RFID bundle
        │                 ├── ActivityMaterial.product_id: "prod-hotel-linen-set"
        │                 ├── ActivityMaterial.unit_of_measure: "bundle"
        │                 └── JobActivity.description: "RFID: SN-RFID-GV-0041"
        │                       (InventorySerial.serial_number = "SN-RFID-GV-0041")
        │
        ├── JobPhase 2: "Sort"  (phase_order: 2)
        │     └── JobTask "Sort by item type and stain flag"
        │           ├── JobActivity (ENTRY_TYPE_LABOR)
        │           │     ├── ActivityLabor.staff_id: "staff-sorter-05"
        │           │     └── ActivityLabor.hours: 0.5
        │           └── TaskOutcome (CRITERIA_TYPE_NUMERIC_SCORE)
        │                 ├── numeric_value: 142.0  (total pieces sorted)
        │                 └── determination: DETERMINATION_PASS
        │
        ├── JobPhase 3: "Pre-treat"  (phase_order: 3)
        │     └── JobTask "Spot-treat stained items"
        │           └── JobActivity (ENTRY_TYPE_MATERIAL)
        │                 ├── ActivityMaterial.product_id: "prod-enzyme-pretreat-spray"
        │                 ├── ActivityMaterial.unit_of_measure: "ml"
        │                 └── JobActivity.quantity: 120
        │
        ├── JobPhase 4: "Wash"  (phase_order: 4)
        │     └── JobTask "Commercial wash — 60°C cycle"
        │           └── JobActivity (ENTRY_TYPE_LABOR)
        │                 ├── ActivityLabor.staff_id: "staff-laundry-op-03"
        │                 └── ActivityLabor.hours: 1.0
        │
        ├── JobPhase 5: "Press"  (phase_order: 5)
        │     └── JobTask "Press and fold — hotel standard"
        │           └── JobActivity (ENTRY_TYPE_LABOR)
        │                 ├── ActivityLabor.staff_id: "staff-presser-08"
        │                 └── ActivityLabor.hours: 2.0
        │
        ├── JobPhase 6: "Quality Check"  (phase_order: 6)
        │     └── JobTask "Final quality inspection"
        │           └── TaskOutcome (CRITERIA_TYPE_PASS_FAIL)
        │                 ├── pass_fail_value: true
        │                 └── determination: DETERMINATION_PASS
        │
        └── JobPhase 7: "Delivery"  (phase_order: 7)
              └── JobTask "Return clean linen to hotel — 16:00"
                    ├── JobActivity (ENTRY_TYPE_LABOR)
                    │     ├── ActivityLabor.staff_id: "staff-driver-02"
        │           └── ActivityLabor.hours: 0.75
                    └── TaskOutcome (CRITERIA_TYPE_PASS_FAIL)
                          ├── pass_fail_value: true   (hotel rep signed off)
                          └── determination: DETERMINATION_PASS
```

**Step-by-step walk-through:**

1. 06:00: `MaterializeCycleJobs` creates the day's Job. `cycle_index = 141` (this is the 142nd operational day). `cycle_period_start = "2026-05-10"`.
2. 07:00 pickup: driver collects 142 linen bundles. Each bundle's RFID tag is scanned; `JobActivity` rows are created (ENTRY_TYPE_MATERIAL), with `description` carrying the RFID serial number cross-referenced to `InventorySerial.serial_number`. This enables per-serial-number audit: "when was RFID GV-0041 last cleaned?"
3. Sorting phase: sorter records a numeric outcome (142 pieces sorted). Any flagged stains automatically gate the pre-treat phase.
4. Pre-treat, wash, press phases execute with labor and material activities logged.
5. Quality check: presser or QC staff records pass/fail outcome. If any item fails, `TASK_STATUS_HOLD` is set and that item is held for re-processing.
6. 16:00 delivery: driver returns clean linen. Hotel rep signs off; `TaskOutcome` recorded. Job transitions to `JOB_STATUS_COMPLETED`.
7. End-of-month billing: all cycle Jobs for the month are swept. `Revenue` and `RevenueLineItem` rows are generated from the subscription's monthly billing run.

**End state:** 7 phases, multiple `JobActivity` rows per phase, 3 `TaskOutcome` rows (sort count, quality check, delivery sign-off). RFID serial tracking preserved via `ActivityMaterial` + `InventorySerial` cross-reference.

---

## Scenario 2: Residential Weekly Bag Pickup

A household subscribes to weekly laundry pickup (one bag per week). Simpler phase structure than the hotel run; recurring Subscription spawns a Job each Monday.

```
Subscription "RES-SUB-02291"  (Dela Cruz Family — Weekly Bag)
  ├── client_id: "clt-delacruz-family"
  ├── price_plan_id: FK → "Residential Weekly — 5 kg Bag"
  └── active: true
        │
        ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Job "Dela Cruz — Weekly Laundry — Cycle 47"               │
  │    ├── id: "job-res-dc-c47"                                 │
  │    ├── client_id: "clt-delacruz-family"                     │
  │    ├── origin_id: "RES-SUB-02291"                           │
  │    ├── cycle_index: 46  (0-based → display as "Cycle 47")   │
  │    ├── cycle_period_start: "2026-05-11"                     │
  │    └── fulfillment_type: FULFILLMENT_TYPE_SERVICE           │
  └─────────────────────────────────────────────────────────────┘
        │
        ├── JobPhase 1: "Pickup"  (phase_order: 1)
        │     └── JobTask "Collect bag at customer address"
        │           └── JobActivity (ENTRY_TYPE_LABOR)
        │                 ├── ActivityLabor.staff_id: "staff-rider-11"
        │                 └── ActivityLabor.hours: 0.25
        │
        ├── JobPhase 2: "Wash & Dry"  (phase_order: 2)
        │     ├── JobTask "Wash 5 kg load"
        │     │     └── JobActivity (ENTRY_TYPE_LABOR)
        │     │           └── ActivityLabor.hours: 0.25
        │     └── JobTask "Tumble dry"
        │           └── (no labor entry — automated machine, no staff time)
        │
        ├── JobPhase 3: "Fold & Pack"  (phase_order: 3)
        │     └── JobTask "Fold and pack in delivery bag"
        │           └── JobActivity (ENTRY_TYPE_LABOR)
        │                 └── ActivityLabor.hours: 0.25
        │
        └── JobPhase 4: "Delivery"  (phase_order: 4)
              └── JobTask "Return to customer address"
                    ├── JobActivity (ENTRY_TYPE_LABOR)
                    │     └── ActivityLabor.hours: 0.25
                    └── TaskOutcome (CRITERIA_TYPE_PASS_FAIL)
                          ├── pass_fail_value: true
                          └── determination: DETERMINATION_PASS
```

**Step-by-step walk-through:**

1. Monday 08:00: cycle Job created. Rider picks up the bag (0.25 hours).
2. Wash and dry: logged labor is minimal (load-and-start). Dry cycle is automated; no staff time logged for the machine run — only the setup task.
3. Fold and pack: staff folds and prepacks for delivery.
4. Delivery: rider returns clean bag. `TaskOutcome` records delivery confirmation.
5. Job completes. Weekly `Revenue` cycle recognizes the flat weekly fee.

**End state:** 4 phases, 4 `JobActivity` rows, 1 `TaskOutcome`. Simple cycle; no material tracking (detergent treated as overhead, not per-job consumed).

---

## Scenario 3: Stained Item Escalation — Child Job for Special Handling

During sorting on a hotel run, a duvet cover with a heavy oil stain is flagged. Standard wash cannot remove it. A child Job is spawned for special treatment, linked to the parent run Job via `parent_job_id`.

```
Parent Job (from Scenario 1):
  Job "Hotel Grandview — Linen Run — 2026-05-10"
  id: "job-hotel-gv-20260510"
        │
        │  Sort phase: item flagged → CreateJob (child)
        ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Child Job "Stain Escalation — Duvet Cover SN-RFID-GV-0098"│
  │    ├── id: "job-stain-rfid-0098"                            │
  │    ├── client_id: "clt-hotel-grandview"                     │
  │    ├── parent_job_id: "job-hotel-gv-20260510"               │
  │    ├── origin_type: ORIGIN_TYPE_AD_HOC                      │
  │    ├── fulfillment_type: FULFILLMENT_TYPE_SERVICE           │
  │    ├── billing_rule_type: BILLING_RULE_TYPE_T_AND_M         │
  │    └── status: JOB_STATUS_ACTIVE                            │
  └─────────────────────────────────────────────────────────────┘
        │
        ├── JobPhase 1: "Stain Identification"  (phase_order: 1)
        │     └── JobTask "Identify stain type"
        │           └── TaskOutcome (CRITERIA_TYPE_CATEGORICAL)
        │                 ├── categorical_value: "heavy_oil_grease"
        │                 └── determination: DETERMINATION_PASS_WITH_CONDITION
        │                       (treatable but needs specialist handling)
        │
        ├── JobPhase 2: "Spot Test"  (phase_order: 2)
        │     └── JobTask "Test solvent on hem sample"
        │           └── TaskOutcome (CRITERIA_TYPE_PASS_FAIL)
        │                 ├── pass_fail_value: true   (no fabric damage)
        │                 └── determination: DETERMINATION_PASS
        │
        ├── JobPhase 3: "Chemical Strip"  (phase_order: 3)
        │     ├── JobTask "Apply degreaser and agitate"
        │     │     ├── JobActivity (ENTRY_TYPE_LABOR)
        │     │     │     ├── ActivityLabor.staff_id: "staff-specialist-12"
        │     │     │     └── ActivityLabor.hours: 0.5
        │     │     └── JobActivity (ENTRY_TYPE_MATERIAL)
        │     │           ├── ActivityMaterial.product_id: "prod-heavy-duty-degreaser"
        │     │           ├── ActivityMaterial.unit_of_measure: "ml"
        │     │           └── JobActivity.quantity: 80
        │     └── TaskOutcome (CRITERIA_TYPE_PASS_FAIL)
        │           ├── pass_fail_value: true   (stain 95% removed)
        │           └── determination: DETERMINATION_PASS
        │
        └── JobPhase 4: "Re-wash & Quality Verify"  (phase_order: 4)
              ├── JobTask "Re-wash and press"
              │     └── JobActivity (ENTRY_TYPE_LABOR)
              │           └── ActivityLabor.hours: 0.25
              └── JobTask "Final stain removal check"
                    └── TaskOutcome (CRITERIA_TYPE_PASS_FAIL)
                          ├── pass_fail_value: true
                          └── determination: DETERMINATION_PASS
```

**Step-by-step walk-through:**

1. During Phase 2 (Sort) of the parent hotel run Job, sorter identifies RFID-tagged duvet cover `SN-RFID-GV-0098` as a stain escalation. `CreateJob` is called; new Job gets `parent_job_id = "job-hotel-gv-20260510"`.
2. The parent Job's sort phase is not blocked — it continues with the remaining 141 items. The stain escalation runs in parallel on a specialist bench.
3. Spot-test phase: specialist applies solvent to a hidden hem sample, verifies no fabric damage. `TaskOutcome.pass_fail_value = true`.
4. Chemical strip: degreaser applied (80 ml from product `prod-heavy-duty-degreaser`). Labor 0.5 hours. Outcome recorded as PASS (stain 95% removed).
5. Re-wash and press: item rejoins the normal workflow. Final quality check PASS.
6. Child Job transitions to `JOB_STATUS_COMPLETED`. The parent hotel run's delivery phase can now include this item (returned next day's delivery if it missed the 16:00 cutoff).
7. Billing: child Job is `billing_rule_type = BILLING_RULE_TYPE_T_AND_M`. Hotel's contract may include X free stain treatments per month; overage is billed via a separate `RevenueLineItem` on the hotel's monthly invoice.

**End state:** Child Job with 4 phases and 3 `TaskOutcome` rows. Parent/child linkage preserved via `parent_job_id`. RFID serial number `SN-RFID-GV-0098` traceable across the escalation lifecycle.

---

## What's NOT a Job

- **Drop-off self-service counter** (customer pays flat rate, no pickup/delivery): Single `Revenue + RevenueLineItem` transaction. No job needed unless tracked quality outcomes are required.
- **Dry cleaning of a single item at counter**: If no workflow phases are needed and the transaction is complete at pickup, a `Revenue` row suffices. Job is created only if multi-step tracking (special handling, delivery) is required.
- **Subscription fee billing without a physical pickup** (e.g., monthly minimum charge for a slow week): Revenue recognition fires from the Subscription directly. No Job is created unless a pickup actually occurred.
