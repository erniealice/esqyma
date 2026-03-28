# Cooperatives -- Claude Opus Research (Deep Reasoning + Web + Codebase)

> Engine: Claude Opus 4.6 (inline analysis + background sub-agent web research)
> Date: 2026-03-25
> Scope: Domain modeling, proto schema mapping, web research synthesis

## Web Research Findings (via Claude Sub-Agent)

### Cooperative Membership Model
- Members are **owners with equity shares** -- joining requires a membership fee (non-refundable) + minimum share capital subscription
- Share capital = par value shares, not freely tradeable, redeemed at par on exit (no capital gains)
- Member equity = paid-up share capital + patronage refund credits + interest-on-capital credits
- Maximum individual shareholding capped (20% under Philippine RA 9520)

### Core Products (Credit Cooperatives)
**Loans:** Regular/Personal, Emergency, Salary, Agricultural, Business/Livelihood, Housing, Educational, Appliance/Commodity, Back-to-Back
**Savings:** Regular Savings, Time Deposit, Special Savings, Mandatory Savings
**Insurance:** Credit Life, Mutual Benefit Fund, Loan Protection Fund, Calamity Aid
**Other:** Provident fund, remittance, consumer store, training (via CETF)

### Surplus Distribution (Year-End)
Philippine RA 9520 mandatory allocations:
- **Reserve Fund**: min 10% (often 30%+) -- indivisible, not distributable to members
- **CETF**: min 10% -- education, training, research
- **Community Development Fund**: min 3%
- **Optional Reserve**: as board determines
- Remaining split between **Interest on Share Capital** (limited rate) and **Patronage Refund** (based on usage)

### Patronage Refund Formula
```
Member Patronage Refund = (Member's Interest Paid / Total Interest Paid by All Members) x Patronage Pool
```
Can be paid as cash, credited to share capital, or combination (e.g., 50/50).

### Interest Computation Methods
- **Diminishing balance** -- interest on outstanding principal (most transparent, increasingly required)
- **Add-on / flat rate** -- interest on original principal for entire term (higher effective rate)
- **Amortization**: Monthly Payment = P x [r(1+r)^n] / [(1+r)^n - 1]

### Governance
- One member, one vote (regardless of share capital)
- Board proposes surplus allocation, **AGM approves** (sovereign authority)
- Credit Committee approves loans
- Audit Committee reviews financials
- Election Committee oversees board elections

### Key Financial Term Distinctions
| Corporate Term | Cooperative Equivalent |
|---|---|
| Net Profit | **Net Surplus** |
| Shareholder Dividends | **Patronage Refund** (based on usage) + **Interest on Capital** (limited) |
| Stock | **Share Capital** (par value, no market appreciation) |
| Retained Earnings | **Reserve Fund** (indivisible) |
| Investor | **Member-Owner** (user of services) |

## Key Findings

### 1. Proto Schema Mapping to Cooperative Concepts

Every existing proto schema maps naturally to cooperative terminology. The domain model is broad enough to accommodate cooperatives without structural changes -- only semantic reinterpretation and some new enum values.

#### Entity Domain

| Proto Schema | Cooperative Term | Fit Quality | Notes |
|---|---|---|---|
| `client` | **Member / Member-Owner** | Strong | Members are both customers AND owners. `client.customer_type` can be "member", "associate_member" |
| `staff` | **Cooperative Staff / Loan Officer** | Perfect | Employees of the cooperative |
| `delegate` | **Board Director / Committee Member** | Strong | Elected representatives. `delegate` already models "representative on behalf of" |
| `admin` | **General Manager / Administrator** | Perfect | Back-office operations |
| `location` | **Branch / Service Center** | Perfect | Physical cooperative offices |
| `group` | **Member Class / Committee** | Strong | Can model member tiers (regular, associate, honorary) or committees (credit, education, audit) |
| `workspace` | **Cooperative Entity** | Perfect | The cooperative itself |
| `role` | **Officer Role** | Perfect | Board Chair, Treasurer, Secretary, Credit Committee Chair |
| `permission` | **System Permission** | Perfect | No change needed |
| `supplier` | **Fund Source / Partner Institution** | Good | External lenders, government agencies, partner coops |

#### Product Domain

| Proto Schema | Cooperative Term | Fit Quality | Notes |
|---|---|---|---|
| `product` | **Loan Product / Savings Product / Service** | Strong | The core "products" of a coop: loans (personal, emergency, business, agricultural), savings accounts, insurance |
| `product_variant` | **Loan Tier / Savings Tier** | Good | Variants by amount range, term length, or collateral type |
| `collection` | **Product Category** | Perfect | "Lending Products", "Savings Products", "Insurance Products", "Community Services" |
| `resource` | **Form / Policy Document** | Perfect | Loan application forms, promissory notes, bylaws |
| `price_list` | **Interest Rate Schedule** | Strong | Interest rates vary by product, member tier, and time period |
| `price_product` | **Product Interest Rate** | Strong | Specific interest rate for a loan product within a rate schedule |

