# Education Vertical - Proto Domain Mapping

This document maps the Esqyma proto domain model to **education** terminology — schools, academies, tutoring centers, and certificate programs that deliver curriculum to enrolled students and track per-student learning outcomes.

The core insight: **each student is a client of the school; each course-term enrollment is a Job; the master curriculum is a JobTemplate; per-student progress lives on per-student Jobs.**

---

## Quick Reference

| Schema Term | Education Term | Notes |
|---|---|---|
| `client` | **Student** | The learner (the person being served and billed) |
| `staff` | **Teacher / Instructor** | Firm employees who deliver instruction |
| `delegate` | **Parent / Guardian** | The adult responsible for the student's account |
| `admin` | **Principal / Department Head** | Back-office and academic management |
| `location` | **Campus / Building / Classroom** | Physical space where instruction is delivered |
| `group` | **Grade Level / Cohort / Section** | Grouping of students by academic level or class |
| `product` | **Subject / Course Type** | E.g., "Mathematics", "English Literature", "AP Chemistry" |
| `product_variant` | **Course Section** | E.g., "Algebra II - Section B - Period 3" |
| `collection` | **Curriculum Track / Program** | E.g., STEM, Arts, Honors, IB, College Prep |
| `resource` | **Lesson Plan Template / Assignment Template** | Reusable instructional materials attached to a course |
| `price_list` | **Tuition Schedule** | Campus- or term-specific tuition rates |
| `price_product` | **Course Fee** | Per-credit or per-term fee for a specific course type |
| `inventory_item` | **Teacher / Equipment** | A teacher registered at a campus, or tracked classroom equipment |
| `inventory_serial` | **Teacher Employee ID / Equipment Serial** | Individual teacher tracked by employee ID, or serial-tagged device |
| `inventory_transaction` | **Teacher Hours Logged / Equipment Check-out** | Instructor hours submitted per period, or equipment issued to a class |
| `inventory_depreciation` | **Teacher PD Time / Equipment Depreciation** | Non-instructional professional development hours or equipment write-down |
| `plan` | **Academic Program** | Degree program / certificate / continuing education track |
| `plan_location` | **Program Availability per Campus** | Which campuses offer which programs |
| `price_plan` | **Program Tuition Pricing** | Flat per-term or per-credit pricing for a full program |
| `subscription` | **Enrollment** | Student × program × term — the active enrollment contract |
| `license` | **Course Credit / Class Pass** | Individual course credits granted within an enrollment |
| `invoice` | **Tuition Invoice / Statement** | Per-term billing document sent to student or guardian |
| `balance` | **Student Account Balance** | Outstanding tuition owed or prepaid credit on account |
| `payment` | **Tuition Payment** | Payment applied against a tuition invoice |
| `event` | **Class Period / Lecture / Office Hours / Field Trip** | A scheduled instructional or extracurricular session |
| `event_client` | **Class Roster / Attendee** | Students attending a session |
| `event_product` | **Subject Being Taught** | Which course type is being delivered in this session |
| `revenue` | **Tuition Revenue** | Revenue recognized for a student's enrollment |
| `revenue_line_item` | **Tuition Line / Lab Fee / Materials Fee** | Individual charge components on a tuition invoice |
| `revenue_category` | **Revenue Stream** | Tuition / Lab Fees / Books / Activity Fees |
| `workflow` | **Academic Lifecycle** | Apply → enroll → matriculate → graduate (or withdraw) |
| `stage` | **Academic Stage** | Application / Enrolled / On-Leave / Graduated |
| `activity` | **Academic Activity** | Apply, register, drop a course, complete a module |
| `job` | **Course-Term Enrollment** | Alice's Algebra II enrollment, Spring 2026 (per-student instance) |
| `job_phase` | **Term / Module** | Q1, Q2, Q3, Q4 — Alice's progress through the curriculum |
| `job_task` | **Lesson / Assignment Instance** | Alice's Friday Quiz, Alice's Final Project |
| `job_activity` | **Per-Student Logged Event** | Homework submission, lab kit consumed, tutoring session |
| `activity_labor` | **Instructor Hours** | Billable tutoring or supplemental instruction hours |
| `activity_material` | **Lab Kit / Textbook Section Consumed** | Consumable materials issued to a student for a task |
| `activity_expense` | **Field Trip Ticket / External Fee** | Third-party cost attached to a student's job activity |
| `job_template` | **Master Curriculum / Master Syllabus** | The school's versioned Algebra II curriculum (not per-student) |
| `job_template_phase` | **Curriculum Module Template** | Q1 module definition in the master syllabus |
| `job_template_task` | **Master Lesson Plan** | Friday Quiz definition in the Q1 module |
| `outcome_criteria` | **Learning Standard** | Common Core, NGSS, IB rubric — external or internal standard |
| `template_task_criteria` | **Pinned Learning Standard** | Which standards are assessed by a given lesson plan |
| `task_outcome` | **Per-Student Assignment Grade** | Alice's score on the Friday Quiz |
| `phase_outcome_summary` | **Term Report** | Alice's Q1 progress report |
| `job_outcome_summary` | **Course Report Card** | Alice's final Algebra II grade for Spring 2026 |
| `job_settlement` | **Tuition Reconciliation** | Final financial settlement for Alice's course enrollment |

