# Mutual — Cooperatives, Credit Unions, Mutual Insurance, Member Clubs, and DAOs

> Mutual organizations (cooperatives, mutual insurance companies, credit unions, member clubs,
> fraternal benefit societies, housing co-ops, professional partnerships, and DAOs) are firms where
> the customers/workers/producers ARE the owners. Unlike the other 6 verticals (which describe
> **what is delivered**), Mutual describes **how the firm is owned and governed** — and any vertical
> can BE a mutual (consumer co-op = retail-mutual; worker co-op = professional-mutual; credit union =
> financial-mutual; housing co-op = leasing-mutual). Schema impact: 11 additive changes across 5
> existing messages plus 4 ALTER TABLE migrations. **No new top-level entities** — the existing
> User → role-tables → WorkspaceUser identity chain already supports multi-stakeholder membership.

---

## Quick Reference

| Schema entity | Mutual / Cooperative term | Notes |
|---|---|---|
| `user` | Member identity | Authentication record; cross-workspace, cross-role |
| `client` | Member-as-customer | Consumer-member's customer-side record |
| `staff` | Member-as-worker | Worker-member's employment-side record |
| `supplier` | Producer-member / vendor-partner | Producer co-op or multi-stakeholder co-op supplier role |
| `delegate` | Member-elected board representative | Board rep with authority to act on behalf of constituency |
| `admin` | General Manager / Treasurer / Secretary | Operational leadership |
| `workspace_user` | **Member registry record** | Admission lifecycle fields added; anchor for all member types |
| `workspace_user_role` | Stakeholder role assignment | Consumer-member / worker-member / producer-member / supporter-member |
| `location` | Co-op branch / member service location | Where services are delivered to members |
| `group` | Member Class / Cohort | Founding members, regular members, supporter members |
| `product` | Service offered | Groceries / loans / housing / produce marketing for members |
| `plan` | Membership Tier / Plan | Founding / Regular / Supporter / Institutional |
| `price_plan` | Member dues / fee structure | Rate card for the membership tier |
| `price_schedule` | Pricing window | Date-bounded pricing for member services |
| `product_price_plan` | Per-service member price | Individual line prices within the pricing window |
| `license` | Member service entitlement | Vote credits, service quota, draw-right |
| `subscription` | Active member service relationship | Member's purchase plan, share package, or service subscription |
| `invoice` | Member service invoice | Billing record for member transactions |
| `balance` | Member account balance | Running balance on the member's subscription |
| `inventory_item` | Co-op-owned inventory | For worker co-ops, member-workers as serialized resources |
| `inventory_transaction` | Stock movement | For worker co-ops, hours logged toward patronage |
| `equity_account` | **Member Equity Account** | New `workspace_user_id` FK links to the member |
| `equity_transaction` | Capital contribution / patronage retention / distribution | New enum values for IRS Sub-T flows |
| `revenue` | Member purchase / service revenue | Taxed under IRS Sub-T for cooperatives (member-sourced vs nonmember-sourced) |
| `revenue_category` | Member-sourced vs nonmember-sourced | Cooperative income classification |
| `deferred_revenue` | Deferred patronage allocation | Patronage not yet allocated or distributed |
| `event` | Meeting / general assembly / **governance vote** | New `EVENT_KIND_GOVERNANCE_VOTE` discriminator |
| `event_attendee` | Meeting attendee / **voter** | New vote fields for one-member-one-vote governance |
| `job` | Service job | Member onboarding, annual patronage allocation, general assembly, federation engagement |
| `job_template` | Service SOP | Reusable template for co-op service jobs |
| `job_phase` | Service job phase | Phase breakdown of co-op operational jobs |
| `job_task` | Service task | Individual task in a co-op service job |
| `outcome_criteria` | Cooperative principle adherence check | Compliance/quality standard for co-op governance |
| `task_outcome` | Compliance outcome | Result of a cooperative principle check |
| `job_activity` | Service work cost | Staff hours, materials, expenses on co-op jobs |
| `client_category` | Member class / tier | Category used to distinguish consumer-member, worker-member, producer-member |
| `revenue_line_item` | Member transaction line | Individual line on a member service invoice |
| `fiscal_period` | Patronage period | The accounting period over which patronage is calculated |

---

## Domain Deep Dive: Identity and Membership

This is the headline design insight. The schema already supports multi-stakeholder co-op membership
**without a new top-level entity**, because of how `User`, the role tables, and `WorkspaceUser` relate.

