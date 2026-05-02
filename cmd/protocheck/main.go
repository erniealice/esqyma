// protocheck compares the proto descriptor (source of truth) against the live
// database schema and reports drift: tables/columns declared in proto but
// missing from the DB, or DB tables/columns that no longer exist in proto.
//
// With --sql-out <path>, also emits a ready-to-review SQL draft containing
// ADD COLUMN / FK / INDEX statements for every "missing column" entry, sized
// from the proto field's type + (options.v1.db) annotations. Hand the draft
// to `pnpm db:diff` to turn it into a canonical migration file.
//
// Usage:
//
//   # from packages/esqyma:
//   buf build ./proto/v1 -o ./proto/v1/descriptors.bin
//   go run ./cmd/protocheck                              # text report only
//   go run ./cmd/protocheck --sql-out /tmp/draft.sql     # report + draft SQL
//
// Exit codes:
//
//   0 — no drift
//   1 — drift detected
//   2 — invocation / connection failure
//
// Environment variables (same as cmd/diff):
//
//   DATABASE_URL        Full connection string (takes precedence)
//   POSTGRES_HOST       Host (default: 127.0.0.1)
//   POSTGRES_PORT       Port (default: 5432)
//   POSTGRES_NAME       Database name
//   POSTGRES_USER       Username
//   POSTGRES_PASSWORD   Password
//   POSTGRES_SSL_MODE   SSL mode (default: disable)
//   DESCRIPTOR_FILE     Path to descriptor set
//                       (default: proto/v1/descriptors.bin)
package main

import (
	"context"
	"database/sql"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/reflect/protodesc"
	"google.golang.org/protobuf/reflect/protoreflect"
	"google.golang.org/protobuf/types/descriptorpb"

	_ "github.com/jackc/pgx/v5/stdlib"

	optionsv1 "github.com/erniealice/esqyma/pkg/schema/v1/options"
)

// protoField captures everything the SQL emitter needs about a proto field
// declared on a table message.
type protoField struct {
	Name       string
	SQLType    string // resolved postgres type (TEXT/INTEGER/BIGINT/BOOLEAN/REAL/DOUBLE PRECISION/BYTEA)
	Optional   bool   // true → nullable column
	References string // FK target table (id assumed unless ".col" suffix is present)
	Index      bool
	Unique     bool
	Default    string // raw SQL default expression (e.g. "true", "'active'")
}

func main() {
	sqlOut := flag.String("sql-out", "", "Write an ADD COLUMN / FK / INDEX draft to this path for every missing-column drift item.")
	flag.Parse()

	descriptorPath := getEnv("DESCRIPTOR_FILE", filepath.Join("proto", "v1", "descriptors.bin"))

	protoTables, err := loadProtoTables(descriptorPath)
	if err != nil {
		fatalf("load proto tables: %v\n", err)
	}
	if len(protoTables) == 0 {
		fatalf("no tables found in %s — make sure messages have option (options.v1.table).table = true and that descriptors.bin is fresh\n", descriptorPath)
	}

	db, err := openPostgres()
	if err != nil {
		fatalf("connect to database: %v\n", err)
	}
	defer db.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	liveTables, err := queryLiveSchema(ctx, db)
	if err != nil {
		fatalf("query live schema: %v\n", err)
	}

	driftFound, missingByTable := computeDrift(protoTables, liveTables)
	printDrift(protoTables, liveTables, missingByTable)

	if *sqlOut != "" {
		if err := emitDriftSQL(*sqlOut, protoTables, missingByTable); err != nil {
			fatalf("write %s: %v\n", *sqlOut, err)
		}
	}

	if driftFound {
		os.Exit(1)
	}
}

// ---------- Proto descriptor walk ----------

// loadProtoTables parses descriptors.bin and returns table_name → field_name → protoField
// for every message marked (options.v1.table).table = true.
func loadProtoTables(descriptorPath string) (map[string]map[string]protoField, error) {
	data, err := os.ReadFile(descriptorPath)
	if err != nil {
		return nil, fmt.Errorf("read %s: %w (run: buf build ./proto/v1 -o ./proto/v1/descriptors.bin)", descriptorPath, err)
	}

	fds := &descriptorpb.FileDescriptorSet{}
	if err := proto.Unmarshal(data, fds); err != nil {
		return nil, fmt.Errorf("unmarshal descriptor set: %w", err)
	}

	files, err := protodesc.NewFiles(fds)
	if err != nil {
		return nil, fmt.Errorf("build file registry: %w", err)
	}

	tables := make(map[string]map[string]protoField)
	files.RangeFiles(func(fd protoreflect.FileDescriptor) bool {
		for i := 0; i < fd.Messages().Len(); i++ {
			md := fd.Messages().Get(i)
			isTable, tableName := tableOptions(md)
			if !isTable {
				continue
			}
			if tableName == "" {
				tableName = toSnakeCase(string(md.Name()))
			}
			cols := protoFieldColumns(md)
			if len(cols) == 0 {
				continue
			}
			tables[tableName] = cols
		}
		return true
	})
	return tables, nil
}

