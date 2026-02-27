# Events Services Scenarios: Client (Booking Clients)

Client scenarios cover onboarding wedding couples, setting up corporate accounts with delegate planners, and VIP upgrades through referral activity.

---

## Wedding Couple Onboarding

Emily Smith and Jordan Johnson find the studio on a vendor listing site. They click "Inquire" and fill out the contact form for their June wedding.

```
Step 1: Inquiry triggers client creation
  ┌──────────────────────────────────────────────────────┐
  │  Client                                               │
  │    ├── user → User:                                    │
  │    │    ├── first_name: "Emily"                        │
  │    │    ├── last_name: "Smith"                          │
  │    │    └── email: "emily.jordan2025@gmail.com"         │
  │    ├── customer_type: "retail" (individual client)     │
  │    ├── category → ClientCategory: "Wedding"            │
  │    └── client_attribute:                               │
  │         ├── key: "event_date", value: "2025-06-14"    │
  │         ├── key: "venue", value: "Timberline Lodge"    │
  │         ├── key: "guest_count", value: "150"           │
  │         ├── key: "referral_source", value: "the_knot"  │
  │         ├── key: "partner_name", value: "Jordan Johnson"│
  │         └── key: "style_preference", value: "editorial, moody" │
  └──────────────────────────────────────────────────────┘

Step 2: Partner added as second contact
  ┌──────────────────────────────────────────────────────┐
  │  Delegate (Jordan — the other half of the couple)     │
  │    ├── user → User:                                    │
  │    │    ├── first_name: "Jordan"                       │
  │    │    ├── last_name: "Johnson"                        │
  │    │    └── email: "jordan.johnson@outlook.com"         │
  │    └── delegate_client → links to "Emily Smith"        │
  │         (Jordan gets access to booking portal,         │
  │          can view proposals, sign contracts)            │
  └──────────────────────────────────────────────────────┘

Step 3: Soft hold placed on calendar
  ├── Workflow "Smith-Johnson Wedding Booking" created
  │    └── Stage 1 (Inquiry) activities initiated:
  │         ├── "Contact form received" ✓
  │         ├── "Date availability checked — Jun 14 available" ✓
  │         └── "Soft hold placed on Jane (lead photo)" ✓
  │
  ├── InventoryTransaction:
  │    ├── inventory_item_id: FK to "Jane - Lead Photographer"
  │    ├── transaction_type: "hold"
  │    ├── quantity: 8 (hours)
  │    ├── status: "hold"
  │    └── notes: "Expires in 7 days if no consultation booked"
  │
  └── Automated email: "Thank you for inquiring! We've
      tentatively held Jun 14 for you. Let's schedule
      a consultation call to discuss your vision."

Step 4: Consultation call booked
  ├── Event "Smith-Johnson Consultation" created
  │    ├── event_client: Emily Smith
  │    ├── event_product: "Discovery Call" (30 min, Zoom)
  │    └── Self-booked via scheduling link (self_service)
  └── After consultation, admin advances workflow to
      Stage 3 (Proposal) and prepares custom package
```

**Key insight**: The `delegate` pattern handles the common events scenario where two people share decision-making (couple, co-hosts). Emily is the `Client`, Jordan is a `Delegate` linked via `delegate_client`. Both can view proposals and sign contracts, but billing goes through Emily's client record.

---

## Corporate Account Setup with Delegate Planner

Velocity Tech (a startup with 500 employees) wants quarterly all-hands events covered — photography, videography, and a DJ. Their events team lead is the primary contact.

```
Step 1: Create the corporate client
  ┌──────────────────────────────────────────────────────┐
  │  Client (the company)                                 │
  │    ├── company_name: "Velocity Tech"                   │
  │    ├── customer_type: "wholesale" (B2B account)        │
  │    ├── street_address: "350 NW 10th Ave"               │
  │    ├── city: "Portland"                                │
  │    ├── category → ClientCategory:                      │
  │    │    ├── "Corporate"                                 │
  │    │    └── "Technology"                                │
  │    └── client_attribute:                               │
  │         ├── key: "employee_count", value: "500"        │
  │         ├── key: "event_frequency", value: "quarterly" │
  │         ├── key: "typical_event_size", value: "200"    │
  │         └── key: "payment_terms", value: "net_30"      │
  └──────────────────────────────────────────────────────┘

Step 2: Create delegates (company contacts)
  ┌──────────────────────────────────────────────────────┐
  │  Delegate 1 (Events Team Lead — primary contact)      │
  │    ├── user → User:                                    │
  │    │    ├── first_name: "Marcus"                       │
  │    │    ├── last_name: "Rivera"                         │
  │    │    └── email: "marcus@velocitytech.com"            │
  │    └── delegate_client → links to Velocity Tech        │
  │                                                       │
  │  Delegate 2 (Office Manager — logistics/AP)            │
  │    ├── user → User:                                    │
  │    │    ├── first_name: "Ava"                           │
  │    │    └── email: "ava.chen@velocitytech.com"          │
  │    └── delegate_client → links to Velocity Tech        │
  └──────────────────────────────────────────────────────┘

Step 3: Corporate retainer subscription created
  ├── Plan: "Corporate Events Retainer"
  │    └── fulfillment_type: "license" (event credits)
  │
  ├── PricePlan: "Quarterly Coverage - $15,000/yr"
  │    ├── amount: 15000.00 (annual)
  │    └── Includes: 4 event credits, each up to 6 hours
  │
  ├── Subscription:
  │    ├── client_id: FK to "Velocity Tech"
  │    ├── price_plan_id: FK to retainer pricing
  │    ├── quantity: 4 (event credits per year)
  │    ├── assigned_count: 0 (none used yet)
  │    ├── available_count: 4
  │    └── metadata: {"primary_contact": "Marcus Rivera",
  │                    "payment_terms": "net_30",
  │                    "approved_services": "photo,video,dj"}
  │
  └── Corporate PriceList created:
       PriceList "2025 Velocity Tech Rates"
         ├── PriceProduct: Event Photography 6hr @ $2,000
         │    (vs standard $2,500 — 20% corporate discount)
         ├── PriceProduct: Event Videography 6hr @ $2,500
         └── PriceProduct: DJ Services 4hr @ $800

Step 4: Workspace access
  └── WorkspaceUser for Marcus Rivera
       ├── role: "corporate_client"
       └── Can: view calendar availability, book events
           against retainer credits, view invoices
```