### The Identity Chain

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   User (auth identity — cross-workspace, cross-role)                       │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  id, email_address, password_hash, first_name, last_name, timezone  │  │
│   │  This is the person. ONE row per human being in the system.         │  │
│   └───────────────┬─────────────────────────────────────────────────────┘  │
│                   │ user_id FK (same user_id in all 3 role tables)          │
│                   │                                                         │
│         ┌─────────┼──────────────────────────────────────────┐             │
│         ▼         ▼                                           ▼             │
│   ┌──────────┐ ┌──────────┐                          ┌──────────────┐      │
│   │ Client   │ │  Staff   │  (optional — only when   │   Supplier   │      │
│   │user_id   │ │user_id   │   the member also works  │user_id       │      │
│   │workspace │ │          │   as a worker-member or  │workspace_id  │      │
│   │_id       │ │          │   supplier-member)        │kind          │      │
│   │          │ │          │                          │              │      │
│   │Consumer- │ │Worker-   │                          │Producer-     │      │
│   │member    │ │member    │                          │member        │      │
│   │customer  │ │employment│                          │supply-side   │      │
│   │side      │ │side      │                          │              │      │
│   └──────────┘ └──────────┘                          └──────────────┘      │
│                                                                             │
│   WorkspaceUser (UNIQUE workspace_id, user_id — the membership anchor)     │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  id, workspace_id FK, user_id FK                                    │  │
│   │  active                                                             │  │
│   │  ── NEW (mutual vertical) ──────────────────────────────────────── │  │
│   │  member_number     TEXT     unique registry ID within this co-op    │  │
│   │  member_status     TEXT     "applicant"|"active"|"suspended"|...    │  │
│   │  member_since      BIGINT   admission date (epoch ms)               │  │
│   │  member_until      BIGINT   termination date; NULL = still member   │  │
│   └──────────────────────────┬──────────────────────────────────────────┘  │
│                              │ workspace_user_id FK                         │
│                              ▼                                              │
│   WorkspaceUserRole (1:N — stakeholder role assignments)                   │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  workspace_user_id FK, role_id FK                                   │  │
│   │  active                                                             │  │
│   │  Roles assigned: consumer-member / worker-member /                  │  │
│   │                  producer-member / supporter-member / board         │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Multi-Stakeholder Co-op Identity Example

A single person who is both a consumer-member AND a worker-member (common in solidarity co-ops):

```
User { id: "u-alice", email: "alice@grocoop.ph" }
  │
  ├── Client { id: "cl-alice", user_id: "u-alice", workspace_id: "ws-grocoop" }
  │     └── consumer-member: buys groceries from the co-op
  │
  ├── Staff { id: "st-alice", user_id: "u-alice" }
  │     └── worker-member: works shifts at the co-op
  │
  └── WorkspaceUser { id: "wu-alice", workspace_id: "ws-grocoop", user_id: "u-alice",
                      member_number: "M-00042", member_status: "active",
                      member_since: 1704067200000 }
        ├── WorkspaceUserRole { role: "consumer-member" }
        └── WorkspaceUserRole { role: "worker-member" }
```

The `WorkspaceUser` row is the **single source of truth for membership status**. The `Client`
and `Staff` rows are **role-evidence** — they carry the functional details (billing address,
employment terms) but are NOT the membership record.

---

## Domain Deep Dive: Equity and Patronage

### Member Equity Account

```
EquityAccount {
  workspace_user_id: "wu-alice"   ← NEW: linked to the member (not just a name string)
  patronage_basis: "PURCHASES"    ← NEW: how patronage is calculated
  account_type: OWNERS_CAPITAL
  balance: 5000000               ← centavos = PHP 50,000 member equity
}
```

### Patronage Allocation Cycle

At year-end, after the co-op calculates surplus:

```
1. Calculate each member's patronage base:
   SUM(revenue.amount WHERE revenue.client_id = client_id AND period = FY2025)
   → basis = total member purchases during FY2025

2. Calculate each member's share of surplus:
   member_share = (member_patronage_base / total_member_purchases) × distributable_surplus

3. Record the allocation as EquityTransaction:
   EquityTransaction {
     equity_account_id: <member's equity account>
     transaction_type: EQUITY_TRANSACTION_TYPE_PATRONAGE_RETENTION = 5  ← NEW
     amount: <retained_portion_centavos>
     description: "FY2025 patronage retention - M-00042"
   }
   AND/OR:
   EquityTransaction {
     equity_account_id: <member's equity account>
     transaction_type: EQUITY_TRANSACTION_TYPE_PATRONAGE_DISTRIBUTION = 6  ← NEW
     amount: <cash_refund_centavos>
     description: "FY2025 patronage cash dividend - M-00042"
   }
```

