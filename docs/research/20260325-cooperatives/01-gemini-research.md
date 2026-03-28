# Cooperative Domain Model for SaaS Integration

**Date:** 2026-03-25
**Author:** Gemini Agent
**Status:** Initial Draft

## 1. Introduction

This document outlines a domain model for cooperatives, intended to guide the integration of a "Cooperatives" vertical into the existing multi-vertical SaaS platform. The analysis is based on research into common cooperative principles and a review of the existing `esqyma` proto-based domain model.

The goal is to map cooperative-specific concepts to the platform's existing schemas (`EquityAccount`, `Subscription`, `Revenue`, etc.) to accelerate development and ensure a consistent architectural foundation.

## 2. Research Findings

The following sections summarize key aspects of the cooperative domain based on web research.

### 2.1. Cooperative Membership Model

Cooperatives are owned and controlled by their members. The membership structure is a core concept.

*   **Ownership and Equity:** Members are owners, not just customers. They contribute capital by purchasing "shares." This is distinct from a regular savings account. This initial investment is often called **Share Capital**.
*   **Democratic Control:** The fundamental principle is **"one member, one vote,"** regardless of the number of shares held. This ensures democratic governance.
*   **Membership Tiers:**
    *   **Regular Member:** A fully vested member who has met all requirements (e.g., minimum share capital), and has full voting rights.
    *   **Associate Member:** A member with limited rights, who has not yet met all requirements for regular membership. They typically cannot vote or be elected.
    *   **Honorary Member:** A non-voting, non-capital-contributing membership, often granted for recognition or advisory roles.

*(Sources: International Co-operative Alliance, various online credit union and cooperative resources)*

### 2.2. Cooperative Products & Services

While cooperatives exist in many industries (consumer, worker, producer), credit cooperatives (credit unions) offer a clear parallel to financial and subscription-based SaaS models.

*   **Core Financial Products:**
    *   **Loans:** Personal, business, agricultural, housing, salary, and emergency loans are common. Loan amortization can be calculated using various methods (declining balance, flat, add-on).
    *   **Savings:** Regular savings accounts, time deposits (fixed-term), and special-purpose savings accounts. These are distinct from share capital.
*   **Other Services:**
    *   **Insurance/Mutual Aid:** Members contribute to a fund that provides benefits in case of death or emergencies (a form of risk-pooling).
    *   **Community Programs:** Co-ops often provide training, financial literacy, and other community-focused services, funded by their surplus.

*(Sources: various online credit union and cooperative resources)*

### 2.3. Patronage Rebates & Dividends (Surplus Distribution)

This is a critical differentiator. Instead of profit, a cooperative generates a **"net surplus."** At the end of a fiscal year, this surplus is allocated and distributed according to the cooperative's bylaws and legal requirements (like the Philippine RA 9520).

