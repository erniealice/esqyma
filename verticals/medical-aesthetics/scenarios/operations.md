# Medical Aesthetics Scenarios: Operations (Job Lifecycle)

In medical aesthetics, Jobs model treatment courses — the Job is one patient's treatment engagement (linked via `client_id`), phases map to individual sessions, and `TaskOutcome` rows capture clinical safety checks, dose records, and lot-numbered consumable consumption per session.

---

## Scenario 1: 6-Session Laser Hair Removal Package

A patient purchases a 6-session laser hair removal package. The `Subscription` is the purchased package; the Job is the treatment course; each session is a `JobPhase`; consumable materials are tracked with lot numbers for adverse-event traceability.

```
Subscription "LHR-SUB-04412"
  ├── client_id: "clt-isabel-tan"
  ├── price_plan_id: FK → "Laser Hair Removal — 6-Session Package"
  ├── origin_type: ORIGIN_TYPE_SUBSCRIPTION
  └── quantity: 6  (sessions included)
        │
        ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Job "Laser Hair Removal — Isabel Tan"                      │
  │    ├── id: "job-lhr-04412"                                  │
  │    ├── client_id: "clt-isabel-tan"                          │
  │    ├── origin_type: ORIGIN_TYPE_SUBSCRIPTION                │
  │    ├── origin_id: "LHR-SUB-04412"                           │
  │    ├── job_template_id: "tmpl-lhr-6session-v2"              │
  │    ├── fulfillment_type: FULFILLMENT_TYPE_SERVICE           │
  │    ├── billing_rule_type: BILLING_RULE_TYPE_INCLUDED        │
  │    └── status: JOB_STATUS_ACTIVE                            │
  └─────────────────────────────────────────────────────────────┘
        │
        ├── JobPhase "Session 1"  (phase_order: 1, status: COMPLETED)
        │     ├── JobTask "Pre-session safety assessment"
        │     │     ├── TaskOutcome (criteria_type: CRITERIA_TYPE_PASS_FAIL)
        │     │     │     ├── pass_fail_value: true   (no contraindications)
        │     │     │     ├── determination: DETERMINATION_PASS
        │     │     │     └── recorded_by: "staff-nurse-gomez"
        │     │     └── TaskOutcome (criteria_type: CRITERIA_TYPE_CATEGORICAL)
        │     │           ├── categorical_value: "fitzpatrick_type_3"
        │     │           └── determination: DETERMINATION_PASS
        │     ├── JobTask "Laser treatment delivery"
        │     │     ├── JobActivity (ENTRY_TYPE_LABOR)
        │     │     │     ├── ActivityLabor.staff_id: "staff-laser-tech-04"
        │     │     │     ├── ActivityLabor.hours: 0.5
        │     │     │     └── ActivityLabor.rate_type: RATE_TYPE_STANDARD
        │     │     └── JobActivity (ENTRY_TYPE_MATERIAL)
        │     │           ├── ActivityMaterial.product_id: "prod-xeo-min-cooling-gel"
        │     │           ├── ActivityMaterial.lot_number: "LOT-XEO-MIN-ABC123"
        │     │           ├── ActivityMaterial.unit_of_measure: "ml"
        │     │           └── JobActivity.quantity: 30
        │     └── JobTask "Post-treatment check"
        │           └── TaskOutcome (criteria_type: CRITERIA_TYPE_PASS_FAIL)
        │                 ├── pass_fail_value: true   (no adverse reaction)
        │                 └── determination: DETERMINATION_PASS
        │
        ├── PhaseOutcomeSummary (Session 1)
        │     ├── phase_determination: OVERALL_DETERMINATION_ACCEPTED
        │     ├── pass_count: 3 / total_criteria_count: 3
        │     └── issued_by: "staff-laser-tech-04"
        │
        ├── JobPhase "Session 2"  (phase_order: 2, status: COMPLETED)
        │     └── (same task structure, different lot number consumed)
        │           └── ActivityMaterial.lot_number: "LOT-XEO-MIN-DEF456"
        │                 JobActivity.quantity: 28  (less coverage area this session)
        │
        ├── JobPhase "Session 3"  (phase_order: 3, status: ACTIVE)
        │     └── (in progress — patient booked for next week)
        │
        ├── JobPhase "Session 4"  (phase_order: 4, status: PENDING)
        ├── JobPhase "Session 5"  (phase_order: 5, status: PENDING)
        └── JobPhase "Session 6"  (phase_order: 6, status: PENDING)
```

