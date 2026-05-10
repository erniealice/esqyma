# Education Scenarios: Plan (Academic Programs & Tuition Tiers)

In education, a `Plan` is an academic program — a degree track, certificate, continuing-education program, or grade-level curriculum bundle. `PlanLocation` records which campuses offer the program; `PricePlan` rows define tuition tiers (regular, scholar, online, etc.).

---

## Academic Program as Plan

```
  ┌────────────────────────────────────────────────────────────┐
  │  Plan: "Grade 10 Academic Program — SY 2026-2027"          │
  │    ├── id: "plan-g10-academic-2026"                        │
  │    ├── name: "Grade 10 Academic Program"                   │
  │    ├── fulfillment_type: "schedule"  (session-based)       │
  │    └── workspace_id: FK → school workspace                 │
  └────────────────────────────────────────────────────────────┘
        │
        ├── PlanLocation: "Main Campus — Makati"
        │     ├── plan_id: "plan-g10-academic-2026"
        │     └── location_id: "loc-main-makati"
        │
        ├── PlanLocation: "North Campus — QC"
        │     └── location_id: "loc-north-qc"
        │
        └── PricePlan rows (tuition tiers):
              ├── PricePlan: "Regular Tuition"
              │     ├── price_plan_id: "pp-g10-regular"
              │     ├── plan_id: "plan-g10-academic-2026"
              │     ├── amount: 6000000  (centavos = PHP 60,000/term)
              │     ├── billing_cycle_unit: "month"
              │     └── billing_cycle_value: 4  (quarterly per term)
              │
              ├── PricePlan: "Scholarship — 50% Discount"
              │     ├── price_plan_id: "pp-g10-scholar-50"
              │     ├── amount: 3000000  (centavos = PHP 30,000/term)
              │     └── billing_cycle_unit: "month"
              │
              └── PricePlan: "Online / Blended Learning"
                    ├── price_plan_id: "pp-g10-online"
                    └── amount: 4500000  (centavos = PHP 45,000/term)
```

**Entities involved**: `Plan`, `PlanLocation`, `PricePlan`

---

## Bachelor of Science — Computer Science (Degree Program)

Multi-year degree program. Each academic year maps to a `PricePlan` revision (tuition may change year over year); `PlanSettings` carries program-specific rules.

```
  Plan: "BS Computer Science"
    ├── id: "plan-bscs"
    ├── name: "BS Computer Science — 4-Year Program"
    └── PlanSettings:
          ├── plan_id: "plan-bscs"
          ├── setting_key: "total_credit_units"   value: "148"
          ├── setting_key: "academic_calendar"    value: "semestral"
          └── setting_key: "minimum_residency_years" value: "4"

  PlanLocation: "Main Campus only"
    └── location_id: "loc-main-makati"

  PricePlan tiers (Year 1 — AY 2026-2027):
    ├── PricePlan: "BSCS Regular — Year 1"
    │     ├── amount: 4500000  (PHP 45,000/semester)
    │     ├── billing_cycle_unit: "month"
    │     └── billing_cycle_value: 6
    ├── PricePlan: "BSCS CHED Scholar"
    │     └── amount: 0  (full scholarship — zero tuition)
    └── PricePlan: "BSCS Installment Plan"
          ├── amount: 1500000  (PHP 15,000/month × 3 months/semester)
          └── billing_cycle_unit: "month"

  ProductPlan mapping (courses in the program):
    ├── ProductPlan: plan_id="plan-bscs" + product_id="prod-cs-fundamentals"
    ├── ProductPlan: plan_id="plan-bscs" + product_id="prod-mathematics"
    ├── ProductPlan: plan_id="plan-bscs" + product_id="prod-data-structures"
    └── ... (all required courses in the program)
```

---

## Continuing Education Certificate

Short-form program; no degree, no multi-year commitment. Single `PricePlan`, single `PlanLocation`.

```
  Plan: "Digital Marketing Certificate"
    ├── id: "plan-digimkt-cert"
    ├── name: "Digital Marketing Certificate — 3-Month Intensive"
    └── fulfillment_type: "schedule"

  PricePlan: "Certificate Regular"
    ├── amount: 1800000  (PHP 18,000 total)
    └── billing_cycle_unit: "month"  (3 installments of PHP 6,000)

  PlanSettings:
    ├── setting_key: "program_length_months" value: "3"
    └── setting_key: "sessions_per_week"     value: "2"
```

---

## Plan → Subscription linkage

When a student enrolls, a `Subscription` is created referencing the `PricePlan`. The `Subscription` is the enrollment record; the `Plan` is the product being subscribed to.

```
  Subscription (student enrollment):
    ├── client_id: "clt-alicia-mendoza"       (student)
    ├── price_plan_id: "pp-g10-regular"        (which tuition tier)
    ├── date_start: "2026-06-01"               (term start)
    └── date_end: "2026-10-31"                 (term end)
```

The `Plan → PricePlan` pair defines the product being sold. The `Subscription` is the student's individual enrollment under that plan/tier. See subscription.md for the full enrollment lifecycle.

---

## What's NOT Modeled as a Plan

- **Individual course sections**: These are `JobTemplate` instances (see operations.md), not Plans. A Plan is the program; a JobTemplate is the course curriculum.
- **Extracurricular activities** (sports, clubs): If billing is not associated, no Plan is needed. If a fee is charged (activity fund), a thin Plan + PricePlan is sufficient.
- **Grade levels as plans**: Each academic year's program gets its own Plan (Grade 10 SY 2026-2027, Grade 10 SY 2027-2028) because tuition rates change annually. Do not reuse the same Plan across school years.
