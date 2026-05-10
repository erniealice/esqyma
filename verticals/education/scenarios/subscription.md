# Education Scenarios: Subscription (Enrollment Lifecycle)

In education, a `Subscription` is an enrollment — one student in one program for one term. `Subscription.origin_id` carries the parent enrollment shell (engagement-shell pattern); each term cycle spawns child Job instances via `MaterializeCycleJobs`, one per course the student is taking. No junction table needed.

---

## Student Enrollment — Grade 10 Program

```
Step 1: Student applies and is accepted

  Client: "clt-alicia-mendoza"  (student record from client.md)

Step 2: Enrollment subscription created

  ┌────────────────────────────────────────────────────────────┐
  │  Subscription "Alicia Mendoza — Grade 10 AY 2026-2027"     │
  │    ├── id: "sub-alicia-g10-2026"                           │
  │    ├── client_id: "clt-alicia-mendoza"                     │
  │    ├── price_plan_id: "pp-g10-regular"   (PHP 60,000/term) │
  │    ├── date_start: "2026-06-01"                            │
  │    ├── date_end: "2027-03-31"                              │
  │    ├── active: true                                        │
  │    └── metadata: {                                         │
  │         "school_year": "2026-2027",                        │
  │         "term": "1st_semester",                            │
  │         "section": "10-Rizal",                             │
  │         "campus": "loc-main-makati"                        │
  │       }                                                    │
  └────────────────────────────────────────────────────────────┘
```

---

## Auto-Spawn Jobs — Term Cycle → Course Jobs

Each billing cycle of the enrollment `Subscription` triggers `MaterializeCycleJobs`. For a student enrolled in 6 courses, 6 cycle-instance Jobs are created — one per course section, all sharing the same `cycle_period_start`.

```
Term 1 cycle spawns (cycle_period_start: "2026-06-01"):

  Subscription "sub-alicia-g10-2026"
        │
        │  MaterializeCycleJobs fires at term start
        ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Engagement shell Job (parent — one per program per term)   │
  │    ├── id: "job-shell-alicia-g10-t1"                        │
  │    ├── client_id: "clt-alicia-mendoza"                      │
  │    ├── origin_type: ORIGIN_TYPE_SUBSCRIPTION                │
  │    ├── origin_id: "sub-alicia-g10-2026"                     │
  │    ├── parent_job_id: NULL  (engagement shell)              │
  │    └── cycle_index: 0                                       │
  └─────────────────────────────────────────────────────────────┘
        │
        ├── Job "Alicia — Algebra II Sec B — Term 1"
        │     ├── id: "job-alicia-alg2-t1"
        │     ├── client_id: "clt-alicia-mendoza"
        │     ├── parent_job_id: "job-shell-alicia-g10-t1"
        │     ├── job_template_id: "tmpl-algebra2-secb-v3"
        │     ├── cycle_index: 0
        │     └── cycle_period_start: "2026-06-01"
        │
        ├── Job "Alicia — Chemistry — Term 1"
        │     ├── id: "job-alicia-chem-t1"
        │     ├── job_template_id: "tmpl-chemistry-secc-v2"
        │     └── cycle_period_start: "2026-06-01"
        │
        ├── Job "Alicia — English 10 — Term 1"
        │     └── job_template_id: "tmpl-english10-seca-v4"
        │
        ├── Job "Alicia — Filipino 10 — Term 1"
        │     └── job_template_id: "tmpl-filipino10-secb-v2"
        │
        ├── Job "Alicia — Philippine History — Term 1"
        │     └── job_template_id: "tmpl-ph-history-seca-v1"
        │
        └── Job "Alicia — PE 10 — Term 1"
              └── job_template_id: "tmpl-pe10-secb-v3"

Term 2 cycle spawns (cycle_period_start: "2026-11-01"):
  └── Same pattern, 6 new cycle-instance Jobs, cycle_index: 1
```

**Key insight**: One enrollment `Subscription` → 6 course Jobs per term. Each course Job carries the same `cycle_period_start` so the term's invoice matches all jobs by joining on `(origin_id, cycle_period_start)`.

---

## Subscription Status Lifecycle

```
Enrollment Subscription state transitions:

  DRAFT
    │  (admission accepted, payment not yet received)
    ▼
  PENDING
    │  (payment confirmed or scholarship approved)
    ▼
  ACTIVE ──────────────────────────────────────────┐
    │  (term in progress; Jobs are being executed)  │
    │                                               │
    │  Student goes on leave of absence             │
    ▼                                               │
  PAUSED                                            │
    │  (Jobs paused; billing suspended)             │
    └───────────────────────────────────────────────┘
    │  Term completes / student graduates
    ▼
  COMPLETED
    │  (all Jobs completed; JobOutcomeSummary rows exist)
    ▼
  CLOSED  (enrollment archived; financial year-end closed)
```

---

## Scholarship / Financial Aid Override

```
Student receives 50% tuition scholarship mid-year:

  Original Subscription:
    price_plan_id: "pp-g10-regular"  (PHP 60,000/term)
    status: ACTIVE

  Action: Update subscription to scholar price plan
    price_plan_id: "pp-g10-scholar-50"  (PHP 30,000/term)
    metadata.scholarship_ref: "CHED-SCHOLAR-2026-0441"

  Or: Create a credit Revenue adjustment
    RevenueLineItem.line_item_type: "discount"
    RevenueLineItem.total_price: -3000000  (−PHP 30,000 credit)
```

---

## Transfer Student — Mid-Term Enrollment

```
Transfer student Marco Villanueva enrolls mid-term (August):

  Subscription:
    ├── client_id: "clt-marco-villanueva"
    ├── price_plan_id: "pp-g10-regular"
    ├── date_start: "2026-08-01"   (mid-term entry)
    ├── date_end: "2026-10-31"
    └── metadata.transfer_student: "true"

  Pro-rated billing:
    Revenue cycle covers Aug 1–Oct 31 only.
    PricePlan billing cycle aligns to the subscription date_start.
    First RevenueLineItem is pro-rated to 3 months of 4-month term.

  Jobs spawned:
    6 course Jobs created with cycle_period_start: "2026-08-01".
    Each JobTemplate already has completed phases (Aug–Oct) from
    the original class. Teacher marks prior phases as SKIPPED or
    TASK_STATUS_SKIPPED for the transfer student's catch-up plan.
```

---

## What's NOT a Subscription

- **Student clubs and extra-curricular activities** (no fee): No subscription needed. An `Event` with `EventClient` rows suffices for tracking attendance.
- **One-time exam enrollment** (e.g., make-up exam): A single `Job` with `origin_type = ORIGIN_TYPE_AD_HOC` is sufficient. No subscription.
- **Alumni relations**: Alumni are not enrolled students. Their continued relationship is tracked via `ClientAttribute` rows (`key="alumni_year"`) on the archived `Client` record — no active subscription.
