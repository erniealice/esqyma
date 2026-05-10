# Mutual — Product Scenarios

In a cooperative, `product` represents the **services or goods offered to members**.
A key pattern is **member vs. nonmember pricing** — the same product has different prices
depending on whether the buyer is a member or not. This is modeled via `ClientCategory`-linked
`ProductPricePlan` entries or separate price schedules.

---

## Scenario 1: Grocery Co-op — Member vs. Nonmember Price Differentiation

**Context**: Sunrise Grocery Co-operative. Organic rice is sold at member price to
members and at retail price to non-members.

### Product definition

```sql
INSERT INTO product (
  id, name, workspace_id,
  product_kind, delivery_mode, tracking_mode,
  price,         -- base (nonmember) price
  unit,
  active
) VALUES (
  'prod-organic-rice', 'Organic Rice (Premium)', 'ws-grocoop',
  'stocked_good', 'instant', 'bulk',
  3500,           -- PHP 35.00/kg nonmember price (centavos)
  'kg',
  true
);
```

### Two price schedules — one per customer class

```sql
-- Member price schedule
INSERT INTO price_schedule (
  id, name, workspace_id, active
) VALUES (
  'ps-member', 'Member Prices', 'ws-grocoop', true
);

-- Nonmember price schedule
INSERT INTO price_schedule (
  id, name, workspace_id, active
) VALUES (
  'ps-nonmember', 'Nonmember Prices', 'ws-grocoop', true
);

-- Member price plan: PHP 30.00/kg
INSERT INTO price_plan (
  id, name, price_schedule_id, workspace_id, active
) VALUES (
  'pp-rice-member', 'Organic Rice — Member Price', 'ps-member', 'ws-grocoop', true
);

-- Per-product-per-plan pricing
INSERT INTO product_price_plan (
  id, price_plan_id, product_id,
  amount, workspace_id, active
) VALUES (
  'ppp-rice-member', 'pp-rice-member', 'prod-organic-rice',
  3000,  -- PHP 30.00/kg for members (centavos)
  'ws-grocoop', true
);

-- Nonmember price plan: PHP 35.00/kg (the product default price)
INSERT INTO product_price_plan (
  id, price_plan_id, product_id,
  amount, workspace_id, active
) VALUES (
  'ppp-rice-nonmember', 'pp-rice-nonmember', 'prod-organic-rice',
  3500,  -- PHP 35.00/kg for nonmembers (centavos)
  'ws-grocoop', true
);
```

---

## Scenario 2: Worker Co-op — Labor Service Products

**Context**: Makati Cleaners Cooperative. Their service catalog uses standard
`product_kind = 'service'` entries.

```sql
-- Deep cleaning service (billed per session)
INSERT INTO product (
  id, name, workspace_id,
  product_kind, delivery_mode, tracking_mode,
  price, unit, active
) VALUES (
  'prod-deep-clean', 'Deep Cleaning Service', 'ws-makati-cleaners',
  'service', 'scheduled', 'none',
  300000,   -- PHP 3,000 per session (nonmember/commercial rate, centavos)
  'session', true
);

-- Member price: PHP 2,500 per session (for solidarity members)
INSERT INTO product_price_plan (
  id, price_plan_id, product_id,
  amount, workspace_id, active
) VALUES (
  'ppp-deepclean-member', 'pp-member-prices', 'prod-deep-clean',
  250000,   -- PHP 2,500 for members (centavos)
  'ws-makati-cleaners', true
);
```

---

## Scenario 3: Credit Union — Financial Service Products

**Context**: Bulacan Cooperative Credit Union. Financial products are modeled as
`product_kind = 'service'` with delivery_mode variants.

```sql
-- Regular Savings Account service
INSERT INTO product (
  id, name, workspace_id,
  product_kind, delivery_mode, tracking_mode,
  active
) VALUES (
  'prod-savings', 'Regular Savings Account', 'ws-bccu',
  'service', 'subscription', 'none',
  true
);

-- Share Capital product (member's equity stake)
INSERT INTO product (
  id, name, workspace_id,
  product_kind, delivery_mode, tracking_mode,
  price, unit, active
) VALUES (
  'prod-share', 'Membership Share', 'ws-bccu',
  'service', 'instant', 'none',
  1000,    -- PHP 10.00 per share (centavos)
  'share', true
);
```

---

## Scenario 4: Agricultural Co-op — Produce Marketing Products

**Context**: Central Luzon Farmers Co-op acts as a marketing agent for its producer-members.
They sell members' produce to buyers. The "product" is the produce.

```sql
-- Palay (unhusked rice) — co-op marketed product
INSERT INTO product (
  id, name, workspace_id,
  product_kind, delivery_mode, tracking_mode,
  price, unit, active
) VALUES (
  'prod-palay', 'Palay (Premium Grade)', 'ws-clfco',
  'stocked_good', 'shipped', 'bulk',
  2200,    -- PHP 22.00/kg market price (centavos)
  'kg', true
);
```

The co-op sells this product to external buyers. Revenue from nonmember buyers is
classified as **nonmember-sourced** revenue for IRS Sub-T or equivalent tax treatment.
Revenue from sales to members is **member-sourced**.
