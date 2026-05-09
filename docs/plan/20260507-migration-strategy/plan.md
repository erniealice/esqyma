# DB Migration Strategy — Design Plan

**Date:** 2026-05-07
**Branch:** `dev/20260507-migration-strategy`
**Status:** Draft
**Package:** `packages/esqyma` (cross-cuts every consumer that runs `pnpm db:apply`)

---

## Overview

Reconcile `professional1`'s drifted Atlas tracker, then codify the going-forward operating model so the same drift doesn't recur. Today's symptoms (7 orphan revisions, 2 untracked files, broken `pnpm db:apply`) are caused by a missing rule, not a missing tool. Atlas itself is fine; we just need to spell out: how migrations are authored, how new clients bootstrap, how existing clients catch up, and how CI proves we still match.

---

## Motivation

Two real-world worries from the user, both correct, both addressed below:

1. **"Should we have one SQL to load for new clients, or track every migration forward?"**
   These aren't mutually exclusive. New clients run **one canonical bootstrap** (the squashed baseline + a fresh-DB seed). Existing clients run the **incremental chain** from wherever they are. Atlas already supports both; the scripts are partly there (`scripts/setup-fresh-db.sh`, `scripts/generate-full-schema.py`).

2. **"What about data-correction migrations that aren't applicable to fresh installs?"**
   Make every migration **idempotent**. `UPDATE … WHERE col IS NULL` is naturally a no-op on a fresh DB. `ALTER TABLE ADD COLUMN IF NOT EXISTS` is a no-op when the column exists. The discipline is consistent, not conditional. Periodic squash rotates older migrations into the baseline so the chain stays bounded.

The current drift exists because:
- An earlier sweep (commit `4ef8885`, 20260505) **squashed 7 transient 20260502/03 migrations into the baseline**, deleting the files but **not updating the tracker** in `professional1`. Those 7 rows in `atlas_schema_revisions.atlas_schema_revisions` now reference files that no longer exist.
- The two recent migrations from this session (`20260507194132_add_workspace_timezone.sql`, `20260507201002_drop_price_schedule_date_strings.sql`) were applied via `psql -f` rather than `atlas migrate apply`, so the tracker doesn't know about them.

Both are **bookkeeping issues, not data issues**. The actual schema in `professional1` is correct.

---

## Architecture

### Two paths, one source of truth

```
                   migrations/postgres/
                   ┌──────────────────────────┐
                   │ 20260502000000_baseline  │ ← squashed canonical fresh-install schema
                   │ 20260505221625_…         │
                   │ 20260505221626_…         │   ← incremental migrations
                   │ 20260505221627_…         │     applied in order on top of baseline
                   │ 20260505221628_…         │
                   │ 20260506080226_…         │
                   │ 20260507194132_…         │
                   │ 20260507201002_…         │
                   └──────────────┬───────────┘
                                  │
       ┌──────────────────────────┴──────────────────────────┐
       │                                                     │
       ▼                                                     ▼
  ┌─────────────────────────┐                ┌────────────────────────────┐
  │ FRESH INSTALL           │                │ EXISTING CLIENT CATCH-UP   │
  │ (new tenant, empty DB)  │                │ (drift-fix, deploy, dev)   │
  ├─────────────────────────┤                ├────────────────────────────┤
  │ 1. createdb client_xyz  │                │ 1. pnpm db:status          │
  │ 2. pnpm db:apply        │                │ 2. pnpm db:apply           │
  │    → runs baseline +    │                │    → runs only what's      │
  │      every migration    │                │      pending per tracker   │
  │ 3. seed-rbac            │                │ 3. (no schema-only mig:    │
  │ 4. seed-business-data   │                │     idempotent updates     │
  │                         │                │     are no-ops)            │
  │ baseline is "current"   │                │ tracker matches files      │
  └─────────────────────────┘                └────────────────────────────┘
```

Same files. Different entry point. The baseline is a **moving snapshot** that gets refreshed periodically by the squash cycle. Fresh installs always start from the latest baseline and replay any migrations newer than it.

### Migration categories

Three classes, each with idempotency rules:

