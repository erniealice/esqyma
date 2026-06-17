# Design — How a `scoring_component` binds to the `outcome_criteria` it aggregates

| Field | Value |
|---|---|
| Date | 2026-06-17 |
| Status | 🟢 **DESIGN — recommendation locked: Option (C) `scoring_component_criteria` junction.** Resolves entities §4 #4 (the bucket-aggregation crux); un-holds **Q-SCORE-4**. |
| Resolves | The LAST proto-shape blocker for Q-SCORE-4 — DepEd's 1:many bucket→criteria requirement (school elementary grades 1-6 are **a LIVE requirement**, not hypothetical), while keeping MYP 1:1 working as the N=1 degenerate case, and keeping `outcome_criteria` reusable (no scheme-specific FK hung on it). |
| Method | 4 named options (A/C/D/E) + a 5th synthesized (C′) → Mantra 5-lens scorecard (R & D veto) → ≥4-vertical genericity matrix → exact additive delta vs [scoring-primitives-design.md](./scoring-primitives-design.md) §2/§4. |
| Companions | [scoring-primitives-design.md](./scoring-primitives-design.md) (the 4 scoring entities + Q-SCORE-1/2 locks; §7 the deliberate "`criteria_group_id` stays a bare versioning anchor" finding this doc honors) · [README.md](./README.md) (outcome-report families) · education [subject-and-scoring-model.md §3](../../../../../docs/plan/20260615-education-firestore-migration/subject-and-scoring-model.md) (the two grains) · [dry-run-mapping.md §3](../../../../../docs/plan/20260615-education-firestore-migration/dry-run-mapping.md) (the MYP 1:1 worked example) |
| Legend | 🟩 exists in proto today · 🟦 additive (this wave) · veto lens = R (Reliability) / D (Defensibility) per [mantra.md](../../../../../docs/wiki/articles/mantra.md) |

---

## 1. The question, sharpened

`scoring_component` is the per-scheme **roll-up bucket** (WW / PT / QA; AQL CRITICAL/MAJOR/MINOR; an eval dimension; a lab panel). Its `weight`(6) is the **bucket-grain** weight; `within_component_method`(9) is how the criteria **inside** one bucket aggregate. The crux: **how does a bucket bind to the `outcome_criteria` it aggregates?**

Two grains coexist and must NOT be conflated (the §2 finding of [subject-and-scoring-model.md](../../../../../docs/plan/20260615-education-firestore-migration/subject-and-scoring-model.md)):

```
within-criterion  : outcome_criteria.aggregation_method (f26, e.g. MAXIMUM best-fit) — across one criterion's recordings → a criterion level
within-bucket     : scoring_component.within_component_method (f9, a ScoringMethod) — across the N criteria in ONE bucket → a bucket score
composite         : scoring_scheme.composite_method (f12, a ScoringMethod) — across the M buckets → the scheme score → score_scale band lookup
```

The bucket→criteria edge sits **between** the within-criterion roll-up and the within-bucket roll-up. Today only the 1:1 edge exists: `scoring_component.outcome_criteria_id`(8, optional). The school's DepEd elementary requirement breaks it.

### Why the current 1:1 (`outcome_criteria_id` f8) is insufficient — the live failure

| Scheme | Shape | Does f8 express it? |
|---|---|---|
| **IB-MYP** (grades 7-9; the dry-run) | 4 components A/B/C/D, **each → exactly 1 criterion**, SUM the 4 | ✅ — `outcome_criteria_id` = the one criterion. N=1. |
| **DepEd** (grades 1-6; **NOW LIVE**) | bucket "Written Work" `weight=.30` aggregates **MANY** activities/criteria; PT `.50`; QA `.20`; `composite_method=WEIGHTED_AVERAGE`; within-bucket `within_component_method` aggregates many activity scores | ❌ — a scalar FK holds ONE criterion. |

