**Report**

Reviewed the matrix and example vertical docs in [verticals/README.md](/C:/Users/arnel/crad/code/monorepo/ichizen-golang/packages/esqyma/verticals/README.md), [retail/README.md](/C:/Users/arnel/crad/code/monorepo/ichizen-golang/packages/esqyma/verticals/retail/README.md), and [professional-services/README.md](/C:/Users/arnel/crad/code/monorepo/ichizen-golang/packages/esqyma/verticals/professional-services/README.md), then read all requested proto files. Key cooperative pressure points are visible in [client.proto](/C:/Users/arnel/crad/code/monorepo/ichizen-golang/packages/esqyma/proto/v1/domain/entity/client/client.proto#L35), [product.proto](/C:/Users/arnel/crad/code/monorepo/ichizen-golang/packages/esqyma/proto/v1/domain/product/product/product.proto#L31), [plan.proto](/C:/Users/arnel/crad/code/monorepo/ichizen-golang/packages/esqyma/proto/v1/domain/subscription/plan/plan.proto#L27), [inventory_transaction.proto](/C:/Users/arnel/crad/code/monorepo/ichizen-golang/packages/esqyma/proto/v1/domain/inventory/inventory_transaction/inventory_transaction.proto#L24), [equity_account.proto](/C:/Users/arnel/crad/code/monorepo/ichizen-golang/packages/esqyma/proto/v1/domain/ledger/equity_account/equity_account.proto#L16), and [journal_entry.proto](/C:/Users/arnel/crad/code/monorepo/ichizen-golang/packages/esqyma/proto/v1/domain/ledger/journal_entry/journal_entry.proto#L37).

## Complete Proto-to-Cooperative Mapping

| Proto schema | Cooperative term | Fit | Notes |
|---|---|---:|---|
| `client` | Member / Borrower / Depositor | Medium | Best current analog, but membership, ownership, and governance are missing. |
| `staff` | Loan officer / teller / collections staff | Good | Clean operational mapping. |
| `delegate` | Authorized representative / co-maker / guarantor contact | Medium | Works for organizational members; weak for guarantor semantics. |
| `admin` | Cooperative manager / branch admin / board-secretariat admin | Good | Clean operational mapping. |
| `group` | Member segment / chapter / committee / cluster | Medium | Usable for segmentation; not governance-aware. |
| `location` | Branch / satellite office / field unit | Good | Clean mapping. |
| `product` | Financial product | Medium | Can represent loan or savings product, but lacks financial-product semantics. |
| `product_variant` | Loan term/rate variant / savings tier | Medium | Works for term, tenor, collateralized vs unsecured variants. |
| `collection` | Product family / portfolio | Good | Personal loans, agri loans, savings, share capital, etc. |
| `price_list` | Rate sheet / interest-fee schedule | Good | Good for time/location-bound pricing. |
| `price_product` | Product rate / fee rule | Medium | Can hold nominal amounts/rates, but not full interest formulas. |
| `inventory_item` | Fund pool / loanable funds bucket / cash pool | Medium | Usable if “inventory” is money, but semantically stretched. |
| `inventory_serial` | Account number / certificate number / loan account identifier | Weak | Serial-tracking is awkward for financial accounts. |
| `inventory_transaction` | Deposit, withdrawal, disbursement, repayment, accrual | Medium | Strong enough for cash/fund movements if vocab is extended. |
| `inventory_depreciation` | Loan impairment / allowance / write-down | Weak | Not a good accounting fit for expected credit loss. |
| `plan` | Membership plan / savings plan / loan program | Medium | Works if plans define offering structure, not core account state. |
| `subscription` | Active membership / active loan / active savings account | Medium | Can represent ongoing relationship, but not full loan-account behavior. |
| `license` | Entitlement / share certificate / member benefit unit | Weak | Licensing model is software-shaped; poor fit for core cooperative finance. |
| `balance` | Savings balance / outstanding principal / arrears balance | Medium | Useful as rollup balance, but too thin for financial accounts. |
| `invoice` | Billing statement / amortization notice / demand notice | Weak | Too thin for loan schedules and collections. |
| `price_plan` | Membership dues / packaged fee plan / scheduled pricing | Medium | Usable for dues or packaged fees, not enough for amortization terms. |
| `revenue` | Interest income / fee income | Good | Solid fit for recognized income. |
| `revenue_line_item` | Interest charge / service fee / penalty / rebate line | Medium | Needs more line-item types than `item`/`discount`. |
| `revenue_category` | Income stream | Good | Interest, penalties, processing fees, insurance commissions. |
| `equity_account` | Member share capital account / reserve fund account | Medium | Very close, but current language is owner-centric, not member-centric. |
| `equity_transaction` | Share purchase/redemption / surplus distribution / fund allocation | Medium | Good base, but needs cooperative-specific transaction types. |
| `journal_entry` | GL posting for lending, deposits, equity, surplus allocation | Good | Already has loan/equity source types. |
| `account` | Chart of accounts | Good | Can model loans receivable, savings liabilities, share capital, funds. |
| `event` | Loan interview / AGM / member education / disbursement meeting | Good | Clean mapping for scheduled interactions. |
| `event_client` | Member attendee / participant | Good | Clean mapping. |
| `event_product` | Financial products discussed/booked | Medium | Works for booked products, not full underwriting objects. |
| `workflow` | Membership onboarding / loan processing / collections flow | Good | Strong fit. |
| `stage` | Application stage / underwriting phase / approval gate | Good | Strong fit. |
| `activity` | KYC, CI, appraisal, approval, release, collections task | Good | Strong fit. |
| `expenditure` | Operating expense / education fund expense / community fund disbursement | Medium | Good for true expenses, not for loan principal release. |
| `expenditure_line_item` | Expense line / fund allocation line | Medium | Works for real expenses only. |
| `expenditure_category` | Expense class / statutory-fund use class | Good | Clean mapping. |
| `asset` | Branch asset / IT equipment / foreclosed asset | Medium | Good for fixed assets; foreclosed assets are possible but not explicit. |
| `asset_category` | Asset class | Good | Branch equipment, vehicles, foreclosed property, etc. |

## Gap Analysis

**What fits today**
- A first cooperative vertical README can be produced now by treating `client` as member, `product` as loan/savings/share-capital offering, `collection` as product family, `price_list` as rate sheet, and `workflow` as loan or membership pipeline.
- Ledger, revenue, expenditure, and asset domains already support a credible cooperative back office.

**What needs schema changes**
- `client` needs first-class member semantics: `member_number`, `member_status`, `membership_date`, `exit_date`, `member_class`, `home_branch_id`.
- `product` needs financial semantics beyond price and fulfillment: product kind, interest method, compounding basis, amortization basis, minimum balance, collateral requirement, dividend eligibility.
- `subscription` is not enough for a real loan or savings account. The model lacks account-specific fields such as principal, interest rate basis, amortization schedule, maturity date, delinquency state, accrued interest, penalties, restructuring, write-off.
- `equity_account` and `equity_transaction` need member/share orientation. Current fields assume “owner” rather than “member,” and do not track share count, par value, certificate number, or patronage basis.
- year-end surplus allocation is only partially representable. Reserve fund, education fund, community fund, patronage rebate, and dividend on share capital need explicit types and usually explicit allocation records.
- `inventory_depreciation` is the wrong abstraction for cooperative credit loss. Loan-loss provisioning should be its own domain object or a richer ledger-driven construct.
- `invoice` and `balance` are too shallow for financial statements to members. Loan schedules, savings statements, passbooks, and aging notices have no first-class analog.

**Cooperative concepts with no existing proto analog**
- Member governance: board seats, committees, AGM resolutions, voting rights, quorum.
- Share registry details: share count, par value, certificate issuance, redemption restrictions.
- Loan account details: amortization table, due installments, collateral, guarantors/co-makers, delinquency aging, restructuring, write-off recovery.
- Savings/deposit account details: passbook, holdout balance, dormancy, interest capitalization.
- Surplus allocation engine: statutory percentages, patronage formulas, dividend eligibility, allocation runs.
- Regulatory/compliance data: KYC tiers, prudential ratios, loan classification buckets.

## Recommended New Enum Values

**True proto enums**
- `EquityAccountType`: `MEMBER_SHARE_CAPITAL`, `STATUTORY_RESERVE_FUND`, `EDUCATION_FUND`, `COMMUNITY_DEVELOPMENT_FUND`, `PATRONAGE_PAYABLE`, `DIVIDEND_PAYABLE`.
- `EquityTransactionType`: `SHARE_SUBSCRIPTION`, `SHARE_REDEMPTION`, `PATRONAGE_ALLOCATION`, `DIVIDEND_DECLARATION`, `STATUTORY_FUND_ALLOCATION`, `CAPITAL_BUILD_UP`.
- `JournalSourceType`: `SHARE_CAPITAL_RECEIPT`, `SAVINGS_DEPOSIT`, `SAVINGS_WITHDRAWAL`, `INTEREST_ACCRUAL`, `PATRONAGE_REBATE`, `DIVIDEND_ON_SHARE_CAPITAL`, `STATUTORY_SURPLUS_ALLOCATION`, `LOAN_LOSS_PROVISION`, `LOAN_WRITE_OFF`.
- Optional only if `license` is kept in scope: `LicenseType.MEMBERSHIP_UNIT` or `ACCOUNT_UNIT`.

**String-backed enum-like fields**
- `Client.customer_type`: `member`, `associate_member`, `borrower_only`, `depositor_only`, `institutional_member`.
- `Product.fulfillment_method`: `financial_account`, `loan_disbursement`, `deposit_account`.
- `Plan.fulfillment_type`: `membership`, `account`, `credit`.
- `InventoryTransaction.transaction_type`: `loan_disbursement`, `loan_repayment`, `deposit`, `withdrawal`, `interest_accrual`, `penalty_assessment`, `write_off`, `fund_transfer`.
- `InventoryTransaction.reference_type`: `loan_account`, `savings_account`, `membership`, `share_capital`, `workflow`.
- `RevenueLineItem.line_item_type`: `interest`, `fee`, `penalty`, `rebate`, `dividend`.
- `Balance.balance_type`: `principal_outstanding`, `available_savings`, `holdout`, `arrears`, `accrued_interest`.
- `Expenditure.expenditure_type`: `education_fund`, `community_fund`, `operating_expense`, `statutory_allocation`.

## Hybrid Model Spectrum

Cooperatives do not sit cleanly on the current product-to-service spectrum. If forced onto it, they sit to the right of Professional Services, but that still understates the difference.

`Retail -> Laundry -> Medical Aesthetics -> Professional Services -> Cooperatives`

The reason is that cooperatives are not primarily moving goods or selling labor. They are managing balance-sheet capacity:
- “Products” are financial contracts.
- “Inventory” is loanable funds.
- “Revenue” is interest and fees.
- “Equity” is member-owned share capital.
- The most important year-end workflow is surplus allocation, not just sales recognition.

So the better framing is: cooperatives are a **financial-intermediation vertical with strong equity/governance semantics**, not just another service vertical.