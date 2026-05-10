# Medical Aesthetics Scenarios: Sales (Billing & Revenue)

Sales scenarios cover the billing flow from treatment to checkout, including per-unit pricing, membership credit redemption, and group event billing.

---

## Walk-in Botox Appointment

Sarah Chen, 34, walks into the Beverly Hills clinic on a Tuesday afternoon. She's never been a member — just wants to try Botox for the first time after a friend's recommendation.

```
Sarah arrives for consultation
  │
  ├── Practitioner (Dr. Kim) assesses her face
  ├── Recommends: 20 units forehead + 12 units crow's feet + 8 units "11 lines"
  ├── Total: 40 units
  │
  ▼  Treatment performed (15 min)
  ┌──────────────────────────────────────────────────────┐
  │  InventoryTransaction (consumption)                   │
  │    ├── inventory_item_id: FK to "Botox 100-unit Vial" │
  │    ├── serial_number: "ALG-LOT-2025-0847"             │
  │    ├── quantity: 40 (units)                            │
  │    ├── performed_by: "DR-KIM-001"                      │
  │    ├── reference_type: "event"                         │
  │    ├── reference_id: "APT-2025-1847"                   │
  │    └── status: "consumed"                              │
  └──────────────────────────────────────────────────────┘
        │
        ▼  Checkout — rate lookup: PriceList "2025 Beverly Hills Menu"
  ┌──────────────────────────────────────────────────────┐
  │  Revenue (Sarah Chen, Visit Jan 14 2025)              │
  │    ├── client_id: FK to Sarah Chen                     │
  │    ├── location_id: FK to Beverly Hills Clinic         │
  │    │                                                  │
  │    ├── RevenueLineItem 1                              │
  │    │    ├── product_id: FK to "Botox"                  │
  │    │    ├── inventory_item_id: FK to Botox vial         │
  │    │    ├── inventory_serial_id: FK to lot ALG-2025-0847│
  │    │    ├── quantity: 40 (units)                        │
  │    │    ├── unit_price: $14.00                          │
  │    │    ├── total_price: $560.00                        │
  │    │    └── line_item_type: "item"                      │
  │    │                                                  │
  │    ├── RevenueLineItem 2 (retail upsell)              │
  │    │    ├── product_id: FK to "Post-Treatment SPF"     │
  │    │    ├── quantity: 1                                 │
  │    │    ├── unit_price: $48.00                          │
  │    │    └── line_item_type: "item"                      │
  │    │                                                  │
  │    └── Revenue.total_amount: $608.00                  │
  └──────────────────────────────────────────────────────┘
        │
        ▼
  ┌──────────────┐
  │ Payment      │
  │ Visa ****4821│
  │ $608.00      │
  └──────────────┘

Post-checkout:
  ├── Automated 24-hour check-in SMS sent
  ├── 14-day follow-up appointment auto-booked
  ├── Allergan Alle loyalty points credited to Sarah
  └── Rebook reminder set for 3.5 months out
```

**Key insight**: The Botox price ($14/unit) is a blended charge — it covers both the wholesale product cost (~$5/unit) and Dr. Kim's injection expertise. There's no separate "injector fee" line item.

---

## Beauty Bank Member Redemption

Lisa Park has been a "Glow Club" beauty bank member for 8 months, paying $200/month. She's accumulated $450 in credits and books a filler appointment.

