# Education Scenarios: Operations (Job Lifecycle)

In education, every (student × course section × term) combination is a separate Job. The fundamental model: **one Job per student per course per term**. Thirty students in one section produce thirty Jobs — not one shared Job. What they share is the `JobTemplate` (the curriculum). This architecture makes per-student attribution, grade records, and class-level aggregation fall out naturally from the same data model with no special case logic.

---

## Architecture Overview

```
JobTemplate "Algebra II Curriculum v3"
  ├── id: "tmpl-algebra2-curriculum-v3"
  ├── template_code: "MATH-ALG2-CURR"
  ├── revision: 3
  └── version_status: VERSION_STATUS_PUBLISHED
        │
        │  Instantiated once per student per section per term
        ▼
  Job "Alice — Algebra II Sec B — Term 1 2026"     ← Alice's Job
  Job "Bob — Algebra II Sec B — Term 1 2026"       ← Bob's Job
  Job "Carol — Algebra II Sec B — Term 1 2026"     ← Carol's Job
  ...  (27 more Jobs, one per student in Section B)
  Job "Alice — Algebra II Sec A — Term 1 2027"     ← Alice retakes (new term)
```

**The "30 students, 1 template, 30 Jobs" contract is the core invariant.** Teacher views are aggregate queries across all Jobs sharing the same `job_template_id` + `cycle_period_start`. Student views are single-Job queries filtered by `client_id`.

---

## Scenario 1: Daily Class Period — Instructor Hours

The teacher logs daily attendance and instructional hours as `JobActivity` rows. Because each student has their own Job, the teacher's time is logged **once per class period** on a shared activity target (the section's combined labor entry), not 30 times.

```
  ┌─────────────────────────────────────────────────────────────┐
  │  Job "Alice — Algebra II Sec B — Term 1 2026"               │
  │    ├── id: "job-alice-alg2-secb-t1"                         │
  │    ├── client_id: "clt-alice-reyes"                         │
  │    ├── job_template_id: "tmpl-algebra2-curriculum-v3"       │
  │    ├── cycle_period_start: "2026-06-01"                      │
  │    ├── cycle_period_end: "2026-10-31"                        │
  │    ├── fulfillment_type: FULFILLMENT_TYPE_SERVICE            │
  │    └── billing_rule_type: BILLING_RULE_TYPE_INCLUDED        │
  └─────────────────────────────────────────────────────────────┘
        │
        └── JobPhase "Q1 — June–July"  (phase_order: 1)
              │
              ├── JobTask "Week 1 — Day 1 (June 2)"  (step_order: 1)
              │     ├── status: TASK_STATUS_COMPLETED
              │     └── JobActivity (ENTRY_TYPE_LABOR)
              │           ├── ActivityLabor.staff_id: "staff-mr-santos"
              │           │     (the teacher — same staff_id across all 30 student Jobs)
              │           ├── ActivityLabor.hours: 1.0
              │           │     (1 class period = 1 hour)
              │           ├── ActivityLabor.time_start: 2026-06-02T08:00
              │           └── ActivityLabor.time_end: 2026-06-02T09:00
              │
              ├── JobTask "Week 1 — Day 2 (June 3)"
              │     └── JobActivity (ENTRY_TYPE_LABOR) — same pattern
              │
              └── ... (45 more school days in Q1)
```

**Teacher's daily workflow:**
1. After class, teacher opens the section's activity log (aggregated view across all 30 student Jobs for Section B).
2. Logs 1 hour of instruction time. The UI creates one `JobActivity + ActivityLabor` row **per student Job** in Section B (30 writes), all with `ActivityLabor.staff_id = "staff-mr-santos"`.
3. Total instructor hours aggregated for payroll: `SUM(al.hours) / 30` where `job_template_id = 'tmpl-algebra2-curriculum-v3'` and `cycle_period_start = '2026-06-01'` gives 1 hour per class meeting (the per-student rows are parallel copies; divide by section size for unique hours).

