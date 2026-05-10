# Leasing Subscription Scenarios

In leasing, `subscription` = the **active lease contract** — the binding agreement between lessor and lessee for a specific asset over a defined term. Each subscription is the origin anchor for all Jobs spawned during the lease's lifecycle.

---

## Scenario A: New Lease Contract Origination

**Context:** Lessee Corp signs a 36-month industrial lease for one Excavator XJ-9000. Contract is prepared, deposit collected, asset staged.

```
subscription
  id:              LSE-2026-0047
  client_id:       lessee-corp-001
  price_plan_id:   pp-industrial-36mo-t2
  date_start:      2026-01-15
  date_end:        2029-01-14
  status:          "pending"    ← signed, not yet deployed
  quantity:        1
  metadata:
    asset_serial:         "EX-2024-0471"
    deposit_amount:       500000        (centavos = $5,000)
    mileage_cap:          NULL          (not applicable for excavator)
    maintenance_included: true
    renewal_option:       "12mo_at_20pct_discount"
    predecessor_id:       NULL          (new contract)
```

---

## Scenario B: Lease Activation (Deployed Status)

When the deployment Job completes and `LEASE_OUT` is recorded, the subscription transitions to `"deployed"`.

```
subscription (update)
  status: "deployed"     ← asset handed to lessee

subscription (update, after first maintenance cycle confirms ongoing)
  status: "active"       ← lease fully operational
```

---

## Scenario C: Mid-Term Asset Swap

**Context:** EX-2024-0471 develops a mechanical fault at month 14 that requires a 3-week repair. Lessor provides a substitute unit (EX-2024-0503) at no charge to lessee.

The original subscription remains active. The asset swap is handled via:
1. `LEASE_RETURN` transaction for EX-2024-0471 (temporary return)
2. Internal repair Job for EX-2024-0471
3. New `LEASE_OUT` transaction for EX-2024-0503 (substitute unit)
4. When EX-2024-0471 is repaired, reverse: `LEASE_RETURN` for EX-2024-0503, `LEASE_OUT` for EX-2024-0471

```
subscription (unchanged — same contract, no status change needed)
  id:     LSE-2026-0047
  status: "active"

subscription.metadata (updated)
  current_asset_serial:  "EX-2024-0503"   ← substitute unit
  swapped_at:            "2027-03-10"
  original_serial:       "EX-2024-0471"   ← primary unit
```

All swap AssetTransactions reference `LSE-2026-0047` as `reference_number` for audit traceability.

---

## Scenario D: Lease Renewal

**Context:** 90 days before expiry (2028-10-15), the account manager offers renewal. Lessee Corp accepts a 12-month renewal at the discount rate.

Renewals create a **new subscription** — not an update to the existing one.

```
subscription (new — renewal)
  id:              LSE-2029-0003
  client_id:       lessee-corp-001
  price_plan_id:   pp-renewal-standard   ← 20% discount renewal plan
  date_start:      2029-01-15            ← day after original expiry
  date_end:        2030-01-14
  status:          "pending"
  metadata:
    predecessor_subscription_id: "LSE-2026-0047"
    asset_serial:                "EX-2024-0471"

subscription (original — updated)
  id:     LSE-2026-0047
  status: "closed"    ← closed on renewal activation
```

The `predecessor_subscription_id` in metadata enables reporting continuity — "total lease tenure with this lessee" is computable by chaining subscription records.

---

## Scenario E: Early Termination

**Context:** Lessee Corp terminates the lease at month 18 (September 2027). Early termination fee applies (3 months' lease payment per the contract terms).

```
subscription (update)
  status: "terminating"
  date_end: 2027-09-30    ← updated from original 2029-01-14

revenue_line_item (early termination fee)
  description:    "Early Termination Fee — 3 months (per Clause 12.3)"
  total_price:    375000  (centavos = 3 × $1,250)
  revenue_category: "Fees"
```

The end-of-term return Job is created as normal (see operations.md Scenario 4). After return and settlement, status transitions to `"closed"`.

---

## Lease Contract Lifecycle State Machine

```
                    ┌─────────────────────────────────────────────────┐
                    │                                                 │
                    ▼                                                 │
    ┌──────────┐         ┌──────────┐         ┌──────────────┐       │
    │ PENDING  │────────▶│ DEPLOYED │────────▶│    ACTIVE    │       │
    │(signed,  │  deploy │(LEASE_OUT│  first   │(billing      │       │
    │ staged)  │  Job    │ recorded)│  invoice │ running)     │       │
    └──────────┘  done   └──────────┘  sent    └──────┬───────┘       │
         │                                            │               │
         │ (cancelled)                                │ (notice given) │
         ▼                                            ▼               │
    ┌──────────┐                              ┌──────────────┐        │
    │CANCELLED │                              │ TERMINATING  │        │
    │(no asset │                              │(return Job   │        │
    │ deployed)│                              │ in progress) │        │
    └──────────┘                              └──────┬───────┘        │
                                                     │               │
                                                     ▼               │
                                              ┌──────────────┐        │
                                              │   CLOSED     │        │
                                              │(LEASE_RETURN │        │
                                              │ done, settled│────────┘
                                              │ → RENEWED)   │
                                              └──────────────┘
                             DEFAULTED can be reached from ACTIVE
                             (non-payment or breach)
```
