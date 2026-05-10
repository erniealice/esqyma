# Education Scenarios: Product (Course & Subject Catalog)

In education, the `Product` is the subject offering; `ProductVariant` is the specific course-level (e.g., "Algebra II"); and the actual section instance (Section B, Period 3) is represented by variant-option combinations. This mirrors the retail product catalog pattern exactly — no education-specific entities required.

---

## Subject → Course → Section Hierarchy

```
  Product: "Mathematics"
    ├── product_kind: "service"
    ├── delivery_mode: "scheduled"
    ├── tracking_mode: "none"
    └── product_id: "prod-mathematics"
          │
          ├── ProductVariant: "Algebra II"
          │     ├── product_variant_id: "var-algebra-2"
          │     ├── sku: "MATH-ALG2"
          │     └── product_option_values:
          │           ├── grade_level: "Grade 10"
          │           └── credit_units: "3"
          │
          ├── ProductVariant: "Pre-Calculus"
          │     ├── product_variant_id: "var-precalc"
          │     └── sku: "MATH-PRECALC"
          │
          └── ProductVariant: "Statistics & Probability"
                └── product_variant_id: "var-stats"

  Product: "Science"
    ├── ProductVariant: "Biology (Grade 9)"
    ├── ProductVariant: "Chemistry (Grade 10)"
    └── ProductVariant: "Physics (Grade 11)"
```

**Field mappings:**

| Education concept          | Product field                    |
|----------------------------|----------------------------------|
| Subject area               | `Product.name`                   |
| Course name                | `ProductVariant.name`            |
| Grade level                | `ProductOption` "Grade Level"    |
| Credit units               | `ProductOption` "Credit Units"   |
| Course code (SKU)          | `ProductVariant.sku`             |
| Delivery (classroom)       | `Product.delivery_mode = "scheduled"` |

---

## Section Instance — ProductVariant Options

The same `ProductVariant "Algebra II"` can have multiple section instances distinguished by option values. Each section maps to one `JobTemplate` (see operations.md).

```
  ProductVariant: "Algebra II"
    └── product_variant_id: "var-algebra-2"
          │
          ├── ProductVariantOption set for "Section A — Period 1"
          │     ├── option: "section"     value: "A"
          │     ├── option: "period"      value: "1"
          │     └── option: "teacher"     value: "staff-ms-reyes"
          │
          ├── ProductVariantOption set for "Section B — Period 3"
          │     ├── option: "section"     value: "B"
          │     ├── option: "period"      value: "3"
          │     └── option: "teacher"     value: "staff-mr-santos"
          │
          └── ProductVariantOption set for "Section C — Period 5"
                ├── option: "section"     value: "C"
                └── option: "period"      value: "5"

Each section instance is referenced as:
  ProductPricePlan.product_variant_id → "var-algebra-2"
  + ProductVariantOption values to distinguish sections

A student's enrollment Subscription points to one specific section:
  Subscription.product_variant_id → "var-algebra-2" (Section B)
```

---

## Course Bundles — Program as ProductCollection

A degree program (e.g., "Grade 10 Core Curriculum") is modeled as a `Collection` of `ProductVariant` rows — the full set of required courses.

```
  Collection: "Grade 10 Core Curriculum — SY 2026-2027"
    ├── collection_id: "col-g10-core-2026"
    └── CollectionPlan: FK → Plan "BS Grade 10 Program"
          │
          ├── Product: "Mathematics"    → Variant: "Algebra II"
          ├── Product: "Science"        → Variant: "Chemistry"
          ├── Product: "English"        → Variant: "English 10"
          ├── Product: "Filipino"       → Variant: "Filipino 10"
          └── Product: "PE & Health"    → Variant: "PE 10"
```

**Key insight**: The `Collection` is the curriculum bundle. When a student enrolls in the Grade 10 program, their enrollment `Subscription` references the `Plan` tied to this `Collection`. Individual course subscriptions can be derived from the collection items.

---

## Pricing — Tuition per Course vs. Program Bundle

```
Two pricing models:

Model A: Per-subject tuition
  PriceProduct: "Algebra II"
    ├── product_id: "prod-mathematics"
    ├── product_variant_id: "var-algebra-2"
    └── price: 1500000  (centavos = PHP 15,000 per term)

Model B: Program bundle (flat tuition)
  PricePlan: "Grade 10 Flat Tuition — SY 2026"
    ├── amount: 6000000  (centavos = PHP 60,000 per term)
    └── covers: all required courses in Collection "Grade 10 Core"
```

---

## What's NOT Modeled This Way

- **Elective course capacity limits**: Seat limits per section are not natively on `ProductVariant`. A workaround is `Subscription.quantity` on the section's subscription, but capacity management is deferred to a future domain extension.
- **Course prerequisites**: DAG-based prerequisite chains are not in the product catalog. They would live in `JobTemplatePhase.predecessor_phase_id` logic or a future `plan_prerequisite` table.
- **Grading scales** (A/B/C/D/F vs 1.0–5.0): These are `OutcomeCriteria` + `CriteriaThreshold` records linked to the `JobTemplate`, not product catalog fields.
