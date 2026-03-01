# AGENTS.md - Esqyma Schema v1

This file provides guidance for AI agents working with the protobuf schema definitions in this directory.

## Overview

`esqyma/proto/v1` contains all Protocol Buffer (`.proto`) definitions for the platform. These schemas define the data contracts used across the entire system—backend services, frontend clients, and integrations.

**Tooling:** This project uses [Buf](https://buf.build) for protobuf management. See `buf.yaml` for configuration.

---

## Architecture

The schema follows a **Hexagonal/Clean Architecture** pattern with four distinct layers:

```
schema/v1/
├── domain/           # Core business models (innermost layer)
├── infrastructure/   # Technical abstractions (auth, storage, database)
├── integration/      # External service contracts (email, payment, webhooks)
└── orchestration/    # Workflow coordination layer
```

### Layer Dependencies

```
┌─────────────────────────────────────────────────────────┐
│                    orchestration/                        │
│              (coordinates workflows)                     │
├─────────────────────────────────────────────────────────┤
│     integration/              infrastructure/            │
│   (external APIs)          (technical concerns)          │
├─────────────────────────────────────────────────────────┤
│                       domain/                            │
│              (pure business models)                      │
│                   NO DEPENDENCIES                        │
└─────────────────────────────────────────────────────────┘
```

**Rules:**
- `domain/` protos MUST NOT import from other layers
- `infrastructure/` and `integration/` MAY import from `domain/`
- `orchestration/` MAY import from any layer

---

## Domain Layer Structure

The `domain/` directory contains **8 subdomains**:

### common/
Shared types used across all domains.

| File | Purpose |
|------|---------|
| `action.proto` | Action enums (CREATE, UPDATE, DELETE, etc.) |
| `attribute.proto` | Generic attribute key-value structure |
| `error.proto` | Standardized error responses |
| `filter.proto` | Query filtering definitions |
| `pagination.proto` | Pagination request/response |
| `search.proto` | Search query structures |
| `sort.proto` | Sort order definitions |

### entity/
User and organization management (~19 protos).

**Core Entities:**
- `user/` - Platform user accounts
- `workspace/` - Multi-tenant workspace containers
- `workspace_user/` - User membership in workspaces
- `workspace_user_role/` - Role assignments

**Business Entities:**
- `client/` - End customers/students
- `staff/` - Internal staff members
- `delegate/` - Representatives (parents, guardians)
- `admin/` - System administrators

**Organization:**
- `location/` - Physical or logical locations
- `group/` - Entity groupings

**Access Control:**
- `role/` - Role definitions
- `permission/` - Permission definitions
- `role_permission/` - Role-to-permission mappings

### product/
Product catalog management (~10 protos).

| Entity | Purpose |
|--------|---------|
| `product/` | Individual products/services |
| `collection/` | Product groupings/categories |
| `product_plan/` | Product inclusion in plans |
| `price_product/` | Product pricing |
| `resource/` | Digital resources attached to products |

### subscription/
Subscription and billing (~11 protos).

| Entity | Purpose |
|--------|---------|
| `subscription/` | Active subscriptions |
| `plan/` | Subscription plan definitions |
| `plan_settings/` | Plan configuration |
| `price_plan/` | Plan pricing tiers |
| `invoice/` | Billing invoices |
| `balance/` | Account balances |

### expenditure/
Expenditure tracking for outflows — purchases, expenses, refunds, payroll (~4 protos).
Mirrors the `revenue/` subdomain structure for the outflow side of the ledger.

| Entity | Purpose |
|--------|---------|
| `expenditure/` | Core expenditure records (purchases, expenses, refunds, payroll) |
| `expenditure_line_item/` | Individual line items within an expenditure |
| `expenditure_category/` | Categorization of expenditures (e.g., utilities, supplies, COGS) |
| `expenditure_attribute/` | Extensible key-value metadata for expenditures |

### payment/
Payment processing (~5 protos).

| Entity | Purpose |
|--------|---------|
| `payment/` | Payment transactions |
| `payment_method/` | Payment method types |
| `payment_profile/` | Customer payment profiles |

### event/
Event and scheduling (~5 protos).

| Entity | Purpose |
|--------|---------|
| `event/` | Scheduled events |
| `event_client/` | Event attendees |
| `event_product/` | Products linked to events |
| `event_settings/` | Event configuration |

### workflow/
Workflow engine definitions (~7 protos).

| Entity | Purpose |
|--------|---------|
| `workflow/` | Workflow instances |
| `workflow_template/` | Reusable workflow definitions |
| `stage/` | Workflow stages |
| `stage_template/` | Stage templates |
| `activity/` | Individual activities within stages |
| `activity_template/` | Activity templates |
| `activity_execution_log/` | Execution audit trail |

---

## Naming Conventions

### Entity Pattern
Each entity typically has a folder matching its name:
```
entity/client/client.proto       # Main entity
entity/client_attribute/client_attribute.proto  # Extended attributes
```

### Attribute Pattern
Many entities have a corresponding `*_attribute` proto that provides:
- Extensible key-value metadata
- Custom fields without schema changes
- Workspace-specific customizations

### Message Naming
```protobuf
// Entity message - singular, PascalCase
message Client { ... }

// Request messages - {Entity}{Action}Request
message ClientCreateRequest { ... }
message ClientGetRequest { ... }
message ClientListRequest { ... }
message ClientUpdateRequest { ... }
message ClientDeleteRequest { ... }

// Response messages - {Entity}{Action}Response
message ClientCreateResponse { ... }
message ClientListResponse { ... }
```

### Field Naming
```protobuf
message Example {
  string id = 1;                    // Primary key
  string workspace_id = 2;          // Foreign key (snake_case with _id suffix)
  string name = 3;                  // Simple fields (snake_case)
  google.protobuf.Timestamp created_at = 4;  // Timestamps (_at suffix)
  google.protobuf.Timestamp updated_at = 5;
}
```

---

## Infrastructure Layer

Technical abstractions with pluggable provider support.

### auth/
| File | Purpose |
|------|---------|
| `provider.proto` | Auth provider enum (FIREBASE, JWT, MOCK) |
| `identity.proto` | User identity claims |
| `authentication.proto` | Auth request/response |
| `jwt.proto` | JWT token structures |
| `api_key.proto` | API key authentication |

### database/
| File | Purpose |
|------|---------|
| `provider.proto` | Database provider enum (POSTGRESQL, FIRESTORE, MOCK) |

### storage/
| File | Purpose |
|------|---------|
| `provider.proto` | Storage provider enum (GCS, LOCAL, MOCK) |
| `storage.proto` | Storage service definitions |
| `object.proto` | Stored object metadata |
| `container.proto` | Storage container/bucket |
| `upload.proto` | Upload operations |
| `download.proto` | Download operations |
| `access_tier.proto` | Storage tiers (HOT, COOL, ARCHIVE) |

---

## Integration Layer

External service integrations.

### email/
| File | Purpose |
|------|---------|
| `provider.proto` | Email provider enum (GMAIL, MICROSOFT, MOCK) |
| `email.proto` | Email message structure |
| `email_service.proto` | Email service operations |
| `template.proto` | Email templates |

### payment/
| File | Purpose |
|------|---------|
| `provider.proto` | Payment provider enum |
| `payment.proto` | Payment transaction details |
| `payment_service.proto` | Payment service operations |

### webhook/
| File | Purpose |
|------|---------|
| `webhook.proto` | Webhook event definitions |

---

## Orchestration Layer

Workflow coordination and execution engine.

### engine/
| File | Purpose |
|------|---------|
| `engine.proto` | Workflow engine service definitions |

---

## Common Tasks

### Adding a New Entity

1. Create the entity folder: `domain/{subdomain}/{entity_name}/`
2. Create the proto file: `{entity_name}.proto`
3. Define the message with standard fields:
   ```protobuf
   syntax = "proto3";
   package esqyma.schema.v1.domain.{subdomain}.{entity_name};

   import "google/protobuf/timestamp.proto";

   message EntityName {
     string id = 1;
     string workspace_id = 2;
     // ... entity-specific fields
     google.protobuf.Timestamp created_at = 100;
     google.protobuf.Timestamp updated_at = 101;
   }
   ```
4. If needed, create `{entity_name}_attribute/` for extended attributes
5. Run `buf lint` to validate
6. Run `buf generate` to regenerate code

### Adding Attributes to an Existing Entity

Use the `*_attribute` pattern instead of modifying the core entity:
```protobuf
message ClientAttribute {
  string id = 1;
  string client_id = 2;  // Reference to parent
  string key = 3;
  string value = 4;
}
```

### Adding a New Infrastructure Provider

1. Add enum value to the relevant `provider.proto`
2. Implement the provider interface in `packages/espyna`

---

## Validation

Run these commands from the `packages/esqyma` directory:

```bash
# Lint all proto files
buf lint

# Check for breaking changes
buf breaking --against '.git#branch=main'

# Generate code
buf generate
```

---

## Related Packages

| Package | Purpose |
|---------|---------|
| `packages/protobuf-models-ts` | TypeScript generated models |
| `packages/protobuf-models-go` | Go generated models |
| `packages/espyna` | Go backend (consumes these schemas) |

---

## Educational Domain Mapping

When working with educational/school contexts, use this terminology mapping:

| Schema Term | Educational Term |
|-------------|------------------|
| `client` | Student |
| `staff` | Teacher/Staff |
| `delegate` | Parent/Guardian |
| `plan` | Academic Year |
| `location` | Campus |
| `product` | Subject/Course |
| `subscription` | Enrollment |
| `invoice` | Assessment |
| `balance` | Statement of Account |
| `event` | Schedule/Class |
