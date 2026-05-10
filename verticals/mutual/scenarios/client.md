# Mutual — Client Scenarios

The `client` entity in a cooperative carries the **consumer-member's customer-side record**.
It links to the member's `User` via `user_id` and to the workspace via `workspace_id`.
When a member is also a worker or producer, they have BOTH a `Client` row (customer side)
and a `Staff` / `Supplier` row (worker/producer side) — all sharing the same `user_id`.

---

## Scenario 1: Consumer-Member Onboarding via ClientCategory Tier

Consumer co-ops often have multiple membership tiers (founding member, regular member,
supporter member). These are modeled as `ClientCategory` records.

### Setting up membership tiers as ClientCategory

```sql
-- Tier 1: Founding Member (early adopters, higher equity stake)
INSERT INTO client_category (
  id, name, description, workspace_id, active
) VALUES (
  'cc-founding', 'Founding Member',
  'Charter members with 500-share minimum; 2 votes on founding matters',
  'ws-grocoop', true
);

-- Tier 2: Regular Member
INSERT INTO client_category (
  id, name, description, workspace_id, active
) VALUES (
  'cc-regular', 'Regular Member',
  'Standard membership; 1 share minimum; full voting rights',
  'ws-grocoop', true
);

-- Tier 3: Supporter Member (non-voting, honorary)
INSERT INTO client_category (
  id, name, description, workspace_id, active
) VALUES (
  'cc-supporter', 'Supporter Member',
  'Associate membership; no voting rights; discounted access to services',
  'ws-grocoop', true
);
```

### Assigning a member to a tier via client_attribute

```sql
-- Client record for Alice (Regular Member)
INSERT INTO client (
  id, user_id, workspace_id,
  first_name, last_name, email_address,
  client_category_id, status, active
) VALUES (
  'cl-alice', 'u-alice', 'ws-grocoop',
  'Alice', 'Reyes', 'alice@grocoop.ph',
  'cc-regular',                       -- ClientCategory = Regular Member
  'active', true
);
```

---

## Scenario 2: Member Upgrade from Regular to Founding Tier

A regular member may be upgraded to founding tier if they purchase additional shares
within the co-op's founding period.

```sql
-- Record additional share purchase (EquityTransaction)
INSERT INTO equity_transaction (
  id, equity_account_id, transaction_type, amount, description, transaction_date
) VALUES (
  'et-alice-upgrade', 'ea-alice',
  1,                                -- CONTRIBUTION
  250000,                           -- Additional PHP 2,500 = 250 shares @ PHP 10 each
  'Founding member upgrade share purchase - M-00042',
  1704067200000
);

-- Upgrade client category
UPDATE client SET client_category_id = 'cc-founding'
WHERE id = 'cl-alice';
```

---

## Scenario 3: Nonmember Customer vs. Member Customer

Many cooperatives sell to non-members at a different (higher) price than members.
The `client.client_category_id` discriminates between the two price tiers.

```sql
-- Non-member (no WorkspaceUser row; no equity account; just a client record)
INSERT INTO client (
  id, workspace_id,
  first_name, last_name, email_address,
  client_category_id, status, active
) VALUES (
  'cl-nonmember-juan', 'ws-grocoop',
  'Juan', 'Dela Cruz', 'juan@example.com',
  'cc-nonmember',                     -- Non-member category
  'active', true
);
```

Revenue from `cl-nonmember-juan` is classified as **nonmember-sourced** — it is NOT
eligible for patronage allocation and is taxed as ordinary business income under
IRS Subchapter T rules (for US cooperatives) or the equivalent local regime.

---

## Scenario 4: ClientCategory Used for Member Patronage Class

For agricultural producer co-ops, members may belong to different production classes
(grain producers, dairy producers, livestock producers). `ClientCategory` models these.

```sql
-- Three producer classes (Scenario: Central Luzon Farmers Co-op)
INSERT INTO client_category (id, name, workspace_id) VALUES
  ('cc-grain', 'Grain Producer-Member', 'ws-clfco'),
  ('cc-dairy', 'Dairy Producer-Member', 'ws-clfco'),
  ('cc-live', 'Livestock Producer-Member', 'ws-clfco');
```

Patronage is then calculated separately per class (grain members by grain volume delivered,
dairy by liters, livestock by head weight), each using a different `patronage_basis` on
their `EquityAccount`.