| Category | Example | Idempotency rule |
|---|---|---|
| **Pure DDL** | `ADD COLUMN`, `CREATE TABLE`, `ADD CONSTRAINT` | Use `IF NOT EXISTS` / `IF EXISTS`. Postgres's DDL is otherwise safe by transaction. |
| **DDL + backfill** | `ADD COLUMN tz NOT NULL DEFAULT 'X'` then `UPDATE WHERE tz IS NULL` | The DEFAULT handles new rows. The UPDATE is a no-op on fresh installs (no rows to update). Both safe to re-run. |
| **Pure data-correction** | `UPDATE foo SET status='active' WHERE status IS NULL AND created_at < '…'` | Already idempotent by construction (the `WHERE` clause excludes already-corrected rows). On a fresh DB, predicate matches nothing → no-op. |

**Anti-pattern:** non-idempotent migrations like `INSERT INTO foo (…) VALUES (…)` without `ON CONFLICT DO NOTHING`. These break re-runs and create implicit ordering dependencies between migrations.

---

## Implementation Steps

### Phase 1: Reconcile `professional1` tracker — DRIFT FIX (today)

The schema is correct; only the tracker is wrong. Two surgical fixes, no destructive resets needed.

- **Delete the 7 orphan revision rows** in `professional1`. Their content is folded into `baseline` (per commit `4ef8885`). Source SQL:
  ```sql
  DELETE FROM atlas_schema_revisions.atlas_schema_revisions
  WHERE version IN (
    '20260502050927', '20260502051256', '20260502052707',
    '20260503021807', '20260503081029', '20260503081606',
    '20260503083308'
  );
  ```
- **Stamp the 2 already-applied migrations** as applied so Atlas doesn't try to re-run them:
  ```sql
  INSERT INTO atlas_schema_revisions.atlas_schema_revisions
    (version, description, type, applied, total, executed_at, execution_time, error, error_stmt, hash, partial_hashes, operator_version)
  VALUES
    ('20260507194132', 'add_workspace_timezone',         2, 2, 2, NOW(), 0, NULL, NULL, '<hash-from-atlas.sum>', '[]'::jsonb, 'atlas-hand-stamped'),
    ('20260507201002', 'drop_price_schedule_date_strings', 2, 1, 1, NOW(), 0, NULL, NULL, '<hash-from-atlas.sum>', '[]'::jsonb, 'atlas-hand-stamped');
  ```
  Hash values come from `atlas.sum`. Verify the actual schema of `atlas_schema_revisions` before running — column names/order may differ slightly across Atlas versions.
- **Verify** with `pnpm db:status:postgres` — should report "no pending migrations, 8 applied".
- **Verify with dry-run** of `pnpm db:apply` — should report "no migrations to apply".
- File reference: write the fix as a one-shot script `scripts/reconcile-tracker-20260507.sh` so future readers can see exactly what was done.

### Phase 2: Migration authoring rules — codify the contract

- **Add `docs/guide/migration-authoring.md`** specifying:
  - Every migration MUST be idempotent (use `IF NOT EXISTS` / `IF EXISTS` / `WHERE` predicates that exclude already-corrected rows / `ON CONFLICT DO NOTHING`)
  - Migrations are flat `.sql` files, single-file Atlas style — never `.up.sql`/`.down.sql` split
  - Naming: `YYYYMMDDHHMMSS_short_description.sql`
  - Comment header: 2-3 lines explaining what + why + safety claim ("safe to re-run because …")
  - Atlas-only path: write file → `pnpm db:hash` → `pnpm db:apply` → commit. Never `psql -f` against a tracked DB.
  - **Banned:** schema modifications via direct DDL, ad-hoc SQL fixes that don't go through migrations, dropping the tracker schema.
- **Add a pre-commit lint** (`scripts/lint-migrations.sh`) that:
  - Rejects `.up.sql` / `.down.sql` filenames
  - Rejects migrations missing `IF NOT EXISTS` / `IF EXISTS` on DDL keywords
  - Verifies `atlas.sum` hash for every migration file
  - Warns on `INSERT` without `ON CONFLICT`

### Phase 3: Fresh-install bootstrap — formalize the existing path

The `setup-fresh-db.sh` script already exists. Make it the canonical fresh-install entrypoint and document it.

