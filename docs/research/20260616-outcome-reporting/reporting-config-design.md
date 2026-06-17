# Design — Per-workspace reporting config (checkpoint SET + framework SET) — the generic replacement for the `ReportingCheckpoint` enum

> 🔒 **Org identifiers redacted for commit safety.** No PII (student/teacher names, LRN, email). The dry-run student is referenced only by the opaque `client.id` from [dry-run-mapping.md](../../../../../docs/plan/20260615-education-firestore-migration/dry-run-mapping.md).

| Field | Value |
|---|---|
| Date | 2026-06-17 |
| Status | 🟢 **DESIGN — resolves the maintainer's two locked principles.** Replaces the baked `ReportingCheckpoint{PROGRESS,FINAL}` enum (subject-and-scoring §6 / scoring-primitives §9 #5) with a generic, per-workspace, config-driven mechanism; and pins the framework-SET to per-workspace config (never `scoring_scheme`, never `ScaleKind`). Feeds the **HELD** proto-design gate **Q-SCORE-4** + revises **Q-CHK** + **Q-MR-1**. No proto written. |
| The principle | The proto data model stays **generic** and does **NOT** encode reporting STRUCTURE. (1) The SET of reporting checkpoints (interim/final, or 4 quarters, or one final) is **per-workspace config**, not a baked enum. (2) The SET of reporting frameworks a report emits (MYP primary + DepEd/GPA alternates) is **per-workspace config**, never bound into `scoring_scheme` and never a `ScaleKind` value. |
| Method | Reuse-first config scan → 4 options for checkpoints + 3 for framework-set → Mantra 5-lens (D & R veto) → ≥4-vertical genericity matrix → exact additive delta (with the REMOVED enum stated) → recommendation. Grounded in proto read directly (field numbers confirmed). |
| Companions | [scoring-primitives-design.md](./scoring-primitives-design.md) (the T1 wave — `scoring_scheme`/`score_scale`/`job_outcome_line`) · [README.md](./README.md) (the outcome-reporting survey; the `job_outcome_line` body) · [multi-reporting-exploration.md](../../../../../docs/plan/20260615-education-firestore-migration/multi-reporting-exploration.md) (Opt 2 `reporting_role` — this doc supplies its missing config source) · [subject-and-scoring-model.md §6](../../../../../docs/plan/20260615-education-firestore-migration/subject-and-scoring-model.md) (the `ReportingCheckpoint` enum this REPLACES) · [mantra.md](../../../../../docs/wiki/articles/mantra.md) |
| Legend | 🟩 exists in proto today · 🟦 NEW (additive) · ⛔ **REMOVED vs the prior plan** · **bold = the recommendation** |

---

## 0. The two things that must become config (the whole point)

The prior plan baked reporting STRUCTURE into the data model in two places. The maintainer has rejected both:

1. **Checkpoints — ⛔ the `ReportingCheckpoint{PROGRESS,FINAL}` enum.** subject-and-scoring §6 added `enum ReportingCheckpoint { UNSPECIFIED=0; PROGRESS=1; FINAL=2; }` + `phase_outcome_summary.reporting_checkpoint = 24`. The maintainer's words: *"interim/final is not something the data model decides, it is somehow a per-workspace config."* A 2-value enum **pre-decides** that every workspace reports exactly {interim, final}. A workspace that wants 4 quarters, or a single final, or {baseline, interim, discharge} cannot express it without a proto change — i.e. the structure is baked. **This enum must not ship.**

2. **Framework-set — the binding of frameworks to scoring/scale.** The maintainer's words: *"make sure this is a config / setup, DepEd/GPA not bound / ingrained into the data models."* The grade is ONE primary `score_scale` on the `scoring_scheme`; the alternate frameworks (DepEd, GPA, letter, percentile) are per-workspace config-named `score_scale`s, emitted as N `job_outcome_line` rows. They must NOT be a `ScaleKind` value (Q-SCORE-3 already resists this) and must NOT be bound into `scoring_scheme` as second grades (Q-MR-1 leaned this way; this doc makes the config home concrete).

