package migrate

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strconv"
	"time"
)

// Migrator handles migration operations
type Migrator struct {
	db      *sql.DB
	dialect Dialect
	config  *Config
}

// NewMigrator creates a new Migrator instance
func NewMigrator(config *Config) (*Migrator, error) {
	dialect, err := GetDialect(config.Dialect)
	if err != nil {
		return nil, err
	}

	db, err := sql.Open(dialect.DriverName(), config.DatabaseURL)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Test connection
	if err := db.Ping(); err != nil {
		db.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return &Migrator{
		db:      db,
		dialect: dialect,
		config:  config,
	}, nil
}

// NewMigratorWithDB creates a Migrator with an existing database connection
// This is useful when you want to manage the connection yourself or use it in tests
func NewMigratorWithDB(db *sql.DB, dialect Dialect, config *Config) *Migrator {
	return &Migrator{
		db:      db,
		dialect: dialect,
		config:  config,
	}
}

// Close closes the database connection
func (m *Migrator) Close() error {
	return m.db.Close()
}

// DB returns the underlying database connection
func (m *Migrator) DB() *sql.DB {
	return m.db
}

// Dialect returns the current dialect
func (m *Migrator) Dialect() Dialect {
	return m.dialect
}

// EnsureMigrationsTable creates the migrations table if it doesn't exist
func (m *Migrator) EnsureMigrationsTable(ctx context.Context) error {
	_, err := m.db.ExecContext(ctx, m.dialect.CreateMigrationsTableSQL())
	return err
}

// LoadMigrations reads all migration files from the migrations directory
func (m *Migrator) LoadMigrations() ([]*Migration, error) {
	migrationsPath := m.config.MigrationsPath()

	// Pattern: 20240101120000_name.up.sql or 20240101120000_name.down.sql
	pattern := regexp.MustCompile(`^(\d{14})_(.+)\.(up|down)\.sql$`)

	migrationMap := make(map[int64]*Migration)

	entries, err := os.ReadDir(migrationsPath)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, nil // No migrations directory yet
		}
		return nil, err
	}

	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}

		matches := pattern.FindStringSubmatch(entry.Name())
		if matches == nil {
			continue
		}

		version, _ := strconv.ParseInt(matches[1], 10, 64)
		name := matches[2]
		direction := matches[3]

		filePath := filepath.Join(migrationsPath, entry.Name())
		content, err := os.ReadFile(filePath)
		if err != nil {
			return nil, fmt.Errorf("failed to read migration file %s: %w", filePath, err)
		}

		mig, ok := migrationMap[version]
		if !ok {
			mig = &Migration{
				Version:  version,
				Name:     name,
				FilePath: filepath.Join(migrationsPath, fmt.Sprintf("%d_%s", version, name)),
			}
			migrationMap[version] = mig
		}

		if direction == "up" {
			mig.UpSQL = string(content)
		} else {
			mig.DownSQL = string(content)
		}
	}

	// Convert map to sorted slice
	migrations := make([]*Migration, 0, len(migrationMap))
	for _, mig := range migrationMap {
		migrations = append(migrations, mig)
	}
	sort.Slice(migrations, func(i, j int) bool {
		return migrations[i].Version < migrations[j].Version
	})

	return migrations, nil
}

// GetAppliedMigrations returns all applied migrations from the database
func (m *Migrator) GetAppliedMigrations(ctx context.Context) ([]*MigrationRecord, error) {
	rows, err := m.db.QueryContext(ctx, m.dialect.GetAppliedMigrationsSQL())
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var records []*MigrationRecord
	for rows.Next() {
		var r MigrationRecord
		if err := rows.Scan(&r.ID, &r.Version, &r.Name, &r.Batch, &r.ExecutedAt); err != nil {
			return nil, err
		}
		records = append(records, &r)
	}
	return records, rows.Err()
}

