# Events Services Scenarios: Product (Service Catalog)

Product scenarios cover building the service catalog, managing seasonal pricing, designing packages with mix-and-match support, and configuring staff-to-service assignments.

---

## Adding a New Service Category (Floral Design)

The studio has been offering photography and videography. They bring on Priya, a floral designer, and want to add "Floral Design" as a new bookable service category.

```
Step 1: Create the collection (service category)
  ┌──────────────────────────────────────────────────────┐
  │  Collection "Floral Design"                           │
  │    ├── name: "Floral Design"                           │
  │    ├── description: "Custom floral arrangements for    │
  │    │    weddings and events — bouquets, ceremony arches,│
  │    │    centerpieces, and venue installations."         │
  │    ├── parent_collection: null (top-level category)    │
  │    ├── thumbnail_url: "/images/florals-category.jpg"   │
  │    └── active: true                                    │
  └──────────────────────────────────────────────────────┘

Step 2: Create products (service offerings) under the collection
  ┌──────────────────────────────────────────────────────┐
  │  Product "Wedding Florals"                             │
  │    ├── name: "Wedding Florals"                         │
  │    ├── description: "Full floral design for your       │
  │    │    wedding — from bridal bouquet to venue install" │
  │    ├── price: 800.00 (base — bridal package starting)  │
  │    ├── currency: "USD"                                 │
  │    ├── item_type: "serialized" (Priya is a named       │
  │    │    creative — clients book her specifically)       │
  │    ├── product_collections → "Floral Design"           │
  │    └── resources:                                      │
  │         ├── "floral-portfolio-2025.pdf"                 │
  │         ├── "floral-proposal-template.docx"             │
  │         └── "flower-care-guide.pdf"                     │
  │                                                       │
  │  Product Variants (scope/scale tiers, not duration):   │
  │    ├── ProductVariant "Bridal Package"                  │
  │    │    ├── sku: "FLOR-BRIDAL"                         │
  │    │    ├── description: "Bridal bouquet + 4            │
  │    │    │    boutonnieres + 2 corsages + flower crown"  │
  │    │    ├── price_override: 800.00                      │
  │    │    └── variant_attributes: {"items": "bouquet,     │
  │    │         boutonnieres,corsages,crown"}              │
  │    │                                                   │
  │    ├── ProductVariant "Ceremony Florals"                │
  │    │    ├── sku: "FLOR-CEREMONY"                        │
  │    │    ├── description: "Ceremony arch + aisle markers │
  │    │    │    + altar arrangements"                      │
  │    │    ├── price_override: 1800.00                     │
  │    │    └── variant_attributes: {"scope": "ceremony"}   │
  │    │                                                   │
  │    └── ProductVariant "Full Venue"                      │
  │         ├── sku: "FLOR-FULLVENUE"                       │
  │         ├── description: "Ceremony + reception           │
  │         │    centerpieces + head table + welcome sign"   │
  │         ├── price_override: 3200.00                     │
  │         └── variant_attributes: {"scope": "full"}       │
  └──────────────────────────────────────────────────────┘

Step 3: Create the staff inventory record (Priya's calendar)
  ┌──────────────────────────────────────────────────────┐
  │  InventoryItem "Priya Sharma - Floral Designer"       │
  │    ├── product_id: FK to "Wedding Florals"             │
  │    ├── location_id: FK to "Portland Studio"            │
  │    ├── sku: "FLOR-001-PRIYA"                           │
  │    ├── unit_of_measure: "days"                         │
  │    ├── item_type: "serialized"                         │
  │    └── notes: "Specializes in organic, garden-style.   │
  │               Needs 2-day advance for sourcing."        │
  └──────────────────────────────────────────────────────┘

Step 4: Add pricing to seasonal menu
  PriceList "2025 Peak Season (May-Oct)":
    ├── PriceProduct: Bridal Package @ $900 (peak)
    ├── PriceProduct: Ceremony Florals @ $2,000 (peak)
    └── PriceProduct: Full Venue @ $3,500 (peak)

  PriceList "2025 Off-Peak (Nov-Apr)":
    ├── PriceProduct: Bridal Package @ $800 (standard)
    ├── PriceProduct: Ceremony Florals @ $1,800 (standard)
    └── PriceProduct: Full Venue @ $3,200 (standard)

Step 5: Add to existing packages
  Plan "Complete Wedding Package":
    └── collection_plan → add "Floral Design"
        (clients selecting this package can now include florals)
```

