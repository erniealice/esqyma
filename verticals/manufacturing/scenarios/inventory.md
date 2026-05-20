# Manufacturing Scenarios: Inventory (Material Master + Movements + Lots)

This file shows how the inventory domain serves manufacturing: a single material master across raw / WIP / FG / by-products / consumables, with `inventory_movement` rows recording every state change and `lot` (UJM Wave 2) carrying batch traceability.

> ⚠ **Legacy enum names cited.** Some movement / cost-flow enum values cited below carry pre-existing manufacturing-jargon names (e.g., `MOVEMENT_TYPE_SCRAP` — *sanctioned exception per C1*; `COST_FLOW_TYPE_WIP` — *grandfathered legacy*). See [`operations.md`](./operations.md) header note for the cleanup plan.

---

## Scenario 1: Material master across the five item categories

One `product` row per material; one `inventory_item` row per (product × location) tracking on-hand quantity.

```
collection "Raw Materials"
  └── product "Steel Sheet 0.8mm Grade A"
        ├── product_kind: stocked_good
        ├── tracking_mode: bulk
        ├── unit: "kg"
        ├── expected_cost: 12000  (₱120/kg in centavos — standard cost)
        ├── default_template_id: NULL  (raw, not made here)
        └── variant_mode: none
              │
              ├── inventory_item @ "Plant A — Raw Materials Warehouse"
              │     quantity_on_hand: 8200, reorder_level: 1500
              │
              └── inventory_item @ "Plant A — Production Line 1"
                    quantity_on_hand: 320 (line-side bin), reorder_level: 50

collection "Components"
  └── product "Bearing 6004ZZ"
        ├── tracking_mode: bulk
        └── unit: "piece"

collection "Sub-Assemblies"
  └── product "Motor Stator Sub-Assembly SC-104"
        ├── product_kind: stocked_good
        ├── tracking_mode: serialized
        ├── default_template_id: FK → "BOM-STATOR-MR3"  (made via this BOM)
        └── inventory_item @ "Plant A — WIP Staging Area"

collection "Finished Goods"
  └── product "Drill Motor DM-2200"
        ├── tracking_mode: serialized  (each unit gets an inventory_serial row)
        ├── variant_mode: configurable
        ├── expected_cost: 850000  (₱8,500/unit)
        ├── default_template_id: FK → "BOM-DM2200-rev5"
        └── inventory_item @ "Plant A — Finished Goods Warehouse"

collection "By-Products"
  └── product "Steel Sheet Drop Cuts"
        ├── tracking_mode: bulk
        ├── unit: "kg"
        └── expected_cost: 1500  (recovered value, ₱15/kg)

collection "MRO / Consumables"
  └── product "Cutting Oil Type-G"
        ├── product_kind: consumable
        └── unit: "litre"
```

---

## Scenario 2: Material movement sequence for one Production Order

A single 100-unit MO produces ~6 distinct movement types. Each is one `inventory_movement` row.

```
MO-DM2200-20260512-001 (planned_quantity=100)

T+0  receive raw materials (if just-in-time)
       InventoryMovement
         movement_type: MOVEMENT_TYPE_RECEIPT
         from: NULL  to: raw_warehouse
         product: Stator-Core SC-104  quantity: 100
         reference_type: "purchase_order"  reference_id: "PO-2026-04-30-014"

T+1  issue raw to production line
       InventoryMovement
         movement_type: MOVEMENT_TYPE_ISSUE
         from: raw_warehouse  to: line_1
         product: Stator-Core SC-104  quantity: 100
         job_id: MO-DM2200-20260512-001
         job_activity_id: ja-001  (the corresponding ActivityMaterial row)

T+1  same for copper wire, bearings
       (further ISSUE rows)

T+2  transfer WIP from line to assembly cell
       InventoryMovement
         movement_type: MOVEMENT_TYPE_TRANSFER
         from: line_1  to: assembly_cell_B
         product: Stator Sub-Assembly SC-104  quantity: 100

T+3  scrap 3 units detected at functional test
       InventoryMovement
         movement_type: MOVEMENT_TYPE_SCRAP
         from: line_1  to: disposition_bin
         product: Drill Motor DM-2200  quantity: 3
         job_id: MO-DM2200-20260512-001
         (no destination revenue path until scrap is sold)

T+3  complete 95 good units to FG
       InventoryMovement
         movement_type: MOVEMENT_TYPE_COMPLETION
         from: line_1  to: fg_warehouse
         product: Drill Motor DM-2200  quantity: 95
         job_id: MO-DM2200-20260512-001
         inventory_serial_id × 95 (serialized FG)

T+10  ship to customer
        InventoryMovement
          movement_type: MOVEMENT_TYPE_SELL
          from: fg_warehouse  to: NULL
          product: Drill Motor DM-2200  quantity: 95
          reference_type: "revenue"  reference_id: "rev-2026-05-22-101"
```

**MovementType enum coverage:** `ISSUE / COMPLETION / SCRAP / TRANSFER / ADJUSTMENT / RECEIPT / RETURN / SELL / EXPIRE` already covers all manufacturing flows. No new enum values are needed.

---

## Scenario 3: Lot-tracked raw consumption (W2)

A pharma-grade chemical line requires lot traceability. Each raw material lot carries its supplier + received-date + expiry; consumption against a Production Order pins to the specific lot.

