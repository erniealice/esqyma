# Database Schema Management — How It Works Now

**Companion to:** [plan.md](./plan.md) · [progress.md](./progress.md)

This is the operator-facing narrative. If you're about to author a migration, deploy a new client, or fix drift on an existing one, read this first.

---

## TL;DR

```
ONE chain of migration files.
                                  ↓
             ┌────────────────────┴────────────────────┐
             │                                         │
   NEW CLIENT BOOTSTRAP                EXISTING CLIENT CATCH-UP
   (empty database)                    (already has data)
   pnpm db:apply                       pnpm db:apply
   → runs baseline                     → runs only what's pending
   → runs every migration              → idempotent migrations are
     after baseline in order             safe no-ops on data not
   → tenant is at HEAD                   matching the predicate
                                       → tenant is at HEAD
```

**The invariant:** every migration is **idempotent**. Same file, same outcome, regardless of starting state. Run it on an empty DB → schema appears, no data corrected (none to correct). Run it on a populated DB → schema appears (or stays put), data corrected where the predicate matches.

That's the whole story. The rest of this doc is how to follow it without breaking anything.

---

## Concepts

### Baseline
**One canonical snapshot of "the schema we promise new tenants get."** Lives at `migrations/postgres/20260502000000_baseline.sql`. Refreshed periodically by squashing older migrations into it (see "Squash cycle" below). Whoever deploys a fresh tenant runs this first, automatically.

### Migration
**A `.sql` file that takes the DB from one state to the next.** Single file, flat name `YYYYMMDDHHMMSS_short_description.sql`. Authored by a human; reviewed in PR; applied by Atlas. Applied in chronological order. Tracked by Atlas in the `atlas_schema_revisions.atlas_schema_revisions` table.

### Tracker
**Per-DB record of which migrations have been applied.** Lives in the `atlas_schema_revisions` schema (its own schema, not `public`). Created automatically by Atlas on first apply. Each row is a revision — version, hash, applied-at, etc. **The tracker is per-tenant; the migration files are global.**

### Idempotency
**A migration that produces the same result whether run once or N times.** Achieved by:
- DDL: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE … ADD COLUMN IF NOT EXISTS`, `DROP … IF EXISTS`
- Data: `WHERE` predicates that exclude already-corrected rows; `INSERT … ON CONFLICT DO NOTHING`; `UPDATE … WHERE col IS NULL`

Non-negotiable. The whole strategy collapses without it.

---

## Authoring a migration (the inner loop)

You change a proto, you change the DB. Either generate the migration from the proto delta, or hand-write it. Same final shape.

```sh
# 1. Make the proto change (or schema change). Regenerate Go bindings if needed.
cd packages/esqyma && pnpm generate

# 2. Generate a migration from the diff (Atlas does this for you):
pnpm db:diff:postgres -- --name short_description
#    → creates migrations/postgres/<TIMESTAMP>_short_description.sql

# 3. Read the generated SQL. Edit if needed:
#    - Add IF NOT EXISTS / IF EXISTS guards
#    - Add idempotency-friendly WHERE clauses
#    - Add a 2-3 line header explaining what + why + safety claim

# 4. Update atlas.sum:
pnpm db:hash:postgres

# 5. Apply locally:
pnpm db:apply:postgres

# 6. Re-apply (idempotency check — must be a no-op):
pnpm db:apply:postgres
#    → must report "no migrations to apply"

