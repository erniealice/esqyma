# Verticals - Proto Domain Terminology Matrix

This matrix maps each Esqyma proto schema term to its industry-specific terminology across supported verticals. Each vertical has a detailed README with domain deep dives, field mappings, and scenario files.

| Vertical | Directory | Status |
|---|---|---|
| Retail | [retail/](retail/) | Complete |
| Professional Services | [professional-services/](professional-services/) | Complete |
| Medical Aesthetics | [medical-aesthetics/](medical-aesthetics/) | Complete |
| Laundry Services | [laundry-services/](laundry-services/) | Complete |
| Events Services | [events-services/](events-services/) | Complete |

---

## Terminology Matrix

> Rows = proto schema definition. Columns = vertical-specific term.

### Entity Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Events Services |
|---|---|---|---|---|---|
| `client` | Customer | Client Company | Patient / Client | Customer / Account | Client (Couple, Corporate Host) |
| `staff` | Store Employee / Sales Associate | Internal Team / Project Manager | Practitioner / Injector | Plant Operator / Route Driver | Creative / Service Provider (Photographer, Videographer, Florist) |
| `delegate` | Account Representative | Client Representative | Corporate Contact / Event Organizer | Account Contact | Event Contact / Day-of Coordinator |
| `admin` | Store Manager / Admin | Practice Director / Firm Admin | Clinic Director / Office Manager | Plant Manager / Operations Director | Studio Owner / Agency Director |
| `location` | Store / Branch / Warehouse | Office / Practice Location | Clinic / Med Spa Location | Processing Plant / Drop-Off Point | Studio / Service Area |
| `group` | Customer Segment | Team / Resource Pool | Patient Segment | Customer Segment | Team / Vendor Category Pool |

### Product Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Events Services |
|---|---|---|---|---|---|
| `product` | Product / SKU | Resource Type / Role | Treatment Type | Service Type | Service Offering (Photography, Videography, Florals) |
| `product_variant` | Product Variant (size, color) | Resource Specialization (AWS, Azure) | Treatment Variation (by area/zone) | Service Tier / Item Category | Duration Tier (4hr, 8hr, Half-Day, Full-Day) |
| `collection` | Product Category / Department | Practice Area / Service Line | Service Category / Menu Section | Service Category | Service Category (Photography, Video, Florals, Music) |
| `resource` | Digital Asset (images, manuals) | Deliverable Template / Work Product | Consent Form / Before-After Photo | Care Guide / Processing Spec | Portfolio / Contract Template / Shot List |
| `price_list` | Seasonal / Regional Price List | Rate Card | Treatment Price Menu | Rate Sheet | Seasonal Price Menu (Peak, Off-Peak, Holiday) |
| `price_product` | Product Price Override | Rate (per resource type) | Treatment Price (per-unit/area/session) | Service Rate (per-pound/piece) | Service Rate per Duration Tier |

### Inventory Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Events Services |
|---|---|---|---|---|---|
| `inventory_item` | Stock Item | Resource (Person) | Clinical Supply | Tracked Garment / Linen | Staff Availability Calendar |
| `inventory_serial` | Serial-Tracked Item | Named Resource (employee ID) | Lot-Tracked Unit (vial + lot number) | RFID-Tagged Item | Named Creative (specific photographer) |
| `inventory_transaction` | Stock Movement | Hours Submitted / Time Entry | Treatment Consumption / Stock Depletion | Processing Cycle / Garment Movement | Calendar Booking / Time Block Reservation |
| `inventory_depreciation` | Markdown / Write-Down | Utilization Write-Down | Expired Product Write-Off | Linen Replacement / Damage Write-Off | Lost Date / Cancelled Booking Write-Off |

### Subscription Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Events Services |
|---|---|---|---|---|---|
| `plan` | Loyalty Program / Membership Tier | Engagement Type | Membership Program / Treatment Plan | Service Program | Service Package Template (Wedding Bundle, Portrait Session) |
| `plan_location` | Program Availability | Engagement Availability | Program Availability (which clinics) | Service Area / Coverage Zone | Service Coverage Area (city, radius, travel zone) |
| `price_plan` | Membership Pricing | Engagement Pricing / Fee Structure | Membership Tier Pricing | Program Pricing | Package Pricing (Essentials, Premium, Luxury) |
| `subscription` | Customer Membership / Loyalty Enrollment | Active Engagement / Retainer | Active Membership / Treatment Package | Active Service Contract / Subscription | Active Event Booking / Contract |
| `license` | Membership Benefit / Perk | Entitlement / Credit | Package Session / Credit Allotment | Service Entitlement / Bag Allowance | Included Add-on / Session Credit (engagement shoot, revision round) |

### Payment Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Events Services |
|---|---|---|---|---|---|
| `invoice` | Sales Invoice / Receipt | Client Invoice / Fee Note | Patient Invoice / Checkout Receipt | Customer Invoice / Statement | Client Invoice (Retainer, Progress, Final Balance) |
| `balance` | Customer Account Balance | Client Account / Outstanding Balance | Patient Account / Beauty Bank Balance | Account Balance / Prepaid Credit | Client Account Balance (retainer paid vs total due) |
| `payment` | Payment Transaction | Client Payment | Patient Payment (card, CareCredit) | Payment (card, ACH, cash) | Payment (retainer, installment, final balance) |