```
product "API-Compound-X"
  tracking_mode: bulk (with lot)

Receiving event:
  Lot  (W2)
    ├── id: "lot-API-X-2026-04-15-A"
    ├── product_id: FK → API-Compound-X
    ├── supplier_id: FK → "Acme Chemicals"
    ├── received_date: 2026-04-15
    ├── manufacturer_lot: "ACME-X-2604-A"
    ├── expiry_date: 2027-04-15
    ├── coa_url: "blob://coa/ACME-X-2604-A.pdf"
    └── status: STATUS_AVAILABLE

  InventoryMovement
    movement_type: MOVEMENT_TYPE_RECEIPT
    product: API-Compound-X  quantity: 50 kg
    (lot_id linked via reference_type="lot", reference_id=lot-API-X-2026-04-15-A)

Consumption against MO-CAP-20260520-001:
  JobActivity (entry_type=MATERIAL, quantity=12 kg)
    ActivityMaterial: product=API-Compound-X, lot_id=lot-API-X-2026-04-15-A
    InventoryMovement: ISSUE from raw_qa_hold → mix_room
    Lot.consumed_quantity += 12  (or via the inventory_serial mechanism if API
                                  is treated as a serial-by-lot tracked good)

Recall path: a single query "select * from job_activity where activity_material
maps to lot-API-X-2026-04-15-A" gives the list of MOs that consumed this lot.
From there → join through job_output / inventory_movement(SELL) → list of
customer shipments.
```

---

## Scenario 4: WIP inventory between phases

WIP is **not a separate domain** — it is an `inventory_item` row at a WIP location. Movement between operations is a `MOVEMENT_TYPE_TRANSFER`.

```
Phase 1 (Stator Sub-Assembly) completes 100 stators

InventoryMovement
  movement_type: MOVEMENT_TYPE_TRANSFER
  from: line_1               (raw consumed)
  to:   stator_staging_buffer
  product: Stator Sub-Assembly SC-104
  quantity: 100
  job_id: MO-DM2200-20260512-001

inventory_item @ stator_staging_buffer
  product: Stator Sub-Assembly SC-104
  quantity_on_hand: 100 ← this IS the WIP

When Phase 2 begins:
InventoryMovement
  movement_type: MOVEMENT_TYPE_ISSUE
  from: stator_staging_buffer
  to:   assembly_cell_B
  product: Stator Sub-Assembly SC-104  quantity: 100
```

The accounting view of WIP (the WIP balance) is the sum of `job_cost_ledger_entry` (W4) rows for Jobs with `cost_flow_type=WIP` and `status` in {`RELEASED`, `ACTIVE`, `PAUSED`, `COMPLETED-not-yet-settled`}. The inventory view (count of WIP items on the floor) is `inventory_item.quantity_on_hand` at WIP-flagged locations.

These two views answer **different questions**:
- *How much money is tied up in WIP?* → cost-ledger query
- *What's physically in the buffer between operations?* → inventory_item query

Both must reconcile at month-end via `job_cost_snapshot` (W4).

---

## Scenario 5: Adjustments + cycle counts

A cycle count finds the system has 1240 bearings but the floor counts 1218. The 22-unit shortfall is an adjustment.

```
InventoryMovement
  movement_type: MOVEMENT_TYPE_ADJUSTMENT
  from: NULL  to: raw_warehouse
  product: Bearing-6004ZZ  quantity: -22  (negative = write-down)
  notes: "Cycle count 2026-05-10 — shortfall investigated, attributed to
          unrecorded scrap on MO-073"
  performed_by: "staff-warehouse-03"
  status: "approved"
```

Persistent adjustments flow through `inventory_depreciation` for obsolescence / NRV write-downs.

---

## Scenario 6: Inventory dashboard surfaces (current centymo)

The existing centymo `views/inventory/dashboard/page.go` and `views/inventory/movements/page.go` already render the inventory list, detail, and movement log. The manufacturing facade reuses them with lyngua label overrides:

| Existing centymo surface | Manufacturing label (manufacturing/operation.json or new manufacturing/inventory.json) |
|---|---|
| Inventory list | "Material Master Stock" |
| Inventory detail | "Material Position" |
| Inventory movements log | "Material Movements" |
| Serial form | "Lot-Tracked Unit" (when product.tracking_mode=serialized) |
| Transaction form | "Manual Movement" (used by warehouse staff for ad-hoc receipts/issues) |
| Depreciation form | "Obsolescence Write-Down" / "NRV Adjustment" |

The dashboard chart kinds (`ChartKind` in `dashboard/page.go`) already cover the views manufacturing needs: stock-position by location, top-N-by-value, movement-volume-over-time. A future enhancement is a **stratified view by `product.collection`** (Raw / WIP / FG / By-Product / MRO) for at-a-glance plant-floor reporting.

---

## Reorder + replenishment (no new entities)

Reorder is handled by `inventory_item.reorder_level` + `reorder_quantity` fields plus an MRP-like process that scans the planning horizon, sums committed Jobs' frozen `job_input_plan` consumption, compares to on-hand + open POs, and either creates a `supplier_subscription` cyclic order or a one-shot supplier-PO request. The full picture sits across centymo + esqyma supplier-subscription entities (see docs/wiki/articles/supplier-subscriptions.md).
