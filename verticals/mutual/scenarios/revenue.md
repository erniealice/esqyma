# Mutual — Revenue Scenarios

Revenue classification is critical for cooperatives because of the **member-sourced /
nonmember-sourced distinction** under cooperative tax law (IRS Subchapter T in the US;
equivalent regimes in PH, Canada, EU).

**Member-sourced revenue** (revenue from transactions with members) is eligible for
patronage deduction and may be taxed at a lower or zero effective rate depending on
bylaw compliance. **Nonmember-sourced revenue** is taxed as ordinary business income.

This distinction is captured via `revenue_category`.

---

## Scenario 1: Consumer Co-op Revenue Classification

**Context**: Sunrise Grocery Co-operative. One week of sales.

### Revenue categories

```sql
-- Member-sourced revenue category (eligible for patronage deduction)
INSERT INTO revenue_category (
  id, name, description, workspace_id, active
) VALUES (
  'rc-member-sourced', 'Member-Sourced Revenue',
  'Revenue from transactions with co-op members. '
  'Eligible for patronage deduction under IRS Sub-T / equivalent local regime.',
  'ws-grocoop', true
);

-- Nonmember-sourced revenue category
INSERT INTO revenue_category (
  id, name, description, workspace_id, active
) VALUES (
  'rc-nonmember-sourced', 'Nonmember-Sourced Revenue',
  'Revenue from transactions with non-members. '
  'Taxed as ordinary business income; NOT eligible for patronage deduction.',
  'ws-grocoop', true
);
```

### Member purchase revenue

```sql
-- Alice (consumer-member) buys PHP 1,200 of groceries
INSERT INTO revenue (
  id, name, workspace_id,
  client_id,
  revenue_category_id,
  subscription_id,
  amount,
  status, active
) VALUES (
  'rev-alice-w01', 'Alice Santos — Member Purchase (Week 1)', 'ws-grocoop',
  'cl-alice',
  'rc-member-sourced',    -- member-sourced: Alice is a member
  'sub-alice-regular',    -- Alice's regular membership subscription
  120000,                 -- PHP 1,200 (centavos)
  'active', true
);
```

### Nonmember purchase revenue

```sql
-- Juan (non-member) buys PHP 850 of groceries
INSERT INTO revenue (
  id, name, workspace_id,
  client_id,
  revenue_category_id,
  amount,
  status, active
) VALUES (
  'rev-juan-w01', 'Juan Dela Cruz — Nonmember Purchase (Week 1)', 'ws-grocoop',
  'cl-nonmember-juan',
  'rc-nonmember-sourced', -- nonmember-sourced: NOT eligible for patronage
  NULL,                   -- no subscription — nonmembers are not subscribed
  85000,                  -- PHP 850 (centavos)
  'active', true
);
```

### Year-end member-sourced totals per member (patronage base calculation)

```sql
-- Sum member-sourced revenue per client for the patronage period
SELECT
  c.id as client_id,
  wu.member_number,
  u.first_name || ' ' || u.last_name as member_name,
  SUM(r.amount) as total_member_purchases
FROM revenue r
JOIN client c ON c.id = r.client_id
JOIN "user" u ON u.id = c.user_id
JOIN workspace_user wu ON wu.user_id = u.id AND wu.workspace_id = r.workspace_id
WHERE r.workspace_id = 'ws-grocoop'
  AND r.revenue_category_id = 'rc-member-sourced'
  AND r.status = 'active'
  AND r.date_created BETWEEN <fy2025_start> AND <fy2025_end>
GROUP BY c.id, wu.member_number, u.first_name, u.last_name
ORDER BY total_member_purchases DESC;
```

---

## Scenario 2: Worker Co-op Revenue — Patronage by Hours Worked

**Context**: Makati Cleaners Cooperative. Revenue from cleaning contracts is
member-sourced when performed by worker-members.

```sql
-- Cleaning service revenue (job completed by worker-member Bob)
INSERT INTO revenue (
  id, name, workspace_id,
  client_id,
  revenue_category_id,
  amount, status, active
) VALUES (
  'rev-cleaning-001', 'Deep Cleaning — Makati CBD (Jan)', 'ws-makati-cleaners',
  'cl-client-corp-abc',
  'rc-member-sourced',    -- performed by worker-members = member-sourced
  300000,                 -- PHP 3,000 per session (centavos)
  'active', true
);
```

For worker co-ops, patronage is calculated on **hours worked**, not purchases:
```sql
-- Patronage base = total hours per worker-member from inventory_transaction
-- (See inventory.md Scenario 2 for the inventory_transaction approach)
```

---

## Scenario 3: Agricultural Co-op — Member vs. Nonmember Marketing Revenue

**Context**: Central Luzon Farmers Co-op. The co-op sells both member-produced
and non-member-sourced rice.

```sql
-- Member-sourced: Pedro's palay, marketed by the co-op (producer-member delivery)
INSERT INTO revenue (
  id, name, workspace_id,
  client_id,            -- the external buyer, NOT the producer-member
  revenue_category_id,
  amount, status, active
) VALUES (
  'rev-palay-pedro-sale', 'Palay Marketing — Pedro Reyes Lot', 'ws-clfco',
  'cl-nfa-buyer',         -- National Food Authority as buyer
  'rc-member-sourced',    -- palay was delivered by a producer-member
  330000,                 -- PHP 3,300 for 15 tons @ PHP 22/kg (centavos)
  'active', true
);

-- Nonmember-sourced: bought on the open market to fill order gap
INSERT INTO revenue (
  id, name, workspace_id,
  client_id,
  revenue_category_id,
  amount, status, active
) VALUES (
  'rev-palay-spot-sale', 'Palay Marketing — Spot Purchase Lot', 'ws-clfco',
  'cl-nfa-buyer',
  'rc-nonmember-sourced', -- bought on spot market = nonmember-sourced, fully taxable
  110000,
  'active', true
);
```

---

## Scenario 4: Cooperative Income Summary Report

```sql
-- Total member-sourced vs nonmember-sourced revenue for the fiscal year
SELECT
  rc.name as revenue_classification,
  COUNT(r.id) as transaction_count,
  SUM(r.amount) as total_amount_centavos,
  SUM(r.amount) / 100.0 as total_amount_php
FROM revenue r
JOIN revenue_category rc ON rc.id = r.revenue_category_id
WHERE r.workspace_id = 'ws-grocoop'
  AND r.status = 'active'
  AND r.date_created BETWEEN <fy2025_start> AND <fy2025_end>
GROUP BY rc.name;

-- Expected output:
-- revenue_classification   | count | total_centavos | total_php
-- Member-Sourced Revenue   | 4,231 | 87,450,000     | 874,500
-- Nonmember-Sourced Revenue|   187 |  3,120,000     |  31,200
```
