#!/usr/bin/env bash
# Generate a new migration by diffing your draft change against the current
# migration sequence — without touching the live DB.
#
# Usage:
#   pnpm db:diff <name> <draft.sql>                       # postgres (default)
#   DIALECT=mysql pnpm db:diff <name> <draft.sql>         # mysql (needs setup)
#
# How it works (postgres path):
#   1. A throwaway "target" database is built by cloning the live schema via
#      pg_dump | psql, then your draft.sql is applied on top.
#   2. Atlas inspects that database (--to postgres://atlas_target) and the
#      migrations directory (current state via dev DB), and writes the diff
#      as the next migration file.
#   3. The target database is dropped on exit.
#
# Mysql / sqlserver paths use the same idea with mysqldump / sqlpackage and
# require the corresponding client tools on PATH. Stubbed below — implement
# when adopting a second dialect.
set -euo pipefail
source "$(dirname "$0")/_load-env.sh"

if [ $# -lt 2 ]; then
  echo "Usage: pnpm db:diff <name> <draft.sql>" >&2
  exit 2
fi

NAME="$1"
DRAFT="$2"

if [ ! -f "$DRAFT" ]; then
  echo "db:diff: draft file not found: $DRAFT" >&2
  exit 2
fi

case "$DIALECT" in
  postgres)
    TARGET_DB="${ATLAS_TARGET_DB:-atlas_target_$$}"
    export PGPASSWORD="$PG_PASS"

    cleanup() {
      psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d postgres \
        -c "DROP DATABASE IF EXISTS \"$TARGET_DB\"" >/dev/null 2>&1 || true
    }
    trap cleanup EXIT

    echo "db:diff: cloning live schema into scratch DB $TARGET_DB..."
    psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d postgres \
      -c "DROP DATABASE IF EXISTS \"$TARGET_DB\"" >/dev/null
    psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d postgres \
      -c "CREATE DATABASE \"$TARGET_DB\"" >/dev/null

    pg_dump --schema-only --no-owner --no-privileges \
      --exclude-schema=atlas_schema_revisions \
      --exclude-table=schema_migrations \
      -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" "$PG_NAME" \
      | grep -vE '^\\(restrict|unrestrict)' \
      | psql -v ON_ERROR_STOP=1 -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" \
        -d "$TARGET_DB" >/dev/null

    echo "db:diff: applying draft $DRAFT..."
    psql -v ON_ERROR_STOP=1 -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" \
      -d "$TARGET_DB" -f "$DRAFT" >/dev/null

    TARGET_URL="postgres://${PG_USER}:${PG_PASS_ENC}@${PG_HOST}:${PG_PORT}/${TARGET_DB}?sslmode=${PG_SSL}"
    ;;

  mysql)
    echo "db:diff: mysql path not implemented yet." >&2
    echo "         When you adopt mysql, the structure mirrors the postgres path:" >&2
    echo "           1. mysqladmin create atlas_target_\$\$" >&2
    echo "           2. mysqldump --no-data --routines --triggers \$LIVE | mysql atlas_target_\$\$" >&2
    echo "           3. mysql atlas_target_\$\$ < \$DRAFT" >&2
    echo "           4. atlas migrate diff with --to mysql://...atlas_target_\$\$" >&2
    echo "           5. mysqladmin drop atlas_target_\$\$" >&2
    exit 2
    ;;

  sqlserver)
    echo "db:diff: sqlserver path not implemented yet." >&2
    echo "         The structure mirrors the postgres path using sqlcmd / sqlpackage:" >&2
    echo "           1. sqlcmd -Q 'CREATE DATABASE atlas_target_\$\$'" >&2
    echo "           2. sqlpackage /a:Extract /sf:live.dacpac /scs:\$LIVE_URL" >&2
    echo "              sqlpackage /a:Publish /sf:live.dacpac /tcs:\$TARGET_URL" >&2
    echo "           3. sqlcmd -d atlas_target_\$\$ -i \$DRAFT" >&2
    echo "           4. atlas migrate diff with --to sqlserver://...atlas_target_\$\$" >&2
    echo "           5. sqlcmd -Q 'DROP DATABASE atlas_target_\$\$'" >&2
    exit 2
    ;;

  *)
    echo "db:diff: unknown DIALECT=$DIALECT" >&2
    exit 2
    ;;
esac

echo "db:diff: computing migration..."
atlas migrate diff "$NAME" \
  --env "$DIALECT" \
  --to "$TARGET_URL" \
  --dev-url "$DB_DEV_URL"

echo
echo "Wrote new migration to migrations/$DIALECT/. Review, then:"
echo "  pnpm db:hash    # update atlas.sum"
echo "  pnpm db:apply   # apply to live"
