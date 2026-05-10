# Leasing Operations Scenarios

Service engagements in leasing span the full asset lifecycle: from the initial handoff to the lessee through recurring maintenance cycles, ad-hoc repairs, and final return with inspection. This file covers all 5 canonical Job types.

---

## Overview: Job Types in a Lease Contract

```
Subscription (Lease Contract)
  │
  ├── Job: Initial Deployment (one-shot, spawned at contract activation)
  │     └── JobTemplate: "Excavator Deployment SOP"
  │
  ├── Job: Q1 Cyclic Maintenance (auto-spawned at T+90 days)
  ├── Job: Q2 Cyclic Maintenance (auto-spawned at T+180 days)
  ├── Job: Q3 Cyclic Maintenance (auto-spawned at T+270 days)
  │     └── JobTemplate: "Standard Excavator Quarterly Maintenance SOP"
  │         (all 12 maintenance jobs share this template)
  │
  ├── Job: Hydraulic Leak Repair (ad-hoc, spawned from incident report)
  ├── Job: Undercarriage Damage Repair (ad-hoc)
  │     └── JobTemplate: "Field Repair SOP" (typed by repair category)
  │
  ├── Job: End-of-Term Return (one-shot, spawned at termination notice)
  │     └── JobTemplate: "Excavator Return & Inspection SOP"
  │
  └── Job: Post-Return Refurbishment (internal, spawned after return)
        └── JobTemplate: "Heavy Equipment Refurbishment SOP"
            client_id: NULL (internal, no lessee)
```

---

## Scenario 1: New 36-Month Equipment Lease — Origination + Deployment

**Context:** Lessee Corp signs a 36-month lease for one Excavator XJ-9000 (SN: EX-2024-0471). The lease activates on 2026-01-15. One deployment Job is created automatically.

### Flow

```
Contract signed          ┌────────────────────┐
(2026-01-14) ───────────▶│    subscription     │
                         │    status: PENDING  │
                         │    client: Lessee   │
                         │    price_plan: 36mo │
                         └──────────┬──────────┘
                                    │ activation (2026-01-15)
                                    ▼
                         ┌────────────────────┐
                         │   Job created:     │
                         │  "Deployment -     │
                         │  EX-2024-0471"     │
                         │  status: DRAFT     │
                         │  template: Deploy  │
                         └──────────┬──────────┘
                                    │ Job RELEASED → field crew dispatched
                                    ▼
                         ┌────────────────────┐
                         │   Job ACTIVE       │
                         │   Phases executing │
                         └──────────┬──────────┘
                                    │ Phase: Mobilization (loading, transport)
                                    │ Phase: Site Handoff (delivery, inspection)
                                    │ Phase: Sign-off (paperwork, photo doc)
                                    ▼
                         ┌────────────────────┐
                         │  Job COMPLETED     │
                         └──────────┬──────────┘
                                    │ writes:
                                    ▼
                    AssetTransaction (LEASE_OUT)
                    ├── asset_id: EX-2024-0471
                    ├── from_location_id: "North Depot"
                    ├── to_location_id: "Lessee Corp - Site A"
                    └── reference_number: "LSE-2026-0047"

                    subscription.status → "deployed"
```

### Field-Level Writes

**Subscription:**
```
subscription
  id:              LSE-2026-0047
  client_id:       lessee-corp-001
  price_plan_id:   pp-36mo-industrial-t2
  date_start:      2026-01-15
  date_end:        2029-01-14
  status:          "deployed"
  metadata:        {"asset_serial": "EX-2024-0471", "deposit_amount": 500000}
```

**Job (Deployment):**
```
job
  id:              job-deploy-0471-001
  origin_id:       LSE-2026-0047           ← FK to subscription
  client_id:       lessee-corp-001
  job_template_id: tmpl-excavator-deploy
  status:          COMPLETED
```

**JobActivity (transport labor):**
```
job_activity (entry_type: LABOR)
  job_id:          job-deploy-0471-001
  job_phase_id:    phase-mobilization-001
  ↳ activity_labor
       staff_id:   driver-garcia
       hours:      4.0
       rate:       8500  (centavos = $85/hr)
```

**AssetTransaction (LEASE_OUT):**
```
asset_transaction
  asset_id:          ast-0471
  transaction_type:  ASSET_TRANSACTION_TYPE_LEASE_OUT   ← field 18
  from_location_id:  loc-north-depot
  to_location_id:    loc-lessee-site-a
  reference_number:  LSE-2026-0047
  transaction_date:  1736899200  (2026-01-15)
  amount:            0  (custody change, not a financial event)
  performed_by:      driver-garcia
```

