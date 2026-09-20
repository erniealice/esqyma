# esqyma

Single source of truth for all data models and service contracts in the ichizen
monorepo. Proto definitions drive Go and TypeScript code generation. The
**database schema is managed with Atlas** — migrations live next to the protos
in this package and are authored, applied, and verified through `pnpm`.

## What's in here

| Path | Purpose |
|------|---------|
| `proto/v1/` | Protobuf source definitions (58+ schemas, 4 layers) |
| `pkg/schema/v1/` | Generated Go structs and repository interfaces |
| `dist/schema/v1/` | Generated TypeScript (gitignored — run `pnpm build`) |
| `migrations/postgres/` | Atlas-format migrations: `<TS>_<name>.sql` + `atlas.sum` |
| `migrations/postgres/_archive_pre-atlas/` | Old golang-migrate format files (historical reference, not replayed) |
| `scripts/init/baseline.sql` | `pg_dump` of the schema as it stood when Atlas was adopted (the first migration is identical content) |
| `atlas.hcl` | Atlas config: dev DB URL, target DB URL, migration directory |
| `scripts/db-*.sh` | Wrappers that pnpm scripts call |

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

## Build commands

```bash
pnpm build           # Generate Go + TypeScript from protos
pnpm generate        # Generate protobuf code only (no TypeScript compile)
pnpm clean           # Remove generated files

buf lint ./proto/v1                                          # Lint protos
buf breaking --against '.git#branch=main' ./proto/v1        # Check breaking changes
```

## Database annotations

`proto/v1/options/db.proto` defines custom options for DDL generation. Tables
and columns are annotated directly on the proto message:

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
`date_modified`. The annotations are documentation today — the database is
managed via Atlas migrations, not regenerated from protos. Keeping the
annotations accurate means a future migration tool could read them.

### Foreign keys are ON DELETE NO ACTION

Every foreign key in this schema is `ON DELETE NO ACTION`. Deletion order and
dependent-row cleanup belong to the use-case layer, not to the database. An
unannotated FK field is therefore the desired steady state: `on_delete` is left
unset and both emitters (`cmd/generate-ddl`, `cmd/protocheck`) still write an
explicit `ON DELETE NO ACTION` clause rather than leaning on the engine default.

Any other referential action is an exception and needs the annotation plus a
comment saying why the database must own that edge:

```protobuf
// Justification: a line has no meaning without its parent run.
string run_id = 3 [(options.v1.db) = {
  references: "expense_run"
  on_delete: ON_DELETE_ACTION_CASCADE   // NO_ACTION | RESTRICT | CASCADE | SET_NULL
}];
```

### Entity ids are TEXT uuids; the version is a runtime concern

Entity primary keys are `string id = 1` → a postgres `TEXT` column holding a
uuid string. The uuid *version* is deliberately not a schema or proto concern:
ids are minted by the application's configured id provider
(`CONFIG_ID_PROVIDER=uuidv7` today) and entity tables carry no uuid
`DEFAULT`. Do not add a `uuid` column type, a DB-side uuid default, or a
version-specific annotation for entity ids — swapping the generator must stay a
runtime decision that needs no migration.

---

## Schema management with Atlas

Adding, altering, and removing tables/columns goes through Atlas. The flow:

```
sketch a draft.sql  →  pnpm db:diff  →  review the generated migration
                                     →  pnpm db:hash
                                     →  pnpm db:apply
                                     →  pnpm db:status
```

Atlas's job is to turn a *short draft* of what you want into a *complete*
migration file with proper quoting, FK constraint names, index drop order,
etc. You never write the formal migration by hand.

### Prerequisites

- `atlas` binary on PATH (one-time install — see *Installing Atlas* below).
- A running postgres with credentials in `apps/service-admin/.env`. The
  scripts read that file for `POSTGRES_HOST`, `POSTGRES_PORT`,
  `POSTGRES_NAME`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_SSL_MODE`.
- A scratch database called `atlas_dev` on the same postgres instance. The
  scripts auto-create it on first run; if you'd rather use a different name,
  export `ATLAS_DEV_DB=...` before running.

### pnpm scripts

| Command | What it does |
|---------|--------------|
| `pnpm atlas:install` | One-time install of Atlas (~117 MB binary). |
| `pnpm atlas:check` | Quick preflight that Atlas is on PATH. |
| `pnpm db:status` | Current version, pending migrations, executed count. |
| `pnpm db:diff <name> <draft.sql>` | Compare draft → live, write the next migration file. |
| `pnpm db:hash` | Recompute `migrations/postgres/atlas.sum`. Run after editing migrations. |
| `pnpm db:apply` | Apply pending migrations to the live DB. Auto-baselines on first run. |
| `pnpm db:inspect` | Dump the current live schema as SQL (replaces the old `00_full_schema.sql`). |
| `pnpm db:drift-draft [path]` | Scan proto vs live DB; write `ADD COLUMN`/`FK`/`INDEX` SQL for every missing column. Review, then feed through `db:diff`. Does NOT apply. |

**Multi-dialect:** every command accepts `DIALECT=postgres|mysql|sqlserver`
(default `postgres`). Convenience aliases exist as
`pnpm db:apply:postgres`, `pnpm db:apply:mysql`, `pnpm db:apply:all`, etc.
Mysql / sqlserver are scaffolded only — see
`migrations/{mysql,sqlserver}/README.md` for the steps to bring a second
dialect online.

### Fixing proto-vs-DB drift

If the proto declares a column the live DB lacks (sibling repo shipped the
proto, migration didn't apply, hand-modified DB, etc.):

```bash
cd packages/esqyma
pnpm db:drift-draft                       # writes /tmp/drift-fixup-<TS>.sql
$EDITOR /tmp/drift-fixup-<TS>.sql         # review every line; comment out WIP / data-sensitive ones
pnpm db:diff fix_drift /tmp/drift-fixup-<TS>.sql
pnpm db:hash && pnpm db:apply
```

Backed by `cmd/protocheck --sql-out`. Reads `(options.v1.db).references`,
`.index`, and `.on_delete` from the proto annotations, so the drafted FKs and
partial indexes are properly typed and carry the annotated referential action
(`ON DELETE NO ACTION` unless the field says otherwise). Always emits NULLable;
tighten with a follow-up migration after backfilling. Skips missing tables (use
a hand-drafted migration) and never DROPs extra DB columns.

### Adding a column with a foreign key — worked example

Say you want `plan.region_id` referencing `region(id)`:

```bash
# 1. Sketch the change in a scratch file. SQL fragment, not a full migration.
cat > /tmp/plan_region.sql <<'SQL'
ALTER TABLE plan ADD COLUMN region_id TEXT REFERENCES region(id) ON DELETE NO ACTION;
CREATE INDEX idx_plan_region_id ON plan(region_id) WHERE region_id IS NOT NULL;
SQL