// Up runs all pending migrations
func (m *Migrator) Up(ctx context.Context) error {
	if err := m.EnsureMigrationsTable(ctx); err != nil {
		return fmt.Errorf("failed to ensure migrations table: %w", err)
	}

	migrations, err := m.LoadMigrations()
	if err != nil {
		return fmt.Errorf("failed to load migrations: %w", err)
	}

	if len(migrations) == 0 {
		fmt.Println("No migrations found")
		return nil
	}

	applied, err := m.GetAppliedMigrations(ctx)
	if err != nil {
		return fmt.Errorf("failed to get applied migrations: %w", err)
	}

	appliedMap := make(map[int64]bool)
	for _, r := range applied {
		appliedMap[r.Version] = true
	}

	// Get next batch number
	var lastBatch int
	if err := m.db.QueryRowContext(ctx, m.dialect.GetLastBatchSQL()).Scan(&lastBatch); err != nil {
		return fmt.Errorf("failed to get last batch: %w", err)
	}
	nextBatch := lastBatch + 1

	// Count pending migrations
	pending := 0
	for _, mig := range migrations {
		if !appliedMap[mig.Version] {
			pending++
		}
	}

	if pending == 0 {
		fmt.Println("Nothing to migrate")
		return nil
	}

	fmt.Printf("Running %d migration(s)...\n\n", pending)

	// Run pending migrations
	for _, mig := range migrations {
		if appliedMap[mig.Version] {
			continue
		}

		if mig.UpSQL == "" {
			return fmt.Errorf("migration %d_%s has no up.sql file", mig.Version, mig.Name)
		}

		fmt.Printf("Migrating: %d_%s\n", mig.Version, mig.Name)

		tx, err := m.db.BeginTx(ctx, nil)
		if err != nil {
			return fmt.Errorf("failed to begin transaction: %w", err)
		}

		// Execute migration
		if _, err := tx.ExecContext(ctx, mig.UpSQL); err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to run migration %d_%s: %w", mig.Version, mig.Name, err)
		}

		// Record migration
		if _, err := tx.ExecContext(ctx, m.dialect.InsertMigrationSQL(), mig.Version, mig.Name, nextBatch); err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to record migration %d_%s: %w", mig.Version, mig.Name, err)
		}

		if err := tx.Commit(); err != nil {
			return fmt.Errorf("failed to commit migration %d_%s: %w", mig.Version, mig.Name, err)
		}

		fmt.Printf("Migrated:  %d_%s\n", mig.Version, mig.Name)
	}

	return nil
}

// UpSilent runs all pending migrations without printing output
func (m *Migrator) UpSilent(ctx context.Context) (int, error) {
	if err := m.EnsureMigrationsTable(ctx); err != nil {
		return 0, fmt.Errorf("failed to ensure migrations table: %w", err)
	}

	migrations, err := m.LoadMigrations()
	if err != nil {
		return 0, fmt.Errorf("failed to load migrations: %w", err)
	}

	if len(migrations) == 0 {
		return 0, nil
	}

	applied, err := m.GetAppliedMigrations(ctx)
	if err != nil {
		return 0, fmt.Errorf("failed to get applied migrations: %w", err)
	}

	appliedMap := make(map[int64]bool)
	for _, r := range applied {
		appliedMap[r.Version] = true
	}

	var lastBatch int
	if err := m.db.QueryRowContext(ctx, m.dialect.GetLastBatchSQL()).Scan(&lastBatch); err != nil {
		return 0, fmt.Errorf("failed to get last batch: %w", err)
	}
	nextBatch := lastBatch + 1

	count := 0
	for _, mig := range migrations {
		if appliedMap[mig.Version] {
			continue
		}

		if mig.UpSQL == "" {
			return count, fmt.Errorf("migration %d_%s has no up.sql file", mig.Version, mig.Name)
		}

		tx, err := m.db.BeginTx(ctx, nil)
		if err != nil {
			return count, fmt.Errorf("failed to begin transaction: %w", err)
		}

		if _, err := tx.ExecContext(ctx, mig.UpSQL); err != nil {
			tx.Rollback()
			return count, fmt.Errorf("failed to run migration %d_%s: %w", mig.Version, mig.Name, err)
		}

		if _, err := tx.ExecContext(ctx, m.dialect.InsertMigrationSQL(), mig.Version, mig.Name, nextBatch); err != nil {
			tx.Rollback()
			return count, fmt.Errorf("failed to record migration %d_%s: %w", mig.Version, mig.Name, err)
		}

		if err := tx.Commit(); err != nil {
			return count, fmt.Errorf("failed to commit migration %d_%s: %w", mig.Version, mig.Name, err)
		}

		count++
	}

	return count, nil
}

