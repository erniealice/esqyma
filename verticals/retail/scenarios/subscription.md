# Retail Scenarios: Subscription (Memberships & Enrollments)

Subscription scenarios cover customer enrollment in loyalty programs, tier upgrades, and B2B wholesale agreements.

---

## Customer Joins Loyalty Program

```
Client (walk-in customer, customer_type: "retail")
  │
  ├── Selects Plan "Gold Rewards"
  ├── Chooses PricePlan "Gold Annual - $99/year"
  │
  ▼
Subscription created:
  ├── client_id: FK to customer
  ├── price_plan_id: FK to "Gold Annual"
  ├── date_start: today
  ├── date_end: today + 1 year
  ├── quantity: 3 (benefit slots)
  └── auto_assign: true

License records created:
  ├── License 1: "10% off Electronics"
  ├── License 2: "Free shipping on online orders"
  └── License 3: "Early access to sales"

Invoice generated: $99.00
Payment processed: card on file
```

---

## Membership Upgrade (Gold → Platinum)

```
Existing Subscription:
  ├── plan: "Gold Rewards"
  ├── price_plan: "Gold Annual - $99/year"
  ├── date_start: Mar 1, 2025
  └── date_end: Mar 1, 2026

Upgrade flow:
  1. Current Subscription.active → false (or date_end → today)
  2. New Subscription created:
     ├── plan: "Platinum Rewards"
     ├── price_plan: "Platinum Annual - $199/year"
     ├── date_start: today
     └── date_end: today + 1 year
  3. Prorated Invoice: $199 - ($99 × remaining_months/12) = prorated amount
  4. New License records for Platinum perks
  5. Old License records deactivated
```

---

## B2B Wholesale Agreement

```
Client "Acme Corp" (customer_type: "wholesale")
  └── Delegate "John Smith" (Purchasing Agent)

Plan "Wholesale Buyer Program"
  ├── fulfillment_type: "physical"
  └── collection_plan → Collection "Wholesale Eligible Products"

PricePlan "Annual Wholesale - Net 30"
  ├── amount: 0.00 (no membership fee, volume-based pricing)
  ├── duration_unit: "year"
  └── duration_value: 1

Subscription:
  ├── client_id: FK to Acme Corp
  ├── metadata: {"payment_terms": "net-30", "credit_limit": "50000"}
  └── Purchases use wholesale PriceList instead of retail PriceList
```
