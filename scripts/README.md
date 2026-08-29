# Esqyma database scripts

Run these commands from `packages/esqyma/`. PostgreSQL migrations under
`migrations/postgres/` and their `atlas.sum` file are the schema history in code. Atlas's
`atlas_schema_revisions.atlas_schema_revisions` table records which migration versions ran in one
database; legacy `public.schema_migrations` is not a schema-release authority.

## Canonical versioned initialization

The package-level versioned initializer is the canonical fresh-database entry point:

```sh
pnpm db:init -- \
  --target <client>/<target> \
  --schema-release postgres/YYYY.MM.N
```

This invocation is a read-only plan. Mutation requires the same explicit target and release plus
`--apply`:

```sh
pnpm db:init -- \
  --target <client>/<target> \
  --schema-release postgres/YYYY.MM.N \
  --apply
```

The target manifest selects the database, business type, workspace, Copya profile, and bundles. The
CLI release is a mandatory equality assertion against that tracked configuration. Raw database URLs
and passwords are not command arguments.

The accompanying `install-atlas.sh` installs checksum-pinned Atlas Community `v1.3.0` at
`.tools/atlas/v1.3.0/atlas`. It supports only the explicitly checksummed
`darwin-amd64` and `linux-amd64` artifacts and fails closed before execution on any checksum or
platform mismatch. It must not install or replace a system-wide binary.

## Safety invariants

- Initialization is non-destructive: no database/schema drop, reset, down migration, restore, or
  raw Atlas tracker write.
- Plan mode performs no database creation, schema change, tracker change, or seed write.
- Create-if-absent is allowed for an explicitly authorized, proven-absent local target, including a
  named target such as `leasing1`; remote targets fail closed.
- Bootstrap bytes, the code-owned release manifest, Atlas head/hash state, and normalized catalog
  fingerprint must agree before a target is considered initialized.
- Business type and Copya data selection never alter the schema bootstrap.
- A rerun of the same target/release/profile/bundles is a no-op; changed bytes under the same
  identity fail.

## Existing scripts

| Script | Current purpose |
|---|---|
| `_load-env.sh` | Loads the legacy dialect configuration and Atlas URLs from `apps/service-admin/.env`; it may create `atlas_dev`, so it is not the initializer's read-only configuration path. |
| `db-status.sh` | Reports Atlas migration status for the selected dialect. |
| `db-inspect.sh` | Prints Atlas's SQL inspection of the configured database. |
| `db-hash.sh` | Recomputes the selected migration directory's `atlas.sum`. Commit it with reviewed migration bytes. |
| `db-diff.sh` | Authors a migration from a SQL draft using temporary database state. This is migration authoring, not database initialization. |
| `db-drift-draft.sh` | Compares Postgres with the descriptor and writes a reviewable missing-column draft; it never applies the draft. |
| `db-apply.sh` | Applies pending migrations only to an already Atlas-managed target. Automatic baselining has been removed. |
| `setup-fresh-db.sh` | Retired fail-closed compatibility stub that points operators to `pnpm db:init`; it performs no database work. |
| `generate-full-schema.py` | Legacy full-schema synthesis used by `setup-fresh-db.sh`; it is not a release bootstrap generator. |
| `init/baseline.sql` | Historical baseline material corresponding to the Atlas adoption baseline. |

`concat-protos.sh`, `lint-no-jargon.sh`, and `release.ps1` are package utilities outside the
database-initialization lifecycle.

## Verification

The co-located scripts and their direct commands are documented in
[`tests/README.md`](tests/README.md). Database tests must use only uniquely named `ichizen_p0_*`
databases on a server proven to be loopback and must clean up their exact targets on every exit.
