#!/usr/bin/env bash
# Show pending vs applied migrations for the chosen DIALECT (default postgres).
set -euo pipefail
source "$(dirname "$0")/_load-env.sh"
atlas migrate status --env "$DIALECT" "$@"
