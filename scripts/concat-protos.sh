#!/usr/bin/env bash
# concat-protos.sh
# Concatenates all .proto files under domain/, infrastructure/, and integration/
# into domain.proto, infrastructure.proto, and integration.proto respectively.
# Strips all `service { ... }` blocks, `message ...Request { ... }` blocks,
# `message ...Response { ... }` blocks, and their preceding doc-comment lines.
#
# Usage: bash scripts/concat-protos.sh
#   Run from: packages/esqyma/

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROTO_BASE="$ROOT_DIR/proto/v1"
OUTPUT_DIR="$ROOT_DIR/docs/kb"
mkdir -p "$OUTPUT_DIR"

# Directories to process → output filename (without .proto)
declare -A DIRS=(
  [domain]="domain"
  [infrastructure]="infrastructure"
  [integration]="integration"
)

# strip_blocks: reads stdin, removes service blocks, Request/Response messages,
# and their preceding doc-comment lines
strip_blocks() {
  awk '
  BEGIN { depth = 0; in_block = 0; buffer = "" }
  {
    # When inside a stripped block, track brace depth
    if (in_block) {
      for (i = 1; i <= length($0); i++) {
        c = substr($0, i, 1)
        if (c == "{") depth++
        if (c == "}") depth--
      }
      if (depth <= 0) {
        in_block = 0
        depth = 0
        buffer = ""
      }
      next
    }

    # Detect: service blocks, message ...Request, message ...Response
    if ($0 ~ /^service[[:space:]]/ ||
        $0 ~ /^message[[:space:]].*Request[[:space:]]*\{/ ||
        $0 ~ /^message[[:space:]].*Response[[:space:]]*\{/) {
      in_block = 1
      depth = 0
      for (i = 1; i <= length($0); i++) {
        c = substr($0, i, 1)
        if (c == "{") depth++
        if (c == "}") depth--
      }
      if (depth <= 0) {
        in_block = 0
        depth = 0
      }
      # Drop any buffered comment lines preceding the block
      buffer = ""
      next
    }

    # Buffer comment lines (they might precede a stripped block)
    if ($0 ~ /^\/\//) {
      buffer = buffer $0 "\n"
      next
    }

    # Flush buffered comments (they did not precede a stripped block)
    if (buffer != "") {
      printf "%s", buffer
      buffer = ""
    }

    print
  }
  END {
    # Flush any trailing buffered comments
    if (buffer != "") printf "%s", buffer
  }
  '
}

for dir in "${!DIRS[@]}"; do
  src="$PROTO_BASE/$dir"
  out="$OUTPUT_DIR/${DIRS[$dir]}.proto"

  if [[ ! -d "$src" ]]; then
    echo "SKIP: $src does not exist"
    continue
  fi

  echo "Processing: $dir → $(basename "$out")"

  # Collect all .proto files (excluding any previous concat output and ALL_PROTOS*)
  mapfile -t files < <(
    find "$src" -name '*.proto' -type f \
      ! -name 'ALL_PROTOS*' \
      ! -name "${DIRS[$dir]}.proto" \
    | sort
  )

  if [[ ${#files[@]} -eq 0 ]]; then
    echo "  No .proto files found in $src"
    continue
  fi

  # Build the concatenated file
  {
    echo "// =============================================="
    echo "// ${DIRS[$dir]}.proto"
    echo "// Auto-generated concatenation of all .proto files"
    echo "// under proto/v1/$dir/"
    echo "// Service, Request, and Response blocks have been stripped."
    echo "// Generated: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
    echo "// =============================================="
    echo ""

    for f in "${files[@]}"; do
      # Relative path from proto/v1/ for the header
      rel="${f#"$PROTO_BASE/"}"
      echo ""
      echo "// ───── $rel ─────"
      echo ""
      cat "$f"
      echo ""
    done
  } | strip_blocks | cat -s > "$out"

  count=${#files[@]}
  lines=$(wc -l < "$out")
  echo "  $count files → $out ($lines lines)"
done

echo ""
echo "Done."
