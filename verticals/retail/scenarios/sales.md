# Retail Scenarios: Sales

Sales scenarios cover the end-to-end revenue flow from product selection through payment, including pricing resolution, discounts, and multi-item transactions.

---

## Walk-in POS Purchase

```
Customer ──▶ Store #1 (NYC)
             │
             ├── Staff (Sales Associate) assists
             ├── Product: Sony WH-1000XM5 (Black)
             ├── InventoryItem at Store #1: quantity_available = 42
             │
             ▼
         ┌─────────┐     ┌─────────────────┐     ┌─────────────┐
         │ PriceList│────▶│ PriceProduct    │────▶│ Revenue     │
         │ "Q4 2025│     │ Sony @ $299.99  │     │ LineItem    │
         │ East    │     │ (overrides base │     │ qty: 1      │
         │ Coast"  │     │  $349.99)       │     │ price: $299 │
         └─────────┘     └─────────────────┘     └──────┬──────┘
                                                        │
         ┌──────────────┐     ┌─────────┐              │
         │ Inventory    │     │ Invoice │◀─────────────┘
         │ Transaction  │     │ Receipt │
         │ status:      │     └────┬────┘
         │ "completed"  │          │
         │ qty: -1      │     ┌────▼────┐
         └──────────────┘     │ Payment │
                              │ Card tap│
                              │ $299.99 │
                              └─────────┘
```

**Entities involved**: `Client`, `Staff`, `Location`, `Product`, `InventoryItem`, `PriceList`, `PriceProduct`, `InventoryTransaction`, `Revenue`, `RevenueLineItem`, `Invoice`, `Payment`

---

## Multi-Item Cart with Mixed Pricing

```
Customer adds 3 items to cart at Store #2 (LA):

Item 1: Sony WH-1000XM5
  ├── PriceList "Q4 West Coast" has PriceProduct → $289.99
  └── RevenueLineItem: qty 1, unit_price $289.99

Item 2: AirPods Pro (no PriceList override)
  ├── Falls back to Product.price → $249.00
  └── RevenueLineItem: qty 1, unit_price $249.00

Item 3: USB-C Cable × 3
  ├── PriceList "Q4 West Coast" has PriceProduct → $12.99
  └── RevenueLineItem: qty 3, unit_price $12.99

Revenue.total_amount = $289.99 + $249.00 + (3 × $12.99) = $577.96

Three InventoryTransactions created (one per InventoryItem, status: "completed")
Three RevenueLineItems created (one per line, all line_item_type: "item")
```

**Key insight**: `PriceProduct` overrides `Product.price` when a `PriceList` is active for the location. Items without a `PriceProduct` entry fall back to the base `Product.price`.

---

## VIP Member Discount at Checkout

```
Client (customer_type: "vip")
  └── Subscription → Plan "VIP Rewards"
       └── License → "10% off Electronics"
            │
            ▼
       collection_plan links Plan to Collection "Electronics"
            │
            ▼
       Product "Sony WH-1000XM5" is in Collection "Electronics"
            │
            ▼
       RevenueLineItem: qty 1, unit_price $299.99
       RevenueLineItem: qty 1, unit_price -$30.00 (line_item_type: "discount")
       ─────────────────────────────────────────
       Revenue.total_amount = $269.99
```

**Key insight**: Discounts are modeled as separate `RevenueLineItems` with `line_item_type: "discount"` and a negative amount, keeping the audit trail clean.
