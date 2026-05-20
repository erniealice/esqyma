# Manufacturing Scenarios: Client (Customer Types)

In manufacturing, the `client` table holds the buying side of the trade — the OEM customer, the distributor, the retail chain, the end-consumer of a direct-to-consumer line, or the inter-company internal "customer." The proto stays generic; the manufacturing facade distinguishes customer types via existing `customer_type` field + `group` segmentation.

---

## Scenario 1: OEM customer

```
client "Chevy"
  ├── id: "clt-oem-chevy"
  ├── name: "Chevy Tools North America"
  ├── customer_type: "wholesale"           ← OEM = wholesale tier
  ├── group_id: FK → "OEM Customers"       ← segmentation group
  ├── status: ACTIVE
  └── (standard address, contacts via delegate_client)

delegate "Sarah Buyer" (at Chevy)
  ├── role: "Buyer / Sourcing Manager"
  └── delegate_client → links Sarah to clt-oem-chevy
```

OEM customers tend to have:
- Long-term Customer Supply Agreements (Subscriptions)
- Per-customer pricing via `product_price_plan` rows tagged to their `price_plan`
- Quality requirements that map to `OutcomeCriteria` pinned to the BOM-and-Routing
- Their own configuration variants of the FG (`product_variant` with customer-spec attributes)

---

## Scenario 2: Distributor

```
client "Home Tools Co."
  ├── customer_type: "wholesale"
  ├── group_id: FK → "Distributors"
  └── status: ACTIVE
```

Distributors get distributor-tier pricing (lower margin) and standard product configurations. The Subscription is typically a blanket order with retailer-style release schedules.

---

## Scenario 3: Aftermarket / spare-parts customer

A repair shop buys spare parts (a subset of the manufacturer's catalogue) at aftermarket pricing.

```
client "Joe's Repair Shop"
  ├── customer_type: "retail"              ← buys at higher margin tier
  ├── group_id: FK → "Aftermarket"
  └── status: ACTIVE
```

Aftermarket customers may not have a Subscription — most are one-shot purchase orders. The Job flow is `Job.origin_type=ORIGIN_TYPE_ORDER` with no subscription link.

---

## Scenario 4: Internal inter-company "customer"

```
client "Plant B (internal)"
  ├── customer_type: "internal"
  ├── group_id: FK → "Inter-company"
  ├── status: ACTIVE
  └── metadata: {"interco_account_id": "ic-2026-plant-a-b"}
```

Used when a vertically-integrated firm tracks Plant A → Plant B transfers as quasi-customer transactions. The cost-flow type on the Job is `INTERNAL` or `CONTRACT_ASSET` depending on whether the receiving plant pays.

---

## Scenario 5: Direct-to-consumer (D2C)

Most manufacturers don't sell direct, but some run a small D2C line (boutique / artisan / regulatory-required for certain product classes).

```
client "Jane Smith"
  ├── customer_type: "retail"
  ├── group_id: FK → "D2C consumers"
  └── (standard B2C client shape)
```

The Job flow is `Job.origin_type=ORIGIN_TYPE_ORDER` with `Job.billing_rule_type=FIXED_FEE`. Volume is small; this surface reuses the retail vertical's POS-style flow.

---

## Quality requirements per client

Some OEM customers impose quality bars that exceed the manufacturer's default `OutcomeCriteria`. The cleanest way to encode this:

- Maintain a workspace-scoped `OutcomeCriteria` (the default).
- For a stricter customer, clone the criteria to a customer-scoped version (`scope=WORKSPACE` + `industry_code` tagging the OEM).
- The BOM-and-Routing's `template_task_criteria` pins point to the customer-scoped criteria version when that BOM is used for Jobs tied to that customer (via the customer's variant of the FG product).

This re-uses the `OutcomeCriteria.scope` + `industry_code` + `workspace_id` machinery without introducing a new "per-client quality spec" entity.

---

## Customer-specific BOMs

A custom OEM variant typically gets a dedicated BOM-and-Routing whose `output_product_variant_id` is the customer-specific variant. The JobTemplate `change_request_id` can carry the OEM's PO number that initiated the custom config (string FK until the change_request entity ships).

```
JobTemplate "BOM-DM2200-CHEVY-OEM-rev2"
  ├── output_product_id: FK → Drill Motor DM-2200
  ├── output_product_variant_id: FK → DM-2200-CHEVY-OEM
  ├── change_request_id: "CR-2026-04-15-CHEVY-OEM-init"
  └── (rest of the template — same Routing, different JobTemplateInput badge plate)
```