**Step-by-step walk-through:**

1. Patient purchases 6-session package at reception. `Subscription` activated; `CreateJob` fires using template `tmpl-lhr-6session-v2`. Job starts `JOB_STATUS_PENDING`; moves to `ACTIVE` at first visit.
2. Session 1 check-in: nurse records pre-session safety assessment via two `TaskOutcome` rows — a pass/fail contraindication check and a Fitzpatrick skin-type classification (categorical). Both must pass before treatment starts.
3. Technician delivers treatment (0.5 hours) and applies cooling gel from lot `LOT-XEO-MIN-ABC123` (30 ml consumed). The `ActivityMaterial.lot_number` field provides full traceability if an adverse event occurs.
4. Post-treatment check: no redness beyond expected. `TaskOutcome.pass_fail_value = true`. Phase moves to `PHASE_STATUS_COMPLETED`. `PhaseOutcomeSummary` issued with 3/3 pass.
5. Patient books Session 2. When they arrive, Phase 2 activates automatically. A different gel lot (`LOT-XEO-MIN-DEF456`) is consumed — each session can reference a different lot without any schema change.
6. At Session 6 completion: all 6 `PhaseOutcomeSummary` records exist. `JobOutcomeSummary` is issued. Job transitions to `JOB_STATUS_COMPLETED`. Subscription is flagged as fulfilled.

**End state:** 6 `JobPhase` rows, 18 `TaskOutcome` rows (3 per session × 6), 12 `JobActivity` rows (1 labor + 1 material per session × 6), 6 `PhaseOutcomeSummary` rows, 1 `JobOutcomeSummary`. Lot traceability query: filter `ActivityMaterial.lot_number = 'LOT-XEO-MIN-ABC123'` to find all patients who received that lot.

---

## Scenario 2: Botox Party — Event-Based Multi-Patient Treatment

A clinic runs a "Botox party" (group event) where 5 patients receive treatment in one evening. The event is a master Job; each patient's treatment is a child Job. This mirrors the professional-services joint-representation pattern.

```
  ┌─────────────────────────────────────────────────────────────┐
  │  Master Job "Botox Party — June 14 Evening"                 │
  │    ├── id: "job-btx-event-0614"                             │
  │    ├── client_id: NULL  (event-level; no single patient)    │
  │    ├── parent_job_id: NULL                                  │
  │    ├── fulfillment_type: FULFILLMENT_TYPE_SERVICE           │
  │    ├── billing_rule_type: BILLING_RULE_TYPE_INCLUDED        │
  │    └── status: JOB_STATUS_ACTIVE                            │
  └─────────────────────────────────────────────────────────────┘
        │
        ├── Child Job "Botox — Patient A (Maria Cruz)"
        │     ├── id: "job-btx-mcruz-0614"
        │     ├── client_id: "clt-maria-cruz"
        │     ├── parent_job_id: "job-btx-event-0614"
        │     ├── origin_type: ORIGIN_TYPE_SUBSCRIPTION
        │     └── origin_id: "sub-btx-mcruz-package"
        │
        ├── Child Job "Botox — Patient B (Ana Reyes)"
        │     ├── client_id: "clt-ana-reyes"
        │     └── parent_job_id: "job-btx-event-0614"
        │
        └── Child Job "Botox — Patient C (Luz Santos)"
              ├── client_id: "clt-luz-santos"
              └── parent_job_id: "job-btx-event-0614"

Each child Job structure (example: Maria Cruz):
  │
  └── JobPhase "Treatment Session"  (phase_order: 1)
        ├── JobTask "Consent and pre-treatment check"
        │     ├── TaskOutcome (CRITERIA_TYPE_PASS_FAIL)
        │     │     ├── pass_fail_value: true  (consent signed)
        │     │     └── determination: DETERMINATION_PASS
        │     └── TaskOutcome (CRITERIA_TYPE_CATEGORICAL)
        │           ├── categorical_value: "no_recent_filler"
        │           └── determination: DETERMINATION_PASS
        ├── JobTask "Botox injection — forehead lines"
        │     ├── JobActivity (ENTRY_TYPE_LABOR)
        │     │     ├── ActivityLabor.staff_id: "staff-dr-mendoza"
        │     │     └── ActivityLabor.hours: 0.25
        │     └── JobActivity (ENTRY_TYPE_MATERIAL)
        │           ├── ActivityMaterial.product_id: "prod-botulinum-toxin-type-a"
        │           ├── ActivityMaterial.lot_number: "LOT-BTX-2026-004"
        │           ├── ActivityMaterial.unit_of_measure: "unit"
        │           └── JobActivity.quantity: 20  (20 Botox units)
        └── JobTask "Post-injection observation"
              └── TaskOutcome (CRITERIA_TYPE_PASS_FAIL)
                    ├── pass_fail_value: true
                    └── determination: DETERMINATION_PASS
```