The split between `PATRONAGE_RETENTION` (kept as equity) and `PATRONAGE_DISTRIBUTION`
(paid out as cash) is decided by the board at the general assembly and can vary by:
- Bylaw-mandated minimum retention percentage
- Member seniority or tier
- Co-op's liquidity needs

---

## Domain Deep Dive: Governance

### Governance Vote Event

```
Event {
  kind: EVENT_KIND_GOVERNANCE_VOTE    ← NEW: distinguishes from regular meetings
  name: "2025 Annual General Assembly — Board Election"
  start_date_time_utc: <AGM date>
  workspace_id: "ws-grocoop"
  organizer_id: "wu-board-secretary"
  status: EVENT_STATUS_CONFIRMED
}
```

### Voting via EventAttendee

Each member attending the vote gets an `EventAttendee` row:

```
EventAttendee {
  event_id: "ev-agm-2025"
  workspace_user_id: "wu-alice"       ← member anchor (not client_id)
  role: ATTENDEE_ROLE_REQUIRED
  eligible_to_vote: true              ← NEW: pre-check passed
  vote_weight: 1                      ← NEW: one-member-one-vote
  vote_choice: "yes"                  ← NEW: recorded vote
  vote_cast_at: 1735689600000        ← NEW: epoch ms
}
```

**Why EventAttendee, not EventClient?**

`EventClient` has `UNIQUE(event_id, client_id)` and can only hold client-role attendees.
Worker-members and producer-members do not have a `client_id`. `EventAttendee` already
supports `workspace_user_id` — which correctly resolves to any stakeholder role — and
represents the one-member-one-vote invariant cleanly.

---

## Why No New Top-Level Entity (But Yes Proto Changes)

This section is the headline architectural decision. It is explicit and complete.

### "No new top-level entity"

The term "entity" here means: a new protobuf `message` with `option (options.v1.table).table = true`
that maps to a new database table. There are **zero** of those. Every piece of mutual-specific
information is added as fields to existing messages or values to existing enums.

The existing `User → role-tables → WorkspaceUser` identity chain already provides:
- One authentication identity per person (User)
- N role rows per person sharing the same `user_id` (Client, Staff, Supplier)
- One workspace-scoped membership record per (workspace, user) pair (WorkspaceUser, UNIQUE)
- N role assignments per membership (WorkspaceUserRole)

The only thing missing was **admission lifecycle state on WorkspaceUser** and
**party-linked equity accounts with patronage transaction types** and **governance vote events**.
All of these are additive field/enum extensions to existing messages.

### Proto Changes (11 additive additions across 5 messages)

| Proto file | Change | Field numbers / values |
|---|---|---|
| `domain/entity/workspace_user/workspace_user.proto` | +4 fields to `WorkspaceUser` | `member_number` = 12, `member_status` = 13, `member_since` = 14, `member_until` = 15 |
| `domain/ledger/equity_account/equity_account.proto` | +2 fields to `EquityAccount` | `workspace_user_id` = 12, `patronage_basis` = 13 |
| `domain/ledger/equity_transaction/equity_transaction.proto` | +2 enum values to `EquityTransactionType` | `PATRONAGE_RETENTION` = 5, `PATRONAGE_DISTRIBUTION` = 6 |
| `domain/event/event/event.proto` | +1 new enum `EventKind` + field to `Event` | `EVENT_KIND_UNSPECIFIED` = 0, `EVENT_KIND_MEETING` = 1, `EVENT_KIND_GOVERNANCE_VOTE` = 2; `kind` field = 23 |
| `domain/event/event_attendee/event_attendee.proto` | +4 fields to `EventAttendee` | `vote_choice` = 15, `vote_weight` = 16, `vote_cast_at` = 17, `eligible_to_vote` = 18 |

All changes are additive and backwards-compatible. Existing consumers that do not read the
new fields continue to work without modification. Proto wire format: adding optional fields
with new field numbers is safe per protobuf specification.