*   **Patronage Refund/Rebate:** A portion of the surplus returned to members based on their *patronage* (i.e., how much they used the co-op's services). For a credit co-op, this could be based on interest paid on loans or interest earned on savings.
*   **Dividend / Interest on Share Capital:** A limited return paid to members based on their *equity* (number of shares held). The rate is often capped by law to prioritize the patronage refund.
*   **Statutory Funds (Allocation of Net Surplus):** Before distributing refunds and dividends, a portion of the net surplus is allocated to mandatory reserve funds. A common formula includes:
    *   **Reserve Fund:** (e.g., 10-20%) An indivisible fund to ensure the co-op's long-term stability.
    *   **Cooperative Education and Training Fund (CETF):** (e.g., 5-10%) To fund member and officer education.
    *   **Community Development Fund (CDF):** (e.g., 3-5%) For projects benefiting the community.
    *   **Optional Fund:** For other purposes as decided by the board.
*   **Approval Process:** The Board of Directors proposes the surplus allocation, which is then typically approved by the general assembly of members.

*(Sources: International Co-operative Alliance, Philippine Cooperative Development Authority resources)*

### 2.4. Key Financial & Accounting Concepts

*   **Share Capital vs. Savings Deposits:** Share capital represents ownership equity and is not typically withdrawable on demand. Savings deposits are a liability of the co-op to the member and are withdrawable.
*   **Net Surplus:** The equivalent of "net income" in a for-profit entity.
*   **ICA/Rochdale Principles:** A set of seven core principles guiding cooperatives:
    1.  Voluntary and Open Membership
    2.  Democratic Member Control
    3.  Member Economic Participation
    4.  Autonomy and Independence
    5.  Education, Training, and Information
    6.  Cooperation among Cooperatives
    7.  Concern for Community

*(Sources: International Co-operative Alliance, various financial glossaries)*

## 3. Domain Model Mapping

The existing `esqyma` protos can be adapted to model the cooperative domain. This mapping provides a starting point for the "Cooperatives" vertical.

| Cooperative Concept | Proposed `esqyma` Mapping | Justification & Notes |
| --- | --- | --- |
| **Cooperative Member** | `entity.v1.Client` | The `Client` schema is the central "customer" record. We can add a `client_type` field ("regular", "associate") or use metadata. The `client` is the "member." |
| **Membership Application Fee** | `revenue.v1.Revenue` | A one-time fee recorded as revenue. `revenue_category` can be "Membership Fees". |
| **Share Capital** | `ledger.v1.EquityAccount` | This is a perfect fit. Create an `EquityAccount` for each member with `account_type = EQUITY_ACCOUNT_TYPE_OWNERS_CAPITAL`. The `owner_name` would be the member's name. |
| **Share Capital Contribution**| `ledger.v1.EquityTransaction` | A member buying shares is an `EquityTransaction` of `type = EQUITY_TRANSACTION_TYPE_CONTRIBUTION` against their `EquityAccount`. |
| **Member Equity Account** | `ledger.v1.EquityAccount` | The `balance` field of the member's `EquityAccount` directly represents their share capital balance. |
| **Membership Program** | `subscription.v1.Plan` | A `Plan` can define the rules and benefits of being a cooperative member (e.g., eligibility for loans, insurance). |
| **Active Membership** | `subscription.v1.Subscription` | A `Subscription` links a `Client` (member) to a `Plan` (membership program). It represents the member's active status. The `quantity` could represent number of shares. |
| **Membership Benefits** | `subscription.v1.License` | `License` and `LicenseEntitlement` can model the specific perks a member receives, such as "LoanEligibility", "InsuranceCoverage", or "VotingRights". |
| **Savings/Time Deposits** | `subscription.v1.Balance` | The `Balance` schema can represent member savings. A `balance_type` can distinguish "Regular Savings" from "Time Deposit". It is linked to the `Client` but is separate from `EquityAccount`. |
| **Loan Product** | `product.v1.Product` / `Plan` | A loan type (e.g., "Salary Loan") can be modeled as a `Product` or as a `Plan` that members can subscribe to. |
| **Granted Loan** | `subscription.v1.Subscription` | When a member is granted a loan, they are essentially "subscribing" to the loan product. The `Subscription` tracks the active loan. `metadata` can store loan terms. |
| **Loan Repayments** | `revenue.v1.Revenue` | Each amortization payment is a `Revenue` transaction, with line items for principal and interest. |
| **Patronage Refund** | `ledger.v1.EquityTransaction` | A patronage refund can be modeled as a `DISTRIBUTION` transaction. It could credit the member's `Balance` (savings) or be paid out, debiting a liability account. |
| **Dividend on Capital** | `ledger.v1.EquityTransaction` | A dividend is a `DISTRIBUTION` from the co-op's `Retained Earnings` `EquityAccount` to the member's `EquityAccount` or `Balance`. |
| **Net Surplus** | `ledger.v1.EquityAccount` | The co-op's total net surplus for the year would reside in a `Retained Earnings` type `EquityAccount`. |
| **Statutory Funds (Reserve, CETF, CDF)** | `ledger.v1.EquityAccount` | These are special `EquityAccount`s of the cooperative itself, funded by transfers from the `Retained Earnings` account. |

## 4. Conclusion

The existing `esqyma` domain model is flexible and robust enough to support the core requirements of a cooperatives vertical with minimal schema changes. The primary effort will be in building the business logic for cooperative-specific workflows, particularly:

1.  **Member Onboarding:** A flow that creates a `Client`, an `EquityAccount`, and an initial `EquityTransaction` for share capital.
2.  **Loan Management:** Workflows for loan application, approval, disbursement, and collection, leveraging `Subscription` and `Revenue`.
3.  **Year-End Surplus Allocation:** A complex process that calculates the net surplus, allocates it to statutory funds, and computes patronage refunds and dividends for distribution to members.

By mapping cooperative concepts to the existing protos, we can leverage the platform's core services for entity management, subscriptions, and ledger accounting, significantly reducing the time to market for this new vertical.