**Step-by-step walk-through:**

1. Event is scheduled. Master Job created with `client_id = NULL`. As each patient confirms attendance, a child Job is created for them, each carrying its own `client_id` and `origin_id` (pointing to their package subscription or a one-off order).
2. Evening of the event: doctor and nurses work through 5 patients. Each patient's child Job is activated in sequence.
3. Per patient: consent is recorded as `TaskOutcome` (pass/fail). Pre-treatment contraindication check recorded (categorical). Both must show `DETERMINATION_PASS` before the injection task can be marked `TASK_STATUS_IN_PROGRESS`.
4. Injection: doctor logs 0.25 hours (ENTRY_TYPE_LABOR). Toxin units consumed are recorded (ENTRY_TYPE_MATERIAL) with lot number `LOT-BTX-2026-004`. If any adverse event is later reported, lot lookup surfaces all 5 patients who received that lot that evening.
5. Post-injection observation (15 min) passes. Child Job moves to `JOB_STATUS_COMPLETED`. `JobOutcomeSummary` issued per patient.
6. Master Job closes after last patient's child Job is complete.

**End state:** 1 master Job, 5 child Jobs, 5 `JobOutcomeSummary` rows. Billing: each child Job's `origin_id` → Subscription → Revenue / Invoice per patient.

---

## Scenario 3: Consult → Treatment → Follow-Up

A new patient presents for an initial consultation, receives a dermal filler treatment, and returns 2 weeks later for a follow-up. One Job, 3 phases, demonstrating clinical safety `TaskOutcome` checks at each phase.

