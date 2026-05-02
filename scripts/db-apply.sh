#!/usr/bin/env bash
# Apply pending migrations to the target DB.
# Usage: pnpm db:apply                       # postgres (default)
#        DIALECT=mysql pnpm db:apply         # mysql
#        pnpm db:apply -- --dry-run
#
# On first run against an existing DB (one that already has user tables),
# the script stamps the earliest migration via `atlas migrate set` so atlas
# treats the baseline as already-applied and only executes anything after.
set -euo pipefail
source "$(dirname "$0")/_load-env.sh"

MIG_DIR="migrations/$DIALECT"

# Determine baseline version (the earliest migration filename's timestamp).
BASELINE_VERSION=$(ls "$MIG_DIR"/[0-9]*.sql 2>/dev/null \
  | head -1 | xargs -n1 basename 2>/dev/null | cut -d_ -f1 || echo "")

if [ -z "$BASELINE_VERSION" ]; then
  echo "atlas: no migration files in $MIG_DIR — nothing to apply"
  exit 0
fi

# Detect whether atlas's revision tracking already exists. Postgres only for now;
# for other dialects, baselining is a manual step the operator handles.
if [ "$DIALECT" = "postgres" ]; then
  REVISIONS_EXISTS=$(PGPASSWORD="${PG_PASS:-}" psql "$DB_URL" -tAc \
    "SELECT 1 FROM information_schema.tables WHERE table_name = 'atlas_schema_revisions' LIMIT 1" 2>/dev/null \
    | tr -d '[:space:]')

  if [ -z "$REVISIONS_EXISTS" ]; then
    HAS_USER_TABLES=$(PGPASSWORD="${PG_PASS:-}" psql "$DB_URL" -tAc \
      "SELECT 1 FROM information_schema.tables
       WHERE table_schema = 'public' AND table_name NOT IN ('schema_migrations','atlas_schema_revisions')
       LIMIT 1" 2>/dev/null | tr -d '[:space:]')

    if [ "$HAS_USER_TABLES" = "1" ]; then
      echo "atlas: first run — existing DB detected. Stamping revisions up to $BASELINE_VERSION as already applied."
      atlas migrate set "$BASELINE_VERSION" --env "$DIALECT" --url "$DB_URL"
    else
      echo "atlas: first run — empty DB detected. Will execute the baseline."
    fi
  fi
fi

atlas migrate apply --env "$DIALECT" "$@"
