# Laundry Services Scenarios: Product (Service Catalog)

Product scenarios cover how the laundry business manages its service offerings — adding tiers, launching compliance-specific services, and running promotions.

---

## Adding an Express Service Tier

The plant adds a same-day express option after customer surveys revealed demand. Currently everything is standard 48-hour turnaround — express targets professionals who need suits back fast.

```
Product "Express Wash & Fold"
  ├── name: "Express Wash & Fold"
  ├── description: "Same-day turnaround. Drop off by 9 AM,
  │                 pick up by 6 PM. Priority processing queue."
  ├── price: 3.25 (per pound — base rate before location adjustment)
  ├── currency: "USD"
  │
  ├── product_collection:
  │    └── Collection "Laundry" → existing parent category
  │
  ├── ProductVariant "Express Regular"
  │    ├── sku: "EXP-WF-REG"
  │    ├── variant_attributes: {
  │    │    "turnaround": "same_day",
  │    │    "cutoff": "9am",
  │    │    "cycle": "standard"
  │    │  }
  │    └── price_override: 0 (use base $3.25/lb)
  │
  └── ProductVariant "Express Delicates"
       ├── sku: "EXP-WF-DEL"
       ├── variant_attributes: {
       │    "turnaround": "same_day",
       │    "cutoff": "9am",
       │    "cycle": "gentle"
       │  }
       └── price_override: 4.00 (premium for delicate + express)

Add to price lists:
  PriceList "2025 Residential Rates":
    ├── PriceProduct: Express Wash & Fold @ $3.25/lb
    │    (vs standard Wash & Fold @ $1.75/lb — 86% premium)
    └── PriceProduct: Express Delicates @ $4.00/lb

  PriceList "2025 Hospitality Contract Rates":
    └── PriceProduct: Express Surcharge @ 30% on top of
         contract per-piece rates (modeled as separate line item)

Operational impact:
  ├── Workflow "Express Wash-and-Fold" created (new template)
  │    └── Same stages as standard but with time targets:
  │         Stage 1 (Intake): by 10 AM
  │         Stage 2 (Sort): by 10:30 AM
  │         Stage 3 (Wash): by 12 PM
  │         Stage 4 (Dry): by 1:30 PM
  │         Stage 5 (Fold/Package): by 3 PM
  │         Stage 6 (QC): by 4 PM
  │         Stage 7 (Ready for pickup): by 5 PM
  │
  └── Dedicated machines reserved for express batches
       (not queued behind standard volume)
```

**Key insight**: Express is a separate `Product` rather than a variant of standard wash-and-fold because it has a fundamentally different workflow (with time-constrained stages) and pricing model. The `variant_attributes` capture the operational parameters (cutoff time, cycle type) that the plant floor needs to execute correctly.

---

## Healthcare-Compliant Service Launch

A nearby hospital approaches the plant about processing scrubs and patient gowns. This requires HLAC certification and new processing protocols the plant doesn't currently offer.

