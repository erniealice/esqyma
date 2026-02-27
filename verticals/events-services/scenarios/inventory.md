# Events Services Scenarios: Inventory (Calendar & Availability)

Inventory scenarios cover the core scheduling engine — checking availability across staff calendars, booking dates with buffer and travel time, managing staff holidays and time-off blocks, handling cancellations that release dates, and seasonal availability planning.

---

## Checking Availability Across Staff Calendars

A client inquires about a Saturday wedding on June 14. The admin needs to check which creatives are available across photography, videography, and florals.

```
Query: "Who is available Saturday, June 14, 2025?"

Availability computation for each staff member:
  ┌──────────────────────────────────────────────────────┐
  │  Jane Martinez (Lead Photographer)                     │
  │    Working hours (from AvailabilitySchedule):          │
  │      ├── Sat: 07:00 - 22:00 (wedding-day hours)       │
  │      └── Available: YES (default)                      │
  │                                                       │
  │    Check 1: Existing bookings (InventoryTransactions)  │
  │      └── Jun 14: No reservations — CLEAR              │
  │                                                       │
  │    Check 2: External calendar sync (CalendarSync)      │
  │      └── Google Calendar: No busy blocks — CLEAR       │
  │                                                       │
  │    Check 3: Personal blocks                            │
  │      └── No vacation/PTO blocks — CLEAR                │
  │                                                       │
  │    Check 4: Buffer from adjacent bookings              │
  │      ├── Jun 13 (Fri): Rehearsal dinner shoot 5-9pm    │
  │      │    + 60min buffer_after = blocked until 10pm     │
  │      └── Jun 14 starts 07:00 — OK (10pm + 9hr gap)    │
  │                                                       │
  │    ✅ AVAILABLE — Jun 14 full day                      │
  └──────────────────────────────────────────────────────┘
  ┌──────────────────────────────────────────────────────┐
  │  Tom Chen (Videographer)                               │
  │    Working hours: Sat: 07:00 - 22:00                   │
  │                                                       │
  │    Check 1: Existing bookings                          │
  │      └── Jun 14: "Johnson-Lee Wedding" — 10hr booked   │
  │                                                       │
  │    ❌ UNAVAILABLE — Already booked for Jun 14          │
  └──────────────────────────────────────────────────────┘
  ┌──────────────────────────────────────────────────────┐
  │  Priya Sharma (Floral Designer)                        │
  │    Working hours: Sat: 06:00 - 14:00 (setup-only day) │
  │                                                       │
  │    Check 1: Existing bookings                          │
  │      └── Jun 14: No reservations — CLEAR              │
  │                                                       │
  │    Check 2: External calendar                          │
  │      └── CLEAR                                         │
  │                                                       │
  │    Check 3: Personal blocks                            │
  │      └── CLEAR                                         │
  │                                                       │
  │    ✅ AVAILABLE — Jun 14 morning (setup window)        │
  │    Note: Priya's working hours are 06:00-14:00 on     │
  │    Saturdays because floral setup happens morning-of   │
  └──────────────────────────────────────────────────────┘

Result summary:
  ├── Photography: Jane AVAILABLE, Sam AVAILABLE
  ├── Videography: Tom UNAVAILABLE — suggest alternative:
  │    └── Freelancer referral or reschedule to Jun 21
  └── Florals: Priya AVAILABLE
```

**Key insight**: Availability is **computed in real-time**, never stored as a static value. The system checks five layers: (1) working hours schedule, (2) existing bookings, (3) synced external calendars, (4) personal blocks, and (5) buffer constraints from adjacent bookings. Each staff member can have different working hours per day (Priya works mornings only on Saturdays).

---

## Booking a Date with Buffer and Travel Time

Jane is booked for the Smith-Johnson wedding at Timberline Lodge (90 min drive from Portland). The booking system creates buffer and travel blocks around the main event.

