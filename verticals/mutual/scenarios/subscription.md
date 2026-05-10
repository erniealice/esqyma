# Mutual — Subscription Scenarios

In a cooperative, a `subscription` represents a **member's active service relationship**
with the co-op — their ongoing membership arrangement, share package, or service plan.
The subscription links the member (`client_id`) to a plan (`plan_id`) and drives invoicing
for dues.

---

## Scenario 1: Consumer Co-op — Annual Membership Subscription

**Context**: Alice joins Sunrise Grocery Co-operative as a Regular Member.

```sql
INSERT INTO subscription (
  id, name, workspace_id,
  client_id,
  plan_id,
  status, active,
  start_date
) VALUES (
  'sub-alice-regular', 'Alice Santos — Regular Member', 'ws-grocoop',
  'cl-alice',
  'plan-regular',        -- Regular Member Plan
  'active', true,
  1704067200000          -- membership start date
);
```

### Annual dues invoice from subscription

Each year, the subscription auto-triggers an invoice for annual dues:

```sql
INSERT INTO invoice (
  id, name, workspace_id,
  client_id,
  subscription_id,
  amount, status, active
) VALUES (
  'inv-alice-dues-2025', 'Annual Membership Dues — Alice Santos (FY2025)', 'ws-grocoop',
  'cl-alice',
  'sub-alice-regular',
  50000,                 -- PHP 500 annual dues (centavos)
  'active', true
);
```

---

## Scenario 2: Credit Union — Savings Account Subscription

**Context**: Roberto joins Bulacan Cooperative Credit Union and opens a savings account.

```sql
INSERT INTO subscription (
  id, name, workspace_id,
  client_id,
  plan_id,
  status, active,
  start_date
) VALUES (
  'sub-roberto-savings', 'Roberto Tan — Basic Member Account', 'ws-bccu',
  'cl-roberto',
  'plan-cu-basic',
  'active', true,
  1704067200000
);
```

### Share capital within the subscription via balance

```sql
-- Running balance on the subscription tracks share capital accumulation
INSERT INTO balance (
  id, subscription_id, workspace_id,
  amount, active
) VALUES (
  'bal-roberto-shares', 'sub-roberto-savings', 'ws-bccu',
  500000,    -- PHP 5,000 initial share capital (centavos)
  true
);
```

---

## Scenario 3: Worker Co-op — Worker-Member Service Subscription

**Context**: In Makati Cleaners Cooperative, worker-members have a "service subscription"
that tracks their participation commitment (hours/week, eligible for patronage).

For a worker co-op, the `subscription.client_id` points to the `Client` row that was
created for the worker-member's customer-side record (see the multi-stakeholder identity
pattern in `operations.md` Scenario 4).

```sql
INSERT INTO subscription (
  id, name, workspace_id,
  client_id,
  plan_id,
  status, active,
  start_date
) VALUES (
  'sub-bob-ft-worker', 'Bob Martinez — Full-Time Worker Member', 'ws-makati-cleaners',
  'cl-bob',             -- Bob's client record (client_id for the membership subscription)
  'plan-ft-worker',     -- Full-Time Worker-Member Plan
  'active', true,
  1704067200000
);
```

---

## Scenario 4: Agricultural Producer Co-op — Season Delivery Subscription

**Context**: Pedro commits to deliver palay to Central Luzon Farmers Co-op for the
2025 dry season.

```sql
INSERT INTO subscription (
  id, name, workspace_id,
  client_id,
  plan_id,
  status, active,
  start_date,
  end_date
) VALUES (
  'sub-pedro-season-2025', 'Pedro Reyes — 2025 Dry Season Contract', 'ws-clfco',
  'cl-pedro',
  'plan-producer-season',
  'active', true,
  1740960000000,    -- 2025-03-03 start of dry season
  1751328000000     -- 2025-07-01 end of season
);
```

---

## Scenario 5: Membership Subscription Suspension and Reinstatement

When a member is suspended (e.g., for unpaid dues), the subscription is also suspended.
This aligns with `workspace_user.member_status = 'suspended'`.

```sql
-- Suspend Alice's membership subscription due to unpaid dues
UPDATE subscription SET status = 'suspended'
WHERE id = 'sub-alice-regular';

-- Simultaneously update the WorkspaceUser member_status
UPDATE workspace_user SET member_status = 'suspended'
WHERE id = 'wu-alice';

-- On reinstatement (after dues are paid):
UPDATE subscription SET status = 'active'
WHERE id = 'sub-alice-regular';

UPDATE workspace_user SET member_status = 'active'
WHERE id = 'wu-alice';
```

### Key invariant

`workspace_user.member_status` is the **legal membership status** (controls voting eligibility,
governance participation, patronage eligibility).

`subscription.status` is the **service relationship status** (controls service access,
invoicing, balance).

The two are correlated but independent: a suspended member may still retain their equity
account and historical patronage records — only active service delivery is paused.
