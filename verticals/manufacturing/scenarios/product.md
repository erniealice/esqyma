# Manufacturing Scenarios: Product (Material Master)

The `product` table is the material master in manufacturing. Every material — raw, component, sub-assembly, finished good, by-product, packaging, MRO — is one `product` row. The product's relationship to manufacturing is established by four fields working together: `product_kind`, `tracking_mode`, `variant_mode`, and `default_template_id`.

---

## Scenario 1: A finished good with a default BOM-and-Routing

```
product "Drill Motor DM-2200"
  ├── id: "prod-dm-2200"
  ├── product_kind: PRODUCT_KIND_STOCKED_GOOD
  ├── tracking_mode: TRACKING_MODE_SERIALIZED
  ├── variant_mode: VARIANT_MODE_CONFIGURABLE
  ├── unit: "unit"
  ├── expected_cost: 850000           (₱8,500 standard cost in centavos)
  ├── expected_cost_currency: "PHP"
  ├── default_template_id: FK → "BOM-DM2200-rev5"   ← the BOM-and-Routing
  └── price: 1200000                  (₱12,000 default list price)

ProductVariant rows:
  ├── DM-2200-CORDED-220V       (220V single-phase, corded)
  ├── DM-2200-CORDED-110V       (110V — US market)
  └── DM-2200-CORDLESS-18V      (battery-powered)

Each variant can carry a variant-specific BOM-and-Routing via a separate
JobTemplate row whose output_product_variant_id is set:
  ├── BOM-DM2200-220V-rev5 → output_product_variant_id = DM-2200-CORDED-220V
  └── BOM-DM2200-CORDLESS-rev3 → output_product_variant_id = DM-2200-CORDLESS-18V

When MRP creates a Job for a specific variant, it walks:
  1. Job.output_product_variant_id is set
  2. Look up the JobTemplate whose output_product_variant_id matches
  3. If none found, fall back to Product.default_template_id

This means a configurable FG can have either a single BOM that
parametrises across variants, OR distinct BOMs per variant — both are valid.
```

---

## Scenario 2: Raw material with no template (cannot be made here)

```
product "Steel Sheet 0.8mm Grade A"
  ├── product_kind: PRODUCT_KIND_STOCKED_GOOD
  ├── tracking_mode: TRACKING_MODE_BULK
  ├── variant_mode: VARIANT_MODE_NONE
  ├── unit: "kg"
  ├── expected_cost: 12000            (₱120/kg)
  └── default_template_id: NULL       ← no BOM; sourced from suppliers
```

The supplier side is modelled via `supplier_product_plan` + `supplier_subscription` (recurring supply) or one-shot `procurement_request` rows (ad-hoc).

---

## Scenario 3: Consumable

```
product "Cutting Oil Type-G"
  ├── product_kind: PRODUCT_KIND_CONSUMABLE
  ├── tracking_mode: TRACKING_MODE_BULK
  ├── unit: "litre"
  ├── expected_cost: 8500             (₱85/litre)
  └── default_template_id: NULL
```

`PRODUCT_KIND_CONSUMABLE` keeps the product off the "Stocked Goods" sidebar mount in service-admin (per `product-taxonomy` wiki) but lets it still be issued against Jobs via `ActivityMaterial`.

---

## Scenario 4: By-product (no template, recovered value)

```
product "Steel Sheet Drop Cuts"
  ├── product_kind: PRODUCT_KIND_STOCKED_GOOD
  ├── tracking_mode: TRACKING_MODE_BULK
  ├── unit: "kg"
  ├── expected_cost: 1500             (₱15/kg recovered scrap value)
  └── default_template_id: NULL       ← emerges from job_output, not made directly
```

When a parent Job's `JobOutput` of `output_kind=INVENTORY_RECEIPT` targets this product, an `inventory_movement` of `COMPLETION` is written from the parent's line to the by-product warehouse. The Job's `JobSettlement` then allocates a portion of the parent's WIP balance to this by-product based on `allocation_pct` (operator-set, defaulting to 0% if drops are valued at zero).

---

## Scenario 5: A sub-assembly that is itself a `Product`

```
product "Motor Stator Sub-Assembly SC-104"
  ├── product_kind: PRODUCT_KIND_STOCKED_GOOD
  ├── tracking_mode: TRACKING_MODE_SERIALIZED
  ├── unit: "piece"
  ├── expected_cost: 120000           (₱1,200/piece standard cost)
  └── default_template_id: FK → "BOM-STATOR-MR3"   ← itself made via its own BOM
```

Multi-level BOMs are emergent — they fall out of the fact that a sub-assembly is just another `Product` with its own `default_template_id`. The MRP run is responsible for walking the dependency graph (parent Job's `JobTemplateInput` of kind MATERIAL → child product → child's `default_template_id` → child Job).

---

## Scenario 6: Customer-specific custom configuration

A custom DM-2200 variant for a single OEM customer with a unique badge plate.

```
product "Drill Motor DM-2200"  (existing, generic)
  └── ProductVariant "DM-2200-CHEVY-OEM"
        ├── name: "DM-2200 — Chevy OEM badged"
        ├── attributes: [{key: "badge", value: "Chevy Tools"}]
        └── (custom BOM rev with the Chevy badge in the JobTemplateInput list)
```

Customer-specific pricing lives on `product_price_plan` × `product_plan` × `price_plan` × `price_schedule` chain (existing centymo). Per-customer override is one new `product_price_plan` row tagged to the Chevy supply-agreement's `price_plan`.

---

## Surface area in centymo today

The existing centymo `views/product/` is module-only — there are no rich list/detail views in this monorepo's current state (per the audit). Manufacturing brings real demand for a richer Product surface:

| Manufacturing need | Centymo gap |
|---|---|
| Show `expected_cost` (standard cost) prominently on Product detail | Wave 1 added the field; views must surface it |
| Surface `default_template_id` as a clickable link to JobTemplate (BOM) | Missing — needs a "BOM" link in Product detail |
| Variant grid with variant-specific BOM links | Missing — Product variant detail needs `default_template_id` linking |
| Inventory positions across locations (raw / WIP / FG breakdown) | Inventory dashboard already does this; needs to be linked from Product detail |
| Where-used / which-BOMs-consume-this-product | New view; query: `select * from job_template_input where product_id = X` |
| Cost roll-up from BOM (sum of child products' expected_cost × quantity) | New view; reads `job_template_input` rows |
| Lot history per product (W2) | New view once `lot` entity lands |

These are all SMALL-to-MEDIUM efforts and are part of the manufacturing plan deliverable on the centymo side.

---

## Decision: keep variants flexible, not template-specific

We considered binding `product_variant` rows to specific `JobTemplate` rows by making `JobTemplate.output_product_id` required when variant_mode=configurable. Decision: **do not require it**. A configurable Product can have one BOM that parametrises across variants (the BOM's `JobTemplateInput` rows carry a `product_variant_id` per line to pick the variant-appropriate component) OR can have N distinct BOMs (one per variant). The Job resolves which BOM applies at create time by walking the variant → BOM map.

Reason: both shapes appear in practice. A simple variant (colour only) wants the parametrised single-BOM. A complex variant (cordless vs corded — different motor architecture) wants a distinct BOM per variant.