// Down rolls back the last batch of migrations
func (m *Migrator) Down(ctx context.Context) error {
	if err := m.EnsureMigrationsTable(ctx); err != nil {
		return fmt.Errorf("failed to ensure migrations table: %w", err)
	}

	// Get last batch number
	var lastBatch int
	if err := m.db.QueryRowContext(ctx, m.dialect.GetLastBatchSQL()).Scan(&lastBatch); err != nil {
		return fmt.Errorf("failed to get last batch: %w", err)
	}

	if lastBatch == 0 {
		fmt.Println("Nothing to rollback")
		return nil
	}

	// Get migrations in last batch (ordered by version DESC for rollback)
	rows, err := m.db.QueryContext(ctx, m.dialect.GetMigrationsByBatchSQL(), lastBatch)
	if err != nil {
		return fmt.Errorf("failed to get migrations by batch: %w", err)
	}
	defer rows.Close()

	var toRollback []*MigrationRecord
	for rows.Next() {
		var r MigrationRecord
		if err := rows.Scan(&r.ID, &r.Version, &r.Name, &r.Batch, &r.ExecutedAt); err != nil {
			return err
		}
		toRollback = append(toRollback, &r)
	}
	if err := rows.Err(); err != nil {
		return err
	}

	if len(toRollback) == 0 {
		fmt.Println("Nothing to rollback")
		return nil
	}

	// Load migration files to get down SQL
	migrations, err := m.LoadMigrations()
	if err != nil {
		return fmt.Errorf("failed to load migrations: %w", err)
	}

	migrationMap := make(map[int64]*Migration)
	for _, mig := range migrations {
		migrationMap[mig.Version] = mig
	}

	fmt.Printf("Rolling back %d migration(s) from batch %d...\n\n", len(toRollback), lastBatch)

	// Rollback each migration
	for _, record := range toRollback {
		mig, ok := migrationMap[record.Version]
		if !ok {
			return fmt.Errorf("migration file not found for version %d_%s", record.Version, record.Name)
		}

		if mig.DownSQL == "" {
			return fmt.Errorf("migration %d_%s has no down.sql file", record.Version, record.Name)
		}

		fmt.Printf("Rolling back: %d_%s\n", record.Version, record.Name)

		tx, err := m.db.BeginTx(ctx, nil)
		if err != nil {
			return fmt.Errorf("failed to begin transaction: %w", err)
		}

		// Execute rollback
		if _, err := tx.ExecContext(ctx, mig.DownSQL); err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to rollback migration %d_%s: %w", record.Version, record.Name, err)
		}

		// Remove migration record
		if _, err := tx.ExecContext(ctx, m.dialect.DeleteMigrationSQL(), record.Version); err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to remove migration record %d_%s: %w", record.Version, record.Name, err)
		}

		if err := tx.Commit(); err != nil {
			return fmt.Errorf("failed to commit rollback %d_%s: %w", record.Version, record.Name, err)
		}

		fmt.Printf("Rolled back: %d_%s\n", record.Version, record.Name)
	}

	return nil
}

// DownSilent rolls back the last batch without printing output
func (m *Migrator) DownSilent(ctx context.Context) (int, error) {
	if err := m.EnsureMigrationsTable(ctx); err != nil {
		return 0, fmt.Errorf("failed to ensure migrations table: %w", err)
	}

	var lastBatch int
	if err := m.db.QueryRowContext(ctx, m.dialect.GetLastBatchSQL()).Scan(&lastBatch); err != nil {
		return 0, fmt.Errorf("failed to get last batch: %w", err)
	}

	if lastBatch == 0 {
		return 0, nil
	}

	rows, err := m.db.QueryContext(ctx, m.dialect.GetMigrationsByBatchSQL(), lastBatch)
	if err != nil {
		return 0, fmt.Errorf("failed to get migrations by batch: %w", err)
	}
	defer rows.Close()

	var toRollback []*MigrationRecord
	for rows.Next() {
		var r MigrationRecord
		if err := rows.Scan(&r.ID, &r.Version, &r.Name, &r.Batch, &r.ExecutedAt); err != nil {
			return 0, err
		}
		toRollback = append(toRollback, &r)
	}
	if err := rows.Err(); err != nil {
		return 0, err
	}

	if len(toRollback) == 0 {
		return 0, nil
	}

	migrations, err := m.LoadMigrations()
	if err != nil {
		return 0, fmt.Errorf("failed to load migrations: %w", err)
	}

	migrationMap := make(map[int64]*Migration)
	for _, mig := range migrations {
		migrationMap[mig.Version] = mig
	}

	count := 0
	for _, record := range toRollback {
		mig, ok := migrationMap[record.Version]
		if !ok {
			return count, fmt.Errorf("migration file not found for version %d_%s", record.Version, record.Name)
		}

		if mig.DownSQL == "" {
			return count, fmt.Errorf("migration %d_%s has no down.sql file", record.Version, record.Name)
		}

		tx, err := m.db.BeginTx(ctx, nil)
		if err != nil {
			return count, fmt.Errorf("failed to begin transaction: %w", err)
		}

		if _, err := tx.ExecContext(ctx, mig.DownSQL); err != nil {
			tx.Rollback()
			return count, fmt.Errorf("failed to rollback migration %d_%s: %w", record.Version, record.Name, err)
		}

		if _, err := tx.ExecContext(ctx, m.dialect.DeleteMigrationSQL(), record.Version); err != nil {
			tx.Rollback()
			return count, fmt.Errorf("failed to remove migration record %d_%s: %w", record.Version, record.Name, err)
		}

		if err := tx.Commit(); err != nil {
			return count, fmt.Errorf("failed to commit rollback %d_%s: %w", record.Version, record.Name, err)
		}

		count++
	}

	return count, nil
}