# 7. Commit the .sql file + atlas.sum together.
```

**What you must NEVER do:**
- Run `psql -f my-fix.sql` against a tracked DB. The tracker won't know. Drift starts here.
- Edit a migration file after it's been applied to ANY tenant. Hashes diverge → integrity errors. If you need to change something, write a new migration.
- Use `.up.sql` / `.down.sql` split files. That's the old `cmd/migrate` style; Atlas treats those as two separate migrations and breaks. Single flat `.sql` only.
- Drop the `atlas_schema_revisions` schema. That's a tenant-state-resetting hammer reserved for emergencies.

---

## Migrating existing clients safely

This is the question you actually asked. Here's the shape, ordered by risk.

### Path 1 — routine schema/data update (the common case)

You wrote a new migration. You committed it to `dev/...`. CI ran it on a fresh DB and it was clean. PR merged. Now to roll it out to existing tenants:

```sh
# On each tenant's deployment (or via your deploy pipeline):
cd packages/esqyma
DIALECT=postgres pnpm db:apply
```

That's it. Atlas reads the tracker, runs only the migrations newer than the latest applied revision, idempotently. **Per-tenant blast radius:** the migrations between their current version and HEAD.

**Safety net at the migration level:**
- Each migration is wrapped in an implicit transaction by Atlas. Postgres DDL is transactional. If the migration errors mid-way, the whole thing rolls back. Tenant stays at the prior version.
- Idempotency means re-running after a partial failure is safe.

**Pre-flight checklist before deploying a migration to a real tenant:**
1. Tenant DB is backed up (`pg_dump` to local + S3, or whatever the deploy ritual is).
2. The migration ran cleanly on a scratch DB seeded with that tenant's data shape (not just a fresh DB).
3. The migration ran cleanly on every other tenant of the same business-type tier.
4. You have a forward-fix migration ready in case something subtle breaks.

### Path 2 — drift recovery (the case from today)

A tenant's tracker disagrees with the migrations directory. Symptoms:
- `pnpm db:status` shows orphan revisions (rows in tracker, no matching file)
- OR shows un-stamped migrations (file exists, was applied via `psql -f`)

**Don't reach for the hammer (`DROP SCHEMA atlas_schema_revisions`).** Surgical fix:

```sql
-- Drop orphan revisions (their content is folded into baseline by an earlier squash).
-- Verify the version IDs in atlas_schema_revisions vs git log first.
DELETE FROM atlas_schema_revisions.atlas_schema_revisions
 WHERE version IN ('<orphan-version-1>', '<orphan-version-2>', ...);

-- Stamp un-tracked but already-applied migrations as applied.
-- Hashes come from atlas.sum.
INSERT INTO atlas_schema_revisions.atlas_schema_revisions
  (version, description, type, applied, total, executed_at, ...)
VALUES
  ('<version>', '<description>', 2, <stmts>, <stmts>, NOW(), ...);
```

Then verify:
```sh
pnpm db:status:postgres        # 0 pending, expected revision count
pnpm db:apply -- --dry-run     # "no migrations to apply"
```

**Do NOT skip the verification.** If the dry-run reports anything other than "no migrations", stop — you're about to compound the drift.

### Path 3 — squash rollout (every quarter or so)

Periodically the migrations chain gets squashed into a fresher baseline. When this happens, every existing tenant's tracker has rows for the squashed migrations whose files no longer exist (orphans, by definition). Roll it out:

1. **Repository side:** squash commit lands on main with the new baseline + orphan-cleanup SQL committed alongside.
2. **Per-tenant:** apply the orphan-cleanup SQL to that tenant's tracker:
   ```sql
   DELETE FROM atlas_schema_revisions.atlas_schema_revisions
    WHERE version BETWEEN '<old-version>' AND '<squash-cutoff>';
   ```
   This is exactly Path 2's surgical fix at scale.
3. **Verify** as in Path 2.
4. Future `pnpm db:apply` for that tenant works normally.

The squash is a deliberate maintenance event, not an emergency. The cleanup SQL is shipped in the same PR that ships the squash, so no improvisation per tenant.

### Path 4 — bootstrapping a new tenant from scratch

Brand new client, empty database:

```sh
# Operator runbook:
DB_NAME="acme_corp_prod"
BIZ_TYPE="professional"

# 1. Create the DB.
createdb "$DB_NAME"

# 2. Apply the full migration chain.
DB_URL="postgres://…/$DB_NAME?sslmode=disable" \
  pnpm db:apply:postgres
#    → runs baseline + every migration after it.

# 3. Seed RBAC (roles, permissions, default admin user).
go run apps/service-admin/cmd/seed-rbac --db-url "$DB_URL"