# 2. Atlas generates the formal migration file.
cd packages/esqyma
pnpm db:diff add_plan_region_id /tmp/plan_region.sql
# → migrations/postgres/<TS>_add_plan_region_id.sql
# Open it; Atlas will have produced something like:
#   ALTER TABLE "public"."plan"
#     ADD COLUMN "region_id" text NULL,
#     ADD CONSTRAINT "plan_region_id_fkey" FOREIGN KEY ("region_id")
#     REFERENCES "public"."region" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
#   CREATE INDEX "idx_plan_region_id" ON "public"."plan" ("region_id")
#     WHERE (region_id IS NOT NULL);

# 3. Lock the integrity sum + apply.
pnpm db:hash
pnpm db:apply
pnpm db:status     # confirm Current Version advanced
```

**Update the proto in the same PR.** The annotation isn't enforced today, but
the rule is: when you add a column to the DB, add the matching `optional`
field with the `(options.v1.db).references` annotation to the proto. Then
`pnpm build` so generated code picks it up.

### How `db:diff` works internally

`scripts/db-diff.sh` performs four steps:

1. Spins up a throwaway database (`atlas_target_<pid>`) on your local postgres.
2. Loads the current live schema into it via `pg_dump | psql`.
3. Applies your draft SQL on top.
4. Runs `atlas migrate diff <name> --to postgres://...atlas_target --dev-url postgres://...atlas_dev`.
   Atlas reads both schemas via the postgres driver (no SQL parser involved,
   so postgres extensions like `btree_gist` work fine) and writes the diff as
   a new migration file. The throwaway DB is dropped on exit.

### Non-nullable FKs

Do this in two migrations to avoid breaking running services:

1. First migration — add the column nullable, backfill data.
2. Second migration — `ALTER COLUMN <col> SET NOT NULL`.

`db:diff` produces the right SQL for each step when you run it twice with
different drafts.

### Fresh installs and existing database upgrades

Use the explicit release runner from the operator machine. Start with a read-only plan:

```bash
pnpm db:init -- --target CLIENT/TARGET --schema-release postgres/YYYY.MM.N
```

For an existing managed database, also specify `--upgrade-from postgres/YYYY.MM.P`.
Apply only after reviewing the plan and satisfying the target's backup/identity requirements.
Use `--verify` for read-only exact release, catalog, tracker and bundle verification; a successful
plan or an Atlas pending-count check alone does not prove readiness.

A fresh installation uses the selected release's complete immutable bootstrap. The runner refuses
untracked nonempty databases; it never automatically stamps an existing schema as migrated.
There is no automatic downgrade. Recovery uses reviewed forward correction or a separately
authorized restore, preserving the original migration history and receipts.

See [the operator contract](cmd/schema-release/README.md) for commands, supported transitions,
backup evidence and current qualification limits.

## Installing Atlas

Use the repository-pinned installer from this package:

```bash
pnpm atlas:install
```

The runner checks Atlas 1.3.0 and its platform-specific binary checksum. It does not use a global
latest/Homebrew install. Supported pinned platforms are macOS amd64 and Linux amd64; unsupported
platforms fail closed.

---

## Go import

```go
// Generated types
import "github.com/erniealice/esqyma/pkg/schema/v1/domain/entity/client"

// Embedded migrations FS
import esqyma "github.com/erniealice/esqyma"
// esqyma.MigrationsFS — embed.FS containing migrations/postgres/

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
| [Atlas](https://atlasgo.io) | Schema migrations (`pnpm atlas:install`) |
| Go 1.27+ | Build the rest of the monorepo |
| pnpm | TypeScript generation and Atlas wrapper scripts |

## License

Private — All rights reserved.
