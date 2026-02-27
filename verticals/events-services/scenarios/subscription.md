# Events Services Scenarios: Subscription (Booking Contracts)

Subscription scenarios cover the full lifecycle of event bookings — from wedding contract creation through staff assignment, rescheduling, and corporate retainer credit management.

---

## Full Wedding Booking Lifecycle

Emily Smith selects the "Complete Wedding — Premium ($10,500)" package after her consultation call. The booking progresses through contract, retainer, planning, and event delivery.

```
Step 1: Subscription created from proposal
  ┌──────────────────────────────────────────────────────┐
  │  Subscription "Smith-Johnson Wedding — Jun 14"        │
  │    ├── client_id: FK to "Emily Smith"                  │
  │    ├── price_plan_id: FK to "Premium ($10,500)"        │
  │    ├── date_start: 2025-06-14 (event date)             │
  │    ├── date_end: 2025-08-14 (delivery deadline)        │
  │    ├── quantity: 4 (service slots: photo, 2nd, video,  │
  │    │               florals)                            │
  │    ├── assigned_count: 0 (staff assignment pending)    │
  │    ├── available_count: 4                              │
  │    └── metadata:                                       │
  │         ├── venue: "Timberline Lodge, Mt Hood, OR"     │
  │         ├── guest_count: "150"                         │
  │         ├── retainer_amount: "3150.00" (30%)           │
  │         ├── retainer_type: "non_refundable"            │
  │         ├── retainer_paid: "false"                     │
  │         ├── balance_schedule: "35%_6mo,35%_30days"     │
  │         ├── booking_mode: "proposal"                   │
  │         └── cancellation_policy: "retainer_forfeit"    │
  └──────────────────────────────────────────────────────┘

  License entitlements created:
    ├── License 1: "Engagement Shoot" — available
    ├── License 2: "Revision Round 1" — available
    └── License 3: "Revision Round 2" — available

  Workflow "Smith-Johnson Booking" advanced to:
    Stage 4 (Contract & Retainer)

Step 2: Contract signed, retainer collected
  ├── Activity: "Contract sent for e-signature" ✓
  ├── Activity: "Contract signed by Emily & Jordan" ✓
  ├── Activity: "Retainer invoice generated"
  │    └── Invoice: $3,150 (30% of $10,500)
  ├── Activity: "Retainer payment received"
  │    └── Payment: $3,150 via Visa ****8821
  │
  └── Subscription updated:
       └── metadata.retainer_paid: "true"

  InventoryTransactions updated:
    ├── Jane (lead photo): status "hold" → "confirmed"
    ├── Tom (video): status "hold" → "confirmed"
    └── (2nd shooter, florals assigned later)

Step 3: Staff assigned (planning phase)
  ┌──────────────────────────────────────────────────────┐
  │  Staff Assignment:                                     │
  │    ├── Lead photographer: Jane Martinez               │
  │    │    InventoryTransaction: "reservation", 8hr       │
  │    │    status: "confirmed"                            │
  │    │                                                  │
  │    ├── Second shooter: Sam Park                        │
  │    │    InventoryTransaction: "reservation", 8hr       │
  │    │    status: "confirmed"                            │
  │    │                                                  │
  │    ├── Videographer: Tom Chen                          │
  │    │    InventoryTransaction: "reservation", 10hr      │
  │    │    status: "confirmed"                            │
  │    │                                                  │
  │    └── Floral designer: Priya Sharma                  │
  │         InventoryTransaction: "setup", 4hr             │
  │         status: "confirmed"                            │
  │         (setup morning-of, departs before ceremony)    │
  └──────────────────────────────────────────────────────┘

  Subscription updated:
    ├── assigned_count: 4
    └── available_count: 0 (fully staffed)

Step 4: Progress payment collected
  ├── Invoice: $3,675 (35% of $10,500)
  │    ├── Due: 6 months before event
  │    └── Sent to Emily, CC Jordan
  └── Payment: $3,675 via ACH transfer

  Balance after progress payment:
    └── Outstanding: $3,675 (final 35%)

Step 5: Final balance collected (30 days before)
  ├── Invoice: $3,675 (final balance)
  ├── Payment: $3,675 via Visa
  └── Balance: $0.00 — fully paid

Step 6: Event day
  InventoryTransactions updated:
    ├── Jane: status "confirmed" → "in_progress"
    ├── Sam: status "confirmed" → "in_progress"
    ├── Tom: status "confirmed" → "in_progress"
    └── Priya: status "confirmed" → "completed"
        (setup done by 10am, departed)

  After event:
    ├── All staff: status "in_progress" → "completed"
    └── Workflow advanced to Stage 7 (Post-Production)

Step 7: Engagement shoot redeemed (pre-wedding)
  ├── License 1 "Engagement Shoot": available → redeemed
  ├── Event created: "Smith-Johnson Engagement Shoot"
  │    ├── start: Mar 22, 3:00 PM (2.5 months before wedding)
  │    ├── duration: 1.5 hours
  │    └── event_product: Jane (portrait session)
  └── No additional charge (included in package)

Step 8: Delivery
  ├── Gallery delivered (4 weeks after wedding)
  ├── Full wedding film delivered (8 weeks after)
  ├── License 2 "Revision Round 1": redeemed
  │    (Emily requests 5 edits to favorite photos)
  │
  ├── All InventoryTransactions: status → "delivered"
  └── Workflow: Stage 8 (Delivery & Follow-Up) ✓

Final Revenue:
  ┌──────────────────────────────────────────────────────┐
  │  Revenue "Smith-Johnson Wedding"                      │
  │    ├── RevenueLineItem: Lead Photography 8hr = $3,500 │
  │    ├── RevenueLineItem: Second Shooter 8hr = $1,500   │
  │    ├── RevenueLineItem: Videography 10hr = $4,000     │
  │    ├── RevenueLineItem: Full Venue Florals = $3,200   │
  │    ├── RevenueLineItem: Package discount = -$1,700    │
  │    │    └── line_item_type: "discount"                │
  │    └── Total: $10,500                                 │
  │                                                       │
  │  Payments received:                                   │
  │    ├── Retainer: $3,150                               │
  │    ├── Progress: $3,675                               │
  │    └── Final: $3,675                                  │
  │    Total: $10,500 ✓                                   │
  └──────────────────────────────────────────────────────┘
```