---

## Domain Deep Dive

### Entity Domain → Students, Teachers, Schools

```
┌──────────────────────────────────────────────────────────┐
│  THE SCHOOL                                               │
│                                                           │
│  staff           → Teacher, Instructor, Tutor             │
│  admin           → Principal, Department Head, Registrar  │
│  workspace       → The School / Academy / Institution     │
│                                                           │
│  THE STUDENT (and their guardian)                         │
│                                                           │
│  client          → Alice Chen (the student, age 16)       │
│  delegate        → Mr. & Mrs. Chen (the parents)          │
│  delegate_client → Links guardian(s) to student record    │
│                                                           │
│  CAMPUSES AND CLASSROOMS                                  │
│                                                           │
│  location        → Main Campus, North Campus, Room 204    │
│  group           → "Grade 10", "Honors Cohort", "Section B"│
│                                                           │
│  ACCESS                                                   │
│                                                           │
│  role            → Teacher, Tutor, Admin, Registrar       │
│  permission      → can_grade, can_enroll, can_view_roster  │
└──────────────────────────────────────────────────────────┘
```

The `client.customer_type` field maps naturally to student tiers: `"retail"` → general enrollment (standard tuition), `"wholesale"` → group/corporate training programs, `"vip"` → scholarship / financial aid track.

Guardians (`delegate`) are the billing counterparty for minors. The `delegate_client` join table supports multiple guardians per student (divorced parents, legal guardians, sponsors).

### Product Domain → Subjects, Sections, Curriculum

The key conceptual shift: **the "product" is a subject area; a "product variant" is a specific section of that subject.**

```
┌──────────────────────────────────────────────────────────┐
│  CURRICULUM HIERARCHY                                     │
│                                                           │
│  collection (parent)  → Program: "STEM Track"             │
│    └── collection     → Subject Area: "Mathematics"       │
│         └── collection → Level: "Algebra"                 │
│                                                           │
│  SUBJECTS (what you're selling)                           │
│                                                           │
│  product              → "Algebra II"                      │
│    ├── product.price  → Base tuition: $450/term           │
│    ├── product_variant → "Algebra II - Section A - Rm 101"│
│    │    └── sku       → "MATH-ALG2-A-SP26"                │
│    ├── product_variant → "Algebra II - Section B - Rm 204"│
│    │    └── sku       → "MATH-ALG2-B-SP26"                │
│    └── resource       → Syllabus PDF, assignment templates │
│                                                           │
│  product              → "AP Chemistry"                    │
│    ├── product.price  → Base tuition: $600/term (AP fee)  │
│    └── product_variant → "AP Chem - Section A - Lab"      │
│                                                           │
│  TUITION PRICING                                          │
│                                                           │
│  price_list           → "2026 Spring Tuition - Main Campus"│
│    ├── price_product  → Algebra II @ $450/term            │
│    ├── price_product  → AP Chemistry @ $600/term          │
│    ├── price_product  → PE / Elective @ $200/term         │
│    └── price_product  → Full-Year Program @ $4,800        │
│                                                           │
│  price_list           → "2026 Spring - Scholarship Rate"  │
│    └── price_product  → Any course @ $0 (covered)         │
└──────────────────────────────────────────────────────────┘
```

