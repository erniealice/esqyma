# Laundry Services Scenarios: Inventory (Garments & Supplies)

Inventory scenarios cover the tracking of customer property through the processing pipeline, RFID lifecycle management, consumable supplies, and damage handling.

---

## Hotel Linen Lifecycle with RFID

The Grand Hotel uses the plant's RFID tracking system for its 3,000 king sheet sets. Every sheet has an RFID chip sewn into the hem, surviving 200+ wash cycles.

```
A single sheet's lifecycle:

  inventory_serial "RFID-KS-2025-00847"
    ├── First scanned: Jan 15, 2025 (received from supplier)
    ├── Assigned to: Grand Hotel
    ├── Wash count: 0

  Day 1: Sheet is on a bed in Room 412
    └── Location: Grand Hotel

  Day 2: Guest checks out, housekeeping strips the bed
    ┌──────────────────────────────────────────────────┐
    │  InventoryTransaction (pickup)                    │
    │    ├── serial_number: "RFID-KS-2025-00847"        │
    │    ├── transaction_type: "intake"                  │
    │    ├── from_location_id: FK to Grand Hotel         │
    │    ├── to_location_id: FK to Main Plant            │
    │    ├── quantity: 1                                  │
    │    ├── performed_by: "DRIVER-CARLOS-001"           │
    │    └── status: "received"                          │
    └──────────────────────────────────────────────────┘
         │
         ▼  RFID scanned at plant intake dock
    status: "received" → "sorted" → "in_process"
    (machine #12, heavy soil cycle, 160°F, 25 min)
         │
         ▼  RFID scanned at QC station
    status: "in_process" → "quality_check" → "completed"
         │
         ▼  RFID scanned loading onto delivery truck
    ┌──────────────────────────────────────────────────┐
    │  InventoryTransaction (delivery)                  │
    │    ├── serial_number: "RFID-KS-2025-00847"        │
    │    ├── transaction_type: "delivery"                │
    │    ├── from_location_id: FK to Main Plant          │
    │    ├── to_location_id: FK to Grand Hotel           │
    │    └── status: "delivered"                         │
    └──────────────────────────────────────────────────┘

  Day 3: Clean sheet back at Grand Hotel, placed in Room 508
    └── Location: Grand Hotel
    └── Wash count: 147 → 148

  ... repeat 200+ times ...

  Day N: Wash count reaches 200, fabric thinning detected
    ┌──────────────────────────────────────────────────┐
    │  inventory_depreciation                           │
    │    ├── serial_number: "RFID-KS-2025-00847"        │
    │    ├── reason: "end_of_life"                       │
    │    ├── wash_count: 203                             │
    │    └── replacement triggered                       │
    └──────────────────────────────────────────────────┘
    New sheet enters rotation: "RFID-KS-2025-03201"
```

**Key insight**: RFID transforms a generic "sheet" into a serialized asset with a full lifecycle. The `inventory_serial` tracks wash count and condition — when a sheet hits the replacement threshold (200 washes), the system triggers a replacement order. This is how commercial laundries achieve 98%+ accuracy vs. 85% with manual counting, and reduce linen loss by 30%.

---

## Residential Bag Processing

Emma's weekly bag arrives at the plant Monday afternoon. Unlike hotel linen (per-piece RFID tracking), residential orders are tracked by weight and processed as a batch.

```
Driver picks up Emma's bag at 8:15 AM
  │
  ▼
  ┌──────────────────────────────────────────────────────┐
  │  InventoryTransaction (intake)                        │
  │    ├── inventory_item_id: FK to "Residential Bag"     │
  │    ├── transaction_type: "intake"                      │
  │    ├── reference_type: "subscription"                  │
  │    ├── reference_id: "SUB-EMMA-001"                    │
  │    ├── from_location_id: null (customer home)          │
  │    ├── to_location_id: FK to Main Plant                │
  │    ├── quantity: 26 (lbs, weighed at plant)            │
  │    ├── performed_by: "DRIVER-CARLOS-001"               │
  │    └── status: "received"                              │
  └──────────────────────────────────────────────────────┘
        │
        ▼  At the plant
  ┌──────────────────────────────────────────────────────┐
  │  Processing steps (each updates status):              │
  │                                                       │
  │  1. "sorted" — separated by color and fabric          │
  │      ├── Whites: ~8 lbs                                │
  │      ├── Colors: ~12 lbs                               │
  │      └── Delicates: ~6 lbs (tagged for gentle cycle)   │
  │                                                       │
  │  2. "in_process" — three wash loads:                   │
  │      ├── Whites: machine #3, hot, with bleach          │
  │      ├── Colors: machine #7, warm                      │
  │      └── Delicates: machine #9, cold, gentle           │
  │                                                       │
  │  3. "quality_check" — spot check for remaining stains  │
  │      └── 1 shirt has persistent stain → set aside      │
  │          for re-treatment                               │
  │                                                       │
  │  4. "completed" — folded per Emma's preferences:       │
  │      └── metadata: {"fold_style": "marie_kondo",       │
  │                     "detergent": "hypoallergenic"}     │
  └──────────────────────────────────────────────────────┘
        │
        ▼  Wednesday delivery
  ┌──────────────────────────────────────────────────────┐
  │  InventoryTransaction (delivery)                      │
  │    ├── transaction_type: "delivery"                    │
  │    ├── from_location_id: FK to Main Plant              │
  │    ├── to_location_id: null (customer home)            │
  │    ├── status: "delivered"                             │
  │    └── performed_by: "DRIVER-CARLOS-001"               │
  └──────────────────────────────────────────────────────┘

Emma receives SMS: "Your laundry is at your doorstep! 🧺"
```