// tableOptions extracts (options.v1.table) from a message.
func tableOptions(md protoreflect.MessageDescriptor) (bool, string) {
	opts := md.Options()
	if opts == nil {
		return false, ""
	}
	if !proto.HasExtension(opts, optionsv1.E_Table) {
		return false, ""
	}
	ext := proto.GetExtension(opts, optionsv1.E_Table)
	tableOpts, ok := ext.(*optionsv1.MessageOptions)
	if !ok || tableOpts == nil {
		return false, ""
	}
	return tableOpts.GetTable(), tableOpts.GetTableName()
}

// protoFieldColumns returns the column-bearing fields keyed by name. Skips
// message-typed fields that don't end in _id (API-only), *_string mirror
// fields, and repeated scalars (postgres array support TBD).
func protoFieldColumns(md protoreflect.MessageDescriptor) map[string]protoField {
	cols := make(map[string]protoField)
	for i := 0; i < md.Fields().Len(); i++ {
		fd := md.Fields().Get(i)
		name := string(fd.Name())
		if fd.Kind() == protoreflect.MessageKind && !strings.HasSuffix(name, "_id") {
			continue
		}
		if strings.HasSuffix(name, "_string") {
			continue
		}
		if fd.IsList() {
			continue
		}
		cols[name] = protoField{
			Name:     name,
			SQLType:  fieldSQLType(fd),
			Optional: fd.HasOptionalKeyword() || fd.Kind() == protoreflect.MessageKind,
			// Pull annotation-driven FK / index / unique / default.
			References: fieldDBOption(fd, func(o *optionsv1.FieldOptions) string { return o.GetReferences() }),
			Index:      fieldDBBool(fd, func(o *optionsv1.FieldOptions) bool { return o.GetIndex() }),
			Unique:     fieldDBBool(fd, func(o *optionsv1.FieldOptions) bool { return o.GetUnique() }),
			Default:    fieldDBOption(fd, func(o *optionsv1.FieldOptions) string { return o.GetDefault() }),
		}
		// SqlType override beats inferred type.
		if override := fieldDBOption(fd, func(o *optionsv1.FieldOptions) string { return o.GetSqlType() }); override != "" {
			c := cols[name]
			c.SQLType = override
			cols[name] = c
		}
	}
	return cols
}

// fieldDBOption pulls a string from the (options.v1.db) annotation.
func fieldDBOption(fd protoreflect.FieldDescriptor, get func(*optionsv1.FieldOptions) string) string {
	opts := fd.Options()
	if opts == nil || !proto.HasExtension(opts, optionsv1.E_Db) {
		return ""
	}
	ext, ok := proto.GetExtension(opts, optionsv1.E_Db).(*optionsv1.FieldOptions)
	if !ok || ext == nil {
		return ""
	}
	return get(ext)
}

func fieldDBBool(fd protoreflect.FieldDescriptor, get func(*optionsv1.FieldOptions) bool) bool {
	opts := fd.Options()
	if opts == nil || !proto.HasExtension(opts, optionsv1.E_Db) {
		return false
	}
	ext, ok := proto.GetExtension(opts, optionsv1.E_Db).(*optionsv1.FieldOptions)
	if !ok || ext == nil {
		return false
	}
	return get(ext)
}

// fieldSQLType maps proto kinds to the conservative postgres types used by
// generate-ddl. Defaults to TEXT for unknown kinds (matches existing convention).
func fieldSQLType(fd protoreflect.FieldDescriptor) string {
	switch fd.Kind() {
	case protoreflect.BoolKind:
		return "BOOLEAN"
	case protoreflect.Int32Kind, protoreflect.Sint32Kind, protoreflect.Sfixed32Kind,
		protoreflect.Uint32Kind, protoreflect.Fixed32Kind:
		return "INTEGER"
	case protoreflect.Int64Kind, protoreflect.Sint64Kind, protoreflect.Sfixed64Kind,
		protoreflect.Uint64Kind, protoreflect.Fixed64Kind:
		return "BIGINT"
	case protoreflect.FloatKind:
		return "REAL"
	case protoreflect.DoubleKind:
		return "DOUBLE PRECISION"
	case protoreflect.BytesKind:
		return "BYTEA"
	case protoreflect.MessageKind:
		// Only message-typed *_id fields reach this point — they're FK string columns.
		return "TEXT"
	default:
		return "TEXT"
	}
}