**The shared shape of both problems:** each is a *per-workspace, ordered, named SET* — a set of checkpoints; a set of frameworks-to-emit. The data row (a `phase_outcome_summary`; a `job_outcome_line`) must reference a *member of that set* by a **generic FK**, never by a baked enum value. This is the same cardinality lesson as [mantra.md Lens 2](../../../../../docs/wiki/articles/mantra.md#lens-2--long-term-scalability) "grants-are-config-not-events" and the `tax-integration` "jurisdiction-as-data" principle: the SET is data, the row carries an FK into the data.

---

## 1. Reuse-first config scan (CRUCIAL — the brief's reuse mandate)

Before adding anything, the question is: **does esqyma already have a per-workspace config / settings / dictionary primitive to hang these on?** Scanned the candidates directly in proto.

| Candidate | Shape (verified) | `workspace_id`? | `module`/scoping discriminator? | Ordered child values? | Fit as a per-workspace reporting-checkpoint / framework SET |
|---|---|---|---|---|---|
| 🟩 `common/Attribute` + `common/AttributeValue` | `Attribute`(name/code/`data_type`/**`module`**) is a dictionary header; `AttributeValue`(`attribute_id`→attribute, `value`, **`sort_order`**, active) is the **ordered enumerable rows** under it. Referenced **14×** across domains. | **❌ NEITHER has `workspace_id`** (verified `grep -c` = 0 on both) — it is a **system/global dictionary**, not workspace-scoped. | ✅ `module` string | ✅ `sort_order` | **STRUCTURALLY the right shape (header + ordered rows), but a DEFENSIBILITY problem:** no `workspace_id` means a "checkpoint set" defined here is global, not per-workspace. Adding `workspace_id` to the 14×-referenced shared `Attribute` to make IT per-workspace is a high-blast-radius change to a load-bearing global primitive (M + D risk). **Reject as-is; do not retrofit `Attribute`.** |
| 🟩 `common/Category` | `id`/`name`/`description`/`code`/**`module`**/`parent_id`(self-FK, nesting)/**`display_order`**/`active`/**`workspace_id`** | ✅ **`workspace_id`** (field 13, indexed) | ✅ `module` string (e.g. "client","product") | self-nesting via `parent_id` + `display_order` (it IS the ordered member set, one row per member, `module`-discriminated) | **✅ BEST REUSE FIT.** Already per-workspace, already `module`-discriminated, already ordered (`display_order`), already self-nesting, already 3× referenced. A "checkpoint" or a "framework" is exactly a *named, ordered, workspace-scoped member of a module-keyed set* — which is what `Category` IS. |
| 🟩 `document/DocumentTemplate` | `name`/`workspace_id`(f9)/`template_type`(f10)/`document_purpose`(f11)/`storage_*`/`is_default`/**`module_key`**(f19,indexed) | ✅ `workspace_id` | ✅ `module_key` | ❌ (a single template, not a set of members) | **The report-card LAYOUT.** Good home for the *rendering* side of the framework-set (which columns the LibreOffice template draws), but it does NOT model the framework SET as queryable rows — it is opaque layout. Pair WITH a member set, don't replace it. |
| 🟩 `subscription/PlanSettings` | `plan_id`/`name`/`description` — a thin per-plan settings stub | ❌ (plan-scoped, no workspace_id, no values) | ❌ | ❌ | Too thin + plan-scoped; not a reusable config-set primitive. Reject. |
| 🟩 `integration/IntegrationConfig`, `treasury/*_profile` | provider/credential config; payment-method profiles | — | provider-keyed | profile→method rows | Domain-specific (integration creds / treasury rails); not a generic reporting-config home. Reject. |

**Decisive axis = `workspace_id`.** Per-workspace reporting config MUST be workspace-scoped by construction (Defensibility — tenant isolation is structural, [mantra Lens 4](../../../../../docs/wiki/articles/mantra.md#lens-4--long-term-defensibility)). That eliminates `Attribute`/`AttributeValue` (global dictionary) and `PlanSettings`. It leaves **`Category`** (the member-set) and **`DocumentTemplate`** (the layout) as the reuse pair.

> **Wiki-gap note (per CLAUDE.md "grep = wiki failure"):** the wiki has no article enumerating the cross-domain config/settings primitives (`Attribute` vs `Category` vs `DocumentTemplate` vs `PlanSettings`) or which carry `workspace_id`. I had to read all four protos to discover the `workspace_id` axis. **Add a `config-primitives.md` wiki article** ("which generic config entity do I hang a per-workspace setting on, and which are workspace-scoped"). Logged.

---

## 2. The checkpoint SET — options

The data row needing a discriminator is `phase_outcome_summary` (multiple rows per `job_phase` — `job_phase_id` f2 is `index=true`, **not** unique, so N-per-phase is already legal). Each row is one *checkpoint* of that phase. The question: **what does the row carry to say which configured checkpoint it is — with NO baked enum?**

| # | Option | The checkpoint SET lives in | The row's discriminator | One-line shape |
|---|---|---|---|---|
| ⛔ **0** | **`ReportingCheckpoint` enum** (the prior plan, REMOVED) | the proto enum (2 baked values) | `reporting_checkpoint = 24` (enum) | structure baked into the data model — **rejected by the maintainer** |
| **A** | 🟦 NEW `reporting_checkpoint` config entity (versioning-quad idiom, workspace-scoped) | a fresh `reporting_checkpoint` table, one row per configured checkpoint per workspace | `phase_outcome_summary.reporting_checkpoint_id`(→reporting_checkpoint, optional FK) | a generic, per-workspace, ordered checkpoint dictionary |
| **B** | **REUSE 🟩 `Category` with `module="reporting_checkpoint"`** | `Category` rows (`module="reporting_checkpoint"`, `workspace_id`, `display_order`, `code`) | `phase_outcome_summary.reporting_checkpoint_id`(→category, optional FK) | the checkpoint set is a `module`-keyed Category set; zero new entity |
| C | REUSE `Attribute`+`AttributeValue` | an `Attribute`(code="reporting_checkpoint") + `AttributeValue` rows | `phase_outcome_summary.reporting_checkpoint_value_id`(→attribute_value) | structurally OK but **global** (no workspace_id) → Defensibility loss |

### 2.1 Option A — a dedicated `reporting_checkpoint` config entity

🟦 New `proto/v1/domain/operation/reporting_checkpoint/` (mirrors the `outcome_criteria` idiom so a reader already knows the shape):

```
reporting_checkpoint
  id(1) · checkpoint_group_id(2, versioning anchor) · version(3) · version_status(4, REUSE VersionStatus)
  · supersedes_id(5→reporting_checkpoint) · scope(6, REUSE CriteriaScope SYSTEM/INDUSTRY/WORKSPACE/EVALUATION)
  · industry_code(7) · workspace_id(8→workspace, indexed)
  · code(9, "progress"/"final"/"q1"/"q2"/"baseline"/"discharge" — data, never enum)
  · label(10) · sequence_order(11) · is_terminal(12, bool — the "final/overall" flag a renderer keys on)
  · active(13) · created_by(14) · date quad(15-18).  unique_together(checkpoint_group_id, version) + (workspace_id, code).
```

- **Maps the source checkpoints (DQ1):** the loader reads source `sem1_progress`/`sem1_final`/`sem2_progress`/`sem2_final` and resolves each to **the workspace's configured `reporting_checkpoint` rows** by `code`: `progress` (seq 1, `is_terminal=false`) and `final` (seq 2, `is_terminal=true`). The *phase* (sem1 vs sem2) is still `job_phase_id`; the *checkpoint within the phase* is `reporting_checkpoint_id`. A workspace that wants 4 quarters seeds 4 rows (`q1..q4`); a workspace that wants one terminal view seeds one (`final`, `is_terminal=true`) or seeds none and leaves the FK NULL.
- **Pro:** purpose-built, self-documenting, `is_terminal` gives the renderer a clean "which is the overall view" signal, versioning-quad means a workspace can re-publish its checkpoint set immutably.
- **Con:** a whole new entity (+14-layer cascade) for what is essentially a 2-3-row lookup per workspace. **M cost** (one more entity to own) for a config that `Category` already models.

### 2.2 Option B — REUSE `Category` (the recommendation for checkpoints)

A reporting checkpoint **is** a *named, ordered, per-workspace, module-keyed member of a set* — the exact definition of `Category`. Seed `Category` rows with `module="reporting_checkpoint"`:

| code | name | display_order | workspace_id |
|---|---|---|---|
| `progress` | "Progress" | 1 | ‹ws› |
| `final` | "Final" | 2 | ‹ws› |

The row carries 🟦 `phase_outcome_summary.reporting_checkpoint_id = 24 [(options.v1.db).references = "category"]`. The loader resolves source `sem1_progress` → (`job_phase_id`=sem1, `reporting_checkpoint_id`=the `progress` Category row). A 4-quarter workspace seeds 4 Category rows; a terminal-only vertical (QC, diagnostics, retail) seeds **zero** and leaves the FK NULL → today's single-summary behavior is byte-identical.

- **Pro:** **zero new entity**; reuses a workspace-scoped, ordered, module-discriminated primitive that already exists and is already wired through 14 layers. The "is this the final/overall view" question is answered by `display_order` (the max) or by reading the configured set — and if a hard terminal flag is wanted, it rides `Category` data conventions (the highest `display_order`, or a `code="final"` convention) rather than a schema field. Most additive option.
- **Con (the honest trade-off):** `Category` has no `is_terminal` boolean and no versioning quad. "Which checkpoint is terminal" becomes a **convention** (highest `display_order`, or `code` lookup) rather than a typed field — a mild **Maintainability/Reliability** softness. Mitigated by a Layer-7 use-case validator (§5) that a workspace's `reporting_checkpoint` Category set is well-formed (≥1 row, unique `display_order`, exactly one designated terminal by convention). `Category` is *not* immutably versioned — but checkpoint sets rarely change mid-year, and a changed set does not silently re-grade historical rows (the `phase_outcome_summary` FK pins the row that existed).

### 2.3 Option C — `Attribute`+`AttributeValue` (reject)

Structurally `AttributeValue`(sort_order) under `Attribute`(code="reporting_checkpoint") is a clean ordered member set — but **neither carries `workspace_id`**. A checkpoint set defined here is **global**, so workspace A's "4 quarters" leaks into workspace B's report. **Defensibility veto** (tenant isolation must be structural). Retrofitting `workspace_id` onto the 14×-referenced shared `Attribute` is a high-blast-radius change to a global primitive — rejected.

---

## 3. The framework SET — options

The grade is ONE primary `score_scale` on `scoring_scheme` (unchanged). The alternates (DepEd, GPA, letter, percentile) are emitted as N `job_outcome_line` rows (multi-reporting Opt 2, already locked-leaning). The open question the exploration left: **where is the per-workspace LIST of "which frameworks to emit" authored?** It must NOT be on `scoring_scheme` (that would make DepEd a second *grade*) and must NOT be a `ScaleKind` value.

| # | Option | The framework SET lives in | How a line is emitted | Verdict |
|---|---|---|---|---|
| **F1** | **REUSE 🟩 `Category` (`module="reporting_framework"`) as the per-workspace framework list, each row → a `score_scale`** | `Category` rows (`module="reporting_framework"`, `workspace_id`, `display_order`, `code`="myp"/"deped"/"gpa") + a link from each to its `score_scale` | the report-generation use case reads the workspace's `reporting_framework` Category set → for each, band-looks-up the composite raw in its `score_scale` → emits a `job_outcome_line` with `reporting_role` + `score_scale_id` + `score_scale_band_id` snapshot | **✅ RECOMMENDED — symmetric with the checkpoint answer (§2.2), zero new entity, per-workspace, ordered** |
| F2 | A tiny 🟦 NEW `reporting_profile` config entity (header + member rows → score_scale) | `reporting_profile`(workspace-scoped) + `reporting_profile_framework`(→score_scale, is_primary, reporting_role, sequence) | same line emission | Default-conditional — cleaner typing (an explicit `is_primary` + typed `reporting_role`) but +1-2 new entities for what `Category` models; adopt only if the framework set needs first-class versioning/primary-flag |
| F3 | ONLY 🟩 `DocumentTemplate` layout names the columns (no member set) | the LibreOffice report-card template enumerates scales in its layout | the template drives which scales render | the exploration's v1 fallback — **opaque**: the framework set is not queryable as rows (a renderer-only concept). Fine for v1 byte-identical, but does not satisfy "the grade data references the set generically." Pair as the *layout* side only |

### 3.1 F1 — `Category` as the framework set (recommended), `DocumentTemplate` as layout

The framework set is, again, a *named, ordered, per-workspace, module-keyed set* → `Category` with `module="reporting_framework"`. Each framework Category row needs to point at the `score_scale` it transmutes through. Two NULL-safe ways to carry that link:

- **(F1a, recommended) data convention** — the report-generation use case resolves `score_scale` by matching `Category.code` to `score_scale.name`/`code` within the workspace (zero schema), for v1 (one MYP primary emitted, DepEd/GPA as go-forward activation).
- **(F1b) a thin join** — 🟦 `reporting_framework_scale`(category_id→category, score_scale_id→score_scale, is_primary, reporting_role) ONLY if the convention proves too loose.
- **`reporting_role` on `job_outcome_line`** (from multi-reporting Opt 2) discriminates the emitted lines ("primary"/"alternate"/"transcript_gpa"/"percentile"); NULL = the single primary line = today.
- **`DocumentTemplate`** (`module_key` ~ "report_card") remains the *layout*: which columns the PDF draws. The Category set says *what to compute*; the template says *how to draw it*. Clean separation: compute-set (queryable rows) vs layout (opaque template).

**Result: zero new entity for v1** (Category + DocumentTemplate, both existing) + the one already-planned `reporting_role` field on `job_outcome_line`. A new framework = one `Category` row + one `score_scale` (data), no proto change. The scheme keeps ONE primary scale.

### 3.2 Why NOT `scoring_scheme` and NOT `ScaleKind` (the locked principle, restated)

- **Not `scoring_scheme.score_scale_id` → many:** binding N scales to the scheme makes DepEd a *second grade*, not a *view*. The grade is the MYP transmutation; DepEd/GPA are reporting views of the same composite raw. Reporting ≠ grading. (Q-MR-1.)
- **Not a `ScaleKind` value:** MYP and DepEd are *both* `TRANSMUTATION` — framework identity is the `score_scale` row's identity (data), NOT its kind. `ScaleKind.MYP`/`ScaleKind.DEPED` solves it at the wrong layer. (Q-SCORE-3 — multi-reporting *strengthens* the resist-per-vertical-kinds stance.)

---

## 4. Mantra 5-lens scorecards (D & R are veto lenses)

Scored ✓ win · ~ acceptable · ✗ lose. A `✗` on **R** or **D** vetoes.

### 4.1 Checkpoints

| Option | M | Sc | R (veto) | D (veto) | O | Verdict |
|---|---|---|---|---|---|---|
| ⛔ 0 `ReportingCheckpoint` enum | ✗ structure baked in proto; new checkpoint shape = proto change | ✗ a 4-quarter / baseline-discharge workspace needs an enum edit | ~ (works but inflexible) | ✓ | ~ | **REJECTED (maintainer principle + M/Sc loss)** |
| **B REUSE `Category` (`module="reporting_checkpoint"`)** | **~** terminal-flag becomes a convention (no `is_terminal` field) — mild softness, validator-backed | **✓** any checkpoint set = data; new shape = seed rows, zero proto | **✓** (gated on §5 set-validator) FK pins the configured row; NULL = today | **✓** workspace-scoped by construction (`Category.workspace_id`) | **~** which-is-terminal is convention, queryable but not typed | **🟢 RECOMMENDED — most additive, zero new entity** |
| A NEW `reporting_checkpoint` entity | ✓ purpose-built, typed `is_terminal`, versioning quad | ✓ data-driven | ✓ versioned + workspace-scoped | ✓ | ✓ | **Default-conditional — adopt if the typed `is_terminal` + immutable versioning are worth +1 entity (14-layer cascade)** |
| C `Attribute`+`AttributeValue` | ~ ordered rows fit | ~ | ~ | **✗ VETO — global dictionary, no `workspace_id`; cross-tenant leak** | ~ | **🔴 REJECT (D-veto)** |

**Pick:** **B** wins ≥3 with no veto loss → recommended (canonical-leaning once the §5 set-validator lands). **A** is the documented upgrade if the maintainer wants `is_terminal` as a typed field and immutable checkpoint-set versioning. **C** is D-vetoed.

### 4.2 Framework-set

| Option | M | Sc | R (veto) | D (veto) | O | Verdict |
|---|---|---|---|---|---|---|
| **F1 REUSE `Category` (`module="reporting_framework"`) + `DocumentTemplate` layout** | **✓** one config primitive for both checkpoint + framework sets; compute-set vs layout cleanly split | **✓** new framework = 1 Category + 1 score_scale (data) | **✓** each emitted `job_outcome_line` snapshots its own `(score_scale_id, band_id)`; per-line version pinning (§8 #5) | **✓** workspace-scoped; not adversary-writable; no JSONB | **✓** lines are queryable provenance rows, ×N frameworks | **🟢 RECOMMENDED** |
| F2 NEW `reporting_profile` (+member) entity | ~ +1-2 entities; typed `is_primary`/`reporting_role` | ✓ scales to shared bundles | ✓ same per-line snapshot | ✓ | ✓ | Default-conditional — adopt if framework sets need versioning / explicit primary flag / cross-scheme reuse |
| F3 `DocumentTemplate` layout ONLY | ~ framework set not queryable as rows | ~ | ✓ (lines still snapshot) | ✓ | ✗ set is opaque (renderer-only) | **v1 layout pair only — does not satisfy "data references the set generically" by itself** |
| (binding to `scoring_scheme` / `ScaleKind`) | ✗ DepEd becomes a 2nd grade / wrong layer | ✗ per-vertical kinds explode | ~ | ✓ | ~ | **REJECTED (maintainer principle)** |

**Pick:** **F1** wins all 5 → recommended, symmetric with the checkpoint answer (one `Category`-based config mechanism for both SETs). **F2** is the upgrade if versioning/primary-flag/cross-scheme-reuse is needed. JSONB (Opt 4 of the exploration) stays R-vetoed.

---

## 5. ≥4-vertical genericity matrix (the subject-and-scoring §8 method)

Both mechanisms must serve ≥4 verticals or they are education config, not shared proto.

### 5.1 Per-workspace reporting CHECKPOINTS

| Vertical | The phase | The configured checkpoint SET (workspace data) | Coverage |
|---|---|---|---|
| **education** | semester | `{progress, final}` — or `{q1,q2,q3,q4}` for a quarter system; one school's report-card cadence ≠ another's | **CORE** |
| **manufacturing QC** | a production lot / run | `{interim_inspection, final_certificate}` — interim in-process QC + the Certificate of Conformance at lot close | **CORE** |
| **medical / clinic** | an episode of care | `{baseline, interim_visit, discharge}` — an arbitrary, per-clinic visit cadence; some report only `{discharge}` | **CORE** |
| **performance-eval** | a review cycle | `{mid_cycle_checkin, year_end}` — interim self/manager check-in + the final calibrated review | **CORE** |
| **hospitality / project-services** | an engagement / stay | `{weekly_status, final_acceptance}` or a single `{final}` | **PARTIAL** |

**Checkpoint verdict — 5/5 (4 CORE + 1 PARTIAL), ≥4 cleared decisively.** And the genericity is *stronger* than the baked enum could express: medical's `{baseline, interim, discharge}` (3 checkpoints, arbitrary count) and education's `{q1..q4}` (4 checkpoints) are **impossible** under a 2-value `{PROGRESS, FINAL}` enum — they only work because the SET is per-workspace data. **The config mechanism is provably more generic than the enum it replaces.**

### 5.2 Per-workspace reporting FRAMEWORK-SET

(Established 5/5 in [multi-reporting-exploration §5](../../../../../docs/plan/20260615-education-firestore-migration/multi-reporting-exploration.md) — manufacturing's internal-AQL-vs-customer-disposition and medical's value+interpretation+percentile exercise it *harder* than education.) The config-source addition here does not weaken that: each vertical's framework SET is a per-workspace `Category` set (education: `{myp, deped, gpa}`; manufacturing: `{aql_class, customer_disposition}`; medical: `{interpretation, percentile, critical_flag}`; eval: `{numeric, rating_label}`; CSAT: `{nps_bucket, csat_band}`). **5/5 — ≥4 cleared.**

---

## 6. The exact additive-proto delta (and what is REMOVED)

All additive — NULL/unset/zero-config-rows preserves today's behavior (single terminal summary, one framework). This **folds into the T1 scoring-primitives wave**; it does not open a new wave.

### 6a. REMOVED vs the prior plan

| ⛔ Removed | Was at | Replaced by |
|---|---|---|
| ⛔ `enum ReportingCheckpoint { UNSPECIFIED=0; PROGRESS=1; FINAL=2; }` | subject-and-scoring §6 #4; scoring-primitives §9 #5; progress.md #5 | a per-workspace `Category` set (`module="reporting_checkpoint"`) — §2.2 |
| ⛔ `phase_outcome_summary.reporting_checkpoint` **as an enum field** | subject-and-scoring §6 #5 (`= ReportingCheckpoint reporting_checkpoint = 24`) | 🟦 `phase_outcome_summary.reporting_checkpoint_id = 24` **as an FK → category** — §6b |
| ⛔ any framework-set bound into `scoring_scheme` or expressed as a `ScaleKind` value | (Q-MR-1 lean / Q-SCORE-3 risk) | a per-workspace `Category` set (`module="reporting_framework"`) + `DocumentTemplate` layout — §3.1 |

### 6b. ADDED (the recommendation: B + F1, both `Category`-based)

| # | Target | Change | Why |
|---|---|---|---|
| 1 | 🟩 `phase_outcome_summary` (highest field = 23) | 🟦 `optional string reporting_checkpoint_id = 24 [(options.v1.db).references = "category", (options.v1.db).index = true];` | discriminates the N durable checkpoint rows sharing one `job_phase`; **FK to config, not a baked enum**; NULL = terminal/single-view default (today) |
| 2 | 🟩 `job_outcome_line` (the new T1 entity, README §7 #1) | 🟦 `optional string reporting_role` (or small `ReportingRole` enum, Q-MR-2) + the already-planned `score_scale_id`/`score_scale_band_id`/`output_value`/`output_label` | N lines per (subject × framework); NULL = single primary line = today |
| 3 | 🟩 `common/Category` | **no proto change** — seed `module="reporting_checkpoint"` rows + `module="reporting_framework"` rows per workspace | the per-workspace checkpoint SET + framework SET as data |
| 4 | 🟩 `scoring_scheme.score_scale_id`(f13) | **no change** — stays the ONE PRIMARY scale | the grade is the MYP transmutation; alternates are reporting views |
| 5 | 🟩 `job_outcome_summary` `transmuted_score`(26)/`transmuted_label`(27) | **no change** — stays single (= primary framework) | one headline grade; alternates live on body lines |
| 6 | 🟩 `document/DocumentTemplate` (`module_key`) | **no change** — names the report-card columns (layout side) | compute-set (Category) vs layout (template) cleanly split |

**Net new schema for BOTH config mechanisms: ONE FK field** (`phase_outcome_summary.reporting_checkpoint_id`) + the one already-planned `reporting_role` on `job_outcome_line`. **Zero new entities.** **Minus one enum** vs the prior plan (`ReportingCheckpoint` deleted).

### 6c. The upgrade path (if typed config is wanted) — B→A / F1→F2

If the maintainer wants typed `is_terminal` + immutable versioning on checkpoints, swap #1's FK target from `category` to a new 🟦 `reporting_checkpoint` entity (§2.1) — same FK field number, different `references`. Symmetrically, F1→F2 swaps the framework `Category` set for a 🟦 `reporting_profile` entity. Both are forward-compatible: a `reporting_checkpoint`/`reporting_profile` entity can later *be* the FK target with no change to the consuming row's field. **Recommend ship B+F1 (Category) now; upgrade to A/F2 only if a concrete need for typed flags / versioning / cross-scheme reuse appears.**

### 6d. How the loader maps the source checkpoints (DQ1)

```
source row              → (job_phase_id,  reporting_checkpoint_id)
sem1_progress           → (sem1,          Category{module=reporting_checkpoint, code=progress, ws})
sem1_final              → (sem1,          Category{...code=final, ws})
sem2_progress           → (sem2,          Category{...code=progress, ws})
sem2_final              → (sem2,          Category{...code=final, ws})
year-final              → job_outcome_summary (one terminal row per job; no checkpoint FK)
```

The loader resolves each source suffix (`_progress`/`_final`) to the workspace's configured `reporting_checkpoint` Category row by `code`. A 4-quarter workspace's loader resolves `q1..q4` to 4 rows; a terminal-only vertical leaves `reporting_checkpoint_id` NULL. **The data model decided nothing about the checkpoint set — the workspace's Category seed did.**

### 6e. R-veto gates — MANDATORY Layer-7 validators (the hard gate)

`options/db.proto` `check` is per-field only; these are publish-time use-case validators (mirroring scoring-primitives §8):

1. **Checkpoint-set well-formedness** — a workspace's `module="reporting_checkpoint"` Category set must have ≥1 row, unique `display_order`, and exactly one designated terminal (highest `display_order` or `code="final"` by convention). A malformed set must fail loud, never silently mis-order report views.
2. **Checkpoint FK tenancy** — `phase_outcome_summary.reporting_checkpoint_id` must reference a `Category` row in the **same `workspace_id`** as the summary's job (structural tenant isolation; index the predicate).
3. **Framework-set ↔ scale resolution** — every `module="reporting_framework"` Category row must resolve to exactly one active `score_scale` (by convention F1a or join F1b); an unresolvable framework fails loud at generation, not silently drops a column.
4. **Primary framework exactly-one** — the framework set must designate exactly one primary (the one whose scale == `scheme.score_scale_id`); the primary line feeds the summary header.
5. **NULL-collapse parity** — with zero `reporting_checkpoint` rows and zero alternate `reporting_framework` rows, output is byte-identical to the current 15/15-tied dry-run (the additive invariant).

---

## 7. How this un-gates Q-SCORE-4 and revises Q-CHK + Q-MR-1

### Q-SCORE-4 — proceed to implementation now, or hold? (was 🟡 ITERATE/HOLD, the live gate)

**This design UN-GATES Q-SCORE-4 on the reporting-structure axis.** The two things that were implicitly baking structure into the proto (the `ReportingCheckpoint` enum + an unresolved framework-set home) are now **per-workspace config (`Category`), referenced by generic FK** — exactly the maintainer's locked principle. The proto delta shrinks: **−1 enum** (`ReportingCheckpoint` deleted), **+1 FK field** (`reporting_checkpoint_id`→category), zero new entities for the config mechanism. It is NULL-safe (byte-identical dry-run until config is seeded) and rides the same single additive wave. **Recommendation: proceed (un-hold) with B+F1 folded in; the §6e validators are the only hard gate.**

### Q-CHK (new/revised) — how is the checkpoint set expressed?

**Locked recommendation: REUSE `Category` (`module="reporting_checkpoint"`), FK from `phase_outcome_summary`, NO `ReportingCheckpoint` enum.** The enum (subject-and-scoring §6 #4/#5, scoring-primitives §9 #5, progress.md #5/#100/#151/#208/#261) must be struck from the wave. Upgrade to a typed `reporting_checkpoint` entity (Option A) only if `is_terminal`/versioning become load-bearing.

### Q-MR-1 (revised) — where is the framework-SET authored?

The exploration answered "report-card config, not the scheme" but left the config home as `DocumentTemplate`-OR-`reporting_profile` (genuinely open). **This doc closes it: the framework SET is a per-workspace `Category` set (`module="reporting_framework"`), with `DocumentTemplate` as the layout pair.** This is symmetric with the checkpoint answer — **one config primitive (`Category`) for both SETs** — and satisfies "the grade data references the set generically" (the lines carry FK + snapshot; the set is queryable rows, not opaque layout). `reporting_profile` (F2) becomes the documented upgrade, not a v1 requirement. Q-MR-2 (`reporting_role` string vs enum) is unchanged and still non-blocking.

---

## 8. Single recommendation

**Replace the baked `ReportingCheckpoint{PROGRESS,FINAL}` enum with a per-workspace `Category` set (`module="reporting_checkpoint"`), referenced by a new generic FK `phase_outcome_summary.reporting_checkpoint_id = 24 (→category)`. Author the framework-SET symmetrically as a per-workspace `Category` set (`module="reporting_framework"`), each row resolving to one `score_scale`, emitted as N `job_outcome_line` rows discriminated by `reporting_role`, with `DocumentTemplate` as the layout. The `scoring_scheme` keeps ONE primary `score_scale`; alternates are reporting views, never second grades, never `ScaleKind` values.**

Net delta: **−1 enum** (`ReportingCheckpoint` removed), **+1 FK field** (`reporting_checkpoint_id`), **+1 already-planned field** (`reporting_role`), **zero new entities**. Both SETs ride the existing, workspace-scoped, ordered, `module`-discriminated `Category` primitive. Defensibility holds by construction (`Category.workspace_id`). Genericity clears ≥4 verticals for both SETs (checkpoints 5/5, frameworks 5/5) — and the config mechanism is provably *more* generic than the enum (it expresses 4-quarter and baseline/interim/discharge cadences the 2-value enum cannot). Mantra: checkpoints **B = ≥3✓ no veto loss** (M~ on the terminal-convention softness, validator-backed); frameworks **F1 = 5✓**.

**The 2-3 sub-decisions this surfaces (for the maintainer):**

1. **Q-CHK-TYPED** — ship `Category`-reuse (B/F1) now, or the typed `reporting_checkpoint`/`reporting_profile` entities (A/F2) for typed `is_terminal` + immutable versioning + cross-scheme reuse? *Recommend B/F1 now (most additive); A/F2 is a forward-compatible upgrade (same FK field, swap `references`).*
2. **Q-FW-LINK** — resolve framework `Category` → `score_scale` by **data convention** (`code` match, F1a, zero schema) or a thin **`reporting_framework_scale` join** (F1b, +1 tiny entity)? *Recommend convention for v1 (one primary emitted); add the join only if the convention proves too loose.*
3. **Q-CHK-UNIQUE** — enforce "at most one row per (job_phase, checkpoint)" via a **composite unique index** `(job_phase_id, reporting_checkpoint_id)` now, or leave `index=true` + a use-case guard? *Recommend the use-case guard for v1 (additive-safe); promote to a unique index once the checkpoint set is stable.*

---

**Cross-references:** [scoring-primitives-design.md](./scoring-primitives-design.md) (§2 entity shapes, §8 validators, §9 Q-SCORE-3/4) · [README.md](./README.md) (§7 #1 the `job_outcome_line` body) · [multi-reporting-exploration.md](../../../../../docs/plan/20260615-education-firestore-migration/multi-reporting-exploration.md) (Opt 2 `reporting_role`; this doc supplies its missing framework-set config source) · [subject-and-scoring-model.md §6](../../../../../docs/plan/20260615-education-firestore-migration/subject-and-scoring-model.md) (the `ReportingCheckpoint` enum this REMOVES) · proto read directly: `phase_outcome_summary.proto` (f23 max) · `common/{attribute,attribute_value,category}.proto` · `document/template/template.proto` · `operation/enums/enums.proto` · `outcome_criteria.proto` (versioning-quad idiom) · [mantra.md](../../../../../docs/wiki/articles/mantra.md) (5-lens, D & R veto).
