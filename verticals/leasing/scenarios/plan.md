# Leasing Plan Scenarios

In leasing, `plan` = a **Lease Program** — a named offering that groups related lease pricing tiers (e.g., "12-Month Industrial Equipment Lease"). `price_plan` = the specific pricing tier within that program (deposit amount, monthly rate, renewal terms). `subscription` = the lessee's active enrollment in a program.

---

## Scenario A: 12-Month Industrial Equipment Lease Program

```
plan
  id:               plan-industrial-12mo
  name:             "12-Month Industrial Equipment Lease"
  description:      "Short-term lease for heavy machinery. Full maintenance included."
  fulfillment_type: "schedule"   ← term-based contract
  active:           true

plan_location
  plan_id:     plan-industrial-12mo
  location_id: loc-north-depot

plan_location
  plan_id:     plan-industrial-12mo
  location_id: loc-south-depot

price_plan
  id:              pp-industrial-12mo-t1
  plan_id:         plan-industrial-12mo
  name:            "12-Month Tier 1 (Standard)"
  amount:          5400000    (centavos = $54,000 / 12 months)
  duration_unit:   "month"
  duration_value:  12
  description:     "Deposit: $5,000. Monthly: $4,500. Full maintenance package."

price_plan
  id:              pp-industrial-12mo-t2
  plan_id:         plan-industrial-12mo
  name:            "12-Month Tier 2 (VIP / Volume)"
  amount:          4800000    (centavos = $48,000 / 12 months — 11% discount)
  duration_unit:   "month"
  duration_value:  12
  description:     "For lessees with 3+ active units. Deposit: $4,000."
```

---

## Scenario B: 24-Month IT Hardware Lease Program

```
plan
  id:               plan-it-hardware-24mo
  name:             "24-Month IT Hardware Lease"
  description:      "Office servers, workstations, networking gear."
  fulfillment_type: "schedule"

price_plan
  id:              pp-it-24mo-standard
  plan_id:         plan-it-hardware-24mo
  name:            "24-Month IT Standard"
  amount:          960000     (centavos = $9,600 / 24 months)
  duration_unit:   "month"
  duration_value:  24
  description:     "Deposit: $500. Monthly: $400. Includes OS support."

price_plan
  id:              pp-it-24mo-enterprise
  plan_id:         plan-it-hardware-24mo
  name:            "24-Month IT Enterprise (50+ units)"
  amount:          840000     (centavos = $8,400 — 12.5% volume discount)
  duration_unit:   "month"
  duration_value:  24
```

---

## Scenario C: 5-Year Commercial Real Estate Lease Program

```
plan
  id:               plan-commercial-re-5yr
  name:             "5-Year Commercial Office Lease"
  description:      "Office suites and flex space. NNN or gross lease options."
  fulfillment_type: "schedule"

price_plan
  id:              pp-re-5yr-nnn
  plan_id:         plan-commercial-re-5yr
  name:            "5-Year NNN (Triple Net)"
  amount:          0                      ← base rent set at subscription level
  duration_unit:   "month"
  duration_value:  60
  description:     "Lessee pays base rent + property tax + insurance + maintenance."

price_plan
  id:              pp-re-5yr-gross
  plan_id:         plan-commercial-re-5yr
  name:            "5-Year Gross Lease"
  amount:          0                      ← rent set at subscription level
  duration_unit:   "month"
  duration_value:  60
  description:     "Fixed monthly rent inclusive of all operating expenses."
```

Note: For commercial RE where each unit (suite number) has its own rate, `amount` on the `price_plan` is set to 0 and the actual rent is encoded in the `subscription.metadata` or via a `ProductPricePlan` line item override.

---

## Scenario D: Lease Renewal Program

```
plan
  id:               plan-renewal
  name:             "Lease Renewal Program"
  description:      "12-month extensions for assets returning from initial lease term."
  fulfillment_type: "schedule"

price_plan
  id:              pp-renewal-standard
  plan_id:         plan-renewal
  name:            "12-Month Renewal Rate"
  amount:          3600000    (centavos = $36,000 — 20% below initial term)
  duration_unit:   "month"
  duration_value:  12
  description:     "Available to lessees with clean payment history."
```

Renewals create a new `subscription` record. The predecessor lease is referenced via `subscription.metadata.predecessor_subscription_id` for reporting continuity.
