# Research — Reporting outcomes across verticals

| Field | Value |
|---|---|
| Date | 2026-06-16 |
| Topic | How the system reports per-client/per-engagement **outcomes** across verticals (diagnostic report, report card, status/fit-gap report, certificate of conformance, …) |
| Method | Claude-led fan-out (proto + 8 vertical READMEs + scenarios + FHIR/consulting archetypes), adversarially verified. *(No Gemini/GLM per the monorepo agent rule; convention mirrors `docs/research/20260325-cooperatives/`.)* |
| Status | Research complete. Actionable proto proposal (generic scoring primitives) tracked separately — see [§9](#9-companion-the-generic-scoring-primitive-design). |
| Trigger | The education migration needs a "report the outcome" path (report card); generalized to all verticals. |

---

## 1. The question

Beyond *capturing* outcomes (`task_outcome`), how does — and should — the system **report** an outcome as a per-client deliverable? Named instances: **diagnostic clinic → diagnostic report**, **student → report card**, **professional services → status report / fit-gap report**, manufacturing → certificate of conformance, retail → delivery acceptance.

## 2. The existing model — a header/scorecard, fed by a rollup, rendered to PDF

The outcome-report container is **`operation.JobOutcomeSummary`** — a per-`job` **HEADER/SCORECARD**, not a structured document (`job_outcome_summary.proto:19-46`):

- `summary_type` (f4, **`SummaryType`** — the archetype selector) · `overall_determination` (f5) · `scoring_method` (f6) · `summary_score` (f7, one double)
- the aggregate tally: `total_criteria_count`(8)/`pass_count`(9)/`fail_count`(10)/`conditional_count`(11)/`deferred_count`(12)/`na_count`(13)
- `narrative` (f14, **a single free-text string**) · `issued_by` (f15 → staff) · `issued_date` (f16) · `valid_until_date` (f17) · `supersedes_id` (f18, amend-by-replacement) · `attachment_ids` (f19, the generated PDF)

**Rollup chain:** `task_outcome` (per work-unit, the *body line* — flat scalar quad `numeric/text/categorical/pass_fail` + `determination` + `recorded_by`→staff) → `phase_outcome_summary` (per period, same scorecard shape) → `job_outcome_summary` (final). `task_outcome_check` is the sub-line for `MULTI_CHECK` criteria. The **rubric** (`outcome_criteria` + `criteria_threshold` + `criteria_option`, pinned via `template_task_criteria`) supplies the implicit structure.

**`SummaryType` already enumerates the archetypes** (`enums.proto:160-169`): `DIAGNOSTIC_REPORT`(1) · `ACADEMIC_RECORD`(2) · `QC_CERTIFICATE`(3) · `DELIVERY_ACCEPTANCE`(4) · `INSPECTION_REPORT`(5) · `COMPLIANCE_REPORT`(6) · `GENERAL`(7).

**Generation/delivery** is *designed but not wired*: scenarios describe "PDF generated → stored as `Document.Attachment` → referenced via `attachment_ids`", and the fycha LibreOffice engine (`document/template`, `ProcessBytesToPDF`) is domain-agnostic — but **no Go code generates an outcome report** (grep of fycha for `job_outcome_summary`/`SummaryType` → 0), and `attachment_ids` is never populated.

## 3. Two report families — keep them distinct

| Family | Container | Keyed to | Answers | Renders |
|---|---|---|---|---|
| **(a) Outcome** (the O/C/I/D "D" leg) | `operation.JobOutcomeSummary` | one `job` (student/patient/matter/order × term) | "how did **this** engagement turn out for **this** client?" — a deliverable handed to the counterparty | PDF document |
| **(b) Operational / financial** | `service/reporting/*`, `ledger/reporting/*`, `treasury/reporting/*` (AR/AP aging, cashflow, statements) | workspace / period / cohort | "how is the **business** doing?" — internal | HTMX tables, no document |

They share only one (currently un-wired) generation engine. **Do not let `job_outcome_summary` absorb financial aggregation**, and do not route per-client deliverables through the financial reporting protos. (Consistent with the repo rule *"reports query ops, not GL".*)

## 4. Per-vertical instantiation matrix

| Vertical | Outcome report | `SummaryType` | Structure-fit |
|---|---|---|---|
| **education** | Course Report Card / Term Report | `ACADEMIC_RECORD`(2) | **FORCED** — header fits; no `credit_hours`/`grade_points` line, no credits-weighted-GPA `ScoringMethod`, `summary_score` is one double not a GPA; transcript course-lines unmodeled |
| **medical-aesthetics** | Treatment Outcome / Diagnostic Report | `DIAGNOSTIC_REPORT`(1) | **FORCED** — near-1:1 to FHIR `DiagnosticReport` *header*; but no per-result reference-range / interpretation / component on `task_outcome` (unit/min/max live on the rubric, so a result line isn't self-describing) |
| **manufacturing** | Certificate of Conformance / Quality Report | `QC_CERTIFICATE`(3) | **CLEAN** — pass/fail counts + LSL/USL/NOMINAL/tolerance `ThresholdRole` map well (the only vertical hard-coding the enum, `verticals/README.md:117`) |
| **retail** | Order QA / Delivery Acceptance | `DELIVERY_ACCEPTANCE`(4) | **CLEAN-but-thin** — a one-of-one acceptance receipt; scorecard body barely exercised |
| **professional-services** | Matter Scorecard / **status report** / **fit-gap report** | **none** → `GENERAL`(7) or mis-stamped `COMPLIANCE_REPORT`(6) | **BREAKS** — no archetype value; real deliverable rides `job_output(output_kind=DELIVERABLE)`, not the summary |
| laundry / mutual / leasing | (README rows only) | — | **uninstantiated** — no worked flow; emit no `JobOutcomeSummary` today |

## 5. The structure gap — fits every *header*, no *body*

`JobOutcomeSummary` is a near-1:1 of the **FHIR `DiagnosticReport` header** (`status`≈`overall_determination`, `code`≈`summary_type`, `subject`≈`job_id`, `issued`≈`issued_date`, `conclusion`≈`narrative`, `presentedForm`≈`attachment_ids`, versioning≈`supersedes_id`/`valid_until_date`). The break is the **BODY**:

- **DIAGNOSTIC** needs N results, each with code/value/unit/**reference-range/interpretation** (FHIR `Observation`). esqyma puts unit/min/max on the *rubric*; a `task_outcome` line is not self-describing. → **PARTIAL**
- **REPORT-CARD/transcript** needs course × **credit_hours × grade × grade_points** + term-GPA + cumulative-GPA. No credit-bearing line, no credits-weighted `ScoringMethod`, `summary_score` is one double. → **BREAKS**
- **STATUS report** needs overall RAG + **per-dimension RAG** (schedule/budget/scope/risk) + accomplishments/next-steps/risks lists. `OverallDetermination` is a single verdict; one narrative string. → **BREAKS HARD**
- **FIT-GAP** needs a **row-per-requirement** table (requirement × current-state × fit/partial/gap × severity × recommendation × effort). No such row entity. → **BREAKS**

## 6. Gaps (confirmed, refute-by-default)

1. **No structured report-BODY model** — one `narrative` + counts; no entity for ordered sections / named findings / per-section narrative / recommendations / sign-off block. (grep `section|finding|body|line_item` over the summaries → 0.) *Highest-leverage gap.*
2. **No `SummaryType` for advisory output** — no `STATUS_REPORT`/`FIT_GAP`/`ADVISORY_REPORT`; prof-services collapses to `GENERAL`, audits mis-stamp `COMPLIANCE_REPORT`.
3. **`task_outcome` is weaker than FHIR Observation** — flat scalar quad; no per-result reference-range/interpretation/component; not self-describing.
4. **No credit-weighted transcript** — no `credit_hours`/`grade_points`/course-label; no credits-weighted-GPA `ScoringMethod`; no cumulative roll-forward.
5. **`attachment_ids` (f19) is untyped** — no `(options.v1.db).references="attachment"` (unlike `job_id`/`issued_by`); no `generating_template_id`, no `render_status`. The report→PDF→template relation is convention-only.
6. **No report lifecycle/seal** — no DRAFT/IN_REVIEW/ISSUED/SUPERSEDED status; no `issued_pdf_hash`; only one `issued_by` (no co-signer); nothing prevents post-issuance edits. (The *rubric* has `VersionStatus`; the emitted report doesn't.)
7. **Determination provenance lost at roll-up** — `task_outcome.determination_source` is per-line, but the summaries store only counts + one narrative; no audit of how `overall_determination` was computed.
8. **No generation usecase/RPC** — service is CRUD + `GetByJob`; nothing selects a `DocumentTemplate`, renders the PDF, and back-references `attachment_ids`. No template taxonomy for the 7 `SummaryType` variants.

## 7. Recommendations (additive-first, ranked)

1. **ADD a structured report-BODY sub-entity** — `operation/job_outcome_line` (FK→`job_outcome_summary`, optional FK→`task_outcome` for provenance): `section_label`, `sequence_order`, `line_label`, a typed value (reuse the `task_outcome` value union), `unit`, `reference_range_low/high`, `interpretation`, `weight_or_credits`, `dimension_status` (RAG), `severity`, `recommendation`, `effort`. Each `SummaryType` **projects** its archetype columns (Observation row / transcript course-line / fit-gap row / status dimension). `JobOutcomeSummary` stays the unchanged HEADER. *Purely additive.* Optional `job_outcome_section` for ordered sections + per-section narrative + sign-off.
2. **EXTEND `SummaryType`** with `STATUS_REPORT`, `FIT_GAP` (+ consider `ADVISORY_REPORT`) — one-line-per-value additive enum change; ends the `GENERAL`/`COMPLIANCE_REPORT` mis-stamp.
3. **WIRE the existing fycha engine** (don't fork) — a `GenerateOutcomeReport` usecase mirroring the centymo invoice action: query the rollup + body lines → select an outcome `DocumentTemplate` → `ProcessBytesToPDF` → write `Document.Attachment` → populate `attachment_ids`. Add a `GenerateReport` RPC.
4. **Type the attachment relation** — annotate `attachment_ids` `references="attachment"`; add `generating_template_id` (FK→`document_template`) + `render_status`.
5. **Add an issuance SEAL** — a `DRAFT/ISSUED/SUPERSEDED` status + optional `issued_pdf_hash` + optional approver/co-signer FK→staff (gives the emitted report the immutability the rubric already has). *Check espyna/SOC2 scope for whether the seal is needed now.*
6. **Credit-weighting (education-scoped, lower priority)** — `weight_or_credits` on the body line + a `SCORING_METHOD_CREDIT_WEIGHTED_GPA` + cumulative-GPA roll-forward.

## 8. Open decisions

- **Body model shape:** flat `job_outcome_line` (renderer groups by `section_label`) vs two-level `job_outcome_section → job_outcome_line` (needed if status reports want first-class per-section narrative + sign-off).
- **Where the prof-services/outsourcing DELIVERABLE lives:** `job_outcome_summary` (as a STATUS/FIT_GAP scorecard+body) vs `job_output(output_kind=DELIVERABLE)`. Today the scenario routes it to `job_output`; unify under one container before adding the enum values.
- **Body persistence:** reconstitute-at-render (implicit body, only add `SummaryType` values) vs PERSIST a structured sub-entity (queryable post-issuance, survives rubric changes, required for status/fit-gap which have no `task_outcome` backing). Likely persist for advisory archetypes, reconstitute allowed for scored ones.
- **Immutability policy:** amend-by-replacement (`supersedes_id`) vs hard DRAFT→ISSUED seal + `issued_pdf_hash` — and whether any compliance gate requires the seal now.
- **Coverage priority:** do laundry / mutual / outsourcing get first-class outcome flows now or stay README-only?
- **Per-vertical layout:** keep implicit layout (rubric + `template_task_criteria` pinning + one external LibreOffice template per `SummaryType`) vs a proto-level `report_template`/`report_section` taxonomy so layout is queryable/validated.

## 9. Companion — the generic scoring-primitive design

The two **scoring gaps** this research surfaced (weighted scoring categories; a reusable score-transmutation/rating scale — both currently absent: no `criteria_group` entity, no `score_scale`) are designed in **[scoring-primitives-design.md](./scoring-primitives-design.md)** as **generic, cross-vertical, Mantra-rated proto primitives** that compose with the `job_outcome_line` body model above. Winner: the **`scoring_scheme` aggregate** (4 new entities + 1 enum, additive-only, canonical-leaning 4✓/1~) — resolves education's WW/PT/QA weighting + DepEd transmutation generically, with manufacturing/medical/eval/CSAT instantiations. That doc is the actionable proto proposal; this one is the cross-vertical survey it sits on.

---

**Cross-references:** proto under `packages/esqyma/proto/v1/domain/operation/{job_outcome_summary,phase_outcome_summary,task_outcome,outcome_criteria,criteria_threshold,criteria_option,template_task_criteria,enums}/` · `packages/esqyma/verticals/README.md` (cross-vertical matrix) + per-vertical READMEs · `docs/wiki/articles/reporting-engine.md` · `docs/wiki/articles/mantra.md` · education migration [grade-mapping.md](../../../../../docs/plan/20260615-education-firestore-migration/grade-mapping.md).