To force DepEd through f8 you would have to **duplicate the WW bucket once per activity** — N rows all `code="WW"`, all `weight=.30`. That detonates every invariant the §8 validators in [scoring-primitives-design.md](./scoring-primitives-design.md) exist to enforce: `Σ component.weight = 1.0` now sums `.30 × N` (R-veto fail); `unique_together(scoring_scheme_id, code)` is violated (the WW code appears N times); the bucket weight is no longer "the bucket's weight" but "the bucket's weight smeared across its members." **f8 cannot express 1:many without a category error.** Confirmed insufficient.

So the model MUST support **1 bucket → N criteria**, per-scheme, with 1:1 as the **N=1 degenerate case**, and the per-scheme assignment may **NOT** live on the reusable `outcome_criteria` (it is a versioned library entity shared across schemes + tasks — `criteria_group_id`/`version`/`version_status`, read by `ListByGroup`/`GetCurrentPublished`).

---

## 2. The options (A/C/D/E + synthesized C′)

| | Binding | Where the per-scheme assignment lives | 1:many? | New entity? |
|---|---|---|---|---|
| **A** | 🟩 `scoring_component.outcome_criteria_id` (f8) scalar FK | on `scoring_component` (per-scheme ✅) | ❌ only 1:1 | no |
| **C** | 🟦 **NEW junction `scoring_component_criteria`** (`scoring_component_id`, `outcome_criteria_id`, +`sequence_order`, +`weight_override`, +`aggregation_method_override`) | on the junction (per-scheme ✅) | ✅ N rows per bucket | **+1 entity** |
| **D** | `scoring_component.criteria_group_id` → a criteria_group; all criteria in that group roll into the bucket | on `scoring_component` (per-scheme ✅) | ✅ (group membership) | no (reuses concept) |
| **E** | 🟦 `scoring_component_id` ON 🟩 `template_task_criteria` (the existing task↔criteria junction) | on `template_task_criteria` (**TEMPLATE grain** ❌) | ✅ (many TTC rows → one bucket) | no (reuses junction) |
| **C′** | C, but **f8 retained as a denormalized convenience read** for the N=1 case | junction is canonical; f8 is a cache | ✅ | +1 entity |

### A — the current 1:1 scalar FK
Cannot express 1:many (§1). It is the **N=1 special case of every other option** — keep it conceptually, but it cannot be the binding.

