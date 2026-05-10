# Mutual — Inventory Scenarios

In a cooperative, inventory has two distinct uses:

1. **Co-op-owned goods inventory** (consumer co-ops, multi-purpose co-ops): standard
   stocked goods managed via `inventory_item` and `inventory_transaction`.
2. **Worker-members as serialized resources** (worker co-ops): member-workers are
   tracked as `inventory_item` records with `tracking_mode = "serialized"` to enable
   capacity planning and patronage-hours tracking.

---

## Scenario 1: Consumer Co-op — Goods Inventory

**Context**: Sunrise Grocery Co-operative manages its inventory of member-owned goods.

### Setting up inventory items for co-op-sourced products

```sql
-- Organic rice (bulk, measured in kilograms)
INSERT INTO inventory_item (
  id, name, workspace_id,
  product_id,
  tracking_mode,
  quantity, unit, unit_cost,
  active
) VALUES (
  'inv-organic-rice', 'Organic Rice', 'ws-grocoop',
  'prod-organic-rice',
  'bulk',            -- bulk tracking: track by quantity, not serial number
  10000,             -- 10,000 kg on hand
  'kg',
  3000,              -- PHP 30.00 per kg = 3,000 centavos
  true
);
```

### Recording a member purchase as inventory movement

```sql
-- Alice (consumer-member) buys 5 kg of organic rice
INSERT INTO inventory_transaction (
  id, inventory_item_id, workspace_id,
  transaction_type,
  quantity,
  reference_id,        -- FK to the revenue record (member purchase)
  transaction_date
) VALUES (
  'invt-alice-rice-001', 'inv-organic-rice', 'ws-grocoop',
  'ISSUE',             -- outbound to member
  5,
  'rev-alice-jan-001', -- the revenue record for Alice's purchase
  1704067200000
);
```

---

## Scenario 2: Worker Co-op — Member-Workers as Serialized Resources

**Context**: Makati Cleaners Cooperative, worker co-op with 18 worker-members.
For patronage calculation, each member's hours worked must be tracked precisely.

### Creating inventory items for worker-members

```sql
-- Each worker-member gets an inventory_item row (serialized = one unit per member)
INSERT INTO inventory_item (
  id, name, workspace_id,
  product_id,
  tracking_mode,
  quantity, unit, unit_cost,
  active
) VALUES (
  'inv-worker-bob', 'Bob Martinez — Worker-Member', 'ws-makati-cleaners',
  'prod-cleaning-labor',   -- the labor product used for activity billing
  'serialized',            -- serialized: one item per person for capacity tracking
  1,                       -- represents one worker
  'worker',
  50000,                   -- PHP 500/hour internal cost rate = 50,000 centavos
  true
);
```

### Recording hours worked as inventory transactions (toward patronage)

For a worker co-op, hours worked per period are the **patronage basis** (`HOURS`).
Each shift is an `inventory_transaction` of kind `PRODUCTION` (hours produced).

```sql
-- Bob works 8 hours on Monday
INSERT INTO inventory_transaction (
  id, inventory_item_id, workspace_id,
  transaction_type,
  quantity,
  reference_id,        -- FK to the job_activity record
  transaction_date
) VALUES (
  'invt-bob-mon-001', 'inv-worker-bob', 'ws-makati-cleaners',
  'PRODUCTION',        -- hours produced (toward patronage basis)
  8,                   -- 8 hours
  'ja-bob-mon-001',   -- job_activity record for this shift
  1704067200000
);
```

### Year-end patronage calculation for worker co-op

```sql
-- Total hours per worker-member for FY2025
SELECT
  wu.member_number,
  u.first_name || ' ' || u.last_name as member_name,
  SUM(it.quantity) as total_hours_fy2025
FROM inventory_transaction it
JOIN inventory_item ii ON ii.id = it.inventory_item_id
JOIN workspace_user wu ON /* linked via job_activity.staff_id → staff.user_id → workspace_user.user_id */
JOIN "user" u ON u.id = wu.user_id
WHERE it.workspace_id = 'ws-makati-cleaners'
  AND it.transaction_type = 'PRODUCTION'
  AND it.transaction_date BETWEEN <fy2025_start> AND <fy2025_end>
GROUP BY wu.member_number, u.first_name, u.last_name
ORDER BY total_hours_fy2025 DESC;
```

---

## Scenario 3: Agricultural Producer Co-op — Member Deliveries

**Context**: Central Luzon Farmers Co-op, rice producer members.
Patronage basis: `DELIVERIES` (tons of rice delivered to co-op warehouse).

```sql
-- Each delivery by a producer-member is an inventory receipt
INSERT INTO inventory_transaction (
  id, inventory_item_id, workspace_id,
  transaction_type,
  quantity,             -- tons delivered
  reference_id,         -- FK to the supplier_contract or purchase_order
  transaction_date
) VALUES (
  'invt-farmer-pedro-001', 'inv-palay-stock', 'ws-clfco',
  'RECEIPT',            -- inbound from producer-member
  15,                   -- 15 metric tons of palay
  'po-pedro-jan-001',
  1704067200000
);
```

For this co-op, the `equity_account.patronage_basis = 'DELIVERIES'` — year-end
patronage is proportional to total metric tons delivered, not purchases.