// Status returns the status of all migrations
func (m *Migrator) Status(ctx context.Context) ([]*MigrationStatus, error) {
	if err := m.EnsureMigrationsTable(ctx); err != nil {
		return nil, fmt.Errorf("failed to ensure migrations table: %w", err)
	}

	migrations, err := m.LoadMigrations()
	if err != nil {
		return nil, fmt.Errorf("failed to load migrations: %w", err)
	}

	applied, err := m.GetAppliedMigrations(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to get applied migrations: %w", err)
	}

	appliedMap := make(map[int64]*MigrationRecord)
	for _, r := range applied {
		appliedMap[r.Version] = r
	}

	var statuses []*MigrationStatus
	for _, mig := range migrations {
		status := &MigrationStatus{Migration: mig}
		if record, ok := appliedMap[mig.Version]; ok {
			status.Applied = true
			status.AppliedAt = &record.ExecutedAt
			status.Batch = &record.Batch
		}
		statuses = append(statuses, status)
	}

	return statuses, nil
}

// PendingCount returns the number of pending migrations
func (m *Migrator) PendingCount(ctx context.Context) (int, error) {
	statuses, err := m.Status(ctx)
	if err != nil {
		return 0, err
	}

	count := 0
	for _, s := range statuses {
		if !s.Applied {
			count++
		}
	}
	return count, nil
}

// MakeMigration creates a new migration file pair for all dialects
func MakeMigration(name string, migrationsDir string, dialectNames []string) error {
	timestamp := time.Now().UTC().Format("20060102150405")

	for _, dialectName := range dialectNames {
		dialectDir := filepath.Join(migrationsDir, dialectName)

		// Create directory if it doesn't exist
		if err := os.MkdirAll(dialectDir, 0755); err != nil {
			return fmt.Errorf("failed to create migrations directory for %s: %w", dialectName, err)
		}

		baseName := fmt.Sprintf("%s_%s", timestamp, name)
		upFile := filepath.Join(dialectDir, baseName+".up.sql")
		downFile := filepath.Join(dialectDir, baseName+".down.sql")

		// Create up file
		upContent := fmt.Sprintf("-- Migration: %s (up)\n-- Dialect: %s\n-- Created: %s\n\n",
			name, dialectName, time.Now().UTC().Format(time.RFC3339))
		if err := os.WriteFile(upFile, []byte(upContent), 0644); err != nil {
			return fmt.Errorf("failed to create up migration file: %w", err)
		}

		// Create down file
		downContent := fmt.Sprintf("-- Migration: %s (down)\n-- Dialect: %s\n-- Created: %s\n\n",
			name, dialectName, time.Now().UTC().Format(time.RFC3339))
		if err := os.WriteFile(downFile, []byte(downContent), 0644); err != nil {
			return fmt.Errorf("failed to create down migration file: %w", err)
		}

		fmt.Printf("Created: %s\n", upFile)
		fmt.Printf("Created: %s\n", downFile)
	}

	return nil
}

// LoadMigrationsFromDir reads migrations from a specific directory (for make command without db)
func LoadMigrationsFromDir(migrationsDir string) ([]*Migration, error) {
	pattern := regexp.MustCompile(`^(\d{14})_(.+)\.(up|down)\.sql$`)
	migrationMap := make(map[int64]*Migration)

	entries, err := os.ReadDir(migrationsDir)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, nil
		}
		return nil, err
	}

	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}

		matches := pattern.FindStringSubmatch(entry.Name())
		if matches == nil {
			continue
		}

		version, _ := strconv.ParseInt(matches[1], 10, 64)
		name := matches[2]

		if _, ok := migrationMap[version]; !ok {
			migrationMap[version] = &Migration{
				Version: version,
				Name:    name,
			}
		}
	}

	migrations := make([]*Migration, 0, len(migrationMap))
	for _, mig := range migrationMap {
		migrations = append(migrations, mig)
	}
	sort.Slice(migrations, func(i, j int) bool {
		return migrations[i].Version < migrations[j].Version
	})

	return migrations, nil
}

// Run is a convenience function that runs migrations with default configuration
// It's designed for use as a library - just import the package and call migrate.Run()
//
// Example:
//
//	import (
//	    "github.com/erniealice/esqyma/pkg/migrate"
//	    _ "github.com/jackc/pgx/v5/stdlib"
//	)
//
//	func main() {
//	    if err := migrate.Run(); err != nil {
//	        log.Fatal(err)
//	    }
//	}
func Run() error {
	config := DefaultConfig()
	return RunWithConfig(config)
}

// RunWithConfig runs migrations with the provided configuration
func RunWithConfig(config *Config) error {
	if config.DatabaseURL == "" {
		return fmt.Errorf("database URL required")
	}

	m, err := NewMigrator(config)
	if err != nil {
		return err
	}
	defer m.Close()

	ctx := context.Background()
	return m.Up(ctx)
}
