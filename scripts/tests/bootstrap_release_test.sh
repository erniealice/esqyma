#!/usr/bin/env bash
# Proves migration replay -> bootstrap -> Atlas head -> synthetic-next on two
# harness-owned disposable databases. Never accepts an app database name.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
ROOT_DIR="$(cd "$PACKAGE_DIR/../.." && pwd)"
MIGRATIONS_DIR="$PACKAGE_DIR/migrations/postgres"
ATLAS_BIN="${ATLAS_BIN:-$PACKAGE_DIR/.tools/atlas/v1.3.0/atlas}"
COPYA_DIR="$ROOT_DIR/packages/copya"
COPYA_BUNDLE="$ROOT_DIR/deploy/gpagoda/database/data/gpagoda-base/2026.08.1.json"

DB_HOST="${P0_DB_HOST:-127.0.0.1}"
DB_PORT="${P0_DB_PORT:-5432}"
DB_USER="${P0_DB_USER:?P0_DB_USER is required}"
DB_PASSWORD="${P0_DB_PASSWORD:?P0_DB_PASSWORD is required}"
DB_SSLMODE="${P0_DB_SSLMODE:-disable}"

case "$DB_HOST" in
  127.0.0.1|localhost|::1) ;;
  *) echo "bootstrap_release_test: refusing non-loopback host" >&2; exit 1 ;;
esac

test -x "$ATLAS_BIN"
test "$("$ATLAS_BIN" version | awk 'NR == 1 {print $4}')" = "v1.3.0"
case "$(pg_dump --version)" in
  "pg_dump (PostgreSQL) 18.3"*) ;;
  *) echo "bootstrap_release_test: pg_dump 18.3 is required" >&2; exit 1 ;;
esac

RUN_ID="${P0_RUN_ID:-$(date -u +%Y%m%d%H%M%S)}"
case "$RUN_ID" in
  *[!0-9]*|'') echo "bootstrap_release_test: run id must be numeric" >&2; exit 1 ;;
esac

CONTROL_DB="ichizen_p0_v130_${RUN_ID}_control"
BOOTSTRAP_DB="ichizen_p0_v130_${RUN_ID}_bootstrap"
for db_name in "$CONTROL_DB" "$BOOTSTRAP_DB"; do
  case "$db_name" in
    "ichizen_p0_v130_${RUN_ID}_"[a-zA-Z0-9_]*) ;;
    *) echo "bootstrap_release_test: invalid disposable name" >&2; exit 1 ;;
  esac
  test "${#db_name}" -le 63
done

TEMP_DIR="$(mktemp -d "${TMPDIR:-/private/tmp}/ichizen-p0-atlas-v130.XXXXXX")"
FORWARD_DIR="$TEMP_DIR/forward-migrations"
SYNTHETIC_DIR="$TEMP_DIR/synthetic-migrations"
BOOTSTRAP_ONE="$TEMP_DIR/bootstrap-one.sql"
BOOTSTRAP_TWO="$TEMP_DIR/bootstrap-two.sql"

psql_admin() {
  PGPASSWORD="$DB_PASSWORD" PGSSLMODE="$DB_SSLMODE" \
    psql -X -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres "$@"
}

psql_db() {
  local db_name="$1"
  shift
  PGPASSWORD="$DB_PASSWORD" PGSSLMODE="$DB_SSLMODE" \
    psql -X -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$db_name" "$@"
}

cleanup() {
  for db_name in "$CONTROL_DB" "$BOOTSTRAP_DB"; do
    case "$db_name" in
      "ichizen_p0_v130_${RUN_ID}_"[a-zA-Z0-9_]*)
        PGPASSWORD="$DB_PASSWORD" PGSSLMODE="$DB_SSLMODE" \
          dropdb --if-exists -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$db_name" >/dev/null 2>&1 || true
        ;;
    esac
  done
  case "$TEMP_DIR" in
    */ichizen-p0-atlas-v130.*) rm -rf -- "$TEMP_DIR" ;;
  esac
}
trap cleanup EXIT