func toSnakeCase(s string) string {
	var b strings.Builder
	for i, r := range s {
		if i > 0 && r >= 'A' && r <= 'Z' {
			b.WriteRune('_')
		}
		b.WriteRune(r)
	}
	return strings.ToLower(b.String())
}

// ---------- Live schema query ----------

func queryLiveSchema(ctx context.Context, db *sql.DB) (map[string][]string, error) {
	schema := make(map[string][]string)

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
		colRows, err := db.QueryContext(ctx, `
			SELECT column_name
			FROM information_schema.columns
			WHERE table_schema = 'public'
			  AND table_name = $1
			ORDER BY ordinal_position`, tableName)
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
			if strings.HasSuffix(c, "_string") {
				continue
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

// ---------- Drift computation ----------

// computeDrift returns (any-drift-present, table → list of missing column names).
// missingByTable is sorted within each list.
func computeDrift(protoTables map[string]map[string]protoField, liveTables map[string][]string) (bool, map[string][]string) {
	missingByTable := map[string][]string{}
	driftFound := false

	for t, fields := range protoTables {
		liveCols, ok := liveTables[t]
		if !ok {
			driftFound = true
			continue
		}
		liveSet := toSet(liveCols)
		var missing []string
		for c := range fields {
			if !liveSet[c] {
				missing = append(missing, c)
			}
		}
		if len(missing) > 0 {
			sort.Strings(missing)
			missingByTable[t] = missing
			driftFound = true
		}
	}
	for t := range liveTables {
		if _, ok := protoTables[t]; !ok {
			driftFound = true
		}
		// Extra columns within shared tables also count as drift but don't
		// drive emit; flagged in printDrift below.
		if fields, ok := protoTables[t]; ok {
			liveSet := toSet(liveTables[t])
			protoSet := map[string]bool{}
			for c := range fields {
				protoSet[c] = true
			}
			for c := range liveSet {
				if !protoSet[c] {
					driftFound = true
					break
				}
			}
		}
	}
	return driftFound, missingByTable
}

// ---------- Drift report (text) ----------

func printDrift(protoTables map[string]map[string]protoField, liveTables map[string][]string, missingByTable map[string][]string) {
	var missingTables, extraTables []string
	type colDrift struct {
		table   string
		missing []string
		extra   []string
	}
	var diffs []colDrift

	for t := range protoTables {
		if _, ok := liveTables[t]; !ok {
			missingTables = append(missingTables, t)
		}
	}
	for t := range liveTables {
		if _, ok := protoTables[t]; !ok {
			extraTables = append(extraTables, t)
		}
	}
	sort.Strings(missingTables)
	sort.Strings(extraTables)

	for _, t := range sortedKeys(protoTables) {
		liveCols, ok := liveTables[t]
		if !ok {
			continue
		}
		liveSet := toSet(liveCols)
		protoSet := map[string]bool{}
		for c := range protoTables[t] {
			protoSet[c] = true
		}

		var missing, extra []string
		for c := range protoSet {
			if !liveSet[c] {
				missing = append(missing, c)
			}
		}
		for c := range liveSet {
			if !protoSet[c] {
				extra = append(extra, c)
			}
		}
		sort.Strings(missing)
		sort.Strings(extra)
		if len(missing) > 0 || len(extra) > 0 {
			diffs = append(diffs, colDrift{table: t, missing: missing, extra: extra})
		}
	}

	if len(missingTables) == 0 && len(extraTables) == 0 && len(diffs) == 0 {
		fmt.Println("protocheck: live schema matches proto descriptor.")
		return
	}

	fmt.Println("=== protocheck: proto descriptor vs live database ===")
	fmt.Println()

	if len(missingTables) > 0 {
		fmt.Println("Tables declared in proto but MISSING from live database:")
		for _, t := range missingTables {
			fmt.Printf("  - %s\n", t)
		}
		fmt.Println()
	}

	if len(extraTables) > 0 {
		fmt.Println("Tables in live database NOT declared in proto (legacy / orphan):")
		for _, t := range extraTables {
			fmt.Printf("  + %s\n", t)
		}
		fmt.Println()
	}

	if len(diffs) > 0 {
		fmt.Println("Column drift (- proto field with no DB column, + DB column with no proto field):")
		for _, d := range diffs {
			fmt.Printf("  table %q:\n", d.table)
			for _, c := range d.missing {
				fmt.Printf("    - missing column: %s\n", c)
			}
			for _, c := range d.extra {
				fmt.Printf("    + extra column:   %s\n", c)
			}
		}
		fmt.Println()
	}

	fmt.Println("=== Action: write a bridge migration that ALTERs the live DB to match proto ===")
}

// ---------- SQL emit ----------

// emitDriftSQL writes ALTER TABLE / FK / INDEX statements covering every
// "missing column" drift item. Skips entries that need human judgment:
//
//   - missing TABLES (atlas's `db:diff` handles full-table generation
//     better than we can; full table CREATE belongs in a hand-drafted
//     migration that picks PK strategy, defaults, etc.)
//   - "extra" columns / tables (DROP is destructive; surfaced in the text
//     report so the operator decides)
//
// Every column is emitted nullable (`NULL` or implicitly nullable for
// optional fields) regardless of proto's required/optional state — adding a
// NOT NULL column to a table with rows will fail. The operator tightens
// to NOT NULL in a follow-up migration after backfilling.
func emitDriftSQL(path string, protoTables map[string]map[string]protoField, missingByTable map[string][]string) error {
	if len(missingByTable) == 0 {
		// Write a marker file so callers know we ran.
		return os.WriteFile(path, []byte("-- protocheck: no missing columns to draft.\n"), 0o644)
	}

	var b strings.Builder
	fmt.Fprintln(&b, "-- protocheck drift draft.")
	fmt.Fprintln(&b, "-- Review every line before running through `pnpm db:diff`.")
	fmt.Fprintln(&b, "-- All columns are added NULLable; tighten to NOT NULL in a follow-up after backfilling.")
	fmt.Fprintln(&b, "-- Only emits ADD COLUMN / FK / INDEX. Tables missing entirely or extra DB columns are NOT touched.")
	fmt.Fprintln(&b)

	for _, table := range sortedKeys(missingByTable) {
		fields := protoTables[table]
		fmt.Fprintf(&b, "-- ── %s ────────────────────────────────────────────\n", table)
		var indexes []string
		for _, name := range missingByTable[table] {
			f, ok := fields[name]
			if !ok {
				continue
			}
			parts := []string{
				fmt.Sprintf("ALTER TABLE %s ADD COLUMN %s %s", table, name, f.SQLType),
			}
			if f.Default != "" {
				parts = append(parts, fmt.Sprintf("DEFAULT %s", f.Default))
			}
			if f.References != "" {
				ref := f.References
				refTable, refCol := ref, "id"
				if i := strings.Index(ref, "."); i > 0 {
					refTable = ref[:i]
					refCol = ref[i+1:]
				}
				parts = append(parts, fmt.Sprintf("REFERENCES %s(%s) ON DELETE RESTRICT", refTable, refCol))
			}
			if f.Unique {
				parts = append(parts, "UNIQUE")
			}
			fmt.Fprintf(&b, "%s;\n", strings.Join(parts, " "))

			if f.Index {
				idx := fmt.Sprintf("CREATE INDEX idx_%s_%s ON %s(%s) WHERE %s IS NOT NULL;",
					table, name, table, name, name)
				indexes = append(indexes, idx)
			}
		}
		for _, idx := range indexes {
			fmt.Fprintln(&b, idx)
		}
		fmt.Fprintln(&b)
	}

	if err := os.WriteFile(path, []byte(b.String()), 0o644); err != nil {
		return err
	}
	fmt.Printf("\nWrote drift draft: %s\n", path)
	fmt.Printf("Next steps:\n")
	fmt.Printf("  1. Open %s, review every ALTER (skip WIP/destructive lines).\n", path)
	fmt.Printf("  2. pnpm db:diff fix_drift %s   # atlas turns it into a canonical migration\n", path)
	fmt.Printf("  3. pnpm db:hash && pnpm db:apply\n")
	return nil
}

// ---------- DB connection ----------

func openPostgres() (*sql.DB, error) {
	var dsn string
	if url := os.Getenv("DATABASE_URL"); url != "" {
		dsn = url
	} else {
		dsn = fmt.Sprintf(
			"host=%s port=%s dbname=%s user=%s password=%s sslmode=%s",
			getEnv("POSTGRES_HOST", "127.0.0.1"),
			getEnv("POSTGRES_PORT", "5432"),
			getEnv("POSTGRES_NAME", ""),
			getEnv("POSTGRES_USER", ""),
			getEnv("POSTGRES_PASSWORD", ""),
			getEnv("POSTGRES_SSL_MODE", "disable"),
		)
	}
	db, err := sql.Open("pgx", dsn)
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
	fmt.Fprintf(os.Stderr, "protocheck: "+format, args...)
	os.Exit(2)
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
