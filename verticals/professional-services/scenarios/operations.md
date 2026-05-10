# Professional Services Scenarios: Operations (Job Lifecycle)

In professional services, Jobs map to engagements and matters — a Job is the operational execution unit that consumes staff labor, incurs expenses, and produces deliverables for a specific client under a Subscription or standalone order.

---

## Scenario 1: Litigation Matter — Joint Representation (Multi-Party)

Two co-defendants (Acme Corp and BetaCo) are jointly represented in a commercial dispute. Shared deposition prep is tracked under a master Job; per-client billing lives in child Jobs linked via `parent_job_id`.

```
  ┌─────────────────────────────────────────────────────────────┐
  │  Master Job "Apex v. Acme+Beta — Shared Deposition Prep"   │
  │    ├── id: "job-mat-0091-master"                            │
  │    ├── client_id: NULL  (no single party owns the master)   │
  │    ├── parent_job_id: NULL  (this IS the master)            │
  │    ├── origin_type: ORIGIN_TYPE_ORDER                       │
  │    ├── fulfillment_type: FULFILLMENT_TYPE_PROJECT           │
  │    ├── billing_rule_type: BILLING_RULE_TYPE_T_AND_M         │
  │    └── status: JOB_STATUS_ACTIVE                            │
  └─────────────────────────────────────────────────────────────┘
        │
        ├── child: Job "Apex v. Acme — Billing Matter"
        │     ├── id: "job-mat-0091-acme"
        │     ├── client_id: "clt-acme-corp"
        │     ├── parent_job_id: "job-mat-0091-master"
        │     ├── origin_id: "sub-acme-lit-2026"
        │     └── billing_rule_type: BILLING_RULE_TYPE_T_AND_M
        │
        └── child: Job "Apex v. Beta — Billing Matter"
              ├── id: "job-mat-0091-beta"
              ├── client_id: "clt-betaco"
              ├── parent_job_id: "job-mat-0091-master"
              ├── origin_id: "sub-beta-lit-2026"
              └── billing_rule_type: BILLING_RULE_TYPE_T_AND_M

Master Job structure:
  │
  ├── JobPhase: "Deposition Preparation"  (phase_order: 1)
  │     ├── JobTask: "Document review — joint"
  │     │     └── JobActivity (ENTRY_TYPE_LABOR) — shared cost pool
  │     │           ├── ActivityLabor.staff_id: "staff-assoc-reyes"
  │     │           ├── ActivityLabor.hours: 8.0
  │     │           └── JobActivity.billable_status: BILLABLE_STATUS_BILLABLE
  │     └── JobTask: "Witness preparation session"
  │           └── JobActivity (ENTRY_TYPE_LABOR)
  │                 ├── ActivityLabor.staff_id: "staff-partner-santos"
  │                 └── ActivityLabor.hours: 3.0
  │
  └── JobPhase: "Hearing"  (phase_order: 2)
        └── (per-client activities posted to child jobs, not master)

Child Job (Acme) structure:
  │
  ├── JobPhase: "Acme-Specific Prep"
  │     └── JobTask: "Review Acme internal docs"
  │           └── JobActivity (ENTRY_TYPE_LABOR)
  │                 ├── ActivityLabor.staff_id: "staff-assoc-reyes"
  │                 └── ActivityLabor.hours: 4.0
  │
  └── JobPhase: "Billing Cycle Close"
        └── (billing run sweeps activities from this child job)
```

**Step-by-step walk-through:**

