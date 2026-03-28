#!/usr/bin/env python3
"""
generate-full-schema.py
-----------------------
Reads all .sql migration files in migrations/postgres/, merges table definitions,
adds 9 manually-defined missing tables, topologically sorts by FK dependencies,
then writes 00_full_schema.sql in three phases:
  Phase 1: CREATE TABLE IF NOT EXISTS (columns + PK, no FK)
  Phase 2: ALTER TABLE ADD CONSTRAINT (foreign keys)
  Phase 3: CREATE INDEX IF NOT EXISTS

Run from packages/esqyma/:
    python3 scripts/generate-full-schema.py
"""

import os
import re
import sys
from collections import defaultdict, OrderedDict

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PACKAGE_DIR = os.path.dirname(SCRIPT_DIR)
MIGRATIONS_DIR = os.path.join(PACKAGE_DIR, "migrations", "postgres")
OUTPUT_FILE = os.path.join(MIGRATIONS_DIR, "00_full_schema.sql")

# ---------------------------------------------------------------------------
# Helper: strip SQL comments from a line (not inside strings, but good enough)
# ---------------------------------------------------------------------------
def strip_line_comment(line):
    # Remove -- comments (not inside strings; good enough for DDL)
    idx = line.find("--")
    if idx >= 0:
        return line[:idx]
    return line


def normalize_table_name(name):
    """Remove surrounding quotes from a table name."""
    return name.strip().strip('"')


# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------
class TableDef:
    """Holds everything we know about one table."""

    def __init__(self, name):
        self.name = name                  # canonical name (no quotes, no schema)
        self.schema = "public"            # e.g. "audit_trail"
        self.full_name = name             # schema.name or just name
        self.columns = OrderedDict()      # col_name -> col_def_line (without trailing comma)
        self.pk_col = None                # if PK is inline in column def
        self.constraints = []             # non-FK constraint lines (PRIMARY KEY block, UNIQUE, etc.)
        self.fks = []                     # (constraint_name, col, ref_table, ref_col) tuples
        self.inline_fk_cols = set()       # cols whose definition contains REFERENCES (to be stripped)
        self.indexes = []                 # raw CREATE INDEX statements
        self.extra_options = ""           # e.g. PARTITION BY RANGE(...)
        self.source_files = []


# ---------------------------------------------------------------------------
# Regex patterns
# ---------------------------------------------------------------------------
RE_CREATE_TABLE = re.compile(
    r"""CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?
        (?:"?(\w+)"?\s*\.\s*)?"?(\w+)"?   # optional schema.table or just table
        \s*\(""",
    re.IGNORECASE | re.VERBOSE,
)

RE_FK_CONSTRAINT = re.compile(
    r"""CONSTRAINT\s+"?(\w+)"?\s+FOREIGN\s+KEY\s*\(\s*"?(\w+)"?\s*\)
        \s+REFERENCES\s+"?(\w+)"?\s*\(\s*"?(\w+)"?\s*\)""",
    re.IGNORECASE | re.VERBOSE,
)

RE_INLINE_REFERENCES = re.compile(
    r"\bREFERENCES\b.*$",
    re.IGNORECASE,
)

RE_CREATE_INDEX = re.compile(
    r"CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?:IF\s+NOT\s+EXISTS\s+)?.*",
    re.IGNORECASE,
)

RE_ALTER_TABLE_ADD_COL = re.compile(
    r"""ALTER\s+TABLE\s+"?(\w+)"?\s+ADD\s+COLUMN\s+(?:IF\s+NOT\s+EXISTS\s+)?
        "?(\w+)"?\s+(.+)""",
    re.IGNORECASE | re.VERBOSE,
)

RE_ALTER_TABLE_ADD_CONSTRAINT = re.compile(
    r"""ALTER\s+TABLE\s+"?(\w+)"?\s+ADD\s+CONSTRAINT\s+"?(\w+)"?\s+
        FOREIGN\s+KEY\s*\(\s*"?(\w+)"?\s*\)\s+REFERENCES\s+"?(\w+)"?\s*
        \(\s*"?(\w+)"?\s*\)""",
    re.IGNORECASE | re.VERBOSE,
)

RE_PARTITION_OF = re.compile(
    r"PARTITION\s+OF\s+",
    re.IGNORECASE,
)


# ---------------------------------------------------------------------------
# Parse SQL files
# ---------------------------------------------------------------------------

