package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/reflect/protodesc"
	"google.golang.org/protobuf/reflect/protoreflect"
	"google.golang.org/protobuf/types/descriptorpb"

	optionsv1 "github.com/erniealice/esqyma/pkg/schema/v1/options"
)

// Type mappings per dialect
var typeMappings = map[string]map[string]string{
	"postgres": {
		"string": "TEXT",
		"int32":  "INTEGER",
		"int64":  "BIGINT",
		"bool":   "BOOLEAN",
		"float":  "REAL",
		"double": "DOUBLE PRECISION",
		"bytes":  "BYTEA",
	},
	"sqlserver": {
		"string": "NVARCHAR(MAX)",
		"int32":  "INT",
		"int64":  "BIGINT",
		"bool":   "BIT",
		"float":  "REAL",
		"double": "FLOAT",
		"bytes":  "VARBINARY(MAX)",
	},
	"mysql": {
		"string": "TEXT",
		"int32":  "INT",
		"int64":  "BIGINT",
		"bool":   "BOOLEAN",
		"float":  "FLOAT",
		"double": "DOUBLE",
		"bytes":  "BLOB",
	},
}

type FieldConstraints struct {
	References string
	Unique     bool
	Index      bool
	Default    string
	Check      string
	SqlType    string
}

type TableConstraints struct {
	UniqueTogether []string
	IndexTogether  []string
}

type Field struct {
	Name        string
	Type        string
	Optional    bool
	Constraints FieldConstraints
}

type Entity struct {
	Name        string
	TableName   string
	Fields      []Field
	Constraints TableConstraints
}

// toSnakeCase converts PascalCase to snake_case
func toSnakeCase(s string) string {
	var result strings.Builder
	for i, r := range s {
		if i > 0 && r >= 'A' && r <= 'Z' {
			result.WriteRune('_')
		}
		result.WriteRune(r)
	}
	return strings.ToLower(result.String())
}

// getFieldOptions extracts db options from a field descriptor
func getFieldOptions(fd protoreflect.FieldDescriptor) FieldConstraints {
	var constraints FieldConstraints

	opts := fd.Options()
	if opts == nil {
		return constraints
	}

	// Get the extension value
	if proto.HasExtension(opts, optionsv1.E_Db) {
		ext := proto.GetExtension(opts, optionsv1.E_Db)
		if dbOpts, ok := ext.(*optionsv1.FieldOptions); ok && dbOpts != nil {
			constraints.References = dbOpts.GetReferences()
			constraints.Unique = dbOpts.GetUnique()
			constraints.Index = dbOpts.GetIndex()
			constraints.Default = dbOpts.GetDefault()
			constraints.Check = dbOpts.GetCheck()
			constraints.SqlType = dbOpts.GetSqlType()
		}
	}

	return constraints
}

// getMessageOptions extracts table options from a message descriptor
func getMessageOptions(md protoreflect.MessageDescriptor) (bool, string, TableConstraints) {
	var isTable bool
	var tableName string
	var constraints TableConstraints

	opts := md.Options()
	if opts == nil {
		return false, "", constraints
	}

	if proto.HasExtension(opts, optionsv1.E_Table) {
		ext := proto.GetExtension(opts, optionsv1.E_Table)
		if tableOpts, ok := ext.(*optionsv1.MessageOptions); ok && tableOpts != nil {
			isTable = tableOpts.GetTable()
			tableName = tableOpts.GetTableName()
			constraints.UniqueTogether = tableOpts.GetUniqueTogether()
			constraints.IndexTogether = tableOpts.GetIndexTogether()
		}
	}

	return isTable, tableName, constraints
}

// protoTypeToString converts protoreflect.Kind to a string type name
func protoTypeToString(kind protoreflect.Kind) string {
	switch kind {
	case protoreflect.BoolKind:
		return "bool"
	case protoreflect.Int32Kind, protoreflect.Sint32Kind, protoreflect.Sfixed32Kind:
		return "int32"
	case protoreflect.Int64Kind, protoreflect.Sint64Kind, protoreflect.Sfixed64Kind:
		return "int64"
	case protoreflect.Uint32Kind, protoreflect.Fixed32Kind:
		return "int32"
	case protoreflect.Uint64Kind, protoreflect.Fixed64Kind:
		return "int64"
	case protoreflect.FloatKind:
		return "float"
	case protoreflect.DoubleKind:
		return "double"
	case protoreflect.StringKind:
		return "string"
	case protoreflect.BytesKind:
		return "bytes"
	default:
		return "string"
	}
}