url_encode() {
  local value="$1" output="" index char hex
  for ((index=0; index<${#value}; index++)); do
    char="${value:index:1}"
    case "$char" in
      [a-zA-Z0-9.~_-]) output+="$char" ;;
      *) printf -v hex '%%%02X' "'$char"; output+="$hex" ;;
    esac
  done
  printf '%s' "$output"
}

ENCODED_USER="$(url_encode "$DB_USER")"
ENCODED_PASSWORD="$(url_encode "$DB_PASSWORD")"
CONTROL_URL="postgres://${ENCODED_USER}:${ENCODED_PASSWORD}@${DB_HOST}:${DB_PORT}/${CONTROL_DB}?sslmode=${DB_SSLMODE}"
BOOTSTRAP_URL="postgres://${ENCODED_USER}:${ENCODED_PASSWORD}@${DB_HOST}:${DB_PORT}/${BOOTSTRAP_DB}?sslmode=${DB_SSLMODE}"

existing="$(psql_admin -Atqc "SELECT count(*) FROM pg_database WHERE datname IN ('$CONTROL_DB', '$BOOTSTRAP_DB')")"
test "$existing" = "0"

observed_server="$(psql_admin -Atqc "SELECT CASE WHEN inet_server_addr() <<= inet '127.0.0.0/8' OR inet_server_addr() = inet '::1' THEN 'loopback' ELSE 'non-loopback' END")"
test "$observed_server" = "loopback"

PGPASSWORD="$DB_PASSWORD" PGSSLMODE="$DB_SSLMODE" createdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$CONTROL_DB"
PGPASSWORD="$DB_PASSWORD" PGSSLMODE="$DB_SSLMODE" createdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$BOOTSTRAP_DB"

LEGACY_DOWN="20260509100000_expense_recognition_supplier_subscription_fks.down.sql"
LEGACY_UP="20260509100000_expense_recognition_supplier_subscription_fks.up.sql"
test "$(find "$MIGRATIONS_DIR" -maxdepth 1 -type f \( -name '*.up.sql' -o -name '*.down.sql' \) | wc -l | tr -d ' ')" = "2"
test "$(LANG=C LC_ALL=C shasum -a 256 "$MIGRATIONS_DIR/$LEGACY_DOWN" | awk '{print $1}')" = "934d30151de4d56aa991f8d44736549823fc7031801b917300676e6e7c50db7f"
test "$(LANG=C LC_ALL=C shasum -a 256 "$MIGRATIONS_DIR/$LEGACY_UP" | awk '{print $1}')" = "9f0416396941112b0c5dde8b72cd65bcb39dd2b8c05056dac4d8b64f2efc31ad"

mkdir -p "$FORWARD_DIR" "$SYNTHETIC_DIR"
find "$MIGRATIONS_DIR" -maxdepth 1 -type f -name '[0-9]*.sql' ! -name "$LEGACY_DOWN" -exec cp {} "$FORWARD_DIR/" \;
"$ATLAS_BIN" migrate hash --dir "file://$FORWARD_DIR"
"$ATLAS_BIN" migrate validate --dir "file://$FORWARD_DIR"

REPO_HEAD="$(find "$FORWARD_DIR" -maxdepth 1 -type f -name '[0-9]*.sql' -exec basename {} \; | sort | tail -1 | cut -d_ -f1)"
EXPECTED_FORWARD_COUNT="$(find "$FORWARD_DIR" -maxdepth 1 -type f -name '[0-9]*.sql' | wc -l | tr -d ' ')"

"$ATLAS_BIN" migrate validate --dir "file://$MIGRATIONS_DIR"
"$ATLAS_BIN" migrate apply --tx-mode none --dir "file://$FORWARD_DIR" --url "$CONTROL_URL"

control_count="$(psql_db "$CONTROL_DB" -Atqc 'SELECT count(*) FROM atlas_schema_revisions.atlas_schema_revisions')"
control_head="$(psql_db "$CONTROL_DB" -Atqc 'SELECT max(version) FROM atlas_schema_revisions.atlas_schema_revisions')"
test "$control_count" = "$EXPECTED_FORWARD_COUNT"
test "$control_head" = "$REPO_HEAD"

RESTRICT_KEY="49f2a51a2bd7fa7c2c83fcc507482008322fa6b08886025f5245a91ff7a6b167"
dump_schema() {
  local db_name="$1" output="$2"
  PGPASSWORD="$DB_PASSWORD" PGSSLMODE="$DB_SSLMODE" \
    pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$db_name" \
      --schema-only --no-owner --no-privileges --no-comments \
      --no-publications --no-security-labels --no-subscriptions \
      --exclude-schema=atlas_schema_revisions --restrict-key="$RESTRICT_KEY" \
      --file="$output"
}

dump_schema "$CONTROL_DB" "$BOOTSTRAP_ONE"
dump_schema "$CONTROL_DB" "$BOOTSTRAP_TWO"
cmp -s "$BOOTSTRAP_ONE" "$BOOTSTRAP_TWO"
if rg -n 'atlas_schema_revisions' "$BOOTSTRAP_ONE" >/dev/null; then
  echo "bootstrap_release_test: bootstrap contains Atlas tracker objects" >&2
  exit 1
fi

schema_fingerprint() {
  local db_name="$1"
  PGPASSWORD="$DB_PASSWORD" PGSSLMODE="$DB_SSLMODE" \
    pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$db_name" \
      --schema-only --no-owner --no-privileges --no-comments \
      --no-publications --no-security-labels --no-subscriptions \
      --exclude-schema=atlas_schema_revisions --restrict-key="$RESTRICT_KEY" |
    awk '!/^--/ && !/^\\(un)?restrict / && NF' |
    LANG=C LC_ALL=C shasum -a 256 |
    awk '{print $1}'
}

bootstrap_pre_tables="$(psql_db "$BOOTSTRAP_DB" -Atqc "SELECT count(*) FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog', 'information_schema')")"
test "$bootstrap_pre_tables" = "0"
psql_db "$BOOTSTRAP_DB" -v ON_ERROR_STOP=1 -f "$BOOTSTRAP_ONE" >/dev/null

CONTROL_FINGERPRINT="$(schema_fingerprint "$CONTROL_DB")"
BOOTSTRAP_FINGERPRINT="$(schema_fingerprint "$BOOTSTRAP_DB")"
test "$CONTROL_FINGERPRINT" = "$BOOTSTRAP_FINGERPRINT"

"$ATLAS_BIN" migrate set "$REPO_HEAD" --dir "file://$MIGRATIONS_DIR" --url "$BOOTSTRAP_URL" >/dev/null
bootstrap_count="$(psql_db "$BOOTSTRAP_DB" -Atqc 'SELECT count(*) FROM atlas_schema_revisions.atlas_schema_revisions')"
bootstrap_head="$(psql_db "$BOOTSTRAP_DB" -Atqc 'SELECT max(version) FROM atlas_schema_revisions.atlas_schema_revisions')"
test "$bootstrap_count" = "$EXPECTED_FORWARD_COUNT"
test "$bootstrap_head" = "$REPO_HEAD"

tracker_snapshot() {
  psql_db "$BOOTSTRAP_DB" -AtF '|' -c "SELECT version, hash, type, applied, total, COALESCE(error, ''), COALESCE(error_stmt, ''), COALESCE(partial_hashes::text, '') FROM atlas_schema_revisions.atlas_schema_revisions ORDER BY version" |
    LANG=C LC_ALL=C shasum -a 256 |
    awk '{print $1}'
}

TRACKER_FINGERPRINT="$(tracker_snapshot)"
"$ATLAS_BIN" migrate set "$REPO_HEAD" --dir "file://$MIGRATIONS_DIR" --url "$BOOTSTRAP_URL" >/dev/null
test "$(tracker_snapshot)" = "$TRACKER_FINGERPRINT"
test "$(schema_fingerprint "$BOOTSTRAP_DB")" = "$CONTROL_FINGERPRINT"

# Seed orchestration is schema-proof-first and transaction-safe. A missing
# runtime password must leave no partial identity graph or bundle receipt; the
# successful retry applies exactly once, and a later no-password retry is a
# verified no-op because the exact receipt/data graph already exists.
test -f "$COPYA_BUNDLE"
if (
  cd "$COPYA_DIR"
  GOCACHE="$TEMP_DIR/go-cache" \
    DATABASE_URL="$BOOTSTRAP_URL" \
    DB_INIT_ADMIN_PASSWORD= \
    go run ./cmd/copya-bundle \
      --manifest "$COPYA_BUNDLE" \
      --target p0/disposable \
      --schema-release postgres/2026.08.1 \
      --apply
) >/dev/null 2>&1; then
  echo "bootstrap_release_test: empty seed secret unexpectedly succeeded" >&2
  exit 1
fi
test "$(psql_db "$BOOTSTRAP_DB" -Atqc "SELECT count(*) FROM ichizen_deploy.data_bundle_receipts WHERE target_key='p0/disposable'")" = "0"
test "$(psql_db "$BOOTSTRAP_DB" -Atqc "SELECT count(*) FROM public.workspace WHERE id='workspace-gpagoda'")" = "0"
test "$(psql_db "$BOOTSTRAP_DB" -Atqc "SELECT count(*) FROM public.\"user\" WHERE id='superadmin-001'")" = "0"

