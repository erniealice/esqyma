# Retail Scenarios: Inventory

Inventory scenarios cover stock management operations including receiving, transfers, adjustments, and serialized item tracking across stores and warehouses.

---

## Receiving New Stock from Supplier

```
Delivery truck arrives          ┌──────────┐
at Warehouse #3 (NJ) ────────▶ │ pending  │ InventoryTransaction created
                                └────┬─────┘   transaction_type: "receiving"
                                     │         reference_type: "purchase_order"
                                     │         reference_id: "PO-2025-789"
                                     │         quantity: 200
                                     ▼
                                ┌──────────┐
Staff counts & scans ─────────▶│completed │ quantity_on_hand += 200
                                └──────────┘

 InventoryItem "Sony WH-1000XM5 - Black" at Warehouse #3:
  Before: quantity_on_hand = 12
  After:  quantity_on_hand = 212
```

---

## Inter-Store Transfer

```
Store #1 (NYC) has excess      ┌───────────┐
stock, Store #2 (LA) low ────▶ │ transfer  │ InventoryTransaction
                               └─────┬─────┘   from_location_id: Store #1
                                     │         to_location_id: Store #2
                                     │         quantity: 20
                                     │         performed_by: "stock-clerk-5"
                                     ▼
                Store #1 InventoryItem: quantity_on_hand -= 20
                Store #2 InventoryItem: quantity_on_hand += 20

No RevenueLineItem — transfers are internal movements, not sales.
```

---

## Cycle Count Adjustment (Shrinkage)

```
Annual stock count at          ┌────────────┐
Store #1 finds 3 missing ───▶ │ adjustment │ InventoryTransaction
                               └──────┬─────┘   transaction_type: "shrinkage"
                                      │         quantity: -3
                                      │         notes: "Annual cycle count
                                      │                 variance - Section B4"
                                      ▼
                  ┌──────────────────────────────────┐
                  │ inventory_depreciation            │
                  │ 3 × $299.99 = $899.97 write-down │
                  └──────────────────────────────────┘

No RevenueLineItem — shrinkage is never revenue.
quantity_on_hand adjusted: 45 → 42
```

---

## Serialized Item Tracking

```
InventoryItem: "MacBook Pro 16-inch M4" at Store #1
  ├── item_type: "serialized"
  ├── quantity_on_hand: 8
  └── Each unit has an inventory_serial record:
       ├── serial_number: "FVFG20250001"
       ├── serial_number: "FVFG20250002"
       ├── ...
       └── serial_number: "FVFG20250008"

On sale:
  InventoryTransaction
    ├── serial_number: "FVFG20250003" ← specific unit sold
    └── status: "completed"
  RevenueLineItem
    ├── inventory_item_id: FK to "MacBook Pro at Store #1"
    └── inventory_serial_id: FK to serial "FVFG20250003"

On warranty return:
  New InventoryTransaction
    ├── serial_number: "FVFG20250003" ← same serial traced
    └── status: "return_received"
```

**Key insight**: `inventory_serial` provides full chain-of-custody for high-value items — from receiving through sale to warranty return, all linked by the same serial number.
