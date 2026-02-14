# Medical Aesthetics Scenarios: Inventory (Clinical Supplies)

Inventory scenarios cover the lifecycle of clinical supplies — from receiving shipments through treatment consumption to expiration write-offs. Every injectable must be lot-tracked for patient safety and regulatory compliance.

---

## Receiving a Botox Shipment

The Beverly Hills clinic receives its monthly Allergan order: 20 vials of Botox (100 units each) and 30 syringes of Juvederm Ultra.

```
FedEx delivery arrives at clinic
  │
  ▼
  ┌──────────────────────────────────────────────────────┐
  │  InventoryTransaction (receiving) — Botox             │
  │    ├── inventory_item_id: FK to "Botox 100-unit Vial" │
  │    ├── transaction_type: "receiving"                   │
  │    ├── quantity: 20 (vials)                            │
  │    ├── reference_type: "purchase_order"                │
  │    ├── reference_id: "PO-2025-ALG-0043"                │
  │    ├── performed_by: "ADMIN-JESSICA-001"               │
  │    └── status: "completed"                             │
  └──────────────────────────────────────────────────────┘

For each vial, an inventory_serial record is created:
  ├── serial_number: "ALG-LOT-2025-0847" (vials 1-10)
  ├── serial_number: "ALG-LOT-2025-0848" (vials 11-20)
  └── Each record tracks:
       ├── lot_number (from manufacturer)
       ├── expiration_date: "2026-06-30"
       ├── received_date: "2025-01-10"
       └── status: "in_stock"

InventoryItem "Botox 100-unit Vial" at Beverly Hills:
  Before: quantity_on_hand = 4 vials (400 units)
  After:  quantity_on_hand = 24 vials (2,400 units)

Same process for Juvederm syringes:
  ├── 30 syringes received, each with individual serial/lot
  └── quantity_on_hand: 8 → 38 syringes
```

**Key insight**: Unlike retail where serial tracking is optional, every injectable vial and syringe gets an `inventory_serial` record because lot numbers must be recorded in patient charts. If Allergan ever issues a recall on lot ALG-2025-0847, the clinic can instantly trace which patients received product from that lot.

---

## Botox Vial Consumption Across Multiple Patients

A single 100-unit Botox vial serves multiple patients throughout the day. Once reconstituted (mixed with saline), the clock starts — the vial must be used within 24 hours.

```
8:30 AM — Vial "ALG-LOT-2025-0847" reconstituted by Dr. Kim
  │
  ├── 9:00 AM — Patient A (Sarah Chen): 40 units
  │    InventoryTransaction:
  │      ├── serial_number: "ALG-LOT-2025-0847"
  │      ├── quantity: 40
  │      ├── reference_id: "APT-2025-1847" (Sarah's appt)
  │      ├── performed_by: "DR-KIM-001"
  │      └── status: "consumed" → "completed" (at checkout)
  │
  │    Vial remaining: 60 units
  │
  ├── 10:30 AM — Patient B (Mike Torres): 25 units
  │    InventoryTransaction:
  │      ├── serial_number: "ALG-LOT-2025-0847" (same vial)
  │      ├── quantity: 25
  │      ├── reference_id: "APT-2025-1848" (Mike's appt)
  │      └── status: "consumed" → "completed"
  │
  │    Vial remaining: 35 units
  │
  ├── 2:00 PM — Patient C (Lisa Park): 35 units
  │    InventoryTransaction:
  │      ├── serial_number: "ALG-LOT-2025-0847" (same vial)
  │      ├── quantity: 35
  │      ├── reference_id: "APT-2025-1852" (Lisa's appt)
  │      └── status: "consumed" → "completed"
  │
  │    Vial remaining: 0 units — VIAL FULLY CONSUMED
  │
  └── inventory_serial "ALG-LOT-2025-0847"
       └── status: "depleted"

InventoryItem "Botox 100-unit Vial" at Beverly Hills:
  quantity_on_hand: 24 → 23 vials
```

