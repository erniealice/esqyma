#!/usr/bin/env bash
# Recompute migrations/<dialect>/atlas.sum, the integrity lock that prevents
# two devs writing migrations with conflicting timestamps. Run after adding a
# new migration; commit the updated atlas.sum alongside the migration files.
# Pass DIALECT=mysql|sqlserver to target a non-postgres dir.
set -euo pipefail
source "$(dirname "$0")/_load-env.sh"
atlas migrate hash --env "$DIALECT"
