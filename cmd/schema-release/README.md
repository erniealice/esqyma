# Schema release operator

For the lean local-machine workflow, see [local operator instructions](../../../../docs/plan/archive/20260822-multi-environment-schema-release-management/local-operator.md). Cloud Run qualification is deferred.

This command is the implementation behind `pnpm db:init`. It resolves a reviewed
`deploy/<client>/database/targets/<name>.json`, asserts the explicit Esqyma calendar release, and
validates every selected Copya bundle before it observes or changes a database. A schema-only
target may select an empty bundle list; data bundles are an explicit, separate rehearsal concern.

Plan mode is the default and read-only. `--apply` may create only an absent database selected by a
`local` or `disposable` target with `allow_create=true`; it never drops, resets, restores, applies a
down migration, or edits Atlas rows directly.

After schema and required-bundle verification, every apply publishes a sanitized, uniquely named
receipt outside the repository and returns its URI and SHA-256 digest. Local/disposable runs default
to the operating system's private temporary directory; `DB_INIT_RECEIPT_DIR` selects a dedicated
absolute append-only location. Remote applies must provide that external location. Git promotion
records store only the resulting digest.


For an application/deployment gate use `--verify` (mutually exclusive with `--apply`):

```sh
pnpm db:init -- --target CLIENT/TARGET --schema-release postgres/YYYY.MM.N --verify
```

Unlike initialization planning, verification refuses absent/empty/untracked databases and missing
required bundle receipts. It performs no initialization, seeding or receipt publication. A successful
plan alone does not mean the database is ready for the application.


## Forward additive release upgrades

The additive runner has passed disposable database lifecycle qualification, including backup/restore
and interruption recovery. Each real release transition still requires its own source proofs.
Local test success is not permission to apply to a remote database. Operator steps and evidence are tracked in
`docs/plan/archive/20260822-multi-environment-schema-release-management/production-runbook.md`.

A reviewed existing-database target has `allow_create=false`, `expected_empty=false`, and an
`upgrade` object specifying `from_release`, exact `endpoint` (`host:port`), `migration_role`,
`runtime_role`, `connection_mode` (`direct` or `session`), and `backup_max_age_hours` (1..168). Optional `connection_user` identifies a pooler
login when it differs from PostgreSQL `current_user`. Remote targets require `verify-full` TLS;
`DATABASE_POSTGRES_SSLROOTCERT` must select an absolute regular PEM CA file; its bytes enter the plan digest. Credentials remain in the target's
ignored environment file or operator process environment. The endpoint assertion detects accidental
environment overrides. A session-mode connection is required for advisory locking; do not use a
transaction pooler for migrations.

```sh
# Observe the exact predecessor and emit a deterministic review digest; no DB writes.
pnpm db:init -- --target CLIENT/TARGET --schema-release postgres/YYYY.MM.N \
  --upgrade-from postgres/YYYY.MM.P

# Only after review, backup/restore verification, and environment-specific authority:
pnpm db:init -- --target CLIENT/TARGET --schema-release postgres/YYYY.MM.N \
  --upgrade-from postgres/YYYY.MM.P --apply \
  --approve-plan PLAN_SHA256 --approval-ref CHANGE_REFERENCE \
  --backup-receipt /absolute/outside/git/backup.json --backup-sha256 RECEIPT_SHA256

# Exact readiness check, distinct from planning:
pnpm db:init -- --target CLIENT/TARGET --schema-release postgres/YYYY.MM.N --verify
```

The schema release, target, from/to manifest hashes, tracker/catalog proofs, exact pending migration
bytes, and existing bundle identities all contribute to the review digest. A changed plan invalidates
approval. Upgrade never creates a database, installs a bootstrap, stamps Atlas history, reapplies seed
bundles, or automatically runs a down migration. Already-current targets must match the selected predecessor proof. Apply recovery requires the original durable intent, plan approval and still-valid backup evidence, then emits a final receipt without DDL or reseeding. A plain `--verify` publishes no receipt. Unknown/partial histories stop for explicit recovery.

Backup receipt format 1 requires `target_key`, `database`, `endpoint`, `from_release`, `plan_sha256`,
`tracker_fingerprint`, `catalog_fingerprint`, absolute `archive_path`, `archive_sha256`,
`archive_list_sha256`, UTC RFC3339 `created_at` / `restore_verified_at`, and `restore_evidence_ref`.
Compute `archive_list_sha256` from the exact bytes of `pg_restore --list ARCHIVE`. The receipt and
archive stay outside Git. The runner recomputes both hashes and rejects stale/mismatched evidence;
it does not perform a restore. The restore exercise reference is an operator attestation and must
point to real disposable-restore evidence, not a fabricated identifier.

