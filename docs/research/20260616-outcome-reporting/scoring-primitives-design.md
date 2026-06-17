# Design — Generic cross-vertical scoring primitives (weighted categories + score scales)

| Field | Value |
|---|---|
| Date | 2026-06-16 |
| Status | 🟢 **DESIGN — winner adjudicated; Q-SCORE-1/2 LOCKED 2026-06-16** (all-4-together; anchor = `job_template` + `evaluation_template` + `job` back-edges). **Q-SCORE-4 = ITERATE/HOLD** — data design under review, see [entities.md](../../../../../docs/plan/20260615-education-firestore-migration/entities.md). Q-SCORE-3 + the §8 validators pending. |
| Resolves | education Q-GRADE-3/4 ([grade-mapping.md](../../../../../docs/plan/20260615-education-firestore-migration/grade-mapping.md)) — *generically*, as a platform primitive (per the maintainer's steer: no education-specific entity, no JSONB blob, multiple records, Mantra 5/5) |
| Method | 3 candidate designs → Mantra-scored adjudication → adversarial verify (additivity PASS; genericity/defensibility CONCERN-with-fixes) |
| Companion | [README.md](./README.md) (outcome-reporting research — the `job_outcome_line` body model these compose with) |

---

## 1. What this resolves + the winner

Two greenfield gaps (verified absent: **no `criteria_group` entity, no score-scale entity** anywhere in the proto):
1. **Weighted scoring categories** — a config-side weighted bucket that results roll up through (education WW/PT/QA; manufacturing AQL severity classes; eval dimensions).
2. **Score transmutation / mapping** — a reusable, normalized table mapping an input score (range) → output value + label + determination (education DepEd matrix; lab reference ranges; NPS bucketing; rating labels).

**Winner: the `scoring_scheme` aggregate (Candidate B)** — the only candidate with **no veto-lens loss**. It beats the two alternatives precisely on the veto lenses:
- vs **Candidate A** (realize `criteria_group_id`): A overloads the *bare versioning anchor* `outcome_criteria.criteria_group_id` (`outcome_criteria.proto:20`, used by `ListByGroup`/`GetCurrentPublished`) with a second "weighted category" meaning — one FK, two readers ⇒ **M loss**. B uses a *fresh* `scoring_component` FK and leaves `criteria_group_id` untouched.
- vs **Candidate C** (weight on the output `job_outcome_line`): C strands the category weight on an output/event-grain row written at grading time ⇒ two graders can record different WW/PT/QA weights and nothing detects it ⇒ **R-veto loss**. B gives the weight a config-side home (`scoring_component.weight`).

Grafts that make the winner stronger than B-as-proposed: **`parent_component_id` nesting** (from A — panel→sub-panel) and **`score_scale_band_id` snapshot on the report body** (from C — observability: "which band produced this grade").

## 2. The proposal — 4 new entities + 1 new enum (all generic; zero `Grade`/`DepEd`/`WW`/`PT`/`QA` tokens)

> **⊕ Note (2026-06-16):** the additive footprint grew past this section's "4 entities + 1 enum" — see **§4 + §9** for the full list (a 2nd enum `ReportingCheckpoint`, two existing-enum value appends, three optional fields, and two structural candidates). This section's entity field-shapes are unchanged.

New domain dir `proto/v1/domain/operation/{scoring_scheme,scoring_component,score_scale,score_scale_band}/`. Field shapes **mirror `outcome_criteria`'s idioms** (versioning quad, `scope`/`industry_code`/`workspace_id`, date quad) so a reader already knows the pattern.

### `scoring_scheme` — the reusable composite policy (weighted-bucket header)
`id`(1) · `scheme_group_id`(2, *fresh* versioning anchor) · `version`(3) · `version_status`(4, REUSE `VersionStatus`) · `supersedes_id`(5→scoring_scheme) · `scope`(6, REUSE `CriteriaScope`) · `industry_code`(7) · `workspace_id`(8→workspace) · `name`(10) · `description`(11) · **`composite_method`**(12, REUSE `ScoringMethod`) · **`score_scale_id`**(13→score_scale, optional — composite transmutation) · **`weights_must_sum_to_one`**(14, bool default true) · `active`(15) · `created_by`(16) · date quad(17-20). `unique_together(scheme_group_id,version)`.

### `scoring_component` — the weighted bucket rows (WW/PT/QA grain; normalized, many-per-scheme)
`id`(1) · `scoring_scheme_id`(2→scoring_scheme) · **`parent_component_id`**(3→scoring_component, nesting) · `code`(4, "WW"/"AQL_MINOR"/"DELIVERY") · `label`(5) · **`weight`**(6, double default 1.0 — *the category-grain weight*, composes **above** `outcome_criteria.weight`) · `sequence_order`(7) · `outcome_criteria_id`(8→outcome_criteria, optional — which rubric feeds it) · `within_component_method`(9, REUSE `ScoringMethod`) · `min_count`(10) · `active`(11) · date quad(12-15). `unique_together(scoring_scheme_id,code)`.

### `score_scale` — the reusable mapping header (the DepEd matrix as ONE row owning many bands)
`id`(1) · `scale_group_id`(2) · `version`(3) · `version_status`(4) · `supersedes_id`(5→score_scale) · `scope`(6) · `industry_code`(7) · `workspace_id`(8→workspace) · `name`(10) · **`scale_kind`**(11, NEW `ScaleKind`) · `input_unit`(12) · `output_unit`(13) · `input_min`(14)/`input_max`(15, declared domain for the coverage validator) · `active`(16) · `created_by`(17) · date quad(18-21). `unique_together(scale_group_id,version)`.

### `score_scale_band` — the normalized mapping rows ("multiple records, not JSONB")
`id`(1) · `score_scale_id`(2→score_scale) · **`input_min`**(3, INCLUSIVE lower) · **`input_max`**(4, EXCLUSIVE upper — half-open `[min,max)`; `check "input_min < input_max"`) · `input_match`(5, exact-match key for LOOKUP scales) · **`output_value`**(6) · **`output_label`**(7) · `output_code`(8) · `output_determination`(9, REUSE `Determination`) · `band_role`(10, REUSE `ThresholdRole` — interop with `criteria_threshold`) · `sequence_order`(11) · `active`(12) · date(13-14). `unique_together(score_scale_id,sequence_order)`.

### NEW enum `ScaleKind` (appended after `enums.proto:219`)
Proposed 6 values (exact set = a lock item): `UNSPECIFIED` · `TRANSMUTATION` (education) · `DISPOSITION` (manufacturing accept/rework/scrap) · `INTERPRETATION` (medical normal/high/low) · `RATING` (eval label) · `LOOKUP`/`BUCKETING` (NPS exact/range buckets).

## 3. Roll-up + lookup flow

```
outcome_criteria (rubric, per item)  ──criteria_group_id UNTOUCHED──┐
        │ outcome_criteria_id(8)                                    │
        ▼                                                           │
scoring_component (weight=0.30…)  ──parent_component_id──►(nest)     │  composite =
        │  Σ within one scheme                                      │  Σ(component.weight × component_score)
        ▼                                                           │  via scoring_scheme.composite_method
scoring_scheme (composite policy) ──score_scale_id──► score_scale ──► band lookup
                                                       (input_min ≤ raw < input_max)
                                                            ▼
                                          output_value + output_label + determination
                                                            ▼
        job_outcome_summary.transmuted_score(26)/transmuted_label(27)  +  job_outcome_line.score_scale_band_id (snapshot)
```

## 4. Additive plan — nothing existing changes shape

> **⊕ CORRECTION (2026-06-16, additive) — the full additive list now lives in §9.** When this section was written it added only the 4 entities + `ScaleKind`. The education migration design (IB-MYP, verified 15/15 subjects) forced **6 more additive changes** (a second new enum `ReportingCheckpoint`; two existing-enum value appends; phase-level + checkpoint + text-length fields) plus **2 structural candidates** (section capacity, `line_workspace_user`). They are enumerated in **§9** with exact field numbers, and authoritatively in [subject-and-scoring-model.md §7](../../../../../docs/plan/20260615-education-firestore-migration/subject-and-scoring-model.md). The bullets below are the *minimum* (entities + scale plumbing); read them together with §9.

- **4 new `table=true` messages** + **2 new enums** (`ScaleKind` **+ `ReportingCheckpoint`** — see §9; additive block; existing enum numbers untouched).
- **New optional FK fields at fresh numbers** on existing entities (NULL ⇒ today's behavior preserved): the composite anchor `scoring_scheme_id` on **all three** of `job_template` / `evaluation_template` / `job` (Q-SCORE-1 lock — one shared scheme-resolve path keeps them consistent); `job_outcome_summary.scoring_scheme_id`=**25**, `transmuted_score`=**26**, `transmuted_label`=**27** (NOT 24 — `job_outcome_summary.proto:24` is `date_modified_string`; highest used = 24); `job_outcome_line.score_scale_id` + `score_scale_band_id`. *(Plus the phase-level `scoring_scheme_id`, `reporting_checkpoint`, and `min_text_length` fields + the two enum-value appends — see §9.)*
- **Untouched:** `outcome_criteria.criteria_group_id` stays a bare versioning anchor (the winner deliberately does NOT realize it); the three existing per-criterion `weight` scalars are unchanged (`scoring_component.weight` composes above them); `phase_outcome_summary.supersedes_id` keeps its versioning meaning (the checkpoint uses the new field, not it).

## 5. Education mapping (WW/PT/QA + DepEd, generically)

- One `scoring_scheme` ("K-12 Quarterly Grading", `composite_method=WEIGHTED_AVERAGE`, `weights_must_sum_to_one=true`) owns **3 `scoring_component` rows**: WW=0.30, PT=0.50, QA=0.20 (DepEd track-splits like Core 0.25/0.50/0.25 are just *different scheme rows* — data).
- DepEd transmutation = **one `score_scale`** (`scale_kind=TRANSMUTATION`, `input_unit="pct"`, `input_min=0`/`max=100`) + **~21 `score_scale_band` rows** (e.g. `[0,60)→output_value=60, label "Did Not Meet Expectations", determination=FAIL` … `[100,100.01)→100 "Outstanding"`). The scheme's `score_scale_id` points at it; raw weighted % → transmuted 60-100 grade + descriptor.
- "DepEd"/"Outstanding" live **only in seed-row data** (`name`/`output_label`), never in schema.

## 6. Cross-vertical matrix (same two primitives, data-only)

| Vertical | `scoring_scheme` + `scoring_component` | `score_scale` (`ScaleKind`) |
|---|---|---|
| **Education** | "Quarterly Grading": WW 0.30 / PT 0.50 / QA 0.20, `WEIGHTED_AVERAGE` | "DepEd Transmutation" (`TRANSMUTATION`): raw% → 60-100 + descriptor |
| **Manufacturing QC** | "AQL 2.5": CRITICAL/MAJOR/MINOR, `MINIMUM_DETERMINATION` (worst gates the lot) | "Disposition" (`DISPOSITION`): defect-rate → Accept/Rework/Scrap + `band_role=CRITICAL_MAX` |
| **Medical / diagnostic** | (often weightless) panels Hematology/Metabolic/Lipid nested via `parent_component_id` | "CBC Reference Ranges" (`INTERPRETATION`) per analyte: value → Normal/High/Low/Critical, label-only |
| **Performance eval** | `scope=EVALUATION`: Delivery/Collaboration/Leadership weighted | "Rating" (`RATING`): raw → 1-5 + "Outstanding"/"Meets"/"Below" |
| **Hospitality/CSAT** | single "NPS" component | "NPS" (`LOOKUP`): `[0,7)`→Detractor, `[7,9)`→Passive, `[9,11)`→Promoter |

## 7. Mantra scorecard

| Candidate | M | Sc | R (veto) | D (veto) | O | Verdict |
|---|---|---|---|---|---|---|
| A realize `criteria_group`+scale | ~ (FK overload) | ✓ | ~ (validator + mis-rollup) | ✓ | ~ | Default, conditional |
| **B `scoring_scheme` aggregate** | **✓** | **✓** | **✓** (gated on §8 validators) | **✓** | **~** | **WINNER — canonical-leaning** |
| C `job_outcome_line`+scale | ✓ | ✓ | ✗ (weight has no config source) | ✓ | ✓ | Needs written trade-off (R loss) |

## 8. R-veto gates — MANDATORY validators (not optional; the hard gate)

`options/db.proto:23` `check` is **per-field only** — it cannot express cross-row invariants. These are **Layer-7 publish-time use-case validators**, required for R to hold:

1. **Band tiling** — bands must tile `[score_scale.input_min, input_max]` with **no gap / no overlap** (a band-miss must be impossible).
2. **Weight sum** — `Σ scoring_component.weight = 1.0` when `weights_must_sum_to_one`.
3. **Half-open boundary** — fix `[input_min, input_max)` (inclusive-lower, exclusive-upper) uniformly + document it (DepEd matrices are often authored inclusive-inclusive → a boundary score silently mis-bands).
4. **Band-miss handling** — fail loud + structured attributable log (never a silent null grade); require a catch-all band or preflight coverage check.
5. **Scale-version pinning** — a published `scoring_scheme` pins a *specific* `score_scale` version (else republishing a scale silently re-grades historical jobs — mirror `outcome_criteria` `supersedes_id` immutability).
6. **`ScoringMethod` semantics at composite grain** — confirm `MINIMUM_DETERMINATION`/`PERCENTAGE_PASS` (authored per-criterion) are meaningful at the composite grain, or the wrong method silently mis-rolls-up.

Adversarial verify also flagged (fix at impl): index the copied `workspace_id` tenant predicate; the field-number correction (25/26/27) above.

## 9. Open decisions to lock

| ID | Question | Recommendation |
|---|---|---|
| **Q-SCORE-1** | Composite anchor | 🟢 **LOCKED — `job_template` + `evaluation_template` + `job` back-edges** (all three carry an optional `scoring_scheme_id`; perf-eval reviews and ad-hoc/instance scoring roll up natively from day one). Keep the three consistent via one shared scheme-resolve path (the M cost of multiple anchors). |
| **Q-SCORE-2** | Phasing | 🟢 **LOCKED — all 4 entities together** (`scoring_scheme`+`scoring_component`+`score_scale`+`score_scale_band` in one additive wave, so education WW/PT/QA + DepEd transmutation work end-to-end). |
| **Q-SCORE-3** | `ScaleKind` value set | Lock the 6 proposed values; verticals are data, not enum values (resist per-vertical kinds). **OPEN — pondering.** |
| **Q-SCORE-4** | Proceed to implementation now, or hold? | 🟡 **ITERATE / HOLD — the live gate.** Data design under review ([entities.md](../../../../../docs/plan/20260615-education-firestore-migration/entities.md)); the **7 additive candidates** below (4 scoring entities + the 6 more enum/field changes + 2 structural candidates) all ride **one** additive proto wave, gated on accepting the model + §8 validators. |

> **Additive candidates pulled in by the education migration design** — fold ALL of these into the §4 Additive plan (today it adds only `ScaleKind`). The school is **IB-MYP** (4 criteria 0-8 → best-fit MAX → SUM `/32` → transmute 1-7), not DepEd/WW-PT-QA; the authoritative resolution lives in [dry-run-mapping.md](../../../../../docs/plan/20260615-education-firestore-migration/dry-run-mapping.md) (full L1–L4 roll-up, tied out 15/15 subjects) + [subject-and-scoring-model.md](../../../../../docs/plan/20260615-education-firestore-migration/subject-and-scoring-model.md) §7 (the consolidated list with exact field numbers). All 7 are generic, cross-vertical-anchored, additive:
>
> 1. **`SCORING_METHOD_SUM`** — `ScoringMethod += SCORING_METHOD_SUM = 5`. Composite SUM (MYP `/32`; configurable per `scoring_scheme.composite_method`). *(subject-and-scoring-model §7 #1)*
> 2. **`AGGREGATION_METHOD_MAXIMUM`** — `AggregationMethod += AGGREGATION_METHOD_MAXIMUM = 7`. Within-criterion best-fit MAX, set on `outcome_criteria.aggregation_method`(f26) — an `AggregationMethod` value, **NOT** a `ScoringMethod` value; **supersedes** the dry-run's `SCORING_METHOD_MAXIMUM` ask (correct grain). *(§7 #2)*
> 3. **`outcome_criteria.min_text_length`** — `optional int32 min_text_length = 37`. Symmetric text-length lower bound; meaning type-switched by `criteria_type` (numeric → `min/max_score`, text → `min/max_text_length`). *(§7 #3)*
> 4. **phase-level `scoring_scheme_id`** — `optional string scoring_scheme_id` on `job_template_phase`(f20) + `job_phase`(f25), precedence **phase > template** (go-forward per-phase criteria capability; NULL → template grain; depends on the Q-SCORE-1 anchors). *(§7 #6/#7)*
> 5. **`phase_outcome_summary.reporting_checkpoint`** — `optional ReportingCheckpoint reporting_checkpoint = 24` + **new `ReportingCheckpoint` enum**. The 5 reporting views (sem1/2 × progress/final + year-final); `supersedes_id` is the wrong mechanism for the two checkpoints that share one `job_phase`. *(§7 #4/#5)*
> 6. **section capacity** — `product_variant.max_capacity` **OR** a new `product_section_capacity` entity (the README-flagged gap: `product_variant` has no `max_seats`). *(dry-run-mapping §3 / README gap)*
> 7. **`line_workspace_user`** — new junction (line ↔ `workspace_user` + scope/role) for group-level operator-servicing assignment (the department coordinator assigned ONCE per line node). It is the **line-scope tier** of the 3-tier visibility UNION — see the visibility note below. *(dry-run-mapping §3 SERVICING & VISIBILITY)*
>
> **Visibility model (additive #7's context):** `client_workspace_user` becomes **OPTIONAL** — `visible(client) = T1 ∪ T2 ∪ T3`: **T1** role-scope (`client:read:all` → whole population, zero per-client rows) ∪ **T2** line-scope (`line_workspace_user`, ONE row per coordinator, resolved through the client's enrollment → section → grade → department) ∪ **T3** per-client (`client_workspace_user`, the optional tier — CORE for outsourcing's individual/churning account managers, unused for school where T1+T2 cover the whole population). Resolved at query time as an OR, **NOT materialized** into per-client rows (avoids registrar-change fragility); the OCID single-row EXISTS F-GATE extends to a predicate/batch form that ORs the three tiers.
>
> **Entities activated this session needing ZERO additive change** (existing protos, NULL/unset preserves today's behavior): `template_task_criteria`, `subscription_seat`, `subscription_workspace_user`, `client_workspace_user`, `product` / `product_plan` / `product_price_plan`, `line` / `line_parent` / `line_plan` / `product_line`.

---

**Cross-references:** [README.md](./README.md) (outcome-reporting research; the `job_outcome_line` body) · education [grade-mapping.md](../../../../../docs/plan/20260615-education-firestore-migration/grade-mapping.md) (Q-GRADE-3/4) · existing scoring proto under `packages/esqyma/proto/v1/domain/operation/{outcome_criteria,criteria_threshold,criteria_option,template_task_criteria,enums}/` · [mantra.md](../../../../../docs/wiki/articles/mantra.md).