**Key insight**: Residential processing uses `item_type: "non_serialized"` — tracked by weight, not by individual garment. Customer preferences (fold style, detergent) are stored in `subscription.metadata` and applied to every batch. This is the laundry equivalent of a retail bulk inventory vs. serialized.

---

## Chemical Consumable Reorder

The plant is running low on industrial detergent. The inventory system triggers a reorder alert when stock hits the threshold.

```
InventoryItem "Ecolab ProClean Industrial Detergent 55-gal"
  ├── location_id: FK to Main Plant
  ├── item_type: "consumable"
  ├── unit_of_measure: "drums"
  ├── quantity_on_hand: 3 drums ← hit reorder_level
  ├── reorder_level: 3 drums
  └── notes: "Ecolab auto-dispenser, formula EC-440"

Alert triggered:
  "⚠️ Detergent stock at reorder level (3 drums).
   Current burn rate: 1.5 drums/week.
   Time to stockout: ~2 weeks.
   Recommended order: 8 drums."

InventoryTransaction (receiving) when order arrives:
  ├── transaction_type: "receiving"
  ├── quantity: 8 (drums)
  ├── reference_type: "purchase_order"
  ├── reference_id: "PO-2025-ECO-0012"
  └── status: "completed"

quantity_on_hand: 3 → 11 drums

Chemical consumption tracking:
  ├── Each wash cycle auto-dispenses measured amount
  ├── InventoryTransaction per day:
  │    ├── transaction_type: "consumption"
  │    ├── quantity: 0.2 (drums — approximated daily)
  │    └── reference_type: "batch" (linked to processing batches)
  └── Monthly cost: ~6 drums × $180/drum = $1,080
```

---

## Damaged Garment Claim

A hotel guest's silk blouse was accidentally processed through a standard hot wash instead of the delicate cycle, and it's ruined.

```
During QC inspection:
  Staff notices a silk blouse is damaged (shrunk, color faded)
  │
  ▼
  ┌──────────────────────────────────────────────────────┐
  │  InventoryTransaction (damage)                        │
  │    ├── transaction_type: "processing"                  │
  │    ├── quantity: 1                                     │
  │    ├── status: "damaged"                               │
  │    ├── notes: "Silk blouse processed in hot wash.      │
  │    │          Should have been flagged as delicate      │
  │    │          during sorting. Sorting SOP reviewed."    │
  │    └── performed_by: "OPERATOR-MIKE-004"               │
  └──────────────────────────────────────────────────────┘
        │
        ▼
  ┌──────────────────────────────────────────────────────┐
  │  inventory_depreciation (damage claim)                │
  │    ├── amount: $120.00 (customer-declared value)       │
  │    ├── reason: "processing_damage"                     │
  │    └── notes: "Claim approved, credit issued"          │
  └──────────────────────────────────────────────────────┘
        │
        ▼
  ┌──────────────────────────────────────────────────────┐
  │  RevenueLineItem (credit to customer)                 │
  │    ├── quantity: 1                                     │
  │    ├── total_price: -$120.00                           │
  │    ├── line_item_type: "discount"                      │
  │    └── description: "Damage claim — silk blouse"       │
  └──────────────────────────────────────────────────────┘

Customer notified:
  "We sincerely apologize — your silk blouse was damaged during
   processing. A $120 credit has been applied to your account."

Corrective action:
  ├── Sorting SOP updated: fabric content labels must be checked
  ├── Delicate flagging added to workflow stage 2 (sorting)
  └── Operator retraining scheduled
```

**Key insight**: Damage claims create both an `inventory_depreciation` (the cost of the mistake) and a negative `RevenueLineItem` (the credit to the customer). This is the laundry equivalent of a retail return — but the item was never sold, it was damaged during service. The `"discount"` line item type handles credits identically to retail refunds and professional services credit notes.