**Key insight**: Floral design uses `product_variant` for **scope tiers** (bridal only → ceremony → full venue) rather than duration tiers like photography. The variant pattern is flexible enough to represent either time blocks or service scope — the `variant_attributes` field clarifies which dimension is being varied.

---

## Seasonal Price Menu Rotation

The studio rotates between peak and off-peak pricing twice a year. Here's how the annual transition works.

```
Annual price calendar:
  ┌────────────────────────────────────────────────────┐
  │ Jan  Feb  Mar  Apr │ May  Jun  Jul  Aug  Sep  Oct │
  │  OFF-PEAK SEASON   │      PEAK WEDDING SEASON     │
  │  (Nov 1 - Apr 30)  │       (May 1 - Oct 31)       │
  └────────────────────────────────────────────────────┘
                                         │ Nov  Dec │
                                         │ OFF-PEAK │
                                         │ + HOLIDAY│
                                         │ SURCHARGE│
                                         └──────────┘

PriceList records (non-overlapping date ranges):
  ┌──────────────────────────────────────────────────────┐
  │  PriceList "2025 Off-Peak (Jan-Apr)"                  │
  │    ├── location_id: FK to "Portland Studio"            │
  │    ├── date_start: "2025-01-01"                        │
  │    ├── date_end: "2025-04-30"                          │
  │    └── PriceProducts:                                  │
  │         ├── Wedding Photography 8hr → $2,800           │
  │         ├── Wedding Photography 4hr → $1,600           │
  │         ├── Wedding Videography Full Day → $3,200      │
  │         ├── Portrait Session 1hr → $275                │
  │         ├── DJ Reception 4hr → $950                    │
  │         └── Full Venue Florals → $3,200                │
  └──────────────────────────────────────────────────────┘
  ┌──────────────────────────────────────────────────────┐
  │  PriceList "2025 Peak Season (May-Oct)"               │
  │    ├── location_id: FK to "Portland Studio"            │
  │    ├── date_start: "2025-05-01"                        │
  │    ├── date_end: "2025-10-31"                          │
  │    └── PriceProducts:                                  │
  │         ├── Wedding Photography 8hr → $3,500 (+25%)   │
  │         ├── Wedding Photography 4hr → $2,000           │
  │         ├── Wedding Videography Full Day → $4,000      │
  │         ├── Portrait Session 1hr → $350                │
  │         ├── DJ Reception 4hr → $1,200                  │
  │         └── Full Venue Florals → $3,500                │
  └──────────────────────────────────────────────────────┘
  ┌──────────────────────────────────────────────────────┐
  │  PriceList "2025 Off-Peak + Holiday (Nov-Dec)"        │
  │    ├── location_id: FK to "Portland Studio"            │
  │    ├── date_start: "2025-11-01"                        │
  │    ├── date_end: "2025-12-31"                          │
  │    └── PriceProducts:                                  │
  │         ├── Wedding Photography 8hr → $2,800 (off-peak)│
  │         ├── NYE Event Photography → $4,500 (surcharge) │
  │         └── Holiday Party DJ 4hr → $1,500 (surcharge)  │
  └──────────────────────────────────────────────────────┘

Rate lookup at booking:
  ├── Client books wedding for Jun 14 (peak season)
  ├── System finds PriceList where Jun 14 falls within
  │    date_start/date_end → "2025 Peak Season"
  ├── Looks up PriceProduct for "Wedding Photography 8hr"
  │    → $3,500
  └── If client has a rate-locked subscription (corporate):
       metadata.rate_lock_until overrides seasonal lookup
```