```
Event: "Smith-Johnson Wedding"
  ├── Venue: Timberline Lodge, Mt Hood, OR
  ├── Event time: 12:00 PM - 10:00 PM (10 hours)
  ├── Staff: Jane (lead photo), Sam (second shooter)
  └── BufferConfig for "Wedding Photography":
       ├── buffer_before_minutes: 30 (prep at venue)
       ├── buffer_after_minutes: 15 (pack equipment)
       ├── setup_minutes: 0 (no setup for photo)
       └── teardown_minutes: 0

Travel time computed:
  ├── Portland Studio → Timberline Lodge: 90 min
  └── Timberline Lodge → Portland Studio: 90 min

Calendar blocks created (Jane's calendar, Jun 14):
  ┌──────────────────────────────────────────────────────┐
  │  06:00 │                                              │
  │  ...   │                                              │
  │  09:00 │░░░░░ TRAVEL (Portland → Timberline) ░░░░░░  │
  │  09:00 │ InventoryTransaction:                        │
  │  -     │   transaction_type: "travel"                 │
  │  10:30 │   quantity: 1.5 (hours)                      │
  │        │   from_location_id: Portland Studio           │
  │        │   to_location_id: Timberline Lodge            │
  │        │   status: "confirmed"                         │
  │  10:30 │░░░░░ BUFFER (prep at venue) ░░░░░░░░░░░░░░  │
  │  -     │ InventoryTransaction:                        │
  │  11:00 │   transaction_type: "buffer"                 │
  │        │   quantity: 0.5 (hours)                       │
  │  11:00 │                                              │
  │  ...   │                                              │
  │  11:00 │▓▓▓▓▓ RESERVED — Smith-Johnson Wedding ▓▓▓▓▓ │
  │  -     │ InventoryTransaction:                        │
  │  21:00 │   transaction_type: "reservation"            │
  │        │   quantity: 10 (hours)                        │
  │        │   reference_type: "subscription"              │
  │        │   reference_id: "SUB-SMITH-2025"              │
  │        │   serial_number: "PHOTO-001-JANE"             │
  │        │   status: "confirmed"                         │
  │  21:00 │░░░░░ BUFFER (pack equipment) ░░░░░░░░░░░░░  │
  │  -     │ InventoryTransaction:                        │
  │  21:15 │   transaction_type: "buffer"                 │
  │  21:15 │░░░░░ TRAVEL (Timberline → Portland) ░░░░░░  │
  │  -     │ InventoryTransaction:                        │
  │  22:45 │   transaction_type: "travel"                 │
  │        │   quantity: 1.5 (hours)                       │
  └──────────────────────────────────────────────────────┘

Jane's calendar for Jun 14 is now blocked:
  09:00 AM → 10:45 PM (total: 13h 45min)
  Even though the event is 10 hours, Jane is unavailable
  for 13h 45min due to travel + buffers.

Impact on other potential bookings:
  ├── Can Jane do a morning portrait at 8am? NO (travel starts 9am,
  │    not enough time for portrait + gap)
  ├── Can Jane do a portrait on Jun 15 at 8am? YES (arrives home
  │    10:45pm Jun 14, fresh day starts)
  └── Buffer/travel blocks are invisible to clients — they just
      see "unavailable" for the full window
```

**Key insight**: Travel time and buffers are modeled as separate `InventoryTransactions` with their own `transaction_type` values (`"travel"`, `"buffer"`). This is critical because they directly affect availability — a 10-hour wedding at a remote venue actually consumes ~14 hours of a photographer's day. Without explicit buffer/travel blocks, the system might double-book a morning session on the same day.

---

## Staff Blocking Availability — Holidays and Time Off

Creatives need to block their calendars for personal time, holidays, and extended breaks. The system supports both studio-wide holiday closures and individual staff time-off requests.

