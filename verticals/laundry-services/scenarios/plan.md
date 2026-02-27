# Laundry Services Scenarios: Plan (Service Programs)

Plan scenarios cover the design of service programs — from residential subscriptions to B2B linen rental contracts and prepaid credit models.

---

## Residential Weekly Subscription Plan

The laundry business launches tiered weekly pickup plans to convert walk-in customers into predictable recurring revenue.

```
Plan "Weekly Pickup & Delivery"
  ├── name: "Weekly Pickup & Delivery"
  ├── description: "Scheduled weekly doorstep laundry service.
  │                 We pick up Monday, deliver Wednesday."
  ├── fulfillment_type: "schedule" (recurring time-based)
  ├── plan_location:
  │    ├── Downtown Zone (Mon pickup, Wed delivery)
  │    ├── Midtown Zone (Tue pickup, Thu delivery)
  │    └── Uptown Zone (Wed pickup, Fri delivery)
  └── collection_plan → Collection "Laundry"

PricePlan tiers:
  ┌─────────────────────────────────────────────────┐
  │ PricePlan "Starter - 2 Bags - $59/month"         │
  │   ├── amount: 59.00                               │
  │   ├── duration_unit: "month"                      │
  │   ├── duration_value: 1                           │
  │   └── Includes: 2 bags/month, up to 30 lbs each  │
  └─────────────────────────────────────────────────┘
  ┌─────────────────────────────────────────────────┐
  │ PricePlan "Standard - 4 Bags - $99/month"        │
  │   ├── amount: 99.00                               │
  │   └── Includes: 4 bags/month (weekly pickup)      │
  └─────────────────────────────────────────────────┘
  ┌─────────────────────────────────────────────────┐
  │ PricePlan "Family - 6 Bags - $139/month"         │
  │   ├── amount: 139.00                              │
  │   └── Includes: 6 bags/month, priority processing │
  └─────────────────────────────────────────────────┘

Each plan includes:
  ├── License 1: "Bag Allowance" → quantity per month
  ├── License 2: "Free Pickup & Delivery" → included
  └── License 3: "Stain Treatment" → included on all items
```

**Key insight**: `fulfillment_type: "schedule"` maps naturally to weekly pickup routes. The `plan_location` field governs which zones a customer can subscribe to — each zone has its own pickup/delivery day. The `License` model tracks bag allowance (like session credits in medical aesthetics).

---

## Hotel Linen Rental Program

The plant designs a comprehensive linen rental program for hotels — they own the textiles, launder them, deliver them, and replace them when worn.

```
Plan "Full-Service Hotel Linen Rental"
  ├── name: "Full-Service Hotel Linen Rental"
  ├── description: "We provide, launder, deliver, and replace
  │                 all bed and bath linens. 3-par minimum."
  ├── fulfillment_type: "physical" (plant owns & provides linens)
  ├── plan_location → All plant service areas
  └── collection_plan → Collection "Hospitality"

PricePlan structure (customized per hotel):
  ┌─────────────────────────────────────────────────────────┐
  │ PricePlan "Grand Hotel - 200 Rooms - Monthly"            │
  │   ├── amount: 15,000.00 (estimated monthly)               │
  │   ├── duration_unit: "year"                               │
  │   ├── duration_value: 5 (5-year contract)                 │
  │   │                                                      │
  │   ├── What's included:                                    │
  │   │    ├── Linen use (king sheets, bath towels, etc.)     │
  │   │    ├── Daily laundering and delivery                   │
  │   │    ├── RFID tracking per item                          │
  │   │    ├── Replacement at end-of-life (200 wash cycles)    │
  │   │    └── Quarterly inventory reconciliation               │
  │   │                                                      │
  │   ├── Pricing breakdown (per PriceList):                   │
  │   │    ├── Per sheet processed: $0.45                       │
  │   │    ├── Per towel processed: $0.35                       │
  │   │    ├── Per tablecloth processed: $1.20                  │
  │   │    └── Linen rental fee: included in per-piece rate     │
  │   │                                                      │
  │   └── Estimated volume: 200 rooms × 3-par = 600 sheet     │
  │        sets in rotation, ~200 processed daily               │
  └─────────────────────────────────────────────────────────┘

Rental vs. COG comparison:
  ├── Rental (this plan): Plant owns linen, bundled pricing
  │    └── subscription.metadata: {"model": "rental"}
  └── COG alternative: Hotel owns linen, processing-only pricing
       └── subscription.metadata: {"model": "cog"}
```

**Key insight**: `fulfillment_type: "physical"` signals that the plant is providing physical goods (linens) alongside the service. In the rental model, the plant's `InventoryItems` (RFID-tagged sheets) are assets they own and lend to hotels — similar to how a subscription box delivers physical products. The per-piece processing rate implicitly includes the linen rental fee.

---

## Prepaid Bag Credit Plan

For customers who don't want a monthly commitment but visit frequently, the plant offers a prepaid bag credit system at a discounted rate.

```
Plan "Bag Credits"
  ├── name: "Bag Credits"
  ├── description: "Buy bags in advance at a discount.
  │                 Use anytime, no expiration."
  ├── fulfillment_type: "license" (credit-based)
  ├── plan_location → All drop-off locations
  └── collection_plan → Collection "Laundry"

PricePlan options:
  ┌─────────────────────────────────────────────────┐
  │ PricePlan "5-Bag Pack - $70"                     │
  │   ├── amount: 70.00 (vs $15/bag walk-in = $75)   │
  │   ├── duration_unit: "year"                       │
  │   ├── duration_value: 99 (no expiration)          │
  │   └── Savings: 7%                                 │
  └─────────────────────────────────────────────────┘
  ┌─────────────────────────────────────────────────┐
  │ PricePlan "10-Bag Pack - $120"                   │
  │   ├── amount: 120.00 (vs $150 walk-in)            │
  │   └── Savings: 20%                                │
  └─────────────────────────────────────────────────┘

When purchased:
  Subscription created:
    ├── client_id: FK to customer
    ├── quantity: 10 (bags)
    ├── assigned_count: 0
    ├── available_count: 10
    └── metadata: {"type": "prepaid_credits"}

  License records:
    ├── License 1: "Bag Credit" — available
    ├── License 2: "Bag Credit" — available
    ├── ...
    └── License 10: "Bag Credit" — available

When a bag is dropped off:
  ├── License redeemed (assigned_count += 1)
  ├── RevenueLineItem: $0.00 due today (prepaid)
  └── If customer exceeds 10 bags: overage at walk-in rate
```

**Key insight**: Prepaid credits use `fulfillment_type: "license"` — identical to the medical aesthetics beauty bank. Each `License` represents one redeemable bag. The revenue was recognized upfront at purchase; individual redemptions show $0 at the register but still create `InventoryTransactions` for processing tracking.