Current execution supports atomic expand transitions. Contract/fleet-fence and nontransactional
recovery workflows remain implementation gates; the runner refuses them. Use the full plan's
acceptance matrix to track those gates rather than assuming every planned mode is available.


Existing-database upgrades and remote `--verify` require an `access` object in the target:
`endpoint`, distinct `runtime_role` / `migration_role`, and separate `runtime` / `migration`
objects containing `user_env`, `password_env`, and `connection_user`. The referenced environment
keys select credentials for that operation; generic ambient user/password values cannot change
its identity. `connection_user` is the wire login (including a pooler suffix when applicable),
while the role assertion is PostgreSQL `current_user`. These fields contain references, never
passwords. Access and upgrade endpoint/role assertions must agree. Existing Keychain-backed profiles can use the migration-only adapter described below; they must still satisfy the target's distinct runtime-role policy.

Before migration the runner seals and syncs an external `upgrade-intent-<plan digest>.json`,
then syncs the directory. The final receipt references that intent digest. Recovery requires
matching original intent/evidence and verified destination history; it never reruns migrations
at the destination or fabricates an origin from a fresh-install fingerprint. Partial intent
files stop for manual investigation. Disposable lifecycle qualification has passed with an injected failure after Atlas commit,
followed by receipt recovery without rerunning SQL. Real supported-release qualification remains
outstanding; the test uses synthetic releases.


Atomic expand SQL is checked before connecting: additive CREATE/ALTER/COMMENT only, with no
file-level Atlas directives, transaction-control statements, destructive keywords or protected
history/receipt objects. The scanner understands statement boundaries, comments and ordinary
quotes; it conservatively refuses escape syntax, dollar-quoted/procedural bodies and unclassified
commands. It is a token policy, not a full SQL parser or proof of arbitrary function semantics.
INSERT/UPDATE migrations remain refused until release-specific data-oracle and retry contracts
are implemented. Never remove the guard to make a migration pass; qualify its required migration
class through the plan instead. These unfinished classes remain acceptance work, not supported
operator features.


Each upgrade release now requires `compatibility.data_oracles`. Each definition has an `id`,
`sql`, `sql_sha256`, `mode` (`unchanged` or `zero-rows`), `max_rows` (1–10000), and
`timeout_seconds` (1–30). SQL must be a SELECT/WITH query using `$1` for the selected workspace ID.
The query and its scope are reviewed release code; merely mentioning `$1` is not proof of correct
business scoping. Prefer aggregate/invariant queries and stable columns. `zero-rows` returns
violating rows (an empty result passes); it does not expect `SELECT count(*)`.

Queries run inside PostgreSQL READ ONLY transactions, including when the migration connection
is otherwise writable. A sorted multiset of row hashes and column names yields a deterministic
fingerprint; raw values are neither logged nor written to the intent/receipt. Bounds or query
errors stop the run. The approved plan pins pre-migration observations, rechecked immediately
before Atlas. Post-migration observations must match. After interruption, recovery uses the
original intent baseline and refuses to bless changed destination data. Completed-state planning
requires the original `--approve-plan` to recover that baseline; use plain `--verify` for readiness.

Quiesce application writes to the oracle scope during the reviewed upgrade window. The operator
lock excludes other migration runners; it does not lock out application writes. Unexpected data
drift invalidates approval before apply or stops post-commit finalization for investigation.
Transforming backfill comparisons still require their own reviewed contract; unchanged/zero-rows
checks do not silently permit changed data.


Fleet selection is mandatory for initialization and upgrades. `deploy/database-fleet.json` pins
canonical target paths and SHA-256, scope, environment and rollout batch. Plan can inspect a
proposed worktree registry. Apply, and remote deploy verification, require registry, selected
target and bundle bytes to match one captured HEAD commit. Unknown targets, paths outside the
repository, symlink inputs, digest/scope mismatches and dirty apply inputs fail before connection.
Registry bytes enter the upgrade approval digest and final receipt. Copya executes a private
read-only snapshot of selected bundle bytes. Committing implementation or target changes is a
separate explicitly authorized release workflow; the runner never commits for the operator.

Shared operator interface (no default target/release):