```
Lisa's account before visit:
  Subscription "Glow Club - Beauty Bank"
    ├── price_plan: "$200/month"
    ├── metadata: {"balance": "450.00", "tier": "gold"}
    └── active since: Jun 2024

Lisa books: 1 syringe Juvederm Ultra (lips)
  │
  ▼  Treatment performed by NP Rodriguez
  ┌──────────────────────────────────────────────────────┐
  │  InventoryTransaction (consumption)                   │
  │    ├── inventory_item_id: FK to "Juvederm Ultra"      │
  │    ├── serial_number: "JUV-LOT-2025-1203"             │
  │    ├── quantity: 1 (syringe)                           │
  │    ├── performed_by: "NP-RODRIGUEZ-003"                │
  │    └── status: "consumed"                              │
  └──────────────────────────────────────────────────────┘
        │
        ▼  Member pricing: 10% off standard rate
  ┌──────────────────────────────────────────────────────┐
  │  Revenue (Lisa Park, Visit Feb 3 2025)                │
  │    │                                                  │
  │    ├── RevenueLineItem 1                              │
  │    │    ├── product_id: FK to "Juvederm Ultra"         │
  │    │    ├── quantity: 1 (syringe)                       │
  │    │    ├── unit_price: $650.00 (standard)              │
  │    │    ├── total_price: $650.00                        │
  │    │    └── line_item_type: "item"                      │
  │    │                                                  │
  │    ├── RevenueLineItem 2 (member discount)            │
  │    │    ├── quantity: 1                                 │
  │    │    ├── total_price: -$65.00 (10% member discount) │
  │    │    └── line_item_type: "discount"                  │
  │    │                                                  │
  │    └── Revenue.total_amount: $585.00                  │
  └──────────────────────────────────────────────────────┘
        │
        ▼  Payment from beauty bank balance
  ┌──────────────────────────────────────────────────────┐
  │  Payment 1: Beauty bank credit redemption             │
  │    ├── amount: $450.00 (full balance applied)          │
  │    └── type: "credit_redemption"                       │
  │                                                       │
  │  Payment 2: Card on file for remainder                 │
  │    ├── amount: $135.00                                 │
  │    └── type: "card"                                    │
  └──────────────────────────────────────────────────────┘

Lisa's account after visit:
  Subscription updated:
    └── metadata: {"balance": "0.00", "tier": "gold"}
    (balance rebuilds $200 on next billing date)
```

**Key insight**: The beauty bank balance lives in `subscription.metadata`. Member discounts use the same `RevenueLineItem` with `line_item_type: "discount"` pattern as retail, and split payment across credit redemption + card covers the gap.

---

## Botox Party Group Event

Jennifer hosts a "Galentine's Day Botox Party" for 6 friends at the clinic's private suite. As the host, she gets 25 free units of Botox.

```
Event "Galentine's Botox Party"
  ├── event_client: Jennifer (host) + 6 guests
  ├── event_product: "Botox" (party rate: $12/unit vs standard $14)
  ├── event_settings: Private Suite, Sat Feb 8, 4:00 PM
  └── Total guests treated: 7 (host + 6 friends)

Per-guest breakdown:
  ┌──────────────────────────────────────────────────────┐
  │  Guest 1 (Jennifer — host): 35 units                  │
  │    ├── RevenueLineItem: 35 units × $12 = $420         │
  │    ├── RevenueLineItem: -25 units × $12 = -$300       │
  │    │    └── line_item_type: "discount" (host perk)     │
  │    └── Jennifer pays: $120                             │
  │                                                       │
  │  Guest 2 (Amy): 30 units                               │
  │    ├── RevenueLineItem: 30 units × $12 = $360         │
  │    └── Amy pays: $360                                  │
  │                                                       │
  │  Guest 3 (Rachel): 40 units + 1 syringe filler         │
  │    ├── RevenueLineItem: 40 units Botox × $12 = $480   │
  │    ├── RevenueLineItem: 1 syringe Juvederm = $585      │
  │    │    (party guests also get member discount)         │
  │    └── Rachel pays: $1,065                             │
  │                                                       │
  │  ... (Guests 4-7 similar pattern)                      │
  └──────────────────────────────────────────────────────┘

Total event revenue:
  ├── 7 separate Revenue records (one per guest)
  ├── ~245 total Botox units consumed across 3 vials
  ├── 2 filler syringes consumed
  ├── Gross revenue: ~$3,800
  └── Each guest's InventoryTransaction references the same
      event_id: "EVT-PARTY-2025-0208"
```

**Key insight**: Group events generate one `Revenue` per guest (each guest has their own payment), but all `InventoryTransactions` reference the same `Event`. The host discount is a `"discount"` line item, keeping the full unit price visible for margin tracking.