**Key insight**: Seasonal pricing uses the same `PriceList` date-range mechanism as professional services (annual rate cards) and medical aesthetics (promotional menus). The difference is that events services has **three or more distinct seasons** per year, and may overlay holiday surcharges on top of a base season. The `date_start`/`date_end` fields on PriceList naturally support this — the rate lookup finds which PriceList covers the *event date*, not the booking date.

---

## Package Bundle Design (Mix-and-Match)

The studio designs its "Complete Wedding Package" to bundle photography, videography, and florals at a discount — while also allowing clients to customize with add-ons.

```
Plan "Complete Wedding Package"
  ├── name: "Complete Wedding Package"
  ├── description: "Photo + Video + Florals — everything
  │    you need for complete wedding day coverage."
  ├── fulfillment_type: "schedule" (date-based booking)
  ├── booking_mode: "proposal" (requires consultation)
  ├── plan_location → Portland, Seattle, Bend
  └── collection_plan → Photography, Videography, Florals

PricePlan tiers (different bundles):
  ┌──────────────────────────────────────────────────────┐
  │  PricePlan "Complete Wedding - Essentials ($7,500)"   │
  │    ├── amount: 7500.00                                │
  │    ├── Includes:                                      │
  │    │    ├── 8hr lead photographer                     │
  │    │    ├── 6hr videographer (ceremony + reception)   │
  │    │    ├── Bridal floral package                     │
  │    │    ├── Online gallery (1 year hosting)           │
  │    │    └── 3-min highlight video                     │
  │    ├── Savings: $1,300 vs à la carte                  │
  │    │    ($3,500 + $3,200 + $800 + $500 + $800 = $8,800)│
  │    └── duration_unit: "event"                         │
  └──────────────────────────────────────────────────────┘
  ┌──────────────────────────────────────────────────────┐
  │  PricePlan "Complete Wedding - Premium ($10,500)"     │
  │    ├── amount: 10500.00                               │
  │    ├── Includes:                                      │
  │    │    ├── 8hr lead photographer                     │
  │    │    ├── 8hr second shooter                        │
  │    │    ├── 10hr videographer (dawn-to-dusk)          │
  │    │    ├── Full venue florals                        │
  │    │    ├── 1 engagement shoot (license credit)       │
  │    │    ├── Online gallery + USB delivery             │
  │    │    └── 8-min full wedding film + highlight       │
  │    ├── Savings: $3,200 vs à la carte                  │
  │    └── duration_unit: "event"                         │
  └──────────────────────────────────────────────────────┘

Available add-ons (à la carte pricing):
  ┌──────────────────────────────────────────────────────┐
  │  Add-on options (additional products/variants):       │
  │    ├── Second shooter (8hr) → $1,500                 │
  │    ├── Photo booth rental (4hr) → $800               │
  │    ├── Drone coverage → $500                          │
  │    ├── Album design + print → $1,200                  │
  │    ├── Extra revision round → $200                    │
  │    ├── Raw footage delivery → $300                    │
  │    └── Ceremony arch upgrade → $600                   │
  │                                                       │
  │  Implemented as:                                      │
  │    ├── Separate Products with own pricing              │
  │    ├── OR ProductVariants of the base service          │
  │    └── Add-ons become RevenueLineItems on the booking │
  └──────────────────────────────────────────────────────┘

Client selects "Complete Wedding - Premium" + adds drone coverage:
  ├── Subscription created with price_plan: "Premium"
  ├── RevenueLineItems:
  │    ├── Complete Wedding Package: $10,500 (line_item_type: "item")
  │    ├── Drone Coverage add-on: $500 (line_item_type: "item")
  │    └── Total: $11,000
  └── License records (included credits):
       ├── "Engagement Shoot" — available (redeemable before wedding)
       └── "1 Extra Revision Round" — available
```

**Key insight**: The package-first model means the client selects a `Plan` (bundle), not individual services. The plan's `collection_plan` links determine what's included, and `PricePlan` sets the bundle price (lower than sum of parts). Add-ons are separate `Product` purchases that create additional `RevenueLineItems` on the same `Subscription`. The `License` records track included credits that can be redeemed later (engagement shoot, revision rounds).