```sh
./deploy/lib/database-release.sh plan --target CLIENT/TARGET --release postgres/YYYY.MM.N --from postgres/YYYY.MM.P
./deploy/lib/database-release.sh apply --target CLIENT/TARGET --release postgres/YYYY.MM.N --from postgres/YYYY.MM.P --approve-plan PLAN_SHA256 --approval-ref CHANGE_REFERENCE --backup-receipt /external/backup.json --backup-sha256 RECEIPT_SHA256
./deploy/lib/database-release.sh verify --target CLIENT/TARGET --release postgres/YYYY.MM.N
```

Client wrappers at `deploy/<client>/scripts/migrate.sh` enforce client identity and delegate to
this engine. MMIS currently has no registered upgrade target: its read-only production inventory
requires legacy reconciliation first. A wrapper's existence does not authorize or enable applying
to an unregistered deployment. Rollout batch metadata alone does not prove promotion approval or
a contract compatibility fence; those gates remain under implementation.


For a macOS operator, `access.migration` can contain `connection_user` and `keychain_profile`
(e.g. `deploy/CLIENT/.env.postgres-admin.local`) instead of `user_env` / `password_env`.
The profile uses the existing `MIGRATION_POSTGRES_*` plain-key format and contains no password.
It must be a regular Git-ignored file owned by the operator with mode 0600. Its database,
endpoint, login, migration/runtime roles and Keychain account must match the reviewed target;
`ALLOW_ADMIN_RUNTIME_ROLE=1` is refused. The loader validates identity/TLS before reading the
Keychain and includes the non-secret profile SHA-256 in the upgrade plan. A changed profile
invalidates approval. Runtime `--verify` always uses `access.runtime` environment references
and never accesses the migration Keychain. Linux CI uses explicit migration environment references.
No credentials are placed in command arguments, receipts or committed target files.

MMIS's observed production profile currently uses a shared privileged runtime account. The
adapter does not waive that mismatch or perform grants/credential rotation. Resolve its role
separation and legacy schema state through an explicitly approved reconciliation before registering
an upgrade target. Read-only inventory remains available through the existing admin helper.

Remote initialization and upgrade plans/apply require an existing Esqyma Git tag named
`schema/postgres/YYYY.MM.N`. API module tags do not qualify. The resolved commit must contain
the exact embedded manifest, checksum-pinned bootstrap and reviewed migration prefix. Upgrades
check both source and destination tags and bind their commits into the approval digest and receipt.
The runner only reads local Git objects; it never fetches, creates or moves tags. Plain runtime
`--verify` does not require schema tags or Atlas. Local/disposable targets can qualify unpublished
candidates. No schema tags have been published as part of this implementation; publication CI,
tag protection and promotion qualification remain open acceptance gates.

Cloud Run passes `--deployment-env-file /absolute/path/to/runtime.env` and
`--deployment-ca-file /absolute/private/snapshot/<basename>` with `--verify` for the
`postgres-production` lane. These options are forbidden for initialization/upgrade operations;
the CA option is never valid without the environment option. The environment file must be the registered
target environment, without symlinks, and use unique unquoted `KEY=value` entries. Before DB
connection, the verifier compares the file's provider, release, target, host, port, database,
runtime login, TLS mode and complete bundle requirements with the selected verification inputs.
The runtime `DATABASE_POSTGRES_SSLROOTCERT=/app/certs/<basename>` must map exactly to the regular,
non-symlinked operator-local CA basename, and the verifier uses those local bytes for `verify-full`.
Ambient overrides cannot silently redirect verification away from those declared values.
Bundle ordering may differ; missing, extra, duplicate or altered requirements fail closed.
Cloud Run captures private environment and public-CA snapshots, compares both with their registered
sources after the gates, then uses the snapshots for build, CA staging and runtime variable assembly.
Source edits during verification stop the run; later source edits cannot replace those inputs. The
private snapshots stay outside the image context and are removed on exit. This does not prove Secret Manager
versions, deployed credential contents or the provenance of other build inputs.


Initialization apply holds an operator lock before inspecting state, and the target lock shared
with upgrades once the database exists. Server-observed database and migration role must match
before writes. Bootstrap SQL runs in one transaction: SQL failure rolls back and may be retried.
Atlas head establishment and Copya execution are later verified phases. An interruption between
bootstrap commit and history establishment requires investigation; the runner will not silently
adopt an untracked nonempty database. Keep the original evidence for recovery.
