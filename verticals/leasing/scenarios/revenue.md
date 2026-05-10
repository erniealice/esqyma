# Leasing Sales Scenarios

Leasing revenue has three distinct streams: **recurring lease fees** (monthly/quarterly invoicing from active subscriptions), **service chargebacks** (billed per service engagement when outside included service), and **damage chargebacks** (end-of-term settlement). Each maps to a different `revenue_category`.

---

## Scenario A: Monthly Lease Invoice

**Context:** Monthly billing cycle runs on the 1st of each month. Lessee Corp's lease (LSE-2026-0047) generates its February 2026 invoice.

```
revenue
  id:              rev-lse-2026-0047-feb
  subscription_id: LSE-2026-0047
  client_id:       lessee-corp-001
  period_start:    2026-02-01
  period_end:      2026-02-28
  status:          "billed"

revenue_line_item
  revenue_id:   rev-lse-2026-0047-feb
  description:  "Lease Fee — Excavator XJ-9000 SN:EX-2024-0471 (Feb 2026)"
  quantity:     1
  unit_price:   125000     (centavos = $1,250)
  total_price:  125000
  line_item_type: "item"
  revenue_category: "Lease"

invoice
  id:           inv-lse-feb2026
  client_id:    lessee-corp-001
  revenue_id:   rev-lse-2026-0047-feb
  amount:       125000
  due_date:     2026-02-15
  status:       "sent"
```

---

## Scenario B: Late Payment Fee

**Context:** Lessee Corp pays the February invoice 10 days late. A late fee is applied per the lease terms (2% of outstanding balance).

```
revenue_line_item (additional line on next invoice)
  description:     "Late Fee — Feb 2026 invoice, 10 days overdue"
  quantity:        1
  unit_price:      2500     (centavos = 2% × $1,250)
  total_price:     2500
  line_item_type:  "fee"
  revenue_category: "Fees"
```

---

## Scenario C: Out-of-Scope Service Chargeback

**Context:** An ad-hoc repair (hydraulic leak, Scenario 3 in operations.md) is determined to be operator-caused damage, not normal wear. The service cost is charged to the lessee.

```
job_settlement
  job_id:         job-repair-0471-hydr-001
  status:         SETTLED
  total_amount:   178500   (centavos: towing $850 + parts $245 + labor $690)

revenue
  subscription_id:    LSE-2026-0047
  job_settlement_id:  settlement-hydr-001
  status:             "billed"

revenue_line_item
  description:      "Service Chargeback — Hydraulic Leak Repair (operator-caused)"
  total_price:      178500
  revenue_category: "Service"

revenue_line_item
  description:      "3rd-party towing — FastTow LLC"
  total_price:      85000
  revenue_category: "Service"
```

---

## Scenario D: End-of-Term Damage Chargeback

**Context:** End-of-term inspection finds a cracked boom arm. Damage chargeback of $3,500 is issued (details in operations.md Scenario 4).

```
revenue
  subscription_id:    LSE-2026-0047
  job_settlement_id:  settlement-return-0471
  status:             "billed"

revenue_line_item
  description:      "Damage Charge — Cracked boom arm section 3"
  total_price:      350000
  revenue_category: "Damages"
```

---

## Scenario E: Security Deposit Return (Credit)

**Context:** After all end-of-term charges are settled, the $5,000 deposit is returned less the $3,500 damage charge. The net return is $1,500.

```
balance (lessee deposit account)
  client_id:   lessee-corp-001
  opening:     500000    (original deposit in centavos)
  charges:     350000    (damage chargeback applied)
  net_return:  150000    (returned to lessee)

payment (refund)
  client_id:    lessee-corp-001
  amount:       150000
  payment_type: "refund"
  reference:    "LSE-2026-0047 deposit return"
```

---

## Revenue Category Summary for Leasing

| Category | What It Covers | Trigger |
|---|---|---|
| `"Lease"` | Recurring monthly / periodic lease fee | Billing cycle on active subscription |
| `"Service"` | Operator-caused repair chargebacks, out-of-scope service calls | JobSettlement on repair Jobs |
| `"Damages"` | End-of-term damage assessment | JobSettlement on return Job + DAMAGE_FOUND transaction |
| `"Fees"` | Late fees, administrative fees, permit fees | Rule-based fee application |
| `"Insurance"` | Insurance premium pass-through (if lessor provides coverage) | Monthly billing cycle (separate line) |
