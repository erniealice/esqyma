# Manufacturing Scenarios: Plan (Manufacturing Programmes)

A `plan` in manufacturing is the **commercial wrapper** around a long-running supply commitment — the OEM supply agreement, the toll-manufacturing contract, the blanket-order schedule. It is **not** the BOM (that's `job_template`) and **not** the production order (that's `job`). The plan carries the *terms* under which Jobs are spawned for the customer.

---

## Scenario 1: OEM annual supply agreement

A drill-motor plant commits to producing 12,000 units of DM-2200 for Chevy over fiscal 2026, with monthly release windows and a quarterly price review.

```
plan "DM-2200 OEM Supply Programme 2026"
  ├── id: "plan-oem-dm2200-2026"
  ├── name: "DM-2200 OEM Supply Programme — Chevy 2026"
  ├── description: "Annual blanket supply agreement, monthly releases,
                    quarterly pricing review"
  ├── fulfillment_type: "physical"   (goods delivered)
  ├── billing_kind: BILLING_KIND_MILESTONE  (per shipment milestone)
  └── workspace_id: FK → manufacturer's workspace

plan_location
  ├── plan_id: FK → plan-oem-dm2200-2026
  └── location_id: FK → Plant A          (this plan is fulfilled from Plant A only)

collection_plan
  ├── plan_id: FK → plan-oem-dm2200-2026
  └── collection_id: FK → "Finished Goods"

product_plan
  ├── plan_id: FK → plan-oem-dm2200-2026
  ├── product_id: FK → Drill Motor DM-2200
  ├── product_variant_id: FK → DM-2200-CORDED-220V  (specific variant for Chevy)
  └── (one ProductPlan row per SKU on the agreement)

price_schedule "OEM Pricing — Chevy 2026"
  ├── effective_from: 2026-01-01
  ├── effective_to:   2026-12-31
  └── location_id: FK → Plant A

price_plan "DM-2200 OEM Q1 rate"
  ├── price_schedule_id: FK → above
  ├── plan_id: FK → plan-oem-dm2200-2026
  ├── amount: 750000  (₱7,500/unit Q1 rate)
  ├── duration_unit: "month"
  ├── duration_value: 3    (Q1)
  └── billing_kind: BILLING_KIND_MILESTONE

product_price_plan
  ├── product_plan_id: FK → ProductPlan(DM-2200 × OEM plan)
  ├── price_plan_id: FK → above
  └── price: 750000  (per-unit centavos)
```

A new `price_plan` row is added each quarter as pricing is reviewed. The historical pricing is preserved by the schedule's effective dates — running reports for older periods reads the as-of price.

---

## Scenario 2: Toll-manufacturing programme

Plant runs another customer's IP — the customer ships raw, the plant converts, the plant ships back. Revenue is recognised over time per IFRS-15.

```
plan "Toll Programme — Acme Powdered Products 2026"
  ├── name: "Toll Manufacturing — Acme Powdered Products"
  ├── description: "Customer ships raw; plant converts; plant returns"
  ├── fulfillment_type: "service"  (service-style — customer owns the materials)
  ├── billing_kind: BILLING_KIND_TIME_AND_MATERIALS
  └── metadata: {"customer_owns_raw": true}

When Jobs spawn for this plan:
  Job.demand_type: DEMAND_TYPE_INTERNAL    (raw not on plant's inventory book)
  Job.cost_flow_type: COST_FLOW_TYPE_CONTRACT_ASSET
  Job.billing_rule_type: BILLING_RULE_TYPE_T_AND_M
```

The `cost_flow_type=CONTRACT_ASSET` directs the cost ledger into the contract-asset path, which the existing fayna `bill_job_activities.go` already supports (used by professional services for retainers). Revenue is recognised as activities post — the same IFRS-15 over-time pattern.

---

## Scenario 3: Blanket-order schedule (per-release production)

A retailer commits to 50,000 units over 12 months with monthly release schedules locked 4 weeks in advance.

```
plan "Retail Blanket — Home Tools Co. 2026"
  ├── billing_kind: BILLING_KIND_FIXED_FEE  (per shipment)
  ├── (with attached collection_plan / product_plan rows)
  └── metadata: {"release_schedule": "monthly",
                 "release_lock_window_days": 28}

  price_plan "DM-2200 Distributor Rate"
    amount: 650000  (₱6,500/unit — lower than OEM due to volume)

Schedule events (event domain) drive the cadence:
  event_recurrence: monthly
  event: "May 2026 Release — Home Tools Co."
    ├── client_id: FK → Home Tools Co.
    ├── plan_id: FK → blanket plan
    └── (quantity locked 28d before scheduled date)
```

When a scheduled release event is materialised, a Job is spawned with the locked quantity, `client_id` populated, `demand_type=DEMAND_TYPE_MTO`.

---

## Scenario 4: Surcharge schedule (commodity-indexed pricing)

For products with commodity content (copper-wire-bearing motors), pricing carries a surcharge schedule indexed to LME copper.

```
plan "DM-2200 — Copper Surcharge Pricing 2026"
  ├── (base plan above)
  └── metadata: {"surcharge_index": "LME_COPPER_USD",
                 "surcharge_basis": "kg_copper_per_unit",
                 "surcharge_pass_through_pct": 100}

price_plan "DM-2200 — May Surcharge"
  ├── price_schedule_id: above
  ├── duration_unit: "month"
  ├── duration_value: 1
  └── (the per-month surcharge value is computed externally and dropped here)
```

The surcharge logic is **out of scope for the universal proto** — it's an integration-layer concern. The pricing graph just carries the per-period price.

---

## Surface area for centymo

The existing centymo pricing graph (`PriceSchedule → PricePlan → ProductPricePlan` + `ProductPlan`) covers everything above. **No new entities are required for manufacturing plan management.** Manufacturing-specific lyngua labels render `plan` as "Manufacturing Programme," `price_plan` as "Programme Pricing," etc.

The main UI gap is **plan management for manufacturing** — most existing centymo plan/price views are tuned for retail/services. A manufacturing-flavoured plan list will benefit from:
- Filter chips for plan type (OEM / Toll / Distributor / Aftermarket / Internal-Transfer)
- An "Annual commitment" KPI (sum of `subscription.quantity` for active subscriptions on this plan)
- A "Shipped year-to-date" KPI (sum of `revenue_line_item.quantity` for revenues tagged to this plan's subscriptions)

These are list-page enhancements, not new entities.
