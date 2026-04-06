// diff compares the proto-generated DDL (0001_initial.sql) against the live database
// schema and prints what is missing, extra, or mismatched.
//
// Usage:
//
//	go run ./cmd/diff
//
// Environment variables (reads service-admin .env or set manually):
//
//	DATABASE_URL        Full connection string (takes precedence)
//	POSTGRES_HOST       Host (default: 127.0.0.1)
//	POSTGRES_PORT       Port (default: 5432)
//	POSTGRES_NAME       Database name
//	POSTGRES_USER       Username
//	POSTGRES_PASSWORD   Password
//	POSTGRES_SSL_MODE   SSL mode (default: disable)
//	MIGRATE_DIALECT     Dialect (default: postgres)
//	DDL_FILE            Path to DDL reference file
//	                    (default: migrations/postgres/0001_initial.sql)
package main

import (
	"bufio"
	"context"
	"database/sql"
	"fmt"
	"os"
	"regexp"
	"sort"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/jackc/pgx/v5/stdlib"
	_ "github.com/microsoft/go-mssqldb"
)

func main() {
	dialect := getEnv("MIGRATE_DIALECT", "postgres")
	ddlFile := getEnv("DDL_FILE", "migrations/"+dialect+"/0001_initial.sql")

	content, err := os.ReadFile(ddlFile)
	if err != nil {
		fatalf("read DDL file %s: %v\n", ddlFile, err)
	}

	ddlTables := parseDDL(string(content))
	if len(ddlTables) == 0 {
		fatalf("no CREATE TABLE statements found in %s\n", ddlFile)
	}

	db, err := openDB(dialect)
	if err != nil {
		fatalf("connect to database: %v\n", err)
	}
	defer db.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	liveTables, err := queryLiveSchema(ctx, db, dialect)
	if err != nil {
		fatalf("query live schema: %v\n", err)
	}

	printDiff(ddlTables, liveTables)
}

// ---------- DDL parser ----------

// parseDDL extracts table→columns from CREATE TABLE statements.
func parseDDL(content string) map[string][]string {
	tables := make(map[string][]string)

	// Match full CREATE TABLE block (non-greedy, DOTALL)
	tableRe := regexp.MustCompile(`(?is)CREATE\s+TABLE\s+"?(\w+)"?\s*\((.+?)\)\s*;`)
	// Column lines: "column_name" TYPE … — excludes CONSTRAINT lines
	colRe := regexp.MustCompile(`^\s*"([a-z_][a-z0-9_]*)"\s+\S`)

	for _, m := range tableRe.FindAllStringSubmatch(content, -1) {
		tableName := strings.ToLower(m[1])
		body := m[2]
		var cols []string
		scanner := bufio.NewScanner(strings.NewReader(body))
		for scanner.Scan() {
			line := scanner.Text()
			// Skip constraint lines
			trimmed := strings.TrimSpace(line)
			if strings.HasPrefix(strings.ToUpper(trimmed), "CONSTRAINT") {
				continue
			}
			if cm := colRe.FindStringSubmatch(line); cm != nil {
				cols = append(cols, cm[1])
			}
		}
		tables[tableName] = cols
	}
	return tables
}

// ---------- Live schema query ----------

type liveSchema map[string][]string // table → columns

func queryLiveSchema(ctx context.Context, db *sql.DB, dialect string) (liveSchema, error) {
	switch dialect {
	case "postgres":
		return queryPostgresSchema(ctx, db)
	case "mysql":
		return queryMySQLSchema(ctx, db)
	default:
		return nil, fmt.Errorf("schema introspection not supported for dialect %q", dialect)
	}
}

func queryPostgresSchema(ctx context.Context, db *sql.DB) (liveSchema, error) {
	schema := make(liveSchema)

	rows, err := db.QueryContext(ctx, `
		SELECT table_name
		FROM information_schema.tables
		WHERE table_schema = 'public'
		  AND table_type = 'BASE TABLE'
		  AND table_name != 'schema_migrations'
		ORDER BY table_name`)
	if err != nil {
		return nil, fmt.Errorf("list tables: %w", err)
	}
	defer rows.Close()
	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			return nil, err
		}
		schema[name] = nil
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	for tableName := range schema {
		cols, err := queryPostgresColumns(ctx, db, tableName)
		if err != nil {
			return nil, fmt.Errorf("columns for %s: %w", tableName, err)
		}
		schema[tableName] = cols
	}
	return schema, nil
}

func queryPostgresColumns(ctx context.Context, db *sql.DB, table string) ([]string, error) {
	rows, err := db.QueryContext(ctx, `
		SELECT column_name
		FROM information_schema.columns
		WHERE table_schema = 'public'
		  AND table_name = $1
		ORDER BY ordinal_position`, table)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var cols []string
	for rows.Next() {
		var c string
		if err := rows.Scan(&c); err != nil {
			return nil, err
		}
		cols = append(cols, c)
	}
	return cols, rows.Err()
}