(
  cd "$COPYA_DIR"
  GOCACHE="$TEMP_DIR/go-cache" \
    DATABASE_URL="$BOOTSTRAP_URL" \
    DB_INIT_ADMIN_PASSWORD='p0-disposable-only' \
    go run ./cmd/copya-bundle \
      --manifest "$COPYA_BUNDLE" \
      --target p0/disposable \
      --schema-release postgres/2026.08.1 \
      --apply
) >/dev/null

bundle_snapshot() {
  psql_db "$BOOTSTRAP_DB" -AtF '|' -c "
    SELECT 'workspace', count(*) FROM public.workspace WHERE id='workspace-gpagoda'
    UNION ALL SELECT 'user', count(*) FROM public.\"user\" WHERE id='superadmin-001'
    UNION ALL SELECT 'permissions', count(*) FROM public.permission WHERE workspace_id='workspace-gpagoda' AND user_id='superadmin-001'
    UNION ALL SELECT 'grants', count(*) FROM public.role_permission WHERE role_id='role-gpagoda-super-admin'
    UNION ALL SELECT 'receipt', count(*) FROM ichizen_deploy.data_bundle_receipts WHERE target_key='p0/disposable';" |
    LANG=C LC_ALL=C shasum -a 256 |
    awk '{print $1}'
}

