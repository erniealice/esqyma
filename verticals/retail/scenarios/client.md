# Retail Scenarios: Client (Customers)

Client scenarios cover customer registration, B2B onboarding, and loyalty tier progression.

---

## New Walk-in Customer Registration

```
Client
  ├── user → User (first_name: "Sarah", last_name: "Chen",
  │          email: "sarah@email.com", mobile: "+1-555-0123")
  ├── customer_type: "retail"
  ├── category → ClientCategory: "Walk-in"
  └── client_attribute:
       ├── key: "preferred_store", value: "Store #1 NYC"
       └── key: "marketing_opt_in", value: "true"
```

---

## Wholesale B2B Customer Onboarding

```
Client (the company)
  ├── company_name: "Acme Corp"
  ├── customer_type: "wholesale"
  ├── street_address, city, province, postal_code ← billing address
  ├── category → ClientCategory: "B2B", "Tier 1 Wholesale"
  │
  ├── Delegate 1 (Purchasing Agent)
  │    ├── user → User (first_name: "John", last_name: "Smith")
  │    └── delegate_client → links to Acme Corp
  │
  └── Delegate 2 (Finance Contact)
       ├── user → User (first_name: "Lisa", last_name: "Wong")
       └── delegate_client → links to Acme Corp

Workspace setup:
  └── WorkspaceUser for each delegate → roles: "buyer", "finance"
```

---

## VIP Upgrade Based on Spending

```
Client "Sarah Chen" (customer_type: "retail")
  │
  │ Total Revenue where client_id = Sarah, last 12 months = $5,200
  │ VIP threshold: $5,000
  │
  ▼
Client updated:
  ├── customer_type: "retail" → "vip"
  ├── client_attribute: key "vip_since", value "2025-11-15"
  └── client_category: add "VIP" category

New Subscription auto-created:
  └── Plan "VIP Rewards" → PricePlan "VIP Complimentary"
```
