#!/usr/bin/env bash
# setup-fresh-db.sh — Create a fresh database with schema and seed data
# Usage: ./scripts/setup-fresh-db.sh [db_name] [business_type]
#   db_name:       Database name (default: ichizen_dev)
#   business_type: service|professional (default: service)
#
# Prerequisites:
#   - PostgreSQL running locally (psql available)
#   - copya binary built: cd packages/copya && go build -o copya ./cmd/copya
#   - Schema generated: cd packages/esqyma && python3 scripts/generate-full-schema.py

set -euo pipefail

DB_NAME="${1:-ichizen_dev}"
BIZ_TYPE="${2:-service}"
PG_USER="${PGUSER:-cradle}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ESQYMA_DIR="$(dirname "$SCRIPT_DIR")"
ROOT_DIR="$(dirname "$(dirname "$ESQYMA_DIR")")"
COPYA_DIR="$ROOT_DIR/packages/copya"
SCHEMA_FILE="$ESQYMA_DIR/migrations/postgres/00_full_schema.sql"

echo "=== Ichizen Fresh Database Setup ==="
echo "  Database:      $DB_NAME"
echo "  Business type: $BIZ_TYPE"
echo "  PG user:       $PG_USER"
echo ""

# Step 1: Generate schema if needed
if [ ! -f "$SCHEMA_FILE" ]; then
    echo "[1/4] Generating schema..."
    cd "$ESQYMA_DIR" && python3 scripts/generate-full-schema.py
else
    echo "[1/4] Schema file exists: $SCHEMA_FILE"
fi

# Step 2: Build copya if needed
COPYA_BIN="$COPYA_DIR/copya"
if [ ! -f "$COPYA_BIN" ]; then
    echo "[2/4] Building copya..."
    cd "$COPYA_DIR" && go build -o copya ./cmd/copya
else
    echo "[2/4] Copya binary exists: $COPYA_BIN"
fi

# Step 3: Create database (drop if exists)
echo "[3/4] Creating database $DB_NAME..."
psql -U "$PG_USER" -d postgres -c "DROP DATABASE IF EXISTS \"$DB_NAME\";" 2>/dev/null || true
psql -U "$PG_USER" -d postgres -c "CREATE DATABASE \"$DB_NAME\";"

# Step 4: Apply schema
echo "[3/4] Applying schema..."
psql -U "$PG_USER" -d "$DB_NAME" -f "$SCHEMA_FILE"

# Step 5: Seed data
echo "[4/4] Seeding $BIZ_TYPE data..."
"$COPYA_BIN" --business-type "$BIZ_TYPE" --dialect postgres | psql -U "$PG_USER" -d "$DB_NAME"

echo ""
echo "=== Done! ==="
echo "  Connect: psql -U $PG_USER -d $DB_NAME"
echo "  Tables:  psql -U $PG_USER -d $DB_NAME -c '\\dt'"