**Key insight**: The wedding subscription lifecycle spans months (booking → event → delivery). Revenue is recognized in stages — retainer at booking, with the package discount applied proportionally across line items. The `License` records track included credits that may be redeemed months before or after the event itself.

---

## Self-Service Portrait Booking

Alex Davis books a family portrait directly from the website. The entire flow is automated — no admin involvement until the session day.

```
Client visits booking page:
  ├── Plan: "Portrait Mini-Session"
  │    └── booking_mode: "self_service"
  ├── Sees available slots for next 90 days
  ├── Selects: "Extended Session 1hr ($400)"
  │    └── PricePlan: "Extended Session 1hr"
  └── Selects: Sunday Oct 5, 2:00 PM

Auto-created entities:
  ┌──────────────────────────────────────────────────────┐
  │  Subscription (auto-created)                          │
  │    ├── client_id: FK to Alex Davis (auto-created)      │
  │    ├── price_plan_id: FK to "Extended Session 1hr"     │
  │    ├── date_start: 2025-10-05                          │
  │    ├── date_end: 2025-10-19 (delivery within 2 weeks) │
  │    ├── quantity: 1 (one photographer)                  │
  │    ├── assigned_count: 1 (auto-assigned: Jane)        │
  │    └── metadata:                                       │
  │         ├── booking_mode: "self_service"               │
  │         ├── location: "Washington Park, Portland"      │
  │         └── session_type: "family"                     │
  └──────────────────────────────────────────────────────┘

  Event "Davis Family Portraits"
    ├── event_client: Alex Davis
    ├── event_product: "Portrait Photography - 1hr"
    ├── start: Sun Oct 5, 2:00 PM
    └── end: Sun Oct 5, 3:00 PM

  InventoryTransaction
    ├── inventory_item_id: FK to Jane's calendar
    ├── transaction_type: "reservation"
    ├── quantity: 1 (hour)
    ├── status: "confirmed" (auto-advanced)
    └── serial_number: "PHOTO-001-JANE"

  Invoice: $400.00
  Payment: $400.00 via Stripe (collected at booking)
  Balance: $0.00

Confirmation email sent:
  ├── Date: Sunday, October 5, 2025
  ├── Time: 2:00 PM - 3:00 PM
  ├── Location: Washington Park, Portland
  ├── Photographer: Jane Martinez
  ├── What to bring: comfortable clothes, favorite props
  └── Reschedule/cancel link (24-hour policy)
```

**Key insight**: Self-service bookings auto-create the entire entity chain in one transaction. The `Subscription` has `assigned_count: 1` immediately because the system auto-assigns the photographer based on the staff-service matrix and availability. From the client's perspective, it's as simple as Calendly. From the data model's perspective, it's the same structure as a wedding booking — just with fewer services and auto-advanced stages.

---

## Rescheduling an Event

The Chen wedding (originally booked for August 23) needs to move to September 6 due to a venue change. Both dates are in peak season.

