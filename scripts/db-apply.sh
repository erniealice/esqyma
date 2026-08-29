#!/usr/bin/env bash
# Apply pending migrations to the target DB.
# Usage: pnpm db:apply                       # postgres (default)
#        DIALECT=mysql pnpm db:apply         # mysql
#        pnpm db:apply -- --dry-run
#
# This is a migration-application helper for an already Atlas-managed target.
# It never infers or stamps a baseline. Fresh initialization belongs to the
# explicit, versioned `pnpm db:init` workflow.
set -euo pipefail
source "$(dirname "$0")/_load-env.sh"

atlas migrate apply --env "$DIALECT" "$@"