#### Inventory Domain

| Proto Schema | Cooperative Term | Fit Quality | Notes |
|---|---|---|---|
| `inventory_item` | **Loanable Fund / Capital Pool** | Moderate | The "inventory" of a coop is money. Each fund source is a pool. Alternatively: office supplies, forms |
| `inventory_serial` | **Loan Account Number** | Moderate | Individual loan tracking with unique reference |
| `inventory_transaction` | **Fund Movement / Disbursement** | Moderate | Movement of funds between pools (loanable funds, reserve fund, education fund) |
| `inventory_depreciation` | **Loan Loss Provision / Bad Debt Write-Off** | Good | Provisioning for non-performing loans maps well |

#### Subscription Domain

| Proto Schema | Cooperative Term | Fit Quality | Notes |
|---|---|---|---|
| `plan` | **Membership Type / Loan Program** | Strong | "Regular Member", "Associate Member", "Special Lending Program" |
| `plan_settings` | **Program Rules** | Perfect | Membership requirements, loan eligibility rules, dividend policy parameters |
| `plan_location` | **Program Availability** | Perfect | Which branches offer which programs |
| `price_plan` | **Membership Fee / Share Capital Requirement** | Strong | Cost to join: membership fee + minimum share capital |
| `subscription` | **Active Membership / Active Loan** | Strong | A member's enrollment or an active loan contract |
| `license` | **Membership Certificate / Loan Entitlement** | Strong | The certificate of membership, or specific loan access rights |
| `balance` | **Member Share Capital Balance / Savings Balance** | Strong | Tracks member's equity position and savings |
| `invoice` | **Billing Statement / Loan Amortization Schedule** | Strong | Monthly loan payment due, membership renewal |

#### Revenue Domain

| Proto Schema | Cooperative Term | Fit Quality | Notes |
|---|---|---|---|
| `revenue` | **Interest Income / Service Fee Income** | Perfect | Primary coop revenue: interest on loans + service charges |
| `revenue_line_item` | **Income Line Item** | Perfect | Individual interest charge, penalty, service fee |
| `revenue_category` | **Income Stream** | Perfect | "Loan Interest", "Service Charges", "Penalties", "Investment Income" |

#### Expenditure Domain

| Proto Schema | Cooperative Term | Fit Quality | Notes |
|---|---|---|---|
| `expenditure` | **Operating Expense** | Perfect | Staff salaries, office rent, utilities |
| `expenditure_line_item` | **Expense Line Item** | Perfect | Individual expense items |
| `expenditure_category` | **Expense Category** | Perfect | "Personnel", "Occupancy", "Insurance Premium" |

#### Ledger Domain

| Proto Schema | Cooperative Term | Fit Quality | Notes |
|---|---|---|---|
| `equity_account` | **Member Share Capital Account** | Excellent | Each member has an equity account. `EquityAccountType` already supports OWNERS_CAPITAL, RETAINED_EARNINGS |
| `equity_transaction` | **Share Capital Contribution / Dividend Distribution / Rebate Payout** | Excellent | CONTRIBUTION = share purchase, DISTRIBUTION = patronage rebate/dividend, WITHDRAWAL = share withdrawal on exit |
| `journal_entry` | **General Ledger Entry** | Perfect | `JournalSourceType` already has EQUITY_CONTRIBUTION, EQUITY_WITHDRAWAL, EQUITY_DISTRIBUTION |
| `account` | **Chart of Accounts Entry** | Perfect | Standard GL accounts |
| `fiscal_period` | **Fiscal Year / AGM Period** | Perfect | Year-end closing triggers surplus distribution |
| `gross_profit` | **Net Surplus** | Good | The "profit" concept in cooperatives is "net surplus" |

#### Event Domain

| Proto Schema | Cooperative Term | Fit Quality | Notes |
|---|---|---|---|
| `event` | **General Assembly / Board Meeting / Training Session** | Strong | AGM, special assemblies, financial literacy trainings |
| `event_client` | **Attendee / Voting Member** | Strong | Members attending AGM with voting rights |
| `event_product` | **Agenda Item / Resolution** | Moderate | Items for vote: dividend rate approval, officer election |

#### Workflow Domain

| Proto Schema | Cooperative Term | Fit Quality | Notes |
|---|---|---|---|
| `workflow` | **Loan Processing Pipeline / Membership Application** | Perfect | Multi-stage approval processes |
| `stage` | **Processing Stage** | Perfect | Application, Credit Investigation, Committee Review, Approval, Disbursement |
| `activity` | **Processing Task** | Perfect | Verify documents, run credit check, committee vote, prepare voucher |