```
Step 1: Certification and compliance
  ├── Plant achieves HLAC accreditation
  ├── Dedicated contaminated textile receiving area installed
  ├── CDC-compliant wash protocols configured:
  │    └── Machine presets: >160°F for >25 minutes
  └── Staff trained on healthcare linen handling

Step 2: Create new service category
  Collection "Healthcare" (new parent category)
    └── Products under this category:

  Product "Scrubs Processing"
    ├── name: "Scrubs Processing (HLAC Compliant)"
    ├── description: "CDC-standard sanitization processing
    │                 for healthcare scrubs. Includes hot-water
    │                 cycle, chemical sanitization, and
    │                 microbiological validation."
    ├── price: 0.60 (per piece)
    │
    ├── ProductVariant "Standard Scrubs"
    │    ├── sku: "HC-SCRUB-STD"
    │    └── variant_attributes: {
    │         "compliance": "HLAC",
    │         "wash_temp": "160F_min",
    │         "cycle_time": "25min_min"
    │       }
    │
    └── ProductVariant "Surgical Scrubs (sterile)"
         ├── sku: "HC-SCRUB-STER"
         ├── variant_attributes: {
         │    "compliance": "HLAC_surgical",
         │    "packaging": "sterile_sealed"
         │  }
         └── price_override: 1.25 (premium for sterile packaging)

  Product "Patient Gown Processing"
    ├── price: 0.55 (per piece)
    └── ProductVariant "Standard Gown"

  Product "Lab Coat Processing"
    ├── price: 1.50 (per piece)
    └── ProductVariant "Standard Lab Coat"

Step 3: Healthcare-specific pricing
  PriceList "2025 Healthcare Rates"
    ├── location_id: FK to Main Plant (only certified location)
    ├── PriceProduct: Scrubs @ $0.60/piece
    ├── PriceProduct: Surgical Scrubs (sterile) @ $1.25/piece
    ├── PriceProduct: Patient Gown @ $0.55/piece
    └── PriceProduct: Lab Coat @ $1.50/piece

Step 4: Workflow template for healthcare
  Workflow "Healthcare Linen Processing (HLAC)"
    ├── Stage 1: Contaminated Intake
    │    ├── activity: "Receive in negative-pressure area"
    │    ├── activity: "Staff in PPE for handling"
    │    └── activity: "Weigh and log (no sorting with other textiles)"
    │
    ├── Stage 2: Sanitization Wash
    │    ├── activity: "Hot-water cycle: 160°F, 25+ minutes"
    │    └── activity: "Chemical sanitization agent dispensed"
    │
    ├── Stage 3: Quality Control (enhanced)
    │    ├── activity: "Visual inspection"
    │    └── activity: "Microbiological sampling (weekly batch)"
    │
    └── Stage 4: Packaging
         ├── activity: "Standard: fold and bag"
         └── activity: "Sterile: sealed packaging with indicator"
```

**Key insight**: Healthcare processing requires a dedicated `Collection`, separate `Workflow` template with compliance-specific activities, and `variant_attributes` that encode regulatory requirements (wash temperature, cycle time). The `plan_location` on the healthcare `Plan` restricts it to the certified plant only — satellite drop-off locations can't accept healthcare textiles.

---

## Seasonal Pricing Promotion

January is historically the slowest month for residential laundry. The plant runs a "New Year Clean Start" promotion to boost volume.

```
Step 1: Create promotional price list
  PriceList "New Year Clean Start 2025"
    ├── date_start: Jan 1, 2025
    ├── date_end: Jan 31, 2025
    ├── location_id: null (all locations)
    │
    ├── PriceProduct: Wash & Fold → $1.25/lb
    │    (vs standard $1.75/lb — 29% off)
    │
    ├── PriceProduct: Dress Shirt Dry Clean → $4.99
    │    (vs standard $6.50 — 23% off)
    │
    └── PriceProduct: Comforter/Duvet → $20.00
         (vs standard $35.00 — 43% off, clears seasonal backlog)

Step 2: Link to subscription acquisition
  Plan "New Year Clean Start Trial"
    ├── fulfillment_type: "schedule"
    ├── description: "Try weekly service for January at promo rates.
    │                 Convert to regular plan in February."
    └── collection_plan → Collection "Laundry"

  PricePlan "January Trial - $49"
    ├── amount: 49.00 (vs $99/month standard)
    ├── duration_unit: "month"
    └── duration_value: 1 (single month trial)

Step 3: Promotion tracking
  ├── revenue_category: "Promotional"
  ├── All RevenueLineItems during Jan use promo PriceList
  │    (system picks it automatically: date_start/date_end match)
  │
  └── Conversion tracking:
       ├── 47 trial subscriptions created in January
       ├── 31 converted to Standard plan in February (66%)
       └── 16 churned (did not renew)

Feb 1: Promo PriceList expires
  └── Standard PriceList "2025 Residential Rates" takes over
      (no manual switching — date range does the work)
```

**Key insight**: Seasonal promotions use the same date-bounded `PriceList` pattern as every other vertical. The trial `PricePlan` at $49 serves as an acquisition tool — it's priced to be irresistible, and the conversion to $99/month standard happens automatically when the trial subscription expires. The system tracks promo-to-standard conversion rates via `revenue_category`.
