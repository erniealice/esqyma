# Cooperatives -- Unified Research Report

> Generated: 2026-03-25 | Sources: Gemini CLI, Codex CLI (gpt-5.4), Claude Opus 4.6
> Scope: esqyma vertical expansion -- adding Cooperatives as 5th vertical

## Executive Summary

Cooperatives are member-owned financial organizations where the "product" is money (loans, savings), the "inventory" is loanable funds, and the "profit" is called "net surplus" -- distributed back to members as patronage rebates and dividends on share capital. The existing esqyma proto domain model can accommodate a cooperatives vertical with **semantic reinterpretation** for most schemas, but **needs targeted schema changes** for equity, financial product, and member-specific concepts.

All three research engines agree on the core mapping (client=member, product=loan/savings, plan=membership, equity_account=share capital). However, Codex's deeper proto analysis reveals that many mappings that "sound right" are actually **medium fit** because the proto fields lack financial-product semantics (interest methods, amortization, collateral). The consensus is: **start with what fits today, add cooperative-specific enum values, and flag deeper structural gaps for Phase 2.**

## Findings by Domain Area

### 1. Entity Domain (People & Places)

| Proto Schema | Cooperative Term | Consensus Fit | Notes |
|---|---|---|---|
| `client` | **Member / Member-Owner** | Medium | All sources agree on mapping, but Codex flags missing member-specific fields: `member_number`, `member_status`, `membership_date`, `member_class`. Currently just has `customer_type` string. |
| `staff` | **Loan Officer / Teller / Collections Staff** | Good | Clean mapping across all sources |
| `delegate` | **Board Director / Authorized Representative** | Medium | Claude maps to governance; Codex notes it works for org members but lacks guarantor/co-maker semantics |
| `admin` | **General Manager / Branch Admin** | Good | Clean mapping |
| `location` | **Branch / Satellite Office** | Good | Clean mapping |
| `group` | **Member Class / Committee / Chapter** | Medium | Usable for segmentation but not governance-aware (Codex) |
| `supplier` | **Fund Source / Partner Institution** | Good | External lenders, government agencies (Claude) |

### 2. Product Domain (Financial Products)

| Proto Schema | Cooperative Term | Consensus Fit | Notes |
|---|---|---|---|
| `product` | **Loan Product / Savings Product** | Medium | Core mapping agreed by all. Codex: lacks financial semantics (interest method, compounding, amortization basis, minimum balance, collateral requirement) |
| `product_variant` | **Loan Tier / Savings Tier** | Medium | Term length, rate variant, collateral type (Codex) |
| `collection` | **Product Category / Portfolio** | Good | "Lending Products", "Savings Products", "Insurance" (all sources) |
| `resource` | **Form / Policy Document** | Good | Loan application forms, promissory notes, bylaws (Claude) |
| `price_list` | **Interest Rate Schedule** | Good | Time/location-bound pricing, rate sheets (all sources) |
| `price_product` | **Product Interest Rate** | Medium | Can hold rates but not full interest formulas (Codex) |

### 3. Inventory Domain (Fund Management)

| Proto Schema | Cooperative Term | Consensus Fit | Notes |
|---|---|---|---|
| `inventory_item` | **Loanable Fund Pool / Cash Pool** | Medium | Claude: "inventory is money". Codex: semantically stretched but usable |
| `inventory_serial` | **Loan Account Number** | Weak | Codex: serial-tracking is awkward for financial accounts |
| `inventory_transaction` | **Deposit / Withdrawal / Disbursement / Repayment** | Medium | Strong for cash movements if string-backed `transaction_type` is extended (Codex) |
| `inventory_depreciation` | **Loan Loss Provision** | Weak | Codex: wrong abstraction for expected credit loss. Should be ledger-driven. |

### 4. Subscription Domain (Memberships & Accounts)

| Proto Schema | Cooperative Term | Consensus Fit | Notes |
|---|---|---|---|
| `plan` | **Membership Type / Loan Program** | Medium | All agree. Defines offering structure, not account state (Codex) |
| `plan_settings` | **Program Rules / Eligibility Rules** | Good | Membership requirements, dividend policy parameters (Claude) |
| `price_plan` | **Membership Fee / Dues** | Medium | Cost to join. Not enough for amortization terms (Codex) |
| `subscription` | **Active Membership / Active Loan** | Medium | All agree on mapping. Codex: not enough for full loan-account behavior (principal, maturity, delinquency) |
| `license` | **Membership Certificate / Entitlement** | Weak | Codex: software-shaped, poor fit for core cooperative finance. Claude: maps to certificate but stretches the concept |
| `balance` | **Share Capital Balance / Savings Balance** | Medium | All agree. `balance_type` string can be extended. Codex: too thin for full financial accounts |
| `invoice` | **Billing Statement / Amortization Notice** | Weak | Too thin for loan schedules and collections (Codex) |