```
Original booking:
  Subscription "Chen Wedding — Aug 23"
    ├── date_start: 2025-08-23
    ├── Staff: Jane (photo), Tom (video)
    └── InventoryTransactions: confirmed for Aug 23

Client requests reschedule to Sep 6:
  │
  ▼
Step 1: Check availability for new date
  ├── Jane on Sep 6: AVAILABLE ✓
  ├── Tom on Sep 6: AVAILABLE ✓
  └── Both creatives can make the new date

Step 2: Update booking
  Subscription updated:
    ├── date_start: 2025-08-23 → 2025-09-06
    ├── date_end: adjusted (+2 weeks for delivery)
    └── metadata += {"rescheduled_from": "2025-08-23",
                     "reschedule_date": "2025-07-10",
                     "reschedule_reason": "venue_change"}

Step 3: Release old date, reserve new date
  ┌──────────────────────────────────────────────────────┐
  │  Jane's InventoryTransactions:                        │
  │    Old: Aug 23 reservation → status: "rescheduled"    │
  │    New: Sep 6 reservation created, status: "confirmed"│
  │                                                       │
  │  Tom's InventoryTransactions:                         │
  │    Old: Aug 23 reservation → status: "rescheduled"    │
  │    New: Sep 6 reservation created, status: "confirmed"│
  └──────────────────────────────────────────────────────┘

Step 4: Revenue impact
  ├── No fee (reschedule policy: free if >14 days notice)
  ├── Same PriceList applies (both dates in peak season)
  ├── Total unchanged: $8,200
  └── If new date was off-peak: would pricing change?
       → Depends on contract terms (metadata.rate_lock)

Step 5: Calendar availability restored
  ├── Aug 23: now open for all staff — may rebook
  └── Sep 6: locked for Chen wedding

Notification sent to client:
  "Your wedding has been rescheduled to September 6, 2025.
   Same team (Jane + Tom), same package. Updated timeline
   will be sent 30 days before your new date."
```

**Key insight**: Rescheduling creates new `InventoryTransactions` for the new date and marks old ones as `"rescheduled"`. The old transactions are preserved for audit trail (when was the original booking, what changed). The `Subscription` stays the same — only `date_start` and metadata change. This is cleaner than cancelling and rebooking because it preserves the contract continuity, payment history, and license entitlements.

---

## Corporate Retainer — Using Event Credits

Velocity Tech redeems their Q2 event credit for a summer company picnic. The event runs longer than the 6-hour credit, incurring overage.

```
Before booking:
  Subscription "Velocity Tech — Annual Retainer"
    ├── quantity: 4 (total credits)
    ├── assigned_count: 1 (Q1 used)
    ├── available_count: 3
    └── License records:
         ├── License 1: "Q1 Event" — redeemed ✓
         ├── License 2: "Q2 Event" — available
         ├── License 3: "Q3 Event" — available
         └── License 4: "Q4 Event" — available

Marcus (delegate) books Q2 picnic:
  "July 12, 11am-6pm (7 hours), outdoor at Pioneer Square"

License 2 redeemed:
  ├── status: available → redeemed
  └── metadata: {"event_id": "EVT-VT-Q2-2025"}

Event created: "Velocity Tech Summer Picnic"
  ├── event_client: Marcus Rivera (delegate)
  ├── event_product:
  │    ├── Event Photography (Jane, 7hr)
  │    ├── Event Videography (Tom, 7hr)
  │    └── DJ Services (Marco, 5hr)
  ├── start: Jul 12, 11:00 AM
  └── end: Jul 12, 6:00 PM

Subscription updated:
  ├── assigned_count: 2
  └── available_count: 2

Revenue for Q2 event:
  ┌──────────────────────────────────────────────────────┐
  │  RevenueLineItem 1 (covered by credit):               │
  │    ├── description: "Q2 Event Credit — 6hr coverage"  │
  │    ├── total_price: $0.00 (prepaid via retainer)      │
  │    └── line_item_type: "item"                         │
  │                                                       │
  │  RevenueLineItem 2 (overage — photography):           │
  │    ├── description: "Photography overage: 1hr"        │
  │    ├── quantity: 1                                     │
  │    ├── unit_price: $350 (overage rate from metadata)  │
  │    ├── total_price: $350                              │
  │    └── line_item_type: "item"                         │
  │                                                       │
  │  RevenueLineItem 3 (overage — videography):           │
  │    ├── description: "Videography overage: 1hr"        │
  │    ├── quantity: 1                                     │
  │    ├── unit_price: $350                               │
  │    ├── total_price: $350                              │
  │    └── line_item_type: "item"                         │
  │                                                       │
  │  Total additional charge: $700                        │
  └──────────────────────────────────────────────────────┘

Invoice sent to Velocity Tech:
  ├── "Q2 Event Coverage — prepaid (credit redeemed)"
  ├── "Photography overage: 1hr × $350 = $350"
  ├── "Videography overage: 1hr × $350 = $350"
  ├── Total due: $700 (payment terms: net 30)
  └── Next quarterly retainer payment ($3,750) due Jul 1
```

**Key insight**: The retainer `License` covers the base credit (6 hours), and any overage creates additional `RevenueLineItems` at the contract's overage rate. The base coverage shows as `$0.00` on the invoice (prepaid), making it clear to the client what was included vs extra. DJ overage isn't charged here because the DJ was only 5 hours (under the 6hr credit) — only the 7-hour services exceed the credit.