**Key insight**: Corporate accounts use the same `Client` → `Delegate` → `Subscription` pattern as other verticals. The `delegate` role cleanly separates the company (who pays) from the people (who coordinate). Marcus can book events against retainer credits, while Ava handles invoicing — different permissions on the same corporate client record.

---

## Referral-Based VIP Upgrade

The Parkers have used the studio three times (engagement shoot, wedding, one-year anniversary). They've also referred two other couples who booked full wedding packages.

```
Parker family history:
  ├── Booking 1: Engagement shoot ($500)
  ├── Booking 2: Complete wedding package ($10,500)
  ├── Booking 3: 1-year anniversary session ($750)
  └── Total spend: $11,750

Referrals:
  ├── Referred couple 1: Chen Wedding ($8,200) — booked & completed
  ├── Referred couple 2: Davis Wedding ($9,800) — booked, upcoming
  └── Referral revenue generated: $18,000

VIP threshold: $10K+ personal spend OR $15K+ referral revenue
  │
  ▼
Client updated:
  ├── customer_type: "retail" → "vip"
  ├── client_attribute: key "vip_since", value "2025-08-01"
  ├── client_attribute: key "total_spend", value "11750"
  ├── client_attribute: key "referral_revenue", value "18000"
  ├── client_attribute: key "referred_by", value: null (organic)
  ├── client_category: add "VIP Client" category
  └── client_category: add "Referral Champion" category

VIP benefits activated:
  ├── Priority booking (first access to peak-season dates)
  ├── 15% loyalty discount on future sessions
  ├── Complimentary annual mini-session (1hr portrait)
  ├── Preferred creative assignment (request Jane by name)
  │    └── client_attribute: key "preferred_staff",
  │                          value "PHOTO-001-JANE"
  ├── Early access to new service offerings
  └── Anniversary session reminder (automatic, annual)

Referral program tracking:
  └── For each referral that books:
       ├── Referring client gets $250 credit
       │    (subscription.metadata.credit_balance)
       └── New client gets 10% first-booking discount
```

**Key insight**: The VIP upgrade can be triggered by either direct spending *or* referral revenue — recognizing that a client who sends two $10K weddings to your studio is as valuable as one who spends $10K themselves. The `client_attribute` pattern tracks both dimensions, and referral credits are stored as subscription metadata.

---

## Portrait Client — Minimal Onboarding (Self-Service)

Alex Davis books a family portrait session directly from the studio's website — no consultation, no proposal. The self-service flow creates a lean client record automatically.

```
Client selects "Family Portrait - 1 Hour ($350)" on booking page
  │
  ├── Sees available slots (Calendly-like availability widget)
  ├── Selects: Sunday Oct 5, 2:00 PM, Washington Park
  ├── Fills in: name, email, phone, number of family members
  ├── Accepts terms of service (auto-contract)
  └── Pays $350 (full amount — no retainer/balance split)
  │
  ▼
  ┌──────────────────────────────────────────────────────┐
  │  Client (auto-created)                                │
  │    ├── user → User:                                    │
  │    │    ├── first_name: "Alex"                         │
  │    │    ├── last_name: "Davis"                          │
  │    │    ├── email: "alex.davis@email.com"               │
  │    │    └── mobile: "+1-503-555-0177"                   │
  │    ├── customer_type: "retail"                         │
  │    ├── category → ClientCategory: "Portrait"           │
  │    └── client_attribute:                               │
  │         ├── key: "family_size", value: "4"             │
  │         └── key: "booking_source", value: "website"    │
  └──────────────────────────────────────────────────────┘

  Subscription auto-created (self-service booking):
    ├── plan: "Portrait Session" (booking_mode: "self_service")
    ├── price_plan: "1-Hour Portrait - $350"
    ├── date_start: 2025-10-05
    └── status: confirmed (auto-advanced, payment collected)

  Event auto-created:
    ├── "Davis Family Portraits"
    ├── event_client: Alex Davis
    ├── event_product: "Family Portrait - 1 Hour"
    ├── start: Sun Oct 5, 2:00 PM
    └── end: Sun Oct 5, 3:00 PM

  InventoryTransaction auto-created:
    ├── status: "confirmed" (direct, no hold/proposed/contracted)
    └── Calendar locked for assigned photographer
```

**Key insight**: Self-service bookings create the full entity chain (Client → Subscription → Event → InventoryTransaction) automatically in a single flow. The client never sees "hold" or "proposed" stages — the workflow auto-advances from booking to confirmed. This makes simple services like portraits as frictionless as Calendly while using the same underlying data model as a full wedding booking.
