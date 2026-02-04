package migrate

import "time"

// Direction represents migration direction
type Direction string

const (
	Up   Direction = "up"
	Down Direction = "down"
)

// Migration represents a single migration
type Migration struct {
	Version  int64  // Timestamp-based version (e.g., 20240101120000)
	Name     string // Human-readable name (e.g., "create_users")
	UpSQL    string // Content of .up.sql file
	DownSQL  string // Content of .down.sql file
	FilePath string // Base path without extension
}

// MigrationRecord represents a row in schema_migrations table
type MigrationRecord struct {
	ID         int64     `db:"id"`
	Version    int64     `db:"version"`
	Name       string    `db:"name"`
	Batch      int       `db:"batch"`
	ExecutedAt time.Time `db:"executed_at"`
}

// MigrationStatus represents the status of a single migration
type MigrationStatus struct {
	Migration *Migration
	Applied   bool
	AppliedAt *time.Time
	Batch     *int
}
