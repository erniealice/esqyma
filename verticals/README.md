# Verticals - Proto Domain Terminology Matrix

This matrix maps each Esqyma proto schema term to its industry-specific terminology across supported verticals. Each vertical has a detailed README with domain deep dives, field mappings, and scenario files.

| Vertical | Directory | Status |
|---|---|---|
| Retail | [retail/](retail/) | Complete |
| Professional Services | [professional-services/](professional-services/) | Complete |
| Medical Aesthetics | [medical-aesthetics/](medical-aesthetics/) | Complete |
| Laundry Services | [laundry-services/](laundry-services/) | Complete |

---

## Terminology Matrix

> Rows = proto schema definition. Columns = vertical-specific term.

### Entity Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services |
|---|---|---|---|---|
| `client` | Customer | Client Company | Patient / Client | Customer / Account |
| `staff` | Store Employee / Sales Associate | Internal Team / Project Manager | Practitioner / Injector | Plant Operator / Route Driver |
| `delegate` | Account Representative | Client Representative | Corporate Contact / Event Organizer | Account Contact |
| `admin` | Store Manager / Admin | Practice Director / Firm Admin | Clinic Director / Office Manager | Plant Manager / Operations Director |
| `location` | Store / Branch / Warehouse | Office / Practice Location | Clinic / Med Spa Location | Processing Plant / Drop-Off Point |
| `group` | Customer Segment | Team / Resource Pool | Patient Segment | Customer Segment |

### Product Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services |
|---|---|---|---|---|
| `product` | Product / SKU | Resource Type / Role | Treatment Type | Service Type |
| `product_variant` | Product Variant (size, color) | Resource Specialization (AWS, Azure) | Treatment Variation (by area/zone) | Service Tier / Item Category |
| `collection` | Product Category / Department | Practice Area / Service Line | Service Category / Menu Section | Service Category |
| `resource` | Digital Asset (images, manuals) | Deliverable Template / Work Product | Consent Form / Before-After Photo | Care Guide / Processing Spec |
| `price_list` | Seasonal / Regional Price List | Rate Card | Treatment Price Menu | Rate Sheet |
| `price_product` | Product Price Override | Rate (per resource type) | Treatment Price (per-unit/area/session) | Service Rate (per-pound/piece) |

### Inventory Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services |
|---|---|---|---|---|
| `inventory_item` | Stock Item | Resource (Person) | Clinical Supply | Tracked Garment / Linen |
| `inventory_serial` | Serial-Tracked Item | Named Resource (employee ID) | Lot-Tracked Unit (vial + lot number) | RFID-Tagged Item |
| `inventory_transaction` | Stock Movement | Hours Submitted / Time Entry | Treatment Consumption / Stock Depletion | Processing Cycle / Garment Movement |
| `inventory_depreciation` | Markdown / Write-Down | Utilization Write-Down | Expired Product Write-Off | Linen Replacement / Damage Write-Off |

### Subscription Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services |
|---|---|---|---|---|
| `plan` | Loyalty Program / Membership Tier | Engagement Type | Membership Program / Treatment Plan | Service Program |
| `plan_location` | Program Availability | Engagement Availability | Program Availability (which clinics) | Service Area / Coverage Zone |
| `price_plan` | Membership Pricing | Engagement Pricing / Fee Structure | Membership Tier Pricing | Program Pricing |
| `subscription` | Customer Membership / Loyalty Enrollment | Active Engagement / Retainer | Active Membership / Treatment Package | Active Service Contract / Subscription |
| `license` | Membership Benefit / Perk | Entitlement / Credit | Package Session / Credit Allotment | Service Entitlement / Bag Allowance |

