# Supplier Domain

The supplier domain models **external parties your organization purchases from** — raw materials, equipment, services, or any goods acquired through expenditure. It answers:

1. **Who do we buy from?** (Supplier — the master record)
2. **What type of supplier are they?** (SupplierCategory — classification)
3. **What custom data do we track?** (SupplierAttribute — extensible metadata)
4. **Are they also a customer?** (optional `client_id` FK — dual-role support)

This domain is the **expenditure-side counterpart** to `Client` (which is the revenue-side counterpart). While `Client` represents parties who pay you, `Supplier` represents parties you pay.

---

## Governing Standards & ERP Precedent

The supplier entity is governed by procurement best practices and accounting standards for **accounts payable**:

| Standard / System | Relevance | Key Requirements |
|-------------------|-----------|-----------------|
| **IAS 1** | Presentation of Financial Statements | Trade payables must be separately presented |
| **IFRS 9** | Financial Instruments | Trade payables classified as financial liabilities at amortized cost |
| **IAS 21** | Foreign Currency | Supplier transactions in non-functional currency require translation |
| **SAP S/4HANA** | Business Partner model | Unified BP with Supplier role; 3-level hierarchy (General > Company Code > Purchasing Org) |
| **Oracle Fusion** | Supplier Model | Supplier > Address > Site > Contact hierarchy |
| **ERPNext** | Supplier doctype | Dedicated entity with supplier_group, payment_terms, tax_id |
| **Odoo** | res.partner | Single model with `supplier_rank` field for dual-role |

---

## Domain Placement Rationale

### Why `domain/entity/supplier/` (not a separate domain)?

The `entity` domain owns **"who/what participates in business transactions"**:
- `Client` = party on the revenue side (buys from you)
- `Supplier` = party on the expenditure side (you buy from them)
- `User` = internal person (operates the system)
- `Location` = physical place (where transactions occur)
- `Staff` = internal workforce

Suppliers share the same lifecycle pattern as clients: they are external counterparties with contact info, categories, and attributes. Creating a separate `procurement/` or `supplier/` domain would be an orphan with one entity.

### Why NOT extend Client with `is_supplier`?

1. **Naming confusion** — "a client who supplies you" is semantically wrong
2. **Field pollution** — Suppliers need `tax_id`, `payment_terms`, `lead_time_days`, `credit_limit` — none of which belong on Client
3. **Clean separation** — Each entity has only its relevant fields
4. **Dual-role bridge** — Optional `client_id` FK handles "this supplier is also a customer" cleanly

---

## Entity Definitions

### 1. Supplier (Master Record)

The central entity. Fields synthesized from SAP, Oracle, ERPNext, Odoo, and adapted to esqyma conventions.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Primary key (UUID) |
| `user_id` | string (FK) | Contact person -> entity.User (mirrors client.user_id) |
| `user` | optional User | Nested user object |
| `date_created` | optional int64 | Record creation timestamp |
| `date_created_string` | optional string | ISO date string |
| `date_modified` | optional int64 | Last modification timestamp |
| `date_modified_string` | optional string | ISO date string |
| `active` | bool | Soft delete flag (default: true) |
| `internal_id` | string | Auto-generated readable ID (unique, e.g., "SUP-0001") |
| `category_id` | optional string (FK) | Reference to SupplierCategory |
| `category` | optional SupplierCategory | Nested category |
| `supplier_type` | string | "company" or "individual" |
| `company_name` | string | Legal entity name |
| `tax_id` | optional string | TIN/VAT/EIN — critical for compliance |
| `registration_number` | optional string | Business registration / company number |
| `street_address` | optional string | Primary address |
| `city` | optional string | City |
| `province` | optional string | State/province |
| `postal_code` | optional string | ZIP/postal code |
| `country` | optional string | ISO 3166 country code |
| `default_currency` | optional string | Billing currency (ISO 4217) |
| `payment_terms` | optional string | "net_30", "net_60", "2_10_net_30" |
| `lead_time_days` | optional int32 | Default delivery lead time |
| `credit_limit` | optional double | Maximum outstanding payable |
| `status` | optional string | "active", "blocked", "on_hold" |
| `client_id` | optional string (FK) | If also a customer -> entity.Client |
| `website` | optional string | Company website URL |
| `notes` | optional string | Free-form notes |
| `categories` | repeated SupplierCategory | All categories (for multi-tag) |

**FK References:** `expenditure.supplier_id`, `asset.supplier_id`, `asset_maintenance.supplier_id`, `product_supplier.supplier_id`, `inventory_item.default_supplier_id`

### 2. SupplierCategory (Classification)

