# DB Migration Strategy — Progress Log

**Plan:** [plan.md](./plan.md)
**Explainer:** [explain.md](./explain.md)
**Started:** 2026-05-07
**Branch:** `dev/20260507-migration-strategy`

---

## Phase 1: Reconcile professional1 tracker — NOT STARTED

- [ ] Snapshot `atlas_schema_revisions` schema via `pg_dump` (rollback insurance)
- [ ] Inspect `\d atlas_schema_revisions.atlas_schema_revisions` to confirm column shape
- [ ] Test the DELETE + INSERT on `scratch_atlas_verify` first
- [ ] Apply the DELETE for the 7 orphan revision rows on professional1
- [ ] Apply the INSERT to stamp `20260507194132` and `20260507201002` as applied
- [ ] Verify `pnpm db:status:postgres` reports 8 applied, 0 pending
- [ ] Verify `pnpm db:apply -- --dry-run` reports "no migrations to apply"
- [ ] Commit `scripts/reconcile-tracker-20260507.sh` as audit trail

---

## Phase 2: Migration authoring rules — NOT STARTED

- [ ] Write `docs/guide/migration-authoring.md` (idempotency, naming, ban-list)
- [ ] Write `scripts/lint-migrations.sh`
- [ ] Add lint to `package.json` scripts (`pnpm lint:migrations`)
- [ ] Test lint against a known-bad fixture (`.up.sql`, missing `IF EXISTS`, raw `INSERT`)
- [ ] Wire lint into pre-commit (whatever the repo's pre-commit setup is)

---

## Phase 3: Fresh-install bootstrap — NOT STARTED

- [ ] Update `scripts/setup-fresh-db.sh` to drop the `00_full_schema.sql` path
- [ ] Add `--business-type` flag, route to seed bundles
- [ ] Create `scripts/seed-bundles/` with per-business-type bundles (or pointers)
- [ ] Write `docs/guide/new-tenant-bootstrap.md` (operator runbook)
- [ ] End-to-end test: `setup-fresh-db.sh new_tenant_test professional` → working DB
- [ ] Compare resulting schema to professional1 (`pg_dump --schema-only` diff)

---

## Phase 4: Periodic squash — NOT STARTED

- [ ] Write `scripts/squash-baseline.sh` automation
- [ ] Write `docs/guide/baseline-squash.md` cadence + procedure
- [ ] Dry-run the squash on a scratch DB (verify it produces a valid baseline)
- [ ] Document the per-client orphan-cleanup step (matches Phase 1 surgical SQL)

---

## Phase 5: CI verification — NOT STARTED

- [ ] Write `.github/workflows/migrations-verify.yml`
- [ ] Step 1: `pnpm db:apply` from empty DB
- [ ] Step 2: re-run `pnpm db:apply` (idempotency check)
- [ ] Step 3: smoke queries against critical tables
- [ ] Step 4: schema snapshot diff vs committed baseline (optional)
- [ ] Land alone first; fix any drift it surfaces; then merge subsequent work

---

## Phase 6: Wiki + runbook — NOT STARTED

- [ ] Add `docs/wiki/articles/migration-authoring.md`
- [ ] Update `docs/wiki/index.md` with "Database & Migrations" section
- [ ] Append entry to `docs/wiki/log.md`
- [ ] Re-index QMD (`qmd update && qmd embed`)

---

## Summary

- **Phases complete:** 0 / 6
- **Files modified:** 0 / 12

---

## Skipped / Deferred

| Item | Reason |
|------|--------|
| MySQL / SQL Server reconciliation | Repo only deploys against postgres today. Other dialects are scaffolded but unused. Do them when a real tenant needs one. |
| Atlas Cloud / `atlas migrate lint` integration | Requires Atlas Cloud account. Optional — local lint covers the common cases. |
| Auto-generated downs | Atlas's `migrate down` against a single-file migration isn't well-defined. Forward-fix migrations are the policy (see plan §Design Decisions). |

---

## How to Resume

To continue this work:

1. Read [plan.md](./plan.md) for the full design.
2. Read [explain.md](./explain.md) — the operator-facing summary, especially the "Migrating existing clients safely" section.
3. Start with Phase 1 (reconcile professional1). It unblocks `pnpm db:apply` on the dev DB and is required for any subsequent migration work.
4. Phases 2-6 are independent of each other; pick by priority. Recommended order: 2 → 5 → 3 → 4 → 6 (lint first locks in the contract, CI proves it, then the new-client and squash automation, then docs).
5. Keep `progress.md` checkboxes current as you go. The "How to Resume" section gets the last word — update it before ending the session.

**State of the world right now (2026-05-07):**
- `professional1` schema is correct.
- `professional1` Atlas tracker has drift (7 orphan rows, 2 missing rows). Phase 1 fixes this.
- `scratch_atlas_verify` (the prior agent's verification DB) has been dropped.
- `migrations/postgres/atlas.sum` was reconciled by the prior agent (commit yet to be made by user).
- Two recent migrations (`20260507194132`, `20260507201002`) are applied to professional1 via `psql -f`, not Atlas.

No companion docs (flow.md, verticals.md) — this is a meta-plan about the migration subsystem itself, not a feature with branching state. `explain.md` covers the operator-facing narrative instead.
