package migrate

import (
	"io/fs"
	"os"
	"path/filepath"
)

// Config holds migration configuration
type Config struct {
	// Dialect: postgres, mysql, or sqlserver
	Dialect string

	// DatabaseURL is the connection string
	DatabaseURL string

	// MigrationsDir is the base migrations directory (used when FS is nil)
	MigrationsDir string

	// FS is an optional embedded filesystem. When set, MigrationsDir is used
	// as the path prefix inside the FS instead of the OS filesystem.
	// Use esqyma.MigrationsFS to reference the embedded migrations.
	FS fs.FS
}

// DefaultConfig returns configuration from environment variables
func DefaultConfig() *Config {
	return &Config{
		Dialect:       getEnv("MIGRATE_DIALECT", "postgres"),
		DatabaseURL:   getEnv("DATABASE_URL", ""),
		MigrationsDir: getEnv("MIGRATIONS_DIR", "migrations"),
	}
}

// MigrationsPath returns the full path to dialect-specific migrations
func (c *Config) MigrationsPath() string {
	return filepath.Join(c.MigrationsDir, c.Dialect)
}

func getEnv(key, defaultVal string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return defaultVal
}
