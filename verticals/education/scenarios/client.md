# Education Scenarios: Client (Student Onboarding & Profiles)

In education, the `Client` is the student. Guardian/parent linkage uses the `Delegate + DelegateClient` pattern. Student-specific metadata (grade level, learning plan, transcript history) lives in `ClientAttribute` rows — no schema changes required.

---

## Student Onboarding (New Admission)

```
Admission office processes new student: Alicia Mendoza, Grade 7

Step 1: Create Client record
  ┌────────────────────────────────────────────────────────────┐
  │  Client                                                    │
  │    ├── id: "clt-alicia-mendoza"                            │
  │    ├── name: "Alicia Mendoza"                              │
  │    ├── email: "alicia.mendoza@students.school.edu"         │
  │    ├── status: "active"                                    │
  │    ├── country: "PH"                                       │
  │    └── workspace_id: FK → school workspace                 │
  └────────────────────────────────────────────────────────────┘

Step 2: Create guardian Delegate record
  ┌────────────────────────────────────────────────────────────┐
  │  Delegate                                                  │
  │    ├── id: "del-roberto-mendoza"                           │
  │    ├── name: "Roberto Mendoza"                             │
  │    ├── email: "r.mendoza@gmail.com"                        │
  │    └── role: "parent"  (delegate_attribute)                │
  └────────────────────────────────────────────────────────────┘

Step 3: Link delegate to student
  ┌────────────────────────────────────────────────────────────┐
  │  DelegateClient                                            │
  │    ├── delegate_id: "del-roberto-mendoza"                  │
  │    └── client_id: "clt-alicia-mendoza"                     │
  └────────────────────────────────────────────────────────────┘

Step 4: Store student metadata as ClientAttribute rows
  ├── ClientAttribute: key="grade_level"       value="7"
  ├── ClientAttribute: key="section"           value="7-Rizal"
  ├── ClientAttribute: key="learning_plan"     value="standard"
  ├── ClientAttribute: key="student_id_no"     value="2026-00441"
  └── ClientAttribute: key="admission_date"    value="2026-06-01"
```

**Entities involved**: `Client`, `Delegate`, `DelegateClient`, `ClientAttribute`

---

## Parent/Guardian Linkage for Billing Purposes

Tuition invoices go to the guardian, not the student. The `DelegateClient` join enables the billing system to route invoices to `Delegate.email` while keeping the subscription's `client_id` pointing to the student.

```
Invoice routing:
  Subscription.client_id → "clt-alicia-mendoza"  (student)
  DelegateClient.delegate_id → "del-roberto-mendoza"  (payer)
  Invoice.billing_contact_override → Delegate.email  (if implemented)

Multiple guardians:
  ├── DelegateClient: delegate_id="del-roberto-mendoza" (father, primary)
  └── DelegateClient: delegate_id="del-marina-mendoza"  (mother, secondary)
      └── DelegateAttribute: key="billing_priority" value="2"
```

**Key insight**: One student can have multiple delegates (co-guardians, scholarship office contact, etc.). The `DelegateClient` is a many-to-many join — no schema change needed for multi-guardian households.

---

## Student Attribute Records — Learning Needs & Transcript History

```
Special learning needs student: Marco Villanueva

ClientAttribute rows:
  ├── key="grade_level"            value="10"
  ├── key="iep_status"             value="active"
  │     (IEP = Individualized Education Program)
  ├── key="accommodation_notes"    value="extended_time,large_font"
  ├── key="previous_school"        value="Ateneo de Davao"
  ├── key="transfer_date"          value="2026-01-15"
  └── key="transcript_reference"   value="TRANSCRIPT-2025-ADC-0081"

Transcript history summary is stored as attributes, not a separate entity.
The actual transcript document lives in Document.Attachment:
  ├── Attachment.module_key: "client"
  ├── Attachment.reference_id: "clt-marco-villanueva"
  └── Attachment.file_url: "https://storage.../transcripts/TRANSCRIPT-2025-ADC-0081.pdf"
```

**Key insight**: `ClientAttribute` is the flexible metadata store for all student-specific fields not part of the core `Client` proto. Documents (transcripts, IEPs) use the `document.Attachment` entity with `module_key = "client"`.

---

## What's NOT Modeled This Way

- **Class rosters**: A roster is a query — `SELECT client_id FROM job WHERE job_template_id = 'tmpl-algebra2-b-2026' AND cycle_period_start = '2026-01-15'` — not a separate entity.
- **Faculty records**: Teachers are `Staff` records, not `Client` records. Staff time and outcomes are recorded via `ActivityLabor.staff_id` and `TaskOutcome.recorded_by`.
- **Batch enrollment**: Multiple students enrolling at once is a batch `CreateSubscription` call per student, not a single multi-client subscription.
