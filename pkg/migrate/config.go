package migrate

import (
	"os"
	"path/filepath"
)

// Config holds migration configuration
type Config struct {
	// Dialect: postgres, mysql, or sqlserver
	Dialect string

	// DatabaseURL is the connection string
	DatabaseURL string

	// MigrationsDir is the base migrations directory
	MigrationsDir string
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
