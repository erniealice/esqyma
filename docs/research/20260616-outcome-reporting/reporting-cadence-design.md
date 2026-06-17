# Design — Per-SEGMENT reporting cadence: where the `{checkpoint-set, framework-set}` binding lives so ONE generic outcome model emits the right rows per grade-level

> 🔒 **Org identifiers redacted for commit safety.** No PII (no student/teacher names, LRN, email). The dry-run student is referenced only by the opaque `client.id` from [dry-run-mapping.md](../../../../../docs/plan/20260615-education-firestore-migration/dry-run-mapping.md). Collection-node ids shown as minted `«mint:…»` placeholders per [grade-hierarchy-model.md](../../../../../docs/plan/20260615-education-firestore-migration/grade-hierarchy-model.md).

| Field | Value |
|---|---|
| Date | 2026-06-17 |
| Status | 🟢 **DESIGN — the binding layer that FINALIZES the reporting model + un-holds Q-SCORE-4.** Builds strictly ON TOP of [reporting-config-design.md](./reporting-config-design.md) (the locked `Category`-based checkpoint-SET + framework-SET) and does **not** overturn it. Adds the missing piece: *where the per-segment binding of `{checkpoints-per-phase, framework-set}` is authored* so the SAME generic `phase_outcome_summary` / `job_outcome_line` model produces the right rows for JHS (2 semesters × 2 checkpoints) vs Elementary (4 quarters × 1 checkpoint). No proto written. |
| The new requirement | Within ONE workspace (school), the reporting cadence varies **PER GRADE-LEVEL** (per `line` node), not per-workspace. JHS grade 7/8/9 = semester cadence (2 `job_template_phase`s × 2 checkpoints `{interim,final}`, framework-set `{MYP, DepEd}`) → 5 views. Elementary grade 1-6 = quarter cadence (4 `job_template_phase`s × 1 checkpoint `{final}`, framework-set `{MYP}`) → 5 views. |
| The settled part | **Phase COUNT (2 vs 4) is ALREADY handled** — it is the curriculum's `job_template_phase` rows; different grades use different `job_template`s (subject×grade). The new bit is **WHERE the per-grade-level `{checkpoint-set, framework-set}` binding lives**. |

| Method | Reuse-first scan of the per-`line` config mechanisms that already exist → 3 binding-home options (A on `line`, B on `job_template`, C on `job_template_phase`) → Mantra 5-lens (D & R veto) → ≥4-vertical genericity matrix (per-SEGMENT, not per-tenant) → exact additive delta ON TOP of reporting-config-design.md → recommendation. Grounded in proto read directly (field numbers + FK shapes confirmed). |
| Companions | [reporting-config-design.md](./reporting-config-design.md) (the locked `Category` checkpoint-SET + framework-SET — this doc binds it per-segment) · [scoring-primitives-design.md](./scoring-primitives-design.md) (T1 wave; `scoring_scheme`/`score_scale`/`job_outcome_line`) · [README.md](./README.md) (outcome-reporting survey) · [grade-hierarchy-model.md](../../../../../docs/plan/20260615-education-firestore-migration/grade-hierarchy-model.md) (Dept→Grade→Section = `line` + `line_parent` DAG; cohorts = `subscription_seat`) · [mantra.md](../../../../../docs/wiki/articles/mantra.md) |
| Legend | 🟩 exists in proto today · 🟦 NEW (additive) · ⛔ rejected · **bold = the recommendation** |

---

## 0. The precise shape of the new problem (what is settled, what is open)

[reporting-config-design.md](./reporting-config-design.md) locked **two SETs as per-workspace `Category` config**:
- the **checkpoint-SET** = `Category` rows `module="reporting_checkpoint"` (workspace-scoped, ordered), FK'd from `phase_outcome_summary.reporting_checkpoint_id → category`;
- the **framework-SET** = `Category` rows `module="reporting_framework"` (workspace-scoped, ordered), each resolving to one `score_scale`, emitted as N `job_outcome_line` rows via `reporting_role`.

That design assumed **one cadence per workspace**. The maintainer's new scenario breaks that assumption: a single school runs **two cadences side-by-side**, keyed by grade-level:

| Segment (line node) | phases (job_template_phase) | checkpoints / phase | framework-set | reporting views |
|---|---|---|---|---|
| **JHS** (grade 7/8/9) | **2** (Sem 1, Sem 2) | **2** `{interim, final}` | `{MYP, DepEd}` | 2×2 + year-final = **5** |
| **Elementary** (grade 1-6) | **4** (Q1-Q4) | **1** `{final}` | `{MYP}` | 4×1 + year-final = **5** |

Two facts split the problem cleanly into a **settled half** and an **open half**:

1. **SETTLED — phase COUNT is already curriculum data.** 2 vs 4 phases is *not* a new modeling concern. It is `job_template_phase.phase_order` rows (`job_template_phase.proto:28`, verified) under different `job_template`s. A subject×grade has its own `job_template` (grade-hierarchy-model §1: "subject = `product` + `job_template` + `plan`"). The JHS Math template has 2 phase rows; the Elementary Math template has 4. The auto-spawn already materializes `job_phase` rows 1:1 from `job_template_phase` (`job_phase.template_phase_id` → `job_template_phase`, `job_phase.proto:39`). **Nothing new here.**