**Asset (post-deployment):**
```
asset
  id:           ast-0471
  location_id:  loc-lessee-site-a      ← updated
  custodian_id: lessee-corp-001        ← updated
  status:       ASSET_STATUS_IN_SERVICE
```

---

## Scenario 2: Cyclic Quarterly Maintenance — Auto-Spawned

**Context:** On 2026-04-15 (T+90 days), the system triggers Q1 maintenance for EX-2024-0471 based on `AssetMaintenance.next_maintenance_date`. A new Job is created automatically from the quarterly maintenance template.

### Flow

```
AssetMaintenance record  ┌────────────────────────┐
(created at deployment)  │   asset_maintenance     │
                         │   asset_id: ast-0471    │
                         │   type: PREVENTIVE      │
                         │   recurrence: 90 days   │
                         │   next_date: 2026-04-15 │
                         └──────────┬──────────────┘
                                    │ scheduler fires on next_date
                                    ▼
                         ┌────────────────────┐
                         │   Job created:     │
                         │  "Q1 Maintenance - │
                         │  EX-2024-0471"     │
                         │  origin_id: lease  │
                         │  template: Qtrly   │
                         └──────────┬──────────┘
                                    │ Field tech dispatched to site
                                    ▼
                         ┌────────────────────┐
                         │   Job ACTIVE       │
                         └──────────┬──────────┘
                                    │ Phases:
                                    │   Inspection → Service → Documentation
                                    ▼
                         ┌────────────────────┐
                         │  Job COMPLETED     │
                         └──────────┬──────────┘
                                    │ writes:
                                    ├── AssetTransaction (MAINTENANCE)
                                    ├── AssetMaintenance.next_date = 2026-07-14
                                    └── AssetMaintenance.status = COMPLETED
```

### Field-Level Writes

**Job (Q1 Maintenance):**
```
job
  id:              job-maint-0471-q1-2026
  origin_id:       LSE-2026-0047
  client_id:       lessee-corp-001
  job_template_id: tmpl-excavator-quarterly-maint
  status:          COMPLETED
```

**JobActivity (oil change material):**
```
job_activity (entry_type: MATERIAL)
  job_id:          job-maint-0471-q1-2026
  job_phase_id:    phase-service-001
  ↳ activity_material
       inventory_item_id: inv-engine-oil-15w40
       inventory_serial_id: NULL  (bulk consumable)
       quantity:          12.0   (litres)
       unit_cost:         350    (centavos = $3.50/L)
```

**JobActivity (tech hours):**
```
job_activity (entry_type: LABOR)
  ↳ activity_labor
       staff_id:  tech-reyes
       hours:     3.5
       rate:      9500  (centavos = $95/hr)
```

**AssetTransaction (MAINTENANCE):**
```
asset_transaction
  asset_id:         ast-0471
  transaction_type: ASSET_TRANSACTION_TYPE_MAINTENANCE   ← field 16
  amount:           40750  (centavos: labor + materials)
  reference_number: job-maint-0471-q1-2026
  description:      "Q1 2026 preventive maintenance completed"
```

**AssetMaintenance (updated):**
```
asset_maintenance
  asset_id:                  ast-0471
  status:                    MAINTENANCE_STATUS_COMPLETED
  completion_date:           2026-04-15
  next_maintenance_date:     2026-07-14    ← advanced by recurrence_interval_days
  recurrence_interval_days:  90
  cost:                      40750
  work_order_number:         job-maint-0471-q1-2026
```

---

## Scenario 3: Incident-Driven Repair Call

**Context:** On 2026-06-10, the lessee reports a hydraulic leak on EX-2024-0471. An ad-hoc repair Job is spawned from the service request. A 3rd-party towing company is involved.

### Flow

```
Lessee reports fault      ┌────────────────────┐
(service request) ───────▶│   Job created:     │
                          │  "Hydraulic Leak   │
                          │   Repair - 0471"   │
                          │  origin_id: lease  │
                          │  template: Field   │
                          │           Repair   │
                          └──────────┬──────────┘
                                     │ Phases:
                                     │   Diagnosis → Parts Sourcing → Repair → Test
                                     ▼
                          ┌────────────────────┐
                          │   Job ACTIVE       │
                          └──────────┬──────────┘
                                     │ 3rd-party towing required
                                     ▼
                          ┌────────────────────────────────┐
                          │ activity_expense               │
                          │   vendor: "FastTow LLC"        │
                          │   amount: 85000  ($850)        │
                          │   description: "Tow to maint. bay"│
                          └────────────────────────────────┘
                                     │
                                     ▼
                          ┌────────────────────┐
                          │  Job COMPLETED     │
                          └──────────┬──────────┘
                                     │ Chargeable to lessee?
                                     │ (depends on lease contract terms)
                                     ▼
                          job_settlement → Revenue lines
                          if operator-caused: lessee billed
                          if normal wear: absorbed by lessor
```