**Key insight**: Multiple `InventoryTransactions` can reference the same `inventory_serial` (lot-tracked vial) as it's consumed across patients. The sum of all consumption transactions against a vial should equal its total capacity (100 units). This is how the clinic detects shrinkage — if the math doesn't add up, product may be wasted or diverted.

---

## Expired Product Write-Off

The Santa Monica satellite clinic finds 3 Juvederm syringes that expired last month — they were pushed to the back of the refrigerator behind newer stock.

```
Quarterly inventory audit at Santa Monica:
  │
  ├── inventory_serial "JUV-LOT-2024-0612": expired 2024-12-31
  ├── inventory_serial "JUV-LOT-2024-0613": expired 2024-12-31
  └── inventory_serial "JUV-LOT-2024-0614": expired 2024-12-31
  │
  ▼
  ┌──────────────────────────────────────────────────────┐
  │  InventoryTransaction (write-off)                     │
  │    ├── inventory_item_id: FK to "Juvederm Ultra"      │
  │    ├── transaction_type: "adjustment"                  │
  │    ├── quantity: -3 (syringes)                         │
  │    ├── notes: "Expired — FIFO failure, found behind    │
  │    │          newer stock during quarterly audit"       │
  │    └── status: "expired"                               │
  └──────────────────────────────────────────────────────┘
        │
        ▼
  ┌──────────────────────────────────────────────────────┐
  │  inventory_depreciation                               │
  │    ├── 3 syringes × $350 wholesale cost = $1,050      │
  │    ├── reason: "expired_product"                       │
  │    └── notes: "FIFO storage SOP updated, shelf        │
  │               rotation labels added"                   │
  └──────────────────────────────────────────────────────┘

No RevenueLineItem — expired product generates zero revenue.

InventoryItem "Juvederm Ultra" at Santa Monica:
  quantity_on_hand: 12 → 9 syringes

Action items:
  ├── Storage SOP updated: FIFO shelf rotation enforced
  ├── Monthly expiration check added to workflow
  └── Reorder triggered: quantity_on_hand (9) approaching
      reorder_level (8)
```

**Key insight**: Expired product write-offs in medical aesthetics are analogous to retail shrinkage, but with higher per-unit cost ($350/syringe vs. $10 for a retail item) and regulatory implications. The clinic must document the disposal for compliance, and the `inventory_depreciation` record creates an audit trail.

---

## Inter-Clinic Emergency Transfer

The Beverly Hills clinic has a VIP patient booked for a Sculptra treatment, but they're out of stock. The Santa Monica clinic has 5 vials — an emergency transfer is arranged.

```
Beverly Hills clinic                Santa Monica clinic
  "Sculptra" qty: 0 (out of stock)   "Sculptra" qty: 5
        │
        ▼
  ┌──────────────────────────────────────────────────────┐
  │  InventoryTransaction (transfer)                      │
  │    ├── inventory_item_id: FK to "Sculptra Vial"       │
  │    ├── transaction_type: "transfer"                    │
  │    ├── from_location_id: FK to Santa Monica            │
  │    ├── to_location_id: FK to Beverly Hills             │
  │    ├── quantity: 2 (vials)                             │
  │    ├── serial_number: "SCL-LOT-2025-0091" (vial 1)    │
  │    ├── performed_by: "ADMIN-MARCUS-002"                │
  │    └── status: "completed"                             │
  └──────────────────────────────────────────────────────┘

After transfer:
  Beverly Hills: "Sculptra" quantity_on_hand: 0 → 2
  Santa Monica:  "Sculptra" quantity_on_hand: 5 → 3

Chain of custody preserved:
  └── Lot "SCL-LOT-2025-0091" now tracked at Beverly Hills
      (if used on a patient here, the lot # follows)

No RevenueLineItem — transfers are internal movements.
```

**Key insight**: `from_location_id` and `to_location_id` enable inter-clinic transfers while preserving lot-level chain of custody. The lot number stays with the product — if Sculptra lot SCL-2025-0091 is later used on a patient in Beverly Hills, the chart correctly traces the product back through Santa Monica to the original Allergan shipment.