2. **OPEN — the per-segment BINDING of `{checkpoints-per-phase, framework-set}`.** The locked `Category` SETs are *per-workspace* (`Category.workspace_id`, no finer scope). But the cadence is *per-grade-level*. So the open question is purely: **what row tells the use-case "for THIS phase, in THIS segment, issue THESE checkpoints and emit THESE frameworks"?** This is a *binding* (a selector that points at the already-locked `Category` SETs), not a new SET and not a new structure. The whole job of this doc is to choose the binding's home.

> **Framing that keeps this additive:** the binding is a **selector**, not a redefinition. The checkpoint-SET and framework-SET stay exactly as locked (workspace-scoped `Category`). The binding just says *which subset of the workspace's checkpoints applies to a given (segment, phase)*. With NO binding rows, behavior collapses to reporting-config-design.md's per-workspace default (one cadence) — which collapses, with no `Category` rows, to today's single-summary behavior. **Two nested NULL-collapses = strict additivity.**



---

## 1. Reuse-first scan — the per-`line` config mechanisms that ALREADY exist

The brief's reuse mandate: prefer reusing `line` + `line_parent` + `Category` + an existing per-line node config mechanism over a new entity. Scanned the candidates directly in proto.

| Candidate (verified) | Shape | Per-line node? | `workspace_id` reachable? | Inheritable down `line_parent`? | Fit as the per-segment cadence binding |
|---|---|---|---|---|---|
| 🟩 `product/line` | `Line{id, name, description, active, line_plans}` — **NO `workspace_id`, NO `module`, NO parent field, NO config slot** (`line.proto:15-25`, verified) | it IS the segment node | only **indirectly** via `line_plan → plan → workspace` | the *node* is; the node has no config slot of its own | The grade-level node itself — the thing the cadence is keyed BY. But it has nowhere to *hang* config; it needs a companion. |
| 🟩 `product/line_parent` | `LineParent{line_parent_id→line, line_id→line}`, `unique_together` (`line_parent.proto:14-19`, verified) | the DAG edges (Dept→Grade→Section) | — | **it IS the inheritance spine** | Not a config home; it is the *inheritance path* a binding would walk (Dept sets cadence → Grades inherit). |
| 🟩 `product/line_attribute` | `LineAttribute{line_id→line, attribute_id→attribute, value}`, `unique_together="line_id,attribute_id"` (`line_attribute.proto:18-28`, verified) | ✅ **YES — the canonical per-line node key-value config** | ✅ value is workspace-reachable via `line` (the `attribute` dictionary header is global, but the per-line VALUE row is reachable) | walkable (read parent's `line_attribute` if child has none) | **The existing per-line config mechanism the brief names.** A thin, generic, already-14-layer-wired key-value bag on the exact node the cadence is keyed by. |
| 🟩 `common/Category` | `module`/`workspace_id`/`display_order`/`parent_id` (locked as the SET home) | ❌ per-*workspace*, not per-*line node* | ✅ | self-nests, but on `Category`, not on `line` | Already locked as the **SET** (the menu of checkpoints/frameworks). It is NOT a per-line selector — wrong grain for the binding. The binding must *point at* a Category subset, keyed by line. |
| 🟩 `operation/job_template` | `workspace_id`(f12), versioning quad, `reserved 32-49` (`job_template.proto`, verified) | per-curriculum (subject×grade) → *effectively* per-grade-level, but **duplicated across every subject of a grade** | ✅ `workspace_id` | ❌ no `line` FK; not on the inheritance spine | Option B's home. Naturally per-grade-level but N× duplicated (one per subject). |
| 🟩 `operation/job_template_phase` | `phase_order`(f10), milestone fields, `reserved 20-29` (`job_template_phase.proto`, verified) | per-phase-per-curriculum | ✅ via template | ❌ | Option C's home. Most precise (per-phase) but most rows + furthest from the segment node. |

**Decisive reuse axis:** the cadence is keyed by **grade-level = a `line` node** (grade-hierarchy-model §2b: "Grade 7 = a `line` node"). The binding therefore wants to live *on or near that node* and *inherit down `line_parent`* (so the JHS dept node sets it once for 7/8/9; the Elementary dept node once for 1-6). The only candidate that is **per-line node, workspace-reachable, and already a generic config mechanism** is 🟩 **`line_attribute`**. `job_template`/`job_template_phase` are per-*curriculum*, not per-*segment* — they sit one layer below the grade node and duplicate the cadence across every subject.

> **Wiki-gap note (per CLAUDE.md "grep = wiki failure"):** the wiki has no article on the `line` + `line_parent` + `line_attribute` + `line_plan` cluster as the **generic taxonomy + per-node-config primitive** (only grade-hierarchy-model.md, a plan doc, covers it). I had to read all four protos to confirm `line_attribute` is the per-line node config home and that `line` has no `workspace_id`. **Add a `line-taxonomy.md` wiki article** (the cross-vertical Dept→Category→Section tree, its DAG edges, and where per-node config hangs). Logged — extends the `config-primitives.md` gap already noted in reporting-config-design.md §1.

---

## 2. The three binding-home options

The discriminator that must be answered: *"for a given (segment, phase), which configured checkpoints does the use-case issue, and which frameworks does it emit?"* Three places can carry it.

| # | Option | Binding lives on | Grain | Inherits down `line_parent`? | Reuse vs new |
|---|---|---|---|---|---|
| ⛔ 0 | per-workspace only (reporting-config-design.md as-is) | `Category` SET, workspace-scoped | per-workspace | n/a | the locked design — but it **cannot express two cadences in one workspace** |
| **A** | 🟩 **`line_attribute` on the grade-level `line` node** (a *reporting profile* = a small set of `line_attribute` key-values that name the checkpoint-set + framework-set Category codes for that node), inherited down `line_parent` | per-line (per-segment) | ✅ **the JHS dept node sets it for 7/8/9; the Elementary dept node for 1-6** | **REUSE** `line_attribute` (zero new entity) |
| B | 🟩 `job_template` (the curriculum declares its checkpoint cadence + framework-set) | per-curriculum (subject×grade) | ❌ (no `line` FK; per-subject) | partial REUSE (new fields on `job_template`) |
| C | 🟩 `job_template_phase` (each template phase declares which checkpoints it issues) | per-phase-per-curriculum | ❌ | partial REUSE (new fields on `job_template_phase`) + a phase↔checkpoint link |

### 2.1 Option A — a reporting PROFILE on the grade-level `line` node (the recommendation)

**Shape.** A *reporting profile* is not a new entity — it is **a handful of `line_attribute` rows on the grade-level (or department) `line` node** that name, by `code`, the checkpoint-SET and framework-SET that apply to that node. Reuse the already-locked `Category` SETs (reporting-config-design.md §2.2/§3.1) as the *menu*; the profile *selects* from that menu per node.

The minimal profile = two `line_attribute` keys per node (the `attribute` dictionary header is a global `common/Attribute` — reporting-config-design.md §1 confirmed `Attribute` has no `workspace_id`, which is FINE here because the *value* is the per-node, workspace-reachable `line_attribute.value`):

| `line` node | `attribute.code` (global key) | `line_attribute.value` | meaning |
|---|---|---|---|
| JHS dept `«mint:coll-jhs»` | `reporting_checkpoint_set` | `interim,final` | this segment's phases each issue 2 checkpoints |
| JHS dept `«mint:coll-jhs»` | `reporting_framework_set` | `myp,deped` | emit 2 framework lines |
| Elementary dept `«mint:coll-elem»` | `reporting_checkpoint_set` | `final` | each phase issues 1 checkpoint |
| Elementary dept `«mint:coll-elem»` | `reporting_framework_set` | `myp` | emit 1 framework line |

The values are **comma-joined `Category.code` lists** — they *reference* the locked per-workspace `Category` checkpoint/framework sets (the codes `interim`/`final`/`myp`/`deped` are `Category` rows the workspace already seeded per reporting-config-design.md). The profile says *which subset, in what order, applies to this segment*. It does NOT redefine the checkpoints — it selects them.

**Inheritance down `line_parent` (the key win).** A grade node (Grade 7) with no profile of its own **inherits its nearest ancestor's profile** by walking `line_parent` edges upward (Grade 7 → JHS dept). So the school authors the cadence **once per department** (2 rows × 2 depts = 4 `line_attribute` rows for the entire school) and every grade/section under it inherits. A specific grade that diverges (say Grade 9 pilots a 3-checkpoint cadence) overrides by carrying its own `reporting_checkpoint_set` row — nearest-ancestor-wins, the standard tree-config resolution. This is exactly the `line_parent` DAG grade-hierarchy-model §2c already builds.

- **Pro:** keyed by the **grade-level node itself** (the thing the cadence varies by); **inherits down the existing `line_parent` spine** (author once per department); **zero new entity** (reuses `line_attribute`, already 14-layer wired); the framework/checkpoint **SETs stay exactly as locked** (`Category`) — the profile only *selects*; strictly additive (no profile rows → per-workspace default → single-summary default).
- **Con (honest):** the binding value is a **comma-joined code string** in `line_attribute.value`, not a typed FK list — a mild **Maintainability/Reliability** softness (a typo in `interim,finl` is a data error, not a schema-caught one). Mitigated by the §5 Layer-7 resolver-validator (every code in the profile must resolve to a live `Category` row in the same workspace; fail loud at publish). This is the same convention-vs-typed trade reporting-config-design.md already accepted for "which checkpoint is terminal."

### 2.2 Option B — on `job_template` (the curriculum)

Add `reporting_checkpoint_set` / `reporting_framework_set` (or FK lists) to `job_template` (lands in `reserved 32-49`). The curriculum declares its own cadence.

- **Pro:** per subject×grade, so *naturally* per-grade-level (the JHS Math template carries `{interim,final}`, the Elementary Math template carries `{final}`); typed-able on the entity.
- **Con (decisive):** the cadence is a property of the **grade-level**, not the **subject**. Putting it on `job_template` **duplicates it across every subject of a grade** — JHS has ~10 subjects → 10 templates each repeating `{interim,final},{myp,deped}`. Changing the grade's cadence = editing N templates (a **multi-source-of-truth** Maintainability loss, mantra Lens 1 "exactly one place to change a rule"). And `job_template` is **not on the `line_parent` spine**, so it cannot inherit — every template re-declares. It also re-opens a settled layer: the template already owns phase COUNT; piling the *reporting* cadence on it conflates "how many phases" with "how each phase reports."

### 2.3 Option C — on `job_template_phase`

Each template phase declares which checkpoints it issues — most precise (a JHS phase issues 2, an Elementary phase issues 1), via new fields + a `job_template_phase ↔ reporting_checkpoint` link (lands in `reserved 20-29`).

- **Pro:** **most precise** — the checkpoint cadence is genuinely a per-phase fact ("Sem 1 issues interim+final"); naturally supports a phase that reports differently from its siblings.
- **Con:** **most rows + worst duplication** (per-phase × per-subject × per-grade); furthest from the grade-level node; no `line_parent` inheritance; and it still doesn't answer the *framework-set* (a per-segment, not per-phase, concern) without ALSO touching `job_template`/`line`. It optimizes precision the scenario doesn't need — JHS phases are *uniform* (both sems issue `{interim,final}`); the per-phase variability C buys is unused.

---

## 3. Mantra 5-lens scorecard (D & R are veto lenses)

Scored ✓ win · ~ acceptable · ✗ lose. A `✗` on **R** or **D** vetoes. Maintainer weights **genericity + no-vertical-leakage + tenant-isolation** highly.

| Option | M | Sc | R (veto) | D (veto) | O | Verdict |
|---|---|---|---|---|---|---|
| **A — profile on `line` via `line_attribute`, inherited down `line_parent`** | **~** value is a code-string (validator-backed), but the rule lives in **exactly one place per segment** (author once per dept, inherit) — the strongest M property | **✓** new cadence = data rows on a node; new segment = inherit or 2 rows; new vertical = same mechanism | **✓** (gated on §5 resolver-validator) FK-resolve at generation; NULL profile → per-workspace default → single-summary default (double NULL-collapse) | **✓** workspace-reachable via `line`; not adversary-writable beyond normal config; no new trust surface; no new entity to own | **~** the resolved cadence per segment is queryable (read the node's effective profile); which-code-won-the-inheritance is a walk, not a stored row | **🟢 RECOMMENDED — keyed by the segment node, inherits down the existing spine, zero new entity, double NULL-collapse** |
| B — on `job_template` | **✗** cadence duplicated across every subject of a grade → multi-source-of-truth; no inheritance | ~ scales but N× the edit cost per cadence change | ~ (graders can't diverge, but drift across N templates is undetected) | ✓ | ~ | **REJECTED (M-loss: wrong grain — cadence is per-segment, not per-subject)** |
| C — on `job_template_phase` | **✗** per-phase × per-subject × per-grade duplication; furthest from the segment node; still needs B/A for framework-set | ~ most rows | ~ | ✓ | ~ | **REJECTED (M-loss + buys unused per-phase precision; doesn't solve framework-set)** |
| ⛔ 0 — per-workspace only | ✗ **cannot express two cadences in one workspace** (the whole new requirement) | ✗ | ~ | ✓ | ~ | **INSUFFICIENT (the requirement that forced this doc)** |

**Pick: A** — wins ≥3 with no veto loss; it is the only option keyed by the grade-level node and the only one that inherits down `line_parent` (author-once). B and C both lose **Maintainability** decisively by binding a *per-segment* rule to a *per-subject* (B) or *per-phase* (C) entity — the multi-source-of-truth failure mode mantra Lens 1 exists to catch. A's only softness (code-string vs typed-FK) is the same trade already accepted in reporting-config-design.md and is validator-backed.

---

## 4. ≥4-vertical genericity matrix — per-SEGMENT (not per-tenant) reporting cadence

The bar (subject-and-scoring §8 method): a per-SEGMENT reporting cadence must serve ≥4 verticals, or it is education config, not shared proto. The segment = a `line` node (the same primitive grade-hierarchy-model proved 7/8 generic). The cadence varies *within* a tenant, *across* its segments.

| Vertical | The segment (`line` node) | Why cadence varies PER segment (not per tenant) | The bound `{checkpoint-set, framework-set}` per segment | Coverage |
|---|---|---|---|---|
| **education** | grade-band node (JHS vs Elementary dept) | one school runs semester cadence for JHS and quarter cadence for Elementary simultaneously | JHS `{interim,final}`/`{myp,deped}`; Elem `{final}`/`{myp}` | **CORE** |
| **clinic / medical** | treatment-program category node (e.g. "Oncology" vs "Dermatology" vs "Physio") | the same clinic reports an oncology episode at `{baseline,interim,restaging,discharge}` but a dermatology course at `{final}` — visit/checkpoint cadence is a property of the program, not the clinic | Onc `{baseline,interim,restaging,discharge}`; Derm `{final}`; framework-set `{clinical,insurer_disposition}` vs `{clinical}` | **CORE** |
| **manufacturing QC** | product-line category node (e.g. "Aerospace parts" vs "Consumer parts") | the same plant inspects aerospace lots at `{incoming,in_process,final,FAI}` (4 QC stages) but consumer lots at `{final}` (1) — QC-stage count is a property of the product line | Aero `{incoming,in_process,final,fai}`/`{internal_aql,customer_cofc}`; Consumer `{final}`/`{internal_aql}` | **CORE** |
| **performance-eval / HR** | eval-cycle-type category node (e.g. "Annual" vs "PIP" vs "Probation") | the same company runs annual reviews at `{mid_cycle,year_end}` but a PIP at `{week2,week4,week6,final}` and probation at `{final}` — checkpoint cadence is a property of the cycle type | Annual `{mid_cycle,year_end}`/`{numeric,rating_label}`; PIP `{w2,w4,w6,final}`/`{numeric}` | **CORE** |
| **professional-services / project** | engagement-tier category node (e.g. "Fixed-bid" vs "T&M" vs "Retainer") | the same firm reports a fixed-bid project at `{milestone1..N,acceptance}` but a retainer at `{monthly}` — review cadence is a property of the engagement tier | Fixed-bid `{m1,m2,acceptance}`; Retainer `{monthly}`; framework-set `{client_scorecard}` | **PARTIAL** |
| **hospitality / facilities** | property/program category node | weekly status vs single final-acceptance per program type | `{weekly_status,final}` vs `{final}` | **PARTIAL** |

**Genericity verdict — 6/6 (4 CORE + 2 PARTIAL), ≥4 cleared decisively.** And, like the checkpoint-SET in reporting-config-design.md §5.1, the per-SEGMENT binding is **provably more generic than a per-tenant cadence**: a clinic with different cadences for oncology vs dermatology, or a plant with different QC-stage counts for aerospace vs consumer lines, **cannot be expressed by a single per-workspace cadence** — they only work because the cadence binds to a *segment node* and inherits down `line_parent`. The mechanism is the same `line` + `line_parent` + `line_attribute` cluster grade-hierarchy-model already proved 7/8-generic for the taxonomy itself — this doc adds a per-node config *on the same nodes*, so it inherits that genericity by construction. **This clears the ≥4 bar; it is shared proto, not education config.**

---

## 5. The exact additive delta — ON TOP of reporting-config-design.md

All additive. **Two nested NULL-collapses:** (1) no reporting-profile rows on any `line` node → falls back to reporting-config-design.md's per-workspace default (one cadence); (2) no `Category` checkpoint/framework rows → falls back to today's single terminal summary + one framework. So zero config = byte-identical to today.

### 5a. What reporting-config-design.md already locked (UNCHANGED — restated for the delta base)

| Locked item | Status here |
|---|---|
| 🟦 `phase_outcome_summary.reporting_checkpoint_id = 24 [references="category", index=true]` | **unchanged** — this doc does not touch the row's discriminator |
| 🟦 `job_outcome_line.reporting_role` (+ `score_scale_id`/`score_scale_band_id` snapshots) | **unchanged** |
| 🟩 `common/Category` `module="reporting_checkpoint"` + `module="reporting_framework"` SETs | **unchanged** — this doc *selects from* them, does not redefine |
| ⛔ `ReportingCheckpoint` enum | **stays removed** |

### 5b. ADDED by this doc (the per-segment binding — Option A)

| # | Target | Change | Why |
|---|---|---|---|
| 1 | 🟩 `product/line_attribute` | **NO proto change** — seed reporting-profile rows: `attribute.code ∈ {reporting_checkpoint_set, reporting_framework_set}`, `line_attribute.value = comma-joined Category.code list`, on each segment (department/grade) `line` node | the per-segment binding — *which* checkpoint/framework `Category` subset applies to this node |
| 2 | 🟩 `common/Attribute` (global dictionary) | **NO proto change** — seed two dictionary header rows: `code="reporting_checkpoint_set"`, `code="reporting_framework_set"` (the keys the profile values hang under) | gives `line_attribute` a stable key to reference (the *value* per node is workspace-reachable; the key is a global label, which is correct) |
| 3 | 🟩 `product/line_parent` | **NO proto change** — the resolver walks existing edges upward for inheritance (nearest-ancestor profile wins) | author-once-per-department; grades/sections inherit |
| 4 | 🟩 `operation/job_template` + `job_template_phase` | **NO change** — phase COUNT stays template data (2 vs 4 phase rows); reporting cadence stays OFF the template | keeps "how many phases" (template) cleanly separate from "how each phase reports" (segment profile) |

**Net new schema for the per-segment binding: ZERO proto fields, ZERO new entities.** The binding is entirely seed data on the existing `line_attribute` + `Attribute` + `line_parent` primitives, *referencing* the `Category` SETs reporting-config-design.md already locked. The combined reporting-model delta (both docs together) remains: **−1 enum** (`ReportingCheckpoint` removed), **+1 FK field** (`reporting_checkpoint_id`), **+1 already-planned field** (`reporting_role`), **zero new entities.**

### 5c. The forward-compatible TYPED upgrade (if convention proves too loose)

If the comma-joined-code-string softness (the §2.1 con) becomes load-bearing, the typed upgrade is a thin 🟦 `line_reporting_profile` entity (`line_id → line`, `reporting_checkpoint_set_category_id → category` (the parent header of the checkpoint subset), `reporting_framework_set_category_id → category`, `workspace_id`) — one new entity that *replaces the two `line_attribute` rows with typed FKs*. It is forward-compatible: the resolver's input (a per-node `{checkpoint-codes, framework-codes}` resolution) is unchanged; only the storage of the binding hardens from string to FK. **Recommend ship the `line_attribute` profile now (most additive, zero proto); upgrade to `line_reporting_profile` only if a concrete need for typed FKs / per-profile versioning / cross-segment reuse appears.** This mirrors reporting-config-design.md's B→A / F1→F2 upgrade discipline exactly.

### 5d. How the LOADER maps the source onto the bound checkpoints (the data flow)

The loader resolves, per (subject, segment), the **effective profile** (walk `line_parent` up from the subject's grade node to the nearest profile-bearing ancestor), then maps each source field to a `(job_phase, reporting_checkpoint)` pair:

```
JHS Math (grade 7 line node → inherits JHS dept profile {checkpoints: interim,final | frameworks: myp,deped}):
  source field          → (job_phase,          reporting_checkpoint_id)
  sem1_interim          → (sem1 job_phase,      Category{module=reporting_checkpoint, code=interim, ws})
  sem1_final            → (sem1 job_phase,      Category{...code=final, ws})
  sem2_interim          → (sem2 job_phase,      Category{...code=interim, ws})
  sem2_final            → (sem2 job_phase,      Category{...code=final, ws})
  year-final            → job_outcome_summary (one terminal row per job; no checkpoint FK)
  → per checkpoint row, emit 2 job_outcome_line (reporting_role=myp_primary | deped_alternate)

Elementary Math (grade 3 line node → inherits Elem dept profile {checkpoints: final | frameworks: myp}):
  Q1_final              → (Q1 job_phase,         Category{...code=final, ws})
  Q2_final              → (Q2 job_phase,         Category{...code=final, ws})
  Q3_final / Q4_final   → (Q3/Q4 job_phase,      Category{...code=final, ws})
  year-final            → job_outcome_summary
  → per checkpoint row, emit 1 job_outcome_line (reporting_role=myp_primary)
```

**The phase COUNT (2 vs 4) came from the template; the checkpoints-per-phase (2 vs 1) and frameworks (2 vs 1) came from the resolved segment profile. The data model decided nothing — the template's phase rows and the segment's profile rows did.**

### 5e. How AUTO-SPAWN materializes the right `job_phase` count + the use-case issues the right `phase_outcome_summary` rows

1. **Phase count** — auto-spawn copies `job_template_phase` rows → `job_phase` rows 1:1 (`job_phase.template_phase_id` → `job_template_phase`, verified). JHS Math template (2 phases) → 2 `job_phase`s; Elementary Math template (4 phases) → 4 `job_phase`s. **Already works; no change.**
2. **Checkpoints per phase** — at grading time, the issue-phase-summary use-case resolves the job's segment profile (via the job → `job_template` → grade node → `line_parent` walk, or via the enrollment subscription's grade plan), reads the effective `reporting_checkpoint_set` codes, and issues **one `phase_outcome_summary` row per code per `job_phase`** (each row carries `reporting_checkpoint_id → Category`). JHS: 2 summaries/phase × 2 phases = 4; Elementary: 1/phase × 4 phases = 4. Plus the year-final `job_outcome_summary` = **5 reporting views each**, matching the requirement.
3. **Frameworks per summary** — for each summary, the report-generation use-case reads the effective `reporting_framework_set` codes and emits **N `job_outcome_line` rows** (one per framework, discriminated by `reporting_role`, each snapshotting its `(score_scale_id, score_scale_band_id)` per reporting-config-design.md §3.1). JHS emits 2 lines (MYP + DepEd); Elementary emits 1 (MYP).

The SAME generic use-case path produces both cadences; the only input that differs is the **resolved segment profile**.

### 5f. R-veto gates — MANDATORY Layer-7 validators (extends reporting-config-design.md §6e)

`options/db.proto` `check` is per-field only; these are publish-time / generation-time use-case validators:

1. **Profile resolvability** — every `code` in a node's `reporting_checkpoint_set` / `reporting_framework_set` profile value MUST resolve to a live `Category` row of the matching `module` in the **same workspace**. An unresolvable code (typo `finl`) fails loud at publish, never silently drops a report view.
2. **Profile tenancy** — the resolved `Category` rows and the `line` node carrying the profile MUST share the job's `workspace_id` (structural tenant isolation; the profile cannot pull another tenant's checkpoint set).
3. **Inheritance determinism** — the `line_parent` walk MUST terminate at exactly one nearest profile-bearing ancestor (or none → per-workspace default). A node reachable from two profile-bearing ancestors via the DAG with *different* profiles must fail loud (ambiguous inheritance), not pick arbitrarily — the same fail-closed discipline as `ErrAmbiguousBinding` in the workspace-path resolver.
4. **Spawn↔issue parity** — the count of `phase_outcome_summary` rows issued for a `job_phase` MUST equal the resolved checkpoint-set cardinality (no missing/extra checkpoint rows); the count of `job_outcome_line` rows per summary MUST equal the resolved framework-set cardinality.
5. **NULL-collapse parity (double)** — with zero reporting-profile rows on any node, output equals reporting-config-design.md's per-workspace default; with additionally zero `Category` checkpoint/framework rows, output is byte-identical to the current single-summary / one-framework dry-run (the nested additive invariant).

---

## 6. Q1-Q4-as-labels: PRESENTATION, not structure (the maintainer's explicit ask)

The maintainer noted the school MAPS its mental "Q1..Q4" labels onto the JHS structure: **Q1=sem1-interim, Q2=sem1-final, Q3=sem2-interim, Q4=sem2-final, final=year-final.** This is **confirmed to be a PRESENTATION/lyngua mapping — a label on a `(phase, checkpoint)` pair — NOT a structural entity.** The reasoning:

- The **structure** is `(job_phase=sem1|sem2) × (reporting_checkpoint=interim|final)` — 4 `phase_outcome_summary` rows + 1 `job_outcome_summary`. That is the durable, queryable truth.
- "Q1..Q4" is a **rendering of that truth into the school's house vocabulary**. It is a deterministic function of the `(phase_order, checkpoint display_order)` pair: `Q{n}` where `n = (phase_order-1)*checkpoints_per_phase + checkpoint_index`. For JHS (2 checkpoints/phase): sem1(interim,final)=Q1,Q2; sem2(interim,final)=Q3,Q4. For Elementary (1 checkpoint/phase) the 4 phases ARE Q1..Q4 directly — and there the "Q1..Q4" labels coincide with the phase rows, which is why the same surface vocabulary covers both cadences.
- It must **NOT** be a structural entity (no `quarter` table, no `Quarter` enum, no `quarter_number` column) because: (a) it is **derivable** from `(phase_order, checkpoint)` — storing it is a denormalized second source of truth (R-loss, mantra Lens 3 mutable-counter-drift class); (b) it is **vertical-specific vocabulary** — a clinic's `(baseline, interim, discharge)` has no "Q1..Q4", a plant's QC stages have their own names — so baking "quarter" into the schema is exactly the vertical leakage the maintainer rejects; (c) it changes per-segment within one tenant (JHS Q3 = sem2-interim; Elementary Q3 = the 3rd quarter phase) — a structural quarter entity would have to encode the cadence it is supposed to merely *label*.
- **Where it lives:** a **lyngua tier-3 label override** keyed on the `(reporting_checkpoint Category, phase_order)` pair, resolved at render time (the report-card template / view layer), per the 3-tier `common → general → businessType` cascade. The compute layer emits `(phase, checkpoint, framework-lines)`; the **presentation layer** paints "Q1..Q4 / Final" onto it. Same separation as reporting-config-design.md §3.1's "Category set says what to compute; `DocumentTemplate` says how to draw it" — here, lyngua says *what to call it*.

**Verdict: Q1-Q4 is a label on a `(phase, checkpoint)` pair, resolved in the presentation/lyngua layer. No structural entity. Confirmed.**

---

## 7. How this FINALIZES the reporting model + un-holds Q-SCORE-4

reporting-config-design.md un-held Q-SCORE-4 *on the reporting-structure axis* (enum killed, SETs are config). It left **one residual** the maintainer's new scenario exposes: the locked SETs were *per-workspace*, but the real cadence is *per-grade-level*. **This doc closes that residual** — the per-segment binding is `line_attribute` profile rows on the grade-level `line` node, inherited down `line_parent`, selecting from the already-locked `Category` SETs — and adds **zero proto** on top of reporting-config-design.md.

With this doc, the reporting model is **complete and finalized** across all three axes the scenario stresses:

| Axis | Where it is decided | Mechanism | Proto delta |
|---|---|---|---|
| phase COUNT (2 vs 4) | the curriculum | `job_template_phase` rows (different `job_template` per subject×grade) | **none** (exists today) |
| checkpoints-per-phase + framework-SET (the *menu*) | the workspace | `Category` SETs (`module=reporting_checkpoint`/`reporting_framework`) | reporting-config-design.md: **+1 FK + 1 field, −1 enum** |
| which subset applies per segment (the *selector*) | the grade-level node | `line_attribute` reporting profile, inherited down `line_parent` | **this doc: ZERO** (seed data only) |
| "Q1..Q4" surface labels | the renderer | lyngua tier-3 override on `(phase, checkpoint)` | **none** (presentation) |

**Q-SCORE-4 recommendation: PROCEED (un-hold) with Option A folded in.** The proto footprint is unchanged from reporting-config-design.md (the per-segment binding adds no schema); the §5f validators are the only hard gate; the double NULL-collapse keeps the T1 wave byte-identical until config is seeded. The reporting model is generic (per-segment cadence clears ≥4 verticals, 6/6), defensible by construction (`line_attribute.value` workspace-reachable; tenancy-validated), and additive (zero new entity, zero new proto field beyond reporting-config-design.md's).

---

## 8. Single recommendation + sub-decisions

**Bind the per-grade-level `{checkpoint-set, framework-set}` as a REPORTING PROFILE on the grade-level `line` node — a small set of `line_attribute` rows (`reporting_checkpoint_set` / `reporting_framework_set`, comma-joined `Category.code` values) — inherited down `line_parent` (author once per department; grades/sections inherit; a divergent grade overrides nearest-ancestor-wins). Reuse the already-locked per-workspace `Category` SETs as the menu; the profile only SELECTS from it. Phase COUNT stays curriculum data (`job_template_phase`); "Q1..Q4" stays a lyngua label on a `(phase, checkpoint)` pair.**

Net delta on top of reporting-config-design.md: **ZERO new proto fields, ZERO new entities** — the binding is seed data on existing `line_attribute` + `Attribute` + `line_parent` primitives. Defensibility holds by construction (workspace-reachable value, tenancy-validated). Genericity clears ≥4 verticals decisively (**6/6**: education + clinic-program + manufacturing-product-line + eval-cycle-type CORE) — and is provably more generic than a per-tenant cadence. Mantra: **A = ≥3✓ no veto loss** (M~ on the code-string softness, validator-backed; the only option keyed by the segment node + the only one that inherits down the existing spine).

**The 2-3 sub-decisions this surfaces (for the maintainer):**

1. **Q-CAD-HOME** — bind on the `line` node (A, recommended), the `job_template` (B), or the `job_template_phase` (C)? *Recommend A: the cadence is a property of the grade-level (a `line` node), not the subject (B) or the phase (C); only A inherits down `line_parent` (author-once) and adds zero proto. B/C lose Maintainability by binding a per-segment rule to a per-subject/per-phase entity.*
2. **Q-CAD-TYPED** — store the profile as `line_attribute` comma-joined code strings (recommended, zero proto) or a typed 🟦 `line_reporting_profile` entity (FKs to `Category`)? *Recommend the `line_attribute` profile now (most additive); the typed entity is a forward-compatible upgrade (same resolver input, swap string→FK) if per-profile versioning / typed FKs / cross-segment reuse become load-bearing.*
3. **Q-CAD-INHERIT** — resolve the per-segment profile by **walking `line_parent` upward at generation time** (recommended; author once per department) or by **denormalizing the resolved profile onto each grade/section node** at seed? *Recommend the upward walk (single source of truth, mantra Lens 3; the §5f.3 ambiguity validator fail-closes a DAG with conflicting ancestors); denormalize only if the walk's read cost shows up on a hot path (then it is a cache, validated against the walk).*

---

**Cross-references:** [reporting-config-design.md](./reporting-config-design.md) (the locked `Category` checkpoint-SET + framework-SET this doc binds per-segment; §2.2/§3.1 SET shapes, §6e validators, §7 Q-SCORE-4) · [scoring-primitives-design.md](./scoring-primitives-design.md) (T1 `scoring_scheme`/`score_scale`/`job_outcome_line`) · [README.md](./README.md) (the `job_outcome_line` body) · [grade-hierarchy-model.md](../../../../../docs/plan/20260615-education-firestore-migration/grade-hierarchy-model.md) (Dept→Grade→Section = `line` + `line_parent` DAG; the segment nodes this doc hangs profiles on; cohorts = `subscription_seat`) · proto read directly: `product/line/{line.proto:15-25, line_parent.proto:14-19}` · `product/line_attribute/line_attribute.proto:18-28` · `product/line_plan/line_plan.proto` · `common/category.proto` (workspace_id f13, module f5, display_order f12, parent_id f6) · `operation/job_template/job_template.proto` (workspace_id f12, reserved 32-49) · `operation/job_template_phase/job_template_phase.proto` (phase_order f10, reserved 20-29) · `operation/job_phase/job_phase.proto` (template_phase_id f12, phase_order f10) · `operation/phase_outcome_summary/phase_outcome_summary.proto` (highest field 23; summary_type f5) · [mantra.md](../../../../../docs/wiki/articles/mantra.md) (5-lens, D & R veto).
