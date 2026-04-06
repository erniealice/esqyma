# esqyma

Single source of truth for all data models, service contracts, and database schema
in the ichizen monorepo. Proto definitions drive both Go/TypeScript code generation
and SQL DDL generation — the database schema is never written by hand.

## What's in here

| Path | Purpose |
|------|---------|
| `proto/v1/` | Protobuf source definitions (58+ schemas, 4 layers) |
| `pkg/schema/v1/` | Generated Go structs and repository interfaces |
| `dist/schema/v1/` | Generated TypeScript (gitignored — run `pnpm build`) |
| `migrations/{dialect}/` | SQL migration files per dialect |
| `migrations/{dialect}/0001_initial.sql` | **Canonical DDL** — generated from protos, source of truth |
| `pkg/migrate/` | Go migration library (used by service-admin `cmd/migration`) |
| `pkg/dump/` | Database dump interface — `pg_dump` / `mysqldump` / `sqlcmd` |
| `cmd/migrate/` | Migration CLI (up / down / status / make) |
| `cmd/diff/` | Schema diff tool — compares proto DDL vs live database |
| `cmd/generate-ddl/` | Generates `0001_initial.sql` from proto annotations |

## Proto layer rules

```
┌──────────────────────────────────┐
│         orchestration/           │  ← can import any layer
├──────────────────────────────────┤
│  integration/   infrastructure/  │  ← can import domain/
├──────────────────────────────────┤
│            domain/               │  ← NO external imports
└──────────────────────────────────┘
```

`domain/` protos must never import `infrastructure/`, `integration/`, or
`orchestration/`. `buf lint` enforces this.

## Domain structure

```
proto/v1/
├── options/             # Custom db.proto options (DDL annotations)
├── domain/
│   ├── common/          # Shared types: pagination, filters, errors
│   ├── entity/          # Core entities: user, client, workspace, roles (19 models)
│   ├── product/         # Products, collections, variants (10 models)
│   ├── subscription/    # Plans, licenses, invoices (11 models)
│   ├── payment/         # Payment records (5 models)
│   ├── event/           # Scheduling, appointments (5 models)
│   └── workflow/        # Workflow engine: templates, stages, activities (7 models)
├── infrastructure/      # Auth, storage, database provider configs
├── integration/         # Email, payment gateways, webhooks
└── orchestration/       # Workflow engine service definitions
```

## Build commands

```bash
pnpm build           # Generate Go + TypeScript from protos
pnpm generate        # Generate protobuf code only (no TypeScript compile)
pnpm generate:ddl    # Regenerate migrations/{dialect}/0001_initial.sql from annotations
pnpm clean           # Remove generated files

buf lint ./proto/v1                                          # Lint protos
buf breaking --against '.git#branch=main' ./proto/v1        # Check breaking changes
```

## Database annotations

`proto/v1/options/db.proto` defines custom options for DDL generation. Tables and
columns are annotated directly on the proto message:

```protobuf
// Message level — mark as table, configure constraints
option (options.v1.table).table = true;
option (options.v1.table).table_name = "users";
option (options.v1.table).unique_together = "workspace_id,code";

// Field level — FK references, indexes, defaults, check constraints
string workspace_id = 2 [(options.v1.db) = {
  references: "workspace"   // FK → workspace.id
  index: true
}];
string status = 5 [(options.v1.db) = {
  default: "'active'"
  check: "length(status) > 0"
}];
```

Standard fields on every entity: `id`, `workspace_id`, `active`, `date_created`,
`date_modified`.

## Migration workflow

### Applying migrations

From `apps/service-admin` (recommended — reads `.env` automatically):

```bash
go run ./cmd/migration up
go run ./cmd/migration status
go run ./cmd/migration down
```

From esqyma directly:

```bash
export DATABASE_URL="postgres://user:password@localhost:5432/dbname?sslmode=disable"
export MIGRATE_DIALECT="postgres"   # postgres | mysql | sqlserver

go run ./cmd/migrate up
go run ./cmd/migrate status
go run ./cmd/migrate down
```

### Creating a new migration

```bash
go run ./cmd/migrate make <name>
# Creates migrations/{postgres,mysql,sqlserver}/YYYYMMDDHHMMSS_<name>.{up,down}.sql
```

---

### Bridge Migration Rule

**After any proto change that adds, removes, or alters a table or column:**

1. **Regenerate the DDL** to update `0001_initial.sql`:
   ```bash
   pnpm generate:ddl
   ```

2. **Diff against the live database** to see what changed:
   ```bash
   # Set POSTGRES_* or DATABASE_URL, then:
   go run ./cmd/diff
   ```
   The diff tool reads `migrations/postgres/0001_initial.sql` and queries
   `information_schema` on the live DB. It prints missing tables, extra tables,
   and column differences.

3. **Create a bridge migration** to close the gap:
   ```bash
   go run ./cmd/migrate make bridge_<description>
   ```

4. **Fill the SQL** — the diff output tells you exactly what `ALTER TABLE` /
   `CREATE TABLE` / `DROP COLUMN` statements go in the `.up.sql`. Add the
   reverse in `.down.sql`.

5. **Apply**:
   ```bash
   go run ./cmd/migration up   # from apps/service-admin
   ```

**Why this rule matters:** `0001_initial.sql` is the proto-authoritative schema.
Any working database — on any device, at any point in time — should be bringable
to the current proto state by running `migrate up`. Bridge migrations are the
mechanism that keeps that guarantee intact across schema evolution.

## Schema diff tool

```bash
# From packages/esqyma — requires POSTGRES_* env vars or DATABASE_URL
go run ./cmd/diff

# Override the DDL file (default: migrations/postgres/0001_initial.sql)
DDL_FILE=migrations/postgres/0001_initial.sql go run ./cmd/diff

# Against a different dialect
MIGRATE_DIALECT=mysql go run ./cmd/diff
```

Output example:
```
Tables in DDL but MISSING from live database:
  - fulfillment_attachment

Column differences (- missing from live, + extra in live):
  table "revenue":
    - payment_term_id
    + legacy_invoice_ref

=== Action: create a bridge migration to close the gap ===
  go run ./cmd/migrate make bridge_to_proto_ddl
```

## Database dump (from service-admin)

```bash
go run ./cmd/dump
# → professional-20260406-143022.sql

DUMP_OUTPUT_DIR=~/backups go run ./cmd/dump
```

Backed by `pkg/dump` — a dialect-aware `Dumper` interface:
- `postgres` → `pg_dump`
- `mysql` → `mysqldump`
- `sqlserver` → `sqlcmd BACKUP DATABASE`

## Go import

```go
// Generated types
import "github.com/erniealice/esqyma/pkg/schema/v1/domain/entity/client"

// Migration library (used by service-admin cmd/migration)
import "github.com/erniealice/esqyma/pkg/migrate"

// Embedded migrations FS (pass to migrate.Config.FS)
import esqyma "github.com/erniealice/esqyma"
// esqyma.MigrationsFS — embed.FS containing migrations/{postgres,mysql,sqlserver}

// Dump interface
import "github.com/erniealice/esqyma/pkg/dump"
```

## TypeScript/JavaScript import

```bash
pnpm add github:erniealice/esqyma
```

```ts
import type { Client } from "@leapfor/esqyma/dist/schema/v1/domain/entity/client"
```

## Prerequisites

| Tool | Purpose |
|------|---------|
| [Buf CLI](https://buf.build/docs/installation) | Proto linting and code generation |
| Go 1.25+ | Migration CLI and DDL generator |
| pnpm | TypeScript generation and build |

## License

Private — All rights reserved.