// parseMessage extracts entity information from a message descriptor
func parseMessage(md protoreflect.MessageDescriptor) *Entity {
	isTable, tableName, tableConstraints := getMessageOptions(md)

	// Only process messages marked as tables
	if !isTable {
		return nil
	}

	messageName := string(md.Name())
	if tableName == "" {
		tableName = toSnakeCase(messageName)
	}

	var fields []Field
	for i := 0; i < md.Fields().Len(); i++ {
		fd := md.Fields().Get(i)
		fieldName := string(fd.Name())

		// Skip message-type fields that don't end in _id (API response fields, not DB)
		if fd.Kind() == protoreflect.MessageKind && !strings.HasSuffix(fieldName, "_id") {
			continue
		}

		// Skip _string suffix fields (computed, not stored)
		if strings.HasSuffix(fieldName, "_string") {
			continue
		}

		fieldType := protoTypeToString(fd.Kind())
		optional := fd.HasOptionalKeyword()
		constraints := getFieldOptions(fd)

		fields = append(fields, Field{
			Name:        fieldName,
			Type:        fieldType,
			Optional:    optional,
			Constraints: constraints,
		})
	}

	if len(fields) == 0 {
		return nil
	}

	return &Entity{
		Name:        messageName,
		TableName:   tableName,
		Fields:      fields,
		Constraints: tableConstraints,
	}
}

// quoteIdentifier quotes an identifier based on dialect
func quoteIdentifier(name, dialect string) string {
	switch dialect {
	case "postgres":
		return fmt.Sprintf(`"%s"`, name)
	case "sqlserver":
		return fmt.Sprintf(`[%s]`, name)
	case "mysql":
		return fmt.Sprintf("`%s`", name)
	default:
		return name
	}
}

// generateCreateTable generates a CREATE TABLE statement for a dialect
func generateCreateTable(entity *Entity, dialect string) string {
	typeMap := typeMappings[dialect]
	var columnDefs []string
	var constraints []string
	var indexes []string

	tableName := quoteIdentifier(entity.TableName, dialect)

	for _, field := range entity.Fields {
		// Determine SQL type
		sqlType := field.Constraints.SqlType
		if sqlType == "" {
			var ok bool
			sqlType, ok = typeMap[field.Type]
			if !ok {
				sqlType = typeMap["string"]
			}
		}

		// Build column definition
		colName := quoteIdentifier(field.Name, dialect)
		var parts []string
		parts = append(parts, colName, sqlType)

		// Primary key
		if field.Name == "id" {
			parts = append(parts, "PRIMARY KEY")
		} else {
			// Nullable
			if field.Optional {
				parts = append(parts, "NULL")
			} else {
				parts = append(parts, "NOT NULL")
			}
		}

		// Default value
		if field.Constraints.Default != "" {
			parts = append(parts, fmt.Sprintf("DEFAULT %s", field.Constraints.Default))
		}

		// Unique constraint (inline for single column)
		if field.Constraints.Unique {
			parts = append(parts, "UNIQUE")
		}

		// Check constraint
		if field.Constraints.Check != "" {
			parts = append(parts, fmt.Sprintf("CHECK (%s)", field.Constraints.Check))
		}

		columnDefs = append(columnDefs, "  "+strings.Join(parts, " "))

		// Foreign key constraint
		if field.Constraints.References != "" {
			ref := field.Constraints.References
			refTable := ref
			refColumn := "id"
			if strings.Contains(ref, ".") {
				parts := strings.SplitN(ref, ".", 2)
				refTable = parts[0]
				refColumn = parts[1]
			}
			fkName := fmt.Sprintf("fk_%s_%s", entity.TableName, field.Name)
			constraint := fmt.Sprintf("  CONSTRAINT %s FOREIGN KEY (%s) REFERENCES %s(%s)",
				quoteIdentifier(fkName, dialect),
				colName,
				quoteIdentifier(refTable, dialect),
				quoteIdentifier(refColumn, dialect))
			constraints = append(constraints, constraint)
		}

		// Index (separate statement)
		if field.Constraints.Index {
			idxName := fmt.Sprintf("idx_%s_%s", entity.TableName, field.Name)
			indexes = append(indexes, fmt.Sprintf("CREATE INDEX %s ON %s (%s);",
				quoteIdentifier(idxName, dialect),
				tableName,
				colName))
		}
	}

	// Composite unique constraints
	for i, cols := range entity.Constraints.UniqueTogether {
		colNames := strings.Split(cols, ",")
		var quotedCols []string
		for _, c := range colNames {
			quotedCols = append(quotedCols, quoteIdentifier(strings.TrimSpace(c), dialect))
		}
		constraintName := fmt.Sprintf("uq_%s_%d", entity.TableName, i+1)
		constraints = append(constraints, fmt.Sprintf("  CONSTRAINT %s UNIQUE (%s)",
			quoteIdentifier(constraintName, dialect),
			strings.Join(quotedCols, ", ")))
	}

	// Composite indexes
	for i, cols := range entity.Constraints.IndexTogether {
		colNames := strings.Split(cols, ",")
		var quotedCols []string
		for _, c := range colNames {
			quotedCols = append(quotedCols, quoteIdentifier(strings.TrimSpace(c), dialect))
		}
		idxName := fmt.Sprintf("idx_%s_%d", entity.TableName, i+1)
		indexes = append(indexes, fmt.Sprintf("CREATE INDEX %s ON %s (%s);",
			quoteIdentifier(idxName, dialect),
			tableName,
			strings.Join(quotedCols, ", ")))
	}

	// Combine all parts
	allDefs := append(columnDefs, constraints...)
	result := fmt.Sprintf("CREATE TABLE %s (\n%s\n);", tableName, strings.Join(allDefs, ",\n"))

	// Add indexes after table
	if len(indexes) > 0 {
		result += "\n\n" + strings.Join(indexes, "\n")
	}

	return result
}

