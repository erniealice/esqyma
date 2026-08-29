#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALLER="$(cd "$SCRIPT_DIR/.." && pwd)/install-atlas.sh"

darwin_spec="$(ATLAS_INSTALL_OS=darwin ATLAS_INSTALL_ARCH=amd64 "$INSTALLER" --print-spec)"
linux_spec="$(ATLAS_INSTALL_OS=linux ATLAS_INSTALL_ARCH=amd64 "$INSTALLER" --print-spec)"

case "$darwin_spec" in
  "darwin-amd64 https://atlasbinaries.com/atlas/atlas-community-darwin-amd64-v1.3.0 650981a024301775ec964e5134e2d5712b7ef1b25fec4b2ec54bad762b4bdf6f") ;;
  *) echo "unexpected darwin spec" >&2; exit 1 ;;
esac

case "$linux_spec" in
  "linux-amd64 https://atlasbinaries.com/atlas/atlas-community-linux-amd64-v1.3.0 10d7913e3dce43ab99b8d71534a4cbadaf11a16dc293adf3b91d10e83a0ac70b") ;;
  *) echo "unexpected linux spec" >&2; exit 1 ;;
esac

if ATLAS_INSTALL_OS=windows ATLAS_INSTALL_ARCH=amd64 "$INSTALLER" --print-spec >/dev/null 2>&1; then
  echo "unsupported platform unexpectedly accepted" >&2
  exit 1
fi

TEMP_DIR="$(mktemp -d "${TMPDIR:-/private/tmp}/ichizen-atlas-installer-test.XXXXXX")"
cleanup() {
  case "$TEMP_DIR" in
    */ichizen-atlas-installer-test.*) rm -rf -- "$TEMP_DIR" ;;
  esac
}
trap cleanup EXIT

printf 'not atlas\n' > "$TEMP_DIR/fake-atlas"
if ATLAS_INSTALL_OS=darwin ATLAS_INSTALL_ARCH=amd64 \
  ATLAS_INSTALL_SOURCE="$TEMP_DIR/fake-atlas" \
  ATLAS_INSTALL_DESTINATION="$TEMP_DIR/installed-atlas" \
  "$INSTALLER" >/dev/null 2>&1; then
  echo "checksum mismatch unexpectedly accepted" >&2
  exit 1
fi

test ! -e "$TEMP_DIR/installed-atlas"
echo "install_atlas_test: PASS"