Bridge table: supplier <-> category. Groups suppliers for filtering and reporting.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Primary key |
| `supplier_id` | string (FK) | Reference to Supplier |
| `category_id` | string (FK) | Reference to common.Category |
| `category` | optional Category | Nested category |
| `date_created` | optional int64 | Creation timestamp |
| `date_created_string` | optional string | ISO date string |

**Typical Categories for Service Business (Salon/Spa):**
- Product Suppliers (shampoo, hair color, skin care)
- Equipment Suppliers (salon chairs, dryers, laser machines)
- Service Contractors (plumbing, electrical, HVAC)
- Office Suppliers (paper, toner, cleaning supplies)
- Technology Vendors (POS hardware, software licenses)
- Utilities (electric, water, internet)

### 3. SupplierAttribute (Extensible Custom Fields)

Following the established `{Entity}Attribute` junction pattern.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Primary key |
| `supplier_id` | string (FK) | Reference to Supplier |
| `attribute_id` | string (FK) | Reference to common.Attribute |
| `attribute` | optional Attribute | Nested attribute |
| `value` | string | Attribute value |
| `date_created` | optional int64 | Creation timestamp |
| `date_created_string` | optional string | ISO date string |

Unique constraint: `supplier_id, attribute_id`

---

## Integration Points with Existing Domains

### Supplier <-> Entity (entity domain)

- `Supplier.user_id` -> `entity.User` (contact person — mirrors `client.user_id`)
- `Supplier.client_id` -> `entity.Client` (dual-role: "this supplier is also our customer")

### Supplier <-> Expenditure (expenditure domain)

- `Expenditure.supplier_id` -> `Supplier` (**replaces current `vendor_id -> Client`**)
- `ExpenditureLineItem` references products, not supplier directly

### Supplier <-> Asset (asset domain)

- `Asset.supplier_id` -> `Supplier` (who sold/provided the fixed asset)
- `AssetMaintenance.supplier_id` -> `Supplier` (maintenance contractor)

### Supplier <-> Product (product domain)

- `ProductSupplier` junction table (future): which suppliers provide which products, at what price, lead time, and supplier part number

### Supplier <-> Inventory (inventory domain)

- `InventoryItem.default_supplier_id` -> `Supplier` (preferred supplier for reorder, future)

### Supplier <-> Payment (payment domain)

- `Disbursement.supplier_id` -> `Supplier` (payment disbursements to suppliers)

### Supplier <-> Ledger (ledger domain)

- AP aging reports query `expenditure` grouped by `supplier_id` (no direct FK needed — derived)

---

## FK Migration Plan

Once `Supplier` exists, the following FKs should be updated:

| Proto | Current FK | New FK |
|-------|-----------|--------|
| `expenditure.vendor_id -> client` | `vendor_id` | `supplier_id -> supplier` |
| `asset.vendor_id -> client` | `vendor_id` | `supplier_id -> supplier` |
| `asset_maintenance.vendor_id -> client` | `vendor_id` | `supplier_id -> supplier` |
| *(new)* `inventory_item.default_supplier_id` | — | `supplier_id -> supplier` |

---

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS "supplier" (
    "id" TEXT PRIMARY KEY,
    "date_created" TIMESTAMPTZ NULL,
    "date_modified" TIMESTAMPTZ NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "user_id" TEXT NOT NULL REFERENCES "user"(id),
    "internal_id" TEXT NOT NULL UNIQUE,
    "category_id" TEXT REFERENCES supplier_category(id),
    "supplier_type" TEXT NOT NULL DEFAULT 'company',
    "company_name" TEXT NOT NULL,
    "tax_id" TEXT,
    "registration_number" TEXT,
    "street_address" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postal_code" TEXT,
    "country" TEXT DEFAULT 'PH',
    "default_currency" TEXT DEFAULT 'PHP',
    "payment_terms" TEXT DEFAULT 'net_30',
    "lead_time_days" INTEGER,
    "credit_limit" DOUBLE PRECISION,
    "status" TEXT DEFAULT 'active',
    "client_id" TEXT REFERENCES client(id),
    "website" TEXT,
    "notes" TEXT
);