The `price_list.location_id` ties a tuition schedule to a campus, enabling different rates for main campus vs. satellite campuses. `date_start` / `date_end` support annual tuition renewals.

### Operations Domain → Course-Term Jobs (Per-Student Execution)

This is the critical domain for education. The operations model captures per-student academic execution: which tasks each student completed, what materials they consumed, and what grades they earned.

**The cardinality rule:** one Job per (student × course × term). Alice's Algebra II Spring 2026 is one Job. Bob's Algebra II Spring 2026 is a separate Job. They share the same `job_template_id` (the master Algebra II curriculum), but each has their own phases, tasks, and outcomes.

```
┌──────────────────────────────────────────────────────────┐
│  ONE TEACHER'S CLASS                                      │
│                                                           │
│  job_template       → "Algebra II Curriculum v3"          │
│    ├── job_template_phase → "Q1 Module" / "Q2 Module" /..│
│    └── job_template_task  → "Friday Quiz" / "Final Exam"  │
│                                                           │
│  PER-STUDENT INSTANCES                                    │
│                                                           │
│  job (Alice's Algebra II Spring 2026)                     │
│    ├── client_id: FK to Alice                             │
│    ├── origin_id: FK to Alice's enrollment Subscription   │
│    ├── job_template_id: FK to "Algebra II Curriculum v3"  │
│    └── job_phase × 4 (Alice's Q1..Q4 progress)            │
│         └── job_task × N (Alice's quiz attempts)          │
│                                                           │
│  job (Bob's Algebra II Spring 2026)                       │
│    └── (parallel structure, Bob's instance)               │
│                                                           │
│  job (... × 30 students)                                  │
│                                                           │
│  TEACHER'S "CLASS VIEW" QUERY                             │
│                                                           │
│  WHERE job.job_template_id = AlgebraII_v3                 │
│  AND   job.cycle_period_start <= '2026-06-01'             │
│  AND   job.cycle_period_end   >= '2026-01-01'             │
│  → returns all 30 student-jobs                            │
└──────────────────────────────────────────────────────────┘
```

**JobActivity in education** captures per-student events that are either financial (lab kit issued, field trip fee) or academic (homework submission, tutoring session). The three typed sub-rows map cleanly:

| Sub-entity | Education Use | Example |
|---|---|---|
| `activity_labor` | Billable instructor time (tutoring, supplemental) | "30 min tutoring session with Ms. Garcia" |
| `activity_material` | Consumable issued to student | "Lab kit #4 issued (titration supplies)" |
| `activity_expense` | External fee charged to student's job | "PSAT exam fee $18.00" |

**Outcome tracking** closes the loop between curriculum delivery and grading:

| Entity | Education Meaning |
|---|---|
| `outcome_criteria` | Learning standard (e.g., "CCSS.MATH.7.EE.B.4 — Solve word problems") |
| `template_task_criteria` | Which standards are assessed by "Friday Quiz Week 3" |
| `task_outcome` | Alice's score on that quiz: 87/100, PROFICIENT |
| `phase_outcome_summary` | Alice's Q1 term report (GPA contribution, attendance) |
| `job_outcome_summary` | Alice's final Algebra II report card for Spring 2026 |

### Subscription Domain → Enrollment

