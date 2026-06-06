# Verticals - Proto Domain Terminology Matrix

This matrix maps each Esqyma proto schema term to its industry-specific terminology across supported verticals. Each vertical has a detailed README with domain deep dives, field mappings, and scenario files.

| Vertical | Directory | Status | Kind |
|---|---|---|---|
| Retail | [retail/](retail/) | Complete | Industry |
| Professional Services | [professional-services/](professional-services/) | Complete | Industry |
| Medical Aesthetics | [medical-aesthetics/](medical-aesthetics/) | Complete | Industry |
| Laundry Services | [laundry-services/](laundry-services/) | Complete | Industry |
| Manufacturing | [manufacturing/](manufacturing/) | Initial (depends on UJM Waves 2–4) | Industry |
| Education | [education/](education/) | Initial | Industry |
| Leasing | [leasing/](leasing/) | Initial | Industry |
| Mutual | [mutual/](mutual/) | Initial | **Orthogonal overlay** — governance/ownership model that can apply to any industry vertical (consumer co-op = Retail+Mutual, worker co-op = Professional+Mutual, housing co-op = Leasing+Mutual). See [Mutual as Orthogonal Overlay](#mutual-as-orthogonal-overlay). |

> **Universal Job Model (UJM) note.** The `operation/` proto domain is being generalised under `docs/plan/20260427-universal-job-model/`. Wave 1 (enum + Job/JobTemplate versioning fields) has landed locally; Waves 2–4 add 9 new entities (`job_template_input`, `lot`, `job_input_plan`, `task_interruption`, `job_output`, `job_cost_ledger_entry`, `job_cost_snapshot`, `job_plan_deviation`, plus alternates). The entities are **universal** — every vertical above gains capability from them; see [Universal Job Model Expansion (Waves 2–4)](#universal-job-model-expansion-waves-24) below for the cross-vertical impact table. Manufacturing is the heaviest tier-3 facade and lands first as the proof-of-shape; the work flows into every other vertical's `operations.md` thereafter.

---

## Terminology Matrix

> Rows = proto schema definition. Columns = vertical-specific term.

### Entity Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Manufacturing | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|---|
| `client` | Customer | Client Company | Patient / Client | Customer / Account | Customer (B2B distributor / OEM / retail chain / inter-co) | Student (the learner) | Lessee (company / person) | Member-as-customer (consumer-member's customer-side record) |
| `staff` | Store Employee / Sales Associate | Internal Team / Project Manager | Practitioner / Injector | Plant Operator / Route Driver | Operator / Machine Operator / QC Inspector / Production Planner / Foreman | Teacher / Instructor | Account Manager / Field Service Tech / Yard Operator | Member-as-worker (worker-member's employment-side record) |
| `delegate` | Account Representative | Client Representative | Corporate Contact / Event Organizer | Account Contact | Buyer / Sourcing Manager (at customer) | Parent / Guardian | Authorized User / Designated Operator | Board representative / member proxy |
| `admin` | Store Manager / Admin | Practice Director / Firm Admin | Clinic Director / Office Manager | Plant Manager / Operations Director | Plant Manager / Production Manager / Quality Manager | Principal / Department Head | Fleet Manager / Operations Director | General Manager / Treasurer / Secretary |
| `location` | Store / Branch / Warehouse | Office / Practice Location | Clinic / Med Spa Location | Processing Plant / Drop-Off Point | Plant / Production Line / Work Center / Raw-WH / WIP-WH / FG-WH / QC Lab / Scrap Bin | Campus / Building / Classroom | Yard / Depot / Customer Site / Maintenance Bay | Co-op branch / member service location |
| `group` | Customer Segment | Team / Resource Pool | Patient Segment | Customer Segment | Production Cell / Customer Tier (OEM / Distributor / Aftermarket) | Grade Level / Cohort / Section | Customer Tier / Service Region / Fleet Group | Member Class (founding / regular / supporter / institutional) |

### Product Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Manufacturing | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|---|
| `product` | Product / SKU | Resource Type / Role | Treatment Type | Service Type | Item / Part / SKU (raw / component / sub-assembly / FG / by-product / MRO) | Subject / Course Type (e.g., "Mathematics", "English Literature") | Asset Class (Excavator, Forklift, Office Suite Type-A) | Service offered to members (groceries / loans / housing / produce-marketing) |
| `product_variant` | Product Variant (size, color) | Resource Specialization (AWS, Azure) | Treatment Variation (by area/zone) | Service Tier / Item Category | Item Configuration (color / grade / voltage / customer-spec) | Course Section (e.g., "Algebra II - Section B - Period 3") | Specific Model (Excavator XJ-9000, Suite #305) | Member-rate variant vs nonmember variant |
| `collection` | Product Category / Department | Practice Area / Service Line | Service Category / Menu Section | Service Category | Item Category (Raw / Components / Sub-Assemblies / FG / By-Products / Packaging / MRO) | Curriculum Track / Program (STEM / Arts / Honors) | Asset Category / Fleet Group | Service category (member services / community services) |
| `resource` | Digital Asset (images, manuals) | Deliverable Template / Work Product | Consent Form / Before-After Photo | Care Guide / Processing Spec | Work Center / Machine / Line / Crew / Tool / Mould / Fixture | Lesson Plan Template / Assignment Template | Operator's Manual / Compliance Cert / Inspection Form | Member handbook / cooperative-principle documentation |
| `price_list` | Seasonal / Regional Price List | Rate Card | Treatment Price Menu | Rate Sheet | Customer Price Sheet / Distributor Tier | Tuition Schedule | Lease Rate Card | Member dues schedule (per tier) |
| `price_product` | Product Price Override | Rate (per resource type) | Treatment Price (per-unit/area/session) | Service Rate (per-pound/piece) | Sale Price per SKU per Customer (wholesale rate, volume break) | Course Fee (per-credit, per-term) | Lease Rate (per-day, per-month, per-mile, per-sq-ft) | Per-service member price override |

### Inventory Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Manufacturing | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|---|
| `inventory_item` | Stock Item | Resource (Person) | Clinical Supply | Tracked Garment / Linen | Material Master Stock Position (one row per product × location) | Teacher (as a "resource") OR a tracked piece of equipment | Asset Pool (one row per asset class per yard) | Co-op-owned inventory; for worker co-ops, member-worker labor pool |
| `inventory_serial` | Serial-Tracked Item | Named Resource (employee ID) | Lot-Tracked Unit (vial + lot number) | RFID-Tagged Item | Lot-Tracked Unit / Serial-Tracked Unit (engine SN, regulated assembly) — pairs with `lot` (UJM W2) | Teacher Employee ID OR equipment serial | The actual leased unit (serial #, VIN, asset tag) | Serial-tracked stock; for worker co-ops, member-worker employee ID |
| `inventory_transaction` | Stock Movement | Hours Submitted / Time Entry | Treatment Consumption / Stock Depletion | Processing Cycle / Garment Movement | Material Movement (ISSUE / COMPLETION / SCRAP / TRANSFER / RECEIPT / RETURN / SELL) | Teacher Hours Logged / Equipment Check-out | Asset Movement (out / return / yard transfer / write-off) | Stock movement; for worker co-ops, hours logged toward patronage |
| `inventory_depreciation` | Markdown / Write-Down | Utilization Write-Down | Expired Product Write-Off | Linen Replacement / Damage Write-Off | Obsolete Stock Write-Down / Slow-Moving Reserve (NRV / LCM) | Teacher PD Time (non-instructional) / Equipment Depreciation | Wear & aging / damage write-down | Stock shrinkage / asset wear (delegated to underlying vertical) |

### Subscription Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Manufacturing | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|---|
| `plan` | Loyalty Program / Membership Tier | Engagement Type | Membership Program / Treatment Plan | Service Program | Manufacturing Programme (toll-manufacturing / OEM supply / blanket-order schedule) | Academic Program (degree program / certificate / continuing ed track) | Lease Program (12-mo industrial / 24-mo IT / 5-yr commercial RE) | Membership Tier (founding / regular / supporter / institutional) |
| `plan_location` | Program Availability | Engagement Availability | Program Availability (which clinics) | Service Area / Coverage Zone | Plant Eligibility (which plants can run this programme) | Program Availability per Campus | Lease Program Availability per yard/depot | Membership availability per branch |
| `price_plan` | Membership Pricing | Engagement Pricing / Fee Structure | Membership Tier Pricing | Program Pricing | Programme Pricing (annual minimum quantity / tooling amortisation / surcharge schedule) | Program Tuition Pricing | Lease Pricing Tier (deposit + term + renewal terms) | Membership pricing (dues structure per tier) |
| `subscription` | Customer Membership / Loyalty Enrollment | Active Engagement / Retainer | Active Membership / Treatment Package | Active Service Contract / Subscription | Customer Supply Agreement / Blanket Order (active long-running B2B commitment) | Enrollment (student × program × term) | Active Lease Contract | Active member service subscription / share package |
| `license` | Membership Benefit / Perk | Entitlement / Credit | Package Session / Credit Allotment | Service Entitlement / Bag Allowance | Pre-paid Production Credits / Reserved Capacity | Course Credit / Class Pass | Pre-paid Service Credits / Mileage Allowance | Member service entitlement (vote credits, service quota, draw-right) |

### Payment Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Manufacturing | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|---|
| `invoice` | Sales Invoice / Receipt | Client Invoice / Fee Note | Patient Invoice / Checkout Receipt | Customer Invoice / Statement | Customer Invoice / Commercial Invoice (export invoices carry incoterms) | Tuition Invoice / Statement | Lease Invoice / Monthly Statement | Member service invoice |
| `balance` | Customer Account Balance | Client Account / Outstanding Balance | Patient Account / Beauty Bank Balance | Account Balance / Prepaid Credit | Customer A/R Balance / Deposit on custom build | Student Account Balance | Lessee Account / Security Deposit | Member account balance |
| `payment` | Payment Transaction | Client Payment | Patient Payment (card, CareCredit) | Payment (card, ACH, cash) | Customer Payment (ACH / wire / cheque / export receipt) | Tuition Payment | Lease Payment / Deposit / End-of-term Charges | Member payment / dues / share payment |

### Revenue Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Manufacturing | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|---|
| `revenue` | Sales Revenue | Billed Revenue | Treatment Revenue | Service Revenue | Sales Revenue (recognised on shipment; IFRS-15 over-time for tolling) | Tuition Revenue | Lease Revenue / Service Revenue / Damage Charges | Member purchase revenue (Sub-T classified) |
| `revenue_line_item` | Receipt Line Item | Billable Line Item | Treatment Line Item | Service Line Item | Shipment Line Item (1 per shipped SKU × qty × price) | Tuition Line / Lab Fee / Materials Fee | Lease Fee / Late Fee / Damage Fee / Mileage Overage | Member transaction line (drives patronage base) |
| `revenue_category` | Revenue Category (in-store, online) | Revenue Stream (consulting, advisory) | Revenue Stream (injectables, laser, retail) | Revenue Stream (residential, hospitality) | Revenue Stream (Direct / Distributor / OEM / Tolling / Scrap-Sale / Aftermarket) | Revenue Stream (Tuition / Fees / Books / Activities) | Revenue stream (Lease / Service / Damages / Insurance Pass-through) | Member-sourced vs nonmember-sourced (IRS Sub-T) |

### Event Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Manufacturing | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|---|
| `event` | Promotion / Sale Event | Client Meeting / Workshop / Session | Appointment / Consultation / Botox Party | Pickup / Delivery / Processing Run | Production Schedule Slot / Customer Pickup / Inbound Material Receipt / Audit Visit | Class Period / Lecture / Office Hours / Field Trip | Site Visit / Service Call / Pickup / Delivery | Meeting / general assembly / **governance vote** (new `EVENT_KIND_GOVERNANCE_VOTE`) |
| `event_client` | Event Participant / RSVP | Meeting Attendee | Appointment Attendee | Pickup/Delivery Recipient | Pickup / Audit Attendee | Class Roster / Attendee | Lessee Representative on Site | Consumer-member RSVP (limited — voting uses EventAttendee for cross-stakeholder reach) |
| `event_product` | Promoted Product | Resources Booked for Session | Treatments Booked | Services on This Run | Schedule Line (item-on-schedule for this slot) | Subject Being Taught in Session | Asset Being Serviced | Services on the meeting agenda |

### Workflow Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Manufacturing | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|---|
| `workflow` | Order Fulfillment / Return Process | Engagement Lifecycle | Patient Journey | Garment Processing Pipeline | Production Workflow (optional — inspection routing / approval routing) | Academic Lifecycle (apply → enroll → matriculate → graduate) | Lease Lifecycle (origination → deployment → operation → termination) | Membership Lifecycle (apply → admit → suspend/withdraw → expel) |
| `stage` | Fulfillment Step | Engagement Phase | Journey Phase | Processing Phase | Workflow Stage (inspection / approval) | Academic Stage (application / enrolled / on-leave / graduated) | Lease Stage (pending / deployed / active / terminating / closed) | Membership Stage (applicant / active / suspended / withdrawn / expelled) |
| `activity` | Task (scan, label, pack) | Task / Deliverable | Clinical Task (consent, inject, photo) | Processing Task (pre-treat, wash, press) | Workflow Activity (engine action, not shop-floor activity — see `job_activity`) | Academic Activity (apply, register, drop, complete) | Service Activity (deploy, inspect, maintain, return) | Membership Action (admit, suspend, reinstate, expel) |

### Operations Domain

The Operations domain is the **most actively evolving** — see the [Universal Job Model Expansion (Waves 2–4)](#universal-job-model-expansion-waves-24) section below for the additive entities. The table below reflects today's published proto plus Wave 1 (already landed locally).

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Manufacturing | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|---|
| `job` | Service Work Order (assembly / install / repair / custom build) | Matter / Engagement Project | Treatment Course (e.g., 6-session laser package) | Customer Order / Processing Job | **Production Order** (MO / Work Order) | Course-Term Enrollment (Alice's Algebra II, Spring 2026) | Service Engagement (deployment / cyclic maintenance / repair / return) | Service Job (member onboarding / annual patronage allocation / general assembly / federation engagement) |
| `job_phase` | Work Order Stage | Matter Phase (Discovery / Trial / Closeout) | Course Phase (Consult → Procedure → Follow-up) | Processing Stage (Pickup → Pre-treat → Wash → Press → Delivery) | **Active Operation** (Routing Operation in flight) | Term / Module (Q1, Q2, Q3, Q4) | Phase of a service engagement | Operational phase of a co-op job |
| `job_task` | Work Order Task (cut, assemble, finish) | Deliverable Task (draft motion, depose, file) | Clinical Task (consent, photo, prep, inject, post-care) | Processing Task (sort, spot-treat, machine cycle, fold) | **Work-Center Step** (Routing step in flight) | Lesson / Assignment Instance (Friday Quiz, Final Project) | Discrete task within a phase | Individual co-op service task |
| `job_activity` | Logged Action / Cost-Capture Event | Time / Expense Entry | Treatment Charge | Processing Charge | **Labour / Material / Equipment / Subcontract Ticket** | Per-Student Logged Event (homework submission, lab kit consumed) | Cost capture for service work (tech hours + parts + 3rd-party fees) | Service work cost capture (staff hours, materials, expenses) |
| `activity_labor` | Technician Hours | Billable Hours | Practitioner Time | Operator / Driver Hours | Labour Ticket (operator hours at a routing step) | Instructor Hours (when billable, e.g., tutoring) | Field tech / driver / yard operator hours | Member-worker hours (drives worker-member patronage base) |
| `activity_material` | Parts / Components Used | Project Supplies | Injectable Lot Consumed (Botox vial, units) | Detergent / Chemicals Consumed | Material Issue (raw / component consumption against a routing step) | Lab Kit / Textbook Section Consumed | Parts / consumables / fluids replaced | Co-op supplies consumed |
| `activity_expense` | 3rd-party Vendor Cost | Travel / Sub-contracted Cost | Lab Fee / External Test | Equipment Service / Carrier Fee | Subcontract / Outside-Process Charge (heat-treat, plating, contract labour) | Field Trip Ticket / External Fee | 3rd-party costs (towing, certification, environmental disposal) | 3rd-party costs on co-op jobs |
| `job_template` | Service Order SOP | Matter SOP / Practice Playbook | Treatment Protocol | Service Spec / Care Guide | **BOM-and-Routing** (Recipe / Master Manufacturing Order) — versioned via revision + version_status | Master Curriculum / Master Syllabus | Service SOP (one per Job type) | Reusable service SOP (annual patronage allocation, AGM playbook) |
| `job_template_phase` | SOP Stage Template | Matter Phase Template | Treatment Step Template | Processing Stage Template | Routing Operation (at a work centre, with setup + run-per-unit timing) | Curriculum Module Template | SOP Phase Template | Phase template for co-op SOPs |
| `job_template_task` | SOP Task Template | Phase Task Template | Treatment Task Template | Processing Task Template | Routing Step (with standard labour / machine minutes) | Master Lesson Plan | SOP Task Template | Task template for co-op SOPs |
| `outcome_criteria` | QA Inspection Checkpoint | Quality Standard / Firm SOP Rule | Clinical Standard / Safety Protocol | Service Quality Standard | Quality Specification (with thresholds — LSL / USL / nominal / tolerance) | Learning Standard (Common Core, NGSS, IB rubric) | Inspection Criteria | Cooperative principle adherence check |
| `template_task_criteria` | QA Pinning per Task | Standard Pinning per Task | Clinical Standard Pinning | Quality Standard Pinning | Quality Pin per Routing Step | Pinned Learning Standard | Criteria pinning per inspection task | Pinned co-op compliance check per task |
| `task_outcome` | QA Result per Task | Case Outcome / Quality Assessment | Clinical Outcome / Treatment Result | Service Outcome / Quality Check | QC Result per unit per inspection step | Per-Student Assignment Grade | Inspection Result per criterion | Compliance / quality outcome per task |
| `phase_outcome_summary` | Stage QA Roll-up | Phase Review | Phase Outcome Roll-up | Processing Stage Roll-up | Operation QC Roll-up | Term Report | Service phase QA roll-up | Phase compliance roll-up |
| `job_outcome_summary` | Order QA Score | Matter Scorecard | Treatment Outcome Report | Service Quality Score | **Certificate of Conformance / Quality Report** (`SummaryType.QC_CERTIFICATE`) | Course Report Card | Service Engagement Quality Report | Operational job report (general assembly outcome / audit result) |
| `job_settlement` | Order Final Settlement | Matter Final Bill | Course Final Settlement | Customer Order Settlement | Cost Settlement (WIP relief → FG inventory + variance) | Tuition Reconciliation | Damage / Overage Chargebacks | Patronage settlement / member equity adjustment |

### Communication Domain

The **Communication** domain is net-new (no prior domain exists for threaded two-way dialogue). It is a **cross-vertical primitive for the verticals where a CLIENT-shaped portal principal genuinely exists** — CORE in outsourcing, professional services, and leasing. It is NOT an "any vertical" primitive: counter-facing / short-cycle verticals (laundry) and supplier/member/patient/customer portals (different principal scope) are PARTIAL, PERIPHERAL, or N/A and need an explicit principal-scope extension before reuse. The schema as built is client-principal-scoped (`conversation.client_id = acting_as_client_id`). Child entity is `ConversationPost` (NEVER `Message` — protobuf reserved word; Q-MSG-2). See `docs/plan/20260603-secure-messaging-ticketing/verticals.md` for the full applicability matrix and cross-vertical-primitive note.

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Manufacturing | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|---|
| `conversation` | Customer Support Thread (PARTIAL — customer principal ≠ client scope; most retail support is email-only) | **Case Thread / Matter Query** (CORE — Open→Closed mirrors matter open/close) | Patient Support Thread (PARTIAL — patient is a different principal scope; needs principal-scope review) | N/A (counter-facing / short-cycle; no async-thread portal) | Subcontractor / Supplier Query Thread (PERIPHERAL — supplier principal, not client scope) | Student Support Message (PARTIAL — only if a learner portal exists) | **Support Request / Maintenance Ticket** (CORE — links to a lease via `reference_entity_type`) | Member↔society support thread (PARTIAL — member is a distinct principal scope) |
| `conversation_post` | Customer Message | **Message in a Case Thread** | Patient Message | N/A | Supplier Message | Student Message | Maintenance-Request Message | Member Message |
| `conversation_read_receipt` | Unread Marker (per-reader-principal high-water mark; `last_read_post_id` single cursor) | Unread Marker | Unread Marker | N/A | Unread Marker | Unread Marker | Unread Marker | Unread Marker |
| `conversation_participant` | Team Inbox Member (v2 seam — table shipped v1, queried v2) | Team Inbox Member (v2) | Team Inbox Member (v2) | N/A | Team Inbox Member (v2) | Team Inbox Member (v2) | Team Inbox Member (v2) | Team Inbox Member (v2) |
| `document.Attachment` (reused; `module_key="conversation_post"`) | File on a Message | File on a Message (contract / brief) | File on a Message | N/A | File on a Message (drawing / spec) | File on a Message | File on a Message (statement / amendment) | File on a Message |
| `integration/email` (reused) | New-Message Notification Email | New-Message Notification Email | New-Message Notification Email | N/A | New-Message Notification Email | New-Message Notification Email | New-Message Notification Email | New-Message Notification Email |

> **Applicability legend (honest, not aspirational):** **CORE** = primary deployment surface, full lifecycle + client-principal IDOR scope (Outsourcing / BPO, Professional Services, Leasing). **PARTIAL** = applies only if a portal of the right principal scope is in scope; lower priority. **PERIPHERAL** = narrow/edge use; not a headline surface. **N/A** = the primitive does not fit this vertical's operating model. The CORE verticals are exactly those whose counterparty is a client-shaped principal; PARTIAL/PERIPHERAL verticals with supplier/member/patient/customer principals need a deliberate principal-scope extension (not label-only) before reuse.

---

## Universal Job Model Expansion (Waves 2–4)

The `operation/` proto domain is being generalised under `docs/plan/20260427-universal-job-model/` to handle service / project / maintenance / production work from one schema. Wave 1 (enum extensions + Job/JobTemplate versioning fields + Job output-target fields) has landed locally. **Waves 2–4 add 9 new entities that are universal** — not manufacturing-specific — although manufacturing is the heaviest tier-3 facade and lands first as the proof-of-shape.

The table below shows where each new entity has high (🔴 critical / 🟢 high), medium (🟡), or low (⚪) value across the eight verticals.

| New Entity (Wave) | Retail | Professional Services | Medical Aesthetics | Laundry Services | Manufacturing | Education | Leasing | Mutual* |
|---|---|---|---|---|---|---|---|---|
| `job_template_input` (W2) — universal "expected inputs" / BOM-equivalent | 🟡 service-work only | 🟢 engagement budget | 🟢 treatment kit | 🟡 cycle inputs | 🔴 BOM line | 🟡 per-section resources | 🟡 deployment/maintenance kit | 🟡 per-Job operational template |
| `job_template_input_alternate` (W2) — approved substitutes | ⚪ | 🟡 substitute practitioners | 🔴 clinical Botox-A↔B | ⚪ | 🔴 supplier swap | ⚪ | 🟡 OEM↔aftermarket parts | ⚪ |
| `lot` (W2) — batch + expiry + supplier traceability | 🟡 food / cosmetics / pharmacy | ⚪ | 🔴 vial lots + reconstitution windows | ⚪ | 🔴 raw material traceability | ⚪ | ⚪ | inherits |
| `job_input_plan` (W3) — frozen plan snapshot at release | 🟡 custom build | 🟢 SOW budget freeze | 🟢 treatment package peg | 🟡 cycle baseline | 🔴 MO frozen-BOM peg | 🟡 term budget | 🟡 deployment budget | 🟡 fiscal-year peg |
| `task_interruption` (W3) — downtime + reason | ⚪ | 🟡 waiting on client | ⚪ | 🟢 machine breakdown | 🔴 OEE / shop-floor downtime | ⚪ | 🟢 field-service blocked | ⚪ |
| `job_output` (W4) — what was produced (FG / scrap / rework / deliverable / asset repair / milestone) | 🟢 custom build / install / repair | 🔴 deliverables + milestones | 🔴 treatment record + before/after + Rx | 🟢 delivery confirmation + damage report | 🔴 FG + scrap + rework + by-product + QC cert | 🟢 grades + transcripts + certificates | 🔴 service report + asset repair record | 🟢 patronage statement + AGM minutes |
| `job_cost_ledger_entry` (W4) — append-only cost flow | ⚪ | 🔴 T&M / contract-asset WIP | 🟡 deferred-rev packages | 🟡 per-cycle cost | 🔴 WIP ledger | ⚪ | 🔴 service-engagement WIP | 🟡 operational-cost transparency |
| `job_cost_snapshot` (W4) — period-end balance | ⚪ | 🔴 month-end close | 🟡 package balance | 🟡 open-cycle cost | 🔴 period-end WIP | ⚪ | 🔴 period close | 🟡 fiscal-year snapshot |
| `job_plan_deviation` (W4) — plan vs actual variance | 🟡 custom-build overrun | 🔴 budget variance | 🟡 treatment variance | 🟡 yield variance | 🔴 production variance | ⚪ | 🔴 service overrun | 🟡 governance-budget variance |

🔴 critical · 🟢 high · 🟡 medium · ⚪ low. \*Mutual inherits the underlying-industry profile and adds the mutual-specific governance/patronage applicability shown above.

**Punchline:** Wave 4's `job_output` and `job_cost_ledger_entry` benefit professional services and medical aesthetics nearly as much as they benefit manufacturing — they are the missing primitives for deliverable tracking, WIP, and variance everywhere. Wave 2's `lot` is most valuable in regulated-consumable verticals (medical aesthetics first, manufacturing second, retail's pharmacy aisle third). Wave 3's `task_interruption` is the killer feature for any vertical doing shop-floor or field-service work.

Each vertical README carries its own UJM-applicability section with deeper examples and the lyngua tier-3 keys to author. See:
- [retail/README.md § Universal Job Model — applicability to retail](retail/README.md#universal-job-model--applicability-to-retail)
- [professional-services/README.md § Universal Job Model — applicability to professional services](professional-services/README.md#universal-job-model--applicability-to-professional-services)
- [medical-aesthetics/README.md § Universal Job Model — applicability to medical aesthetics](medical-aesthetics/README.md#universal-job-model--applicability-to-medical-aesthetics)
- [laundry-services/README.md § Universal Job Model — applicability to laundry services](laundry-services/README.md#universal-job-model--applicability-to-laundry-services)
- [manufacturing/README.md](manufacturing/README.md) — canonical facade example
- [education/README.md § Universal Job Model — applicability to education](education/README.md#universal-job-model--applicability-to-education)
- [leasing/README.md § Universal Job Model — applicability to leasing](leasing/README.md#universal-job-model--applicability-to-leasing)
- [mutual/README.md § Universal Job Model — applicability to mutual / cooperatives](mutual/README.md#universal-job-model--applicability-to-mutual--cooperatives)

---

## Key Conceptual Shifts

The matrix above shows terminology, but the real insight is how the *meaning* of core concepts shifts across verticals:

| Concept | Retail | Professional Services | Medical Aesthetics | Laundry Services | Manufacturing | Education | Leasing | Mutual |
|---|---|---|---|---|---|---|---|---|
| **What is being sold?** | Physical goods | People's expertise (by the hour) | Treatments (practitioner skill + injectables) | Processing services (labor + chemicals) | Manufactured goods (raw materials converted to finished goods via a controlled BOM-and-Routing) | Curriculum delivery + outcomes (by the term) | Temporary custody of a physical asset (by the month / year) | Whatever the underlying vertical delivers — Mutual is orthogonal (consumer co-op = goods; worker co-op = expertise; housing co-op = housing units) |
| **What is inventory?** | Products on shelves | People at offices | Consumables in clinic fridges (Botox vials, filler syringes) | Customer property in transit + chemical consumables | Material master: raw (kg, m, pcs), WIP (per-Job snapshot), finished goods (lot-tracked / serial-tracked), by-products, MRO consumables — each at its own physical or logical location | Teachers at campuses + classroom equipment | The fleet: serialized physical assets at yards and customer sites | Inherits from underlying vertical; for worker co-ops, member-workers as the labor pool |
| **What is a transaction?** | Moving goods (receive, sell, return) | Submitting hours worked | Depleting injectables during a treatment | Moving a garment through the processing pipeline | `inventory_movement` rows (ISSUE / COMPLETION / SCRAP / TRANSFER / RECEIPT / RETURN / SELL / EXPIRE) plus `job_activity` rows pinning consumption to a routing step | Logging instructor hours or checking out lab equipment | Custody change event in the asset audit log (LEASE_OUT / LEASE_RETURN) | Inherits from underlying vertical; for worker co-ops, member-worker hours toward patronage |
| **What is a plan?** | Loyalty program to retain customers | Type of engagement offered to clients | Beauty bank membership or multi-session treatment protocol | Service program (residential subscription, hotel linen contract) | Manufacturing programme — toll-manufacturing contract, OEM supply agreement, blanket-order schedule | Academic program (degree track / certificate / continuing education) | Lease program (term, asset type, included services, pricing tier) | Membership tier (founding / regular / supporter / institutional) |
| **What is a subscription?** | Customer's membership enrollment | Client's active engagement contract | Patient's membership or purchased package of sessions | Hotel's linen contract or resident's weekly pickup plan | Customer Supply Agreement — long-running B2B commitment that periodically spawns Production-Order Jobs | Student's enrollment in a program for a term | The active lease contract (lessee × asset × term) | Active member service relationship + share-package equity stake |
| **What is a price list?** | Seasonal/regional product pricing | Rate card (billing rates per role) | Treatment price menu (per-unit, per-area, per-session) | Rate sheet (per-pound, per-piece, monthly contract) | Customer price sheet — per-customer wholesale rate, volume break, tier pricing snapshot | Tuition schedule (per-credit, per-term, by program) | Lease rate card (per-day, per-month, per-mile, per-sq-ft — per yard and period) | Member dues schedule + member-vs-nonmember service pricing |
| **What drives revenue?** | Selling a product | Billing approved hours | Performing treatments (service fee + materials consumed) | Processing volume (weight or piece count) | Shipping finished goods on a customer order (or tolling recognition over time) | Enrollment (tuition pre-billed per term; fees applied at registration) | Recurring lease fees + service chargebacks + damage assessments | Member transactions (member-sourced, IRS Sub-T) + nonmember transactions (taxable ordinary) |
| **What is depreciation?** | Stock shrinkage / markdowns | Unbillable time (bench, training) | Expired products (Botox past reconstitution window) | Linen at end-of-life (200+ wash cycles) or damaged garments | Obsolete-stock write-down / slow-moving NRV reserve on raw and FG | Instructor professional development time (non-instructional) / equipment depreciation | Asset wear and aging (IAS 16 / IFRS 16), damage write-downs from DAMAGE_FOUND transactions | Inherits from underlying vertical; surplus retention/distribution flows through equity (PATRONAGE_RETENTION / PATRONAGE_DISTRIBUTION), not depreciation |
| **What is a Job?** | Service work order attached to a sale | Matter / engagement deliverable | Multi-session treatment course | Customer order moving through processing | Production Order (MO) — one Job per batch of finished goods produced against a BOM-and-Routing | Course-term enrollment per student | Service engagement (deployment, maintenance, repair, return) — multiple Job types per lease | Service Job to members (onboarding, annual patronage allocation, general assembly, federation engagement) |
| **Who is the Job for?** | The buyer (Job.client_id) | The client company | The patient | The customer (account / hotel) | NULL for MTS; specific customer for MTO (sales-order-driven) | The student | The lessee (Job.client_id) | The member (Job.client_id when consumer-member; indirect for worker/producer-member) |
| **Cardinality (Job ↔ party)** | 1 Job per service order per buyer | 1 Job per matter per client (multi-party rare; uses parent_job_id) | 1 Job per treatment course per patient | 1 Job per customer order | 1 Job per production batch; child Jobs for sub-assemblies via `parent_job_id`; rework children via `parent_job_id` + `TaskStatus.REWORK` | 1 Job per (student × course × term) | **Multiple Jobs per Subscription over time** (deployment + N cyclic maintenance + ad-hoc repairs + end-of-term return) — the most heterogeneous Job pattern | Variable — annual operational jobs (1 patronage allocation, 1 AGM per fiscal period) + per-member service jobs as needed |
| **What does JobActivity capture?** | Parts + technician hours | Billable time + expenses + supplies | Injectable units consumed + practitioner time | Chemicals + machine time + operator hours | Material consumption + labour hours + machine-hours + outside-process invoices, each pinned to a routing step | Per-student logged events (submissions, materials, fees) | Service work cost (tech hours + parts + 3rd-party fees) | Service work cost (staff hours, materials, expenses) on co-op jobs |
| **What does TaskOutcome track?** | QA pass/fail per task | Case-quality marker per deliverable | Clinical safety/quality marker per task | Service quality per processing step | QC result per unit per inspection step (rolls up to Certificate of Conformance via `JobOutcomeSummary.summary_type=QC_CERTIFICATE`) | Per-student assignment grade | Inspection result per criterion (drives end-of-term chargebacks) | Cooperative principle adherence per task |
| **Cost vs revenue posture** | Often 0 — most retail orders skip Job entirely | Cost-and-revenue (T&M billing) | Cost-and-revenue (treatment fee + materials) | Cost-and-revenue (per-pound or per-piece pricing) | Cost-only on the MO; revenue runs separately through customer shipments. `cost_flow_type=WIP` (or `CONTRACT_ASSET` for tolling) drives accounting destination | Tuition pre-billed; Job tracks academic execution | Cost-and-revenue (lease fees recurring + service event chargebacks) | Member transactions sum to revenue; surplus distributed via patronage allocation (RETENTION + DISTRIBUTION) |

### Hybrid Model Spectrum

The eight verticals sit on two axes: **product vs. service** and **customer custody duration**:

```
Pure Product                                                                                Pure Service
    │                                                                                            │
    ▼                                                                                            ▼
  Retail   Manufacturing      Laundry Services    Education       Medical Aesthetics   Professional Services
  ──────   ─────────────      ────────────────    ──────────      ───────────────────   ─────────────────────
  Sells    Converts raw to    Processes customer  Delivers        Consumes firm's       Sells people's time
  goods    finished goods     property + depletes curriculum +    inventory on patient  (no physical goods)
  from     against a BOM      chemical            tracks per-     (one-way depletion)
  shelf    + routing          consumables         student outcomes
                              (round-trip +
                              depletion)


                      CUSTOMER CUSTODY DURATION (orthogonal axis)
  Brief (none)                  Days               Months              Years
      │                          │                    │                  │
      ▼                          ▼                    ▼                  ▼
    Retail               Laundry Services       Professional         Leasing
    Manufacturing         (customer property)    Services             (asset at
    (no customer                                 (people-time         customer site
     custody — ships                              delivered on-site)   for months/years)
     to customer)
```

Manufacturing is **product-heavy + minimal customer custody** — like retail, but with a deep operations layer behind the shelf. The BOM-and-Routing replaces a buy-from-supplier transaction with a built-on-site transformation chain. Leasing remains the unique long-custody outlier; manufacturing remains the deepest-operations outlier.

---

## Mutual as Orthogonal Overlay

Mutual is the only vertical in this directory that does **not** describe what is delivered.
It describes **how the firm is owned and governed**: the customers/workers/producers ARE
the owners. Any of the seven industry verticals above can BE a mutual:

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
                      Worker-owned Plant (Manufacturing + Mutual)
```

Concrete combinations:
- **Consumer co-op** = Retail + Mutual (grocery co-op sells goods to its member-owners)
- **Worker co-op** = Professional/Service + Mutual (worker-owners deliver services)
- **Credit union** = Financial Services + Mutual (member-owners borrow and deposit)
- **Housing co-op** = Leasing + Mutual (member-owners occupy units)
- **Producer co-op** = Supply + Mutual (producer-members sell jointly through the co-op)
- **Worker-owned manufacturing** = Manufacturing + Mutual (e.g., Mondragon-style industrial co-op)

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
   - **Universal Job Model — applicability** section showing the W2–W4 entity profile for this vertical
2. Create `verticals/<vertical-name>/scenarios/` with per-domain files:
   - `sales.md`, `inventory.md`, `plan.md`, `subscription.md`, `client.md`, `product.md`
   - `operations.md` if the vertical uses the Job/Phase/Task model
3. Add the vertical as a new column in this matrix (all 9 domain sections + Key Conceptual Shifts + the UJM Expansion table). If the new vertical is an orthogonal overlay (governance / regulatory / ownership) rather than an industry, document it as such (see [Mutual as Orthogonal Overlay](#mutual-as-orthogonal-overlay))
4. Add a lyngua tier-3 directory under `packages/lyngua/translations/en/<vertical-name>/` with the JSON overrides for entity labels and enum values
5. Add the vertical as a recognised `BUSINESS_TYPE` value in service-admin / seeder / setup / fixtures binaries (see `apps/service-admin/cmd/`) and in `packages/copya/golang/v1/seed.go`
