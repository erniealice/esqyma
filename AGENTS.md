# Esqyma Package - Agent Guide

## Package Overview

The **Esqyma** package contains the centralized protobuf schemas for the entire monorepo. It defines the data models and service contracts used across all domains in the platform.

## Project Structure

```
esqyma/
├── AGENTS.md                 # This file
├── buf.gen.yaml              # Buf code generation config
├── go.mod                    # Go module: github.com/erniealice/esqyma
├── package.json              # npm package: @leapfor/esqyma
├── tsconfig.json             # TypeScript config
├── .env.example              # Environment variables template
│
├── proto/v1/                 # Source protobuf definitions
│   ├── buf.yaml              # Buf configuration
│   ├── options/              # Custom protobuf options (db annotations)
│   ├── domain/               # Core business models (58+ protos)
│   ├── infrastructure/       # Technical abstractions (auth, storage)
│   ├── integration/          # External service contracts
│   └── orchestration/        # Workflow coordination
│
├── pkg/                      # Go packages (importable)
│   ├── schema/v1/            # Generated Go protobuf code
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   ├── integration/
│   │   ├── orchestration/
│   │   └── options/
│   │
│   └── migrate/              # Database migration library
│       ├── migrate.go        # Core migration engine
│       ├── config.go         # Configuration
│       ├── dialect.go        # Dialect interface
│       ├── dialect_postgres.go
│       ├── dialect_mysql.go
│       └── dialect_sqlserver.go
│
├── dist/                     # Generated output (gitignored)
│   └── schema/v1/            # Generated TypeScript protobuf code
│
├── cmd/                      # CLI tools
│   ├── migrate/              # Database migration CLI
│   │   ├── main.go
│   │   └── README.md
│   └── generate-ddl/         # DDL generator from proto annotations
│       └── main.go
│
└── migrations/               # SQL migration files
    ├── postgres/
    │   └── YYYYMMDDHHMMSS_name.up.sql
    │   └── YYYYMMDDHHMMSS_name.down.sql
    ├── mysql/
    └── sqlserver/
```

## Import Paths

### Go
```go
import (
    // Generated protobuf models
    "github.com/erniealice/esqyma/pkg/schema/v1/domain/entity/client"
    "github.com/erniealice/esqyma/pkg/schema/v1/options"

    // Migration library
    "github.com/erniealice/esqyma/pkg/migrate"
)
```

### TypeScript
```typescript
import { Client } from '@leapfor/esqyma/dist/schema/v1/domain/entity/client';
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Database connection (required for migrations)
DATABASE_URL=postgres://user:password@localhost:5432/esqyma?sslmode=disable

# Database dialect: postgres, mysql, sqlserver
MIGRATE_DIALECT=postgres

# Migrations directory (default: migrations)
MIGRATIONS_DIR=migrations
```

### Connection String Formats

**PostgreSQL:**
```
DATABASE_URL=postgres://user:password@localhost:5432/database?sslmode=disable
```

**MySQL:**
```
DATABASE_URL=user:password@tcp(localhost:3306)/database
```

**SQL Server:**
```
DATABASE_URL=sqlserver://user:password@localhost:1433?database=mydb
```

## Build Commands

```bash
# Install dependencies
pnpm install

# Generate all code (Go + TypeScript)
pnpm build

# Generate protobuf code only
pnpm generate

# Generate DDL from proto annotations
pnpm generate:ddl

# Clean generated files
pnpm clean
```

## Migration CLI

```bash
# Create new migration (creates files for all 3 dialects)
go run ./cmd/migrate make create_users

# Run pending migrations
go run ./cmd/migrate up

# Rollback last batch
go run ./cmd/migrate down

# Check migration status
go run ./cmd/migrate status
```

### Running Initial Migration

1. Generate DDL from proto annotations:
   ```bash
   pnpm generate:ddl
   ```

2. The generated files are in `migrations/{dialect}/0001_initial.sql`.
   Rename them to include up/down:
   ```bash
   # For each dialect (postgres, mysql, sqlserver)
   mv migrations/postgres/0001_initial.sql migrations/postgres/20240101000000_initial.up.sql
   ```

