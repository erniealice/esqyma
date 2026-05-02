#!/usr/bin/env bash
# Source this from any db-*.sh script. It loads the DB connection from
# apps/service-admin/.env for the chosen dialect and exports DB_URL +
# DB_DEV_URL for atlas.hcl.
#
# Dialect selection:
#   DIALECT=postgres    (default — wired today)
#   DIALECT=mysql       (scaffolded — needs MYSQL_* envs + a running server)
#   DIALECT=sqlserver   (scaffolded — needs SQLSERVER_* envs + a running server)
#
# Per-dialect env vars expected in apps/service-admin/.env:
#   POSTGRES_HOST, POSTGRES_PORT, POSTGRES_NAME, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_SSL_MODE
#   MYSQL_HOST, MYSQL_PORT, MYSQL_NAME, MYSQL_USER, MYSQL_PASSWORD
#   SQLSERVER_HOST, SQLSERVER_PORT, SQLSERVER_NAME, SQLSERVER_USER, SQLSERVER_PASSWORD
#
# Override DB_URL / DB_DEV_URL directly to point at any other instance.

set -euo pipefail

DIALECT="${DIALECT:-postgres}"
export DIALECT

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(dirname "$SCRIPT_DIR")"
REPO_ROOT="$(cd "$PACKAGE_DIR/../.." && pwd)"
ENV_FILE="$REPO_ROOT/apps/service-admin/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "atlas: cannot find env file at $ENV_FILE" >&2
  exit 2
fi

# Read a single key from the .env file without sourcing it (.env may contain
# arbitrary shell-unsafe values).
get_env() {
  local key="$1"
  local default="${2:-}"
  local val
  val=$(grep -E "^${key}=" "$ENV_FILE" | head -1 | cut -d= -f2- | tr -d '"' | tr -d "'")
  echo "${val:-$default}"
}

# url_encode handles passwords with !@# etc. without depending on jq/python.
url_encode() {
  local s="$1" out=""
  local i ch
  for (( i=0; i<${#s}; i++ )); do
    ch="${s:i:1}"
    case "$ch" in
      [a-zA-Z0-9.~_-]) out+="$ch" ;;
      *) printf -v hex '%%%02X' "'$ch"; out+="$hex" ;;
    esac
  done
  echo "$out"
}

require_envs() {
  local missing=()
  for key in "$@"; do
    if [ -z "$(get_env "$key")" ]; then
      missing+=("$key")
    fi
  done
  if [ ${#missing[@]} -gt 0 ]; then
    echo "atlas: dialect=$DIALECT requires these keys in $ENV_FILE: ${missing[*]}" >&2
    exit 2
  fi
}

case "$DIALECT" in
  postgres)
    PG_HOST=$(get_env POSTGRES_HOST 127.0.0.1)
    PG_PORT=$(get_env POSTGRES_PORT 5432)
    PG_NAME=$(get_env POSTGRES_NAME)
    PG_USER=$(get_env POSTGRES_USER)
    PG_PASS=$(get_env POSTGRES_PASSWORD)
    PG_SSL=$(get_env  POSTGRES_SSL_MODE disable)
    require_envs POSTGRES_NAME POSTGRES_USER

    DEV_DB_NAME="${ATLAS_DEV_DB:-atlas_dev}"
    PG_PASS_ENC=$(url_encode "$PG_PASS")

    export DB_URL="${DB_URL:-postgres://${PG_USER}:${PG_PASS_ENC}@${PG_HOST}:${PG_PORT}/${PG_NAME}?sslmode=${PG_SSL}}"
    export DB_DEV_URL="${DB_DEV_URL:-postgres://${PG_USER}:${PG_PASS_ENC}@${PG_HOST}:${PG_PORT}/${DEV_DB_NAME}?sslmode=${PG_SSL}}"

    # Auto-create the dedicated dev database on first use.
    EXISTS=$(PGPASSWORD="$PG_PASS" psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d postgres \
      -tAc "SELECT 1 FROM pg_database WHERE datname = '${DEV_DB_NAME}'" 2>/dev/null | tr -d '[:space:]')
    if [ "$EXISTS" != "1" ]; then
      echo "atlas: creating dev database ${DEV_DB_NAME}"
      PGPASSWORD="$PG_PASS" psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d postgres \
        -c "CREATE DATABASE \"${DEV_DB_NAME}\"" >/dev/null
    fi
    ;;

  mysql)
    require_envs MYSQL_HOST MYSQL_PORT MYSQL_NAME MYSQL_USER MYSQL_PASSWORD
    MY_HOST=$(get_env MYSQL_HOST 127.0.0.1)
    MY_PORT=$(get_env MYSQL_PORT 3306)
    MY_NAME=$(get_env MYSQL_NAME)
    MY_USER=$(get_env MYSQL_USER)
    MY_PASS=$(get_env MYSQL_PASSWORD)
    DEV_DB_NAME="${ATLAS_DEV_DB:-atlas_dev}"
    MY_PASS_ENC=$(url_encode "$MY_PASS")

    export DB_URL="${DB_URL:-mysql://${MY_USER}:${MY_PASS_ENC}@${MY_HOST}:${MY_PORT}/${MY_NAME}}"
    export DB_DEV_URL="${DB_DEV_URL:-mysql://${MY_USER}:${MY_PASS_ENC}@${MY_HOST}:${MY_PORT}/${DEV_DB_NAME}}"
    # Auto-create not implemented — bring the dev DB up manually:
    #   mysql -e "CREATE DATABASE IF NOT EXISTS atlas_dev;"
    ;;

  sqlserver)
    require_envs SQLSERVER_HOST SQLSERVER_PORT SQLSERVER_NAME SQLSERVER_USER SQLSERVER_PASSWORD
    SS_HOST=$(get_env SQLSERVER_HOST 127.0.0.1)
    SS_PORT=$(get_env SQLSERVER_PORT 1433)
    SS_NAME=$(get_env SQLSERVER_NAME)
    SS_USER=$(get_env SQLSERVER_USER)
    SS_PASS=$(get_env SQLSERVER_PASSWORD)
    DEV_DB_NAME="${ATLAS_DEV_DB:-atlas_dev}"
    SS_PASS_ENC=$(url_encode "$SS_PASS")

    export DB_URL="${DB_URL:-sqlserver://${SS_USER}:${SS_PASS_ENC}@${SS_HOST}:${SS_PORT}?database=${SS_NAME}}"
    export DB_DEV_URL="${DB_DEV_URL:-sqlserver://${SS_USER}:${SS_PASS_ENC}@${SS_HOST}:${SS_PORT}?database=${DEV_DB_NAME}}"
    # Auto-create not implemented — bring the dev DB up manually:
    #   sqlcmd -Q "CREATE DATABASE atlas_dev"
    ;;

  *)
    echo "atlas: unknown DIALECT=$DIALECT (supported: postgres, mysql, sqlserver)" >&2
    exit 2
    ;;
esac

cd "$PACKAGE_DIR"