### 5. Revenue & Expenditure Domains

| Proto Schema | Cooperative Term | Consensus Fit | Notes |
|---|---|---|---|
| `revenue` | **Interest Income / Service Fee Income** | Good | All agree -- solid fit |
| `revenue_line_item` | **Interest Charge / Fee / Penalty / Rebate** | Medium | Needs more line-item types (Codex) |
| `revenue_category` | **Income Stream** | Good | Interest, penalties, fees, insurance commissions |
| `expenditure` | **Operating Expense** | Medium | Good for real expenses, not for loan principal release (Codex) |
| `expenditure_category` | **Expense Class / Statutory Fund Use** | Good | Clean mapping |

### 6. Ledger Domain (Equity & Accounting)

| Proto Schema | Cooperative Term | Consensus Fit | Notes |
|---|---|---|---|
| `equity_account` | **Member Share Capital Account / Reserve Fund** | Medium-Good | All agree this is the closest fit. Codex: needs member/share orientation, share count, par value, certificate number |
| `equity_transaction` | **Share Purchase / Redemption / Surplus Distribution** | Medium-Good | Good base. All recommend cooperative-specific transaction types |
| `journal_entry` | **GL Posting** | Good | Already has EQUITY_CONTRIBUTION, LOAN_RECEIPT, LOAN_PAYMENT source types |
| `account` | **Chart of Accounts** | Good | Standard GL -- no changes needed |
| `fiscal_period` | **Fiscal Year / AGM Period** | Good | Year-end triggers surplus distribution (Claude) |

### 7. Event & Workflow Domains

| Proto Schema | Cooperative Term | Consensus Fit | Notes |
|---|---|---|---|
| `event` | **AGM / Board Meeting / Training Session** | Good | All agree |
| `event_client` | **Attendee / Voting Member** | Good | |
| `workflow` | **Loan Processing / Membership Application** | Good | Strong fit (all sources) |
| `stage` | **Application / Underwriting / Approval / Disbursement** | Good | |
| `activity` | **KYC / Credit Investigation / Committee Vote / Voucher** | Good | |

## Conflicts & Resolutions

| Topic | Claude Says | Codex Says | Gemini Says | Resolution |
|---|---|---|---|---|
| `client` fit for "member" | Strong fit | Medium -- missing member-specific fields | Client is central record, add `client_type` | **Medium**. Use `client` but extend with `customer_type` values. Phase 2: add member fields via attributes. |
| `license` for membership | Strong -- maps to certificate | Weak -- software-shaped model | Not discussed | **Weak**. Don't force `license` for core cooperative finance. Use only for supplementary entitlements. |
| `inventory_depreciation` for loan loss | Good -- maps to provisioning | Weak -- wrong abstraction | Not discussed | **Weak**. Use ledger-driven loan loss provisioning instead. |
| Hybrid Spectrum position | Between MedAesthetics and ProfServices | Beyond ProfServices -- financial intermediation | Not a simple spectrum position | **New category**: Cooperatives are a financial-intermediation vertical, not a product/service hybrid. |
| `subscription` for loans | Strong -- active loan contract | Medium -- lacks loan-account fields | Active loan/savings mapped here | **Medium**. Works for initial vertical. Phase 2 may need dedicated loan account schema. |

## Recommended Proto Changes

### Phase 1: Enum Extensions (No Breaking Changes)

**True proto enums to add:**

`EquityAccountType` (Codex recommendation, all agree):
- `EQUITY_ACCOUNT_TYPE_MEMBER_SHARE_CAPITAL`
- `EQUITY_ACCOUNT_TYPE_STATUTORY_RESERVE_FUND`
- `EQUITY_ACCOUNT_TYPE_EDUCATION_FUND`
- `EQUITY_ACCOUNT_TYPE_COMMUNITY_DEVELOPMENT_FUND`
- `EQUITY_ACCOUNT_TYPE_PATRONAGE_PAYABLE`