---

## Staff-to-Service Assignment

The studio has 5 creatives who can perform different services. Here's how the staff-to-service matrix is configured.

```
Staff roster and service capabilities:
  ┌──────────────────────────────────────────────────────┐
  │  Staff → Service Assignment Matrix                     │
  │                                                       │
  │  Jane Martinez (Lead Photographer)                     │
  │    ├── InventoryItem: product_id → "Wedding Photography"│
  │    ├── Also qualified for:                              │
  │    │    ├── "Portrait Photography"                      │
  │    │    ├── "Corporate Event Photography"               │
  │    │    └── "Engagement Photography"                    │
  │    ├── item_type: "serialized" (clients request by name)│
  │    └── sku: "PHOTO-001-JANE"                           │
  │                                                       │
  │  Tom Chen (Videographer)                               │
  │    ├── InventoryItem: product_id → "Wedding Videography"│
  │    ├── Also qualified for:                              │
  │    │    ├── "Corporate Event Videography"               │
  │    │    └── "Social Media Content"                      │
  │    ├── item_type: "serialized"                         │
  │    └── sku: "VIDEO-001-TOM"                            │
  │                                                       │
  │  Priya Sharma (Floral Designer)                        │
  │    ├── InventoryItem: product_id → "Wedding Florals"   │
  │    ├── Also qualified for:                              │
  │    │    └── "Corporate Event Florals"                   │
  │    ├── item_type: "serialized"                         │
  │    └── sku: "FLOR-001-PRIYA"                           │
  │                                                       │
  │  DJ Marco Silva                                        │
  │    ├── InventoryItem: product_id → "DJ Services"       │
  │    ├── item_type: "serialized"                         │
  │    └── sku: "DJ-001-MARCO"                             │
  │                                                       │
  │  Sam Park (Second Shooter / Assistant)                  │
  │    ├── InventoryItem: product_id → "Wedding Photography"│
  │    ├── Also qualified for:                              │
  │    │    └── "Portrait Photography"                      │
  │    ├── item_type: "non_serialized" (interchangeable     │
  │    │    — clients don't choose second shooter by name)  │
  │    └── sku: "PHOTO-002-SAM"                            │
  └──────────────────────────────────────────────────────┘

How assignment works for a wedding booking:
  ┌──────────────────────────────────────────────────────┐
  │  Subscription "Smith-Johnson Wedding" needs:          │
  │    ├── Lead photographer (8hr)                        │
  │    │    → Assigned: Jane (serialized, client chose)   │
  │    │    → InventoryTransaction: "reservation", 8hr    │
  │    │                                                  │
  │    ├── Second shooter (8hr)                           │
  │    │    → Assigned: Sam (non_serialized, any 2nd)     │
  │    │    → InventoryTransaction: "reservation", 8hr    │
  │    │                                                  │
  │    ├── Videographer (10hr)                            │
  │    │    → Assigned: Tom (serialized, client chose)    │
  │    │    → InventoryTransaction: "reservation", 10hr   │
  │    │                                                  │
  │    └── Floral designer (setup: 4hr, event: n/a)      │
  │         → Assigned: Priya (serialized, only florist)  │
  │         → InventoryTransaction: "setup", 4hr          │
  │         (Priya doesn't attend the event — florals are │
  │          installed morning-of and she leaves)          │
  └──────────────────────────────────────────────────────┘

  Subscription updated:
    ├── quantity: 4 (service slots)
    ├── assigned_count: 4 (Jane, Sam, Tom, Priya)
    └── available_count: 0 (fully staffed)
```

**Key insight**: The staff-to-service assignment is implemented through the `InventoryItem.product_id` relationship — each creative's inventory record links to the service they primarily offer. For staff who can perform multiple services, additional `InventoryItem` records or product links can be created. The `item_type` distinction is critical: lead creatives are `"serialized"` (clients pick them by name), while assistants are `"non_serialized"` (any available team member works).
