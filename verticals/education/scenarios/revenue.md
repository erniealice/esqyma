# Education Scenarios: Sales (Tuition Revenue & Billing)

In education, the revenue flow is: enrollment `Subscription` → recurring billing cycle → `Revenue` + `RevenueLineItem` rows → `Invoice` → `Payment`. Each `RevenueLineItem` maps to a distinct charge (tuition, lab fee, materials fee), giving per-line visibility for financial reporting and parent billing statements.

---

## Monthly Tuition Invoice — Installment Plan

```
Subscription "sub-alicia-g10-2026"
  ├── client_id: "clt-alicia-mendoza"
  └── price_plan_id: "pp-g10-regular"  (PHP 60,000/term → 3 installments of PHP 20,000/mo)

End of June — first monthly billing cycle fires:
  │
  ▼
  ┌────────────────────────────────────────────────────────────┐
  │  Revenue "Alicia Mendoza — Term 1 Tuition — June 2026"     │
  │    ├── client_id: "clt-alicia-mendoza"                     │
  │    ├── subscription_id: "sub-alicia-g10-2026"              │
  │    ├── status: "draft"                                      │
  │    └── revenue_category_id: FK → "Tuition Revenue"         │
  └────────────────────────────────────────────────────────────┘
        │
        ├── RevenueLineItem 1: Tuition (base)
        │     ├── description: "Grade 10 Tuition — June installment"
        │     ├── quantity: 1
        │     ├── unit_price: 2000000   (centavos = PHP 20,000)
        │     ├── total_price: 2000000
        │     └── line_item_type: "item"
        │
        ├── RevenueLineItem 2: Laboratory fee
        │     ├── description: "Science Lab Fee — June"
        │     ├── quantity: 1
        │     ├── unit_price: 200000    (centavos = PHP 2,000)
        │     ├── total_price: 200000
        │     └── line_item_type: "item"
        │
        ├── RevenueLineItem 3: Materials fee
        │     ├── description: "Workbooks & Consumables — June"
        │     ├── quantity: 1
        │     ├── unit_price: 150000    (centavos = PHP 1,500)
        │     ├── total_price: 150000
        │     └── line_item_type: "item"
        │
        └── Revenue.total_amount: 2350000  (PHP 23,500)
              │
              ▼
  ┌──────────────────────┐    ┌──────────────────────────────┐
  │  Invoice INV-2026-441 │───▶│  Payment (GCash / Bank xfer) │
  │  PHP 23,500           │    │  amount: 2350000             │
  │  due: July 10         │    │  date_paid: 2026-07-05       │
  └──────────────────────┘    └──────────────────────────────┘
  Revenue.status: "draft" → "invoiced" → "paid"
```

**Entities involved**: `Subscription`, `Revenue`, `RevenueLineItem`, `Invoice`, `Payment`

---

## Full-Term Upfront Payment

```
Parent pays full term tuition on enrollment (June):

  Revenue "Alicia Mendoza — Term 1 — Full Payment"
    ├── RevenueLineItem: Tuition (full term)
    │     ├── unit_price: 6000000   (PHP 60,000)
    │     └── total_price: 6000000
    ├── RevenueLineItem: Lab Fee (full term)
    │     ├── unit_price: 600000    (PHP 6,000)
    │     └── total_price: 600000
    └── Revenue.total_amount: 6600000  (PHP 66,000)

  Invoice: PHP 66,000  (one-time, due June 30)
  Payment: received June 25 — Revenue.status → "paid"

  Deferred Revenue (if school follows accrual accounting):
    DeferredRevenue.amount: 6600000
    DeferredRevenue.recognition_period: 4 months (June–September)
    Monthly recognition: 1,650,000 centavos / month
```

**Key insight**: Full upfront payment generates `DeferredRevenue` rows for the months not yet earned. The `deferred_revenue` entity tracks the unrecognized portion until each month closes.

---

## Scholarship Discount on Invoice

```
Marco Villanueva receives a 50% scholarship approved August 1:

  Original Revenue "Marco — Term 1 — August installment"
    └── RevenueLineItem: Tuition → PHP 20,000 (full rate)

  Scholarship credit applied:
  ┌────────────────────────────────────────────────────────────┐
  │  RevenueLineItem (credit/discount)                         │
  │    ├── description: "CHED Scholar Discount — 50%"          │
  │    ├── quantity: 1                                         │
  │    ├── unit_price: -1000000   (−PHP 10,000)                │
  │    ├── total_price: -1000000                               │
  │    └── line_item_type: "discount"                          │
  └────────────────────────────────────────────────────────────┘

  Net invoice amount: PHP 20,000 − PHP 10,000 = PHP 10,000
  RevenueLineItem.scholarship_ref stored in description field.
```

---

## Sibling / Multi-Child Household

```
Roberto Mendoza has two children enrolled:
  ├── Alicia Mendoza → Subscription "sub-alicia-g10-2026"
  └── Carlo Mendoza  → Subscription "sub-carlo-g8-2026"

Two separate Revenue records (one per student per cycle).
Both invoices can be consolidated on a single parent statement:
  Query: SELECT * FROM invoice
    WHERE client_id IN ('clt-alicia-mendoza', 'clt-carlo-mendoza')
      AND delegate_id = 'del-roberto-mendoza'
    ORDER BY due_date;

No "family billing" entity needed — DelegateClient join + invoice
query covers the consolidated view.
```

---

## Year-End Revenue Report

```
Revenue summary for Grade 10 program — Term 1 2026:

  SELECT
    revenue_category_id,
    COUNT(DISTINCT client_id)     AS enrolled_students,
    SUM(total_price)               AS total_revenue_centavos
  FROM revenue_line_item rli
  JOIN revenue r ON rli.revenue_id = r.id
  JOIN subscription s ON r.subscription_id = s.id
  WHERE s.price_plan_id = 'pp-g10-regular'
    AND r.cycle_period_start = '2026-06-01'
    AND r.status IN ('invoiced', 'paid')
  GROUP BY revenue_category_id;

Result rows:
  ├── "Tuition Revenue"    → 240 students → PHP 4,800,000
  ├── "Lab Fees"           → 240 students → PHP 480,000
  └── "Materials Fees"     → 240 students → PHP 360,000
  Total term revenue: PHP 5,640,000
```

---

## What's NOT a Revenue Event

- **Internal grade recording**: `TaskOutcome` rows (grades, scores) have no revenue impact. The academic record and the financial record are completely separate chains.
- **Library fines or lost-book charges**: These are ad-hoc `Revenue` rows (`origin_type = ORIGIN_TYPE_AD_HOC`), not subscription billing cycles.
- **Government-mandated free education** (DepEd public schools): `PricePlan.amount = 0`. Revenue is PHP 0. Jobs still run for academic tracking. No financial entries generated.
