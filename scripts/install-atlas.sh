#!/usr/bin/env bash
# Installs the one supported Atlas Community binary after exact SHA-256 proof.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

VERSION="1.3.0"
OS_NAME="${ATLAS_INSTALL_OS:-$(uname -s)}"
ARCH_NAME="${ATLAS_INSTALL_ARCH:-$(uname -m)}"

case "${OS_NAME}/${ARCH_NAME}" in
  Darwin/x86_64|darwin/amd64)
    PLATFORM="darwin-amd64"
    EXPECTED_SHA256="650981a024301775ec964e5134e2d5712b7ef1b25fec4b2ec54bad762b4bdf6f"
    ;;
  Linux/x86_64|linux/amd64)
    PLATFORM="linux-amd64"
    EXPECTED_SHA256="10d7913e3dce43ab99b8d71534a4cbadaf11a16dc293adf3b91d10e83a0ac70b"
    ;;
  *)
    echo "install-atlas: unsupported platform ${OS_NAME}/${ARCH_NAME}; supported: darwin-amd64, linux-amd64" >&2
    exit 1
    ;;
esac

URL="https://atlasbinaries.com/atlas/atlas-community-${PLATFORM}-v${VERSION}"

if [ "${1:-}" = "--print-spec" ]; then
  printf '%s %s %s\n' "$PLATFORM" "$URL" "$EXPECTED_SHA256"
  exit 0
fi

DESTINATION="${ATLAS_INSTALL_DESTINATION:-$PACKAGE_DIR/.tools/atlas/v${VERSION}/atlas}"
DESTINATION_DIR="$(dirname "$DESTINATION")"
mkdir -p "$DESTINATION_DIR"

if [ -x "$DESTINATION" ]; then
  ACTUAL_SHA256="$(LANG=C LC_ALL=C shasum -a 256 "$DESTINATION" | awk '{print $1}')"
  if [ "$ACTUAL_SHA256" = "$EXPECTED_SHA256" ]; then
    "$DESTINATION" version
    exit 0
  fi
  echo "install-atlas: existing binary checksum mismatch at $DESTINATION" >&2
  exit 1
fi

TEMP_DIR="$(mktemp -d "${TMPDIR:-/private/tmp}/ichizen-atlas-v${VERSION}.XXXXXX")"
TEMP_BINARY="$TEMP_DIR/atlas"
cleanup() {
  case "$TEMP_DIR" in
    */ichizen-atlas-v1.3.0.*) rm -rf -- "$TEMP_DIR" ;;
  esac
}
trap cleanup EXIT

if [ -n "${ATLAS_INSTALL_SOURCE:-}" ]; then
  cp "$ATLAS_INSTALL_SOURCE" "$TEMP_BINARY"
else
  curl --proto '=https' --tlsv1.2 --max-time 120 -fL --output "$TEMP_BINARY" "$URL"
fi

ACTUAL_SHA256="$(LANG=C LC_ALL=C shasum -a 256 "$TEMP_BINARY" | awk '{print $1}')"
if [ "$ACTUAL_SHA256" != "$EXPECTED_SHA256" ]; then
  echo "install-atlas: checksum mismatch for $PLATFORM" >&2
  exit 1
fi

chmod 0555 "$TEMP_BINARY"
mv "$TEMP_BINARY" "$DESTINATION"
"$DESTINATION" version