**Important note on labor logging**: In practice, the teacher logs hours **once** and the system fans out the write to each student Job. The fan-out ensures per-student cost attribution (for any T&M or cost-tracking scenario). For flat-fee programs, `billing_rule_type = BILLING_RULE_TYPE_INCLUDED` so no additional revenue is generated per activity.

---

## Scenario 2: Friday Quiz — Administration, Grading, and Per-Student Outcomes

This scenario is the clearest demonstration of per-student attribution. One `JobTemplateTask` called "Friday Quiz" exists in the master curriculum. When the template is instantiated, each student's Job gets its own `JobTask` instance with its own `TaskOutcome`.

```
JobTemplate "Algebra II Curriculum v3"
  └── JobTemplatePhase "Q1"
        └── JobTemplateTask "Friday Quiz — Week 2"
              ├── id: "tmpl-task-friday-quiz-wk2"
              │   (this is the SHARED MASTER task definition)
              ├── name: "Friday Quiz — Week 2"
              ├── step_order: 5
              └── estimated_duration_minutes: 30

Per-student instances (created when Jobs are materialized):

  Job "Alice" → JobPhase "Q1" → JobTask "Friday Quiz — Week 2"
    ├── id: "jtask-alice-friday-quiz-wk2"
    ├── template_task_id: "tmpl-task-friday-quiz-wk2"  ← FK to master
    ├── status: TASK_STATUS_COMPLETED
    └── TaskOutcome
          ├── id: "toc-alice-fq-wk2"
          ├── job_task_id: "jtask-alice-friday-quiz-wk2"
          ├── criteria_type: CRITERIA_TYPE_NUMERIC_SCORE
          ├── numeric_value: 88.0    (Alice's score: 88/100)
          ├── determination: DETERMINATION_PASS
          │     (auto-computed: 88 ≥ threshold of 75 → PASS)
          ├── determination_source: DETERMINATION_SOURCE_AUTO_COMPUTED
          └── recorded_by: "staff-mr-santos"

  Job "Bob" → JobPhase "Q1" → JobTask "Friday Quiz — Week 2"
    ├── id: "jtask-bob-friday-quiz-wk2"
    ├── template_task_id: "tmpl-task-friday-quiz-wk2"  ← same master
    └── TaskOutcome
          ├── numeric_value: 72.0    (Bob's score: 72/100)
          └── determination: DETERMINATION_FAIL  (72 < 75 threshold)

  Job "Carol" → JobPhase "Q1" → JobTask "Friday Quiz — Week 2"
    └── TaskOutcome
          ├── numeric_value: 95.0    (Carol's score: 95/100)
          └── determination: DETERMINATION_PASS

  ... (27 more JobTask + TaskOutcome pairs)
```