### Atlas Migrations (4 ALTER TABLE statements)

File: `packages/esqyma/migrations/postgres/20260510050000_add_mutual_fields.sql`

| Table | ALTER TABLE columns added | Index added |
|---|---|---|
| `workspace_user` | `member_number TEXT`, `member_status TEXT`, `member_since BIGINT`, `member_until BIGINT` | `idx_workspace_user_member_number` on `member_number` (sparse — WHERE NOT NULL) |
| `equity_account` | `workspace_user_id TEXT REFERENCES workspace_user(id)`, `patronage_basis TEXT` | `idx_equity_account_workspace_user_id` on `workspace_user_id` (sparse) |
| `equity_transaction` | none — `PATRONAGE_RETENTION` = 5 and `PATRONAGE_DISTRIBUTION` = 6 are stored in the existing `transaction_type` INTEGER column; no structural change needed | — |
| `event` | `kind TEXT` | — |
| `event_attendee` | `vote_choice TEXT`, `vote_weight INTEGER`, `vote_cast_at BIGINT`, `eligible_to_vote BOOLEAN` | — |

All columns are `NULLABLE`. This follows the "live users exist — additive-only" constraint in
`docs/wiki/articles/schema-migrations.md`. A future migration can add NOT NULL after backfill
using the documented 2-step pattern.

---

## The Trade-off: Extending WorkspaceUser vs. Dedicated Member Entity

### Why WorkspaceUser extension wins for v1

The `WorkspaceUser` extension approach works because:

1. **The pattern already exists**: `workspace → workspace_user → workspace_user_role` is the
   canonical multi-role pattern, documented in `docs/wiki/articles/workspace-admin.md`.
2. **No new auth/RBAC surface**: existing login, session, and permission checks require zero changes.
3. **Minimal blast radius**: 4 optional fields on one table, 1 migration, 0 new entities.
4. **Good enough for v1 co-ops**: small cooperatives (grocery stores, credit unions under 10,000
   members, worker co-ops under 100 members) where the membership IS the auth/RBAC surface.
5. **The admission fields are a superset of RBAC fields**: `member_status` generalizes
   `active` for co-op-specific lifecycle states. When `member_status = "active"`, the
   `WorkspaceUser.active = true` invariant holds. This is clean.

### Why a dedicated Member entity would be better for regulated mutuals

For large regulated mutuals (credit unions over 10,000 members, mutual insurance companies,
mutual savings banks), the concerns are:

1. **Regulatory separation**: the legal membership record (admitted, in good standing, voted)
   must be auditable independently of the technical auth record (can log in, has permissions).
   A member may be auth-suspended (locked out due to fraud) while remaining legally a member.
2. **Member registry exports**: the National Credit Union Administration (NCUA) and
   state insurance commissioners require member registry exports. These should come from
   a dedicated `Member` table, not a JOIN on `workspace_user`.
3. **Class B/C shares with different voting rights**: some mutual insurers have multi-class
   memberships where class determines voting weight. This becomes awkward on WorkspaceUser
   (you'd need a multi-class equity account per member, which is fine, but the eligibility
   check for voting needs to join WorkspaceUser → EquityAccount → membership class).
4. **Deceased/estate members**: a deceased member's estate may hold membership for probate
   purposes while the deceased's `User` should be deactivated. With WorkspaceUser-as-member,
   there is no clean way to keep the membership active for estate purposes while deactivating auth.

### Migration path forward

The 4 fields added to `WorkspaceUser` in this vertical are the **seed of a future `Member` table**.
If regulated-mutual requirements emerge, the migration is:

1. Create `member` table (copy structure of the 4 WorkspaceUser fields + add regulatory fields)
2. Copy data: `INSERT INTO member SELECT workspace_user_id, member_number, ... FROM workspace_user WHERE member_number IS NOT NULL`
3. Add `WorkspaceUser.member_id FK` pointing to the new `member` table
4. Deprecate `WorkspaceUser.member_number/status/since/until` (keep for N releases, then drop in a future breaking migration)

This is a **non-breaking promotion** — the same data, cleaner table. It is NOT a migration-from-scratch.

---

## Sample Data Scenarios Index

See [`scenarios/`](scenarios/) for complete data scenarios:

| File | Contents |
|---|---|
| [operations.md](scenarios/operations.md) | **Headline file**: patronage cycle, governance vote, new member onboarding, multi-stakeholder identity, member withdrawal |
| [client.md](scenarios/client.md) | Member-as-customer onboarding; ClientCategory tiers for member class |
| [inventory.md](scenarios/inventory.md) | Co-op asset registry; worker co-op member-workers as serialized resources |
| [plan.md](scenarios/plan.md) | Membership tiers (founding / regular / supporter) |
| [product.md](scenarios/product.md) | Services offered to members; member vs nonmember price differentiation |
| [revenue.md](scenarios/revenue.md) | Member-sourced revenue (Sub-T) vs nonmember-sourced (taxable ordinary) |
| [subscription.md](scenarios/subscription.md) | Active member's service subscription within the membership |

---

## Status-Driven Flows

### Membership Lifecycle

```
[application submitted]
         │
         ▼
    APPLICANT ──── board reviews ───► ACTIVE
                                        │
              ┌─────────────────────────┤
              │                         │
              ▼                         ▼
         SUSPENDED              WITHDRAWN (voluntary)
              │
              ▼
         EXPELLED (involuntary termination)
```

State transitions:
- `applicant → active`: board approval + share payment recorded as `EquityTransaction(CONTRIBUTION)`
- `active → suspended`: board vote, preserves equity balance
- `active → withdrawn`: member voluntary exit, triggers `EquityTransaction(WITHDRAWAL)` to redeem share
- `active → expelled`: board vote (discipline), `member_until` set, equity redemption per bylaws
- `suspended → active`: re-instatement by board vote
- `suspended → expelled`: escalation

### Patronage Allocation Cycle

```
[fiscal period closes]
         │
         ▼
Calculate member patronage base
(SUM revenue per member for the period)
         │
         ▼
Calculate distributable surplus
(total revenue - operating expenses - reserves)
         │
         ▼
Board proposes allocation
(% retained, % distributed, by-member)
         │
         ▼
General Assembly vote
Event(kind=GOVERNANCE_VOTE) + EventAttendee(vote_choice per member)
         │
    ┌────┴────┐
    ▼         ▼
RETAIN     DISTRIBUTE
    │         │
    ▼         ▼
EquityTransaction   EquityTransaction
(PATRONAGE_         (PATRONAGE_
 RETENTION)          DISTRIBUTION)
    │                   │
    ▼                   ▼
equity_account.      Cash payout
balance increases    to member
```

---

## Key Design Decisions

### 1. Member registry = WorkspaceUser with admission fields

WorkspaceUser is the member anchor. The `UNIQUE(workspace_id, user_id)` constraint on
`workspace_user` perfectly expresses the invariant that a person is a member of exactly
one legal entity (workspace) per membership record. The 4 new fields (`member_number`,
`member_status`, `member_since`, `member_until`) extend this into a full admission registry.

### 2. Multi-stakeholder identity = one User + N role rows sharing user_id

