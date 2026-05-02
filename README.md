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

Backed by `cmd/protocheck --sql-out`. Reads `(options.v1.db).references` and
`.index` from the proto annotations, so the drafted FKs and partial indexes
are properly typed. Always emits NULLable; tighten with a follow-up
migration after backfilling. Skips missing tables (use a hand-drafted
migration) and never DROPs extra DB columns.

### Adding a column with a foreign key — worked example

Say you want `plan.region_id` referencing `region(id)`:

```bash
# 1. Sketch the change in a scratch file. SQL fragment, not a full migration.
cat > /tmp/plan_region.sql <<'SQL'
ALTER TABLE plan ADD COLUMN region_id TEXT REFERENCES region(id) ON DELETE RESTRICT;
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
#     REFERENCES "public"."region" ("id") ON UPDATE NO ACTION ON DELETE RESTRICT;
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

### Rollback

`atlas migrate down` regenerates the inverse SQL from a snapshot Atlas takes
before each apply — you don't write `.down.sql` files anymore. Run from the
package directory:

```bash
atlas migrate down --env postgres
```

### First-time apply on a brand new database

`pnpm db:apply` detects an empty DB on first run and executes the baseline
(`migrations/postgres/<earliest>_baseline.sql`) and every migration after it.
On a DB that already has the schema (e.g. an existing dev DB or a prod
clone), it stamps the baseline as already-applied and only runs migrations
created after the adoption date.

### Schema check

```bash
pnpm db:status     # quick — does live match expected version?
pnpm db:inspect    # full schema dump for diffing against another env
```

There's no automated `db:check` because Atlas's free tier restricts
`atlas schema diff` against SQL files. If you need a strict CI gate, run
`pnpm db:status` and assert "Already at latest version" in your pipeline.

---

## Installing Atlas

One-time install, then everyone on the machine can use it. Binary size: ~117 MB.

```bash
curl -sSf https://atlasgo.sh | sudo sh    # installs to /usr/local/bin/atlas
# or:
brew install ariga/tap/atlas              # if you prefer brew
```

If you can't get admin: install into your home directory and add it to PATH:
```bash
mkdir -p $HOME/.local/bin
curl -L https://release.ariga.io/atlas/atlas-darwin-arm64-latest \
  -o $HOME/.local/bin/atlas && chmod +x $HOME/.local/bin/atlas
echo 'export PATH=$HOME/.local/bin:$PATH' >> ~/.zshrc && source ~/.zshrc
```

Verify: `atlas version`

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
| Go 1.25+ | Build the rest of the monorepo |
| pnpm | TypeScript generation and Atlas wrapper scripts |

## License

Private — All rights reserved.