- **Update `scripts/setup-fresh-db.sh`** to:
  - Drop the legacy `00_full_schema.sql` path (it's pre-Atlas; the Atlas baseline is the canonical fresh schema now).
  - Run `createdb` → `atlas migrate apply` → seed-rbac → optional business-type seed.
  - Accept `--business-type {service|professional|retail|…}` and pick the right seed bundle.
- **Add `scripts/seed-bundles/`** containing per-business-type seed CSVs (or pointers to the existing `apps/service-admin/dumps/` location).
- **Document fresh-install flow** in `docs/guide/new-tenant-bootstrap.md`: the operator's runbook for creating a new tenant DB.

### Phase 4: Periodic squash — keep the chain bounded

The 20260502 baseline came from a squash. Establish this as recurring practice.

- **Squash policy:** when the migrations dir exceeds ~20 post-baseline files, OR every quarter, whichever comes first.
- **Squash procedure** (codify as `scripts/squash-baseline.sh`):
  1. Spin up scratch DB.
  2. Apply all migrations through latest.
  3. `pg_dump --schema-only --no-owner --no-acl --clean` → new baseline file.
  4. Move all squashed migration files to `migrations/postgres/_archive_pre-atlas/<squash-date>/` (preserve audit trail).
  5. Update `atlas.sum` (`pnpm db:hash`).
  6. For each existing client DB: clear superseded revision rows, leave baseline marker in place. (Same shape as Phase 1.)
- **Document the cycle** in `docs/guide/baseline-squash.md`. The squash is a deliberate maintenance event, not an emergency.

### Phase 5: CI verification — prove fresh-install works on every PR

The drift today wasn't caught for 2 days because nothing automatically verified that `migrations/` plus a fresh DB equals the production schema.

- **Add CI job** `migrations-verify.yml` that on every PR:
  1. Spins up a Postgres service container.
  2. Runs `pnpm db:apply` (baseline + all subsequent migrations).
  3. Runs `pnpm db:apply` a second time — must report "no pending migrations" (idempotency check).
  4. Runs a smoke query against critical tables (`workspace`, `price_schedule`, `subscription`, etc.).
  5. Fails the PR if any step errors.
- **Optionally:** snapshot the resulting schema and diff against a committed `schema.snapshot.sql`. Drift becomes a PR-level review item, not a production surprise.

### Phase 6: Wiki article + runbook

- **Add `docs/wiki/articles/migration-authoring.md`** covering: what/why/how, link to authoring rules, link to bootstrap, link to squash policy, common pitfalls.
- **Add to `docs/wiki/index.md`** under a new "Database & Migrations" section.
- **Update `docs/wiki/log.md`** with the 20260507 reconciliation entry.

---

## File References

| File | Change | Phase |
|------|--------|-------|
| `packages/esqyma/scripts/reconcile-tracker-20260507.sh` | **New** — one-shot reconciliation script (audit trail) | 1 |
| `packages/esqyma/docs/guide/migration-authoring.md` | **New** — authoring rules + idempotency requirements | 2 |
| `packages/esqyma/scripts/lint-migrations.sh` | **New** — pre-commit lint | 2 |
| `packages/esqyma/scripts/setup-fresh-db.sh` | Update — drop `00_full_schema.sql` path, accept `--business-type` | 3 |
| `packages/esqyma/scripts/seed-bundles/` | **New** dir — per-business-type seed bundles | 3 |
| `packages/esqyma/docs/guide/new-tenant-bootstrap.md` | **New** — operator runbook for new tenant | 3 |
| `packages/esqyma/scripts/squash-baseline.sh` | **New** — squash automation | 4 |
| `packages/esqyma/docs/guide/baseline-squash.md` | **New** — squash cadence + procedure | 4 |
| `.github/workflows/migrations-verify.yml` | **New** — CI fresh-install + idempotency check | 5 |
| `docs/wiki/articles/migration-authoring.md` | **New** wiki article | 6 |
| `docs/wiki/index.md` | Update — link to new article | 6 |
| `docs/wiki/log.md` | Update — log 20260507 reconciliation | 6 |

---

## Context & Sub-Agent Strategy

**Estimated files to read:** 12 (already read most)
**Estimated files to modify:** 10
**Estimated context usage:** Low

Single session is sufficient. No sub-agents required for the plan execution — the work is mostly writing new docs/scripts plus a one-shot DB fix.

For Phase 1 (the production tracker fix), do it in the foreground with the user watching, not via a sub-agent. The blast radius is small but the operation hits the live dev DB.

---

## Risk & Dependencies

| Risk | Impact | Mitigation |
|------|--------|------------|
| `DELETE FROM atlas_schema_revisions` corrupts the tracker | High — Atlas refuses future applies | Take a `pg_dump --schema=atlas_schema_revisions` snapshot before deleting. Roll-back is a single `psql -f`. |
| Manual `INSERT` row doesn't match Atlas's expected shape | Medium — `pnpm db:apply` errors with a cryptic schema mismatch | Inspect `\d atlas_schema_revisions.atlas_schema_revisions` first. Use the same column order as existing rows. Test on `scratch_atlas_verify` before professional1. |
| Phase 5 CI reveals MORE drift on a quiet PR | Medium — surprise red CI on unrelated work | First land Phase 5 alone, fix any drift it surfaces, then merge. |
| `setup-fresh-db.sh` rewrite breaks current dev setup flow | Medium | Keep the old script as `setup-fresh-db.legacy.sh` for one cycle. Test against a scratch DB before promoting. |

**Dependencies:**
- Phase 1 unblocks `pnpm db:apply` on professional1 — must land before any other migration work this week.
- Phase 2-6 are independent and can land in any order.
- Phase 5 depends on Phase 2 (lint must pass before CI is meaningful).

---

## Acceptance Criteria

- [ ] **Phase 1:** `pnpm db:status:postgres` against professional1 reports 8 revisions applied, 0 pending, 0 orphans.
- [ ] **Phase 1:** `pnpm db:apply --dry-run` against professional1 reports "no migrations to apply".
- [ ] **Phase 2:** `docs/guide/migration-authoring.md` exists with idempotency rule, naming convention, ban-list.
- [ ] **Phase 2:** `scripts/lint-migrations.sh` rejects a known-bad fixture (`.up.sql` filename, missing `IF NOT EXISTS`, etc.).
- [ ] **Phase 3:** Fresh `pnpm db:apply` against an empty scratch DB produces a schema byte-identical (modulo timestamps/owner) to professional1.
- [ ] **Phase 3:** `setup-fresh-db.sh` runs end-to-end on a new DB name and produces a working dev environment.
- [ ] **Phase 4:** `squash-baseline.sh` produces a valid baseline file from a stable point and updates `atlas.sum`.
- [ ] **Phase 5:** CI workflow runs on every PR; passes for a clean PR, fails for a deliberately-broken migration fixture.
- [ ] **Phase 6:** Wiki article exists; index links it; log entry written.

---

## Design Decisions

### Why idempotent migrations instead of tagged "data-correction" migrations

The tagged-skip approach (e.g., `20260507_data_X_DATAFIX.sql` skipped on fresh installs) sounds elegant but creates two operating modes — one for fresh, one for existing — that have to be kept in sync forever. The first time a fresh install needs ONE statement from a "datafix" migration, the abstraction breaks.

Idempotency is one rule, one path, no metadata. The cost is discipline at write-time (always `WHERE` predicate, `IF NOT EXISTS`, `ON CONFLICT`); the benefit is that every client — at any version — runs every migration in the chain and converges to the same state. Industry standard for a reason.

### Why surgical reconciliation instead of drop-and-rebaseline

Dropping the `atlas_schema_revisions` schema and rebaselining at `20260507201002` is faster but loses the audit trail of the 7 squashed revisions. Those rows are useful provenance — when did the squash happen, which migrations were folded in. Surgical DELETE preserves that history if the operator wants it (just by leaving the rows alone they're harmless except for the integrity check). The active fix is to delete the orphans because Atlas's integrity check requires every tracked revision to have a file. We could alternatively run with `--allow-dirty` forever, but that masks real drift in the future.

### Why squash periodically, not at every release

A squash is a coordination event: every existing tenant DB needs the orphan-cleanup applied. Doing it on every release means coordinating the cleanup with every client deploy, which doesn't scale. Once a quarter (or at ~20 post-baseline files) is the right cadence — long enough to amortize, short enough to keep the chain readable.

### Why no `down.sql` files

Atlas single-file migrations don't have downs. This is intentional. Postgres DDL is rarely cleanly reversible (a dropped column can't be un-dropped without the data). For dev rollback, restore from a dump. For production rollback, write a forward-fix migration. The `_archive_golang-migrate/` directory still has historical `.up.sql/.down.sql` pairs — those are pre-Atlas history and should not be a model for new work.

---

## Branch + Commit Plan

```
dev/20260507-migration-strategy
├── chore(esqyma): add 20260507 reconcile-tracker script   ← Phase 1
├── docs(esqyma): migration authoring guide + lint         ← Phase 2
├── feat(esqyma): formalize fresh-install bootstrap        ← Phase 3
├── feat(esqyma): squash-baseline procedure                ← Phase 4
├── ci: migrations-verify workflow                         ← Phase 5
└── docs(wiki): migration-authoring article                ← Phase 6
```

Each phase = one commit. Each commit is independently revertible.