```
┌──────────────────────────────────────────────────────────┐
│  ENROLLMENT STRUCTURE                                     │
│                                                           │
│  plan                → "High School Full Program"         │
│    ├── description   → 6-course load per term             │
│    ├── plan_location → Available at Main Campus           │
│    ├── fulfillment_type → "schedule" (term-based)         │
│    └── collection_plan → Links to "College Prep Track"    │
│                                                           │
│  price_plan          → "Full Program - Annual 2026"        │
│    ├── plan_id       → FK to HS Full Program              │
│    ├── amount        → 960000 (centavos = $9,600/year)    │
│    ├── duration_unit → "year"                             │
│    ├── duration_value→ 1                                  │
│    └── templates     → enrollment confirmation, invoice   │
│                                                           │
│  price_plan          → "Per-Term Enrollment"              │
│    ├── amount        → 250000 (centavos = $2,500/term)    │
│    ├── duration_unit → "month"                            │
│    └── duration_value→ 4 (one academic term)              │
│                                                           │
│  subscription        → Alice Chen's active enrollment     │
│    ├── client_id     → FK to Alice Chen (student)         │
│    ├── price_plan_id → FK to Full Program pricing         │
│    ├── date_start    → 2026-01-06 (term start)            │
│    ├── date_end      → 2026-06-13 (term end)              │
│    └── metadata      → {"grade": "10", "track": "honors"} │
│                                                           │
│  license             → Individual course credit           │
│    └── granted within subscription (e.g., 6 credits/term) │
└──────────────────────────────────────────────────────────┘
```

The `subscription` is the financial anchor for a student's term. When a student drops a course or takes a leave of absence, the subscription status changes — and the associated Job for each dropped course is closed or paused accordingly.

### Payment & Revenue → Tuition Billing

```
┌──────────────────────────────────────────────────────────┐
│  TUITION BILLING FLOW                                     │
│                                                           │
│  invoice             → Spring 2026 Tuition Statement      │
│  revenue_line_item   → Algebra II tuition: $450           │
│                        AP Chemistry tuition: $600         │
│                        Lab fee (AP Chem): $75             │
│                        Activity fee: $50                   │
│  revenue_category    → Tuition / Lab Fees / Activity Fees │
│  balance             → Alice's account balance: $0 (paid) │
│  payment             → ACH payment received $1,175        │
└──────────────────────────────────────────────────────────┘
```

Revenue recognition in education is typically **at enrollment** (tuition is pre-billed for the term). Lab fees and materials fees may be recognized at point-of-consumption (when the `activity_material` is logged). Activity fees (field trips) are recognized when the event occurs.

### Event Domain → Class Sessions and School Events

| Schema | Education Example |
|---|---|
| `event` | "Algebra II - Section B - Tuesday Jan 14, Period 3" (class session) |
| `event_client` | 28 enrolled students (the roster for that class period) |
| `event_product` | "Algebra II" (the subject being delivered) |
| `event_settings` | Billable: no (covered by enrollment), Location: Room 204 |
| `event_recurrence` | Every Tuesday and Thursday, Period 3, through June 2026 |

Field trips, guest lectures, and parent-teacher conferences are also modeled as `event` records. Charged field trips generate `activity_expense` entries on affected student Jobs.

### Workflow Domain → Academic Lifecycle

```
┌──────────────────────────────────────────────────────────┐
│  ACADEMIC LIFECYCLE                                       │
│                                                           │
│  workflow_template   → "High School Academic Year"        │
│  workflow            → "Alice Chen - Grade 10 - 2025-26"  │
│                                                           │
│  stage 1: Application                                     │
│    ├── activity: "Submit application form"                │
│    ├── activity: "Upload transcripts"                     │
│    └── activity: "Placement testing"                      │
│                                                           │
│  stage 2: Enrolled                                        │
│    ├── activity: "Select courses"                         │
│    ├── activity: "Pay tuition deposit"                    │
│    └── activity: "Receive class schedule"                 │
│                                                           │
│  stage 3: In-Session                                      │
│    ├── activity: "Attend classes" (via event records)     │
│    ├── activity: "Submit assignments" (via job_task)      │
│    └── activity: "Complete term exams"                    │
│                                                           │
│  stage 4: Term Close                                      │
│    ├── activity: "Grade finalization"                     │
│    ├── activity: "Generate report cards"                  │
│    └── activity: "Tuition reconciliation"                 │
│                                                           │
│  stage 5: Graduated / Continued                           │
│    ├── activity: "Transcript issuance"                    │
│    └── activity: "Re-enrollment (next term)"              │
└──────────────────────────────────────────────────────────┘
```

---

## Sample Data Scenarios

Detailed seed scenarios are organized by domain in separate files (maintained by the scenarios agent):