```
STUDIO-WIDE HOLIDAY CLOSURES
  ┌──────────────────────────────────────────────────────┐
  │  Admin configures annual holidays for the studio:      │
  │                                                       │
  │  AvailabilitySchedule (studio-level override):         │
  │    DateOverride entries:                               │
  │      ├── date: "2025-11-27", available: false          │
  │      │    reason: "Thanksgiving"                       │
  │      ├── date: "2025-11-28", available: false          │
  │      │    reason: "Thanksgiving (Black Friday)"        │
  │      ├── date: "2025-12-24", available: false          │
  │      │    reason: "Christmas Eve"                      │
  │      ├── date: "2025-12-25", available: false          │
  │      │    reason: "Christmas Day"                      │
  │      └── date: "2026-01-01", available: false          │
  │           reason: "New Year's Day"                     │
  │                                                       │
  │  Effect: ALL staff show "unavailable" on these dates.  │
  │  Clients see zero availability on the booking page.    │
  │  No manual blocking needed per staff member.           │
  └──────────────────────────────────────────────────────┘

INDIVIDUAL STAFF TIME-OFF (vacation, personal days)
  ┌──────────────────────────────────────────────────────┐
  │  Jane requests 2 weeks off: Jul 21 — Aug 3, 2025      │
  │                                                       │
  │  Option A: AvailabilitySchedule DateOverrides          │
  │    ├── date: "2025-07-21", available: false            │
  │    │    reason: "Vacation"                             │
  │    ├── date: "2025-07-22", available: false            │
  │    │    ... (14 days total)                            │
  │    └── date: "2025-08-03", available: false            │
  │         reason: "Vacation"                             │
  │                                                       │
  │  Option B: InventoryTransaction blocks                 │
  │    ├── InventoryTransaction:                           │
  │    │    ├── inventory_item_id: FK to Jane's calendar   │
  │    │    ├── transaction_type: "block"                  │
  │    │    ├── quantity: 14 (days)                        │
  │    │    ├── status: "confirmed"                        │
  │    │    ├── notes: "Summer vacation — approved"        │
  │    │    └── performed_by: "ADMIN-STUDIO-001" (approved)│
  │    └── This single transaction blocks the full range   │
  │                                                       │
  │  Effect on availability:                               │
  │    ├── Jane shows "unavailable" Jul 21 - Aug 3         │
  │    ├── Other staff (Tom, Priya, Sam) unaffected        │
  │    ├── Clients browsing "Wedding Photography" see:     │
  │    │    ├── Jane: unavailable these dates              │
  │    │    └── Sam (if qualified): still available         │
  │    └── Any existing holds for these dates flagged:     │
  │         "Warning: Jane has a soft hold for Jul 26.     │
  │          Reassign to Sam or release the hold."         │
  └──────────────────────────────────────────────────────┘

PER-STAFF RECURRING SCHEDULE ADJUSTMENTS
  ┌──────────────────────────────────────────────────────┐
  │  Priya (florist) doesn't work Mondays or Tuesdays:    │
  │                                                       │
  │  AvailabilitySchedule "Priya - Default":               │
  │    windows:                                            │
  │      ├── Mon: (none — not available)                   │
  │      ├── Tue: (none — not available)                   │
  │      ├── Wed: 08:00 - 17:00                            │
  │      ├── Thu: 08:00 - 17:00                            │
  │      ├── Fri: 08:00 - 20:00 (extended for setup days) │
  │      ├── Sat: 06:00 - 14:00 (setup mornings only)     │
  │      └── Sun: (none — not available)                   │
  │                                                       │
  │  Tom takes every other Friday off:                     │
  │    AvailabilitySchedule "Tom - Bi-Weekly":             │
  │      ├── Standard weeks: Mon-Sat 08:00 - 20:00        │
  │      └── DateOverrides for each off-Friday:            │
  │           ├── date: "2025-06-06", available: false     │
  │           ├── date: "2025-06-20", available: false     │
  │           └── ... (recurring pattern via overrides)    │
  └──────────────────────────────────────────────────────┘

ADMIN VIEW: Staff availability dashboard (June 2025)
  ┌──────────────────────────────────────────────────────┐
  │        Mon  Tue  Wed  Thu  Fri  Sat  Sun             │
  │ Jun 2   ·    ·    ·    ·    ·   14   ·              │
  │                                                       │
  │ Jane   [  ] [  ] [  ] [  ] [  ] [▓▓] [  ]   ▓=booked│
  │ Tom    [  ] [  ] [  ] [  ] [  ] [▓▓] [  ]   ░=hold  │
  │ Sam    [  ] [  ] [  ] [  ] [  ] [  ] [  ]   ▪=block  │
  │ Priya  [▪▪] [▪▪] [  ] [  ] [  ] [  ] [▪▪]  ▪=no hrs│
  │ Marco  [  ] [  ] [  ] [  ] [  ] [░░] [  ]            │
  │                                                       │
  │ Jun 14 detail:                                        │
  │  Jane  ▓ Smith-Johnson Wedding (confirmed)             │
  │  Tom   ▓ Johnson-Lee Wedding (confirmed)               │
  │  Sam   · Available                                     │
  │  Priya · Available (setup 06:00-14:00 only)            │
  │  Marco ░ Smith-Johnson Wedding (hold, awaiting confirm)│
  └──────────────────────────────────────────────────────┘
```