BUNDLE_SNAPSHOT="$(bundle_snapshot)"
test "$(psql_db "$BOOTSTRAP_DB" -Atqc "SELECT count(*) FROM ichizen_deploy.data_bundle_receipts WHERE target_key='p0/disposable'")" = "1"
permission_count="$(psql_db "$BOOTSTRAP_DB" -Atqc "SELECT count(*) FROM public.permission WHERE workspace_id='workspace-gpagoda' AND user_id='superadmin-001' AND active")"
grant_count="$(psql_db "$BOOTSTRAP_DB" -Atqc "SELECT count(*) FROM public.role_permission WHERE role_id='role-gpagoda-super-admin' AND active")"
test "$permission_count" -gt 0
test "$grant_count" = "$permission_count"

(
  cd "$COPYA_DIR"
  GOCACHE="$TEMP_DIR/go-cache" \
    DATABASE_URL="$BOOTSTRAP_URL" \
    DB_INIT_ADMIN_PASSWORD= \
    go run ./cmd/copya-bundle \
      --manifest "$COPYA_BUNDLE" \
      --target p0/disposable \
      --schema-release postgres/2026.08.1 \
      --apply
) >/dev/null
test "$(bundle_snapshot)" = "$BUNDLE_SNAPSHOT"

find "$MIGRATIONS_DIR" -maxdepth 1 -type f -exec cp {} "$SYNTHETIC_DIR/" \;
SYNTHETIC_VERSION="$(date -u +%Y%m%d%H%M%S)"
if [ "$SYNTHETIC_VERSION" -le "$REPO_HEAD" ]; then
  SYNTHETIC_VERSION="$((REPO_HEAD + 1))"
fi
printf '%s\n' 'CREATE TABLE public.ichizen_p0_synthetic_next (id integer PRIMARY KEY, note text NOT NULL);' > "$SYNTHETIC_DIR/${SYNTHETIC_VERSION}_p0_synthetic_next.sql"
"$ATLAS_BIN" migrate hash --dir "file://$SYNTHETIC_DIR"
"$ATLAS_BIN" migrate validate --dir "file://$SYNTHETIC_DIR"
"$ATLAS_BIN" migrate apply 1 --dir "file://$SYNTHETIC_DIR" --url "$BOOTSTRAP_URL" >/dev/null
test "$(psql_db "$BOOTSTRAP_DB" -Atqc "SELECT to_regclass('public.ichizen_p0_synthetic_next') IS NOT NULL")" = "t"

BOOTSTRAP_SHA256="$(LANG=C LC_ALL=C shasum -a 256 "$BOOTSTRAP_ONE" | awk '{print $1}')"
ATLAS_SUM_SHA256="$(LANG=C LC_ALL=C shasum -a 256 "$MIGRATIONS_DIR/atlas.sum" | awk '{print $1}')"

if [ -n "${PROMOTE_BOOTSTRAP_PATH:-}" ]; then
  mkdir -p "$(dirname "$PROMOTE_BOOTSTRAP_PATH")"
  cp "$BOOTSTRAP_ONE" "$PROMOTE_BOOTSTRAP_PATH"
fi

if [ -n "${EXPECTED_BOOTSTRAP_PATH:-}" ]; then
  cmp -s "$BOOTSTRAP_ONE" "$EXPECTED_BOOTSTRAP_PATH"
fi

printf 'repo_head=%s\n' "$REPO_HEAD"
printf 'revision_count=%s\n' "$EXPECTED_FORWARD_COUNT"
printf 'atlas_sum_sha256=%s\n' "$ATLAS_SUM_SHA256"
printf 'bootstrap_sha256=%s\n' "$BOOTSTRAP_SHA256"
printf 'normalized_schema_fingerprint=%s\n' "$CONTROL_FINGERPRINT"
printf 'tracker_fingerprint=%s\n' "$TRACKER_FINGERPRINT"
printf 'copya_permission_count=%s\n' "$permission_count"
printf 'copya_retry_snapshot=%s\n' "$BUNDLE_SNAPSHOT"
printf 'bootstrap_release_test: PASS\n'