def read_file(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def get_sql_files():
    """Return list of .sql files: 0001_initial.sql first, then *.up.sql in order."""
    all_files = os.listdir(MIGRATIONS_DIR)
    result = []
    # legacy file first
    if "0001_initial.sql" in all_files:
        result.append(os.path.join(MIGRATIONS_DIR, "0001_initial.sql"))
    # then timestamped up migrations in sorted order
    up_files = sorted(f for f in all_files if f.endswith(".up.sql"))
    for f in up_files:
        result.append(os.path.join(MIGRATIONS_DIR, f))
    return result


def parse_create_table_block(sql, start_pos):
    """
    Given sql and the position just after the opening '(' of CREATE TABLE,
    extract the full body up to the matching ')'.
    Returns (body_text, end_pos).
    """
    depth = 1
    i = start_pos
    n = len(sql)
    while i < n and depth > 0:
        c = sql[i]
        if c == "(":
            depth += 1
        elif c == ")":
            depth -= 1
        i += 1
    return sql[start_pos:i - 1], i  # body without outer parens


def parse_column_or_constraint(line):
    """
    Classify a line inside a CREATE TABLE body.
    Returns ('column', col_name, col_def) or ('constraint', constraint_text) or None.
    """
    stripped = line.strip().rstrip(",").strip()
    if not stripped:
        return None
    upper = stripped.upper()
    if upper.startswith("CONSTRAINT") or upper.startswith("PRIMARY KEY") or upper.startswith("UNIQUE"):
        return ("constraint", stripped)
    # It's a column if it starts with a quoted or unquoted identifier
    m = re.match(r'^"?(\w+)"?\s+(.+)$', stripped, re.DOTALL)
    if m:
        col_name = m.group(1)
        col_def = stripped  # keep full line
        return ("column", col_name, col_def)
    return None


def extract_fk_from_constraint(constraint_text):
    """Try to extract FK info from a CONSTRAINT ... FOREIGN KEY line."""
    m = RE_FK_CONSTRAINT.search(constraint_text)
    if m:
        return (m.group(1), m.group(2), m.group(3), m.group(4))
    return None


def strip_inline_references(col_def):
    """Remove REFERENCES ... (and ON DELETE/UPDATE) from a column definition."""
    # Remove REFERENCES clause and anything after it on the same logical line
    cleaned = RE_INLINE_REFERENCES.sub("", col_def).strip().rstrip()
    return cleaned


def parse_sql_to_tables(sql, filename, tables):
    """
    Parse one SQL file and populate/merge into `tables` dict {table_key -> TableDef}.
    table_key = "schema.name" or just "name" for public schema.
    """
    basename = os.path.basename(filename)

    # Remove block comments /* ... */
    sql_clean = re.sub(r"/\*.*?\*/", " ", sql, flags=re.DOTALL)

    pos = 0
    n = len(sql_clean)

    while pos < n:
        # Find next CREATE TABLE
        m = RE_CREATE_TABLE.search(sql_clean, pos)
        if not m:
            break

        schema_name = m.group(1)  # may be None
        table_name_raw = m.group(2)

        # Skip PARTITION OF tables — they inherit from the parent
        # Look at text just after the closing paren match pos
        paren_start = m.end()  # position after '('
        block_body, block_end = parse_create_table_block(sql_clean, paren_start)

        # Check the text right after the closing ')' for PARTITION OF
        after_block = sql_clean[block_end:block_end + 200]
        if RE_PARTITION_OF.search(sql_clean[m.start():paren_start]):
            pos = block_end
            continue

        schema = schema_name if schema_name else "public"
        table_name = table_name_raw
        if schema == "public":
            table_key = table_name
        else:
            table_key = f"{schema}.{table_name}"

        # Get or create TableDef
        if table_key not in tables:
            td = TableDef(table_name)
            td.schema = schema
            td.full_name = table_key
            tables[table_key] = td
        else:
            td = tables[table_key]

        td.source_files.append(basename)

        # Parse body lines
        # Split by comma at depth 0
        lines = split_body_lines(block_body)

        for raw_line in lines:
            line = raw_line.strip().rstrip(",").strip()
            if not line:
                continue
            upper = line.upper()

            # Skip PARTITION OF inside body (shouldn't appear here, but guard)
            if RE_PARTITION_OF.search(upper):
                continue

            if upper.startswith("CONSTRAINT"):
                fk = extract_fk_from_constraint(line)
                if fk:
                    # constraint_name, col, ref_table, ref_col
                    # Only add if not already present (same constraint name)
                    existing_names = {f[0] for f in td.fks}
                    if fk[0] not in existing_names:
                        td.fks.append(fk)
                else:
                    # Non-FK constraint (UNIQUE, CHECK, etc.) — keep it but we
                    # won't emit it as an ALTER TABLE; emit it inline in the table
                    # (stripped of FK), or skip FK ones.
                    # We only add non-FK constraints to td.constraints
                    if "FOREIGN KEY" not in upper:
                        if line not in td.constraints:
                            td.constraints.append(line)
            elif upper.startswith("PRIMARY KEY"):
                if line not in td.constraints:
                    td.constraints.append(line)
            elif upper.startswith("UNIQUE"):
                if line not in td.constraints:
                    td.constraints.append(line)
            else:
                # Column definition
                col_m = re.match(r'^"?(\w+)"?\s+(.+)$', line, re.DOTALL)
                if col_m:
                    col_name = col_m.group(1)
                    col_def_full = line

                    # Check if this column def has an inline REFERENCES
                    has_inline_ref = bool(re.search(r"\bREFERENCES\b", col_def_full, re.IGNORECASE))
                    if has_inline_ref:
                        # Extract the FK
                        ref_m = re.search(
                            r"\bREFERENCES\s+(\w+)\s*\(\s*(\w+)\s*\)",
                            col_def_full,
                            re.IGNORECASE,
                        )
                        if ref_m:
                            ref_table = ref_m.group(1)
                            ref_col = ref_m.group(2)
                            fk_name = f"fk_{table_name}_{col_name}"
                            existing_names = {f[0] for f in td.fks}
                            if fk_name not in existing_names:
                                td.fks.append((fk_name, col_name, ref_table, ref_col))
                        # Strip the REFERENCES clause and ON DELETE/UPDATE from column def
                        col_def_full = strip_inline_references(col_def_full)

                    # Also strip GENERATED ALWAYS AS (for computed columns — keep column, drop expression)
                    # For now keep GENERATED columns as-is since they're valid DDL
                    # Only add column if not already defined (first wins from 20240101 file)
                    if col_name not in td.columns:
                        td.columns[col_name] = col_def_full

        # Now scan for indexes after this table definition (until next CREATE TABLE or EOF)
        remaining = sql_clean[block_end:]
        # Find next CREATE TABLE or end
        next_create = RE_CREATE_TABLE.search(remaining)
        if next_create:
            scan_region = remaining[:next_create.start()]
        else:
            scan_region = remaining

        for idx_m in re.finditer(
            r"CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?:IF\s+NOT\s+EXISTS\s+)?.*?;",
            scan_region,
            re.IGNORECASE | re.DOTALL,
        ):
            idx_stmt = idx_m.group(0).strip()
            # Normalize to IF NOT EXISTS
            idx_stmt = normalize_index(idx_stmt)
            if idx_stmt not in td.indexes:
                td.indexes.append(idx_stmt)

        pos = block_end

    # Parse ALTER TABLE ADD COLUMN statements
    for m in RE_ALTER_TABLE_ADD_COL.finditer(sql_clean):
        tbl = m.group(1)
        col = m.group(2)
        col_type_rest = m.group(3).strip().rstrip(";").strip()
        # col_type_rest may end with ";" — strip it
        if tbl in tables:
            td = tables[tbl]
            if col not in td.columns:
                col_def = f'"{col}" {col_type_rest}'
                td.columns[col] = col_def

    # Parse standalone ALTER TABLE ADD CONSTRAINT FK
    for m in RE_ALTER_TABLE_ADD_CONSTRAINT.finditer(sql_clean):
        tbl = m.group(1)
        constraint_name = m.group(2)
        col = m.group(3)
        ref_table = m.group(4)
        ref_col = m.group(5)
        if tbl in tables:
            td = tables[tbl]
            existing_names = {f[0] for f in td.fks}
            if constraint_name not in existing_names:
                td.fks.append((constraint_name, col, ref_table, ref_col))

    # Collect standalone CREATE INDEX statements (not immediately after a CREATE TABLE)
    # These are already handled per-table above; also handle the case where an index
    # references a table by scanning all indexes and matching them.
    # Additional pass: pick up indexes that appear at top-level (e.g. in alter migration files)
    for idx_m in re.finditer(
        r"CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?:IF\s+NOT\s+EXISTS\s+)?"
        r'"?(?:\w+)"?\s+ON\s+"?(\w+)"?\s*\(',
        sql_clean,
        re.IGNORECASE,
    ):
        tbl = idx_m.group(1)
        # Find the full statement
        stmt_start = idx_m.start()
        semi = sql_clean.find(";", stmt_start)
        if semi >= 0:
            stmt = sql_clean[stmt_start:semi + 1].strip()
            stmt = normalize_index(stmt)
            if tbl in tables:
                if stmt not in tables[tbl].indexes:
                    tables[tbl].indexes.append(stmt)


def normalize_index(stmt):
    """Ensure CREATE INDEX uses IF NOT EXISTS."""
    stmt = re.sub(
        r"CREATE\s+(UNIQUE\s+)?INDEX\s+(?!IF\s+NOT\s+EXISTS)",
        lambda m: f"CREATE {m.group(1) or ''}INDEX IF NOT EXISTS ",
        stmt,
        flags=re.IGNORECASE,
    )
    # Collapse multiple spaces
    stmt = re.sub(r"  +", " ", stmt)
    return stmt.strip()


def split_body_lines(body):
    """
    Split a CREATE TABLE body (between outer parens) by commas at depth 0.
    Returns list of trimmed strings.
    """
    lines = []
    depth = 0
    current = []
    for ch in body:
        if ch in ("(", "["):
            depth += 1
            current.append(ch)
        elif ch in (")", "]"):
            depth -= 1
            current.append(ch)
        elif ch == "," and depth == 0:
            lines.append("".join(current).strip())
            current = []
        else:
            current.append(ch)
    last = "".join(current).strip()
    if last:
        lines.append(last)
    return lines


# ---------------------------------------------------------------------------
# Topological sort
# ---------------------------------------------------------------------------

def topological_sort(tables):
    """
    Sort table keys so that a table appears before any table that FK-references it.
    Tables that reference unknown tables still get included (just treated as no dep).
    Circular deps are broken arbitrarily.
    Returns ordered list of table keys.
    """
    # Build adjacency: table -> set of tables it depends on
    deps = {k: set() for k in tables}
    for key, td in tables.items():
        for (_, _, ref_table, _) in td.fks:
            ref_key = ref_table  # assume public schema for now
            if ref_key in tables and ref_key != key:
                deps[key].add(ref_key)

    order = []
    visited = set()
    temp = set()

    def visit(k):
        if k in temp:
            # Circular dep — just skip to break the cycle
            return
        if k in visited:
            return
        temp.add(k)
        for dep in deps.get(k, set()):
            visit(dep)
        temp.discard(k)
        visited.add(k)
        order.append(k)

    for k in sorted(tables.keys()):
        visit(k)

    return order


# ---------------------------------------------------------------------------
# Missing table definitions (hardcoded)
# ---------------------------------------------------------------------------

MISSING_TABLES_SQL = """
-- inventory_item (from proto: InventoryItem)
CREATE TABLE IF NOT EXISTS "inventory_item" (
  "id" TEXT PRIMARY KEY,
  "date_created" TIMESTAMPTZ DEFAULT NOW(),
  "date_modified" TIMESTAMPTZ DEFAULT NOW(),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "product_id" TEXT,
  "location_id" TEXT,
  "sku" TEXT,
  "quantity_on_hand" NUMERIC(15,2) NOT NULL DEFAULT 0,
  "quantity_reserved" NUMERIC(15,2) NOT NULL DEFAULT 0,
  "quantity_available" NUMERIC(15,2) NOT NULL DEFAULT 0,
  "reorder_level" NUMERIC(15,2) DEFAULT 0,
  "unit_of_measure" TEXT NOT NULL DEFAULT 'unit',
  "notes" TEXT,
  "product_variant_id" TEXT
);

-- revenue (from proto: Revenue)
CREATE TABLE IF NOT EXISTS "revenue" (
  "id" TEXT PRIMARY KEY,
  "date_created" TIMESTAMPTZ DEFAULT NOW(),
  "date_modified" TIMESTAMPTZ DEFAULT NOW(),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "client_id" TEXT,
  "revenue_date" TIMESTAMPTZ,
  "total_amount" NUMERIC(15,2) NOT NULL DEFAULT 0,
  "currency" TEXT NOT NULL DEFAULT 'PHP',
  "status" TEXT NOT NULL DEFAULT 'draft',
  "reference_number" TEXT,
  "notes" TEXT,
  "revenue_category_id" TEXT,
  "location_id" TEXT,
  "checkout_session_id" TEXT,
  "payment_provider" TEXT,
  "fulfillment_type" TEXT,
  "delivery_address" TEXT,
  "revenue_account_id" TEXT,
  "journal_entry_id" TEXT,
  "fulfillment_status" TEXT
);

-- revenue_line_item (from proto: RevenueLineItem)
CREATE TABLE IF NOT EXISTS "revenue_line_item" (
  "id" TEXT PRIMARY KEY,
  "date_created" TIMESTAMPTZ DEFAULT NOW(),
  "date_modified" TIMESTAMPTZ DEFAULT NOW(),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "revenue_id" TEXT NOT NULL,
  "product_id" TEXT,
  "description" TEXT,
  "quantity" NUMERIC(15,2) NOT NULL DEFAULT 1,
  "unit_price" NUMERIC(15,2) NOT NULL DEFAULT 0,
  "total_price" NUMERIC(15,2) NOT NULL DEFAULT 0,
  "notes" TEXT,
  "line_item_type" TEXT DEFAULT 'item',
  "inventory_item_id" TEXT,
  "inventory_serial_id" TEXT,
  "price_list_id" TEXT,
  "variant_id" TEXT,
  "variant_label" TEXT,
  "location_id" TEXT,
  "cost_price" NUMERIC(15,2)
);

-- revenue_payment
CREATE TABLE IF NOT EXISTS "revenue_payment" (
  "id" TEXT PRIMARY KEY,
  "date_created" TIMESTAMPTZ DEFAULT NOW(),
  "date_modified" TIMESTAMPTZ DEFAULT NOW(),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "revenue_id" TEXT NOT NULL,
  "collection_method_id" TEXT,
  "amount" NUMERIC(15,2) NOT NULL DEFAULT 0,
  "currency" TEXT NOT NULL DEFAULT 'PHP',
  "reference_number" TEXT,
  "collection_type" TEXT DEFAULT 'sale',
  "status" TEXT DEFAULT 'completed'
);

-- expenditure (from proto: Expenditure)
CREATE TABLE IF NOT EXISTS "expenditure" (
  "id" TEXT PRIMARY KEY,
  "date_created" TIMESTAMPTZ DEFAULT NOW(),
  "date_modified" TIMESTAMPTZ DEFAULT NOW(),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "name" TEXT NOT NULL,
  "expenditure_type" TEXT NOT NULL DEFAULT 'expense',
  "vendor_id" TEXT,
  "expenditure_date" TIMESTAMPTZ,
  "total_amount" NUMERIC(15,2) NOT NULL DEFAULT 0,
  "currency" TEXT NOT NULL DEFAULT 'PHP',
  "status" TEXT NOT NULL DEFAULT 'draft',
  "reference_number" TEXT,
  "notes" TEXT,
  "expenditure_category_id" TEXT,
  "location_id" TEXT,
  "payment_terms" TEXT,
  "due_date" TIMESTAMPTZ,
  "approved_by" TEXT
);

-- expenditure_line_item (from proto: ExpenditureLineItem)
CREATE TABLE IF NOT EXISTS "expenditure_line_item" (
  "id" TEXT PRIMARY KEY,
  "date_created" TIMESTAMPTZ DEFAULT NOW(),
  "date_modified" TIMESTAMPTZ DEFAULT NOW(),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "expenditure_id" TEXT NOT NULL,
  "product_id" TEXT,
  "description" TEXT,
  "quantity" NUMERIC(15,2) NOT NULL DEFAULT 1,
  "unit_price" NUMERIC(15,2) NOT NULL DEFAULT 0,
  "line_amount" NUMERIC(15,2) NOT NULL DEFAULT 0,
  "notes" TEXT
);

-- expenditure_category
CREATE TABLE IF NOT EXISTS "expenditure_category" (
  "id" TEXT PRIMARY KEY,
  "date_created" TIMESTAMPTZ DEFAULT NOW(),
  "date_modified" TIMESTAMPTZ DEFAULT NOW(),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "code" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT
);

-- revenue_category
CREATE TABLE IF NOT EXISTS "revenue_category" (
  "id" TEXT PRIMARY KEY,
  "date_created" TIMESTAMPTZ DEFAULT NOW(),
  "date_modified" TIMESTAMPTZ DEFAULT NOW(),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "code" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT
);

-- inventory_attribute (junction table)
CREATE TABLE IF NOT EXISTS "inventory_attribute" (
  "id" TEXT PRIMARY KEY,
  "date_created" TIMESTAMPTZ DEFAULT NOW(),
  "date_modified" TIMESTAMPTZ DEFAULT NOW(),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "inventory_item_id" TEXT NOT NULL,
  "attribute_id" TEXT NOT NULL,
  "value" TEXT
);
"""


def parse_missing_tables(sql):
    """Parse the hardcoded missing table SQL into TableDef objects."""
    tables = {}
    parse_sql_to_tables(sql, "<missing_tables>", tables)
    return tables


# ---------------------------------------------------------------------------
# Schema mismatch fixes
# ---------------------------------------------------------------------------

# Column name patterns that should be TIMESTAMPTZ, not BIGINT
DATE_COL_PATTERNS = [
    # Exact names
    "date_created",
    "date_modified",
    "start_date",
    "end_date",
    "due_date",
    "purchase_date",
    "disposal_date",
    "revaluation_date",
    "effective_date",
    "valuation_date",
    "approval_date",
    "period_start",
    "period_end",
    "scheduled_date",
    "last_health_check",
]

# Suffixes — any column ending with one of these
DATE_COL_SUFFIXES = ("_date", "_at")


def is_date_column(col_name):
    """Return True if the column name looks like a date/timestamp column."""
    lower = col_name.lower()
    if lower in DATE_COL_PATTERNS:
        return True
    for suffix in DATE_COL_SUFFIXES:
        if lower.endswith(suffix):
            return True
    return False


def fix_bigint_date_col(col_name, col_def):
    """
    If col_def uses BIGINT (or BIGINT NULL / BIGINT NOT NULL) and the column
    is a date column, replace the BIGINT type with TIMESTAMPTZ.
    Returns the (possibly updated) col_def string.
    """
    upper_def = col_def.upper()
    if "BIGINT" not in upper_def:
        return col_def
    if not is_date_column(col_name):
        return col_def

    # Replace BIGINT type with TIMESTAMPTZ DEFAULT NOW() for created/modified,
    # or plain TIMESTAMPTZ for other date columns.
    lower_name = col_name.lower()
    if lower_name in ("date_created", "date_modified"):
        replacement = "TIMESTAMPTZ DEFAULT NOW()"
    else:
        replacement = "TIMESTAMPTZ"

    # Replace BIGINT (optionally followed by NULL / NOT NULL)
    new_def = re.sub(
        r'\bBIGINT\b(\s+(?:NOT\s+)?NULL)?',
        replacement,
        col_def,
        flags=re.IGNORECASE,
    )
    return new_def


# Columns to add to specific tables (table_name -> list of (col_name, col_def))
EXTRA_COLUMNS = {
    "client": [
        ("first_name", '"first_name" TEXT'),
        ("last_name", '"last_name" TEXT'),
        ("email", '"email" TEXT'),
    ],
    "supplier": [
        ("currency", '"currency" TEXT DEFAULT \'PHP\''),
    ],
    "asset_category": [
        ("depreciation_method", '"depreciation_method" TEXT'),
        # CSV uses shorter alias column names
        ("useful_life_months", '"useful_life_months" INTEGER'),
        ("salvage_pct", '"salvage_pct" NUMERIC(15,2)'),
    ],
    "revenue_line_item": [
        ("line_amount", '"line_amount" NUMERIC(15,2) NOT NULL DEFAULT 0'),
    ],
    # Proto defines *_string companion fields for date columns (used by Go app queries)
    "revenue": [
        ("revenue_date_string", '"revenue_date_string" TEXT'),
        ("date_created_string", '"date_created_string" TEXT'),
        ("date_modified_string", '"date_modified_string" TEXT'),
    ],
    "expenditure": [
        ("expenditure_date_string", '"expenditure_date_string" TEXT'),
        ("date_created_string", '"date_created_string" TEXT'),
        ("date_modified_string", '"date_modified_string" TEXT'),
    ],
}

# Column definitions to replace in specific tables (table_name -> {col_name -> new_def})
COLUMN_OVERRIDES = {
    "user": {
        # Client/supplier users are seeded without a password — make nullable
        "password_hash": '"password_hash" TEXT',
    },
    "product": {
        "item_type": '"item_type" TEXT NOT NULL DEFAULT \'standard\'',
        "fulfillment_method": '"fulfillment_method" TEXT NOT NULL DEFAULT \'standard\'',
    },
    "job_task": {
        "is_ad_hoc": '"is_ad_hoc" BOOLEAN NOT NULL DEFAULT false',
    },
    "fulfillment": {
        "provider_status": '"provider_status" TEXT NOT NULL DEFAULT \'\'',
        "provider_reference": '"provider_reference" TEXT NOT NULL DEFAULT \'\'',
        "notes": '"notes" TEXT NOT NULL DEFAULT \'\'',
        "delivery_cost": '"delivery_cost" DOUBLE PRECISION NOT NULL DEFAULT 0',
    },
    "permission": {
        "name": '"name" TEXT NOT NULL DEFAULT \'\'',
        "description": '"description" TEXT NOT NULL DEFAULT \'\'',
    },
    "job": {
        "name": '"name" TEXT NOT NULL DEFAULT \'\'',
        "approval_status": '"approval_status" TEXT NOT NULL DEFAULT \'\'',
        "posting_status": '"posting_status" TEXT NOT NULL DEFAULT \'\'',
        "billing_status": '"billing_status" TEXT NOT NULL DEFAULT \'\'',
        # CSVs insert NULL for these — make nullable
        "cost_flow_type": '"cost_flow_type" TEXT',
        "billing_rule_type": '"billing_rule_type" TEXT',
    },
    "account_group": {
        "element": '"element" TEXT NOT NULL DEFAULT \'\'',
        "classification": '"classification" TEXT NOT NULL DEFAULT \'\'',
    },
    "fiscal_period": {
        "period_number": '"period_number" INTEGER NOT NULL DEFAULT 0',
        "fiscal_year": '"fiscal_year" INTEGER NOT NULL DEFAULT 0',
    },
    "asset": {
        "book_value": '"book_value" DOUBLE PRECISION NOT NULL DEFAULT 0',
        "accumulated_depreciation": '"accumulated_depreciation" DOUBLE PRECISION NOT NULL DEFAULT 0',
        "measurement_model": '"measurement_model" TEXT NOT NULL DEFAULT \'COST\'',
    },
    "asset_category": {
        # The default_* columns are NOT NULL but CSVs don't provide them — add defaults
        "default_depreciation_method": '"default_depreciation_method" TEXT NOT NULL DEFAULT \'STRAIGHT_LINE\'',
        "default_useful_life_months": '"default_useful_life_months" INTEGER NOT NULL DEFAULT 0',
        "default_salvage_value_percent": '"default_salvage_value_percent" DOUBLE PRECISION NOT NULL DEFAULT 0',
    },
    "asset_maintenance": {
        "is_capitalized": '"is_capitalized" BOOLEAN NOT NULL DEFAULT false',
    },
    "supplier": {
        # CSV doesn't include user_id for suppliers — make nullable
        "user_id": '"user_id" TEXT',
    },
}


def fix_schema_mismatches(tables):
    """
    Post-processing pass that:
    1. Converts BIGINT date columns to TIMESTAMPTZ.
    2. Adds missing columns required by seed CSVs.
    3. Applies column definition overrides (defaults for NOT NULL columns).
    """
    fixed_bigint = 0
    added_cols = 0
    overridden_cols = 0

    for table_key, td in tables.items():
        # 1. Fix BIGINT date columns
        for col_name in list(td.columns.keys()):
            old_def = td.columns[col_name]
            new_def = fix_bigint_date_col(col_name, old_def)
            if new_def != old_def:
                td.columns[col_name] = new_def
                fixed_bigint += 1

        # 2. Add extra columns for specific tables (use bare table name as key)
        table_name = td.name
        if table_name in EXTRA_COLUMNS:
            for col_name, col_def in EXTRA_COLUMNS[table_name]:
                if col_name not in td.columns:
                    td.columns[col_name] = col_def
                    added_cols += 1

        # 3. Apply column overrides
        if table_name in COLUMN_OVERRIDES:
            for col_name, new_def in COLUMN_OVERRIDES[table_name].items():
                if col_name in td.columns:
                    td.columns[col_name] = new_def
                    overridden_cols += 1

    # 4. Replace supplier_category with a standalone category definition.
    #    The original 0001_initial.sql defined it as a junction table (supplier_id + category_id),
    #    but the seed CSVs treat it as a lookup/category entity (id, code, name, description).
    if "supplier_category" in tables:
        td = tables["supplier_category"]
        td.columns = OrderedDict([
            ("id",            '"id" TEXT PRIMARY KEY'),
            ("date_created",  '"date_created" TIMESTAMPTZ DEFAULT NOW()'),
            ("date_modified", '"date_modified" TIMESTAMPTZ DEFAULT NOW()'),
            ("active",        '"active" BOOLEAN NOT NULL DEFAULT true'),
            ("code",          '"code" TEXT NOT NULL DEFAULT \'\''),
            ("name",          '"name" TEXT NOT NULL DEFAULT \'\''),
            ("description",   '"description" TEXT'),
        ])
        # Remove junction FKs — this is now a standalone table
        td.fks = []
        td.constraints = []
        print("  Replaced supplier_category: junction → standalone category entity")

    print(f"  fix_schema_mismatches: {fixed_bigint} BIGINT→TIMESTAMPTZ, "
          f"{added_cols} columns added, {overridden_cols} column overrides applied")


# ---------------------------------------------------------------------------
# Audit trail tables (special handling)
# ---------------------------------------------------------------------------

AUDIT_TRAIL_TABLES_SQL = """
CREATE SCHEMA IF NOT EXISTS audit_trail;

CREATE TABLE IF NOT EXISTS audit_trail.audit_entry (
    id               UUID        NOT NULL DEFAULT gen_random_uuid(),
    workspace_id     UUID        NOT NULL,
    actor_id         TEXT        NOT NULL,
    actor_type       SMALLINT    NOT NULL,
    actor_ip         INET,
    actor_user_agent TEXT,
    entity_type      TEXT        NOT NULL,
    entity_id        TEXT        NOT NULL,
    domain           TEXT        NOT NULL,
    action           SMALLINT    NOT NULL,
    permission_code  TEXT,
    use_case         TEXT,
    reason           TEXT,
    method_name      TEXT        NOT NULL,
    request_id       TEXT,
    transaction_id   BIGINT,
    field_count      SMALLINT    NOT NULL DEFAULT 0,
    occurred_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (occurred_at, id)
) PARTITION BY RANGE (occurred_at);

CREATE TABLE IF NOT EXISTS audit_trail.audit_field_change (
    id              UUID        NOT NULL DEFAULT gen_random_uuid(),
    audit_entry_id  UUID        NOT NULL,
    field_name      TEXT        NOT NULL,
    field_type      SMALLINT    NOT NULL,
    old_value       TEXT,
    new_value       TEXT
);
"""

AUDIT_TRAIL_PARTITIONS = """
-- Monthly partitions for audit_entry
CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_2026_03
    PARTITION OF audit_trail.audit_entry
    FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');
CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_2026_04
    PARTITION OF audit_trail.audit_entry
    FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');
CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_2026_05
    PARTITION OF audit_trail.audit_entry
    FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');
"""

AUDIT_TRAIL_INDEXES = """
CREATE INDEX IF NOT EXISTS idx_entry_entity   ON audit_trail.audit_entry (entity_type, entity_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_entry_actor    ON audit_trail.audit_entry (actor_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_entry_permcode ON audit_trail.audit_entry (permission_code, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_entry_usecase  ON audit_trail.audit_entry (use_case, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_entry_ws       ON audit_trail.audit_entry (workspace_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_entry_txid     ON audit_trail.audit_entry (transaction_id);
CREATE INDEX IF NOT EXISTS idx_field_entry    ON audit_trail.audit_field_change (audit_entry_id);
CREATE INDEX IF NOT EXISTS idx_field_name     ON audit_trail.audit_field_change (field_name, new_value);
"""

AUDIT_TRAIL_GRANTS = """
-- App role grants (fail-safe for dev where app_role may not exist)
DO $$
BEGIN
    GRANT USAGE ON SCHEMA audit_trail TO app_role;
    GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA audit_trail TO app_role;
    GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA audit_trail TO app_role;
    ALTER DEFAULT PRIVILEGES IN SCHEMA audit_trail
        GRANT SELECT, INSERT ON TABLES TO app_role;
EXCEPTION WHEN undefined_object THEN
    RAISE NOTICE 'app_role does not exist — skipping grants (dev environment)';
END $$;
"""


# ---------------------------------------------------------------------------
# Render a TableDef to CREATE TABLE IF NOT EXISTS SQL (Phase 1 — no FK)
# ---------------------------------------------------------------------------

def render_create_table(td):
    """Render CREATE TABLE IF NOT EXISTS without FK constraints."""
    lines = []
    schema_prefix = f'"{td.schema}".' if td.schema != "public" else ""
    lines.append(f'CREATE TABLE IF NOT EXISTS {schema_prefix}"{td.name}" (')

    col_lines = []
    for col_name, col_def in td.columns.items():
        # Ensure column def is properly formatted
        # col_def already contains the column name
        col_lines.append(f"  {col_def}")

    # Add non-FK constraints (PRIMARY KEY block, UNIQUE)
    for c in td.constraints:
        upper_c = c.upper()
        if "FOREIGN KEY" not in upper_c:
            col_lines.append(f"  {c}")

    # Join with commas
    body = ",\n".join(col_lines)
    lines.append(body)

    # Handle PARTITION BY
    if td.extra_options:
        lines.append(f")\n{td.extra_options};")
    else:
        lines.append(");")

    return "\n".join(lines)


def render_fk_alters(td):
    """Render ALTER TABLE ADD CONSTRAINT for each FK."""
    stmts = []
    schema_prefix = f'"{td.schema}".' if td.schema != "public" else ""
    for (constraint_name, col, ref_table, ref_col) in td.fks:
        stmts.append(
            f'ALTER TABLE {schema_prefix}"{td.name}" '
            f'ADD CONSTRAINT IF NOT EXISTS "{constraint_name}" '
            f'FOREIGN KEY ("{col}") REFERENCES "{ref_table}" ("{ref_col}");'
        )
    return stmts


# ---------------------------------------------------------------------------
# Inventory_serial table is referenced in 0001 but defined elsewhere;
# we need to ensure it's in the tables dict.
# ---------------------------------------------------------------------------

INVENTORY_SERIAL_SQL = """
CREATE TABLE IF NOT EXISTS "inventory_serial" (
  "id" TEXT PRIMARY KEY,
  "date_created" TIMESTAMPTZ DEFAULT NOW(),
  "date_modified" TIMESTAMPTZ DEFAULT NOW(),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "inventory_item_id" TEXT NOT NULL,
  "serial_number" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'available',
  "notes" TEXT,
  "location_id" TEXT
);
"""


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    tables = {}  # key -> TableDef

    # 1. Parse all SQL files
    sql_files = get_sql_files()
    for fpath in sql_files:
        sql = read_file(fpath)
        # Skip down migrations (shouldn't be in glob but guard)
        if fpath.endswith(".down.sql"):
            continue
        print(f"  Parsing: {os.path.basename(fpath)}")
        parse_sql_to_tables(sql, fpath, tables)

    # 2. Inject missing tables (only if not already parsed)
    missing = parse_missing_tables(MISSING_TABLES_SQL)
    for key, td in missing.items():
        if key not in tables:
            tables[key] = td
            print(f"  Injecting missing table: {key}")
        else:
            # Merge columns from missing definition into existing
            existing = tables[key]
            added = 0
            for col_name, col_def in td.columns.items():
                if col_name not in existing.columns:
                    existing.columns[col_name] = col_def
                    added += 1
            if added:
                print(f"  Merged {added} missing columns into existing table: {key}")

    # 3. Inject inventory_serial if missing
    if "inventory_serial" not in tables:
        inv_serial = parse_missing_tables(INVENTORY_SERIAL_SQL)
        for key, td in inv_serial.items():
            tables[key] = td
            print(f"  Injecting: {key}")

    # 3b. Fix schema mismatches (BIGINT dates, missing columns, NOT NULL defaults)
    fix_schema_mismatches(tables)

    # 4. Separate audit_trail schema tables from public tables
    public_tables = {k: v for k, v in tables.items() if "." not in k}
    # (Audit trail tables are handled specially as raw SQL)

    # 5. Topological sort of public tables
    sorted_keys = topological_sort(public_tables)

    # 6. Collect stats
    total_tables = len(sorted_keys)
    total_fks = sum(len(td.fks) for td in public_tables.values())
    total_indexes = sum(len(td.indexes) for td in public_tables.values())

    # 7. Write output
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        # Header
        f.write("-- =============================================================================\n")
        f.write("-- 00_full_schema.sql\n")
        f.write("-- AUTO-GENERATED — do not edit by hand.\n")
        f.write("-- Generated by: scripts/generate-full-schema.py\n")
        f.write("-- Date: 2026-03-28\n")
        f.write("--\n")
        f.write(f"-- Tables: {total_tables}  |  FK constraints: {total_fks}  |  Indexes: {total_indexes}\n")
        f.write("--\n")
        f.write("-- STRUCTURE:\n")
        f.write("--   Phase 1: CREATE TABLE IF NOT EXISTS (columns + PK, no FK)\n")
        f.write("--   Phase 2: ALTER TABLE ADD CONSTRAINT (foreign keys)\n")
        f.write("--   Phase 3: CREATE INDEX IF NOT EXISTS\n")
        f.write("--   Appendix: audit_trail schema\n")
        f.write("-- =============================================================================\n\n")

        # -----------------------------------------------------------------------
        # Phase 1: CREATE TABLE
        # -----------------------------------------------------------------------
        f.write("-- =============================================================================\n")
        f.write("-- PHASE 1: CREATE TABLES (topologically sorted, no FK constraints)\n")
        f.write("-- =============================================================================\n\n")

        for key in sorted_keys:
            td = public_tables[key]
            f.write(f"-- Table: {key}\n")
            f.write(render_create_table(td))
            f.write("\n\n")

        # -----------------------------------------------------------------------
        # Phase 2: FK constraints
        # -----------------------------------------------------------------------
        f.write("-- =============================================================================\n")
        f.write("-- PHASE 2: FOREIGN KEY CONSTRAINTS\n")
        f.write("-- =============================================================================\n\n")

        fk_count = 0
        for key in sorted_keys:
            td = public_tables[key]
            alters = render_fk_alters(td)
            if alters:
                f.write(f"-- FKs for: {key}\n")
                for stmt in alters:
                    f.write(stmt + "\n")
                    fk_count += 1
                f.write("\n")

        # -----------------------------------------------------------------------
        # Phase 3: Indexes
        # -----------------------------------------------------------------------
        f.write("-- =============================================================================\n")
        f.write("-- PHASE 3: INDEXES\n")
        f.write("-- =============================================================================\n\n")

        idx_count = 0
        for key in sorted_keys:
            td = public_tables[key]
            if td.indexes:
                f.write(f"-- Indexes for: {key}\n")
                seen = set()
                for idx in td.indexes:
                    if idx not in seen:
                        seen.add(idx)
                        if not idx.endswith(";"):
                            idx += ";"
                        f.write(idx + "\n")
                        idx_count += 1
                f.write("\n")

        # -----------------------------------------------------------------------
        # Appendix: audit_trail schema
        # -----------------------------------------------------------------------
        f.write("-- =============================================================================\n")
        f.write("-- APPENDIX: audit_trail schema (append-only event log)\n")
        f.write("-- =============================================================================\n\n")

        f.write("CREATE SCHEMA IF NOT EXISTS audit_trail;\n\n")

        # audit_entry
        f.write("-- Table: audit_trail.audit_entry (partitioned)\n")
        f.write(
            "CREATE TABLE IF NOT EXISTS audit_trail.audit_entry (\n"
            "    id               UUID        NOT NULL DEFAULT gen_random_uuid(),\n"
            "    workspace_id     UUID        NOT NULL,\n"
            "    actor_id         TEXT        NOT NULL,\n"
            "    actor_type       SMALLINT    NOT NULL,\n"
            "    actor_ip         INET,\n"
            "    actor_user_agent TEXT,\n"
            "    entity_type      TEXT        NOT NULL,\n"
            "    entity_id        TEXT        NOT NULL,\n"
            "    domain           TEXT        NOT NULL,\n"
            "    action           SMALLINT    NOT NULL,\n"
            "    permission_code  TEXT,\n"
            "    use_case         TEXT,\n"
            "    reason           TEXT,\n"
            "    method_name      TEXT        NOT NULL,\n"
            "    request_id       TEXT,\n"
            "    transaction_id   BIGINT,\n"
            "    field_count      SMALLINT    NOT NULL DEFAULT 0,\n"
            "    occurred_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n"
            "    PRIMARY KEY (occurred_at, id)\n"
            ") PARTITION BY RANGE (occurred_at);\n\n"
        )

        # audit_field_change
        f.write("-- Table: audit_trail.audit_field_change\n")
        f.write(
            "CREATE TABLE IF NOT EXISTS audit_trail.audit_field_change (\n"
            "    id              UUID        NOT NULL DEFAULT gen_random_uuid(),\n"
            "    audit_entry_id  UUID        NOT NULL,\n"
            "    field_name      TEXT        NOT NULL,\n"
            "    field_type      SMALLINT    NOT NULL,\n"
            "    old_value       TEXT,\n"
            "    new_value       TEXT\n"
            ");\n\n"
        )

        # Partitions
        f.write("-- Monthly partitions\n")
        f.write(
            "CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_2026_03\n"
            "    PARTITION OF audit_trail.audit_entry\n"
            "    FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');\n"
            "CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_2026_04\n"
            "    PARTITION OF audit_trail.audit_entry\n"
            "    FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');\n"
            "CREATE TABLE IF NOT EXISTS audit_trail.audit_entry_2026_05\n"
            "    PARTITION OF audit_trail.audit_entry\n"
            "    FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');\n\n"
        )

        # Audit indexes
        f.write("-- Indexes on audit_trail tables\n")
        for stmt in AUDIT_TRAIL_INDEXES.strip().splitlines():
            if stmt.strip():
                f.write(stmt.strip() + "\n")
        f.write("\n")

        # Grants
        f.write(AUDIT_TRAIL_GRANTS.strip() + "\n")

    # Summary
    print()
    print("=" * 60)
    print(f"Output written to: {OUTPUT_FILE}")
    print(f"  Public tables:   {total_tables}")
    print(f"  FK constraints:  {fk_count}")
    print(f"  Indexes:         {idx_count}")
    print("=" * 60)


if __name__ == "__main__":
    main()