| Domain | File | Scenarios |
|---|---|---|
| **Subscription** | [scenarios/subscription.md](scenarios/subscription.md) | New student enrollment, mid-term course drop, financial aid adjustment |
| **Operations** | [scenarios/operations.md](scenarios/operations.md) | Per-student job creation from template, grading a quiz, Q1 term report rollup |
| **Revenue** | [scenarios/revenue.md](scenarios/revenue.md) | Term tuition invoice, lab fee at consumption, field trip fee, credit note for dropped course |
| **Client** | [scenarios/client.md](scenarios/client.md) | New student onboarding, adding guardian, transferring between campuses |
| **Product** | [scenarios/product.md](scenarios/product.md) | New course type, creating sections, curriculum template versioning |
| **Plan** | [scenarios/plan.md](scenarios/plan.md) | Academic program creation, program tuition tier setup, multi-campus availability |

---

## Status-Driven Flow: Enrollment → Job → Report Card

In education, the academic execution lifecycle flows from enrollment (Subscription) through per-student job execution (Job) to final outcomes (JobOutcomeSummary and revenue settlement).

### Enrollment to Job Creation

```
Guardian registers      ┌──────────────┐
student for term ──────▶ │  subscription │ Alice's enrollment
                         │  (ACTIVE)    │ Spring 2026
                         └──────┬───────┘
                                │  on enrollment activation
                                ▼
                         ┌──────────────┐
                         │  job created │ Alice's Algebra II
                         │  per course  │ Spring 2026
                         └──────┬───────┘ client_id: Alice
                                │         origin_id: Subscription
                                │         template_id: AlgII_v3
                                ▼
                    job_phase × 4 created
                    (Q1, Q2, Q3, Q4 from template)
                         │
                         ▼
                    job_task × N created per phase
                    (Friday Quizzes, Mid-Term, Final from template)
```

### In-Session: Assignment Grading

```
Quiz administered       ┌──────────────┐
(event record) ────────▶ │  job_task    │ Alice: Friday Quiz Week 3
                         │  (ACTIVE)   │ template_task_id: Quiz_W3
                         └──────┬───────┘
                                │
Graded by teacher               ▼
                         ┌──────────────┐
                         │ task_outcome │ Alice: 87/100
                         │  created     │ status: PROFICIENT
                         └──────┬───────┘ criteria: CCSS.MATH.7.EE.B.4
                                │
                                ▼
                    job_task.status → COMPLETED
```

### Term Close: Report Card Rollup

```
Term ends               ┌────────────────────┐
                         │ phase_outcome_summary│ Alice: Q1 Report
                         │ generated           │ avg grade: 89%
                         └──────┬──────────────┘
                                │ (repeated for Q2, Q3, Q4)
                                ▼
                         ┌────────────────────┐
                         │ job_outcome_summary │ Alice: Final Report Card
                         │ generated           │ Algebra II: A- (92%)
                         └──────┬──────────────┘
                                │
                                ▼
                         ┌──────────────┐
                         │ job_settlement│ Tuition reconciliation
                         │ (SETTLED)    │ Any lab/materials fees
                         └──────────────┘ finalized against invoice
```

### Term Report Card State Machine

```
                    ┌──────────────────────────────────────────────┐
                    │                                              │
                    ▼                                              │
    ┌──────────┐         ┌────────────┐         ┌──────────────┐  │
    │  DRAFT   │────────▶│ IN_PROGRESS│────────▶│   COMPLETED  │  │
    │(enrolled)│         │(term active│         │(grades final)│  │
    └──────────┘         └─────┬──────┘         └──────┬───────┘  │
                               │                       │          │
                               │ (drop course)         ▼          │
                               ▼                  ┌──────────┐    │
                          ┌──────────┐            │ SETTLED  │    │
                          │  CLOSED  │            │(fin. rec.)│───┘
                          │(withdrew)│            └──────────┘
                          └──────────┘
```

---

## Key Design Decisions

