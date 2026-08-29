# Database-script tests

These tests qualify Esqyma's pinned Atlas toolchain and versioned fresh-database bootstrap. Run them
from `packages/esqyma/`.

`install_atlas_test.sh` is the package-local installer policy test. `bootstrap_release_test.sh` is
the disposable Postgres qualification harness; its command and required boundary must not be
replaced by a run against an application or remote database.

## Test commands

```sh
cd packages/esqyma

/bin/bash scripts/tests/install_atlas_test.sh
/bin/bash scripts/tests/bootstrap_release_test.sh
```

Validate the published migration directory separately:

```sh
cd packages/esqyma
./.tools/atlas/v1.3.0/atlas migrate validate --dir file://migrations/postgres
```

`install_atlas_test.sh` verifies that `install-atlas.sh`:

- pins Atlas Community `v1.3.0` rather than `latest` or a canary;
- accepts only the published `darwin-amd64` and `linux-amd64` checksums;
- rejects an unsupported platform; and
- leaves no installed destination when supplied bytes fail their checksum.

The installer itself verifies bytes before making or executing the binary and installs only at the
explicit override destination or `.tools/atlas/v1.3.0/atlas`.

`bootstrap_release_test.sh` proves at least:

- a proven-empty database reaches the manifest's exact Atlas head with the dynamically derived
  revision count—currently 76—and zero pending migrations;
- bootstrap and migration-built control catalogs have the same normalized fingerprint;
- supported `atlas migrate set` establishes the exact repository head without raw tracker SQL;
- setting the same head again leaves the tracker unchanged;
- an injected Copya failure before the transaction leaves no identity or receipt rows;
- a successful Copya retry applies the exact bundle once and a later no-secret retry is a verified no-op;
- a synthetic next migration is selected once, applies once, and then reports zero pending; and
- every failure path removes only the databases and temporary files owned by that test run.

## Database boundary

- The integration test may connect only when both configured and observed server addresses are
  loopback.
- It creates only unique names beginning `ichizen_p0_`; each exact name must be proven absent first.
- It must never connect to or mutate `education1`, `professional1`, `leasing1`, another named app
  database, or any remote database.
- It must not issue raw `INSERT`, `UPDATE`, or `DELETE` against Atlas or legacy migration trackers.
- Temporary migrations, bootstraps, logs, and downloaded binaries live in one uniquely named
  `/private/tmp` directory and are removed through an exact-path cleanup trap.
- Before any drop, the harness validates both the run-specific name prefix and that the database was
  created by the current run. Cleanup must finish with zero matching database and directory
  leftovers.

The bootstrap test requires local PostgreSQL plus PostgreSQL client `18.3`, whose fixed
`--restrict-key` support is part of deterministic bootstrap generation. Missing prerequisites are a
clear skip/blocker; they do not authorize installing software, starting a container, or falling back
to another target.