**Key insight**: Staff availability blocking works at three levels: (1) **studio-wide holidays** via shared `AvailabilitySchedule` `DateOverride` entries that affect all staff, (2) **individual time-off** via per-staff `DateOverride` entries or `InventoryTransaction` blocks, and (3) **recurring schedule patterns** via per-staff `AvailabilityWindow` definitions. The system cascades: studio holidays override individual schedules, and individual blocks override default working hours.

---

## Handling a Cancellation and Releasing the Date

The Martinez-Lopez couple cancels their September wedding. They signed a contract with a non-refundable retainer. The date needs to be released for rebooking.

```
Before cancellation:
  Subscription "Martinez-Lopez Wedding — Sep 20"
    ├── status: active
    ├── client_id: FK to Martinez family
    ├── date_start: 2025-09-20
    ├── metadata: {"retainer_amount": "3000.00",
    │              "retainer_paid": "true",
    │              "cancellation_policy": "non_refundable_retainer"}
    └── assigned staff:
         ├── Jane (lead photo): InventoryTransaction "reservation", confirmed
         ├── Tom (video): InventoryTransaction "reservation", confirmed
         └── Priya (florals): InventoryTransaction "setup", confirmed

Client requests cancellation
  │
  ▼
Step 1: Update booking status
  Subscription:
    ├── status: active → cancelled
    └── metadata += {"cancellation_date": "2025-07-15",
                     "cancellation_reason": "wedding_called_off"}

Step 2: Release calendar dates
  ┌──────────────────────────────────────────────────────┐
  │  Jane's InventoryTransaction:                         │
  │    ├── status: "confirmed" → "cancelled"              │
  │    └── Sep 20 released back to availability            │
  │                                                       │
  │  Tom's InventoryTransaction:                          │
  │    ├── status: "confirmed" → "cancelled"              │
  │    └── Sep 20 released                                 │
  │                                                       │
  │  Priya's InventoryTransaction:                        │
  │    ├── status: "confirmed" → "cancelled"              │
  │    └── Sep 20 released                                 │
  └──────────────────────────────────────────────────────┘

Step 3: Revenue impact
  ┌──────────────────────────────────────────────────────┐
  │  Retainer: $3,000 (non-refundable)                    │
  │    ├── Revenue.status: remains "earned"               │
  │    ├── RevenueLineItem: "Retainer — non-refundable"   │
  │    │    total_price: $3,000                            │
  │    └── No refund issued                                │
  │                                                       │
  │  Remaining balance: $7,500 (never invoiced)            │
  │    └── No revenue impact (was never collected)         │
  │                                                       │
  │  Lost opportunity cost:                                │
  │    inventory_depreciation:                             │
  │      ├── reason: "late_cancellation"                   │
  │      ├── estimated_value: $7,500 (balance not earned)  │
  │      └── notes: "Sep 20 peak Saturday — may rebook"    │
  │                                                       │
  │  Net: $3,000 retainer earned, $7,500 potential lost    │
  │  If date rebooks: depreciation reversed/reduced        │
  └──────────────────────────────────────────────────────┘

Step 4: Availability restored
  ├── Jane: Sep 20 now shows "available" on booking page
  ├── Tom: Sep 20 available
  ├── Priya: Sep 20 available
  └── Admin marks Sep 20 as "priority rebook" — can promote
      with a discount to fill the newly-opened peak date
```

