# Verticals - Proto Domain Terminology Matrix

This matrix maps each Esqyma proto schema term to its industry-specific terminology across supported verticals. Each vertical has a detailed README with domain deep dives, field mappings, and scenario files.

| Vertical | Directory | Status | Kind |
|---|---|---|---|
| Retail | [retail/](retail/) | Complete | Industry |
| Professional Services | [professional-services/](professional-services/) | Complete | Industry |
| Medical Aesthetics | [medical-aesthetics/](medical-aesthetics/) | Complete | Industry |
| Laundry Services | [laundry-services/](laundry-services/) | Complete | Industry |
| Education | [education/](education/) | Initial | Industry |
| Leasing | [leasing/](leasing/) | Initial | Industry |
| Mutual | [mutual/](mutual/) | Initial | **Orthogonal overlay** — governance/ownership model that can apply to any industry vertical (consumer co-op = Retail+Mutual, worker co-op = Professional+Mutual, housing co-op = Leasing+Mutual). See [Mutual as Orthogonal Overlay](#mutual-as-orthogonal-overlay). |

---

## Terminology Matrix

> Rows = proto schema definition. Columns = vertical-specific term.

### Entity Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|
| `client` | Customer | Client Company | Patient / Client | Customer / Account | Student (the learner) | Lessee (company / person) | Member-as-customer (consumer-member's customer-side record) |
| `staff` | Store Employee / Sales Associate | Internal Team / Project Manager | Practitioner / Injector | Plant Operator / Route Driver | Teacher / Instructor | Account Manager / Field Service Tech / Yard Operator | Member-as-worker (worker-member's employment-side record) |
| `delegate` | Account Representative | Client Representative | Corporate Contact / Event Organizer | Account Contact | Parent / Guardian | Authorized User / Designated Operator | Board representative / member proxy |
| `admin` | Store Manager / Admin | Practice Director / Firm Admin | Clinic Director / Office Manager | Plant Manager / Operations Director | Principal / Department Head | Fleet Manager / Operations Director | General Manager / Treasurer / Secretary |
| `location` | Store / Branch / Warehouse | Office / Practice Location | Clinic / Med Spa Location | Processing Plant / Drop-Off Point | Campus / Building / Classroom | Yard / Depot / Customer Site / Maintenance Bay | Co-op branch / member service location |
| `group` | Customer Segment | Team / Resource Pool | Patient Segment | Customer Segment | Grade Level / Cohort / Section | Customer Tier / Service Region / Fleet Group | Member Class (founding / regular / supporter / institutional) |

### Product Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|
| `product` | Product / SKU | Resource Type / Role | Treatment Type | Service Type | Subject / Course Type (e.g., "Mathematics", "English Literature") | Asset Class (Excavator, Forklift, Office Suite Type-A) | Service offered to members (groceries / loans / housing / produce-marketing) |
| `product_variant` | Product Variant (size, color) | Resource Specialization (AWS, Azure) | Treatment Variation (by area/zone) | Service Tier / Item Category | Course Section (e.g., "Algebra II - Section B - Period 3") | Specific Model (Excavator XJ-9000, Suite #305) | Member-rate variant vs nonmember variant |
| `collection` | Product Category / Department | Practice Area / Service Line | Service Category / Menu Section | Service Category | Curriculum Track / Program (STEM / Arts / Honors) | Asset Category / Fleet Group | Service category (member services / community services) |
| `resource` | Digital Asset (images, manuals) | Deliverable Template / Work Product | Consent Form / Before-After Photo | Care Guide / Processing Spec | Lesson Plan Template / Assignment Template | Operator's Manual / Compliance Cert / Inspection Form | Member handbook / cooperative-principle documentation |
| `price_list` | Seasonal / Regional Price List | Rate Card | Treatment Price Menu | Rate Sheet | Tuition Schedule | Lease Rate Card | Member dues schedule (per tier) |
| `price_product` | Product Price Override | Rate (per resource type) | Treatment Price (per-unit/area/session) | Service Rate (per-pound/piece) | Course Fee (per-credit, per-term) | Lease Rate (per-day, per-month, per-mile, per-sq-ft) | Per-service member price override |

### Inventory Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|
| `inventory_item` | Stock Item | Resource (Person) | Clinical Supply | Tracked Garment / Linen | Teacher (as a "resource") OR a tracked piece of equipment | Asset Pool (one row per asset class per yard) | Co-op-owned inventory; for worker co-ops, member-worker labor pool |
| `inventory_serial` | Serial-Tracked Item | Named Resource (employee ID) | Lot-Tracked Unit (vial + lot number) | RFID-Tagged Item | Teacher Employee ID OR equipment serial | The actual leased unit (serial #, VIN, asset tag) | Serial-tracked stock; for worker co-ops, member-worker employee ID |
| `inventory_transaction` | Stock Movement | Hours Submitted / Time Entry | Treatment Consumption / Stock Depletion | Processing Cycle / Garment Movement | Teacher Hours Logged / Equipment Check-out | Asset Movement (out / return / yard transfer / write-off) | Stock movement; for worker co-ops, hours logged toward patronage |
| `inventory_depreciation` | Markdown / Write-Down | Utilization Write-Down | Expired Product Write-Off | Linen Replacement / Damage Write-Off | Teacher PD Time (non-instructional) / Equipment Depreciation | Wear & aging / damage write-down | Stock shrinkage / asset wear (delegated to underlying vertical) |

### Subscription Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|
| `plan` | Loyalty Program / Membership Tier | Engagement Type | Membership Program / Treatment Plan | Service Program | Academic Program (degree program / certificate / continuing ed track) | Lease Program (12-mo industrial / 24-mo IT / 5-yr commercial RE) | Membership Tier (founding / regular / supporter / institutional) |
| `plan_location` | Program Availability | Engagement Availability | Program Availability (which clinics) | Service Area / Coverage Zone | Program Availability per Campus | Lease Program Availability per yard/depot | Membership availability per branch |
| `price_plan` | Membership Pricing | Engagement Pricing / Fee Structure | Membership Tier Pricing | Program Pricing | Program Tuition Pricing | Lease Pricing Tier (deposit + term + renewal terms) | Membership pricing (dues structure per tier) |
| `subscription` | Customer Membership / Loyalty Enrollment | Active Engagement / Retainer | Active Membership / Treatment Package | Active Service Contract / Subscription | Enrollment (student × program × term) | Active Lease Contract | Active member service subscription / share package |
| `license` | Membership Benefit / Perk | Entitlement / Credit | Package Session / Credit Allotment | Service Entitlement / Bag Allowance | Course Credit / Class Pass | Pre-paid Service Credits / Mileage Allowance | Member service entitlement (vote credits, service quota, draw-right) |

### Payment Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|
| `invoice` | Sales Invoice / Receipt | Client Invoice / Fee Note | Patient Invoice / Checkout Receipt | Customer Invoice / Statement | Tuition Invoice / Statement | Lease Invoice / Monthly Statement | Member service invoice |
| `balance` | Customer Account Balance | Client Account / Outstanding Balance | Patient Account / Beauty Bank Balance | Account Balance / Prepaid Credit | Student Account Balance | Lessee Account / Security Deposit | Member account balance |
| `payment` | Payment Transaction | Client Payment | Patient Payment (card, CareCredit) | Payment (card, ACH, cash) | Tuition Payment | Lease Payment / Deposit / End-of-term Charges | Member payment / dues / share payment |

### Revenue Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|
| `revenue` | Sales Revenue | Billed Revenue | Treatment Revenue | Service Revenue | Tuition Revenue | Lease Revenue / Service Revenue / Damage Charges | Member purchase revenue (Sub-T classified) |
| `revenue_line_item` | Receipt Line Item | Billable Line Item | Treatment Line Item | Service Line Item | Tuition Line / Lab Fee / Materials Fee | Lease Fee / Late Fee / Damage Fee / Mileage Overage | Member transaction line (drives patronage base) |
| `revenue_category` | Revenue Category (in-store, online) | Revenue Stream (consulting, advisory) | Revenue Stream (injectables, laser, retail) | Revenue Stream (residential, hospitality) | Revenue Stream (Tuition / Fees / Books / Activities) | Revenue stream (Lease / Service / Damages / Insurance Pass-through) | Member-sourced vs nonmember-sourced (IRS Sub-T) |

### Event Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|
| `event` | Promotion / Sale Event | Client Meeting / Workshop / Session | Appointment / Consultation / Botox Party | Pickup / Delivery / Processing Run | Class Period / Lecture / Office Hours / Field Trip | Site Visit / Service Call / Pickup / Delivery | Meeting / general assembly / **governance vote** (new `EVENT_KIND_GOVERNANCE_VOTE`) |
| `event_client` | Event Participant / RSVP | Meeting Attendee | Appointment Attendee | Pickup/Delivery Recipient | Class Roster / Attendee | Lessee Representative on Site | Consumer-member RSVP (limited — voting uses EventAttendee for cross-stakeholder reach) |
| `event_product` | Promoted Product | Resources Booked for Session | Treatments Booked | Services on This Run | Subject Being Taught in Session | Asset Being Serviced | Services on the meeting agenda |

### Workflow Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|
| `workflow` | Order Fulfillment / Return Process | Engagement Lifecycle | Patient Journey | Garment Processing Pipeline | Academic Lifecycle (apply → enroll → matriculate → graduate) | Lease Lifecycle (origination → deployment → operation → termination) | Membership Lifecycle (apply → admit → suspend/withdraw → expel) |
| `stage` | Fulfillment Step | Engagement Phase | Journey Phase | Processing Phase | Academic Stage (application / enrolled / on-leave / graduated) | Lease Stage (pending / deployed / active / terminating / closed) | Membership Stage (applicant / active / suspended / withdrawn / expelled) |
| `activity` | Task (scan, label, pack) | Task / Deliverable | Clinical Task (consent, inject, photo) | Processing Task (pre-treat, wash, press) | Academic Activity (apply, register, drop, complete) | Service Activity (deploy, inspect, maintain, return) | Membership Action (admit, suspend, reinstate, expel) |

### Operations Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|
| `job` | Service Work Order (assembly / install / repair / custom build) | Matter / Engagement Project | Treatment Course (e.g., 6-session laser package) | Customer Order / Processing Job | Course-Term Enrollment (Alice's Algebra II, Spring 2026) | Service Engagement (deployment / cyclic maintenance / repair / return) | Service Job (member onboarding / annual patronage allocation / general assembly / federation engagement) |
| `job_phase` | Work Order Stage | Matter Phase (Discovery / Trial / Closeout) | Course Phase (Consult → Procedure → Follow-up) | Processing Stage (Pickup → Pre-treat → Wash → Press → Delivery) | Term / Module (Q1, Q2, Q3, Q4) | Phase of a service engagement | Operational phase of a co-op job |
| `job_task` | Work Order Task (cut, assemble, finish) | Deliverable Task (draft motion, depose, file) | Clinical Task (consent, photo, prep, inject, post-care) | Processing Task (sort, spot-treat, machine cycle, fold) | Lesson / Assignment Instance (Friday Quiz, Final Project) | Discrete task within a phase | Individual co-op service task |
| `job_activity` | Logged Action / Cost-Capture Event | Time / Expense Entry | Treatment Charge | Processing Charge | Per-Student Logged Event (homework submission, lab kit consumed) | Cost capture for service work (tech hours + parts + 3rd-party fees) | Service work cost capture (staff hours, materials, expenses) |
| `activity_labor` | Technician Hours | Billable Hours | Practitioner Time | Operator / Driver Hours | Instructor Hours (when billable, e.g., tutoring) | Field tech / driver / yard operator hours | Member-worker hours (drives worker-member patronage base) |
| `activity_material` | Parts / Components Used | Project Supplies | Injectable Lot Consumed (Botox vial, units) | Detergent / Chemicals Consumed | Lab Kit / Textbook Section Consumed | Parts / consumables / fluids replaced | Co-op supplies consumed |
| `activity_expense` | 3rd-party Vendor Cost | Travel / Sub-contracted Cost | Lab Fee / External Test | Equipment Service / Carrier Fee | Field Trip Ticket / External Fee | 3rd-party costs (towing, certification, environmental disposal) | 3rd-party costs on co-op jobs |
| `job_template` | Service Order SOP | Matter SOP / Practice Playbook | Treatment Protocol | Service Spec / Care Guide | Master Curriculum / Master Syllabus | Service SOP (one per Job type) | Reusable service SOP (annual patronage allocation, AGM playbook) |
| `job_template_phase` | SOP Stage Template | Matter Phase Template | Treatment Step Template | Processing Stage Template | Curriculum Module Template | SOP Phase Template | Phase template for co-op SOPs |
| `job_template_task` | SOP Task Template | Phase Task Template | Treatment Task Template | Processing Task Template | Master Lesson Plan | SOP Task Template | Task template for co-op SOPs |
| `outcome_criteria` | QA Inspection Checkpoint | Quality Standard / Firm SOP Rule | Clinical Standard / Safety Protocol | Service Quality Standard | Learning Standard (Common Core, NGSS, IB rubric) | Inspection Criteria | Cooperative principle adherence check |
| `template_task_criteria` | QA Pinning per Task | Standard Pinning per Task | Clinical Standard Pinning | Quality Standard Pinning | Pinned Learning Standard | Criteria pinning per inspection task | Pinned co-op compliance check per task |
| `task_outcome` | QA Result per Task | Case Outcome / Quality Assessment | Clinical Outcome / Treatment Result | Service Outcome / Quality Check | Per-Student Assignment Grade | Inspection Result per criterion | Compliance / quality outcome per task |
| `phase_outcome_summary` | Stage QA Roll-up | Phase Review | Phase Outcome Roll-up | Processing Stage Roll-up | Term Report | Service phase QA roll-up | Phase compliance roll-up |
| `job_outcome_summary` | Order QA Score | Matter Scorecard | Treatment Outcome Report | Service Quality Score | Course Report Card | Service Engagement Quality Report | Operational job report (general assembly outcome / audit result) |
| `job_settlement` | Order Final Settlement | Matter Final Bill | Course Final Settlement | Customer Order Settlement | Tuition Reconciliation | Damage / Overage Chargebacks | Patronage settlement / member equity adjustment |

---

## Key Conceptual Shifts

The matrix above shows terminology, but the real insight is how the *meaning* of core concepts shifts across verticals:

| Concept | Retail | Professional Services | Medical Aesthetics | Laundry Services | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|
| **What is being sold?** | Physical goods | People's expertise (by the hour) | Treatments (practitioner skill + injectables) | Processing services (labor + chemicals) | Curriculum delivery + outcomes (by the term) | Temporary custody of a physical asset (by the month / year) | Whatever the underlying vertical delivers — Mutual is orthogonal (consumer co-op = goods; worker co-op = expertise; housing co-op = housing units) |
| **What is inventory?** | Products on shelves | People at offices | Consumables in clinic fridges (Botox vials, filler syringes) | Customer property in transit + chemical consumables | Teachers at campuses + classroom equipment | The fleet: serialized physical assets at yards and customer sites | Inherits from underlying vertical; for worker co-ops, member-workers as the labor pool |
| **What is a transaction?** | Moving goods (receive, sell, return) | Submitting hours worked | Depleting injectables during a treatment | Moving a garment through the processing pipeline | Logging instructor hours or checking out lab equipment | Custody change event in the asset audit log (LEASE_OUT / LEASE_RETURN) | Inherits from underlying vertical; for worker co-ops, member-worker hours toward patronage |
| **What is a plan?** | Loyalty program to retain customers | Type of engagement offered to clients | Beauty bank membership or multi-session treatment protocol | Service program (residential subscription, hotel linen contract) | Academic program (degree track / certificate / continuing education) | Lease program (term, asset type, included services, pricing tier) | Membership tier (founding / regular / supporter / institutional) |
| **What is a subscription?** | Customer's membership enrollment | Client's active engagement contract | Patient's membership or purchased package of sessions | Hotel's linen contract or resident's weekly pickup plan | Student's enrollment in a program for a term | The active lease contract (lessee × asset × term) | Active member service relationship + share-package equity stake |
| **What is a price list?** | Seasonal/regional product pricing | Rate card (billing rates per role) | Treatment price menu (per-unit, per-area, per-session) | Rate sheet (per-pound, per-piece, monthly contract) | Tuition schedule (per-credit, per-term, by program) | Lease rate card (per-day, per-month, per-mile, per-sq-ft — per yard and period) | Member dues schedule + member-vs-nonmember service pricing |
| **What drives revenue?** | Selling a product | Billing approved hours | Performing treatments (service fee + materials consumed) | Processing volume (weight or piece count) | Enrollment (tuition pre-billed per term; fees applied at registration) | Recurring lease fees + service chargebacks + damage assessments | Member transactions (member-sourced, IRS Sub-T) + nonmember transactions (taxable ordinary) |
| **What is depreciation?** | Stock shrinkage / markdowns | Unbillable time (bench, training) | Expired products (Botox past reconstitution window) | Linen at end-of-life (200+ wash cycles) or damaged garments | Instructor professional development time (non-instructional) / equipment depreciation | Asset wear and aging (IAS 16 / IFRS 16), damage write-downs from DAMAGE_FOUND transactions | Inherits from underlying vertical; surplus retention/distribution flows through equity (PATRONAGE_RETENTION / PATRONAGE_DISTRIBUTION), not depreciation |
| **What is a Job?** | Service work order attached to a sale | Matter / engagement deliverable | Multi-session treatment course | Customer order moving through processing | Course-term enrollment per student | Service engagement (deployment, maintenance, repair, return) — multiple Job types per lease | Service Job to members (onboarding, annual patronage allocation, general assembly, federation engagement) |
| **Who is the Job for?** | The buyer (Job.client_id) | The client company | The patient | The customer (account / hotel) | The student | The lessee (Job.client_id) | The member (Job.client_id when consumer-member; indirect for worker/producer-member) |
| **Cardinality (Job ↔ party)** | 1 Job per service order per buyer | 1 Job per matter per client (multi-party rare; uses parent_job_id) | 1 Job per treatment course per patient | 1 Job per customer order | 1 Job per (student × course × term) | **Multiple Jobs per Subscription over time** (deployment + N cyclic maintenance + ad-hoc repairs + end-of-term return) — the most heterogeneous Job pattern | Variable — annual operational jobs (1 patronage allocation, 1 AGM per fiscal period) + per-member service jobs as needed |
| **What does JobActivity capture?** | Parts + technician hours | Billable time + expenses + supplies | Injectable units consumed + practitioner time | Chemicals + machine time + operator hours | Per-student logged events (submissions, materials, fees) | Service work cost (tech hours + parts + 3rd-party fees) | Service work cost (staff hours, materials, expenses) on co-op jobs |
| **What does TaskOutcome track?** | QA pass/fail per task | Case-quality marker per deliverable | Clinical safety/quality marker per task | Service quality per processing step | Per-student assignment grade | Inspection result per criterion (drives end-of-term chargebacks) | Cooperative principle adherence per task |
| **Cost vs revenue posture** | Often 0 — most retail orders skip Job entirely | Cost-and-revenue (T&M billing) | Cost-and-revenue (treatment fee + materials) | Cost-and-revenue (per-pound or per-piece pricing) | Tuition pre-billed; Job tracks academic execution | Cost-and-revenue (lease fees recurring + service event chargebacks) | Member transactions sum to revenue; surplus distributed via patronage allocation (RETENTION + DISTRIBUTION) |

### Hybrid Model Spectrum

The six verticals sit on two axes: **product vs. service** and **customer custody duration**:

```
Pure Product                                                                      Pure Service
    │                                                                                  │
    ▼                                                                                  ▼
  Retail          Laundry Services      Education          Medical Aesthetics  Professional Services
  ──────          ────────────────      ──────────         ───────────────────   ─────────────────────
  Sells goods     Processes customer    Delivers           Consumes firm's       Sells people's time
  from shelf      property + depletes   curriculum +       inventory on patient  (no physical goods)
                  chemical consumables  tracks per-student (one-way depletion)
                  (round-trip +         outcomes; tuition
                  depletion)            pre-billed


                      CUSTOMER CUSTODY DURATION (orthogonal axis)
  Brief (none)                  Days               Months              Years
      │                          │                    │                  │
      ▼                          ▼                    ▼                  ▼
    Retail               Laundry Services       Professional         Leasing
    ──────               ───────────────        Services             ───────
    Goods leave          Customer property      People-time          Physical asset
    store same day       returned in days       delivered on-site    at customer site
                                                (no asset custody)   for months/years
```

Leasing occupies a unique position: it is **asset-intensive** (like retail and laundry) but with **long customer custody duration** (unlike any other vertical). The asset domain's custody tracking (`AssetTransaction` audit log) is essential precisely because of this extended custody window.

---

## Mutual as Orthogonal Overlay

Mutual is the only vertical in this directory that does **not** describe what is delivered.
It describes **how the firm is owned and governed**: the customers/workers/producers ARE
the owners. Any of the six industry verticals above can BE a mutual:

```
                    Governance / Ownership Axis
                          (Mutual overlay)
                                ▲
                                │
                   ┌────────────┼────────────┐
                   │            │            │
     Consumer Co-op│    Worker  │   Producer │
        (Retail +  │    Co-op   │    Co-op   │
         Mutual)   │  (Prof +   │  (Supply + │
                   │   Mutual)  │   Mutual)  │
                   └────────────┼────────────┘
                                │
Pure Product ───────────────────┼─────────────────── Pure Service
   (Retail)                     │                  (Professional)
                                │
                      Credit Union (Financial + Mutual)
                      Housing Co-op (Leasing + Mutual)
```

Concrete combinations:
- **Consumer co-op** = Retail + Mutual (grocery co-op sells goods to its member-owners)
- **Worker co-op** = Professional/Service + Mutual (worker-owners deliver services)
- **Credit union** = Financial Services + Mutual (member-owners borrow and deposit)
- **Housing co-op** = Leasing + Mutual (member-owners occupy units)
- **Producer co-op** = Supply + Mutual (producer-members sell jointly through the co-op)

Schema impact is concentrated in **5 existing messages** with **11 additive proto changes**
plus **4 ALTER TABLE migrations** — *no new top-level entities* are required. The existing
`User → role-tables → WorkspaceUser` identity chain already supports multi-stakeholder
membership; Mutual adds:

- Admission lifecycle on `WorkspaceUser` (`member_number`, `member_status`, `member_since`, `member_until`)
- Member-linked equity on `EquityAccount` (`workspace_user_id` FK, `patronage_basis`)
- Patronage flow types on `EquityTransaction` (`PATRONAGE_RETENTION`, `PATRONAGE_DISTRIBUTION`)
- Governance vote events on `Event` (new `EventKind` enum + `kind` field)
- Vote capture on `EventAttendee` (`vote_choice`, `vote_weight`, `vote_cast_at`, `eligible_to_vote`)

See [mutual/README.md](mutual/README.md) for the full design reference and [mutual/scenarios/](mutual/scenarios/)
for concrete data examples (patronage cycle, governance vote, multi-stakeholder identity).

Migration: `packages/esqyma/migrations/postgres/20260510050000_add_mutual_fields.sql`.
Lyngua overrides: `packages/lyngua/translations/en/mutual/`.

---

## Adding a New Vertical

To add a new vertical (e.g., healthcare, construction, hospitality):

1. Create `verticals/<vertical-name>/README.md` with:
   - Quick Reference table (schema term → industry term)
   - Domain Deep Dive with diagrams
   - Key Field Mappings
   - Status-Driven Flow section
2. Create `verticals/<vertical-name>/scenarios/` with per-domain files:
   - `sales.md`, `inventory.md`, `plan.md`, `subscription.md`, `client.md`, `product.md`
   - `operations.md` if the vertical uses the Job/Phase/Task model
3. Add the vertical as a new column in this matrix (all 9 domain sections + Key Conceptual Shifts). If the new vertical is an orthogonal overlay (governance / regulatory / ownership) rather than an industry, document it as such (see [Mutual as Orthogonal Overlay](#mutual-as-orthogonal-overlay))