CREATE TABLE IF NOT EXISTS "supplier_category" (
    "id" TEXT PRIMARY KEY,
    "date_created" TIMESTAMPTZ NULL,
    "date_modified" TIMESTAMPTZ NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "supplier_id" TEXT NOT NULL REFERENCES supplier(id),
    "category_id" TEXT NOT NULL REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS "supplier_attribute" (
    "id" TEXT PRIMARY KEY,
    "date_created" TIMESTAMPTZ NULL,
    "date_modified" TIMESTAMPTZ NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "supplier_id" TEXT NOT NULL REFERENCES supplier(id),
    "attribute_id" TEXT NOT NULL REFERENCES attribute(id),
    "value" TEXT NOT NULL,
    UNIQUE("supplier_id", "attribute_id")
);
```

---

## Protobuf Schema

### Package

```protobuf
syntax = "proto3";
package domain.entity.v1;
option go_package = "github.com/erniealice/esqyma/golang/v1/domain/entity/supplier";
```

### Service Pattern

```protobuf
service SupplierDomainService {
  rpc CreateSupplier(CreateSupplierRequest) returns (CreateSupplierResponse);
  rpc ReadSupplier(ReadSupplierRequest) returns (ReadSupplierResponse);
  rpc UpdateSupplier(UpdateSupplierRequest) returns (UpdateSupplierResponse);
  rpc DeleteSupplier(DeleteSupplierRequest) returns (DeleteSupplierResponse);
  rpc ListSuppliers(ListSuppliersRequest) returns (ListSuppliersResponse);
  rpc GetSupplierListPageData(GetSupplierListPageDataRequest) returns (GetSupplierListPageDataResponse);
  rpc GetSupplierItemPageData(GetSupplierItemPageDataRequest) returns (GetSupplierItemPageDataResponse);
}
```

---

## Implementation Priority

### Phase 1 (MVP) — This Epic

1. `Supplier` proto + CRUD service + page data RPCs
2. `SupplierCategory` proto + service
3. `SupplierAttribute` proto + service
4. Espyna use cases + PostgreSQL adapters
5. Entydad views, templates, CSS, routes, labels
6. Service-admin sidebar integration ("Suppliers" app)
7. Database seeder (`cmd/seed-suppliers/main.go`)
8. E2E tests

### Phase 2 (Extended) — Future

9. `ProductSupplier` junction (product domain)
10. FK migration: `expenditure.vendor_id` -> `supplier_id`
11. FK migration: `asset.vendor_id` -> `supplier_id`
12. AP aging reports in fycha

### Phase 3 (Advanced) — Future

13. Supplier portal (self-service)
14. Supplier bank accounts (payment domain integration)
15. Supplier certifications
16. Supplier performance ratings

---

## Seed Data (Service Business — Salon/Spa)

| ID | Internal ID | Company Name | Type | Category | Payment Terms |
|----|-------------|-------------|------|----------|---------------|
| `sup-001` | `SUP-0001` | L'Oreal Philippines | company | Product Supplier | net_30 |
| `sup-002` | `SUP-0002` | Takara Belmont PH | company | Equipment Supplier | net_60 |
| `sup-003` | `SUP-0003` | Manila Water Company | company | Utilities | net_15 |
| `sup-004` | `SUP-0004` | TechForce IT Solutions | company | Technology Vendor | net_30 |
| `sup-005` | `SUP-0005` | ProClean Janitorial | company | Service Contractor | net_15 |
| `sup-006` | `SUP-0006` | Juan dela Cruz (Freelance Electrician) | individual | Service Contractor | immediate |

---

## Sources

### Domain Model and Entity Design
- [SAP S/4HANA Business Partner Structure](https://blog.sap-press.com/understanding-the-sap-s4hana-business-partner-structure)
- [Oracle Supplier Model](https://docs.oracle.com/en/cloud/saas/procurement/25a/oaprc/oracle-supplier-model.html)
- [ERPNext Supplier Documentation](https://docs.erpnext.com/docs/user/manual/en/supplier)
- [Odoo: supplier_rank in res.partner](https://www.odoo.com/forum/help-1/supplier-rank-not-defined-in-res-partner-265817)

### Vendor Master Data
- [SAP Vendor Master Data Structure](https://skillstek.com/vendor-master-data-structure/)
- [Master Vendor File Best Practices](https://www.fidesic.com/blog/master-vendor-file-best-practices-and-setup-in-dynamics-bc-and-gp)
- [Supplier Master Data Management](https://www.verdantis.com/vendor-master-data/)

### Accounting Standards
- [IAS 1: Presentation of Financial Statements](https://www.ifrs.org/content/dam/ifrs/publications/html-standards/english/2024/issued/ias1.html)
- [EY: Accounting for payments from suppliers](https://www.ey.com/en_gl/technical/ifrs-technical-resources/applying-ifrs-accounting-for-payments-from-suppliers)
- [IFRS 9: Financial Instruments](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-9-financial-instruments/)

### ERP Comparison
- [Vendors vs. Suppliers: Key Differences](https://usetorg.com/blog/vendors-vs-suppliers)
- [SAP Business Partner Concept](https://community.sap.com/t5/technology-blog-posts-by-members/business-partner-concept-in-sap-s-4hana/ba-p/13560054)
- [Oracle: Best Practices to Model Prospects, Customers, Suppliers](https://www.ateam-oracle.com/best-practices-to-model-prospects-customers-suppliers-partners-in-an-oracle-fusion-cloud-implementation)