`EquityTransactionType` (Codex recommendation, all agree):
- `EQUITY_TRANSACTION_TYPE_SHARE_SUBSCRIPTION`
- `EQUITY_TRANSACTION_TYPE_SHARE_REDEMPTION`
- `EQUITY_TRANSACTION_TYPE_PATRONAGE_ALLOCATION`
- `EQUITY_TRANSACTION_TYPE_DIVIDEND_DECLARATION`
- `EQUITY_TRANSACTION_TYPE_STATUTORY_FUND_ALLOCATION`

`JournalSourceType` (Codex + Claude agree):
- `JOURNAL_SOURCE_TYPE_SURPLUS_ALLOCATION`
- `JOURNAL_SOURCE_TYPE_PATRONAGE_REBATE`
- `JOURNAL_SOURCE_TYPE_DIVIDEND_ON_SHARE_CAPITAL`
- `JOURNAL_SOURCE_TYPE_SAVINGS_DEPOSIT`
- `JOURNAL_SOURCE_TYPE_SAVINGS_WITHDRAWAL`
- `JOURNAL_SOURCE_TYPE_INTEREST_ACCRUAL`
- `JOURNAL_SOURCE_TYPE_LOAN_LOSS_PROVISION`

**String-backed values to document (Codex):**
- `Client.customer_type`: `member`, `associate_member`, `institutional_member`
- `Balance.balance_type`: `share_capital`, `savings`, `principal_outstanding`, `arrears`
- `InventoryTransaction.transaction_type`: `loan_disbursement`, `loan_repayment`, `deposit`, `withdrawal`

### Phase 2: Structural Additions (Future)

- Member-specific fields on `client` or via `client_attribute`
- Loan account details (amortization, collateral, delinquency) -- possibly new proto
- Savings account details (passbook, holdout, dormancy)
- Surplus allocation engine records
- Share registry (count, par value, certificate number)
- Governance (AGM voting, board seats, committees)

## Hybrid Model Spectrum (Updated)

```
Pure Product                              Pure Service         Financial Intermediation
    |                                         |                        |
    v                                         v                        v
  Retail    Laundry    Med Aesthetics    Prof Services         Cooperatives
  ------    -------    --------------    -------------         ------------
  Sells     Processes  Consumes firm's   Sells people's        Lends money,
  goods     customer   inventory on      time (no physical     manages savings,
  from      property   patient           goods)                distributes surplus
  shelf                                                        to member-owners
```

Cooperatives break the existing spectrum because they are **financial intermediaries**, not product sellers or service providers. The "product" is a financial contract, the "inventory" is capital, and the defining year-end event is surplus allocation -- not sales recognition.

## Key Conceptual Shifts

| Concept | Other Verticals | Cooperatives |
|---|---|---|
| **Who is the customer?** | External buyer/client | Member-owner (both customer AND investor) |
| **What is being sold?** | Goods, services, treatments, time | Financial contracts (loans, savings) |
| **What is inventory?** | Physical goods, people, consumables | Loanable funds (money) |
| **What is a transaction?** | Sale, appointment, processing | Disbursement, repayment, deposit, withdrawal |
| **What is equity?** | Owner's investment | Member share capital (democratic, capped) |
| **What is profit?** | Net income for shareholders | Net surplus for member distribution |
| **What drives distribution?** | Capital ownership (shares) | Patronage (usage of services) |
| **Who governs?** | Board elected by shareholders (votes by shares) | Board elected by members (one member, one vote) |
| **Year-end event?** | Dividend declaration | Surplus allocation (reserve + CETF + CDF + patronage + interest) |

## Recommendations

### Immediate Actions
1. **Create `verticals/cooperatives/` README** using this research as the basis -- map every proto schema to cooperative term
2. **Add cooperative enum values** to `equity_account.proto`, `equity_transaction.proto`, and `journal_entry.proto` (Phase 1 list above)
3. **Document string-backed values** for `client.customer_type`, `balance.balance_type`, etc.

### Future Considerations
1. Dedicated loan account proto (beyond `subscription`) for full amortization, collateral, delinquency tracking
2. Surplus allocation workflow/engine as a first-class concept
3. Share registry management (certificate tracking, par value, redemption rules)
4. Governance module (AGM, voting, board seats) -- may be out of scope for initial vertical

## Source Reports
- [01-gemini-research.md](01-gemini-research.md) -- Web research + proto mapping (Gemini CLI --yolo)
- [02-codex-research.md](02-codex-research.md) -- Deep codebase analysis (Codex CLI gpt-5.4 --sandbox read-only)
- [03-claude-research.md](03-claude-research.md) -- Domain modeling + web research + proto mapping (Claude Opus 4.6)
