#!/usr/bin/env bash
# Retired destructive initializer. Kept only as a fail-closed compatibility
# pointer for operators who still have the old command in local notes/scripts.
set -euo pipefail

cat >&2 <<'EOF'
setup-fresh-db.sh is retired because it dropped named databases and synthesized
unversioned schema state. Use the reviewed, plan-first release initializer:

  pnpm db:init -- --target <client>/<target> --schema-release postgres/YYYY.MM.N

After reviewing the JSON plan, repeat the same command with --apply.
The replacement never drops or recreates an existing database.
EOF
exit 64
