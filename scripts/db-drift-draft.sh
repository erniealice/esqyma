#!/usr/bin/env bash
# Detect proto-vs-DB drift and emit a SQL draft of the missing columns.
# Stops short of applying — review first, then run `pnpm db:diff` on the draft.
#
# Usage: pnpm db:drift-draft                 # writes to /tmp/drift-fixup-<ts>.sql
#        pnpm db:drift-draft /path/to/out    # custom output path
#
# Postgres only. Requires `descriptors.bin` to be fresh (run `pnpm generate`
# or `buf build ./proto/v1 -o ./proto/v1/descriptors.bin` if proto changed).
set -euo pipefail
source "$(dirname "$0")/_load-env.sh"

if [ "$DIALECT" != "postgres" ]; then
  echo "db:drift-draft: only postgres is supported (DIALECT=$DIALECT)" >&2
  exit 2
fi

OUT="${1:-/tmp/drift-fixup-$(date +%Y%m%d%H%M%S).sql}"

DESCRIPTOR=proto/v1/descriptors.bin
if [ ! -f "$DESCRIPTOR" ]; then
  echo "db:drift-draft: $DESCRIPTOR missing — run 'pnpm generate' or buf build first" >&2
  exit 2
fi

POSTGRES_HOST="$PG_HOST" POSTGRES_PORT="$PG_PORT" POSTGRES_NAME="$PG_NAME" \
POSTGRES_USER="$PG_USER" POSTGRES_PASSWORD="$PG_PASS" POSTGRES_SSL_MODE="$PG_SSL" \
  go run ./cmd/protocheck --sql-out "$OUT" || true

echo
echo "Draft path: $OUT"
echo "Diff to migration:  pnpm db:diff fix_drift $OUT"
