# Professional Services Scenarios: Inventory (Resources & Time Entry)

Inventory scenarios cover the resource registry (people as inventory) and time submission lifecycle — the core mechanism that connects staff work to client billing.

---

## Staff Submits Weekly Timesheet

```
Jane Smith (Sr. Consultant - AWS)
  InventoryItem:
    ├── product_id: FK to "Senior Consultant"
    ├── product_variant_id: FK to "Sr. Consultant - AWS"
    ├── location_id: FK to "NYC Office"
    ├── sku: "EMP-2847"
    ├── unit_of_measure: "hours"
    └── item_type: "serialized"

Week of Jan 6-10, 2025:
  │
  ▼
  ┌──────────────────────────────────────────────────────┐
  │  InventoryTransaction (Time Entry)                    │
  │    ├── inventory_item_id: FK to Jane Smith             │
  │    ├── serial_number: "EMP-2847-NYC"                   │
  │    ├── transaction_type: "billable"                    │
  │    ├── reference_type: "subscription"                  │
  │    ├── reference_id: "SUB-ACME-001"                    │
  │    ├── quantity: 40 (hours)                            │
  │    ├── performed_by: "EMP-2847" (self-reported)        │
  │    ├── notes: "Cloud architecture design, sprint 3"    │
  │    └── status: "draft"                                 │
  └──────────────────────────────────────────────────────┘
        │
        ▼  Jane submits on Friday EOD
  ┌──────────┐
  │submitted │ status: "draft" → "submitted"
  └────┬─────┘
       │
       ▼  Manager reviews Monday AM
  ┌──────────┐
  │ approved │ status: "submitted" → "approved"
  └────┬─────┘   Revenue eligible — awaits billing cycle
       │
       ▼  Month-end billing run
  ┌──────────┐
  │  billed  │ RevenueLineItem created:
  └──────────┘   40 hrs × $275 (PriceList rate) = $11,000
```

**Entities involved**: `InventoryItem`, `InventorySerial`, `InventoryTransaction`, `Subscription`, `PriceList`, `PriceProduct`, `RevenueLineItem`

---

## Non-Billable Time (Training, PTO, Internal)

```
Jane attends 2-day internal training (Jan 13-14)
  │
  ▼
  ┌──────────────────────────────────────────────────────┐
  │  InventoryTransaction (Non-Billable Time Entry)       │
  │    ├── inventory_item_id: FK to Jane Smith             │
  │    ├── transaction_type: "internal"                    │
  │    ├── reference_type: "training"                      │
  │    ├── reference_id: "TRN-AWS-CERT-2025"               │
  │    ├── quantity: 16 (hours)                            │
  │    ├── notes: "AWS Solutions Architect recertification" │
  │    └── status: "draft"                                 │
  └──────────────────────────────────────────────────────┘
        │
        ▼
  ┌──────────┐     ┌─────────────┐
  │submitted │────▶│non_billable │ Manager confirms: training, not billable
  └──────────┘     └──────┬──────┘
                          │
                          ▼
              ┌──────────────────────────┐
              │ inventory_depreciation    │
              │ 16 hrs × $275 = $4,400    │
              │ (utilization write-down)  │
              │ reason: "training"        │
              └──────────────────────────┘

No RevenueLineItem created.
Hours tracked for utilization metrics:
  Jane's January utilization = billable hrs / total hrs
                             = 160 / 176 = 91%
```

**Key insight**: Non-billable time still flows through `InventoryTransaction` for utilization tracking, but terminates at `"non_billable"` and creates an `inventory_depreciation` record instead of a `RevenueLineItem`. This is the services equivalent of retail shrinkage.

---

## Resource Transfer Between Offices

```
Jane Smith relocating from NYC to London office (March 1)
  │
  ▼
  ┌──────────────────────────────────────────────────────┐
  │  InventoryTransaction (Resource Transfer)              │
  │    ├── inventory_item_id: FK to Jane Smith             │
  │    ├── transaction_type: "transfer"                    │
  │    ├── from_location_id: FK to "NYC Office"            │
  │    ├── to_location_id: FK to "London Office"           │
  │    ├── quantity: 1                                     │
  │    └── status: "completed"                             │
  └──────────────────────────────────────────────────────┘

InventoryItem updated:
  location_id: "NYC Office" → "London Office"

Impact on billing:
  ├── Before Mar 1: Jane's hours priced from PriceList "2025 Rate Card - NYC"
  └── After Mar 1: Jane's hours priced from PriceList "2025 Rate Card - London"
      (rate may change: $275/hr NYC → £225/hr London)

No RevenueLineItem — transfers are internal movements.
```

**Key insight**: Resource transfers change the `InventoryItem.location_id`, which cascades to rate lookup — the applicable `PriceList` is determined by the resource's current office. Same person, same skill, different rate based on where they're based.

---

## Contractor Hours (Consumable Resource)

```
Firm hires an external AWS specialist for one engagement:

InventoryItem "Carlos Rivera (Contractor)"
  ├── product_id: FK to "Senior Consultant"
  ├── product_variant_id: FK to "Sr. Consultant - AWS"
  ├── location_id: FK to "NYC Office"
  ├── sku: "CTR-0491"
  ├── item_type: "consumable" ← one-time resource, not permanent staff
  └── unit_of_measure: "hours"

InventoryTransaction (contractor time entry):
  ├── inventory_item_id: FK to Carlos
  ├── transaction_type: "billable"
  ├── reference_type: "subscription"
  ├── reference_id: "SUB-ACME-001"
  ├── quantity: 80 (hours, 2-week sprint)
  ├── performed_by: "CTR-0491"
  └── status: "submitted" → "approved" → "billed"

RevenueLineItem:
  ├── quantity: 80
  ├── unit_price: $275 (billed at same rate as internal Sr. Consultant)
  └── total_price: $22,000

Internal cost tracking (not in proto, but relevant):
  └── Firm pays contractor $200/hr, bills client $275/hr
      Margin: $75/hr × 80 hrs = $6,000
```

**Key insight**: Contractors are `item_type: "consumable"` — they represent temporary capacity that's used and gone, unlike permanent `"serialized"` staff. The billing flow is identical from the client's perspective, but the firm tracks margin differently internally.
