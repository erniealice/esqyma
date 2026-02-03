# Esqyma Package - Agent Guide

## Package Overview

The **Esqyma** package contains the centralized protobuf schemas for the entire monorepo. It defines the data models and service contracts used across all domains in the platform.

## Quick Reference - Consolidated Knowledge Files

For LLM context efficiency, consolidated schema files are available:

| File | Description |
|------|-------------|
| `schema/v1/domain.proto` | All 58+ domain models (entity, product, subscription, payment, event, workflow) |
| `schema/v1/infrastructure.proto` | Auth, database, storage provider schemas |
| `schema/v1/integration.proto` | Email, payment gateway, webhook integrations |
| `schema/v1/orchestration.proto` | Workflow engine service definitions |
| `schema/v1/AGENTS.md` | Detailed schema documentation |

**Note:** These consolidated files are for LLM reference only, NOT for compilation. The actual compilable protos remain in their subdirectories.

## Package Structure

```
packages/esqyma/schema/v1/
├── AGENTS.md              # Detailed schema documentation
├── buf.yaml               # Buf configuration
├── buf.lock               # Buf dependency lock
│
├── domain.proto           # [LLM] Consolidated domain schemas
├── infrastructure.proto   # [LLM] Consolidated infrastructure schemas
├── integration.proto      # [LLM] Consolidated integration schemas
├── orchestration.proto    # [LLM] Consolidated orchestration schemas
│
├── domain/                # Core business models (58+ protos)
│   ├── common/            # Shared types (action, attribute, error, filter, pagination, search, sort)
│   ├── ping/              # Health check
│   ├── entity/            # User & organization (19 models)
│   ├── product/           # Product catalog (10 models)
│   ├── subscription/      # Billing & enrollments (11 models)
│   ├── payment/           # Payment processing (5 models)
│   ├── event/             # Scheduling & events (5 models)
│   └── workflow/          # Workflow engine (7 models)
│
├── infrastructure/        # Technical abstractions
│   ├── auth/              # Authentication (identity, jwt, api_key, provider)
│   ├── database/          # Database provider config
│   └── storage/           # Object storage (upload, download, container)
│
├── integration/           # External service contracts
│   ├── email/             # Email service (Gmail, Microsoft)
│   ├── payment/           # Payment gateway (AsiaPay)
│   └── webhook/           # Webhook handling
│
└── orchestration/         # Workflow coordination
    └── engine/            # Workflow engine service
```

## Architecture Layers

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

## Domain Entity Summary

### Entity Domain (19 models)
| Entity | Purpose | Foreign Keys |
|--------|---------|--------------|
| User | Platform user accounts | - |
| Workspace | Multi-tenant containers | - |
| WorkspaceUser | User membership | workspace_id, user_id |
| WorkspaceUserRole | Role assignments | workspace_user_id, role_id |
| Client | End customers/students | workspace_id, user_id |
| Admin | System administrators | workspace_id, user_id |
| Delegate | Representatives (parents) | workspace_id, user_id |
| DelegateClient | Parent-student links | delegate_id, client_id |
| Staff | Internal staff | workspace_id, user_id |
| Group | Entity groupings | workspace_id |
| Location | Physical/logical locations | workspace_id |
| Role | Role definitions | workspace_id |
| Permission | Permission definitions | workspace_id |
| RolePermission | Role-permission links | role_id, permission_id |
| ClientAttribute | Client custom fields | client_id, attribute_id |
| DelegateAttribute | Delegate custom fields | delegate_id, attribute_id |
| GroupAttribute | Group custom fields | group_id, attribute_id |
| StaffAttribute | Staff custom fields | staff_id, attribute_id |
| LocationAttribute | Location custom fields | location_id, attribute_id |

### Product Domain (10 models)
| Entity | Purpose | Foreign Keys |
|--------|---------|--------------|
| Product | Products/services | workspace_id |
| Collection | Product groupings | workspace_id |
| CollectionParent | Collection hierarchy | collection_id, parent_collection_id |
| CollectionPlan | Collection-plan links | collection_id, plan_id |
| ProductCollection | Product-collection links | product_id, collection_id |
| ProductPlan | Product-plan links | product_id, plan_id |
| PriceProduct | Product pricing | product_id |
| Resource | Digital resources | product_id |
| ProductAttribute | Product custom fields | product_id, attribute_id |
| CollectionAttribute | Collection custom fields | collection_id, attribute_id |

### Subscription Domain (11 models)
| Entity | Purpose | Foreign Keys |
|--------|---------|--------------|
| Plan | Subscription plans | workspace_id |
| PlanLocation | Plan-location links | plan_id, location_id |
| PricePlan | Plan pricing tiers | plan_id |
| PlanSettings | Plan configuration | plan_id |
| Subscription | Active subscriptions | workspace_id, client_id, price_plan_id |
| Invoice | Billing invoices | workspace_id, subscription_id |
| Balance | Account balances | workspace_id, client_id |
| PlanAttribute | Plan custom fields | plan_id, attribute_id |
| SubscriptionAttribute | Subscription custom fields | subscription_id, attribute_id |
| InvoiceAttribute | Invoice custom fields | invoice_id, attribute_id |
| BalanceAttribute | Balance custom fields | balance_id, attribute_id |

