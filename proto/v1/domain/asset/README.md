# Asset Domain

The asset domain models an organization's **long-lived assets** — things the business owns and uses over multiple accounting periods rather than selling or consuming immediately. It answers:

1. **What do we own?** (Asset, AssetCategory)
2. **What type of asset is it?** (AssetType — PP&E, intangible, right-of-use, investment property)
3. **Where is it available?** (AssetLocation — location access/assignment)
4. **How much is it worth now?** (DepreciationSchedule, AssetRevaluation)
5. **What happened to it?** (AssetTransaction — full audit trail)
6. **Is it well maintained?** (AssetMaintenance)
7. **When and how was it disposed?** (AssetDisposal)
8. **What are its parts?** (AssetComponent — component depreciation)

This domain is designed to cover **all non-current asset types** that appear on the Statement of Financial Position (Balance Sheet), not just fixed assets. The `AssetType` enum distinguishes between PP&E (IAS 16), intangible assets (IAS 38), right-of-use assets (IFRS 16), and investment property (IAS 40), while sharing common lifecycle patterns.

---

## Governing Accounting Standards

Each asset type is governed by a specific IFRS/IAS standard. The domain model is designed to satisfy the recognition, measurement, and disclosure requirements of all of them:

| Standard | Full Name | Governs | Key Requirements |
|----------|-----------|---------|-----------------|
| [**IAS 16**](https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/) | Property, Plant and Equipment | Tangible fixed assets | Recognition, measurement (cost/revaluation), depreciation, disposal |
| [**IAS 38**](https://www.ifrs.org/issued-standards/list-of-standards/ias-38-intangible-assets/) | Intangible Assets | Software, patents, trademarks | Same lifecycle as PP&E but called "amortization" instead of "depreciation" |
| [**IAS 36**](https://www.ifrs.org/issued-standards/list-of-standards/ias-36-impairment-of-assets/) | Impairment of Assets | All non-current assets | Testing for and recognizing impairment losses |
| [**IAS 40**](https://www.ifrs.org/issued-standards/list-of-standards/ias-40-investment-property/) | Investment Property | Land/buildings held for rental | Fair value model or cost model |
| [**IFRS 16**](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-16-leases/) | Leases | Right-of-use assets | Recognize lease as asset + liability, depreciate over lease term |
| [**IFRS 5**](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-5-non-current-assets-held-for-sale-and-discontinued-operations/) | Non-current Assets Held for Sale | Assets awaiting disposal | Stop depreciation, measure at lower of carrying amount and fair value less costs to sell |

**Further reading:**
- [Deloitte IAS Plus — IAS 16 Summary](https://www.iasplus.com/en/standards/ias/ias16)
- [Deloitte IAS Plus — IAS 38 Summary](https://www.iasplus.com/en/standards/ias/ias38)
- [Deloitte IAS Plus — IAS 36 Summary](https://www.iasplus.com/en/standards/ias/ias36)
- [CPDbox — Full Guide on IAS 16](https://www.cpdbox.com/ias-16-property-plant-and-equipment/)
- [CPDbox — IAS 36 Impairment Explained](https://www.cpdbox.com/ias-36-impairment-assets/)
- [IFRS Community — Revaluation Model for PPE](https://ifrscommunity.com/knowledge-base/revaluation-model-property-plant-equipment-and-intangible-assets/)

---

## Entity Relationship

```
                         AssetCategory ◄──── AssetCategory
                        (grouping with       (parent_category_id
                         GL accounts)         for hierarchy)
                              │
                              │
                           Asset ─────────── AssetAttribute
                      (master record:        (extensible metadata:
                       "Salon Chair #3")      warranty_provider,
                              │               insurance_policy_no)
                              │
          ┌───────────┬───────┼────────┬──────────────┬──────────────┐
          │           │       │        │              │              │
   AssetComponent  DeprSch  AssetTxn  AssetDisposal  AssetMaint   AssetLocation
   (IAS 16.43:    (period-  (audit    (sale/scrap    (preventive/  (many-to-many:
    parts with     by-       trail     with gain/     corrective    which locations
    different      period    for ALL   loss calc)     upkeep)       can access/
    useful lives)  depr)    events)        │                        use this asset)
          │           │       │            │                            │
          │           │       │            │                            │
          └───────────┴───────┼────────────┘                     entity.Location
                              │
                       AssetRevaluation
                       (IAS 16.31-42:
                        fair value
                        adjustments)

Cross-domain references:
  Asset.location_id          ──► entity.Location  (primary/physical location)
  AssetLocation.location_id  ──► entity.Location  (access/availability locations)
  Asset.custodian_id         ──► entity.User
  Asset.vendor_id            ──► entity.Client
  Asset.product_id           ──► product.Product (optional)
  *.journal_entry_id         ──► ledger.Journal (future)
  AssetMaintenance.vendor_id ──► entity.Client
```

---

## Asset Types on the Statement of Financial Position

The `AssetType` enum determines how an asset appears on the Balance Sheet and which accounting standard governs it:

```
STATEMENT OF FINANCIAL POSITION (Balance Sheet)
═══════════════════════════════════════════════

NON-CURRENT ASSETS
├── Property, Plant & Equipment (IAS 16)     ← asset_type = PROPERTY_PLANT_EQUIPMENT
│   ├── Salon Equipment           ₱ 450,000
│   ├── Vehicles                  ₱ 800,000
│   ├── Furniture & Fixtures      ₱ 150,000
│   ├── Computer Equipment        ₱  85,000
│   └── Leasehold Improvements    ₱ 320,000
│                                 ─────────
│   Total PP&E                    ₱1,805,000
│
├── Intangible Assets (IAS 38)               ← asset_type = INTANGIBLE
│   ├── POS Software License      ₱  50,000
│   └── Trademark Registration    ₱  25,000
│                                 ─────────
│   Total Intangibles             ₱  75,000
│
├── Right-of-Use Assets (IFRS 16)            ← asset_type = RIGHT_OF_USE
│   └── Salon Premises Lease      ₱ 960,000
│                                 ─────────
│   Total ROU Assets              ₱ 960,000
│
└── Investment Property (IAS 40)             ← asset_type = INVESTMENT_PROPERTY
    └── Rental Unit               ₱2,500,000
                                  ─────────
    Total Investment Property     ₱2,500,000
```

**Why a single domain for all asset types?**

All four asset types share the same lifecycle pattern: acquisition → measurement → depreciation/amortization → impairment testing → disposal. The same `DepreciationSchedule` entity calculates straight-line depreciation for a salon chair (IAS 16) and straight-line amortization for a software license (IAS 38) — the math is identical, only the terminology differs. Separating them into different domains would duplicate 90% of the code, services, and UI.

The `AssetType` enum + `AssetCategory` hierarchy together provide full classification. Filtering `WHERE asset_type = PROPERTY_PLANT_EQUIPMENT` instantly gives you the IAS 16 disclosure schedule. Filtering `WHERE asset_type = INTANGIBLE` gives you IAS 38.

---

## The Master Record: Asset

`asset.proto` is the **central entity** — the definitive record of something the business owns and uses.

### Core Identity

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Primary key (UUID) |
| `asset_number` | string | Human-readable unique ID (e.g., "FA-1005", "IA-002") |
| `name` | string | Descriptive name ("Hydraulic Salon Chair — Station 3") |
| `description` | optional string | Detailed description |
| `asset_type` | AssetType | PP&E, Intangible, Right-of-Use, or Investment Property |
| `asset_category_id` | string (FK) | Category for GL mapping and defaults |
| `asset_category` | optional AssetCategory | Nested category |

### Physical Identification

| Field | Type | Purpose |
|-------|------|---------|
| `serial_number` | optional string | Manufacturer serial number |
| `tag_number` | optional string | Physical inventory tag / barcode |
| `manufacturer` | optional string | Manufacturer name |
| `model` | optional string | Model name/number |

### Location and Custody

| Field | Type | Purpose |
|-------|------|---------|
| `location_id` | optional string (FK) | Physical location → entity.Location |
| `location` | optional entity.Location | Nested location |
| `custodian_id` | optional string (FK) | Responsible person → entity.User |
| `vendor_id` | optional string (FK) | Supplier → entity.Client |

### Acquisition

| Field | Type | Purpose |
|-------|------|---------|
| `purchase_order_number` | optional string | PO reference |
| `invoice_number` | optional string | Purchase invoice reference |
| `acquisition_date` | optional int64 | Purchase date (Unix epoch) |
| `acquisition_date_string` | optional string | ISO date string |
| `date_placed_in_service` | optional int64 | When available for use (IAS 16.55) |
| `date_placed_in_service_string` | optional string | ISO date string |

**IAS 16.55:** Depreciation begins when the asset is **available for use** — i.e., when it is in the location and condition necessary for it to operate as intended. This is NOT the date it was first actually used.

### Cost and Value

| Field | Type | Purpose |
|-------|------|---------|
| `acquisition_cost` | double | Original capitalized cost (IAS 16.15-22) |
| `currency` | string | Currency code |
| `salvage_value` | double | Estimated residual value at end of useful life (IAS 16.6) |
| `book_value` | double | Current net book value (cost - accumulated depreciation) |
| `fair_value` | optional double | Current market value (revaluation model only) |

**IAS 16.16 — What goes into acquisition cost:**
- Purchase price (net of trade discounts and rebates)
- Import duties and non-refundable purchase taxes
- Directly attributable costs to bring the asset to working condition:
  - Site preparation
  - Delivery and handling
  - Installation and assembly
  - Professional fees (architects, engineers)
  - Testing costs (less net proceeds from selling test output)
  - Estimated decommissioning/restoration costs (IAS 37)

**IAS 16.19 — What does NOT go into cost:**
- General and administrative overheads
- Staff training costs
- Operating losses before reaching planned performance
- Abnormal waste during construction

**IAS 16.6 — Residual (salvage) value:**
The estimated amount the entity would currently obtain from disposing of the asset, after deducting estimated costs of disposal, if the asset were already of the age and in the condition expected at the end of its useful life. Must be reviewed at least annually (IAS 16.51).

### Depreciation Configuration

| Field | Type | Purpose |
|-------|------|---------|
| `useful_life_months` | int32 | Total useful life in months |
| `useful_life_units` | optional int64 | Total expected output units (for UOP method) |
| `depreciation_method` | DepreciationMethod | How to calculate periodic depreciation |
| `depreciation_rate` | optional double | Rate % for declining balance methods |
| `depreciation_start_date` | optional int64 | When depreciation began |
| `depreciation_start_date_string` | optional string | ISO date string |
| `accumulated_depreciation` | double | Running total of all depreciation taken to date |

### Measurement Model

| Field | Type | Purpose |
|-------|------|---------|
| `measurement_model` | MeasurementModel | COST_MODEL or REVALUATION_MODEL |

**IAS 16.29-31 — Two models for subsequent measurement:**

| | Cost Model (IAS 16.30) | Revaluation Model (IAS 16.31) |
|---|---|---|
| **Standard** | IAS 16 + US GAAP | IAS 16 (IFRS only, not US GAAP) |
| **Carrying amount** | Cost − Accumulated Depreciation − Impairment Losses | Fair Value at revaluation date − Subsequent Depreciation − Subsequent Impairment |
| **Revaluation frequency** | N/A | With sufficient regularity — annually for volatile values, every 3-5 years for stable values |
| **Scope** | Per individual asset | Must apply to **entire class** of PP&E (IAS 16.36) |
| **Increase** | N/A | Recognized in OCI (revaluation surplus) unless reversing prior P&L decrease |
| **Decrease** | N/A | Recognized in P&L unless reducing prior OCI surplus |
| **Complexity** | Simpler — recommended as default | More complex — requires regular appraisals |

### Status and Lifecycle

| Field | Type | Purpose |
|-------|------|---------|
| `status` | AssetStatus | Current lifecycle state |
| `warranty_expiry_date` | optional int64 | Warranty end date |
| `warranty_expiry_date_string` | optional string | ISO date string |
| `notes` | optional string | Free-form notes |
| Standard audit fields | | `date_created`, `date_modified`, `active` |

---

## Grouping and GL Mapping: AssetCategory

`asset_category.proto` groups assets that share depreciation defaults and General Ledger account mappings. Every lifecycle event (acquisition, depreciation, disposal) generates journal entries using the GL accounts configured on the category.

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Primary key |
| `code` | string | Short code ("EQUIP", "VEH", "SOFT") |
| `name` | string | Display name ("Salon Equipment") |
| `description` | optional string | Description |
| `parent_category_id` | optional string (FK) | For hierarchy (self-referencing) |
| `default_depreciation_method` | DepreciationMethod | Default for new assets in this category |
| `default_useful_life_months` | int32 | Default useful life |
| `default_salvage_value_percent` | double | Default salvage as % of cost |

### GL Account Mappings

| Field | Type | GL Account Purpose | Normal Balance |
|-------|------|--------------------|---------------|
| `asset_cost_account` | optional string | Records original cost of asset | Debit (Asset) |
| `accumulated_depreciation_account` | optional string | Running total of depreciation taken | Credit (Contra Asset) |
| `depreciation_expense_account` | optional string | Period depreciation charge | Debit (Expense) |
| `gain_on_disposal_account` | optional string | Profit from selling above book value | Credit (Income) |
| `loss_on_disposal_account` | optional string | Loss from selling below book value | Debit (Expense) |
| `impairment_loss_account` | optional string | IAS 36 write-down | Debit (Expense) |
| `revaluation_surplus_account` | optional string | IAS 16.39 upward revaluation reserve | Credit (Equity/OCI) |

**Why GL accounts live on the category, not the individual asset:**

IAS 16.37 requires that revaluation be applied to an **entire class** of PP&E. Categories represent these classes. When you run monthly depreciation, the system iterates all active assets in a category and posts a single aggregated journal entry per category per period. This reduces GL transaction volume from thousands (per-asset) to dozens (per-category).

### Typical Categories for a Service Business (Salon/Spa)

```
PP&E Categories:
├── Salon Equipment          5-year life, SL    (chairs, wash stations, dryers, steamers)
├── Furniture & Fixtures     7-year life, SL    (reception desk, waiting area, shelving)
├── Computer Equipment       3-year life, DDB   (POS terminals, tablets, printers)
├── Vehicles                 5-year life, DB    (delivery van, mobile service vehicle)
├── Leasehold Improvements  10-year life, SL    (build-out, plumbing, electrical, signage)
└── Office Equipment         5-year life, SL    (phones, A/C units, security cameras)

Intangible Categories:
├── Software Licenses        3-year life, SL    (POS software, booking system)
└── Trademarks               indefinite life    (brand registration — no amortization, impairment only)

Right-of-Use Categories:
└── Leased Premises          lease-term, SL     (salon space lease)
```

---

## Period-by-Period Tracking: DepreciationSchedule

`depreciation.proto` records the depreciation (or amortization) calculated for each accounting period. This is the core of the asset value engine.

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Primary key |
| `asset_id` | string (FK) | Which asset |
| `period_number` | int32 | Sequential period number (1, 2, 3...) |
| `fiscal_year` | int32 | Fiscal year |
| `fiscal_period` | int32 | Month number within fiscal year (1-12) |
| `period_start_date` | int64 | Start of depreciation period |
| `period_start_date_string` | string | ISO date |
| `period_end_date` | int64 | End of depreciation period |
| `period_end_date_string` | string | ISO date |
| `opening_book_value` | double | Book value at start of period |
| `depreciation_amount` | double | Expense calculated for this period |
| `accumulated_depreciation` | double | Running total through this period |
| `closing_book_value` | double | Book value at end of period |
| `units_produced` | optional int64 | Units produced this period (UOP method only) |
| `is_posted` | bool | Whether journal entry has been posted to GL |
| `journal_entry_id` | optional string (FK) | Reference to ledger.Journal (future) |
| Standard audit fields | | |

### Depreciation Methods and Formulas

All methods use these variables:
- **C** = Acquisition Cost
- **S** = Salvage Value (residual value)
- **D** = Depreciable Base = C − S
- **N** = Useful Life (in years)
- **BV** = Book Value at beginning of period

#### Straight-Line (IAS 16.62a) — Most Common

Distributes cost evenly across useful life. Appropriate when economic benefits are consumed uniformly.

```
Annual Depreciation  = (C − S) / N
Monthly Depreciation = (C − S) / (N × 12)
```

**Example:** Hydraulic salon chair costs ₱50,000, salvage ₱5,000, life 5 years.
- Annual = (50,000 − 5,000) / 5 = **₱9,000/year**
- Monthly = ₱750/month

**Reference:** [CFI — Straight Line Depreciation](https://corporatefinanceinstitute.com/resources/accounting/straight-line-depreciation/)

#### Declining Balance (IAS 16.62b)

Accelerated method — higher charges in early years, declining over time. Appropriate when the asset is more productive when new.

```
Rate = 1 / N  (or a management-specified rate)
Annual Depreciation = BV_beginning × Rate
```

Stops when BV reaches salvage value.

**Example:** Vehicle costs ₱800,000, salvage ₱200,000, life 5 years, rate 20%.
- Year 1: 800,000 × 20% = ₱160,000 (BV = ₱640,000)
- Year 2: 640,000 × 20% = ₱128,000 (BV = ₱512,000)
- Year 3: 512,000 × 20% = ₱102,400 (BV = ₱409,600)
- ...continues until BV = ₱200,000

#### Double Declining Balance

Twice the straight-line rate. More aggressive acceleration.

```
Rate = 2 / N
Annual Depreciation = BV_beginning × Rate
```

Does NOT subtract salvage from the cost base. Depreciation stops when book value reaches salvage value. Many implementations switch to straight-line in the year when SL would yield a higher charge.

**Example:** Computer equipment ₱85,000, salvage ₱5,000, life 3 years.
- DDB rate = 2/3 = 66.67%
- Year 1: 85,000 × 66.67% = ₱56,670 (BV = ₱28,330)
- Year 2: 28,330 × 66.67% = ₱18,887 (BV = ₱9,443)
- Year 3: 9,443 − 5,000 = ₱4,443 (BV = ₱5,000 = salvage)

**Reference:** [Bench — Double Declining Balance Guide](https://www.bench.co/blog/tax-tips/double-declining-balance)

#### Sum-of-the-Years-Digits

Accelerated method using a declining fraction.

```
Sum of Years = N × (N + 1) / 2
Year t Depreciation = (Remaining Life / Sum) × (C − S)
where Remaining Life in year t = N − t + 1
```

**Example:** Salon wash station ₱40,000, salvage ₱4,000, depreciable base ₱36,000, life 4 years.
- Sum = 4 × 5 / 2 = 10
- Year 1: (4/10) × 36,000 = ₱14,400
- Year 2: (3/10) × 36,000 = ₱10,800
- Year 3: (2/10) × 36,000 = ₱7,200
- Year 4: (1/10) × 36,000 = ₱3,600

**Reference:** [Wall Street Prep — Sum of Years Digits](https://www.wallstreetprep.com/knowledge/sum-of-the-years-digits-method/)

#### Units of Production (IAS 16.62c)

Activity-based method tied to actual output or usage. Appropriate when wear correlates with output, not time.

```
Depreciation per Unit = (C − S) / Total Expected Units
Period Depreciation = Per Unit × Units Produced in Period
```

**Example:** Laser treatment machine ₱200,000, salvage ₱20,000, expected 100,000 treatments.
- Per treatment = (200,000 − 20,000) / 100,000 = ₱1.80
- Month with 500 treatments: ₱1.80 × 500 = **₱900**
- Month with 800 treatments: ₱1.80 × 800 = **₱1,440**

**Reference:** [Wall Street Prep — Units of Production](https://www.wallstreetprep.com/knowledge/units-of-production-method/)

### Key Depreciation Rules from IAS 16

| Rule | IAS Reference | Implication for System |
|------|--------------|----------------------|
| Depreciation begins when **available for use** | IAS 16.55 | Use `date_placed_in_service`, not `acquisition_date` |
| Depreciation ceases on **derecognition** or classification as held for sale | IAS 16.55 | Stop on status = DISPOSED_* or HELD_FOR_SALE |
| Depreciation does **NOT** cease when asset is idle | IAS 16.55 | Continue depreciation during SUSPENDED status |
| Residual value and useful life reviewed **at least annually** | IAS 16.51 | Support updating these fields (changes applied prospectively) |
| Changes in estimates applied **prospectively** | IAS 8.36 | New depreciation = remaining BV / remaining life |
| Method should reflect **pattern of benefit consumption** | IAS 16.60 | Different methods per category are valid |
| Each significant **component** depreciated separately | IAS 16.43 | AssetComponent entity handles this |
| Land is **not depreciated** (unlimited useful life) | IAS 16.58 | Allow `useful_life_months = 0` for land |

**Reference:** [IFRS Foundation — IAS 16 Full Standard](https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/)

---

## Audit Trail: AssetTransaction

`asset_transaction.proto` records **every event** in an asset's life. This is an append-only audit log — no Update or Delete RPCs.

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Primary key |
| `asset_id` | string (FK) | Which asset |
| `transaction_type` | AssetTransactionType | What happened (see enum below) |
| `transaction_date` | int64 | When it happened |
| `transaction_date_string` | string | ISO date |
| `amount` | double | Financial amount of the transaction |
| `description` | optional string | Narrative description |
| `reference_number` | optional string | External reference (PO, invoice, etc.) |
| `from_location_id` | optional string (FK) | Origin location (for transfers) |
| `to_location_id` | optional string (FK) | Destination location (for transfers) |
| `journal_entry_id` | optional string (FK) | GL journal entry reference |
| `performed_by` | optional string (FK) | User who recorded the event |
| Standard audit fields | | |

### Transaction Types

```
ACQUISITION           Initial purchase / capitalization
ADDITION              Capital improvement that extends life or enhances capacity (IAS 16.10)
DEPRECIATION          Periodic depreciation posting
REVALUATION_UP        Upward fair value adjustment (IAS 16.39)
REVALUATION_DOWN      Downward fair value adjustment (IAS 16.40)
IMPAIRMENT            IAS 36 write-down (carrying amount > recoverable amount)
IMPAIRMENT_REVERSAL   Reversal of prior impairment (IAS 36.110 — IFRS only, NOT US GAAP)
TRANSFER              Location or department transfer
ADJUSTMENT            Cost or useful life adjustment
DISPOSAL_SALE         Sale of asset
DISPOSAL_SCRAP        Scrapping of asset
DISPOSAL_DONATION     Asset donated
DISPOSAL_TRADE_IN     Trade-in for replacement asset
RETIREMENT            Removed from active service (pending disposal)
REINSTATEMENT         Reversed retirement — asset returned to service
MAINTENANCE           Maintenance event recorded (informational, may or may not be capitalized)
WRITE_OFF             Full write-off (book value to zero)
```

**Why a separate audit trail from DepreciationSchedule?**

DepreciationSchedule records the routine, periodic depreciation calculations. AssetTransaction captures everything else — acquisitions, disposals, transfers, impairments, revaluations, maintenance events. They serve different audiences: the accountant runs the depreciation schedule for the monthly close; the asset manager reads the transaction log for the full lifecycle story.

---

## Disposal: AssetDisposal

`asset_disposal.proto` records the detailed circumstances of removing an asset from the books, including the gain/loss calculation required by IAS 16.68-72.

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Primary key |
| `asset_id` | string (FK) | Which asset |
| `disposal_date` | int64 | Date of disposal |
| `disposal_date_string` | string | ISO date |
| `disposal_type` | DisposalType | SALE, SCRAP, DONATION, TRADE_IN, ABANDONMENT, WRITE_OFF |
| `proceeds` | double | Cash or value received (zero for scrap/donation) |
| `cost_at_disposal` | double | Original cost at time of disposal |
| `accumulated_depreciation_at_disposal` | double | Total depreciation taken |
| `book_value_at_disposal` | double | Net book value (cost − accum depr) |
| `gain_or_loss` | double | proceeds − book_value_at_disposal |
| `buyer_name` | optional string | Who bought it (if sale) |
| `reason` | optional string | Reason for disposal |
| `approval_status` | optional string | PENDING, APPROVED, REJECTED |
| `approved_by` | optional string (FK) | Who approved |
| `journal_entry_id` | optional string (FK) | GL journal entry |
| Standard audit fields | | |

### Gain/Loss Calculation (IAS 16.68-71)

```
Gain or Loss = Net Disposal Proceeds − Carrying Amount

Where:
  Net Disposal Proceeds = Sale price − Costs of disposal
  Carrying Amount = Cost − Accumulated Depreciation − Accumulated Impairment
```

**IAS 16.68:** The gain or loss on derecognition is the difference between net disposal proceeds (if any) and the carrying amount. It is recognized in **profit or loss** (NOT as revenue).

**IAS 16.71:** The gain shall NOT be classified as revenue.

### Disposal Journal Entries

**Sale at a Gain:**
```
DR  Cash / Accounts Receivable         ₱XX,XXX
DR  Accumulated Depreciation           ₱XX,XXX
    CR  Fixed Asset (at cost)                    ₱XX,XXX
    CR  Gain on Disposal (P&L)                   ₱X,XXX
```

**Sale at a Loss:**
```
DR  Cash / Accounts Receivable         ₱X,XXX
DR  Accumulated Depreciation           ₱XX,XXX
DR  Loss on Disposal (P&L)            ₱X,XXX
    CR  Fixed Asset (at cost)                    ₱XX,XXX
```

**Scrap / Write-Off (no proceeds):**
```
DR  Accumulated Depreciation           ₱XX,XXX
DR  Loss on Disposal (P&L)            ₱X,XXX  (if not fully depreciated)
    CR  Fixed Asset (at cost)                    ₱XX,XXX
```

**Reference:** [CFI — Asset Disposal](https://corporatefinanceinstitute.com/resources/accounting/asset-disposal/), [Double Entry Bookkeeping — Disposal Journal Entries](https://www.double-entry-bookkeeping.com/fixed-assets/disposal-of-fixed-assets/)

---

## Fair Value Adjustments: AssetRevaluation

`asset_revaluation.proto` records fair value adjustments under the IAS 16 revaluation model (IAS 16.31-42). Only applicable when `measurement_model = REVALUATION_MODEL`.

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Primary key |
| `asset_id` | string (FK) | Which asset |
| `revaluation_date` | int64 | Date of revaluation |
| `revaluation_date_string` | string | ISO date |
| `previous_carrying_amount` | double | Before revaluation |
| `new_fair_value` | double | Appraised/assessed fair value |
| `revaluation_amount` | double | Difference (new − previous) |
| `is_increase` | bool | Upward (true) or downward (false) |
| `recognized_in_pnl` | double | Amount recognized in profit/loss |
| `recognized_in_oci` | double | Amount recognized in OCI/revaluation surplus |
| `revaluation_surplus_balance` | double | Running balance of revaluation surplus for this asset |
| `appraiser_name` | optional string | Who performed the valuation |
| `valuation_method` | optional string | Market comparison, income approach, replacement cost |
| `journal_entry_id` | optional string (FK) | GL journal entry |
| `notes` | optional string | Supporting notes |
| Standard audit fields | | |

### Revaluation Accounting Rules

**IAS 16.39 — Upward revaluation (increase):**
- First-time increase → credit Revaluation Surplus (OCI)
- If reversing a prior decrease recognized in P&L → credit P&L (up to prior loss), surplus for remainder

**IAS 16.40 — Downward revaluation (decrease):**
- First-time decrease → debit P&L
- If prior revaluation surplus exists → debit Surplus (up to balance), P&L for remainder

**IAS 16.41 — On disposal of revalued asset:**
- Remaining revaluation surplus transfers directly to Retained Earnings (NOT through P&L)

### Revaluation Journal Entries

**Upward (first time or beyond prior decrease):**
```
DR  Fixed Asset                        ₱X,XXX
    CR  Revaluation Surplus (OCI)                ₱X,XXX
```

**Downward (no prior surplus):**
```
DR  Revaluation Loss (P&L)            ₱X,XXX
    CR  Fixed Asset                              ₱X,XXX
```

**Transfer on disposal:**
```
DR  Revaluation Surplus (OCI)         ₱X,XXX
    CR  Retained Earnings                        ₱X,XXX
```

**Reference:** [IFRS Community — Revaluation Model](https://ifrscommunity.com/knowledge-base/revaluation-model-property-plant-equipment-and-intangible-assets/), [Xplaind — Revaluation Journal Entries](https://xplaind.com/823452/revaluation-of-fixed-assets), [IFRS Meaning — Revaluation Model Guide](https://www.ifrsmeaning.com/revaluation-model-in-ias-16-a-comprehensive-guide-to-understanding-and-applying-it/)

---

## Impairment Testing (IAS 36)

Impairment is tracked through AssetTransaction (type = IMPAIRMENT or IMPAIRMENT_REVERSAL) rather than a separate entity, because impairment is an event, not a schedule.

### When to Test (IAS 36.12)

Test for impairment when there are **indicators** that an asset may be impaired:
- External: significant decline in market value, adverse technology/market/legal changes, increase in discount rates
- Internal: physical damage, idle/restructured, worse-than-expected performance

### The Test (IAS 36.18)

```
Recoverable Amount = MAX(Fair Value Less Costs of Disposal, Value in Use)

If Carrying Amount > Recoverable Amount → Impairment Loss = Carrying Amount − Recoverable Amount
```

### Impairment Journal Entries

**Standard impairment:**
```
DR  Impairment Loss (P&L)             ₱X,XXX
    CR  Accumulated Impairment Losses            ₱X,XXX
```

**Impairment of a previously revalued asset (IAS 36.120):**
```
DR  Revaluation Surplus (OCI)         ₱X,XXX  (to extent of prior surplus)
DR  Impairment Loss (P&L)             ₱X,XXX  (remainder)
    CR  Accumulated Impairment Losses            ₱XX,XXX
```

**Impairment reversal (IAS 36.110 — IFRS only, NOT allowed under US GAAP):**
```
DR  Accumulated Impairment Losses     ₱X,XXX
    CR  Impairment Reversal Gain (P&L)           ₱X,XXX  (up to original loss amount)
    CR  Revaluation Surplus (OCI)                ₱X,XXX  (any excess, only for revalued assets)
```

Reversal cannot increase carrying amount above what it would have been without impairment (IAS 36.117).

**Reference:** [IFRS Foundation — IAS 36](https://www.ifrs.org/issued-standards/list-of-standards/ias-36-impairment-of-assets/), [Grant Thornton — Recognising Impairment Losses](https://www.grantthornton.global/en/insights/articles/IFRS-ias-36/ifrs-Recognising-impairment-losses/)

---

## Maintenance Tracking: AssetMaintenance

`asset_maintenance.proto` tracks preventive and corrective maintenance events. This is important both operationally (scheduling) and financially (determining whether maintenance costs should be expensed or capitalized).

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Primary key |
| `asset_id` | string (FK) | Which asset |
| `maintenance_type` | MaintenanceType | PREVENTIVE, CORRECTIVE, INSPECTION, CALIBRATION, OVERHAUL |
| `priority` | MaintenancePriority | LOW, MEDIUM, HIGH, CRITICAL |
| `status` | MaintenanceStatus | SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED, OVERDUE |
| `scheduled_date` | optional int64 | When planned |
| `scheduled_date_string` | optional string | ISO date |
| `start_date` | optional int64 | When work started |
| `start_date_string` | optional string | ISO date |
| `completion_date` | optional int64 | When completed |
| `completion_date_string` | optional string | ISO date |
| `description` | optional string | What was done or is needed |
| `cost` | optional double | Cost of maintenance |
| `is_capitalized` | bool | Whether cost is added to asset value |
| `performed_by` | optional string | Technician/vendor name |
| `vendor_id` | optional string (FK) | External vendor → entity.Client |
| `work_order_number` | optional string | Work order reference |
| `next_maintenance_date` | optional int64 | Scheduled next occurrence |
| `next_maintenance_date_string` | optional string | ISO date |
| `recurrence_interval_days` | optional int32 | For recurring preventive maintenance |
| `notes` | optional string | Additional notes |
| Standard audit fields | | |

### Capitalize or Expense? (IAS 16.10-14)

Subsequent expenditure is **capitalized** (added to asset cost) only when it:
- Extends the asset's useful life beyond its original estimate
- Enhances the asset's capacity or quality of output
- Replaces a significant component (component accounting under IAS 16.13)

Routine repairs and maintenance are **expensed** as incurred (IAS 16.12).

**System implication:** The `is_capitalized` flag determines whether the maintenance cost:
- Creates an ADDITION transaction type and increases `Asset.acquisition_cost`, OR
- Is simply recorded as an expense in the expenditure domain

**Reference:** [eMaint — Preventive Maintenance](https://www.emaint.com/what-is-a-cmms/preventive-maintenance/), [MaintainX — Fixed Asset Register Guide](https://www.getmaintainx.com/blog/fixed-asset-register-guide)

---

## Component Depreciation: AssetComponent

`asset_component.proto` implements IAS 16.43-47, which requires that each **significant part** of an asset with a different useful life be depreciated separately.

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Primary key |
| `asset_id` | string (FK) | Parent asset |
| `name` | string | Component name |
| `description` | optional string | Description |
| `cost` | double | Component cost (part of parent's total cost) |
| `salvage_value` | double | Component residual value |
| `useful_life_months` | int32 | Component-specific useful life |
| `depreciation_method` | DepreciationMethod | Can differ from parent |
| `accumulated_depreciation` | double | Component running total |
| `book_value` | double | Component net book value |
| Standard audit fields | | |

### Real-World Examples

**Building (total cost ₱5,000,000):**
```
AssetComponent: "Structure"          cost: ₱3,000,000  life: 50 years  SL
AssetComponent: "Roof"               cost: ₱  500,000  life: 20 years  SL
AssetComponent: "HVAC System"        cost: ₱  600,000  life: 15 years  SL
AssetComponent: "Electrical Wiring"  cost: ₱  400,000  life: 25 years  SL
AssetComponent: "Plumbing"           cost: ₱  300,000  life: 20 years  SL
AssetComponent: "Elevators"          cost: ₱  200,000  life: 25 years  SL
                                     ─────────────────
                                     Total: ₱5,000,000  ✓ matches parent cost
```

**Salon Station (total cost ₱80,000):**
```
AssetComponent: "Hydraulic Chair"    cost: ₱40,000  life: 10 years  SL
AssetComponent: "Mirror & Lighting"  cost: ₱15,000  life: 15 years  SL
AssetComponent: "Wash Basin"         cost: ₱20,000  life: 20 years  SL
AssetComponent: "Storage Cabinet"    cost: ₱ 5,000  life: 10 years  SL
```

**IAS 16.45:** When a component is replaced, the old component is derecognized (disposed) and the new component is capitalized. This is the "component replacement" approach.

**IAS 16.47:** If it is not practicable to determine the cost of a component, an entity may use the replacement cost as an indication of the component's cost when acquired.

**Reference:** [IFRS Foundation — IAS 16.43-47](https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/)

---

## Location Access and Assignment: AssetLocation

`asset_location.proto` is a **many-to-many junction** between Asset and entity.Location. It answers: "Which locations can access, use, or book this asset?"

This is distinct from `Asset.location_id`, which records where the asset **physically is right now**. `AssetLocation` records where the asset **is available to be used**.

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Primary key |
| `asset_id` | string (FK) | Which asset |
| `location_id` | string (FK) | Which location has access → entity.Location |
| `location` | optional entity.Location | Nested location |
| `is_primary` | bool | Whether this is the asset's primary/home location |
| `assignment_type` | AssetAssignmentType | How the asset relates to this location |
| `date_assigned` | optional int64 | When the asset was assigned to this location |
| `date_assigned_string` | optional string | ISO date |
| `date_unassigned` | optional int64 | When access was revoked (null if still active) |
| `date_unassigned_string` | optional string | ISO date |
| `notes` | optional string | Assignment notes |
| Standard audit fields | | `date_created`, `date_modified`, `active` |

Unique constraint: `asset_id, location_id`

### Assignment Type Enum

```
ASSET_ASSIGNMENT_TYPE_UNSPECIFIED = 0
ASSET_ASSIGNMENT_TYPE_PERMANENT = 1        // Asset belongs to this location (home base)
ASSET_ASSIGNMENT_TYPE_SHARED = 2           // Asset is shared across locations (bookable)
ASSET_ASSIGNMENT_TYPE_TEMPORARY = 3        // Temporarily assigned (e.g., loaned, on rotation)
ASSET_ASSIGNMENT_TYPE_MOBILE = 4           // Asset travels between locations (e.g., mobile van)
```

### Why This Exists

**Single-location model (`Asset.location_id` alone):**
- A salon chair is at Branch A. Full stop.
- Works for simple businesses with one location.

**Multi-location model (`AssetLocation` junction):**
- A laser machine is **physically at** Branch A (`Asset.location_id = Branch A`)
- But is **available for booking** at Branch A, Branch B, and Branch C (`AssetLocation` rows)
- Branch B staff can book it — the machine gets transported for the appointment
- A mobile service van is **based at** HQ but **serves** all 5 locations

This pattern mirrors `PlanLocation` in the subscription domain, where a Plan can be available at multiple locations. Both follow the junction table convention established across the esqyma domain.

### Real-World Examples

**Shared equipment across salon branches:**
```
Asset: "IPL Laser Machine — Model XP500"
├── Asset.location_id = "Branch A"  (physically stored here)
├── AssetLocation: Branch A  (PERMANENT, is_primary=true)
├── AssetLocation: Branch B  (SHARED)
└── AssetLocation: Branch C  (SHARED)
```

**Mobile service vehicle:**
```
Asset: "Toyota HiAce Mobile Salon Van"
├── Asset.location_id = "HQ"  (parked here overnight)
├── AssetLocation: HQ           (PERMANENT, is_primary=true)
├── AssetLocation: Branch A     (MOBILE — serves this area Mon/Wed)
├── AssetLocation: Branch B     (MOBILE — serves this area Tue/Thu)
└── AssetLocation: Branch C     (MOBILE — serves this area Fri)
```

**Temporarily loaned equipment:**
```
Asset: "Hair Steamer Unit #2"
├── Asset.location_id = "Branch A"  (home location)
├── AssetLocation: Branch A  (PERMANENT, is_primary=true)
└── AssetLocation: Branch D  (TEMPORARY, assigned 2026-03-01, unassigned 2026-04-01)
```

### Integration with Asset Transfer

When `Asset.location_id` changes via a TRANSFER transaction:
1. The `AssetTransaction` records the move (from_location → to_location)
2. The `AssetLocation` `is_primary` flag can be updated
3. The old primary location may keep SHARED access or be deactivated

This means `AssetLocation` is the **access control layer** while `Asset.location_id` is the **physical truth**. An asset can be physically at Branch A but accessible to Branches A, B, and C.

### Querying Patterns

| Question | Query |
|----------|-------|
| "What assets are available at Branch B?" | `SELECT asset FROM asset_location WHERE location_id = 'branch-b' AND active = true` |
| "Which locations can use the laser machine?" | `SELECT location FROM asset_location WHERE asset_id = 'laser-1' AND active = true` |
| "What shared equipment do we have?" | `SELECT asset FROM asset_location GROUP BY asset_id HAVING COUNT(*) > 1` |
| "What's temporarily loaned out?" | `SELECT * FROM asset_location WHERE assignment_type = 'TEMPORARY' AND date_unassigned IS NULL` |

---

## Asset Lifecycle State Machine

```
                    DRAFT
                      │
                      ▼  (approve / submit)
               NOT_YET_ACQUIRED
                      │
                      ▼  (record acquisition, post GL journal)
    ┌────────── IN_SERVICE ◄──────────────────────────────┐
    │                 │                                    │
    │    (suspend)    │    (periodic depreciation)         │
    │        ▼        │              │                     │
    │   SUSPENDED ────┘              ▼                     │
    │   (reinstate)         DepreciationSchedule           │
    │                        rows generated                │
    │                              │                       │
    │                 ┌────────────┤                       │
    │                 │            │                       │
    │          (impairment    (fully                       │
    │           test fails)    depreciated)                │
    │                 ▼            ▼                       │
    │           IMPAIRED    FULLY_DEPRECIATED              │
    │                 │            │                       │
    │        (reversal│  ──────────┘                       │
    │         — IFRS  │                                    │
    │          only)  │                                    │
    │                 ▼                                    │
    │           IN_SERVICE ───────────────────────────────►│
    │                                                      │
    └────────────► RETIRED                                 │
                      │                                    │
                      ├──► DISPOSED_SOLD       ────────────┘
                      │                        (reinstatement
                      ├──► DISPOSED_SCRAPPED    is rare but
                      │                         possible)
                      └──► WRITTEN_OFF
```

### Status Transitions and Their Journal Entries

| From | To | Trigger | Journal Entry |
|------|----|---------|-|
| DRAFT | NOT_YET_ACQUIRED | Internal approval | None |
| NOT_YET_ACQUIRED | IN_SERVICE | Acquisition posted | DR Asset, CR Cash/AP |
| IN_SERVICE | IN_SERVICE | Periodic depreciation | DR Depr Expense, CR Accum Depr |
| IN_SERVICE | SUSPENDED | Major repair / temporary hold | None (depreciation continues per IAS 16.55) |
| SUSPENDED | IN_SERVICE | Reinstatement | None |
| IN_SERVICE | IMPAIRED | IAS 36 test: carrying > recoverable | DR Impairment Loss, CR Accum Impairment |
| IMPAIRED | IN_SERVICE | IAS 36.110 reversal | DR Accum Impairment, CR Reversal Gain |
| IN_SERVICE | FULLY_DEPRECIATED | BV reaches salvage value | Final depreciation entry |
| Any active | RETIRED | Decision to remove from service | None (pending disposal) |
| RETIRED | DISPOSED_SOLD | Sale completed | DR Cash + Accum Depr, CR Asset + Gain/Loss |
| RETIRED | DISPOSED_SCRAPPED | Scrapped | DR Accum Depr + Loss, CR Asset |
| RETIRED | WRITTEN_OFF | Full write-off | DR Accum Depr + Loss, CR Asset |

---

## Extensible Metadata: AssetAttribute

`asset_attribute.proto` follows the established `{Entity}Attribute` junction pattern used across 7+ entities in the esqyma domain.

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Primary key |
| `asset_id` | string (FK) | Reference to Asset |
| `attribute_id` | string (FK) | Reference to common.Attribute |
| `attribute` | optional common.Attribute | Nested attribute definition |
| `value` | string | Attribute value |
| Standard audit fields | | |

Unique constraint: `asset_id, attribute_id`

**Typical asset attributes:**
```
Asset: "Hydraulic Salon Chair — Station 3"
├── AssetAttribute: warranty_provider = "HydraChair Co."
├── AssetAttribute: insurance_policy = "POL-2026-1234"
├── AssetAttribute: color = "Black"
├── AssetAttribute: weight_kg = "35"
├── AssetAttribute: power_rating_watts = "150"
└── AssetAttribute: manual_url = "https://hydrachair.com/manual/HC-500.pdf"
```

---

## Permissions (RBAC)

The asset domain defines two permission entities that integrate into the espyna authorization system. Each entity gets the standard 5 CRUD actions, yielding 10 permission codes:

| Entity | Permission Codes | Purpose |
|--------|-----------------|---------|
| `asset` | `asset:create`, `asset:read`, `asset:update`, `asset:delete`, `asset:list` | Controls access to fixed asset records |
| `asset_category` | `asset_category:create`, `asset_category:read`, `asset_category:update`, `asset_category:delete`, `asset_category:list` | Controls access to asset category configuration |

### Entity Constants (espyna)

Defined in `espyna-golang/internal/application/ports/security/authorization.go`:

```go
EntityAsset                = "asset"
EntityAssetCategory        = "asset_category"
EntityAssetAttribute       = "asset_attribute"
EntityAssetLocation        = "asset_location"
EntityDepreciationSchedule = "depreciation_schedule"
EntityAssetTransaction     = "asset_transaction"
EntityAssetDisposal        = "asset_disposal"
EntityAssetRevaluation     = "asset_revaluation"
EntityAssetMaintenance     = "asset_maintenance"
EntityAssetComponent       = "asset_component"
```

### Role Assignments (service-admin)

| Role | Asset Permissions | Asset Category Permissions |
|------|------------------|--------------------------|
| **Admin** | Full CRUD (`asset:*`) | Full CRUD (`asset_category:*`) |
| **Operations Staff** | Full CRUD (`asset:*`) | Full CRUD (`asset_category:*`) |
| **Accounting Staff** | Read + List only | Read + List only |
| **People Manager** | None (no asset access) | None |

### Sidebar Visibility

The "Assets" sidebar app uses `Permission: "asset:list"` — users without this permission won't see the Assets menu. This means People Managers (who manage users/clients/locations but not assets) correctly have no asset visibility.

---

## Cross-Domain Boundaries

The asset domain **references** entities from other domains but is **not referenced by** them (at least initially). This keeps the dependency direction clean.

| FK Field | Points To | Domain | Purpose |
|----------|-----------|--------|---------|
| `Asset.location_id` | Location | entity | Where the asset physically is (single) |
| `AssetLocation.location_id` | Location | entity | Which locations can access/use the asset (many) |
| `Asset.custodian_id` | User | entity | Who is responsible |
| `Asset.vendor_id` | Client | entity | Who sold it to us |
| `Asset.product_id` | Product | product | If asset originated from a product purchase |
| `AssetMaintenance.vendor_id` | Client | entity | Maintenance vendor |
| `AssetDisposal.approved_by` | User | entity | Disposal approver |
| `AssetTransaction.performed_by` | User | entity | Who recorded the event |
| `*.journal_entry_id` | Journal | ledger | GL journal entry (future) |

### Relationship to Expenditure Domain

When a fixed asset is purchased, it may originate as an `Expenditure` record. The flow:
1. Purchase recorded as Expenditure (type = "purchase")
2. Asset record created with `invoice_number` matching `Expenditure.reference_number`
3. Expenditure posts the AP/Cash side; Asset ACQUISITION transaction posts the asset GL side

### Relationship to Inventory Domain

The inventory domain has an existing `InventoryDepreciation` entity. The asset domain **supersedes** this for true fixed assets:
- **Inventory** = items held for sale → tracked by `InventoryItem` with quantities
- **Assets** = items used in operations → tracked by `Asset` with depreciation schedules

The `InventoryDepreciation` entity can be deprecated in favor of `DepreciationSchedule`, or retained for a transitional period. The key distinction: if you sell it to customers, it's inventory. If you use it to run the business, it's an asset.

### Relationship to Ledger Domain

Every financial event generates a journal entry reference. When the `ledger.Journal` entity is built:
- `DepreciationSchedule.journal_entry_id` → monthly depreciation postings
- `AssetTransaction.journal_entry_id` → acquisition, impairment, adjustment entries
- `AssetDisposal.journal_entry_id` → disposal entries with gain/loss
- `AssetRevaluation.journal_entry_id` → revaluation entries
- `AssetCategory` GL account mappings drive which accounts are debited/credited

---

## IAS 16 Required Disclosures

The system must support generating the following disclosures required by IAS 16.73-79. Each maps to a query against the asset domain:

| Disclosure | IAS Reference | Query |
|------------|--------------|-------|
| Measurement basis per class | IAS 16.73(a) | GROUP BY asset_category + measurement_model |
| Depreciation methods used | IAS 16.73(b) | GROUP BY asset_category + depreciation_method |
| Useful lives or depreciation rates | IAS 16.73(c) | GROUP BY asset_category, show useful_life_months |
| Gross carrying amount (start + end) | IAS 16.73(d) | SUM(acquisition_cost) at period start/end |
| Accumulated depreciation (start + end) | IAS 16.73(d) | SUM(accumulated_depreciation) at period start/end |
| Reconciliation of carrying amount | IAS 16.73(e) | Additions + Disposals + Depreciation + Impairments + Revaluations + Transfers |
| Restrictions on title | IAS 16.74(a) | Filter by AssetAttribute "pledged" or "restricted" |
| Assets pledged as security | IAS 16.74(a) | Filter by AssetAttribute "collateral" |
| Capital commitments | IAS 16.74(c) | Filter by status = NOT_YET_ACQUIRED |

**The reconciliation schedule** (IAS 16.73(e)) is the most complex disclosure — it shows how the carrying amount changed during the period:

```
                                    PP&E     Intangible  Right-of-Use
                                    ─────    ──────────  ────────────
Opening balance                     1,500        50          960
Additions                            200        25            0
Disposals                           (100)        0            0
Depreciation/Amortization           (180)      (17)        (192)
Impairment losses                      0         0            0
Revaluation increases                 50         0            0
Transfers                             0         0            0
                                    ─────    ──────────  ────────────
Closing balance                     1,470        58          768
```

---

## Service Pattern

Following established esqyma conventions:

```protobuf
service AssetDomainService {
  // Standard CRUD
  rpc CreateAsset(CreateAssetRequest) returns (CreateAssetResponse);
  rpc ReadAsset(ReadAssetRequest) returns (ReadAssetResponse);
  rpc UpdateAsset(UpdateAssetRequest) returns (UpdateAssetResponse);
  rpc DeleteAsset(DeleteAssetRequest) returns (DeleteAssetResponse);
  rpc ListAssets(ListAssetsRequest) returns (ListAssetsResponse);

  // Enhanced page data (for UI views)
  rpc GetAssetListPageData(GetAssetListPageDataRequest) returns (GetAssetListPageDataResponse);
  rpc GetAssetItemPageData(GetAssetItemPageDataRequest) returns (GetAssetItemPageDataResponse);

  // Lifecycle operations
  rpc AcquireAsset(AcquireAssetRequest) returns (AcquireAssetResponse);
  rpc DisposeAsset(DisposeAssetRequest) returns (DisposeAssetResponse);
  rpc TransferAsset(TransferAssetRequest) returns (TransferAssetResponse);

  // Depreciation engine
  rpc RunDepreciation(RunDepreciationRequest) returns (RunDepreciationResponse);
  rpc GetDepreciationSchedule(GetDepreciationScheduleRequest) returns (GetDepreciationScheduleResponse);

  // Revaluation (IFRS only)
  rpc RevalueAsset(RevalueAssetRequest) returns (RevalueAssetResponse);
}
```

---

## Real-World Analogy

Think of a salon/spa business managing its physical assets:

| Concept | Entity | Example |
|---------|--------|---------|
| Asset register binder | Asset | "Hydraulic Salon Chair #3 — Station 3, acquired 2025-06-15, cost ₱50,000" |
| Category tab divider | AssetCategory | "Salon Equipment" tab with depreciation defaults and GL accounts |
| Branch availability board | AssetLocation | "Laser machine available at: Branch A (home), Branch B, Branch C" |
| Monthly depreciation worksheet | DepreciationSchedule | "Period 8: Opening ₱41,000, Depr ₱750, Closing ₱40,250" |
| Asset history card | AssetTransaction | "2025-06-15 ACQUIRED ₱50,000 → 2025-07-01 DEPRECIATION ₱750 → ..." |
| Disposal report | AssetDisposal | "Sold old dryer for ₱5,000, BV was ₱3,000, gain ₱2,000" |
| Appraisal report | AssetRevaluation | "Building revalued from ₱2M to ₱2.3M, surplus ₱300K to OCI" |
| Maintenance log | AssetMaintenance | "2026-02-01: Preventive — hydraulic fluid change, cost ₱2,500, expensed" |
| Parts breakdown | AssetComponent | "Chair: hydraulic mechanism (10y) + upholstery (5y) + base (15y)" |
| Asset sticker / barcode | AssetAttribute | "Tag: FA-1005, Serial: HC-500-2025-1234" |

The salon owner buys equipment (Asset). The accountant categorizes it (AssetCategory). Every month, the system calculates how much value it lost (DepreciationSchedule). When a chair breaks beyond repair, it's disposed (AssetDisposal) and the gain or loss hits the P&L. The maintenance team logs repairs (AssetMaintenance). At year-end, the accountant produces the IAS 16 disclosure schedule showing all movement during the period.

---

## References and Further Reading

### Accounting Standards (Primary Sources)
- [IFRS Foundation — IAS 16 Property, Plant and Equipment](https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/)
- [IFRS Foundation — IAS 38 Intangible Assets](https://www.ifrs.org/issued-standards/list-of-standards/ias-38-intangible-assets/)
- [IFRS Foundation — IAS 36 Impairment of Assets](https://www.ifrs.org/issued-standards/list-of-standards/ias-36-impairment-of-assets/)
- [IFRS Foundation — IAS 40 Investment Property](https://www.ifrs.org/issued-standards/list-of-standards/ias-40-investment-property/)
- [IFRS Foundation — IFRS 16 Leases](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-16-leases/)
- [IFRS Foundation — IFRS 5 Non-current Assets Held for Sale](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-5-non-current-assets-held-for-sale-and-discontinued-operations/)

### Standard Summaries and Guides
- [Deloitte IAS Plus — IAS 16](https://www.iasplus.com/en/standards/ias/ias16)
- [Deloitte IAS Plus — IAS 38](https://www.iasplus.com/en/standards/ias/ias38)
- [Deloitte IAS Plus — IAS 36](https://www.iasplus.com/en/standards/ias/ias36)
- [CPDbox — Full Guide on IAS 16](https://www.cpdbox.com/ias-16-property-plant-and-equipment/)
- [CPDbox — IAS 36 Impairment Explained](https://www.cpdbox.com/ias-36-impairment-assets/)
- [IFRS Community — Revaluation Model for PPE and Intangibles](https://ifrscommunity.com/knowledge-base/revaluation-model-property-plant-equipment-and-intangible-assets/)
- [IFRS Meaning — Revaluation Model Comprehensive Guide](https://www.ifrsmeaning.com/revaluation-model-in-ias-16-a-comprehensive-guide-to-understanding-and-applying-it/)
- [Wikipedia — IAS 16](https://en.wikipedia.org/wiki/IAS_16)

### Depreciation Methods
- [Corporate Finance Institute — 4 Types of Depreciation Methods](https://corporatefinanceinstitute.com/resources/accounting/types-depreciation-methods/)
- [Corporate Finance Institute — Straight Line Depreciation](https://corporatefinanceinstitute.com/resources/accounting/straight-line-depreciation/)
- [Wall Street Prep — Sum of the Years Digits Method](https://www.wallstreetprep.com/knowledge/sum-of-the-years-digits-method/)
- [Wall Street Prep — Units of Production Method](https://www.wallstreetprep.com/knowledge/units-of-production-method/)
- [Bench — Double Declining Balance Guide](https://www.bench.co/blog/tax-tips/double-declining-balance)

### Asset Lifecycle Management
- [CPC Group — Fixed Asset Lifecycle Accounting](https://cpcongroup.com/fixed-asset-life-cycle-accounting/)
- [Sage — Fixed Asset Lifecycle Management](https://www.sage.com/en-us/blog/fixed-asset-lifecycle-management-efficiency/)
- [NetSuite — Fixed Asset Management](https://www.netsuite.com/portal/resource/articles/accounting/fixed-assets-management.shtml)
- [Microsoft Learn — Manage Fixed Assets (Dynamics 365)](https://learn.microsoft.com/en-us/dynamics365/business-central/fa-manage)

### Journal Entries and GL Integration
- [FinQuery — Fixed Asset Accounting Explained](https://finquery.com/blog/fixed-assets-in-accounting-explained-examples/)
- [NetSuite — GL Accounts for Fixed Assets](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_164861717992.html)
- [NetSuite — Fixed Asset Accounting Basics](https://www.netsuite.com/portal/resource/articles/accounting/fixed-assets-accounting-basics.shtml)
- [HighRadius — Fixed Asset Journal Entry](https://www.highradius.com/resources/Blog/booking-fixed-asset-journal-entry/)

### Disposal and Derecognition
- [Corporate Finance Institute — Asset Disposal](https://corporatefinanceinstitute.com/resources/accounting/asset-disposal/)
- [Business LibreTexts — Gains and Losses on Disposal](https://biz.libretexts.org/Bookshelves/Accounting/Principles_of_Financial_Accounting_(Jonick)/04:_Assets_in_More_Detail/4.07:_Gains_and_Losses_on_Disposal_of_Assets)
- [Double Entry Bookkeeping — Disposal Journal Entries](https://www.double-entry-bookkeeping.com/fixed-assets/disposal-of-fixed-assets/)

### Revaluation
- [Xplaind — Revaluation of Fixed Assets Journal Entries](https://xplaind.com/823452/revaluation-of-fixed-assets)

### Impairment
- [Grant Thornton — Recognising Impairment Losses under IAS 36](https://www.grantthornton.global/en/insights/articles/IFRS-ias-36/ifrs-Recognising-impairment-losses/)

### ERP System Schema References
- [Oracle FA_BOOKS Table Reference](https://docs.oracle.com/en/cloud/saas/financials/24b/oedmf/fabooks-13403.html)
- [Oracle Fixed Assets Tables and Queries](http://appselangovan.blogspot.com/2013/06/tables-of-fixed-assets-and-queries.html)
- [Oracle Data Design — The Asset Models](https://docs.oracle.com/cd/E29542_01/doc.1111/e29634/data_overview.htm)
- [Microsoft Common Data Model — AssetBookV2Entity](https://learn.microsoft.com/en-us/common-data-model/schema/core/operationscommon/entities/finance/fixedassets/assetbookv2entity)
- [Dynamics 365 — Fixed Asset Book Status](https://community.dynamics.com/blogs/post/?postid=45d5d9a4-534d-4f2e-a4cb-76732405fd30)
- [Dynamics 365 BC — Get fixedAssets API](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/api-reference/v2.0/api/dynamics_fixedasset_get)
- [ERP.net — ManagedAssets Domain Model](https://docs.erp.net/model/entities/Applications.AssetManagement.ManagedAssets.html)
- [ERP Internals — Fixed Assets Module (Wikibooks)](https://en.wikibooks.org/wiki/ERP_Internals/Modules/Fixed_Assets)
- [ERPNext — Asset Depreciation](https://docs.frappe.io/erpnext/user/manual/en/asset-depreciation)
- [ERPNext Asset Doctype Source (GitHub)](https://github.com/frappe/erpnext/blob/develop/erpnext/assets/doctype/asset/asset.py)

### Maintenance Tracking
- [eMaint — Preventive Maintenance Software](https://www.emaint.com/what-is-a-cmms/preventive-maintenance/)
- [WorkTrek — Equipment Maintenance Log](https://worktrek.com/glossary/equipment-maintenance-log/)
- [MaintainX — Fixed Asset Register Guide](https://www.getmaintainx.com/blog/fixed-asset-register-guide)
