# Mutual — Operations Scenarios

This is the headline scenario file for the Mutual vertical. It covers the 5 core
operations that distinguish a mutual/cooperative from other business types.

---

## Scenario 1: Consumer Co-op Patronage Cycle

**Context**: Sunrise Grocery Co-operative, FY2025 close. 500 consumer-members.
Distributable surplus: PHP 2,500,000 (250,000,000 centavos).
Total member purchases during FY2025: PHP 25,000,000 (2,500,000,000 centavos).
Board resolution: retain 40%, distribute 60% cash.

### Step 1 — Calculate patronage base per member

For each active member, sum all `revenue.amount` where:
- `revenue.client_id = client.id` AND `client.user_id = workspace_user.user_id`
- `fiscal_period` covers FY2025

```
Member M-00001 (Alice): PHP 180,000 purchases → 18% of total → PHP 450,000 patronage allocation
  retained (40%): PHP 180,000 → EquityTransaction(PATRONAGE_RETENTION) = 18,000,000 centavos
  distributed (60%): PHP 270,000 → EquityTransaction(PATRONAGE_DISTRIBUTION) = 27,000,000 centavos
```

### Step 2 — Record retention per member

```sql
-- For each member, create EquityTransaction rows
-- workspace_user: wu-alice (member_number=M-00001, member_status=active)
-- equity_account: ea-alice (workspace_user_id=wu-alice, patronage_basis=PURCHASES)

INSERT INTO equity_transaction (
  id, equity_account_id, transaction_type, amount, description, transaction_date
) VALUES (
  'et-alice-retention-2025',
  'ea-alice',
  5,                               -- EQUITY_TRANSACTION_TYPE_PATRONAGE_RETENTION
  18000000,                        -- PHP 180,000 in centavos
  'FY2025 patronage retention - M-00001',
  1767225600000                    -- 2025-12-31 epoch ms
);
```

### Step 3 — Record distribution per member

```sql
INSERT INTO equity_transaction (
  id, equity_account_id, transaction_type, amount, description, transaction_date
) VALUES (
  'et-alice-distribution-2025',
  'ea-alice',
  6,                               -- EQUITY_TRANSACTION_TYPE_PATRONAGE_DISTRIBUTION
  27000000,                        -- PHP 270,000 in centavos
  'FY2025 patronage cash dividend - M-00001',
  1767225600000
);
```

### Step 4 — Cash payout

The `PATRONAGE_DISTRIBUTION` triggers a `treasury.disbursement` or a credit to the
member's `subscription.balance` — depending on bylaws. The equity account balance
increases by the retained amount only.

---

## Scenario 2: Worker Co-op General Assembly and Governance Vote

**Context**: Makati Cleaners Cooperative, annual general assembly for bylaw amendment.
Motion: "Amend Article 5 — increase maximum board term from 2 years to 3 years."
18 worker-members eligible to vote. 15 attended.

### Step 1 — Create the governance vote event

```sql
INSERT INTO event (
  id, name, description, workspace_id, organizer_id,
  start_date_time_utc, end_date_time_utc, timezone,
  status, kind
) VALUES (
  'ev-aga-2025-bylaws',
  '2025 Annual General Assembly — Bylaw Amendment Vote',
  'Motion: Amend Article 5 board term limit from 2 years to 3 years',
  'ws-makati-cleaners',
  'wu-secretary',                           -- WorkspaceUser of the co-op secretary
  1767225600000,                            -- 2025-12-31 09:00 UTC
  1767236400000,                            -- 2025-12-31 12:00 UTC
  'Asia/Manila',
  'EVENT_STATUS_CONFIRMED',
  'EVENT_KIND_GOVERNANCE_VOTE'              -- NEW: governance vote kind
);
```

### Step 2 — Register attendees with vote eligibility pre-check

```sql
-- Worker-member wu-bob: eligible (paid up, member_status=active, member_since < 6 months ago)
INSERT INTO event_attendee (
  id, event_id, workspace_user_id, workspace_id,
  role, status, is_organizer,
  eligible_to_vote, vote_weight
) VALUES (
  'ea-aga-bob',
  'ev-aga-2025-bylaws',
  'wu-bob',
  'ws-makati-cleaners',
  'ATTENDEE_ROLE_REQUIRED',
  'ATTENDEE_STATUS_ACCEPTED',
  false,
  true,                                     -- NEW: eligible to vote (pre-check passed)
  1                                         -- NEW: one-member-one-vote
);
```

### Step 3 — Record votes as they are cast

```sql
-- Bob votes YES
UPDATE event_attendee SET
  vote_choice = 'yes',                      -- NEW
  vote_cast_at = 1767228000000              -- NEW: cast at 09:40 UTC
WHERE id = 'ea-aga-bob';
```

