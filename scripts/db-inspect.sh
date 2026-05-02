#!/usr/bin/env bash
# Dump the live DB's full schema as SQL.
#
# Usage: pnpm db:inspect                 # postgres (default), to stdout
#        DIALECT=mysql pnpm db:inspect   # mysql
#        pnpm db:inspect > full.sql
set -euo pipefail
source "$(dirname "$0")/_load-env.sh"
atlas schema inspect --env "$DIALECT" --url "$DB_URL" --format '{{ sql . "  " }}'
