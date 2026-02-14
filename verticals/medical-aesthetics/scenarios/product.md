# Medical Aesthetics Scenarios: Product (Treatment Menu)

Product scenarios cover how the clinic manages its treatment menu — adding new injectables, seasonal promotions, and launching new service categories.

---

## Adding a New Injectable to the Menu

Galderma releases a new filler, "Restylane Contour", optimized for cheek augmentation. The clinic adds it to their menu alongside existing options.

```
Product "Restylane Contour"
  ├── name: "Restylane Contour"
  ├── description: "Next-gen hyaluronic acid filler for
  │                 mid-face volume and cheek contouring.
  │                 Galderma's XpresHAn technology for
  │                 natural movement."
  ├── price: 700.00 (base per-syringe price)
  ├── currency: "USD"
  │
  ├── product_collection:
  │    └── Collection "Injectables" → "Dermal Fillers"
  │
  ├── ProductVariant "Cheeks (1 syringe)"
  │    ├── sku: "RC-CHEEK-1"
  │    ├── variant_attributes: {
  │    │    "zone": "cheeks",
  │    │    "syringes": "1",
  │    │    "typical_duration": "18 months"
  │    │  }
  │    └── price_override: 0 (use base $700)
  │
  ├── ProductVariant "Cheeks (2 syringes — full augmentation)"
  │    ├── sku: "RC-CHEEK-2"
  │    ├── variant_attributes: {
  │    │    "zone": "cheeks",
  │    │    "syringes": "2",
  │    │    "typical_duration": "18 months"
  │    │  }
  │    └── price_override: 1300.00 (2-syringe discount vs 2 × $700)
  │
  └── Resources attached:
       ├── "Restylane Contour Consent Form.pdf"
       ├── "Cheek Augmentation Before-After Gallery.pdf"
       └── "Galderma Contour Product Info.pdf"

Add to price lists:
  PriceList "2025 Beverly Hills Menu":
    └── PriceProduct: Restylane Contour @ $700/syringe

  PriceList "2025 Santa Monica Menu":
    └── PriceProduct: Restylane Contour @ $650/syringe

Create InventoryItems (stock the clinics):
  ├── InventoryItem: "Restylane Contour Syringe"
  │    ├── location_id: FK to Beverly Hills
  │    ├── item_type: "serialized" (lot-tracked)
  │    ├── quantity_on_hand: 20 syringes (initial order)
  │    └── reorder_level: 8
  └── InventoryItem: "Restylane Contour Syringe"
       ├── location_id: FK to Santa Monica
       ├── quantity_on_hand: 10 syringes
       └── reorder_level: 5
```

**Key insight**: `ProductVariant` captures the clinical decision (1 syringe vs. 2 syringes) as a variant, similar to how retail uses color/size. The `variant_attributes` hold clinical metadata (zone, expected duration) that helps practitioners and patients make informed decisions. The 2-syringe variant at $1,300 (vs. $1,400 for two singles) creates a volume incentive.

---

## Seasonal Promotion — "Summer Glow Package"

The clinic creates a limited-time promotional package combining multiple treatments for summer skin prep.

```
Step 1: Create the promotional collection
  Collection "Summer Glow 2025" (seasonal)
    ├── Product "IPL Photofacial" (existing)
    ├── Product "Microneedling" (existing)
    └── Product "Chemical Peel — Light" (existing)

Step 2: Create the promotional price list
  PriceList "Summer Glow 2025 Promo"
    ├── date_start: May 1, 2025
    ├── date_end: Aug 31, 2025
    ├── location_id: null (all locations)
    │
    ├── PriceProduct: IPL Photofacial → $275 (vs $350 standard)
    ├── PriceProduct: Microneedling → $225 (vs $300 standard)
    └── PriceProduct: Chemical Peel Light → $100 (vs $150 standard)

Step 3: Create the bundle as a plan
  Plan "Summer Glow Package"
    ├── name: "Summer Glow Package"
    ├── description: "3-treatment skin prep for summer:
    │                 IPL + Microneedling + Chemical Peel.
    │                 Save $200 vs. booking individually."
    ├── fulfillment_type: "schedule" (multi-session)
    ├── collection_plan → "Summer Glow 2025"
    └── plan_location → All clinics

  PricePlan "Summer Glow Bundle - $499"
    ├── amount: 499.00 (vs $600 promo individual = $750 standard)
    ├── duration_unit: "month"
    └── duration_value: 4 (use by Aug 31)

Step 4: Marketing and tracking
  ├── Event "Summer Glow Launch Party" created
  │    ├── event_product → all 3 treatments (demos)
  │    └── event_client → VIP patients invited
  │
  └── Revenue tracking:
       ├── revenue_category: "Promotional"
       └── Each redemption: License redeemed + InventoryTransaction
           for consumables used during the treatment
```

---

## Launching a New Treatment Category (Body Contouring)

The clinic invests in a CoolSculpting device and creates an entirely new service category — their first body treatment beyond facial aesthetics.

```
Step 1: Create collection hierarchy
  Collection "Body Contouring" (new parent category)
    └── Collection "CoolSculpting"

Step 2: Create treatment products
  Product "CoolSculpting — Abdomen"
    ├── name: "CoolSculpting Elite Abdomen"
    ├── description: "Non-invasive fat reduction using
    │                 cryolipolysis. 35-min treatment cycle."
    ├── price: 750.00 (per cycle)
    │
    ├── ProductVariant "Single Cycle"
    │    ├── sku: "CS-ABD-1"
    │    └── variant_attributes: {"cycles": "1", "area": "abdomen"}
    │
    ├── ProductVariant "Dual Cycle (both sides)"
    │    ├── sku: "CS-ABD-2"
    │    └── price_override: 1400.00 (vs 2 × $750)
    │
    └── Resources:
         ├── "CoolSculpting Consent Form.pdf"
         ├── "Treatment Guide.pdf"
         └── "Expected Results Timeline.pdf"

  Product "CoolSculpting — Love Handles"
    ├── price: 650.00
    └── (similar variant structure)

Step 3: Inventory setup (device consumables)
  InventoryItem "CoolSculpting Applicator Card"
    ├── product_id: FK to "CoolSculpting"
    ├── location_id: FK to Beverly Hills
    ├── item_type: "consumable" (single-use per treatment)
    ├── quantity_on_hand: 50 cards
    ├── unit_of_measure: "cards"
    └── reorder_level: 15

  Each treatment consumes:
    ├── 1 applicator card (tracked via InventoryTransaction)
    ├── Gel pad (bulk consumable, not individually tracked)
    └── Machine time (35 min per cycle)

Step 4: Pricing across locations
  PriceList "2025 Beverly Hills Menu":
    ├── PriceProduct: CoolSculpting Abdomen @ $750/cycle
    └── PriceProduct: CoolSculpting Love Handles @ $650/cycle

Step 5: Package option
  Plan "CoolSculpting Body Transformation"
    ├── fulfillment_type: "schedule"
    └── PricePlan: "Abdomen 4-Cycle Package - $2,600"
         (vs $750 × 4 = $3,000 à la carte)
```

**Key insight**: Body contouring introduces a device-with-consumable model where the treatment product (`Product`) is backed by single-use consumable inventory (`InventoryItem` with `item_type: "consumable"`). Each treatment depletes an applicator card, similar to how injectables deplete units — the `InventoryTransaction` consumption pattern is the same, just the unit of measure changes.
