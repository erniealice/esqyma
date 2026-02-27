# Professional Services Scenarios: Client (Client Companies)

Client scenarios cover company onboarding, representative management, and account tiering for professional services firms.

---

## New Client Company Onboarding

```
Acme Corp wants to engage the firm for consulting services.
  │
  ▼
Step 1: Create the Client (the company)
  ┌──────────────────────────────────────────────────────┐
  │  Client                                               │
  │    ├── company_name: "Acme Corp"                       │
  │    ├── customer_type: "retail" (project-based client)  │
  │    ├── street_address: "123 Innovation Blvd"           │
  │    ├── city: "San Francisco"                           │
  │    ├── province: "CA"                                  │
  │    ├── postal_code: "94105"                            │
  │    ├── category → ClientCategory:                      │
  │    │    ├── "Technology"    (industry)                  │
  │    │    └── "Mid-Market"   (segment)                   │
  │    └── client_attribute:                               │
  │         ├── key: "revenue_size", value: "$50M-$200M"   │
  │         ├── key: "payment_terms", value: "net-30"      │
  │         └── key: "referral_source", value: "conference"│
  └──────────────────────────────────────────────────────┘

Step 2: Create Delegates (the people at Acme)
  ┌──────────────────────────────────────────────────────┐
  │  Delegate 1 (Project Sponsor)                         │
  │    ├── user → User:                                    │
  │    │    ├── first_name: "Sarah"                        │
  │    │    ├── last_name: "Park"                           │
  │    │    ├── email: "sarah.park@acme.com"                │
  │    │    └── mobile: "+1-555-0199"                       │
  │    └── delegate_client → links to Acme Corp             │
  │                                                       │
  │  Delegate 2 (Technical Lead)                           │
  │    ├── user → User:                                    │
  │    │    ├── first_name: "James"                        │
  │    │    ├── last_name: "Wu"                             │
  │    │    └── email: "james.wu@acme.com"                  │
  │    └── delegate_client → links to Acme Corp             │
  │                                                       │
  │  Delegate 3 (Finance / AP Contact)                     │
  │    ├── user → User:                                    │
  │    │    ├── first_name: "Lisa"                         │
  │    │    ├── last_name: "Chen"                           │
  │    │    └── email: "ap@acme.com"                        │
  │    └── delegate_client → links to Acme Corp             │
  └──────────────────────────────────────────────────────┘

Step 3: Workspace access
  └── WorkspaceUser for delegates who need portal access:
       ├── Sarah Park → role: "sponsor" (view reports, approve SOWs)
       ├── James Wu → role: "collaborator" (view deliverables)
       └── Lisa Chen → role: "finance" (view invoices, payments)
```

**Key insight**: `Client` is always the company. `Delegate` represents individual people at the client. The `delegate_client` junction allows one person to represent multiple companies (e.g., a consultant who sits on multiple boards), and one company to have multiple representatives (sponsor, technical lead, finance).

---

## Adding a New Representative to Existing Client

```
Acme Corp hires a new CTO who takes over as project sponsor:
  │
  ▼
New Delegate:
  ├── user → User (first_name: "Mike", last_name: "Torres",
  │          email: "mike.torres@acme.com")
  └── delegate_client → links to Acme Corp

Existing Delegate updated:
  Sarah Park's role changes from "sponsor" to "collaborator"
  (she's still involved, but no longer the primary contact)

Impact on active engagements:
  ├── Subscription "Acme Corp - Cloud Migration"
  │    └── metadata.engagement_lead updated: Sarah → Mike
  │
  ├── Event "Weekly Status Meeting"
  │    ├── event_client: Sarah Park (existing, remains)
  │    └── event_client: Mike Torres (added as new attendee)
  │
  └── Invoice recipient remains: Lisa Chen (AP contact unchanged)
```

---

## Strategic Account Upgrade

```
Acme Corp crosses the $500K annual revenue threshold:
  │
  │ Total Revenue where client_id = Acme Corp, last 12 months = $520,000
  │ Strategic account threshold: $500,000
  │
  ▼
Client updated:
  ├── customer_type: "retail" → "vip" (strategic account)
  ├── client_attribute: key "strategic_since", value "2025-06-15"
  ├── client_attribute: key "account_partner", value "EMP-0001"
  └── client_category: add "Strategic Account" category

Benefits of strategic account status:
  ├── Dedicated Account Partner (Executive Partner assigned)
  │    └── New InventoryTransaction:
  │         ├── reference_type: "client"
  │         ├── reference_id: FK to Acme Corp
  │         └── notes: "Account partner assignment"
  │
  ├── Preferential rate card applied
  │    └── PriceList "2025 Strategic Accounts Rate Card"
  │         ├── PriceProduct: Sr. Consultant @ $250/hr (vs $275 standard)
  │         └── PriceProduct: Jr. Analyst @ $135/hr (vs $150 standard)
  │
  └── Priority resource allocation
       └── Subscription.metadata: {"priority": "high"}
```

**Key insight**: Client tiering in professional services mirrors retail VIP upgrades — once revenue crosses a threshold, the client gets better rates (a strategic `PriceList`), dedicated attention (account partner as an `InventoryItem` assignment), and priority in resource allocation. The `customer_type` field drives all of this.

---

## Multi-Entity Client Structure

```
Global Corp has subsidiaries, each with their own engagements:
  │
  ├── Client "Global Corp" (parent company)
  │    ├── customer_type: "wholesale" (managed services)
  │    ├── company_name: "Global Corp"
  │    └── client_attribute: key "structure", value "parent"
  │
  ├── Client "Global Corp - US Division"
  │    ├── company_name: "Global Corp US"
  │    ├── client_attribute: key "parent_client_id", value: FK to Global Corp
  │    └── Subscription: "US Tax Advisory Retainer"
  │
  └── Client "Global Corp - EU Division"
       ├── company_name: "Global Corp EU"
       ├── client_attribute: key "parent_client_id", value: FK to Global Corp
       └── Subscription: "EU Compliance Advisory"

Billing structure:
  ├── Each division has its own Subscription, PriceList, Invoices
  ├── Parent company views consolidated reporting
  └── Delegate "CFO at Global Corp" linked to all three Client records
       via multiple delegate_client entries
```

**Key insight**: The proto doesn't have a native parent-child client relationship, but `client_attribute` with a `"parent_client_id"` key achieves this. The `delegate_client` junction allows a single person (like the CFO) to be linked to multiple client entities, enabling cross-entity visibility.