**Teacher's grading workflow:**
1. After quiz, teacher opens Section B grade entry screen (shows all 30 students' `JobTask` rows for "Friday Quiz Week 2").
2. Teacher enters each score. System creates one `TaskOutcome` per student with `numeric_value` = score.
3. `CriteriaThreshold` records define the passing boundary (75 = PASS, 60–74 = PASS_WITH_CONDITION, <60 = FAIL). Auto-determination fires via `determination_source = DETERMINATION_SOURCE_AUTO_COMPUTED`.
4. Teacher can override any determination (`determination_source = DETERMINATION_SOURCE_HUMAN_OVERRIDE`).

**Alice's individual grade history query** (load view):

```sql
SELECT j.job_template_id, j.cycle_period_start, jt.name AS task_name, t.numeric_value
FROM task_outcome t
JOIN job_task jt   ON t.job_task_id = jt.id
JOIN job_phase jp  ON jt.job_phase_id = jp.id
JOIN job j         ON jp.job_id = j.id
WHERE j.client_id = 'clt-alice-reyes'
  AND jt.template_task_id = 'tmpl-task-friday-quiz-wk2'
ORDER BY j.cycle_period_start;
```

This returns Alice's score on the Friday Quiz (Week 2 master task) across every term she has ever taken it — useful for transfer credit review or longitudinal learning analytics.

**Class average query** (cohort view):

```sql
SELECT AVG(t.numeric_value) AS class_avg
FROM task_outcome t
JOIN job_task jt  ON t.job_task_id = jt.id
JOIN job_phase jp ON jt.job_phase_id = jp.id
JOIN job j        ON jp.job_id = j.id
WHERE j.job_template_id = 'tmpl-algebra2-curriculum-v3'
  AND j.cycle_period_start = '2026-06-01'
  AND jt.template_task_id = 'tmpl-task-friday-quiz-wk2';
```

This returns the class average for Week 2's Friday Quiz across all students enrolled in this Algebra II curriculum during Term 1 2026 — regardless of which section (A, B, or C) they are in, since all sections share the same `job_template_id`.

**Both queries are natural joins over the same data model — no special education schema extensions.**

---

## Scenario 3: Term Progression — Q1 → Q2 → Q3 → Q4 Phase Transitions

Each quarter is a `JobPhase`. When a phase completes, a `PhaseOutcomeSummary` is written. The summary aggregates all `TaskOutcome` rows within that phase into a single quarterly grade record.

```
  Job "Alice — Algebra II Sec B — Term 1 2026"
    │
    ├── JobPhase "Q1 — June–July"  (phase_order: 1)
    │     ├── status: PHASE_STATUS_COMPLETED
    │     ├── JobTask "Week 1 Day 1"  → TaskOutcome (attendance: PASS)
    │     ├── JobTask "Week 2 Quiz"   → TaskOutcome (score: 88.0, PASS)
    │     ├── JobTask "Week 4 Quiz"   → TaskOutcome (score: 82.0, PASS)
    │     └── PhaseOutcomeSummary
    │           ├── id: "pos-alice-alg2-q1"
    │           ├── job_phase_id: FK → Q1 phase
    │           ├── job_id: FK → Alice's Algebra II Job
    │           ├── summary_type: SUMMARY_TYPE_ACADEMIC_RECORD
    │           ├── phase_determination: OVERALL_DETERMINATION_ACCEPTED
    │           ├── scoring_method: SCORING_METHOD_WEIGHTED_AVERAGE
    │           ├── summary_score: 85.0   (Alice's Q1 average)
    │           ├── pass_count: 3
    │           ├── fail_count: 0
    │           ├── total_criteria_count: 3
    │           └── issued_by: "staff-mr-santos"
    │
    ├── JobPhase "Q2 — August–September"  (phase_order: 2)
    │     ├── status: PHASE_STATUS_ACTIVE
    │     └── (in progress — Q2 midterm not yet administered)
    │
    ├── JobPhase "Q3 — October"  (phase_order: 3, status: PENDING)
    └── JobPhase "Q4 — November"  (phase_order: 4, status: PENDING)
```

**Q1 → Q2 transition:**
1. July 31: last Q1 class. Teacher marks Q1 phase `PHASE_STATUS_COMPLETED`.
2. System calls `CreatePhaseOutcomeSummary` for Q1. `scoring_method = SCORING_METHOD_WEIGHTED_AVERAGE` aggregates all `TaskOutcome.numeric_value` rows within the phase.
3. `PhaseOutcomeSummary.summary_score = 85.0` (Alice's Q1 grade).
4. Q2 phase activates (`PHASE_STATUS_ACTIVE`). New `JobTask` rows for Q2 quizzes become available.

**Phase summary query** — Alice's quarterly grades across all subjects for Term 1:

```sql
SELECT
    j.job_template_id,
    jp.name              AS quarter,
    pos.summary_score    AS quarterly_grade,
    pos.phase_determination
FROM phase_outcome_summary pos
JOIN job_phase jp ON pos.job_phase_id = jp.id
JOIN job j        ON pos.job_id = j.id
WHERE j.client_id = 'clt-alice-reyes'
  AND j.cycle_period_start = '2026-06-01'
ORDER BY j.job_template_id, jp.phase_order;
```

Returns Alice's Q1–Q4 grades per subject in one query.

---

## Scenario 4: Final Report Card Generation

At the end of the term (after Q4), the system generates a `JobOutcomeSummary` for each student's Job. This is the report card equivalent — a single document that aggregates all 4 quarterly `PhaseOutcomeSummary` rows into a final term grade.

```
  End of Term 1 (October 31, 2026):

  Job "Alice — Algebra II Sec B — Term 1 2026"
    ├── PhaseOutcomeSummary Q1: summary_score = 85.0
    ├── PhaseOutcomeSummary Q2: summary_score = 88.0
    ├── PhaseOutcomeSummary Q3: summary_score = 91.0
    ├── PhaseOutcomeSummary Q4: summary_score = 87.0
    │
    └── JobOutcomeSummary (Final Report Card — Algebra II)
          ├── id: "jos-alice-alg2-t1"
          ├── job_id: "job-alice-alg2-secb-t1"
          ├── summary_type: SUMMARY_TYPE_ACADEMIC_RECORD
          ├── overall_determination: OVERALL_DETERMINATION_ACCEPTED
          ├── scoring_method: SCORING_METHOD_EQUAL_WEIGHT
          ├── summary_score: 87.75   (Q1+Q2+Q3+Q4 ÷ 4)
          ├── pass_count: 4
          ├── fail_count: 0
          ├── total_criteria_count: 4
          ├── narrative: "Consistent performance. Recommend Grade 11 enrollment."
          ├── issued_by: "staff-mr-santos"
          ├── issued_date: 2026-10-31
          └── attachment_ids: ["att-report-card-alice-t1.pdf"]
```

**Full report card generation workflow:**
1. Teacher or registrar calls `CreateJobOutcomeSummary` for each student's Job.
2. System queries all 4 `PhaseOutcomeSummary.summary_score` values for the Job.
3. Weighted average computed (or equal weight if no weighting configured).
4. `overall_determination` set based on the final score threshold (e.g., ≥ 75 → ACCEPTED).
5. PDF report card generated, stored as `Document.Attachment`, attached via `attachment_ids`.

**Term report card for all of Alice's subjects:**

```sql
SELECT
    j.job_template_id  AS course_template,
    jos.summary_score  AS final_grade,
    jos.overall_determination
FROM job_outcome_summary jos
JOIN job j ON jos.job_id = j.id
WHERE j.client_id = 'clt-alice-reyes'
  AND j.cycle_period_start = '2026-06-01'
ORDER BY j.job_template_id;
```

Returns Alice's final term grade for each of her 6 courses — one row per Job.

---

## Scenario 5: Multi-Section Course — Aggregate Teacher View

The same `JobTemplate "Algebra II Curriculum v3"` is instantiated across 3 sections (A, B, C) taught by different teachers, but all following the same curriculum. Aggregate queries work seamlessly because all Jobs share the same `job_template_id`.

```
Section A (30 students) → teacher: "staff-ms-reyes"
Section B (30 students) → teacher: "staff-mr-santos"
Section C (28 students) → teacher: "staff-ms-dela-cruz"
  Total: 88 students, all pointing to job_template_id = "tmpl-algebra2-curriculum-v3"

Jobs for Section A: job_template_id = "tmpl-algebra2-curriculum-v3"
                    location_id = "loc-room-12"  (Section A classroom)
Jobs for Section B: job_template_id = "tmpl-algebra2-curriculum-v3"
                    location_id = "loc-room-14"  (Section B classroom)
Jobs for Section C: job_template_id = "tmpl-algebra2-curriculum-v3"
                    location_id = "loc-room-09"  (Section C classroom)
```

**Section-level Friday Quiz class average** (scoped to one section):

```sql
SELECT AVG(t.numeric_value) AS section_b_avg
FROM task_outcome t
JOIN job_task jt  ON t.job_task_id = jt.id
JOIN job_phase jp ON jt.job_phase_id = jp.id
JOIN job j        ON jp.job_id = j.id
WHERE j.job_template_id = 'tmpl-algebra2-curriculum-v3'
  AND j.cycle_period_start = '2026-06-01'
  AND j.location_id = 'loc-room-14'        -- Section B only
  AND jt.template_task_id = 'tmpl-task-friday-quiz-wk2';
```

**All-sections Friday Quiz average** (cohort view across entire grade level):

```sql
SELECT AVG(t.numeric_value) AS class_avg
FROM task_outcome t
JOIN job_task jt  ON t.job_task_id = jt.id
JOIN job_phase jp ON jt.job_phase_id = jp.id
JOIN job j        ON jp.job_id = j.id
WHERE j.job_template_id = 'tmpl-algebra2-curriculum-v3'
  AND j.cycle_period_start = '2026-06-01'
  AND jt.template_task_id = 'tmpl-task-friday-quiz-wk2';
```

**Distribution across sections:**

```sql
SELECT
    j.location_id       AS section,
    COUNT(t.id)         AS students_graded,
    AVG(t.numeric_value) AS avg_score,
    MIN(t.numeric_value) AS lowest,
    MAX(t.numeric_value) AS highest
FROM task_outcome t
JOIN job_task jt  ON t.job_task_id = jt.id
JOIN job_phase jp ON jt.job_phase_id = jp.id
JOIN job j        ON jp.job_id = j.id
WHERE j.job_template_id = 'tmpl-algebra2-curriculum-v3'
  AND j.cycle_period_start = '2026-06-01'
  AND jt.template_task_id = 'tmpl-task-friday-quiz-wk2'
GROUP BY j.location_id;
```

Returns a row per section (A, B, C) showing comparative performance.

---

## Key Design Invariants

### 1. One Job per student per course per term — not shared

```
CORRECT:
  Alice  → Job "job-alice-alg2-secb-t1"  (Alice's own Job)
  Bob    → Job "job-bob-alg2-secb-t1"    (Bob's own Job)
  Carol  → Job "job-carol-alg2-secb-t1"  (Carol's own Job)

WRONG (do not do this):
  Section B → Job "job-alg2-secb-shared" with 30 subscriptions_id discriminators
```

### 2. JobTemplate is the SHARED curriculum — instantiated N times

```
  One JobTemplate "tmpl-algebra2-curriculum-v3"
    → instantiated into 88 Jobs (30 + 30 + 28 students across 3 sections)
    → each Job has the full phase/task structure copied from the template
    → template changes require a new revision (clone → DRAFT → PUBLISHED)
```

### 3. TaskOutcome attaches to the per-student JobTask

```
  TaskOutcome.job_task_id → "jtask-alice-friday-quiz-wk2"  (Alice's task instance)
  There is no subscription_id discriminator on TaskOutcome.
  Attribution is natural: Alice's task → Alice's phase → Alice's Job → client_id = Alice.
```

### 4. Teacher's class view = aggregate query

```
  Teacher does not have a "ClassRoster" entity.
  Teacher's view = SELECT ... WHERE job_template_id = 'X' AND cycle_period_start = 'Y'
  This returns all student Jobs for that curriculum + term.
```

### 5. Per-student attribution is natural

```
  "Show Alice's grades" = WHERE j.client_id = 'clt-alice-reyes'
  "Show class grades"   = WHERE j.job_template_id = 'tmpl-X' AND j.cycle_period_start = 'Y'
  Both use the same TaskOutcome / PhaseOutcomeSummary / JobOutcomeSummary tables.
  No special education-specific tables needed.
```

---

## What's NOT a Job

- **Administrative homeroom period** (morning assembly, no curriculum content): A single `Event` with `EventClient` rows per student suffices. No Job, no outcome records needed.
- **School-wide exam** (college entrance test): This is typically administered externally and the results are stored as `ClientAttribute` rows (e.g., `key="upcat_score"`, `value="180.5"`), not as a Job.
- **Student club attendance**: `Event + EventClient` pattern. No Job lifecycle unless the club has graded deliverables.
- **Library book checkout**: `InventorySerial` (for serialized books) + `InventoryTransaction`. Not a Job unless there is a tracked multi-step workflow (e.g., rare book handling).
