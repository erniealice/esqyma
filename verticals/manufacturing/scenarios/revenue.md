# Manufacturing Scenarios: Revenue (Shipment Recognition)

Revenue in manufacturing is recognised on **shipment** for most agreements (point-in-time, IFRS-15 step 5(b)), and **over time** for tolling / service-bureau arrangements (IFRS-15 step 5(a)). The existing centymo `revenue` / `revenue_line_item` model handles both, with `revenue_category` differentiating the streams.

---

## Scenario 1: Standard shipment revenue (OEM blanket order)

```
Job "MO-DM2200-20260512-002" (1000 units, MTO for Chevy) → COMPLETED

T+10  ship to customer
        InventoryMovement
          movement_type: MOVEMENT_TYPE_SELL
          from: fg_warehouse  to: NULL
          product: Drill Motor DM-2200  quantity: 1000

T+10  revenue recognition fires (existing centymo path)
        revenue
          ├── client_id: FK → clt-oem-chevy
          ├── price_plan_id: FK → "DM-2200 OEM Q1 rate"
          ├── subscription_id: FK → OEM-CHEVY-2026
          ├── revenue_category_id: FK → "OEM"
          ├── total_amount: 1000 × 750000 = 750,000,000 centavos (₱7.5M)
          ├── currency: "PHP"
          ├── period_start: 2026-05-22
          └── period_end:   2026-05-22

        revenue_line_item
          ├── revenue_id: above
          ├── product_id: FK → Drill Motor DM-2200
          ├── product_variant_id: FK → DM-2200-CORDED-220V
          ├── quantity: 1000
          ├── unit_price: 750000
          ├── total: 750,000,000
          └── job_id: FK → MO-DM2200-20260512-002  (traces back to the MO)
```

---

## Scenario 2: Tolling revenue (over-time, activity-driven)

Tolling jobs use `cost_flow_type=CONTRACT_ASSET` + `billing_rule_type=T_AND_M`. Each `JobActivity` posting drives a revenue recognition step (matching the existing professional-services activity-billing path at `bill_job_activities.go`).

```
Job "MO-ACME-TOLL-001" (cost_flow_type=CONTRACT_ASSET, T&M)
  ├── activity_labor   8h × ₱1,200/h  →  revenue_line_item ₱9,600
  ├── activity_material 5kg API × ₱400/kg billable rate  →  revenue_line_item ₱2,000
  └── activity_equipment 4h machine × ₱800/h  →  revenue_line_item ₱3,200

Each posting writes:
  - 1 job_activity row (cost capture)
  - 1 revenue_line_item row (recognition)
  - 1 job_cost_ledger_entry row (W4 — contract-asset ledger)
```

The revenue runs continuously over the Job's life; final invoice consolidates all `revenue_line_item` rows for the Job in the billing cycle.

---

## Scenario 3: Scrap-sale revenue (by-product monetised)

By-products accumulate in inventory until sold. The sale is a separate Revenue path, not part of the original production Job's settlement.

```
inventory_item @ byproduct_warehouse
  product: Steel Sheet Drop Cuts
  quantity_on_hand: 1450 kg

Customer "Scrap Recycler Co." buys 1000 kg @ ₱18/kg.

inventory_movement
  movement_type: MOVEMENT_TYPE_SELL
  from: byproduct_warehouse  to: NULL
  product: Steel Sheet Drop Cuts  quantity: 1000

revenue
  ├── client_id: FK → Scrap Recycler Co.
  ├── revenue_category_id: FK → "Scrap-Sale"
  └── total_amount: 1000 × 1800 = 1,800,000 centavos (₱18,000)

revenue_line_item
  ├── product_id: FK → Steel Sheet Drop Cuts
  ├── quantity: 1000
  ├── unit_price: 1800
  └── total: 1,800,000
```

The original MO that produced the drop cuts is not affected by this sale — the cost basis was already settled into by-product inventory at the original Job's close.

---

## Scenario 4: Damage / shortage chargeback on shipment

A pallet ships with 1000 units but the customer receives 998 (2 damaged in transit, returned at receiving). The customer-side claim flows back as a credit adjustment.

```
Original revenue row: 1000 × ₱7,500 = ₱7,500,000

Customer reports damage → CSR creates a credit revenue:

revenue (credit)
  ├── parent_revenue_id: FK → original
  ├── revenue_category_id: FK → "OEM"  (same category, tagged as credit)
  ├── total_amount: -15,000  (₱-15,000 — 2 units × ₱7,500)
  └── reason: "damaged_in_transit"

inventory_movement
  movement_type: MOVEMENT_TYPE_RETURN
  from: NULL  to: damaged_returns_holding
  product: Drill Motor DM-2200  quantity: 2

The damaged units sit in returns holding pending QC inspection — they may be
reworked (spawn a rework Job) or written off via inventory_depreciation.
```

---

## Revenue category breakdown (manufacturing)

Suggested `revenue_category` rows for a manufacturing workspace:

| revenue_category | When it applies |
|---|---|
| Direct | One-shot direct-to-customer sales |
| Distributor | Distributor-tier blanket orders |
| OEM | OEM customer supply agreements |
| Tolling | Service-bureau / toll-manufacturing |
| Aftermarket | Spare-parts / repair-shop sales |
| Inter-company | Internal Plant-to-Plant transfers |
| Scrap-Sale | By-product / recovered-material sales |
| D2C | Direct-to-consumer (if running a D2C line) |

These are data rows under the existing `revenue_category` entity — no schema changes needed.

---

## Reporting

The existing fycha revenue analytics + collection reports cover manufacturing's needs. Suggested manufacturer-flavoured views:

- **Revenue by stream** — group by `revenue_category` (Direct / Distributor / OEM / etc.)
- **Revenue by customer × month** — drill into top customers
- **Cost of goods sold** — sum of `job_cost_ledger_entry` (W4) tagged to revenue lines via `revenue_line_item.job_id`
- **Gross margin by SKU** — `revenue_line_item.total - sum(job_cost_ledger_entry for the producing Job × proportional allocation)`
- **Open orders / backlog** — sum of `subscription.available_count × product_price_plan.price` for active subscriptions
- **Toll-revenue WIP** — sum of `job_cost_ledger_entry` for Jobs with `cost_flow_type=CONTRACT_ASSET` and `billing_status != FULLY_BILLED`

All of these queries hit operational entities (cost ledger, revenue, subscription) — not GL accounts — per the project rule "reports query ops, not GL."