### Payment Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services |
|---|---|---|---|---|
| `invoice` | Sales Invoice / Receipt | Client Invoice / Fee Note | Patient Invoice / Checkout Receipt | Customer Invoice / Statement |
| `balance` | Customer Account Balance | Client Account / Outstanding Balance | Patient Account / Beauty Bank Balance | Account Balance / Prepaid Credit |
| `payment` | Payment Transaction | Client Payment | Patient Payment (card, CareCredit) | Payment (card, ACH, cash) |

### Revenue Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services |
|---|---|---|---|---|
| `revenue` | Sales Revenue | Billed Revenue | Treatment Revenue | Service Revenue |
| `revenue_line_item` | Receipt Line Item | Billable Line Item | Treatment Line Item | Service Line Item |
| `revenue_category` | Revenue Category (in-store, online) | Revenue Stream (consulting, advisory) | Revenue Stream (injectables, laser, retail) | Revenue Stream (residential, hospitality) |

### Event Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services |
|---|---|---|---|---|
| `event` | Promotion / Sale Event | Client Meeting / Workshop / Session | Appointment / Consultation / Botox Party | Pickup / Delivery / Processing Run |
| `event_client` | Event Participant / RSVP | Meeting Attendee | Appointment Attendee | Pickup/Delivery Recipient |
| `event_product` | Promoted Product | Resources Booked for Session | Treatments Booked | Services on This Run |

### Workflow Domain

| Proto Schema | Retail | Professional Services | Medical Aesthetics | Laundry Services |
|---|---|---|---|---|
| `workflow` | Order Fulfillment / Return Process | Engagement Lifecycle | Patient Journey | Garment Processing Pipeline |
| `stage` | Fulfillment Step | Engagement Phase | Journey Phase | Processing Phase |
| `activity` | Task (scan, label, pack) | Task / Deliverable | Clinical Task (consent, inject, photo) | Processing Task (pre-treat, wash, press) |

---

## Key Conceptual Shifts

The matrix above shows terminology, but the real insight is how the *meaning* of core concepts shifts across verticals:

| Concept | Retail | Professional Services | Medical Aesthetics | Laundry Services |
|---|---|---|---|---|
| **What is being sold?** | Physical goods | People's expertise (by the hour) | Treatments (practitioner skill + injectables) | Processing services (labor + chemicals) |
| **What is inventory?** | Products on shelves | People at offices | Consumables in clinic fridges (Botox vials, filler syringes) | Customer property in transit + chemical consumables |
| **What is a transaction?** | Moving goods (receive, sell, return) | Submitting hours worked | Depleting injectables during a treatment | Moving a garment through the processing pipeline |
| **What is a plan?** | Loyalty program to retain customers | Type of engagement offered to clients | Beauty bank membership or multi-session treatment protocol | Service program (residential subscription, hotel linen contract) |
| **What is a subscription?** | Customer's membership enrollment | Client's active engagement contract | Patient's membership or purchased package of sessions | Hotel's linen contract or resident's weekly pickup plan |
| **What is a price list?** | Seasonal/regional product pricing | Rate card (billing rates per role) | Treatment price menu (per-unit, per-area, per-session) | Rate sheet (per-pound, per-piece, monthly contract) |
| **What drives revenue?** | Selling a product | Billing approved hours | Performing treatments (service fee + materials consumed) | Processing volume (weight or piece count) |
| **What is depreciation?** | Stock shrinkage / markdowns | Unbillable time (bench, training) | Expired products (Botox past reconstitution window) | Linen at end-of-life (200+ wash cycles) or damaged garments |

### Hybrid Model Spectrum

The four verticals sit on a spectrum from **pure product** to **pure service**:

```
Pure Product                                                    Pure Service
    │                                                               │
    ▼                                                               ▼
  Retail          Laundry Services    Medical Aesthetics    Professional Services
  ──────          ────────────────    ───────────────────   ─────────────────────
  Sells goods     Processes customer  Consumes firm's       Sells people's time
  from shelf      property + depletes inventory on patient  (no physical goods)
                  chemical consumables (one-way depletion)
                  (round-trip + depletion)
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
