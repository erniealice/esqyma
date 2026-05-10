# Leasing Client Scenarios

In leasing, `client` = the **lessee** — the company or individual renting the asset. The lessee is the billing counterparty, the party named in the lease contract, and the `client_id` anchor for all Jobs spawned from that contract.

---

## Scenario A: New Commercial Lessee Onboarding

**Context:** Lessee Corp, a construction company, wants to lease two excavators. Credit check passed. Contract is prepared.

### Field-Level Writes

**Client (Lessee):**
```
client
  id:              lessee-corp-001
  name:            "Lessee Corp"
  customer_type:   "wholesale"   ← long-term commercial contract
  status:          "active"
  tax_id:          "LCS-9021-B"
  email:           "accounts@lesseecorp.com"
  phone:           "+1-800-555-0100"
  notes:           "Credit check: APPROVED 2026-01-10. Limit: $2M"
```

**Delegate (Authorized contact):**
```
delegate
  id:          del-lessee-ops-director
  name:        "Maria Santos"
  title:       "Operations Director"
  email:       "m.santos@lesseecorp.com"

delegate_client
  delegate_id: del-lessee-ops-director
  client_id:   lessee-corp-001
```

**Balance (security deposit):**
```
balance
  client_id:   lessee-corp-001
  amount:      500000   (centavos = $5,000 deposit)
  type:        "deposit"
  reference:   "LSE-2026-0047"
```

---

## Scenario B: Adding a Designated Operator

**Context:** Lessee Corp designates a specific employee as the authorized operator for the leased excavator. This person's details are recorded as a delegate.

```
delegate
  id:          del-operator-carlos
  name:        "Carlos Mendez"
  title:       "Senior Equipment Operator"
  email:       "c.mendez@lesseecorp.com"
  notes:       "Operator License #OL-2024-8821, expiry 2027-06-30"

delegate_client
  delegate_id: del-operator-carlos
  client_id:   lessee-corp-001
```

---

## Scenario C: Customer Tier Upgrade

**Context:** After 2 years, Lessee Corp expands their fleet to 5 units. Account manager upgrades them to VIP tier for volume pricing.

```
client (update)
  customer_type: "vip"   ← unlocks VIP lease rate card
  notes:         "Upgraded 2028-01-15. Fleet: 5 active units."
```

---

## Scenario D: Multi-Site Lessee (Location Setup)

**Context:** Lessee Corp operates from 3 construction sites. Each is registered as a Location so AssetTransaction custody records are specific.

```
location
  id:    loc-lessee-site-a
  name:  "Lessee Corp - Construction Site A (Northridge)"
  type:  "customer_site"
  notes: "Access: weekdays 6am-6pm. Contact: site-super@lesseecorp.com"

location
  id:    loc-lessee-site-b
  name:  "Lessee Corp - Construction Site B (Eastgate)"
  type:  "customer_site"

location
  id:    loc-lessee-site-c
  name:  "Lessee Corp - Construction Site C (Southport)"
  type:  "customer_site"
```

These locations are used as `to_location_id` on `LEASE_OUT` transactions and `from_location_id` on `LEASE_RETURN` transactions.