# 4. Seed business-type defaults (categories, units of measure, etc.).
./packages/esqyma/scripts/setup-fresh-db.sh "$DB_NAME" "$BIZ_TYPE"
```

The new tenant comes online at HEAD, regardless of when they were provisioned. **Same migration files as every other tenant.** Idempotency guarantees the data-correction migrations run cleanly on empty data (predicates match nothing → no-ops).

---

## What about migrations that don't apply to fresh installs?

You'll have migrations like:

```sql
-- Backfill old NULL phone numbers to "" for clients created before phone became required.
UPDATE client SET phone = '' WHERE phone IS NULL;
```

On a fresh install, no row has `phone IS NULL` (because the new schema has the column NOT NULL or with a default). So the `UPDATE` matches zero rows → no-op. **The migration runs, harmlessly.** No tag, no skip, no metadata. The `WHERE` clause is the gate.

If you find yourself wanting to write a migration that ISN'T idempotent ("just this once, I need to insert a fixed row"):

1. **Add the guard.** `INSERT … ON CONFLICT DO NOTHING`.
2. **Or rephrase as data-driven.** `INSERT … FROM SELECT … WHERE NOT EXISTS (…)`.
3. **Or move it to a seed script,** not a migration. Migrations are schema/data shape; seeds are content.

If after all three you genuinely cannot make it idempotent, escalate. We can add a one-off "applied to N specific tenants" pattern, but it should be the exception, not the rule. Three of those and the strategy is dead.

---

## What about really destructive changes?

Some changes you'll want to be paranoid about:

- **Dropping a column.** Run `ALTER TABLE … DROP COLUMN IF EXISTS …` in a single migration; verify no live code reads it (audit grep + build green) BEFORE merging the migration. Pair with the proto field being marked `reserved`.
- **Renaming a table.** Two-step: add new table, copy rows, swap reads, drop old table — across multiple migrations and code releases. Don't do it in one shot.
- **Changing a column type.** Three-step: add new column with new type, backfill, swap reads/writes, drop old column.
- **NOT NULL on a populated column.** Two-step: add the column with a DEFAULT (so rows are populated), then `ALTER COLUMN SET NOT NULL` once you've verified all rows are non-null.

The pattern: **separate the schema change from the code change.** The migration ships in one release; the code that depends on the new shape ships in the next. This way a rollback of the code doesn't require reverting the schema, and a partial deploy doesn't read columns that haven't appeared yet.

---

## Common pitfalls and what to do

| Symptom | Likely cause | Fix |
|---|---|---|
| `pnpm db:apply` errors with "integrity check failed" | Tracker has orphan rows OR file edited after applied | Path 2 — surgical DELETE of orphans, OR write a forward-fix migration if a file was edited |
| `column already exists` | Migration was applied via `psql -f` outside Atlas | Path 2 — INSERT a revision row to stamp the migration as applied |
| Idempotency-check (re-apply) fails | Migration isn't idempotent | Add `IF NOT EXISTS` / `WHERE` predicates; commit the fix as a forward-fix migration if the original is already in the wild |
| Schema drift across tenants of the same tier | Some tenant skipped a migration deploy | Run `pnpm db:apply` against the laggard. Always the same answer: just apply it. |
| Atlas refuses to start because of "non-clean database" | First time Atlas sees a DB that already has tables | `db-apply.sh` handles this — uses `atlas migrate set <baseline>` to stamp the baseline as applied. Read the script if it errors. |

---

## Why this design

| Decision | Why |
|---|---|
| Idempotent migrations, no tagged-skip | One rule, one path. Tagged skip needs metadata that has to be maintained forever. |
| Squash periodically, not at every release | Squashes are coordination events with every tenant. Quarterly amortizes the work. |
| No `down.sql` files | Postgres DDL is rarely cleanly reversible. Forward-fix migrations are honest about that. |
| Tracker per tenant | Multi-tenant deploys have to track per-DB state. Atlas's standard pattern. |
| Single canonical migrations directory | One source of truth. Per-tenant divergence is bug-class, not feature. |

---

## Cross-references

- [plan.md](./plan.md) — the design and phased implementation
- [progress.md](./progress.md) — phase checklist + decision log
- `migrations/postgres/` — the actual migration files
- `scripts/db-apply.sh` — the wrapper that runs `atlas migrate apply` with first-run baseline stamping
- `scripts/setup-fresh-db.sh` — new-tenant bootstrap (Phase 3 will canonicalize)
- `atlas.hcl` — Atlas configuration (env=postgres, file://migrations/postgres)
- Squash precedent: commit `4ef8885` (20260505) — folded 7 transient migrations into baseline