### C — a dedicated `scoring_component_criteria` junction
A normalized many-to-many between `scoring_component` and `outcome_criteria`, scheme-owned (the junction's `scoring_component_id` resolves to exactly one scheme via `scoring_component.scoring_scheme_id`). N rows = N criteria in the bucket; N=1 row = the MYP case. The per-criterion-within-bucket override fields (`weight_override`, `aggregation_method_override`) mirror `template_task_criteria`'s existing idiom exactly, so a reader already knows the shape. **The likely answer — pressure-tested below.**

### D — `scoring_component.criteria_group_id` (the group-membership bind)
Elegant: a bucket points at a `criteria_group_id`, and *all* `outcome_criteria` rows sharing that group roll into the bucket. Reuses an existing token. **But it directly reopens the §7 finding of [scoring-primitives-design.md](./scoring-primitives-design.md):** `outcome_criteria.criteria_group_id`(2) is a **bare versioning anchor** — it groups the *versions of one logical criterion* (v1, v2, v3 of "Analyzing"), read by `ListByGroup`/`GetCurrentPublished`. It is **not** a "these-criteria-belong-together-in-a-bucket" set. Overloading it with a second "weighted-category membership" meaning is the exact **one-FK-two-readers M-loss** Candidate A lost on in the parent doc. Worse than there: here it also breaks 1:many in practice — a bucket aggregating WW activities would need those activities to *share a versioning group*, which they emphatically do not (each activity-criterion is its own logical criterion with its own version lineage). **D conflates "is a version of" with "rolls up into," which is a category error on top of the FK overload.** Re-vetoed; see §5 for the explicit re-justification the task demanded.

### E — `scoring_component_id` on `template_task_criteria` (the grain-mismatch option)
`template_task_criteria` (🟩) is the `job_template_task ↔ outcome_criteria` junction — it pins which criteria a *template task* is graded on, at **TEMPLATE grain** (per `job_template_task_id`, f2). Putting `scoring_component_id` here assigns the bucket at the **task-criterion** grain and reuses an existing junction (no new entity). **The grain mismatch is fatal:**

- `scoring_component` is **SCHEME-grain** (it belongs to one `scoring_scheme`, which a `job_template`/`job`/`evaluation_template` references via the Q-SCORE-1 anchor). `template_task_criteria` is **TEMPLATE-grain** (it belongs to one `job_template_task`). A scheme is reusable across many templates/tasks; a task pins criteria for *one* template. Binding a scheme-grain bucket onto a template-grain junction means the **same logical bucket has to be re-declared on every task** that feeds it, and nothing guarantees two tasks assign the same criterion to the same bucket consistently → **R-veto: two readers can disagree on which bucket a criterion rolls into, silently.**
- It **strands schemes that have no tasks.** `evaluation_template` (perf-eval) and ad-hoc `job`-grain scoring (Q-SCORE-1 locked all three anchors) roll up *without* `template_task_criteria` rows — there is no task junction to hang the bucket on. E cannot express bucketing for two of the three locked anchors. **Scalability/coverage fail.**
- It couples the **config-side policy** (which criteria weight into which category) to the **template authoring** layer, violating the layering the scoring primitives deliberately established (the scheme is the policy home; the template is the work-definition home).

E is rejected on the grain mismatch alone (R-veto + coverage gap), independent of its (real) convenience of reusing a junction.

### C′ — C with f8 kept as a denormalized N=1 convenience
Tempting for migration (MYP loaders already write f8). But it creates **two sources of truth for the same edge** (f8 AND a junction row), which can drift — the exact reliability anti-pattern the mantra's "single source of truth" sub-question and the parent doc's Candidate-C R-veto both target. Rejected in favor of **deprecate-and-replace** (see §4): f8 is marked deprecated, the junction is canonical, and the N=1 case writes exactly one junction row.

---

## 3. Recommendation — **Option (C): the `scoring_component_criteria` junction**

> **Bind a bucket to its criteria through a new normalized junction `scoring_component_criteria`. 1:1 (MYP) = exactly one junction row per bucket (N=1). 1:many (DepEd) = N junction rows. The per-scheme assignment lives on the junction (scheme-derivable, never on reusable `outcome_criteria`). `scoring_component.outcome_criteria_id`(f8) is deprecated, not deleted (additive).**

### 3.1 The new entity (field shapes mirror `template_task_criteria`'s idiom — a reader already knows it)

`proto/v1/domain/operation/scoring_component_criteria/scoring_component_criteria.proto` (🟦, `table=true`):

```
message ScoringComponentCriteria {
  option (options.v1.table).table = true;

  string  id                          = 1;
  string  scoring_component_id        = 2 [(options.v1.db).references = "scoring_component", (options.v1.db).index = true];
  optional ScoringComponent scoring_component = 3;          // hydration sibling (mirrors TTC f3)
  string  outcome_criteria_id         = 4 [(options.v1.db).references = "outcome_criteria", (options.v1.db).index = true];
  optional OutcomeCriteria outcome_criteria = 5;            // hydration sibling (mirrors TTC f5)
  int32   sequence_order              = 6;                  // ordering within the bucket
  optional double weight_override     = 7;                  // per-criterion weight WITHIN this bucket (NULL → equal / outcome_criteria.weight)
  optional AggregationMethod aggregation_method_override = 8; // optional within-criterion override at this binding
  bool    active                      = 9  [(options.v1.db).default = "true"];
  optional int64  date_created        = 10;
  optional string date_created_string = 11 [(options.v1.db).ignore = true];

  // (options.v1.db).unique_together = ["scoring_component_id,outcome_criteria_id"]  — a criterion appears at most once per bucket
}
```

Field-shape notes:
- **No `scoring_scheme_id` on the junction** — it is derivable (`scoring_component_id → scoring_component.scoring_scheme_id`). Adding it would denormalize a derivable key (avoid; index the FK instead, per the parent doc's adversarial note).
- **No FK on `outcome_criteria`** — the reusable library entity is untouched. The junction is the *only* place the scheme-specific membership lives. This is the constraint the task fixed: the per-scheme assignment lives here, not on `outcome_criteria`.
- `weight_override`(7) + `aggregation_method_override`(8) are **deliberately the same two override fields `template_task_criteria` carries** (f8/f9 there) — same idiom, different junction, so within-bucket per-criterion weighting (DepEd activities can carry per-activity weight inside WW) is first-class without inflating the bucket grain.
- `unique_together(scoring_component_id, outcome_criteria_id)` is the same `repeated string unique_together` annotation `db.proto:42` already supports (and `scoring_component`/`scoring_scheme` already use for their `unique_together`).

### 3.2 How 1:1 degrades cleanly from 1:many (MYP = N=1)

The junction is the **single uniform path**; 1:1 is literally "N=1":

- **MYP** ("Analyzing" component → criterion A): one `scoring_component` row `code="A"` + **one** `scoring_component_criteria` row → `outcome_criteria` "Analyzing". `within_component_method` is a no-op over a single member (it returns that member's level). The bucket weight is irrelevant when `composite_method=SUM` (MYP sums the 4 bucket scores equally; `weights_must_sum_to_one=false`). **The dry-run's 4 components A/B/C/D each become 1 component + 1 junction row** — identical roll-up arithmetic, now through the junction instead of f8.
- **DepEd** (WW bucket → many activity-criteria): one `scoring_component` row `code="WW"` `weight=.30` + **N** `scoring_component_criteria` rows (one per activity-criterion). `within_component_method` aggregates the N activity scores into the WW bucket score; `composite_method=WEIGHTED_AVERAGE` applies the `.30/.50/.20` bucket weights.

No branch in the loader or the roll-up engine: both walk `scoring_component_criteria` for a bucket; MYP just yields one row. The 1:1 case is not a special path — it is the cardinality-1 instance of the general path. **This is the "1:1 degrades from 1:many" property the task required.**

### 3.3 The full two-level (really three-level) roll-up

```
LEVEL 0  within-criterion   outcome_criteria.aggregation_method (f26)
         each criterion's level = aggregate over its task_outcome recordings
         (MYP: MAXIMUM best-fit; QC: WORST; eval: INDIVIDUAL)

LEVEL 1  within-bucket       scoring_component.within_component_method (f9)
         bucket score = aggregate over the N criteria bound via scoring_component_criteria
         (optionally weighted by scoring_component_criteria.weight_override)
         (MYP: 1 member, identity; DepEd: many WW activities → WW score)

LEVEL 2  composite           scoring_scheme.composite_method (f12)
         scheme score = aggregate over the M buckets, weighted by scoring_component.weight
         (MYP: SUM of 4 bucket scores → /32; DepEd: WEIGHTED_AVERAGE of WW/PT/QA)
                              │
                              ▼  scoring_scheme.score_scale_id → score_scale band lookup (input_min ≤ raw < input_max)
                              ▼
         output_value + output_label + determination → job_outcome_summary.transmuted_score / transmuted_label
                                                       + job_outcome_line.score_scale_band_id (snapshot)
```

**Walked through — MYP 1:1 (English S1, this student, real numbers from the dry-run):**
- L0: criterion A "Analyzing" → MAX over its recordings = 5; B=5; C=5; D=5.
- L1: component A bound to {A} via one junction row → `within_component_method` over 1 member = 5; B=5; C=5; D=5.
- L2: `composite_method=SUM` over the 4 component scores = 5+5+5+5 = 20; `score_scale` band `[19,24)` → grade **5**. ✅ matches report card "Sem 1 = 5".

**Walked through — DepEd 1:many (a Written Work bucket, illustrative):**
- L0: each WW activity-criterion → its `aggregation_method` (e.g. LATEST/AVERAGE over its recordings) = the activity score.
- L1: component "WW" `within_component_method` (e.g. `EQUAL_WEIGHT`/`WEIGHTED_AVERAGE`) over the N junction-bound activity scores → the WW bucket % (optionally per-activity-weighted via `weight_override`).
- L2: `composite_method=WEIGHTED_AVERAGE` over WW(.30)/PT(.50)/QA(.20) → the quarter %; `score_scale` (`scale_kind=TRANSMUTATION`, 0-100→60-100) band lookup → the transmuted grade + descriptor.

Both flows are the **same three calls**; only the cardinality at L1 and the method enums differ — all data, no schema branch.

---

## 4. Exact additive delta (on top of [scoring-primitives-design.md](./scoring-primitives-design.md) §2/§4)

Everything below is **additive**; NULL/absent rows preserve today's MYP 1:1 behavior. No existing field changes shape.

| # | Target | Change | Why |
|---|---|---|---|
| 1 | **NEW** `proto/v1/domain/operation/scoring_component_criteria/` | new `table=true` message `ScoringComponentCriteria` (fields §3.1) + standard CRUD service + `ListByComponent` / `ListByCriteria` extra RPCs | the bucket→criteria junction |
| 2 | `scoring_component.proto` · `outcome_criteria_id` (f8) | **deprecate** — keep the field number reserved, mark `// DEPRECATED: bind via scoring_component_criteria. Retained for wire-compat / N=1 read.` Do **NOT** delete (additive-only; live rows). | f8 becomes the read-cache of the N=1 case; the junction is canonical |
| 3 | (no change) `scoring_component.within_component_method` (f9) | unchanged — it now aggregates the junction-bound criteria instead of "the single f8 criterion" | within-bucket roll-up |
| 4 | (no change) `outcome_criteria` | **untouched** — the reusable library entity gains nothing; the per-scheme membership lives only on the junction. `criteria_group_id`(2) stays a bare versioning anchor. | honors the §7 finding |

**On f8 — keep, deprecate, or replace?** **Deprecate-and-replace** (not silent keep, not delete):
- *Delete* is forbidden (additive-only; MYP migration rows may already write f8).
- *Keep dual-source (C′)* invites drift (two sources of truth for one edge) — R anti-pattern.
- *Deprecate* (this design): the junction is the single source of truth; f8 is annotated deprecated and read-only-legacy; the MYP loader writes a junction row, not f8. New code never reads f8 for roll-up. A later additive cleanup wave can drop f8 once no rows reference it (its own migration plan, like the parent doc's mutable-counter debt).

> **Migration note (additive, zero-risk):** the dry-run's MYP loader ([dry-run-mapping.md §3](../../../../../docs/plan/20260615-education-firestore-migration/dry-run-mapping.md), `scoring_component ×4`) currently sets `outcome_criteria_id` on each component. Under this design it instead emits **one `scoring_component_criteria` row per component** (`scoring_component_id → outcome_criteria_id`, `sequence_order` carried from the component). Arithmetic is identical (N=1). This is the only loader delta and it is mechanical.

### 4.1 R-veto gates this junction inherits / adds (extend [scoring-primitives-design.md §8](./scoring-primitives-design.md))

These are Layer-7 publish-time use-case validators (`db.proto` `check` is per-field only, cannot express cross-row invariants):

1. **Membership non-empty** — a published `scoring_component` must bind **≥1** `scoring_component_criteria` row (or carry the legacy f8) — a bucket with zero criteria silently contributes nothing / divides by zero. Fail loud at publish.
2. **No cross-scheme leak** — every `scoring_component_criteria.scoring_component_id` must resolve to a component whose `scoring_scheme_id` matches the scheme being published (a bucket cannot borrow another scheme's criteria). Structural via the FK + a publish check. *(D-relevant: prevents a scheme assembling another tenant's/scheme's buckets.)*
3. **Within-bucket weight sum** — when the bucket's `within_component_method` is weight-bearing (`WEIGHTED_AVERAGE`) and `weight_override`s are set, `Σ weight_override = 1.0` within the bucket (mirror the scheme-level `weights_must_sum_to_one` gate, one grain down).
4. **Version pinning** — a published binding pins the **specific** `outcome_criteria` version (not just its group), so republishing a criterion does not silently re-grade history (same immutability rule the parent doc's gate #5 applies to `score_scale`). The junction's `outcome_criteria_id` is a version id, not a group id — this is automatic given the FK targets `outcome_criteria` (versioned rows), reinforcing why **D (group-FK) is wrong**: a group FK would *not* pin a version.
5. **Uniqueness** — `unique_together(scoring_component_id, outcome_criteria_id)` so a criterion cannot be double-counted in one bucket.

---

## 5. Re-justifying the §7 finding (D stays M-vetoed) — the explicit reopen the task demanded

[scoring-primitives-design.md §7](./scoring-primitives-design.md) deliberately did **not** realize `outcome_criteria.criteria_group_id` as a weighted-category link (one FK, two readers ⇒ M-loss). The task asked: *is D acceptable now that 1:many is live, or still M-vetoed?* **Still vetoed — and now for two reasons, not one:**

1. **The original M-loss stands.** `criteria_group_id`(2) is read by `ListByGroup`/`GetCurrentPublished` as the **version lineage anchor**. A second reader interpreting it as "bucket membership" is the one-FK-two-meanings overload the parent doc rejected. Nothing about DepEd going live changes that the *same column* would carry two incompatible meanings.
2. **A new category error surfaces under 1:many.** For D to express "WW aggregates these N activities," those N activity-criteria would have to **share a `criteria_group_id`** — i.e. be versions of *one logical criterion*. They are not: each WW activity is its own criterion with its own version history. D forces "rolls-up-into" to masquerade as "is-a-version-of." That is a **Reliability** error (the wrong grouping silently mis-rolls-up), promoting D's loss from M-only to **M + R (veto)**.

D is therefore *more* vetoed under the live 1:many requirement, not less. The junction (C) keeps versioning (`criteria_group_id`) and bucketing (`scoring_component_criteria`) as **separate, single-reader** concerns — exactly the separation the §7 finding protects.

---

## 6. Mantra scorecard (R & D veto)

| Option | M | Sc | R (veto) | D (veto) | O | Verdict |
|---|---|---|---|---|---|---|
| **A** f8 scalar FK (status quo) | ✓ | ✗ (cannot 1:many w/o duplicating components) | ✗ (duplicated components break weight-sum + unique) | ✓ | ~ | **Insufficient** — fails the live requirement on two veto-adjacent + Sc |
| **C** `scoring_component_criteria` junction | ✓ (mirrors TTC idiom; one place per rule) | ✓ (N rows; data-only across verticals/jurisdictions) | ✓ (gated on §4.1 validators) | ✓ (no cross-scheme leak; version-pinned) | ~ (snapshot via existing `score_scale_band_id`) | **WINNER — no veto loss** |
| **D** `criteria_group_id` group-FK | ✗ (FK overload, 2 readers) | ✓ | ✗ (rolls-up vs is-version-of category error) | ✓ | ~ | **M + R veto — rejected (§5)** |
| **E** `scoring_component_id` on `template_task_criteria` | ~ (couples policy to template authoring) | ✗ (strands `evaluation_template`/ad-hoc `job` schemes; no task junction) | ✗ (two tasks can disagree on a criterion's bucket, silently) | ✓ | ~ | **R veto + coverage gap — rejected** |
| **C′** C + f8 dual-source | ✓ | ✓ | ✗ (two sources of truth for one edge → drift) | ✓ | ~ | Rejected for **deprecate-and-replace** (§4) |

**C is the only option with no `✗` on a veto lens (R, D)** and it wins M + Sc outright. The lone `~` is Observability — inherited from the parent doc (the band snapshot on `job_outcome_line.score_scale_band_id` already gives "which band produced this grade"; the junction adds no new blind spot). **C is the default pick** (≥3 wins, no veto loss); it is canonical-leaning once §4.1 validators land (which gate R).

---

## 7. Genericity matrix — do ≥4 verticals genuinely need 1:many buckets?

The bar (per [subject-and-scoring-model.md §8](../../../../../docs/plan/20260615-education-firestore-migration/subject-and-scoring-model.md)): a primitive earns shared-proto status only if **≥4 verticals** genuinely need a **bucket → N criteria** edge (not 1:1, which f8 already covers). If only education-DepEd needs it, it should be education config, not proto.

| Vertical | Does a bucket aggregate **MANY** criteria? (the 1:many test) | Coverage | Evidence |
|---|---|---|---|
| **education — DepEd** (grades 1-6, **LIVE**) | **YES** — "Written Work" bucket aggregates **many** activities/criteria; PT, QA likewise; `WEIGHTED_AVERAGE` over the buckets, many members per bucket | **CORE** | task §, this doc §1; the live elementary requirement |
| **education — IB-MYP** (grades 7-9) | NO — each component → 1 criterion (N=1) | (1:1 only) | dry-run §3 (4 components, 1 criterion each) |
| **manufacturing QC** | **YES** — an AQL **severity class** (CRITICAL) aggregates **many defect-types** (each defect-type is its own criterion); `MINIMUM_DETERMINATION` over classes, many defect-criteria per class | **CORE** | scoring-primitives §6 (AQL CRITICAL/MAJOR/MINOR); the class is the bucket, the defect-types are the N criteria |
| **performance-eval** | **YES** — a **dimension** (Leadership) aggregates **many questions/items** (each item is its own criterion); `WEIGHTED_AVERAGE` over dimensions, many item-criteria per dimension | **CORE** | scoring-primitives §6 (Delivery/Collaboration/Leadership weighted); perf-eval entities (ComputeEvaluationScore over weighted dimensions) |
| **medical / diagnostic** | **YES** — a **panel** (Metabolic Panel) aggregates **many analytes** (each analyte is its own criterion/reference-range); panels nest via `parent_component_id`, many analyte-criteria per panel | **CORE** | scoring-primitives §6 (Hematology/Metabolic/Lipid panels; CBC reference ranges per analyte) |
| professional-services | PARTIAL — engagement review dimensions can hold multiple items, but README models mostly per-criterion CSAT | PARTIAL | perf-eval overlap; weaker than the 4 CORE |
| retail / laundry / leasing | mostly single-checkpoint pass/fail; 1:1 or no bucket | PARTIAL/N/A | scoring-primitives §6 PARTIALs (pass/fail dominant) |

**Verdict: ≥4 verticals genuinely need 1:many — education-DepEd, manufacturing (AQL class → defect-types), performance-eval (dimension → items), medical (panel → analytes). Decisively clears the ≥4 bar.** It is **not** education-only: manufacturing's severity-class→defect-types and medical's panel→analytes are textbook many-criteria-per-bucket. The 1:many junction is shared proto, not education config — the same conclusion the parent doc reached for the scoring entities themselves. (And MYP demonstrates the N=1 degenerate case is a real, common instantiation, so the junction must degrade cleanly — which §3.2 confirms it does.)

---

## 8. Sub-decisions (2-3) to lock

| ID | Question | Recommendation |
|---|---|---|
| **Q-BIND-1** | f8 disposition | 🟢 **Deprecate-and-replace** (§4 #2). Keep the field+number reserved with a `// DEPRECATED` note; junction is canonical; MYP loader writes a junction row; a later additive wave drops f8 once unreferenced. (Not dual-source C′ → no drift; not delete → additive-only.) |
| **Q-BIND-2** | per-criterion-within-bucket weighting | 🟢 **Carry `weight_override`(7) + `aggregation_method_override`(8) on the junction**, mirroring `template_task_criteria` f8/f9. NULL → equal/`outcome_criteria.weight`. Needed for DepEd activities that carry per-activity weight inside a bucket; free for MYP (NULL). |
| **Q-BIND-3** | does the junction carry `scoring_scheme_id`? | 🟢 **No** — derivable via `scoring_component_id → scoring_component.scoring_scheme_id`. Index the `scoring_component_id` FK instead. (Denormalizing a derivable key is the parent doc's adversarial anti-pattern; the cross-scheme-leak validator §4.1 #2 enforces consistency without the column.) |

---

## 9. How this resolves entities §4 #4 + un-holds Q-SCORE-4

**entities §4 #4 — "How does a `scoring_component` bind to the `outcome_criteria` it aggregates?"** — **RESOLVED:** via a new normalized junction **`scoring_component_criteria`** (`scoring_component_id` × `outcome_criteria_id` + sequence + per-criterion overrides). The bucket→criteria edge is many-to-many, per-scheme (scheme-derivable, never on reusable `outcome_criteria`), with **1:1 (MYP) as the N=1 degenerate case** of the same uniform path. The two competing reuse-an-existing-field options are explicitly rejected on veto lenses: **D** (`criteria_group_id`) is M+R-vetoed (FK overload + rolls-up-vs-is-version-of category error, §5); **E** (`scoring_component_id` on `template_task_criteria`) is R-vetoed + coverage-gapped (scheme-grain bucket on a template-grain junction; strands `evaluation_template`/ad-hoc-`job` schemes). The current scalar `outcome_criteria_id`(f8) is confirmed **insufficient** for 1:many and is deprecated.

**Q-SCORE-4 (the HELD gate) — UN-HOLDS:** [scoring-primitives-design.md §9](./scoring-primitives-design.md) marked Q-SCORE-4 `ITERATE/HOLD — data design under review` with the bucket-aggregation crux as the open blocker. This design closes it:
- The **exact additive delta** is enumerated (§4): **+1 entity** (`scoring_component_criteria`), deprecate `scoring_component.outcome_criteria_id`(f8), **zero** change to `outcome_criteria`. This rides the **same single additive wave** as the 4 scoring entities + `ScaleKind` + the 6 enum/field changes from [subject-and-scoring-model.md §7](../../../../../docs/plan/20260615-education-firestore-migration/subject-and-scoring-model.md) (Q-SCORE-2 = all-together).
- The roll-up is fully specified (§3.3) and **tied out against the real 15/15-subject MYP report card** (N=1) and walked through for DepEd (1:many).
- Mantra 5/5 with no veto loss (§6); ≥4-vertical genericity confirmed (§7).
- The R-veto validators are enumerated (§4.1), extending the parent doc's §8 gate set — the remaining gate Q-SCORE-4 requires before implementation.

**Remaining before P3 build:** the §4.1 validators must be implemented at Layer 7 (the R-veto condition), and the migration T1–T8 locks + the Q-SCORE-1 proto wave still apply ([dry-run-mapping.md §6](../../../../../docs/plan/20260615-education-firestore-migration/dry-run-mapping.md)). The **proto shape** is no longer a blocker — that was the last one, and it is C.

---

**Cross-references:** [scoring-primitives-design.md](./scoring-primitives-design.md) (the 4 scoring entities; §2 `scoring_component` field shape with `outcome_criteria_id` f8; §7 the protected `criteria_group_id` finding; §8 R-veto validators this doc extends) · [README.md](./README.md) (outcome-report families; the `job_outcome_line` body) · [subject-and-scoring-model.md §3](../../../../../docs/plan/20260615-education-firestore-migration/subject-and-scoring-model.md) (the two grains) + [§7](../../../../../docs/plan/20260615-education-firestore-migration/subject-and-scoring-model.md) (the consolidated additive list this delta joins) · [dry-run-mapping.md §3/§4](../../../../../docs/plan/20260615-education-firestore-migration/dry-run-mapping.md) (MYP 1:1 worked example, 15/15 tie-out) · existing proto `packages/esqyma/proto/v1/domain/operation/{outcome_criteria,template_task_criteria,criteria_threshold,criteria_option,enums}/` · [mantra.md](../../../../../docs/wiki/articles/mantra.md).
