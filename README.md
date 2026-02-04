# Esqyma Schema

Protocol Buffer definitions and database schema for the Esqyma platform.

## Overview

This repository contains:

- **Proto Definitions** (`proto/v1/`) - Protocol Buffer schemas defining the domain model
- **Database Migrations** (`migrations/`) - SQL migrations for PostgreSQL, MySQL, and SQL Server
- **Generated Code** - Pre-built TypeScript (`dist/`) and Go (`pkg/`) packages

## Installation

### TypeScript/JavaScript

```bash
pnpm add github:erniealice/esqyma
# or
npm install github:erniealice/esqyma
```

### Go

```go
import "github.com/erniealice/esqyma/pkg/schema/v1/domain/entity/user"
```

## Domain Structure

```
proto/v1/
├── domain/
│   ├── common/          # Shared types (pagination, filters, errors)
│   ├── entity/          # Core entities (user, client, workspace, roles)
│   ├── event/           # Event management
│   ├── payment/         # Payment processing
│   ├── product/         # Products and collections
│   ├── subscription/    # Plans, licenses, invoices
│   └── workflow/        # Workflow engine (templates, stages, activities)
├── infrastructure/      # Auth, storage, database providers
├── integration/         # External service integrations
└── options/             # Custom protobuf options
```

## Database Migrations

Multi-dialect migrations are provided for PostgreSQL, MySQL, and SQL Server.

### Running Migrations

```bash
# Set environment variables
export DATABASE_URL="postgres://user:password@localhost:5432/dbname?sslmode=disable"
export MIGRATE_DIALECT="postgres"  # or mysql, sqlserver

# Run migrations
go run cmd/migrate/main.go up

# Check status
go run cmd/migrate/main.go status

# Rollback last batch
go run cmd/migrate/main.go down
```

### Creating New Migrations

```bash
go run cmd/migrate/main.go make <migration_name>
```

This creates `.up.sql` and `.down.sql` files for all dialects.

## Development

### Prerequisites

- [Buf CLI](https://buf.build/docs/installation)
- [Go 1.21+](https://golang.org/dl/)
- [pnpm](https://pnpm.io/installation)

### Regenerating Code

```bash
# TypeScript
pnpm generate

# Full build (generate + compile)
pnpm build
```

### Project Scripts

| Command | Description |
|---------|-------------|
| `pnpm generate` | Generate TypeScript from proto files |
| `pnpm build` | Generate and compile TypeScript |
| `pnpm clean` | Remove generated files |

## License

Private - All rights reserved.