3. Create the down migration (DROP statements in reverse order):
   ```sql
   -- migrations/postgres/20240101000000_initial.down.sql
   DROP TABLE IF EXISTS "activity_execution_log" CASCADE;
   DROP TABLE IF EXISTS "activity" CASCADE;
   -- ... continue for all tables in reverse dependency order
   ```

4. Run the migration:
   ```bash
   go run ./cmd/migrate up
   ```

See `cmd/migrate/README.md` for full documentation.

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

## Proto Options (Database Annotations)

The `proto/v1/options/db.proto` file defines custom options for DDL generation:

### Message Options
```protobuf
option (options.v1.table).table = true;           // Mark as database table
option (options.v1.table).table_name = "users";   // Override table name
option (options.v1.table).unique_together = "a,b"; // Composite unique
option (options.v1.table).index_together = "x,y";  // Composite index
```

### Field Options
```protobuf
string user_id = 2 [(options.v1.db) = {
  references: "user"      // Foreign key to user.id
  index: true             // Create index
  unique: true            // Unique constraint
  default: "'active'"     // Default value
  check: "length > 0"     // Check constraint
  sql_type: "VARCHAR(50)" // Override SQL type
}];
```

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
| *Attribute | Custom fields for each entity | entity_id, attribute_id |

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
| License | Licenses | workspace_id, plan_id |
| LicenseHistory | License audit trail | license_id |

### Payment Domain (5 models)
| Entity | Purpose | Foreign Keys |
|--------|---------|--------------|
| Payment | Payment transactions | workspace_id, subscription_id |
| PaymentMethod | Payment mechanisms | workspace_id |
| PaymentProfile | Customer payment profiles | workspace_id, client_id |
| PaymentProfilePaymentMethod | Profile-method links | payment_profile_id, payment_method_id |

### Event Domain (5 models)
| Entity | Purpose | Foreign Keys |
|--------|---------|--------------|
| Event | Scheduled events | workspace_id, location_id |
| EventClient | Event attendees | event_id, client_id |
| EventProduct | Event-product links | event_id, product_id |
| EventSettings | Event configuration | event_id |

### Workflow Domain (7 models)
| Entity | Purpose | Foreign Keys |
|--------|---------|--------------|
| WorkflowTemplate | Reusable workflow definitions | workspace_id |
| Workflow | Workflow instances | workspace_id, workflow_template_id |
| StageTemplate | Stage templates | workflow_template_id |
| Stage | Stage instances | workflow_id, stage_template_id |
| ActivityTemplate | Activity templates | stage_template_id |
| Activity | Activity instances | stage_id, activity_template_id |
| ActivityExecutionLog | Execution audit trail | workspace_id, activity_id |

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

1. Determine dependency level
2. Create folder: `proto/v1/domain/{subdomain}/{entity_name}/`
3. Create proto file:
   ```protobuf
   syntax = "proto3";
   package domain.{subdomain}.v1;

   import "options/db.proto";

   message EntityName {
     option (options.v1.table).table = true;

     string id = 1;
     string workspace_id = 2 [(options.v1.db).references = "workspace"];
     // ... entity fields
     bool active = N;
     google.protobuf.Timestamp date_created = 100;
     google.protobuf.Timestamp date_modified = 101;
   }
   ```
4. Run `pnpm build`
5. Create migration: `go run ./cmd/migrate make create_{entity}`
6. Edit the generated up/down SQL files
7. Run migration: `go run ./cmd/migrate up`

### Schema Validation

```bash
buf lint ./proto/v1
buf breaking --against '.git#branch=main' ./proto/v1
pnpm generate
```

## Agent Guidelines

1. **Always check dependency level** before creating/modifying schemas
2. **Respect layer boundaries** - domain protos must not import from other layers
3. **Use attribute pattern** for extensibility instead of modifying core entities
4. **Maintain backward compatibility** - avoid breaking changes
5. **Add db options** for entities that need database tables
6. **Create migrations** after adding new tables
7. **Consider educational context** when naming fields in domain layer