### Field-Level Writes

**Job (Repair):**
```
job
  id:              job-repair-0471-hydr-001
  origin_id:       LSE-2026-0047
  client_id:       lessee-corp-001
  job_template_id: tmpl-field-repair-hydraulic
  status:          COMPLETED
```

**JobActivity (3rd-party towing):**
```
job_activity (entry_type: EXPENSE)
  job_phase_id:     phase-diagnosis
  ↳ activity_expense
       vendor_id:   vendor-fasttow-llc
       amount:      85000   (centavos = $850)
       description: "Emergency tow from Lessee Corp Site A to North Depot Maintenance Bay"
```

**JobActivity (seal replacement — material):**
```
job_activity (entry_type: MATERIAL)
  ↳ activity_material
       inventory_item_id: inv-hydraulic-seal-kit-htx44
       quantity:          1
       unit_cost:         24500   (centavos = $245)
```

**TaskOutcome (post-repair inspection):**
```
task_outcome
  job_task_id:         task-post-repair-check
  outcome_criteria_id: crit-hydraulic-integrity
  result:              "PASS"
  notes:               "System pressure nominal, no leaks detected post-repair"
```

---

## Scenario 4: End-of-Term Return + Chargebacks

**Context:** The 36-month lease expires 2029-01-14. On 2028-12-01, the lessee gives notice. A return Job is created. The physical return happens 2029-01-10. Inspection finds a cracked boom arm (operator damage). AssetTransaction.DAMAGE_FOUND is recorded. A chargeback invoice is generated.

### Flow

```
Termination notice       ┌────────────────────┐
(2028-12-01) ───────────▶│   Job created:     │
                         │  "End-of-Term      │
                         │   Return - 0471"   │
                         │  status: DRAFT     │
                         └──────────┬──────────┘
                                    │ Phases:
                                    │  1. Mobilization (arrange pickup)
                                    │  2. Transport (asset physically returned)
                                    │  3. Inspection (detailed condition assessment)
                                    │  4. Documentation (photos, damage report)
                                    │  5. Settlement (financial close-out)
                                    ▼
Phase 2 completed        ┌────────────────────────────────┐
(asset physically ──────▶│ AssetTransaction (LEASE_RETURN)│
 returned)               │  from: Lessee Corp Site A      │
                         │  to: North Depot Intake Bay    │
                         │  reference: LSE-2026-0047      │
                         └────────────────────────────────┘
                         subscription.status → "terminating"

Phase 3: Inspection results written as TaskOutcome rows

Inspector finds          ┌────────────────────────────────┐
cracked boom arm ───────▶│ task_outcome                   │
                         │  criteria: "Boom Arm Integrity"│
                         │  result: FAIL                  │
                         │  notes: "30cm crack, boom arm  │
                         │          section 3"            │
                         └────────────────────────────────┘
                                    │
                                    ▼
                         ┌────────────────────────────────┐
                         │ AssetTransaction (DAMAGE_FOUND)│
                         │  amount: 350000  ($3,500 est.) │
                         │  description: "Cracked boom    │
                         │   arm, section 3, operator-   │
                         │   attributable"               │
                         │  reference: job-return-0471   │
                         └────────────────────────────────┘
                                    │
                                    ▼
Phase 5: Settlement      ┌────────────────────────────────┐
                         │     job_settlement             │
                         │  status: SETTLED               │
                         │  total_amount: 350000          │
                         └────────────────────────────────┘
                                    │ generates
                                    ▼
                         ┌────────────────────┐
                         │   revenue          │
                         │   (chargeback)     │
                         └────────────────────┘
                          revenue_line_item:
                            "Damage: Cracked boom arm" = $3,500
                          revenue_category: "Damages"

                         invoice sent to Lessee Corp
                         subscription.status → "closed"
```

### Field-Level Writes

**AssetTransaction (LEASE_RETURN):**
```
asset_transaction
  asset_id:         ast-0471
  transaction_type: ASSET_TRANSACTION_TYPE_LEASE_RETURN   ← field 19
  from_location_id: loc-lessee-site-a
  to_location_id:   loc-north-depot-intake
  reference_number: LSE-2026-0047
  transaction_date: 1736467200  (2029-01-10)
  amount:           0  (custody change event)
```