- **Student = Client, Guardian = Delegate**: The student is always the `client` — the party being served and the subject of all job/outcome records. The guardian is a `delegate` — the billing and communication contact. This separates academic tracking from financial responsibility cleanly.
- **One Job per (student × course × term)**: No polymorphic keys or junction tables. `Job.client_id` = the student; `Job.origin_id` = their enrollment subscription; `Job.job_template_id` = the master curriculum. `parent_job_id` is used only for shared/master work (e.g., a group project job linked to a master job).
- **Tuition is pre-billed; job tracks execution**: Revenue is recognized at enrollment (or by period if deferred). The Job/JobActivity system tracks *academic* execution — grades, materials consumed, extra fees — not the primary tuition revenue event. This keeps the financial and academic ledgers cleanly separated.
- **JobTemplate versioning enables curriculum updates**: When the school revises Algebra II mid-year, a new template revision is created (`DRAFT` → `PUBLISHED`). Students enrolled before the revision keep their jobs pinned to the old revision. New enrollments use the new revision. `supersedes_template_id` maintains the audit trail.
- **Teacher as inventory_item**: Instructors are modeled as `inventory_item` (type: `serialized`) at a campus location. Instructor hours logged via `inventory_transaction` support utilization reporting and (for tutoring contexts) billable time → `revenue_line_item` flows identical to professional services.

---

## Proto Gaps for Education (deferred — not blocking v1)

Surfaced during the verticals sense-check: education works with the existing proto stack, but four small enrichments would make it cleaner. None are required to ship — they're future polish.

### 1. Course capacity / seat limits

**Gap.** `ProductVariant` has no `max_seats` or capacity field. Today the section-capacity constraint must be tracked via a `ProductVariantOption` "capacity" attribute or external app-layer logic. There's no schema-level enforcement that "Section B Period 3" stops accepting enrollments at 30 students.

**Proposed.** A `product_section_capacity` entity OR an optional `ProductVariant.max_capacity int32` field. Capacity check fires at the use-case layer when a new Subscription targets a sold-out variant.

**Why it matters.** Over-enrollment in a section forces manual operator cleanup. Schema-level enforcement prevents the silent-failure scenario.

### 2. Prerequisite enforcement

**Gap.** Course prerequisites (must complete Algebra I before Algebra II) are not enforced at the `Plan → ProductPlan` layer. `JobTemplate.supersedes_template_id` is for curriculum versioning, not prerequisites.

**Proposed.** A `plan_prerequisite` junction table:

```proto
message PlanPrerequisite {
  string id = 1;
  string plan_id = 2 [(options.v1.db).references = "plan", (options.v1.db).index = true];
  string prerequisite_plan_id = 3 [(options.v1.db).references = "plan", (options.v1.db).index = true];
  bool required = 4;  // hard requirement vs recommendation
  optional double minimum_grade = 5;  // e.g., 70.0 = "C" or higher in prerequisite
}
```

**Why it matters.** Prerequisite-driven enrollment routing (a foundational concept in degree programs and certifications) needs structural support. Without it, registrars enforce manually.

### 3. Teacher fan-out write pattern

**Gap.** When a teacher logs one hour of instruction, the system must write **one `JobActivity + ActivityLabor` row per student-Job** — 30 writes per class period for a class of 30. This is *correct* for per-student cost attribution but creates write amplification that's painful at the use-case layer.

**Proposed.** Either:
- A dedicated `BulkLogClassActivity` use case that fans out a single operator action into N rows in one transaction
- OR a `ClassEvent` aggregate entity (NEW) that holds the shared event metadata once + a polymorphic discriminator on JobActivity to reference it

**Why it matters.** Teacher-side ergonomics and DB write throughput. Without batch handling, a daily attendance + grading workflow generates O(students × tasks × teachers × days) rows naively.

### 4. Attendance as a TaskOutcome type