A solidarity co-op member who is both a consumer and a worker gets:
- One `User` row (auth identity)
- One `Client` row (consumer-member's purchase record)
- One `Staff` row (worker-member's employment record)
- One `WorkspaceUser` row (the unified membership anchor)
- Two `WorkspaceUserRole` rows (consumer-member, worker-member)

The role tables are **role-evidence**, not the membership record. This is the key insight
from the codex audit (`docs/plan/20260510-job-activity-phase-review/codex-mutual-review.md`).

### 3. Member equity = EquityAccount + workspace_user_id FK

`EquityAccount.workspace_user_id` links each equity account to its member. This is
workspace-scoped (you're a member of THIS co-op, not globally) — which is why the FK
targets `workspace_user`, not `user`. An individual can have equity in multiple co-ops
(multiple `workspace_user` rows) and each co-op's equity account links to the correct one.

### 4. Patronage allocation = EquityTransaction + 2 new enum values

IRS Subchapter T recognizes two forms of patronage dividends:
- **Cash patronage dividend** (`PATRONAGE_DISTRIBUTION`): paid directly to members
- **Non-cash patronage dividend / qualified written notice** (`PATRONAGE_RETENTION`): retained
  as equity in the member's account; member may receive a 1099-PATR for tax purposes

Both are modeled as `EquityTransaction` rows against the member's `EquityAccount`. The
enum values are stored as integers in the existing `transaction_type` column — no structural
table change required.

### 5. Voting = EventAttendee + vote fields (NOT EventClient)

`EventClient` cannot carry worker-member or producer-member votes because it has a
strict `client_id FK`. `EventAttendee` already has `workspace_user_id`, which collapses
all stakeholder roles for one person in one workspace — exactly the one-member-one-vote
invariant. The 4 new fields (`vote_choice`, `vote_weight`, `vote_cast_at`, `eligible_to_vote`)
are only populated when `Event.kind = EVENT_KIND_GOVERNANCE_VOTE`.

---

## Universal Job Model — applicability to mutual / cooperatives

The `operation/` proto domain is being generalised under `docs/plan/20260427-universal-job-model/` to handle service / project / maintenance / production work from one schema. Wave 1 (already complete locally) added the enum values `PLANNED`, `RELEASED`, `EQUIPMENT`, `SUBCONTRACT`, `HOLD`, `REWORK`, plus JobTemplate versioning and Job output-target fields. Waves 2–4 add nine new entities. **Mutual is orthogonal** — the applicability profile is inherited from whatever industry the co-op operates in (a worker co-op of accountants gets the professional-services profile; a consumer grocery co-op gets the retail profile). The mutual-specific additions are governance-and-patronage flows on top.

| New entity (Wave) | Mutual-specific value (beyond underlying-industry inheritance) | Example |
|---|---|---|
| `job_template_input` (W2) | 🟡 Medium — operational-Job templates for co-op governance | "Annual patronage allocation template" expects N hours of treasurer time + audit-firm subcontract + member-statement printing. The annual-AGM template carries hall booking, secretarial hours, materials. |
| `job_template_input_alternate` (W2) | ⚪ Low | (rare) |
| `lot` (W2) | (inherited from underlying industry) | n/a for governance Jobs |
| `job_input_plan` (W3) | 🟡 Medium — annual operational-Job budget freeze | Each year's AGM Job freezes the planned cost at the start of the fiscal year; deviations get reported at board level. |
| `task_interruption` (W3) | ⚪ Low | (rare — "AGM postponed waiting for quorum") |
| `job_output` (W4) | 🟢 High — patronage statements, AGM minutes, audit reports | `output_kind=DELIVERABLE` per member's patronage statement; `output_kind=MILESTONE` for "AGM held with quorum"; `output_kind=DELIVERABLE` for audit report PDF. |
| `job_cost_ledger_entry` (W4) | 🟡 Medium — operational-cost transparency | Member-facing accountability ledger — "what did we spend on governance this year." |
| `job_cost_snapshot` (W4) | 🟡 Medium | Fiscal-year operational-cost snapshot for the annual report. |
| `job_plan_deviation` (W4) | 🟡 Medium — operational-cost variance | Drives the "AGM ran 22% over budget — why?" question for the next board. |

**Patronage-allocation Job pattern:** the universal Job model handles co-op operational cycles cleanly. One Job per fiscal year, type "patronage allocation," with `JobTemplate` carrying the SOP. JobActivity rows capture treasurer hours and audit fees. JobOutput rows of `output_kind=DELIVERABLE` carry per-member patronage statements (one row per member or a single aggregate row referencing a member-statement bundle). The existing patronage equity flow (`EquityTransaction` with `PATRONAGE_RETENTION` / `PATRONAGE_DISTRIBUTION`) is **not** replaced — the Job-level outputs are the *operational evidence*, the equity transactions are the *accounting effect*.

**Solidarity / multi-stakeholder co-ops:** the underlying-industry UJM profile may apply twice — a worker member submits hours via the professional-services profile of UJM; the same individual as a consumer member receives a job_output deliverable from the patronage-allocation governance Job. The two profiles compose cleanly because the universal core doesn't know about co-op governance — that knowledge lives in the WorkspaceUser admission state and the Equity ledger.

**Lyngua tier-3 keys to author** (under `packages/lyngua/translations/en/mutual/`):
- `job_template_input.json` → "Service requirements" (co-op-flavoured) / "Allocation inputs"
- `job_output.json` → "Co-op outputs" (kinds include "Patronage statement", "AGM minutes", "Audit report")
- `job_cost_ledger_entry.json` → "Operational cost ledger" (member-facing)

**See:** `packages/esqyma/verticals/manufacturing/README.md` for the canonical facade example. The same proto fields, rendered under `lyngua/translations/en/manufacturing/`, become BOM-and-Routing / WIP / Variance. Mutual stacks on top of whatever industry profile the co-op operates in.
