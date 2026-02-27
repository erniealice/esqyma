# Retail Scenarios: Plan (Loyalty Programs)

Plan scenarios cover loyalty and membership program setup, including tier configurations, pricing, and location availability.

---

## Launch a New Loyalty Tier

```
Plan "Platinum Rewards"
  ├── name: "Platinum Rewards"
  ├── description: "Top-tier loyalty with exclusive perks"
  ├── fulfillment_type: "license" (benefit entitlements)
  ├── plan_location → Store #1 (NYC), Store #2 (LA)  ← available stores
  ├── collection_plan → Collection "Premium Products" ← eligible products
  └── thumbnail_url: "/images/platinum-badge.png"

PricePlan options:
  ├── "Platinum Annual" → amount: $199, duration: 1 year
  └── "Platinum Monthly" → amount: $19.99, duration: 1 month
```

---

## Seasonal VIP Early Access Plan

```
Plan "Holiday VIP Early Access 2025"
  ├── fulfillment_type: "schedule" ← time-based (reserved shopping hours)
  ├── plan_location → All stores
  └── collection_plan → Collection "Holiday 2025 Collection"

PricePlan "Early Access Pass"
  ├── amount: 0.00 (free for existing VIP members)
  ├── duration_unit: "day"
  └── duration_value: 3 (Nov 28-30)

Subscription created per customer:
  ├── client_id: FK to VIP customer
  ├── date_start: Nov 28
  └── date_end: Nov 30

Event "VIP Early Access Shopping"
  ├── start_date_time_utc: Nov 28, 6:00 AM
  ├── end_date_time_utc: Nov 28, 10:00 AM
  └── event_client → registered VIP members
```
