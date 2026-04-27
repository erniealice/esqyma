#!/usr/bin/env bash

##############################################################################
# lint-no-jargon.sh — Enforce C1 no-industry-specific-jargon constraint
#
# Scans git diffs (added lines only) for forbidden tokens per the universal-job-model plan.
# Initial mode: report-only (exit 0 even when violations found).
#
# Usage:
#   lint-no-jargon.sh [--mode={report|block}] [--target-ref=main]
#
# Examples:
#   ./lint-no-jargon.sh                          # report-only vs. main
#   ./lint-no-jargon.sh --mode=block             # block-mode vs. main
#   ./lint-no-jargon.sh --target-ref=develop    # report-only vs. develop
#
##############################################################################

set -euo pipefail

# Parse arguments
MODE="report"
TARGET_REF="main"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --mode=*)
      MODE="${1#--mode=}"
      ;;
    --target-ref=*)
      TARGET_REF="${1#--target-ref=}"
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
  shift
done

# Validate mode
if [[ ! "$MODE" =~ ^(report|block)$ ]]; then
  echo "Invalid mode: $MODE (must be 'report' or 'block')" >&2
  exit 1
fi

##############################################################################
# Check that target ref exists
##############################################################################
if ! git rev-parse --verify "$TARGET_REF" &>/dev/null; then
  echo "Target ref '$TARGET_REF' not found" >&2
  exit 1
fi

##############################################################################
# Forbidden tokens per docs/plan/20260427-universal-job-model/plan.md §C1
#
# These tokens are forbidden in proto field names, Go identifiers, SQL column
# names, file names, enum values, and comments (with noted exceptions).
##############################################################################
FORBIDDEN_TOKENS="bom bill_of_materials bom_line bom_header manufacturing manufactured production_order mfg wip eco engineering_change_order work_center workcenter routing phantom_assembly phantom_bom quality_hold downtime variance standard_cost prescription checklist episode appointment dispatch truck chair operatory patient firmed released_for_production in_process"

##############################################################################
# Allowed exceptions (do NOT flag):
# - BackflushPolicy enum and backflush_policy / is_backflushed fields
# - ActivityMaterial.scrap_quantity, JobOutput.scrap_quantity, MovementType.SCRAP
# - route (HTTP routing); only routing (manufacturing sense) is forbidden
# - "work in progress" in comments / docs
# - Any token in .jargon-allow whitelist
##############################################################################

# Read .jargon-allow file (if it exists)
ALLOW_FILE="$(cd "$(dirname "$0")/.." && pwd)/.jargon-allow"
WHITELIST_ENTRIES=""

if [ -f "$ALLOW_FILE" ]; then
  while IFS= read -r line; do
    # Skip comments and empty lines
    [ -z "$line" ] && continue
    echo "$line" | grep -q "^#" && continue
    # Append to whitelist (one per line)
    WHITELIST_ENTRIES="$WHITELIST_ENTRIES$line"$'\n'
  done < "$ALLOW_FILE"
fi

##############################################################################
# Helper: check if a line is a comment
# Returns 0 (true) if the line is a comment, 1 (false) otherwise.
##############################################################################
is_comment_line() {
  local line="$1"
  # Remove leading + and whitespace
  line=$(echo "$line" | sed 's/^+//' | sed 's/^[[:space:]]*//')
  # Check if line starts with comment markers
  echo "$line" | grep -q "^[[:space:]]*\(//\|#\|/\*\|\*\|--\)" && return 0
  return 1
}

##############################################################################
# Helper: check if a path:token combination is whitelisted
##############################################################################
is_whitelisted() {
  local path="$1"
  local token="$2"

  # Check for "path:token" entry
  echo "$WHITELIST_ENTRIES" | grep -q "^${path}:${token}$" && return 0

  # Check for global token entry
  echo "$WHITELIST_ENTRIES" | grep -q "^${token}$" && return 0

  return 1
}

##############################################################################
# Helper: check if a line contains an inline allow-jargon comment
##############################################################################
has_allow_jargon_comment() {
  local line="$1"
  echo "$line" | grep -q "//[[:space:]]*allow-jargon:" && return 0
  return 1
}

##############################################################################
# Main diff scan
##############################################################################

VIOLATION_COUNT=0
TOKENS_WITH_VIOLATIONS=""

# Get the diff of added lines in .proto, .go, and .sql files
DIFF_OUTPUT=$(git diff --diff-filter=AM "$TARGET_REF"..HEAD -- '*.proto' '*.go' '*.sql' 2>/dev/null || true)

# Early exit if no diff
if [ -z "$DIFF_OUTPUT" ]; then
  echo "No changes detected between $TARGET_REF and HEAD (added/modified files only)."
  exit 0
fi

# Process the diff line by line
echo "$DIFF_OUTPUT" | while IFS= read -r line; do
  # Skip non-addition lines
  echo "$line" | grep -q "^+" || continue
  echo "$line" | grep -q "^+++" && continue

  # Skip comment lines (manufacturing in comments is OK)
  if is_comment_line "$line"; then
    continue
  fi

  # Skip lines with inline allow-jargon comments
  if has_allow_jargon_comment "$line"; then
    continue
  fi

  # Check each forbidden token
  for token in $FORBIDDEN_TOKENS; do
    # Use grep for case-insensitive word-boundary match
    # Word boundary: use sed to avoid \b in older grep
    if echo "$line" | grep -iq "[^a-zA-Z0-9_]$token[^a-zA-Z0-9_]" || \
       echo "$line" | grep -iq "^[^a-zA-Z0-9_]*$token[^a-zA-Z0-9_]" || \
       echo "$line" | grep -iq "[^a-zA-Z0-9_]$token[^a-zA-Z0-9_]*$"; then
      ((VIOLATION_COUNT++))
      # Track unique tokens with violations
      if ! echo "$TOKENS_WITH_VIOLATIONS" | grep -q "^${token}$"; then
        TOKENS_WITH_VIOLATIONS="$TOKENS_WITH_VIOLATIONS$token"$'\n'
      fi
      # Print violation
      echo "  $token: $line"
    fi
  done
done

##############################################################################
# Report and exit
##############################################################################

UNIQUE_TOKENS=$(echo "$TOKENS_WITH_VIOLATIONS" | grep -v "^$" | wc -l)

if [ $VIOLATION_COUNT -gt 0 ]; then
  echo ""
  echo "Found $VIOLATION_COUNT violation(s) across $UNIQUE_TOKENS token(s)"
  if [ "$MODE" = "block" ]; then
    exit 1
  else
    exit 0
  fi
else
  echo "No jargon violations found."
  exit 0
fi