### Step 4 — Tally

```sql
SELECT
  vote_choice,
  COUNT(*) FILTER (WHERE eligible_to_vote = true) as eligible_votes,
  SUM(vote_weight) FILTER (WHERE eligible_to_vote = true) as weighted_votes
FROM event_attendee
WHERE event_id = 'ev-aga-2025-bylaws'
GROUP BY vote_choice;

-- Result:
-- vote_choice | eligible_votes | weighted_votes
-- yes         | 11             | 11
-- no          | 3              | 3
-- abstain     | 1              | 1
-- NULL        | 0              | 0   ← 3 absent members not yet recorded
```

With 15 votes cast, 11 yes vs 3 no vs 1 abstain, the motion passes (>50% of votes cast
and >50% of total eligible membership quorum met per bylaws).

---

## Scenario 3: New Member Onboarding

**Context**: Maria applies to join Sunrise Grocery Co-operative as a consumer-member.

### Step 1 — Create User (authentication identity)

```sql
INSERT INTO "user" (
  id, email_address, first_name, last_name, active
) VALUES (
  'u-maria', 'maria@example.com', 'Maria', 'Santos', true
);
```

### Step 2 — Create WorkspaceUser with applicant status

```sql
INSERT INTO workspace_user (
  id, workspace_id, user_id, active,
  member_number, member_status, member_since
) VALUES (
  'wu-maria',
  'ws-grocoop',
  'u-maria',
  true,
  'M-00501',                        -- NEW: assigned applicant number
  'applicant',                      -- NEW: initial status
  NULL                              -- NEW: member_since NULL until admission approved
);
```

### Step 3 — Create Client record (consumer-member customer side)

```sql
INSERT INTO client (
  id, user_id, workspace_id,
  first_name, last_name, email_address,
  status, active
) VALUES (
  'cl-maria', 'u-maria', 'ws-grocoop',
  'Maria', 'Santos', 'maria@example.com',
  'active', true
);
```

### Step 4 — Assign consumer-member role

```sql
INSERT INTO workspace_user_role (
  id, workspace_user_id, role_id, active
) VALUES (
  'wur-maria-consumer', 'wu-maria', 'role-consumer-member', true
);
```

### Step 5 — Board approves application and member pays share capital

```sql
-- Approve: update member status and admission date
UPDATE workspace_user SET
  member_status = 'active',
  member_since = 1735689600000    -- admission date epoch ms
WHERE id = 'wu-maria';

-- Create equity account for the member
INSERT INTO equity_account (
  id, name, account_type, owner_name,
  account_id, balance, active,
  workspace_user_id, patronage_basis        -- NEW fields
) VALUES (
  'ea-maria', 'Maria Santos — Member Equity', 'EQUITY_ACCOUNT_TYPE_OWNERS_CAPITAL',
  'Maria Santos',
  'acct-member-equity',                     -- FK to Chart of Accounts
  0, true,
  'wu-maria',                               -- NEW: FK to workspace_user
  'PURCHASES'                               -- NEW: patronage basis
);

-- Record share capital contribution
INSERT INTO equity_transaction (
  id, equity_account_id, transaction_type, amount, description, transaction_date
) VALUES (
  'et-maria-share', 'ea-maria',
  1,                                        -- EQUITY_TRANSACTION_TYPE_CONTRIBUTION
  500000,                                   -- PHP 5,000 membership share in centavos
  'Share capital contribution - M-00501',
  1735689600000
);
```

### Step 6 — Job for member onboarding (optional for co-ops with formal onboarding)

```sql
INSERT INTO job (
  id, name, client_id, workspace_id, status
) VALUES (
  'job-onboard-maria',
  'New Member Onboarding — M-00501 Maria Santos',
  'cl-maria',                               -- consumer-member's client record
  'ws-grocoop',
  'active'
);
```

---

## Scenario 4: Multi-Stakeholder Co-op Identity

**Context**: Solidarity Cooperative — a multi-stakeholder co-op where members can be
consumers (buy goods), workers (work shifts), or producers (supply goods). Carlos is
all three: he shops at the co-op, works three shifts a week, and supplies artisan bread.

### Entity chain for Carlos

