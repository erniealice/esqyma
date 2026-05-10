# Mutual — Plan and Membership Tier Scenarios

In a cooperative, a `plan` represents a **membership tier** or **service package** available
to members. Plans define the dues structure, service entitlements, and subscription terms for
the different classes of membership.

---

## Scenario 1: Consumer Co-op Membership Tiers

**Context**: Sunrise Grocery Co-operative with 3 membership plans.

### Plan setup

```sql
-- Plan 1: Founding Member Plan
INSERT INTO plan (
  id, name, description, workspace_id,
  active, status
) VALUES (
  'plan-founding', 'Founding Member Plan',
  'Charter membership for co-op founders. Requires 500-share minimum equity. '
  'Full voting rights. Eligibility for board nomination.',
  'ws-grocoop', true, 'active'
);

-- Plan 2: Regular Member Plan
INSERT INTO plan (
  id, name, description, workspace_id,
  active, status
) VALUES (
  'plan-regular', 'Regular Member Plan',
  'Standard membership. Requires 1-share minimum. '
  'Full voting rights. Eligible for patronage dividends.',
  'ws-grocoop', true, 'active'
);

-- Plan 3: Supporter Member Plan
INSERT INTO plan (
  id, name, description, workspace_id,
  active, status
) VALUES (
  'plan-supporter', 'Supporter Member Plan',
  'Non-voting associate membership for community supporters. '
  'Access to member prices; no equity stake; no patronage dividend.',
  'ws-grocoop', true, 'active'
);
```

### Price plans for annual dues

```sql
-- Annual dues for Regular Member
INSERT INTO price_plan (
  id, name, plan_id,
  amount, billing_kind, duration, duration_unit,
  workspace_id, active
) VALUES (
  'pp-regular-annual', 'Regular Member — Annual Dues',
  'plan-regular',
  50000,                    -- PHP 500 annual membership dues (centavos)
  'BILLING_KIND_RECURRING',
  1, 'year',
  'ws-grocoop', true
);

-- Annual dues for Supporter Member
INSERT INTO price_plan (
  id, name, plan_id,
  amount, billing_kind, duration, duration_unit,
  workspace_id, active
) VALUES (
  'pp-supporter-annual', 'Supporter Member — Annual Dues',
  'plan-supporter',
  20000,                    -- PHP 200 annual dues (centavos)
  'BILLING_KIND_RECURRING',
  1, 'year',
  'ws-grocoop', true
);
```

---

## Scenario 2: Credit Union Membership Plans

**Context**: Bulacan Cooperative Credit Union with tiered account packages.

```sql
-- Basic Member Plan (savings account + small loan access)
INSERT INTO plan (
  id, name, workspace_id, active
) VALUES (
  'plan-cu-basic', 'Basic Member Account', 'ws-bccu', true
);

-- Premium Member Plan (savings + time deposits + larger loans + board eligibility)
INSERT INTO plan (
  id, name, workspace_id, active
) VALUES (
  'plan-cu-premium', 'Premium Member Account', 'ws-bccu', true
);
```

### License-based entitlements within the plan

```sql
-- Loan entitlement for Basic Member
INSERT INTO license (
  id, subscription_id, plan_id,
  description, quantity, used_quantity,
  workspace_id, active
) VALUES (
  'lic-basic-loan', 'sub-member-a-basic', 'plan-cu-basic',
  'Maximum loan entitlement',
  300000,          -- PHP 3,000 max loan (centavos) — encoded as quantity
  0,
  'ws-bccu', true
);
```

---

## Scenario 3: Worker Co-op Service Plans

**Context**: Makati Cleaners Cooperative — service plans for member-worker shift scheduling.

```sql
-- Full-Time Worker-Member Plan (minimum 20 hours/week commitment)
INSERT INTO plan (
  id, name, description, workspace_id, active
) VALUES (
  'plan-ft-worker', 'Full-Time Worker-Member',
  'Minimum 20 hours/week commitment. Full voting rights. '
  'Patronage calculated on actual hours worked.',
  'ws-makati-cleaners', true
);

-- Part-Time Worker-Member Plan (minimum 10 hours/week)
INSERT INTO plan (
  id, name, description, workspace_id, active
) VALUES (
  'plan-pt-worker', 'Part-Time Worker-Member',
  'Minimum 10 hours/week commitment. Full voting rights. '
  'Patronage calculated proportionally on hours worked.',
  'ws-makati-cleaners', true
);
```

---

## Scenario 4: Agricultural Producer Co-op Season Plans

**Context**: Central Luzon Farmers Co-op, annual production delivery contracts.

```sql
-- Producer-Member Season Plan (commitment to deliver minimum volume)
INSERT INTO plan (
  id, name, workspace_id, active
) VALUES (
  'plan-producer-season', 'Producer-Member Season Contract',
  'ws-clfco', true
);

-- Price plan: minimum delivery commitment + marketing service fee
INSERT INTO price_plan (
  id, name, plan_id,
  amount, billing_kind, duration, duration_unit,
  workspace_id, active
) VALUES (
  'pp-producer-season', 'Season Contract — Marketing Service Fee',
  'plan-producer-season',
  150000,               -- PHP 1,500 annual marketing service fee (centavos)
  'BILLING_KIND_RECURRING',
  1, 'year',
  'ws-clfco', true
);
```