**AssetTransaction (DAMAGE_FOUND):**
```
asset_transaction
  asset_id:         ast-0471
  transaction_type: ASSET_TRANSACTION_TYPE_DAMAGE_FOUND   ← field 20
  amount:           350000   (centavos = $3,500 estimated repair cost)
  description:      "Cracked boom arm section 3 — operator-attributable"
  reference_number: job-return-0471-001
  transaction_date: 1736467200
```

**JobSettlement:**
```
job_settlement
  job_id:         job-return-0471-001
  status:         SETTLED
  total_amount:   350000
  settled_at:     1736467200
```

**Revenue (chargeback):**
```
revenue
  subscription_id:  LSE-2026-0047
  job_settlement_id: settlement-return-0471

revenue_line_item
  description:        "Damage — Cracked boom arm section 3"
  total_price:        350000
  revenue_category:   "Damages"
```

**Asset (post-return):**
```
asset
  location_id:   loc-north-depot-intake    ← back at yard
  custodian_id:  NULL  (or yard manager)
  status:        ASSET_STATUS_IMPAIRED     ← until repaired
```

---

## Scenario 5: Asset Refurbishment Between Leases (Internal)

**Context:** After the cracked boom arm repair, EX-2024-0471 is refurbished before being put back in service. This is a firm-internal Job — no lessee, no Revenue. `client_id` is NULL.

### Flow

```
Post-return assessment    ┌────────────────────┐
determines refurb ───────▶│   Job created:     │
needed                    │  "Refurbishment -  │
                          │   EX-2024-0471"    │
                          │  client_id: NULL   │  ← internal
                          │  origin_id: NULL   │  ← no lease
                          │  template: Heavy   │
                          │   Equipment        │
                          │   Refurbishment    │
                          └──────────┬──────────┘
                                     │ Phases:
                                     │   Assessment → Structural Repair
                                     │   → Paint → QA Inspection → Certification
                                     ▼
                          ┌────────────────────┐
                          │   Job ACTIVE       │
                          └──────────┬──────────┘
                                     │ Boom arm fabrication + welding
                                     │ activity_material: steel + welding consumables
                                     │ activity_labor: welder + fabricator hours
                                     │ activity_expense: 3rd-party certification
                                     ▼
                          ┌────────────────────┐
                          │  Job COMPLETED     │
                          └──────────┬──────────┘
                                     │ writes:
                                     ├── AssetTransaction (MAINTENANCE)
                                     │     amount: total refurb cost
                                     │     is_capitalized: true (if over threshold)
                                     ├── AssetMaintenance (OVERHAUL)
                                     │     type: MAINTENANCE_TYPE_OVERHAUL
                                     │     cost: total
                                     └── asset.status → ASSET_STATUS_IN_SERVICE
                                         asset.book_value updated if capitalised
```

### Field-Level Writes

**Job (Refurbishment):**
```
job
  id:              job-refurb-0471-001
  origin_id:       NULL                    ← no lease contract
  client_id:       NULL                    ← internal, no lessee
  job_template_id: tmpl-heavy-equip-refurb
  status:          COMPLETED
```

**JobActivity (structural repair — material):**
```
job_activity (entry_type: MATERIAL)
  ↳ activity_material
       description:   "Boom arm section 3 — replacement steel fabrication"
       quantity:      1
       unit_cost:     185000   (centavos = $1,850)
```

**JobActivity (3rd-party inspection/certification):**
```
job_activity (entry_type: EXPENSE)
  ↳ activity_expense
       vendor_id:   vendor-cert-authority
       amount:      45000   (centavos = $450)
       description: "Post-repair structural certification"
```

**AssetTransaction (MAINTENANCE — capitalised refurb):**
```
asset_transaction
  asset_id:         ast-0471
  transaction_type: ASSET_TRANSACTION_TYPE_MAINTENANCE   ← field 16
  amount:           285000   (centavos: total refurb cost)
  description:      "Boom arm section 3 refurbishment — capitalised"
  reference_number: job-refurb-0471-001
```

**AssetMaintenance (OVERHAUL record):**
```
asset_maintenance
  asset_id:          ast-0471
  maintenance_type:  MAINTENANCE_TYPE_OVERHAUL
  status:            MAINTENANCE_STATUS_COMPLETED
  cost:              285000
  is_capitalized:    true
  work_order_number: job-refurb-0471-001
```

**Asset (post-refurbishment):**
```
asset
  status:                   ASSET_STATUS_IN_SERVICE
  book_value:               (increased by capitalised refurb cost)
  accumulated_depreciation: (reset per IFRS treatment if applicable)
```

**Revenue:** None. Internal refurbishment is a cost event, not a revenue event. The cost is captured on `activity_material` + `activity_labor` + `activity_expense` rows and flows to internal cost reporting.
