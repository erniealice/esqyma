# Schema releases

This directory is the immutable, code-owned history of promoted database schema releases.

Each `postgres/YYYY.MM.N/` directory contains a reviewed `manifest.json` and the exact
`bootstrap.sql` for a proven-empty target. The manifest pins the Atlas tool, migration head,
`atlas.sum`, tracker state, bootstrap checksum, normalized dump fingerprint, runtime catalog
fingerprint, and accepted Copya seed contract.

The Go package embeds these artifacts so initializers and applications verify the same bytes.
Database state is derived from the embedded release plus Atlas/catalog observations; no database
schema-release history table is created.

Use `pnpm db:init -- --target <client>/<target> --schema-release postgres/YYYY.MM.N` from
`packages/esqyma`. Plan mode is the default; writes require `--apply`.


CI compares Esqyma history against the PR/push base package commit with
`scripts/check-schema-release-history.py` in the root repository. Existing migration/release bytes
cannot change; new active SQL must have a unique timestamp beyond the previous head and no up/down
suffix. Archived historical SQL is frozen and cannot receive new migrations. Each release must
include a bootstrap matching its manifest checksum. The one known 2026.08.1 newline restoration
has an exact checksum waiver authorized by the user; it is not a general repair mechanism.

`TestEveryEmbeddedReleaseArtifact` discovers every embedded release, validates bootstrap hashes
and predecessor proof bindings, and verifies exact Atlas prefix hashes when `ESQYMA_TEST_ATLAS=1`.
CI supplies `ESQYMA_MIGRATION_BASE_HEAD` for new-SQL policy checks. Database fresh/upgrade parity,
backup/recovery and fleet promotion evidence are additional gates; file validation alone cannot
qualify a release for deployment. Schema tags use `schema/postgres/YYYY.MM.N`, separately from API
module `v*` tags; no tags are created by these checks.

## Authoring the next additive release

1. Add reviewed SQL under `migrations/postgres/YYYYMMDDHHMMSS_description.sql`, using a timestamp
   later than the current head. Update the corresponding Esqyma schema/proto definition when
   relevant. Never change a published migration to accommodate a new field.
2. Qualify the pending SQL on a disposable database initialized to each supported predecessor.
   Preserve representative business data. Record the predecessor manifest hash and its observed
   tracker fingerprint, then the resulting tracker fingerprint and target catalog fingerprint.
   These are observations, not values to invent or copy from a different installation history.
3. Generate the complete target bootstrap from that verified schema, excluding operational data
   and Atlas/Copya ledgers. Install it into a second empty disposable database and prove catalog
   equality. The fresh tracker fingerprint can differ from the upgraded tracker fingerprint;
   record each in its proper manifest field.
4. Create `schema-releases/postgres/YYYY.MM.N/manifest.json` plus `bootstrap.sql`. For upgrade
   support use `format_version: 2`. Pin the head/count, capped migration-prefix checksum, bootstrap
   checksum and schema fingerprints. Declare `compatibility.phase: expand`, a separate API
   reference, operator version at least 2, named oracles and exact source proofs in `upgrades`.
   Each source proof contains `from_release`, `from_manifest_sha256`,
   `from_tracker_fingerprint` and the destination `tracker_fingerprint`.
5. Add workspace-scoped `compatibility.data_oracles` with exact SQL checksums and explicit row/time
   limits. Current comparisons support unchanged results or zero violating rows. If old Copya
   receipts remain valid, declare their releases in `seed_contract.compatible_schema_releases`;
   never rewrite those receipts to pretend they were installed by the new release.
6. Run the artifact/unit checks and the actual predecessor→target and empty→target database
   checks. Exercise failure, retry, data preservation and backup/restore evidence. The current
   synthetic lifecycle test validates the runner; it does not supply a new release's fingerprints.
7. Review and separately publish the Esqyma commit/tag, then pin the selected target and fleet
   manifest to the qualified release. Publication and database apply are separate actions.
   Run the local operator plan→review→apply→verify sequence from `cmd/schema-release/README.md`.

Available local checks (from the monorepo root):

```sh
go test ./packages/esqyma/schema-releases ./packages/esqyma/cmd/schema-release
ESQYMA_TEST_ATLAS=1 go test ./packages/esqyma/cmd/schema-release -run '^TestEveryEmbeddedReleaseArtifact$' -count=1
python3 packages/esqyma/scripts/tests/initializer_cli_test.py
```

The initializer test requires explicit loopback-only `P0_DB_HOST`, `P0_DB_PORT`, `P0_DB_USER`,
`P0_DB_PASSWORD`, and `P0_DB_SSLMODE` in the environment. It creates and cleans up its own database.
Opt-in database tests are not run by the ordinary Go command unless their documented test
connection variables are supplied. Do not use production credentials for disposable tests.

Existing untracked or divergent databases, including the inventoried MMIS production database,
need a source-specific reconciliation before step 2. An Atlas head alone is insufficient proof.
The runner currently refuses data-changing/backfill, nontransactional and destructive releases;
those require additional implementation and are not enabled by writing a v2 manifest.
