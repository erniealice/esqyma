# Medical Aesthetics Scenarios: Client (Patients)

Client scenarios cover patient onboarding, VIP progression, and B2B account setup for corporate wellness programs.

---

## New Patient Onboarding

Sarah Chen finds the clinic on Instagram, clicks the booking link, and schedules her first Botox consultation. Her patient record is created before she even walks in.

```
Step 1: Online booking triggers client creation
  ┌──────────────────────────────────────────────────────┐
  │  Client                                               │
  │    ├── user → User:                                    │
  │    │    ├── first_name: "Sarah"                        │
  │    │    ├── last_name: "Chen"                           │
  │    │    ├── email: "sarah.chen@gmail.com"               │
  │    │    └── mobile: "+1-310-555-0199"                   │
  │    ├── customer_type: "retail" (walk-in, non-member)   │
  │    ├── category → ClientCategory: "New Patient"        │
  │    └── client_attribute:                               │
  │         ├── key: "referral_source", value: "instagram" │
  │         ├── key: "skin_type", value: "fitzpatrick_III" │
  │         └── key: "allergies", value: "none_reported"   │
  └──────────────────────────────────────────────────────┘

Step 2: Pre-visit digital intake (via patient portal)
  ├── Medical history form completed
  ├── Medication list submitted
  ├── Consent form for injectable treatments signed
  ├── Before photos (selfies uploaded via app)
  └── All stored as Resource attachments on client record

Step 3: Day of appointment
  ├── Event "Sarah Chen — Botox Consultation" created
  ├── Workflow "New Patient Injectable Journey" initiated
  │    └── Stage 1 (Intake) activities completed:
  │         ├── "Digital intake forms verified" ✓
  │         ├── "Medical history reviewed by practitioner" ✓
  │         └── "Payment method on file" ✓
  └── Consultation proceeds → treatment same day (if approved)
```

**Key insight**: The `client_attribute` key-value pairs store clinical information (skin type, allergies) that wouldn't make sense in a retail context but is essential for treatment safety. The patient portal flow means the `Client` record exists and is enriched *before* the first visit.

---

## VIP Member Upgrade Based on Spending

Sarah has been visiting the clinic for 8 months. Between her Gold membership payments and treatments, she's crossed the $5,000 annual spend threshold.

```
Sarah Chen (customer_type: "retail" → still shows as regular even with Gold)
  │
  │ Total spending last 12 months:
  │   Membership fees: $200/mo × 8 = $1,600
  │   Treatment spend: $3,800
  │   Retail products: $240
  │   Total: $5,640
  │
  │ VIP threshold: $5,000
  │
  ▼
Client updated:
  ├── customer_type: "retail" → "vip"
  ├── client_attribute: key "vip_since", value "2025-09-14"
  ├── client_attribute: key "annual_spend", value "5640"
  ├── client_category: add "VIP Patient" category
  └── client_category: add "Injectable Regular" category
       (auto-tagged based on treatment history)

VIP benefits activated:
  ├── Priority scheduling (same-day availability)
  ├── Complimentary annual treatment plan consultation
  ├── First access to new treatments and products
  ├── Dedicated practitioner (Dr. Kim flagged as "preferred")
  │    └── client_attribute: key "preferred_practitioner",
  │                          value "DR-KIM-001"
  └── VIP-only events (holiday party, new product launches)

Automated communication:
  ├── SMS: "Congratulations Sarah! You've been upgraded to
  │        VIP status. Enjoy priority booking and exclusive perks."
  └── Email: Detailed VIP benefits guide + rebook link
```

---

## Corporate Wellness Account Setup

Nexus Labs (a tech company with 200 employees) signs a corporate wellness partnership. The HR director is the primary contact, and employees opt in individually.

```
Step 1: Create the corporate client
  ┌──────────────────────────────────────────────────────┐
  │  Client (the company)                                 │
  │    ├── company_name: "Nexus Labs"                      │
  │    ├── customer_type: "wholesale" (B2B account)        │
  │    ├── street_address: "100 Innovation Drive"          │
  │    ├── city: "Beverly Hills"                           │
  │    ├── category → ClientCategory:                      │
  │    │    ├── "Corporate Wellness"                        │
  │    │    └── "Technology"                                │
  │    └── client_attribute:                               │
  │         ├── key: "employee_count", value: "200"        │
  │         ├── key: "contract_start", value: "2025-03-01" │
  │         └── key: "wellness_budget", value: "50000"     │
  └──────────────────────────────────────────────────────┘

Step 2: Create delegates (company contacts)
  ┌──────────────────────────────────────────────────────┐
  │  Delegate 1 (HR Director — primary contact)           │
  │    ├── user → User:                                    │
  │    │    ├── first_name: "Diana"                        │
  │    │    ├── last_name: "Reyes"                          │
  │    │    └── email: "diana.reyes@nexuslabs.com"          │
  │    └── delegate_client → links to Nexus Labs            │
  │                                                       │
  │  Delegate 2 (Office Manager — logistics)               │
  │    ├── user → User:                                    │
  │    │    ├── first_name: "Tom"                           │
  │    │    └── email: "tom.park@nexuslabs.com"             │
  │    └── delegate_client → links to Nexus Labs            │
  └──────────────────────────────────────────────────────┘

Step 3: Employees opt in → individual client records
  Each employee who signs up gets:
    ├── Their own Client record (for HIPAA — treatment records
    │   are per-patient, never shared with employer)
    ├── Their own Subscription linking to the corporate PricePlan
    │    └── metadata: {"employer": "Nexus Labs",
    │                   "employee_id": "NX-1234"}
    └── Access to corporate PriceList rates

  Employee clients created:
    ├── Client: "Alex Kim" (customer_type: "retail")
    │    └── Subscription → "Nexus Labs Wellness"
    ├── Client: "Priya Patel" (customer_type: "retail")
    │    └── Subscription → "Nexus Labs Wellness"
    └── ... (42 employees opt in during first month)

Step 4: Workspace access for HR
  └── WorkspaceUser for Diana Reyes
       ├── role: "corporate_admin"
       └── Can view: aggregate utilization stats
           Cannot view: individual patient treatment details (HIPAA)
```

**Key insight**: HIPAA compliance drives the architecture — the corporate `Client` (Nexus Labs) is separate from individual employee `Client` records. The HR delegate can see aggregate metrics (42 employees enrolled, $8,400 total utilization) but never individual treatment details. Each employee's `Subscription` references the corporate `PricePlan` for discounted rates.