### Revenue Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Events Services |
|---|---|---|---|---|---|
| `revenue` | Sales Revenue | Billed Revenue | Treatment Revenue | Service Revenue | Booking Revenue |
| `revenue_line_item` | Receipt Line Item | Billable Line Item | Treatment Line Item | Service Line Item | Service Line Item (8hr Photography @ $3,500) |
| `revenue_category` | Revenue Category (in-store, online) | Revenue Stream (consulting, advisory) | Revenue Stream (injectables, laser, retail) | Revenue Stream (residential, hospitality) | Revenue Stream (Weddings, Corporate, Portraits) |

### Event Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Events Services |
|---|---|---|---|---|---|
| `event` | Promotion / Sale Event | Client Meeting / Workshop / Session | Appointment / Consultation / Botox Party | Pickup / Delivery / Processing Run | The Event (Wedding, Corporate Gala, Portrait Session) |
| `event_client` | Event Participant / RSVP | Meeting Attendee | Appointment Attendee | Pickup/Delivery Recipient | Client at the Event (Couple, Corporate Host) |
| `event_product` | Promoted Product | Resources Booked for Session | Treatments Booked | Services on This Run | Services Booked for This Event (Photo + Video + Florals) |

### Workflow Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services | Events Services |
|---|---|---|---|---|---|
| `workflow` | Order Fulfillment / Return Process | Engagement Lifecycle | Patient Journey | Garment Processing Pipeline | Booking Lifecycle (Inquiry → Proposal → Contract → Event → Delivery) |
| `stage` | Fulfillment Step | Engagement Phase | Journey Phase | Processing Phase | Lifecycle Phase (Consultation, Planning, Event Day, Post-Production) |
| `activity` | Task (scan, label, pack) | Task / Deliverable | Clinical Task (consent, inject, photo) | Processing Task (pre-treat, wash, press) | Task (send proposal, collect retainer, edit photos, deliver gallery) |

---

## Key Conceptual Shifts

The matrix above shows terminology, but the real insight is how the *meaning* of core concepts shifts across verticals:

| Concept | Retail | Professional Services | Medical Aesthetics | Laundry Services | Events Services |
|---|---|---|---|---|---|
| **What is being sold?** | Physical goods | People's expertise (by the hour) | Treatments (practitioner skill + injectables) | Processing services (labor + chemicals) | Creative talent's time blocks + deliverables |
| **What is inventory?** | Products on shelves | People at offices | Consumables in clinic fridges (Botox vials, filler syringes) | Customer property in transit + chemical consumables | Staff calendar availability (perishable — unbooked dates are lost forever) |
| **What is a transaction?** | Moving goods (receive, sell, return) | Submitting hours worked | Depleting injectables during a treatment | Moving a garment through the processing pipeline | Booking a time block on a creative's calendar |
| **What is a plan?** | Loyalty program to retain customers | Type of engagement offered to clients | Beauty bank membership or multi-session treatment protocol | Service program (residential subscription, hotel linen contract) | Service package template (wedding bundle, portrait session, corporate retainer) |
| **What is a subscription?** | Customer's membership enrollment | Client's active engagement contract | Patient's membership or purchased package of sessions | Hotel's linen contract or resident's weekly pickup plan | Active event booking / contract (one per event, not recurring) |
| **What is a price list?** | Seasonal/regional product pricing | Rate card (billing rates per role) | Treatment price menu (per-unit, per-area, per-session) | Rate sheet (per-pound, per-piece, monthly contract) | Seasonal price menu (peak/off-peak/holiday rates per duration tier) |
| **What drives revenue?** | Selling a product | Billing approved hours | Performing treatments (service fee + materials consumed) | Processing volume (weight or piece count) | Securing dates (retainer at booking) + delivering service (final balance) |
| **What is depreciation?** | Stock shrinkage / markdowns | Unbillable time (bench, training) | Expired products (Botox past reconstitution window) | Linen at end-of-life (200+ wash cycles) or damaged garments | Cancelled bookings, lost dates, unbooked peak-season Saturdays |

### Hybrid Model Spectrum

The five verticals sit on a spectrum from **pure product** to **pure service**:

```
Pure Product                                                              Pure Service
    │                                                                          │
    ▼                                                                          ▼
  Retail       Laundry Services    Medical Aesthetics    Events Services    Professional Services
  ──────       ────────────────    ───────────────────   ───────────────    ─────────────────────
  Sells goods  Processes customer  Consumes firm's       Sells reserved     Sells people's time
  from shelf   property + depletes inventory on patient  time blocks of     (no physical goods,
               chemical consumables (one-way depletion)  creative talent    ongoing engagements)
               (round-trip + depletion)                  (perishable dates)
```

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
3. Add the vertical as a new column in this matrix