```sql
-- 1. Authentication identity (one User row)
INSERT INTO "user" (id, email_address, first_name, last_name)
VALUES ('u-carlos', 'carlos@solidaridad.coop', 'Carlos', 'Reyes');

-- 2. Consumer-member (customer side for grocery purchases)
INSERT INTO client (id, user_id, workspace_id, first_name, last_name, status)
VALUES ('cl-carlos', 'u-carlos', 'ws-solidaridad', 'Carlos', 'Reyes', 'active');

-- 3. Worker-member (employment side for shift work)
INSERT INTO staff (id, user_id, first_name, last_name, active)
VALUES ('st-carlos', 'u-carlos', 'Carlos', 'Reyes', true);

-- 4. Producer-member (supply side for artisan bread)
INSERT INTO supplier (id, user_id, workspace_id, name, kind, active)
VALUES ('sup-carlos', 'u-carlos', 'ws-solidaridad', 'Carlos Reyes Bakery', 'vendor', true);

-- 5. Workspace membership anchor (ONE row for Carlos in this co-op)
INSERT INTO workspace_user (
  id, workspace_id, user_id, active,
  member_number, member_status, member_since
) VALUES (
  'wu-carlos', 'ws-solidaridad', 'u-carlos', true,
  'M-00088', 'active', 1704067200000
);

-- 6. Three stakeholder role assignments
INSERT INTO workspace_user_role (id, workspace_user_id, role_id, active) VALUES
  ('wur-carlos-consumer',  'wu-carlos', 'role-consumer-member',  true),
  ('wur-carlos-worker',    'wu-carlos', 'role-worker-member',    true),
  ('wur-carlos-producer',  'wu-carlos', 'role-producer-member',  true);

-- 7. Single equity account linked to the workspace membership (not to user globally)
INSERT INTO equity_account (
  id, workspace_user_id, name, account_type,
  account_id, balance, patronage_basis
) VALUES (
  'ea-carlos', 'wu-carlos',
  'Carlos Reyes — Member Equity',
  'EQUITY_ACCOUNT_TYPE_OWNERS_CAPITAL',
  'acct-member-equity', 0,
  'PURCHASES'           -- consumer patronage basis; worker hours tracked separately via inventory_transaction
);
```

### Query: "What roles does Carlos hold in this co-op?"

```sql
SELECT wu.member_number, wu.member_status, r.name as role
FROM workspace_user wu
JOIN workspace_user_role wur ON wur.workspace_user_id = wu.id
JOIN role r ON r.id = wur.role_id
WHERE wu.user_id = 'u-carlos'
  AND wu.workspace_id = 'ws-solidaridad'
  AND wur.active = true;

-- Result:
-- member_number | member_status | role
-- M-00088       | active        | consumer-member
-- M-00088       | active        | worker-member
-- M-00088       | active        | producer-member
```

---

## Scenario 5: Member Withdrawal and Equity Redemption

**Context**: Diego, a worker-member at Makati Cleaners Cooperative, has decided to
withdraw from the co-op. His share balance is PHP 15,000 (1,500,000 centavos).

### Step 1 — Member submits withdrawal notice

The co-op secretary records the withdrawal request (typically done via a Job).

### Step 2 — Board processes withdrawal

```sql
-- Set member_until on WorkspaceUser (marks the end of legal membership)
UPDATE workspace_user SET
  member_status = 'withdrawn',
  member_until = 1767225600000,   -- effective date of withdrawal
  active = false
WHERE id = 'wu-diego';
```

### Step 3 — Redeem member equity

```sql
-- Record equity withdrawal
INSERT INTO equity_transaction (
  id, equity_account_id, transaction_type, amount, description, transaction_date
) VALUES (
  'et-diego-withdrawal',
  'ea-diego',
  2,                              -- EQUITY_TRANSACTION_TYPE_WITHDRAWAL
  1500000,                        -- PHP 15,000 — full equity balance
  'Member equity redemption on withdrawal — M-00122',
  1767225600000
);
```

### Step 4 — Deactivate role records (optional, depending on bylaws)

```sql
-- Deactivate consumer/worker role assignments (but keep records for audit)
UPDATE workspace_user_role SET active = false
WHERE workspace_user_id = 'wu-diego';

-- Deactivate the Client record (Diego can no longer shop as a member)
UPDATE client SET status = 'inactive', active = false
WHERE user_id = 'u-diego' AND workspace_id = 'ws-makati-cleaners';

-- Deactivate the Staff record
UPDATE staff SET active = false
WHERE user_id = 'u-diego';
```

### Step 5 — Process cash disbursement

The equity redemption triggers a `treasury.disbursement` to Diego's bank account.
The disbursement is linked to `et-diego-withdrawal` for audit traceability.

### Audit trail

After withdrawal, the following records remain (immutable, for compliance and audit):
- `workspace_user` row with `member_status='withdrawn'`, `member_until` set
- `equity_account` with final balance of 0 (after withdrawal transaction)
- All `equity_transaction` rows (contribution, annual patronage retentions, withdrawal)
- All `revenue` rows from Diego's member purchases (required for patronage audit)
- `workspace_user_role` rows (deactivated but not deleted)
