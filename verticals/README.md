# Verticals - Proto Domain Terminology Matrix

This matrix maps each Esqyma proto schema term to its industry-specific terminology across supported verticals. Each vertical has a detailed README with domain deep dives, field mappings, and scenario files.

| Vertical | Directory | Status |
|---|---|---|
| Retail | [retail/](retail/) | Complete |
| Professional Services | [professional-services/](professional-services/) | Complete |

---

## Terminology Matrix

> Rows = proto schema definition. Columns = vertical-specific term.

### Entity Domain

| Proto Schema | Retail | Professional Services |
|---|---|---|
| `client` | Customer | Client Company |
| `staff` | Store Employee / Sales Associate | Internal Team / Project Manager |
| `delegate` | Account Representative | Client Representative |
| `admin` | Store Manager / Admin | Practice Director / Firm Admin |
| `location` | Store / Branch / Warehouse | Office / Practice Location |
| `group` | Customer Segment | Team / Resource Pool |

### Product Domain

| Proto Schema | Retail | Professional Services |
|---|---|---|
| `product` | Product / SKU | Resource Type / Role |
| `product_variant` | Product Variant (size, color) | Resource Specialization (AWS, Azure) |
| `collection` | Product Category / Department | Practice Area / Service Line |
| `resource` | Digital Asset (images, manuals) | Deliverable Template / Work Product |
| `price_list` | Seasonal / Regional Price List | Rate Card |
| `price_product` | Product Price Override | Rate (per resource type) |

### Inventory Domain

| Proto Schema | Retail | Professional Services |
|---|---|---|
| `inventory_item` | Stock Item | Resource (Person) |
| `inventory_serial` | Serial-Tracked Item | Named Resource (employee ID) |
| `inventory_transaction` | Stock Movement | Hours Submitted / Time Entry |
| `inventory_depreciation` | Markdown / Write-Down | Utilization Write-Down |

### Subscription Domain

| Proto Schema | Retail | Professional Services |
|---|---|---|
| `plan` | Loyalty Program / Membership Tier | Engagement Type |
| `plan_location` | Program Availability | Engagement Availability |
| `price_plan` | Membership Pricing | Engagement Pricing / Fee Structure |
| `subscription` | Customer Membership / Loyalty Enrollment | Active Engagement / Retainer |
| `license` | Membership Benefit / Perk | Entitlement / Credit |

### Payment Domain

| Proto Schema | Retail | Professional Services |
|---|---|---|
| `invoice` | Sales Invoice / Receipt | Client Invoice / Fee Note |
| `balance` | Customer Account Balance | Client Account / Outstanding Balance |
| `payment` | Payment Transaction | Client Payment |

### Revenue Domain

| Proto Schema | Retail | Professional Services |
|---|---|---|
| `revenue` | Sales Revenue | Billed Revenue |
| `revenue_line_item` | Receipt Line Item | Billable Line Item |
| `revenue_category` | Revenue Category (in-store, online) | Revenue Stream (consulting, advisory) |

### Event Domain

| Proto Schema | Retail | Professional Services |
|---|---|---|
| `event` | Promotion / Sale Event | Client Meeting / Workshop / Session |
| `event_client` | Event Participant / RSVP | Meeting Attendee |
| `event_product` | Promoted Product | Resources Booked for Session |

### Workflow Domain

| Proto Schema | Retail | Professional Services |
|---|---|---|
| `workflow` | Order Fulfillment / Return Process | Engagement Lifecycle |
| `stage` | Fulfillment Step | Engagement Phase |
| `activity` | Task (scan, label, pack) | Task / Deliverable |

---

## Key Conceptual Shifts

The matrix above shows terminology, but the real insight is how the *meaning* of core concepts shifts across verticals:

| Concept | Retail | Professional Services |
|---|---|---|
| **What is being sold?** | Physical goods | People's expertise (by the hour) |
| **What is inventory?** | Products on shelves | People at offices |
| **What is a transaction?** | Moving goods (receive, sell, return) | Submitting hours worked |
| **What is a plan?** | Loyalty program to retain customers | Type of engagement offered to clients |
| **What is a subscription?** | Customer's membership enrollment | Client's active engagement contract |
| **What is a price list?** | Seasonal/regional product pricing | Rate card (billing rates per role) |
| **What drives revenue?** | Selling a product | Billing approved hours |
| **What is depreciation?** | Stock shrinkage / markdowns | Unbillable time (bench, training) |

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