**Gap.** Current `CriteriaType` enum has no `ATTENDANCE` value. Daily attendance is currently modeled as `CRITERIA_TYPE_PASS_FAIL` (present = PASS, absent = FAIL), which works but loses nuance:
- Late
- Excused absence (doctor's note)
- Unexcused absence
- Tardy returning from break

**Proposed.** Extend `CriteriaType` enum:

```proto
enum CriteriaType {
  // ... existing values ...
  CRITERIA_TYPE_ATTENDANCE_STATUS = N;  // categorical: present|tardy|excused|unexcused
}
```

OR a dedicated `AttendanceRecord` entity if the per-day, per-student volume warrants it (a school of 1000 students × 180 days × 6 periods = ~1M rows/year — fine in PG, but a dedicated entity simplifies attendance reports).

**Why it matters.** Attendance is a first-class compliance and reporting concern in K-12 (state reporting, average daily attendance funding). Burying it in PASS_FAIL constrains downstream reporting.

---

These four gaps are **independent** — each can land separately. None block the education vertical from working with the current proto. Recommend addressing in this order if/when an education customer ships:
1. Attendance enum (smallest; instant categorical reporting)
2. Course capacity (prevents over-enrollment incidents)
3. Prerequisite enforcement (structural; needs plan-graph design)
4. Teacher fan-out (performance optimization; defer until volumes warrant)

---

## Universal Job Model — applicability to education

The `operation/` proto domain is being generalised under `docs/plan/20260427-universal-job-model/` to handle service / project / maintenance / production work from one schema. Wave 1 (already complete locally) added the enum values `PLANNED`, `RELEASED`, `EQUIPMENT`, `SUBCONTRACT`, `HOLD`, `REWORK`, plus JobTemplate versioning and Job output-target fields. Waves 2–4 add nine new entities. Education is a **moderate beneficiary** — the per-(student × course × term) Job model uses the universal core; the new entities mainly improve cost-of-delivery analysis and credential issuance, not core enrolment flow.

| New entity (Wave) | Relevance to education | Example |
|---|---|---|
| `job_template_input` (W2) | 🟡 Medium — "Course-term expected inputs" | "Chemistry Lab II — Spring 2026 expects 1 instructor × 60h + 1 lab kit per student + 1 chem-prep tech × 10h + 1 lab room × 90 sessions." Drives cost-of-delivery analysis per program. |
| `job_template_input_alternate` (W2) | ⚪ Low | (occasional — substitute instructor pools) |
| `lot` (W2) | ⚪ Low | (only for science-lab chemical inventory) |
| `job_input_plan` (W3) | 🟡 Medium — term budget freeze at registration | When a student × course × term Job is RELEASED at registration, the planned material/instructor costs are frozen; variance reports support next-year budgeting. |
| `task_interruption` (W3) | ⚪ Low | (rare — class cancellations) |
| `job_output` (W4) | 🟢 High — grades, transcripts, certificates | `output_kind=DELIVERABLE` for graded artefacts; `output_kind=MILESTONE` for course completion; the eventual transcript is a roll-up across many term-Jobs. |
| `job_cost_ledger_entry` (W4) | ⚪ Low | (tuition pre-billed; little WIP — would matter for cost-allocation studies but not financial close) |
| `job_cost_snapshot` (W4) | ⚪ Low | (n/a — no significant WIP) |
| `job_plan_deviation` (W4) | ⚪ Low | (mostly applicable to administrative cost analysis, not financial reporting) |

**Surface area for education UI:** Course-term Job detail gains a "Resources expected" panel from `job_template_input`; Student Detail gains a "Term cost analysis" tab (administrative use only, not student-facing); the existing `task_outcome` → `job_outcome_summary` Quality-Report path becomes the natural home for the term report card and transcript (`SummaryType.ACADEMIC_RECORD` already exists in the enum).

**Why financial close stays the same:** education is mostly pre-billed (tuition recognised over the term via the existing subscription / revenue-recognition path). Wave 4's WIP ledger doesn't add a financial-close capability that education needs. It does add an **academic-resource cost-allocation** capability that ministries-of-education and accreditation bodies often want (cost-per-credit by program). Whether to surface that depends on the customer.

**Lyngua tier-3 keys to author** (under `packages/lyngua/translations/en/education/`):
- `job_template_input.json` → "Course resources" / "Per-section requirements"
- `job_output.json` → "Academic record" (kinds: "Grade", "Term Report", "Transcript", "Certificate")
- `job_plan_deviation.json` → "Resource variance" (administrative)

**See:** `packages/esqyma/verticals/manufacturing/README.md` for the canonical facade example. The same proto fields, rendered under `lyngua/translations/en/manufacturing/`, become BOM-and-Routing / WIP / Variance.
