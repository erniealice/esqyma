# Leasing Inventory Scenarios

Leasing uses inventory at two levels: the **pool level** (`inventory_item` — how many of this asset class are available at this yard) and the **unit level** (`inventory_serial` — the specific physical unit with its serial number). The `asset` record carries the accounting view of the same physical unit.

---

## Scenario A: Asset Registration (Pool + Unit)

**Context:** The lessor purchases 5 Excavator XJ-9000 units for the North Depot. Each is registered in inventory and as an Asset.

### Pool Record

```
inventory_item
  id:              inv-pool-xcv-xj9000-north
  name:            "Excavator XJ-9000 Pool — North Depot"
  product_id:      prod-excavator-class
  product_variant_id: var-xj9000-model
  location_id:     loc-north-depot
  sku:             "POOL-XCV-XJ9000-N"
  unit_of_measure: "unit"
  item_type:       "serialized"    ← tracked per unit
  quantity_on_hand: 5
```

### Per-Unit Records (one of five shown)

```
inventory_serial
  id:              invs-xj9000-0471
  inventory_item_id: inv-pool-xcv-xj9000-north
  serial_number:   "EX-2024-0471"
  sku:             "XJ9000-EX-2024-0471"
  status:          "available"
  notes:           "Asset tag: AST-0471. Linked asset: ast-0471"

asset
  id:              ast-0471
  asset_number:    "AST-0471"
  name:            "Excavator XJ-9000 SN:EX-2024-0471"
  serial_number:   "EX-2024-0471"       ← natural key join to inventory_serial
  asset_type:      ASSET_TYPE_PROPERTY_PLANT_EQUIPMENT
  asset_category_id: cat-heavy-machinery
  location_id:     loc-north-depot
  acquisition_cost: 4200000000   (centavos = $42,000,000)
  useful_life_months: 120        (10 years)
  depreciation_method: STRAIGHT_LINE
  status:          ASSET_STATUS_IN_SERVICE
```

---

## Scenario B: Custody Chain — Out and Back

The complete custody trail for one lease cycle is visible in the `asset_transaction` table. No mutable state needed.

```
asset_transaction rows for asset ast-0471:

Row 1 — ACQUISITION (2024-03-01)
  transaction_type: ASSET_TRANSACTION_TYPE_ACQUISITION
  amount: 4200000000
  to_location_id: loc-north-depot

Row 2 — DEPRECIATION (2024-04-01, first monthly depreciation)
  transaction_type: ASSET_TRANSACTION_TYPE_DEPRECIATION
  amount: 35000000  (centavos = $350,000 / month straight-line)

... (periodic depreciation rows)

Row N — LEASE_OUT (2026-01-15)
  transaction_type: ASSET_TRANSACTION_TYPE_LEASE_OUT
  from_location_id: loc-north-depot
  to_location_id:   loc-lessee-site-a
  reference_number: LSE-2026-0047

... (depreciation continues during lease period)

Row M — LEASE_RETURN (2029-01-10)
  transaction_type: ASSET_TRANSACTION_TYPE_LEASE_RETURN
  from_location_id: loc-lessee-site-a
  to_location_id:   loc-north-depot-intake

Row M+1 — DAMAGE_FOUND (2029-01-10, inspection)
  transaction_type: ASSET_TRANSACTION_TYPE_DAMAGE_FOUND
  amount: 350000
  description: "Cracked boom arm section 3"

Row M+2 — MAINTENANCE (2029-02-15, refurbishment)
  transaction_type: ASSET_TRANSACTION_TYPE_MAINTENANCE
  amount: 285000
  is_capitalized: true
```

**Custody window query:**
```sql
-- How long was asset ast-0471 at Lessee Corp site?
SELECT
  lease_out.transaction_date AS custody_start,
  lease_return.transaction_date AS custody_end
FROM asset_transaction lease_out
JOIN asset_transaction lease_return
  ON lease_out.asset_id = lease_return.asset_id
  AND lease_out.reference_number = lease_return.reference_number
WHERE lease_out.transaction_type = 'ASSET_TRANSACTION_TYPE_LEASE_OUT'
  AND lease_return.transaction_type = 'ASSET_TRANSACTION_TYPE_LEASE_RETURN'
  AND lease_out.asset_id = 'ast-0471';
```

---

## Scenario C: Yard Transfer (Internal, Not LEASE_OUT)

**Context:** Before the lease starts, EX-2024-0471 is moved from North Depot to South Depot for pre-delivery preparation.

```
asset_transaction
  asset_id:         ast-0471
  transaction_type: ASSET_TRANSACTION_TYPE_TRANSFER    ← NOT LEASE_OUT
  from_location_id: loc-north-depot
  to_location_id:   loc-south-depot
  description:      "Pre-delivery staging for LSE-2026-0047"
```

This is why `LEASE_OUT` vs `TRANSFER` disambiguation matters — the audit log distinguishes customer-custody transfers from internal yard moves without inspecting location types.

---

## Scenario D: Fleet Availability Report

```
-- Units available at each yard (not currently on lease)
SELECT
  il.name AS yard,
  COUNT(DISTINCT it_out.asset_id) - COUNT(DISTINCT it_ret.asset_id) AS units_on_lease,
  ii.quantity_on_hand - (
    COUNT(DISTINCT it_out.asset_id) - COUNT(DISTINCT it_ret.asset_id)
  ) AS units_available
FROM inventory_item ii
JOIN location il ON il.id = ii.location_id
LEFT JOIN asset_transaction it_out
  ON it_out.transaction_type = 'ASSET_TRANSACTION_TYPE_LEASE_OUT'
LEFT JOIN asset_transaction it_ret
  ON it_ret.transaction_type = 'ASSET_TRANSACTION_TYPE_LEASE_RETURN'
  AND it_ret.reference_number = it_out.reference_number
  AND it_ret.asset_id = it_out.asset_id
GROUP BY il.id, il.name, ii.quantity_on_hand;
```