```
  ┌─────────────────────────────────────────────────────────────┐
  │  Job "Dermal Filler — Patient Consult+Treat — Gabby Lim"   │
  │    ├── id: "job-filler-glim-0421"                           │
  │    ├── client_id: "clt-gabby-lim"                           │
  │    ├── origin_type: ORIGIN_TYPE_ORDER                       │
  │    ├── origin_id: "ord-filler-glim-0421"                    │
  │    ├── fulfillment_type: FULFILLMENT_TYPE_SERVICE           │
  │    ├── billing_rule_type: BILLING_RULE_TYPE_T_AND_M         │
  │    └── status: JOB_STATUS_ACTIVE                            │
  └─────────────────────────────────────────────────────────────┘
        │
        ├── JobPhase 1: "Initial Consultation"  (phase_order: 1)
        │     ├── JobTask "Medical history intake"
        │     │     ├── TaskOutcome (CRITERIA_TYPE_PASS_FAIL)
        │     │     │     ├── pass_fail_value: true   (no contraindications)
        │     │     │     └── determination: DETERMINATION_PASS
        │     │     └── TaskOutcome (CRITERIA_TYPE_TEXT)
        │     │           ├── text_value: "Previous filler Apr 2025 — fully resolved"
        │     │           └── determination: DETERMINATION_PASS
        │     ├── JobTask "Before photos taken"
        │     │     └── TaskOutcome (CRITERIA_TYPE_PASS_FAIL)
        │     │           ├── pass_fail_value: true
        │     │           └── attachment_ids: ["att-photo-before-0421"]
        │     └── JobActivity (ENTRY_TYPE_LABOR)
        │           ├── ActivityLabor.staff_id: "staff-dr-mendoza"
        │           └── ActivityLabor.hours: 0.5
        │
        ├── PhaseOutcomeSummary (Consultation)
        │     └── phase_determination: OVERALL_DETERMINATION_ACCEPTED
        │
        ├── JobPhase 2: "Treatment"  (phase_order: 2)
        │     ├── JobTask "Topical anaesthetic application"
        │     │     └── TaskOutcome (CRITERIA_TYPE_PASS_FAIL)
        │     │           ├── pass_fail_value: true   (20 min wait, no reaction)
        │     │           └── determination: DETERMINATION_PASS
        │     ├── JobTask "Filler injection — nasolabial folds"
        │     │     ├── JobActivity (ENTRY_TYPE_LABOR)
        │     │     │     ├── ActivityLabor.staff_id: "staff-dr-mendoza"
        │     │     │     └── ActivityLabor.hours: 0.5
        │     │     └── JobActivity (ENTRY_TYPE_MATERIAL)
        │     │           ├── ActivityMaterial.product_id: "prod-hyaluronic-acid-filler-1ml"
        │     │           ├── ActivityMaterial.lot_number: "LOT-HA-2026-011"
        │     │           ├── ActivityMaterial.unit_of_measure: "syringe"
        │     │           └── JobActivity.quantity: 2  (2 × 1 ml syringes)
        │     └── JobTask "Vital signs at discharge"
        │           ├── TaskOutcome (CRITERIA_TYPE_NUMERIC_RANGE)
        │           │     ├── numeric_value: 118.0   (systolic BP, mmHg)
        │           │     └── determination: DETERMINATION_PASS  (within 90–140 range)
        │           └── TaskOutcome (CRITERIA_TYPE_PASS_FAIL)
        │                 ├── pass_fail_value: true   (no vascular occlusion signs)
        │                 └── determination: DETERMINATION_PASS
        │
        ├── PhaseOutcomeSummary (Treatment)
        │     └── phase_determination: OVERALL_DETERMINATION_ACCEPTED
        │
        └── JobPhase 3: "Follow-Up"  (phase_order: 3)
              ├── JobTask "2-week result assessment"
              │     ├── TaskOutcome (CRITERIA_TYPE_TEXT)
              │     │     └── text_value: "Results optimal; no touch-up needed"
              │     └── TaskOutcome (CRITERIA_TYPE_PASS_FAIL)
              │           ├── pass_fail_value: true
              │           └── attachment_ids: ["att-photo-after-0421"]
              └── JobOutcomeSummary
                    ├── summary_type: SUMMARY_TYPE_DIAGNOSTIC_REPORT
                    ├── overall_determination: OVERALL_DETERMINATION_ACCEPTED
                    └── pass_count: 7 / total_criteria_count: 7
```

**Step-by-step walk-through:**

1. Patient arrives for consult. Job created from template `tmpl-filler-consult-treat-v1`. Phase 1 activates immediately.
2. Medical history intake: two `TaskOutcome` rows. The text-type outcome captures free-text notes about previous procedures. Photo taken; `attachment_ids` references the image stored in the document domain.
3. Phase 1 closes when all tasks are complete. `PhaseOutcomeSummary` issued. Vital signs (numeric range) checked at discharge — systolic BP 118 mmHg, within the 90–140 pass range as defined by `CriteriaThreshold` records linked to the `OutcomeCriteria`.
4. Phase 2 completes. Two syringes from lot `LOT-HA-2026-011` consumed. Lot traceability preserved.
5. 2-week follow-up: patient returns. Phase 3 activates. Result is optimal; no touch-up. Final `TaskOutcome` + after-photo attached.
6. `JobOutcomeSummary` issued at the follow-up completion. Job moves to `JOB_STATUS_COMPLETED`. Revenue is T&M billed: doctor's 1.5 hours + material costs (2 syringes) → `RevenueLineItem` rows → Invoice.

**End state:** 3 phases, 3 `PhaseOutcomeSummary` rows, 7 `TaskOutcome` rows (4 pass/fail + 1 text + 1 numeric + 1 text), 2 `JobActivity` labor + 1 `JobActivity` material, 1 `JobOutcomeSummary`.

---

## What's NOT a Job

- **Walk-in retail product sale** (sunscreen, serums, skincare kits at reception counter): Pure `Revenue + RevenueLineItem` transaction. No job, no phases, no activity tracking.
- **Phone consultation (no treatment)**: A single staff time entry (ENTRY_TYPE_LABOR on a subscription-linked activity) suffices. No Job needed unless a follow-up treatment is booked.
- **Gift certificate redemption** without a defined treatment: The redemption is handled at the `Balance` / `License` layer. A Job is created only when the patient books the actual treatment.
