# Leasing Product Scenarios

In leasing, `product` = an **Asset Class** (the category of thing being leased, e.g., "Excavator"). `product_variant` = a **specific model** within that class (e.g., "Excavator XJ-9000"). `collection` = an **Asset Category** grouping related classes (e.g., "Heavy Machinery").

The product hierarchy drives the rate card (`price_product` on the lease rate card) and links to the `inventory_item` pool and `asset` accounting records.

---

## Scenario A: Asset Class Hierarchy — Heavy Machinery

```
collection
  id:    cat-heavy-machinery
  name:  "Heavy Machinery"

collection
  id:    cat-earthmoving
  name:  "Earthmoving Equipment"
  parent_collection_id: cat-heavy-machinery

product
  id:               prod-excavator-class
  name:             "Excavator"
  collection_id:    cat-earthmoving
  product_kind:     "stocked_good"     ← physical tracked asset
  tracking_mode:    "serialized"       ← per-unit tracking
  variant_mode:     "configurable"     ← variants exist (models)
  price:            NULL               ← rate set on price_plan / rate card
  unit:             "unit"

product_variant
  id:           var-xj9000-model
  product_id:   prod-excavator-class
  name:         "Excavator XJ-9000"
  sku:          "XCV-XJ9000"
  description:  "20-tonne hydraulic excavator, 130kW engine, 6.2m reach"

product_variant
  id:           var-xj7000-model
  product_id:   prod-excavator-class
  name:         "Excavator XJ-7000"
  sku:          "XCV-XJ7000"
  description:  "15-tonne compact excavator, 95kW engine, 5.8m reach"
```

---

## Scenario B: IT Hardware Class

```
collection
  id:    cat-it-hardware
  name:  "IT Hardware"

product
  id:            prod-server-class
  name:          "Rack Server"
  collection_id: cat-it-hardware
  product_kind:  "stocked_good"
  tracking_mode: "serialized"
  variant_mode:  "configurable"

product_variant
  id:   var-server-2u-standard
  name: "2U Rack Server — Standard (32-core, 256GB RAM)"
  sku:  "SRV-2U-STD"

product_variant
  id:   var-server-4u-gpu
  name: "4U GPU Server (dual A100)"
  sku:  "SRV-4U-GPU"
```

---

## Scenario C: Lease Rate Card (Price List)

The `price_list` (lease rate card) carries per-asset-class monthly rates. Location-specific rates are supported via `price_list.location_id`.

```
price_list
  id:           rl-2026-north-depot
  name:         "2026 Lease Rate Card — North Depot"
  location_id:  loc-north-depot
  date_start:   2026-01-01
  date_end:     2026-12-31

price_product
  price_list_id: rl-2026-north-depot
  product_id:    prod-excavator-class
  product_variant_id: var-xj9000-model
  amount:        125000     (centavos = $1,250/month)
  unit:          "month"

price_product
  price_list_id: rl-2026-north-depot
  product_id:    prod-excavator-class
  product_variant_id: var-xj7000-model
  amount:        95000      (centavos = $950/month)
  unit:          "month"
```

---

## Scenario D: Documentation Attachment (resource)

Operator manuals, compliance certificates, and inspection forms are modeled as `resource` records attached to the product.

```
resource
  id:         res-xj9000-operators-manual
  product_id: prod-excavator-class
  product_variant_id: var-xj9000-model
  name:       "XJ-9000 Operator's Manual v4.2"
  type:       "document"
  url:        "s3://lessor-docs/xj9000-manual-v4.2.pdf"

resource
  id:         res-xj9000-compliance-cert
  product_id: prod-excavator-class
  name:       "CE/ISO Compliance Certificate Template"
  type:       "document"

resource
  id:         res-return-inspection-form
  product_id: prod-excavator-class
  name:       "End-of-Term Inspection Form"
  type:       "form_template"
```

These resources are surfaced during deployment (share manual with lessee) and during return inspection (prefill inspection form from template).