### 2. Existing Proto Support Already in Place

The codebase is remarkably well-positioned for cooperatives:

**Equity system is built.** `equity_account.proto` and `equity_transaction.proto` directly model member share capital. The `EquityAccountType` enum already has `OWNERS_CAPITAL`, `OWNERS_DRAW`, `RETAINED_EARNINGS`, and `ADDITIONAL_PAID_IN_CAPITAL`.

**Journal source types cover coop operations.** The `JournalSourceType` enum includes:
- `EQUITY_CONTRIBUTION` -- member buys shares
- `EQUITY_WITHDRAWAL` -- member redeems shares on exit
- `EQUITY_DISTRIBUTION` -- patronage rebate/dividend payout
- `LOAN_RECEIPT` -- loan disbursement
- `LOAN_PAYMENT` -- member repayment
- `LOAN_FEE_AMORTIZATION` -- processing fee amortization
- `BAD_DEBT_PROVISION` -- loan loss provisioning
- `YEAR_END_CLOSE` -- triggers surplus computation

**License model fits membership certificates.** `LicenseType` has `TENANT` (org-wide membership) and `USER` (individual member assignment). `LicenseEntitlement` with `entitlement_type`, `usage_limit`, and `usage_period` can model loan eligibility limits.

**Balance tracking exists.** `balance.proto` with `balance_type` ("credit", "debit", "pending") can track savings deposits and share capital separately.

### 3. Gaps Identified -- New Enums/Fields Needed

| Gap | Proto File | Recommendation |
|---|---|---|
| No "cooperative" equity types | `equity_account.proto` | Add `EQUITY_ACCOUNT_TYPE_SHARE_CAPITAL`, `EQUITY_ACCOUNT_TYPE_PATRONAGE_REFUND`, `EQUITY_ACCOUNT_TYPE_STATUTORY_RESERVE` |
| No dividend/rebate transaction types | `equity_transaction.proto` | Add `EQUITY_TRANSACTION_TYPE_PATRONAGE_REBATE`, `EQUITY_TRANSACTION_TYPE_INTEREST_ON_CAPITAL` |
| No loan-specific journal sources | `journal_entry.proto` | Already has `LOAN_RECEIPT`, `LOAN_PAYMENT` -- sufficient |
| No surplus allocation journal source | `journal_entry.proto` | Add `JOURNAL_SOURCE_TYPE_SURPLUS_ALLOCATION` for year-end distribution to reserve/education/community funds |
| No member voting tracking | `event_client.proto` | Could add `voting_weight` or `proxy_for` fields, but may be overkill for initial vertical |

### 4. Hybrid Model Spectrum Position

Cooperatives sit in a unique position -- they are **financial service organizations** where the "inventory" is money itself:

```
Pure Product                                                    Pure Service
    |                                                               |
    v                                                               v
  Retail     Laundry    Medical Aesthetics    Cooperatives    Professional Svc
  ------     -------    ------------------    ------------    ---------------
  Sells      Processes  Consumes firm's       Lends money     Sells people's
  goods      customer   inventory on          (fund depletion time (no physical
  from shelf property   patient               + replenishment goods)
                                              cycle)
```

Cooperatives are closest to **Medical Aesthetics** in model: both deplete a firm resource (money / injectables) for a client, but with a crucial difference -- **loans get repaid**, creating a cyclical flow rather than one-way depletion.

## Sources & References

- `packages/esqyma/proto/v1/domain/ledger/equity_account/equity_account.proto` -- EquityAccountType enum
- `packages/esqyma/proto/v1/domain/ledger/equity_transaction/equity_transaction.proto` -- EquityTransactionType enum
- `packages/esqyma/proto/v1/domain/ledger/journal_entry/journal_entry.proto` -- JournalSourceType enum (26 source types)
- `packages/esqyma/proto/v1/domain/subscription/license/license.proto` -- LicenseType, LicenseEntitlement
- `packages/esqyma/proto/v1/domain/subscription/balance/balance.proto` -- Balance with balance_type
- `packages/esqyma/proto/v1/domain/subscription/subscription/subscription.proto` -- Subscription with license pool
- `packages/esqyma/verticals/README.md` -- Existing 4-vertical terminology matrix

## Gaps & Uncertainties

- **Loan amortization schedule**: No dedicated proto for amortization schedules. Could model as `plan_settings` metadata or need a new `loan_schedule` message.
- **Interest computation engine**: The proto model stores data but doesn't encode computation rules. Interest calculation (declining balance, flat rate, add-on) would need to be in application logic, not proto.
- **Surplus allocation formula**: The year-end split (reserve %, education %, community %, patronage %) is a policy, not a schema. Could use `plan_settings` with structured metadata.
- **Voting/governance**: The event domain can model AGM attendance but doesn't have voting mechanics. This may be out of scope for the initial vertical.