func queryMySQLSchema(ctx context.Context, db *sql.DB) (liveSchema, error) {
	schema := make(liveSchema)

	dbName := getEnv("MYSQL_NAME", getEnv("POSTGRES_NAME", ""))
	rows, err := db.QueryContext(ctx, `
		SELECT table_name
		FROM information_schema.tables
		WHERE table_schema = ?
		  AND table_type = 'BASE TABLE'
		  AND table_name != 'schema_migrations'
		ORDER BY table_name`, dbName)
	if err != nil {
		return nil, fmt.Errorf("list tables: %w", err)
	}
	defer rows.Close()
	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			return nil, err
		}
		schema[name] = nil
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	for tableName := range schema {
		colRows, err := db.QueryContext(ctx, `
			SELECT column_name
			FROM information_schema.columns
			WHERE table_schema = ?
			  AND table_name = ?
			ORDER BY ordinal_position`, dbName, tableName)
		if err != nil {
			return nil, fmt.Errorf("columns for %s: %w", tableName, err)
		}
		var cols []string
		for colRows.Next() {
			var c string
			if err := colRows.Scan(&c); err != nil {
				colRows.Close()
				return nil, err
			}
			cols = append(cols, c)
		}
		colRows.Close()
		if err := colRows.Err(); err != nil {
			return nil, err
		}
		schema[tableName] = cols
	}
	return schema, nil
}

// ---------- Diff printer ----------

func printDiff(ddl map[string][]string, live liveSchema) {
	var missingTables, extraTables []string
	var tableDiffs []string

	for t := range ddl {
		if _, ok := live[t]; !ok {
			missingTables = append(missingTables, t)
		}
	}
	for t := range live {
		if _, ok := ddl[t]; !ok {
			extraTables = append(extraTables, t)
		}
	}

	sort.Strings(missingTables)
	sort.Strings(extraTables)

	for _, t := range sortedKeys(ddl) {
		liveCols, ok := live[t]
		if !ok {
			continue // already in missingTables
		}
		liveSet := toSet(liveCols)
		ddlSet := toSet(ddl[t])

		var missing, extra []string
		for c := range ddlSet {
			if !liveSet[c] {
				missing = append(missing, c)
			}
		}
		for c := range liveSet {
			if !ddlSet[c] {
				extra = append(extra, c)
			}
		}
		sort.Strings(missing)
		sort.Strings(extra)

		if len(missing) > 0 || len(extra) > 0 {
			var sb strings.Builder
			fmt.Fprintf(&sb, "  table %q:\n", t)
			for _, c := range missing {
				fmt.Fprintf(&sb, "    - missing column: %s\n", c)
			}
			for _, c := range extra {
				fmt.Fprintf(&sb, "    + extra column:   %s\n", c)
			}
			tableDiffs = append(tableDiffs, sb.String())
		}
	}

	any := len(missingTables)+len(extraTables)+len(tableDiffs) > 0
	if !any {
		fmt.Println("No differences found — live schema matches proto DDL.")
		return
	}

	fmt.Println("=== Schema diff: DDL (proto) vs live database ===")
	fmt.Println()

	if len(missingTables) > 0 {
		fmt.Println("Tables in DDL but MISSING from live database:")
		for _, t := range missingTables {
			fmt.Printf("  - %s\n", t)
		}
		fmt.Println()
	}

	if len(extraTables) > 0 {
		fmt.Println("Tables in live database NOT in DDL (extra / legacy):")
		for _, t := range extraTables {
			fmt.Printf("  + %s\n", t)
		}
		fmt.Println()
	}

	if len(tableDiffs) > 0 {
		fmt.Println("Column differences (- missing from live, + extra in live):")
		for _, d := range tableDiffs {
			fmt.Print(d)
		}
		fmt.Println()
	}

	fmt.Println("=== Action: create a bridge migration to close the gap ===")
	fmt.Println("  go run ./cmd/migrate make bridge_to_proto_ddl")
}

// ---------- DB connection ----------

func openDB(dialect string) (*sql.DB, error) {
	var (
		driverName string
		dsn        string
	)

	if url := os.Getenv("DATABASE_URL"); url != "" {
		switch dialect {
		case "postgres":
			driverName = "pgx"
		case "mysql":
			driverName = "mysql"
		case "sqlserver":
			driverName = "sqlserver"
		default:
			driverName = "pgx"
		}
		dsn = url
	} else {
		switch dialect {
		case "postgres":
			driverName = "pgx"
			dsn = fmt.Sprintf(
				"host=%s port=%s dbname=%s user=%s password=%s sslmode=%s",
				getEnv("POSTGRES_HOST", "127.0.0.1"),
				getEnv("POSTGRES_PORT", "5432"),
				getEnv("POSTGRES_NAME", ""),
				getEnv("POSTGRES_USER", ""),
				getEnv("POSTGRES_PASSWORD", ""),
				getEnv("POSTGRES_SSL_MODE", "disable"),
			)
		case "mysql":
			driverName = "mysql"
			dsn = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true",
				getEnv("MYSQL_USER", getEnv("POSTGRES_USER", "")),
				getEnv("MYSQL_PASSWORD", getEnv("POSTGRES_PASSWORD", "")),
				getEnv("MYSQL_HOST", getEnv("POSTGRES_HOST", "127.0.0.1")),
				getEnv("MYSQL_PORT", "3306"),
				getEnv("MYSQL_NAME", getEnv("POSTGRES_NAME", "")),
			)
		default:
			return nil, fmt.Errorf("unsupported dialect: %s", dialect)
		}
	}

	db, err := sql.Open(driverName, dsn)
	if err != nil {
		return nil, err
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := db.PingContext(ctx); err != nil {
		db.Close()
		return nil, err
	}
	return db, nil
}

// ---------- helpers ----------

func getEnv(key, defaultVal string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return defaultVal
}

func fatalf(format string, args ...any) {
	fmt.Fprintf(os.Stderr, "diff: "+format, args...)
	os.Exit(1)
}

func toSet(s []string) map[string]bool {
	m := make(map[string]bool, len(s))
	for _, v := range s {
		m[v] = true
	}
	return m
}

func sortedKeys[V any](m map[string]V) []string {
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	return keys
}
