# Professional Services Scenarios: Sales (Billing & Revenue)

Sales/billing scenarios cover the end-to-end flow from approved hours to client invoicing, including T&M billing, fixed-fee milestones, and credit adjustments.

---

## Monthly T&M Billing Cycle

```
End of month: billing cycle triggers
  │
  ├── Collect all InventoryTransactions where:
  │    status = "approved"
  │    reference_id = "SUB-ACME-001" (Acme engagement)
  │    period = January 2025
  │
  ▼
  ┌──────────────────────────────────────────────────────┐
  │  Approved Time Entries for January                    │
  │                                                       │
  │  Jane Smith (Sr. Consultant - AWS)                    │
  │    ├── Week 1: 40 hrs                                 │
  │    ├── Week 2: 38 hrs                                 │
  │    ├── Week 3: 40 hrs                                 │
  │    └── Week 4: 42 hrs  → Total: 160 hrs               │
  │                                                       │
  │  Tom Lee (Jr. Analyst - Data)                         │
  │    ├── Week 1: 32 hrs                                 │
  │    ├── Week 2: 40 hrs                                 │
  │    ├── Week 3: 24 hrs (partial week)                  │
  │    └── Week 4: 40 hrs  → Total: 136 hrs               │
  └──────────────────────────────────────────────────────┘
        │
        ▼  Rate lookup: PriceList "2025 Rate Card - NYC"
  ┌──────────────────────────────────────────────────────┐
  │  Revenue (Billed Revenue for Acme, Jan 2025)          │
  │    ├── client_id: FK to Acme Corp                     │
  │    ├── location_id: FK to NYC Office                  │
  │    ├── status: "draft"                                │
  │    │                                                  │
  │    ├── RevenueLineItem 1                              │
  │    │    ├── inventory_item_id: FK to Jane Smith        │
  │    │    ├── quantity: 160 (hours)                      │
  │    │    ├── unit_price: $275 (Sr. Consultant rate)     │
  │    │    ├── total_price: $44,000                       │
  │    │    └── line_item_type: "item"                     │
  │    │                                                  │
  │    ├── RevenueLineItem 2                              │
  │    │    ├── inventory_item_id: FK to Tom Lee            │
  │    │    ├── quantity: 136 (hours)                      │
  │    │    ├── unit_price: $150 (Jr. Analyst rate)        │
  │    │    ├── total_price: $20,400                       │
  │    │    └── line_item_type: "item"                     │
  │    │                                                  │
  │    └── Revenue.total_amount: $64,400                  │
  └──────────────────────────────────────────────────────┘
        │
        ▼
  ┌──────────────┐     ┌──────────┐
  │ Invoice      │     │ Payment  │
  │ INV-2025-003 │────▶│ Wire     │
  │ $64,400      │     │ Net 30   │
  └──────────────┘     └──────────┘
  Revenue.status: "draft" → "invoiced" → "paid"
  InventoryTransaction.status: "approved" → "billed" (all entries)
```

**Entities involved**: `Subscription`, `InventoryTransaction`, `InventoryItem`, `PriceList`, `PriceProduct`, `Revenue`, `RevenueLineItem`, `Invoice`, `Payment`

---

## Fixed-Fee Milestone Billing

```
Subscription "Acme Cloud Migration" (fixed fee)
  ├── PricePlan: "Fixed Fee 6-Month" → $150,000
  ├── Milestone schedule in metadata:
  │    ├── Milestone 1 (Discovery):  20% → $30,000
  │    ├── Milestone 2 (Migration):  40% → $60,000
  │    ├── Milestone 3 (Testing):    25% → $37,500
  │    └── Milestone 4 (Closeout):   15% → $22,500
  │
  ▼  Milestone 2 completed (March)
  ┌──────────────────────────────────────────────────────┐
  │  Revenue (Milestone 2 - Migration Phase)              │
  │    ├── client_id: FK to Acme Corp                     │
  │    ├── reference_number: "MS-2 Migration"             │
  │    │                                                  │
  │    └── RevenueLineItem                                │
  │         ├── description: "Migration phase completion"  │
  │         ├── quantity: 1                                │
  │         ├── unit_price: $60,000                       │
  │         ├── total_price: $60,000                       │
  │         └── line_item_type: "item"                     │
  └──────────────────────────────────────────────────────┘

Time entries still tracked (for utilization reporting):
  ├── Jane Smith: 180 hrs this milestone (actual)
  ├── Tom Lee: 160 hrs this milestone (actual)
  └── InventoryTransaction.status → "non_billable"
      (hours recorded but not individually billed — fixed fee covers them)
```

**Key insight**: In fixed-fee engagements, time entries are still submitted via `InventoryTransaction` for internal utilization tracking, but they don't individually generate `RevenueLineItems`. Revenue is recognized at milestone completion. The time entries move to `"non_billable"` status since billing is milestone-based, not hour-based.

---

## Credit Note for Over-Billing

```
Original billing (January):
  Revenue INV-2025-003
    ├── RevenueLineItem: Jane Smith, 160 hrs × $275 = $44,000
    └── RevenueLineItem: Tom Lee, 136 hrs × $150 = $20,400

Client discovers 16 of Jane's hours were double-counted.

Credit adjustment:
  ┌──────────────────────────────────────────────────────┐
  │  Revenue (Credit Note for Acme, Jan Adjustment)       │
  │    ├── status: "credit"                               │
  │    ├── reference_number: "CN-INV-2025-003"            │
  │    │                                                  │
  │    └── RevenueLineItem                                │
  │         ├── inventory_item_id: FK to Jane Smith        │
  │         ├── quantity: 16 (hours over-billed)           │
  │         ├── unit_price: $275                           │
  │         ├── total_price: -$4,400                       │
  │         └── line_item_type: "discount"                 │
  └──────────────────────────────────────────────────────┘

Jane's InventoryTransactions for those 16 hours:
  status: "billed" → "adjusted"

Updated Balance:
  Acme Corp owes: $64,400 - $4,400 = $60,000
```

**Key insight**: Credit adjustments use the same `RevenueLineItem` model with `line_item_type: "discount"` and a negative `total_price`, exactly like retail discounts. The corresponding `InventoryTransaction` records are marked `"adjusted"` to maintain the audit trail.
