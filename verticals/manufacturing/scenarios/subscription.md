# Manufacturing Scenarios: Subscription (Customer Supply Agreements)

In manufacturing, a `subscription` is an **active customer supply agreement** — the long-running commitment that periodically spawns Production-Order Jobs. The model is identical to other verticals (each Subscription points to a PricePlan and a Client) but the **Job cardinality is different**: one Subscription spawns *many* Production Orders over its lifetime.

---

## Scenario 1: OEM blanket order (recurring releases)

```
subscription "OEM-CHEVY-2026"
  ├── id: "sub-oem-chevy-2026"
  ├── client_id: FK → "Chevy"
  ├── price_plan_id: FK → "DM-2200 OEM Q1 rate" (then quarterly rolls)
  ├── plan_id: FK → "DM-2200 OEM Supply Programme 2026"
  ├── origin_type: ORIGIN_TYPE_SUBSCRIPTION
  ├── start_date: 2026-01-01
  ├── end_date: 2026-12-31
  ├── quantity: 12000                ← annual minimum
  ├── assigned_count: 5400           ← shipped year-to-date
  ├── available_count: 6600          ← remaining commitment
  ├── status: ACTIVE
  └── metadata: {"po_number": "CHEVY-PO-2026-014",
                 "incoterms": "FOB Plant",
                 "release_cadence": "monthly",
                 "lead_time_days": 21}
```

### How releases become Jobs

Monthly release scheduling fires from the `event` domain (the scheduled release event has `origin_type=SUBSCRIPTION` + `origin_id=sub-oem-chevy-2026`). The materialiser spawns a Production Order Job with:
- `Job.origin_type = ORIGIN_TYPE_SUBSCRIPTION`
- `Job.origin_id = "OEM-CHEVY-2026"`
- `Job.client_id = "clt-chevy"`
- `Job.demand_type = DEMAND_TYPE_MTO`
- `Job.cycle_period_start / cycle_period_end` = the release window dates
- `Job.cycle_index` = monotone ordinal (Release 1, 2, 3, …)

This is the same cyclic-subscription-jobs pattern documented for other verticals — manufacturing simply uses a 1-month cycle by default.

---

## Scenario 2: Reserved-capacity entitlement (tolling)

A toll-manufacturing customer pays a quarterly reserve fee for guaranteed machine-hours, then consumes them as Production Orders during the quarter.

```
subscription "TOLL-ACME-2026Q2"
  ├── client_id: FK → Acme Powdered Products
  ├── price_plan_id: FK → "Q2 Toll Reservation — 500h"
  ├── start_date: 2026-04-01
  ├── end_date:   2026-06-30
  ├── (no quantity field on Subscription itself — capacity is on license)
  └── status: ACTIVE

SubscriptionLicense
  ├── subscription_id: above
  ├── product_id: FK → "Toll Machine Hours" (a service-type Product)
  ├── total_units: 500
  ├── used_units: 312
  ├── available_units: 188
  └── unit: "machine_hour"
```

Each Production Order spawned for this customer consumes `SubscriptionLicense` units equal to its `JobActivity(EQUIPMENT)` hours. When `used_units >= total_units`, further Jobs require either a quarterly top-up or move to overage pricing.

---

## Scenario 3: Internal inter-company supply

Vertically-integrated firms have an internal "customer" — another business unit. The Subscription models the inter-company commitment.

```
subscription "INTERCO-MOTOR-FROM-PLANT-A"
  ├── client_id: FK → "Plant B internal customer record"
  ├── price_plan_id: FK → "Internal Transfer Pricing 2026"  (cost-plus or
                                                             cost-only)
  ├── (no commercial revenue path — settlement is internal)
  └── metadata: {"interco_account_id": "ic-2026-plant-a-b"}
```

`Job.billing_rule_type=NON_BILLABLE` keeps the inter-company Jobs out of the customer-revenue stream. The cost ledger entry still posts, just to an internal-transfer account instead of revenue/A-R.

---

## Scenario 4: One-shot Production Order (no subscription)

Not every Production Order needs a subscription. A make-to-stock MO has `Job.origin_type=ORIGIN_TYPE_INTERNAL` and no subscription link. A one-shot customer order (PO from a new customer without an agreement) has `Job.origin_type=ORIGIN_TYPE_ORDER` and `Job.sales_order_line_id` populated.

```
Job "MO-DM2200-20260601-007"
  ├── name: "Rush order — New Customer Co."
  ├── origin_type: ORIGIN_TYPE_ORDER       ← not subscription
  ├── origin_id: "order-2026-06-01-104"
  ├── client_id: "clt-new-customer"
  ├── sales_order_line_id: "so-line-2026-06-01-104-a"
  ├── demand_type: DEMAND_TYPE_MTO
  └── (no link to any subscription)
```

This shape is identical to the retail "service work order" shape (one Job per order, no recurring contract).

---

## Cardinality summary

| Subscription type | Job cardinality | Example |
|---|---|---|
| OEM blanket order | 1 Subscription × N Production Order Jobs (monthly) | Chevy 12k/year |
| Toll-manufacturing reservation | 1 Subscription × N Production Order Jobs + 1 SubscriptionLicense | Acme 500h/quarter |
| Inter-company supply | 1 Subscription × N Production Order Jobs (continuous) | Plant A → Plant B |
| One-shot customer order | 0 Subscriptions × 1 Production Order Job | New Customer Co. |
| Make-to-stock | 0 Subscriptions × N Production Order Jobs (from forecast) | Standard catalogue replenishment |

---

## Why the Subscription model fits manufacturing well

The Subscription proto already carries:
- `client_id` for the customer
- `price_plan_id` for the commercial commitment
- `quantity` / `assigned_count` / `available_count` for blanket-order remaining-balance
- `start_date` / `end_date` for the contract term
- Cyclic-Job materialisation (existing pattern)

These are exactly the fields a manufacturer needs for a long-running customer supply agreement. The only addition manufacturing benefits from is the `cycle_index` + `cycle_period_start/end` fields already on `Job` (Wave 1) for traceability of "which release window did this MO satisfy."

No new subscription-domain entity is required for manufacturing.
