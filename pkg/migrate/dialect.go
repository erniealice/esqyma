package migrate

import "fmt"

// Dialect defines database-specific operations
type Dialect interface {
	// Name returns the dialect name (postgres, mysql, sqlserver)
	Name() string

	// QuoteIdentifier quotes a table/column identifier
	QuoteIdentifier(name string) string

	// CreateMigrationsTableSQL returns SQL to create the migrations table
	CreateMigrationsTableSQL() string

	// InsertMigrationSQL returns SQL to record a migration
	InsertMigrationSQL() string

	// DeleteMigrationSQL returns SQL to remove a migration record
	DeleteMigrationSQL() string

	// GetAppliedMigrationsSQL returns SQL to list applied migrations
	GetAppliedMigrationsSQL() string

	// GetLastBatchSQL returns SQL to get the last batch number
	GetLastBatchSQL() string

	// GetMigrationsByBatchSQL returns SQL to get migrations by batch
	GetMigrationsByBatchSQL() string

	// DriverName returns the database/sql driver name
	DriverName() string
}

// dialects maps dialect names to implementations
var dialects = map[string]Dialect{}

// RegisterDialect registers a dialect implementation
func RegisterDialect(d Dialect) {
	dialects[d.Name()] = d
}

// GetDialect returns a dialect by name
func GetDialect(name string) (Dialect, error) {
	d, ok := dialects[name]
	if !ok {
		return nil, fmt.Errorf("unknown dialect: %s (available: postgres, mysql, sqlserver)", name)
	}
	return d, nil
}

// AvailableDialects returns a list of registered dialect names
func AvailableDialects() []string {
	names := make([]string, 0, len(dialects))
	for name := range dialects {
		names = append(names, name)
	}
	return names
}