1. Firm opens master Job for shared work. `client_id` is null at the master level — the matter is not owned by one party.
2. Two child Jobs are created, each with `parent_job_id = "job-mat-0091-master"` and their own `client_id` + `origin_id` (pointing to each client's retainer Subscription).
3. Shared deposition prep: associate logs 8 hours on the master Job. At month-end billing, this cost is split (50/50 by agreement) — the billing run posts two `JobActivity` rows on the child jobs (`bill_amount = 8 hrs × rate ÷ 2 per child`).
4. Acme-specific work is posted directly to `job-mat-0091-acme`. No splitting needed.
5. Revenue recognition: `BillJobActivities` sweeps each child job independently. Each child produces its own `RevenueLineItem` set → `Revenue` → `Invoice` per client.

**End state:** Master Job holds shared activities. Child Jobs each produce separate invoices. `GetJobsByOrigin(origin_type=SUBSCRIPTION, origin_id="sub-acme-lit-2026")` returns Acme's billing matter for revenue tracing.

---

## Scenario 2: Tax Advisory Engagement — Recurring Monthly Cycle

A corporate client engages the firm for ongoing tax advisory. The `Subscription` has a monthly billing cycle; each month the system spawns a new cycle-instance Job (`parent_job_id` → engagement shell, `cycle_index` increments).

```
Subscription "sub-taxadv-globalcorp-2026"
  ├── client_id: "clt-global-corp"
  ├── price_plan_id: FK → "Monthly Tax Advisory — PHP 80,000/mo"
  └── origin_type: ORIGIN_TYPE_SUBSCRIPTION

Engagement shell Job (parent):
  ┌─────────────────────────────────────────────────────────────┐
  │  Job "Global Corp — Tax Advisory Engagement 2026"           │
  │    ├── id: "job-taxadv-gc-shell"                            │
  │    ├── client_id: "clt-global-corp"                         │
  │    ├── origin_type: ORIGIN_TYPE_SUBSCRIPTION                │
  │    ├── origin_id: "sub-taxadv-globalcorp-2026"              │
  │    ├── parent_job_id: NULL  (engagement shell)              │
  │    └── status: JOB_STATUS_ACTIVE                            │
  └─────────────────────────────────────────────────────────────┘

Cycle-instance Jobs (spawned monthly by MaterializeCycleJobs):
  ┌─────────────────────────────────────────────────────────────┐
  │  Job "Global Corp — Tax Advisory — Cycle 1 (Jan 2026)"     │
  │    ├── id: "job-taxadv-gc-c1"                               │
  │    ├── client_id: "clt-global-corp"                         │
  │    ├── parent_job_id: "job-taxadv-gc-shell"                 │
  │    ├── origin_id: "sub-taxadv-globalcorp-2026"              │
  │    ├── cycle_index: 0                                       │
  │    ├── cycle_period_start: "2026-01-01"                     │
  │    ├── cycle_period_end: "2026-02-01"                       │
  │    └── status: JOB_STATUS_ACTIVE                            │
  └─────────────────────────────────────────────────────────────┘
        │
        ├── JobPhase: "Monthly Deliverables"  (phase_order: 1)
        │     ├── JobTask: "BIR compliance review"
        │     │     ├── JobActivity (ENTRY_TYPE_LABOR)
        │     │     │     ├── ActivityLabor.staff_id: "staff-taxmgr-luna"
        │     │     │     └── ActivityLabor.hours: 6.0
        │     │     └── TaskOutcome (criteria_type: CRITERIA_TYPE_PASS_FAIL)
        │     │           ├── pass_fail_value: true
        │     │           └── determination: DETERMINATION_PASS
        │     └── JobTask: "Monthly tax position memo"
        │           ├── JobActivity (ENTRY_TYPE_LABOR)
        │           │     ├── ActivityLabor.staff_id: "staff-partner-reyes"
        │           │     └── ActivityLabor.hours: 2.0
        │           └── TaskOutcome (criteria_type: CRITERIA_TYPE_PASS_FAIL)
        │                 ├── pass_fail_value: true
        │                 └── determination: DETERMINATION_PASS
        │
        └── PhaseOutcomeSummary
              ├── job_phase_id: FK → "Monthly Deliverables" phase
              ├── summary_type: SUMMARY_TYPE_GENERAL
              ├── phase_determination: OVERALL_DETERMINATION_ACCEPTED
              └── pass_count: 2 / total_criteria_count: 2

  ┌─────────────────────────────────────────────────────────────┐
  │  Job "Global Corp — Tax Advisory — Cycle 2 (Feb 2026)"     │
  │    ├── cycle_index: 1                                       │
  │    ├── cycle_period_start: "2026-02-01"                     │
  │    └── cycle_period_end: "2026-03-01"                       │
  └─────────────────────────────────────────────────────────────┘
        └── (same phase/task structure, new activities)
```

**Step-by-step walk-through:**

1. On Jan 1, `MaterializeCycleJobs` creates `job-taxadv-gc-c1` with `cycle_index = 0` and `cycle_period_start = "2026-01-01"`. The engagement shell remains perpetually `ACTIVE`; only cycle-instance Jobs are completed month by month.
2. Tax manager logs 6 hours on BIR compliance review. Partner logs 2 hours on the memo. Both activities are ENTRY_TYPE_LABOR, `billable_status = BILLABLE_STATUS_BILLABLE`.
3. `TaskOutcome` rows are recorded for each deliverable (compliance check passed, memo issued). `PhaseOutcomeSummary` is written at phase close.
4. End of January: billing run targets `cycle_period_start = "2026-01-01"`. Revenue of PHP 80,000 is recognized; `RevenueLineItem` rows are generated from the cycle Job's activities. Cycle Job transitions to `JOB_STATUS_COMPLETED`.
5. Feb 1: `MaterializeCycleJobs` fires again. `cycle_index = 1` Job created. Pattern repeats.

**End state:** 12 cycle Jobs per year, each with their own outcome records and billing trace. Engagement shell Job remains open for the year.

---

## Scenario 3: One-Off Audit Engagement

A new client engages the firm for a one-time financial statement audit. Single Job with four sequential phases: Planning → Fieldwork → Review → Report.

```
  ┌─────────────────────────────────────────────────────────────┐
  │  Job "Meridian Foods — Annual Audit FY2025"                 │
  │    ├── id: "job-aud-mf-2025"                                │
  │    ├── client_id: "clt-meridian-foods"                      │
  │    ├── origin_type: ORIGIN_TYPE_ORDER                       │
  │    ├── origin_id: "ord-aud-mf-2025"                         │
  │    ├── job_template_id: "tmpl-audit-standard-v3"            │
  │    ├── fulfillment_type: FULFILLMENT_TYPE_PROJECT           │
  │    ├── billing_rule_type: BILLING_RULE_TYPE_MILESTONE       │
  │    ├── planned_start: 2026-01-15                            │
  │    ├── planned_end: 2026-03-31                              │
  │    └── status: JOB_STATUS_ACTIVE                            │
  └─────────────────────────────────────────────────────────────┘
        │
        ├── JobPhase 1: "Planning"  (phase_order: 1, status: COMPLETED)
        │     ├── JobTask: "Understand client environment"
        │     ├── JobTask: "Prepare risk assessment"
        │     └── PhaseOutcomeSummary
        │           ├── phase_determination: OVERALL_DETERMINATION_ACCEPTED
        │           └── narrative: "Risk assessment complete; no going-concern flags"
        │
        ├── JobPhase 2: "Fieldwork"  (phase_order: 2, status: COMPLETED)
        │     ├── JobTask: "Test AR sampling (50 items)"
        │     │     ├── JobActivity (ENTRY_TYPE_LABOR)
        │     │     │     ├── ActivityLabor.staff_id: "staff-senior-delgado"
        │     │     │     └── ActivityLabor.hours: 20.0
        │     │     └── TaskOutcome (criteria_type: CRITERIA_TYPE_NUMERIC_SCORE)
        │     │           ├── numeric_value: 96.0   (% of items confirmed)
        │     │           └── determination: DETERMINATION_PASS
        │     ├── JobTask: "Test AP vouching (30 items)"
        │     │     └── JobActivity (ENTRY_TYPE_LABOR)
        │     │           └── ActivityLabor.hours: 12.0
        │     └── JobActivity: Engagement travel (ENTRY_TYPE_EXPENSE)
        │           ├── ActivityExpense.expense_category_id: "expcat-travel"
        │           ├── ActivityExpense.receipt_url: "https://receipts.../r-0441.pdf"
        │           └── JobActivity.total_cost: 850000  (centavos = PHP 8,500)
        │
        ├── JobPhase 3: "Review"  (phase_order: 3, status: ACTIVE)
        │     └── JobTask: "Partner review of workpapers"
        │           └── JobActivity (ENTRY_TYPE_LABOR)
        │                 ├── ActivityLabor.staff_id: "staff-partner-reyes"
        │                 └── ActivityLabor.hours: 8.0
        │
        └── JobPhase 4: "Report"  (phase_order: 4, status: PENDING)
              └── JobTask: "Issue signed audit opinion"
                    └── (pending phase 3 completion)
```

**Step-by-step walk-through:**

1. Engagement letter signed. Job created from template `tmpl-audit-standard-v3`. `billing_rule_type = BILLING_RULE_TYPE_MILESTONE` — billing fires at phase completions (Planning 20%, Fieldwork 60%, Report 20%).
2. Planning phase: staff hours logged. `PhaseOutcomeSummary` issued when phase closes (`phase_determination = OVERALL_DETERMINATION_ACCEPTED`). Milestone billing: 20% of total fee recognized.
3. Fieldwork: Senior auditor logs 20 hours on AR sampling. `TaskOutcome` captures a numeric score (96% confirmation rate). Travel expense logged as ENTRY_TYPE_EXPENSE via `ActivityExpense` with receipt URL and `expense_category_id`.
4. Review: partner logs 8 hours reviewing workpapers. No outcome required at this task — it gates the Report phase via `predecessor_phase_id`.
5. Report phase: upon issue of signed opinion, a `TaskOutcome` (CRITERIA_TYPE_PASS_FAIL) records partner sign-off. Final milestone billing fires: remaining 20% of fee + any T&M overages.
6. `JobOutcomeSummary` issued. `summary_type = SUMMARY_TYPE_COMPLIANCE_REPORT`. Job transitions to `JOB_STATUS_COMPLETED`.

**End state:** 4 phases, 3 `PhaseOutcomeSummary` rows (one per completed phase), multiple `JobActivity` rows (labor + expense), 2 `TaskOutcome` rows. Revenue recognized in 3 milestone tranches linked to Job's `cycle_period_start` for invoice matching.

---

## What's NOT a Job

- **Pure retainer billing with no tracked deliverables**: If the client pays a flat monthly fee and the firm does not track individual tasks or outcomes, a `Subscription` + `Revenue` cycle is sufficient. No `Job` needed.
- **Quick turnaround advice** (email response, phone call): A single `InventoryTransaction` (time entry) linked to the Subscription handles billing without spawning a Job.
- **Internal firm training**: Staff time logged as non-billable `JobActivity` on an internal Job (origin_type = ORIGIN_TYPE_INTERNAL) for utilization tracking — but no client Job is created.
