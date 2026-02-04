# Migration CLI

A Laravel-style migration system for managing database schema changes across PostgreSQL, MySQL, and SQL Server.

## Quick Start

### 1. Create a new migration

```bash
go run ./cmd/migrate make create_users
```

This creates up/down migration files for all three dialects:
```
migrations/
├── postgres/
│   ├── 20240101120000_create_users.up.sql
│   └── 20240101120000_create_users.down.sql
├── mysql/
│   └── ...
└── sqlserver/
    └── ...
```

### 2. Edit the migration files

**Up migration** (`*.up.sql`) - changes to apply:
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Down migration** (`*.down.sql`) - how to reverse:
```sql
DROP TABLE users;
```

### 3. Run migrations

```bash
# Set connection string and dialect
export DATABASE_URL="postgres://user:pass@localhost:5432/mydb"
export MIGRATE_DIALECT="postgres"

# Run all pending migrations
go run ./cmd/migrate up
```

### 4. Check status

```bash
go run ./cmd/migrate status
```

### 5. Rollback

```bash
go run ./cmd/migrate down
```

## Commands

| Command | Description |
|---------|-------------|
| `make <name>` | Create new migration files for all dialects |
| `up` | Run all pending migrations |
| `down` | Rollback the last batch of migrations |
| `status` | Show migration status |

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | (required) | Database connection string |
| `MIGRATE_DIALECT` | `postgres` | Database dialect: `postgres`, `mysql`, `sqlserver` |
| `MIGRATIONS_DIR` | `migrations` | Path to migrations directory |

### Command Line Flags

```bash
go run ./cmd/migrate -dialect=mysql -database-url="user:pass@tcp(localhost:3306)/mydb" up
```

## Connection String Formats

**PostgreSQL:**
```
postgres://user:password@localhost:5432/database?sslmode=disable
```

**MySQL:**
```
user:password@tcp(localhost:3306)/database
```

**SQL Server:**
```
sqlserver://user:password@localhost:1433?database=mydb
```

## Using as a Library

```go
import (
    "context"
    "github.com/erniealice/esqyma/pkg/migrate"
    _ "github.com/jackc/pgx/v5/stdlib"  // PostgreSQL driver
)

func main() {
    config := &migrate.Config{
        Dialect:       "postgres",
        DatabaseURL:   "postgres://user:pass@localhost/db",
        MigrationsDir: "migrations",
    }

    m, err := migrate.NewMigrator(config)
    if err != nil {
        panic(err)
    }
    defer m.Close()

    ctx := context.Background()

    // Run migrations
    if err := m.Up(ctx); err != nil {
        panic(err)
    }
}
```

## Running the Initial Schema

If you have an existing `0001_initial.sql` from `generate-ddl`, split it into up/down:

1. Rename or copy the existing file:
   ```bash
   # For each dialect
   cp migrations/postgres/0001_initial.sql migrations/postgres/20240101000000_initial.up.sql
   ```

2. Create the down migration with DROP statements:
   ```sql
   -- migrations/postgres/20240101000000_initial.down.sql
   DROP TABLE IF EXISTS "table_name" CASCADE;
   -- ... for each table in reverse order
   ```

3. Run the migration:
   ```bash
   DATABASE_URL="postgres://..." MIGRATE_DIALECT="postgres" go run ./cmd/migrate up
   ```