### Payment Domain (5 models)
| Entity | Purpose | Foreign Keys |
|--------|---------|--------------|
| Payment | Payment transactions | workspace_id, subscription_id |
| PaymentMethod | Payment mechanisms | workspace_id |
| PaymentProfile | Customer payment profiles | workspace_id, client_id |
| PaymentProfilePaymentMethod | Profile-method links | payment_profile_id, payment_method_id |
| PaymentAttribute | Payment custom fields | payment_id, attribute_id |

### Event Domain (5 models)
| Entity | Purpose | Foreign Keys |
|--------|---------|--------------|
| Event | Scheduled events | workspace_id, location_id |
| EventClient | Event attendees | event_id, client_id |
| EventProduct | Event-product links | event_id, product_id |
| EventSettings | Event configuration | event_id |
| EventAttribute | Event custom fields | event_id, attribute_id |

### Workflow Domain (7 models)
| Entity | Purpose | Foreign Keys |
|--------|---------|--------------|
| WorkflowTemplate | Reusable workflow definitions | workspace_id |
| Workflow | Workflow instances | workspace_id, workflow_template_id |
| StageTemplate | Stage templates | workflow_template_id |
| Stage | Stage instances | workflow_id, stage_template_id |
| ActivityTemplate | Activity templates | stage_template_id |
| Activity | Activity instances | stage_id, activity_template_id |
| ActivityExecutionLog | Execution audit trail | workspace_id, activity_id, workflow_id, stage_id |

## Protobuf Dependency Levels

### Level 0: Independent (No Foreign Keys)
```
User, Workspace, Group, Location, Product, Collection,
Plan, Event, PaymentMethod, Balance, Invoice, Attribute,
WorkflowTemplate
```

### Level 1: Simple Dependencies (1-2 FKs)
```
Admin, Client, Delegate, Staff, Role, Permission,
ProductAttribute, CollectionParent, PriceProduct, ProductCollection,
ProductPlan, Resource, PlanSettings, PricePlan, EventSettings,
StageTemplate, Workflow
```

### Level 2: Complex Dependencies (3+ FKs)
```
ClientAttribute, LocationAttribute, DelegateClient, WorkspaceUser,
WorkspaceUserRole, RolePermission, CollectionPlan, EventClient,
EventProduct, PaymentProfile, PaymentProfilePaymentMethod,
Subscription, Payment, Stage, ActivityTemplate
```

### Level 3: Deep Dependencies
```
SubscriptionAttribute, PaymentAttribute, Activity, ActivityExecutionLog
```

## Educational Domain Mapping

When working with educational/school contexts:

| Schema Term | Educational Term |
|-------------|------------------|
| `client` | Student |
| `staff` | Teacher/Staff |
| `delegate` | Parent/Guardian |
| `plan` | Academic Year |
| `location` | Campus |
| `product` | Subject/Course |
| `subscription` | Enrollment |
| `invoice` | Assessment/Billing |
| `balance` | Statement of Account |
| `event` | Schedule/Class |
| `workflow` | Enrollment Process |

## Common Operations

### Adding a New Entity

1. Determine dependency level (Level 0-3)
2. Create folder: `domain/{subdomain}/{entity_name}/`
3. Create proto file with standard structure:
   ```protobuf
   syntax = "proto3";
   package domain.{subdomain}.v1;

   message EntityName {
     string id = 1;
     string workspace_id = 2;
     // ... entity fields
     bool active = N;
     google.protobuf.Timestamp date_created = 100;
     google.protobuf.Timestamp date_modified = 101;
   }
   ```
4. If extensibility needed, create `{entity}_attribute/` folder
5. Run `buf lint` and `buf generate`
6. Update consolidated knowledge file

### Schema Validation

```bash
# From packages/esqyma directory
buf lint
buf breaking --against '.git#branch=main'
buf generate
```

## Related Packages

| Package | Purpose |
|---------|---------|
| `packages/protobuf-models-ts` | TypeScript generated models |
| `packages/protobuf-models-go` | Go generated models |
| `packages/espyna` | Go backend (implements these schemas) |

## Agent Guidelines

1. **Always check dependency level** before creating/modifying schemas
2. **Respect layer boundaries** - domain protos must not import from other layers
3. **Use attribute pattern** for extensibility instead of modifying core entities
4. **Maintain backward compatibility** - avoid breaking changes
5. **Update consolidated files** after significant schema changes
6. **Consider educational context** when naming fields in domain layer