**Key insight**: Cancellation creates an `inventory_depreciation` record for the *potential lost revenue* (balance that will never be collected), while the non-refundable retainer remains as earned revenue. This is analogous to medical aesthetics' expired product write-off — both represent revenue that could have been earned but wasn't. If the date rebooks, the depreciation can be offset.

---

## Seasonal Availability Management — Peak Season Prep

As peak wedding season approaches (May-October), the studio adjusts availability, closes bookings for certain dates, and plans capacity.

```
January planning for peak season:
  ┌──────────────────────────────────────────────────────┐
  │  CURRENT BOOKING STATUS (as of Jan 15, 2025)          │
  │                                                       │
  │  May 2025: 3 of 4 Saturdays booked (75%)              │
  │  Jun 2025: 4 of 4 Saturdays booked (100% — FULL)     │
  │  Jul 2025: 2 of 5 Saturdays booked (40%)              │
  │  Aug 2025: 3 of 4 Saturdays booked (75%)              │
  │  Sep 2025: 2 of 4 Saturdays booked (50%)              │
  │  Oct 2025: 1 of 5 Saturdays booked (20%)              │
  └──────────────────────────────────────────────────────┘

Admin actions:
  ┌──────────────────────────────────────────────────────┐
  │  1. Block personal time BEFORE peak season fills:      │
  │                                                       │
  │     Jane blocks Jul 4-6 (personal holiday):            │
  │       AvailabilitySchedule DateOverrides:              │
  │         ├── Jul 4: available: false, reason: "Holiday" │
  │         ├── Jul 5: available: false, reason: "Holiday" │
  │         └── Jul 6: available: false, reason: "Holiday" │
  │                                                       │
  │     Tom blocks Aug 16-17 (friend's wedding):           │
  │       InventoryTransaction:                            │
  │         ├── transaction_type: "block"                  │
  │         ├── quantity: 2 (days)                          │
  │         ├── notes: "Personal — friend's wedding"       │
  │         └── status: "confirmed"                        │
  │                                                       │
  │  2. Set max advance for peak Saturdays:                │
  │     BookingPolicy for "Wedding Photography":           │
  │       ├── max_advance_days: 365                        │
  │       └── min_advance_hours: 336 (14 days)             │
  │                                                       │
  │  3. Limit daily bookings during peak:                  │
  │     BookingPolicy update:                              │
  │       └── max_daily_bookings: 1 (for weddings)         │
  │           (ensures no double-booking on Saturdays)      │
  │                                                       │
  │  4. Open up "second shooter only" dates:               │
  │     Sam (second shooter) available for:                │
  │       ├── Jun 7 — available as lead for micro-weddings │
  │       ├── Jul 12 — available as lead for elopements    │
  │       └── Mark as separate InventoryItem for:          │
  │           "Elopement Photography" (lower-tier service)  │
  └──────────────────────────────────────────────────────┘

Staff time-off approval workflow:
  ┌──────────────────────────────────────────────────────┐
  │  Staff requests time off:                              │
  │    1. Staff submits request via portal                 │
  │    2. System checks for conflicts:                     │
  │       ├── Any existing bookings on requested dates?    │
  │       ├── Any soft holds on requested dates?           │
  │       └── Is this a peak Saturday?                     │
  │    3. If no conflicts → auto-approved                  │
  │    4. If conflicts → flagged for admin review:         │
  │       "Jane requests Jul 26 off. There is a soft hold │
  │        for the Rivera Wedding on that date."           │
  │       Admin decides: approve (reassign Rivera to Sam)  │
  │       or deny (ask Jane to pick different dates)       │
  │    5. Approved → DateOverride or block created          │
  │    6. Calendar updated, future availability recomputed  │
  └──────────────────────────────────────────────────────┘
```

**Key insight**: Seasonal availability management is proactive — staff should block personal time *before* peak season fills up. The system's time-off approval workflow checks for conflicts against existing bookings and holds, preventing the scenario where a photographer takes vacation after a client has a soft hold on that date. Studio-wide holidays are set once and cascade to all staff calendars automatically.