func main() {
	baseDir, err := os.Getwd()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error getting working directory: %v\n", err)
		os.Exit(1)
	}

	// Read descriptor set
	descriptorPath := filepath.Join(baseDir, "proto", "v1", "descriptors.bin")
	data, err := os.ReadFile(descriptorPath)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error reading descriptor set: %v\n", err)
		fmt.Fprintf(os.Stderr, "Make sure to run 'buf build ./proto/v1 -o ./proto/v1/descriptors.bin' first\n")
		os.Exit(1)
	}

	// Parse descriptor set
	fds := &descriptorpb.FileDescriptorSet{}
	if err := proto.Unmarshal(data, fds); err != nil {
		fmt.Fprintf(os.Stderr, "Error parsing descriptor set: %v\n", err)
		os.Exit(1)
	}

	// Build file registry
	files, err := protodesc.NewFiles(fds)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error building file registry: %v\n", err)
		os.Exit(1)
	}

	// Find all entities (messages with table option)
	var entities []*Entity
	files.RangeFiles(func(fd protoreflect.FileDescriptor) bool {
		for i := 0; i < fd.Messages().Len(); i++ {
			md := fd.Messages().Get(i)
			entity := parseMessage(md)
			if entity != nil {
				entities = append(entities, entity)
				fmt.Printf("Found table: %s (%d fields)\n", entity.Name, len(entity.Fields))
			}
		}
		return true
	})

	if len(entities) == 0 {
		fmt.Println("No tables found. Make sure your messages have option (options.v1.table).table = true;")
		os.Exit(0)
	}

	// Generate migrations for each dialect
	dialects := []string{"postgres", "sqlserver", "mysql"}

	for _, dialect := range dialects {
		outputDir := filepath.Join(baseDir, "migrations", dialect)
		if err := os.MkdirAll(outputDir, 0755); err != nil {
			fmt.Fprintf(os.Stderr, "Error creating directory %s: %v\n", outputDir, err)
			continue
		}

		var statements []string
		for _, entity := range entities {
			statements = append(statements, fmt.Sprintf("-- Table: %s", entity.TableName))
			statements = append(statements, generateCreateTable(entity, dialect))
			statements = append(statements, "")
		}

		outputFile := filepath.Join(outputDir, "0001_initial.sql")
		if err := os.WriteFile(outputFile, []byte(strings.Join(statements, "\n")), 0644); err != nil {
			fmt.Fprintf(os.Stderr, "Error writing %s: %v\n", outputFile, err)
			continue
		}
		fmt.Printf("Generated: %s\n", outputFile)
	}
}
